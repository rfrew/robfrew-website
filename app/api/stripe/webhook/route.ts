import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

// Webhooks are how Stripe tells YOUR server, asynchronously, that something
// happened (a payment succeeded, a dispute opened, etc). Never treat a payment
// as complete based on the browser redirect alone — the webhook is the source
// of truth, because it comes straight from Stripe and is signature-verified.

// Stripe retries webhooks until it gets a 2xx, so the same event can arrive
// more than once. Track recently seen event IDs to skip duplicates. In-memory
// is enough here because fulfillment is just logging; each serverless instance
// has its own set, so if fulfillment ever does real work (emails, DB writes),
// move this to durable storage keyed on event.id.
const seenEventIds = new Set<string>();
const MAX_SEEN_EVENTS = 1000;

function alreadyProcessed(eventId: string): boolean {
  if (seenEventIds.has(eventId)) return true;
  seenEventIds.add(eventId);
  if (seenEventIds.size > MAX_SEEN_EVENTS) {
    // Drop the oldest entry (Sets iterate in insertion order).
    const oldest = seenEventIds.values().next().value;
    if (oldest) seenEventIds.delete(oldest);
  }
  return false;
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook not configured." },
      { status: 503 }
    );
  }

  // Signature verification requires the RAW request body, not parsed JSON.
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature ?? "",
      webhookSecret
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (alreadyProcessed(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // The payment (or first subscription charge) succeeded. This is where
      // you'd fulfill: kick off the work, mark the client as paid, etc.
      // Rob is notified by email via Dashboard notification settings.
      console.log("✅ Payment received:", {
        packageId: session.metadata?.packageId,
        mode: session.mode,
        email: session.customer_details?.email,
        amountTotal: session.amount_total,
        currency: session.currency,
      });
      break;
    }
    case "invoice.paid": {
      // Fires on every subscription charge, including monthly renewals.
      const invoice = event.data.object as Stripe.Invoice;
      console.log("✅ Subscription invoice paid:", {
        email: invoice.customer_email,
        amountPaid: invoice.amount_paid,
        currency: invoice.currency,
      });
      break;
    }
    case "invoice.payment_failed": {
      // A renewal charge failed. Stripe retries per Dashboard dunning
      // settings; worth knowing so the work can pause if it never recovers.
      const invoice = event.data.object as Stripe.Invoice;
      console.log("⚠️ Subscription payment failed:", {
        email: invoice.customer_email,
        amountDue: invoice.amount_due,
      });
      break;
    }
    case "customer.subscription.deleted": {
      // The subscription was canceled (by you, the client, or failed dunning).
      const subscription = event.data.object as Stripe.Subscription;
      console.log("ℹ️ Subscription canceled:", { id: subscription.id });
      break;
    }
    default:
      // Many event types will arrive; only act on the ones you care about.
      console.log("Unhandled Stripe event:", event.type);
  }

  // Always 2xx quickly so Stripe knows the event was received.
  return NextResponse.json({ received: true });
}
