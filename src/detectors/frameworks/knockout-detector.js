export function detectKnockout(pageData) {
  const evidence = [];

  const html = pageData.dom.html;

  const hasKnockoutGlobal = !!window.ko;

  if (hasKnockoutGlobal) {
    evidence.push({
      type: "strong",
      message: "Found Knockout global",
    });
  }

  const hasKnockoutBindings = html.includes("data-bind");

  if (hasKnockoutBindings) {
    evidence.push({
      type: "strong",
      message: "Found Knockout data-bind attributes",
    });
  }

  const hasKnockoutScripts = pageData.scripts.srcList.some((src) => src.toLowerCase().includes("knockout"));

  if (hasKnockoutScripts) {
    evidence.push({
      type: "medium",
      message: "Found Knockout script",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Knockout.js",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
