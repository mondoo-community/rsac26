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


## Post-conf feedback

Mondoo console:
- come in search for CVE-2025-53770 in global search => show me
- we don't know about CVE-2025-66478 => why? we need to become consistent, it's not even on the website, that is dangerous for trust

