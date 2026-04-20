import { buildPerformanceInsightGroup, getScoreClass } from "../utils/helpers";

export function renderInteraction(interaction) {
  if (!interaction || !interaction.data) {
    return /*html*/ `
      <div class="result-section"><strong>Interaction Performance</strong></div>
      <div class="result-card column gap-30">
        <span class="muted">No interaction performance data available</span>
      </div>
    `;
  }

  const d = interaction.data;

  const metrics = `
    ${metricRow("Passive animations", d.passiveAnimationCount, "passiveAnimationCount", d)}
    ${metricRow("Interaction animations", d.interactionAnimationCount, "interactionAnimationCount", d)}
    ${metricRow("Light interaction animations", d.cheapInteractionCount, "cheapInteractionCount", d)}
    ${metricRow("Heavy interaction animations", d.heavyInteractionCount, "heavyInteractionCount", d)}
    ${metricRow("Expensive passive animations", d.expensivePassiveAnimationCount, "expensivePassiveAnimationCount", d)}
    ${metricRow("Expensive interaction animations", d.expensiveInteractionAnimationCount, "expensiveInteractionAnimationCount", d)}
    ${metricRow("Fixed elements", d.fixedCount, "fixedCount", d)}
    ${metricRow("Hover rules", d.hoverRules, "hoverRules", d)}
    ${metricRow("Box shadows", d.boxShadowCount, "boxShadowCount", d)}
    ${metricRow("Filters", d.filterCount, "filterCount", d)}
    ${metricRow("Backdrop filters", d.backdropFilterCount, "backdropFilterCount", d)}
    ${metricRow("Gradients", d.gradientCount, "gradientCount", d)}
    ${metricRow("Layout-triggering animations", d.layoutAnimationCount, "layoutAnimationCount", d)}
    ${metricRow("GPU-friendly animations", d.gpuFriendlyAnimationCount, null, null)}
    ${metricRow("Reduced motion", d.hasReducedMotionSupport ? "supported" : "not supported", null, null, !d.hasReducedMotionSupport)}
    ${metricRow("JS-driven animations", d.jsAnimationActivity?.detected ? formatJsAnimationLabel(d.jsAnimationActivity) : "none", "jsAnimationActivity", d)}
  `;

  const groupedInsights = { critical: [], warning: [], good: [] };

  (interaction.insights || []).forEach((item) => {
    if (groupedInsights[item.level]) {
      groupedInsights[item.level].push(item.message);
    }
  });

  const issueCount = groupedInsights.critical.length + groupedInsights.warning.length;

  const insightsItems = `
    ${buildPerformanceInsightGroup("Critical Issues", groupedInsights.critical, "critical")}
    ${buildPerformanceInsightGroup("Warnings", groupedInsights.warning, "warning")}
    ${buildPerformanceInsightGroup("Good Signals", groupedInsights.good, "good")}
  `;

  return /*html*/ `
    <div class="result-section"><strong>Interaction Performance</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${metricRow("Score", interaction.score ?? "N/A", getScoreClass(interaction.score))}
        ${metricRow("Issues", issueCount, issueCount > 0 ? "warning" : "good")}
      </div>

      <div class="metric-block">
        <span class="block-title">Motion & Complexity</span>
        ${metrics}
      </div>

      ${
        insightsItems.trim()
          ? /*html*/ `
            <div class="insights column gap-10">
              <span class="block-title mt-15"><strong>Analysis</strong></span>
              ${insightsItems}
            </div>
          `
          : /*html*/ `
            <span class="muted">
              No major interaction or animation issues detected
            </span>
          `
      }
    </div>
  `;
}

function metricRow(label, value, key = null, data = null, forceCritical = false) {
  let cls = "good";

  if (forceCritical) {
    cls = "critical";
  } else if (key && data) {
    const severity = getInteractionSeverity(data);
    cls = severity[key] || "white";
  } else if (typeof key === "string" && !data) {
    cls = key;
  }

  return /*html*/ `
    <div class="metric-row">
      <span>${label}</span>
      <span class="metric ${cls}">${value}</span>
    </div>
  `;
}

function formatJsAnimationLabel(activity) {
  const { level, svgMotionChanges = 0, styleChanges = 0 } = activity;

  if (level === "low") {
    return "low activity (minimal runtime updates)";
  }

  if (level === "medium") {
    if (svgMotionChanges > styleChanges) {
      return "moderate activity (mostly visual animations)";
    }
    return "moderate activity (includes layout/style updates)";
  }

  if (level === "high") {
    return "high activity (frequent runtime updates)";
  }

  return "unknown";
}

function getInteractionSeverity(data) {
  const {
    passiveAnimationCount = 0,
    interactionAnimationCount = 0,
    expensivePassiveAnimationCount = 0,
    expensiveInteractionAnimationCount = 0,
    cheapInteractionCount = 0,
    heavyInteractionCount = 0,
    fixedCount = 0,
    hoverRules = 0,
    boxShadowCount = 0,
    filterCount = 0,
    backdropFilterCount = 0,
    gradientCount = 0,
    layoutAnimationCount = 0,
    jsAnimationActivity = null,
  } = data;

  return {
    passiveAnimationCount: passiveAnimationCount >= 6 ? "critical" : passiveAnimationCount >= 3 ? "warning" : "good",
    interactionAnimationCount: interactionAnimationCount >= 40 ? "warning" : "good",
    heavyInteractionCount: heavyInteractionCount >= 20 ? "critical" : heavyInteractionCount >= 10 ? "warning" : "good",
    cheapInteractionCount: heavyInteractionCount === 0 && cheapInteractionCount >= 10 ? "good" : "neutral",
    expensivePassiveAnimationCount: expensivePassiveAnimationCount >= 3 ? "critical" : expensivePassiveAnimationCount >= 1 ? "warning" : "good",
    expensiveInteractionAnimationCount: expensiveInteractionAnimationCount >= 10 ? "critical" : expensiveInteractionAnimationCount >= 4 ? "warning" : "good",
    fixedCount: fixedCount >= 10 ? "critical" : fixedCount >= 5 ? "warning" : "good",
    hoverRules: hoverRules >= 25 ? "critical" : hoverRules >= 10 ? "warning" : "good",
    boxShadowCount: boxShadowCount >= 40 ? "critical" : boxShadowCount >= 15 ? "warning" : "good",
    filterCount: filterCount >= 10 ? "critical" : filterCount >= 3 ? "warning" : "good",
    backdropFilterCount: backdropFilterCount >= 5 ? "critical" : backdropFilterCount >= 1 ? "warning" : "good",
    gradientCount: gradientCount >= 50 ? "critical" : gradientCount >= 20 ? "warning" : "good",
    layoutAnimationCount: layoutAnimationCount >= 10 ? "critical" : layoutAnimationCount >= 2 ? "warning" : "good",
    jsAnimationActivity: jsAnimationActivity?.level === "high" ? "warning" : jsAnimationActivity?.level === "medium" ? "warning" : "good",
  };
}
