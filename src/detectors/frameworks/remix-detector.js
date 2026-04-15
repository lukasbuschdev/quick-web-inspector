export function detectRemix(pageData) {
  const evidence = [];

  const hasRemixContext = pageData.dom.html.includes("__remixContext");

  if (hasRemixContext) {
    evidence.push({
      type: "strong",
      message: "Found Remix runtime context",
    });
  }

  const hasRemixScripts = pageData.scripts.content?.some((content) => content.includes("remixRouteModules") || content.includes("createBrowserRouter") || content.includes("entry.client"));

  if (hasRemixScripts) {
    evidence.push({
      type: "medium",
      message: "Found Remix route/runtime patterns",
    });
  }

  const hasRemixDataAttrs = pageData.dom.html.includes("data-remix");

  if (hasRemixDataAttrs) {
    evidence.push({
      type: "medium",
      message: "Found Remix data attributes",
    });
  }

  const hasRemixInScripts = pageData.scripts.srcList.some((src) => src.toLowerCase().includes("remix"));

  if (hasRemixInScripts) {
    evidence.push({
      type: "weak",
      message: "Found Remix-related script",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Remix",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
