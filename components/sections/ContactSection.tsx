'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { CheckCircle2, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SITE } from '@/lib/constants'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email'),
  subject: z.enum(['job', 'freelance', 'security', 'open-source', 'collab', 'other']),
  message: z.string().min(10, 'Message should be at least 10 characters'),
  company: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export function ContactSection() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subject: 'job' },
  })

  const onSubmit = async (values: FormValues) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact">
      <SectionHeader
        eyebrow="Contact"
        title="Let's Build Something Useful"
        subtitle="Reach out for full-stack product work, AI-enhanced apps, open-source collaboration, or security consulting."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-full flex-col items-center justify-center rounded-xl border border-accent/40 bg-accent/5 p-10 text-center"
            >
              <CheckCircle2 className="h-12 w-12 text-green-400" />
              <h3 className="mt-4 font-display text-xl font-bold text-content-primary">
                Message sent
              </h3>
              <p className="mt-2 text-sm text-content-secondary">
                Thanks for reaching out. I will get back to you soon.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>
                Send another
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="hidden" aria-hidden>
                <label htmlFor="company">Company</label>
                <Input id="company" tabIndex={-1} autoComplete="off" {...register('company')} />
              </div>

              <Field label="Name" error={errors.name?.message}>
                <Input id="name" placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} {...register('name')} />
              </Field>

              <Field label="Email" error={errors.email?.message}>
                <Input id="email" type="email" placeholder="you@email.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} {...register('email')} />
              </Field>

              <Field label="Subject" error={errors.subject?.message}>
                <select id="subject" className="flex h-11 w-full rounded-md border border-line bg-bg-surface px-3 text-sm text-content-primary focus-visible:border-accent focus-visible:outline-none" {...register('subject')}>
                  <option value="job">Full-time Role</option>
                  <option value="freelance">Freelance Project</option>
                  <option value="security">Security Consulting</option>
                  <option value="open-source">Open Source</option>
                  <option value="collab">Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </Field>

              <Field label="Message" error={errors.message?.message}>
                <Textarea id="message" placeholder="Tell me about your project, role, or security request..." aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} {...register('message')} />
              </Field>

              {status === 'error' && (
                <p className="text-sm text-red-400" role="alert">
                  Something went wrong sending your message. Please try again or email me directly.
                </p>
              )}

              <Button type="submit" loading={status === 'loading'} className="w-full">
                <Send className="h-4 w-4" /> Send Message
              </Button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-line bg-bg-surface p-6">
            <h3 className="font-display text-lg font-bold text-content-primary">Direct links</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center gap-3 text-content-secondary">
                <Mail className="h-5 w-5 text-accent" />
                <a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a>
              </li>
              <li className="flex items-center gap-3 text-content-secondary">
                <Phone className="h-5 w-5 text-accent" />
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`} className="hover:text-accent">{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-content-secondary">
                <MapPin className="h-5 w-5 text-accent" />
                {SITE.location}
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-line bg-bg-surface p-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-medium text-content-primary">Open to</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {SITE.openTo.map((item) => (
                <span key={item} className="rounded-full border border-line bg-bg-elevated px-3 py-1 text-xs text-content-secondary">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a href={SITE.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-bg-surface py-3 text-sm font-medium text-content-secondary transition-colors hover:border-accent/40 hover:text-accent">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={SITE.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-bg-surface py-3 text-sm font-medium text-content-secondary transition-colors hover:border-accent/40 hover:text-accent">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={label.toLowerCase()} className="mb-1.5 block text-sm font-medium text-content-primary">
        {label}
      </label>
      {children}
      {error && <p id={`${label.toLowerCase()}-error`} className="mt-1 text-xs text-red-400" role="alert">{error}</p>}
    </div>
  )
}