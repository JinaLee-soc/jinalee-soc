import { generatedPublished, generatedWorkInProgress } from './cvGenerated'

export type PublicationStatus =
  | 'Published'
  | 'Forthcoming'
  | 'Conditionally Accepted'
  | 'Under Review'
  | 'Working Paper'
  | 'In Progress'

export interface Publication {
  authors: string
  year?: string
  title: string
  venue: string
  volumeIssuePages?: string
  doi?: string
  url?: string
  status: PublicationStatus
  manuscriptAvailable?: boolean
}

const fallbackJournalArticles: Publication[] = [
  {
    authors: 'Lee, Jina.',
    year: 'Forthcoming',
    title:
      'The Gender of Scientific Authority: Novelty Claims and Gender Gaps in Scientific Impact Across Disciplines.',
    venue: 'Gender & Society',
    status: 'Forthcoming',
  },
  {
    authors: 'Lee, Jina.',
    year: '2025',
    title:
      'Gendered Pathways to Perpetual Fame: The Selection of Elite Novelists into the Korean Literary Canon.',
    venue: 'Poetics',
    volumeIssuePages: '112',
    doi: 'https://doi.org/10.1016/j.poetic.2025.102024',
    status: 'Published',
  },
  {
    authors: 'Leahey, Erin, Jina Lee, Russell J. Funk.',
    year: '2023',
    title: 'What Types of Novelty Are Most Disruptive?',
    venue: 'American Sociological Review',
    volumeIssuePages: '88(3): 562-597',
    doi: 'https://doi.org/10.1177/00031224231168074',
    status: 'Published',
  },
  {
    authors: 'Lee, Jina, Minjae Seo, Erin Leahey.',
    year: '2022',
    title:
      'Who Deserves Protection? How Naming Potential Beneficiaries Influences COVID-19 Vaccine Intentions.',
    venue: 'Socius',
    volumeIssuePages: '8',
    doi: 'https://doi.org/10.1177/23780231221082422',
    status: 'Published',
  },
  {
    authors: 'Zhao, Yi, Jina Lee, Cheryl Ellenwood.',
    year: '2021',
    title:
      'The Persistent Influence of Gender Stereotypes in Social Entrepreneurial Financing.',
    venue: 'Journal of Social Entrepreneurship',
    volumeIssuePages: '15(3): 811-832',
    doi: 'https://doi.org/10.1080/19420676.2021.2004206',
    status: 'Published',
  },
]

const fallbackWorksInProgress: Publication[] = [
  {
    authors: 'Lee, Jina.',
    title:
      'The Gender of Scientific Authority: Novelty Claims and Gender Gaps in Scientific Impact Across Disciplines.',
    venue: 'Gender & Society',
    status: 'Conditionally Accepted',
    manuscriptAvailable: false,
  },
  {
    authors: 'Lee, Jina.',
    title: 'The Theory Penalty: Gender Bias in Recognition of Scientific Novelty.',
    venue: '',
    status: 'Under Review',
    manuscriptAvailable: true,
  },
  {
    authors: 'Paik, Eugene T., Jina Lee, Erin Leahey, Russell Funk.',
    title:
      'Divide and Conquer? How Partitioned Audiences Shape the Impact of Domain-Spanning Innovation.',
    venue: '',
    status: 'Working Paper',
    manuscriptAvailable: true,
  },
  {
    authors: 'Lee, Jina.',
    title:
      'Who Faces More Doubt in Crisis? Gendered Patterns of Uncertainty in Reception of High-Stakes Science.',
    venue: '',
    status: 'In Progress',
  },
  {
    authors:
      'Bratt, Sarah, Erin Leahey, Yea-Eun Kwon, Charles Lassiter, Jina Lee, Charles Gomez.',
    title:
      'Do Journal Data Sharing Requirements Promote Humility in Scientific Articles?',
    venue: '',
    status: 'In Progress',
  },
]

const fallbackBookChapters: Publication[] = [
  {
    authors:
      'Lassiter, Charles, Sarah Bratt, Erin Leahey, Charlie Gomez, Jina Lee, and Yeaeun Kwon.',
    year: 'Forthcoming',
    title:
      'Humble Reflections on the Intellectual Process of Developing a Text-based Measure of Humility in Inquiry.',
    venue: 'in Humble Inquiry: New Perspectives on Intellectual Humility',
    volumeIssuePages:
      'edited by Nathan Ballantyne, Jared Celniker, and Norbert Schwartz. Cambridge University Press',
    status: 'Forthcoming',
  },
]

const publicationStatuses: PublicationStatus[] = [
  'Published',
  'Forthcoming',
  'Conditionally Accepted',
  'Under Review',
  'Working Paper',
  'In Progress',
]

function ensureTrailingPeriod(text: string) {
  return text.endsWith('.') ? text : `${text}.`
}

function cleanText(value: string | undefined) {
  return value?.trim() ?? ''
}

function stripPublicationArtifacts(value: string | undefined) {
  return cleanText(value).replace(/\.\s*Book Chapters\s*$/i, '')
}

function isGeneratedSectionLabel(pub: {
  authors?: string
  title?: string
}) {
  const authors = cleanText(pub.authors).toLowerCase()
  const title = cleanText(pub.title)

  return !title || authors === 'journal articles' || authors === 'book chapters'
}

function isBookChapterRecord(pub: {
  authors?: string
  title?: string
  venue?: string
}) {
  const authors = cleanText(pub.authors).toLowerCase()
  const title = cleanText(pub.title).toLowerCase()
  const venue = cleanText(pub.venue).toLowerCase()

  return (
    authors.includes('charles lassiter') ||
    title.startsWith(
      'humble reflections on the intellectual process of developing a text-based measure of humility in inquiry'
    ) ||
    venue.startsWith('in humble inquiry:')
  )
}

function splitBookChapterVenue(venue: string | undefined) {
  const cleanedVenue = cleanText(venue)
  const marker = ' edited by '
  const markerIndex = cleanedVenue.toLowerCase().indexOf(marker)

  if (markerIndex === -1) {
    return {
      venue: cleanedVenue,
      volumeIssuePages: undefined,
    }
  }

  return {
    venue: cleanedVenue.slice(0, markerIndex),
    volumeIssuePages: cleanedVenue.slice(markerIndex + 1),
  }
}

function normalizeStatus(
  value: string | undefined,
  fallback: PublicationStatus
): PublicationStatus {
  if (!value) {
    return fallback
  }

  const lowered = value.trim().toLowerCase()
  const match = publicationStatuses.find(
    (status) => status.toLowerCase() === lowered
  )

  if (match) {
    return match
  }

  if (lowered.includes('under review')) {
    return 'Under Review'
  }
  if (lowered.includes('in progress')) {
    return 'In Progress'
  }
  if (lowered.includes('working paper')) {
    return 'Working Paper'
  }
  if (lowered.includes('forthcoming')) {
    return 'Forthcoming'
  }
  if (lowered.includes('conditionally accepted')) {
    return 'Conditionally Accepted'
  }

  return fallback
}

const generatedJournalArticles: Publication[] = generatedPublished
  .filter((pub) => !isGeneratedSectionLabel(pub) && !isBookChapterRecord(pub))
  .map((pub) => {
    const fallbackStatus: PublicationStatus =
      pub.year?.toLowerCase() === 'forthcoming' ? 'Forthcoming' : 'Published'

    return {
      authors: ensureTrailingPeriod(pub.authors),
      year: pub.year,
      title: ensureTrailingPeriod(pub.title),
      venue: pub.venue ?? '',
      volumeIssuePages: stripPublicationArtifacts(pub.volume_issue_pages) || undefined,
      doi: pub.doi,
      status: normalizeStatus(pub.status, fallbackStatus),
    }
  })
  .filter((pub) => pub.title && pub.authors)

const generatedBookChapters: Publication[] = generatedPublished
  .filter((pub) => !isGeneratedSectionLabel(pub) && isBookChapterRecord(pub))
  .map((pub) => {
    const fallbackStatus: PublicationStatus =
      pub.year?.toLowerCase() === 'forthcoming' ? 'Forthcoming' : 'Published'
    const { venue, volumeIssuePages } = splitBookChapterVenue(pub.venue)

    return {
      authors: ensureTrailingPeriod(pub.authors),
      year: pub.year,
      title: ensureTrailingPeriod(pub.title),
      venue,
      volumeIssuePages,
      doi: pub.doi,
      status: normalizeStatus(pub.status, fallbackStatus),
    }
  })
  .filter((pub) => pub.title && pub.authors)

const generatedWip: Publication[] = generatedWorkInProgress
  .map((pub) => ({
    authors: ensureTrailingPeriod(pub.authors),
    title: ensureTrailingPeriod(pub.title),
    venue: pub.venue ?? '',
    status: normalizeStatus(pub.status, 'Working Paper'),
    manuscriptAvailable: pub.manuscript_available,
  }))
  .filter((pub) => pub.title && pub.authors)

export const journalArticles: Publication[] =
  generatedJournalArticles.length > 0
    ? generatedJournalArticles
    : fallbackJournalArticles

export const bookChapters: Publication[] =
  generatedBookChapters.length > 0
    ? generatedBookChapters
    : fallbackBookChapters

export const worksInProgress: Publication[] =
  generatedWip.length > 0 ? generatedWip : fallbackWorksInProgress
