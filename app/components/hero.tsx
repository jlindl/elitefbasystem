import { ArrowDown, Play } from "./icons";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-[120px] md:pt-[140px] pb-20 md:pb-28 overflow-hidden"
    >
      {/* warm radial bleed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 92% -5%, rgba(255,107,26,0.10), transparent 55%)",
        }}
      />
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0a0a0a 1px, transparent 1px), linear-gradient(to bottom, #0a0a0a 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="text-center max-w-[920px] mx-auto">
          <Reveal>
            <p className="label-mono inline-flex items-center gap-2 mb-7">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              From a real seller
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display font-medium tracking-[-0.025em] leading-[1.02] text-[clamp(2.75rem,7vw,6.5rem)]">
              The FBA system I actually use.
              <br />
              <span className="text-ink-muted">
                Taught by me. To you. Personally.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 mx-auto max-w-[640px] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.55] text-ink-muted">
              I&rsquo;m Jakub. I sell on Amazon full-time, and I built a system
              from scratch to do it. Now I&rsquo;m hand-picking a small group of
              sellers to mentor 1-to-1 &mdash; and to build a team with.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#apply"
                className="inline-flex h-12 items-center rounded-full bg-accent px-7 text-[0.95rem] font-medium text-white shadow-[0_1px_2px_rgba(10,10,10,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep hover:shadow-[0_8px_24px_rgba(255,107,26,0.32)]"
              >
                Apply for Mentorship
              </a>
              <a
                href="#video"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-6 text-[0.95rem] font-medium text-ink transition-all duration-200 hover:-translate-y-px hover:border-ink/20"
              >
                Watch My Story <ArrowDown size={16} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-7 text-[0.8rem] text-ink-subtle">
              Direct 1-to-1 mentorship · Real screenshots · No upsells ·
              Limited spots
            </p>
          </Reveal>
        </div>

        <Reveal delay={400}>
          <VideoFrame />
        </Reveal>
      </div>
    </section>
  );
}

function VideoFrame() {
  return (
    <div id="video" className="mt-16 md:mt-24 mx-auto max-w-[1080px]">
      <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-lift)] hairline">
        {/* placeholder gradient surface */}
        <div
          className="relative aspect-[16/9]"
          style={{
            background:
              "radial-gradient(120% 80% at 30% 25%, #f6efe3 0%, #e9e2d0 50%, #d8d0bc 100%)",
          }}
        >
          {/* subtle noise/grain */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.18), transparent 60%)",
            }}
          />
          {/* light highlight */}
          <div
            aria-hidden
            className="absolute -top-1/4 left-1/4 h-1/2 w-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.55), transparent)",
            }}
          />

          {/* play button */}
          <button
            type="button"
            aria-label="Play Jakub's intro video"
            className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white play-ring transition-transform duration-300 hover:scale-[1.06]"
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-full ring-1 ring-black/5"
            />
            <Play size={26} className="text-ink translate-x-[2px]" />
          </button>

          {/* video label */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center rounded-full bg-black/60 px-3 py-1 text-[0.7rem] font-medium tracking-wide text-white">
              [VIDEO: Jakub intro &mdash; to be filmed]
            </span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-[0.8125rem] text-ink-subtle font-mono">
        Watch: Jakub&rsquo;s full breakdown · 3:24
      </p>
    </div>
  );
}
