"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "@/app/components/icons";
import rawDictionary from "../_lib/dictionary.json";
import { buzz } from "./confetti";

type Entry = { term: string; acronymFor: string; definition: string; category: string };

const dictionary = (rawDictionary as Entry[]).slice().sort((a, b) => a.term.toLowerCase().localeCompare(b.term.toLowerCase()));
const categories = Array.from(new Set(dictionary.map((e) => e.category))).sort();
const LETTERS = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "#"];

const letterOf = (term: string) => {
  const c = term[0]?.toUpperCase() ?? "#";
  return /[A-Z]/.test(c) ? c : "#";
};

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-accent-soft px-0.5 text-orange-900">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export function JargonDictionary({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string | null>(null);
  const [mode, setMode] = useState<"browse" | "cards">("browse");
  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      dictionary.filter((e) => {
        if (category && e.category !== category) return false;
        if (!q) return true;
        return e.term.toLowerCase().includes(q) || e.acronymFor.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q);
      }),
    [q, category],
  );

  const groups = useMemo(() => {
    const map = new Map<string, Entry[]>();
    for (const e of filtered) {
      const l = letterOf(e.term);
      map.set(l, [...(map.get(l) ?? []), e]);
    }
    return Array.from(map.entries());
  }, [filtered]);
  const present = new Set(groups.map(([l]) => l));

  return (
    <div>
      <div className="sticky top-14 z-20 -mx-4 bg-bg/90 px-4 pb-3 pt-2 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:top-0 lg:mx-0 lg:px-0 lg:pt-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle">
              <Search size={18} />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a term, acronym or meaning…"
              aria-label="Search the dictionary"
              className="h-12 w-full rounded-2xl border border-line bg-surface pl-11 pr-10 text-[0.98rem] text-ink shadow-[var(--shadow-soft)] outline-none transition-colors placeholder:text-ink-subtle focus:border-ink/30"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-subtle hover:bg-surface-alt hover:text-ink"
              >
                <X size={15} />
              </button>
            )}
          </div>
          <div className="inline-flex rounded-2xl border border-line bg-surface p-1" role="tablist" aria-label="View">
            {(
              [
                ["browse", "Browse"],
                ["cards", "Quiz me"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                onClick={() => setMode(key)}
                className={`rounded-xl px-3.5 text-[0.85rem] font-medium transition-colors ${mode === key ? "bg-ink text-white" : "text-ink-muted hover:text-ink"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[null, ...categories].map((c) => (
            <button
              key={c ?? "all"}
              type="button"
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[0.8rem] font-medium transition-all duration-200 ${
                category === c ? "bg-ink text-white" : "border border-line bg-surface text-ink-muted hover:border-ink/25 hover:text-ink"
              }`}
            >
              {c ?? "All"}
            </button>
          ))}
        </div>
      </div>

      {mode === "cards" ? (
        <Flashcards key={`${category}-${q}`} entries={filtered} />
      ) : (
        <>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-subtle">
              {filtered.length} {filtered.length === 1 ? "term" : "terms"}
            </p>
            <nav aria-label="Jump to letter" className="flex flex-wrap gap-0.5">
              {LETTERS.map((l) => (
                <a
                  key={l}
                  href={present.has(l) ? `#glossary-${l}` : undefined}
                  aria-disabled={!present.has(l)}
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-md font-mono text-[0.7rem] font-bold transition-colors ${
                    present.has(l) ? "text-ink hover:bg-accent hover:text-white" : "pointer-events-none text-ink-subtle/35"
                  }`}
                >
                  {l}
                </a>
              ))}
            </nav>
          </div>

          {groups.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-line p-10 text-center">
              <p className="text-[2rem]" aria-hidden>
                🔍
              </p>
              <p className="mt-2 text-ink-muted">
                No terms match &ldquo;{query}&rdquo;. Try a shorter word, or message Jakub to add it.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-10">
              {groups.map(([letter, entries]) => (
                <section key={letter} id={`glossary-${letter}`} className="scroll-mt-44 lg:scroll-mt-36">
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-[1.6rem] font-semibold text-accent">{letter}</h2>
                    <span className="h-px flex-1 bg-line" />
                    <span className="font-mono text-[0.62rem] text-ink-subtle">{entries.length}</span>
                  </div>
                  <div className="mt-3 grid gap-3 lg:grid-cols-2">
                    {entries.map((e) => (
                      <article key={e.term} className="spot lift rounded-2xl border border-line bg-surface p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-[1.08rem] font-semibold leading-snug text-ink">
                            <Highlight text={e.term} q={q} />
                          </h3>
                          <span className="shrink-0 rounded-full bg-surface-alt px-2 py-0.5 font-mono text-[0.56rem] uppercase tracking-[0.1em] text-ink-subtle">
                            {e.category}
                          </span>
                        </div>
                        {e.acronymFor && <p className="mt-0.5 text-[0.82rem] italic text-ink-subtle">{e.acronymFor}</p>}
                        <p className="mt-2.5 text-[0.9rem] leading-[1.6] text-ink-muted">
                          <Highlight text={e.definition} q={q} />
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Flashcards                                                         */
/* ------------------------------------------------------------------ */

function Flashcards({ entries }: { entries: Entry[] }) {
  const [order, setOrder] = useState(() => entries.map((_, i) => i));
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (entries.length === 0) {
    return <p className="mt-8 rounded-3xl border border-dashed border-line p-10 text-center text-ink-muted">No terms to quiz with these filters.</p>;
  }
  const e = entries[order[i % order.length]];

  const go = (d: number) => {
    setFlipped(false);
    setI((x) => (x + d + order.length) % order.length);
  };

  return (
    <div className="mx-auto mt-6 max-w-[560px]">
      <div className="mb-3 flex items-center justify-between text-[0.85rem] text-ink-muted">
        <span className="tabular-nums">
          Card {(i % order.length) + 1} of {order.length}
        </span>
        <span className="tabular-nums">✅ {known} known</span>
      </div>

      <button
        type="button"
        onClick={() => {
          setFlipped((f) => !f);
          buzz(8);
        }}
        aria-label={flipped ? "Show the term" : "Reveal the meaning"}
        className="group block w-full [perspective:1200px]"
      >
        <div
          className="relative h-[300px] w-full transition-transform duration-700 ease-[var(--ease-out-expo)] [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[2rem] border border-line bg-surface p-8 text-center shadow-[var(--shadow-lift)] [backface-visibility:hidden]">
            <span className="rounded-full bg-surface-alt px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ink-subtle">{e.category}</span>
            <p className="mt-5 font-display text-[2.25rem] font-semibold leading-tight tracking-[-0.03em] text-ink">{e.term}</p>
            {e.acronymFor && <p className="mt-2 italic text-ink-subtle">{e.acronymFor}</p>}
            <p className="mt-6 text-[0.85rem] text-ink-subtle transition-colors group-hover:text-accent">Tap to reveal the meaning</p>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto rounded-[2rem] bg-ink p-8 text-center text-white shadow-[var(--shadow-lift)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-accent">{e.term}</p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-white/85">{e.definition}</p>
          </div>
        </div>
      </button>

      <div className="mt-5 grid grid-cols-[auto_1fr_1fr_auto] gap-2">
        <button type="button" onClick={() => go(-1)} aria-label="Previous card" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface text-ink hover:border-ink/25">
          <ChevronLeft size={18} />
        </button>
        <button type="button" onClick={() => go(1)} className="h-12 rounded-2xl border-2 border-rose-200 bg-white text-[0.9rem] font-semibold text-rose-700 transition-transform active:scale-95">
          Still learning
        </button>
        <button
          type="button"
          onClick={() => {
            setKnown((k) => k + 1);
            buzz(12);
            go(1);
          }}
          className="h-12 rounded-2xl bg-emerald-500 text-[0.9rem] font-semibold text-white shadow-[0_4px_0_0_#15803d] transition-transform active:translate-y-[2px]"
        >
          I knew it
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next card" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface text-ink hover:border-ink/25">
          <ChevronRight size={18} />
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          setOrder((o) => [...o].sort(() => Math.random() - 0.5));
          setI(0);
          setFlipped(false);
        }}
        className="mx-auto mt-4 block text-[0.85rem] font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline"
      >
        🔀 Shuffle the deck
      </button>
    </div>
  );
}
