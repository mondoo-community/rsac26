<script lang="ts">
  import { onMount } from 'svelte'
  import * as d3 from 'd3'

  // Sampled every 14 days from generateHartwellDebtSeries()
  const data = [
    {date:"2024-02-24",detected:750002,remediated:130000},
    {date:"2024-03-09",detected:757775,remediated:130041},
    {date:"2024-04-06",detected:798785,remediated:130346},
    {date:"2024-05-04",detected:819211,remediated:130496},
    {date:"2024-06-01",detected:832395,remediated:130592},
    {date:"2024-06-29",detected:867181,remediated:130860},
    {date:"2024-07-27",detected:886018,remediated:130997},
    {date:"2024-08-24",detected:963523,remediated:131382},
    {date:"2024-09-21",detected:991197,remediated:131699},
    {date:"2024-10-19",detected:1030088,remediated:131925},
    {date:"2024-11-16",detected:1048869,remediated:132069},
    {date:"2024-12-14",detected:1168925,remediated:132977},
    {date:"2025-01-11",detected:1185454,remediated:133354},
    {date:"2025-02-08",detected:1359373,remediated:134726},
    // ← Mondoo adoption: Feb 24 2025
    {date:"2025-03-08",detected:1448014,remediated:134993},
    {date:"2025-03-22",detected:1482096,remediated:161850},
    {date:"2025-04-05",detected:1541705,remediated:198641},
    {date:"2025-04-19",detected:1623250,remediated:355118},
    {date:"2025-05-03",detected:1711868,remediated:595064},
    {date:"2025-05-17",detected:1822735,remediated:788153},
    {date:"2025-05-31",detected:1855864,remediated:995666},
    {date:"2025-06-14",detected:1980888,remediated:1109916},
    {date:"2025-06-28",detected:2037877,remediated:1313263},
    {date:"2025-07-12",detected:2083512,remediated:1430404},
    {date:"2025-07-26",detected:2262888,remediated:1524852},
    {date:"2025-08-09",detected:2515967,remediated:1737831},
    {date:"2025-08-23",detected:2844806,remediated:2038136},
    {date:"2025-09-06",detected:2941612,remediated:2399879},
    {date:"2025-09-20",detected:3142044,remediated:2515585},
    {date:"2025-10-04",detected:4015823,remediated:2748220},
    {date:"2025-10-18",detected:4048695,remediated:3638003},
    {date:"2025-11-01",detected:4588106,remediated:3692949},
    {date:"2025-11-15",detected:4843357,remediated:4245840},
    {date:"2025-11-29",detected:4868011,remediated:4514696},
    {date:"2025-12-13",detected:5268140,remediated:4549813},
    {date:"2025-12-27",detected:5340212,remediated:4959159},
    {date:"2026-01-10",detected:5361023,remediated:5038854},
    {date:"2026-01-24",detected:5558407,remediated:5066646},
    {date:"2026-02-07",detected:6131522,remediated:5449639},
    {date:"2026-02-21",detected:6419902,remediated:6168673},
    {date:"2026-03-07",detected:6536373,remediated:6519395},
    {date:"2026-03-12",detected:6845806,remediated:6569944},
  ]

  const MONDOO_DATE = '2025-02-24'

  let svgEl: SVGSVGElement

  onMount(() => {
    const margin = { top: 20, right: 30, bottom: 50, left: 65 }
    const width = 520 - margin.left - margin.right
    const height = 320 - margin.top - margin.bottom

    const svg = d3.select(svgEl)
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const parseDate = d3.timeParse('%Y-%m-%d')
    const parsed = data.map(d => ({
      date: parseDate(d.date)!,
      detected: d.detected,
      remediated: d.remediated,
    }))

    const x = d3.scaleTime()
      .domain(d3.extent(parsed, d => d.date) as [Date, Date])
      .range([0, width])

    const maxVal = d3.max(parsed, d => d.detected) || 7_000_000
    const y = d3.scaleLinear()
      .domain([0, maxVal * 1.05])
      .range([height, 0])

    // Grid lines
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(() => ''))
      .selectAll('line')
      .attr('stroke', 'rgba(255,255,255,0.06)')
    g.selectAll('.grid .domain').remove()

    // Mondoo adoption marker
    const mondooX = x(parseDate(MONDOO_DATE)!)
    g.append('line')
      .attr('x1', mondooX).attr('x2', mondooX)
      .attr('y1', 0).attr('y2', height)
      .attr('stroke', 'rgba(168,85,247,0.4)')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4 3')

    g.append('text')
      .attr('x', mondooX + 4).attr('y', 12)
      .attr('fill', 'rgba(168,85,247,0.7)')
      .attr('font-size', '8px')
      .attr('font-family', 'IBM Plex Mono, monospace')
      .text('With Mondoo')

    // Area fills
    const areaDetected = d3.area<typeof parsed[0]>()
      .x(d => x(d.date))
      .y0(height)
      .y1(d => y(d.detected))
      .curve(d3.curveMonotoneX)

    const areaRemediated = d3.area<typeof parsed[0]>()
      .x(d => x(d.date))
      .y0(height)
      .y1(d => y(d.remediated))
      .curve(d3.curveMonotoneX)

    // Gradients
    const detGrad = svg.append('defs').append('linearGradient')
      .attr('id', 'grad-det').attr('x1', '0').attr('y1', '0').attr('x2', '0').attr('y2', '1')
    detGrad.append('stop').attr('offset', '0%').attr('stop-color', '#ec4899').attr('stop-opacity', 0.25)
    detGrad.append('stop').attr('offset', '100%').attr('stop-color', '#ec4899').attr('stop-opacity', 0.02)

    const remGrad = svg.append('defs').append('linearGradient')
      .attr('id', 'grad-rem').attr('x1', '0').attr('y1', '0').attr('x2', '0').attr('y2', '1')
    remGrad.append('stop').attr('offset', '0%').attr('stop-color', '#a855f7').attr('stop-opacity', 0.35)
    remGrad.append('stop').attr('offset', '100%').attr('stop-color', '#a855f7').attr('stop-opacity', 0.02)

    // Clip rect for draw animation
    const clipId = 'chart-clip-' + Math.random().toString(36).slice(2, 8)
    const clip = svg.append('defs').append('clipPath').attr('id', clipId)
    const clipRect = clip.append('rect')
      .attr('x', 0).attr('y', 0)
      .attr('width', 0).attr('height', height + 10)

    const chartContent = g.append('g').attr('clip-path', `url(#${clipId})`)

    chartContent.append('path').datum(parsed).attr('fill', 'url(#grad-det)').attr('d', areaDetected)
    chartContent.append('path').datum(parsed).attr('fill', 'url(#grad-rem)').attr('d', areaRemediated)

    // Lines
    const lineDet = d3.line<typeof parsed[0]>()
      .x(d => x(d.date)).y(d => y(d.detected)).curve(d3.curveMonotoneX)
    const lineRem = d3.line<typeof parsed[0]>()
      .x(d => x(d.date)).y(d => y(d.remediated)).curve(d3.curveMonotoneX)

    chartContent.append('path').datum(parsed)
      .attr('fill', 'none').attr('stroke', '#ec4899').attr('stroke-width', 2).attr('d', lineDet)
    chartContent.append('path').datum(parsed)
      .attr('fill', 'none').attr('stroke', '#a855f7').attr('stroke-width', 2).attr('d', lineRem)

    // Animate clip rect to reveal chart left-to-right
    function playAnimation() {
      clipRect.interrupt()
      clipRect.attr('width', 0)
        .transition()
        .duration(2500)
        .ease(d3.easeLinear)
        .attr('width', width + 10)
    }

    // Observe slide visibility
    const section = svgEl.closest('section')
    if (section) {
      const observer = new MutationObserver(() => {
        if (section.classList.contains('present')) {
          playAnimation()
        }
      })
      observer.observe(section, { attributes: true, attributeFilter: ['class'] })
      if (section.classList.contains('present')) playAnimation()
    } else {
      playAnimation()
    }

    // X axis with quarterly labels
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(d3.timeMonth.every(3)).tickFormat(d3.timeFormat("Q%q '%y") as any))
      .selectAll('text')
      .attr('fill', 'rgba(255,255,255,0.5)')
      .attr('font-size', '8px')
      .attr('font-family', 'IBM Plex Mono, monospace')
    g.selectAll('.domain, .tick line').attr('stroke', 'rgba(255,255,255,0.1)')

    // Y axis with M suffix
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${(d as number / 1_000_000).toFixed(1)}M`))
      .selectAll('text')
      .attr('fill', 'rgba(255,255,255,0.5)')
      .attr('font-size', '8px')
      .attr('font-family', 'IBM Plex Mono, monospace')
    g.selectAll('.domain').remove()

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left + width / 2 - 80}, ${height + margin.top + 40})`)

    legend.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 4).attr('fill', '#ec4899')
    legend.append('text').attr('x', 8).attr('y', 4).text('Detected')
      .attr('fill', 'rgba(255,255,255,0.6)').attr('font-size', '9px').attr('font-family', 'IBM Plex Mono, monospace')
    legend.append('circle').attr('cx', 85).attr('cy', 0).attr('r', 4).attr('fill', '#a855f7')
    legend.append('text').attr('x', 93).attr('y', 4).text('Remediated')
      .attr('fill', 'rgba(255,255,255,0.6)').attr('font-size', '9px').attr('font-family', 'IBM Plex Mono, monospace')
  })
</script>

<div class="chart-slide">
  <div class="two-col">
    <div class="stats-col">
      <div class="stat-card">
        <p class="stat-label">Vulns Remediated</p>
        <p class="stat-value">6.6M</p>
        <p class="stat-delta">~280K remaining (4%)</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Fix Rate</p>
        <p class="stat-value" style="font-size: 1.8rem;">~135K<span style="font-size: 0.9rem; opacity: 0.5;">/week</span></p>
        <p class="stat-delta">vs. ~200/week pre-Mondoo</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">By Risk Severity</p>
        <div class="severity-row">
          <span class="sev-label">Critical</span>
          <div class="sev-bar"><div class="sev-fill" style="width: 12%; background: #dc2626;"></div></div>
          <span class="sev-count">~790K</span>
        </div>
        <div class="severity-row">
          <span class="sev-label">High</span>
          <div class="sev-bar"><div class="sev-fill" style="width: 38%; background: #f97316;"></div></div>
          <span class="sev-count">~2.5M</span>
        </div>
        <div class="severity-row">
          <span class="sev-label">Medium</span>
          <div class="sev-bar"><div class="sev-fill" style="width: 50%; background: #eab308;"></div></div>
          <span class="sev-count">~3.3M</span>
        </div>
      </div>
      <div class="stat-card">
        <p class="stat-label">MTTR</p>
        <p class="stat-value" style="font-size: 1.8rem;">5 days</p>
        <p class="stat-delta">down from 107 days</p>
      </div>
    </div>
    <div class="chart-col">
      <div class="chart-card">
        <p class="chart-title">Remediation Progress</p>
        <p class="chart-subtitle">Closing the gap</p>
        <svg bind:this={svgEl} class="chart-svg"></svg>
      </div>
    </div>
  </div>
</div>

<style>
  .chart-slide {
    text-align: center;
  }

  .two-col {
    display: flex;
    gap: 1rem;
    max-width: 820px;
    margin: 0 auto;
    align-items: stretch;
  }

  .stats-col {
    width: 180px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .chart-col {
    flex: 1;
  }

  .stat-card, .chart-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 0.75rem;
    text-align: center;
  }

  .stat-label {
    font-size: 0.6rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.15rem;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    font-family: "Mona Sans", sans-serif;
  }

  .stat-delta {
    font-size: 0.55rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .severity-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.25rem;
  }

  .sev-label {
    font-size: 0.55rem;
    width: 40px;
    text-align: left;
    color: rgba(255, 255, 255, 0.6);
    flex-shrink: 0;
  }

  .sev-bar {
    flex: 1;
    height: 5px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 3px;
    overflow: hidden;
  }

  .sev-fill {
    height: 100%;
    border-radius: 3px;
  }

  .sev-count {
    font-size: 0.55rem;
    width: 32px;
    text-align: right;
    color: rgba(255, 255, 255, 0.6);
  }

  .chart-card {
    text-align: left;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .chart-title {
    font-size: 0.7rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
  }

  .chart-subtitle {
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 0.25rem;
  }

  .chart-svg {
    width: 100%;
    flex: 1;
  }
</style>
