import { renderSummary } from "../templates/summary";
import { renderFallback } from "../templates/technology-fallback";

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
  const { summary } = data || {};
  let html = "";

  if (summary) {
    html += renderSummary(summary);
    html += /*html*/ `
      <div class="dashboard-btn-container">
        <button id="open-dashboard-btn">View Full Analysis</button>
      </div>
    `;
  }

  if (!html) {
    html = renderFallback();
  }

  resultsContainer.innerHTML = html;
  attachDashboardHandler();
}

function attachDashboardHandler() {
  const btn = document.getElementById("open-dashboard-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      if (!activeTab?.id) return;

      chrome.tabs.create({
        url: chrome.runtime.getURL(`src/dashboard/dashboard.html?tabId=${activeTab.id}`),
      });
    });
  });
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
