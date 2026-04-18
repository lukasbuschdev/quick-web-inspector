import { buildPerformanceInsightGroup, truncateUrl } from "../utils/helpers";

export function renderLoading(loading) {
  const { coreWebVitals, bundleAnalysis, renderBlocking } = loading.data;
  const lcp = coreWebVitals?.lcp ? `<span><strong>LCP:</strong> ${coreWebVitals.lcp.value} (${coreWebVitals.lcp.rating})</span>` : `<span class="muted"><strong>LCP:</strong> analyzing...</span>`;
  const cls = coreWebVitals?.cls ? `<span><strong>CLS:</strong> ${coreWebVitals.cls.value} (${coreWebVitals.cls.rating})</span>` : `<span class="muted"><strong>CLS:</strong> analyzing...</span>`;
  const totalJS = bundleAnalysis?.totalJSSize ? `<span><strong>Total JS size:</strong> ${bundleAnalysis.totalJSSize.value}</span>` : `<span class="muted">Total JS size: not available</span>`;
  const jsCount = bundleAnalysis?.jsFileCount !== undefined ? `<span><strong>JS files:</strong> ${bundleAnalysis.jsFileCount}</span>` : `<span class="muted">JS files: not available</span>`;
  const largestScript = bundleAnalysis?.largestScript
    ? `<span><strong>Largest script:</strong> ${truncateUrl(basename(bundleAnalysis.largestScript.name))} (${bundleAnalysis.largestScript.size})</span>`
    : `<span class="muted">Largest script: not available</span>`;
  const blockingCSS = renderBlocking ? `<span><strong>Blocking CSS:</strong> ${renderBlocking.blockingCSS}</span>` : `<span class="muted">Blocking CSS: not available</span>`;
  const syncScripts = renderBlocking ? `<span><strong>Sync scripts in head:</strong> ${renderBlocking.syncScriptsInHead}</span>` : `<span class="muted">Sync scripts: not available</span>`;

  const groupedInsights = {
    critical: [],
    warning: [],
    good: [],
  };

  (loading.insights || []).forEach((item) => {
    if (groupedInsights[item.level]) {
      groupedInsights[item.level].push(item.message);
    }
  });

  const insightsItems = `
      ${buildPerformanceInsightGroup("Critical Issues", groupedInsights.critical, "critical")}
      ${buildPerformanceInsightGroup("Warnings", groupedInsights.warning, "warning")}
      ${buildPerformanceInsightGroup("Good Signals", groupedInsights.good, "good")}
    `;

  return /*html*/ `
    <div class="result-section"><strong>Loading Performance</strong></div>
    <div class="result-card column gap-30">
        <div class="column gap-10">
          <span class="white"><strong>Core Web Vitals</strong></span>
          ${lcp}
          ${cls}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Bundle Analysis</strong></span>
          ${totalJS}
          ${jsCount}
          ${largestScript}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Render Blocking</strong></span>
          ${blockingCSS}
          ${syncScripts}
        </div>

        ${
          insightsItems
            ? /*html*/ `
              <div class="insights column gap-10">
                <strong>Analysis</strong>
                <ul>${insightsItems}</ul>
              </div>
            `
            : ""
        }
      </div>
    `;
}

function basename(url) {
  try {
    return url.split("/").pop().split("?")[0];
  } catch {
    return url;
  }
}
