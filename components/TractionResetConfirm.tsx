"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { PASSWORD_MIN, passwordProblem } from "@/lib/traction-password";
import { writeResetEmail } from "@/lib/traction-reset";

type Field = "password" | "confirm";

interface ConfirmResponse {
  ok: boolean;
  error?: string;
  field?: "password";
  message: string;
  email?: string;
}

interface Props {
  contactEmail: string;
  requestPath: string;
  donePath: string;
}

const noSubscription = () => () => {};

// The token from the recovery link, read once per page load. Reset links are
// always full page loads (they come from an email), so a module-level cache
// is a stable snapshot for useSyncExternalStore; "" means the link had none.
let tokenFromLink: string | undefined;
function readTokenFromLink(): string {
  if (tokenFromLink === undefined) {
    const params = new URLSearchParams(window.location.search);
    tokenFromLink = (params.get("token_hash") ?? "").trim().slice(0, 512);
  }
  return tokenFromLink;
}

const inputClass =
  "w-full px-4 py-3 text-base border border-gray-300 focus:border-black focus:outline-none transition-colors scroll-mt-12";

// Step 2 of the TrAction password reset (realestate-app decision 0027). The
// recovery email links here with ?token_hash=...&type=recovery. This page
// never contacts Supabase on load: the token is read from the address bar,
// removed from it, and sent to the server ONLY together with the new
// password, so a mail scanner that opens the link cannot spend the token.
export default function TractionResetConfirm({ contactEmail, requestPath, donePath }: Props) {
  // undefined = not read yet (server HTML); "" = link had no token.
  const tokenHash = useSyncExternalStore<string | undefined>(
    noSubscription,
    readTokenFromLink,
    () => undefined
  );
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<{ field?: Field; message: string } | null>(null);
  // Set when the server said the link is spent: the form is replaced by a
  // "request a new link" message.
  const [linkSpent, setLinkSpent] = useState<string | null>(null);
  const [stalled, setStalled] = useState(false);
  const stallTimer = useRef<number | undefined>(undefined);
  const hydrated = useSyncExternalStore(noSubscription, () => true, () => false);

  // Keep the token out of history, the address bar and any screenshot.
  useEffect(() => {
    if (tokenHash && window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [tokenHash]);

  // Back to this page from the done page (back/forward cache): the token is
  // spent, so there is nothing to do here but go request a new one.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      window.clearTimeout(stallTimer.current);
      setIsSubmitting(false);
      setStalled(false);
      setPassword("");
      setConfirm("");
      setShowPassword(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const edit = (field: Field, set: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      set(e.target.value);
      setError(null);
    };

  const fail = (failure: { field?: Field; message: string }) => {
    flushSync(() => setError(failure));
    if (!failure.field) return;
    const input = document.getElementById(failure.field);
    input?.focus({ preventScroll: true });
    input?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !tokenHash) return;

    const problem = passwordProblem(password);
    if (problem) return fail({ field: "password", message: problem });
    if (password !== confirm) {
      return fail({ field: "confirm", message: "The two passwords don't match." });
    }

    setIsSubmitting(true);
    setError(null);
    let response: Response;
    try {
      response = await fetch("/api/traction/reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenHash, password }),
      });
    } catch {
      setIsSubmitting(false);
      setError({
        message: `Couldn't reach the server. Check your connection and try again, or email ${contactEmail}.`,
      });
      return;
    }

    const result: Partial<ConfirmResponse> | null = await response.json().catch(() => null);
    if (response.ok && result?.ok) {
      if (result.email) writeResetEmail(result.email);
      // A real page load (not an in-place swap) lets the browser offer to
      // save the new password. The button stays disabled meanwhile.
      window.location.assign(donePath);
      stallTimer.current = window.setTimeout(() => setStalled(true), 4000);
      return;
    }

    setIsSubmitting(false);
    const message =
      result?.message ??
      `Something went wrong. Your password may not have changed: try signing in to TrAction, or email ${contactEmail}.`;
    // These all spent the token: replace the form so the user isn't invited
    // to resubmit a link that can no longer work.
    if (
      result?.error === "invalid_link" ||
      result?.error === "weak_password" ||
      result?.error === "same_password"
    ) {
      setLinkSpent(message);
      return;
    }
    fail({ field: result?.field === "password" ? "password" : undefined, message });
  };

  const fieldError = (field: Field) =>
    error?.field === field ? (
      <p id={`${field}-error`} role="alert" className="mt-2 text-sm text-red-700">
        {error.message}
      </p>
    ) : null;
  const describedBy = (field: Field) =>
    error?.field === field ? `${field}-error` : undefined;

  if (tokenHash === undefined) {
    // Before React runs: keep the heading stable, show no verdict yet.
    return <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose a new password</h1>;
  }

  if (!tokenHash || linkSpent) {
    return (
      <>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {linkSpent ? "This link can't be used" : "This link is incomplete"}
        </h1>
        <p className="text-lg leading-relaxed text-gray-700 mb-8">
          {linkSpent ??
            "The reset link didn't come through in one piece. Open it again from the email, or request a new one."}
        </p>
        <a
          href={requestPath}
          className="block w-full text-center bg-black text-white px-6 py-4 font-semibold hover:bg-gray-900 transition-colors duration-200 mb-6"
        >
          Request a new link
        </a>
        <p className="text-gray-600">
          Need help? Email{" "}
          <a href={`mailto:${contactEmail}`} className="underline hover:text-black">
            {contactEmail}
          </a>
          .
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose a new password</h1>
      <p className="text-lg leading-relaxed text-gray-700 mb-8">
        You&apos;ll sign in to the TrAction app with your email and this
        password.
      </p>

      <form onSubmit={handleSubmit} method="post" noValidate className="space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-semibold">
              New password
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
              At least {PASSWORD_MIN} characters. If your phone suggests one,
              it saves it for you.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirm" className="block text-sm font-semibold mb-2">
            Confirm new password
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
            Password set. Continue
          </a>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || !hydrated}
            className="w-full bg-black text-white px-6 py-4 font-semibold hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Set new password"}
          </button>
        )}
      </form>
    </>
  );
}
