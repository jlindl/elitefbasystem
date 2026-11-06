"use client";

import Link from "next/link";
import { useState } from "react";

/** Flip-to-reveal flashcard for one dictionary term. */
export function TermOfDay({
  term,
  acronymFor,
  definition,
  category,
}: {
  term: string;
  acronymFor: string;
  definition: string;
  category: string;
}) {
  const [shown, setShown] = useState(false);
  return (
    <div className="spot lift relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink-subtle">📖 Term of the day</p>
        <span className="rounded-full bg-surface-alt px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ink-subtle">
          {category}
        </span>
      </div>
      <p className="mt-4 font-display text-[2rem] font-semibold leading-none tracking-[-0.03em] text-ink">{term}</p>
      {acronymFor && <p className="mt-1.5 text-[0.9rem] italic text-ink-subtle">{acronymFor}</p>}

      <div className="relative mt-4 flex-1">
        <p
          className={`text-[0.95rem] leading-relaxed text-ink-muted transition-all duration-500 ${
            shown ? "blur-0 opacity-100" : "select-none blur-[6px] opacity-60"
          }`}
          aria-hidden={!shown}
        >
          {definition}
        </p>
        {!shown && (
          <button
            type="button"
            onClick={() => setShown(true)}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="rounded-full bg-ink px-4 py-2 text-[0.85rem] font-semibold text-white shadow-lg transition-transform hover:scale-105">
              Do you know it? Tap to reveal
            </span>
          </button>
        )}
      </div>

      <Link
        href="/dashboard/tools/dictionary"
        className="group mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-ink"
      >
        Browse all terms <span aria-hidden className="nudge">→</span>
      </Link>
    </div>
  );
}
