import type { Metadata } from "next";

import { PostCard } from "../components/blog/post-card";
import { Footer } from "../components/footer";
import { Nav } from "../components/nav";
import { getAllPosts, headingId } from "../lib/blog";
import { BLOG_CATEGORIES, BLOG_DESCRIPTION, BLOG_PATH, BLOG_TITLE, OG_LOCALE, SITE_NAME } from "../lib/blog-config";
import "./blog.css";

export function generateMetadata(): Metadata {
  const hasPosts = getAllPosts().length > 0;
  return {
    title: { absolute: BLOG_TITLE },
    description: BLOG_DESCRIPTION,
    alternates: { canonical: BLOG_PATH },
    // An empty index is thin content; it opens to search engines with the first post.
    robots: hasPosts ? undefined : { index: false, follow: true },
    openGraph: { type: "website", title: BLOG_TITLE, description: BLOG_DESCRIPTION, url: BLOG_PATH, siteName: SITE_NAME, locale: OG_LOCALE },
  };
}

export default function BlogIndex() {
  const posts = getAllPosts();
  const groups = BLOG_CATEGORIES.map((c) => ({ category: c, posts: posts.filter((p) => p.category === c) })).filter(
    (g) => g.posts.length > 0,
  );

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-[1200px] px-5 pb-24 pt-32 sm:px-6 md:px-8 md:pt-40">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-accent">The Elite FBA blog</p>
        <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-ink">
          Amazon FBA in the UK, <span className="font-serif text-accent">explained straight.</span>
        </h1>
        <p className="mt-6 max-w-[60ch] text-[1.1rem] text-ink-muted">{BLOG_DESCRIPTION}</p>

        {posts.length === 0 ? (
          <p className="mt-16 text-ink-muted">The first guides are on their way.</p>
        ) : (
          groups.map((g) => (
            <section key={g.category} aria-labelledby={headingId(g.category)} className="mt-16">
              <h2 id={headingId(g.category)} className="font-display text-[1.6rem] font-medium tracking-[-0.03em] text-ink">
                {g.category}
              </h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.posts.map((p) => (
                  <li key={p.slug}>
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
