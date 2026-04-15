export function detectPreact(pageData) {
  const evidence = [];

  const hasPreactDevtools = !!window.__PREACT_DEVTOOLS__;

  if (hasPreactDevtools) {
    evidence.push({
      type: "strong",
      message: "Found Preact DevTools hook",
    });
  }

  const hasPreactGlobal = pageData.dom.html.includes("window.preact");

  if (hasPreactGlobal) {
    evidence.push({
      type: "medium",
      message: "Found Preact global",
    });
  }

  const hasPreactScripts = pageData.scripts.srcList.some((src) => src.toLowerCase().includes("preact"));

  if (hasPreactScripts) {
    evidence.push({
      type: "medium",
      message: "Found Preact script reference",
    });
  }

  const hasPreactInternals = pageData.dom.html.includes("__k") || pageData.dom.html.includes("__e") || pageData.dom.html.includes("__d");

  if (hasPreactInternals) {
    evidence.push({
      type: "weak",
      message: "Found possible Preact VDOM internals",
    });
  }

  const hasPreactRuntime = pageData.scripts.content?.some((content) => content.includes("preact") || content.includes("h("));

  if (hasPreactRuntime) {
    evidence.push({
      type: "weak",
      message: "Found possible Preact runtime usage",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Preact",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
