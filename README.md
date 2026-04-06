# jinalee.org — Academic Personal Website

A clean, professional, static academic website built with Next.js.

## Quick Start

```bash
npm install
npm run dev          # local development at http://localhost:3000
npm run build:export # production build → /out folder
```

## Deployment (Vercel — recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import the repo
3. Framework preset: **Next.js**
4. Build command: `npm run build:export` (or leave as default — Vercel detects `output: 'export'`)
5. Set custom domain `jinalee.org` in Vercel → Settings → Domains

## Routine Content Updates

All content lives in `src/content/`. No layout changes required for routine updates.

| What to update | File |
|---|---|
| Add a new publication | `src/content/publications.ts` |
| Update research description | `src/content/research.ts` |
| Add a course | `src/content/teaching.ts` |
| Replace CV | `public/cv.pdf` |
| Update bio / positioning | `src/content/bio.ts` |
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
  pages/        One file per page
  styles/       Global CSS with design tokens
public/
  cv.pdf        Upload your CV here
  headshot.jpg  Add your photo here
```
