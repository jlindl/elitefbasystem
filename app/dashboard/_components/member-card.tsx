"use client";

import { useRef } from "react";

/** The digital membership card: tilts and catches the light under the pointer. */
export function MemberCard({
  name,
  number,
  since,
  tier,
  className = "",
}: {
  name: string;
  number: string;
  since: string;
  tier: string;
  className?: string;
}) {
  const card = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = card.current;
    if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  }

  function onLeave() {
    const el = card.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <figure className={`member-card-wrap ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={card} className="member-card relative aspect-[1.586] w-full overflow-hidden rounded-[1.25rem] bg-[#0d0c0a] p-[6%] text-white">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 100% 0%, rgba(255,107,26,0.55) 0%, rgba(255,107,26,0) 55%), radial-gradient(90% 80% at 0% 100%, rgba(226,180,94,0.22) 0%, rgba(226,180,94,0) 60%)" }} />
        <div aria-hidden className="dash-grid-dark absolute inset-0 opacity-50" />
        <div aria-hidden className="member-card-sheen absolute inset-0" />

        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex items-end font-display text-[clamp(1rem,4.2cqw,1.35rem)] font-semibold leading-none tracking-[-0.02em]">
              EliteFBA
              <span aria-hidden className="mb-[0.18em] ml-[2px] inline-block h-[0.26em] w-[0.26em] rounded-full bg-accent" />
            </span>
            <span className="rounded-full bg-white/12 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white ring-1 ring-white/20">{tier}</span>
          </div>

          {/* Chip */}
          <span aria-hidden className="member-card-chip mt-[7%] block h-[17%] w-[13%] min-w-9 rounded-[0.45rem]" />

          <p className="mt-auto font-mono text-[clamp(1rem,5.2cqw,1.55rem)] tracking-[0.12em] text-white tabular-nums">
            <span className="sr-only">Member number </span>
            {number}
          </p>
          <div className="mt-[4%] flex items-end justify-between gap-4">
            <p className="min-w-0">
              <span className="block text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/70">Member</span>
              <span className="mt-0.5 block truncate text-[clamp(0.875rem,3.6cqw,1.05rem)] font-semibold uppercase tracking-[0.08em]">{name}</span>
            </p>
            <p className="shrink-0 text-right">
              <span className="block text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-white/70">Since</span>
              <span className="mt-0.5 block text-[clamp(0.875rem,3.6cqw,1.05rem)] font-semibold uppercase tracking-[0.08em]">{since}</span>
            </p>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        Elite FBA membership card for {name}, {tier}, member since {since}.
      </figcaption>
    </figure>
  );
}
