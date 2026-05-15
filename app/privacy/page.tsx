"use client";

import { Footer } from "../components/footer";
import { Nav } from "../components/nav";
import { Reveal } from "../components/reveal";

export default function PrivacyPage() {
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
                Privacy Policy
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
                  <h2 className="font-display text-2xl font-medium text-ink">1. Introduction</h2>
                  <p>
                    Welcome to Elite FBA, owned and operated by JMW Holdings Group Limited ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy applies to all information collected through our website, mentorship programs, and/or any related services, sales, marketing, or events (collectively, the "Services").
                  </p>
                </div>
              </Reveal>

              <Reveal delay={260}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">2. Information We Collect</h2>
                  <p>
                    We collect personal information that you voluntarily provide to us when registering for the Services, subscribing to our course, or participating in mentorship sessions.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personal Data:</strong> Name, email address, postal address, and phone number.</li>
                    <li><strong>Credentials:</strong> Passwords and security information used for account authentication.</li>
                    <li><strong>Payment Data:</strong> We collect data necessary to process your payment (e.g., credit card number and security code). All payment data is processed securely by our third-party processors.</li>
                    <li><strong>Transaction Data:</strong> Details about the courses or mentorship tiers you have purchased and your progress within the curriculum.</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">3. How We Use Your Information</h2>
                  <p>
                    We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, and compliance with our legal obligations. We use your information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To provide and facilitate the delivery of course modules and mentorship sessions.</li>
                    <li>To manage your account and provide technical support.</li>
                    <li>To send marketing and promotional communications (which you may opt out of at any time).</li>
                    <li>To fulfill and manage orders, payments, and refunds.</li>
                    <li>To request feedback on the Elite FBA system.</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={380}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">4. Sharing Your Information</h2>
                  <p>
                    We only share information with your consent, to comply with laws, or to provide you with the Services. We share data with the following categories of third-party service providers:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Payment Processors:</strong> To handle secure transactions (e.g., Stripe, PayPal).</li>
                    <li><strong>Course Hosting Platforms:</strong> To deliver the Elite FBA curriculum.</li>
                    <li><strong>Email Marketing Tools:</strong> To send course updates and newsletters.</li>
                    <li><strong>Communication Tools:</strong> To facilitate mentorship and community interaction.</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={440}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">5. Community and Mentorship Groups</h2>
                  <p>
                    If you participate in our community forums or mentorship groups, please be aware that any personal information you post (e.g., your name, business strategies, or screenshots) may be seen, collected, and used by other members of the program.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">6. Cookies and Tracking Technologies</h2>
                  <p>
                    We may use cookies and similar tracking technologies to access or store information regarding how you interact with our website. You can find more details in our Cookie Policy.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={560}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">7. Data Retention</h2>
                  <p>
                    We will only keep your personal information for as long as is necessary for the purposes set out in this policy. Generally, we retain account and transaction data for 6 years to comply with UK tax and legal record-keeping requirements.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={620}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">8. Your Privacy Rights (UK/EEA)</h2>
                  <p>
                    Under the UK GDPR, you have the right to request access to, correction of, or erasure of your personal data. You also have the right to object to or restrict the processing of your data and the right to data portability.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={680}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">9. Privacy of Minors</h2>
                  <p>
                    Our Services are intended for individuals aged 18 and older. We do not knowingly collect data from individuals under the age of 18.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={740}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">10. Updates to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this page will indicate when the last changes were made.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={800}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">11. Contact Us</h2>
                  <p>
                    If you have questions or comments about this policy, you may contact JMW Holdings Group Limited via the support email listed on the Elite FBA website.
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
