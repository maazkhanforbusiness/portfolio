import { getYoutubeId } from '../config/projects'
import { showreelSection } from '../config/content'
import { site } from '../config/site'
import { ShowreelPlayer } from './ShowreelPlayer'

export function Showreel() {
  const yt = getYoutubeId(site.showreel.src)

  return (
    <section id="showreel" className="section section-dark showreel" aria-labelledby="showreel-title">
      <div className="section-inner">
        <header className="section-head">
          <p className="eyebrow">{showreelSection.eyebrow}</p>
          <h2 id="showreel-title">{showreelSection.title}</h2>
          <p className="section-body">{showreelSection.body}</p>
        </header>

        {yt ? (
          <ShowreelPlayer
            className="showreel-player"
            videoId={yt}
            title={site.showreel.title}
          />
        ) : (
          <div className="video-player empty showreel-player" aria-label={showreelSection.comingSoon}>
            <div className="video-empty">
              <span className="video-empty-mark" aria-hidden="true" />
              <p>{showreelSection.comingSoon}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
