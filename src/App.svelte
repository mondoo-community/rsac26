<script lang="ts">
  import { onMount } from 'svelte'

  import 'reveal.js/reset.css'
  import 'reveal.js/reveal.css'

  import Reveal from 'reveal.js'
  import Slides from './Slides.svelte'

  onMount(() => {
    const deck = new Reveal({
      hash: true,
      progress: true,
      controls: false,
      navigationMode: 'linear',
      transition: 'none',
    })
    deck.initialize()
  })
</script>

<div class="reveal">
  <div class="slides">
    <Slides />
  </div>
</div>

<style>
  :global(.reveal) {
    background:
      radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1px 1px at 25% 40%, rgba(255,255,255,0.6), transparent),
      radial-gradient(1.5px 1.5px at 50% 10%, rgba(255,255,255,0.9), transparent),
      radial-gradient(1px 1px at 70% 65%, rgba(255,255,255,0.5), transparent),
      radial-gradient(1px 1px at 85% 25%, rgba(255,255,255,0.7), transparent),
      radial-gradient(1.5px 1.5px at 15% 75%, rgba(255,255,255,0.6), transparent),
      radial-gradient(1px 1px at 40% 85%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1px 1px at 60% 45%, rgba(255,255,255,0.4), transparent),
      radial-gradient(1.5px 1.5px at 90% 80%, rgba(255,255,255,0.7), transparent),
      radial-gradient(1px 1px at 35% 20%, rgba(255,255,255,0.5), transparent),
      radial-gradient(1px 1px at 5% 55%, rgba(255,255,255,0.6), transparent),
      radial-gradient(1.5px 1.5px at 75% 5%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1px 1px at 55% 70%, rgba(255,255,255,0.5), transparent),
      radial-gradient(1px 1px at 20% 95%, rgba(255,255,255,0.7), transparent),
      radial-gradient(1.5px 1.5px at 95% 50%, rgba(255,255,255,0.6), transparent),
      radial-gradient(1px 1px at 45% 30%, rgba(255,255,255,0.4), transparent),
      radial-gradient(1px 1px at 80% 90%, rgba(255,255,255,0.5), transparent),
      radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.3), transparent),
      radial-gradient(1.5px 1.5px at 65% 15%, rgba(255,255,255,0.6), transparent),
      radial-gradient(1px 1px at 12% 35%, rgba(255,255,255,0.5), transparent),
      radial-gradient(ellipse at bottom, #0a0a1a 0%, #050510 100%);
    color: #fff;
    font-family: "Atkinson Hyperlegible Next", system-ui, sans-serif;
  }

  :global(.reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6) {
    font-family: "Mona Sans", sans-serif;
  }

  :global(.reveal code, .reveal pre) {
    font-family: "IBM Plex Mono", monospace;
  }
</style>
