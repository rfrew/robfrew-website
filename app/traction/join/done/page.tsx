import { Metadata } from "next";
import TractionJoinDone from "@/components/TractionJoinDone";
import { traction } from "@/data/traction";

// Where the join form lands after creating an account. A separate URL (not an
// in-place swap) so the browser offers to save the password just chosen.
export const metadata: Metadata = {
  title: "You're in",
  description: "Your TrAction account is ready.",
  robots: { index: false, follow: false },
};

export default function TractionJoinDonePage() {
  return (
    <article className="max-w-md mx-auto">
      <TractionJoinDone
        contactEmail={traction.contactEmail}
        appStoreUrl={traction.appStoreUrl}
        joinPath={traction.joinPath}
      />
    </article>
  );
}
