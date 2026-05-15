"use client";

import { Footer } from "../components/footer";
import { Nav } from "../components/nav";
import { Reveal } from "../components/reveal";

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 md:pt-32 bg-bg">
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[820px] px-6 md:px-8">
            <Reveal>
              <p className="label-mono">Legal</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,5vw,4.5rem)] text-ink">
                Terms & Conditions
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 font-mono text-[0.75rem] tracking-[0.14em] uppercase text-ink-subtle">
                Last updated: 13/05/2026
              </p>
            </Reveal>

            <div className="mt-14 space-y-10 text-[1rem] md:text-[1.125rem] leading-[1.75] text-ink-muted">
              <Reveal delay={200}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">1. Agreement to Terms</h2>
                  <p>
                    By accessing or using the Services provided by Elite FBA, a brand operated by JMW Holdings Group Limited ("the Company," "we," "our," or "us"), you agree to be bound by these Terms and Conditions. These terms apply to all students, mentorship clients, and community members.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={260}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">2. Description of Service</h2>
                  <p>
                    Elite FBA provides educational content, video modules, and mentorship regarding the Amazon FBA "Lean → Validate → Scale" model.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Educational Purpose Only:</strong> We provide a framework based on real-world execution. We do not provide financial, legal, tax, or professional business advice.</li>
                    <li><strong>No Guarantees:</strong> Success in Amazon FBA depends on market conditions, individual effort, and capital. We do not guarantee specific income results or that any product found via our methods will be profitable.</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">3. Intellectual Property & Non-Compete</h2>
                  <p>
                    All materials (videos, spreadsheets, GTIN checklists, templates) are the sole property of JMW Holdings Group Limited.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Limited License:</strong> You are granted a single-user license for personal educational use.</li>
                    <li><strong>Prohibitions:</strong> You are strictly prohibited from sharing login credentials, recording content, or redistributing materials.</li>
                    <li><strong>Anti-Poaching:</strong> You may not use the Elite FBA community to solicit our students for your own competing courses, services, or software.</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={380}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">4. Payment, Refunds, and "Instant Access" Waiver</h2>
                  <p>
                    Payments are required in full or via an agreed-upon installment plan before access is granted.
                  </p>
                  <p>
                    <strong>Digital Content Policy:</strong> Under the UK Consumer Rights Act, the 14-day "cooling off" period for digital content does not apply if you have started to download or stream the content.
                  </p>
                  <p>
                    <strong>Strict No-Refund Policy:</strong> By purchasing and accessing the course, you expressively consent to waive your right to a refund. This is due to the proprietary nature of the "PoundMart" sourcing methods and instant access to our product validation data.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={440}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">5. Amazon Account & Compliance Responsibility</h2>
                  <p>
                    The "Elite FBA" method emphasizes safety, but Amazon is a third-party platform with its own evolving rules.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Operator Responsibility:</strong> You are solely responsible for maintaining your Amazon Seller Central account in good standing.</li>
                    <li><strong>Liability Waiver:</strong> JMW Holdings Group Limited is not liable for any account deactivations, IP complaints, or "Section 3" suspensions resulting from your business operations. You must perform your own due diligence on every product and brand you source.</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">6. User Conduct & Community Standards</h2>
                  <p>
                    We maintain a "No Fluff, No Ego" community. We reserve the right to remove you from the mentorship or community platforms (without refund) if you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Engage in harassment or "toxic" behavior toward other students.</li>
                    <li>Promote "get rich quick" schemes or unrelated affiliate links.</li>
                    <li>Violate the intellectual property terms mentioned in Section 3.</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={560}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">7. Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by law, JMW Holdings Group Limited shall not be liable for any direct, indirect, or consequential loss of profits or data arising from your use of the Elite FBA system. Your business involves financial risk; do not invest capital that you cannot afford to lose during the "Validation" phase.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={620}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">8. Governing Law</h2>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of the United Kingdom.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
