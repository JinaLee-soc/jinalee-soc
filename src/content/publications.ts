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

export const journalArticles: Publication[] = [
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

export const worksInProgress: Publication[] = [
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
