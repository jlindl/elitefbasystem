import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/app/components/accordion";
import { AppShell } from "../_components/app-shell";
import { OpenSearch } from "../_components/open-search";
import { PageHeader } from "../_components/ui/page-header";
import { getCurrentStudent } from "../_lib/get-student";

export const metadata: Metadata = {
  title: "Help - EliteFBA",
  description: "Get help and answers to common EliteFBA questions.",
};

const WHATSAPP_NUMBER = "447765977085";
const WHATSAPP_DISPLAY = "+44 7765 977085";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const faqs = [
  {
    id: "ask",
    title: "How do I get help or ask a question?",
    body: (
      <>
        The fastest way is to message Jakub directly on WhatsApp using the
        button at the top of this page. You&rsquo;ll usually get a reply the
        same day. For anything course-related, send the module or lesson
        you&rsquo;re on so we can point you straight to the answer.
      </>
    ),
  },
  {
    id: "structure",
    title: "How is the course structured?",
    body: (
      <>
        The course runs across nine modules, from Amazon FBA fundamentals
        through opening your seller account, product research, listing
        creation, sending stock to Amazon, launching a brand, marketing,
        expansion, and long-term maintenance. Each module is broken into
        short lessons, and most modules finish with a short exam. You can
        track your progress and mark each lesson complete as you go.
      </>
    ),
  },
  {
    id: "cost",
    title: "How much money do I need to start?",
    body: (
      <>
        Far less than most people think. The whole approach is built around a
        lean start: you test a product with a small batch of around 5 to 10
        units bought at retail, rather than spending thousands upfront. Beyond
        your test stock you&rsquo;ll need a few low-cost essentials (packaging
        supplies of roughly £30 to £50) and, once your first units are
        checked in, Amazon&rsquo;s Professional selling plan at about £25 plus
        VAT per month.
      </>
    ),
  },
  {
    id: "units",
    title: "How many units should I order for my first product?",
    body: (
      <>
        Start lean. Test demand with a small batch (around 5 to 10 units)
        bought at retail before committing real money. Once a product proves
        it sells, you move to buying it wholesale in larger quantities to cut
        your costs and scale. This &ldquo;validate first, scale second&rdquo;
        approach is the core of the framework and protects you from sinking
        cash into stock that doesn&rsquo;t sell.
      </>
    ),
  },
  {
    id: "company",
    title: "Do I need a limited company or VAT registration to start?",
    body: (
      <>
        No. You can start as a sole trader (selected as &ldquo;Individual&rdquo;
        when registering on Amazon), and most new sellers are not VAT-registered
        at first. Forming a limited company and registering a trademark come
        later, once a product is proven and you&rsquo;re ready to build a
        protected brand. Starting lean keeps your tax and banking simple while
        you validate.
      </>
    ),
  },
  {
    id: "tools",
    title: "What tools do I actually need?",
    body: (
      <>
        Very few to begin with: Amazon Seller Central, the free Helium 10
        Chrome extension for research, and a free design tool like Canva for
        listing images. You&rsquo;ll find all of them, plus suppliers and
        plain-English definitions, in your{" "}
        <Link href="/dashboard/tools/links" className="text-accent hover:text-accent-deep underline">
          Useful Links
        </Link>
        ,{" "}
        <Link href="/dashboard/tools/suppliers" className="text-accent hover:text-accent-deep underline">
          Wholesale Suppliers
        </Link>
        , and{" "}
        <Link href="/dashboard/tools/dictionary" className="text-accent hover:text-accent-deep underline">
          Jargon Dictionary
        </Link>{" "}
        tools.
      </>
    ),
  },
  {
    id: "suppliers",
    title: "Where do I find products and suppliers?",
    body: (
      <>
        You validate cheaply with retail-bought stock first, then source the
        same product wholesale to scale. The{" "}
        <Link href="/dashboard/tools/suppliers" className="text-accent hover:text-accent-deep underline">
          Wholesale Suppliers
        </Link>{" "}
        tool lists vetted online wholesalers by category (pet, home, toys,
        beauty and more), B2B marketplaces, directories, and overseas
        suppliers. Overseas/Chinese suppliers are best left until a product is
        proven and you can meet their minimum orders.
      </>
    ),
  },
  {
    id: "jargon",
    title: "I don't understand some of the terms. Where can I look them up?",
    body: (
      <>
        Open the{" "}
        <Link href="/dashboard/tools/dictionary" className="text-accent hover:text-accent-deep underline">
          Jargon Dictionary
        </Link>{" "}
        tool. It explains every acronym and bit of jargon used across the
        course (FBA, ASIN, FNSKU, Buy Box, GTIN exemption, and many more) in
        plain English, and it&rsquo;s fully searchable.
      </>
    ),
  },
  {
    id: "progress",
    title: "How do I track my progress?",
    body: (
      <>
        Each lesson has a &ldquo;Mark this section as complete&rdquo; checkbox
        at the bottom. Your dashboard shows how many modules you&rsquo;ve
        completed and the next lesson to continue with, and the Modules page
        highlights completed modules once you pass their exam.
      </>
    ),
  },
  {
    id: "timeline",
    title: "How long until I make my first sale?",
    body: (
      <>
        It depends on how quickly you work through validation, sourcing, and
        getting your first listing live, plus Amazon&rsquo;s account
        verification (often around 5 to 10 days). Many students get a first
        product live within a few weeks of starting. The course is designed to
        be worked through at your own pace. Steady progress beats rushing.
      </>
    ),
  },
  {
    id: "outside-uk",
    title: "Can I follow this if I'm not in the UK?",
    body: (
      <>
        The strategy applies broadly, but the course is written around the UK
        marketplace (Amazon.co.uk), UK company/trademark registration, and UK
        suppliers and carriers. If you&rsquo;re elsewhere, the principles still
        hold, but some specifics (taxes, registration, suppliers) will differ.
        Message Jakub on WhatsApp if you want to talk through your situation.
      </>
    ),
  },
];

export default async function HelpPage() {
  const student = await getCurrentStudent();

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[1040px] space-y-8 px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <PageHeader eyebrow="Help" title="How can we help?" description="Message Jakub directly, search the course, or browse the questions members ask most." />

        <div className="dash-rise grid gap-3 md:grid-cols-[1.4fr_1fr]" style={{ ["--i" as string]: 1 }}>
          <section className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-8">
            <div aria-hidden className="dash-grid-dark absolute inset-0 opacity-70" />
            <div aria-hidden className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(37,211,102,0.3), transparent 65%)" }} />
            <div className="relative">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#5ee08f]">● Direct line</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.03em]">Need a hand? Message Jakub.</h2>
              <p className="mt-2 max-w-[460px] text-[0.95rem] leading-relaxed text-white/65">
                A question about a product, a listing, your account or your next step - send the lesson you&rsquo;re on and you&rsquo;ll usually
                hear back the same day.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(37,211,102,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1da851]"
              >
                <WhatsAppIcon size={18} /> Chat on WhatsApp
              </a>
              <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/45">{WHATSAPP_DISPLAY}</p>
            </div>
          </section>

          <div className="grid gap-3">
            <OpenSearch className="spot lift group flex items-center gap-4 rounded-3xl border border-line bg-surface p-5 text-left">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface-alt text-[1.25rem]" aria-hidden>🔎</span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[1rem] font-semibold text-ink">Search the course</span>
                <span className="block text-[0.82rem] text-ink-muted">Lessons, terms, suppliers · ⌘K</span>
              </span>
              <span aria-hidden className="nudge text-ink-subtle">→</span>
            </OpenSearch>
            {[
              { href: "/dashboard/tools/dictionary", emoji: "📖", title: "Jargon dictionary", body: "Every term in plain English" },
              { href: "/dashboard/modules", emoji: "📘", title: "Your modules", body: "Pick up where you left off" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="spot lift group flex items-center gap-4 rounded-3xl border border-line bg-surface p-5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface-alt text-[1.25rem]" aria-hidden>{l.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1rem] font-semibold text-ink">{l.title}</span>
                  <span className="block text-[0.82rem] text-ink-muted">{l.body}</span>
                </span>
                <span aria-hidden className="nudge text-ink-subtle">→</span>
              </Link>
            ))}
          </div>
        </div>

        <section className="dash-rise" style={{ ["--i" as string]: 2 }} aria-labelledby="faq">
          <h2 id="faq" className="font-display text-[1.5rem] font-medium tracking-[-0.025em] text-ink">
            Frequently asked questions
          </h2>
          <div className="mt-4 overflow-hidden rounded-3xl border border-line bg-surface shadow-[var(--shadow-soft)]">
            <Accordion items={faqs} />
          </div>
        </section>
      </div>
    </AppShell>
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
