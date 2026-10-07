"use client";

import { useSyncExternalStore } from "react";
import { readResetEmail } from "@/lib/traction-reset";

interface Props {
  contactEmail: string;
  appStoreUrl: string;
  appScheme: string;
}

const subscribe = () => () => {};

// Lands after a successful reset, as a real navigation so the browser offers
// to save the new password. The email comes from this tab's sessionStorage.
export default function TractionResetDone({ contactEmail, appStoreUrl, appScheme }: Props) {
  const email = useSyncExternalStore<string | null | undefined>(
    subscribe,
    readResetEmail,
    () => undefined
  );

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Your password is set</h1>
      {email ? (
        <>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Open TrAction and sign in with your new password. Your sign-in
            email is:
          </p>
          <p className="text-xl font-semibold break-all border border-gray-300 px-4 py-3 mb-8">
            {email}
          </p>
        </>
      ) : email === undefined ? null : (
        <p className="text-lg leading-relaxed text-gray-700 mb-8">
          Open TrAction and sign in with your email and your new password.
        </p>
      )}

      <a
        href={`${appScheme}://`}
        className="block w-full text-center bg-black text-white px-6 py-4 font-semibold hover:bg-gray-900 transition-colors duration-200 mb-4"
      >
        Open TrAction
      </a>
      <p className="text-gray-600 mb-6">
        Don&apos;t have the app on this device?{" "}
        <a href={appStoreUrl} className="underline hover:text-black">
          Get TrAction on the App Store
        </a>
        .
      </p>

      <p className="text-gray-600 mb-3">
        If TrAction was still signed in on your phone, it will sign you out
        within the hour. Sign in again with the new password; anything you
        logged while offline is kept and syncs after you sign in.
      </p>
      <p className="text-gray-600 mb-3">
        If your phone suggested the password, it&apos;s saved in Settings ›
        Passwords.
      </p>
      <p className="text-gray-600">
        Stuck? Email{" "}
        <a href={`mailto:${contactEmail}`} className="underline hover:text-black">
          {contactEmail}
        </a>
        .
      </p>
    </div>
  );
}
