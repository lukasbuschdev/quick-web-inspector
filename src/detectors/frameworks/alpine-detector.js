export function detectAlpine(pageData) {
  const evidence = [];

  const html = pageData.dom.html;

  const hasAlpineDirectives = html.includes("x-data") || html.includes("x-bind") || html.includes("x-show") || html.includes("x-if") || html.includes("x-for") || html.includes("x-on:") || html.includes("@click");

  if (hasAlpineDirectives) {
    evidence.push({
      type: "strong",
      message: "Found Alpine.js directives (x-*)",
    });
  }

  const hasAlpineScript = pageData.scripts.srcList.some((src) => src.toLowerCase().includes("alpine"));

  if (hasAlpineScript) {
    evidence.push({
      type: "medium",
      message: "Found Alpine.js script",
    });
  }

  const hasAlpineRuntime = pageData.scripts.content?.some((content) => content.includes("Alpine.start") || content.includes("window.Alpine"));

  if (hasAlpineRuntime) {
    evidence.push({
      type: "medium",
      message: "Found Alpine.js runtime",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Alpine.js",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
