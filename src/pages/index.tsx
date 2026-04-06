import Link from 'next/link'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
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
                  <LinkButton href={`mailto:${site.email}`}>
                    Email
                  </LinkButton>
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
            <p>{bio.about}</p>
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
