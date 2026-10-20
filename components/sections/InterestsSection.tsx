'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Cpu,
  Globe2,
  Bot,
  Shield,
  Smartphone,
  GitPullRequest,
} from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'

const INTERESTS = [
  {
    icon: Globe2,
    title: 'Full Stack Engineering',
    description:
      'Designing end-to-end architectures — from Express and FastAPI services and database models through to accessible React and Next.js interfaces.',
    tag: 'Web & Systems',
  },
  {
    icon: Bot,
    title: 'Local & Applied AI',
    description:
      'Running models where the data lives: Gemma through Ollama for offline scam detection, OpenAI for product features, and on-device inference where privacy matters.',
    tag: 'Artificial Intelligence',
  },
  {
    icon: Cpu,
    title: 'Computer Vision & Sensing',
    description:
      'MediaPipe hand landmarks for sign language recognition, Random Forest classifiers over gas-sensor arrays, and WiFi CSI as a sensor without a camera.',
    tag: 'Vision & Perception',
  },
  {
    icon: Shield,
    title: 'Application Security',
    description:
      'Phishing and malware detection, deterministic threat rules, OWASP Top 10 mitigation, audit logging and permission boundaries.',
    tag: 'Cybersecurity',
  },
  {
    icon: Smartphone,
    title: 'Mobile & Offline-First',
    description:
      'Flutter and Kotlin apps that keep working without a connection — local storage, crash-safe writes, Urdu and English support with RTL layouts.',
    tag: 'Mobile',
  },
  {
    icon: GitPullRequest,
    title: 'Open Source & Craft',
    description:
      'Shipping MIT-licensed tools, writing documentation that explains the limits honestly, and publishing every project with a working download or demo.',
    tag: 'Collaboration',
  },
]

export function InterestsSection() {
  return (
    <Section id="interests">
      <SectionHeader
        eyebrow="Passions & Curiosity"
        title="Areas of Interest & Focus"
        subtitle="The technical domains, engineering philosophies, and emerging technologies that inspire my everyday work and projects."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {INTERESTS.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-line bg-bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:card-hover-glow"
          >
            {/* Top Tag & Icon */}
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-line bg-bg-elevated px-2.5 py-1 text-[11px] font-mono text-content-muted">
                {item.tag}
              </span>
            </div>

            {/* Content */}
            <h3 className="mt-5 text-xl font-bold text-content-primary transition-colors group-hover:text-accent">
              {item.title}
            </h3>
            <p className="mt-2 text-base font-medium leading-relaxed text-content-primary">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
