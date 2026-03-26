<script lang="ts">
  type NutritionFactorType = 'business' | 'cvss' | 'base-score' | 'exploit' | 'impact' | 'surface' | 'connection' | 'news'

  interface RiskCategory {
    name: string
    label: string
    impact: number // -1 to 1
    isActive: boolean
    factor?: NutritionFactorType
    valueText?: string
  }

  let { categories, baseScore, baseLabel = 'Critical', highlight = [] }: {
    categories: RiskCategory[]
    baseScore: string
    baseLabel?: string
    /** Factor names to keep in focus. Empty = all focused. Include 'base-score' for the base score badge. */
    highlight?: string[]
  } = $props()

  function isDimmed(name: string): boolean {
    return highlight.length > 0 && !highlight.includes(name)
  }

  function impactLabel(cat: RiskCategory): string {
    if (!cat.isActive) return 'inactive'
    const abs = Math.abs(cat.impact)
    if (abs >= 0.75) return cat.impact > 0 ? 'critical' : 'low'
    if (abs >= 0.5) return cat.impact > 0 ? 'high' : 'low'
    if (abs >= 0.25) return 'medium'
    return 'low'
  }

  function impactVariant(cat: RiskCategory): 'neutral' | 'negative' | 'positive' {
    if (!cat.isActive) return 'neutral'
    if (cat.impact >= 0.5) return 'negative'
    if (cat.impact <= -0.5) return 'positive'
    return 'neutral'
  }

  function impactText(cat: RiskCategory): string {
    if (cat.valueText !== undefined) return cat.valueText
    if (!cat.isActive) return '—'
    const label = impactLabel(cat)
    switch (label) {
      case 'critical': return 'CRIT'
      case 'high': return 'HIGH'
      case 'medium': return 'MED'
      case 'low': return 'LOW'
      default: return '—'
    }
  }

  function baseVariant(): string {
    const score = parseFloat(baseScore)
    if (score >= 9.0) return 'negative'
    if (score >= 7.0) return 'negative'
    if (score >= 4.0) return 'neutral'
    return 'positive'
  }
</script>

<div class="nutrition-row">
  <!-- Base score badge -->
  <div class="badge" class:dimmed={isDimmed('base-score')}>
    <div class="badge-top">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.6173 1.15851C11.8623 1.05702 12.1377 1.05702 12.3827 1.15851L19.3955 4.06331C19.6405 4.16481 19.8352 4.35948 19.9367 4.60451L22.8415 11.6173C22.943 11.8623 22.943 12.1377 22.8415 12.3827L19.9367 19.3955C19.8352 19.6405 19.6405 19.8352 19.3955 19.9367L12.3827 22.8415C12.1377 22.943 11.8623 22.943 11.6173 22.8415L4.60451 19.9367C4.35948 19.8352 4.16481 19.6405 4.06331 19.3955L1.15851 12.3827C1.05702 12.1377 1.05702 11.8623 1.15851 11.6173L4.06331 4.60451C4.16481 4.35948 4.35948 4.16481 4.60451 4.06331L11.6173 1.15851Z" fill-opacity="0.06"/>
        <path d="M11.6173 4.15851C11.8623 4.05702 12.1377 4.05702 12.3827 4.15851L17.2742 6.18463C17.5192 6.28613 17.7139 6.4808 17.8154 6.72583L19.8415 11.6173C19.943 11.8623 19.943 12.1377 19.8415 12.3827L17.8154 17.2742C17.7139 17.5192 17.5192 17.7139 17.2742 17.8154L12.3827 19.8415C12.1377 19.943 11.8623 19.943 11.6173 19.8415L6.72583 17.8154C6.4808 17.7139 6.28613 17.5192 6.18463 17.2742L4.15851 12.3827C4.05702 12.1377 4.05702 11.8623 4.15851 11.6173L6.18463 6.72583C6.28613 6.4808 6.4808 6.28613 6.72583 6.18463L11.6173 4.15851Z" fill-opacity="0.12"/>
        <path d="M11.6173 8.15851C11.8623 8.05702 12.1377 8.05702 12.3827 8.15851L14.4457 9.01306C14.6908 9.11455 14.8854 9.30923 14.9869 9.55426L15.8415 11.6173C15.943 11.8623 15.943 12.1377 15.8415 12.3827L14.9869 14.4457C14.8854 14.6908 14.6908 14.8854 14.4457 14.9869L12.3827 15.8415C12.1377 15.943 11.8623 15.943 11.6173 15.8415L9.55426 14.9869C9.30923 14.8854 9.11455 14.6908 9.01306 14.4457L8.15851 12.3827C8.05702 12.1377 8.05702 11.8623 8.15851 11.6173L9.01306 9.55426C9.11455 9.30923 9.30923 9.11455 9.55426 9.01306L11.6173 8.15851Z"/>
      </svg>
      <span class="badge-label">Base Score</span>
    </div>
    <div class="badge-value {baseVariant()}">
      <span class="badge-text">{baseScore}</span>
    </div>
  </div>

  {#each categories as cat}
    <div class="badge" class:dimmed={isDimmed(cat.name)}>
      <div class="badge-top">
        {#if cat.factor === 'business'}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="17" width="20" height="5" rx="1" fill-opacity="0.12"/>
            <rect x="4" y="10" width="16" height="5" rx="1" fill-opacity="0.48"/>
            <rect x="6" y="3" width="12" height="5" rx="1"/>
          </svg>
        {:else if cat.factor === 'surface'}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="5" y="2" width="14" height="20" rx="1" fill-opacity="0.06"/>
            <rect x="5" y="17" width="14" height="2" fill-opacity="0.12"/>
            <rect x="5" y="5" width="14" height="2" fill-opacity="0.12"/>
            <rect x="5" y="11" width="14" height="2"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        {:else if cat.factor === 'exploit'}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="2" fill-opacity="0.06"/>
            <path d="M2 11H14V22H4C2.89543 22 2 21.1046 2 20V11Z" fill-opacity="0.12"/>
            <rect x="16" y="9" width="13" height="2" transform="rotate(90 16 9)" fill-opacity="0.48"/>
            <rect x="15" y="11" width="13" height="2" transform="rotate(-180 15 11)" fill-opacity="0.48"/>
            <circle cx="15" cy="10" r="3"/>
          </svg>
        {:else if cat.factor === 'connection'}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.709 16.2949C17.0905 16.5906 16.5906 17.0905 16.2949 17.709L6.29004 7.7041C6.90889 7.40834 7.40834 6.90889 7.7041 6.29004L17.709 16.2949Z" fill-opacity="0.48"/>
            <path d="M16.2939 6.29004C16.5895 6.90897 17.0902 7.40816 17.709 7.7041L7.7041 17.709C7.40823 17.0904 6.9088 16.5905 6.29004 16.2949L16.2939 6.29004Z" fill-opacity="0.48"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="5" cy="5" r="3" fill-opacity="0.12"/>
            <circle cx="5" cy="19" r="3" fill-opacity="0.12"/>
            <circle cx="19" cy="19" r="3" fill-opacity="0.12"/>
            <circle cx="19" cy="5" r="3" fill-opacity="0.12"/>
          </svg>
        {:else if cat.factor === 'news'}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="2" width="18" height="20" rx="1" fill-opacity="0.06"/>
            <rect x="6" y="4" width="12" height="8" rx="1"/>
            <rect x="6" y="14" width="12" height="2" rx="1" fill-opacity="0.24"/>
            <rect x="6" y="17" width="10" height="2" rx="1" fill-opacity="0.24"/>
          </svg>
        {/if}
        <span class="badge-label">{cat.label}</span>
      </div>
      <div class="badge-value {impactVariant(cat)}">
        <span class="badge-text">{impactText(cat)}</span>
      </div>
    </div>
  {/each}
</div>

<style>
  .nutrition-row {
    display: flex;
    gap: 6px;
    justify-content: center;
  }

  .badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 0.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.04);
    gap: 10px;
    padding-top: 10px;
    min-width: 72px;
  }

  .badge-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: rgba(255, 255, 255, 0.8);
  }

  .badge-label {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 500;
    font-size: 9px;
    line-height: 13px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-align: center;
    white-space: nowrap;
    color: rgba(255, 255, 255, 0.7);
  }

  .badge-value {
    width: 100%;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .badge-text {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 600;
    font-size: 10px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #fff;
  }

  .neutral {
    background: rgba(255, 255, 255, 0.06);
  }

  .negative {
    background: #dc2626;
  }

  .positive {
    background: #16a34a;
  }

  .dimmed {
    opacity: 0.3;
    filter: blur(2px) grayscale(1);
  }
</style>
