// What the TrAction join form keeps in this tab's sessionStorage: the result
// it hands to the "you're in" page, and the agency code from the join link (so
// a reload does not lose it). Never the password.

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

const CODE_KEY = "traction-join-code";

/** Remembers the agency code from the join link for this tab only. */
export function writeJoinCode(code: string): void {
  try {
    sessionStorage.setItem(CODE_KEY, code);
  } catch {
    // Storage unavailable: a reload simply loses the code, as before.
  }
}

export function readJoinCode(): string {
  try {
    return sessionStorage.getItem(CODE_KEY) ?? "";
  } catch {
    return "";
  }
}

/** Forgets the code once it has been used, so the next person on a shared
 *  device cannot join the previous person's agency by accident. */
export function clearJoinCode(): void {
  try {
    sessionStorage.removeItem(CODE_KEY);
  } catch {
    // Nothing stored, nothing to clear.
  }
}
