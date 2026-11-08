import { useEffect, useState, type FormEvent } from 'react'
import { contactSection, servicesSection } from '../config/content'
import { site } from '../config/site'

type Status = 'idle' | 'loading' | 'success' | 'error' | 'unconfigured'

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export function Contact() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [service, setService] = useState('')
  const [projectType, setProjectType] = useState('')
  const [budget, setBudget] = useState('')
  const [details, setDetails] = useState('')
  const [references, setReferences] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    const preferred = sessionStorage.getItem('preferredService')
    if (preferred) {
      setService(preferred)
      sessionStorage.removeItem('preferredService')
    }
  }, [])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (locked || status === 'loading') return

    if (!fullName.trim() || !email.trim() || !service || !projectType || !details.trim()) {
      setStatus('error')
      setMessage(contactSection.form.required)
      return
    }
    if (!emailOk(email.trim())) {
      setStatus('error')
      setMessage(contactSection.form.invalidEmail)
      return
    }

    const endpoint = site.formspreeEndpoint
    if (!endpoint) {
      setStatus('unconfigured')
      setMessage(contactSection.form.errorConfig)
      return
    }

    setStatus('loading')
    setMessage('')
    setLocked(true)

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          service,
          projectType,
          budget: budget.trim() || undefined,
          details: details.trim(),
          references: references.trim() || undefined,
          _replyto: email.trim(),
          _subject: `Portfolio inquiry — ${service}`,
        }),
      })

      if (!res.ok) {
        setStatus('error')
        setMessage(contactSection.form.errorGeneric)
        setLocked(false)
        return
      }

      setStatus('success')
      setMessage(contactSection.form.success)
      setFullName('')
      setEmail('')
      setCompany('')
      setService('')
      setProjectType('')
      setBudget('')
      setDetails('')
      setReferences('')
    } catch {
      setStatus('error')
      setMessage(contactSection.form.errorGeneric)
      setLocked(false)
    }
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="section-inner contact-grid">
        <header className="section-head">
          <p className="eyebrow">{contactSection.eyebrow}</p>
          <h2 id="contact-title">{contactSection.title}</h2>
          <p className="section-body">{contactSection.body}</p>

          <div className="contact-direct">
            <p>{contactSection.direct}</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <ul className="social-list">
              {site.socials.map((s) =>
                s.href ? (
                  <li key={s.id}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ) : (
                  <li key={s.id} className="is-placeholder">
                    {s.label} <span>(link coming soon)</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </header>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <label>
            <span>
              {contactSection.form.fullName} <em>*</em>
            </span>
            <input
              name="fullName"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
          <label>
            <span>
              {contactSection.form.email} <em>*</em>
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <span>
              {contactSection.form.company}{' '}
              <small>({contactSection.form.optional})</small>
            </span>
            <input
              name="company"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>
          <label>
            <span>
              {contactSection.form.service} <em>*</em>
            </span>
            <select
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
            >
              <option value="">Select a service</option>
              {servicesSection.items.map((s) => (
                <option key={s.num} value={s.title}>
                  {s.num}. {s.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>
              {contactSection.form.projectType} <em>*</em>
            </span>
            <select
              name="projectType"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              required
            >
              <option value="">Select project type</option>
              {contactSection.projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>
              {contactSection.form.budget}{' '}
              <small>({contactSection.form.optional})</small>
            </span>
            <input name="budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
          </label>
          <label className="full">
            <span>
              {contactSection.form.details} <em>*</em>
            </span>
            <textarea
              name="details"
              rows={5}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </label>
          <label className="full">
            <span>
              {contactSection.form.references}{' '}
              <small>({contactSection.form.optional})</small>
            </span>
            <input
              name="references"
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              placeholder="https://"
            />
          </label>

          <div className="form-actions full">
            <button
              type="submit"
              className="btn btn-dark"
              disabled={status === 'loading' || (locked && status === 'success')}
            >
              {status === 'loading' ? contactSection.form.sending : contactSection.form.submit}
            </button>
            {message && (
              <p
                className={`form-status ${
                  status === 'success' ? 'ok' : status === 'unconfigured' ? 'warn' : 'err'
                }`}
                role="status"
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
