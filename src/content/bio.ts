import { generatedEmployment } from './cvGenerated'

const currentRole = generatedEmployment[0]

export const bio = {
  name: 'Jina Lee',
  title: currentRole?.title || 'Assistant Professor of Sociology',
  affiliation:
    currentRole?.institution || 'University of Illinois at Urbana-Champaign',
  positioningStatement:
    'I study how evaluation systems reproduce gender inequality in science and in cultural fields.',
  about: `Jina Lee is a sociologist who studies how seemingly objective evaluation systems reproduce social hierarchies. Using computational text analysis, bibliometric analysis, and experimental methods, her research asks: whose contributions are recognized as valuable, and whose are discounted? In science, she examines how knowledge claims and their reception are gendered. In cultural markets, she investigates how canonization processes embed gender biases. Across these contexts, her work reveals a consistent pattern: evaluation practices that appear meritocratic embed biases that disadvantage women and lower-status actors. Her research has been published in the American Sociological Review, Poetics, Socius, and Journal of Social Entrepreneurship.`,
  teachingSnapshot: `I teach undergraduate courses in sociology of culture, sociology of gender, social statistics, and technology and society. My courses emphasize critical thinking and the application of sociological frameworks to contemporary empirical questions.`,
  headshotAlt: 'Jina Lee, Assistant Professor of Sociology',
}
