"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "@/app/components/icons";
import { mergeSeen, parseSeen, type ChangelogEntry } from "../_lib/changelog";
import { usePrefCookie, writePrefCookie } from "../_lib/use-pref-cookie";
import { COOKIES, readPrefCookie } from "../_lib/welcome";

export type StripEntry = ChangelogEntry & {
  /** The date it was added, formatted on the server. */
  added: string;
};

/** "What's new" strip for the dashboard home. Entries the member hasn't seen get a dot. */
export function WhatsNewStrip({
  entries,
  unseen: unseenAtRender,
  liveIds,
  firstVisit = false,
}: {
  entries: StripEntry[];
  /** Ids the server found unseen when it rendered the page. */
  unseen: string[];
  /** Every live entry, so "Mark all as seen" also clears updates not shown here. */
  liveIds: string[];
  firstVisit?: boolean;
}) {
  // Follows the seen cookie live, so Back/Forward can't bring back dots already cleared.
  const seen = parseSeen(usePrefCookie(COOKIES.newsSeen));
  const unseen = new Set(unseenAtRender.filter((id) => !seen.has(id)));
  const allUpdates = useRef<HTMLAnchorElement>(null);
  const [status, setStatus] = useState("");

  if (!entries.length) return null;
  const fresh = entries.filter((e) => unseen.has(e.id)).length;
  const newLabel = firstVisit ? "New to you" : "New since your last visit";

  function markAllSeen() {
    writePrefCookie(COOKIES.newsSeen, mergeSeen(readPrefCookie(COOKIES.newsSeen), liveIds));
    // This button is about to disappear: keep focus beside it and say what happened.
    allUpdates.current?.focus();
    setStatus("All updates marked as seen.");
  }

  return (
    <section aria-labelledby="whats-new-h">
      <p role="status" className="sr-only">
        {status}
      </p>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.9375rem] font-semibold text-orange-800">{fresh ? `${fresh} new ${firstVisit ? "to you" : "since your last visit"}` : "Recently added"}</p>
          <h2 id="whats-new-h" className="mt-0.5 font-display text-[1.5rem] font-semibold tracking-[-0.025em] text-ink">
            What&rsquo;s new
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {fresh > 0 && (
            <button
              type="button"
              onClick={markAllSeen}
              className="inline-flex min-h-11 items-center rounded-full px-3 text-[0.9375rem] font-medium text-ink-muted underline decoration-ink/20 underline-offset-4 hover:bg-surface hover:text-ink"
            >
              Mark all as seen
            </button>
          )}
          <Link ref={allUpdates} href="/dashboard/whats-new" className="group inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-[0.9375rem] font-medium text-ink-muted hover:text-ink">
            All updates <span aria-hidden className="nudge">→</span>
          </Link>
        </div>
      </div>
      <ul className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {entries.slice(0, 6).map((e) => {
          const isNew = unseen.has(e.id);
          return (
            <li key={e.id} className="w-[82%] shrink-0 snap-start sm:w-[56%] md:w-auto">
              <Link
                href={e.href}
                className={`spot lift group flex h-full flex-col rounded-3xl border bg-surface p-5 ${isNew ? "border-accent/45 ring-2 ring-accent/10" : "border-line"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[1.75rem] leading-none" aria-hidden>
                    {e.emoji}
                  </span>
                  <span className="flex items-center gap-2">
                    {isNew && (
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#c2410c] ring-4 ring-[#c2410c]/15" title={newLabel}>
                        <span className="sr-only">{newLabel}</span>
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[0.8125rem] font-semibold ring-1 ${
                        e.tag === "New" ? "bg-emerald-50 text-emerald-800 ring-emerald-200" : "bg-sky-50 text-sky-900 ring-sky-200"
                      }`}
                    >
                      {e.tag}
                    </span>
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[1.125rem] font-semibold leading-snug text-ink">{e.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">{e.body}</p>
                <span className="mt-auto flex items-center justify-between gap-2 pt-5 text-[0.9375rem] font-semibold text-ink">
                  {e.cta}
                  <ArrowRight size={16} className="nudge shrink-0" />
                </span>
                <span className="sr-only">Added {e.added}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
