"use client";

import { useState, type ReactNode } from "react";
import { Menu } from "@/app/components/icons";
import { Sidebar } from "./sidebar";
import type { Student } from "../_lib/get-student";

export function AppShell({
  children,
  student,
}: {
  children: ReactNode;
  student: Student;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar open={open} onClose={() => setOpen(false)} student={student} />

      <div className="flex-1 md:ml-[240px]">
        {/* mobile top bar */}
        <header className="md:hidden sticky top-0 z-20 flex h-14 items-center justify-between px-4 bg-bg/85 backdrop-blur-md border-b border-line">
          <span className="font-display text-[1rem] font-semibold tracking-[-0.02em] inline-flex items-center">
            EliteFBA
            <span
              aria-hidden
              className="ml-[3px] inline-block h-1.5 w-1.5 rounded-full bg-accent translate-y-[5px]"
            />
          </span>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:text-ink hover:bg-surface-alt"
          >
            <Menu size={20} />
          </button>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
