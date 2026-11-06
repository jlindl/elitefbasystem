"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentStudent } from "./get-student";
import { HEADLINE_MAX, STORY_MAX, WIN_KIND_IDS, charLength, cleanWinText, hasVisibleText, winDisplayName, type WinKind, type WinNameStyle } from "./win-kinds";
import { isMissingTable } from "./wins";

/** The form field a validation error belongs to, so the form can focus it. */
export type WinField = "kind" | "headline" | "story" | "amount";
type Result = { ok: true } | { ok: false; error: string; field?: WinField };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const POSTS_PER_DAY = 5;
const NOT_READY = "The wins wall isn't switched on yet. Please try again soon.";
const LIMIT_REACHED = "You've shared a lot of wins today - come back tomorrow for the next one.";

function refresh() {
  revalidatePath("/dashboard/wins");
  revalidatePath("/dashboard");
}

/**
 * Posts a win. Members can't write the table themselves: the server validates the
 * post, decides the display name, and inserts it with the service role. The database
 * stamps the time and enforces the daily limit atomically.
 */
export async function postWin(input: { kind: unknown; headline: unknown; story?: unknown; amount?: unknown; nameStyle?: unknown }): Promise<Result> {
  const kind = WIN_KIND_IDS.includes(input.kind as WinKind) ? (input.kind as WinKind) : null;
  if (!kind) return { ok: false, error: "Choose what kind of win it is.", field: "kind" };

  const headline = cleanWinText(input.headline);
  if (charLength(headline) < 4 || !hasVisibleText(headline)) return { ok: false, error: "Give your win a headline (at least 4 characters).", field: "headline" };
  if (charLength(headline) > HEADLINE_MAX) return { ok: false, error: `Keep the headline under ${HEADLINE_MAX} characters.`, field: "headline" };

  const story = cleanWinText(input.story, { multiline: true });
  if (charLength(story) > STORY_MAX) return { ok: false, error: `Keep the story under ${STORY_MAX} characters.`, field: "story" };

  let amount: number | null = null;
  if (input.amount !== undefined && input.amount !== null && input.amount !== "") {
    const n = typeof input.amount === "number" ? input.amount : Number(String(input.amount).replace(/[£,\s]/g, ""));
    if (!Number.isFinite(n) || n < 0 || n > 10_000_000) return { ok: false, error: "Enter the amount in whole pounds, e.g. 250.", field: "amount" };
    amount = Math.round(n);
  }

  const student = await getCurrentStudent();
  // Never build a public name from an email address: without a saved name, posts are anonymous.
  const nameStyle: WinNameStyle = !student.nameIsSet
    ? "anonymous"
    : input.nameStyle === "first" || input.nameStyle === "anonymous"
      ? input.nameStyle
      : "initial";

  const admin = createSupabaseAdminClient();
  if (!admin) return { ok: false, error: NOT_READY };

  // A friendly pre-check; the database enforces the limit for real.
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { count, error: countError } = await admin
    .from("member_wins")
    .select("id", { count: "exact", head: true })
    .eq("user_id", student.id)
    .gte("created_at", since);
  if (countError) return { ok: false, error: isMissingTable(countError) ? NOT_READY : "Couldn't post your win. Please try again." };
  if ((count ?? 0) >= POSTS_PER_DAY) return { ok: false, error: LIMIT_REACHED };

  const { error } = await admin.from("member_wins").insert({
    user_id: student.id,
    display_name: winDisplayName(student.fullName, nameStyle),
    kind,
    headline,
    story: story || null,
    amount_gbp: amount,
  });
  if (error) {
    if (error.code === "P0001") return { ok: false, error: LIMIT_REACHED };
    return { ok: false, error: isMissingTable(error) ? NOT_READY : "Couldn't post your win. Please try again." };
  }

  refresh();
  return { ok: true };
}

export async function deleteWin(id: unknown): Promise<Result> {
  if (typeof id !== "string" || !UUID.test(id)) return { ok: false, error: "That post couldn't be found." };
  const student = await getCurrentStudent();
  const supabase = await createSupabaseServerClient();
  // Row-level security only lets members delete their own posts.
  const { error } = await supabase.from("member_wins").delete().eq("id", id).eq("user_id", student.id);
  if (error) return { ok: false, error: "Couldn't delete that post. Please try again." };
  refresh();
  return { ok: true };
}

export async function setCheer(winId: unknown, on: unknown): Promise<Result> {
  if (typeof winId !== "string" || !UUID.test(winId) || typeof on !== "boolean") return { ok: false, error: "Something went wrong." };
  const student = await getCurrentStudent();
  const admin = createSupabaseAdminClient();
  if (!admin) return { ok: false, error: NOT_READY };

  if (on) {
    const { data: win } = await admin.from("member_wins").select("id").eq("id", winId).eq("status", "published").maybeSingle();
    if (!win) return { ok: false, error: "That post isn't on the wall any more." };
  }
  const { error } = on
    ? await admin.from("member_win_cheers").upsert({ win_id: winId, user_id: student.id }, { onConflict: "win_id,user_id", ignoreDuplicates: true })
    : await admin.from("member_win_cheers").delete().eq("win_id", winId).eq("user_id", student.id);
  if (error) return { ok: false, error: "Couldn't save that. Please try again." };
  revalidatePath("/dashboard/wins");
  return { ok: true };
}
