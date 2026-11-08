import { motion, type Transition } from 'framer-motion'
import { hero } from '../config/content'
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
    <section className="hero" id="top" aria-labelledby="hero-headline">
      <div className="hero-copy">
        <motion.p className="hero-label" {...fade(0)}>
          {hero.label}
        </motion.p>
        <motion.h1 id="hero-headline" className="hero-headline" {...fade(0.08)}>
          {hero.headline}
        </motion.h1>
        <motion.p className="hero-support" {...fade(0.16)}>
          {hero.supporting}
        </motion.p>
        <motion.p className="hero-name" {...fade(0.22)}>
          {hero.name}
        </motion.p>
        <motion.div className="hero-actions" {...fade(0.28)}>
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
        <motion.p className="hero-avail" {...fade(0.36)}>
          <span className="avail-dot" aria-hidden="true" />
          {hero.availability}
        </motion.p>
      </div>

      <motion.div className="hero-visual" aria-hidden="true" {...fade(0.2)}>
        <div className="hero-frame">
          <div className="hero-frame-inner">
            <span className="hero-frame-play" />
            <span className="hero-frame-caption">Showreel preview</span>
          </div>
        </div>
      </motion.div>

      <a className="hero-scroll" href="#showreel">
        <span>{hero.scroll}</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}
