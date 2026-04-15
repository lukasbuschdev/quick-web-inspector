export function detectTailwind(pageData) {
  const evidence = [];

  const classes = pageData.dom.classList;

  const variantMatches = classes.filter((c) => /^(sm:|md:|lg:|xl:|2xl:|hover:|focus:|active:|dark:|group-hover:|peer-focus:)/.test(c));

  const utilityMatches = classes.filter((c) => /^(bg|text|border|p|px|py|m|mx|my|w|h|min-w|min-h|max-w|max-h|rounded|shadow|z)-/.test(c));

  const arbitraryMatches = classes.filter((c) => /^(w|h|bg|text|p|m)-\[[^\]]+\]/.test(c));

  const hasTailwindCDN = pageData.scripts.srcList.some((src) => src.includes("cdn.tailwindcss.com"));

  const strongCombination = variantMatches.length >= 2 && utilityMatches.length >= 4;

  const strongArbitrary = arbitraryMatches.length >= 2;

  if (strongCombination) {
    evidence.push({
      type: "strong",
      message: "Found multiple Tailwind variants with utilities",
    });
  }

  if (strongArbitrary && utilityMatches.length >= 2) {
    evidence.push({
      type: "strong",
      message: "Found Tailwind arbitrary values with utilities",
    });
  }

  if (hasTailwindCDN) {
    evidence.push({
      type: "strong",
      message: "Found Tailwind CDN",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    return acc + 1;
  }, 0);

  return {
    name: "Tailwind CSS",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
