import type { QuizQuestion } from "../_components/lesson-quiz";

const MODULE_1_ID = "29b20c1c-884d-8077-b9c5-e7e5d68384e8";
const MODULE_2_ID = "29b20c1c-884d-8066-a004-d51fa41bb93d";
const MODULE_3_ID = "29b20c1c-884d-80fe-9004-dc3735899118";
const MODULE_4_ID = "29b20c1c-884d-8020-901c-e9c36fb64c9c";
const MODULE_5_ID = "29b20c1c-884d-8036-b117-fb46fa089178";

export const MODULE_EXAM_PASS_THRESHOLD = 0.7;

export const MODULE_REQUIRED_TABS: Record<string, string[]> = {
  [MODULE_1_ID]: [
    "basics",
    "infrastructure",
    "prime",
    "fees",
    "case_study",
    "unit_economics",
  ],
  [MODULE_2_ID]: [
    "preflight",
    "plans",
    "registration",
    "approval",
    "tour",
    "hygiene",
  ],
  [MODULE_3_ID]: [
    "mindset",
    "hunting",
    "validation",
    "helium",
    "bundles",
    "wholesale",
  ],
  [MODULE_4_ID]: [
    "foundations",
    "gtin",
    "copywriting",
    "html",
    "images",
    "form",
  ],
  [MODULE_5_ID]: [
    "prep",
    "polybag",
    "box",
    "shipment",
    "labels",
    "shipping",
  ],
};

export const MODULE_QUIZZES: Record<string, QuizQuestion[]> = {
  [MODULE_1_ID]: [
    {
      question: "What does the acronym FBA stand for?",
      options: [
        "Fast Bundling Algorithm",
        "Featured Brand Account",
        "Fulfilment by Amazon",
        "Fixed-Buy Arbitrage",
      ],
      correctIndex: 2,
      explanation:
        "FBA is Fulfilment by Amazon. You ship a single box of stock to Amazon and they handle storage, picking, packing, shipping, and front-line returns from there.",
    },
    {
      question:
        "In the FBA partnership, which two responsibilities sit with you, the seller?",
      options: [
        "Picking and packing customer orders",
        "Researching products and shipping a single box into Amazon",
        "Running customer support and processing returns",
        "Operating the Amazon warehouse robotics",
      ],
      correctIndex: 1,
      explanation:
        "You own the digital and sourcing side: research, listings, and getting one consolidated box into Amazon. Amazon owns the physical fulfilment from that point on.",
    },
    {
      question:
        "In the Lean Model, how many units do we test a new bundle with first?",
      options: [
        "1 unit",
        "10 to 12 units",
        "Around 100 units",
        "500 units or more",
      ],
      correctIndex: 1,
      explanation:
        "We validate demand with 10 to 12 units sourced from retail. Small enough to risk pocket change, large enough to read demand clearly before any wholesale commitment.",
    },
    {
      question:
        "What is the FNSKU and what does it do?",
      options: [
        "A buyer loyalty code that unlocks discounts",
        "A barcode Amazon assigns that ties a unit of stock to your seller account",
        "A storage fee multiplier applied in Q4",
        "An identifier Amazon prints on customer invoices",
      ],
      correctIndex: 1,
      explanation:
        "The FNSKU (Fulfilment Network Stock Keeping Unit) is the barcode you print and apply over the retail barcode. It tells Amazon which seller a unit belongs to.",
    },
    {
      question:
        "Why does Amazon's Stow algorithm split your inventory across multiple regional warehouses?",
      options: [
        "To increase your storage costs",
        "To slow delivery in low-density areas",
        "To keep stock physically close to every customer so Prime delivery stays fast",
        "For tax reporting purposes",
      ],
      correctIndex: 2,
      explanation:
        "Stow distributes your stock across regional hubs so a picker is always nearby no matter where a customer orders from. That proximity is what makes Prime delivery feel instant.",
    },
    {
      question:
        "Who handles a customer's 'where is my parcel' question on a Prime FBA order?",
      options: [
        "You, manually, through Seller Central",
        "A third-party customer service contractor you appoint",
        "Amazon, using live carrier tracking data",
        "The carrier's own support line directly",
      ],
      correctIndex: 2,
      explanation:
        "Amazon intercepts the buyer's Contact Seller message and answers it themselves using live tracking. You see zero of those messages, which keeps the operation hands-off.",
    },
    {
      question:
        "Roughly what share of UK households now hold a Prime membership?",
      options: [
        "About 1 in 10",
        "About 1 in 4",
        "More than 1 in 2",
        "Almost every household",
      ],
      correctIndex: 2,
      explanation:
        "More than half of UK households now hold Prime. The badge is the default expectation for the majority of British shoppers, not a niche feature.",
    },
    {
      question:
        "Which is the practical, recommended route for a third-party seller to earn the Prime badge?",
      options: [
        "Pay a monthly application fee to Amazon",
        "Use Fulfilment by Amazon (FBA)",
        "Apply for Seller-Fulfilled Prime and run your own warehouse",
        "It is automatic on every listing",
      ],
      correctIndex: 1,
      explanation:
        "FBA gives you the Prime badge automatically the moment your stock is scanned into a fulfilment centre. No application form, no performance criteria, no ongoing upkeep.",
    },
    {
      question:
        "Which three fee layers does Amazon deduct from every FBA sale?",
      options: [
        "VAT, listing fee, and currency conversion",
        "Subscription, advertising, and refund fees",
        "Referral fee, FBA fulfilment fee, and monthly storage fee",
        "Payment processing, packaging, and insurance",
      ],
      correctIndex: 2,
      explanation:
        "Every FBA sale carries the same three layers: a 15% referral fee on the retail price, a flat FBA fulfilment fee based on size and weight, and a monthly storage fee per cubic foot.",
    },
    {
      question:
        "In the everyday categories the Elite FBA framework targets, what is the referral fee percentage?",
      options: ["5%", "10%", "15%", "25%"],
      correctIndex: 2,
      explanation:
        "In Grocery, Beauty, Home, Personal Care, and Toys, Amazon takes a flat 15% of the total retail price at checkout.",
    },
    {
      question:
        "What happens to monthly storage fees during the October to December peak period?",
      options: [
        "They are waived for active sellers",
        "They stay the same",
        "They roughly triple",
        "They are passed on to the buyer",
      ],
      correctIndex: 2,
      explanation:
        "From October to December, Amazon triples monthly storage fees to push slow-moving inventory out and free up space for high-velocity stock during the holiday rush.",
    },
    {
      question:
        "What does ASIN stand for, and why does the Elite FBA framework care about it?",
      options: [
        "Amazon Sales Indicator Number; it tracks ad spend",
        "Amazon Standard Identification Number; it is the unique code that defines a product listing",
        "Authorised Stock Item Number; it grants reseller rights",
        "Automated Shipping Inventory Number; it routes inbound shipments",
      ],
      correctIndex: 1,
      explanation:
        "ASIN stands for Amazon Standard Identification Number. Every product on Amazon has one. Owning a unique bundle ASIN means there is nobody else for Amazon to rotate the Buy Box to.",
    },
    {
      question:
        "Why does bundling two or more standalone products together let you own your own listing?",
      options: [
        "Amazon gives bundles preferential ranking",
        "The combination registers as a brand-new product, earning its own brand-new ASIN that only you sell on",
        "Bundles are exempt from the 15% referral fee",
        "Amazon assigns a free trademark to bundle listings",
      ],
      correctIndex: 1,
      explanation:
        "A unique combination is a new SKU in Amazon's eyes. New SKU means new ASIN. You created the listing, so from day one you are the only seller on it.",
    },
    {
      question:
        "Which of the following is one of the Three Levers of Healthy Bundle Economics?",
      options: [
        "Advertising spend",
        "Procurement",
        "Customer review count",
        "Brand registry status",
      ],
      correctIndex: 1,
      explanation:
        "The three levers are Price, Procurement, and Packaging. Procurement is the per-component cost, and it is usually the lever that moves the most as you transition from retail sourcing into wholesale.",
    },
    {
      question:
        "What is the minimum net profit per unit the floor rule allows on a new bundle?",
      options: ["£0.50", "£2", "£5", "£20"],
      correctIndex: 2,
      explanation:
        "The floor is £5 net profit per unit on conservative assumptions. Anything thinner will be wiped out by Q4 storage, fee revisions, or normal return rates.",
    },
  ],

  [MODULE_2_ID]: [
    {
      question:
        "Why does preparation beat speed when opening an Amazon seller account?",
      options: [
        "Amazon offers a fast-track for prepared sellers",
        "Each verification failure costs you another cycle, often a week each, so missing documents at registration adds weeks to the timeline",
        "Speed bonuses are calculated daily",
        "Prepared sellers pay lower fees",
      ],
      correctIndex: 1,
      explanation:
        "Amazon's verification is strict and slow when it fails. Every mismatch triggers a re-check that takes days. Walking in fully prepared cuts the timeline from weeks to days.",
    },
    {
      question:
        "Which kind of address must you supply during Step 3 of the registration wizard?",
      options: [
        "Any P.O. box",
        "A residential address where you can collect post for the verification postcard",
        "Your accountant's office",
        "Amazon's UK head office",
      ],
      correctIndex: 1,
      explanation:
        "Amazon mails a physical verification postcard with a PIN to the residential address you provide. Use somewhere you actually live (or can collect post from) within the next two weeks.",
    },
    {
      question:
        "Which Professional-plan feature is essential and unavailable on the Individual plan?",
      options: [
        "Listing photos",
        "Buy Box eligibility, ungating restricted categories, and Sponsored Ads",
        "Customer support",
        "Order notifications",
      ],
      correctIndex: 1,
      explanation:
        "Buy Box eligibility, ungating applications, Sponsored Ads, and bulk listing tools are all Professional-only. The Buy Box alone makes the Individual plan unworkable for our bundling strategy.",
    },
    {
      question:
        "At roughly how many units per month does Professional become cheaper than Individual?",
      options: ["10", "33", "100", "500"],
      correctIndex: 1,
      explanation:
        "Professional is £25 a month flat; Individual is £0.75 per item. The break-even is at 33 units a month, roughly one a day.",
    },
    {
      question:
        "On which Amazon domain should you start the seller registration if you are based in the UK?",
      options: [
        "sell.amazon.com",
        "sell.amazon.co.uk",
        "amazon.com/sell",
        "amazon.co.uk/business",
      ],
      correctIndex: 1,
      explanation:
        "Start on sell.amazon.co.uk. The marketplace you register on becomes your home marketplace, and switching is painful.",
    },
    {
      question:
        "What is the 30-day window during the registration referring to?",
      options: [
        "Money-back guarantee for the Professional plan",
        "Time limit to enter the PIN from the verification postcard before the registration is voided",
        "Number of free product listings",
        "Free trial of Sponsored Ads",
      ],
      correctIndex: 1,
      explanation:
        "Amazon posts a 5-digit PIN by Royal Mail. You have 30 days from when it is sent to enter it in Seller Central. Miss the window and you must restart the address verification.",
    },
    {
      question:
        "What is the most common reason document uploads get rejected?",
      options: [
        "Wrong language",
        "Wrong file format",
        "Photo quality: glare, finger in frame, shadow on the document, or cropped edges",
        "Document is too old",
      ],
      correctIndex: 2,
      explanation:
        "Most document rejections come from photo quality issues. Lay the document flat on a dark surface, even indirect light, no obstructions, show all four corners.",
    },
    {
      question:
        "What is the verifier on the video call primarily looking for?",
      options: [
        "Your sales projections",
        "That you are the same person on the ID, answering naturally in your own words",
        "Whether you own a warehouse",
        "Your credit score",
      ],
      correctIndex: 1,
      explanation:
        "The video call confirms identity match (you vs the ID) and authenticity (you answering naturally vs reading a script). It is not a business review.",
    },
    {
      question:
        "What is the recovery process if your account is suspended during verification?",
      options: [
        "There is no recovery; the account is permanently lost",
        "Submit a short three-section Plan of Action (Root Cause, Immediate Action, Long-Term Action) via the Performance > Account Health page",
        "Email the CEO",
        "Pay a reinstatement fee",
      ],
      correctIndex: 1,
      explanation:
        "Suspension is recoverable through a formal Plan of Action submitted in Seller Central. Keep it short, factual, and structured. Two paragraphs per section is more effective than two pages.",
    },
    {
      question:
        "Which Seller Central menu would you use to apply for a GTIN exemption on a new bundle?",
      options: ["Inventory", "Reports", "Catalog", "Help"],
      correctIndex: 2,
      explanation:
        "GTIN exemption applications live in the Catalog menu, alongside the Add a Product flow and the gated-category approval requests.",
    },
    {
      question:
        "Where do you check your Account Health rating and Order Defect Rate?",
      options: ["Inventory", "Performance", "Pricing", "Advertising"],
      correctIndex: 1,
      explanation:
        "Account Health, ODR, Late Shipment Rate, and policy warnings all live under the Performance menu. Check it weekly; it is where suspensions are previewed.",
    },
    {
      question:
        "What is Stranded Inventory?",
      options: [
        "Stock waiting at customs",
        "Stock that has lost its listing and is silently accumulating storage fees until you fix it",
        "Stock being returned by customers",
        "Stock damaged in transit",
      ],
      correctIndex: 1,
      explanation:
        "Stranded Inventory is stock whose listing got suppressed (typo, ASIN suspended, etc.). It sits in the Inventory menu burning storage fees until you republish or remove it.",
    },
    {
      question:
        "Which day-one hygiene task is the single highest-leverage action against account hijacking?",
      options: [
        "Setting the return address",
        "Enabling two-step verification with an authenticator app",
        "Configuring notification preferences",
        "Adding a backup payment method",
      ],
      correctIndex: 1,
      explanation:
        "Two-step verification with a TOTP authenticator app (not SMS) is the highest-leverage account security action. A hijacked Amazon seller account stops disbursing funds and can be drained quickly.",
    },
    {
      question:
        "What happens if you skip the UK tax interview after registration?",
      options: [
        "Nothing, it is optional",
        "Amazon withholds 24% of every disbursement for US tax compliance until you complete it",
        "Your account is suspended",
        "Amazon files your tax return for you",
      ],
      correctIndex: 1,
      explanation:
        "The US-flavoured tax interview is not optional. Amazon withholds 24% of every disbursement until you complete it. Do it on day one to get paid in full.",
    },
    {
      question:
        "Why do we park Brand Registry as a 'later' task rather than completing it on day one?",
      options: [
        "It costs too much",
        "It requires a pending or registered trademark, which we do not file until our first bundle has validated demand",
        "It is only for US sellers",
        "It is included automatically with Professional",
      ],
      correctIndex: 1,
      explanation:
        "Brand Registry requires a filed trademark application. We do not file the trademark until Phase 2 of the blueprint validates demand (covered in Module 6), so Brand Registry sits parked until then.",
    },
  ],

  [MODULE_3_ID]: [
    {
      question:
        "What is the difference between a multi-pack bundle and a complementary pair bundle?",
      options: [
        "Multi-packs are illegal on Amazon; complementary pairs are not",
        "A multi-pack is three or more of the same item; a complementary pair is two different items that solve the same problem together",
        "Multi-packs require a barcode; complementary pairs do not",
        "There is no difference",
      ],
      correctIndex: 1,
      explanation:
        "Multi-pack: same item repeated (3-pack of shampoo). Complementary pair: distinct items that go together (shampoo + matching conditioner). Both are valid bundle routes; we lean towards multi-packs for the first few listings.",
    },
    {
      question:
        "Why do we walk physical shops instead of relying entirely on online research?",
      options: [
        "Amazon bans online-only sellers",
        "Physical shops surface upstream opportunities and arbitrage gaps that do not show up in any data tool",
        "Online research is illegal",
        "Shops give cashback",
      ],
      correctIndex: 1,
      explanation:
        "Data tools only show what is already selling on Amazon. The interesting opportunities are products that sell well at retail but have no bundle representation on Amazon yet, and you only find those by walking aisles.",
    },
    {
      question:
        "Why are local mini markets and corner shops a useful hunting ground for bundle candidates?",
      options: [
        "They sell stock at cheaper prices than Amazon",
        "The brands repeatedly on their shelves are by definition supplied by accessible cash-and-carry wholesalers, signalling consistent ongoing supply",
        "They give discounts to bulk buyers",
        "They are open later than other shops",
      ],
      correctIndex: 1,
      explanation:
        "Mini market owners buy stock from regional cash-and-carry wholesalers in small case quantities. The brands that appear repeatedly across multiple independent shops are exactly the ones an accessible wholesaler is willing to supply to a small business, which is the supply profile we want for ongoing reorders.",
    },
    {
      question:
        "What does Best Seller Rank (BSR) tell you about a listing?",
      options: [
        "The age of the listing",
        "Amazon's ranking of how well the listing sells in its main category, with lower number meaning more sales",
        "The number of negative reviews",
        "The price band of the listing",
      ],
      correctIndex: 1,
      explanation:
        "BSR is the rank of the listing within its category by sales velocity. A BSR of 1 means it is the best-selling item in that category right now. Lower number = faster sales.",
    },
    {
      question:
        "What BSR range counts as a 'green light' in a broad Amazon category like Beauty or Grocery?",
      options: [
        "Above 500,000",
        "Above 200,000",
        "Under 20,000",
        "Under 5,000 only",
      ],
      correctIndex: 2,
      explanation:
        "A BSR under 20,000 in a broad category means the listing sells at least 10 units a day. Plenty of market for a bundle to capture 10 to 20% from.",
    },
    {
      question:
        "If a candidate product has 35 sellers on the single-unit Amazon listing, is that a red flag for our bundle strategy?",
      options: [
        "Yes, always",
        "Not necessarily, because we are not joining their fight; we are building our own bundle listing with its own ASIN",
        "Yes, unless Amazon Retail is one of them",
        "Only on weekdays",
      ],
      correctIndex: 1,
      explanation:
        "A crowded single-unit listing is fine because our bundle has its own brand-new ASIN with zero sellers competing. The crowd is just evidence that demand exists.",
    },
    {
      question:
        "Why is it a problem if Amazon Retail (sold by Amazon directly) is on the single-unit listing?",
      options: [
        "Amazon takes a higher commission",
        "Amazon's unpredictable pricing often undercuts third-party bundles and erodes the margin window",
        "Amazon will copy your bundle",
        "It is not a problem",
      ],
      correctIndex: 1,
      explanation:
        "Amazon Retail prices aggressively and unpredictably. Building a bundle in a category where Amazon itself is racing the single-unit price to the floor is fighting a moving target.",
    },
    {
      question:
        "What is Helium 10 X-Ray and why do we use it?",
      options: [
        "A paid analytics platform we subscribe to",
        "A free Chrome extension that overlays sales estimates, BSR, revenue, and listing quality on any Amazon search page",
        "Amazon's own internal dashboard for sellers",
        "A keyword research tool from Jungle Scout",
      ],
      correctIndex: 1,
      explanation:
        "X-Ray is the free Chrome-extension feature from Helium 10. It paints estimated monthly sales, revenue, BSR, review count, and listing quality scores onto every Amazon search result.",
    },
    {
      question:
        "Are we using the paid Helium 10 plan for product research?",
      options: [
        "Yes, the Platinum plan",
        "No, the free tier of Helium 10 is sufficient for X-Ray-based research",
        "Yes, only on weekends",
        "Yes, we always use paid tools",
      ],
      correctIndex: 1,
      explanation:
        "The free X-Ray feature is enough for everything we do in Module 3. We do not use the paid plans for research; we may discuss paid features later in marketing (Module 7), but not here.",
    },
    {
      question:
        "How accurate are Helium 10's sales estimates?",
      options: [
        "Exactly accurate to the unit",
        "Approximately accurate within 20% on most listings, but can be off by 50% on low-velocity or small-niche items",
        "Always 100% wrong",
        "Only accurate for US listings",
      ],
      correctIndex: 1,
      explanation:
        "X-Ray estimates are good but imperfect. Treat them as one signal among several, not gospel. Cross-reference with BSR and review count for sanity.",
    },
    {
      question:
        "What is the verdict in the Bundle Scorecard when 4 of 5 criteria pass?",
      options: [
        "Skip the bundle entirely",
        "Conditional Go: address the failing criterion before committing capital",
        "Immediate Go regardless of which one fails",
        "Restart from Lesson 1",
      ],
      correctIndex: 1,
      explanation:
        "4 of 5 is a Conditional Go. The bundle has merit but there is one specific gap (often margin or sourcing) that needs explicit fixing before you spend money.",
    },
    {
      question:
        "How do you find the UK distributor of a brand by looking at the product itself?",
      options: [
        "The barcode encodes it",
        "UK packaging law requires the importer or distributor's name and address to be printed on the back, usually under 'Distributed by' or 'Imported by'",
        "Distributors are never named",
        "Call Amazon and ask",
      ],
      correctIndex: 1,
      explanation:
        "Look at the back of any UK consumer product. The 'Distributed in the UK by' or 'Imported by' line names the distributor. Search that company online to find their wholesale contact.",
    },
    {
      question:
        "How many questions should the first cold email to a wholesale distributor contain?",
      options: [
        "One single question",
        "Three focused questions: can we work together, at what scale, at what price",
        "Ten questions",
        "Twenty questions to look thorough",
      ],
      correctIndex: 1,
      explanation:
        "Three questions. More than three signals you have no idea what you are doing. The three should answer whether the relationship is possible, the minimum order, and indicative pricing.",
    },
    {
      question:
        "What is the typical timeline from cold email to first wholesale order?",
      options: [
        "Same day",
        "Roughly four to six weeks, including follow-ups, sample requests, and terms agreement",
        "Six months",
        "Two days",
      ],
      correctIndex: 1,
      explanation:
        "Wholesale moves slowly. Cold email, reply the following week, samples and conversation over the next two weeks, first order in week four to six. Plan around this rather than waiting on it.",
    },
    {
      question:
        "Why should you not pursue more than three or four supplier conversations at the same time?",
      options: [
        "Amazon limits supplier accounts",
        "Each conversation needs real attention and your follow-up cadence falls apart at higher volume; better to land one strong relationship a month than to start ten and follow up on none",
        "Suppliers talk to each other",
        "It is illegal",
      ],
      correctIndex: 1,
      explanation:
        "Wholesale relationships are won on attention. Four parallel threads is the upper limit before your follow-up quality collapses. One good relationship per month is the realistic target.",
    },
  ],
  [MODULE_4_ID]: [
    {
      question:
        "Which three jobs does every Amazon listing have to do?",
      options: [
        "Visibility, click, and conversion",
        "Branding, pricing, and shipping",
        "SEO, PPC, and reviews",
        "Photos, text, and reviews",
      ],
      correctIndex: 0,
      explanation:
        "Every part of a listing exists to do one of three jobs: get found (visibility), get clicked (click), or get bought (conversion). The title and search terms drive visibility, the main image and price drive clicks, and the bullets, description, and reviews drive conversion.",
    },
    {
      question:
        "Why do we list under the 'Generic' brand in Module 4 rather than registering a trademark first?",
      options: [
        "Generic listings rank higher on Amazon",
        "It removes the need for a trademark, a barcode, or Brand Registry, so you can publish a v1 test listing fast",
        "Amazon charges lower fees on Generic-brand listings",
        "It is the only way to list a bundle on Amazon",
      ],
      correctIndex: 1,
      explanation:
        "Listing under Generic is the fastest legal route to publishing. You do not need a registered trademark, a barcode, or Brand Registry. Module 6 covers the trademark setup once the bundle has proven it works.",
    },
    {
      question:
        "What is a GTIN exemption?",
      options: [
        "A discount on FBA fees",
        "Permission from Amazon to publish a listing without a barcode (GTIN/UPC/EAN) on the product",
        "An exemption from paying VAT on UK sales",
        "Approval to use a competitor's brand name",
      ],
      correctIndex: 1,
      explanation:
        "A GTIN exemption is Amazon's formal permission to list a product that does not have a standard barcode. It is granted by category and applied for through Seller Central with a set of product photos showing your brand name permanently attached to the packaging.",
    },
    {
      question:
        "What is the single most common reason a GTIN exemption application is rejected?",
      options: [
        "The brand name is too short",
        "The product price is too high",
        "The brand-name sticker is stuck on the outside of the packaging where it could be peeled off",
        "The seller has too few reviews on their account",
      ],
      correctIndex: 2,
      explanation:
        "Amazon needs the brand name to be permanently attached to the packaging. A sticker on the outside is treated as temporary because it can be peeled off and swapped. Sealing the brand-name sticker inside the bag with the product, or printing the brand name directly onto the packaging, fixes this on the second attempt.",
    },
    {
      question:
        "What is the recommended workflow for writing the listing title, bullets, and description?",
      options: [
        "Hire a copywriter and pay them for a full draft",
        "Use an AI assistant to draft against a structured prompt, then edit by hand",
        "Copy the top-ranking competitor word-for-word",
        "Write everything in pure HTML from scratch",
      ],
      correctIndex: 1,
      explanation:
        "AI produces a competent first draft fast. You always read, edit, and tighten the output. The course provides three structured prompts (title, bullets, description) as reliable starting points; the human edit pass is non-negotiable.",
    },
    {
      question:
        "When editing AI-drafted copy, what is the most important first pass?",
      options: [
        "Add more adjectives",
        "Strip filler words like 'enjoy', 'experience', 'revolutionary'",
        "Translate it into multiple languages",
        "Make every sentence longer",
      ],
      correctIndex: 1,
      explanation:
        "AI loves soft filler words. They make copy sound generic and reduce conversion. Run a find-and-strike on those exact words first; the sentences almost always read better without them.",
    },
    {
      question:
        "Why do we convert the description to HTML before pasting it into Amazon?",
      options: [
        "Amazon ranks HTML descriptions higher in search",
        "Amazon collapses plain-text line breaks into one block of prose; HTML preserves paragraph breaks and emphasis",
        "Amazon charges extra for plain text",
        "HTML is the only format Amazon accepts",
      ],
      correctIndex: 1,
      explanation:
        "Amazon's description field renders plain text as a wall of prose. The supported HTML tags (paragraph, bold, line break) preserve structure and emphasis, making the description scannable and lifting conversion.",
    },
    {
      question:
        "Which free tool does the course recommend for converting plain prose into Amazon-compatible HTML?",
      options: [
        "Notepad++",
        "The SellerApp Amazon Product Description Editor",
        "Microsoft Word",
        "Photoshop",
      ],
      correctIndex: 1,
      explanation:
        "The SellerApp web tool at sellerapp.com is a free public utility. Paste plain prose in, click convert, copy the HTML out. The course uses no other part of the SellerApp platform.",
    },
    {
      question:
        "What are the three strict rules for the main listing image?",
      options: [
        "Pure white background, product fills 85%+ of frame, no text or props",
        "Lifestyle scene, with a model, on a coloured background",
        "Black background, small product, with logo overlay",
        "Square only, with multiple products visible",
      ],
      correctIndex: 0,
      explanation:
        "The main image must use RGB 255 255 255 white, the product must fill at least 85% of the frame, and there must be no text, badges, logos, hands, models, or watermarks. Amazon strips non-compliant main images on sight.",
    },
    {
      question:
        "What is the minimum image dimension Amazon expects on a listing?",
      options: [
        "500 × 500 px",
        "800 × 800 px",
        "1600 × 1600 px (which unlocks zoom)",
        "5000 × 5000 px",
      ],
      correctIndex: 2,
      explanation:
        "1600 × 1600 px is the minimum that unlocks Amazon's zoom feature, which materially lifts conversion. 2000 × 2000 is ideal. All seven slots should be at least 1600 px on the short side.",
    },
    {
      question:
        "How many image slots does Amazon give you on a standard listing?",
      options: ["3", "5", "7", "10"],
      correctIndex: 2,
      explanation:
        "Amazon provides seven slots: one main image plus six secondaries. Listings that fill all seven outconvert listings with only one or two by 20 to 30%. The slots are free; use them.",
    },
    {
      question:
        "Which tool is best for image slots that need text overlays, infographics, or benefit callouts?",
      options: ["A DSLR camera", "Canva", "Excel", "VLC Media Player"],
      correctIndex: 1,
      explanation:
        "Canva is the right tool for any image needing text or graphic elements (infographics, benefit callouts, size comparison panels). Its free tier includes Amazon listing image templates pre-sized to 2000 × 2000.",
    },
    {
      question:
        "When entering package dimensions in the listing form, how should the bundle be measured?",
      options: [
        "Bare product without any packaging",
        "Polybagged and labelled as it will ship, rounded up by 2mm on each axis",
        "Just the largest single component",
        "Estimated from a similar product on Amazon",
      ],
      correctIndex: 1,
      explanation:
        "Package dimensions feed the FBA size tier calculation directly. Measure the polybagged, labelled bundle with a tape measure, round up by 2mm per axis, and Amazon's Cubiscan in the warehouse will agree with your figure.",
    },
    {
      question:
        "What should the backend Search Terms field contain?",
      options: [
        "Repeated copies of your title",
        "Competitor brand names",
        "Keywords that did not fit naturally into the title or bullets, separated by spaces, no commas",
        "URLs to your other listings",
      ],
      correctIndex: 2,
      explanation:
        "Search Terms are the keyword surface area not already covered by your title and bullets. Up to 250 bytes. Separate with spaces, no commas, no competitor brands, no repeats of words already in your title. Amazon silently strips violations.",
    },
    {
      question:
        "Once you submit a listing for review, what state is it in until you ship inventory to FBA?",
      options: [
        "Pending Brand Registry approval",
        "Active on Amazon but the buy box reads 'Currently unavailable' until stock arrives at the warehouse",
        "Permanently locked from editing",
        "Visible only to Amazon staff",
      ],
      correctIndex: 1,
      explanation:
        "An approved listing is technically Active, the URL works, and customers can find it. The buy box reads 'Currently unavailable' until inbound stock lands at FBA, which is exactly what Module 5 covers next.",
    },
  ],
  [MODULE_5_ID]: [
    {
      question:
        "How many required labels or warnings go on every compliant FBA polybag (for a multi-unit bundle)?",
      options: ["1", "2", "3", "5"],
      correctIndex: 2,
      explanation:
        "Three required: the FNSKU label, the suffocation warning (mandated by Amazon on every polybag wider than 12.5 cm), and the Do Not Separate label on multi-unit bundles. The optional fourth is your brand or shop sticker, which doubles as the permanent brand marker for the GTIN exemption.",
    },
    {
      question:
        "What does the FNSKU label identify on a bundle?",
      options: [
        "The shipping address",
        "Which seller, which product, and which condition",
        "The carrier and tracking number",
        "The weight and dimensions of the box",
      ],
      correctIndex: 1,
      explanation:
        "The FNSKU is a barcode unique to your SKU. It encodes which seller it belongs to, which product, and which condition. One per individual sellable unit, applied to the outside of every polybag.",
    },
    {
      question:
        "What is the Do Not Separate label for?",
      options: [
        "Telling the carrier not to drop the box",
        "Telling Amazon's warehouse to keep multi-unit bundles together as a single sellable unit",
        "Stopping Amazon refunding partial orders",
        "Marking the box as fragile",
      ],
      correctIndex: 1,
      explanation:
        "The Do Not Separate label is mandatory on any polybag containing more than one physical unit sold under a single SKU (a 3-pack, a 2-pack). It tells warehouse staff to pick the whole bundle together rather than splitting the units across inventory.",
    },
    {
      question:
        "What is the maximum weight of a single outer box you can send into FBA?",
      options: ["10 kg", "15 kg", "23 kg", "30 kg"],
      correctIndex: 2,
      explanation:
        "23 kg is the maximum for the complete packed box including the box itself. Over that, split into two smaller boxes. Boxes over the limit can be refused at the warehouse door.",
    },
    {
      question:
        "What is the maximum length of any single side of an FBA outer box?",
      options: ["30 cm", "50 cm", "63.5 cm", "100 cm"],
      correctIndex: 2,
      explanation:
        "63.5 cm (25 inches) on the longest side. The other two can be shorter. Most multipack bundle boxes sit well under this; only oversized categories hit the limit.",
    },
    {
      question:
        "What rule applies if your packed outer box weighs more than 15 kg?",
      options: [
        "Amazon will not accept the box at all",
        "You must apply a Heavy Package warning sticker to the outside",
        "You must double-tape every seam",
        "You must split it into three smaller boxes",
      ],
      correctIndex: 1,
      explanation:
        "Any outer box weighing 15 kg or more (up to the 23 kg maximum) requires a bright Heavy Package warning sticker on the outside, telling the carrier and warehouse staff to treat it as a two-person lift. A box over 15 kg without this label can be refused on arrival with a non-compliance fee.",
    },
    {
      question:
        "Inside the Send to Amazon wizard, which option should you pick for the FNSKU labels on a v1 shipment?",
      options: [
        "Amazon labels (Amazon applies them for you for a per-unit fee)",
        "Merchant labels (you print and apply them yourself)",
        "Skip labels for now and label at the warehouse later",
        "Use the supplier's barcode",
      ],
      correctIndex: 1,
      explanation:
        "Merchant labels every time. Cheaper, faster, and you control which face of the bag the label sits on. Amazon's label service is a paid convenience that only makes sense for very large per-unit volumes.",
    },
    {
      question:
        "What is the standard receipt-side delivery method to choose for a typical small inbound shipment?",
      options: [
        "Less-Than-Truckload (LTL)",
        "Small Parcel Delivery (SPD)",
        "Full container",
        "Pallet via freight forwarder",
      ],
      correctIndex: 1,
      explanation:
        "SPD covers individual boxes shipped via a parcel carrier (UPS, DPD). It is the default for the size of inbound shipments produced by Module 5. LTL only becomes relevant for pallets of stock, which is well beyond a v1 launch.",
    },
    {
      question:
        "Why pick Amazon's Partnered Carrier (UPS or DPD) over arranging your own courier?",
      options: [
        "Amazon legally requires it",
        "Amazon has negotiated a discounted rate and tracking feeds back into Seller Central automatically",
        "Other carriers cannot deliver to Amazon warehouses",
        "Partnered carriers ship the same day",
      ],
      correctIndex: 1,
      explanation:
        "Partnered Carrier rates are materially cheaper than buying the same service at retail, and tracking is wired into Seller Central automatically. Only switch to another carrier if you have a pre-existing courier account that beats Amazon's rate, which is rare for shipments under 50 kg.",
    },
    {
      question:
        "Which UK carriers does Amazon use as Partner Carriers?",
      options: [
        "Royal Mail and Yodel",
        "UPS and DPD",
        "Hermes and Evri",
        "FedEx and TNT",
      ],
      correctIndex: 1,
      explanation:
        "In the UK, Amazon's Partner Carriers are UPS and DPD. Both appear inside the Send to Amazon wizard under the Partnered Carrier option at the discounted rate.",
    },
    {
      question:
        "When printing FNSKU labels from a PDF, what print scale should you use?",
      options: [
        "Fit to page",
        "75% to save ink",
        "100% (actual size)",
        "200% so they are big enough to read",
      ],
      correctIndex: 2,
      explanation:
        "100% actual size, never Fit to page. Fit-to-page shrinks the barcode below the scanner's minimum bar width and the labels fail at receiving, even though they look fine to your eye.",
    },
    {
      question:
        "What is the typical UK timeline from handing the box to the carrier to your listing's buy box going live?",
      options: [
        "Same day",
        "1 to 2 working days",
        "7 to 12 working days",
        "4 to 6 weeks",
      ],
      correctIndex: 2,
      explanation:
        "Usually 7 to 12 working days. UPS or DPD transit is 1 to 3 days; receiving and check-in at the FC adds 3 to 7 days more. Q4 periods (November, December, Prime Day week) sit at the longer end of that range.",
    },
    {
      question:
        "What inbound shipment status means every unit has been checked into your sellable inventory?",
      options: [
        "Working",
        "In Transit",
        "Receiving",
        "Closed",
      ],
      correctIndex: 3,
      explanation:
        "Closed is the final status. The progression you watch in Seller Central is Working → Shipped → In Transit → Delivered → Receiving → Closed. When the status hits Closed, your sellable inventory count for the SKU has incremented and the buy box on your listing goes live.",
    },
    {
      question:
        "What is the practical reason for pre-printed polybags with the suffocation warning already on them?",
      options: [
        "They are cheaper per bag",
        "They eliminate one label-printing step every shipment for about 10p extra per bag",
        "Amazon refuses bags without the warning pre-printed",
        "They are made of stronger plastic",
      ],
      correctIndex: 1,
      explanation:
        "Pre-printed bags carry the suffocation warning embedded on the bag itself, so you skip one label-printing and label-applying step per unit. For a first shipment of 25-50 units the extra 10p per bag is worth the saved time and consistency.",
    },
    {
      question:
        "Why should you measure your outer box with a tape measure and weigh it on a scale before entering the figures in Seller Central?",
      options: [
        "Amazon offers a discount for accurate declarations",
        "Amazon's Cubiscan re-measures every inbound box and a mismatch triggers a non-compliance fee",
        "The carrier refuses to collect mislabelled boxes",
        "It is required for tax purposes",
      ],
      correctIndex: 1,
      explanation:
        "Amazon's warehouse re-measures every inbound box on the Cubiscan system. If your declared dimensions or weight are smaller than reality, you get bumped into a higher size tier with a non-compliance fee. Measure and weigh the packed box, round up, enter accurately.",
    },
  ],
};
