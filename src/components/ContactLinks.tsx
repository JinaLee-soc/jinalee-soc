import { site } from '../content/site'
import LinkButton from './LinkButton'

export default function ContactLinks() {
  return (
    <div className="contact-links">
      <LinkButton href={site.cvUrl} external>
        Download CV
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
  )
}
