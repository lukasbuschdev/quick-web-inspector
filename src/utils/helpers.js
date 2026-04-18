export function buildPerformanceInsightGroup(title, items, className) {
  if (!items || !items.length) return "";

  return /*html*/ `
    <div class="insight-group ${className}">
      <strong>${title}</strong>
      <ul>
        ${items.map((msg) => `<li>${msg}</li>`).join("")}
      </ul>
    </div>
  `;
}

export function truncateUrl(str, max = 40) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "..." : str;
}
