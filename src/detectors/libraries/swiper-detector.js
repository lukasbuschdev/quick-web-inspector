export function detectSwiper(pageData) {
  const evidence = [];

  const classes = pageData.dom.classList;

  const hasCoreStructure = classes.includes("swiper") && classes.includes("swiper-wrapper") && classes.includes("swiper-slide");

  const hasSwiperRuntime = pageData.scripts.content?.some((content) => content.includes("new Swiper("));

  const hasSwiperScript = pageData.scripts.srcList.some((src) => /swiper(\.bundle)?(\.min)?\.js/i.test(src));

  if (hasCoreStructure && hasSwiperRuntime) {
    evidence.push({
      type: "strong",
      message: "Found Swiper structure with initialization",
    });
  }

  if (hasCoreStructure && hasSwiperScript) {
    evidence.push({
      type: "strong",
      message: "Found Swiper structure with script",
    });
  }

  if (hasSwiperRuntime && hasSwiperScript) {
    evidence.push({
      type: "medium",
      message: "Found Swiper runtime with script",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Swiper",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
