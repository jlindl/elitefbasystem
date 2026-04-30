# Claude Code Build Prompt: PoundMart FBA Member Dashboard

> **Read this entire file before you start writing code.** It defines the scope, the design system, the component structure, and the build order. Stick to the spec. Ask me before deviating.

---

## What you're building

A single, focused **member dashboard** screen for **PoundMart FBA** — an Amazon FBA coaching course run by Jakub. This is the page a student sees the moment they log in. Just this one screen. Not the marketing site, not the lesson view, not the modules index — those are separate builds.

The dashboard's job is simple: tell the student where they are in the course, what to do next, and give them quick access to their tools, their mentor, and their team. Clean. Calm. Navigable.

---

## Project setup

Create a new Next.js 15 project (App Router, TypeScript, Tailwind v4) named `poundmart-dashboard`. Use the following structure:

```
poundmart-dashboard/
├── app/
│   ├── layout.tsx              # Root layout with fonts + global styles
│   ├── page.tsx                # Redirects to /dashboard
│   ├── dashboard/
│   │   └── page.tsx            # The single dashboard screen
│   └── globals.css             # Tailwind + design tokens
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Persistent left sidebar
│   │   └── AppShell.tsx        # Wraps sidebar + main content
│   ├── dashboard/
│   │   ├── WelcomeCard.tsx     # The big top welcome strip
│   │   ├── UpNextCard.tsx      # Next 3 lessons
│   │   ├── MentorshipCard.tsx  # Next call + DM Jakub
│   │   ├── ToolsRow.tsx        # 3 tool cards
│   │   └── TeamPanel.tsx       # Community moments
│   └── ui/
│       ├── Card.tsx            # Reusable card primitive
│       ├── ProgressBar.tsx     # Thin horizontal bar
│       └── StatusPill.tsx      # Reusable pill (LOCKED / IN PROGRESS / COMPLETE)
├── lib/
│   └── mockData.ts             # All hardcoded student/course data
└── package.json
```

Install these dependencies:
- `next@latest react@latest react-dom@latest`
- `tailwindcss@latest @tailwindcss/postcss postcss`
- `lucide-react` (for icons)
- `clsx` (for conditional classnames)

Use `next/font` to load Google Fonts: `Inter Tight` (headings), `Inter` (body), `JetBrains Mono` (labels/metadata).

---

## Design system (set this up first, before any components)

In `app/globals.css`, define these CSS custom properties and use them via Tailwind's arbitrary value syntax (e.g., `bg-[var(--color-bg)]`) OR extend the Tailwind config. Either approach works; pick whichever you prefer and stay consistent.

```css
:root {
  /* Surfaces */
  --color-bg: #FAFAF7;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F4F2EC;
  --color-surface-deep: #EFEBE2;

  /* Ink (text) */
  --color-ink: #0A0A0A;
  --color-ink-muted: #4A4A48;
  --color-ink-subtle: #8A8A86;

  /* Borders */
  --color-line: #E8E5DD;
  --color-line-soft: #F0EDE5;

  /* Accent — orange, used VERY sparingly */
  --color-accent: #FF6B1A;
  --color-accent-deep: #E55400;
  --color-accent-soft: #FFF1E8;

  /* Success — only for completed states */
  --color-success: #1F7A4D;
  --color-success-soft: #E8F2EC;
}
```

**Strict orange usage rules:**
- The "Continue where you left off" primary CTA — that's it for filled buttons.
- The current-progress bar fill.
- The active sidebar item's left border accent (2px wide).
- Small accents in user avatar / initials chip.
- **Nowhere else.** No orange icons sprinkled across cards. No orange section headers. The dashboard should feel like off-white + black + white space, with one or two careful drops of orange where the eye should land.

**Strict green usage:**
- Completed-state pills only (`COMPLETE` with checkmark).
- Never as a CTA, never as a background block.

### Typography rules

| Use | Font | Size | Weight |
|---|---|---|---|
| Page title (e.g., "Hi, Sarah.") | Inter Tight | 1.875rem / 1.5rem mobile | 500 |
| Card title | Inter Tight | 1rem | 500 |
| Body text | Inter | 0.9375rem (15px) | 400 |
| Labels, metadata, status pills | JetBrains Mono | 0.75rem | 400, uppercase, letter-spacing 0.08em |
| Stat numbers | Inter Tight | 2rem | 500 |

### Spacing & layout

- Sidebar: fixed 240px wide on desktop, slides in via hamburger on mobile.
- Main content: max-width 1100px, left-aligned in its column. Outer padding: 40px desktop / 16px mobile.
- Card border-radius: 16px.
- Card internal padding: 24px desktop / 20px mobile.
- Card border: `1px solid var(--color-line)`.
- Spacing between cards: 16px in tight clusters, 32px between distinct sections.

### Motion

- Hover transitions: 150ms ease.
- Card hover: border color shifts to `--color-ink-subtle`. No transform, no shadow change.
- First-load reveal: cards fade-in from 8px below their final position, 200ms duration, 60ms stagger. Once. Not on re-renders.
- Honor `prefers-reduced-motion` everywhere — disable transforms, keep opacity.

---

## Mock data shape

In `lib/mockData.ts`, export this. Use TypeScript types. The dashboard reads from here only — no API calls.

```typescript
export const student = {
  firstName: "Sarah",
  fullName: "Sarah Mitchell",
  initials: "SM",
  plan: "Mentorship Member",
};

export const progress = {
  modulesCompleted: 4,
  modulesTotal: 9,
  percentComplete: 44,
  currentModule: 4,
  currentLesson: 2,
};

export const upNext = [
  {
    moduleNumber: 4,
    lessonNumber: 2,
    moduleTitle: "Listing Creation",
    lessonTitle: "Writing your bullet points",
    durationMinutes: 8,
    icon: "FileText",
  },
  {
    moduleNumber: 4,
    lessonNumber: 3,
    moduleTitle: "Listing Creation",
    lessonTitle: "Photography that sells",
    durationMinutes: 12,
    icon: "FileText",
  },
  {
    moduleNumber: 4,
    lessonNumber: 4,
    moduleTitle: "Listing Creation",
    lessonTitle: "Pricing for the Buy Box",
    durationMinutes: 6,
    icon: "FileText",
  },
];

export const mentorship = {
  nextCall: {
    date: "Thursday, May 8",
    time: "6:00 PM GMT",
    zoomLink: "#",
  },
  lastMessageFromJakub: "Sent through your draft listing. Will review by Wed 👍",
  lastMessageTimestamp: "2h ago",
};

export const tools = [
  {
    id: "product-research",
    name: "Product Research Form",
    description: "Log and review every product you're considering. Live database.",
    icon: "Search",
    statusLine: "12 PRODUCTS LOGGED · 3 IN REVIEW",
  },
  {
    id: "ppc-setup",
    name: "PPC Set-up Form",
    description: "Plan and track your campaigns before they go live.",
    icon: "Megaphone",
    statusLine: "2 CAMPAIGNS · LAST UPDATED 3 DAYS AGO",
  },
  {
    id: "useful-links",
    name: "Useful Links",
    description: "Curated tools, suppliers and resources Jakub actually uses.",
    icon: "Library",
    statusLine: "27 RESOURCES · UPDATED WEEKLY",
  },
];

export const teamMoments = [
  {
    type: "win",
    name: "Sarah K.",
    initials: "SK",
    headline: "First sale this week 🎉",
    quote: "Sourced bundle, listed Tuesday, sold Friday. Surreal.",
    timestamp: "1d ago",
  },
  {
    type: "question",
    name: "James R.",
    initials: "JR",
    headline: "James R. asked:",
    quote: "Has anyone tried sourcing from a B&M wholesaler in the Midlands?",
    timestamp: "2h ago",
    replies: 4,
  },
  {
    type: "milestone",
    name: "Priya M.",
    initials: "PM",
    headline: "Hit £3K week 💪",
    quote: "Three SKUs, all bundles, no PPC yet. Wild.",
    timestamp: "3d ago",
  },
];
```

---

## Component-by-component build order

Build in this order. Each component is small and focused. Don't try to build the whole thing in one shot — get each piece right.

### Step 1: Set up the project shell

1. Initialize Next.js, install deps, configure Tailwind v4 + fonts.
2. Build `app/layout.tsx` — apply fonts, set body to `bg-[var(--color-bg)] text-[var(--color-ink)]`.
3. Build `app/page.tsx` — simple redirect to `/dashboard`.
4. Define design tokens in `globals.css`.
5. Verify the dev server runs and the background is the warm off-white.

### Step 2: Build the AppShell + Sidebar

`components/layout/AppShell.tsx` — wraps the sidebar and the main content. Flex layout: sidebar left, main content right.

`components/layout/Sidebar.tsx` — the persistent left navigation. Build this carefully:

**Top:** `PoundMart.` wordmark. Heading font, weight 600. A small orange dot after the period (not the period itself — an extra `<span>` styled as an orange dot, 6px diameter). 24px padding around the wordmark area. Hairline divider below.

**Primary nav** (each item: 36px tall, 14px text, Lucide icon left at 18px, label right):
- Dashboard (icon: `LayoutGrid`) — **active state**
- Modules (icon: `BookOpen`)
- My Tools (icon: `Wrench`)
- Mentorship (icon: `MessageCircle`)
- The Team (icon: `Users`)
- Resources (icon: `Library`)

Active item styling: `bg-[var(--color-surface-alt)]`, text in `--color-ink`, plus a 2px left border in `--color-accent` that sits flush against the left edge of the sidebar (negative left margin trick or use `border-l-2` with a wrapper). Inactive items: text in `--color-ink-subtle`, hover lifts to `--color-ink`.

**Hairline divider.**

**Secondary nav** (smaller, all in `--color-ink-subtle`):
- Account
- Help

**Bottom (push to bottom with `mt-auto`):** User identity card.
- 40px circular avatar showing initials, `bg-[var(--color-accent-soft)]` background, `text-[var(--color-accent)]` text.
- Name + plan tag below in mono small caps reading `MENTORSHIP MEMBER`.
- Small `ChevronUp` icon for menu (non-functional for now).
- Hairline divider above the user card.

For the only "active" route (Dashboard), use a hardcoded `pathname === '/dashboard'` check via `usePathname()`. The other nav items are non-functional links for now — `href="#"`.

**Mobile behavior:** Below 768px, sidebar hides off-screen by default. Add a hamburger button that toggles a `translateX` slide-in. Add a backdrop overlay when open. Keep this simple — useState in the AppShell.

### Step 3: Build the reusable UI primitives

`components/ui/Card.tsx` — a basic white card. Props: `children`, `className?`. Default: `bg-[var(--color-surface)] border border-[var(--color-line)] rounded-2xl p-6`.

`components/ui/ProgressBar.tsx` — a thin horizontal progress bar. Props: `percent`, `className?`. 4px tall, rounded, `--color-line` track, `--color-accent` fill, fill animates from 0 to target on first mount over 600ms.

`components/ui/StatusPill.tsx` — a small uppercase-mono pill. Props: `status: 'locked' | 'start' | 'in-progress' | 'complete'`. Each status has its own background + text combo:
- locked: `--color-surface-alt` bg, `--color-ink-subtle` text, label `LOCKED`
- start: `--color-surface-alt` bg, `--color-ink` text, label `START`
- in-progress: `--color-accent-soft` bg, `--color-accent` text, label `IN PROGRESS`
- complete: `--color-success-soft` bg, `--color-success` text, with a Lucide `Check` icon (14px) on the left, label `COMPLETE`

### Step 4: Build the dashboard sections

Build each section as its own component. Each uses the `Card` primitive. Stack them vertically in `app/dashboard/page.tsx` with `gap-8` between major sections, `gap-4` within tight clusters.

#### `components/dashboard/WelcomeCard.tsx`

A single horizontal card spanning the full content width.

**Desktop layout:** Two columns inside, 60% / 40% split, vertically centered.

**Left column:**
- Tiny mono label: `WELCOME BACK` in `--color-ink-subtle`.
- Heading: `Hi, {firstName}.` — 1.875rem, weight 500.
- Context line: `You're 4 modules in. Let's keep building.` — body color `--color-ink-muted`.
- Below context, a horizontal cluster: `<ProgressBar percent={44} />` (240px wide) sitting next to a mono caps label `4 / 9 MODULES · 44% COMPLETE`. 12px gap between bar and label. Vertical alignment center.

**Right column:**
- A primary CTA button — full-width-of-this-column.
- Background: `--color-accent`. Text: white. Padding: 16px 24px. Rounded 12px. Font weight 500.
- Label: `Continue where you left off →` (the arrow can be a Lucide `ArrowRight` icon at 16px).
- Below the button, a small line in `--color-ink-subtle`, mono small caps: `MODULE 4 · LESSON 2 — WRITING YOUR BULLET POINTS`.
- Hover: background shifts to `--color-accent-deep`, transition 150ms.

**Mobile layout:** Stack vertically. Heading first, progress next, CTA full-width at the bottom.

#### `components/dashboard/UpNextCard.tsx`

A `Card` containing a list of the next 3 lessons.

- Card title at the top: `Up next` (1rem, weight 500).
- Below, a vertical list of 3 lesson rows. Each row:
  - 56px tall, full-width, clickable (just `<button>` for now).
  - Three-column flex: icon on left, content in the middle (flex-grow), arrow icon on right.
  - **Icon:** 32px square, `bg-[var(--color-surface-alt)]`, rounded 8px, Lucide icon centered (`FileText`, 16px, `--color-ink`).
  - **Content:** Lesson title in body weight 500. Below it, mono small caps: `MODULE {N} · LESSON {N} · {duration} MIN`.
  - **Right:** `ChevronRight` icon, 16px, `--color-ink-subtle`.
  - Rows separated by `border-b border-[var(--color-line-soft)]` except last row.
  - Hover: row background shifts to `--color-surface-alt`.
- Below the list, a small ghost link in `--color-ink-muted`, hover to `--color-ink`: `See all modules →`. 16px top margin.

#### `components/dashboard/MentorshipCard.tsx`

A `Card` with two stacked sections separated by a hairline divider.

**Top half:**
- Card title: `Your mentorship with Jakub`.
- Subtitle below in mono small caps: `NEXT 1-TO-1 CALL`.
- Date/time line, large: `Thursday, May 8 · 6:00 PM GMT`. Heading font, 1.125rem, weight 500.
- Below, two ghost buttons side by side: `Reschedule` and `Add to calendar`. Ghost button = transparent background, 1px `--color-line` border, `--color-ink` text, 8px 16px padding, rounded 8px, hover background `--color-surface-alt`.

**Hairline divider** (`border-t border-[var(--color-line-soft)]`, 24px vertical margin around it).

**Bottom half:**
- Mono small caps subtitle: `DIRECT MESSAGE`.
- A small message preview block: italic muted text — `"Last message from Jakub: Sent through your draft listing. Will review by Wed 👍"`. Max 2 lines, ellipsize after.
- Below, a primary orange ghost button: orange text (`--color-accent`), no fill, `Open chat →`. Hover shifts text to `--color-accent-deep`.

#### Two-column row container

In `app/dashboard/page.tsx`, wrap `UpNextCard` and `MentorshipCard` in a 2-column grid (desktop) that stacks on mobile.

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <UpNextCard />
  <MentorshipCard />
</div>
```

Make sure both cards are equal height (`h-full` on the cards, `items-stretch` on the grid).

#### `components/dashboard/ToolsRow.tsx`

A section with a header and 3 tool cards.

**Section header:**
- Heading: `Your tools` (1.25rem, weight 500).
- Subtitle in mono small caps: `OPERATIONAL · USE WHILE YOU LEARN`.
- 16px gap between heading and subtitle. 24px gap between this header and the cards below.

**Three tool cards in a row** (1 column mobile, 3 column desktop, gap 16px). Each tool card uses the `Card` primitive:

- **Top:** Tool icon — 32px square, `bg-[var(--color-surface-alt)]`, rounded 8px, Lucide icon (24px), `--color-ink` color.
- 12px gap.
- **Tool name:** body weight 500, 1rem.
- **Description:** one sentence, `--color-ink-muted`, 0.875rem.
- 16px gap.
- **Status line:** mono small caps, `--color-ink-subtle`, 0.75rem.
- 16px gap.
- **Bottom button:** ghost button, full-width, label `Open tool →`. Same styling as the `Reschedule` button above.

#### `components/dashboard/TeamPanel.tsx`

A wider, shorter card. Full content width.

**Top:**
- Card title: `The team this week`.
- Mono small caps subtitle: `LIVE FROM THE COMMUNITY`.

**Body:** Three community moment cards in a row (1 column mobile, 3 column desktop, gap 16px). Each moment card:
- Inset card: `bg-[var(--color-surface-alt)]`, no border, rounded 12px, padding 16px.
- Top row: 32px circular avatar (initials, `--color-accent-soft` bg, `--color-accent` text) + name + headline. Name in body weight 500, 0.9375rem. Headline can include emoji.
- Below: a single italic quote line in `--color-ink-muted`, 0.875rem, max 2 lines.
- Bottom: timestamp in mono small caps `--color-ink-subtle`. For the question moment, also show `4 REPLIES`.

**Below the moment cards:** a small ghost link, left-aligned: `Open The Team →`. 16px top margin.

#### Footer strip

At the bottom of `app/dashboard/page.tsx`, after all sections:

```tsx
<div className="text-center mt-16 mb-8">
  <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-ink-subtle)]">
    PoundMart FBA · Mentorship Member · You're in good hands
  </p>
</div>
```

### Step 5: Assemble the dashboard page

`app/dashboard/page.tsx` — wraps everything in `AppShell`, then renders sections in order:

```tsx
<AppShell>
  <div className="max-w-[1100px] mx-auto px-10 md:px-10 py-10 space-y-8">
    <WelcomeCard />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UpNextCard />
      <MentorshipCard />
    </div>
    <ToolsRow />
    <TeamPanel />
    <FooterStrip />
  </div>
</AppShell>
```

(Adjust outer padding for mobile — `px-4 md:px-10`.)

---

## Accessibility checklist (verify before considering it done)

- All buttons are real `<button>` elements (or `<a>` if they navigate).
- All interactive elements have a visible focus state: `focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:outline-none`.
- The sidebar uses `<nav>` and `<ul>` / `<li>`.
- The main content uses `<main>`.
- All progress states have text equivalents (mono labels) — never communicated through color alone.
- WCAG AA contrast: ink on bg ≥ 4.5:1 (it is — verify with a tool).
- `prefers-reduced-motion` honored — wrap all transforms in a media query that disables them when the user has reduced motion enabled.

---

## What NOT to do

- Don't add a hero banner, marketing testimonials, or "join the community!" CTAs. The student is already in.
- Don't use orange as a decorative color — only for the primary CTA, the progress fill, the active sidebar accent, and the user avatar accent.
- Don't add icons to every card just to fill space. The dashboard is intentionally restrained.
- Don't add scroll-linked animations or parallax. This is a workspace, not a marketing page.
- Don't make the cards lift or scale on hover. Just a subtle border color shift.
- Don't introduce additional fonts, weights, or sizes beyond the spec.
- Don't use `<div>` for buttons or `<a>` without href.

---

## Build checkpoints

After each step, pause and verify:

1. **After Step 1:** Project boots, fonts load, background is warm off-white.
2. **After Step 2:** Sidebar renders, active state on `Dashboard` works, mobile hamburger toggles.
3. **After Step 3:** All three primitives render in isolation (test on a temporary `/test` route if useful).
4. **After Step 4:** Each dashboard section renders correctly, in isolation.
5. **After Step 5:** Full dashboard composed, responsive, accessible. Test at 375px, 768px, 1280px, 1920px.

---

## Output expectations

When you're done, run a final pass and tell me:

1. Anything you couldn't implement as specified, and why.
2. Any places where the design felt off and you made a judgment call.
3. The exact dev server command to run it (`pnpm dev` / `npm run dev` / etc.).
4. A list of every component file you created.

Now build. Start with Step 1 and work through in order. Don't skip ahead.