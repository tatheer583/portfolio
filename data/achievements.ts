export interface Achievement {
  icon: string
  title: string
  description: string
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    icon: 'Trophy',
    title: '11 Public Repositories',
    description:
      'Eleven complete, public codebases — each one a working product with its own README, licence and deployment path.',
  },
  {
    icon: 'Star',
    title: '40 GitHub Stars',
    description:
      '40 stars and 2 forks across 11 public repositories, earned by shipping rather than by marketing.',
  },
  {
    icon: 'Award',
    title: 'Irssa — Accessibility First',
    description:
      'Built an offline Pakistan Sign Language learning app for deaf children, with a hand-recognition model trained on independent signers.',
  },
  {
    icon: 'Rocket',
    title: 'ChannelAI — Free & Open Source',
    description:
      'Released a complete YouTube automation suite under MIT that renders video, writes captions and schedules uploads with no subscription.',
  },
  {
    icon: 'Shield',
    title: 'CyberSathi — Offline Security',
    description:
      'Built a scam-detection tool that runs a local LLM plus deterministic rules, keeping sensitive scans on the device.',
  },
  {
    icon: 'Cpu',
    title: 'WiFi Sensing Without Cameras',
    description:
      'Turned a laptop WiFi adapter into a motion sensor with multi-link fusion, spectral analysis and an ESP32 CSI research pipeline.',
  },
]
