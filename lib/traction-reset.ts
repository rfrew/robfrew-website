// What the TrAction reset flow keeps in this tab's sessionStorage: the email
// whose password was just set, for the "password set" page. Never the
// password, never the recovery token.

const RESET_KEY = "traction-reset";

export function writeResetEmail(email: string): void {
  try {
    sessionStorage.setItem(RESET_KEY, email);
  } catch {
    // Storage unavailable: the done page shows a generic message.
  }
}

/** Stable string for useSyncExternalStore, or null. */
export function readResetEmail(): string | null {
  try {
    return sessionStorage.getItem(RESET_KEY);
  } catch {
    return null;
  }
}
