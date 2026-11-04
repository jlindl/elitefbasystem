"use client";

import { useState, type ReactNode } from "react";
import { ArrowDown } from "./icons";

/**
 * Folds secondary copy away on phones behind a "Read more" button so long
 * sections stay scannable. From md up (and for search engines) it is always
 * shown - the text stays in the DOM either way.
 */
export function MoreOnMobile({
  children,
  label = "Read more",
  tone = "light",
}: {
  children: ReactNode;
  label?: string;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={open ? "animate-in" : "max-md:hidden"}>{children}</div>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          className={`md:hidden mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.875rem] font-medium ${
            tone === "dark"
              ? "border-white/15 text-white"
              : "border-line bg-surface text-ink"
          }`}
        >
          {label}
          <ArrowDown size={14} />
        </button>
      )}
    </>
  );
}
