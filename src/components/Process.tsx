import { motion } from 'framer-motion'
import { processSection } from '../config/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export function Process() {
  const reduce = usePrefersReducedMotion()

  return (
    <section id="process" className="section process" aria-labelledby="process-title">
      <div className="section-inner">
        <header className="section-head">
          <p className="eyebrow">{processSection.eyebrow}</p>
          <h2 id="process-title">{processSection.title}</h2>
        </header>
        <ol className="process-list">
          {processSection.steps.map((step, i) => (
            <motion.li
              key={step.num}
              className="process-step"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <span className="process-num">{step.num}</span>
              <h3>{step.title}</h3>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
