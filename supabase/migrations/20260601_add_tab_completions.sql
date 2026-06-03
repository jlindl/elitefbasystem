-- Tracks which (module, tab) sections each user has marked as complete.
-- One row per completed tab. Toggling off deletes the row.
create table public.tab_completions (
  user_id uuid not null references auth.users on delete cascade,
  module_id text not null,
  tab_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, module_id, tab_id)
);

alter table public.tab_completions enable row level security;

create policy "Users can view their own completions"
  on public.tab_completions for select
  using (auth.uid() = user_id);

create policy "Users can mark own completions"
  on public.tab_completions for insert
  with check (auth.uid() = user_id);

create policy "Users can unmark own completions"
  on public.tab_completions for delete
  using (auth.uid() = user_id);
