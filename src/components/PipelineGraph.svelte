<script lang="ts">
  import { onMount } from 'svelte'
  const steps = ['Discover', 'Analyze', 'Plan', 'Fix', 'Report']
  const PURPLE = '#a855f7'
  const WHITE = 'rgba(255, 255, 255, 0.15)'
  const LINE_COLOR = 'rgba(255, 255, 255, 0.2)'

  let visible: boolean[] = $state(Array(steps.length).fill(false))
  let lines: boolean[] = $state(Array(steps.length - 1).fill(false))
  let active: number = $state(-1)

  let containerEl: HTMLDivElement

  onMount(() => {
    const update = () => {
      const fragments = containerEl.querySelectorAll('.fragment')
      let lastVisible = -1
      fragments.forEach((f, i) => {
        if (f.classList.contains('visible')) lastVisible = i
      })

      for (let i = 0; i < steps.length; i++) {
        visible[i] = i <= lastVisible
        if (i > 0) lines[i - 1] = i <= lastVisible
      }
      active = lastVisible
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

<div class="pipeline" bind:this={containerEl}>
  {#each steps as step, i}
    {#if i > 0}
      <svg class="connector" width="60" height="4" viewBox="0 0 60 4" style="margin-bottom: 2rem;">
        <line x1="0" y1="2" x2="60" y2="2" stroke={LINE_COLOR} stroke-width="2" stroke-dasharray="60" stroke-dashoffset={lines[i - 1] ? 0 : 60} style="transition: stroke-dashoffset 0.4s ease-out;" />
      </svg>
    {/if}
    <div class="step fragment" data-fragment-index={i} class:shown={visible[i]}>
      <div class="circle" style="background: {active === i ? PURPLE : WHITE}; transition: background 0.3s ease;">{i + 1}</div>
      <div class="label">{step}</div>
    </div>
  {/each}
</div>

<style>
  .pipeline {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    position: relative;
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

  .connector {
    flex-shrink: 0;
  }

</style>
