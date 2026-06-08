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
import { SplitWorkDiagram } from "../_components/split-work-diagram";
import { PrimeBadgeBenefits } from "../_components/prime-badge-benefits";
import { ProfitCalculator } from "../_components/profit-calculator";
import { LeanFrameworkStepper } from "../_components/lean-framework-stepper";
import { InfrastructureStepper } from "../_components/infrastructure-stepper";
import { InventoryStatusBoard } from "../_components/inventory-status-board";
import { FulfilmentTimeline } from "../_components/fulfilment-timeline";
import { CustomerInquiryFlow } from "../_components/customer-inquiry-flow";
import { PrimeStatsCard } from "../_components/prime-stats-card";
import { BadgeEligibilityPath } from "../_components/badge-eligibility-path";
import { FeeBreakdownDiagram } from "../_components/fee-breakdown-diagram";
import { SizeTierLadder } from "../_components/size-tier-ladder";
import { BundleScenarios } from "../_components/bundle-scenarios";
import { ThreeLeversFramework } from "../_components/three-levers-framework";
import { EconomicsTargets } from "../_components/economics-targets";
import { CompoundingProjection } from "../_components/compounding-projection";
import { PreflightChecklist } from "../_components/preflight-checklist";
import { PlanComparison } from "../_components/plan-comparison";
import { RegistrationWizard } from "../_components/registration-wizard";
import { ApprovalPitfalls } from "../_components/approval-pitfalls";
import { SellerCentralTour } from "../_components/seller-central-tour";
import { AccountHealthSetup } from "../_components/account-health-setup";
import { BundleCandidateGate } from "../_components/bundle-candidate-gate";
import { HuntingGrounds } from "../_components/hunting-grounds";
import { AmazonValidator } from "../_components/amazon-validator";
import { Helium10Walkthrough } from "../_components/helium10-walkthrough";
import { BundleScorecard } from "../_components/bundle-scorecard";
import { WholesaleOutreach } from "../_components/wholesale-outreach";
import { ListingAnatomy } from "../_components/listing-anatomy";
import { GtinStepper } from "../_components/gtin-stepper";
import { AiPromptTemplates } from "../_components/ai-prompt-templates";
import { HtmlConversionDemo } from "../_components/html-conversion-demo";
import { ListingImagesGuide } from "../_components/listing-images-guide";
import { ListingFormWalkthrough } from "../_components/listing-form-walkthrough";
import { MeasurementDiagram } from "../_components/measurement-diagram";
import { BundlePrepChecklist } from "../_components/bundle-prep-checklist";
import { PolybagRequirements } from "../_components/polybag-requirements";
import { BoxSpecCard } from "../_components/box-spec-card";
import { ShipmentWizard } from "../_components/shipment-wizard";
import { LabelTypes } from "../_components/label-types";
import { DeliveryTimeline } from "../_components/delivery-timeline";

export type Block = {
  type: string;
  content?: string;
  src?: string;
  // lesson_marker metadata fields. A lesson_marker block does not render any
  // content; it only signals where a new lesson tab begins inside the JSON
  // and carries the tab's card-level metadata.
  tabId?: string;
  label?: string;
  icon?: string;
  description?: string;
  color?: TabColor;
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function extractTocHeadings(blocks: Block[]): { id: string; label: string }[] {
  const out: { id: string; label: string }[] = [];
  const seen = new Set<string>();
  for (const b of blocks) {
    if (b.type !== "heading_2" || !b.content) continue;
    let id = slugify(b.content);
    if (!id) continue;
    let suffix = 1;
    while (seen.has(id)) {
      suffix += 1;
      id = `${slugify(b.content)}-${suffix}`;
    }
    seen.add(id);
    out.push({ id, label: b.content });
  }
  return out;
}

export type TabColor =
  | "blue"
  | "purple"
  | "amber"
  | "lime"
  | "rose"
  | "cyan";

export type Tab = {
  id: string;
  label: string;
  icon: string;
  description?: string;
  color?: TabColor;
  blocks: Block[];
};

// Render a list of blocks while assigning heading_2 elements the same unique,
// de-duplicated ids that extractTocHeadings produces, so Table of Contents
// anchor links resolve even when two headings share the same text.
export function renderBlocks(blocks: Block[]) {
  const seen = new Set<string>();
  return blocks.map((block, i) => {
    if (block.type === "heading_2" && block.content) {
      let id = slugify(block.content);
      if (id) {
        let suffix = 1;
        while (seen.has(id)) {
          suffix += 1;
          id = `${slugify(block.content)}-${suffix}`;
        }
        seen.add(id);
        return renderBlock(block, i, id);
      }
    }
    return renderBlock(block, i);
  });
}

export function renderBlock(block: Block, i: number, idOverride?: string) {
  if (block.type === "paragraph") {
    if (!block.content || block.content.trim() === "")
      return <div key={i} className="h-4" />;
    return (
      <p key={i} className="text-ink leading-relaxed">
        {block.content}
      </p>
    );
  }
  if (block.type === "heading_1") {
    return (
      <div key={i} className="pt-8 pb-4 border-b-2 border-slate-200">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-ink">
          {block.content}
        </h1>
      </div>
    );
  }
  if (block.type === "heading_2") {
    const id = idOverride ?? (block.content ? slugify(block.content) : undefined);
    return (
      <div
        key={i}
        id={id}
        className="pt-6 pb-3 mt-4 bg-slate-50 px-4 py-3 rounded-lg border-l-4 border-accent scroll-mt-24"
      >
        <h2 className="text-xl font-bold text-ink">{block.content}</h2>
      </div>
    );
  }
  if (block.type === "heading_3") {
    const id = block.content ? slugify(block.content) : undefined;
    return (
      <h3
        key={i}
        id={id}
        className="text-lg font-bold mt-4 mb-2 text-ink flex items-center gap-2 scroll-mt-24"
      >
        <span>▸</span>
        {block.content}
      </h3>
    );
  }
  if (block.type === "bulleted_list_item") {
    return (
      <p key={i} className="pl-6 flex gap-3 text-ink">
        <span className="flex-shrink-0 mt-1">•</span>
        <span>{block.content}</span>
      </p>
    );
  }
  if (block.type === "numbered_list_item") {
    return (
      <p key={i} className="pl-6 flex gap-3 text-ink">
        <span className="flex-shrink-0">→</span>
        <span>{block.content}</span>
      </p>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote
        key={i}
        className="border-l-4 border-accent pl-4 italic my-4 py-2 bg-slate-50 text-ink-muted rounded"
      >
        {block.content}
      </blockquote>
    );
  }
  if (block.type === "video") {
    if (block.src) {
      return (
        <div
          key={i}
          className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-black my-6 shadow-inner"
        >
          <video
            src={block.src}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      );
    }
    return (
      <div
        key={i}
        className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-black/5 border border-black/10 flex items-center justify-center my-6 group cursor-pointer shadow-inner"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
          <svg
            className="w-8 h-8 text-black ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div className="absolute bottom-4 left-4 text-white font-medium drop-shadow-md">
          {block.content}
        </div>
      </div>
    );
  }
  if (block.type === "image") {
    const src = block.src ?? block.content ?? "";
    const caption = block.src ? block.content : undefined;
    return (
      <figure
        key={i}
        className="my-6 rounded-xl overflow-hidden border border-black/5 shadow-sm bg-white p-2"
      >
        <img
          src={src}
          alt={block.label ?? "Module image"}
          className="w-full h-auto rounded-lg"
        />
        {caption && (
          <figcaption className="px-3 py-3 text-[0.85rem] text-ink-muted leading-relaxed italic text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }
  if (block.type === "external_link") {
    const href = block.src ?? "";
    return (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="my-6 flex items-center justify-between gap-4 rounded-xl border-2 border-violet-300 bg-violet-50 px-5 py-4 transition-colors duration-150 hover:bg-violet-100 hover:border-violet-400 no-underline"
      >
        <div className="min-w-0 flex-1">
          <p className="font-display font-bold text-[0.95rem] text-violet-900 leading-tight">
            {block.label ?? "Open link"}
          </p>
          <p className="font-mono text-[0.7rem] text-violet-700 leading-tight mt-1 truncate">
            {href}
          </p>
          {block.description && (
            <p className="text-[0.8rem] text-violet-800 leading-snug mt-1.5">
              {block.description}
            </p>
          )}
        </div>
        <span
          className="text-violet-600 text-xl flex-shrink-0"
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
    );
  }
  if (block.type === "callout") {
    return (
      <div
        key={i}
        className="my-6 p-5 rounded-xl bg-blue-50 border-2 border-blue-200 text-blue-900"
      >
        <p className="font-medium text-[0.95rem] leading-relaxed flex gap-3">
          <span className="flex-shrink-0">⚠️</span>
          <span>{block.content}</span>
        </p>
      </div>
    );
  }
  if (block.type === "to_do") {
    return (
      <div
        key={i}
        className="flex items-center gap-3 pl-4 my-2 p-3 rounded-lg bg-black/5 border border-black/5 hover:bg-black/10 transition-colors duration-200 cursor-pointer group"
      >
        <input
          type="checkbox"
          disabled
          className="accent-accent w-4 h-4 rounded transition-transform duration-200 group-hover:scale-110"
        />
        <span className="font-medium">{block.content}</span>
      </div>
    );
  }
  if (block.type === "workflow_diagram") return <WorkflowDiagram key={i} />;
  if (block.type === "prime_comparison") return <PrimeComparison key={i} />;
  if (block.type === "automation_timeline") return <AutomationTimeline key={i} />;
  if (block.type === "customer_service_flow")
    return <CustomerServiceFlow key={i} />;
  if (block.type === "pillar_showcase") return <PillarShowcase key={i} />;
  if (block.type === "fee_calculator") return <FeeCalculator key={i} />;
  if (block.type === "case_study") return <CaseStudy key={i} />;
  if (block.type === "unit_economics") return <UnitEconomics key={i} />;
  if (block.type === "module_sections") return <ModuleSections key={i} />;
  if (block.type === "account_safety") return <AccountSafety key={i} />;
  if (block.type === "split_work_diagram") return <SplitWorkDiagram key={i} />;
  if (block.type === "prime_badge_benefits") return <PrimeBadgeBenefits key={i} />;
  if (block.type === "profit_calculator") return <ProfitCalculator key={i} />;
  if (block.type === "lean_framework_stepper") return <LeanFrameworkStepper key={i} />;
  if (block.type === "infrastructure_stepper") return <InfrastructureStepper key={i} />;
  if (block.type === "inventory_status_board") return <InventoryStatusBoard key={i} />;
  if (block.type === "fulfilment_timeline") return <FulfilmentTimeline key={i} />;
  if (block.type === "customer_inquiry_flow") return <CustomerInquiryFlow key={i} />;
  if (block.type === "prime_stats_card") return <PrimeStatsCard key={i} />;
  if (block.type === "badge_eligibility_path") return <BadgeEligibilityPath key={i} />;
  if (block.type === "fee_breakdown_diagram") return <FeeBreakdownDiagram key={i} />;
  if (block.type === "size_tier_ladder") return <SizeTierLadder key={i} />;
  if (block.type === "bundle_scenarios") return <BundleScenarios key={i} />;
  if (block.type === "three_levers_framework") return <ThreeLeversFramework key={i} />;
  if (block.type === "economics_targets") return <EconomicsTargets key={i} />;
  if (block.type === "compounding_projection") return <CompoundingProjection key={i} />;
  if (block.type === "preflight_checklist") return <PreflightChecklist key={i} />;
  if (block.type === "plan_comparison") return <PlanComparison key={i} />;
  if (block.type === "registration_wizard") return <RegistrationWizard key={i} />;
  if (block.type === "approval_pitfalls") return <ApprovalPitfalls key={i} />;
  if (block.type === "seller_central_tour") return <SellerCentralTour key={i} />;
  if (block.type === "account_health_setup") return <AccountHealthSetup key={i} />;
  if (block.type === "bundle_candidate_gate") return <BundleCandidateGate key={i} />;
  if (block.type === "hunting_grounds") return <HuntingGrounds key={i} />;
  if (block.type === "amazon_validator") return <AmazonValidator key={i} />;
  if (block.type === "helium10_walkthrough") return <Helium10Walkthrough key={i} />;
  if (block.type === "bundle_scorecard") return <BundleScorecard key={i} />;
  if (block.type === "wholesale_outreach") return <WholesaleOutreach key={i} />;
  if (block.type === "listing_anatomy") return <ListingAnatomy key={i} />;
  if (block.type === "gtin_stepper") return <GtinStepper key={i} />;
  if (block.type === "ai_prompt_templates") return <AiPromptTemplates key={i} />;
  if (block.type === "html_conversion_demo") return <HtmlConversionDemo key={i} />;
  if (block.type === "listing_images_guide") return <ListingImagesGuide key={i} />;
  if (block.type === "listing_form_walkthrough") return <ListingFormWalkthrough key={i} />;
  if (block.type === "measurement_diagram") return <MeasurementDiagram key={i} />;
  if (block.type === "bundle_prep_checklist") return <BundlePrepChecklist key={i} />;
  if (block.type === "polybag_requirements") return <PolybagRequirements key={i} />;
  if (block.type === "box_spec_card") return <BoxSpecCard key={i} />;
  if (block.type === "shipment_wizard") return <ShipmentWizard key={i} />;
  if (block.type === "label_types") return <LabelTypes key={i} />;
  if (block.type === "delivery_timeline") return <DeliveryTimeline key={i} />;
  // lesson_marker is metadata for tab grouping; never renders any UI itself.
  if (block.type === "lesson_marker") return null;
  return null;
}

type BucketId =
  | "basics"
  | "infrastructure"
  | "prime"
  | "fees"
  | "case_study"
  | "unit_economics";

const TAB_META: Record<
  BucketId,
  { label: string; icon: string; description: string; color: TabColor }
> = {
  basics: {
    label: "The Basics of Amazon FBA",
    icon: "📦",
    description:
      "Understand how Fulfillment by Amazon eliminates the physical burden of running an online shop.",
    color: "blue",
  },
  infrastructure: {
    label: "How the Infrastructure Works",
    icon: "⚙️",
    description:
      "Deep dive into storage, the Prime badge, trust, visibility, pricing freedom, and full automation.",
    color: "purple",
  },
  prime: {
    label: "The Prime Badge",
    icon: "⭐",
    description:
      "Why the Prime badge is your unfair advantage as a new seller with zero history.",
    color: "amber",
  },
  fees: {
    label: "Storage & Fees",
    icon: "💾",
    description:
      "Navigate Amazon's storage costs, peak season penalties, and the Lean Model approach.",
    color: "lime",
  },
  case_study: {
    label: "Case Study: Our Blueprint",
    icon: "📊",
    description:
      "Follow a real-world journey from local shelf research to a protected, scalable asset.",
    color: "rose",
  },
  unit_economics: {
    label: "Unit Economics",
    icon: "💹",
    description:
      "The financial math that proves bundles beat single items on profit and competition.",
    color: "cyan",
  },
};

const BUCKET_ORDER: BucketId[] = [
  "basics",
  "infrastructure",
  "prime",
  "fees",
  "case_study",
  "unit_economics",
];

// Generic splitter: any module whose JSON contains lesson_marker blocks gets
// its tabs derived directly from those markers. The marker carries the full
// tab metadata (id, label, icon, description, colour) so we don't need any
// per-module hard-coding here.
function splitByLessonMarkers(blocks: Block[]): Tab[] {
  const tabs: Tab[] = [];
  let current: Tab | null = null;
  for (const block of blocks) {
    if (block.type === "lesson_marker") {
      if (!block.tabId || !block.label) continue;
      current = {
        id: block.tabId,
        label: block.label,
        icon: block.icon ?? "📄",
        description: block.description,
        color: block.color,
        blocks: [],
      };
      tabs.push(current);
      continue;
    }
    if (current) current.blocks.push(block);
  }
  return tabs;
}

export function hasLessonMarkers(blocks: Block[]): boolean {
  return blocks.some((b) => b.type === "lesson_marker");
}

export function groupBlocksIntoTabs(blocks: Block[]): Tab[] {
  if (hasLessonMarkers(blocks)) return splitByLessonMarkers(blocks);

  const buckets: Record<BucketId, Block[]> = {
    basics: [],
    infrastructure: [],
    prime: [],
    fees: [],
    case_study: [],
    unit_economics: [],
  };

  let current: BucketId = "basics";

  for (const block of blocks) {
    const content = block.content || "";

    if (
      block.type === "heading_2" &&
      (content.includes("How the Infrastructure Works") ||
        content.includes("Step-by-Step Infrastructure Flow"))
    ) {
      current = "infrastructure";
    } else if (
      block.type === "heading_2" &&
      content.includes("What the Prime Badge Really Is")
    ) {
      current = "prime";
    } else if (block.type === "prime_comparison") {
      current = "prime";
    } else if (
      block.type === "heading_2" &&
      content.includes("Cost of Using Amazon's Machine")
    ) {
      current = "fees";
    } else if (block.type === "case_study") {
      current = "case_study";
    } else if (
      block.type === "heading_2" &&
      content.includes("Understanding the Unit Economics")
    ) {
      current = "unit_economics";
    } else if (block.type === "unit_economics") {
      current = "unit_economics";
    } else if (block.type === "account_safety") {
      // Excluded from the 6-tab Module 1 layout.
      continue;
    }

    buckets[current].push(block);
  }

  const tabs: Tab[] = [];
  for (const id of BUCKET_ORDER) {
    if (buckets[id].length === 0) continue;
    const meta = TAB_META[id];
    tabs.push({
      id,
      label: meta.label,
      icon: meta.icon,
      description: meta.description,
      color: meta.color,
      blocks: buckets[id],
    });
  }

  return tabs;
}

export function splitVideoFromBlocks(blocks: Block[]): {
  videos: Block[];
  rest: Block[];
} {
  const videos: Block[] = [];
  const rest: Block[] = [];
  let seenLessonMarker = false;
  for (const b of blocks) {
    if (b.type === "lesson_marker") seenLessonMarker = true;
    if (b.type === "video" && !seenLessonMarker) {
      videos.push(b);
    } else {
      rest.push(b);
    }
  }
  return { videos, rest };
}
