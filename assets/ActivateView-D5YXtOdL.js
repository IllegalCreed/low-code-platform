import{e as C,u as w,f as V,q as E,r as d,s as I,o as s,d as a,g as c,t as n,h as t,i as u,w as v,b as m,v as S,a as b,p as q,_ as B}from"./index-BvEBckIH.js";import{u as N}from"./user-S2YkCz2V.js";import"./index-B55gXDHZ.js";import"./isObject-CWTNhToz.js";const $={class:"activate-root-container"},z={class:"title"},R={key:0},T={key:0,class:"description"},U={key:1},D={key:0,class:"description"},F={key:1,class:"description"},M={key:1,class:"description"},Y={flex:"","flex-row":"","items-center":"","mt-4":"","text-3":"","space-x-2":""},j=C({__name:"ActivateView",setup(G){const{t:e}=w(),l=V(),f=E(),{activate:y}=N(),r=d(!1),i=d(!0),_=d(!1);I(()=>{r.value=!!f.query.token,r.value?g(f.query.token):i.value=!1});async function g(k){try{i.value=!0,await y(k),i.value=!1,_.value=!0}catch{i.value=!1,_.value=!1}}return(k,o)=>{const x=S,p=b,A=q;return s(),a("div",$,[c("span",z,n(t(e)("account.activateAccount").toUpperCase()),1),t(r)?(s(),a("div",R,[t(i)?(s(),a("div",T,[c("span",null,n(t(e)("account.activating")),1),u(x,{"ml-2":""})])):(s(),a("div",U,[t(_)?(s(),a("div",D,[c("span",null,n(t(e)("account.activationSuccessful")),1),u(p,{style:{"font-size":"0.875rem"},onClick:o[0]||(o[0]=h=>t(l).push({name:"login"}))},{default:v(()=>[m(n(t(e)("account.signIn")),1)]),_:1})])):(s(),a("div",F,[c("span",null,n(t(e)("account.activationCodeExpired")),1),u(p,{style:{"font-size":"0.875rem"},onClick:o[1]||(o[1]=h=>t(l).push({name:"resend"}))},{default:v(()=>[m(n(t(e)("account.resendActivationEmail")),1)]),_:1})]))]))])):(s(),a("div",M,[c("span",null,n(t(e)("account.checkYourEmailForActivation")),1)])),c("div",Y,[c("span",null,n(t(e)("account.alreadyActivated")),1),u(p,{onClick:o[2]||(o[2]=h=>t(l).push({name:"login"}))},{default:v(()=>[m(n(t(e)("account.signIn")),1)]),_:1})]),u(A,{absolute:"","top-4":"","right-8":""})])}}}),O=B(j,[["__scopeId","data-v-3c5c3590"]]);export{O as default};