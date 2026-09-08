# Indexing Runbook — hanchengmaterial.com

What was broken, what this PR fixes, and the exact steps left to submit the
sitemap for indexing. Nothing here requires code changes.

## What was broken

| Surface | Before | Why it mattered |
| --- | --- | --- |
| `public/sitemap.xml` `<loc>` | `https://melamine-web.vercel.app/` | Listed the homepage on a **dead Vercel deployment** (`DEPLOYMENT_NOT_FOUND`). Google ignores URLs on a different host than the sitemap, so the one URL it did list was unusable. |
| `public/robots.txt` `Sitemap:` | `https://melamine-web.vercel.app/sitemap.xml` | Returns **404**. Discovery via robots.txt was broken on every host. |
| URL coverage | 1 URL | Site is single-page today, so 1 is correct — but the file was hand-maintained and had already drifted from reality. |
| Structured data | None, sitewide | No `Organization`, `WebSite`, `WebPage`, or `Product`. Search engines and answer engines had to guess what the company is, where it is, and what it sells. |
| Canonical | None | `hanchengmaterial.com` and `www.hanchengmaterial.com` both serve `200` with no redirect between them. Two identical hosts, no canonical — a genuine duplicate-content split. |
| Open Graph / Twitter | None | Link previews unbranded. |

## What this PR changes

- `lib/site.ts` — new single source of truth for `SITE_URL` and organisation facts.
- `app/sitemap.ts` — generated at build time on the site's own origin, replacing `public/sitemap.xml`.
- `app/robots.ts` — generated, pointing at the same-origin sitemap, with AI crawlers named explicitly, replacing `public/robots.txt`.
- **Deleted `public/robots.txt` and `public/sitemap.xml`.** Not optional: files in `public/` are served at the root path and take precedence over App Router metadata routes, so leaving them would keep serving the broken versions.
- `components/StructuredData.tsx` — JSON-LD `@graph`: `Organization`, `WebSite`, `WebPage`, `Product`.
- `app/layout.tsx` — `metadataBase`, canonical, Open Graph, Twitter, robots directives.
- `public/23a019f5ab5f41a193af5fa5e43bf4f4.txt` — IndexNow key, enabling instant Bing/Yandex/Seznam/Naver submission.

All structured-data facts come from the live site copy and source: legal and
Chinese names, the Guangzhou street address, `lan@hanchengmaterial.com`,
founding year 2001, 3,000+ MT/month, ISO 9001 and SGS. No price is emitted on
the `Product` — none is published, and inventing one would be a policy
violation, not a rich result.

## Merging notes

- Branch is cut from `main`. The open `blog-section` branch also edits
  `app/layout.tsx` (it adds OG/Twitter/canonical), so **expect a one-file
  conflict**. This branch's version is a superset of blog-section's metadata
  work plus `metadataBase`, so on conflict take this branch's `metadata` block
  and keep blog-section's `keywords` array.
- **`blog-section` must update `app/sitemap.ts`** when it lands, otherwise
  `/blog` and the three post URLs will be missing from the sitemap. The
  extension point is marked in a comment inside `app/sitemap.ts`.
- Optional, not in this PR: enforce a single host. Both hosts serve `200`
  today. Canonical tags make Google resolve this, but a Vercel project-level
  redirect from apex to `www` (Domains → set `www.hanchengmaterial.com` as
  primary) removes the ambiguity for every other crawler too.

## Submitting for indexing

**Google Search Console is not connected yet** (it is the Day 3 task), so the
Google submission below is a manual step. Do these in order **after the PR is
merged and the Vercel deploy finishes**.

### 0. Verify the deploy first

```
https://www.hanchengmaterial.com/robots.txt      → Sitemap: https://www.hanchengmaterial.com/sitemap.xml
https://www.hanchengmaterial.com/sitemap.xml     → <loc>https://www.hanchengmaterial.com/</loc>
https://www.hanchengmaterial.com/                → view source, search for application/ld+json
```

All three must match the above. If `robots.txt` still mentions
`melamine-web.vercel.app`, the old `public/` files are still being served and
the deletion did not land.

### 1. Google — verify, then submit

1. Go to <https://search.google.com/search-console> → Add property → **URL
   prefix** → `https://www.hanchengmaterial.com`.
2. Pick **HTML tag** verification. Copy the `content` value from the supplied
   `google-site-verification` meta tag and add it to the `metadata` object in
   `app/layout.tsx` as `verification: { google: "<value>" }`. Deploy, then
   click Verify.
3. Sitemaps → enter `sitemap.xml` → Submit. Expect "Success" with 1 URL
   discovered.
4. URL Inspection → paste `https://www.hanchengmaterial.com/` → **Request
   Indexing**. This is the only lever that actually queues a crawl; the
   sitemap submission alone does not.

Google's `ping?sitemap=` endpoint was retired in June 2023 and returns an
error — it is not a shortcut here.

### 2. IndexNow — Bing, Yandex, Seznam, Naver (works today, no account)

```
curl -X POST https://api.indexnow.org/indexnow \
  -H "Content-Type: application/json" \
  -d '{"host":"www.hanchengmaterial.com","key":"23a019f5ab5f41a193af5fa5e43bf4f4","keyLocation":"https://www.hanchengmaterial.com/23a019f5ab5f41a193af5fa5e43bf4f4.txt","urlList":["https://www.hanchengmaterial.com/"]}'
```

`200` or `202` means accepted. The key file ships in this PR, so this works
as soon as it deploys.

### 3. Bing Webmaster Tools

Sign in at <https://www.bing.com/webmasters> and use **Import from Google
Search Console** — it inherits the verified property and the sitemap in one
step, then submit `sitemap.xml` there too.

## How to tell it worked

Recheck in 7–14 days:

- GSC → Pages: the homepage moves from "Discovered – currently not indexed"
  to "Indexed".
- GSC → Sitemaps: "Success", 1 discovered URL.
- A `site:hanchengmaterial.com` search returns the homepage.
- Bing: `url:` lookup returns the page.
- Once blog posts land, each new URL should be requested individually and
  appear in GSC → Pages within a week of publishing.
