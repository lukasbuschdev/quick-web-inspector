(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let{loadingPerformanceScore:n,interactionPerformanceScore:r,seoScore:i,overallScore:a,topIssues:o}=e,s={critical:2,warning:1},c=(o||[]).sort((e,t)=>s[t.level]-s[e.level]).slice(0,3).map(e=>`<li><span class="${e.level}">[${e.source}]</span> ${e.message}</li>`).join(``);return`
        <div class="result-section"><strong>Summary</strong></div>

        <div class="result-card column gap-20 summary">
            <div class="summary-score">
              <strong>Overall</strong>
              <div class="row gap-5">
                <span class="score ${t(a)}">${a??`N/A`}</span>
                <span class="white"><strong>/ 100</strong></span>
              </div>
            </div>

            <div class="summary-breakdown column gap-20">
              <div class="row gap-10">
                <span><strong class="white">Loading Performance:</strong></span>
                <div class="row gap-5">
                  <span class="score ${t(n)}">${n??`N/A`}</span>
                  <span class="white"><strong>/ 100</strong></span>
                </div>
              </div>

              <div class="row gap-10">
                <span><strong class="white">Interaction Performance:</strong></span>
                <div class="row gap-5">
                  <span class="score ${t(r)}">${r??`N/A`}</span>
                  <span class="white"><strong>/ 100</strong></span>
                </div>
              </div>

              <div class="row gap-10">
                <span><strong class="white">SEO:</strong></span>
                <div class="row gap-5">
                  <span class="score ${t(i)}">${i??`N/A`}</span>
                  <span class="white"><strong>/ 100</strong></span>
                </div>
              </div>
            </div>

            ${c?`
                <div class="insights column gap-10">
                  <strong>Top Issues</strong>
                  <ul>${c}</ul>
                </div>
              `:``}
        </div>
    `}function t(e){return e==null?``:e>=85?`good`:e>=60?`warning`:`critical`}function n(){return`
      <div class="result-card column gap-20">
        <div class="result-header">
          <strong>Analysis</strong>
        </div>
        <span class="muted">
          No detectable technologies. This site likely uses server-side rendering,
          a custom framework, or heavily optimized production builds.
        </span>
      </div>
    `}export{e as n,n as t};