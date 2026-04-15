export function detectAOS(pageData) {
  const evidence = [];

  const html = pageData.dom.html;

  const aosElements = (html.match(/data-aos=/g) || []).length;

  const hasMultipleAOSAttributes = aosElements >= 3;

  const hasAOSRuntime = pageData.scripts.content?.some((content) => content.includes("AOS.init("));

  const hasAOSScript = pageData.scripts.srcList.some((src) => /\/aos(\.min)?\.js/i.test(src));

  if (hasMultipleAOSAttributes && hasAOSRuntime) {
    evidence.push({
      type: "strong",
      message: "Found multiple AOS attributes with runtime initialization",
    });
  }

  if (hasMultipleAOSAttributes && hasAOSScript) {
    evidence.push({
      type: "strong",
      message: "Found multiple AOS attributes with AOS script",
    });
  }

  if (hasAOSRuntime && hasAOSScript) {
    evidence.push({
      type: "medium",
      message: "Found AOS runtime and script",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "AOS",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
