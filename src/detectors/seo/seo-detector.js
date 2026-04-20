import { calculateSeoScore } from "../../scoring/calculations";

export function detectSEO() {
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
      message: "Missing title tag. Search engines rely on it as a primary relevance and click signal.",
      fix: "Add a concise, keyword-focused title between about 30 and 60 characters.",
      source,
    });
  } else if (title.length < 30) {
    insights.push({
      level: "warning",
      message: "Title is too short. It likely lacks context and keyword relevance.",
      fix: "Expand the title to describe the page topic more clearly and include important search terms.",
      source,
    });
  } else if (title.length > 60) {
    insights.push({
      level: "warning",
      message: "Title is too long and may be truncated in search results.",
      fix: "Keep the title under about 60 characters while preserving the most important keywords.",
      source,
    });
  } else {
    insights.push({
      level: "good",
      message: "Title length is well optimized for search visibility and readability.",
      fix: null,
      source,
    });
  }

  if (title && h1s.length === 1) {
    const h1Text = h1s[0].innerText.toLowerCase();
    const titleText = title.toLowerCase();

    const words = h1Text.split(" ").slice(0, 3).join(" ");

    if (!titleText.includes(words)) {
      isTitleAligned = false;

      insights.push({
        level: "warning",
        message: "Title and H1 are not well aligned. This weakens topical relevance.",
        fix: "Use similar wording and shared keywords in the title and main heading.",
        source,
      });
    }
  }

  if (!description) {
    insights.push({
      level: "critical",
      message: "Missing meta description. This can reduce click-through rate in search results.",
      fix: "Add a compelling summary between about 70 and 160 characters with relevant keywords.",
      source,
    });
  } else if (description.length < 70) {
    insights.push({
      level: "warning",
      message: "Meta description is too short. It may not provide enough context to attract clicks.",
      fix: "Expand the description to summarize the page more clearly and persuasively.",
      source,
    });
  } else if (description.length > 160) {
    insights.push({
      level: "warning",
      message: "Meta description is too long and may be truncated in search results.",
      fix: "Keep the description under about 160 characters while staying descriptive and relevant.",
      source,
    });
  } else {
    insights.push({
      level: "good",
      message: "Meta description length is well optimized for search visibility and click-through rate.",
      fix: null,
      source,
    });
  }

  if (h1s.length === 0) {
    insights.push({
      level: "critical",
      message: "No H1 found. This weakens page structure and topical clarity.",
      fix: "Add one clear main heading that defines the page topic.",
      source,
    });
  } else if (h1s.length > 1) {
    insights.push({
      level: "warning",
      message: "Multiple H1 tags detected. This can confuse page hierarchy and topical focus.",
      fix: "Use one primary H1 and structure the rest of the content with H2 to H6 headings.",
      source,
    });
  } else {
    insights.push({
      level: "good",
      message: "Single H1 detected. Page structure is clear and SEO-friendly.",
      fix: null,
      source,
    });
  }

  if (imagesWithoutAlt.length > 0) {
    insights.push({
      level: "warning",
      message: `${imagesWithoutAlt.length} images are missing alt text. This reduces accessibility and image SEO value.`,
      fix: "Add descriptive alt text for meaningful images and use empty alt attributes for decorative images.",
      source,
    });
  } else if (images.length > 0) {
    insights.push({
      level: "good",
      message: "All images have alt text. Accessibility and image SEO are well covered.",
      fix: null,
      source,
    });
  }

  if (!canonical) {
    insights.push({
      level: "warning",
      message: "No canonical URL defined. This can lead to duplicate content issues.",
      fix: "Add a canonical link tag to specify the preferred version of the page.",
      source,
    });
  }

  if (!viewport) {
    insights.push({
      level: "critical",
      message: "Missing viewport meta tag. The page will not render correctly on mobile devices.",
      fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to enable responsive layout.',
      source,
    });
  }

  if (ogTags.length === 0) {
    insights.push({
      level: "warning",
      message: "No Open Graph tags detected. Shared links may appear incomplete or unattractive.",
      fix: "Add og:title, og:description, and og:image meta tags to control social previews.",
      source,
    });
  }

  if (twitterTags.length === 0) {
    insights.push({
      level: "warning",
      message: "No Twitter card metadata detected. Content may not display properly when shared on Twitter.",
      fix: "Add twitter:card, twitter:title, twitter:description, and twitter:image meta tags.",
      source,
    });
  }

  if (!lang) {
    insights.push({
      level: "warning",
      message: "Missing HTML lang attribute. Screen readers and search engines cannot reliably determine the page language.",
      fix: 'Add a lang attribute to the <html> tag, e.g. <html lang="en">.',
      source,
    });
  }

  if (robots && robots.includes("noindex")) {
    insights.push({
      level: "critical",
      message: "Page is set to noindex. Search engines will not include it in results.",
      fix: "Remove 'noindex' from the robots meta tag if this page should be indexed.",
      source,
    });
  }

  if (structuredData.length === 0) {
    insights.push({
      level: "warning",
      message: "No structured data detected. The page cannot qualify for rich search results.",
      fix: "Add schema.org structured data (JSON-LD) to describe content like articles, products, or business info.",
      source,
    });
  } else {
    insights.push({
      level: "good",
      message: "Structured data detected. The page is eligible for enhanced search results.",
      fix: null,
      source,
    });
  }

  if (internalLinks.length < 3) {
    insights.push({
      level: "warning",
      message: "Few internal links detected. This weakens site structure and limits crawlability.",
      fix: "Add links to related pages to improve navigation and help search engines discover content.",
      source,
    });
  }

  if (externalLinks.length === 0) {
    insights.push({
      level: "warning",
      message: "No external links detected. This can reduce perceived trust and context.",
      fix: "Link to relevant and authoritative sources where appropriate.",
      source,
    });
  }

  if (!title || !description || h1s.length === 0) {
    insights.push({
      level: "critical",
      message: "Core SEO elements missing (title, description, or H1). Search engines cannot properly understand or rank this page.",
      fix: "Ensure every page has a clear title, a meta description, and a single H1 describing the main topic.",
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
    externalLinksCount: externalLinks.length,
    hasCanonical: !!canonical,
    hasOG: ogTags.length > 0,
    hasTwitter: twitterTags.length > 0,
    hasLang: !!lang,
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
        structuredData: structuredData.length,
      },
      links: {
        internal: internalLinks.length,
        external: externalLinks.length,
      },
    },

    insights,
  };
}
