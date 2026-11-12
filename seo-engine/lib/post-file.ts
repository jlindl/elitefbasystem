/**
 * Turns a generated article into a post file in the site's format.
 *
 * This is the adapter between the engine and the site. Elite FBA's blog groups
 * posts by category, which comes from the topic's entry in data/services.json;
 * the rest are the engine's keys. The site's loader (app/lib/blog.ts) reads them.
 *
 * Site-owned: `install.mjs --upgrade` replaces this file, so copy these
 * changes back after an upgrade.
 */
import matter from "gray-matter";
import { BLOG_CATEGORIES } from "../../app/lib/blog-config";
import { config } from "../config";
import type { Article } from "./claude";
import type { Topic } from "./topics";

type SiteTopicFields = { category?: string };

export function buildPostFile(article: Article, topic: Topic, date: string): string {
  const extra: SiteTopicFields = topic.type === "service" ? (topic.service as SiteTopicFields) : {};
  const category =
    extra.category && (BLOG_CATEGORIES as readonly string[]).includes(extra.category)
      ? extra.category
      : config.site.categories[topic.type];

  const data: Record<string, unknown> = {
    title: article.title,
    slug: article.slug,
    description: article.metaDescription,
    excerpt: article.excerpt,
    date,
    type: topic.type,
    category,
    targetKeyword: article.targetKeyword,
    ...(topic.type === "location"
      ? { location: topic.location.name, region: topic.location.region }
      : { service: topic.service.name }),
    audience: topic.audience.name,
    author: config.site.author,
    topicKey: topic.key,
  };

  return matter.stringify(`\n${article.body.trim()}\n`, data);
}
