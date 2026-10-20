import type { Metadata } from 'next'
import Link from 'next/link'
import { PROJECTS } from '@/data/projects'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { ProjectCard } from '@/components/shared/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'All eleven public projects by Muhammad Tatheer — web, mobile, AI, IoT and security, each with source code and documentation.',
}

export default function ProjectsPage() {
  return (
    <main className="pt-16">
      <Section className="pt-10 md:pt-14">
        <SectionHeader
          eyebrow="Work"
          title="All Projects"
          subtitle="Eleven public repositories — each one a working product with source code, documentation and a live demo or download where available."
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
