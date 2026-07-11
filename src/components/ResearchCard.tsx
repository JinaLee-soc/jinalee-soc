import Link from 'next/link'

interface ResearchCardProps {
  id: string
  title: string
  description: string
}

export default function ResearchCard({ id, title, description }: ResearchCardProps) {
  return (
    <div className="research-card">
      <h3 className="research-card__title">{title}</h3>
      <p className="research-card__desc">{description}</p>
      <Link href={`/research#${id}`} className="research-card__link">
        Read more →
      </Link>
    </div>
  )
}
