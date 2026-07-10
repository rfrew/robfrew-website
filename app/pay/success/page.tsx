import Link from "next/link";
import { Metadata } from "next";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { formatPrice } from "@/data/services";

export const metadata: Metadata = {
  title: "Payment Received",
  robots: { index: false },
};

// In Next.js App Router, searchParams is async.
export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  // Look up the session to confirm and show what was paid. The {CHECKOUT_SESSION_ID}
  // placeholder in success_url is filled in by Stripe on redirect.
  let amountTotal: number | null = null;
  let email: string | null = null;

  if (session_id && isStripeConfigured) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      amountTotal = session.amount_total;
      email = session.customer_details?.email ?? null;
    } catch {
      // Fall through to the generic confirmation below.
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-2xl text-center">
        <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-4">
          Your payment was received
          {amountTotal ? ` — ${formatPrice(amountTotal)}` : ""}. I&apos;ll be in
          touch shortly to get started.
        </p>
        {email && (
          <p className="text-gray-500 mb-8">
            A receipt has been sent to {email}.
          </p>
        )}

        <Link
          href="/"
          className="inline-block bg-black text-white px-8 py-4 font-semibold hover:bg-gray-900 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
