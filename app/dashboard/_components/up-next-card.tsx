import Link from "next/link";
import { ChevronRight, FileText } from "@/app/components/icons";
import { getUpcomingLessons } from "../_lib/next-lesson";
import { Card } from "./ui/card";

export async function UpNextCard() {
  const upNext = await getUpcomingLessons(3);

  return (
    <Card
      className="h-full dash-fade flex flex-col"
      style={{ ["--dash-delay" as string]: "60ms" }}
    >
      <h2 className="font-display text-[1rem] font-medium tracking-[-0.01em]">
        Up next
      </h2>

      {upNext.length === 0 ? (
        <p className="mt-4 flex-1 text-[0.9375rem] text-ink-muted">
          You&rsquo;ve completed every lesson. Nice work.
        </p>
      ) : (
        <ul className="mt-4 flex-1 flex flex-col">
          {upNext.map((lesson, i) => (
            <li
              key={`${lesson.moduleId}-${lesson.tabId}`}
              className={i < upNext.length - 1 ? "border-b border-line-soft" : ""}
            >
              <Link
                href={lesson.href}
                className="group flex w-full items-center gap-3 h-14 px-1 -mx-1 rounded-md text-left transition-colors duration-150 hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-alt text-ink shrink-0">
                  <FileText size={16} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[0.9375rem] font-medium text-ink truncate">
                    {lesson.lessonTitle}
                  </span>
                  <span className="block font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-subtle truncate">
                    Module {lesson.moduleNumber} · Lesson {lesson.lessonNumber} ·{" "}
                    {lesson.moduleTitle}
                  </span>
                </span>
                <ChevronRight
                  size={16}
                  className="text-ink-subtle group-hover:text-ink-muted transition-colors shrink-0"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/dashboard/modules"
        className="mt-4 inline-flex items-center text-[0.875rem] text-ink-muted hover:text-ink transition-colors duration-150"
      >
        See all modules <span aria-hidden className="ml-1">→</span>
      </Link>
    </Card>
  );
}
