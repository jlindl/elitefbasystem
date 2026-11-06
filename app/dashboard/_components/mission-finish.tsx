"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { levelFor, type Mission } from "../_lib/missions";

export type NextMission = { id: string; title: string; emoji: string; unlocked: boolean } | null;

/** Sticky top bar: close, progress (or custom content), live XP counter. */
export function TopBar({
  xp,
  bump,
  progress,
  children,
}: {
  xp: number;
  bump: number;
  progress: number;
  children?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-[640px] items-center gap-4 px-5 py-3.5">
        <Link
          href="/dashboard/missions"
          aria-label="Back to the mission map"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[1.25rem] text-ink-subtle hover:bg-surface-alt hover:text-ink"
        >
          ✕
        </Link>
        <div className="flex-1">
          {children ?? (
            <div className="h-2.5 overflow-hidden rounded-full bg-surface-deep">
              <div
                className="h-full rounded-full bg-emerald-500 transition-[width] duration-500"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          )}
        </div>
        <span
          key={bump}
          className={`${bump ? "xp-bump" : ""} inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-soft px-3 py-1.5 font-display text-[0.95rem] font-semibold text-accent tabular-nums`}
        >
          ⚡ {xp}
        </span>
      </div>
    </header>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-3.5 ${accent ? "bg-ink text-white" : "border border-line bg-white"}`}>
      <p className={`font-mono text-[0.6rem] uppercase tracking-[0.14em] ${accent ? "text-white/55" : "text-ink-subtle"}`}>
        {label}
      </p>
      <p className={`mt-1 font-display text-[1.5rem] font-semibold tabular-nums ${accent ? "text-accent" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}

/** Badge reveal, XP breakdown, level progress and what to do next. */
export function FinishScreen({
  mission,
  xp,
  bump,
  stats,
  headline,
  animate,
  next,
  onReplay,
  replayLabel = "Review or edit my answers",
  children,
}: {
  mission: Mission;
  xp: number;
  bump: number;
  stats: { label: string; value: string }[];
  headline?: string;
  animate: boolean;
  next: NextMission;
  onReplay: () => void;
  replayLabel?: string;
  children?: ReactNode;
}) {
  const level = levelFor(xp);
  return (
    <div className="dash-theme min-h-[100svh] bg-bg">
      <TopBar xp={xp} bump={bump} progress={1} />
      <main className="mx-auto max-w-[560px] px-5 pb-16 pt-8 text-center">
        <div className="relative mx-auto h-56 w-56">
          <div
            aria-hidden
            className="rays absolute inset-0 rounded-full opacity-70"
            style={{
              background:
                "repeating-conic-gradient(from 0deg, rgba(255,107,26,0.22) 0deg 12deg, transparent 12deg 30deg)",
              maskImage: "radial-gradient(circle, black 35%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle, black 35%, transparent 70%)",
            }}
          />
          <div
            className={`${animate ? "badge-pop" : ""} absolute inset-10 flex items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-accent to-[#ffb347] shadow-[0_20px_50px_-12px_rgba(255,107,26,0.6)]`}
          >
            <span className="text-[4.5rem] leading-none" aria-hidden>
              {mission.badge.emoji}
            </span>
          </div>
        </div>

        <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent font-bold">
          {headline ?? "Mission complete"}
        </p>
        <h1 className="mt-2 font-display text-[2.25rem] font-semibold tracking-[-0.03em] text-ink leading-tight">
          {mission.badge.name}
        </h1>
        <p className="mt-2 text-[1rem] text-ink-muted">Badge unlocked. {mission.why}</p>

        <div className={`mt-6 grid gap-2.5 ${stats.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {stats.map((s, i) => (
            <Stat key={s.label} label={s.label} value={s.value} accent={i === stats.length - 1} />
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-line bg-white p-4 text-left">
          <div className="flex items-center justify-between text-[0.9rem]">
            <span className="font-semibold text-ink">
              {level.emoji} Level {level.index + 1} · {level.name}
            </span>
            <span className="font-mono text-[0.75rem] text-ink-subtle tabular-nums">
              {level.next ? `${level.toNext} XP to ${level.next.name}` : "Max level"}
            </span>
          </div>
          <div className="mt-2.5 h-3 overflow-hidden rounded-full bg-surface-alt">
            <div className="h-full rounded-full bg-accent transition-[width] duration-1000" style={{ width: `${level.pct * 100}%` }} />
          </div>
        </div>

        {children}

        <div className="mt-8 grid gap-3">
          {next?.unlocked && (
            <Link
              href={`/dashboard/missions/${next.id}`}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-accent text-[1.05rem] font-semibold text-white shadow-[0_5px_0_0_#c2410c] transition-transform active:translate-y-[3px] active:shadow-[0_2px_0_0_#c2410c]"
            >
              Next: {next.emoji} {next.title} →
            </Link>
          )}
          <Link
            href="/dashboard/missions"
            className="inline-flex h-14 items-center justify-center rounded-2xl border-2 border-line bg-white text-[1rem] font-semibold text-ink"
          >
            Back to the map
          </Link>
          <button type="button" onClick={onReplay} className="text-[0.9rem] text-ink-muted underline decoration-ink/20">
            {replayLabel}
          </button>
        </div>
      </main>
    </div>
  );
}
