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
    <div className="dash-grid relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-line bg-surface-alt/40 px-4 py-12 text-center">
      <span
        aria-hidden
        className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-[1.75rem] shadow-sm"
      >
        🔒
      </span>
      <h3 className="mt-4 font-display text-[1.25rem] font-medium tracking-[-0.01em] text-ink">
        This module is locked
      </h3>
      <p className="mt-2 text-[0.9375rem] text-ink-muted max-w-[380px]">
        Jakub unlocks this module when you&rsquo;re ready for it. Enter the password he gave you.
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
          className="flex-1 rounded-xl border border-line bg-surface px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-700"
        />
        <button
          type="submit"
          className="btn btn-primary btn-aa"
        >
          Unlock
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-3 text-[0.9375rem] font-medium text-orange-800">
          Incorrect password. Please try again.
        </p>
      )}
    </div>
  );
}
