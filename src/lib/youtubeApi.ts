type YoutubeNamespace = {
  Player: new (
    element: HTMLElement | string,
    options: {
      videoId: string
      width?: string | number
      height?: string | number
      playerVars?: Record<string, string | number>
      events?: {
        onReady?: (event: { target: YoutubePlayer }) => void
        onStateChange?: (event: { data: number; target: YoutubePlayer }) => void
        onError?: (event: { data: number; target: YoutubePlayer }) => void
      }
    },
  ) => YoutubePlayer
  PlayerState: {
    UNSTARTED: number
    ENDED: number
    PLAYING: number
    PAUSED: number
    BUFFERING: number
    CUED: number
  }
}

export type YoutubePlayer = {
  playVideo: () => void
  pauseVideo: () => void
  stopVideo: () => void
  mute: () => void
  unMute: () => void
  isMuted: () => boolean
  setVolume: (volume: number) => void
  getPlayerState: () => number
  destroy: () => void
}

declare global {
  interface Window {
    YT?: YoutubeNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<YoutubeNamespace> | null = null

export function loadYoutubeApi(): Promise<YoutubeNamespace> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('YouTube API is browser-only'))
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT)
  }

  if (apiPromise) return apiPromise

  apiPromise = new Promise((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      if (window.YT?.Player) resolve(window.YT)
      else reject(new Error('YouTube API failed to load'))
    }

    if (!document.querySelector('script[data-youtube-iframe-api]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.dataset.youtubeIframeApi = 'true'
      script.onerror = () => reject(new Error('YouTube API script failed'))
      document.head.appendChild(script)
    }
  })

  return apiPromise
}
