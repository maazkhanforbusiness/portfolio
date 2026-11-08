import { experienceSection } from '../config/content'

export function Experience() {
  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="section-inner">
        <header className="section-head">
          <p className="eyebrow">{experienceSection.eyebrow}</p>
          <h2 id="experience-title">{experienceSection.title}</h2>
        </header>
        <ol className="timeline">
          {experienceSection.roles.map((role) => (
            <li key={role.org} className="timeline-item">
              <div className="timeline-meta">
                <h3>{role.org}</h3>
                <p className="timeline-role">{role.title}</p>
                <p className="timeline-loc">
                  {[role.location, role.dates].filter(Boolean).join(' · ')}
                </p>
              </div>
              <ul className="timeline-duties">
                {role.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
