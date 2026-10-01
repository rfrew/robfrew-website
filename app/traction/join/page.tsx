import { Metadata } from "next";
import TractionJoinForm from "@/components/TractionJoinForm";
import { traction } from "@/data/traction";

// Reached only from the link an agent's office sends them — kept out of the
// sitemap, the nav and search results. Deliberately agency-neutral: the agency
// is only named after a valid code is accepted.
export const metadata: Metadata = {
  title: { absolute: "Join TrAction" },
  description: "Create your TrAction account with the code from your office.",
  robots: { index: false, follow: false },
};

export default function TractionJoinPage() {
  return (
    <article className="max-w-md mx-auto">
      <TractionJoinForm
        contactEmail={traction.contactEmail}
        donePath={`${traction.joinPath}/done`}
      />
    </article>
  );
}
