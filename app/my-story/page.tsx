import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { CountUp } from "../components/count-up";
import { Footer } from "../components/footer";
import { ArrowDown, ArrowRight, Check, Package, TrendingUp, X } from "../components/icons";
import { Nav } from "../components/nav";
import { Photo } from "../components/photo";
import { Reveal, RevealWords, ScrollHighlight } from "../components/reveal";
import { ChapterRail } from "./chapter-rail";

export const metadata: Metadata = {
  title: "My Story - Jakub",
  description:
    "How Amazon gave me my life back. A story in seven chapters - by Jakub.",
};

const chapters = [
  { id: "chapter-1", n: "01", title: "The early hustle" },
  { id: "chapter-2", n: "02", title: "The corporate world" },
  { id: "chapter-3", n: "03", title: "The spark" },
  { id: "chapter-4", n: "04", title: "The first sale" },
  { id: "chapter-5", n: "05", title: "The crossroads" },
  { id: "chapter-6", n: "06", title: "The leap" },
  { id: "chapter-7", n: "07", title: "Today" },
];

const h2 =
  "mt-6 md:mt-8 font-display font-medium tracking-[-0.03em] leading-[1.04] text-balance text-[clamp(2.125rem,4.6vw,3.75rem)]";
const bodyLight =
  "space-y-5 max-w-[60ch] text-[1rem] md:text-[1.1rem] leading-[1.75] text-ink-muted";
const bodyDark =
  "space-y-5 max-w-[60ch] text-[1rem] md:text-[1.1rem] leading-[1.75] text-white/70";

export default function MyStoryPage() {
  return (
    <>
      <Nav />
      <ChapterRail chapters={chapters} />
      <main>
        <article>
          <StoryHero />
          <ChapterHustle />
          <ChapterCorporate />
          <ChapterSpark />
          <ChapterFirstSale />
          <ChapterCrossroads />
          <ChapterLeap />
          <ChapterToday />
          <Closing />
        </article>
      </main>
      <Footer />
    </>
  );
}

/* -------------------------------------------------- */
/* Shared pieces                                      */
/* -------------------------------------------------- */

function ChapterHeader({
  n,
  title,
  meta,
  dark = false,
  center = false,
}: {
  n: string;
  title: string;
  meta?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal>
      <div className={`flex items-end gap-4 ${center ? "justify-center" : ""}`}>
        <span className="font-display text-[3.25rem] md:text-[4.5rem] font-medium leading-[0.8] tracking-[-0.06em] text-accent tabular-nums">
          {n}
        </span>
        <div className="pb-0.5 text-left font-mono text-[0.68rem] uppercase leading-[1.7] tracking-[0.14em]">
          <p className={dark ? "text-white/45" : "text-ink-subtle"}>
            Chapter {n} / 07{meta ? ` · ${meta}` : ""}
          </p>
          <p className={dark ? "text-white" : "text-ink"}>{title}</p>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Head, photo, body. Phones stack them in that order so a picture breaks up
 * the reading early; from md the photo sits beside the text.
 */
function ChapterGrid({
  head,
  photo,
  body,
  flip = false,
}: {
  head: ReactNode;
  photo: ReactNode;
  body: ReactNode;
  flip?: boolean;
}) {
  const text = flip ? "md:col-start-6 md:col-span-7" : "md:col-span-7";
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-x-16 md:gap-y-8">
      <div className={`${text} md:row-start-1 md:self-end`}>{head}</div>
      <div
        className={`md:row-span-2 md:row-start-1 md:col-span-5 md:self-center ${
          flip ? "md:col-start-1" : "md:col-start-8"
        }`}
      >
        {photo}
      </div>
      <div className={`${text} md:row-start-2 md:self-start`}>{body}</div>
    </div>
  );
}

function StoryPhoto({
  src,
  alt,
  aspect,
  position = "object-center",
  caption,
  sizes = "(min-width: 768px) 40vw, 100vw",
}: {
  src: string;
  alt: string;
  aspect: string;
  position?: string;
  caption?: string;
  sizes?: string;
}) {
  return (
    <Reveal variant="scale">
      <figure
        className={`relative ${aspect} overflow-hidden rounded-3xl bg-surface-alt hairline shadow-[var(--shadow-lift)]`}
      >
        <Photo src={src} alt={alt} fill sizes={sizes} className={`object-cover ${position}`} />
        {caption && (
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white backdrop-blur-md">
            {caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

/* -------------------------------------------------- */
/* Hero                                               */
/* -------------------------------------------------- */

const collage = [
  {
    src: "/jakub kid.jpeg",
    alt: "Jakub as a kid",
    label: "Then",
    position: "object-[62%_50%]",
    className: "left-[1%] top-[13%] -rotate-[7deg] md:group-hover:-translate-x-4 md:group-hover:-rotate-[10deg]",
  },
  {
    src: "/chapter 2 image.jpeg",
    alt: "Jakub at his desk in the office during his 9-5",
    label: "The 9-5",
    position: "object-[50%_35%]",
    className: "left-[27%] top-0 z-10 rotate-[2deg] md:group-hover:-translate-y-2",
  },
  {
    src: "/marbella.jpeg",
    alt: "Working on a laptop by the pool in Marbella",
    label: "Now",
    position: "object-center",
    className: "right-[1%] top-[15%] z-20 rotate-[8deg] md:group-hover:translate-x-4 md:group-hover:rotate-[11deg]",
  },
];

function StoryHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 md:pt-40 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 40%, rgba(255,107,26,0.10), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">
                <span className="eyebrow-index">My story</span>
                <span className="eyebrow-rule" />
                7 chapters · 4 min read
              </p>
            </Reveal>
            <h1 className="mt-6 font-display font-medium tracking-[-0.04em] leading-[0.98] text-[clamp(2.75rem,7vw,5.75rem)]">
              <RevealWords text="How Amazon" className="block" />
              <RevealWords
                delay={160}
                text="gave me my life back."
                className="block font-serif font-normal tracking-[-0.02em]"
              />
            </h1>
            <Reveal delay={300}>
              <p className="mt-6 max-w-[520px] text-[1.05rem] md:text-[1.15rem] leading-[1.65] text-ink-muted">
                From selling sweets in the school corridor, to a finance job I
                couldn&rsquo;t see myself staying in, to quitting it for a
                business I built on Amazon. This is the whole thing - including
                the parts that didn&rsquo;t work.
              </p>
            </Reveal>
            <Reveal delay={380}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#chapter-1" className="btn btn-primary btn-lg">
                  Start reading
                  <ArrowDown size={17} />
                </a>
                <a href="#chapter-7" className="btn btn-secondary btn-lg">
                  Skip to today
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal variant="scale" delay={200}>
              <div className="group relative mx-auto aspect-[5/4] w-full max-w-[560px]">
                {collage.map((c) => (
                  <figure
                    key={c.src}
                    className={`absolute w-[46%] aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl border-4 border-white bg-surface-alt shadow-[var(--shadow-lift)] transition-transform duration-700 ease-[var(--ease-out-expo)] ${c.className}`}
                  >
                    <Photo
                      src={c.src}
                      alt={c.alt}
                      fill
                      preload={c.label === "The 9-5"}
                      sizes="(min-width: 1024px) 260px, 46vw"
                      className={`object-cover ${c.position}`}
                    />
                    <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[0.58rem] md:text-[0.62rem] uppercase tracking-[0.14em] text-white backdrop-blur-md">
                      {c.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Chapter index */}
        <Reveal delay={200}>
          <div className="mt-14 md:mt-20 border-t border-line pt-6">
            <p className="label-mono">Chapters</p>
            <ol className="-mx-5 mt-4 flex snap-x snap-mandatory scroll-px-5 gap-2 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {chapters.map((c) => (
                <li key={c.id} className="shrink-0 snap-start">
                  <a
                    href={`#${c.id}`}
                    className="group flex h-full items-center gap-2.5 rounded-full lg:rounded-2xl border border-line bg-surface px-4 py-2.5 lg:flex-col lg:items-start lg:gap-1.5 lg:px-4 lg:py-3.5 transition-colors hover:border-ink/30"
                  >
                    <span className="font-mono text-[0.7rem] text-accent">{c.n}</span>
                    <span className="whitespace-nowrap text-[0.875rem] font-medium text-ink">
                      {c.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 01 - The early hustle                              */
/* -------------------------------------------------- */

function ChapterHustle() {
  return (
    <section id="chapter-1" className="scroll-mt-20 bg-surface-alt py-16 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <ChapterGrid
          head={
            <>
              <ChapterHeader n="01" title="The early hustle" />
              <Reveal delay={120}>
                <h2 className={h2}>I was always the kid with a hustle.</h2>
              </Reveal>
            </>
          }
          photo={
            <StoryPhoto
              src="/jakub kid.jpeg"
              alt="Jakub as a kid"
              aspect="aspect-[4/3] md:aspect-[4/5]"
              position="object-[62%_45%]"
            />
          }
          body={
            <div className={bodyLight}>
              <Reveal>
                <p>
                  From a young age, I was obsessed with making my own money. I
                  always had a passion for the hustle. I was always looking for
                  the next opportunity to build something and see a return on my
                  effort.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p>
                  In school, it started small - selling sweets and loom bands
                  out of my backpack to classmates. As I got older, the hustle
                  scaled. I was flipping bottles of KSI&rsquo;s Prime at the
                  height of the craze and selling phone cases on eBay.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ink">
                  I didn&rsquo;t just want a job; I wanted to control my own
                  time and income. I had the spirit of a young entrepreneur long
                  before I knew what the word meant.
                </p>
              </Reveal>
            </div>
          }
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 02 - The corporate world (dark)                    */
/* -------------------------------------------------- */

const facts = [
  { label: "Mon–Fri", value: "9 to 5" },
  { label: "Lunch", value: "1 hour" },
  { label: "Holidays", value: "25 days/yr" },
  { label: "Freedom", value: "None", accent: true },
];

function ChapterCorporate() {
  return (
    <section id="chapter-2" className="scroll-mt-20 relative overflow-hidden bg-ink-dark py-16 md:py-32 text-white">
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <ChapterGrid
          flip
          head={
            <>
              <ChapterHeader n="02" title="The corporate world" meta="AJ Bell · 2022" dark />
              <Reveal delay={120}>
                <h2 className={h2}>A finance employee in a tower of suits.</h2>
              </Reveal>
            </>
          }
          photo={
            <StoryPhoto
              src="/chapter 2 image.jpeg"
              alt="Jakub at his desk in the office during his 9-5"
              aspect="aspect-[4/3] md:aspect-[3/4]"
              position="object-[50%_38%]"
            />
          }
          body={
            <>
              <div className={bodyDark}>
                <Reveal>
                  <p>
                    After finishing college, I did what was expected: I landed
                    an apprenticeship in the heart of the finance world. On the
                    outside, it looked like I&rsquo;d made it. I was learning
                    the machinery of a multi-billion pound industry, handling
                    high-pressure demands, and mastering the art of professional
                    communication.
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <p>
                    But as I climbed the ladder, I realised the view from the
                    top didn&rsquo;t look like freedom. I was trading my best
                    hours for a paycheck and a tiny window of
                    &ldquo;allowed&rdquo; time off. I wanted to see the world
                    and visit family without needing a manager&rsquo;s
                    signature to do it. The stability was great, but the ceiling
                    was too low.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={160}>
                <dl className="mt-10 grid max-w-[640px] grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {facts.map((f) => (
                    <div
                      key={f.label}
                      className={`rounded-2xl border p-4 ${
                        f.accent
                          ? "border-accent/40 bg-accent/10"
                          : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
                        {f.label}
                      </dt>
                      <dd
                        className={`mt-2 font-display text-[1.2rem] font-medium tracking-[-0.02em] ${
                          f.accent ? "text-accent" : "text-white"
                        }`}
                      >
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </>
          }
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 03 - The spark                                     */
/* -------------------------------------------------- */

const attempts = ["TikTok Shop", "Forex trading", "Futures trading"];

function ChapterSpark() {
  return (
    <section id="chapter-3" className="scroll-mt-20 bg-bg py-16 md:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        {/* Beat 1 - trying everything */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-16 md:items-end">
          <div className="md:col-span-6">
            <ChapterHeader n="03" title="The spark" meta="Spring 2025" />
            <Reveal delay={120}>
              <h2 className={h2}>Trying to find a way out.</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-[60ch] text-[1rem] md:text-[1.1rem] leading-[1.75] text-ink-muted">
                I always wanted a side hustle alongside my 9-5 to eventually
                make it out. I tried everything. It started with selling on
                TikTok Shop, then moved to trading Forex and futures. I put in
                the hours, but none of it worked. I was spinning my wheels,
                looking for something that actually made sense.
              </p>
            </Reveal>
          </div>

          <ol className="md:col-span-6 space-y-2.5 md:max-w-[480px] md:justify-self-end md:w-full">
            {attempts.map((a, i) => (
              <Reveal as="li" key={a} variant="right" delay={i * 100}>
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface hairline px-5 py-4">
                  <span className="text-[1rem] text-ink-subtle line-through decoration-ink-subtle/60">
                    {a}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-subtle">
                    <X size={13} />
                    Didn&rsquo;t work
                  </span>
                </div>
              </Reveal>
            ))}
            <Reveal as="li" variant="right" delay={attempts.length * 100}>
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-ink px-5 py-5 text-white shadow-[var(--shadow-lift)]">
                <span className="font-display text-[1.2rem] font-medium tracking-[-0.02em]">
                  Amazon FBA
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white">
                  <Check size={13} />
                  It clicked
                </span>
              </div>
            </Reveal>
          </ol>
        </div>

        {/* Beat 2 - finding FBA */}
        <div className="mt-16 md:mt-28 grid gap-10 md:grid-cols-12 md:gap-16 md:items-center">
          <div className="order-2 md:order-1 md:col-span-6 grid grid-cols-2 gap-3 md:gap-4">
            <StoryPhoto
              src="/trading image.png"
              alt="Checking a trading account on a phone at the office"
              aspect="aspect-[3/4]"
              caption="Before"
              sizes="(min-width: 768px) 25vw, 46vw"
            />
            <div className="mt-10 md:mt-16">
              <StoryPhoto
                src="/discoverfba.jpeg"
                alt="Jakub loading boxes of stock into his car"
                aspect="aspect-[3/4]"
                position="object-[60%_50%]"
                caption="After"
                sizes="(min-width: 768px) 25vw, 46vw"
              />
            </div>
          </div>

          <div className="order-1 md:order-2 md:col-span-6">
            <Reveal>
              <h3 className="font-display font-medium tracking-[-0.03em] leading-[1.08] text-[clamp(1.875rem,3.6vw,3rem)]">
                Then I found Amazon FBA.
              </h3>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 max-w-[60ch] text-[1rem] md:text-[1.1rem] leading-[1.75] text-ink-muted">
                I was still at my finance job when I started digging into the
                world of e-commerce. But when I discovered the FBA model,
                everything clicked. The realisation that I could send inventory
                to Amazon&rsquo;s warehouses and let <em>them</em> handle the
                storage, shipping, and customer service was mind-blowing. It
                meant I could actually scale a brand without a warehouse of my
                own.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <Link
                href="/#fba"
                className="group mt-6 inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink"
              >
                <span className="border-b border-ink/25 pb-0.5 transition-colors group-hover:border-accent">
                  See how Amazon FBA works
                </span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <blockquote className="mx-auto mt-16 md:mt-28 max-w-[22ch] text-center font-serif text-[clamp(1.75rem,4vw,3rem)] leading-[1.25] text-ink">
            &ldquo;The Amazon FBA business model blew my mind.&rdquo;
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 04 - The first sale                                */
/* -------------------------------------------------- */

function ChapterFirstSale() {
  return (
    <section id="chapter-4" className="scroll-mt-20 relative overflow-hidden bg-surface py-16 md:py-32 border-y border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,107,26,0.09), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-6 md:px-8 text-center">
        <ChapterHeader n="04" title="The first sale" center />

        <Reveal delay={120}>
          <p className="mt-10 md:mt-14 label-mono">My first sale came on</p>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-4 font-display font-medium tracking-[-0.045em] leading-[0.95] text-[clamp(3rem,12vw,8.5rem)] text-ink">
            May 24th, <span className="draw-underline">2025</span>
          </p>
        </Reveal>

        <div className="mx-auto mt-10 md:mt-14 max-w-[400px] space-y-3 text-left">
          <Reveal variant="scale" delay={300}>
            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 hairline shadow-[var(--shadow-float)]">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
                <Package size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.95rem] font-medium text-ink">Sale #1</p>
                <p className="text-[0.8rem] text-ink-muted">24 May 2025</p>
              </div>
              <p className="font-display text-[1.375rem] font-medium tracking-[-0.02em]">£10</p>
            </div>
          </Reveal>
          <Reveal variant="scale" delay={480}>
            <div className="ml-6 flex items-center gap-4 rounded-2xl bg-white p-4 hairline shadow-[var(--shadow-float)]">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <TrendingUp size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.95rem] font-medium text-ink">+3 more sales</p>
                <p className="text-[0.8rem] text-ink-muted">The very next day</p>
              </div>
              <Check size={18} className="text-accent" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-12 md:mt-16 max-w-[34ch] font-serif text-[clamp(1.375rem,2.6vw,2rem)] leading-[1.45] text-ink">
            &ldquo;It was just £10. It changed everything - not because of the
            money, but because someone, somewhere, had bought something I&rsquo;d
            put into the world.&rdquo;
          </p>
        </Reveal>
        <Reveal delay={280}>
          <p className="mt-6 label-mono">The ball was rolling</p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 05 - The crossroads                                */
/* -------------------------------------------------- */

const moments = [
  {
    when: "Winter 2025",
    title: "The day Amazon paid me what my full-time job did.",
    body: "I looked at my Seller Central dashboard, then I looked at my payslip. They were the same. For the first time, two paths sat side by side on a screen - and one of them I'd built myself.",
  },
  {
    when: "Around the same time",
    title: "The promotion that didn't fix anything.",
    body: "I got promoted towards managing a team. It should've felt like a win. It didn't. I was good at it - but I knew, with absolute clarity, that being good at something isn't the same as wanting it.",
  },
  {
    when: "Every Sunday night",
    title: "Wasting my life one Monday at a time.",
    body: "I felt it. The dread. Not because the job was terrible - it wasn't. Because every hour spent there was an hour not spent on the thing I actually cared about.",
  },
];

function ChapterCrossroads() {
  return (
    <section id="chapter-5" className="scroll-mt-20 bg-surface-alt py-16 md:py-32">
      <div className="mx-auto max-w-[920px] px-5 sm:px-6 md:px-8">
        <ChapterHeader n="05" title="The crossroads" />
        <Reveal delay={120}>
          <h2 className={h2}>Three moments that changed everything.</h2>
        </Reveal>

        <Reveal>
          <div className="relative mt-12 md:mt-16">
          <span aria-hidden className="absolute left-[19px] md:left-[23px] top-5 bottom-5 w-px bg-line" />
          <span aria-hidden className="draw-line-y absolute left-[19px] md:left-[23px] top-5 bottom-5 w-px bg-accent" />
          <ol className="relative space-y-10 md:space-y-14">
            {moments.map((m, i) => (
              <li key={m.title} className="relative pl-14 md:pl-20">
                <span className="absolute left-0 top-0 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-line bg-surface font-mono text-[0.75rem] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Reveal delay={i * 120}>
                  <p className="pt-2.5 md:pt-3.5 label-mono">{m.when}</p>
                  <h3 className="mt-3 font-display text-[1.4rem] md:text-[1.875rem] font-medium tracking-[-0.02em] leading-[1.2] text-ink">
                    {m.title}
                  </h3>
                  <p className="mt-4 max-w-[60ch] text-[1rem] md:text-[1.0625rem] leading-[1.75] text-ink-muted">
                    {m.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 06 - The leap (dark)                               */
/* -------------------------------------------------- */

function ChapterLeap() {
  return (
    <section id="chapter-6" className="scroll-mt-20 relative overflow-hidden bg-ink-dark py-16 md:py-32 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 15% 30%, rgba(255,107,26,0.18), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <ChapterGrid
          head={
            <>
              <ChapterHeader n="06" title="The leap" dark />
              <h2 className="mt-8 font-display font-medium tracking-[-0.05em] leading-[0.9] text-[clamp(4.5rem,13vw,9.5rem)]">
                <RevealWords text="I quit." />
              </h2>
              <Reveal delay={300}>
                <p className="mt-6 max-w-[24ch] font-serif text-[clamp(1.375rem,2.4vw,1.875rem)] leading-[1.4] text-white/75">
                  Two words I&rsquo;d been afraid to say for two years.
                </p>
              </Reveal>
            </>
          }
          photo={
            <StoryPhoto
              src="/The day i quit image.jpeg"
              alt="Jakub on the day he quit his job"
              aspect="aspect-[4/5]"
              position="object-[50%_30%]"
              caption="The day I quit"
            />
          }
          body={
            <Reveal>
              <p className="max-w-[58ch] text-[1rem] md:text-[1.1rem] leading-[1.75] text-white/70">
                I won&rsquo;t pretend it was easy. The fear of leaving a steady
                paycheque doesn&rsquo;t disappear just because you&rsquo;ve got
                something working on the side. But I&rsquo;d done the math.
                I&rsquo;d done the work. And I&rsquo;d watched too many people
                stay in jobs they hated because leaving felt risky -{" "}
                <span className="text-white">
                  when staying was the bigger risk all along.
                </span>
              </p>
            </Reveal>
          }
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------- */
/* 07 - Today                                         */
/* -------------------------------------------------- */

const freedom = [
  { label: "Malta", src: "/Jakub on holiday.jpeg", alt: "Jakub with friends on a beach in Malta" },
  { label: "Marbella", src: "/marbella.jpeg", alt: "Working on a laptop by the pool in Marbella" },
  { label: "Ayia Napa", src: "/ayia napa.jpeg", alt: "Jakub on a boat in Ayia Napa" },
  { label: "Aintree", src: "/aintree.jpeg", alt: "Jakub with friends at Aintree races" },
];

function ChapterToday() {
  return (
    <section id="chapter-7" className="scroll-mt-20 relative overflow-hidden bg-bg py-16 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(255,107,26,0.12), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <ChapterHeader n="07" title="Today" meta="May 2026" />
        <h2 className="mt-8 font-display font-medium tracking-[-0.045em] leading-[0.98] text-[clamp(3rem,9vw,7rem)]">
          <RevealWords text="Now I do what I want." />
        </h2>

        <Reveal delay={150}>
          <dl className="mt-10 md:mt-16 grid gap-3 sm:grid-cols-3 md:gap-4">
            <Stat label="In Amazon revenue to date" prefix="£" to={130000} suffix="+" />
            <Stat label="Average weekly revenue" prefix="£" to={5000} displayFinal="3,000–5,000" accent />
            <Stat label="Holidays a year" to={10} suffix="+" />
          </dl>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-subtle">
            Real numbers from my own business. Updated May 2026.
          </p>
        </Reveal>

        <ScrollHighlight
          className="mx-auto mt-20 md:mt-32 max-w-[30ch] text-center font-serif text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.4]"
          text="“Amazon didn’t make me rich overnight. It made me free. I get to pick where I am, who I’m with, and what I work on. To me, that’s the only currency that’s ever really mattered.”"
        />

        <div className="mt-20 md:mt-32">
          <Reveal>
            <p className="label-mono">What freedom looks like</p>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {freedom.map((m, i) => (
              <Reveal key={m.src} delay={i * 90} className={i % 2 === 1 ? "mt-8 md:mt-0" : ""}>
                <figure className="group relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl bg-surface-alt hairline">
                  <Photo
                    src={m.src}
                    alt={m.alt}
                    fill
                    sizes="(min-width: 768px) 25vw, 46vw"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                  <figcaption className="absolute bottom-3 left-3 md:bottom-4 md:left-4 font-display text-[1.05rem] md:text-[1.25rem] font-medium tracking-[-0.02em] text-white">
                    {m.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
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
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  to: number;
  displayFinal?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`min-w-0 rounded-3xl p-5 md:p-8 ${
        accent ? "bg-ink text-white" : "bg-surface hairline"
      }`}
    >
      <CountUp
        to={to}
        prefix={prefix}
        suffix={suffix}
        displayFinal={displayFinal}
        className={`block font-display font-medium tracking-[-0.035em] leading-[1.05] tabular-nums text-[clamp(2rem,4vw,3.25rem)] ${
          accent ? "text-accent" : "text-ink"
        }`}
      />
      <p
        className={`mt-3 md:mt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${
          accent ? "text-white/55" : "text-ink-subtle"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

/* -------------------------------------------------- */
/* Closing                                            */
/* -------------------------------------------------- */

function Closing() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 70%, rgba(255,107,26,0.24), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-6 md:px-8 py-20 md:py-36 text-center">
        <h2 className="font-display font-medium tracking-[-0.035em] leading-[1.05] text-balance text-[clamp(2.25rem,6vw,5rem)]">
          <RevealWords
            text={[
              { text: "Freedom is the greatest" },
              { text: "gift", className: "font-serif font-normal text-accent" },
              { text: "a human can be given." },
            ]}
          />
        </h2>
        <Reveal delay={300}>
          <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-white/45">
            - Jakub
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mx-auto mt-14 md:mt-20 max-w-[680px] rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 md:p-12 text-left md:text-center backdrop-blur-sm">
            <p className="eyebrow !text-white/50 md:justify-center">
              <span className="eyebrow-index">Your chapter 01</span>
            </p>
            <p className="mt-4 font-display text-[1.5rem] md:text-[2.125rem] font-medium leading-[1.15] tracking-[-0.025em]">
              I&rsquo;m now mentoring a small group 1-to-1 to build the same
              thing.
            </p>
            <p className="mt-4 text-[1rem] leading-[1.7] text-white/65">
              Weekly calls, a direct line to me, and the exact system I use on
              my own business every day. I keep the group small on purpose, so
              spots are limited.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:justify-center">
              <Link href="/#apply" className="btn btn-primary btn-lg">
                Apply for mentorship
                <ArrowRight size={18} className="btn-arrow" />
              </Link>
              <Link href="/#fba" className="btn btn-on-dark btn-lg">
                How Amazon FBA works
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
