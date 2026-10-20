'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  Code2,
  Coffee,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { SITE, type ProfileImageSrc } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { TypingAnimation } from '@/components/shared/TypingAnimation'
import { AnimatedName } from '@/components/shared/AnimatedName'

const HERO_ROLES = [
  'Full Stack Developer',
  'Next.js & React Engineer',
  'AI Product Builder',
  'IoT & Signal Processing',
] as const

const HIGHLIGHTS = [
  { label: 'Public repositories', value: '11' },
  { label: 'GitHub stars', value: '40' },
  { label: 'Core stack', value: 'React / Next.js / Python' },
]

export function HeroSection() {
  const [portraitSrc, setPortraitSrc] = React.useState<ProfileImageSrc>(SITE.profileImage)

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center overflow-hidden pt-20 pb-16">
      {/* Ambient dark-graphite backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -left-48 -top-32 h-[30rem] w-[30rem] rounded-full aurora animate-aurora opacity-80" />
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[26rem] w-[26rem] rounded-full aurora animate-aurora opacity-60 [animation-delay:-8s]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full aurora animate-aurora opacity-40 [animation-delay:-14s]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-shimmer bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden />

      <div className="mx-auto w-full max-w-container px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Intro & Details */}
          <div className="lg:col-span-7">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-surface px-3.5 py-1 text-xs font-medium text-content-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for Full-Time & Freelance Projects
            </motion.div>

            {/* Main Heading & Letter-by-Letter Animated Name (Reduced Size) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5"
            >
              <p className="font-mono text-xs tracking-widest text-content-secondary uppercase font-medium">
                Welcome to my portfolio
              </p>
              
              <div className="mt-2">
                <span className="block text-base sm:text-lg font-semibold text-content-secondary">
                  Hi, I am
                </span>
                <div className="mt-0.5 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-content-primary">
                  <AnimatedName />
                </div>
              </div>
            </motion.div>

            {/* Dynamic Typing Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 flex items-center gap-2 text-lg sm:text-xl font-semibold"
            >
              <span className="text-content-secondary font-medium">I am a</span>
              <span className="text-content-primary font-mono font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                <TypingAnimation words={HERO_ROLES} />
              </span>
            </motion.div>

            {/* Description (White, Italic, Medium-sized with Humanized Warmth) */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-content-primary"
            >
              Hey there! I am a full-stack developer who genuinely enjoys turning ideas into clean, fast, and reliable software. Whether I&apos;m crafting a seamless React interface, wiring up a Node or Python API, or connecting intelligent automation tools, I care about building things that real people find useful.
            </motion.p>

            {/* Human Developer Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 flex flex-wrap items-center gap-2 text-xs text-content-primary"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-surface px-3 py-1">
                <Coffee className="h-3.5 w-3.5 text-accent" />
                Powered by chai &amp; curiosity
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-surface px-3 py-1">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                Based in Islamabad · Remote friendly
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-surface px-3 py-1">
                <Wrench className="h-3.5 w-3.5 text-accent" />
                Real products &gt; flashy buzzwords
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5"
            >
              <Button
                asChild
                size="lg"
                variant="primary"
                className="w-full shadow-lg shadow-indigo-500/20 sm:w-auto"
              >
                <a href="#projects">
                  View Projects <ArrowDown className="h-4 w-4 ml-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href="#contact">
                  <Mail className="h-4 w-4 mr-1.5" /> Contact Me
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto">
                <a href="/resume/Muhammad_Tatheer_CV.pdf" target="_blank" rel="noreferrer">
                  <Download className="h-4 w-4 mr-1.5" /> CV / Resume
                </a>
              </Button>
              <div className="flex items-center justify-center gap-2 sm:justify-start sm:border-l sm:border-line sm:pl-3">
                <a
                  href={SITE.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg-surface text-content-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={SITE.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg-surface text-content-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Live highlights strip */}
            <motion.dl
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-8 grid max-w-lg grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3"
            >
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="bg-bg-surface px-4 py-3 transition-colors hover:bg-bg-elevated">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-content-muted">
                    {h.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-content-primary">{h.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right Column: 2D Photo Frame & Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex justify-center lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px]">
              
              {/* Outer Glow Halo */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent/30 via-sky-400/20 to-purple-500/30 blur-2xl opacity-70" />
              
              {/* Card Container */}
              <div className="relative rounded-3xl border border-line/80 bg-bg-surface p-3 shadow-2xl backdrop-blur-md">
                
                {/* Profile Image Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-bg-elevated border border-line/50">
                  <Image
                    src={portraitSrc}
                    alt="Muhammad Tatheer - Full Stack Developer"
                    fill
                    priority
                    sizes="(min-width: 1024px) 380px, 90vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    onError={() => setPortraitSrc(SITE.profileFallbackImage)}
                  />
                  
                  {/* Subtle Gradient Overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg-surface/90 to-transparent" />
                  
                  {/* Bottom Image Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-black/75 px-3 py-2 backdrop-blur-md border border-white/20">
                    <div>
                      <p className="text-xs font-bold text-white">Muhammad Tatheer</p>
                      <p className="text-[11px] text-white/90">Full Stack & AI Engineer</p>
                    </div>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                  </div>
                </div>

                {/* Floating 2D Badge Top Right */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -top-3 -right-3 z-20 flex items-center gap-2 rounded-xl border border-line bg-bg-elevated/95 px-3 py-2 text-xs font-semibold text-content-primary shadow-lg backdrop-blur-md"
                >
                  <Code2 className="h-4 w-4 text-accent" /> Full Stack Focus
                </motion.div>

                {/* Floating 2D Badge Bottom Left */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 }}
                  className="absolute -bottom-3 -left-3 z-20 flex items-center gap-2 rounded-xl border border-line bg-bg-elevated/95 px-3 py-2 text-xs font-semibold text-content-primary shadow-lg backdrop-blur-md"
                >
                  <Sparkles className="h-4 w-4 text-accent" /> AI &amp; Automation
                </motion.div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        aria-label="Scroll down to About section"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-content-muted transition-colors hover:text-accent"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-xs"
        >
          <span className="text-[11px] font-mono tracking-wider">SCROLL</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </a>
    </section>
  )
}
