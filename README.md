# Muhammad Tatheer — Portfolio

A modern, animated portfolio for **Muhammad Tatheer**, a full stack developer based in Islamabad, Pakistan.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion, with a dark-graphite
default theme and a fully working light theme.

Every project, star count, licence and language shown on the site is sourced from the public
repositories at [github.com/tatheer583](https://github.com/tatheer583?tab=repositories).

---

## Highlights

- **Dark and light themes** — real, independent palettes driven by CSS custom properties, with a
  no-flash theme toggle and system-preference support.
- **Dark graphite aesthetic** — layered aurora gradients, a subtle grid, animated marquees, shimmer
  borders and scroll-reveal motion, all respecting `prefers-reduced-motion`.
- **11 real projects** — each card maps 1:1 to a public repository with its language, stars, forks,
  licence, status and live demo where one exists.
- **Live GitHub data** — contribution calendar, total stars, followers and language breakdown are
  fetched from the GitHub API and cached, with a typed local fallback so the page never breaks.
- **Interactive skill graph** — a D3 force-directed graph of how the stack connects; drag any node.
- **Full case studies** — a dedicated page per project with features, challenges, results, topics and
  repository metadata.
- **Accessible by default** — semantic sections, visible focus rings, keyboard-navigable UI,
  skip-friendly anchors and AA-contrast text in both themes.

## Sections

`Hero → Introduction → Tech stack marquee → About → Skills → Projects → GitHub activity →
Certificates → Experience → Education → Achievements → Interests → Human side → FAQ → Contact`

## Run locally

```powershell
npm ci
npm run dev
```

Open <http://localhost:3000>.

Production preview:

```powershell
npm run build
npm run start
```

## Checks

```powershell
npm run lint
npm run type-check
npm run build
```

## Project structure

```
app/
  page.tsx                 Landing page composition
  projects/[slug]/         Generated case-study pages
  api/contact/             Resend-backed contact endpoint
  api/github/              Cached GitHub statistics
  globals.css              Theme tokens, base styles, motion utilities
components/
  layout/                  Navigation, Footer, Section wrapper
  sections/                 One file per landing-page section
  shared/                  SectionHeader, ProjectCard, counters, mockups
  features/                Skill graph, search modal
  ui/                      Button, Card, Badge, Tabs, Dialog primitives
data/
  projects.ts              The 11 real repositories + aggregate stats
  skills.ts                Skill categories and the graph nodes/links
  experience.ts            Experience timeline + education
  achievements.ts          Verifiable milestones
  certificates.ts          Certificates with local previews
lib/
  constants.ts             Site/profile metadata and GitHub profile facts
  github.ts                GitHub REST + GraphQL client
  kv.ts                    Optional cache layer
```

## Editing content

- `data/projects.ts` — project entries. Keep `slug` aligned with the GitHub repository name so the
  generated case-study route and the `RealProjectMockup` visuals stay matched.
- `lib/constants.ts` — name, role, contact details, social links and the `GITHUB_PROFILE` snapshot.
- `data/skills.ts` — skill levels plus the `SKILL_GRAPH_NODES` / `SKILL_GRAPH_LINKS` graph.
- `data/experience.ts` — timeline entries and the `EDUCATION` record.
- `data/certificates.ts` — certificate titles, issuers and verification links.
- `app/globals.css` — the two palettes live in `:root`/`.dark` and `.light`. All component colours
  reference these tokens, so adding a third theme only requires another variable block.

### Adding a project

1. Add an entry to `PROJECTS` in `data/projects.ts` with `slug`, tech, features and links.
2. Optionally add a bespoke preview in `components/shared/RealProjectMockup.tsx`; otherwise the
   generic terminal mockup is used.
3. Drop a cover image in `public/images/projects/` (or generate one with
   `node scripts/generate-project-covers.cjs`).

### Updating the résumé

The printable CV lives at `scripts/resume/resume.html` and is rendered to
`public/resume/Muhammad_Tatheer_CV.pdf` with headless Chrome or Edge:

```powershell
node scripts/generate-resume.cjs
```

Set `CHROME_PATH` if your browser is installed somewhere unusual. The script also copies the PDF to
`public/resume/muhammad-tatheer-resume.pdf`, so both download paths stay identical.

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Enables the contact form email delivery |
| `CONTACT_EMAIL` | Destination address for contact submissions |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used by metadata and the sitemap |
| `NEXT_PUBLIC_GITHUB_USERNAME` | GitHub handle, defaults to `tatheer583` |
| `GITHUB_TOKEN` | Optional, raises the GitHub API rate limit and enables pinned repos |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Optional Vercel KV cache for GitHub data |

Without `RESEND_API_KEY` the contact form reports that delivery is unavailable and offers the direct
email and WhatsApp links instead.

## Deployment

**Vercel (recommended)** — deploy the repository as-is. The contact API and live GitHub statistics
work because the server runtime is available.

**GitHub Pages** — pushing to `main` runs `.github/workflows/deploy-pages.yml`, which builds a static
export with `basePath=/portfolio`, removes the server-only API routes, and publishes to
<https://tatheer583.github.io/portfolio/>. On that build the contact form falls back to direct links
and the GitHub section uses its bundled fallback data.

## Third-party notes

`components/corridor/` and `components/sketch-studio/` contain earlier WebGL tour experiments that are
**not mounted** by the current landing page. They are retained for reference only. The sketch-studio
code is adapted from [Saksham-dev-del/Portfolio](https://github.com/Saksham-dev-del/Portfolio) (MIT);
see `docs/third-party/reference-portfolio.md`.
