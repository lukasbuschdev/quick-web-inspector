import { renderCDN } from "./templates/cdn";
import { renderInteraction } from "./templates/interaction-performance";
import { renderLoading } from "./templates/loading-performance";
import { renderPrimary } from "./templates/primary-technologies";
import { renderRenderingStrategy } from "./templates/rendering";
import { renderSecondary, renderSecondaryFallback } from "./templates/secondary-technologies";
import { renderSEO } from "./templates/seo";
import { renderSummary } from "./templates/summary";
import { renderFallback } from "./templates/technology-fallback";

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

function processTechnologyData(primary, secondary) {
  const detectedTypes = [];

  if (primary) detectedTypes.push(primary.type);
  if (secondary?.length) {
    secondary.forEach((r) => detectedTypes.push(r.type));
  }

  return {
    categoryInsights: buildCategoryInsights({
      hasFramework: detectedTypes.includes("framework"),
      hasCMS: detectedTypes.includes("cms"),
      hasLibrary: detectedTypes.includes("library"),
    }),
  };
}

function renderResults(data) {
  const { primary, secondary, rendering, cdn, performance, seo, summary } = data || {};
  const loading = performance?.loading || null;
  const interaction = performance?.interaction || null;
  const { categoryInsights } = processTechnologyData(primary, secondary);

  let html = "";

  if (summary) {
    html += renderSummary(summary);
  }

  if (loading) {
    html += renderLoading(loading);
  }

  if (interaction) {
    html += renderInteraction(interaction);
  }

  if (seo && seo.data) {
    html += renderSEO(seo);
  }

  if (primary) {
    html += renderPrimary(primary, categoryInsights);
  }

  if (secondary) {
    html += /*html*/ `
      <div class="result-section"><strong>Secondary Technologies</strong></div>
      ${secondary.length > 0 ? secondary.map(renderSecondary).join("") : renderSecondaryFallback()}
    `;
  }

  if (!html) {
    html = renderFallback();
  }

  if (rendering) {
    html += renderRenderingStrategy(rendering);
  }

  if (cdn) {
    html += renderCDN(cdn);
  }

  resultsContainer.innerHTML = html;
}

export function buildPerformanceInsightGroup(title, items, className) {
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

export function truncateUrl(str, max = 40) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "..." : str;
}

function buildCategoryInsights({ hasFramework, hasCMS, hasLibrary }) {
  const insights = [];

  if (!hasFramework && !hasCMS) {
    insights.push("No framework or CMS detected");
  } else {
    if (!hasFramework) insights.push("No frontend framework detected");
    if (!hasCMS) insights.push("No CMS detected");
  }

  if (!hasLibrary && !hasFramework && !hasCMS) {
    insights.push("No major frontend libraries detected");
  }

  return insights;
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
  }, 1000);
}
