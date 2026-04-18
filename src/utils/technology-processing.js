export function processTechnologyData(primary, secondary) {
  const detectedTypes = [];

  if (primary) detectedTypes.push(primary.type);

  if (secondary?.length) {
    secondary.forEach((r) => detectedTypes.push(r.type));
  }

  return {
    categoryInsights: buildCategoryInsights({
      hasFramework: detectedTypes.includes("framework"),
      hasCMS: detectedTypes.includes("cms"),
      hasLibrary: detectedTypes.includes("library"),
    }),
  };
}

export function buildCategoryInsights({ hasFramework, hasCMS, hasLibrary }) {
  const insights = [];

  if (!hasFramework && !hasCMS) {
    insights.push("No framework or CMS detected");
  } else {
    if (!hasFramework) insights.push("No frontend framework detected");
    if (!hasCMS) insights.push("No CMS detected");
  }

  if (!hasLibrary && !hasFramework && !hasCMS) {
    insights.push("No major frontend libraries detected");
  }

  return insights;
}
