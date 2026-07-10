import Stripe from "stripe";

// Reads STRIPE_SECRET_KEY from the environment (.env.local locally, project env
// vars on Vercel). The client is created lazily so `next build` never fails when
// the key is absent — the Stripe SDK throws if constructed with an empty key.

/** True only when a Stripe secret key is actually configured. */
export const isStripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

let stripeInstance: Stripe | null = null;

/** Returns a configured Stripe client, or throws if no key is set. */
export function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set.");
    }
    stripeInstance = new Stripe(key);
  }
  return stripeInstance;
}
