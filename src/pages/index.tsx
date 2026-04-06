import Link from 'next/link'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import { useState } from 'react'
import ResearchCard from '../components/ResearchCard'
import PublicationItem from '../components/PublicationItem'
import { bio } from '../content/bio'
import { site, basePath } from '../content/site'
import { researchPrograms } from '../content/research'
import { journalArticles } from '../content/publications'

// Research card summaries (shorter than full overview)
const researchCardSummaries: Record<string, string> = {
  'scientific-evaluation':
    'How do gendered dynamics shape which scientific contributions get recognized, cited, and treated as authoritative?',
  'cultural-evaluation':
    'How do canonization processes in literature and culture embed and reproduce gender hierarchies?',
}

export default function Home() {
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email).then(() => {
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    })
  }

  return (
    <Layout
      title={undefined}
      description={site.description}
    >
      <div className="page page--home">
        {/* ===== Hero ===== */}
        <section className="hero" aria-labelledby="hero-name">
          <div className="container container--wide">
            <div className="hero__inner">
              <div>
                <h1 className="hero__name" id="hero-name">
                  {bio.name}
                </h1>
                <p className="hero__title">{bio.title}</p>
                <p className="hero__affiliation">{bio.affiliation}</p>
                <p className="hero__statement">{bio.positioningStatement}</p>
                <div className="hero__links">
                  <LinkButton href={site.cvUrl} external filled>
                    CV
                  </LinkButton>
                  <LinkButton href={site.googleScholar} external>
                    Google Scholar
                  </LinkButton>
                  <LinkButton href={site.orcid} external>
                    ORCID
                  </LinkButton>
                  <button onClick={copyEmail} className="link-btn" type="button">
                    {emailCopied ? 'Copied!' : 'Email'}
                  </button>
                </div>
              </div>
              <img
                src={`${basePath}/headshot.jpg`}
                alt={bio.headshotAlt}
                className="hero__headshot"
                width={180}
                height={220}
              />
            </div>
          </div>
        </section>

        {/* ===== About ===== */}
        <section className="section" aria-labelledby="about-heading">
          <div className="container container--wide">
            <p className="section__heading" id="about-heading" aria-label="About">
              About
            </p>
            <p>
              Jina Lee is a sociologist who studies how seemingly objective evaluation systems
              reproduce social hierarchies. Using computational text analysis, bibliometric
              analysis, and experimental methods, her research asks: whose contributions are
              recognized as valuable, and whose are discounted? In science, she examines how
              knowledge claims and their reception are gendered. In cultural markets, she
              investigates how canonization processes embed gender biases. Expanding to global
              Across these contexts, her work reveals a
              consistent pattern: evaluation practices that appear meritocratic embed biases that
              disadvantage women and lower-status actors. Her research has been published in
              the{' '}
              <a href="https://doi.org/10.1177/00031224231168074" target="_blank" rel="noopener noreferrer"><em>American Sociological Review</em></a>,{' '}
              <a href="https://doi.org/10.1016/j.poetic.2025.102024" target="_blank" rel="noopener noreferrer"><em>Poetics</em></a>,{' '}
              <a href="https://doi.org/10.1177/23780231221082422" target="_blank" rel="noopener noreferrer"><em>Socius</em></a>,{' '}
              and{' '}
              <a href="https://doi.org/10.1080/19420676.2021.2004206" target="_blank" rel="noopener noreferrer"><em>Journal of Social Entrepreneurship</em></a>.
            </p>
          </div>
        </section>

        {/* ===== Research Areas ===== */}
        <section
          className="section"
          aria-labelledby="research-heading"
          style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: 'var(--space-16)' }}
        >
          <div className="container container--wide">
            <p className="section__heading" id="research-heading">
              Research Areas
            </p>
            <div className="research-grid">
              {researchPrograms.map((program) => (
                <ResearchCard
                  key={program.id}
                  id={program.id}
                  title={program.title}
                  description={researchCardSummaries[program.id] || program.overview.slice(0, 140) + '…'}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===== Publications ===== */}
        <section
          className="section"
          aria-labelledby="publications-heading"
          style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: 'var(--space-16)' }}
        >
          <div className="container container--wide">
            <p className="section__heading" id="publications-heading">
              Publications
            </p>
            <ul className="pub-list" aria-label="Published journal articles">
              {journalArticles.map((pub, i) => (
                <PublicationItem key={i} pub={pub} showStatus={false} />
              ))}
            </ul>
          </div>
        </section>

        {/* ===== Teaching ===== */}
        <section
          className="section"
          aria-labelledby="teaching-heading"
          style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: 'var(--space-16)' }}
        >
          <div className="container container--wide">
            <p className="section__heading" id="teaching-heading">
              Teaching
            </p>
            <p style={{ marginBottom: 'var(--space-5)' }}>{bio.teachingSnapshot}</p>
            <Link href="/teaching" className="link-btn" style={{ display: 'inline-flex' }}>
              Teaching →
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}
