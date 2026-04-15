export function detectJQuery(pageData) {
  const evidence = [];

  const hasJQueryGlobal = typeof window.jQuery !== "undefined" && typeof window.jQuery === "function";

  const hasDollarAlias = typeof window.$ === "function" && window.$ === window.jQuery;

  const hasJQueryScript = pageData.scripts.srcList.some((src) => /jquery(-\d+\.\d+\.\d+)?(\.min)?\.js/i.test(src));

  const hasJQueryReady = pageData.scripts.content?.some((content) => content.includes("$(document).ready(") || content.includes("jQuery(document).ready("));

  const hasAjaxUsage = pageData.scripts.content?.some((content) => content.includes("$.ajax("));

  if (hasJQueryGlobal && hasDollarAlias) {
    evidence.push({
      type: "strong",
      message: "Found jQuery global with $ alias",
    });
  }

  if (hasJQueryGlobal && hasJQueryReady) {
    evidence.push({
      type: "strong",
      message: "Found jQuery global with ready() usage",
    });
  }

  if (hasJQueryScript && hasAjaxUsage) {
    evidence.push({
      type: "medium",
      message: "Found jQuery script with AJAX usage",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "jQuery",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
