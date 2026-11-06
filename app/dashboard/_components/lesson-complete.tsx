"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { ArrowRight, Check } from "@/app/components/icons";
import { setTabCompletion } from "../_lib/tab-completions";
import { buzz, fireConfetti } from "./confetti";

/** The end-of-lesson moment: mark it done, celebrate, and point to what's next. */
export function LessonComplete({
  moduleId,
  tabId,
  initialCompleted,
  next,
  headingLevel = 2,
}: {
  moduleId: string;
  tabId: string;
  initialCompleted: boolean;
  next: { href: string; label: string; kind: "lesson" | "exam" | "module" | "modules" } | null;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const [done, setDone] = useState(initialCompleted);
  const [justDone, setJustDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  // The button you pressed is replaced, so focus moves to the new heading (which is read out).
  const heading = useRef<HTMLHeadingElement>(null);
  const moveFocus = useRef(false);
  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    heading.current?.focus();
  }, [done]);

  function set(value: boolean) {
    setError(null);
    moveFocus.current = true;
    setDone(value);
    if (value) {
      setJustDone(true);
      buzz([12, 40, 18]);
      fireConfetti({ originY: 0.75 });
    }
    startTransition(async () => {
      const res = await setTabCompletion(moduleId, tabId, value);
      if (!res.ok) {
        moveFocus.current = true;
        setDone(!value);
        setJustDone(false);
        setError(res.error);
      }
    });
  }

  return (
    <section
      className={`relative !mt-14 overflow-hidden rounded-3xl border p-6 transition-colors duration-500 sm:p-8 ${
        done ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-surface" : "border-line bg-surface"
      }`}
    >
      {!done ? (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="text-[0.875rem] font-semibold text-ink-muted">Finished the lesson?</p>
            <Heading ref={heading} tabIndex={-1} className="mt-1 font-display text-[1.4rem] font-semibold tracking-[-0.02em] text-ink outline-none">
              Mark this lesson complete
            </Heading>
            <p className="mt-1 text-[0.92rem] text-ink-muted">It counts towards your progress and unlocks the module exam.</p>
          </div>
          <button
            type="button"
            onClick={() => set(true)}
            disabled={pending}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#c2410c] px-7 text-[1rem] font-semibold text-white shadow-[0_5px_0_0_#7c2d12] transition-[transform,box-shadow,background-color] hover:bg-[#b23c0b] active:translate-y-[3px] active:shadow-[0_2px_0_0_#7c2d12] disabled:opacity-60"
          >
            <Check size={18} /> Complete lesson
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span
            className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg ${justDone ? "pop-in" : ""}`}
          >
            <Check size={26} />
          </span>
          <div className="flex-1">
            <p className="text-[0.875rem] font-semibold text-emerald-800">
              {justDone ? "Nice work" : "Completed"}
            </p>
            <Heading ref={heading} tabIndex={-1} className="mt-1 font-display text-[1.4rem] font-semibold tracking-[-0.02em] text-ink outline-none">
              {justDone ? "Lesson complete! 🎉" : "You've completed this lesson"}
            </Heading>
            <button
              type="button"
              onClick={() => set(false)}
              disabled={pending}
              className="mt-1 inline-flex min-h-10 items-center text-[0.875rem] text-ink-muted underline decoration-ink/25 underline-offset-2 hover:text-ink"
            >
              Mark as not done
            </button>
          </div>
          {next && (
            <Link
              href={next.href}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-ink px-6 text-[0.98rem] font-semibold text-white transition-colors hover:bg-[#c2410c]"
            >
              {next.kind === "exam" ? "Take the exam" : next.kind === "module" ? "Next module" : next.kind === "modules" ? "Back to modules" : "Next lesson"}
              <ArrowRight size={16} className="nudge" />
            </Link>
          )}
        </div>
      )}
      {error && (
        <p role="alert" className="mt-3 text-[0.9375rem] font-medium text-rose-700">
          {error}
        </p>
      )}
    </section>
  );
}
