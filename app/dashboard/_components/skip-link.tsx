"use client";

/** First focusable element on dashboard pages: jumps keyboard focus past the navigation. */
export function SkipLink({ target = "main" }: { target?: string }) {
  return (
    <a
      href={`#${target}`}
      className="skip-link"
      onClick={(e) => {
        const el = document.getElementById(target);
        if (!el) return;
        e.preventDefault();
        el.focus({ preventScroll: true });
        el.scrollIntoView({ block: "start" });
      }}
    >
      Skip to main content
    </a>
  );
}
