import Link from "next/link";
import { evaluate } from "@mdx-js/mdx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as runtime from "react/jsx-runtime";

import { headingId } from "../../lib/blog";
import { ApplyCta } from "./apply-cta";

// MDX rendering for posts. Styling comes from .blog-prose in app/blog/blog.css.
// Posts are trusted repo content (hand-written or from the SEO engine, whose
// quality gate rejects imports, exports and unknown components). A component
// added here must also be named in seo-engine/site.config.ts (ctaComponent).

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function A({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) return <Link href={href}>{children}</Link>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

function H2({ children }: ComponentPropsWithoutRef<"h2">) {
  return <h2 id={headingId(textOf(children))}>{children}</h2>;
}

const components = { a: A, h2: H2, ApplyCta };

export async function PostBody({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, { ...runtime });
  return (
    <div className="blog-prose">
      <Content components={components} />
    </div>
  );
}
