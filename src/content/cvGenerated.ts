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

interface CvData {
  contact?: CvContact
  employment?: CvEmployment[]
  research_areas?: string[]
  publications?: {
    published?: CvPublication[]
    work_in_progress?: CvPublication[]
  }
}

export const cvData = rawCvData as CvData

export const generatedContact: CvContact = cvData.contact ?? {}
export const generatedEmployment: CvEmployment[] = cvData.employment ?? []
export const generatedResearchAreas: string[] = cvData.research_areas ?? []
export const generatedPublished: CvPublication[] =
  cvData.publications?.published ?? []
export const generatedWorkInProgress: CvPublication[] =
  cvData.publications?.work_in_progress ?? []
