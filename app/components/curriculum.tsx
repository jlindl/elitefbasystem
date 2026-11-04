import { Accordion } from "./accordion";
import { ArrowRight } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const modules = [
  {
    id: "m1",
    numeral: "01",
    title: "Introduction to Amazon FBA",
    meta: "Wholesale, bundling, and the lean model that underpins everything.",
    lessons: 6,
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Split the work: how Amazon’s FBA infrastructure actually operates.</li>
          <li>The Prime badge advantage and how you really make money.</li>
          <li>The Lean Model: validate small before you scale.</li>
          <li>The 24-hour fulfilment machine and hands-off customer service.</li>
        </ul>
      </>
    ),
  },
  {
    id: "m2",
    numeral: "02",
    title: "Opening Your First Seller Account",
    meta: "Set up correctly, get verified, and protect your account from day one.",
    lessons: 6,
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Individual vs Professional: the cost trade-off and Buy Box rule.</li>
          <li>The eight-step signup wizard, broken down screen by screen.</li>
          <li>Verification, the video call, and how to avoid suspension.</li>
          <li>A Seller Central tour and day-one account hygiene.</li>
        </ul>
      </>
    ),
  },
  {
    id: "m3",
    numeral: "03",
    title: "Product Research",
    meta: "Find and validate bundle opportunities that actually sell at a profit.",
    lessons: 6,
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>The research mindset: what makes a viable bundle candidate.</li>
          <li>Sourcing hunting grounds: physical shops and online directories.</li>
          <li>The six-step Amazon Validation Method and Helium 10 X-Ray.</li>
          <li>The Bundle Opportunity Test and approaching wholesale suppliers.</li>
        </ul>
      </>
    ),
  },
  {
    id: "m4",
    numeral: "04",
    title: "Listing Creation",
    meta: "Build a listing that gets found, gets clicked, and converts.",
    lessons: 6,
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>The anatomy of a listing and the job each part does.</li>
          <li>Generic brand and the GTIN exemption: listing without a barcode.</li>
          <li>Writing titles, bullets, and descriptions (with AI as a start).</li>
          <li>Listing images, HTML formatting, and going live.</li>
        </ul>
      </>
    ),
  },
  {
    id: "m5",
    numeral: "05",
    title: "Sending to Amazon",
    meta: "From polybagging at home to live FBA inventory.",
    lessons: 6,
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Preparing and polybagging your bundle the right way.</li>
          <li>The labels and warnings every compliant unit needs.</li>
          <li>Packing the outer box and the Heavy Package rules.</li>
          <li>Creating the shipment and tracking it until it is sellable.</li>
        </ul>
      </>
    ),
  },
  {
    id: "m6",
    numeral: "06",
    title: "Launching a Brand",
    meta: "Transition from reseller to protected brand owner.",
    lessons: 7,
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Knowing when you are ready to build a brand.</li>
          <li>Forming a limited company and business banking.</li>
          <li>Registering your trademark and applying for Brand Registry.</li>
          <li>Creating your brand identity and upgrading your account.</li>
        </ul>
      </>
    ),
  },
  {
    id: "m7",
    numeral: "07",
    title: "Marketing",
    meta: "Visibility, keywords, and the tools that scale a brand.",
    lessons: 5,
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Visibility vs conversion: the two levers that matter.</li>
          <li>Keywords: the core of Amazon’s search algorithm.</li>
          <li>Helium 10 (Cerebro) for beginner-friendly keyword research.</li>
          <li>A+ Content and PPC advertising that drives sales.</li>
        </ul>
      </>
    ),
  },
  {
    id: "m8",
    numeral: "08",
    title: "Expansion",
    meta: "Take your products beyond a single Amazon listing.",
    lessons: 4,
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>Why and when to expand beyond Amazon.</li>
          <li>The three expansion channels to consider.</li>
          <li>Launching on eBay, step by step (beginner-friendly).</li>
          <li>Launching on TikTok Shop for visual, impulse products.</li>
        </ul>
      </>
    ),
  },
  {
    id: "m9",
    numeral: "09",
    title: "Long-Term Maintenance",
    meta: "Protect your asset and keep the machine running.",
    lessons: 3,
    body: (
      <>
        <ul className="list-disc pl-5 space-y-2">
          <li>What long-term maintenance actually means.</li>
          <li>The weekly maintenance checklist.</li>
          <li>The monthly maintenance routine.</li>
          <li>Keeping your account healthy and avoiding suspensions.</li>
        </ul>
      </>
    ),
  },
];


const totalLessons = modules.reduce((sum, m) => sum + m.lessons, 0);

const items = modules.map((m) => ({
  ...m,
  body: (
    <>
      {m.body}
      <p className="mt-5 label-mono">{m.lessons} lessons</p>
    </>
  ),
}));

const facts = [
  { value: String(modules.length), label: "Modules" },
  { value: String(totalLessons), label: "Lessons" },
  { value: "1", label: "System" },
];

export function Curriculum() {
  return (
    <section
      id="curriculum"
      className="scroll-mt-20 md:scroll-mt-24 py-16 md:py-36"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="04"
                eyebrow="What you’ll learn"
                title="From your first product to your own brand."
                intro="Nine modules that take you from opening your seller account to launching a protected brand - the same workflow I run on my own business, nothing held back."
              />

              <Reveal delay={240}>
                <dl className="mt-10 grid grid-cols-3 gap-3 max-w-[460px]">
                  {facts.map((f) => (
                    <div
                      key={f.label}
                      className="rounded-2xl bg-surface hairline px-4 py-4 md:py-5"
                    >
                      <dt className="label-mono !text-[0.65rem]">{f.label}</dt>
                      <dd className="mt-2 font-display text-[1.875rem] md:text-[2.25rem] font-medium leading-none tracking-[-0.04em]">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={300}>
                <a href="#apply" className="btn btn-primary mt-8">
                  Apply for a spot
                  <ArrowRight size={16} className="btn-arrow" />
                </a>
              </Reveal>
            </div>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl md:rounded-3xl bg-surface hairline shadow-[var(--shadow-soft)]">
              <Accordion items={items} showNumeral />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
