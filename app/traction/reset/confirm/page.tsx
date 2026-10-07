import { Metadata } from "next";
import TractionResetConfirm from "@/components/TractionResetConfirm";
import { traction } from "@/data/traction";

// Password reset, step 2: where the recovery email's link lands. The token
// is read on the client and only sent with the new password (decision 0027).
export const metadata: Metadata = {
  title: { absolute: "Choose a new TrAction password" },
  description: "Set a new password for your TrAction account.",
  robots: { index: false, follow: false },
};

export default function TractionResetConfirmPage() {
  return (
    <article className="max-w-md mx-auto">
      <TractionResetConfirm
        contactEmail={traction.contactEmail}
        requestPath={traction.resetPath}
        donePath={`${traction.resetPath}/done`}
      />
    </article>
  );
}
