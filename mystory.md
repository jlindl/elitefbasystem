# Master Prompt: Jakub's "My Story" Page (Cinematic Scroll Journey)

> **How to use this prompt:** Paste this entire document into Claude (Sonnet 4.6 or Opus 4.7), v0, Lovable, Bolt, or Cursor. It's optimized for a single-shot generation. This page is the companion to the homepage — same visual system, same brand, but a fundamentally different feeling: this one is a film, not a sales page.

---

## ROLE

You are a world-class front-end designer, creative developer, and visual storyteller. You design pages that feel like films — not in a flashy way, but in the way Apple's product pages and the New York Times' best long-form pieces unfold: each scroll feels intentional, each beat lands, the pace breathes. You understand that on a "story" page, restraint is the whole game. Less type. More space. Slower reveals. Bigger numbers. Quiet moments.

You are building Jakub's personal story page. This is the second-most-important page of his FBA coaching site, sitting next to the homepage. It's where prospects fall in love with the person — not the product.

---

## THE BRIEF

Build a single, scroll-driven, cinematic story page that takes the visitor through Jakub's life journey: from struggling at college, into the corporate world at AJ Bell, through the Amazon FBA awakening, the first sale, the painful crossroads, the leap, and the freedom on the other side.

This is **not a sales page.** No pricing. No CTAs every section. No urgency. The only goal is emotional connection. There's a single, soft CTA at the very end. That's it.

The page must feel like a slow exhale. Cinematic. Personal. Real.

---

## STORYTELLING PRINCIPLES (read first, refer back to constantly)

1. **The page is a narrative arc, not a list.** Struggle → routine → spark → first proof → tension → leap → freedom. Each section should feel like a chapter, with its own visual identity inside the same brand system.
2. **Tone shifts visually as the story progresses.** The early chapters (struggle, corporate) lean darker, more muted, heavier on grayscale. As the story turns toward freedom, the page literally lightens — more white space, warmer tones, the orange accent blooms. By the end, the page should feel like sunrise.
3. **Numbers are sacred.** When a number appears (£100K, 3–5K/week, 10 holidays/year), it gets its own moment — large, animated count-up, surrounded by silence.
4. **Quiet beats are powerful.** Some chapters should have almost no copy — just a single sentence, a date, and a generous block of negative space. Don't be afraid of empty.
5. **Scroll IS the storytelling.** Every reveal should feel triggered, not rendered all at once. Use scroll-linked animation aggressively but tastefully — text fading up, images sliding in, the page breathing as you move through it.
6. **First-person, throughout.** This is Jakub's voice. "I struggled." "I worked hard." "I quit." Every word of copy reads like something he'd actually say.
7. **Anti-guru, again.** No rags-to-riches melodrama. No "I was at rock bottom and then I MADE A DECISION." Just real, honest, slightly understated. The story is powerful enough on its own.

---

## VISUAL SYSTEM (inherited from the homepage — keep consistent)

### Color tokens

```css
--color-bg:           #FAFAF7;   /* Off-white page background */
--color-surface:      #FFFFFF;   /* Pure white for cards, elevated surfaces */
--color-surface-alt:  #F4F2EC;   /* Subtle warm gray for alternating sections */
--color-ink-dark:     #1A1A1A;   /* Used for the early "struggle" chapters — slightly heavier than ink */
--color-ink:          #0A0A0A;   /* Near-black for primary text */
--color-ink-muted:    #4A4A48;   /* Body copy, secondary text */
--color-ink-subtle:   #8A8A86;   /* Captions, metadata, labels */
--color-line:         #E8E5DD;   /* Hairline dividers */
--color-accent:       #FF6B1A;   /* Amazon-inspired orange */
--color-accent-deep:  #E55400;   /* Hover state for orange */
--color-accent-soft:  #FFF1E8;   /* 10% orange tint */
```

**Special: section-level tonal shifts.** Use background tone to telegraph emotional state across the page:
- Chapter 1 (College): `--color-surface-alt` (warm gray-cream) — slightly heavier, slightly darker.
- Chapter 2 (Corporate): a near-black section (`--color-ink-dark` background, off-white text) — the corporate corridor moment.
- Chapter 3 (Awakening): back to off-white. Lighter. Air returning.
- Chapter 4 (First Sale): pure white surface with a faint orange wash (`--color-accent-soft` background) — the spark.
- Chapter 5 (Crossroads): back to surface-alt — heavy again. Tension.
- Chapter 6 (The Leap): split section — black top half, off-white bottom half. The page literally crosses a threshold.
- Chapter 7 (Today / Freedom): off-white with a soft orange glow in the corners. Bright. Open.

### Typography (same as homepage)

- **Headings:** `'Inter Tight'`, `'Geist'`, or `'Satoshi'`. Weights 300, 500, 600.
- **Body:** `'Inter'` weight 400. Line height 1.7 (slightly more than homepage — gives the prose room to breathe).
- **Mono accent:** `'JetBrains Mono'` for chapter labels, dates, and metadata.
- **Editorial accent (NEW for this page):** A serif italic for pull quotes only — `'Instrument Serif'` or `'Newsreader'` italic. Used very sparingly. Adds editorial / cinematic weight to a single line per chapter.

**Type scale for this page:**
- Massive display moments (the "freedom" line at the end, big numbers): clamp(4rem, 12vw, 10rem), weight 500, line-height 0.95, tracking -0.04em.
- Chapter title: clamp(2.5rem, 5vw, 4.5rem), weight 500, line-height 1.05.
- Body prose: 1.125rem desktop / 1rem mobile, line-height 1.75. Max-width 60ch.
- Pull quote (serif italic): clamp(1.5rem, 3vw, 2.25rem), line-height 1.4.
- Date / chapter label (mono): 0.75rem, letter-spacing 0.12em, uppercase.

### Motion & animation (more pronounced than homepage)

- **Scroll-triggered reveals are the central mechanic.** Each chapter title fades and translates up over 1.2s with a long ease (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Body paragraphs** reveal in word-by-word or line-by-line fades, staggered ~40ms — like a film subtitle.
- **Chapter transitions** use a soft, full-bleed background-color transition over 800ms when scrolling between chapters with different background tones.
- **Number count-ups** trigger when in viewport — count from 0 to final value over 2 seconds with ease-out.
- **Subtle parallax** on chapter images (max 8% movement, never more — this isn't a Squarespace template).
- **Sticky chapter headers (optional but elegant):** As you scroll into a chapter, the chapter label (`CHAPTER 02 / THE CORPORATE WORLD`) sticks to the top-left of the viewport for the duration of that chapter, then dissolves and is replaced by the next.
- **Always respect `prefers-reduced-motion`.** Disable all transforms and parallax, keep opacity transitions only.

### Imagery treatment

- All imagery is portrait, editorial. Black-and-white or desaturated for the early chapters; full color (warm) returns by Chapter 6.
- Real photo placeholders only — no illustrations, no 3D, no stock photography vibes. Label every placeholder so Jakub knows exactly what to shoot.
- Rounded corners 16px on media containers.
- Soft, single-direction shadow on elevated images.

---

## PAGE STRUCTURE — THE FILM

Build the page as a single vertical scroll, no horizontal sections, no sidebar nav. The only navigation is a minimal sticky bar at the top.

### 0. Sticky navigation (minimal)

- Same as homepage but stripped down.
- Left: `Jakub.` wordmark — clickable, returns home.
- Right: a single ghost link `← Back` (returns to homepage), and a small primary orange CTA `Apply Now` (only appears once the user scrolls past Chapter 5 — so the CTA doesn't intrude on the early emotional chapters).
- Height: 64px. Backdrop blur once scrolled past 80px.

### 1. Opening / cold open

A near-empty viewport. This is the "before the title card" moment of a film.

- Full viewport height (100vh, min-height 700px).
- Centered, vertically and horizontally.
- A single line in mono small caps: `A STORY IN SEVEN CHAPTERS`.
- Below it, after a 600ms delay on page load, a massive headline fades in slowly (1.5s):
  - `How Amazon`
  - `gave me my life back.`
- Set the second line in italic serif (`'Instrument Serif'` or similar) for editorial contrast. The first line in heading sans, weight 500.
- Below the headline, after another 800ms delay: a small line `— Jakub` in mono small caps.
- At the bottom of the viewport, a tiny, slowly pulsing animated indicator: a thin vertical line (1px wide, 32px tall) with a small text label below it `Scroll to begin` in mono small caps. The line gently pulses (opacity 0.4 → 1 → 0.4) over 2.4s.
- Background: `--color-bg`. Add a *very* subtle warm radial gradient bleed in the bottom-center (`radial-gradient(ellipse at 50% 100%, rgba(255,107,26,0.04), transparent 60%)`) — like sunrise just below the horizon. Foreshadowing.

### 2. Chapter 01 — College / The Struggle

**Background:** `--color-surface-alt` (warm gray-cream). Slightly heavier mood.

**Layout:** Asymmetric two-column. Left column (40% width on desktop): chapter metadata + title. Right column (60%): body prose. Stack on mobile.

- Chapter label (mono, small caps, ink-subtle): `CHAPTER 01`
- Chapter subtitle (mono, small caps): `THE STRUGGLE`
- A small date/place line: `[PLACEHOLDER: Year, City]` — to be filled in later.
- Chapter title (heading sans, weight 500, large): `I wasn't the kid with the grades.`
- Body prose (one paragraph, max ~70 words):
  > `College didn't come easy to me. I worked hard — harder than people knew — but the grades I needed for the kind of jobs everyone said I should want? They never quite came. I remember sitting with my results, doing the math on what doors had just closed. Then I went and applied for what I could get.`
- After the prose, a single black-and-white portrait placeholder, 4:5 ratio, rounded 16px. Label: `[IMAGE: Jakub at college, b&w, candid — desk / books / computer]`.
- Subtle reveal: text fades in line by line, image fades in last with a slight delay.

### 3. Chapter 02 — The Corporate World (AJ Bell)

**Background:** `--color-ink-dark` (near-black), text in off-white. The corporate corridor moment. **This is the only "dark" chapter on the page** — its weight is intentional.

**Layout:** Centered single-column, narrower max-width (640px). The whole chapter feels claustrophobic compared to the others.

- Chapter label (mono, small caps, in `--color-accent` orange — first appearance of the brand color, used here as a small flicker of self): `CHAPTER 02`
- Chapter subtitle (mono, small caps, off-white): `THE CORPORATE WORLD`
- Date line: `AJ Bell · [PLACEHOLDER: Year started]`
- Chapter title (large, off-white): `A webchat agent in a tower of suits.`
- Body prose (two short paragraphs):
  > `I got a job as a webchat agent at AJ Bell. It taught me more than I'd realised at the time — how to talk to people, how to handle pressure, how to show up every day even when you didn't want to.`
  >
  > `But I knew, deep down, there had to be more to life than this. I'd always loved travelling. Visiting family. Spending my time how I wanted to — not how someone else's calendar told me to.`
- Below the prose, a horizontal "fact strip" (4 columns on desktop, 2x2 on mobile), each cell separated by hairline orange dividers:
  - `MON–FRI` / `9 to 5`
  - `LUNCH` / `30 mins`
  - `HOLIDAYS` / `25 days/year`
  - `FREEDOM` / `none`
- The strip is small, mono, almost like a status report. The contrast between the black background and the small grey-on-grey copy should feel cold and honest.
- A single image placeholder at the bottom — wide aspect ratio (16:9), heavily desaturated. Label: `[IMAGE: A wide, slightly desaturated shot of an office / commute / corporate setting — NOT Jakub's face. Could be a generic corporate skyline or a long shot from behind of someone walking into a building]`.

### 4. Chapter 03 — The Spark / Discovering Amazon FBA

**Background:** Returns to off-white `--color-bg`. Light returning.

**Layout:** Centered, single column. A breath after the corporate chapter.

- Chapter label: `CHAPTER 03`
- Chapter subtitle: `THE SPARK`
- Date line: `Summer 2025`
- Chapter title (centered for emphasis on this one chapter only): `Then I found Amazon FBA.`
- Body prose (one paragraph, centered, max-width 56ch):
  > `Summer 2025. I'd been reading, watching, lurking on forums for months. Something about Amazon FBA kept pulling me back — the idea that you could build a real product business from a laptop, on the side, without asking anyone's permission. I decided to try.`
- A short pull quote below, in italic serif:
  > *"It was the first time work felt like mine."*
- No image in this chapter. Let the air do the work.

### 5. Chapter 04 — The First Sale

**Background:** Pure white `--color-surface` with a faint warm orange wash overlaying it (`--color-accent-soft` at low opacity). The spark catches.

**Layout:** A two-row vertical structure. Top: a quiet line of text. Middle: a massive, animated date. Bottom: a short reflection.

- Chapter label (mono, in orange this time — the orange has officially arrived): `CHAPTER 04`
- Chapter subtitle: `THE FIRST SALE`
- A short line of text, centered: `My first sale came on:`
- Below, in absolutely massive type (clamp 5rem, 14vw, 12rem), the date, scroll-animated to fade and scale in over 1.5s:
  - `[PLACEHOLDER: First sale date — e.g., "August 14, 2025"]`
- The date should be set in heading sans, weight 500, with a subtle orange underline beneath the year (a single thin orange bar, 2px high, that draws itself from left to right when the date enters viewport — 800ms animation).
- Below the date, a single short paragraph (italic serif):
  > *"It was £[PLACEHOLDER]. It changed everything — not because of the money, but because someone, somewhere, had bought something I'd put into the world."*

### 6. Chapter 05 — The Crossroads

**Background:** Returns to `--color-surface-alt`. Heavy again. The middle of the film, the dark night of the soul.

**Layout:** Three-beat structure. Each beat is a short vignette stacked vertically, separated by hairline dividers.

- Chapter label: `CHAPTER 05`
- Chapter subtitle: `THE CROSSROADS`
- A small subtitle below: `Three moments that changed everything.`

**Beat 1 — Matching the wage:**
- Small mono label: `MOMENT 01`
- Bold heading: `The day Amazon paid me what AJ Bell did.`
- One short paragraph:
  > `[PLACEHOLDER: Date]. I looked at my Seller Central dashboard, then I looked at my payslip. They were the same. For the first time, two paths sat side by side on a screen — and one of them I'd built myself.`

**Beat 2 — Promoted at work:**
- Small mono label: `MOMENT 02`
- Bold heading: `The promotion that didn't fix anything.`
- One short paragraph:
  > `Around the same time, I got promoted. Senior webchat agent, managing a team. It should've felt like a win. It didn't. I was good at it — and I knew, with absolute clarity, that being good at something isn't the same as wanting it.`

**Beat 3 — The realisation:**
- Small mono label: `MOMENT 03`
- Bold heading: `Wasting my life one Monday at a time.`
- One short paragraph:
  > `Every Sunday night I felt it. The dread. Not because the job was terrible — it wasn't. Because every hour spent there was an hour not spent on the thing I actually cared about.`

### 7. Chapter 06 — The Leap

**Background:** A split-section threshold. Top half (60% of the section) is `--color-ink-dark` near-black. Bottom half (40%) is `--color-bg` off-white. The chapter literally crosses a threshold as you scroll through it.

**Layout:** The chapter label and title sit in the dark half. The body prose and image cross the line — sitting half on black, half on white (a single image card that bridges the divide).

- Chapter label (mono, in orange, in the dark half): `CHAPTER 06`
- Chapter subtitle (off-white): `THE LEAP`
- Chapter title (off-white, large, weight 500): `I quit.`
- Below the title, a single short line in muted off-white: `Two words I'd been afraid to say for two years.`
- Body prose (in the white half of the section):
  > `I won't pretend it was easy. The fear of leaving a steady paycheque doesn't disappear just because you've got something working on the side. But I'd done the math. I'd done the work. And I'd watched too many people stay in jobs they hated because leaving felt risky — when staying was the bigger risk all along.`
- A portrait placeholder bridging the dark/light split. Label: `[IMAGE: Jakub on the day he quit — or the day after. Could be a self-portrait, could be him at home, could be a shot of his desk at home for the first time. Should feel like the day everything changed.]`. The image sits half on the dark background and half on the light, with a subtle shadow.

### 8. Chapter 07 — Today / Freedom

**Background:** Off-white `--color-bg` with a soft orange glow in the top-right corner (more pronounced than the homepage version — this is the visual climax). Bright. Open. Sunrise.

**Layout:** A multi-part chapter. This is the longest one. Treat it like the final act.

**Part 1 — The chapter title moment:**
- Chapter label (mono, in orange): `CHAPTER 07`
- Chapter subtitle: `TODAY`
- Date line: `[PLACEHOLDER: Current month/year]`
- Chapter title, very large: `Now I do what I want.`

**Part 2 — The numbers (the proof):**
- A wide, three-column "stats block" with massive numbers, each animated to count up when in viewport:
  - `£[100,000]+` (animated count-up from 0) / Label: `IN AMAZON REVENUE TO DATE`
  - `£[3,000–5,000]` (animated count-up to the upper bound, then displayed as a range) / Label: `AVERAGE WEEKLY REVENUE`
  - `[10×]` (animated count-up from 0 to 10, with the "×" appearing at the end) / Label: `HOLIDAYS A YEAR`
- Each number in the heading sans, weight 500, sized clamp(3.5rem, 8vw, 6.5rem). Use orange on the middle stat only — the most "ongoing" / current one — to draw the eye there.
- Labels below in mono small caps.
- Stats separated by thin hairline dividers on desktop, stacked vertically on mobile.
- Below the stats, a small disclaimer in mono ink-subtle: `Real numbers, real time, real business. Updated [PLACEHOLDER: month/year].`

**Part 3 — The reflection:**
- A short, centered paragraph in italic serif:
  > *"Amazon didn't make me rich. It made me free. I get to pick where I am, who I'm with, and what I work on. To me, that's the only currency that's ever really mattered."*

**Part 4 — The freedom moments:**
- A horizontal scrolling row (or 2x2 grid on mobile) of 4 image placeholders showing what freedom actually looks like for Jakub. Labels:
  - `[IMAGE: Jakub on holiday — somewhere abroad, candid]`
  - `[IMAGE: Jakub with family or friends — meal, gathering, day out]`
  - `[IMAGE: Jakub working from somewhere that isn't an office — coffee shop, hotel balcony, etc.]`
  - `[IMAGE: Jakub doing something he loves outside of work — hobby, sport, travel]`
- Each image rounded 16px, soft shadow, slight grain overlay for premium feel.
- A small caption beneath each image in mono small caps (one short phrase per image — to be written by Jakub later, e.g., `MARRAKECH, MARCH 2026`).

### 9. The closing line

A near-empty viewport, mirroring the opening. Full circle.

- Full viewport height.
- Centered, vertically and horizontally.
- A massive single sentence, set in heading sans weight 500, with one word in italic serif for editorial weight:
  - `Freedom is the greatest *gift* a human can be given.`
  - The word `gift` in italic serif, in `--color-accent` orange.
- Below it, after a delay: `— Jakub` in mono small caps.
- A long pause of negative space below the line.
- At the very bottom of the viewport, a single small CTA (the only one on the entire page besides the nav):
  - A soft orange ghost button: `If you want this too — apply for mentorship →`
  - Small mono link below: `Or, [back to home →]`
- Background: `--color-bg` with the same soft warm radial gradient from the opening — but now in the *top-center* (sunrise has risen).

### 10. Footer (minimal)

Use the same footer as the homepage. Don't re-design it. Three columns, dark background, brand wordmark, nav, legal. Keep it short, reverent — the story has just ended, the footer should feel like the credits.

---

## TECHNICAL REQUIREMENTS

- **Framework:** Single self-contained HTML file with embedded CSS and JS, OR Next.js + Tailwind. Match whatever the homepage build uses.
- **Animations:** This page leans heavily on scroll-linked animations. Use Intersection Observer for triggers, plus either Framer Motion (if React) or vanilla JS for the count-ups and reveals. For the sticky chapter labels, use `position: sticky` with carefully calibrated top offsets. For background-color transitions between chapters, use CSS transitions on a parent wrapper that changes class on scroll.
- **Smooth scroll:** Native CSS first. Lenis if you want extra polish — but only if it works flawlessly on mobile.
- **Performance:**
  - Lazy-load all images.
  - Use `loading="lazy"` and `decoding="async"`.
  - Defer non-critical JS.
  - Make sure the page doesn't jank during scroll on mid-range mobile (test mentally for a Pixel 6a budget).
- **Accessibility:**
  - All text WCAG AA contrast — including the dark Chapter 02 section (off-white text on near-black is fine; don't put muted-grey text on near-black).
  - All animations honor `prefers-reduced-motion`.
  - Semantic HTML: every chapter as `<section>`, every chapter title as a real `<h2>`, the page wrapped in `<article>`.
  - Skip-to-content link for keyboard users.

---

## CONTENT PLACEHOLDERS

Mark every placeholder clearly so Jakub can find and replace them later:
- `[PLACEHOLDER: Year, City]` — biographical specifics.
- `[PLACEHOLDER: First sale date]` — the exact date of the first Amazon sale.
- `[PLACEHOLDER: Date]` — for the moment Amazon matched the AJ Bell wage.
- `[PLACEHOLDER: month/year]` — the "updated as of" line in the stats block.
- `[IMAGE: Description]` — every image placeholder includes a description of what to shoot.
- `[100,000]`, `[3,000–5,000]`, `[10×]` — the headline numbers, in case Jakub wants to update them as his business grows.

For visual placeholders, use this pattern:
- Images: `https://placehold.co/[width]x[height]/F4F2EC/0A0A0A/png?text=[LABEL]`
- For black-and-white chapters, use a darker placeholder palette: `https://placehold.co/[width]x[height]/2A2A28/E8E5DD/png?text=[LABEL]`

---

## TONE OF VOICE FOR ALL COPY

- First-person, in Jakub's voice.
- Calm. Reflective. Honest.
- Short sentences. Strong verbs. Concrete details (dates, numbers, places).
- Slightly understated — the story is dramatic enough; the writing should let it breathe.
- **Never use:** "rock bottom", "everything changed in an instant", "I had a wake-up call", "the rest is history", "I knew I was destined for more", "burning desire", or any phrase from a self-help paperback.
- **Do use:** specific moments, real timeframes, named places (AJ Bell, Amazon FBA, summer 2025), small honest admissions ("I won't pretend it was easy", "I was good at it — and I knew that wasn't enough").
- Examples of the voice we want:
  - ✓ "I got a job as a webchat agent at AJ Bell."
  - ✓ "It was the first time work felt like mine."
  - ✓ "Two words I'd been afraid to say for two years."
  - ✗ "I had a burning desire to escape the rat race and pursue my TRUE PURPOSE!"

---

## DELIVERY

Output the complete code in a single response. After the code, include a short `## Build notes` section listing:
1. Any deliberate creative decisions you made within the brief.
2. Every `[PLACEHOLDER]` and `[IMAGE]` Jakub needs to fill in before launch, organized by chapter.
3. Suggested next steps for Jakub:
   - Photos to shoot (with brief shoot notes for each — what feeling, what setting, what to avoid).
   - Specific dates and numbers to confirm.
   - Optional: a short voiceover or background audio track that could be added to deepen the cinematic feel (this is a nice-to-have, not required).

Now build it. Take your time on every section. This isn't a sales page — it's a film. Make it feel like one.