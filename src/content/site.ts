import { generatedContact, generatedMeta } from './cvGenerated'

// basePath must match next.config.js — change to '' when using a custom domain
export const basePath = ''

// Versioned filename (e.g. Jina_Lee_CV_2026-07.pdf) so repeated downloads
// over time don't silently overwrite each other under an identical name.
function versionedCvFilename(): string {
  const iso = generatedMeta.generated_at
  const yearMonth = iso && iso.length >= 7 ? iso.slice(0, 7) : null
  return yearMonth ? `Jina_Lee_CV_${yearMonth}.pdf` : 'Jina_Lee_CV.pdf'
}

export const site = {
  name: 'Jina Lee',
  title: 'Jina Lee | Sociologist',
  description:
    'Assistant Professor of Sociology at the University of Illinois at Urbana-Champaign. Research on gender inequality in evaluation systems across scientific and cultural fields.',
  url: generatedContact.website || 'https://jinalee.org',
  email: generatedContact.email || 'jina@illinois.edu',
  // Stable page for external links (hero, contact links, Scholar profile, etc.)
  // — always fresh on rebuild, unlike a cached PDF byte-for-byte at a fixed URL.
  cvUrl: `${basePath}/cv/`,
  // Both PDF actions share a versioned URL so a new CV bypasses the old
  // browser/CDN cache, including when opened in the browser's PDF viewer.
  cvPdfUrl: `${basePath}/JinaLee_CV.pdf${generatedMeta.generated_at ? `?v=${encodeURIComponent(generatedMeta.generated_at)}` : ''}`,
  cvDownloadName: versionedCvFilename(),
  googleScholar:
    'https://scholar.google.com/citations?user=LoJXhdgAAAAJ',
  orcid: 'https://orcid.org/0000-0003-4632-1777',
  socialPreview: 'https://jinalee.org/social-preview.png',
}
