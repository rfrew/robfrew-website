import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { clientIp, ipThrottleKey, isRateLimited } from "@/lib/rate-limit";
import { createTractionAuthClient, isTractionAuthConfigured } from "@/lib/traction-auth";
import { traction } from "@/data/traction";

// Step 1 of the TrAction password reset (realestate-app spec 0014, decision
// 0027): ask Supabase Auth to email a recovery link. The email template (set
// in the Supabase dashboard) links literally to /traction/reset/confirm with
// the token hash, so no redirectTo is passed here and the redirect allow-list
// is not involved.
//
// Enumeration-safe by construction: every well-formed request gets the same
// 200 and the same sentence, whether or not the address has an account, and
// whether or not Supabase accepted the send (its own per-address and per-hour
// limits included). Only a malformed address gets a 400.
//
// Never log the email.

const CONFIRMATION =
  "If there's a TrAction account for that email, we've sent it a link to set a new password. Check your inbox and spam folder.";

function reply(status: number, body: object, headers?: Record<string, string>) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

export async function POST(request: Request) {
  try {
    if (!isTractionAuthConfigured) {
      console.error("TrAction reset not configured: missing TRACTION_SUPABASE_* env vars");
      return reply(503, {
        ok: false,
        error: "not_configured",
        message: `Password reset is temporarily unavailable. Email ${traction.contactEmail} and we'll reset it for you.`,
      });
    }

    // Flood guard per client. An office behind one address resetting at once
    // is a handful of requests, not twenty a minute.
    const client = ipThrottleKey(clientIp(request));
    if (isRateLimited(`traction-reset-request:${client}`, 20, 60_000)) {
      return reply(
        429,
        { ok: false, error: "busy", message: "Too many requests. Wait a minute and try again." },
        { "Retry-After": "60" }
      );
    }

    const data: unknown = await request.json().catch(() => null);
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const email = typeof raw.email === "string" ? raw.email.trim().toLowerCase() : "";
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return reply(400, {
        ok: false,
        error: "invalid_input",
        field: "email",
        message: "Enter a valid email address.",
      });
    }

    // Per-address cap, keyed on a hash so the address never sits in memory
    // as plain text. Over the cap we still answer the same way, and simply
    // don't ask Supabase to send again.
    const emailKey = createHash("sha256").update(email).digest("hex").slice(0, 32);
    if (!isRateLimited(`traction-reset-email:${emailKey}`, 3, 15 * 60_000)) {
      const auth = createTractionAuthClient();
      const { error } = await auth.auth.resetPasswordForEmail(email);
      if (error) {
        // Includes over_email_send_rate_limit and "user not found" variants.
        // Same answer either way; log the code for ops, never the address.
        console.warn(`TrAction reset: request not sent: ${error.code ?? error.status ?? "unknown"}`);
      }
    }

    return reply(200, { ok: true, message: CONFIRMATION });
  } catch (error) {
    console.error("TrAction reset request error:", error instanceof Error ? error.name : "unknown");
    // Still don't leak anything: a generic failure the page can show.
    return reply(500, {
      ok: false,
      error: "server_error",
      message: "Something went wrong. Please try again in a minute.",
    });
  }
}
