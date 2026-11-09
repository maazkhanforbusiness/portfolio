import { motion, type Transition } from 'framer-motion'
import { hero } from '../config/content'
import { site } from '../config/site'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const ease: Transition['ease'] = [0.22, 1, 0.36, 1]

export function Hero() {
  const reduce = usePrefersReducedMotion()

  const fade = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease } satisfies Transition,
        }

  return (
    <section className="hero" id="top" aria-labelledby="hero-brand">
      <div className="hero-copy">
        <motion.h1 id="hero-brand" className="hero-brand" {...fade(0)}>
          {hero.name}
        </motion.h1>
        <motion.p className="hero-label" {...fade(0.06)}>
          {hero.label}
        </motion.p>
        <motion.p className="hero-headline" {...fade(0.12)}>
          {hero.headline}
        </motion.p>
        <motion.p className="hero-support" {...fade(0.18)}>
          {hero.supporting}
        </motion.p>
        <motion.div className="hero-actions" {...fade(0.24)}>
          <a className="btn btn-dark" href="#showreel">
            {hero.ctaShowreel}
          </a>
          <a className="btn btn-outline" href="#work">
            {hero.ctaWork}
          </a>
          <a className="btn btn-accent" href="#contact">
            {hero.ctaContact}
          </a>
        </motion.div>
        <motion.p className="hero-avail" {...fade(0.32)}>
          <span className="avail-dot" aria-hidden="true" />
          {hero.availability}
        </motion.p>
      </div>

      <motion.aside className="hero-aside" aria-label="About and contact" {...fade(0.2)}>
        <p className="hero-aside-eyebrow">{hero.asideEyebrow}</p>
        {hero.aside.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="hero-aside-copy">
            {paragraph}
          </p>
        ))}
        <div className="hero-aside-contact">
          <p className="hero-aside-contact-label">{hero.asideContact}</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">
            WhatsApp {site.phoneDisplay}
          </a>
        </div>
      </motion.aside>

      <a className="hero-scroll" href="#showreel">
        <span>{hero.scroll}</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}
