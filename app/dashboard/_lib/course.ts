import "server-only";
import { cache } from "react";
import { getMyProgress } from "./mission-progress";
import { levelFor, streakDays, totalXp } from "./missions";
import modulesData from "./modules_content.json";
import { MODULE_QUIZZES } from "./module-quizzes";
import { getPassedModules } from "./module-exam-results";
import {
  hasLessonMarkers,
  lessonTabs,
  type Block,
  type Tab,
} from "./modules-render";
import { getCompletedTabs } from "./tab-completions";

/** Modules 6-9 are still gated behind the module password. */
export const LOCKED_FROM_INDEX = 5;

export type LessonInfo = {
  id: string;
  number: number;
  label: string;
  icon: string;
  description?: string;
  color?: Tab["color"];
  href: string;
  minutes: number;
  done: boolean;
};

export type ModuleInfo = {
  id: string;
  number: number;
  title: string;
  /** Lesson-card layout (Modules 1-5) vs tabbed layout (6-9). */
  structured: boolean;
  locked: boolean;
  hasExam: boolean;
  passed: boolean;
  lessons: LessonInfo[];
  done: number;
  total: number;
};

export function moduleTitle(name: string): string {
  return name.replace(/^Module\s+\d+\s*[-:]\s*/i, "").trim() || name;
}

/** Same split the Modules page, lesson pages and the glossary use. */
export function tabsForModule(index: number): Tab[] {
  return lessonTabs(index);
}

/** Rough reading time: ~200 words a minute, interactive blocks count as a minute each. */
export function readingMinutes(blocks: Block[]) {
  let words = 0;
  let widgets = 0;
  for (const b of blocks) {
    if (b.content) words += b.content.split(/\s+/).length;
    else if (!["lesson_marker", "video"].includes(b.type)) widgets++;
  }
  return Math.max(3, Math.round(words / 200 + widgets * 2));
}

// Structure never changes at runtime, so build it once.
const STRUCTURE = modulesData.map((mod, index) => {
  const blocks = mod.blocks as Block[];
  const structured = index === 0 || hasLessonMarkers(blocks);
  const tabs = tabsForModule(index);
  return {
    id: mod.id,
    number: index + 1,
    title: moduleTitle(mod.name),
    structured,
    locked: index >= LOCKED_FROM_INDEX,
    hasExam: !!MODULE_QUIZZES[mod.id],
    lessons: tabs.map((t, i) => ({
      id: t.id,
      number: i + 1,
      label: t.label,
      icon: t.icon,
      description: t.description,
      color: t.color,
      href: `/dashboard/modules/${mod.id}/${t.id}`,
      minutes: readingMinutes(t.blocks),
    })),
  };
});

async function loadCourse() {
  const [completed, passed] = await Promise.all([getCompletedTabs(), getPassedModules()]);

  const modules: ModuleInfo[] = STRUCTURE.map((m) => {
    const lessons = m.lessons.map((l) => ({ ...l, done: completed.has(`${m.id}::${l.id}`) }));
    return {
      ...m,
      passed: passed.has(m.id),
      lessons,
      done: lessons.filter((l) => l.done).length,
      total: lessons.length,
    };
  });

  const open = modules.filter((m) => !m.locked);
  const lessonsDone = open.reduce((a, m) => a + m.done, 0);
  const lessonsTotal = open.reduce((a, m) => a + m.total, 0);
  const next =
    open.flatMap((m) => m.lessons.map((l) => ({ module: m, lesson: l }))).find((x) => !x.lesson.done) ?? null;

  return {
    modules,
    lessonsDone,
    lessonsTotal,
    modulesPassed: modules.filter((m) => m.passed).length,
    percent: lessonsTotal ? Math.round((lessonsDone / lessonsTotal) * 100) : 0,
    next,
  };
}

/** Course progress for the signed-in student, shared by everything in one request. */
export const getCourse = cache(loadCourse);
export type Course = Awaited<ReturnType<typeof loadCourse>>;

/** Mission progress + derived XP, level and streak, shared within one request. */
export const getGameStats = cache(async () => {
  const progress = await getMyProgress();
  const xp = totalXp(progress);
  return { progress, xp, level: levelFor(xp), streak: streakDays(progress) };
});

/* ------------------------------------------------------------------ */
/* Search index for the command palette                               */
/* ------------------------------------------------------------------ */

export type SearchItem = {
  kind: "page" | "lesson" | "term" | "supplier" | "link";
  title: string;
  hint?: string;
  href: string;
  external?: boolean;
};

const PAGES: SearchItem[] = [
  { kind: "page", title: "Dashboard", href: "/dashboard" },
  { kind: "page", title: "Modules", href: "/dashboard/modules" },
  { kind: "page", title: "Missions", href: "/dashboard/missions" },
  { kind: "page", title: "Certificates", href: "/dashboard/certificates" },
  { kind: "page", title: "Wins wall", href: "/dashboard/wins" },
  { kind: "page", title: "What's new", href: "/dashboard/whats-new" },
  { kind: "page", title: "Supplies checklist", href: "/dashboard/tools/supplies" },
  { kind: "page", title: "My Tools", href: "/dashboard/tools" },
  { kind: "page", title: "Jargon Dictionary", href: "/dashboard/tools/dictionary" },
  { kind: "page", title: "Wholesale Suppliers", href: "/dashboard/tools/suppliers" },
  { kind: "page", title: "Useful Links", href: "/dashboard/tools/links" },
  { kind: "page", title: "The Team", href: "/dashboard/team" },
  { kind: "page", title: "Account", href: "/dashboard/account" },
  { kind: "page", title: "Help", href: "/dashboard/help" },
];

let INDEX: SearchItem[] | null = null;

export async function getSearchIndex(): Promise<SearchItem[]> {
  if (INDEX) return INDEX;
  const [{ default: dictionary }, { default: suppliers }, { default: links }] = await Promise.all([
    import("./dictionary.json"),
    import("./suppliers.json"),
    import("./useful-links.json"),
  ]);
  INDEX = [
    ...PAGES,
    ...STRUCTURE.map((m) => ({
      kind: "page" as const,
      title: `Module ${m.number}: ${m.title}`,
      hint: m.locked ? "Locked" : m.structured ? `${m.lessons.length} lessons` : "Reading module",
      href: `/dashboard/modules/${m.id}`,
    })),
    ...STRUCTURE.filter((m) => !m.locked).flatMap((m) =>
      m.lessons.map((l) => ({
        kind: "lesson" as const,
        title: l.label,
        hint: `Module ${m.number} · Lesson ${l.number}`,
        href: l.href,
      })),
    ),
    ...(dictionary as { term: string; acronymFor: string }[]).map((d) => ({
      kind: "term" as const,
      title: d.term,
      hint: d.acronymFor || undefined,
      href: `/dashboard/tools/dictionary?q=${encodeURIComponent(d.term)}`,
    })),
    ...(suppliers as { name: string; url: string; category: string }[]).map((s) => ({
      kind: "supplier" as const,
      title: s.name,
      hint: s.category,
      href: s.url,
      external: true,
    })),
    ...(links as { name: string; url: string; category: string }[]).map((s) => ({
      kind: "link" as const,
      title: s.name,
      hint: s.category,
      href: s.url,
      external: true,
    })),
  ];
  return INDEX;
}
