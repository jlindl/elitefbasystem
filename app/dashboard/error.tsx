"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { whatsappLink } from "./_lib/contact";

/** Shown in place of a dashboard page that failed to load, so a member is never left on a blank screen. */
export default function DashboardError({
  error,
  reset,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry?: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  // On /dashboard itself a link to it is a same-page visit that can't clear the error: Try again does.
  const onDashboard = usePathname() === "/dashboard";

  useEffect(() => {
    console.error(error);
    // Screen readers hear what happened, and keyboard users start here.
    heading.current?.focus();
  }, [error]);

  const ref = error.digest ? ` (reference ${error.digest})` : "";

  return (
    <main id="main" className="flex min-h-[100dvh] items-center justify-center bg-bg px-4 py-10">
      <div className="w-full max-w-[520px] rounded-[2rem] border border-line bg-surface p-7 text-center shadow-[var(--shadow-lift)] sm:p-10">
        <p aria-hidden className="text-[2.25rem] leading-none">
          🧭
        </p>
        <p className="mt-5 text-[0.9375rem] font-semibold text-orange-800">Something went wrong</p>
        <h1 ref={heading} tabIndex={-1} className="mt-1 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.03em] text-ink outline-none sm:text-[2rem]">
          This page didn&rsquo;t load
        </h1>
        <p className="mx-auto mt-3 max-w-[40ch] text-[1rem] leading-relaxed text-ink-muted">
          It&rsquo;s usually a dropped connection. Try again, and if it keeps happening, message Jakub.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
          <button type="button" onClick={() => (unstable_retry ?? reset)()} className="btn btn-primary btn-aa h-12">
            Try again
          </button>
          {!onDashboard && (
            <Link href="/dashboard" className="btn btn-secondary h-12">
              Go to the dashboard
            </Link>
          )}
        </div>
        <a
          href={whatsappLink(`Hi Jakub, a page in the members' area isn't loading for me${ref}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
        >
          Message Jakub on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
        </a>
        {error.digest && <p className="mt-4 font-mono text-[0.75rem] text-ink-muted">Reference: {error.digest}</p>}
      </div>
    </main>
  );
}
