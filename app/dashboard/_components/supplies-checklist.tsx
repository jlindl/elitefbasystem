"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ExternalLink } from "@/app/components/icons";
import type { SupplyCategory, SupplyItem } from "../_lib/supplies";
import { usePrefCookie, writePrefCookie } from "../_lib/use-pref-cookie";
import { COOKIES, readPrefCookie } from "../_lib/welcome";
import { ProgressRing } from "./ui/progress-ring";

const NEED = {
  essential: { label: "Essential", cls: "bg-orange-50 text-orange-900 ring-orange-200" },
  recommended: { label: "Recommended", cls: "bg-emerald-50 text-emerald-900 ring-emerald-200" },
  "if-needed": { label: "Only if needed", cls: "bg-sky-50 text-sky-900 ring-sky-200" },
  optional: { label: "Optional", cls: "bg-surface-alt text-ink-muted ring-line" },
} as const;

type Filter = "all" | "essential" | "todo";

/** The ticks saved in the cookie, keeping only ids that are still on the list. */
function ownedFrom(raw: string | null, valid: Set<string>) {
  return new Set((raw ?? "").split(".").filter((x) => valid.has(x)));
}

/** The supplies list with "I've got this" ticks, saved on this device. */
export function SuppliesChecklist({ items, categories, initialOwned }: { items: SupplyItem[]; categories: SupplyCategory[]; initialOwned: string[] }) {
  const id = useId();
  const valid = useMemo(() => new Set(items.map((i) => i.id)), [items]);
  // The cookie is the truth, so Back/Forward or another tab can't show old ticks.
  const saved = usePrefCookie(COOKIES.supplies, initialOwned.join("."));
  const owned = useMemo(() => ownedFrom(saved, valid), [saved, valid]);
  const [filter, setFilter] = useState<Filter>("all");
  // "Still to get" keeps showing what was left when it was chosen, so ticking an item
  // doesn't make it (and the keyboard focus) vanish. Choosing it again refreshes it.
  const [todo, setTodo] = useState<Set<string> | null>(null);
  const [status, setStatus] = useState({ text: "", n: 0 });
  const essentials = items.filter((i) => i.need === "essential");
  const haveEssentials = essentials.filter((i) => owned.has(i.id)).length;

  function announce(text: string) {
    // The text changes every time, so a repeated message is still read out.
    setStatus((s) => ({ text, n: s.n + 1 }));
  }

  function toggle(item: SupplyItem) {
    // Start from the cookie, not this render, in case another tab changed it.
    const next = ownedFrom(readPrefCookie(COOKIES.supplies), valid);
    const nowOwned = !next.has(item.id);
    if (nowOwned) next.add(item.id);
    else next.delete(item.id);
    writePrefCookie(COOKIES.supplies, [...next].join("."));
    if (item.need === "essential") {
      const count = essentials.filter((i) => next.has(i.id)).length;
      announce(count === essentials.length ? "That's every essential sorted." : `${count} of ${essentials.length} essentials sorted.`);
    } else {
      announce(nowOwned ? "Ticked off." : "Back on your list.");
    }
  }

  function choose(next: Filter) {
    const snapshot = next === "todo" ? new Set(items.filter((i) => !owned.has(i.id)).map((i) => i.id)) : null;
    setFilter(next);
    setTodo(snapshot);
    const count = snapshot ? snapshot.size : next === "essential" ? essentials.length : items.length;
    announce(count === 0 ? "Nothing left to get." : `Showing ${count} ${count === 1 ? "item" : "items"}.`);
  }

  const visible = items.filter((i) =>
    filter === "essential" ? i.need === "essential" : filter === "todo" ? (todo ? todo.has(i.id) : !owned.has(i.id)) : true,
  );

  return (
    <div className="space-y-8">
      <p role="status" className="sr-only">
        {status.text}
        {status.n % 2 ? "\u00a0" : ""}
      </p>
      <section aria-labelledby={`${id}-progress`} className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:p-6 print:hidden">
        <ProgressRing value={essentials.length ? (haveEssentials / essentials.length) * 100 : 0} size={72} stroke={7} color={haveEssentials === essentials.length ? "#10b981" : "var(--color-accent)"} label={`${haveEssentials} of ${essentials.length} essentials`}>
          <span className="font-display text-[1rem] font-semibold tabular-nums text-ink">
            {haveEssentials}/{essentials.length}
          </span>
        </ProgressRing>
        <div className="min-w-0 flex-1">
          <h2 id={`${id}-progress`} className="font-display text-[1.25rem] font-semibold text-ink">
            {haveEssentials === essentials.length ? "You've got every essential 🎉" : `${essentials.length - haveEssentials} essentials still to get`}
          </h2>
          <p className="mt-0.5 text-[0.9375rem] text-ink-muted">Tick things off as you buy them. Your list is saved on this device.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div role="group" aria-label="Show" className="flex flex-wrap gap-2">
            {(
              [
                ["all", "Everything"],
                ["essential", "Essentials"],
                ["todo", "Still to get"],
              ] as [Filter, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={filter === key}
                onClick={() => choose(key)}
                className={`inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors ${
                  filter === key ? "bg-ink text-white" : "border border-line bg-surface text-ink hover:border-ink/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-[0.9375rem] font-medium text-ink hover:border-ink/30">
            Print list
          </button>
        </div>
      </section>

      {categories.map((cat) => {
        const list = visible.filter((i) => i.category === cat.id);
        if (!list.length) return null;
        return (
          <section key={cat.id} aria-labelledby={`${id}-${cat.id}`}>
            <h2 id={`${id}-${cat.id}`} className="flex items-center gap-2 font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
              <span aria-hidden>{cat.emoji}</span>
              {cat.label}
            </h2>
            <p className="mt-1 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-muted">{cat.blurb}</p>
            <ul className="mt-4 grid gap-3 lg:grid-cols-2">
              {list.map((item) => {
                const have = owned.has(item.id);
                return (
                  <li key={item.id}>
                    <article
                      aria-labelledby={`${id}-${item.id}`}
                      className={`flex h-full flex-col rounded-3xl border p-5 transition-colors duration-300 sm:p-6 ${have ? "border-emerald-200 bg-emerald-50/50" : "border-line bg-surface"}`}
                    >
                      <div className="flex items-start gap-4">
                        <span aria-hidden className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface-alt text-[1.5rem] ring-1 ring-line">
                          {item.emoji}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 id={`${id}-${item.id}`} className="font-display text-[1.125rem] font-semibold leading-snug text-ink">
                              {item.name}
                            </h3>
                            <span className={`rounded-full px-2.5 py-0.5 text-[0.8125rem] font-semibold ring-1 ${NEED[item.need].cls}`}>{NEED[item.need].label}</span>
                          </div>
                          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">{item.why}</p>
                        </div>
                      </div>

                      {item.rules.length > 0 && (
                        <div className="mt-4 rounded-2xl bg-surface-alt p-4 ring-1 ring-line">
                          <p className="text-[0.875rem] font-semibold text-ink">{item.rulesTitle ?? "What Amazon checks"}</p>
                          <ul className="mt-2 space-y-1.5">
                            {item.rules.map((r) => (
                              <li key={r} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink">
                                <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.tip && (
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                          <span className="font-semibold text-ink">Tip: </span>
                          {item.tip}
                        </p>
                      )}

                      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
                        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-line bg-surface px-4 text-[0.9375rem] font-semibold text-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange-700 has-[:checked]:border-emerald-300 has-[:checked]:bg-emerald-50">
                          <input type="checkbox" checked={have} onChange={() => toggle(item)} className="h-5 w-5 accent-emerald-700" />
                          {have ? "Got it" : "I've got this"}
                          <span className="sr-only">: {item.name}</span>
                        </label>
                        {item.shopUrl && (
                          <a
                            href={item.shopUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-aa h-11 print:hidden"
                          >
                            Buy from the Elite FBA shop<span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        )}
                        {item.search.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink print:hidden"
                          >
                            {s.label} <ExternalLink size={14} />
                            <span className="sr-only"> for {item.name} (opens in a new tab)</span>
                          </a>
                        ))}
                        {item.lesson && (
                          <Link href={item.lesson.href} className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink-muted underline decoration-ink/20 underline-offset-4 hover:text-ink print:hidden">
                            {item.lesson.label}
                          </Link>
                        )}
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {visible.length === 0 && (
        <p className="rounded-3xl border border-dashed border-line bg-surface p-8 text-center text-[1rem] text-ink-muted">
          Nothing left on this list. You&rsquo;re ready to pack your first box.
        </p>
      )}
    </div>
  );
}
