/**
 * One shared page-scroll lock for drawers and dialogs. Each caller gets a release
 * function; the page scrolls again only when every lock has been released, so
 * overlapping overlays (drawer + search, welcome + drawer) can't undo each other.
 * Smooth scroll (Lenis) pauses while <html> has overflow: hidden.
 */
let locks = 0;
let previous = "";

export function lockScroll(): () => void {
  if (typeof document === "undefined") return () => {};
  const root = document.documentElement;
  if (locks === 0) {
    previous = root.style.overflow;
    root.style.overflow = "hidden";
  }
  locks += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks = Math.max(0, locks - 1);
    if (locks === 0) root.style.overflow = previous;
  };
}
