"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "./icons";

/**
 * Thumb-reach enrol bar for phones. Slides in once the visitor is past the
 * first screen and gets out of the way near the end of the page, where the
 * final call-to-action and footer already cover it.
 */
export function MobileCta({ hidden = false }: { hidden?: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const remaining = document.documentElement.scrollHeight - (y + vh);
      setVisible(y > vh * 0.8 && remaining > vh * 1.1);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const show = visible && !hidden;

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] ${
        show ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-3 rounded-full border border-line/80 bg-white/85 py-2 pl-5 pr-2 shadow-[var(--shadow-float)] backdrop-blur-xl backdrop-saturate-150">
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[0.875rem] font-medium text-ink">
            Elite FBA Mentorship
          </p>
          <p className="flex items-center gap-1.5 text-[0.75rem] text-ink-muted">
            <span className="live-dot !h-1.5 !w-1.5" />
            Limited spots open
          </p>
        </div>
        <a href="/checkout" className="btn btn-primary btn-sm shrink-0">
          Apply
          <ArrowRight size={15} className="btn-arrow" />
        </a>
      </div>
    </div>
  );
}
