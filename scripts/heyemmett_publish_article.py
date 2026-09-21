#!/usr/bin/env python3
"""Publish markdown into this repository's detected blog directory.

Created by HeyEmmett. The destination is intentionally recorded here so future
publishes do not need AI or repository rediscovery. ARTICLE_FORMAT_INSTRUCTIONS
records the user-approved format that the article writer must follow before this
deterministic script copies the finished article into the blog.
BLOG_STYLE_CONTRACT records the site-native renderer and visual rules captured
during the first publish. Later publishes reuse that renderer without calling an
AI API again for layout or styling.
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path

BLOG_DIR = Path('content/blog')
ARTICLE_EXTENSION = '.md'
ARTICLE_FORMAT_INSTRUCTIONS = ''
BLOG_STYLE_CONTRACT = {
    'version': 1,
    'framework': 'next',
    'homepage': 'app/page.tsx',
    'style_reference_files': [
        'app/page.tsx',
        'app/layout.tsx',
        'app/globals.css',
        'components/Nav.tsx',
        'components/Footer.tsx',
        'components/Hero.tsx',
    ],
    'blog_route_files': ['app/blog/page.tsx', 'app/blog/[slug]/page.tsx'],
    'rules': [
        'Reuse BlogNav, Footer, Inter, the indigo/slate palette, rounded cards, shadows, and responsive spacing.',
        'Render Markdown headings, paragraphs, links, tables, lists, FAQ, and media with explicit site-native classes.',
        'Render the article image as a full-width 16:9 hero.',
        'Render YouTube links in Relevant video as responsive embedded players with thumbnails, not plain links.',
        'Publish future articles to content/blog and reuse the existing /blog renderer.',
    ],
    'style_generation': 'first_publish_only',
    'future_publish': 'run this script; do not call an AI API for layout or styling',
}


def slugify(value: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return value or "article"


def publish(title: str, content_file: str, slug: str = "") -> Path:
    source = Path(content_file)
    if not source.is_file():
        raise FileNotFoundError(source)
    BLOG_DIR.mkdir(parents=True, exist_ok=True)
    destination = BLOG_DIR / (slugify(slug or title) + ARTICLE_EXTENSION)
    destination.write_text(source.read_text(encoding="utf-8"), encoding="utf-8")
    return destination


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--title", required=True)
    parser.add_argument("--content-file", required=True)
    parser.add_argument("--slug", default="")
    args = parser.parse_args()
    print(publish(args.title, args.content_file, args.slug))
