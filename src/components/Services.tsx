import { servicesSection } from '../config/content'
import { usePreviewMute } from '../hooks/usePreviewMute'
import { YoutubeHoverPreview } from './YoutubeHoverPreview'

export function Services() {
  const [previewMuted, setPreviewMuted] = usePreviewMute()
  let visualIndex = 0

  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="section-inner">
        <header className="section-head">
          <p className="eyebrow">{servicesSection.eyebrow}</p>
          <h2 id="services-title">{servicesSection.title}</h2>
        </header>

        <ol className="services-list">
          {servicesSection.items.map((item) => {
            const hasVideo = Boolean(item.youtubeId)
            const flip = hasVideo && visualIndex++ % 2 === 1

            return (
              <li
                key={item.id}
                className={`service-row${hasVideo ? '' : ' no-visual'}${flip ? ' flip' : ''}`}
                id={`service-${item.id}`}
              >
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
                {item.youtubeId ? (
                  <div className="service-visual">
                    <YoutubeHoverPreview
                      videoId={item.youtubeId}
                      title={item.title}
                      muted={previewMuted}
                      onMutedChange={setPreviewMuted}
                      poster={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
                    />
                  </div>
                ) : null}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
