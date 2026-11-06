"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validatePersonName, type NameCheck } from "./person-name";

export type NameResult = NameCheck;

/**
 * Saves the name printed on the student's certificates (their profile name).
 * Once a member holds a certificate under a real name, the name is locked, so one
 * account can't re-issue certificates under other people's names. Jakub can still
 * correct it for them.
 */
export async function updateDisplayName(raw: string): Promise<NameResult> {
  const checked = validatePersonName(raw);
  if (!checked.ok) return checked;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "You're signed out. Sign in and try again." };

  const [{ data: profile }, { count: passes }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
    supabase.from("module_exam_passes").select("module_id", { count: "exact", head: true }).eq("user_id", user.id),
  ]);
  const current = profile?.full_name ? validatePersonName(profile.full_name) : null;
  if (current?.ok && (passes ?? 0) > 0) {
    if (current.name === checked.name) return checked;
    return { ok: false, error: "Your name is on your certificates, so it's locked. Message Jakub if it needs correcting." };
  }

  const now = new Date().toISOString();
  const { data: updated, error } = await supabase
    .from("profiles")
    .update({ full_name: checked.name, updated_at: now })
    .eq("id", user.id)
    .select("id");
  if (error) return { ok: false, error: "Couldn't save your name. Please try again." };

  // Accounts created before the signup trigger may have no profile row yet.
  if (!updated?.length) {
    const { error: insertError } = await supabase.from("profiles").insert({ id: user.id, full_name: checked.name, updated_at: now });
    if (insertError) return { ok: false, error: "Couldn't save your name. Please try again." };
  }

  revalidatePath("/dashboard", "layout");
  return checked;
}
