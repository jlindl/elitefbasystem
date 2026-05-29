"use client";

import { useEffect, useRef, useState } from "react";

export function CheckoutRedirect() {
  const [error, setError] = useState<string | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    (async () => {
      try {
        const res = await fetch("/api/checkout", { method: "POST" });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setError(data?.error || `Checkout failed (${res.status})`);
          return;
        }

        if (data?.url) {
          window.location.href = data.url;
        } else {
          setError("No checkout URL returned.");
        }
      } catch (e: any) {
        setError(e?.message || "Network error.");
      }
    })();
  }, []);

  return (
    <div className="rounded-2xl bg-surface hairline shadow-[var(--shadow-lift)] p-8 md:p-10 text-center">
      <p className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-ink-subtle">
        Enroll · Step 2 of 2
      </p>
      <h1 className="mt-3 font-display text-[1.6rem] md:text-[1.875rem] font-semibold tracking-[-0.02em] leading-[1.15]">
        {error ? "Couldn't start checkout." : "Sending you to payment…"}
      </h1>
      <p className="mt-3 text-[0.95rem] text-ink-muted leading-[1.55]">
        {error ??
          "You'll be on a secure Stripe payment page in a moment."}
      </p>

      {error && (
        <a
          href="/checkout"
          className="mt-7 inline-flex h-11 items-center rounded-full bg-accent px-6 text-[0.9rem] font-medium text-white shadow-[0_1px_2px_rgba(10,10,10,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep"
        >
          Try again
        </a>
      )}
    </div>
  );
}
