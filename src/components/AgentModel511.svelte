<script lang="ts">
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'

  const agents = [
    'Business Impact',
    'Attack Surface',
    'Blast Radius',
    'Exploitability',
    'News & Intel',
  ]

  let containerEl: HTMLDivElement
  let agentsGroupEl: HTMLDivElement
  let prioGroupEl: HTMLDivElement
  let orchGroupEl: HTMLDivElement
  let agentBoxEls: HTMLDivElement[] = []
  let prioBoxEl: HTMLDivElement
  let orchBoxEl: HTMLDivElement

  onMount(() => {
    const revealEl = containerEl.closest('.reveal')
    if (!revealEl) return

    gsap.set(agentsGroupEl, { opacity: 0 })
    gsap.set(prioGroupEl, { opacity: 0 })
    gsap.set(orchGroupEl, { opacity: 0 })

    const shown = new Set<number>()

    const update = () => {
      const frags = containerEl.querySelectorAll('.frag-trigger')
      frags.forEach((f) => {
        const idx = parseInt(f.getAttribute('data-fragment-index') || '-1')
        const isVisible = f.classList.contains('visible')

        if (isVisible && !shown.has(idx)) {
          shown.add(idx)
          if (idx === 0) {
            gsap.to(agentsGroupEl, { opacity: 1, duration: 0.5 })
            agentBoxEls.forEach((el, i) => {
              gsap.fromTo(el, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, delay: i * 0.08, ease: 'back.out(1.3)' })
            })
          }
          if (idx === 1) {
            gsap.to(prioGroupEl, { opacity: 1, duration: 0.5 })
            gsap.fromTo(prioBoxEl, { scale: 0.5 }, { scale: 1, duration: 0.5, ease: 'back.out(1.3)' })
          }
          if (idx === 2) {
            gsap.to(orchGroupEl, { opacity: 1, duration: 0.5 })
            gsap.fromTo(orchBoxEl, { scale: 0.5 }, { scale: 1, duration: 0.5, ease: 'back.out(1.3)' })
          }
        }
        if (!isVisible && shown.has(idx)) {
          shown.delete(idx)
          if (idx === 0) gsap.to(agentsGroupEl, { opacity: 0, duration: 0.3 })
          if (idx === 1) gsap.to(prioGroupEl, { opacity: 0, duration: 0.3 })
          if (idx === 2) gsap.to(orchGroupEl, { opacity: 0, duration: 0.3 })
        }
      })
    }

    revealEl.addEventListener('fragmentshown', update)
    revealEl.addEventListener('fragmenthidden', update)
    update()

    return () => {
      revealEl.removeEventListener('fragmentshown', update)
      revealEl.removeEventListener('fragmenthidden', update)
    }
  })
</script>

<div class="model-container" bind:this={containerEl}>
  <h2 class="text-4xl font-bold mb-10">Agentic Prioritization</h2>

  <div class="frag-trigger fragment" data-fragment-index="0"></div>
  <div class="frag-trigger fragment" data-fragment-index="1"></div>
  <div class="frag-trigger fragment" data-fragment-index="2"></div>

  <div class="model-layout">
    <div class="col agents-col" bind:this={agentsGroupEl}>
      <div class="col-label">Focused analysis</div>
      {#each agents as agent, i}
        <div class="agent-node" bind:this={agentBoxEls[i]}>
          {agent}
        </div>
      {/each}
    </div>

    <div class="col prio-col" bind:this={prioGroupEl}>
      <div class="col-label">Overall Evaluation</div>
      <div class="center-node prio-node" bind:this={prioBoxEl}>
        Prioritization
      </div>
    </div>

    <div class="col orch-col" bind:this={orchGroupEl}>
      <div class="col-label">Orchestration</div>
      <div class="center-node orch-node" bind:this={orchBoxEl}>
        Supervisor
      </div>
    </div>
  </div>
</div>

<style>
  .model-container {
    text-align: center;
  }

  .frag-trigger {
    height: 0;
    overflow: hidden;
  }

  :global(.model-container .frag-trigger.fragment) {
    opacity: 1 !important;
  }

  .model-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    max-width: 850px;
    margin: 0 auto;
  }

  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .col-label {
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.75rem;
  }

  .agents-col {
    gap: 0.6rem;
    min-width: 175px;
  }

  .agent-node {
    padding: 0.45rem 1rem;
    background: #2a2a3a;
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
    width: 100%;
    text-align: center;
  }

  .prio-col, .orch-col {
    justify-content: center;
  }

  .center-node {
    padding: 1.25rem 1.5rem;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
  }

  .prio-node {
    background: #a855f7;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  }

  .orch-node {
    background: #3b82f6;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
</style>
