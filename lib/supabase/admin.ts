import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client for the few writes members must not be able to make directly
 * (e.g. recording an exam pass after the server has marked it). Bypasses RLS, so only
 * call it after the server has checked who the user is and what they're allowed to do.
 * Returns null when the service key isn't configured.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
