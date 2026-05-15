import type { Metadata } from "next";
import { AppShell } from "../_components/app-shell";
import { Accordion } from "@/app/components/accordion";
import modulesData from "../_lib/modules_content.json";

export const metadata: Metadata = {
  title: "Modules - EliteFBA",
  description: "Your EliteFBA learning modules.",
};

export default function ModulesPage() {
  const items = modulesData.map((mod, index) => ({
    id: mod.id,
    title: mod.name,
    numeral: (index + 1).toString().padStart(2, "0"),
    body: (
      <div className="space-y-4 text-ink-muted">
        {mod.blocks.map((block, i) => {
          if (block.type === "paragraph") {
            if (block.content.trim() === "") return <div key={i} className="h-2" />;
            return <p key={i}>{block.content}</p>;
          }
          if (block.type === "heading_1") {
            return <h1 key={i} className="text-xl font-bold mt-6 mb-2 text-ink">{block.content}</h1>;
          }
          if (block.type === "heading_2") {
            return <h2 key={i} className="text-lg font-bold mt-4 mb-2 text-ink">{block.content}</h2>;
          }
          if (block.type === "heading_3") {
            return <h3 key={i} className="text-base font-bold mt-2 mb-1 text-ink">{block.content}</h3>;
          }
          if (block.type === "bulleted_list_item") {
            return <p key={i} className="pl-4 flex gap-2"><span>•</span><span>{block.content}</span></p>;
          }
          if (block.type === "numbered_list_item") {
            return <p key={i} className="pl-4 flex gap-2"><span>-</span><span>{block.content}</span></p>;
          }
          if (block.type === "quote") {
            return <blockquote key={i} className="border-l-4 border-accent pl-4 italic my-2">{block.content}</blockquote>;
          }
          if (block.type === "to_do") {
            return (
              <div key={i} className="flex items-center gap-2 pl-4">
                <input type="checkbox" disabled className="accent-accent" />
                <span>{block.content}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    ),
  }));

  return (
    <AppShell>
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 py-6 md:py-10 space-y-8">
        <div>
          <h1 className="font-display text-[2rem] md:text-[2.5rem] font-medium tracking-[-0.025em] text-ink">
            Learning Modules
          </h1>
          <p className="mt-2 text-[1rem] text-ink-muted">
            Access all course content and track your progress.
          </p>
        </div>

        <div className="rounded-2xl bg-surface hairline shadow-[var(--shadow-lift)] overflow-hidden">
          <Accordion items={items} showNumeral />
        </div>
      </div>
    </AppShell>
  );
}
