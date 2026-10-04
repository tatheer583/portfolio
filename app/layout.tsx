import type { Metadata } from 'next'
import './globals.css'
import './tour.css'
import './studio.css'
import './studio-navigation.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { SITE } from '@/lib/constants'
import SiteChrome from '@/components/corridor/SiteChrome'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: SITE.title,
    template: '%s | Muhammad Tatheer',
  },
  description:
    'Muhammad Tatheer is a Full Stack Developer who builds polished web products, with AI and security depth.',
  keywords: [
    'Muhammad Tatheer',
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'AI Engineer',
    'AI Agent Developer',
    'Computer Vision Developer',
    'Junior Security Analyst',
    'Web Penetration Testing',
    'Burp Suite',
    'Machine Learning Engineer',
    'RAG Systems',
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
  knowsAbout: [
    'Full Stack Development',
    'React',
    'Next.js',
    'Node.js',
    'Artificial Intelligence',
    'Machine Learning',
    'Computer Vision',
    'Web Application Security',
    'Penetration Testing',
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
