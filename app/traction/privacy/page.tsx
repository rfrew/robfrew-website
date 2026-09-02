import { Metadata } from "next";
import Link from "next/link";
import { traction } from "@/data/traction";

export const metadata: Metadata = {
  title: "TrAction Privacy Policy",
  description:
    "How the TrAction mobile app collects, uses, shares, and protects your information.",
};

// Content mirrors realestate-app/docs/legal/privacy-policy.md and must stay in
// step with the App Privacy label published in App Store Connect (Name, Email,
// User ID, user content; app functionality only; no tracking; not sold).

const h2 = "text-2xl font-semibold mt-10 mb-3";
const p = "text-lg leading-relaxed text-gray-700 mb-4";
const ul = "list-disc pl-6 space-y-3 text-lg leading-relaxed text-gray-700 mb-4";

export default function TractionPrivacyPage() {
  const mailto = `mailto:${traction.contactEmail}`;
  const contact = (
    <a href={mailto} className="underline hover:text-black">
      {traction.contactEmail}
    </a>
  );

  return (
    <article>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        {traction.name} Privacy Policy
      </h1>
      <p className="text-gray-600 mb-2">
        <strong>Effective date:</strong>{" "}
        <time dateTime={traction.effectiveDateISO}>{traction.effectiveDate}</time>
      </p>
      <p className="text-gray-600 mb-8">
        <strong>Last updated:</strong>{" "}
        <time dateTime={traction.effectiveDateISO}>{traction.effectiveDate}</time>
      </p>

      <p className={p}>
        This Privacy Policy explains how {traction.legalEntity} (&ldquo;we,&rdquo;
        &ldquo;us&rdquo;) collects, uses, and protects information in the
        TrAction mobile application (&ldquo;the App&rdquo;). TrAction is a
        professional activity-tracking tool provided to real estate agents
        through their brokerage. Accounts are created by a brokerage
        administrator; the App is not offered for general public
        self-registration.
      </p>

      <h2 className={h2}>Information we collect</h2>
      <ul className={ul}>
        <li>
          <strong>Account information.</strong> Your name, email address, and
          an account identifier (user ID), used to create and authenticate
          your account. Accounts are provisioned by your brokerage
          administrator.
        </li>
        <li>
          <strong>Activity you log.</strong> The prospecting and business
          activities you record (for example calls, notes, in-person visits,
          social posts, hours worked, and closed transactions), including the
          date and time of each entry and any amount you enter for a closed
          transaction.
        </li>
        <li>
          <strong>Goals and progress.</strong> Any goals you set and the
          points, streaks, and summaries the App derives from your logged
          activity.
        </li>
        <li>
          <strong>Technical information.</strong> Basic information necessary
          to operate the App, such as authentication tokens stored securely on
          your device.
        </li>
      </ul>
      <p className={p}>
        We do <strong>not</strong> collect your precise location, your
        contacts, advertising identifiers, or payment-card information. The
        App contains no third-party advertising and no third-party advertising
        or tracking SDKs.
      </p>

      <h2 className={h2}>How we use information</h2>
      <ul className={ul}>
        <li>
          To provide the App&apos;s core function: recording your activity and
          showing your progress, points, streaks, standings, and reports.
        </li>
        <li>
          To operate the coaching features described below (mentor visibility
          within your brokerage).
        </li>
        <li>To maintain the security and integrity of the service.</li>
      </ul>
      <p className={p}>
        We do <strong>not</strong> sell your personal information, and we do{" "}
        <strong>not</strong> use it for advertising.
      </p>

      <h2 className={h2}>How information is shared</h2>
      <ul className={ul}>
        <li>
          <strong>Within your brokerage.</strong> TrAction includes a coaching
          feature. If a mentor or manager at your brokerage is assigned to
          you, they can see your activity counts, points, streak, and
          closed-transaction <strong>counts</strong>. They do{" "}
          <strong>not</strong> see the sale-price amounts you enter or your
          personal goals. Company standings show top performers by points
          within your brokerage. Your data is isolated to your brokerage and
          is never shown to other brokerages.
        </li>
        <li>
          <strong>Service providers.</strong> We host data with our backend
          provider, Supabase, which stores it on our behalf under contract.
          Data is transmitted over encrypted connections and isolated per
          brokerage using row-level security.
        </li>
        <li>
          <strong>Legal.</strong> We may disclose information if required by
          law or to protect the rights, safety, or security of users or the
          service.
        </li>
      </ul>
      <p className={p}>
        We do not otherwise share your personal information with third
        parties.
      </p>

      <h2 className={h2}>Data retention and your choices</h2>
      <p className={p}>
        We retain your information for as long as your account is active. You
        may request access to, correction of, or deletion of your personal
        information by contacting us at {contact} or by asking your brokerage
        administrator. Because accounts are administered by your brokerage,
        some requests may be fulfilled through them. We will delete your
        personal information on request, subject to any legal obligation to
        retain it.
      </p>
      <p className={p}>
        Depending on where you live, you may have additional rights over your
        personal information (for example under the California Consumer
        Privacy Act or the EU/UK GDPR), including the rights to access,
        correct, delete, and port your data, and to object to certain
        processing. To exercise these rights, contact us at {contact}.
      </p>

      <h2 className={h2}>Security</h2>
      <p className={p}>
        We protect your information using encryption in transit, authenticated
        access, and per-brokerage data isolation (row-level security). No
        method of storage or transmission is completely secure, but we work to
        protect your information and to limit access to it.
      </p>

      <h2 className={h2}>Children</h2>
      <p className={p}>
        TrAction is a professional tool intended for real estate agents and is
        not directed to children. We do not knowingly collect personal
        information from children under 13 (or the minimum age required in
        your jurisdiction).
      </p>

      <h2 className={h2}>Changes to this policy</h2>
      <p className={p}>
        We may update this Privacy Policy from time to time. Material changes
        will be reflected by an updated &ldquo;Last updated&rdquo; date, and
        where appropriate we will provide additional notice.
      </p>

      <h2 className={h2}>Contact us</h2>
      <p className={p}>
        {traction.legalEntity}
        <br />
        {contact}
      </p>
      <p className={p}>
        Need help with the App itself? See the{" "}
        <Link href={traction.supportPath} className="underline hover:text-black">
          TrAction Support page
        </Link>
        .
      </p>
    </article>
  );
}
