import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getServicePackage } from "@/data/services";

export async function POST(request: Request) {
  try {
    if (!isStripeConfigured) {
      return NextResponse.json(
        { error: "Payments are not configured yet." },
        { status: 503 }
      );
    }

    const { packageId } = await request.json();
    const pkg = getServicePackage(packageId);

    if (!pkg) {
      return NextResponse.json(
        { error: "Unknown package." },
        { status: 400 }
      );
    }

    // Build absolute URLs for redirect after payment. Prefer the request origin
    // so this works on localhost and in production without extra config.
    const origin =
      request.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000";

    // A Checkout Session is the core object: it represents one customer's
    // attempt to pay. Stripe hosts the secure card-entry page; we just hand
    // off to session.url and let Stripe handle PCI, 3DS, wallets, etc.
    // Packages with an `interval` are subscriptions: Stripe then charges the
    // saved card automatically each period and handles retries/dunning.
    const session = await getStripe().checkout.sessions.create({
      mode: pkg.interval ? "subscription" : "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: pkg.amount,
            product_data: {
              name: pkg.name,
              description: pkg.description,
            },
            ...(pkg.interval && {
              recurring: { interval: pkg.interval },
            }),
          },
        },
      ],
      // Collect the client's email so you can match the payment to a person.
      billing_address_collection: "auto",
      success_url: `${origin}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pay`,
      // Metadata is echoed back on the webhook event — handy for fulfillment.
      metadata: { packageId: pkg.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session error:", error);
    return NextResponse.json(
      { error: "Could not start checkout." },
      { status: 500 }
    );
  }
}
