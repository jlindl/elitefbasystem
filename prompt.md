# Master Prompt: Jakub's FBA Coaching Homepage (One-Shot Build)

> **How to use this prompt:** Paste this entire document into Claude (Sonnet 4.6 or Opus 4.7), v0, Lovable, Bolt, or Cursor. It's optimized for a single-shot generation.

---

## ROLE

You are a world-class front-end designer and creative developer working at the intersection of Apple's product pages, Linear's marketing site, and Stripe's homepage. You ship cinematic, restrained, premium interfaces that move. You know that good design is invisible - every animation has intent, every pixel has a job, and white space is a feature, not a flaw.

You are building a single, scroll-driven homepage for a high-ticket Amazon FBA coaching brand. This is the most important page of the business. Get it right.

---

## THE BRIEF

Build a complete, production-ready single-page homepage for **Jakub's** Amazon FBA coaching program. Jakub is a real, full-time FBA seller making thousands per month. He's not a YouTube guru - he runs a real Amazon business today, and now he's teaching a small, hand-picked group of people to do the same.

This is a one-shot build. Output the complete code in a single response.

---

## THE POSITIONING (this is the soul of the site - every section must reinforce it)

Three things make Jakub's program different. The site must communicate all three, clearly and confidently:

### 1. A unique system, designed by Jakub himself
This is not a recycled FBA playbook. It's not Wholesale Formula. It's not Amazing Selling Machine. It's a system Jakub built from the ground up while running his own FBA business - refined through real wins and real losses, in the live 2026 Amazon environment. Give the system a name in the copy (use the placeholder `[THE SYSTEM NAME]` and tell the user in the build notes to replace it - but write the surrounding copy as if it has a real name, like "The [System Name] Method" or "The [System Name] Framework").

### 2. True 1-2-1 mentorship and full-time support
Most courses dump videos on you and disappear. Jakub doesn't. Every student gets direct, personal mentorship from him - not a coach, not a VA, not a "certified mentor." Full-time support means: real responses, fast, from the person who actually built the system. This is the antidote to the $5,000-and-ghosted experience that dominates the FBA coaching market.

### 3. A real community - friendship through business
This is the most important and most differentiated angle. Most "FBA communities" are Discord servers full of strangers spamming product ideas. Jakub is building something different: a small, tight team of sellers who genuinely help each other. Not just money-makers - *friends*. People who share suppliers, swap notes, celebrate launches, and pick each other up when something fails. The premise: business is lonely; doing it together is the unfair advantage.

**These three pillars should appear as a recurring motif throughout the site** - referenced in the hero, given a dedicated section, echoed in testimonials, and reinforced in the final CTA.

---

## NORTH STAR PRINCIPLES (read these first, refer back constantly)

1. **Anti-guru aesthetic.** No Lamborghinis. No mansion shots. No screaming yellow highlights. No "MAKE $10K/MONTH GUARANTEED!" headlines. The FBA coaching market is saturated with scammy-looking funnel pages - we are deliberately the opposite.
2. **Cinematic restraint.** Think Apple's iPhone landing page, not ClickFunnels. Big type, generous space, intentional motion, subtle gradients. If it feels loud, delete it.
3. **The video is the hero.** A large, beautifully framed main video of Jakub speaking is the centerpiece of the page above the fold. Everything else supports it.
4. **Light theme, sharpened by accent.** White and off-white backgrounds dominate. Black is the primary text and structural color. Orange is the accent - used sparingly and powerfully, like a knife, not a paintbrush.
5. **Mobile-first.** The page must look as cinematic on a 375px iPhone as on a 1920px monitor. Scale gracefully.
6. **Smooth scroll everywhere.** Native CSS smooth scroll, plus scroll-linked animations using Intersection Observer or Framer Motion. Nothing should pop in jarringly.
7. **Performance is design.** No layout shift. No janky animations. Lazy-load images. Use `prefers-reduced-motion` to disable animations for accessibility.
8. **Personal, not corporate.** This is Jakub's brand. The voice is first-person ("I built this", "I'll mentor you directly"), warm but direct. The site should feel like you're hearing from a real person, not a marketing department.

---

## VISUAL SYSTEM

### Color tokens (use these exact values)

```css
--color-bg:           #FAFAF7;   /* Off-white page background - warmer than pure white, premium feel */
--color-surface:      #FFFFFF;   /* Pure white for cards, elevated surfaces */
--color-surface-alt:  #F4F2EC;   /* Subtle warm gray for alternating sections */
--color-ink:          #0A0A0A;   /* Near-black for primary text and structure */
--color-ink-muted:    #4A4A48;   /* Body copy, secondary text */
--color-ink-subtle:   #8A8A86;   /* Captions, metadata, labels */
--color-line:         #E8E5DD;   /* Hairline dividers, borders */
--color-accent:       #FF6B1A;   /* Amazon-inspired orange - vibrant but not neon */
--color-accent-deep:  #E55400;   /* Hover state for orange */
--color-accent-soft:  #FFF1E8;   /* 10% orange tint for subtle highlights, badge backgrounds */
```

**Orange usage rules:**
- CTA buttons (primary only)
- One or two key statistic numbers, max
- Subtle underline accents on hover
- Small badge or pill elements
- A thin progress indicator if you build one
- **Never** use orange for: large background blocks, body text, multiple CTAs in the same viewport, or decorative shapes larger than 24px.

### Typography

- **Headings:** A modern geometric sans-serif. Use `'Inter Tight'`, `'Geist'`, or `'Satoshi'` via Google Fonts / Fontshare. Weights: 500 (medium) and 600 (semibold). Tracking: -0.02em on large display sizes.
- **Body:** `'Inter'` at weight 400. Line height 1.6. Tracking: -0.01em.
- **Mono accent (for stats/labels):** `'JetBrains Mono'` at weight 400, used in small caps for section labels (e.g., `01 / THE METHOD`).

**Type scale (desktop / mobile):**
- Hero headline: clamp(2.75rem, 7vw, 6.5rem), line-height 1.02
- Section headline: clamp(2rem, 4.5vw, 4rem), line-height 1.05
- Subhead: clamp(1.125rem, 1.5vw, 1.375rem), line-height 1.5
- Body: 1rem, line-height 1.65
- Label/caption: 0.8125rem, letter-spacing 0.08em, uppercase

### Spacing & layout

- Max content width: **1280px**, centered.
- Section vertical padding: **clamp(6rem, 12vw, 10rem)** top and bottom.
- Container horizontal padding: **clamp(1.5rem, 5vw, 3rem)**.
- Grid: 12-column on desktop, single-column on mobile, 8-column on tablet.
- Generous whitespace. When in doubt, add more.

### Motion & animation

- **Scroll reveals:** Fade up + 20px translate, 600ms duration, `cubic-bezier(0.22, 1, 0.36, 1)` easing. Stagger children by 80ms.
- **Hover states:** 200ms transitions, never longer.
- **Button hovers:** Subtle lift (translate Y -1px), shadow expand, color deepen. Not bouncy.
- **Smooth scroll:** Use `scroll-behavior: smooth` plus Lenis-style easing if you implement custom smooth scroll (optional, only if it doesn't break on mobile).
- **Marquee / ticker elements:** Use CSS `animation` for infinite horizontal scroll on social proof strips.
- **Number counters:** Animate from 0 to final value when in viewport, 1.2s duration.
- **Respect `prefers-reduced-motion`** - disable all transforms and reveal animations, keep opacity transitions only.

### Imagery treatment

- Real photos preferred over illustrations.
- Subtle grain or noise overlay on hero images (very light, 3% opacity) for premium feel.
- Rounded corners: **12px** for cards, **16px** for media containers, **999px** for pills/badges.
- Soft, single-direction shadows: `0 1px 2px rgba(10,10,10,0.04), 0 8px 24px rgba(10,10,10,0.06)`.
- Subtle border on white cards: `1px solid var(--color-line)`.

---

## PAGE STRUCTURE (build in this exact order)

### 1. Sticky navigation

- Transparent on load over the hero, with a subtle backdrop blur once the user scrolls past 80px.
- Left: brand wordmark - set the word `Jakub` in the heading font, weight 600. Optionally add a tiny orange dot after it (`Jakub.`) for a signature mark.
- Center (desktop only): nav links - `The Method`, `Mentorship`, `Community`, `Results`, `About`, `FAQ`. Subtle underline on hover that animates from left to right.
- Right: a single ghost button `Sign In` and a primary orange CTA `Apply Now`. (Use "Apply" instead of "Get Started" - it reinforces that this isn't an open-doors course; it's a hand-picked program.)
- Mobile: hamburger that opens a clean full-screen menu with large type.
- Height: 72px desktop, 64px mobile.

### 2. Hero section (the centerpiece)

This is the single most important section. Spend the most care here.

**Layout:**
- Full viewport height on desktop (min-height: 90vh), auto on mobile.
- Two-row vertical structure: text block on top (centered), large video below.
- On mobile: stacked, text first, video below, both full-width.

**Top row - text block:**
- Small label above headline: `01 / FROM A REAL SELLER` in mono small caps, with a tiny orange dot before it.
- Headline (two lines, placeholder copy - keep this exact wording unless you can improve it without softening it):
  - Line 1: `The FBA system I actually use.`
  - Line 2: `Taught by me. To you. Personally.` - set this second line in `--color-ink-muted` for tonal contrast.
- Subhead, max 2 lines: `I'm Jakub. I sell on Amazon full-time, and I built a system from scratch to do it. Now I'm hand-picking a small group of sellers to mentor 1-to-1 - and to build a team with.`
- Two CTAs side by side:
  - Primary orange: `Apply for Mentorship`
  - Ghost: `Watch My Story ↓` (smooth-scrolls to the video below)
- Below CTAs: a tiny trust strip - `Direct 1-to-1 mentorship · Real screenshots · No upsells · Limited spots`

**Bottom row - main video:**
- A large, 16:9 video container, full width up to 1080px max, perfectly centered.
- Rounded corners 16px.
- Subtle outer shadow.
- Inside: a placeholder thumbnail (a tasteful gradient placeholder - soft warm gray with a subtle radial highlight; build this yourself, don't use placehold.co for the hero video).
- Centered play button: white circle, 80px desktop / 64px mobile, with a black play icon. On hover: gentle scale to 1.08 and the orange accent color rings out from it (subtle pulse animation).
- Caption below the video in subtle ink: `Watch: Jakub's full breakdown · 3:24`.
- Add a small label overlaid in the bottom-left corner of the video: `[VIDEO: Jakub intro - to be filmed]` in a small white pill on a black 60% opacity background, so the user knows where the real video goes.
- The video container should subtly parallax / scale on scroll (very gentle - 1.02x to 1.0x as it enters viewport).

**Background treatment for the hero:**
- Off-white base.
- A very large, very soft orange radial gradient bleed in the top-right corner (`radial-gradient(circle at 90% 0%, rgba(255,107,26,0.08), transparent 50%)`). Almost imperceptible but adds warmth.
- Optional: a faint grid pattern or noise texture at 2% opacity behind the headline.

### 3. Social proof bar (just below the fold)

- A clean strip with 4–6 placeholder logos (use neutral SVG placeholder rectangles labeled `[FEATURED IN]`).
- Above the logos, a single small line of text: `As featured in` in mono small caps.
- Logos in `--color-ink-subtle`, hover brings them to full `--color-ink`.
- Subtle infinite horizontal marquee on mobile only.

### 4. The problem / agitation section

- Large section headline, left-aligned: `Most "FBA gurus" stopped selling years ago.`
- Subhead in muted ink: `They sold one product in 2019, made a course, and disappeared into Lamborghini commercials. Their tactics are dead. Their screenshots are old. Their advice will lose you money - and you'll never speak to them again after you swipe your card.`
- Below: a 3-column grid (1 column on mobile) with 3 short, sharp objections. Each card:
  - White surface with hairline border.
  - A small orange icon at the top (Lucide icons: `XCircle`, `MessageSquareOff`, `TrendingDown`).
  - 3-word headlines: `Outdated Tactics`, `Zero Real Support`, `Vanity Metrics`.
  - One sentence of body copy below each.
- Cards should fade up on scroll, staggered by 100ms.

### 5. The three pillars section (THE CORE OF THE SITE)

This section is the heart of the positioning. Build it with the most visual care after the hero.

- Section label: `02 / WHAT MAKES THIS DIFFERENT`.
- Headline: `A system. A mentor. A team.`
- Subhead: `Three things you don't get anywhere else in the FBA coaching world. Together, they're why this works.`
- A three-column layout on desktop (stacked vertically on mobile). Each column is a tall "pillar card":
  - Each pillar card: white surface, 16px radius, hairline border, generous padding, soft shadow on hover.
  - Top of card: a large numeral in the heading font (`01`, `02`, `03`) - the numeral itself can be 80px, in a very light weight (300) and `--color-ink-subtle`. Subtle, editorial.
  - A small icon below the numeral (orange, 24px, Lucide).
  - Pillar headline (heading font, weight 600).
  - 2–3 sentences of supporting copy.
  - A short tag line at the bottom in mono small caps.

**Pillar 1 - The System**
- Icon: `Compass`
- Headline: `A system I built. Not a recycled playbook.`
- Body: `[THE SYSTEM NAME] is the exact framework I use to run my own Amazon business in 2026. Not theory. Not a five-year-old course. The same product research, sourcing, listing, and scaling moves I'm making this month.`
- Tag: `BUILT FROM A LIVE BUSINESS`

**Pillar 2 - The Mentorship**
- Icon: `MessageCircle` or `Phone`
- Headline: `Real 1-to-1 mentorship. From me. Full-time.`
- Body: `You get me. Not a "certified coach." Not a virtual assistant. Direct access to the person who built the system, with full-time support - so when you're stuck on a supplier negotiation at 11pm, you actually get help.`
- Tag: `DIRECT ACCESS · FAST RESPONSES`

**Pillar 3 - The Team**
- Icon: `Users` or `Handshake`
- Headline: `A team of sellers. Friends, not strangers.`
- Body: `This isn't a 5,000-person Discord. It's a small, tight team where everyone knows your name. We share suppliers, celebrate wins, and catch each other when products flop. Real friendships, built through business.`
- Tag: `SMALL · INTENTIONAL · LOYAL`

Below the three pillars, centered:
- A pull-quote-style line in larger heading text: `"I'd rather have ten students I actually know than a thousand I'll never meet."`
- A small attribution: `- Jakub`
- A secondary CTA: ghost button `See how it works →` (smooth-scrolls to the curriculum section).

### 6. Proof / results section

This section earns the sale. Treat it carefully.

- Section label: `03 / PROOF, NOT PROMISES`.
- Headline: `Real students. Real screenshots. Real friendships.`
- Subhead: `Modest numbers, real timelines, real people. The kind of results you can actually replicate - not the kind you put on a Lamborghini.`
- A 3-column masonry-style grid (1 column mobile, 2 column tablet, 3 column desktop) of testimonial cards.
- Each card:
  - White surface, 16px radius, hairline border.
  - At the top: a placeholder image (square, rounded 8px) labeled "Screenshot from [Student Name]".
  - Below: a short pull quote (1–2 sentences, written like a real person texting a friend, not a polished marketing testimonial).
  - Below that: a small avatar (32px circle), full name, and result line (e.g., `Sarah K. - $4,200/mo profit, 6 months in`).
  - One small detail at the bottom of each card in mono caps: `MENTORED FOR [X] MONTHS` - reinforces the 1-2-1 angle.
  - Subtle hover: lift translateY(-4px) and shadow grow.
- Provide 6 placeholder cards with realistic, specific, modest results - `$2,400/mo profit`, `$8,100/mo profit`, `$12,000/mo profit`. Avoid `$100K/month` claims.
- Below the grid: a small line of mono text - `Income disclaimer: Individual results vary. These reflect real students, not averages.`

### 7. Curriculum / what's inside

- Section label: `04 / THE METHOD`.
- Headline: `Six modules. One system. Built by Jakub.`
- A clean accordion or expandable list of 6 modules. Each row:
  - Left: a large, light-weight number `01` in the heading font.
  - Center: module name and a one-line description.
  - Right: a `+` icon that rotates 45deg when expanded.
- Rows separated by hairline dividers. Hover state: subtle background shift to `--color-surface-alt`.
- When expanded: reveals 3–5 sub-bullets and a small `[X lessons · Y minutes]` metadata line in mono small caps.

Use these placeholder module names (they reflect a real FBA learning path, but Jakub should refine):
1. `Foundations - How Amazon Actually Works in 2026`
2. `Product Research That Doesn't Lie`
3. `Sourcing & Supplier Negotiation`
4. `Listing, Photography & Ranking`
5. `PPC Without Burning Money`
6. `Scaling, Systems & Selling Smart`

### 8. The mentorship section (dedicated to Jakub's 1-2-1 angle)

Don't just mention mentorship - give it its own moment.

- Two-column on desktop (image left, text right), stacked on mobile.
- Left: a placeholder portrait of Jakub, 4:5 ratio, rounded 16px, soft shadow. Label: `[IMAGE: Jakub portrait]`.
- Right:
  - Section label: `05 / MENTORSHIP`.
  - Headline: `You're not buying a course. You're hiring a partner.`
  - 3 short paragraphs of placeholder copy in Jakub's voice. Suggested structure:
    - Paragraph 1: What 1-to-1 actually means here (weekly calls, direct messaging, real responses).
    - Paragraph 2: What "full-time support" really means (hours, response times, what's covered).
    - Paragraph 3: The honest limit - "this is why I only take a small number of students at a time."
  - A small bullet list (3 items) with orange checkmarks: `Weekly 1-to-1 calls`, `Direct messaging access`, `Full-time support - fast responses`.

### 9. The community section (dedicated to the team / friendship angle)

This is the second most important section after the hero. Don't shortcut it.

- Section label: `06 / THE TEAM`.
- Headline: `Business is lonely. Doing it together isn't.`
- Subhead: `The hardest part of building an Amazon business isn't the work. It's doing it alone - at your laptop, at midnight, wondering if anyone else is figuring this out too. So we built a team.`
- Layout: a wide horizontal layout. On the left, a stack of 2–3 community "moments" - small cards that look like message previews or community highlights:
  - Card 1: A faux Slack/Discord message preview - `"Just hit my first $5K month. Couldn't have done it without this group."` - small avatar, name, timestamp.
  - Card 2: A faux event photo placeholder labeled `[IMAGE: Community meetup, London 2026]`.
  - Card 3: Another message preview - `"Anyone got experience with this supplier in Yiwu? Got a quote that feels off."` - replied to by 4 people.
- On the right, a short body copy block:
  - 2 paragraphs about what the community is and what it isn't.
  - A bulleted list (4 items, orange checkmarks): `Curated, small group`, `Real friendships, not networking`, `Suppliers, wins, and losses shared openly`, `In-person meetups (not just Discord)`.

Below the section, full-width, a quiet pull quote:
> *"I joined for the system. I stayed for the team."*  
> - Placeholder testimonial, to be replaced with a real one.

### 10. Founder / about section

- Two-column on desktop (image left, text right), stacked on mobile.
- Left: a large portrait placeholder, 4:5 ratio, rounded 16px, soft shadow. Label: `[IMAGE: Jakub at his desk / warehouse / packaging products - real, working environment]`.
- Right:
  - Small label: `07 / WHO I AM`.
  - Headline: `I'm Jakub. I'm an Amazon seller first.`
  - 3 short paragraphs of placeholder copy in Jakub's voice. Suggested structure:
    - Paragraph 1: What he does day-to-day (still selling, still operating, still in it).
    - Paragraph 2: How he got here (short origin, no rags-to-riches melodrama).
    - Paragraph 3: Why he's teaching now ("not because I stopped selling - because I want to build a team").
  - A small stat block at the bottom: 3 numbers in a horizontal row - `[X] years selling on Amazon`, `$[X] in lifetime revenue`, `[X] active SKUs`. Numbers in the heading font weight 600, large; labels below in mono small caps. **Use orange on one of the three numbers only** - pick the most impactful.

### 11. Pricing section

- Section label: `08 / APPLY`.
- Headline: `One program. Limited spots. No upsells.`
- Subhead: `Because mentorship is real, I can only take a small number of students at a time. Apply below - if it's a fit, we'll talk.`
- A single, beautiful pricing card, centered, max-width 480px.
- Card design:
  - White surface, 16px radius, generous internal padding (48px desktop / 32px mobile).
  - At the top: a small orange pill `Limited spots`.
  - Program name in heading font (placeholder: `The [System Name] Mentorship`).
  - One-sentence description below name.
  - Large price in heading font weight 600. Use a placeholder like `$[X,XXX]`. Optional: small line below - `Pay in full or 3 installments`.
  - A bulleted list of inclusions, each with a small orange checkmark:
    - `The full [System Name] curriculum (6 modules)`
    - `Weekly 1-to-1 calls with Jakub`
    - `Full-time direct messaging support`
    - `Access to the private team community`
    - `In-person meetups & events`
    - `Lifetime updates as Amazon evolves`
    - `Real screenshots, real SOPs, real templates`
  - A primary orange CTA full-width at the bottom: `Apply Now`.
  - Below the button, in tiny mono text: `Application required · 30-day money-back guarantee`.

### 12. FAQ section

- Section label: `09 / QUESTIONS`.
- Headline: `Honest answers to the questions you're actually asking.`
- A simple accordion of 8 FAQs. Use the same pattern as the curriculum module.

Pre-populate with these (skeptical first, the way real buyers think):
1. `Is FBA dead in 2026?`
2. `Is this just another guru course?`
3. `What does "1-to-1 mentorship" actually mean?`
4. `What if I have less than $[X] to start?`
5. `Will this work outside the US/UK?`
6. `Do you actually still sell on Amazon, or just teach?`
7. `Why do you limit the number of students?`
8. `What's your refund policy?`

Answers should be 2–4 sentences each, written in Jakub's first-person voice, like a human, not a marketer.

### 13. Final CTA section

- Full-bleed, near-full viewport height.
- Background: a clean black surface (`--color-ink`) with white text - the bold closing statement matches the confidence of the brand.
- Centered content:
  - Tiny label `READY?` in mono.
  - Massive headline (two lines): `Stop watching FBA on YouTube.` / `Start building it - with a team.` (second line in muted color or accent orange).
  - One CTA button only - primary orange, large, with a subtle right-arrow icon: `Apply for Mentorship →`.
  - Below: a single line `Or [watch Jakub's story] first →` as a text link.

### 14. Footer

- Three-column layout (desktop) / stacked (mobile).
- Column 1: brand wordmark `Jakub.` + a one-sentence positioning statement (`Real Amazon FBA mentorship. Built by a real seller.`) + small social icons (X, YouTube, Instagram, TikTok - use Lucide).
- Column 2: nav links (`The Method`, `Mentorship`, `Community`, `Apply`, `Login`).
- Column 3: legal links (`Privacy`, `Terms`, `Income Disclaimer`, `Contact`).
- Bottom strip: `© [YEAR] Jakub. All rights reserved.` + small mono text `Not affiliated with Amazon.com, Inc.`
- Background: `--color-ink` (near-black) with text in muted off-whites for high contrast.

---

## TECHNICAL REQUIREMENTS

- **Framework:** Single self-contained HTML file with embedded CSS and JS, OR Next.js + Tailwind (your choice - pick whichever produces the cleanest output for the target tool).
- **No external CSS frameworks beyond Tailwind** if you go that route. No Bootstrap. No component libraries that fight the design.
- **Icons:** Lucide via CDN or `lucide-react`.
- **Fonts:** Google Fonts CDN, preloaded.
- **Animations:** Pure CSS where possible. Use Framer Motion or vanilla JS Intersection Observer for scroll-linked reveals.
- **Smooth scroll:** Native CSS first. Add Lenis only if it integrates cleanly.
- **Accessibility:**
  - All interactive elements have visible focus states (orange 2px ring, 2px offset).
  - Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - All images have alt text placeholders.
  - Buttons have aria-labels where needed.
  - Color contrast meets WCAG AA on every text element.
- **Performance:**
  - Defer non-critical JS.
  - Lazy-load images and the video poster below the fold.
  - Use `loading="lazy"` and `decoding="async"`.
  - Total CSS < 50kb gzipped.

---

## CONTENT PLACEHOLDERS

Wherever specific copy is needed, use clearly-marked placeholders in square brackets:
- `Jakub` - already filled in throughout (do not replace).
- `[THE SYSTEM NAME]` - Jakub's named methodology, to be filled in later.
- `[X]` - any specific number to be filled in later.
- `[VIDEO: Jakub intro - to be filmed]` - video placeholder labels.
- `[IMAGE: Jakub portrait]`, `[IMAGE: Jakub at warehouse]`, `[IMAGE: community meetup]` - image placeholders.

For visual placeholders:
- Images: `https://placehold.co/[width]x[height]/F4F2EC/0A0A0A/png?text=[LABEL]`
- The main hero video: build the placeholder yourself with a gradient and a custom play button overlay (do not use placehold.co for the hero).

---

## TONE OF VOICE FOR ALL COPY

- First-person, in Jakub's voice. Direct. Confident. Slightly contrarian.
- Anti-hype. Pro-honesty.
- Short sentences. Strong verbs.
- Warm, but not soft. Personal, but not over-shared.
- **Never use:** "unlock", "crush it", "level up", "6-figure", "passive income", "financial freedom", "the matrix", "side hustle", or any word that appears on a Tony Robbins billboard.
- **Do use:** specific numbers, real timeframes, named obstacles, plain English, first-person ("I built", "I'll mentor", "we're a team").
- Examples of the tone we want:
  - ✓ "I'm Jakub. I sell on Amazon full-time."
  - ✓ "You get me. Not a certified coach."
  - ✓ "I'd rather have ten students I know than a thousand I'll never meet."
  - �- "Are you ready to UNLOCK your TRUE potential and CRUSH IT on Amazon?!"

---

## DELIVERY

Output the complete code in a single response. After the code, include a short `## Build notes` section listing:
1. Any deliberate creative decisions you made within the brief.
2. What needs to be replaced before launch (every `[PLACEHOLDER]`, especially the system name, video, photos, real testimonials, real numbers).
3. Suggested next steps (filming the hero video, gathering 6 real testimonials with screenshots, choosing a system name, getting the founder portrait shot).

Now build it. Make it cinematic. Make it feel like Jakub.
