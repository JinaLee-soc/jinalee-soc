interface SectionHeadingProps {
  label: string
  title?: string
  id?: string
}

export default function SectionHeading({ label, title, id }: SectionHeadingProps) {
  return (
    <div className="section__header" id={id}>
      <p className="section__heading">{label}</p>
      {title && <h2 className="section__title">{title}</h2>}
    </div>
  )
}
