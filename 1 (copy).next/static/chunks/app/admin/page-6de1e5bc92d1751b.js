(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3],{4598:function(e,a,s){Promise.resolve().then(s.bind(s,7256))},7256:function(e,a,s){"use strict";s.r(a),s.d(a,{default:function(){return C}});var t=s(7437),l=s(2265),i=s(6691),n=s.n(i),r=s(1396),o=s.n(r),c=s(2781),d=s(4033),m=s(8686),u=s(1577),x=s(9942),h=s(4086),f=s(7829),p=s(2827),b=s(6648),v=s(8378);s(8431);var j=s(3710),N=s(8591);s(9054);var g=s(8775),S=s(1435),E=s(9817),F=s(3085);function C(){let[e,a]=(0,l.useState)("propiedades"),{user:s,currentRol:i,currentName:r}=(0,c.Eu)(),C=(0,d.useRouter)(),[y,I]=(0,l.useState)(!1),[O,D]=(0,l.useState)(""),[A,w]=(0,l.useState)(!1),[T,k]=(0,l.useState)(""),[P,L]=(0,l.useState)(""),[R,Z]=(0,l.useState)(""),[_,J]=(0,l.useState)(""),[V,q]=(0,l.useState)(""),[U,M]=(0,l.useState)(""),[B,Q]=(0,l.useState)(""),[X,z]=(0,l.useState)(void 0),[G,H]=(0,l.useState)(""),[K,W]=(0,l.useState)(""),[Y,$]=(0,l.useState)(""),[ee,ea]=(0,l.useState)(""),[es,et]=(0,l.useState)(""),[el,ei]=(0,l.useState)("SOLTERO"),[en,er]=(0,l.useState)("NA"),[eo,ec]=(0,l.useState)(null),[ed,em]=(0,l.useState)(null),[eu,ex]=(0,l.useState)([{id:"none",nombre:"none"}]),[eh,ef]=(0,l.useState)(null);async function ep(){if(""!=G){let e=(0,h.JU)(p.db,"propiedades",G),a=await (0,h.QT)(e);a.exists()&&Q(a.data().folio)}}async function eb(){if(""!=K){let e=(0,h.JU)(p.db,"empleados",K),a=await (0,h.QT)(e);a.exists()&&z(a.data().nombre)}}(0,l.useEffect)(()=>{null==s?C.push("/"):"administrativo"!=i?C.push("/user-validation"):"administrativo"==i&&(ej(),eg(),eN())},[s,A]),(0,l.useEffect)(()=>{ep()},[G]),(0,l.useEffect)(()=>{eb()},[K]),(0,l.useEffect)(()=>{switch(Y){case"CONTADO":case"FOVISSSTE-infonavit-fovissste":case"FOVISSSTE-tradicional":case"FOVISSSTE-conyugal":case"FOVISSSTE-para-todos":case"BANCARIO-terreno":case"BANCARIO-casa":ea("CURP");break;case"INFOVANIT-tradicional":case"INFOVANIT-unamos-creditos":case"INFOVANIT-conyugal":case"INFOVANIT-infonavit-fovissste":case"INFOVANIT-crediterreno":case"INFOVANIT-segundo-credito":case"INFOVANIT-cofinativ":ea("NSS");break;case"IPEJAL-tradicional":case"IPEJAL-terreno":case"IPEJAL-conyugal":ea("N_Afiliado")}},[Y]);let ev=async()=>{if("arquima"!=T)return;let e=(0,F.v0)(),a=e.currentUser;await (0,F.gQ)(a,P),D("Contrase\xf1a cambiada correctamente"),ey()};async function ej(){let e=(0,h.IO)((0,h.hJ)(p.db,"empleados")),a=await (0,h.PL)(e),s=[];await a.forEach(e=>{let a=e.data();"vendedor"==a.rol&&s.push(e.data())}),ex(s)}async function eN(){let e=(0,h.IO)((0,h.hJ)(p.db,"clientes")),a=await (0,h.PL)(e),s=[];a.forEach(e=>{s.push(e.data())}),ef(s)}async function eg(){let e=(0,h.IO)((0,h.hJ)(p.db,"propiedades")),a=await (0,h.PL)(e),s=[];await a.forEach(e=>{s.push(e.data())}),ec(s);let t=[];await a.forEach(e=>{let a=e.data();"LIBRE"==a.status&&t.push(e.data())}),em(t)}async function eS(){try{let e={nombre:R,email:_,cel:V,pago:(0,g._)(U),status:"ARMADO DE EXPEDIENTE",esquema:Y,[ee]:es,civil:el,regimen_patrimonial:en,folio:B,propiedadID:G,asesor:X,asesorID:K,terminos:!1,historial:[{registrado:r,fecha:h.EK.fromDate(new Date),comentario:"Registrado como cliente"}]},s=(0,h.hJ)(p.db,"clientes"),t=new h.JU(s),l=t.id,i={id:l,...e};await (0,h.pl)(t,i);let n=(0,h.JU)(p.db,"propiedades",G);await (0,h.r7)(n,{status:"ARMADO DE EXPEDIENTE",status_interno:"ARMADO DE EXPEDIENTE",asesor:X,nombre:R,esquema:Y}),D("Registro exitoso"),ey(),w(!A),a("inicio")}catch(e){D(e),ey()}}let eE=[{dataField:"folio",text:"Folio",sort:!0,editable:!1,filter:(0,j.DN)()},{dataField:"proyecto",text:"Proyecto",sort:!0,filter:(0,j.DN)()},{dataField:"inmueble",text:"Inmueble",sort:!0},{dataField:"direccion",text:"Direcci\xf3n",sort:!0},{dataField:"numero_ext.",text:"N\xfamero Ext.",sort:!0},{dataField:"lte",text:"lte",sort:!0},{dataField:"mz",text:"mz",sort:!0},{dataField:"nivel",text:"nivel",sort:!0},{dataField:"status",text:"Status",sort:!0},{dataField:"status_interno",text:"Status Interno",sort:!0},{dataField:"precio",text:"Precio",sort:!0},{dataField:"asesor",text:"Asesor",sort:!0},{dataField:"esquema",text:"Esquema",sort:!0},{dataField:"nombre",text:"Cliente",sort:!0},{dataField:"observaciones",text:"Obs.",sort:!0}],eF=[{dataField:"folio",text:"Folio",sort:!0,filter:(0,j.DN)()},{dataField:"nombre",text:"Nombre",sort:!0,editable:!1,filter:(0,j.DN)()},{dataField:"asesor",text:"Asesor",sort:!0,filter:(0,j.DN)()},{dataField:"esquema",text:"Esquema",sort:!0,filter:(0,j.DN)()},{dataField:"status",text:"Status",sort:!0,filter:(0,j.DN)()},{dataField:"cel",text:"Cel",sort:!0,filter:(0,j.DN)()},{dataField:"email",text:"Email",sort:!0,filter:(0,j.DN)()},{dataField:"propiedadID",text:"IDpropiedad",sort:!0,filter:(0,j.DN)()}],eC=()=>I(!1),ey=()=>I(!0);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(N.Z,{onClick:eC,show:y,onHide:eC,message:O,button:"aceptar"}),(0,t.jsx)("nav",{className:"navbar bg-body-tertiary sticky-top",children:(0,t.jsxs)("div",{className:"container-fluid",children:[(0,t.jsxs)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasNavbar","aria-controls":"offcanvasNavbar","aria-label":"Toggle navigation",children:[(0,t.jsx)(n(),{alt:"logo",src:u.Z,width:30,height:30}),(0,t.jsx)("span",{className:"navbar-toggler-icon"})]}),(0,t.jsx)("ul",{className:"navbar-nav ms-auto mb-2 mb-lg-0",children:(0,t.jsx)("li",{className:"nav-item",children:(0,t.jsx)("a",{children:r})})}),(0,t.jsx)("button",{type:"button",className:"btn btn-secondary ms-3",onClick:m.Z,children:"Log Out"}),(0,t.jsxs)("div",{className:"offcanvas offcanvas-start",tabIndex:"-1",id:"offcanvasNavbar","aria-labelledby":"offcanvasNavbarLabel",children:[(0,t.jsxs)("div",{className:"offcanvas-header",children:[(0,t.jsx)(n(),{alt:"logo",src:x.Z,width:150,height:60}),(0,t.jsx)("button",{type:"button",className:"btn-close","data-bs-dismiss":"offcanvas","aria-label":"Close"})]}),(0,t.jsx)("div",{className:"offcanvas-body",children:(0,t.jsxs)("ul",{className:"navbar-nav justify-content-end flex-grow-1 pe-3",children:[(0,t.jsx)("li",{className:"nav-item",children:(0,t.jsx)(o(),{href:"",children:(0,t.jsx)("button",{type:"button",onClick:()=>a("registrarC"),className:"btn","data-bs-dismiss":"offcanvas",children:"Registrar Clientes"})})}),(0,t.jsx)("li",{className:"nav-item",children:(0,t.jsx)(o(),{href:"",children:(0,t.jsx)("button",{type:"button",onClick:()=>a("clientes"),className:"btn","data-bs-dismiss":"offcanvas",children:"Lista de clientes"})})}),(0,t.jsx)("li",{className:"nav-item",children:(0,t.jsx)(o(),{href:"",children:(0,t.jsx)("button",{type:"button",onClick:()=>a("propiedades"),className:"btn","data-bs-dismiss":"offcanvas",children:"Propiedades"})})}),(0,t.jsx)("li",{className:"nav-item",children:(0,t.jsx)(o(),{href:"",children:(0,t.jsx)("button",{type:"button",onClick:()=>a("password"),className:"btn","data-bs-dismiss":"offcanvas",children:"Cambiar contrase\xf1a"})})}),(0,t.jsx)("li",{className:"nav-item"})]})})]})]})}),(0,t.jsxs)("div",{className:"container-fluid text-center",children:["registrarC"==e?(0,t.jsx)("div",{className:"row justify-content-center text-center",children:(0,t.jsxs)("div",{className:"col-md-6 col-12 mt-4",children:[(0,t.jsx)(n(),{className:"img-fluid",alt:"logo",src:x.Z,width:450,height:360}),(0,t.jsx)("h3",{className:"my-3",children:"Registro de Cliente"}),(0,t.jsxs)("form",{className:"form",children:[(0,t.jsxs)("div",{className:"mb-3 mx-5",children:[(0,t.jsx)("label",{htmlFor:"nombre",className:"form-label",children:"Nombre completo"}),(0,t.jsx)("input",{type:"text",onChange:e=>Z(e.target.value.toUpperCase()),value:R,name:"nombre",className:"form-control",id:"nombre",placeholder:"Nombre Completo"})]}),(0,t.jsxs)("div",{className:"mb-3 mx-5",children:[(0,t.jsx)("label",{htmlFor:"email",className:"form-label",children:"Email"}),(0,t.jsx)("input",{required:!0,type:"email",onChange:e=>J(e.target.value),value:_,name:"email",className:"form-control",id:"email",placeholder:"name@example.com"})]}),(0,t.jsxs)("div",{className:"mb-3 mx-5",children:[(0,t.jsx)("label",{htmlFor:"cel",className:"form-label",children:"Celular - 10 digitos"}),(0,t.jsx)("input",{required:!0,type:"text",maxLength:10,onChange:e=>q(e.target.value),value:V,name:"cel",className:"form-control",id:"cel",placeholder:"Celular: 3312345678"})]}),(0,t.jsxs)("div",{className:"mb-3 mx-5",children:[(0,t.jsx)("label",{htmlFor:"pago",className:"form-label",children:"Pago inicial"}),(0,t.jsx)("input",{type:"text",onChange:e=>M(e.target.value),value:U,name:"pago",className:"form-control",id:"pago",placeholder:"5000"})]}),(0,t.jsxs)("div",{className:"mb-3 mx-5",children:[(0,t.jsx)("p",{children:"Selecciona el Folio de la propiedad"}),(0,t.jsxs)("select",{className:"form-select",onChange:e=>{H(e.target.value)},"aria-label":"Default select example",children:[(0,t.jsx)("option",{value:"",children:"Folio"}),ed.map(e=>(0,t.jsx)("option",{value:e.id,children:e.folio},e.id))]})]}),(0,t.jsxs)("div",{className:"mb-3 mx-5",children:[(0,t.jsx)("p",{children:"Selecciona al Asesor encargado de este cliente: "}),(0,t.jsxs)("select",{className:"form-select",onChange:e=>W(e.target.value),"aria-label":"Default select example",children:[(0,t.jsx)("option",{value:"",children:"Asesor"}),eu.map(e=>(0,t.jsx)("option",{value:e.id,children:e.nombre},e.id))]})]}),(0,t.jsxs)("div",{className:"mb-3 mx-5",children:[(0,t.jsx)("p",{children:"Elige el esquema: "}),(0,t.jsxs)("select",{className:"form-select",onChange:e=>$(e.target.value),"aria-label":"Default select example",children:[(0,t.jsx)("option",{value:"",children:"Tipo de Tr\xe1mite"}),f.g.map((e,a)=>(0,t.jsx)("option",{value:e,children:e},a))]})]}),""!=Y?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(S.Z,{tipo:ee,value:es,onChange:e=>et(e.target.value.toUpperCase())}),(0,t.jsxs)("div",{className:"mb-3 mx-5",children:[(0,t.jsx)("p",{children:"Estado Civil"}),(0,t.jsxs)("select",{className:"form-select",onChange:e=>ei(e.target.value),"aria-label":"Default select example",children:[(0,t.jsx)("option",{value:"",children:"Selecciona una opci\xf3n"}),(0,t.jsx)("option",{value:"SOLTERO",children:"SOLTERO"}),(0,t.jsx)("option",{value:"CASADO",children:"CASADO"})]})]})]}):(0,t.jsx)(t.Fragment,{}),"SOLTERO"!=el?(0,t.jsxs)("div",{className:"mb-3 mx-5",children:[(0,t.jsx)("p",{children:"R\xe9gimen Patrimonial"}),(0,t.jsxs)("select",{className:"form-select",onChange:e=>er(e.target.value),"aria-label":"Default select example",children:[(0,t.jsx)("option",{value:"",children:"Selecciona una opci\xf3n"}),(0,t.jsx)("option",{value:"SOCIEDAD LEGAL / MANCOMUNADO",children:"Sociedad legal / Mancomunado"}),(0,t.jsx)("option",{value:"BIENES SEPARADOS",children:"Bienes separados"})]})]}):(0,t.jsx)(t.Fragment,{}),(0,t.jsx)("div",{className:"my-5",children:(0,t.jsx)("button",{type:"button",onClick:eS,className:"btn btn-secondary",children:"Registrar"})})]})]})}):(0,t.jsx)(t.Fragment,{}),"propiedades"==e?(0,t.jsx)("div",{className:"mt-5 mb-5",children:null!=eo&&eo.length>0?(0,t.jsx)(b.Z,{striped:!0,condensed:!0,hover:!0,keyField:"id",data:eo,columns:eE,pagination:(0,v.ZP)(),filter:(0,j.ZP)(),rowEvents:{onClick:(e,a,s)=>{C.push("/admin/propiedad/".concat(a.id))}}}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n(),{className:"img-fluid",alt:"engrane",src:E.Z,width:350,height:210}),(0,t.jsx)("p",{children:"Loading..."})]})}):(0,t.jsx)(t.Fragment,{}),"clientes"==e?(0,t.jsx)("div",{className:"m-5 p-2",children:null!=eh&&eh.length>0?(0,t.jsx)(b.Z,{striped:!0,condensed:!0,hover:!0,keyField:"id",data:eh,columns:eF,pagination:(0,v.ZP)(),filter:(0,j.ZP)(),rowEvents:{onClick:(e,a,s)=>{C.push("/admin/cliente/".concat(a.id))}}}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n(),{className:"img-fluid",alt:"engrane",src:E.Z,width:350,height:210}),(0,t.jsx)("p",{children:"Loading..."})]})}):(0,t.jsx)(t.Fragment,{}),"password"==e?(0,t.jsxs)("div",{className:"align-items-center mb-5",children:[(0,t.jsx)("h3",{children:"Cambiar Contrase\xf1a"}),(0,t.jsxs)("div",{class:"mb-3",children:[(0,t.jsx)("label",{for:"pass",class:"form-label",children:"Nueva contrase\xf1a:"}),(0,t.jsx)("input",{type:"password",onChange:e=>L(e.target.value),class:"form-control",id:"pass"})]}),(0,t.jsxs)("div",{class:"mb-3",children:[(0,t.jsx)("label",{for:"token",class:"form-label",children:"Token:"}),(0,t.jsx)("input",{type:"password",onChange:e=>k(e.target.value),class:"form-control",id:"token"})]}),(0,t.jsx)("button",{type:"button",onClick:ev,class:"btn btn-primary",children:"Cambiar Status Interno"})]}):(0,t.jsx)(t.Fragment,{})]})]})}}},function(e){e.O(0,[358,413,986,943,396,954,545,933,971,596,744],function(){return e(e.s=4598)}),_N_E=e.O()}]);