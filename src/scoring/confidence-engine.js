export function evaluateDetection(evidence = [], type = "other") {
  let score = 0;
  let hasDecisive = false;

  const weights = {
    strong: 40,
    medium: 20,
    weak: 10,
  };

  for (const item of evidence) {
    score += weights[item.type] || 0;

    if (item.decisive) {
      hasDecisive = true;
    }
  }

  if (hasDecisive) {
    return {
      detected: true,
      confidence: 100,
    };
  }

  const threshold = type === "library" ? 20 : type === "framework" || type === "cms" ? 30 : 30;

  return {
    detected: score >= threshold,
    confidence: Math.min(score, 100),
  };
}
