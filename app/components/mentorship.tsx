import {
  ArrowRight,
  Calendar,
  Check,
  FileText,
  MessageCircle,
  Wrench,
} from "./icons";
import { Reveal } from "./reveal";

const items = [
  "Weekly 1-to-1 calls",
  "Direct messaging access",
  "Full-time support - fast responses",
];

const valuePillars = [
  {
    icon: Calendar,
    title: "Weekly 1-to-1 strategy calls",
    body: "A real call. Camera on. We open your Seller Central, your P&L, your supplier threads - and we move the needle on whichever number matters most that week.",
    meta: "20 min · every week · recorded for you",
  },
  {
    icon: MessageCircle,
    title: "Direct line, not a ticket queue",
    body: "Text me when you need me. Supplier ghosting you? PPC report doesn't make sense? Customs panic on a Sunday? You get the same person every time - and a real reply, usually in hours.",
    meta: "Avg. response: under 4 hours · weekdays",
  },
  {
    icon: FileText,
    title: "My SOPs, templates & scripts",
    body: "Every supplier email, negotiation script, listing audit, PPC report, and launch checklist I use on my own brand. Yours to copy, paste, and adapt - no fluff, no theory, no PDF garbage.",
    meta: "40+ templates · updated continuously",
  },
  {
    icon: Wrench,
    title: "Live builds & teardowns",
    body: "Recorded sessions where I tear apart real listings, real ad accounts, real supplier quotes - including yours. You learn how I think, not just what I'd do.",
    meta: "New teardown every 2 weeks",
  },
];

const deliverables = [
  "Full access to the Elite FBA course",
  "9 learning modules & video walkthroughs",
  "Weekly 1-to-1 calls with Jakub",
  "Direct messaging - full-time support",
  "Live launches & listing teardowns",
  "Every SOP, script & template I use",
  "Private team community + meetups",
  "Lifetime updates as Amazon evolves",
];

export function Mentorship() {
  return (
    <section id="mentorship" className="scroll-mt-20 md:scroll-mt-24 relative py-24 md:py-32 overflow-hidden">
      {/* warm radial bleed - matches hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 8% 0%, rgba(255,107,26,0.07), transparent 45%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-8">
        {/* ─────────────  Intro  ───────────── */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Reveal as="div" className="md:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden hairline shadow-[var(--shadow-soft)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/jakub%20portrait%202.jpeg"
                alt="Jakub portrait"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal>
              <p className="label-mono">05 / Mentorship</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.2vw,3.5rem)]">
                You&rsquo;re not buying a course. You&rsquo;re hiring a partner.
              </h2>
            </Reveal>

            <div className="mt-7 space-y-5 text-[1rem] md:text-[1.05rem] leading-[1.7] text-ink-muted max-w-[640px]">
              <Reveal delay={140}>
                <p>
                  When I say &ldquo;1-to-1,&rdquo; I mean it literally. We jump
                  on a call every week to look at your business - your
                  products, your numbers, your blockers. Between calls, you can
                  message me directly, and you&rsquo;ll get a real reply from
                  the person who built the system.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  &ldquo;Full-time support&rdquo; isn&rsquo;t a tagline. It
                  means I work on this every weekday. Most messages get a
                  response in under a few hours. Supplier negotiations, listing
                  reviews, PPC reports, customs panic - that&rsquo;s
                  what I&rsquo;m here for.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <p>
                  This is also exactly why I keep the program small. I will
                  not take more students than I can give real attention to. If
                  spots are full, you&rsquo;ll go on a waiting list -
                  not be talked into joining anyway.
                </p>
              </Reveal>
            </div>

            <Reveal delay={320}>
              <ul className="mt-9 space-y-3">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Check size={14} />
                    </span>
                    <span className="text-[0.975rem] text-ink">{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* ─────────────  Value pillars  ───────────── */}
        <div className="mt-28 md:mt-36">
          <div className="max-w-[760px]">
            <Reveal>
              <p className="label-mono">What you actually get</p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.4vw,2.75rem)]">
                Four things every week. Forever.
              </h3>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.55] text-ink-muted">
                The mentorship isn&rsquo;t a vibe - it&rsquo;s a
                schedule. Here&rsquo;s exactly what lands in your week, every
                week.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-5">
            {valuePillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 100}>
                  <article className="group h-full flex flex-col rounded-2xl bg-surface hairline p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon size={20} />
                    </span>
                    <h4 className="mt-6 font-display text-[1.375rem] md:text-[1.5rem] font-semibold tracking-[-0.015em] leading-[1.2]">
                      {p.title}
                    </h4>
                    <p className="mt-4 text-[0.975rem] text-ink-muted leading-[1.65] flex-1">
                      {p.body}
                    </p>
                    <p className="mt-6 pt-5 border-t border-line label-mono">
                      {p.meta}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>


        {/* ─────────────  Process / week-in-the-life  ───────────── */}
        <div className="mt-28 md:mt-36">
          <div className="max-w-[760px]">
            <Reveal>
              <p className="label-mono">A week with me</p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.4vw,2.75rem)]">
                Here&rsquo;s what week one looks like.
              </h3>
            </Reveal>
          </div>

          <ol className="mt-14 grid md:grid-cols-4 gap-5">
            {[
              {
                day: "Day 1",
                title: "Onboarding call",
                body: "We go deep on your business, your goals, and the next 90 days. You leave with a written plan.",
              },
              {
                day: "Day 2",
                title: "Inbox open",
                body: "WhatsApp invite hits. Ask anything - supplier, listing, ad, or mindset.",
              },
              {
                day: "Day 3–6",
                title: "Daily back-and-forth",
                body: "I review your work in-thread. Voice notes, screenshots, redlines - fast feedback, no waiting.",
              },
              {
                day: "Day 7",
                title: "Weekly 1-to-1",
                body: "We screenshare. We move one number. Recording lands in your library by the next morning.",
              },
            ].map((s, i) => (
              <Reveal key={s.day} delay={i * 100}>
                <li className="relative h-full flex flex-col rounded-2xl bg-surface hairline p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                  <span className="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-accent">
                    {s.day}
                  </span>
                  <h4 className="mt-3 font-display text-[1.25rem] font-semibold tracking-[-0.015em] leading-[1.2]">
                    {s.title}
                  </h4>
                  <p className="mt-3 text-[0.95rem] text-ink-muted leading-[1.6] flex-1">
                    {s.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ─────────────  Pricetag block  ───────────── */}
        <div className="mt-28 md:mt-36">
          <div className="max-w-[760px]">
            <Reveal>
              <p className="label-mono">The program</p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.4vw,2.75rem)]">
                One program. Limited spots. No upsells.
              </h3>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.55] text-ink-muted">
                Everything above - the calls, the templates, the
                community, the lifetime updates - in one straightforward
                program. We&rsquo;ll talk through the details together.
              </p>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div className="mt-14 grid md:grid-cols-12 gap-6 items-stretch">
              {/* Pricetag card */}
              <div className="md:col-span-5">
                <div className="relative h-full rounded-2xl bg-surface hairline p-8 md:p-10 shadow-[var(--shadow-lift)]">
                  <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.75rem] font-medium tracking-wide text-accent">
                    Limited spots
                  </span>
                  <h4 className="mt-6 font-display text-[1.625rem] md:text-[1.875rem] font-semibold tracking-[-0.02em] leading-[1.15]">
                    The Elite FBA Mentorship
                  </h4>
                  <p className="mt-3 text-[0.95rem] text-ink-muted leading-[1.55]">
                    Full access to the course and mentorship. Direct 1-to-1s with
                    Jakub, plus the team you&rsquo;ll build alongside your
                    journey.
                  </p>

                  <a
                    href="#apply"
                    className="mt-9 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 text-[0.95rem] font-medium text-white shadow-[0_1px_2px_rgba(10,10,10,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep hover:shadow-[0_8px_24px_rgba(255,107,26,0.32)]"
                  >
                    Apply for a spot
                    <ArrowRight size={16} />
                  </a>
                  <p className="mt-5 text-center font-mono text-[0.7rem] tracking-[0.1em] uppercase text-ink-subtle">
                    Application required
                  </p>
                </div>
              </div>

              {/* Includes card */}
              <div className="md:col-span-7">
                <div className="h-full rounded-2xl bg-surface-alt hairline p-8 md:p-10">
                  <p className="label-mono">Everything included</p>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-accent shrink-0">
                          <Check size={14} />
                        </span>
                        <span className="text-[0.95rem] text-ink leading-[1.5]">
                          {d}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-8 border-t border-line">
                    <p className="font-display text-[1.125rem] md:text-[1.25rem] font-medium tracking-[-0.01em] leading-[1.4] text-ink">
                      &ldquo;If one supplier negotiation, one PPC fix, or one
                      flop avoided pays for the program - you&rsquo;re
                      already ahead. Most students cross that line in their
                      first month.&rdquo;
                    </p>
                    <p className="mt-4 label-mono">- Jakub</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
