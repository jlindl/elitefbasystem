# Claude Code Build Prompt: PoundMart FBA - Course Content UI

> **Read this entire file before writing code.** This builds on the existing dashboard project. Don't start a new repo - extend the one already there.

---

## What you're building

Three new screens, layered onto the **existing PoundMart dashboard**, that turn the 9 module `.md` files in `content/modules/` into a full, navigable course experience:

1. **Modules Index (`/modules`)** - a list of all 9 modules with progress, locking, and Phase 1 / Phase 2 separation.
2. **Module Overview (`/modules/[slug]`)** - the landing page for a single module with its lesson list, summary, and tool callouts.
3. **Lesson View (`/modules/[slug]/lessons/[lessonId]`)** - the actual lesson with video player, content area, prev/next navigation, and progress checkbox.

Everything must visually match the existing dashboard exactly - same colors, type, spacing, sidebar, motion. The student should never feel like they've left the app.

---

## Prerequisites you must read first

Before writing anything, do these in order:

1. **Open the existing project.** The dashboard already exists at `app/dashboard/page.tsx` along with the sidebar (`components/layout/Sidebar.tsx`), the AppShell, and the design tokens in `globals.css`.
2. **Read the existing `globals.css`** to understand the design tokens already defined (`--color-bg`, `--color-ink`, `--color-accent`, etc.). Don't redefine them - extend them only if absolutely needed.
3. **Read `components/layout/Sidebar.tsx`** to understand the active-route highlighting pattern. The `Modules` nav item must light up when the user is on any of the new routes.
4. **Read all 9 files in `content/modules/`** plus the `README.md` in that folder. The README documents the conventions - frontmatter, callout types, lesson structure, navigation patterns. Your renderer must respect every convention in there.
5. **Confirm the file structure.** If `content/modules/` doesn't exist yet, create it and place the `.md` files there before continuing.

If any of these are missing, stop and ask before proceeding.

---

## Project additions

Add the following files to the existing project. Do not modify any dashboard component unless explicitly noted.

```
poundmart-dashboard/
├── content/
│   └── modules/                  # the 9 .md files + README live here
├── app/
│   └── modules/
│       ├── page.tsx              # /modules - modules index
│       └── [slug]/
│           ├── page.tsx          # /modules/[slug] - module overview
│           └── lessons/
│               └── [lessonId]/
│                   └── page.tsx  # /modules/[slug]/lessons/[lessonId]
├── components/
│   ├── modules/
│   │   ├── ModuleListItem.tsx    # row in the modules index
│   │   ├── PhaseDivider.tsx      # the "Phase 2" visual break
│   │   ├── ModuleHeader.tsx      # title block on a module overview
│   │   ├── LessonListItem.tsx    # row in a module's lesson list
│   │   └── ToolCallout.tsx       # the 🛠 tool block at module top
│   └── lesson/
│       ├── LessonHeader.tsx      # breadcrumb + title + meta
│       ├── VideoPlayer.tsx       # placeholder video player
│       ├── LessonContent.tsx     # markdown renderer with custom components
│       ├── LessonSidebar.tsx     # right-rail with lesson list + ask Jakub
│       ├── LessonNav.tsx         # bottom prev/mark complete/next strip
│       ├── Callout.tsx           # 💡 Jakub's note / ⚠️ Watch out / 🛠 Tool
│       └── ChecklistItem.tsx     # interactive [ ] checkbox in markdown
└── lib/
    ├── modules.ts                # module file loading + parsing
    └── progress.ts               # mock progress state (extends mockData)
```

Install these additional dependencies:

- `gray-matter` - parse YAML frontmatter from .md files
- `react-markdown` - render the markdown content
- `remark-gfm` - GitHub-flavored markdown support (tables, task lists)
- `rehype-slug` - auto-generate id slugs on headings for anchor links
- `rehype-autolink-headings` - make headings clickable anchors
- `lucide-react` - already installed; used for icons in the new components

---

## Visual system (inherited - DO NOT introduce new tokens)

Use only the design tokens already in `globals.css`. The course content screens are app surfaces, not marketing pages - same restraint as the dashboard.

**Reminder of the strict rules:**
- Orange is for: the active progress bar, the primary CTA per page (one per page max), the active sidebar accent, completion ring on the user avatar, the active lesson indicator. **Nowhere else.**
- Green (`--color-success`) is for: completed-lesson checkmarks and the `COMPLETE` status pill. Never as a CTA, never as a background block.
- Cards: `bg-[var(--color-surface)]` with `border border-[var(--color-line)]` and `rounded-2xl`.
- Hover on cards: border darkens to `--color-ink-subtle`. No transform, no shadow change.
- Text hierarchy follows the dashboard's existing scale.

**Type rules specific to course content:**
- Lesson titles (h1 in lesson view): 2.25rem desktop / 1.5rem mobile, weight 500.
- Lesson body prose: 1rem, line-height 1.7 (slightly more than dashboard - students read longer here).
- Body prose max-width: 68ch. Don't let lines run wider - readability dies past that.

**Motion rules (calmer than marketing pages):**
- Page transitions: instant, no fade.
- Markdown content: no animation. It just appears.
- Checkbox interactions: 150ms transitions on the check fill.
- Video player play button: 200ms scale on hover.
- Honor `prefers-reduced-motion` everywhere.

---

## Step 1: Module loading library

Build `lib/modules.ts` first - everything depends on it.

It exposes these functions:

```typescript
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export type ModuleMeta = {
  module: number;            // 1–9
  title: string;
  slug: string;
  phase: string;             // "Phase 1 - Lean Launch" or "Phase 2 - Building a Real Brand"
  estimated_minutes: number;
  lessons: number;
  prerequisite: number | null;
  tools: string[];           // e.g., ["product-research-form"]
  status: string;            // "available" or "locked" - but we override at runtime
};

export type Lesson = {
  id: string;                // e.g., "1.1"
  number: string;            // e.g., "Lesson 1.1"
  title: string;             // e.g., "What FBA Actually Is"
  durationMinutes: number;
  position: number;          // 1-indexed within the module
  total: number;             // total lessons in the module
  content: string;           // the markdown body of just this lesson
  anchor: string;            // the heading anchor slug
};

export type Module = {
  meta: ModuleMeta;
  intro: string;             // markdown above the first "## Lesson"
  lessons: Lesson[];
};

export async function getAllModules(): Promise<Module[]>;
export async function getModule(slug: string): Promise<Module | null>;
export async function getLesson(slug: string, lessonId: string): Promise<{
  module: Module;
  lesson: Lesson;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  prevModule: Module | null;
  nextModule: Module | null;
} | null>;
```

**How to parse a module file:**

1. Read the `.md` file from `content/modules/`.
2. `matter(file)` splits frontmatter from content.
3. The content has this shape:

```
# Module N - Title

> What you'll walk away with...
> Note from Jakub...

## Module overview
[overview table - keep this in the intro section]

## Lesson 1.1 - Title
**X min · Lesson 1 of N**
[lesson body]

## Lesson 1.2 - Title
[lesson body]
```

4. Split the content on lines that start with `## Lesson `. Everything before the first `## Lesson ` is the `intro`. Everything after is split into lessons.
5. For each lesson, parse the heading line: `## Lesson 1.1 - What FBA Actually Is` → id `"1.1"`, number `"Lesson 1.1"`, title `"What FBA Actually Is"`.
6. Parse the metadata line `**X min · Lesson N of M**` to extract `durationMinutes`, `position`, `total`.
7. The lesson `content` is everything after the metadata line up to (but not including) the next `## Lesson ` or end of file.
8. Generate `anchor` as `lesson-${id.replace('.','')}` to match the markdown's existing anchor links.

**Caching:** The .md files don't change at runtime. Use Next.js's built-in `unstable_cache` or just memoize at the module level. This is a server-side function only - never expose to the client.

---

## Step 2: Progress state (mock)

Extend `lib/mockData.ts` (the existing file) - don't replace it. Add:

```typescript
export const lessonProgress: Record<string, 'complete' | 'in-progress' | null> = {
  // Module 1 - all complete
  '1.1': 'complete',
  '1.2': 'complete',
  '1.3': 'complete',
  '1.4': 'complete',
  // Module 2 - all complete
  '2.1': 'complete',
  '2.2': 'complete',
  '2.3': 'complete',
  // Module 3 - all complete
  '3.1': 'complete',
  '3.2': 'complete',
  '3.3': 'complete',
  '3.4': 'complete',
  '3.5': 'complete',
  // Module 4 - partial (the current module)
  '4.1': 'complete',
  '4.2': 'in-progress',
  '4.3': null,
  '4.4': null,
  '4.5': null,
  // Modules 5–9 - locked, no progress yet
};

export function getModuleStatus(moduleNumber: number): 'complete' | 'in-progress' | 'available' | 'locked' {
  // complete: all lessons complete
  // in-progress: at least one lesson complete or in-progress
  // available: prerequisite module is complete, but no lessons started
  // locked: prerequisite not met
  // (implement based on lessonProgress + module prerequisites)
}
```

This is mock data; real progress will come from a backend later. Keep the shape generic so swapping in a real source is easy.

---

## Step 3: Modules Index (`/modules`)

Build `app/modules/page.tsx` - the screen that lists all 9 modules.

### Layout

- Wrap in the existing `AppShell`.
- Main content padding matches the dashboard: 40px desktop / 16px mobile.
- Max-width 1100px, left-aligned.
- Sidebar `Modules` nav item is in its active state for this and all child routes.

### Header section

- Page title: `Modules` (heading font, weight 500, 1.875rem desktop / 1.5rem mobile).
- One-line subtitle in `--color-ink-muted`: `The full PoundMart FBA build, in order.`
- Below the title block, a slim progress overview (same style as the dashboard's Welcome card progress):
  - `<ProgressBar percent={X} />` (240px wide) with mono caps label next to it: `4 / 9 MODULES · 44% COMPLETE`
  - Calculate the percentage from `lessonProgress` - total complete lessons ÷ total lessons across all modules.
- 32px gap below the header before the module list starts.

### Module list

A vertical list of module rows, gap 12px between rows.

**Phase divider:** Render a `<PhaseDivider />` component above Module 6. The divider is a thin horizontal line with centered text:

```
─── PHASE 2: BUILDING A REAL BRAND ───
```

The text is mono small caps (0.75rem, letter-spacing 0.08em, uppercase, `--color-ink-subtle`). The horizontal lines are 1px `--color-line`, taking up the remaining horizontal space on either side of the text. Vertical padding 32px above and below.

### `ModuleListItem` component

Each module row:

- Component: `<ModuleListItem module={module} status={status} />`
- Renders as a `Card`-styled wrapper that's a `<Link>` (or `<button>` if locked).
- Height: 96px desktop / auto mobile.
- Internal padding: 24px.
- Layout: horizontal flex on desktop, gap 16px:
  1. **Module icon** - 56px square, `bg-[var(--color-surface-alt)]`, rounded 12px, Lucide icon centered (24px), `--color-ink`. Icons by module:
     - 1: `BookOpen`, 2: `IdCard`, 3: `Search`, 4: `FileText`, 5: `Truck`, 6: `Crown`, 7: `Megaphone`, 8: `Globe`, 9: `Wrench`
  2. **Center content (flex-grow):**
     - Top line: mono small caps `MODULE 0N` in `--color-ink-subtle`.
     - Title in heading font, weight 500, 1.125rem.
     - One-line description in `--color-ink-muted`, 0.875rem. Pull from the module's `intro` - the first sentence after the "What you'll walk away with" blockquote, or write a fallback.
     - Below: tool badges, if `meta.tools` is non-empty. A small pill `bg-[var(--color-accent-soft)]` with `text-[var(--color-accent)]`, 0.75rem mono caps: `🛠 USES PRODUCT RESEARCH FORM`. Multiple tools = multiple pills, gap 8px.
  3. **Right-side meta:**
     - Mini progress bar showing module completion (only if `in-progress`): 60px wide, 3px tall, same color treatment as main bar.
     - `<StatusPill status={status} />` - reuses the existing primitive.
- Locked rows: 60% opacity overall, cursor-not-allowed, no hover effect, not clickable.
- Available/in-progress/complete rows: hover behavior matches dashboard cards (border shifts to `--color-ink-subtle`).

### Mobile

- Grid stays single-column (it already is).
- Module icon shrinks to 40px square.
- Status pill moves below the title on very narrow viewports.

---

## Step 4: Module Overview (`/modules/[slug]`)

Build `app/modules/[slug]/page.tsx` - the landing page for a single module.

This is the page a student sees when they click a module from the index. It's a **decision point**, not a lesson. It tells them what they're about to learn, what tools they'll use, and lets them jump into any lesson.

### Layout

- AppShell with sidebar.
- Main content max-width 880px (narrower than the modules index - this is a reading surface).
- Outer padding: 40px desktop / 16px mobile.

### Breadcrumb

Mono small caps, top of page:
`MODULES / MODULE 04 - LISTING CREATION`

The first segment links back to `/modules`. Color: `--color-ink-subtle`, hover `--color-ink`.

### `ModuleHeader` component

- Phase label in mono small caps: `PHASE 1 - LEAN LAUNCH` (or 2). Color matches `--color-ink-subtle`.
- Module number + title: `Module 4 - Listing Creation` (heading font, weight 500, 2.25rem desktop / 1.75rem mobile).
- "What you'll walk away with" blockquote - render the actual blockquote from the module's intro markdown. Style: left border 3px `--color-accent`, background `--color-accent-soft`, padding 16px 20px, rounded 12px on the right side only, italic body text in `--color-ink`.
- Italic Jakub note - render the second blockquote from intro if present. Style: smaller, 0.9375rem, `--color-ink-muted`, italic, no border.
- Meta strip below: mono small caps row showing `[X] LESSONS · ~[Y] MIN TOTAL · PHASE [N]`. Items separated by `·`.

### `ToolCallout` component (conditional)

If `meta.tools` is non-empty, render this section *before* the lesson list.

For each tool slug, render a card:

- Same `Card` styling, plus a left border 3px `--color-accent`.
- Layout: horizontal flex.
  - Left: 48px square `bg-[var(--color-accent-soft)]`, rounded 12px, Lucide icon (`Search` for product-research-form, `Megaphone` for ppc-setup-form, `Library` for useful-links). Icon color `--color-accent`.
  - Center: tool name (heading font, weight 500), tool description below in `--color-ink-muted`.
  - Right: ghost button `Open tool →`.

Tool metadata (hardcode in `lib/tools.ts` or directly in the component):

```typescript
{
  'product-research-form': {
    name: 'Product Research Form',
    description: 'Live database. Log every product candidate as you go through this module.',
    icon: 'Search',
    href: '/tools/product-research'
  },
  'ppc-setup-form': {
    name: 'PPC Set-up Form',
    description: 'Plan every campaign here before you launch in Seller Central.',
    icon: 'Megaphone',
    href: '/tools/ppc-setup'
  }
}
```

### Lesson list

Section heading in mono small caps: `IN THIS MODULE`. 24px gap below header.

A vertical list of `LessonListItem` rows.

### `LessonListItem` component

- Renders as a `Card`-styled `<Link>` to `/modules/[slug]/lessons/[lessonId]`.
- Height: 72px.
- Internal padding: 16px 24px.
- Layout: horizontal flex, gap 16px:
  1. **Status indicator** - 24px circle on the left:
     - Complete: `--color-success-soft` background, `--color-success` `Check` icon (14px).
     - In-progress: `--color-accent-soft` background, `--color-accent` `Circle` icon (filled).
     - Not started: `--color-line` background, no icon.
  2. **Center (flex-grow):**
     - Top: lesson number + title - `1.1 · What FBA Actually Is`. Lesson number in mono caps, title in body weight 500.
     - Bottom: mono small caps `[X] MIN`.
  3. **Right:** `ChevronRight` icon, 16px, `--color-ink-subtle`.
- Hover: row background `--color-surface-alt`, border darkens.
- Currently active lesson (the one with `in-progress` status): subtle `--color-accent-soft` background and `--color-accent` left border (3px wide).

### Bottom of page

A "Continue" CTA card if there's an in-progress or first-not-started lesson:

- Full-width orange button: `Continue with Lesson [N.N] →` (label in white).
- If module is `complete`: instead show a quiet ghost button `Review module` and below it, a primary CTA `Next module: [Title] →` linking to the next module's overview.

---

## Step 5: Lesson View (`/modules/[slug]/lessons/[lessonId]`)

This is the most important screen of the entire course. Students will spend hours here. Build it carefully.

### Layout

- AppShell with sidebar (left, 240px, persistent).
- Main content area: a two-column layout on desktop ≥1024px, single-column below.
  - **Content column:** max-width 720px, left-aligned.
  - **Right rail (sticky, only visible ≥1024px):** 280px wide, 32px gap from content column.
- Outer padding: 40px desktop / 16px mobile.

### `LessonHeader` component (top of content column)

- Breadcrumb in mono small caps: `MODULES / MODULE 04 - LISTING CREATION / LESSON 4.2`. Each segment is a link except the last.
- 16px gap.
- Lesson title: heading font, weight 500, 2.25rem desktop / 1.5rem mobile. Pulled from `lesson.title`.
- 8px gap.
- Meta strip in mono small caps `--color-ink-subtle`: `[X] MIN · LESSON [N] OF [M] · LAST UPDATED OCT 2025`. (Hardcode the date for now; can be derived from file mtime later.)

### `VideoPlayer` component

A 16:9 placeholder video container, **the single most important element on this page after the title.**

- Width: 100% of content column. Max-width: 720px (already capped by column width).
- Aspect ratio: 16:9 (use `aspect-video` Tailwind class).
- Rounded 12px, border 1px `--color-line`.
- Background: a subtle gradient - `bg-gradient-to-br from-[var(--color-surface-alt)] to-[var(--color-surface-deep)]`.
- Centered play button overlay:
  - 64px circle, `bg-white`, `border border-[var(--color-line)]`, soft shadow.
  - Lucide `Play` icon, 24px, `--color-ink`, slightly offset right for visual balance.
  - Hover: scale 1.06, transition 200ms.
  - Click: triggers `onPlay` (no-op for now; later wires to actual video).
- Bottom-left overlay pill: `[VIDEO PLACEHOLDER - UPLOAD ASSET]` in mono small caps, white text on `bg-black/60` rounded pill, 4px 12px padding. Position: `absolute bottom-3 left-3`.
- Below the player, a thin metadata row:
  - Left: mono small caps `[X] MIN`
  - Right: ghost button `↓ Download transcript` (placeholder action)

This whole component takes a `videoSlug` prop (e.g., `module-4-lesson-2`) so when the real videos exist, you can swap in a `<source src={...}>` based on the slug.

### `LessonContent` component (the rendered markdown)

This is where `react-markdown` does most of the work.

```tsx
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeSlug]}
  components={{
    h2: CustomH2,
    h3: CustomH3,
    blockquote: CustomBlockquote,
    table: CustomTable,
    li: CustomListItem,        // detects [ ] checkboxes
    img: CustomImage,           // handles image placeholders
    a: CustomLink,              // styles links
    code: CustomCode,
    pre: CustomCodeBlock,
  }}
>
  {lesson.content}
</ReactMarkdown>
```

**Custom component rules:**

1. **`CustomBlockquote`** - Detects callout type by reading the first line:
   - Starts with `💡 **Jakub's note**` → render as `<Callout type="note" />`
   - Starts with `⚠️ **Watch out**` → render as `<Callout type="warning" />`
   - Starts with `🛠` → render as `<Callout type="tool" />`
   - Otherwise → render as a default styled blockquote (italic, left border 2px `--color-line`, padding-left 16px).

2. **`<Callout>` component:**
   - **Note (💡):** Left border 3px `--color-accent`, background `--color-accent-soft`, padding 16px 20px, rounded 12px (right side only). Body text `--color-ink`.
   - **Warning (⚠️):** Left border 3px `#D97706` (a warm amber, not orange). Background `#FFF8EC`. Otherwise same as note.
   - **Tool (🛠):** Same as note, plus a small `Open tool →` ghost button if the callout text mentions a tool name. Detect via simple regex match.
   - All callouts strip the leading emoji + bold marker line and keep only the body content.

3. **`CustomImage`** - Image placeholders.
   - The .md files don't currently have image placeholders, but they will (you'll add them - see Step 6).
   - When an `<img>` tag has `src` starting with `placeholder:` (e.g., `![Screenshot of Seller Central](placeholder:m4l2-screenshot)`), render a styled placeholder instead of fetching:
     - 16:9 box, `bg-[var(--color-surface-alt)]` with a dashed `--color-line` border (2px), rounded 12px.
     - Centered: a Lucide `ImageIcon` (32px, `--color-ink-subtle`), the alt text below it (mono small caps), and below that `[IMAGE PLACEHOLDER - UPLOAD: {slug}]` in even smaller mono caps.
   - Real images (any other src): render normally with `border 1px var(--color-line)`, rounded 12px.

4. **`CustomListItem`** - Detect checklist syntax:
   - GFM produces `<li>` with a `<input type="checkbox" />` child for `- [ ]` and `- [x]`.
   - Replace with a `<ChecklistItem>` component: a 20px square checkbox styled to match the design (rounded 4px, `--color-line` border, `--color-accent` fill when checked, `Check` icon when checked). Clickable; toggles local state. Persistence is out-of-scope for now.

5. **`CustomTable`** - Style tables cleanly:
   - `border-collapse: collapse` on the table.
   - Header row: `bg-[var(--color-surface-alt)]`, mono small caps text, `--color-ink-subtle`.
   - Cells: padding 12px 16px, border-bottom 1px `--color-line-soft`.
   - First column slightly bolder.

6. **`CustomLink`** - Internal links (starting with `/` or `#`) get `--color-accent` color and underline on hover. External links get an external arrow icon (`ArrowUpRight`, 12px) appended.

7. **`CustomH2`, `CustomH3`** - Spacing only. H2 gets 48px top margin, 16px bottom. H3 gets 32px top, 8px bottom. Both keep heading font, weight 500.

### `LessonSidebar` component (right rail, sticky)

Width 280px. Uses `position: sticky; top: 24px`. Hides below 1024px.

- **Top section:** Mono small caps heading `IN THIS MODULE`. 16px gap.
- **Lesson list:** Reuses the `LessonListItem` styling but in a more compact form (no description, just status icon + lesson number + title in one line). The current lesson is highlighted with `--color-accent-soft` background and `--color-accent` left border.
- **Up next card:** Below the list, a small `Card`. Mono small caps `UP NEXT`, then the next lesson title (heading font, weight 500), then duration in mono. Click → next lesson.
- **Need help card:** Below up-next. `Card` with: heading `Stuck on this lesson?`, body `Open a thread with Jakub.`, ghost button `Ask Jakub →` (links to `/mentorship`).

### `LessonNav` component (bottom of content column)

Always rendered at the bottom of the content column, after the markdown content. Three-zone horizontal layout:

- **Left:** Ghost button `← Previous lesson`, with the previous lesson title below in mono caps `--color-ink-subtle`. Disabled state if no previous lesson (e.g., first lesson of Module 1).
- **Center:** Primary orange button `Mark complete & continue →`. The single most prominent CTA on this whole screen. Full-width on mobile. Click handler: marks the current lesson `complete` in local state, then routes to the next lesson. If this is the last lesson of the last module, label changes to `Mark complete · Finish course →`.
- **Right:** Ghost button `Next lesson →`, with the next lesson title below in mono caps. Disabled if no next lesson.

On mobile (≤768px): stacks. Mark complete button on top, then a horizontal pair of prev/next ghost buttons below.

### Module-end behavior

If the lesson is the last in a module:
- The center button changes to `Mark complete & start Module [N+1] →` (still orange, still primary).
- The right button changes to `Next module: [Title] →`.

If the lesson is the very last lesson of Module 9:
- The center button changes to `Mark complete · Finish course 🎉` (keep the emoji here - it's the only place in the whole app it appears, and it's earned).
- A subtle confetti or celebratory animation on click is acceptable but optional. Don't go crazy - a 600ms fade-out of the lesson content with a swap-in of "You did it." would be in keeping.

---

## Step 6: Image and video asset placeholders

Add these asset slots throughout the .md files (or document where they should go) so the lesson view renders proper placeholders:

### Image placeholders

Use this markdown syntax:

```markdown
![Description of the image for alt text](placeholder:unique-asset-slug)
```

- `unique-asset-slug` is a kebab-case identifier you'll use when uploading the real asset later. Format: `m{module}l{lesson}-{description}`. Examples:
  - `m1l1-fba-flow-diagram`
  - `m4l2-good-bullets-example`
  - `m5l1-shipment-plan-screenshot`
  - `m7l3-ppc-structure-diagram`

- The custom image renderer detects the `placeholder:` prefix and renders a styled placeholder (per Step 5).

### Video placeholders

Each lesson has exactly **one main video at the top**. The `VideoPlayer` component handles this - no markdown needed. The slug is derived from the route: `module-{slug}-lesson-{lessonId}`.

If a lesson has additional inline videos (rare, optional), use this markdown:

```markdown
![Video: short demo of supplier negotiation](video:m3l3-supplier-call-demo)
```

The custom image renderer detects the `video:` prefix and renders a video placeholder (16:9, with a play button and the slug shown).

### Where to add placeholders to each module

Add at minimum these placeholders to each module:

- **Module 1:** 1 diagram in 1.2 (money flow), 1 chart in 1.3 (FBA vs FBM)
- **Module 2:** 1 screenshot in 2.2 (Seller Central signup), 1 diagram in 2.3 (verification flow)
- **Module 3:** 1 photo in 3.2 (shelf-shop sourcing), 2 worked example images in 3.3 (bundles), 1 screenshot in 3.5 (Product Research Form)
- **Module 4:** 1 image per lesson minimum - anatomy diagram (4.1), good vs bad title example (4.2), bullet template visual (4.3), description example (4.4), photography setup (4.5)
- **Module 5:** 1 screenshot per lesson - shipment plan (5.1), label printing (5.2), box packing (5.3), carrier booking (5.4)
- **Module 6:** Logo examples (6.3), trademark search screenshot (6.4), Brand Registry screenshot (6.5)
- **Module 7:** Algorithm diagram (7.1), Helium 10 screenshot (7.2), PPC structure diagram (7.3), A+ Content example (7.4)
- **Module 8:** One screenshot per platform (eBay, TikTok Shop, Shopify)
- **Module 9:** Weekly checklist visual (9.2), Account Health dashboard screenshot (9.3)

**Don't add the placeholders to the .md files yourself in this build pass.** Instead, do this:

1. Build the renderer to *handle* placeholders correctly.
2. After the UI is working, generate a separate `ASSETS_TODO.md` file in `content/modules/` listing every placeholder slug, where it should go, and what it should depict. This is Jakub's shooting/sourcing list.

---

## Step 7: Sidebar route highlighting

Update `components/layout/Sidebar.tsx` so the `Modules` nav item is in its active state for any route under `/modules`. Use `usePathname()` and check `pathname.startsWith('/modules')`.

Don't change anything else about the sidebar.

---

## Step 8: Build order & checkpoints

Build in this order. After each step, verify before continuing.

1. **`lib/modules.ts`** - Build and test by logging the output of `getAllModules()`. Verify all 9 modules parse, lessons split correctly, frontmatter loads.
2. **`/modules` index page** - Verify locking logic, phase divider position (above Module 6), tool badges on Modules 3 and 7.
3. **`/modules/[slug]` overview page** - Pick one module (Module 4 has the most lessons in mock data) and verify the lesson list renders with correct status icons.
4. **`/modules/[slug]/lessons/[lessonId]` lesson view** - Build the static frame first (header, video player placeholder, sidebar). Then add the markdown renderer with all custom components.
5. **Test every callout type** by navigating to lessons that contain each (`💡` notes are everywhere; `⚠️` warnings exist in Modules 1, 3, 5, etc.; `🛠` callouts in Module 3.5 and Module 7.3).
6. **Test mobile** - sidebar slide-in, single-column lesson layout, mark-complete button stacking.
7. **Update sidebar active state** for `/modules*` routes.
8. **Generate `ASSETS_TODO.md`** listing every video and image slot Jakub needs to fill.

---

## Accessibility checklist

- All interactive elements use semantic HTML (`<button>`, `<a>`, `<input type="checkbox">`).
- Focus states visible everywhere: 2px `--color-accent` ring with 2px offset.
- The video player is keyboard-operable (space/enter triggers play).
- The mark-complete button is the natural tab destination after the user has scrolled past the content.
- Headings within lessons follow proper hierarchy (h1 = lesson title, h2/h3 from markdown, never skipping levels).
- Tables include scope attributes via `react-markdown`'s default behavior - verify.
- Callout backgrounds maintain WCAG AA contrast - measure if uncertain.
- All animations honor `prefers-reduced-motion`.
- Color is never the only signal: lesson status uses an icon + a label, not just a colored circle.

---

## What NOT to do

- Don't introduce new design tokens. Use what's already in `globals.css`.
- Don't use orange for any element other than: primary CTA, active progress bar, active sidebar accent, active lesson indicator, the `--color-accent` callout left border, the `Continue` CTAs.
- Don't add page transition animations between lesson navigations - the dashboard is calm; the course is calmer.
- Don't autoplay any video, ever, even when the real videos exist.
- Don't reproduce the modules' `[← Back to module overview](#module-overview)` markdown navigation links visibly in the rendered output. Strip them at parse time. The right-rail sidebar and bottom `LessonNav` replace them. (Hint: regex out lines that match `^\[← .* · .* · .* →\]\(.*\)$` after extracting lesson content.)
- Don't add a "comments" or "discussion" section per lesson. Mentorship is for that - keep the lesson surface clean.
- Don't use `<form>` elements for the mark-complete action. It's a button + state update.

---

## Output expectations

When you're done, run a final pass and tell me:

1. **What works:** Confirm each of the 8 build steps is complete.
2. **What you couldn't do:** Anything in the spec that conflicted with the existing project, or that needed a judgment call.
3. **The dev server command** to run it.
4. **A list of every file you created or modified.**
5. **The contents of `ASSETS_TODO.md`** so Jakub knows exactly what to shoot/source.

Now build it. Same restraint as the dashboard. The student should land on a lesson and feel like the app simply got out of their way.
