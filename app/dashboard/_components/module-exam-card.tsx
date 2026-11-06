import Link from "next/link";
import { ArrowRight, GraduationCap, Lock } from "@/app/components/icons";

type Props = {
  moduleId: string;
  moduleNumeral: string;
  questionCount: number;
  passPercent: number;
  completed: number;
  total: number;
  passed?: boolean;
};

export function ModuleExamCard({ moduleId, moduleNumeral, questionCount, passPercent, completed, total, passed = false }: Props) {
  const unlocked = completed >= total;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (unlocked) {
    return (
      <Link
        href={`/dashboard/modules/${moduleId}/exam`}
        className={`spot lift group relative flex flex-col gap-5 overflow-hidden rounded-3xl border p-6 sm:flex-row sm:items-center sm:p-7 ${
          passed ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-surface" : "border-amber-300 bg-gradient-to-br from-amber-50 via-orange-50/60 to-surface"
        }`}
      >
        <span
          className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 ${
            passed ? "bg-emerald-500" : "bg-gradient-to-br from-amber-400 to-accent"
          }`}
        >
          <GraduationCap size={30} />
        </span>
        <div className="min-w-0 flex-1">
          <p className={`text-[0.875rem] font-semibold ${passed ? "text-emerald-800" : "text-amber-900"}`}>
            {passed ? "✓ Exam passed" : "Final exam unlocked"}
          </p>
          <h3 className="mt-1 font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
            {passed ? `Module ${moduleNumeral} exam - passed` : `Take the Module ${moduleNumeral} final exam`}
          </h3>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-muted">
            {questionCount} questions · {passPercent}% to pass · unlimited attempts
          </p>
        </div>
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-ink px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors group-hover:bg-orange-800 sm:self-center">
          {passed ? "Retake" : "Start exam"} <ArrowRight size={15} className="nudge" />
        </span>
      </Link>
    );
  }

  return (
    <div className="relative flex flex-col gap-5 rounded-3xl border border-dashed border-line bg-surface-alt/40 p-6 sm:flex-row sm:items-center sm:p-7">
      <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-surface text-ink-subtle shadow-sm">
        <Lock size={26} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.875rem] font-semibold text-ink-muted">🔒 Final exam · locked</p>
        <h3 className="mt-1 font-display text-[1.25rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
          Module {moduleNumeral} final exam
        </h3>
        <p className="mt-1.5 text-[0.9375rem] text-ink-muted">
          Mark every lesson complete to unlock it. {total - completed} {total - completed === 1 ? "lesson" : "lessons"} to go.
        </p>
        <div className="mt-3 h-2 max-w-[360px] overflow-hidden rounded-full bg-surface-deep">
          <div className="bar-grow h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <span className="self-start font-display text-[1.25rem] font-semibold tabular-nums text-ink sm:self-center">
        {completed}/{total}
      </span>
    </div>
  );
}
