"use client";

import { useMemo, useState } from "react";
import { Search, X } from "@/app/components/icons";

export type DirectoryItem = { name: string; url: string; description: string; category: string };

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const AVATAR = ["bg-sky-100 text-sky-700", "bg-amber-100 text-amber-700", "bg-emerald-100 text-emerald-700", "bg-violet-100 text-violet-700", "bg-rose-100 text-rose-700", "bg-accent-soft text-accent"];

export function LinkDirectory({ items, noun = "resource", placeholder = "Search…" }: { items: DirectoryItem[]; noun?: string; placeholder?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const order = useMemo(() => Array.from(new Set(items.map((l) => l.category))), [items]);
  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      items.filter((l) => {
        if (category && l.category !== category) return false;
        if (!q) return true;
        return l.name.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.category.toLowerCase().includes(q);
      }),
    [items, q, category],
  );
  const groups = order.map((c) => [c, filtered.filter((l) => l.category === c)] as const).filter(([, l]) => l.length);

  return (
    <div>
      <div className="sticky top-14 z-20 -mx-4 bg-bg/90 px-4 pb-3 pt-2 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:top-0 lg:mx-0 lg:px-0 lg:pt-4">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle">
            <Search size={18} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
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
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[null, ...order].map((c) => (
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

      <p className="mt-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-subtle">
        {filtered.length} {filtered.length === 1 ? noun : `${noun}s`}
      </p>

      {groups.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-line p-10 text-center">
          <p className="text-[2rem]" aria-hidden>
            🔍
          </p>
          <p className="mt-2 text-ink-muted">
            No {noun}s match &ldquo;{query}&rdquo;. Try a different word.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-10">
          {groups.map(([cat, list]) => (
            <section key={cat}>
              <div className="flex items-center gap-3">
                <h2 className="font-display text-[1.25rem] font-semibold text-ink">{cat}</h2>
                <span className="h-px flex-1 bg-line" />
                <span className="font-mono text-[0.62rem] text-ink-subtle">{list.length}</span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((l) => (
                  <a
                    key={l.name}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spot lift group flex flex-col rounded-2xl border border-line bg-surface p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-[1.05rem] font-semibold uppercase transition-transform duration-500 group-hover:-rotate-6 ${
                          AVATAR[l.name.charCodeAt(0) % AVATAR.length]
                        }`}
                      >
                        {l.name.charAt(0)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-[1rem] font-semibold leading-snug text-ink transition-colors group-hover:text-accent">{l.name}</h3>
                        <p className="truncate font-mono text-[0.66rem] text-ink-subtle">{hostOf(l.url)}</p>
                      </div>
                      <span aria-hidden className="nudge shrink-0 text-ink-subtle group-hover:text-accent">
                        ↗
                      </span>
                    </div>
                    <p className="mt-3 text-[0.88rem] leading-[1.6] text-ink-muted">{l.description}</p>
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
