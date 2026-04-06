import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import { site } from '../content/site'

export default function CV() {
  return (
    <Layout
      title="CV"
      description="Curriculum vitae of Jina Lee, Assistant Professor of Sociology at the University of Illinois at Urbana-Champaign."
    >
      <div className="page">
        <div className="container">
          <div className="page-header">
            <h1 className="page-header__title">Curriculum Vitae</h1>
          </div>

          <div style={{ marginBottom: 'var(--space-10)' }}>
            <LinkButton href={site.cvUrl} external filled>
              Download CV (PDF)
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
              <strong>Research interests:</strong> sociology of science, sociology of
              gender, sociology of culture, science of science, computational social
              science.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
