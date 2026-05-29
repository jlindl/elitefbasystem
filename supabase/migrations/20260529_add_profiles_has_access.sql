-- Add the access flag the Stripe webhook flips after a successful checkout.
alter table public.profiles
  add column if not exists has_access boolean not null default false;

-- The existing "Users can update own profile" RLS policy would let a logged-in
-- user grant themselves access by updating their own row. Block that at the
-- column-grant layer so only the service role (which bypasses RLS) can write
-- has_access. Users can still update full_name / avatar_url.
revoke update (has_access) on public.profiles from authenticated;
revoke update (has_access) on public.profiles from anon;
