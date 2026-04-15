export function detectQwik(pageData) {
  const evidence = [];

  const html = pageData.dom.html;

  const hasQwikAttributes = html.includes("q:container") || html.includes("q:render") || html.includes("q:slot") || html.includes("q:base");

  if (hasQwikAttributes) {
    evidence.push({
      type: "strong",
      message: "Found Qwik q:* attributes",
    });
  }

  const hasQwikVersion = html.includes("qv=");

  if (hasQwikVersion) {
    evidence.push({
      type: "strong",
      message: "Found Qwik version marker",
    });
  }

  const hasQwikScripts = pageData.scripts.srcList.some((src) => src.includes("/q-") || src.toLowerCase().includes("qwik"));

  if (hasQwikScripts) {
    evidence.push({
      type: "medium",
      message: "Found Qwik script bundle",
    });
  }

  const hasQwikRuntime = pageData.scripts.content?.some((content) => content.includes("qrl(") || content.includes("QwikLoader") || content.includes("window.qwik"));

  if (hasQwikRuntime) {
    evidence.push({
      type: "medium",
      message: "Found Qwik runtime",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Qwik",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
