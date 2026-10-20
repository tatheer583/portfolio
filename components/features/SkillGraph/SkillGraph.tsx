'use client'

import * as React from 'react'
import * as d3 from 'd3'
import { SKILL_GRAPH_NODES, SKILL_GRAPH_LINKS } from '@/data/skills'
import { useTheme } from 'next-themes'

interface Node extends d3.SimulationNodeDatum {
  id: string
  group: string
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node
  target: string | Node
}

const GROUP_COLORS: Record<string, string> = {
  core: '#6C63FF',
  frontend: '#3B82F6',
  backend: '#10B981',
  ai: '#F59E0B',
  cv: '#EF4444',
  iot: '#14B8A6',
  mobile: '#8B5CF6',
  security: '#F43F5E',
  devops: '#0EA5E9',
}

const LEGEND = [
  { label: 'Core', group: 'core' },
  { label: 'Frontend', group: 'frontend' },
  { label: 'Backend', group: 'backend' },
  { label: 'AI', group: 'ai' },
  { label: 'Vision', group: 'cv' },
  { label: 'IoT', group: 'iot' },
  { label: 'Mobile', group: 'mobile' },
  { label: 'Security', group: 'security' },
  { label: 'DevOps', group: 'devops' },
]

export function SkillGraph() {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const { theme, resolvedTheme } = useTheme()

  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const observer = new ResizeObserver((entries) => {
      const next = Math.round(entries[0].contentRect.width)
      setWidth((prev) => (Math.abs(prev - next) > 1 ? next : prev))
    })
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    if (!svgRef.current || !wrapperRef.current || width === 0) return

    const currentTheme = theme === 'system' ? resolvedTheme : theme
    const isDark = currentTheme !== 'light'

    const height = width < 640 ? 520 : 480

    const nodes: Node[] = SKILL_GRAPH_NODES.map((d) => ({ ...d }))
    const links: Link[] = SKILL_GRAPH_LINKS.map((d) => ({ source: d[0], target: d[1] }))

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;')

    const color = d3.scaleOrdinal<string>().range(Object.values(GROUP_COLORS))

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(88).strength(0.7))
      .force('charge', d3.forceManyBody().strength(-380))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(46))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.07))

    const link = svg
      .append('g')
      .attr('stroke', isDark ? 'rgba(255,255,255,0.14)' : 'rgba(15,23,42,0.13)')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 1.4)

    const node = svg
      .append('g')
      .attr('stroke', isDark ? '#1a1c20' : '#ffffff')
      .attr('stroke-width', 2)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d) => (d.group === 'core' ? 11 : 8))
      .attr('fill', (d) => GROUP_COLORS[d.group] ?? color(d.group))
      .style('cursor', 'grab')
      .call(drag(simulation) as any)

    const labels = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('dy', 20)
      .attr('text-anchor', 'middle')
      .text((d) => d.id)
      .attr('font-size', '10.5px')
      .attr('font-family', 'var(--font-jetbrains), monospace')
      .attr('font-weight', 500)
      .attr('fill', isDark ? '#939aa5' : '#5b6472')
      .attr('class', 'pointer-events-none select-none')

    simulation.on('tick', () => {
      const xPad = width < 640 ? 52 : 64
      const topPad = 26
      const bottomPad = 42
      const clampX = (v: number) => Math.max(xPad, Math.min(width - xPad, v))
      const clampY = (v: number) => Math.max(topPad, Math.min(height - bottomPad, v))

      link
        .attr('x1', (d: any) => clampX(d.source.x))
        .attr('y1', (d: any) => clampY(d.source.y))
        .attr('x2', (d: any) => clampX(d.target.x))
        .attr('y2', (d: any) => clampY(d.target.y))

      node.attr('cx', (d: any) => clampX(d.x)).attr('cy', (d: any) => clampY(d.y))

      labels.attr('x', (d: any) => clampX(d.x)).attr('y', (d: any) => clampY(d.y))
    })

    function drag(simulation: d3.Simulation<Node, undefined>) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event: any) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    }

    return () => {
      simulation.stop()
    }
  }, [theme, resolvedTheme, width])

  return (
    <div ref={wrapperRef} className="mt-12 w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-content-primary">
            How the stack connects
          </h3>
          <p className="mt-1 text-sm text-content-muted">
            Drag any node to explore the relationships between languages, frameworks and tools.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
          {LEGEND.map((item) => (
            <li key={item.group} className="flex items-center gap-1.5 text-[11px] text-content-muted">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: GROUP_COLORS[item.group] }}
              />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full justify-center">
        <svg
          ref={svgRef}
          role="img"
          aria-label="Interactive graph of technologies and how they connect"
          className="rounded-xl border border-line bg-bg-surface"
        />
      </div>
    </div>
  )
}
