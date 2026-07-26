module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://muhammadtatheer.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
  },
}
