export interface PortfolioCertificate {
  id: string
  title: string
  issuer: string
  url: string
  image?: string // Optional local image in /public; PDFs can use just their URL.
  imageAspect?: number
}

// Add only certificates and verification URLs supplied by Tatheer.
export const CERTIFICATES: PortfolioCertificate[] = [
  {
    id: 'generative-ai-cpe',
    title: 'What Is Generative AI? — CPE',
    issuer: 'LinkedIn Learning · October 2026',
    url: 'https://drive.google.com/file/d/14c9URZJFtK5KK2dYQg9MN8YDG913rBAg/view',
    image: '/certificates/14c9URZJFtK5KK2dYQg9MN8YDG913rBAg.webp',
    imageAspect: 1600 / 1237,
  },
  {
    id: 'generative-ai-completion',
    title: 'What Is Generative AI?',
    issuer: 'LinkedIn Learning · October 2026',
    url: 'https://drive.google.com/file/d/1sqcXrGURkdKlmJQhWijIxUK4XPov6s4A/view',
    image: '/certificates/1sqcXrGURkdKlmJQhWijIxUK4XPov6s4A.webp',
    imageAspect: 1600 / 1237,
  },
  {
    id: 'league-of-launchers',
    title: 'League of Launchers — Participation',
    issuer: 'Change Mechanics · September 2026',
    url: 'https://drive.google.com/file/d/12RhVAh7ZR98i79LCs6QgM3NLfxykwH0e/view',
    image: '/certificates/12RhVAh7ZR98i79LCs6QgM3NLfxykwH0e.webp',
    imageAspect: 1600 / 1132,
  },
]
