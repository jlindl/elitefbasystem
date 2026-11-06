"use client";

import { useState, useTransition } from "react";
import {
  XP_PER_PICK,
  XP_PER_SORT_ITEM,
  quizPoints,
  type Exercise,
  type QuizAnswers,
} from "../_lib/mission-quizzes";
import { levelFor, type Mission, type QuizStep, type StepRecord } from "../_lib/missions";
import { saveStep } from "../_lib/mission-progress";
import { buzz, fireConfetti } from "./confetti";
import { FinishScreen, TopBar, type NextMission } from "./mission-finish";
import { QuizCard } from "./quiz-cards";

const RIGHT = ["Correct!", "Nailed it.", "Spot on.", "That's the one.", "Sharp eye.", "Exactly."];

type Feedback = { right: boolean; why: string; gained: number; answerLabel?: string };

export function QuizPlayer({
  mission,
  initial,
  totalXp,
  next,
  demo = false,
}: {
  mission: Mission;
  initial: StepRecord | undefined;
  totalXp: number;
  next: NextMission;
  demo?: boolean;
}) {
  const step = mission.steps[0] as QuizStep;
  const exercises = step.exercises;
  const byId = new Map(exercises.map((e) => [e.id, e]));

  const prevComplete = !!initial?.completedAt;
  const prevBest = prevComplete ? quizPoints(exercises, (initial?.data.answers as QuizAnswers) ?? {}) : null;
  // XP from everything except this mission, so a replay only adds an improvement.
  const baseXp = totalXp - (prevBest ? prevBest.xp + mission.bonus : 0);

  const [view, setView] = useState<"play" | "finish">(prevComplete ? "finish" : "play");
  const [queue, setQueue] = useState<string[]>(() => exercises.map((e) => e.id));
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [picked, setPicked] = useState<number | null>(null);
  const [sortIdx, setSortIdx] = useState(0);
  const [sortPicks, setSortPicks] = useState<boolean[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [combo, setCombo] = useState(0);
  const [earned, setEarned] = useState(0);
  const [bump, setBump] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof quizPoints> | null>(prevBest);
  const [justFinished, setJustFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const ex = byId.get(queue[pos])!;
  const firstAttempt = answers[ex.id] === undefined;
  const progress = pos / queue.length;
  const liveXp = baseXp + (prevBest ? Math.max(0, earned - prevBest.xp) : earned);

  function award(xp: number) {
    if (!xp) return;
    setEarned((e) => e + xp);
    setBump((b) => b + 1);
  }

  /* ----------------------- pick / spot ----------------------- */
  function checkPick() {
    if (picked === null || ex.kind === "sort") return;
    const right = picked === ex.answer;
    const gained = right && firstAttempt ? XP_PER_PICK : 0;
    if (firstAttempt) setAnswers((a) => ({ ...a, [ex.id]: picked }));
    if (right) {
      award(gained);
      setCombo((c) => c + 1);
      buzz([10, 30, 14]);
      if (combo + 1 >= 3) fireConfetti({ originY: 0.9 });
    } else {
      setCombo(0);
      buzz(60);
      // Mistakes come back at the end, Duolingo-style.
      setQueue((q) => [...q, ex.id]);
    }
    const options = ex.kind === "pick" ? ex.options : ex.items;
    const correct = options[ex.answer];
    setFeedback({
      right,
      gained,
      why: ex.why,
      answerLabel: !right && correct.kind === "text" ? correct.text : undefined,
    });
  }

  /* --------------------------- sort --------------------------- */
  function answerSort(saysGood: boolean) {
    if (ex.kind !== "sort" || feedback) return;
    const item = ex.items[sortIdx];
    const right = item.good === saysGood;
    const picks = [...sortPicks, saysGood];
    setSortPicks(picks);
    const gained = right && firstAttempt ? XP_PER_SORT_ITEM : 0;
    award(gained);
    if (right) {
      setCombo((c) => c + 1);
      buzz(10);
    } else {
      setCombo(0);
      buzz(60);
    }
    setFeedback({ right, gained, why: item.why });
  }

  /* ------------------------- advance -------------------------- */
  function next_() {
    setFeedback(null);
    setPicked(null);
    if (ex.kind === "sort" && sortIdx < ex.items.length - 1) {
      setSortIdx((i) => i + 1);
      return;
    }
    if (ex.kind === "sort" && firstAttempt) setAnswers((a) => ({ ...a, [ex.id]: sortPicks }));
    setSortIdx(0);
    setSortPicks([]);

    const finalAnswers = ex.kind === "sort" && firstAttempt ? { ...answers, [ex.id]: sortPicks } : answers;
    if (pos + 1 < queue.length) {
      setPos((p) => p + 1);
      return;
    }
    finish(finalAnswers);
  }

  function finish(finalAnswers: QuizAnswers) {
    const score = quizPoints(exercises, finalAnswers);
    startTransition(async () => {
      const res = demo ? { ok: true as const } : await saveStep(mission.id, step.id, { answers: finalAnswers });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setResult(score);
      if (!prevComplete) setBump((b) => b + 1);
      setView("finish");
      setJustFinished(true);
      setTimeout(() => fireConfetti({ big: true, originY: 0.7 }), 150);
    });
  }

  function replay() {
    setQueue(exercises.map((e) => e.id));
    setPos(0);
    setAnswers({});
    setEarned(0);
    setCombo(0);
    setPicked(null);
    setSortIdx(0);
    setSortPicks([]);
    setFeedback(null);
    setJustFinished(false);
    setView("play");
  }

  /* -------------------------- finish -------------------------- */
  if (view === "finish" && result) {
    const pct = Math.round((result.right / result.total) * 100);
    const bestXp = Math.max(result.xp, prevBest?.xp ?? 0);
    const finalXp = baseXp + bestXp + mission.bonus;
    const before = levelFor(baseXp + (prevBest ? prevBest.xp + mission.bonus : 0));
    const after = levelFor(finalXp);
    return (
      <FinishScreen
        mission={mission}
        xp={finalXp}
        bump={bump}
        animate={justFinished}
        next={next}
        headline={pct === 100 ? "Flawless round 🔥" : pct >= 80 ? "Mission complete" : "Mission complete - replay for a better score"}
        stats={[
          { label: "Accuracy", value: `${pct}%` },
          { label: "Quiz XP", value: `+${result.xp}` },
          { label: "Total XP", value: String(finalXp) },
        ]}
        onReplay={replay}
        replayLabel={pct === 100 ? "Play it again" : "Replay to beat your score (best counts)"}
      >
        {after.index > before.index && justFinished && (
          <p className="badge-pop mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[0.9rem] font-semibold text-white">
            {after.emoji} Level up! You&rsquo;re now a {after.name}
          </p>
        )}
      </FinishScreen>
    );
  }

  /* --------------------------- play --------------------------- */
  // Retries are queued after the first pass through every exercise.
  const isRetry = pos >= exercises.length;
  return (
    <div className="dash-theme flex min-h-[100svh] flex-col bg-bg">
      <TopBar xp={liveXp} bump={bump} progress={progress} />

      <main key={`${ex.id}-${pos}`} className="animate-in mx-auto w-full max-w-[640px] flex-1 px-5 pb-48 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-subtle">
            {mission.badge.emoji} {mission.title}
          </span>
          {isRetry && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] font-bold text-amber-800">
              🔁 Second chance
            </span>
          )}
          {combo >= 3 && (
            <span className="xp-bump rounded-full bg-accent px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] font-bold text-white">
              🔥 {combo} in a row
            </span>
          )}
        </div>
        <h1 className="mt-3 font-display text-[1.6rem] md:text-[2rem] font-semibold tracking-[-0.03em] leading-[1.15] text-ink">
          {ex.prompt}
        </h1>
        {ex.context && (
          <p className="mt-3 rounded-2xl bg-surface-alt px-4 py-3 text-[0.9rem] leading-relaxed text-ink-muted">{ex.context}</p>
        )}

        <div className="mt-6">
          {ex.kind === "sort" ? (
            <SortRound ex={ex} idx={sortIdx} feedback={feedback} onAnswer={answerSort} />
          ) : (
            <Options ex={ex} picked={picked} onPick={(i) => !feedback && setPicked(i)} feedback={feedback} />
          )}
        </div>
        {error && <p className="mt-4 rounded-2xl bg-rose-50 p-4 text-[0.9rem] text-rose-800">{error}</p>}
      </main>

      {/* Bottom bar: check button, or the feedback sheet */}
      {feedback ? (
        <FeedbackSheet feedback={feedback} combo={combo} onNext={next_} pending={pending} />
      ) : ex.kind !== "sort" ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-line bg-white/95 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur">
          <div className="mx-auto max-w-[640px]">
            <button
              type="button"
              onClick={checkPick}
              disabled={picked === null}
              className={`h-14 w-full rounded-2xl text-[1.05rem] font-semibold uppercase tracking-[0.04em] transition-all ${
                picked !== null
                  ? "bg-accent text-white shadow-[0_5px_0_0_#c2410c] active:translate-y-[3px] active:shadow-[0_2px_0_0_#c2410c]"
                  : "bg-surface-deep text-ink-subtle"
              }`}
            >
              Check
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Options({
  ex,
  picked,
  onPick,
  feedback,
}: {
  ex: Extract<Exercise, { kind: "pick" | "spot" }>;
  picked: number | null;
  onPick: (i: number) => void;
  feedback: Feedback | null;
}) {
  const cards = ex.kind === "pick" ? ex.options : ex.items;
  const images = cards.every((c) => c.kind === "image");
  const products = cards.some((c) => c.kind === "product");
  const grid = images ? "grid-cols-2" : products ? "sm:grid-cols-2" : "grid-cols-1";

  return (
    <div className={`grid gap-3 ${grid}`} role="radiogroup">
      {cards.map((card, i) => {
        const on = picked === i;
        const showRight = !!feedback && i === ex.answer;
        const showWrong = !!feedback && on && i !== ex.answer;
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => {
              buzz(8);
              onPick(i);
            }}
            className={`relative rounded-2xl border-2 p-3.5 text-left transition-all active:scale-[0.98] ${
              showRight
                ? "border-emerald-500 bg-emerald-50 shadow-[0_4px_0_0_#10b981]"
                : showWrong
                  ? "border-rose-400 bg-rose-50 shadow-[0_4px_0_0_#fb7185] animate-[shake_400ms]"
                  : on
                    ? "border-accent bg-accent-soft/60 shadow-[0_4px_0_0_#ff6b1a]"
                    : "border-line bg-white shadow-[0_4px_0_0_var(--color-line)] hover:border-ink/25"
            }`}
          >
            {!images && (
              <span
                aria-hidden
                className={`mb-2 inline-flex h-6 w-6 items-center justify-center rounded-lg border-2 font-mono text-[0.7rem] font-bold ${
                  on || showRight ? "border-transparent bg-ink text-white" : "border-line text-ink-subtle"
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
            )}
            <QuizCard card={card} compact={ex.kind === "spot"} />
            {showRight && (
              <span aria-hidden className="absolute -right-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[0.85rem] font-bold text-white">
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function SortRound({
  ex,
  idx,
  feedback,
  onAnswer,
}: {
  ex: Extract<Exercise, { kind: "sort" }>;
  idx: number;
  feedback: Feedback | null;
  onAnswer: (good: boolean) => void;
}) {
  const item = ex.items[idx];
  const isImage = item.card.kind === "image";
  return (
    <div>
      <div className="mb-3 flex gap-1.5" aria-label={`Card ${idx + 1} of ${ex.items.length}`}>
        {ex.items.map((_, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i < idx ? "bg-ink" : i === idx ? "bg-accent" : "bg-surface-deep"}`} />
        ))}
      </div>
      <div
        key={idx}
        className={`animate-in mx-auto rounded-3xl border-2 bg-white p-5 shadow-[0_10px_30px_-12px_rgba(10,10,10,0.25)] transition-colors ${
          feedback ? (feedback.right ? "border-emerald-500" : "border-rose-400") : "border-line"
        } ${isImage ? "max-w-[300px]" : ""}`}
      >
        <div className={isImage ? "" : "py-4 text-center [&_span]:text-center [&_span]:text-[1.25rem] [&_span]:font-display [&_span]:font-semibold"}>
          <QuizCard card={item.card} />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          { v: false, label: ex.bad, emoji: "👎", cls: "border-rose-300 text-rose-700 shadow-[0_5px_0_0_#fda4af]" },
          { v: true, label: ex.good, emoji: "👍", cls: "border-emerald-300 text-emerald-700 shadow-[0_5px_0_0_#6ee7b7]" },
        ].map((b) => (
          <button
            key={String(b.v)}
            type="button"
            disabled={!!feedback}
            onClick={() => onAnswer(b.v)}
            className={`flex h-20 flex-col items-center justify-center rounded-2xl border-2 bg-white font-display text-[1rem] font-semibold transition-transform active:translate-y-[3px] disabled:opacity-50 ${b.cls}`}
          >
            <span className="text-[1.5rem] leading-none" aria-hidden>
              {b.emoji}
            </span>
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function FeedbackSheet({
  feedback,
  combo,
  onNext,
  pending,
}: {
  feedback: Feedback;
  combo: number;
  onNext: () => void;
  pending: boolean;
}) {
  const { right } = feedback;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40" role="status" aria-live="polite">
      <div className={`sheet-up border-t-2 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-5 ${right ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
        <div className="mx-auto max-w-[640px]">
          <div className="flex items-start gap-3">
            <span aria-hidden className="text-[2rem] leading-none">
              {right ? (combo >= 3 ? "🔥" : "🎉") : "🤔"}
            </span>
            <div className="flex-1">
              <p className={`font-display text-[1.25rem] font-semibold ${right ? "text-emerald-800" : "text-rose-800"}`}>
                {right
                  ? `${RIGHT[combo % RIGHT.length]}${feedback.gained ? ` +${feedback.gained} XP` : ""}`
                  : "Not quite"}
              </p>
              {!right && feedback.answerLabel && (
                <p className="mt-1 text-[0.9rem] font-semibold text-rose-900">Answer: {feedback.answerLabel}</p>
              )}
              <p className="mt-1 text-[0.95rem] leading-relaxed text-ink">{feedback.why}</p>
              {!right && <p className="mt-1.5 text-[0.8rem] text-rose-700">You&rsquo;ll get another go at the end.</p>}
            </div>
          </div>
          <button
            type="button"
            autoFocus
            onClick={onNext}
            disabled={pending}
            className={`mt-4 h-14 w-full rounded-2xl text-[1.05rem] font-semibold uppercase tracking-[0.04em] text-white transition-transform active:translate-y-[3px] disabled:opacity-60 ${
              right ? "bg-emerald-500 shadow-[0_5px_0_0_#15803d]" : "bg-rose-500 shadow-[0_5px_0_0_#be123c]"
            }`}
          >
            {pending ? "Saving…" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
