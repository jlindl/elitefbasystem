/**
 * The physical kit for a first FBA shipment. Every rule here comes from the course
 * itself (mostly Module 5, plus the Jargon Dictionary) - keep it in step with the lessons.
 *
 * The course says Elite FBA's own eBay shop will stock "the exact polybags, labels and
 * boxes we use" and that links are coming. When it's live, set SUPPLIES_SHOP_URL and
 * add each item's `shopUrl`; the page switches to "Buy from the Elite FBA shop".
 */

export const SUPPLIES_SHOP_URL: string | null = null;

export type SupplyNeed = "essential" | "recommended" | "if-needed" | "optional";
export type SupplyCategoryId = "bagging" | "printing" | "box" | "tools";

export type SupplyCategory = { id: SupplyCategoryId; label: string; emoji: string; blurb: string };

export type SupplyItem = {
  id: string;
  category: SupplyCategoryId;
  name: string;
  emoji: string;
  need: SupplyNeed;
  why: string;
  rulesTitle?: string;
  rules: string[];
  tip?: string;
  lesson?: { label: string; href: string };
  search: { label: string; href: string }[];
  shopUrl?: string;
};

const M4 = "/dashboard/modules/29b20c1c-884d-8020-901c-e9c36fb64c9c";
const M5 = "/dashboard/modules/29b20c1c-884d-8036-b117-fb46fa089178";

const ebay = (q: string) => ({ label: "Find on eBay", href: `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(q)}` });
const amazon = (q: string) => ({ label: "Find on Amazon", href: `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}` });

export const SUPPLY_CATEGORIES: SupplyCategory[] = [
  { id: "bagging", label: "Bagging your bundles", emoji: "🛍️", blurb: "Every bundle goes into its own sealed polybag with the right labels on the outside. Get these right and your shipment passes receiving without flags." },
  { id: "printing", label: "Printing your labels", emoji: "🖨️", blurb: "Amazon gives you the FNSKU, carrier and shipment ID labels as PDFs in the Send to Amazon wizard. You print them at home before the box leaves your address." },
  { id: "box", label: "Packing the outer box", emoji: "📦", blurb: "All your bagged bundles go into one outer box. It's the only thing UPS or DPD ever sees, so it has to survive the journey." },
  { id: "tools", label: "Measuring and weighing", emoji: "⚖️", blurb: "The size and weight you enter must match what Amazon measures when your box arrives." },
];

export const SUPPLIES: SupplyItem[] = [
  {
    id: "polybags",
    category: "bagging",
    name: "Clear polybags",
    emoji: "🛍️",
    need: "essential",
    why: "One per bundle. Get them slightly larger than the bundle so the bag closes flat without straining.",
    rules: [
      "Transparent polythene, at least 38 microns thick",
      "Every bundle in its own bag, sealed with a fold or heat-seal",
      "Any bag with an opening 12.5 cm or wider needs a printed suffocation warning",
    ],
    tip: "Bags with the warning already printed cost about 10p more each but save you a label-printing step every time. For your first shipment, pre-printed is the cleaner choice.",
    lesson: { label: "Module 5, Lesson 2", href: `${M5}/polybag` },
    search: [ebay("FBA polybags with suffocation warning"), amazon("FBA polybags with suffocation warning")],
  },
  {
    id: "dns-labels",
    category: "bagging",
    name: "Do Not Separate labels",
    emoji: "🔗",
    need: "essential",
    why: "Tells Amazon's warehouse staff to keep the units together and pick the whole bundle as one item. You'll need them for most bundles in this course.",
    rules: [
      "Mandatory on any polybag holding more than one physical unit under one SKU, such as a 3-pack",
      "Usually reads “DO NOT SEPARATE - SOLD AS SET”",
      "Front of the polybag, next to the FNSKU label, not covering it",
    ],
    tip: "Sold as pre-printed sticker rolls. You can print your own on coloured label paper if you want a branded version.",
    lesson: { label: "Module 5, Lesson 2", href: `${M5}/polybag` },
    search: [ebay("do not separate sold as set labels"), amazon("do not separate sold as set labels")],
  },
  {
    id: "suffocation-labels",
    category: "bagging",
    name: "Suffocation warning labels",
    emoji: "⚠️",
    need: "if-needed",
    why: "Only if your polybags don't already have the warning printed on them.",
    rules: [
      "Required on every polybag with an opening 12.5 cm or wider",
      "On the front of the bag, large enough to read at arm's length",
      "Amazon sets the wording: “WARNING: To avoid danger of suffocation, keep this plastic bag away from babies and children. Do not use this bag in cribs, beds, carriages or playpens. This bag is not a toy.”",
    ],
    lesson: { label: "Module 5, Lesson 2", href: `${M5}/polybag` },
    search: [ebay("suffocation warning labels"), amazon("suffocation warning labels")],
  },
  {
    id: "brand-sticker",
    category: "bagging",
    name: "Brand or shop sticker",
    emoji: "🏷️",
    need: "recommended",
    why: "A small sticker with your trading name, logo or shop name, often a 30 to 50 mm circle or square in a brand colour.",
    rulesTitle: "Why it's worth it",
    rules: [
      "Not needed for the shipment itself",
      "It's your permanent brand marker for the GTIN exemption",
      "For the exemption photos, seal it inside the bag with the product so it shows through. A sticker stuck on the outside gets the application rejected",
    ],
    lesson: { label: "Module 4, Lesson 2", href: `${M4}/gtin` },
    search: [ebay("custom logo stickers 40mm"), amazon("custom logo stickers")],
  },
  {
    id: "printer",
    category: "printing",
    name: "Inkjet or laser printer",
    emoji: "🖨️",
    need: "essential",
    why: "Any home printer that can handle 100g+ adhesive label paper. You print your labels yourself.",
    rulesTitle: "Get it right",
    rules: [
      "Print at 100% scale, never “Fit to page”: it shrinks barcodes below the 0.4 mm bar width Amazon's scanners need",
      "New printer? Print one test page and scan the barcode with your phone camera before printing the full sheet",
    ],
    lesson: { label: "Module 5, Lesson 5", href: `${M5}/labels` },
    search: [],
  },
  {
    id: "label-sheets",
    category: "printing",
    name: "Adhesive label sheets (21 per A4)",
    emoji: "📄",
    need: "essential",
    why: "For your FNSKU labels, one per unit.",
    rulesTitle: "What to look for",
    rules: [
      "21-per-A4 layout: Avery L7160 or any compatible 63.5 × 38.1 mm sheet",
      "Adhesive label paper, not regular paper with sticky tape",
      "Each FNSKU goes on the flattest face of the bag, as the only barcode the scanner can see",
    ],
    tip: "Any Avery L7160-compatible sheet from an office supplier works.",
    lesson: { label: "Module 5, Lesson 5", href: `${M5}/labels` },
    search: [ebay("Avery L7160 compatible labels"), amazon("L7160 labels 21 per sheet")],
  },
  {
    id: "a4-paper",
    category: "printing",
    name: "Plain A4 paper",
    emoji: "📃",
    need: "essential",
    why: "For the carrier shipping label and Amazon's shipment ID label: one sheet per outer box.",
    rulesTitle: "How to use it",
    rules: ["Print at 100% scale", "Cut along the line between the two labels and apply each one separately"],
    lesson: { label: "Module 5, Lesson 5", href: `${M5}/labels` },
    search: [],
  },
  {
    id: "thermal-printer",
    category: "printing",
    name: "Thermal label printer and rolls",
    emoji: "⚡",
    need: "optional",
    why: "Prints one sticky label at a time using heat instead of ink, for example a DYMO LabelWriter. Faster and cheaper once you ship often, but not needed to start.",
    rules: [],
    tip: "If you use one, choose the thermal-label format in the Send to Amazon wizard.",
    lesson: { label: "Module 5, Lesson 5", href: `${M5}/labels` },
    search: [ebay("thermal label printer"), amazon("thermal label printer")],
  },
  {
    id: "box",
    category: "box",
    name: "Twin-wall cardboard box",
    emoji: "📦",
    need: "essential",
    why: "Double-walled corrugated cardboard, big enough to hold all your polybagged units with a little padding around them.",
    rules: [
      "No single side longer than 63.5 cm",
      "23 kg maximum when packed, including the box itself",
      "Over 23 kg? Split it into two boxes",
      "Peel off or cover any old shipping labels from a previous use",
    ],
    lesson: { label: "Module 5, Lesson 3", href: `${M5}/box` },
    search: [ebay("double wall cardboard boxes"), amazon("double wall cardboard boxes")],
  },
  {
    id: "packing-tape",
    category: "box",
    name: "50 mm packing tape",
    emoji: "🩹",
    need: "essential",
    why: "Brown or clear parcel tape. Avoid masking tape or anything that peels in transit.",
    rulesTitle: "How to tape the box",
    rules: [
      "At least three strips across the opening seam",
      "One strip down each side for reinforcement",
      "Attach the shipping labels with clear tape, keeping it off the barcodes",
    ],
    lesson: { label: "Module 5, Lesson 3", href: `${M5}/box` },
    search: [ebay("50mm parcel tape"), amazon("50mm packing tape")],
  },
  {
    id: "void-fill",
    category: "box",
    name: "Void fill",
    emoji: "🫧",
    need: "essential",
    why: "Kraft paper or air pillows to fill empty space, so nothing moves in transit.",
    rulesTitle: "How to pack",
    rules: [
      "Pack so nothing moves when you shake the box gently",
      "A box that rattles damages your bundles, and your account health when customers receive crushed units",
      "Avoid loose foam peanuts",
    ],
    tip: "Paper is cheaper, air pillows are lighter.",
    lesson: { label: "Module 5, Lesson 3", href: `${M5}/box` },
    search: [ebay("kraft paper void fill"), amazon("air pillows packaging")],
  },
  {
    id: "heavy-labels",
    category: "box",
    name: "Heavy Package labels",
    emoji: "🏋️",
    need: "if-needed",
    why: "A bright black-and-yellow “HEAVY PACKAGE - TEAM LIFT” sticker for heavier boxes.",
    rules: [
      "Under 15 kg: ship as normal",
      "15 to 23 kg: apply the label before handing the box to the carrier",
      "Over 23 kg: split into two boxes",
      "On the same face as, or next to, the shipping label",
    ],
    tip: "Pre-printed sticker rolls are cheaper than printing your own once you ship more than a handful.",
    lesson: { label: "Module 5, Lesson 3", href: `${M5}/box` },
    search: [ebay("heavy package team lift labels"), amazon("heavy package labels")],
  },
  {
    id: "scale",
    category: "tools",
    name: "Kitchen or parcel scale",
    emoji: "⚖️",
    need: "essential",
    why: "Anything that reads up to 25 kg accurately. You'll weigh single units and the finished box.",
    rulesTitle: "How to weigh",
    rules: [
      "Weigh the closed box before you create the shipment",
      "Round up to the nearest 100 g",
      "Amazon re-weighs every box. A mismatch of more than a few hundred grams triggers a non-compliance flag",
    ],
    lesson: { label: "Module 5, Lesson 4", href: `${M5}/shipment` },
    search: [ebay("parcel scale 25kg"), amazon("parcel scale 25kg")],
  },
  {
    id: "tape-measure",
    category: "tools",
    name: "Tape measure",
    emoji: "📏",
    need: "essential",
    why: "For your packed bundles and the outer box. A 30 cm ruler works for small boxes.",
    rulesTitle: "How to measure",
    rules: [
      "Measure all three dimensions of the packed box and round up by 2 mm",
      "Measure each bundle packed and polybagged. Going 1 mm past a size-tier boundary can add £0.50 to £1.50 per unit in fees",
    ],
    lesson: { label: "Module 5, Lesson 4", href: `${M5}/shipment` },
    search: [ebay("tape measure"), amazon("tape measure 5m")],
  },
  {
    id: "calipers",
    category: "tools",
    name: "Calipers",
    emoji: "📐",
    need: "optional",
    why: "For measuring your prototype bundle precisely before you send anything in, so you know its size tier for certain.",
    rulesTitle: "Why it matters",
    rules: [
      "A polybag can add 3 mm of slack, enough to push a pack into the Standard Parcel tier",
      "That can cost an extra £1.50 per unit on every sale",
    ],
    lesson: { label: "Module 1, Unit Economics", href: "/dashboard/modules/29b20c1c-884d-8077-b9c5-e7e5d68384e8/unit_economics" },
    search: [ebay("digital calipers"), amazon("digital calipers")],
  },
];
