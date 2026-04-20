(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t,n){return!t||!t.length?``:`
    <div class="insight-group ${n}">
      <strong>${e}</strong>
      <ul>
        ${t.map(e=>`<li>${e}</li>`).join(``)}
      </ul>
    </div>
  `}function t(e,t=40){return e?e.length>t?e.slice(0,t)+`...`:e:``}function n(e){return e==null?``:e>=85?`good`:e>=60?`warning`:`critical`}function r(e){return e>=80?`good`:e>=50?`warning`:`muted`}function i(e=0,t=[]){return t.some(e=>e.decisive)?`Proven`:e>=80?`Very likely`:e>=60?`Likely`:e>=40?`Plausible`:`Weak signal`}function a(e,t){let n=0,r=setInterval(()=>{chrome.storage.local.get(`stackResults_${e}`,n=>{t(n[`stackResults_${e}`]||{})}),n++,n>=5&&clearInterval(r)},1e3);chrome.storage.onChanged.addListener((n,r)=>{if(r!==`local`)return;let i=`stackResults_${e}`;n[i]&&t(n[i].newValue||{})})}function o(e){switch(e){case`framework`:return`Framework`;case`library`:return`Library`;case`cms`:return`CMS`;default:return`Other`}}function s(e,t,n=`good`){return`
    <div class="metric-row">
      <span>${e}</span>
      <span class="metric ${n}">
        ${t}
      </span>
    </div>
  `}function c(){return`
    <div class="result-section"><strong>Analysis</strong></div>
    <div class="result-card column gap-20">
      <div class="metric-block">
        <span class="block-title">Result</span>
        <span class="muted">
          No detectable technologies. This site likely uses server-side rendering,
          a custom framework, or heavily optimized production builds.
        </span>
      </div>
    </div>
  `}export{i as a,s as c,r as i,t as l,e as n,n as o,o as r,a as s,c as t};