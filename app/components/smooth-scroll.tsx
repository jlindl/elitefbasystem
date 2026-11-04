"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Inertia smooth-scroll for the marketing pages (mounted from <Nav />, so the
 * dashboard keeps native scrolling). Touch devices keep native scrolling too;
 * Lenis only smooths wheel/trackpad input. Disabled under reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      allowNestedScroll: true,
      autoRaf: true,
      prevent: (node) =>
        !!node.closest?.('[role="dialog"], [data-lenis-prevent]'),
    });

    // Same-page anchor links: glide instead of jumping.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as HTMLElement).closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      if (!url.hash) return;
      const target =
        url.hash === "#top" ? 0 : document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (target === null) return;
      event.preventDefault();
      // Lenis honours the target's scroll-margin-top (the scroll-mt-* classes).
      lenis.scrollTo(target);
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    // Modals and the mobile menu lock scrolling by setting overflow on <html>;
    // pause Lenis while that lock is in place so the page underneath stays put.
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      if (root.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    observer.observe(root, { attributes: true, attributeFilter: ["style"] });

    return () => {
      document.removeEventListener("click", onClick);
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
