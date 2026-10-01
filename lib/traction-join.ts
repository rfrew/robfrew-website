// What the TrAction join form hands to the "you're in" page: stored in this
// tab's sessionStorage across the navigation. Never the password or the code.

const JOINED_KEY = "traction-joined";

export interface Joined {
  email: string;
  agencyName?: string;
}

export function writeJoined(joined: Joined): void {
  try {
    sessionStorage.setItem(JOINED_KEY, JSON.stringify(joined));
  } catch {
    // Storage unavailable: the next page falls back to a generic message.
  }
}

/** Raw stored value (a stable string for useSyncExternalStore), or null. */
export function readJoinedRaw(): string | null {
  try {
    return sessionStorage.getItem(JOINED_KEY);
  } catch {
    return null;
  }
}

/** Parses a stored value, returning null unless it has the expected shape. */
export function parseJoined(raw: string | null): Joined | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const { email, agencyName } = parsed as Record<string, unknown>;
    if (typeof email !== "string" || !email) return null;
    return { email, agencyName: typeof agencyName === "string" ? agencyName : undefined };
  } catch {
    return null;
  }
}
