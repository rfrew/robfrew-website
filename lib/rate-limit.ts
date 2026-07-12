// Small in-memory sliding-window rate limiter for the API routes. Like the
// webhook dedupe, state is per serverless instance — a determined attacker
// can spread requests across instances, but this stops the casual abuse that
// matters for a portfolio site without adding a Redis dependency.

const requestLog = new Map<string, number[]>();
const MAX_TRACKED_KEYS = 5000;

/**
 * Returns true if `key` has exceeded `limit` requests in the past `windowMs`.
 * Callers should respond 429 when this returns true.
 */
export function isRateLimited(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const cutoff = now - windowMs;

  const timestamps = (requestLog.get(key) ?? []).filter((t) => t > cutoff);
  if (timestamps.length >= limit) {
    requestLog.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);

  if (requestLog.size > MAX_TRACKED_KEYS) {
    // Drop the oldest-inserted key to bound memory.
    const oldest = requestLog.keys().next().value;
    if (oldest) requestLog.delete(oldest);
  }
  return false;
}

/** Best-effort client IP: first hop of x-forwarded-for (set by Vercel). */
export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}
