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
          {servicesSection.items.map((item) => (
            <li key={item.id} className="service-row" id={`service-${item.id}`}>
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
