import{e as I,u as M,r as F,f as L,o as T,d as j,g as l,t as r,h as a,i as n,m as d,j as p,w as c,k as z,a as D,l as P,n as Z,p as G,b as i,_ as H}from"./index-WY_q2w8s.js";import{u as J,a as K,t as Q,c as W,b as x,d as X}from"./validateCatch-BHlwmNLm.js";import{u as Y}from"./user-kn3hWsUB.js";import"./index-D7YstNxp.js";import"./isObject-CWTNhToz.js";const ee={class:"register-root-container"},ae={class:"title"},te={class:"description"},oe={flex:"","flex-row":"","items-center":"","mb-7":"","w-70":"","text-3":""},re={class:"error-message"},se={flex:"","flex-row":"","items-center":"","mt-4":"","w-70":"","text-3":"","space-x-2":""},ne={flex:"","flex-row":"","items-center":"","mt-2":"","w-70":"","text-3":"","space-x-2":""},le=I({__name:"RegisterView",setup(ce){const{t:e}=M(),{register:b,usernameCheck:E,emailCheck:k}=Y(),{checkCatch:A}=J(),m=F(""),{handleSubmit:C,isSubmitting:U,defineField:u}=K({validationSchema:Q(W({username:x().required(()=>e("accountValidate.usernameRequiredError")).test("unique-username",()=>e("accountValidate.usernameUniqueError"),async(o,t)=>await A(o,t.path,()=>E(o))).default(""),email:x().email(()=>e("accountValidate.emailValidError")).required(()=>e("accountValidate.emailRequiredError")).test("unique-email",()=>e("accountValidate.emailUniqueError"),async(o,t)=>await A(o,t.path,()=>k(o))).default(""),password:x().required(()=>e("accountValidate.passwordRequiredError")).matches(/.{8,}/,()=>e("accountValidate.passwordLengthError")).matches(/[A-Z]/,()=>e("accountValidate.passwordUppercaseError")).matches(/[a-z]/,()=>e("accountValidate.passwordLowercaseError")).matches(/\d/,()=>e("accountValidate.passwordNumberError")).matches(/[@$!%*?&]/,()=>e("accountValidate.passwordSpecialCharError")).default(""),isAgree:X().oneOf([!0],()=>e("accountValidate.termsAgreementError")).default(!1)}))}),[_,y]=u("username",o=>({props:{error:o.errors[0]},validateOnModelUpdate:!1})),[h,q]=u("password",o=>({props:{error:o.errors[0]},validateOnModelUpdate:o.errors.length>0})),[f,R]=u("email",o=>({props:{error:o.errors[0]},validateOnModelUpdate:!1})),[g,S]=u("isAgree",{props:o=>({error:o.errors[0]})}),V=L();function $(){m.value="",C(async o=>{try{await b({username:o.username,password:o.password,email:o.email}),V.push("activate")}catch(t){t!=null&&t.msg&&(m.value=t==null?void 0:t.msg)}})()}return(o,t)=>{const w=z,v=D,N=P,O=Z,B=G;return T(),j("div",ee,[l("span",ae,r(a(e)("account.signUp").toUpperCase()),1),l("span",te,r(a(e)("account.createAccount")),1),n(w,d({class:"account-input",modelValue:a(_),"onUpdate:modelValue":t[0]||(t[0]=s=>p(_)?_.value=s:null),placeholder:a(e)("account.account"),clearable:""},a(y)),null,16,["modelValue","placeholder"]),n(w,d({class:"account-input",modelValue:a(f),"onUpdate:modelValue":t[1]||(t[1]=s=>p(f)?f.value=s:null),placeholder:a(e)("account.email"),type:"email",clearable:""},a(R)),null,16,["modelValue","placeholder"]),n(w,d({class:"account-input",modelValue:a(h),"onUpdate:modelValue":t[2]||(t[2]=s=>p(h)?h.value=s:null),placeholder:a(e)("account.password"),type:"password",clearable:"","show-password":""},a(q)),null,16,["modelValue","placeholder"]),l("div",oe,[n(N,d({modelValue:a(g),"onUpdate:modelValue":t[3]||(t[3]=s=>p(g)?g.value=s:null)},a(S)),{default:c(()=>[i(r(a(e)("account.agree"))+" ",1),n(v,{"ml-1":"",href:"/policy"},{default:c(()=>[i(r(a(e)("account.privacy")),1)]),_:1})]),_:1},16,["modelValue"])]),l("span",re,r(a(m)),1),n(O,{id:"register-btn",onClick:$,loading:a(U)},{default:c(()=>[i(r(a(e)("account.register")),1)]),_:1},8,["loading"]),l("div",se,[l("span",null,r(a(e)("account.haveAccount")),1),n(v,{onClick:t[4]||(t[4]=s=>a(V).push({name:"login"}))},{default:c(()=>[i(r(a(e)("account.signIn")),1)]),_:1})]),l("div",ne,[l("span",null,r(a(e)("account.alreadyRegisteredNotActivated")),1),n(v,{onClick:t[5]||(t[5]=s=>a(V).push({name:"resend"}))},{default:c(()=>[i(r(a(e)("account.resendActivationEmail")),1)]),_:1})]),n(B,{absolute:"","top-4":"","right-8":""})])}}}),_e=H(le,[["__scopeId","data-v-a3f9ef5b"]]);export{_e as default};