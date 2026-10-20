'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

/**
 * Every entry is a technology that actually appears in one of the public
 * repositories under github.com/tatheer583.
 */
const STACK: { name: string; group: string }[] = [
  { name: 'React', group: 'Frontend' },
  { name: 'Next.js', group: 'Frontend' },
  { name: 'TypeScript', group: 'Frontend' },
  { name: 'JavaScript', group: 'Frontend' },
  { name: 'Tailwind CSS', group: 'Frontend' },
  { name: 'Framer Motion', group: 'Frontend' },
  { name: 'Three.js', group: 'Frontend' },
  { name: 'React Three Fiber', group: 'Frontend' },
  { name: 'GSAP', group: 'Frontend' },
  { name: 'D3.js', group: 'Frontend' },
  { name: 'Recharts', group: 'Frontend' },
  { name: 'Node.js', group: 'Backend' },
  { name: 'Express.js', group: 'Backend' },
  { name: 'FastAPI', group: 'Backend' },
  { name: 'Flask', group: 'Backend' },
  { name: 'REST APIs', group: 'Backend' },
  { name: 'WebSockets', group: 'Backend' },
  { name: 'JWT Auth', group: 'Backend' },
  { name: 'MongoDB', group: 'Data' },
  { name: 'SQLite', group: 'Data' },
  { name: 'SQLAlchemy', group: 'Data' },
  { name: 'Python', group: 'Data' },
  { name: 'NumPy', group: 'Data' },
  { name: 'Ollama', group: 'AI & ML' },
  { name: 'Gemma', group: 'AI & ML' },
  { name: 'OpenAI API', group: 'AI & ML' },
  { name: 'MediaPipe', group: 'AI & ML' },
  { name: 'Random Forest', group: 'AI & ML' },
  { name: 'Flutter', group: 'Mobile' },
  { name: 'Dart', group: 'Mobile' },
  { name: 'Kotlin', group: 'Mobile' },
  { name: 'Jetpack Compose', group: 'Mobile' },
  { name: 'Tauri', group: 'Desktop' },
  { name: 'Rust', group: 'Desktop' },
  { name: 'ESP32', group: 'IoT' },
  { name: 'Arduino', group: 'IoT' },
  { name: 'WiFi CSI', group: 'IoT' },
  { name: 'Docker', group: 'DevOps' },
  { name: 'GitHub Actions', group: 'DevOps' },
  { name: 'Vercel', group: 'DevOps' },
  { name: 'GitHub Pages', group: 'DevOps' },
]

const GROUP_COLOR: Record<string, string> = {
  Frontend: 'text-accent',
  Backend: 'text-accent2',
  Data: 'text-accent3',
  'AI & ML': 'text-accent-light',
  Mobile: 'text-accent2',
  Desktop: 'text-accent3',
  IoT: 'text-accent',
  DevOps: 'text-accent-light',
}

export function TechMarquee() {
  // Duplicated so the -50% translate loops seamlessly.
  const rows = [
    { items: STACK, speed: 'animate-marquee' },
    { items: [...STACK].reverse(), speed: 'animate-marquee-slow' },
  ]

  return (
    <section
      aria-label="Technologies I build with"
      className="relative border-y border-line bg-bg-surface/40 py-8"
    >
      <div className="mx-auto mb-6 flex max-w-container items-center gap-4 px-6">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-content-muted">
          The stack I ship with
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-line via-line to-transparent" aria-hidden />
      </div>

      <div className="marquee-mask space-y-3 overflow-hidden">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-max"
            style={{ animationDirection: rowIndex % 2 === 0 ? 'normal' : 'reverse' }}
          >
            <div className={`flex shrink-0 ${row.speed}`}>
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={copy === 1}>
                  {row.items.map((tech) => (
                    <li
                      key={`${rowIndex}-${copy}-${tech.name}`}
                      className="group flex shrink-0 items-center gap-2 rounded-full border border-line bg-bg-surface px-4 py-2 transition-all duration-300 hover:border-accent/50 hover:bg-bg-elevated"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full bg-current ${
                          GROUP_COLOR[tech.group] ?? 'text-accent'
                        }`}
                      />
                      <span className="text-sm font-medium text-content-primary">{tech.name}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-content-muted">
                        {tech.group}
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" aria-hidden />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto mt-8 max-w-container px-6"
      >
        <p className="text-center text-sm text-content-muted">
          Every one of these appears in a shipped project —{' '}
          <a
            href="https://github.com/tatheer583?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent underline-offset-4 transition-colors hover:text-accent-light hover:underline"
          >
            browse the repositories
          </a>
          .
        </p>
      </motion.div>
    </section>
  )
}
