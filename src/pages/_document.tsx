import { Html, Head, Main, NextScript } from 'next/document'

// Applies the saved text-size scale before first paint so pages never
// flash at the default size. Must stay in sync with TextSizeControl.
const FONT_SCALE_SCRIPT = `
try {
  var s = parseFloat(localStorage.getItem('jl-font-scale'));
  if (s && s > 0.5 && s < 2 && s !== 1) {
    document.documentElement.style.fontSize = (125 * s) + '%';
  }
} catch (e) {}
`

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: FONT_SCALE_SCRIPT }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
