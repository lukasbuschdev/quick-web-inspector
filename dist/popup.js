(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`results`);chrome.tabs.query({active:!0,currentWindow:!0},e=>{let n=e[0];if(!n?.id){t({});return}chrome.storage.local.get(`stackResults_${n.id}`,e=>{t(e[`stackResults_${n.id}`]||{}),c(n.id)})});function t(t){let{primary:c,secondary:l,rendering:u,cdn:d,performance:f}=t||{},p=``,m=[];c&&m.push(c.type),l&&l.length>0&&l.forEach(e=>m.push(e.type));let h=r({hasFramework:m.includes(`framework`),hasCMS:m.includes(`cms`),hasLibrary:m.includes(`library`)});if(c){let e=(c.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),t=[...c.insights||[],...h].map(e=>`<li>${e}</li>`).join(``);p+=`<div class="result-section"><strong>Primary Technologies</strong></div>`,p+=`
      <div class="result-card primary column gap-20">
        <div class="result-header">
          <strong>[${n(c.type)}] ${c.name}</strong>
          <strong>${c.confidence}%</strong>
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
    `}if(l&&l.length>0&&(p+=`<div class="result-section"><strong>Secondary Technologies</strong></div>`,p+=l.map(e=>{let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),r=(e.insights||[]).map(e=>`<li>${e}</li>`).join(``);return`
          <div class="result-card column gap-20">
            <div class="result-header">
              <strong>[${n(e.type)}] ${e.name}</strong>
              <strong>${e.confidence}%</strong>
            </div>

            ${t?`<ul>${t}</ul>`:`<p class="muted">No direct evidence found</p>`}

            ${r?`
                <div class="insights column gap-20">
                  <strong>Analysis</strong>
                  <ul>${r}</ul>
                </div>
              `:``}
          </div>
        `}).join(``)),p||=`
      <div class="result-card column gap-20">
        <div class="result-header">
          <strong>Analysis</strong>
        </div>
        <span class="muted">
          No detectable technologies. This site likely uses server-side rendering,
          a custom framework, or heavily optimized production builds.
        </span>
      </div>
    `,u){let e=(u.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``);p+=`<div class="result-section"><strong>Rendering Strategy</strong></div>`,p+=`
    <div class="result-card column gap-20">
      <div class="result-header">
        <strong>${a(u.strategy)}</strong>
        <strong>${u.confidence}%</strong>
      </div>

      ${e?`<ul>${e}</ul>`:`<span class="muted">No clear rendering evidence found</span>`}
    </div>
  `}if(d){let e=(d.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),t=d.edge?`<span><strong>Edge:</strong> ${d.edge}</span>`:``,n=d.assets&&d.assets.length>0?`<span><strong>Assets:</strong> ${d.assets.join(`, `)}</span>`:``,r=d.source===`headers`?`<span><strong>Detected via:</strong> server headers</span>`:`<span><strong>Detected via:</strong> resource analysis</span>`,i=d.platform?`<span><strong>Platform:</strong> ${d.platform}</span>`:``;p+=`<div class="result-section"><strong>Delivery & Hosting</strong></div>`,p+=`
      <div class="result-card column gap-20">
        <div class="result-header">
          <strong>${d.edge||d.platform||(d.assets.length>0?`Asset CDN detected`:`No CDN detected`)}</strong>
          <strong>${d.confidence}%</strong>
        </div>

        <div class="column gap-20">
          ${r}
          ${t}
          ${i}
          ${n}
        </div>

        ${e?`<ul>${e}</ul>`:`<span class="muted">No clear CDN evidence found</span>`}
      </div>
    `}if(f&&f.data){let{coreWebVitals:e,bundleAnalysis:t,renderBlocking:n}=f.data,r=e?.lcp?`<span><strong>LCP:</strong> ${e.lcp.value} (${e.lcp.rating})</span>`:`<span class="muted"><strong>LCP:</strong> analyzing...</span>`,a=e?.cls?`<span><strong>CLS:</strong> ${e.cls.value} (${e.cls.rating})</span>`:`<span class="muted"><strong>CLS:</strong> analyzing...</span>`,c=t?.totalJSSize?`<span><strong>Total JS size:</strong> ${t.totalJSSize.value}</span>`:`<span class="muted">Total JS size: not available</span>`,l=t?.jsFileCount===void 0?`<span class="muted">JS files: not available</span>`:`<span><strong>JS files:</strong> ${t.jsFileCount}</span>`,u=t?.largestScript?`<span><strong>Largest script:</strong> ${s(o(t.largestScript.name))} (${t.largestScript.size})</span>`:`<span class="muted">Largest script: not available</span>`,d=n?`<span><strong>Blocking CSS:</strong> ${n.blockingCSS}</span>`:`<span class="muted">Blocking CSS: not available</span>`,m=n?`<span><strong>Sync scripts in head:</strong> ${n.syncScriptsInHead}</span>`:`<span class="muted">Sync scripts: not available</span>`,h={critical:[],warning:[],good:[]};(f.insights||[]).forEach(e=>{h[e.level]&&h[e.level].push(e.message)});let g=`
      ${i(`Critical Issues`,h.critical,`critical`)}
      ${i(`Warnings`,h.warning,`warning`)}
      ${i(`Good Signals`,h.good,`good`)}
    `;p+=`<div class="result-section"><strong>Performance</strong></div>`,p+=`
      <div class="result-card column gap-30">
        <div class="column gap-10">
          <span class="white"><strong>Core Web Vitals</strong></span>
          ${r}
          ${a}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Bundle Analysis</strong></span>
          ${c}
          ${l}
          ${u}
        </div>

        <div class="column gap-10">
          <span class="white"><strong>Render Blocking</strong></span>
          ${d}
          ${m}
        </div>

        ${g?`
              <div class="insights column gap-10">
                <strong>Analysis</strong>
                <ul>${g}</ul>
              </div>
            `:``}
      </div>
    `}e.innerHTML=p}function n(e){switch(e){case`framework`:return`Framework`;case`library`:return`Library`;case`cms`:return`CMS`;default:return`Other`}}function r({hasFramework:e,hasCMS:t,hasLibrary:n}){let r=[];return!e&&!t?r.push(`No framework or CMS detected`):(e||r.push(`No frontend framework detected`),t||r.push(`No CMS detected`)),!n&&!e&&!t&&r.push(`No major frontend libraries detected`),r}function i(e,t,n){return t.length?`
    <div class="insight-group ${n}">
      <strong>${e}</strong>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `:``}function a(e){switch(e){case`SSR`:return`Server-side Rendering (SSR)`;case`SSG`:return`Static Site Generation (SSG)`;case`CSR`:return`Client-side Rendering (CSR)`;default:return`Unknown`}}function o(e){try{return e.split(`/`).pop().split(`?`)[0]}catch{return e}}function s(e,t=40){return e?e.length>t?e.slice(0,t)+`...`:e:``}function c(e){let n=0,r=setInterval(()=>{chrome.storage.local.get(`stackResults_${e}`,n=>{t(n[`stackResults_${e}`]||{})}),n++,n>=15&&clearInterval(r)},1e3)}