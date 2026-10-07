import { Metadata } from "next";
import Link from "next/link";
import { traction } from "@/data/traction";

export const metadata: Metadata = {
  title: "Delete your TrAction account",
  description:
    "How to request deletion of your TrAction account and the data associated with it.",
};

// Google Play (and Apple) require a public page that explains how a user can
// request deletion of their account, what gets deleted, and what is kept.
// Deletion is handled by email today; keep this page accurate if an in-app
// flow is added later.
export default function TractionDeleteAccountPage() {
  const subject = encodeURIComponent("TrAction account deletion request");
  const body = encodeURIComponent(
    "Please delete my TrAction account.\n\nAccount email: \nBrokerage: \n",
  );
  const mailto = `mailto:${traction.contactEmail}?subject=${subject}&body=${body}`;

  return (
    <article>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Delete your {traction.name} account
      </h1>

      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        You can ask us to delete your {traction.name} account and the data
        associated with it at any time. This page explains how to make the
        request, what is deleted, and what is kept.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">How to request deletion</h2>
      <ol className="list-decimal pl-6 text-lg leading-relaxed text-gray-700 mb-4 space-y-2">
        <li>
          Email{" "}
          <a href={mailto} className="underline hover:text-black">
            {traction.contactEmail}
          </a>{" "}
          from the email address on your {traction.name} account, with the
          subject &ldquo;{traction.name} account deletion request&rdquo;.
          Include your brokerage name so we can find the right account.
        </li>
        <li>
          We will reply to the account email to confirm the request. This
          protects you from someone else deleting your account.
        </li>
        <li>
          Once confirmed, we delete the account and its data within 30 days
          and send you a confirmation email.
        </li>
      </ol>
      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        You can also ask your brokerage administrator to request deletion on
        your behalf. Because accounts are administered by your brokerage, we
        may confirm the request with them.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">What is deleted</h2>
      <ul className="list-disc pl-6 text-lg leading-relaxed text-gray-700 mb-4 space-y-2">
        <li>Your sign-in credentials (email address and password).</li>
        <li>Your profile: name, role, and brokerage membership.</li>
        <li>
          All activity you logged: tasks, closings and any sale-price amounts,
          custom activities, personal goals, streaks, and points.
        </li>
        <li>
          Your entries in your brokerage&apos;s standings and in your
          mentor&apos;s coaching view, which are computed from the activity
          above.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-3">What is kept</h2>
      <ul className="list-disc pl-6 text-lg leading-relaxed text-gray-700 mb-4 space-y-2">
        <li>
          Copies in routine backups of our backend provider, which expire on
          their own within 30 days of deletion.
        </li>
        <li>
          The email thread in which you requested deletion, so we have a
          record that the request was fulfilled.
        </li>
        <li>
          Anything we are legally required to retain, which we do not expect
          to apply to ordinary accounts.
        </li>
      </ul>
      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        Deletion is permanent. If you later rejoin your brokerage on{" "}
        {traction.name}, you start with a fresh account and no history.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        Deleting the app is not the same
      </h2>
      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        Removing {traction.name} from your phone removes the local copy of
        your data but leaves your account and its history on our servers. To
        delete the account itself, follow the steps above.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">Questions</h2>
      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        See the{" "}
        <Link href={traction.privacyPath} className="underline hover:text-black">
          Privacy Policy
        </Link>{" "}
        for how we handle your information, or the{" "}
        <Link href={traction.supportPath} className="underline hover:text-black">
          Support page
        </Link>{" "}
        for other help. For anything else, email{" "}
        <a
          href={`mailto:${traction.contactEmail}`}
          className="underline hover:text-black"
        >
          {traction.contactEmail}
        </a>
        .
      </p>
    </article>
  );
}
