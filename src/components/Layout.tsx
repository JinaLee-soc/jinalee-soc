import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { site } from '../content/site'

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
  const pageTitle = title ? `${title} | ${site.name}` : site.title
  const pageDescription = description || site.description
  const pageImage = ogImage || site.socialPreview

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="author" content={site.name} />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site.url} />

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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
