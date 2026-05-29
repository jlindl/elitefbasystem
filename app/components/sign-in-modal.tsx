"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFormStatus } from "react-dom";
import {
  signInWithMagicLink,
  signInWithPassword,
  signUpWithPassword,
  type LoginState,
  type MagicLinkState,
  type SignUpState,
} from "@/app/auth/actions";
import { ArrowRight, X } from "./icons";

export type AuthTab = "login" | "signup";

const loginInitial: LoginState = { status: "idle" };
const signupInitial: SignUpState = { status: "idle" };
const magicInitial: MagicLinkState = { status: "idle" };

export function SignInModal({
  open,
  initialTab = "login",
  onClose,
}: {
  open: boolean;
  initialTab?: AuthTab;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<AuthTab>(initialTab);
  const [useMagic, setUseMagic] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // sync external initialTab when modal opens
  useEffect(() => {
    if (open) {
      setTab(initialTab);
      setUseMagic(false);
    }
  }, [open, initialTab]);

  // body scroll + escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tab === "login" ? "Log in" : "Sign up"}
      className="fixed inset-0 z-[60] flex items-center justify-center"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />

      <div className="relative w-full md:max-w-[440px] mx-3 md:mx-0 mb-3 md:mb-0 rounded-2xl bg-surface hairline shadow-[var(--shadow-lift)] p-7 md:p-9">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-surface-alt transition-colors"
        >
          <X size={16} />
        </button>



        <div className="mt-6">
          {tab === "login" && !useMagic && (
            <LoginPasswordForm
              onSwitchToMagic={() => setUseMagic(true)}
              onSwitchToSignup={() => setTab("signup")}
            />
          )}
          {tab === "login" && useMagic && (
            <MagicLinkForm
              onSwitchToPassword={() => setUseMagic(false)}
              onClose={onClose}
            />
          )}
          {tab === "signup" && (
            <SignUpForm onSwitchToLogin={() => setTab("login")} />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`h-9 px-4 rounded-full text-[0.85rem] font-medium transition-colors duration-150 ${
        active
          ? "bg-surface text-ink shadow-[0_1px_2px_rgba(10,10,10,0.06)]"
          : "text-ink-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Password login                                                      */
/* ------------------------------------------------------------------ */

function LoginPasswordForm({
  onSwitchToMagic,
  onSwitchToSignup,
}: {
  onSwitchToMagic: () => void;
  onSwitchToSignup: () => void;
}) {
  const [state, formAction] = useActionState(signInWithPassword, loginInitial);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <h2 className="font-display text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.02em] leading-[1.15]">
        Welcome back.
      </h2>
      <p className="mt-2 text-[0.95rem] text-ink-muted leading-[1.55]">
        Log in to continue your mentorship.
      </p>

      <form action={formAction} className="mt-6 space-y-3">
        <Field>
          <input
            ref={inputRef}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>
        <Field>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            autoComplete="current-password"
            placeholder="Password"
            className={inputClass}
          />
        </Field>

        <SubmitButton label="Log in" pendingLabel="Logging in…" />
      </form>

      {state.status === "error" && (
        <p className="mt-4 text-[0.85rem] text-accent-deep">{state.message}</p>
      )}

      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onSwitchToMagic}
          className="text-[0.8rem] text-ink-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink/40 transition-colors"
        >
          Email me a magic link
        </button>
        <a
          href="/#apply"
          className="inline-flex h-9 items-center rounded-full bg-accent px-4 text-[0.85rem] font-medium text-white shadow-[0_1px_2px_rgba(10,10,10,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep hover:shadow-[0_4px_14px_rgba(255,107,26,0.35)]"
        >
          Apply Now
        </a>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sign up                                                             */
/* ------------------------------------------------------------------ */

function SignUpForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [state, formAction] = useActionState(signUpWithPassword, signupInitial);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  if (state.status === "check-email") {
    return <CheckEmail email={state.email} title="Confirm your email." />;
  }

  return (
    <>
      <h2 className="font-display text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.02em] leading-[1.15]">
        Create your account.
      </h2>
      <p className="mt-2 text-[0.95rem] text-ink-muted leading-[1.55]">
        It takes about ten seconds. We&rsquo;ll send a confirmation link.
      </p>

      <form action={formAction} className="mt-6 space-y-3">
        <Field>
          <input
            ref={inputRef}
            type="text"
            name="full_name"
            required
            minLength={3}
            autoComplete="name"
            placeholder="Full name"
            className={inputClass}
          />
        </Field>
        <Field>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>
        <Field>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Password (8+ characters)"
            className={inputClass}
          />
        </Field>

        <SubmitButton label="Create account" pendingLabel="Creating account…" />
      </form>

      {state.status === "error" && (
        <p className="mt-4 text-[0.85rem] text-accent-deep">{state.message}</p>
      )}

      <p className="mt-5 text-[0.8rem] text-ink-muted">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-ink font-medium hover:underline underline-offset-4"
        >
          Log in
        </button>
      </p>

      <p className="mt-6 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink-subtle">
        Secured by Supabase
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Magic link                                                          */
/* ------------------------------------------------------------------ */

function MagicLinkForm({
  onSwitchToPassword,
  onClose,
}: {
  onSwitchToPassword: () => void;
  onClose: () => void;
}) {
  const [state, formAction] = useActionState(signInWithMagicLink, magicInitial);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  if (state.status === "success") {
    return (
      <CheckEmail
        email={state.email}
        title="Check your inbox."
        body="Click the link in the email to finish signing in."
        onClose={onClose}
      />
    );
  }

  return (
    <>
      <h2 className="font-display text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.02em] leading-[1.15]">
        Email me a link.
      </h2>
      <p className="mt-2 text-[0.95rem] text-ink-muted leading-[1.55]">
        No password - we&rsquo;ll send you a one-tap sign-in link.
      </p>

      <form action={formAction} className="mt-6 space-y-3">
        <Field>
          <input
            ref={inputRef}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>

        <SubmitButton label="Send magic link" pendingLabel="Sending…" />
      </form>

      {state.status === "error" && (
        <p className="mt-4 text-[0.85rem] text-accent-deep">{state.message}</p>
      )}

      <button
        type="button"
        onClick={onSwitchToPassword}
        className="mt-5 text-[0.8rem] text-ink-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink/40 transition-colors"
      >
        Use password instead
      </button>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Shared UI                                                           */
/* ------------------------------------------------------------------ */

const inputClass =
  "w-full h-12 rounded-xl border border-line bg-surface px-4 text-[0.95rem] text-ink placeholder:text-ink-subtle outline-none transition-colors duration-200 focus:border-ink/30";

function Field({ children }: { children: React.ReactNode }) {
  return <label className="block">{children}</label>;
}

function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[0.95rem] font-medium text-white shadow-[0_1px_2px_rgba(10,10,10,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep hover:shadow-[0_8px_24px_rgba(255,107,26,0.32)] disabled:opacity-60 disabled:cursor-wait disabled:translate-y-0"
    >
      {pending ? pendingLabel : label}
      {!pending && <ArrowRight size={16} />}
    </button>
  );
}

function CheckEmail({
  email,
  title,
  body,
  onClose,
}: {
  email: string;
  title: string;
  body?: string;
  onClose?: () => void;
}) {
  return (
    <div className="text-center py-2">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m22 6-10 7L2 6" />
          <rect x="2" y="4" width="20" height="16" rx="2" />
        </svg>
      </span>
      <h2 className="mt-5 font-display text-[1.5rem] font-semibold tracking-[-0.02em] leading-[1.15]">
        {title}
      </h2>
      <p className="mt-3 text-[0.95rem] text-ink-muted leading-[1.55]">
        {body ??
          "Click the link we sent to finish setting up your account."}
        <br />
        Sent to <span className="text-ink font-medium">{email}</span>.
      </p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="mt-7 inline-flex h-11 items-center rounded-full border border-line bg-surface px-6 text-[0.9rem] font-medium text-ink hover:-translate-y-px hover:border-ink/20 transition-all duration-200"
        >
          Done
        </button>
      )}
    </div>
  );
}
