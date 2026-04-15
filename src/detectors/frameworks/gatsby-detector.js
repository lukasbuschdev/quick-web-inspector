export function detectGatsby(pageData) {
  const evidence = [];

  const hasGatsbyRoot = pageData.dom.html.includes('id="___gatsby"');

  if (hasGatsbyRoot) {
    evidence.push({
      type: "strong",
      message: "Found Gatsby root element",
    });
  }

  const hasGatsbyGlobal = pageData.dom.html.includes("___gatsby") || pageData.dom.html.includes("___loader");

  if (hasGatsbyGlobal) {
    evidence.push({
      type: "strong",
      message: "Found Gatsby runtime globals",
    });
  }

  const hasPageData = pageData.dom.html.includes("/page-data/");

  if (hasPageData) {
    evidence.push({
      type: "medium",
      message: "Found Gatsby page-data requests",
    });
  }

  const hasGatsbyScripts = pageData.scripts.srcList.some((src) => src.includes("gatsby"));

  if (hasGatsbyScripts) {
    evidence.push({
      type: "weak",
      message: "Found Gatsby-related script",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Gatsby",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
