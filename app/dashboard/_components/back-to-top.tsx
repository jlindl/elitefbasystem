"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "@/app/components/icons";

/** `placement` positions the button; the default sits above the dashboard's phone navigation. */
export function BackToTop({
  threshold = 400,
  placement = "bottom-[5.5rem] right-4 lg:bottom-6 lg:right-6",
}: {
  threshold?: number;
  placement?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed ${placement} z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white shadow-[var(--shadow-lift)] transition-all duration-200 hover:bg-[#c2410c] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-700 focus-visible:ring-offset-2 ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none translate-y-2"
      }`}
    >
      <ChevronUp size={20} />
    </button>
  );
}
