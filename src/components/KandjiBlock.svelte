<script lang="ts">
  import { onMount } from 'svelte'
  import { codeToHtml } from 'shiki'

  const lines = [
    '#!/bin/bash',
    'set -e',
    '',
    '# 1. Stop the service',
    'launchctl bootout system/com.openclaw.service 2>/dev/null || true',
    '',
    '# 2. Back up config/memory',
    'cp -R /path/to/openclaw/config /path/to/openclaw/config.bak',
    '',
    '# 3. Update',
    'brew upgrade openclaw',
    '',
    '# 4. Restart',
    'launchctl bootstrap system /Library/LaunchDaemons/com.openclaw.service.plist',
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
        const h = await codeToHtml(line, { lang: 'bash', theme: 'one-dark-pro' })
        const match = h.match(/<code[^>]*>([\s\S]*?)<\/code>/)
        rendered.push(match ? match[1] : line)
      }
    }
    lineHtmls = rendered

    const fullHtml = await codeToHtml(' ', { lang: 'bash', theme: 'one-dark-pro' })
    const bgMatch = fullHtml.match(/background-color:\s*([^;"]+)/)
    if (bgMatch) bgStyle = bgMatch[1]

    const section = document.querySelector('[data-kandji]')
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
        if (lineIdx >= lines.length) clearInterval(interval)
      }, 80)
    }, 300)
  }

  function stopAnimation() {
    if (interval) clearInterval(interval)
    visibleCount = 0
  }
</script>

<div class="kandji-block">
  <pre style="background-color: {bgStyle || '#282c34'};"><code>{#each lineHtmls as lineHtml, i}{#if i < visibleCount}<span>{@html lineHtml}</span>{'\n'}{/if}{/each}</code></pre>
</div>

<style>
  .kandji-block {
    max-width: 650px;
    margin: 0 auto;
    text-align: left;
    font-size: 0.75rem;
    line-height: 1.6;
  }

  pre {
    padding: 1rem 1.25rem;
    border-radius: 8px;
    overflow-x: auto;
    min-height: 260px;
  }

  code {
    font-family: "IBM Plex Mono", monospace !important;
  }
</style>
