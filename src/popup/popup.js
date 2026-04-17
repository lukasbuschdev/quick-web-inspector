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

function renderResults(data) {
  const { primary, secondary, rendering, cdn, performance, seo, summary } = data || {};
  const loading = performance?.loading || null;
  const interaction = performance?.interaction || null;

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

  if (summary) {
    const { loadingPerformanceScore, interactionPerformanceScore, seoScore, overallScore, topIssues } = summary;
    const levelPriority = {
      critical: 2,
      warning: 1,
    };

    const sortedIssues = (topIssues || []).sort((a, b) => levelPriority[b.level] - levelPriority[a.level]).slice(0, 3);
    const issuesList = sortedIssues.map((issue) => `<li><span class="${issue.level}">[${issue.source}]</span> ${issue.message}</li>`).join("");

    html += /*html*/ `
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

  if (loading) {
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

    html += /*html*/ `<div class="result-section"><strong>Loading Performance</strong></div>`;
    html += /*html*/ `
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

  if (interaction) {
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

    html += /*html*/ `<div class="result-section"><strong>Interaction Performance</strong></div>`;
    html += /*html*/ `
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

  if (seo && seo.data) {
    const { title, description, canonical, lang, headings, images, meta } = seo.data;

    const groupedInsights = {
      critical: [],
      warning: [],
      good: [],
    };

    (seo.insights || []).forEach((item) => {
      if (groupedInsights[item.level]) {
        groupedInsights[item.level].push(item.message);
      }
    });

    const insightsItems = `
      ${buildSeoInsightGroup("Critical Issues", groupedInsights.critical, "critical")}
      ${buildSeoInsightGroup("Warnings", groupedInsights.warning, "warning")}
      ${buildSeoInsightGroup("Good Signals", groupedInsights.good, "good")}
    `;

    const titleField = title ? `<span><strong>Title:</strong> ${truncateUrl(title, 50)}</span>` : `<span class="muted">Title: missing</span>`;
    const descriptionField = description ? `<span><strong>Description:</strong> ${truncateUrl(description, 70)}</span>` : `<span class="muted">Description: missing</span>`;
    const h1Field = `<span><strong>H1:</strong> ${headings?.h1 ?? 0}</span>`;
    const h2Field = `<span><strong>H2:</strong> ${headings?.h2 ?? 0}</span>`;
    const imgField = `<span><strong>Images:</strong> ${images?.total ?? 0} (${images?.missingAlt ?? 0} missing alt)</span>`;
    const langField = lang ? `<span><strong>Lang:</strong> ${lang}</span>` : `<span class="muted">Lang: missing</span>`;
    const canonicalField = canonical ? `<span><strong>Canonical:</strong> set</span>` : `<span class="muted">Canonical: missing</span>`;
    const viewportField = meta?.viewport ? `<span><strong>Viewport:</strong> set</span>` : `<span class="muted">Viewport: missing</span>`;
    const ogField = `<span><strong>Open Graph:</strong> ${meta?.openGraph ?? 0}</span>`;
    const twitterField = `<span><strong>Twitter:</strong> ${meta?.twitter ?? 0}</span>`;

    html += /*html*/ `<div class="result-section"><strong>SEO</strong></div>`;
    html += /*html*/ `
      <div class="result-card column gap-30">
        <div class="column gap-10">
          <span class="white"><strong>Structure</strong></span>
          ${titleField}
          ${descriptionField}
          ${langField}
          ${canonicalField}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Headings & Content</strong></span>
          ${h1Field}
          ${h2Field}
          ${imgField}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Meta & Social</strong></span>
          ${viewportField}
          ${ogField}
          ${twitterField}
        </div>

        ${
          insightsItems
            ? /*html*/ `
            <div class="insights column gap-10">
              <span class="white"><strong>Analysis</strong></span>
              <ul>${insightsItems}</ul>
            </div>
          `
            : ""
        }
      </div>
    `;
  }

  if (primary) {
    const evidenceItems = (primary.evidence || []).map((item) => `<li>${item.message}</li>`).join("");
    const baseInsights = primary.insights || [];
    const allInsights = [...baseInsights, ...categoryInsights];
    const insightsItems = allInsights.map((item) => `<li>${item}</li>`).join("");

    html += /*html*/ `<div class="result-section"><strong>Primary Technologies</strong></div>`;
    html += /*html*/ `
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

  if (secondary && secondary.length > 0) {
    html += /*html*/ `<div class="result-section"><strong>Secondary Technologies</strong></div>`;
    html += secondary
      .map((result) => {
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
                ? /*html*/ `
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
    html = /*html*/ `
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

    html += /*html*/ `<div class="result-section"><strong>Rendering Strategy</strong></div>`;
    html += /*html*/ `
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

    html += /*html*/ `<div class="result-section"><strong>Delivery & Hosting</strong></div>`;
    html += /*html*/ `
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

function buildPerformanceInsightGroup(title, items, className) {
  if (!items.length) return "";

  return /*html*/ `
    <div class="insight-group ${className}">
      <strong>${title}</strong>
      <ul>
        ${items.map((msg) => `<li>${msg}</li>`).join("")}
      </ul>
    </div>
  `;
}

function buildSeoInsightGroup(title, items, className) {
  if (!items.length) return "";

  return /*html*/ `
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

function getScoreClass(score) {
  if (score == null) return "";
  if (score >= 85) return "good";
  if (score >= 60) return "warning";
  return "critical";
}

function getMetricClass(value, thresholds) {
  if (value == null) return "";

  if (value >= thresholds.critical) return "critical";
  if (value >= thresholds.warning) return "warning";
  return "good";
}

function initAutoRefresh(tabId) {
  let count = 0;

  const intervalId = setInterval(() => {
    chrome.storage.local.get(`stackResults_${tabId}`, (data) => {
      renderResults(data[`stackResults_${tabId}`] || {});
    });

    count++;

    if (count >= 5) {
      clearInterval(intervalId);
    }
  }, 2000);
}
