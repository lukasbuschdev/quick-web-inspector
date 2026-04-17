export function detectSEO() {
  const evidence = [];
  const insights = [];

  const doc = document;
  const title = doc.querySelector("title")?.innerText || null;
  const description = doc.querySelector('meta[name="description"]')?.content || null;
  const canonical = doc.querySelector('link[rel="canonical"]')?.href || null;
  const lang = doc.documentElement.lang || null;
  const h1s = doc.querySelectorAll("h1");
  const h2s = doc.querySelectorAll("h2");
  const images = Array.from(doc.querySelectorAll("img"));
  const imagesWithoutAlt = images.filter((img) => !img.alt || img.alt.trim() === "");
  const viewport = doc.querySelector('meta[name="viewport"]');
  const robots = doc.querySelector('meta[name="robots"]')?.content || null;
  const ogTags = doc.querySelectorAll('meta[property^="og:"]');
  const twitterTags = doc.querySelectorAll('meta[name^="twitter:"]');
  const structuredData = doc.querySelectorAll('script[type="application/ld+json"]');
  const internalLinks = Array.from(doc.querySelectorAll("a")).filter((a) => a.href && a.href.startsWith(location.origin));
  const externalLinks = Array.from(doc.querySelectorAll("a")).filter((a) => a.href && !a.href.startsWith(location.origin));

  const source = "SEO";
  let isTitleAligned = true;

  if (!title) {
    insights.push({
      level: "critical",
      message: "Missing title tag. Add a concise title between 30-60 characters describing the page content",
      source,
    });
  } else if (title.length < 30) {
    insights.push({
      level: "warning",
      message: "Title is quite short. Expand it to better describe the page and include relevant keywords",
      source,
    });
  } else if (title.length > 60) {
    insights.push({
      level: "warning",
      message: "Title may be too long. Keep it within 60 characters to avoid truncation in search results",
      source,
    });
  } else {
    insights.push({ level: "good", message: "Title length looks good", source });
  }

  if (title && h1s.length === 1) {
    const h1Text = h1s[0].innerText.toLowerCase();
    const titleText = title.toLowerCase();

    const words = h1Text.split(" ").slice(0, 3).join(" ");

    if (!titleText.includes(words)) {
      isTitleAligned = false;

      insights.push({
        level: "warning",
        message: "Title and H1 are not aligned. Consider using similar keywords for better SEO relevance",
        source,
      });
    }
  }

  if (!description) {
    insights.push({
      level: "critical",
      message: "Missing meta description. Add a 70-160 character summary to improve search visibility",
      source,
    });
  } else if (description.length < 70) {
    insights.push({
      level: "warning",
      message: "Meta description is quite short. Expand it to better summarize the page content",
      source,
    });
  } else if (description.length > 160) {
    insights.push({
      level: "warning",
      message: "Meta description may be too long. Keep it under 160 characters to prevent truncation",
      source,
    });
  } else {
    insights.push({ level: "good", message: "Meta description length looks good", source });
  }

  if (h1s.length === 0) {
    insights.push({
      level: "critical",
      message: "No H1 tag found. Add a main heading that clearly defines the page topic",
      source,
    });
  } else if (h1s.length > 1) {
    insights.push({
      level: "warning",
      message: "Multiple H1 tags detected. Use a single primary heading for better structure",
      source,
    });
  } else {
    insights.push({ level: "good", message: "Single H1 tag found", source });
  }

  if (imagesWithoutAlt.length > 0) {
    insights.push({
      level: "warning",
      message: `${imagesWithoutAlt.length} images missing alt text. Add descriptive alt attributes for accessibility and SEO`,
      source,
    });
  } else if (images.length > 0) {
    insights.push({ level: "good", message: "All images contain alt text", source });
  }

  if (!canonical) {
    insights.push({
      level: "warning",
      message: "Missing canonical tag. Define a canonical URL to prevent duplicate content issues",
      source,
    });
  }

  if (!viewport) {
    insights.push({
      level: "critical",
      message: "Missing viewport meta tag. Add it to ensure proper mobile rendering",
      source,
    });
  }

  if (ogTags.length === 0) {
    insights.push({
      level: "warning",
      message: "No Open Graph tags detected. Add og:title, og:description, and og:image for better social sharing",
      source,
    });
  }

  if (twitterTags.length === 0) {
    insights.push({
      level: "warning",
      message: "No Twitter card tags detected. Add twitter metadata for improved sharing on Twitter",
      source,
    });
  }

  if (!lang) {
    insights.push({
      level: "warning",
      message: "Missing HTML lang attribute. Define the page language for accessibility and SEO",
      source,
    });
  }

  if (robots && robots.includes("noindex")) {
    insights.push({
      level: "critical",
      message: "Page is set to noindex. Remove it to allow search engines to index this page",
      source,
    });
  }

  if (structuredData.length === 0) {
    insights.push({
      level: "warning",
      message: "No structured data detected. Add schema.org markup to improve rich search results",
      source,
    });
  } else {
    insights.push({
      level: "good",
      message: "Structured data detected",
      source,
    });
  }

  if (internalLinks.length < 3) {
    insights.push({
      level: "warning",
      message: "Few internal links detected. Add internal links to improve site structure and SEO",
      source,
    });
  }

  if (externalLinks.length === 0) {
    insights.push({
      level: "warning",
      message: "No external links detected. Consider linking to relevant external sources",
      source,
    });
  }

  const score = calculateSeoScore({
    title,
    description,
    h1Count: h1s.length,
    missingAlt: imagesWithoutAlt.length,
    hasViewport: !!viewport,
    robots,
    structuredDataCount: structuredData.length,
    internalLinksCount: internalLinks.length,
    hasCanonical: !!canonical,
    isTitleAligned,
  });

  return {
    name: "SEO",
    type: "seo",
    detected: true,
    score: score,

    data: {
      title,
      description,
      canonical,
      lang,
      headings: {
        h1: h1s.length,
        h2: h2s.length,
      },
      images: {
        total: images.length,
        missingAlt: imagesWithoutAlt.length,
      },
      meta: {
        viewport: !!viewport,
        robots,
        openGraph: ogTags.length,
        twitter: twitterTags.length,
      },
    },

    insights,
    evidence,
  };
}

function calculateSeoScore({ title, description, h1Count, missingAlt, hasViewport, robots, structuredDataCount, internalLinksCount, hasCanonical, isTitleAligned }) {
  let score = 100;

  if (!title) score -= 25;
  if (!isTitleAligned) score -= 5;
  if (!description) score -= 20;
  if (!hasViewport) score -= 10;

  if (h1Count === 0) {
    score -= 20;
  } else if (h1Count > 1) {
    score -= 10;
  }

  if (missingAlt > 0) score -= Math.min(15, missingAlt * 2);
  if (robots?.includes("noindex")) score -= 30;
  if (!hasCanonical) score -= 5;
  if (structuredDataCount === 0) score -= 5;
  if (internalLinksCount < 3) score -= 5;

  return Math.max(0, score);
}
