"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "@/app/components/icons";
import type { SearchItem } from "../_lib/course";
import { lockScroll } from "../_lib/scroll-lock";

const GROUPS: { kind: SearchItem["kind"]; label: string; emoji: string }[] = [
  { kind: "lesson", label: "Lessons", emoji: "📘" },
  { kind: "page", label: "Pages", emoji: "🧭" },
  { kind: "term", label: "Dictionary", emoji: "📖" },
  { kind: "supplier", label: "Suppliers", emoji: "📦" },
  { kind: "link", label: "Useful links", emoji: "🔗" },
];

function score(item: SearchItem, q: string) {
  const t = item.title.toLowerCase();
  const h = (item.hint ?? "").toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.split(/[\s(/-]+/).some((w) => w.startsWith(q))) return 60;
  if (t.includes(q)) return 40;
  if (h.includes(q)) return 20;
  return 0;
}

/** ⌘K search across lessons, pages, dictionary terms, suppliers and links. */
export function CommandPalette({ open, onClose, items }: { open: boolean; onClose: () => void; items: SearchItem[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return GROUPS.filter((g) => g.kind === "page").map((g) => ({ ...g, items: items.filter((i) => i.kind === "page") }));
    }
    return GROUPS.map((g) => ({
      ...g,
      items: items
        .filter((i) => i.kind === g.kind)
        .map((i) => ({ i, s: score(i, q) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, g.kind === "lesson" ? 6 : 5)
        .map((x) => x.i),
    })).filter((g) => g.items.length);
  }, [items, query]);

  const flat = useMemo(() => results.flatMap((g) => g.items), [results]);

  useEffect(() => {
    if (!open) return;
    const release = lockScroll();
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      clearTimeout(t);
      release();
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  function go(item: SearchItem | undefined) {
    if (!item) return;
    close();
    if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
    else router.push(item.href);
  }

  function close() {
    setQuery("");
    setActive(0);
    onClose();
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(flat[active]);
    }
  }

  let idx = -1;
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[10vh]" role="dialog" aria-modal="true" aria-label="Search">
      <button type="button" aria-label="Close search" onClick={close} className="lightbox-fade absolute inset-0 bg-ink/45 backdrop-blur-sm" />
      <div className="dialog-in relative w-full max-w-[620px] overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_30px_80px_-20px_rgba(10,10,10,0.45)]" onKeyDown={onKey}>
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search size={18} className="shrink-0 text-ink-subtle" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search lessons, terms, suppliers…"
            aria-label="Search"
            aria-controls="palette-results"
            aria-activedescendant={flat[active] ? `palette-${active}` : undefined}
            className="h-16 flex-1 bg-transparent text-[1.05rem] text-ink outline-none placeholder:text-ink-subtle"
          />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-ink-subtle">Esc</kbd>
        </div>

        <div ref={listRef} id="palette-results" role="listbox" className="max-h-[min(60vh,480px)] overflow-y-auto p-2" data-lenis-prevent>
          {flat.length === 0 ? (
            <p className="px-4 py-10 text-center text-[0.95rem] text-ink-muted">
              Nothing found for &ldquo;{query}&rdquo;. Try a lesson name, a term like &ldquo;FNSKU&rdquo; or a supplier.
            </p>
          ) : (
            results.map((g) => (
              <div key={g.kind} className="pb-1">
                <p className="px-3 pb-1 pt-3 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink-subtle">
                  {g.emoji} {g.label}
                </p>
                {g.items.map((item) => {
                  idx++;
                  const i = idx;
                  const on = i === active;
                  return (
                    <button
                      key={`${item.kind}-${item.href}-${item.title}`}
                      id={`palette-${i}`}
                      data-idx={i}
                      type="button"
                      role="option"
                      aria-selected={on}
                      onMouseMove={() => setActive(i)}
                      onClick={() => go(item)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${on ? "bg-ink text-white" : "text-ink"}`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[0.95rem] font-medium">{item.title}</span>
                        {item.hint && (
                          <span className={`block truncate text-[0.78rem] ${on ? "text-white/60" : "text-ink-subtle"}`}>{item.hint}</span>
                        )}
                      </span>
                      <span aria-hidden className={`shrink-0 text-[0.8rem] ${on ? "text-accent" : "text-ink-subtle"}`}>
                        {item.external ? "↗" : "↵"}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-line bg-surface-alt/60 px-5 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink-subtle">
          <span>↑↓ to move</span>
          <span>↵ to open</span>
          <span className="ml-auto">⌘K anywhere</span>
        </div>
      </div>
    </div>
  );
}
