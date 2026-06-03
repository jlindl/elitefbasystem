"use client";

import { useState } from "react";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export function LessonQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = Object.keys(answers).length === questions.length;
  const score = submitted
    ? questions.reduce(
        (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
        0,
      )
    : 0;

  function selectAnswer(qIdx: number, oIdx: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  }

  function submit() {
    if (!allAnswered) return;
    setSubmitted(true);
    queueMicrotask(() => {
      document
        .getElementById("quiz-summary")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  function reset() {
    setSubmitted(false);
    setAnswers({});
  }

  return (
    <section className="mt-14 pt-8 border-t border-line">
      <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ink-subtle">
        Knowledge check
      </p>
      <h2 className="mt-2 font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-ink">
        Did the key ideas land?
      </h2>
      <p className="mt-2 text-[0.95rem] text-ink-muted leading-relaxed">
        Five quick questions. No grade, no penalty, just a way to make sure
        the lesson stuck.
      </p>

      <div className="mt-8 space-y-5">
        {questions.map((q, qIdx) => {
          const userChoice = answers[qIdx];
          return (
            <div
              key={qIdx}
              className="rounded-2xl border border-line bg-surface p-5"
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
            </div>
          );
        })}
      </div>

      <div
        id="quiz-summary"
        className="mt-8 flex flex-wrap items-center gap-4"
      >
        {!submitted ? (
          <>
            <button
              type="button"
              onClick={submit}
              disabled={!allAnswered}
              className="h-12 px-6 rounded-full bg-accent text-white text-[0.95rem] font-medium shadow-[0_1px_2px_rgba(10,10,10,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              Check answers
            </button>
            <p className="text-[0.85rem] text-ink-muted">
              {Object.keys(answers).length} / {questions.length} answered
            </p>
          </>
        ) : (
          <>
            <p className="text-[1.05rem] font-medium text-ink">
              You scored{" "}
              <span
                className={
                  score === questions.length
                    ? "text-emerald-700"
                    : score >= questions.length / 2
                    ? "text-ink"
                    : "text-rose-700"
                }
              >
                {score}
              </span>{" "}
              <span className="text-ink-muted">/ {questions.length}</span>
            </p>
            <button
              type="button"
              onClick={reset}
              className="h-11 px-5 rounded-full border border-line bg-surface text-ink text-[0.9rem] font-medium transition-all duration-200 hover:-translate-y-px hover:border-ink/30"
            >
              Try again
            </button>
          </>
        )}
      </div>
    </section>
  );
}
