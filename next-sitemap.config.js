module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tatheer583.github.io/portfolio',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
  },
}
