"use client";

import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { HEADLINE_MAX, STORY_MAX, WIN_KINDS, charLength, clampChars, kindInfo, winDisplayName, type WinKind, type WinNameStyle } from "../_lib/win-kinds";
import { postWin, type WinField } from "../_lib/wins-actions";
import { fireConfetti } from "./confetti";

export type WinSuggestion = { key: string; kind: WinKind; headline: string; label: string };

const OFFLINE = "Couldn't reach the server. Check your connection and try again.";

/** "Share a win" form with live preview, one-tap suggestions from the member's own progress. */
export function WinsComposer({ fullName, nameIsSet, suggestions, disabled }: { fullName: string; nameIsSet: boolean; suggestions: WinSuggestion[]; disabled: boolean }) {
  const id = useId();
  const [kind, setKind] = useState<WinKind | null>(null);
  const [headline, setHeadline] = useState("");
  const [story, setStory] = useState("");
  const [amount, setAmount] = useState("");
  const [nameStyle, setNameStyle] = useState<WinNameStyle>(nameIsSet ? "initial" : "anonymous");
  // `announce`: read out by an alert, because focus can't move to the field (it already has it).
  const [error, setError] = useState<{ text: string; field?: WinField; announce: boolean } | null>(null);
  const [status, setStatus] = useState("");
  const [posted, setPosted] = useState(0);
  const [pending, startTransition] = useTransition();
  const kindRef = useRef<HTMLInputElement>(null);
  const headlineRef = useRef<HTMLInputElement>(null);
  const storyRef = useRef<HTMLTextAreaElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const info = kind ? kindInfo(kind) : null;
  const showAmount = kind === "first_sale" || kind === "milestone";
  const errorId = `${id}-error`;

  // A field's error moves focus to that field, which then reads the message out.
  useEffect(() => {
    if (!error?.field || error.announce) return;
    const refs = { kind: kindRef, headline: headlineRef, story: storyRef, amount: amountRef } as const;
    refs[error.field].current?.focus();
  }, [error]);

  /** Shows an error. If its field already has focus (Enter pressed in it), focus can't move to
   *  it, and nothing would be read out, so it is announced instead. */
  function fail(text: string, field?: WinField) {
    const el = field ? { kind: kindRef, headline: headlineRef, story: storyRef, amount: amountRef }[field].current : null;
    setError({ text, field, announce: !field || el === document.activeElement });
  }

  // After posting, the fields reset (the amount one may vanish), so focus the confirmation.
  useEffect(() => {
    if (posted) statusRef.current?.focus();
  }, [posted]);

  /** Links a field to the error message when the error is about it. */
  function errorFor(field: WinField, describedBy?: string) {
    const mine = error?.field === field;
    return {
      "aria-invalid": mine || undefined,
      "aria-describedby": [describedBy, mine ? errorId : null].filter(Boolean).join(" ") || undefined,
    };
  }

  function applySuggestion(s: WinSuggestion) {
    setKind(s.kind);
    setHeadline(s.headline);
    setError(null);
    requestAnimationFrame(() => headlineRef.current?.focus());
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Controls stay enabled while posting so focus isn't lost; just ignore a second press.
    if (pending || disabled) return;
    setError(null);
    setStatus("");
    if (!kind) {
      fail("Choose what kind of win it is.", "kind");
      return;
    }
    startTransition(async () => {
      let res: Awaited<ReturnType<typeof postWin>>;
      try {
        res = await postWin({ kind, headline, story, amount: showAmount ? amount : "", nameStyle });
      } catch (err) {
        // Let a sign-in redirect through; anything else is a dropped connection.
        unstable_rethrow(err);
        res = { ok: false, error: OFFLINE };
      }
      // Updates after an await need their own transition, so they land in the same render
      // as the end of "Posting…" (and, on success, the refreshed wall from the action).
      if (!res.ok) {
        const { error: text, field } = res;
        startTransition(() => fail(text, field));
        return;
      }
      startTransition(() => {
        setKind(null);
        setHeadline("");
        setStory("");
        setAmount("");
        setStatus("Posted! Your win is now on the wall.");
        setPosted((n) => n + 1);
      });
      fireConfetti({ originY: 0.4 });
    });
  }

  return (
    <section aria-labelledby={`${id}-h`} className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
      <h2 id={`${id}-h`} className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
        Share a win
      </h2>
      <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">Big or small, it counts. Other members can cheer you on.</p>

      {suggestions.length > 0 && !disabled && (
        <div className="mt-5 rounded-2xl bg-surface-alt p-4 ring-1 ring-line">
          <p className="text-[0.875rem] font-semibold text-ink">Suggested from your progress</p>
          <ul className="mt-2.5 space-y-2">
            {suggestions.map((s) => (
              <li key={s.key} className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[0.9375rem] text-ink">
                  <span aria-hidden>{kindInfo(s.kind).emoji} </span>
                  {s.label}
                </span>
                <button
                  type="button"
                  onClick={() => applySuggestion(s)}
                  className="inline-flex min-h-10 items-center rounded-full border border-line bg-surface px-3.5 text-[0.875rem] font-semibold text-ink transition-colors hover:border-ink/30"
                >
                  Use this<span className="sr-only">: {s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={submit} className="mt-5 space-y-5" aria-describedby={disabled ? `${id}-off` : undefined} aria-busy={pending || undefined}>
        <fieldset disabled={disabled}>
          <legend className="text-[0.9375rem] font-semibold text-ink">What kind of win?</legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {WIN_KINDS.map((k, i) => {
              const on = kind === k.id;
              return (
                <label
                  key={k.id}
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange-700 has-[:focus-visible]:ring-offset-2 ${
                    on ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink hover:border-ink/30"
                  } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  <input
                    ref={i === 0 ? kindRef : undefined}
                    type="radio"
                    name={`${id}-kind`}
                    value={k.id}
                    checked={on}
                    onChange={() => setKind(k.id)}
                    className="sr-only"
                    {...errorFor("kind")}
                  />
                  <span aria-hidden>{k.emoji}</span>
                  {k.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor={`${id}-headline`} className="text-[0.9375rem] font-semibold text-ink">
            Headline
          </label>
          <input
            ref={headlineRef}
            id={`${id}-headline`}
            value={headline}
            onChange={(e) => setHeadline(clampChars(e.target.value, HEADLINE_MAX))}
            disabled={disabled}
            readOnly={pending}
            required
            minLength={4}
            placeholder={info?.prompt ?? "e.g. First sale on my 3-pack bundle!"}
            {...errorFor("headline", `${id}-headline-count`)}
            className="mt-2 h-12 w-full rounded-xl border border-line bg-surface px-4 text-[1rem] text-ink outline-none placeholder:text-ink-subtle focus-visible:ring-2 focus-visible:ring-orange-700 disabled:opacity-60 aria-[invalid=true]:border-rose-400"
          />
          <p id={`${id}-headline-count`} className="mt-1 text-right text-[0.8125rem] tabular-nums text-ink-muted">
            {charLength(headline)}/{HEADLINE_MAX}
          </p>
        </div>

        <div>
          <label htmlFor={`${id}-story`} className="text-[0.9375rem] font-semibold text-ink">
            The story <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <textarea
            ref={storyRef}
            id={`${id}-story`}
            value={story}
            onChange={(e) => setStory(clampChars(e.target.value, STORY_MAX))}
            disabled={disabled}
            readOnly={pending}
            rows={3}
            placeholder="What did it take? Anything you'd tell someone a step behind you?"
            {...errorFor("story", `${id}-story-count`)}
            className="mt-2 w-full resize-y rounded-xl border border-line bg-surface px-4 py-3 text-[1rem] leading-relaxed text-ink outline-none placeholder:text-ink-subtle focus-visible:ring-2 focus-visible:ring-orange-700 disabled:opacity-60 aria-[invalid=true]:border-rose-400"
          />
          <p id={`${id}-story-count`} className="mt-1 text-right text-[0.8125rem] tabular-nums text-ink-muted">
            {charLength(story)}/{STORY_MAX}
          </p>
        </div>

        {showAmount && (
          <div>
            <label htmlFor={`${id}-amount`} className="text-[0.9375rem] font-semibold text-ink">
              Amount <span className="font-normal text-ink-muted">(optional, whole pounds)</span>
            </label>
            <div className="relative mt-2 max-w-[220px]">
              <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1rem] text-ink-muted">
                £
              </span>
              <input
                ref={amountRef}
                id={`${id}-amount`}
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, "").slice(0, 8))}
                inputMode="numeric"
                disabled={disabled}
                readOnly={pending}
                placeholder="250"
                {...errorFor("amount")}
                className="h-12 w-full rounded-xl border border-line bg-surface pl-8 pr-4 text-[1rem] tabular-nums text-ink outline-none placeholder:text-ink-subtle focus-visible:ring-2 focus-visible:ring-orange-700 aria-[invalid=true]:border-rose-400"
              />
            </div>
          </div>
        )}

        <fieldset disabled={disabled}>
          <legend className="text-[0.9375rem] font-semibold text-ink">Show my name as</legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {(nameIsSet ? (["initial", "first", "anonymous"] as const) : (["anonymous"] as const)).map((style) => {
              const on = nameStyle === style;
              return (
                <label
                  key={style}
                  className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-[0.9375rem] font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange-700 has-[:focus-visible]:ring-offset-2 ${
                    on ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink hover:border-ink/30"
                  }`}
                >
                  <input type="radio" name={`${id}-name`} value={style} checked={on} onChange={() => setNameStyle(style)} className="sr-only" />
                  {winDisplayName(fullName, style)}
                </label>
              );
            })}
          </div>
          {!nameIsSet && (
            <p className="mt-2 text-[0.875rem] text-ink-muted">
              <Link href="/dashboard/account" className="font-semibold text-ink underline decoration-ink/25 underline-offset-4">
                Add your name
              </Link>{" "}
              to post under it.
            </p>
          )}
        </fieldset>

        {error && (
          // Read out when focus moves to its field; otherwise announced as an alert.
          <p key={error.announce ? "alert" : "field"} id={errorId} role={error.announce ? "alert" : undefined} className="rounded-xl bg-rose-50 px-4 py-3 text-[0.9375rem] font-medium text-rose-800 ring-1 ring-rose-200">
            {error.text}
          </p>
        )}
        {disabled && (
          <p id={`${id}-off`} className="rounded-xl bg-surface-alt px-4 py-3 text-[0.9375rem] text-ink-muted ring-1 ring-line">
            Posting opens as soon as the wins wall is switched on.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={disabled}
            aria-disabled={pending || undefined}
            className="btn btn-primary btn-aa h-12 disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-wait aria-disabled:opacity-75"
          >
            {pending ? "Posting…" : "Post my win"}
          </button>
          <p ref={statusRef} tabIndex={-1} className="text-[0.9375rem] font-medium text-emerald-800 outline-none">
            {status}
          </p>
        </div>
      </form>
    </section>
  );
}
