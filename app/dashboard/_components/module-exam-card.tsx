import Link from "next/link";

type Props = {
  moduleId: string;
  moduleNumeral: string;
  questionCount: number;
  passPercent: number;
  completed: number;
  total: number;
};

export function ModuleExamCard({
  moduleId,
  moduleNumeral,
  questionCount,
  passPercent,
  completed,
  total,
}: Props) {
  const isUnlocked = completed >= total;
  const progressPct = total === 0 ? 0 : Math.round((completed / total) * 100);

  if (isUnlocked) {
    return (
      <Link
        href={`/dashboard/modules/${moduleId}/exam`}
        className="group relative block rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-amber-50/60 to-orange-50 p-6 md:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] hover:border-amber-400"
      >
        <span className="absolute -top-2.5 right-6 inline-flex h-6 px-3 items-center rounded-full bg-amber-500 text-white font-mono text-[0.6rem] font-bold tracking-[0.14em] uppercase shadow-sm">
          ✓ Unlocked
        </span>

        <div className="flex items-start gap-4">
          <span className="text-4xl leading-none">🎓</span>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-amber-700">
              Final Exam
            </p>
            <h3 className="font-display text-xl md:text-2xl font-bold text-amber-900 leading-tight mt-1">
              Take the Module {moduleNumeral} Final Exam
            </h3>
            <p className="text-[0.9rem] text-amber-900/80 leading-relaxed mt-2">
              All {total} lessons complete. {questionCount} questions covering
              everything in this module. Score {passPercent}% or higher to
              pass.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 h-10 px-5 rounded-full bg-amber-500 text-white text-[0.9rem] font-medium transition-all duration-200 group-hover:bg-amber-600">
              Start exam
              <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="relative rounded-2xl border-2 border-line bg-surface p-6 md:p-7">
      <span className="absolute -top-2.5 right-6 inline-flex h-6 px-3 items-center rounded-full bg-ink/10 text-ink-muted font-mono text-[0.6rem] font-bold tracking-[0.14em] uppercase">
        🔒 Locked
      </span>

      <div className="flex items-start gap-4">
        <span className="text-4xl leading-none grayscale opacity-60">🎓</span>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
            Final Exam
          </p>
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink leading-tight mt-1">
            Module {moduleNumeral} Final Exam
          </h3>
          <p className="text-[0.9rem] text-ink-muted leading-relaxed mt-2">
            Complete every lesson in this module to unlock the final exam.
            Mark each lesson as read using the checkbox at the bottom of the
            lesson page.
          </p>

          <div className="mt-5">
            <div className="flex items-baseline justify-between mb-2">
              <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-ink-subtle">
                Lesson Progress
              </p>
              <p className="font-display text-sm font-bold text-ink">
                {completed} / {total}
              </p>
            </div>
            <div className="h-2 rounded-full bg-line overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="mt-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink-subtle">
              {total - completed === 0
                ? "All lessons complete"
                : `${total - completed} ${
                    total - completed === 1 ? "lesson" : "lessons"
                  } remaining`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
