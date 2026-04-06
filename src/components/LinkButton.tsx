interface LinkButtonProps {
  href: string
  children: React.ReactNode
  external?: boolean
  filled?: boolean
  className?: string
}

export default function LinkButton({
  href,
  children,
  external = false,
  filled = false,
  className = '',
}: LinkButtonProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a
      href={href}
      className={`link-btn${filled ? ' link-btn--filled' : ''} ${className}`}
      {...externalProps}
    >
      {children}
    </a>
  )
}
