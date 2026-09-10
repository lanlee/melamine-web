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
        'Keep each Markdown table as one contiguous header, separator, and body block with equal column counts.',
        'Render the article image as a full-width 16:9 hero.',
        'Render YouTube links in Relevant video as responsive embedded players with thumbnails, not plain links.',
        'Publish future articles to content/blog and reuse the existing /blog renderer.',
        'Keep the canonical URL in metadata; do not repeat it visibly under the blog title.',
    ],
    'style_generation': 'first_publish_only',
    'future_publish': 'run this script; do not call an AI API for layout or styling',
}


def slugify(value: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return value or "article"


def _table_cells(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def _is_table_row(line: str) -> bool:
    stripped = line.strip()
    return stripped.startswith("|") and stripped.endswith("|") and stripped.count("|") >= 2


def _is_table_separator(line: str) -> bool:
    cells = _table_cells(line)
    return bool(cells) and all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells)


def normalize_markdown_tables(markdown: str) -> str:
    """Normalize tables so the renderer receives one valid contiguous block."""
    trailing_newline = markdown.endswith("\n")
    lines = markdown.splitlines()
    output: list[str] = []
    index = 0
    while index < len(lines):
        header = lines[index]
        if not _is_table_row(header):
            output.append(header)
            index += 1
            continue
        separator_index = index + 1
        while separator_index < len(lines) and not lines[separator_index].strip():
            separator_index += 1
        if separator_index >= len(lines) or not _is_table_separator(lines[separator_index]):
            output.append(header)
            index += 1
            continue
        headers = _table_cells(header)
        if len(_table_cells(lines[separator_index])) != len(headers):
            raise ValueError("Markdown table header and separator column counts do not match")
        row_index = separator_index + 1
        while row_index < len(lines) and not lines[row_index].strip():
            row_index += 1
        body: list[str] = []
        while row_index < len(lines) and _is_table_row(lines[row_index]):
            if len(_table_cells(lines[row_index])) != len(headers):
                raise ValueError("Markdown table rows must use the same number of columns")
            body.append(lines[row_index].strip())
            row_index += 1
        if not body:
            raise ValueError("Markdown table must include at least one body row")
        output.extend([
            header.strip(),
            "| " + " | ".join("---" for _ in headers) + " |",
            *body,
        ])
        index = row_index
    result = "\n".join(output)
    return result + ("\n" if trailing_newline else "")


def publish(title: str, content_file: str, slug: str = "") -> Path:
    source = Path(content_file)
    if not source.is_file():
        raise FileNotFoundError(source)
    BLOG_DIR.mkdir(parents=True, exist_ok=True)
    destination = BLOG_DIR / (slugify(slug or title) + ARTICLE_EXTENSION)
    content = normalize_markdown_tables(source.read_text(encoding="utf-8"))
    destination.write_text(content, encoding="utf-8")
    return destination


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--title", required=True)
    parser.add_argument("--content-file", required=True)
    parser.add_argument("--slug", default="")
    args = parser.parse_args()
    print(publish(args.title, args.content_file, args.slug))
