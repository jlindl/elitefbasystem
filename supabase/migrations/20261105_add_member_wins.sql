-- Members' wins wall: members post their own wins (first sale, first shipment, exam
-- passed...) and cheer each other's.
--
-- Security model:
--  * Posting and cheering go through the app's server (service role) after it has
--    checked who the member is and validated the post. Members can't write the tables
--    directly, so they can't forge names, back- or future-date posts, or skip limits.
--  * The wall is read through wins_feed(), which never returns account ids, so an
--    anonymous post can't be traced back to a member and cheers stay private.
--  * Jakub moderates by setting status = 'hidden' in the Supabase table editor.

create table public.member_wins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  -- Snapshot of how the member chose to be shown when posting ("Sam T.", "Sam", "An Elite FBA member").
  display_name text not null check (char_length(display_name) between 1 and 60),
  kind text not null check (kind in ('first_sale', 'shipment', 'product', 'milestone', 'exam', 'other')),
  headline text not null check (char_length(headline) between 4 and 120),
  story text check (story is null or char_length(story) <= 600),
  -- Optional, self-reported, whole pounds.
  amount_gbp integer check (amount_gbp is null or (amount_gbp >= 0 and amount_gbp <= 10000000)),
  status text not null default 'published' check (status in ('published', 'hidden')),
  created_at timestamptz not null default now()
);

create index member_wins_feed_idx on public.member_wins (status, created_at desc);
create index member_wins_user_idx on public.member_wins (user_id, created_at desc);

alter table public.member_wins enable row level security;

-- Members may see and delete only their own rows directly (used for "my posts" counts
-- and the delete button). Everything else goes through the server or wins_feed().
create policy "Members can read their own wins"
  on public.member_wins for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Members can delete their own wins"
  on public.member_wins for delete
  to authenticated
  using (auth.uid() = user_id);

revoke insert, update on public.member_wins from anon, authenticated;

-- Every new post gets the real time, starts published, and the daily limit is checked
-- in the same transaction as the insert (no racing it with parallel requests).
create function public.member_wins_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.created_at := now();
  new.status := 'published';
  perform pg_advisory_xact_lock(hashtext(new.user_id::text));
  if (
    select count(*) from public.member_wins
    where user_id = new.user_id and created_at > now() - interval '24 hours'
  ) >= 5 then
    raise exception 'daily win limit reached' using errcode = 'P0001';
  end if;
  return new;
end;
$$;

create trigger member_wins_before_insert
  before insert on public.member_wins
  for each row execute function public.member_wins_before_insert();

create table public.member_win_cheers (
  win_id uuid not null references public.member_wins on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  created_at timestamptz not null default now(),
  primary key (win_id, user_id)
);

create index member_win_cheers_user_idx on public.member_win_cheers (user_id);

alter table public.member_win_cheers enable row level security;

-- Cheers are written by the server; members can only see their own.
create policy "Members can see their own cheers"
  on public.member_win_cheers for select
  to authenticated
  using (auth.uid() = user_id);

revoke insert, update, delete on public.member_win_cheers from anon, authenticated;

-- The wall: published wins with cheer counts, whether the caller cheered each one and
-- whether it's theirs - but never who posted it.
create function public.wins_feed(p_limit integer default 60)
returns table (
  id uuid,
  kind text,
  headline text,
  story text,
  amount_gbp integer,
  display_name text,
  created_at timestamptz,
  cheers bigint,
  cheered boolean,
  mine boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select
    w.id,
    w.kind,
    w.headline,
    w.story,
    w.amount_gbp,
    w.display_name,
    w.created_at,
    (select count(*) from public.member_win_cheers c where c.win_id = w.id) as cheers,
    exists (select 1 from public.member_win_cheers c where c.win_id = w.id and c.user_id = auth.uid()) as cheered,
    (w.user_id = auth.uid()) as mine
  from public.member_wins w
  where w.status = 'published' and auth.uid() is not null
  order by w.created_at desc
  limit least(greatest(coalesce(p_limit, 60), 1), 100);
$$;

-- Total published wins, for the wall's header.
create function public.wins_count()
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select count(*) from public.member_wins where status = 'published' and auth.uid() is not null;
$$;

revoke all on function public.wins_feed(integer) from public, anon;
revoke all on function public.wins_count() from public, anon;
grant execute on function public.wins_feed(integer) to authenticated;
grant execute on function public.wins_count() to authenticated;
