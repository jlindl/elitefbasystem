import Link from "next/link";
import { ChevronRight, Clock } from "@/app/components/icons";
import type { LessonInfo } from "../_lib/course";

/** One step in a module's lesson list. Status is spelled out, never colour-only. */
export function LessonRow({ lesson, next, last }: { lesson: LessonInfo; next: boolean; last: boolean }) {
  const status = lesson.done ? "Completed" : next ? "Up next" : "Not started";
  return (
    <li className="relative pl-14 sm:pl-16">
      {/* Step marker + connector line */}
      <span
        aria-hidden
        className={`absolute left-0 top-5 z-[1] inline-flex h-10 w-10 items-center justify-center rounded-full font-display text-[1rem] font-semibold tabular-nums sm:h-11 sm:w-11 ${
          lesson.done ? "bg-emerald-600 text-white" : next ? "bg-ink text-white" : "bg-surface text-ink ring-2 ring-line"
        }`}
      >
        {lesson.done ? "✓" : lesson.number}
      </span>
      {!last && <span aria-hidden className="absolute bottom-[-0.75rem] left-5 top-16 w-0.5 -translate-x-1/2 bg-line sm:left-[1.375rem]" />}

      <Link
        href={lesson.href}
        aria-current={next ? "step" : undefined}
        className={`group flex items-center gap-4 rounded-2xl border bg-surface p-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[var(--shadow-lift)] sm:p-5 ${
          next ? "border-ink/40 ring-2 ring-ink/10" : "border-line"
        }`}
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[0.875rem] font-medium text-ink-muted">Lesson {lesson.number}</span>
          <h3 className="mt-0.5 font-display text-[1.125rem] font-semibold leading-snug text-ink">
            <span aria-hidden className="mr-2">
              {lesson.icon}
            </span>
            {lesson.label}
          </h3>
          {lesson.description && <p className="mt-1.5 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-muted">{lesson.description}</p>}
          <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.9375rem]">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.875rem] font-semibold ${
                lesson.done
                  ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                  : next
                    ? "bg-ink text-white"
                    : "bg-surface-alt text-ink-muted ring-1 ring-line"
              }`}
            >
              <span aria-hidden>{lesson.done ? "✓" : next ? "→" : "○"}</span>
              {status}
            </span>
            <span className="inline-flex items-center gap-1.5 text-ink-muted">
              <Clock size={15} /> {lesson.minutes} min read
            </span>
          </span>
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
