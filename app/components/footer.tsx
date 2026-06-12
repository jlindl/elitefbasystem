"use client";

import { useState } from "react";
import { Instagram, TikTok } from "./icons";
import { SignInModal } from "./sign-in-modal";

const navLinks = [
  { label: "The Method", href: "#method" },
  { label: "Mentorship", href: "#mentorship" },
  { label: "Community", href: "#community" },
  { label: "Apply", href: "#apply" },
  { label: "Login", href: "#login" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Income Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/jakub_waw", handle: "@jakub_waw", Icon: Instagram },
  { label: "TikTok", href: "#", handle: "Coming soon", Icon: TikTok },
];

export function Footer() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-20 md:py-24">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <span className="font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-white">
              Elite FBA<span className="text-accent">.</span>
            </span>
            <p className="mt-4 max-w-[320px] text-[0.95rem] leading-[1.6]">
              Real Amazon FBA mentorship. Built by a real seller.
            </p>
            <ul className="mt-7 flex flex-col gap-4">
              {socials.map(({ label, href, handle, Icon }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70">
                    <Icon />
                  </span>
                  <div className="flex flex-col">
                    {label === "Instagram" ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.95rem] text-white/70 hover:text-white transition-colors"
                      >
                        {handle}
                      </a>
                    ) : (
                      <span className="text-[0.95rem] text-white/30">
                        {handle}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.75rem] tracking-[0.14em] uppercase text-white/40">
              Navigate
            </h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  {l.label === "Login" ? (
                    <button
                      onClick={() => setAuthOpen(true)}
                      className="text-[0.95rem] hover:text-white transition-colors text-left"
                    >
                      {l.label}
                    </button>
                  ) : (
                    <a
                      href={l.href}
                      className="text-[0.95rem] hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.75rem] tracking-[0.14em] uppercase text-white/40">
              Legal
            </h4>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[0.95rem] hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-[0.85rem]">
            © {new Date().getFullYear()} Elite FBA. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-3">
            <p className="text-[0.85rem] text-white/50">
              Powered by{" "}
              <a
                href="https://www.integrate-tech.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 underline underline-offset-4 decoration-white/30 hover:text-white hover:decoration-white transition-colors"
              >
                Integrate Tech
              </a>
            </p>
            <p className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-white/40">
              Not affiliated with Amazon.com, Inc.
            </p>
          </div>
        </div>
      </div>

      <SignInModal
        open={authOpen}
        initialTab="login"
        onClose={() => setAuthOpen(false)}
      />
    </footer>
  );
}
