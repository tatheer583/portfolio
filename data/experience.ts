export interface ExperienceEntry {
  period: string
  title: string
  description: string
  technologies: string[]
}

/** Journey started ~2 years ago (mid-2024). */
export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: '2025 — Present',
    title: 'Full Stack Developer',
    description:
      'Building and shipping production web apps end-to-end — React/Next.js UIs, Node & FastAPI backends, databases, auth, and deployment — with AI features where they create real product value.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
  },
  {
    period: '2024 — 2025',
    title: 'Full Stack & Applied AI Builder',
    description:
      'Grew from foundations into shipping real projects: travel platforms, IoT dashboards, security tools, and AI assistants — always with a strong full-stack delivery mindset.',
    technologies: ['React', 'FastAPI', 'Python', 'MongoDB', 'LangChain', 'REST APIs'],
  },
  {
    period: 'Mid 2024',
    title: 'Started the Journey — Foundations',
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
  period: '2022 — Present',
  note: 'Focused on computing, intelligent systems, and applied engineering.',
}
