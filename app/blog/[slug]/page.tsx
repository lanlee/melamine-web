import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BlogNav from "@/components/BlogNav";
import Footer from "@/components/Footer";

interface PostData {
  slug: string;
  title: string;
  date: string;
  author?: string;
  image?: string;
  excerpt?: string;
  content: string;
}

const SITE_URL = "https://www.hanchengmaterial.com";

function getPost(slug: string): PostData | null {
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const parts = raw.split("---");
  if (parts.length < 3) return null;
  const frontMatter = parts[1];
  const content = parts.slice(2).join("---").trim();
  const getField = (key: string) => {
    const match = frontMatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
    return match ? match[1].trim().replace(/^["']|["']$/g, "") : undefined;
  };
  return {
    slug,
    title: getField("title") || slug,
    date: getField("date") || "",
    author: getField("author"),
    image: getField("image"),
    excerpt: getField("excerpt"),
    content,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = slug === "melamine-uses-grades-checks-before-you"
    ? "melamine-uses-grades-safety"
    : slug;
  const post = getPost(canonicalSlug);
  if (!post) return {};
  const canonical = `${SITE_URL}/blog/${canonicalSlug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      images: post.image ? [{ url: new URL(post.image, SITE_URL).toString(), alt: post.title }] : undefined,
    },
  };
}

function extractFirstImage(content: string): string | null {
  const match = content.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return match ? match[1] : null;
}

function extractTldr(content: string): string | null {
  const match = content.match(/^>\s*\*\*TL;DR\*\*:?\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

function extractFaq(content: string): { question: string; answer: string }[] {
  const faq: { question: string; answer: string }[] = [];
  const section = getFaqSection(content);
  if (!section) return faq;
  const questionMatches = [...section.markdown.matchAll(/^###\s+(.+)$/gm)];
  questionMatches.forEach((questionMatch, index) => {
    const question = questionMatch[1].trim();
    const answerStart = (questionMatch.index || 0) + questionMatch[0].length;
    const answerEnd = questionMatches[index + 1]?.index ?? section.markdown.length;
    const answer = section.markdown.slice(answerStart, answerEnd).trim();
    if (answer) {
      faq.push({ question, answer });
    }
  });
  return faq;
}

function getFaqSection(content: string): { markdown: string; start: number; end: number } | null {
  const heading = /^##\s*(?:FAQ|Frequently Asked Questions)\s*$/im.exec(content);
  if (!heading || heading.index === undefined) return null;
  const afterHeading = heading.index + heading[0].length;
  const remainder = content.slice(afterHeading);
  const nextSection = /^##\s+/m.exec(remainder);
  const end = nextSection?.index === undefined ? content.length : afterHeading + nextSection.index;
  return { markdown: content.slice(afterHeading, end), start: heading.index, end };
}

function renderMarkdown(md: string): string {
  // Minimal markdown renderer for headings, lists, tables, blockquotes, paragraphs, bold, italic, links, images, code
  let html = md;
  // Escape HTML first
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-8 rounded-2xl w-full shadow-sm" />');
  // Relevant YouTube references become responsive thumbnail players. Restrict
  // the iframe source to a valid 11-character YouTube video id.
  html = html.replace(
    /\[([^\]]+)\]\(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})[^)]*\)(?:\s+([^\n]+))?/g,
    (_match, label, videoId, description = "") => {
      const safeLabel = String(label).replace(/'/g, "&#39;").replace(/"/g, "&quot;");
      return `<figure class='my-8 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-[0_12px_40px_rgba(99,102,241,0.12)]'>` +
        `<div class='aspect-video w-full bg-slate-950'><iframe class='h-full w-full' src='https://www.youtube-nocookie.com/embed/${videoId}' title='${safeLabel}' loading='lazy' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen></iframe></div>` +
        `<figcaption class='px-5 py-4 text-sm leading-relaxed text-slate-500'><strong class='text-slate-800'>${safeLabel}</strong>${description ? ` ${description}` : ""}</figcaption>` +
        `</figure>`;
    },
  );
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#6366f1] underline">$1</a>');
  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Italic
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code class='bg-slate-100 px-1.5 py-0.5 rounded text-sm'>$1</code>");
  // Headings
  html = html.replace(/^###\s+(.+)$/gm, "<h3 class='text-2xl font-bold mt-8 mb-4 text-slate-900'>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2 class='text-3xl font-bold mt-10 mb-4 text-slate-900'>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1 class='text-4xl font-black mt-10 mb-4 text-slate-900'>$1</h1>");
  // Blockquote (TL;DR)
  html = html.replace(/^>\s*(.+)$/gm, "<blockquote class='border-l-4 border-[#6366f1] bg-indigo-50 px-6 py-4 my-6 rounded-r-xl text-slate-700 italic'>$1</blockquote>");
  // Tables
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split("|").filter((c) => c.trim() !== "");
    if (cells.length === 0) return match;
    const isHeader = cells.some((c) => c.includes("---"));
    if (isHeader) return "";
    return "<tr>" + cells.map((c) => `<td class='border border-slate-200 px-4 py-2'>${c.trim()}</td>`).join("") + "</tr>";
  });
  // Wrap table rows in table if not already
  html = html.replace(/(<tr>.*<\/tr>\n?)+/g, "<div class='overflow-x-auto my-6'><table class='w-full border-collapse'>$&</table></div>");
  // Lists
  html = html.replace(/^[-*]\s+(.+)$/gm, "<li class='ml-4'>$1</li>");
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, "<ul class='list-disc pl-6 my-4 space-y-2'>$&</ul>");
  html = html.replace(/^\d+\.\s+(.+)$/gm, "<li class='ml-4'>$1</li>");
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, "<ol class='list-decimal pl-6 my-4 space-y-2'>$&</ol>");
  // Paragraphs
  html = html.replace(/^(?!<[a-z]|\s*$)(.+)$/gm, "<p class='my-4 text-slate-700 leading-relaxed'>$1</p>");
  return html;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "melamine-uses-grades-checks-before-you") {
    permanentRedirect("/blog/melamine-uses-grades-safety");
  }
  const post = getPost(slug);
  if (!post) notFound();

  const heroImage = post.image || extractFirstImage(post.content);
  const tldr = extractTldr(post.content);
  const faq = extractFaq(post.content);
  const contentWithoutTldr = post.content.replace(/^>\s*\*\*TL;DR\*\*:?\s*.+$/m, "");
  const faqSection = getFaqSection(contentWithoutTldr);
  const contentWithoutFaq = faqSection
    ? contentWithoutTldr.slice(0, faqSection.start) + contentWithoutTldr.slice(faqSection.end)
    : contentWithoutTldr;
  const htmlContent = renderMarkdown(contentWithoutFaq);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        datePublished: post.date,
        author: post.author ? { "@type": "Person", name: post.author } : undefined,
        image: heroImage || undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: `/blog/${post.slug}` },
        ],
      },
      ...(faq.length > 0
        ? [{
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogNav />
      <main className="relative min-h-screen overflow-hidden bg-[#f8faff] pb-24 pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_35%_at_50%_0%,rgba(99,102,241,0.10)_0%,transparent_72%)]" />
        <article className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_70px_rgba(30,41,59,0.08),0_4px_16px_rgba(99,102,241,0.06)]">
          <header className="px-6 pb-8 pt-10 sm:px-12 sm:pt-14">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[3px] text-[#6366f1]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6366f1]" />
              Industrial insight
            </div>
            <div className="mb-4 text-sm text-slate-400">
              <a href="/" className="hover:text-[#6366f1]">Home</a> / <a href="/blog" className="hover:text-[#6366f1]">Blog</a> / {post.title}
            </div>
            <h1 className="mb-5 max-w-4xl text-4xl font-black leading-[1.08] tracking-[-1.5px] text-slate-900 sm:text-6xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500">
              {post.author && <span>By {post.author}</span>}
              <span>{post.date}</span>
            </div>
            <a
              href={`${SITE_URL}/blog/${post.slug}`}
              className="mt-4 inline-block break-all text-sm font-semibold text-[#6366f1] underline decoration-indigo-200 underline-offset-4"
            >
              {SITE_URL}/blog/{post.slug}
            </a>
          </header>
          {heroImage && (
            <img
              src={heroImage}
              alt={post.title}
              className="aspect-[16/9] w-full object-cover"
            />
          )}
          {tldr && (
            <div className="mx-6 mt-10 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 sm:mx-12 sm:p-8">
              <p className="font-bold text-[#6366f1] mb-1">TL;DR</p>
              <p className="text-slate-700">{tldr}</p>
            </div>
          )}
          <div
            className="px-6 py-10 text-base leading-8 text-slate-700 sm:px-12 sm:py-14 sm:text-lg"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          {faq.length > 0 && (
            <section className="mx-6 mb-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:mx-12 sm:p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">FAQ</h2>
              {faq.map((item, i) => (
                <div key={i} className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.question}</h3>
                  <p className="text-slate-700">{item.answer}</p>
                </div>
              ))}
            </section>
          )}
          </div>
        </article>
      </main>
      <Footer lang="en" />
    </>
  );
}
