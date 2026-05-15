"use client";

import { useState } from "react";
import { Footer } from "../components/footer";
import { Nav } from "../components/nav";
import { Reveal } from "../components/reveal";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <>
      <Nav />
      <main className="pt-24 md:pt-32 bg-bg">
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[600px] px-6 md:px-8">
            <div className="text-center mb-12">
              <Reveal>
                <p className="label-mono">Get in touch</p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display font-medium tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,5vw,4rem)] text-ink">
                  Contact Us
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-4 text-[1rem] md:text-[1.125rem] leading-[1.55] text-ink-muted">
                  Have a question about the mentorship or curriculum? Drop us a message below.
                </p>
              </Reveal>
            </div>

            <Reveal delay={240}>
              <div className="bg-surface hairline rounded-2xl p-6 md:p-8">
                {status === "success" ? (
                  <div className="text-center py-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h2 className="text-xl font-display font-medium text-ink mb-2">Message Sent!</h2>
                    <p className="text-ink-muted text-[0.95rem]">
                      Thanks for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-[0.85rem] font-medium text-ink-muted mb-2 font-mono uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full h-12 px-4 rounded-lg border border-line bg-surface-alt text-ink focus:outline-none focus:border-accent transition-colors text-[0.95rem]"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-[0.85rem] font-medium text-ink-muted mb-2 font-mono uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full h-12 px-4 rounded-lg border border-line bg-surface-alt text-ink focus:outline-none focus:border-accent transition-colors text-[0.95rem]"
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-[0.85rem] font-medium text-ink-muted mb-2 font-mono uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-line bg-surface-alt text-ink focus:outline-none focus:border-accent transition-colors text-[0.95rem] resize-none"
                        placeholder="How can we help?"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-base font-medium text-white shadow-[0_1px_2px_rgba(10,10,10,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep hover:shadow-[0_4px_14px_rgba(255,107,26,0.35)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      {status === "loading" ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            <Reveal delay={320}>
              <p className="mt-8 text-center text-[0.85rem] text-ink-subtle">
                By submitting this form, you agree to our <a href="/privacy" className="text-ink-muted hover:text-ink underline">Privacy Policy</a>.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
