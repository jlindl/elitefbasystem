import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ApplyCta } from "../../components/blog/apply-cta";
import { PostBody } from "../../components/blog/mdx";
import { PreferredSourceCard } from "../../components/blog/preferred-source-card";
import { PostCard } from "../../components/blog/post-card";
import { PostJsonLd } from "../../components/blog/post-json-ld";
import { Footer } from "../../components/footer";
import { Nav } from "../../components/nav";
import { getAllPosts, getPost, getRelatedPosts, headingId } from "../../lib/blog";
import { BLOG_PATH, OG_LOCALE, SITE_NAME } from "../../lib/blog-config";
import "../blog.css";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// Only posts that exist at build time; anything else is a 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: `Not found | ${SITE_NAME}` };
  const url = `${BLOG_PATH}/${post.slug}`;
  const full = `${post.title} | ${SITE_NAME}`;
  return {
    title: { absolute: full.length <= 60 ? full : post.title },
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: post.category,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post);

  return (
    <>
      <Nav />
      <main id="main" className="pb-24 pt-32 md:pt-40">
        <article className="mx-auto max-w-[760px] px-5 sm:px-6">
          <PostJsonLd post={post} />
          <nav aria-label="Breadcrumb" className="flex gap-2 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-subtle">
            <Link href={BLOG_PATH} className="hover:text-ink">Blog</Link>
            <span aria-hidden="true">/</span>
            <Link href={`${BLOG_PATH}#${headingId(post.category)}`} className="hover:text-ink">{post.category}</Link>
          </nav>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.1rem)] font-medium leading-[1.06] tracking-[-0.035em] text-ink">
            {post.title}
          </h1>
          <p className="mt-5 text-[1.15rem] text-ink-muted">{post.excerpt}</p>
          <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[0.9rem] text-ink-subtle">
            <span>By {post.author}</span>
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span>{post.readMinutes} min read</span>
          </p>

          {post.sections.length > 2 ? (
            <details className="mt-10 rounded-2xl border border-line bg-surface p-5">
              <summary className="cursor-pointer font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink">In this guide</summary>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink-muted">
                {post.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="hover:text-accent-deep">{s.text}</a>
                  </li>
                ))}
              </ol>
            </details>
          ) : null}

          <div className="mt-10">
            <PostBody source={post.body} />
          </div>
          <PreferredSourceCard name="Elite FBA" domain="elitefba.co.uk" className="mt-10 text-ink" />
          <ApplyCta />
        </article>

        {related.length > 0 ? (
          <section aria-labelledby="related" className="mx-auto mt-20 max-w-[1200px] px-5 sm:px-6 md:px-8">
            <h2 id="related" className="font-display text-[1.6rem] font-medium tracking-[-0.03em] text-ink">Keep reading</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
