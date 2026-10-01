"use client";

import { useSyncExternalStore } from "react";

/** sessionStorage key the join form writes before navigating here. */
export const JOINED_KEY = "traction-joined";

interface Props {
  contactEmail: string;
  appStoreUrl: string;
  joinPath: string;
}

const subscribe = () => () => {};
const readJoined = () => {
  try {
    return sessionStorage.getItem(JOINED_KEY);
  } catch {
    return null;
  }
};

export default function TractionJoinDone({ contactEmail, appStoreUrl, joinPath }: Props) {
  // Read on the client only; the server render (and a visit without having
  // just joined) gets null and shows the generic version.
  const stored = useSyncExternalStore(subscribe, readJoined, () => null);
  let joined: { agencyName?: string; email?: string } = {};
  try {
    joined = stored ? JSON.parse(stored) : {};
  } catch {
    // Unreadable entry: fall back to the generic version.
  }

  return (
    <div role="status">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">You&apos;re in</h1>
      {joined.email ? (
        <>
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
        </>
      ) : (
        <p className="text-lg leading-relaxed text-gray-700 mb-8">
          Your TrAction account is ready. Not joined yet?{" "}
          <a href={joinPath} className="underline hover:text-black">
            Create your account
          </a>
          .
        </p>
      )}

      <h2 className="text-xl font-semibold mb-3">Next steps</h2>
      <ol className="list-decimal pl-6 space-y-2 text-lg text-gray-700 mb-6">
        <li>Install TrAction on your iPhone.</li>
        <li>Open TrAction.</li>
        <li>Sign in with your email and the password you just chose.</li>
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
        TrAction is iPhone-only for now. On Android? Your account is ready for
        when the Android app arrives.
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
