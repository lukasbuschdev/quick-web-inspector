export function detectAngular(pageData) {
  const evidence = [];

  const html = pageData.dom.html;

  const hasNgVersion = pageData.dom.hasNgVersion;

  const hasScopedAttributes = pageData.dom.angularScopedAttributes.length > 0;

  const hasNgServerContext = pageData.dom.hasNgServerContext;

  const hasNgReflect = pageData.dom.ngReflectAttributes.length > 0;

  const hasAngularGlobal = typeof window.ng !== "undefined";

  const hasAngularScript = pageData.scripts.srcList.some((src) => /@angular|angular(\.min)?\.js/i.test(src));

  if (hasNgVersion) {
    evidence.push({
      type: "strong",
      message: "Found ng-version attribute",
    });
  }

  if (hasScopedAttributes) {
    evidence.push({
      type: "strong",
      message: "Found Angular scoped attributes (_ngcontent/_nghost)",
    });
  }

  if (hasNgServerContext) {
    evidence.push({
      type: "strong",
      message: "Found Angular SSR marker",
    });
  }

  if (hasNgReflect && hasScopedAttributes) {
    evidence.push({
      type: "medium",
      message: "Found Angular dev-mode bindings",
    });
  }

  if (hasAngularGlobal && hasAngularScript) {
    evidence.push({
      type: "medium",
      message: "Found Angular global with script",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Angular",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
