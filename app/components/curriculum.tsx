import { Accordion } from "./accordion";
import { Reveal } from "./reveal";

const modules = [
  {
    id: "m1",
    numeral: "01",
    title: "Foundations: The FBA Reality",
    meta: "Understanding the 2026 landscape and the lean launch philosophy.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>The 2026 Amazon landscape: what's broken, what's quietly working.</li>
          <li>FBA is infrastructure, not a business model - understanding the mechanics.</li>
          <li>Mindset: why "progress beats perfection" in your first 90 days.</li>
          <li>Compliance and the boring stuff that saves your account later.</li>
        </ul>
        <p className="mt-4 label-mono">Duration: 2 hours</p>
      </>
    ),
  },
  {
    id: "m2",
    numeral: "02",
    title: "Lean Setup: Individual Seller",
    meta: "Start selling without monthly fees or complex company structures.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Registering correctly to avoid the £30/mo "Professional" trap.</li>
          <li>Identity verification: documents you need to get approved fast.</li>
          <li>A tour of Seller Central - your new business control panel.</li>
          <li>Common setup mistakes that get new accounts suspended.</li>
        </ul>
        <p className="mt-4 label-mono">Duration: 2 hours</p>
      </>
    ),
  },
  {
    id: "m3",
    numeral: "03",
    title: "Product Research That Doesn't Lie",
    meta: "How I find products in 2026 - beyond just trusting tools.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Shelf-shop sourcing: finding opportunities in physical discount stores.</li>
          <li>The 5-point validation check: will this actually sell at a profit?</li>
          <li>The Bundle Strategy: creating unique listings without inventing a product.</li>
          <li>Logging your 3 candidates: data-backed selection over guesswork.</li>
        </ul>
        <p className="mt-4 label-mono">Duration: 1 week</p>
      </>
    ),
  },
  {
    id: "m4",
    numeral: "04",
    title: "Listing Creation & Compliance",
    meta: "Build a shop window that stops the scroll and converts.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>The 7-part listing anatomy: what customers actually read.</li>
          <li>Writing titles, bullets, and descriptions that the algorithm loves.</li>
          <li>Lean photography: getting professional shots with just your phone.</li>
          <li>GTIN exemptions: listing products without buying expensive barcodes.</li>
        </ul>
        <p className="mt-4 label-mono">Duration: 48 hours</p>
      </>
    ),
  },
  {
    id: "m5",
    numeral: "05",
    title: "Shipping & Logistics: Sending to Amazon",
    meta: "From your living room to the FBA warehouse.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Creating your first FBA shipment in Seller Central.</li>
          <li>Box labels, product labels, and Amazon's strict prep rules.</li>
          <li>Dealing with freight, couriers, and the customs "gotchas."</li>
          <li>Tracking your inventory until it hits "Active" status.</li>
        </ul>
        <p className="mt-4 label-mono">Duration: 2 weeks</p>
      </>
    ),
  },
  {
    id: "m6",
    numeral: "06",
    title: "Launching a Brand",
    meta: "Transitioning from a reseller to a protected brand owner.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>When to level up: the specific signals that say you're ready.</li>
          <li>Setting up a Ltd Company and business banking the right way.</li>
          <li>Naming, logo design, and building a cohesive brand identity.</li>
          <li>Filing your trademark and getting approved for Brand Registry.</li>
        </ul>
        <p className="mt-4 label-mono">Duration: 3-6 months</p>
      </>
    ),
  },
  {
    id: "m7",
    numeral: "07",
    title: "Marketing: Scaling with Brand Tools",
    meta: "Unlocking the tools that separate amateurs from pros.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>A+ Content: building rich, visual product descriptions.</li>
          <li>The Vine Program: getting your first 30 honest reviews fast.</li>
          <li>PPC Basics: Sponsored Products, Brands, and Display ads.</li>
          <li>Reading performance data without losing your mind.</li>
        </ul>
        <p className="mt-4 label-mono">Duration: 1 month</p>
      </>
    ),
  },
  {
    id: "m8",
    numeral: "08",
    title: "Expansion: Multi-Channel & Global",
    meta: "Taking your system beyond a single product and marketplace.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Inventory math: forecasting and avoiding the stockout death-spiral.</li>
          <li>Adding SKU #2: should it be a variation or a new category?</li>
          <li>Opening EU and US markets: the legal and logistical roadmap.</li>
          <li>Building an exit-ready business: what brokers actually value.</li>
        </ul>
        <p className="mt-4 label-mono">Duration: 2 weeks</p>
      </>
    ),
  },
  {
    id: "m9",
    numeral: "09",
    title: "Maintenance: Long-Term Health",
    meta: "Protecting your asset and keeping the machine running.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>The 90-minute Weekly Maintenance Checklist.</li>
          <li>Account Health: monitoring ODR and avoiding suspensions.</li>
          <li>Dealing with IP complaints and "Inauthentic" flags.</li>
          <li>The compounding advantage of a multi-product brand.</li>
        </ul>
        <p className="mt-4 label-mono">Duration: Ongoing</p>
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
              Nine modules. One system. Built by Jakub.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55] text-ink-muted">
              The Elite FBA curriculum is the same workflow I run on my own
              business - nothing held back, nothing decorative.
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
