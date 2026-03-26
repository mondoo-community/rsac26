<script>
  let { width = 120, height = 60 } = $props();
</script>

<svg class="mx-auto block" {width} {height} viewBox="5 6.5 49 24.5" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ai-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7">
        <animate attributeName="stop-color" values="#a855f7;#06b6d4;#3b82f6;#a855f7" dur="4s" repeatCount="indefinite" />
      </stop>
      <stop offset="50%" stop-color="#3b82f6">
        <animate attributeName="stop-color" values="#3b82f6;#a855f7;#06b6d4;#3b82f6" dur="4s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="#06b6d4">
        <animate attributeName="stop-color" values="#06b6d4;#3b82f6;#a855f7;#06b6d4" dur="4s" repeatCount="indefinite" />
      </stop>
    </linearGradient>
    <linearGradient id="ai-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4">
        <animate attributeName="stop-color" values="#06b6d4;#ec4899;#a855f7;#06b6d4" dur="5s" repeatCount="indefinite" />
      </stop>
      <stop offset="50%" stop-color="#ec4899">
        <animate attributeName="stop-color" values="#ec4899;#a855f7;#06b6d4;#ec4899" dur="5s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="#a855f7">
        <animate attributeName="stop-color" values="#a855f7;#06b6d4;#ec4899;#a855f7" dur="5s" repeatCount="indefinite" />
      </stop>
    </linearGradient>
    <linearGradient id="ai-grad-3" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6">
        <animate attributeName="stop-color" values="#3b82f6;#a855f7;#ec4899;#3b82f6" dur="6s" repeatCount="indefinite" />
      </stop>
      <stop offset="50%" stop-color="#a855f7">
        <animate attributeName="stop-color" values="#a855f7;#ec4899;#3b82f6;#a855f7" dur="6s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="#ec4899">
        <animate attributeName="stop-color" values="#ec4899;#3b82f6;#a855f7;#ec4899" dur="6s" repeatCount="indefinite" />
      </stop>
    </linearGradient>
  </defs>
  <!-- Left D-shape (flat edge right, round left) -->
  <path fill="url(#ai-grad-1)" d="M17.3441 7.09821C17.3446 7.09821 17.3451 7.09864 17.3451 7.09918V29.8316C17.3451 29.9637 17.2371 30.0711 17.105 30.0684C10.8723 29.9406 5.85876 24.8479 5.85876 18.5845C5.85882 12.2413 11.001 7.09874 17.3441 7.09821Z"/>
  <!-- Center circle -->
  <circle fill="url(#ai-grad-2)" cx="29.7878" cy="18.5086" r="11.486"/>
  <!-- Right D-shape (flat edge left, round right) -->
  <path fill="url(#ai-grad-3)" d="M42.2322 7.09821C42.2316 7.09821 42.2312 7.09864 42.2312 7.09918V29.8316C42.2312 29.9637 42.3392 30.0711 42.4713 30.0684C48.704 29.9406 53.7175 24.8479 53.7175 18.5845C53.7175 12.2413 48.5753 7.09874 42.2322 7.09821Z"/>
</svg>
