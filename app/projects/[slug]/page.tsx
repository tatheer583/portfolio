import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Github, ExternalLink } from 'lucide-react'
import { PROJECTS, getProjectBySlug } from '@/data/projects'
import { Section } from '@/components/layout/Section'
import { TechChip } from '@/components/shared/TechChip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const idx = PROJECTS.findIndex((p) => p.slug === project.slug)
  const next = PROJECTS[(idx + 1) % PROJECTS.length]

  return (
    <main className="pt-16">
      <Section className="pt-10 md:pt-14">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-content-secondary transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        <div className="mt-6 max-w-3xl">
          <h1 className="font-display text-3xl font-bold tracking-tight text-content-primary md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-content-secondary md:text-lg">
            {project.description}
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-line bg-bg-elevated">
              <Image
                src={project.image}
                alt={`${project.title} cover`}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>

            <p className="mt-8 text-lg leading-relaxed text-content-secondary">
              {project.longDescription}
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-content-primary">
              Key Features
            </h2>
            <ul className="mt-4 space-y-3">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-content-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>

            {project.topics && project.topics.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-2xl font-bold text-content-primary">
                  Repository Topics
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.topics.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-bg-surface px-3 py-1 font-mono text-xs text-content-secondary"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-line bg-bg-surface p-6">
                <h3 className="font-display text-lg font-bold text-content-primary">Challenges</h3>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                  {project.challenges}
                </p>
              </div>
              <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
                <h3 className="font-display text-lg font-bold text-accent-light">Results</h3>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                  {project.results}
                </p>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-line bg-bg-surface p-6">
              <Badge variant="accent">{project.categoryLabel}</Badge>
              <h3 className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-content-muted">
                Tech Stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <TechChip key={t} name={t} />
                ))}
              </div>

              {/* Live repository metadata */}
              <dl className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
                {project.language && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-content-muted">Primary language</dt>
                    <dd className="font-medium text-content-primary">{project.language}</dd>
                  </div>
                )}
                {typeof project.stars === 'number' && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-content-muted">Stars</dt>
                    <dd className="font-medium text-content-primary">{project.stars}</dd>
                  </div>
                )}
                {typeof project.forks === 'number' && project.forks > 0 && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-content-muted">Forks</dt>
                    <dd className="font-medium text-content-primary">{project.forks}</dd>
                  </div>
                )}
                {project.license && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-content-muted">Licence</dt>
                    <dd className="text-right font-medium text-content-primary">{project.license}</dd>
                  </div>
                )}
                {project.status && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-content-muted">Status</dt>
                    <dd className="font-medium text-content-primary">{project.status}</dd>
                  </div>
                )}
                {project.updatedAt && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-content-muted">Last push</dt>
                    <dd className="font-medium text-content-primary">{project.updatedAt}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-6 flex flex-col gap-3">
                {project.links.github && (
                  <Button asChild variant="outline" size="sm">
                    <a href={project.links.github} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" /> Source Code
                    </a>
                  </Button>
                )}
                {project.links.demo && (
                  <Button asChild variant="primary" size="sm">
                    <a href={project.links.demo} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-content-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-light"
          >
            Next: {next.title} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </main>
  )
}
