import{e as A,f as E,u as y,r as R,o as S,d as U,g as s,t as o,h as t,i,m as q,j as B,w as m,b as d,k as I,n as N,a as $,p as F,_ as T}from"./index-BvEBckIH.js";import{u as j,a as D,t as M,c as O,b as P}from"./validateCatch-e7azA7fN.js";import{u as z}from"./user-S2YkCz2V.js";import"./index-B55gXDHZ.js";import"./isObject-CWTNhToz.js";const G={class:"resend-root-container"},H={class:"title"},J={class:"description"},K={class:"error-message"},L={flex:"","flex-row":"","items-center":"","mt-4":"","w-70":"","text-3":"","space-x-2":""},Q=A({__name:"ResendView",setup(W){const l=E(),{t:a}=y(),{checkCatch:p}=j(),{emailCheck:_,resendActiveEmail:h}=z(),c=R(""),{handleSubmit:f,isSubmitting:g,defineField:v}=D({validationSchema:M(O({email:P().email(()=>a("accountValidate.emailValidError")).required(()=>a("accountValidate.emailRequiredError")).test("unique-email",()=>a("accountValidate.emailUniqueError"),async(n,e)=>await p(n,e.path,()=>_(n))).default("")}))}),[r,V]=v("email",n=>({props:{error:n.errors[0]},validateOnModelUpdate:!1}));function b(){c.value="",f(async n=>{try{await h(n.email),l.push("activate")}catch(e){e!=null&&e.msg&&(c.value=e==null?void 0:e.msg)}})()}return(n,e)=>{const k=I,x=N,C=$,w=F;return S(),U("div",G,[s("span",H,o(t(a)("account.activateAccount").toUpperCase()),1),s("span",J,o(t(a)("account.resendActivationEmail")),1),i(k,q({class:"account-input",modelValue:t(r),"onUpdate:modelValue":e[0]||(e[0]=u=>B(r)?r.value=u:null),placeholder:t(a)("account.email"),clearable:""},t(V)),null,16,["modelValue","placeholder"]),s("span",K,o(t(c)),1),i(x,{id:"register-btn",onClick:b,loading:t(g)},{default:m(()=>[d(o(t(a)("account.send")),1)]),_:1},8,["loading"]),s("div",L,[s("span",null,o(t(a)("account.alreadyActivated")),1),i(C,{onClick:e[1]||(e[1]=u=>t(l).push({name:"login"}))},{default:m(()=>[d(o(t(a)("account.signIn")),1)]),_:1})]),i(w,{absolute:"","top-4":"","right-8":""})])}}}),ae=T(Q,[["__scopeId","data-v-1a664147"]]);export{ae as default};