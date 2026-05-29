import type { Metadata } from "next";
import { AppShell } from "../_components/app-shell";
import { Accordion } from "@/app/components/accordion";
import { WorkflowDiagram } from "../_components/workflow-diagram";
import { PrimeComparison } from "../_components/prime-comparison";
import { AutomationTimeline } from "../_components/automation-timeline";
import { CustomerServiceFlow } from "../_components/customer-service-flow";
import { PillarShowcase } from "../_components/pillar-showcase";
import { FeeCalculator } from "../_components/fee-calculator";
import { CaseStudy } from "../_components/case-study";
import { UnitEconomics } from "../_components/unit-economics";
import { ModuleSections } from "../_components/module-sections";
import { AccountSafety } from "../_components/account-safety";
import { ModuleTabs } from "../_components/module-tabs";
import modulesData from "../_lib/modules_content.json";

export const metadata: Metadata = {
  title: "Modules - EliteFBA",
  description: "Your EliteFBA learning modules.",
};

function renderBlock(block: any, i: number) {
  if (block.type === "paragraph") {
    if (block.content.trim() === "") return <div key={i} className="h-4" />;
    return <p key={i} className="text-ink leading-relaxed">{block.content}</p>;
  }
  if (block.type === "heading_1") {
    return (
      <div key={i} className="pt-8 pb-4 border-b-2 border-slate-200">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-ink">{block.content}</h1>
      </div>
    );
  }
  if (block.type === "heading_2") {
    return (
      <div key={i} className="pt-6 pb-3 mt-4 bg-slate-50 px-4 py-3 rounded-lg border-l-4 border-accent">
        <h2 className="text-xl font-bold text-ink">{block.content}</h2>
      </div>
    );
  }
  if (block.type === "heading_3") {
    return <h3 key={i} className="text-lg font-bold mt-4 mb-2 text-ink flex items-center gap-2"><span>▸</span>{block.content}</h3>;
  }
  if (block.type === "bulleted_list_item") {
    return <p key={i} className="pl-6 flex gap-3 text-ink"><span className="flex-shrink-0 mt-1">•</span><span>{block.content}</span></p>;
  }
  if (block.type === "numbered_list_item") {
    return <p key={i} className="pl-6 flex gap-3 text-ink"><span className="flex-shrink-0">→</span><span>{block.content}</span></p>;
  }
  if (block.type === "quote") {
    return <blockquote key={i} className="border-l-4 border-accent pl-4 italic my-4 py-2 bg-slate-50 text-ink-muted rounded">{block.content}</blockquote>;
  }
  if (block.type === "video") {
    return (
      <div key={i} className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-black/5 border border-black/10 flex items-center justify-center my-6 group cursor-pointer shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
          <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </div>
        <div className="absolute bottom-4 left-4 text-white font-medium drop-shadow-md">
          {block.content}
        </div>
      </div>
    );
  }
  if (block.type === "image") {
    return (
      <div key={i} className="my-6 rounded-xl overflow-hidden border border-black/5 shadow-sm bg-white p-2">
        <img src={block.content} alt="Module Diagram" className="w-full h-auto rounded-lg" />
      </div>
    );
  }
  if (block.type === "callout") {
    return (
      <div key={i} className="my-6 p-5 rounded-xl bg-blue-50 border-2 border-blue-200 text-blue-900">
        <p className="font-medium text-[0.95rem] leading-relaxed flex gap-3">
          <span className="flex-shrink-0">⚠️</span>
          <span>{block.content}</span>
        </p>
      </div>
    );
  }
  if (block.type === "to_do") {
    return (
      <div key={i} className="flex items-center gap-3 pl-4 my-2 p-3 rounded-lg bg-black/5 border border-black/5 hover:bg-black/10 transition-colors duration-200 cursor-pointer group">
        <input type="checkbox" disabled className="accent-accent w-4 h-4 rounded transition-transform duration-200 group-hover:scale-110" />
        <span className="font-medium">{block.content}</span>
      </div>
    );
  }
  if (block.type === "workflow_diagram") {
    return <WorkflowDiagram key={i} />;
  }
  if (block.type === "prime_comparison") {
    return <PrimeComparison key={i} />;
  }
  if (block.type === "automation_timeline") {
    return <AutomationTimeline key={i} />;
  }
  if (block.type === "customer_service_flow") {
    return <CustomerServiceFlow key={i} />;
  }
  if (block.type === "pillar_showcase") {
    return <PillarShowcase key={i} />;
  }
  if (block.type === "fee_calculator") {
    return <FeeCalculator key={i} />;
  }
  if (block.type === "case_study") {
    return <CaseStudy key={i} />;
  }
  if (block.type === "unit_economics") {
    return <UnitEconomics key={i} />;
  }
  if (block.type === "module_sections") {
    return <ModuleSections key={i} />;
  }
  if (block.type === "account_safety") {
    return <AccountSafety key={i} />;
  }
  return null;
}

function groupBlocksIntoTabs(blocks: any[]) {
  const tabs = [];
  let tab1 = []; // The Basics of Amazon FBA - up to How the Infrastructure Works
  let tab2 = []; // How the Infrastructure Works - up to The Cost of Using Amazon's Machine
  let tab3 = []; // The Cost of Using Amazon's Machine - up to Account Safety
  let tab4 = []; // Account Safety & Compliance

  let currentSection = 1;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const content = block.content || "";

    // Determine which tab this block belongs to
    if (block.type === "heading_2") {
      if (content.includes("How the Infrastructure Works")) {
        currentSection = 2;
      } else if (content.includes("The Cost of Using Amazon's Machine")) {
        currentSection = 3;
      }
    } else if (block.type === "account_safety") {
      currentSection = 4;
    }

    // Add block to appropriate tab
    if (currentSection === 1) {
      tab1.push(block);
    } else if (currentSection === 2) {
      tab2.push(block);
    } else if (currentSection === 3) {
      tab3.push(block);
    } else if (currentSection === 4) {
      tab4.push(block);
    }
  }

  // Build tabs array
  if (tab1.length > 0) {
    tabs.push({
      id: "basics",
      label: "The Basics of Amazon FBA",
      icon: "📖",
      blocks: tab1,
    });
  }

  if (tab2.length > 0) {
    tabs.push({
      id: "infrastructure",
      label: "How the Infrastructure Works",
      icon: "⚙️",
      blocks: tab2,
    });
  }

  if (tab3.length > 0) {
    tabs.push({
      id: "operations",
      label: "Cost & Operations",
      icon: "💰",
      blocks: tab3,
    });
  }

  if (tab4.length > 0) {
    tabs.push({
      id: "safety",
      label: "Account Safety & Compliance",
      icon: "🔐",
      blocks: tab4,
    });
  }

  return tabs;
}

export default function ModulesPage() {
  const items = modulesData.map((mod, index) => {
    const tabs = groupBlocksIntoTabs(mod.blocks);

    return {
      id: mod.id,
      title: mod.name,
      numeral: (index + 1).toString().padStart(2, "0"),
      body: (
        <ModuleTabs
          tabs={tabs.map((tab) => ({
            id: tab.id,
            label: tab.label,
            icon: tab.icon,
            content: (
              <div className="space-y-6 text-ink-muted">
                {tab.blocks.map((block, i) => renderBlock(block, i))}
              </div>
            ),
          }))}
        />
      ),
    };
  });

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
