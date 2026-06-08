"use client";

import { useMemo, useState } from "react";
import { Search } from "@/app/components/icons";
import rawDictionary from "../_lib/dictionary.json";

type Entry = {
  term: string;
  acronymFor: string;
  definition: string;
  category: string;
};

const dictionary = (rawDictionary as Entry[])
  .slice()
  .sort((a, b) => a.term.toLowerCase().localeCompare(b.term.toLowerCase()));

const categories = Array.from(
  new Set(dictionary.map((e) => e.category)),
).sort();

function firstLetter(term: string): string {
  const c = term[0]?.toUpperCase() ?? "#";
  return /[A-Z]/.test(c) ? c : "#";
}

export function JargonDictionary() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dictionary.filter((e) => {
      if (activeCategory && e.category !== activeCategory) return false;
      if (!q) return true;
      return (
        e.term.toLowerCase().includes(q) ||
        e.acronymFor.toLowerCase().includes(q) ||
        e.definition.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  // Group filtered entries by first letter for the A-Z layout.
  const groups = useMemo(() => {
    const map = new Map<string, Entry[]>();
    for (const e of filtered) {
      const letter = firstLetter(e.term);
      const arr = map.get(letter);
      if (arr) arr.push(e);
      else map.set(letter, [e]);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const presentLetters = useMemo(
    () => new Set(groups.map(([letter]) => letter)),
    [groups],
  );

  const indexLetters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "#"];

  function jumpTo(letter: string) {
    document
      .getElementById(`glossary-section-${letter}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle">
          <Search size={18} />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a term, acronym, or meaning…"
          className="w-full rounded-xl border border-line bg-surface pl-11 pr-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>

      {/* Category filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        <FilterChip
          label="All"
          active={activeCategory === null}
          onClick={() => setActiveCategory(null)}
        />
        {categories.map((c) => (
          <FilterChip
            key={c}
            label={c}
            active={activeCategory === c}
            onClick={() => setActiveCategory(c)}
          />
        ))}
      </div>

      <p className="mt-4 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-ink-subtle">
        {filtered.length} {filtered.length === 1 ? "term" : "terms"}
      </p>

      {/* A-Z glossary index */}
      <nav
        aria-label="Jump to letter"
        className="mt-3 flex flex-wrap gap-1"
      >
        {indexLetters.map((letter) => {
          const enabled = presentLetters.has(letter);
          return (
            <button
              key={letter}
              type="button"
              disabled={!enabled}
              aria-label={`Jump to ${letter}`}
              onClick={() => jumpTo(letter)}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-md font-mono text-[0.72rem] font-bold transition-colors duration-150 ${
                enabled
                  ? "text-ink hover:bg-accent hover:text-white"
                  : "text-ink-subtle/40 cursor-default"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </nav>

      {/* Entries */}
      {groups.length === 0 ? (
        <p className="mt-8 text-[0.95rem] text-ink-muted">
          No terms match &ldquo;{query}&rdquo;. Try a different word.
        </p>
      ) : (
        <div className="mt-6 space-y-8">
          {groups.map(([letter, entries]) => (
            <section
              key={letter}
              id={`glossary-section-${letter}`}
              className="scroll-mt-24"
            >
              <h3 className="font-display text-[1.1rem] font-bold text-accent">
                {letter}
              </h3>
              <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
                {entries.map((e) => (
                  <article
                    key={e.term}
                    className="rounded-2xl border border-line bg-surface p-4"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="font-display text-[1rem] font-semibold text-ink leading-snug">
                        {e.term}
                      </h4>
                      <span className="shrink-0 font-mono text-[0.6rem] tracking-[0.1em] uppercase text-ink-subtle">
                        {e.category}
                      </span>
                    </div>
                    {e.acronymFor && (
                      <p className="mt-0.5 text-[0.8rem] italic text-ink-subtle">
                        {e.acronymFor}
                      </p>
                    )}
                    <p className="mt-2 text-[0.875rem] text-ink-muted leading-[1.55]">
                      {e.definition}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-[0.78rem] font-medium transition-colors duration-150 ${
        active
          ? "bg-ink text-white"
          : "border border-line bg-surface text-ink-muted hover:text-ink hover:border-ink/20"
      }`}
    >
      {label}
    </button>
  );
}
