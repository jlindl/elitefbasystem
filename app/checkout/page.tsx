import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enroll - EliteFBA",
  description:
    "Every spot on the Elite FBA mentorship starts with a conversation. Message Jakub directly on WhatsApp.",
};

const WHATSAPP_NUMBER = "447765977085";
const WHATSAPP_DISPLAY = "+44 7765 977085";
const WHATSAPP_MESSAGE =
  "Hi Jakub, I'm interested in the Elite FBA mentorship.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-surface-alt pt-28 pb-20 px-6">
      <div className="mx-auto max-w-[460px]">
        <Link
          href="/"
          className="inline-block font-display text-[1.25rem] font-semibold tracking-[-0.02em] text-ink mb-8"
        >
          EliteFBA<span className="text-accent">.</span>
        </Link>

        <div className="rounded-2xl bg-surface hairline shadow-[var(--shadow-lift)] p-8 md:p-10 text-center">
          <p className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-ink-subtle">
            Enroll · Next step
          </p>
          <h1 className="mt-3 font-display text-[1.6rem] md:text-[1.875rem] font-semibold tracking-[-0.02em] leading-[1.15]">
            Let&rsquo;s talk first.
          </h1>
          <p className="mt-3 text-[0.95rem] text-ink-muted leading-[1.55]">
            Elite FBA is a small, hand-picked mentorship, so every spot
            starts with a conversation rather than a checkout page. Message
            me directly on WhatsApp and I&rsquo;ll walk you through how it
            works, whether it&rsquo;s a fit, and what happens next.
          </p>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-white font-medium text-[0.95rem] transition-colors duration-150 hover:bg-[#1da851] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <WhatsAppIcon size={18} />
            Message Jakub on WhatsApp
          </a>
          <p className="mt-3 font-mono text-[0.7rem] tracking-[0.08em] uppercase text-ink-subtle">
            {WHATSAPP_DISPLAY}
          </p>
        </div>

        <p className="mt-6 text-center text-[0.9rem] text-ink-muted">
          Already a student?{" "}
          <Link
            href="/dashboard"
            className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent transition-colors"
          >
            Go to your dashboard
          </Link>
        </p>
      </div>
    </main>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.768-.978zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}
