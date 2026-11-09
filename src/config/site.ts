/**
 * Site settings — wire real assets here.
 *
 * Showreel: set `showreel.src` to a YouTube watch/share URL or an MP4/WebM URL.
 * Socials: set `href` when real profile URLs exist.
 * Contact form opens WhatsApp + mailto until a server endpoint is wired.
 */
export const site = {
  name: 'Maaz Khan',
  title: 'Maaz Khan — Video Editor | Social Media Manager | Creative Professional',
  email: 'maazkhanforbusiness@gmail.com',
  phoneDisplay: '+91 97600 03398',
  phoneTel: '+919760003398',
  whatsappUrl: 'https://wa.me/919760003398',

  showreel: {
    src: 'https://youtu.be/o9yZh-4qEwo' as string | null,
    poster: null as string | null,
    title: 'Showreel',
  },
  socials: [
    { id: 'instagram', label: 'Instagram', href: null as string | null },
    { id: 'linkedin', label: 'LinkedIn', href: null as string | null },
    { id: 'youtube', label: 'YouTube', href: null as string | null },
  ],
}

export type SocialLink = (typeof site.socials)[number]
