import { generatedContact } from './cvGenerated'

// basePath must match next.config.js — change to '' when using a custom domain
export const basePath = ''

export const site = {
  name: 'Jina Lee',
  title: 'Jina Lee | Sociologist',
  description:
    'Assistant Professor of Sociology at the University of Illinois at Urbana-Champaign. Research on gender inequality in evaluation systems across scientific and cultural fields.',
  url: generatedContact.website || 'https://jinalee.org',
  email: generatedContact.email || 'jina@illinois.edu',
  cvUrl: `${basePath}/JinaLee_CV.pdf`,
  cvDownloadName: 'JinaLee_CV.pdf',
  googleScholar:
    'https://scholar.google.com/citations?user=LoJXhdgAAAAJ',
  orcid: 'https://orcid.org/0000-0003-4632-1777',
  socialPreview: '/social-preview.jpg',
}
