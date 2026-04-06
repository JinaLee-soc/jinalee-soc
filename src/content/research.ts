export interface ResearchProgram {
  id: string
  title: string
  overview: string
  keyQuestions: string[]
  publications: ResearchPublication[]
}

export interface ResearchPublication {
  citation: string
  status?: string
  journal?: string  // venue shown next to badge for non-published papers
  note?: string     // secondary line, e.g. "Manuscript available on request."
  doi?: string      // DOI for published papers
}

export const researchIntro = {
  summary: `My research examines how evaluation systems that appear objective reproduce gender hierarchies across scientific and cultural fields. I ask: whose contributions are recognized as valuable, and whose are discounted? Across two lines of work, I trace how gender bias operates through everyday evaluation practices and accumulates into durable inequalities.`,
  methods: `My methods include computational text analysis, bibliometric analysis, and survey experiments.`,
}

export const researchPrograms: ResearchProgram[] = [
  {
    id: 'scientific-evaluation',
    title: 'Gender and Scientific Evaluation',
    overview: `Scientific recognition is rarely neutral. My work in this area investigates how gender shapes which knowledge claims are treated as authoritative, how novelty is attributed and rewarded, and how uncertainty is managed differently depending on who makes a claim.`,
    keyQuestions: [
      'How do gendered dynamics shape which scientific contributions get recognized, cited, and treated as authoritative?',
      'How is novelty attributed and rewarded differently across gender lines?',
      'How is uncertainty managed differently depending on who makes a scientific claim?',
    ],
    publications: [
      {
        citation:
          'Lee, Jina. "The Gender of Scientific Authority: Novelty Claims and Gender Gaps in Scientific Impact Across Disciplines."',
        status: 'Conditionally Accepted',
        journal: 'Gender & Society',
      },
      {
        citation:
          'Lee, Jina. "The Theory Penalty: Gender Bias in Recognition of Scientific Novelty."',
        status: 'Under Review',
        note: 'Manuscript available on request.',
      },
      {
        citation:
          'Lee, Jina. "Who Faces More Doubt in Crisis? Gendered Patterns of Uncertainty in Reception of High-Stakes Science."',
        status: 'In Progress',
      },
      {
        citation:
          'Leahey, Erin, Jina Lee, Russell J. Funk. (2023). What Types of Novelty Are Most Disruptive? American Sociological Review, 88(3): 562–597.',
        status: 'Published',
        doi: '10.1177/00031224231168074',
      },
    ],
  },
  {
    id: 'cultural-evaluation',
    title: 'Gender, Culture, and Markets',
    overview: `Literary canons are socially constructed. My work in this area examines how canonization processes in Korean literature embed gender biases and how those biases persist even when evaluation criteria appear gender-neutral.`,
    keyQuestions: [
      'How do canonization processes in literature and culture embed and reproduce gender hierarchies?',
      'How does critical recognition operate differently for men and women writers?',
      'How are merit-based judgments shaped by gendered assumptions about universality and particularity?',
    ],
    publications: [
      {
        citation:
          'Lee, Jina. (2025). Gendered Pathways to Perpetual Fame: The Selection of Elite Novelists into the Korean Literary Canon. Poetics, 112.',
        status: 'Published',
        doi: '10.1016/j.poetic.2025.102024',
      },
      {
        citation:
          'Zhao, Yi, Jina Lee, Cheryl Ellenwood. (2021). The Persistent Influence of Gender Stereotypes in Social Entrepreneurial Financing. Journal of Social Entrepreneurship, 15(3): 811–832.',
        status: 'Published',
        doi: '10.1080/19420676.2021.2004206',
      },
    ],
  },
  {
    id: 'science-and-academia',
    title: 'Science and Academia',
    overview: `Scientific knowledge is shaped not only by what researchers study but by how scientific communities are organized. This line of work examines how structural features of academic fields—audience segmentation, publication norms, and data practices—influence the production, reach, and epistemic character of scientific knowledge.`,
    keyQuestions: [
      'How does audience structure shape the impact of domain-spanning innovation?',
      'How do editorial and data sharing requirements shape the epistemic character of scientific articles?',
    ],
    publications: [
      {
        citation:
          'Paik, Eugene T., Jina Lee, Erin Leahey, Russell Funk. "Divide and Conquer? How Partitioned Audiences Shape the Impact of Domain-Spanning Innovation."',
        status: 'Working Paper',
        note: 'Manuscript available on request.',
      },
      {
        citation:
          'Bratt, Sarah, Erin Leahey, Yea-Eun Kwon, Charles Lassiter, Jina Lee, Charles Gomez. "Do Journal Data Sharing Requirements Promote Humility in Scientific Articles?"',
        status: 'In Progress',
      },
    ],
  },
  {
    id: 'other-work',
    title: 'Other Work',
    overview: `Not all evaluation concerns recognition or prestige. This work examines how social categorization and framing shape judgments of who deserves protection and resources.`,
    keyQuestions: [],
    publications: [
      {
        citation:
          'Lee, Jina, Minjae Seo, Erin Leahey. (2022). Who Deserves Protection? How Naming Potential Beneficiaries Influences COVID-19 Vaccine Intentions. Socius, 8.',
        status: 'Published',
        doi: '10.1177/23780231221082422',
      },
    ],
  },
]
