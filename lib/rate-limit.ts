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

/**
 * Throttle key for an IP: IPv4 as-is, IPv6 collapsed to its /64 prefix so one
 * device (or one home network) cannot dodge a limit by rotating addresses
 * inside the block it was assigned.
 */
export function ipThrottleKey(ip: string): string {
  if (!ip.includes(":")) return ip;
  const address = ip.split("%")[0].toLowerCase();
  // IPv4-mapped (::ffff:203.0.113.7) — key on the embedded IPv4 address.
  const mapped = address.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return mapped[1];

  const [head, tail] = address.split("::");
  const headGroups = head ? head.split(":") : [];
  const tailGroups = tail ? tail.split(":") : [];
  const groups =
    tail === undefined
      ? headGroups
      : [
          ...headGroups,
          ...Array(Math.max(0, 8 - headGroups.length - tailGroups.length)).fill("0"),
          ...tailGroups,
        ];
  return (
    groups
      .slice(0, 4)
      .map((g) => g.replace(/^0+(?=.)/, ""))
      .join(":") + "::/64"
  );
}
