import { Photo } from "./photo";
import {
  ArrowRight,
  Calendar,
  Check,
  FileText,
  MessageCircle,
  Wrench,
} from "./icons";
import { MoreOnMobile } from "./more-on-mobile";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { WeekTimeline } from "./week-timeline";

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

export function Mentorship() {
  return (
    <section
      id="mentorship"
      className="scroll-mt-20 md:scroll-mt-24 relative overflow-hidden bg-surface-alt py-16 md:py-36 border-y border-line"
    >
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        {/* ─────────────  Intro  ───────────── */}
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <Reveal variant="scale" className="md:col-span-5">
            <div className="relative">
              <div className="relative aspect-[5/4] md:aspect-[4/5] overflow-hidden rounded-3xl hairline shadow-[var(--shadow-lift)]">
                <Photo
                  src="/jakub portrait 2.jpeg"
                  alt="Jakub, Elite FBA mentor"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover object-[50%_35%] md:object-center"
                />
              </div>
              <div className="absolute -bottom-5 left-4 right-4 sm:left-auto sm:-right-4 md:-right-8 sm:w-[250px] rounded-2xl border border-line bg-white/90 p-4 shadow-[var(--shadow-float)] backdrop-blur-xl">
                <p className="flex items-center gap-2 text-[0.8rem] text-ink-muted">
                  <span className="live-dot !h-1.5 !w-1.5" />
                  Avg. response time
                </p>
                <p className="mt-1 font-display text-[1.5rem] font-medium tracking-[-0.03em]">
                  Under 4 hours
                </p>
              </div>
            </div>
          </Reveal>

          <div className="md:col-span-7 pt-6 md:pt-0">
            <SectionHeading
              index="05"
              eyebrow="Mentorship"
              title="You’re not buying a course. You’re hiring a partner."
            />

            <div className="mt-7 max-w-[640px] space-y-5 text-[1rem] md:text-[1.05rem] leading-[1.75] text-ink-muted">
              <Reveal delay={140}>
                <p>
                  When I say &ldquo;1-to-1,&rdquo; I mean it literally. We jump
                  on a call every week to look at your business - your
                  products, your numbers, your blockers. Between calls, you can
                  message me directly, and you&rsquo;ll get a real reply from
                  the person who built the system.
                </p>
              </Reveal>
              <MoreOnMobile>
                <div className="space-y-5">
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
              </MoreOnMobile>
            </div>

            <Reveal delay={320}>
              <ul className="mt-9 flex flex-wrap gap-2.5">
                {items.map((it) => (
                  <li
                    key={it}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[0.875rem] text-ink"
                  >
                    <Check size={14} className="text-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* ─────────────  Value pillars  ───────────── */}
        <div className="mt-28 md:mt-40">
          <SectionHeading
            eyebrow="What you actually get"
            title="Four things every week. Forever."
            intro="The mentorship isn’t a vibe - it’s a schedule. Here’s exactly what lands in your week, every week."
          />

          <div className="mt-12 md:mt-16 grid gap-4 md:grid-cols-2 md:gap-5">
            {valuePillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={(i % 2) * 100}>
                  <article className="group flex h-full flex-col rounded-3xl bg-surface hairline p-6 sm:p-9 md:p-10 transition-[box-shadow,transform] duration-500 ease-[var(--ease-out-expo)] hover:shadow-[var(--shadow-lift)] md:hover:-translate-y-1">
                    <div className="flex items-center gap-4 md:block">
                    <span className="inline-flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl md:rounded-2xl bg-accent-soft text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                      <Icon size={20} />
                    </span>
                    <h3 className="md:mt-7 font-display text-[1.375rem] md:text-[1.6rem] font-medium tracking-[-0.025em] leading-[1.2]">
                      {p.title}
                    </h3>
                    </div>
                    <p className="mt-4 md:mt-3.5 flex-1 text-[0.975rem] leading-[1.7] text-ink-muted">
                      {p.body}
                    </p>
                    <p className="mt-5 md:mt-7 border-t border-line pt-4 md:pt-5 label-mono">
                      {p.meta}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ─────────────  Week one  ───────────── */}
        <div className="mt-28 md:mt-40">
          <SectionHeading
            eyebrow="A week with me"
            title="Here’s what week one looks like."
          />
          <WeekTimeline />

          <Reveal>
            <div className="mt-14 flex flex-col items-start gap-4 rounded-3xl bg-ink p-7 sm:p-9 md:flex-row md:items-center md:justify-between md:p-10">
              <p className="max-w-[560px] font-display text-[1.25rem] md:text-[1.5rem] font-medium leading-[1.3] tracking-[-0.02em] text-white">
                &ldquo;If one supplier negotiation, one PPC fix, or one flop
                avoided pays for the program - you&rsquo;re already
                ahead. Most students cross that line in their first
                month.&rdquo;
              </p>
              <a href="#apply" className="btn btn-primary shrink-0">
                Apply for a spot
                <ArrowRight size={16} className="btn-arrow" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
