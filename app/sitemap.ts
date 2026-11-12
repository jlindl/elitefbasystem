import type { MetadataRoute } from "next";

import { getAllPosts } from "./lib/blog";
import { BLOG_PATH, absoluteUrl } from "./lib/blog-config";

// Rebuilt on every deploy, so new blog posts need no manual step. Public pages
// only: the member area, checkout and sign-in are left out (see robots.ts).
const PAGES = ["/", "/my-story", "/results", "/contact"];
const LEGAL = ["/privacy", "/terms", "/disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newest = posts[0]?.updated ?? posts[0]?.date;
  return [
    ...PAGES.map((path) => ({ url: absoluteUrl(path), changeFrequency: "weekly" as const, priority: path === "/" ? 1 : 0.8 })),
    ...LEGAL.map((path) => ({ url: absoluteUrl(path), changeFrequency: "yearly" as const, priority: 0.3 })),
    ...(posts.length > 0
      ? [{ url: absoluteUrl(BLOG_PATH), lastModified: newest, changeFrequency: "weekly" as const, priority: 0.8 }]
      : []),
    ...posts.map((p) => ({
      url: absoluteUrl(`${BLOG_PATH}/${p.slug}`),
      lastModified: p.updated ?? p.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
