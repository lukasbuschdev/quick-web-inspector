export function detectEmber(pageData) {
  const evidence = [];

  const html = pageData.dom.html;

  const hasEmberGlobal = !!window.Ember;

  if (hasEmberGlobal) {
    evidence.push({
      type: "strong",
      message: "Found Ember global",
    });
  }

  const hasEmberDOM = html.includes("ember-view") || html.includes("data-ember-action");

  if (hasEmberDOM) {
    evidence.push({
      type: "strong",
      message: "Found Ember DOM markers",
    });
  }

  const hasEmberScripts = pageData.scripts.srcList.some((src) => src.toLowerCase().includes("ember"));

  if (hasEmberScripts) {
    evidence.push({
      type: "medium",
      message: "Found Ember script",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Ember.js",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
