export function detectBackbone(pageData) {
  const evidence = [];

  const hasBackboneGlobal = !!window.Backbone;

  if (hasBackboneGlobal) {
    evidence.push({
      type: "strong",
      message: "Found Backbone global",
    });
  }

  const hasBackboneRuntime = pageData.scripts.content?.some((content) => content.includes("Backbone.Model") || content.includes("Backbone.View"));

  if (hasBackboneRuntime) {
    evidence.push({
      type: "medium",
      message: "Found Backbone runtime usage",
    });
  }

  const hasBackboneScripts = pageData.scripts.srcList.some((src) => src.toLowerCase().includes("backbone"));

  if (hasBackboneScripts) {
    evidence.push({
      type: "medium",
      message: "Found Backbone script",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Backbone.js",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
