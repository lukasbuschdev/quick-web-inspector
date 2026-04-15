export function detectLit(pageData) {
  const evidence = [];

  const html = pageData.dom.html;

  const hasLitMarkers = html.includes("lit-html") || html.includes("lit-element") || html.includes("@lit/reactive-element");

  if (hasLitMarkers) {
    evidence.push({
      type: "strong",
      message: "Found Lit core libraries",
    });
  }

  const hasLitTemplateMarkers = html.includes("lit$") || html.includes("<!--?lit");

  if (hasLitTemplateMarkers) {
    evidence.push({
      type: "strong",
      message: "Found Lit template markers",
    });
  }

  const hasLitAttributes = html.includes("data-lit");

  if (hasLitAttributes) {
    evidence.push({
      type: "medium",
      message: "Found Lit attributes",
    });
  }

  const hasLitScripts = pageData.scripts.srcList.some((src) => src.toLowerCase().includes("lit"));

  if (hasLitScripts) {
    evidence.push({
      type: "medium",
      message: "Found Lit-related script",
    });
  }

  const hasLitRuntime = pageData.scripts.content?.some((content) => content.includes("lit-html") || content.includes("render("));

  if (hasLitRuntime) {
    evidence.push({
      type: "weak",
      message: "Found possible Lit runtime usage",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Lit",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
