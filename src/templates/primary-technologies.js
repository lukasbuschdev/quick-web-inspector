export function renderPrimary(primary, categoryInsights) {
  const evidenceItems = (primary.evidence || []).map((item) => `<li>${item.message}</li>`).join("");
  const baseInsights = primary.insights || [];
  const allInsights = [...baseInsights, ...categoryInsights];
  const insightsItems = allInsights.map((item) => `<li>${item}</li>`).join("");

  return /*html*/ `
      <div class="result-section"><strong>Primary Technologies</strong></div>
      <div class="result-card primary column gap-20">
        <div class="result-header">
          <strong>[${formatType(primary.type)}] ${primary.name}</strong>
          <strong>${primary.confidence}%</strong>
        </div>

        <div class="column gap-20">
          ${evidenceItems ? `<ul>${evidenceItems}</ul>` : `<p class="muted">No direct evidence found</p>`}

          ${
            insightsItems
              ? /*html*/ `
              <div class="insights column gap-20">
                <strong>Analysis</strong>
                <ul>${insightsItems}</ul>
              </div>
            `
              : ""
          }
        </div>
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
