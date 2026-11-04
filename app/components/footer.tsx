"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, TikTok } from "./icons";
import { SignInModal } from "./sign-in-modal";

// Absolute paths so the links also work from /results, /my-story and /contact.
const navLinks = [
  { label: "The Method", href: "/#method" },
  { label: "What is FBA?", href: "/#fba" },
  { label: "Mentorship", href: "/#mentorship" },
  { label: "Community", href: "/#community" },
  { label: "Results", href: "/results" },
  { label: "My Story", href: "/my-story" },
  { label: "Apply", href: "/#apply" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Income Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <footer className="relative bg-ink text-white/60">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Link
              href="/"
              className="font-display text-[1.5rem] font-semibold tracking-[-0.03em] text-white"
            >
              EliteFBA<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-[320px] text-[0.95rem] leading-[1.65]">
              Real Amazon FBA mentorship. Built by a real seller.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://instagram.com/jakub_waw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @jakub_waw"
                className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/10 pl-3 pr-4 text-[0.9rem] text-white/75 transition-colors hover:border-white/25 hover:text-white"
              >
                <Instagram />
                @jakub_waw
              </a>
              <span
                title="Coming soon"
                className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/5 pl-3 pr-4 text-[0.9rem] text-white/30"
              >
                <TikTok />
                Soon
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            <div>
              <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/35">
                Navigate
              </h4>
              <ul className="mt-5 space-y-3">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-[0.95rem] transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/35">
                Legal
              </h4>
              <ul className="mt-5 space-y-3">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-[0.95rem] transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/35">
                Students
              </h4>
              <ul className="mt-5 space-y-3">
                <li>
                  <button
                    type="button"
                    onClick={() => setAuthOpen(true)}
                    className="text-left text-[0.95rem] transition-colors hover:text-white"
                  >
                    Log in
                  </button>
                </li>
                <li>
                  <a
                    href="/checkout"
                    className="text-[0.95rem] transition-colors hover:text-white"
                  >
                    Enroll
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.85rem]">
            © {new Date().getFullYear()} Elite FBA. All rights reserved.
          </p>
          <div className="flex flex-col gap-x-6 gap-y-3 sm:flex-row sm:items-center">
            <p className="text-[0.85rem] text-white/45">
              Powered by{" "}
              <a
                href="https://www.integrate-tech.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                Integrate Tech
              </a>
            </p>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/35">
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
