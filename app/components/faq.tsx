import { Accordion } from "./accordion";
import { ArrowRight } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const faqs = [
  {
    id: "f-capital",
    title: "How much money do I need to start?",
    body: (
      <p>
        Less than most people think. The lean model starts with a small
        test batch - in one of the course case studies, the first batch
        cost £60-100 - and you only scale the products that sell. On top
        of stock, you&rsquo;ll need an Amazon Professional seller account
        (£25 + VAT a month). I&rsquo;ll talk you through the mentorship
        itself when we chat.
      </p>
    ),
  },
  {
    id: "f-beginner",
    title: "I've never sold anything online. Can I do this?",
    body: (
      <p>
        Yes. Module 1 starts from zero - what FBA is and how the money
        works - and Module 2 walks you through opening your seller account
        screen by screen. You won&rsquo;t be doing it alone either: you&rsquo;ll
        have me on a weekly call and on messages in between.
      </p>
    ),
  },
  {
    id: "f-time",
    title: "Can I do this alongside a full-time job?",
    body: (
      <p>
        That&rsquo;s exactly how I did it. I built the business on the side
        of my 9-5 and only left once the income was steady enough to
        replace my salary. Amazon handles storage, delivery and customer
        service, which is what makes it possible to run around a job.
      </p>
    ),
  },
  {
    id: "f1",
    title: "Is FBA dead in 2026?",
    body: (
      <p>
        No - but the easy version of it is. Random arbitrage and
        dropshipping the same five products is dead. Building a real brand
        with margin, defensibility, and decent ad efficiency works as well
        as it ever has. I make my living from it. So do my students.
      </p>
    ),
  },
  {
    id: "f2",
    title: "Is this just another guru course?",
    body: (
      <p>
        No, and the difference matters. I sell on Amazon every day. You get
        weekly 1-to-1 calls with me, direct messaging access, and the same
        playbook I use on my own SKUs. If that sounds like a typical FBA
        course, I haven&rsquo;t communicated it well.
      </p>
    ),
  },
  {
    id: "f3",
    title: "What does \"1-to-1 mentorship\" actually mean?",
    body: (
      <p>
        It means a real human (me) on a weekly call with you, plus
        messaging access in between. Not a Discord server I drop into once a
        month. Not a coaching VA. You&rsquo;ll feel the difference within
        the first two weeks.
      </p>
    ),
  },
  {
    id: "f6",
    title: "Do you actually still sell on Amazon, or just teach?",
    body: (
      <p>
        I sell, first. I will happily walk you through my Seller Central
        on the application call. The teaching is something I&rsquo;ve
        added because I want a small team of people I know. It is not
        replacing my business.
      </p>
    ),
  },
  {
    id: "f7",
    title: "Why do you limit the number of students?",
    body: (
      <p>
        Because I can&rsquo;t mentor 800 people personally and tell you
        the truth about it. The cap is the entire point of the program.
        When spots are full, you go on a waiting list, not a call with
        a closer.
      </p>
    ),
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 md:scroll-mt-24 py-16 md:py-36">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="10"
                eyebrow="Questions"
                title="Honest answers to the questions you’re actually asking."
              />
              <Reveal delay={220}>
                <div className="mt-10 rounded-2xl bg-surface-alt hairline p-6">
                  <p className="font-display text-[1.125rem] font-medium tracking-[-0.02em]">
                    Still not sure?
                  </p>
                  <p className="mt-1.5 text-[0.95rem] leading-[1.6] text-ink-muted">
                    Send me your question and I&rsquo;ll give you a straight
                    answer.
                  </p>
                  <a href="/contact" className="btn btn-secondary btn-sm mt-5">
                    Get in touch
                    <ArrowRight size={15} className="btn-arrow" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl md:rounded-3xl bg-surface hairline shadow-[var(--shadow-soft)]">
              <Accordion items={faqs} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
