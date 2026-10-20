'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Code2, GitCommit, Layers } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { SITE } from '@/lib/constants'
import { PROJECT_STATS } from '@/data/projects'

const STATS = [
  { label: 'Public repositories', to: PROJECT_STATS.total, suffix: '' },
  { label: 'GitHub stars earned', to: PROJECT_STATS.stars, suffix: '' },
  { label: 'Technologies shipped with', to: 42, suffix: '+' },
]

const PRINCIPLES = [
  { icon: Layers, title: 'End-to-End Builder', description: 'From model logic and APIs to polished product interfaces.' },
  { icon: Code2, title: 'Applied Engineering', description: 'Practical systems built around real user problems, not demos only.' },
  { icon: GitCommit, title: 'Consistent Shipping', description: 'Every project here is public, documented and actually released.' },
]

export function AboutSection() {
  const [imageSrc, setImageSrc] = React.useState<string>(SITE.profileImage)

  return (
    <Section id="about">
      <SectionHeader
        eyebrow="About"
        title="Full Stack Developer With AI Depth"
        subtitle="I ship complete web products end-to-end — clean UI, solid backends, and practical AI or security features when they make the product better."
      />

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute inset-0 rounded-xl bg-accent/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-xl border border-line bg-bg-surface p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-bg-elevated">
              <Image
                src={imageSrc}
                alt="Muhammad Tatheer portrait"
                fill
                priority
                sizes="(min-width: 1024px) 384px, 90vw"
                className="object-cover"
                onError={() => setImageSrc(SITE.profileFallbackImage)}
              />
            </div>
          </div>
        </motion.div>

        <div>
          <p className="text-base sm:text-lg font-medium leading-relaxed text-content-primary">
            My niche is full stack development: turning ideas into reliable, polished web apps with
            React, Next.js, Node/FastAPI, and modern databases. AI agents, computer vision, and
            security skills sit on top of that foundation — so products stay useful, shippable, and
            production-minded.
          </p>
          <p className="mt-4 text-base sm:text-lg font-medium leading-relaxed text-content-primary">
            Over the past year I have focused on shipping real projects end-to-end, while also
            growing applied AI engineering and security skills around web development and
            AI-assisted threat detection.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-line bg-bg-surface p-4 transition-all hover:border-accent/30 hover:card-hover-glow"
              >
                <p className="font-mono text-3xl font-extrabold text-accent">
                  <AnimatedCounter to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-content-secondary">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PRINCIPLES.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-line bg-bg-surface p-4 transition-all hover:-translate-y-1 hover:border-accent/30"
              >
                <item.icon className="h-5 w-5 text-accent" />
                <h3 className="mt-3 font-display text-base font-bold text-content-primary">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm font-medium leading-relaxed text-content-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
