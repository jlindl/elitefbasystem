import { Accordion } from "./accordion";
import { Reveal } from "./reveal";

const faqs = [
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
    <section id="faq" className="scroll-mt-20 md:scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="max-w-[820px]">
          <Reveal>
            <p className="label-mono">09 / Questions</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)]">
              Honest answers to the questions you&rsquo;re actually asking.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-14 rounded-2xl bg-surface overflow-hidden hairline">
            <Accordion items={faqs} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
