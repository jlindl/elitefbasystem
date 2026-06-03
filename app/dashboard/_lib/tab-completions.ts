"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CompletionKey = `${string}::${string}`;

const key = (moduleId: string, tabId: string): CompletionKey =>
  `${moduleId}::${tabId}`;

export async function getCompletedTabs(): Promise<Set<CompletionKey>> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Set();

  const { data, error } = await supabase
    .from("tab_completions")
    .select("module_id, tab_id")
    .eq("user_id", user.id);

  if (error || !data) return new Set();

  return new Set(data.map((r) => key(r.module_id, r.tab_id)));
}

export async function isTabCompleted(
  moduleId: string,
  tabId: string,
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from("tab_completions")
    .select("module_id")
    .eq("user_id", user.id)
    .eq("module_id", moduleId)
    .eq("tab_id", tabId)
    .maybeSingle();

  return !!data;
}

export async function setTabCompletion(
  moduleId: string,
  tabId: string,
  completed: boolean,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  if (completed) {
    const { error } = await supabase
      .from("tab_completions")
      .upsert(
        { user_id: user.id, module_id: moduleId, tab_id: tabId },
        { onConflict: "user_id,module_id,tab_id" },
      );
    if (error) return { ok: false, error: error.message };
  } else {
    const { error } = await supabase
      .from("tab_completions")
      .delete()
      .eq("user_id", user.id)
      .eq("module_id", moduleId)
      .eq("tab_id", tabId);
    if (error) return { ok: false, error: error.message };
  }

  revalidatePath("/dashboard/modules");
  revalidatePath(`/dashboard/modules/${moduleId}/${tabId}`);
  return { ok: true };
}
