import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

interface PostMeta {
  slug: string;
  date: string;
  image?: string;
}

/**
 * Read the blog frontmatter so the sitemap is generated from the same source
 * as the pages themselves. New posts are picked up on the next deploy with no
 * manual sitemap edit.
 */
function getPosts(): PostMeta[] {
  const dir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const frontMatter = raw.split("---")[1] || "";
      const getField = (key: string) => {
        const match = frontMatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
        return match ? match[1].trim().replace(/^["']|["']$/g, "") : undefined;
      };
      return { slug: file.replace(/\.md$/, ""), date: getField("date") || "", image: getField("image") };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Content only changes when a deploy ships new or edited markdown, so anchor
 * lastmod to the newest post instead of the build time. A lastmod that moves
 * on every build is noise Google learns to ignore.
 */
function contentLastModified(posts: PostMeta[]): Date {
  const dates = posts.map((p) => p.date).filter(Boolean).sort();
  return new Date(dates.length > 0 ? dates[dates.length - 1] : "2026-09-10");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const lastModified = contentLastModified(posts);

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(post.image ? { images: [new URL(post.image, SITE_URL).toString()] } : {}),
    })),
  ];
}
