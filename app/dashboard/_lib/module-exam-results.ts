"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MODULE_EXAM_PASS_THRESHOLD } from "./module-quizzes";

export async function getPassedModules(): Promise<Set<string>> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Set();

  const { data, error } = await supabase
    .from("module_exam_passes")
    .select("module_id")
    .eq("user_id", user.id);

  if (error || !data) return new Set();
  return new Set(data.map((r) => r.module_id));
}

export async function recordExamPass(
  moduleId: string,
  scorePercent: number,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (scorePercent < MODULE_EXAM_PASS_THRESHOLD * 100) {
    return { ok: false, error: "Score below pass threshold." };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const { error } = await supabase
    .from("module_exam_passes")
    .upsert(
      {
        user_id: user.id,
        module_id: moduleId,
        score_percent: scorePercent,
      },
      { onConflict: "user_id,module_id" },
    );

  if (error) return { ok: false, error: error.message };

  revalidatePath("/dashboard/modules");
  return { ok: true };
}
