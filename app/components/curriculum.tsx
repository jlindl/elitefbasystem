import { Accordion } from "./accordion";
import { Reveal } from "./reveal";

const modules = [
  {
    id: "m1",
    numeral: "01",
    title: "Introduction to Amazon FBA",
    meta: "Wholesale, bundling, and the lean model that underpins everything.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Split the work: how Amazon's FBA infrastructure actually operates.</li>
          <li>The Prime badge advantage and how you really make money.</li>
          <li>The Lean Model: validate small before you scale.</li>
          <li>The 24-hour fulfilment machine and hands-off customer service.</li>
        </ul>
        <p className="mt-4 label-mono">6 lessons</p>
      </>
    ),
  },
  {
    id: "m2",
    numeral: "02",
    title: "Opening Your First Seller Account",
    meta: "Set up correctly, get verified, and protect your account from day one.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Individual vs Professional: the cost trade-off and Buy Box rule.</li>
          <li>The eight-step signup wizard, broken down screen by screen.</li>
          <li>Verification, the video call, and how to avoid suspension.</li>
          <li>A Seller Central tour and day-one account hygiene.</li>
        </ul>
        <p className="mt-4 label-mono">6 lessons</p>
      </>
    ),
  },
  {
    id: "m3",
    numeral: "03",
    title: "Product Research",
    meta: "Find and validate bundle opportunities that actually sell at a profit.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>The research mindset: what makes a viable bundle candidate.</li>
          <li>Sourcing hunting grounds: physical shops and online directories.</li>
          <li>The six-step Amazon Validation Method and Helium 10 X-Ray.</li>
          <li>The Bundle Opportunity Test and approaching wholesale suppliers.</li>
        </ul>
        <p className="mt-4 label-mono">6 lessons</p>
      </>
    ),
  },
  {
    id: "m4",
    numeral: "04",
    title: "Listing Creation",
    meta: "Build a listing that gets found, gets clicked, and converts.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>The anatomy of a listing and the job each part does.</li>
          <li>Generic brand and the GTIN exemption: listing without a barcode.</li>
          <li>Writing titles, bullets, and descriptions (with AI as a start).</li>
          <li>Listing images, HTML formatting, and going live.</li>
        </ul>
        <p className="mt-4 label-mono">6 lessons</p>
      </>
    ),
  },
  {
    id: "m5",
    numeral: "05",
    title: "Sending to Amazon",
    meta: "From polybagging at home to live FBA inventory.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Preparing and polybagging your bundle the right way.</li>
          <li>The labels and warnings every compliant unit needs.</li>
          <li>Packing the outer box and the Heavy Package rules.</li>
          <li>Creating the shipment and tracking it until it is sellable.</li>
        </ul>
        <p className="mt-4 label-mono">6 lessons</p>
      </>
    ),
  },
  {
    id: "m6",
    numeral: "06",
    title: "Launching a Brand",
    meta: "Transition from reseller to protected brand owner.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Knowing when you are ready to build a brand.</li>
          <li>Forming a limited company and business banking.</li>
          <li>Registering your trademark and applying for Brand Registry.</li>
          <li>Creating your brand identity and upgrading your account.</li>
        </ul>
        <p className="mt-4 label-mono">7 lessons</p>
      </>
    ),
  },
  {
    id: "m7",
    numeral: "07",
    title: "Marketing",
    meta: "Visibility, keywords, and the tools that scale a brand.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Visibility vs conversion: the two levers that matter.</li>
          <li>Keywords: the core of Amazon's search algorithm.</li>
          <li>Helium 10 (Cerebro) for beginner-friendly keyword research.</li>
          <li>A+ Content and PPC advertising that drives sales.</li>
        </ul>
        <p className="mt-4 label-mono">5 lessons</p>
      </>
    ),
  },
  {
    id: "m8",
    numeral: "08",
    title: "Expansion",
    meta: "Take your products beyond a single Amazon listing.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Why and when to expand beyond Amazon.</li>
          <li>The three expansion channels to consider.</li>
          <li>Launching on eBay, step by step (beginner-friendly).</li>
          <li>Launching on TikTok Shop for visual, impulse products.</li>
        </ul>
        <p className="mt-4 label-mono">4 lessons</p>
      </>
    ),
  },
  {
    id: "m9",
    numeral: "09",
    title: "Long-Term Maintenance",
    meta: "Protect your asset and keep the machine running.",
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>What long-term maintenance actually means.</li>
          <li>The weekly maintenance checklist.</li>
          <li>The monthly maintenance routine.</li>
          <li>Keeping your account healthy and avoiding suspensions.</li>
        </ul>
        <p className="mt-4 label-mono">3 lessons</p>
      </>
    ),
  },
];

export function Curriculum() {
  return (
    <section
      id="curriculum"
      className="scroll-mt-20 md:scroll-mt-24 bg-surface-alt py-24 md:py-32 border-y border-line"
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
