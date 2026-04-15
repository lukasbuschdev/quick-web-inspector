export function detectBootstrap(pageData) {
  const evidence = [];

  const classes = pageData.dom.classList;
  const html = pageData.dom.html;

  const hasBootstrapJS = html.includes("data-bs-toggle") || html.includes("data-bs-target") || html.includes("data-bs-dismiss");

  const hasBootstrapScript = pageData.scripts.srcList.some((src) => /bootstrap(\.bundle)?(\.min)?\.js/i.test(src));

  const hasBtnCombo = classes.includes("btn") && classes.some((c) => /^btn-(primary|secondary|success|danger|warning|info|light|dark)$/.test(c));

  const hasNavbarCombo = classes.includes("navbar") && classes.some((c) => /^navbar-(expand|dark|light)/.test(c));

  const hasModalCombo = classes.includes("modal") && classes.includes("fade");

  const hasDropdownCombo = classes.includes("dropdown-menu") && classes.includes("dropdown-item");

  if (hasBootstrapJS && hasBootstrapScript) {
    evidence.push({
      type: "strong",
      message: "Found Bootstrap JS attributes with script",
    });
  }

  if (hasBtnCombo && hasNavbarCombo) {
    evidence.push({
      type: "strong",
      message: "Found Bootstrap button and navbar combination",
    });
  }

  if (hasModalCombo && hasBootstrapScript) {
    evidence.push({
      type: "strong",
      message: "Found Bootstrap modal with script",
    });
  }

  if (hasDropdownCombo && hasBootstrapScript) {
    evidence.push({
      type: "strong",
      message: "Found Bootstrap dropdown with script",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    return acc + 1;
  }, 0);

  return {
    name: "Bootstrap",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
