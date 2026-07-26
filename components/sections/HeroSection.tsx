'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Github, ShieldCheck, Zap } from 'lucide-react'
import { SITE, type ProfileImageSrc } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { TypingAnimation } from '@/components/shared/TypingAnimation'

const ParticleBackground = dynamic(
  () => import('@/components/features/ParticleBackground/ParticleBackground'),
  { ssr: false }
)

export function HeroSection() {
  const [portraitSrc, setPortraitSrc] = React.useState<ProfileImageSrc>(SITE.profileImage)

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <ParticleBackground />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(108,99,255,0.18),transparent_45%),radial-gradient(ellipse_at_80%_70%,rgba(34,211,238,0.08),transparent_40%)]" />

      <div className="mx-auto grid w-full max-w-container grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Open to roles, freelance, and security consulting
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-extrabold tracking-tight text-content-primary md:text-6xl"
          >
            Muhammad
            <br />
            Tatheer
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 min-h-10 font-display text-2xl font-bold text-gradient md:text-3xl"
          >
            <TypingAnimation words={SITE.roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-content-secondary"
          >
            {SITE.tagline} From frontend polish to backend APIs and deployment, I own the full
            product loop — and layer in AI or security when it creates real value.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" variant="primary">
              <a href="#projects">View Projects</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={SITE.resumeUrl}>
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href={SITE.githubUrl} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative hidden lg:block"
        >
          <div className="relative mx-auto aspect-square w-80">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-accent/25"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-cyan-400/60 opacity-30 blur-3xl" />
            <div className="absolute inset-4 overflow-hidden rounded-full border border-accent/30 bg-bg-surface">
              <Image
                src={portraitSrc}
                alt="Muhammad Tatheer"
                fill
                priority
                sizes="320px"
                className="object-cover"
                onError={() => setPortraitSrc(SITE.profileFallbackImage)}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -right-4 top-10 flex items-center gap-2 rounded-full border border-line glass px-3 py-2 text-xs text-content-primary"
            >
              <Zap className="h-4 w-4 text-accent" /> Building AI
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.05 }}
              className="absolute -left-5 bottom-14 flex items-center gap-2 rounded-full border border-line glass px-3 py-2 text-xs text-content-primary"
            >
              <ShieldCheck className="h-4 w-4 text-accent" /> Security research
            </motion.div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-content-muted transition-colors hover:text-accent"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </a>
    </section>
  )
}
