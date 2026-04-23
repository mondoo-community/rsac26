<script lang="ts">
  import { onMount } from 'svelte'
  import * as d3 from 'd3'

  export interface BlastConnection {
    title: string
    subtitle?: string
    risk: number
  }
  export interface BlastConnectionGroup {
    title: string
    type: string
    count: number
    children: BlastConnection[]
  }
  export interface BlastRadiusData {
    asset: BlastConnection
    local: BlastConnectionGroup[]
    remote: BlastConnectionGroup[]
  }

  let { data }: { data: BlastRadiusData } = $props()

  type BlastIconType = 'vm' | 'key' | 'database' | 'nginx'
  interface BlastNode {
    x: number
    y: number
    risk: number
    label: string
    subtitle?: string
    icon: BlastIconType
    labelAbove?: boolean
    count?: number
  }

  const NODE_R = 22
  const MIN_SVG_W = 320
  const MIN_SVG_H = 220
  const LOCAL_SLOT_BASE = 160
  const REMOTE_SLOT_BASE = 80

  function riskColor(r: number): string {
    if (r >= 90) return '#f8444d' // critical
    if (r >= 70) return '#f67631' // high
    if (r >= 40) return '#fdb827' // medium
    return '#70c748' // low / none
  }

  function groupIcon(type: string, title: string): BlastIconType {
    const t = title.toLowerCase()
    if (t.includes('api') || t.includes('nginx') || t.includes('web')) return 'nginx'
    if (type === 'secrets' || t.includes('env') || t.includes('key') || t.includes('secret')) return 'key'
    if (type === 'database' || t.includes('data') || t.includes('db') || t.includes('service')) return 'database'
    return 'database'
  }

  function childrenSubtitle(group: BlastConnectionGroup): string | undefined {
    if (group.children.length === 0) return undefined
    return group.children.map((c) => c.title).join(', ')
  }

  function buildLayout(d: BlastRadiusData) {
    const locals = d.local
    const remotes = d.remote

    const localOffsets: number[] = []
    let localRowWidth = 0
    locals.forEach(() => {
      localOffsets.push(localRowWidth + LOCAL_SLOT_BASE / 2)
      localRowWidth += LOCAL_SLOT_BASE
    })
    const remoteOffsets: number[] = []
    let remoteColumnHeight = 0
    remotes.forEach(() => {
      remoteOffsets.push(remoteColumnHeight + REMOTE_SLOT_BASE / 2)
      remoteColumnHeight += REMOTE_SLOT_BASE
    })

    const assetX = Math.max(100, localRowWidth / 2 + 60)
    const remoteDist = 180
    const localDist = 120

    const svgW = Math.max(MIN_SVG_W, assetX + remoteDist + 80)
    const topPad = 10
    const topNeededByLocal = localDist + NODE_R + 28
    const remoteHalfHeight = remoteColumnHeight / 2
    const topNeededByRemote = remoteHalfHeight + NODE_R + 16
    const bottomNeededByRemote = remoteHalfHeight + NODE_R + 16
    const assetBottomPad = NODE_R + 16
    const topExtent = Math.max(topNeededByLocal, topNeededByRemote)
    const svgH = Math.max(MIN_SVG_H, topPad + topExtent + Math.max(assetBottomPad, bottomNeededByRemote))
    const assetY = topPad + topExtent

    const nodes: BlastNode[] = [
      { x: assetX, y: assetY, risk: d.asset.risk, label: d.asset.title, subtitle: d.asset.subtitle, icon: 'vm' },
    ]

    const localStartX = assetX - localRowWidth / 2
    locals.forEach((group, i) => {
      const maxChildRisk = group.children.length > 0 ? Math.max(...group.children.map((c) => c.risk)) : d.asset.risk
      nodes.push({
        x: localStartX + localOffsets[i],
        y: assetY - localDist,
        risk: maxChildRisk,
        label: group.title,
        subtitle: childrenSubtitle(group),
        icon: groupIcon(group.type, group.title),
        labelAbove: true,
        count: group.count,
      })
    })
    const remoteX = assetX + remoteDist
    const remoteStartY = assetY - remoteColumnHeight / 2
    remotes.forEach((group, i) => {
      const maxChildRisk = group.children.length > 0 ? Math.max(...group.children.map((c) => c.risk)) : d.asset.risk
      nodes.push({
        x: remoteX,
        y: remoteStartY + remoteOffsets[i],
        risk: maxChildRisk,
        label: group.title,
        subtitle: childrenSubtitle(group),
        icon: groupIcon(group.type, group.title),
        count: group.count,
      })
    })

    let minX = 0, minY = 0, maxX = svgW, maxY = svgH
    const pad = 50
    for (const n of nodes) {
      minX = Math.min(minX, n.x - NODE_R - pad)
      minY = Math.min(minY, n.y - NODE_R - pad)
      maxX = Math.max(maxX, n.x + NODE_R + pad)
      maxY = Math.max(maxY, n.y + NODE_R + pad)
    }
    return { nodes, viewBox: { x: minX, y: minY, width: maxX - minX, height: maxY - minY } }
  }

  function curvedLinkUp(ax: number, ay: number, tx: number, ty: number): string {
    const x1 = ax, y1 = ay - NODE_R, x2 = tx, y2 = ty + NODE_R + 4
    const v = y1 - y2
    return `M${x1},${y1} C${ax},${y1 - v * 0.5} ${tx + (ax - tx) * 0.15},${y2 + v * 0.5} ${x2},${y2}`
  }
  function curvedLinkRight(ax: number, ay: number, tx: number, ty: number): string {
    const x1 = ax + NODE_R, y1 = ay, x2 = tx - NODE_R - 4, y2 = ty
    const h = x2 - x1
    return `M${x1},${y1} C${x1 + h * 0.5},${ay} ${x2 - h * 0.5},${ty + (ay - ty) * 0.15} ${x2},${y2}`
  }

  function drawIconGlyph(g: d3.Selection<SVGGElement, unknown, null, undefined>, icon: BlastIconType) {
    const s = 9
    const surface = '#1a1a2e'
    switch (icon) {
      case 'vm':
        g.append('rect').attr('x', -s * 0.8).attr('y', -s * 0.7).attr('width', s * 1.6).attr('height', s * 1.1).attr('rx', 1.5).attr('fill', 'none').attr('stroke', surface).attr('stroke-width', 1.5)
        g.append('rect').attr('x', -s * 0.45).attr('y', -s * 0.4).attr('width', s * 0.9).attr('height', s * 0.5).attr('rx', 0.5).attr('fill', surface).attr('opacity', 0.4)
        g.append('line').attr('x1', 0).attr('y1', s * 0.4).attr('x2', 0).attr('y2', s * 0.7).attr('stroke', surface).attr('stroke-width', 1.5)
        g.append('line').attr('x1', -s * 0.4).attr('y1', s * 0.7).attr('x2', s * 0.4).attr('y2', s * 0.7).attr('stroke', surface).attr('stroke-width', 1.5)
        break
      case 'key':
        g.append('circle').attr('cx', 0).attr('cy', -s * 0.4).attr('r', s * 0.4).attr('fill', 'none').attr('stroke', surface).attr('stroke-width', 1.5)
        g.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', s).attr('stroke', surface).attr('stroke-width', 1.5)
        g.append('line').attr('x1', 0).attr('y1', s * 0.5).attr('x2', s * 0.35).attr('y2', s * 0.5).attr('stroke', surface).attr('stroke-width', 1.5)
        break
      case 'nginx':
        // Simplified globe/server: hexagon + horizontal line
        g.append('path').attr('d', `M0,${-s} L${s * 0.85},${-s * 0.5} L${s * 0.85},${s * 0.5} L0,${s} L${-s * 0.85},${s * 0.5} L${-s * 0.85},${-s * 0.5} Z`).attr('fill', 'none').attr('stroke', surface).attr('stroke-width', 1.5)
        g.append('line').attr('x1', -s * 0.85).attr('y1', 0).attr('x2', s * 0.85).attr('y2', 0).attr('stroke', surface).attr('stroke-width', 1.5)
        break
      case 'database':
        g.append('ellipse').attr('cx', 0).attr('cy', -s * 0.4).attr('rx', s * 0.65).attr('ry', s * 0.3).attr('fill', 'none').attr('stroke', surface).attr('stroke-width', 1.5)
        g.append('line').attr('x1', -s * 0.65).attr('y1', -s * 0.4).attr('x2', -s * 0.65).attr('y2', s * 0.5).attr('stroke', surface).attr('stroke-width', 1.5)
        g.append('line').attr('x1', s * 0.65).attr('y1', -s * 0.4).attr('x2', s * 0.65).attr('y2', s * 0.5).attr('stroke', surface).attr('stroke-width', 1.5)
        g.append('ellipse').attr('cx', 0).attr('cy', s * 0.5).attr('rx', s * 0.65).attr('ry', s * 0.3).attr('fill', 'none').attr('stroke', surface).attr('stroke-width', 1.5)
        break
    }
  }

  let svgEl: SVGSVGElement
  const layout = $derived(buildLayout(data))

  function render() {
    if (!svgEl) return
    const nodes = layout.nodes
    const svg = d3.select(svgEl)
    svg.selectAll('defs, g').remove()

    const markerId = `blast-arrow-${Math.random().toString(36).slice(2, 8)}`
    const defs = svg.append('defs')
    defs.append('marker').attr('id', markerId).attr('viewBox', '0 0 10 10').attr('refX', 8).attr('refY', 5).attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto').attr('fill', 'rgba(255,255,255,0.5)').append('path').attr('d', 'M0,0 L10,5 L0,10 Z')

    const linkGroup = svg.append('g').attr('class', 'links')
    const asset = nodes[0]
    nodes.slice(1).forEach((node, i) => {
      const isLocal = node.labelAbove === true
      const pathD = isLocal ? curvedLinkUp(asset.x, asset.y, node.x, node.y) : curvedLinkRight(asset.x, asset.y, node.x, node.y)
      const path = linkGroup
        .append('path')
        .attr('d', pathD)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(255,255,255,0.5)')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0.6)
      const pathNode = path.node()
      if (pathNode) {
        const totalLen = pathNode.getTotalLength()
        path
          .attr('stroke-dasharray', `${totalLen}`)
          .attr('stroke-dashoffset', totalLen)
          .transition()
          .delay(200 + i * 80)
          .duration(500)
          .ease(d3.easeCubicOut)
          .attr('stroke-dashoffset', 0)
          .on('end', function () {
            d3.select(this)
              .attr('stroke-dasharray', 'none')
              .attr('marker-end', `url(#${markerId})`)
          })
      }
    })

    const nodeGroup = svg.append('g').attr('class', 'nodes')
    nodes.forEach((node, i) => {
      const g = nodeGroup.append('g').attr('transform', `translate(${node.x},${node.y})`).attr('opacity', 0)
      g.append('circle').attr('r', NODE_R).attr('fill', riskColor(node.risk)).attr('stroke', '#1a1a2e').attr('stroke-width', 2)
      drawIconGlyph(g, node.icon)

      const labelY = node.labelAbove ? -(NODE_R + 20) : NODE_R + 14
      g.append('text').attr('y', labelY).attr('text-anchor', 'middle').attr('fill', '#fff').attr('font-size', 11).attr('font-family', 'IBM Plex Mono, monospace').attr('font-weight', '600').text(node.label)
      if (node.subtitle) {
        g.append('text').attr('y', labelY + 12).attr('text-anchor', 'middle').attr('fill', 'rgba(255,255,255,0.55)').attr('font-size', 9).attr('font-family', 'IBM Plex Mono, monospace').text(node.subtitle)
      }

      g.transition()
        .delay(i * 100)
        .duration(350)
        .ease(d3.easeBackOut.overshoot(1.2))
        .attr('opacity', 1)
    })
  }

  onMount(() => {
    render()
    const revealEl = svgEl.closest('.reveal')
    const sectionEl = svgEl.closest('section')
    if (!revealEl || !sectionEl) return
    const onSlideChanged = (e: Event) => {
      if ((e as CustomEvent & { currentSlide: Element }).currentSlide === sectionEl) {
        render()
      }
    }
    revealEl.addEventListener('slidechanged', onSlideChanged)
    return () => revealEl.removeEventListener('slidechanged', onSlideChanged)
  })
</script>

<svg
  bind:this={svgEl}
  viewBox="{layout.viewBox.x} {layout.viewBox.y} {layout.viewBox.width} {layout.viewBox.height}"
  style="width: 520px; max-width: 100%; margin: 0 auto; display: block;"
  role="img"
  aria-label="Blast radius graph"
></svg>
