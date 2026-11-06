import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/app/components/icons";
import { AppShell } from "../_components/app-shell";
import { Certificate } from "../_components/certificate";
import { artContent } from "../_components/certificate-art";
import { NameForm } from "../_components/name-form";
import { ProgressBar } from "../_components/ui/progress-bar";
import { formatIssued } from "../_lib/certificate-defs";
import { getMyCertificates, isNameLocked, type MyCertificate } from "../_lib/certificates";
import { getCurrentStudent } from "../_lib/get-student";

export const metadata: Metadata = {
  title: "Certificates - EliteFBA",
  description: "Your Elite FBA certificates.",
};

function preview(c: MyCertificate) {
  return artContent(c, { recipient: c.recipient, day: c.issuedOn, certId: c.earned ? c.certId : null, qr: null });
}

function statusLine(c: MyCertificate) {
  if (c.earned && c.issuedOn) return `Earned ${formatIssued(c.issuedOn)}`;
  if (c.kind === "programme") return `${c.progress.done} of ${c.progress.total} module exams passed`;
  if (c.progress.total && c.progress.done === c.progress.total) return "Lessons done - take the final exam to earn it";
  return `Pass the final exam to earn it · ${c.progress.done} of ${c.progress.total} lessons done`;
}

function ModuleCertificateCard({ c }: { c: MyCertificate }) {
  const href = c.earned ? `/dashboard/certificates/${c.slug}` : c.href;
  return (
    <li>
      <Link
        href={href}
        className={`group flex h-full flex-col rounded-3xl border bg-surface p-3 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
          c.earned ? "border-line hover:border-ink/25" : "border-dashed border-line hover:border-ink/25"
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5">
          <div className={`transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] ${c.earned ? "" : "opacity-55 grayscale-[0.7]"}`}>
            <Certificate content={preview(c)} decorative />
          </div>
          {!c.earned && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1 text-[0.8125rem] font-semibold text-white backdrop-blur">
              <span aria-hidden>🔒</span> Not earned yet
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
          <p className="text-[0.875rem] font-medium text-ink-muted">Module {c.number}</p>
          <h3 className="mt-0.5 font-display text-[1.125rem] font-semibold leading-snug text-ink">{c.title}</h3>
          <p className={`mt-2 text-[0.9375rem] ${c.earned ? "font-medium text-emerald-800" : "text-ink-muted"}`}>
            {c.earned && <span aria-hidden>✓ </span>}
            {statusLine(c)}
          </p>
          {!c.earned && c.progress.total > 0 && (
            <div aria-hidden className="mt-3">
              <ProgressBar percent={(c.progress.done / c.progress.total) * 100} />
            </div>
          )}
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.9375rem] font-semibold text-ink">
            {c.earned ? "View certificate" : "Go to the module"}
            <ArrowRight size={16} className="nudge" />
          </span>
        </div>
      </Link>
    </li>
  );
}

export default async function CertificatesPage() {
  const student = await getCurrentStudent();
  const [certs, locked] = await Promise.all([getMyCertificates(), isNameLocked()]);
  const modules = certs.filter((c) => c.kind === "module");
  const programme = certs.find((c) => c.kind === "programme")!;
  const earned = certs.filter((c) => c.earned).length;

  return (
    <AppShell student={student}>
      <div className="mx-auto max-w-[1120px] space-y-10 px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <header className="dash-rise flex flex-col gap-5 md:flex-row md:items-end md:justify-between" style={{ ["--i" as string]: 0 }}>
          <div>
            <p className="text-[0.9375rem] font-semibold text-orange-800">Your achievements</p>
            <h1 className="mt-1 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink md:text-[2.5rem]">Certificates</h1>
            <p className="mt-3 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink-muted">
              Pass a module&rsquo;s final exam and its certificate is yours. Download it as a PDF, add it to LinkedIn, and share a link anyone can
              use to check it&rsquo;s genuine.
            </p>
          </div>
          <p className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-surface px-4 py-2 text-[0.9375rem] font-semibold text-ink md:self-auto">
            <span aria-hidden>🏅</span> {earned} of {certs.length} earned
          </p>
        </header>

        {/* One name form in one place: saving re-renders this card in place, so focus and the "Saved" message survive. */}
        <section
          aria-labelledby="name-heading"
          className={`dash-rise rounded-3xl border p-5 sm:p-6 ${student.nameIsSet ? "border-line bg-surface" : "border-amber-200 bg-amber-50"}`}
          style={{ ["--i" as string]: 1 }}
        >
          <h2 id="name-heading" className={student.nameIsSet ? "sr-only" : "font-display text-[1.125rem] font-semibold text-amber-950"}>
            {student.nameIsSet ? "The name on your certificates" : "Add your name before you share a certificate"}
          </h2>
          {!student.nameIsSet && (
            <p className="mt-1 text-[0.9375rem] text-amber-950/80">
              We don&rsquo;t have your full name yet, so certificates currently show &ldquo;{student.fullName}&rdquo;.
            </p>
          )}
          <div className={`flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between ${student.nameIsSet ? "" : "mt-4"}`}>
            <div className="min-w-0 max-w-[560px] flex-1">
              <NameForm name={student.fullName} nameIsSet={student.nameIsSet} locked={locked} />
            </div>
            <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-muted">
              {locked
                ? "Your name is on your certificates, so it's locked. Jakub can correct it if anything's wrong."
                : "Your name is printed on every certificate. Once you've earned one, it's locked, so check the spelling."}
            </p>
          </div>
        </section>

        {/* The Core Programme certificate */}
        <section
          aria-labelledby="programme-heading"
          className="dash-rise relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-8 lg:p-10"
          style={{ ["--i" as string]: 2 }}
        >
          <div aria-hidden className="dash-grid-dark absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(226,180,94,0.32), transparent 65%)" }}
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p className="text-[0.9375rem] font-semibold text-[#ebc479]">The big one</p>
              <h2 id="programme-heading" className="mt-1 font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] md:text-[2.125rem]">
                Elite FBA Core Programme
              </h2>
              <p className="mt-3 max-w-[48ch] text-[1rem] leading-relaxed text-white/80">
                {programme.earned
                  ? "You've passed every module exam. This is your certificate of achievement for the whole core programme."
                  : `Pass all ${programme.progress.total} module exams to earn the certificate of achievement for the whole programme.`}
              </p>
              <ol className="mt-6 flex flex-wrap gap-2" aria-label="Module exams">
                {modules.map((m) => (
                  <li key={m.slug}>
                    <span
                      className={`inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-full px-3 text-[0.9375rem] font-semibold ${
                        m.earned ? "bg-[#e2b45e] text-[#2a1d06]" : "bg-white/10 text-white/85 ring-1 ring-white/15"
                      }`}
                    >
                      {m.earned ? <span aria-hidden>✓</span> : null}
                      {m.number}
                      <span className="sr-only">
                        : Module {m.number} exam {m.earned ? "passed" : "not passed yet"}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-[0.9375rem] text-white/75">
                {programme.progress.done} of {programme.progress.total} exams passed
              </p>
              <div className="mt-6">
                {programme.earned ? (
                  <Link href={`/dashboard/certificates/${programme.slug}`} className="btn h-12 bg-[#e2b45e] text-[#1d1504] hover:bg-[#ebc479]">
                    View certificate <ArrowRight size={16} className="btn-arrow" />
                  </Link>
                ) : (
                  <Link href={programme.href} className="btn h-12 bg-white text-ink hover:bg-white/90">
                    Keep going <ArrowRight size={16} className="btn-arrow" />
                  </Link>
                )}
              </div>
            </div>
            <div className="relative">
              <div
                className={`overflow-hidden rounded-xl shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-transform duration-700 ease-[var(--ease-out-expo)] lg:rotate-[1.5deg] lg:hover:rotate-0 ${
                  programme.earned ? "" : "opacity-60 saturate-[0.6]"
                }`}
              >
                <Certificate content={preview(programme)} decorative={!programme.earned} />
              </div>
              {!programme.earned && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[0.8125rem] font-semibold text-white backdrop-blur">
                  <span aria-hidden>🔒</span> Preview
                </span>
              )}
            </div>
          </div>
        </section>

        <section aria-labelledby="modules-heading" className="dash-rise" style={{ ["--i" as string]: 3 }}>
          <h2 id="modules-heading" className="font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-ink">
            Module certificates
          </h2>
          <p className="mt-1 text-[1rem] text-ink-muted">One for every module exam you pass.</p>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {modules.map((c) => (
              <ModuleCertificateCard key={c.slug} c={c} />
            ))}
          </ul>
        </section>

        <section aria-labelledby="how-heading" className="dash-rise" style={{ ["--i" as string]: 4 }}>
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-7">
            <h2 id="how-heading" className="font-display text-[1.25rem] font-semibold text-ink">
              How certificates work
            </h2>
            <ol className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                ["Pass the final exam", "Finish a module's lessons, then score 70% or more on its final exam. You can retake it as often as you like."],
                ["Download or share it", "Save it as a PDF or an image, add it to your LinkedIn profile, or send the link to anyone."],
                ["Anyone can check it", "Each certificate has a unique ID and a QR code. The link opens a page confirming it's genuine."],
              ].map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <span aria-hidden className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[0.9375rem] font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{title}</h3>
                    <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-ink-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
