import{n as e,t}from"./assets/technology-fallback-DXkiQYEU.js";function n(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),n=e.edge?`<span><strong>Edge:</strong> ${e.edge}</span>`:``,r=e.assets&&e.assets.length>0?`<span><strong>Assets:</strong> ${e.assets.join(`, `)}</span>`:``,i=e.source===`headers`?`<span><strong>Detected via:</strong> server headers</span>`:`<span><strong>Detected via:</strong> resource analysis</span>`,a=e.platform?`<span><strong>Platform:</strong> ${e.platform}</span>`:``;return`
      <div class="result-section"><strong>Delivery & Hosting</strong></div>
      <div class="result-card column gap-20">
        <div class="result-header">
          <strong>${e.edge||e.platform||(e.assets.length>0?`Asset CDN detected`:`No CDN detected`)}</strong>
          <strong>${e.confidence}%</strong>
        </div>

        <div class="column gap-20">
          ${i}
          ${n}
          ${a}
          ${r}
        </div>

        ${t?`<ul>${t}</ul>`:`<span class="muted">No clear CDN evidence found</span>`}
      </div>
    `}function r(e,t,n){return!t||!t.length?``:`
    <div class="insight-group ${n}">
      <strong>${e}</strong>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `}function i(e,t=40){return e?e.length>t?e.slice(0,t)+`...`:e:``}var a={animatedCount:{warning:15,critical:40},expensiveAnimationCount:{warning:3,critical:10},fixedCount:{warning:5,critical:10},hoverRules:{warning:10,critical:25},boxShadowCount:{warning:15,critical:40},filterCount:{warning:3,critical:10},backdropFilterCount:{warning:1,critical:5},gradientCount:{warning:20,critical:50},layoutAnimationCount:{warning:2,critical:5}};function o(e){let t=`
      <div class="column gap-10">
        <span class="white"><strong>Motion Overview</strong></span>
      
        <span>
          <strong>Animated elements:</strong>
          <span class="metric ${s(e.data.animatedCount,a.animatedCount)}">
            ${e.data.animatedCount}
          </span>
        </span>
      
        <span>
          <strong>Expensive animations:</strong>
          <span class="metric ${s(e.data.expensiveAnimationCount,a.expensiveAnimationCount)}">
            ${e.data.expensiveAnimationCount}
          </span>
        </span>
      
        <span>
          <strong>Fixed elements:</strong>
          <span class="metric ${s(e.data.fixedCount,a.fixedCount)}">
            ${e.data.fixedCount}
          </span>
        </span>
      
        <span>
          <strong>Hover rules:</strong>
          <span class="metric ${s(e.data.hoverRules,a.hoverRules)}">
            ${e.data.hoverRules}
          </span>
        </span>
      
        <span>
          <strong>Reduced motion:</strong>
          <span class="metric ${e.data.hasReducedMotionSupport?`good`:`critical`}">
            ${e.data.hasReducedMotionSupport?`supported`:`not supported`}
          </span>
        </span>
      
        <span>
          <strong>Box shadows:</strong>
          <span class="metric ${s(e.data.boxShadowCount,a.boxShadowCount)}">
            ${e.data.boxShadowCount}
          </span>
        </span>
      
        <span>
          <strong>Filters:</strong>
          <span class="metric ${s(e.data.filterCount,a.filterCount)}">
            ${e.data.filterCount}
          </span>
        </span>
      
        <span>
          <strong>Backdrop filters:</strong>
          <span class="metric ${s(e.data.backdropFilterCount,a.backdropFilterCount)}">
            ${e.data.backdropFilterCount}
          </span>
        </span>
      
        <span>
          <strong>Gradients:</strong>
          <span class="metric ${s(e.data.gradientCount,a.gradientCount)}">
            ${e.data.gradientCount}
          </span>
        </span>
      
        <span>
          <strong>GPU-friendly animations:</strong>
          <span class="metric good">
            ${e.data.gpuFriendlyAnimationCount}
          </span>
        </span>
      
        <span>
          <strong>Layout-triggering animations:</strong>
          <span class="metric ${s(e.data.layoutAnimationCount,a.layoutAnimationCount)}">
            ${e.data.layoutAnimationCount}
          </span>
        </span>
      </div>
    `,n={critical:[],warning:[],good:[]};(e.insights||[]).forEach(e=>{n[e.level]&&n[e.level].push(e.message)});let i=`
      ${r(`Critical Issues`,n.critical,`critical`)}
      ${r(`Warnings`,n.warning,`warning`)}
      ${r(`Good Signals`,n.good,`good`)}
    `;return`<div class="result-section"><strong>Interaction Performance</strong></div>
      <div class="result-card column gap-30">
        ${t}

        ${i?`
              <div class="insights column gap-10">
                <strong>Analysis</strong>
                <ul>${i}</ul>
              </div>
            `:`
              <span class="muted">
                No major interaction or animation issues detected
              </span>
            `}
      </div>
    `}function s(e,t){return e==null?``:e>=t.critical?`critical`:e>=t.warning?`warning`:`good`}function c(e){let{coreWebVitals:t,bundleAnalysis:n,renderBlocking:a}=e.data,o=t?.lcp?`<span><strong>LCP:</strong> ${t.lcp.value} (${t.lcp.rating})</span>`:`<span class="muted"><strong>LCP:</strong> analyzing...</span>`,s=t?.cls?`<span><strong>CLS:</strong> ${t.cls.value} (${t.cls.rating})</span>`:`<span class="muted"><strong>CLS:</strong> analyzing...</span>`,c=n?.totalJSSize?`<span><strong>Total JS size:</strong> ${n.totalJSSize.value}</span>`:`<span class="muted">Total JS size: not available</span>`,u=n?.jsFileCount===void 0?`<span class="muted">JS files: not available</span>`:`<span><strong>JS files:</strong> ${n.jsFileCount}</span>`,d=n?.largestScript?`<span><strong>Largest script:</strong> ${i(l(n.largestScript.name))} (${n.largestScript.size})</span>`:`<span class="muted">Largest script: not available</span>`,f=a?`<span><strong>Blocking CSS:</strong> ${a.blockingCSS}</span>`:`<span class="muted">Blocking CSS: not available</span>`,p=a?`<span><strong>Sync scripts in head:</strong> ${a.syncScriptsInHead}</span>`:`<span class="muted">Sync scripts: not available</span>`,m={critical:[],warning:[],good:[]};(e.insights||[]).forEach(e=>{m[e.level]&&m[e.level].push(e.message)});let h=`
      ${r(`Critical Issues`,m.critical,`critical`)}
      ${r(`Warnings`,m.warning,`warning`)}
      ${r(`Good Signals`,m.good,`good`)}
    `;return`
    <div class="result-section"><strong>Loading Performance</strong></div>
    <div class="result-card column gap-30">
        <div class="column gap-10">
          <span class="white"><strong>Core Web Vitals</strong></span>
          ${o}
          ${s}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Bundle Analysis</strong></span>
          ${c}
          ${u}
          ${d}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Render Blocking</strong></span>
          ${f}
          ${p}
        </div>

        ${h?`
              <div class="insights column gap-10">
                <strong>Analysis</strong>
                <ul>${h}</ul>
              </div>
            `:``}
      </div>
    `}function l(e){try{return e.split(`/`).pop().split(`?`)[0]}catch{return e}}function u(e,t){let n=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),r=[...e.insights||[],...t].map(e=>`<li>${e}</li>`).join(``);return`
      <div class="result-section"><strong>Primary Technologies</strong></div>
      <div class="result-card primary column gap-20">
        <div class="result-header">
          <strong>[${d(e.type)}] ${e.name}</strong>
          <strong>${e.confidence}%</strong>
        </div>

        <div class="column gap-20">
          ${n?`<ul>${n}</ul>`:`<p class="muted">No direct evidence found</p>`}

          ${r?`
              <div class="insights column gap-20">
                <strong>Analysis</strong>
                <ul>${r}</ul>
              </div>
            `:``}
        </div>
      </div>
    `}function d(e){switch(e){case`framework`:return`Framework`;case`library`:return`Library`;case`cms`:return`CMS`;default:return`Other`}}function f(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``);return`
    <div class="result-section"><strong>Rendering Strategy</strong></div>
    <div class="result-card column gap-20">
      <div class="result-header">
        <strong>${p(e.strategy)}</strong>
        <strong>${e.confidence}%</strong>
      </div>

      ${t?`<ul>${t}</ul>`:`<span class="muted">No clear rendering evidence found</span>`}
    </div>
  `}function p(e){switch(e){case`SSR`:return`Server-side Rendering (SSR)`;case`SSG`:return`Static Site Generation (SSG)`;case`CSR`:return`Client-side Rendering (CSR)`;default:return`Unknown`}}function m(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),n=(e.insights||[]).map(e=>`<li>${e}</li>`).join(``);return`
    <div class="result-card column gap-20">
      <div class="result-header">
        <strong>[${g(e.type)}] ${e.name}</strong>
        <strong>${e.confidence}%</strong>
      </div>

      ${t?`<ul>${t}</ul>`:`<span class="muted">No direct evidence found</span>`}

      ${n?`
          <div class="insights column gap-20">
            <strong>Analysis</strong>
            <ul>${n}</ul>
          </div>
        `:``}
    </div>
  `}function h(){return`
    <div class="result-card column gap-20">
      <span class="muted">
        No additional technologies detected. This may indicate a minimal or highly optimized setup.
      </span>
    </div>
  `}function g(e){switch(e){case`framework`:return`Framework`;case`library`:return`Library`;case`cms`:return`CMS`;default:return`Other`}}function _(e){let{title:t,description:n,canonical:r,lang:a,headings:o,images:s,meta:c}=e.data,l={critical:[],warning:[],good:[]};(e.insights||[]).forEach(e=>{l[e.level]&&l[e.level].push(e.message)});let u=`
      ${v(`Critical Issues`,l.critical,`critical`)}
      ${v(`Warnings`,l.warning,`warning`)}
      ${v(`Good Signals`,l.good,`good`)}
    `,d=t?`<span><strong>Title:</strong> ${i(t,50)}</span>`:`<span class="muted">Title: missing</span>`,f=n?`<span><strong>Description:</strong> ${i(n,70)}</span>`:`<span class="muted">Description: missing</span>`,p=`<span><strong>H1:</strong> ${o?.h1??0}</span>`,m=`<span><strong>H2:</strong> ${o?.h2??0}</span>`,h=`<span><strong>Images:</strong> ${s?.total??0} (${s?.missingAlt??0} missing alt)</span>`;return`
      <div class="result-section"><strong>SEO</strong></div>
      <div class="result-card column gap-30">
        <div class="column gap-10">
          <span class="white"><strong>Structure</strong></span>
          ${d}
          ${f}
          ${a?`<span><strong>Lang:</strong> ${a}</span>`:`<span class="muted">Lang: missing</span>`}
          ${r?`<span><strong>Canonical:</strong> set</span>`:`<span class="muted">Canonical: missing</span>`}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Headings & Content</strong></span>
          ${p}
          ${m}
          ${h}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Meta & Social</strong></span>
          ${c?.viewport?`<span><strong>Viewport:</strong> set</span>`:`<span class="muted">Viewport: missing</span>`}
          ${`<span><strong>Open Graph:</strong> ${c?.openGraph??0}</span>`}
          ${`<span><strong>Twitter:</strong> ${c?.twitter??0}</span>`}
        </div>

        ${u?`
            <div class="insights column gap-10">
              <span class="white"><strong>Analysis</strong></span>
              <ul>${u}</ul>
            </div>
          `:``}
      </div>
    `}function v(e,t,n){return t.length?`
    <div class="insight-group ${n}">
      <strong>${e}</strong>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `:``}function y(e,t){let n=[];return e&&n.push(e.type),t?.length&&t.forEach(e=>n.push(e.type)),{categoryInsights:b({hasFramework:n.includes(`framework`),hasCMS:n.includes(`cms`),hasLibrary:n.includes(`library`)})}}function b({hasFramework:e,hasCMS:t,hasLibrary:n}){let r=[];return!e&&!t?r.push(`No framework or CMS detected`):(e||r.push(`No frontend framework detected`),t||r.push(`No CMS detected`)),!n&&!e&&!t&&r.push(`No major frontend libraries detected`),r}var x=document.getElementById(`dashboard-results`),S=new URLSearchParams(window.location.search).get(`tabId`);S?chrome.storage.local.get(`stackResults_${S}`,e=>{C(e[`stackResults_${S}`]||{})}):x.innerHTML=`<span>No data available</span>`;function C(r){let{primary:i,secondary:a,rendering:s,cdn:l,performance:d,seo:p,summary:g}=r||{},v=d?.loading||null,b=d?.interaction||null,{categoryInsights:S}=y(i||null,a||[]),C=``;g&&(C+=e(g)),v&&(C+=c(v)),b&&(C+=o(b)),p&&p.data&&(C+=_(p)),i&&(C+=u(i,S)),a&&a.length?C+=`
        <div class="result-section"><strong>Secondary Technologies</strong></div>
        ${a.map(m).join(``)}
    `:a&&(C+=`
        <div class="result-section"><strong>Secondary Technologies</strong></div>
        ${h()}
    `),s&&(C+=f(s)),l&&(C+=n(l)),C||=t(),x.innerHTML=C}