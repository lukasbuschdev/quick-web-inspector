import { buildPerformanceInsightGroup } from "../utils/helpers";

const thresholds = {
  animatedCount: { warning: 15, critical: 40 },
  expensiveAnimationCount: { warning: 3, critical: 10 },
  fixedCount: { warning: 5, critical: 10 },
  hoverRules: { warning: 10, critical: 25 },
  boxShadowCount: { warning: 15, critical: 40 },
  filterCount: { warning: 3, critical: 10 },
  backdropFilterCount: { warning: 1, critical: 5 },
  gradientCount: { warning: 20, critical: 50 },
  layoutAnimationCount: { warning: 2, critical: 5 },
};

export function renderInteraction(interaction) {
  const motionOverview = /*html*/ `
      <div class="column gap-10">
        <span class="white"><strong>Motion Overview</strong></span>
      
        <span>
          <strong>Animated elements:</strong>
          <span class="metric ${getMetricClass(interaction.data.animatedCount, thresholds.animatedCount)}">
            ${interaction.data.animatedCount}
          </span>
        </span>
      
        <span>
          <strong>Expensive animations:</strong>
          <span class="metric ${getMetricClass(interaction.data.expensiveAnimationCount, thresholds.expensiveAnimationCount)}">
            ${interaction.data.expensiveAnimationCount}
          </span>
        </span>
      
        <span>
          <strong>Fixed elements:</strong>
          <span class="metric ${getMetricClass(interaction.data.fixedCount, thresholds.fixedCount)}">
            ${interaction.data.fixedCount}
          </span>
        </span>
      
        <span>
          <strong>Hover rules:</strong>
          <span class="metric ${getMetricClass(interaction.data.hoverRules, thresholds.hoverRules)}">
            ${interaction.data.hoverRules}
          </span>
        </span>
      
        <span>
          <strong>Reduced motion:</strong>
          <span class="metric ${interaction.data.hasReducedMotionSupport ? "good" : "critical"}">
            ${interaction.data.hasReducedMotionSupport ? "supported" : "not supported"}
          </span>
        </span>
      
        <span>
          <strong>Box shadows:</strong>
          <span class="metric ${getMetricClass(interaction.data.boxShadowCount, thresholds.boxShadowCount)}">
            ${interaction.data.boxShadowCount}
          </span>
        </span>
      
        <span>
          <strong>Filters:</strong>
          <span class="metric ${getMetricClass(interaction.data.filterCount, thresholds.filterCount)}">
            ${interaction.data.filterCount}
          </span>
        </span>
      
        <span>
          <strong>Backdrop filters:</strong>
          <span class="metric ${getMetricClass(interaction.data.backdropFilterCount, thresholds.backdropFilterCount)}">
            ${interaction.data.backdropFilterCount}
          </span>
        </span>
      
        <span>
          <strong>Gradients:</strong>
          <span class="metric ${getMetricClass(interaction.data.gradientCount, thresholds.gradientCount)}">
            ${interaction.data.gradientCount}
          </span>
        </span>
      
        <span>
          <strong>GPU-friendly animations:</strong>
          <span class="metric good">
            ${interaction.data.gpuFriendlyAnimationCount}
          </span>
        </span>
      
        <span>
          <strong>Layout-triggering animations:</strong>
          <span class="metric ${getMetricClass(interaction.data.layoutAnimationCount, thresholds.layoutAnimationCount)}">
            ${interaction.data.layoutAnimationCount}
          </span>
        </span>
      </div>
    `;

  const groupedInsights = {
    critical: [],
    warning: [],
    good: [],
  };

  (interaction.insights || []).forEach((item) => {
    if (groupedInsights[item.level]) {
      groupedInsights[item.level].push(item.message);
    }
  });

  const insightsItems = `
      ${buildPerformanceInsightGroup("Critical Issues", groupedInsights.critical, "critical")}
      ${buildPerformanceInsightGroup("Warnings", groupedInsights.warning, "warning")}
      ${buildPerformanceInsightGroup("Good Signals", groupedInsights.good, "good")}
    `;

  return /*html*/ `<div class="result-section"><strong>Interaction Performance</strong></div>
      <div class="result-card column gap-30">
        ${motionOverview}

        ${
          insightsItems
            ? /*html*/ `
              <div class="insights column gap-10">
                <strong>Analysis</strong>
                <ul>${insightsItems}</ul>
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

function getMetricClass(value, thresholds) {
  if (value == null) return "";
  if (value >= thresholds.critical) return "critical";
  if (value >= thresholds.warning) return "warning";
  return "good";
}
