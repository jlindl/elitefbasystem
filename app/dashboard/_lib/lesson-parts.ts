import { slugify, type Block } from "./modules-render";

/**
 * A lesson, cut into short parts at its section headings, so it can be worked through one
 * part at a time. Text before the first heading becomes an "Introduction" part.
 */
export type LessonPart = {
  /** Anchor id: the heading's slug (the same ids the lesson has always used), or "introduction". */
  id: string;
  /** The full heading, as written in the course. */
  heading: string;
  /** "Route A" from "Route A: If You Already Trade…", shown small above the title. */
  kicker: string | null;
  title: string;
  /** The part's content, without its heading. */
  blocks: Block[];
  minutes: number;
  /** Hands-on tools in this part (calculators, steppers, checklists…). */
  interactive: number;
  /** Has text to read aloud (a part that is only a tool doesn't). */
  readable: boolean;
};

/** The step every lesson ends on: key terms, the knowledge check and "Complete lesson". */
export const WRAP_UP_ID = "wrap-up";

const TEXT = new Set(["paragraph", "heading_1", "heading_2", "heading_3", "bulleted_list_item", "numbered_list_item", "callout", "quote", "to_do"]);
const MEDIA = new Set(["video", "image", "external_link", "lesson_marker"]);
// Widgets you look at rather than use. Everything else that isn't text or media is hands-on.
const DIAGRAMS = new Set([
  "prime_comparison",
  "pillar_showcase",
  "unit_economics",
  "module_sections",
  "split_work_diagram",
  "inventory_status_board",
  "customer_inquiry_flow",
  "badge_eligibility_path",
  "fee_breakdown_diagram",
  "economics_targets",
  "measurement_diagram",
  "box_spec_card",
  "delivery_timeline",
]);

const SPOKEN = new Set(["paragraph", "heading_3", "bulleted_list_item", "numbered_list_item", "callout", "quote", "to_do"]);
const isWidget = (b: Block) => !TEXT.has(b.type) && !MEDIA.has(b.type);
export const isInteractive = (b: Block) => isWidget(b) && !DIAGRAMS.has(b.type);

/** "Route A: If You Already Trade…" -> kicker "Route A", title "If You Already Trade…". */
export function splitHeading(heading: string): { kicker: string | null; title: string } {
  const m = heading.match(/^(.{2,32}?):\s+(.{6,})$/);
  return m ? { kicker: m[1].trim(), title: m[2].trim() } : { kicker: null, title: heading };
}

function minutesFor(blocks: Block[]) {
  let words = 0;
  let widgets = 0;
  for (const b of blocks) {
    if (b.content) words += b.content.split(/\s+/).filter(Boolean).length;
    if (isWidget(b)) widgets++;
  }
  return Math.max(1, Math.round(words / 200 + widgets * 2));
}

/** `lessonTitle` names the single part of a lesson that has no headings at all. */
export function splitLessonParts(blocks: Block[], lessonTitle = "The lesson"): LessonPart[] {
  const parts: LessonPart[] = [];
  const seen = new Set<string>();
  const uniqueId = (base: string) => {
    let id = base || "part";
    for (let n = 2; seen.has(id) || id === WRAP_UP_ID; n++) id = `${base}-${n}`;
    seen.add(id);
    return id;
  };

  let current: { heading: string | null; blocks: Block[] } = { heading: null, blocks: [] };
  const groups: (typeof current)[] = [current];
  for (const b of blocks) {
    if (b.type === "lesson_marker") continue;
    if (b.type === "heading_2" && b.content?.trim()) {
      current = { heading: b.content.trim(), blocks: [] };
      groups.push(current);
    } else {
      current.blocks.push(b);
    }
  }

  const headed = groups.some((g) => g.heading);
  for (const g of groups) {
    const meaningful = g.blocks.some((b) => b.type !== "paragraph" || b.content?.trim());
    if (!g.heading && !meaningful) continue;
    // A lesson with no headings at all is a single part.
    const heading = g.heading ?? (headed ? "Introduction" : lessonTitle);
    const { kicker, title } = g.heading || !headed ? splitHeading(heading) : { kicker: null, title: heading };
    parts.push({
      // Same slug (and de-duplication) the lesson's headings have always had, so old links still land.
      id: uniqueId(g.heading ? slugify(g.heading) : "introduction"),
      heading,
      kicker,
      title,
      blocks: g.blocks,
      minutes: minutesFor(g.blocks),
      interactive: g.blocks.filter(isInteractive).length,
      readable: g.blocks.some((b) => SPOKEN.has(b.type) && !!b.content?.trim()),
    });
  }
  return parts;
}
