(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(1),o=t(15),a=t.n(o),r=t(6),u=t(3),i=t(4),s=t.n(i),b="/api/persons",d=function(){return s.a.get(b).then((function(e){return e.data}))},j=function(e){return s.a.post(b,e).then((function(e){return e.data}))},m=function(e,n){return s.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},l=function(e){return s.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},f=t(0),h=function(e){var n=e.name,t=e.number,c=e.removePerson;return Object(f.jsxs)("div",{children:[n," ",t,Object(f.jsx)("button",{onClick:c,children:"Remove"})]})},O=function(e){var n=e.value,t=e.onChange;return Object(f.jsx)("div",{children:Object(f.jsx)("input",{value:n,onChange:t})})},p=function(e){var n=e.message;return null===n?null:Object(f.jsx)("div",{className:n.type,children:n.content})},v=function(e){return Object(f.jsx)("div",{children:Object(f.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(f.jsxs)("div",{children:["Name",Object(f.jsx)("input",{value:e.name,onChange:e.onNameChange})]}),Object(f.jsxs)("div",{children:["Number",Object(f.jsx)("input",{value:e.number,onChange:e.onNumberChange})]}),Object(f.jsx)("button",{type:"submit",children:"save"})]})})},g=(t(39),function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],a=Object(c.useState)(""),i=Object(u.a)(a,2),s=i[0],b=i[1],g=Object(c.useState)(""),x=Object(u.a)(g,2),y=x[0],w=x[1],C=Object(c.useState)(""),N=Object(u.a)(C,2),S=N[0],k=N[1],J=Object(c.useState)({}),P=Object(u.a)(J,2),T=P[0],D=P[1];Object(c.useEffect)((function(){d().then((function(e){o(e)}))}),[]);return Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Phonebook"}),Object(f.jsx)(p,{message:T}),Object(f.jsx)(O,{value:S,onChange:function(e){k(e.target.value)}}),Object(f.jsx)("h3",{children:"add a new person"}),Object(f.jsx)(v,{onSubmit:function(e){e.preventDefault();var n,c={name:s,number:y};if(n=s,t.some((function(e){return e.name===n}))){if(window.confirm("".concat(s," is already added to phonebook, do you want to edit the number?"))){var a=t.find((function(e){return e.name===s})),u=Object(r.a)(Object(r.a)({},a),{},{number:y}),i=a.id;m(i,u).then((function(e){D({content:"".concat(s," has been updated"),type:"message"}),o(t.map((function(n){return n.id!==i?n:e}))),setTimeout((function(){D(null)}),2e3)})).catch((function(e){D({content:"".concat(s," has already been deleted"),type:"error"})}))}}else j(c).then((function(e){o(t.concat(e)),b(""),w(""),D({content:"".concat(s," has been added"),type:"message"}),setTimeout((function(){D(null)}),2e3)})).catch((function(e){console.log(e.response.data),D({content:JSON.stringify(e.response.data),type:"error"})}))},name:s,number:y,onNameChange:function(e){b(e.target.value)},onNumberChange:function(e){w(e.target.value)}}),Object(f.jsx)("h2",{children:"Numbers"}),t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())})).map((function(e){return Object(f.jsx)(h,{name:e.name,number:e.number,removePerson:function(){return function(e){if(window.confirm("Do you really want to delete ".concat(e.name,"?"))){var n=t.filter((function(n){return n.id!==e.id}));l(e.id).then(o(n),D({content:"".concat(e.name," has been deleted"),type:"message"}),setTimeout((function(){D(null)}),2e3)).catch((function(n){D({content:"".concat(e.name," was already deleted"),type:"error"})}))}}(e)}},e.name)}))]})});a.a.render(Object(f.jsx)(g,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.5dc0ef22.chunk.js.map