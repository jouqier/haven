(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();const st={BOT_TOKEN:"YOUR_BOT_TOKEN_HERE",BOT_USERNAME:"YOUR_BOT_USERNAME"};var He;const I=(He=window.Telegram)==null?void 0:He.WebApp,ot=()=>{var i,e;if(console.log("Initializing Telegram..."),!I){console.error("Telegram WebApp is not available");return}try{if(((e=(i=I.initDataUnsafe)==null?void 0:i.user)==null?void 0:e.username)!==st.BOT_USERNAME){console.error("Invalid bot initialization");return}I.ready(),I.expand(),I.setHeaderColor("#000000"),I.setBackgroundColor("#000000"),console.log("Telegram initialization complete")}catch(t){console.error("Error in Telegram initialization:",t)}};function h(i,e,t,s){var o=arguments.length,r=o<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(i,e,t,s);else for(var n=i.length-1;n>=0;n--)(a=i[n])&&(r=(o<3?a(r):o>3?a(e,t,r):a(e,t))||r);return o>3&&r&&Object.defineProperty(e,t,r),r}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=globalThis,xe=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,we=Symbol(),ke=new WeakMap;let Ne=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==we)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(xe&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=ke.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&ke.set(t,e))}return e}toString(){return this.cssText}};const it=i=>new Ne(typeof i=="string"?i:i+"",void 0,we),L=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,o,r)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[r+1],i[0]);return new Ne(t,i,we)},rt=(i,e)=>{if(xe)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),o=W.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=t.cssText,i.appendChild(s)}},Ce=xe?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return it(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:at,defineProperty:nt,getOwnPropertyDescriptor:lt,getOwnPropertyNames:ct,getOwnPropertySymbols:dt,getPrototypeOf:ht}=Object,C=globalThis,Se=C.trustedTypes,pt=Se?Se.emptyScript:"",te=C.reactiveElementPolyfillSupport,D=(i,e)=>i,X={toAttribute(i,e){switch(e){case Boolean:i=i?pt:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},_e=(i,e)=>!at(i,e),Te={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:_e};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),C.litPropertyMetadata??(C.litPropertyMetadata=new WeakMap);class P extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Te){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(e,s,t);o!==void 0&&nt(this.prototype,e,o)}}static getPropertyDescriptor(e,t,s){const{get:o,set:r}=lt(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get(){return o==null?void 0:o.call(this)},set(a){const n=o==null?void 0:o.call(this);r.call(this,a),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Te}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;const e=ht(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){const t=this.properties,s=[...ct(t),...dt(t)];for(const o of s)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,o]of t)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const o=this._$Eu(t,s);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const o of s)t.unshift(Ce(o))}else e!==void 0&&t.push(Ce(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return rt(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EC(e,t){var r;const s=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,s);if(o!==void 0&&s.reflect===!0){const a=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:X).toAttribute(t,s.type);this._$Em=e,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$Em=null}}_$AK(e,t){var r;const s=this.constructor,o=s._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const a=s.getPropertyOptions(o),n=typeof a.converter=="function"?{fromAttribute:a.converter}:((r=a.converter)==null?void 0:r.fromAttribute)!==void 0?a.converter:X;this._$Em=o,this[o]=n.fromAttribute(t,a.type),this._$Em=null}}requestUpdate(e,t,s){if(e!==void 0){if(s??(s=this.constructor.getPropertyOptions(e)),!(s.hasChanged??_e)(this[e],t))return;this.P(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,s){this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,a]of o)a.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],a)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(o=>{var r;return(r=o.hostUpdate)==null?void 0:r.call(o)}),this.update(t)):this._$EU()}catch(o){throw e=!1,this._$EU(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var o;return(o=s.hostUpdated)==null?void 0:o.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[D("elementProperties")]=new Map,P[D("finalized")]=new Map,te==null||te({ReactiveElement:P}),(C.reactiveElementVersions??(C.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ut={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:_e},mt=(i=ut,e,t)=>{const{kind:s,metadata:o}=t;let r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),r.set(t.name,i),s==="accessor"){const{name:a}=t;return{set(n){const l=e.get.call(this);e.set.call(this,n),this.requestUpdate(a,l,i)},init(n){return n!==void 0&&this.P(a,void 0,i),n}}}if(s==="setter"){const{name:a}=t;return function(n){const l=this[a];e.call(this,n),this.requestUpdate(a,l,i)}}throw Error("Unsupported decorator location: "+s)};function v(i){return(e,t)=>typeof t=="object"?mt(i,e,t):((s,o,r)=>{const a=o.hasOwnProperty(r);return o.constructor.createProperty(r,a?{...s,wrapped:!0}:s),a?Object.getOwnPropertyDescriptor(o,r):void 0})(i,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function j(i){return v({...i,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ve=(i,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(i,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $e(i,e){return(t,s,o)=>{const r=a=>{var n;return((n=a.renderRoot)==null?void 0:n.querySelector(i))??null};return Ve(t,s,{get(){return r(this)}})}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function vt(i){return(e,t)=>{const{slot:s,selector:o}=i??{},r="slot"+(s?`[name=${s}]`:":not([name])");return Ve(e,t,{get(){var l;const a=(l=this.renderRoot)==null?void 0:l.querySelector(r),n=(a==null?void 0:a.assignedElements(i))??[];return o===void 0?n:n.filter(p=>p.matches(o))}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=globalThis,Q=H.trustedTypes,Me=Q?Q.createPolicy("lit-html",{createHTML:i=>i}):void 0,Be="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,je="?"+k,ft=`<${je}>`,M=document,O=()=>M.createComment(""),N=i=>i===null||typeof i!="object"&&typeof i!="function",Ee=Array.isArray,gt=i=>Ee(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",se=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Re=/-->/g,Le=/>/g,S=RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,Pe=/"/g,qe=/^(?:script|style|textarea|title)$/i,bt=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),$=bt(1),R=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Ue=new WeakMap,T=M.createTreeWalker(M,129);function Fe(i,e){if(!Ee(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Me!==void 0?Me.createHTML(e):e}const yt=(i,e)=>{const t=i.length-1,s=[];let o,r=e===2?"<svg>":e===3?"<math>":"",a=z;for(let n=0;n<t;n++){const l=i[n];let p,m,u=-1,w=0;for(;w<l.length&&(a.lastIndex=w,m=a.exec(l),m!==null);)w=a.lastIndex,a===z?m[1]==="!--"?a=Re:m[1]!==void 0?a=Le:m[2]!==void 0?(qe.test(m[2])&&(o=RegExp("</"+m[2],"g")),a=S):m[3]!==void 0&&(a=S):a===S?m[0]===">"?(a=o??z,u=-1):m[1]===void 0?u=-2:(u=a.lastIndex-m[2].length,p=m[1],a=m[3]===void 0?S:m[3]==='"'?Pe:Ie):a===Pe||a===Ie?a=S:a===Re||a===Le?a=z:(a=S,o=void 0);const A=a===S&&i[n+1].startsWith("/>")?" ":"";r+=a===z?l+ft:u>=0?(s.push(p),l.slice(0,u)+Be+l.slice(u)+k+A):l+k+(u===-2?n:A)}return[Fe(i,r+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class V{constructor({strings:e,_$litType$:t},s){let o;this.parts=[];let r=0,a=0;const n=e.length-1,l=this.parts,[p,m]=yt(e,t);if(this.el=V.createElement(p,s),T.currentNode=this.el.content,t===2||t===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(o=T.nextNode())!==null&&l.length<n;){if(o.nodeType===1){if(o.hasAttributes())for(const u of o.getAttributeNames())if(u.endsWith(Be)){const w=m[a++],A=o.getAttribute(u).split(k),G=/([.?@])?(.*)/.exec(w);l.push({type:1,index:r,name:G[2],strings:A,ctor:G[1]==="."?wt:G[1]==="?"?_t:G[1]==="@"?$t:ee}),o.removeAttribute(u)}else u.startsWith(k)&&(l.push({type:6,index:r}),o.removeAttribute(u));if(qe.test(o.tagName)){const u=o.textContent.split(k),w=u.length-1;if(w>0){o.textContent=Q?Q.emptyScript:"";for(let A=0;A<w;A++)o.append(u[A],O()),T.nextNode(),l.push({type:2,index:++r});o.append(u[w],O())}}}else if(o.nodeType===8)if(o.data===je)l.push({type:2,index:r});else{let u=-1;for(;(u=o.data.indexOf(k,u+1))!==-1;)l.push({type:7,index:r}),u+=k.length-1}r++}}static createElement(e,t){const s=M.createElement("template");return s.innerHTML=e,s}}function U(i,e,t=i,s){var a,n;if(e===R)return e;let o=s!==void 0?(a=t._$Co)==null?void 0:a[s]:t._$Cl;const r=N(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==r&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),r===void 0?o=void 0:(o=new r(i),o._$AT(i,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=o:t._$Cl=o),o!==void 0&&(e=U(i,o._$AS(i,e.values),o,s)),e}class xt{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,o=((e==null?void 0:e.creationScope)??M).importNode(t,!0);T.currentNode=o;let r=T.nextNode(),a=0,n=0,l=s[0];for(;l!==void 0;){if(a===l.index){let p;l.type===2?p=new q(r,r.nextSibling,this,e):l.type===1?p=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(p=new Et(r,this,e)),this._$AV.push(p),l=s[++n]}a!==(l==null?void 0:l.index)&&(r=T.nextNode(),a++)}return T.currentNode=M,o}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class q{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,o){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),N(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==R&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):gt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:s}=e,o=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=V.createElement(Fe(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===o)this._$AH.p(t);else{const a=new xt(o,this),n=a.u(this.options);a.p(t),this.T(n),this._$AH=a}}_$AC(e){let t=Ue.get(e.strings);return t===void 0&&Ue.set(e.strings,t=new V(e)),t}k(e){Ee(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,o=0;for(const r of e)o===t.length?t.push(s=new q(this.O(O()),this.O(O()),this,this.options)):s=t[o],s._$AI(r),o++;o<t.length&&(this._$AR(s&&s._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,o,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(e,t=this,s,o){const r=this.strings;let a=!1;if(r===void 0)e=U(this,e,t,0),a=!N(e)||e!==this._$AH&&e!==R,a&&(this._$AH=e);else{const n=e;let l,p;for(e=r[0],l=0;l<r.length-1;l++)p=U(this,n[s+l],t,l),p===R&&(p=this._$AH[l]),a||(a=!N(p)||p!==this._$AH[l]),p===d?e=d:e!==d&&(e+=(p??"")+r[l+1]),this._$AH[l]=p}a&&!o&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class wt extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}}class _t extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}}class $t extends ee{constructor(e,t,s,o,r){super(e,t,s,o,r),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??d)===R)return;const s=this._$AH,o=e===d&&s!==d||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==d&&(s===d||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Et{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}}const oe=H.litHtmlPolyfillSupport;oe==null||oe(V,q),(H.litHtmlVersions??(H.litHtmlVersions=[])).push("3.2.1");const At=(i,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let o=s._$litPart$;if(o===void 0){const r=(t==null?void 0:t.renderBefore)??null;s._$litPart$=o=new q(e.insertBefore(O(),r),r,void 0,t??{})}return o._$AI(i),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class y extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=At(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return R}}var Oe;y._$litElement$=!0,y.finalized=!0,(Oe=globalThis.litElementHydrateSupport)==null||Oe.call(globalThis,{LitElement:y});const ie=globalThis.litElementPolyfillSupport;ie==null||ie({LitElement:y});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class kt extends y{connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){return $`<span class="shadow"></span>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ct=L`:host,.shadow,.shadow::before,.shadow::after{border-radius:inherit;inset:0;position:absolute;transition-duration:inherit;transition-property:inherit;transition-timing-function:inherit}:host{display:flex;pointer-events:none;transition-property:box-shadow,opacity}.shadow::before,.shadow::after{content:"";transition-property:box-shadow,opacity;--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000))}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color);opacity:.15}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ce=class extends kt{};ce.styles=[Ct];ce=h([B("md-elevation")],ce);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ge=Symbol("attachableController");let Z;Z=new MutationObserver(i=>{var e;for(const t of i)(e=t.target[Ge])==null||e.hostConnected()});class Ye{get htmlFor(){return this.host.getAttribute("for")}set htmlFor(e){e===null?this.host.removeAttribute("for"):this.host.setAttribute("for",e)}get control(){return this.host.hasAttribute("for")?!this.htmlFor||!this.host.isConnected?null:this.host.getRootNode().querySelector(`#${this.htmlFor}`):this.currentControl||this.host.parentElement}set control(e){e?this.attach(e):this.detach()}constructor(e,t){this.host=e,this.onControlChange=t,this.currentControl=null,e.addController(this),e[Ge]=this,Z==null||Z.observe(e,{attributeFilter:["for"]})}attach(e){e!==this.currentControl&&(this.setCurrentControl(e),this.host.removeAttribute("for"))}detach(){this.setCurrentControl(null),this.host.setAttribute("for","")}hostConnected(){this.setCurrentControl(this.control)}hostDisconnected(){this.setCurrentControl(null)}setCurrentControl(e){this.onControlChange(this.currentControl,e),this.currentControl=e}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const St=["focusin","focusout","pointerdown"];class Ae extends y{constructor(){super(...arguments),this.visible=!1,this.inward=!1,this.attachableController=new Ye(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}handleEvent(e){var t;if(!e[ze]){switch(e.type){default:return;case"focusin":this.visible=((t=this.control)==null?void 0:t.matches(":focus-visible"))??!1;break;case"focusout":case"pointerdown":this.visible=!1;break}e[ze]=!0}}onControlChange(e,t){for(const s of St)e==null||e.removeEventListener(s,this),t==null||t.addEventListener(s,this)}update(e){e.has("visible")&&this.dispatchEvent(new Event("visibility-changed")),super.update(e)}}h([v({type:Boolean,reflect:!0})],Ae.prototype,"visible",void 0);h([v({type:Boolean,reflect:!0})],Ae.prototype,"inward",void 0);const ze=Symbol("handledByFocusRing");/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Tt=L`:host{animation-delay:0s,calc(var(--md-focus-ring-duration, 600ms)*.25);animation-duration:calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);animation-timing-function:cubic-bezier(0.2, 0, 0, 1);box-sizing:border-box;color:var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));display:none;pointer-events:none;position:absolute}:host([visible]){display:flex}:host(:not([inward])){animation-name:outward-grow,outward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) + var(--md-focus-ring-outward-offset, 2px));inset:calc(-1*var(--md-focus-ring-outward-offset, 2px));outline:var(--md-focus-ring-width, 3px) solid currentColor}:host([inward]){animation-name:inward-grow,inward-shrink;border-end-end-radius:calc(var(--md-focus-ring-shape-end-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start, var(--md-focus-ring-shape, var(--md-sys-shape-corner-full, 9999px))) - var(--md-focus-ring-inward-offset, 0px));border:var(--md-focus-ring-width, 3px) solid currentColor;inset:var(--md-focus-ring-inward-offset, 0px)}@keyframes outward-grow{from{outline-width:0}to{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes outward-shrink{from{outline-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-grow{from{border-width:0}to{border-width:var(--md-focus-ring-active-width, 8px)}}@keyframes inward-shrink{from{border-width:var(--md-focus-ring-active-width, 8px)}}@media(prefers-reduced-motion){:host{animation:none}}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let de=class extends Ae{};de.styles=[Tt];de=h([B("md-focus-ring")],de);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Rt=i=>(...e)=>({_$litDirective$:i,values:e});class Lt{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ke=Rt(class extends Lt{constructor(i){var e;if(super(i),i.type!==Mt.ATTRIBUTE||i.name!=="class"||((e=i.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(e=>i[e]).join(" ")+" "}update(i,[e]){var s,o;if(this.st===void 0){this.st=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!((s=this.nt)!=null&&s.has(r))&&this.st.add(r);return this.render(e)}const t=i.element.classList;for(const r of this.st)r in e||(t.remove(r),this.st.delete(r));for(const r in e){const a=!!e[r];a===this.st.has(r)||(o=this.nt)!=null&&o.has(r)||(a?(t.add(r),this.st.add(r)):(t.remove(r),this.st.delete(r)))}return R}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const It={STANDARD:"cubic-bezier(0.2, 0, 0, 1)",STANDARD_ACCELERATE:"cubic-bezier(.3,0,1,1)",STANDARD_DECELERATE:"cubic-bezier(0,0,0,1)",EMPHASIZED:"cubic-bezier(.3,0,0,1)",EMPHASIZED_ACCELERATE:"cubic-bezier(.3,0,.8,.15)",EMPHASIZED_DECELERATE:"cubic-bezier(.05,.7,.1,1)"};/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Pt=450,De=225,Ut=.2,zt=10,Dt=75,Ht=.35,Ot="::after",Nt="forwards";var f;(function(i){i[i.INACTIVE=0]="INACTIVE",i[i.TOUCH_DELAY=1]="TOUCH_DELAY",i[i.HOLDING=2]="HOLDING",i[i.WAITING_FOR_CLICK=3]="WAITING_FOR_CLICK"})(f||(f={}));const Vt=["click","contextmenu","pointercancel","pointerdown","pointerenter","pointerleave","pointerup"],Bt=150,re=window.matchMedia("(forced-colors: active)");class F extends y{constructor(){super(...arguments),this.disabled=!1,this.hovered=!1,this.pressed=!1,this.rippleSize="",this.rippleScale="",this.initialSize=0,this.state=f.INACTIVE,this.checkBoundsAfterContextMenu=!1,this.attachableController=new Ye(this,this.onControlChange.bind(this))}get htmlFor(){return this.attachableController.htmlFor}set htmlFor(e){this.attachableController.htmlFor=e}get control(){return this.attachableController.control}set control(e){this.attachableController.control=e}attach(e){this.attachableController.attach(e)}detach(){this.attachableController.detach()}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-hidden","true")}render(){const e={hovered:this.hovered,pressed:this.pressed};return $`<div class="surface ${Ke(e)}"></div>`}update(e){e.has("disabled")&&this.disabled&&(this.hovered=!1,this.pressed=!1),super.update(e)}handlePointerenter(e){this.shouldReactToEvent(e)&&(this.hovered=!0)}handlePointerleave(e){this.shouldReactToEvent(e)&&(this.hovered=!1,this.state!==f.INACTIVE&&this.endPressAnimation())}handlePointerup(e){if(this.shouldReactToEvent(e)){if(this.state===f.HOLDING){this.state=f.WAITING_FOR_CLICK;return}if(this.state===f.TOUCH_DELAY){this.state=f.WAITING_FOR_CLICK,this.startPressAnimation(this.rippleStartEvent);return}}}async handlePointerdown(e){if(this.shouldReactToEvent(e)){if(this.rippleStartEvent=e,!this.isTouch(e)){this.state=f.WAITING_FOR_CLICK,this.startPressAnimation(e);return}this.checkBoundsAfterContextMenu&&!this.inBounds(e)||(this.checkBoundsAfterContextMenu=!1,this.state=f.TOUCH_DELAY,await new Promise(t=>{setTimeout(t,Bt)}),this.state===f.TOUCH_DELAY&&(this.state=f.HOLDING,this.startPressAnimation(e)))}}handleClick(){if(!this.disabled){if(this.state===f.WAITING_FOR_CLICK){this.endPressAnimation();return}this.state===f.INACTIVE&&(this.startPressAnimation(),this.endPressAnimation())}}handlePointercancel(e){this.shouldReactToEvent(e)&&this.endPressAnimation()}handleContextmenu(){this.disabled||(this.checkBoundsAfterContextMenu=!0,this.endPressAnimation())}determineRippleSize(){const{height:e,width:t}=this.getBoundingClientRect(),s=Math.max(e,t),o=Math.max(Ht*s,Dt),r=Math.floor(s*Ut),n=Math.sqrt(t**2+e**2)+zt;this.initialSize=r,this.rippleScale=`${(n+o)/r}`,this.rippleSize=`${r}px`}getNormalizedPointerEventCoords(e){const{scrollX:t,scrollY:s}=window,{left:o,top:r}=this.getBoundingClientRect(),a=t+o,n=s+r,{pageX:l,pageY:p}=e;return{x:l-a,y:p-n}}getTranslationCoordinates(e){const{height:t,width:s}=this.getBoundingClientRect(),o={x:(s-this.initialSize)/2,y:(t-this.initialSize)/2};let r;return e instanceof PointerEvent?r=this.getNormalizedPointerEventCoords(e):r={x:s/2,y:t/2},r={x:r.x-this.initialSize/2,y:r.y-this.initialSize/2},{startPoint:r,endPoint:o}}startPressAnimation(e){var a;if(!this.mdRoot)return;this.pressed=!0,(a=this.growAnimation)==null||a.cancel(),this.determineRippleSize();const{startPoint:t,endPoint:s}=this.getTranslationCoordinates(e),o=`${t.x}px, ${t.y}px`,r=`${s.x}px, ${s.y}px`;this.growAnimation=this.mdRoot.animate({top:[0,0],left:[0,0],height:[this.rippleSize,this.rippleSize],width:[this.rippleSize,this.rippleSize],transform:[`translate(${o}) scale(1)`,`translate(${r}) scale(${this.rippleScale})`]},{pseudoElement:Ot,duration:Pt,easing:It.STANDARD,fill:Nt})}async endPressAnimation(){this.rippleStartEvent=void 0,this.state=f.INACTIVE;const e=this.growAnimation;let t=1/0;if(typeof(e==null?void 0:e.currentTime)=="number"?t=e.currentTime:e!=null&&e.currentTime&&(t=e.currentTime.to("ms").value),t>=De){this.pressed=!1;return}await new Promise(s=>{setTimeout(s,De-t)}),this.growAnimation===e&&(this.pressed=!1)}shouldReactToEvent(e){if(this.disabled||!e.isPrimary||this.rippleStartEvent&&this.rippleStartEvent.pointerId!==e.pointerId)return!1;if(e.type==="pointerenter"||e.type==="pointerleave")return!this.isTouch(e);const t=e.buttons===1;return this.isTouch(e)||t}inBounds({x:e,y:t}){const{top:s,left:o,bottom:r,right:a}=this.getBoundingClientRect();return e>=o&&e<=a&&t>=s&&t<=r}isTouch({pointerType:e}){return e==="touch"}async handleEvent(e){if(!(re!=null&&re.matches))switch(e.type){case"click":this.handleClick();break;case"contextmenu":this.handleContextmenu();break;case"pointercancel":this.handlePointercancel(e);break;case"pointerdown":await this.handlePointerdown(e);break;case"pointerenter":this.handlePointerenter(e);break;case"pointerleave":this.handlePointerleave(e);break;case"pointerup":this.handlePointerup(e);break}}onControlChange(e,t){for(const s of Vt)e==null||e.removeEventListener(s,this),t==null||t.addEventListener(s,this)}}h([v({type:Boolean,reflect:!0})],F.prototype,"disabled",void 0);h([j()],F.prototype,"hovered",void 0);h([j()],F.prototype,"pressed",void 0);h([$e(".surface")],F.prototype,"mdRoot",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const jt=L`:host{display:flex;margin:auto;pointer-events:none}:host([disabled]){display:none}@media(forced-colors: active){:host{display:none}}:host,.surface{border-radius:inherit;position:absolute;inset:0;overflow:hidden}.surface{-webkit-tap-highlight-color:rgba(0,0,0,0)}.surface::before,.surface::after{content:"";opacity:0;position:absolute}.surface::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));inset:0;transition:opacity 15ms linear,background-color 15ms linear}.surface::after{background:radial-gradient(closest-side, var(--md-ripple-pressed-color, var(--md-sys-color-on-surface, #1d1b20)) max(100% - 70px, 65%), transparent 100%);transform-origin:center center;transition:opacity 375ms linear}.hovered::before{background-color:var(--md-ripple-hover-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-ripple-hover-opacity, 0.08)}.pressed::after{opacity:var(--md-ripple-pressed-opacity, 0.12);transition-duration:105ms}
`;/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let he=class extends F{};he.styles=[jt];he=h([B("md-ripple")],he);/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const We=["role","ariaAtomic","ariaAutoComplete","ariaBusy","ariaChecked","ariaColCount","ariaColIndex","ariaColSpan","ariaCurrent","ariaDisabled","ariaExpanded","ariaHasPopup","ariaHidden","ariaInvalid","ariaKeyShortcuts","ariaLabel","ariaLevel","ariaLive","ariaModal","ariaMultiLine","ariaMultiSelectable","ariaOrientation","ariaPlaceholder","ariaPosInSet","ariaPressed","ariaReadOnly","ariaRequired","ariaRoleDescription","ariaRowCount","ariaRowIndex","ariaRowSpan","ariaSelected","ariaSetSize","ariaSort","ariaValueMax","ariaValueMin","ariaValueNow","ariaValueText"],qt=We.map(Ze);function ae(i){return qt.includes(i)}function Ze(i){return i.replace("aria","aria-").replace(/Elements?/g,"").toLowerCase()}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Y=Symbol("privateIgnoreAttributeChangesFor");function Je(i){var e;class t extends i{constructor(){super(...arguments),this[e]=new Set}attributeChangedCallback(o,r,a){if(!ae(o)){super.attributeChangedCallback(o,r,a);return}if(this[Y].has(o))return;this[Y].add(o),this.removeAttribute(o),this[Y].delete(o);const n=ue(o);a===null?delete this.dataset[n]:this.dataset[n]=a,this.requestUpdate(ue(o),r)}getAttribute(o){return ae(o)?super.getAttribute(pe(o)):super.getAttribute(o)}removeAttribute(o){super.removeAttribute(o),ae(o)&&(super.removeAttribute(pe(o)),this.requestUpdate())}}return e=Y,Ft(t),t}function Ft(i){for(const e of We){const t=Ze(e),s=pe(t),o=ue(t);i.createProperty(e,{attribute:t,noAccessor:!0}),i.createProperty(Symbol(s),{attribute:s,noAccessor:!0}),Object.defineProperty(i.prototype,e,{configurable:!0,enumerable:!0,get(){return this.dataset[o]??null},set(r){const a=this.dataset[o]??null;r!==a&&(r===null?delete this.dataset[o]:this.dataset[o]=r,this.requestUpdate(e,a))}})}}function pe(i){return`data-${i}`}function ue(i){return i.replace(/-\w/,e=>e[1].toUpperCase())}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const b=Symbol("internals"),ne=Symbol("privateInternals");function Xe(i){class e extends i{get[b](){return this[ne]||(this[ne]=this.attachInternals()),this[ne]}}return e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Gt(i){i.addInitializer(e=>{const t=e;t.addEventListener("click",async s=>{const{type:o,[b]:r}=t,{form:a}=r;if(!(!a||o==="button")&&(await new Promise(n=>{setTimeout(n)}),!s.defaultPrevented)){if(o==="reset"){a.reset();return}a.addEventListener("submit",n=>{Object.defineProperty(n,"submitter",{configurable:!0,enumerable:!0,get:()=>t})},{capture:!0,once:!0}),r.setFormValue(t.value),a.requestSubmit()}})})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Qe(i){const e=new MouseEvent("click",{bubbles:!0});return i.dispatchEvent(e),e}function et(i){return i.currentTarget!==i.target||i.composedPath()[0]!==i.target||i.target.disabled?!1:!Yt(i)}function Yt(i){const e=me;return e&&(i.preventDefault(),i.stopImmediatePropagation()),Kt(),e}let me=!1;async function Kt(){me=!0,await null,me=!1}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Wt=Je(Xe(y));class g extends Wt{get name(){return this.getAttribute("name")??""}set name(e){this.setAttribute("name",e)}get form(){return this[b].form}constructor(){super(),this.disabled=!1,this.softDisabled=!1,this.href="",this.target="",this.trailingIcon=!1,this.hasIcon=!1,this.type="submit",this.value="",this.addEventListener("click",this.handleClick.bind(this))}focus(){var e;(e=this.buttonElement)==null||e.focus()}blur(){var e;(e=this.buttonElement)==null||e.blur()}render(){var o;const e=!this.href&&(this.disabled||this.softDisabled),t=this.href?this.renderLink():this.renderButton(),s=this.href?"link":"button";return $`
      ${(o=this.renderElevationOrOutline)==null?void 0:o.call(this)}
      <div class="background"></div>
      <md-focus-ring part="focus-ring" for=${s}></md-focus-ring>
      <md-ripple
        part="ripple"
        for=${s}
        ?disabled="${e}"></md-ripple>
      ${t}
    `}renderButton(){const{ariaLabel:e,ariaHasPopup:t,ariaExpanded:s}=this;return $`<button
      id="button"
      class="button"
      ?disabled=${this.disabled}
      aria-disabled=${this.softDisabled||d}
      aria-label="${e||d}"
      aria-haspopup="${t||d}"
      aria-expanded="${s||d}">
      ${this.renderContent()}
    </button>`}renderLink(){const{ariaLabel:e,ariaHasPopup:t,ariaExpanded:s}=this;return $`<a
      id="link"
      class="button"
      aria-label="${e||d}"
      aria-haspopup="${t||d}"
      aria-expanded="${s||d}"
      href=${this.href}
      target=${this.target||d}
      >${this.renderContent()}
    </a>`}renderContent(){const e=$`<slot
      name="icon"
      @slotchange="${this.handleSlotChange}"></slot>`;return $`
      <span class="touch"></span>
      ${this.trailingIcon?d:e}
      <span class="label"><slot></slot></span>
      ${this.trailingIcon?e:d}
    `}handleClick(e){if(!this.href&&this.softDisabled){e.stopImmediatePropagation(),e.preventDefault();return}!et(e)||!this.buttonElement||(this.focus(),Qe(this.buttonElement))}handleSlotChange(){this.hasIcon=this.assignedIcons.length>0}}Gt(g);g.formAssociated=!0;g.shadowRootOptions={mode:"open",delegatesFocus:!0};h([v({type:Boolean,reflect:!0})],g.prototype,"disabled",void 0);h([v({type:Boolean,attribute:"soft-disabled",reflect:!0})],g.prototype,"softDisabled",void 0);h([v()],g.prototype,"href",void 0);h([v()],g.prototype,"target",void 0);h([v({type:Boolean,attribute:"trailing-icon",reflect:!0})],g.prototype,"trailingIcon",void 0);h([v({type:Boolean,attribute:"has-icon",reflect:!0})],g.prototype,"hasIcon",void 0);h([v()],g.prototype,"type",void 0);h([v({reflect:!0})],g.prototype,"value",void 0);h([$e(".button")],g.prototype,"buttonElement",void 0);h([vt({slot:"icon",flatten:!0})],g.prototype,"assignedIcons",void 0);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Zt extends g{renderElevationOrOutline(){return $`<md-elevation part="elevation"></md-elevation>`}}/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Jt=L`:host{--_container-color: var(--md-filled-tonal-button-container-color, var(--md-sys-color-secondary-container, #e8def8));--_container-elevation: var(--md-filled-tonal-button-container-elevation, 0);--_container-height: var(--md-filled-tonal-button-container-height, 40px);--_container-shadow-color: var(--md-filled-tonal-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-tonal-button-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-container-elevation: var(--md-filled-tonal-button-disabled-container-elevation, 0);--_disabled-container-opacity: var(--md-filled-tonal-button-disabled-container-opacity, 0.12);--_disabled-label-text-color: var(--md-filled-tonal-button-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-label-text-opacity: var(--md-filled-tonal-button-disabled-label-text-opacity, 0.38);--_focus-container-elevation: var(--md-filled-tonal-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-tonal-button-focus-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-container-elevation: var(--md-filled-tonal-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-tonal-button-hover-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-state-layer-color: var(--md-filled-tonal-button-hover-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-state-layer-opacity: var(--md-filled-tonal-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-tonal-button-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_label-text-font: var(--md-filled-tonal-button-label-text-font, var(--md-sys-typescale-label-large-font, var(--md-ref-typeface-plain, Roboto)));--_label-text-line-height: var(--md-filled-tonal-button-label-text-line-height, var(--md-sys-typescale-label-large-line-height, 1.25rem));--_label-text-size: var(--md-filled-tonal-button-label-text-size, var(--md-sys-typescale-label-large-size, 0.875rem));--_label-text-weight: var(--md-filled-tonal-button-label-text-weight, var(--md-sys-typescale-label-large-weight, var(--md-ref-typeface-weight-medium, 500)));--_pressed-container-elevation: var(--md-filled-tonal-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-tonal-button-pressed-label-text-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-color: var(--md-filled-tonal-button-pressed-state-layer-color, var(--md-sys-color-on-secondary-container, #1d192b));--_pressed-state-layer-opacity: var(--md-filled-tonal-button-pressed-state-layer-opacity, 0.12);--_disabled-icon-color: var(--md-filled-tonal-button-disabled-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_disabled-icon-opacity: var(--md-filled-tonal-button-disabled-icon-opacity, 0.38);--_focus-icon-color: var(--md-filled-tonal-button-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_hover-icon-color: var(--md-filled-tonal-button-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_icon-color: var(--md-filled-tonal-button-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_icon-size: var(--md-filled-tonal-button-icon-size, 18px);--_pressed-icon-color: var(--md-filled-tonal-button-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));--_container-shape-start-start: var(--md-filled-tonal-button-container-shape-start-start, var(--md-filled-tonal-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-start-end: var(--md-filled-tonal-button-container-shape-start-end, var(--md-filled-tonal-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-end: var(--md-filled-tonal-button-container-shape-end-end, var(--md-filled-tonal-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_container-shape-end-start: var(--md-filled-tonal-button-container-shape-end-start, var(--md-filled-tonal-button-container-shape, var(--md-sys-shape-corner-full, 9999px)));--_leading-space: var(--md-filled-tonal-button-leading-space, 24px);--_trailing-space: var(--md-filled-tonal-button-trailing-space, 24px);--_with-leading-icon-leading-space: var(--md-filled-tonal-button-with-leading-icon-leading-space, 16px);--_with-leading-icon-trailing-space: var(--md-filled-tonal-button-with-leading-icon-trailing-space, 24px);--_with-trailing-icon-leading-space: var(--md-filled-tonal-button-with-trailing-icon-leading-space, 24px);--_with-trailing-icon-trailing-space: var(--md-filled-tonal-button-with-trailing-icon-trailing-space, 16px)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Xt=L`md-elevation{transition-duration:280ms}:host(:is([disabled],[soft-disabled])) md-elevation{transition:none}md-elevation{--md-elevation-level: var(--_container-elevation);--md-elevation-shadow-color: var(--_container-shadow-color)}:host(:focus-within) md-elevation{--md-elevation-level: var(--_focus-container-elevation)}:host(:hover) md-elevation{--md-elevation-level: var(--_hover-container-elevation)}:host(:active) md-elevation{--md-elevation-level: var(--_pressed-container-elevation)}:host(:is([disabled],[soft-disabled])) md-elevation{--md-elevation-level: var(--_disabled-container-elevation)}
`;/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Qt=L`:host{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end);box-sizing:border-box;cursor:pointer;display:inline-flex;gap:8px;min-height:var(--_container-height);outline:none;padding-block:calc((var(--_container-height) - max(var(--_label-text-line-height),var(--_icon-size)))/2);padding-inline-start:var(--_leading-space);padding-inline-end:var(--_trailing-space);place-content:center;place-items:center;position:relative;font-family:var(--_label-text-font);font-size:var(--_label-text-size);line-height:var(--_label-text-line-height);font-weight:var(--_label-text-weight);text-overflow:ellipsis;text-wrap:nowrap;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-color: var(--_hover-state-layer-color);--md-ripple-pressed-color: var(--_pressed-state-layer-color);--md-ripple-hover-opacity: var(--_hover-state-layer-opacity);--md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)}md-focus-ring{--md-focus-ring-shape-start-start: var(--_container-shape-start-start);--md-focus-ring-shape-start-end: var(--_container-shape-start-end);--md-focus-ring-shape-end-end: var(--_container-shape-end-end);--md-focus-ring-shape-end-start: var(--_container-shape-end-start)}:host(:is([disabled],[soft-disabled])){cursor:default;pointer-events:none}.button{border-radius:inherit;cursor:inherit;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;min-width:calc(64px - var(--_leading-space) - var(--_trailing-space));width:100%;z-index:0;height:100%;font:inherit;color:var(--_label-text-color);padding:0;gap:inherit;text-transform:inherit}.button::-moz-focus-inner{padding:0;border:0}:host(:hover) .button{color:var(--_hover-label-text-color)}:host(:focus-within) .button{color:var(--_focus-label-text-color)}:host(:active) .button{color:var(--_pressed-label-text-color)}.background{background-color:var(--_container-color);border-radius:inherit;inset:0;position:absolute}.label{overflow:hidden}:is(.button,.label,.label slot),.label ::slotted(*){text-overflow:inherit}:host(:is([disabled],[soft-disabled])) .label{color:var(--_disabled-label-text-color);opacity:var(--_disabled-label-text-opacity)}:host(:is([disabled],[soft-disabled])) .background{background-color:var(--_disabled-container-color);opacity:var(--_disabled-container-opacity)}@media(forced-colors: active){.background{border:1px solid CanvasText}:host(:is([disabled],[soft-disabled])){--_disabled-icon-color: GrayText;--_disabled-icon-opacity: 1;--_disabled-container-opacity: 1;--_disabled-label-text-color: GrayText;--_disabled-label-text-opacity: 1}}:host([has-icon]:not([trailing-icon])){padding-inline-start:var(--_with-leading-icon-leading-space);padding-inline-end:var(--_with-leading-icon-trailing-space)}:host([has-icon][trailing-icon]){padding-inline-start:var(--_with-trailing-icon-leading-space);padding-inline-end:var(--_with-trailing-icon-trailing-space)}::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;fill:currentColor;flex-shrink:0;color:var(--_icon-color);font-size:var(--_icon-size);inline-size:var(--_icon-size);block-size:var(--_icon-size)}:host(:hover) ::slotted([slot=icon]){color:var(--_hover-icon-color)}:host(:focus-within) ::slotted([slot=icon]){color:var(--_focus-icon-color)}:host(:active) ::slotted([slot=icon]){color:var(--_pressed-icon-color)}:host(:is([disabled],[soft-disabled])) ::slotted([slot=icon]){color:var(--_disabled-icon-color);opacity:var(--_disabled-icon-opacity)}.touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--_container-height))/2) 0}:host([touch-target=none]) .touch{display:none}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ve=class extends Zt{};ve.styles=[Qt,Xt,Jt];ve=h([B("md-filled-tonal-button")],ve);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function es(i,e){e.bubbles&&(!i.shadowRoot||e.composed)&&e.stopPropagation();const t=Reflect.construct(e.constructor,[e.type,e]),s=i.dispatchEvent(t);return s||e.preventDefault(),s}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const fe=Symbol("createValidator"),ge=Symbol("getValidityAnchor"),le=Symbol("privateValidator"),_=Symbol("privateSyncValidity"),K=Symbol("privateCustomValidationMessage");function ts(i){var e;class t extends i{constructor(){super(...arguments),this[e]=""}get validity(){return this[_](),this[b].validity}get validationMessage(){return this[_](),this[b].validationMessage}get willValidate(){return this[_](),this[b].willValidate}checkValidity(){return this[_](),this[b].checkValidity()}reportValidity(){return this[_](),this[b].reportValidity()}setCustomValidity(o){this[K]=o,this[_]()}requestUpdate(o,r,a){super.requestUpdate(o,r,a),this[_]()}firstUpdated(o){super.firstUpdated(o),this[_]()}[(e=K,_)](){this[le]||(this[le]=this[fe]());const{validity:o,validationMessage:r}=this[le].getValidity(),a=!!this[K],n=this[K]||r;this[b].setValidity({...o,customError:a},n,this[ge]()??void 0)}[fe](){throw new Error("Implement [createValidator]")}[ge](){throw new Error("Implement [getValidityAnchor]")}}return t}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const J=Symbol("getFormValue"),be=Symbol("getFormState");function ss(i){class e extends i{get form(){return this[b].form}get labels(){return this[b].labels}get name(){return this.getAttribute("name")??""}set name(s){this.setAttribute("name",s)}get disabled(){return this.hasAttribute("disabled")}set disabled(s){this.toggleAttribute("disabled",s)}attributeChangedCallback(s,o,r){if(s==="name"||s==="disabled"){const a=s==="disabled"?o!==null:o;this.requestUpdate(s,a);return}super.attributeChangedCallback(s,o,r)}requestUpdate(s,o,r){super.requestUpdate(s,o,r),this[b].setFormValue(this[J](),this[be]())}[J](){throw new Error("Implement [getFormValue]")}[be](){return this[J]()}formDisabledCallback(s){this.disabled=s}}return e.formAssociated=!0,h([v({noAccessor:!0})],e.prototype,"name",null),h([v({type:Boolean,noAccessor:!0})],e.prototype,"disabled",null),e}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class os{constructor(e){this.getCurrentState=e,this.currentValidity={validity:{},validationMessage:""}}getValidity(){const e=this.getCurrentState();if(!(!this.prevState||!this.equals(this.prevState,e)))return this.currentValidity;const{validity:s,validationMessage:o}=this.computeValidity(e);return this.prevState=this.copy(e),this.currentValidity={validationMessage:o,validity:{badInput:s.badInput,customError:s.customError,patternMismatch:s.patternMismatch,rangeOverflow:s.rangeOverflow,rangeUnderflow:s.rangeUnderflow,stepMismatch:s.stepMismatch,tooLong:s.tooLong,tooShort:s.tooShort,typeMismatch:s.typeMismatch,valueMissing:s.valueMissing}},this.currentValidity}}/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class is extends os{computeValidity(e){return this.checkboxControl||(this.checkboxControl=document.createElement("input"),this.checkboxControl.type="checkbox"),this.checkboxControl.checked=e.checked,this.checkboxControl.required=e.required,{validity:this.checkboxControl.validity,validationMessage:this.checkboxControl.validationMessage}}equals(e,t){return e.checked===t.checked&&e.required===t.required}copy({checked:e,required:t}){return{checked:e,required:t}}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const rs=Je(ts(ss(Xe(y))));class x extends rs{constructor(){super(),this.checked=!1,this.indeterminate=!1,this.required=!1,this.value="on",this.prevChecked=!1,this.prevDisabled=!1,this.prevIndeterminate=!1,this.addEventListener("click",e=>{!et(e)||!this.input||(this.focus(),Qe(this.input))})}update(e){(e.has("checked")||e.has("disabled")||e.has("indeterminate"))&&(this.prevChecked=e.get("checked")??this.checked,this.prevDisabled=e.get("disabled")??this.disabled,this.prevIndeterminate=e.get("indeterminate")??this.indeterminate),super.update(e)}render(){const e=!this.prevChecked&&!this.prevIndeterminate,t=this.prevChecked&&!this.prevIndeterminate,s=this.prevIndeterminate,o=this.checked&&!this.indeterminate,r=this.indeterminate,a=Ke({disabled:this.disabled,selected:o||r,unselected:!o&&!r,checked:o,indeterminate:r,"prev-unselected":e,"prev-checked":t,"prev-indeterminate":s,"prev-disabled":this.prevDisabled}),{ariaLabel:n,ariaInvalid:l}=this;return $`
      <div class="container ${a}">
        <input
          type="checkbox"
          id="input"
          aria-checked=${r?"mixed":d}
          aria-label=${n||d}
          aria-invalid=${l||d}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .indeterminate=${this.indeterminate}
          .checked=${this.checked}
          @input=${this.handleInput}
          @change=${this.handleChange} />

        <div class="outline"></div>
        <div class="background"></div>
        <md-focus-ring part="focus-ring" for="input"></md-focus-ring>
        <md-ripple for="input" ?disabled=${this.disabled}></md-ripple>
        <svg class="icon" viewBox="0 0 18 18" aria-hidden="true">
          <rect class="mark short" />
          <rect class="mark long" />
        </svg>
      </div>
    `}handleInput(e){const t=e.target;this.checked=t.checked,this.indeterminate=t.indeterminate}handleChange(e){es(this,e)}[J](){return!this.checked||this.indeterminate?null:this.value}[be](){return String(this.checked)}formResetCallback(){this.checked=this.hasAttribute("checked")}formStateRestoreCallback(e){this.checked=e==="true"}[fe](){return new is(()=>this)}[ge](){return this.input}}x.shadowRootOptions={...y.shadowRootOptions,delegatesFocus:!0};h([v({type:Boolean})],x.prototype,"checked",void 0);h([v({type:Boolean})],x.prototype,"indeterminate",void 0);h([v({type:Boolean})],x.prototype,"required",void 0);h([v()],x.prototype,"value",void 0);h([j()],x.prototype,"prevChecked",void 0);h([j()],x.prototype,"prevDisabled",void 0);h([j()],x.prototype,"prevIndeterminate",void 0);h([$e("input")],x.prototype,"input",void 0);/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const as=L`:host{border-start-start-radius:var(--md-checkbox-container-shape-start-start, var(--md-checkbox-container-shape, 2px));border-start-end-radius:var(--md-checkbox-container-shape-start-end, var(--md-checkbox-container-shape, 2px));border-end-end-radius:var(--md-checkbox-container-shape-end-end, var(--md-checkbox-container-shape, 2px));border-end-start-radius:var(--md-checkbox-container-shape-end-start, var(--md-checkbox-container-shape, 2px));display:inline-flex;height:var(--md-checkbox-container-size, 18px);position:relative;vertical-align:top;width:var(--md-checkbox-container-size, 18px);-webkit-tap-highlight-color:rgba(0,0,0,0);cursor:pointer}:host([disabled]){cursor:default}:host([touch-target=wrapper]){margin:max(0px,(48px - var(--md-checkbox-container-size, 18px))/2)}md-focus-ring{height:44px;inset:unset;width:44px}input{appearance:none;height:48px;margin:0;opacity:0;outline:none;position:absolute;width:48px;z-index:1;cursor:inherit}:host([touch-target=none]) input{height:100%;width:100%}.container{border-radius:inherit;display:flex;height:100%;place-content:center;place-items:center;position:relative;width:100%}.outline,.background,.icon{inset:0;position:absolute}.outline,.background{border-radius:inherit}.outline{border-color:var(--md-checkbox-outline-color, var(--md-sys-color-on-surface-variant, #49454f));border-style:solid;border-width:var(--md-checkbox-outline-width, 2px);box-sizing:border-box}.background{background-color:var(--md-checkbox-selected-container-color, var(--md-sys-color-primary, #6750a4))}.background,.icon{opacity:0;transition-duration:150ms,50ms;transition-property:transform,opacity;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15),linear;transform:scale(0.6)}:where(.selected) :is(.background,.icon){opacity:1;transition-duration:350ms,50ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1),linear;transform:scale(1)}md-ripple{border-radius:var(--md-checkbox-state-layer-shape, var(--md-sys-shape-corner-full, 9999px));height:var(--md-checkbox-state-layer-size, 40px);inset:unset;width:var(--md-checkbox-state-layer-size, 40px);--md-ripple-hover-color: var(--md-checkbox-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-hover-opacity: var(--md-checkbox-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-pressed-opacity: var(--md-checkbox-pressed-state-layer-opacity, 0.12)}.selected md-ripple{--md-ripple-hover-color: var(--md-checkbox-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--md-ripple-hover-opacity: var(--md-checkbox-selected-hover-state-layer-opacity, 0.08);--md-ripple-pressed-color: var(--md-checkbox-selected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--md-ripple-pressed-opacity: var(--md-checkbox-selected-pressed-state-layer-opacity, 0.12)}.icon{fill:var(--md-checkbox-selected-icon-color, var(--md-sys-color-on-primary, #fff));height:var(--md-checkbox-icon-size, 18px);width:var(--md-checkbox-icon-size, 18px)}.mark.short{height:2px;transition-property:transform,height;width:2px}.mark.long{height:2px;transition-property:transform,width;width:10px}.mark{animation-duration:150ms;animation-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15);transition-duration:150ms;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15)}.selected .mark{animation-duration:350ms;animation-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1);transition-duration:350ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1)}.checked .mark,.prev-checked.unselected .mark{transform:scaleY(-1) translate(7px, -14px) rotate(45deg)}.checked .mark.short,.prev-checked.unselected .mark.short{height:5.6568542495px}.checked .mark.long,.prev-checked.unselected .mark.long{width:11.313708499px}.indeterminate .mark,.prev-indeterminate.unselected .mark{transform:scaleY(-1) translate(4px, -10px) rotate(0deg)}.prev-unselected .mark{transition-property:none}.prev-unselected.checked .mark.long{animation-name:prev-unselected-to-checked}@keyframes prev-unselected-to-checked{from{width:0}}:where(:hover) .outline{border-color:var(--md-checkbox-hover-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-hover-outline-width, 2px)}:where(:hover) .background{background:var(--md-checkbox-selected-hover-container-color, var(--md-sys-color-primary, #6750a4))}:where(:hover) .icon{fill:var(--md-checkbox-selected-hover-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:focus-within) .outline{border-color:var(--md-checkbox-focus-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-focus-outline-width, 2px)}:where(:focus-within) .background{background:var(--md-checkbox-selected-focus-container-color, var(--md-sys-color-primary, #6750a4))}:where(:focus-within) .icon{fill:var(--md-checkbox-selected-focus-icon-color, var(--md-sys-color-on-primary, #fff))}:where(:active) .outline{border-color:var(--md-checkbox-pressed-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-pressed-outline-width, 2px)}:where(:active) .background{background:var(--md-checkbox-selected-pressed-container-color, var(--md-sys-color-primary, #6750a4))}:where(:active) .icon{fill:var(--md-checkbox-selected-pressed-icon-color, var(--md-sys-color-on-primary, #fff))}:where(.disabled,.prev-disabled) :is(.background,.icon,.mark){animation-duration:0s;transition-duration:0s}:where(.disabled) .outline{border-color:var(--md-checkbox-disabled-outline-color, var(--md-sys-color-on-surface, #1d1b20));border-width:var(--md-checkbox-disabled-outline-width, 2px);opacity:var(--md-checkbox-disabled-container-opacity, 0.38)}:where(.selected.disabled) .outline{visibility:hidden}:where(.selected.disabled) .background{background:var(--md-checkbox-selected-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));opacity:var(--md-checkbox-selected-disabled-container-opacity, 0.38)}:where(.disabled) .icon{fill:var(--md-checkbox-selected-disabled-icon-color, var(--md-sys-color-surface, #fef7ff))}@media(forced-colors: active){.background{background-color:CanvasText}.selected.disabled .background{background-color:GrayText;opacity:1}.outline{border-color:CanvasText}.disabled .outline{border-color:GrayText;opacity:1}.icon{fill:Canvas}}
`;/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let ye=class extends x{};ye.styles=[as];ye=h([B("md-checkbox")],ye);class ns extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["want","watched","reviews"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
            <style>
                
                :host {
                    display: flex;
                    padding: 8px 16px;
                    justify-content: center;
                    align-items: center;
                    align-self: stretch;
                }
                
                .stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1 0 0;
                }
                
                .count {
                    color: #E0E2ED;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px;
                }
                
                .label {
                    color: #8B90A0;
                    text-align: center;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }
            </style>
            
                <div class="stat">
                    <span class="count">${this.getAttribute("want")||0}</span>
                    <span class="label">Want</span>
                </div>
                <div class="stat">
                    <span class="count">${this.getAttribute("watched")||0}</span>
                    <span class="label">Watched</span>
                </div>
                <div class="stat">
                    <span class="count">${this.getAttribute("reviews")||0}</span>
                    <span class="label">Reviews</span>
                </div>
        `}}customElements.define("movie-stats",ns);class ls extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}set cast(e){const s=e.filter(o=>!!(o.character||o.job==="Director"&&o.media_type!=="tv")).reduce((o,r)=>{if(!o.some(a=>a.id===r.id)){let a="";r.character?a=r.character.split("/")[0].trim():r.job==="Director"&&(a="Director"),o.push({...r,character:a,job:a})}return o},[]);this._cast=s,this.render()}render(){if(!this._cast)return;const e=this._cast.map(t=>`
            <div class="cast-item">
                <div class="cast-photo-wrapper">
                    <img class="cast-photo" 
                         src="https://image.tmdb.org/t/p/w185${t.profile_path}"
                         alt="${t.name}"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="cast-photo-placeholder" style="display: none;">
                        ${t.name.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div class="cast-info">
                    <p class="cast-name">${t.name}</p>
                    <p class="cast-role">${t.character||t.job}</p>
                </div>
            </div>
        `).join("");this.shadowRoot.innerHTML=`
            <style>
                :host {
                    display: flex;
                    padding: 16px 0px;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                    border-radius: 40px;
                    background: var(--md-sys-color-surface);
                    overflow: hidden;
                }

                h1,
                h2,
                h3,
                h4,
                p {
                    margin: 0;
                }
                
                .title {
                    text-align: center;
                    font-size: 22px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 28px;
                    color: var(--md-sys-color-on-surface);
                }
                
                .title-info {
                    display: flex;
                    padding: 8px 16px 16px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    align-self: stretch;
                }
                
                .cast-container {
                    position: relative;
                    display: flex;
                    padding: 8px 0;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    align-self: stretch;
                }

                .cast-list-wrapper {
                    width: 100%;
                    overflow-x: auto;
                    scrollbar-width: none;
                }

                .cast-list-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .cast-container::before,
                .cast-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 16px;
                    pointer-events: none;
                    z-index: 1;
                }

                .cast-container::before {
                    left: 0;
                    background: linear-gradient(to right, #10131B, transparent);
                }

                .cast-container::after {
                    right: 0;
                    background: linear-gradient(to left, #10131B, transparent);
                }

                .cast-list {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    flex-wrap: nowrap;
                    padding: 0 16px;
                }

                .cast-item {
                    display: flex;
                    width: 72px;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }
                
                .cast-photo-wrapper {
                    width: 72px;
                    height: 72px;
                    border-radius: 999px;
                    overflow: hidden;
                    background: #272A32;
                }
                
                .cast-photo {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%);
                }
                
                .cast-photo-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #272A32;
                    color: #E0E2ED;
                    font-size: 24px;
                    font-weight: 600;
                }
                
                .cast-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    align-self: stretch;
                }
                
                .cast-name {
                    align-self: stretch;
                    color: var(--md-sys-color-on-surface);
                    text-align: center;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }
                
                .cast-role {
                    align-self: stretch;
                    color: var(--md-sys-color-outline);
                    text-align: center;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }
            </style>
            
            <div class="title-info">
                <div class="title">Cast and Crew</div>
            </div>

            <div class="cast-container">
                <div class="cast-list-wrapper">
                    <div class="cast-list">
                        ${e}
                        <div style="padding-right: 4px; flex-shrink: 0;"> </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("movie-cast",ls);class cs extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}set recommendations(e){this._recommendations=e,this.render(),this.setupEventListeners()}set currentMovie(e){this.setAttribute("current-movie",e),this.render()}setupEventListeners(){this.shadowRoot.addEventListener("click",e=>{const t=e.target.closest(".movie-item");if(t){const s=t.dataset.id,o=t.dataset.type;this.dispatchEvent(new CustomEvent("movie-selected",{detail:{movieId:s,type:o},bubbles:!0,composed:!0}))}})}render(){if(!this._recommendations)return;const e=this._recommendations.map(t=>`
            <div class="movie-item" 
                 data-id="${t.id}"
                 data-type="${t.media_type||"movie"}"
                 style="cursor: pointer;">
                <img class="movie-poster"
                    src="https://image.tmdb.org/t/p/w342${t.poster_path}"
                    alt="${t.title||t.name}"
                    onerror="this.style.backgroundColor='#272A32'"
                    loading="lazy">
                <p class="movie-title">${t.title||t.name}</p>
            </div>
        `).join("");this.shadowRoot.innerHTML=`
            <style>
                :host {
                    display: flex;
                    padding: 16px 0px;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                    border-radius: 40px;
                    background: var(--md-sys-color-surface);
                    overflow: hidden;
                }

                .title-info {
                    display: flex;
                    padding: 8px 16px 16px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    align-self: stretch;
                }

                .title {
                    text-align: center;
                    font-size: 22px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 28px;
                    color: var(--md-sys-color-on-surface);
                }
                
                .recommendations-container {
                    position: relative;
                    display: flex;
                    padding: 8px 0;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    align-self: stretch;
                }

                .recommendations-list-wrapper {
                    width: 100%;
                    overflow-x: auto;
                    scrollbar-width: none;
                }

                .recommendations-list-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .recommendations-container::before,
                .recommendations-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 16px;
                    pointer-events: none;
                    z-index: 1;
                }

                .recommendations-container::before {
                    left: 0;
                    background: linear-gradient(to right, #10131B, transparent);
                }

                .recommendations-container::after {
                    right: 0;
                    background: linear-gradient(to left, #10131B, transparent);
                }

                .recommendations-list {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    flex-wrap: nowrap;
                    padding: 0 16px;
                }
                
                .movie-item {
                    display: flex;
                    width: 100px;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }
                
                .movie-poster {
                    aspect-ratio: 2/3;
                    border-radius: 12px;
                    overflow: hidden;
                    width: 100px;
                    border-radius: 4px;
                    object-fit: cover;
                }
                
                .movie-title {
                    align-self: stretch;
                    color: var(--md-sys-color-on-surface);
                    text-align: center;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                    margin: 0;
                }
            </style>

            <div class="title-info">
                <div class="title">If you like ${this.getAttribute("current-movie")}</div>
            </div>

            <div class="recommendations-container">
                <div class="recommendations-list-wrapper">
                    <div class="recommendations-list">
                        ${e}
                        <div style="padding-right: 4px; flex-shrink: 0;"> </div>
                    </div>
                </div>
            </div>
        `}}customElements.define("movie-recommendations",cs);class ds extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}set info(e){this._info=e,this.render()}render(){if(!this._info)return;console.log("Info in MovieInfo:",this._info);const{type:e,title:t,rating:s,overview:o,genres:r,seasons:a}=this._info,n=e==="tv"?this._renderTVMeta():this._renderMovieMeta();if(this.shadowRoot.innerHTML=`
            <style>
                :host {
                    display: flex;
                    padding: 16px 0px;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                    border-radius: 40px;
                    background: var(--md-sys-color-surface);
                    overflow: hidden;
                }

                h1, h2, h3, h4, p {
                    margin: 0;
                }                

                .title {
                    text-align: center;
                    font-size: 22px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 28px;
                    color: var(--md-sys-color-on-surface);
                }
                
                .title-info {
                    display: flex;
                    padding: 8px 16px 16px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    align-self: stretch;
                }

                .meta {
                    display: flex;
                    padding: 0px 16px;
                    justify-content: center;
                    align-items: flex-start;
                    align-self: stretch;
                    text-align: center;
                    gap: 4px;
                    color: var(--md-sys-color-outline);
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }
                
                .overview {
                    align-self: stretch;
                    font-size: 14px;
                    line-height: 20px;
                    font-style: normal;
                    font-weight: 600;
                    color: var(--md-sys-color-on-surface);
                }
                
                .overview-container {
                    display: flex;
                    padding: 8px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-end;
                    align-self: stretch;
                }

                .genres-container {
                    position: relative;
                    display: flex;
                    padding: 8px 0;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    align-self: stretch;
                    height: 40px;
                }

                .genres-list-wrapper {
                    width: 100%;
                    height: 100%;
                    overflow-x: auto;
                    overflow-y: hidden;
                    scrollbar-width: none;
                }

                .genres-list-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .genres-container::before,
                .genres-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 16px;
                    pointer-events: none;
                    z-index: 1;
                }

                .genres-container::before {
                    left: 0;
                    background: linear-gradient(to right, #10131B, transparent);
                }

                .genres-container::after {
                    right: 0;
                    background: linear-gradient(to left, #10131B, transparent);
                }

                .genres-list {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    flex-wrap: nowrap;
                    padding: 0 16px;
                }

                md-filled-tonal-button {
                    flex-shrink: 0;
                    --md-filled-tonal-button-container-shape: 1000px;
                    --md-filled-tonal-button-container-color: var(--md-sys-color-surface-container-high);
                    --md-filled-tonal-button-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-label-text-font: 600 14px sans-serif;
                    --md-filled-tonal-button-container-height: 40px;
                    --md-filled-tonal-button-hover-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-pressed-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-focus-label-text-color: var(--md-sys-color-on-surface);
                }

                .subheader {
                    display: flex;
                    padding: 16px 16px 4px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    align-self: stretch;
                    color: var(--md-sys-color-outline);
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px;
                }
            </style>

            <div class="title-info">
                <div class="title">${t}</div>
                ${n}
            </div>
            
            ${e==="tv"&&a?`
                <tv-seasons></tv-seasons>
            `:""}

            <div class="overview-container">
                <p class="overview">${o}</p>
            </div>
            
            <div class="subheader">Genres</div>

            <div class="genres-container">
                <div class="genres-list-wrapper">
                    <div class="genres-list">
                        ${r.map(l=>`
                            <md-filled-tonal-button>${l}</md-filled-tonal-button>
                        `).join("")}
                        <div style="padding-right: 4px; flex-shrink: 0;"> </div>
                    </div>
                </div>
            </div>
        `,e==="tv"&&a){const l=this.shadowRoot.querySelector("tv-seasons");l&&(console.log("Setting seasons data:",a),l.seasons=a)}}_renderTVMeta(){const{rating:e,firstAirDate:t,lastAirDate:s,status:o,numberOfSeasons:r,numberOfEpisodes:a,air_date:n}=this._info,l=t?new Date(t).getFullYear():n?new Date(n).getFullYear():this._info.first_air_date?new Date(this._info.first_air_date).getFullYear():"???",p=s?new Date(s).getFullYear():o==="Ended"?new Date().getFullYear():"Present";return`
            <div class="meta">
                <span>${e} IMDb</span>
                <span>•</span>
                <span>${l} - ${p}</span>
                <span>•</span>
                <span>${o==="Ended"?"Ended":"In progress"}</span>
            </div>
        `}_renderMovieMeta(){const{rating:e,releaseDate:t,runtime:s}=this._info,r=new Date(t).toLocaleDateString("en-EN",{year:"numeric",month:"long",day:"numeric"}),a=Math.floor(s/60),n=s%60,l=`${a} ч ${n} мин`;return`
            <div class="meta">
                <span>${e} IMDb</span>
                <span>•</span>
                <span>${r}</span>
                <span>•</span>
                <span>${l}</span>
            </div>
        `}_pluralize(e,t,s,o){let r=Math.abs(e);return r%=100,r>=5&&r<=20?o:(r%=10,r===1?t:r>=2&&r<=4?s:o)}}customElements.define("movie-info",ds);class hs extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}set movie(e){this._movie=e,this.render()}render(){this._movie&&(this.shadowRoot.innerHTML=`
            <style>
                .action-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    align-self: stretch;
                    border-radius: 40px;
                    position: relative;
                    overflow: hidden;
                }
                
                .action-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url(https://image.tmdb.org/t/p/w500${this._movie.poster_path}) lightgray 50% / cover no-repeat;
                    border-radius: 42px;
                }
                
                .action-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.60);
                    backdrop-filter: blur(20px);
                }
                
                .image-container {
                    display: flex;
                    padding: 32px 80px 16px 80px;
                    flex-direction: column;
                    align-items: center;
                    align-self: stretch;
                    z-index: 1;
                }
                
                .poster img {
                    width: 100%;
                    height: auto;
                    display: block;
                    border-radius: 4px;
                }
                
                .action-buttons {
                    display: flex;
                    padding: 16px;
                    align-items: center;
                    gap: 8px;
                    align-self: stretch;
                    z-index: 1;
                }
                
                md-filled-tonal-button {
                    flex: 1 0 0;
                    --md-filled-tonal-button-container-shape: 1000px;
                    --md-filled-tonal-button-label-text-font: 600 14px sans-serif;
                    --md-sys-color-secondary-container: rgba(255, 255, 255, 0.32);
                    --md-sys-color-on-secondary-container: #FFF;
                    height: 48px;
                }
            </style>
            
            <div class="action-container">
                <div class="image-container">
                    <div class="poster">
                        <img src="https://image.tmdb.org/t/p/w500${this._movie.poster_path}" 
                            alt="${this._movie.title}"
                            onerror="console.error('Failed to load image:', this.src)">
                    </div>
                </div>
                
                <div class="action-buttons">
                    <md-filled-tonal-button>Want</md-filled-tonal-button>
                    <md-filled-tonal-button>Watched</md-filled-tonal-button>
                </div>
            </div>
        `)}}customElements.define("movie-poster",hs);class ps extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}set seasons(e){this._seasons=e,this.render()}render(){var o;if(!this._seasons||!this._seasons.length)return;const e=this._seasons.map((r,a)=>`
            <md-filled-tonal-button class="season-tab" data-season="${a+1}" 
                ${a===0?"selected":""}>
                Сезон ${a+1}
            </md-filled-tonal-button>
        `).join(""),s=((o=this._seasons[0].episodes)==null?void 0:o.map(r=>`
            <div class="episode-wrapper">
                <div class="episode-item">
                    <div class="episode-number">${r.episode_number}</div>
                    <div class="episode-info">
                        <div class="episode-title">${r.name}</div>
                        <div class="episode-date">${new Date(r.air_date).toLocaleDateString("ru-RU")}</div>
                    </div>
                    <md-checkbox touch-target="wrapper"></md-checkbox>
                </div>
                <div class="divider"></div>
            </div>
        `).join(""))||"";this.shadowRoot.innerHTML=`
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                }

                .seasons-container {
                    position: relative;
                    display: flex;
                    padding: 8px 0;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    align-self: stretch;
                    height: 40px;
                }

                .seasons-list-wrapper {
                    width: 100%;
                    height: 100%;
                    overflow-x: auto;
                    overflow-y: hidden;
                    scrollbar-width: none;
                    -webkit-overflow-scrolling: touch;
                }

                .seasons-list-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .seasons-container::before,
                .seasons-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 16px;
                    pointer-events: none;
                    z-index: 1;
                }

                .seasons-container::before {
                    left: 0;
                    background: linear-gradient(to right, #10131B, transparent);
                }

                .seasons-container::after {
                    right: 0;
                    background: linear-gradient(to left, #10131B, transparent);
                }

                .seasons-list {
                    display: flex;
                    align-items: flex-start;
                    flex-wrap: nowrap;
                    padding: 0 16px;
                }

                .season-tab {
                    --md-filled-tonal-button-container-color: rgba(255, 255, 255, 0.0);
                    --md-filled-tonal-button-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-hover-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-pressed-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-container-shape: 1000px;
                    --md-filled-tonal-button-label-text-font: 600 14px sans-serif;
                    --md-filled-tonal-button-container-height: 40px;
                    --md-filled-tonal-button-focus-label-text-color: var(--md-sys-color-on-surface);
                    flex: 0 0 auto;
                }

                .season-tab[selected] {
                    --md-filled-tonal-button-container-color: var(--md-sys-color-surface-container-high);
                }

                .episodes-list {
                    display: flex;
                    padding: 8px 0px;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                }

                .episode-item {
                    display: flex;
                    padding: 10px 16px;
                    align-items: center;
                    gap: 4px;
                    align-self: stretch;
                }

                .episode-number {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 20px;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    color: var(--md-sys-color-outline);
                    text-overflow: ellipsis;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px;
                }

                .episode-info {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    flex: 1 0 0;
                }

                .episode-title {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    color: var(--md-sys-color-on-surface);;
                    text-overflow: ellipsis;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px;
                }

                .episode-date {
                    overflow: hidden;
                    color: var(--md-sys-color-outline);
                    text-overflow: ellipsis;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }

                .episode-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-self: stretch;
                }

                .divider {
                    height: 1px;
                    background: var(--md-sys-color-outline-variant);
                    margin: 8px 16px;
                }

                md-checkbox {
                    --md-checkbox-container-shape: 4px;
                    --md-checkbox-outline-color: rgba(255, 255, 255, 0.5);
                    --md-checkbox-selected-container-color: #E0E2ED;
                    --md-checkbox-selected-icon-color: #10131B;
                    margin-right: auto;
                }
            </style>

            <div class="seasons-container">
                <div class="seasons-list-wrapper">
                    <div class="seasons-list">
                        ${e}
                        <div style="padding-right: 4px; flex-shrink: 0;"> </div>
                    </div>
                </div>
            </div>

            <div class="episodes-list">
                ${s}
            </div>
        `,this.shadowRoot.querySelectorAll(".season-tab").forEach(r=>{r.addEventListener("click",()=>this._handleSeasonChange(r.dataset.season))})}_handleSeasonChange(e){const t=this._seasons[e-1],s=this.shadowRoot.querySelector(".episodes-list");this.shadowRoot.querySelectorAll(".season-tab").forEach(o=>{o.toggleAttribute("selected",o.dataset.season===e)}),s.innerHTML=t.episodes.map(o=>`
            <div class="episode-wrapper">
                <div class="episode-item">
                    <div class="episode-number">${o.episode_number}</div>
                    <div class="episode-info">
                        <div class="episode-title">${o.name}</div>
                        <div class="episode-date">${new Date(o.air_date).toLocaleDateString("ru-RU")}</div>
                    </div>
                    <md-checkbox touch-target="wrapper"></md-checkbox>
                </div>
                <div class="divider"></div>
            </div>
        `).join("")}}customElements.define("tv-seasons",ps);class us extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    width: 100%;
                    box-sizing: border-box;
                    padding-bottom: 72px;
                }
            </style>
            <movie-poster></movie-poster>
            <movie-info></movie-info>
            <movie-cast></movie-cast>
            <movie-recommendations></movie-recommendations>
        `}set movie(e){this._movie=e,this.render()}render(){if(this._movie){if(console.log("Movie data:",this._movie),this.shadowRoot.querySelector("movie-poster").movie=this._movie,this._movie.credits){const e=this.shadowRoot.querySelector("movie-cast");e.cast=this._movie.credits.cast}if(this._movie){const e={title:this._movie.title||this._movie.name,rating:this._movie.vote_average,releaseDate:this._movie.release_date,firstAirDate:this._movie.first_air_date,lastAirDate:this._movie.last_air_date,status:this._movie.status,numberOfSeasons:this._movie.number_of_seasons,numberOfEpisodes:this._movie.number_of_episodes,runtime:this._movie.runtime,overview:this._movie.overview,genres:this._movie.genres.map(s=>s.name),type:this._movie.type||"movie",seasons:this._movie.seasons,air_date:this._movie.air_date};console.log("Info being passed:",e);const t=this.shadowRoot.querySelector("movie-info");t.info=e}if(this._movie.recommendations){const e=this.shadowRoot.querySelector("movie-recommendations");e.recommendations=this._movie.recommendations,e.currentMovie=this._movie.title||this._movie.name}}}}customElements.define("movie-card",us);const c={API_KEY:"8e2566462de35ecf36a54f4a04235ca8",BASE_URL:"https://api.themoviedb.org/3",IMAGE_BASE_URL:"https://image.tmdb.org/t/p/w500",LANGUAGE:"en-EN"};class E{static async getPopularMovies(e=1){console.log("Fetching popular movies...");try{const t=`${c.BASE_URL}/movie/popular?api_key=${c.API_KEY}&language=${c.LANGUAGE}&page=${e}`;console.log("Request URL:",t);const s=await fetch(t);if(!s.ok)throw new Error(`HTTP error! status: ${s.status}`);const o=await s.json();return console.log("Popular movies data:",o),o}catch(t){throw console.error("Error fetching popular movies:",t),t}}static async getMovieDetails(e){try{return await(await fetch(`${c.BASE_URL}/movie/${e}?api_key=${c.API_KEY}&language=${c.LANGUAGE}`)).json()}catch(t){throw console.error("Error fetching movie details:",t),t}}static async searchMovies(e){try{const t=await fetch(`${c.BASE_URL}/search/movie?api_key=${c.API_KEY}&language=${c.LANGUAGE}&query=${encodeURIComponent(e)}`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){throw console.error("Error searching movies:",t),t}}static async getMovieCredits(e){try{const t=await fetch(`${c.BASE_URL}/movie/${e}/credits?api_key=${c.API_KEY}&language=${c.LANGUAGE}`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){throw console.error("Error fetching movie credits:",t),t}}static async getMovieRecommendations(e){try{const t=await fetch(`${c.BASE_URL}/movie/${e}/recommendations?api_key=${c.API_KEY}&language=${c.LANGUAGE}`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){throw console.error("Error fetching movie recommendations:",t),t}}static async getFullMovieInfo(e,t="movie"){try{const[s,o,r]=await Promise.all([t==="movie"?this.getMovieDetails(e):this.getTVDetails(e),t==="movie"?this.getMovieCredits(e):this.getTVCredits(e),t==="movie"?this.getMovieRecommendations(e):this.getTVRecommendations(e)]);let a=[];t==="tv"&&(a=await this.getTVSeasons(e));const l=[...o.crew.filter(m=>t==="movie"?m.job==="Director":m.job==="Executive Producer"),...o.cast],p={...s,type:t,seasons:a,credits:{cast:l,crew:o.crew},recommendations:r.results};return console.log("Full result:",p),p}catch(s){throw console.error("Error fetching full info:",s),s}}static async searchMulti(e){try{const t=await fetch(`${c.BASE_URL}/search/multi?api_key=${c.API_KEY}&language=${c.LANGUAGE}&query=${encodeURIComponent(e)}`);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){throw console.error("Error searching:",t),t}}static async getTVDetails(e){try{const s=await(await fetch(`${c.BASE_URL}/tv/${e}?api_key=${c.API_KEY}&language=${c.LANGUAGE}`)).json();return console.log("TV Details:",s),s}catch(t){throw console.error("Error fetching TV details:",t),t}}static async getTVCredits(e){try{return await(await fetch(`${c.BASE_URL}/tv/${e}/credits?api_key=${c.API_KEY}&language=${c.LANGUAGE}`)).json()}catch(t){throw console.error("Error fetching TV credits:",t),t}}static async getTVRecommendations(e){try{return await(await fetch(`${c.BASE_URL}/tv/${e}/recommendations?api_key=${c.API_KEY}&language=${c.LANGUAGE}`)).json()}catch(t){throw console.error("Error fetching TV recommendations:",t),t}}static async getTVSeasons(e){try{const t=await this.getTVDetails(e);console.log("TV Details:",t);const s=t.seasons.filter(a=>a.season_number>0),o=[];for(const a of s){const n=fetch(`${c.BASE_URL}/tv/${e}/season/${a.season_number}?api_key=${c.API_KEY}&language=${c.LANGUAGE}`).then(l=>{if(!l.ok)throw new Error(`HTTP error! status: ${l.status}`);return l.json()});o.push(n)}const r=await Promise.all(o);return console.log("Seasons data:",r),r}catch(t){throw console.error("Error fetching TV seasons:",t),t}}static async getTrendingMovies(){try{const e=await fetch(`${c.BASE_URL}/trending/movie/day?api_key=${c.API_KEY}&language=${c.LANGUAGE}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return(await e.json()).results}catch(e){throw console.error("Error fetching trending movies:",e),e}}static async getAnticipatedMovies(){try{const e=await fetch(`${c.BASE_URL}/movie/upcoming?api_key=${c.API_KEY}&language=${c.LANGUAGE}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return(await e.json()).results}catch(e){throw console.error("Error fetching anticipated movies:",e),e}}static async getTrendingTV(){try{const e=await fetch(`${c.BASE_URL}/trending/tv/day?api_key=${c.API_KEY}&language=${c.LANGUAGE}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return(await e.json()).results}catch(e){throw console.error("Error fetching trending TV shows:",e),e}}static async getAnticipatedTV(){try{const e=await fetch(`${c.BASE_URL}/tv/on_the_air?api_key=${c.API_KEY}&language=${c.LANGUAGE}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return(await e.json()).results}catch(e){throw console.error("Error fetching anticipated TV shows:",e),e}}static async getPopularTV(){try{const e=await fetch(`${c.BASE_URL}/tv/popular?api_key=${c.API_KEY}&language=${c.LANGUAGE}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){throw console.error("Error fetching popular TV shows:",e),e}}static async getAiringTodayTV(){try{const e=await fetch(`${c.BASE_URL}/tv/airing_today?api_key=${c.API_KEY}&language=${c.LANGUAGE}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return(await e.json()).results}catch(e){throw console.error("Error fetching airing today TV shows:",e),e}}static async getTopRatedTV(){try{const e=await fetch(`${c.BASE_URL}/tv/top_rated?api_key=${c.API_KEY}&language=${c.LANGUAGE}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return(await e.json()).results}catch(e){throw console.error("Error fetching top rated TV shows:",e),e}}static async getOnTheAirTV(){try{const e=await fetch(`${c.BASE_URL}/tv/on_the_air?api_key=${c.API_KEY}&language=${c.LANGUAGE}`);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return await e.json()}catch(e){throw console.error("Error fetching on the air TV shows:",e),e}}}class ms extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._searchResults=[],this._recentSearches=this._loadRecentSearches(),this._activeTab="search"}_loadRecentSearches(){try{return JSON.parse(localStorage.getItem("recentSearches"))||[]}catch{return[]}}_saveRecentSearch(e){try{this._recentSearches.find(s=>s.id===e.id)||(this._recentSearches.unshift(e),this._recentSearches=this._recentSearches.slice(0,10),localStorage.setItem("recentSearches",JSON.stringify(this._recentSearches)),this.renderRecentMovies())}catch(t){console.error("Error saving recent search:",t)}}async connectedCallback(){await this.loadRecentMovies(),this.render(),this.setupEventListeners(),setTimeout(()=>{this.shadowRoot.querySelector("input").focus()},100)}async loadRecentMovies(){try{const e=await E.getPopularMovies();this._recentMovies=e.results.slice(0,10)}catch(e){console.error("Error loading recent movies:",e),this._recentMovies=[]}}setupEventListeners(){const e=this.shadowRoot.querySelector("input"),t=this.shadowRoot.querySelector(".clear-button");this.shadowRoot.querySelectorAll(".tab");let s;e.addEventListener("input",()=>{t.style.display=e.value?"block":"none",clearTimeout(s),s=setTimeout(async()=>{const o=e.value.trim();if(o.length>=2){const r=await E.searchMulti(o);this._searchResults=r.results,this.renderResults()}else this._searchResults=[],this.renderResults()},300)}),t.addEventListener("click",()=>{e.value="",t.style.display="none",this._searchResults=[],this.renderResults()}),this.shadowRoot.addEventListener("click",o=>{const r=o.target.closest(".tab");r&&(this.shadowRoot.querySelectorAll(".tab").forEach(n=>n.classList.remove("active")),r.classList.add("active"),this._activeTab=r.dataset.type,this.renderResults())}),this.shadowRoot.addEventListener("click",o=>{const r=o.target.closest(".result-item");if(r){const n=r.dataset.id,l=this._searchResults.find(p=>p.id.toString()===n);l&&(this._saveRecentSearch(l),this.dispatchEvent(new CustomEvent("movie-selected",{detail:{movieId:n,type:l.media_type},bubbles:!0,composed:!0})));return}const a=o.target.closest(".recent-item");if(a){const n=a.dataset.movieId,l=a.dataset.type;this.dispatchEvent(new CustomEvent("movie-selected",{detail:{movieId:n,type:l},bubbles:!0,composed:!0}))}})}renderRecentMovies(){const e=this.shadowRoot.querySelector(".recent-list");e.innerHTML=this._recentSearches.map(t=>`
                <div class="recent-item" 
                     data-movie-id="${t.id}"
                     data-type="${t.media_type}">
                    <img class="recent-poster"
                         src="https://image.tmdb.org/t/p/w342${t.poster_path}"
                         alt="${t.title||t.name}"
                         onerror="this.style.backgroundColor='#272A32'">
                    <p class="recent-title">${t.title||t.name}</p>
                </div>
            `).join("")}renderResults(){const e=this.shadowRoot.querySelector(".search-results"),t=this.shadowRoot.querySelector(".tabs"),s=this.shadowRoot.querySelector(".recent-section");if(!this._searchResults.length||this._searchResults.length===0){t.style.display="none",s.style.display="block",e.innerHTML=`
                <div class="empty-state">
                    <p>Начните вводить название фильма или сериала</p>
                </div>
            `;return}const o=this._searchResults.filter(n=>n.media_type==="movie"),r=this._searchResults.filter(n=>n.media_type==="tv");o.length>0||r.length>0?(t.style.display="flex",t.innerHTML=`
                <md-filled-tonal-button class="tab ${this._activeTab==="movies"?"active":""}" data-type="movies">
                    Movies ${o.length}
                </md-filled-tonal-button>
                <md-filled-tonal-button class="tab ${this._activeTab==="tv"?"active":""}" data-type="tv">
                    TV Shows ${r.length}
                </md-filled-tonal-button>
            `,s.style.display="none"):(t.style.display="none",s.style.display="block");const a=this._activeTab==="movies"?o:r;e.innerHTML=`
            <div class="results-list">
                ${a.map(n=>`
                    <div class="result-item" 
                         data-id="${n.id}"
                         data-type="${n.media_type}">
                        <img class="result-poster"
                             src="https://image.tmdb.org/t/p/w185${n.poster_path}"
                             alt="${n.title||n.name}"
                             onerror="this.style.backgroundColor='#272A32'">
                        <p class="result-title">${n.title||n.name}</p>
                    </div>
                `).join("")}
            </div>
        `}render(){this.shadowRoot.innerHTML=`
            <style>
                :host {
                    display: block;
                    max-width: 640px;
                    margin: 0 auto;
                }

                .search-container {
                    display: flex;
                    padding: 8px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    align-self: stretch;
                    gap: 16px;
                }

                .search-input-wrapper {
                    display: flex;
                    height: 48px;
                    align-items: center;
                    gap: 8px;
                    align-self: stretch;
                    border-radius: 1000px;
                    background: var(--md-sys-color-surface-bright);
                }

                .search-icon {
                    position: absolute;
                    left: 28px;
                    width: 24px;
                    height: 24px;
                    color: #8B90A0;
                }

                .clear-button {
                    position: absolute;
                    right: 28px;
                    width: 24px;
                    height: 24px;
                    border: none;
                    background: none;
                    color: #8B90A0;
                    cursor: pointer;
                    padding: 0;
                    display: none;
                }

                input {
                    width: 100%;
                    padding: 12px 48px;
                    border: none;
                    border-radius: 1000px;
                    background: #363942;
                    color: #8B90A0;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px;
                }

                input:focus {
                    outline: none;
                    background: #363942;
                }

                .tabs {
                    display: none;
                    align-items: center;
                    align-self: stretch;
                }

                .tab {
                    --md-filled-tonal-button-container-color: rgba(255, 255, 255, 0.0);
                    --md-filled-tonal-button-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-hover-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-pressed-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-container-shape: 1000px;
                    --md-filled-tonal-button-label-text-font: 600 14px sans-serif;
                    --md-filled-tonal-button-container-height: 40px;
                    --md-filled-tonal-button-focus-label-text-color: var(--md-sys-color-on-surface);
                }

                .tab.active {
                    --md-filled-tonal-button-container-color: var(--md-sys-color-surface-container-high);
                }

                .recent-section {
                    margin-bottom: 24px;
                }

                .section-title {
                    color: #E0E2ED;
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 16px;
                }

                .recent-list {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    padding: 8px 16px;
                    align-self: stretch;
                    overflow-x: auto;
                    scrollbar-width: none;
                }

                .recent-list::-webkit-scrollbar {
                    display: none;
                }

                .recent-item {
                    flex: 0 0 auto;
                    width: 128px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .recent-item:hover {
                    transform: scale(1.05);
                }

                .recent-poster {
                    width: 128px;
                    height: 192px;
                    border-radius: 8px;
                    object-fit: cover;
                    margin-bottom: 8px;
                }

                .recent-title {
                    color: #E0E2ED;
                    font-size: 14px;
                    font-weight: 500;
                    text-align: center;
                    margin: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .results-list {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    padding: 8px 16px;
                    align-self: stretch;
                    overflow-x: auto;
                    scrollbar-width: none;
                }

                .results-list::-webkit-scrollbar {
                    display: none;
                }

                .result-item {
                    flex: 0 0 auto;
                    width: 128px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .result-item:hover {
                    transform: scale(1.05);
                }

                .result-poster {
                    width: 128px;
                    height: 192px;
                    border-radius: 8px;
                    object-fit: cover;
                    margin-bottom: 8px;
                }

                .result-title {
                    color: #E0E2ED;
                    font-size: 14px;
                    font-weight: 500;
                    text-align: center;
                    margin: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .subheader {
                    display: flex;
                    padding: 32px 16px 4px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    align-self: stretch;
                    color: var(--md-sys-color-outline);
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px;
                }
            </style>

            <div class="search-container">
                <div class="search-input-wrapper">
                    <svg class="search-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L16.6569 16.6569M16.65 16.65L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z" stroke="#8B90A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <input type="text" placeholder="Movies or TV Shows...">
                    <svg class="clear-button" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#8B90A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    
                </div>

                <div class="tabs">
                    <div class="tab active">Movies</div>
                    <div class="tab">TV Shows</div>
                </div>
            </div>

            <div class="recent-section">
                <div class="subheader">Recent</div>
                <div class="recent-list">
                    <!-- Recent items will be inserted here -->
                </div>
            </div>

            <div class="search-results">
                <div class="empty-state">
                    <p>Начните вводить название фильма или сериала</p>
                </div>
            </div>
        `,this.renderRecentMovies()}}customElements.define("search-screen",ms);class vs extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._activeTab="search"}connectedCallback(){this.render(),this.setupEventListeners();const e=this.shadowRoot.querySelector(`[data-tab="${this._activeTab}"]`);e&&e.classList.add("active")}setActiveTab(e){this._activeTab=e,this.shadowRoot.querySelectorAll(".tab-item").forEach(s=>{s.classList.toggle("active",s.dataset.tab===e)})}render(){this.shadowRoot.innerHTML=`
            <style>
                :host {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: var(--md-sys-color-scrim);
                    z-index: 1000;
                }

                .tab-bar {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: 12px 16px;
                    gap: 8px;               
                }

                .tab-item {
                    position: relative;
                    display: flex;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 100px;
                    flex: 1 0 0;
                    align-self: stretch;                    
                }

                .tab-item.active {
                    background: var(--md-sys-color-surface-container-high);
                }

                .tab-item.active .tab-icon {
                    color: var(--md-sys-color-primary-container);
                }

                .tab-icon {
                    width: 24px;
                    height: 24px;
                }

                .tab-label {
                    display: none;
                }
            </style>

            <div class="tab-bar">
                <a class="tab-item" data-tab="profile">
                    <svg class="tab-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M12.6002 15C9.43012 15 6.61099 16.5306 4.81619 18.906C4.4299 19.4172 4.23675 19.6728 4.24307 20.0183C4.24795 20.2852 4.41555 20.6219 4.62556 20.7867C4.89738 21 5.27406 21 6.02742 21H19.173C19.9263 21 20.303 21 20.5748 20.7867C20.7848 20.6219 20.9524 20.2852 20.9573 20.0183C20.9636 19.6728 20.7705 19.4172 20.3842 18.906C18.5894 16.5306 15.7703 15 12.6002 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.6002 12C15.0855 12 17.1002 9.98528 17.1002 7.5C17.1002 5.01472 15.0855 3 12.6002 3C10.1149 3 8.10019 5.01472 8.10019 7.5C8.10019 9.98528 10.1149 12 12.6002 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="tab-label">Профиль</span>
                </a>

                <a class="tab-item" data-tab="movies">
                    <svg class="tab-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M2.80005 12H22.8M2.80005 7H7.80005M17.8 7H22.8M2.80005 17H7.80005M17.8 17H22.8M7.80005 22V2M17.8 22V2M7.60005 22H18C19.6802 22 20.5203 22 21.162 21.673C21.7265 21.3854 22.1854 20.9265 22.4731 20.362C22.8 19.7202 22.8 18.8802 22.8 17.2V6.8C22.8 5.11984 22.8 4.27976 22.4731 3.63803C22.1854 3.07354 21.7265 2.6146 21.162 2.32698C20.5203 2 19.6802 2 18 2H7.60005C5.91989 2 5.07981 2 4.43808 2.32698C3.87359 2.6146 3.41465 3.07354 3.12703 3.63803C2.80005 4.27976 2.80005 5.11984 2.80005 6.8V17.2C2.80005 18.8802 2.80005 19.7202 3.12703 20.362C3.41465 20.9265 3.87359 21.3854 4.43808 21.673C5.07981 22 5.91989 22 7.60005 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="tab-label">Фильмы</span>
                </a>
                <a class="tab-item" data-tab="tv">
                    <svg class="tab-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M7.57181 21C8.90661 20.3598 10.41 20 12 20C13.59 20 15.0934 20.3598 16.4282 21M6.8 17H17.2C18.8802 17 19.7202 17 20.362 16.673C20.9265 16.3854 21.3854 15.9265 21.673 15.362C22 14.7202 22 13.8802 22 12.2V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8V12.2C2 13.8802 2 14.7202 2.32698 15.362C2.6146 15.9265 3.07354 16.3854 3.63803 16.673C4.27976 17 5.11984 17 6.8 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="tab-label">Сериалы</span>
                </a>
                <a class="tab-item" data-tab="notifications">
                    <svg class="tab-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9.55439 21C10.2595 21.6224 11.1858 22 12.2002 22C13.2147 22 14.1409 21.6224 14.846 21M18.2002 8C18.2002 6.4087 17.5681 4.88258 16.4429 3.75736C15.3176 2.63214 13.7915 2 12.2002 2C10.6089 2 9.08279 2.63214 7.95757 3.75736C6.83236 4.88258 6.20021 6.4087 6.20021 8C6.20021 11.0902 5.42068 13.206 4.54988 14.6054C3.81534 15.7859 3.44807 16.3761 3.46154 16.5408C3.47645 16.7231 3.51507 16.7926 3.66199 16.9016C3.79467 17 4.3928 17 5.58907 17H18.8114C20.0076 17 20.6058 17 20.7384 16.9016C20.8854 16.7926 20.924 16.7231 20.9389 16.5408C20.9524 16.3761 20.5851 15.7859 19.8505 14.6054C18.9797 13.206 18.2002 11.0902 18.2002 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="tab-label">Уведомления</span>
                </a>
                <a class="tab-item" data-tab="search">
                    <svg class="tab-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M21.4001 21L17.057 16.6569M17.0501 16.65L17.057 16.6569M17.057 16.6569C18.5047 15.2091 19.4001 13.2091 19.4001 11C19.4001 6.58172 15.8184 3 11.4001 3C6.98187 3 3.40015 6.58172 3.40015 11C3.40015 15.4183 6.98187 19 11.4001 19C13.6093 19 15.6093 18.1046 17.057 16.6569Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="tab-label">Поиск</span>
                </a>
            </div>
        `}setupEventListeners(){this.shadowRoot.querySelectorAll(".tab-item").forEach(t=>{t.addEventListener("click",s=>{s.preventDefault();const o=t.dataset.tab;this.setActiveTab(o),this.dispatchEvent(new CustomEvent("tab-changed",{detail:{tab:o},bubbles:!0,composed:!0}))})})}}customElements.define("tab-bar",vs);class fs extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._trendingMovies=[],this._anticipatedMovies=[],this._popularMovies=[]}async connectedCallback(){console.log("MoviesScreen connecting...");try{await this.loadData(),console.log("Data loaded:",{trending:this._trendingMovies,anticipated:this._anticipatedMovies,popular:this._popularMovies}),this.render(),console.log("MoviesScreen rendered")}catch(e){console.error("Error in MoviesScreen:",e)}}async loadData(){try{const[e,t,s]=await Promise.all([E.getTrendingMovies(),E.getAnticipatedMovies(),E.getPopularMovies()]);this._trendingMovies=e,this._anticipatedMovies=t,this._popularMovies=(s==null?void 0:s.results)||[]}catch(e){console.error("Error loading movies:",e)}}render(){this.shadowRoot.innerHTML=`
            <style>
                :host {
                    padding-bottom: 80px;
                    padding-top: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 16px;                    
                }

                .section {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                }

                .section-article {
                    display: flex;
                    padding: 8px 16px 0px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-self: stretch;                
                    color: var(--md-sys-color-outline);
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }

                .section-title {
                    display: flex;
                    padding: 0px 16px 8px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-self: stretch;
                    color: var(--md-sys-color-on-surface);
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 32px;
                }

                /* Общие стили для скроллируемых контейнеров */
                .movies-scroll {
                    display: flex;
                    gap: 8px;
                    overflow-x: auto;
                    padding-bottom: 8px;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    padding: 8px 16px;
                }

                .movies-scroll::-webkit-scrollbar {
                    display: none;
                }

                /* Стили для трендовых фильмов */
                .trending-movie-card {
                    flex: 0 0 auto;
                    width: 228px;
                    aspect-ratio: 2/3;
                    border-radius: 8px;
                    overflow: hidden;
                    position: relative;
                }

                .trending-movie-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                /* Стили для обычных карточек */
                .scroll-movie-card {
                    flex: 0 0 auto;
                    width: 128px;
                    aspect-ratio: 2/3;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .scroll-movie-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .rating-badge {
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(2px);
                    padding: 4px 8px;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .rating-badge svg {
                    width: 12px;
                    height: 12px;
                    fill: #FFD700;
                }

                .rating-text {
                    color: white;
                    font-size: 12px;
                    font-weight: 600;
                }

                .movies-scroll-container {
                    position: relative;
                    display: flex;
                    padding: 8px 0;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    align-self: stretch;
                }

                .movies-scroll-wrapper {
                    width: 100%;
                    overflow-x: auto;
                    scrollbar-width: none;
                }

                .movies-scroll-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .movies-scroll-container::before,
                .movies-scroll-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 16px;
                    pointer-events: none;
                    z-index: 1;
                }

                .movies-scroll-container::before {
                    left: 0;
                    background: linear-gradient(to right, var(--md-sys-color-background), transparent);
                }

                .movies-scroll-container::after {
                    right: 0;
                    background: linear-gradient(to left, var(--md-sys-color-background), transparent);
                }

                .movies-scroll {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    flex-wrap: nowrap;
                    padding: 0 16px;
                }

                .trending-movie-card,
                .scroll-movie-card {
                    cursor: pointer;
                }
            </style>

            <div class="section">
                <div class="section-article">MOVIES</div>
                <div class="section-title">Trending Now</div>
                <div class="movies-scroll-container">
                    <div class="movies-scroll-wrapper">
                        <div class="movies-scroll">
                            ${this._renderTrendingMovies(this._trendingMovies)}
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-article">MOVIES</div>
                <div class="section-title">Most Anticipated</div>
                <div class="movies-scroll-container">
                    <div class="movies-scroll-wrapper">
                        <div class="movies-scroll">
                            ${this._renderScrollMovieCards(this._anticipatedMovies)}
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-article">MOVIES</div>
                <div class="section-title">Most Popular</div>
                <div class="movies-scroll-container">
                    <div class="movies-scroll-wrapper">
                        <div class="movies-scroll">
                            ${this._renderScrollMovieCards(this._popularMovies)}
                        </div>
                    </div>
                </div>
            </div>
        `,this._setupEventListeners()}_renderTrendingMovies(e){return e.map(t=>`
            <div class="trending-movie-card" data-movie-id="${t.id}">
                <img src="https://image.tmdb.org/t/p/w500${t.poster_path}" 
                     alt="${t.title}"
                     loading="lazy">
                <div class="rating-badge">
                    <svg viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                    </svg>
                    <span class="rating-text">${t.vote_average.toFixed(1)}</span>
                </div>
            </div>
        `).join("")}_renderScrollMovieCards(e){return e.map(t=>`
            <div class="scroll-movie-card" data-movie-id="${t.id}">
                <img src="https://image.tmdb.org/t/p/w342${t.poster_path}" 
                     alt="${t.title}"
                     loading="lazy">
            </div>
        `).join("")}_setupEventListeners(){this.shadowRoot.querySelectorAll(".trending-movie-card, .scroll-movie-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.movieId;this.dispatchEvent(new CustomEvent("movie-selected",{detail:{movieId:t,type:"movie"},bubbles:!0,composed:!0}))})})}}customElements.define("movies-screen",fs);class gs extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._trendingShows=[],this._anticipatedShows=[],this._popularShows=[]}async connectedCallback(){await this.loadData(),this.render()}async loadData(){try{const[e,t,s]=await Promise.all([E.getTrendingTV(),E.getPopularTV(),E.getTopRatedTV()]);this._trendingShows=e,this._anticipatedShows=(t==null?void 0:t.results)||[],this._popularShows=s}catch(e){console.error("Error loading TV shows:",e)}}render(){this.shadowRoot.innerHTML=`
            <style>
                :host {
                    padding-bottom: 80px;
                    padding-top: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 16px;                    
                }

                .section {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                }

                .section-article {
                    display: flex;
                    padding: 8px 16px 0px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-self: stretch;                
                    color: var(--md-sys-color-outline);
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }

                .section-title {
                    display: flex;
                    padding: 0px 16px 8px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-self: stretch;
                    color: var(--md-sys-color-on-surface);
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 32px;
                }

                .shows-scroll {
                    display: flex;
                    gap: 8px;
                    overflow-x: auto;
                    padding-bottom: 8px;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    padding: 8px 16px;
                }

                .shows-scroll::-webkit-scrollbar {
                    display: none;
                }

                .trending-show-card {
                    flex: 0 0 auto;
                    width: 228px;
                    aspect-ratio: 2/3;
                    border-radius: 8px;
                    overflow: hidden;
                    position: relative;
                }

                .trending-show-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .scroll-show-card {
                    flex: 0 0 auto;
                    width: 128px;
                    aspect-ratio: 2/3;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .scroll-show-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .rating-badge {
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(2px);
                    padding: 4px 8px;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .rating-badge svg {
                    width: 12px;
                    height: 12px;
                    fill: #FFD700;
                }

                .rating-text {
                    color: white;
                    font-size: 12px;
                    font-weight: 600;
                }

                .shows-scroll-container {
                    position: relative;
                    display: flex;
                    padding: 8px 0;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    align-self: stretch;
                }

                .shows-scroll-wrapper {
                    width: 100%;
                    overflow-x: auto;
                    scrollbar-width: none;
                }

                .shows-scroll-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .shows-scroll-container::before,
                .shows-scroll-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 16px;
                    pointer-events: none;
                    z-index: 1;
                }

                .shows-scroll-container::before {
                    left: 0;
                    background: linear-gradient(to right, var(--md-sys-color-background), transparent);
                }

                .shows-scroll-container::after {
                    right: 0;
                    background: linear-gradient(to left, var(--md-sys-color-background), transparent);
                }

                .shows-scroll {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    flex-wrap: nowrap;
                    padding: 0 16px;
                }

                .trending-show-card,
                .scroll-show-card {
                    cursor: pointer;
                }
            </style>

            <div class="section">
                <div class="section-article">TV SHOWS</div>
                <div class="section-title">Trending Now</div>
                <div class="shows-scroll-container">
                    <div class="shows-scroll-wrapper">
                        <div class="shows-scroll">
                            ${this._renderTrendingShows(this._trendingShows)}
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-article">TV SHOWS</div>
                <div class="section-title">Most Popular</div>
                <div class="shows-scroll-container">
                    <div class="shows-scroll-wrapper">
                        <div class="shows-scroll">
                            ${this._renderScrollShowCards(this._anticipatedShows)}
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-article">TV SHOWS</div>
                <div class="section-title">Top Rated</div>
                <div class="shows-scroll-container">
                    <div class="shows-scroll-wrapper">
                        <div class="shows-scroll">
                            ${this._renderScrollShowCards(this._popularShows)}
                        </div>
                    </div>
                </div>
            </div>
        `,this._setupEventListeners()}_renderTrendingShows(e){return e.map(t=>`
            <div class="trending-show-card" data-show-id="${t.id}">
                <img src="https://image.tmdb.org/t/p/w500${t.poster_path}" 
                     alt="${t.name}"
                     loading="lazy">
                <div class="rating-badge">
                    <svg viewBox="0 0 24 24">
                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                    </svg>
                    <span class="rating-text">${t.vote_average.toFixed(1)}</span>
                </div>
            </div>
        `).join("")}_renderScrollShowCards(e){return e.map(t=>`
            <div class="scroll-show-card" data-show-id="${t.id}">
                <img src="https://image.tmdb.org/t/p/w342${t.poster_path}" 
                     alt="${t.name}"
                     loading="lazy">
            </div>
        `).join("")}_setupEventListeners(){this.shadowRoot.querySelectorAll(".trending-show-card, .scroll-show-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.showId;this.dispatchEvent(new CustomEvent("movie-selected",{detail:{movieId:t,type:"tv"},bubbles:!0,composed:!0}))})})}}customElements.define("tv-shows-screen",gs);function bs(){const i=document.querySelector("#movies-container");i.innerHTML="";const e=document.createElement("search-screen");i.appendChild(e)}async function ys(i,e="movie"){try{const t=await E.getFullMovieInfo(i,e);document.documentElement.style.setProperty("--movie-backdrop",`url(https://image.tmdb.org/t/p/original${t.backdrop_path})`);const s=document.querySelector("#movies-container");s.innerHTML="";const o=document.createElement("movie-card");o.movie=t,s.appendChild(o),window.scrollTo(0,0)}catch(t){console.error("Error showing movie details:",t)}}function tt(){const i=document.querySelector("#movies-container");i.innerHTML="";const e=document.createElement("movies-screen");i.appendChild(e)}function xs(){const i=document.querySelector("#movies-container");i.innerHTML="";const e=document.createElement("tv-shows-screen");i.appendChild(e)}window.addEventListener("DOMContentLoaded",()=>{try{console.log("App starting..."),ot(),console.log("Telegram initialized");const i=document.querySelector("tab-bar");if(!i){console.error("TabBar not found");return}i.setActiveTab("movies"),tt(),console.log("Initial screen shown")}catch(i){console.error("Error initializing app:",i)}});document.addEventListener("tab-changed",i=>{switch(i.detail.tab){case"search":bs();break;case"movies":tt();break;case"tv":xs();break}});document.addEventListener("movie-selected",i=>{ys(i.detail.movieId,i.detail.type)});
//# sourceMappingURL=index.js.map
