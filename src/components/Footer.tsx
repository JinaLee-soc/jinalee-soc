import { site } from '../content/site'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container container--wide">
        <div className="footer__inner">
          <ul className="footer__links">
            <li>
              <a
                href={site.googleScholar}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Scholar
              </a>
            </li>
            <li>
              <a
                href={site.orcid}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                ORCID
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="footer__link"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
