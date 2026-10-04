'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Github } from 'lucide-react'
import { PROJECTS } from '@/data/projects'

export default function ProjectDetails({ index }: { index: number }) {
  const project = PROJECTS[index]
  return <article className="studio-project-detail">
    <p className="corridor-eyebrow">PROJECT {String(index + 1).padStart(2, '0')} / {PROJECTS.length}</p>
    <h1 id="room-title">{project.title}</h1>
    <p className="studio-project-category">{project.categoryLabel}</p>
    <div className="studio-project-image"><Image src={project.image} alt={project.title + ' project artwork'} fill sizes="(max-width: 700px) 90vw, 620px" /></div>
    <p>{project.longDescription || project.description}</p>
    <div className="studio-project-tech" aria-label="Technologies">{project.tech.map(tech => <span key={tech}>{tech}</span>)}</div>
    {project.features && <><h2>Inside the project</h2><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></>}
    {project.challenges && <><h2>The challenge</h2><p>{project.challenges}</p></>}
    {project.results && <><h2>The outcome</h2><p>{project.results}</p></>}
    <div className="studio-project-links">
      <Link className="tour-primary" href={'/projects/' + project.slug}>Full case study <ArrowUpRight size={15} /></Link>
      {project.links.github && <a className="tour-secondary" href={project.links.github} target="_blank" rel="noreferrer">GitHub <Github size={15} /></a>}
      {project.links.demo && <a className="tour-secondary" href={project.links.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} /></a>}
    </div>
  </article>
}
