import type { ReactNode } from "react";
import { Term, type TermEntry } from "../_components/term";
import dictionary from "./dictionary.json";
import modulesData from "./modules_content.json";
import { lessonTabs } from "./modules-render";

/*
 * Auto-links jargon in lesson text to the Jargon Dictionary. Rules, tuned against
 * how the terms are actually used in the course content:
 *  - only the first mention of each term in a lesson is linked (no underline soup);
 *  - longer terms win ("Prime badge" before "Prime", "GTIN exemption" before "GTIN");
 *  - acronyms must match case exactly (FBA, not "fba"); other terms ignore case;
 *  - simple plurals count ("ASINs", "polybags");
 *  - brand phrases are left alone ("Elite FBA" is not the FBA term);
 *  - a few words used in their everyday sense in lessons are skipped ("prep block");
 *  - core vocabulary (a term used in 5+ lessons, like "listing" or "bundle") is only
 *    underlined in the first two lessons that use it, so later lessons stay clean.
 */

const SKIP = new Set(["Prep"]);
// Where a lesson uses a term for another platform (Module 8: eBay's "fast payouts", TikTok Shop "lifestyle images").
const SKIP_IN_MODULE: Record<string, Set<string>> = {
  "29b20c1c-884d-80b1-aae2-c5ce97cd2fec": new Set(["Payout", "Lifestyle image"]),
};
const PROTECTED = /Elite FBA/g;
const MAX_PER_LESSON = 14;
const CORE_MIN_LESSONS = 5;
const CORE_LINKED_LESSONS = 2;
const TEXT_TYPES = new Set(["paragraph", "bulleted_list_item", "numbered_list_item", "callout", "to_do"]);

const ENTRIES: TermEntry[] = (dictionary as TermEntry[]).filter((d) => !SKIP.has(d.term));
const BY_KEY = new Map(ENTRIES.map((e) => [e.term.toLowerCase(), e]));
const isAcronym = (term: string) => term.length > 1 && /^[A-Z0-9&+-]+$/.test(term);
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// One alternation, longest first so the longest term at a position wins.
const PATTERN = new RegExp(
  `(?<![\\p{L}\\p{N}])(${[...ENTRIES]
    .sort((a, b) => b.term.length - a.term.length)
    .map((e) => escape(e.term))
    .join("|")})(s|es)?(?![\\p{L}\\p{N}])`,
  "giu",
);

/** Every term the linker would recognise in a piece of text, using the same rules as linkTerms. */
function termsIn(text: string): TermEntry[] {
  const protectedRanges: [number, number][] = [];
  for (const m of text.matchAll(PROTECTED)) protectedRanges.push([m.index, m.index + m[0].length]);
  const found: TermEntry[] = [];
  for (const m of text.matchAll(PATTERN)) {
    const entry = BY_KEY.get(m[1].toLowerCase());
    if (!entry || (isAcronym(entry.term) && m[1] !== entry.term)) continue;
    const start = m.index;
    const end = start + m[0].length;
    if (protectedRanges.some(([a, b]) => start < b && end > a)) continue;
    found.push(entry);
  }
  return found;
}

export const lessonKey = (moduleId: string, tabId: string) => `${moduleId}::${tabId}`;

let appearancesCache: Map<string, string[]> | null = null;

/** For each term, the lessons that use it, in course order. Built once, on first use. */
function appearances() {
  if (appearancesCache) return appearancesCache;
  const map = new Map<string, string[]>();
  modulesData.forEach((mod, i) => {
    for (const tab of lessonTabs(i)) {
      const here = new Set<string>();
      for (const b of tab.blocks) {
        if (b.content && TEXT_TYPES.has(b.type)) for (const e of termsIn(b.content)) here.add(e.term);
      }
      for (const term of here) map.set(term, [...(map.get(term) ?? []), lessonKey(mod.id, tab.id)]);
    }
  });
  appearancesCache = map;
  return map;
}

/** Tracks which terms a lesson has already linked. Create one per lesson render. */
export type GlossaryRun = { seen: Set<string>; used: TermEntry[]; lesson?: string };

/** Pass the lesson's key so core vocabulary is only underlined where it is introduced. */
export function createGlossaryRun(lesson?: string): GlossaryRun {
  return { seen: new Set(), used: [], lesson };
}

function isIntroducedHere(term: string, lesson: string | undefined) {
  if (!lesson) return true;
  const where = appearances().get(term);
  if (!where || where.length < CORE_MIN_LESSONS) return true;
  return where.slice(0, CORE_LINKED_LESSONS).includes(lesson);
}

/** Plain lesson text -> text with the first mention of each dictionary term linked. */
export function linkTerms(text: string | undefined, run: GlossaryRun | undefined): ReactNode {
  if (!text || !run || run.used.length >= MAX_PER_LESSON) return text;

  const protectedRanges: [number, number][] = [];
  for (const m of text.matchAll(PROTECTED)) protectedRanges.push([m.index, m.index + m[0].length]);

  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(PATTERN)) {
    if (run.used.length >= MAX_PER_LESSON) break;
    const start = m.index;
    const end = start + m[0].length;
    const entry = BY_KEY.get(m[1].toLowerCase());
    if (!entry) continue;
    if (isAcronym(entry.term) && m[1] !== entry.term) continue;
    if (protectedRanges.some(([a, b]) => start < b && end > a)) continue;
    if (run.seen.has(entry.term)) continue;
    if (!isIntroducedHere(entry.term, run.lesson)) continue;
    if (run.lesson && SKIP_IN_MODULE[run.lesson.split("::")[0]]?.has(entry.term)) continue;

    run.seen.add(entry.term);
    run.used.push(entry);
    if (start > last) out.push(text.slice(last, start));
    out.push(
      <Term key={`${entry.term}-${start}`} entry={entry}>
        {m[0]}
      </Term>,
    );
    last = end;
  }
  if (!out.length) return text;
  if (last < text.length) out.push(text.slice(last));
  return out;
}
