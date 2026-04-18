export function renderSecondary(result) {
  const evidenceItems = (result.evidence || []).map((item) => `<li>${item.message}</li>`).join("");
  const insightsItems = (result.insights || []).map((item) => `<li>${item}</li>`).join("");

  return /*html*/ `
    <div class="result-card column gap-20">
      <div class="result-header">
        <strong>[${formatType(result.type)}] ${result.name}</strong>
        <strong>${result.confidence}%</strong>
      </div>

      ${evidenceItems ? `<ul>${evidenceItems}</ul>` : `<span class="muted">No direct evidence found</span>`}

      ${
        insightsItems
          ? `
          <div class="insights column gap-20">
            <strong>Analysis</strong>
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

function formatType(type) {
  switch (type) {
    case "framework":
      return "Framework";
    case "library":
      return "Library";
    case "cms":
      return "CMS";
    default:
      return "Other";
  }
}
