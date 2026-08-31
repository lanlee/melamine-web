#!/usr/bin/env python3
"""Publish markdown into this repository's detected blog directory.

Created by HeyEmmett. The destination is intentionally recorded here so future
publishes do not need AI or repository rediscovery.
"""
from __future__ import annotations

import argparse
import re
from pathlib import Path

BLOG_DIR = Path('content/blog')
ARTICLE_EXTENSION = '.md'


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
