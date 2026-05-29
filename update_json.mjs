import fs from 'fs';
import path from 'path';

const filePath = path.resolve('app/dashboard/_lib/modules_content.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data[0] = {
  id: "29b20c1c-884d-8077-b9c5-e7e5d68384e8",
  name: "Module 1 - Introduction to Amazon FBA (Wholesale & Bundling)",
  blocks: [
    { type: "video", content: "Module 1: The Blueprint to 6-Figures" },
    { type: "heading_1", content: "Welcome to the Amazon Jungle" },
    { type: "paragraph", content: "Welcome. If you’re reading this, you’ve already taken the first step into building a real, scalable Amazon FBA business. This isn’t a theory course or a 'get-rich-quick' playbook. It’s a battle-tested system built from actually selling on Amazon and learning what works the hard way." },
    { type: "paragraph", content: "You won’t find Lamborghinis or overnight success stories here. What you will find is a practical, low-risk way to start selling on Amazon without burning cash, making rookie mistakes, or guessing what to do next. Let's get to work." },
    
    { type: "heading_2", content: "Part 1: Understanding The Ecosystem" },
    { type: "heading_3", content: "What FBA Actually Is" },
    { type: "paragraph", content: "Amazon FBA stands for 'Fulfilled by Amazon'. In simple terms, it means you leverage Amazon's multi-billion dollar logistics network to run your business." },
    { type: "bulleted_list_item", content: "You source the products and send them in bulk to an Amazon Fulfillment Center." },
    { type: "bulleted_list_item", content: "Amazon stores your inventory securely." },
    { type: "bulleted_list_item", content: "When a customer buys on Amazon.com (or .co.uk), Amazon's warehouse staff picks, packs, and ships the item via Prime delivery." },
    { type: "bulleted_list_item", content: "Amazon handles customer service and returns." },
    { type: "paragraph", content: "But here’s the most important thing you need to understand: FBA is NOT a business model. It is purely infrastructure. Your actual business model dictates how you source those products. That brings us to the three main ways to sell on Amazon." },
    
    { type: "heading_2", content: "Part 2: Choosing Your Weapon (The Business Models)" },
    { type: "paragraph", content: "Most beginners fail because they choose the wrong business model for their budget and experience level. Here is a breakdown of the three main paths:" },
    { type: "callout", content: "1. Retail / Online Arbitrage (High Effort, Low Scalability): This involves driving to clearance aisles at local stores or scanning discount websites to find items selling cheaper than they are on Amazon. While you can make quick cash, it is a hustle. You can rarely replenish the same items, meaning you are always hunting." },
    { type: "callout", content: "2. Private Label (High Risk, High Reward, Very Slow): This is what 90% of 'gurus' teach. You find a generic product in China (e.g., a garlic press), slap a custom logo on it, order 1,000 units, wait 2 months for sea shipping, and then spend thousands of dollars on Amazon PPC ads trying to force your product to rank on Page 1. If it fails, you are left with a garage full of useless stock." },
    { type: "callout", content: "3. Wholesale (Medium Risk, High Scalability, Fast Validation): You open accounts with authorized distributors or brands, buy products in bulk at wholesale prices, and sell them on Amazon. You are selling products that already have massive demand (e.g., popular shampoo, big toy brands, everyday household items). You don't need to run ads because people are already searching for the brand." },
    
    { type: "heading_2", content: "Part 3: The Elite FBA Strategy (Wholesale + Bundling)" },
    { type: "paragraph", content: "We do not do Private Label here. The risk of sinking £5,000 into unproven stock from China is too high for a beginner. We focus purely on Wholesale. However, standard Wholesale has one massive flaw." },
    { type: "heading_3", content: "The Flaw of Standard Wholesale" },
    { type: "paragraph", content: "If you buy a popular bottle of shampoo from a wholesaler and list it on Amazon, 20 other sellers might do the exact same thing. You all share the same product listing page. To win the 'Buy Box' (the yellow Add to Cart button), sellers start lowering their prices by a penny. This creates a 'race to the bottom,' destroying everyone's profit margins." },
    
    { type: "heading_3", content: "The Solution: The Bundle Strategy" },
    { type: "paragraph", content: "To completely eliminate competition and protect your profit margins, we create Bundles." },
    { type: "image", content: "/bundling_diagram.png" },
    { type: "paragraph", content: "A bundle is exactly what it sounds like: combining two or more highly complementary wholesale products to create a brand new, unique offering." },
    { type: "bulleted_list_item", content: "Example 1: Instead of selling just 'Dashboard Cleaner Spray', you bundle it with a 'Premium Microfiber Cloth' and 'Air Freshener'." },
    { type: "bulleted_list_item", content: "Example 2: A 'New Puppy Starter Kit' bundling specific branded puppy pads, a chew toy, and training treats." },
    { type: "paragraph", content: "Because YOU created this specific combination, you create a brand new ASIN (Amazon Standard Identification Number) in the Amazon catalog. You are the ONLY seller on this listing. If a customer wants that specific bundle, they must buy it from you at your price. No price tanking. No Buy Box sharing." },
    
    { type: "heading_2", content: "Part 4: The Anatomy of a Perfect Bundle" },
    { type: "paragraph", content: "Not all bundles are created equal. You cannot just throw random items together. A 'Frankenstein Bundle' (e.g., dog food bundled with a spatula) will fail miserably. A successful bundle provides immense convenience or solves a specific problem." },
    { type: "heading_3", content: "Types of Winning Bundles:" },
    { type: "bulleted_list_item", content: "The Multi-Pack: The simplest bundle. Selling a 3-pack or 6-pack of a popular consumable item (like toothpaste or dog treats) that is normally only sold individually." },
    { type: "bulleted_list_item", content: "The 'Complete Solution': A kit that provides everything needed for a task (e.g., A wall-painting kit with brushes, rollers, tape, and a tray)." },
    { type: "bulleted_list_item", content: "The 'Gift Set': Curating items into a beautiful presentation box for holidays, birthdays, or specific demographics." },
    
    { type: "heading_2", content: "Part 5: Launching 'Generic' (The Lean Startup Method)" },
    { type: "paragraph", content: "When you create a new bundle listing, Amazon usually requires a unique UPC barcode and a registered brand name. Buying barcodes and registering trademarks takes time and money." },
    { type: "paragraph", content: "Our strategy is to bypass this initially by launching the bundle under the 'Generic' brand name. Amazon allows 'Generic' listings to be created without a UPC barcode (via a process called GTIN Exemption)." },
    { type: "callout", content: "The 'Proof of Concept' Phase: Launching Generic allows us to test a bundle idea with just 10 or 20 units. We spend £50 instead of £5,000. We put it on Amazon. If it doesn't sell, we lost almost nothing. But if it flies off the virtual shelves, we now have validated data." },
    { type: "paragraph", content: "Once a Generic bundle is proven to sell 5-10 units a day consistently, we take the profits and scale. That is when we form a Limited Liability Company, register a trademark, apply for Amazon Brand Registry, and take ownership of the listing to protect it from copycats forever." },

    { type: "heading_2", content: "Part 6: Mindset and Expectations" },
    { type: "paragraph", content: "This is a real business. It requires patience, capital management, and resilience. Your first product bundle does not need to be a home run. It just needs to get on base. Progress beats perfection." },
    { type: "bulleted_list_item", content: "Expect to reinvest your profits for the first 3-6 months. Do not pull cash out too early." },
    { type: "bulleted_list_item", content: "Expect to make mistakes. You might buy a slow-moving product. That is part of the tuition of learning the business." },
    { type: "bulleted_list_item", content: "Follow the system. Do not skip ahead. Do not try to launch a Private Label product because you saw a TikTok video about it." },

    { type: "heading_2", content: "Action Steps for This Module" },
    { type: "to_do", content: "Watch the 'Blueprint to 6-Figures' introductory video at the top of this module." },
    { type: "to_do", content: "Ensure you fully understand the difference between Private Label and Wholesale." },
    { type: "to_do", content: "Understand why Bundling protects your profit margins and prevents 'Buy Box' wars." },
    { type: "to_do", content: "Understand the concept of launching a 'Generic' listing to test demand with low risk." },
    { type: "to_do", content: "Take a walk through a local retail store (Tesco, B&Q, etc.) and try to spot two items that could be bundled logically." }
  ]
};

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log("Updated modules_content.json successfully with expanded content!");
