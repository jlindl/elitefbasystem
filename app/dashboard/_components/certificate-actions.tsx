"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { fireConfetti } from "./confetti";

type Props = {
  /** Server-rendered A4 landscape PDF. */
  pdfHref: string;
  pdfName: string;
  /** Print view, for printing straight to paper. */
  printHref: string;
  imageHref: string | null;
  verifyUrl: string | null;
  linkedInUrl: string | null;
  shareTitle: string;
  shareText: string;
};

function Icon({ d, size = 18 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  pdf: "M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
  image: "M4 5h16v14H4zM4 15l4.5-4.5 4 4 3-3L20 16M15.5 8.5h.01",
  link: "M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1",
  share: "M12 3v12M7.5 7.5 12 3l4.5 4.5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6",
  check: "M5 12.5 10 17 19 7",
};

const noopSubscribe = () => () => {};

export function CertificateActions({ pdfHref, pdfName, printHref, imageHref, verifyUrl, linkedInUrl, shareTitle, shareText }: Props) {
  const [copied, setCopied] = useState(false);
  const [pdf, setPdf] = useState<"idle" | "working" | "error" | "signed-out">("idle");

  // Fetch the PDF ourselves so there's a "preparing" state while the server renders it.
  async function downloadPdf() {
    if (pdf === "working") return;
    setPdf("working");
    try {
      const res = await fetch(pdfHref);
      if (res.status === 401 || res.redirected) {
        setPdf("signed-out");
        return;
      }
      if (!res.ok || !res.headers.get("content-type")?.includes("application/pdf")) throw new Error(String(res.status));
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 30000);
      setPdf("idle");
    } catch {
      setPdf("error");
    }
  }
  // Native share sheet support is only knowable in the browser; false during SSR keeps hydration stable.
  const shareSupported = useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator.share === "function",
    () => false,
  );
  const canShare = shareSupported && !!verifyUrl;

  async function copy() {
    if (!verifyUrl) return;
    try {
      await navigator.clipboard.writeText(verifyUrl);
    } catch {
      window.prompt("Copy your certificate link:", verifyUrl);
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  }

  const secondary =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 text-[0.9375rem] font-semibold text-ink transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_10px_24px_-14px_rgba(10,10,10,0.35)]";

  return (
    <div className="flex flex-wrap gap-2.5">
      <button type="button" onClick={downloadPdf} aria-busy={pdf === "working"} className="btn btn-primary btn-aa h-12 disabled:opacity-70">
        <Icon d={ICONS.pdf} /> {pdf === "working" ? "Preparing your PDF…" : "Download PDF"}
      </button>
      {imageHref && (
        <a href={imageHref} download className={secondary}>
          <Icon d={ICONS.image} /> Save image
        </a>
      )}
      {linkedInUrl && (
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={`${secondary} hover:border-[#0a66c2]/50`}>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden focusable="false" fill="#0a66c2">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
          </svg>
          Add to LinkedIn<span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {verifyUrl && (
        <button type="button" onClick={copy} className={secondary}>
          <Icon d={copied ? ICONS.check : ICONS.link} /> {copied ? "Link copied" : "Copy link"}
        </button>
      )}
      {canShare && (
        <button
          type="button"
          onClick={() => navigator.share({ title: shareTitle, text: shareText, url: verifyUrl! }).catch(() => {})}
          className={secondary}
        >
          <Icon d={ICONS.share} /> Share
        </button>
      )}
      <a href={printHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center px-2 text-[0.9375rem] font-medium text-ink-muted underline decoration-ink/25 underline-offset-4 hover:text-ink">
        Print it<span className="sr-only"> (opens the print view in a new tab)</span>
      </a>
      {(pdf === "error" || pdf === "signed-out") && (
        <p className="basis-full text-[0.9375rem] font-medium text-rose-700">
          {pdf === "signed-out" ? "You've been signed out. Sign in again, then download your PDF." : "The PDF couldn't be created just now. Please try again in a moment."}
        </p>
      )}
      <span className="sr-only" aria-live="polite">
        {pdf === "working" ? "Preparing your PDF" : pdf === "error" ? "The PDF couldn't be created. Try again." : pdf === "signed-out" ? "You've been signed out. Sign in again to download your PDF." : copied ? "Certificate link copied to clipboard" : ""}
      </span>
    </div>
  );
}

/** Copyable suggested caption for a LinkedIn post. */
export function ShareCaption({ caption }: { caption: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <p className="whitespace-pre-line rounded-2xl bg-surface-alt p-4 text-[0.9375rem] leading-relaxed text-ink ring-1 ring-line [overflow-wrap:anywhere]">{caption}</p>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(caption);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2400);
          } catch {
            window.prompt("Copy the caption:", caption);
          }
        }}
        className="mt-3 inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-ink/30"
      >
        {copied ? "✓ Caption copied" : "Copy caption"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Caption copied to clipboard" : ""}
      </span>
    </div>
  );
}

/** Confetti once, when the student arrives straight from passing the exam. */
export function Celebrate({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => fireConfetti({ big: true, originY: 0.45 }), 350);
    // Drop ?new=1 so a refresh doesn't celebrate again.
    const url = new URL(window.location.href);
    url.searchParams.delete("new");
    // Null state lets Next's router pick the change up (passing its own state skips the update).
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    return () => window.clearTimeout(t);
  }, [active]);
  return null;
}
