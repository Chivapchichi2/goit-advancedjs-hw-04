import{a as p,i as l,S as b}from"./assets/vendor-5e80a584.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))h(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&h(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function h(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();p.defaults.baseURL="https://pixabay.com/api/";p.defaults.params={image_type:"photo",orientation:"horizontal",per_page:40,key:"20826556-19d7dce6dc96816ed1b7dccf7"};const v=async(s,e)=>{const{data:t}=await p.get("",{params:{q:s,page:e}});return t};function w(s){return s.map(e=>`
<li class="photo-card">
  <a href="${e.largeImageURL}" class="photo-card-link">
    <img class="photo-card-image" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <i class="material-icons">thumb_up</i>
      ${e.likes}
    </p>
    <p class="info-item">
      <i class="material-icons">visibility</i>
      ${e.views}
    </p>
    <p class="info-item">
      <i class="material-icons">comment</i>
      ${e.comments}
    </p>
    <p class="info-item">
      <i class="material-icons">cloud_download</i>
      ${e.downloads}
    </p>
  </div>
</li>
`).join("")}const c={timeout:3e3,close:!1,closeOnClick:!0,icon:null,position:"topRight"};class a{static success(e){l.success({title:"OK",titleColor:"green",message:e,messageColor:"green",progressBarColor:"green",...c})}static error(e){l.error({title:"Error",titleColor:"red",message:e,messageColor:"red",progressBarColor:"red",...c})}static warning(e){l.warning({title:"Caution",message:e,titleColor:"red",messageColor:"red",progressBarColor:"red",...c})}}const d=document.querySelector("#search-form"),u=document.querySelector(".gallery");let i=1,m="",f=0,g=1;const C={rootMargin:"200px",threshold:.1},L=new b(".gallery a",{});function q(s,e){s.forEach(async t=>{t.isIntersecting&&(e.unobserve(t.target),await y())})}const $=new IntersectionObserver(q,C);async function E(s){s.preventDefault(),await y()}function O(){return d.elements.searchQuery.value!==m?(i=1,g=1,m=d.elements.searchQuery.value,!0):(i+=1,!1)}async function y(){const s=O();if(s&&(u.innerHTML=""),i>g){a.warning("No more images");return}const e=await v(m,i).then(t=>(f=t.totalHits,g=Math.ceil(f/40),t.hits)).catch(t=>a.error(t.message));if(!e.length){a.error("Sorry, there are no images matching your search query. Please try again.");return}if(s){const t=`"Hooray! We found ${f} images."`;a.success(t)}u.insertAdjacentHTML("beforeend",w(e)),$.observe(u.lastElementChild),L.refresh()}d.addEventListener("submit",E);
//# sourceMappingURL=commonHelpers.js.map
