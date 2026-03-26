<script lang="ts">
  import { onMount } from 'svelte'

  import 'reveal.js/reset.css'
  import 'reveal.js/reveal.css'
  import 'reveal.js/theme/black.css'

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
