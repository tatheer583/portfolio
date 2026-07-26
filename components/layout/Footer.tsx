'use client'

import * as React from 'react'
import { ArrowUp, Mail, Phone } from 'lucide-react'
import { NAV_LINKS, SITE, SOCIAL_LINKS } from '@/lib/constants'

function SocialIcon({ icon }: { icon: 'github' | 'linkedin' }) {
  if (icon === 'github') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export function Footer() {
  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-line bg-bg-surface">
      <div className="mx-auto grid max-w-container gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 font-display text-sm font-extrabold text-gradient">
              MT
            </span>
            <span className="font-display text-base font-bold text-content-primary">
              {SITE.name}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-content-secondary">{SITE.tagline}</p>
          <div className="mt-4 space-y-2 text-sm text-content-secondary">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-accent">
              <Mail className="h-4 w-4" /> {SITE.email}
            </a>
            <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 hover:text-accent">
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-content-primary">Navigation</h3>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-content-secondary transition-colors hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-content-primary">Connect</h3>
          <div className="mt-4 flex gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-content-secondary transition-colors hover:border-accent/40 hover:text-accent">
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-content-secondary">{SITE.location}</p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-content-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <button type="button" onClick={backToTop} className="inline-flex items-center gap-2 transition-colors hover:text-accent">
            Back to top <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}