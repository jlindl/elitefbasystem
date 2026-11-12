/**
 * Everything specific to this website. The engine code reads this file and
 * never needs editing per site; topics live in data/*.json.
 *
 * Only put verifiable facts in `about`. The model is told it may state facts
 * about the business from that list and nothing else, so an invented fact here
 * becomes an invented fact in every post.
 *
 * Elite FBA is one mentorship sold UK-wide and online, so only topic
 * ("service") posts are written, like CloudKicks, PoundMart and mylife/:
 * town-by-town posts would be doorway pages. Each topic in data/services.json
 * carries its own category.
 *
 * Where the facts come from (check them again when the site changes): the
 * homepage's own copy, app/components/{hero,about,mentorship,pricing,
 * curriculum,faq}.tsx, as of 12 Nov 2026.
 */
export const site = {
  /** Business or brand name, as articles should write it. */
  name: "Elite FBA",
  /** Canonical origin, no trailing slash. SITE_URL or NEXT_PUBLIC_SITE_URL override it. */
  url: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.elitefba.co.uk",
  /** Where every article must link: the mentorship application section on the homepage. */
  contactPath: "/#apply",
  /** URL prefix for posts: a post lives at `${blogPath}/${slug}`. */
  blogPath: "/blog",
  /** Folder the site reads posts from, relative to the repo root. */
  contentDir: "content/blog",
  /** "mdx": posts may use `ctaComponent` and must compile as MDX. */
  format: "mdx" as "mdx" | "md",
  /** An MDX component posts may place once mid-article. Registered in app/components/blog/mdx.tsx. */
  ctaComponent: "ApplyCta" as string | null,
  /** Frontmatter `author`. */
  author: "Elite FBA",
  /** "Today" and post dates use this timezone. */
  timeZone: "Europe/London",
  /** Spelling and usage for every article. */
  language: "en-GB" as "en-GB" | "en-US",
  /** Which post types each run writes (one of each per run). */
  postTypes: { location: false, service: true },
  /** Fallback category; each topic in data/services.json sets its own (see lib/post-file.ts). */
  categories: { location: "Getting started", service: "Getting started" },

  /** Facts about the business that articles may state. Short, checkable, one per line. */
  about: [
    "Elite FBA is a 1-to-1 Amazon FBA mentorship run by Jakub, who sells on Amazon UK full-time.",
    "Jakub built his Amazon FBA business on the side of a 9-5 job, with capital saved from that job, and only left once the income was steady enough to replace his salary.",
    "Jakub still runs his own Amazon FBA business every day: ordering inventory, refining listings, dealing with suppression notices and reading PPC reports.",
    "The mentorship includes a weekly 1-to-1 strategy call with Jakub (about 20 minutes, recorded) and direct messaging between calls, usually answered within hours on weekdays.",
    "Members get the Elite FBA course (9 modules with video walkthroughs), Jakub's own SOPs, supplier email and negotiation scripts, listing audits and launch checklists, recorded listing and ad teardowns, and a private community with meetups.",
    "The 9 course modules are: Introduction to Amazon FBA, Opening Your First Seller Account, Product Research, Listing Creation, Sending to Amazon, Launching a Brand, Marketing, Expansion, and Long-Term Maintenance.",
    "The Elite FBA approach is the lean model: validate a product with a small test batch before scaling, and only scale what sells.",
    "Elite FBA teaches wholesale and bundling: building multi-pack or bundle listings from products sourced in physical shops, online directories and wholesale suppliers.",
    "The course covers listing under a generic brand with a GTIN exemption, so a bundle can be listed without a barcode, and later moving from reseller to protected brand owner.",
    "The course covers preparing and polybagging bundles, the labels and warnings each unit needs, packing outer boxes, the heavy package rules, and creating and tracking an FBA shipment.",
    "Places are limited because every student gets real 1-to-1 time; applying starts with a WhatsApp chat, and if places are full you go on a waiting list.",
    "Elite FBA has no upsells: one programme, with lifetime updates as Amazon changes.",
  ],
  /** Who reads the blog and what they care about. */
  readers:
    "UK beginners and early sellers looking into Amazon FBA: people with a 9-5 who want a side business, people who have never sold online, and people who have opened a seller account but are stuck on product research, listings, shipping stock in or getting their first sales. They come from Google with a practical question (how to start Amazon FBA in the UK, how much stock to buy first, how to make a bundle listing, how to send a shipment, what FBA costs) and want a straight, honest answer they can act on, not hype or income promises.",
  /** Unused: location posts are off. Kept for the engine's type. */
  locationPitch: "Show how {name} fits {audience} in and around {location}.",
  /** Extra voice notes, added to the defaults (plain, practical, no hype). */
  voice: [
    "Write like an experienced UK seller explaining it to a friend over a coffee: plain, direct, practical, a little blunt about what does not work. Contractions are welcome. Never use exclamation marks.",
    "Lead with the direct answer in the first paragraph, then the steps, the numbers to check and the mistakes to avoid.",
    "Most of every article must be useful on its own: steps, checklists, what to look for in Seller Central, what to test first. Then, where it genuinely fits, say in one or two short passages how the Elite FBA mentorship helps with that step, using only the facts given. Never turn a section into a sales pitch.",
    "Write the brand as Elite FBA and the mentor as Jakub. Do not write in the first person as Jakub, and never invent anything he said, did or sold.",
    "UK context throughout: Amazon.co.uk, Seller Central UK, VAT and HMRC, Royal Mail and UK couriers, UK wholesalers and high street shops, pounds sterling.",
    "The link to /#apply is where readers apply for the mentorship. Use anchor text such as 'apply for the Elite FBA mentorship' or 'see how the mentorship works', never 'get in touch', 'contact us' or 'get a quote'. The <ApplyCta /> component, if you use it, is a short invitation to apply.",
  ],
  /** Extra hard rules. Enforced by the prompt, not by code. */
  rules: [
    "Never promise, predict or imply earnings, profit, income or results, for the reader or for students. No income figures, revenue figures, 'passive income', 'quit your job' promises or 'get rich' framing. Say plainly that results depend on the products, the work and the market.",
    "Never state Amazon fees, referral percentages, subscription costs, storage fees or any other price or cost as a figure: Amazon changes them. Explain what the fee is and tell readers to check the current figure in Seller Central or on Amazon's own fee pages.",
    "Never state the price of the mentorship, and never say it is free.",
    "Every tactic must follow Amazon's seller policies. Never suggest incentivised or fake reviews, review swaps, multiple seller accounts, listing hijacking, using another brand's trademark or images, keyword stuffing of competitor brand names, or anything that risks a suspension. Where a policy matters, tell readers to check Amazon's current policy in Seller Central Help.",
    "Selling branded products from other brands can need brand approval or invoices from authorised suppliers, and some categories are gated: say so where it matters, and never imply anyone can resell any brand freely.",
    "Tax and VAT: general know-how only, never tax or legal advice and never VAT thresholds or rates as figures. Point readers to GOV.UK, HMRC or an accountant.",
    "Never name software tools, course providers, other mentors or other agencies, and never compare Elite FBA with them. You may name Amazon, Seller Central, Royal Mail, HMRC and GOV.UK where the advice depends on them. Describe other tools generically ('a product research tool', 'a spreadsheet').",
    "Examples are general situations ('a beginner with a 9-5 testing a first bundle'), never named students, quotes, screenshots or results presented as real.",
  ],
  /** Extra banned words or phrases, added to the defaults in config.ts. Plurals are caught automatically. */
  bannedPhrases: [
    "get in touch",
    "contact us",
    "get a quote",
    "free quote",
    "passive income",
    "get rich",
    "financial freedom",
    "six figures",
    "six-figure",
    "seven figures",
    "seven-figure",
    "guaranteed",
    "guarantee",
    "risk-free",
    "quit your job",
    "game-changer",
    "game changer",
    "life-changing",
    "seamless",
    "seamlessly",
    "effortless",
    "effortlessly",
    "supercharge",
    "look no further",
    "secret formula",
  ],
  /** Extra patterns no field may match, checked by code (no "g" flag). */
  forbiddenPatterns: [
    { pattern: /£\s?\d/, name: "price or income in pounds (state no money figures)" },
    { pattern: /\$\s?\d/, name: "price in dollars" },
    { pattern: /\b\d+(\.\d+)?\s?(k|grand|quid|pounds?|pence)\b/i, name: "money figure in words" },
    { pattern: /\b\d+(\.\d+)?\s?%/, name: "percentage (fees and margins change; explain them without figures)" },
    { pattern: /!/, name: "exclamation mark" },
  ] as { pattern: RegExp; name: string }[],
};
