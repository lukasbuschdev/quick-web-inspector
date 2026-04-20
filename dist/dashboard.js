import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./assets/technology-fallback-D1ddy1eH.js";function l(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),r=e.edge||e.platform||(e.assets&&e.assets.length>0?`Asset CDN detected`:`No CDN detected`),i=e.source===`headers`?`server headers (high confidence)`:`resource analysis`;return`
    <div class="result-section"><strong>CDN & Hosting</strong></div>
    <div class="result-card column gap-30">
      <div class="result-header">
        <span><strong>${r}</strong></span>
          <span class="metric ${n(e.confidence)}">
            ${f(e)}
          </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Details</span>
        ${u(`Detected via`,i)}
        ${e.edge?u(`Edge`,e.edge):``}
        ${e.platform?u(`Platform`,e.platform):``}
        ${e.assets&&e.assets.length>0?u(`Assets`,e.assets.join(`, `)):``}
      </div>

      <div class="metric-block">
        <span class="block-title">Evidence</span>
        ${t?`<ul>${t}</ul>`:`<span class="muted">No clear CDN evidence found</span>`}
      </div>
    </div>
  `}function u(e,t){return`
    <div class="metric-row">
      <span>${e}</span>
      <span class="white">${t}</span>
    </div>
  `}function d(t){let{confidence:n=0,evidence:r=[],source:i}=t;return n<20?``:i===`headers`?`Proven (${n}%)`:`${e(n,r)} (${n}%)`}function f(e){let t=d(e);return t?`
    <span class="metric ${n(e.confidence)}">
      ${t}
    </span>
  `:``}function p(e){if(!e||!e.data)return`
      <div class="result-section"><strong>Interaction Performance</strong></div>
      <div class="result-card column gap-30">
        <span class="muted">No interaction performance data available</span>
      </div>
    `;let t=e.data,n=`
    ${m(`Passive animations`,t.passiveAnimationCount,`passiveAnimationCount`,t)}
    ${m(`Interaction animations`,t.interactionAnimationCount,`interactionAnimationCount`,t)}
    ${m(`Light interaction animations`,t.cheapInteractionCount,`cheapInteractionCount`,t)}
    ${m(`Heavy interaction animations`,t.heavyInteractionCount,`heavyInteractionCount`,t)}
    ${m(`Expensive passive animations`,t.expensivePassiveAnimationCount,`expensivePassiveAnimationCount`,t)}
    ${m(`Expensive interaction animations`,t.expensiveInteractionAnimationCount,`expensiveInteractionAnimationCount`,t)}
    ${m(`Fixed elements`,t.fixedCount,`fixedCount`,t)}
    ${m(`Hover rules`,t.hoverRules,`hoverRules`,t)}
    ${m(`Box shadows`,t.boxShadowCount,`boxShadowCount`,t)}
    ${m(`Filters`,t.filterCount,`filterCount`,t)}
    ${m(`Backdrop filters`,t.backdropFilterCount,`backdropFilterCount`,t)}
    ${m(`Gradients`,t.gradientCount,`gradientCount`,t)}
    ${m(`Layout-triggering animations`,t.layoutAnimationCount,`layoutAnimationCount`,t)}
    ${m(`GPU-friendly animations`,t.gpuFriendlyAnimationCount,null,null)}
    ${m(`Reduced motion`,t.hasReducedMotionSupport?`supported`:`not supported`,null,null,!t.hasReducedMotionSupport)}
    ${m(`JS-driven animations`,t.jsAnimationActivity?.detected?h(t.jsAnimationActivity):`none`,`jsAnimationActivity`,t)}
  `,r={critical:[],warning:[],good:[]};(e.insights||[]).forEach(e=>{r[e.level]&&r[e.level].push(e.message)});let o=r.critical.length+r.warning.length,s=`
    ${i(`Critical Issues`,r.critical,`critical`)}
    ${i(`Warnings`,r.warning,`warning`)}
    ${i(`Good Signals`,r.good,`good`)}
  `;return`
    <div class="result-section"><strong>Interaction Performance</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${m(`Score`,e.score??`N/A`,a(e.score))}
        ${m(`Issues`,o,o>0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Motion & Complexity</span>
        ${n}
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
  `}function m(e,t,n=null,r=null,i=!1){let a=`good`;return i?a=`critical`:n&&r?a=g(r)[n]||`white`:typeof n==`string`&&!r&&(a=n),`
    <div class="metric-row">
      <span>${e}</span>
      <span class="metric ${a}">${t}</span>
    </div>
  `}function h(e){let{level:t,svgMotionChanges:n=0,styleChanges:r=0}=e;return t===`low`?`low activity (minimal runtime updates)`:t===`medium`?n>r?`moderate activity (mostly visual animations)`:`moderate activity (includes layout/style updates)`:t===`high`?`high activity (frequent runtime updates)`:`unknown`}function g(e){let{passiveAnimationCount:t=0,interactionAnimationCount:n=0,expensivePassiveAnimationCount:r=0,expensiveInteractionAnimationCount:i=0,cheapInteractionCount:a=0,heavyInteractionCount:o=0,fixedCount:s=0,hoverRules:c=0,boxShadowCount:l=0,filterCount:u=0,backdropFilterCount:d=0,gradientCount:f=0,layoutAnimationCount:p=0,jsAnimationActivity:m=null}=e;return{passiveAnimationCount:t>=6?`critical`:t>=3?`warning`:`good`,interactionAnimationCount:n>=40?`warning`:`good`,heavyInteractionCount:o>=20?`critical`:o>=10?`warning`:`good`,cheapInteractionCount:o===0&&a>=10?`good`:`neutral`,expensivePassiveAnimationCount:r>=3?`critical`:r>=1?`warning`:`good`,expensiveInteractionAnimationCount:i>=10?`critical`:i>=4?`warning`:`good`,fixedCount:s>=10?`critical`:s>=5?`warning`:`good`,hoverRules:c>=25?`critical`:c>=10?`warning`:`good`,boxShadowCount:l>=40?`critical`:l>=15?`warning`:`good`,filterCount:u>=10?`critical`:u>=3?`warning`:`good`,backdropFilterCount:d>=5?`critical`:d>=1?`warning`:`good`,gradientCount:f>=50?`critical`:f>=20?`warning`:`good`,layoutAnimationCount:p>=10?`critical`:p>=2?`warning`:`good`,jsAnimationActivity:m?.level===`high`||m?.level===`medium`?`warning`:`good`}}function _(e){let{coreWebVitals:t,bundleAnalysis:n,renderBlocking:o}=e.data,s=n?.imageMetrics,c=t?.lcp?v(`LCP`,t.lcp.value,y(t.lcp.raw),`(${t.lcp.rating})`):v(`LCP`,`analyzing...`,``,``,!0),l=t?.cls?v(`CLS`,t.cls.value,b(t.cls.raw),`(${t.cls.rating})`):v(`CLS`,`analyzing...`,``,``,!0),u=n?.totalJSSize?v(`Total JS size`,n.totalJSSize.value,x(n.totalJSSize.raw)):v(`Total JS size`,`not available`,``,``,!0),d=n?.jsFileCount===void 0?v(`JS files`,`not available`,``,``,!0):v(`JS files`,n.jsFileCount,S(n.jsFileCount)),f=n?.largestScript?v(`Largest script`,`${r(k(n?.largestScript?.name))} (${n.largestScript.size})`):v(`Largest script`,`not available`,``,``,!0),p=o?v(`Blocking CSS`,o.blockingCSS,C(o.blockingCSS)):v(`Blocking CSS`,`not available`,``,``,!0),m=o?v(`Sync scripts in head`,o.syncScriptsInHead,w(o.syncScriptsInHead)):v(`Sync scripts`,`not available`,``,``,!0),h=s?.imageCount===void 0?v(`Images`,`not available`,``,``,!0):v(`Images`,s.imageCount,D(s.imageCount)),g=s?.totalImageSize?v(`Total image size`,O(s.totalImageSize),T(s.totalImageSize)):v(`Total image size`,`not available`,``,``,!0),_=s?.largestImage?v(`Largest image`,`${r(k(s.largestImage.name))} (${O(s.largestImage.size)})`,E(s.largestImage.size)):v(`Largest image`,`not available`,``,``,!0),A={critical:[],warning:[],good:[]};(e.insights||[]).forEach(e=>{A[e.level]&&A[e.level].push(e.message)});let j=A.critical.length+A.warning.length,M=`
    ${i(`Critical Issues`,A.critical,`critical`)}
    ${i(`Warnings`,A.warning,`warning`)}
    ${i(`Good Signals`,A.good,`good`)}
  `;return`
    <div class="result-section"><strong>Loading Performance</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${v(`Score`,e.score??`N/A`,a(e.score))}
        ${v(`Issues`,j,j>0?`warning`:`good`)}
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
        ${h}
        ${g}
        ${_}
      </div>

      ${M.trim()?`
          <div class="insights column gap-10">
            <span class="block-title mt-15"><strong>Analysis</strong></span>
            ${M}
          </div>
        `:``}
    </div>
  `}function v(e,t,n=``,r=``,i=!1){return`
    <div class="metric-row">
      <span class="${i?`muted`:``}">${e}</span>
      <span class="${i?`muted`:`metric ${n}`}">
        ${t} ${r||``}
      </span>
    </div>
  `}function y(e){if(e==null)return``;let t=e/1e3;return t<=1.8?`good`:t<=3?`warning`:`critical`}function b(e){return e==null?``:e<=.1?`good`:e<=.25?`warning`:`critical`}function x(e){if(e==null)return``;let t=e/1024;return t<150?`good`:t<400?`warning`:`critical`}function S(e){return e<10?`good`:e<25?`warning`:`critical`}function C(e){return e===0?`good`:e<=2?`warning`:`critical`}function w(e){return e===0?`good`:e<=2?`warning`:`critical`}function T(e){if(e==null)return``;let t=e/1024;return t<800?`good`:t<1500?`warning`:`critical`}function E(e){if(e==null)return``;let t=e/1024;return t<200?`good`:t<400?`warning`:`critical`}function D(e){return e<20?`good`:e<50?`warning`:`critical`}function O(e){if(!e||e===0)return`0 KB`;let t=e/1024;return t<1024?`${t.toFixed(1)} KB`:`${(t/1024).toFixed(2)} MB`}function k(e){try{return e.split(`/`).pop().split(`?`)[0]}catch{return e}}function A(t,r){let i=(t.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),a=[...t.insights||[],...r].map(e=>`<li>${e}</li>`).join(``);return`
    <div class="result-section"><strong>Primary Technology</strong></div>
    <div class="result-card column gap-30">
      <div class="result-header">
        <span>
          <strong>[${o(t.type)}]</strong>
          ${t.name}
        </span>
        <span class="metric ${n(t.confidence)}">
          ${e(t.confidence,t.evidence)} (${t.confidence}%)
        </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Evidence</span>

        ${i?`<ul>${i}</ul>`:`<span class="muted">No direct evidence found</span>`}
      </div>

      ${a?`
          <div class="insights column gap-10">
            <span class="block-title mt-15"><strong>Analysis</strong></span>
            <ul>${a}</ul>
          </div>
        `:``}
    </div>
  `}function j(){return`
    <div class="result-section"><strong>Primary Technology</strong></div>
    <div class="result-card column gap-20">
      <span class="muted">
        No primary technology detected. No dominant technology detected.<br>
        This may indicate static HTML, server-rendered content, or a highly optimized setup.
      </span>
    </div>
  `}function M(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``);return`
    <div class="result-section"><strong>Rendering Strategy</strong></div>
    <div class="result-card column gap-30">
      <div class="result-header align-start">
        <div class="column gap-10">
          <span><strong>${P(e.strategy)}</strong><br></span>
          <span class="rendering-hint">${F(e.strategy)}</span>
        </div>
        <span class="metric ${n(e.confidence)}">
          ${I(e)}
        </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Evidence</span>
        ${t?`<ul>${t}</ul>`:`<span class="muted">No clear rendering evidence found</span>`}
      </div>
    </div>
  `}function N(){return`
    <div class="result-section"><strong>Rendering Strategy</strong></div>
    <div class="result-card column gap-20">
      <div class="metric-block">
        <span class="muted">
          No clear rendering pattern detected. This can occur with hybrid setups,
          static delivery, or optimized builds where rendering behavior is less visible.
        </span>
      </div>
    </div>
  `}function P(e){switch(e){case`SSR`:return`Server-side Rendering (SSR)`;case`SSG`:return`Static Site Generation (SSG)`;case`CSR`:return`Client-side Rendering (CSR)`;default:return`Unknown`}}function F(e){switch(e){case`SSR`:return`Content is rendered on the server before being sent to the client.`;case`SSG`:return`Content is pre-generated at build time and served statically.`;case`CSR`:return`Content is rendered in the browser using JavaScript.`;default:return``}}function I(t){let{confidence:n=0,evidence:r=[]}=t;return`${e(n,r)} (${n}%)`}function L(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),r=(e.insights||[]).map(e=>`<li>${e}</li>`).join(``);return`
    <div class="result-card column gap-30">
      <div class="result-header">
        <span>
          <strong>[${o(e.type)}]</strong>
          ${e.name}
        </span>
        <span class="metric ${n(e.confidence)}">
          ${z(e)}
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
  `}function R(){return`
    <div class="result-card column gap-20">
      <span class="muted">
        No additional technologies detected. This may indicate a minimal or highly optimized setup.
      </span>
    </div>
  `}function z(t){let{confidence:n=0,evidence:r=[]}=t;if(n<20)return`<span class="muted">Weak signal</span>`;let i=e(n,r);return`${i===`Proven`?`Detected`:i===`Very likely`?`Strong signal`:i===`Likely`?`Likely`:i===`Plausible`?`Possible`:`Weak signal`} (${n}%)`}function B(e){let{title:n,description:i,canonical:o,lang:s,headings:c,images:l,meta:u}=e.data,d={critical:[],warning:[],good:[]};(e.insights||[]).forEach(e=>{d[e.level]&&d[e.level].push(e.message)});let f=d.critical.length+d.warning.length,p=`
    ${V(`Critical Issues`,d.critical,`critical`)}
    ${V(`Warnings`,d.warning,`warning`)}
    ${V(`Good Signals`,d.good,`good`)}
  `,m=c?.h1??0;return`
    <div class="result-section"><strong>SEO</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${t(`Score`,e.score??`N/A`,a(e.score))}
        ${t(`Issues`,f,f>0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Structure</span>
        ${t(`Title`,n?r(n,50):`missing`,n?`good`:`critical`)}
        ${t(`Description`,i?r(i,70):`missing`,i?`good`:`critical`)}
        ${t(`Lang`,s??`missing`,s?`good`:`warning`)}
        ${t(`Canonical`,o?`set`:`missing`,o?`good`:`warning`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Headings & Content</span>
        ${t(`H1`,m,m===1?`good`:m===0?`critical`:`warning`)}
        ${t(`H2`,c?.h2??0,`good`)}
        ${t(`Images`,`${l?.total??0} (${l?.missingAlt??0} missing alt)`,(l?.missingAlt??0)>0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Meta & Social</span>
        ${t(`Viewport`,u?.viewport?`set`:`missing`,u?.viewport?`good`:`critical`)}
        ${t(`Open Graph`,u?.openGraph??0,(u?.openGraph??0)>0?`good`:`warning`)}
        ${t(`Twitter`,u?.twitter??0,(u?.twitter??0)>0?`good`:`warning`)}
        ${t(`Robots`,u?.robots||`index`,u?.robots?.includes(`noindex`)?`critical`:`good`)}
        ${t(`Structured Data`,u?.structuredData??0,(u?.structuredData??0)===0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Linking</span>
        ${t(`Internal Links`,e.data.links?.internal??0,(e.data.links?.internal??0)<3?`warning`:`good`)}
        ${t(`External Links`,e.data.links?.external??0,(e.data.links?.external??0)===0?`warning`:`good`)}
      </div>

      ${p.trim()?`
          <div class="insights column gap-10">
            <span class="block-title"><strong>SEO Analysis</strong></span>
            ${p}
          </div>
        `:``}
    </div>
  `}function V(e,t,n){return t.length?`
    <div class="insight-group ${n}">
      <span class="block-title mt-15"><strong>${e}</strong></span>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `:``}function H(e){let{loadingPerformanceScore:t,interactionPerformanceScore:n,seoScore:r,accessibilityScore:i,overallScore:o,topIssues:s,allInsights:c=[]}=e||{},l={critical:2,warning:1},u=(s||[]).sort((e,t)=>l[t.level]-l[e.level]).slice(0,3).map(e=>`
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
          <span class="score ${a(o)}">${o??`N/A`}</span>
          <span class="white">/ 100</span>
        </div>
      </div>

      <div class="summary-breakdown">
        <div class="row">
          <span class="muted">Loading Performance</span>
          <div class="row gap-5">
            <span class="score ${a(t)}">
              ${t??`N/A`}
            </span>
            <span>/ 100</span>
          </div>
        </div>

        <div class="row">
          <span class="muted">Interaction Performance</span>
          <div class="row gap-5">
            <span class="score ${a(n)}">
              ${n??`N/A`}
            </span>
            <span>/ 100</span>
          </div>
        </div>

        <div class="row">
          <span class="muted">SEO</span>
          <div class="row gap-5">
            <span class="score ${a(r)}">
              ${r??`N/A`}
            </span>
            <span>/ 100</span>
          </div>
        </div>

        <div class="row">
          <span class="muted">Accessibility</span>
          <div class="row gap-5">
            <span class="score ${a(i)}">
              ${i??`N/A`}
            </span>
            <span>/ 100</span>
          </div>
        </div>
      </div>

      ${u?`
        <div class="insights column gap-10">
          <span class="block-title mt-15"><strong>Top Issues</strong></span>
          <ul>${u}</ul>
        </div>
      `:``}

      ${U(c)}
    </div>
  `}function U(e=[]){let{quick:t,advanced:n}=W(e.filter(e=>e&&(e.level===`critical`||e.level===`warning`)));return!t.length&&!n.length?``:`
    <div class="insights column gap-20">
      <span class="block-title mt-15"><strong>Recommendations</strong></span>

      ${t.length?`
        <div class="column gap-10">
          <span class="block-title">Quick Wins</span>
          <ul>
            ${t.map(e=>`<li>${e}</li>`).join(``)}
          </ul>
        </div>
      `:``}

      ${n.length?`
        <div class="column gap-10">
          <span class="block-title">Advanced Improvements</span>
          <ul>
            ${n.map(e=>`<li>${e}</li>`).join(``)}
          </ul>
        </div>
      `:``}
    </div>
  `}function W(e=[]){let t=[],n=[],r=e.filter(e=>e&&(e.level===`critical`||e.level===`warning`)),i=[`alt`,`button type`,`missing attribute`,`label`,`aria`,`meta`,`title`,`add`,`missing`,`not set`,`heading`,`h1`,`link text`,`form field`],a=[`layout`,`animation`,`render`,`performance`,`strategy`,`complex`,`reduce`,`optimize`,`largest contentful paint`,`lcp`,`cls`,`javascript-driven`,`layout recalculation`];return r.forEach(e=>{let r=e.message.toLowerCase(),o=a.some(e=>r.includes(e));i.some(e=>r.includes(e))&&!o?t.push(e.message):n.push(e.message)}),{quick:[...new Set(t)].slice(0,4),advanced:[...new Set(n)].slice(0,4)}}function G(e,t){let n=[];return e&&n.push(e.type),t?.length&&t.forEach(e=>n.push(e.type)),{categoryInsights:K({hasFramework:n.includes(`framework`),hasCMS:n.includes(`cms`),hasLibrary:n.includes(`library`)})}}function K({hasFramework:e,hasCMS:t,hasLibrary:n}){let r=[];return!e&&!t?r.push(`No framework or CMS detected`):(e||r.push(`No frontend framework detected`),t||r.push(`No CMS detected`)),!n&&!e&&!t&&r.push(`No major frontend libraries detected`),r}function q(e){let n=e.insights||[],r={critical:[],warning:[],info:[]};n.forEach(e=>{r[e.level]&&r[e.level].push(e.message)});let i=r.critical.length+r.warning.length,o=`
    ${J(`Critical Issues`,r.critical,`critical`)}
    ${J(`Warnings`,r.warning,`warning`)}
    ${J(`Info`,r.info,`info`)}
  `;return`
    <div class="result-section"><strong>Accessibility</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${t(`Score`,e.score??`N/A`,a(e.score))}
        ${t(`Issues`,i,i>0?`warning`:`good`)}
      </div>

      ${i>0||e.showGoodSignals?`
            <div class="insights column gap-10">
              <span class="block-title"><strong>Accessibility Analysis</strong></span>
              ${o}
            </div>
          `:`
            <div class="insights column gap-10">
              <span class="block-title"><strong>Accessibility Analysis</strong></span>
              <span class="good">✓ No accessibility issues detected</span>
              <span class="muted">Basic accessibility checks passed. Consider manual testing for advanced scenarios like screen reader support and focus behavior.</span>
            </div>
          `}
    </div>
  `}function J(e,t,n){return t.length?`
    <div class="insight-group ${n}">
      <span class="block-title mt-15"><strong>${e}</strong></span>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `:``}var Y=document.getElementById(`dashboard-results`),X=new URLSearchParams(window.location.search).get(`tabId`);X?chrome.storage.local.get(`stackResults_${X}`,e=>{Z(e[`stackResults_${X}`]||{}),s(X,Z)}):Y.innerHTML=`<span>No data available</span>`;function Z(e){let{primary:t,secondary:n,rendering:r,cdn:i,performance:a,seo:o,accessibility:s,summary:u}=e||{},{categoryInsights:d}=G(t||null,n||[]),f=a?.loading||null,m=a?.interaction||null,h=``;u&&(h+=H(u)),f&&(h+=_(f)),m&&(h+=p(m)),o&&o.data&&(h+=B(o)),s&&(h+=q(s)),t?h+=A(t,d):h+=j(),n&&n.length?h+=`
          <div class="result-section"><strong>Secondary Technologies</strong></div>
          ${n.map(L).join(``)}
      `:n&&(h+=`
          <div class="result-section"><strong>Secondary Technologies</strong></div>
          ${R()}
      `),r?h+=M(r):h+=N(),i&&(h+=l(i)),h||=c(),Y.innerHTML=h}