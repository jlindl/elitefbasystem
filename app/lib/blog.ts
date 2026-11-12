// The blog's loader. Every post is an MDX file in content/blog with YAML
// frontmatter, written by the SEO engine (seo-engine/lib/post-file.ts) or by
// hand; the index, the post page and the sitemap all read from here.
// A malformed post fails the build rather than shipping a broken page.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { BLOG_CATEGORIES, SITE_LANG, SITE_NAME, type BlogCategory } from "./blog-config";

export const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type Post = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  updated?: string;
  category: BlogCategory;
  targetKeyword?: string;
  service?: string;
  audience?: string;
  author: string;
  readMinutes: number;
  sections: { id: string; text: string }[];
  faq: { question: string; answer: string }[];
  body: string;
};

const POST_FILE = /\.(mdx|md)$/;
const FAQ_HEADING = "Frequently asked questions";

function fail(file: string, msg: string): never {
  throw new Error(`[blog] ${file}: ${msg}`);
}

function str(data: Record<string, unknown>, key: string, file: string, required = true): string | undefined {
  const v = data[key];
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (v === undefined || v === null || v === "") {
    if (required) fail(file, `missing "${key}"`);
    return undefined;
  }
  if (typeof v !== "string") fail(file, `"${key}" must be a string`);
  return v;
}

function dateLabel(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(SITE_LANG, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function plainText(md: string): string {
  return md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** The id a "## " heading gets, shared by the contents list and the rendered heading. */
export function headingId(text: string): string {
  return plainText(text)
    .toLowerCase()
    .replace(/['\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function countWords(mdx: string): number {
  return mdx
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function faqOf(body: string): Post["faq"] {
  const start = body.search(new RegExp(`^## ${FAQ_HEADING}\\s*$`, "m"));
  if (start < 0) return [];
  return body
    .slice(start)
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [question, ...rest] = block.split("\n");
      return { question: plainText(question), answer: plainText(rest.join(" ").replace(/<[^>]+>/g, " ")) };
    })
    .filter((q) => q.question && q.answer);
}

function parsePost(file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
  const slug = str(data, "slug", file, false) ?? file.replace(POST_FILE, "");
  if (slug !== file.replace(POST_FILE, "")) fail(file, `slug "${slug}" must match the filename`);
  const date = str(data, "date", file)!;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(file, `"date" must be YYYY-MM-DD`);
  const raw = str(data, "category", file, false);
  const category = (BLOG_CATEGORIES as readonly string[]).includes(raw ?? "") ? (raw as BlogCategory) : BLOG_CATEGORIES[0];

  return {
    slug,
    title: str(data, "title", file)!,
    description: str(data, "description", file)!,
    excerpt: str(data, "excerpt", file, false) ?? str(data, "description", file)!,
    date,
    dateLabel: dateLabel(date),
    updated: str(data, "updated", file, false),
    category,
    targetKeyword: str(data, "targetKeyword", file, false),
    service: str(data, "service", file, false),
    audience: str(data, "audience", file, false),
    author: str(data, "author", file, false) ?? SITE_NAME,
    readMinutes: Math.max(1, Math.round(countWords(content) / 230)),
    sections: [...content.matchAll(/^## (.+)$/gm)].map((m) => ({ id: headingId(m[1]), text: plainText(m[1]) })),
    faq: faqOf(content),
    body: content,
  };
}

let cache: Post[] | null = null;

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(BLOG_DIR) ? fs.readdirSync(BLOG_DIR).filter((f) => POST_FILE.test(f)) : [];
  cache = files
    .map(parsePost)
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date)));
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Related posts: same topic first, then same category, then the newest. */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const same = (a?: string, b?: string) => !!a && !!b && a.toLowerCase() === b.toLowerCase();
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: (same(p.service, post.service) ? 4 : 0) + (p.category === post.category ? 3 : 0) }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map(({ p }) => p);
}
