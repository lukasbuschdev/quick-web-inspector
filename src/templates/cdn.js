export function renderCDN(cdn) {
  const evidenceItems = (cdn.evidence || []).map((item) => `<li>${item.message}</li>`).join("");
  const edge = cdn.edge ? `<span><strong>Edge:</strong> ${cdn.edge}</span>` : "";
  const assets = cdn.assets && cdn.assets.length > 0 ? `<span><strong>Assets:</strong> ${cdn.assets.join(", ")}</span>` : "";
  const source = cdn.source === "headers" ? `<span><strong>Detected via:</strong> server headers</span>` : `<span><strong>Detected via:</strong> resource analysis</span>`;
  const platform = cdn.platform ? `<span><strong>Platform:</strong> ${cdn.platform}</span>` : "";

  return /*html*/ `
      <div class="result-section"><strong>Delivery & Hosting</strong></div>
      <div class="result-card column gap-20">
        <div class="result-header">
          <strong>${cdn.edge || cdn.platform || (cdn.assets.length > 0 ? "Asset CDN detected" : "No CDN detected")}</strong>
          <strong>${cdn.confidence}%</strong>
        </div>

        <div class="column gap-20">
          ${source}
          ${edge}
          ${platform}
          ${assets}
        </div>

        ${evidenceItems ? `<ul>${evidenceItems}</ul>` : `<span class="muted">No clear CDN evidence found</span>`}
      </div>
    `;
}
