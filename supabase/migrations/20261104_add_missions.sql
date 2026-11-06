-- Missions: real-world tasks and quiz rounds as bite-size steps. Students save
-- each step as they go; XP, levels, badges and streaks are all derived from
-- these rows.

create table public.mission_progress (
  user_id uuid not null references auth.users on delete cascade,
  mission_id text not null,
  step_id text not null,
  data jsonb not null default '{}'::jsonb,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, mission_id, step_id)
);

alter table public.mission_progress enable row level security;

create policy "Students read own mission progress"
  on public.mission_progress for select
  using (auth.uid() = user_id);

create policy "Students save own mission progress"
  on public.mission_progress for insert
  with check (auth.uid() = user_id);

create policy "Students update own mission progress"
  on public.mission_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
