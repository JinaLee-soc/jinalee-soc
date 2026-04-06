import { useState } from 'react'

interface CopyEmailProps {
  email: string
  className?: string
  children?: React.ReactNode
}

export default function CopyEmail({ email, className = '', children }: CopyEmailProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }).catch(() => fallbackCopy())
    } else {
      fallbackCopy()
    }
  }

  const fallbackCopy = () => {
    const el = document.createElement('textarea')
    el.value = email
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.focus()
    el.select()
    try {
      document.execCommand('copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
    document.body.removeChild(el)
  }

  return (
    <a
      href={`mailto:${email}`}
      className={className}
      onClick={handleCopy}
      title={email}
    >
      {copied ? 'Copied!' : (children ?? 'Email')}
    </a>
  )
}
