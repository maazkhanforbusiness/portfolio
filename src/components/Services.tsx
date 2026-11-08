import { servicesSection } from '../config/content'

export function Services() {
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="section-inner">
        <header className="section-head">
          <p className="eyebrow">{servicesSection.eyebrow}</p>
          <h2 id="services-title">{servicesSection.title}</h2>
        </header>

        <ol className="services-list">
          {servicesSection.items.map((item, index) => (
            <li
              key={item.num}
              className={`service-row ${index % 2 === 1 ? 'flip' : ''}`}
              id={`service-${item.num}`}
            >
              <div className="service-num">{item.num}</div>
              <div className="service-copy">
                <h3>{item.title}</h3>
                <p className="service-for">{item.for}</p>
                <ul className="service-includes">
                  {item.includes.map((cap) => (
                    <li key={cap}>{cap}</li>
                  ))}
                </ul>
                <a
                  className="btn btn-outline btn-sm"
                  href={`#contact`}
                  onClick={() => {
                    sessionStorage.setItem('preferredService', item.title)
                  }}
                >
                  {servicesSection.cta}
                </a>
              </div>
              <div className="service-visual" aria-hidden="true">
                <div className={`service-panel tone-${(index % 3) + 1}`}>
                  <span>{item.num}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
