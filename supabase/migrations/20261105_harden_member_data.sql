-- Security hardening found in the certificates review. Apply once, in order.
-- The app code already works with these in place (exam passes are written with the
-- service role after the server has marked the exam).

-- 1. Exam passes: members can read their own, but only the server can write them.
--    Without this, a member with the public API key could insert passes for every
--    module (and pick the date), skipping marking and minting certificates.
drop policy if exists "Users can record their own exam passes" on public.module_exam_passes;
drop policy if exists "Users can update their own exam passes" on public.module_exam_passes;
revoke insert, update, delete on public.module_exam_passes from anon, authenticated;

-- 2. Profiles: the earlier "revoke update (has_access)" had no effect, because a
--    column-level revoke doesn't remove a table-level grant. Replace the table grants
--    with column grants so members can edit their name but never has_access.
revoke insert, update on public.profiles from anon, authenticated;
grant update (full_name, avatar_url, updated_at) on public.profiles to authenticated;
grant insert (id, full_name, avatar_url, updated_at) on public.profiles to authenticated;

-- 3. Profiles were readable by anyone holding the public key, signed in or not
--    (every member's name and paid status). Members only ever need their own row.
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- Check after applying (both should return false):
--   select has_column_privilege('authenticated', 'public.profiles', 'has_access', 'UPDATE');
--   select has_table_privilege('authenticated', 'public.module_exam_passes', 'INSERT');
