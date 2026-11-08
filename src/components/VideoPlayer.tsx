import { useEffect, useRef, useState } from 'react'
import { getYoutubeId, isDirectVideo } from '../config/projects'

type Props = {
  src: string | null
  poster?: string | null
  title: string
  emptyLabel: string
  className?: string
  autoPlayOnMount?: boolean
}

export function VideoPlayer({
  src,
  poster,
  title,
  emptyLabel,
  className = '',
  autoPlayOnMount = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const yt = getYoutubeId(src)
  const direct = isDirectVideo(src)

  useEffect(() => {
    if (autoPlayOnMount && direct && videoRef.current) {
      void videoRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }, [autoPlayOnMount, direct])

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      void el.play()
      setPlaying(true)
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  const toggleFullscreen = () => {
    const node = wrapRef.current
    if (!node) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void node.requestFullscreen()
    }
  }

  if (!src) {
    return (
      <div className={`video-player empty ${className}`} aria-label={emptyLabel}>
        <div className="video-empty">
          <span className="video-empty-mark" aria-hidden="true" />
          <p>{emptyLabel}</p>
        </div>
      </div>
    )
  }

  if (yt) {
    return (
      <div className={`video-player ${className}`} ref={wrapRef}>
        <iframe
          title={title}
          src={`https://www.youtube.com/embed/${yt}?rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  if (direct) {
    return (
      <div className={`video-player has-controls ${className}`} ref={wrapRef}>
        <video
          ref={videoRef}
          src={src}
          poster={poster || undefined}
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          controls={playing}
        />
        {!playing && (
          <button type="button" className="video-play" onClick={togglePlay} aria-label="Play">
            <span className="video-play-icon" aria-hidden="true" />
          </button>
        )}
        <div className="video-bar">
          <button type="button" onClick={togglePlay}>
            {playing ? 'Pause' : 'Play'}
          </button>
          <button type="button" onClick={toggleFullscreen}>
            Fullscreen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`video-player empty ${className}`}>
      <div className="video-empty">
        <p>Unsupported video URL. Use YouTube or an mp4/webm file.</p>
      </div>
    </div>
  )
}
