import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Answer engines and AI crawlers we want reading the site. The wildcard rule
 * below already admits them, but naming them keeps that intent explicit and
 * guards against a future blanket block quietly cutting off AI search
 * citations.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
      },
    ],
    // Must be same-origin with the URLs it lists, or Google rejects the file.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
