export function detectSquarespace(pageData) {
  const evidence = [];

  const html = pageData.dom.html;

  const hasSquarespaceCDN = html.includes("squarespace.com");

  if (hasSquarespaceCDN) {
    evidence.push({
      type: "strong",
      message: "Found Squarespace CDN",
    });
  }

  const hasSquarespaceAttrs = html.includes("data-sqsp");

  if (hasSquarespaceAttrs) {
    evidence.push({
      type: "medium",
      message: "Found Squarespace attributes",
    });
  }

  const hasSquarespaceGlobal = !!window.Squarespace;

  if (hasSquarespaceGlobal) {
    evidence.push({
      type: "medium",
      message: "Found Squarespace global",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Squarespace",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
