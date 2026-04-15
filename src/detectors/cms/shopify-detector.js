export function detectShopify(pageData) {
  const evidence = [];

  const html = pageData.dom.html;

  const hasShopifyCDN = html.includes("cdn.shopify.com");

  if (hasShopifyCDN) {
    evidence.push({
      type: "strong",
      message: "Found Shopify CDN",
    });
  }

  const hasShopifyGlobal = !!window.Shopify;

  if (hasShopifyGlobal) {
    evidence.push({
      type: "strong",
      message: "Found Shopify global",
    });
  }

  const hasShopifyRoutes = html.includes("/products/") || html.includes("/collections/");

  if (hasShopifyRoutes) {
    evidence.push({
      type: "medium",
      message: "Found Shopify URL patterns",
    });
  }

  const score = evidence.reduce((acc, e) => {
    if (e.type === "strong") return acc + 3;
    if (e.type === "medium") return acc + 2;
    return acc + 1;
  }, 0);

  return {
    name: "Shopify",
    detected: score >= 3,
    confidence: Math.min(score / 6, 1),
    evidence,
  };
}
