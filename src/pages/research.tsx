import Layout from '../components/Layout'
import PublicationItem from '../components/PublicationItem'
import {
  matchPublication,
  scResearchIntro,
  scResearchPrograms,
} from '../content/siteContentGenerated'

export default function Research() {
  return (
    <Layout
      title="Research"
      description="Research programs on gender inequality in evaluation systems across scientific and cultural fields."
    >
      <div className="page">
        <div className="container container--wide">
          <div className="page-header">
            <h1 className="page-header__title">Research</h1>
            {scResearchIntro.map((paragraph, i) => (
              <p key={i} className="page-header__intro" style={{ marginTop: i > 0 ? 'var(--space-3)' : 0 }}>
                {paragraph}
              </p>
            ))}
          </div>

          {scResearchPrograms.map((program, pi) => (
            <section
              key={pi}
              id={`program-${pi + 1}`}
              className="research-program"
              aria-label={program.title}
            >
              <h2 className="research-program__title">{program.title}</h2>
              {program.overview.map((paragraph, i) => (
                <p key={i} className="research-program__overview">
                  {paragraph}
                </p>
              ))}

              {program.key_questions.length > 0 && (
                <>
                  <p className="research-program__pubs-label">Key questions</p>
                  <ul className="kq-list">
                    {program.key_questions.map((question, i) => (
                      <li key={i}>{question}</li>
                    ))}
                  </ul>
                </>
              )}

              {program.publications.length > 0 && (
                <>
                  <p
                    className="research-program__pubs-label"
                    style={{ marginTop: 'var(--space-6)' }}
                  >
                    Related work
                  </p>
                  <ul className="pub-list">
                    {program.publications.map((reference, i) => {
                      const { publication } = matchPublication(reference)
                      return publication ? (
                        <PublicationItem key={i} pub={publication} />
                      ) : (
                        <li key={i} className="pub-item">
                          <p className="pub-item__citation">
                            <em className="pub-item__title">{reference}</em>
                          </p>
                        </li>
                      )
                    })}
                  </ul>
                </>
              )}
            </section>
          ))}
        </div>
      </div>
    </Layout>
  )
}
