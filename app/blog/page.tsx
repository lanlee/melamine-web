import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Melamine Industry Blog | Guangdong HanCheng Material",
  description:
    "Expert insights on melamine powder, industrial resins, sourcing from China, market trends, and application guides from Guangdong HanCheng Material.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav spacer */}
      <div className="h-24" />

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <span className="text-sm font-semibold text-indigo-500 tracking-wide uppercase">
            Blog
          </span>
          <h1 className="text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Melamine Industry Insights
          </h1>
          <p className="text-lg text-slate-500 mt-4 max-w-2xl">
            Guides, comparisons, and expert advice on melamine sourcing, applications, and market trends — written by the team at Guangdong HanCheng Material.
          </p>
        </div>

        {/* Blog posts */}
        <div className="space-y-10">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group border border-slate-200 rounded-2xl p-8 transition-all duration-300 hover:border-indigo-200 hover:shadow-[0_4px_20px_rgba(99,102,241,0.08)]"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3">
                <time dateTime={post.date}>{post.date}</time>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>{post.author}</span>
              </div>

              <Link href={"/blog/" + post.slug}>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200">
                  {post.title}
                </h2>
              </Link>

              <p className="text-slate-500 mt-3 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={"/blog/" + post.slug}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-500 mt-5 group/link"
              >
                Read More
                <svg className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-bold text-slate-900">
            Need Melamine for Your Business?
          </h3>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">
            We supply premium melamine powder (≥99.8% purity) with global shipping from China. Request a quote today.
          </p>
          <a
            href="/#contact"
            className="inline-block mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-slate-500 text-xs">
          <span>© 2026 Guangdong HanCheng Material. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
