import { useState } from 'react'
import { localeText, type Locale } from '../content/i18n'

interface CopyEmailProps {
  email: string
  className?: string
  children?: React.ReactNode
  locale?: Locale
}

export default function CopyEmail({
  email,
  className = '',
  children,
  locale = 'en',
}: CopyEmailProps) {
  const [copied, setCopied] = useState(false)
  const labels = localeText[locale]

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        // fallback: prompt user to manually copy
        window.prompt(labels.copyEmail, email)
      })
  }

  return (
    <button
      onClick={handleCopy}
      className={className}
      title={`${labels.copyEmail}: ${email}`}
      type="button"
    >
      {copied ? labels.copied : (children ?? labels.email)}
    </button>
  )
}
