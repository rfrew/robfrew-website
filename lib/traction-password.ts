// Password rules shared by the TrAction join and reset forms and their API
// routes. Isomorphic (TextEncoder exists in browsers and Node 18+).

export const PASSWORD_MIN = 8;
// bcrypt (Supabase Auth's hash) reads at most 72 bytes.
export const PASSWORD_MAX_BYTES = 72;

/** Returns a user-facing problem with the password, or null if it is acceptable. */
export function passwordProblem(password: string): string | null {
  if (password.length < PASSWORD_MIN) {
    return `Use at least ${PASSWORD_MIN} characters.`;
  }
  if (new TextEncoder().encode(password).length > PASSWORD_MAX_BYTES) {
    return "That password is too long. Use a shorter one.";
  }
  return null;
}
