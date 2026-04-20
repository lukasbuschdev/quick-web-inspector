import { getConfidenceClass, getConfidenceLabel } from "../utils/helpers";

export function renderRenderingStrategy(rendering) {
  const evidenceItems = (rendering.evidence || []).map((item) => `<li>${item.message}</li>`).join("");

  return /*html*/ `
    <div class="result-section"><strong>Rendering Strategy</strong></div>
    <div class="result-card column gap-30">
      <div class="result-header align-start">
        <div class="column gap-10">
          <span><strong>${formatRenderingStrategy(rendering.strategy)}</strong><br></span>
          <span class="rendering-hint">${getRenderingHint(rendering.strategy)}</span>
        </div>
        <span class="metric ${getConfidenceClass(rendering.confidence)}">
          ${formatRenderingConfidence(rendering)}
        </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Evidence</span>
        ${evidenceItems ? `<ul>${evidenceItems}</ul>` : `<span class="muted">No clear rendering evidence found</span>`}
      </div>
    </div>
  `;
}

export function renderRenderingStrategyFallback() {
  return /*html*/ `
    <div class="result-section"><strong>Rendering Strategy</strong></div>
    <div class="result-card column gap-20">
      <div class="metric-block">
        <span class="muted">
          No clear rendering pattern detected. This can occur with hybrid setups,
          static delivery, or optimized builds where rendering behavior is less visible.
        </span>
      </div>
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

function getRenderingHint(strategy) {
  switch (strategy) {
    case "SSR":
      return "Content is rendered on the server before being sent to the client.";
    case "SSG":
      return "Content is pre-generated at build time and served statically.";
    case "CSR":
      return "Content is rendered in the browser using JavaScript.";
    default:
      return "";
  }
}

function formatRenderingConfidence(rendering) {
  const { confidence = 0, evidence = [] } = rendering;

  const label = getConfidenceLabel(confidence, evidence);

  return `${label} (${confidence}%)`;
}
