(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[484],{7385:function(e,t,n){Promise.resolve().then(n.bind(n,6588))},6588:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(7437),i=n(2265),a=n(2781),s=n(4033),u=n(6691),c=n.n(u),o=n(9942),l=n(9817);function d(){let e=(0,s.useRouter)(),{user:t,currentRol:n}=(0,a.Eu)();return(0,i.useEffect)(()=>{switch(n){case"vendedor":e.push("/ventas");break;case"administrativo":e.push("/admin");break;case"owner":e.push("/dashboard");break;default:e.push("/user-validation")}},[n]),console.log(t),(0,r.jsxs)("div",{className:"container-sm text-center align-items-center my-5",children:[(0,r.jsx)("div",{children:(0,r.jsx)(c(),{className:"img-fluid",alt:"logo",src:o.Z,width:600,height:460})}),(0,r.jsxs)("div",{children:[(0,r.jsx)(c(),{className:"img-fluid",alt:"engrane",src:l.Z,width:350,height:210}),(0,r.jsx)("p",{children:"Loading..."})]})]})}},2781:function(e,t,n){"use strict";n.d(t,{Eu:function(){return g},HD:function(){return p}});var r=n(7437),i=n(2265),a=n(3085),s=n(2827),u=n(4086),c=n(9942),o=n(9817),l=n(6691),d=n.n(l);let f=(0,a.v0)(s.Z),h=i.createContext({}),g=()=>i.useContext(h),p=e=>{let{children:t}=e,[n,l]=i.useState(null),[g,p]=i.useState(!0),[m,A]=i.useState(""),[b,v]=i.useState(""),[x,j]=i.useState(""),[w,y]=i.useState(null),[S,E]=i.useState(null);async function O(){try{let e=(0,u.JU)(s.db,"empleados",n.uid),t=await (0,u.QT)(e),r=t.data();y(r.rol),E(r.nombre)}catch(e){console.log(e)}}return i.useEffect(()=>{let e=(0,a.Aj)(f,e=>{e?(l(e),O()):l(null),p(!1)});return()=>e()},[n]),(0,r.jsx)(h.Provider,{value:{user:n,name:m,cel:b,rol:x,changeName:e=>{A(e)},changeCel:e=>{v(e)},changeRol:e=>{j(e)},currentRol:w,userDB:O,currentName:S},children:g?(0,r.jsxs)("div",{className:"container-sm text-center my-5 align-items-center",children:[(0,r.jsx)("div",{children:(0,r.jsx)(d(),{className:"img-fluid",alt:"logo",src:c.Z,width:600,height:460})}),(0,r.jsxs)("div",{children:[(0,r.jsx)(d(),{className:"img-fluid",alt:"engrane",src:o.Z,width:350,height:210}),(0,r.jsx)("p",{children:"Loading..."})]})]}):t})}},2827:function(e,t,n){"use strict";n.d(t,{db:function(){return u},t:function(){return c}});var r=n(994),i=n(4086),a=n(9584);let s=0===(0,r.C6)().length?(0,r.ZF)({apiKey:"AIzaSyAu3uaivU4_dcmDipBtrqr59jCSC5EQY0I",authDomain:"arquimainfsys.firebaseapp.com",projectId:"arquimainfsys",storageBucket:"arquimainfsys.appspot.com",messagingSenderId:"220334849818",appId:"1:220334849818:web:d65e267b0a726f9f5e36a3"}):(0,r.C6)()[0];t.Z=s;let u=(0,i.ad)(s),c=(0,a.cF)(s)},9942:function(e,t){"use strict";t.Z={src:"/_next/static/media/ArquimaLogo.0f6754b6.png",height:1433,width:3416,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAQAAAAEwYbDAAAANUlEQVR42g3DMQqAIAAAwIMo6AOBFD3Bhzg4uomDu+D/Fz04aDJup8vBYxqSru6FH0SvTxAWanoEMnhCkAoAAAAASUVORK5CYII=",blurWidth:8,blurHeight:3}},9817:function(e,t){"use strict";t.Z={src:"/_next/static/media/engranes.0bcfd619.gif",height:240,width:320,blurWidth:0,blurHeight:0}},4033:function(e,t,n){e.exports=n(8165)},3085:function(e,t,n){"use strict";n.d(t,{Xb:function(){return r.a8},v0:function(){return r.o},Aj:function(){return r.x},e5:function(){return r.a9},w7:function(){return r.B},gQ:function(){return r.ak}});var r=n(1220);n(8745),n(3991),n(6914),n(5538)},44:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)0>t.indexOf(r[i])&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}n.d(t,{_T:function(){return r}}),"function"==typeof SuppressedError&&SuppressedError}},function(e){e.O(0,[358,413,986,943,971,596,744],function(){return e(e.s=7385)}),_N_E=e.O()}]);