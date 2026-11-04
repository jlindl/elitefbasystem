"use client";

import { Photo } from "./photo";
import { useRef, useState } from "react";
import { ArrowRight, Calendar, Check, Play, TrendingUp } from "./icons";
import { Reveal, RevealWords } from "./reveal";
import { VideoLightbox } from "./video-lightbox";

const trust = [
  "Direct 1-to-1 mentorship",
  "Real screenshots",
  "No upsells",
  "Limited spots",
];

const YOUTUBE_ID = "oFp_kVwq0g8";
const POSTER = "/Thumbnail final.png";

export function Hero() {
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const [open, setOpen] = useState(false);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const openVideo = () => {
    setOrigin(thumbRef.current?.getBoundingClientRect() ?? null);
    setOpen(true);
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-[112px] md:pt-[140px] lg:pt-[150px] pb-16 md:pb-24"
    >
      {/* ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="glow-orb -top-40 right-[-10%] h-[560px] w-[560px] bg-accent/[0.16]" />
        <div
          className="glow-orb top-[35%] -left-40 h-[420px] w-[420px] bg-[#ffd2b0]/40"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0a0a0a 1px, transparent 1px), linear-gradient(to bottom, #0a0a0a 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 75% 60% at 50% 35%, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 60% at 50% 35%, black 20%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        {/* Phones: headline, video, copy. Desktop: copy left, video right. */}
        <div className="grid items-center gap-x-12 xl:gap-x-16 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <div className="text-center lg:text-left lg:col-span-6 lg:row-start-1 lg:self-end">
            <Reveal variant="blur">
              <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 py-1.5 pl-3 pr-4 text-[0.8125rem] text-ink-muted shadow-[0_1px_2px_rgba(10,10,10,0.04)] backdrop-blur">
                <span className="live-dot" />
                Now accepting new students
              </p>
            </Reveal>

            <h1 className="mt-6 md:mt-7 font-display font-medium tracking-[-0.04em] leading-[1] text-balance text-[clamp(2.5rem,7.4vw,4.25rem)]">
              <RevealWords text="The FBA system I actually use." className="block" />
              <RevealWords
                delay={260}
                className="block text-ink-subtle"
                text={[
                  { text: "Taught by me. To you." },
                  {
                    text: "Personally.",
                    className: "font-serif text-accent tracking-[-0.02em]",
                  },
                ]}
              />
            </h1>
          </div>

          <div
            id="video"
            className="relative z-10 hover:z-30 scroll-mt-24 md:scroll-mt-28 mt-10 lg:mt-0 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1"
          >
            <Reveal delay={300} variant="scale">
              <VideoCard thumbRef={thumbRef} onOpen={openVideo} />
            </Reveal>
          </div>

          <div className="text-center lg:text-left lg:col-span-6 lg:row-start-2 lg:self-start">
            <Reveal delay={420}>
              <p className="mx-auto lg:mx-0 mt-8 md:mt-9 lg:mt-7 max-w-[560px] text-pretty text-[clamp(1.05rem,1.5vw,1.2rem)] leading-[1.6] text-ink-muted">
                I&rsquo;m Jakub. Amazon FBA took me from a 9-5 to £10k+
                revenue months - selling full-time, on my own terms. Now
                I&rsquo;m hand-picking a small group of people to mentor 1-to-1
                and show exactly how I did it.
              </p>
            </Reveal>

            <Reveal delay={520}>
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
                <a href="#apply" className="btn btn-primary btn-lg">
                  Apply for Mentorship
                  <ArrowRight size={18} className="btn-arrow" />
                </a>
                <button type="button" onClick={openVideo} className="btn btn-secondary btn-lg">
                  <Play size={14} className="text-accent" />
                  Watch My Story
                </button>
              </div>
            </Reveal>

            <Reveal delay={620}>
              <ul className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2.5 text-[0.8125rem] text-ink-muted">
                {trust.map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <Check size={14} className="text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      {open && (
        <VideoLightbox
          youtubeId={YOUTUBE_ID}
          poster={POSTER}
          title="Jakub's intro video"
          origin={origin}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}

function VideoCard({
  thumbRef,
  onOpen,
}: {
  thumbRef: React.RefObject<HTMLDivElement | null>;
  onOpen: () => void;
}) {
  return (
    <div className="group/video relative z-10 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:z-30 md:hover:scale-[1.06] lg:origin-[85%_50%] lg:hover:scale-[1.18]">
      <div className="relative rounded-[20px] md:rounded-[26px] bg-white/70 p-1.5 md:p-2 shadow-[var(--shadow-float)] ring-1 ring-ink/[0.06] backdrop-blur transition-shadow duration-700 group-hover/video:shadow-[0_2px_4px_rgba(10,10,10,0.04),0_30px_80px_-20px_rgba(10,10,10,0.35)]">
        <div
          ref={thumbRef}
          className="relative aspect-video overflow-hidden rounded-[15px] md:rounded-[19px] bg-ink"
        >
          <button
            type="button"
            onClick={onOpen}
            aria-label="Play Jakub's intro video"
            className="absolute inset-0 block h-full w-full cursor-zoom-in text-left"
          >
            <Photo
              src={POSTER}
              alt=""
              fill
              preload
              sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover/video:scale-[1.06]"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"
            />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="play-ring relative inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white/95 shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/video:scale-110">
                <Play size={24} className="translate-x-[2px] text-ink" />
              </span>
            </span>

            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5 text-white">
              <span>
                <span className="block font-mono text-[0.62rem] md:text-[0.68rem] uppercase tracking-[0.16em] text-white/75">
                  Watch the intro
                </span>
                <span className="mt-1 block font-display text-[1rem] md:text-[1.25rem] font-medium tracking-[-0.02em]">
                  Jakub&rsquo;s full breakdown
                </span>
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[0.7rem] backdrop-blur">
                3:24
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* floating proof chips (desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 -bottom-7 hidden xl:flex items-center gap-3 rounded-2xl border border-line bg-white/90 py-3 pl-3 pr-5 shadow-[var(--shadow-float)] backdrop-blur-xl"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <TrendingUp size={18} />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-[1.125rem] font-medium tracking-[-0.02em] text-ink">
            £10k+ / month
          </span>
          <span className="block text-[0.75rem] text-ink-muted">Jakub&rsquo;s own revenue</span>
        </span>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-5 -top-6 hidden xl:flex items-center gap-2.5 rounded-full border border-line bg-white/90 py-2 pl-2 pr-4 shadow-[var(--shadow-float)] backdrop-blur-xl"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">
          <Calendar size={15} />
        </span>
        <span className="text-[0.8125rem] font-medium text-ink">Weekly 1-to-1 calls</span>
      </div>
    </div>
  );
}
