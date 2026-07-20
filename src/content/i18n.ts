export type Locale = 'en' | 'ko'

export const localeText = {
  en: {
    displayName: 'Jina Lee',
    home: 'Home',
    research: 'Research',
    teaching: 'Teaching',
    cv: 'CV',
    about: 'About',
    publications: 'Publications',
    teachingPreview: 'Teaching',
    teachingLink: 'Teaching →',
    keyQuestions: 'Key questions',
    relatedWork: 'Related work',
    teachingPhilosophy: 'Teaching Philosophy',
    courses: 'Courses',
    classroomActivities: 'Selected Classroom Activities',
    activitiesFor: 'Activities for',
    cvTitle: 'Curriculum Vitae',
    cvDescription:
      'Curriculum vitae of Jina Lee, Assistant Professor of Sociology at the University of Illinois at Urbana-Champaign.',
    cvDownload: 'Download CV (PDF)',
    cvOpenPdf: 'Open PDF in New Tab',
    lastUpdated: 'Last updated',
    employment: 'Employment',
    education: 'Education',
    researchAreas: 'Research Areas',
    invitedTalks: 'Invited Talks',
    presentations: 'Selected Conference Presentations',
    honors: 'Honors & Grants',
    service: 'Review & Editorial Service',
    otherService: 'Other Professional Service',
    journalArticles: 'Journal Articles',
    bookChapters: 'Book Chapters',
    workInProgress: 'Work in Progress',
    workshops: 'Workshops',
    dissertation: 'Dissertation',
    email: 'Email',
    copied: 'Copied!',
    copyEmail: 'Copy email address',
    textSize: 'Text size',
    decreaseTextSize: 'Decrease text size',
    increaseTextSize: 'Increase text size',
    resetTextSize: 'Reset text size to default',
    resetTextSizeTitle: 'Reset text size',
    language: 'Language',
    mainNavigation: 'Main navigation',
    switchToKorean: '한국어',
    switchToEnglish: 'English',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    homeDescription:
      'Assistant Professor of Sociology at the University of Illinois at Urbana-Champaign. Research on gender inequality in evaluation systems across scientific and cultural fields.',
    profileTitle: 'Assistant Professor of Sociology',
    positioningStatement:
      'I study how evaluation systems reproduce gender inequality in science and in cultural fields.',
    headshotAlt: 'Jina Lee, Assistant Professor of Sociology',
    researchDescription:
      'Research on evaluative ambiguity, durable recognition, and the social and technical organization of judgment.',
    teachingDescription:
      'Teaching philosophy, courses, and classroom activities in sociology of culture, sociology of gender, social statistics, and technology and society.',
  },
  ko: {
    displayName: '이진아',
    home: '홈',
    research: '연구',
    teaching: '강의',
    cv: 'CV',
    about: '소개',
    publications: '논문',
    teachingPreview: '강의',
    teachingLink: '강의 보기 →',
    keyQuestions: '핵심 질문',
    relatedWork: '관련 연구',
    teachingPhilosophy: '강의 철학',
    courses: '과목',
    classroomActivities: '수업 활동 사례',
    activitiesFor: '수업 활동:',
    cvTitle: 'Curriculum Vitae',
    cvDescription:
      'Jina Lee의 영문 이력서입니다. 일리노이대학교 어배너-섐페인 사회학과 조교수입니다.',
    cvDownload: '영문 CV 다운로드 (PDF)',
    cvOpenPdf: '영문 PDF 새 탭에서 열기',
    lastUpdated: '최근 업데이트',
    employment: '경력',
    education: '학력',
    researchAreas: '연구 분야',
    invitedTalks: '초청 강연',
    presentations: '주요 학술대회 발표',
    honors: '수상 및 연구비',
    service: '심사 및 편집 활동',
    otherService: '기타 전문 활동',
    journalArticles: '학술지 논문',
    bookChapters: '저서 수록 논문',
    workInProgress: '진행 중인 연구',
    workshops: '워크숍',
    dissertation: '학위논문',
    email: '이메일',
    copied: '복사됨!',
    copyEmail: '이메일 주소 복사',
    textSize: '글자 크기',
    decreaseTextSize: '글자 크기 줄이기',
    increaseTextSize: '글자 크기 키우기',
    resetTextSize: '기본 글자 크기로 되돌리기',
    resetTextSizeTitle: '글자 크기 초기화',
    language: '언어',
    mainNavigation: '주 메뉴',
    switchToKorean: '한국어',
    switchToEnglish: 'English',
    openMenu: '메뉴 열기',
    closeMenu: '메뉴 닫기',
    homeDescription:
      '일리노이대학교 어배너-섐페인 사회학과 조교수. 과학과 문화의 평가 체계에서 나타나는 젠더 불평등을 연구합니다.',
    profileTitle: '사회학과 조교수',
    positioningStatement:
      '저는 과학과 문화의 평가 체계가 젠더 불평등을 어떻게 재생산하는지 연구합니다.',
    headshotAlt: '사회학과 조교수 이진아',
    researchDescription:
      '평가의 모호성, 지속적 인정, 그리고 판단을 조직하는 사회적·기술적 구조에 관한 연구입니다.',
    teachingDescription:
      '문화사회학, 젠더사회학, 사회통계학, 기술과 사회를 다루는 강의 철학과 과목 및 수업 활동입니다.',
  },
} as const

export function getLocaleFromPath(pathname: string): Locale {
  return /^\/ko(?:\/|$)/.test(pathname) ? 'ko' : 'en'
}

export function localizedPath(pathname: string, locale: Locale): string {
  const withoutLocale = pathname.replace(/^\/ko(?=\/|$)/, '') || '/'
  if (locale === 'en') return withoutLocale
  return withoutLocale === '/' ? '/ko/' : `/ko${withoutLocale}`
}
