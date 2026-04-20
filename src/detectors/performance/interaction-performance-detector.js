import { calculateInteractionPerformanceScore } from "../../scoring/calculations";

export async function detectInteractionPerformance(pageData) {
  const allElements = pageData.dom.elements || [];

  let animatedCount = 0;
  let passiveAnimationCount = 0;
  let interactionAnimationCount = 0;
  let expensivePassiveAnimationCount = 0;
  let expensiveInteractionAnimationCount = 0;
  let cheapInteractionCount = 0;
  let heavyInteractionCount = 0;
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

    const animationName = style.animationName || "none";
    const transitionDuration = style.transitionDuration || "0s";
    const transitionProperty = (style.transitionProperty || "").toLowerCase();
    const duration = parseFloat(transitionDuration) || 0;
    const hasAnimation = animationName !== "none" || duration > 0;
    const usesTransform = transitionProperty.includes("transform");
    const usesOpacity = transitionProperty.includes("opacity");
    const usesColor = transitionProperty.includes("color") || transitionProperty.includes("background-color") || transitionProperty.includes("border-color");
    const usesExpensiveProps = style.filter !== "none" || style.backdropFilter !== "none";
    const hasExpensiveEffect = usesExpensiveProps;
    const hasModerateEffect = style.boxShadow !== "none";
    const isPassiveAnimation = animationName !== "none" && style.animationPlayState !== "paused" && style.animationIterationCount === "infinite";
    const isInteractionAnimation = duration > 0;
    const area = (el.offsetWidth || 0) * (el.offsetHeight || 0);
    const isLargeElement = area > 50000;
    const affectsLayoutViaAll = transitionProperty.includes("all");
    const layoutProps = ["width", "height", "top", "left", "right", "bottom", "margin", "padding"];
    const hasExplicitLayoutProp = layoutProps.some((prop) => transitionProperty.includes(prop));
    const hasLayoutProp = hasExplicitLayoutProp;
    const isLayoutAnimation = hasExplicitLayoutProp;
    const isSuspiciousAll = affectsLayoutViaAll && area > 20000;
    const isBadTransform = usesTransform && hasExpensiveEffect;
    const isHeavyInteraction = hasLayoutProp || isBadTransform || (hasExpensiveEffect && isInteractionAnimation) || (hasModerateEffect && isLargeElement && duration > 0.4);
    const isCheapInteraction = !isHeavyInteraction && (usesOpacity || usesColor || usesTransform || (hasModerateEffect && !isLargeElement));

    if (hasAnimation) {
      animatedCount++;

      if (isPassiveAnimation) {
        passiveAnimationCount++;

        if (usesExpensiveProps) {
          expensivePassiveAnimationCount++;
        }
      } else if (isInteractionAnimation) {
        interactionAnimationCount++;

        if (isHeavyInteraction) {
          heavyInteractionCount++;

          if (usesExpensiveProps) {
            expensiveInteractionAnimationCount++;
          }
        } else if (isCheapInteraction) {
          cheapInteractionCount++;
        } else {
          cheapInteractionCount++;
        }
      } else {
        interactionAnimationCount++;

        if (usesExpensiveProps) {
          expensiveInteractionAnimationCount++;
        }
      }

      if (isLayoutAnimation || isSuspiciousAll) {
        layoutAnimationCount += area > 20000 ? 1 : 0.5;
      }

      const hasGpuProp = usesTransform || usesOpacity;
      if (hasGpuProp && !hasLayoutProp && !usesExpensiveProps) {
        gpuFriendlyAnimationCount++;
      }
    }

    if (style.backgroundImage && style.backgroundImage.includes("gradient")) gradientCount++;
    if (style.boxShadow !== "none") boxShadowCount++;
    if (style.filter !== "none") filterCount++;
    if (style.backdropFilter !== "none") backdropFilterCount++;
    if (style.position === "fixed") fixedCount++;
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

  const jsAnimationActivity = await detectJsAnimationActivity();

  const data = {
    animatedCount,
    passiveAnimationCount,
    interactionAnimationCount,
    expensivePassiveAnimationCount,
    expensiveInteractionAnimationCount,
    cheapInteractionCount,
    heavyInteractionCount,
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
    jsAnimationActivity,
    domNodes: allElements.length || 1,
  };

  const { insights } = getInsights(data);
  const score = calculateInteractionPerformanceScore(data);

  return {
    name: "Interaction Performance",
    type: "interaction-performance",
    detected: true,
    score,
    insights,
    data,
  };
}

async function detectJsAnimationActivity() {
  let styleChanges = 0;
  let svgMotionChanges = 0;

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "attributes") continue;

      const name = mutation.attributeName || "";

      if (name === "style" || name === "class" || name === "transform") {
        styleChanges++;
      }

      if (name === "cx" || name === "cy" || name === "x" || name === "y" || name === "x1" || name === "y1" || name === "x2" || name === "y2" || name === "d") {
        svgMotionChanges++;
      }
    }
  });

  observer.observe(document.documentElement, {
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class", "transform", "cx", "cy", "x", "y", "x1", "y1", "x2", "y2", "d"],
  });

  await new Promise((resolve) => setTimeout(resolve, 1200));

  observer.disconnect();

  const totalChanges = styleChanges + svgMotionChanges;
  const detected = totalChanges > 0;
  const level = svgMotionChanges > 40 || totalChanges > 80 ? "high" : svgMotionChanges > 5 || totalChanges > 15 ? "medium" : detected ? "low" : "none";

  return {
    detected,
    level,
    styleChanges,
    svgMotionChanges,
    totalChanges,
  };
}

export function getInsights(data) {
  const evidence = [];
  const severity = getInteractionSeverity(data);

  const {
    passiveAnimationCount,
    interactionAnimationCount,
    expensivePassiveAnimationCount,
    expensiveInteractionAnimationCount,
    cheapInteractionCount,
    heavyInteractionCount,
    fixedCount,
    hasReducedMotionSupport,
    hasHoverMediaQuery,
    boxShadowCount,
    filterCount,
    backdropFilterCount,
    gpuFriendlyAnimationCount,
    layoutAnimationCount,
    gradientCount,
    jsAnimationActivity,
  } = data;

  const totalExpensiveEffects = boxShadowCount + filterCount + backdropFilterCount;

  if (severity.passiveAnimationCount !== "good") {
    evidence.push({
      type: severity.passiveAnimationCount === "critical" ? "strong" : "medium",
      message: `Multiple passive animations detected (${passiveAnimationCount}). These run continuously and can impact performance even when the page is idle.`,
    });
  }

  if (severity.heavyInteractionCount !== "good") {
    evidence.push({
      type: severity.heavyInteractionCount === "critical" ? "strong" : "medium",
      message: `${heavyInteractionCount} heavier interaction-triggered animations detected out of ${interactionAnimationCount} total interaction animations. Lightweight hover effects are usually fine, but heavier transitions using layout-changing properties or broad transition rules can feel janky and should be simplified.`,
    });
  } else if (cheapInteractionCount > 0 && heavyInteractionCount === 0) {
    evidence.push({
      type: "good",
      message: `Interaction animations are mostly lightweight (${cheapInteractionCount}). Small hover and focus effects are usually low-cost when they rely on simple visual changes.`,
    });
  }

  if (severity.expensivePassiveAnimationCount !== "good") {
    evidence.push({
      type: severity.expensivePassiveAnimationCount === "critical" ? "strong" : "medium",
      message: `${expensivePassiveAnimationCount} passive animations use paint-heavy effects such as box-shadow, filter, or backdrop-filter. These are especially costly because they run continuously.`,
    });
  }

  if (severity.expensiveInteractionAnimationCount !== "good") {
    evidence.push({
      type: severity.expensiveInteractionAnimationCount === "critical" ? "strong" : "medium",
      message: `${expensiveInteractionAnimationCount} interaction-triggered animations use paint-heavy effects. This is usually less severe than passive motion, but can still feel janky on weaker devices.`,
    });
  }

  if (hasReducedMotionSupport) {
    evidence.push({
      type: "positive",
      message: `Supports prefers-reduced-motion.`,
    });
  }

  if (severity.hoverRules !== "good" && !hasHoverMediaQuery) {
    evidence.push({
      type: "medium",
      message: `Hover interactions detected without mobile fallback. On touch devices, hover states may not behave as expected, so consider adding alternatives using media queries like (hover: none) or (pointer: coarse).`,
    });
  }

  if (severity.fixedCount !== "good") {
    evidence.push({
      type: "weak",
      message: `Many fixed-position elements (${fixedCount}). These can increase repaint costs during scrolling and may negatively affect performance, especially when combined with visual effects like shadows or filters.`,
    });
  }

  if (totalExpensiveEffects > 50) {
    evidence.push({
      type: "medium",
      message: `High number of heavy visual effects (${totalExpensiveEffects}). Effects like box-shadow, filter, and backdrop-filter are expensive to render, so reducing or simplifying them can improve overall performance.`,
    });
  }

  if (severity.layoutAnimationCount !== "good") {
    evidence.push({
      type: severity.layoutAnimationCount === "critical" ? "strong" : "medium",
      message: `Animations are modifying layout properties (e.g. width, height, margin). This triggers layout recalculation and causes jank.`,
    });
  }

  if (gpuFriendlyAnimationCount > 0 && layoutAnimationCount === 0) {
    evidence.push({
      type: "good",
      message: `Animations use GPU-friendly properties (transform, opacity).`,
    });
  }

  if (severity.gradientCount !== "good") {
    evidence.push({
      type: "weak",
      message: `Many gradient backgrounds detected (${gradientCount}). While gradients are visually appealing, complex or frequently repainted gradients can increase rendering cost and should be used selectively.`,
    });
  }

  if (jsAnimationActivity?.detected) {
    evidence.push({
      type: jsAnimationActivity.level === "high" ? "medium" : "weak",
      message: `JavaScript-driven animation activity detected. This likely includes runtime updates outside normal CSS animations, such as SVG or DOM attribute changes. Smoothness depends on how often these updates run and how efficiently they are rendered.`,
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

function getInteractionSeverity(data) {
  const {
    passiveAnimationCount = 0,
    interactionAnimationCount = 0,
    expensivePassiveAnimationCount = 0,
    expensiveInteractionAnimationCount = 0,
    cheapInteractionCount = 0,
    heavyInteractionCount = 0,
    fixedCount = 0,
    hoverRules = 0,
    boxShadowCount = 0,
    filterCount = 0,
    backdropFilterCount = 0,
    gradientCount = 0,
    layoutAnimationCount = 0,
  } = data;

  return {
    passiveAnimationCount: passiveAnimationCount >= 6 ? "critical" : passiveAnimationCount >= 3 ? "warning" : "good",
    interactionAnimationCount: interactionAnimationCount >= 40 ? "warning" : "good",
    heavyInteractionCount: heavyInteractionCount >= 20 ? "critical" : heavyInteractionCount >= 10 ? "warning" : "good",
    cheapInteractionCount: heavyInteractionCount === 0 && cheapInteractionCount >= 10 ? "good" : "neutral",
    expensivePassiveAnimationCount: expensivePassiveAnimationCount >= 3 ? "critical" : expensivePassiveAnimationCount >= 1 ? "warning" : "good",
    expensiveInteractionAnimationCount: expensiveInteractionAnimationCount >= 10 ? "critical" : expensiveInteractionAnimationCount >= 4 ? "warning" : "good",
    fixedCount: fixedCount >= 10 ? "critical" : fixedCount >= 5 ? "warning" : "good",
    hoverRules: hoverRules >= 25 ? "critical" : hoverRules >= 10 ? "warning" : "good",
    boxShadowCount: boxShadowCount >= 40 ? "critical" : boxShadowCount >= 15 ? "warning" : "good",
    filterCount: filterCount >= 10 ? "critical" : filterCount >= 3 ? "warning" : "good",
    backdropFilterCount: backdropFilterCount >= 5 ? "critical" : backdropFilterCount >= 1 ? "warning" : "good",
    gradientCount: gradientCount >= 50 ? "critical" : gradientCount >= 20 ? "warning" : "good",
    layoutAnimationCount: layoutAnimationCount >= 10 ? "critical" : layoutAnimationCount >= 2 ? "warning" : "good",
  };
}
