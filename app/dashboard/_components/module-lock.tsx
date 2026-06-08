"use client";

import { useState, type ReactNode } from "react";

const PASSWORD = "123";

export function ModuleLock({ children }: { children: ReactNode }) {
  // Unlock state lives only in memory, so the module re-locks on every refresh.
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (value.trim() === PASSWORD) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <span
        aria-hidden
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-surface-alt text-[1.5rem]"
      >
        🔒
      </span>
      <h3 className="mt-4 font-display text-[1.25rem] font-medium tracking-[-0.01em] text-ink">
        This module is locked
      </h3>
      <p className="mt-2 text-[0.9375rem] text-ink-muted max-w-[380px]">
        Enter the password to unlock this module.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-5 flex flex-col sm:flex-row items-stretch gap-2 w-full max-w-[360px]"
      >
        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          aria-label="Module password"
          autoComplete="off"
          className="flex-1 rounded-xl border border-line bg-surface px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-white font-medium text-[0.95rem] transition-colors duration-150 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Unlock
        </button>
      </form>

      {error && (
        <p className="mt-3 text-[0.85rem] text-accent-deep">
          Incorrect password. Please try again.
        </p>
      )}
    </div>
  );
}
