const resultsContainer = document.getElementById("results");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];

  if (!activeTab?.id) {
    renderResults({});
    return;
  }

  chrome.storage.local.get(`stackResults_${activeTab.id}`, (data) => {
    renderResults(data[`stackResults_${activeTab.id}`] || {});
    initAutoRefresh(activeTab.id);
  });
});

function renderResults(data) {
  const { primary, secondary, rendering, cdn, performance } = data || {};
  let html = "";
  const detectedTypes = [];

  if (primary) detectedTypes.push(primary.type);
  if (secondary && secondary.length > 0) {
    secondary.forEach((r) => detectedTypes.push(r.type));
  }

  const hasFramework = detectedTypes.includes("framework");
  const hasCMS = detectedTypes.includes("cms");
  const hasLibrary = detectedTypes.includes("library");

  const categoryInsights = buildCategoryInsights({
    hasFramework,
    hasCMS,
    hasLibrary,
  });

  if (primary) {
    const evidenceItems = (primary.evidence || []).map((item) => `<li>${item.message}</li>`).join("");
    const baseInsights = primary.insights || [];
    const allInsights = [...baseInsights, ...categoryInsights];
    const insightsItems = allInsights.map((item) => `<li>${item}</li>`).join("");

    html += `<div class="result-section"><strong>Primary Technologies</strong></div>`;
    html += `
      <div class="result-card primary column gap-20">
        <div class="result-header">
          <strong>[${formatType(primary.type)}] ${primary.name}</strong>
          <strong>${primary.confidence}%</strong>
        </div>

        <div class="column gap-20">
          ${evidenceItems ? `<ul>${evidenceItems}</ul>` : `<p class="muted">No direct evidence found</p>`}

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
      </div>
    `;
  }

  if (secondary && secondary.length > 0) {
    html += `<div class="result-section"><strong>Secondary Technologies</strong></div>`;
    html += secondary
      .map((result) => {
        const evidenceItems = (result.evidence || []).map((item) => `<li>${item.message}</li>`).join("");
        const insightsItems = (result.insights || []).map((item) => `<li>${item}</li>`).join("");

        return `
          <div class="result-card column gap-20">
            <div class="result-header">
              <strong>[${formatType(result.type)}] ${result.name}</strong>
              <strong>${result.confidence}%</strong>
            </div>

            ${evidenceItems ? `<ul>${evidenceItems}</ul>` : `<p class="muted">No direct evidence found</p>`}

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
      })
      .join("");
  }

  if (!html) {
    html = `
      <div class="result-card column gap-20">
        <div class="result-header">
          <strong>Analysis</strong>
        </div>
        <span class="muted">
          No detectable technologies. This site likely uses server-side rendering,
          a custom framework, or heavily optimized production builds.
        </span>
      </div>
    `;
  }

  if (rendering) {
    const evidenceItems = (rendering.evidence || []).map((item) => `<li>${item.message}</li>`).join("");

    html += `<div class="result-section"><strong>Rendering Strategy</strong></div>`;
    html += `
    <div class="result-card column gap-20">
      <div class="result-header">
        <strong>${formatRenderingStrategy(rendering.strategy)}</strong>
        <strong>${rendering.confidence}%</strong>
      </div>

      ${evidenceItems ? `<ul>${evidenceItems}</ul>` : `<span class="muted">No clear rendering evidence found</span>`}
    </div>
  `;
  }

  if (cdn) {
    const evidenceItems = (cdn.evidence || []).map((item) => `<li>${item.message}</li>`).join("");
    const edge = cdn.edge ? `<span><strong>Edge:</strong> ${cdn.edge}</span>` : "";
    const assets = cdn.assets && cdn.assets.length > 0 ? `<span><strong>Assets:</strong> ${cdn.assets.join(", ")}</span>` : "";
    const source = cdn.source === "headers" ? `<span><strong>Detected via:</strong> server headers</span>` : `<span><strong>Detected via:</strong> resource analysis</span>`;
    const platform = cdn.platform ? `<span><strong>Platform:</strong> ${cdn.platform}</span>` : "";

    html += `<div class="result-section"><strong>Delivery & Hosting</strong></div>`;

    html += `
      <div class="result-card column gap-20">
        <div class="result-header">
          <strong>${cdn.edge || cdn.platform || (cdn.assets.length > 0 ? "Asset CDN detected" : "No CDN detected")}</strong>
          <strong>${cdn.confidence}%</strong>
        </div>

        <div class="column gap-20">
          ${source}
          ${edge}
          ${platform}
          ${assets}
        </div>

        ${evidenceItems ? `<ul>${evidenceItems}</ul>` : `<span class="muted">No clear CDN evidence found</span>`}
      </div>
    `;
  }

  if (performance && performance.data) {
    const { coreWebVitals, bundleAnalysis, renderBlocking } = performance.data;
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

    (performance.insights || []).forEach((item) => {
      if (groupedInsights[item.level]) {
        groupedInsights[item.level].push(item.message);
      }
    });

    const insightsItems = `
      ${buildInsightGroup("Critical Issues", groupedInsights.critical, "critical")}
      ${buildInsightGroup("Warnings", groupedInsights.warning, "warning")}
      ${buildInsightGroup("Good Signals", groupedInsights.good, "good")}
    `;

    html += `<div class="result-section"><strong>Performance</strong></div>`;
    html += `
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
            ? `
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

  resultsContainer.innerHTML = html;
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

function buildCategoryInsights({ hasFramework, hasCMS, hasLibrary }) {
  const insights = [];

  if (!hasFramework && !hasCMS) {
    insights.push("No framework or CMS detected");
  } else {
    if (!hasFramework) {
      insights.push("No frontend framework detected");
    }

    if (!hasCMS) {
      insights.push("No CMS detected");
    }
  }

  if (!hasLibrary && !hasFramework && !hasCMS) {
    insights.push("No major frontend libraries detected");
  }

  return insights;
}

function buildInsightGroup(title, items, className) {
  if (!items.length) return "";

  return `
    <div class="insight-group ${className}">
      <strong>${title}</strong>
      <ul>
        ${items.map((msg) => `<li>${msg}</li>`).join("")}
      </ul>
    </div>
  `;
}

function formatRenderingStrategy(strategy) {
  switch (strategy) {
    case "SSR":
      return "Server-side Rendering (SSR)";
    case "SSG":
      return "Static Site Generation (SSG)";
    case "CSR":
      return "Client-side Rendering (CSR)";
    default:
      return "Unknown";
  }
}

function basename(url) {
  try {
    return url.split("/").pop().split("?")[0];
  } catch {
    return url;
  }
}

function truncateUrl(str, max = 40) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "..." : str;
}

function initAutoRefresh(tabId) {
  let count = 0;

  const intervalId = setInterval(() => {
    chrome.storage.local.get(`stackResults_${tabId}`, (data) => {
      renderResults(data[`stackResults_${tabId}`] || {});
    });

    count++;

    if (count >= 15) {
      clearInterval(intervalId);
    }
  }, 1000);
}
