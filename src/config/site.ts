/**
 * Site settings — wire real assets here.
 *
 * Showreel: set `showreel.src` to an MP4/WebM URL (leave null until ready).
 * Formspree: create a form for maazkhanforbusiness@gmail.com, then set
 * `formspreeEndpoint` or env `VITE_FORMSPREE_ENDPOINT` to
 * `https://formspree.io/f/xxxxxxxx`.
 * Socials: set `href` when real profile URLs exist.
 */
export const site = {
  name: 'Maaz Khan',
  title: 'Maaz Khan — Video Editor | Social Media Manager | Creative Professional',
  email: 'maazkhanforbusiness@gmail.com',
  phoneDisplay: '+91 97600 03398',
  phoneTel: '+919760003398',
  whatsappUrl: 'https://wa.me/919760003398',
  formspreeEndpoint:
    (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim() ||
    null,
  showreel: {
    src: null as string | null,
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
