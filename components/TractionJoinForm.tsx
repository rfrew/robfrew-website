"use client";

import { useEffect, useState } from "react";

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
  appStoreUrl: string;
}

const PASSWORD_MIN = 8;

const inputClass =
  "w-full px-4 py-3 text-base border border-gray-300 focus:border-black focus:outline-none transition-colors";

export default function TractionJoinForm({ contactEmail, appStoreUrl }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<{ field?: Field; message: string } | null>(null);
  const [joined, setJoined] = useState<{ agencyName?: string; email: string } | null>(null);

  // The office's link can carry the code after a "#" so agents don't type it.
  // A fragment never reaches the server, so the code stays out of access logs;
  // it is also removed from the address bar once read.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    let fromLink = hash;
    try {
      fromLink = decodeURIComponent(hash);
    } catch {
      // A link mangled in transit: use it as-is; the server rejects a bad code.
    }
    fromLink = fromLink.trim();
    setCode(fromLink.slice(0, 64));
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (password.length < PASSWORD_MIN) {
      setError({ field: "password", message: `Use at least ${PASSWORD_MIN} characters.` });
      return;
    }
    if (password !== confirm) {
      setError({ field: "confirm", message: "The two passwords don't match." });
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/traction/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, code, password }),
      });
      const result: JoinResponse = await response.json();
      if (response.ok && result.ok) {
        setPassword("");
        setConfirm("");
        setJoined({ agencyName: result.agencyName, email: result.email ?? email });
        window.scrollTo(0, 0);
      } else {
        setError({ field: result.field, message: result.message });
      }
    } catch {
      setError({
        message: `Couldn't reach the server. Check your connection and try again, or email ${contactEmail}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (joined) {
    return (
      <div role="status">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">You&apos;re in</h1>
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          Your TrAction account
          {joined.agencyName ? (
            <>
              {" "}
              with <strong>{joined.agencyName}</strong>
            </>
          ) : null}{" "}
          is ready. Your sign-in email is:
        </p>
        <p className="text-xl font-semibold break-all border border-gray-300 px-4 py-3 mb-8">
          {joined.email}
        </p>

        <h2 className="text-xl font-semibold mb-3">Next steps</h2>
        <ol className="list-decimal pl-6 space-y-2 text-lg text-gray-700 mb-6">
          <li>Install TrAction on your iPhone.</li>
          <li>Open TrAction.</li>
          <li>Sign in with the email above and the password you just chose.</li>
        </ol>
        <a
          href={appStoreUrl}
          className="block w-full text-center bg-black text-white px-6 py-4 font-semibold hover:bg-gray-900 transition-colors duration-200 mb-6"
        >
          Get TrAction on the App Store
        </a>

        <p className="text-gray-600 mb-3">
          If your iPhone suggested a password, it&apos;s saved in Settings ›
          Passwords.
        </p>
        <p className="text-gray-600 mb-3">
          TrAction is iPhone-only for now. On Android? Your account is ready
          for when the Android app arrives.
        </p>
        <p className="text-gray-600">
          Wrong email, or stuck? Email{" "}
          <a href={`mailto:${contactEmail}`} className="underline hover:text-black">
            {contactEmail}
          </a>
          .
        </p>
      </div>
    );
  }

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

      <form onSubmit={handleSubmit} className="space-y-6">
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
            onChange={(e) => setFullName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setCode(e.target.value)}
            aria-invalid={error?.field === "code"}
            aria-describedby={describedBy("code")}
            className={`${inputClass} uppercase tracking-wider`}
          />
          {fieldError("code")}
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-pressed={showPassword}
              className="text-sm underline text-gray-600 hover:text-black min-h-11 -my-3 pl-4"
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
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={error?.field === "password"}
            aria-describedby={describedBy("password") ?? "password-hint"}
            className={inputClass}
          />
          {fieldError("password") ?? (
            <p id="password-hint" className="mt-2 text-sm text-gray-600">
              At least {PASSWORD_MIN} characters. Pick one you&apos;ll remember:
              there is no reset button in the app yet.
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
            onChange={(e) => setConfirm(e.target.value)}
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white px-6 py-4 font-semibold hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>
    </>
  );
}
