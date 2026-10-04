import { PROJECTS } from '@/data/projects'
import { EXPERIENCE, EDUCATION } from '@/data/experience'
import { SKILLS } from '@/data/skills'
import { SITE } from '@/lib/constants'

export const GALLERY_PROJECTS = PROJECTS.map(project => ({
  id: project.id,
  title: project.title.toUpperCase(),
  front: `/reference/portfolio/project-${project.id}.webp`,
  painted: `/reference/portfolio/project-${project.id}-painted.webp`,
  url: `/projects/${project.slug}`,
  description: project.description,
  techStack: project.tech.slice(0, 4).map(tech => `/reference/portfolio/tech-${tech.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.webp`),
}))

const projectItems = PROJECTS.map(project => ({ label: project.title, date: project.categoryLabel, image: project.image, url: `/projects/${project.slug}` }))
export const STORY_COLLECTIONS = {
  featured: { id: 'featured-projects', layout: 'certificate_grid', title: 'Featured projects', items: projectItems.filter((_, index) => PROJECTS[index].featured), platformConfig: { label: 'PROJECTS', color: '#25231f', icon: '↗' } },
  sotd: { id: 'all-projects', layout: 'certificate_grid', title: 'My work', items: projectItems, platformConfig: { label: 'PROJECTS', color: '#25231f', icon: '↗' } },
  sotm: { id: 'my-journey', layout: 'certificate_grid', title: 'Experience & education', items: [
    { label: `${EDUCATION.institution} · ${EDUCATION.degree}`, date: EDUCATION.period, image: '/reference/portfolio/education.webp', url: SITE.resumeUrl },
    ...EXPERIENCE.map((entry, index) => ({ label: entry.title, date: entry.period, image: `/reference/portfolio/experience-${index}.webp`, url: SITE.resumeUrl })),
  ], platformConfig: { label: 'JOURNEY', color: '#25231f', icon: '✎' } },
  soty: { id: 'my-skills', layout: 'certificate_grid', title: 'Technologies I work with', items: SKILLS.map((group, index) => ({ label: group.label, date: group.skills.map(item => item.name).join(' · '), image: `/reference/portfolio/skills-${index}.webp`, url: SITE.githubUrl })), platformConfig: { label: 'SKILLS', color: '#25231f', icon: '</>' } },
}
