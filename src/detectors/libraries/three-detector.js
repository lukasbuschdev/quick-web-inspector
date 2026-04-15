export function detectThree(pageData) {
  const evidence = [];

  const hasThreeGlobal = typeof window.THREE !== "undefined" && typeof window.THREE === "object";

  const hasThreeRuntime = pageData.scripts.content?.some((content) => content.includes("new THREE.Scene(") || content.includes("new THREE.Mesh(") || content.includes("new THREE.PerspectiveCamera("));

  const hasThreeScript = pageData.scripts.srcList.some((src) => /three(\.module)?(\.min)?\.js/i.test(src));

  const hasWebGLContext = pageData.scripts.content?.some((content) => content.includes("WebGLRenderer") || content.includes("THREE.WebGLRenderer"));

  if (hasThreeGlobal && hasThreeRuntime) {
    evidence.push({
      type: "strong",
      message: "Found Three.js global with runtime usage",
    });
  }

  if (hasThreeGlobal && hasThreeScript) {
    evidence.push({
      type: "strong",
      message: "Found Three.js global with script",
    });
  }

  if (hasThreeRuntime && hasWebGLContext) {
    evidence.push({
      type: "medium",
      message: "Found Three.js rendering patterns",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Three.js",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
