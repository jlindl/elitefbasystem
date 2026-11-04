"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "./icons";
import { MobileCta } from "./mobile-cta";
import { SignInModal, type AuthTab } from "./sign-in-modal";
import { SmoothScroll } from "./smooth-scroll";

const links = [
  { href: "/my-story", label: "My Story" },
  { href: "/#mentorship", label: "Mentorship" },
  { href: "/#community", label: "Community" },
  { href: "/results", label: "Results" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];

/**
 * Site header for the marketing pages. Also mounts the page-level chrome those
 * pages share: smooth scrolling, the scroll progress bar and the mobile CTA.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<AuthTab>("login");
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      // Tuck the header away while reading down; bring it back on any scroll up.
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 480);
        lastY.current = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openAuth = (tab: AuthTab) => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  const solid = scrolled && !open;

  return (
    <>
      <SmoothScroll />

      <div
        aria-hidden
        className="scroll-progress fixed inset-x-0 top-0 z-[70] h-[2px] bg-accent"
      />

      <header
        className={`fixed inset-x-0 top-0 z-[60] px-3 pt-3 md:px-6 md:pt-4 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          hidden && !open ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-14 md:h-16 max-w-[1200px] items-center justify-between rounded-full pl-5 pr-2 md:pl-7 md:pr-2.5 border transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
            solid
              ? "bg-white/75 backdrop-blur-xl backdrop-saturate-150 border-line/80 shadow-[var(--shadow-float)]"
              : "bg-transparent border-transparent"
          }`}
        >
          <Link
            href="/"
            className="font-display text-[1.2rem] md:text-[1.3rem] font-semibold tracking-[-0.03em] text-ink"
          >
            EliteFBA<span className="text-accent">.</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex h-9 items-center rounded-full px-3.5 text-[0.875rem] text-ink-muted transition-colors duration-200 hover:bg-ink/[0.04] hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => openAuth("login")}
              className="hidden md:inline-flex h-9 items-center rounded-full px-3.5 text-[0.875rem] text-ink-muted transition-colors hover:text-ink"
            >
              Log in
            </button>

            <a href="/checkout" className="btn btn-primary btn-sm">
              Enroll Now
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.05]"
            >
              <span className="sr-only">Menu</span>
              <span
                aria-hidden
                className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                aria-hidden
                className={`absolute h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`lg:hidden fixed inset-0 z-[55] flex flex-col overflow-hidden bg-bg transition-[opacity,visibility] duration-500 ease-[var(--ease-out-expo)] ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          aria-hidden
          className="glow-orb -top-24 -right-24 h-72 w-72 bg-accent/20"
        />
        <ul className="relative flex-1 overflow-y-auto px-6 pt-28 sm:px-10">
          {links.map((link, i) => (
            <li
              key={link.href}
              style={{ "--i": i } as CSSProperties}
              className={`border-b border-line transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] [transition-delay:calc(var(--i)*50ms+80ms)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-4 font-display text-[1.875rem] font-medium tracking-[-0.03em] text-ink"
              >
                {link.label}
                <ArrowRight
                  size={20}
                  className="text-ink-subtle transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                />
              </a>
            </li>
          ))}
        </ul>

        <div
          className={`relative px-6 pt-6 sm:px-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col gap-3 transition-[opacity,transform] duration-700 delay-300 ease-[var(--ease-out-expo)] ${
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <a
            href="/checkout"
            onClick={() => setOpen(false)}
            className="btn btn-primary btn-lg w-full"
          >
            Enroll Now
            <ArrowRight size={18} className="btn-arrow" />
          </a>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openAuth("login");
            }}
            className="btn btn-secondary btn-lg w-full"
          >
            Student log in
          </button>
        </div>
      </div>

      <MobileCta hidden={open} />

      <SignInModal
        open={authOpen}
        initialTab={authTab}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
}
