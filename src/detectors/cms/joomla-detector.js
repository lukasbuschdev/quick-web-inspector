export function detectJoomla(pageData) {
  const evidence = [];

  const html = pageData.dom.html;

  const hasJoomlaPaths = html.includes("option=com_") || html.includes("/media/system/js/");

  if (hasJoomlaPaths) {
    evidence.push({
      type: "strong",
      message: "Found Joomla paths",
    });
  }

  const hasJoomlaMeta = (pageData.meta.generator || "").toLowerCase().includes("joomla");

  if (hasJoomlaMeta) {
    evidence.push({
      type: "strong",
      message: "Found Joomla generator meta",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Joomla",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
