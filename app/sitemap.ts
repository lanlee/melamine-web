import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Generated at build time and served from the site's own origin, so the
 * Sitemap URL declared in robots.txt is always on the same host — a
 * requirement for Google to accept it without cross-host verification.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    // When the blog routes merge (see branch `blog-section`), append them here:
    //
    //   import { posts } from "@/lib/blog";
    //
    //   ...posts.map((post) => ({
    //     url: `${SITE_URL}/blog/${post.slug}`,
    //     lastModified: new Date(post.date),
    //     changeFrequency: "monthly",
    //     priority: 0.7,
    //   })),
  ];
}
