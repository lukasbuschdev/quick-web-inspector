(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`results`);chrome.tabs.query({active:!0,currentWindow:!0},e=>{let n=e[0];if(!n?.id){t({});return}chrome.storage.local.get(`stackResults_${n.id}`,e=>{t(e[`stackResults_${n.id}`]||{}),u(n.id)})});function t(t){let{primary:u,secondary:d,rendering:f,cdn:p,performance:m,seo:h,summary:g}=t||{},_=``,v=[];u&&v.push(u.type),d&&d.length>0&&d.forEach(e=>v.push(e.type));let y=r({hasFramework:v.includes(`framework`),hasCMS:v.includes(`cms`),hasLibrary:v.includes(`library`)});if(g){let{performanceScore:e,seoScore:t,overallScore:n,topIssues:r}=g,i={critical:2,warning:1},a=(r||[]).sort((e,t)=>i[t.level]-i[e.level]).slice(0,3).map(e=>`<li><span class="${e.level}">[${e.source}]</span> ${e.message}</li>`).join(``);_+=`
      <div class="result-section"><strong>Summary</strong></div>

      <div class="result-card column gap-20 summary">
        <div class="summary-score">
          <strong>Overall</strong>
          <div class="row gap-5">
            <span class="score ${l(n)}">${n??`N/A`}</span>
            <span class="white"><strong>/ 100</strong></span>
          </div>
        </div>

        <div class="summary-breakdown column gap-20">
          <div class="row gap-10">
            <span><strong class="white">Performance:</strong></span>
            <div class="row gap-5">
              <span class="score ${l(e)}">${e??`N/A`}</span>
              <span class="white"><strong>/ 100</strong></span>
            </div>
          </div>

          <div class="row gap-10">
            <span><strong class="white">SEO:</strong></span>
            <div class="row gap-5">
              <span class="score ${l(t)}">${t??`N/A`}</span>
              <span class="white"><strong>/ 100</strong></span>
            </div>
          </div>
        </div>

        ${a?`
            <div class="insights column gap-10">
              <strong>Top Issues</strong>
              <ul>${a}</ul>
            </div>
          `:``}
      </div>
    `}if(m&&m.data){let{coreWebVitals:e,bundleAnalysis:t,renderBlocking:n}=m.data,r=e?.lcp?`<span><strong>LCP:</strong> ${e.lcp.value} (${e.lcp.rating})</span>`:`<span class="muted"><strong>LCP:</strong> analyzing...</span>`,a=e?.cls?`<span><strong>CLS:</strong> ${e.cls.value} (${e.cls.rating})</span>`:`<span class="muted"><strong>CLS:</strong> analyzing...</span>`,o=t?.totalJSSize?`<span><strong>Total JS size:</strong> ${t.totalJSSize.value}</span>`:`<span class="muted">Total JS size: not available</span>`,l=t?.jsFileCount===void 0?`<span class="muted">JS files: not available</span>`:`<span><strong>JS files:</strong> ${t.jsFileCount}</span>`,u=t?.largestScript?`<span><strong>Largest script:</strong> ${c(s(t.largestScript.name))} (${t.largestScript.size})</span>`:`<span class="muted">Largest script: not available</span>`,d=n?`<span><strong>Blocking CSS:</strong> ${n.blockingCSS}</span>`:`<span class="muted">Blocking CSS: not available</span>`,f=n?`<span><strong>Sync scripts in head:</strong> ${n.syncScriptsInHead}</span>`:`<span class="muted">Sync scripts: not available</span>`,p={critical:[],warning:[],good:[]};(m.insights||[]).forEach(e=>{p[e.level]&&p[e.level].push(e.message)});let h=`
      ${i(`Critical Issues`,p.critical,`critical`)}
      ${i(`Warnings`,p.warning,`warning`)}
      ${i(`Good Signals`,p.good,`good`)}
    `;_+=`<div class="result-section"><strong>Performance</strong></div>`,_+=`
      <div class="result-card column gap-30">
        <div class="column gap-10">
          <span class="white"><strong>Core Web Vitals</strong></span>
          ${r}
          ${a}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Bundle Analysis</strong></span>
          ${o}
          ${l}
          ${u}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Render Blocking</strong></span>
          ${d}
          ${f}
        </div>

        ${h?`
              <div class="insights column gap-10">
                <strong>Analysis</strong>
                <ul>${h}</ul>
              </div>
            `:``}
      </div>
    `}if(h&&h.data){let{title:e,description:t,canonical:n,lang:r,headings:i,images:o,meta:s}=h.data,l={critical:[],warning:[],good:[]};(h.insights||[]).forEach(e=>{l[e.level]&&l[e.level].push(e.message)});let u=`
      ${a(`Critical Issues`,l.critical,`critical`)}
      ${a(`Warnings`,l.warning,`warning`)}
      ${a(`Good Signals`,l.good,`good`)}
    `,d=e?`<span><strong>Title:</strong> ${c(e,50)}</span>`:`<span class="muted">Title: missing</span>`,f=t?`<span><strong>Description:</strong> ${c(t,70)}</span>`:`<span class="muted">Description: missing</span>`,p=`<span><strong>H1:</strong> ${i?.h1??0}</span>`,m=`<span><strong>H2:</strong> ${i?.h2??0}</span>`,g=`<span><strong>Images:</strong> ${o?.total??0} (${o?.missingAlt??0} missing alt)</span>`,v=r?`<span><strong>Lang:</strong> ${r}</span>`:`<span class="muted">Lang: missing</span>`,y=n?`<span><strong>Canonical:</strong> set</span>`:`<span class="muted">Canonical: missing</span>`,b=s?.viewport?`<span><strong>Viewport:</strong> set</span>`:`<span class="muted">Viewport: missing</span>`,x=`<span><strong>Open Graph:</strong> ${s?.openGraph??0}</span>`,S=`<span><strong>Twitter:</strong> ${s?.twitter??0}</span>`;_+=`<div class="result-section"><strong>SEO</strong></div>`,_+=`
      <div class="result-card column gap-30">
        <div class="column gap-10">
          <span class="white"><strong>Structure</strong></span>
          ${d}
          ${f}
          ${v}
          ${y}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Headings & Content</strong></span>
          ${p}
          ${m}
          ${g}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Meta & Social</strong></span>
          ${b}
          ${x}
          ${S}
        </div>

        ${u?`
            <div class="insights column gap-10">
              <span class="white"><strong>Analysis</strong></span>
              <ul>${u}</ul>
            </div>
          `:``}
      </div>
    `}if(u){let e=(u.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),t=[...u.insights||[],...y].map(e=>`<li>${e}</li>`).join(``);_+=`<div class="result-section"><strong>Primary Technologies</strong></div>`,_+=`
      <div class="result-card primary column gap-20">
        <div class="result-header">
          <strong>[${n(u.type)}] ${u.name}</strong>
          <strong>${u.confidence}%</strong>
        </div>

        <div class="column gap-20">
          ${e?`<ul>${e}</ul>`:`<p class="muted">No direct evidence found</p>`}

          ${t?`
              <div class="insights column gap-20">
                <strong>Analysis</strong>
                <ul>${t}</ul>
              </div>
            `:``}
        </div>
      </div>
    `}if(d&&d.length>0&&(_+=`<div class="result-section"><strong>Secondary Technologies</strong></div>`,_+=d.map(e=>{let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),r=(e.insights||[]).map(e=>`<li>${e}</li>`).join(``);return`
          <div class="result-card column gap-20">
            <div class="result-header">
              <strong>[${n(e.type)}] ${e.name}</strong>
              <strong>${e.confidence}%</strong>
            </div>

            ${t?`<ul>${t}</ul>`:`<span class="muted">No direct evidence found</span>`}

            ${r?`
                <div class="insights column gap-20">
                  <strong>Analysis</strong>
                  <ul>${r}</ul>
                </div>
              `:``}
          </div>
        `}).join(``)),_||=`
      <div class="result-card column gap-20">
        <div class="result-header">
          <strong>Analysis</strong>
        </div>
        <span class="muted">
          No detectable technologies. This site likely uses server-side rendering,
          a custom framework, or heavily optimized production builds.
        </span>
      </div>
    `,f){let e=(f.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``);_+=`<div class="result-section"><strong>Rendering Strategy</strong></div>`,_+=`
    <div class="result-card column gap-20">
      <div class="result-header">
        <strong>${o(f.strategy)}</strong>
        <strong>${f.confidence}%</strong>
      </div>

      ${e?`<ul>${e}</ul>`:`<span class="muted">No clear rendering evidence found</span>`}
    </div>
  `}if(p){let e=(p.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),t=p.edge?`<span><strong>Edge:</strong> ${p.edge}</span>`:``,n=p.assets&&p.assets.length>0?`<span><strong>Assets:</strong> ${p.assets.join(`, `)}</span>`:``,r=p.source===`headers`?`<span><strong>Detected via:</strong> server headers</span>`:`<span><strong>Detected via:</strong> resource analysis</span>`,i=p.platform?`<span><strong>Platform:</strong> ${p.platform}</span>`:``;_+=`<div class="result-section"><strong>Delivery & Hosting</strong></div>`,_+=`
      <div class="result-card column gap-20">
        <div class="result-header">
          <strong>${p.edge||p.platform||(p.assets.length>0?`Asset CDN detected`:`No CDN detected`)}</strong>
          <strong>${p.confidence}%</strong>
        </div>

        <div class="column gap-20">
          ${r}
          ${t}
          ${i}
          ${n}
        </div>

        ${e?`<ul>${e}</ul>`:`<span class="muted">No clear CDN evidence found</span>`}
      </div>
    `}e.innerHTML=_}function n(e){switch(e){case`framework`:return`Framework`;case`library`:return`Library`;case`cms`:return`CMS`;default:return`Other`}}function r({hasFramework:e,hasCMS:t,hasLibrary:n}){let r=[];return!e&&!t?r.push(`No framework or CMS detected`):(e||r.push(`No frontend framework detected`),t||r.push(`No CMS detected`)),!n&&!e&&!t&&r.push(`No major frontend libraries detected`),r}function i(e,t,n){return t.length?`
    <div class="insight-group ${n}">
      <strong>${e}</strong>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `:``}function a(e,t,n){return t.length?`
    <div class="insight-group ${n}">
      <strong>${e}</strong>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `:``}function o(e){switch(e){case`SSR`:return`Server-side Rendering (SSR)`;case`SSG`:return`Static Site Generation (SSG)`;case`CSR`:return`Client-side Rendering (CSR)`;default:return`Unknown`}}function s(e){try{return e.split(`/`).pop().split(`?`)[0]}catch{return e}}function c(e,t=40){return e?e.length>t?e.slice(0,t)+`...`:e:``}function l(e){return e==null?``:e>=85?`good`:e>=60?`warning`:`critical`}function u(e){let n=0,r=setInterval(()=>{chrome.storage.local.get(`stackResults_${e}`,n=>{t(n[`stackResults_${e}`]||{})}),n++,n>=5&&clearInterval(r)},2e3)}