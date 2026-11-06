"use client";

import type { ReactNode } from "react";

/** Opens the ⌘K palette from anywhere in a page. */
export function OpenSearch({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("dash:search"))}>
      {children}
    </button>
  );
}
