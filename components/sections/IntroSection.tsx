'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Globe,
  GraduationCap,
  MapPin,
  MessageCircle,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { GITHUB_PROFILE, SITE } from '@/lib/constants'
import { PROJECT_STATS } from '@/data/projects'

const SNAPSHOT = [
  { label: 'Public repositories', value: PROJECT_STATS.total, suffix: '' },
  { label: 'GitHub stars', value: GITHUB_PROFILE.totalStars, suffix: '' },
  { label: 'Live deployments', value: 5, suffix: '' },
  { label: 'Technologies used', value: 42, suffix: '+' },
]

const FACTS = [
  { icon: MapPin, label: 'Location', value: SITE.location },
  { icon: Briefcase, label: 'Availability', value: 'Full-time roles & freelance' },
  { icon: Globe, label: 'Works with', value: 'Remote teams worldwide' },
  { icon: GraduationCap, label: 'Education', value: 'BSc · NUTECH University' },
  { icon: Code2, label: 'Primary stack', value: 'React · Next.js · Python' },
  { icon: Terminal, label: 'Also builds with', value: 'Flutter · Kotlin · Rust' },
]

const FOCUS = [
  {
    icon: Code2,
    title: 'Product Engineering',
    body: 'Next.js and React frontends, Node and FastAPI backends, real databases and auth — shipped as complete, deployable products rather than isolated demos.',
  },
  {
    icon: Sparkles,
    title: 'Applied AI',
    body: 'Local models through Ollama, computer vision with MediaPipe, and machine-learning classifiers — always with an honest line between what works and what is only plausible.',
  },
  {
    icon: Globe,
    title: 'IoT & Sensing',
    body: 'ESP32 CSI receivers, multi-sensor gas arrays and laptop WiFi sensing: real hardware, real readings, and data pipelines that stay useful offline.',
  },
  {
    icon: MessageCircle,
    title: 'Security Thinking',
    body: 'Phishing and malware analysis, deterministic threat rules, audit logging and permission boundaries — security designed in rather than bolted on.',
  },
]

export function IntroSection() {
  const [imageSrc, setImageSrc] = React.useState<string>(SITE.profileImage)

  return (
    <Section id="intro" className="relative overflow-hidden">
      {/* Ambient aurora backdrop */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[26rem] w-[26rem] rounded-full aurora animate-aurora opacity-70" aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[22rem] w-[22rem] rounded-full aurora animate-aurora opacity-50 [animation-delay:-6s]" aria-hidden />

      <SectionHeader
        eyebrow="Introduction"
        title="Hi, I’m Muhammad Tatheer"
        subtitle="A full stack developer based in Islamabad, Pakistan, building complete products across web, mobile, AI and IoT — with every project shipped to a public repository."
      />

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        {/* Narrative column */}
        <div>
          <div className="space-y-4 text-base leading-relaxed text-content-secondary sm:text-lg">
            <p>
              I build software that people actually use. My work usually starts as a
              real problem — a service that needs booking, a team that needs their
              records offline, a child who needs to see her own language on a screen —
              and ends as a complete, documented product with a public repository.
            </p>
            <p>
              My core strength is end-to-end delivery: React and Next.js interfaces,
              Node and FastAPI services, MongoDB and SQLite persistence, authentication,
              and deployment. On top of that sits applied AI — local models, on-device
              computer vision and machine-learning classifiers — used where it genuinely
              improves the product rather than as decoration.
            </p>
            <p>
              Everything below is real. The projects, the stack, the licences and the
              numbers are taken directly from my GitHub account, not from a template.
            </p>
          </div>

          {/* Snapshot counters */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SNAPSHOT.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group relative overflow-hidden rounded-xl border border-line bg-bg-surface p-4 transition-all hover:border-accent/40 hover:card-hover-glow"
              >
                <div className="absolute inset-x-0 top-0 h-px animate-shimmer bg-gradient-to-r from-transparent via-accent/60 to-transparent" aria-hidden />
                <p className="font-mono text-2xl font-extrabold text-accent sm:text-3xl">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs leading-snug text-content-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick facts */}
          <div className="mt-8 grid gap-x-8 gap-y-4 rounded-2xl border border-line bg-bg-surface/60 p-5 sm:grid-cols-2">
            {FACTS.map((fact) => (
              <div key={fact.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-elevated text-accent">
                  <fact.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-content-muted">
                    {fact.label}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-content-primary">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-accent bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent/90 accent-glow"
            >
              See the work <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={SITE.githubReposUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg-surface px-5 py-2.5 text-sm font-semibold text-content-primary transition-all hover:border-accent/40 hover:bg-bg-elevated"
            >
              <span className="font-mono text-xs">@{SITE.githubUsername}</span> · 11 repositories
            </Link>
          </div>
        </div>

        {/* Portrait + focus areas */}
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-accent/25 via-accent2/15 to-accent3/20 blur-2xl transition-opacity duration-500 group-hover:opacity-90" aria-hidden />
            <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-surface p-2.5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-bg-elevated">
                <Image
                  src={imageSrc}
                  alt="Muhammad Tatheer, full stack developer based in Islamabad, Pakistan"
                  fill
                  sizes="(min-width: 1024px) 384px, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={() => setImageSrc(SITE.profileFallbackImage)}
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg-surface to-transparent" />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl border border-line bg-bg-surface/85 px-3 py-2 backdrop-blur-md">
                  <div>
                    <p className="text-sm font-bold text-content-primary">{SITE.name}</p>
                    <p className="text-[11px] text-content-muted">Full Stack & AI Engineer</p>
                  </div>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-3">
            {FOCUS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-xl border border-line bg-bg-surface/60 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-bg-surface"
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="h-4 w-4 text-accent" />
                  <h3 className="font-display text-sm font-bold text-content-primary">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-content-secondary">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
