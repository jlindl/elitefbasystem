"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { GraduationCap } from "@/app/components/icons";
import { recordExamPass } from "../_lib/module-exam-results";
import { buzz, fireConfetti } from "./confetti";
import type { QuizQuestion } from "./lesson-quiz";

type Props = {
  questions: QuizQuestion[];
  moduleId: string;
  moduleName: string;
  moduleNumber?: number;
  passThreshold: number;
};

export function ModuleExam({ questions, moduleId, moduleName, moduleNumber, passThreshold }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  // Saving the pass on the server (which issues the certificate).
  const [save, setSave] = useState<{ state: "idle" | "saving" | "saved" | "error"; error?: string; certificate?: string | null }>({ state: "idle" });

  const total = questions.length;
  const answered = Object.keys(answers).length;
  const allAnswered = answered === total;
  const correct = questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const percent = Math.round((correct / total) * 100);
  const passed = submitted && correct / total >= passThreshold;
  const passPercent = Math.round(passThreshold * 100);
  const title = moduleName.replace(/^Module\s+\d+\s*[-:]\s*/i, "");

  function select(q: number, o: number) {
    if (submitted) return;
    buzz(8);
    setAnswers((prev) => ({ ...prev, [q]: o }));
  }

  function jumpToUnanswered() {
    const i = questions.findIndex((_, idx) => answers[idx] === undefined);
    if (i >= 0) document.getElementById(`exam-q-${i}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function submit() {
    if (!allAnswered) {
      jumpToUnanswered();
      return;
    }
    setSubmitted(true);
    if (correct / total >= passThreshold) void savePass();
    // Move focus to the result so keyboard and screen-reader users land on (and hear) the outcome.
    requestAnimationFrame(() => {
      document.getElementById("exam-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
      resultHeading.current?.focus({ preventScroll: true });
    });
  }

  async function savePass() {
    setSave({ state: "saving" });
    try {
      const res = await recordExamPass(
        moduleId,
        questions.map((_, i) => answers[i] ?? -1),
      );
      if (res.ok && res.passed) {
        setSave({ state: "saved", certificate: res.certificate });
        // Celebrate once the pass is actually saved, not before.
        window.setTimeout(() => fireConfetti({ big: true, originY: 0.6 }), 150);
        buzz([12, 40, 18, 40, 24]);
      } else setSave({ state: "error", error: res.ok ? "Your answers couldn't be confirmed. Please submit again." : res.error });
    } catch {
      setSave({ state: "error", error: "We couldn't reach the server. Check your connection and try again." });
    }
  }

  function reset() {
    setSave({ state: "idle" });
    setSubmitted(false);
    setAnswers({});
    requestAnimationFrame(() => document.getElementById("exam-top")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  const saveAnnouncement =
    save.state === "saving"
      ? "Saving your pass and issuing your certificate."
      : save.state === "saved"
        ? "Saved. Your certificate is ready."
        : save.state === "error"
          ? (save.error ?? "")
          : "";

  return (
    <div id="exam-top" className="scroll-mt-24">
      <p className="sr-only" aria-live="polite">
        {saveAnnouncement}
      </p>
      <header className="dash-grid-dark relative overflow-hidden rounded-[2rem] bg-ink p-7 text-white md:p-10">
        <div aria-hidden className="absolute -right-20 -top-24 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,107,26,0.35), transparent 65%)" }} />
        <div className="relative">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-accent text-white shadow-lg">
            <GraduationCap size={28} />
          </span>
          <p className="mt-5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-accent">
            Final exam{moduleNumber ? ` · Module ${moduleNumber}` : ""}
          </p>
          <h1 className="mt-2 font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[2.75rem]">{title}</h1>
          <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-white/70">
            {total} questions covering everything in this module. Score <b className="text-white">{passPercent}%</b> or higher to pass. Take
            your time - there&rsquo;s no limit on attempts.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[0.8rem]">
            {[`${total} questions`, `${passPercent}% to pass`, "Unlimited attempts"].map((t) => (
              <span key={t} className="rounded-full bg-white/10 px-3 py-1.5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {!submitted && (
        <div className="sticky top-[60px] z-20 mt-6">
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-xl">
            <p className="font-display text-[0.95rem] font-semibold tabular-nums text-ink">
              {answered}/{total}
            </p>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-deep">
              <div className="h-full rounded-full bg-gradient-to-r from-accent to-[#ffb347] transition-[width] duration-500" style={{ width: `${(answered / total) * 100}%` }} />
            </div>
            {!allAnswered && answered > 0 && (
              <button type="button" onClick={jumpToUnanswered} className="hidden text-[0.8rem] font-medium text-accent hover:underline sm:block">
                Next unanswered ↓
              </button>
            )}
          </div>
        </div>
      )}

      <ol className="mt-6 space-y-4">
        {questions.map((q, qi) => {
          const choice = answers[qi];
          return (
            <li
              key={qi}
              id={`exam-q-${qi}`}
              className={`scroll-mt-40 rounded-3xl border bg-surface p-5 transition-colors sm:p-6 ${
                submitted ? (choice === q.correctIndex ? "border-emerald-200" : "border-rose-200") : choice !== undefined ? "border-ink/15" : "border-line"
              }`}
            >
              <p className="flex gap-3 font-medium leading-snug text-ink">
                <span
                  className={`inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-lg px-1.5 font-mono text-[0.72rem] font-bold ${
                    submitted ? (choice === q.correctIndex ? "bg-emerald-500 text-white" : "bg-rose-500 text-white") : choice !== undefined ? "bg-ink text-white" : "bg-surface-alt text-ink-subtle"
                  }`}
                >
                  {qi + 1}
                </span>
                <span className="pt-0.5">{q.question}</span>
              </p>
              <div className="mt-4 grid gap-2">
                {q.options.map((opt, oi) => {
                  const isCorrect = submitted && oi === q.correctIndex;
                  const isWrong = submitted && choice === oi && oi !== q.correctIndex;
                  const isChoice = choice === oi;
                  return (
                    <button
                      type="button"
                      key={oi}
                      onClick={() => select(qi, oi)}
                      disabled={submitted}
                      aria-pressed={isChoice}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 ${
                        isCorrect
                          ? "border-emerald-400 bg-emerald-50"
                          : isWrong
                            ? "border-rose-300 bg-rose-50"
                            : submitted
                              ? "border-transparent bg-surface-alt/50 opacity-55"
                              : isChoice
                                ? "border-accent bg-accent-soft/60"
                                : "border-line bg-surface hover:border-ink/25 hover:bg-surface-alt/40"
                      }`}
                    >
                      <span
                        className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[0.65rem] font-bold ${
                          isCorrect ? "border-emerald-500 bg-emerald-500 text-white" : isWrong ? "border-rose-500 bg-rose-500 text-white" : isChoice ? "border-accent bg-accent text-white" : "border-line text-transparent"
                        }`}
                      >
                        {isCorrect ? "✓" : isWrong ? "✗" : "●"}
                      </span>
                      <span className="flex-1 text-[0.95rem] text-ink">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {submitted && q.explanation && (
                <p className="mt-3 rounded-xl bg-surface-alt px-4 py-3 text-[0.88rem] leading-relaxed text-ink-muted">{q.explanation}</p>
              )}
            </li>
          );
        })}
      </ol>

      {!submitted ? (
        <div className="mt-8 flex flex-col items-start gap-3 rounded-3xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex-1">
            <p className="font-display text-[1.1rem] font-semibold text-ink">{allAnswered ? "All answered - ready when you are." : `${total - answered} still to answer`}</p>
            <p className="text-[0.85rem] text-ink-muted">Answers are marked once you submit.</p>
          </div>
          <button
            type="button"
            onClick={submit}
            className={`inline-flex h-14 items-center justify-center rounded-2xl px-8 text-[1rem] font-semibold text-white transition-transform ${
              allAnswered ? "bg-accent shadow-[0_5px_0_0_#c2410c] active:translate-y-[3px] active:shadow-[0_2px_0_0_#c2410c]" : "bg-ink/40"
            }`}
          >
            {allAnswered ? "Submit exam" : "Find unanswered"}
          </button>
        </div>
      ) : (
        <section
          id="exam-result"
          className={`scroll-mt-24 mt-8 overflow-hidden rounded-[2rem] border p-7 md:p-10 ${
            passed ? "border-emerald-200 bg-gradient-to-br from-emerald-50 via-surface to-surface" : "border-rose-200 bg-gradient-to-br from-rose-50 via-surface to-surface"
          }`}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div
              className={`pop-in inline-flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-full border-[10px] ${
                passed ? "border-emerald-400 text-emerald-800" : "border-rose-300 text-rose-800"
              }`}
            >
              <span className="font-display text-[2.25rem] font-semibold leading-none tabular-nums">{percent}%</span>
              <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.12em]">
                {correct}/{total}
              </span>
            </div>
            <div>
              <p className={`font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] ${passed ? "text-emerald-700" : "text-rose-700"}`}>
                {passed ? "🎉 Passed" : "⏳ Not yet"}
              </p>
              <h2 ref={resultHeading} tabIndex={-1} className="mt-1 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-ink outline-none">
                {!passed
                  ? `You need ${passPercent}% to pass.`
                  : save.state === "saved"
                    ? `${moduleNumber ? `Module ${moduleNumber}` : "Module"} complete.`
                    : save.state === "error"
                      ? "You passed, but it isn't saved yet."
                      : "You passed!"}
              </h2>
              <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-ink-muted">
                {!passed
                  ? "Read the explanations above for the ones you missed, revisit those lessons, then try again. There's no limit on attempts."
                  : save.state === "saved"
                    ? `You've passed the ${title} exam. It's marked complete on your dashboard - on to the next module.`
                    : save.state === "error"
                      ? "Your result hasn't been recorded, so your certificate hasn't been issued yet. See below."
                      : `You've passed the ${title} exam. Saving your result…`}
              </p>
            </div>
          </div>
          {passed && (
            <div className="mt-7">
              {save.state === "saving" && (
                <p className="inline-flex items-center gap-2 rounded-2xl bg-surface px-4 py-3 text-[0.9375rem] font-medium text-ink-muted ring-1 ring-line">
                  <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-ink/20 border-t-ink" />
                  Saving your pass and issuing your certificate…
                </p>
              )}
              {save.state === "saved" && (
                <div className="pop-in flex flex-col gap-4 rounded-3xl bg-ink p-5 text-white sm:flex-row sm:items-center sm:p-6">
                  <span aria-hidden className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7a2e] to-[#ffb14f] text-[1.75rem]">
                    🏅
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[1.25rem] font-semibold leading-snug">Your certificate is ready</p>
                    <p className="mt-0.5 text-[0.9375rem] text-white/80">
                      {moduleNumber ? `Module ${moduleNumber}` : "Module"} certificate of completion, with your name and a link anyone can verify.
                    </p>
                  </div>
                  {save.certificate && (
                    <Link href={`/dashboard/certificates/${save.certificate}?new=1`} className="btn h-12 shrink-0 bg-white text-ink hover:bg-white/90">
                      View certificate
                    </Link>
                  )}
                </div>
              )}
              {save.state === "error" && (
                <div className="flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 sm:flex-row sm:items-center">
                  <p className="flex-1 text-[0.9375rem] font-medium text-rose-800">{save.error}</p>
                  {save.error?.includes("lesson") ? (
                    <Link href={`/dashboard/modules/${moduleId}`} className="btn btn-secondary h-11">
                      Go to the lessons
                    </Link>
                  ) : (
                    <button type="button" onClick={() => void savePass()} className="btn btn-secondary h-11">
                      Try saving again
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={reset} className="btn btn-secondary">
              {passed ? "Retake exam" : "Try again"}
            </button>
            <Link href={`/dashboard/modules/${moduleId}`} className={`btn ${passed ? "btn-secondary" : "btn-primary btn-aa"}`}>
              Back to the module
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
