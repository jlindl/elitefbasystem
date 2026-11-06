// Missions: real-world tasks and quiz rounds broken into bite-size, tappable
// steps. The app checks every step itself, so students get instant feedback
// and XP. Shared by server and client - keep it
// free of server-only imports.

import { LISTING_BUILDER, PRODUCT_HUNTER, maxQuizXp, quizPoints, sanitizeAnswers, type Exercise, type ProductCard, type QuizAnswers } from "./mission-quizzes";

export const MODULE_IDS = {
  m1: "29b20c1c-884d-8077-b9c5-e7e5d68384e8",
  m2: "29b20c1c-884d-8066-a004-d51fa41bb93d",
  m3: "29b20c1c-884d-80fe-9004-dc3735899118",
  m4: "29b20c1c-884d-8020-901c-e9c36fb64c9c",
  m5: "29b20c1c-884d-8036-b117-fb46fa089178",
} as const;

/* ------------------------------------------------------------------ */
/* Step definitions                                                   */
/* ------------------------------------------------------------------ */

type Base = { id: string; title: string; prompt: string; xp: number; tip?: string };

export type ChecklistStep = Base & {
  type: "checklist";
  items: { id: string; label: string; hint?: string }[];
};
export type ChoiceStep = Base & {
  type: "choice";
  options: { value: string; label: string; emoji?: string; hint?: string }[];
  /** If set, only these values complete the step; others save progress. */
  completeOn?: string[];
  /** Shown after picking, keyed by value. */
  reactions?: Record<string, string>;
};
/** Pick the right product from examples. Wrong picks get feedback and another go. */
export type PickProductStep = Base & {
  type: "pick-product";
  options: ProductCard[];
  answer: number;
  why: string;
  wrongWhy: string;
};
export type CalcPreset = { price: number; cost: number; fees: number; note: string };
export type CalculatorStep = Base & {
  type: "calculator";
  /** Starting numbers, keyed by the answer to another step (e.g. the bundle size). */
  presets?: { from: string; byValue: Record<string, CalcPreset> };
};
export type VerdictStep = Base & { type: "verdict" };
/** A Duolingo-style round of exercises. XP comes from first-try answers. */
export type QuizStep = Base & { type: "quiz"; exercises: Exercise[] };
export type ShipmentStep = Base & { type: "shipment" };
export type SaleStep = Base & { type: "sale" };

export type Step =
  | ChecklistStep
  | ChoiceStep
  | PickProductStep
  | CalculatorStep
  | VerdictStep
  | QuizStep
  | ShipmentStep
  | SaleStep;

export type Mission = {
  id: string;
  moduleId: string;
  moduleNumber: number;
  title: string;
  tagline: string;
  why: string;
  estimate: string;
  badge: { name: string; emoji: string };
  /** Mission-complete bonus XP. */
  bonus: number;
  unlock?: { mission: string; when: "started" | "complete" };
  steps: Step[];
};

export const MISSIONS: Mission[] = [
  {
    id: "numbers-game",
    moduleId: MODULE_IDS.m1,
    moduleNumber: 1,
    title: "The Numbers Game",
    tagline: "Pick a winner, then run the numbers.",
    why: "Every decision in this system starts with the maths. Now you've seen why a 3-pack can clear the floor when a 2-pack can't.",
    estimate: "5 min",
    badge: { name: "Numbers Person", emoji: "🧮" },
    bonus: 30,
    steps: [
      {
        id: "product",
        type: "pick-product",
        title: "Pick your product",
        prompt: "Both of these sell well on Amazon. Which one would you turn into a multipack?",
        tip: "Think replenishables: things people run out of, share or stockpile.",
        options: [
          {
            kind: "product",
            emoji: "🫖",
            name: "Electric kettle",
            facts: [
              { label: "You pay in the shop", value: "£15.00" },
              { label: "Sells on Amazon for", value: "£24.99" },
              { label: "Sales rank", value: "#2,300 Kitchen" },
            ],
          },
          {
            kind: "product",
            emoji: "🦴",
            name: "Dog dental chews (single bag)",
            facts: [
              { label: "You pay in the shop", value: "£2.50" },
              { label: "Sells on Amazon for", value: "£7.99" },
              { label: "Sales rank", value: "#4,800 Pet Supplies" },
            ],
          },
        ],
        answer: 1,
        why: "Dog chews get used up and rebought, so three bags is obvious value. And at £7.99 on Amazon vs £2.50 in the shop, the price gap is 3.2x - right in the 2.5x-4x sweet spot.",
        wrongWhy: "The kettle sells, but nobody buys three kettles - it's a one-off purchase. It's also bulky, and size tier is fee tier. Try the other one.",
        xp: 20,
      },
      {
        id: "bundle",
        type: "choice",
        title: "Pick your bundle",
        prompt: "How would you package it?",
        options: [
          { value: "2-pack", label: "2-pack", emoji: "✌️" },
          { value: "3-pack", label: "3-pack", emoji: "🥉" },
        ],
        reactions: {
          "2-pack": "Let's see if it pays. Next you'll run the numbers - watch the margin.",
          "3-pack": "Good instinct. 3-packs usually beat 2-packs because the value gap with the single is bigger.",
        },
        xp: 10,
      },
      {
        id: "numbers",
        type: "calculator",
        title: "Run the numbers",
        prompt: "We've filled in the numbers for your bundle. Drag the price and see what happens to your profit.",
        tip: "Fees here are an estimate. On a real product you'd get them from Amazon's free FBA revenue calculator.",
        presets: {
          from: "bundle",
          byValue: {
            "3-pack": {
              price: 20.99,
              cost: 8,
              fees: 6.15,
              note: "Price: 3 × £7.99 = £23.97, minus about 12% multipack discount. Cost: 3 bags × £2.50 + £0.50 packaging. Fees: 15% referral + FBA fulfilment (estimate).",
            },
            "2-pack": {
              price: 13.99,
              cost: 5.5,
              fees: 4.9,
              note: "Price: 2 × £7.99 = £15.98, minus about 12% multipack discount. Cost: 2 bags × £2.50 + £0.50 packaging. Fees: 15% referral + FBA fulfilment (estimate).",
            },
          },
        },
        xp: 40,
      },
      {
        id: "call",
        type: "verdict",
        title: "Make the call",
        prompt: "Would you build this bundle?",
        xp: 10,
      },
    ],
  },
  {
    id: "open-for-business",
    moduleId: MODULE_IDS.m2,
    moduleNumber: 2,
    title: "Open for Business",
    tagline: "Get your seller account live.",
    why: "Nothing else can happen without an approved account, and verification takes time - start it early.",
    estimate: "2-3 hrs + Amazon's review",
    badge: { name: "Open for Business", emoji: "🏪" },
    bonus: 30,
    unlock: { mission: "numbers-game", when: "complete" },
    steps: [
      {
        id: "preflight",
        type: "checklist",
        title: "Pre-flight check",
        prompt: "Tap each one you've got ready. Details must match exactly across all of them.",
        items: [
          { id: "id", label: "Government-issued photo ID" },
          { id: "bank", label: "UK business or personal bank account" },
          { id: "card", label: "Chargeable debit or credit card" },
          { id: "address", label: "Verifiable address" },
          { id: "tax", label: "Tax information" },
          { id: "phone", label: "Mobile phone with SMS" },
          { id: "email", label: "Dedicated business email" },
        ],
        xp: 30,
      },
      {
        id: "plan",
        type: "choice",
        title: "Choose your plan",
        prompt: "Which plan are you signing up on?",
        options: [
          { value: "individual", label: "Individual", emoji: "🌱" },
          { value: "professional", label: "Professional", emoji: "🚀" },
        ],
        tip: "Module 2, Lesson 2 compares them side by side.",
        xp: 10,
      },
      {
        id: "registration",
        type: "choice",
        title: "Registration tracker",
        prompt: "Where's your account up to? Come back and move it on as it progresses.",
        options: [
          { value: "submitted", label: "Registration submitted", emoji: "📨" },
          { value: "booked", label: "Verification call booked", emoji: "📅" },
          { value: "verified", label: "Verification call done", emoji: "🎥" },
          { value: "approved", label: "Approved and live", emoji: "✅" },
        ],
        completeOn: ["approved"],
        reactions: {
          submitted: "Saved. Amazon usually comes back with a verification call next - tap back in when it's booked.",
          booked: "Saved. Re-read 'The Video Call, Step by Step' the night before.",
          verified: "Nearly there. Tap back in the moment approval lands.",
          approved: "You're live. 🎉",
        },
        xp: 60,
      },
      {
        id: "day-one",
        type: "checklist",
        title: "Day-one setup",
        prompt: "The three critical tasks to do on day one.",
        items: [
          { id: "2fa", label: "Enable two-step verification" },
          { id: "tax", label: "Complete the UK tax interview" },
          { id: "bank", label: "Verify the deposit bank account" },
        ],
        xp: 30,
      },
    ],
  },
  {
    id: "product-hunter",
    moduleId: MODULE_IDS.m3,
    moduleNumber: 3,
    title: "Product Hunter",
    tagline: "Spot the winners. Kill the losers.",
    why: "Research is a funnel, not a search. The faster you can read the signals, the less money you waste.",
    estimate: "5 min",
    badge: { name: "Product Hunter", emoji: "🔎" },
    bonus: 40,
    unlock: { mission: "open-for-business", when: "started" },
    steps: [{ id: "quiz", type: "quiz", title: "Product Hunter", prompt: "", xp: 0, exercises: PRODUCT_HUNTER }],
  },
  {
    id: "listing-builder",
    moduleId: MODULE_IDS.m4,
    moduleNumber: 4,
    title: "Listing Builder",
    tagline: "Tell a winning listing from a weak one.",
    why: "A listing has three jobs: get found, get clicked, get bought. You'll spot what does each - and what kills it.",
    estimate: "5 min",
    badge: { name: "Listing Builder", emoji: "✍️" },
    bonus: 40,
    unlock: { mission: "product-hunter", when: "complete" },
    steps: [{ id: "quiz", type: "quiz", title: "Listing Builder", prompt: "", xp: 0, exercises: LISTING_BUILDER }],
  },
  {
    id: "first-box",
    moduleId: MODULE_IDS.m5,
    moduleNumber: 5,
    title: "First Box Shipped",
    tagline: "Prep, pack and send your first shipment.",
    why: "This is the moment it becomes a real business.",
    estimate: "A quiet 2 hrs",
    badge: { name: "First Box Shipped", emoji: "📦" },
    bonus: 50,
    unlock: { mission: "listing-builder", when: "complete" },
    steps: [
      {
        id: "supplies",
        type: "checklist",
        title: "Lay out your tools",
        prompt: "30 minutes if everything's ready, 3 hours if you're missing tape.",
        items: [
          { id: "bags", label: "Clear polybags sized to your bundle" },
          { id: "fnsku", label: "FNSKU labels - one per unit" },
          { id: "warn", label: "Suffocation warning on every bag" },
          { id: "dns", label: "Do Not Separate labels (multi-unit bundles)" },
          { id: "box", label: "Cardboard outer box + strong tape" },
          { id: "fill", label: "Void fill - kraft paper or air pillows" },
          { id: "scale", label: "Scale and tape measure" },
          { id: "printer", label: "Printer and adhesive label paper" },
        ],
        xp: 20,
      },
      {
        id: "pack",
        type: "checklist",
        title: "Prep and pack",
        prompt: "Amazon enforces these. Check every one.",
        items: [
          { id: "bagged", label: "Every unit polybagged and sealed" },
          { id: "labelled", label: "FNSKU label on every unit" },
          { id: "edge", label: "No box edge over 63.5 cm" },
          { id: "weight", label: "Box weighs 23 kg or less" },
          { id: "heavy", label: "Heavy Package label if over 15 kg (or not needed)" },
          { id: "rattle", label: "Packed snug - no rattle" },
        ],
        xp: 30,
      },
      { id: "shipment", type: "shipment", title: "Create the shipment", prompt: "Make it in Send to Amazon, then log it here.", xp: 30 },
      {
        id: "tracking",
        type: "choice",
        title: "Track it in",
        prompt: "Move it along as it travels. Done when Amazon starts receiving.",
        options: [
          { value: "transit", label: "In transit", emoji: "🚚" },
          { value: "delivered", label: "Delivered to Amazon", emoji: "🏭" },
          { value: "receiving", label: "Receiving", emoji: "📥" },
          { value: "closed", label: "Closed - all units received", emoji: "✅" },
        ],
        completeOn: ["receiving", "closed"],
        reactions: {
          transit: "On its way. Check back in a couple of days.",
          delivered: "Delivered. Receiving usually starts shortly after.",
          receiving: "Amazon is scanning your units in. You're nearly live.",
          closed: "Every unit received. 🎉",
        },
        xp: 40,
      },
    ],
  },
  {
    id: "first-sale",
    moduleId: MODULE_IDS.m5,
    moduleNumber: 5,
    title: "First Sale",
    tagline: "The big one.",
    why: "Your first sale proves the whole system works for you.",
    estimate: "Whenever it lands",
    badge: { name: "First Sale", emoji: "🎉" },
    bonus: 100,
    unlock: { mission: "first-box", when: "complete" },
    steps: [{ id: "sale", type: "sale", title: "Log your first sale", prompt: "Someone, somewhere, bought something you put into the world.", xp: 100 }],
  },
];

export const MISSIONS_BY_ID = new Map(MISSIONS.map((m) => [m.id, m]));
export const missionsForModule = (moduleId: string) => MISSIONS.filter((m) => m.moduleId === moduleId);

/* ------------------------------------------------------------------ */
/* Data shapes per step                                               */
/* ------------------------------------------------------------------ */

export type StepData = Record<string, unknown>;
export type MissionData = Record<string, StepData>; // stepId -> data

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.slice(0, max) : "");
const num = (v: unknown) => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
};

/** Keeps only the keys a step type uses, with sane types and sizes. */
export function sanitize(step: Step, raw: StepData): StepData {
  switch (step.type) {
    case "checklist": {
      const ids = new Set(step.items.map((i) => i.id));
      const done = Array.isArray(raw.done) ? raw.done.filter((x): x is string => typeof x === "string" && ids.has(x)) : [];
      return { done: [...new Set(done)] };
    }
    case "choice":
      return { value: step.options.some((o) => o.value === raw.value) ? raw.value : null };
    case "verdict":
      return { value: ["build", "rework", "walk"].includes(String(raw.value)) ? raw.value : null };
    case "pick-product":
      return { pick: Number.isInteger(raw.pick) && (raw.pick as number) >= 0 && (raw.pick as number) < step.options.length ? raw.pick : null };
    case "calculator":
      return { price: num(raw.price), cost: num(raw.cost), fees: num(raw.fees) };
    case "quiz":
      return { answers: sanitizeAnswers(step.exercises, raw.answers) };
    case "shipment":
      return { id: str(raw.id, 40).toUpperCase().trim(), units: num(raw.units) };
    case "sale":
      return { date: str(raw.date, 20), price: num(raw.price), product: str(raw.product, 160) };
  }
}

/* ------------------------------------------------------------------ */
/* Auto-checks                                                        */
/* ------------------------------------------------------------------ */

export const FLOOR = { net: 5, margin: 0.3 };

export function profitOf(d: StepData) {
  const price = num(d.price);
  const cost = num(d.cost);
  const fees = num(d.fees);
  if (!price || price <= 0 || cost === null || fees === null) return null;
  const net = price - cost - fees;
  const margin = net / price;
  return { price, cost, fees, net, margin, clears: net >= FLOOR.net && margin >= FLOOR.margin };
}

const gbp = (n: number) => n.toLocaleString("en-GB", { style: "currency", currency: "GBP" });

/** Coach feedback on the Module 1 'make the call' step, based on their numbers. */
export function verdictReaction(choice: unknown, numbers: StepData | undefined) {
  const p = profitOf(numbers ?? {});
  if (!choice || !p) return null;
  if (p.clears) {
    if (choice === "build")
      return { tone: "good" as const, text: `Agreed - ${gbp(p.net)} net at ${(p.margin * 100).toFixed(0)}% clears the floor. Aim well above it before you source.` };
    return { tone: "accent" as const, text: "It does clear the floor - but being cautious isn't wrong. Check demand and competition before you commit." };
  }
  if (choice === "build")
    return { tone: "warn" as const, text: `Careful. ${gbp(p.net)} net and ${(p.margin * 100).toFixed(0)}% margin is under the floor (${gbp(FLOOR.net)} and ${FLOOR.margin * 100}%). One fee change and it's underwater.` };
  return { tone: "good" as const, text: "Exactly right. Spotting a bundle that doesn't work - before you spend a penny - is the whole skill." };
}

const SHIPMENT_ID = /^FBA[0-9A-Z]{6,}$/;

/** Whether a step's saved data completes it. */
export function isStepComplete(step: Step, d: StepData | undefined): boolean {
  if (!d) return false;
  switch (step.type) {
    case "checklist":
      return ((d.done as string[]) ?? []).length === step.items.length;
    case "choice":
      return d.value != null && (!step.completeOn || step.completeOn.includes(String(d.value)));
    case "verdict":
      return d.value != null;
    case "pick-product":
      return d.pick === step.answer;
    case "calculator":
      return profitOf(d) !== null;
    case "quiz":
      return step.exercises.every((ex) => (d.answers as QuizAnswers | undefined)?.[ex.id] !== undefined);
    case "shipment":
      return SHIPMENT_ID.test(str(d.id)) && (num(d.units) ?? 0) > 0;
    case "sale":
      return !Number.isNaN(Date.parse(str(d.date))) && (num(d.price) ?? 0) > 0 && str(d.product).trim().length >= 2;
  }
}

/**
 * Starting data for a step, e.g. the calculator pre-filled for the chosen
 * bundle. Returns null to keep what's there: anything the student has edited
 * themselves is never overwritten, but an untouched preset follows the bundle.
 */
export function seedStepData(step: Step, mission: MissionData): StepData | null {
  if (step.type !== "calculator" || !step.presets) return null;
  const key = mission[step.presets.from]?.value;
  const preset = typeof key === "string" ? step.presets.byValue[key] : undefined;
  if (!preset) return null;
  const cur = mission[step.id] ?? {};
  const untouched =
    Object.keys(cur).length === 0 ||
    Object.values(step.presets.byValue).some((p) => p.price === cur.price && p.cost === cur.cost && p.fees === cur.fees);
  return untouched ? { price: preset.price, cost: preset.cost, fees: preset.fees } : null;
}

export function presetNote(step: Step, mission: MissionData) {
  if (step.type !== "calculator" || !step.presets) return null;
  const key = mission[step.presets.from]?.value;
  return typeof key === "string" ? step.presets.byValue[key]?.note ?? null : null;
}

/** Steps like trackers can be saved part-way; everything else needs completing. */
export const canSavePartial = (step: Step) => step.type === "choice" && !!step.completeOn;

export const shipmentIdOk = (id: string) => SHIPMENT_ID.test(id.trim().toUpperCase());

/* ------------------------------------------------------------------ */
/* Progress, XP, levels, streaks                                      */
/* ------------------------------------------------------------------ */

export type StepRecord = { data: StepData; completedAt: string | null };
export type Progress = {
  steps: Record<string, StepRecord>; // `${missionId}::${stepId}`
};

export const stepKey = (missionId: string, stepId: string) => `${missionId}::${stepId}`;

export function missionData(p: Progress, m: Mission): MissionData {
  return Object.fromEntries(m.steps.map((s) => [s.id, p.steps[stepKey(m.id, s.id)]?.data ?? {}]));
}

export function missionState(p: Progress, m: Mission) {
  const done = m.steps.filter((s) => !!p.steps[stepKey(m.id, s.id)]?.completedAt).length;
  const touched = m.steps.some((s) => p.steps[stepKey(m.id, s.id)]);
  return { done, total: m.steps.length, started: touched, complete: done === m.steps.length };
}

export function isUnlocked(p: Progress, m: Mission) {
  if (!m.unlock) return true;
  const req = MISSIONS_BY_ID.get(m.unlock.mission);
  if (!req) return true;
  const s = missionState(p, req);
  return m.unlock.when === "started" ? s.started : s.complete;
}

export function missionXp(p: Progress, m: Mission) {
  const s = missionState(p, m);
  let xp = m.steps.reduce((sum, st) => {
    const rec = p.steps[stepKey(m.id, st.id)];
    if (!rec?.completedAt) return sum;
    return sum + (st.type === "quiz" ? quizXp(st, rec.data) : st.xp);
  }, 0);
  if (s.complete) xp += m.bonus;
  return xp;
}

export const quizXp = (step: QuizStep, d: StepData) =>
  quizPoints(step.exercises, (d.answers as QuizAnswers) ?? {}).xp;

/** Most XP a mission can give (quizzes count every first-try answer). */
export const maxMissionXp = (m: Mission) =>
  m.bonus + m.steps.reduce((sum, st) => sum + (st.type === "quiz" ? maxQuizXp(st.exercises) : st.xp), 0);

export const totalXp = (p: Progress) => MISSIONS.reduce((sum, m) => sum + missionXp(p, m), 0);

export const LEVELS = [
  { min: 0, name: "Rookie", emoji: "🐣" },
  { min: 100, name: "Hustler", emoji: "⚡" },
  { min: 250, name: "Seller", emoji: "🛒" },
  { min: 450, name: "Operator", emoji: "⚙️" },
  { min: 700, name: "Brand Builder", emoji: "🏗️" },
  { min: 1000, name: "Elite", emoji: "👑" },
];

export function levelFor(xp: number) {
  let i = 0;
  while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1].min) i++;
  const cur = LEVELS[i];
  const next = LEVELS[i + 1] ?? null;
  const pct = next ? (xp - cur.min) / (next.min - cur.min) : 1;
  return { index: i, ...cur, next, pct, toNext: next ? next.min - xp : 0 };
}

const londonDay = (iso: string) =>
  new Date(iso).toLocaleDateString("en-CA", { timeZone: "Europe/London" });

/** Consecutive days (ending today or yesterday) with at least one step completed. */
export function streakDays(p: Progress, now = new Date()) {
  const days = new Set(
    Object.values(p.steps)
      .map((s) => s.completedAt)
      .filter((d): d is string => !!d)
      .map(londonDay),
  );
  const day = (offset: number) => londonDay(new Date(now.getTime() - offset * 86400000).toISOString());
  const start = days.has(day(0)) ? 0 : days.has(day(1)) ? 1 : -1;
  if (start < 0) return { days: 0, today: false };
  let n = 0;
  while (days.has(day(start + n))) n++;
  return { days: n, today: days.has(day(0)) };
}

export function nextMission(p: Progress) {
  return (
    MISSIONS.find((m) => isUnlocked(p, m) && missionState(p, m).started && !missionState(p, m).complete) ??
    MISSIONS.find((m) => isUnlocked(p, m) && !missionState(p, m).complete) ??
    null
  );
}
