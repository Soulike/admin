"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[263],{9278:function(de,H,t){t.d(H,{Z:function(){return k}});var e=t(9526),D={ArticleList:"Style_ArticleList__88A49",title:"Style_title__oFF6d",switch:"Style_switch__Scpbh",buttonWrapper:"Style_buttonWrapper__j7P69"},$=t(4975),T=t(592),Y=t(7025),b=t(5113),W=t(3546),x=t(409),q=t(3009),R=t(6275),_=t(932),ee=t(5303);const{Item:Q}=$.ZP,{Meta:j}=Q,{Group:te}=T.Z;function ne(F){const{articleMap:m,categoryMap:g,isLoading:B,loadingArticleId:S,articleInModalHTMLContent:N,articleInModalTitle:r,modalIsVisible:l,modalOnCancel:n,modalOnOk:o,onArticleTitleClick:s,onIsVisibleSwitchClick:M,onModifyArticleButtonClick:I,onDeleteArticleButtonClick:y,onDeleteArticleConfirm:u}=F;return e.createElement("div",{className:D.ArticleList},e.createElement(Y.Z,{loading:B,active:!0,paragraph:{rows:15}},e.createElement($.ZP,{dataSource:Array.from(m.values()),bordered:!0,pagination:{position:"bottom",pageSizeOptions:["5","10","15","20"],showSizeChanger:!0,hideOnSinglePage:!0},renderItem:C=>{const{id:c,title:p,isVisible:O,publicationTime:V,modificationTime:A}=C,h=new Date(V),E=new Date(A);return e.createElement(Q,{key:c},e.createElement(j,{title:e.createElement("span",{className:D.title,onClick:s(c)},p)}),e.createElement(b.Z,{color:"blue"},g.get(m.get(c).category).name),e.createElement(b.Z,{color:"geekblue"},"\u53D1\u8868\uFF1A",e.createElement("time",null,`${h.getFullYear()}-${(h.getMonth()+1).toString().padStart(2,"0")}-${h.getDate().toString().padStart(2,"0")}`)),e.createElement(b.Z,{color:"geekblue"},"\u7F16\u8F91\uFF1A",e.createElement("time",null,`${E.getFullYear()}-${(E.getMonth()+1).toString().padStart(2,"0")}-${E.getDate().toString().padStart(2,"0")}`)),e.createElement(W.Z,{title:"\u66F4\u6539\u6587\u7AE0\u53EF\u89C1\u6027"},e.createElement(x.Z,{className:D.switch,onClick:M(c),checked:O,disabled:S===c,loading:S===c,checkedChildren:"\u53EF\u89C1",unCheckedChildren:"\u9690\u85CF"})),e.createElement(te,{size:"small",className:D.buttonWrapper},e.createElement(W.Z,{title:"\u7F16\u8F91\u6587\u7AE0"},e.createElement(T.Z,{type:"primary",ghost:!0,onClick:I(c)},e.createElement(_.Z,null))),e.createElement(W.Z,{title:"\u5220\u9664\u6587\u7AE0"},e.createElement(q.Z,{title:`\u786E\u8BA4\u5220\u9664\u6587\u7AE0\u300A${p}\u300B\uFF1F`,onConfirm:u},e.createElement(T.Z,{danger:!0,ghost:!0,onClick:y(c)},e.createElement(ee.Z,null))))))}})),e.createElement(R.Z,{title:r,HTMLContent:N,visible:l,onOk:o,onCancel:n}))}var le=ne,ae=t(3326),X=t(8342),oe=t(4315),Z=t(3404),ie=t(5092),J=t(5509),re=t(5582),K=(F,m,g)=>new Promise((B,S)=>{var N=n=>{try{l(g.next(n))}catch(o){S(o)}},r=n=>{try{l(g.throw(n))}catch(o){S(o)}},l=n=>n.done?B(n.value):Promise.resolve(n.value).then(N,r);l((g=g.apply(F,m)).next())});function z(F){const[m,g]=(0,e.useState)(new Map),[B,S]=(0,e.useState)(new Map),[N,r]=(0,e.useState)(!1),[l,n]=(0,e.useState)(!1),[o,s]=(0,e.useState)(0),[M,I]=(0,e.useState)(""),[y,u]=(0,e.useState)(""),[C,c]=(0,e.useState)(!1),[p,O]=(0,e.useState)(0),V=(0,ie.k6)(),{categoryIdFilter:A}=F;(0,e.useEffect)(()=>{r(!0),Z.l.WD.getAll().then(i=>{if(i!==null){const f=new Map;i.forEach(v=>{f.set(v.id,v)}),S(f)}}).finally(()=>{r(!1)})},[]),(0,e.useEffect)(()=>{n(!0),Promise.resolve().then(()=>typeof A=="undefined"?Z.l.d2.getAll():Z.l.d2.getByCategory(A)).then(i=>{if(i!==null){const f=new Map;i.forEach(v=>{f.set(v.id,v)}),g(f)}}).finally(()=>{n(!1)})},[A]);const h=()=>{c(!C)},E=h,G=i=>f=>{f.preventDefault();const v=m.get(i);typeof v=="undefined"?X.ZP.warning("\u6587\u7AE0\u4E0D\u5B58\u5728"):(I(v.title),u(ae.R.makeHtml(v.content)),c(!0))},L=i=>f=>K(this,null,function*(){if(s(i),(yield Z.l.d2.modify({id:i,isVisible:f}))!==null){const U=m.get(i);U===void 0?X.ZP.warning("\u6587\u7AE0\u4E0D\u5B58\u5728"):(U.isVisible=f,g(new Map(m)),s(0))}}),w=i=>f=>{f.preventDefault(),V.push(`${J.yt[J.DV.MANAGE.BLOG.ARTICLE.MODIFY]}?${re.encode({id:i})}`)},se=i=>()=>{O(i)},ue=()=>K(this,null,function*(){(yield Z.l.d2.deleteById(p))!==null&&(oe.Z.success({message:"\u6587\u7AE0\u5220\u9664\u6210\u529F"}),m.delete(p),g(new Map(m)))});return e.createElement(le,{isLoading:N||l,articleMap:m,categoryMap:B,modalIsVisible:C,articleInModalTitle:M,articleInModalHTMLContent:y,modalOnOk:h,modalOnCancel:E,loadingArticleId:o,onArticleTitleClick:G,onIsVisibleSwitchClick:L,onModifyArticleButtonClick:w,onDeleteArticleButtonClick:se,onDeleteArticleConfirm:ue})}var k=e.memo(z)},1422:function(de,H,t){t.r(H),t.d(H,{default:function(){return N}});var e=t(9526),D={Manage:"Style_Manage__lRaqb",articleAmountTag:"Style_articleAmountTag__olsA6",articleListModal:"Style_articleListModal__Md15d"},$=t(4975),T=t(592),Y=t(5113),b=t(3546),W=t(3009),x={ArticleListModal:"Style_ArticleListModal__zwrhe"},q=t(9278),R=t(2904);function _(r){const{visible:l,categoryInModal:n,onOk:o,onCancel:s}=r;return e.createElement(R.Z,{title:`\u5206\u7C7B"${n?n.name:""}"\u4E0B\u7684\u6587\u7AE0`,visible:l,width:"80vw",onOk:o,onCancel:s,destroyOnClose:!0},e.createElement("div",{className:x.ArticleListModal},e.createElement(q.Z,{categoryIdFilter:n?n.id:void 0})))}var ee=e.memo(_),Q=ee,j={ModifyModal:"Style_ModifyModal__QXpEQ",categoryNameInput:"Style_categoryNameInput__YmDaf"},te=t(2014);function ne(r){const{visible:l,onCancel:n,onOk:o,onCategoryNameInputChange:s,categoryName:M}=r;return e.createElement(R.Z,{title:"\u7F16\u8F91\u6587\u7AE0\u5206\u7C7B",destroyOnClose:!0,visible:l,onOk:o,onCancel:n,width:"25vw"},e.createElement("div",{className:j.ModifyModal},e.createElement(te.Z,{className:j.categoryNameInput,addonBefore:"\u6587\u7AE0\u5206\u7C7B\u540D",onChange:s,value:M})))}var le=e.memo(ne),ae=le,X=t(932),oe=t(5303);const{Item:Z}=$.ZP,{Meta:ie}=Z,{Group:J}=T.Z;function re(r){const{loading:l,categoryMap:n,categoryToArticleNumberMap:o,categoryIdOfArticleListModal:s,isArticleListModalVisible:M,onArticleAmountTagClick:I,onArticleListModalOk:y,onArticleListModalCancel:u,onDeleteCategoryButtonClick:C,onDeleteCategoryConfirm:c,isModifyModalVisible:p,onModifyModalOk:O,onModifyModalCancel:V,onModifyButtonClick:A,nameOfCategoryToModify:h,onCategoryNameInputChange:E}=r,G=n.get(s);return e.createElement("div",{className:D.Manage},e.createElement($.ZP,{loading:l,dataSource:Array.from(n.values()),bordered:!0,pagination:{position:"bottom",pageSizeOptions:["5","10","15","20"],showSizeChanger:!0,hideOnSinglePage:!0},renderItem:({id:L,name:w})=>e.createElement(Z,null,e.createElement(ie,{title:e.createElement(Y.Z,{color:"blue"},w)}),e.createElement(Y.Z,{onClick:I(L),className:D.articleAmountTag},"\u6587\u7AE0\uFF1A",o.get(L)),e.createElement(J,{size:"small",className:D.buttonWrapper},e.createElement(b.Z,{title:"\u7F16\u8F91\u6587\u7AE0\u5206\u7C7B"},e.createElement(T.Z,{type:"primary",ghost:!0,onClick:A(L)},e.createElement(X.Z,null))),e.createElement(b.Z,{title:"\u5220\u9664\u6587\u7AE0\u5206\u7C7B"},e.createElement(W.Z,{title:`\u786E\u8BA4\u5220\u9664\u6587\u7AE0\u5206\u7C7B "${w}"\uFF1F`,onConfirm:c},e.createElement(T.Z,{danger:!0,ghost:!0,onClick:C(L)},e.createElement(oe.Z,null))))))}),e.createElement(Q,{visible:M,categoryInModal:G,onOk:y,onCancel:u}),e.createElement(ae,{visible:p,onOk:O,onCancel:V,categoryName:h,onCategoryNameInputChange:E}))}var K=re;class z{constructor(l,n){this.id=l,this.name=n}static from(l){return new z(l.id,l.name)}}var k=t(3404),F=t(4315),m=t(8342),g=(r,l,n)=>new Promise((o,s)=>{var M=u=>{try{y(n.next(u))}catch(C){s(C)}},I=u=>{try{y(n.throw(u))}catch(C){s(C)}},y=u=>u.done?o(u.value):Promise.resolve(u.value).then(M,I);y((n=n.apply(r,l)).next())});function B(){const[r,l]=(0,e.useState)(!1),[n,o]=(0,e.useState)(new Map),[s,M]=(0,e.useState)(new Map),[I,y]=(0,e.useState)(!1),[u,C]=(0,e.useState)(0),[c,p]=(0,e.useState)(!1),[O,V]=(0,e.useState)(0),[A,h]=(0,e.useState)(""),[E,G]=(0,e.useState)(0);(0,e.useEffect)(()=>{l(!0),k.l.WD.getAll().then(a=>{if(a!==null){const d=new Map;a.forEach(P=>{d.set(P.id,P)}),o(d)}}).finally(()=>l(!1))},[]),(0,e.useEffect)(()=>{l(!0),k.l.WD.getAllArticleAmountById().then(a=>{if(a!==null){const d=new Map;Object.keys(a).forEach(P=>{const ce=Number.parseInt(P);d.set(ce,a[ce])}),M(d)}}).finally(()=>l(!1))},[]);const L=a=>d=>{d.preventDefault(),C(a),y(!0)},w=a=>{a.preventDefault(),y(!1)},se=a=>g(this,null,function*(){if(a.preventDefault(),A!==""){l(!0);const d=yield k.l.WD.modify(new z(O,A));l(!1),d!==null&&(F.Z.success({message:"\u6587\u7AE0\u5206\u7C7B\u7F16\u8F91\u6210\u529F"}),o(P=>(P.get(O).name=A,new Map(P))),p(!1))}else m.ZP.warning("\u6587\u7AE0\u5206\u7C7B\u540D\u4E0D\u80FD\u4E3A\u7A7A")}),ue=a=>{a.preventDefault(),p(!1)},i=a=>()=>{V(a),h(n.get(a).name),p(!0)},f=a=>{h(a.target.value)},v=a=>()=>G(a),U=()=>g(this,null,function*(){if(s.get(E)!==0)m.ZP.warning("\u4E0D\u80FD\u5220\u9664\u6709\u6587\u7AE0\u7684\u5206\u7C7B");else{l(!0);const a=yield k.l.WD.deleteById(E);l(!1),a!==null&&(F.Z.success({message:"\u5220\u9664\u6587\u7AE0\u5206\u7C7B\u6210\u529F"}),o(d=>(d.delete(E),new Map(d))),M(d=>(d.delete(E),new Map(d))))}});return e.createElement(K,{loading:r,categoryMap:n,categoryToArticleNumberMap:s,isArticleListModalVisible:I,categoryIdOfArticleListModal:u,onArticleAmountTagClick:L,onArticleListModalOk:w,onArticleListModalCancel:w,onDeleteCategoryButtonClick:v,onDeleteCategoryConfirm:U,isModifyModalVisible:c,onModifyModalOk:se,onModifyModalCancel:ue,onModifyButtonClick:i,onCategoryNameInputChange:f,nameOfCategoryToModify:A})}var S=e.memo(B),N=S}}]);

//# sourceMappingURL=263.cddeb48a.chunk.js.map