(this.webpackJsonptarea_3=this.webpackJsonptarea_3||[]).push([[0],{105:function(e,t,n){"use strict";n.r(t);var s=n(0),c=n.n(s),r=n(28),a=n.n(r),i=(n(63),n(54)),o=n(2),l=(n(64),n(9)),j=n(107),d=n(110),b=n(108),u=n(109),x=n(57),h=n(15),O=n(65),p="CHAT",m=function(){var e=Object(s.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],r=Object(s.useRef)();Object(s.useEffect)((function(){return r.current=O.connect("ws://tarea-3-websocket.2021-2.tallerdeintegracion.cl"),r.current.on(p,(function(e){var t=Object(h.a)(Object(h.a)({},e),{},{ownedByCurrentUser:e.senderId===r.current.id});c((function(e){return[].concat(Object(x.a)(e),[t])}))})),function(){r.current.disconnect()}}),[]);return{messages:n,sendMessage:function(e){r.current.emit(p,{date:Date.now().toString(),message:e,name:r.current.id})}}},f=(n(96),n(1)),g=function(e){var t=m(),n=t.messages,s=t.sendMessage,r=c.a.useState(""),a=Object(l.a)(r,2),i=a[0],o=a[1];return Object(f.jsxs)("div",{className:"chat-room-container",children:[Object(f.jsx)("div",{className:"messages-container",children:Object(f.jsx)("ol",{className:"messages-list",children:n.map((function(e,t){return Object(f.jsx)("li",{className:"message-item ".concat(e.ownedByCurrentUser?"my-message":"received-message"),children:e.body},t)}))})}),Object(f.jsx)("textarea",{value:i,onChange:function(e){o(e.target.value)},placeholder:"Write message...",className:"new-message-input-field"}),Object(f.jsx)("button",{onClick:function(){s(i),o("")},className:"send-message-button",children:"Send"})]})},v=n(8),y=n.n(v),w=(n(51),n(52)),S=n(53),C=y.a.icon({iconUrl:w.a,shadowUrl:S.a});y.a.Marker.prototype.options.icon=C;var B=function(e){var t=Object(s.useState)(null),n=Object(l.a)(t,1)[0];return n?Object(f.jsxs)("div",{children:["Error: ",n.message]}):Object(f.jsxs)("div",{children:[Object(f.jsx)("hr",{}),Object(f.jsx)("h1",{children:"App de flota de camiones"}),Object(f.jsx)("hr",{}),Object(f.jsxs)("div",{style:{display:"flex",flexDirection:"row",flexWrap:"wrap",width:"100%"},children:[Object(f.jsx)("div",{style:{display:"flex",flexDirection:"column",flexBasis:"100%",flex:1,margin:8},children:Object(f.jsxs)("div",{style:{display:"table-row"},children:[Object(f.jsx)("h3",{children:"Mapa"}),Object(f.jsx)("div",{style:{width:"100%",height:"400px",boxShadow:"5px 5px 5px #888"},children:Object(f.jsxs)(j.a,{center:[51.505,-.09],zoom:13,scrollWheelZoom:!1,style:{height:"400px"},children:[Object(f.jsx)(d.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),Object(f.jsx)(b.a,{position:[51.505,-.09],children:Object(f.jsxs)(u.a,{children:["A pretty CSS3 popup. ",Object(f.jsx)("br",{})," Easily customizable."]})})]})})]})}),Object(f.jsx)("div",{style:{display:"flex",flexDirection:"column",flexBasis:"100%",flex:1,margin:8},children:Object(f.jsxs)("div",{style:{display:"table-row"},children:[Object(f.jsx)("h3",{children:"Chat"}),Object(f.jsx)(g,{})]})})]}),"Y aca abajo lo de los estados"]})},M=function(){return Object(f.jsx)("div",{children:Object(f.jsx)(i.a,{children:Object(f.jsx)(o.a,{exact:!0,path:"/",component:B})})})};var N=function(){return Object(f.jsx)("div",{children:Object(f.jsx)(M,{})})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,111)).then((function(t){var n=t.getCLS,s=t.getFID,c=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),s(e),c(e),r(e),a(e)}))};a.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(N,{})}),document.getElementById("root")),k()},63:function(e,t,n){},96:function(e,t,n){}},[[105,1,2]]]);
//# sourceMappingURL=main.a91970d7.chunk.js.map