import { generatedEmployment } from './cvGenerated'

const currentRole = generatedEmployment[0]

export const bio = {
  name: 'Jina Lee',
  title: currentRole?.title || 'Assistant Professor of Sociology',
  affiliation:
    currentRole?.institution || 'University of Illinois at Urbana-Champaign',
  positioningStatement:
    'I study how evaluation systems reproduce gender inequality in science and in cultural fields.',
  about: `Jina Lee is a sociologist of evaluation, knowledge, and inequality. Her work asks: how do systems of evaluation determine whose contributions are recognized as original, authoritative, and credible? And how does inequality concentrate in the judgments least governed by clear standards? She traces evaluation from the classification of novel contributions, through their reception and stabilization, to the organizational and AI infrastructures that structure scholarly judgment. She studies these processes across science, cultural fields, and AI-mediated knowledge systems, using computational text analysis, bibliometric analysis, and experiments. Her research appears in the American Sociological Review, Gender & Society, and Poetics, among other venues.`,
  teachingSnapshot: `I teach undergraduate courses in sociology of culture, sociology of gender, social statistics, and technology and society. My courses emphasize critical thinking and the application of sociological frameworks to contemporary empirical questions.`,
  headshotAlt: 'Jina Lee, Assistant Professor of Sociology',
}
