"use client";

import { useEffect, useRef, useState } from "react";
import { CountUp } from "../components/count-up";
import { Footer } from "../components/footer";
import { Nav } from "../components/nav";
import { Reveal } from "../components/reveal";

/* ----------------------------------------------------------------------------
   Results — Jakub's personal numbers, told through interactive sections.
   No screenshots: every "proof" block is a live, explorable element instead.
---------------------------------------------------------------------------- */

const AVG_UK_SALARY = 35_000; // average UK full-time salary, for comparison
const SALARY_TO_BEAT = 30_000; // "days to replace a salary" reference

const MILESTONES = [
  {
    key: "day",
    tab: "Per day",
    amount: 600,
    cadence: "in a day",
    title: "The first £600 day",
    blurb:
      "The day the side hustle out-earned the day job. One day of Amazon payouts beat a full week of my old salary - that's the moment I knew the 9-5 had an exit.",
  },
  {
    key: "week",
    tab: "Per week",
    amount: 3_000,
    cadence: "in a week",
    title: "£3k weeks became normal",
    blurb:
      "Once the system was dialled in, £3,000 weeks stopped being a lucky spike and became the baseline I could actually plan my life around.",
  },
  {
    key: "month",
    tab: "Per month",
    amount: 10_000,
    cadence: "in a month",
    title: "The £10k month",
    blurb:
      "A full month of FBA revenue that replaced my salary several times over - built on bundles and wholesale, not gambling on hype products.",
  },
] as const;

const JOURNEY = [
  {
    label: "Side hustle",
    title: "Sourcing after hours",
    body: "Evenings and weekends spent scouting bundles and learning the system - while still clocking in at the 9-5 every morning.",
  },
  {
    label: "£600 day",
    title: "The proof it works",
    body: "A single day's payout overtakes a full week of salary. The first hard evidence that this could become something real.",
  },
  {
    label: "£3k weeks",
    title: "Luck becomes a system",
    body: "Consistency replaces guesswork. The income gets predictable enough to actually plan a life around it.",
  },
  {
    label: "£10k months",
    title: "The model scales",
    body: "Monthly Amazon revenue clears my old salary several times over - on repeatable bundles and wholesale, not hype.",
  },
  {
    label: "Full-time",
    title: "Goodbye 9-5",
    body: "I hand in my notice. No boss, no commute, no alarm I didn't set - Amazon full-time, on my own terms.",
  },
];

const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

/* Smoothly animates an integer whenever `value` changes. */
function Tally({ value, duration = 650 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const from = fromRef.current;
    if (reduced || from === value) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{gbp(display)}</>;
}

/* ---------- Interactive: milestone switcher ---------- */
function MilestoneSwitcher() {
  const [active, setActive] = useState(0);
  const m = MILESTONES[active];

  return (
    <div className="rounded-3xl bg-surface hairline p-6 md:p-10 shadow-[var(--shadow-soft)]">
      {/* tabs */}
      <div className="flex flex-wrap gap-2">
        {MILESTONES.map((item, i) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`inline-flex items-center rounded-full px-4 py-2 text-[0.85rem] font-medium transition-all duration-200 ${
              active === i
                ? "bg-accent text-white shadow-[0_4px_14px_rgba(255,107,26,0.35)]"
                : "bg-surface-alt text-ink-muted hover:text-ink hover:bg-surface-deep"
            }`}
          >
            {item.tab}
          </button>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-[auto_1fr] gap-6 md:gap-12 items-center">
        <div>
          <div className="font-display font-semibold tracking-[-0.02em] leading-none text-[clamp(3rem,9vw,5.5rem)] text-ink">
            <Tally value={m.amount} />
          </div>
          <p className="mt-3 label-mono">{m.cadence}</p>
        </div>

        <div className="md:border-l md:border-line md:pl-12">
          <h3 className="font-display text-[1.4rem] md:text-[1.6rem] font-medium tracking-[-0.02em] text-ink">
            {m.title}
          </h3>
          <p className="mt-3 text-[1.02rem] leading-[1.65] text-ink-muted">
            {m.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Interactive: financial-freedom calculator ---------- */
function FreedomCalculator() {
  const [perDay, setPerDay] = useState(600);

  const perWeek = perDay * 7;
  const perMonth = perDay * 30;
  const perYear = perDay * 365;
  const multiple = perYear / AVG_UK_SALARY;
  const daysToSalary = Math.max(1, Math.ceil(SALARY_TO_BEAT / perDay));
  // slider fill %
  const min = 100;
  const max = 1500;
  const pct = ((perDay - min) / (max - min)) * 100;

  const projections = [
    { label: "Per week", value: perWeek },
    { label: "Per month", value: perMonth },
    { label: "Per year", value: perYear },
  ];

  return (
    <div className="rounded-3xl bg-ink text-white p-6 md:p-10 shadow-[var(--shadow-lift)]">
      <p className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-white/50">
        The freedom math
      </p>
      <h3 className="mt-3 font-display text-[1.6rem] md:text-[2rem] font-medium tracking-[-0.02em] leading-[1.1]">
        What would{" "}
        <span className="text-accent">{gbp(perDay)} a day</span> do for you?
      </h3>
      <p className="mt-3 text-[0.975rem] leading-[1.6] text-white/60 max-w-[52ch]">
        Drag the slider and watch it compound. This is the exact math that
        pulled me out of the 9-5 - small, repeatable days that stack into a
        salary you set yourself.
      </p>

      {/* slider */}
      <div className="mt-8">
        <div className="flex items-end justify-between">
          <span className="font-display text-[2.5rem] md:text-[3rem] font-semibold tracking-[-0.02em] leading-none text-white">
            {gbp(perDay)}
          </span>
          <span className="text-[0.8rem] text-white/50 mb-2">per selling day</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={50}
          value={perDay}
          onChange={(e) => setPerDay(Number(e.target.value))}
          aria-label="Sales per day in pounds"
          className="mt-4 w-full h-2 cursor-pointer appearance-none rounded-full bg-white/15 accent-accent"
          style={{
            background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${pct}%, rgba(255,255,255,0.15) ${pct}%, rgba(255,255,255,0.15) 100%)`,
          }}
        />
        <div className="mt-1.5 flex justify-between font-mono text-[0.65rem] text-white/35">
          <span>{gbp(min)}</span>
          <span>{gbp(max)}</span>
        </div>
      </div>

      {/* projections — stack on mobile so the full numbers always fit, 3-up on sm+ */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {projections.map((p) => (
          <div
            key={p.label}
            className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.06] border border-white/10 px-5 py-4 sm:flex-col sm:items-center sm:justify-center sm:text-center sm:px-4"
          >
            <div className="font-display text-[clamp(1.5rem,5vw,1.9rem)] font-semibold tracking-[-0.02em] leading-none text-white">
              {gbp(p.value)}
            </div>
            <div className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-white/45 sm:mt-2">
              {p.label}
            </div>
          </div>
        ))}
      </div>

      {/* takeaways */}
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <div className="rounded-2xl bg-accent/15 border border-accent/30 px-5 py-4">
          <p className="text-[0.95rem] leading-snug">
            <span className="font-display text-[1.5rem] font-semibold text-accent">
              {multiple.toFixed(1)}×
            </span>{" "}
            <span className="text-white/80">
              the average UK full-time salary
            </span>
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.06] border border-white/10 px-5 py-4">
          <p className="text-[0.95rem] leading-snug">
            <span className="font-display text-[1.5rem] font-semibold text-white">
              {daysToSalary}
            </span>{" "}
            <span className="text-white/70">
              selling days to match a £30k salary
            </span>
          </p>
        </div>
      </div>

      <p className="mt-6 font-mono text-[0.62rem] tracking-[0.08em] uppercase text-white/35">
        Illustrative projection from a daily figure · not a forecast of your
        earnings
      </p>
    </div>
  );
}

/* ---------- Interactive: journey timeline ---------- */
function JourneyTimeline() {
  const [step, setStep] = useState(0);
  const s = JOURNEY[step];

  return (
    <div>
      {/* step rail */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-[14px] h-px bg-line" />
        <div
          className="absolute left-0 top-[14px] h-px bg-accent transition-all duration-300"
          style={{ width: `${(step / (JOURNEY.length - 1)) * 100}%` }}
        />
        <ol className="relative flex justify-between gap-1">
          {JOURNEY.map((j, i) => {
            const done = i <= step;
            return (
              <li key={j.label} className="flex-1 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  aria-current={i === step ? "step" : undefined}
                  className="group flex flex-col items-center text-center px-0.5"
                >
                  <span
                    className={`relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 text-[0.7rem] font-bold transition-all duration-200 ${
                      i === step
                        ? "bg-accent text-white border-accent scale-110 shadow-[0_0_0_4px_rgba(255,107,26,0.15)]"
                        : done
                        ? "bg-accent/15 text-accent border-accent/40"
                        : "bg-surface text-ink-subtle border-line group-hover:border-ink/30"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`mt-2.5 text-[0.62rem] md:text-[0.72rem] font-mono tracking-[0.04em] uppercase leading-tight transition-colors ${
                      i === step ? "text-ink" : "text-ink-subtle group-hover:text-ink-muted"
                    }`}
                  >
                    {j.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* active step panel */}
      <div
        key={step}
        className="mt-8 rounded-2xl bg-surface hairline p-6 md:p-8 animate-in"
      >
        <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-accent">
          Step {step + 1} of {JOURNEY.length}
        </p>
        <h3 className="mt-2 font-display text-[1.35rem] md:text-[1.6rem] font-medium tracking-[-0.02em] text-ink">
          {s.title}
        </h3>
        <p className="mt-3 text-[1.02rem] leading-[1.65] text-ink-muted max-w-[60ch]">
          {s.body}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setStep((p) => Math.max(0, p - 1))}
            disabled={step === 0}
            className="inline-flex h-10 items-center rounded-full border border-line px-4 text-[0.85rem] text-ink-muted transition-colors hover:text-ink hover:border-ink/20 disabled:opacity-40 disabled:pointer-events-none"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={() => setStep((p) => Math.min(JOURNEY.length - 1, p + 1))}
            disabled={step === JOURNEY.length - 1}
            className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-[0.85rem] font-medium text-white transition-transform hover:-translate-y-px disabled:opacity-40 disabled:pointer-events-none"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function ResultsPage() {
  const quickStats = [
    { value: 600, suffix: "", label: "Days" },
    { value: 3, suffix: "k", label: "Weeks" },
    { value: 10, suffix: "k", label: "Months" },
  ];

  return (
    <>
      <Nav />
      <main className="pt-24 md:pt-32 bg-bg">
        {/* Header */}
        <section className="pt-16 md:pt-20">
          <div className="mx-auto max-w-[1280px] px-6 md:px-8">
            <div className="max-w-[820px] mx-auto text-center">
              <Reveal>
                <p className="label-mono">Results</p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,5vw,5rem)] text-ink">
                  My results. The real numbers.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55] text-ink-muted max-w-[60ch] mx-auto">
                  I&rsquo;m not going to show you fake results from
                  &ldquo;students&rdquo; you&rsquo;ve never met - this mentorship
                  is new. So here&rsquo;s the honest version: the real numbers
                  that took me out of a 9-5 and into running Amazon full-time -
                  and a few ways to explore what they could mean for you.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-12 grid grid-cols-3 gap-4 max-w-[480px] mx-auto">
                  {quickStats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl bg-surface hairline py-5 px-2"
                    >
                      <div className="font-display text-[clamp(1.5rem,4vw,2.25rem)] font-semibold tracking-[-0.02em] leading-none text-ink">
                        <CountUp to={s.value} prefix="£" suffix={s.suffix ?? ""} />
                      </div>
                      <div className="mt-2 label-mono">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Milestone switcher */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1080px] px-6 md:px-8">
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-[-0.02em] text-ink mb-8">
                The milestones, one tap at a time
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <MilestoneSwitcher />
            </Reveal>
          </div>
        </section>

        {/* Freedom calculator */}
        <section className="pb-16 md:pb-24">
          <div className="mx-auto max-w-[1080px] px-6 md:px-8">
            <Reveal>
              <FreedomCalculator />
            </Reveal>
          </div>
        </section>

        {/* Journey timeline */}
        <section className="pb-20 md:pb-32">
          <div className="mx-auto max-w-[1080px] px-6 md:px-8">
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-[-0.02em] text-ink mb-3">
                From clocking in to cashing out
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-ink-muted leading-[1.6] max-w-[60ch] mb-10">
                Financial freedom didn&rsquo;t arrive as one lottery moment. It
                was a ladder. Click through the steps.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <JourneyTimeline />
            </Reveal>

            <p className="mt-16 text-center font-mono text-[0.75rem] tracking-[0.1em] uppercase text-ink-subtle">
              Income disclaimer: These are my own personal results, not typical
              and not a guarantee of what you&rsquo;ll earn. Individual results
              vary.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
