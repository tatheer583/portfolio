export const SITE = {
  name: 'Muhammad Tatheer',
  title: 'Muhammad Tatheer - Full Stack Developer | AI & Security',
  role: 'Full Stack Developer',
  roles: [
    'Full Stack Developer',
    'Next.js Engineer',
    'AI Product Builder',
    'Computer Vision Dev',
    'Security Analyst',
  ],
  tagline: 'Full Stack Developer building polished web products — with AI and security depth.',
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'tatheer583',
  githubUrl: 'https://github.com/tatheer583/portfolio',
  linkedinUrl: 'https://linkedin.com/in/muhammadtatheer',
  email: 'mtatheer11@gmail.com',
  phone: '+92 344 8901377',
  whatsappUrl: 'https://wa.me/923448901377',
  location: 'Pakistan',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://muhammadtatheer.com',
  resumeUrl: '/resume',
  profileImage: '/images/profile.jpg',
  profileFallbackImage: '/images/profile.jpg.svg',
  openTo: ['Full-time roles', 'Freelance', 'Open Source', 'Security consulting'],
} as const

export type ProfileImageSrc = typeof SITE.profileImage | typeof SITE.profileFallbackImage

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Experience', href: '#experience' },
  { label: 'Interests', href: '#interests' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
] as const

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: SITE.githubUrl, icon: 'github' as const },
  { label: 'LinkedIn', href: SITE.linkedinUrl, icon: 'linkedin' as const },
]
