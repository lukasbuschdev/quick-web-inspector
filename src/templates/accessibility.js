import { metricRow, getScoreClass, renderInsightItem } from "../utils/helpers";

export function renderAccessibility(accessibility) {
  const insights = accessibility.insights || [];

  const groupedInsights = groupAndPrioritizeInsights(insights);
  const issueCount = groupedInsights.critical.length + groupedInsights.warning.length;

  const insightsItems = `
    ${renderInsightGroup("Critical Issues", groupedInsights.critical, "critical")}
    ${renderInsightGroup("Warnings", groupedInsights.warning, "warning")}
    ${renderInsightGroup("Suggestions", groupedInsights.info, "info")}
  `;

  return /*html*/ `
    <div class="result-section"><strong>Accessibility</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${metricRow("Score", accessibility.score ?? "N/A", getScoreClass(accessibility.score))}
        ${metricRow("Issues", issueCount, issueCount > 0 ? "warning" : "good")}
      </div>

      ${
        issueCount > 0 || accessibility.showGoodSignals
          ? /*html*/ `
            <div class="insights column gap-10">
              <span class="block-title"><strong>Accessibility Analysis</strong></span>
              ${insightsItems}
            </div>
          `
          : /*html*/ `
            <div class="insights column gap-10">
              <span class="block-title"><strong>Accessibility Analysis</strong></span>
              <span class="good">✓ No accessibility issues detected</span>
              <span class="muted">Basic accessibility checks passed. Consider manual testing for advanced scenarios like screen reader support and focus behavior.</span>
            </div>
          `
      }
    </div>
  `;
}

function groupAndPrioritizeInsights(insights) {
  const grouped = { critical: [], warning: [], info: [], good: [] };

  insights.forEach((item) => {
    if (grouped[item.level]) {
      grouped[item.level].push(item);
    }
  });

  grouped.critical.sort(sortInsights);
  grouped.warning.sort(sortInsights);
  grouped.info.sort(sortInsights);
  grouped.good.sort(sortInsights);

  return grouped;
}

function sortInsights(a, b) {
  const aHasFix = !!a.fix;
  const bHasFix = !!b.fix;

  if (aHasFix !== bHasFix) {
    return aHasFix ? -1 : 1;
  }

  return 0;
}

function renderInsightGroup(title, items, levelClass) {
  if (!items || items.length === 0) return "";

  return /*html*/ `
    <div class="insight-group">
      <span class="insight-title ${levelClass}"><strong>${title}</strong></span>
      <ul class="insight-list">
        ${items.map(renderInsightItem).join("")}
      </ul>
    </div>
  `;
}
