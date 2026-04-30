import { Accordion } from "./accordion";
import { Reveal } from "./reveal";

const modules = [
  {
    id: "m1",
    numeral: "01",
    title: "Foundations — How Amazon Actually Works in 2026",
    meta: "What's changed, what hasn't, and what to ignore.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>The 2026 Amazon landscape: what's broken, what's quietly working.</li>
          <li>Marketplace economics — fees, margins, and what a real business looks like.</li>
          <li>Product categories I avoid (and why I keep avoiding them).</li>
          <li>Compliance, brand registry, and the boring stuff that saves you later.</li>
        </ul>
        <p className="mt-4 label-mono">7 lessons · 92 minutes</p>
      </>
    ),
  },
  {
    id: "m2",
    numeral: "02",
    title: "Product Research That Doesn't Lie",
    meta: "How I find products in 2026 — beyond the tools.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>The two-step research method I use weekly on my own business.</li>
          <li>Reading demand without trusting Helium 10 numbers blindly.</li>
          <li>Differentiation: how to win without inventing a category.</li>
          <li>The kill-criteria checklist — when to walk away early.</li>
          <li>Live walkthrough: me finding a product in real time.</li>
        </ul>
        <p className="mt-4 label-mono">9 lessons · 2h 15m</p>
      </>
    ),
  },
  {
    id: "m3",
    numeral: "03",
    title: "Sourcing & Supplier Negotiation",
    meta: "From first contact to landed inventory.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Finding suppliers (Alibaba, Yiwu, factory directs, vetted lists).</li>
          <li>The first-contact message that gets responses.</li>
          <li>Negotiation scripts I actually use — including for MOQs.</li>
          <li>Sample-to-PO playbook: protecting yourself at every stage.</li>
          <li>Inspection, freight, and the customs gotchas.</li>
        </ul>
        <p className="mt-4 label-mono">8 lessons · 2h 30m</p>
      </>
    ),
  },
  {
    id: "m4",
    numeral: "04",
    title: "Listing, Photography & Ranking",
    meta: "Build a listing that actually converts.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>The 7-part listing structure I use on every SKU.</li>
          <li>Photography briefs that don't waste your photographer's time.</li>
          <li>A+ content patterns that move conversion 8–12%.</li>
          <li>Ranking strategy in the post-keyword-stuffing era.</li>
        </ul>
        <p className="mt-4 label-mono">6 lessons · 1h 45m</p>
      </>
    ),
  },
  {
    id: "m5",
    numeral: "05",
    title: "PPC Without Burning Money",
    meta: "Ad spend that compounds, not bleeds.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Day-1 launch ads — exactly how I structure them.</li>
          <li>Reading your ad reports without losing weekends.</li>
          <li>Budget allocation across the launch / scale / mature stages.</li>
          <li>The ACOS targets I actually use (not the ones gurus quote).</li>
        </ul>
        <p className="mt-4 label-mono">7 lessons · 1h 50m</p>
      </>
    ),
  },
  {
    id: "m6",
    numeral: "06",
    title: "Scaling, Systems & Selling Smart",
    meta: "Build a business, not a job.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>SOPs, VAs, and the order I hired in.</li>
          <li>Inventory math: forecasting, IPI, avoiding stockouts.</li>
          <li>Building toward an exit (or not) — what brokers actually look for.</li>
          <li>What I'd do if I had to start over today.</li>
        </ul>
        <p className="mt-4 label-mono">8 lessons · 2h 10m</p>
      </>
    ),
  },
];

export function Curriculum() {
  return (
    <section
      id="curriculum"
      className="bg-surface-alt py-24 md:py-32 border-y border-line"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="max-w-[820px]">
          <Reveal>
            <p className="label-mono">04 / The method</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)]">
              Six modules. One system. Built by Jakub.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55] text-ink-muted">
              The Elite FBA curriculum is the same workflow I run on my own
              business &mdash; nothing held back, nothing decorative.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-14 rounded-2xl bg-surface overflow-hidden hairline">
            <Accordion items={modules} showNumeral />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
