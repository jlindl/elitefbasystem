"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  MISSIONS_BY_ID,
  isStepComplete,
  isUnlocked,
  quizXp,
  sanitize,
  stepKey,
  type Progress,
  type StepData,
} from "./missions";

const NOT_SET_UP = "Missions aren't switched on yet - the database update still needs applying.";

type StepRow = { mission_id: string; step_id: string; data: StepData | null; completed_at: string | null };

async function loadProgress(userId: string): Promise<Progress | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("mission_progress")
    .select("mission_id, step_id, data, completed_at")
    .eq("user_id", userId);
  if (error) return null;
  return {
    steps: Object.fromEntries(
      ((data ?? []) as StepRow[]).map((r) => [
        stepKey(r.mission_id, r.step_id),
        { data: r.data ?? {}, completedAt: r.completed_at },
      ]),
    ),
  };
}

/** The signed-in student's progress. Empty if signed out or not migrated. */
export async function getMyProgress(): Promise<Progress> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { steps: {} };
  return (await loadProgress(user.id)) ?? { steps: {} };
}

export async function saveStep(
  missionId: string,
  stepId: string,
  raw: StepData,
): Promise<{ ok: true; complete: boolean } | { ok: false; error: string }> {
  const mission = MISSIONS_BY_ID.get(missionId);
  const step = mission?.steps.find((s) => s.id === stepId);
  if (!mission || !step) return { ok: false, error: "Unknown step." };

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const progress = await loadProgress(user.id);
  if (!progress) return { ok: false, error: NOT_SET_UP };
  if (!isUnlocked(progress, mission)) return { ok: false, error: "This mission is still locked." };

  const previous = progress.steps[stepKey(mission.id, step.id)];
  let data = sanitize(step, raw ?? {});
  const complete = isStepComplete(step, data);

  // Replaying a quiz keeps the best score.
  if (step.type === "quiz" && previous?.completedAt && quizXp(step, previous.data) >= quizXp(step, data)) {
    data = previous.data;
  }
  // Keep the original completion time so streaks reflect when it was first done.
  const completedAt = complete ? previous?.completedAt ?? new Date().toISOString() : null;

  const { error } = await supabase.from("mission_progress").upsert(
    {
      user_id: user.id,
      mission_id: mission.id,
      step_id: step.id,
      data,
      completed_at: completedAt,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,mission_id,step_id" },
  );
  if (error) return { ok: false, error: error.message };

  revalidatePath("/dashboard/missions");
  revalidatePath("/dashboard");
  return { ok: true, complete };
}
