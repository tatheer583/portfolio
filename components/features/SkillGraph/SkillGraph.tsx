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

export function SkillGraph() {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const { theme, resolvedTheme } = useTheme()

  React.useEffect(() => {
    if (!svgRef.current || !wrapperRef.current) return

    const currentTheme = theme === 'system' ? resolvedTheme : theme
    const isDark = currentTheme !== 'light'

    const width = wrapperRef.current.clientWidth
    const height = 400

    const nodes: Node[] = SKILL_GRAPH_NODES.map((d) => ({ ...d }))
    const links: Link[] = SKILL_GRAPH_LINKS.map((d) => ({ source: d[0], target: d[1] }))

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;')

    const color = d3.scaleOrdinal()
      .domain(['core', 'frontend', 'backend', 'ai', 'cv', 'devops'])
      .range(['#6C63FF', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'])

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(30))

    const link = svg.append('g')
      .attr('stroke', isDark ? '#2A2A2A' : '#E5E5E5')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 1.5)

    const node = svg.append('g')
      .attr('stroke', isDark ? '#111111' : '#FFFFFF')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', (d) => color(d.group) as string)
      .call(drag(simulation) as any)

    const labels = svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('dy', 16)
      .attr('text-anchor', 'middle')
      .text((d) => d.id)
      .attr('font-size', '10px')
      .attr('fill', isDark ? '#A0A0A0' : '#525252')
      .attr('class', 'font-mono pointer-events-none select-none')

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node
        .attr('cx', (d: any) => Math.max(8, Math.min(width - 8, d.x)))
        .attr('cy', (d: any) => Math.max(8, Math.min(height - 8, d.y)))

      labels
        .attr('x', (d: any) => Math.max(8, Math.min(width - 8, d.x)))
        .attr('y', (d: any) => Math.max(8, Math.min(height - 8, d.y)))
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

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    }

    return () => {
      simulation.stop()
    }
  }, [theme, resolvedTheme])

  return (
    <div ref={wrapperRef} className="w-full flex justify-center mt-8">
      <svg ref={svgRef} className="rounded-lg border border-line bg-bg-surface" />
    </div>
  )
}
