import { formatType, getConfidenceClass, getConfidenceLabel } from "../utils/helpers";

export function renderSecondary(result) {
  const evidenceItems = (result.evidence || []).map((item) => `<li>${item.message}</li>`).join("");
  const insightsItems = (result.insights || []).map((item) => `<li>${item}</li>`).join("");

  return /*html*/ `
    <div class="result-card column gap-30">
      <div class="result-header">
        <span>
          <strong>[${formatType(result.type)}]</strong>
          ${result.name}
        </span>
        <span class="metric ${getConfidenceClass(result.confidence)}">
          ${formatSecondaryConfidence(result)}
        </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Evidence</span>
        ${evidenceItems ? /*html*/ `<ul>${evidenceItems}</ul>` : /*html*/ `<span class="muted">No direct evidence found</span>`}
      </div>

      ${
        insightsItems
          ? /*html*/ `
          <div class="insights column gap-10">
            <span class="block-title"><strong>Analysis</strong></span>
            <ul>${insightsItems}</ul>
          </div>
        `
          : ""
      }
    </div>
  `;
}

export function renderSecondaryFallback() {
  return /*html*/ `
    <div class="result-card column gap-20">
      <span class="muted">
        No additional technologies detected. This may indicate a minimal or highly optimized setup.
      </span>
    </div>
  `;
}

function formatSecondaryConfidence(result) {
  const { confidence = 0, evidence = [] } = result;

  if (confidence < 20) {
    return `<span class="muted">Weak signal</span>`;
  }

  const label = getConfidenceLabel(confidence, evidence);

  const softenedLabel = label === "Proven" ? "Detected" : label === "Very likely" ? "Strong signal" : label === "Likely" ? "Likely" : label === "Plausible" ? "Possible" : "Weak signal";

  return `${softenedLabel} (${confidence}%)`;
}
