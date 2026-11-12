// The blog's constants: canonical URLs, metadata, the sitemap and the
// categories. Plain TypeScript with no Next imports, because the SEO engine
// (seo-engine/lib/post-file.ts) reads BLOG_CATEGORIES from here too.
// Keep in step with seo-engine/site.config.ts.

/** The site's origin, from NEXT_PUBLIC_SITE_URL, else the live domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.elitefba.co.uk").replace(/\/$/, "");

export const SITE_NAME = "Elite FBA";

/** Where every post's call to action points (seo-engine contactPath). */
export const APPLY_PATH = "/#apply";

export const BLOG_PATH = "/blog";

export const BLOG_TITLE = "Amazon FBA UK guides | Elite FBA";
export const BLOG_DESCRIPTION =
  "Straight answers on starting Amazon FBA in the UK: seller accounts, product research, bundles, listings, sending stock in and building a brand.";

export const SITE_LANG = "en-GB";
export const OG_LOCALE = "en_GB";

/** The index's sections, in order. A post's category comes from its topic in seo-engine/data/services.json. */
export const BLOG_CATEGORIES = [
  "Getting started",
  "Product research",
  "Listings",
  "Shipping to Amazon",
  "Brand and growth",
  "Mentorship",
] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/** Absolute URL for a root-relative path. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
