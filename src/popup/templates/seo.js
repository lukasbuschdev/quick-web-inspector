import { truncateUrl } from "../popup";

export function renderSEO(seo) {
  const { title, description, canonical, lang, headings, images, meta } = seo.data;

  const groupedInsights = {
    critical: [],
    warning: [],
    good: [],
  };

  (seo.insights || []).forEach((item) => {
    if (groupedInsights[item.level]) {
      groupedInsights[item.level].push(item.message);
    }
  });

  const insightsItems = `
      ${buildSeoInsightGroup("Critical Issues", groupedInsights.critical, "critical")}
      ${buildSeoInsightGroup("Warnings", groupedInsights.warning, "warning")}
      ${buildSeoInsightGroup("Good Signals", groupedInsights.good, "good")}
    `;

  const titleField = title ? `<span><strong>Title:</strong> ${truncateUrl(title, 50)}</span>` : `<span class="muted">Title: missing</span>`;
  const descriptionField = description ? `<span><strong>Description:</strong> ${truncateUrl(description, 70)}</span>` : `<span class="muted">Description: missing</span>`;
  const h1Field = `<span><strong>H1:</strong> ${headings?.h1 ?? 0}</span>`;
  const h2Field = `<span><strong>H2:</strong> ${headings?.h2 ?? 0}</span>`;
  const imgField = `<span><strong>Images:</strong> ${images?.total ?? 0} (${images?.missingAlt ?? 0} missing alt)</span>`;
  const langField = lang ? `<span><strong>Lang:</strong> ${lang}</span>` : `<span class="muted">Lang: missing</span>`;
  const canonicalField = canonical ? `<span><strong>Canonical:</strong> set</span>` : `<span class="muted">Canonical: missing</span>`;
  const viewportField = meta?.viewport ? `<span><strong>Viewport:</strong> set</span>` : `<span class="muted">Viewport: missing</span>`;
  const ogField = `<span><strong>Open Graph:</strong> ${meta?.openGraph ?? 0}</span>`;
  const twitterField = `<span><strong>Twitter:</strong> ${meta?.twitter ?? 0}</span>`;

  return /*html*/ `
      <div class="result-section"><strong>SEO</strong></div>
      <div class="result-card column gap-30">
        <div class="column gap-10">
          <span class="white"><strong>Structure</strong></span>
          ${titleField}
          ${descriptionField}
          ${langField}
          ${canonicalField}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Headings & Content</strong></span>
          ${h1Field}
          ${h2Field}
          ${imgField}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Meta & Social</strong></span>
          ${viewportField}
          ${ogField}
          ${twitterField}
        </div>

        ${
          insightsItems
            ? /*html*/ `
            <div class="insights column gap-10">
              <span class="white"><strong>Analysis</strong></span>
              <ul>${insightsItems}</ul>
            </div>
          `
            : ""
        }
      </div>
    `;
}

function buildSeoInsightGroup(title, items, className) {
  if (!items.length) return "";

  return /*html*/ `
    <div class="insight-group ${className}">
      <strong>${title}</strong>
      <ul>
        ${items.map((msg) => `<li>${msg}</li>`).join("")}
      </ul>
    </div>
  `;
}
