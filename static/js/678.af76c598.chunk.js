"use strict";(globalThis.webpackChunkadmin=globalThis.webpackChunkadmin||[]).push([[678],{6796:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var a=n(2791),i=n(5840);const l="Style_Add__cV+Uc";var s=n(184);function o(e){return(0,s.jsx)("div",{className:l,children:(0,s.jsx)(i.Z,{...e,isLoadingArticle:!1})})}const c=a.memo(o);var r=n(3424),u=n(6064),g=n(3085),d=n(7917);function v(){const[e,t]=(0,a.useState)(""),[n,i]=(0,a.useState)(""),[l,o]=(0,a.useState)(void 0),[v,f]=(0,a.useState)(!0),[h,C]=(0,a.useState)([]),[S,m]=(0,a.useState)(!1),[b,w]=(0,a.useState)(!1),[k,y]=(0,a.useState)(!1),[p,A]=(0,a.useState)("");(0,a.useEffect)((()=>{m(!0),(async()=>{const e=await r.l.WD.getAll();null!==e&&C(e)})().finally((()=>m(!1)))}),[]);const P=e=>{e.preventDefault(),y(!1)},x=P;return(0,s.jsx)(c,{title:e,content:n,category:l,isVisible:v,categoryOption:h,onTitleInputChange:e=>{t(e.target.value)},onContentTextAreaChange:e=>{i(e.target.value)},onCategorySelectorChange:e=>{o(e)},onIsVisibleCheckboxChange:e=>{f(e.target.checked)},onSubmitButtonClick:async a=>{if(a.preventDefault(),"undefined"===typeof l)u.ZP.warning("\u8bf7\u9009\u62e9\u6587\u7ae0\u5206\u7c7b");else if(0===e.length)u.ZP.warning("\u8bf7\u586b\u5199\u6587\u7ae0\u6807\u9898");else if(0===n.length)u.ZP.warning("\u8bf7\u586b\u5199\u6587\u7ae0\u5185\u5bb9");else{w(!0);const a=await r.l.d2.add({title:e,category:l,content:n,isVisible:v});w(!1),null!==a&&(g.Z.success({message:"\u6587\u7ae0\u63d0\u4ea4\u6210\u529f"}),t(""),i(""),o(void 0),f(!0),m(!1),w(!1))}},isLoadingCategory:S,isSubmittingArticle:b,isArticlePreviewModalVisible:k,onArticlePreviewButtonClick:e=>{e.preventDefault(),A(d.R.makeHtml(n)),y(!0)},onArticlePreviewModalOk:P,onArticlePreviewModalCancel:x,HTMLContent:p})}const f=a.memo(v)}}]);
//# sourceMappingURL=678.af76c598.chunk.js.map