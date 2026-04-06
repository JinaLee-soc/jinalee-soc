import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { bio } from '../content/bio'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/teaching', label: 'Teaching' },
  { href: '/cv', label: 'CV' },
]

export default function Header() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return router.pathname === '/'
    return router.pathname.startsWith(href)
  }

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav__inner">
        <Link href="/" className="nav__brand">
          {bio.name}
        </Link>

        {/* Desktop nav */}
        <ul
          className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}
          role="menubar"
        >
          {navItems.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                className={`nav__link${isActive(item.href) ? ' nav__link--active' : ''}`}
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="nav__toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
