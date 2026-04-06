import { useState } from 'react'

interface CopyEmailProps {
  email: string
  className?: string
  children?: React.ReactNode
}

export default function CopyEmail({ email, className = '', children }: CopyEmailProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        // fallback: prompt user to manually copy
        window.prompt('Copy this email address:', email)
      })
  }

  return (
    <button
      onClick={handleCopy}
      className={className}
      title={`Copy ${email} to clipboard`}
      type="button"
    >
      {copied ? 'Copied!' : (children ?? 'Email')}
    </button>
  )
}
