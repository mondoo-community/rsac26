<script lang="ts">
  import MondooLogoFull from './components/MondooLogoFull.svelte'
  import PipelineGraph from './components/PipelineGraph.svelte'
  import DiscoveryGraph from './components/DiscoveryGraph.svelte'
  import CveStream from './components/CveStream.svelte'
  import AgentModel511 from './components/AgentModel511.svelte'
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

<section data-autoslide="1000">
  <h2 class="text-3xl font-bold mb-8" style="color: #ec4899;">react2shell</h2>
  <div class="text-left max-w-3xl mx-auto text-lg">
    <p class="fragment" data-fragment-index="0" data-autoslide="1000"><span class="font-bold">CVSS 10.0</span> <span class="op-70">— unauthenticated RCE via unsafe deserialization in React Server Components</span></p>
    <p class="fragment mt-4" data-fragment-index="1" data-autoslide="1000"><span class="font-bold">Affected:</span> <span class="op-70">React <code>react-server-dom-*</code> 19.0.0–19.2.0, Next.js 15.x/16.x</span></p>
    <p class="fragment mt-4" data-fragment-index="2" data-autoslide="1000"><span class="font-bold">Actively exploited</span> <span class="op-70">— no auth, no user interaction, network-exploitable</span></p>
    <p class="fragment mt-4" data-fragment-index="3" data-autoslide="9999999"><span class="font-bold">Threats:</span> <span class="op-70">RCE, data exfiltration, internal pivoting, supply chain attacks</span></p>
  </div>
</section>

<section>
  <PipelineGraph highlight={0} />
</section>

<section>
  <DiscoveryGraph />
</section>

<section data-cve-stream>
  <CveStream />
</section>

<section>
  <PipelineGraph highlight={1} />
</section>

<section>
  <AgentModel511 />
</section>

<section>
  <h3 class="text-xl op-50 mb-2">Agent 1</h3>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">Business Impact — does it matter?</h2>
  <div class="text-left max-w-3xl mx-auto text-lg">
    <p><span class="op-70">What do the affected React/Next.js apps do?</span> <span class="op-50">Customer-facing SaaS, internal tools, marketing sites?</span></p>
    <p class="mt-4"><span class="op-70">What data flows through them?</span> <span class="op-50">PII, payment, auth tokens?</span></p>
    <p class="mt-4"><span class="op-70">Revenue impact if compromised</span> <span class="op-50">vs. a static marketing site</span></p>
  </div>
</section>

<section>
  <h3 class="text-xl op-50 mb-2">Agent 2</h3>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">Attack Surface — is it real?</h2>
  <div class="text-left max-w-3xl mx-auto text-lg">
    <p><span class="op-70">React 19+ only</span> <span class="op-50">— React 18 and below are not affected</span></p>
    <p class="mt-4"><span class="op-70">React Server Components specifically</span> <span class="op-50">— client-side-only apps are not vulnerable</span></p>
    <p class="mt-4"><span class="op-70">Check actual packages:</span> <span class="op-50">react-server-dom-webpack, -turbopack, -parcel</span></p>
    <p class="mt-4"><span class="op-70">Next.js App Router vs Pages Router</span> <span class="op-50">— Pages Router does not use RSC</span></p>
    <p class="mt-4"><span class="op-70">Server Functions ("use server") must exist</span> <span class="op-50">for the endpoint to be reachable</span></p>
    <p class="mt-4"><span class="op-70">Static/SSG-only builds are safe</span> <span class="op-50">— no running server, nothing to exploit</span></p>
    <p class="mt-4"><span class="op-70">Is it internet-facing?</span> <span class="op-50">Internal app behind VPN = very different risk profile</span></p>
  </div>
</section>

<section>
  <h3 class="text-xl op-50 mb-2">Agent 3</h3>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">Blast Radius — does it hurt?</h2>
  <div class="text-left max-w-3xl mx-auto text-lg">
    <p><span class="op-70">Environment variables</span> <span class="op-50">— API keys, DB connection strings, third-party secrets</span></p>
    <p class="mt-4"><span class="op-70">Internal network pivoting</span> <span class="op-50">— databases, internal APIs, other services</span></p>
    <p class="mt-4"><span class="op-70">Isolation level</span> <span class="op-50">— container with limited scope vs. VM with broad access</span></p>
    <p class="mt-4"><span class="op-70">Shared infrastructure</span> <span class="op-50">— multiple apps on the same Node server or cluster</span></p>
    <p class="mt-4"><span class="op-70">Supply chain angle</span> <span class="op-50">— build/preview server compromise propagating to production</span></p>
  </div>
</section>

<section>
  <h3 class="text-xl op-50 mb-2">Agent 4</h3>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">Exploitability — can they do it?</h2>
  <div class="text-left max-w-3xl mx-auto text-lg">
    <p><span class="font-bold op-70">CVSS 10</span> <span class="op-50">— no auth, no user interaction, network-exploitable</span></p>
    <p class="mt-4"><span class="op-70">Public exploits exist</span> <span class="op-50">— actively exploited in the wild</span></p>
  </div>
</section>

<section>
  <h3 class="text-xl op-50 mb-2">Agent 5</h3>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">News & Intel</h2>
  <div class="text-left max-w-3xl mx-auto text-lg">
    <p><span class="op-70">Named vulnerability ("react2shell")</span> <span class="op-50">— major coverage</span></p>
    <p class="mt-4"><span class="op-70">React/Next.js is one of the most widely used web frameworks</span> <span class="op-50">— high visibility</span></p>
  </div>
</section>

<section data-starfield>
  <h1 class="text-5xl font-bold" style="color: #3b82f6;">SharePoint RCE</h1>
  <p class="text-2xl mt-4 op-70">CVE-2025-53770</p>
</section>

<section data-autoslide="1000">
  <h2 class="text-3xl font-bold mb-8" style="color: #3b82f6;">SharePoint RCE</h2>
  <div class="text-left max-w-3xl mx-auto text-lg">
    <p class="fragment" data-fragment-index="0" data-autoslide="1000"><span class="font-bold">CVSS 9.8</span> <span class="op-70">— pre-auth RCE in SharePoint Server</span></p>
    <p class="fragment mt-4" data-fragment-index="1" data-autoslide="1000"><span class="font-bold">Affected:</span> <span class="op-70">SharePoint Server 2016, 2019 &amp; Subscription Edition</span></p>
    <p class="fragment mt-4" data-fragment-index="2" data-autoslide="1000"><span class="font-bold">Nation-state exploited</span> <span class="op-70">— APT27/APT31, CISA KEV, ransomware campaigns</span></p>
    <p class="fragment mt-4" data-fragment-index="3" data-autoslide="9999999"><span class="font-bold">Threats:</span> <span class="op-70">APT27/APT31, ransomware, HijackSharePointServer, MachineKeyFinder</span></p>
  </div>
</section>

<section data-starfield>
  <h1 class="text-5xl font-bold" style="color: #a855f7;">ClawJacked</h1>
  <p class="text-2xl mt-4 op-70">CVE-2026-32027</p>
</section>

<section data-autoslide="1000">
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">ClawJacked</h2>
  <div class="text-left max-w-3xl mx-auto text-lg">
    <p class="fragment" data-fragment-index="0" data-autoslide="1000"><span class="font-bold">CVSS 7.1</span> <span class="op-70">— malicious websites hijack OpenClaw to steal data</span></p>
    <p class="fragment mt-4" data-fragment-index="1" data-autoslide="1000"><span class="font-bold">Affected:</span> <span class="op-70">OpenClaw versions before 2026.2.26</span></p>
    <p class="fragment mt-4" data-fragment-index="2" data-autoslide="1000"><span class="font-bold">Widely deployed AI tool</span> <span class="op-70">— massive blast radius, in the news</span></p>
    <p class="fragment mt-4" data-fragment-index="3" data-autoslide="9999999"><span class="font-bold">Threats:</span> <span class="op-70">Data theft via browser hijack, credential exfiltration, session hijacking</span></p>
  </div>
</section>

<section data-starfield>
  <MondooLogoFull width={555} height={108} />
  <p class="mt-8 text-2xl op-70">Booth 4425 · North Expo Hall</p>
  <p class="mt-4 text-2xl op-70">mondoo.com</p>
</section>
