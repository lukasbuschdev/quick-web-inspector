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
      message: "Missing <code>&lt;main&gt;</code> landmark. Screen readers cannot easily identify the main content area.",
      fix: "Wrap your primary content inside a <code>&lt;main&gt;</code> element to improve navigation.",
    });
  }

  if (!hasNav && elements.length > 50) {
    insights.push({
      level: "info",
      category: "Structure",
      message: "No <code>&lt;nav&gt;</code> landmark detected. Navigation structure may be unclear for assistive technologies.",
      fix: "Wrap primary navigation in a <code>&lt;nav&gt;</code> element to improve structure and accessibility.",
    });
  }

  if (buttonsMissingType > 0) {
    insights.push({
      level: "warning",
      category: "Forms",
      message: `${buttonsMissingType} buttons missing type attribute. This can cause unintended form submissions.`,
      fix: 'Add type="button" or type="submit" explicitly to each button.',
    });
  }

  if (unlabeledButtons > 0) {
    insights.push({
      level: "critical",
      category: "Forms",
      message: `${unlabeledButtons} buttons have no accessible name. Users cannot understand their purpose.`,
      fix: "Add visible text or use aria-label to clearly describe each button action.",
    });
  }

  if (fakeButtons > 0) {
    insights.push({
      level: "warning",
      category: "Interaction",
      message: `${fakeButtons} elements behave like buttons but are not semantic buttons.`,
      fix: "Replace non-semantic elements (like divs) with <code>&lt;button&gt;</code> for proper accessibility and keyboard support.",
    });
  }

  if (inaccessibleInteractive > 0) {
    insights.push({
      level: "critical",
      category: "Interaction",
      message: `${inaccessibleInteractive} interactive elements are not keyboard accessible.`,
      fix: 'Ensure elements are focusable (tabindex="0") and support Enter and Space interaction.',
    });
  }

  if (clickableDivs > 5) {
    insights.push({
      level: "warning",
      category: "Interaction",
      message: "Many interactive elements are implemented as <code>&lt;div&gt;</code> instead of semantic elements.",
      fix: "Use <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> instead of <code>&lt;div&gt;</code> for interactive elements.",
    });
  }

  if (inputsWithoutLabel > 0) {
    insights.push({
      level: "critical",
      category: "Forms",
      message: `${inputsWithoutLabel} inputs have no label. Users cannot understand what to enter.`,
      fix: "Associate each input with a <code>&lt;label&gt;</code> or use aria-label to describe its purpose.",
    });
  }

  if (anchorWithoutHref > 0) {
    insights.push({
      level: "warning",
      category: "Interaction",
      message: `${anchorWithoutHref} anchor elements are used as buttons without href.`,
      fix: "Use <code>&lt;button&gt;</code> for actions or provide a valid href for navigation links.",
    });
  }

  if (elementsWithoutFocusStyle > 0) {
    insights.push({
      level: "warning",
      category: "Accessibility",
      message: `${elementsWithoutFocusStyle} interactive elements may lack visible focus styles.`,
      fix: "Ensure focus states are clearly visible using outline, border, or similar styles.",
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
      message: "Navigation landmark detected. Navigation structure is clearly defined.",
      fix: null,
    });
  }

  if (totalButtons > 0 && unlabeledButtons === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Forms",
      message: "All buttons have accessible names.",
      fix: null,
    });
  }

  if (totalInputs > 0 && inputsWithoutLabel === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Forms",
      message: "All input fields are properly labeled.",
      fix: null,
    });
  }

  if (fakeButtons === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Interaction",
      message: "No fake button patterns detected.",
      fix: null,
    });
  }

  if (inaccessibleInteractive === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Interaction",
      message: "Interactive elements support keyboard navigation.",
      fix: null,
    });
  }

  if (anchorWithoutHref === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Interaction",
      message: "No anchors misused as buttons detected.",
      fix: null,
    });
  }

  if (totalButtons > 0 && buttonsMissingType === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Forms",
      message: "All buttons define a type attribute.",
      fix: null,
    });
  }

  if (elementsWithoutFocusStyle === 0 && showGoodSignals) {
    insights.push({
      level: "good",
      category: "Accessibility",
      message: "Focus styles are present on interactive elements.",
      fix: null,
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
