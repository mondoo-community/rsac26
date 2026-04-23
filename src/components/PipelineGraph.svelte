<script lang="ts">
  import { onMount } from 'svelte'

  let { highlight = -1 } = $props<{ highlight?: number }>()

  const steps = ['Discover', 'Prioritize', 'Plan', 'Fix', 'Report']
  const PURPLE = '#a855f7'
  const WHITE = '#2a2a3a'
  const LINE_COLOR = '#2a2a3a'

  const isStatic = $derived(highlight >= 0)

  const highlightRange = [1, 2, 3]

  let visible: boolean[] = $state(Array(steps.length).fill(false))
  let lines: boolean[] = $state(Array(steps.length - 1).fill(false))
  let active: number = $state(-1)
  let highlightMode: boolean = $state(false)

  let containerEl: HTMLDivElement

  onMount(() => {
    if (isStatic) return

    const update = () => {
      const stepFragments = containerEl.querySelectorAll('.step.fragment')
      let lastVisible = -1
      stepFragments.forEach((f, i) => {
        if (f.classList.contains('visible')) lastVisible = i
      })

      for (let i = 0; i < steps.length; i++) {
        visible[i] = i <= lastVisible
        if (i > 0) lines[i - 1] = i <= lastVisible
      }
      active = lastVisible

      const highlightEl = containerEl.querySelector('.highlight-trigger')
      highlightMode = !!highlightEl?.classList.contains('visible')
    }

    const revealEl = containerEl.closest('.reveal')
    if (revealEl) {
      revealEl.addEventListener('fragmentshown', update)
      revealEl.addEventListener('fragmenthidden', update)
    }

    update()

    return () => {
      if (revealEl) {
        revealEl.removeEventListener('fragmentshown', update)
        revealEl.removeEventListener('fragmenthidden', update)
      }
    }
  })
</script>

<div class="pipeline-wrapper" bind:this={containerEl}>
  <div class="pipeline">
    {#each steps as step, i}
      {#if i > 0}
        <svg class="connector" width="60" height="4" viewBox="0 0 60 4" style="margin-bottom: 2rem;">
          <line x1="0" y1="2" x2="60" y2="2" stroke={LINE_COLOR} stroke-width="2" stroke-dasharray="60" stroke-dashoffset={isStatic || lines[i - 1] ? 0 : 60} style="transition: stroke-dashoffset 0.4s ease-out;" />
        </svg>
      {/if}
      {#if isStatic}
        <div class="step-static">
          <div class="circle" class:pulse={highlight === i} style="background: {highlight === i ? PURPLE : WHITE};">{i + 1}</div>
          <div class="label">{step}</div>
        </div>
      {:else}
        {@const isHighlighted = highlightMode && highlightRange.includes(i)}
        {@const isPurple = highlightMode ? isHighlighted : active === i}
        <div class="step fragment" data-fragment-index={i} class:shown={visible[i]}>
          <div class="circle" class:pulse={isHighlighted} style="background: {isPurple ? PURPLE : WHITE}; transition: background 0.3s ease;">{i + 1}</div>
          <div class="label">{step}</div>
        </div>
      {/if}
    {/each}
  </div>
  {#if !isStatic}
    <div class="highlight-trigger fragment" data-fragment-index={steps.length} aria-hidden="true"></div>
  {/if}
</div>

<style>
  .pipeline {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    position: relative;
  }

  .highlight-trigger {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
  }

  .step.shown {
    opacity: 1;
    transform: scale(1);
  }

  .step.fragment.visible {
    opacity: 0;
    transform: scale(0.5);
  }

  .step.fragment.visible.shown {
    opacity: 1;
    transform: scale(1);
  }

  .circle {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
  }

  .label {
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
  }

  .step-static {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 4px 1px rgba(168, 85, 247, 0.6); }
    50% { box-shadow: 0 0 20px 8px rgba(168, 85, 247, 0.3); }
  }

  .connector {
    flex-shrink: 0;
    margin: 0 -2px;
    z-index: 0;
  }

  .step, .step-static {
    z-index: 1;
  }

</style>
