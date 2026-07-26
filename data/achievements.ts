export interface Achievement {
  icon: string
  title: string
  description: string
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    icon: 'Trophy',
    title: 'AI Product Builder',
    description: 'Shipped 5+ production-grade AI systems across vision, agents, and security.',
  },
  {
    icon: 'Award',
    title: 'Open Source Contributor',
    description: 'Active on GitHub with public repositories and live project showcases.',
  },
  {
    icon: 'Star',
    title: 'Top Project — Jarvis',
    description: 'Voice-powered AI assistant recognised as a flagship personal project.',
  },
  {
    icon: 'Shield',
    title: 'Cyber Sathi',
    description: 'Built an AI security companion for real-time phishing and malware detection.',
  },
  {
    icon: 'Cpu',
    title: 'Computer Vision',
    description: 'Delivered autonomous drone perception and real-time object detection.',
  },
  {
    icon: 'Rocket',
    title: 'End-to-End Ownership',
    description: 'Owns the full stack from model training to deployment and UI.',
  },
]
