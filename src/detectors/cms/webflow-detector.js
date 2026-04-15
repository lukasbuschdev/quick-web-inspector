export function detectWebflow(pageData) {
  const evidence = [];

  const html = pageData.dom.html;

  const hasWebflowClass = html.includes("w-webflow");

  if (hasWebflowClass) {
    evidence.push({
      type: "strong",
      message: "Found Webflow classes",
    });
  }

  const hasWebflowAttrs = html.includes("data-wf-page");

  if (hasWebflowAttrs) {
    evidence.push({
      type: "medium",
      message: "Found Webflow attributes",
    });
  }

  const hasWebflowScripts = pageData.scripts.srcList.some((src) => src.includes("webflow.js"));

  if (hasWebflowScripts) {
    evidence.push({
      type: "strong",
      message: "Found Webflow script",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Webflow",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
