export interface ExperienceEntry {
  period: string
  title: string
  description: string
  technologies: string[]
}

/**
 * Timeline reconstructed from the real commit and release history in the
 * public repositories — the first repository was created in April 2026 and
 * the portfolio account itself dates from October 2025.
 */
export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: '2026 — Present',
    title: 'Full Stack & AI Product Developer',
    description:
      'Shipping complete products end-to-end: a Next.js portfolio with real GitHub data and dual themes, an open-source YouTube automation suite in TypeScript, a Flutter service app with offline Urdu and English support, and a Kotlin accessibility app for deaf children.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Flutter', 'Kotlin', 'FastAPI', 'MongoDB'],
  },
  {
    period: 'Late 2025 — 2026',
    title: 'Foundations & First Releases',
    description:
      'Started the journey with HTML, CSS, JavaScript, React and Python, then moved into applied AI — local LLMs through Ollama, computer vision with MediaPipe, and IoT sensing on ESP32 and Arduino hardware.',
    technologies: ['JavaScript', 'React', 'Python', 'Git', 'MediaPipe', 'Arduino'],
  },
  {
    period: '2025',
    title: 'Began the Journey — Foundations',
    description:
      'Began focused learning in modern web development and software engineering: HTML/CSS/JS, React, Python, Git, and the core patterns behind full-stack products.',
    technologies: ['JavaScript', 'React', 'Python', 'HTML/CSS', 'Git'],
  },
]

export interface EducationEntry {
  institution: string
  degree: string
  period: string
  note: string
}

export const EDUCATION: EducationEntry = {
  institution: 'NUTECH University',
  degree: 'Bachelor of Science',
  period: '2025 — 2029',
  note: 'Focused on computing, intelligent systems, and applied engineering.',
}
