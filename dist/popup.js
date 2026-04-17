(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),n=e.edge?`<span><strong>Edge:</strong> ${e.edge}</span>`:``,r=e.assets&&e.assets.length>0?`<span><strong>Assets:</strong> ${e.assets.join(`, `)}</span>`:``,i=e.source===`headers`?`<span><strong>Detected via:</strong> server headers</span>`:`<span><strong>Detected via:</strong> resource analysis</span>`,a=e.platform?`<span><strong>Platform:</strong> ${e.platform}</span>`:``;return`
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
    `}var t={animatedCount:{warning:15,critical:40},expensiveAnimationCount:{warning:3,critical:10},fixedCount:{warning:5,critical:10},hoverRules:{warning:10,critical:25},boxShadowCount:{warning:15,critical:40},filterCount:{warning:3,critical:10},backdropFilterCount:{warning:1,critical:5},gradientCount:{warning:20,critical:50},layoutAnimationCount:{warning:2,critical:5}};function n(e){let n=`
      <div class="column gap-10">
        <span class="white"><strong>Motion Overview</strong></span>
      
        <span>
          <strong>Animated elements:</strong>
          <span class="metric ${r(e.data.animatedCount,t.animatedCount)}">
            ${e.data.animatedCount}
          </span>
        </span>
      
        <span>
          <strong>Expensive animations:</strong>
          <span class="metric ${r(e.data.expensiveAnimationCount,t.expensiveAnimationCount)}">
            ${e.data.expensiveAnimationCount}
          </span>
        </span>
      
        <span>
          <strong>Fixed elements:</strong>
          <span class="metric ${r(e.data.fixedCount,t.fixedCount)}">
            ${e.data.fixedCount}
          </span>
        </span>
      
        <span>
          <strong>Hover rules:</strong>
          <span class="metric ${r(e.data.hoverRules,t.hoverRules)}">
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
          <span class="metric ${r(e.data.boxShadowCount,t.boxShadowCount)}">
            ${e.data.boxShadowCount}
          </span>
        </span>
      
        <span>
          <strong>Filters:</strong>
          <span class="metric ${r(e.data.filterCount,t.filterCount)}">
            ${e.data.filterCount}
          </span>
        </span>
      
        <span>
          <strong>Backdrop filters:</strong>
          <span class="metric ${r(e.data.backdropFilterCount,t.backdropFilterCount)}">
            ${e.data.backdropFilterCount}
          </span>
        </span>
      
        <span>
          <strong>Gradients:</strong>
          <span class="metric ${r(e.data.gradientCount,t.gradientCount)}">
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
          <span class="metric ${r(e.data.layoutAnimationCount,t.layoutAnimationCount)}">
            ${e.data.layoutAnimationCount}
          </span>
        </span>
      </div>
    `,i={critical:[],warning:[],good:[]};(e.insights||[]).forEach(e=>{i[e.level]&&i[e.level].push(e.message)});let a=`
      ${x(`Critical Issues`,i.critical,`critical`)}
      ${x(`Warnings`,i.warning,`warning`)}
      ${x(`Good Signals`,i.good,`good`)}
    `;return`<div class="result-section"><strong>Interaction Performance</strong></div>
      <div class="result-card column gap-30">
        ${n}

        ${a?`
              <div class="insights column gap-10">
                <strong>Analysis</strong>
                <ul>${a}</ul>
              </div>
            `:`
              <span class="muted">
                No major interaction or animation issues detected
              </span>
            `}
      </div>
    `}function r(e,t){return e==null?``:e>=t.critical?`critical`:e>=t.warning?`warning`:`good`}function i(e){let{coreWebVitals:t,bundleAnalysis:n,renderBlocking:r}=e.data,i=t?.lcp?`<span><strong>LCP:</strong> ${t.lcp.value} (${t.lcp.rating})</span>`:`<span class="muted"><strong>LCP:</strong> analyzing...</span>`,o=t?.cls?`<span><strong>CLS:</strong> ${t.cls.value} (${t.cls.rating})</span>`:`<span class="muted"><strong>CLS:</strong> analyzing...</span>`,s=n?.totalJSSize?`<span><strong>Total JS size:</strong> ${n.totalJSSize.value}</span>`:`<span class="muted">Total JS size: not available</span>`,c=n?.jsFileCount===void 0?`<span class="muted">JS files: not available</span>`:`<span><strong>JS files:</strong> ${n.jsFileCount}</span>`,l=n?.largestScript?`<span><strong>Largest script:</strong> ${S(a(n.largestScript.name))} (${n.largestScript.size})</span>`:`<span class="muted">Largest script: not available</span>`,u=r?`<span><strong>Blocking CSS:</strong> ${r.blockingCSS}</span>`:`<span class="muted">Blocking CSS: not available</span>`,d=r?`<span><strong>Sync scripts in head:</strong> ${r.syncScriptsInHead}</span>`:`<span class="muted">Sync scripts: not available</span>`,f={critical:[],warning:[],good:[]};(e.insights||[]).forEach(e=>{f[e.level]&&f[e.level].push(e.message)});let p=`
      ${x(`Critical Issues`,f.critical,`critical`)}
      ${x(`Warnings`,f.warning,`warning`)}
      ${x(`Good Signals`,f.good,`good`)}
    `;return`
    <div class="result-section"><strong>Loading Performance</strong></div>
    <div class="result-card column gap-30">
        <div class="column gap-10">
          <span class="white"><strong>Core Web Vitals</strong></span>
          ${i}
          ${o}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Bundle Analysis</strong></span>
          ${s}
          ${c}
          ${l}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Render Blocking</strong></span>
          ${u}
          ${d}
        </div>

        ${p?`
              <div class="insights column gap-10">
                <strong>Analysis</strong>
                <ul>${p}</ul>
              </div>
            `:``}
      </div>
    `}function a(e){try{return e.split(`/`).pop().split(`?`)[0]}catch{return e}}function o(e,t){let n=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),r=[...e.insights||[],...t].map(e=>`<li>${e}</li>`).join(``);return`
      <div class="result-section"><strong>Primary Technologies</strong></div>
      <div class="result-card primary column gap-20">
        <div class="result-header">
          <strong>[${s(e.type)}] ${e.name}</strong>
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
    `}function s(e){switch(e){case`framework`:return`Framework`;case`library`:return`Library`;case`cms`:return`CMS`;default:return`Other`}}function c(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``);return`
    <div class="result-section"><strong>Rendering Strategy</strong></div>
    <div class="result-card column gap-20">
      <div class="result-header">
        <strong>${l(e.strategy)}</strong>
        <strong>${e.confidence}%</strong>
      </div>

      ${t?`<ul>${t}</ul>`:`<span class="muted">No clear rendering evidence found</span>`}
    </div>
  `}function l(e){switch(e){case`SSR`:return`Server-side Rendering (SSR)`;case`SSG`:return`Static Site Generation (SSG)`;case`CSR`:return`Client-side Rendering (CSR)`;default:return`Unknown`}}function u(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),n=(e.insights||[]).map(e=>`<li>${e}</li>`).join(``);return`
    <div class="result-card column gap-20">
      <div class="result-header">
        <strong>[${f(e.type)}] ${e.name}</strong>
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
  `}function d(){return`
    <div class="result-card column gap-20">
      <span class="muted">
        No additional technologies detected. This may indicate a minimal or highly optimized setup.
      </span>
    </div>
  `}function f(e){switch(e){case`framework`:return`Framework`;case`library`:return`Library`;case`cms`:return`CMS`;default:return`Other`}}function p(e){let{title:t,description:n,canonical:r,lang:i,headings:a,images:o,meta:s}=e.data,c={critical:[],warning:[],good:[]};(e.insights||[]).forEach(e=>{c[e.level]&&c[e.level].push(e.message)});let l=`
      ${m(`Critical Issues`,c.critical,`critical`)}
      ${m(`Warnings`,c.warning,`warning`)}
      ${m(`Good Signals`,c.good,`good`)}
    `,u=t?`<span><strong>Title:</strong> ${S(t,50)}</span>`:`<span class="muted">Title: missing</span>`,d=n?`<span><strong>Description:</strong> ${S(n,70)}</span>`:`<span class="muted">Description: missing</span>`,f=`<span><strong>H1:</strong> ${a?.h1??0}</span>`,p=`<span><strong>H2:</strong> ${a?.h2??0}</span>`,h=`<span><strong>Images:</strong> ${o?.total??0} (${o?.missingAlt??0} missing alt)</span>`;return`
      <div class="result-section"><strong>SEO</strong></div>
      <div class="result-card column gap-30">
        <div class="column gap-10">
          <span class="white"><strong>Structure</strong></span>
          ${u}
          ${d}
          ${i?`<span><strong>Lang:</strong> ${i}</span>`:`<span class="muted">Lang: missing</span>`}
          ${r?`<span><strong>Canonical:</strong> set</span>`:`<span class="muted">Canonical: missing</span>`}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Headings & Content</strong></span>
          ${f}
          ${p}
          ${h}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Meta & Social</strong></span>
          ${s?.viewport?`<span><strong>Viewport:</strong> set</span>`:`<span class="muted">Viewport: missing</span>`}
          ${`<span><strong>Open Graph:</strong> ${s?.openGraph??0}</span>`}
          ${`<span><strong>Twitter:</strong> ${s?.twitter??0}</span>`}
        </div>

        ${l?`
            <div class="insights column gap-10">
              <span class="white"><strong>Analysis</strong></span>
              <ul>${l}</ul>
            </div>
          `:``}
      </div>
    `}function m(e,t,n){return t.length?`
    <div class="insight-group ${n}">
      <strong>${e}</strong>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `:``}function h(e){let{loadingPerformanceScore:t,interactionPerformanceScore:n,seoScore:r,overallScore:i,topIssues:a}=e,o={critical:2,warning:1},s=(a||[]).sort((e,t)=>o[t.level]-o[e.level]).slice(0,3).map(e=>`<li><span class="${e.level}">[${e.source}]</span> ${e.message}</li>`).join(``);return`
        <div class="result-section"><strong>Summary</strong></div>

        <div class="result-card column gap-20 summary">
            <div class="summary-score">
              <strong>Overall</strong>
              <div class="row gap-5">
                <span class="score ${g(i)}">${i??`N/A`}</span>
                <span class="white"><strong>/ 100</strong></span>
              </div>
            </div>

            <div class="summary-breakdown column gap-20">
              <div class="row gap-10">
                <span><strong class="white">Loading Performance:</strong></span>
                <div class="row gap-5">
                  <span class="score ${g(t)}">${t??`N/A`}</span>
                  <span class="white"><strong>/ 100</strong></span>
                </div>
              </div>

              <div class="row gap-10">
                <span><strong class="white">Interaction Performance:</strong></span>
                <div class="row gap-5">
                  <span class="score ${g(n)}">${n??`N/A`}</span>
                  <span class="white"><strong>/ 100</strong></span>
                </div>
              </div>

              <div class="row gap-10">
                <span><strong class="white">SEO:</strong></span>
                <div class="row gap-5">
                  <span class="score ${g(r)}">${r??`N/A`}</span>
                  <span class="white"><strong>/ 100</strong></span>
                </div>
              </div>
            </div>

            ${s?`
                <div class="insights column gap-10">
                  <strong>Top Issues</strong>
                  <ul>${s}</ul>
                </div>
              `:``}
        </div>
    `}function g(e){return e==null?``:e>=85?`good`:e>=60?`warning`:`critical`}function _(){return`
      <div class="result-card column gap-20">
        <div class="result-header">
          <strong>Analysis</strong>
        </div>
        <span class="muted">
          No detectable technologies. This site likely uses server-side rendering,
          a custom framework, or heavily optimized production builds.
        </span>
      </div>
    `}var v=document.getElementById(`results`);chrome.tabs.query({active:!0,currentWindow:!0},e=>{let t=e[0];if(!t?.id){b({});return}chrome.storage.local.get(`stackResults_${t.id}`,e=>{b(e[`stackResults_${t.id}`]||{}),w(t.id)})});function y(e,t){let n=[];return e&&n.push(e.type),t?.length&&t.forEach(e=>n.push(e.type)),{categoryInsights:C({hasFramework:n.includes(`framework`),hasCMS:n.includes(`cms`),hasLibrary:n.includes(`library`)})}}function b(t){let{primary:r,secondary:a,rendering:s,cdn:l,performance:f,seo:m,summary:g}=t||{},b=f?.loading||null,x=f?.interaction||null,{categoryInsights:S}=y(r,a),C=``;g&&(C+=h(g)),b&&(C+=i(b)),x&&(C+=n(x)),m&&m.data&&(C+=p(m)),r&&(C+=o(r,S)),a&&(C+=`
      <div class="result-section"><strong>Secondary Technologies</strong></div>
      ${a.length>0?a.map(u).join(``):d()}
    `),C||=_(),s&&(C+=c(s)),l&&(C+=e(l)),v.innerHTML=C}function x(e,t,n){return t.length?`
    <div class="insight-group ${n}">
      <strong>${e}</strong>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `:``}function S(e,t=40){return e?e.length>t?e.slice(0,t)+`...`:e:``}function C({hasFramework:e,hasCMS:t,hasLibrary:n}){let r=[];return!e&&!t?r.push(`No framework or CMS detected`):(e||r.push(`No frontend framework detected`),t||r.push(`No CMS detected`)),!n&&!e&&!t&&r.push(`No major frontend libraries detected`),r}function w(e){let t=0,n=setInterval(()=>{chrome.storage.local.get(`stackResults_${e}`,t=>{b(t[`stackResults_${e}`]||{})}),t++,t>=5&&clearInterval(n)},1e3)}