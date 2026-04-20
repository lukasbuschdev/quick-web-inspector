import { getScoreClass } from "../utils/helpers";

export function renderFullSummary(summary) {
  const { loadingPerformanceScore, interactionPerformanceScore, seoScore, accessibilityScore, overallScore, topIssues, allInsights = [] } = summary || {};

  const levelPriority = {
    critical: 2,
    warning: 1,
  };

  const sortedIssues = (topIssues || []).sort((a, b) => levelPriority[b.level] - levelPriority[a.level]).slice(0, 3);

  const issuesList = sortedIssues
    .map(
      (issue) => /*html*/ `
        <li>
          <span class="${issue.level}">[${issue.source}]</span>
          ${issue.message}
        </li>
      `,
    )
    .join("");

  return /*html*/ `
    <div class="result-section"><strong>Summary</strong></div>

    <div class="result-card summary column gap-20">
      <div class="summary-score">
        <div class="row gap-10 align-center">
          <strong>Overall Score</strong>
          <span class="info-tooltip">
            ⓘ
            <span class="tooltip-content">
              Overall score based on weighted metrics.
              <br><br>
              <ul>
                <li>Loading (50%)</li>
                <li>Interaction (25%)</li>
                <li>SEO (15%)</li>
                <li>Accessibility (10%)</li>
              </ul>
              <br><br>
              Prioritizes real user experience over technical completeness.
            </span>
          </span>
        </div>
        <div class="row gap-5">
          <span class="score ${getScoreClass(overallScore)}">${overallScore ?? "N/A"}</span>
          <span class="white">/ 100</span>
        </div>
      </div>

      <div class="summary-breakdown">
        <div class="row">
          <span class="muted">Loading Performance</span>
          <div class="row gap-5">
            <span class="score ${getScoreClass(loadingPerformanceScore)}">
              ${loadingPerformanceScore ?? "N/A"}
            </span>
            <span>/ 100</span>
          </div>
        </div>

        <div class="row">
          <span class="muted">Interaction Performance</span>
          <div class="row gap-5">
            <span class="score ${getScoreClass(interactionPerformanceScore)}">
              ${interactionPerformanceScore ?? "N/A"}
            </span>
            <span>/ 100</span>
          </div>
        </div>

        <div class="row">
          <span class="muted">SEO</span>
          <div class="row gap-5">
            <span class="score ${getScoreClass(seoScore)}">
              ${seoScore ?? "N/A"}
            </span>
            <span>/ 100</span>
          </div>
        </div>

        <div class="row">
          <span class="muted">Accessibility</span>
          <div class="row gap-5">
            <span class="score ${getScoreClass(accessibilityScore)}">
              ${accessibilityScore ?? "N/A"}
            </span>
            <span>/ 100</span>
          </div>
        </div>
      </div>

      ${
        issuesList
          ? /*html*/ `
        <div class="insights column gap-10">
          <span class="block-title mt-15"><strong>Top Issues</strong></span>
          <ul>${issuesList}</ul>
        </div>
      `
          : ""
      }

      ${renderQuickWinsSection(allInsights)}
    </div>
  `;
}

function renderQuickWinsSection(allInsights = []) {
  const actionableInsights = allInsights.filter((item) => item && (item.level === "critical" || item.level === "warning"));
  const { quick, advanced } = splitQuickWins(actionableInsights);

  if (!quick.length && !advanced.length) return "";

  return /*html*/ `
    <div class="insights column gap-20">
      <span class="block-title mt-15"><strong>Recommendations</strong></span>

      ${
        quick.length
          ? /*html*/ `
        <div class="column gap-10">
          <span class="block-title">Quick Wins</span>
          <ul>
            ${quick.map((msg) => `<li>${msg}</li>`).join("")}
          </ul>
        </div>
      `
          : ""
      }

      ${
        advanced.length
          ? /*html*/ `
        <div class="column gap-10">
          <span class="block-title">Advanced Improvements</span>
          <ul>
            ${advanced.map((msg) => `<li>${msg}</li>`).join("")}
          </ul>
        </div>
      `
          : ""
      }
    </div>
  `;
}

function splitQuickWins(insights = []) {
  const quick = [];
  const advanced = [];

  const actionable = insights.filter((item) => item && (item.level === "critical" || item.level === "warning"));

  const QUICK_PATTERNS = ["alt", "button type", "missing attribute", "label", "aria", "meta", "title", "add", "missing", "not set", "heading", "h1", "link text", "form field"];
  const ADVANCED_PATTERNS = ["layout", "animation", "render", "performance", "strategy", "complex", "reduce", "optimize", "largest contentful paint", "lcp", "cls", "javascript-driven", "layout recalculation"];

  actionable.forEach((item) => {
    const msg = item.message.toLowerCase();
    const isAdvanced = ADVANCED_PATTERNS.some((pattern) => msg.includes(pattern));
    const isQuick = QUICK_PATTERNS.some((pattern) => msg.includes(pattern));

    if (isQuick && !isAdvanced) {
      quick.push(item.message);
    } else {
      advanced.push(item.message);
    }
  });

  return {
    quick: [...new Set(quick)].slice(0, 4),
    advanced: [...new Set(advanced)].slice(0, 4),
  };
}
