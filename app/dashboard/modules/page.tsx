import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock } from "@/app/components/icons";
import { AppShell } from "../_components/app-shell";
import { ProgressBar } from "../_components/ui/progress-bar";
import { getCourse, type ModuleInfo } from "../_lib/course";
import { getCurrentStudent } from "../_lib/get-student";
import { formatDuration, lessonCount, moduleMinutes, moduleStatus } from "../_lib/module-status";

export const metadata: Metadata = {
  title: "Modules - EliteFBA",
  description: "Your EliteFBA learning modules.",
};

function ModuleRow({ m, current }: { m: ModuleInfo; current: boolean }) {
  const s = moduleStatus(m);
  const total = lessonCount(m);
  const minutes = moduleMinutes(m);
  const pct = s.key === "passed" ? 100 : total ? Math.round((m.done / total) * 100) : 0;

  return (
    <li>
      <Link
        href={`/dashboard/modules/${m.id}`}
        aria-current={current ? "step" : undefined}
        className={`group relative flex items-center gap-4 rounded-2xl border bg-surface p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[var(--shadow-lift)] sm:gap-5 sm:p-5 ${
          current ? "border-accent ring-2 ring-accent/25" : "border-line"
        }`}
      >
        <span
          aria-hidden
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-[1.125rem] font-semibold tabular-nums sm:h-14 sm:w-14 sm:text-[1.25rem] ${
            s.key === "passed" || s.key === "complete"
              ? "bg-emerald-600 text-white"
              : current
                ? "bg-ink text-white"
                : "bg-surface-alt text-ink ring-1 ring-line"
          }`}
        >
          {s.key === "passed" || s.key === "complete" ? "✓" : m.number}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-[0.875rem] font-medium text-ink-muted">
            Module {m.number}
            {current && <span className="font-semibold text-orange-800"> · You are here</span>}
          </span>
          <h3 className="mt-0.5 font-display text-[1.125rem] font-semibold leading-snug text-ink sm:text-[1.25rem]">{m.title}</h3>
          <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.9375rem] text-ink-muted">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.875rem] font-semibold ${s.cls}`}>
              <span aria-hidden>{s.glyph}</span>
              {s.label}
            </span>
            {total > 0 && (
              <span className="tabular-nums">
                {m.done} of {total} lessons done
              </span>
            )}
            {minutes > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} /> {formatDuration(minutes)}
              </span>
            )}
          </span>
          {total > 0 && (
            <span aria-hidden className="mt-3 block max-w-[420px]">
              <ProgressBar percent={pct} tone={s.key === "passed" || s.key === "complete" ? "success" : "accent"} />
            </span>
          )}
        </span>

        <span
          aria-hidden
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white sm:inline-flex"
        >
          <ChevronRight size={18} />
        </span>
      </Link>
    </li>
  );
}

export default async function ModulesPage() {
  const student = await getCurrentStudent();
  const course = await getCourse();
  const next = course.next;

  const core = course.modules.filter((m) => !m.locked);
  const advanced = course.modules.filter((m) => m.locked);
  const exams = course.modules.filter((m) => m.hasExam).length;

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[960px] space-y-10 px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <header className="dash-rise" style={{ ["--i" as string]: 0 }}>
          <p className="text-[0.9375rem] font-semibold text-orange-800">The course</p>
          <h1 className="mt-1 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink md:text-[2.5rem]">
            Learning modules
          </h1>
          <p className="mt-3 max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink-muted">
            Nine modules, from how Amazon FBA works to running a brand long-term. Work through them in order. Pick a module to see its
            lessons, exam and practice missions.
          </p>
        </header>

        {/* Where you are + overall progress */}
        <section aria-labelledby="progress-heading" className="dash-rise grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]" style={{ ["--i" as string]: 1 }}>
          <h2 id="progress-heading" className="sr-only">
            Your progress
          </h2>
          {next ? (
            <div className="flex flex-col rounded-3xl bg-ink p-6 text-white sm:p-7">
              <p className="text-[0.9375rem] font-medium text-white/80">Pick up where you left off</p>
              <p className="mt-3 text-[0.9375rem] text-white/80">
                Module {next.module.number} · Lesson {next.lesson.number}
              </p>
              <p className="mt-1 font-display text-[1.375rem] font-semibold leading-snug">{next.lesson.label}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[0.9375rem] text-white/80">
                <Clock size={15} /> {next.lesson.minutes} min read
              </p>
              <div className="mt-6">
                <Link href={next.lesson.href} className="btn btn-primary btn-aa">
                  Continue lesson <ArrowRight size={16} className="btn-arrow" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-ink p-6 text-white sm:p-7">
              <p className="font-display text-[1.375rem] font-semibold">Every open lesson is done 🎉</p>
              <p className="mt-2 text-[0.9375rem] text-white/80">Take any exams you haven&rsquo;t passed, or ask Jakub about the advanced modules.</p>
            </div>
          )}

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
            <p className="text-[0.9375rem] font-medium text-ink-muted">Course progress</p>
            <p className="mt-2 font-display text-[2.25rem] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">{course.percent}%</p>
            <ProgressBar percent={course.percent} className="mt-4" ariaLabel="Course progress" />
            <dl className="mt-5 grid grid-cols-2 gap-4 text-[0.9375rem]">
              <div>
                <dt className="text-ink-muted">Lessons done</dt>
                <dd className="mt-0.5 font-semibold text-ink tabular-nums">
                  {course.lessonsDone} of {course.lessonsTotal}
                </dd>
              </div>
              <div>
                <dt className="text-ink-muted">Exams passed</dt>
                <dd className="mt-0.5 font-semibold text-ink tabular-nums">
                  {course.modulesPassed} of {exams}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section aria-labelledby="core-heading" className="dash-rise" style={{ ["--i" as string]: 2 }}>
          <h2 id="core-heading" className="font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-ink">
            Core course
          </h2>
          <p className="mt-1 text-[1rem] text-ink-muted">
            Modules 1 to {core.length}. These are open to you now.
          </p>
          <ol className="mt-5 space-y-3">
            {core.map((m) => (
              <ModuleRow key={m.id} m={m} current={next?.module.id === m.id} />
            ))}
          </ol>
        </section>

        {advanced.length > 0 && (
          <section id="advanced" aria-labelledby="advanced-heading" className="dash-rise scroll-mt-24" style={{ ["--i" as string]: 3 }}>
            <h2 id="advanced-heading" className="font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-ink">
              Advanced modules
            </h2>
            <p className="mt-1 max-w-[60ch] text-[1rem] text-ink-muted">
              Modules {advanced[0].number} to {advanced[advanced.length - 1].number}. Jakub gives you the password for these once
              you&rsquo;ve built the foundations.
            </p>
            <ol className="mt-5 space-y-3" start={advanced[0].number}>
              {advanced.map((m) => (
                <ModuleRow key={m.id} m={m} current={false} />
              ))}
            </ol>
          </section>
        )}
      </div>
    </AppShell>
  );
}
