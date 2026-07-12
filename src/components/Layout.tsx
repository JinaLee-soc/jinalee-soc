import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'
import { site } from '../content/site'
import { getLocaleFromPath, localizedPath, localeText } from '../content/i18n'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  ogImage?: string
}

export default function Layout({
  children,
  title,
  description,
  ogImage,
}: LayoutProps) {
  const router = useRouter()
  const locale = getLocaleFromPath(router.pathname)
  const labels = localeText[locale]
  const pageTitle = title ? `${title} | ${labels.displayName}` : locale === 'ko' ? '이진아 | 사회학자' : site.title
  const pageDescription = description || site.description
  const pageImage = ogImage || site.socialPreview
  const canonicalPath = localizedPath(router.pathname, locale)
  const englishUrl = `${site.url}${localizedPath(router.pathname, 'en')}`
  const koreanUrl = `${site.url}${localizedPath(router.pathname, 'ko')}`
  const canonicalUrl = `${site.url}${canonicalPath}`

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="author" content={site.name} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={englishUrl} />
        <link rel="alternate" hrefLang="ko" href={koreanUrl} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={locale === 'ko' ? 'ko_KR' : 'en_US'} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
          rel="stylesheet"
        />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: site.name,
              jobTitle: 'Assistant Professor of Sociology',
              affiliation: {
                '@type': 'Organization',
                name: 'University of Illinois at Urbana-Champaign',
              },
              url: site.url,
              image: `${site.url}/headshot.png`,
              sameAs: [site.googleScholar, site.orcid],
            }),
          }}
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
