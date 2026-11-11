/**
 * Site settings — wire real assets here.
 *
 * Showreel: set `showreel.src` to a YouTube watch/share URL or an MP4/WebM URL.
 * Contact form opens WhatsApp + mailto until a server endpoint is wired.
 */
export const site = {
  name: 'Maaz Khan',
  title: 'Maaz Khan — Video Editor | Social Media Manager | Creative Professional',
  email: 'maazkhanforbusiness@gmail.com',
  whatsappUrl: 'https://wa.me/919760003398',
  portrait: `${import.meta.env.BASE_URL}maaz-portrait.png`,

  showreel: {
    src: 'https://youtu.be/o9yZh-4qEwo' as string | null,
    poster: null as string | null,
    title: 'Showreel',
  },
}
