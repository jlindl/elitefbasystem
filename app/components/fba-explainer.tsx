"use client";

import { useId, useState, type CSSProperties } from "react";
import { ArrowRight, Package, TrendingUp, Warehouse } from "./icons";
import { Reveal, useRevealOnScroll } from "./reveal";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    icon: Package,
    title: "You buy the stock",
    body: "Products bought at wholesale or trade prices - for less than they sell for on Amazon.",
  },
  {
    icon: Warehouse,
    title: "Amazon does the work",
    body: "Amazon stores it, sells it with the Prime badge, packs and delivers every order and handles customer service.",
  },
  {
    icon: TrendingUp,
    title: "You keep the profit",
    body: "After Amazon's fees, the difference lands in your bank account. Then you reorder and do it again.",
  },
];

const reasons = [
  { value: "200M+", label: "Prime members worldwide" },
  { value: "1 in 2", label: "UK households have Prime" },
  { value: "0", label: "Customer orders you post yourself" },
];

// Worked example from the course (Module 1 - unit economics of a bundle).
const EXAMPLE = { price: 15.99, cost: 4.5, fees: 6.0, profit: 5.49 };

const gbp = (n: number, dp = 2) =>
  `£${n.toLocaleString("en-GB", { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;

export function FbaExplainer() {
  return (
    <section
      id="fba"
      className="scroll-mt-20 md:scroll-mt-24 relative overflow-hidden py-16 md:py-36"
    >
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <SectionHeading
          index="01"
          eyebrow="What is Amazon FBA?"
          title="Amazon does the hard part. You keep the profit."
          intro="FBA means Fulfilment by Amazon. You send products to Amazon’s warehouses, and the biggest store in the world sells them, ships them and looks after the customer - for you."
        />

        <Steps />

        <Reveal>
          <dl className="mt-6 grid grid-cols-3 overflow-hidden rounded-3xl border border-line bg-surface-alt/70">
            {reasons.map((r, i) => (
              <div
                key={r.label}
                className={`px-3 py-6 sm:px-6 md:py-8 text-center ${i ? "border-l border-line" : ""}`}
              >
                <dt className="sr-only">{r.label}</dt>
                <dd className="font-display text-[clamp(1.6rem,5vw,3rem)] font-medium leading-none tracking-[-0.04em]">
                  {r.value}
                </dd>
                <dd
                  aria-hidden
                  className="mt-2.5 font-mono text-[0.58rem] sm:text-[0.68rem] uppercase leading-[1.5] tracking-[0.12em] text-ink-subtle"
                >
                  {r.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <MoneySection />
      </div>
    </section>
  );
}

function Steps() {
  const ref = useRevealOnScroll<HTMLOListElement>();

  return (
    <ol
      ref={ref}
      className="group/steps relative mt-14 md:mt-20 grid gap-4 md:grid-cols-3 md:gap-5"
    >
      {steps.map((s, i) => {
        const Icon = s.icon;
        const last = i === steps.length - 1;
        return (
          <li
            key={s.title}
            style={{ "--i": i } as CSSProperties}
            className="relative opacity-0 translate-y-5 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] [transition-delay:calc(var(--i)*160ms+100ms)] group-[.is-visible]/steps:opacity-100 group-[.is-visible]/steps:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0"
          >
            <article
              className={`group relative h-full overflow-hidden rounded-3xl p-6 md:p-9 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] md:hover:-translate-y-1 ${
                last
                  ? "bg-ink text-white shadow-[var(--shadow-lift)]"
                  : "bg-surface-alt/70 hairline hover:shadow-[var(--shadow-lift)]"
              }`}
            >
              {last && (
                <div aria-hidden className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/35 blur-3xl" />
              )}
              <div className="relative flex items-center justify-between">
                <span
                  className={`inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:-rotate-6 ${
                    last ? "bg-accent text-white" : "bg-ink text-white"
                  }`}
                >
                  <Icon size={24} />
                </span>
                <span
                  className={`font-display text-[2.75rem] md:text-[3.5rem] font-medium leading-none tracking-[-0.05em] ${
                    last ? "text-white/15" : "text-ink/10"
                  }`}
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="relative mt-5 md:mt-8 font-display text-[1.4rem] md:text-[1.75rem] font-medium tracking-[-0.03em] leading-[1.1]">
                {s.title}
              </h3>
              <p
                className={`relative mt-3 text-[0.975rem] leading-[1.65] ${
                  last ? "text-white/65" : "text-ink-muted"
                }`}
              >
                {s.body}
              </p>
            </article>
            {!last && (
              <span
                aria-hidden
                className="absolute left-1/2 -bottom-[18px] z-10 inline-flex h-8 w-8 -translate-x-1/2 rotate-90 items-center justify-center rounded-full bg-accent text-white shadow-[0_6px_16px_-4px_rgba(255,107,26,0.6)] md:left-auto md:-right-[22px] md:bottom-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:rotate-0"
              >
                <ArrowRight size={15} />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ───────────── How it makes you money ───────────── */

function MoneySection() {
  const [perDay, setPerDay] = useState(10);
  const sliderId = useId();
  const monthly = EXAMPLE.profit * perDay * 30;
  const yearly = monthly * 12;

  const parts = [
    { label: "Your stock", value: EXAMPLE.cost, className: "bg-ink/80" },
    { label: "Amazon fees", value: EXAMPLE.fees, className: "bg-ink/25" },
    { label: "Your profit", value: EXAMPLE.profit, className: "bg-accent" },
  ];

  return (
    <div className="mt-24 md:mt-32">
      <SectionHeading
        eyebrow="How it makes you money"
        title="Buy low. Amazon sells it. You keep the difference."
        intro="Every sale has three slices: what you paid for the stock, Amazon’s fees, and your profit. Here’s a real example from the course."
      />

      <div className="mt-12 md:mt-16 grid gap-5 lg:grid-cols-2">
        {/* One sale, broken down */}
        <Reveal variant="scale">
          <div className="h-full rounded-3xl border border-line bg-surface-alt/70 p-6 sm:p-8 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label-mono">One sale of one bundle</p>
                <p className="mt-2 font-display text-[2.75rem] md:text-[3.5rem] font-medium leading-none tracking-[-0.045em]">
                  {gbp(EXAMPLE.price)}
                </p>
              </div>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.75rem] font-medium text-accent-deep">
                Course example
              </span>
            </div>

            <div className="mt-8 flex h-14 overflow-hidden rounded-2xl">
              {parts.map((p) => (
                <div
                  key={p.label}
                  style={{ flexGrow: p.value }}
                  className={`${p.className} flex items-center justify-center font-mono text-[0.75rem] text-white first:rounded-l-2xl last:rounded-r-2xl`}
                >
                  {gbp(p.value)}
                </div>
              ))}
            </div>

            <ul className="mt-6 space-y-3">
              {parts.map((p) => (
                <li key={p.label} className="flex items-center justify-between gap-4 text-[0.95rem]">
                  <span className="flex items-center gap-3 text-ink-muted">
                    <span className={`h-3 w-3 rounded-full ${p.className}`} />
                    {p.label}
                  </span>
                  <span
                    className={`font-display tabular-nums ${
                      p.label === "Your profit" ? "text-[1.25rem] font-medium text-accent" : "text-ink"
                    }`}
                  >
                    {gbp(p.value)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-[0.875rem] leading-[1.6] text-ink-muted">
              Amazon stored it, packed the order, delivered it and dealt with
              the customer. Not you.
            </p>
          </div>
        </Reveal>

        {/* Scale it */}
        <Reveal variant="scale" delay={120}>
          <div className="relative h-full overflow-hidden rounded-3xl bg-ink p-6 sm:p-8 md:p-10 text-white">
            <div aria-hidden className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/55">
                Now multiply it
              </p>
              <label htmlFor={sliderId} className="mt-3 block text-[1.05rem] text-white/80">
                If that one product sold{" "}
                <span className="font-display text-[1.375rem] font-medium text-white tabular-nums">
                  {perDay}
                </span>{" "}
                {perDay === 1 ? "time a day…" : "times a day…"}
              </label>

              <input
                id={sliderId}
                type="range"
                min={1}
                max={50}
                value={perDay}
                onChange={(e) => setPerDay(Number(e.target.value))}
                className="money-range mt-6 w-full"
                style={{ "--fill": `${((perDay - 1) / 49) * 100}%` } as CSSProperties}
              />
              <div className="mt-2 flex justify-between font-mono text-[0.65rem] text-white/40">
                <span>1 / day</span>
                <span>50 / day</span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 md:p-5">
                  <p className="text-[0.8rem] text-white/55">Profit per month</p>
                  <p className="mt-1 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-none tracking-[-0.04em] text-accent tabular-nums">
                    {gbp(monthly, 0)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 md:p-5">
                  <p className="text-[0.8rem] text-white/55">Profit per year</p>
                  <p className="mt-1 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-none tracking-[-0.04em] tabular-nums">
                    {gbp(yearly, 0)}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-[0.95rem] leading-[1.6] text-white/75">
                And that&rsquo;s <span className="text-white">one</span> product.
                Every product you add is another stream working at the same time.
              </p>
              <p className="mt-5 text-[0.72rem] leading-[1.55] text-white/40">
                Illustrative maths using the course example ({gbp(EXAMPLE.profit)} profit
                per sale, 30-day month). Not a promise of earnings - results depend
                on the products you choose and the work you put in. See our{" "}
                <a href="/disclaimer" className="underline underline-offset-2 hover:text-white/70">
                  income disclaimer
                </a>
                .
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-5 flex flex-col items-start gap-5 rounded-3xl border border-line bg-surface p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-[620px]">
            <p className="font-display text-[1.375rem] md:text-[1.625rem] font-medium leading-[1.2] tracking-[-0.025em]">
              The model is simple. Picking the right products is the skill.
            </p>
            <p className="mt-2 text-[0.975rem] leading-[1.6] text-ink-muted">
              That&rsquo;s exactly what I teach you - 1-to-1, using the same
              system I use on my own business. You can start lean, with a small
              test batch, and only scale what sells.
            </p>
          </div>
          <a href="#apply" className="btn btn-primary btn-lg shrink-0">
            Show me how
            <ArrowRight size={18} className="btn-arrow" />
          </a>
        </div>
      </Reveal>
    </div>
  );
}
