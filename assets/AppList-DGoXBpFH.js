import{i as G,a as b,r as P,d as q,b as O,g as l,c as B,u as J,o as x,e as N,f as C,t as E,n as F,_ as V,h as K,j as Q,k as L,w as Y,l as W,T as Z,m as X,F as ee}from"./index-D-JKjdme.js";var ne=/\s/;function te(e){for(var n=e.length;n--&&ne.test(e.charAt(n)););return n}var re=/^\s+/;function ie(e){return e&&e.slice(0,te(e)+1).replace(re,"")}var D=NaN,ae=/^[-+]0x[0-9a-f]+$/i,oe=/^0b[01]+$/i,se=/^0o[0-7]+$/i,ce=parseInt;function R(e){if(typeof e=="number")return e;if(G(e))return D;if(b(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=b(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=ie(e);var t=oe.test(e);return t||se.test(e)?ce(e.slice(2),t?2:8):ae.test(e)?D:+e}var S=function(){return P.Date.now()},de="Expected a function",ue=Math.max,pe=Math.min;function me(e,n,t){var i,s,d,c,o,u,p=0,k=!1,g=!1,_=!0;if(typeof e!="function")throw new TypeError(de);n=R(n)||0,b(t)&&(k=!!t.leading,g="maxWait"in t,d=g?ue(R(t.maxWait)||0,n):d,_="trailing"in t?!!t.trailing:_);function I(r){var m=i,h=s;return i=s=void 0,p=r,c=e.apply(h,m),c}function j(r){return p=r,o=setTimeout(y,n),k?I(r):c}function z(r){var m=r-u,h=r-p,A=n-m;return g?pe(A,d-h):A}function U(r){var m=r-u,h=r-p;return u===void 0||m>=n||m<0||g&&h>=d}function y(){var r=S();if(U(r))return w(r);o=setTimeout(y,z(r))}function w(r){return o=void 0,_&&i?I(r):(i=s=void 0,c)}function $(){o!==void 0&&clearTimeout(o),p=0,i=u=s=o=void 0}function H(){return o===void 0?c:w(S())}function T(){var r=S(),m=U(r);if(i=arguments,s=this,u=r,m){if(o===void 0)return j(u);if(g)return clearTimeout(o),o=setTimeout(y,n),I(u)}return o===void 0&&(o=setTimeout(y,n)),c}return T.cancel=$,T.flush=H,T}let v;const le=new Uint8Array(16);function fe(){if(!v&&(v=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!v))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return v(le)}const a=[];for(let e=0;e<256;++e)a.push((e+256).toString(16).slice(1));function ge(e,n=0){return a[e[n+0]]+a[e[n+1]]+a[e[n+2]]+a[e[n+3]]+"-"+a[e[n+4]]+a[e[n+5]]+"-"+a[e[n+6]]+a[e[n+7]]+"-"+a[e[n+8]]+a[e[n+9]]+"-"+a[e[n+10]]+a[e[n+11]]+a[e[n+12]]+a[e[n+13]]+a[e[n+14]]+a[e[n+15]]}const he=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),M={randomUUID:he};function f(e,n,t){if(M.randomUUID&&!n&&!e)return M.randomUUID();e=e||{};const i=e.random||(e.rng||fe)();return i[6]=i[6]&15|64,i[8]=i[8]&63|128,ge(i)}const ye=q("apps",()=>{const e=O([{id:f(),name:"Application One with a significantly longer name",color:l()},{id:f(),name:"Short name",color:l()},{id:f(),name:"Data Analyzer with additional descriptive text",color:l()},{id:f(),name:"Task Scheduler and Event Manager",color:l()},{id:f(),name:"User Management System",color:l()},{id:f(),name:"Content Delivery Network and Services Platform",color:l()},{id:f(),name:"Advanced Configuration and Setup Tool for Network Devices",color:l()}]);function n(){return e}return{apps:e,getList:n}}),ve=["title"],xe=B({__name:"AppListItem",props:{app:Object},setup(e){const n=J(),t=e;function i(){var s;n.push({name:"app",params:{appId:(s=t.app)==null?void 0:s.id}})}return(s,d)=>{var c,o,u,p;return x(),N("div",{class:"app-card",onClick:i},[C("div",{class:"app-icon",style:F({backgroundColor:(c=t.app)==null?void 0:c.color})},E((o=t.app)==null?void 0:o.name[0].toUpperCase()),5),C("h3",{class:"app-name",title:(u=t.app)==null?void 0:u.name},E((p=t.app)==null?void 0:p.name),9,ve)])}}}),_e=V(xe,[["__scopeId","data-v-a5f1570b"]]);function Ie(e,n,t){const i=O(0),s=me(()=>{const d=window.innerWidth-t*2;let c=Math.floor(d/(e+n*2));c=Math.max(c,1),i.value=c*(e+n*2)+t*2},100);return K(()=>{s(),window.addEventListener("resize",s)}),Q(()=>{window.removeEventListener("resize",s)}),{containerWidth:i}}const Te=B({__name:"AppList",setup(e){const{apps:n}=ye(),{containerWidth:t}=Ie(160,8,8);return(i,s)=>(x(),L(Z,{name:"card",class:"app-list",tag:"div",style:F({width:W(t)+"px"})},{default:Y(()=>[(x(!0),N(ee,null,X(W(n),d=>(x(),L(_e,{key:d.id,app:d},null,8,["app"]))),128))]),_:1},8,["style"]))}}),be=V(Te,[["__scopeId","data-v-318cde82"]]);export{be as default};
