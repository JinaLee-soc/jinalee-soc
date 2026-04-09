import { Publication, PublicationStatus } from '../content/publications'

function boldMyName(text: string) {
  const parts = text.split(/(Lee,\s*Jina|Jina\s+Lee)/)
  return parts.map((part, i) =>
    /^(Lee,\s*Jina|Jina\s+Lee)$/.test(part) ? <strong key={i}>{part}</strong> : part
  )
}

interface PublicationItemProps {
  pub: Publication
  showStatus?: boolean
}

const statusLabels: Record<PublicationStatus, string> = {
  Published: 'Published',
  Forthcoming: 'Forthcoming',
  'Conditionally Accepted': 'Conditionally Accepted',
  'Under Review': 'Under Review',
  'Working Paper': 'Working Paper',
  'In Progress': 'In Progress',
}

const statusClass: Record<PublicationStatus, string> = {
  Published: 'pub-item__status--published',
  Forthcoming: 'pub-item__status--forthcoming',
  'Conditionally Accepted': 'pub-item__status--forthcoming',
  'Under Review': 'pub-item__status--under-review',
  'Working Paper': 'pub-item__status--in-progress',
  'In Progress': 'pub-item__status--in-progress',
}

export default function PublicationItem({
  pub,
  showStatus = true,
}: PublicationItemProps) {
  return (
    <li className="pub-item">
      <p className="pub-item__citation">
        <span>{boldMyName(pub.authors)} </span>
        {pub.year && <span>{pub.year}. </span>}
        {pub.doi ? (
          <a
            href={pub.doi}
            className="pub-item__title"
            target="_blank"
            rel="noopener noreferrer"
          >
            {pub.title}
          </a>
        ) : (
          <em className="pub-item__title">{pub.title}</em>
        )}{' '}
        {pub.venue && <em className="pub-item__venue">{pub.venue}</em>}
        {pub.volumeIssuePages ? (
          <span>, {pub.volumeIssuePages}</span>
        ) : pub.venue ? (
          <span>.</span>
        ) : null}
        {pub.doi && (
          <>
            {' '}
            <a
              href={pub.doi}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.825rem',
                color: 'var(--color-text-muted)',
              }}
            >
              DOI ↗
            </a>
          </>
        )}
        {showStatus && pub.status !== 'Published' && (
          <span
            className={`pub-item__status ${statusClass[pub.status]}`}
          >
            {statusLabels[pub.status]}
          </span>
        )}
        {pub.manuscriptAvailable && (
          <span
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              marginLeft: '0.5rem',
            }}
          >
            · Manuscript available upon request
          </span>
        )}
      </p>
    </li>
  )
}
