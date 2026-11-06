import Link from "next/link";
import {
  MISSIONS,
  MISSIONS_BY_ID,
  isUnlocked,
  levelFor,
  missionState,
  nextMission,
  streakDays,
  totalXp,
  maxMissionXp,
  type Mission,
  type Progress,
} from "../_lib/missions";

/* ------------------------------------------------------------------ */
/* Stats panel                                                        */
/* ------------------------------------------------------------------ */

export function MissionHud({ progress, compact = false }: { progress: Progress; compact?: boolean }) {
  const xp = totalXp(progress);
  const level = levelFor(xp);
  const streak = streakDays(progress);
  const badges = MISSIONS.filter((m) => missionState(progress, m).complete).length;

  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-3" : "grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr]"}`}>
      <div className={`rounded-3xl bg-ink p-4 md:p-5 text-white ${compact ? "col-span-3" : "col-span-2 md:col-span-1"}`}>
        <div className="flex items-center gap-4">
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[1.75rem]" aria-hidden>
            {level.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/55">Level {level.index + 1}</p>
            <p className="font-display text-[1.375rem] font-semibold leading-tight">{level.name}</p>
          </div>
          <p className="font-display text-[1.5rem] font-semibold text-accent tabular-nums">
            ⚡{xp}
          </p>
        </div>
        <div className="mt-3.5 h-2.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-accent to-[#ffb347]" style={{ width: `${Math.max(4, level.pct * 100)}%` }} />
        </div>
        <p className="mt-1.5 text-[0.75rem] text-white/55 tabular-nums">
          {level.next ? `${level.toNext} XP to ${level.next.emoji} ${level.next.name}` : "Top level reached 👑"}
        </p>
      </div>

      {!compact && (
        <>
          <div className="rounded-3xl border border-line bg-surface p-4 md:p-5">
            <p className="text-[2rem] leading-none" aria-hidden>
              {streak.days > 0 ? "🔥" : "🪵"}
            </p>
            <p className="mt-2 font-display text-[1.5rem] font-semibold text-ink tabular-nums">
              {streak.days} day{streak.days === 1 ? "" : "s"}
            </p>
            <p className="text-[0.8rem] text-ink-muted">
              {streak.days === 0 ? "Finish a step to light it" : streak.today ? "Streak safe today" : "Do a step today to keep it"}
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-surface p-4 md:p-5">
            <p className="text-[2rem] leading-none" aria-hidden>
              🏅
            </p>
            <p className="mt-2 font-display text-[1.5rem] font-semibold text-ink tabular-nums">
              {badges}/{MISSIONS.length}
            </p>
            <p className="text-[0.8rem] text-ink-muted">Badges earned</p>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Map                                                                */
/* ------------------------------------------------------------------ */

// Duolingo-style zigzag, in px from centre.
const OFFSETS = [0, 56, 80, 40, -36, -72, -40, 24];

export function MissionMap({ progress }: { progress: Progress }) {
  const current = nextMission(progress);

  return (
    <ol className="relative mx-auto flex max-w-[420px] flex-col items-center gap-12 py-6">
      {MISSIONS.map((m, i) => (
        <li key={m.id} className="relative flex flex-col items-center" style={{ transform: `translateX(${OFFSETS[i % OFFSETS.length]}px)` }}>
          <Node mission={m} progress={progress} current={current?.id === m.id} />
        </li>
      ))}
      <li className="flex flex-col items-center pt-2 text-center">
        <span className="text-[2.5rem]" aria-hidden>
          🏆
        </span>
        <p className="mt-1 font-display text-[1rem] font-semibold text-ink">Elite seller</p>
        <p className="text-[0.8rem] text-ink-muted">Every badge earned</p>
      </li>
    </ol>
  );
}

function Node({ mission, progress, current }: { mission: Mission; progress: Progress; current: boolean }) {
  const s = missionState(progress, mission);
  const unlocked = isUnlocked(progress, mission);
  const req = mission.unlock ? MISSIONS_BY_ID.get(mission.unlock.mission) : null;

  const circle = !unlocked
    ? "bg-surface-deep text-ink-subtle shadow-[0_6px_0_0_#d9d4c7]"
    : s.complete
      ? "bg-gradient-to-br from-accent to-[#ffb347] text-white shadow-[0_6px_0_0_#c2410c]"
      : current
        ? "bg-accent text-white shadow-[0_6px_0_0_#c2410c] node-pulse"
        : "bg-white text-ink border-2 border-line shadow-[0_6px_0_0_var(--color-line)]";

  const body = (
    <>
      {current && unlocked && (
        <span className="bob absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border-2 border-line bg-white px-3 py-1.5 font-display text-[0.8rem] font-bold uppercase tracking-[0.06em] text-accent shadow-sm">
          {s.started ? "Continue" : "Start"}
          <span aria-hidden className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-line bg-white" />
        </span>
      )}
      <span
        className={`relative inline-flex h-[84px] w-[84px] items-center justify-center rounded-full text-[2.25rem] transition-transform duration-200 group-hover:-translate-y-0.5 group-active:translate-y-1 ${circle}`}
      >
        <span aria-hidden className={unlocked ? "" : "grayscale opacity-40"}>
          {unlocked ? mission.badge.emoji : "🔒"}
        </span>
        {s.complete && (
          <span aria-hidden className="absolute -right-1 -top-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-[0.8rem] font-bold text-white">
            ✓
          </span>
        )}
        {unlocked && !s.complete && s.done > 0 && (
          <svg aria-hidden className="absolute -inset-[7px] -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="47" fill="none" stroke="#ffd2b8" strokeWidth="4" />
            <circle cx="50" cy="50" r="47" fill="none" stroke="#1f7a4d" strokeWidth="4" strokeLinecap="round" strokeDasharray={295} strokeDashoffset={295 * (1 - s.done / s.total)} />
          </svg>
        )}
      </span>
      <span className="mt-3 block max-w-[180px] text-center">
        <span className={`block font-display text-[1rem] font-semibold leading-tight ${unlocked ? "text-ink" : "text-ink-subtle"}`}>{mission.title}</span>
        <span className="mt-0.5 block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-subtle">
          {!unlocked && req
            ? `After ${req.title}`
            : s.complete
              ? `Module ${mission.moduleNumber} · Done`
              : `Module ${mission.moduleNumber} · ${s.done}/${s.total} steps`}
        </span>
      </span>
    </>
  );

  if (!unlocked) {
    return (
      <div className="group flex flex-col items-center" aria-label={`${mission.title} - locked`}>
        {body}
      </div>
    );
  }
  return (
    <Link href={`/dashboard/missions/${mission.id}`} className="group flex flex-col items-center outline-none focus-visible:ring-4 focus-visible:ring-orange-700/70 rounded-3xl">
      {body}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Compact card (dashboard + modules page)                            */
/* ------------------------------------------------------------------ */

export function MissionCard({ mission, progress, label = "Mission" }: { mission: Mission; progress: Progress; label?: string }) {
  const s = missionState(progress, mission);
  const unlocked = isUnlocked(progress, mission);
  const req = mission.unlock ? MISSIONS_BY_ID.get(mission.unlock.mission) : null;
  const cta = !unlocked ? "Locked" : s.complete ? "View badge" : s.started ? "Continue" : "Start";

  const inner = (
    <>
      <span
        aria-hidden
        className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-[1.75rem] ${
          s.complete ? "bg-gradient-to-br from-accent to-[#ffb347]" : unlocked ? "bg-white shadow-sm" : "bg-surface-alt grayscale opacity-60"
        }`}
      >
        {unlocked ? mission.badge.emoji : "🔒"}
      </span>
      <span className="min-w-0 flex-1">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent font-bold">
          {label} · up to +{maxMissionXp(mission)} XP
        </span>
        <span className="mt-0.5 block font-display text-[1.05rem] font-semibold text-ink leading-snug">{mission.title}</span>
        <span className="mt-0.5 block text-[0.85rem] text-ink-muted">
          {!unlocked && req ? `Unlocks after ${req.title}` : s.complete ? `${mission.badge.name} badge earned ✓` : mission.tagline}
        </span>
        {unlocked && !s.complete && (
          <span className="mt-2 flex gap-1" aria-label={`${s.done} of ${s.total} steps done`}>
            {mission.steps.map((st, i) => (
              <span key={st.id} className={`h-1.5 flex-1 rounded-full ${i < s.done ? "bg-emerald-500" : "bg-line"}`} />
            ))}
          </span>
        )}
      </span>
      <span
        className={`hidden sm:inline-flex h-11 shrink-0 items-center rounded-xl px-4 font-display text-[0.8rem] font-bold uppercase tracking-[0.06em] ${
          !unlocked ? "bg-surface-alt text-ink-subtle" : s.complete ? "bg-white text-ink border-2 border-line" : "bg-accent text-white shadow-[0_4px_0_0_#c2410c]"
        }`}
      >
        {cta}
      </span>
    </>
  );

  const cls = "flex items-center gap-4 rounded-3xl border-2 p-4 md:p-5 transition-colors";
  return unlocked ? (
    <Link href={`/dashboard/missions/${mission.id}`} className={`${cls} border-accent/30 bg-accent-soft/40 hover:border-accent`}>
      {inner}
    </Link>
  ) : (
    <div className={`${cls} border-line bg-surface`}>{inner}</div>
  );
}
