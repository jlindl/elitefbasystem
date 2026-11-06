"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import {
  canSavePartial,
  isStepComplete,
  levelFor,
  seedStepData,
  verdictReaction,
  type Mission,
  type MissionData,
  type StepRecord,
} from "../_lib/missions";
import { saveStep } from "../_lib/mission-progress";
import { buzz, fireConfetti } from "./confetti";
import { FinishScreen, TopBar, type NextMission } from "./mission-finish";
import { StepWidget } from "./mission-steps";

const PRAISE = ["Nice!", "Boom.", "Sorted.", "Love it.", "That's the one.", "Smashed it.", "Nailed it."];

type Sheet =
  | {
      kind: "good";
      gained: number;
      bonus: number;
      message: string;
      levelUp: ReturnType<typeof levelFor> | null;
      finishing: boolean;
    }
  | { kind: "saved"; message: string }
  | { kind: "wrong"; message: string }
  | { kind: "error"; message: string };

export function MissionPlayer({
  mission,
  initial,
  totalXp,
  next,
  demo = false,
}: {
  mission: Mission;
  initial: Record<string, StepRecord>;
  totalXp: number;
  next: NextMission;
  /** Preview mode: nothing is saved. */
  demo?: boolean;
}) {
  const steps = mission.steps;
  const [data, setData] = useState<MissionData>(() =>
    Object.fromEntries(steps.map((s) => [s.id, initial[s.id]?.data ?? {}])),
  );
  const [done, setDone] = useState<Set<string>>(
    () => new Set(steps.filter((s) => initial[s.id]?.completedAt).map((s) => s.id)),
  );
  const firstOpen = Math.max(0, steps.findIndex((s) => !initial[s.id]?.completedAt));
  const [idx, setIdx] = useState(firstOpen);
  const [view, setView] = useState<"play" | "finish">(done.size === steps.length ? "finish" : "play");
  const [justFinished, setJustFinished] = useState(false);
  const [xp, setXp] = useState(totalXp);
  const [bump, setBump] = useState(0);
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [pending, startTransition] = useTransition();

  const step = steps[idx];
  const value = useMemo(() => data[step.id] ?? {}, [data, step.id]);
  const complete = useMemo(() => isStepComplete(step, value), [step, value]);
  const partialOk = canSavePartial(step) && value.value != null;
  // Product picks can be checked when wrong - they get feedback and another go.
  const pickMade = step.type === "pick-product" && typeof value.pick === "number";
  const canCheck = (complete || partialOk || pickMade) && !pending;

  function change(v: MissionData[string]) {
    setData((d) => ({ ...d, [step.id]: v }));
  }

  function check() {
    if (!canCheck) return;
    if (step.type === "pick-product" && !complete) {
      buzz(60);
      setSheet({ kind: "wrong", message: step.wrongWhy });
      return;
    }
    startTransition(async () => {
      const res = demo ? { ok: true as const, complete } : await saveStep(mission.id, step.id, value);
      if (!res.ok) {
        setSheet({ kind: "error", message: res.error });
        return;
      }
      const reaction =
        step.type === "choice" && typeof value.value === "string"
          ? step.reactions?.[value.value]
          : step.type === "verdict"
            ? verdictReaction(value.value, data.numbers)?.text
            : undefined;

      if (!res.complete) {
        setSheet({ kind: "saved", message: reaction ?? "Saved. Come back and update it when things move on." });
        return;
      }

      const newly = !done.has(step.id);
      const nextDone = new Set(done).add(step.id);
      const finishing = newly && nextDone.size === steps.length;
      const bonus = finishing ? mission.bonus : 0;
      const gained = newly ? step.xp + bonus : 0;
      const before = levelFor(xp);
      const after = levelFor(xp + gained);

      setDone(nextDone);
      if (gained) {
        setXp((x) => x + gained);
        setBump((b) => b + 1);
        buzz([12, 40, 18]);
        fireConfetti({ originY: 0.85 });
      }
      setSheet({
        kind: "good",
        gained,
        bonus,
        message: reaction ?? (step.type === "pick-product" ? step.why : PRAISE[Math.floor(Math.random() * PRAISE.length)]),
        levelUp: after.index > before.index ? after : null,
        finishing: nextDone.size === steps.length,
      });
    });
  }

  function proceed() {
    const s = sheet;
    setSheet(null);
    if (s?.kind === "good" && s.finishing) {
      setView("finish");
      setJustFinished(true);
      setTimeout(() => fireConfetti({ big: true, originY: 0.7 }), 150);
      return;
    }
    if (s?.kind === "wrong") return;
    const nextOpen = steps.findIndex((st, i) => i > idx && !done.has(st.id));
    goTo(nextOpen >= 0 ? nextOpen : Math.min(idx + 1, steps.length - 1));
  }

  /** Moves to a step, pre-filling it (e.g. the calculator) if it's still empty. */
  function goTo(i: number) {
    const target = steps[i];
    setData((d) => {
      const seed = seedStepData(target, d);
      return seed ? { ...d, [target.id]: seed } : d;
    });
    setIdx(i);
  }

  if (view === "finish") {
    return (
      <FinishScreen
        mission={mission}
        xp={xp}
        bump={bump}
        animate={justFinished}
        next={next}
        stats={[
          { label: "Steps", value: `+${steps.reduce((sum, s) => sum + s.xp, 0)}` },
          { label: "Bonus", value: `+${mission.bonus}` },
          { label: "Total XP", value: String(xp) },
        ]}
        onReplay={() => {
          setView("play");
          setIdx(0);
        }}
      />
    );
  }

  return (
    <div className="dash-theme flex min-h-[100svh] flex-col bg-bg">
      <TopBar xp={xp} bump={bump} progress={done.size / steps.length}>
        <ol className="flex gap-1.5" aria-label="Steps">
          {steps.map((s, i) => (
            <li key={s.id} className="flex-1">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Step ${i + 1}: ${s.title}${done.has(s.id) ? " (done)" : ""}`}
                aria-current={i === idx ? "step" : undefined}
                className={`block h-2.5 w-full rounded-full transition-all duration-500 ${
                  done.has(s.id) ? "bg-emerald-500" : i === idx ? "bg-accent" : "bg-surface-deep"
                } ${i === idx ? "scale-y-125" : ""}`}
              />
            </li>
          ))}
        </ol>
      </TopBar>

      <main key={step.id} className="animate-in mx-auto w-full max-w-[640px] flex-1 px-5 pb-40 pt-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-subtle">
          {mission.badge.emoji} {mission.title} · Step {idx + 1} of {steps.length}
          <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-accent font-bold">+{step.xp} XP</span>
        </p>
        <h1 className="mt-3 font-display text-[1.875rem] md:text-[2.25rem] font-semibold tracking-[-0.03em] leading-[1.1] text-ink">
          {step.title}
        </h1>
        <p className="mt-2 text-[1.05rem] leading-relaxed text-ink-muted">{step.prompt}</p>
        {step.tip && <p className="mt-2 text-[0.9rem] text-ink-subtle">💡 {step.tip}</p>}

        {done.has(step.id) && (
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[0.8rem] font-medium text-emerald-700">
            ✓ Done - you can still tweak it
          </p>
        )}

        <div className="mt-6">
          <StepWidget step={step} value={value} onChange={change} mission={data} />
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-line bg-white/95 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur">
        <div className="mx-auto flex max-w-[640px] items-center gap-3">
          <p className="hidden flex-1 text-[0.9rem] text-ink-muted sm:block">
            {complete ? "Looking good." : partialOk ? "You can save this and come back." : "Finish the step to check it."}
          </p>
          <button
            type="button"
            onClick={check}
            disabled={!canCheck}
            className={`h-14 flex-1 sm:flex-none sm:min-w-[220px] rounded-2xl text-[1.05rem] font-semibold uppercase tracking-[0.04em] transition-all ${
              canCheck
                ? "bg-accent text-white shadow-[0_5px_0_0_#c2410c] active:translate-y-[3px] active:shadow-[0_2px_0_0_#c2410c]"
                : "bg-surface-deep text-ink-subtle"
            }`}
          >
            {pending ? "Checking…" : !complete && partialOk ? "Save progress" : "Check"}
          </button>
        </div>
      </div>

      {sheet && <ResultSheet sheet={sheet} onNext={proceed} />}
    </div>
  );
}

function ResultSheet({ sheet, onNext }: { sheet: Sheet; onNext: () => void }) {
  const good = sheet.kind === "good";
  const tone = good ? "bg-emerald-50 border-emerald-200" : sheet.kind === "saved" ? "bg-sky-50 border-sky-200" : "bg-rose-50 border-rose-200";
  const wrong = sheet.kind === "wrong";
  const button = good
    ? "bg-emerald-500 shadow-[0_5px_0_0_#15803d]"
    : sheet.kind === "saved"
      ? "bg-sky-500 shadow-[0_5px_0_0_#0369a1]"
      : "bg-rose-500 shadow-[0_5px_0_0_#be123c]";
  const heading = good
    ? sheet.gained
      ? `+${sheet.gained - sheet.bonus} XP${sheet.bonus ? ` · +${sheet.bonus} mission bonus` : ""}`
      : "Updated"
    : sheet.kind === "saved"
      ? "Progress saved"
      : wrong
        ? "Not quite"
        : "Couldn't save that";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40" role="status" aria-live="polite">
      <div className={`sheet-up border-t-2 ${tone} px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-5`}>
        <div className="mx-auto max-w-[640px]">
          <div className="flex items-start gap-3">
            <span aria-hidden className="text-[2rem] leading-none">
              {good ? "🎉" : sheet.kind === "saved" ? "💾" : wrong ? "🤔" : "⚠️"}
            </span>
            <div className="flex-1">
              <p className={`font-display text-[1.25rem] font-semibold ${good ? "text-emerald-800" : sheet.kind === "saved" ? "text-sky-800" : "text-rose-800"}`}>
                {heading}
              </p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-ink">{sheet.message}</p>
              {good && sheet.levelUp && (
                <p className="badge-pop mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[0.9rem] font-semibold text-white">
                  {sheet.levelUp.emoji} Level up! You&rsquo;re now a {sheet.levelUp.name}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            {sheet.kind === "saved" && (
              <Link href="/dashboard/missions" className="inline-flex h-14 flex-1 items-center justify-center rounded-2xl border-2 border-sky-200 bg-white font-semibold text-sky-800">
                Back to map
              </Link>
            )}
            <button
              type="button"
              autoFocus
              onClick={onNext}
              className={`h-14 flex-1 rounded-2xl text-[1.05rem] font-semibold uppercase tracking-[0.04em] text-white transition-transform active:translate-y-[3px] ${button}`}
            >
              {sheet.kind === "error" ? "Got it" : wrong ? "Try again" : good && sheet.finishing ? "Finish mission" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
