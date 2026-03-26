<script lang="ts">
  import MondooLogoFull from './components/MondooLogoFull.svelte'
  import PipelineGraph from './components/PipelineGraph.svelte'
</script>

<section data-starfield>
  <MondooLogoFull width={555} height={108} />
</section>

<section>
  <h1 class="text-5xl font-bold">Agentic AI in Action</h1>
  <h2 class="text-3xl mt-4 op-80">Vulnerability Management Transformed</h2>
  <p class="mt-8 text-lg op-60">Dominik Richter</p>
  <p class="text-base op-40">dom@mondoo.com</p>
</section>

<section>
  <h2 class="text-4xl font-bold mb-12">We will cover</h2>
  <div class="flex justify-around items-start gap-8 text-left max-w-4xl mx-auto">

    <div class="fragment flex-1" data-fragment-index="0">
      <h3 class="text-2xl font-bold" style="color: #ec4899;">react2shell</h3>
      <p class="text-base op-70 mt-2">CVE-2025-55182</p>
      <p class="text-base op-50 mt-1">2025-12-03</p>
      <p class="text-base op-50 mt-1">React Server Components</p>
    </div>

    <div class="fragment flex-1" data-fragment-index="1">
      <h3 class="text-2xl font-bold" style="color: #3b82f6;">SharePoint RCE</h3>
      <p class="text-base op-70 mt-2">CVE-2025-53770</p>
      <p class="text-base op-50 mt-1">2025-07-19</p>
      <p class="text-base op-50 mt-1">SharePoint Server 2016/2019/SE</p>
    </div>

    <div class="fragment flex-1" data-fragment-index="2">
      <h3 class="text-2xl font-bold" style="color: #a855f7;">ClawJacked</h3>
      <p class="text-base op-70 mt-2">CVE-2026-32027</p>
      <p class="text-base op-50 mt-1">2026-03-20</p>
      <p class="text-base op-50 mt-1">OpenClaw</p>
    </div>

  </div>
</section>

<section data-pipeline>
  <h2 class="text-4xl font-bold mb-12">Agentic workflow</h2>
  <PipelineGraph />
</section>

<section data-starfield>
  <h1 class="text-5xl font-bold" style="color: #ec4899;">react2shell</h1>
  <p class="text-2xl mt-4 op-70">CVE-2025-55182</p>
</section>

<section data-starfield>
  <h1 class="text-5xl font-bold" style="color: #3b82f6;">SharePoint RCE</h1>
  <p class="text-2xl mt-4 op-70">CVE-2025-53770</p>
</section>

<section data-starfield>
  <h1 class="text-5xl font-bold" style="color: #a855f7;">ClawJacked</h1>
  <p class="text-2xl mt-4 op-70">CVE-2026-32027</p>
</section>

<section data-starfield>
  <MondooLogoFull width={555} height={108} />
  <p class="mt-8 text-2xl op-70">Booth 4425 · North Expo Hall</p>
  <p class="mt-4 text-2xl op-70">mondoo.com</p>
</section>
