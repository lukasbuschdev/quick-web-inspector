import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,s,t as c}from"./assets/technology-fallback-C3INLPKq.js";function l(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),n=e.edge||e.platform||(e.assets&&e.assets.length>0?`Asset CDN detected`:`No CDN detected`),r=e.source===`headers`?`server headers (high confidence)`:`resource analysis`;return`
    <div class="result-section"><strong>CDN & Hosting</strong></div>
    <div class="result-card column gap-30">
      <div class="result-header">
        <span><strong>${n}</strong></span>
          <span class="metric ${o(e.confidence)}">
            ${f(e)}
          </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Details</span>
        ${u(`Detected via`,r)}
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
  `}function d(e){let{confidence:t=0,evidence:r=[],source:i}=e;return t<20?``:i===`headers`?`Proven (${t}%)`:`${n(t,r)} (${t}%)`}function f(e){let t=d(e);return t?`
    <span class="metric ${o(e.confidence)}">
      ${t}
    </span>
  `:``}function p(t){if(!t||!t.data)return`
      <div class="result-section"><strong>Interaction Performance</strong></div>
      <div class="result-card column gap-30">
        <span class="muted">No interaction performance data available</span>
      </div>
    `;let n=t.data,r=`
    ${m(`Passive animations`,n.passiveAnimationCount,`passiveAnimationCount`,n)}
    ${m(`Interaction animations`,n.interactionAnimationCount,`interactionAnimationCount`,n)}
    ${m(`Light interaction animations`,n.cheapInteractionCount,`cheapInteractionCount`,n)}
    ${m(`Heavy interaction animations`,n.heavyInteractionCount,`heavyInteractionCount`,n)}
    ${m(`Expensive passive animations`,n.expensivePassiveAnimationCount,`expensivePassiveAnimationCount`,n)}
    ${m(`Expensive interaction animations`,n.expensiveInteractionAnimationCount,`expensiveInteractionAnimationCount`,n)}
    ${m(`Fixed elements`,n.fixedCount,`fixedCount`,n)}
    ${m(`Hover rules`,n.hoverRules,`hoverRules`,n)}
    ${m(`Box shadows`,n.boxShadowCount,`boxShadowCount`,n)}
    ${m(`Filters`,n.filterCount,`filterCount`,n)}
    ${m(`Backdrop filters`,n.backdropFilterCount,`backdropFilterCount`,n)}
    ${m(`Gradients`,n.gradientCount,`gradientCount`,n)}
    ${m(`Layout-triggering animations`,n.layoutAnimationCount,`layoutAnimationCount`,n)}
    ${m(`GPU-friendly animations`,n.gpuFriendlyAnimationCount,null,null)}
    ${m(`Reduced motion`,n.hasReducedMotionSupport?`supported`:`not supported`,n.hasReducedMotionSupport?`good`:`warning`)}
    ${m(`JS-driven animations`,n.jsAnimationActivity?.detected?h(n.jsAnimationActivity):`none`,`jsAnimationActivity`,n)}
  `,i=_(t.insights||[]),a=i.critical.length+i.warning.length,o=`
    ${y(`Critical Issues`,i.critical,`critical`)}
    ${y(`Warnings`,i.warning,`warning`)}
    ${y(`Good Signals`,i.good,`good`)}
  `;return`
    <div class="result-section"><strong>Interaction Performance</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${m(`Score`,t.score??`N/A`,e(t.score))}
        ${m(`Issues`,a,a>0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Motion & Complexity</span>
        ${r}
      </div>

      ${o.trim()?`
            <div class="insights column gap-10">
              <span class="block-title mt-15"><strong>Analysis</strong></span>
              ${o}
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
  `}function h(e){let{level:t,svgMotionChanges:n=0,styleChanges:r=0}=e;return t===`low`?`low activity (minimal runtime updates)`:t===`medium`?n>r?`moderate activity (mostly visual animations)`:`moderate activity (includes layout/style updates)`:t===`high`?`high activity (frequent runtime updates)`:`unknown`}function g(e){let{passiveAnimationCount:t=0,interactionAnimationCount:n=0,expensivePassiveAnimationCount:r=0,expensiveInteractionAnimationCount:i=0,cheapInteractionCount:a=0,heavyInteractionCount:o=0,fixedCount:s=0,hoverRules:c=0,boxShadowCount:l=0,filterCount:u=0,backdropFilterCount:d=0,gradientCount:f=0,layoutAnimationCount:p=0,jsAnimationActivity:m=null}=e;return{passiveAnimationCount:t>=6?`critical`:t>=3?`warning`:`good`,interactionAnimationCount:n>=40?`warning`:`good`,heavyInteractionCount:o>=20?`critical`:o>=10?`warning`:`good`,cheapInteractionCount:o===0&&a>=10?`good`:`neutral`,expensivePassiveAnimationCount:r>=3?`critical`:r>=1?`warning`:`good`,expensiveInteractionAnimationCount:i>=10?`critical`:i>=4?`warning`:`good`,fixedCount:s>=10?`critical`:s>=5?`warning`:`good`,hoverRules:c>=25?`critical`:c>=10?`warning`:`good`,boxShadowCount:l>=40?`critical`:l>=15?`warning`:`good`,filterCount:u>=10?`critical`:u>=3?`warning`:`good`,backdropFilterCount:d>=5?`critical`:d>=1?`warning`:`good`,gradientCount:f>=50?`critical`:f>=20?`warning`:`good`,layoutAnimationCount:p>=10?`critical`:p>=2?`warning`:`good`,jsAnimationActivity:m?.level===`high`||m?.level===`medium`?`warning`:`good`}}function _(e){let t={critical:[],warning:[],good:[]};return e.forEach(e=>{t[e.level]&&t[e.level].push(e)}),t.critical.sort(v),t.warning.sort(v),t.good.sort(v),t}function v(e,t){let n=!!e.fix;return n===!!t.fix?0:n?-1:1}function y(e,n,r){return!n||n.length===0?``:`
    <div class="insight-group">
      <span class="insight-title ${r}"><strong>${e}</strong></span>
      <ul class="insight-list">
        ${n.map(t).join(``)}
      </ul>
    </div>
  `}function b(t){let{coreWebVitals:n,bundleAnalysis:i,renderBlocking:a}=t.data,o=i?.imageMetrics,s=n?.lcp?x(`LCP`,n.lcp.value,S(n.lcp.raw),`(${n.lcp.rating})`):x(`LCP`,`analyzing...`,``,``,!0),c=n?.cls?x(`CLS`,n.cls.value,ee(n.cls.raw),`(${n.cls.rating})`):x(`CLS`,`analyzing...`,``,``,!0),l=i?.totalJSSize?x(`Total JS size`,i.totalJSSize.value,te(i.totalJSSize.raw)):x(`Total JS size`,`not available`,``,``,!0),u=i?.jsFileCount===void 0?x(`JS files`,`not available`,``,``,!0):x(`JS files`,i.jsFileCount,ne(i.jsFileCount)),d=i?.largestScript?x(`Largest script`,`${r(O(i?.largestScript?.name))} (${i.largestScript.size})`):x(`Largest script`,`not available`,``,``,!0),f=a?x(`Blocking CSS`,a.blockingCSS,re(a.blockingCSS)):x(`Blocking CSS`,`not available`,``,``,!0),p=a?x(`Sync scripts in head`,a.syncScriptsInHead,C(a.syncScriptsInHead)):x(`Sync scripts`,`not available`,``,``,!0),m=o?.imageCount===void 0?x(`Images`,`not available`,``,``,!0):x(`Images`,o.imageCount,E(o.imageCount)),h=o?.totalImageSize?x(`Total image size`,D(o.totalImageSize),w(o.totalImageSize)):x(`Total image size`,`not available`,``,``,!0),g=o?.largestImage?x(`Largest image`,`${r(O(o.largestImage.name))} (${D(o.largestImage.size)})`,T(o.largestImage.size)):x(`Largest image`,`not available`,``,``,!0),_={critical:[],warning:[],good:[]};(t.insights||[]).forEach(e=>{_[e.level]&&_[e.level].push(e)});let v=_.critical.length+_.warning.length,y=`
    ${k(`Critical Issues`,_.critical,`critical`)}
    ${k(`Warnings`,_.warning,`warning`)}
    ${k(`Good Signals`,_.good,`good`)}
  `;return`
    <div class="result-section"><strong>Loading Performance</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${x(`Score`,t.score??`N/A`,e(t.score))}
        ${x(`Issues`,v,v>0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Core Web Vitals</span>
        ${s}
        ${c}
      </div>

      <div class="metric-block">
        <span class="block-title">JavaScript Analysis</span>
        ${l}
        ${u}
        ${d}
      </div>

      <div class="metric-block">
        <span class="block-title">Render Blocking</span>
        ${f}
        ${p}
      </div>

      <div class="metric-block">
        <span class="block-title">Image Analysis</span>
        ${m}
        ${h}
        ${g}
      </div>

      ${y.trim()?`
          <div class="insights column gap-10">
            <span class="block-title mt-15"><strong>Analysis</strong></span>
            ${y}
          </div>
        `:``}
    </div>
  `}function x(e,t,n=``,r=``,i=!1){return`
    <div class="metric-row">
      <span class="${i?`muted`:``}">${e}</span>
      <span class="${i?`muted`:`metric ${n}`}">
        ${t} ${r||``}
      </span>
    </div>
  `}function S(e){if(e==null)return``;let t=e/1e3;return t<=1.8?`good`:t<=3?`warning`:`critical`}function ee(e){return e==null?``:e<=.1?`good`:e<=.25?`warning`:`critical`}function te(e){if(e==null)return``;let t=e/1024;return t<150?`good`:t<400?`warning`:`critical`}function ne(e){return e<10?`good`:e<25?`warning`:`critical`}function re(e){return e===0?`good`:e<=2?`warning`:`critical`}function C(e){return e===0?`good`:e<=2?`warning`:`critical`}function w(e){if(e==null)return``;let t=e/1024;return t<800?`good`:t<1500?`warning`:`critical`}function T(e){if(e==null)return``;let t=e/1024;return t<200?`good`:t<400?`warning`:`critical`}function E(e){return e<20?`good`:e<50?`warning`:`critical`}function D(e){if(!e||e===0)return`0 KB`;let t=e/1024;return t<1024?`${t.toFixed(1)} KB`:`${(t/1024).toFixed(2)} MB`}function O(e){try{return e.split(`/`).pop().split(`?`)[0]}catch{return e}}function k(e,n,r){return!n||n.length===0?``:`
    <div class="insight-group">
      <span class="insight-title ${r}"><strong>${e}</strong></span>
      <ul class="insight-list">
        ${n.map(t).join(``)}
      </ul>
    </div>
  `}function ie(e,t){let r=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),a=[...e.insights||[],...t].map(e=>`<li>${e}</li>`).join(``);return`
    <div class="result-section"><strong>Primary Technology</strong></div>
    <div class="result-card column gap-30">
      <div class="result-header">
        <span>
          <strong>[${i(e.type)}]</strong>
          ${e.name}
        </span>
        <span class="metric ${o(e.confidence)}">
          ${n(e.confidence,e.evidence)} (${e.confidence}%)
        </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Evidence</span>

        ${r?`<ul>${r}</ul>`:`<span class="muted">No direct evidence found</span>`}
      </div>

      ${a?`
          <div class="insights column gap-10">
            <span class="block-title mt-15"><strong>Analysis</strong></span>
            <ul>${a}</ul>
          </div>
        `:``}
    </div>
  `}function A(){return`
    <div class="result-section"><strong>Primary Technology</strong></div>
    <div class="result-card column gap-20">
      <span class="muted">
        No primary technology detected. No dominant technology detected.<br>
        This may indicate static HTML, server-rendered content, or a highly optimized setup.
      </span>
    </div>
  `}function j(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``);return`
    <div class="result-section"><strong>Rendering Strategy</strong></div>
    <div class="result-card column gap-30">
      <div class="result-header align-start">
        <div class="column gap-10">
          <span><strong>${N(e.strategy)}</strong><br></span>
          <span class="rendering-hint">${P(e.strategy)}</span>
        </div>
        <span class="metric ${o(e.confidence)}">
          ${F(e)}
        </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Evidence</span>
        ${t?`<ul>${t}</ul>`:`<span class="muted">No clear rendering evidence found</span>`}
      </div>
    </div>
  `}function M(){return`
    <div class="result-section"><strong>Rendering Strategy</strong></div>
    <div class="result-card column gap-20">
      <div class="metric-block">
        <span class="muted">
          No clear rendering pattern detected. This can occur with hybrid setups,
          static delivery, or optimized builds where rendering behavior is less visible.
        </span>
      </div>
    </div>
  `}function N(e){switch(e){case`SSR`:return`Server-side Rendering (SSR)`;case`SSG`:return`Static Site Generation (SSG)`;case`CSR`:return`Client-side Rendering (CSR)`;default:return`Unknown`}}function P(e){switch(e){case`SSR`:return`Content is rendered on the server before being sent to the client.`;case`SSG`:return`Content is pre-generated at build time and served statically.`;case`CSR`:return`Content is rendered in the browser using JavaScript.`;default:return``}}function F(e){let{confidence:t=0,evidence:r=[]}=e;return`${n(t,r)} (${t}%)`}function I(e){let t=(e.evidence||[]).map(e=>`<li>${e.message}</li>`).join(``),n=(e.insights||[]).map(e=>`<li>${e}</li>`).join(``);return`
    <div class="result-card column gap-30">
      <div class="result-header">
        <span>
          <strong>[${i(e.type)}]</strong>
          ${e.name}
        </span>
        <span class="metric ${o(e.confidence)}">
          ${R(e)}
        </span>
      </div>

      <div class="metric-block">
        <span class="block-title">Evidence</span>
        ${t?`<ul>${t}</ul>`:`<span class="muted">No direct evidence found</span>`}
      </div>

      ${n?`
          <div class="insights column gap-10">
            <span class="block-title"><strong>Analysis</strong></span>
            <ul>${n}</ul>
          </div>
        `:``}
    </div>
  `}function L(){return`
    <div class="result-card column gap-20">
      <span class="muted">
        No additional technologies detected. This may indicate a minimal or highly optimized setup.
      </span>
    </div>
  `}function R(e){let{confidence:t=0,evidence:r=[]}=e;if(t<20)return`<span class="muted">Weak signal</span>`;let i=n(t,r);return`${i===`Proven`?`Detected`:i===`Very likely`?`Strong signal`:i===`Likely`?`Likely`:i===`Plausible`?`Possible`:`Weak signal`} (${t}%)`}function z(t){let{title:n,description:i,canonical:a,lang:o,headings:c,images:l,meta:u}=t.data,d=B(t.insights||[]),f=d.critical.length+d.warning.length,p=`
    ${H(`Critical Issues`,d.critical,`critical`)}
    ${H(`Warnings`,d.warning,`warning`)}
    ${H(`Good Signals`,d.good,`good`)}
  `,m=c?.h1??0;return`
    <div class="result-section"><strong>SEO</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${s(`Score`,t.score??`N/A`,e(t.score))}
        ${s(`Issues`,f,f>0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Structure</span>
        ${s(`Title`,n?r(n,50):`missing`,n?`good`:`critical`)}
        ${s(`Description`,i?r(i,70):`missing`,i?`good`:`critical`)}
        ${s(`Lang`,o??`missing`,o?`good`:`warning`)}
        ${s(`Canonical`,a?`set`:`missing`,a?`good`:`warning`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Headings & Content</span>
        ${s(`H1`,m,m===1?`good`:m===0?`critical`:`warning`)}
        ${s(`H2`,c?.h2??0,`good`)}
        ${s(`Images`,`${l?.total??0} (${l?.missingAlt??0} missing alt)`,(l?.missingAlt??0)>0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Meta & Social</span>
        ${s(`Viewport`,u?.viewport?`set`:`missing`,u?.viewport?`good`:`critical`)}
        ${s(`Open Graph`,u?.openGraph??0,(u?.openGraph??0)>0?`good`:`warning`)}
        ${s(`Twitter`,u?.twitter??0,(u?.twitter??0)>0?`good`:`warning`)}
        ${s(`Robots`,u?.robots||`index`,u?.robots?.includes(`noindex`)?`critical`:`good`)}
        ${s(`Structured Data`,u?.structuredData??0,(u?.structuredData??0)===0?`warning`:`good`)}
      </div>

      <div class="metric-block">
        <span class="block-title">Linking</span>
        ${s(`Internal Links`,t.data.links?.internal??0,(t.data.links?.internal??0)<3?`warning`:`good`)}
        ${s(`External Links`,t.data.links?.external??0,(t.data.links?.external??0)===0?`warning`:`good`)}
      </div>

      ${p.trim()?`
          <div class="insights column gap-10">
            <span class="block-title"><strong>SEO Analysis</strong></span>
            ${p}
          </div>
        `:``}
    </div>
  `}function B(e){let t={critical:[],warning:[],good:[]};return e.forEach(e=>{t[e.level]&&t[e.level].push(e)}),t.critical.sort(V),t.warning.sort(V),t.good.sort(V),t}function V(e,t){let n=!!e.fix;return n===!!t.fix?0:n?-1:1}function H(e,n,r){return!n||n.length===0?``:`
    <div class="insight-group">
      <span class="insight-title ${r}"><strong>${e}</strong></span>
      <ul class="insight-list">
        ${n.map(t).join(``)}
      </ul>
    </div>
  `}function U(t){let{loadingPerformanceScore:n,interactionPerformanceScore:r,seoScore:i,accessibilityScore:a,overallScore:o,topIssues:s,allInsights:c=[]}=t||{},l={critical:2,warning:1},u=(s||[]).sort((e,t)=>l[t.level]-l[e.level]).slice(0,3).map(e=>`
        <li>
          <span class="${e.level}"><strong>[${e.source}]</strong></span>
          ${e.message}
        </li>
      `).join(``);return`
    <div class="result-section"><strong>Summary</strong></div>

    <div class="result-card summary column gap-30">
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

      ${u?`
        <div class="insights column gap-10">
          <span class="block-title mt-15"><strong>Top Issues</strong></span>
          <ul>${u}</ul>
        </div>
      `:``}

      ${W(c)}
    </div>
  `}function W(e=[]){let{quick:t,advanced:n}=G(e.filter(e=>e&&(e.level===`critical`||e.level===`warning`)));return!t.length&&!n.length?``:`
    <div class="insights">
      ${t.length?`
        <div class="column gap-10">
          <span class="block-title">Quick Wins</span>
          <ul class="insight-list">
            ${t.map(q).join(``)}
          </ul>
        </div>
      `:``}
    </div>

    <div class="insights">
      ${n.length?`
        <div class="column gap-10">
          <span class="block-title">Advanced Improvements</span>
          <ul class="insight-list">
            ${n.map(q).join(``)}
          </ul>
        </div>
      `:``}
    </div>
  `}function G(e=[]){let t=[],n=[],r=e.filter(e=>e&&(e.level===`critical`||e.level===`warning`)),i=[`alt`,`button type`,`missing attribute`,`label`,`aria`,`meta`,`title`,`add`,`missing`,`not set`,`heading`,`h1`,`link text`,`form field`],a=[`layout`,`animation`,`render`,`performance`,`strategy`,`complex`,`reduce`,`optimize`,`largest contentful paint`,`lcp`,`cls`,`javascript-driven`,`layout recalculation`];return r.forEach(e=>{let r=e.message.toLowerCase(),o=a.some(e=>r.includes(e));i.some(e=>r.includes(e))&&!o?t.push(e):n.push(e)}),{quick:K(t).slice(0,3),advanced:ae(K(n)).slice(0,3)}}function K(e=[]){let t=new Set;return e.filter(e=>{let n=`${e.level}|${e.source}|${e.message}|${e.fix??``}`;return t.has(n)?!1:(t.add(n),!0)})}function q(e){let t=J(e.level);return`
    <li class="insight-item">
      <div class="insight-message">
        ${t?`<span class="level-label ${e.level}"><strong>[${t}]</strong></span> `:``}${e.message}
      </div>
      ${e.fix?`
            <div class="insight-fix">
              <span class="fix-label"><strong>Fix:</strong></span> ${e.fix}
            </div>
          `:``}
    </li>
  `}function J(e){return e===`critical`?`CRITICAL`:e===`warning`?`WARNING`:null}function ae(e=[]){let t={critical:2,warning:1};return e.sort((e,n)=>t[n.level]-t[e.level])}function oe(e,t){let n=[];return e&&n.push(e.type),t?.length&&t.forEach(e=>n.push(e.type)),{categoryInsights:se({hasFramework:n.includes(`framework`),hasCMS:n.includes(`cms`),hasLibrary:n.includes(`library`)})}}function se({hasFramework:e,hasCMS:t,hasLibrary:n}){let r=[];return!e&&!t?r.push(`No framework or CMS detected`):(e||r.push(`No frontend framework detected`),t||r.push(`No CMS detected`)),!n&&!e&&!t&&r.push(`No major frontend libraries detected`),r}function ce(t){let n=le(t.insights||[]),r=n.critical.length+n.warning.length,i=`
    ${X(`Critical Issues`,n.critical,`critical`)}
    ${X(`Warnings`,n.warning,`warning`)}
    ${X(`Suggestions`,n.info,`info`)}
  `;return`
    <div class="result-section"><strong>Accessibility</strong></div>
    <div class="result-card column gap-30">
      <div class="metric-block">
        <span class="block-title">Overview</span>
        ${s(`Score`,t.score??`N/A`,e(t.score))}
        ${s(`Issues`,r,r>0?`warning`:`good`)}
      </div>

      ${r>0||t.showGoodSignals?`
            <div class="insights column gap-10">
              <span class="block-title"><strong>Accessibility Analysis</strong></span>
              ${i}
            </div>
          `:`
            <div class="insights column gap-10">
              <span class="block-title"><strong>Accessibility Analysis</strong></span>
              <span class="good">✓ No accessibility issues detected</span>
              <span class="muted">Basic accessibility checks passed. Consider manual testing for advanced scenarios like screen reader support and focus behavior.</span>
            </div>
          `}
    </div>
  `}function le(e){let t={critical:[],warning:[],info:[],good:[]};return e.forEach(e=>{t[e.level]&&t[e.level].push(e)}),t.critical.sort(Y),t.warning.sort(Y),t.info.sort(Y),t.good.sort(Y),t}function Y(e,t){let n=!!e.fix;return n===!!t.fix?0:n?-1:1}function X(e,n,r){return!n||n.length===0?``:`
    <div class="insight-group">
      <span class="insight-title ${r}"><strong>${e}</strong></span>
      <ul class="insight-list">
        ${n.map(t).join(``)}
      </ul>
    </div>
  `}var Z=document.getElementById(`dashboard-results`),Q=new URLSearchParams(window.location.search).get(`tabId`);Q?chrome.storage.local.get(`stackResults_${Q}`,e=>{$(e[`stackResults_${Q}`]||{}),a(Q,$)}):Z.innerHTML=`<span>No data available</span>`;function $(e){let{primary:t,secondary:n,rendering:r,cdn:i,performance:a,seo:o,accessibility:s,summary:u}=e||{},{categoryInsights:d}=oe(t||null,n||[]),f=a?.loading||null,m=a?.interaction||null,h=``;u&&(h+=U(u)),f&&(h+=b(f)),m&&(h+=p(m)),o&&o.data&&(h+=z(o)),s&&(h+=ce(s)),t?h+=ie(t,d):h+=A(),n&&n.length?h+=`
          <div class="result-section"><strong>Secondary Technologies</strong></div>
          ${n.map(I).join(``)}
      `:n&&(h+=`
          <div class="result-section"><strong>Secondary Technologies</strong></div>
          ${L()}
      `),r?h+=j(r):h+=M(),i&&(h+=l(i)),h||=c(),Z.innerHTML=h}