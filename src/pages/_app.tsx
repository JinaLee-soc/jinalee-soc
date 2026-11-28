import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import '../styles/globals.css'

const DevDesignPanel =
  process.env.NODE_ENV === 'development'
    ? dynamic(() => import('../dev/DesignPanel'), { ssr: false })
    : null

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {DevDesignPanel ? <DevDesignPanel /> : null}
    </>
  )
}
