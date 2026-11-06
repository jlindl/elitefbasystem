"use client";

import { useRef, useState } from "react";
import { buzz, fireConfetti } from "./confetti";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

/** Knowledge check: each answer is marked the moment you tap it. */
export function LessonQuiz({ questions, headingLevel = 2 }: { questions: QuizQuestion[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answered = Object.keys(answers).length;
  const score = questions.reduce((a, q, i) => a + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const finished = answered === questions.length;
  // Read out after each answer, since the result appears away from the button you pressed.
  const [said, setSaid] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);

  function pick(q: number, o: number) {
    if (answers[q] !== undefined) return;
    const next = { ...answers, [q]: o };
    setAnswers(next);
    const right = o === questions[q].correctIndex;
    buzz(right ? 12 : 50);
    let line = `${right ? "Correct." : "Not quite."} ${questions[q].explanation ?? ""}`;
    if (Object.keys(next).length === questions.length) {
      const total = questions.reduce((a, qq, i) => a + (next[i] === qq.correctIndex ? 1 : 0), 0);
      line += ` That's all ${questions.length} answered: ${total} correct.`;
      if (total === questions.length) setTimeout(() => fireConfetti({ originY: 0.7 }), 200);
    }
    setSaid(line.trim());
  }

  return (
    <section className="!mt-16 rounded-3xl border border-line bg-surface p-5 sm:p-8" aria-labelledby="knowledge-check">
      <p aria-live="polite" className="sr-only">
        {said}
      </p>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.875rem] font-semibold text-orange-800"><span aria-hidden>🧠 </span>Knowledge check</p>
          <Heading ref={heading} tabIndex={-1} id="knowledge-check" className="mt-1 font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-ink outline-none">
            Did the key ideas land?
          </Heading>
          <p className="mt-1 text-[0.92rem] text-ink-muted">Tap an answer - you&rsquo;ll see straight away if it&rsquo;s right. No grade, no penalty.</p>
        </div>
        <div role="img" className="flex items-center gap-1.5" aria-label={`${answered} of ${questions.length} answered`}>
          {questions.map((q, i) => (
            <span
              key={i}
              className={`h-2.5 w-6 rounded-full transition-colors duration-300 ${
                answers[i] === undefined ? "bg-surface-deep" : answers[i] === q.correctIndex ? "bg-emerald-500" : "bg-rose-400"
              }`}
            />
          ))}
        </div>
      </div>

      <ol className="mt-7 space-y-5">
        {questions.map((q, qi) => {
          const a = answers[qi];
          const locked = a !== undefined;
          return (
            <li key={qi} className="rounded-2xl bg-surface-alt/50 p-4 sm:p-5">
              <p className="font-medium leading-snug text-ink">
                <span className="mr-2 font-mono text-[0.8rem] text-ink-subtle">Q{qi + 1}</span>
                {q.question}
              </p>
              <div className="mt-4 grid gap-2">
                {q.options.map((opt, oi) => {
                  const correct = locked && oi === q.correctIndex;
                  const wrong = locked && a === oi && oi !== q.correctIndex;
                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => pick(qi, oi)}
                      // Not `disabled`: that would drop keyboard focus the moment you answer.
                      aria-disabled={locked || undefined}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 ${
                        correct
                          ? "border-emerald-400 bg-emerald-50"
                          : wrong
                            ? "border-rose-300 bg-rose-50"
                            : locked
                              ? "border-transparent bg-surface opacity-55"
                              : "border-line bg-surface hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[var(--shadow-soft)]"
                      }`}
                    >
                      <span
                        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[0.72rem] font-bold ${
                          correct ? "bg-emerald-700 text-white" : wrong ? "bg-rose-600 text-white" : "bg-surface-alt text-ink-muted"
                        }`}
                      >
                        {correct ? "✓" : wrong ? "✗" : String.fromCharCode(65 + oi)}
                      </span>
                      <span className="flex-1 text-[0.95rem] text-ink">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {locked && q.explanation && (
                <p
                  className={`animate-in mt-3 rounded-xl px-4 py-3 text-[0.88rem] leading-relaxed ${
                    a === q.correctIndex ? "bg-emerald-50 text-emerald-950" : "bg-rose-50 text-rose-950"
                  }`}
                >
                  <b>{a === q.correctIndex ? "Correct. " : "Not quite. "}</b>
                  {q.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {finished && (
        <div className="animate-in mt-6 flex flex-col items-start gap-4 rounded-2xl bg-ink p-5 text-white sm:flex-row sm:items-center">
          <p className="text-[2rem]" aria-hidden>
            {score === questions.length ? "🔥" : score >= questions.length / 2 ? "👏" : "📚"}
          </p>
          <div className="flex-1">
            <p className="font-display text-[1.25rem] font-semibold">
              {score}/{questions.length} correct
            </p>
            <p className="text-[0.88rem] text-white/65">
              {score === questions.length ? "Flawless. You've got this lesson nailed." : "Have another look at the ones you missed, then try again."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setSaid("");
              heading.current?.focus();
            }}
            className="rounded-full border border-white/20 px-5 py-2.5 text-[0.88rem] font-medium transition-colors hover:bg-white hover:text-ink"
          >
            Try again
          </button>
        </div>
      )}
    </section>
  );
}
