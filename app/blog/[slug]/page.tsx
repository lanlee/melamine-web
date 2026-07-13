import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title + " | Guangdong HanCheng Material",
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

function formatContent(content: string): string {
  return content
    .replace(/^\n/gm, "")
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-slate-900 mt-10 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-slate-900 mt-10 mb-4">$1</h3>')
    .replace(/^\*\*(.+?)\*\*/gm, '<strong>$1</strong>')
    .replace(/^\|(.+)\|$/gm, (m: string) => {
      const cells = m.split("|").filter(Boolean).map((c: string) => c.trim());
      if (cells.every((c: string) => /^[- ]+$/.test(c))) return "";
      return (
        "<tr>" +
        cells.map((c: string) => "<td class='border border-slate-200 px-4 py-2 text-sm text-slate-600'>" + c + "</td>").join("") +
        "</tr>"
      );
    })
    .replace(/^[-*] (.+)$/gm, '<li class="text-slate-600 ml-5 list-disc mb-1.5">$1</li>')
    .replace(/\n\n/g, "</p><p class='text-slate-600 leading-relaxed mb-4'>")
    .replace(/<p class='text-slate-600 leading-relaxed mb-4'>/, "")
    .trim();
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const html = formatContent(post.content);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav spacer */}
      <div className="h-24" />

      <main className="max-3xl mx-auto px-6 py-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-indigo-500 transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <article className="max-w-3xl">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 mb-4">
            <time dateTime={post.date}>{post.date}</time>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{post.author}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div
            className="mt-10 prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>

        {/* CTA */}
        <div className="max-w-3xl mt-16 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-10">
          <h3 className="text-xl font-bold text-slate-900">
            Looking for Premium Melamine?
          </h3>
          <p className="text-slate-500 mt-2">
            Guangdong HanCheng Material supplies high-purity melamine powder (≥99.8%) to buyers worldwide. Contact us for a quote.
          </p>
          <a
            href="/#contact"
            className="inline-block mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors duration-200 text-sm"
          >
            Get a Quote
          </a>
        </div>

        {/* Back to blog */}
        <div className="max-w-3xl mt-10">
          <Link
            href="/blog"
            className="text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
          >
            &larr; Back to all articles
          </Link>
        </div>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-slate-500 text-xs">
          <span>© 2026 Guangdong HanCheng Material. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
