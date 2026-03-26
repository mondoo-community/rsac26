<script lang="ts">
  import { onMount } from 'svelte'

  const CVE = 'CVE-2025-55182'

  const systemTypes = ['git repo', 'vm', 'server', 'serverless function', 'endpoint']

  const names: Record<string, string[]> = {
    'git repo': ['acme-corp/frontend-app', 'acme-corp/api-service', 'acme-corp/shared-lib', 'acme-corp/auth-module', 'acme-corp/dashboard-ui', 'internal/checkout-flow', 'internal/user-portal', 'internal/cms-engine', 'platform/data-pipeline', 'platform/webhook-handler'],
    'vm': ['prod-web-us-east-01', 'staging-api-eu-west-02', 'dev-build-runner-03', 'qa-integration-runner-01', 'prod-worker-us-west-04', 'analytics-pipeline-vm-02', 'batch-processing-node-01', 'monitoring-grafana-vm-03', 'cache-redis-layer-02', 'etl-transform-node-03', 'prod-web-us-west-02', 'staging-web-eu-central-01', 'dev-sandbox-runner-04', 'qa-loadtest-vm-02', 'prod-api-us-east-03', 'analytics-warehouse-vm-01', 'batch-scheduler-node-02', 'monitoring-prom-vm-01', 'cache-memcached-layer-01', 'etl-ingest-node-04'],
    'server': ['web-prod-us-east-a1', 'api-prod-eu-west-b2', 'cdn-edge-apac-tokyo-01', 'internal-tools-admin-srv', 'auth-gateway-primary-01', 'search-cluster-node-01', 'payment-svc-prod-west', 'notification-hub-east-02', 'media-transcoder-srv-02', 'log-aggregator-central', 'web-prod-us-west-a3', 'api-prod-apac-sg-01', 'cdn-edge-eu-frankfurt-02', 'internal-ci-runner-srv', 'auth-gateway-failover-02', 'search-cluster-node-03', 'payment-svc-staging-east', 'notification-relay-west-01', 'media-storage-srv-04', 'log-shipper-edge-03'],
    'serverless function': ['processOrder', 'sendNotification', 'resizeImage', 'validateToken', 'syncInventory', 'generateReport', 'handleWebhook', 'parseUpload', 'runMigration', 'computeMetrics'],
    'endpoint': ['/api/v2/users', '/api/v1/orders', '/graphql', '/api/v2/search', '/api/v1/auth/login', '/api/v2/payments', '/webhook/stripe', '/api/v1/upload', '/api/v2/analytics', '/health'],
  }

  let lines: { id: number; cve: string; type: string; name: string }[] = $state([])
  let counter = 0
  const MAX_LINES = 25
  const VISIBLE_FULL = 15 // lines 0..14 are full opacity, 15..24 fade out

  function addLine() {
    const type = systemTypes[Math.floor(Math.random() * systemTypes.length)]
    const nameList = names[type]
    const name = nameList[Math.floor(Math.random() * nameList.length)]
    counter++
    lines = [{ id: counter, cve: CVE, type, name }, ...lines].slice(0, MAX_LINES)
  }

  function getOpacity(index: number): number {
    if (index < VISIBLE_FULL) return 1
    // Fade from 1.0 to 0.1 over the last 10 lines
    const fadeIndex = index - VISIBLE_FULL
    return Math.max(0.1, 1 - (fadeIndex + 1) * 0.1)
  }

  let interval: ReturnType<typeof setInterval>
  let sectionEl: HTMLElement | null = null

  onMount(() => {
    const container = document.querySelector('[data-cve-stream]')
    if (!container) return

    const revealEl = container.closest('.reveal')
    if (!revealEl) return

    const observer = new MutationObserver(() => {
      if (container.classList.contains('present')) {
        if (!interval) {
          lines = []
          counter = 0
          interval = setInterval(addLine, 100)
        }
      } else {
        if (interval) {
          clearInterval(interval)
          interval = undefined as any
        }
      }
    })

    observer.observe(container, { attributes: true, attributeFilter: ['class'] })

    if (container.classList.contains('present')) {
      interval = setInterval(addLine, 100)
    }

    return () => {
      observer.disconnect()
      if (interval) clearInterval(interval)
    }
  })
</script>

<div class="stream-container">
  <h2 class="text-4xl font-bold mb-8">What matters?</h2>
  <div class="stream">
    {#each lines as line, i (line.id)}
      <div class="stream-line" style="opacity: {getOpacity(i)};">
        <span class="cve">{line.cve}</span>
        <span class="type">{line.type}</span>
        <span class="name">{line.name}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .stream-container {
    text-align: center;
  }

  .stream {
    max-width: 700px;
    margin: 0 auto;
    text-align: left;
    font-family: "IBM Plex Mono", monospace;
    font-size: 0.85rem;
    overflow: hidden;
    height: 420px;
  }

  .stream-line {
    display: flex;
    gap: 1.5rem;
    padding: 0.2rem 0;
    white-space: nowrap;
    animation: slideIn 0.1s ease-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .cve {
    color: #ec4899;
    font-weight: 600;
    min-width: 140px;
  }

  .type {
    color: #a855f7;
    min-width: 170px;
  }

  .name {
    color: rgba(255, 255, 255, 0.7);
  }
</style>
