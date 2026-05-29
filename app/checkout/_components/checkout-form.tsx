"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  signInWithMagicLink,
  signInWithPassword,
  signUpWithPassword,
  type LoginState,
  type MagicLinkState,
  type SignUpState,
} from "@/app/auth/actions";

const NEXT = "/checkout";

const loginInitial: LoginState = { status: "idle" };
const signupInitial: SignUpState = { status: "idle" };
const magicInitial: MagicLinkState = { status: "idle" };

type Tab = "signup" | "login";

export function CheckoutForm() {
  const [tab, setTab] = useState<Tab>("signup");
  const [useMagic, setUseMagic] = useState(false);

  return (
    <div className="rounded-2xl bg-surface hairline shadow-[var(--shadow-lift)] p-8 md:p-10">
      <p className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-ink-subtle">
        Enroll · Step 1 of 2
      </p>
      <h1 className="mt-3 font-display text-[1.6rem] md:text-[1.875rem] font-semibold tracking-[-0.02em] leading-[1.15]">
        {tab === "signup" ? "Create your account." : "Welcome back."}
      </h1>
      <p className="mt-2 text-[0.95rem] text-ink-muted leading-[1.55]">
        {tab === "signup"
          ? "Takes ten seconds. We'll send you straight to checkout next."
          : "Log in and we'll send you to checkout."}
      </p>

      <div className="mt-6 inline-flex bg-surface-alt rounded-full p-1 gap-1">
        <TabBtn
          active={tab === "signup"}
          onClick={() => {
            setTab("signup");
            setUseMagic(false);
          }}
        >
          New here
        </TabBtn>
        <TabBtn
          active={tab === "login"}
          onClick={() => {
            setTab("login");
            setUseMagic(false);
          }}
        >
          Have an account
        </TabBtn>
      </div>

      <div className="mt-6">
        {tab === "signup" && <SignUpFormInline />}
        {tab === "login" && !useMagic && (
          <LoginFormInline onSwitchMagic={() => setUseMagic(true)} />
        )}
        {tab === "login" && useMagic && (
          <MagicLinkFormInline onBack={() => setUseMagic(false)} />
        )}
      </div>
    </div>
  );
}

function TabBtn({
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

function SignUpFormInline() {
  const [state, formAction] = useActionState(signUpWithPassword, signupInitial);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  if (state.status === "check-email") {
    return (
      <CheckEmail
        email={state.email}
        title="Confirm your email."
        body="Click the link we sent to finish creating your account. You'll be taken straight to payment."
      />
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="next" value={NEXT} />
      <Field>
        <input
          ref={ref}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputCls}
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
          className={inputCls}
        />
      </Field>
      <SubmitBtn label="Continue to payment" pendingLabel="Creating account…" />
      {state.status === "error" && (
        <p className="text-[0.85rem] text-accent-deep">{state.message}</p>
      )}
    </form>
  );
}

function LoginFormInline({ onSwitchMagic }: { onSwitchMagic: () => void }) {
  const [state, formAction] = useActionState(signInWithPassword, loginInitial);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="next" value={NEXT} />
        <Field>
          <input
            ref={ref}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputCls}
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
            className={inputCls}
          />
        </Field>
        <SubmitBtn label="Log in & pay" pendingLabel="Logging in…" />
        {state.status === "error" && (
          <p className="text-[0.85rem] text-accent-deep">{state.message}</p>
        )}
      </form>

      <button
        type="button"
        onClick={onSwitchMagic}
        className="mt-4 text-[0.8rem] text-ink-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink/40 transition-colors"
      >
        Email me a magic link instead
      </button>
    </>
  );
}

function MagicLinkFormInline({ onBack }: { onBack: () => void }) {
  const [state, formAction] = useActionState(signInWithMagicLink, magicInitial);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  if (state.status === "success") {
    return (
      <CheckEmail
        email={state.email}
        title="Check your inbox."
        body="Click the link in the email to sign in. You'll be taken straight to payment."
      />
    );
  }

  return (
    <>
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="next" value={NEXT} />
        <Field>
          <input
            ref={ref}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputCls}
          />
        </Field>
        <SubmitBtn label="Send magic link" pendingLabel="Sending…" />
        {state.status === "error" && (
          <p className="text-[0.85rem] text-accent-deep">{state.message}</p>
        )}
      </form>

      <button
        type="button"
        onClick={onBack}
        className="mt-4 text-[0.8rem] text-ink-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink/40 transition-colors"
      >
        Use password instead
      </button>
    </>
  );
}

function CheckEmail({
  email,
  title,
  body,
}: {
  email: string;
  title: string;
  body: string;
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
      <h2 className="mt-5 font-display text-[1.4rem] font-semibold tracking-[-0.02em]">
        {title}
      </h2>
      <p className="mt-3 text-[0.95rem] text-ink-muted leading-[1.55]">
        {body}
        <br />
        Sent to <span className="text-ink font-medium">{email}</span>.
      </p>
    </div>
  );
}

const inputCls =
  "w-full h-12 rounded-xl border border-line bg-surface px-4 text-[0.95rem] text-ink placeholder:text-ink-subtle outline-none transition-colors duration-200 focus:border-ink/30";

function Field({ children }: { children: React.ReactNode }) {
  return <label className="block">{children}</label>;
}

function SubmitBtn({
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
      className="flex w-full h-12 items-center justify-center rounded-full bg-accent px-6 text-[0.95rem] font-medium text-white shadow-[0_1px_2px_rgba(10,10,10,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep hover:shadow-[0_8px_24px_rgba(255,107,26,0.32)] disabled:opacity-60 disabled:cursor-wait disabled:translate-y-0"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
