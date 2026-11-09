# Maaz Khan — Personal Brand Portfolio

Premium editorial portfolio for Maaz Khan (Video Editor | Social Media Manager | Creative Professional).

## Develop

```bash
npm install
npm run dev
```

## GitHub Pages

This repo is published from the `main` branch root. `npm run build` writes the Vite `dist` output into `index.html` + `assets/` (base `/portfolio/`) so Pages serves the production bundle, not `/src/main.tsx`. The Vite entry template is `index.source.html`.

## Configure

| What | File |
|------|------|
| Showreel video / poster | `src/config/site.ts` → `showreel.src`, `showreel.poster` |
| Projects / YouTube links | `src/config/projects.ts` |
| Contact submit | Opens WhatsApp (`wa.me/919760003398`) + `mailto:maazkhanforbusiness@gmail.com` |
| Social URLs | `src/config/site.ts` → `socials[].href` |
| Copy | `src/config/content.ts` (sourced from the brief) |

Destination email for Formspree: `maazkhanforbusiness@gmail.com`

## Contact

- Email: maazkhanforbusiness@gmail.com
- WhatsApp: button/link to `https://wa.me/919760003398` (number not shown on the site)
