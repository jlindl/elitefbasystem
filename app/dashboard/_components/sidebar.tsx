"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronUp,
  LayoutGrid,
  Library,
  MessageCircle,
  Users,
  Wrench,
  X,
} from "@/app/components/icons";
import type { Student } from "../_lib/get-student";

type NavItem = {
  label: string;
  href: string;
  Icon: (props: { size?: number; className?: string }) => React.ReactElement;
};

const primary: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", Icon: LayoutGrid },
  { label: "Modules", href: "/dashboard/modules", Icon: BookOpen },
  { label: "My Tools", href: "#", Icon: Wrench },
  { label: "AI Partner", href: "/dashboard#ai-partner", Icon: MessageCircle },
  { label: "The Team", href: "#", Icon: Users },
  { label: "Resources", href: "#", Icon: Library },
];

const secondary = [
  { label: "Account", href: "#" },
  { label: "Help", href: "#" },
];

export function Sidebar({
  open,
  onClose,
  student,
}: {
  open: boolean;
  onClose: () => void;
  student: Student;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* mobile backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={`md:hidden fixed inset-0 z-30 bg-ink/40 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        aria-label="Primary"
        className={`fixed inset-y-0 left-0 z-40 w-[260px] md:w-[240px] bg-surface border-r border-line flex flex-col transition-transform duration-200 ease-out md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* wordmark */}
        <div className="px-6 py-6 border-b border-line flex items-center justify-between">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="font-display text-[1.125rem] font-semibold tracking-[-0.02em] text-ink inline-flex items-center"
          >
            EliteFBA
            <span
              aria-hidden
              className="ml-[3px] inline-block h-1.5 w-1.5 rounded-full bg-accent translate-y-[6px]"
            />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-surface-alt"
          >
            <X size={16} />
          </button>
        </div>

        {/* primary nav */}
        <nav className="px-3 py-4">
          <ul className="space-y-0.5">
            {primary.map(({ label, href, Icon }) => {
              const active = pathname === href;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`relative flex items-center gap-3 h-9 px-3 rounded-md text-[0.875rem] transition-colors duration-150 ${
                      active
                        ? "bg-surface-alt text-ink"
                        : "text-ink-subtle hover:text-ink hover:bg-surface-alt/60"
                    }`}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className="absolute -left-3 top-1.5 bottom-1.5 w-[2px] rounded-full bg-accent"
                      />
                    )}
                    <Icon size={18} className="shrink-0" />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mx-3 border-t border-line" />

        {/* secondary nav */}
        <nav className="px-3 py-4">
          <ul className="space-y-0.5">
            {secondary.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onClose}
                  className="flex items-center h-9 px-3 rounded-md text-[0.875rem] text-ink-subtle hover:text-ink hover:bg-surface-alt/60 transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto" />
        <div className="mx-3 border-t border-line" />

        {/* user identity */}
        <button
          type="button"
          className="m-3 flex items-center gap-3 rounded-lg p-2 text-left hover:bg-surface-alt/60 transition-colors duration-150"
        >
          <span
            aria-hidden
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent text-[0.85rem] font-medium"
          >
            {student.initials}
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[0.875rem] font-medium text-ink truncate">
              {student.fullName}
            </span>
            <span className="block font-mono text-[0.65rem] tracking-[0.08em] uppercase text-ink-subtle truncate">
              {student.plan}
            </span>
          </span>
          <ChevronUp size={16} className="text-ink-subtle shrink-0" />
        </button>
      </aside>
    </>
  );
}
