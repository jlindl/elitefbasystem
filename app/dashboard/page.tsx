import type { Metadata } from "next";
import { AiPartnerCard } from "./_components/ai-partner-card";
import { AppShell } from "./_components/app-shell";
import { MentorshipCard } from "./_components/mentorship-card";
import { TeamPanel } from "./_components/team-panel";
import { ToolsRow } from "./_components/tools-row";
import { UpNextCard } from "./_components/up-next-card";
import { WelcomeCard } from "./_components/welcome-card";

export const metadata: Metadata = {
  title: "Dashboard - EliteFBA",
  description: "Your EliteFBA mentorship dashboard.",
};

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 py-6 md:py-10 space-y-8">
        <WelcomeCard />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          <UpNextCard />
          <MentorshipCard />
        </div>

        <AiPartnerCard />

        <ToolsRow />

        <TeamPanel />

        <div className="text-center mt-16 mb-8">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-ink-subtle">
            EliteFBA · Mentorship Member · You&rsquo;re in good hands
          </p>
        </div>
      </div>
    </AppShell>
  );
}
