"use client";

import { unstable_rethrow } from "next/navigation";
import { useEffect, useId, useOptimistic, useRef, useState, useTransition } from "react";
import { whatsappLink } from "../_lib/contact";
import { kindInfo } from "../_lib/win-kinds";
import { deleteWin, setCheer } from "../_lib/wins-actions";
import { buzz } from "./confetti";

export type WinCardData = {
  id: string;
  kind: string;
  headline: string;
  story: string | null;
  amount: number | null;
  displayName: string;
  when: string;
  cheers: number;
  cheered: boolean;
  mine: boolean;
};

const TINTS: Record<string, string> = {
  first_sale: "bg-emerald-50 text-emerald-900 ring-emerald-200",
  shipment: "bg-sky-50 text-sky-900 ring-sky-200",
  product: "bg-violet-50 text-violet-900 ring-violet-200",
  milestone: "bg-orange-50 text-orange-900 ring-orange-200",
  exam: "bg-amber-50 text-amber-900 ring-amber-200",
  other: "bg-surface-alt text-ink ring-line",
};

const OFFLINE = "Couldn't reach the server. Check your connection and try again.";

/** Calls a server action: a dropped connection becomes a message, a sign-in redirect still happens. */
async function attempt(action: () => Promise<{ ok: true } | { ok: false; error: string }>) {
  try {
    return await action();
  } catch (err) {
    unstable_rethrow(err);
    return { ok: false as const, error: OFFLINE };
  }
}

export function WinCard({ win, onDeleted }: { win: WinCardData; onDeleted?: () => void }) {
  const info = kindInfo(win.kind);
  const [cheer, setOptimisticCheer] = useOptimistic({ on: win.cheered, count: win.cheers }, (_s, next: { on: boolean; count: number }) => next);
  const [, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const long = (win.story?.length ?? 0) > 220;
  const promptId = useId();
  const deleteButton = useRef<HTMLButtonElement>(null);
  const confirmButton = useRef<HTMLButtonElement>(null);
  const focusNext = useRef<"confirm" | "delete" | null>(null);

  // The confirm step swaps the buttons, so move focus to the one that replaced the focused one.
  useEffect(() => {
    const target = focusNext.current === "confirm" ? confirmButton : focusNext.current === "delete" ? deleteButton : null;
    focusNext.current = null;
    target?.current?.focus();
  }, [confirming]);

  function askToDelete() {
    focusNext.current = "confirm";
    setError(null);
    setConfirming(true);
  }

  function keepIt() {
    focusNext.current = "delete";
    setConfirming(false);
  }

  function toggleCheer() {
    const next = { on: !cheer.on, count: cheer.count + (cheer.on ? -1 : 1) };
    if (next.on) buzz(10);
    setError(null);
    startTransition(async () => {
      setOptimisticCheer(next);
      const res = await attempt(() => setCheer(win.id, next.on));
      // On failure the optimistic cheer falls back to the saved one by itself.
      if (!res.ok) setError(res.error);
    });
  }

  function remove() {
    if (removing) return;
    setRemoving(true);
    setError(null);
    startTransition(async () => {
      const res = await attempt(() => deleteWin(win.id));
      if (!res.ok) {
        setError(res.error);
        setRemoving(false);
        return;
      }
      onDeleted?.();
    });
  }

  return (
    <article
      aria-labelledby={`win-${win.id}`}
      className={`flex h-full flex-col rounded-3xl border bg-surface p-5 transition-[box-shadow,transform,opacity] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] sm:p-6 ${
        win.mine ? "border-ink/20" : "border-line"
      } ${removing ? "pointer-events-none opacity-40" : ""}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.875rem] font-semibold ring-1 ${TINTS[info.id] ?? TINTS.other}`}>
          <span aria-hidden>{info.emoji}</span>
          {info.label}
        </span>
        <span className="text-[0.875rem] text-ink-muted">{win.when}</span>
      </div>

      <h3 id={`win-${win.id}`} className="mt-4 font-display text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em] text-ink [overflow-wrap:anywhere]">
        {win.headline}
      </h3>
      {win.amount !== null && (
        <p className="mt-2">
          <span className="inline-flex items-baseline gap-1.5 rounded-xl bg-ink px-3 py-1.5 font-display text-[1.125rem] font-semibold tabular-nums text-white">
            £{win.amount.toLocaleString("en-GB")}
            <span className="text-[0.75rem] font-medium text-white/75">self-reported</span>
          </span>
        </p>
      )}
      {win.story && (
        <div className="mt-3">
          <p className={`whitespace-pre-line text-[0.9375rem] leading-relaxed text-ink-muted [overflow-wrap:anywhere] ${long && !expanded ? "line-clamp-5" : ""}`}>{win.story}</p>
          {long && (
            <button type="button" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className="mt-1 text-[0.875rem] font-semibold text-ink underline decoration-ink/25 underline-offset-4">
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        <p className="flex items-center gap-2.5 text-[0.9375rem] font-medium text-ink">
          <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#ffb347] text-[0.8125rem] font-semibold text-white">
            {win.displayName === "An Elite FBA member" ? "★" : win.displayName.slice(0, 1).toUpperCase()}
          </span>
          {win.displayName}
          {win.mine && <span className="rounded-full bg-surface-alt px-2 py-0.5 text-[0.75rem] font-semibold text-ink-muted ring-1 ring-line">You</span>}
        </p>
        <button
          type="button"
          onClick={toggleCheer}
          aria-pressed={cheer.on}
          className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.9375rem] font-semibold transition-colors ${
            cheer.on ? "bg-orange-100 text-orange-900 ring-1 ring-orange-300" : "bg-surface-alt text-ink ring-1 ring-line hover:ring-ink/30"
          }`}
        >
          <span aria-hidden className={cheer.on ? "pop-in" : ""}>
            🔥
          </span>
          {cheer.on ? "Cheered" : "Cheer"}
          <span className="tabular-nums text-ink-muted">{cheer.count}</span>
          <span className="sr-only">{cheer.count === 1 ? "cheer" : "cheers"}</span>
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3 text-[0.875rem]">
        {win.mine ? (
          confirming ? (
            <span className="flex flex-wrap items-center gap-2">
              <span id={promptId} className="text-ink">
                Delete this post?
              </span>
              <button
                ref={confirmButton}
                type="button"
                onClick={remove}
                onKeyDown={(e) => e.key === "Escape" && keepIt()}
                aria-describedby={promptId}
                className="rounded-full bg-rose-700 px-3 py-1.5 font-semibold text-white hover:bg-rose-800"
              >
                Yes, delete
              </button>
              <button
                type="button"
                onClick={keepIt}
                onKeyDown={(e) => e.key === "Escape" && keepIt()}
                className="rounded-full px-3 py-1.5 font-semibold text-ink-muted hover:bg-surface-alt"
              >
                Keep it
              </button>
            </span>
          ) : (
            <button ref={deleteButton} type="button" onClick={askToDelete} className="font-medium text-ink-muted underline decoration-ink/20 underline-offset-4 hover:text-ink">
              Delete<span className="sr-only"> your post: {win.headline}</span>
            </button>
          )
        ) : (
          <a
            href={whatsappLink(`Hi Jakub, I'd like to flag a post on the wins wall: "${win.headline}" by ${win.displayName}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink-muted underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            Report<span className="sr-only"> this post to Jakub (opens WhatsApp)</span>
          </a>
        )}
        {error && (
          <span role="alert" className="font-medium text-rose-700">
            {error}
          </span>
        )}
      </div>
    </article>
  );
}
