"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { WIN_KINDS } from "../_lib/win-kinds";
import { WinCard, type WinCardData } from "./win-card";

/** Filterable grid of wins. */
export function WinsFeed({ wins, empty }: { wins: WinCardData[]; empty: ReactNode }) {
  const [filter, setFilter] = useState<string>("all");
  // Deleted posts leave at once, before the refreshed wall arrives.
  const [removed, setRemoved] = useState<ReadonlySet<string>>(() => new Set());
  const [deletions, setDeletions] = useState(0);
  const deletedNote = useRef<HTMLParagraphElement>(null);
  const list = wins.filter((w) => !removed.has(w.id));
  const present = new Set(list.map((w) => w.kind));
  const kinds = WIN_KINDS.filter((k) => present.has(k.id));
  // If the last post of the chosen kind goes, show everything again.
  const active = present.has(filter) ? filter : "all";
  const shown = active === "all" ? list : list.filter((w) => w.kind === active);

  // A deleted post takes the focused button with it: land at the top of the wall and say so.
  useEffect(() => {
    if (deletions) deletedNote.current?.focus();
  }, [deletions]);

  return (
    <div>
      {kinds.length > 1 && (
        <div role="group" aria-label="Filter wins" className="flex flex-wrap gap-2">
          {[{ id: "all", label: "All wins", emoji: "" }, ...kinds].map((k) => {
            const on = active === k.id;
            return (
              <button
                key={k.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(k.id)}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[0.9375rem] font-medium transition-colors ${
                  on ? "bg-ink text-white" : "border border-line bg-surface text-ink hover:border-ink/30"
                }`}
              >
                {k.emoji && <span aria-hidden>{k.emoji}</span>}
                {k.label}
              </button>
            );
          })}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {active === "all" ? "" : `Showing ${shown.length} ${shown.length === 1 ? "win" : "wins"}`}
      </p>
      <p ref={deletedNote} tabIndex={-1} className="sr-only">
        {deletions ? "Post deleted." : ""}
      </p>
      {list.length === 0 ? (
        empty
      ) : (
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {shown.map((w) => (
          <li key={w.id}>
            <WinCard
              win={w}
              onDeleted={() => {
                setRemoved((s) => new Set(s).add(w.id));
                setDeletions((n) => n + 1);
              }}
            />
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

/** On phones the composer starts folded so the wall is visible; on desktop it is always open. */
export function ComposerFold({ children, startOpen }: { children: ReactNode; startOpen: boolean }) {
  const [open, setOpen] = useState(startOpen);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="wins-composer"
        onClick={() => setOpen((v) => !v)}
        className="btn btn-primary btn-aa h-12 w-full lg:hidden"
      >
        {open ? "Hide the form" : "🏆 Share a win"}
      </button>
      <div id="wins-composer" className={`${open ? "mt-4" : "max-lg:hidden"} lg:mt-0`}>
        {children}
      </div>
    </div>
  );
}
