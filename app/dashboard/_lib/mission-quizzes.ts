// Duolingo-style quiz rounds for the Product Hunter and Listing Builder
// missions. Every answer and explanation comes from Modules 3 and 4. Brands and
// products are made up.

export type ProductCard = {
  kind: "product";
  emoji: string;
  name: string;
  facts: { label: string; value: string }[];
};
export type TextCard = { kind: "text"; text: string; note?: string };
export type ImageMock = {
  kind: "image";
  /** white = studio shot; scene = lifestyle background */
  bg: "white" | "scene";
  /** How much of the frame the product fills, 0-1. */
  fill: number;
  badge?: string;
  hand?: boolean;
  watermark?: boolean;
  props?: string[];
  infographic?: string[];
  caption?: string;
};
export type Card = ProductCard | TextCard | ImageMock;

export type Exercise =
  | {
      id: string;
      kind: "pick";
      prompt: string;
      context?: string;
      options: Card[];
      answer: number;
      why: string;
    }
  | {
      id: string;
      kind: "spot";
      prompt: string;
      context?: string;
      items: Card[];
      /** Index of the odd one out (the bad one, unless the prompt says otherwise). */
      answer: number;
      why: string;
    }
  | {
      id: string;
      kind: "sort";
      prompt: string;
      context?: string;
      good: string;
      bad: string;
      items: { card: Card; good: boolean; why: string }[];
    };

const t = (text: string, note?: string): TextCard => ({ kind: "text", text, note });

/* ------------------------------------------------------------------ */
/* Product Hunter (Module 3)                                          */
/* ------------------------------------------------------------------ */

export const PRODUCT_HUNTER: Exercise[] = [
  {
    id: "ph-fit",
    kind: "pick",
    prompt: "Which one would you turn into a 3-pack?",
    options: [
      {
        kind: "product",
        emoji: "🪥",
        name: "FreshMint whitening toothpaste",
        facts: [
          { label: "Shop price", value: "£1.20" },
          { label: "Amazon price", value: "£3.50" },
          { label: "Sales rank", value: "#4,210 Beauty" },
        ],
      },
      {
        kind: "product",
        emoji: "🧙",
        name: "Ceramic garden gnome",
        facts: [
          { label: "Shop price", value: "£4.00" },
          { label: "Amazon price", value: "£12.00" },
          { label: "Sales rank", value: "#8,900 Garden" },
        ],
      },
    ],
    answer: 0,
    why: "Gate 1 - multipack fit. Toothpaste gets used up and replaced, so three of them is obvious value. Nobody needs three gnomes.",
  },
  {
    id: "ph-bsr",
    kind: "pick",
    prompt: "Same product type, two listings. Which is selling?",
    options: [
      { kind: "product", emoji: "🍫", name: "Listing A", facts: [{ label: "Sales rank", value: "#3,800 Grocery" }, { label: "Reviews", value: "640" }] },
      { kind: "product", emoji: "🍫", name: "Listing B", facts: [{ label: "Sales rank", value: "#146,000 Grocery" }, { label: "Reviews", value: "590" }] },
    ],
    answer: 0,
    why: "Lower rank = more sales. Under 20,000 in a broad category moves units every day. Over 100,000 is too slow - storage and restock costs will eat the bundle.",
  },
  {
    id: "ph-price",
    kind: "pick",
    prompt: "Which price gap gives you room for profit?",
    options: [
      { kind: "product", emoji: "🧽", name: "Sponge 10-pack", facts: [{ label: "You pay in the shop", value: "£2.50" }, { label: "Sells on Amazon for", value: "£7.99" }] },
      { kind: "product", emoji: "🕯️", name: "Tea lights 50-pack", facts: [{ label: "You pay in the shop", value: "£3.00" }, { label: "Sells on Amazon for", value: "£2.89" }] },
    ],
    answer: 0,
    why: "The sweet spot is Amazon at 2.5x-4x your shop cost (£7.99 is 3.2x). If Amazon is at or below what you pay, you're too late - someone is already racing the price down.",
  },
  {
    id: "ph-reviews",
    kind: "pick",
    prompt: "Which single-unit listing proves real demand?",
    options: [
      { kind: "product", emoji: "🧴", name: "Hand wash A", facts: [{ label: "Reviews", value: "6" }, { label: "Sales rank", value: "None shown" }] },
      { kind: "product", emoji: "🧴", name: "Hand wash B", facts: [{ label: "Reviews", value: "412" }, { label: "Sales rank", value: "#9,300 Beauty" }] },
    ],
    answer: 1,
    why: "You want 30+ reviews and a live sales rank. Under 10 reviews or no rank means a dead or brand-new product. If people don't buy the single, they won't buy your bundle.",
  },
  {
    id: "ph-multipack",
    kind: "pick",
    prompt: "You search 'BRAND PRODUCT 3-pack'. Which result is the opportunity?",
    options: [
      { kind: "product", emoji: "📦", name: "Existing 3-pack A", facts: [{ label: "Reviews", value: "2,300" }, { label: "Sellers", value: "9" }, { label: "Photos", value: "Professional" }] },
      { kind: "product", emoji: "📦", name: "Existing 3-pack B", facts: [{ label: "Reviews", value: "14" }, { label: "Sellers", value: "1" }, { label: "Photos", value: "Blurry, one image" }] },
    ],
    answer: 1,
    why: "Gate 2. A weak existing bundle is your opening - you can out-list it. An entrenched 3-pack with 500+ reviews and lots of sellers means pick a different product.",
  },
  {
    id: "ph-brand",
    kind: "pick",
    prompt: "Which brand is safer to bundle?",
    options: [
      { kind: "product", emoji: "📺", name: "GlobalCare shampoo", facts: [{ label: "Brand", value: "Household TV brand" }, { label: "On Amazon", value: "Sells direct, own Brand Store, runs ads" }] },
      { kind: "product", emoji: "🌿", name: "Hebridean Soap Co. hand wash", facts: [{ label: "Brand", value: "Small regional brand" }, { label: "On Amazon", value: "A few third-party sellers" }] },
    ],
    answer: 1,
    why: "Gate 3 - the big brand trap. Household giants sell to Amazon at the lowest wholesale price, own the Buy Box and run ads on every search. Smaller brands leave room for you.",
  },
  {
    id: "ph-pack",
    kind: "pick",
    prompt: "Which bundle usually sells better?",
    options: [t("2-pack", "Two tubes"), t("3-pack", "Three tubes")],
    answer: 1,
    why: "3-packs beat 2-packs - the gap with the single unit is bigger, so it feels like an obvious deal.",
  },
  {
    id: "ph-pair",
    kind: "pick",
    prompt: "Which pair makes a better bundle?",
    options: [t("Shampoo + matching conditioner"), t("Shampoo + body wash")],
    answer: 0,
    why: "The second item should solve the same problem. Shampoo and conditioner are both hair care - shampoo and body wash means two problems the buyer may not have this month.",
  },
  {
    id: "ph-signals",
    kind: "sort",
    prompt: "Green light or red light?",
    good: "Green light",
    bad: "Red light",
    items: [
      { card: t("3 sellers on the single-unit listing"), good: true, why: "1-5 sellers is fine - you're building your own bundle listing, not joining their fight." },
      { card: t("Amazon price is below your shop price"), good: false, why: "You're too late - someone is already racing the price down." },
      { card: t("£6.20 net profit at 34% margin"), good: true, why: "Clears the floor: £5 net and 30% margin." },
      { card: t("£3.90 net profit at 22% margin"), good: false, why: "Under the floor. One fee change or a Q4 storage cycle wipes it out." },
      { card: t("Bulky, oddly shaped packaging"), good: false, why: "Size tier is fee tier. Design bundles to be flat and tight." },
    ],
  },
  {
    id: "ph-bundle-price",
    kind: "pick",
    prompt: "The single sells for £6.00. What's a sensible starting price for your 3-pack?",
    options: [t("£18.99"), t("£15.99"), t("£12.99")],
    answer: 1,
    why: "Single price × units, minus 10-15%: £18.00 minus 10-15% is £15.30-£16.20. £18.99 is dearer than three singles; £12.99 gives margin away.",
  },
  {
    id: "ph-boss",
    kind: "spot",
    prompt: "Boss round 💀 One of these kills the product. Tap it.",
    items: [
      t("Sales rank #6,400 in Beauty"),
      t("3 sellers on the single"),
      t("Amazon price is 3x your shop cost"),
      t("An existing 3-pack with 1,200 reviews"),
    ],
    answer: 3,
    why: "Everything else is a green light, but an entrenched 3-pack with 500+ reviews means your bundle starts invisible. Move on to the next product.",
  },
];

/* ------------------------------------------------------------------ */
/* Listing Builder (Module 4)                                         */
/* ------------------------------------------------------------------ */

const PRODUCT = "3-pack of 75ml hand cream tubes";

export const LISTING_BUILDER: Exercise[] = [
  {
    id: "lb-title-filler",
    kind: "pick",
    prompt: "Which title would you publish?",
    context: `Product: ${PRODUCT}. Main keyword: "hand cream".`,
    options: [
      t("Hand Cream 3 Pack - Intensive Moisturising Hand Cream for Very Dry Hands, Non-Greasy, 3 x 75ml Tubes"),
      t("Experience Luxury: Discover Our Revolutionary, Unparalleled Moisturising Formula for Your Hands"),
    ],
    answer: 0,
    why: "Keyword first, pack size clear, no AI filler. 'Experience', 'discover', 'revolutionary' and 'unparalleled' are words to strip out every time.",
  },
  {
    id: "lb-title-front",
    kind: "pick",
    prompt: "Which title will the search algorithm reward?",
    context: 'Main keyword: "hand cream gift set".',
    options: [
      t("Gift for Her Mum Birthday Christmas Stocking Filler Pamper Treat with Hand Cream Gift Set"),
      t("Hand Cream Gift Set 3 Pack - Moisturising Hand Cream Gift for Women, 3 x 75ml"),
    ],
    answer: 1,
    why: "The title is for the algorithm. Front-load your main keyword - burying it at the end throws away the most valuable spot.",
  },
  {
    id: "lb-bullet-filler",
    kind: "spot",
    prompt: "Tap the weak bullet.",
    items: [
      t("3-PACK VALUE - three 75ml tubes: one for your bag, your desk and your bedside"),
      t("FAST-ABSORBING - non-greasy, so you can get straight back to typing"),
      t("Enjoy a revolutionary experience that will change your hands forever"),
      t("TRAVEL-SIZE - 75ml tubes go straight into your cabin bag"),
    ],
    answer: 2,
    why: "Bullets are for the scanner - one clear benefit each. That one says nothing and is full of AI filler.",
  },
  {
    id: "lb-bullet-claim",
    kind: "spot",
    prompt: "AI drafted these. One makes a claim that isn't on the packaging. Tap it.",
    context: "Packaging says: shea butter, glycerin, fragrance-free, 75ml.",
    items: [
      t("SHEA BUTTER + GLYCERIN - rich moisture for very dry hands"),
      t("FRAGRANCE-FREE - gentle enough for sensitive skin"),
      t("CLINICALLY PROVEN to reverse skin ageing by 10 years"),
      t("75ML TUBES - lasts weeks of daily use"),
    ],
    answer: 2,
    why: "AI happily invents certifications and results. Check every claim against the packaging in front of you - a false claim can get the listing pulled.",
  },
  {
    id: "lb-bullet-benefit",
    kind: "pick",
    prompt: "Which bullet sells the benefit?",
    options: [t("Contains 75ml."), t("75ML TUBES - big enough to last a month, small enough for your handbag")],
    answer: 1,
    why: "A fact on its own doesn't sell. Say what it means for the buyer.",
  },
  {
    id: "lb-main-image",
    kind: "pick",
    prompt: "Pick the main image Amazon will accept.",
    options: [
      { kind: "image", bg: "white", fill: 0.9 },
      { kind: "image", bg: "white", fill: 0.4 },
      { kind: "image", bg: "scene", fill: 0.7, props: ["🌿", "🕯️"] },
      { kind: "image", bg: "white", fill: 0.85, badge: "BEST SELLER!" },
    ],
    answer: 0,
    why: "Pure white background, product filling at least 85% of the frame, and no text, badges, props, hands or watermarks. It's the image that wins the click in search.",
  },
  {
    id: "lb-main-rules",
    kind: "sort",
    prompt: "Allowed as the MAIN image?",
    good: "Allowed",
    bad: "Not allowed",
    items: [
      { card: { kind: "image", bg: "white", fill: 0.88 }, good: true, why: "White background, product fills the frame. Perfect." },
      { card: { kind: "image", bg: "white", fill: 0.8, hand: true }, good: false, why: "No hands or models on the main image." },
      { card: { kind: "image", bg: "white", fill: 0.85, watermark: true }, good: false, why: "No watermarks or branding overlays." },
      { card: { kind: "image", bg: "scene", fill: 0.75, props: ["🛁"] }, good: false, why: "Lifestyle shots are great - in slots 2-7, not the main image." },
    ],
  },
  {
    id: "lb-secondary",
    kind: "pick",
    prompt: "Which is the better use of image slot 3?",
    options: [
      { kind: "image", bg: "white", fill: 0.7, infographic: ["3 x 75ml", "Shea butter", "Fragrance-free"], caption: "Infographic" },
      { kind: "image", bg: "white", fill: 0.9, caption: "Same shot again" },
    ],
    answer: 0,
    why: "Slots 2-7 each answer a buyer's silent question - what's included, how big, what's in it. Repeating the main image wastes a free slot.",
  },
  {
    id: "lb-slots",
    kind: "pick",
    prompt: "How many image slots should you fill?",
    options: [t("1"), t("3"), t("All 7")],
    answer: 2,
    why: "Fill all seven. Listings with seven images outconvert listings with one by 20-30%, and the slots are free.",
  },
  {
    id: "lb-backend",
    kind: "sort",
    prompt: "Good backend search term?",
    context: 'Your title: "Hand Cream 3 Pack - Intensive Moisturising Hand Cream for Very Dry Hands"',
    good: "Good",
    bad: "Bad",
    items: [
      { card: t("lotion balm"), good: true, why: "Words customers type that aren't in your title - free extra reach." },
      { card: t("hand cream"), good: false, why: "Already in your title. Repeating it adds nothing." },
      { card: t("moisturizer"), good: true, why: "Spelling variants (moisturiser / moisturizer) catch more searches." },
      { card: t("best cheapest"), good: false, why: "Subjective claims get silently stripped by Amazon." },
      { card: t("globalcare"), good: false, why: "No competitor brand names - Amazon strips those too." },
    ],
  },
  {
    id: "lb-boss",
    kind: "spot",
    prompt: "Boss round 💀 Tap the main image that gets your listing flagged.",
    items: [
      { kind: "image", bg: "white", fill: 0.9 },
      { kind: "image", bg: "white", fill: 0.88 },
      { kind: "image", bg: "white", fill: 0.86, badge: "50% OFF" },
      { kind: "image", bg: "white", fill: 0.92 },
    ],
    answer: 2,
    why: "Text and badges on the main image break Amazon's rules - it can be stripped or the listing suppressed without warning.",
  },
];

/* ------------------------------------------------------------------ */
/* Scoring                                                            */
/* ------------------------------------------------------------------ */

export const XP_PER_PICK = 10;
export const XP_PER_SORT_ITEM = 5;

/** First-try answers: pick/spot → option index; sort → one boolean per item. */
export type QuizAnswers = Record<string, number | boolean[]>;

export function isRight(ex: Exercise, a: number | boolean[] | undefined) {
  if (a === undefined) return false;
  if (ex.kind === "sort") return Array.isArray(a) && ex.items.every((it, i) => a[i] === it.good);
  return a === ex.answer;
}

export function quizPoints(exercises: Exercise[], answers: QuizAnswers) {
  let xp = 0;
  let right = 0;
  let total = 0;
  for (const ex of exercises) {
    const a = answers[ex.id];
    if (ex.kind === "sort") {
      ex.items.forEach((it, i) => {
        total++;
        if (Array.isArray(a) && a[i] === it.good) {
          right++;
          xp += XP_PER_SORT_ITEM;
        }
      });
    } else {
      total++;
      if (a === ex.answer) {
        right++;
        xp += XP_PER_PICK;
      }
    }
  }
  return { xp, right, total };
}

export const maxQuizXp = (exercises: Exercise[]) =>
  exercises.reduce((sum, ex) => sum + (ex.kind === "sort" ? ex.items.length * XP_PER_SORT_ITEM : XP_PER_PICK), 0);

/** Keeps only valid first-try answers for known exercises. */
export function sanitizeAnswers(exercises: Exercise[], raw: unknown): QuizAnswers {
  const out: QuizAnswers = {};
  if (!raw || typeof raw !== "object") return out;
  const r = raw as Record<string, unknown>;
  for (const ex of exercises) {
    const a = r[ex.id];
    if (ex.kind === "sort") {
      if (Array.isArray(a) && a.length === ex.items.length && a.every((x) => typeof x === "boolean")) out[ex.id] = a as boolean[];
    } else {
      const n = ex.kind === "pick" ? ex.options.length : ex.items.length;
      if (typeof a === "number" && Number.isInteger(a) && a >= 0 && a < n) out[ex.id] = a;
    }
  }
  return out;
}
