"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Award,
  BookOpen,
  Trophy,
  Truck,
  Home,
  LayoutGrid,
  Library,
  MessageCircle,
  MoreHorizontal,
  Package,
  Search,
  Target,
  Users,
  Wrench,
  X,
} from "@/app/components/icons";
import { SmoothScroll } from "@/app/components/smooth-scroll";
import type { SearchItem } from "../_lib/course";
import type { Student } from "../_lib/get-student";
import { parseSeen } from "../_lib/changelog";
import { lockScroll } from "../_lib/scroll-lock";
import { usePrefCookie } from "../_lib/use-pref-cookie";
import { COOKIES } from "../_lib/welcome";
import { CommandPalette } from "./command-palette";
import { SkipLink } from "./skip-link";

export type ShellSummary = {
  percent: number;
  lessonsDone: number;
  lessonsTotal: number;
  xp: number;
  levelName: string;
  levelEmoji: string;
  streak: number;
  badges: number;
  badgesTotal: number;
  certificates: number;
  certificatesTotal: number;
  /** Ids of What's new entries this member hadn't seen when the page was rendered. */
  newsUnseen: string[];
  nextHref: string;
};

type Icon = (props: { size?: number; className?: string }) => React.ReactElement;
type NavItem = { label: string; href: string; Icon: Icon; badge?: string; external?: boolean };

const WHATSAPP = "https://wa.me/447765977085";

function useNav(summary: ShellSummary): { title: string; items: NavItem[] }[] {
  return [
    {
      title: "Learn",
      items: [
        { label: "Dashboard", href: "/dashboard", Icon: LayoutGrid },
        { label: "Modules", href: "/dashboard/modules", Icon: BookOpen, badge: `${summary.percent}%` },
        { label: "Missions", href: "/dashboard/missions", Icon: Target, badge: `${summary.badges}/${summary.badgesTotal}` },
        { label: "Certificates", href: "/dashboard/certificates", Icon: Award, badge: `${summary.certificates}/${summary.certificatesTotal}` },
      ],
    },
    {
      title: "Toolkit",
      items: [
        { label: "My Tools", href: "/dashboard/tools", Icon: Wrench },
        { label: "Dictionary", href: "/dashboard/tools/dictionary", Icon: Library },
        { label: "Suppliers", href: "/dashboard/tools/suppliers", Icon: Package },
        { label: "Supplies", href: "/dashboard/tools/supplies", Icon: Truck },
      ],
    },
    {
      title: "Community",
      items: [
        { label: "Wins wall", href: "/dashboard/wins", Icon: Trophy },
        { label: "The Team", href: "/dashboard/team", Icon: Users, badge: "Soon" },
        { label: "Message Jakub", href: WHATSAPP, Icon: MessageCircle, external: true },
      ],
    },
  ];
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  if (href === "/dashboard/tools") return pathname === "/dashboard/tools" || pathname === "/dashboard/tools/links";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/* ------------------------------------------------------------------ */

export function ShellFrame({
  children,
  student,
  summary,
  index,
}: {
  children: ReactNode;
  student: Student;
  summary: ShellSummary;
  index: SearchItem[];
}) {
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const nav = useNav(summary);
  const moreButton = useRef<HTMLButtonElement>(null);
  const closeMenuButton = useRef<HTMLButtonElement>(null);
  const searchOpen = useRef(false);
  const searchOpener = useRef<HTMLElement | null>(null);
  const backToMore = useRef(false);
  // Search and the phone drawer are modal: everything behind them is inert while open.
  const covered = drawer || search;

  const openSearch = useCallback(() => {
    // Remember the focus now: once the page behind goes inert the browser drops it.
    const a = document.activeElement;
    searchOpener.current = a instanceof HTMLElement && a !== document.body ? a : null;
    setDrawer(false);
    setSearch(true);
  }, []);

  const closeDrawer = useCallback(() => {
    backToMore.current = true;
    setDrawer(false);
  }, []);

  // Global shortcuts: Cmd/Ctrl+K or "/" opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.("input, textarea, [contenteditable='true']");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        // Not over another dialog (Ask Jakub, the welcome): it would open hidden behind it.
        if (document.querySelector("dialog[open]")) return;
        e.preventDefault();
        if (searchOpen.current) setSearch(false);
        else openSearch();
      }
    };
    const onOpen = () => openSearch();
    window.addEventListener("keydown", onKey);
    window.addEventListener("dash:search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("dash:search", onOpen);
    };
  }, [openSearch]);

  // When search closes, put focus back where it was. If that spot is gone or hidden
  // (search was opened from the drawer), fall back to the menu button.
  useEffect(() => {
    searchOpen.current = search;
    if (search) return;
    const target = searchOpener.current;
    searchOpener.current = null;
    if (!target) return;
    if (target.isConnected && !target.closest("[inert]") && target.getClientRects().length) target.focus({ preventScroll: true });
    else moreButton.current?.focus({ preventScroll: true });
  }, [search]);

  // Cursor spotlight for any `.spot` card (one listener for the whole app).
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    let last: PointerEvent | null = null;
    const paint = () => {
      frame = 0;
      const e = last;
      const el = (e?.target as HTMLElement | null)?.closest?.(".spot") as HTMLElement | null;
      if (!e || !el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  // The phone drawer: lock the page (shared lock, so it can't undo a dialog's), move focus
  // in, close on Escape, and close it if the screen widens to the desktop layout, where it
  // is hidden and would otherwise keep the page locked.
  useEffect(() => {
    if (!drawer) return;
    const release = lockScroll();
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = () => {
      if (desktop.matches) setDrawer(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented) closeDrawer();
    };
    desktop.addEventListener("change", onDesktop);
    window.addEventListener("keydown", onKey);
    const frame = requestAnimationFrame(() => closeMenuButton.current?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(frame);
      desktop.removeEventListener("change", onDesktop);
      window.removeEventListener("keydown", onKey);
      release();
    };
  }, [drawer, closeDrawer]);

  // A dismissed drawer hands focus back to the button that opened it (once it isn't inert).
  useEffect(() => {
    if (drawer || !backToMore.current) return;
    backToMore.current = false;
    moreButton.current?.focus({ preventScroll: true });
  }, [drawer]);

  return (
    <div className="dash-theme min-h-screen bg-bg">
      <div inert={covered}>
        <SkipLink />
      </div>
      <SmoothScroll />

      {/* Desktop sidebar */}
      <aside
        aria-label="Primary"
        inert={covered}
        className="fixed inset-y-0 left-0 z-30 hidden w-[272px] flex-col border-r border-line bg-surface lg:flex print:!hidden"
      >
        <SidebarBody nav={nav} pathname={pathname} student={student} summary={summary} onSearch={openSearch} />
      </aside>

      {/* Mobile top bar */}
      <header inert={covered} className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-bg/85 px-4 backdrop-blur-xl lg:hidden print:hidden">
        <Wordmark />
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-muted hover:bg-surface-alt hover:text-ink"
          >
            <Search size={19} />
          </button>
          <Link
            href="/dashboard/account"
            aria-label="Account"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#ffb347] text-[0.75rem] font-semibold text-white"
          >
            {student.initials}
          </Link>
        </div>
      </header>

      <div inert={covered} className="lg:pl-[272px] print:!pl-0">
        <main id="main" tabIndex={-1} className="pb-28 outline-none lg:pb-0">{children}</main>
      </div>

      {/* Mobile bottom tabs */}
      <nav
        aria-label="Quick navigation"
        inert={covered}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden print:hidden"
      >
        <ul className="mx-auto grid max-w-[520px] grid-cols-5">
          {[
            { label: "Home", href: "/dashboard", Icon: Home },
            { label: "Modules", href: "/dashboard/modules", Icon: BookOpen },
            { label: "Missions", href: "/dashboard/missions", Icon: Target },
            { label: "Tools", href: "/dashboard/tools", Icon: Wrench },
          ].map(({ label, href, Icon }) => {
            // Bottom tabs group sub-pages under their section (e.g. Suppliers under Tools).
            const on = href === "/dashboard" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={on ? "page" : undefined}
                  className={`flex h-16 flex-col items-center justify-center gap-1 text-[0.68rem] font-medium transition-colors ${
                    on ? "text-accent" : "text-ink-subtle"
                  }`}
                >
                  <span className={`inline-flex h-8 w-12 items-center justify-center rounded-full transition-colors ${on ? "bg-accent-soft" : ""}`}>
                    <Icon size={20} />
                  </span>
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              ref={moreButton}
              type="button"
              onClick={() => setDrawer(true)}
              aria-expanded={drawer}
              aria-controls="dash-drawer"
              className="flex h-16 w-full flex-col items-center justify-center gap-1 text-[0.68rem] font-medium text-ink-subtle"
            >
              <span className="inline-flex h-8 w-12 items-center justify-center rounded-full">
                <MoreHorizontal size={20} />
              </span>
              More
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          drawer ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
        aria-hidden
      />
      <aside
        id="dash-drawer"
        aria-label="Menu"
        inert={!drawer || search}
        className={`fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-[320px] flex-col bg-surface shadow-2xl transition-transform duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
          drawer ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          ref={closeMenuButton}
          type="button"
          onClick={closeDrawer}
          aria-label="Close menu"
          className="absolute right-3 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-alt"
        >
          <X size={18} />
        </button>
        <SidebarBody nav={nav} pathname={pathname} student={student} summary={summary} onSearch={openSearch} onNavigate={() => setDrawer(false)} />
      </aside>

      <CommandPalette open={search} onClose={() => setSearch(false)} items={index} />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Wordmark() {
  return (
    <Link href="/dashboard" className="inline-flex items-center font-display text-[1.125rem] font-semibold tracking-[-0.02em] text-ink">
      EliteFBA
      <span aria-hidden className="ml-[3px] inline-block h-1.5 w-1.5 translate-y-[6px] rounded-full bg-accent" />
    </Link>
  );
}

function SidebarBody({
  nav,
  pathname,
  student,
  summary,
  onSearch,
  onNavigate,
}: {
  nav: { title: string; items: NavItem[] }[];
  pathname: string;
  student: Student;
  summary: ShellSummary;
  onSearch: () => void;
  onNavigate?: () => void;
}) {
  // Follows the seen cookie live, so the dot clears as soon as the updates are read.
  const seenNews = parseSeen(usePrefCookie(COOKIES.newsSeen));
  const newsUnseen = summary.newsUnseen.filter((id) => !seenNews.has(id)).length;
  return (
    <div className="flex h-full flex-col" data-lenis-prevent>
      <div className="flex items-center gap-2 px-6 pt-5">
        <Wordmark />
        <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-orange-800">
          Members
        </span>
      </div>

      <div className="px-4 pt-4">
        <button
          type="button"
          onClick={onSearch}
          className="group flex h-11 w-full items-center gap-2.5 rounded-xl border border-line bg-bg px-3.5 text-left text-[0.875rem] text-ink-subtle transition-colors hover:border-ink/20 hover:text-ink"
        >
          <Search size={16} />
          <span className="flex-1">Search everything</span>
          <kbd className="hidden rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.65rem] text-ink-subtle lg:inline">
            ⌘K
          </kbd>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-2 pt-1" aria-label="Sections">
        {nav.map((group) => (
          <div key={group.title} className="mt-2.5">
            <p className="px-3 pb-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink-subtle">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(({ label, href, Icon, badge, external }) => {
                const on = !external && isActive(pathname, href);
                const cls = `group relative flex h-8.5 items-center gap-3 rounded-xl px-3 text-[0.9rem] transition-all duration-200 ${
                  on ? "bg-ink text-white shadow-[0_6px_16px_-8px_rgba(10,10,10,0.5)]" : "text-ink-muted hover:bg-surface-alt hover:text-ink"
                }`;
                const inner = (
                  <>
                    <Icon size={18} className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${on ? "text-accent" : ""}`} />
                    <span className="flex-1 truncate">{label}</span>
                    {badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 font-mono text-[0.6rem] font-bold tabular-nums ${
                          on ? "bg-white/15 text-white" : badge === "Soon" ? "bg-surface-alt text-ink-muted" : "bg-accent-soft text-orange-800"
                        }`}
                      >
                        {badge}
                      </span>
                    )}
                    {external && <span aria-hidden className="text-[0.75rem] text-ink-subtle">↗</span>}
                  </>
                );
                return (
                  <li key={label}>
                    {external ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onNavigate}>
                        {inner}
                      </a>
                    ) : (
                      <Link href={href} className={cls} aria-current={on ? "page" : undefined} onClick={onNavigate}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Progress widget */}
      <div className="px-4">
        <Link
          href="/dashboard/missions"
          onClick={onNavigate}
          className="spot spot-dark group block overflow-hidden rounded-2xl bg-ink p-3.5 text-white transition-transform duration-300 hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white/50">Your progress</p>
            <p className="font-display text-[0.95rem] font-semibold tabular-nums text-accent">{summary.percent}%</p>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="bar-grow h-full rounded-full bg-gradient-to-r from-accent to-[#ffb347]" style={{ width: `${summary.percent}%` }} />
          </div>
          <p className="mt-2 text-[0.75rem] text-white/60 tabular-nums">
            {summary.lessonsDone} of {summary.lessonsTotal} lessons
          </p>
          <div className="mt-2.5 flex items-center gap-2 border-t border-white/10 pt-2.5 text-[0.78rem]">
            <span className="rounded-full bg-white/10 px-2 py-0.5 tabular-nums">
              {summary.levelEmoji} {summary.levelName}
            </span>
            <span className="tabular-nums text-white/70">⚡ {summary.xp}</span>
            <span className="ml-auto tabular-nums text-white/70">
              {summary.streak > 0 ? "🔥" : "🪵"} {summary.streak}
            </span>
          </div>
        </Link>
      </div>

      <div className="mt-3 border-t border-line p-3">
        <Link
          href="/dashboard/account"
          onClick={onNavigate}
          className={`flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface-alt ${
            isActive(pathname, "/dashboard/account") ? "bg-surface-alt" : ""
          }`}
        >
          <span aria-hidden className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#ffb347] text-[0.85rem] font-semibold text-white">
            {student.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[0.9rem] font-medium text-ink">{student.fullName}</span>
            <span className="block truncate font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-subtle">{student.plan}</span>
          </span>
        </Link>
        <div className="mt-1 flex gap-1 px-1">
          {[
            { label: "Help", href: "/dashboard/help" },
            { label: "What's new", href: "/dashboard/whats-new", dot: newsUnseen > 0 },
            { label: "Website", href: "/" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onNavigate}
              aria-current={isActive(pathname, l.href) && l.href !== "/" ? "page" : undefined}
              className="relative inline-flex flex-auto items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-1.5 py-1.5 text-center text-[0.8125rem] text-ink-muted transition-colors hover:bg-surface-alt hover:text-ink"
            >
              {l.label}
              {"dot" in l && l.dot && (
                <span className="inline-flex h-2 w-2 rounded-full bg-[#c2410c]">
                  <span className="sr-only">: {newsUnseen} new</span>
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
