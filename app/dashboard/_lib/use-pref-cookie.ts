import { useSyncExternalStore } from "react";
import { readPrefCookie, setPrefCookie } from "./welcome";

/*
 * Per-device preference cookies, read live in the browser (client components only).
 * The server renders from the request's cookies; once hydrated, components follow
 * document.cookie, so a page replayed by Back/Forward, or changed in another tab,
 * never shows a stale state.
 */

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Another tab may have changed it, or the page came back from the back/forward cache.
  window.addEventListener("focus", onChange);
  window.addEventListener("pageshow", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("focus", onChange);
    window.removeEventListener("pageshow", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

/** Writes a preference cookie and updates every component reading it. */
export function writePrefCookie(name: string, value: string) {
  setPrefCookie(name, value);
  listeners.forEach((notify) => notify());
}

/**
 * The live value of a preference cookie (null if unset). `serverValue` is what the
 * server rendered with; it is used until hydration finishes, so the first paint matches.
 */
export function usePrefCookie(name: string, serverValue: string | null = null): string | null {
  return useSyncExternalStore(
    subscribe,
    () => readPrefCookie(name),
    () => serverValue,
  );
}
