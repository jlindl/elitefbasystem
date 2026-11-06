"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MODULE_CERTIFICATES } from "./certificate-defs";
import { MODULE_EXAM_PASS_THRESHOLD, MODULE_QUIZZES, MODULE_REQUIRED_TABS } from "./module-quizzes";
import { getCompletedTabs } from "./tab-completions";

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

export type ExamResult =
  | { ok: true; passed: boolean; percent: number; certificate: string | null }
  | { ok: false; error: string };

/**
 * Marks a final exam on the server from the student's answers (never a client-reported
 * score), and records the pass. A pass is what issues the module certificate.
 */
export async function recordExamPass(moduleId: string, answers: unknown): Promise<ExamResult> {
  if (typeof moduleId !== "string" || !Object.hasOwn(MODULE_QUIZZES, moduleId)) return { ok: false, error: "This exam doesn't exist." };
  const quiz = MODULE_QUIZZES[moduleId];
  if (!Array.isArray(answers) || answers.length !== quiz.length) {
    return { ok: false, error: "Answer every question, then submit again." };
  }

  const correct = quiz.reduce((n, q, i) => n + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const percent = Math.round((correct / quiz.length) * 100);
  if (correct / quiz.length < MODULE_EXAM_PASS_THRESHOLD) {
    return { ok: true, passed: false, percent, certificate: null };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "You're signed out. Sign in and submit again." };

  const required = MODULE_REQUIRED_TABS[moduleId] ?? [];
  const completed = await getCompletedTabs();
  if (required.some((tabId) => !completed.has(`${moduleId}::${tabId}`))) {
    return { ok: false, error: "Mark every lesson in this module complete first." };
  }

  // Written by the server (service role) once marked, so members can't insert passes directly.
  // Falls back to the member's own session where the service key isn't configured.
  const writer = createSupabaseAdminClient() ?? supabase;
  const { error } = await writer
    .from("module_exam_passes")
    .upsert(
      {
        user_id: user.id,
        module_id: moduleId,
        score_percent: percent,
      },
      { onConflict: "user_id,module_id" },
    );

  if (error) return { ok: false, error: "We couldn't save your pass. Check your connection and try again." };

  revalidatePath("/dashboard", "layout");
  const certificate = MODULE_CERTIFICATES.find((c) => c.moduleId === moduleId)?.slug ?? null;
  return { ok: true, passed: true, percent, certificate };
}
