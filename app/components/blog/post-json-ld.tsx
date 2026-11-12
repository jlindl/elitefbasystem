import type { Post } from "../../lib/blog";
import { BLOG_PATH, SITE_LANG, SITE_NAME, SITE_URL, absoluteUrl } from "../../lib/blog-config";

// Structured data for a post: the article, its breadcrumb trail and its
// closing questions. Nothing here claims ratings or reviews.
export function PostJsonLd({ post }: { post: Post }) {
  const url = absoluteUrl(`${BLOG_PATH}/${post.slug}`);
  const org = { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL };
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      url,
      mainEntityOfPage: url,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      inLanguage: SITE_LANG,
      articleSection: post.category,
      ...(post.targetKeyword ? { keywords: post.targetKeyword } : {}),
      image: absoluteUrl("/opengraph-image.jpg"),
      author: org,
      publisher: org,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl(BLOG_PATH) },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faq.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      })),
    });
  }
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
