"use client";

import { useState, useTransition } from "react";
import { setTabCompletion } from "../_lib/tab-completions";

export function CompletionCheckbox({
  moduleId,
  tabId,
  initialCompleted,
}: {
  moduleId: string;
  tabId: string;
  initialCompleted: boolean;
}) {
  const [checked, setChecked] = useState(initialCompleted);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.checked;
    setChecked(next);
    setError(null);

    startTransition(async () => {
      const res = await setTabCompletion(moduleId, tabId, next);
      if (!res.ok) {
        setChecked(!next);
        setError(res.error);
      }
    });
  }

  return (
    <div className="mt-12 pt-8 border-t border-line">
      <label
        className={`flex items-center gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${
          checked
            ? "border-emerald-300 bg-emerald-50/60"
            : "border-line bg-surface hover:border-ink/20"
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={pending}
          className="h-5 w-5 accent-emerald-600 cursor-pointer disabled:cursor-wait"
        />
        <span className="text-[0.95rem] text-ink font-medium">
          {checked
            ? "Completed - nice work."
            : "Mark this section as complete"}
        </span>
      </label>
      {error && (
        <p className="mt-2 text-[0.8rem] text-accent-deep">{error}</p>
      )}
    </div>
  );
}
