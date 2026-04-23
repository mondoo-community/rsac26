<script lang="ts">
  import { onMount } from 'svelte'
  import { codeToHtml } from 'shiki'

  const lines = [
    '> Pulling risk category evaluations...',
    '',
    '  [1/5] Business Impact     CRITICAL  customer-facing SaaS, PII + payment data',
    '  [2/5] Attack Surface      CRITICAL  RSC confirmed, server runtime, internet-facing',
    '  [3/5] Exploitability      CRITICAL  public exploits, actively exploited, no auth',
    '  [4/5] Blast Radius        CRITICAL  DB access, env secrets, internal network pivot',
    '  [5/5] News & Intel        CRITICAL  named vuln, massive framework coverage',
    '',
    '> Computing overall evaluation...',
    '',
    '  ┌──────────────────────────────────────────────────┐',
    '  │  CVE-2025-55182 (react2shell)                    │',
    '  │  Overall Risk:  ██████████████████████  CRITICAL │',
    '  │  Score: 10.0    Confidence: 96%                  │',
    '  │                                                  │',
    '  │  Action: IMMEDIATE PATCHING REQUIRED             │',
    '  │  Upgrade React to 19.0.3+ / Next.js 15.0.5+      │',
    '  └──────────────────────────────────────────────────┘',
  ]

  let visibleCount = $state(0)
  let lineHtmls: string[] = $state([])
  let bgStyle = $state('')
  let interval: ReturnType<typeof setInterval>

  onMount(async () => {
    const rendered: string[] = []
    for (const line of lines) {
      if (line === '') {
        rendered.push('')
      } else {
        const h = await codeToHtml(line, { lang: 'shell', theme: 'one-dark-pro' })
        const match = h.match(/<code[^>]*>([\s\S]*?)<\/code>/)
        rendered.push(match ? match[1] : line)
      }
    }
    lineHtmls = rendered

    // Get bg color
    const fullHtml = await codeToHtml(' ', { lang: 'shell', theme: 'one-dark-pro' })
    const bgMatch = fullHtml.match(/background-color:\s*([^;"]+)/)
    if (bgMatch) bgStyle = bgMatch[1]

    const section = document.querySelector('[data-evaluation]')
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

    setTimeout(() => {
      visibleCount = 1
      lineIdx = 1

      interval = setInterval(() => {
        lineIdx++
        visibleCount = lineIdx

        // Pause after "Computing overall evaluation..."
        if (lineIdx === 9) {
          clearInterval(interval)
          setTimeout(() => {
            interval = setInterval(() => {
              lineIdx++
              visibleCount = lineIdx
              if (lineIdx >= lines.length) clearInterval(interval)
            }, 80)
          }, 500)
          return
        }

        if (lineIdx >= lines.length) clearInterval(interval)
      }, 80)
    }, 300)
  }

  function stopAnimation() {
    if (interval) clearInterval(interval)
    visibleCount = 0
  }
</script>

<div class="eval-block">
  <pre style="background-color: {bgStyle || '#282c34'};"><code>{#each lineHtmls as lineHtml, i}{#if i < visibleCount}<span>{@html lineHtml}</span>{'\n'}{/if}{/each}</code></pre>
</div>

<style>
  .eval-block {
    max-width: 650px;
    margin: 0 auto;
    text-align: left;
    font-size: 0.65rem;
    line-height: 1.5;
  }

  pre {
    padding: 1rem 1.25rem;
    border-radius: 8px;
    overflow-x: auto;
    min-height: 300px;
  }

  code {
    font-family: "IBM Plex Mono", monospace !important;
  }
</style>
