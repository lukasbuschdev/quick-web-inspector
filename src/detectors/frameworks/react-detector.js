export function detectReact(pageData) {
  const evidence = [];

  const html = pageData.dom.html;

  const hasDevtoolsHook = pageData.globals.hasReactDevtoolsHook;

  const hasFiberMarkers = html.includes("__reactFiber") || html.includes("__reactProps") || html.includes("__reactContainer");

  const hasReactRootAPI = pageData.scripts.content?.some((content) => content.includes("createRoot(") || content.includes("hydrateRoot("));

  const hasLegacyReactDOM = html.includes("data-reactroot") || html.includes("data-reactid");

  const hasReactScript = pageData.scripts.srcList.some((src) => /react(-dom)?(\.production|\.development)?(\.min)?\.js/i.test(src));

  if (hasDevtoolsHook) {
    evidence.push({
      type: "strong",
      message: "Found React DevTools hook",
    });
  }

  if (hasFiberMarkers) {
    evidence.push({
      type: "strong",
      message: "Found React Fiber internals",
    });
  }

  if (hasReactRootAPI && hasReactScript) {
    evidence.push({
      type: "strong",
      message: "Found React root API with script",
    });
  }

  if (hasLegacyReactDOM && hasReactScript) {
    evidence.push({
      type: "medium",
      message: "Found legacy React DOM attributes with script",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "React",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
