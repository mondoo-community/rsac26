<script lang="ts">
  import MondooLogoFull from './components/MondooLogoFull.svelte'
  import PipelineGraph from './components/PipelineGraph.svelte'
  import DiscoveryGraph from './components/DiscoveryGraph.svelte'
  import CveStream from './components/CveStream.svelte'
  import autopilotBg from '/images/autopilot-bg.png'
  import codingBg from '/images/coding-bg.jpg'
  import AnalysisBlock from './components/AnalysisBlock.svelte'
  import EvaluationBlock from './components/EvaluationBlock.svelte'
  import OpsConsiderations from './components/OpsConsiderations.svelte'
  import AgentModel511 from './components/AgentModel511.svelte'
  import NutritionBadge from './components/NutritionBadge.svelte'
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
  <div class="mb-8">
    <NutritionBadge
      baseScore="10.0"
      baseLabel="Critical"
      highlight={['base-score', 'business']}
      categories={[
        { name: 'business', label: 'Business', impact: 1, isActive: true, factor: 'business' },
        { name: 'surface', label: 'Atk Surface', impact: 1, isActive: true, factor: 'surface' },
        { name: 'exploit', label: 'Exploits', impact: 1, isActive: true, factor: 'exploit' },
        { name: 'connection', label: 'Connection', impact: 1, isActive: true, factor: 'connection' },
        { name: 'news', label: 'News', impact: 0.6, isActive: true, factor: 'news' },
      ]}
    />
  </div>
  <div class="max-w-3xl mx-auto text-lg text-center">
    <p class="op-70">Customer-facing, critical systems vs. internal tools, test systems</p>
  </div>
</section>

<section data-analysis>
  <h3 class="text-xl op-50 mb-2">Agent 2</h3>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">Attack Surface — is it real?</h2>
  <div class="mb-8">
    <NutritionBadge baseScore="10.0" highlight={['surface']} categories={[
      { name: 'business', label: 'Business', impact: 1, isActive: true, factor: 'business' },
      { name: 'surface', label: 'Atk Surface', impact: 1, isActive: true, factor: 'surface' },
      { name: 'exploit', label: 'Exploits', impact: 1, isActive: true, factor: 'exploit' },
      { name: 'connection', label: 'Connection', impact: 1, isActive: true, factor: 'connection' },
      { name: 'news', label: 'News', impact: 0.6, isActive: true, factor: 'news' },
    ]} />
  </div>
  <div class="max-w-3xl mx-auto text-lg text-center">
    <p class="op-70 mb-6">Drill into versions, packages, runtime, and network exposure</p>
  </div>
  <AnalysisBlock />
</section>

<section>
  <h3 class="text-xl op-50 mb-2">Agent 3</h3>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">Exploitability — can they do it?</h2>
  <div class="mb-8">
    <NutritionBadge baseScore="10.0" highlight={['exploit']} categories={[
      { name: 'business', label: 'Business', impact: 1, isActive: true, factor: 'business' },
      { name: 'surface', label: 'Atk Surface', impact: 1, isActive: true, factor: 'surface' },
      { name: 'exploit', label: 'Exploits', impact: 1, isActive: true, factor: 'exploit' },
      { name: 'connection', label: 'Connection', impact: 1, isActive: true, factor: 'connection' },
      { name: 'news', label: 'News', impact: 0.6, isActive: true, factor: 'news' },
    ]} />
  </div>
  <div class="max-w-3xl mx-auto text-lg text-center">
    <p class="op-70">Public exploits exist, no auth required, actively exploited in the wild</p>
  </div>
</section>

<section>
  <h3 class="text-xl op-50 mb-2">Agent 4</h3>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">Blast Radius — does it hurt?</h2>
  <div class="mb-8">
    <NutritionBadge baseScore="10.0" highlight={['connection']} categories={[
      { name: 'business', label: 'Business', impact: 1, isActive: true, factor: 'business' },
      { name: 'surface', label: 'Atk Surface', impact: 1, isActive: true, factor: 'surface' },
      { name: 'exploit', label: 'Exploits', impact: 1, isActive: true, factor: 'exploit' },
      { name: 'connection', label: 'Connection', impact: 1, isActive: true, factor: 'connection' },
      { name: 'news', label: 'News', impact: 0.6, isActive: true, factor: 'news' },
    ]} />
  </div>
  <div class="max-w-3xl mx-auto text-lg text-center">
    <p class="op-70 mb-6">RCE on the server process — what can the attacker reach?</p>
  </div>

  <!-- Blast radius diagram -->
  <svg viewBox="0 0 700 260" style="width: 650px; margin: 0 auto; display: block;">
    <!-- Compromised service (center) -->
    <rect x="260" y="90" width="180" height="50" rx="8" fill="#dc2626" fill-opacity="0.15" stroke="#dc2626" stroke-width="1.5"/>
    <text x="350" y="120" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" font-family="IBM Plex Mono, monospace">Service</text>

    <!-- Env vars / secrets -->
    <rect x="10" y="10" width="150" height="44" rx="6" fill="#2a2a3a" stroke="rgba(168,85,247,0.4)" stroke-width="1.5"/>
    <text x="85" y="28" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10" font-family="IBM Plex Mono, monospace">ENV VARS</text>
    <text x="85" y="42" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9" font-family="IBM Plex Mono, monospace">API keys, DB creds</text>
    <line x1="160" y1="32" x2="260" y2="100" stroke="rgba(220,38,38,0.5)" stroke-width="1.5" stroke-dasharray="4 3"/>

    <!-- Database -->
    <rect x="10" y="170" width="150" height="44" rx="6" fill="#2a2a3a" stroke="rgba(168,85,247,0.4)" stroke-width="1.5"/>
    <text x="85" y="188" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10" font-family="IBM Plex Mono, monospace">Databases</text>
    <text x="85" y="202" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9" font-family="IBM Plex Mono, monospace">PostgreSQL, Redis, S3</text>
    <line x1="160" y1="192" x2="260" y2="130" stroke="rgba(220,38,38,0.5)" stroke-width="1.5" stroke-dasharray="4 3"/>

    <!-- User data -->
    <rect x="540" y="10" width="150" height="44" rx="6" fill="#2a2a3a" stroke="rgba(168,85,247,0.4)" stroke-width="1.5"/>
    <text x="615" y="28" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10" font-family="IBM Plex Mono, monospace">User Data</text>
    <text x="615" y="42" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9" font-family="IBM Plex Mono, monospace">PII, tokens, sessions</text>
    <line x1="540" y1="32" x2="440" y2="100" stroke="rgba(220,38,38,0.5)" stroke-width="1.5" stroke-dasharray="4 3"/>

    <!-- Internal APIs -->
    <rect x="540" y="105" width="150" height="44" rx="6" fill="#2a2a3a" stroke="rgba(168,85,247,0.4)" stroke-width="1.5"/>
    <text x="615" y="123" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10" font-family="IBM Plex Mono, monospace">Internal APIs</text>
    <text x="615" y="137" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9" font-family="IBM Plex Mono, monospace">payment, auth, admin</text>
    <line x1="540" y1="127" x2="440" y2="118" stroke="rgba(220,38,38,0.5)" stroke-width="1.5" stroke-dasharray="4 3"/>

    <!-- Other services / supply chain -->
    <rect x="540" y="200" width="150" height="44" rx="6" fill="#2a2a3a" stroke="rgba(168,85,247,0.4)" stroke-width="1.5"/>
    <text x="615" y="218" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10" font-family="IBM Plex Mono, monospace">Other Services</text>
    <text x="615" y="232" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="9" font-family="IBM Plex Mono, monospace">build servers, clusters</text>
    <line x1="540" y1="222" x2="440" y2="135" stroke="rgba(220,38,38,0.5)" stroke-width="1.5" stroke-dasharray="4 3"/>

    <!-- Internal network -->
    <rect x="220" y="200" width="260" height="44" rx="6" fill="rgba(220,38,38,0.06)" stroke="rgba(220,38,38,0.3)" stroke-width="1" stroke-dasharray="4 3"/>
    <text x="350" y="226" text-anchor="middle" fill="rgba(220,38,38,0.6)" font-size="10" font-family="IBM Plex Mono, monospace">← internal network pivot →</text>
  </svg>
</section>

<section>
  <h3 class="text-xl op-50 mb-2">Agent 5</h3>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">News & Intel</h2>
  <div class="mb-8">
    <NutritionBadge baseScore="10.0" highlight={['news']} categories={[
      { name: 'business', label: 'Business', impact: 1, isActive: true, factor: 'business' },
      { name: 'surface', label: 'Atk Surface', impact: 1, isActive: true, factor: 'surface' },
      { name: 'exploit', label: 'Exploits', impact: 1, isActive: true, factor: 'exploit' },
      { name: 'connection', label: 'Connection', impact: 1, isActive: true, factor: 'connection' },
      { name: 'news', label: 'News', impact: 0.6, isActive: true, factor: 'news' },
    ]} />
  </div>
  <div class="max-w-3xl mx-auto text-lg text-center">
    <p class="op-70 mb-8">Named vulnerability with major coverage across the most widely used web framework</p>
  </div>
  <div class="max-w-2xl mx-auto text-left text-sm" style="font-family: 'IBM Plex Mono', monospace;">
    <p class="op-50 mb-3">Coverage:</p>
    <p class="op-70 mb-2">→ mondoo.com/blog/how-to-fix-critical-react-and-next-js-vulnerabilities</p>
    <p class="op-70 mb-2">→ bleepingcomputer.com/news/security/react2shell-rce</p>
    <p class="op-70 mb-2">→ thehackernews.com/2025/12/react-nextjs-critical-rce</p>
    <p class="op-70 mb-2">→ securityweek.com/react-server-components-deserialization-flaw</p>
    <p class="op-70">→ cve.org/CVERecord?id=CVE-2025-55182</p>
    <p class="op-50 mt-2">...</p>
  </div>
</section>

<section data-evaluation>
  <h3 class="text-xl op-50 mb-2">Agent 6</h3>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">AI Evaluation</h2>
  <div class="max-w-3xl mx-auto text-lg text-center">
    <p class="op-70 mb-6">Adjust overall evaluation based on previous agents</p>
  </div>
  <EvaluationBlock />
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

<section>
  <PipelineGraph highlight={2} />
</section>

<section>
  <h2 class="text-4xl font-bold mb-6">Why are fixes slow?</h2>
  <p class="text-2xl op-70">Why don't people take action on findings faster?</p>
</section>

<section data-ops-considerations>
  <h2 class="text-3xl font-bold mb-8" style="color: #3b82f6;">1: Operational Considerations</h2>
  <OpsConsiderations />
</section>

<section>
  <h2 class="text-3xl font-bold mb-8" style="color: #3b82f6;">2: Mitigation vs Fix</h2>
  <div class="text-left max-w-3xl mx-auto text-base">
    <p class="fragment op-70" data-fragment-index="0"><span class="font-bold" style="color: #06b6d4;">1. Network mitigation</span> <span class="op-50">(low disruption)</span> — restrict access, block exploit patterns at WAF/firewall</p>
    <p class="fragment mt-3 op-70" data-fragment-index="1"><span class="font-bold" style="color: #3b82f6;">2. AMSI enablement</span> <span class="op-50">(medium disruption)</span> — detection without patching, catches known signatures</p>
    <p class="fragment mt-3 op-70" data-fragment-index="2"><span class="font-bold" style="color: #a855f7;">3. KB patches + PSConfig</span> <span class="op-50">(high disruption)</span> — the actual fix, requires maintenance window</p>
    <p class="fragment mt-3 op-70" data-fragment-index="3"><span class="font-bold" style="color: #ec4899;">4. Machine key rotation</span> <span class="op-50">(high disruption)</span> — assume keys compromised (APT27/APT31)</p>
  </div>
</section>

<section>
  <h2 class="text-3xl font-bold mb-8" style="color: #3b82f6;">3: Pre-flight + Rollback</h2>
  <div class="flex gap-8 max-w-4xl mx-auto text-base">
    <div class="fragment semi-fade-out flex-1 text-center" data-fragment-index="1" style="background: rgba(255,255,255,0.04); border: 1.5px solid rgba(168,85,247,0.4); border-radius: 12px; padding: 1.5rem;">
      <h3 class="font-bold text-xl mb-4" style="color: #a855f7;">Pre-flight</h3>
      <p class="op-70">Check for IOCs</p>
      <p class="op-50 mt-1 text-sm">SuspSignoutReq.A</p>
      <p class="op-50 mt-1 text-sm">HijackSharePointServer.A</p>
      <p class="op-50 mt-1 text-sm">MachineKeyFinder.DA!amsi</p>
      <p class="op-70 mt-4">=&gt; Incident Response</p>
    </div>
    <div class="fragment flex-1 text-center" data-fragment-index="1" style="background: rgba(255,255,255,0.04); border: 1.5px solid rgba(59,130,246,0.4); border-radius: 12px; padding: 1.5rem;">
      <h3 class="font-bold text-xl mb-4" style="color: #3b82f6;">Rollback</h3>
      <p class="op-70">KBs can be uninstalled</p>
      <p class="op-50 mt-1 text-sm">but PSConfig schema changes cannot<br/>=&gt; full farm DB backup required</p>
      <p class="op-70 mt-4">Machine key rotation is irreversible</p>
      <p class="op-50 mt-1 text-sm">without backed-up keys</p>
      <p class="op-70 mt-4">AMSI can be disabled easily</p>
    </div>
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

<section>
  <h2 class="text-4xl font-bold mb-6">Last one!</h2>
  <div class="max-w-3xl mx-auto text-lg text-center">
    <p class="op-70"><span class="font-bold" style="color: #3b82f6;">Analysis:</span> Endpoints, exploitable, news, massive blast radius</p>
    <p class="op-70 mt-4"><span class="font-bold" style="color: #a855f7;">Plan:</span> Patch and update the components</p>
  </div>
</section>

<section data-background-image={autopilotBg} data-background-size="cover" data-background-opacity="0.3">
  <h1 class="text-5xl font-bold">Auto-pilot remediations</h1>
</section>

<section data-background-image={codingBg} data-background-size="cover" data-background-opacity="0.3">
  <h1 class="text-5xl font-bold">Auto-pilot remediations</h1>
</section>

<section data-autoslide="600">
  <h2 class="text-4xl font-bold mb-4">Stable, Scalable, Predictable</h2>
  <p class="text-xl op-70 mb-10">Use battle-tested solutions to automate remediation</p>
  <div class="flex justify-center items-end gap-12 max-w-4xl mx-auto op-80">
    <!-- Ansible -->
    <div class="fragment text-center" data-fragment-index="0" data-autoslide="600">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="11" fill="none" stroke="white" stroke-width="1.2"/><path d="M12 4.5l5.5 12.5h-2l-1.5-3.5L9.5 17l-1-2.2L12 4.5zm0 4.5l-2.5 5.5 4-3L12 9z" fill="white"/></svg>
      <p class="text-sm mt-2 op-70">Ansible</p>
    </div>
    <!-- Terraform -->
    <div class="fragment text-center" data-fragment-index="1" data-autoslide="600">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><path d="M1 4.5v6l5.25 3V7.5L1 4.5z" fill-opacity="0.5"/><path d="M7.5 7.5v6L12.75 10.5v-6L7.5 7.5z"/><path d="M14 7.5v6l5.25-3v-6L14 7.5z"/><path d="M7.5 14.75v6l5.25-3v-6l-5.25 3z"/></svg>
      <p class="text-sm mt-2 op-70">Terraform</p>
    </div>
    <!-- Microsoft Intune -->
    <div class="fragment text-center" data-fragment-index="2" data-autoslide="600">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="white" stroke-width="1.2"/><path d="M7 8h10v2H7zm0 3h10v2H7zm0 3h6v2H7z" fill="white" fill-opacity="0.7"/><circle cx="17" cy="17" r="3" fill="white"/><path d="M16 17l1 1 2-2" stroke="#2a2a3a" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <p class="text-sm mt-2 op-70">Intune</p>
    </div>
    <!-- Kandji -->
    <div class="fragment text-center" data-fragment-index="3" data-autoslide="600">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke="white" stroke-width="1.2"/><path d="M8.5 8l3.5 4-3.5 4M12.5 16h3.5" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <p class="text-sm mt-2 op-70">Kandji</p>
    </div>
    <!-- PowerShell -->
    <div class="fragment text-center" data-fragment-index="4" data-autoslide="9999999">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="white" stroke-width="1.2"/><path d="M6 8l4 4-4 4" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="16" x2="18" y2="16" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>
      <p class="text-sm mt-2 op-70">PowerShell</p>
    </div>
  </div>
</section>

<section data-starfield>
  <MondooLogoFull width={555} height={108} />
  <p class="mt-8 text-2xl op-70">Booth 4425 · North Expo Hall</p>
  <p class="mt-4 text-2xl op-70">mondoo.com</p>
</section>
