<script lang="ts">
  import MondooLogoFull from './components/MondooLogoFull.svelte'
  import PipelineGraph from './components/PipelineGraph.svelte'
  import DiscoveryGraph from './components/DiscoveryGraph.svelte'
  import CveStream from './components/CveStream.svelte'
  import autopilotBg from '/images/autopilot-bg.png'
  import codingBg from '/images/coding-bg.jpg'
  import controlRoomBg from '/images/control-room-bg.jpg'
  import oppenheimerImg from '/images/oppenheimer.jpg'
  import AnalysisBlock from './components/AnalysisBlock.svelte'
  import EvaluationBlock from './components/EvaluationBlock.svelte'
  import OpsConsiderations from './components/OpsConsiderations.svelte'
  import KandjiBlock from './components/KandjiBlock.svelte'
  import IntuneBlock from './components/IntuneBlock.svelte'
  import AgentOverview from './components/AgentOverview.svelte'
  import CumulativeChart from './components/CumulativeChart.svelte'
  import AgentModel511 from './components/AgentModel511.svelte'
  import NutritionBadge from './components/NutritionBadge.svelte'
  import BlastRadiusGraph from './components/BlastRadiusGraph.svelte'
</script>

<section data-starfield>
  <MondooLogoFull width={555} height={108} />
</section>

<section data-starfield>
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
      <h3 class="text-2xl font-bold" style="color: #3b82f6;">ToolShell</h3>
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

<section>
  <h2 class="text-4xl font-bold mb-12">Before we start</h2>
  <div class="text-left max-w-3xl mx-auto text-2xl">
    <p class="fragment" data-fragment-index="0">1. Basics of Agentic AI</p>
    <p class="fragment mt-6" data-fragment-index="1">2. Context &gt; Agent</p>
    <p class="fragment mt-6" data-fragment-index="2">3. Security best-practices</p>
  </div>
</section>

<section>
  <h2 class="text-4xl font-bold mb-12">Code-security 101</h2>
  <div class="text-left max-w-3xl mx-auto text-2xl">
    <p class="fragment" data-fragment-index="0">1. SDLC automation</p>
    <p class="fragment mt-6" data-fragment-index="1">2. Security reviews in pipelines <span class="op-70 text-xl">(policy+AI)</span></p>
    <p class="fragment mt-6" data-fragment-index="2">3. SBOMs</p>
    <p class="fragment mt-10 text-xl op-80" data-fragment-index="3" style="display: inline-flex; align-items: center; gap: 0.5rem;">
      <span>If you have questions:</span>
      <a href="https://www.linkedin.com/in/dominikrichter" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.4rem; color: var(--link-color); text-decoration: none;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
        </svg>
        <span>dominikrichter</span>
      </a>
    </p>
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

<section data-starfield data-autoslide="1000">
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
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">Business Impact — does it matter?</h2>
  <div class="mb-8">
    <NutritionBadge
      highlight={['business']}
      categories={[
        { name: 'business', label: 'Biz Impact', impact: 1, isActive: true, factor: 'business' },
        { name: 'surface', label: 'Atk Surface', impact: 1, isActive: true, factor: 'surface' },
        { name: 'exploit', label: 'Exploits', impact: 1, isActive: true, factor: 'exploit' },
        { name: 'connection', label: 'Blast', impact: 1, isActive: true, factor: 'connection' },
        { name: 'news', label: 'News', impact: 1, isActive: true, factor: 'news' },
      ]}
    />
  </div>
  <div class="max-w-3xl mx-auto text-lg text-center">
    <p class="op-70">Customer data, critical systems vs. internal tools, test systems</p>
  </div>
</section>

<section data-analysis>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">Attack Surface — is it real?</h2>
  <div class="mb-8">
    <NutritionBadge highlight={['surface']} shown={['business']} categories={[
      { name: 'business', label: 'Biz Impact', impact: 1, isActive: true, factor: 'business' },
      { name: 'surface', label: 'Atk Surface', impact: 1, isActive: true, factor: 'surface' },
      { name: 'exploit', label: 'Exploits', impact: 1, isActive: true, factor: 'exploit' },
      { name: 'connection', label: 'Blast', impact: 1, isActive: true, factor: 'connection' },
      { name: 'news', label: 'News', impact: 1, isActive: true, factor: 'news' },
    ]} />
  </div>
  <div class="max-w-3xl mx-auto text-lg text-center">
    <p class="op-70 mb-6">Drill into versions, packages, runtime, and network exposure</p>
  </div>
  <AnalysisBlock />
</section>

<section>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">Exploitability — can they do it?</h2>
  <div class="mb-8">
    <NutritionBadge highlight={['exploit']} shown={['business', 'surface']} categories={[
      { name: 'business', label: 'Biz Impact', impact: 1, isActive: true, factor: 'business' },
      { name: 'surface', label: 'Atk Surface', impact: 1, isActive: true, factor: 'surface' },
      { name: 'exploit', label: 'Exploits', impact: 1, isActive: true, factor: 'exploit' },
      { name: 'connection', label: 'Blast', impact: 1, isActive: true, factor: 'connection' },
      { name: 'news', label: 'News', impact: 1, isActive: true, factor: 'news' },
    ]} />
  </div>
  <div class="max-w-3xl mx-auto text-lg text-center">
    <p class="op-70">Public exploits exist, no auth required, actively exploited in the wild</p>
  </div>
</section>

<section>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">Blast Radius — does it hurt?</h2>
  <div class="mb-8">
    <NutritionBadge highlight={['connection']} shown={['business', 'surface', 'exploit']} categories={[
      { name: 'business', label: 'Biz Impact', impact: 1, isActive: true, factor: 'business' },
      { name: 'surface', label: 'Atk Surface', impact: 1, isActive: true, factor: 'surface' },
      { name: 'exploit', label: 'Exploits', impact: 1, isActive: true, factor: 'exploit' },
      { name: 'connection', label: 'Blast', impact: 1, isActive: true, factor: 'connection' },
      { name: 'news', label: 'News', impact: 1, isActive: true, factor: 'news' },
    ]} />
  </div>
  <div class="max-w-3xl mx-auto text-lg text-center">
    <p class="op-70 mb-6">RCE on the server process — what can the attacker reach?</p>
  </div>

  <BlastRadiusGraph data={{
    asset: { title: 'Service', subtitle: 'react2shell', risk: 100 },
    local: [
      { title: 'Env Vars', type: 'secrets', count: 2, children: [
        { title: 'API keys', risk: 80 },
        { title: 'DB creds', risk: 80 },
      ]},
      { title: 'Databases', type: 'database', count: 3, children: [
        { title: 'PostgreSQL', risk: 100 },
        { title: 'Redis', risk: 100 },
        { title: 'S3', risk: 100 },
      ]},
      { title: 'User Data', type: 'database', count: 3, children: [
        { title: 'PII', risk: 100 },
        { title: 'Tokens', risk: 100 },
        { title: 'Sessions', risk: 100 },
      ]},
    ],
    remote: [
      { title: 'Internal APIs', type: 'webserver', count: 3, children: [
        { title: 'payment', risk: 80 },
        { title: 'auth', risk: 80 },
        { title: 'admin', risk: 80 },
      ]},
      { title: 'Other Services', type: 'webserver', count: 2, children: [
        { title: 'build servers', risk: 50 },
        { title: 'clusters', risk: 50 },
      ]},
    ],
  }} />
</section>

<section>
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">News & Intel</h2>
  <div class="mb-8">
    <NutritionBadge highlight={['news']} shown={['business', 'surface', 'exploit', 'connection']} categories={[
      { name: 'business', label: 'Biz Impact', impact: 1, isActive: true, factor: 'business' },
      { name: 'surface', label: 'Atk Surface', impact: 1, isActive: true, factor: 'surface' },
      { name: 'exploit', label: 'Exploits', impact: 1, isActive: true, factor: 'exploit' },
      { name: 'connection', label: 'Blast', impact: 1, isActive: true, factor: 'connection' },
      { name: 'news', label: 'News', impact: 1, isActive: true, factor: 'news' },
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
  <h2 class="text-3xl font-bold mb-8" style="color: #a855f7;">Overall Evaluation</h2>
  <div class="mb-8">
    <NutritionBadge shown={['business', 'surface', 'exploit', 'connection', 'news']} categories={[
      { name: 'business', label: 'Biz Impact', impact: 1, isActive: true, factor: 'business' },
      { name: 'surface', label: 'Atk Surface', impact: 1, isActive: true, factor: 'surface' },
      { name: 'exploit', label: 'Exploits', impact: 1, isActive: true, factor: 'exploit' },
      { name: 'connection', label: 'Blast', impact: 1, isActive: true, factor: 'connection' },
      { name: 'news', label: 'News', impact: 1, isActive: true, factor: 'news' },
    ]} />
  </div>
  <div class="max-w-3xl mx-auto text-lg text-center">
    <p class="op-70 mb-6">Adjust overall evaluation based on previous results</p>
  </div>
  <EvaluationBlock />
</section>

<section>
  <div class="flex gap-10 justify-center items-end max-w-5xl mx-auto">
    <div class="text-center">
      <img src={oppenheimerImg} alt="Happy Oppenheimer" style="width: 320px; height: 480px; object-fit: cover; object-position: left center; clip-path: inset(0 0 10% 0); border-radius: 8px; display: block; margin: 0 auto;" />
      <p class="text-xl mt-4 font-bold" style="color: #70c748;">Straightforward fix</p>
    </div>
    <div class="fragment text-center" data-fragment-index="0">
      <img src={oppenheimerImg} alt="Sad Oppenheimer" style="width: 320px; height: 480px; object-fit: cover; object-position: right center; clip-path: inset(0 0 10% 1px); border-radius: 8px; display: block; margin: 0 auto;" />
      <p class="text-xl mt-4 font-bold" style="color: #f8444d;">Operational considerations</p>
    </div>
  </div>
</section>

<section>
  <PipelineGraph highlight={2} />
</section>

<section data-starfield>
  <h1 class="text-5xl font-bold" style="color: #3b82f6;">ToolShell</h1>
  <p class="text-2xl mt-4 op-70">CVE-2025-53770</p>
</section>

<section data-starfield data-autoslide="1000">
  <h2 class="text-3xl font-bold mb-8" style="color: #3b82f6;">ToolShell</h2>
  <div class="text-left max-w-3xl mx-auto text-lg">
    <p class="fragment" data-fragment-index="0" data-autoslide="1000"><span class="font-bold">CVSS 9.8</span> <span class="op-70">— pre-auth RCE in SharePoint Server</span></p>
    <p class="fragment mt-4" data-fragment-index="1" data-autoslide="1000"><span class="font-bold">Affected:</span> <span class="op-70">SharePoint Server 2016, 2019 &amp; Subscription Edition</span></p>
    <p class="fragment mt-4" data-fragment-index="2" data-autoslide="1000"><span class="font-bold">Nation-state exploited</span> <span class="op-70">— APT27/APT31, CISA KEV, ransomware campaigns</span></p>
    <p class="fragment mt-4" data-fragment-index="3" data-autoslide="9999999"><span class="font-bold">Threats:</span> <span class="op-70">APT27/APT31, ransomware, HijackSharePointServer, MachineKeyFinder</span></p>
  </div>
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

<section data-starfield data-autoslide="1000">
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

<section>
  <PipelineGraph highlight={3} />
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

<section data-kandji>
  <h2 class="text-3xl font-bold mb-2" style="color: #a855f7;">Kandji</h2>
  <p class="text-lg op-70 mb-6">Audit and remediation scripts configured</p>
  <KandjiBlock />
</section>

<section data-intune>
  <h2 class="text-3xl font-bold mb-2" style="color: #3b82f6;">Intune</h2>
  <p class="text-lg op-70 mb-6">Detect + remediate via PowerShell</p>
  <IntuneBlock />
</section>

<section>
  <AgentOverview />
</section>

<section data-background-image={controlRoomBg} data-background-size="cover" data-background-opacity="0.25">
  <h1 class="text-5xl font-bold">Stay in control</h1>
</section>

<section>
  <h2 class="text-3xl font-bold mb-6">Speed-up remediations</h2>
  <p class="text-base op-50 mb-6">Historical totals: how much has been done</p>
  <CumulativeChart />
</section>

<section data-starfield>
  <MondooLogoFull width={555} height={108} />
  <p class="mt-8 text-2xl op-70">Booth 2411</p>
  <p class="mt-4 text-2xl op-70">
    <a href="https://mondoo.com" target="_blank" rel="noopener noreferrer" style="color: var(--link-color); text-decoration: none;">mondoo.com</a>
  </p>
  <p class="mt-8 text-xl op-80" style="display: inline-flex; align-items: center; gap: 0.4rem;">
    <a href="https://www.linkedin.com/in/dominikrichter" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.4rem; color: var(--link-color); text-decoration: none;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
      </svg>
      <span>dominikrichter</span>
    </a>
  </p>
</section>
