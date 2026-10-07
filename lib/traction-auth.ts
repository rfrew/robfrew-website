import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase Auth client for the TrAction password-reset routes
// (realestate-app spec 0014, decision 0027). Uses the PUBLISHABLE (anon) key:
// the two calls these routes make — resetPasswordForEmail and
// verifyOtp/updateUser — are ordinary end-user auth calls, so no privileged
// key is needed and none is involved. A fresh client per request, with no
// session persistence, so the recovery session verifyOtp mints never outlives
// the request that used it.
//
// Env (Vercel Production; .env.local locally):
//   TRACTION_SUPABASE_URL              — shared with the join route
//   TRACTION_SUPABASE_PUBLISHABLE_KEY  — the project's anon / publishable key

/** True only when the reset routes have what they need. */
export const isTractionAuthConfigured = Boolean(
  process.env.TRACTION_SUPABASE_URL && process.env.TRACTION_SUPABASE_PUBLISHABLE_KEY
);

export function createTractionAuthClient(): SupabaseClient {
  const url = process.env.TRACTION_SUPABASE_URL;
  const key = process.env.TRACTION_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("TrAction Supabase auth env vars are not set.");
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
}
