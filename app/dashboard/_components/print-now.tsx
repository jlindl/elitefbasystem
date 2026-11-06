"use client";

import { useEffect } from "react";

/** Print button for the certificate print view; with `auto` it opens the print dialog once fonts have loaded. */
export function PrintNow({ auto }: { auto: boolean }) {
  useEffect(() => {
    if (!auto) return;
    let cancelled = false;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (!cancelled) window.setTimeout(() => window.print(), 300);
    });
    return () => {
      cancelled = true;
    };
  }, [auto]);

  return (
    <button type="button" onClick={() => window.print()} className="btn btn-primary btn-aa h-11">
      Print or save as PDF
    </button>
  );
}
