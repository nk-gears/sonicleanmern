(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{123:function(t,e,n){t.exports=n.p+"static/media/HH-0800.db450232.jpg"},124:function(t,e,n){t.exports=n.p+"static/media/KSC-7500.246f4ac5.jpg"},125:function(t,e,n){t.exports=n.p+"static/media/SFC-7000.2e0a9a1c.jpg"},126:function(t,e,n){t.exports=n.p+"static/media/SFP-0100.0b502182.jpg"},127:function(t,e,n){t.exports=n.p+"static/media/SHF-0800.ec00d837.jpg"},128:function(t,e,n){t.exports=n.p+"static/media/SUF-0520.5c1b748f.jpg"},136:function(t,e,n){"use strict";var a="".concat("soniclean/cards","/getcards"),c="".concat("soniclean/cards","/addcard"),o="".concat("soniclean/cards","/deletecard"),r=n(0),i=n(333),s=n(6),u=n(2),l=n(7),d=n(4),b={cardsData:[],isSubmitSuccess:!1,error:{},state:u.c.INITIAL},f=Object(d.a)(a),p=f.start,O=f.success,S=f.fail,j=f.end,m=Object(d.a)(c),g=m.start,E=m.success,h=m.fail,v=Object(d.a)(o),I=v.start,y=v.success,T=v.fail,C=function(){var t=Object(s.b)();return Object(l.b)({url:"/api/payment/list",accessToken:t,onStart:p,onSuccess:O,onFailure:S,label:a})},P=function(t){var e=Object(s.b)();return Object(l.b)({url:"/api/payment/add",method:"POST",accessToken:e,onStart:g,onSuccess:E,onFailure:h,data:t,label:c})},F=function(t){console.log(t);var e="/api/payment/delete/".concat(t),n=Object(s.b)();return Object(l.b)({url:e,method:"DELETE",accessToken:n,onStart:I,onSuccess:y,onFailure:T,label:o})},L=Object(i.a)(Object(r.a)({},Object(d.c)({action:c,onSuccess:function(t,e){return Object(r.a)({},t,{cardsData:e,error:{},isSubmitSuccess:e.success,state:u.c.SUCCESS})}}),Object(d.c)({action:a,onSuccess:function(t,e){return Object(r.a)({},t,{cardsData:e,error:{},state:u.c.SUCCESS})}}),Object(d.c)({action:o,onSuccess:function(t,e){return Object(r.a)({},t,{error:{},cardsData:e,state:u.c.SUCCESS})}})),b);n.d(e,"c",function(){return j}),n.d(e,"d",function(){return C}),n.d(e,"e",function(){return P}),n.d(e,"b",function(){return F}),n.d(e,"a",function(){return L})},137:function(t,e,n){"use strict";var a="soniclean/stores",c=("".concat(a,"/fetchStores"),"".concat(a,"/successsaveStores")),o=("".concat(a,"/failuresaveStores"),"".concat(a,"/failurefetchStores")),r="".concat(a,"/getstores"),i="".concat(a,"/deletestore"),s="".concat(a,"/addstore"),u="".concat(a,"/updatestore"),l=n(0),d=n(62),b=n(333),f=n(2),p=n(6),O=n(7),S=n(4),j={storesData:[],storebyId:[],state:f.c.INITIAL},m=Object(S.a)(s),g=m.start,E=m.success,h=m.fail,v=Object(S.a)(r),I=v.start,y=v.success,T=v.fail,C=Object(S.a)(u),P=C.start,F=C.success,L=C.fail,U=Object(S.a)(i),A=U.start,N=U.success,D=U.fail,k=(Object(d.a)(c),Object(d.a)(o),function(){var t=Object(p.b)();return Object(O.b)({url:"/api/store/list",accessToken:t,onStart:I,onSuccess:y,onFailure:T,label:r})}),R=function(t){var e=Object(p.b)();return Object(O.b)({url:"/api/store/add",method:"POST",accessToken:e,data:t,onStart:g,onSuccess:E,onFailure:h,label:s})},w=function(t,e){var n="/api/store/update/".concat(e),a=Object(p.b)();return Object(O.b)({url:n,method:"PUT",accessToken:a,data:t,onStart:P,onSuccess:F,onFailure:L,label:u})},_=function(t){var e="/api/store/delete/".concat(t),n=Object(p.b)();return Object(O.b)({url:e,method:"DELETE",accessToken:n,onStart:A,onSuccess:N,onFailure:D,label:i})},H=Object(b.a)(Object(l.a)({},Object(S.c)({action:s,onSuccess:function(t,e){return Object(l.a)({},t,{storesData:e,state:f.c.SUCCESS})}}),Object(S.c)({action:u,onSuccess:function(t,e){return console.log(e),Object(l.a)({},t,{storesData:e,state:f.c.SUCCESS})}}),Object(S.c)({action:r,onSuccess:function(t,e){return Object(l.a)({},t,{storesData:e,state:f.c.SUCCESS})}}),Object(S.c)({action:i,onSuccess:function(t,e){return Object(l.a)({},t,{storesData:e,state:f.c.SUCCESS})}})),j);n.d(e,"c",function(){return k}),n.d(e,"e",function(){return R}),n.d(e,"d",function(){return w}),n.d(e,"b",function(){return _}),n.d(e,"a",function(){return H})},138:function(t,e,n){"use strict";var a="".concat("soniclean/account","/getaccountdata"),c="".concat("soniclean/account","/updateaccountdata"),o="".concat("soniclean/account","/uploadphoto"),r=n(0),i=n(333),s=n(6),u=n(2),l=n(7),d=n(4),b={accountData:[],error:{},state:u.c.INITIAL,userPhoto:"",uploadState:u.c.INITIAL},f=Object(d.a)(a),p=f.start,O=f.success,S=f.fail,j=Object(d.a)(c),m=j.start,g=j.success,E=j.fail,h=Object(d.a)(o),v=h.start,I=h.success,y=h.fail,T=function(){var t=Object(s.b)();return Object(l.b)({url:"/api/account/current",accessToken:t,onStart:p,onSuccess:O,onFailure:S,label:a})},C=function(t){var e=Object(s.b)();return Object(l.b)({url:"/api/account/update",method:"PUT",accessToken:e,onStart:m,onSuccess:g,onFailure:E,data:t,label:c})},P=function(t){var e={file:t},n=Object(s.b)();return Object(l.b)({url:"/api/images/userphoto",method:"PUT",accessToken:n,onStart:v,onSuccess:I,onFailure:y,data:e,label:o})},F=Object(i.a)(Object(r.a)({},Object(d.c)({action:c,onSuccess:function(t,e){return Object(r.a)({},t,{accountData:e,error:{},state:u.c.SUCCESS})}}),Object(d.c)({action:a,onSuccess:function(t,e){return Object(r.a)({},t,{accountData:e,userPhoto:e.userPhoto,error:{},state:u.c.SUCCESS})}}),Object(d.c)({action:o,onStart:function(t,e){return Object(r.a)({},t,{uploadState:u.c.PENDING})},onSuccess:function(t,e){return Object(r.a)({},t,{error:{},userPhoto:e,uploadState:u.c.SUCCESS})}})),b);n.d(e,"b",function(){return T}),n.d(e,"c",function(){return C}),n.d(e,"d",function(){return P}),n.d(e,"a",function(){return F})},139:function(t,e,n){"use strict";var a="".concat("soniclean/users","/getuserlist"),c="".concat("soniclean/users","/adduser"),o="".concat("soniclean/users","/deleteuser"),r=n(0),i=n(333),s=n(2),u=n(6),l=n(7),d=n(4),b={usersData:[],isSubmitSuccess:!1,state:s.c.INITIAL,error:{}},f=Object(d.a)(c),p=f.start,O=f.success,S=f.fail,j=Object(d.a)(a),m=j.start,g=j.success,E=j.fail,h=Object(d.a)(o),v=h.start,I=h.success,y=h.fail,T=function(){var t=Object(u.b)();return Object(l.b)({url:"/api/employee/list",accessToken:t,onStart:m,onSuccess:g,onFailure:E,label:a})},C=function(t){var e=Object(u.b)();return Object(l.b)({url:"/api/employee/new",method:"POST",accessToken:e,data:t,onStart:p,onSuccess:O,onFailure:S,label:c})},P=function(t){var e="/api/employee/delete/".concat(t),n=Object(u.b)();return Object(l.b)({url:e,method:"DELETE",accessToken:n,onStart:v,onSuccess:I,onFailure:y,label:o})},F=Object(i.a)(Object(r.a)({},Object(d.c)({action:c,onStart:function(t,e){return Object(r.a)({},t,{isSubmitSuccess:!1,error:{},state:s.c.PENDING})},onSuccess:function(t,e){return Object(r.a)({},t,{error:{},usersData:e,state:s.c.SUCCESS})}}),Object(d.c)({action:a,onSuccess:function(t,e){return Object(r.a)({},t,{usersData:e,error:{},state:s.c.SUCCESS})}}),Object(d.c)({action:o,onStart:function(t,e){return Object(r.a)({},t,{state:s.c.PENDING,error:{}})},onSuccess:function(t,e){return Object(r.a)({},t,{usersData:e,state:s.c.SUCCESS,error:{}})}})),b);n.d(e,"c",function(){return T}),n.d(e,"d",function(){return C}),n.d(e,"b",function(){return P}),n.d(e,"a",function(){return F})},140:function(t,e,n){"use strict";var a="soniclean/auth",c="".concat(a,"/login"),o="".concat(a,"/logout"),r="".concat(a,"/register"),i=("".concat(a,"/FAILURE_USER_LOGIN"),"".concat(a,"/resetpassword")),s=n(3),u=n(0),l=n(62),d=n(333),b=n(200),f=n.n(b),p=n(6),O=n(2),S=n(43),j=n.n(S),m=function(t){t?j.a.defaults.headers.common.Authorization=t:delete j.a.defaults.headers.common.Authorization},g=n(7),E=n(4),h={token:"",isLoggedIn:!!Object(p.b)(),user:{},registerState:O.c.INITIAL,loginState:O.c.INITIAL,resetPasswordState:O.c.INITIAL,error:{}},v=Object(E.a)(r),I=v.start,y=v.success,T=v.fail,C=v.reset,P=Object(E.a)(c),F=P.start,L=P.success,U=P.fail,A=P.reset,N=Object(E.a)(i),D=N.start,k=N.success,R=N.fail,w=Object(l.a)(o),_=function(t){return Object(g.b)({url:"/api/users/register",method:"POST",data:t,onStart:I,onSuccess:y,onFailure:T,label:r})},H=function(t){return Object(g.b)({url:"/api/users/login",method:"POST",data:t,onStart:F,onSuccess:L,onFailure:U,label:c})},V=function(t){return Object(g.b)({url:"/api/users/confirmation",method:"POST",data:t,onStart:D,onSuccess:k,onFailure:R,label:i})},M=Object(d.a)(Object(u.a)({},Object(E.c)({action:r,onStart:function(t,e){return Object(u.a)({},t,{registerState:O.c.PENDING})},onSuccess:function(t,e){return Object(u.a)({},t,{error:{},registerState:O.c.SUCCESS})},onFail:function(t,e){return Object(u.a)({},t,{error:e,isLoggedIn:!1,registerState:O.c.FAIL})},initialValue:h}),Object(E.c)({action:c,onStart:function(t,e){return Object(u.a)({},t,{isLoggedIn:!1,loginState:O.c.PENDING})},onSuccess:function(t,e){var n=e.token;localStorage.setItem("jwtToken",n),console.log(n),Object(p.d)(n),m(n);var a=f()(n);return Object(u.a)({},t,{token:e.token,user:a,isLoggedIn:!0,error:{},loginState:O.c.SUCCESS})},onFail:function(t,e){return Object(u.a)({},t,{error:e,isLoggedIn:!1,loginState:O.c.FAIL})},initialValue:h}),Object(E.c)({action:i,onStart:function(t,e){return Object(u.a)({},t,{resetPasswordState:O.c.PENDING})},onSuccess:function(t,e){return Object(u.a)({},t,{error:{},resetPasswordState:O.c.SUCCESS})},initialValue:h}),Object(s.a)({},o,function(t){return Object(p.c)(),localStorage.removeItem("jwtToken"),m(!1),{token:"",user:{},loginState:O.c.INITIAL,isLoggedIn:!1}})),h);n.d(e,"g",function(){return C}),n.d(e,"e",function(){return A}),n.d(e,"f",function(){return w}),n.d(e,"c",function(){return _}),n.d(e,"b",function(){return H}),n.d(e,"d",function(){return V}),n.d(e,"a",function(){return M})},141:function(t,e,n){"use strict";var a="".concat("soniclean/company","/getcompanydata"),c="".concat("soniclean/company","/updatecompanydata"),o="".concat("soniclean/company","/uploadcompanylogo"),r=n(0),i=n(333),s=n(6),u=n(2),l=n(7),d=n(4),b={companyData:{},error:{},state:u.c.INITIAL,companyLogo:"",uploadState:u.c.INITIAL},f=Object(d.a)(a),p=f.start,O=f.success,S=f.fail,j=Object(d.a)(c),m=j.start,g=j.success,E=j.fail,h=Object(d.a)(o),v=h.start,I=h.success,y=h.fail,T=function(){var t=Object(s.b)();return Object(l.b)({url:"/api/company/current",accessToken:t,onStart:p,onSuccess:O,onFailure:S,label:a})},C=function(t){var e=Object(s.b)();return Object(l.b)({url:"/api/company/update",method:"PUT",accessToken:e,onStart:m,onSuccess:g,onFailure:E,data:t,label:c})},P=function(t){var e=Object(s.b)();return Object(l.b)({url:"/api/images/companylogo",method:"PUT",accessToken:e,onStart:v,onSuccess:I,onFailure:y,data:t,label:o})},F=Object(i.a)(Object(r.a)({},Object(d.c)({action:c,onSuccess:function(t,e){return Object(r.a)({},t,{companyData:e,error:{},state:u.c.SUCCESS})}}),Object(d.c)({action:a,onSuccess:function(t,e){return Object(r.a)({},t,{companyData:e,companyLogo:e.companyLogo,error:{},state:u.c.SUCCESS})}}),Object(d.c)({action:o,onStart:function(t,e){return Object(r.a)({},t,{uploadState:u.c.PENDING})},onSuccess:function(t,e){return Object(r.a)({},t,{error:{},companyLogo:e,uploadState:u.c.SUCCESS})}})),b);n.d(e,"b",function(){return T}),n.d(e,"c",function(){return C}),n.d(e,"d",function(){return P}),n.d(e,"a",function(){return F})},144:function(t,e,n){"use strict";var a="".concat("soniclean/orderhistory","/getorderlist"),c="".concat("soniclean/orderhistory","/getorderbyid"),o=n(0),r=n(333),i=n(6),s=n(2),u=n(7),l=n(4),d={orderhistorylist:{},totalCount:0,currentPage:1,sizePerPage:1,orderDataById:{},orderStatus:"",state:s.c.INITIAL},b=Object(l.a)(a),f=b.start,p=b.success,O=b.fail,S=Object(l.a)(c),j=S.start,m=S.success,g=S.fail,E=function(t,e){var n="/api/orders/orderslist?page=".concat(t,"&size=").concat(e),c=Object(i.b)();return Object(u.b)({url:n,method:"GET",accessToken:c,onStart:f,onSuccess:p,onFailure:O,label:a})},h=function(t){var e="/api/orders/order/".concat(t),n=Object(i.b)();return Object(u.b)({url:e,method:"GET",accessToken:n,onStart:j,onSuccess:m,onFailure:g,label:c})},v=Object(r.a)(Object(o.a)({},Object(l.c)({action:a,onSuccess:function(t,e){return Object(o.a)({},t,{orderhistorylist:e.data,totalCount:e.pages,currentPage:e.currentPage,sizePerPage:e.sizePerPage,state:s.c.SUCCESS})}}),Object(l.c)({action:c,onSuccess:function(t,e){return Object(o.a)({},t,{orderDataById:e.orderData,orderStatus:e.orderStatus,state:s.c.SUCCESS})}})),d);n.d(e,"c",function(){return E}),n.d(e,"b",function(){return h}),n.d(e,"a",function(){return v})},197:function(t,e,n){"use strict";var a,c="".concat("soniclean/cards","/shownotification"),o="".concat("soniclean/cards","/removenotification"),r=n(3),i=n(0),s=n(62),u=n(333),l=n(2),d={message:"",notificationState:l.c.INITIAL},b=Object(s.a)(c),f=(Object(s.a)(o),Object(u.a)((a={},Object(r.a)(a,c,function(t,e){return Object(i.a)({},t,{notificationState:e.state,message:e.message})}),Object(r.a)(a,o,function(t){return Object(i.a)({},t,{message:"",notificationState:l.c.INITIAL})}),a),d));n.d(e,"b",function(){return b}),n.d(e,"a",function(){return f})},2:function(t,e,n){"use strict";n.d(e,"b",function(){return C}),n.d(e,"a",function(){return T}),n.d(e,"e",function(){return P}),n.d(e,"f",function(){return F}),n.d(e,"c",function(){return L}),n.d(e,"d",function(){return U});var a=n(201),c=n.n(a),o=n(202),r=n.n(o),i=n(203),s=n.n(i),u=n(204),l=n.n(u),d=n(205),b=n.n(d),f=n(123),p=n.n(f),O=n(124),S=n.n(O),j=n(125),m=n.n(j),g=n(126),E=n.n(g),h=n(127),v=n.n(h),I=n(128),y=n.n(I),T=[{_id:"00001",price:"24500",unit:"unit",tooltip:"Karastan Soft Carpet Upright Vacuum",name:"Karastan Soft Carpet Upright Vacuum",description:"(Model: KSC-7500)",image:S.a,multiples:2},{_id:"00002",price:"23500",unit:"unit",tooltip:"Soft Carpet Upright Vacuum",name:"Soft Carpet Upright Vacuum",description:"(Model: SFC-7000)",image:m.a,multiples:2},{_id:"00003",price:"8500",unit:"unit",tooltip:"Soniclean Handheld Vacuum",name:"Soniclean Handheld Vacuum",description:"(Model: HH-0800)",image:p.a,multiples:2},{_id:"00004",price:"2150",unit:"unit",tooltip:"Soniclean Upright HEPA Filter Bags",name:"Soniclean Upright HEPA Filter Bags",description:"(Model: SUF-0520)",image:y.a,multiples:2},{_id:"00005",price:"1650",unit:"unit",tooltip:"Sonicfresh Fragrance Pods",name:"Sonicfresh Fragrance Pods",description:"(Model: SFP-0100)",image:E.a,multiples:2},{_id:"00006",price:"1650",unit:"unit",tooltip:"Soniclean Handheld HEPA Filter Bags",name:"Soniclean Handheld HEPA Filter Bags",description:"(Model: SHF-0800)",image:v.a,multiples:2}],C=[{_id:"00001",price:"23500",discount:"22500",unit:"unit",tooltip:"Karastan Soft Carpet Upright Vacuum",name:"Karastan Soft Carpet Upright Vacuum",description:"(Model: KSC-7500)",image:S.a,multiples:4},{_id:"00002",price:"22500",discount:"21500",unit:"unit",tooltip:"Soft Carpet Upright Vacuum",name:"Soft Carpet Upright Vacuum",description:"(Model: SFC-7000)",image:m.a,multiples:2},{_id:"00003",price:"8000",discount:"7500",unit:"unit",tooltip:"Soniclean Handheld Vacuum",name:"Soniclean Handheld Vacuum",description:"(Model: HH-0800)",image:p.a,multiples:2},{_id:"00004",price:"2000",discount:"2000",unit:"package",tooltip:"Soniclean Upright HEPA Filter Bags",name:"Soniclean Upright HEPA Filter Bags",description:"(Model: SUF-0520)",image:y.a,multiples:4},{_id:"00005",price:"1500",discount:"1500",unit:"package",tooltip:"Sonicfresh Fragrance Pods",name:"Sonicfresh Fragrance Pods",description:"(Model: SFP-0100)",image:E.a,multiples:4},{_id:"00006",price:"1500",discount:"1500",unit:"package",tooltip:"Soniclean Handheld HEPA Filter Bags",name:"Soniclean Handheld HEPA Filter Bags",description:"(Model: SHF-0800)",image:v.a,multiples:4}],P=(c.a,r.a,s.a,l.a,b.a,[{title:"BUY INVENTORY",description:"Order Soniclean products in bulk to keep stock in your showroom/warehouse",detail:'This form allows you to order inventory for your store. Vacuum are sold in multiples of 2 and accessories are sold by the case; one case contains 4 packages of accessories. For pricing and shipping information, click the <i className="fa fa-info-circle fa-md text-info ProductCard__info"></i> in the top right corner of the product listing.'},{title:"DIRECT SHIP",description:"Order 1 vacuum at a time to be shipped to directly to your customer or store",detail:"This order form allows you place an order containing a maximum of 1 of each type of vacuum and a maximum of 1 package of each type of accessory. Direct ship orders can be shipped to your customers or to your store location. You will need your company's credit/ debit card information to process this order.All prices include freight for orders with shipping addresses within the contiguous US."},{title:"REFERRAL SALE",description:"Refer your customer and get credit towards purchases of Soniclean products",detail:""}]),F=[{id:1,name:"SHIP TO CUSTOMER",bannerinsalesform:""},{id:2,name:"SHIP TO STORE",bannerinsalesform:""}],L={INITIAL:"request_initial",PENDING:"request_pending",SUCCESS:"request_success",FAIL:"request_fail"},U=[{label:"Mohawk",value:"Mohawk"},{label:"Karastan",value:"Karastan"}]},201:function(t,e,n){t.exports=n.p+"static/media/p1.0ed70344.png"},202:function(t,e,n){t.exports=n.p+"static/media/p9.7c30a643.png"},203:function(t,e,n){t.exports=n.p+"static/media/p6.cab1a5ff.png"},204:function(t,e,n){t.exports=n.p+"static/media/p8.0b4db5b7.png"},205:function(t,e,n){t.exports=n.p+"static/media/p7.0b3ad285.png"},212:function(t,e,n){t.exports=n(328)},326:function(t,e,n){},327:function(t,e,n){},328:function(t,e,n){"use strict";n.r(e);n(213),n(243),n(244),n(273),n(277),n(279),n(290);!function(){if("function"===typeof window.CustomEvent)return!1;function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}t.prototype=window.Event.prototype,window.CustomEvent=t}();var a,c,o,r,i,s,u,l,d,b,f=n(1),p=n.n(f),O=n(64),S=n.n(O),j=n(335),m=n(198),g=n(63),E=n(18),h=n(140),v=n(138),I=n(141),y=n(37),T="".concat("soniclean","/state"),C="".concat("soniclean","/failurestate"),P=n(3),F=n(0),L=n(62),U=n(333),A=(Object(L.a)(C),Object(U.a)((a={},Object(P.a)(a,T,function(t,e){var n=e.payload;return Object(F.a)({},t,{stateData:n})}),Object(P.a)(a,C,function(t){return Object(F.a)({},t)}),a),{stateData:[]})),N="".concat("soniclean","/brands"),D="".concat("soniclean","/failurebrands"),k=(Object(L.a)(D),Object(U.a)((c={},Object(P.a)(c,N,function(t,e){var n=e.payload;return Object(F.a)({},t,{brandData:n})}),Object(P.a)(c,D,function(t){return Object(F.a)({},t)}),c),{brandData:[]})),R="".concat("soniclean/register","/SUCCESS_REGISTER"),w="".concat("soniclean/register","/FAILURE_REGISTER"),_=n(51),H=Object(_.a)(),V=(Object(L.a)(R),Object(U.a)((o={},Object(P.a)(o,R,function(t){return Object(F.a)({},t,{message:"Registered successfully",success:!0,failed:!1})}),Object(P.a)(o,w,function(t,e){var n=e.payload;return Object(F.a)({},t,{response:n,success:!1,failed:!0})}),o),{response:{},message:"",success:!1,failed:!1})),M="".concat("soniclean/referral","/SAVE_REFERRAL"),x="".concat("soniclean/referral","/FAILURE_REFERRAL"),G=(n(6),Object(L.a)(M),Object(U.a)((r={},Object(P.a)(r,M,function(t){return Object(F.a)({},t,{isSubmitSuccess:!0})}),Object(P.a)(r,x,function(t,e){var n=e.payload;return Object(F.a)({},t,{response:n,isSubmitSuccess:!1})}),r),{response:{},isSubmitSuccess:!1})),B="".concat("soniclean/pricesList","/FETCH_PRICELIST"),K="".concat("soniclean/pricesList","/FAILURE_PRICELIST"),z="".concat("soniclean/pricesList","/FETCH_PERPRICELIST"),Y=(Object(L.a)(K),Object(U.a)((i={},Object(P.a)(i,B,function(t,e){var n=e.payload;return Object(F.a)({},t,{priceListItem:n})}),Object(P.a)(i,z,function(t,e){var n=e.payload;return Object(F.a)({},t,{perPriceListItem:n})}),Object(P.a)(i,K,function(t){return Object(F.a)({},t)}),i),{priceListItem:[],perPriceListItem:[]})),q="".concat("soniclean","/FETCH_EMAILNOTIFICATION"),J="".concat("soniclean","/FAILURE_EMAILNOTIFICATION"),W=(Object(L.a)(J),Object(U.a)((s={},Object(P.a)(s,q,function(t,e){var n=e.payload;return Object(F.a)({},t,{emailNotificationData:n})}),Object(P.a)(s,J,function(t){return Object(F.a)({},t)}),s),{emailNotificationData:[]})),X=n(139),$=n(137),Q=n(136),Z="".concat("soniclean/customer","/SAVE_CUSTOMER"),tt="".concat("soniclean/customer","/FAILURE_CUSTOMER"),et=Object(U.a)((u={},Object(P.a)(u,Z,function(t,e){var n=e.payload;return Object(F.a)({},t,{response:"Customer added successfully",id:n,isSubmitSuccess:!0})}),Object(P.a)(u,tt,function(t,e){var n=e.payload;return Object(F.a)({},t,{response:n,isSubmitSuccess:!1})}),u),{isSubmitSuccess:!1}),nt="".concat("soniclean/promocode","/SAVE_PROMOCODE"),at="".concat("soniclean/promocode","/FAILURE_PROMOCODE"),ct=Object(U.a)((l={},Object(P.a)(l,nt,function(t,e){var n=e.payload;return Object(F.a)({},t,{response:n,isSubmitSuccess:!0})}),Object(P.a)(l,at,function(t,e){var n=e.payload;return Object(F.a)({},t,{response:n,isSubmitSuccess:!1})}),l),{response:{},isSubmitSuccess:!1}),ot="".concat("soniclean/taxes","/FETCH_TAXES"),rt="".concat("soniclean/taxes","/FAILURE_TAXES"),it=Object(U.a)((d={},Object(P.a)(d,ot,function(t,e){var n=e.payload;return Object(F.a)({},t,{response:n,isSubmitSuccess:!0})}),Object(P.a)(d,rt,function(t,e){var n=e.payload;return Object(F.a)({},t,{response:n,isSubmitSuccess:!1})}),d),{isSubmitSuccess:!1}),st="".concat("soniclean/order","/SAVE_ORDER"),ut="".concat("soniclean/order","/FAILURE_ORDER"),lt=(Object(L.a)(st),Object(U.a)((b={},Object(P.a)(b,st,function(t){return Object(F.a)({},t,{isSubmitSuccess:!0})}),Object(P.a)(b,ut,function(t,e){var n=e.payload;return Object(F.a)({},t,{orderResponse:n,isOrder:!1})}),b),{isSubmitSuccess:!1})),dt=n(144),bt=n(197),ft=Object(E.c)({auth:h.a,account:v.a,company:I.a,salesform:y.d,states:A,brands:k,register:V,referral:G,priceList:Y,emailNotificationList:W,stores:$.a,card:Q.a,customer:et,promoCode:ct,taxes:it,order:lt,orderhistory:dt.a,users:X.a,notification:bt.a}),pt=ft({},{}),Ot=function(t,e){return"soniclean/auth/logout"===e.type&&(console.log("asdf"),t=pt),ft(t,e)},St=n(206),jt=n(43),mt=n.n(jt),gt=n(7),Et=function(t){var e=t.dispatch;return function(t){return function(n){if(t(n),n.type===gt.a){var a=n.payload,c=a.url,o=a.method,r=a.data,i=a.accessToken,s=a.onStart,u=a.onSuccess,l=a.onFailure,d=a.label,b=a.headers,f=["GET","DELETE"].includes(o)?"params":"data";mt.a.defaults.headers.common["Content-Type"]="application/json",mt.a.defaults.headers.common.Authorization="".concat(i),d&&e(s(d)),mt.a.request(Object(P.a)({url:c,method:o,headers:b},f,r)).then(function(t){var n=t.data;e(u(n))}).catch(function(t){console.log(t),console.log(t.response.data),e(l(t.response.data))})}}}},ht=n(84),vt=n(207),It=n.n(vt),yt=n(129);var Tt=function(t){var e=[St.a,Et],n=[E.a.apply(void 0,e)],a=E.d,c=Object(ht.a)(function(t,e){return Object(yt.b)(t)},function(t,e){return Object(yt.a)(t)}),o={key:"root",storage:It.a,blacklist:["auth"],transforms:[c]},r=Object(ht.b)(o,Ot),i=Object(E.e)(r,a.apply(void 0,n));return{store:i,persistor:Object(ht.c)(i)}}(),Ct=Tt.store,Pt=Tt.persistor,Ft=n(131),Lt=n(132),Ut=n(134),At=n(133),Nt=n(135),Dt=n(334),kt=n(331),Rt=n(332),wt=n(45),_t=n.n(wt),Ht=function(){return p.a.createElement("div",{className:"animated fadeIn pt-3 text-center"},p.a.createElement("div",{className:"sk-spinner sk-spinner-pulse"}))},Vt=_t()({loader:function(){return Promise.all([n.e(12),n.e(23)]).then(n.bind(null,813))},loading:Ht}),Mt=[{path:"/login",name:"Login Page",component:_t()({loader:function(){return Promise.all([n.e(0),n.e(1),n.e(4),n.e(17),n.e(26)]).then(n.bind(null,815))},loading:Ht}),private:!1},{path:"/register",name:"Register Page",component:_t()({loader:function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(11)]).then(n.bind(null,814))},loading:Ht}),private:!1},{path:"/confirmation/:token",name:"Reset Password Page",component:_t()({loader:function(){return Promise.all([n.e(0),n.e(4),n.e(29)]).then(n.bind(null,816))},loading:Ht}),private:!1},{path:"/",name:"Home",component:Vt,private:!0},{path:"/",name:"Page 404",component:_t()({loader:function(){return Promise.all([n.e(14),n.e(27)]).then(n.bind(null,818))},loading:Ht}),private:!1},{path:"/",name:"Page 500",component:_t()({loader:function(){return Promise.all([n.e(15),n.e(28)]).then(n.bind(null,819))},loading:Ht}),private:!1},{redirect:!0,path:"/",to:"/",name:"Home"}],xt=n(130),Gt=n(330),Bt=Object(g.b)(function(t){return{loggedIn:t.auth.isLoggedIn}})(function(t){var e=t.component,n=Object(xt.a)(t,["component"]);return p.a.createElement(Gt.a,Object.assign({},n,{render:function(t){return n.private?n.loggedIn?p.a.createElement(e,t):p.a.createElement(kt.a,{to:"/login"}):n.loggedIn?p.a.createElement(kt.a,{to:"/"}):p.a.createElement(e,t)}}))}),Kt=(n(326),function(t){function e(){var t,n;Object(Ft.a)(this,e);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(n=Object(Ut.a)(this,(t=Object(At.a)(e)).call.apply(t,[this].concat(c)))).componentDidMount=function(){n.connecToServer()},n.connecToServer=function(){fetch("/")},n}return Object(Nt.a)(e,t),Object(Lt.a)(e,[{key:"render",value:function(){return p.a.createElement(p.a.Fragment,null,p.a.createElement(Dt.a,null,Mt.map(function(t,e){return t.redirect?p.a.createElement(kt.a,{from:t.path,to:t.to,key:e}):p.a.createElement(Bt,{path:t.path,component:t.component,key:e,private:t.private,name:t.name})})))}}]),e}(f.Component)),zt=Object(Rt.a)(Kt);n(327),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));S.a.render(p.a.createElement(g.a,{store:Ct},p.a.createElement(m.a,{loading:null,persistor:Pt},p.a.createElement(j.a,{history:H},p.a.createElement(zt,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},37:function(t,e,n){"use strict";var a,c="soniclean/salesForm",o="".concat(c,"/SALESFORM_ORDERTYPE"),r="".concat(c,"/SELECT_INVENTORY"),i="".concat(c,"/SELECT_SHIP"),s=("".concat(c,"/USERS_LOGOUT"),"".concat(c,"/SELECT_SHIPPINGINFO")),u="".concat(c,"/SELECTED_SHIPPINGINFO"),l="".concat(c,"/SELECTED_INVENTORYDATA"),d="".concat(c,"/DISCOUNT"),b="".concat(c,"/SELECTEDPAYMENT"),f="".concat(c,"/selectstorelocation"),p="".concat(c,"/selectcard"),O="".concat(c,"/selectusers"),S="".concat(c,"/setemployeename"),j="".concat(c,"/submitorder"),m="".concat(c,"/setcustomerinfo"),g="".concat(c,"/resetorder"),E=n(3),h=n(0),v=n(62),I=n(333),y=n(2),T=n(7),C=n(6),P=n(4),F={orderType:-1,inventory:[],inventoryData:[],ship:[],shippinginfor:-1,customerinfo:{},customerInformation:{},discontValue:{},selectedStore:"",selectedCard:"",selectedUsers:[],employeeName:"",paymentId:"",orderResponseData:{},submitSuccess:!1,state:y.c.INITIAL},L=Object(v.a)(o),U=Object(v.a)(r),A=Object(v.a)(i),N=Object(v.a)(s),D=(Object(v.a)(u),Object(v.a)(l),Object(v.a)(d),Object(v.a)(b),Object(v.a)(f)),k=Object(v.a)(p),R=Object(v.a)(O),w=Object(v.a)(S),_=Object(v.a)(m),H=Object(P.a)(j),V=H.start,M=H.success,x=H.fail,G=function(t){var e=Object(C.b)();return Object(T.b)({url:"/api/salesform/order",method:"POST",accessToken:e,onStart:V,onSuccess:M,onFailure:x,data:t,label:j})},B=Object(v.a)(g),K=Object(I.a)(Object(h.a)((a={},Object(E.a)(a,o,function(t,e){var n=e.payload;return Object(h.a)({},t,{orderType:n})}),Object(E.a)(a,r,function(t,e){var n=e.payload;return Object(h.a)({},t,{inventory:n})}),Object(E.a)(a,i,function(t,e){var n=e.payload;return Object(h.a)({},t,{ship:n})}),Object(E.a)(a,s,function(t,e){var n=e.payload;return Object(h.a)({},t,{shippinginfor:n})}),Object(E.a)(a,u,function(t,e){var n=e.payload;return Object(h.a)({},t,{customerinfo:n})}),Object(E.a)(a,l,function(t,e){var n=e.payload;return Object(h.a)({},t,{inventoryData:n})}),Object(E.a)(a,d,function(t,e){var n=e.payload;return Object(h.a)({},t,{discontValue:n})}),Object(E.a)(a,b,function(t,e){var n=e.payload;return Object(h.a)({},t,{paymentId:n})}),Object(E.a)(a,f,function(t,e){var n=e.payload;return Object(h.a)({},t,{selectedStore:n})}),Object(E.a)(a,p,function(t,e){var n=e.payload;return Object(h.a)({},t,{selectedCard:n})}),Object(E.a)(a,O,function(t,e){var n=e.payload;return Object(h.a)({},t,{selectedUsers:n})}),Object(E.a)(a,S,function(t,e){var n=e.payload;return Object(h.a)({},t,{employeeName:n})}),Object(E.a)(a,m,function(t,e){var n=e.payload;return Object(h.a)({},t,{customerInformation:n})}),Object(E.a)(a,g,function(t,e){e.payload;return Object(h.a)({},F,{ship:[],inventory:[]})}),a),Object(P.c)({action:j,onSuccess:function(t,e){return Object(h.a)({},t,{submitSuccess:!0,error:{},orderResponseData:e,state:y.c.SUCCESS})},onFail:function(t,e){return Object(h.a)({},t,{error:e,submitSuccess:!1,state:y.c.FAIL})}})),F);n.d(e,"c",function(){return u}),n.d(e,"a",function(){return d}),n.d(e,"b",function(){return b}),n.d(e,"l",function(){return L}),n.d(e,"k",function(){return U}),n.d(e,"m",function(){return A}),n.d(e,"n",function(){return N}),n.d(e,"f",function(){return D}),n.d(e,"e",function(){return k}),n.d(e,"g",function(){return R}),n.d(e,"i",function(){return w}),n.d(e,"h",function(){return _}),n.d(e,"j",function(){return G}),n.d(e,"o",function(){return B}),n.d(e,"d",function(){return K})},4:function(t,e,n){"use strict";n.d(e,"b",function(){return d}),n.d(e,"a",function(){return b}),n.d(e,"c",function(){return f});var a=n(3),c=n(0),o=n(62),r=n(2),i=function(t){return"".concat(t,"/success")},s=function(t){return"".concat(t,"/fail")},u=function(t){return"".concat(t,"/reset")},l=function(t){return"".concat(t,"/end")};function d(t){return t===r.c.PENDING}var b=function(t){return{start:Object(o.a)(t),success:Object(o.a)(i(t)),fail:Object(o.a)(s(t)),end:Object(o.a)(l(t)),reset:Object(o.a)(u(t))}};function f(t){var e,n=t.action,o=t.onStart,d=t.onSuccess,b=t.onFail,f=t.onEnd,p=t.initialValue;if(!n)throw new Error("action and stateField should be set for generating update request loop handlers");return e={},Object(a.a)(e,n,function(t,e){var n=e.payload;return o?o(t,n):Object(c.a)({},t,{state:r.c.PENDING})}),Object(a.a)(e,i(n),function(t,e){var n=e.payload;return d?d(t,n):Object(c.a)({},t,{state:r.c.SUCCESS,error:{}})}),Object(a.a)(e,s(n),function(t,e){var n=e.payload;return console.log(n),b?b(t,n):Object(c.a)({},t,{error:n,state:r.c.FAIL})}),Object(a.a)(e,l(n),function(t,e){var n=e.payload;return f?f(t,n):Object(c.a)({},t,{state:r.c.INITIAL})}),Object(a.a)(e,u(n),function(t,e){e.payload;return Object(c.a)({},p)}),e}},6:function(t,e,n){"use strict";n.d(e,"b",function(){return c}),n.d(e,"a",function(){return o}),n.d(e,"d",function(){return r}),n.d(e,"c",function(){return i});var a=n(35),c=function(){return(new a.a).get("jwtToken")},o=function(){return(new a.a).get("dealerid")},r=function(t,e,n,c){var o=new a.a;o.set("jwtToken",t,{maxAge:n}),o.set("dealerid",c)},i=function(){var t=new a.a;t.remove("jwtToken"),t.remove("dealerid"),t.remove("userId")}},7:function(t,e,n){"use strict";n.d(e,"a",function(){return a}),n.d(e,"b",function(){return c});var a="API";function c(t){var e=t.url,n=void 0===e?"":e,c=t.method,o=void 0===c?"GET":c,r=t.data,i=void 0===r?null:r,s=t.accessToken,u=void 0===s?null:s,l=t.onStart,d=void 0===l?function(){}:l,b=t.onSuccess,f=void 0===b?function(){}:b,p=t.onFailure,O=void 0===p?function(){}:p,S=t.label,j=void 0===S?"":S,m=t.headersOverride;return{type:a,payload:{url:n,method:o,data:i,accessToken:u,onStart:d,onSuccess:f,onFailure:O,label:j,headersOverride:void 0===m?null:m}}}}},[[212,6,7]]]);
//# sourceMappingURL=main.0ff1eb9b.chunk.js.map