'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, Sparkles, Terminal, Code2 } from 'lucide-react'
import { SITE, type ProfileImageSrc } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { TypingAnimation } from '@/components/shared/TypingAnimation'
import { AnimatedName } from '@/components/shared/AnimatedName'

const HERO_ROLES = [
  'Full Stack Developer',
  'Next.js & React Specialist',
  'AI & Intelligent Agent Builder',
  'Backend & API Architect',
] as const

const HIGHLIGHTS = [
  { label: 'Projects Built', value: '11+' },
  { label: 'Core Stack', value: 'React / Next.js / Node' },
  { label: 'Specialization', value: 'Full Stack & AI' },
]

export function HeroSection() {
  const [portraitSrc, setPortraitSrc] = React.useState<ProfileImageSrc>(SITE.profileImage)

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center overflow-hidden pt-20 pb-16">
      {/* 2D Background Gradients & Grid Pattern (Pure CSS, No 3D) */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="mx-auto w-full max-w-container px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Intro & Details */}
          <div className="lg:col-span-7">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-xs font-medium text-white"
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
              <p className="font-mono text-xs tracking-widest text-white/80 uppercase font-medium">
                Welcome to my portfolio
              </p>
              
              <div className="mt-2">
                <span className="block text-base sm:text-lg font-semibold text-white/90">
                  Hi, I am
                </span>
                <div className="mt-0.5 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
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
              <span className="text-white/90 font-medium italic">I am a</span>
              <span className="text-white font-mono font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                <TypingAnimation words={HERO_ROLES} />
              </span>
            </motion.div>

            {/* Description (White, Italic, Medium-sized with Humanized Warmth) */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 max-w-2xl text-base font-medium italic leading-relaxed text-white"
            >
              Hey there! I am a full-stack developer who genuinely enjoys turning ideas into clean, fast, and reliable software. Whether I&apos;m crafting a seamless React interface, wiring up a Node or Python API, or connecting intelligent automation tools, I care about building things that real people find useful.
            </motion.p>

            {/* Human Developer Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 italic">
                ☕ Powered by chai & curiosity
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 italic">
                🇵🇰 Based in Pakistan · Remote friendly
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 italic">
                🛠️ Real products &gt; flashy buzzwords
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <Button asChild size="lg" variant="primary" className="shadow-lg shadow-indigo-500/20">
                <a href="#projects">
                  View Projects <ArrowDown className="h-4 w-4 ml-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contact">
                  <Mail className="h-4 w-4 mr-1.5" /> Contact Me
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="/resume/Muhammad_Tatheer_CV.pdf" target="_blank" rel="noreferrer">
                  <Download className="h-4 w-4 mr-1.5" /> CV / Resume
                </a>
              </Button>
              <div className="flex items-center gap-2 border-l border-line pl-3">
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
              <div className="relative overflow-hidden rounded-3xl border border-line/80 bg-bg-surface p-3 shadow-2xl backdrop-blur-md">
                
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
                      <p className="text-[11px] italic text-white/90">Full Stack & AI Engineer</p>
                    </div>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                  </div>
                </div>

                {/* Floating 2D Badge Top Right */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -top-3 -right-3 flex items-center gap-2 rounded-xl border border-white/20 bg-black/85 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md"
                >
                  <Code2 className="h-4 w-4 text-white" /> Full Stack Focus
                </motion.div>

                {/* Floating 2D Badge Bottom Left */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 }}
                  className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-xl border border-white/20 bg-black/85 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md"
                >
                  <Sparkles className="h-4 w-4 text-white" /> AI & Automation
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
