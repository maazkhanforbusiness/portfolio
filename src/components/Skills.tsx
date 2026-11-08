import { skillsSection } from '../config/content'

export function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="section-inner">
        <header className="section-head">
          <p className="eyebrow">{skillsSection.eyebrow}</p>
          <h2 id="skills-title">{skillsSection.title}</h2>
        </header>
        <div className="skills-block">
          <h3>Tools</h3>
          <ul className="skills-chips">
            {skillsSection.tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="skills-block">
          <h3>Additional skills</h3>
          <ul className="skills-chips muted">
            {skillsSection.additional.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
