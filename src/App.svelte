<script lang="ts">
  import { onMount } from 'svelte'

  import 'reveal.js/dist/reset.css'
  import 'reveal.js/dist/reveal.css'

  import Reveal from 'reveal.js'
  import Slides from './Slides.svelte'

  let canvas: HTMLCanvasElement
  let time = $state('')

  function updateClock() {
    const now = new Date()
    time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  updateClock()
  setInterval(updateClock, 10000)

  onMount(() => {
    const deck = new Reveal({
      hash: true,
      progress: false,
      controls: false,
      navigationMode: 'linear',
      transition: 'none',
      autoSlideStoppable: false,
    })
    deck.initialize()

    // Starfield
    const ctx = canvas.getContext('2d')!
    const stars: { x: number; y: number; z: number }[] = []
    const COUNT = 600
    const SPEED = 0.5

    let opacity = 1
    let targetOpacity = 1
    const FADE_SPEED = 1 / 60 // ~1s at 60fps

    function isStarfieldSlide(slide: Element) {
      return slide.hasAttribute('data-starfield')
    }

    // Check initial slide
    const currentSlide = deck.getCurrentSlide()
    if (currentSlide && !isStarfieldSlide(currentSlide)) {
      opacity = 0
      targetOpacity = 0
    }

    deck.on('slidechanged', (event: any) => {
      targetOpacity = isStarfieldSlide(event.currentSlide) ? 1 : 0
    })

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * 1000,
      })
    }

    function frame() {
      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2

      // Fade opacity toward target
      if (opacity < targetOpacity) {
        opacity = Math.min(opacity + FADE_SPEED, targetOpacity)
      } else if (opacity > targetOpacity) {
        opacity = Math.max(opacity - FADE_SPEED, targetOpacity)
      }

      ctx.fillStyle = '#050510'
      ctx.fillRect(0, 0, w, h)

      if (opacity > 0) {
        for (const star of stars) {
          star.z -= SPEED

          if (star.z <= 0) {
            star.x = (Math.random() - 0.5) * w * 2
            star.y = (Math.random() - 0.5) * h * 2
            star.z = 1000
          }

          const sx = cx + (star.x / star.z) * 200
          const sy = cy + (star.y / star.z) * 200
          const r = Math.max(0, 1.5 * (1 - star.z / 1000))
          const a = Math.max(0, (1 - star.z / 1000) * opacity)

          const hue = 200 + (star.x * 0.02) % 40
          ctx.beginPath()
          ctx.arc(sx, sy, r, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${hue}, 60%, 85%, ${a})`
          ctx.fill()
        }
      }

      requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)

    return () => window.removeEventListener('resize', resize)
  })
</script>

<canvas bind:this={canvas} class="starfield"></canvas>

<div class="reveal">
  <div class="slides">
    <Slides />
  </div>
</div>

<div class="clock">{time}</div>

<style>
  .starfield {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  :global(.reveal) {
    background: transparent !important;
    color: #fff;
    font-family: "Atkinson Hyperlegible Next", system-ui, sans-serif;
    --link-color: #60a5fa;
  }

  :global(.reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6) {
    font-family: "Mona Sans", sans-serif;
  }

  :global(.reveal code, .reveal pre) {
    font-family: "IBM Plex Mono", monospace;
  }

  .clock {
    position: fixed;
    bottom: 12px;
    right: 16px;
    font-family: "IBM Plex Mono", monospace;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.3);
    z-index: 10;
    pointer-events: none;
  }
</style>
