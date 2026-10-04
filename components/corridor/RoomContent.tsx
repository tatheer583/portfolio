'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, ArrowUpRight, Award, Brain, CheckCircle2, Code2, Download, Github, GraduationCap, Linkedin, LoaderCircle, Mail, MapPin, Phone, Search, Send, ShieldCheck } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { PROJECTS } from '@/data/projects'
import { EXPERIENCE, EDUCATION } from '@/data/experience'
import { ACHIEVEMENTS } from '@/data/achievements'
import { SKILLS } from '@/data/skills'
import type { Project } from '@/types/project'

export type RoomName = 'projects' | 'about' | 'journey' | 'contact'
const ROOM_TITLES: Record<RoomName, { number: string; eyebrow: string; title: string; intro: string }> = {
  projects: { number: '01', eyebrow: 'The project gallery', title: 'Ideas, made real.', intro: 'A collection of web products, AI experiments, and intelligent systems. Step closer to explore the work behind each one.' },
  about: { number: '02', eyebrow: 'Meet the maker', title: 'A little about me.', intro: 'Full stack development at the core. AI, computer vision, and security in the details.' },
  journey: { number: '03', eyebrow: 'The story so far', title: 'Always building. Always learning.', intro: 'The experience, education, and milestones that have shaped my work.' },
  contact: { number: '04', eyebrow: 'An open invitation', title: 'Let’s build something useful.', intro: 'Have a product in mind, an interesting role, or an idea worth exploring? I would love to hear about it.' },
}

export default function RoomContent({ room, onClose }: { room: RoomName; onClose: () => void }) {
  const details = ROOM_TITLES[room]
  return (
    <div className={'corridor-content corridor-content-' + room}>
      <button type="button" className="room-back-link" onClick={onClose}><ArrowLeft size={16} aria-hidden="true" /> Back to the hallway</button>
      <header className="room-heading">
        <p className="room-eyebrow">Room {details.number} <span aria-hidden="true">/</span> {details.eyebrow}</p>
        <h2 id="room-title" tabIndex={-1}>{details.title}</h2>
        <p className="room-intro">{details.intro}</p>
      </header>
      {room === 'projects' && <ProjectGallery />}
      {room === 'about' && <AboutRoom />}
      {room === 'journey' && <JourneyRoom />}
      {room === 'contact' && <ContactRoom />}
    </div>
  )
}

const PROJECT_FILTERS = ['All work', 'Full Stack', 'AI/ML', 'IoT', 'Security', 'Computer Vision'] as const
function ProjectGallery() {
  const [query, setQuery] = React.useState('')
  const [filter, setFilter] = React.useState<(typeof PROJECT_FILTERS)[number]>('All work')
  const projects = PROJECTS.filter((project) =>
    (filter === 'All work' || project.category.some((category) => category === filter)) &&
    (project.title + ' ' + project.description + ' ' + project.tech.join(' ')).toLowerCase().includes(query.trim().toLowerCase())
  ).sort((a, b) => a.order - b.order)
  return (
    <>
      <div className="project-toolbar">
        <div className="project-filters" role="group" aria-label="Filter projects by discipline">
          {PROJECT_FILTERS.map((category) => <button type="button" key={category} className={'project-filter' + (filter === category ? ' is-active' : '')} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}
        </div>
        <label className="project-search"><Search size={17} aria-hidden="true" /><span className="sr-only">Search projects</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a project or technology" /></label>
      </div>
      <p className="gallery-count" role="status">{projects.length} of {PROJECTS.length} projects</p>
      <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      {projects.length === 0 && <div className="room-empty"><Search size={28} aria-hidden="true" /><h3>No projects found</h3><p>Try another technology or explore the full collection.</p><button className="room-action" type="button" onClick={() => { setQuery(''); setFilter('All work') }}>Show all work</button></div>}
    </>
  )
}

// Rooms mount on demand; start image requests before the dialog finishes opening.
function ProjectCard({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = React.useState(false)
  return (
    <article className="gallery-card">
      <Link href={'/projects/' + project.slug} className="gallery-image" aria-label={'Read the ' + project.title + ' case study'}>
        {imageFailed ? <div className="gallery-image-fallback"><Code2 size={40} aria-hidden="true" /><span>{project.title}</span></div> : <Image src={project.image} alt={project.title + ' project artwork'} fill priority={project.order <= 2} loading="eager" sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 90vw" onError={() => setImageFailed(true)} />}
        <span className="gallery-number">{String(project.order).padStart(2, '0')}</span><span className="gallery-view" aria-hidden="true"><ArrowUpRight size={22} /></span>
      </Link>
      <div className="gallery-body">
        <p className="room-eyebrow">{project.categoryLabel}</p>
        <h3><Link href={'/projects/' + project.slug}>{project.title}</Link></h3>
        <p>{project.description}</p>
        <div className="project-tags" aria-label="Technologies used">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
        <div className="gallery-links">
          <Link href={'/projects/' + project.slug}>Explore the project <ArrowUpRight size={16} aria-hidden="true" /></Link>
          {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" aria-label={project.title + ' on GitHub (opens in a new tab)'}><Github size={17} aria-hidden="true" /> Code</a>}
          {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={16} aria-hidden="true" /></a>}
        </div>
      </div>
    </article>
  )
}

function AboutRoom() {
  const [portrait, setPortrait] = React.useState<string>(SITE.profileImage)
  return (
    <>
      <div className="about-layout">
        <figure className="portrait-frame">
          <div className="portrait-image"><Image src={portrait} alt="Muhammad Tatheer" fill priority loading="eager" sizes="(min-width: 900px) 320px, 80vw" onError={() => setPortrait(SITE.profileFallbackImage)} /></div>
          <figcaption className="portrait-caption"><span>{SITE.name}</span><span>{SITE.role} · {SITE.location}</span></figcaption>
        </figure>
        <div className="about-copy">
          <p className="room-eyebrow">Developer. Builder. Problem solver.</p><h3>From the first idea to the final product.</h3>
          <p>My niche is full stack development: turning ideas into reliable, polished web apps with React, Next.js, Node/FastAPI, and modern databases. AI agents, computer vision, and security skills sit on top of that foundation — so products stay useful, shippable, and production-minded.</p>
          <p>Over the last two years I have focused on shipping real projects end-to-end, while also growing junior security analyst skills around web testing and AI-assisted threat detection.</p>
          <div className="room-actions"><Link href={SITE.resumeUrl} className="room-action primary"><Download size={16} aria-hidden="true" /> View résumé</Link><a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="room-action"><Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" /></a></div>
        </div>
      </div>
      <div className="room-card-grid expertise-cards">
        <article className="room-card"><Code2 size={23} aria-hidden="true" /><h3>End-to-end builder</h3><p>From model logic and APIs to polished product interfaces. Practical systems built around real user problems.</p></article>
        <article className="room-card"><Brain size={23} aria-hidden="true" /><h3>Applied AI</h3><p>LLMs, AI agents, RAG systems, computer vision, and intelligent IoT — connected to complete products across the UI, APIs, model integration, and deployment.</p></article>
        <article className="room-card"><ShieldCheck size={23} aria-hidden="true" /><h3>Security & ethical hacking</h3><p>Web application testing, vulnerability discovery, and AI-assisted threat detection. Practical Burp Suite workflows and OWASP Top 10 awareness.</p></article>
      </div>
      <section aria-labelledby="skills-room-title">
        <div className="room-section-heading"><p className="room-eyebrow">The toolkit</p><h3 id="skills-room-title">Skills behind the work.</h3><p>The technologies I use to bring ideas to life.</p></div>
        <div className="skill-groups">{SKILLS.map((category) => <article className="room-card skill-group" key={category.id}><h4>{category.label}</h4><ul>{category.skills.map((skill) => <li key={skill.name}><span className="skill-label">{skill.name}</span><span className="skill-level" aria-label={'Self-assessed proficiency: ' + skill.level + ' percent'}>{skill.level}%</span></li>)}</ul></article>)}</div>
      </section>
    </>
  )
}

function JourneyRoom() {
  return (
    <>
      <section aria-labelledby="experience-room-title">
        <div className="room-section-heading"><p className="room-eyebrow">Experience</p><h3 id="experience-room-title">One step, then the next.</h3></div>
        <ol className="room-timeline">{EXPERIENCE.map((entry) => <li className="timeline-item" key={entry.period}><span className="timeline-period">{entry.period}</span><div><h4>{entry.title}</h4><p>{entry.description}</p><div className="project-tags">{entry.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div></li>)}</ol>
      </section>
      <section className="room-card journey-education" aria-labelledby="education-room-title">
        <GraduationCap size={30} aria-hidden="true" /><div><p className="room-eyebrow">Education · {EDUCATION.period}</p><h3 id="education-room-title">{EDUCATION.institution}</h3><h4>{EDUCATION.degree}</h4><p>{EDUCATION.note}</p></div>
      </section>
      <section aria-labelledby="achievements-room-title">
        <div className="room-section-heading"><p className="room-eyebrow">Milestones</p><h3 id="achievements-room-title">Things I’m proud of.</h3></div>
        <div className="room-card-grid">{ACHIEVEMENTS.map((achievement) => <article className="room-card" key={achievement.title}><Award size={22} aria-hidden="true" /><h4>{achievement.title}</h4><p>{achievement.description}</p></article>)}</div>
      </section>
    </>
  )
}

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter at least 2 characters.').max(100, 'Please keep your name under 100 characters.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  subject: z.enum(['job', 'freelance', 'security', 'open-source', 'collab', 'other']),
  message: z.string().trim().min(10, 'Please write a message of at least 10 characters.').max(5000, 'Please keep your message under 5,000 characters.'),
  company: z.string().max(200).optional(),
})
type ContactValues = z.infer<typeof contactSchema>
function ContactRoom() {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = React.useState('')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactValues>({ resolver: zodResolver(contactSchema), defaultValues: { subject: 'job', company: '' } })
  const submitMessage = async (values: ContactValues) => {
    setStatus('sending')
    setErrorMessage('')
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
      const data: { success?: boolean; message?: string } = await response.json()
      if (response.ok && data.success === true) { setStatus('success'); reset() }
      else { setStatus('error'); setErrorMessage(data.message || 'Your message could not be sent. Please try again or email me directly.') }
    } catch { setStatus('error'); setErrorMessage('Unable to send your message. Please try again or email me directly.') }
  }
  return (
    <div className="contact-layout">
      <div className="room-card contact-form-card">
        {status === 'success' ? (
          <div className="contact-success" role="status"><CheckCircle2 size={42} aria-hidden="true" /><h3>Your message is on its way.</h3><p>Thanks for reaching out. I will get back to you soon.</p><button type="button" className="room-action" onClick={() => setStatus('idle')}>Send another message</button></div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit(submitMessage)} noValidate>
            <h3>Leave a note.</h3>
            <div className="honeypot" hidden aria-hidden="true"><label htmlFor="contact-company">Company</label><input id="contact-company" tabIndex={-1} autoComplete="off" {...register('company')} /></div>
            <div className="form-row">
              <ContactField label="Your name" id="contact-name" error={errors.name?.message}><input id="contact-name" autoComplete="name" placeholder="What should I call you?" maxLength={100} aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} {...register('name')} /></ContactField>
              <ContactField label="Email address" id="contact-email" error={errors.email?.message}><input id="contact-email" type="email" autoComplete="email" placeholder="you@example.com" aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} {...register('email')} /></ContactField>
            </div>
            <ContactField label="What’s on your mind?" id="contact-subject" error={errors.subject?.message}><select id="contact-subject" aria-invalid={Boolean(errors.subject)} {...register('subject')}><option value="job">A full-time role</option><option value="freelance">A freelance project</option><option value="security">Security consulting</option><option value="open-source">Open source</option><option value="collab">A collaboration</option><option value="other">Something else</option></select></ContactField>
            <ContactField label="Your message" id="contact-message" error={errors.message?.message}><textarea id="contact-message" rows={6} maxLength={5000} placeholder="Tell me a little about your idea, project, or opportunity…" aria-required="true" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} {...register('message')} /></ContactField>
            {status === 'error' && <p className="form-status form-error" role="alert">{errorMessage} <a href={'mailto:' + SITE.email}>Email me directly <ArrowUpRight size={13} aria-hidden="true" /></a></p>}
            <button type="submit" className="room-action primary form-submit" disabled={status === 'sending'}>{status === 'sending' ? <LoaderCircle className="animate-spin" size={17} aria-hidden="true" /> : <Send size={17} aria-hidden="true" />}{status === 'sending' ? 'Sending your note…' : 'Send your message'}</button>
          </form>
        )}
      </div>
      <aside className="contact-direct" aria-label="Direct contact details">
        <div className="room-card"><p className="room-eyebrow">Prefer a direct hello?</p><h3>My inbox is open.</h3><a className="contact-link" href={'mailto:' + SITE.email}><Mail size={19} aria-hidden="true" /><span>{SITE.email}</span><ArrowUpRight size={15} aria-hidden="true" /></a><a className="contact-link" href={'tel:' + SITE.phone.replace(/[^+\d]/g, '')}><Phone size={19} aria-hidden="true" /><span>{SITE.phone}</span></a><p className="contact-link"><MapPin size={19} aria-hidden="true" /><span>{SITE.location}</span></p></div>
        <div className="room-card"><p className="room-eyebrow"><span className="room-status-dot" aria-hidden="true" /> Open to opportunities</p><div className="project-tags">{SITE.openTo.map((opportunity) => <span key={opportunity}>{opportunity}</span>)}</div></div>
        <div className="room-actions"><a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="room-action"><Github size={17} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" /></a><a href={SITE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="room-action"><Linkedin size={17} aria-hidden="true" /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a><Link href={SITE.resumeUrl} className="room-action"><Download size={17} aria-hidden="true" /> Résumé</Link></div>
      </aside>
    </div>
  )
}

function ContactField({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return <div className="form-field"><label htmlFor={id}>{label}</label>{children}{error && <p id={id + '-error'} className="form-error" role="alert">{error}</p>}</div>
}



