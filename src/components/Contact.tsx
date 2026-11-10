import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { clinic, getWhatsAppUrl } from '../data/clinic'
import { useLanguage } from '../i18n/useLanguage'
import type { Translations } from '../i18n/translations'
import { SectionLabel } from './SectionHeading'
import { WhatsAppIcon } from './WhatsAppIcon'

type FormValues = { name: string; phone: string; message: string }
type Field = keyof FormValues
type ErrorKey = 'nameError' | 'phoneError' | 'messageError' | 'messageMaxError'
type FormErrors = Partial<Record<Field, ErrorKey>>
const fields: Field[] = ['name', 'phone', 'message']

function normalizePhone(phone: string) {
  return phone
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 1632))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 1776))
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (values.name.trim().length < 2) errors.name = 'nameError'
  const normalized = normalizePhone(values.phone.trim())
  const digits = normalized.replace(/\D/g, '')
  if (
    !/^\+?[\d\s().-]+$/.test(normalized) ||
    digits.length < 7 ||
    digits.length > 15
  )
    errors.phone = 'phoneError'
  if (values.message.trim().length < 10) errors.message = 'messageError'
  if (values.message.length > 1000) errors.message = 'messageMaxError'
  return errors
}

function composeMessage(values: FormValues, t: Translations) {
  return `${t.formMessageTitle}\n\n${t.nameLabel}: ${values.name.trim()}\n${t.phoneLabel}: ${normalizePhone(values.phone.trim())}\n${t.messageLabel}: ${values.message.trim()}`
}

export function Contact() {
  const { language, t } = useLanguage()
  const [values, setValues] = useState<FormValues>({
    name: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [ready, setReady] = useState(false)
  const form = useRef<HTMLFormElement>(null)
  const details = [
    {
      icon: Phone,
      title: t.phone,
      value: clinic.contact.phone,
      href: `tel:${clinic.contact.phoneHref}`,
      ltr: true,
    },
    {
      icon: Mail,
      title: t.email,
      value: clinic.contact.email,
      href: `mailto:${clinic.contact.email}`,
      ltr: true,
    },
    {
      icon: MapPin,
      title: t.address,
      value: clinic.contact.address[language],
      href: '#location',
      ltr: false,
    },
    {
      icon: Clock3,
      title: t.hours,
      value: clinic.contact.workingHours[language],
      extra: clinic.contact.closed[language],
      ltr: false,
    },
  ]
  const preparedUrl = getWhatsAppUrl(language, composeMessage(values, t))

  function change(field: Field, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => ({ ...previous, [field]: undefined }))
    setReady(false)
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = fields.find((field) => nextErrors[field])
    if (firstInvalid) {
      setReady(false)
      form.current
        ?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)
        ?.focus()
      return
    }
    window.open(preparedUrl, '_blank', 'noopener,noreferrer')
    setReady(true)
  }

  return (
    <section
      id="contact"
      className="section-pad section-anchor contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container contact-grid">
        <div className="contact-copy" data-reveal>
          <SectionLabel number="03">{t.contactEyebrow}</SectionLabel>
          <h2 id="contact-heading">
            {t.contactHeading}
            <span className="text-primary">{t.contactHighlight}</span>
          </h2>
          <p className="body-lead">{t.contactDescription}</p>
          <div className="contact-details">
            {details.map(({ icon: Icon, title, value, href, ltr, extra }) => {
              const content = (
                <>
                  <span className="detail-icon">
                    <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <span
                      className="detail-value"
                      dir={ltr ? 'ltr' : undefined}
                    >
                      {value}
                    </span>
                    {extra && <p className="detail-extra">{extra}</p>}
                  </div>
                </>
              )
              return href ? (
                <a className="contact-detail" key={title} href={href}>
                  {content}
                </a>
              ) : (
                <div className="contact-detail" key={title}>
                  {content}
                </div>
              )
            })}
          </div>
          <p className="demo-contact">{t.demoContact}</p>
        </div>
        <div className="contact-form-wrap" data-reveal>
          <div className="form-top">
            <span className="form-flower" aria-hidden="true">
              ✳
            </span>
            <span>{clinic.tagline[language]}</span>
          </div>
          <h3>{t.formTitle}</h3>
          <p className="form-description">{t.formDescription}</p>
          <form ref={form} noValidate onSubmit={submit}>
            <div className="form-field">
              <label htmlFor="contact-name">
                {t.nameLabel}
                <span aria-hidden="true"> *</span>
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={80}
                value={values.name}
                placeholder={t.namePlaceholder}
                onChange={(event) => change('name', event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p className="field-error" id="name-error">
                  {t[errors.name]}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="contact-phone">
                {t.phoneLabel}
                <span aria-hidden="true"> *</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={30}
                dir="ltr"
                value={values.phone}
                placeholder={t.phonePlaceholder}
                onChange={(event) => change('phone', event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p className="field-error" id="phone-error">
                  {t[errors.phone]}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">
                {t.messageLabel}
                <span aria-hidden="true"> *</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={3}
                maxLength={1000}
                value={values.message}
                placeholder={t.messagePlaceholder}
                onChange={(event) => change('message', event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p className="field-error" id="message-error">
                  {t[errors.message]}
                </p>
              )}
            </div>
            <div className="sr-only" role="alert">
              {fields.some((field) => errors[field]) ? t.formErrors : ''}
            </div>
            <button className="button button-primary form-submit" type="submit">
              <WhatsAppIcon />
              {t.submit}
              <ArrowUpRight
                className="directional ms-auto"
                size={19}
                aria-hidden="true"
              />
            </button>
            <p className="form-hint">
              <ShieldCheck size={15} aria-hidden="true" />
              {t.formHint}
            </p>
            {ready && (
              <div className="form-success" role="status">
                <p>{t.formSuccess}</p>
                <a href={preparedUrl} target="_blank" rel="noopener noreferrer">
                  {t.formFallback}
                  <ArrowUpRight
                    className="directional"
                    size={16}
                    aria-hidden="true"
                  />
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
