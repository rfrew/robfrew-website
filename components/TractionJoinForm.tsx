"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import {
  clearJoinCode,
  readJoinCode,
  writeJoinCode,
  writeJoined,
} from "@/lib/traction-join";
import { PASSWORD_MIN, passwordProblem } from "@/lib/traction-password";

type Field = "fullName" | "email" | "code" | "password" | "confirm";

interface JoinResponse {
  ok: boolean;
  field?: Exclude<Field, "confirm">;
  message: string;
  agencyName?: string;
  email?: string;
}

interface Props {
  contactEmail: string;
  donePath: string;
  resetPath: string;
}
const FIELDS: readonly string[] = ["fullName", "email", "code", "password", "confirm"];

const noSubscription = () => () => {};

// scroll-mt keeps the field's label on screen when it is scrolled into view.
const inputClass =
  "w-full px-4 py-3 text-base border border-gray-300 focus:border-black focus:outline-none transition-colors scroll-mt-12";

export default function TractionJoinForm({ contactEmail, donePath, resetPath }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<{ field?: Field; message: string } | null>(null);
  // Set if the browser has not left this page a few seconds after a
  // successful join (the next page failed to load, or the user pressed stop).
  const [stalled, setStalled] = useState(false);
  // True from a successful join until the browser leaves for the next page.
  const leavingAfterJoin = useRef(false);
  const stallTimer = useRef<number | undefined>(undefined);
  // False in the server HTML, true once React is running. Until then the
  // submit button is disabled, so the browser can never submit the form
  // natively (which would bypass every check here).
  const hydrated = useSyncExternalStore(noSubscription, () => true, () => false);

  // Coming back to this page with the Back button can restore it exactly as
  // it was left (the back/forward cache), whether or not a join happened:
  // make it usable again, and never bring the passwords back.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      // Timers are frozen with the page and resume here: stop the pending
      // "stalled" switch from firing on a form that is usable again.
      window.clearTimeout(stallTimer.current);
      // Back after a completed join: the code has been used, so the next
      // person on this device must open their own office's link.
      if (leavingAfterJoin.current) setCode("");
      leavingAfterJoin.current = false;
      setIsSubmitting(false);
      setStalled(false);
      setPassword("");
      setConfirm("");
      setShowPassword(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // The office's link can carry the code after a "#" so agents don't type it.
  // A fragment never reaches the server, so the code stays out of access logs;
  // it is also removed from the address bar once read, and remembered for this
  // tab so a reload (or pull-to-refresh) does not lose it.
  useEffect(() => {
    const readCode = () => {
      const hash = window.location.hash.slice(1);
      let fromLink = "";
      if (hash) {
        fromLink = hash;
        try {
          fromLink = decodeURIComponent(hash);
        } catch {
          // A link mangled in transit: use it as-is; the server rejects a bad code.
        }
        fromLink = fromLink.trim().slice(0, 64);
        window.history.replaceState(null, "", window.location.pathname);
        if (fromLink) writeJoinCode(fromLink);
      } else {
        fromLink = readJoinCode();
      }
      if (fromLink) setCode(fromLink);
    };
    readCode();
    // A different join link opened in this same tab only changes the fragment.
    window.addEventListener("hashchange", readCode);
    return () => window.removeEventListener("hashchange", readCode);
  }, []);

  // Editing a field clears its own error; either password field clears the
  // mismatch message.
  const edit = (field: Field, set: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      set(e.target.value);
      setError((current) => {
        if (!current) return current;
        const passwords = field === "password" || field === "confirm";
        if (current.field === field || (passwords && current.field === "confirm")) {
          return null;
        }
        return current;
      });
    };

  // Show an error and bring its field into view (the submit button can be a
  // full screen below the field on a small phone).
  const fail = (failure: { field?: Field; message: string }) => {
    // Render the message first, so the field is already marked invalid (and
    // described by the message) when it receives focus.
    flushSync(() => setError(failure));
    if (!failure.field) return;
    const input = document.getElementById(failure.field);
    input?.focus({ preventScroll: true });
    input?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // The form is noValidate so these messages appear inline, under the
    // field, instead of in the browser's own bubble. The server checks again.
    const nameLength = [...fullName.trim().replace(/\s+/g, " ")].length;
    if (nameLength < 2 || nameLength > 60) {
      return fail({ field: "fullName", message: "Enter your full name (2 to 60 characters)." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return fail({ field: "email", message: "Enter a valid email address." });
    }
    if (!code.trim()) {
      return fail({ field: "code", message: "Enter the agency code from your office." });
    }
    const passwordIssue = passwordProblem(password);
    if (passwordIssue) return fail({ field: "password", message: passwordIssue });
    if (password !== confirm) {
      return fail({ field: "confirm", message: "The two passwords don't match." });
    }

    setIsSubmitting(true);
    setError(null);
    let response: Response;
    try {
      response = await fetch("/api/traction/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, code, password }),
      });
    } catch {
      setIsSubmitting(false);
      setError({
        message: `Couldn't reach the server. Check your connection and try again, or email ${contactEmail}.`,
      });
      return;
    }

    // A gateway error page is not JSON; treat anything unreadable as unknown.
    const result: Partial<JoinResponse> | null = await response.json().catch(() => null);
    if (response.ok && result?.ok) {
      writeJoined({ agencyName: result.agencyName, email: result.email ?? email });
      clearJoinCode();
      // A real page load after the submit (not an in-place swap) is what lets
      // the browser offer to save the new password. The button stays disabled
      // so a second tap cannot resubmit while the next page loads.
      leavingAfterJoin.current = true;
      window.location.assign(donePath);
      stallTimer.current = window.setTimeout(() => setStalled(true), 4000);
      return;
    }

    setIsSubmitting(false);
    if (!result?.message) {
      setError({
        message: `Something went wrong. Your account may have been created: try signing in to TrAction, or email ${contactEmail}.`,
      });
      return;
    }
    fail({
      field: result.field && FIELDS.includes(result.field) ? result.field : undefined,
      message: result.message,
    });
  };

  const fieldError = (field: Field) =>
    error?.field === field ? (
      <p id={`${field}-error`} role="alert" className="mt-2 text-sm text-red-700">
        {error.message}
      </p>
    ) : null;
  const describedBy = (field: Field) =>
    error?.field === field ? `${field}-error` : undefined;

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Create your account</h1>
      <p className="text-lg leading-relaxed text-gray-700 mb-8">
        Use the agency code from your office. You&apos;ll sign in to the
        TrAction app with this email and password.
      </p>

      <form
        onSubmit={handleSubmit}
        method="post"
        noValidate
        className="space-y-6"
      >
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold mb-2">
            Full name
          </label>
          <input
            type="text"
            id="fullName"
            name="name"
            required
            minLength={2}
            maxLength={60}
            autoComplete="name"
            value={fullName}
            onChange={edit("fullName", setFullName)}
            aria-invalid={error?.field === "fullName"}
            aria-describedby={describedBy("fullName")}
            className={inputClass}
          />
          {fieldError("fullName") ?? (
            <p className="mt-2 text-sm text-gray-600">
              Colleagues see this name on the Standings board.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            maxLength={254}
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            value={email}
            onChange={edit("email", setEmail)}
            aria-invalid={error?.field === "email"}
            aria-describedby={describedBy("email")}
            className={inputClass}
          />
          {fieldError("email")}
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-semibold mb-2">
            Agency code
          </label>
          <input
            type="text"
            id="code"
            name="agency-code"
            required
            maxLength={64}
            autoComplete="off"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            value={code}
            onChange={edit("code", setCode)}
            aria-invalid={error?.field === "code"}
            aria-describedby={describedBy("code")}
            className={`${inputClass} uppercase tracking-wider`}
          />
          {fieldError("code")}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-pressed={showPassword}
              className="inline-flex items-center min-h-11 pl-4 text-sm underline text-gray-600 hover:text-black"
            >
              {showPassword ? "Hide passwords" : "Show passwords"}
            </button>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="new-password"
            required
            minLength={PASSWORD_MIN}
            autoComplete="new-password"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            value={password}
            onChange={edit("password", setPassword)}
            aria-invalid={error?.field === "password"}
            aria-describedby={describedBy("password") ?? "password-hint"}
            className={inputClass}
          />
          {fieldError("password") ?? (
            <p id="password-hint" className="mt-2 text-sm text-gray-600">
              At least {PASSWORD_MIN} characters. If you forget it, you can
              reset it at robfrew.com{resetPath}.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirm" className="block text-sm font-semibold mb-2">
            Confirm password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirm"
            name="confirm-password"
            required
            autoComplete="new-password"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            value={confirm}
            onChange={edit("confirm", setConfirm)}
            aria-invalid={error?.field === "confirm"}
            aria-describedby={describedBy("confirm")}
            className={inputClass}
          />
          {fieldError("confirm")}
        </div>

        {error && !error.field && (
          <div role="alert" className="p-4 bg-red-50 border border-red-200 text-red-800">
            {error.message}
          </div>
        )}

        {stalled ? (
          <a
            href={donePath}
            className="block w-full text-center bg-black text-white px-6 py-4 font-semibold hover:bg-gray-900 transition-colors duration-200"
          >
            Account created. Continue
          </a>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || !hydrated}
            className="w-full bg-black text-white px-6 py-4 font-semibold hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        )}
      </form>
    </>
  );
}
