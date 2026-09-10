import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import BlogNav from "@/components/BlogNav";
import Footer from "@/components/Footer";
import { ORG_ID, SITE_NAME, SITE_URL, WEBSITE_ID, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog | Guangdong HanCheng Material",
  description: "Insights on melamine industry, applications, and supply chain.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Guangdong HanCheng Material",
    description: "Insights on melamine industry, applications, and supply chain.",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
}

function getPosts(): PostMeta[] {
  const dir = path.join(process.cwd(), "content/blog");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const frontMatter = raw.split("---")[1] || "";
    const getField = (key: string) => {
      const match = frontMatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
      return match ? match[1].trim().replace(/^["']|["']$/g, "") : undefined;
    };
    return {
      slug,
      title: getField("title") || slug,
      date: getField("date") || "",
      excerpt: getField("excerpt"),
      image: getField("image"),
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function BlogPage() {
  const posts = getPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        name: `Blog | ${SITE_NAME}`,
        url: `${SITE_URL}/blog`,
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en",
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${SITE_URL}/blog/${post.slug}#article`,
          headline: post.title,
          datePublished: post.date || undefined,
          url: `${SITE_URL}/blog/${post.slug}`,
          ...(post.image ? { image: absoluteUrl(post.image) } : {}),
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/blog#items`,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/blog/${post.slug}`,
          name: post.title,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogNav />
      <main className="pt-32 pb-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-indigo-200 bg-indigo-50 text-[#6366f1] text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
              Blog
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 mb-4">
              Insights & <span className="gradient-text">Updates</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Industry knowledge, product guides, and company news.
            </p>
          </div>
          {posts.length === 0 ? (
            <p className="text-center text-slate-400">No posts yet.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
                >
                  {post.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-xs text-slate-400 font-medium mb-2">
                      {post.date}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#6366f1] transition-colors mb-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-slate-500 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer lang="en" />
    </>
  );
}
