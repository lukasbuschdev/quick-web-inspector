let metrics = {
  lcp: null,
  cls: 0,
  inp: null,
};

let observersInitialized = false;

export function detectPerformance() {
  initObservers();

  const evidence = [];

  let totalJSSize = 0;
  let jsFileCount = 0;
  let largestScript = null;

  try {
    const resources = performance.getEntriesByType("resource");
    const jsFiles = resources.filter((r) => r.initiatorType === "script" || (typeof r.name === "string" && r.name.endsWith(".js")));

    jsFileCount = jsFiles.length;

    jsFiles.forEach((r) => {
      const size = r.transferSize || r.encodedBodySize || 0;
      totalJSSize += size;

      if (!largestScript || size > largestScript.size) {
        largestScript = {
          name: r.name,
          size,
        };
      }
    });
  } catch (err) {
    evidence.push({
      type: "weak",
      message: "Resource timing not available",
    });
  }

  let blockingCSSCount = 0;
  let syncScriptCount = 0;

  try {
    const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    blockingCSSCount = cssLinks.filter((link) => !link.media || link.media === "all").length;

    const syncScripts = Array.from(document.querySelectorAll("head script:not([async]):not([defer])"));
    syncScriptCount = syncScripts.length;
  } catch (err) {
    evidence.push({
      type: "weak",
      message: "DOM analysis for render blocking failed",
    });
  }

  const insights = buildPerformanceInsights({
    coreWebVitals: {
      lcp: metrics.lcp != null ? { raw: metrics.lcp } : null,
      cls: metrics.cls > 0 ? { raw: metrics.cls } : null,
    },
    bundleAnalysis: {
      totalJSSize: { raw: totalJSSize },
      jsFileCount,
    },
    renderBlocking: {
      blockingCSS: blockingCSSCount,
      syncScriptsInHead: syncScriptCount,
    },
  });

  return {
    name: "Performance",
    type: "performance",
    detected: true,

    data: {
      coreWebVitals: {
        lcp:
          metrics.lcp != null
            ? {
                value: formatTime(metrics.lcp),
                raw: metrics.lcp,
                rating: rateLCP(metrics.lcp),
              }
            : null,

        cls:
          metrics.cls > 0
            ? {
                value: metrics.cls.toFixed(3),
                raw: metrics.cls,
                rating: rateCLS(metrics.cls),
              }
            : null,
      },

      bundleAnalysis: {
        totalJSSize: {
          value: formatBytes(totalJSSize),
          raw: totalJSSize,
        },
        jsFileCount,

        largestScript: largestScript
          ? {
              name: largestScript.name,
              size: formatBytes(largestScript.size),
              raw: largestScript.size,
            }
          : null,
      },

      renderBlocking: {
        blockingCSS: blockingCSSCount,
        syncScriptsInHead: syncScriptCount,
      },
    },

    insights,
    evidence,
  };
}

function initObservers() {
  if (observersInitialized) return;
  observersInitialized = true;

  try {
    // LCP
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        metrics.lcp = lastEntry.startTime;
      }
    });

    lcpObserver.observe({
      type: "largest-contentful-paint",
      buffered: true,
    });

    // CLS
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          metrics.cls += entry.value;
        }
      }
    });

    clsObserver.observe({
      type: "layout-shift",
      buffered: true,
    });
  } catch (err) {
    console.warn("PerformanceObserver not supported", err);
  }
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

function formatTime(ms) {
  if (ms === null || ms === undefined) return null;
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

function rateLCP(lcp) {
  if (lcp == null) return "unknown";
  if (lcp < 2500) return "good";
  if (lcp < 4000) return "needs improvement";
  return "poor";
}

function rateCLS(cls) {
  if (cls == null) return "unknown";
  if (cls < 0.1) return "good";
  if (cls < 0.25) return "needs improvement";
  return "poor";
}

function buildPerformanceInsights({ coreWebVitals, bundleAnalysis, renderBlocking }) {
  const insights = [];

  const lcp = coreWebVitals?.lcp?.raw;
  const cls = coreWebVitals?.cls?.raw;
  const jsSize = bundleAnalysis?.totalJSSize?.raw;
  const jsCount = bundleAnalysis?.jsFileCount;
  const blockingCSS = renderBlocking?.blockingCSS;
  const syncScripts = renderBlocking?.syncScriptsInHead;

  if (lcp != null) {
    if (lcp < 2500) {
      insights.push({ level: "good", message: "Fast largest contentful paint" });
    } else if (lcp < 4000) {
      insights.push({ level: "warning", message: "Moderate LCP, could be improved" });
    } else {
      insights.push({ level: "critical", message: "Slow LCP may impact load performance" });
    }
  }

  if (cls != null) {
    if (cls < 0.1) {
      insights.push({ level: "good", message: "Stable layout with minimal shifts" });
    } else if (cls < 0.25) {
      insights.push({ level: "warning", message: "Some layout shifts detected" });
    } else {
      insights.push({ level: "critical", message: "High layout shift affects UX" });
    }
  }

  if (jsSize != null) {
    if (jsSize < 150 * 1024) {
      insights.push({ level: "good", message: "Small JavaScript bundle size" });
    } else if (jsSize < 500 * 1024) {
      insights.push({ level: "warning", message: "Moderate JavaScript bundle size" });
    } else {
      insights.push({ level: "critical", message: "Large JavaScript bundle may slow loading" });
    }
  }

  if (jsCount > 20) {
    insights.push({ level: "warning", message: "High number of JavaScript files detected" });
  }

  if (blockingCSS > 0) {
    insights.push({ level: "warning", message: "Blocking CSS may delay initial render" });
  }

  if (syncScripts > 0) {
    insights.push({ level: "critical", message: "Synchronous scripts in head block rendering" });
  }

  if (lcp != null && cls != null && lcp < 2500 && cls < 0.1 && jsSize < 150 * 1024) {
    insights.push({ level: "good", message: "Overall strong performance profile" });
  }

  return insights;
}
