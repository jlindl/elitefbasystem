import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "../_components/app-shell";
import { getCurrentStudent } from "../_lib/get-student";
import { signOut } from "../_lib/auth-actions";

export const metadata: Metadata = {
  title: "Account - EliteFBA",
  description: "Manage your EliteFBA account.",
};

export default async function AccountPage() {
  const student = await getCurrentStudent();

  return (
    <AppShell student={student}>
      <div className="max-w-[760px] mx-auto px-4 md:px-10 py-6 md:py-10 space-y-8">
        <div>
          <h1 className="font-display text-[2rem] md:text-[2.5rem] font-medium tracking-[-0.025em] text-ink">
            Account
          </h1>
          <p className="mt-2 text-[1rem] text-ink-muted">
            Your EliteFBA membership details.
          </p>
        </div>

        {/* Identity */}
        <div className="rounded-2xl border border-line bg-surface p-6 md:p-7">
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent text-[1.1rem] font-medium"
            >
              {student.initials}
            </span>
            <div className="min-w-0">
              <p className="font-display text-[1.25rem] font-medium tracking-[-0.01em] text-ink truncate">
                {student.fullName}
              </p>
              <p className="text-[0.9rem] text-ink-muted truncate">
                {student.email}
              </p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6">
            <div>
              <dt className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-ink-subtle">
                Plan
              </dt>
              <dd className="mt-1 text-[0.95rem] text-ink">{student.plan}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-ink-subtle">
                Access
              </dt>
              <dd className="mt-1 text-[0.95rem] text-ink">
                {student.hasAccess ? "Active" : "Full Plan"}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-ink-subtle">
                Email
              </dt>
              <dd className="mt-1 text-[0.95rem] text-ink break-all">
                {student.email}
              </dd>
            </div>
          </dl>
        </div>

        {/* Support */}
        <div className="rounded-2xl border border-line bg-surface p-6 md:p-7">
          <h2 className="font-display text-[1.05rem] font-medium tracking-[-0.01em] text-ink">
            Need to change something?
          </h2>
          <p className="mt-2 text-[0.9rem] text-ink-muted leading-[1.55]">
            To update your details, billing, or membership, head to{" "}
            <Link href="/dashboard/help" className="text-accent hover:text-accent-deep underline">
              Help
            </Link>{" "}
            and message Jakub directly, and he&rsquo;ll sort it for you.
          </p>
        </div>

        {/* Sign out */}
        <form action={signOut}>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl border border-line bg-surface px-5 py-3 text-[0.9rem] font-medium text-ink hover:bg-surface-alt hover:border-ink/20 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Sign out
          </button>
        </form>
      </div>
    </AppShell>
  );
}
