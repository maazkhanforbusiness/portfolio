import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from 'react'
import { loadYoutubeApi, type YoutubePlayer } from '../lib/youtubeApi'

const previewPlayerVars = {
  autoplay: 1,
  controls: 0,
  modestbranding: 1,
  rel: 0,
  playsinline: 1,
  disablekb: 1,
  fs: 0,
  iv_load_policy: 3,
  loop: 1,
  enablejsapi: 1,
} as const

type YoutubeHoverPreviewProps = {
  videoId: string
  title: string
  muted: boolean
  onMutedChange: (muted: boolean) => void
  poster?: string | null
  className?: string
}

export function YoutubeHoverPreview({
  videoId,
  title,
  muted,
  onMutedChange,
  poster,
  className,
}: YoutubeHoverPreviewProps) {
  const [playing, setPlaying] = useState(false)
  const mountRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YoutubePlayer | null>(null)
  const mutedRef = useRef(muted)

  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  useEffect(() => {
    if (!playing || !mountRef.current) return

    let cancelled = false
    let player: YoutubePlayer | null = null
    const host = mountRef.current

    const applyMute = (target: YoutubePlayer, nextMuted: boolean) => {
      if (nextMuted) target.mute()
      else {
        target.unMute()
        target.setVolume(100)
      }
    }

    void loadYoutubeApi()
      .then((YT) => {
        if (cancelled || !host.isConnected) return

        player = new YT.Player(host, {
          videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            ...previewPlayerVars,
            playlist: videoId,
            // Start muted so autoplay is allowed; unmute immediately if preferred.
            mute: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              if (cancelled) return
              playerRef.current = event.target
              applyMute(event.target, mutedRef.current)
              event.target.playVideo()

              // If unmuted autoplay is blocked, keep playing muted until the user toggles.
              window.setTimeout(() => {
                if (cancelled || mutedRef.current) return
                try {
                  applyMute(event.target, false)
                  event.target.playVideo()
                } catch {
                  /* ignore */
                }
              }, 120)
            },
          },
        })
        playerRef.current = player
      })
      .catch(() => {
        /* Preview unavailable without the API */
      })

    return () => {
      cancelled = true
      playerRef.current = null
      try {
        player?.destroy()
      } catch {
        /* ignore */
      }
      host.replaceChildren()
    }
  }, [playing, videoId])

  useEffect(() => {
    const player = playerRef.current
    if (!playing || !player) return
    try {
      if (muted) player.mute()
      else {
        player.unMute()
        player.setVolume(100)
        player.playVideo()
      }
    } catch {
      /* ignore */
    }
  }, [muted, playing])

  const start = () => setPlaying(true)
  const stop = () => setPlaying(false)

  const onPointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') start()
  }

  const onPointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') stop()
  }

  const onThumbActivate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setPlaying((current) => !current)
  }

  const onMuteToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onMutedChange(!muted)
  }

  return (
    <div
      className={`work-thumb${playing ? ' is-playing' : ''}${className ? ` ${className}` : ''}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {poster ? (
        <img
          src={poster}
          alt=""
          loading="lazy"
          className={playing ? 'is-hidden' : undefined}
        />
      ) : (
        <div className="work-thumb-empty" aria-hidden="true" />
      )}

      {playing && (
        <div className="work-thumb-player" aria-hidden="true">
          <div ref={mountRef} className="work-thumb-player-host" />
        </div>
      )}

      <button
        type="button"
        className="work-thumb-toggle"
        onClick={onThumbActivate}
        aria-pressed={playing}
        aria-label={playing ? `Stop ${title} preview` : `Play ${title} preview`}
      />

      {playing && (
        <button
          type="button"
          className="work-mute"
          onClick={onMuteToggle}
          aria-pressed={!muted}
          aria-label={muted ? 'Unmute preview' : 'Mute preview'}
        >
          <span aria-hidden="true">{muted ? 'Unmute' : 'Mute'}</span>
        </button>
      )}
    </div>
  )
}
