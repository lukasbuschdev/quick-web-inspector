export function renderRenderingStrategy(rendering) {
  const evidenceItems = (rendering.evidence || []).map((item) => `<li>${item.message}</li>`).join("");

  return /*html*/ `
    <div class="result-section"><strong>Rendering Strategy</strong></div>
    <div class="result-card column gap-20">
      <div class="result-header">
        <strong>${formatRenderingStrategy(rendering.strategy)}</strong>
        <strong>${rendering.confidence}%</strong>
      </div>

      ${evidenceItems ? `<ul>${evidenceItems}</ul>` : `<span class="muted">No clear rendering evidence found</span>`}
    </div>
  `;
}

function formatRenderingStrategy(strategy) {
  switch (strategy) {
    case "SSR":
      return "Server-side Rendering (SSR)";
    case "SSG":
      return "Static Site Generation (SSG)";
    case "CSR":
      return "Client-side Rendering (CSR)";
    default:
      return "Unknown";
  }
}
