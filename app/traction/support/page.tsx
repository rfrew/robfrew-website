import { Metadata } from "next";
import Link from "next/link";
import { traction } from "@/data/traction";

export const metadata: Metadata = {
  title: "TrAction Support",
  description:
    "Support for the TrAction mobile app: what it is, how to get help, and how accounts are provisioned.",
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
        TrAction accounts are provisioned by your brokerage administrator.
        There is no self-signup in the app. If your office uses TrAction, sign
        in with the account your admin or team lead created for you. If you do
        not have an account yet, or you cannot sign in, contact your brokerage
        administrator first; they can create your account or reset your access.
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
