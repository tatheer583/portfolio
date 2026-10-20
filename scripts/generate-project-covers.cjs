/**
 * Generates branded project cover images for any project that does not yet
 * have a real screenshot in /public/images/projects.
 *
 * Usage: node scripts/generate-project-covers.cjs
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'projects')

/** Projects that already ship a genuine screenshot are skipped. */
const TARGETS = [
  {
    file: 'channel-automation-ai.jpg',
    title: 'ChannelAI',
    subtitle: 'Open-source channel automation',
    repo: 'github.com/tatheer583/channel-automation-ai',
    accent: '#f97316',
    accent2: '#38bdf8',
    tags: ['TypeScript', 'React', 'YouTube Data API', 'MediaRecorder', 'MIT License'],
  },
]

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function buildSvg(t) {
  const width = 1600
  const height = 900
  const tagWidths = t.tags.map((tag) => 26 + tag.length * 12.5)
  const totalTagWidth = tagWidths.reduce((a, b) => a + b, 0) + (t.tags.length - 1) * 14
  let tagX = 96
  const tags = t.tags
    .map((tag, i) => {
      const w = tagWidths[i]
      const rect = `<rect x="${tagX}" y="672" width="${w}" height="46" rx="23" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.16)" stroke-width="1.5"/>`
      const text = `<text x="${tagX + w / 2}" y="702" text-anchor="middle" font-family="Segoe UI, Inter, sans-serif" font-size="22" font-weight="600" fill="#c5cad3">${esc(tag)}</text>`
      tagX += w + 14
      return rect + text
    })
    .join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1c20"/>
      <stop offset="55%" stop-color="#20242b"/>
      <stop offset="100%" stop-color="#171a1e"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.18" cy="0.2" r="0.65">
      <stop offset="0%" stop-color="${t.accent}" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="${t.accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.86" cy="0.82" r="0.6">
      <stop offset="0%" stop-color="${t.accent2}" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="${t.accent2}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.055)" stroke-width="1.5"/>
    </pattern>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <rect width="${width}" height="${height}" fill="url(#glowA)"/>
  <rect width="${width}" height="${height}" fill="url(#glowB)"/>

  <rect x="0" y="0" width="${width}" height="8" fill="url(#accentBar)"/>
  <defs>
    <linearGradient id="accentBar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${t.accent}"/>
      <stop offset="100%" stop-color="${t.accent2}"/>
    </linearGradient>
  </defs>

  <text x="96" y="150" font-family="Consolas, monospace" font-size="26" font-weight="600" fill="${t.accent}" letter-spacing="4">${esc(t.repo.toUpperCase())}</text>

  <text x="96" y="286" font-family="Segoe UI, Inter, sans-serif" font-size="116" font-weight="800" fill="#f2f4f7" letter-spacing="-4">${esc(t.title)}</text>
  <text x="96" y="372" font-family="Segoe UI, Inter, sans-serif" font-size="46" font-weight="500" fill="#939aa5">${esc(t.subtitle)}</text>

  <rect x="96" y="452" width="120" height="6" rx="3" fill="${t.accent}"/>
  <rect x="228" y="452" width="60" height="6" rx="3" fill="${t.accent2}" opacity="0.6"/>

  ${tags}

  <text x="${width - 96}" y="${height - 64}" text-anchor="end" font-family="Segoe UI, Inter, sans-serif" font-size="26" font-weight="600" fill="rgba(255,255,255,0.32)" letter-spacing="3">M TATHEER</text>
</svg>`
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  for (const target of TARGETS) {
    const outPath = path.join(OUT_DIR, target.file)
    if (fs.existsSync(outPath)) {
      console.log(`skip (exists): ${target.file}`)
      continue
    }
    const svg = buildSvg(target)
    await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile(outPath)
    console.log(`wrote: ${target.file}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
