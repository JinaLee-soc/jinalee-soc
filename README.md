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

`cv.docx` is the source of truth. On `npm run dev` and `npm run build`, the parser runs automatically:

`cv.docx` -> `scripts/cv/parse_docx.py` -> `src/generated/cv-data.json`

| What to update | File |
|---|---|
| Update master CV | `cv.docx` |
| Parse CV manually | `npm run generate:cv` |
| Replace downloadable PDF CV | `public/JinaLee_CV.pdf` |
| Update research page narrative | `src/content/research.ts` |
| Update teaching page activities/philosophy | `src/content/teaching.ts` |
| Update links (Scholar, ORCID) | `src/content/site.ts` |

## Adding Your Headshot

1. Add a professional photo to `public/headshot.jpg`
2. In `src/pages/index.tsx`, replace the `<div className="hero__headshot-placeholder">` block with:

```tsx
<img
  src="/headshot.jpg"
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
  headshot.jpg  Add your photo here
```
