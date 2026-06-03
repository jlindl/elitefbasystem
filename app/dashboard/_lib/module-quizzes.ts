import type { QuizQuestion } from "../_components/lesson-quiz";

const MODULE_1_ID = "29b20c1c-884d-8077-b9c5-e7e5d68384e8";

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
        "The three levers are Price, Procurement, and Packaging. Procurement is the per-component cost, and it is usually the lever that moves the most as you transition from retail clearance into wholesale.",
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
};
