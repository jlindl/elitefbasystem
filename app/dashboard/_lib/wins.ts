import "server-only";
import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { kindInfo, type WinKind } from "./win-kinds";

export type Win = {
  id: string;
  kind: WinKind;
  headline: string;
  story: string | null;
  amount: number | null;
  displayName: string;
  createdAt: string;
  /** "2 days ago", worked out when the feed is read. */
  when: string;
  cheers: number;
  cheered: boolean;
  mine: boolean;
};

export type WinsFeed = { status: "ready"; wins: Win[] } | { status: "setup" } | { status: "error" };

/** True when the wins tables/functions haven't been created yet (migration not applied). */
export function isMissingTable(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  return (
    ["42P01", "42883", "PGRST202", "PGRST205"].includes(error.code ?? "") ||
    /does not exist|schema cache|could not find the function/i.test(error.message ?? "")
  );
}

type FeedRow = {
  id: string;
  kind: string;
  headline: string;
  story: string | null;
  amount_gbp: number | null;
  display_name: string;
  created_at: string;
  cheers: number | string;
  cheered: boolean;
  mine: boolean;
};

/**
 * Latest published wins with cheer counts, via the wins_feed() database function
 * (it never returns who posted what). Shared within one request.
 */
export const getWinsFeed = cache(async (limit = 60): Promise<WinsFeed> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error" };

  const { data, error } = await supabase.rpc("wins_feed", { p_limit: limit });
  if (error) return isMissingTable(error) ? { status: "setup" } : { status: "error" };

  const now = Date.now();
  return {
    status: "ready",
    wins: ((data ?? []) as FeedRow[]).map((r) => ({
      id: r.id,
      kind: kindInfo(r.kind).id,
      headline: r.headline,
      story: r.story,
      amount: r.amount_gbp,
      displayName: r.display_name,
      createdAt: r.created_at,
      when: relativeTime(r.created_at, now),
      cheers: Number(r.cheers) || 0,
      cheered: !!r.cheered,
      mine: !!r.mine,
    })),
  };
});

/** Total published wins (not just the ones loaded). Null if the wall isn't set up. */
export const getWinsTotal = cache(async (): Promise<number | null> => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("wins_count");
  if (error) return null;
  return Number(data) || 0;
});

/** How many wins the signed-in member has posted. Null if the wall isn't set up. */
export const getMyWinCount = cache(async (): Promise<number | null> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { count, error } = await supabase.from("member_wins").select("id", { count: "exact", head: true }).eq("user_id", user.id);
  if (error) return null;
  return count ?? 0;
});

/** "just now", "3 hours ago", "2 days ago", then a date. */
export function relativeTime(iso: string, now = Date.now()) {
  const s = Math.round((new Date(iso).getTime() - now) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });
  const abs = Math.abs(s);
  if (abs < 60) return "just now";
  if (abs < 3600) return rtf.format(Math.round(s / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(s / 3600), "hour");
  if (abs < 86400 * 7) return rtf.format(Math.round(s / 86400), "day");
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/London" });
}
