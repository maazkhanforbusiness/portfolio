import { useEffect, useState } from 'react'

/** Session-wide preview mute preference (default unmuted). */
let previewMuted = false
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

export function usePreviewMute() {
  const [muted, setMutedState] = useState(previewMuted)

  useEffect(() => {
    const onChange = () => setMutedState(previewMuted)
    listeners.add(onChange)
    return () => {
      listeners.delete(onChange)
    }
  }, [])

  const setMuted = (next: boolean) => {
    previewMuted = next
    notify()
  }

  return [muted, setMuted] as const
}
