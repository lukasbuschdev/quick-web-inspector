import { calculateAccessibilityScore } from "../../scoring/calculations";

export function detectAccessibility(pageData) {
  const elements = pageData.dom.elements || [];
  const html = pageData.dom.html || "";

  const hasMain = html.includes("<main");
  const hasNav = html.includes("<nav");

  const insights = [];

  const { totalButtons, totalInputs, unlabeledButtons, clickableDivs, inputsWithoutLabel, fakeButtons, inaccessibleInteractive, anchorWithoutHref, buttonsMissingType, elementsWithoutFocusStyle } = analyzeElements(elements);
  const issueCount = [unlabeledButtons, inputsWithoutLabel, fakeButtons, inaccessibleInteractive, clickableDivs > 5 ? 1 : 0, anchorWithoutHref, buttonsMissingType, elementsWithoutFocusStyle].reduce((sum, val) => sum + (val > 0 ? 1 : 0), 0);

  const showGoodSignals = issueCount >= 2;

  if (!hasMain) {
    insights.push({
      level: "warning",
      category: "Structure",
      message: "Missing &lt;main&gt; landmark. Wrap your primary page content inside a &lt;main&gt; element to improve screen reader navigation.",
    });
  }

  if (!hasNav && elements.length > 50) {
    insights.push({
      level: "info",
      category: "Structure",
      message: "No &lt;nav&gt; landmark detected. Use a &lt;nav&gt; element for primary navigation to help users and assistive technologies understand your page structure.",
    });
  }

  if (buttonsMissingType > 0) {
    insights.push({
      level: "warning",
      category: "Forms",
      message: `${buttonsMissingType} buttons missing type attribute. Add type=\"button\" or type=\"submit\" to avoid unintended form submissions.`,
    });
  }

  if (unlabeledButtons > 0) {
    insights.push({
      level: "critical",
      category: "Forms",
      message: `${unlabeledButtons} buttons without accessible name. Add visible text or use aria-label to describe the button’s action (e.g. aria-label=\"Open menu\").`,
    });
  }

  if (fakeButtons > 0) {
    insights.push({
      level: "warning",
      category: "Interaction",
      message: `${fakeButtons} elements behave like buttons but are not semantic &lt;button&gt;. Use &lt;button&gt; instead of &lt;div&gt; for interactive actions to improve accessibility and keyboard support.`,
    });
  }

  if (inaccessibleInteractive > 0) {
    insights.push({
      level: "critical",
      category: "Interaction",
      message: `${inaccessibleInteractive} interactive elements lack keyboard accessibility. Add tabindex=\"0\" and ensure they can be activated using Enter or Space.`,
    });
  }

  if (clickableDivs > 5) {
    insights.push({
      level: "warning",
      category: "Interaction",
      message: "Interactive elements implemented as &lt;div&gt;. Replace them with semantic elements like &lt;button&gt; or &lt;a&gt; to improve accessibility and maintainability.",
    });
  }

  if (inputsWithoutLabel > 0) {
    insights.push({
      level: "critical",
      category: "Forms",
      message: `${inputsWithoutLabel} inputs without label. Use &lt;label for=\"id\"&gt; or aria-label to clearly describe each input field.`,
    });
  }

  if (anchorWithoutHref > 0) {
    insights.push({
      level: "warning",
      category: "Interaction",
      message: `${anchorWithoutHref} anchor elements used as buttons (missing href). Use &lt;button&gt; for actions or provide a valid href for navigation.`,
    });
  }

  if (elementsWithoutFocusStyle > 0) {
    insights.push({
      level: "warning",
      category: "Accessibility",
      message: `${elementsWithoutFocusStyle} interactive elements may lack visible focus styles. Ensure focus states are clearly visible (e.g. outline or border) so keyboard users can navigate effectively.`,
    });
  }

  if (hasMain && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Structure",
      message: "Main landmark detected. This improves page structure and screen reader navigation.",
    });
  }

  if (hasNav && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Structure",
      message: "Navigation landmark detected. This helps users and assistive technologies understand site navigation.",
    });
  }

  if (totalButtons > 0 && unlabeledButtons === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Forms",
      message: "All buttons have accessible names. This improves usability and accessibility.",
    });
  }

  if (totalInputs > 0 && inputsWithoutLabel === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Forms",
      message: "All input fields are properly labeled. This improves form accessibility.",
    });
  }

  if (fakeButtons === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Interaction",
      message: "No fake button patterns detected. Semantic elements are used correctly.",
    });
  }

  if (inaccessibleInteractive === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Interaction",
      message: "Interactive elements support keyboard navigation.",
    });
  }

  if (anchorWithoutHref === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Interaction",
      message: "No anchors misused as buttons detected.",
    });
  }

  if (totalButtons > 0 && buttonsMissingType === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Forms",
      message: "All buttons define a type attribute, preventing unintended form behavior.",
    });
  }

  if (elementsWithoutFocusStyle === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Accessibility",
      message: "Focus styles appear to be present on interactive elements.",
    });
  }

  const metrics = {
    totalElements: elements.length,
    totalButtons,
    totalInputs,
    hasMain,
    hasNav,
    unlabeledButtons,
    clickableDivs,
    inputsWithoutLabel,
    fakeButtons,
    inaccessibleInteractive,
    anchorWithoutHref,
    buttonsMissingType,
    elementsWithoutFocusStyle,
  };

  const score = calculateAccessibilityScore(metrics);

  return {
    name: "Accessibility",
    type: "accessibility",
    score,
    detected: true,
    insights,
    showGoodSignals,
  };
}

function analyzeElements(elements) {
  let unlabeledButtons = 0;
  let clickableDivs = 0;
  let inputsWithoutLabel = 0;
  let totalButtons = 0;
  let totalInputs = 0;
  let fakeButtons = 0;
  let inaccessibleInteractive = 0;
  let anchorWithoutHref = 0;
  let buttonsMissingType = 0;
  let elementsWithoutFocusStyle = 0;

  elements.forEach((el) => {
    const tag = el.tagName;

    if (tag === "BUTTON") {
      totalButtons++;

      const hasAria = el.attributes.includes("aria-label");
      const hasText = el.textContent && el.textContent.trim().length > 0;
      if (!hasAria && !hasText) unlabeledButtons++;
      if (!el.attributes.includes("type")) buttonsMissingType++;
    }

    if (tag === "INPUT") {
      totalInputs++;

      const hasId = el.attributes.includes("id");
      const hasAria = el.attributes.includes("aria-label");
      if (!hasId && !hasAria) inputsWithoutLabel++;
    }

    if (tag === "A") {
      const hasHref = el.attributes.includes("href");
      const hasOnClick = el.attributes.includes("onclick");
      if (!hasHref && hasOnClick) anchorWithoutHref++;
    }

    if (tag === "DIV") {
      const hasOnClick = el.attributes.includes("onclick");
      const hasTabIndex = el.attributes.includes("tabindex");
      const hasAriaRole = el.attributes.includes("role");
      const hasPointerCursor = el.computedStyle?.cursor === "pointer" || el.computedStyle?.cursor === "hand";
      const isLikelyInteractive = hasOnClick || (hasTabIndex && hasPointerCursor) || (hasAriaRole && hasPointerCursor);

      if (isLikelyInteractive) {
        clickableDivs++;

        if (hasOnClick || hasPointerCursor) fakeButtons++;
        if (!hasTabIndex) inaccessibleInteractive++;
      }
    }

    const isInteractive = tag === "BUTTON" || tag === "A" || el.attributes.includes("tabindex");

    if (isInteractive) {
      const outline = el.computedStyle?.outline;
      const outlineStyle = el.computedStyle?.outlineStyle;
      const hasVisibleFocus = outline !== "none" && outlineStyle !== "none";
      if (!hasVisibleFocus) elementsWithoutFocusStyle++;
    }
  });

  return {
    totalButtons,
    totalInputs,
    unlabeledButtons,
    clickableDivs,
    inputsWithoutLabel,
    fakeButtons,
    inaccessibleInteractive,
    anchorWithoutHref,
    buttonsMissingType,
    elementsWithoutFocusStyle,
  };
}
