export function renderSummary(summary) {
  const { loadingPerformanceScore, interactionPerformanceScore, seoScore, overallScore, topIssues } = summary;
  const levelPriority = {
    critical: 2,
    warning: 1,
  };

  const sortedIssues = (topIssues || []).sort((a, b) => levelPriority[b.level] - levelPriority[a.level]).slice(0, 3);
  const issuesList = sortedIssues.map((issue) => `<li><span class="${issue.level}">[${issue.source}]</span> ${issue.message}</li>`).join("");

  return /*html*/ `
        <div class="result-section"><strong>Summary</strong></div>

        <div class="result-card column gap-20 summary">
            <div class="summary-score">
              <strong>Overall</strong>
              <div class="row gap-5">
                <span class="score ${getScoreClass(overallScore)}">${overallScore ?? "N/A"}</span>
                <span class="white"><strong>/ 100</strong></span>
              </div>
            </div>

            <div class="summary-breakdown column gap-20">
              <div class="row gap-10">
                <span><strong class="white">Loading Performance:</strong></span>
                <div class="row gap-5">
                  <span class="score ${getScoreClass(loadingPerformanceScore)}">${loadingPerformanceScore ?? "N/A"}</span>
                  <span class="white"><strong>/ 100</strong></span>
                </div>
              </div>

              <div class="row gap-10">
                <span><strong class="white">Interaction Performance:</strong></span>
                <div class="row gap-5">
                  <span class="score ${getScoreClass(interactionPerformanceScore)}">${interactionPerformanceScore ?? "N/A"}</span>
                  <span class="white"><strong>/ 100</strong></span>
                </div>
              </div>

              <div class="row gap-10">
                <span><strong class="white">SEO:</strong></span>
                <div class="row gap-5">
                  <span class="score ${getScoreClass(seoScore)}">${seoScore ?? "N/A"}</span>
                  <span class="white"><strong>/ 100</strong></span>
                </div>
              </div>
            </div>

            ${
              issuesList
                ? /*html*/ `
                <div class="insights column gap-10">
                  <strong>Top Issues</strong>
                  <ul>${issuesList}</ul>
                </div>
              `
                : ""
            }
        </div>
    `;
}

function getScoreClass(score) {
  if (score == null) return "";
  if (score >= 85) return "good";
  if (score >= 60) return "warning";
  return "critical";
}
