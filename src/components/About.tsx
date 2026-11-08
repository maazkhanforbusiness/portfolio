import { aboutSection } from '../config/content'

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="section-inner about-grid">
        <div className="about-copy">
          <p className="eyebrow">{aboutSection.eyebrow}</p>
          <h2 id="about-title">{aboutSection.title}</h2>
          {aboutSection.body.map((para) => (
            <p key={para.slice(0, 32)} className="section-body">
              {para}
            </p>
          ))}
          <p className="about-intro">{aboutSection.introduction}</p>
          <h3 className="about-strengths-title">{aboutSection.strengthsTitle}</h3>
          <ul className="about-strengths">
            {aboutSection.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="about-portrait" aria-label={aboutSection.portraitNote}>
          <div className="portrait-frame">
            <span>{aboutSection.portraitNote}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
