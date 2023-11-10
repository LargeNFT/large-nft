(()=>{"use strict";var e={913:()=>{try{self["workbox:core:7.0.0"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:7.0.0"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:7.0.0"]&&_()}catch(e){}}},t={};function s(r){var n=t[r];if(void 0!==n)return n.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,s),a.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}s(80);const r=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,s="GET"){this.handler=r(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=r(e)}}class a extends n{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}const i=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");class o{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const r=s.origin===location.origin,{params:n,route:a}=this.findMatchingRoute({event:t,request:e,sameOrigin:r,url:s});let i=a&&a.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return void 0;let c;try{c=i.handle({url:s,request:e,event:t,params:n})}catch(e){c=Promise.reject(e)}const h=a&&a.catchHandler;return c instanceof Promise&&(this._catchHandler||h)&&(c=c.catch((async r=>{if(h){0;try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){e instanceof Error&&(r=e)}}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw r}))),c}findMatchingRoute({url:e,sameOrigin:t,request:s,event:r}){const n=this._routes.get(s.method)||[];for(const a of n){let n;const i=a.match({url:e,sameOrigin:t,request:s,event:r});if(i)return n=i,(Array.isArray(n)&&0===n.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,r(e))}setCatchHandler(e){this._catchHandler=r(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let c;const h=()=>(c||(c=new o,c.addFetchListener(),c.addCacheListener()),c);function l(e,s,r){let i;if("string"==typeof e){const t=new URL(e,location.href);0;i=new n((({url:e})=>e.href===t.href),s,r)}else if(e instanceof RegExp)i=new a(e,s,r);else if("function"==typeof e)i=new n(e,s,r);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});i=e}return h().registerRoute(i),i}const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},f=e=>[u.prefix,e,u.suffix].filter((e=>e&&e.length>0)).join("-"),d=e=>e||f(u.runtime);function p(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class w{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const m=new Set;s(873);function g(e){return"string"==typeof e?new Request(e):e}class y{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new w,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let r=g(e);if("navigate"===r.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?r.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))r=await e({request:r.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const a=r.clone();try{let e;e=await fetch(r,"navigate"===r.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:a,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:a.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=g(e);let s;const{cacheName:r,matchOptions:n}=this._strategy,a=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},n),{cacheName:r});s=await caches.match(a,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:r,matchOptions:n,cachedResponse:s,request:a,event:this.event})||void 0;return s}async cachePut(e,s){const r=g(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const a=await this.getCacheKey(r,"write");if(!s)throw new t("cache-put-with-no-response",{url:i(a.url)});const o=await this._ensureResponseSafeToCache(s);if(!o)return!1;const{cacheName:c,matchOptions:h}=this._strategy,l=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,r){const n=p(t.url,s);if(t.url===n)return e.match(t,r);const a=Object.assign(Object.assign({},r),{ignoreSearch:!0}),i=await e.keys(t,a);for(const t of i)if(n===p(t.url,s))return e.match(t,r)}(l,a.clone(),["__WB_REVISION__"],h):null;try{await l.put(a,u?o.clone():o)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of m)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:f,newResponse:o.clone(),request:a,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let r=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))r=g(await e({mode:t,request:r,event:this.event,params:this.params}));this._cacheKeys[s]=r}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),r=r=>{const n=Object.assign(Object.assign({},r),{state:s});return t[e](n)};yield r}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class _{constructor(e={}){this.cacheName=d(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,r="params"in e?e.params:void 0,n=new y(this,{event:t,request:s,params:r}),a=this._getResponse(n,s,t);return[a,this._awaitComplete(a,n,s,t)]}async _getResponse(e,s,r){let n;await e.runCallbacks("handlerWillStart",{event:r,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const a of e.iterateCallbacks("handlerDidError"))if(n=await a({error:t,event:r,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:r,request:s,response:n});return n}async _awaitComplete(e,t,s,r){let n,a;try{n=await e}catch(a){}try{await t.runCallbacks("handlerDidRespond",{event:r,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(a=e)}if(await t.runCallbacks("handlerDidComplete",{event:r,request:s,response:n,error:a}),t.destroy(),a)throw a}}class v extends _{async _handle(e,s){let r,n=await s.cacheMatch(e);if(n)0;else{0;try{n=await s.fetchAndCachePut(e)}catch(e){e instanceof Error&&(r=e)}0}if(!n)throw new t("no-response",{url:e.url,error:r});return n}}const q={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class b extends _{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(q)}async _handle(e,s){const r=s.fetchAndCachePut(e).catch((()=>{}));s.waitUntil(r);let n,a=await s.cacheMatch(e);if(a)0;else{0;try{a=await r}catch(e){e instanceof Error&&(n=e)}}if(!a)throw new t("no-response",{url:e.url,error:n});return a}}self.addEventListener("install",(e=>{e.waitUntil(self.skipWaiting())})),self.addEventListener("activate",(e=>{e.waitUntil(self.clients.claim())}));const C=new URL(location).searchParams.get("baseURI");l((({url:e})=>e.pathname.startsWith(`${C}sync`)),new class extends _{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(q),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,s){const r=[];const n=[];let a;if(this._networkTimeoutSeconds){const{id:t,promise:i}=this._getTimeoutPromise({request:e,logs:r,handler:s});a=t,n.push(i)}const i=this._getNetworkPromise({timeoutId:a,request:e,logs:r,handler:s});n.push(i);const o=await s.waitUntil((async()=>await s.waitUntil(Promise.race(n))||await i)());if(!o)throw new t("no-response",{url:e.url});return o}_getTimeoutPromise({request:e,logs:t,handler:s}){let r;return{promise:new Promise((t=>{r=setTimeout((async()=>{t(await s.cacheMatch(e))}),1e3*this._networkTimeoutSeconds)})),id:r}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,handler:r}){let n,a;try{a=await r.fetchAndCachePut(t)}catch(e){e instanceof Error&&(n=e)}return e&&clearTimeout(e),!n&&a||(a=await r.cacheMatch(t)),a}}),l(/\.(?:js.*|css.*|webmanifest|eot|ttf|woff|woff2)$/,new v({cacheName:"static-resources"})),l((({url:e})=>e.pathname.startsWith(`${C}backup`)),new v),l((({event:e})=>"image"===e.request.destination),new b),l((({event:e})=>"document"===e.request.destination),new b),l((({url:e})=>e.pathname.endsWith(".html")),new b),l((({url:e})=>e.pathname.startsWith(`${C}t`)),new b),l((({url:e})=>e.pathname.startsWith(`${C}s`)),new b)})()})();
//# sourceMappingURL=sw-0.18.7.js.map