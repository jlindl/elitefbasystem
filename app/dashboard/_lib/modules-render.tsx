import type { ReactNode } from "react";
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
import { linkTerms, type GlossaryRun } from "./glossary";
import modulesData from "./modules_content.json";

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

// Returns the 11-char YouTube video id for youtu.be / youtube.com URLs, or
// null for any other src (e.g. a direct .mp4 file) so it renders as <video>.
export function extractYouTubeId(src: string): string | null {
  const match = src.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

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
export function renderBlocks(blocks: Block[], opts: { glossary?: GlossaryRun } = {}) {
  const seen = new Set<string>();
  const out: ReactNode[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    // Consecutive list items become one real list, so screen readers announce "list, 4 items".
    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const run: { block: Block; i: number }[] = [];
      while (i < blocks.length && blocks[i].type === block.type) run.push({ block: blocks[i], i: i++ });
      i--;
      out.push(renderList(block.type === "numbered_list_item", run, opts.glossary));
      continue;
    }
    if (block.type === "heading_2" && block.content) {
      let id = slugify(block.content);
      if (id) {
        let suffix = 1;
        while (seen.has(id)) {
          suffix += 1;
          id = `${slugify(block.content)}-${suffix}`;
        }
        seen.add(id);
        out.push(renderBlock(block, i, id, opts.glossary));
        continue;
      }
    }
    out.push(renderBlock(block, i, undefined, opts.glossary));
  }
  return out;
}

/** Body text that follows the reader's text-size choice (Reading options in a lesson). */
const SCALED = {
  body: "text-[length:calc(1.0625rem*var(--lesson-scale,1))]",
  small: "text-[length:calc(1rem*var(--lesson-scale,1))]",
};

function renderList(numbered: boolean, items: { block: Block; i: number }[], glossary?: GlossaryRun) {
  const List = numbered ? "ol" : "ul";
  return (
    <List key={items[0].i} role="list" className="max-w-[68ch] space-y-2.5">
      {items.map(({ block, i }, n) => (
        <li key={i} data-read="" className={`flex gap-3 pl-1 ${SCALED.body} leading-[1.75] text-ink/85`}>
          {numbered ? (
            <span className="mt-[0.3em] inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md bg-accent-soft px-1 text-[0.8125rem] font-bold tabular-nums text-orange-800"
            >
              {n + 1}
            </span>
          ) : (
            <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          )}
          <span className="min-w-0">{linkTerms(block.content, glossary)}</span>
        </li>
      ))}
    </List>
  );
}

const CALLOUT_TONES: { match: RegExp; cls: string; label: string }[] = [
  { match: /^(⚠️|⚠|🚨|❗|⛔)/u, cls: "border-amber-200 bg-amber-50 text-amber-950", label: "text-amber-800" },
  { match: /^(💡|🧠|ℹ️)/u, cls: "border-sky-200 bg-sky-50 text-sky-950", label: "text-sky-800" },
  { match: /^(🎯|🔥|⭐|🚀)/u, cls: "border-accent/30 bg-accent-soft text-ink", label: "text-orange-800" },
  { match: /^(✅|✔️|👍|💪)/u, cls: "border-emerald-200 bg-emerald-50 text-emerald-950", label: "text-emerald-800" },
  { match: /^(🛒|📦|🧾|💷|💰)/u, cls: "border-violet-200 bg-violet-50 text-violet-950", label: "text-violet-800" },
];

/** Splits "🎯 Title: body" into its emoji, optional short title and body. */
function parseCallout(text: string) {
  const m = text.match(/^(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*)\s*/u);
  const emoji = m?.[1] ?? "📌";
  let body = m ? text.slice(m[0].length) : text;
  let title: string | null = null;
  const colon = body.indexOf(":");
  if (colon > 0 && colon <= 42 && !/https?$/i.test(body.slice(0, colon))) {
    title = body.slice(0, colon).trim();
    body = body.slice(colon + 1).trim();
  }
  const tone =
    CALLOUT_TONES.find((t) => t.match.test(emoji)) ?? { cls: "border-line bg-surface-alt text-ink", label: "text-ink-muted" };
  return { emoji, title, body, tone };
}

/** Renders one content block. Pass a glossary run to link dictionary terms in its text. */
export function renderBlock(block: Block, i: number, idOverride?: string, glossary?: GlossaryRun) {
  if (block.type === "paragraph") {
    if (!block.content || block.content.trim() === "") return <div key={i} className="h-2" />;
    return (
      <p key={i} data-read="" className={`max-w-[70ch] ${SCALED.body} leading-[1.8] text-ink/85`}>
        {linkTerms(block.content, glossary)}
      </p>
    );
  }
  if (block.type === "heading_1") {
    return (
      <h2 key={i} className="!mt-14 max-w-[70ch] font-display text-[1.9rem] font-semibold tracking-[-0.03em] text-ink">
        {block.content}
      </h2>
    );
  }
  if (block.type === "heading_2") {
    const id = idOverride ?? (block.content ? slugify(block.content) : undefined);
    return (
      <h2
        key={i}
        id={id}
        className="group/h !mt-12 flex max-w-[70ch] scroll-mt-28 items-start gap-3 font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.025em] text-ink md:text-[1.7rem]"
      >
        <span aria-hidden className="mt-[0.55em] h-[3px] w-5 shrink-0 rounded-full bg-accent" />
        <span>{block.content}</span>
      </h2>
    );
  }
  if (block.type === "heading_3") {
    const id = block.content ? slugify(block.content) : undefined;
    return (
      <h3 key={i} id={id} data-read="" className="lesson-heading !mt-10 max-w-[70ch] scroll-mt-28 font-display text-[length:calc(1.25rem*var(--lesson-scale,1))] font-semibold tracking-[-0.015em] text-ink">
        {block.content}
      </h3>
    );
  }
  if (block.type === "bulleted_list_item") {
    return (
      <p key={i} className="!mt-2.5 flex max-w-[68ch] gap-3 pl-1 text-[1.02rem] leading-[1.75] text-ink/85">
        <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span>{linkTerms(block.content, glossary)}</span>
      </p>
    );
  }
  if (block.type === "numbered_list_item") {
    return (
      <p key={i} className="!mt-2.5 flex max-w-[68ch] gap-3 pl-1 text-[1.02rem] leading-[1.75] text-ink/85">
        <span aria-hidden className="mt-[0.2em] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent-soft text-[0.7rem] font-bold text-accent">
          →
        </span>
        <span>{linkTerms(block.content, glossary)}</span>
      </p>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote key={i} data-read="" className="!my-8 max-w-[64ch] border-l-[3px] border-accent pl-6 font-serif text-[length:calc(1.35rem*var(--lesson-scale,1))] leading-[1.5] text-ink">
        {block.content}
      </blockquote>
    );
  }
  if (block.type === "video") {
    if (block.src) {
      const youTubeId = extractYouTubeId(block.src);
      return (
        <div
          key={i}
          className="relative !my-8 aspect-video w-full overflow-hidden rounded-3xl bg-ink shadow-[0_24px_60px_-24px_rgba(10,10,10,0.5)] ring-1 ring-black/5"
        >
          {youTubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youTubeId}?rel=0&modestbranding=1`}
              title={block.content ?? "Module video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <video src={block.src} controls playsInline preload="metadata" className="absolute inset-0 h-full w-full" />
          )}
        </div>
      );
    }
    return (
      <div key={i} className="relative !my-8 flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl bg-ink/5 ring-1 ring-black/5">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
          <svg className="ml-1 h-7 w-7 text-ink" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="absolute bottom-4 left-5 text-[0.9rem] font-medium text-ink-muted">{block.content}</span>
      </div>
    );
  }
  if (block.type === "image") {
    const src = block.src ?? block.content ?? "";
    const caption = block.src ? block.content : undefined;
    return (
      <figure key={i} className="!my-8 overflow-hidden rounded-3xl border border-line bg-surface p-2 shadow-[var(--shadow-soft)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote course images from Supabase storage */}
        <img src={src} alt={block.label ?? caption ?? "Lesson image"} loading="lazy" className="h-auto w-full rounded-2xl" />
        {caption && <figcaption className="px-3 py-3 text-center text-[0.85rem] leading-relaxed text-ink-muted">{caption}</figcaption>}
      </figure>
    );
  }
  if (block.type === "external_link") {
    const href = block.src ?? "";
    let host = href;
    try {
      host = new URL(href).hostname.replace(/^www\./, "");
    } catch {}
    return (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="spot lift group !my-6 flex max-w-[70ch] items-center gap-4 rounded-2xl border border-line bg-surface p-4 no-underline"
      >
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft font-display text-[1rem] font-semibold uppercase text-accent">
          {host.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[1rem] font-semibold leading-tight text-ink group-hover:text-accent">{block.label ?? "Open link"}</span>
          {block.description && <span className="mt-0.5 block text-[0.85rem] leading-snug text-ink-muted">{block.description}</span>}
          <span className="mt-1 block truncate font-mono text-[0.68rem] text-ink-subtle">{host}</span>
        </span>
        <span aria-hidden className="nudge shrink-0 text-[1.1rem] text-ink-subtle group-hover:text-accent">
          ↗
        </span>
      </a>
    );
  }
  if (block.type === "callout") {
    const c = parseCallout(block.content ?? "");
    return (
      <aside key={i} data-read="" className={`!my-8 flex max-w-[72ch] gap-4 rounded-2xl border p-5 ${c.tone.cls}`}>
        <span aria-hidden className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70 text-[1.25rem] shadow-sm">
          {c.emoji}
        </span>
        <div className="min-w-0 pt-0.5">
          {c.title && <p className={`text-[0.875rem] font-semibold tracking-[-0.005em] ${c.tone.label}`}>{c.title}</p>}
          <p className={`${c.title ? "mt-1.5" : ""} ${SCALED.small} leading-[1.7]`}>{linkTerms(c.body, glossary)}</p>
        </div>
      </aside>
    );
  }
  if (block.type === "to_do") {
    return (
      <div key={i} data-read="" className="!mt-2.5 flex max-w-[68ch] items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3">
        <span aria-hidden className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-line" />
        <span className={`${SCALED.small} leading-relaxed text-ink`}>{linkTerms(block.content, glossary)}</span>
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

/** A module's lessons, split the same way everywhere (Module 1 by topic, the rest by lesson markers). */
export function lessonTabs(index: number): Tab[] {
  const blocks = modulesData[index].blocks as Block[];
  if (index === 0 || hasLessonMarkers(blocks)) return groupBlocksIntoTabs(splitVideoFromBlocks(blocks).rest);
  return groupBlocksIntoTabs(blocks);
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
