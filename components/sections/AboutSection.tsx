'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Code2, GitCommit, Layers } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { SITE } from '@/lib/constants'

const STATS = [
  { label: 'Projects Built', to: 20, suffix: '+' },
  { label: 'Technologies Mastered', to: 35, suffix: '+' },
  { label: 'GitHub Commits', to: 500, suffix: '+' },
]

const PRINCIPLES = [
  { icon: Layers, title: 'End-to-End Builder', description: 'From model logic and APIs to polished product interfaces.' },
  { icon: Code2, title: 'Applied Engineering', description: 'Practical systems built around real user problems, not demos only.' },
  { icon: GitCommit, title: 'Consistent Shipping', description: 'Iterating through projects, experiments, and public repositories.' },
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
          <p className="text-base leading-relaxed text-content-secondary">
            My niche is full stack development: turning ideas into reliable, polished web apps with
            React, Next.js, Node/FastAPI, and modern databases. AI agents, computer vision, and
            security skills sit on top of that foundation — so products stay useful, shippable, and
            production-minded.
          </p>
          <p className="mt-4 text-base leading-relaxed text-content-secondary">
            Over the last two years I have focused on shipping real projects end-to-end, while also
            growing junior security analyst skills around web testing and AI-assisted threat detection.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-line bg-bg-surface p-4 transition-all hover:border-accent/30 hover:card-hover-glow"
              >
                <p className="font-mono text-2xl font-bold text-gradient">
                  <AnimatedCounter to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-content-muted">{s.label}</p>
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
                <h3 className="mt-3 font-display text-sm font-bold text-content-primary">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-content-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}