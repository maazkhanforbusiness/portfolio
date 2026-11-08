import { showreelSection } from '../config/content'
import { site } from '../config/site'
import { VideoPlayer } from './VideoPlayer'

export function Showreel() {
  return (
    <section id="showreel" className="section section-dark showreel" aria-labelledby="showreel-title">
      <div className="section-inner">
        <header className="section-head">
          <p className="eyebrow">{showreelSection.eyebrow}</p>
          <h2 id="showreel-title">{showreelSection.title}</h2>
          <p className="section-body">{showreelSection.body}</p>
        </header>
        <VideoPlayer
          className="showreel-player"
          src={site.showreel.src}
          poster={site.showreel.poster}
          title={site.showreel.title}
          emptyLabel={showreelSection.comingSoon}
        />
      </div>
    </section>
  )
}
