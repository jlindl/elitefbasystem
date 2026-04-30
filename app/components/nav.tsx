"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "./icons";
import { SignInModal, type AuthTab } from "./sign-in-modal";

const links = [
  { href: "/my-story", label: "My Story" },
  { href: "/#mentorship", label: "Mentorship" },
  { href: "/#community", label: "Community" },
  { href: "/#results", label: "Results" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<AuthTab>("login");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const openAuth = (tab: AuthTab) => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "bg-bg/75 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[64px] md:h-[72px] max-w-[1280px] items-center justify-between px-6 md:px-8"
      >
        <a
          href="/"
          className="font-display text-[1.25rem] md:text-[1.375rem] font-semibold tracking-[-0.02em] text-ink"
        >
          EliteFBA<span className="text-accent">.</span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-[0.9rem] text-ink-muted hover:text-ink transition-colors duration-200"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-[width] duration-300 ease-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            type="button"
            onClick={() => openAuth("login")}
            className="hidden md:inline-flex h-9 items-center px-3 text-[0.9rem] text-ink-muted hover:text-ink transition-colors"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => openAuth("signup")}
            className="hidden md:inline-flex h-10 items-center rounded-full border border-line bg-surface px-4 text-[0.9rem] font-medium text-ink hover:-translate-y-px hover:border-ink/20 transition-all duration-200"
          >
            Sign up
          </button>
          <a
            href="/#apply"
            className="inline-flex h-10 items-center rounded-full bg-accent px-5 text-[0.9rem] font-medium text-white shadow-[0_1px_2px_rgba(10,10,10,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-deep hover:shadow-[0_4px_14px_rgba(255,107,26,0.35)] ml-1 md:ml-2"
          >
            Apply Now
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center text-ink"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-bg">
          <div className="mx-auto flex h-[64px] md:h-[72px] max-w-[1280px] items-center justify-between px-6 md:px-8">
            <a
              href="/"
              onClick={() => setOpen(false)}
              className="font-display text-[1.25rem] font-semibold tracking-[-0.02em]"
            >
              EliteFBA<span className="text-accent">.</span>
            </a>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center"
            >
              <X size={22} />
            </button>
          </div>
          <ul className="px-6 pt-12 flex flex-col gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl font-medium tracking-[-0.02em]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="px-6 pt-10 mt-8 border-t border-line flex flex-col gap-3">
            <a
              href="/#apply"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-base font-medium text-white"
            >
              Apply Now
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openAuth("signup");
              }}
              className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-surface px-5 text-base font-medium text-ink"
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openAuth("login");
              }}
              className="inline-flex h-11 items-center justify-center text-[0.95rem] text-ink-muted hover:text-ink"
            >
              Log in
            </button>
          </div>
        </div>
      )}

      <SignInModal
        open={authOpen}
        initialTab={authTab}
        onClose={() => setAuthOpen(false)}
      />
    </header>
  );
}
