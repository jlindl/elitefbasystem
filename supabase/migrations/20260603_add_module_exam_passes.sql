-- Tracks which module final exams each user has passed.
-- One row per (user, module). Upsert on every pass to keep the latest score.
create table public.module_exam_passes (
  user_id uuid not null references auth.users on delete cascade,
  module_id text not null,
  score_percent smallint not null check (score_percent between 0 and 100),
  passed_at timestamptz not null default now(),
  primary key (user_id, module_id)
);

alter table public.module_exam_passes enable row level security;

create policy "Users can view their own exam passes"
  on public.module_exam_passes for select
  using (auth.uid() = user_id);

create policy "Users can record their own exam passes"
  on public.module_exam_passes for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own exam passes"
  on public.module_exam_passes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
