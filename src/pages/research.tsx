import Layout from '../components/Layout'
import PublicationItem from '../components/PublicationItem'
import { researchIntro, researchPrograms, worksInProgress } from '../content/research'

export default function Research() {
  return (
    <Layout
      title="Research"
      description="Research on gender inequality in evaluation systems across scientific and cultural fields."
    >
      <div className="page">
        <div className="container container--wide">

          {/* Page header */}
          <div className="page-header">
            <h1 className="page-header__title">Research</h1>
            <p className="page-header__intro">{researchIntro.summary}</p>
            <p className="page-header__intro mt-4" style={{ color: 'var(--color-text-muted)' }}>
              {researchIntro.methods}
            </p>
          </div>

          {/* Research Programs */}
          {researchPrograms.map((program, idx) => (
            <section
              key={program.id}
              id={program.id}
              className="research-program"
              aria-labelledby={`${program.id}-heading`}
              style={idx > 0 ? { paddingTop: 'var(--space-12)', borderTop: '1px solid var(--color-border-light)' } : {}}
            >
              <h2
                className="research-program__title"
                id={`${program.id}-heading`}
              >
                {program.title}
              </h2>
              <p className="research-program__overview">{program.overview}</p>

              <p className="research-program__pubs-label">
                Related works
              </p>
              <ul className="pub-list" aria-label={`Publications for ${program.title}`}>
                {program.publications.map((pub, i) => (
                  <li key={i} className="pub-item">
                    {pub.status && pub.status !== 'Published' && (
                      <div className="pub-badge-row">
                        <span
                          className={`badge ${
                            pub.status === 'Conditionally Accepted'
                              ? 'badge-accepted'
                              : 'badge-review'
                          }`}
                        >
                          {pub.status}
                        </span>
                        {pub.journal && (
                          <span className="pub-item__venue">{pub.journal}</span>
                        )}
                      </div>
                    )}
                    <p className="pub-item__citation">
                      {pub.citation}
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pub-item__doi"
                        >
                          DOI ↗
                        </a>
                      )}
                    </p>
                    {pub.note && (
                      <p className="pub-item__note">{pub.note}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Works in Progress */}
          <section
            aria-labelledby="wip-heading"
            style={{ paddingTop: 'var(--space-12)', borderTop: '1px solid var(--color-border-light)' }}
          >
            <h2 className="section__title" id="wip-heading" style={{ marginBottom: 'var(--space-6)' }}>
              Works in Progress
            </h2>
            <ul className="pub-list" aria-label="Works in progress">
              {worksInProgress.map((citation, i) => (
                <li key={i} className="pub-item">
                  <p className="pub-item__citation">{citation}</p>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </Layout>
  )
}
