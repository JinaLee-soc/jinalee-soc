import rawCvData from '../generated/cv-data.json'

export interface CvContact {
  email?: string
  website?: string
}

export interface CvPublication {
  year?: string
  status?: string
  authors: string
  title: string
  venue?: string
  doi?: string
  volume_issue_pages?: string
  manuscript_available?: boolean
}

export interface CvEmployment {
  period: string
  title: string
  institution?: string
}

export interface CvEducation {
  year: string
  degree: string
  institution?: string
  dissertation?: string
  details?: string[]
}

export interface CvDatedItem {
  period: string
  text: string
}

export interface CvCourse {
  title: string
  offering?: string
}

export interface CvTeachingInstitution {
  institution: string
  courses: CvCourse[]
}

export interface CvTeaching {
  institutions?: CvTeachingInstitution[]
  workshops?: CvDatedItem[]
}

export interface CvServiceGroup {
  group: string
  items: CvDatedItem[]
}

interface CvData {
  meta?: { source?: string; generated_at?: string }
  contact?: CvContact
  employment?: CvEmployment[]
  education?: CvEducation[]
  research_areas?: string[]
  publications?: {
    published?: CvPublication[]
    work_in_progress?: CvPublication[]
  }
  invited_talks?: CvDatedItem[]
  selected_conference_presentations?: CvDatedItem[]
  honors_and_grants?: CvDatedItem[]
  teaching?: CvTeaching
  review_and_editorial_service?: CvDatedItem[]
  other_professional_service?: CvServiceGroup[]
}

export const cvData = rawCvData as CvData

export const generatedMeta = cvData.meta ?? {}
export const generatedContact: CvContact = cvData.contact ?? {}
export const generatedEmployment: CvEmployment[] = cvData.employment ?? []
export const generatedEducation: CvEducation[] = cvData.education ?? []
export const generatedResearchAreas: string[] = cvData.research_areas ?? []
export const generatedPublished: CvPublication[] =
  cvData.publications?.published ?? []
export const generatedWorkInProgress: CvPublication[] =
  cvData.publications?.work_in_progress ?? []
export const generatedInvitedTalks: CvDatedItem[] = cvData.invited_talks ?? []
export const generatedPresentations: CvDatedItem[] =
  cvData.selected_conference_presentations ?? []
export const generatedHonors: CvDatedItem[] = cvData.honors_and_grants ?? []
export const generatedTeaching: CvTeaching = cvData.teaching ?? {}
export const generatedEditorialService: CvDatedItem[] =
  cvData.review_and_editorial_service ?? []
export const generatedOtherService: CvServiceGroup[] =
  cvData.other_professional_service ?? []
