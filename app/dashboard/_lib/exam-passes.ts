import "server-only";
import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ExamPass = { moduleId: string; passedAt: string };

/**
 * The signed-in student's exam passes with the date each was first passed.
 * Kept out of the "use server" actions file so it is not exposed as a callable endpoint.
 */
export const getExamPasses = cache(async (): Promise<ExamPass[]> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("module_exam_passes")
    .select("module_id, passed_at")
    .eq("user_id", user.id);

  if (error || !data) return [];
  return data.map((r) => ({ moduleId: r.module_id as string, passedAt: r.passed_at as string }));
});
