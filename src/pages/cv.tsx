import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import PublicationItem, { boldMyName } from '../components/PublicationItem'
import { useRouter } from 'next/router'
import { site } from '../content/site'
import {
  getLocaleFromPath,
  localeText,
  type Locale,
} from '../content/i18n'
import {
  bookChapters,
  journalArticles,
  worksInProgress,
} from '../content/publications'
import {
  CvDatedItem,
  generatedEditorialService,
  generatedEducation,
  generatedEmployment,
  generatedHonors,
  generatedInvitedTalks,
  generatedMeta,
  generatedOtherService,
  generatedPresentations,
  generatedResearchAreas,
  generatedTeaching,
} from '../content/cvGenerated'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Deterministic build-time date (avoids timezone-dependent hydration mismatch)
function lastUpdatedLabel(locale: Locale): string | null {
  const iso = generatedMeta.generated_at
  if (!iso || iso.length < 7) return null
  const [year, month] = iso.slice(0, 7).split('-')
  const monthNumber = Number(month)
  if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    return null
  }
  if (locale === 'ko') return `${year}년 ${monthNumber}월`
  const monthName = MONTH_NAMES[monthNumber - 1]
  return monthName ? `${monthName} ${year}` : null
}

function CvSection({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="cv-section" aria-label={label}>
      <p className="cv-section__label">{label}</p>
      {children}
    </section>
  )
}

function CvRow({
  period,
  children,
}: {
  period: string
  children: React.ReactNode
}) {
  return (
    <div className="cv-row">
      <p className="cv-row__period">{period}</p>
      <div className="cv-row__body">{children}</div>
    </div>
  )
}

function DatedList({ items }: { items: CvDatedItem[] }) {
  return (
    <>
      {items.map((item, i) => (
        <CvRow key={i} period={item.period}>
          <p>{boldMyName(item.text)}</p>
        </CvRow>
      ))}
    </>
  )
}

export default function CV() {
  const cvPdfUrl = site.cvPdfUrl
  const locale = getLocaleFromPath(useRouter().pathname)
  const labels = localeText[locale]
  const updated = lastUpdatedLabel(locale)

  return (
    <Layout
      title="CV"
      description={labels.cvDescription}
    >
      <div className="page">
        <div className="container container--wide">
          <div className="page-header">
            <h1 className="page-header__title">{labels.cvTitle}</h1>
            {updated && (
              <p className="page-header__intro">{labels.lastUpdated}: {updated}</p>
            )}
          </div>

          <div className="cv-page__actions">
            <a
              href={cvPdfUrl}
              download={site.cvDownloadName}
              className="link-btn link-btn--filled"
            >
              {labels.cvDownload}
            </a>
            <LinkButton href={cvPdfUrl} external>
              {labels.cvOpenPdf}
            </LinkButton>
          </div>

          <CvSection id="employment" label={labels.employment}>
            {generatedEmployment.map((job, i) => (
              <CvRow key={i} period={job.period}>
                <p className="cv-item__title">{job.title}</p>
                {job.institution && (
                  <p className="cv-item__sub">{job.institution}</p>
                )}
              </CvRow>
            ))}
          </CvSection>

          <CvSection id="education" label={labels.education}>
            {generatedEducation.map((edu, i) => (
              <CvRow key={i} period={edu.year}>
                <p className="cv-item__title">{edu.degree}</p>
                {edu.institution && (
                  <p className="cv-item__sub">{edu.institution}</p>
                )}
                {edu.dissertation && (
                  <p className="cv-item__note">
                    {labels.dissertation}: <em>{edu.dissertation}</em>
                  </p>
                )}
                {edu.details?.map((detail, j) => (
                  <p key={j} className="cv-item__note">
                    {detail}
                  </p>
                ))}
              </CvRow>
            ))}
          </CvSection>

          {generatedResearchAreas.length > 0 && (
            <CvSection id="research-areas" label={labels.researchAreas}>
              <p className="cv-areas">{generatedResearchAreas.join(' · ')}</p>
            </CvSection>
          )}

          <CvSection id="publications" label={labels.publications}>
            <p className="cv-sub__label">{labels.journalArticles}</p>
            <ul className="pub-list" aria-label={labels.journalArticles}>
              {journalArticles.map((pub, i) => (
                <PublicationItem key={i} pub={pub} locale={locale} />
              ))}
            </ul>
            {bookChapters.length > 0 && (
              <>
                <p className="cv-sub__label" style={{ marginTop: 'var(--space-8)' }}>
                  {labels.bookChapters}
                </p>
                <ul className="pub-list" aria-label={labels.bookChapters}>
                  {bookChapters.map((pub, i) => (
                    <PublicationItem key={i} pub={pub} locale={locale} />
                  ))}
                </ul>
              </>
            )}
            {worksInProgress.length > 0 && (
              <>
                <p className="cv-sub__label" style={{ marginTop: 'var(--space-8)' }}>
                  {labels.workInProgress}
                </p>
                <ul className="pub-list" aria-label={labels.workInProgress}>
                  {worksInProgress.map((pub, i) => (
                    <PublicationItem key={i} pub={pub} locale={locale} />
                  ))}
                </ul>
              </>
            )}
          </CvSection>

          <CvSection id="talks" label={labels.invitedTalks}>
            <DatedList items={generatedInvitedTalks} />
          </CvSection>

          <CvSection id="presentations" label={labels.presentations}>
            <DatedList items={generatedPresentations} />
          </CvSection>

          <CvSection id="honors" label={labels.honors}>
            <DatedList items={generatedHonors} />
          </CvSection>

          <CvSection id="teaching" label={labels.teaching}>
            {generatedTeaching.institutions?.map((inst, i) => (
              <div key={i} className="cv-group">
                <p className="cv-group__title">{inst.institution}</p>
                {inst.courses.map((course, j) => (
                  <div key={j} className="cv-course">
                    <p className="cv-item__title">{course.title}</p>
                    {course.offering && (
                      <p className="cv-item__sub">{course.offering}</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
            {generatedTeaching.workshops &&
              generatedTeaching.workshops.length > 0 && (
                <div className="cv-group">
                  <p className="cv-group__title">{labels.workshops}</p>
                  <DatedList items={generatedTeaching.workshops} />
                </div>
              )}
          </CvSection>

          <CvSection id="service" label={labels.service}>
            <DatedList items={generatedEditorialService} />
          </CvSection>

          {generatedOtherService.length > 0 && (
            <CvSection id="other-service" label={labels.otherService}>
              {generatedOtherService.map((group, i) => (
                <div key={i} className="cv-group">
                  <p className="cv-group__title">{group.group}</p>
                  <DatedList items={group.items} />
                </div>
              ))}
            </CvSection>
          )}
        </div>
      </div>
    </Layout>
  )
}
