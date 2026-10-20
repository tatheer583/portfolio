import type { Metadata } from 'next'
import './globals.css'
import './tour.css'
import './studio.css'
import './studio-navigation.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { SITE } from '@/lib/constants'
import SiteChrome from '@/components/layout/SiteChrome'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: SITE.title,
    template: '%s | Muhammad Tatheer',
  },
  description:
    'Muhammad Tatheer is a Full Stack Developer in Islamabad, Pakistan — building web, mobile, AI and IoT products with React, Next.js, Python, Flutter and Kotlin.',
  keywords: [
    'Muhammad Tatheer',
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'TypeScript Developer',
    'Python Developer',
    'FastAPI Developer',
    'Flutter Developer',
    'Kotlin Developer',
    'AI Engineer',
    'Local LLM',
    'Ollama',
    'MediaPipe',
    'Computer Vision',
    'IoT Developer',
    'ESP32',
    'WiFi Sensing',
    'Cybersecurity',
    'Islamabad',
    'Pakistan',
  ],
  authors: [{ name: 'Muhammad Tatheer' }],
  creator: 'Muhammad Tatheer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.siteUrl,
    title: SITE.title,
    description: SITE.tagline,
    siteName: 'Muhammad Tatheer Portfolio',
    images: [{ url: '/og-image.png.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.tagline,
    images: ['/og-image.png.svg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.siteUrl },
  icons: { icon: '/icon.svg' },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Tatheer',
  email: SITE.email,
  telephone: SITE.phone,
  url: SITE.siteUrl,
  jobTitle: 'Full Stack Developer',
  description: SITE.tagline,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'PK',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'NUTECH University',
  },
  knowsAbout: [
    'Full Stack Development',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'FastAPI',
    'Flutter',
    'Kotlin',
    'Android Development',
    'Artificial Intelligence',
    'Local Large Language Models',
    'Computer Vision',
    'MediaPipe',
    'Internet of Things',
    'ESP32',
    'WiFi Sensing',
    'Application Security',
  ],
  sameAs: [SITE.githubUrl, SITE.linkedinUrl],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  )
}
