import type { LessonInfo, ModuleInfo } from "./course";

export type ModuleStatus = {
  key: "locked" | "passed" | "exam-ready" | "complete" | "progress" | "new";
  label: string;
  /** Plain-text glyph so the state never relies on colour alone. */
  glyph: string;
  /** Badge colours - every pair passes WCAG AA for small text. */
  cls: string;
};

/** Lessons that count - Modules 6-9 are single reading modules, not lesson lists. */
export function lessonCount(m: ModuleInfo) {
  return m.structured ? m.total : 0;
}

export function moduleStatus(m: ModuleInfo): ModuleStatus {
  const total = lessonCount(m);
  if (m.locked) return { key: "locked", label: "Locked", glyph: "🔒", cls: "bg-surface-alt text-ink-muted ring-1 ring-line" };
  if (m.passed) return { key: "passed", label: "Exam passed", glyph: "✓", cls: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" };
  if (total && m.done === total)
    return m.hasExam
      ? { key: "exam-ready", label: "Ready for the exam", glyph: "★", cls: "bg-amber-50 text-amber-900 ring-1 ring-amber-200" }
      : { key: "complete", label: "Complete", glyph: "✓", cls: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" };
  if (m.done > 0) return { key: "progress", label: "In progress", glyph: "◐", cls: "bg-orange-50 text-orange-800 ring-1 ring-orange-200" };
  return { key: "new", label: "Not started", glyph: "○", cls: "bg-surface-alt text-ink-muted ring-1 ring-line" };
}

export function moduleMinutes(m: ModuleInfo) {
  return m.structured ? m.lessons.reduce((a, l) => a + l.minutes, 0) : 0;
}

/** "About 45 minutes" / "About 1 hr 20 min". */
export function formatDuration(minutes: number) {
  if (minutes < 60) return `About ${minutes} min`;
  const h = Math.floor(minutes / 60);
  const rest = Math.round((minutes % 60) / 5) * 5;
  return `About ${h} hr${rest ? ` ${rest} min` : ""}`;
}

export function firstUnfinished(m: ModuleInfo): LessonInfo | null {
  return m.lessons.find((l) => !l.done) ?? null;
}
