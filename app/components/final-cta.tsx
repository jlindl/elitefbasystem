import { ArrowRight } from "./icons";
import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-28 md:py-40">
        <div className="text-center max-w-[920px] mx-auto">
          <Reveal>
            <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-white/50">
              Ready?
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-7 font-display font-medium tracking-[-0.025em] leading-[1.02] text-[clamp(2.5rem,7vw,6rem)]">
              Stop watching FBA on YouTube.
              <br />
              <span className="text-accent">Start building it - with a team.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <a
              href="#apply"
              className="mt-12 inline-flex h-14 items-center gap-2 rounded-full bg-accent px-8 text-[1rem] font-medium text-white shadow-[0_1px_2px_rgba(255,255,255,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep hover:shadow-[0_12px_32px_rgba(255,107,26,0.4)]"
            >
              Apply for Mentorship
              <ArrowRight size={18} />
            </a>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-7 text-[0.95rem] text-white/55">
              Or{" "}
              <a
                href="#video"
                className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-accent transition-colors"
              >
                watch Jakub&rsquo;s story
              </a>{" "}
              first &rarr;
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
