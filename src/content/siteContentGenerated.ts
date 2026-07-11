import rawSiteContent from '../generated/site-content.json'
import rawSiteContentKo from '../generated/site-content-ko.json'
import { bio } from './bio'
import {
  Publication,
  bookChapters,
  journalArticles,
  worksInProgress,
} from './publications'
import { researchIntro, researchPrograms } from './research'
import { classroomActivities, courses, teachingPhilosophy } from './teaching'
import type { Locale } from './i18n'

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

const fallbackIntro = [researchIntro.summary, researchIntro.methods]

const fallbackPrograms: ScProgram[] = researchPrograms.map((program) => ({
  title: program.title,
  overview: [program.overview],
  key_questions: program.keyQuestions,
  publications: program.publications.map((pub) => pub.citation),
}))

export interface LocalizedSiteContent {
  homeAbout: string[]
  homeTeaching: string[]
  researchIntro: string[]
  researchPrograms: ScProgram[]
  teachingPhilosophy: string[]
  courseDescriptions: ScCourse[]
  activityGroups: ScActivityGroup[]
}

function buildSiteContent(rawContent: unknown): LocalizedSiteContent {
  const sc = rawContent as SiteContent

  return {
    homeAbout: sc.home?.about?.length ? sc.home.about : [bio.about],
    homeTeaching: sc.home?.teaching_snapshot?.length
      ? sc.home.teaching_snapshot
      : [bio.teachingSnapshot],
    researchIntro: sc.research?.intro?.length ? sc.research.intro : fallbackIntro,
    researchPrograms: sc.research?.programs?.length
      ? sc.research.programs
      : fallbackPrograms,
    teachingPhilosophy: sc.teaching?.philosophy?.length
      ? sc.teaching.philosophy
      : [teachingPhilosophy],
    courseDescriptions: sc.teaching?.courses?.length
      ? sc.teaching.courses
      : courses.map((course) => ({
          title: course.title,
          description: [course.description],
        })),
    activityGroups: sc.teaching?.activities?.length
      ? sc.teaching.activities
      : classroomActivities.map((group) => ({
          course: group.course,
          items: group.activities.map((activity) => ({
            name: activity.name,
            description: [activity.description],
          })),
        })),
  }
}

export const siteContentByLocale: Record<Locale, LocalizedSiteContent> = {
  en: buildSiteContent(rawSiteContent),
  ko: buildSiteContent(rawSiteContentKo),
}

export function getSiteContent(locale: Locale): LocalizedSiteContent {
  return siteContentByLocale[locale]
}

export const scHomeAbout = siteContentByLocale.en.homeAbout
export const scHomeTeaching = siteContentByLocale.en.homeTeaching
export const scResearchIntro = siteContentByLocale.en.researchIntro
export const scResearchPrograms = siteContentByLocale.en.researchPrograms
export const scTeachingPhilosophy = siteContentByLocale.en.teachingPhilosophy
export const scCourseDescriptions = siteContentByLocale.en.courseDescriptions
export const scActivityGroups = siteContentByLocale.en.activityGroups

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

export function findCourseDescription(title: string, locale: Locale = 'en'): string[] {
  const target = normalizeTitle(title)
  const match = siteContentByLocale[locale].courseDescriptions.find((course) => {
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
