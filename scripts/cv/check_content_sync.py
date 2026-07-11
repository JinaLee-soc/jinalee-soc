"""Warn about site-content.docx publication references that don't match cv.docx.

The Research page (src/pages/research.tsx) looks up each publication title
listed under a PROGRAM in site-content.docx against the parsed CV data, so
that authors/venue/status/DOI stay in sync with cv.docx. A reference that
doesn't match renders as a bare italic title with none of that metadata.

This script mirrors the matching logic in src/content/siteContentGenerated.ts
(matchPublication / normalizeTitle) so the warning reflects exactly what the
site will do. It always exits 0 — this is a non-fatal build-time warning, not
a build gate.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


def normalize_title(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower())


def cv_publication_titles(cv_data: dict) -> list[str]:
    pubs = cv_data.get("publications", {})
    entries = list(pubs.get("published", [])) + list(pubs.get("work_in_progress", []))

    titles = []
    for entry in entries:
        title = (entry.get("title") or "").strip()
        authors = (entry.get("authors") or "").strip().lower()
        if not title or authors in ("journal articles", "book chapters"):
            continue
        titles.append(title)
    return titles


def find_unmatched(site_content: dict, cv_titles: list[str]) -> list[tuple[str, str]]:
    normalized_cv = [normalize_title(t) for t in cv_titles]
    programs = site_content.get("research", {}).get("programs", [])

    unmatched = []
    for program in programs:
        program_title = program.get("title", "(untitled program)")
        for reference in program.get("publications", []):
            target = normalize_title(reference)
            if not target:
                continue
            matched = any(target in nt or nt in target for nt in normalized_cv)
            if not matched:
                unmatched.append((program_title, reference))
    return unmatched


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Warn about site-content.docx publication references missing from cv.docx"
    )
    parser.add_argument("--cv-data", default="src/generated/cv-data.json")
    parser.add_argument("--site-content", default="src/generated/site-content.json")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    cv_path = Path(args.cv_data)
    sc_path = Path(args.site_content)

    if not cv_path.exists() or not sc_path.exists():
        return  # nothing to check yet (e.g. before first generate step)

    cv_data = json.loads(cv_path.read_text(encoding="utf-8"))
    site_content = json.loads(sc_path.read_text(encoding="utf-8"))

    cv_titles = cv_publication_titles(cv_data)
    unmatched = find_unmatched(site_content, cv_titles)

    if not unmatched:
        print("✓ site-content.docx: all publication references matched to cv.docx")
        return

    print("")
    print(f"⚠️  site-content.docx: {len(unmatched)} publication reference(s) not found in cv.docx")
    print("   These will render on /research without authors, venue, status, or DOI:")
    print("")
    for program_title, reference in unmatched:
        print(f"   [{program_title}] \"{reference}\"")
    print("")
    print("   Fix: add the paper to cv.docx, or check the title text matches in site-content.docx.")
    print("")


if __name__ == "__main__":
    main()
