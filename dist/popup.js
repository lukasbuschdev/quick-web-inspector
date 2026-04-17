(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`results`);chrome.tabs.query({active:!0,currentWindow:!0},e=>{let t=e[0];if(!t?.id){n({});return}chrome.storage.local.get(`stackResults_${t.id}`,e=>{n(e[`stackResults_${t.id}`]||{}),f(t.id)})});var t={animatedCount:{warning:15,critical:40},expensiveAnimationCount:{warning:3,critical:10},fixedCount:{warning:5,critical:10},hoverRules:{warning:10,critical:25},boxShadowCount:{warning:15,critical:40},filterCount:{warning:3,critical:10},backdropFilterCount:{warning:1,critical:5},gradientCount:{warning:20,critical:50},layoutAnimationCount:{warning:2,critical:5}};function n(n){let{primary:f,secondary:p,rendering:m,cdn:h,performance:g,seo:_,summary:v}=n||{},y=g?.loading||null,b=g?.interaction||null,x=``,S=[];f&&S.push(f.type),p&&p.length>0&&p.forEach(e=>S.push(e.type));let C=i({hasFramework:S.includes(`framework`),hasCMS:S.includes(`cms`),hasLibrary:S.includes(`library`)});if(v){let{loadingPerformanceScore:e,interactionPerformanceScore:t,seoScore:n,overallScore:r,topIssues:i}=v,a={critical:2,warning:1},o=(i||[]).sort((e,t)=>a[t.level]-a[e.level]).slice(0,3).map(e=>`<li><span class="${e.level}">[${e.source}]</span> ${e.message}</li>`).join(``);x+=`
      <div class="result-section"><strong>Summary</strong></div>

      <div class="result-card column gap-20 summary">
        <div class="summary-score">
          <strong>Overall</strong>
          <div class="row gap-5">
            <span class="score ${u(r)}">${r??`N/A`}</span>
            <span class="white"><strong>/ 100</strong></span>
          </div>
        </div>

        <div class="summary-breakdown column gap-20">
          <div class="row gap-10">
            <span><strong class="white">Loading Performance:</strong></span>
            <div class="row gap-5">
              <span class="score ${u(e)}">${e??`N/A`}</span>
              <span class="white"><strong>/ 100</strong></span>
            </div>
          </div>
          
          <div class="row gap-10">
            <span><strong class="white">Interaction Performance:</strong></span>
            <div class="row gap-5">
              <span class="score ${u(t)}">${t??`N/A`}</span>
              <span class="white"><strong>/ 100</strong></span>
            </div>
          </div>

          <div class="row gap-10">
            <span><strong class="white">SEO:</strong></span>
            <div class="row gap-5">
              <span class="score ${u(n)}">${n??`N/A`}</span>
              <span class="white"><strong>/ 100</strong></span>
            </div>
          </div>
        </div>

        ${o?`
            <div class="insights column gap-10">
              <strong>Top Issues</strong>
              <ul>${o}</ul>
            </div>
          `:``}
      </div>
    `}if(y){let{coreWebVitals:e,bundleAnalysis:t,renderBlocking:n}=y.data,r=e?.lcp?`<span><strong>LCP:</strong> ${e.lcp.value} (${e.lcp.rating})</span>`:`<span class="muted"><strong>LCP:</strong> analyzing...</span>`,i=e?.cls?`<span><strong>CLS:</strong> ${e.cls.value} (${e.cls.rating})</span>`:`<span class="muted"><strong>CLS:</strong> analyzing...</span>`,o=t?.totalJSSize?`<span><strong>Total JS size:</strong> ${t.totalJSSize.value}</span>`:`<span class="muted">Total JS size: not available</span>`,s=t?.jsFileCount===void 0?`<span class="muted">JS files: not available</span>`:`<span><strong>JS files:</strong> ${t.jsFileCount}</span>`,u=t?.largestScript?`<span><strong>Largest script:</strong> ${l(c(t.largestScript.name))} (${t.largestScript.size})</span>`:`<span class="muted">Largest script: not available</span>`,d=n?`<span><strong>Blocking CSS:</strong> ${n.blockingCSS}</span>`:`<span class="muted">Blocking CSS: not available</span>`,f=n?`<span><strong>Sync scripts in head:</strong> ${n.syncScriptsInHead}</span>`:`<span class="muted">Sync scripts: not available</span>`,p={critical:[],warning:[],good:[]};(y.insights||[]).forEach(e=>{p[e.level]&&p[e.level].push(e.message)});let m=`
      ${a(`Critical Issues`,p.critical,`critical`)}
      ${a(`Warnings`,p.warning,`warning`)}
      ${a(`Good Signals`,p.good,`good`)}
    `;x+=`<div class="result-section"><strong>Loading Performance</strong></div>`,x+=`
      <div class="result-card column gap-30">
        <div class="column gap-10">
          <span class="white"><strong>Core Web Vitals</strong></span>
          ${r}
          ${i}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Bundle Analysis</strong></span>
          ${o}
          ${s}
          ${u}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Render Blocking</strong></span>
          ${d}
          ${f}
        </div>

        ${m?`
              <div class="insights column gap-10">
                <strong>Analysis</strong>
                <ul>${m}</ul>
              </div>
            `:``}
      </div>
    `}if(b){let e=`
      <div class="column gap-10">
        <span class="white"><strong>Motion Overview</strong></span>
      
        <span>
          <strong>Animated elements:</strong>
          <span class="metric ${d(b.data.animatedCount,t.animatedCount)}">
            ${b.data.animatedCount}
          </span>
        </span>
      
        <span>
          <strong>Expensive animations:</strong>
          <span class="metric ${d(b.data.expensiveAnimationCount,t.expensiveAnimationCount)}">
            ${b.data.expensiveAnimationCount}
          </span>
        </span>
      
        <span>
          <strong>Fixed elements:</strong>
          <span class="metric ${d(b.data.fixedCount,t.fixedCount)}">
            ${b.data.fixedCount}
          </span>
        </span>
      
        <span>
          <strong>Hover rules:</strong>
          <span class="metric ${d(b.data.hoverRules,t.hoverRules)}">
            ${b.data.hoverRules}
          </span>
        </span>
      
        <span>
          <strong>Reduced motion:</strong>
          <span class="metric ${b.data.hasReducedMotionSupport?`good`:`critical`}">
            ${b.data.hasReducedMotionSupport?`supported`:`not supported`}
          </span>
        </span>
      
        <span>
          <strong>Box shadows:</strong>
          <span class="metric ${d(b.data.boxShadowCount,t.boxShadowCount)}">
            ${b.data.boxShadowCount}
          </span>
        </span>
      
        <span>
          <strong>Filters:</strong>
          <span class="metric ${d(b.data.filterCount,t.filterCount)}">
            ${b.data.filterCount}
          </span>
        </span>
      
        <span>
          <strong>Backdrop filters:</strong>
          <span class="metric ${d(b.data.backdropFilterCount,t.backdropFilterCount)}">
            ${b.data.backdropFilterCount}
          </span>
        </span>
      
        <span>
          <strong>Gradients:</strong>
          <span class="metric ${d(b.data.gradientCount,t.gradientCount)}">
            ${b.data.gradientCount}
          </span>
        </span>
      
        <span>
          <strong>GPU-friendly animations:</strong>
          <span class="metric good">
            ${b.data.gpuFriendlyAnimationCount}
          </span>
        </span>
      
        <span>
          <strong>Layout-triggering animations:</strong>
          <span class="metric ${d(b.data.layoutAnimationCount,t.layoutAnimationCount)}">
            ${b.data.layoutAnimationCount}
          </span>
        </span>
      </div>
    `,n={critical:[],warning:[],good:[]};(b.insights||[]).forEach(e=>{n[e.level]&&n[e.level].push(e.message)});let r=`
      ${a(`Critical Issues`,n.critical,`critical`)}
      ${a(`Warnings`,n.warning,`warning`)}
      ${a(`Good Signals`,n.good,`good`)}
    `;x+=`<div class="result-section"><strong>Interaction Performance</strong></div>`,x+=`
      <div class="result-card column gap-30">
        ${e}

        ${r?`
              <div class="insights column gap-10">
                <strong>Analysis</strong>
                <ul>${r}</ul>
              </div>
            `:`
              <span class="muted">
                No major interaction or animation issues detected
              </span>
            `}
      </div>
    `}if(_&&_.data){let{title:e,description:t,canonical:n,lang:r,headings:i,images:a,meta:s}=_.data,c={critical:[],warning:[],good:[]};(_.insights||[]).forEach(e=>{c[e.level]&&c[e.level].push(e.message)});let u=`
      ${o(`Critical Issues`,c.critical,`critical`)}
      ${o(`Warnings`,c.warning,`warning`)}
      ${o(`Good Signals`,c.good,`good`)}
    `,d=e?`<span><strong>Title:</strong> ${l(e,50)}</span>`:`<span class="muted">Title: missing</span>`,f=t?`<span><strong>Description:</strong> ${l(t,70)}</span>`:`<span class="muted">Description: missing</span>`,p=`<span><strong>H1:</strong> ${i?.h1??0}</span>`,m=`<span><strong>H2:</strong> ${i?.h2??0}</span>`,h=`<span><strong>Images:</strong> ${a?.total??0} (${a?.missingAlt??0} missing alt)</span>`,g=r?`<span><strong>Lang:</strong> ${r}</span>`:`<span class="muted">Lang: missing</span>`,v=n?`<span><strong>Canonical:</strong> set</span>`:`<span class="muted">Canonical: missing</span>`,y=s?.viewport?`<span><strong>Viewport:</strong> set</span>`:`<span class="muted">Viewport: missing</span>`,b=`<span><strong>Open Graph:</strong> ${s?.openGraph??0}</span>`,S=`<span><strong>Twitter:</strong> ${s?.twitter??0}</span>`;x+=`<div class="result-section"><strong>SEO</strong></div>`,x+=`
      <div class="result-card column gap-30">
        <div class="column gap-10">
          <span class="white"><strong>Structure</strong></span>
          ${d}
          ${f}
          ${g}
          ${v}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Headings & Content</strong></span>
          ${p}
          ${m}
          ${h}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Meta & Social</strong></span>
          ${y}
          ${b}
          ${S}
        </div>

        ${u?`
            <div class="insights column gap-10">
              <span class="white"><strong>Analysis</strong></span>
              <ul>${u}</ul>
            </div>
          `:``}
      </div>
    `}if(f){let e=(f.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),t=[...f.insights||[],...C].map(e=>`<li>${e}</li>`).join(``);x+=`<div class="result-section"><strong>Primary Technologies</strong></div>`,x+=`
      <div class="result-card primary column gap-20">
        <div class="result-header">
          <strong>[${r(f.type)}] ${f.name}</strong>
          <strong>${f.confidence}%</strong>
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
    `}if(p&&p.length>0&&(x+=`<div class="result-section"><strong>Secondary Technologies</strong></div>`,x+=p.map(e=>{let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),n=(e.insights||[]).map(e=>`<li>${e}</li>`).join(``);return`
          <div class="result-card column gap-20">
            <div class="result-header">
              <strong>[${r(e.type)}] ${e.name}</strong>
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
        `}).join(``)),x||=`
      <div class="result-card column gap-20">
        <div class="result-header">
          <strong>Analysis</strong>
        </div>
        <span class="muted">
          No detectable technologies. This site likely uses server-side rendering,
          a custom framework, or heavily optimized production builds.
        </span>
      </div>
    `,m){let e=(m.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``);x+=`<div class="result-section"><strong>Rendering Strategy</strong></div>`,x+=`
    <div class="result-card column gap-20">
      <div class="result-header">
        <strong>${s(m.strategy)}</strong>
        <strong>${m.confidence}%</strong>
      </div>

      ${e?`<ul>${e}</ul>`:`<span class="muted">No clear rendering evidence found</span>`}
    </div>
  `}if(h){let e=(h.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),t=h.edge?`<span><strong>Edge:</strong> ${h.edge}</span>`:``,n=h.assets&&h.assets.length>0?`<span><strong>Assets:</strong> ${h.assets.join(`, `)}</span>`:``,r=h.source===`headers`?`<span><strong>Detected via:</strong> server headers</span>`:`<span><strong>Detected via:</strong> resource analysis</span>`,i=h.platform?`<span><strong>Platform:</strong> ${h.platform}</span>`:``;x+=`<div class="result-section"><strong>Delivery & Hosting</strong></div>`,x+=`
      <div class="result-card column gap-20">
        <div class="result-header">
          <strong>${h.edge||h.platform||(h.assets.length>0?`Asset CDN detected`:`No CDN detected`)}</strong>
          <strong>${h.confidence}%</strong>
        </div>

        <div class="column gap-20">
          ${r}
          ${t}
          ${i}
          ${n}
        </div>

        ${e?`<ul>${e}</ul>`:`<span class="muted">No clear CDN evidence found</span>`}
      </div>
    `}e.innerHTML=x}function r(e){switch(e){case`framework`:return`Framework`;case`library`:return`Library`;case`cms`:return`CMS`;default:return`Other`}}function i({hasFramework:e,hasCMS:t,hasLibrary:n}){let r=[];return!e&&!t?r.push(`No framework or CMS detected`):(e||r.push(`No frontend framework detected`),t||r.push(`No CMS detected`)),!n&&!e&&!t&&r.push(`No major frontend libraries detected`),r}function a(e,t,n){return t.length?`
    <div class="insight-group ${n}">
      <strong>${e}</strong>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `:``}function o(e,t,n){return t.length?`
    <div class="insight-group ${n}">
      <strong>${e}</strong>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `:``}function s(e){switch(e){case`SSR`:return`Server-side Rendering (SSR)`;case`SSG`:return`Static Site Generation (SSG)`;case`CSR`:return`Client-side Rendering (CSR)`;default:return`Unknown`}}function c(e){try{return e.split(`/`).pop().split(`?`)[0]}catch{return e}}function l(e,t=40){return e?e.length>t?e.slice(0,t)+`...`:e:``}function u(e){return e==null?``:e>=85?`good`:e>=60?`warning`:`critical`}function d(e,t){return e==null?``:e>=t.critical?`critical`:e>=t.warning?`warning`:`good`}function f(e){let t=0,r=setInterval(()=>{chrome.storage.local.get(`stackResults_${e}`,t=>{n(t[`stackResults_${e}`]||{})}),t++,t>=5&&clearInterval(r)},2e3)}