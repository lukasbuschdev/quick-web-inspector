export function detectSolid(pageData) {
  const evidence = [];

  const hasSolidRoot = pageData.dom.html.includes("data-hk") || pageData.dom.html.includes("data-solid");

  if (hasSolidRoot) {
    evidence.push({
      type: "medium",
      message: "Found SolidJS DOM markers",
    });
  }

  const hasSolidRuntime = pageData.scripts.content?.some((content) => content.includes("createSignal") || content.includes("createEffect") || content.includes("insert("));

  if (hasSolidRuntime) {
    evidence.push({
      type: "medium",
      message: "Found SolidJS reactive primitives",
    });
  }

  const hasSolidDevtools = !!window.__SOLID_DEVTOOLS_GLOBAL_HOOK__;

  if (hasSolidDevtools) {
    evidence.push({
      type: "strong",
      message: "Found Solid DevTools hook",
    });
  }

  const hasSolidInScripts = pageData.scripts.srcList.some((src) => src.toLowerCase().includes("solid"));

  if (hasSolidInScripts) {
    evidence.push({
      type: "weak",
      message: "Found Solid-related script",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Solid",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
