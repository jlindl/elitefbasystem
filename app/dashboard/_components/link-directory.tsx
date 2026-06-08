"use client";

import { useMemo, useState } from "react";
import { Search } from "@/app/components/icons";

export type DirectoryItem = {
  name: string;
  url: string;
  description: string;
  category: string;
};

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function LinkDirectory({
  items,
  noun = "resource",
  placeholder = "Search…",
}: {
  items: DirectoryItem[];
  noun?: string;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Preserve the curated category order from the data.
  const categoryOrder = useMemo(
    () => Array.from(new Set(items.map((l) => l.category))),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((l) => {
      if (activeCategory && l.category !== activeCategory) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q)
      );
    });
  }, [items, query, activeCategory]);

  const groups = useMemo(
    () =>
      categoryOrder
        .map((cat) => [cat, filtered.filter((l) => l.category === cat)] as const)
        .filter(([, list]) => list.length > 0),
    [categoryOrder, filtered],
  );

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
          placeholder={placeholder}
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
        {categoryOrder.map((c) => (
          <FilterChip
            key={c}
            label={c}
            active={activeCategory === c}
            onClick={() => setActiveCategory(c)}
          />
        ))}
      </div>

      <p className="mt-4 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-ink-subtle">
        {filtered.length} {filtered.length === 1 ? noun : `${noun}s`}
      </p>

      {/* Groups */}
      {groups.length === 0 ? (
        <p className="mt-8 text-[0.95rem] text-ink-muted">
          No {noun}s match &ldquo;{query}&rdquo;. Try a different word.
        </p>
      ) : (
        <div className="mt-6 space-y-8">
          {groups.map(([cat, list]) => (
            <section key={cat}>
              <h3 className="font-display text-[1.1rem] font-bold text-accent">
                {cat}
              </h3>
              <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
                {list.map((l) => (
                  <a
                    key={l.name}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-2xl border border-line bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[var(--shadow-soft)]"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="font-display text-[1rem] font-semibold text-ink leading-snug group-hover:text-accent transition-colors">
                        {l.name}
                      </h4>
                      <span
                        aria-hidden
                        className="shrink-0 text-ink-subtle group-hover:text-accent transition-colors"
                      >
                        ↗
                      </span>
                    </div>
                    <p className="mt-2 text-[0.875rem] text-ink-muted leading-[1.55]">
                      {l.description}
                    </p>
                    <span className="mt-3 font-mono text-[0.65rem] tracking-[0.08em] uppercase text-ink-subtle truncate">
                      {hostOf(l.url)}
                    </span>
                  </a>
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
