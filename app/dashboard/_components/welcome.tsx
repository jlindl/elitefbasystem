"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { lockScroll } from "../_lib/scroll-lock";
import { COOKIES, WELCOME_NOTE, WELCOME_SIGNOFF, readPrefCookie, setPrefCookie } from "../_lib/welcome";
import { fireConfetti } from "./confetti";
import { MemberCard } from "./member-card";

type Props = {
  show: boolean;
  /** Null when the member hasn't saved a name yet. */
  firstName: string | null;
  card: { name: string; number: string; since: string; tier: string };
  firstLessonHref: string;
};

const STEPS = ["A note from Jakub", "Your member card", "Where to start"] as const;

/** First-visit welcome: a note from Jakub, the member card reveal, then the first steps. */
export function Welcome({ show, firstName, card, firstLessonHref }: Props) {
  const id = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const releaseScroll = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Back/forward can replay an old render: the cookie in the browser is the truth.
    if (!show || readPrefCookie(COOKIES.welcomed) === card.number) return;
    const d = ref.current;
    if (!d) return;
    if (!d.open) d.showModal();
    // Hold the lock for as long as this effect runs, even if the dialog was already open
    // (React re-runs effects in development), and let it go on cleanup.
    releaseScroll.current = lockScroll();
    return () => {
      releaseScroll.current?.();
      releaseScroll.current = null;
    };
  }, [show, card.number]);

  // Each step change moves focus to its heading so screen readers hear the new step.
  useEffect(() => {
    if (ref.current?.open) heading.current?.focus();
    // Inside the dialog, so it isn't drawn underneath the modal.
    if (step === 1) window.setTimeout(() => fireConfetti({ originY: 0.35, container: ref.current }), 450);
  }, [step]);

  function finish() {
    setPrefCookie(COOKIES.welcomed, card.number);
    releaseScroll.current?.();
    releaseScroll.current = null;
    if (ref.current?.open) ref.current.close();
  }

  if (!show) return null;

  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-h`}
      data-lenis-prevent
      onCancel={(e) => {
        e.preventDefault();
        finish();
      }}
      className="welcome-dialog m-auto max-h-[94dvh] w-[min(620px,calc(100%-1.5rem))] overflow-y-auto rounded-[2rem] bg-surface p-0 text-ink shadow-2xl backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 sm:p-9">
        <div className="flex items-center justify-between gap-3">
          <ol className="flex items-center gap-1.5" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
            {STEPS.map((s, i) => (
              <li key={s} aria-current={i === step ? "step" : undefined} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? "w-8 bg-accent" : i < step ? "w-4 bg-ink" : "w-4 bg-surface-deep"}`}>
                <span className="sr-only">{s}</span>
              </li>
            ))}
          </ol>
          <button type="button" onClick={finish} className="rounded-full px-3 py-2 text-[0.9375rem] font-medium text-ink-muted underline decoration-ink/20 underline-offset-4 hover:bg-surface-alt hover:text-ink">
            Skip intro
          </button>
        </div>

        {step === 0 && (
          <div key="note" className="welcome-step mt-7">
            <div className="flex items-center gap-4">
              <span className="relative inline-flex h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-accent-soft">
                <Image src="/jakub portrait 2.jpeg" alt="Jakub" width={160} height={160} className="h-full w-full object-cover" priority />
              </span>
              <div>
                <p className="text-[0.9375rem] font-semibold text-orange-800">{STEPS[0]}</p>
                <h2 id={`${id}-h`} ref={heading} tabIndex={-1} className="mt-0.5 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-ink outline-none sm:text-[2rem]">
                  {firstName ? `Welcome, ${firstName}.` : "Welcome to Elite FBA."}
                </h2>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-[1.0625rem] leading-relaxed text-ink-muted">
              {WELCOME_NOTE.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-5 font-serif text-[1.75rem] italic leading-none text-ink">{WELCOME_SIGNOFF}</p>
          </div>
        )}

        {step === 1 && (
          <div key="card" className="welcome-step mt-7">
            <p className="text-[0.9375rem] font-semibold text-orange-800">{STEPS[1]}</p>
            <h2 id={`${id}-h`} ref={heading} tabIndex={-1} className="mt-0.5 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-ink outline-none sm:text-[2rem]">
              You&rsquo;re officially a member.
            </h2>
            <p className="mt-2 text-[1rem] leading-relaxed text-ink-muted">This is your Elite FBA member card. You&rsquo;ll find it on your account page any time.</p>
            <div className="welcome-card-reveal mx-auto mt-6 max-w-[420px]">
              <MemberCard {...card} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div key="start" className="welcome-step mt-7">
            <p className="text-[0.9375rem] font-semibold text-orange-800">{STEPS[2]}</p>
            <h2 id={`${id}-h`} ref={heading} tabIndex={-1} className="mt-0.5 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-ink outline-none sm:text-[2rem]">
              Here&rsquo;s how it works.
            </h2>
            <ol className="mt-5 space-y-3">
              {[
                ["📘", "Learn", "Short lessons, one module at a time. Mark each one complete as you go."],
                ["🎯", "Practise", "Missions turn each module into quick, game-style practice."],
                ["🏅", "Get certified", "Pass a module's exam to earn its certificate."],
                ["💬", "Ask Jakub", "Stuck? Ask from any lesson and it opens on WhatsApp."],
              ].map(([emoji, title, body]) => (
                <li key={title} className="flex gap-4 rounded-2xl bg-surface-alt p-4 ring-1 ring-line">
                  <span aria-hidden className="text-[1.5rem] leading-none">
                    {emoji}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{title}</span>
                    <span className="mt-0.5 block text-[0.9375rem] leading-relaxed text-ink-muted">{body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex h-12 items-center justify-center rounded-full px-5 text-[0.9375rem] font-semibold text-ink-muted hover:bg-surface-alt hover:text-ink">
              ← Back
            </button>
          ) : (
            <span className="hidden sm:block" />
          )}
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={() => setStep((s) => s + 1)} className="btn btn-primary btn-aa h-12">
              {step === 0 ? "Show me my card" : "Next"} <span aria-hidden>→</span>
            </button>
          ) : (
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button type="button" onClick={finish} className="btn btn-secondary h-12">
                Explore the dashboard
              </button>
              <Link href={firstLessonHref} onClick={finish} className="btn btn-primary btn-aa h-12">
                Start lesson 1 <span aria-hidden>→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
