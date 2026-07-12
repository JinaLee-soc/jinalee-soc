import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import { useState } from 'react'
import PublicationItem from '../components/PublicationItem'
import { bio } from '../content/bio'
import { site, basePath } from '../content/site'
import {
  getLocaleFromPath,
  localizedPath,
  localeText,
} from '../content/i18n'
import {
  bookChapters,
  journalArticles,
  worksInProgress,
} from '../content/publications'
import { getSiteContent } from '../content/siteContentGenerated'

// Deterministic token layout so server and client render identical SVG markup.
function corpusTokens() {
  let seed = 20260711
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }
  const tokens: Array<{ x: number; y: number; w: number; highlighted: boolean; o: number }> = []
  let y = 26
  for (let row = 0; row < 17; row++) {
    let x = 30 + rnd() * 40
    const rowEnd = 600 - rnd() * 30
    while (x < rowEnd) {
      let w = 14 + rnd() * 44
      if (x + w > rowEnd) w = rowEnd - x
      const highlighted = rnd() < 0.13
      const fade = Math.min(1, (x - 20) / 420)
      tokens.push({
        x: Number(x.toFixed(1)),
        y,
        w: Number(Math.max(w, 8).toFixed(1)),
        highlighted,
        o: Number((highlighted ? 0.18 + 0.3 * fade : 0.06 + 0.13 * fade).toFixed(2)),
      })
      x += w + 8 + rnd() * 6
    }
    y += 24
  }
  return tokens
}

const CORPUS_TOKENS = corpusTokens()

// Italicize known journal/venue names (pulled from the CV) wherever they
// appear in free text, so prose like the About paragraph doesn't need
// manual markup and stays correct as venues change.
function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const KNOWN_VENUES = Array.from(
  new Set(
    [...journalArticles, ...bookChapters, ...worksInProgress]
      .map((pub) => pub.venue?.trim())
      .filter((venue): venue is string => !!venue)
  )
).sort((a, b) => b.length - a.length)

const VENUE_PATTERN = KNOWN_VENUES.length
  ? new RegExp(`(${KNOWN_VENUES.map(escapeRegExp).join('|')})`, 'g')
  : null

function italicizeVenues(text: string) {
  if (!VENUE_PATTERN) return text
  const parts = text.split(VENUE_PATTERN)
  return parts.map((part, i) =>
    KNOWN_VENUES.includes(part) ? <em key={i}>{part}</em> : part
  )
}

function CorpusMotif() {
  return (
    <svg
      className="hero__motif"
      width="620"
      height="440"
      viewBox="0 0 620 440"
      fill="none"
      aria-hidden="true"
    >
      {CORPUS_TOKENS.map((t, i) => (
        <rect
          key={i}
          x={t.x}
          y={t.y}
          width={t.w}
          height={8}
          rx={4}
          fill={t.highlighted ? 'var(--color-navy)' : 'var(--color-motif-muted)'}
          opacity={t.o}
        />
      ))}
    </svg>
  )
}

export default function Home() {
  const router = useRouter()
  const [emailCopied, setEmailCopied] = useState(false)
  const locale = getLocaleFromPath(router.pathname)
  const labels = localeText[locale]
  const content = getSiteContent(locale)

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email).then(() => {
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    })
  }

  return (
    <Layout
      title={undefined}
      description={labels.homeDescription}
    >
      <div className="page page--home">
        {/* ===== Hero ===== */}
        <section className="hero" aria-labelledby="hero-name">
          <CorpusMotif />
          <div className="container container--wide">
            <div className="hero__inner">
              <div className="hero__text">
                <h1 className="hero__name" id="hero-name">
                  {labels.displayName}, Ph.D.
                </h1>
                <p className="hero__title">{locale === 'en' ? bio.title : labels.profileTitle}</p>
                <p className="hero__affiliation">{bio.affiliation}</p>
                <p className="hero__statement">{locale === 'en' ? bio.positioningStatement : labels.positioningStatement}</p>
                <div className="hero__links">
                  <LinkButton href={site.cvUrl} filled>
                    CV
                  </LinkButton>
                  <LinkButton href={site.googleScholar} external>
                    Google Scholar
                  </LinkButton>
                  <LinkButton href={site.orcid} external>
                    ORCID
                  </LinkButton>
                  <button onClick={copyEmail} className="link-btn" type="button">
                    {emailCopied ? labels.copied : labels.email}
                  </button>
                </div>
              </div>
              <img
                src={`${basePath}/headshot.png`}
                alt={locale === 'en' ? bio.headshotAlt : labels.headshotAlt}
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
            <p className="section__heading" id="about-heading" aria-label={labels.about}>
              {labels.about}
            </p>
            {content.homeAbout.map((paragraph, i) => (
              <p key={i} style={{ marginTop: i > 0 ? 'var(--space-4)' : 0 }}>
                {italicizeVenues(paragraph)}
              </p>
            ))}
          </div>
        </section>

        {/* ===== Publications ===== */}
        <section
          id="publications"
          className="section"
          aria-labelledby="publications-heading"
          style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: 'var(--space-16)' }}
        >
          <div className="container container--wide">
            <p className="section__heading" id="publications-heading">
              {labels.publications}
            </p>
            <p className="pub-category-label">
              <em>{labels.journalArticles}</em>
            </p>
            <ul className="pub-list" aria-label={labels.journalArticles}>
              {journalArticles.map((pub, i) => (
                <PublicationItem key={i} pub={pub} locale={locale} />
              ))}
            </ul>
            {bookChapters.length > 0 && (
              <div className="pub-subsection">
                <p className="pub-category-label">
                  <em>{labels.bookChapters}</em>
                </p>
                <ul className="pub-list" aria-label={labels.bookChapters}>
                  {bookChapters.map((pub, i) => (
                    <PublicationItem key={`book-${i}`} pub={pub} locale={locale} />
                  ))}
                </ul>
              </div>
            )}
            {worksInProgress.length > 0 && (
              <div className="pub-subsection">
                <h3 className="pub-subsection__title">{labels.workInProgress}</h3>
                <ul className="pub-list" aria-label={labels.workInProgress}>
                  {worksInProgress.map((pub, i) => (
                    <PublicationItem key={`wip-${i}`} pub={pub} locale={locale} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* ===== Teaching ===== */}
        <section
          id="teaching"
          className="section"
          aria-labelledby="teaching-heading"
          style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: 'var(--space-16)' }}
        >
          <div className="container container--wide">
            <p className="section__heading" id="teaching-heading">
              {labels.teachingPreview}
            </p>
            {content.homeTeaching.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  marginTop: i > 0 ? 'var(--space-3)' : 0,
                  marginBottom: 'var(--space-5)',
                }}
              >
                {paragraph}
              </p>
            ))}
            <Link href={localizedPath('/teaching', locale)} className="link-btn" style={{ display: 'inline-flex' }}>
              {labels.teachingLink}
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}
