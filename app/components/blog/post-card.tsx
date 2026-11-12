import Link from "next/link";

import type { Post } from "../../lib/blog";
import { BLOG_PATH } from "../../lib/blog-config";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`${BLOG_PATH}/${post.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
    >
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-subtle">
        {post.category} · {post.readMinutes} min read
      </p>
      <h3 className="mt-3 font-display text-[1.2rem] font-medium leading-snug tracking-[-0.02em] text-ink group-hover:text-accent-deep">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-[0.95rem] text-ink-muted">{post.excerpt}</p>
      <time dateTime={post.date} className="mt-5 text-[0.85rem] text-ink-subtle">
        {post.dateLabel}
      </time>
    </Link>
  );
}
