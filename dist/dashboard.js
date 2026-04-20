import{a as e,c as t,i as n,n as r,o as i,r as a,s as o,t as s}from"./assets/technology-fallback-DZ6uqGjN.js";function c(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),r=e.edge||e.platform||(e.assets&&e.assets.length>0?`Asset CDN detected`:`No CDN detected`),i=e.source===`headers`?`server headers`:`resource analysis`;return`
    <div class="result-section"><strong>Delivery & Hosting</strong></div>
    <div class="result-card column gap-30">
      <div class="result-header">
        <span><strong>${r}</strong></span>
        <span class="metric ${n(e.confidence)}">
          ${e.confidence}%
        </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Details</span>

        ${l(`Detected via`,i)}
        ${e.edge?l(`Edge`,e.edge):``}
        ${e.platform?l(`Platform`,e.platform):``}
        ${e.assets&&e.assets.length>0?l(`Assets`,e.assets.join(`, `)):``}

      </div>

      <div class="metric-block">
        <span class="block-title">Evidence</span>
        ${t?`<ul>${t}</ul>`:`<span class="muted">No clear CDN evidence found</span>`}
      </div>
    </div>
  `}function l(e,t){return`
    <div class="metric-row">
      <span>${e}</span>
      <span class="white">${t}</span>
    </div>
  `}function u(t){if(!t||!t.data)return`
      <div class="result-section"><strong>Interaction Performance</strong></div>
      <div class="result-card column gap-30">
        <span class="muted">No interaction performance data available</span>
      </div>
    `;let n=t.data,i=`
    ${d(`Passive animations`,n.passiveAnimationCount,`passiveAnimationCount`,n)}
    ${d(`Interaction animations`,n.interactionAnimationCount,`interactionAnimationCount`,n)}
    ${d(`Light interaction animations`,n.cheapInteractionCount,`cheapInteractionCount`,n)}
    ${d(`Heavy interaction animations`,n.heavyInteractionCount,`heavyInteractionCount`,n)}
    ${d(`Expensive passive animations`,n.expensivePassiveAnimationCount,`expensivePassiveAnimationCount`,n)}
    ${d(`Expensive interaction animations`,n.expensiveInteractionAnimationCount,`expensiveInteractionAnimationCount`,n)}
    ${d(`Fixed elements`,n.fixedCount,`fixedCount`,n)}
    ${d(`Hover rules`,n.hoverRules,`hoverRules`,n)}
    ${d(`Box shadows`,n.boxShadowCount,`boxShadowCount`,n)}
    ${d(`Filters`,n.filterCount,`filterCount`,n)}
    ${d(`Backdrop filters`,n.backdropFilterCount,`backdropFilterCount`,n)}
    ${d(`Gradients`,n.gradientCount,`gradientCount`,n)}
    ${d(`Layout-triggering animations`,n.layoutAnimationCount,`layoutAnimationCount`,n)}
    ${d(`GPU-friendly animations`,n.gpuFriendlyAnimationCount,null,null)}
    ${d(`Reduced motion`,n.hasReducedMotionSupport?`supported`:`not supported`,null,null,!n.hasReducedMotionSupport)}
    ${d(`JS-driven animations`,n.jsAnimationActivity?.detected?f(n.jsAnimationActivity):`none`,`jsAnimationActivity`,n)}
  `,a={critical:[],warning:[],good:[]};(t.insights||[]).forEach(e=>{a[e.level]&&a[e.level].push(e.message)});let o=a.critical.length+a.warning.length,s=`
    ${r(`Critical Issues`,a.critical,`critical`)}
    ${r(`Warnings`,a.warning,`warning`)}
    ${r(`Good Signals`,a.good,`good`)}
  `;return`
    <div class="result-section"><strong>Interaction Performance</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${d(`Score`,t.score??`N/A`,e(t.score))}
        ${d(`Issues`,o,o>0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Motion & Complexity</span>
        ${i}
      </div>

      ${s.trim()?`
            <div class="insights column gap-10">
              <span class="block-title mt-15"><strong>Analysis</strong></span>
              ${s}
            </div>
          `:`
            <span class="muted">
              No major interaction or animation issues detected
            </span>
          `}
    </div>
  `}function d(e,t,n=null,r=null,i=!1){let a=`good`;return i?a=`critical`:n&&r?a=p(r)[n]||`white`:typeof n==`string`&&!r&&(a=n),`
    <div class="metric-row">
      <span>${e}</span>
      <span class="metric ${a}">${t}</span>
    </div>
  `}function f(e){let{level:t,svgMotionChanges:n=0,styleChanges:r=0}=e;return t===`low`?`low activity (minimal runtime updates)`:t===`medium`?n>r?`moderate activity (mostly visual animations)`:`moderate activity (includes layout/style updates)`:t===`high`?`high activity (frequent runtime updates)`:`unknown`}function p(e){let{passiveAnimationCount:t=0,interactionAnimationCount:n=0,expensivePassiveAnimationCount:r=0,expensiveInteractionAnimationCount:i=0,cheapInteractionCount:a=0,heavyInteractionCount:o=0,fixedCount:s=0,hoverRules:c=0,boxShadowCount:l=0,filterCount:u=0,backdropFilterCount:d=0,gradientCount:f=0,layoutAnimationCount:p=0,jsAnimationActivity:m=null}=e;return{passiveAnimationCount:t>=6?`critical`:t>=3?`warning`:`good`,interactionAnimationCount:n>=40?`warning`:`good`,heavyInteractionCount:o>=20?`critical`:o>=10?`warning`:`good`,cheapInteractionCount:o===0&&a>=10?`good`:`neutral`,expensivePassiveAnimationCount:r>=3?`critical`:r>=1?`warning`:`good`,expensiveInteractionAnimationCount:i>=10?`critical`:i>=4?`warning`:`good`,fixedCount:s>=10?`critical`:s>=5?`warning`:`good`,hoverRules:c>=25?`critical`:c>=10?`warning`:`good`,boxShadowCount:l>=40?`critical`:l>=15?`warning`:`good`,filterCount:u>=10?`critical`:u>=3?`warning`:`good`,backdropFilterCount:d>=5?`critical`:d>=1?`warning`:`good`,gradientCount:f>=50?`critical`:f>=20?`warning`:`good`,layoutAnimationCount:p>=10?`critical`:p>=2?`warning`:`good`,jsAnimationActivity:m?.level===`high`||m?.level===`medium`?`warning`:`good`}}function m(n){let{coreWebVitals:i,bundleAnalysis:a,renderBlocking:o}=n.data,s=a?.imageMetrics,c=i?.lcp?h(`LCP`,i.lcp.value,g(i.lcp.raw),`(${i.lcp.rating})`):h(`LCP`,`analyzing...`,``,``,!0),l=i?.cls?h(`CLS`,i.cls.value,_(i.cls.raw),`(${i.cls.rating})`):h(`CLS`,`analyzing...`,``,``,!0),u=a?.totalJSSize?h(`Total JS size`,a.totalJSSize.value,v(a.totalJSSize.raw)):h(`Total JS size`,`not available`,``,``,!0),d=a?.jsFileCount===void 0?h(`JS files`,`not available`,``,``,!0):h(`JS files`,a.jsFileCount,y(a.jsFileCount)),f=a?.largestScript?h(`Largest script`,`${t(E(a?.largestScript?.name))} (${a.largestScript.size})`):h(`Largest script`,`not available`,``,``,!0),p=o?h(`Blocking CSS`,o.blockingCSS,b(o.blockingCSS)):h(`Blocking CSS`,`not available`,``,``,!0),m=o?h(`Sync scripts in head`,o.syncScriptsInHead,x(o.syncScriptsInHead)):h(`Sync scripts`,`not available`,``,``,!0),D=s?.imageCount===void 0?h(`Images`,`not available`,``,``,!0):h(`Images`,s.imageCount,w(s.imageCount)),O=s?.totalImageSize?h(`Total image size`,T(s.totalImageSize),S(s.totalImageSize)):h(`Total image size`,`not available`,``,``,!0),k=s?.largestImage?h(`Largest image`,`${t(E(s.largestImage.name))} (${T(s.largestImage.size)})`,C(s.largestImage.size)):h(`Largest image`,`not available`,``,``,!0),A={critical:[],warning:[],good:[]};(n.insights||[]).forEach(e=>{A[e.level]&&A[e.level].push(e.message)});let j=A.critical.length+A.warning.length,M=`
    ${r(`Critical Issues`,A.critical,`critical`)}
    ${r(`Warnings`,A.warning,`warning`)}
    ${r(`Good Signals`,A.good,`good`)}
  `;return`
    <div class="result-section"><strong>Loading Performance</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${h(`Score`,n.score??`N/A`,e(n.score))}
        ${h(`Issues`,j,j>0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Core Web Vitals</span>
        ${c}
        ${l}
      </div>

      <div class="metric-block">
        <span class="block-title">JavaScript Analysis</span>
        ${u}
        ${d}
        ${f}
      </div>

      <div class="metric-block">
        <span class="block-title">Render Blocking</span>
        ${p}
        ${m}
      </div>

      <div class="metric-block">
        <span class="block-title">Image Analysis</span>
        ${D}
        ${O}
        ${k}
      </div>

      ${M.trim()?`
          <div class="insights column gap-10">
            <span class="block-title mt-15"><strong>Analysis</strong></span>
            ${M}
          </div>
        `:``}
    </div>
  `}function h(e,t,n=``,r=``,i=!1){return`
    <div class="metric-row">
      <span class="${i?`muted`:``}">${e}</span>
      <span class="${i?`muted`:`metric ${n}`}">
        ${t} ${r||``}
      </span>
    </div>
  `}function g(e){if(e==null)return``;let t=e/1e3;return t<=1.8?`good`:t<=3?`warning`:`critical`}function _(e){return e==null?``:e<=.1?`good`:e<=.25?`warning`:`critical`}function v(e){if(e==null)return``;let t=e/1024;return t<150?`good`:t<400?`warning`:`critical`}function y(e){return e<10?`good`:e<25?`warning`:`critical`}function b(e){return e===0?`good`:e<=2?`warning`:`critical`}function x(e){return e===0?`good`:e<=2?`warning`:`critical`}function S(e){if(e==null)return``;let t=e/1024;return t<800?`good`:t<1500?`warning`:`critical`}function C(e){if(e==null)return``;let t=e/1024;return t<200?`good`:t<400?`warning`:`critical`}function w(e){return e<20?`good`:e<50?`warning`:`critical`}function T(e){if(!e||e===0)return`0 KB`;let t=e/1024;return t<1024?`${t.toFixed(1)} KB`:`${(t/1024).toFixed(2)} MB`}function E(e){try{return e.split(`/`).pop().split(`?`)[0]}catch{return e}}function D(e,t){let r=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),i=[...e.insights||[],...t].map(e=>`<li>${e}</li>`).join(``);return`
    <div class="result-section"><strong>Primary Technology</strong></div>
    <div class="result-card column gap-30">
      <div class="result-header">
        <span>
          <strong>[${a(e.type)}]</strong>
          ${e.name}
        </span>
        <span class="metric ${n(e.confidence)}">
          ${e.confidence}%
        </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Evidence</span>

        ${r?`<ul>${r}</ul>`:`<span class="muted">No direct evidence found</span>`}
      </div>

      ${i?`
          <div class="insights column gap-10">
            <span class="block-title mt-15"><strong>Analysis</strong></span>
            <ul>${i}</ul>
          </div>
        `:``}
    </div>
  `}function O(){return`
    <div class="result-section"><strong>Primary Technology</strong></div>
    <div class="result-card column gap-20">
      <span class="muted">
        No primary technology detected. No dominant technology detected.<br>
        This may indicate static HTML, server-rendered content, or a highly optimized setup.
      </span>
    </div>
  `}function k(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``);return`
    <div class="result-section"><strong>Rendering Strategy</strong></div>
    <div class="result-card column gap-30">
      <div class="result-header">
        <span>
          <strong>${A(e.strategy)}</strong>
        </span>
        <span class="metric ${n(e.confidence)}">
          ${e.confidence}%
        </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Evidence</span>
        ${t?`<ul>${t}</ul>`:`<span class="muted">No clear rendering evidence found</span>`}
      </div>
    </div>
  `}function A(e){switch(e){case`SSR`:return`Server-side Rendering (SSR)`;case`SSG`:return`Static Site Generation (SSG)`;case`CSR`:return`Client-side Rendering (CSR)`;default:return`Unknown`}}function j(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),r=(e.insights||[]).map(e=>`<li>${e}</li>`).join(``);return`
    <div class="result-card column gap-30">
      <div class="result-header">
        <span>
          <strong>[${a(e.type)}]</strong>
          ${e.name}
        </span>
        <span class="metric ${n(e.confidence)}">
          ${e.confidence}%
        </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Evidence</span>
        ${t?`<ul>${t}</ul>`:`<span class="muted">No direct evidence found</span>`}
      </div>

      ${r?`
          <div class="insights column gap-10">
            <span class="block-title"><strong>Analysis</strong></span>
            <ul>${r}</ul>
          </div>
        `:``}
    </div>
  `}function M(){return`
    <div class="result-card column gap-20">
      <span class="muted">
        No additional technologies detected. This may indicate a minimal or highly optimized setup.
      </span>
    </div>
  `}function N(n){let{title:r,description:i,canonical:a,lang:s,headings:c,images:l,meta:u}=n.data,d={critical:[],warning:[],good:[]};(n.insights||[]).forEach(e=>{d[e.level]&&d[e.level].push(e.message)});let f=d.critical.length+d.warning.length,p=`
    ${P(`Critical Issues`,d.critical,`critical`)}
    ${P(`Warnings`,d.warning,`warning`)}
    ${P(`Good Signals`,d.good,`good`)}
  `,m=c?.h1??0;return`
    <div class="result-section"><strong>SEO</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${o(`Score`,n.score??`N/A`,e(n.score))}
        ${o(`Issues`,f,f>0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Structure</span>
        ${o(`Title`,r?t(r,50):`missing`,r?`good`:`critical`)}
        ${o(`Description`,i?t(i,70):`missing`,i?`good`:`critical`)}
        ${o(`Lang`,s??`missing`,s?`good`:`warning`)}
        ${o(`Canonical`,a?`set`:`missing`,a?`good`:`warning`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Headings & Content</span>
        ${o(`H1`,m,m===1?`good`:m===0?`critical`:`warning`)}
        ${o(`H2`,c?.h2??0,`good`)}
        ${o(`Images`,`${l?.total??0} (${l?.missingAlt??0} missing alt)`,(l?.missingAlt??0)>0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Meta & Social</span>
        ${o(`Viewport`,u?.viewport?`set`:`missing`,u?.viewport?`good`:`critical`)}
        ${o(`Open Graph`,u?.openGraph??0,(u?.openGraph??0)>0?`good`:`warning`)}
        ${o(`Twitter`,u?.twitter??0,(u?.twitter??0)>0?`good`:`warning`)}
        ${o(`Robots`,u?.robots||`index`,u?.robots?.includes(`noindex`)?`critical`:`good`)}
        ${o(`Structured Data`,u?.structuredData??0,(u?.structuredData??0)===0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Linking</span>
        ${o(`Internal Links`,n.data.links?.internal??0,(n.data.links?.internal??0)<3?`warning`:`good`)}
        ${o(`External Links`,n.data.links?.external??0,(n.data.links?.external??0)===0?`warning`:`good`)}
      </div>

      ${p.trim()?`
          <div class="insights column gap-10">
            <span class="block-title"><strong>SEO Analysis</strong></span>
            ${p}
          </div>
        `:``}
    </div>
  `}function P(e,t,n){return t.length?`
    <div class="insight-group ${n}">
      <span class="block-title mt-15"><strong>${e}</strong></span>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `:``}function F(t){let{loadingPerformanceScore:n,interactionPerformanceScore:r,seoScore:i,accessibilityScore:a,overallScore:o,topIssues:s}=t,c={critical:2,warning:1},l=(s||[]).sort((e,t)=>c[t.level]-c[e.level]).slice(0,3).map(e=>`
        <li>
          <span class="${e.level}">[${e.source}]</span>
          ${e.message}
        </li>
      `).join(``);return`
    <div class="result-section"><strong>Summary</strong></div>

    <div class="result-card summary column gap-20">
      <div class="summary-score">
        <div class="row gap-10 align-center">
          <strong>Overall Score</strong>
          <span class="info-tooltip">
            ⓘ
            <span class="tooltip-content">
              Overall score based on weighted metrics.
              <br><br>
              <ul>
                <li>Loading (50%)</li>
                <li>Interaction (25%)</li>
                <li>SEO (15%)</li>
                <li>Accessibility (10%)</li>
              </ul>
              <br><br>
              Prioritizes real user experience over technical completeness.
            </span>
          </span>
        </div>
        <div class="row gap-5">
          <span class="score ${e(o)}">${o??`N/A`}</span>
          <span class="white">/ 100</span>
        </div>
      </div>

      <div class="summary-breakdown">
        <div class="row">
          <span class="muted">Loading Performance</span>
          <div class="row gap-5">
            <span class="score ${e(n)}">
              ${n??`N/A`}
            </span>
            <span>/ 100</span>
          </div>
        </div>

        <div class="row">
          <span class="muted">Interaction Performance</span>
          <div class="row gap-5">
            <span class="score ${e(r)}">
              ${r??`N/A`}
            </span>
            <span>/ 100</span>
          </div>
        </div>

        <div class="row">
          <span class="muted">SEO</span>
          <div class="row gap-5">
            <span class="score ${e(i)}">
              ${i??`N/A`}
            </span>
            <span>/ 100</span>
          </div>
        </div>

        <div class="row">
          <span class="muted">Accessibility</span>
          <div class="row gap-5">
            <span class="score ${e(a)}">
              ${a??`N/A`}
            </span>
            <span>/ 100</span>
          </div>
        </div>
      </div>

      ${l?`
        <div class="insights column gap-10">
          <span class="block-title mt-15"><strong>Top Issues</strong></span>
          <ul>${l}</ul>
        </div>
      `:``}
    </div>
  `}function I(e,t){let n=[];return e&&n.push(e.type),t?.length&&t.forEach(e=>n.push(e.type)),{categoryInsights:L({hasFramework:n.includes(`framework`),hasCMS:n.includes(`cms`),hasLibrary:n.includes(`library`)})}}function L({hasFramework:e,hasCMS:t,hasLibrary:n}){let r=[];return!e&&!t?r.push(`No framework or CMS detected`):(e||r.push(`No frontend framework detected`),t||r.push(`No CMS detected`)),!n&&!e&&!t&&r.push(`No major frontend libraries detected`),r}function R(t){let n=t.insights||[],r={critical:[],warning:[],info:[]};n.forEach(e=>{r[e.level]&&r[e.level].push(e.message)});let i=r.critical.length+r.warning.length,a=`
    ${z(`Critical Issues`,r.critical,`critical`)}
    ${z(`Warnings`,r.warning,`warning`)}
    ${z(`Info`,r.info,`info`)}
  `;return`
    <div class="result-section"><strong>Accessibility</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${o(`Score`,t.score??`N/A`,e(t.score))}
        ${o(`Issues`,i,i>0?`warning`:`good`)}
      </div>

      ${i>0||t.showGoodSignals?`
            <div class="insights column gap-10">
              <span class="block-title"><strong>Accessibility Analysis</strong></span>
              ${a}
            </div>
          `:`
            <div class="insights column gap-10">
              <span class="block-title"><strong>Accessibility Analysis</strong></span>
              <span class="good">✓ No accessibility issues detected</span>
              <span class="muted">Basic accessibility checks passed. Consider manual testing for advanced scenarios like screen reader support and focus behavior.</span>
            </div>
          `}
    </div>
  `}function z(e,t,n){return t.length?`
    <div class="insight-group ${n}">
      <span class="block-title mt-15"><strong>${e}</strong></span>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `:``}var B=document.getElementById(`dashboard-results`),V=new URLSearchParams(window.location.search).get(`tabId`);V?chrome.storage.local.get(`stackResults_${V}`,e=>{H(e[`stackResults_${V}`]||{}),i(V,H)}):B.innerHTML=`<span>No data available</span>`;function H(e){let{primary:t,secondary:n,rendering:r,cdn:i,performance:a,seo:o,accessibility:l,summary:d}=e||{},{categoryInsights:f}=I(t||null,n||[]),p=a?.loading||null,h=a?.interaction||null,g=``;d&&(g+=F(d)),p&&(g+=m(p)),h&&(g+=u(h)),o&&o.data&&(g+=N(o)),l&&(g+=R(l)),t?g+=D(t,f):g+=O(),n&&n.length?g+=`
          <div class="result-section"><strong>Secondary Technologies</strong></div>
          ${n.map(j).join(``)}
      `:n&&(g+=`
          <div class="result-section"><strong>Secondary Technologies</strong></div>
          ${M()}
      `),r&&(g+=k(r)),i&&(g+=c(i)),g||=s(),B.innerHTML=g}