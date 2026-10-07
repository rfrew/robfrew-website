import { Metadata } from "next";
import TractionResetRequest from "@/components/TractionResetRequest";
import { traction } from "@/data/traction";

// Password reset, step 1 (realestate-app spec 0014). Linked from the support
// page and the join page; later from the app's sign-in screen.
export const metadata: Metadata = {
  title: { absolute: "Reset your TrAction password" },
  description: "Request a link to set a new password for your TrAction account.",
  robots: { index: false, follow: false },
};

export default function TractionResetPage() {
  return (
    <article className="max-w-md mx-auto">
      <TractionResetRequest
        contactEmail={traction.contactEmail}
        supportPath={traction.supportPath}
      />
    </article>
  );
}
