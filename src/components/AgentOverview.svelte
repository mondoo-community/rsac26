<script lang="ts">
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'

  const columns = [
    {
      title: 'Discover', color: '#ec4899',
      agents: ['Git repos', 'CI/CD', 'Containers', 'VMs / Servers', 'Endpoints'],
    },
    {
      title: 'Prioritize', color: '#a855f7',
      agents: ['Business Impact', 'Attack Surface', 'Exploitability', 'Blast Radius', 'News & Intel', 'AI Evaluation', 'Orchestration'],
    },
    {
      title: 'Plan', color: '#3b82f6',
      agents: ['Aggregation', 'Initiatives', 'Remediations', 'Rollbacks', 'Ops Considerations'],
    },
    {
      title: 'Fix', color: '#06b6d4',
      agents: ['Ansible', 'Terraform', 'Intune', 'Kandji', 'PowerShell', 'Docker / K8s'],
    },
  ]

  let headerEls: HTMLDivElement[] = []
  let agentEls: HTMLDivElement[][] = [[], [], [], []]
  let containerEl: HTMLDivElement

  onMount(() => {
    const section = containerEl.closest('section')
    if (!section) return

    // Hide everything
    headerEls.forEach(el => gsap.set(el, { opacity: 0, y: 10 }))
    columns.forEach((_, ci) => {
      agentEls[ci]?.forEach(el => gsap.set(el, { opacity: 0, y: 8 }))
    })

    let timeline: gsap.core.Timeline

    const observer = new MutationObserver(() => {
      if (section.classList.contains('present')) {
        startAnimation()
      } else {
        stopAnimation()
      }
    })
    observer.observe(section, { attributes: true, attributeFilter: ['class'] })
    if (section.classList.contains('present')) startAnimation()

    function startAnimation() {
      stopAnimation()

      // Reset
      headerEls.forEach(el => gsap.set(el, { opacity: 0, y: 10 }))
      columns.forEach((_, ci) => {
        agentEls[ci]?.forEach(el => gsap.set(el, { opacity: 0, y: 8 }))
      })

      timeline = gsap.timeline()

      columns.forEach((col, ci) => {
        // Header appears
        timeline.to(headerEls[ci], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        // Wait
        timeline.addLabel(`pause-${ci}`, `>+1.5`)
        // Agents appear quickly
        agentEls[ci]?.forEach((el, ai) => {
          timeline.to(el, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' }, `pause-${ci}+=${ai * 0.08}`)
        })
        // Wait before next column
        if (ci < columns.length - 1) {
          timeline.addLabel(`gap-${ci}`, `>+1.5`)
        }
      })
    }

    function stopAnimation() {
      if (timeline) timeline.kill()
      headerEls.forEach(el => gsap.set(el, { opacity: 0, y: 10 }))
      columns.forEach((_, ci) => {
        agentEls[ci]?.forEach(el => gsap.set(el, { opacity: 0, y: 8 }))
      })
    }

    return () => {
      observer.disconnect()
      stopAnimation()
    }
  })
</script>

<div bind:this={containerEl}>
  <h2 class="text-4xl font-bold mb-10">Agent Overview</h2>
  <div class="overview-grid">
    {#each columns as col, ci}
      <div class="col">
        <div class="header" bind:this={headerEls[ci]} style="background: {col.color};">
          <p class="font-bold text-base text-white">{col.title}</p>
        </div>
        {#each col.agents as agent, ai}
          <div class="agent" bind:this={agentEls[ci][ai]}>
            <p class="op-70">{agent}</p>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .overview-grid {
    display: flex;
    gap: 1rem;
    justify-content: center;
    max-width: 900px;
    margin: 0 auto;
    font-size: 0.75rem;
  }

  .col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .header {
    border-radius: 8px;
    padding: 0.7rem;
    text-align: center;
  }

  .agent {
    background: #2a2a3a;
    border-radius: 6px;
    padding: 0.4rem 0.6rem;
    text-align: center;
  }
</style>
