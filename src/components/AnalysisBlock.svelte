<script lang="ts">
  import { onMount } from 'svelte'
  import { codeToHtml } from 'shiki'

  const lines = [
    '> Analyzing react2shell attack surface...',
    '',
    '> React version check:        19.2.0  ← AFFECTED (19.0.0–19.2.0)',
    '> React 18 or below:          no',
    '> Server Components (RSC):    yes     ← vulnerable path',
    '> RSC packages detected:      react-server-dom-webpack',
    '> Next.js App Router:         yes     ← uses RSC by default',
    '> Pages Router only:          no',
    '> Server Functions ("use server"):  found 12 endpoints',
    '> Static/SSG-only build:      no      ← live server runtime',
    '> Internet-facing:            yes     ← pre-auth, no VPN',
    '> Deserialization endpoint:   reachable',
    '',
    '▸ RESULT: attack surface confirmed — real and exploitable',
  ]

  let visibleCount = $state(0)
  let lineHtmls: string[] = $state([])
  let bgStyle = $state('')
  let interval: ReturnType<typeof setInterval>

  onMount(async () => {
    // Pre-render each line through shiki to get consistent highlighting
    const full = await codeToHtml(lines.join('\n'), {
      lang: 'shell',
      theme: 'one-dark-pro',
    })

    // Extract background color from the pre tag
    const bgMatch = full.match(/background-color:\s*([^;"]+)/)
    if (bgMatch) bgStyle = bgMatch[1]

    // Render each line individually
    const rendered: string[] = []
    for (const line of lines) {
      if (line === '') {
        rendered.push('')
      } else {
        const h = await codeToHtml(line, { lang: 'shell', theme: 'one-dark-pro' })
        // Extract just the inner code content
        const match = h.match(/<code[^>]*>([\s\S]*?)<\/code>/)
        rendered.push(match ? match[1] : line)
      }
    }
    lineHtmls = rendered

    // Observe slide visibility
    const section = document.querySelector('[data-analysis]')
    if (!section) return

    const observer = new MutationObserver(() => {
      if (section.classList.contains('present')) {
        startAnimation()
      } else {
        stopAnimation()
      }
    })
    observer.observe(section, { attributes: true, attributeFilter: ['class'] })
    if (section.classList.contains('present')) startAnimation()

    return () => {
      observer.disconnect()
      stopAnimation()
    }
  })

  function startAnimation() {
    visibleCount = 0
    let lineIdx = 0

    // First line after 300ms, then rest at 80ms intervals
    setTimeout(() => {
      visibleCount = 1
      lineIdx = 1

      interval = setInterval(() => {
        lineIdx++
        visibleCount = lineIdx
        if (lineIdx >= lines.length) {
          clearInterval(interval)
        }
      }, 80)
    }, 300)
  }

  function stopAnimation() {
    if (interval) clearInterval(interval)
    visibleCount = 0
  }
</script>

<div class="analysis-block">
  <pre style="background-color: {bgStyle || '#121212'};"><code>{#each lineHtmls as lineHtml, i}{#if i < visibleCount}<span class="aline">{@html lineHtml}</span>{'\n'}{/if}{/each}</code></pre>
</div>

<style>
  .analysis-block {
    max-width: 650px;
    margin: 0 auto;
    text-align: left;
    font-size: 0.7rem;
    line-height: 1.5;
  }

  pre {
    padding: 1rem 1.25rem;
    border-radius: 8px;
    overflow-x: auto;
    min-height: 280px;
  }

  code {
    font-family: "IBM Plex Mono", monospace !important;
  }

  .aline {
    display: inline;
  }
</style>
