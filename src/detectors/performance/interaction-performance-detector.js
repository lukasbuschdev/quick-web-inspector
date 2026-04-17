export function detectInteractionPerformance(pageData) {
  const allElements = pageData.dom.elements || [];

  let animatedCount = 0;
  let expensiveAnimationCount = 0;
  let fixedCount = 0;
  let boxShadowCount = 0;
  let filterCount = 0;
  let backdropFilterCount = 0;
  let gpuFriendlyAnimationCount = 0;
  let layoutAnimationCount = 0;
  let gradientCount = 0;

  for (const el of allElements) {
    const style = el.computedStyle;
    if (!style) continue;

    const hasAnimation = style.animationName !== "none" || style.transitionDuration !== "0s";

    if (hasAnimation) {
      animatedCount++;

      const usesExpensiveProps = style.boxShadow !== "none" || style.filter !== "none" || style.backdropFilter !== "none";
      const transitionProps = style.transitionProperty || "";

      if (usesExpensiveProps) {
        expensiveAnimationCount++;
      }

      if (transitionProps.includes("all")) {
        layoutAnimationCount++;
      } else {
        if (transitionProps.includes("width") || transitionProps.includes("height") || transitionProps.includes("top") || transitionProps.includes("left") || transitionProps.includes("margin") || transitionProps.includes("padding")) {
          layoutAnimationCount++;
        }
      }

      if (transitionProps.includes("transform") || transitionProps.includes("opacity")) {
        gpuFriendlyAnimationCount++;
      }
    }

    if (style.backgroundImage && style.backgroundImage.includes("gradient")) {
      gradientCount++;
    }

    if (style.boxShadow !== "none") {
      boxShadowCount++;
    }

    if (style.filter !== "none") {
      filterCount++;
    }

    if (style.backdropFilter !== "none") {
      backdropFilterCount++;
    }

    if (style.position === "fixed") {
      fixedCount++;
    }
  }

  let hasReducedMotionSupport = false;
  let hoverRules = 0;
  let hasHoverMediaQuery = false;

  const stylesheets = pageData.dom.styleSheets || [];

  for (const sheet of stylesheets) {
    try {
      for (const rule of sheet.cssRules || []) {
        if (rule.media && rule.media.mediaText.includes("prefers-reduced-motion")) {
          hasReducedMotionSupport = true;
        }

        if (rule.selectorText && rule.selectorText.includes(":hover")) {
          hoverRules++;
        }

        if (rule.media && (rule.media.mediaText.includes("(hover: none)") || rule.media.mediaText.includes("(pointer: coarse)"))) {
          hasHoverMediaQuery = true;
        }
      }
    } catch (e) {}
  }

  const data = {
    animatedCount,
    expensiveAnimationCount,
    fixedCount,
    hasReducedMotionSupport,
    hoverRules,
    hasHoverMediaQuery,
    boxShadowCount,
    filterCount,
    backdropFilterCount,
    gpuFriendlyAnimationCount,
    layoutAnimationCount,
    gradientCount,
  };

  const { insights } = getInsights(data);
  const score = calculateVisualComplexity(data);

  return {
    name: "Interaction Performance",
    type: "interaction-performance",
    detected: true,
    score,
    insights,
    data,
  };
}

export function getInsights(data) {
  const evidence = [];
  let score = 100;

  const { animatedCount, expensiveAnimationCount, fixedCount, hasReducedMotionSupport, hoverRules, hasHoverMediaQuery, boxShadowCount, filterCount, backdropFilterCount, gpuFriendlyAnimationCount, layoutAnimationCount, gradientCount } = data;
  const totalExpensiveEffects = boxShadowCount + filterCount + backdropFilterCount;

  if (animatedCount > 40) {
    score -= 20;
    evidence.push({
      type: "medium",
      message: `High number of animated elements (${animatedCount}). Consider reducing animations.`,
    });
  } else if (animatedCount > 15) {
    score -= 10;
    evidence.push({
      type: "weak",
      message: `Multiple animations detected (${animatedCount}). Ensure smooth performance.`,
    });
  }

  if (expensiveAnimationCount > 10) {
    score -= 25;
    evidence.push({
      type: "strong",
      message: `Expensive properties are animated. Prefer transform and opacity.`,
    });
  } else if (expensiveAnimationCount > 3) {
    score -= 15;
    evidence.push({
      type: "medium",
      message: `Some animations use costly properties. Optimize if possible.`,
    });
  }

  if (hasReducedMotionSupport) {
    score += 5;
    evidence.push({
      type: "positive",
      message: `Supports reduced-motion preferences (good accessibility practice).`,
    });
  }

  if (hoverRules > 10 && !hasHoverMediaQuery) {
    score -= 15;
    evidence.push({
      type: "medium",
      message: `Hover interactions lack mobile fallback.`,
    });
  }

  if (fixedCount > 8) {
    score -= 10;
    evidence.push({
      type: "weak",
      message: `Many fixed elements may affect scroll performance.`,
    });
  }

  if (totalExpensiveEffects > 50) {
    score -= 10;
    evidence.push({
      type: "medium",
      message: `High number of expensive visual effects (${totalExpensiveEffects}). Consider reducing heavy styles.`,
    });
  }

  if (layoutAnimationCount > 5) {
    score -= 15;
    evidence.push({
      type: "strong",
      message: `Layout-triggering animations detected. Prefer transform and opacity for smoother performance.`,
    });
  }

  if (gpuFriendlyAnimationCount > 0 && layoutAnimationCount === 0) {
    evidence.push({
      type: "good",
      message: `Animations use GPU-friendly properties (transform/opacity).`,
    });
  }

  if (gradientCount > 30) {
    score -= 5;
    evidence.push({
      type: "weak",
      message: `Many gradient backgrounds detected (${gradientCount}). May increase paint cost on large surfaces.`,
    });
  }

  return {
    insights: evidence.map((item) => ({
      level: item.type === "strong" ? "critical" : item.type === "medium" ? "warning" : "good",
      message: item.message,
      source: "Interaction",
    })),
  };
}

function calculateVisualComplexity(data) {
  let score = 100;

  const { boxShadowCount, filterCount, backdropFilterCount, gradientCount, animatedCount, layoutAnimationCount } = data;
  const totalExpensiveEffects = boxShadowCount + filterCount * 2 + backdropFilterCount * 3 + gradientCount * 0.5;

  if (totalExpensiveEffects > 80) score -= 25;
  else if (totalExpensiveEffects > 40) score -= 15;
  else if (totalExpensiveEffects > 20) score -= 8;

  if (animatedCount > 40) score -= 15;
  else if (animatedCount > 20) score -= 8;

  if (layoutAnimationCount > 5) score -= 15;

  return Math.max(0, Math.round(score));
}
