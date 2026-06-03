"use client";

import Link from "next/link";
import { useState } from "react";
import { recordExamPass } from "../_lib/module-exam-results";
import type { QuizQuestion } from "./lesson-quiz";

type Props = {
  questions: QuizQuestion[];
  moduleId: string;
  moduleName: string;
  passThreshold: number;
};

export function ModuleExam({
  questions,
  moduleId,
  moduleName,
  passThreshold,
}: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = questions.length;
  const answered = Object.keys(answers).length;
  const allAnswered = answered === total;

  const correct = submitted
    ? questions.reduce(
        (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
        0,
      )
    : 0;
  const percent = submitted ? Math.round((correct / total) * 100) : 0;
  const passed = submitted && correct / total >= passThreshold;
  const passPercent = Math.round(passThreshold * 100);

  function selectAnswer(qIdx: number, oIdx: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  }

  function submit() {
    if (!allAnswered) return;
    const correctCount = questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
      0,
    );
    const pct = Math.round((correctCount / total) * 100);

    setSubmitted(true);

    if (correctCount / total >= passThreshold) {
      // Fire-and-forget; persistence failures should not block the result UI.
      void recordExamPass(moduleId, pct).catch(() => {});
    }

    queueMicrotask(() => {
      document
        .getElementById("exam-result")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function reset() {
    setSubmitted(false);
    setAnswers({});
    queueMicrotask(() => {
      document
        .getElementById("exam-top")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div id="exam-top">
      <header className="rounded-2xl bg-ink text-white p-7 md:p-9">
        <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-white/50">
          🎓 Final Exam
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mt-2">
          {moduleName}
        </h1>
        <p className="text-[0.95rem] text-white/80 leading-relaxed max-w-2xl mt-4">
          {total} questions covering everything from the FBA fundamentals
          through to the unit economics that hold the model together. Score
          <span className="font-semibold text-white"> {passPercent}% </span>
          or higher to pass.
        </p>
        <div className="mt-5 pt-5 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-white/60">
          <span>{total} questions</span>
          <span className="hidden md:inline">·</span>
          <span>{passPercent}% to pass</span>
          <span className="hidden md:inline">·</span>
          <span>Unlimited attempts</span>
        </div>
      </header>

      <div className="mt-6 sticky top-2 z-10">
        <div className="rounded-full bg-surface border-2 border-line shadow-sm px-5 py-2.5 flex items-center justify-between">
          <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
            Progress
          </p>
          <p className="font-display text-sm font-bold text-ink">
            {submitted ? total : answered} / {total}
          </p>
        </div>
      </div>

      <ol className="mt-8 space-y-5">
        {questions.map((q, qIdx) => {
          const userChoice = answers[qIdx];
          return (
            <li
              key={qIdx}
              className="rounded-2xl border-2 border-line bg-surface p-5 md:p-6"
            >
              <p className="font-medium text-ink leading-snug">
                <span className="text-ink-subtle font-mono mr-2">
                  Q{qIdx + 1}.
                </span>
                {q.question}
              </p>
              <div className="mt-4 space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isCorrect = submitted && oIdx === q.correctIndex;
                  const isWrongUserChoice =
                    submitted &&
                    userChoice === oIdx &&
                    oIdx !== q.correctIndex;
                  const isUserChoice = userChoice === oIdx;

                  let cls =
                    "border-line bg-surface hover:border-ink/30 hover:bg-surface-alt";
                  if (submitted) {
                    if (isCorrect) cls = "border-emerald-400 bg-emerald-50";
                    else if (isWrongUserChoice)
                      cls = "border-rose-400 bg-rose-50";
                    else cls = "border-line bg-surface opacity-50";
                  } else if (isUserChoice) {
                    cls = "border-accent bg-accent-soft";
                  }

                  return (
                    <button
                      type="button"
                      key={oIdx}
                      onClick={() => selectAnswer(qIdx, oIdx)}
                      disabled={submitted}
                      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-150 ${cls} ${
                        submitted ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                          isUserChoice ? "border-current" : "border-line"
                        }`}
                      >
                        {isUserChoice && (
                          <span className="h-2.5 w-2.5 rounded-full bg-current" />
                        )}
                      </span>
                      <span className="flex-1 text-[0.95rem] text-ink">
                        {opt}
                      </span>
                      {isCorrect && (
                        <span className="text-emerald-700 font-bold text-sm">
                          ✓
                        </span>
                      )}
                      {isWrongUserChoice && (
                        <span className="text-rose-700 font-bold text-sm">
                          ✗
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {submitted && q.explanation && (
                <p className="mt-4 text-[0.85rem] text-ink-muted leading-relaxed border-l-2 border-line pl-3">
                  {q.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {!submitted ? (
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={submit}
            disabled={!allAnswered}
            className="h-12 px-7 rounded-full bg-accent text-white text-[0.95rem] font-medium shadow-[0_1px_2px_rgba(10,10,10,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            Submit exam
          </button>
          <p className="text-[0.85rem] text-ink-muted">
            {answered} / {total} answered
            {!allAnswered && " · answer every question to submit"}
          </p>
        </div>
      ) : (
        <div
          id="exam-result"
          className={`mt-8 rounded-2xl border-2 p-7 md:p-9 ${
            passed
              ? "border-emerald-300 bg-gradient-to-br from-emerald-50 via-emerald-50/60 to-white"
              : "border-rose-300 bg-gradient-to-br from-rose-50 via-rose-50/60 to-white"
          }`}
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl leading-none">
              {passed ? "🎉" : "⏳"}
            </span>
            <p
              className={`font-mono text-[0.65rem] tracking-[0.18em] uppercase ${
                passed ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {passed ? "Passed" : "Not Yet"}
            </p>
          </div>

          <p
            className={`font-display text-5xl md:text-6xl font-bold leading-none mt-2 ${
              passed ? "text-emerald-900" : "text-rose-900"
            }`}
          >
            {percent}%
          </p>
          <p
            className={`mt-2 font-mono text-[0.75rem] tracking-[0.12em] uppercase ${
              passed ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {correct} of {total} correct · {passPercent}% to pass
          </p>

          <p
            className={`mt-5 text-[0.95rem] leading-relaxed ${
              passed ? "text-emerald-900" : "text-rose-900"
            }`}
          >
            {passed
              ? `Module 1 complete. You have a solid grip on the FBA fundamentals: how the infrastructure works, why the Prime badge matters, the three fee layers, how bundling creates an ASIN you own, and what makes the unit economics compound.`
              : `You did not clear the ${passPercent}% threshold. Review any lesson where the explanation surprised you and try again. There is no limit on attempts.`}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="h-11 px-5 rounded-full border-2 border-ink/10 bg-surface text-ink text-[0.9rem] font-medium transition-all duration-200 hover:-translate-y-px hover:border-ink/30"
            >
              {passed ? "Retake exam" : "Try again"}
            </button>
            <Link
              href="/dashboard/modules"
              className="h-11 inline-flex items-center px-5 rounded-full bg-ink text-white text-[0.9rem] font-medium transition-all duration-200 hover:-translate-y-px hover:opacity-90"
            >
              Back to modules
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
