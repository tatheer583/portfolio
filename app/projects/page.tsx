import type { Metadata } from 'next'
import Link from 'next/link'
import { PROJECTS } from '@/data/projects'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ProjectCard } from '@/components/shared/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A selection of AI systems and products built end-to-end by Muhammad Tatheer.',
}

export default function ProjectsPage() {
  return (
    <main className="pt-24">
      <Section>
        <SectionHeader
          eyebrow="Work"
          title="All Projects"
          subtitle="Every project below was designed and shipped end-to-end — from model to interface."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-light"
          >
            ← Back to home
          </Link>
        </div>
      </Section>
    </main>
  )
}
