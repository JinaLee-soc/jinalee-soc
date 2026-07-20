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
  journal?: string // venue shown next to badge for non-published papers
  note?: string // secondary line, e.g. "Manuscript available."
  doi?: string // DOI for published papers
}

export const researchIntro = {
  summary: `My research examines how contributions are evaluated when their value cannot be determined by clear or settled standards. I study how judgments of originality, authority, and credibility are formed; why gender and status become especially consequential under evaluative ambiguity; and how initial differences in recognition accumulate into durable inequalities. Across scientific and cultural fields, I follow this process from claims of novelty through reception, stabilization, and long-term recognition. I also examine how audience structures and AI systems increasingly organize these judgments.`,
  methods: `My methods include computational text analysis, bibliometric analysis, and survey experiments.`,
}

export const researchPrograms: ResearchProgram[] = [
  {
    id: 'evaluating-novel-contributions',
    title: 'Evaluating Novel Contributions',
    overview: `New contributions must be classified before they can be claimed and recognized. My earlier work distinguishes forms of scientific novelty. My subsequent research examines whether those forms are equally available for researchers to claim and whether claims receive equal recognition across gender and disciplinary contexts.`,
    keyQuestions: [
      'How are different forms of novelty classified and valued?',
      'How do gender and disciplinary context shape who can claim novelty and whose claims receive recognition?',
    ],
    publications: [
      {
        citation:
          'Leahey, Erin, Jina Lee, Russell J. Funk. (2023). What Types of Novelty Are Most Disruptive? American Sociological Review, 88(3): 562–597.',
        status: 'Published',
        doi: '10.1177/00031224231168074',
      },
      {
        citation:
          'Lee, Jina. (2026). "Claiming Novelty, Claiming Authority: Gender Gaps in Scientific Impact Across Disciplines."',
        status: 'Published',
        journal: 'Gender & Society',
      },
      {
        citation:
          'Lee, Jina. "The Theory Penalty: Gender Bias in Recognition of Scientific Novelty."',
        status: 'Revise & Resubmit',
        note: 'Manuscript available.',
      },
    ],
  },
  {
    id: 'durable-recognition',
    title: 'From Evaluation to Durable Recognition',
    overview: `This line of work follows evaluation over time, asking how repeated acts of selection and recognition determine which claims become accepted facts, which creators enter cultural canons, and which actors remain publicly visible.`,
    keyQuestions: [
      'How do repeated acts of selection transform initial evaluations into durable recognition?',
      'At what stages do gender and status inequalities emerge and accumulate?',
    ],
    publications: [
      {
        citation:
          'Lee, Jina. "Stratified Fact-Making: How Gender and Novelty Claims Stratify the Stabilization of Scientific Facts."',
        status: 'Working Paper',
        note: 'Manuscript available.',
      },
      {
        citation:
          'Lee, Jina. (2025). Gendered Pathways to Perpetual Fame: The Selection of Elite Novelists into the Korean Literary Canon. Poetics, 112.',
        status: 'Published',
        doi: '10.1016/j.poetic.2025.102024',
      },
      {
        citation:
          'Ryu, Dahyun, Jina Lee. "Survivorship in Public: Differential Durability and the Conflictual Face of Korean Digital Feminism."',
        status: 'Working Paper',
        note: 'Manuscript available.',
      },
      {
        citation:
          'Zhao, Yi, Jina Lee, Cheryl Ellenwood. (2021). The Persistent Influence of Gender Stereotypes in Social Entrepreneurial Financing. Journal of Social Entrepreneurship, 15(3): 811–832.',
        status: 'Published',
        doi: '10.1080/19420676.2021.2004206',
      },
      {
        citation:
          'Lee, Jina, Minjae Seo, Erin Leahey. (2022). Who Deserves Protection? How Naming Potential Beneficiaries Influences the COVID-19 Vaccine Intentions. Socius, 8.',
        status: 'Published',
        doi: '10.1177/23780231221082422',
      },
    ],
  },
  {
    id: 'evaluation-infrastructure',
    title: 'The Organization and Infrastructure of Evaluation',
    overview: `Evaluation does not occur in isolation. It is organized through disciplinary audiences, publication systems, data practices, and increasingly AI tools that select relevant literatures and formulate judgments about originality and fit.`,
    keyQuestions: [
      'How do audience structures and publication practices shape judgments of novelty, fit, and epistemic value?',
      'How do AI tools select relevant literatures and formulate judgments about originality and fit?',
    ],
    publications: [
      {
        citation:
          'Paik, Eugene T., Jina Lee, Erin Leahey, Russell Funk. "Divide and Conquer? How Partitioned Audiences Shape the Impact of Domain-Spanning Innovation."',
        status: 'Working Paper',
        note: 'Manuscript available.',
      },
      {
        citation:
          'Lee, Jina, Zhuofan Li. "Conceptual Divergence Analysis: Mapping a Researcher’s Conceptual Vocabulary Against the Literatures They Address."',
        status: 'Revise & Resubmit',
      },
      {
        citation:
          'Lassiter, Charles, Sarah Bratt, Erin Leahey, Charlie Gomez, Jina Lee, Yea-Eun Kwon. "Humble Reflections on the Intellectual Process of Developing a Text-based Measure of Humility in Inquiry."',
        status: 'Forthcoming',
      },
    ],
  },
]
