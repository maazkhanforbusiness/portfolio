import { useMemo, useState } from 'react'
import { workSection } from '../config/content'
import { projects, type Project } from '../config/projects'
import { VideoPlayer } from './VideoPlayer'

export function Work() {
  const [filter, setFilter] = useState<(typeof workSection.categories)[number]>('All')
  const [active, setActive] = useState<Project | null>(null)

  const filtered = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((p) => p.category === filter)
  }, [filter])

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="section-inner">
        <header className="section-head">
          <p className="eyebrow">{workSection.eyebrow}</p>
          <h2 id="work-title">{workSection.title}</h2>
          <p className="section-body">{workSection.body}</p>
        </header>

        <div className="work-filters" role="tablist" aria-label="Project categories">
          {workSection.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              className={filter === cat ? 'is-active' : ''}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul className="work-grid">
          {filtered.map((project, i) => (
            <li
              key={project.id}
              className={`work-item ${i % 3 === 0 ? 'span-wide' : ''} ${i % 5 === 2 ? 'offset' : ''}`}
            >
              <button
                type="button"
                className="work-card"
                onClick={() => setActive(project)}
                aria-label={`Open ${project.title}`}
              >
                <div className="work-thumb">
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt="" loading="lazy" />
                  ) : (
                    <div className="work-thumb-empty">
                      <span>Video coming soon</span>
                    </div>
                  )}
                </div>
                <div className="work-meta">
                  <span className="work-cat">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="work-cta">Watch Project</span>
                </div>
              </button>
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
