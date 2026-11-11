import { useEffect, useRef, useState } from 'react'
import { loadYoutubeApi, type YoutubePlayer } from '../lib/youtubeApi'

const playerVars = {
  autoplay: 0,
  controls: 0,
  modestbranding: 1,
  rel: 0,
  playsinline: 1,
  disablekb: 1,
  fs: 0,
  iv_load_policy: 3,
  cc_load_policy: 0,
  loop: 1,
  enablejsapi: 1,
} as const

type ShowreelPlayerProps = {
  videoId: string
  title: string
  className?: string
}

function applyMute(target: YoutubePlayer, muted: boolean) {
  if (muted) target.mute()
  else {
    target.unMute()
    target.setVolume(100)
  }
}

export function ShowreelPlayer({ videoId, title, className = '' }: ShowreelPlayerProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const mountRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YoutubePlayer | null>(null)
  const mutedRef = useRef(false)
  const inViewRef = useRef(false)

  const [inView, setInView] = useState(false)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  // Prefer sound; flip to muted only when the browser blocks unmuted autoplay or the user mutes.
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  useEffect(() => {
    inViewRef.current = inView
  }, [inView])

  useEffect(() => {
    const node = wrapRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35)
      },
      { threshold: [0, 0.35, 0.6, 1] },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mountRef.current) return

    let cancelled = false
    let player: YoutubePlayer | null = null
    const host = mountRef.current

    void loadYoutubeApi()
      .then((YT) => {
        if (cancelled || !host.isConnected) return

        player = new YT.Player(host, {
          videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            ...playerVars,
            playlist: videoId,
            mute: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return
              playerRef.current = event.target
              setReady(true)

              if (inViewRef.current) {
                applyMute(event.target, mutedRef.current)
                event.target.playVideo()
                setPlaying(true)

                window.setTimeout(() => {
                  if (cancelled || mutedRef.current) return
                  try {
                    applyMute(event.target, false)
                    event.target.playVideo()
                    if (event.target.isMuted()) setMuted(true)
                  } catch {
                    setMuted(true)
                  }
                }, 160)
              }
            },
            onStateChange: (event) => {
              if (cancelled) return
              const state = event.data
              if (state === YT.PlayerState.PLAYING) setPlaying(true)
              else if (
                state === YT.PlayerState.PAUSED ||
                state === YT.PlayerState.ENDED
              ) {
                setPlaying(false)
              }
            },
          },
        })
        playerRef.current = player
      })
      .catch(() => {
        /* Keep our shell; do not fall back to a YouTube chrome embed. */
      })

    return () => {
      cancelled = true
      playerRef.current = null
      setReady(false)
      setPlaying(false)
      try {
        player?.destroy()
      } catch {
        /* ignore */
      }
      host.replaceChildren()
    }
  }, [videoId])

  useEffect(() => {
    const player = playerRef.current
    if (!ready || !player) return

    try {
      if (inView) {
        applyMute(player, mutedRef.current)
        player.playVideo()
        setPlaying(true)

        if (!mutedRef.current) {
          window.setTimeout(() => {
            if (!inViewRef.current || mutedRef.current) return
            try {
              applyMute(player, false)
              player.playVideo()
              if (player.isMuted()) setMuted(true)
            } catch {
              setMuted(true)
            }
          }, 160)
        }
      } else {
        player.pauseVideo()
        setPlaying(false)
      }
    } catch {
      /* ignore */
    }
  }, [inView, ready])

  useEffect(() => {
    const player = playerRef.current
    if (!ready || !player) return
    try {
      applyMute(player, muted)
      if (!muted && inViewRef.current) player.playVideo()
    } catch {
      /* ignore */
    }
  }, [muted, ready])

  const togglePlay = () => {
    const player = playerRef.current
    if (!player) return
    try {
      if (playing) {
        player.pauseVideo()
        setPlaying(false)
      } else {
        applyMute(player, mutedRef.current)
        player.playVideo()
        setPlaying(true)
      }
    } catch {
      /* ignore */
    }
  }

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    const player = playerRef.current
    if (!player) return
    try {
      applyMute(player, next)
      if (!next) player.playVideo()
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      ref={wrapRef}
      className={`showreel-stage${className ? ` ${className}` : ''}`}
      aria-label={title}
    >
      <div className="showreel-frame" aria-hidden="true">
        <div ref={mountRef} className="showreel-host" />
      </div>

      <div className="showreel-controls">
        <button
          type="button"
          className="showreel-control"
          onClick={togglePlay}
          aria-pressed={playing}
          aria-label={playing ? 'Pause showreel' : 'Play showreel'}
        >
          <span aria-hidden="true">{playing ? 'Pause' : 'Play'}</span>
        </button>
        <button
          type="button"
          className="showreel-control"
          onClick={toggleMute}
          aria-pressed={!muted}
          aria-label={muted ? 'Unmute showreel' : 'Mute showreel'}
        >
          <span aria-hidden="true">{muted ? 'Unmute' : 'Mute'}</span>
        </button>
      </div>
    </div>
  )
}
