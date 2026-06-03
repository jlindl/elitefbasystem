"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ModuleLock() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/modules/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Wrong password.");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-8 px-2 text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent text-[1.2rem]">
        🔒
      </span>
      <h3 className="mt-4 font-display text-[1.25rem] font-semibold tracking-[-0.02em]">
        Locked content
      </h3>
      <p className="mt-2 text-[0.9rem] text-ink-muted leading-[1.55] max-w-[360px] mx-auto">
        Modules 2 onwards are still being finalized. Enter the access password
        to preview.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-5 mx-auto flex max-w-[320px] flex-col gap-2"
      >
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          placeholder="Access password"
          className="h-11 rounded-xl border border-line bg-surface px-4 text-[0.95rem] text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-ink/30"
        />
        <button
          type="submit"
          disabled={loading || !password}
          className="h-11 rounded-full bg-accent text-white text-[0.9rem] font-medium transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {loading ? "Unlocking…" : "Unlock"}
        </button>
        {error && (
          <p className="text-[0.85rem] text-accent-deep">{error}</p>
        )}
      </form>
    </div>
  );
}
