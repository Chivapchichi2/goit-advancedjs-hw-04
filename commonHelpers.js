import{a as g,i as c,S as b}from"./assets/vendor-5e80a584.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))p(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&p(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function p(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();g.defaults.baseURL="https://pixabay.com/api/";g.defaults.params={image_type:"photo",orientation:"horizontal",per_page:40,key:"20826556-19d7dce6dc96816ed1b7dccf7"};const w=async(r,e)=>{const{data:s}=await g.get("",{params:{q:r,page:e}});return s};function v(r){return r.map(e=>`
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
`).join("")}const u={timeout:3e3,close:!1,closeOnClick:!0,icon:null,position:"topRight"};class a{static success(e){c.success({title:"OK",titleColor:"green",message:e,messageColor:"green",progressBarColor:"green",...u})}static error(e){c.error({title:"Error",titleColor:"red",message:e,messageColor:"red",progressBarColor:"red",...u})}static warning(e){c.warning({title:"Caution",message:e,titleColor:"red",messageColor:"red",progressBarColor:"red",...u})}}const y=document.querySelector("#search-form"),f=document.querySelector(".gallery");let i=1,n="",d=0,m=1;const C={rootMargin:"200px",threshold:.1},L=new b(".gallery a",{});function q(r,e){r.forEach(async s=>{s.isIntersecting&&(e.unobserve(s.target),await h())})}const O=new IntersectionObserver(q,C);async function $(r){if(r.preventDefault(),r.target.elements.searchQuery.value.trim()==="")return a.error("Please enter a search query!");if(r.target.elements.searchQuery.value.trim()===n)return a.warning("Please enter a new search query! Or scroll down");await h()}function E(){const r=y.elements.searchQuery.value.trim();return r!==n?(i=1,m=1,n=r,!0):(i+=1,!1)}async function h(){const r=E();if(r&&(f.innerHTML=""),i>m){a.warning("No more images");return}let e;try{const s=await w(n,i);e=s.hits,d=s.totalHits,m=Math.ceil(d/40)}catch(s){a.error(s.message)}if(!e.length){a.error("Sorry, there are no images matching your search query. Please try again.");return}if(r){const s=`"Hooray! We found ${d} images."`;a.success(s)}f.insertAdjacentHTML("beforeend",v(e)),O.observe(f.lastElementChild),L.refresh()}y.addEventListener("submit",$);
//# sourceMappingURL=commonHelpers.js.map
