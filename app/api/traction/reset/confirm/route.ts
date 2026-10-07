import { NextResponse } from "next/server";
import { clientIp, ipThrottleKey, isRateLimited } from "@/lib/rate-limit";
import { createTractionAuthClient, isTractionAuthConfigured } from "@/lib/traction-auth";
import { passwordProblem } from "@/lib/traction-password";
import { traction } from "@/data/traction";

// Step 2 of the TrAction password reset (realestate-app spec 0014, decision
// 0027): redeem the recovery token and set the new password in ONE request.
// The confirm page never touches Supabase on load, so a mail scanner that
// pre-fetches the link cannot consume the token; only this POST, carrying the
// new password, does.
//
// Order: validate password -> verifyOtp (consumes the token, mints a
// recovery session on this per-request client) -> updateUser -> signOut
// (scope global: the recovery session and every other session for the
// account are revoked). The browser never receives a session.
//
// Never log the token, the password or the email.

type Field = "password";

interface ConfirmBody {
  ok: boolean;
  error?: string;
  field?: Field;
  message: string;
  email?: string;
}

function reply(status: number, body: ConfirmBody, headers?: Record<string, string>) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

const invalidLink = () =>
  reply(400, {
    ok: false,
    error: "invalid_link",
    message:
      "This link has expired or has already been used. Request a new one and try again.",
  });

export async function POST(request: Request) {
  try {
    if (!isTractionAuthConfigured) {
      console.error("TrAction reset not configured: missing TRACTION_SUPABASE_* env vars");
      return reply(503, {
        ok: false,
        error: "not_configured",
        message: "Password reset is temporarily unavailable.",
      });
    }

    const client = ipThrottleKey(clientIp(request));
    if (isRateLimited(`traction-reset-confirm:${client}`, 20, 60_000)) {
      return reply(
        429,
        { ok: false, error: "busy", message: "Too many attempts. Wait a minute and try again." },
        { "Retry-After": "60" }
      );
    }

    const data: unknown = await request.json().catch(() => null);
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};

    const tokenHash = typeof raw.tokenHash === "string" ? raw.tokenHash.trim() : "";
    if (!/^[A-Za-z0-9_.-]{16,512}$/.test(tokenHash)) return invalidLink();

    const password = typeof raw.password === "string" ? raw.password : "";
    const problem = passwordProblem(password);
    if (problem) {
      return reply(400, { ok: false, error: "invalid_input", field: "password", message: problem });
    }

    const auth = createTractionAuthClient();

    const { data: verified, error: verifyError } = await auth.auth.verifyOtp({
      type: "recovery",
      token_hash: tokenHash,
    });
    if (verifyError || !verified.session || !verified.user) {
      console.warn(`TrAction reset: verify failed: ${verifyError?.code ?? "no_session"}`);
      return invalidLink();
    }

    const { error: updateError } = await auth.auth.updateUser({ password });
    // Whatever happened, end the recovery session (and, on success, every
    // other session for this account).
    const { error: signOutError } = await auth.auth.signOut({ scope: "global" });
    if (signOutError) {
      console.warn(`TrAction reset: signOut failed: ${signOutError.code ?? "unknown"}`);
    }

    if (updateError) {
      // The token is spent by now, so each of these needs a fresh link.
      const code = updateError.code;
      if (code === "weak_password") {
        return reply(400, {
          ok: false,
          error: "weak_password",
          field: "password",
          message:
            "That password is too easy to guess. Request a new link and choose a different one.",
        });
      }
      if (code === "same_password") {
        return reply(400, {
          ok: false,
          error: "same_password",
          field: "password",
          message:
            "That's already your password. Sign in with it, or request a new link to choose a different one.",
        });
      }
      console.error(`TrAction reset: updateUser failed: ${code ?? "unknown"}`);
      return reply(500, {
        ok: false,
        error: "server_error",
        message: `Something went wrong and your password was not changed. Request a new link, or email ${traction.contactEmail}.`,
      });
    }

    console.log(`TrAction reset: password set for ${verified.user.id}`);
    return reply(200, { ok: true, message: "Password set.", email: verified.user.email });
  } catch (error) {
    console.error("TrAction reset confirm error:", error instanceof Error ? error.name : "unknown");
    return reply(500, {
      ok: false,
      error: "server_error",
      message: `Something went wrong. Please try again, or email ${traction.contactEmail}.`,
    });
  }
}
