#!/usr/bin/env node
/**
 * Generates public/resume/Muhammad_Tatheer_CV.pdf from scripts/resume/resume.html
 * using the locally installed Chrome/Edge binary — no extra dependencies.
 *
 * Usage: node scripts/generate-resume.cjs
 */
const { spawnSync } = require('node:child_process')
const { existsSync, copyFileSync, statSync, mkdirSync } = require('node:fs')
const { join, resolve } = require('node:path')

const root = resolve(__dirname, '..')
const source = join(root, 'scripts', 'resume', 'resume.html')
const outDir = join(root, 'public', 'resume')
const target = join(outDir, 'Muhammad_Tatheer_CV.pdf')

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean)

const browser = CANDIDATES.find((p) => existsSync(p))

if (!browser) {
  console.error('No Chrome or Edge binary found. Set CHROME_PATH and try again.')
  process.exit(1)
}

if (!existsSync(source)) {
  console.error(`Missing source: ${source}`)
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })

const url = `file:///${source.replace(/\\/g, '/')}`

const result = spawnSync(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--no-sandbox',
    `--print-to-pdf=${target}`,
    '--virtual-time-budget=3000',
    url,
  ],
  { stdio: 'inherit' }
)

if (result.status !== 0) {
  console.error(`Browser exited with code ${result.status}`)
  process.exit(result.status ?? 1)
}

if (!existsSync(target)) {
  console.error('PDF was not created.')
  process.exit(1)
}

copyFileSync(target, join(outDir, 'muhammad-tatheer-resume.pdf'))

const { size } = statSync(target)
console.log(`Wrote ${target} (${(size / 1024).toFixed(1)} KB)`)
