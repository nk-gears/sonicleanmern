(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{410:function(e,t,a){"use strict";a.d(t,"a",function(){return n});a(3),a(0);var n=function(e){return"".concat("https://soniclean.herokuapp.com","/uploads/").concat(e)}},474:function(e,t,a){e.exports=a.p+"static/media/emptylogo.6732bd42.png"},813:function(e,t,a){"use strict";a.r(t);var n=a(131),l=a(132),r=a(134),c=a(133),o=a(135),i=a(1),u=a.n(i),s=a(334),m=a(330),p=a(798),f=a(411),d=a(63),h=a(332),b=a(140),E=a(425),v=a(138),g=a(406),y={items:[{title:!0,name:"Dashboard",wrapper:{element:"",attributes:{}}},{name:"Sales",url:"/sales",icon:"icon-puzzle"},{name:"Settings",url:"/profile",icon:"icon-settings"},{name:"Orders",url:"/Orders",icon:"fa fa-history"}]},O=[{path:"/",exact:!0,name:"Soniclean",component:S,private:!0},{path:"/sales",name:"Sales",component:u.a.lazy(function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(8)]).then(a.bind(null,811))}),private:!0},{path:"/profile",exact:!1,name:"Profile",component:u.a.lazy(function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(10)]).then(a.bind(null,812))}),private:!0},{path:"/profile/account",exact:!0,name:"Profile",component:u.a.lazy(function(){return Promise.all([a.e(0),a.e(20)]).then(a.bind(null,546))}),private:!0},{path:"/profile/company",exact:!0,name:"Profile",component:u.a.lazy(function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(22),a.e(18)]).then(a.bind(null,545))}),private:!0},{path:"/profile/billing",exact:!0,name:"Profile",component:u.a.lazy(function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(13)]).then(a.bind(null,547))}),private:!0},{path:"/orders",exact:!0,name:"Orders",component:u.a.lazy(function(){return Promise.all([a.e(9),a.e(21)]).then(a.bind(null,821))}),private:!0},{path:"/order/:id",exact:!0,name:"OrderDetail",component:u.a.lazy(function(){return a.e(19).then(a.bind(null,822))}),private:!0}],k=a(410),x=u.a.lazy(function(){return a.e(25).then(a.bind(null,805))}),P=u.a.lazy(function(){return Promise.all([a.e(16),a.e(24)]).then(a.bind(null,820))}),j=function(e){function t(){var e,a;Object(n.a)(this,t);for(var l=arguments.length,o=new Array(l),i=0;i<l;i++)o[i]=arguments[i];return(a=Object(r.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(o)))).loading=function(){return u.a.createElement("div",{className:"animated fadeIn pt-1 text-center"},u.a.createElement("div",{className:"sk-spinner sk-spinner-pulse"}))},a.componentDidMount=function(){a.props.fetchAccount()},a}return Object(o.a)(t,e),Object(l.a)(t,[{key:"signOut",value:function(e){e.preventDefault(),this.props.userLogout()}},{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"app"},u.a.createElement(g.c,{fixed:!0},u.a.createElement(i.Suspense,{fallback:this.loading()},u.a.createElement(P,{onLogout:function(t){return e.signOut(t)}}))),u.a.createElement("div",{className:"app-body"},u.a.createElement(g.e,{fixed:!0,display:"lg"},u.a.createElement(g.h,null,u.a.createElement("img",{src:void 0===this.props.userPhoto?a(474):Object(k.a)(this.props.userPhoto),className:"img-avatar",alt:"Avatar"}),u.a.createElement("div",null,u.a.createElement("strong",null,this.props.accountData.firstName," ",this.props.accountData.lastName)),u.a.createElement("h6",{className:"text-muted font-weight-normal"},this.props.accountData.companyName)),u.a.createElement(g.g,null),u.a.createElement(i.Suspense,null,u.a.createElement(g.j,Object.assign({navConfig:y},this.props)),u.a.createElement("div",null,u.a.createElement(E.a,{style:{width:"100%"},to:"#",className:"nav-link",onClick:function(t){return e.signOut(t)}}," ",u.a.createElement("i",{className:"nav-icon fa fa-lock"})," Logout "))),u.a.createElement(g.f,null),u.a.createElement(g.i,null)),u.a.createElement("main",{className:"main"},u.a.createElement(f.a,{fluid:!0,className:"mt-4 mb-4"},u.a.createElement(i.Suspense,{fallback:this.loading()},u.a.createElement(s.a,null,O.map(function(e,t){return e.component?u.a.createElement(m.a,{key:t,path:e.path,exact:e.exact,name:e.name,render:function(t){return u.a.createElement(e.component,t)}}):null}),u.a.createElement(p.a,{from:"/",to:"/sales"}))))),u.a.createElement(g.a,{fixed:!0},u.a.createElement(i.Suspense,{fallback:this.loading()}))),u.a.createElement(g.b,null,u.a.createElement(i.Suspense,{fallback:this.loading()},u.a.createElement(x,null))))}}]),t}(i.Component),N=Object(h.a)(Object(d.b)(function(e){var t=e.account;return{accountData:t.accountData,uploadState:t.uploadState,userPhoto:t.userPhoto}},function(e){return{userLogout:function(){e(Object(b.f)())},resetState:function(){e(Object(b.e)())},fetchAccount:function(){e(Object(v.b)())}}},null)(j)),S=t.default=N}}]);
//# sourceMappingURL=23.bba1090a.chunk.js.map