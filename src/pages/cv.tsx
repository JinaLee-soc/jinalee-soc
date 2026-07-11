import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import PublicationItem, { boldMyName } from '../components/PublicationItem'
import { site } from '../content/site'
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
function lastUpdatedLabel(): string | null {
  const iso = generatedMeta.generated_at
  if (!iso || iso.length < 7) return null
  const [year, month] = iso.slice(0, 7).split('-')
  const monthName = MONTH_NAMES[Number(month) - 1]
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
  const updated = lastUpdatedLabel()

  return (
    <Layout
      title="CV"
      description="Curriculum vitae of Jina Lee, Assistant Professor of Sociology at the University of Illinois at Urbana-Champaign."
    >
      <div className="page">
        <div className="container container--wide">
          <div className="page-header">
            <h1 className="page-header__title">Curriculum Vitae</h1>
            {updated && (
              <p className="page-header__intro">Last updated {updated}.</p>
            )}
          </div>

          <div className="cv-page__actions">
            <a
              href={cvPdfUrl}
              download={site.cvDownloadName}
              className="link-btn link-btn--filled"
            >
              Download CV (PDF)
            </a>
            <LinkButton href={cvPdfUrl} external>
              Open PDF in New Tab
            </LinkButton>
          </div>

          <CvSection id="employment" label="Employment">
            {generatedEmployment.map((job, i) => (
              <CvRow key={i} period={job.period}>
                <p className="cv-item__title">{job.title}</p>
                {job.institution && (
                  <p className="cv-item__sub">{job.institution}</p>
                )}
              </CvRow>
            ))}
          </CvSection>

          <CvSection id="education" label="Education">
            {generatedEducation.map((edu, i) => (
              <CvRow key={i} period={edu.year}>
                <p className="cv-item__title">{edu.degree}</p>
                {edu.institution && (
                  <p className="cv-item__sub">{edu.institution}</p>
                )}
                {edu.dissertation && (
                  <p className="cv-item__note">
                    Dissertation: <em>{edu.dissertation}</em>
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
            <CvSection id="research-areas" label="Research Areas">
              <p className="cv-areas">{generatedResearchAreas.join(' · ')}</p>
            </CvSection>
          )}

          <CvSection id="publications" label="Publications">
            <p className="cv-sub__label">Journal Articles</p>
            <ul className="pub-list" aria-label="Journal articles">
              {journalArticles.map((pub, i) => (
                <PublicationItem key={i} pub={pub} />
              ))}
            </ul>
            {bookChapters.length > 0 && (
              <>
                <p className="cv-sub__label" style={{ marginTop: 'var(--space-8)' }}>
                  Book Chapters
                </p>
                <ul className="pub-list" aria-label="Book chapters">
                  {bookChapters.map((pub, i) => (
                    <PublicationItem key={i} pub={pub} />
                  ))}
                </ul>
              </>
            )}
            {worksInProgress.length > 0 && (
              <>
                <p className="cv-sub__label" style={{ marginTop: 'var(--space-8)' }}>
                  Work in Progress
                </p>
                <ul className="pub-list" aria-label="Work in progress">
                  {worksInProgress.map((pub, i) => (
                    <PublicationItem key={i} pub={pub} />
                  ))}
                </ul>
              </>
            )}
          </CvSection>

          <CvSection id="talks" label="Invited Talks">
            <DatedList items={generatedInvitedTalks} />
          </CvSection>

          <CvSection id="presentations" label="Selected Conference Presentations">
            <DatedList items={generatedPresentations} />
          </CvSection>

          <CvSection id="honors" label="Honors & Grants">
            <DatedList items={generatedHonors} />
          </CvSection>

          <CvSection id="teaching" label="Teaching">
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
                  <p className="cv-group__title">Workshops</p>
                  <DatedList items={generatedTeaching.workshops} />
                </div>
              )}
          </CvSection>

          <CvSection id="service" label="Review & Editorial Service">
            <DatedList items={generatedEditorialService} />
          </CvSection>

          {generatedOtherService.length > 0 && (
            <CvSection id="other-service" label="Other Professional Service">
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
