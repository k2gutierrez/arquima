(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[228],{4440:function(t,e){var a;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function s(){for(var t=[],e=0;e<arguments.length;e++){var a=arguments[e];if(a){var r=typeof a;if("string"===r||"number"===r)t.push(a);else if(Array.isArray(a)){if(a.length){var i=s.apply(null,a);i&&t.push(i)}}else if("object"===r){if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]")){t.push(a.toString());continue}for(var o in a)n.call(a,o)&&a[o]&&t.push(o)}}}return t.join(" ")}t.exports?(s.default=s,t.exports=s):void 0!==(a=(function(){return s}).apply(e,[]))&&(t.exports=a)}()},1696:function(t,e,a){Promise.resolve().then(a.bind(a,979))},979:function(t,e,a){"use strict";a.r(e),a.d(e,{default:function(){return A}});var n=a(7437),s=a(2265),r=a(6691),i=a.n(r),o=a(1396),c=a.n(o),l=a(2827),u=a(4086),d=a(1577),h=a(9942),b=a(4033),f=a(928),m=a.n(f),g=a(4440),p=a.n(g),v=a(2781),x=a(8686);function A(t){let{params:e}=t,[a,r]=(0,s.useState)(""),[o,f]=(0,s.useState)(""),g=(0,b.useRouter)(),{currentName:A}=(0,v.Eu)(),j=async()=>{try{let t=(0,u.JU)(l.db,"propiedades",e.id);await (0,u.r7)(t,{status_intenro:a}),g.push("/dashboard")}catch(t){window.alert(t)}};async function y(){await (0,x.Z)(),g.push("/")}let N=async()=>{try{let t=(0,u.JU)(l.db,"propiedades",e.id);await (0,u.r7)(t,{observaciones:o}),g.push("/dashboard")}catch(t){window.alert(t)}};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("nav",{className:"navbar bg-body-tertiary sticky-top",children:(0,n.jsxs)("div",{className:"container-fluid",children:[(0,n.jsxs)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasNavbar","aria-controls":"offcanvasNavbar","aria-label":"Toggle navigation",children:[(0,n.jsx)(i(),{alt:"logo",src:d.Z,width:30,height:30}),(0,n.jsx)("span",{className:"navbar-toggler-icon"})]}),(0,n.jsx)("ul",{className:"navbar-nav ms-auto mb-2 mb-lg-0",children:(0,n.jsx)("li",{className:"nav-item",children:(0,n.jsx)("a",{children:A})})}),(0,n.jsx)("button",{type:"button",className:"btn btn-secondary ms-3",onClick:y,children:"Log Out"}),(0,n.jsxs)("div",{className:"offcanvas offcanvas-start",tabIndex:"-1",id:"offcanvasNavbar","aria-labelledby":"offcanvasNavbarLabel",children:[(0,n.jsxs)("div",{className:"offcanvas-header",children:[(0,n.jsx)(i(),{alt:"logo",src:h.Z,width:150,height:60}),(0,n.jsx)("button",{type:"button",className:"btn-close","data-bs-dismiss":"offcanvas","aria-label":"Close"})]}),(0,n.jsx)("div",{className:"offcanvas-body",children:(0,n.jsx)("ul",{className:"navbar-nav justify-content-end flex-grow-1 pe-3",children:(0,n.jsx)("li",{className:"nav-item",children:(0,n.jsx)(c(),{href:"/dashboard",children:(0,n.jsx)("button",{type:"button",className:"btn","data-bs-dismiss":"offcanvas",children:"Volver al dashboard"})})})})})]})]})}),(0,n.jsxs)("div",{className:"container-md mt-3 text-center",children:[(0,n.jsxs)("div",{className:"row align-items-center mb-5",children:[(0,n.jsx)("div",{className:"col-sm-4 col-6 order-md-1 order-1",children:(0,n.jsx)(i(),{className:p()(m().logo,"img-fluid"),alt:"logo",src:d.Z,height:160,width:300})}),(0,n.jsx)("div",{className:"col-sm-4 col-12 order-md-2 order-3",children:(0,n.jsx)("h2",{children:"BIENVENIDO"})}),(0,n.jsx)("div",{className:"col-sm-4 col-6 order-md-3 order-2",children:(0,n.jsx)(c(),{href:"/dashboard",children:(0,n.jsx)("button",{type:"button",className:"btn m-2",children:(0,n.jsx)("h5",{children:"Volver a Dashboard"})})})})]}),(0,n.jsxs)("div",{className:"align-items-center mb-5",children:[(0,n.jsx)("h3",{children:"Cambiar Status Interno"}),(0,n.jsxs)("div",{class:"mb-3",children:[(0,n.jsx)("label",{for:"nombre",class:"form-label",children:"Nuevo status:"}),(0,n.jsx)("input",{type:"text",onChange:t=>r(t.target.value),class:"form-control",id:"nombre"})]}),(0,n.jsx)("button",{type:"button",onClick:j,class:"btn btn-primary",children:"Cambiar Status Interno"})]}),(0,n.jsxs)("div",{className:"align-items-center mb-5",children:[(0,n.jsx)("h3",{children:"Observaciones"}),(0,n.jsxs)("div",{class:"mb-3",children:[(0,n.jsx)("label",{for:"nombre",class:"form-label",children:"Cambiar observaci\xf3n:"}),(0,n.jsx)("input",{type:"text",onChange:t=>f(t.target.value),class:"form-control",id:"nombre"})]}),(0,n.jsx)("button",{type:"button",onClick:N,class:"btn btn-primary",children:"Cambiar Status Interno"})]})]})]})}},2781:function(t,e,a){"use strict";a.d(e,{Eu:function(){return f},HD:function(){return m}});var n=a(7437),s=a(2265),r=a(3085),i=a(2827),o=a(4086),c=a(9942),l=a(9817),u=a(6691),d=a.n(u);let h=(0,r.v0)(i.Z),b=s.createContext({}),f=()=>s.useContext(b),m=t=>{let{children:e}=t,[a,u]=s.useState(null),[f,m]=s.useState(!0),[g,p]=s.useState(""),[v,x]=s.useState(""),[A,j]=s.useState(""),[y,N]=s.useState(null),[w,S]=s.useState(null);async function C(){try{let t=(0,o.JU)(i.db,"empleados",a.uid),e=await (0,o.QT)(t),n=e.data();N(n.rol),S(n.nombre)}catch(t){console.log(t)}}return s.useEffect(()=>{let t=(0,r.Aj)(h,t=>{t?(u(t),C()):u(null),m(!1)});return()=>t()},[a]),(0,n.jsx)(b.Provider,{value:{user:a,name:g,cel:v,rol:A,changeName:t=>{p(t)},changeCel:t=>{x(t)},changeRol:t=>{j(t)},currentRol:y,userDB:C,currentName:w},children:f?(0,n.jsxs)("div",{className:"container-sm text-center my-5 align-items-center",children:[(0,n.jsx)("div",{children:(0,n.jsx)(d(),{className:"img-fluid",alt:"logo",src:c.Z,width:600,height:460})}),(0,n.jsxs)("div",{children:[(0,n.jsx)(d(),{className:"img-fluid",alt:"engrane",src:l.Z,width:350,height:210}),(0,n.jsx)("p",{children:"Loading..."})]})]}):e})}},8686:function(t,e,a){"use strict";a.d(e,{Z:function(){return i}});var n=a(2827),s=a(3085);let r=(0,s.v0)(n.Z);async function i(){try{await (0,s.w7)(r)}catch(t){}}},2827:function(t,e,a){"use strict";a.d(e,{db:function(){return o},t:function(){return c}});var n=a(994),s=a(4086),r=a(9584);let i=0===(0,n.C6)().length?(0,n.ZF)({apiKey:"AIzaSyAu3uaivU4_dcmDipBtrqr59jCSC5EQY0I",authDomain:"arquimainfsys.firebaseapp.com",projectId:"arquimainfsys",storageBucket:"arquimainfsys.appspot.com",messagingSenderId:"220334849818",appId:"1:220334849818:web:d65e267b0a726f9f5e36a3"}):(0,n.C6)()[0];e.Z=i;let o=(0,s.ad)(i),c=(0,r.cF)(i)},928:function(t){t.exports={main:"page_main__uCLs7",logo:"page_logo__BxBqg"}},1577:function(t,e){"use strict";e.Z={src:"/_next/static/media/ArquimaA.ece3c345.png",height:1433,width:1662,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAQAAACfUMTVAAAAT0lEQVR42h3Juw1AUAAAwPNbQSESSolWYwQNLYXeHoZQS8QKWjaTvPJykGIyIoEIscspCwq/+rxmghRuu8MjBxYtGGzQqBGL0OmpAiFB+QNMYgkF9SW18wAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:7}},9942:function(t,e){"use strict";e.Z={src:"/_next/static/media/ArquimaLogo.0f6754b6.png",height:1433,width:3416,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAQAAAAEwYbDAAAANUlEQVR42g3DMQqAIAAAwIMo6AOBFD3Bhzg4uomDu+D/Fz04aDJup8vBYxqSru6FH0SvTxAWanoEMnhCkAoAAAAASUVORK5CYII=",blurWidth:8,blurHeight:3}},9817:function(t,e){"use strict";e.Z={src:"/_next/static/media/engranes.0bcfd619.gif",height:240,width:320,blurWidth:0,blurHeight:0}},4033:function(t,e,a){t.exports=a(8165)},3085:function(t,e,a){"use strict";a.d(e,{Xb:function(){return n.a8},v0:function(){return n.o},Aj:function(){return n.x},e5:function(){return n.a9},w7:function(){return n.B},gQ:function(){return n.ak}});var n=a(1220);a(8745),a(3991),a(6914),a(5538)},44:function(t,e,a){"use strict";function n(t,e){var a={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&0>e.indexOf(n)&&(a[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols)for(var s=0,n=Object.getOwnPropertySymbols(t);s<n.length;s++)0>e.indexOf(n[s])&&Object.prototype.propertyIsEnumerable.call(t,n[s])&&(a[n[s]]=t[n[s]]);return a}a.d(e,{_T:function(){return n}}),"function"==typeof SuppressedError&&SuppressedError}},function(t){t.O(0,[358,413,986,943,396,971,596,744],function(){return t(t.s=1696)}),_N_E=t.O()}]);