import { useSyncExternalStore } from "react";

/*
 * Small per-device values in localStorage (lesson progress, video positions), read live.
 * The server and the first client render see null, so hydration always matches.
 */

const listeners = new Map<string, Set<() => void>>();

export function readLocal(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Saves a value. `notify: false` skips re-rendering readers (for frequent writes nobody shows). */
export function writeLocal(key: string, value: string, { notify = true } = {}) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private mode or storage full: progress just isn't remembered.
  }
  if (notify) listeners.get(key)?.forEach((fn) => fn());
}

export function useLocalValue(key: string): string | null {
  return useSyncExternalStore(
    (onChange) => {
      const set = listeners.get(key) ?? new Set();
      set.add(onChange);
      listeners.set(key, set);
      // Another tab changed it.
      const onStorage = (e: StorageEvent) => e.key === key && onChange();
      window.addEventListener("storage", onStorage);
      return () => {
        set.delete(onChange);
        window.removeEventListener("storage", onStorage);
      };
    },
    () => readLocal(key),
    () => null,
  );
}
