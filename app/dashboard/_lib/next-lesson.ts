import "server-only";
import modulesData from "./modules_content.json";
import {
  groupBlocksIntoTabs,
  hasLessonMarkers,
  splitVideoFromBlocks,
  type Block,
} from "./modules-render";
import { getCompletedTabs } from "./tab-completions";

export type NextLesson = {
  moduleId: string;
  moduleNumber: number;
  moduleTitle: string;
  tabId: string;
  lessonNumber: number;
  lessonTitle: string;
  href: string;
};

// Mirrors how the Modules page derives a module's lesson tabs: modules with
// lesson_marker blocks (and legacy Module 1) split the intro video off first,
// everything else groups its blocks directly.
function tabsForModule(blocks: Block[], index: number) {
  if (index === 0 || hasLessonMarkers(blocks)) {
    const { rest } = splitVideoFromBlocks(blocks);
    return groupBlocksIntoTabs(rest);
  }
  return groupBlocksIntoTabs(blocks);
}

// Strip the "Module N - " prefix from the stored module name so we can show a
// clean module title alongside the numeral.
function moduleTitle(name: string): string {
  return name.replace(/^Module\s+\d+\s*[-:]\s*/i, "").trim() || name;
}

/**
 * Walks every module in order and returns the lessons the student has not yet
 * marked complete, in course order. Pass a limit to cap how many are returned.
 */
export async function getUpcomingLessons(limit?: number): Promise<NextLesson[]> {
  const completed = await getCompletedTabs();
  const upcoming: NextLesson[] = [];

  for (let i = 0; i < modulesData.length; i++) {
    const mod = modulesData[i];
    const tabs = tabsForModule(mod.blocks as Block[], i);

    for (let t = 0; t < tabs.length; t++) {
      const tab = tabs[t];
      if (completed.has(`${mod.id}::${tab.id}`)) continue;

      upcoming.push({
        moduleId: mod.id,
        moduleNumber: i + 1,
        moduleTitle: moduleTitle(mod.name),
        tabId: tab.id,
        lessonNumber: t + 1,
        lessonTitle: tab.label,
        href: `/dashboard/modules/${mod.id}/${tab.id}`,
      });

      if (limit !== undefined && upcoming.length >= limit) return upcoming;
    }
  }

  return upcoming;
}

/**
 * Returns the first lesson the student has not yet marked complete, or null
 * when every lesson is checked off.
 */
export async function getNextLesson(): Promise<NextLesson | null> {
  const [next] = await getUpcomingLessons(1);
  return next ?? null;
}
