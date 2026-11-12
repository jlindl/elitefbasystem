import type { MetadataRoute } from "next";

import { absoluteUrl } from "./lib/blog-config";

// Crawl the public site; keep out of the member area, checkout, sign-in and APIs.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/auth/", "/dashboard", "/checkout", "/verify", "/certificate-pattern"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
