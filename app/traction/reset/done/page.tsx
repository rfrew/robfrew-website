import { Metadata } from "next";
import TractionResetDone from "@/components/TractionResetDone";
import { traction } from "@/data/traction";

// Where the reset form lands after setting the password. A separate URL (not
// an in-place swap) so the browser offers to save the password just chosen.
export const metadata: Metadata = {
  title: { absolute: "TrAction: password set" },
  description: "Your TrAction password has been changed.",
  robots: { index: false, follow: false },
};

export default function TractionResetDonePage() {
  return (
    <article className="max-w-md mx-auto">
      <TractionResetDone
        contactEmail={traction.contactEmail}
        appStoreUrl={traction.appStoreUrl}
        appScheme={traction.appScheme}
      />
    </article>
  );
}
