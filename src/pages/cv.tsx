import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import { site } from '../content/site'
import { generatedResearchAreas } from '../content/cvGenerated'

export default function CV() {
  const cvPdfUrl = site.cvUrl
  const researchAreas = generatedResearchAreas.length
    ? generatedResearchAreas.join(', ')
    : 'sociology of science, sociology of gender, sociology of culture, science of science, computational social science'

  return (
    <Layout
      title="CV"
      description="Curriculum vitae of Jina Lee, Assistant Professor of Sociology at the University of Illinois at Urbana-Champaign."
    >
      <div className="page">
        <div className="container container--wide">
          <div className="page-header">
            <h1 className="page-header__title">Curriculum Vitae</h1>
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
              Open in New Tab
            </LinkButton>
          </div>

          <div className="cv-page__summary">
            <p style={{ marginBottom: 'var(--space-4)' }}>
              <strong>Jina Lee</strong> is an Assistant Professor of Sociology at the
              University of Illinois at Urbana-Champaign. Her research examines gender
              inequality in evaluation systems across scientific and cultural fields, using
              computational text analysis, bibliometric analysis, and survey experiments.
            </p>
            <p className="cv-page__interests">
              <strong>Research interests:</strong> {researchAreas}.
            </p>
          </div>

          <section className="cv-page__viewer-shell" aria-label="Embedded CV PDF">
            <object
              data={cvPdfUrl}
              type="application/pdf"
              className="cv-page__viewer"
              aria-label="Jina Lee CV PDF Viewer"
            >
              <p className="cv-page__fallback">
                PDF preview is not available in this browser.{' '}
                <a href={cvPdfUrl} target="_blank" rel="noopener noreferrer">
                  Open CV PDF
                </a>
                .
              </p>
            </object>
          </section>
        </div>
      </div>
    </Layout>
  )
}
