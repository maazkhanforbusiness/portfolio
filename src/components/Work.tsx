import { useMemo, useState, type MouseEvent, type PointerEvent } from 'react'
import { workSection } from '../config/content'
import { getYoutubeId, projects, type Project, type ProjectCategory } from '../config/projects'
import { VideoPlayer } from './VideoPlayer'

function buildSilentEmbed(id: string) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
    disablekb: '1',
    fs: '0',
    iv_load_policy: '3',
    loop: '1',
    playlist: id,
  })
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}

function WorkThumb({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false)
  const yt = getYoutubeId(project.videoUrl)
  const canPlay = Boolean(yt)

  const start = () => {
    if (!canPlay) return
    setPlaying(true)
  }

  const stop = () => {
    setPlaying(false)
  }

  const onPointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') start()
  }

  const onPointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') stop()
  }

  const onThumbActivate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!canPlay) return
    setPlaying((current) => !current)
  }

  return (
    <div
      className={`work-thumb${playing ? ' is-playing' : ''}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {project.thumbnail ? (
        <img
          src={project.thumbnail}
          alt=""
          loading="lazy"
          className={playing ? 'is-hidden' : undefined}
        />
      ) : (
        <div className="work-thumb-empty">
          <span>Video coming soon</span>
        </div>
      )}

      {playing && yt && (
        <div className="work-thumb-player" aria-hidden="true">
          <iframe
            title={`${project.title} preview`}
            src={buildSilentEmbed(yt)}
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
          />
        </div>
      )}

      {canPlay && (
        <button
          type="button"
          className="work-thumb-toggle"
          onClick={onThumbActivate}
          aria-pressed={playing}
          aria-label={playing ? `Stop ${project.title} preview` : `Play ${project.title} preview`}
        />
      )}
    </div>
  )
}

export function Work() {
  const [filter, setFilter] = useState<ProjectCategory | null>(null)
  const [active, setActive] = useState<Project | null>(null)

  const filtered = useMemo(() => {
    if (!filter) return projects
    return projects.filter((p) => p.category === filter)
  }, [filter])

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="section-inner">
        <header className="section-head">
          <p className="eyebrow">{workSection.eyebrow}</p>
          <h2 id="work-title">{workSection.title}</h2>
        </header>

        <div className="work-filters" role="tablist" aria-label="Project categories">
          {workSection.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              className={filter === cat ? 'is-active' : ''}
              onClick={() => setFilter((current) => (current === cat ? null : cat))}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul className="work-grid">
          {filtered.map((project) => (
            <li key={project.id} className="work-item">
              <article className="work-card">
                <WorkThumb project={project} />
                <button
                  type="button"
                  className="work-meta"
                  onClick={() => setActive(project)}
                  aria-label={`Open ${project.title} details`}
                >
                  <span className="work-cat">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="work-cta">{project.videoUrl ? 'Watch Project' : 'View details'}</span>
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {active && (
        <div
          className="work-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActive(null)
          }}
        >
          <div className="work-modal-panel">
            <button type="button" className="work-modal-close" onClick={() => setActive(null)}>
              Close
            </button>
            <VideoPlayer
              src={active.videoUrl}
              poster={active.thumbnail}
              title={active.title}
              emptyLabel="Video coming soon"
            />
            <div className="work-modal-copy">
              <p className="work-cat">{active.category}</p>
              <h3 id="project-detail-title">{active.title}</h3>
              <p>{active.description}</p>
              <dl className="work-dl">
                <div>
                  <dt>Year</dt>
                  <dd>{active.year}</dd>
                </div>
                <div>
                  <dt>Contribution</dt>
                  <dd>{active.contribution}</dd>
                </div>
                <div>
                  <dt>Tools</dt>
                  <dd>{active.tools.join(', ')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
