import { Metadata } from "next";
import Link from "next/link";
import { traction } from "@/data/traction";

export const metadata: Metadata = {
  title: "TrAction Support",
  description:
    "Support for the TrAction mobile app: what it is, how to get help, and how accounts are created.",
};

export default function TractionSupportPage() {
  const mailto = `mailto:${traction.contactEmail}`;

  return (
    <article>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        {traction.name} Support
      </h1>

      <h2 className="text-2xl font-semibold mt-10 mb-3">What TrAction is</h2>
      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        TrAction is a daily activity tracker for real estate agents. It makes
        logging the habits that build a pipeline &mdash; calls, notes, pop-bys,
        database time, social posts, and closings &mdash; fast enough that you
        will actually do it, and shows you the payoff right away: your streak,
        your points, and how close you are to this week&apos;s targets. If your
        brokerage or team lead uses TrAction with your office, your progress
        also feeds a simple standings board and a coaching view for your
        mentor.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Getting help</h2>
      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        For questions, bug reports, or help with your account, email{" "}
        <a href={mailto} className="underline hover:text-black">
          {traction.contactEmail}
        </a>
        . Please include the email address on your TrAction account and, for
        bugs, what you were doing when the problem happened.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Accounts and sign-in</h2>
      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        TrAction accounts belong to your brokerage. There is no self-signup
        in the app. Your office either creates your account for you or sends
        you a join link and an agency code; on the{" "}
        <Link href={traction.joinPath} className="underline hover:text-black">
          join page
        </Link>{" "}
        you enter that code and choose your own password, then sign in to the
        app with the same email and password. If you do not have an account or
        a code yet, ask your brokerage administrator. If you cannot sign in or
        have forgotten your password, email the address above.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Your data</h2>
      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        How TrAction collects, uses, and protects your information is described
        in the{" "}
        <Link href={traction.privacyPath} className="underline hover:text-black">
          TrAction Privacy Policy
        </Link>
        . To request access to, correction of, or deletion of your data, email
        the address above or ask your brokerage administrator.
      </p>
    </article>
  );
}
