# jinalee.org — Academic Personal Website

A clean, professional, static academic website built with Next.js.

## Quick Start

```bash
npm install
npm run dev          # local development at http://localhost:3000
npm run build        # production build/export → /out folder
```

## Deployment (GitHub Pages)

A GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys the static export on pushes to `main`.

## Routine Content Updates

The public repository contains only the generated website content and public
PDF. The two Word source documents remain local and are intentionally ignored.
When they are available at the repository root, refresh the generated output
before committing a content update:

- `cv.docx` -> `scripts/cv/parse_docx.py` -> `src/generated/cv-data.json`
  (publications + statuses, employment, education, teaching offerings, CV page)
- `site-content.docx` -> `scripts/cv/parse_site_content.py` -> `src/generated/site-content.json`
  (homepage About/Teaching preview text, research program narratives, key
  questions, teaching philosophy, course descriptions, classroom activities)

Run `npm run refresh:content` to perform both parsing steps. It also runs
`npm run check:content-sync`, which prints a non-fatal
warning listing any publication title in `site-content.docx` that doesn't
match a title in `cv.docx` — that reference will render without
authors/venue/status/DOI on the Research page until the paper is added to
the CV or the title text is fixed.

The Research page lists publications by title under each program; each title is
matched against the parsed CV, so statuses/DOIs update from `cv.docx` alone.
Course offerings on the Teaching page also come from the CV.

`site-content.docx` uses ALL-CAPS marker lines (`HOME ABOUT`, `HOME TEACHING`,
`RESEARCH INTRO`, `PROGRAM:`, `KEY QUESTIONS`, `PUBLICATIONS`,
`TEACHING PHILOSOPHY`, `COURSE:`, `ACTIVITIES:`, `ITEM:`). Everything under a
marker is body text for it. `HOME ABOUT` and `HOME TEACHING` render as plain
paragraphs (no inline links) in the homepage About and Teaching preview
sections.

| What to update | File |
|---|---|
| Update master CV (local only) | `cv.docx` |
| Update research narratives / teaching text (local only) | `site-content.docx` |
| Refresh public generated data | `npm run refresh:content` |
| Replace downloadable PDF CV | `public/JinaLee_CV.pdf` |
| Update links (Scholar, ORCID) | `src/content/site.ts` |

## Adding Your Headshot

Replace `public/headshot.png` with the public headshot you want the site to
serve. The homepage already references that asset:

```tsx
<img
  src="/headshot.png"
  alt="Jina Lee, Assistant Professor of Sociology"
  className="hero__headshot"
  width={180}
  height={220}
/>
```

## Updating Google Scholar and ORCID Links

Edit `src/content/site.ts`:

```ts
googleScholar: 'https://scholar.google.com/citations?user=YOUR_ACTUAL_ID',
orcid: 'https://orcid.org/YOUR-ACTUAL-ORCID',
```

## Project Structure

```
src/
  components/   Reusable UI components
  content/      All text content — edit here for routine updates
  generated/    Auto-generated data from CV parser
  pages/        One file per page
  styles/       Global CSS with design tokens
scripts/
  cv/           CV parsing scripts
public/
  JinaLee_CV.pdf  CV page source PDF
  headshot.png  Public homepage photo
```
