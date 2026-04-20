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
          <span class="${issue.level}"><strong>[${issue.source}]</strong></span>
          ${issue.message}
        </li>
      `,
    )
    .join("");

  return /*html*/ `
    <div class="result-section"><strong>Summary</strong></div>

    <div class="result-card summary column gap-30">
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
    <div class="insights">
      ${
        quick.length
          ? /*html*/ `
        <div class="column gap-10">
          <span class="block-title">Quick Wins</span>
          <ul class="insight-list">
            ${quick.map(renderRecommendationItem).join("")}
          </ul>
        </div>
      `
          : ""
      }
    </div>

    <div class="insights">
      ${
        advanced.length
          ? /*html*/ `
        <div class="column gap-10">
          <span class="block-title">Advanced Improvements</span>
          <ul class="insight-list">
            ${advanced.map(renderRecommendationItem).join("")}
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
      quick.push(item);
    } else {
      advanced.push(item);
    }
  });

  return {
    quick: dedupeInsights(quick).slice(0, 3),
    advanced: sortBySeverity(dedupeInsights(advanced)).slice(0, 3),
  };
}

function dedupeInsights(items = []) {
  const seen = new Set();

  return items.filter((item) => {
    const key = `${item.level}|${item.source}|${item.message}|${item.fix ?? ""}`;

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderRecommendationItem(item) {
  const levelLabel = getLevelLabel(item.level);

  return /*html*/ `
    <li class="insight-item">
      <div class="insight-message">
        ${levelLabel ? `<span class="level-label ${item.level}"><strong>[${levelLabel}]</strong></span> ` : ""}${item.message}
      </div>
      ${
        item.fix
          ? /*html*/ `
            <div class="insight-fix">
              <span class="fix-label"><strong>Fix:</strong></span> ${item.fix}
            </div>
          `
          : ""
      }
    </li>
  `;
}

function getLevelLabel(level) {
  if (level === "critical") return "CRITICAL";
  if (level === "warning") return "WARNING";
  return null;
}

function sortBySeverity(items = []) {
  const priority = {
    critical: 2,
    warning: 1,
  };

  return items.sort((a, b) => priority[b.level] - priority[a.level]);
}
