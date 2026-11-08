import { useEffect, useState } from 'react'
import { nav } from '../config/content'
import { site } from '../config/site'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="site-nav-brand" href="#top" onClick={() => setOpen(false)}>
        {site.name}
      </a>
      <button
        type="button"
        className={`site-nav-toggle ${open ? 'is-open' : ''}`}
        aria-expanded={open}
        aria-controls="primary-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
      <nav id="primary-nav" className={`site-nav-links ${open ? 'is-open' : ''}`} aria-label="Primary">
        {nav.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="site-nav-cta" href="#contact" onClick={() => setOpen(false)}>
          Let&apos;s Work Together
        </a>
      </nav>
    </header>
  )
}
