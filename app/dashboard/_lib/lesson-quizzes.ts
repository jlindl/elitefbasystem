import type { QuizQuestion } from "../_components/lesson-quiz";

const MODULE_1_ID = "29b20c1c-884d-8077-b9c5-e7e5d68384e8";

export const LESSON_QUIZZES: Record<string, QuizQuestion[]> = {
  [`${MODULE_1_ID}::basics`]: [
    {
      question: "What does FBA stand for?",
      options: [
        "Fast Brand Authority",
        "Fulfilment by Amazon",
        "Featured Brand Account",
        "Fixed-Buy Arbitrage",
      ],
      correctIndex: 1,
      explanation:
        "FBA is Fulfilment by Amazon: you rent a tiny corner of Amazon's warehouse network and they handle storage, picking, packing, shipping, and returns.",
    },
    {
      question: "In the FBA partnership, which side does Amazon handle?",
      options: [
        "Finding profitable products to source",
        "Creating your product listings",
        "Storage, picking, packing, shipping, and returns",
        "Choosing which supplier you buy from",
      ],
      correctIndex: 2,
      explanation:
        "Amazon owns the physical side: warehouse storage, picking, packing, shipping to the customer, and front-line returns. You own the digital side: research, listings, and shipping a single box to Amazon.",
    },
    {
      question:
        "Roughly what share of buyers may never see your listing if you skip FBA and miss the Prime badge?",
      options: ["Around 20%", "Around 50%", "Around 80%", "Almost nobody"],
      correctIndex: 2,
      explanation:
        "Most regular shoppers leave the Prime-only filter on. Choosing FBM over FBA removes you from roughly 80% of buyers' search results entirely.",
    },
    {
      question:
        "Which calculation gives your net profit on an FBA sale?",
      options: [
        "Customer payment - product cost",
        "Customer payment - FBA fees",
        "Customer payment - product cost - FBA fees",
        "Customer payment + FBA fees - product cost",
      ],
      correctIndex: 2,
      explanation:
        "Net profit = customer payment minus product cost minus FBA fees. You run this math BEFORE buying any stock. If it does not work, you walk away.",
    },
    {
      question: "In the Lean Model, how many units do we test with first?",
      options: ["1 to 3 units", "10 to 12 units", "Around 100 units", "500 units or more"],
      correctIndex: 1,
      explanation:
        "We test with 10 to 12 units sourced from local retail. If they sell out fast, we reinvest. If they do not, we have only risked pocket change.",
    },
  ],

  [`${MODULE_1_ID}::infrastructure`]: [
    {
      question:
        "What barcode system does Amazon use inside its fulfilment centres to tie a unit of stock to your seller account?",
      options: ["UPC", "EAN", "FNSKU", "GTIN"],
      correctIndex: 2,
      explanation:
        "Amazon uses an FNSKU (Fulfilment Network Stock Keeping Unit). You print it and apply it directly over any retail barcode so Amazon knows the unit is yours.",
    },
    {
      question:
        "Why does Amazon's Stow algorithm split your inventory across multiple regional warehouses?",
      options: [
        "To slow down customer delivery",
        "To increase your storage fees",
        "To maximise delivery speed by keeping stock close to every customer",
        "For tax compliance reasons",
      ],
      correctIndex: 2,
      explanation:
        "Stow distributes your stock across regional hubs so that no matter where a customer orders from, the product is physically close to a picker. That is what keeps Prime delivery fast.",
    },
    {
      question:
        "After how many days in an Amazon warehouse does long-term storage start to bite?",
      options: ["30 days", "90 days", "180 days", "365 days"],
      correctIndex: 2,
      explanation:
        "Anything sitting in an Amazon warehouse beyond 180 days starts attracting Long-Term Storage Fees. The Lean Model (10 to 12 unit test batches) exists to avoid this entirely.",
    },
    {
      question:
        "Who handles the customer support message when a Prime buyer asks where their FBA parcel is?",
      options: [
        "You, the seller",
        "Amazon's support team using live tracking data",
        "A third-party customer service contractor",
        "The shipping carrier directly",
      ],
      correctIndex: 1,
      explanation:
        "Amazon intercepts the buyer's Contact Seller message and answers it themselves with live carrier tracking data. You receive zero messages.",
    },
    {
      question: "In the Seller Central inventory dashboard, what does Reserved mean?",
      options: [
        "Stock that is on its way to Amazon",
        "Stock that is live and available to buy",
        "Stock that is either being moved between warehouses or tied to a pending order",
        "Stock that has been damaged and pulled from sale",
      ],
      correctIndex: 2,
      explanation:
        "Reserved is the in-between bucket: Amazon is either shuffling those units between regional warehouses or has already attached them to a customer order that has not shipped yet.",
    },
  ],

  [`${MODULE_1_ID}::prime`]: [
    {
      question:
        "Roughly what share of UK households hold a Prime membership today?",
      options: ["About 1 in 10", "About 1 in 4", "More than 1 in 2", "Almost every household"],
      correctIndex: 2,
      explanation:
        "More than half of UK households now hold a Prime membership. The badge is the default expectation for the majority of British shoppers, not a niche feature.",
    },
    {
      question:
        "Roughly how much more do Prime members spend on Amazon per year compared to non-members?",
      options: [
        "About the same",
        "Two to three times more",
        "Around ten times more",
        "A hundred times more",
      ],
      correctIndex: 1,
      explanation:
        "Industry analyses consistently estimate Prime members spend two to three times more per year than non-members, driven by higher repeat-purchase rates and larger basket sizes.",
    },
    {
      question:
        "Which is the practical, recommended route for a third-party seller to get the Prime badge?",
      options: [
        "Pay a monthly fee to Amazon",
        "Use Fulfilment by Amazon (FBA)",
        "Sign a contract with Amazon corporate",
        "It is automatic on every listing",
      ],
      correctIndex: 1,
      explanation:
        "FBA gives you the Prime badge automatically the moment your stock is scanned into a fulfilment centre. No application form, no performance criteria, no upkeep.",
    },
    {
      question: "What is Seller-Fulfilled Prime (SFP)?",
      options: [
        "The default Prime programme for all FBA sellers",
        "An alternative route requiring strict on-time delivery performance from your own warehouse",
        "Free shipping for sellers who fulfil their own orders",
        "A pilot programme reserved for Amazon employees",
      ],
      correctIndex: 1,
      explanation:
        "SFP technically lets you keep stock at home and still display the Prime badge, but it requires near-perfect on-time delivery, a packaging audit, and ongoing performance checks. Most sellers fail the metrics within months.",
    },
    {
      question:
        "What is the single signal the Prime badge sends to a buyer most directly?",
      options: [
        "This product has the highest reviews",
        "This product is the cheapest version",
        "This item ships fast, ships free, and is backed by Amazon",
        "This product is on sale today",
      ],
      correctIndex: 2,
      explanation:
        "The badge bundles three guarantees into one symbol: speed, free shipping, and Amazon-backed support if anything goes wrong. That trust transfer is what closes the sale.",
    },
  ],

  [`${MODULE_1_ID}::fees`]: [
    {
      question:
        "Which three fee types does Amazon deduct from every FBA sale before the cash hits your account?",
      options: [
        "VAT, listing fee, and currency conversion",
        "Referral fee, FBA fulfilment fee, and monthly storage fee",
        "Subscription fee, advertising fee, and refund fee",
        "Payment processing, packaging, and insurance",
      ],
      correctIndex: 1,
      explanation:
        "Every FBA sale is hit with the same three layers: a 15% referral fee on the retail price, a flat FBA fulfilment fee based on size and weight, and a monthly storage fee charged per cubic foot.",
    },
    {
      question:
        "Roughly what percentage referral fee does Amazon take in the everyday categories the Elite FBA framework targets?",
      options: ["5%", "10%", "15%", "25%"],
      correctIndex: 2,
      explanation:
        "In Grocery, Beauty, Home, Personal Care, and Toys, the referral fee is a flat 15% of the total retail price the customer pays at checkout.",
    },
    {
      question: "What is the FBA fulfilment fee actually based on?",
      options: [
        "The retail price you charge",
        "The category of the product",
        "The weight and outer dimensions of the packaged bundle",
        "How many units you send in at once",
      ],
      correctIndex: 2,
      explanation:
        "The fulfilment fee is purely a logistics charge. Amazon prices it on the weight and outer dimensions of the finished bundle, so tighter packaging directly lowers the fee.",
    },
    {
      question:
        "What happens to monthly storage fees during the Q4 holiday rush (October to December)?",
      options: [
        "They stay the same",
        "They are waived for active sellers",
        "They roughly triple",
        "They are paid by the buyer instead",
      ],
      correctIndex: 2,
      explanation:
        "From October to December, Amazon triples monthly storage fees to push slow-moving inventory out of the warehouse and free up space for high-velocity stock.",
    },
    {
      question:
        "Why does crossing a size tier boundary by even 1mm matter so much?",
      options: [
        "Amazon rejects the shipment outright",
        "Your referral fee doubles",
        "Your fulfilment fee per unit can jump by £0.50 to £1.50, wiping out projected profit",
        "You lose the Prime badge for that listing",
      ],
      correctIndex: 2,
      explanation:
        "A single millimetre past the boundary bumps the unit into the next tier and adds £0.50 to £1.50 per sale. Across a few hundred units, that one millimetre can erase the entire profit on the bundle.",
    },
  ],

  [`${MODULE_1_ID}::case_study`]: [
    {
      question: "What does ASIN stand for?",
      options: [
        "Amazon Sales Indicator Number",
        "Authorised Stock Item Number",
        "Amazon Standard Identification Number",
        "Automated Shipping Inventory Number",
      ],
      correctIndex: 2,
      explanation:
        "ASIN stands for Amazon Standard Identification Number. It is the unique 10-character code Amazon assigns to every product in its catalogue. Every sale, review, and Buy Box decision is attached to it.",
    },
    {
      question:
        "What happens when you list against an existing ASIN that 30+ other sellers are already on?",
      options: [
        "You are guaranteed an equal share of sales",
        "Amazon rotates the Buy Box between sellers, and prices race to the floor as competitors undercut each other",
        "Amazon hides your listing from buyers",
        "You automatically inherit the highest-rated seller's reviews",
      ],
      correctIndex: 1,
      explanation:
        "On a shared ASIN, Amazon rotates the Buy Box roughly toward whoever is cheapest at that moment. Sellers undercut each other by pennies, margins compress, and your listing earns nothing on most days.",
    },
    {
      question:
        "Why does bundling two or more standalone products together let you own your own listing?",
      options: [
        "Amazon gives a special discount for bundled listings",
        "The combination registers as a brand-new product in Amazon's catalogue, earning its own brand-new ASIN that only you sell on from day one",
        "Bundles bypass the referral fee",
        "Amazon promotes bundles above all other listings",
      ],
      correctIndex: 1,
      explanation:
        "A unique combination of products is treated as a new SKU. Amazon assigns it a brand-new ASIN, you are the seller who created the listing, and from day one there is no Buy Box rotation because there are no other sellers on it.",
    },
    {
      question:
        "In Phase 2 of the blueprint (The Validation Bundle), how many units do we typically test the bundle with?",
      options: [
        "A single unit",
        "12 units",
        "100 units",
        "500 units or more",
      ],
      correctIndex: 1,
      explanation:
        "We buy 12 units of each component from retail shelves and send them to an Amazon fulfilment centre. The batch is small enough to risk pocket change, large enough to read demand clearly.",
    },
    {
      question:
        "Why do we list the bundle under the Generic brand name during the validation phase?",
      options: [
        "Generic listings rank higher in Amazon search",
        "It bypasses trademark and branding costs while we are still proving whether the product will sell",
        "Amazon requires all new sellers to start under Generic",
        "Generic listings are exempt from the 15% referral fee",
      ],
      correctIndex: 1,
      explanation:
        "Using the Generic brand keeps upfront costs at zero. There is no point paying for a trademark, logos, or packaging artwork before the bundle has proven it actually sells. Brand registration comes later in Phase 3, once demand is confirmed.",
    },
  ],

  [`${MODULE_1_ID}::unit_economics`]: [
    {
      question: "What does unit economics measure?",
      options: [
        "Total revenue across all listings in a year",
        "The per-sale profit and loss of a single product after all fees and costs",
        "The number of units sitting in Amazon's warehouse",
        "The total amount you have invested in inventory",
      ],
      correctIndex: 1,
      explanation:
        "Unit economics is the per-sale profit and loss of one product. Operators care about this number because everything downstream (cash flow, scaling, Q4 survival) is a consequence of how healthy each individual unit's economics are.",
    },
    {
      question:
        "Roughly how much more net profit per unit does the bundle in the comparison make versus the single-item listing?",
      options: [
        "About the same",
        "Roughly twice as much",
        "Around five and a half times more",
        "Around fifty times more",
      ],
      correctIndex: 2,
      explanation:
        "Single item nets £0.99 per unit. The bundle nets £5.49 per unit. That is roughly 5.5x more profit per sale from a listing with zero direct competition.",
    },
    {
      question:
        "Which of these is one of the Three Levers of Healthy Bundle Economics?",
      options: [
        "Advertising spend",
        "Procurement",
        "Customer reviews",
        "Brand registry status",
      ],
      correctIndex: 1,
      explanation:
        "The three levers are Price, Procurement, and Packaging. Procurement is the cost per component, and it is usually the lever that moves the most as you scale from retail clearance into wholesale.",
    },
    {
      question:
        "What is the minimum net profit per unit the floor rule allows on a bundle?",
      options: ["£0.50", "£2", "£5", "£20"],
      correctIndex: 2,
      explanation:
        "We do not source a bundle unless it projects at £5 or more net profit per unit on conservative assumptions. Anything thinner will be wiped out by Q4 storage, fee revisions, or normal return rates.",
    },
    {
      question:
        "Why does the Q4 Crusher failure mode kill bundles with margins close to the 30% floor?",
      options: [
        "Amazon stops displaying low-margin listings during Q4",
        "Referral fees increase during the holiday season",
        "Monthly storage fees roughly triple from October to December, which compresses thin margins toward zero",
        "Customers demand bigger discounts in Q4",
      ],
      correctIndex: 2,
      explanation:
        "From October to December, Amazon roughly triples monthly storage fees to push slow stock out of the warehouse. A bundle running at a 25% margin in March can drop to 5% in November, which is why we want margins comfortably above the floor before peak season hits.",
    },
  ],
};
