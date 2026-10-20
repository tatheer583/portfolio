export const SITE = {
  name: 'Muhammad Tatheer',
  title: 'Muhammad Tatheer — Full Stack Developer | AI, IoT & Security',
  role: 'Full Stack Developer',
  roles: [
    'Full Stack Developer',
    'Next.js & React Engineer',
    'AI Product Builder',
    'IoT & Signal Processing',
    'Security Analyst',
  ],
  tagline:
    'Full Stack Developer building complete products — modern web apps, mobile apps, AI systems and IoT tools.',
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'tatheer583',
  githubUrl: 'https://github.com/tatheer583',
  githubReposUrl: 'https://github.com/tatheer583?tab=repositories',
  linkedinUrl: 'https://linkedin.com/in/muhammadtatheer',
  email: 'mtatheer1@gmail.com',
  phone: '+92 349 2899537',
  whatsappUrl: 'https://wa.me/923492899537',
  location: 'Islamabad, Pakistan',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tatheer583.github.io/portfolio',
  resumeUrl: '/resume',
  profileImage: '/images/profile.jpg',
  profileFallbackImage: '/images/profile.jpg.svg',
  openTo: ['Full-time roles', 'Freelance', 'Open Source', 'Security consulting'],
} as const

export type ProfileImageSrc = typeof SITE.profileImage | typeof SITE.profileFallbackImage

/**
 * Facts read directly from the GitHub REST API for the `tatheer583` account.
 */
export const GITHUB_PROFILE = {
  login: 'tatheer583',
  name: 'M TATHEER',
  location: 'Islamabad, Pakistan',
  website: 'https://tatheer583.github.io/portfolio/',
  publicRepos: 11,
  followers: 6,
  following: 7,
  memberSince: '2025-10-31',
  totalStars: 40,
} as const

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
  { label: 'Email', href: `mailto:${SITE.email}`, icon: 'email' as const },
]
