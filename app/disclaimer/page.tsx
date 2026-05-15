"use client";

import { Footer } from "../components/footer";
import { Nav } from "../components/nav";
import { Reveal } from "../components/reveal";

export default function DisclaimerPage() {
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
                Income Disclaimer
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
                  <h2 className="font-display text-2xl font-medium text-ink">1. No Guarantees of Earnings</h2>
                  <p>
                    Every effort has been made to accurately represent the Elite FBA program and its potential. However, JMW Holdings Group Limited offers no guarantee that you will earn any money using the techniques, strategies, or ideas provided in these materials.
                  </p>
                  <p>
                    The examples used (such as the "PoundMart" case study or specific bundle performance) are for illustrative purposes only. They are not to be interpreted as a promise or guarantee of earnings. Your earning potential is entirely dependent on your own execution, market conditions, and the capital you choose to deploy. We do not position this product as a "get rich scheme."
                  </p>
                </div>
              </Reveal>

              <Reveal delay={260}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">2. Individual Effort and Risk</h2>
                  <p>
                    Your level of success depends on the time you devote to the program, your financial resources, your ability to execute shelf research, and your persistence in the face of market changes.
                  </p>
                  <p>
                    Starting an Amazon FBA business involves inherent financial risk. You may lose money on inventory, shipping, or PPC advertising. JMW Holdings Group Limited is not responsible for your business decisions, financial losses, or the outcome of your Amazon Seller account.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">3. Not Financial or Legal Advice</h2>
                  <p>
                    The information provided within Elite FBA is for educational and informational purposes only.
                  </p>
                  <p>
                    We are operators, not financial advisors, accountants, or lawyers.
                  </p>
                  <p>
                    Nothing in this course should be construed as professional financial, legal, or tax advice.
                  </p>
                  <p>
                    You should consult with a qualified professional before forming a Limited Company or making significant financial investments.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={380}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">4. Testimonials and Case Studies</h2>
                  <p>
                    Any success stories or testimonials used on this site are from students who have applied the Elite FBA system. These results are not typical. Most people who purchase business courses do not see results because they do not take consistent action. These testimonials are not intended to represent or guarantee that anyone will achieve the same or similar results.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={440}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">5. Forward-Looking Statements</h2>
                  <p>
                    Materials in our program may contain "forward-looking statements" regarding expectations or forecasts of future events. You can identify these by words such as "anticipate," "estimate," "expect," "project," or "plan." These statements are our opinion of earnings potential only and are not facts.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-medium text-ink">6. Independence from Amazon</h2>
                  <p>
                    Elite FBA is an independent training platform. We are not affiliated with, endorsed by, or sponsored by Amazon.com, Inc. or any of its subsidiaries. "Amazon" and "FBA" are registered trademarks of Amazon.com, Inc.
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
