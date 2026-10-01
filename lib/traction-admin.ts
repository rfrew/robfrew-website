import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only admin client for the TrAction join endpoint. Reads
// TRACTION_SUPABASE_URL + TRACTION_SUPABASE_SECRET_KEY from the environment
// (.env.local locally, Production-only env vars on Vercel). The key bypasses
// row-level security for the whole TrAction project, so it must never be
// imported from a client component, logged, or given a NEXT_PUBLIC_ name.
// Created lazily so `next build` and Preview deploys work without it.

/** True only when both TrAction env vars are set. */
export const isTractionConfigured = Boolean(
  process.env.TRACTION_SUPABASE_URL && process.env.TRACTION_SUPABASE_SECRET_KEY
);

let adminClient: SupabaseClient | null = null;

/** Returns the TrAction admin client, or throws if it is not configured. */
export function getTractionAdmin(): SupabaseClient {
  if (!adminClient) {
    const url = process.env.TRACTION_SUPABASE_URL;
    const key = process.env.TRACTION_SUPABASE_SECRET_KEY;
    if (!url || !key) {
      throw new Error("TrAction Supabase env vars are not set.");
    }
    adminClient = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return adminClient;
}
