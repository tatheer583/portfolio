const isGithubPages = process.env.PORTFOLIO_GITHUB_PAGES === '1'

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubPages
    ? {
        output: 'export',
        basePath: '/portfolio',
        trailingSlash: true,
      }
    : {}),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    ...(isGithubPages ? { unoptimized: true } : {}),
  },
  compress: true,
  ...(!isGithubPages
    ? {
        async headers() {
          return [
            {
              source: '/(.*)',
              headers: [
                { key: 'X-Frame-Options', value: 'DENY' },
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
              ],
            },
          ]
        },
      }
    : {}),
}

module.exports = nextConfig
