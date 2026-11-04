import Link from "next/link";
import { ArrowRight } from "./icons";
import { Reveal, RevealWords } from "./reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 62%, rgba(255,107,26,0.26), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8 py-20 md:py-44">
        <div className="mx-auto max-w-[980px] text-center">
          <Reveal>
            <p className="eyebrow !text-white/50 justify-center">
              <span className="eyebrow-rule" />
              Ready?
              <span className="eyebrow-rule" />
            </p>
          </Reveal>
          <h2 className="mt-7 font-display font-medium tracking-[-0.04em] leading-[1] text-balance text-[clamp(2.5rem,7.5vw,6.25rem)]">
            <RevealWords text="Stop watching FBA on YouTube." className="block" />
            <RevealWords
              delay={240}
              className="block text-accent"
              text={"Start building it - with a team."}
            />
          </h2>
          <Reveal delay={360}>
            <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a href="/checkout" className="btn btn-primary btn-lg">
                Enroll in Mentorship
                <ArrowRight size={18} className="btn-arrow" />
              </a>
              <Link href="/#video" className="btn btn-on-dark btn-lg">
                Watch Jakub&rsquo;s story
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
