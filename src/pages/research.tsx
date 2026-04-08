import Layout from '../components/Layout'
import PublicationItem from '../components/PublicationItem'
import { researchIntro, researchPrograms } from '../content/research'

function boldMyName(text: string) {
  const parts = text.split(/(Lee,\s*Jina|Jina\s+Lee)/)
  return parts.map((part, i) =>
    /^(Lee,\s*Jina|Jina\s+Lee)$/.test(part) ? <strong key={i}>{part}</strong> : part
  )
}

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
              {program.overview && (
                <p className="research-program__overview">{program.overview}</p>
              )}

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
                            pub.status === 'Conditionally Accepted' || pub.status === 'Forthcoming'
                              ? 'badge-accepted'
                              : pub.status === 'Under Review'
                              ? 'badge-review'
                              : 'badge-in-progress'
                          }`}
                        >
                          {pub.status}
                        </span>
                      </div>
                    )}
                    <p className="pub-item__citation">
                      {boldMyName(pub.citation)}
                      {pub.journal && <em className="pub-item__venue"> {pub.journal}.</em>}
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

</div>
      </div>
    </Layout>
  )
}
