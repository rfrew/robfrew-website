"use client";

import { useState, useSyncExternalStore } from "react";

interface Props {
  contactEmail: string;
  supportUrl: string;
}

interface RequestResponse {
  ok: boolean;
  message?: string;
}

const noSubscription = () => () => {};

const inputClass =
  "w-full px-4 py-3 text-base border border-gray-300 focus:border-black focus:outline-none transition-colors scroll-mt-12";

// Step 1 of the TrAction password reset: ask for the account email and
// request a recovery link. The confirmation is the same sentence whether or
// not the address has an account (realestate-app spec 0014).
export default function TractionResetRequest({ contactEmail, supportUrl }: Props) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string>("");
  const hydrated = useSyncExternalStore(noSubscription, () => true, () => false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Enter a valid email address.");
      document.getElementById("email")?.focus();
      return;
    }

    setIsSubmitting(true);
    setError(null);
    let response: Response;
    try {
      response = await fetch("/api/traction/reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
    } catch {
      setIsSubmitting(false);
      setError(
        `Couldn't reach the server. Check your connection and try again, or email ${contactEmail}.`
      );
      return;
    }
    const result: Partial<RequestResponse> | null = await response.json().catch(() => null);
    setIsSubmitting(false);
    if (response.ok && result?.ok) {
      setConfirmation(result.message ?? "");
      setSentTo(trimmed);
      return;
    }
    setError(result?.message ?? `Something went wrong. Try again in a minute, or email ${contactEmail}.`);
  };

  if (sentTo) {
    return (
      <>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Check your email</h1>
        <p className="text-lg leading-relaxed text-gray-700 mb-4">{confirmation}</p>
        <p className="text-xl font-semibold break-all border border-gray-300 px-4 py-3 mb-8">
          {sentTo}
        </p>
        <p className="text-gray-600 mb-3">
          The link works for one hour and can be used once. Nothing arrived
          after a few minutes? Check that this is the email on your TrAction
          account, then{" "}
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className="underline hover:text-black"
          >
            try again
          </button>
          .
        </p>
        <p className="text-gray-600">
          Still stuck? Email{" "}
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
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Reset your password</h1>
      <p className="text-lg leading-relaxed text-gray-700 mb-8">
        Enter the email on your TrAction account and we&apos;ll send you a link
        to choose a new password.
      </p>

      <form onSubmit={handleSubmit} method="post" noValidate className="space-y-6">
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
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "email-error" : undefined}
            className={inputClass}
          />
          {error && (
            <p id="email-error" role="alert" className="mt-2 text-sm text-red-700">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !hydrated}
          className="w-full bg-black text-white px-6 py-4 font-semibold hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p className="mt-8 text-gray-600">
        Remembered it? Open TrAction and sign in. Need help?{" "}
        <a href={supportUrl} className="underline hover:text-black">
          Support
        </a>
        .
      </p>
    </>
  );
}
