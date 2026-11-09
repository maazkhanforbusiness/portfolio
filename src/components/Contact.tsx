import { useEffect, useState, type FormEvent } from 'react'
import { contactSection } from '../config/content'
import { site } from '../config/site'

type Status = 'idle' | 'opened' | 'error'

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

function buildInquiryMessage({
  fullName,
  phone,
  email,
  projectType,
  details,
}: {
  fullName: string
  phone: string
  email: string
  projectType: string
  details: string
}) {
  const lines = [
    'New portfolio inquiry',
    '',
    `Name: ${fullName}`,
    phone ? `Phone: ${phone}` : null,
    email ? `Email: ${email}` : null,
    `Project type: ${projectType}`,
    '',
    'Project details:',
    details,
  ].filter((line): line is string => line !== null)

  return lines.join('\n')
}

export function Contact() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState('')
  const [details, setDetails] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const preferred = sessionStorage.getItem('preferredService')
    if (preferred) {
      setDetails((current) => current || `Interested in: ${preferred}\n\n`)
      sessionStorage.removeItem('preferredService')
    }
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    const name = fullName.trim()
    const phoneValue = phone.trim()
    const emailValue = email.trim()
    const type = projectType.trim()
    const detailText = details.trim()

    if (!name || !type || !detailText) {
      setStatus('error')
      setMessage(contactSection.form.required)
      return
    }

    if (!phoneValue && !emailValue) {
      setStatus('error')
      setMessage(contactSection.form.contactRequired)
      return
    }

    if (emailValue && !emailOk(emailValue)) {
      setStatus('error')
      setMessage(contactSection.form.invalidEmail)
      return
    }

    const body = buildInquiryMessage({
      fullName: name,
      phone: phoneValue,
      email: emailValue,
      projectType: type,
      details: detailText,
    })

    const whatsappUrl = `${site.whatsappUrl}?text=${encodeURIComponent(body)}`
    const mailtoUrl = `mailto:${site.email}?subject=${encodeURIComponent(
      `Portfolio inquiry — ${type}`,
    )}&body=${encodeURIComponent(body)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

    const mailLink = document.createElement('a')
    mailLink.href = mailtoUrl
    mailLink.rel = 'noopener'
    document.body.appendChild(mailLink)
    mailLink.click()
    mailLink.remove()

    setStatus('opened')
    setMessage(contactSection.form.opened)
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
          <label className="full">
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
            <span>{contactSection.form.phone}</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={contactSection.form.phoneHint}
            />
          </label>
          <label>
            <span>{contactSection.form.email}</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={contactSection.form.emailHint}
            />
          </label>
          <p className="form-note full">{contactSection.form.contactNote}</p>
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

          <div className="form-actions full">
            <button type="submit" className="btn btn-dark">
              {contactSection.form.submit}
            </button>
            {message && (
              <p
                className={`form-status ${status === 'opened' ? 'ok' : 'err'}`}
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
