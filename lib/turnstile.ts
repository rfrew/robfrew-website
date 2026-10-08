// Server-side verification of Cloudflare Turnstile tokens.
// https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
//
// Env (set in .env.local and Vercel):
//   NEXT_PUBLIC_TURNSTILE_SITE_KEY — rendered into the widget on the client
//   TURNSTILE_SECRET_KEY           — used here, never shipped to the browser
// Cloudflare's documented test keys (always pass) are listed in .env.example
// for local development.

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** True when Turnstile is configured on the server (secret present). */
export function turnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

/**
 * Returns true only when Cloudflare confirms the token is valid for this
 * site. Any network error, timeout or malformed answer counts as a failure —
 * the caller responds with a retryable 400, never a silent pass.
 */
export async function verifyTurnstile(
  token: unknown,
  remoteIp?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || typeof token !== "string" || token.length === 0) return false;
  // Cloudflare caps tokens at 2048 characters; anything longer is junk.
  if (token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("Turnstile siteverify HTTP error:", response.status);
      return false;
    }
    const result = (await response.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    if (result.success !== true) {
      // Error codes are Cloudflare's, not visitor data — safe to log.
      console.warn("Turnstile rejected token:", result["error-codes"] ?? []);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Turnstile siteverify failed:", error);
    return false;
  }
}
