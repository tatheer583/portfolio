'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Cpu,
  Globe2,
  Bot,
  Shield,
  Smartphone,
  Sparkles,
  GitPullRequest,
  Database,
} from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'

const INTERESTS = [
  {
    icon: Globe2,
    title: 'Full Stack Engineering',
    description:
      'Designing robust, end-to-end architectures from scalable server APIs to pixel-perfect, accessible React and Next.js frontends.',
    tag: 'Web & Systems',
  },
  {
    icon: Bot,
    title: 'Agentic AI & LLMs',
    description:
      'Building multi-agent reasoning loops, context-aware RAG pipelines, and automated agent workflows using Gemini, OpenAI, and LangChain.',
    tag: 'Artificial Intelligence',
  },
  {
    icon: Cpu,
    title: 'Computer Vision & Edge AI',
    description:
      'Exploring real-time object detection, visual perception models (YOLO, OpenCV), and deploying efficient neural nets on edge hardware.',
    tag: 'Vision & Perception',
  },
  {
    icon: Shield,
    title: 'Application Security',
    description:
      'Applying proactive security standards: web penetration testing, OWASP Top 10 mitigation, auth flow hardening, and AI threat defense.',
    tag: 'Cybersecurity',
  },
  {
    icon: Smartphone,
    title: 'Mobile Solutions',
    description:
      'Crafting fluid cross-platform mobile apps using Flutter and Dart with offline caching, clean state management, and native bridges.',
    tag: 'Cross-Platform',
  },
  {
    icon: GitPullRequest,
    title: 'Open Source & Tech Community',
    description:
      'Participating in hackathons, contributing to developer tools, writing clean documentation, and collaborating with global builders.',
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
            <h3 className="mt-5 text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
              {item.title}
            </h3>
            <p className="mt-2 text-base font-medium italic leading-relaxed text-white">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
