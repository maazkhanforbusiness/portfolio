import { footer } from '../config/content'
import { site } from '../config/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-inner footer-grid">
        <div>
          <p className="footer-name">{footer.name}</p>
          <p className="footer-tag">{footer.tagline}</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
          {site.socials.map((s) =>
            s.href ? (
              <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ) : (
              <span key={s.id} className="is-placeholder">
                {s.label}
              </span>
            ),
          )}
        </div>
        <div className="footer-meta">
          <p>
            © {footer.copyrightYear} {footer.name}
          </p>
          <a href="#top">{footer.backToTop}</a>
        </div>
      </div>
    </footer>
  )
}
