/**
 * Selected work — edit this file to add/update projects.
 *
 * Set `videoUrl` to a YouTube watch/share URL or a direct video file URL.
 * Leave `videoUrl` / `thumbnail` as null for “coming soon” placeholders.
 * Do not invent real client names or footage URLs.
 */
export type ProjectCategory =
  | 'Talking Head Videos'
  | 'Real Estate Films'
  | 'Podcast Editing'
  | 'Vlogs & Lifestyle'
  | 'Social Media Reels'
  | 'Commercial & Brand Films'
  | 'AI Promotional Ads'

export type Project = {
  id: string
  title: string
  category: ProjectCategory
  description: string
  year: string
  contribution: string
  tools: string[]
  /** YouTube URL or direct video file; null = placeholder */
  videoUrl: string | null
  /** Poster/thumbnail image URL; null = empty cinematic frame */
  thumbnail: string | null
}

export const projects: Project[] = [
  {
    id: 'talking-head-01',
    title: 'Talking Head Series',
    category: 'Talking Head Videos',
    description:
      'Placeholder for a talking-head edit — jump cuts, captions, and paced storytelling.',
    year: '—',
    contribution: 'Editing, captions, sound design',
    tools: ['Adobe Premiere Pro', 'Adobe Audition'],
    videoUrl: null,
    thumbnail: null,
  },
  {
    id: 'real-estate-01',
    title: 'Property Showcase',
    category: 'Real Estate Films',
    description:
      'Placeholder for a cinematic property walkthrough with colour and motion polish.',
    year: '—',
    contribution: 'Edit, colour grading, transitions',
    tools: ['Adobe Premiere Pro', 'Adobe After Effects'],
    videoUrl: null,
    thumbnail: null,
  },
  {
    id: 'podcast-01',
    title: 'Podcast Episode Cut',
    category: 'Podcast Editing',
    description:
      'Placeholder for a multi-camera podcast edit with audio cleanup and highlights.',
    year: '—',
    contribution: 'Multi-cam edit, audio, captions',
    tools: ['Adobe Premiere Pro', 'Adobe Audition'],
    videoUrl: null,
    thumbnail: null,
  },
  {
    id: 'vlog-01',
    title: 'Lifestyle Vlog',
    category: 'Vlogs & Lifestyle',
    description:
      'Placeholder for a story-driven lifestyle cut with music sync and smooth transitions.',
    year: '—',
    contribution: 'Story edit, colour, sound design',
    tools: ['Adobe Premiere Pro', 'DaVinci Resolve'],
    videoUrl: null,
    thumbnail: null,
  },
  {
    id: 'reels-01',
    title: 'Social Reels Pack',
    category: 'Social Media Reels',
    description:
      'Placeholder for vertical short-form edits with hooks, captions, and retention pacing.',
    year: '—',
    contribution: 'Short-form edit, captions, hooks',
    tools: ['Adobe Premiere Pro', 'CapCut'],
    videoUrl: null,
    thumbnail: null,
  },
  {
    id: 'brand-01',
    title: 'Brand Film',
    category: 'Commercial & Brand Films',
    description:
      'Placeholder for a brand storytelling piece with motion graphics and sound design.',
    year: '—',
    contribution: 'Cinematic edit, motion, sound',
    tools: ['Adobe Premiere Pro', 'Adobe After Effects'],
    videoUrl: null,
    thumbnail: null,
  },
  {
    id: 'ai-ad-01',
    title: 'AI Promotional Spot',
    category: 'AI Promotional Ads',
    description:
      'Placeholder for an AI-assisted promotional sequence with motion and commercial storytelling.',
    year: '—',
    contribution: 'Edit, motion graphics, storytelling',
    tools: ['Adobe After Effects', 'Adobe Premiere Pro'],
    videoUrl: null,
    thumbnail: null,
  },
]

export function getYoutubeId(url: string | null | undefined): string | null {
  if (!url) return null
  try {
    const u = new URL(url.trim())
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace(/^\//, '').split('/')[0]
      return id || null
    }
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v')
      if (v) return v
      const embed = u.pathname.match(/\/embed\/([^/]+)/)
      if (embed?.[1]) return embed[1]
      const shorts = u.pathname.match(/\/shorts\/([^/]+)/)
      if (shorts?.[1]) return shorts[1]
    }
  } catch {
    return null
  }
  return null
}

export function isDirectVideo(url: string | null | undefined): boolean {
  if (!url) return false
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url)
}
