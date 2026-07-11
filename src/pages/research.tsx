import Layout from '../components/Layout'
import PublicationItem from '../components/PublicationItem'
import { useRouter } from 'next/router'
import { getLocaleFromPath, localeText } from '../content/i18n'
import { getSiteContent, matchPublication } from '../content/siteContentGenerated'

export default function Research() {
  const locale = getLocaleFromPath(useRouter().pathname)
  const labels = localeText[locale]
  const content = getSiteContent(locale)

  return (
    <Layout
      title={labels.research}
      description={labels.researchDescription}
    >
      <div className="page">
        <div className="container container--wide">
          <div className="page-header">
            <h1 className="page-header__title">{labels.research}</h1>
            {content.researchIntro.map((paragraph, i) => (
              <p key={i} className="page-header__intro" style={{ marginTop: i > 0 ? 'var(--space-3)' : 0 }}>
                {paragraph}
              </p>
            ))}
          </div>

          {content.researchPrograms.map((program, pi) => (
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
                  <p className="research-program__pubs-label">{labels.keyQuestions}</p>
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
                    {labels.relatedWork}
                  </p>
                  <ul className="pub-list">
                    {program.publications.map((reference, i) => {
                      const { publication } = matchPublication(reference)
                      return publication ? (
                        <PublicationItem key={i} pub={publication} locale={locale} />
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
