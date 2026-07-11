import rawSiteContent from '../generated/site-content.json'
import { bio } from './bio'
import {
  Publication,
  bookChapters,
  journalArticles,
  worksInProgress,
} from './publications'
import { researchIntro, researchPrograms } from './research'
import { classroomActivities, courses, teachingPhilosophy } from './teaching'

export interface ScProgram {
  title: string
  overview: string[]
  key_questions: string[]
  publications: string[]
}

export interface ScCourse {
  title: string
  description: string[]
}

export interface ScActivityItem {
  name: string
  description: string[]
}

export interface ScActivityGroup {
  course: string
  items: ScActivityItem[]
}

interface SiteContent {
  home?: { about?: string[]; teaching_snapshot?: string[] }
  research?: { intro?: string[]; programs?: ScProgram[] }
  teaching?: {
    philosophy?: string[]
    courses?: ScCourse[]
    activities?: ScActivityGroup[]
  }
}

const sc = rawSiteContent as SiteContent

// ── Home (fall back to the built-in narrative when the doc is absent) ──

export const scHomeAbout: string[] =
  sc.home?.about?.length ? sc.home.about : [bio.about]

export const scHomeTeaching: string[] =
  sc.home?.teaching_snapshot?.length
    ? sc.home.teaching_snapshot
    : [bio.teachingSnapshot]

// ── Research (fall back to the built-in narrative when the doc is absent) ──

const fallbackIntro = [researchIntro.summary, researchIntro.methods]

const fallbackPrograms: ScProgram[] = researchPrograms.map((program) => ({
  title: program.title,
  overview: [program.overview],
  key_questions: program.keyQuestions,
  publications: program.publications.map((pub) => pub.citation),
}))

export const scResearchIntro: string[] =
  sc.research?.intro?.length ? sc.research.intro : fallbackIntro

export const scResearchPrograms: ScProgram[] =
  sc.research?.programs?.length ? sc.research.programs : fallbackPrograms

// ── Teaching ──

export const scTeachingPhilosophy: string[] =
  sc.teaching?.philosophy?.length ? sc.teaching.philosophy : [teachingPhilosophy]

export const scCourseDescriptions: ScCourse[] =
  sc.teaching?.courses?.length
    ? sc.teaching.courses
    : courses.map((course) => ({
        title: course.title,
        description: [course.description],
      }))

export const scActivityGroups: ScActivityGroup[] =
  sc.teaching?.activities?.length
    ? sc.teaching.activities
    : classroomActivities.map((group) => ({
        course: group.course,
        items: group.activities.map((activity) => ({
          name: activity.name,
          description: [activity.description],
        })),
      }))

// ── CV-synced publication matching ──
// Titles listed in site-content.docx are matched against the parsed CV so
// statuses, DOIs, and venues always follow cv.docx.

function normalizeTitle(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

const allPublications: Publication[] = [
  ...journalArticles,
  ...bookChapters,
  ...worksInProgress,
]

export function findCourseDescription(title: string): string[] {
  const target = normalizeTitle(title)
  const match = scCourseDescriptions.find((course) => {
    const candidate = normalizeTitle(course.title)
    return candidate.includes(target) || target.includes(candidate)
  })
  return match?.description ?? []
}

export interface MatchedPublication {
  reference: string
  publication?: Publication
}

export function matchPublication(reference: string): MatchedPublication {
  const target = normalizeTitle(reference)
  if (!target) return { reference }

  const publication = allPublications.find((pub) => {
    const candidate = normalizeTitle(pub.title)
    return candidate.includes(target) || target.includes(candidate)
  })

  return { reference, publication }
}
