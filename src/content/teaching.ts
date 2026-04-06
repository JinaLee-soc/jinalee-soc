export interface Course {
  title: string
  institution: string
  description: string
  syllabusUrl?: string
  note?: string
}

export interface ClassroomActivity {
  name: string
  description: string
}

export interface CourseActivities {
  course: string
  activities: ClassroomActivity[]
}

export const teachingPhilosophy = `I believe in the transformative power of integrative and experiential learning to make sociological concepts tangible and relevant to students' lives. I design interactive learning environments where theory comes alive through collaborative investigation and creative application. Below are select examples from three of my undergraduate courses.`

export const courses: Course[] = [
  {
    title: 'Intro to Social Statistics',
    institution: 'University of Illinois at Urbana-Champaign',
    description:
      'A survey of fundamental statistical concepts and their application in social research, with emphasis on both conceptual understanding and practical analysis skills.',
    syllabusUrl: undefined,
  },
  {
    title: 'Sociology of Culture',
    institution: 'University of Illinois at Urbana-Champaign',
    description:
      'Key frameworks in the sociology of culture, including cultural industries, taste, status, and the boundary between popular and high culture. Students analyze everyday cultural objects through a sociological lens.',
    syllabusUrl: undefined,
  },
  {
    title: 'Sociology of Gender',
    institution: 'University of Illinois at Urbana-Champaign',
    description:
      'How gender shapes experience across education, work, family, and relationships, and how it intersects with other dimensions of social inequality.',
    syllabusUrl: undefined,
  },
  {
    title: 'Technology & Society',
    institution: 'University of Illinois at Urbana-Champaign',
    description:
      'How science and technology shape social life, and how social forces shape science and technology in return. Topics include recognition, inequality, AI governance, and algorithmic systems.',
    syllabusUrl: undefined,
  },
]

export const classroomActivities: CourseActivities[] = [
  {
    course: 'Sociology of Culture',
    activities: [
      {
        name: 'Cultural Capital Scavenger Hunt',
        description:
          "Students map their campus environment to identify how institutional resources are distributed along class-coded lines, drawing on Anthony Jack's research on first-generation students.",
      },
      {
        name: 'Subculture Balloon Debate',
        description:
          'Teams represent stigmatized subcultures and use theoretical tools to argue for their group\'s legitimacy, navigating between analytical rigor and rhetorical performance.',
      },
      {
        name: 'Meme Creation Contest',
        description:
          'Students translate sociological concepts into visual form and analyze what makes a concept-driven meme culturally legible and shareable.',
      },
    ],
  },
  {
    course: 'Sociology of Gender',
    activities: [
      {
        name: 'Meme-Busters',
        description:
          'Students construct evidence-based counter-memes to challenge essentialist claims, practicing critical engagement with popular discourse about gender.',
      },
      {
        name: 'Leadership Fashion Runway',
        description:
          'Students curate visual representations of gendered professional norms and present them analytically, surfacing the social regulation of bodies in professional contexts.',
      },
      {
        name: 'Time Travelers',
        description:
          'Groups write fictional letters from 1950s time travelers confused by modern work-family arrangements; peers respond with sociologically informed analysis connecting personal experience to institutional change.',
      },
    ],
  },
  {
    course: 'Technology & Society',
    activities: [
      {
        name: 'Recognition Bingo',
        description:
          'Students use structured gameplay to examine how scientific credit accumulates unequally, mapping advantage and disadvantage onto the social conditions of knowledge production.',
      },
      {
        name: 'AI in Daily Life Diaries',
        description:
          'Students document their everyday encounters with algorithmic systems, then analyze them as a class to surface patterns in how AI shapes choice and perception.',
      },
      {
        name: 'Digital Divide Stackers',
        description:
          'Groups construct physical representations of differential technology access, making structural inequality in digital infrastructure materially visible.',
      },
    ],
  },
]
