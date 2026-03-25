## Brief

We'll explore one of the latest vulnerabilities making headlines and show you how to solve it end-to-end using modern solutions. We will not only walk you through its technical details but also demonstrate how to set up automated workflows to identify, analyze, and fix it. You'll learn how to leverage the latest in automation and agentic AI to remediate your servers, containers, and repositories.


## General structure

Considerations:
- discover
- analyze   -> reprioritize/exceptions
- plan      -> review/approve
- fix       -> rollout windows
- report


## Candidates

ClawJacked - OpenClaw
- https://www.bleepingcomputer.com/news/security/clawjacked-attack-let-malicious-websites-hijack-openclaw-to-steal-data/
- CVE-2026-32027 - published 2026.3.20, alongside other CVEs, sev High (7.1)
- update to 2026.2.26
- update via cron job, boot.md, or git pull; package installs
- update steps: stop the service, back up config/memory, update, restart
- considerations:
  - inventory all uses of openclaw and access activitiy
- why: well-known AI thing that exploded, in the news, scary hijack, non-intrusive fix for the most part

SharePoint Server RCE 
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

react2shell - React & Next.js RCE
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

Langflow Unauthenticated RCE
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

Laravel Livewire v3 RCE
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

## Post-conf feedback

Mondoo console:
- come in search for CVE-2025-53770 in global search => show me
- we don't know about CVE-2025-66478 => why? we need to become consistent, it's not even on the website, that is dangerous for trust

