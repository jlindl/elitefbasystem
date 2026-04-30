import type { Metadata } from "next";
import { CountUp } from "../components/count-up";
import { Footer } from "../components/footer";
import { Nav } from "../components/nav";
import { Reveal } from "../components/reveal";

export const metadata: Metadata = {
  title: "My Story — Jakub",
  description:
    "How Amazon gave me my life back. A story in seven chapters — by Jakub.",
};

export default function MyStoryPage() {
  return (
    <>
      <Nav />
      <main>
        <article>
          <ColdOpen />
          <ChapterCollege />
          <ChapterCorporate />
          <ChapterSpark />
          <ChapterFirstSale />
          <ChapterCrossroads />
          <ChapterLeap />
          <ChapterToday />
          <ClosingLine />
        </article>
      </main>
      <Footer />
    </>
  );
}

/* -------------------------------------------------- */
/* 1. Cold open                                       */
/* -------------------------------------------------- */

function ColdOpen() {
  return (
    <section className="relative min-h-[100svh] min-h-[700px] flex items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,107,26,0.06), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6 md:px-8 text-center">
        <Reveal delay={200}>
          <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-ink-subtle">
            A story in seven chapters
          </p>
        </Reveal>

        <Reveal delay={600}>
          <h1 className="mt-10 font-display font-medium tracking-[-0.03em] leading-[1.02] text-[clamp(2.75rem,8.5vw,7rem)]">
            How Amazon
            <br />
            <span className="font-serif font-normal text-ink">
              gave me my life back.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={1400}>
          <p className="mt-10 font-mono text-[0.75rem] tracking-[0.18em] uppercase text-ink-subtle">
            — Jakub
          </p>
        </Reveal>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span
          aria-hidden
          className="scroll-indicator block h-8 w-px bg-ink-muted"
        />
        <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ink-subtle">
          Scroll to begin
        </span>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 2. Chapter 01 — College                            */
/* -------------------------------------------------- */

function ChapterCollege() {
  return (
    <section className="bg-surface-alt py-28 md:py-40 transition-colors duration-700">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <p className="label-mono">Chapter 01</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-2 label-mono">The struggle</p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 font-mono text-[0.75rem] tracking-[0.14em] uppercase text-ink-subtle">
                [Year, City]
              </p>
            </Reveal>

            <Reveal delay={240}>
              <h2 className="mt-8 font-display font-medium tracking-[-0.025em] leading-[1.05] text-[clamp(2.25rem,4.6vw,4rem)]">
                I wasn&rsquo;t the kid with the grades.
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:pt-2">
            <Reveal delay={320}>
              <p className="text-[1rem] md:text-[1.125rem] leading-[1.75] text-ink-muted max-w-[60ch]">
                College didn&rsquo;t come easy to me. I worked hard &mdash;
                harder than people knew &mdash; but the grades I needed for
                the kind of jobs everyone said I should want? They never
                quite came. I remember sitting with my results, doing the
                math on what doors had just closed. Then I went and applied
                for what I could get.
              </p>
            </Reveal>

            <Reveal delay={500}>
              <div className="mt-12 max-w-[420px]">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden hairline shadow-[var(--shadow-soft)] grayscale">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://placehold.co/640x800/2A2A28/E8E5DD/png?text=Jakub+at+college"
                    alt="[IMAGE: Jakub at college, b&w, candid — desk / books / computer]"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 3. Chapter 02 — Corporate (dark)                   */
/* -------------------------------------------------- */

function ChapterCorporate() {
  return (
    <section
      className="py-28 md:py-40 text-white"
      style={{ backgroundColor: "var(--color-ink-dark)" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="mx-auto max-w-[640px]">
          <Reveal>
            <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-accent">
              Chapter 02
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-2 font-mono text-[0.75rem] tracking-[0.18em] uppercase text-white/60">
              The corporate world
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 font-mono text-[0.75rem] tracking-[0.14em] uppercase text-white/50">
              AJ Bell · [Year started]
            </p>
          </Reveal>

          <Reveal delay={240}>
            <h2 className="mt-8 font-display font-medium tracking-[-0.025em] leading-[1.05] text-[clamp(2.25rem,4.6vw,4rem)]">
              A webchat agent in a tower of suits.
            </h2>
          </Reveal>

          <div className="mt-10 space-y-6 text-[1rem] md:text-[1.125rem] leading-[1.75] text-white/75 max-w-[60ch]">
            <Reveal delay={320}>
              <p>
                I got a job as a webchat agent at AJ Bell. It taught me more
                than I&rsquo;d realised at the time &mdash; how to talk to
                people, how to handle pressure, how to show up every day even
                when you didn&rsquo;t want to.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <p>
                But I knew, deep down, there had to be more to life than this.
                I&rsquo;d always loved travelling. Visiting family. Spending
                my time how I wanted to &mdash; not how someone else&rsquo;s
                calendar told me to.
              </p>
            </Reveal>
          </div>

          <Reveal delay={520}>
            <FactStrip />
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-16 rounded-2xl overflow-hidden">
              <div
                className="relative aspect-[16/9] grayscale"
                style={{
                  background:
                    "linear-gradient(135deg, #2a2a28 0%, #1a1a18 50%, #131311 100%)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.18]"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.18), transparent 60%)",
                  }}
                />
                <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-medium tracking-wide text-white/70">
                  [IMAGE: A wide, slightly desaturated shot of an office /
                  commute / corporate setting]
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FactStrip() {
  const facts = [
    ["Mon–Fri", "9 to 5"],
    ["Lunch", "30 mins"],
    ["Holidays", "25 days/year"],
    ["Freedom", "none"],
  ];
  return (
    <dl className="mt-14 grid grid-cols-2 md:grid-cols-4">
      {facts.map(([label, value], i) => (
        <div
          key={label}
          className={`px-5 py-5 ${
            i > 0 ? "md:border-l border-accent/30" : ""
          } ${i > 1 ? "border-t md:border-t-0 border-accent/30" : ""}`}
        >
          <dt className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-accent/80">
            {label}
          </dt>
          <dd className="mt-2 font-mono text-[0.95rem] text-white/85">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------- */
/* 4. Chapter 03 — The Spark                          */
/* -------------------------------------------------- */

function ChapterSpark() {
  return (
    <section className="bg-bg py-32 md:py-44">
      <div className="mx-auto max-w-[820px] px-6 md:px-8 text-center">
        <Reveal>
          <p className="label-mono">Chapter 03</p>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-2 label-mono">The spark</p>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 font-mono text-[0.75rem] tracking-[0.14em] uppercase text-ink-subtle">
            Summer 2025
          </p>
        </Reveal>

        <Reveal delay={240}>
          <h2 className="mt-10 font-display font-medium tracking-[-0.025em] leading-[1.05] text-[clamp(2.25rem,4.6vw,4rem)]">
            Then I found Amazon FBA.
          </h2>
        </Reveal>

        <Reveal delay={420}>
          <p className="mt-10 mx-auto max-w-[56ch] text-[1rem] md:text-[1.125rem] leading-[1.75] text-ink-muted">
            Summer 2025. I&rsquo;d been reading, watching, lurking on forums
            for months. Something about Amazon FBA kept pulling me back
            &mdash; the idea that you could build a real product business
            from a laptop, on the side, without asking anyone&rsquo;s
            permission. I decided to try.
          </p>
        </Reveal>

        <Reveal delay={620}>
          <p className="mt-16 font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.45] text-ink">
            &ldquo;It was the first time work felt like mine.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 5. Chapter 04 — The First Sale                     */
/* -------------------------------------------------- */

function ChapterFirstSale() {
  return (
    <section className="relative bg-surface py-32 md:py-44 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,107,26,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6 md:px-8 text-center">
        <Reveal>
          <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-accent">
            Chapter 04
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-2 label-mono">The first sale</p>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-14 font-mono text-[0.85rem] tracking-[0.14em] uppercase text-ink-subtle">
            My first sale came on
          </p>
        </Reveal>

        <Reveal delay={400}>
          <p className="mt-8 font-display font-medium tracking-[-0.04em] leading-[0.95] text-[clamp(3rem,12vw,9rem)] text-ink">
            August 14,{" "}
            <span className="draw-underline">2025</span>
          </p>
        </Reveal>

        <Reveal delay={700}>
          <p className="mt-16 mx-auto max-w-[58ch] font-serif text-[clamp(1.375rem,2.6vw,2rem)] leading-[1.45] text-ink-muted">
            &ldquo;It was £[PLACEHOLDER]. It changed everything &mdash; not
            because of the money, but because someone, somewhere, had bought
            something I&rsquo;d put into the world.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 6. Chapter 05 — The Crossroads                     */
/* -------------------------------------------------- */

function ChapterCrossroads() {
  const beats = [
    {
      label: "Moment 01",
      title: "The day Amazon paid me what AJ Bell did.",
      body:
        "[Date]. I looked at my Seller Central dashboard, then I looked at my payslip. They were the same. For the first time, two paths sat side by side on a screen — and one of them I'd built myself.",
    },
    {
      label: "Moment 02",
      title: "The promotion that didn't fix anything.",
      body:
        "Around the same time, I got promoted. Senior webchat agent, managing a team. It should've felt like a win. It didn't. I was good at it — and I knew, with absolute clarity, that being good at something isn't the same as wanting it.",
    },
    {
      label: "Moment 03",
      title: "Wasting my life one Monday at a time.",
      body:
        "Every Sunday night I felt it. The dread. Not because the job was terrible — it wasn't. Because every hour spent there was an hour not spent on the thing I actually cared about.",
    },
  ];

  return (
    <section className="bg-surface-alt py-28 md:py-40">
      <div className="mx-auto max-w-[920px] px-6 md:px-8">
        <Reveal>
          <p className="label-mono">Chapter 05</p>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-2 label-mono">The crossroads</p>
        </Reveal>
        <Reveal delay={200}>
          <h2 className="mt-8 font-display font-medium tracking-[-0.025em] leading-[1.05] text-[clamp(2.25rem,4.5vw,3.75rem)]">
            Three moments that changed everything.
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-20 divide-y divide-line">
          {beats.map((beat, i) => (
            <Reveal key={beat.label} delay={i * 120}>
              <div className="grid md:grid-cols-12 gap-6 md:gap-10 py-12 md:py-14">
                <div className="md:col-span-3">
                  <p className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ink-subtle">
                    {beat.label}
                  </p>
                </div>
                <div className="md:col-span-9 max-w-[60ch]">
                  <h3 className="font-display text-[1.5rem] md:text-[1.875rem] font-semibold tracking-[-0.015em] leading-[1.2] text-ink">
                    {beat.title}
                  </h3>
                  <p className="mt-5 text-[1rem] md:text-[1.0625rem] leading-[1.75] text-ink-muted">
                    {beat.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 7. Chapter 06 — The Leap                           */
/* -------------------------------------------------- */

function ChapterLeap() {
  return (
    <section
      className="relative"
      style={{
        background:
          "linear-gradient(to bottom, var(--color-ink-dark) 0%, var(--color-ink-dark) 60%, var(--color-bg) 60%, var(--color-bg) 100%)",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 pt-28 md:pt-40 pb-28 md:pb-40">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-7 text-white">
            <Reveal>
              <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-accent">
                Chapter 06
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-2 font-mono text-[0.75rem] tracking-[0.18em] uppercase text-white/60">
                The leap
              </p>
            </Reveal>

            <Reveal delay={200}>
              <h2 className="mt-10 font-display font-medium tracking-[-0.04em] leading-[0.95] text-[clamp(4rem,12vw,9rem)]">
                I quit.
              </h2>
            </Reveal>

            <Reveal delay={400}>
              <p className="mt-8 font-serif text-[clamp(1.25rem,2.4vw,1.875rem)] leading-[1.5] text-white/70 max-w-[40ch]">
                Two words I&rsquo;d been afraid to say for two years.
              </p>
            </Reveal>

            <Reveal delay={600}>
              <p className="mt-32 md:mt-44 max-w-[58ch] text-[1rem] md:text-[1.125rem] leading-[1.75] text-ink-muted">
                I won&rsquo;t pretend it was easy. The fear of leaving a
                steady paycheque doesn&rsquo;t disappear just because
                you&rsquo;ve got something working on the side. But I&rsquo;d
                done the math. I&rsquo;d done the work. And I&rsquo;d watched
                too many people stay in jobs they hated because leaving felt
                risky &mdash; when staying was the bigger risk all along.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-5 md:pt-10">
            <Reveal delay={300}>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://placehold.co/720x900/F4F2EC/0A0A0A/png?text=The+day+I+quit"
                  alt="[IMAGE: Jakub on the day he quit — or the day after]"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 8. Chapter 07 — Today / Freedom                    */
/* -------------------------------------------------- */

function ChapterToday() {
  return (
    <section className="relative bg-bg py-32 md:py-44 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(255,107,26,0.14), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-8">
        {/* Part 1 — title */}
        <div className="max-w-[1000px]">
          <Reveal>
            <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-accent">
              Chapter 07
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-2 label-mono">Today</p>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 font-mono text-[0.75rem] tracking-[0.14em] uppercase text-ink-subtle">
              [Current month/year]
            </p>
          </Reveal>

          <Reveal delay={260}>
            <h2 className="mt-10 font-display font-medium tracking-[-0.04em] leading-[0.98] text-[clamp(3rem,9vw,7.5rem)]">
              Now I do what I want.
            </h2>
          </Reveal>
        </div>

        {/* Part 2 — stats */}
        <Reveal delay={200}>
          <dl className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 border-t border-line">
            <Stat
              label="In Amazon revenue to date"
              prefix="£"
              to={100000}
              suffix="+"
            />
            <Stat
              label="Average weekly revenue"
              prefix="£"
              to={5000}
              displayFinal="3,000–5,000"
              accent
              border
            />
            <Stat label="Holidays a year" to={10} suffix="×" border />
          </dl>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-10 font-mono text-[0.7rem] tracking-[0.16em] uppercase text-ink-subtle">
            Real numbers, real time, real business. Updated [month/year].
          </p>
        </Reveal>

        {/* Part 3 — reflection */}
        <Reveal delay={200}>
          <p className="mt-28 md:mt-36 mx-auto max-w-[58ch] text-center font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.45] text-ink">
            &ldquo;Amazon didn&rsquo;t make me rich. It made me free. I get
            to pick where I am, who I&rsquo;m with, and what I work on. To
            me, that&rsquo;s the only currency that&rsquo;s ever really
            mattered.&rdquo;
          </p>
        </Reveal>

        {/* Part 4 — freedom moments */}
        <FreedomGrid />
      </div>
    </section>
  );
}

function Stat({
  label,
  prefix,
  suffix,
  to,
  displayFinal,
  accent = false,
  border = false,
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  to: number;
  displayFinal?: string;
  accent?: boolean;
  border?: boolean;
}) {
  return (
    <div
      className={`min-w-0 py-10 md:py-14 px-2 md:px-5 ${
        border ? "md:border-l border-line border-t md:border-t-0" : ""
      }`}
    >
      <CountUp
        to={to}
        prefix={prefix}
        suffix={suffix}
        displayFinal={displayFinal}
        className={`block font-display font-medium tracking-[-0.03em] leading-[1.05] break-words text-[clamp(2rem,4.5vw,3.75rem)] ${
          accent ? "text-accent" : "text-ink"
        }`}
      />
      <p className="mt-5 label-mono">{label}</p>
    </div>
  );
}

function FreedomGrid() {
  const moments = [
    { label: "[Marrakech, March 2026]", img: "Jakub+on+holiday" },
    { label: "[Family + friends]", img: "Family+gathering" },
    { label: "[Coffee shop, anywhere]", img: "Working+from+anywhere" },
    { label: "[Outside of work]", img: "Hobby+%2F+travel" },
  ];

  return (
    <div className="mt-28 md:mt-36">
      <Reveal>
        <p className="label-mono">What freedom looks like</p>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {moments.map((m, i) => (
          <Reveal key={m.img} delay={i * 100}>
            <figure className="group">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden hairline shadow-[var(--shadow-soft)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://placehold.co/640x800/F4F2EC/0A0A0A/png?text=${m.img}`}
                  alt={`[IMAGE: ${m.label}]`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 mix-blend-overlay opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, white, transparent 60%)",
                  }}
                />
              </div>
              <figcaption className="mt-4 font-mono text-[0.7rem] tracking-[0.14em] uppercase text-ink-subtle">
                {m.label}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------- */
/* 9. Closing line                                    */
/* -------------------------------------------------- */

function ClosingLine() {
  return (
    <section className="relative bg-bg min-h-[100svh] min-h-[700px] flex flex-col items-center justify-between py-24 md:py-32 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,107,26,0.10), transparent 55%)",
        }}
      />

      <div className="relative flex-1 flex items-center">
        <div className="mx-auto max-w-[1100px] px-6 md:px-8 text-center">
          <Reveal>
            <h2 className="font-display font-medium tracking-[-0.03em] leading-[1.05] text-[clamp(2.5rem,7vw,6rem)] text-ink">
              Freedom is the greatest{" "}
              <span className="font-serif font-normal text-accent">gift</span>{" "}
              a human can be given.
            </h2>
          </Reveal>
          <Reveal delay={400}>
            <p className="mt-10 font-mono text-[0.75rem] tracking-[0.18em] uppercase text-ink-subtle">
              — Jakub
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative w-full max-w-[1100px] mx-auto px-6 md:px-8">
        <Reveal delay={600}>
          <div className="flex flex-col items-center gap-5">
            <a
              href="/#apply"
              className="inline-flex h-12 items-center rounded-full border border-accent/40 bg-accent-soft px-7 text-[0.95rem] font-medium text-accent transition-all duration-200 hover:-translate-y-px hover:bg-accent hover:text-white hover:border-accent"
            >
              If you want this too — apply for mentorship →
            </a>
            <a
              href="/"
              className="font-mono text-[0.75rem] tracking-[0.14em] uppercase text-ink-subtle hover:text-ink transition-colors"
            >
              Or, back to home →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
