# Agentic Vuln Talk RSA 2026

## Brief

We'll explore one of the latest vulnerabilities making headlines and show you how to solve it end-to-end using modern solutions. We will not only walk you through its technical details but also demonstrate how to set up automated workflows to identify, analyze, and fix it. You'll learn how to leverage the latest in automation and agentic AI to remediate your servers, containers, and repositories.

### Approach

- go down vuln by vuln, explain major phases one by one, ie:
  - analyze: react2shell
  - plan: sharepoint server RCE (why: multiple operational steps and considerations)
  - fix/remediate: openclaw (why: easy kandji+intune)
- do overall structure first, then go vuln by vuln
  - also a possibility, traditional
=> i'll go with vuln by vuln to keep it interesting from the first minute

how to show this:
- create a dynamic/animated flow and show how steps are run, make it a mini-UI


# The Talk

- we will go down a couple of interesting vulnerabilities that (hopefully) y'all heard about
- we'll see how to make the robots do work for you in how you approach, plan and fix them
- we'll explore inidividual phases as we cover vulnerabilities
  - just as an overview, we will follow this overall model: discover + analyze + plan + fix + report

## CVE-2025-55182: react2shell, discover and analyze

Step 1: Discover:
- git repos, CI/CD pipelines, production (containers, servers, etc)
  - likely also picked up (if you manage them): developer workstations
- scan is cheap, find all the stuff, but what matters?

Step 2: Analyze
using agentic via a 511 model (5 agents, 1 AI evaluation, 1 orchestration)

1. Business impact — does it matter?
- What do the affected React/Next.js apps do? Customer-facing SaaS, internal tools, marketing sites?
- What data flows through them? PII, payment, auth tokens?
- Revenue impact if compromised vs. a static marketing site

2. Attack surface — is it real?
This is the big one for react2shell. Lots of potential false positives:
- React 19+ only — React 18 and below are not affected at all
- React Server Components specifically — client-side-only React apps are not vulnerable, even on React 19
- The actual vulnerable packages are react-server-dom-webpack, react-server-dom-turbopack, react-server-dom-parcel — check if they're in the dependency tree,
not just whether you use React
- Next.js App Router vs Pages Router — App Router uses RSC by default, Pages Router does not. A Next.js app on Pages Router may not be affected
- Server Functions ("use server") must exist for the deserialization endpoint to be reachable
- Static/SSG-only builds — if there's no running server (just exported HTML), there's nothing to exploit
- Is it internet-facing? Pre-auth vuln, but an internal-only app behind a VPN has a very different risk profile
So "we use React" or "we use Next.js" is not enough — you need to drill into: which React version, are RSC packages present, is there a server runtime, is it
reachable.

3. Blast radius — does it hurt?
It's RCE, so what's reachable from the server process:
- Environment variables (API keys, DB connection strings, third-party secrets)
- Internal network — can they pivot to databases, internal APIs, other services?
- Is it running in a container with limited scope, or on a VM with broad access?
- Shared infrastructure — if multiple apps share the same Node server or cluster
- Supply chain angle — if it's a build/preview server (like Vercel preview deployments), could compromise propagate to production?

4. Exploitability — can they do it?
- CVSS 10, no auth, no user interaction, network-exploitable
- Public exploits exist, actively exploited in the wild

5. News
- Named vulnerability ("react2shell"), major coverage
- React/Next.js is one of the most widely used web frameworks — high visibility

Key analysis actions
- do not report on: React 18 apps, client-only SPAs, static sites, Pages Router Next.js apps — these can likely be marked as not affected after
verification
- false positive risk is high: a dependency scanner will flag any project with react-server-dom-* in node_modules, but many may not actually have an
exploitable server runtime
- reprioritize the follow-ups separately: the DoS CVEs (55184/67779) and source code leak (55183) have meaningfully different risk than the RCE (55182) —
don't lump them together at CVSS 10

After analysis, we used the output and finally fixed using the next 2 phases
(won't go into detail on this CVE, we will look at another CVE to keep it fresh and see how it works there)
- **plan**: patch affected repos as a priority
  - mtn: also covers 2026-55183 + 2026-55184
  - using latest patch also covers 2026-67779
- **fix**:
  - existing pipelines for code-deployments + testing
  - PR to fix


## CVE-2025-53770: SharePoint Server RCE, plan

Previously executed, just like we saw, was:
**analysis** high priority, in the news, internal attack surface, business-critical, high blast radius, exploitable (90.54% epss, public poc, CISA, ransomware, apt27/apt31)

Operational considerations — this is where SharePoint gets heavy
- Downtime required: Installing KB5002754 + KB5002753 requires SharePoint to be offline, and IIS restart (iisreset.exe) bounces all sites on that server —
not just SharePoint
- Multi-server farms: SharePoint farms have multiple roles (web front-ends, app servers, search, database). Patches need to go on all servers, and there's a
specific order — typically database/app tier first, then WFEs
- PSConfig / SharePoint Products Configuration Wizard: After KB install you must run the config wizard on every server in the farm, in order. This can take
significant time and has its own failure modes
- The machine key rotation is disruptive: Set-SPMachineKey / Update-SPMachineKey invalidates existing sessions, tokens, and cached credentials. Users get
logged out. Anything relying on those keys (custom auth, encrypted ViewState) breaks until reconfigured
- IIS restart affects co-hosted services: If anything else runs on IIS on those servers (other web apps, APIs, ADFS), it goes down too
- AMSI enablement: Turning on the anti-malware scan interface is a config change, not a patch — but it can introduce performance overhead and may flag
legitimate custom solutions as suspicious

Which remediation/mitigation action do we take?
1. Network-level mitigation first (low disruption): restrict access to SharePoint servers from untrusted networks, block known exploit patterns at
WAF/firewall — buys time
2. AMSI enablement (medium disruption): detection capability without patching, catches the known threat signatures (SuspSignoutReq, MachineKeyFinder, etc.)
3. KB patches + PSConfig (high disruption): the actual fix, requires maintenance window
4. Machine key rotation (high disruption): post-patch hardening, assume keys are compromised since this is nation-state exploited (APT27/APT31)

Rightsizing — smaller chunks vs. update considerations
- KB install + PSConfig + IIS restart is one indivisible maintenance window per server
- Machine key rotation is a separate window but equally disruptive
- You could argue for two maintenance windows: patch first, rotate keys second — spreading the risk and validation across two events
- But given active nation-state exploitation, there's a case for doing it all at once to minimize the exposure window

Rollback considerations
- KB patches: SharePoint KBs can be uninstalled, but PSConfig changes to the database schema cannot be rolled back. You need a full farm database backup
before starting
- Machine key rotation: Old keys are gone. If something breaks, you need the backed-up keys. Make sure Set-SPMachineKey backup is captured
- AMSI: Can be disabled again easily — low-risk change

Channels and coordination
- Change management: This likely needs a formal change request — SharePoint is business-critical infrastructure, touches document management, workflows,
intranet
- Stakeholder coordination: Business owners need to know about the outage window. Users need to know sessions will be invalidated (machine key rotation)
- Multiple teams involved: SharePoint admins, network/firewall team (for interim mitigation), database team (for pre-patch backup), security team (for IOC
check before patching — are you already compromised?)

Pre-flight: check for compromise before patching
- Given APT27/APT31 active exploitation, check for IOCs before patching:
  - Scan for the related threats from the README: SuspSignoutReq.A, HijackSharePointServer.A, MachineKeyFinder.DA!amsi
  - If already compromised, patching alone is insufficient — you need incident response first, then patch. Patching a compromised server just keeps the
  attacker in with the vulnerability closed behind them

After plan, we used the output to fix and validate.


## CVE-2026-32027: OpenClaw/ClawJacked, fixing

Final example! Again, previous steps happened:
- **analysis**: endpoints, exploitable, news, massive blast radius
- **plan**: patch and update the components

let's go into the **fix**

**via Kandji:**

    Core mechanism: Custom Script with Audit + Remediation

    Kandji's Custom Scripts support a two-phase model that maps directly to this:

    1. Audit script (runs every check-in, ~15 min) - cnspec validate vulnerability
    2. Remediation script (only runs when audit fails):
    ```
    #!/bin/bash
    set -e
    # 1. Stop the service
    launchctl bootout system/com.openclaw.service 2>/dev/null || true

    # 2. Back up config/memory
    cp -R /path/to/openclaw/config /path/to/openclaw/config.bak

    # 3. Update (git pull, brew upgrade, pkg install — whatever the install method is)
    # ...

    # 4. Restart
    launchctl bootstrap system /Library/LaunchDaemons/com.openclaw.service.plist
    ```

    On the next check-in the audit runs again — if the version is correct, it passes and remediation stops. This is the built-in retry mechanism: audit keeps
    failing → remediation keeps running until it works.

    Staged rollout - Kandji doesn't have percentage-based rollouts, so you use Blueprints:
    1. Canary Blueprint — assign 5-10 test devices, add the Custom Script Library Item
    2. Monitor compliance + script logs in the console
    3. Production Blueprint — add the Library Item once canary looks good
    4. Move devices in batches if you want gradual rollout

    Key considerations for OpenClaw specifically
    - push update to machines that need it, continuously validate
    - Install method varies: OpenClaw might be installed via Homebrew, pip, git clone, or a .pkg — the remediation script needs to match the install method
    - Config/memory backup: The README calls out backing up config and memory — make sure the remediation script handles this before updating, and has a sensible backup location
    - No guaranteed script ordering: If you need "stop → backup → update → restart" in sequence, it must all be in one script, not split across Library Items
      ==> have recovery mechanisms in place
    - Logging: stdout/stderr are captured in the Kandji console per-device. Also worth writing to a local log (/var/log/openclaw-remediation.log) for debugging

    Monitoring
    The Kandji dashboard will show per-device compliance status for the Library Item. Filter the device list by non-compliant to see who still needs patching.


**via Intune**

  Windows — best supported path

  Intune has a native detect + remediate model (Devices > Remediations):

  Detection script - run cnspec to validate

  Remediation script (fires only when detection fails):
  ```
  # remediate.ps1
  # Stop gateway
  & openclaw gateway stop

  # Backup (encrypted — ~/.openclaw/ has plaintext keys)
  $backup = "$env:USERPROFILE\.openclaw-backup-$(Get-Date -Format yyyyMMdd-HHmm).tgz"
  tar czf $backup "$env:USERPROFILE\.openclaw"

  # Update
  npm install -g openclaw@latest

  # Migrate config + restart
  & openclaw doctor --fix
  & openclaw gateway restart

  exit 0
  ```

  Assign to Azure AD groups, schedule to run hourly or daily. On next check-in after remediation, the detection script re-runs and should exit 0.

  Staged rollout via deployment rings:
  - Ring 0 (IT pilot, 5-10 devices) → Ring 1 (early adopters) → Ring 2 (broad)
  - No built-in percentage rollout — you control pacing through group assignment timing





# Post-conf feedback

Mondoo console:
- come in search for CVE-2025-53770 in global search => show me
- we don't know about CVE-2025-66478 => why? we need to become consistent, it's not even on the website, that is dangerous for trust



# Research

## Best-practices for agentic

- composable deterministic building blocks
- composable validations / enforcements
- codeable automation flows (pipelines)

higher speed := stronger building blocks

## Agentic approach

Phases:          [ + human vv ]
- discover
- analyze     -> reprioritize/exceptions
- plan        -> review/adjust
- fix
- report

Triage: analyze + plan

### Discover

- basics: capture the finding ~ commoditized, everyone does it
- crucial: capture the setup, runtime, activity, etc
- (store historic information for context)
- mondoo plug:
  - use whatever you need to get the job done, combine 1p and 3p discovery
  - mql agents for structuring, cnspec agents for assessments
  - operational considerations (fast, don't mess with production workloads, don't mess up APIs, scale...)

### Analyze

- input: findings + context + historic (asset/software/resources)
- prioritize using major risk categories:
  1. Business impact   => does it matter?
  2. Attack surface    => is it real? (running, reachable)
  3. Blast radius      => does it hurt? (other systems, data)
  4. Exploitability    => can they do it?
  5. News
  - Why? to direct attention to things that matter.
    Limiting factor: Our attention (review, goals, validation).
- actions:
  - reprioritize
  - exceptions
  - false positives
  - act on it
- mondoo plug:
  - prioritize what matters, you are in control and learn/adjust over time
  - mondoo agents for prioritization / adjustment

### Plan

- input: assessments + (prev)
- determine how these will be actioned:
  - what gives you the biggest bang for your buck?
  - operational considerations: OS restarts, service downtimes, data backups, ...
  - what can be mitigated (instead of fixed)
- channels:
  - tickets (ITSM requirements)
  - CI/CD pipelines
- rightsize actions
  - smaller chunks: predictable, testable, manageable, easier to reason
  - BUT you cannot do atomic changes due to update considerations (restart, downtime, cycle time)
- actions:
  - review / adjust plan
  - align security (risk reduction) with eng/ops (keep the lights on)
- mondoo plug:
  - move the needle planning mode

### Fix

- input: clear plan with steps on what to do
- automation pipelines:
  - pre-flight check (is it valid)
  - act + fallback on failure
  - log + learn
  - verify the fix
- mondoo plug:
  - use established + scalable tooling and build orchestration around it
    => easily works with existing teams (ansible, intune, kanji, terraform, docker, k8s, arm, ...)
  - tracking and rollback

### Reporting

- what is blocking us? what is slow to change?
- which areas move fast? which ones slow?
- communicate business outcomes: velocity + cost savings + risk reduction etc


## Major Vuln Candidates

**ClawJacked - OpenClaw**
- https://www.bleepingcomputer.com/news/security/clawjacked-attack-let-malicious-websites-hijack-openclaw-to-steal-data/
- CVE-2026-32027 - published 2026.3.20, alongside other CVEs, sev High (7.1)
- update to 2026.2.26
- update via cron job, boot.md, or git pull; package installs
- update steps: stop the service, back up config/memory, update, restart
- considerations:
  - inventory all uses of openclaw and access activitiy
- why: well-known AI thing that exploded, in the news, scary hijack, non-intrusive fix for the most part

**SharePoint Server RCE**
- https://mondoo.com/vulnerability-intelligence/vulnerability/CVE-2025-53770
- CVE-2025-53770 - 2025.07.19, sev 9.8
- actively exploited by nation-state actors (APT27/APT31) (china)
  (https://malpedia.caad.fkie.fraunhofer.de/actor/apt27)
- https://www.microsoft.com/en-us/msrc/blog/2025/07/customer-guidance-for-sharepoint-vulnerability-cve-2025-53770
- SharePoint Server 2016, 2019, & SharePoint Subscription Edition
  - KB5002754 + KB5002753
  - AMSI (anti-malware scan interface) to turn on
  - rotate SharePoint server ASP.NET machine keys
    ‘Set-SPMachineKey -WebApplication <SPWebApplicationPipeBind>’
    ‘Update-SPMachineKey -WebApplication <SPWebApplicationPipeBind>’
  - restart IIS on all SharePoint servers
    `iisreset.exe`
- related threats:
  Exploit:Script/SuspSignoutReq.A
  Trojan:Win32/HijackSharePointServer.A
  Exploit:Script/SuspSignoutReqBody.A
  Trojan:PowerShell/MachineKeyFinder.DA!amsi

**react2shell - React & Next.js RCE**
- https://mondoo.com/blog/how-to-fix-critical-react-and-next-js-vulnerabilities-cve-2025-55182-and-cve-2025-66478
- https://mondoo.com/vulnerability-intelligence/vulnerability/CVE-2025-55182
- CVE-2025-55182 - published 2025.12.03, sev Critical (10.0) — unauthenticated RCE via unsafe deserialization in RSC
- CVE-2025-66478 - Next.js counterpart (not in Mondoo DB — may be rolled into 55182 or vendor-specific)
  - follow-up CVEs (2025.12.11):
    - CVE-2025-55183 - sev Medium (5.3) — source code leak via Server Functions
    - CVE-2025-55184 - sev High (7.5) — pre-auth DoS, infinite loop hangs server
    - CVE-2025-67779 - sev High (7.5) — incomplete fix for 55184, same DoS
- actively exploited in the wild
- affected: React `react-server-dom-*` 19.0.0–19.2.0, Next.js 15.x/16.x/14.3.0-canary.77+
  - follow-ups also affect "patched" versions (19.0.1, 19.1.2, 19.2.1)
- update React to 19.0.3 / 19.1.4 / 19.2.3; Next.js to 15.0.5, 15.1.9, 15.2.6, 15.3.6, 15.4.8, 15.5.7, or 16.0.7
  - no config toggle — upgrading + rebuild/redeploy is mandatory
  - interim: WAF/edge filtering, reduce network exposure, edge authentication
- considerations:
  - inventory all apps using React Server Components or Next.js
  - orgs that patched the initial CVEs must upgrade again for the three follow-ups
  - CVE-2025-67779 affects versions that patched 55184 — check you're on the final patch, not an intermediate one
- why: CVSS 10, actively exploited, affects millions of sites, trivial to exploit with no auth required, enables RCE/data exfil/internal pivoting

**Langflow Unauthenticated RCE**
- https://mondoo.com/vulnerability-intelligence/vulnerability/CVE-2026-33017
- CVE-2026-33017 - published 2026.3.20, sev Critical (9.3/9.8)
- unauthenticated RCE via unsandboxed `exec()` on the public flow build endpoint
  - endpoint: `POST /api/v1/build_public_tmp/{flow_id}/flow` — no auth by design (public flows)
- actively exploited in the wild — attackers compromised pipelines within 20hrs of disclosure
  - leaked API keys, DB credentials, enabled supply chain attacks
- affected: Langflow <= 1.8.1 (and 1.9.0 dev pre-releases)
- update to >= 1.8.2: `pip install --upgrade langflow>=1.8.2` (or pull updated Docker image)
  - 1.8.1 → 1.8.2 is a patch release, minimal scope, no breaking changes
  - bundled fixes: Postgres JSON column fix, timezone fix on `flow_version.created_at` (may trigger minor DB migration)
  - interim: block `/api/v1/build_public_tmp/` at reverse proxy / WAF
- considerations:
  - inventory all Langflow instances — self-hosted, no auto-update
  - rotate all secrets/API keys on any instance that was publicly exposed
  - if jumping from < 1.8.0, expect more substantial changes (flow versioning, DB migrations)
  - audit logs for POST requests to `/api/v1/build_public_tmp/*/flow` with `data` body param
- why: AI/ML infra is the new attack surface, trivial to exploit (no auth, direct exec), fast weaponization, pairs well with OpenClaw as another AI-targeted vuln

**Laravel Livewire v3 RCE**
- https://mondoo.com/vulnerability-intelligence/vulnerability/CVE-2025-54068
- CVE-2025-54068 - published 2025.7.17, sev Critical (9.2), added to CISA KEV Mar 2026
- unauthenticated RCE via improper hydration of component property updates
  - crafted update payloads bypass validation during client-to-server state sync
- actively exploited in the wild (EPSS ~46%)
- affected: livewire/livewire 3.0.0-beta.1 through 3.6.3 (v1 and v2 not affected)
- update to >= 3.6.4: `composer update livewire/livewire`
  - 3.6.3 → 3.6.4 is security-only, no breaking changes
  - no workarounds — patching is the only mitigation
- considerations:
  - Livewire may be an indirect dependency via Filament, Laravel Pulse, etc. — not visible in composer.json
    - run `composer why livewire/livewire --tree` or `composer audit` to check
  - inventory all Laravel projects — no auto-update, each app needs `composer update` + redeploy
  - ~130K apps estimated affected
- why: massive PHP/Laravel ecosystem, hydration/deserialization attack class (mirrors react2shell), hidden transitive dependency angle makes discovery non-trivial
