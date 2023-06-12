
  <div class="toolbar toolbar-bottom">

    <div class="toolbar-inner" style="display: block; padding: 10px;">

      
      ${l?e`
        
        <div innerHTML='${l}'></div>
      
      `:e`
        <span class="footer-link">
          Code licensed under <a href="https://github.com/LargeNFT/large-nft/blob/master/LICENSE.md" class="external">MIT</a>
        </span>

        <span class="footer-link">
          <a href="https://github.com/LargeNFT/large-nft" class="external">GitHub</a>
        </span>

        <span class="footer-link"><a href="https://www.npmjs.com/package/large-nft/v/${r}" class="external">${r}</a></span>
      
      `}


      
    </div>
  </div>


`}}ln=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[E,y,W,P,I,C,N,_,V,en,on])],ln),sn.id="3a364ce63f",sn.style="\n\n\n";const An=sn;function dn(n,{$on:e,$f7ready:t,$f7:a,$f7router:r,$update:o}){return t((async()=>{let n,e,t=window.location.pathname,r=window.location.hash?.length>2?window.location.hash.substring(2):void 0,s=i.getInstance(l),A=i.getWalletService(),d=i.getInstance(ln);const c=async n=>{e=void 0,A.provider||await A.initProvider(),e=await A.getAddress(),e&&(A.address=e,A.wallet||await A.connect()),await o()};document.addEventListener("connect-wallet",(async n=>{await(async n=>{await A.initWallet(),await A.connect(),await c()})()})),await async function(){s.showSpinner("Loading..."),await d.load(),await c(),n=a.views.create(".view-main",{url:r||"/",browserHistory:!0,browserHistoryRoot:t,reloadCurrent:!0}),s.hideSpinner()}()})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`
  <div id="app">


    <!-- Status bar overlay for fullscreen mode-->
    <div class="statusbar"></div>

    <div class="view view-main" >

      <${An} />

    </div>



  </div>

`}}dn.id="9d91e6f971";const cn=dn;var fn=t(37842);let pn=class{app;constructor(n){this.app=n}async queuePromiseView(n){const e=this;let t={id:bn.newGuid(),icon:n.icon,title:n.title};return async function(){return new Promise(((n,a)=>{e._beforeSaveAction(t),n()}))}().then((async function(){let a=await n.promise;try{e._showSuccess(a,t)}catch(n){e._showError(n,t)}return a}))}_beforeSaveAction(n){n.toast=this.app.toast.create({text:n.title,closeButton:!1}),n.toast.open()}_showError(n,e){e.toast.close(),console.log(n);let t={text:n.message,closeButton:!0,closeButtonText:"Close",closeTimeout:5e3};this.app.toast.create(t).open()}_showSuccess(n,e){e.toast.close(),this.app.toast.create({text:"Transaction Submitted",closeButton:!0,closeTimeout:5e3}).open()}};pn=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){return function(t,a){e(t,a,n)}}(0,(0,o.f)("framework7")),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[Object])],pn);class bn{static newGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(n){var e=16*Math.random()|0;return("x"==n?e:3&e|8).toString(16)}))}}var mn=t(88554),gn=t(99810);let Cn=class{constructor(){}async translateContent(n,e=!1){if(!n?.ops)return"";const t=new mn.bc(n.ops,{encodeHtml:!1});return t.renderCustomWith(hn(e)),t.convert()}async translateContentEncodeHtml(n,e=!1){if(!n?.ops)return"";const t=new mn.bc(n.ops,{});return t.renderCustomWith(hn(e)),t.convert()}async generateMarkdown(n){return(0,gn.deltaToMarkdown)(n.ops)}};Cn=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[])],Cn);const hn=n=>function(e,t){if("divider"===e.insert.type)return"<hr />";if("ipfsimage"===e.insert.type){let t="<img ";return n||(t+=`src="${e.insert.value.src}" `),e.insert.value.width&&(t+=`width="${e.insert.value.width}" `),e.insert.value.height&&(t+=`height="${e.insert.value.height}" `),e.insert.value.style&&(t+=`style="${e.insert.value.style}"`),t+="/>",t}};var un=t(76095),vn=t.n(un),En=t(57883),wn=t(3721),xn=(t(92194),t(70254));class Bn extends Error{errors;constructor(n){super(),this.errors=n}}var kn=t(57393),yn=t(60725);let Dn=class{constructor(){}async fromText(n,e,t,a){let i="140px",r="160px";return n&&(e=`<span class='svg-title'>${n}</span><br /><br /><span class='svg-text'>${e}</span>`),e.length>50&&e.length<=100&&(i="110px",r="130px"),e.length>100&&e.length<=175&&(i="90px",r="110px"),e.length>175&&(i="75px",r="95px"),`<svg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg' version='1.1'>\n            <style>\n                * {\n                    --lh: ${r};\n                    height:100%;\n                    margin: 0;\n                    padding: 0;\n                    box-sizing: border-box;\n                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n                }\n\n\n                @keyframes gradient {\n                    0% {\n                        background-position: 0% 50%;\n                    }\n                    25% {\n                        background-position: 50%% 50%;\n                    }\n                    50% {\n                        background-position: 100% 50%;\n                    }\n                    75% {\n                        background-position: 50% 50%;\n                    }\n                    100% {\n                        background-position: 0% 50%;\n                    }\n                }\n\n\n                .svg-h1 {\n\n                    border: 25px solid rgb(78,130,177);\n                    \n                    background: rgb(241,241,241);\n                    background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);\n                    background-size: 400% 400%;\n                    animation: gradient 15s ease infinite;\n\n                    text-align: center;\n                    font-size: ${i};\n                    padding: 70px;            \n                    line-height: var(--lh);\n                    height: 1200px;\n                    width: 1200px;  \n                    -webkit-mask-image: linear-gradient(180deg, rgb(0,0,0) 60%, transparent);        \n                }\n\n                .svg-title {\n                    font-weight: 700;\n                    font-size: 1.25em;\n                }\n\n                .svg-text {\n                    width: 100%;\n                    font-weight: 500;\n                }\n\n                ${a||""}\n\n                ${t||""}\n\n            </style>\n            <g>\n                <foreignObject x='0' y='0' width='1200' height='1200'>\n                    <h1 class="svg-h1" xmlns='http://www.w3.org/1999/xhtml'>${e}</h1>\n                </foreignObject>\n            </g>\n        </svg>`}};Dn=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[])],Dn);var zn=t(86492),qn=t.n(zn),In=t(28721);let Sn=class{themeRepository;walletService;db;constructor(n,e){this.themeRepository=n,this.walletService=e}async get(n){return this.themeRepository.get(n)}async getLatestRevision(n){return this.themeRepository.getLatestRevision(n)}async put(n){n._id?n.lastUpdated=(new Date).toJSON():(n._id=(0,In.Z)(),n.dateCreated=(new Date).toJSON());let e=await(0,kn.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(e.length>0)throw new Bn(e);await this.themeRepository.put(n)}async delete(n){return this.themeRepository.delete(n)}async listByChannel(n,e,t){return this.themeRepository.listByChannel(n,e,t)}};Sn=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){return function(t,a){e(t,a,n)}}(1,(0,o.f)(a.WalletService)),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[N,Object])],Sn);var Fn=t(30496),jn=t.n(Fn),Wn=t(42555),$n=t.n(Wn),Yn=t(48764).Buffer;let Rn=class{imageRepository;svgService;quillService;themeService;db;constructor(n,e,t,a){this.imageRepository=n,this.svgService=e,this.quillService=t,this.themeService=a}async load(n){this.db=await this.imageRepository.load(n)}async get(n){return this.imageRepository.get(n)}async put(n){n._id||(n._id=n.cid,n.dateCreated=(new Date).toJSON());let e=await(0,kn.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(e.length>0)throw new Bn(e);await this.imageRepository.put(n)}async delete(n){await this.imageRepository.delete(n)}async newFromBuffer(n){const e=new j;return e.buffer=n,e.cid=await yn.of(n),e.generated=!1,e}async newFromSvg(n){const e=new j;return e.svg=n,e.cid=await yn.of(e.svg),e.generated=!0,e}async getUrl(n){if(!n.buffer&&!n.svg)return"";if(n.buffer){let e=this.bufferToBlob(n.buffer);return this.blobToDataURL(e)}return n.svg?this.getSVGURL(n):void 0}async getSVGURL(n){return n.svg?this.svgToDataURL(n.svg):""}bufferToBlob(n){if(null!=Blob)return new Blob([n],{type:"image/jpg"})}blobToDataURL(n){let e;return new Promise(((t,a)=>{const i=new FileReader;i.onload=async function(){e=i.result,t(e)},i.readAsDataURL(n)}))}svgToDataURL(n){return $n()(n)}async newFromItem(n){let e=await this.quillService.translateContentEncodeHtml(n.content),t=[];if(n.themes)for(let e of n.themes)t.push(await this.themeService.get(e));let a="";if(t?.length>0)for(let n of t?.map((n=>n?.coverImageCSS)))n?.length>0&&(a+=n);let i=this.getExcerptByFirstParagraph(e,{pruneLength:500});if(!i||0==i.length)throw new Error("No text");const r=new j;return r.svg=await this.svgService.fromText(n.title,i,n.coverImageCSS,a),r.cid=await yn.of(r.svg),r.generated=!0,r}getExcerptByFirstParagraph(n,e){n=qn().unescape(n);const t="number"==typeof e.pruneLength?e.pruneLength:140;return t>0&&(n=jn()(n,t,{ellipsis:""})),qn().encode(n,{allowUnsafeSymbols:!0})}async getByIds(n){return this.imageRepository.getByIds(n)}async getImageContent(n){let e;return n.buffer?e=e instanceof Uint8Array?n.buffer:Yn.from(Object.values(n.buffer)):n.svg&&(e=n.svg),e}async loadImage(n,e){return new Promise((function(t,a){n.onload=function(){t()},console.log(4),n.src=URL.createObjectURL(new Blob([e],{type:"image/jpg"})),console.log(5)}))}async phlipImage(n){const e=document.createElement("canvas");e.width=n.naturalWidth,e.height=n.naturalHeight;const t=e.getContext("2d");t.scale(-1,1),t.drawImage(n,-e.width,0);const a=t.getImageData(0,0,e.width,e.height),i=new Uint8Array(a.data.length);for(let n=0;n<a.data.length;n++)i[n]=a.data[n];return i}};Rn=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[W,Dn,Cn,Sn])],Rn);var Un=t(37086);xn.Z;let Pn=class{imageService;uiService;activeEditor;initialized=!1;constructor(n,e){this.imageService=n,this.uiService=e}init(){if(this.initialized)return;vn().register("modules/imageDropAndPaste",En.Z),vn().register("modules/blotFormatter",wn.ZP),vn().debug(!1);let n=vn().import("blots/inline");class e extends n{static blotName;static tagName}e.blotName="bold",e.tagName="strong";class t extends n{static blotName;static tagName}t.blotName="italic",t.tagName="em";let a=vn().import("blots/block");class i extends a{static blotName;static tagName}i.blotName="blockquote",i.tagName="blockquote";class r extends a{static blotName;static tagName;static formats(n){return r.tagName.indexOf(n.tagName)+1}}r.blotName="header",r.tagName=["H1","H2"];let o=vn().import("blots/block/embed");class l extends o{static blotName;static tagName}l.blotName="divider",l.tagName="hr";class s extends o{static blotName;static tagName;static create(n){let e=super.create();return e.setAttribute("src",n.src),e.setAttribute("data-cid",n.cid),n.width&&e.setAttribute("width",n.width),n.height&&e.setAttribute("height",n.height),n.style&&e.setAttribute("style",n.style),e}static value(n){return{src:n.getAttribute("src"),cid:n.getAttribute("data-cid"),width:n.getAttribute("width"),height:n.getAttribute("height"),style:n.getAttribute("style")}}}s.blotName="ipfsimage",s.tagName="img",vn().register(s),vn().register(i),vn().register(e),vn().register(t),this.initialized=!0}buildQuillPostEditor(n,e){return this.init(),this.activeEditor=new(vn())(n,{bounds:".page-content",modules:{imageDropAndPaste:{handler:(n,e,t)=>{this.imageDropAndPasteHandler(n,e,t)}},toolbar:e,blotFormatter:{specs:[Gn],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}},handlers:{link:n=>{if(n){var e=prompt("Enter the URL");this.quill.format("link",e)}else this.quill.format("link",!1)}},theme:"snow"}),this.activeEditor}imageClick(){}async imageSelected(n){this.uiService.showSpinner("Processing image..."),this.insertImage(n.files[0]),this.uiService.hideSpinner()}async insertImage(n){let e=await this.insertImageInEditor(n,this.activeEditor);const t=new CustomEvent("image-selected",{detail:{_id:e._id}});document.dispatchEvent(t)}async insertImageInEditor(n,e){let t=await(0,Un.readAndCompressImage)(n,{maxWidth:1024}),a=await t.arrayBuffer(),i=await this.imageService.newFromBuffer(new Uint8Array(a));try{await this.imageService.put(i)}catch(n){console.log(n)}let r=await this.imageService.getUrl(i),o=await this.getHeightAndWidthFromDataUrl(r),l=e.getSelection(!0);return e.insertText(l.index,"\n",vn().sources.USER),e.insertEmbed(l.index,"ipfsimage",{cid:i.cid,src:r,height:o.height,width:o.width},vn().sources.USER),e.setSelection(l.index+2,vn().sources.SILENT),i}async imageDropAndPasteHandler(n,e,t){const a=t.toFile();await this.insertImage(a)}async getHeightAndWidthFromDataUrl(n){return new Promise((e=>{const t=new Image;t.onload=()=>{e({height:t.height,width:t.width})},t.src=n}))}};Pn=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[Rn,l])],Pn);class Tn extends wn.sL{keyUpListener;onCreate(){const n=this;this.keyUpListener=function(e){n.onKeyUp(e)},document.addEventListener("keyup",n.keyUpListener,!0),this.formatter.quill.root.addEventListener("input",n.keyUpListener,!0)}onDestroy(){document.removeEventListener("keyup",this.keyUpListener),this.formatter.quill.root.removeEventListener("input",this.keyUpListener)}onKeyUp(n){if(this.formatter.currentSpec&&(46===n.keyCode||8===n.keyCode)){const n=vn().find(this.formatter.currentSpec.getTargetElement());n&&n.deleteAt(0),this.formatter.hide()}}}class Gn extends wn.N6{getActions(){return[wn.oi,wn.Ce,Tn]}}var On=t(48764);let _n=class{constructor(){}async uploadFile(n){let e;return new Promise(((t,a)=>{const i=new FileReader;i.onload=async function(){e=new On.Buffer(i.result),e&&t(e)},n.files.length>0?i.readAsArrayBuffer(n.files[0]):t(e)}))}};_n=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[])],_n);var Xn=t(50387),Mn=function(n,e){return function(t,a){e(t,a,n)}};let Zn=class{contracts;getProvider;$f7;wallet;address;ethersContracts={};provider;constructor(n,e,t){this.contracts=n,this.getProvider=e,this.$f7=t}async initProvider(){this.provider=this.getProvider(),globalThis.ethereum?.on("accountsChanged",(async n=>{delete this.address,n?.length>0&&await this.initWallet(),this.$f7.views.main.router.refreshPage()}))}async initWallet(){console.log("Init wallet"),delete this.address,this.provider||await this.initProvider();let n=await this.provider.send("eth_accounts",[]);if(n?.length>0)return this.connect();console.log("Init wallet complete")}async connect(){console.log("Connect wallet"),await this.provider.send("eth_requestAccounts",[]),this.wallet=await this.provider.getSigner(),this.address=await this.getAddress(),console.log(`Wallet ${this.address} connected`)}async getAddress(){if(!this.provider)return;let n=await this.provider.send("eth_accounts",[]);return n?.length>0?n[0]:void 0}async getWallet(){return this.provider.getSigner()}getContract(n){if(this.ethersContracts[n]&&this.ethersContracts[n].signer==this.wallet)return this.ethersContracts[n];let e=this.contracts[n];return this.ethersContracts[n]=new Xn.CH(e.address,e.abi,this.wallet?this.wallet:this.provider),this.ethersContracts[n]}truncateEthAddress(n){const e=n.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);return e?`${e[1]}…${e[2]}`:n}};Zn=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),Mn(0,(0,o.f)("contracts")),Mn(1,(0,o.f)("provider")),Mn(2,(0,o.f)("framework7")),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[Array,Function,Object])],Zn);let Nn=class{authorRepository;walletService;db;constructor(n,e){this.authorRepository=n,this.walletService=e}async get(n){return this.authorRepository.get(n)}async put(n){n._id?n.lastUpdated=(new Date).toJSON():(n._id=n.walletAddress,n.dateCreated=(new Date).toJSON());let e=await(0,kn.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(e.length>0)throw new Bn(e);await this.authorRepository.put(n)}async insertIfNew(n){let e;try{e=await this.get(n)}catch(n){}e||await this.put(Object.assign(new v,{_id:n,walletAddress:n}))}getDisplayName(n){if(n)return n.name?n.name:this.walletService.truncateEthAddress(n._id)}};Nn=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){return function(t,a){e(t,a,n)}}(1,(0,o.f)(a.WalletService)),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[E,Object])],Nn);let Ln=class{queryCacheRepository;constructor(n){this.queryCacheRepository=n}async put(n){n||((n=new nn).dateCreated=(new Date).toJSON()),n.lastUpdated=(new Date).toJSON(),await this.queryCacheRepository.put(n)}async get(n){return this.queryCacheRepository.get(n)}async delete(n){console.log(n),await this.queryCacheRepository.delete(n)}};Ln=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[en])],Ln);let Qn=class{itemRepository;imageService;queryCacheService;constructor(n,e,t){this.itemRepository=n,this.imageService=e,this.queryCacheService=t}async get(n){return this.itemRepository.get(n)}async getLatestRevision(n){return this.itemRepository.getLatestRevision(n)}async getByTokenId(n,e){return this.itemRepository.getByTokenId(n,e)}async put(n){n._id?n.lastUpdated=(new Date).toJSON():(n._id=(0,In.Z)(),n.dateCreated=(new Date).toJSON(),null==n.tokenId&&(n.tokenId=await this.getNextTokenId(n.channelId)));let e=await(0,kn.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(e.length>0)throw new Bn(e);await this.itemRepository.put(n)}async delete(n){await this.itemRepository.delete(n)}async getByImageId(n){return this.itemRepository.getByImageId(n)}async getByAnimationId(n){return this.itemRepository.getByAnimationId(n)}async listByChannel(n,e,t){return this.itemRepository.listByChannel(n,e,t)}async exportNFTMetadata(n,e,t,a,i){if("existing"==n.forkType)return console.log(`Exporting original metadata for token #${e.tokenId}`),e.originalJSONMetadata;let r={tokenId:e.tokenId,name:e.title,description:e.description};if(e.animationId&&!e.coverImageAsAnimation){if(!a)throw new Error("Error exporting NFT metadata. Animation directory not found.");r.animation_url=`ipfs://${a}/${e.animationId}.html`}if(e.coverImageId){if(!i)throw new Error("Error exporting NFT metadata. Image directory not found.");r.image=`ipfs://${i}/${t.cid}.${t.buffer?"jpg":"svg"}`}return n.attributeOptions.length>0&&(r.attributes=n.attributeOptions.map((n=>{let t=e?.attributeSelections?.filter((e=>n.traitType==e.traitType));return{trait_type:n.traitType,value:t?.length>0?t[0].value:""}}))),r}async setDefaultCoverImage(n){let e=await this.imageService.newFromItem(n),t=await this.get(e.cid);t?n.coverImageId=t._id:(await this.imageService.put(e),n.coverImageId=e._id)}async getNextTokenId(n){let e;try{e=await this.queryCacheService.get(`token_id_stats_by_channel_${n}`);let t=e?.result;return t?.max?t.max+1:1}catch(n){}return 1}async getAttributeCountByChannel(n){return this.itemRepository.getAttributeCountByChannel(n)}async getAttributeInfoBySelections(n,e){return this.itemRepository.getAttributeInfoBySelections(n,e)}};Qn=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[P,Rn,Ln])],Qn);var Hn=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o},Vn=function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)};class Jn{_id;_rev;name;url;apiKey;secretApiKey;jwt;dateCreated;lastUpdated}Hn([(0,d.a)(),Vn("design:type",String)],Jn.prototype,"_id",void 0),Hn([(0,d.a)(),Vn("design:type",String)],Jn.prototype,"_rev",void 0),Hn([(0,c.rl)(),Vn("design:type",String)],Jn.prototype,"name",void 0),Hn([(0,c.rl)(),Vn("design:type",String)],Jn.prototype,"url",void 0),Hn([(0,d.a)(),Vn("design:type",String)],Jn.prototype,"apiKey",void 0),Hn([(0,d.a)(),Vn("design:type",String)],Jn.prototype,"secretApiKey",void 0),Hn([(0,d.a)(),Vn("design:type",String)],Jn.prototype,"jwt",void 0),Hn([(0,d.a)(),Vn("design:type",String)],Jn.prototype,"dateCreated",void 0),Hn([(0,d.a)(),Vn("design:type",String)],Jn.prototype,"lastUpdated",void 0);let Kn=class{databaseService;changesets=[{id:"0",changeset:async n=>{await n.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(n){this.databaseService=n}async load(){this.db=await this.databaseService.getDatabase("pinning-api",this.changesets)}async get(n){return Object.assign(new Jn,await this.db.get(n))}async list(n,e){return(await this.db.find({selector:{dateCreated:{$exists:!0}},sort:[{dateCreated:"desc"}],limit:n,skip:e})).docs}async put(n){await this.db.put(n)}async delete(n){await this.db.remove(n)}};Kn=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[g])],Kn);var ne=t(52861);let ee=class{settingsRepository;constructor(n){this.settingsRepository=n}async get(){return await this.settingsRepository.get()||{_id:"single",defaultGitProvider:"github",gitProviders:{gitlab:{name:"gitlab"},github:{name:"github"}}}}async put(n){n._id?n.lastUpdated=(new Date).toJSON():(n._id="single",n.dateCreated=(new Date).toJSON());let e=await(0,kn.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(e.length>0)throw new Bn(e);await this.settingsRepository.put(n)}};ee=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[I])],ee);var te=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o},ae=function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)};let ie=class{ipfsRemoteInit;settingsService;peerCount=0;addresses;ipfs;initializing=!1;constructor(n){this.ipfsRemoteInit=n}async init(){if(this.ipfs||this.initializing)return;let n;this.initializing=!0;try{n=await this.settingsService.get()}catch(n){}n?.ipfsHost&&(console.log("Init IPFS"),this.ipfs=await this.ipfsRemoteInit(n?.ipfsHost),console.log("Init IPFS complete")),this.initializing=!1}async clearInit(){delete this.ipfs,this.initializing=!1}async updateInfo(){let n=await this.ipfs.id(),e=await this.ipfs.swarm.peers();this.peerCount=e.length,this.addresses=n?.addresses?.map((n=>n.toString()));const t=new CustomEvent("update-peers",{detail:{addresses:this.addresses,peers:e.map((n=>n.addr.toString())),count:this.peerCount}});document.dispatchEvent(t),console.log(`IPFS has ${this.peerCount} peers.`)}};te([(0,o.f)(ee),ae("design:type",ee)],ie.prototype,"settingsService",void 0),ie=te([(0,r.b)(),function(n,e){return function(t,a){e(t,a,n)}}(0,(0,o.f)("ipfsRemoteInit")),ae("design:paramtypes",[Object])],ie);let re=class{pinningApiRepository;ipfsService;constructor(n,e){this.pinningApiRepository=n,this.ipfsService=e}async get(n){return this.pinningApiRepository.get(n)}async getPinata(){let n=await this.pinningApiRepository.list(1,0);if(n?.length>0)return Object.assign(new Jn,n[0])}async put(n){n._id?n.lastUpdated=(new Date).toJSON():(n._id=(0,In.Z)(),n.dateCreated=(new Date).toJSON());let e=await(0,kn.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(e.length>0)throw new Bn(e);await this.pinningApiRepository.put(n)}async list(n,e){return this.pinningApiRepository.list(n,e)}async pinByHash(n,e){let t={cid:e.localCid,name:e.title};return(await ne.Z.post(n.url,t,{headers:{Accept:"*/*",Authorization:`Bearer ${n.jwt}`,"Content-Type":"application/json"}})).data}async userPinnedDataTotal(n){let e=`${n.url}/data/userPinnedDataTotal`;return(await ne.Z.get(e,{headers:{pinata_api_key:n.apiKey,pinata_secret_api_key:n.secretApiKey}})).data}async getJobStatus(n,e,t){let a=`${n.url}/pinning/pinJobs?ipfs_pin_hash=${e}`,i=(await ne.Z.get(a,{headers:{pinata_api_key:n.apiKey,pinata_secret_api_key:n.secretApiKey}})).data.rows.filter((n=>n.id==t));return i?.length>0?i[0]:{status:"complete"}}async validateAccount(n){await this.userPinnedDataTotal(n)}async delete(n){await this.pinningApiRepository.delete(n)}};re=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[Kn,ie])],re);let oe=class{attributeCountRepository;db;constructor(n){this.attributeCountRepository=n}async get(n){return this.attributeCountRepository.get(n)}async put(n){n._id?n.lastUpdated=(new Date).toJSON():(n._id=`${n.channelId}-${n.traitType}-${n.value}`,n.dateCreated=(new Date).toJSON());let e=await(0,kn.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(e.length>0)throw new Bn(e);await this.attributeCountRepository.put(n)}};oe=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[on])],oe);let le=class{channelRepository;imageService;itemService;pinningService;quillService;schemaService;queryCacheService;attributeCountService;constructor(n,e,t,a,i,r,o,l){this.channelRepository=n,this.imageService=e,this.itemService=t,this.pinningService=a,this.quillService=i,this.schemaService=r,this.queryCacheService=o,this.attributeCountService=l}async get(n){return this.channelRepository.get(n)}async getLatestRevision(n){return this.channelRepository.getLatestRevision(n)}async put(n){n._id?n.lastUpdated=(new Date).toJSON():(n._id=(0,In.Z)(),n.dateCreated=(new Date).toJSON()),n.description&&(n.descriptionHTML=await this.quillService.translateContent(n.description),n.descriptionMarkdown=await this.quillService.generateMarkdown(n.description)),n.license&&(n.licenseHTML=await this.quillService.translateContent(n.license),n.licenseMarkdown=await this.quillService.generateMarkdown(n.license));let e=await(0,kn.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(e.length>0)throw new Bn(e);await this.channelRepository.put(n)}async list(n,e){return this.channelRepository.list(n,e)}async delete(n){await this.schemaService.dropChannel(n._id),await this.channelRepository.delete(n)}async countItemsByChannel(n){let e;try{e=await this.queryCacheService.get(`token_id_stats_by_channel_${n}`)}catch(n){}let t=e?.result;return t?.count?t.count:0}async exportContractMetadata(n,e,t){let a={name:n.title,description:n.descriptionMarkdown,external_link:n.link,seller_fee_basis_points:0,fee_recipient:e,license:n.license};if(n.coverImageId){let e=await this.imageService.get(n.coverImageId);a.image=`ipfs://${t}/${e.cid}.${e.buffer?"jpg":"svg"}`}return a}async pin(n,e){let t=await this.pinningService.pinByHash(n,e);if(!t.ipfsHash)throw new Error("Problem publishing");(e=await this.get(e._id)).pinJobId=t.id,e.pinJobStatus=t.status,e.publishedCid=t.ipfsHash,await this.put(e)}async buildAttributeCounts(n){let e=await this.itemService.getAttributeCountByChannel(n);for(let t of e){let e,a=`${n}-${t.traitType}-${t.value}`;try{e=await this.attributeCountService.get(a)}catch(n){}e||(e=new rn),await this.attributeCountService.put(Object.assign(e,t))}}async getGitProviderCredentials(n,e){return n.gitProvider&&"default"!=n.gitProvider?e.gitProviders[n.gitProvider]:e.defaultGitProvider?e.gitProviders[e.defaultGitProvider]:e.gitProviders.github}};le=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[y,Rn,Qn,re,Cn,ln,Ln,oe])],le);var se=t(35717),Ae=t(30381),de=t.n(Ae),ce=t(86094),fe=t.n(ce);const{forEach:pe}=Array.prototype;let be=class{animationRepository;quillService;imageService;themeService;db;constructor(n,e,t,a){this.animationRepository=n,this.quillService=e,this.imageService=t,this.themeService=a}async get(n){return this.animationRepository.get(n)}async put(n){n._id||(n._id=n.cid,n.dateCreated=(new Date).toJSON());let e=await(0,kn.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(e.length>0)throw new Bn(e);await this.animationRepository.put(n)}async delete(n){await this.animationRepository.delete(n)}async newFromText(n){const e=new b;return e.content=n,e.cid=await yn.of(e.content),e}async buildAnimationPage(n){let e,t=await this.quillService.translateContent(n.content),a=[];if(n.themes)for(let e of n.themes)a.push(await this.themeService.get(e));let i="";if(a?.length>0)for(let n of a)n.animationCSS?.length>0&&(i+=n.animationCSS);if(n.coverImageAsAnimation){let t=await this.imageService.get(n.coverImageId),a=await this.imageService.getUrl(t);e=this.getFullImageTemplate(a,n.animationCSS,i)}else e=this.getAnimationTemplate(n,t,n.animationCSS,i);return fe()(e)}getFullImageTemplate(n,e,t){return`<!DOCTYPE html>\n    <html>\n      <head>\n        <style>\n        \n          body { \n            height: 100%; \n            width: 100%;\n            margin: 0;\n            padding: 0;\n\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            overflow: hidden\n          }\n\n          img {\n            flex-shrink: 0;\n            min-width: 100%;\n            width: 100%;\n            height: 100%;\n            min-height: 100%\n            object-fit: cover;\n          }\n\n          ${t||""}\n          ${e||""}\n\n        </style>\n      </head>\n\n      <body>\n        <img src="${n}" />\n      </body>\n    </html>`}getAnimationTemplate(n,e,t,a){return`<!DOCTYPE html>\n        <html>\n        \n          <head>\n              <meta charset="utf-8">\n              <title>${n.title}</title>\n\n              <style>\n\n                html {\n                    height:100%;\n                } \n\n                body {\n                      padding: 0;\n                      margin: 0;\n                      box-sizing: border-box;\n                      height: 100%;\n                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n                }\n\n                .animation-container {\n                  box-sizing: border-box;\n                  padding: 20px;\n                  width:100%;\n                  min-height: 100%;\n                  \n                  background: rgb(241,241,241);\n                  background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);\n\n                  font-size: 20px;\n                  border: 5px solid #4e82b1;\n                  float: left;\n                }\n\n                img { \n                  max-width: 100%;\n                  border: 1px solid #cccccc;\n                  object-fit: cover;\n                }\n\n                .token-id {\n                  color: rgb(79, 79, 79);\n                  font-weight: bold;\n                }\n\n                h4 { \n                  margin-top: 0px; \n                  font-size: 25px;\n                  margin-bottom: 0px;\n                }\n\n                ${a||""}\n                ${t||""}\n\n\n              </style>\n\n          </head>\n\n          <body>\n\n            <div class="animation-container">\n              <h4><b>${n.title?n.title:""} <span class="token-id">#${n.tokenId}</span></b></h4>\n              ${e}\n            </div>\n\n          </body>\n        </html>`}async getByIds(n){return this.animationRepository.getByIds(n)}};be=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[C,Cn,Rn,Sn])],be);let me=class{staticPageRepository;quillService;db;constructor(n,e){this.staticPageRepository=n,this.quillService=e}async get(n){return this.staticPageRepository.get(n)}async getLatestRevision(n){return this.staticPageRepository.getLatestRevision(n)}async put(n){n._id?n.lastUpdated=(new Date).toJSON():(n._id=(0,In.Z)(),n.dateCreated=(new Date).toJSON()),n.content&&(n.contentHTML=await this.quillService.translateContent(n.content),n.contentMarkdown=await this.quillService.generateMarkdown(n.content)),n.name&&(n.slug=this.slugify(n.name));let e=await(0,kn.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(e.length>0)throw new Bn(e);await this.staticPageRepository.put(n)}async delete(n){return this.staticPageRepository.delete(n)}async listByChannel(n,e,t){return this.staticPageRepository.listByChannel(n,e,t)}slugify(n){return n.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-")}};me=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[_,Cn])],me);let ge=class{itemService;authorService;themeService;imageService;animationService;staticPageService;constructor(n,e,t,a,i,r){this.itemService=n,this.authorService=e,this.themeService=t,this.imageService=a,this.animationService=i,this.staticPageService=r}async prepareExport(n,e){let t,a=JSON.parse(JSON.stringify(n)),i=JSON.parse(JSON.stringify(await this.itemService.listByChannel(n._id,1e5,0)));try{t=await this.authorService.get(n.authorId)}catch(n){}t&&(t=JSON.parse(JSON.stringify(t)));let r=JSON.parse(JSON.stringify(await this.themeService.listByChannel(n._id,1e3,0))),o=JSON.parse(JSON.stringify(await this.staticPageService.listByChannel(n._id,1e3,0)));delete a.contractAddress,delete a.localCid,delete a.localPubDate,delete a.pinJobId,delete a.pinJobStatus,delete a.publishedCid,delete a.pubDate,delete a.publishReaderRepoId,delete a.publishReaderRepoPath,delete a.publishReaderRepoBranch,delete a.publishReaderRepoStatus,delete a.publishReaderIPFSActionStatus,delete a.publishReaderIPFSActionResult,delete a.productionHostname,delete a.productionBaseLibraryURI,delete a.productionBaseURI,delete a.showMintPage,delete a.showActivityPage,delete a.marketplaces,delete a.externalLinks,delete a.importSuccess,delete a.lastUpdated,delete a._rev,delete a._rev_tree,t&&(delete t._rev,delete t.lastUpdated,delete t._rev_tree);let l=[],s=[];a.coverImageId?.length>0&&l.push(a.coverImageId),a.coverBannerId?.length>0&&l.push(a.coverBannerId),t?.coverPhotoId?.length>0&&l.push(t.coverPhotoId);for(let n of i)n.animationId&&!n.coverImageAsAnimation&&s.push(n.animationId),l.push(...this.getImageCidsByItem(n)),delete n._rev,delete n.lastUpdated,delete n._rev_tree;l=[...new Set(l)],s=[...new Set(s)];let A=await this.imageService.getByIds(l),d=await this.animationService.getByIds(s);for(let n of r)delete n._rev,delete n._rev_tree;for(let n of o)delete n._rev,delete n._rev_tree;return{animations:d,images:A,channel:a,items:i,author:t,themes:r,staticPages:o,ownerAddress:e}}async createBackup(n){let e=JSON.parse(JSON.stringify(n.channel)),t=n.items,a=n.author,i=n.themes,r=n.staticPages;"existing"==e.forkType&&(delete e.forkType,delete e.forkedFromCid,delete e.forkedFromFeeRecipient,delete e.forkedFromId);for(let n of t){let e=t.filter((e=>e.tokenId==parseInt(n.tokenId.toString())-1)),a=t.filter((e=>e.tokenId==parseInt(n.tokenId.toString())+1));if(n.previous=e?.length>0?{_id:e[0]._id,tokenId:e[0].tokenId}:void 0,n.next=a?.length>0?{_id:a[0]._id,tokenId:a[0].tokenId}:void 0,n.content?.ops?.length>0){let e=[];for(let t of n.content.ops)t.insert&&t.insert.ipfsimage&&delete t.insert.ipfsimage.src,e.push(t);n.content.ops=e}}let o=[],l=[];for(let e of n.images){let n=JSON.parse(JSON.stringify(e));delete n._rev,delete n._rev_tree,delete n.buffer,delete n.svg,o.push(n)}for(let e of n.animations){let n=JSON.parse(JSON.stringify(e));delete n._rev,delete n._rev_tree,delete n.content,l.push(n)}let s=[];return a&&s.push(a),e.itemCount=t?.length,{channels:[e],authors:s,items:t,themes:i,staticPages:r,images:o,animations:l}}getImageCidsByItem(n){let e=[];if(n.coverImageId?.length>0&&e.push(n.coverImageId),n.content?.ops)for(let t of n.content.ops)t.insert&&t.insert.ipfsimage&&t.insert.ipfsimage?.cid?.length>0&&e.push(t.insert.ipfsimage.cid);return e}};ge=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[Qn,Nn,Sn,Rn,be,me])],ge);var Ce,he=t(28490),ue=t.n(he);let ve=Ce=class{settingsService;static BASE_URL="https://gitlab.com/api/v4";static READER_REPO_ID=15461980;constructor(n){this.settingsService=n}async createFork(n){console.log("Creating reader fork...");let e=(await this.settingsService.get()).gitProviders.gitlab;if(e.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let t=`${Ce.BASE_URL}/projects/${Ce.READER_REPO_ID}/fork`,a=`${n.title} Reader`.replace(/[^a-z0-9]/gi,"-").toLowerCase(),i=await this.getExistingFork(n);return i?{id:i.id,path:i.path,branch:"master"}:{id:(await ne.Z.post(t,{name:a,path:a},{headers:{Authorization:`Bearer ${e.personalAccessToken}`}})).data.id,path:a,branch:"master"}}async getExistingFork(n){let e=(await this.settingsService.get()).gitProviders.gitlab;if(e.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let t=`${Ce.BASE_URL}/projects/${Ce.READER_REPO_ID}/forks`,a=(await ne.Z.get(t,{headers:{Authorization:`Bearer ${e.personalAccessToken}`}})).data,i=`${n.title} Reader`.replace(/[^a-z0-9]/gi,"-").toLowerCase(),r=a.filter((n=>n.path==i&&n.owner.username==e.username));if(1==r?.length)return{id:r[0].id,httpUrlToRepo:r[0].http_url_to_repo,path:r[0].path,branch:r[0].default_branch}}async getForkRepoStatus(n){let e=(await this.settingsService.get()).gitProviders.gitlab;if(e.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let t=`${Ce.BASE_URL}/projects/${n.publishReaderRepoId}`;return(await ne.Z.get(t,{headers:{Authorization:`Bearer ${e.personalAccessToken}`}})).data.import_status}async getIPFSActionStatus(n){throw new Error("Method not implemented.")}async getIPFSActionResult(n){throw new Error("Method not implemented.")}async commit(n,e,t){for(let n of e)n.encoding="base64",n.content=n.content.toString("base64");let a=this.chunkIt(e,500);for(let e of a){this.logPublishProgress(`Commiting reader data for ${n.title} to GitLab: ${e.length} actions`);let a=`${Ce.BASE_URL}/projects/${n.publishReaderRepoId}/repository/commits`;await ne.Z.post(a,{branch:"master",commit_message:`Commiting reader data for ${n.title}`,actions:e},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}}async deleteReaderBackup(n,e){if(e.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing files from repo...");let t,a=`${Ce.BASE_URL}/projects/${n.publishReaderRepoId}/repository/tree?recursive=true&path=.upload&pagination=keyset`,i=[];do{let n=await ne.Z.get(a,{headers:{Authorization:`Bearer ${e.personalAccessToken}`}}),r=n?.data?.reverse()?.filter((n=>n.name.indexOf(".")>0)).map((n=>({action:"delete",file_path:n.path})));i.push(...r),t=ue()(n.headers.link),a=t?.next?.url}while(a);if(i?.length>0){i.push({action:"delete",file_path:"large-config.json"}),this.logPublishProgress(`Deleting ${i.length} files from repo...`);let t=`${Ce.BASE_URL}/projects/${n.publishReaderRepoId}/repository/commits`;await ne.Z.post(t,{branch:"master",commit_message:`Deleting existing reader for ${n.title}`,actions:i},{headers:{Authorization:`Bearer ${e.personalAccessToken}`}})}}async deleteContractBackup(n,e){if(e.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing contract files from repo...");let t=[{action:"delete",file_path:"/backup/contract/contract.json"},{action:"delete",file_path:"/backup/contract/contract-abi.json"}];if(t?.length>0){this.logPublishProgress(`Deleting ${t.length} files from repo...`);let a=`${Ce.BASE_URL}/projects/${n.publishReaderRepoId}/repository/commits`;await ne.Z.post(a,{branch:"master",commit_message:`Deleting existing contract files for ${n.title}`,actions:t},{headers:{Authorization:`Bearer ${e.personalAccessToken}`}})}}logPublishProgress(n){if(console.log(n),"undefined"!=typeof window&&void 0!==window.document){const e=new CustomEvent("publish-progress",{detail:{message:n}});document.dispatchEvent(e)}}chunkIt(n,e){let t=[];for(let a=0;a<n.length;a+=e){let i=n.slice(a,a+e);t.push(i)}return t}};ve=Ce=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[ee])],ve);var Ee,we=t(48764).Buffer;let xe=Ee=class{settingsService;static BASE_URL="https://api.github.com";static GRAPHQL_URL="https://api.github.com/graphql";static READER_REPO_OWNER="LargeNFT";static READER_REPO="large-reader";constructor(n){this.settingsService=n}async createFork(n){console.log("Creating reader fork...");let e=(await this.settingsService.get()).gitProviders.github;if(e.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let t=await this.getExistingFork(n);if(t)return t;let a=`${Ee.BASE_URL}/repos/${Ee.READER_REPO_OWNER}/${Ee.READER_REPO}/generate`,i=(await ne.Z.post(a,{owner:e.username,name:this.getBranchName(n),include_all_branches:!1,private:!1},{headers:{Authorization:`Bearer ${e.personalAccessToken}`}})).data;return{id:i.id,httpUrlToRepo:i.html_url,path:i.name,branch:"master"}}async getExistingFork(n){let e=(await this.settingsService.get()).gitProviders.github;if(e.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");try{let t=`${Ee.BASE_URL}/repos/${e.username}/${this.getBranchName(n)}`,a=(await ne.Z.get(t,{headers:{Authorization:`Bearer ${e.personalAccessToken}`}})).data;if(a.id)return{id:a.id,httpUrlToRepo:a.html_url,path:a.name,branch:"master"}}catch(n){}}async getForkRepoStatus(n){if((await this.settingsService.get()).gitProviders.github.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");return await this.getExistingFork(n)?"finished":"pending"}async commit(n,e,t){this.logPublishProgress(`Pushing ${e.length} files to repo...`);let a=await this.getMostRecentCommitOid(n,t);const i=e.map((n=>({path:n.file_path.slice(1),contents:we.from(n.content).toString("base64")}))),r=`\n            mutation createCommit($additions: [FileAddition!]!, $oid: GitObjectID!) {\n                createCommitOnBranch (input: {\n                    branch : {\n                        repositoryNameWithOwner: "${t.username}/${this.getBranchName(n)}"\n                        branchName: "master"\n                    }\n                    message: {\n                        headline: "feat: Commit through Graphql"\n                    }\n                    fileChanges: {\n                        additions: $additions\n                    }\n                    expectedHeadOid: $oid\n                    }) {\n                    commit {\n                        commitUrl\n                    }\n                }\n            }\n        `,o={oid:a,additions:i};await ne.Z.post(Ee.GRAPHQL_URL,{query:r,variables:o},{headers:{"Content-Type":"application/json",Authorization:`Bearer ${t.personalAccessToken}`}}),this.logPublishProgress(`Successfully pushed ${e.length} files to repo...`)}async getIPFSActionStatus(n){let e=(await this.settingsService.get()).gitProviders.github;if(e.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");try{let t=await this.getMostRecentActionRun(n,e);if("success"==t?.conclusion&&(!n.publishReaderIPFSActionResult?.dateCreated||de()(t.created_at).isAfter(de()(n.publishReaderIPFSActionResult.dateCreated))))return"finished"}catch(n){console.log(n)}}async getIPFSActionResult(n){let e=(await this.settingsService.get()).gitProviders.github;if(e.personalAccessToken.length<1)throw new Error(`${e.name} personal access token not set`);try{return(await ne.Z.get(`${Ee.BASE_URL}/repos/${e.username}/${n.publishReaderRepoPath}/contents/ipfs.json`,{headers:{Authorization:`Bearer ${e.personalAccessToken}`}})).data}catch(n){console.log(n)}}async getMostRecentActionRun(n,e){await this.getMostRecentCommit(n,e);const t=await ne.Z.get(`${Ee.BASE_URL}/repos/${e.username}/${n.publishReaderRepoPath}/actions/workflows/main.yml/runs?per_page=1&page=1`,{headers:{Authorization:`Bearer ${e.personalAccessToken}`}});if(t.data.workflow_runs?.length>0)return t.data.workflow_runs[0]}async createCommit(n,e,t,a,i){const r=await ne.Z.post(`${Ee.BASE_URL}/repos/${i.username}/${t.publishReaderRepoPath}/git/commits`,{message:a,parents:[n],tree:e},{headers:{Authorization:`Bearer ${i.personalAccessToken}`}});await ne.Z.patch(`${Ee.BASE_URL}/repos/${i.username}/${t.publishReaderRepoPath}/git/refs/heads/master`,{sha:r.data.sha},{headers:{Authorization:`Bearer ${i.personalAccessToken}`}})}async createTree(n,e,t,a){let i={tree:e,base_tree:n};return(await ne.Z.post(`${Ee.BASE_URL}/repos/${a.username}/${t.publishReaderRepoPath}/git/trees`,i,{headers:{Authorization:`Bearer ${a.personalAccessToken}`,Accept:"application/vnd.github+json"}})).data.sha}async deleteReaderBackup(n,e){if(e.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing files from repo..."),await this.deleteDirectory(n,e,".upload"),this.logPublishProgress("Successfully deleted existing backup...")}async deleteContractBackup(n,e){if(e.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing contract files from repo..."),await this.deleteDirectory(n,e,"backup/contract")}async getMostRecentCommit(n,e){return(await ne.Z.get(`${Ee.BASE_URL}/repos/${e.username}/${n.publishReaderRepoPath}/commits/master`,{headers:{Authorization:`Bearer ${e.personalAccessToken}`}})).data}async getMostRecentCommitOid(n,e){const t=`\n            query GetBranch{\n                repository (name: "${this.getBranchName(n)}", owner: "${e.username}") {\n                    ref (qualifiedName: "master") {\n                        target {\n                            ... on Commit {\n                                history(first: 1) {\n                                    nodes {\n                                        oid\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        `;return(await ne.Z.post(Ee.GRAPHQL_URL,JSON.stringify({query:t}),{headers:{"Content-Type":"application/json",Authorization:`Bearer ${e.personalAccessToken}`}})).data.data.repository.ref.target.history.nodes[0].oid}async deleteDirectory(n,e,t){const a=await this.getMostRecentCommit(n,e),i=a.commit.tree.sha;let r=(await ne.Z.get(`${Ee.BASE_URL}/repos/${e.username}/${n.publishReaderRepoPath}/git/trees/${i}`,{headers:{Authorization:`Bearer ${e.personalAccessToken}`}})).data.tree,o=r.find((n=>n.path==t))?.sha;if(o){let r=(await ne.Z.get(`${Ee.BASE_URL}/repos/${e.username}/${n.publishReaderRepoPath}/git/trees/${o}`,{headers:{Authorization:`Bearer ${e.personalAccessToken}`},params:{recursive:!0}})).data.tree.filter((({type:n})=>"blob"===n)).map((n=>({path:`${t}/${n.path}`,mode:n.mode,type:n.type,sha:null})));const l=await this.createTree(i,r,n,e);await this.createCommit(a.sha,l,n,`Deleting ${t}`,e)}}logPublishProgress(n){if(console.log(n),"undefined"!=typeof window&&void 0!==window.document){const e=new CustomEvent("publish-progress",{detail:{message:n}});document.dispatchEvent(e)}}chunkIt(n,e){let t=[];for(let a=0;a<n.length;a+=e){let i=n.slice(a,a+e);t.push(i)}return t}getBranchName(n){return n.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}};xe=Ee=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[ee])],xe);var Be=t(48764).Buffer;let ke=class{settingsService;channelService;authorService;gitlabService;githubService;schemaService;fs;repoURI;defaultBranch;constructor(n,e,t,a,i,r){this.settingsService=n,this.channelService=e,this.authorService=t,this.gitlabService=a,this.githubService=i,this.schemaService=r}async deployReader(n){this.logPublishProgress("Deploying reader...");let e=await this.settingsService.get(),t=await this.channelService.getGitProviderCredentials(n,e);if(t.personalAccessToken.length<1)throw new Error(`${t.name} personal access token not set`);let a=[],i=await this.schemaService.backupChannel();switch(a.push({action:"create",file_path:"/.upload/channel",content:Be.from(JSON.stringify(i.channel))}),a.push({action:"create",file_path:"/.upload/items",content:Be.from(JSON.stringify(i.items))}),a.push({action:"create",file_path:"/.upload/animations",content:Be.from(JSON.stringify(i.animations))}),a.push({action:"create",file_path:"/.upload/images",content:Be.from(JSON.stringify(i.images))}),a.push({action:"create",file_path:"/.upload/themes",content:Be.from(JSON.stringify(i.themes))}),a.push({action:"create",file_path:"/.upload/staticPages",content:Be.from(JSON.stringify(i.staticPages))}),a.push({action:"create",file_path:"/.upload/attributeCounts",content:Be.from(JSON.stringify(i.attributeCounts))}),t.name){case"gitlab":await this.gitlabService.deleteReaderBackup(n,t),await this.gitlabService.commit(n,a,t);break;case"github":await this.githubService.deleteReaderBackup(n,t),await this.githubService.commit(n,a,t)}this.logPublishProgress("Export to git complete")}async deployReaderContract(n,e){let t=await this.settingsService.get(),a=await this.channelService.getGitProviderCredentials(n,t);if(a.personalAccessToken.length<1)throw new Error(`${a.name} personal access token not set`);switch(a.name){case"gitlab":await this.gitlabService.deleteContractBackup(n,a),await this.gitlabService.commit(n,e,a);break;case"github":await this.githubService.deleteContractBackup(n,a),await this.githubService.commit(n,e,a)}this.logPublishProgress("Export to git complete")}async getExistingFork(n){let e=await this.settingsService.get(),t=await this.channelService.getGitProviderCredentials(n,e);if(t.personalAccessToken.length<1)throw new Error(`${t.name} personal access token not set`);switch(t.name){case"gitlab":return this.gitlabService.getExistingFork(n);case"github":return this.githubService.getExistingFork(n)}}async createFork(n){let e=await this.settingsService.get(),t=await this.channelService.getGitProviderCredentials(n,e);if(t.personalAccessToken.length<1)throw new Error(`${t.name} personal access token not set`);switch(t.name){case"gitlab":return this.gitlabService.createFork(n);case"github":return this.githubService.createFork(n)}}async getForkRepoStatus(n){let e=await this.settingsService.get(),t=await this.channelService.getGitProviderCredentials(n,e);if(t.personalAccessToken.length<1)throw new Error(`${t.name} personal access token not set`);switch(t.name){case"gitlab":return this.gitlabService.getForkRepoStatus(n);case"github":return this.githubService.getForkRepoStatus(n)}}async getIPFSActionStatus(n){let e=await this.settingsService.get(),t=await this.channelService.getGitProviderCredentials(n,e);if(t.personalAccessToken.length<1)throw new Error(`${t.name} personal access token not set`);switch(t.name){case"gitlab":return this.gitlabService.getIPFSActionStatus(n);case"github":return this.githubService.getIPFSActionStatus(n)}}async getIPFSActionResult(n){let e=await this.settingsService.get(),t=await this.channelService.getGitProviderCredentials(n,e);if(t.personalAccessToken.length<1)throw new Error(`${t.name} personal access token not set`);switch(t.name){case"gitlab":return this.gitlabService.getIPFSActionResult(n);case"github":return this.githubService.getIPFSActionResult(n)}}logPublishProgress(n){if(console.log(n),"undefined"!=typeof window&&void 0!==window.document){const e=new CustomEvent("publish-progress",{detail:{message:n}});document.dispatchEvent(e)}}};ke=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[ee,le,Nn,ve,xe,ln])],ke);var ye=t(3969);const De=new ye.DOMParser;let ze=class{itemService;channelService;imageService;authorService;animationService;quillService;themeService;queryCacheService;exportService;gitService;ipfsService;attributeCountService;constructor(n,e,t,a,i,r,o,l,s,A,d,c){this.itemService=n,this.channelService=e,this.imageService=t,this.authorService=a,this.animationService=i,this.quillService=r,this.themeService=o,this.queryCacheService=l,this.exportService=s,this.gitService=A,this.ipfsService=d,this.attributeCountService=c}async get(n){let e=await this.itemService.get(n);const t=await this.channelService.get(e.channelId);let a=(await this.queryCacheService.get(`token_id_stats_by_channel_${e.channelId}`)).result;return this.getViewModel(e,t,a)}async getNavigation(n,e){let t=await this.itemService.getByTokenId(n,e);const a=await this.channelService.get(t.channelId);return this.getNavigationViewModel(t,a)}async getViewModel(n,e,t){let a,i,r,o,l,s=[],A=!e.contractAddress;if(n.coverImageId)try{let e=await this.imageService.get(n.coverImageId);i={cid:e.cid,url:await this.imageService.getUrl(e)}}catch(n){}if(n.animationId)try{let e=await this.animationService.get(n.animationId);a={cid:e.cid,content:qn().unescape(e.content)};let t=De.parseFromString(e.content,"text/html").getElementsByTagName("body")[0];o=qn().unescape((new ye.B).serializeToString(t)),o="<div"+o.slice(5),o=o.substring(0,o.length-7)+"</div>"}catch(n){}if(e.authorId&&(l=await this.authorService.get(e.authorId),l.coverPhotoId)){let n=await this.imageService.get(l.coverPhotoId);r={cid:n.cid,url:await this.imageService.getUrl(n)}}if(e.attributeOptions.length>0){for(let t of e.attributeOptions){let e=n?.attributeSelections?.filter((n=>t?.traitType==n?.traitType));s.push({id:t.id,traitType:t.traitType,values:t.values,value:e?.length>0?e[0].value:""})}for(let n of s)try{let a=await this.attributeCountService.get(`${e._id}-${n.traitType}-${n.value}`);n.categoryPercent=a?new Intl.NumberFormat("default",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(a.count/t.count):""}catch(n){}}let d=t.max==n.tokenId,c=[];if(n.themes?.length>0)try{for(let e of n.themes)c.push(await this.themeService.get(e))}catch(n){}let f=await this.getImagesFromContent(n);return 0==f.filter((n=>n.cid==i?.cid)).length&&f.push(i),{item:n,themes:c,contentHTML:await this.quillService.translateContent(n.content),animationContentHTML:o,dateDisplay:de()(n.dateCreated).format("MMM Do YYYY"),channel:e,coverImage:i,animation:a,author:l,authorPhoto:r,authorDisplayName:this.authorService.getDisplayName(l),images:f,attributeSelections:s,editable:A,canDelete:d}}async getNavigationViewModel(n,e){let t=(await this.queryCacheService.get(`token_id_stats_by_channel_${e._id}`)).result,a=await this.getViewModel(n,e,t);return a.item.tokenId<t.max&&(a.next=a.item.tokenId+1),a.item.tokenId>t.min&&(a.previous=a.item.tokenId-1),a}async getListViewModel(n,e){let t;if(n.coverImageId)try{let e=await this.imageService.get(n.coverImageId);t={cid:e.cid,url:await this.imageService.getUrl(e)}}catch(n){}return{item:n,channel:e,coverImage:t}}async listByChannel(n,e,t){let a=[],i=await this.itemService.listByChannel(n,e,t);const r=await this.channelService.get(n);for(let n of i)a.push(await this.getListViewModel(n,r));return a}async getImagesFromContent(n){if(!n.content)return[];let e=n.content.ops;const t=[];if(e?.length>0){for(let n of e)n.insert&&n.insert.ipfsimage&&t.push({cid:n.insert.ipfsimage.cid,url:n.insert.ipfsimage.src});try{let e=await this.imageService.newFromItem(n);t.push({cid:e.cid,url:await this.imageService.getSVGURL(e),svg:e.svg,generated:!0})}catch(n){}}return t}async getNewViewModel(n){let e=await this.channelService.get(n),t=[];for(let n of e.attributeOptions)t.push({id:n.id,traitType:n.traitType,values:n.values,value:"",categoryPercent:""});return{item:{attributeSelections:[]},channel:e,attributeSelections:t,editable:!0,canDelete:!0}}async saveGeneratedCoverImage(n){let e=await this.getImagesFromContent(n),t=e?.filter((e=>n.coverImageId?e.cid==n.coverImageId:1==e.generated)),a=Object.assign(new j,t[0]);if(1==a.generated){delete a.url;try{await this.imageService.put(a)}catch(n){}n.coverImageId=a._id}return a}async saveAnimation(n){let e=await this.animationService.buildAnimationPage(n),t=await this.animationService.newFromText(e);try{await this.animationService.put(t)}catch(n){}return n.animationId=t._id,t}async updateGeneratedCoverImage(n){if(!(await this.imageService.get(n.coverImageId)).generated)return;let e=await this.imageService.newFromItem(n);try{await this.imageService.put(e)}catch(n){}n.coverImageId=e._id}async put(n){if(n.item.imageIds=this.exportService.getImageCidsByItem(n.item),n.item._rev){let e=await this.itemService.get(n.item._id),t=this.exportService.getImageCidsByItem(e).filter((e=>!n.item.imageIds?.includes(e)));for(let e of t)await this.deletePublishedImageByChannel(n.channel,n.item,e);n.item.animationId!=e.animationId&&(console.log(`Removing ${e.animationId} from animations.`),await this.deletePublishedAnimationByChannel(n.channel,n.item,e.animationId))}if(await this.itemService.put(n.item),n.publish){for(let e of n.item.imageIds)try{await this.publishImage(n.channel,await this.imageService.get(e),!1)}catch(n){}try{await this.publishAnimation(n.channel,await this.animationService.get(n.item.animationId),!1)}catch(n){}}if(n.updateQueryCache){let e=await this.queryCacheService.get(`token_id_stats_by_channel_${n.item.channelId}`),t=e.result;n.item.tokenId<t.min&&(t.min=n.item.tokenId),n.item.tokenId>t.max&&(t.max=n.item.tokenId,t.count++),e.result=t,await this.queryCacheService.put(e);let a=await this.itemService.getAttributeInfoBySelections(n.item.channelId,n.item.attributeSelections);for(let e of a){let t,a=`${n.item.channelId}-${e.traitType}-${e.value}`;try{t=await this.attributeCountService.get(a)}catch(n){}t||(t=new rn,t.channelId=n.item.channelId,t.traitType=e.traitType,t.value=e.value),t.count=e.count,await this.attributeCountService.put(t)}}}async delete(n){let e=await this.channelService.get(n.channelId);await this.itemService.delete(n);let t=this.exportService.getImageCidsByItem(n);for(let a of t)await this.deletePublishedImageByChannel(e,n,a);await this.deletePublishedAnimationByChannel(e,n,n.animationId),await this.deleteJSONForItem(e,n);let a=await this.queryCacheService.get(`token_id_stats_by_channel_${n.channelId}`),i=a.result;n.tokenId==i.min?(i.min=0,i.max=0,i.count=0):(i.max=n.tokenId-1,i.count--),a.result=i,await this.queryCacheService.put(a)}async clone(n){let e=JSON.parse(JSON.stringify(n));delete e._id,delete e._rev,delete e._rev_tree,delete e.tokenId,e=Object.assign(new R,e);let t=await this.channelService.get(n.channelId);await this.put({channel:t,item:e}),e.contentHTML=await this.quillService.translateContent(e.content,!0);let a=await this.saveGeneratedCoverImage(e);return n.coverImageGenerated=a.generated,await this.saveAnimation(e),await this.put({channel:t,item:e}),e}async publishImage(n,e,t=!0){if(!e)return;let a,i=`/export/${n._id}/images/${e.cid}.${e.buffer?"jpg":"svg"}`;try{a=await this.ipfsService.ipfs.files.stat(i,{hash:!0})}catch(n){}if(!a?.cid?.toString()){let n=await this.imageService.getImageContent(e);const a=await this.ipfsService.ipfs.add({content:n});await this.ipfsService.ipfs.files.cp(`/ipfs/${a.cid.toString()}`,i,{create:!0,parents:!0,flush:t})}}async deletePublishedImageByChannel(n,e,t){try{let a=await this.imageService.get(t),i=(await this.itemService.getByImageId(t)).filter((n=>n._id!=e._id));if(i?.length>0)return;await this.imageService.delete(a);let r=`/export/${n._id}/images/${a.cid}.${a.buffer?"jpg":"svg"}`;await this._safeDelete(r)}catch(n){}}async publishAnimation(n,e,t=!0){if(!e)return;let a,i=`/export/${n._id}/animations/${e.cid}.html`;try{a=await this.ipfsService.ipfs.files.stat(i,{hash:!0})}catch(n){}if(!a?.cid?.toString()){const n=await this.ipfsService.ipfs.add({content:e.content});await this.ipfsService.ipfs.files.cp(`/ipfs/${n.cid.toString()}`,i,{create:!0,parents:!0,flush:t})}}async deletePublishedAnimationByChannel(n,e,t){try{let a=await this.animationService.get(t),i=(await this.itemService.getByAnimationId(a._id)).filter((n=>n._id!=e._id));if(i?.length>0)return;await this.animationService.delete(a);let r=`/export/${n._id}/animations/${a.cid}.html`;await this._safeDelete(r)}catch(n){}}async deleteJSONForItem(n,e){let t=`/export/${n._id}/metadata/${e.tokenId}.json`;await this._safeDelete(t)}async _safeDelete(n){let e;try{e=await this.ipfsService.ipfs.files.stat(n,{hash:!0})}catch(n){}e?.cid?.toString()&&await this.ipfsService.ipfs.files.rm(n,{recursive:!0,flush:!0})}};ze=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[Qn,le,Rn,Nn,be,Cn,Sn,Ln,ge,ke,ie,oe])],ze);let qe=class{channelService;imageService;authorService;itemService;itemWebService;queryCacheService;gitService;schemaService;settingsService;constructor(n,e,t,a,i,r,o,l,s){this.channelService=n,this.imageService=e,this.authorService=t,this.itemService=a,this.itemWebService=i,this.queryCacheService=r,this.gitService=o,this.schemaService=l,this.settingsService=s}async get(n){return this.getViewModel(await this.channelService.get(n))}async getViewModel(n){let e,t,a,i,r=!n.contractAddress;if(await this.imageService.load(n._id),n.coverImageId)try{let t=await this.imageService.get(n.coverImageId);e={cid:t.cid,url:await this.imageService.getUrl(t)}}catch(n){}if(n.coverBannerId)try{let e=await this.imageService.get(n.coverBannerId);t={cid:e.cid,url:await this.imageService.getUrl(e)}}catch(n){}if(n.authorId&&(i=await this.authorService.get(n.authorId),i.coverPhotoId))try{let n=await this.imageService.get(i.coverPhotoId);a={cid:n.cid,url:await this.imageService.getUrl(n)}}catch(n){}let o,l,s=await this.channelService.countItemsByChannel(n._id);try{o=await this.settingsService.get()}catch(n){}try{l=await this.channelService.getGitProviderCredentials(n,o)}catch(n){}return{channel:n,coverImage:e,coverBanner:t,author:i,authorDisplayName:this.authorService.getDisplayName(i),authorPhoto:a,itemCount:s,editable:r,dateCreated:de()(n.dateCreated).format("MMM Do YYYY"),gitProvider:l}}async list(n,e){let t=[],a=await this.channelService.list(n,e);for(let n of a.filter((n=>!n.forkType||n.importSuccess)))t.push(await this.getViewModel(n));return t}async upgrade(n){let e=await this.itemService.listByChannel(n._id,1e5,0);for(let n of e){let e=await this.imageService.get(n.coverImageId);n.coverImageGenerated=e.generated;let t=Object.assign(new R,n);await this.itemService.put(t),console.log(t)}}async regenerateItemMedia(n){let e=await this.itemService.listByChannel(n._id,1e5,0);for(let n of e){await this.itemWebService.updateGeneratedCoverImage(n),await this.itemWebService.saveAnimation(n);let e=Object.assign(new R,n);await this.itemService.put(e)}}async put(n,e,t){if(await this.channelService.put(n),await this.schemaService.loadChannel(n._id),e)try{await this.imageService.put(Object.assign(new j,e))}catch(n){}if(t)try{await this.imageService.put(Object.assign(new j,t))}catch(n){}let a;try{a=await this.queryCacheService.get(`token_id_stats_by_channel_${n._id}`)}catch(n){}a||(a=new nn,a._id=`token_id_stats_by_channel_${n._id}`,a.result={min:0,max:0,count:0}),await this.queryCacheService.put(a)}};qe=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[le,Rn,Nn,Qn,ze,Ln,ke,ln,ee])],qe);let Ie=class{imageService;authorService;constructor(n,e){this.imageService=n,this.authorService=e}async get(n){return this.getViewModel(await this.authorService.get(n))}async getViewModel(n){let e;if(n.coverPhotoId){let t=await this.imageService.get(n.coverPhotoId);e={cid:t.cid,url:await this.imageService.getUrl(t)}}return{author:n,authorPhoto:e,authorDisplayName:this.authorService.getDisplayName(n)}}};Ie=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[Rn,Nn])],Ie);let Se=class{uiService;app;constructor(n,e){this.uiService=n,this.app=e}navigate(n,e,t="main"){console.log(`${t}: navigating to ${n.path}`),e||(e={reloadCurrent:!0,ignoreCache:!1,browserHistory:!0});let a=this.app.view[t];a?a.router.navigate(n,e):console.log(`Could not find view ${t}`)}navigateUrl(n,e,t="main"){console.log(`${t}: navigating to ${n}`);let a=this.app.view[t];a?a.router.navigate(n,e):console.log(`Could not find view ${t}`)}buildRoutesForContainer(n){let e=[];for(let t of globalThis.mappedRoutes){let a=n.get(t.controllerClass);e.push({path:t.path,async:async n=>{try{await this.resolveRoute(n.to,n.resolve,a[t.action](),t.showSpinner)}catch(n){this.uiService.showExceptionPopup(n)}}})}return e.push({path:"(.*)",async async(n){console.log(`404 error: ${n.to.path}`)}}),e}async resolveRoute(n,e,t,a=!0){a&&this.uiService.showSpinner("Loading...");let i=await t;if(!i)return;let r=await i.model,o=await r(n),l=Object.assign({},o);l.container=ti,i.view&&e({component:i.view},{props:l,history:!0,browserHistory:!0}),a&&this.uiService.hideSpinner()}};Se=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){return function(t,a){e(t,a,n)}}(1,(0,o.f)("framework7")),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[l,Object])],Se);class Fe{model;view;constructor(n,e){this.model=n,this.view=e}}function je(n,e){return function(t,a,i){globalThis.mappedRoutes||(globalThis.mappedRoutes=[]),globalThis.mappedRoutes.push({path:n,controllerClass:t.constructor,action:a,showSpinner:e})}}function We(n,{$on:e,$f7:t,$update:a}){let r=i.getWalletService(),o=r.address,l=null!=r.provider,s=n.active,A=n.reader_config,d=n.breadcrumbs;const c=/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/,f=n=>{const e=n.match(c);return e?`${e[1]}…${e[2]}`:n},p=async n=>{document.dispatchEvent(new CustomEvent("connect-wallet"))};return function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

    <div class="navbar">
        <div class="navbar-bg"></div>

        <div class="navbar-inner sliding">
        
          <div class="title">
            <a href="/">Large</a>
          </div>

          <div class="right">

            <div class="small-only">

              <a href="#" class="link popover-open" data-popover=".popover-menu">
                <i class="f7-icons">menu</i>
              </a> 

              <div class="popover popover-menu">
                <div class="popover-angle"></div>
                <div class="popover-inner">                    
                  <div class="list">
                    <ul>

                      <li>
                        <div class="item-content">
                          <div class="item-inner">
                              <div class="item-title">
                                  ${null!=o?e`
                                    <a href="/admin/author/show/${o}" class="link popover-close">${f(o)}</a>
                                `:e`
                                    <a class="popover-close" href="#" @click=${p}>Connect Wallet</a>
                                `} 
                              </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <a href="/admin/settings" class="item-link popover-close">
                          <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title">
                                    Settings
                                </div>
                            </div>
                          </div>
                        </a>
                      </li>

                    </ul>
              
                  </div>
      
                </div>
              </div>

            </div>

            <div class="large-only">
              
              ${l?e`
                ${null!=o?e`
                      <a href="/admin/author/show/${o}" class="link ${"profile"==s?e`link-active`:e` `}">${f(o)}</a>
                    `:e`
                      <a class="link" href="#" @click=${p}>Connect Wallet</button>
                    `}
              `:e`<span />`}

              <a class="link ${"settings"==s?e`link-active`:e` `}" href="/admin/settings" >
                Settings
              </a> 

            </div>
    
          </div>


          ${d?e`
                  
            <div class="subnavbar">
              <div class="subnavbar-inner">
                
                <div class="breadcrumbs ">
  
                  ${d.map(((n,t)=>e`
                    <div class="breadcrumbs-item ${t==d.length-1?"breadcrumbs-item-active":""}">

                      ${n.path?e`
                        <a href="${n.path}" class="link" >
                          ${n.text}
                        </a>
                      `:e`${n.text}`}


                    </div>  

                    ${n.path&&t!=d.length-1?e`
                      <div class="breadcrumbs-separator"></div>
                    `:e` `}

                    
                  `))}

                </div>
        
              </div>
            </div>


            `:e`<span />`}

          <!-- ${A?.path?e`
              <a href="${A.path}" class="link external">
                <i class="icon icon-back"></i> ${A.title}
              </a>
          `:""} -->

        </div>
      </div>

`}}We.id="7c51d7df91",We.style="\n\n\n";const $e=We;function Ye(n,{$:e,$h:t,$on:a,$f7:r,$update:o}){let s=i.getInstance(qe),A=(i.getInstance(Rn),i.getInstance(l));n.footerText;let d,c,f,p,b,m=[],g=[{text:"Home"}];function C(){console.log("Unload infinite scroll"),r.infiniteScroll.destroy("#channel-index-infinite-scroll"),e(".infinite-scroll-preloader").hide()}async function h(){if(!p&&f){A.showSpinner("Loading..."),p=!0;try{m=await s.list(20,d),m&&20==m.length?d+=m.length:f=!1,0==c&&b.deleteAllItems(),b.appendItems(m)}catch(n){console.log(n)}f||C(),c++,p=!1,A.hideSpinner()}}a("pageAfterOut",((n,e)=>{C()})),a("pageInit",((n,t)=>{d=0,c=0,f=!0,p=!1,b=r.virtualList.create({el:"#channel-index-list",renderItem:n=>u(n),items:[],setListHeight:!1,emptyTemplate:'\n              <li class="item-content">\n                <div class="item-inner">\n                    There are no collections yet. <br /><br />Click the \'Create Collection\' button to create your first collection.\n                </div>\n              </li>\n            '}),e("#channel-index-infinite-scroll").trigger("infinite"),b.on("itemsAfterInsert",((n,t)=>{e(".empty").each((n=>{const t=e(n).data("id"),a=m.filter((n=>n.channel._id==t))[0];a.channel.descriptionHTML&&(n.innerHTML=a.channel.descriptionHTML);let i=n.getElementsByTagName("a");for(let n of i)n.classList.add("external");e(n).removeClass("empty")})),e("#channel-index-list ul").css("height","")}))}));const u=n=>`\n              <li>\n                <a href="/admin/channel/show/${n.channel._id}" class="item-link">\n                  <div class="item-content">\n                    <div class="item-media">\n                      ${n.coverImage?`\n                        <img src="${n.coverImage.url}" class="avatar" />\n                      `:'\n                        <i class="material-icons avatar">image</i>\n                      '}\n                    </div>\n                    <div class="item-inner">\n                      <div class="item-title-row">\n                        <div class="item-title">\n                          ${n.channel.title}                          \n                        </div>\n                        <div class="item-after"><span class="badge">${n.itemCount}</span></div>\n                      </div>\n\n                      ${n.authorDisplayName?`\n                        <div class="item-subtitle">\n                          By ${n?.authorDisplayName}\n                        </div>\n                      `:""}\n\n                      <div class="description item-text empty" id="channel-description-${n.channel._id}" data-id="${n.channel._id}"></div>\n                    \n                      </div>\n                  </div>\n                </a>\n              </li>\n          `;return function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="admin-posts">

    <${$e} breadcrumbs=${g} />

    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/channel/create-menu">
        <i class="material-icons">create</i>
        <div class="fab-text">Create & Import</div>
      </a>
    </div>


    <div class="page-content infinite-scroll-content hide-toolbar-on-scroll" @infinite=${h} id="channel-index-infinite-scroll">


      <div class="card card-outline card-header-divider welcome">
        <div class="card-header">Welcome and thank you for using Large!</div>
        <div class="card-content card-content-padding">

          <p>
            Large is free software and designed to run on your own hardware with a standalone IPFS and Ethereum node.
          </p>

          <p>
            <strong>All data</strong> is in local storage in your browser and we can NEVER retreive it for you if you lose it. We do not have it and this is by design. 
          </p>

          <p>Help make Large better by submitting bugs and feedback on <a href="https://github.com/LargeNFT/large-nft" class="external">GitHub</a>.</p>

        </div>



      </div>


      <div class="list list-strong list-dividers media-list virtual-list inset" id="channel-index-list">
      </div>

      <div class="preloader infinite-scroll-preloader"></div>



    </div>


  </div>

`}}Ye.id="6aca9f5be3",Ye.style="\n\n\n";const Re=Ye,Ue=["English","Abkhazian","Afar","Afrikaans","Akan","Albanian","Amharic","Arabic","Aragonese","Armenian","Assamese","Avaric","Avestan","Aymara","Azerbaijani","Bambara","Bashkir","Basque","Belarusian","Bengali","Bihari languages","Bislama","Bosnian","Breton","Bulgarian","Burmese","Catalan, Valencian","Central Khmer","Chamorro","Chechen","Chichewa, Chewa, Nyanja","Chinese","Church Slavonic, Old Bulgarian, Old Church Slavonic","Chuvash","Cornish","Corsican","Cree","Croatian","Czech","Danish","Divehi, Dhivehi, Maldivian","Dutch, Flemish","Dzongkha","Esperanto","Estonian","Ewe","Faroese","Fijian","Finnish","French","Fulah","Gaelic, Scottish Gaelic","Galician","Ganda","Georgian","German","Gikuyu, Kikuyu","Greek (Modern)","Greenlandic, Kalaallisut","Guarani","Gujarati","Haitian, Haitian Creole","Hausa","Hebrew","Herero","Hindi","Hiri Motu","Hungarian","Icelandic","Ido","Igbo","Indonesian","Interlingua (International Auxiliary Language Association)","Interlingue","Inuktitut","Inupiaq","Irish","Italian","Japanese","Javanese","Kannada","Kanuri","Kashmiri","Kazakh","Kinyarwanda","Komi","Kongo","Korean","Kwanyama, Kuanyama","Kurdish","Kyrgyz","Lao","Latin","Latvian","Letzeburgesch, Luxembourgish","Limburgish, Limburgan, Limburger","Lingala","Lithuanian","Luba-Katanga","Macedonian","Malagasy","Malay","Malayalam","Maltese","Manx","Maori","Marathi","Marshallese","Moldovan, Moldavian, Romanian","Mongolian","Nauru","Navajo, Navaho","Northern Ndebele","Ndonga","Nepali","Northern Sami","Norwegian","Norwegian Bokmål","Norwegian Nynorsk","Nuosu, Sichuan Yi","Occitan (post 1500)","Ojibwa","Oriya","Oromo","Ossetian, Ossetic","Pali","Panjabi, Punjabi","Pashto, Pushto","Persian","Polish","Portuguese","Quechua","Romansh","Rundi","Russian","Samoan","Sango","Sanskrit","Sardinian","Serbian","Shona","Sindhi","Sinhala, Sinhalese","Slovak","Slovenian","Somali","Sotho, Southern","South Ndebele","Spanish, Castilian","Sundanese","Swahili","Swati","Swedish","Tagalog","Tahitian","Tajik","Tamil","Tatar","Telugu","Thai","Tibetan","Tigrinya","Tonga (Tonga Islands)","Tsonga","Tswana","Turkish","Turkmen","Twi","Uighur, Uyghur","Ukrainian","Urdu","Uzbek","Venda","Vietnamese","Volap_k","Walloon","Welsh","Western Frisian","Wolof","Xhosa","Yiddish","Yoruba","Zhuang, Chuang","Zulu"];var Pe=t(18634),Te=t.n(Pe),Ge=t(77616);function Oe(n,{$:e,$on:t,$f7:a,$update:r}){i.getWalletService(),i.getInstance(l),i.getInstance(le);let o=i.getInstance(_n),s=i.getInstance(Rn);const A=n=>{if(j=void 0,W=void 0,!n)return;let e=Ge.vz(n,"ether");try{j=Ge.bM(e),W=e.toString()}catch(n){console.log(n)}},d=n=>{$.channel.sellerFeeBasisPoints=void 0,$.channel.royaltyPercent=void 0,n&&($.channel.royaltyPercent=n,$.channel.sellerFeeBasisPoints=parseInt(100*n))},c=async n=>{A(n.currentTarget.value),await r()},f=async n=>{d(n.currentTarget.value),await r()},p=async n=>{e("#cover-image-browse").click()},b=async n=>{let e=await o.uploadFile(document.getElementById("cover-image-browse")),t=await s.newFromBuffer(e);const a=new CustomEvent("cover-image-updated",{detail:{coverImage:t}});document.dispatchEvent(a),$.coverImage={cid:t.cid,url:await s.getUrl(t)},await r()},m=async n=>{e("#banner-browse").click()},g=async n=>{let e=await o.uploadFile(document.getElementById("banner-browse")),t=await s.newFromBuffer(e);const a=new CustomEvent("cover-banner-updated",{detail:{coverBanner:t}});document.dispatchEvent(a),$.coverBanner={cid:t.cid,url:await s.getUrl(t)},await r()},C=async n=>{$.channel.disableForks="true"==e(n.currentTarget).val(),T=!$.channel.disableForks,await r()},h=async n=>{$.channel.showMintPage="true"==e(n.currentTarget).val(),await r()},u=async n=>{$.channel.showActivityPage="true"==e(n.currentTarget).val(),await r()},v=async n=>{$.channel.gitProvider=e(n.currentTarget).val(),await r()},E=async function(n){n.preventDefault();let t=e(n.target).data("id"),i=G.find((n=>n.id==t));a.form.fillFromData("#save-attribute-form",i),await r(),a.popup.open(".edit-category-popup")},w=async n=>{n.preventDefault();let t=e(n.currentTarget).data("id");G=G.filter((n=>n.id!=t)),await r()},x=async n=>{let e={id:(0,In.Z)(),traitType:"",values:[]};a.form.fillFromData("#save-attribute-form",e),await r(),a.popup.open(".edit-category-popup")},B=async n=>{n.preventDefault(),a.popup.close(".edit-category-popup")},k=async function(n){n.preventDefault();let t=e(n.target).data("id"),i=O.find((n=>n.id==t));a.form.fillFromData("#save-external-links-form",i),await r(),a.popup.open(".edit-external-links-popup")},y=async n=>{n.preventDefault();let t=e(n.currentTarget).data("id");console.log(t),O=O.filter((n=>n.id!=t)),await r()},D=async n=>{let e={id:(0,In.Z)(),name:"",link:""};a.form.fillFromData("#save-external-links-form",e),await r(),a.popup.open(".edit-external-links-popup")},z=async n=>{n.preventDefault(),a.popup.close(".edit-external-links-popup")},q=async function(n){n.preventDefault();let t=e(n.target).data("id"),i=_.find((n=>n.id==t));a.form.fillFromData("#save-marketplaces-form",i),await r(),a.popup.open(".edit-marketplaces-popup")},I=async n=>{n.preventDefault();let t=e(n.currentTarget).data("id");_=_.filter((n=>n.id!=t)),await r()},S=async n=>{let e={id:(0,In.Z)(),name:"",link:""};a.form.fillFromData("#save-marketplaces-form",e),await r(),a.popup.open(".edit-marketplaces-popup")},F=async n=>{n.preventDefault(),a.popup.close(".edit-marketplaces-popup")};e(document).on("popup:closed",".edit-category-popup",(async n=>{let e=a.form.convertToData("#save-attribute-form"),t={id:e.id,traitType:e.traitType,values:JSON.parse(e.values).map((n=>n.value))},i=G.find((n=>n.id==t.id));i?Object.assign(i,t):G.push(t),await r()})),e(document).on("popup:open",".edit-category-popup",(async n=>{new(Te())(document.getElementById("options-input")),e('input[name="traitType"]').focus()})),e(document).on("popup:closed",".edit-external-links-popup",(async n=>{let e=a.form.convertToData("#save-external-links-form");if(e.name){let n={id:e.id,name:e.name,link:e.link},t=O.find((e=>e.id==n.id));t?Object.assign(t,n):O.push(n)}await r()})),e(document).on("popup:closed",".edit-marketplaces-popup",(async n=>{let e=a.form.convertToData("#save-marketplaces-form");if(e.name){let n={id:e.id,name:e.name,link:e.link},t=_.find((e=>e.id==n.id));t?Object.assign(t,n):_.push(n)}await r()}));let j,W,$=n.channel,Y=n.description_toolbar,R=n.description_editor,U=n.license_toolbar,P=n.license_editor,T=!$.channel.disableForks,G=[],O=[],_=[];return $&&(A($.channel.mintPrice),d($.channel.royaltyPercent),$?.channel?.attributeOptions?.length>0&&(G=$.channel.attributeOptions),$.channel.externalLinks?.length>0&&(O=$.channel.externalLinks),$.channel.marketplaces?.length>0&&(_=$.channel.marketplaces)),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

    <div>
        <input type="hidden" name="_id" value="${$?.channel?._id}" />
        <input type="hidden" name="_rev" value="${$?.channel?._rev}" />
        <input type="hidden" name="dateCreated" value="${$?.channel?.dateCreated}" />
        <input type="hidden" name="authorId" value="${$?.channel?.authorId}" />
        <input type="hidden" name="contractAddress" value="${$?.channel?.contractAddress}" />

        <div class="card">
            <div class="card-content">
                <div class="list media-list">
                    <ul>
                        <li>
                            <a class="item-link" data-popup=".edit-basics-popup" class="popup-open">
                              <div class="item-content">
                                <div class="item-media">                                    
                                    <i class="f7-icons">pencil</i>
                                </div>
                                <div class="item-inner">
                                  <div class="item-title-row">
                                    <div class="item-title">Basic Info</div>
                                  </div>
                                  <div class="item-subtitle">Name, symbol, description, etc.</div>
                                </div>
                              </div>
                            </a>
                        </li>

                        <li>
                            <a class="item-link" data-popup=".edit-images-popup" class="popup-open">
                              <div class="item-content">
                                <div class="item-media">                                    
                                    <i class="f7-icons">photo</i>
                                </div>
                                <div class="item-inner">
                                  <div class="item-title-row">
                                    <div class="item-title">Cover Image & Banner</div>
                                  </div>
                                  <div class="item-subtitle">Add a cover image and banner.</div>
                                </div>
                              </div>
                            </a>
                        </li>

                        <li>
                            <a class="item-link" data-popup=".edit-attributes-popup" class="popup-open">
                              <div class="item-content">
                                <div class="item-media">                                    
                                    <i class="f7-icons">line_horizontal_3_decrease</i>
                                </div>
                                <div class="item-inner">
                                  <div class="item-title-row">
                                    <div class="item-title">Attributes</div>
                                  </div>
                                  <div class="item-subtitle">
                                    Add attributes to give specific items special properties. Items can be sorted and filtered by attribute and each attribute type gets a token owner leaderboard.
                                  </div>
                                </div>
                              </div>
                            </a>
                        </li>


                        <li>
                            <a class="item-link" data-popup=".edit-mint-info-popup" class="popup-open">
                              <div class="item-content">
                                <div class="item-media">                                    
                                    <i class="f7-icons">hammer</i>
                                </div>
                                <div class="item-inner">
                                  <div class="item-title-row">
                                    <div class="item-title">Mint Info</div>
                                  </div>
                                  <div class="item-subtitle">
                                    Set mint price and default royalty %.
                                  </div>
                                </div>
                              </div>
                            </a>
                        </li>


                        <li>
                            <a class="item-link" data-popup=".edit-licensing-popup" class="popup-open">
                              <div class="item-content">
                                <div class="item-media">                                    
                                    <i class="f7-icons">doc_text</i>
                                </div>
                                <div class="item-inner">
                                  <div class="item-title-row">
                                    <div class="item-title">Features & Licensing</div>
                                  </div>
                                  <div class="item-subtitle">
                                    Add copyleft or copyright information.
                                  </div>
                                </div>
                              </div>
                            </a>
                        </li>


                        <li>
                            <a class="item-link" data-popup=".edit-production-config-popup" class="popup-open">
                              <div class="item-content">
                                <div class="item-media">                                    
                                    <i class="f7-icons">gear</i>
                                </div>
                                <div class="item-inner">
                                  <div class="item-title-row">
                                    <div class="item-title">Configure Large Reader</div>
                                  </div>
                                  <div class="item-subtitle">
                                    Configure production deployment details and set up marketplaces and external links like Twitter and Discord.
                                  </div>
                                </div>
                              </div>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>


        <div class="popup edit-category-popup">
            <div class="view">
                <div class="page">
                    <div class="navbar">
                        <div class="navbar-bg"></div>
                        <div class="navbar-inner">
                            <div class="title">Edit Attribute Type</div>
                            <div class="right">
                                <!-- Link to close popup -->
                                <a class="link popup-close">Close</a>
                            </div>
                        </div>
                    </div>
                    <div class="page-content">

                        <form @submit="${B}" id="save-attribute-form">
                            <input type="hidden" name="id" />

                            <div class="list list-strong">

                                <ul>
                                    <li>
                                        <div class="item-content item-input">
                                            <div class="item-inner">
                                                <div class="item-title item-label">Trait Type</div>
                                                <div class="item-input-wrap">
                                                    <input type="text" name="traitType" placeholder="Enter trait type"
                                                        required minlength="3" tabindex="20" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="item-content item-input">
                                            <div class="item-inner">
                                                <div class="item-title item-label">Options</div>
                                                <div class="item-input-wrap">
                                                    <input type="text" placeholder="Enter options" name="values"
                                                        id="options-input" tabindex="21" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

        <div class="popup edit-external-links-popup">
            <div class="view">
                <div class="page">
                    <div class="navbar">
                        <div class="navbar-bg"></div>
                        <div class="navbar-inner">
                            <div class="title">Edit External Link</div>
                            <div class="right">
                                <!-- Link to close popup -->
                                <a class="link popup-close">Close</a>
                            </div>
                        </div>
                    </div>
                    <div class="page-content">

                        <form @submit="${z}" id="save-external-links-form">

                            <input type="hidden" name="id" />

                            <div class="list list-strong">

                                <ul>
                                    <li>
                                        <div class="item-content item-input">
                                            <div class="item-inner">
                                                <div class="item-title item-label">Name</div>
                                                <div class="item-input-wrap">
                                                    <input type="text" name="name" placeholder="Enter link text" required minlength="3" tabindex="60" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="item-content item-input">
                                            <div class="item-inner">
                                                <div class="item-title item-label">Link</div>
                                                <div class="item-input-wrap">
                                                    <input type="text" placeholder="http://some-url.com" name="link" tabindex="61" required />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="popup edit-marketplaces-popup">
            <div class="view">
                <div class="page">
                    <div class="navbar">
                        <div class="navbar-bg"></div>
                        <div class="navbar-inner">
                            <div class="title">Edit Marketplaces</div>
                            <div class="right">
                                <!-- Link to close popup -->
                                <a class="link popup-close">Close</a>
                            </div>
                        </div>
                    </div>
                    <div class="page-content">

                        <form @submit="${F}" id="save-marketplaces-form">

                            <input type="hidden" name="id" />

                            <div class="list list-strong">

                                <ul>
                                    <li>
                                        <div class="item-content item-input">
                                            <div class="item-inner">
                                                <div class="item-title item-label">Name</div>
                                                <div class="item-input-wrap">

                                                    <select name="name">
                                                        <option value="OpenSea">OpenSea</option>
                                                        <option value="OpenSea">LooksRare</option>
                                                        <option value="OpenSea">Blur</option>
                                                    </select>

                                                    <input type="text" name="name" placeholder="Enter collection link" required minlength="3" tabindex="60" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="item-content item-input">
                                            <div class="item-inner">
                                                <div class="item-title item-label">Link</div>
                                                <div class="item-input-wrap">
                                                    <input type="text" placeholder="http://some-url.com" name="link" tabindex="61" required />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>



        <div class="popup edit-basics-popup">
            <div class="view">
                <div class="page">
                    <div class="navbar">
                        <div class="navbar-bg"></div>
                        <div class="navbar-inner">
                            <div class="title">Edit Basic Info</div>
                            <div class="right">
                                <!-- Link to close popup -->
                                <a class="link popup-close">Close</a>
                            </div>
                        </div>
                    </div>
                    <div class="page-content">
                        <div class="list">
                            <ul>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Title</div>
                                            <div class="item-input-wrap">
                                                ${$.editable?e`
                                                <input type="text" name="title" placeholder="Collection title"
                                                    value="${$?.channel?.title}" required minlength="3"
                                                    tabindex="1" />
                                                `:e`
                                                <input type="text" name="title" placeholder="Collection title"
                                                    value="${$?.channel?.title}" required minlength="3"
                                                    tabindex="1" disabled />
                                                `}
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Symbol</div>
                                            <div class="item-input-wrap">

                                                ${$.editable?e`
                                                <input type="text" name="symbol" placeholder="Symbol (eg BAYC)"
                                                    value="${$?.channel?.symbol}" tabindex="2"
                                                    required />
                                                `:e`
                                                <input type="text" name="symbol" placeholder="Symbol (eg BAYC)"
                                                    value="${$?.channel?.symbol}" tabindex="2" required
                                                    disabled />
                                                `}



                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Description</div>

                                            <div id="${Y}">

                                                <select class="ql-header">
                                                    <option selected></option>
                                                    <option value="1">Heading</option>
                                                    <option value="2">Subheading</option>
                                                    <option value="3">Normal</option>
                                                </select>


                                                <!-- Add a bold button -->
                                                <button class="ql-bold"></button>
                                                <button class="ql-italic"></button>
                                                <button class="ql-strike"></button>
                                                <button class="ql-underline"></button>

                                            </div>

                                            <div class="editor bg-color-white text-color-black channel-editor"
                                                id="${R}" tabindex="3"></div>

                                        </div>
                                    </div>
                                </li>


                                <li class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">Language</div>
                                        <!-- additional "input-dropdown-wrap" class -->
                                        <div class="item-input-wrap input-dropdown-wrap">
                                            <select name="language" tabindex="9">
                                                ${Ue.map((n=>e`
                                                ${$?.channel?.language==n?e`
                                                <option value="${n}" selected>${n}</option>
                                                `:e`
                                                <option value="${n}">${n}</option>
                                                `}
                                                `))}
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="popup edit-images-popup">
            <div class="view">
                <div class="page">
                    <div class="navbar">
                        <div class="navbar-bg"></div>
                        <div class="navbar-inner">
                            <div class="title">Edit Cover Image & Banner</div>
                            <div class="right">
                                <!-- Link to close popup -->
                                <a class="link popup-close">Close</a>
                            </div>
                        </div>
                    </div>
                    <div class="page-content">
                        <div class="list">
                            <ul>
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Collection Avatar</div>
                                            <div class="item-input-wrap">

                                                ${$.coverImage?e`
                                                <img class="avatar-preview" src="${$?.coverImage.url}" />

                                                `:e`
                                                <i class="material-icons avatar-preview">image</i>
                                                `}

                                                <input type="button" class="button button-fill browse-file"
                                                    value="Browse" @click="${p}"
                                                    tabindex="4" />
                                                <input type="hidden" name="coverImageId"
                                                    value="${$?.coverImage?.cid}" />
                                                <input type="file" id="cover-image-browse" style="display: none"
                                                    @change="${b}" />

                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Collection Banner</div>
                                            <div class="item-input-wrap">

                                                ${$?.coverBanner?e`
                                                <img class="cover-banner-preview"
                                                    src="${$?.coverBanner.url}" />
                                                `:e`
                                                <i class="material-icons cover-banner-preview">image</i>
                                                `}

                                                <input type="button" class="button button-fill browse-file"
                                                    value="Browse" @click="${m}" tabindex="5" />
                                                <input type="hidden" name="coverBannerId"
                                                    value="${$?.coverBanner?.cid}" />

                                                <input type="file" id="banner-browse" style="display: none"
                                                    @change="${g}" />

                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="popup edit-attributes-popup">
            <div class="view">
                <div class="page">
                    <div class="navbar">
                        <div class="navbar-bg"></div>
                        <div class="navbar-inner">
                            <div class="title">Edit Attributes</div>
                            <div class="right">
                                <!-- Link to close popup -->
                                <a class="link popup-close">Close</a>
                            </div>
                        </div>
                    </div>
                    <div class="page-content">

                        <div class="block">

                            ${G?.length>0?e`

                                <ul>
        
                                    ${G?.map((n=>e`
                                    <li>
                                        <span style="width: 100px; margin-right: 10px;">${n.traitType}</span>
        
                                        ${$.editable?e`
                                        <a class="link" href="#" data-id="${n.id}" @click="${E}">Edit</a> | <a
                                            class="link" href="#" data-id="${n.id}" @click="${w}">Delete</a>
                                        `:e` `}
        
                                        <p>
                                            ${n.values?.map(((n,t)=>e`
        
                                        <div class="chip chip-outline">
                                            <div class="chip-label">${n}</div>
                                        </div>
        
                                        `))}
                                        </p>
                                    </li>
                                    `))}
        
                                </ul>
    
                            `:e`
                                No attributes exist.
                            `}
        
                            ${$.editable?e`
                                <a class="button button-outline add-category-button" @click="${x}" tabindex="10">Add Attribute Type</a>
                            `:e` `}

                            
    
                            <input type="hidden" name="attributeOptions" value="${JSON.stringify(G)}" />
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="popup edit-mint-info-popup">
            <div class="view">
                <div class="page">
                    <div class="navbar">
                        <div class="navbar-bg"></div>
                        <div class="navbar-inner">
                            <div class="title">Edit Mint Info</div>
                            <div class="right">
                                <!-- Link to close popup -->
                                <a class="link popup-close">Close</a>
                            </div>
                        </div>
                    </div>
                    <div class="page-content">
                        <div class="list">
                            <ul>
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Mint Price in ETH</div>
                                            <div class="item-input-wrap">

                                                ${$.editable?e`
                                                <input type="number" placeholder="Enter price for one piece (eg 0.08)"
                                                    @change="${c}" step="any" tabindex="11"
                                                    value="${$?.channel?.mintPrice}" />
                                                `:e`
                                                <input type="number" placeholder="Enter price for one piece (eg 0.08)"
                                                    @change="${c}" step="any" tabindex="11"
                                                    value="${$?.channel?.mintPrice}" disabled />
                                                `}

                                                <input type="hidden" name="mintPrice" value="${j}" />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                ${j?e`
                                <li tabindex="-1">
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-text"> You will receive <strong>${j}</strong> ETH
                                                (${W} wei) for
                                                each mint.</div>
                                        </div>
                                    </div>
                                </li>
                                `:e``}

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Marketplace Creator Fee %</div>
                                            <div class="item-input-wrap">

                                                ${$.editable?e`
                                                <input type="number" name="royaltyPercent" placeholder="Royalty %"
                                                    @change="${f}" step="any" tabindex="12"
                                                    value="${$?.channel?.royaltyPercent}" />
                                                `:e`
                                                <input type="number" name="royaltyPercent" placeholder="Royalty %"
                                                    @change="${f}" step="any" tabindex="12"
                                                    value="${$?.channel?.royaltyPercent}" disabled />
                                                `}

                                                <input type="hidden" name="sellerFeeBasisPoints"
                                                    value="${$?.channel?.sellerFeeBasisPoints}" />

                                            </div>
                                        </div>
                                    </div>
                                </li>


                                ${$?.channel?.royaltyPercent?e`
                                <li tabindex="-1">
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-text">
                                                You will receive a <strong>${$?.channel?.royaltyPercent}%</strong> for each sale on OpenSea, etc. Confirm this
                                                value when you set up your collection on the marketplace. This just presets it for you.
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                `:e``}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="popup edit-licensing-popup">
            <div class="view">
                <div class="page">
                    <div class="navbar">
                        <div class="navbar-bg"></div>
                        <div class="navbar-inner">
                            <div class="title">Edit Features & Licensing</div>
                            <div class="right">
                                <!-- Link to close popup -->
                                <a class="link popup-close">Close</a>
                            </div>
                        </div>
                    </div>
                    <div class="page-content">
                        <div class="list">
                            <ul>
                                <li class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">Features and Licensing</div>
                                        <div class="item-input-wrap input-dropdown-wrap">
                                            <select name="disableForks" @change="${C}">

                                                ${$.channel.disableForks?e`
                                                <option value="false">Copyleft / CC0</option>
                                                <option value="true" selected>Copyright</option>
                                                `:e`
                                                <option value="false" selected>Copyleft / CC0</option>
                                                <option value="true">Copyright</option>
                                                `}


                                            </select>
                                        </div>
                                    </div>
                                </li>

                                ${$.channel.disableForks?e`<span />`:e`

                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-text">Use Creative Commons <a
                                                    href="https://creativecommons.org/choose/zero/" class="external"
                                                    target="_blank">CC0 tool</a> to generate licensing text.</div>
                                        </div>
                                    </div>
                                </li>

                                `}



                                <li class="license-editor">
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">License</div>

                                            <div id="${U}">

                                                <!-- Add a bold button -->
                                                <button class="ql-bold"></button>
                                                <button class="ql-italic"></button>
                                                <button class="ql-strike"></button>
                                                <button class="ql-underline"></button>

                                            </div>

                                            <div class="editor bg-color-white text-color-black channel-editor"
                                                id="${P}" tabindex="13"></div>

                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="popup edit-production-config-popup">
            <div class="view">
                <div class="page">
                    <div class="navbar">
                        <div class="navbar-bg"></div>
                        <div class="navbar-inner">
                            <div class="title">Configure Large Reader</div>
                            <div class="right">
                                <!-- Link to close popup -->
                                <a class="link popup-close">Close</a>
                            </div>
                        </div>
                    </div>
                    <div class="page-content">
                        <div class="list">
                            <ul>

                                <li class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">Git Provider</div>
                                        <div class="item-input-wrap input-dropdown-wrap">
                                            <select name="gitProvider" @change="${v}" tabindex="14">

                                                ${$.channel.gitProvider&&"default"!=$.channel.gitProvider?e`
                                                <option value="default">Default</option>
                                                `:e`
                                                <option value="default" selected>Default</option>
                                                `}

                                                ${"github"==$.channel.gitProvider?e`
                                                <option value="github" selected>GitHub</option>
                                                `:e`
                                                <option value="github">GitHub</option>
                                                `}


                                                ${"gitlab"==$.channel.gitProvider?e`
                                                <option value="gitlab" selected>GitLab</option>
                                                `:e`
                                                <option value="gitlab">GitLab</option>
                                                `}


                                            </select>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Production Hostname</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="productionHostname" placeholder="http://localhost" value="${$?.channel?.productionHostname}" tabindex="40" />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Production Base URI</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="productionBaseURI" placeholder="/" value="${$?.channel?.productionBaseURI}" tabindex="41" />
                                            </div>
                                        </div>
                                    </div>
                                </li>


                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Production Base Library URI</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="productionBaseLibraryURI" placeholder="/" value="${$?.channel?.productionBaseLibraryURI}" tabindex="42" />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Show Mint Page?</div>
                                            <div class="item-input-wrap">

                                                <select name="showMintPage" @change="${h}">

                                                    ${1==$.channel.showMintPage?e`
                                                        <option value="false">No</option>
                                                        <option value="true" selected>Yes</option>
                                                    `:e`
                                                        <option value="false" selected>No</option>
                                                        <option value="true">Yes</option>
                                                    `}
    
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Show Activity Page?</div>
                                            <div class="item-input-wrap">

                                                <select name="showActivityPage" @change="${u}">

                                                    ${1==$.channel.showActivityPage?e`
                                                        <option value="false">No</option>
                                                        <option value="true" selected>Yes</option>
                                                    `:e`
                                                        <option value="false" selected>No</option>
                                                        <option value="true">Yes</option>
                                                    `}
    
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">External Links</div>
                                            <div class="block">

                                                ${O?.length>0?e`

                                                    <ul style="padding-left: 0px;">
                            
                                                        ${O?.map((n=>e`
                                                        <li>
                                                            <span style="width: 100px; margin-right: 10px;">${n.name}</span>
                            
                                                            <a class="link" href="#" data-id="${n.id}" @click="${k}">Edit</a> | 
                                                            <a class="link" href="#" data-id="${n.id}" @click="${y}">Delete</a>
                                                        </li>
                                                        `))}
                            
                                                    </ul>

                        
                                                `:e`
                                                    No external links exist.
                                                `}
                            
                                                <a class="button button-outline " @click="${D}" tabindex="10">Add External Link</a>
                                                         
                                                <input type="hidden" name="externalLinks" value="${JSON.stringify(O)}" />
               
                                            </div>
                                        </div>
                                    </div>
                                </li>


                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Marketplaces</div>
                                            <div class="block">

                                                ${_?.length>0?e`

                                                    <ul style="padding-left: 0px;">
                            
                                                        ${_?.map((n=>e`
                                                        <li>
                                                            <span style="width: 100px; margin-right: 10px;">${n.name}</span>
                            
                                                            <a class="link" href="#" data-id="${n.id}" @click="${q}">Edit</a> | 
                                                            <a class="link" href="#" data-id="${n.id}" @click="${I}">Delete</a>
                                                        </li>
                                                        `))}
                            
                                                    </ul>

                        
                                                `:e`
                                                    No marketplaces exist.
                                                `}
                            
                                                <a class="button button-outline " @click="${S}" tabindex="10">Add Marketplace</a>

                    
                                                
                        
                                                <input type="hidden" name="marketplaces" value="${JSON.stringify(_)}" />
               


                                            </div>
                                        </div>
                                    </div>
                                </li>


                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


`}}Oe.id="1aafc52ab9",Oe.style="\n\n\n\n\n\n";const _e=Oe;var Xe=t(20637);function Me(n,{$:e,$on:t,$f7:a,$update:r}){i.getInstance(le);let o,s,A=i.getInstance(qe),d=i.getInstance(Nn),c=i.getInstance(Pn),f=(i.getInstance(l),i.getWalletService()),p=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Create Collection"}];Xe.Z.configure({languages:["css"]});let b,m,g={channel:{mintPrice:"0.00",royaltyPercent:"0",authorId:f.address},themes:[],staticPages:[],editable:!0,disableForks:!1};const C=async n=>{if(n.preventDefault(),!document.getElementById("create-channel-form").checkValidity())return void a.popup.open(".edit-basics-popup");let e=Object.assign(new k,a.form.convertToData("#create-channel-form"));e.description=c.activeEditor.getContents(),e.license=o.getContents(),e.sellerFeeBasisPoints=parseInt(e.sellerFeeBasisPoints),e.attributeOptions?e.attributeOptions=JSON.parse(e.attributeOptions):e.attributeOptions=[],e.externalLinks?e.externalLinks=JSON.parse(e.externalLinks):e.externalLinks=[],e.marketplaces?e.marketplaces=JSON.parse(e.marketplaces):e.marketplaces=[],e.authorId&&await d.insertIfNew(e.authorId),e.disableForks="true"==e.disableForks,e.showMintPage="true"==e.showMintPage,e.showActivityPage="true"==e.showActivityPage;try{await A.put(e,b,m),a.toast.show({text:"Collection saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),a.views.main.router.navigate(`/admin/channel/show/${e._id}`)}catch(n){console.log(n),a.dialog.alert(n.errors,"There was an error")}};t("pageInit",(async(n,t)=>{e("#create-channel-form").attr("novalidate","novalidate"),await c.init(),c.buildQuillPostEditor("#create-channel-description-editor","#create-channel-description-toolbar"),o=new(vn())("#create-channel-license-editor",{bounds:".page-content",modules:{toolbar:"#create-channel-license-toolbar"},theme:"snow"}),s=a.swiper.create(".swiper",{speed:1e3,allowTouchMove:!1,createElements:!0,longSwipes:!1,preventInteractionOnTransition:!0,shortSwipes:!1,simulateTouch:!1,on:{slideChange:function(n){0==n.activeIndex&&(document.getElementById("create-new-swiper").style.height="700px"),1==n.activeIndex&&(document.getElementById("create-new-swiper").style.height="2500px")}}})}));const h=async n=>{g.channel.disableForks=!0,await r(),s.slideNext(1e3)},u=async n=>{g.channel.disableForks=!1,await r(),s.slideNext(1e3)};return e(document).on("cover-image-updated",(async n=>{b=n.detail.coverImage})),e(document).on("cover-banner-updated",(async n=>{m=n.detail.coverBanner})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="admin-create-channel">

    <${$e} breadcrumbs=${p} />

    <div class="page-content hide-toolbar-on-scroll">

        <!-- Slider container -->
        <div class="swiper" id="create-new-swiper">

          <!-- Slides wrapper -->
          <div class="swiper-wrapper">
              <!-- Slides -->
              <div class="swiper-slide">
                
                <div class="fixed-width-content center">

                  <div class="block-title block-title-medium no-margin-bottom margin-top">Choose your features and licensing</div>

                  <div class="block split-row">
  
                    <div class="block copyright-block no-margin-bottom">
  
                      <strong>Copyright</strong>
  
                      <ul>
                        <li>Use your own licensing terms.</li>
                        <li>Restrict who can host the content (DMCA).</li>
                      </ul>
  
                      <button class="button color-red button-outline" @click="${h}">Disable forking</button>
                      
                    </div>
  
                    <div class="block copyleft-block">
  
                      <strong>Copyleft</strong>
  
                      <ul>
                        <li>Free as in speech.</li>
                        <li>Allow sharing, remixes, and derivatives.</li>
                        <li>Anyone can host the content.</li>
                        <li><a href="https://creativecommons.org/share-your-work/public-domain/cc0/"></a>CC0 Content</li>
                      </ul>
  
                      <button class="button button-fill" @click="${u}">Enable all features</button>
  
                    </div>
  
                  </div>
                  
                </div>

              </div>

              <div class="swiper-slide">

                <form id="create-channel-form" @submit="${C}" class="fixed-width-content center">
      
                  <div class="block-title block-title-medium">Create Collection</div>


                  <${_e} 
                    channel=${g} 
                    description_editor="create-channel-description-editor"
                    description_toolbar="create-channel-description-toolbar" 
                    license_editor="create-channel-license-editor"
                    license_toolbar="create-channel-license-toolbar" 
                  />
      
                  <div class="block cancel-save-row">
      
                    <div class="large-only"></div>
      
                    <a href="/admin/channel/create-menu" class="button button-outline color-gray" tabindex="30">
                      Cancel
                    </a>

                    <button type="submit" class="button button-fill" tabindex="31" id="saveButton">
                      Save
                    </button>
      
                  </div>
      
                </form>
      
              </div>

              <!-- Pagination, if required -->
              <div class="swiper-pagination"></div>
          </div>

        </div>

    </div>
  </div>

`}}Me.id="53b2e1801a",Me.style="\n\n\n\n";const Ze=Me;function Ne(n,{$:e,$on:t,$f7:a,$update:r}){let o=i.getInstance(Qn),l=n.channel,s=n.item,A=n.token_id?n.token_id:s.item.tokenId;const d=async n=>{n.preventDefault();const t=e(n.currentTarget).children(".goto-input").val();await o.getByTokenId(l,parseInt(t.toString()))?a.views.main.router.navigate(`/admin/channel/show/${l}/${parseInt(t.toString())}`):a.dialog.alert("Invalid Page")};return function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

    <div class="card" >
      <form class="card-content card-content-padding" @submit="${d}">
        <input type="number" class="goto-input" style="width: 60px; border: 1px solid #cccccc; display: inline-block;" value="${A}" min="0"  />
        <span class="paging-label">Enter Token ID</span>
        <button class="goto-button button button-small button-fill">Go</button>
      </form>
    </div>

`}}Ne.id="de0127ceff",Ne.style="    \n";const Le=Ne;function Qe(n,{$:e,$on:t,$f7:a,$update:r}){i.getInstance(le),i.getWalletService();let o,l=globalThis.container.get(ze),s=n.channelViewModel,A=n.firstPageItems,d=[],c=0,f=!0,p=!1,b=s.itemCount,m=s.editable,g=[{text:"Home",path:"/"},{text:s.channel.title}];const C=n=>{const e=h();o.params.cols=e>=1024?5:2,o.params.height=e>=1024?290:250,o?.update(),console.log("Resized...")},h=()=>Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),u={el:"#item-list",createUl:!1,renderItem(n){return`<li class="flex-card">\n                  <a href="/admin/channel/show/${(e=n).channel._id}/${e.item.tokenId}" class="item-link">\n                      <div class="card" >\n                          <div class="card-content">\n                              <div class="square">\n                                  <img src="${e.coverImage?.url}"/>\n                              </div>\n                          </div>\n\n\n                          <div class="card-footer">\n                              ${e.item.title?e.item.title:`#${e.item.tokenId}`} \n                          </div>\n                      </div>\n                  </a>\n              </li>\n      `;var e},height:h()>=1024?290:250,items:d,cols:h()>=1024?5:2,emptyTemplate:'\n          <li class="item-content">\n              <div class="item-inner">\n                  No items in collection.\n              </div>\n          </li>\n          '};t("pageInit",(async(n,t)=>{if(d.push(...A),c=A.length,s?.coverBanner?.url?e(`.show-channel-banner-${s.channel._id}`).css("background-image",`url(${s.coverBanner.url})`):e(`.show-channel-banner-${s.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${s.channel._id}`)){let n=document.getElementById(`channel-show-description-${s.channel._id}`).getElementsByTagName("a");for(let e of n)e.classList.add("external")}e(".animation-container a").addClass("external"),window.addEventListener("resize",C),v()})),t("pageBeforeOut",(async()=>{window.removeEventListener("resize",C)}));const v=()=>{o=a.virtualList.create(u),o.items?.length<b?document.getElementById("item-list-infinite-scroll").addEventListener("infinite",E):e(".infinite-scroll-preloader").hide()};async function E(n){if(!p&&f){console.log("Infinite scrolling..."),p=!0;try{let n=await l.listByChannel(s.channel._id,P.CHUNK_SIZE,c);c+=n.length,c>=b&&(f=!1),o.appendItems(n)}catch(n){console.log(n)}a.preloader.hide(),f||(console.log("Unload infinite scroll item list"),a.infiniteScroll.destroy("#item-list-infinite-scroll"),a.virtualList.destroy("#item-list"),o=void 0,e(".infinite-scroll-preloader").hide()),p=!1}}return function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="admin-show-collection">

    <${$e} breadcrumbs=${g} />


    ${m?e`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${s.channel._id}">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    `:e``}


    <div class="page-content infinite-scroll-content hide-toolbar-on-scroll" id="item-list-infinite-scroll">

      <div class="fixed-width-content center">

        <channel-card channel_view_model=${s}></channel-card>

        <div class="block">
          <p class="segmented">
            <a class="button button-outline button-active" href="#">Items</a>
            <a class="button button-outline" href="/admin/channel/themes/${s.channel._id}">Themes</a>
            <a class="button button-outline" href="/admin/channel/static-pages/${s.channel._id}">Static Pages</a>
          </p>
        </div>
  
        <${Le} channel=${s.channel._id} token_id="1" />
  
  
      
        <div class="list cards-list virtual-list" id="item-list" >
          <ul class="item-flex"></ul>
        </div>
  
        <div class="block">
          <br />
        </div>
  
        <div class="preloader infinite-scroll-preloader"></div>

      </div>



    </div>

  </div>

`}}t(18515),Qe.id="977ad4d265",Qe.style="\n  \n\n";const He=Qe;function Ve(n,{$:e,$on:t,$f7:a,$update:i}){let r=n.theme,o=n.cover_image_css_editor_id,l=n.animation_css_editor_id;return function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

    <div class="list">

        <input type="hidden" name="_id"  value="${r?._id}" />
        <input type="hidden" name="_rev" value="${r?._rev}" />
        <input type="hidden" name="dateCreated" value="${r?.dateCreated}" />

        <ul>
            <li>
                <div class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Title</div>
                        <div class="item-input-wrap">
                            <input type="text" name="name" placeholder="Name"
                                value="${r?.name}" required  minlength="3" tabindex="1" />
                        </div>
                    </div>
                </div>
            </li>

            <li>
                <div class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Cover Image CSS (SVG)</div>
                        <div class="editor bg-color-white text-color-black css-editor" id="${o}" tabindex="2" style="min-height: 100px;">.svg-h1 {}</div>
                    </div>
                </div>
            </li>
    
            <li>
                <div class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Animation CSS (HTML)</div>
                        <div class="editor bg-color-white text-color-black css-editor" id="${l}" tabindex="3" style="min-height: 100px;">.animation-container {}</div>
                    </div>
                </div>
            </li>

        </ul>
    </div>


`}}Ve.id="c29e37e187",Ve.style="\n    \n";const Je=Ve;function Ke(n,{$:e,$on:t,$f7:a,$update:r}){let o,s,A,d=i.getInstance(Sn),c=(i.getInstance(l),n.channelViewModel),f=n.themes,p=c.editable,b=[{text:"Home",path:"/"},{text:c.channel.title,path:`/admin/channel/show/${c.channel._id}`},{text:"Themes"}];const m=async()=>{f=await d.listByChannel(c.channel._id,1e3,0)},g=function(n){s=new(vn())("#add-theme-cover-image-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:n=>hljs.highlightAuto(n).value},toolbar:!1}}),A=new(vn())("#add-theme-animation-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:n=>hljs.highlightAuto(n).value},toolbar:!1}})},C=async function(n){n.preventDefault();let e=Object.assign(new Z,a.form.convertToData("#add-theme-form"));e.coverImageCSS="\n"!=s.getText()?s.getText():void 0,e.animationCSS="\n"!=A.getText()?A.getText():void 0,e.channelId=c.channel._id,e._id=(0,In.Z)(),e.dateCreated=(new Date).toJSON();try{await d.put(e),await m(),a.form.fillFromData("#add-theme-form",{name:""}),s.setText(""),A.setText(""),await r(),a.popup.close(".add-theme-popup")}catch(n){a.dialog.alert(n,"There was an error")}},h=async function(n){n.preventDefault();let e=Object.assign(new Z,a.form.convertToData("#edit-theme-form"));e.coverImageCSS="\n"!=s.getText()?s.getText():void 0,e.animationCSS="\n"!=A.getText()?A.getText():void 0,e.channelId=c.channel._id;try{await d.put(e),await m(),await r(),a.popup.close(".edit-theme-popup")}catch(n){console.log(n),a.dialog.alert(n.errors,"There was an error")}},u=async function(n){let t=e(n.target).data("id");a.dialog.confirm("Are you sure you want to delete this theme?",(async()=>{let n=await d.get(t);await d.delete(n),await m(),await r(),a.toast.show({text:"Theme deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))},v=async function(n){let t=e(n.target).data("id");o=f.filter((n=>n._id==t))[0],s=new(vn())("#edit-theme-cover-image-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:n=>hljs.highlightAuto(n).value},toolbar:!1}}),A=new(vn())("#edit-theme-animation-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:n=>hljs.highlightAuto(n).value},toolbar:!1}}),a.form.fillFromData("#edit-theme-form",o),s.setText(o.coverImageCSS?o.coverImageCSS:""),A.setText(o.animationCSS?o.animationCSS:""),await r(),a.popup.open(".edit-theme-popup")};return t("pageInit",(async(n,t)=>{if(c?.coverBanner?.url?e(`.show-channel-banner-${c.channel._id}`).css("background-image",`url(${c.coverBanner.url})`):e(`.show-channel-banner-${c.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${c.channel._id}`)){let n=document.getElementById(`channel-show-description-${c.channel._id}`).getElementsByTagName("a");for(let e of n)e.classList.add("external")}await r(),e(".add-theme-popup").on("popup:open",g)})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="channel-show-themes">

    <${$e} breadcrumbs=${b} />


    ${p?e`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${c.channel._id}">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    `:e``}


    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        <channel-card channel_view_model=${c}></channel-card>

        <div class="block">
          <p class="segmented">
            <a class="button button-outline" href="/admin/channel/show/${c.channel._id}">Items</a>
            <a class="button button-outline button-active" href="#">Themes</a>
            <a class="button button-outline" href="/admin/channel/static-pages/${c.channel._id}">Static
              Pages</a>
          </p>
        </div>
  
        <div class="card">
          <div class="card-header">Themes</div>
          <div class="card-content">
            <div class="list">
              <ul>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div>
  
                        <p>A theme allows you to apply CSS formatting to an item. Create themes and then apply them to
                          individual items.</p>
  
                        <ul class="theme-list" style="padding-left: 0; padding-bottom: 10px; padding-top: 10px; margin-bottom: 15px;">
                          ${f?.map((n=>e`
                          <li>
                            <span class="theme-name">${n.name}</span>
                            <a class="link theme-link" href="#" data-id="${n._id}" @click="${v}">Edit</a>
                            <a class="link theme-link" href="#" data-id="${n._id}" @click="${u}">Delete</a>
                          </li>
                          `))}
                        </ul>
  
                        <a class="button button-outline add-theme-button popup-open" data-popup=".add-theme-popup" tabindex="10">Add Theme</a>
  
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
  
        <div class="block">
          <br />
        </div>
  
  
        <div class="popup add-theme-popup">
          <div class="view">
            <div class="page">
              <div class="navbar">
                <div class="navbar-bg"></div>
                <div class="navbar-inner">
                  <div class="title">Add Theme</div>
                  <div class="right">
                    <!-- Link to close popup -->
                    <a class="link popup-close">Close</a>
                  </div>
                </div>
              </div>
              <div class="page-content">
                <form id="add-theme-form" @submit="${C}">
                  <${Je} cover_image_css_editor_id="add-theme-cover-image-editor"
                    animation_css_editor_id="add-theme-animation-editor" />
  
                  <div class="block save-row">
  
                    <div class="large-only"></div>
  
                    <button type="submit" class="button button-fill" tabindex="12">Add Theme</button>
  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  
        <div class="popup edit-theme-popup">
          <div class="view">
            <div class="page">
              <div class="navbar">
                <div class="navbar-bg"></div>
                <div class="navbar-inner">
                  <div class="title">Edit Theme</div>
                  <div class="right">
                    <!-- Link to close popup -->
                    <a class="link popup-close">Close</a>
                  </div>
                </div>
              </div>
              <div class="page-content">
                <form id="edit-theme-form" @submit="${h}">
  
                  <${Je} cover_image_css_editor_id="edit-theme-cover-image-editor"
                    animation_css_editor_id="edit-theme-animation-editor" theme="${o}" />
  
                  <div class="block save-row">
  
                    <div class="large-only"></div>
  
                    <button type="submit" class="button button-fill" tabindex="12">
                      Save Changes
                    </button>
  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


      </div>



    </div>

  </div>

`}}Ke.id="be8ed5f984",Ke.style="\n\n\n";const nt=Ke;function et(n,{$:e,$on:t,$f7:a,$update:i}){let r=n.static_page,o=[{name:"navbar",description:"Show link on navigation bar"},{name:"links",description:"Show in list of links on home page"},{name:"index",description:"Show content on home page"}],l=n.static_page_content_editor_id,s=n.static_page_content_toolbar_id,A=n.image_button_input_id,d=n.image_button_id;return function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

    <div class="list">

        <input type="hidden" name="_id"  value="${r?._id}" />
        <input type="hidden" name="_rev" value="${r?._rev}" />
        <input type="hidden" name="dateCreated" value="${r?.dateCreated}" />

        <ul>
            <li>
                <div class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Name</div>
                        <div class="item-input-wrap">
                            <input type="text" name="name" placeholder="Name"
                                value="${r?.name}" required  minlength="3" tabindex="1" />
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <a href="#" class="item-link smart-select smart-select-init" data-open-in="popup">
                  <!-- "multiple" attribute for multiple select-->
                    <select name="locations" tabindex="2"  multiple>
                        <optgroup>
                            ${o.map((n=>e`
                                ${(n=>{if(r?.locations?.length>0)for(let e of r.locations)if(n.name==e.name)return!0;return!1})(n)?e`
                                    <option value="${n.name}" selected >${n.description}</option>
                                `:e`
                                    <option value="${n.name}">${n.description}</option>
                                `}
                            `))}
                        </optgroup>
                    </select>
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title">Choose Display Location(s)</div>
                    </div>
                  </div>
                </a>
            </li>





            <li>
                <div class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Content</div>

                        <div id="${s}">
                
                            <select class="ql-header">
                                <option selected></option>
                                <option value="1">Heading</option>
                                <option value="2">Subheading</option>
                            </select>
    
    
                            <!-- Add a bold button -->
                            <button class="ql-bold"></button>
                            <button class="ql-italic"></button>
                            <button class="ql-strike"></button>
                            <button class="ql-underline"></button>
                            <button class="ql-link"></button>
                            <button class="ql-list" value="ordered"></button>
                            <button class="ql-list" value="bullet"></button>

    
    
                            <!-- Add subscript and superscript buttons -->
                            <button class="ql-script" value="sub"></button>
                            <button class="ql-script" value="super"></button>
    
                            <button class="text-editor-button" id="${d}"><i class="material-icons">image</i></button>
                            <label><input type="file" id="${A}" /></label>
                        </div>

                        <div class="editor bg-color-white text-color-black static-page-editor" id="${l}" tabindex="3"></div>
                    </div>
                </div>
            </li>

        </ul>
    </div>


`}}et.id="544592523d",et.style="\n    \n";const tt=et;function at(n,{$:e,$on:t,$f7:a,$update:r}){let o,s,A=i.getInstance(Pn),d=i.getInstance(l),c=i.getInstance(me),f=n.channelViewModel,p=n.staticPages,b=f.editable,m=[{text:"Home",path:"/"},{text:f.channel.title,path:`/admin/channel/show/${f.channel._id}`},{text:"Static Pages"}];const g=async()=>{p=await c.listByChannel(f.channel._id,1e3,0)};let C=n=>{s=new(vn())("#add-static-page-content-editor",{bounds:".page-content",theme:"snow",modules:{imageDropAndPaste:{handler:(n,e,t)=>{const a=t.toFile();A.insertImageInEditor(a,s)}},toolbar:"#add-static-page-content-toolbar",blotFormatter:{specs:[Gn],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}}})},h=async n=>{n.preventDefault();let e=Object.assign(new O,a.form.convertToData("#add-static-page-form"));e.content=s.getContents(),e.channelId=f.channel._id,e._id=(0,In.Z)(),e.dateCreated=(new Date).toJSON();try{await c.put(e),await g(),a.form.fillFromData("#add-static-page-form",{name:"",slug:"",locations:[]}),s.setText(""),await r(),a.popup.close(".add-static-page-popup")}catch(n){a.dialog.alert(n,"There was an error")}},u=async n=>{n.preventDefault();let e=Object.assign(new O,a.form.convertToData("#edit-static-page-form"));e.content=s.getContents(),e.channelId=f.channel._id;try{await c.put(e),await g(),await r(),a.popup.close(".edit-static-page-popup")}catch(n){console.log(n),a.dialog.alert(n.errors,"There was an error")}},v=async n=>{let t=e(n.target).data("id");a.dialog.confirm("Are you sure you want to delete this static page?",(async()=>{let n=await c.get(t);await c.delete(n),await g(),await r(),a.toast.show({text:"Static Page deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))},E=async function(n){let t=e(n.target).data("id");o=p.filter((n=>n._id==t))[0],s=new(vn())("#edit-static-page-content-editor",{bounds:".page-content",theme:"snow",modules:{imageDropAndPaste:{handler:(n,e,t)=>{const a=t.toFile();A.insertImageInEditor(a,s)}},toolbar:"#edit-static-page-content-toolbar",blotFormatter:{specs:[Gn],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}}}),a.form.fillFromData("#edit-static-page-form",o),s.setContents(o.content),await r(),a.popup.open(".edit-static-page-popup")},w=function(n){n.preventDefault(),e("#add-static-page-image-button-input").click()},x=async function(n){n.preventDefault(),d.showSpinner("Processing image..."),await A.insertImageInEditor(this.files[0],s),d.hideSpinner()},B=function(n){n.preventDefault(),e("#edit-static-page-image-button-input").click()},k=async function(n){n.preventDefault(),d.showSpinner("Processing image..."),await A.insertImageInEditor(this.files[0],s),d.hideSpinner()};return t("pageInit",(async(n,t)=>{if(e(document).off("click","#add-static-page-image-button"),e(document).off("change","#add-static-page-image-button-input"),e(document).off("click","#edit-static-page-image-button"),e(document).off("change","#edit-static-page-image-button-input"),await A.init(),f?.coverBanner?.url?e(`.show-channel-banner-${f.channel._id}`).css("background-image",`url(${f.coverBanner.url})`):e(`.show-channel-banner-${f.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${f.channel._id}`)){let n=document.getElementById(`channel-show-description-${f.channel._id}`).getElementsByTagName("a");for(let e of n)e.classList.add("external")}await r(),e(".add-static-page-popup").on("popup:open",C),e(document).on("click","#add-static-page-image-button",w),e(document).on("change","#add-static-page-image-button-input",x),e(document).on("click","#edit-static-page-image-button",B),e(document).on("change","#edit-static-page-image-button-input",k)})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="channel-show-themes">

    <${$e} breadcrumbs=${m} />


    ${b?e`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${f.channel._id}">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    `:e``}


    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        <channel-card channel_view_model=${f}></channel-card>

        <div class="block">
          <p class="segmented">
            <a class="button button-outline" href="/admin/channel/show/${f.channel._id}">Items</a>
            <a class="button button-outline" href="/admin/channel/themes/${f.channel._id}">Themes</a>
            <a class="button button-outline button-active" href="#">Static Pages</a>
          </p>
        </div>
  
  
        <div class="card">
          <div class="card-header">Static Pages</div>
          <div class="card-content">
            <div class="list">
              <ul>
                <li>
                  <div class="item-content item-input">
                    <div class="item-inner">
                      <div>
  
                        <p>
                          Create content that is displayed in the Large Reader alongside your collection. These are not mintable as NFTs.
                        </p>
  
                        <p>
                          <strong>Example:</strong> About Us, Contact Us, etc.
                        </p>
  
                        <ul class="static-page-list"
                          style="padding-left: 0; padding-bottom: 10px; padding-top: 10px; margin-bottom: 15px;">
                          ${p?.map((n=>e`
                            <li>
                              <span class="static-page-name">${n.name}</span>
                              <a class="link static-page-link" href="#" data-id="${n._id}" @click="${E}">Edit</a>
                              <a class="link static-page-link" href="#" data-id="${n._id}" @click="${v}">Delete</a>
                            </li>
                          `))}
                        </ul>
  
                        <div class="row">
                          <div class="col-30">
                            <a class="button button-outline add-theme-button popup-open"
                              data-popup=".add-static-page-popup" tabindex="10">Add Static Page</a>
                          </div>
                          <div class="col-70"></div>
                        </div>
  
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
  
  
        <div class="popup add-static-page-popup popup-tablet-fullscreen">
          <div class="view">
            <div class="page">
              <div class="navbar">
                <div class="navbar-bg"></div>
                <div class="navbar-inner">
                  <div class="title">Add Static Page</div>
                  <div class="right">
                    <!-- Link to close popup -->
                    <a class="link popup-close">Close</a>
                  </div>
                </div>
              </div>
              <div class="page-content">
                <form id="add-static-page-form" @submit="${h}">
                  <${tt} static_page_content_editor_id="add-static-page-content-editor"
                    static_page_content_toolbar_id="add-static-page-content-toolbar"
                    image_button_input_id="add-static-page-image-button-input"
                    image_button_id="add-static-page-image-button" />
  
                  <div class="block save-row">
  
                    <div class="large-only"></div>
  
                    <button type="submit" class="button button-fill" tabindex="12">
                      Add Static Page
                    </button>
  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  
        <div class="popup edit-static-page-popup popup-tablet-fullscreen">
          <div class="view">
            <div class="page">
              <div class="navbar">
                <div class="navbar-bg"></div>
                <div class="navbar-inner">
                  <div class="title">Edit Static Page</div>
                  <div class="right">
                    <!-- Link to close popup -->
                    <a class="link popup-close">Close</a>
                  </div>
                </div>
              </div>
              <div class="page-content">
                <form id="edit-static-page-form" @submit="${u}">
  
                  <${tt} static_page_content_editor_id="edit-static-page-content-editor"
                    static_page_content_toolbar_id="edit-static-page-content-toolbar"
                    image_button_input_id="edit-static-page-image-button-input"
                    image_button_id="edit-static-page-image-button" static_page="${o}" />
  
                  <div class="block save-row">
  
                    <div class="large-only"></div>
  
                    <button type="submit" class="button button-fill" tabindex="12">
                      Save Changes
                    </button>
  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  
  
        <div class="block">
          <br />
        </div>


      </div>

    </div>

  </div>

`}}at.id="89c55c30fa",at.style="\n\n\n";const it=at;function rt(n,{$:e,$on:t,$f7:a,$update:r}){i.getInstance(le);let o,s,A,d=i.getInstance(qe),c=(i.getInstance(Rn),i.getInstance(Sn),i.getInstance(me),i.getInstance(l),i.getInstance(Pn)),f=n.channelViewModel;Xe.Z.configure({languages:["css"]});let p=[{text:"Home",path:"/"},{text:f.channel.title,path:`/admin/channel/show/${f.channel._id}`},{text:"Edit Collection"}];const b=async n=>{if(n.preventDefault(),!document.getElementById("edit-channel-form").checkValidity())return void a.popup.open(".edit-basics-popup");let e=Object.assign(new k,f.channel),t=Object.assign(e,a.form.convertToData("#edit-channel-form"));t.description=c.activeEditor.getContents(),t.license=o.getContents(),t.sellerFeeBasisPoints=parseInt(t.sellerFeeBasisPoints),t.attributeOptions?t.attributeOptions=JSON.parse(t.attributeOptions):t.attributeOptions=[],t.externalLinks?t.externalLinks=JSON.parse(t.externalLinks):t.externalLinks=[],t.marketplaces?t.marketplaces=JSON.parse(t.marketplaces):t.marketplaces=[],t.disableForks="true"==t.disableForks,t.showMintPage="true"==t.showMintPage,t.showActivityPage="true"==t.showActivityPage;try{await d.put(t,s,A),a.toast.show({text:"Collection saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),a.views.main.router.navigate(`/admin/channel/show/${t._id}`)}catch(n){a.dialog.alert(n.errors,"There was an error")}};return t("pageInit",(async(n,t)=>{if(e("#edit-channel-form").attr("novalidate","novalidate"),new(Te())(document.getElementById("category")),c.buildQuillPostEditor("#edit-channel-description-editor","#edit-channel-description-toolbar"),f.channel.description&&c.activeEditor.setContents(f.channel.description),o=new(vn())("#edit-channel-license-editor",{bounds:".page-content",modules:{toolbar:"#edit-channel-license-toolbar"},theme:"snow"}),f.channel.license&&o.setContents(f.channel.license),f.channel?.attributeOptions?.length>0)for(let n of f.channel?.attributeOptions)new(Te())(document.getElementById(`options-input-${n.id}`))})),e(document).on("cover-image-updated",(async n=>{s=n.detail.coverImage})),e(document).on("cover-banner-updated",(async n=>{A=n.detail.coverBanner})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="admin-edit-channel">

    <${$e} breadcrumbs=${p} />

    <div class="page-content hide-toolbar-on-scroll">

      <form id="edit-channel-form" @submit="${b}" class="fixed-width-content center">

        <div class="block-title block-title-medium">Edit Collection</div>


        <${_e} 
          channel=${f} 
          description_editor="edit-channel-description-editor"
          description_toolbar="edit-channel-description-toolbar" 
          license_editor="edit-channel-license-editor"
          license_toolbar="edit-channel-license-toolbar"  
        />



        <div class="block cancel-save-row">
      
          <div class="large-only"></div>

          <a href="/admin/channel/show/${f.channel._id}" class="button button-outline color-gray" tabindex="30">
            Cancel
          </a>

          <button type="submit" class="button button-fill" tabindex="31" id="saveButton">
            Save
          </button>

        </div>

      </form>

    </div>
  </div>

`}}rt.id="33b75b7411",rt.style="\n";const ot=rt;function lt(n,{$:e,$on:t,$f7:a,$update:r}){let o,l=[{text:"Home",path:"/"},{text:"Create & Import"}];return t("pageInit",(async()=>{o=i.getWalletService(),await r()})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="admin-create-menu">

    <${$e} breadcrumbs=${l} />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        <div class="block-title block-title-medium">Create New</div>
        <div class="list media-list inset">
          <ul>
            <li>
              <a href="/admin/channel/create" class="item-link">
                <div class="item-content">
                  <div class="item-media">
                    <i class="material-icons">create</i>
                  </div>
                  <div class="item-inner">
                    <div class="item-title-row">
                      <div class="item-title">Create New Collection</div>
                    </div>
                </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
  
        <div class="block-title block-title-medium">Fork Existing</div>
        <div class="list media-list inset">
          <ul>
            <li>
              <a href="/admin/channel/fork" class="item-link">
                <div class="item-content">
                  <div class="item-media">
                    <i class="material-icons">fork_left</i>
                  </div>
                  <div class="item-inner">
                    <div class="item-title-row">
                      <div class="item-title">From IPFS Hash</div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
  
  
              ${o?.address?e`
                <li>
                  <a href="/admin/channel/fork-contract" class="item-link">
                    <div class="item-content">
                      <div class="item-media">
                        <i class="material-icons">fork_left</i>
                      </div>
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-title">From Contract</div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              `:e`
                <li>
                  <a class="item-link">
                    <div class="item-content">
                      <div class="item-media">
                        <i class="material-icons">fork_left</i>
                      </div>
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-title">From Contract </div>
                        </div>
                        <div class="item-text">Requires browser with wallet support.</div>
  
                      </div>
                    </div>
                  </a>
                </li>
              `}
  
              <li>
                <a href="/admin/channel/fork-reader" class="item-link">
                  <div class="item-content">
                    <div class="item-media">
                      <i class="material-icons">fork_left</i>
                    </div>
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">From Reader</div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
  
  
            
  
          </ul>
        </div>

      </div>



    </div>
  </div>

`}}lt.id="ce2058a61f",lt.style="\n\n\n";const st=lt;var At=t(17833),dt=t(33686),ct=t(34805),ft=t.n(ct),pt=t(41690),bt=t(32046),mt=t(93286),gt=t(2593);let Ct=class{walletService;constructor(n){this.walletService=n}async getMintEventsForContract(n){let e=0,t=await this.walletService.provider.getBlockNumber();console.log("Fetching mint transfers...");let a=[],i={endBlock:t,events:[]};do{i=await this.getEvents(n,e,t),a.push(...i.events),console.log(`...fetched batch of ${i.events?.length} from ${e} to ${i.endBlock} of ${t}`),e=i.endBlock}while(i.endBlock<t);return console.log(`Found ${a.length} events`),a}async getEvents(n,e,t){let a=[],i=!0;for(;i;)try{a=await n.queryFilter({address:n.address,topics:[bt.id("Transfer(address,address,uint256)"),mt.$m("0x0000000000000000000000000000000000000000",32)]},e,t),i=!1}catch(n){let a=JSON.parse(n.body)?.error?.message,r=a.substring(a.indexOf("[")+1,a.indexOf("]"))?.split(",");r?.length>1?t=parseInt(r[1]):(t=e,i=!1)}return{events:a,endBlock:t}}async getTokensForContract(n){let e=(await this.getMintEventsForContract(n)).map((n=>gt.O$.from(n.topics[3]).toNumber())).sort(((n,e)=>n-e));return new Set(e)}};Ct=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){return function(t,a){e(t,a,n)}}(0,(0,o.f)(a.WalletService)),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[Object])],Ct);var ht=t(14222),ut=t(48764).Buffer,vt=function(n,e){return function(t,a){e(t,a,n)}};const Et=new(ft());let wt=class{channelService;channelWebService;queryCacheService;schemaService;itemService;itemWebService;authorService;ipfsService;imageService;animationService;themeRepository;themeService;staticPageRepository;staticPageService;ercEventService;tokenMetadataCacheRepository;walletService;contracts;constructor(n,e,t,a,i,r,o,l,s,A,d,c,f,p,b,m,g,C){this.channelService=n,this.channelWebService=e,this.queryCacheService=t,this.schemaService=a,this.itemService=i,this.itemWebService=r,this.authorService=o,this.ipfsService=l,this.imageService=s,this.animationService=A,this.themeRepository=d,this.themeService=c,this.staticPageRepository=f,this.staticPageService=p,this.ercEventService=b,this.tokenMetadataCacheRepository=m,this.walletService=g,this.contracts=C}async importFromIPFS(n,e,t){let a={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}};this.logForkProgress(a,`Starting fork of ${n}. Fetching data...`);try{await this.ipfsService.ipfs.files.rm("/fork",{recursive:!0,flush:!0})}catch(n){}await this.ipfsService.ipfs.files.cp(`/ipfs/${n}`,"/fork",{create:!0,parents:!0,flush:!0}),this.logForkProgress(a,"Processing...");let i=await this._readFile("/fork/backup/authors.json"),r=await this._readFile("/fork/backup/channels.json"),o=await this._readFile("/fork/backup/images.json"),l=await this._readFile("/fork/backup/items.json"),s=await this._readFile("/fork/backup/animations.json"),A=await this._readFile("/fork/backup/themes.json"),d=await this._readFile("/fork/backup/static-pages.json"),c=await this._readFile("/fork/contractMetadata.json"),f=new xt(this.ipfsService);if("existing"==e)return this._importExisting(i,r,o,l,s,A,d,a,f,c,n);if(t){let n=new v;n.walletAddress=t,i=[n]}return this._importAsFork(i,r,o,l,s,A,d,a,f,c,n)}async importExistingFromContract(n){return this._importFromContract(n,"existing")}async importAsForkFromContract(n){return this._importFromContract(n,"fork")}async importExistingFromReader(n,e,t){let a=await this._buildImportBundle(n);return a.channels[0].contractAddress=e,a.channels[0].localCid=t,this._importExisting(a.authors,a.channels,a.images,a.items,a.animations,a.themes,a.staticPages,a.forkStatus,a.mediaDownloader,a.contractMetadata,t)}async importAsForkFromReader(n,e,t){let a=await this._buildImportBundle(n);return delete a.channels[0].contractAddress,delete a.channels[0].localCid,a.channels[0].title=e,this._importAsFork(a.authors,a.channels,a.images,a.items,a.animations,a.themes,a.staticPages,a.forkStatus,a.mediaDownloader,a.contractMetadata,t)}async _buildImportBundle(n){let e={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}};this.logForkProgress(e,"Processing...");let t=await this._fetchFile(`${n}backup/export/backup/authors.json`),a=await this._fetchFile(`${n}backup/export/backup/channels.json`),i=await this._fetchFile(`${n}backup/export/backup/images.json`),r=await this._fetchFile(`${n}backup/export/backup/items.json`),o=await this._fetchFile(`${n}backup/export/backup/animations.json`),l=await this._fetchFile(`${n}backup/export/backup/themes.json`),s=await this._fetchFile(`${n}backup/export/backup/static-pages.json`),A=await this._fetchFile(`${n}backup/export/contractMetadata.json`);return{authors:t,channels:a,images:i,items:r,animations:o,themes:l,staticPages:s,mediaDownloader:new Bt(n),forkStatus:e,contractMetadata:A}}async _importFromContract(n,e){let t={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}},a=this.walletService.wallet,i=new Xn.CH(n,this._getERC721ABI(),a||this.walletService.provider);this.logForkProgress(t,`Fetching tokens for contract ${i.address}`);let r=await this.ercEventService.getTokensForContract(i);t.channels.total=1,t.items.total=r.size;let o=new k;o.importSuccess=!1,"existing"==e&&(o.contractAddress=n),o.forkType=e,o.title=await i.name(),o.symbol=await i.symbol(),o.sellerFeeBasisPoints=0,o.attributeOptions=[],await this.channelWebService.put(o);let l,s=new nn;s._id=`token_id_stats_by_channel_${o._id}`,s.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(o._id);for(let n of r){this.logForkProgress(t,`Fetching metadata for #${n}`);let e=await this._getTokenMetadata(i,n);this.logForkProgress(t,`Importing token #${e.tokenId}`);let a,r,l=new R;if(!e.image&&!e.image_url)throw new Error("No image in metadata");{let n=e.image?e.image:e.image_url,i=await this._fetchURI(n);a=(0,ht.Z)((new TextDecoder).decode(i))?await this.imageService.newFromSvg((new TextDecoder).decode(i)):await this.imageService.newFromBuffer(i);try{await this.imageService.put(a)}catch(n){}l.coverImageId=a._id,t.images.saved++,this.logForkProgress(t,`Importing image ${a._id}`)}if(e.animation_url){l.coverImageAsAnimation=!1,r=await this.animationService.newFromText((new TextDecoder).decode(await this._fetchURI(e.animation_url)));try{await this.animationService.put(r)}catch(n){}t.animations.saved++,this.logForkProgress(t,`Importing animation ${r._id}`),l.animationId=r._id}else l.coverImageAsAnimation=!0;l.tokenId=e.tokenId,l.title=e.name,l.channelId=o._id,l.attributeSelections=[];for(let n of e.attributes)l.attributeSelections.push({traitType:n.trait_type,value:n.value}),this._addAttributeToChannel(n,o);l.originalJSONMetadata=e,await this.itemWebService.put({channel:o,item:l,updateQueryCache:!1,publish:!1}),s.result.count++,(!s.result.min||l.tokenId<s.result.min)&&(s.result.min=l.tokenId),(!s.result.max||l.tokenId>s.result.max)&&(s.result.max=l.tokenId),t.items.saved++,(e.image||e.image_url)&&t.images.total++,e.animation_url&&t.animations.total++}this.logForkProgress(t,`Building query cache for channel ${o._id}`),await this.channelService.buildAttributeCounts(o._id);try{l=await this.queryCacheService.get(s._id)}catch(n){}return l&&(s._rev=l._rev),await this.queryCacheService.put(s),o.importSuccess=!0,await this.channelWebService.put(o),t.channels.saved++,this.logForkProgress(t,`Importing channel ${o._id}`),o._id}async _importAsFork(n,e,t,a,i,r,o,l,s,A,d){let c,f,p=new Map;if(!(n&&e&&t&&a))throw new Error("Invalid collection hash");l.authors.total=n.length,l.channels.total=e.length,l.images.total=t.length,l.items.total=a.length,l.animations.total=i.length,l.themes.total=r.length,l.staticPages.total=o.length,this.logForkProgress(l,"Updating totals..."),f=new k,Object.assign(f,e[0]),f.forkType="fork",f.forkedFromFeeRecipient=A.fee_recipient;for(let e of n){let n;delete e._rev,delete e._rev_tree;try{n=await this.authorService.get(e.walletAddress)}catch(n){}await this.authorService.put(Object.assign(n||new v,e)),l.authors.saved++,this.logForkProgress(l,`Inserted author ${e._id}`)}let m=`${f._id}`;delete f._id,delete f._rev,delete f._rev_tree,f.authorId=this.walletService.address?.toString(),f.authorId&&await this.authorService.insertIfNew(f.authorId),d&&(f.forkedFromCid=d),f.forkedFromId=m,await this.channelWebService.put(f),p.set(m,f._id),c=f._id,l.channels.saved++,this.logForkProgress(l,`Inserted channel ${f._id}`);let g,C=new nn;C._id=`token_id_stats_by_channel_${f._id}`,C.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(f._id);for(let n of i){n.content=await s.getAsString(`animations/${n.cid}.html`);let e=await yn.of(n.content);if(e.toString()!=n.cid)throw new Error(`Incorrect cid when importing animation. Expected: ${n.cid}, Result: ${e.toString()}`);let t=Object.assign(new b,n);try{await this.animationService.put(t)}catch(n){}l.animations.saved++,this.logForkProgress(l,`Inserted animation ${t._id}`)}for(let n of t){let e;n.generated?(n.svg=await s.getAsString(`images/${n.cid}.${n.generated?"svg":"jpg"}`),e=n.svg):(n.buffer=await s.getAsBuffer(`images/${n.cid}.${n.generated?"svg":"jpg"}`),e=new Uint8Array(n.buffer));let t=Object.assign(new j,n),a=await yn.of(e);if(a.toString()!=n.cid)throw new Error(`Incorrect cid when importing image. Expected: ${n.cid}, Result: ${a.toString()}`);try{await this.imageService.put(t)}catch(n){}l.images.saved++,this.logForkProgress(l,`Inserted image ${t._id}`)}for(let n of r){let e=n._id;delete n._id,delete n._rev,delete n._rev_tree,n.channelId=p.get(n.channelId);let t=Object.assign(new Z,n);n.forkedFromId=e,await this.themeService.put(t),p.set(e,t._id),l.themes.saved++,this.logForkProgress(l,`Inserted theme ${t._id}`)}for(let n of o){let e=n._id;delete n._id,delete n._rev,delete n._rev_tree,n.channelId=p.get(n.channelId),n.forkedFromId=e;let t=Object.assign(new O,n);try{await this.staticPageService.put(t)}catch(n){}l.staticPages.saved++,this.logForkProgress(l,`Inserted static page ${t._id}`)}for(let n of a){let e=n._id;if(delete n._id,delete n._rev,delete n._rev_tree,n.channelId=p.get(n.channelId),n.content?.ops?.length>0){let e=[];for(let t of n.content.ops){if(t.insert&&t.insert.ipfsimage){let n=await this.imageService.get(t.insert.ipfsimage.cid);t.insert.ipfsimage.src=await this.imageService.getUrl(n)}e.push(t)}n.content.ops=e}if(n.themes?.length>0){let e=[];for(let t of n.themes)e.push(p.get(t));n.themes=e}n.forkedFromId=e;let t=Object.assign(new R,n);await this.itemWebService.put({channel:f,item:t,updateQueryCache:!1,publish:!1}),C.result.count++,(!C.result.min||n.tokenId<C.result.min)&&(C.result.min=n.tokenId),(!C.result.max||n.tokenId>C.result.max)&&(C.result.max=n.tokenId),l.items.saved++,this.logForkProgress(l,`Inserted item ${t._id}`)}this.logForkProgress(l,"\n        ******************************\n\n        ******************************\n\n        ******************************\n\n                Import complete\n\n        ******************************\n\n        ******************************\n\n        ******************************\n        "),this.logForkProgress(l,`Building query cache for channel ${c}`),await this.channelService.buildAttributeCounts(f._id);try{g=await this.queryCacheService.get(C._id)}catch(n){}return g&&(C._rev=g._rev),await this.queryCacheService.put(C),f.importSuccess=!0,await this.channelWebService.put(f),c}async _importExisting(n,e,t,a,i,r,o,l,s,A,d){if(!(n&&e&&t&&a))throw new Error("Invalid collection hash");let c,f;l.authors.total=n.length,l.channels.total=e.length,l.images.total=t.length,l.items.total=a.length,l.animations.total=i.length,l.themes.total=r.length,l.staticPages.total=o.length,this.logForkProgress(l,"Updating totals..."),f=Object.assign(new k,e[0]),f.forkType="existing",f.forkedFromFeeRecipient=A.fee_recipient;for(let e of n){let n;delete e._rev,delete e._rev_tree;try{n=await this.authorService.get(e.walletAddress)}catch(n){}await this.authorService.put(Object.assign(n||new v,e)),l.authors.saved++,this.logForkProgress(l,`Inserted author ${e._id}`)}delete f._rev,delete f._rev_tree;let p=await this.channelService.getLatestRevision(f._id);p&&(f._deleted=!1,f._rev=p._rev),await this.channelWebService.put(f),c=f._id,l.channels.saved++,this.logForkProgress(l,`Inserted channel ${f._id}`);let m,g=new nn;g._id=`token_id_stats_by_channel_${f._id}`,g.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(c);for(let n of i){n.content=await s.getAsString(`animations/${n.cid}.html`);let e=await yn.of(n.content);if(e.toString()!=n.cid)throw new Error(`Incorrect cid when importing animation. Expected: ${n.cid}, Result: ${e.toString()}`);let t=Object.assign(new b,n);try{await this.animationService.put(t)}catch(n){}l.animations.saved++,this.logForkProgress(l,`Inserted animation ${t._id}`)}for(let n of t){let e;n.generated?(n.svg=await s.getAsString(`images/${n.cid}.${n.generated?"svg":"jpg"}`),e=n.svg):(n.buffer=await s.getAsBuffer(`images/${n.cid}.${n.generated?"svg":"jpg"}`),e=new Uint8Array(n.buffer));let t=Object.assign(new j,n),a=await yn.of(e);if(a.toString()!=n.cid)throw new Error(`Incorrect cid when importing image. Expected: ${n.cid}, Result: ${a.toString()}`);try{await this.imageService.put(t)}catch(n){}l.images.saved++,this.logForkProgress(l,`Inserted image ${t._id}`)}for(let n of r){delete n._rev,delete n._rev_tree;let e=await this.themeRepository.getLatestRevision(n._id);e._deleted=!1,await this.themeRepository.put(Object.assign(e,n)),l.themes.saved++,this.logForkProgress(l,`Inserted theme ${e._id}`)}for(let n of o){delete n._rev,delete n._rev_tree;let e=await this.staticPageRepository.getLatestRevision(n._id);e._deleted=!1,await this.staticPageRepository.put(Object.assign(e,n)),l.staticPages.saved++,this.logForkProgress(l,`Inserted static page ${e._id}`)}for(let n of a){if(n.content?.ops?.length>0){let e=[];for(let t of n.content.ops){if(t.insert&&t.insert.ipfsimage){let n=await this.imageService.get(t.insert.ipfsimage.cid);t.insert.ipfsimage.src=await this.imageService.getUrl(n)}e.push(t)}n.content.ops=e}delete n._rev,delete n._rev_tree;let e=await this.itemService.getLatestRevision(n._id);e&&(n._deleted=!1,n._rev=e._rev),await this.itemWebService.put({channel:f,item:Object.assign(new R,n),updateQueryCache:!1,publish:!1}),g.result.count++,(!g.result.min||n.tokenId<g.result.min)&&(g.result.min=n.tokenId),(!g.result.max||n.tokenId>g.result.max)&&(g.result.max=n.tokenId),l.items.saved++,this.logForkProgress(l,`Inserted item ${n._id}`)}this.logForkProgress(l,"\n        ******************************\n\n        ******************************\n\n        ******************************\n\n                Import complete\n\n        ******************************\n\n        ******************************\n\n        ******************************\n        "),this.logForkProgress(l,`Building query cache for channel ${f._id}`),await this.channelService.buildAttributeCounts(f._id);try{m=await this.queryCacheService.get(g._id)}catch(n){}return m&&(g._rev=m._rev),await this.queryCacheService.put(g),f.importSuccess=!0,await this.channelWebService.put(f),this.logForkProgress(l,`Forking channel ${f._id} complete`),e[0]._id}_addAttributeToChannel(n,e){let t,a=e.attributeOptions.filter((e=>e.traitType==n.trait_type));a?.length>0?t=a[0]:(e.attributeOptions.push({id:(0,In.Z)(),traitType:n.trait_type,values:[n.value]}),t=e.attributeOptions[e.attributeOptions.length-1]),t.values.includes(n.value)||t.values.push(n.value)}async _getTokenMetadata(n,e){let t,a=`${n.address}-${e}`;try{t=await this.tokenMetadataCacheRepository.get(a)}catch(n){}if(t)return console.log(`Returning cached token metadata #${e}`),t.tokenMetadata;let i=await n.tokenURI(e),r=await this._fetchURI(i),o=JSON.parse((new TextDecoder).decode(r));return o.tokenId=e,await this.tokenMetadataCacheRepository.put({_id:a,tokenMetadata:o,dateCreated:(new Date).toJSON()}),o}async _fetchURI(n){if(n.startsWith("data:application/json;utf-8,"))return ut.from(n.substring(28,n.length));if(n.startsWith("data:image/bmp;base64,"))return ut.from(n.substring(22,n.length),"base64");if(n.startsWith("http")){let e=await ne.Z.get(n,{responseType:"arraybuffer"});return ut.from(e.data,"binary")}{let e=Et.containsCID(n);if(e?.containsCid)return n=Et.convertToDesiredGateway(n,""),(0,pt.z)(await(0,dt.Z)(this.ipfsService.ipfs.cat(n)))}}async _readFile(n){let e=await(0,At.Z)(this.ipfsService.ipfs.files.read(n));return JSON.parse(new TextDecoder("utf-8").decode(e))}async _fetchFile(n){return(await ne.Z.get(n)).data}logForkProgress(n,e){if(e&&console.log(e),"undefined"!=typeof window&&void 0!==window.document){const t=new CustomEvent("fork-progress",{detail:{forkStatus:n,message:e}});document.dispatchEvent(t)}}_getERC721ABI(){return'[\n            {\n                "inputs":[\n                   {\n                      "internalType":"string",\n                      "name":"name",\n                      "type":"string"\n                   },\n                   {\n                      "internalType":"string",\n                      "name":"symbol",\n                      "type":"string"\n                   }\n                ],\n                "stateMutability":"nonpayable",\n                "type":"constructor"\n            },\n\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "name",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "string"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_spender",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "approve",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "totalSupply",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_from",\n                  "type": "address"\n                },\n                {\n                  "name": "_to",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "transferFrom",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "decimals",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint8"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [\n                {\n                  "name": "_owner",\n                  "type": "address"\n                }\n              ],\n              "name": "balanceOf",\n              "outputs": [\n                {\n                  "name": "balance",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "symbol",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "string"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_to",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "transfer",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [\n                {\n                  "name": "_owner",\n                  "type": "address"\n                },\n                {\n                  "name": "_spender",\n                  "type": "address"\n                }\n              ],\n              "name": "allowance",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "payable": true,\n              "stateMutability": "payable",\n              "type": "fallback"\n            },\n            {\n              "anonymous": false,\n              "inputs": [\n                {\n                  "indexed": true,\n                  "name": "owner",\n                  "type": "address"\n                },\n                {\n                  "indexed": true,\n                  "name": "spender",\n                  "type": "address"\n                },\n                {\n                  "indexed": false,\n                  "name": "value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "Approval",\n              "type": "event"\n            },\n            {\n              "anonymous": false,\n              "inputs": [\n                {\n                  "indexed": true,\n                  "name": "from",\n                  "type": "address"\n                },\n                {\n                  "indexed": true,\n                  "name": "to",\n                  "type": "address"\n                },\n                {\n                  "indexed": false,\n                  "name": "value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "Transfer",\n              "type": "event"\n            },\n            {\n                "inputs":[\n                   {\n                      "internalType":"uint256",\n                      "name":"tokenId",\n                      "type":"uint256"\n                   }\n                ],\n                "name":"tokenURI",\n                "outputs":[\n                   {\n                      "internalType":"string",\n                      "name":"",\n                      "type":"string"\n                   }\n                ],\n                "stateMutability":"view",\n                "type":"function"\n             }\n             \n          ]'}};wt=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),vt(16,(0,o.f)(a.WalletService)),vt(17,(0,o.f)("contracts")),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[le,qe,Ln,ln,Qn,ze,Nn,ie,Rn,be,N,Sn,_,me,Ct,V,Object,Object])],wt);class xt{ipfsService;basePath="/fork/";constructor(n){this.ipfsService=n}async getAsString(n){let e=await(0,At.Z)(this.ipfsService.ipfs.files.read(`${this.basePath}${n}`));return new TextDecoder("utf-8").decode(e)}async getAsBuffer(n){return(0,At.Z)(this.ipfsService.ipfs.files.read(`${this.basePath}${n}`))}}class Bt{basePath;constructor(n){this.basePath=n}async getAsString(n){let e=await ne.Z.get(`${this.basePath}backup/export/${n}`);return e.data?.toString()}async getAsBuffer(n){return(await ne.Z.get(`${this.basePath}backup/export/${n}`,{responseType:"arraybuffer"})).data}}function kt(n,{$:e,$on:t,$f7:a,$update:r}){let o,l,s=i.getInstance(wt),A=i.getInstance(ie),d=i.getWalletService(),c=null!=A.ipfs,f=A.peerCount,p=n.cid,b=!1,m="",g="existing",C=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Fork Collection From IPFS Hash"}];t("pageInit",(async()=>{await A.init(),c=null!=A.ipfs,await r()}));const h=async n=>{n.preventDefault();let e=a.form.convertToData("#import-ipfs-hash");b=!0,r(),l=await s.importFromIPFS(e.hash,g,e.authorId),b=!1,r()};e(document).on("fork-progress",(async n=>{n.detail.message&&(m=`<p>${n.detail.message}</p>`),o=n.detail.forkStatus,b=!0,r();let t=document.getElementById("ipfs-fork-process");t&&e(t).scrollTop(t.scrollHeight)}));const u=async n=>{n.preventDefault(),g=e(n.currentTarget).val(),await r()};return e(document).on("update-peers",(async n=>{f=n.detail.count,r()})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="admin-fork">

    <${$e} breadcrumbs=${C} />

    <div class="page-content hide-toolbar-on-scroll">

      <form @submit="${h}" id="import-ipfs-hash">

        <div class="block-title">Fork Collection From IPFS Hash</div>

        <div class="card">
          <div class="card-content card-content-padding">
            ${c?e`
              <div class="ipfs-label">
                  Status: <a href="/admin/connect">IPFS Ready</a>
              </div>
          `:e`
              <div class="ipfs-label">IPFS Initializing...</div>
          `}
          </div>
        </div>

        ${!b&!l?e`
          
          <div class="block-header">
            A <em>fork</em> is a copy of an NFT collection. Forking a project allows you to freely experiment with changes without affecting the original project.
          </div>

          <div class="list media-list inset">
            <ul>
              <li>
                <label class="item-radio item-radio-icon-start item-content">
                  <input type="radio" name="demo-media-radio" checked @change="${u}" value="existing" />
                  <i class="icon icon-radio" checked></i>
                  <div class="item-inner">
                    <div class="item-title-row">
                      <div class="item-title">Create new experience around an existing collection.</div>
                    </div>
                    <div class="item-text">Collection items will not be editable and Reader will be configured to connect to existing smart contract to view ownership and create transactions.</div>
                  </div>
                </label>
              </li>
              <li>
                <label class="item-radio item-radio-icon-start item-content">
                  <input type="radio" name="demo-media-radio" @change="${u}" value="fork" />
                  <i class="icon icon-radio"></i>
                  <div class="item-inner">
                    <div class="item-title-row">
                      <div class="item-title">Fork collection.</div>
                    </div>
                    <div class="item-text">Collection items can be added, deleted, or edited. Deploy and mint from a new smart contract.</div>
                  </div>
                </label>
              </li>

            </ul>
          </div>


          ${"fork"==g&&d.address?e`
            <div class="block-title block-title-small">Author</div>

            <div class="list no-hairlines inset">
              <ul>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-input-wrap">
                      <select id="collection-author" name="authorId">
                        <option value="">Original Author</option>
                        <option value="${d.address}">${d.address}</option>
                      </select>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          `:e`<span />`}
        
          
        `:e`<span />`}


        <div class="card">

          ${b?e`
            <div class="card-header">
                Forking...
            </div>  

          `:e`<span />`}


          <div class="card-content">

            <div class="card-content card-content-padding">
 
                
                ${m?e`

                  ${o?e`

                    <div class="data-table">
                      <table>
                        <thead>
                          <th class="label-cell">Type</th>
                          <th class="numeric-cell">Saved</th>
                          <th class="numeric-cell">Total</th>
                        </thead>
                        <tbody>
                          <tr class="${o.authors.saved==o.authors.total&&o.authors.total>0?"complete":""}">
                            <td class="label-cell">Authors</td>
                            <td class="numeric-cell">${o.authors.saved}</td>
                            <td class="numeric-cell">${o.authors.total}</td>
                          </tr>
                          <tr class="${o.channels.saved==o.channels.total&&o.channels.total>0?"complete":""}">
                            <td class="label-cell">Channels</td>
                            <td class="numeric-cell">${o.channels.saved}</td>
                            <td class="numeric-cell">${o.channels.total}</td>
                          </tr>
                          <tr class="${o.animations.saved==o.animations.total&&o.animations.total>0?"complete":""}">
                            <td class="label-cell">Animations</td>
                            <td class="numeric-cell">${o.animations.saved}</td>
                            <td class="numeric-cell">${o.animations.total}</td>
                          </tr>

                          <tr class="${o.images.saved==o.images.total&&o.images.total>0?"complete":""}">
                            <td class="label-cell">Images</td>
                            <td class="numeric-cell">${o.images.saved}</td>
                            <td class="numeric-cell">${o.images.total}</td>
                          </tr>
                          <tr class="${o.themes.saved==o.themes.total&&o.themes.total>0?"complete":""}">
                            <td class="label-cell">Themes</td>
                            <td class="numeric-cell">${o.themes.saved}</td>
                            <td class="numeric-cell">${o.themes.total}</td>
                          </tr>
                          <tr class="${o.staticPages.saved==o.staticPages.total&&o.staticPages.total>0?"complete":""}">
                            <td class="label-cell">Static Pages</td>
                            <td class="numeric-cell">${o.staticPages.saved}</td>
                            <td class="numeric-cell">${o.staticPages.total}</td>
                          </tr>
                          <tr class="${o.items.saved==o.items.total&&o.items.total>0?"complete":""}">
                            <td class="label-cell">Items</td>
                            <td class="numeric-cell">${o.items.saved}</td>
                            <td class="numeric-cell">${o.items.total}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  `:e`<span />`}
       

                  ${l?e`
                  
                    <div class="block save-row">

                      <div class="large-only"></div>

                      <a href="/admin/channel/show/${l}" class="button button-fill color-green" class="button button-fill" tabindex="12">
                        View Collection
                      </a>  
                    </div>
                  `:e`
                    <div class="fork-output-simple" innerHTML="${m}" id="ipfs-fork-process" ></div>
                  `}
                  
                
                `:e`<span />`}


                ${c&!b&!l?e`

                  <p>
                    Enter the IPFS hash of the Large collection to import. For this process to work the collection must have
                    been built with Large otherwise use the <a href="/admin/channel/fork-contract">contract importer</a>.
                  </p>

                  <div class="list media-list">
                    <ul>
                      <li>
                        <a href="#" class="item-link">
                          <div class="item-content">
                            <div class="item-inner">
                              <div class="item-title item-label">IPFS Hash</div>
                              <div class="item-input-wrap">
                                <input type="text" name="hash" placeholder="Enter IPFS Hash" value="${p||""}" required />
                                <span class="input-clear-button"></span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>

                        <div class="block cancel-save-row">
      
                          <div class="large-only"></div>
            
                          <a href="/admin/channel/create-menu" class="button button-outline color-gray" tabindex="30">
                            Cancel
                          </a>
      
                          <button type="submit" class="button button-fill" tabindex="31" id="saveButton">
                            <i class="material-icons">fork_left</i> Create Fork
                          </button>
            
                        </div>

                      </li>
                    </ul>
                  </div>

                    
                `:e`
                    <p></p>
                `}



              </div>
          </div>
        </div>


      </form>



    </div>
  </div>

`}}kt.id="6771b62078",kt.style="\n  .ipfs-label,\n  .fork-label {\n      margin-top: 10px;\n      margin-bottom: 10px;\n      font-weight: bold;\n      font-size: 18px;\n  }\n\n  .fork-output {\n      border: 1px solid #cccccc;\n      font-size: 13px;\n      width: 100%;\n      max-width: 100%;\n      padding: 5px;\n      height: 300px;\n      overflow-y: scroll;\n  }\n\n  .fork-status {\n      font-size: 14px;\n      padding: 10px;\n      border: 1px solid #f1f1f1;\n  }\n\n  .fork-status .item label {\n      font-weight: bold;\n      display: inline-block;\n      width: 180px;\n  }\n\n\n\n";const yt=kt;function Dt(n,{$:e,$on:t,$f7:a,$update:r}){let o,l,s,A,d=i.getInstance(wt),c=i.getInstance(ie),f=n.contractAddress,p=!1,b="",m="existing",g=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Fork Collection From Contract"}],C=!1;t("pageInit",(async()=>{o=i.getWalletService(),l=await o.getAddress(),await c.init(),C=null!=c.ipfs,await r()}));const h=async n=>{n.preventDefault(),m=e(n.currentTarget).val(),await r()},u=async n=>{n.preventDefault();let e=a.form.convertToData("#import-fork-contract");p=!0,r();try{s="existing"==m?await d.importExistingFromContract(e.contractAddress):await d.importAsForkFromContract(e.contractAddress)}catch(n){console.log(n),a.dialog.alert(n.message,"There was an error")}p=!1,r()};return e(document).on("fork-progress",(async n=>{n.detail.message&&(b=`<p>${n.detail.message}</p>`),A=n.detail.forkStatus,p=!0,r();let t=document.getElementById("ipfs-fork-process");t&&e(t).scrollTop(t.scrollHeight)})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="admin-fork-contract">

    <${$e} breadcrumbs=${g} />
    <${An} />

    <div class="page-content hide-toolbar-on-scroll">

      <form  @submit="${u}" id="import-fork-contract">

        <div class="block-title">Fork Collection From Contract</div>

         ${o?.address?e`
        

          <div class="card">
            <div class="card-content card-content-padding">
              ${C?e`
                <div class="ipfs-label">
                    Status: <a href="/admin/connect">IPFS Ready</a>
                </div>
            `:e`
                <div class="ipfs-label">IPFS Initializing...</div>
            `}
            </div>
          </div>

          ${C&!p&!s?e`

            <div class="block-header">
              A <em>fork</em> is a copy of an NFT collection. Forking a project allows you to freely experiment with changes without affecting the original project.
            </div>
  
            <div class="list media-list inset">
              <ul>
                <li>
                  <label class="item-radio item-radio-icon-start item-content">
                    <input type="radio" name="demo-media-radio" checked @change="${h}" value="existing" />
                    <i class="icon icon-radio" checked></i>
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">Create new experience around an existing collection.</div>
                      </div>
                      <div class="item-text">Collection items will not be editable and Reader will be configured to connect to existing smart contract to view ownership and create transactions.</div>
                    </div>
                  </label>
                </li>
                <li>
                  <label class="item-radio item-radio-icon-start item-content">
                    <input type="radio" name="demo-media-radio" @change="${h}" value="fork" />
                    <i class="icon icon-radio"></i>
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">Fork collection.</div>
                      </div>
                      <div class="item-text">Collection items can be added, deleted, or edited. Deploy and mint from a new smart contract.</div>
                    </div>
                  </label>
                </li>
  
              </ul>
            </div>
            
            <div class="block-header">
              Enter the contract address of the collection to import. Must be standard ERC-721. Limit 10,000 tokens.
            </div>


            <div class="list media-list inset">
              <ul>

                <li>
                  <a href="#" class="item-link">
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title item-label">Contract Address</div>
                        <div class="item-input-wrap">
                          <input type="text" name="contractAddress" placeholder="Enter Contract Address" value="${f||""}" required />
                          <span class="input-clear-button"></span>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>

                <li>


                  <div class="block cancel-save-row" style="padding-bottom: 15px;">
      
                    <div class="large-only"></div>
      
                    <a href="/admin/channel/create-menu" class="button button-outline color-gray" tabindex="30">
                      Cancel
                    </a>

                    <button type="submit" class="button button-fill" tabindex="31" id="saveButton">
                      <i class="material-icons">fork_left</i> Create Fork
                    </button>
      
                  </div>

                </li>

              </ul>
            </div>

              
          `:e`
              <p></p>
          `}



          ${p||b?e`

            <div class="card">

              ${p?e`
                <div class="card-header">
                    Forking...
                </div>  
  
              `:e`<span />`}
  

              <div class="card-content">
                  <div class="card-content card-content-padding">
  
                    ${b?e`

                      ${A?e`

                        <div class="data-table ">
                          <table>
                            <thead>
                              <th class="label-cell">Type</th>
                              <th class="numeric-cell">Saved</th>
                              <th class="numeric-cell">Total</th>
                            </thead>
                            <tbody>
                              <tr class="${A.animations.saved==A.animations.total&&A.animations.total>0?"complete":""}">
                                <td class="label-cell">Animations</td>
                                <td class="numeric-cell">${A.animations.saved}</td>
                                <td class="numeric-cell">${A.animations.total?A.animations.total:"?"} </td>
                              </tr>
                              <tr class="${A.images.saved==A.images.total&&A.images.total>0?"complete":""}">
                                <td class="label-cell">Images</td>
                                <td class="numeric-cell">${A.images.saved}</td>
                                <td class="numeric-cell">${A.images.total?A.images.total:"?"}</td>
                              </tr>
                              <tr class="${A.items.saved==A.items.total&&A.items.total>0?"complete":""}">
                                <td class="label-cell">Items</td>
                                <td class="numeric-cell">${A.items.saved}</td>
                                <td class="numeric-cell">${A.items.total}</td>
                              </tr>
                              <tr class="${A.channels.saved==A.channels.total&&A.channels.total>0?"complete":""}">
                                <td class="label-cell">Channels</td>
                                <td class="numeric-cell">${A.channels.saved}</td>
                                <td class="numeric-cell">${A.channels.total}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>



                      `:e`<span />`}


                      ${s?e`
                      
                        <div class="block save-row">

                          <div class="large-only"></div>
    
                          <a href="/admin/channel/show/${s}" class="button button-fill color-green" class="button button-fill" tabindex="12">
                            View Collection
                          </a>  
                        </div>

                      `:e`
                        <div class="fork-output-simple" innerHTML="${b}" id="ipfs-fork-process" ></div>
                      `}


                    `:e`<span />`}


  
                  </div>
              </div>
  
            </div>

          `:e`
            <span />
          `}

        `:e`
          <div class="block-header">
            Use a web browser with wallet support to import an existing ERC-721 collection.
          </div>
        `}



      </form>



    </div>
  </div>

`}}Dt.id="f607e4d7b6",Dt.style="\n\n";const zt=Dt;function qt(n,{$:e,$on:t,$f7:a,$update:r}){let o,l,s,A,d,c,f,p=i.getInstance(wt),b=i.getInstance(ie),m=i.getWalletService(),g=(b.ipfs,b.peerCount,!1),C="",h="existing",u=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Fork Collection From Reader"}],v=window.location.hash?window.location.hash.substring(window.location.hash?.indexOf("?"),window.location.hash.length):void 0;const E=new URLSearchParams(v);let w={};E.get("path")&&(w.path=decodeURIComponent(E.get("path")));const x=async n=>{try{d=await m.getAddress(),s=await y(),A=await D(),o=await z(),w.title=s.title,c=s.title}catch(n){a.dialog.alert(n,"Error loading collection. Not found.")}},B=async n=>{n.preventDefault(),w.path=e("#libraryURL").val(),await x(),await r()},k=n=>m.truncateEthAddress(n),y=async()=>(await ne.Z.get(`${w.path}backup/export/backup/channels.json`)).data[0],D=async()=>(await ne.Z.get(`${w.path}backup/export/backup/authors.json`)).data[0],z=async()=>{try{return(await ne.Z.get(`${w.path}backup/contract/contract.json`)).data}catch(n){console.log(n)}};t("pageInit",(async()=>{w.path&&await x(),await r()}));const q=async n=>{n.preventDefault(),h=e(n.currentTarget).val(),await r()},I=async n=>{n.preventDefault(),c=e(n.currentTarget).val(),await r()},S=async n=>{n.preventDefault(),g=!0,r(),f="existing"==h?await p.importExistingFromReader(w.path,o.contractAddress,o.ipfsCid):await p.importAsForkFromReader(w.path,c),g=!1,r()};return e(document).on("fork-progress",(async n=>{n.detail.message&&(C=`<p>${n.detail.message}</p>`),l=n.detail.forkStatus,g=!0,r();let t=document.getElementById("ipfs-fork-process");t&&e(t).scrollTop(t.scrollHeight)})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="admin-fork-contract">

    <${$e} reader_config=${w} breadcrumbs=${u}  />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="block-title">Fork Collection From Reader</div>


      ${!g&!f?e`

        ${s?e`
        
          <form @submit="${S}" id="import-from-reader">

            <div class="block-header">
              A <em>fork</em> is a copy of an NFT collection. Forking a project allows you to freely experiment with changes without affecting the original project. 
            </div>

            <div class="list media-list inset">
              <ul>
                <li>
                  <label class="item-radio item-radio-icon-start item-content">
                    <input type="radio" name="demo-media-radio" checked @change="${q}" value="existing" />
                    <i class="icon icon-radio" checked></i>
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">Create new experience around an existing collection.</div>
                      </div>
                      <div class="item-text">Collection items will not be editable and Reader will be configured to connect to existing smart contract to view ownership and create transactions.</div>
                    </div>
                  </label>
                </li>
                <li>
                  <label class="item-radio item-radio-icon-start item-content">
                    <input type="radio" name="demo-media-radio" @change="${q}" value="fork" />
                    <i class="icon icon-radio"></i>
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">Fork collection.</div>
                      </div>
                      <div class="item-text">Collection items can be added, deleted, or edited. Deploy and mint from a new smart contract.</div>
                    </div>
                  </label>
                </li>

              </ul>
            </div>

            ${f?e`<span />`:e`
              <div class="block block-strong inset fork-block">

                <p>Forking <a href="${w.path}" class="external">${s.title}</a></p>
  
                <div class="repo-name">
  
                  <div class="left">
                    <strong>Author</strong>
  
                    <div class="list no-hairlines" style="margin: 0; padding-left: 0px;">
                      <ul>
                        <li class="item-content item-input" style="padding-left: 0px;">
                          <div class="item-inner">
                            <div class="item-input-wrap">
                              <select id="collection-author">
                                ${"existing"==h&&null!=A?e`
                                  <option value="${A._id}">${k(A._id)} (Original Author)</option>
                                `:e`
  
                                  ${d?e`
                                    <option value="${d}">${k(d)}</option>
                                  `:e`
                                    <option value="">None</option>
                                  `}
                                  
                                `}
                              </select>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
  
                  <div class="right">
                    <strong>Collection Name</strong>
  
                    <div class="list no-hairlines" style="margin: 0; padding-left: 0px;">
                      <ul>
                        <li class="item-content item-input" style="padding-left: 0px;">
                          <div class="item-inner">
  
                              ${"existing"==h?e`
                                <div class="item-input-wrap ">
                                  ${s.title}
                                </div>
                              `:e`
                                <div class="item-input-wrap ">
                                  <input type="text" value="${w.title}" @change="${I}" />
                                  <span class="input-clear-button"></span>
                                </div>
                              `}
  
                          </div>
                        </li>
                      </ul>
                    </div>
  
                  </div>
                </div>
                
  
                <p>
                  You are downloading all project data, including images and HTML, into a local web-based <a href="https://pouchdb.com" class="external">database</a> on your device.
                </p>
  
                ${g?e`
                    <span />
                `:e`
                  <button type="submit" class="button button-fill col-30" tabindex="12" style="margin-bottom: 10px; width: 200px;">
                    <i class="material-icons">fork_left</i> Create Fork
                  </button>
                `}
  
              </div>
            `}

          </form>


        `:e`
          
          <form @submit="${B}">

            <div class="block-header">
              Enter the URL (home page) of the Large NFT collection to import. 
            </div>


            <div class="list media-list inset">
              <ul>

                <li>
                  <a href="#" class="item-link">
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title item-label">Large URL</div>
                        <div class="item-input-wrap">
                          <input type="text" id="libraryURL" placeholder="Enter URL" value="" required />
                          <span class="input-clear-button"></span>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>

                <li>

                  <div class="block cancel-save-row" style="padding-bottom: 15px;">
      
                    <div class="large-only"></div>
      
                    <a href="/admin/channel/create-menu" class="button button-outline color-gray" tabindex="30">
                      Cancel
                    </a>

                    <button type="submit" class="button button-fill" tabindex="31" id="saveButton">
                      Continue
                    </button>
      
                  </div>

                </li>

              </ul>
            </div>
          </form>



        `}
        
      `:e`<span />`}


      ${g||C?e`

        <div class="card">

          ${g?e`
            <div class="card-header">
                Forking...
            </div>  

          `:e`<span />`}


          <div class="card-content">
              <div class="card-content card-content-padding">


                ${C?e`

                  ${l?e`
                    <div class="data-table">
                      <table>
                        <thead>
                          <th class="label-cell">Type</th>
                          <th class="numeric-cell">Saved</th>
                          <th class="numeric-cell">Total</th>
                        </thead>
                        <tbody>
                          <tr class="${l.channels.saved==l.channels.total&&l.channels.total>0?"complete":""}">
                            <td class="label-cell">Channels</td>
                            <td class="numeric-cell">${l.channels.saved}</td>
                            <td class="numeric-cell">${l.channels.total}</td>
                          </tr>
                          <tr class="${l.authors.saved==l.authors.total&&l.authors.total>0?"complete":""}">
                            <td class="label-cell">Authors</td>
                            <td class="numeric-cell">${l.authors.saved}</td>
                            <td class="numeric-cell">${l.authors.total}</td>
                          </tr>
                          <tr class="${l.animations.saved==l.animations.total&&l.animations.total>0?"complete":""}">
                            <td class="label-cell">Animations</td>
                            <td class="numeric-cell">${l.animations.saved}</td>
                            <td class="numeric-cell">${l.animations.total}</td>
                          </tr>

                          <tr class="${l.images.saved==l.images.total&&l.images.total>0?"complete":""}">
                            <td class="label-cell">Images</td>
                            <td class="numeric-cell">${l.images.saved}</td>
                            <td class="numeric-cell">${l.images.total}</td>
                          </tr>
                          <tr class="${l.themes.saved==l.themes.total&&l.themes.total>0?"complete":""}">
                            <td class="label-cell">Themes</td>
                            <td class="numeric-cell">${l.themes.saved}</td>
                            <td class="numeric-cell">${l.themes.total}</td>
                          </tr>
                          <tr class="${l.staticPages.saved==l.staticPages.total&&l.staticPages.total>0?"complete":""}">
                            <td class="label-cell">Static Pages</td>
                            <td class="numeric-cell">${l.staticPages.saved}</td>
                            <td class="numeric-cell">${l.staticPages.total}</td>
                          </tr>
                          <tr class="${l.items.saved==l.items.total&&l.items.total>0?"complete":""}">
                            <td class="label-cell">Items</td>
                            <td class="numeric-cell">${l.items.saved}</td>
                            <td class="numeric-cell">${l.items.total}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  `:e`<span />`}


                  ${f?e`


                    <div class="block save-row">

                      <div class="large-only"></div>

                      <a href="/admin/channel/show/${f}" class="button button-fill color-green" class="button button-fill" tabindex="12">
                        View Collection
                      </a>  
                    </div>


                  
                  `:e`
                    <div class="fork-output" innerHTML="${C}" id="ipfs-fork-process" ></div>
                  `}


                `:e`<span />`}



              </div>
          </div>

        </div>

      `:e`
        <span />
      `}



    </div>
  </div>

`}}qt.id="ee2025bf5c",qt.style="\n\n\n\n\n\n";const It=qt;function St(n,{$:e,$on:t,$f7:a,$update:r}){let o=i.getInstance(qe),l=n.channelViewModel;const s=async n=>{n.preventDefault();try{await o.upgrade(l.channel)}catch(n){console.log(n),a.dialog.alert(n,"There was an error")}},A=async n=>{n.preventDefault(),a.preloader.show();try{await o.regenerateItemMedia(l.channel)}catch(n){console.log(n),a.dialog.alert(n,"There was an error")}a.preloader.hide()};return t("pageInit",(async(n,e)=>{})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="admin-edit-channel">

    <${$e} />

    <div class="page-content">

      <div class="row">
        <div class="col-100 large-66 center">

          <ul class="breadcrumb">
            <li><a href="/admin/channel/show/${l.channel._id}">${l.channel.title}</a></li>
            <li>Upgrade Collection</li>
          </ul>

          <div class="block list">

            <p>This screen is used to update a collection to the latest database structure. Currently this is a 
            diagnostic level tool and should only be used if you have backed up the data.</p>

            <p>The effect is like opening each item individually and resaving it.</p>


            <button class="button button-fill" @click="${A}">
              Regenerate Animations
            </button>

            <br />

            <button class="button button-fill" @click="${s}">
              Upgrade
            </button>

          </div>

        </div>
      </div>



    </div>
  </div>

`}}St.id="7ba748dff3",St.style="\n\n";const Ft=St;var jt=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o},Wt=function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)};let $t=class{channelWebService;itemWebService;schemaService;themeService;staticPageService;footerText;constructor(n,e,t,a,i,r){this.channelWebService=n,this.itemWebService=e,this.schemaService=t,this.themeService=a,this.staticPageService=i,this.footerText=r}async app(){return new Fe((async n=>({footerText:this.footerText})),Re)}async create(){return new Fe((async n=>{}),Ze)}async createMenu(){return new Fe((async n=>{}),st)}async fork(){return new Fe((async n=>({cid:n.query.cid})),yt)}async forkContract(){return new Fe((async n=>({footerText:this.footerText,contractAddress:n.query.contractAddress})),zt)}async forkReader(){return new Fe((async n=>({footerText:this.footerText})),It)}async show(){return new Fe((async n=>{await this.schemaService.loadChannel(n.params.id);let e=await this.channelWebService.get(n.params.id);return{channelViewModel:e,firstPageItems:await this.itemWebService.listByChannel(e.channel._id,P.CHUNK_SIZE,0)}}),He)}async themes(){return new Fe((async n=>{await this.schemaService.loadChannel(n.params.id);let e=await this.channelWebService.get(n.params.id);return{channelViewModel:e,themes:await this.themeService.listByChannel(e.channel._id,1e3,0)}}),nt)}async staticPages(){return new Fe((async n=>{await this.schemaService.loadChannel(n.params.id);let e=await this.channelWebService.get(n.params.id);return{channelViewModel:e,staticPages:await this.staticPageService.listByChannel(e.channel._id,1e3,0)}}),it)}async edit(){return new Fe((async n=>(await this.schemaService.loadChannel(n.params.id),{channelViewModel:await this.channelWebService.get(n.params.id)})),ot)}async upgrade(){return new Fe((async n=>(await this.schemaService.loadChannel(n.params.id),{channelViewModel:await this.channelWebService.get(n.params.id)})),Ft)}};function Yt(n,{$:e,$on:t,$f7:a,$update:r}){let o=i.getInstance(Pn),l=(i.getInstance(Cn),i.getInstance(ze)),s=i.getInstance(Rn);const A=async()=>{h.images=await l.getImagesFromContent({title:h.item.title,content:{ops:o.activeEditor.getContents().ops},coverImageCSS:h.item.coverImageCSS,themes:h.item.themes}),1==h.images?.length&&(h.coverImage=h.images[0]),o.activeEditor.update(),await r()},d=async n=>{let t=e(n.currentTarget).data("id"),a=h?.images.filter((n=>n.cid==t));a?.length>0&&(h.coverImage=a[0]),await r()},c=async n=>{n.preventDefault(),h.coverImage=void 0,await r()},f=async n=>{let t=e(n.currentTarget).data("id");C.filter((n=>n.id==t))[0].value=e(n.currentTarget).val(),await r()},p=async n=>{let t=e(n.currentTarget).val();h.item.themes=t,await r(),await A()},b=n=>{let t=e(n.currentTarget).val();h.item.title=t,document.dispatchEvent(new CustomEvent("load-cover-images"))},m=n=>{k=e(n.currentTarget).prop("checked"),r()};let g,C,h=n.item,u=n.editor,v=n.toolbar,E=n.themes,w=n.cancel_link,x=(h.coverImage,n.cover_image_css_editor_id),B=n.animation_css_editor_id,k=!h.item.coverImageAsAnimation;return h&&(n=>{C=n;for(let n of C)!n.value&&n.values?.length>0&&(n.value=n.values[0])})(h.attributeSelections),e(document).on("image-selected",(async n=>{h.coverImage=await s.get(n.detail._id),await A()})),e(document).on("update-cover-image-css",(async n=>{h.item.coverImageCSS=n?.detail?.coverImageCSS,await A()})),e(document).on("load-cover-images",(async n=>{await A()})),e(document).on("ipfs-ready",(async n=>{g=!0,await r()})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

    <div class="item-show">

        <input type="hidden" name="_id" value="${h?.item?._id}" />
        <input type="hidden" name="_rev" value="${h?.item?._rev}" />
        <input type="hidden" name="dateCreated" value="${h?.item?.dateCreated}" />
        <input type="hidden" name="tokenId" value="${h?.item?.tokenId}" />
        <input type="hidden" name="channelId" value="${h?.channel?._id}" />

        <div class="left">
            <div class="card">
                <div class="card-content">
    
                    <div class="list">
                        <ul>
                            <li>
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">Title</div>
                                        <div class="item-input-wrap">
                                            <input type="text" name="title" placeholder="Title"
                                                value="${h?.item?.title}" id="title-header-input"
                                                @input="${b}" />
                                        </div>
                                    </div>
                                </div>
                            </li>
    
                            <li>
                                <div class="item-content item-input">
                                    <div class="item-inner post-area">
                                        <div class="item-title item-label">Content</div>
    
                                        <div id="${v}">
    
                                            <select class="ql-header">
                                                <option selected></option>
                                                <option value="1">Heading</option>
                                                <option value="2">Subheading</option>
                                            </select>
    
    
                                            <!-- Add a bold button -->
                                            <button class="ql-bold"></button>
                                            <button class="ql-italic"></button>
                                            <button class="ql-strike"></button>
                                            <button class="ql-underline"></button>
                                            <button class="ql-link"></button>
                                            <button class="ql-list" value="ordered"></button>
                                            <button class="ql-list" value="bullet"></button>
    
    
                                            <!-- Add subscript and superscript buttons -->
                                            <button class="ql-script" value="sub"></button>
                                            <button class="ql-script" value="super"></button>
    
                                            <button class="text-editor-button image-button"><i
                                                    class="material-icons">image</i></button>
                                            <label><input type="file" class="image-button-input" /></label>
                                        </div>
    
                                        <div class="editor bg-color-white text-color-black" id="${u}"></div>
                                    </div>
                                </div>
                            </li>
    
    
    
                            <li class="cover-photo-preview">
    
                                ${h?.coverImage?e`
                                <input type="hidden" name="coverImageId" value="${h?.coverImage?.cid}" />
                                `:e`
                                <input type="hidden" name="coverImageId" value="" />
                                `}
    
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">
                                            Cover Image
                                            <div class="item-footer">If there is no image in the content then an SVG cover image will be generated.</div>
                                        </div>
                                        <div class="item-input-wrap">
    
                                            ${h?.images?.length>0?e`
    
                                                ${h?.images?.map((n=>e`
                                                    <img class="cover-image-thumbnail ${n?.cid==h.coverImage?.cid||null==h.coverImage&&1==n.generated?"selected":""}  "
                                                        src="${n?.url}" data-id="${n?.cid}" @click=${d} />
                                                `))}
    
                                            `:e`
    
                                                <p>No images</p>
    
                                            `}
    
                                            <button class="button button-outline clear-button margin-bottom"
                                                @click="${c}">Clear</button>
    
                                        </div>
                                    </div>
                                </div>
    
                            </li>    
                            <li>
                                <label class="item-checkbox item-content">
    
                                    <input type="checkbox" checked="${!h.item.coverImageAsAnimation}" name="coverImageAsAnimation" @change="${m}" />
                                    
                                    <i class="icon icon-checkbox"></i>
                                    <div class="item-inner">
                                        <div class="item-title">
                                            <div class="item-header"></div>
                                            Generate Animation HTML
                                            <div class="item-footer">
                                            Include full text. Otherwise only the cover image will be shown.
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">Customize</div>
                <div class="card-content">
                    <div class="list">
                        <ul>
                            <li>
                                <a href="#" class="item-link smart-select smart-select-init" data-open-in="popup">
                                    <!-- "multiple" attribute for multiple select-->
                                    <select name="themes" @change="${p}" tabindex="2" multiple>
                                        <optgroup>
                                            ${E?.map((n=>e`
    
                                                ${h.item?.themes?.includes(n._id)?e`
                                                    <option value="${n._id}" selected>${n.name}</option>
                                                    `:e`
                                                    <option value="${n._id}">${n.name}</option>
                                                `}
    
                                            `))}
                                        </optgroup>
                                    </select>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Choose Theme(s)</div>
                                        </div>
                                    </div>
                                </a>
                            </li>
    
                            <li class="accordion-item">
                                <a href="" class="item-link item-content">
                                    <div class="item-inner">
                                        <div class="item-title">Edit Cover Image CSS (SVG)</div>
                                    </div>
                                </a>
                                <div class="accordion-item-content">
                                    <div class="editor bg-color-white text-color-black css-editor" id="${x}" tabindex="3"></div>
                                </div>
                            </li>
    
                            ${k?e`
                                <li class="accordion-item">
                                    <a href="" class="item-link item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Edit Animation CSS (HTML)</div>
                                        </div>
                                    </a>
                                    <div class="accordion-item-content">
                                        <div class="editor bg-color-white text-color-black css-editor" id="${B}" tabindex="4"></div>
                                    </div>
                                </li>
                            `:e`
                                <li class="accordion-item" style="display:none;">
                                    <a href="" class="item-link item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Edit Animation CSS (HTML)</div>
                                        </div>
                                    </a>
                                    <div class="accordion-item-content">
                                        <div class="editor bg-color-white text-color-black css-editor" id="${B}" tabindex="4"></div>
                                    </div>
                                </li>
    
    
                            `}
    
    
                        
                        </ul>
                    </div>
                </div>
            </div>
        </div>


        <div class="right">

            <div class="sticky">

                <div class="card">
                    <div class="card-content card-content-padding" style="background: #f1f1f1;">
                        <div class="segmented">
       
                            <a href="${w}" class="button button-outline color-gray" tabindex="12">Cancel</a>
                
                            ${g?e`
                              <button type="submit" class="button button-fill" tabindex="12">Save</button>
                            `:e`
                              <button class="button button-outline color-lightblue" tabindex="12" disabled>IPFS initializing...</button>
                            `}
                
                        </div>
                    </div>
                </div>
            </div>

            ${h.attributeSelections?.length>0?e`
                <div class="card">
                    <div class="card-header">Attributes</div>
                    <div class="card-content">
                        <div class="list">
                            <ul>
                                ${h.attributeSelections?.map((n=>e`
                                <li>
                                    <a href="#" class="item-link smart-select smart-select-init" data-open-in="popover">
                                        <!-- "multiple" attribute for multiple select-->
                                        <select @change="${f}" tabindex="2" data-id="${n?.id}">
                                            ${n?.values?.map((t=>e`

                                                ${n?.value?.toString()==t.toString()?e`
                                                <option value="${t}" selected>${t}</option>
                                                `:e`
                                                <option value="${t}">${t}</option>
                                                `}

                                            `))}
                                        </select>
                                        <div class="item-content">
                                            <div class="item-inner">
                                                <div class="item-title">${n?.traitType}</div>
                                            </div>
                                        </div>
                                    </a>
                                </li>


                                `))}
                            </ul>
                        </div>
                    </div>
                </div>
            `:e``}




        </div>



        <input type="hidden" name="attributeSelections" value="${JSON.stringify(C)}" />

    </div>




`}}jt([je("/"),Wt("design:type",Function),Wt("design:paramtypes",[]),Wt("design:returntype",Promise)],$t.prototype,"app",null),jt([je("/admin/channel/create"),Wt("design:type",Function),Wt("design:paramtypes",[]),Wt("design:returntype",Promise)],$t.prototype,"create",null),jt([je("/admin/channel/create-menu"),Wt("design:type",Function),Wt("design:paramtypes",[]),Wt("design:returntype",Promise)],$t.prototype,"createMenu",null),jt([je("/admin/channel/fork"),Wt("design:type",Function),Wt("design:paramtypes",[]),Wt("design:returntype",Promise)],$t.prototype,"fork",null),jt([je("/admin/channel/fork-contract"),Wt("design:type",Function),Wt("design:paramtypes",[]),Wt("design:returntype",Promise)],$t.prototype,"forkContract",null),jt([je("/admin/channel/fork-reader"),Wt("design:type",Function),Wt("design:paramtypes",[]),Wt("design:returntype",Promise)],$t.prototype,"forkReader",null),jt([je("/admin/channel/show/:id"),Wt("design:type",Function),Wt("design:paramtypes",[]),Wt("design:returntype",Promise)],$t.prototype,"show",null),jt([je("/admin/channel/themes/:id"),Wt("design:type",Function),Wt("design:paramtypes",[]),Wt("design:returntype",Promise)],$t.prototype,"themes",null),jt([je("/admin/channel/static-pages/:id"),Wt("design:type",Function),Wt("design:paramtypes",[]),Wt("design:returntype",Promise)],$t.prototype,"staticPages",null),jt([je("/admin/channel/edit/:id"),Wt("design:type",Function),Wt("design:paramtypes",[]),Wt("design:returntype",Promise)],$t.prototype,"edit",null),jt([je("/admin/channel/upgrade/:id"),Wt("design:type",Function),Wt("design:paramtypes",[]),Wt("design:returntype",Promise)],$t.prototype,"upgrade",null),$t=jt([(0,r.b)(),function(n,e){return function(t,a){e(t,a,n)}}(5,(0,o.f)("footer-text")),Wt("design:paramtypes",[qe,ze,ln,Sn,me,String])],$t),Yt.id="fd1e035402",Yt.style="\n    .cover-image-thumbnail {\n        width: 250px;\n        height: 250px;\n    }\n\n    .cover-image-thumbnail.selected {\n        border: 3px solid #ff0000;\n    }\n\n    #title-header-input {\n        line-height: 30px;\n        font-size: 30px;\n        font-weight: 700;\n        height: 50px;\n    }\n\n    .clear-button {\n        width: 100px;\n    }\n";const Rt=Yt;function Ut(n,{$:e,$on:t,$f7:a,$update:r}){let o,s,A=i.getInstance(Pn),d=i.getInstance(Cn),c=i.getInstance(l),f=i.getInstance(Qn),p=(i.getInstance(Rn),i.getInstance(ze)),b=i.getInstance(ie),m=(i.getInstance(ke),i.getWalletService(),n.itemViewModel),g=n.themes,C=!1,h=`/admin/channel/show/${m.channel._id}`,u=[{text:"Home",path:"/"},{text:m.channel.title,path:`/admin/channel/show/${m.channel._id}`},{text:"Create Item"}];Xe.Z.configure({languages:["css"]});const v=async n=>{n.preventDefault(),await b.init();let e=a.form.convertToData("#create-item-form"),t=Object.assign(new R,e);t.coverImageAsAnimation="on"!=e.coverImageAsAnimation[0],t.content=A.activeEditor.getContents(),t.coverImageCSS="\n"!=o.getText()?o.getText():void 0,t.animationCSS="\n"!=s.getText()?s.getText():void 0,t.attributeSelections=JSON.parse(t.attributeSelections).map((n=>({id:n.id,traitType:n.traitType,value:n.value}))),t.contentHTML=await d.translateContent(t.content,!0);let i=await p.saveGeneratedCoverImage(t);t.coverImageGenerated=i.generated,t.tokenId=await f.getNextTokenId(t.channelId),t.coverImageAsAnimation||await p.saveAnimation(t);try{c.showSpinner(),await p.put({channel:m.channel,item:t,updateQueryCache:!0,publish:!1}),a.toast.show({text:"Item created",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),a.views.main.router.navigate(`/admin/channel/show/${t.channelId}/${t.tokenId}`)}catch(n){console.log(n),a.dialog.alert(n.errors,"There was an error")}};return t("pageInit",(async(n,t)=>{A.buildQuillPostEditor("#create-item-editor","#create-item-toolbar"),A.activeEditor.root.addEventListener("blur",(function(){document.dispatchEvent(new CustomEvent("load-cover-images"))})),A.activeEditor.on("text-change",((n,e,t)=>{if(document.dispatchEvent(new CustomEvent("load-cover-images")),"user"!==t)return;const a=function(n){return n.ops.filter((n=>n.insert&&n.insert.ipfsimage)).map((n=>n.insert.ipfsimage))}(A.activeEditor.getContents().diff(e));a.forEach((n=>{m.images=m.images.filter((e=>e.cid!=n.cid)),n.cid==m.coverImage?.cid&&(m.coverImage=void 0)}))})),e(".image-button").off("click"),e(".image-button-input").off("click"),e(".image-button").on("click",(function(n){n.preventDefault(),e(".image-button-input").click()})),e(".image-button-input").on("change",(async function(n){n.preventDefault(),await A.imageSelected(this)})),o=new(vn())("#cover-image-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:n=>Xe.Z.highlightAuto(n).value},toolbar:!1}}),o.on("text-change",((n,e,t)=>{document.dispatchEvent(new CustomEvent("update-cover-image-css",{detail:{coverImageCSS:"\n"!=o.getText()?o.getText():void 0}}))})),s=new(vn())("#animation-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:n=>Xe.Z.highlightAuto(n).value},toolbar:!1}}),o.setText(".svg-h1 {}"),s.setText(".animation-container {}"),await r(),c.showSpinner(),await b.init(),C=null!=b.ipfs;const a=new CustomEvent("ipfs-ready");document.dispatchEvent(a),c.hideSpinner(),await r()})),t("pageBeforeRemove",(()=>{})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="admin-create-item">

    <${$e} breadcrumbs=${u} />

    <div class="page-content hide-toolbar-on-scroll">

      <form class="list media-list" id="create-item-form" @submit="${v}">

        <${Rt} item=${m} 
          themes=${g}
          editor="create-item-editor" 
          toolbar="create-item-toolbar" 
          cover_image_css_editor_id="cover-image-css-editor"
          animation_css_editor_id="animation-css-editor"
          themes=${g}
          cancel_link=${h}
        />

      </form>


    </div>
  </div>

`}}t(69942),Ut.id="a06c60a46f",Ut.style="\n  #create-item-editor {\n    min-height: 175px;\n    height: 100%;\n    /* added these styles */\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n  }\n";const Pt=Ut;function Tt(n,{$:e,$on:t,$f7:a,$update:r}){i.getInstance(Qn);let o=i.getInstance(l),s=i.getInstance(ze),A=n.itemViewModel,d=(A.editable,[{text:"Home",path:"/"},{text:A.channel.title,path:`/admin/channel/show/${A.channel._id}`},{text:A.item.title?A.item.title:`#${A.item.tokenId}`}]);t("pageInit",(async(n,t)=>{e(`#item-content-${A.item._id} a`).addClass("external"),await r()}));const c=async n=>{try{a.dialog.confirm("Do you want to delete this item? Note: This only deletes from your device.",(async function(){await s.delete(A.item),a.toast.show({text:"Item deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),a.views.main.router.navigate(`/admin/channel/show/${A.channel._id}`)}))}catch(n){o.showExceptionPopup(n)}},f=async n=>{let e=await s.clone(A.item);a.views.main.router.navigate(`/admin/channel/${A.channel._id}/item/edit/${e._id}`)};return function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="admin-show-item">

    <${$e} breadcrumbs=${d} />

    ${A.editable?e`
      <div class="fab fab-extended fab-right-bottom">
        <a href="/admin/item/create/${A.channel._id}">
          <i class="material-icons">create</i>
          <div class="fab-text">Create Item</div>
        </a>
      </div>
    `:e``} 


    <div class="page-content hide-toolbar-on-scroll">

      <div class="item-show">

        <div class="left">
          <div class="card animation-card">
            <div class="card-content ${A.item.coverImageAsAnimation?e`card-content-padding`:e` `}">
  
              ${A.item.coverImageAsAnimation?e`
                <div class="animation-content animation-image">
                  <img src="${A.coverImage?.url}" />
                </div>
               
              `:e`
                <div class="animation-content" innerHTML="${A.animationContentHTML}"></div>
  
              `}
  
            </div>
  
  
          </div> 
  
          <div class="block split-row-both">
  
            ${A.previous?e`
              <a class="button button-outline back-token-button margin-bottom color-gray" href="/admin/channel/show/${A.channel._id}/${A.previous}">
                <i class="icon f7-icons color-blue">arrow_left</i>
              </a>
            `:e`<span />`}
  
    
            ${A.next?e`
              <a class="button button-fill continue-button margin-bottom" href="/admin/channel/show/${A.channel._id}/${A.next}" data-transition="f7-cover">
                Continue <i class="f7-icons">arrow_right</i>
              </a>
            `:e`<span />`}
  
          </div>
        </div>

        <div class="right">

          <${Le} channel=${A.channel._id} item=${A} />
  
  
          ${A.previous||A.next?e`
            
            <div class="card large-only">
              <div class="card-content card-content-padding">
                <div class="segmented">
  
                  ${A.previous?e`
                    <a class="button button-outline" href="/admin/channel/show/${A.channel._id}/${A.previous}">
                      <i class="icon f7-icons">arrow_left</i>
                    </a>
                  `:e`
                    <a class="button button-outline" href="#"></a>
                  `}
        
                  ${A.next?e`
                    <a class="button button-outline" href="/admin/channel/show/${A.channel._id}/${A.next}" data-transition="f7-cover">
                      <i class="f7-icons">arrow_right</i>
                    </a>
                  `:e`
                    <a class="button button-outline" href="#"></a>
                  `}
  
                </div>
              </div>
            </div>
  
          `:e`<span />`}
  
  
          ${A.editable?e`
            <div class="card">
              <div class="card-header">Modify</div>
              <div class="card-content card-content-padding">
  
                <div class="segmented col-100">
  
                  <a class="button button-outline " href="/admin/channel/${A.channel._id}/item/edit/${A.item._id}" id="edit-${A.item._id}">Edit</a>
                  <a class="button button-outline " href="#" data-id="${A.item._id}" @click="${f}">Clone</a>
  
                  ${A.canDelete?e`
                    <a class="button button-outline" @click="${c}">
                      <i class="material-icons">delete</i>
                    </a>
                  `:e`<span/>`}
  
                </div>
  
                ${A.canDelete?e`<span />`:e`
                  <p>Note: Only the last NFT can be deleted.</p>
                `}
  
  
              </div>
  
  
  
            </div>          
          `:e`<span />`}
          
  
  
          <div class="card">
            <div class="card-header">
              <span>
                <i class="material-icons">person</i>
                <label>Info</label>
              </span>
            </div>
            <div class="card-content data-table">
  
              <table>
                <tbody>
  
                  ${A?.authorDisplayName?e`
                    <tr>
                      <td class="label-cell">Creator:</td> 
                      <td><a href="/admin/author/show/${A?.author?._id}">${A?.authorDisplayName}</a></td>
                    </tr>  
                  `:e`<span />`}
  
                  <tr>
                    <td class="label-cell">Date:</td> 
                    <td><span class="date">${A.dateDisplay}</span></td>
                  </tr>
  
                </tbody>
              </table>
  
  
            </div>
          </div>
  
          <div class="card">
            <div class="card-header">
              <span>
                <i class="material-icons">label</i>
                <label>Attributes</label>
              </span>
            </div>
            <div class="card-content data-table">
  
              <div class="button-outline attribute-value">
                <div class="trait-type">Token ID</div>
                <div class="value">#${A.item.tokenId}</div>
              </div>
  
              ${A.attributeSelections?.map((n=>e`
  
                ${n.value?e`
                  <div class="button-outline attribute-value">
                    <div class="trait-type">${n.traitType}</div>
                    <div class="value">${n.value}</div>
                    <div class="category-percent">${n.categoryPercent} have this trait</div>
                  </div>
                `:e`<span />`}
  
              `))}
  
            </div>
          </div>
  
          ${A.themes?.length>0?e`
  
            <div class="card">
              <div class="card-header">Theme(s)</div>
              <div class="card-content">
                
                ${A.themes?.map((n=>e`
  
                  <div class="button-outline attribute-value">
                    <div class="value">${n.name}</div> <span class="theme-id">${n._id}</span>
                  </div>
  
                `))}
              </div>
            </div>
  
          `:e`<span/>`}
  
  
  
  
          ${A.item.coverImageAsAnimation?e`<span />`:e`
            <div class="card">
              <div class="card-header">Cover Image</div>
              <div class="card-content">
                <div class="square">
                  <img src="${A.coverImage?.url}" class="cover-image-preview" />
                </div>
              </div>
            </div>
           
          `}
  
  
  
  
        </div>
  
      </div>

    </div>

  </div>

`}}Tt.id="dc0c7f2962",Tt.style="\n\n\n\n\n  /* .item-card-show a {\n    color: var(--f7-text-color);\n  } */\n\n\n  .menu-dropdown-link.menu-close {\n    color: #ffffff;\n  }\n\n\n  .attribute-row {\n    font-size: 16px;\n    vertical-align: top;\n  }\n\n  .attribute-row strong {\n    width: 175px;\n    display: inline-block;\n    vertical-align: top;\n  }\n\n\n  .attribute-row .material-icons {\n    line-height: 16px;\n    display: inline-block;\n    vertical-align: middle;\n  }\n\n  .item-show-footer {\n    font-size: 14px;\n  }\n\n  .card-header {\n    line-height: 21px;\n  }\n\n  .card-header label {\n    padding-bottom: 3px;\n    margin-left: 5px;\n    float: left;\n  }\n\n  .card-header .material-icons {\n    float: left;\n  }\n\n  .item-show-token-id {\n    color: rgb(79, 79, 79);\n  }\n\n  .cover-image-preview {\n    max-width: 100%;\n  }\n\n  .animation-preview {\n    margin-left: 5px;\n    height: 500px; \n    width: 500px;\n    max-width: 100%;\n    border: 1px solid #cccccc;\n  }\n\n\n  .nft-header-row {\n    display: flex;  \n  }\n\n  .nft-header-row .left {\n    flex: 0 0 500px;\n  }\n\n  .nft-header-row .right {\n    flex: 1;\n  }\n\n  .nft-header-row .right h1 {\n    font-size: 25px;\n  }\n\n  .nft-header-row .right h4 {\n    margin-bottom: 0px;\n  }\n\n\n\n\n\n@media only screen and (max-width: 1024px) {\n\n  .nft-header-row {\n    display: block;  \n  }\n  \n  .nft-header-row .left {\n    width: 100%;\n  }\n  \n  .nft-header-row .right {\n    width: 100%;\n  }\n  \n}\n\n\n.theme-name {\n  display: block;\n}\n\n.main-header {\n\n}\n\n\n";const Gt=Tt;function Ot(n,{$:e,$on:t,$f7:a,$update:r}){let o,s,A=i.getInstance(Pn),d=i.getInstance(Cn),c=i.getInstance(l),f=(i.getInstance(Qn),i.getInstance(ze)),p=i.getInstance(ie),b=(i.getInstance(ke),i.getInstance(Rn),i.getWalletService(),n.itemViewModel),m=n.themes,g=!1,C=`/admin/channel/show/${b.item.channelId}/${b.item.tokenId}`;Xe.Z.configure({languages:["css"]});let h=[{text:"Home",path:"/"},{text:b.channel.title,path:`/admin/channel/show/${b.channel._id}`},{text:b.item.title?b.item.title:`#${b.item.tokenId}`,path:`/admin/channel/show/${b.channel._id}/${b.item.tokenId}`},{text:"Edit Item"}];const u=async n=>{n.preventDefault();let e=a.form.convertToData("#edit-item-form"),t=Object.assign(new R,e);t.coverImageAsAnimation="on"!=e.coverImageAsAnimation[0],t.tokenId=parseInt(e.tokenId),t.content=A.activeEditor.getContents(),t.coverImageCSS="\n"!=o.getText()?o.getText():void 0,t.animationCSS="\n"!=s.getText()?s.getText():void 0,t.attributeSelections?t.attributeSelections=JSON.parse(t.attributeSelections).map((n=>({id:n.id,traitType:n.traitType,value:n.value}))):t.attributeSelections=[],t.contentHTML=await d.translateContent(t.content,!0);let i=await f.saveGeneratedCoverImage(t);t.coverImageGenerated=i.generated,t.coverImageAsAnimation||await f.saveAnimation(t);try{c.showSpinner(),await f.put({channel:b.channel,item:t,updateQueryCache:!0,publish:!1}),a.toast.show({text:"Item saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),a.views.main.router.navigate(`/admin/channel/show/${t.channelId}/${t.tokenId}`)}catch(n){console.log(n),a.dialog.alert(n.errors,"There was an error")}};return t("pageInit",(async(n,t)=>{A.buildQuillPostEditor("#edit-item-editor","#edit-item-toolbar"),A.activeEditor.setContents(b.item.content),A.activeEditor.on("selection-change",(n=>{document.dispatchEvent(new CustomEvent("load-cover-images"))})),A.activeEditor.on("text-change",((n,e,t)=>{if(document.dispatchEvent(new CustomEvent("load-cover-images")),"user"!==t)return;let a=A.activeEditor.getContents();const i=function(n){return n.ops.filter((n=>n.insert&&n.insert.ipfsimage)).map((n=>n.insert.ipfsimage))}(A.activeEditor.getContents().diff(e)),o=[];for(let n of i){let t=e.ops.filter((e=>e.insert&&e.insert.ipfsimage&&e.insert.ipfsimage.cid==n.cid)),i=a.ops.filter((e=>e.insert&&e.insert.ipfsimage&&e.insert.ipfsimage.cid==n.cid));t.length>0&&0==i.length&&o.push(n)}o.forEach((n=>{b.images=b.images.filter((e=>e.cid!=n.cid)),n.cid==b.coverImage?.cid&&(b.coverImage=void 0)})),r()})),e(".image-button").off("click"),e(".image-button-input").off("click"),e(".image-button").on("click",(function(n){n.preventDefault(),e(".image-button-input").click()})),e(".image-button-input").on("change",(async function(n){n.preventDefault(),await A.imageSelected(this)})),o=new(vn())("#cover-image-edit-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:n=>Xe.Z.highlightAuto(n).value},toolbar:!1}}),o.on("text-change",((n,e,t)=>{document.dispatchEvent(new CustomEvent("update-cover-image-css",{detail:{coverImageCSS:"\n"!=o.getText()?o.getText():void 0}}))})),s=new(vn())("#animation-edit-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:n=>Xe.Z.highlightAuto(n).value},toolbar:!1}}),b.item.coverImageCSS&&o.setText(b.item.coverImageCSS),b.item.animationCSS&&s.setText(b.item.animationCSS),await r(),c.showSpinner(),await p.init(),g=null!=p.ipfs;const a=new CustomEvent("ipfs-ready");document.dispatchEvent(a),c.hideSpinner(),await r()})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="admin-edit-post">

    <${$e} breadcrumbs=${h} />

    <div class="page-content hide-toolbar-on-scroll">

      <form class="list media-list" id="edit-item-form" @submit="${u}">

        <${Rt} item=${b} 
          editor="edit-item-editor" 
          toolbar="edit-item-toolbar" 
          cover_image_css_editor_id="cover-image-edit-css-editor"
          animation_css_editor_id="animation-edit-css-editor"
          themes=${m}
          cancel_link=${C}
        />


      </form>

    </div>

  </div>

`}}Ot.id="9fc498134a",Ot.style="\n  #edit-item-editor {\n    min-height: 175px;\n    height: 100%;\n    /* added these styles */\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n  }\n";const _t=Ot;var Xt=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o},Mt=function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)};let Zt=class{itemWebService;themeService;schemaService;constructor(n,e,t){this.itemWebService=n,this.themeService=e,this.schemaService=t}async create(){return new Fe((async n=>{await this.schemaService.loadChannel(n.params.channelId);let e=await this.itemWebService.getNewViewModel(n.params.channelId);return{itemViewModel:e,themes:await this.themeService.listByChannel(e.channel._id,1e3,0)}}),Pt)}async show(){return new Fe((async n=>(await this.schemaService.loadChannel(n.params.channelId),{itemViewModel:await this.itemWebService.getNavigation(n.params.channelId,parseInt(n.params.tokenId))})),Gt)}async edit(){return new Fe((async n=>{await this.schemaService.loadChannel(n.params.channelId);let e=await this.itemWebService.get(n.params.id);return{itemViewModel:e,themes:await this.themeService.listByChannel(e.channel._id,1e3,0)}}),_t)}};function Nt(n,{$:e,$on:t,$f7:a,$update:i}){let r=n.authorViewModel,o=[{text:"Home",path:"/"},{text:"Author Profile"}];return function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`
    <div class="page" data-name="profile-show">

        <${$e} breadcrumbs=${o} active="profile" />

        <div class="page-content hide-toolbar-on-scroll">

            ${r.author._id?e`

                <div class="block row">
                    <div class="col-20">

                        ${r.authorPhoto?e`
                            <img src="${r.authorPhoto.url}" class="profile-pic-main" />
                        `:e`
                            <i class="material-icons" id="profile-pic-not-found">person</i>
                        `}

                    </div>

                    <div class="col-80">

                        <div class="profile-name">
                            ${r.authorDisplayName}
                        </div>

                        <div class="profile-address">
                            ${r.author._id}
                        </div>

                        <p>${r.author.description}</p>

                        <div class="row">
                            <a href="/admin/author/edit/${r.author.walletAddress}"
                                class="button button-outline button-small button-round col-20">Edit</a>
                        </div>

                    </div>
                </div>

                `:e`
                    <div class="block">
                        Create your Large <a href="/admin/author/edit/${r.author.walletAddress}">author profile</a>. 
                    </div>
                `}


        </div>

    </div>
`}}Xt([je("/admin/item/create/:channelId"),Mt("design:type",Function),Mt("design:paramtypes",[]),Mt("design:returntype",Promise)],Zt.prototype,"create",null),Xt([je("/admin/channel/show/:channelId/:tokenId"),Mt("design:type",Function),Mt("design:paramtypes",[]),Mt("design:returntype",Promise)],Zt.prototype,"show",null),Xt([je("/admin/channel/:channelId/item/edit/:id"),Mt("design:type",Function),Mt("design:paramtypes",[]),Mt("design:returntype",Promise)],Zt.prototype,"edit",null),Zt=Xt([(0,r.b)(),Mt("design:paramtypes",[ze,Sn,ln])],Zt),Nt.id="4c56792b7f",Nt.style="\n    \n  .profile-pic-edit, #profile-pic--edit-not-found {\n    max-width: 300px;\n    border-radius: 50%;\n    font-size: 100px;\n    float: left;\n  }\n  \n  \n  .profile-pic-main, #profile-pic-not-found {\n    max-width: 100%;\n    border-radius: 50%;\n    font-size: 100px;\n    float: left;\n  }\n  \n  .profile-name {\n    color: var(--f7-block-title-medium-text-color);\n    font-weight: bold;\n  }\n  \n  .profile-address {\n    color: var(--f7-list-item-text-text-color);\n    font-size: 13px;\n  }\n  \n  \n  .profile-pic-wrapper {\n    width: 115px;\n    float: left;\n    padding-right: 20px;\n  }\n\n";const Lt=Nt;function Qt(n,{$:e,$on:t,$f7:a,$update:r}){let o=i.getInstance(_n),l=i.getInstance(Rn),s=i.getInstance(Nn),A=i.getWalletService(),d=n.authorViewModel,c=[{text:"Home",path:"/"},{text:A.truncateEthAddress(d.author.walletAddress),path:`/admin/author/show/${d.author.walletAddress}`},{text:"Edit Profile"}];const f=async n=>{n.preventDefault();let e=Object.assign(new v,a.form.convertToData("#edit-author-form"));try{await s.put(e),a.toast.show({text:"Profile Saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),a.views.main.router.navigate(`/admin/author/show/${e._id}`)}catch(n){console.log(n),a.dialog.alert(n.errors,"There was an error")}},p=async n=>{e("#author-photo-browse").click()},b=async n=>{let e=await o.uploadFile(document.getElementById("author-photo-browse")),t=await l.newFromBuffer(e);try{await l.put(t)}catch(n){}d.authorPhoto={cid:t.cid,url:await l.getUrl(t)},r()};return function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`
    <div class="page" data-name="profile-edit">

        <${$e} breadcrumbs=${c} active="profile" />


        <div class="page-content hide-toolbar-on-scroll">

            <div class="block-title block-title-medium">Edit Profile</div>
            <form id="edit-author-form" @submit="${f}">

                <input type="hidden" name="_id" value="${d.author._id}" />
                <input type="hidden" name="_rev" value="${d.author._rev}" />

                <input type="hidden" name="walletAddress" value="${d.author.walletAddress}" />

                <div class="card">
                    <div class="card-content">
                        <div class="list">
                            <ul>
        
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Avatar</div>
                                            <div class="item-input-wrap">
            
                                                ${d.authorPhoto?e`
                                                <img class="author-photo-preview"
                                                    src="${d.authorPhoto.url}" />
                                                `:e`
                                                <i class="material-icons author-photo-preview">image</i>
                                                `}
            
                                                <input type="button" class="button button-fill browse-file" value="Browse"
                                                    @click="${p}" tabindex="1" />
                                                <input type="hidden" name="coverPhotoId"
                                                    value="${d?.authorPhoto?.cid}" />
                                                <input type="file" id="author-photo-browse" style="display: none"
                                                    @change="${b}" />
            
                                            </div>
                                        </div>
                                    </div>
                                </li>
            
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Name</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="name" value="${d.author.name}" placeholder="Enter your name" tabindex="2" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Description</div>
                                            <div class="item-input-wrap">
                                                <textarea name="description" placeholder="Enter a short bio" tabindex="3">${d.author.description}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                </li>
            
                            </ul>
                        </div>
                    </div>
                </div>


                <div class="block cancel-save-row">

                    <div class="large-only"></div>

                    <a href="/admin/author/show/${d.author.walletAddress}" class="button button-outline color-gray" tabindex="4">Cancel</a>
      
                    <button type="submit" class="button button-fill" tabindex="5">
                      Save
                    </button>
      
                </div>


            </form>

        </div>

    </div>
`}}Qt.id="bdac82cc25",Qt.style="\n    .author-photo-preview {\n        max-width: 100%;\n        max-height: 200px;\n        border: 1px solid #cccccc;\n        padding: 5px;\n        margin-bottom: 10px;\n    }\n";const Ht=Qt;var Vt=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o},Jt=function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)};let Kt=class{authorWebService;schemaService;constructor(n,e){this.authorWebService=n,this.schemaService=e}async show(){return new Fe((async n=>{let e;await this.schemaService.load();try{e=await this.authorWebService.get(n.params.id)}catch(n){console.log(n)}return e||(e=Object.assign(new v,{author:{walletAddress:n.params.id}})),{authorViewModel:e}}),Lt)}async edit(){return new Fe((async n=>{let e;await this.schemaService.load();try{e=await this.authorWebService.get(n.params.id)}catch(n){}return e||(e=Object.assign(new v,{author:{walletAddress:n.params.id}})),{authorViewModel:e}}),Ht)}};function na(n,{$:e,$on:t,$f7:a,$update:r}){let o=i.getInstance(ee),l=i.getInstance(ie),s=n.settings,A=[{text:"Home",path:"/"},{text:"Settings"}];const d=async n=>{n.preventDefault();let e=a.form.convertToData("#edit-settings-form"),t={_id:e._id,_rev:e._rev,ipfsHost:e.ipfsHost,defaultGitProvider:e.gitProvider,gitCorsProxy:e.gitCorsProxy,gitProviders:{gitlab:{name:"gitlab",username:e.gitLabUsername,personalAccessToken:e.gitLabPersonalAccessToken},github:{name:"github",username:e.gitHubUsername,personalAccessToken:e.gitHubPersonalAccessToken}}};try{let n=Object.assign(new q,t);await o.put(n),s?.ipfsHost!=n?.ipfsHost&&await l.clearInit(),a.toast.show({text:"Settings Saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),a.views.main.router.navigate("/")}catch(n){console.log(n.errors),a.dialog.alert(n,"Saving settings failed")}},c=async n=>{s.gitProvider=e(n.currentTarget).val(),await r()};return t("pageInit",(async n=>{})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

    <div class="page" data-name="admin-settings">

        <${$e} breadcrumbs=${A} />

        <div class="page-content hide-toolbar-on-scroll">

            <form id="edit-settings-form" @submit="${d}">
            
                <input type="hidden" name="_id" value="${s?._id}" />
                <input type="hidden" name="_rev" value="${s?._rev}" />

                <div class="block-title block-title-medium">Settings</div>
                <div class="card">
                    <div class="card-header">Remote IPFS API</div>
                    <div class="card-content">
                        <div class="list">
                            <ul>
                                <li class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">URL</div>
                                        <div class="item-input-wrap">
                                            <input type="text" name="ipfsHost" value="${s?.ipfsHost}" placeholder="http://localhost:5001/api/v0" />
                                            <span class="input-clear-button"></span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">Git Settings</div>
                    <div class="card-content card-content-padding">

                        <div class="list">

                            <ul>
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Default Git Provider</div>
                                            <div class="item-input-wrap">
                                                <select @change="${c}" class="value-input" name="gitProvider">     
                                                    
                                                    ${s?.defaultGitProvider&&"github"!=s?.defaultGitProvider?e`
                                                        <option value="github">GitHub</option>
                                                    `:e`
                                                        <option value="github" selected>GitHub</option>
                                                    `}


                                                    ${"gitlab"==s?.defaultGitProvider?e`
                                                        <option value="gitlab" selected>GitLab</option>
                                                    `:e`
                                                        <option value="gitlab">GitLab</option>
                                                    `}

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>

                        <br />

                    </div>
                </div>


                <div class="card">
                    <div class="card-header">Configure GitHub</div>
                    <div class="card-content card-content-padding">

                        <strong>GitHub Instructions</strong>

                        <ol>
                            <li>Create a <a href="http://github.com" class="external" target="_blank">GitHub</a> account.</li>
                            <li>Create a <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" class="external" target="_blank">"Personal access token (classic)"</a> and 
                                save it below.</li>
                            <li>If you are logged into GitHub <a href="https://github.com/settings/tokens" class="external" target="_blank">this link</a> will take you directly to the create form. </li>

                        </ol>

                        <p>Give the token a name and select an expiration date.</p>

                        <ul>
                            <li>Check the "repo" permission. </li>
                        </ul>  



                        <div class="list">

                            <ul>
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Username (NOT email)</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="gitHubUsername" placeholder="Username"
                                                    value="${s.gitProviders?.github?.username}"  />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Personal Access Token</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="gitHubPersonalAccessToken" placeholder="Personal access token"
                                                    value="${s.gitProviders?.github?.personalAccessToken}"  />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>


                    </div>
                </div>

                <div class="card">
                    <div class="card-header">Configure GitLab</div>
                    <div class="card-content card-content-padding">

                        <strong>GitLab Instructions</strong>

                        <ol>
                            <li>Create a <a href="http://gitlab.com" class="external" target="_blank">Gitlab</a> account.</li>
                            <li>Create a <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" class="external" target="_blank">"Personal access token"</a> and 
                                save it below.</li>
                            <li>If you are logged into Gitlab <a href="https://gitlab.com/-/profile/personal_access_tokens" class="external" target="_blank">this link</a> will
                                take you directly to the create form. </li>

                        </ol>

    
                        <p>Give the token a name and select an expiration date. Under "Select scopes" check the boxes beside:</p>
                        
                        <ul>
                            <li>api</li>
                            <li>read_api</li>
                            <li>read_repository</li>
                            <li>write_repository</li>
                        </ul>  


                        <div class="list">

                            <ul>
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Username (NOT email)</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="gitLabUsername" placeholder="Username"
                                                    value="${s.gitProviders?.gitlab?.username}"  />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Personal Access Token</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="gitLabPersonalAccessToken" placeholder="Personal access token"
                                                    value="${s.gitProviders?.gitlab?.personalAccessToken}"  />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="block cancel-save-row">
      
                    <div class="large-only"></div>
      
                    <a href="/" class="button button-outline color-gray" tabindex="30">
                      Cancel
                    </a>

                    <button type="submit" class="button button-fill" tabindex="31" id="saveButton">
                      Save
                    </button>
      
                </div>


            </form>


        </div>

    </div>

`}}Vt([je("/admin/author/show/:id"),Jt("design:type",Function),Jt("design:paramtypes",[]),Jt("design:returntype",Promise)],Kt.prototype,"show",null),Vt([je("/admin/author/edit/:id"),Jt("design:type",Function),Jt("design:paramtypes",[]),Jt("design:returntype",Promise)],Kt.prototype,"edit",null),Kt=Vt([(0,r.b)(),Jt("design:paramtypes",[Ie,ln])],Kt),na.id="26737dcb4e",na.style="\n\n\n";const ea=na;var ta=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o},aa=function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)};let ia=class{settingsService;constructor(n){this.settingsService=n}async show(){return new Fe((async n=>{let e;try{e=await this.settingsService.get()}catch(n){}return e||(e=Object.assign(new q,{personalAccessToken:""})),{settings:e}}),ea)}};function ra(n,{$:e,$on:t,$f7:a,$update:r}){let o=i.getInstance(l),s=i.getInstance(ie),A=n.peers,d=n.peerCount,c=n.addresses,f=[{text:"Home",path:"/"},{text:"IPFS"}];const p=async n=>{console.log("Add peer submit"),document.getElementById("peerAddressInput").setCustomValidity("");let e=document.getElementById("peerAddressInput").value;if(e)try{await s.ipfs.swarm.connect(e),o.showPopup(`Successfully connected to peer ${e}`),console.log("Connected to peer")}catch(n){o.showExceptionPopup(n)}};return e(document).on("update-peers",(async n=>{A=n.detail.peers,d=n.detail.count,c=n.detail.addresses,r()})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

    <div class="page" data-name="connect">

        <${$e} breadcrumbs=${f}  />


        <div class="page-content hide-toolbar-on-scroll">

            <div class="row">
                <div class="col-100 tablet-50 center">

                    <div class="block-title">IPFS Addresses
                    </div>
                    <div class="block list media-list peer-list">
                        <ul>
                            ${c?.map((n=>e`
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-subtitle no-wrap">
                                            ${n}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            `))}
                        </ul>
                    </div>

                    <div class="block-title">IPFS Peers <span class="badge peers-badge color-blue">${d}</span>
                    </div>
                    <div class="block list media-list peer-list">
                        <ul>
                            ${A?.map((n=>e`
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-subtitle no-wrap">
                                            ${n}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            `))}
                        </ul>
                    </div>


                    <div class="block-title">Add IPFS Peer</div>
                    <div class="block list">
                        <ul>
                            <li>
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">Peer Address</div>
                                        <div class="item-input-wrap">
                                            <input id="peerAddressInput" type="text" name="peerAddress" placeholder="Enter peer address" required validate />
                                        </div>
                                        <div class="item-after">
                                            <button class="button button-fill text-color-black" value="Add Peer" @click=${p}>Add Peer</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

        </div>

    </div>

`}}ta([je("/admin/settings"),aa("design:type",Function),aa("design:paramtypes",[]),aa("design:returntype",Promise)],ia.prototype,"show",null),ia=ta([(0,r.b)(),aa("design:paramtypes",[ee])],ia),ra.id="8a641cd847";const oa=ra;var la=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o},sa=function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)};let Aa=class{ipfsService;constructor(n){this.ipfsService=n}async show(){return new Fe((async n=>{if(!this.ipfsService.ipfs)return{};let e=await this.ipfsService.ipfs.swarm.peers(),t=await this.ipfsService.ipfs.id();return{peers:e.map((n=>n.addr.toString())),peerCount:e.length,addresses:t?.addresses?.map((n=>n.toString()))}}),oa)}};function da(n,{$:e,$h:t,$on:a,$f7:r,$update:o}){let l,s=n.channelViewModel,A=[{text:"Home",path:"/"},{text:s.channel.title,path:`/admin/channel/show/${s.channel._id}`},{text:"Publish"}];return a("pageInit",(async(n,e)=>{l=i.getWalletService(),await o()})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

    <div class="page" data-name="publish">
  
      <${$e} breadcrumbs=${A}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        <div class="fixed-width-content center">

          ${s.itemCount>0?e`
          
            <div class="block-title block-title-medium">Configure Git</div>
            <div class="block list media-list">
              <ul>
                <li>
                  <a href="/admin/publish/fork-reader/${s.channel._id}" class="item-link">
                    <div class="item-content">
                      <div class="item-media">
                        <span class="material-icons">fork_left</span>
                      </div>
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-title">Create/Connect Git Repository</div>
                        </div>
                        <div class="item-subtitle">Create a remote git repository for the collection.</div>
  
                        <div class="item-text">
                          
                            ${s?.gitProvider?e`
                              <strong>Provider:</strong>  ${s?.gitProvider.name} <br />
                            `:e` `}
  
                            ${s.channel.httpUrlToRepo?e`
                              <strong>Repository:</strong>  ${s.channel.httpUrlToRepo}
                            `:e` `}
  
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
  
            <div class="block-title block-title-medium">Export</div>
  
            <div class="block list media-list">
              <ul>
                <li>
                  <a href="/admin/publish/export/${s.channel._id}" class="item-link">
                    <div class="item-content">
                      <div class="item-media">
                        <span class="material-icons">import_export</span>
                      </div>
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-title">Export to Git Provider</div>
                        </div>
                        <div class="item-text">
                          Export collection data to the configured git repo. The git provider will create a new IPFS archive (.car) and deploy an updated Large Reader.
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
  
              </ul>
            </div>
  
  
            <div class="block-title block-title-medium">Contract (optional)</div>
  
            ${l?.address?e`
              
              <div class="block list media-list">
                <ul>
                  <li>
                    <a href="/admin/publish/contract/${s.channel._id}" class="item-link">
                      <div class="item-content">
                        <div class="item-media">
                          <span class="material-icons">gavel</span>
                        </div>
  
                        <div class="item-inner">
                          <div class="item-title-row">
                            <div class="item-title">Deploy Contract</div>
                          </div>
                          <div class="item-text">
                            Deploy contract to connected network. Will publish the last IPFS hash from the first step. You can publish the 
                            latest database without deploying the contract. 
                          </div>
                        </div>
  
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
  
            `:e`
              <div class="block-header">
                Note: Use a web browser with wallet support to deploy an ERC-721 smart contract.
              </div>
            `}

  
  
          `:e`
            <div class="card">
              <div class="card-content card-content-padding">
                <p>Add NFTs to the collection before publishing.</p>
              </div>
            </div>
            
          `}


        </div>


        


      </div>
  
    </div>
  
  `}}la([je("/admin/connect"),sa("design:type",Function),sa("design:paramtypes",[]),sa("design:returntype",Promise)],Aa.prototype,"show",null),Aa=la([(0,r.b)(),sa("design:paramtypes",[ie])],Aa),da.id="32e8371a7f";const ca=da;function fa(n,{$:e,$h:t,$on:a,$f7:r,$update:o}){let l,s=i.getInstance(le),A=(i.getInstance(re),i.getInstance(ie),i.getInstance(pn),i.getInstance(ve),i.getInstance(ke)),d=n.channelViewModel,c=n.settings,f=!1,p="",b=d.channel.localCid?.length>0,m=!1,g=!1,C=d.itemCount>0,h=d?.gitProvider?.personalAccessToken?.length>0,u=d?.channel?.httpUrlToRepo?.length>0,v=C&&h&&u,E=[{text:"Home",path:"/"},{text:d.channel.title,path:`/admin/channel/show/${d.channel._id}`},{text:"Publish",path:`/admin/publish/${d.channel._id}`},{text:"Export"}];a("pageInit",(async()=>{m=!1,await o(),await x()})),a("pageAfterOut",((n,e)=>{console.log("Unloading page"),m=!0}));const w=async n=>{n.preventDefault(),r.form.convertToData("#export-form"),b=!1,f=!0,await o();let e=document.getElementsByClassName("publish-label")[0];r.preloader.showIn(e);try{await A.deployReader(d.channel),d.channel.publishReaderIPFSActionStatus="pending",await s.put(d.channel)}catch(n){console.log(n),r.dialog.alert(n.errors,"There was an error")}r.preloader.hideIn(e),f=!1,g=!0,await o()};e(document).on("publish-progress",(async n=>{n.detail.message&&(p=`<p>${n.detail.message}</p>`),l=n.detail.publishStatus,o();let t=document.getElementById("ipfs-publish-process");t&&e(t).scrollTop(t.scrollHeight)}));const x=async n=>{if(!m&&c&&"complete"!=d.channel.publishReaderIPFSActionStatus&&!f){if(console.log("Checking IPFS action workflow status..."),d.channel=await s.get(d.channel._id),"finished"==await A.getIPFSActionStatus(d.channel)){d.channel.localCid="",d.channel.publishReaderIPFSActionStatus="complete",d.channel.localPubDate=(new Date).toJSON(),await s.put(d.channel),b=!0;let n=document.getElementsByClassName("content-card-padding")[0];r.preloader.hideIn(n)}await o(),"complete"!=d.channel.publishReaderIPFSActionStatus&&setTimeout(x,5e3)}};return function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

    <div class="page" data-name="publish">

        <${$e} breadcrumbs=${E}  />

        <div class="page-content hide-toolbar-on-scroll">

            <div class="fixed-width-content center">
                ${v?e`

                    <form @submit="${w}" id="export-form">
    
    
                        <div class="card card-header-divider">
                            <div class="card-header">Export</div>
                            <div class="card-content card-content-padding">
    
                                <p>
                                    Export and publish collection to git and IPFS.
                                </p>
    
                            </div>
                        </div>
                        
                        <div class="card card-header-divider">
                            <div class="card-header">Git Repo</div>
                            <div class="card-content card-content-padding">
                                <strong>Provider:</strong>  ${d?.gitProvider.name} <br />
                                <strong>Repository:</strong>   <a href="${d.channel.httpUrlToRepo}" class="link external" target="_blank">${d.channel.httpUrlToRepo}</a><br />
                                <strong>Branch:</strong>   ${d.channel.publishReaderRepoBranch}
                            </div>
                        </div>
        
    
                        <div class="card card-header-divider">
                            <div class="card-content card-content-padding">                            
                                ${f?e`
                                    <div class="publish-label">
                                        Exporting...
                                    </div>
    
                                    ${l?e`
    
                                        <div class="row">
                                            <div class="margin-top"><strong>NFT Data</strong></div>
                                            <div class="data-table">
                                                <table>
                                                    <thead>
                                                    <th class="label-cell">Type</th>
                                                    <th class="numeric-cell">Saved</th>
                                                    <th class="numeric-cell">Total</th>
                                                    </thead>
                                                    <tbody>
                                                    <tr class="${l.images.saved==l.images.total&&l.images.total>0?"complete":""}">
                                                        <td class="label-cell">Images</td>
                                                        <td class="numeric-cell">${l.images.saved}</td>
                                                        <td class="numeric-cell">${l.images.total}</td>
                                                    </tr>
                                                    <tr class="${l.animations.saved==l.animations.total&&l.animations.total>0?"complete":""}">
                                                        <td class="label-cell">Animations</td>
                                                        <td class="numeric-cell">${l.animations.saved}</td>
                                                        <td class="numeric-cell">${l.animations.total}</td>
                                                    </tr>
                                                    <tr class="${l.nftMetadata.saved==l.nftMetadata.total&&l.nftMetadata.total>0?"complete":""}">
                                                        <td class="label-cell">NFT Metadata</td>
                                                        <td class="numeric-cell">${l.nftMetadata.saved}</td>
                                                        <td class="numeric-cell">${l.nftMetadata.total}</td>
                                                    </tr>
                                                    
                                                    </tbody>
                                                </table>
    
                                            </div>
                                        </div>
    
                                        <div class="col-100" style="margin-top: 40px;"><strong>Database Backup</strong></div>
                                        <div class="row">
                                            <div class="data-table">
                                                <table>
                                                    <thead>
                                                    <th class="label-cell">Type</th>
                                                    <th class="numeric-cell">Total</th>
                                                    </thead>
                                                    <tbody>
                                                    <tr class="${l.contractMetadata.saved==l.contractMetadata.total&&l.contractMetadata.total>0?"complete":""}">
                                                        <td class="label-cell">Contract Metadata</td>
                                                        <td class="numeric-cell">${l.contractMetadata.total}</td>
                                                    </tr>
                                                    <tr class="${l.backups.items.saved==l.backups.items.total&&l.backups.items.total>0?"complete":""}">
                                                        <td class="label-cell">Items</td>
                                                        <td class="numeric-cell">${l.backups.items.total}</td>
                                                    </tr>
                                                    <tr class="${l.backups.images.saved==l.backups.images.total&&l.backups.images.total>0?"complete":""}">
                                                        <td class="label-cell">Image Metadata</td>
                                                        <td class="numeric-cell">${l.backups.images.total}</td>
                                                    </tr>
                                                    <tr class="${l.backups.animations.saved==l.backups.animations.total&&l.backups.animations.total>0?"complete":""}">
                                                        <td class="label-cell">Animations Metadata</td>
                                                        <td class="numeric-cell">${l.backups.animations.total}</td>
                                                    </tr>
                                                    <tr class="${l.backups.themes.saved==l.backups.themes.total&&l.backups.themes.total>0?"complete":""}">
                                                        <td class="label-cell">Themes</td>
                                                        <td class="numeric-cell">${l.backups.themes.total}</td>
                                                    </tr>
                                                    <tr class="${l.backups.staticPages.saved==l.backups.staticPages.total&&l.backups.staticPages.total>0?"complete":""}">
                                                        <td class="label-cell">Static Pages</td>
                                                        <td class="numeric-cell">${l.backups.staticPages.total}</td>
                                                    </tr>
                                                    <tr class="${l.backups.channels.saved==l.backups.channels.total&&l.backups.channels.total>0?"complete":""}">
                                                        <td class="label-cell">Channels</td>
                                                        <td class="numeric-cell">${l.backups.channels.total}</td>
                                                    </tr>
    
                                                    ${l.backups.authors.total?e`
    
                                                        <tr class="${l.backups.authors.saved==l.backups.authors.total&&l.backups.authors.total>0?"complete":""}">
                                                            <td class="label-cell">Authors</td>
                                                            <td class="numeric-cell">${l.backups.authors.total}</td>
                                                        </tr>
                                                    `:e`<span/>`}
    
    
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
    
                                        <div class="publish-status"></div>
    
                                    `:e`<span />`}
    
                                `:e`
                                    <div class="publish-label" style="display:none;"></div>
                                `}
    
                                ${p?e`
                                    <div class="publish-output" innerHTML="${p}" id="ipfs-publish-process" ></div>
                                `:e`
                                    <div class="publish-output" style="display:none;"></div>
                                `}
    
    
                                ${b?e`
    
                                    <div class="pin-status">
                                        
                                        <strong>Last Exported</strong><br />
                                        <strong>IPFS Hash:</strong> ${d.channel.localCid}<br />
                                        <strong>Date:</strong> ${de()(d.channel.localPubDate).format("MMMM Do YYYY, h:mm:ss a")}

                                    </div>
    
                                `:e`<span />`}
    
    
                                ${f?e`
                                    <p></p>
                                `:e`
    
                                    
                                    ${g?e`
    
                                        <div class="chip chip-outline">
                                            <div class="chip-label">Success!</div>
                                        </div>
    
                                        <button type="submit" class="button button-fill color-gray text-color-white" id="export-refresh-button">
                                            <i class="material-icons">refresh</i> Export Again
                                        </button>
    
    
                                    `:e`
    
                                        ${f?e`<span />`:e`
                                            <button type="submit" class="button button-fill button-small deploy-button" >Export</button>
                                        `}  
    
                                    `}
                                    
                                `}
                            </div>
                        </div>
    
                    </form>
    
                `:e`
    
                    ${C?e` `:e`
                
                        <div class="card">
                        <div class="card-content card-content-padding">
                            <p>Add NFTs to the collection before publishing.</p>
                        </div>
                        </div>
        
                    `}
        
                    ${h?e` 
                    
                        ${u?e` `:e`
                            
                            <div class="card">
                            <div class="card-content card-content-padding">
                                <p>Create/connect a <a href="/admin/publish/fork-reader/${d.channel._id}">git repo</a> to begin export.</p>
                            </div>
                            </div>
            
                        `}
                    
                    `:e`
                        
                        <div class="card">
                        <div class="card-content card-content-padding">
                            <p>Configure a <a href="/admin/settings">git provider</a> to deploy the reader.</p>
                        </div>
                        </div>
        
                    `}
        
    
    
                `}

            </div>

            

        </div>

    </div>

`}}fa.id="fdcfc1da31",fa.style="\n    .deploy-button {\n        margin-top: 10px;\n        width: 200px;\n    }\n\n    .publish-label,\n    .ipfs-label,\n    .forking-label {\n        margin-top: 10px;\n        margin-bottom: 10px;\n        font-weight: bold;\n        font-size: 18px;\n    }\n\n    .publish-output {\n        border: 1px solid #cccccc;\n        font-size: 13px;\n        width: 100%;\n        max-width: 100%;\n        padding: 5px;\n        height: 100px;\n        overflow-y: scroll;\n    }\n\n    .publish-status {\n        font-size: 14px;\n        padding: 10px;\n        border: 1px solid #f1f1f1;\n    }\n\n    .publish-status .item label {\n        font-weight: bold;\n        display: inline-block;\n        width: 180px;\n    }\n\n    #export-refresh-button {\n        width: 45px;\n        height: 30px;\n        display: inline-block;\n        margin-left: 5px;\n        padding-top: 2.5px;\n    }\n\n    #export-next-button {\n        width: 200px;\n        float: right;\n    }\n\n";const pa=fa;var ba=t(26015),ma=t(48764).Buffer,ga=function(n,e){return function(t,a){e(t,a,n)}};let Ca=class{channelService;itemService;ipfsService;imageService;exportService;gitService;walletService;contracts;constructor(n,e,t,a,i,r,o,l){this.channelService=n,this.itemService=e,this.ipfsService=t,this.imageService=a,this.exportService=i,this.gitService=r,this.walletService=o,this.contracts=l}async publish(n,e){this.logPublishProgress(void 0,"Preparing export...");let t=await this.exportService.prepareExport(n,this.walletService.address),a=await this.getFeeReceipient(t);this.logPublishProgress(void 0,`Fee Recipient: ${a}`),this.logPublishProgress(void 0,"Preparing backup...");let i=await this.exportService.createBackup(t);return{cid:await this.exportToIPFS(t,i,a),fsActions:await this.exportToFS(e,n,t,i,a)}}async exportToIPFS(n,e,t){let a=!0,i=this.getIPFSDirectory(n.channel);try{await this.ipfsService.ipfs.files.read(i),await this.ipfsService.ipfs.files.rm(i,{recursive:!0,flush:!0})}catch(n){}let r={contractMetadata:{saved:0,total:1},nftMetadata:{saved:0,total:n.items.length},images:{saved:0,total:n.images.length},animations:{saved:0,total:n.animations.length},backups:{channels:{saved:0,total:1},authors:{saved:0,total:1},items:{saved:0,total:e.items.length},images:{saved:0,total:n.images.length},animations:{saved:0,total:n.animations.length},themes:{saved:0,total:e.themes.length},staticPages:{saved:0,total:e.staticPages.length}}};this.logPublishProgress(r),await this._publishImagesIPFS(r,i,n.images,!0),await this._publishAnimationsIPFS(r,i,n.animations,!0);let o=await this.getImageDirectoryCid(i),l=await this.getAnimationDirectoryCid(i);await this._publishNFTMetadataIPFS(r,i,n.channel,n.items,l,o,!0);let s=`${i}/contractMetadata.json`,A=await this.channelService.exportContractMetadata(n.channel,t,o);await this.ipfsService.ipfs.files.write(s,(new TextEncoder).encode(JSON.stringify(A)),{create:!0,parents:!0,flush:a});let d=await this.ipfsService.ipfs.files.stat(s);r.contractMetadata.saved=1,this.logPublishProgress(r,`Saving contract metadata to ${s} (${d.cid})`),await this.ipfsService.ipfs.files.write(`${i}/backup/channels.json`,(new TextEncoder).encode(JSON.stringify(e.channels)),{create:!0,parents:!0,flush:a}),r.backups.channels.saved=1,this.logPublishProgress(r),await this.ipfsService.ipfs.files.write(`${i}/backup/authors.json`,(new TextEncoder).encode(JSON.stringify(e.authors)),{create:!0,parents:!0,flush:a}),r.backups.authors.saved=1,this.logPublishProgress(r),await this.ipfsService.ipfs.files.write(`${i}/backup/items.json`,(new TextEncoder).encode(JSON.stringify(e.items)),{create:!0,parents:!0,flush:a}),r.backups.items.saved=e.items.length,this.logPublishProgress(r),await this.ipfsService.ipfs.files.write(`${i}/backup/images.json`,(new TextEncoder).encode(JSON.stringify(e.images)),{create:!0,parents:!0,flush:a}),r.backups.images.saved=e.images.length,this.logPublishProgress(r),await this.ipfsService.ipfs.files.write(`${i}/backup/animations.json`,(new TextEncoder).encode(JSON.stringify(e.animations)),{create:!0,parents:!0,flush:a}),r.backups.animations.saved=e.animations.length,this.logPublishProgress(r),await this.ipfsService.ipfs.files.write(`${i}/backup/themes.json`,(new TextEncoder).encode(JSON.stringify(e.themes)),{create:!0,parents:!0,flush:a}),r.backups.themes.saved=e.themes.length,this.logPublishProgress(r),await this.ipfsService.ipfs.files.write(`${i}/backup/static-pages.json`,(new TextEncoder).encode(JSON.stringify(e.staticPages)),{create:!0,parents:!0,flush:a}),r.backups.staticPages.saved=e.staticPages.length,this.logPublishProgress(r),this.logPublishProgress(r,"Flushing to IPFS..."),await this.ipfsService.ipfs.files.flush(`/export/${n.channel._id}/`);let c=await this.ipfsService.ipfs.files.stat(`/export/${n.channel._id}/`,{hash:!0});return this.logPublishProgress(r,`Published to local IPFS at ${c.cid.toString()}`),c.cid.toString()}async exportToFS(n,e,t,a,i){let r=this.getIPFSDirectory(t.channel),o=[];await this._publishImagesFS(n,o,t.images),await this._publishAnimationsFS(n,o,t.animations);let l=await this.getImageDirectoryCid(r),s=await this.getAnimationDirectoryCid(r);await this._publishNFTMetadataFS(n,o,t.channel,t.items,s,l);let A=await this.channelService.exportContractMetadata(t.channel,i,l);return o.push({file_path:`${n}/backup/export/contractMetadata.json`,content:ma.from(JSON.stringify(A))}),e.contractAddress?(o.push({file_path:`${n}/backup/contract/contract.json`,content:ma.from(JSON.stringify({contractAddress:e.contractAddress,ipfsCid:e.localCid}))}),o.push({file_path:`${n}/backup/contract/contract-abi.json`,content:ma.from(JSON.stringify(ba))})):(o.push({file_path:`${n}/backup/contract/contract.json`,content:ma.from(JSON.stringify({}))}),o.push({file_path:`${n}/backup/contract/contract-abi.json`,content:ma.from(JSON.stringify({}))})),o.push({file_path:`${n}/large-config.json`,content:ma.from(JSON.stringify({showMintPage:e.showMintPage,showActivityPage:e.showActivityPage,hostname:e.productionHostname,libraryURL:e.productionBaseLibraryURI,baseURL:e.productionBaseURI,externalLinks:e.externalLinks,marketplaces:e.marketplaces}))}),o.push({file_path:`${n}/backup/export/backup/channels.json`,content:ma.from(JSON.stringify(a.channels))}),o.push({file_path:`${n}/backup/export/backup/authors.json`,content:ma.from(JSON.stringify(a.authors))}),o.push({file_path:`${n}/backup/export/backup/items.json`,content:ma.from(JSON.stringify(a.items))}),o.push({file_path:`${n}/backup/export/backup/images.json`,content:ma.from(JSON.stringify(a.images))}),o.push({file_path:`${n}/backup/export/backup/animations.json`,content:ma.from(JSON.stringify(a.animations))}),o.push({file_path:`${n}/backup/export/backup/themes.json`,content:ma.from(JSON.stringify(a.themes))}),o.push({file_path:`${n}/backup/export/backup/static-pages.json`,content:ma.from(JSON.stringify(a.staticPages))}),o}async exportContract(n){let e=[];e.push({action:"create",file_path:"/backup/contract/contract.json",content:ma.from(JSON.stringify({contractAddress:n.contractAddress,ipfsCid:n.localCid}))}),e.push({action:"create",file_path:"/backup/contract/contract-abi.json",content:ma.from(JSON.stringify(ba))}),await this.gitService.deployReaderContract(n,e)}getIPFSDirectory(n){return`/export/${n._id}`}async getAnimationDirectoryCid(n){let e;try{e=(await this.ipfsService.ipfs.files.stat(`${n}/animations/`,{hash:!0})).cid.toString()}catch(n){}return e}async getImageDirectoryCid(n){let e;try{e=(await this.ipfsService.ipfs.files.stat(`${n}/images/`,{hash:!0})).cid.toString()}catch(n){}return e}async getFeeReceipient(n){let e;return"existing"==n.channel.forkType?n.channel.forkedFromFeeRecipient&&(e=n.channel.forkedFromFeeRecipient):e=n.ownerAddress,e}async _publishAnimationsIPFS(n,e,t,a){this.logPublishProgress(n,`Exporting ${t.length} animations`);for(let i of t){let t,r=`${e}/animations/${i.cid}.html`,o={content:i.content};try{t=await this.ipfsService.ipfs.files.stat(r,{hash:!0})}catch(n){}if(t?.cid.toString())this.logPublishProgress(n,`${r} already exists. Skipping...`);else{const t=await this.ipfsService.ipfs.add(o);if(await this.ipfsService.ipfs.files.cp(`/ipfs/${t.cid.toString()}`,r,{parents:!0,flush:a}),t.cid.toString()!==i.cid.toString())throw new Error(`Incorrect cid when saving animation. Expected: ${i.cid}, Result: ${t.cid.toString()}`);this.logPublishProgress(n,`Saving animation #${n.animations.saved} to ${e}/animations/${i.cid}.html (${i.cid})`)}n.animations.saved++}}async _publishAnimationsFS(n,e,t){for(let a of t){let t={content:a.content};e.push({file_path:`${n}/backup/export/animations/${a.cid}.html`,content:ma.from(t.content)})}}async _publishImagesIPFS(n,e,t,a){for(let i of t){let t,r=`${e}/images/${i.cid}.${i.buffer?"jpg":"svg"}`;try{t=await this.ipfsService.ipfs.files.stat(r,{hash:!0})}catch(n){}if(t?.cid.toString())this.logPublishProgress(n,`${r} already exists. Skipping...`);else{const e=await this.ipfsService.ipfs.add({content:await this.imageService.getImageContent(i)});if(await this.ipfsService.ipfs.files.cp(`/ipfs/${e.cid.toString()}`,r,{create:!0,parents:!0,flush:a}),e.cid.toString()!=i.cid)throw new Error(`Incorrect cid when saving image. Expected: ${i.cid}, Result: ${e.cid.toString()}`);this.logPublishProgress(n,`Saving image to ${r} (${i.cid})`)}n.images.saved++}}async _publishImagesFS(n,e,t){for(let a of t){let t;a.buffer?t=t instanceof Uint8Array?a.buffer:ma.from(Object.values(a.buffer)):a.svg&&(t=ma.from(a.svg)),e.push({file_path:`${n}/backup/export/images/${a.cid}.${a.buffer?"jpg":"svg"}`,content:t})}}async _publishNFTMetadataIPFS(n,e,t,a,i,r,o){let l=[];this.logPublishProgress(n,`Exporting ${a.length} metadata files`);let s={};for(let A of a){let a,d=`${e}/metadata/${A.tokenId}.json`,c=await this.imageService.get(A.coverImageId),f=await this.itemService.exportNFTMetadata(t,A,c,i,r),p=(new TextEncoder).encode(JSON.stringify(f)),b=await yn.of(p);s[b]=f;try{a=await this.ipfsService.ipfs.files.stat(d,{hash:!0})}catch(n){}if(a?.cid.toString()!=b){const n=await this.ipfsService.ipfs.add({content:p});await this.ipfsService.ipfs.files.cp(`/ipfs/${n.cid.toString()}`,d,{create:!0,parents:!0,flush:o})}else this.logPublishProgress(n,`${d} already exists. Skipping...`);let m=s[b];l.push({action:"create",file_path:`/backup/export/metadata/${m.tokenId}.json`,content:ma.from(JSON.stringify(f))}),n.nftMetadata.saved++,this.logPublishProgress(n,`Saving #${A.tokenId} to ${d}`)}return l}async _publishNFTMetadataFS(n,e,t,a,i,r){let o={};for(let l of a){let a=await this.imageService.get(l.coverImageId),s=await this.itemService.exportNFTMetadata(t,l,a,i,r),A=(new TextEncoder).encode(JSON.stringify(s)),d=await yn.of(A);o[d]=s;let c=o[d];e.push({file_path:`${n}/backup/export/metadata/${c.tokenId}.json`,content:ma.from(JSON.stringify(s))})}}async deployContract(n){if(!n.localCid)throw new Error("Not published to Pinata");let e=await this.channelService.countItemsByChannel(n._id);if(e<=0)throw new Error("No NFTs");let t=Ge.vz(n.mintPrice,"ether"),a=await this.deploy(n.title,n.symbol,n.localCid,t.toString(),e);n.contractAddress=a.contractAddress,await this.channelService.put(n)}async deploy(n,e,t,a,i){if(!(n&&e&&a&&i&&t))throw new Error("Missing inputs to deploy");let r=this.walletService.wallet;if(!r)throw new Error("No wallet!");const o=this.contracts.Channel,l=new Xn.lV(o.abi,o.bytecode,r);return(await l.deploy(n,e,t,gt.O$.from(a.toString()),gt.O$.from(i.toString()))).deployTransaction.wait()}logPublishProgress(n,e){if(e&&console.log(e),"undefined"!=typeof window&&void 0!==window.document){const t=new CustomEvent("publish-progress",{detail:{publishStatus:n,message:e}});document.dispatchEvent(t)}}};function ha(n,{$:e,$h:t,$on:a,$f7:r,$update:o}){let l=i.getInstance(le),s=(i.getInstance(re),i.getInstance(ie),i.getInstance(pn),i.getInstance(ke)),A=(i.getInstance(Ca),n.channelViewModel),d=n.settings,c=!1,f=!1,p=A.itemCount>0,b=A?.gitProvider?.personalAccessToken?.length>0,m=p&&b,g=[{text:"Home",path:"/"},{text:A.channel.title,path:`/admin/channel/show/${A.channel._id}`},{text:"Publish",path:`/admin/publish/${A.channel._id}`},{text:"Create Git Repository"}];a("pageInit",(async()=>{c=!1,await o(),await h()})),a("pageAfterOut",((n,e)=>{console.log("Unloading page"),c=!0}));const C=async n=>{n.preventDefault(),f=!0,await o();let e,t=document.getElementsByClassName("content-card-padding")[0];r.preloader.showIn(t);try{e=await s.createFork(A.channel),A.channel.publishReaderRepoId=e.id,A.channel.publishReaderRepoPath=e.path,A.channel.publishReaderRepoBranch=e.branch,A.channel.publishReaderRepoStatus="pending",await l.put(A.channel)}catch(n){r.preloader.hideIn(t),console.log(n),"Error: Request failed with status code 409"==n.toString()?r.dialog.alert("Git repo already exists with that name.","There was an error"):r.dialog.alert(n,"There was an error")}f=!1,await o(),await h()},h=async n=>{if(!c&&d&&!("complete"==A.channel.publishReaderRepoStatus&&A.channel.publishReaderRepoId>0||f)){if(console.log("Checking repo fork status..."),A.channel=await l.get(A.channel._id),"finished"==await s.getForkRepoStatus(A.channel)){let n=await s.getExistingFork(A.channel);A.channel.publishReaderRepoStatus="complete",A.channel.httpUrlToRepo=n.httpUrlToRepo,await l.put(A.channel);let e=document.getElementsByClassName("content-card-padding")[0];r.preloader.hideIn(e)}await o(),"complete"!=A.channel.publishReaderRepoStatus&&setTimeout(h,5e3)}};return function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

  <div class="page" data-name="publish">

    <${$e} breadcrumbs=${g}  />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        ${m?e`

          <div class="block-title">Create/Connect Git Repository</div>
          <div class="card">
  
            <div class="card-content card-content-padding">
              <form id="fork-reader" @submit="${C}">
  
                ${f?e`
                  <div class="forking-label">
                    Forking...
                  </div>
  
                  <div class="preloader"></div>
  
                `:e`
  
  
                  <div class="forking-label" style="display:none;"></div>
  
  
                  ${A.channel.publishReaderRepoId?e`
                    <div class="repo-status">
  
                      <p><strong>Current Repo:</strong> ${A.channel.httpUrlToRepo?e`
                        <a href="${A.channel.httpUrlToRepo}" class="link external" target="_blank">${A.channel.httpUrlToRepo}</a>
                        `:e` `}</p>
  
                      <p><strong>Configured Provider:</strong> ${A?.gitProvider?.name}</p>
  
                      <p><strong>Repo ID:</strong> ${A.channel.publishReaderRepoId}</p>
                      <p><strong>Branch:</strong>   ${A.channel.publishReaderRepoBranch}</p>
                      <p><strong>Repo Path:</strong> ${A.channel.publishReaderRepoPath}</p>
                      <p><strong>Job Status:</strong> ${A.channel.publishReaderRepoStatus}</p>
                    </div>
                  `:e`<span />`}
  
  
  
                  <div class="block cancel-save-row">
        
                    <div class="large-only"></div>
      
                    <a href="/admin/publish/${A.channel._id}" class="button button-outline color-gray" tabindex="30">
                      Back to menu
                    </a>
  
                    <button type="submit" class="button button-fill" tabindex="31">
                      Create/Connect Fork
                    </button>
      
                  </div>
  
                `}
  
              </form>
            </div>
  
          </div>    
  
        `:e`
  
            ${p?e` `:e`
                
              <div class="card">
                <div class="card-content card-content-padding">
                  <p>Add NFTs to the collection before publishing.</p>
                </div>
              </div>
  
            `}
  
            ${b?e` `:e`
              
              <div class="card">
                <div class="card-content card-content-padding">
                  <p>Configure a <a href="/admin/settings">git provider</a> to deploy the reader.</p>
                </div>
              </div>
  
            `}

    
        `}

      </div>


      

    </div>

  </div>

`}}Ca=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),ga(6,(0,o.f)(a.WalletService)),ga(7,(0,o.f)("contracts")),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[le,Qn,ie,Rn,ge,ke,Object,Object])],Ca),ha.id="ac2732f286",ha.style="\n  .publish-label,\n  .ipfs-label,\n  .forking-label {\n    margin-top: 10px;\n    margin-bottom: 10px;\n    font-weight: bold;\n    font-size: 18px;\n  }\n\n  .publish-output {\n    border: 1px solid #cccccc;\n    font-size: 13px;\n    width: 100%;\n    max-width: 100%;\n    padding: 5px;\n    height: 300px;\n    overflow-y: scroll;\n  }\n\n  #fork-next-button {\n    width: 200px;\n  }\n";const ua=ha;function va(n,{$:e,$h:t,$on:a,$f7:r,$update:o}){let l,s=i.getInstance(le),A=i.getInstance(ie),d=(i.getInstance(pn),i.getInstance(ve),i.getInstance(ke)),c=(i.getInstance(Ca),null!=A.ipfs),f=A.peerCount,p=n.channelViewModel,b=n.settings,m=!1,g="",C=p.channel.publishReaderRepoId>0&&"complete"==p.channel.publishReaderRepoStatus,h=null!=p.channel.localCid,u=p.itemCount>0,v=p?.gitProvider?.personalAccessToken?.length>0,E=b?.gitCorsProxy?.length>0,w=u&&v&&E,x=p.channel.httpUrlToRepo,B=[{text:"Home",path:"/"},{text:p.channel.title,path:`/admin/channel/show/${p.channel._id}`},{text:"Publish",path:`/admin/publish/${p.channel._id}`},{text:"Publish Collection To Reader"}];a("pageInit",(async()=>{await A.init(),c=null!=A.ipfs,l=await s.getGitProviderCredentials(p.channel,b),await o()}));const k=async n=>{n.preventDefault(),m=!0,await o();let e=document.getElementsByClassName("ipfs-label")[0];r.preloader.showIn(e);try{let n=`/export/${p.channel._id}`,e=await(0,At.Z)(A.ipfs.files.read(`${n}/contractMetadata.json`));await d.deployReaderGit(p.channel,e)}catch(n){console.log(n),r.dialog.alert(n,"There was an error")}r.preloader.hideIn(e),m=!1,await o()},y=async n=>{n.preventDefault();let e=document.getElementsByClassName("ipfs-label")[0];r.preloader.showIn(e);try{await d.clearGitRepos()}catch(n){r.dialog.alert(n,"There was an error")}r.preloader.hideIn(e),await o()};return e(document).on("publish-reader-progress",(async n=>{g=`<p>${n.detail.message}</p>`,o()})),e(document).on("update-peers",(async n=>{f=n.detail.count,o()})),function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

    <div class="page" data-name="publish">
  
      <${$e} breadcrumbs=${B}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        ${w?e`
              
          <div class="block-title">Publish Reader</div>
          <div class="card">

            <div class="card-content card-content-padding">

              ${l?.personalAccessToken?.length>0?e`

                ${h?e`
                  
                  <form @submit="${k}">

                    ${c?e`
                        <div class="ipfs-label">
                            Status: <a href="/admin/connect">IPFS Ready</a>
                        </div>
                    `:e`
                      <div class="ipfs-label">IPFS Initializing...</div>
                    `}


                    ${p.channel.publishReaderRepoId>0?e`
                      <div class="repo-status">
                        <p><strong>Remote Repository:</strong> ${x}</p> <a href="#" class="link" @click="${y}">Clear local cache</a>
                        <!-- <p><strong>Gitlab Repo ID:</strong> ${p.channel.publishReaderRepoId}</p>
                        <p><strong>Gitlab Repo Path:</strong> ${p.channel.publishReaderRepoPath}</p>  
                        <p><strong>Fork Status:</strong> ${p.channel.publishReaderRepoStatus}</p>                                                                                                                                                               -->
                      </div>

                      ${C&&c?e`

                        ${p.channel.contractAddress?e`
                          <p>Reader will be configured to connect to: ${p.channel.contractAddress}</p>  
                        `:e`
                          <p>Note: Contract is not deployed. The reader will not attempt to connect to Ethereum.</p>  
                        `}

                        ${g?e`
                          <div class="publish-output" innerHTML="${g}"></div>
                        `:e`
                          <div class="publish-output" style="display:none;"></div>
                        `}


                        
                        <div class="block cancel-save-row">
      
                          <div class="large-only"></div>
            
                          <a href="/admin/publish/${p.channel._id}" class="button button-outline color-gray" tabindex="30">
                            Back to menu
                          </a>
        
                          ${m?e`

                            <a href="#" class="button button-outline">
                              Publishing...
                            </a>
                          `:e`
                            <button class="button button-fill" type="submit">Publish Reader</button>
                          `}

                        </div>


                    


                      `:e`
                        <p style="display:none;"></p>
                      `}

                    `:e``}



                  </form>                    
                `:e`
                  <p>Collection must be deployed to IPFS and you must fork the Large Reader before publishing.</p>  
                `}
                
              `:e`
                <p>Configure a <a href="/admin/settings">git provider</a> to deploy the collection reader.</p>
              `}


            </div>

          </div>

        `:e`

            ${u?e` `:e`
                    
              <div class="card">
                <div class="card-content card-content-padding">
                    <p>Add NFTs to the collection before publishing.</p>
                </div>
              </div>

          `}

          ${v?e` `:e`
              
              <div class="card">
                <div class="card-content card-content-padding">
                    <p>Configure a <a href="/admin/settings">git provider</a> to deploy the reader.</p>
                </div>
              </div>

          `}

          ${E?e` `:e`
              
              <div class="card">
                <div class="card-content card-content-padding">
                    <p>Configure a <a href="/admin/settings">git CORS proxy</a> to deploy the reader.</p>
                </div>
              </div>

          `}


          
        `}

      </div>
  
    </div>
  
  `}}va.id="8544bfd214",va.style="\n\n    .publish-label, .ipfs-label, .forking-label {\n      margin-top: 10px;\n      margin-bottom: 10px;\n      font-weight: bold;\n      font-size: 18px;\n    }\n\n    .publish-output {\n      border: 1px solid #cccccc;\n      font-size: 13px;\n      width: 100%;\n      max-width: 100%;\n      padding: 5px;\n      height: 300px;\n      overflow-y : scroll;\n    }\n  ";const Ea=va;function wa(n,{$:e,$h:t,$on:a,$f7:r,$update:o}){let l,s=i.getInstance(le),A=(i.getInstance(re),i.getInstance(ie),i.getInstance(pn)),d=(i.getInstance(ve),i.getInstance(Ca)),c=n.channelViewModel,f=!1,p=null!=c.channel.localCid,b=[{text:"Home",path:"/"},{text:c.channel.title,path:`/admin/channel/show/${c.channel._id}`},{text:"Publish",path:`/admin/publish/${c.channel._id}`},{text:"Deploy Contract"}];a("pageInit",(async(n,e)=>{l=i.getWalletService(),await o()}));const m=async n=>{f=!0,await o();let e={title:`Deploying contract ${name}. Approve transaction and wait for it to be mined.`,promise:d.deployContract(c.channel)};await A.queuePromiseView(e),f=!1,await o()},g=async n=>{n.preventDefault();let e=document.getElementsByClassName("card-content-padding")[1];r.preloader.showIn(e);try{await d.exportContract(c.channel),r.dialog.alert("Git repo updated with contract info.","Success")}catch(n){console.log(n),r.dialog.alert(n.errors,"There was an error")}r.preloader.hideIn(e)},C=async n=>{c.channel.contractAddress=void 0,await s.put(c.channel),c.channel=await s.get(c.channel._id),o()};return function(n){n.$;var e=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,e`

    <div class="page" data-name="publish">
  
      <${$e} breadcrumbs=${b}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        <div class="fixed-width-content center">

          ${c.itemCount>0?e`
              
            ${l?.address?e`
              <div class="block-title">Verify Mint Info</div>
              <div class="card">
                <div class="card-content">
                  <div class="card-content card-content-padding">
  
                    <p>
                      <strong>Mint Price:</strong> ${c.channel.mintPrice} ETH each
                    </p>
  
                    <p>
                      <strong>Royalty:</strong> ${c.channel.royaltyPercent}% 
                    </p>
  
                  </div>
                </div>
              </div>
              
              <div class="block-title">Deploy Contract</div>
              <div class="card">
                <div class="card-content">
                  <div class="card-content card-content-padding">
  
                    ${p?e`
  
                      <div class="pin-status">
                        <p><strong>IPFS Hash:</strong> ${c.channel.localCid}</p>
                        <p><strong>Date Exported:</strong> ${c.channel.localPubDate}</p>
                      </div>
  
  
                      ${c.channel.contractAddress?e`
                        <p>
                          <strong>Current Contract Address:</strong> ${c.channel.contractAddress} 
                          <a @click="${C}" class="button button-fill button-small deploy-button">Reset</a>
                        </p> 
                      `:e`<span/>`}
  
  
                      ${f?e`
                        <p>Deploying...</p>
                      `:e`
                      
                        ${c.channel.contractAddress?e`
                          
                          <h1>Success!</h1>
                          
                          <p>
                            After deploying the contract the Reader can be re-published and it will become aware of Ethereum and show users the 
                            appropriate controls to begin minting NFTs.
                          </p>
                          <a href="#" class="button button-outline button-small deploy-button" @click="${g}">Push Contract Info To Git</a>
  
  
                        `:e`
                          <button class="button button-fill button-small deploy-button" @click="${m}">Deploy Contract</button>
                        `}                        
                      `}
                      
                    `:e`
                      <p>Collection must be deployed to IPFS</p>
                    `}
                  </div>
                </div>
              </div>
              
            `:e`
              <div class="card">
                <div class="card-content card-content-padding">
                  <p>Use a web browser with wallet support to deploy an ERC-721 smart contract.</p>
                </div>
              </div>
            
            `}
  
  
          `:e`
            <div class="card">
              <div class="card-content card-content-padding">
                <p>Add NFTs to the collection before publishing.</p>
              </div>
            </div>
            
          `}


        </div>

        

      </div>
  
    </div>
  
  `}}wa.id="eaa113786c",wa.style="\n\n  ";const xa=wa;var Ba=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o},ka=function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)};let ya=class{channelWebService;settingsService;schemaService;gitlabService;constructor(n,e,t,a){this.channelWebService=n,this.settingsService=e,this.schemaService=t,this.gitlabService=a}async publish(){return new Fe((async n=>(await this.schemaService.loadChannel(n.params.id),{channelViewModel:await this.channelWebService.get(n.params.id)})),ca)}async export(){return new Fe((async n=>{await this.schemaService.loadChannel(n.params.id);let e,t=await this.channelWebService.get(n.params.id);try{e=await this.settingsService.get()}catch(n){}return{channelViewModel:t,settings:e}}),pa)}async forkReader(){return new Fe((async n=>{await this.schemaService.loadChannel(n.params.id);let e,t=await this.channelWebService.get(n.params.id);try{e=await this.settingsService.get()}catch(n){}return{channelViewModel:t,settings:e}}),ua)}async publishReader(){return new Fe((async n=>{await this.schemaService.loadChannel(n.params.id);let e,t=await this.channelWebService.get(n.params.id);try{e=await this.settingsService.get()}catch(n){}return{channelViewModel:t,settings:e}}),Ea)}async contract(){return new Fe((async n=>(await this.schemaService.loadChannel(n.params.id),{channelViewModel:await this.channelWebService.get(n.params.id)})),xa)}};Ba([je("/admin/publish/:id"),ka("design:type",Function),ka("design:paramtypes",[]),ka("design:returntype",Promise)],ya.prototype,"publish",null),Ba([je("/admin/publish/export/:id"),ka("design:type",Function),ka("design:paramtypes",[]),ka("design:returntype",Promise)],ya.prototype,"export",null),Ba([je("/admin/publish/fork-reader/:id"),ka("design:type",Function),ka("design:paramtypes",[]),ka("design:returntype",Promise)],ya.prototype,"forkReader",null),Ba([je("/admin/publish/publish-reader/:id"),ka("design:type",Function),ka("design:paramtypes",[]),ka("design:returntype",Promise)],ya.prototype,"publishReader",null),Ba([je("/admin/publish/contract/:id"),ka("design:type",Function),ka("design:paramtypes",[]),ka("design:returntype",Promise)],ya.prototype,"contract",null),ya=Ba([(0,r.b)(),ka("design:paramtypes",[qe,ee,ln,ve])],ya);let Da=class{constructor(){}buildPagingViewModel(n,e,t,a){let i=new za;return i.offset=n||0,i.limit=e,i.count=t,i.start=i.offset+1,i.end=Math.min(i.offset+e,t),i.previousOffset=Math.max(i.offset-e,0),i.offset+e<t&&(i.nextOffset=i.offset+e),i.page=i.offset/i.limit+1,i.page>i.endPage&&(i.page=i.endPage),i.endPage=Math.ceil(i.count/i.limit),i.lastOffset=i.endPage*i.limit-i.limit,i.showNext=i.endPage>i.page,i.showPrevious=0!=i.offset,i.showFirst=i.page>2,i.showLast=i.page<i.endPage-1,i}calculateEndIndex(n,e,t){let a=e+n-1;return Math.min(t-1,a)}calculateDescendingEndIndex(n,e){let t=e-(n-1);return Math.max(0,t)}calculateDescendingOffset(n,e){let t=e-1-n;return Math.max(0,t)}};Da=function(n,e,t,a){var i,r=arguments.length,o=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,e,t,a);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}([(0,r.b)(),function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)}("design:paramtypes",[])],Da);class za{page;pageNumbers;endPage;offset;limit;count;start;end;previousOffset;nextOffset;lastOffset;showPrevious;showNext;showFirst;showLast}var qa=t(4095);function Ia(n,{$:e,$on:t,$f7:a,$update:r}){i.getInstance(Qn);let o=i.getInstance(le),l=i.getWalletService(),s=n.channel_view_model;const A=async n=>{a.dialog.confirm("Are you sure you want to delete this collection? This will only remove your local copy of the files.",(async()=>{a.preloader.show(),await o.delete(s.channel),a.preloader.hide(),a.views.main.router.navigate("/"),a.toast.show({text:"Collection deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))};return function(n){n.$;var e,t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div class="card card-outline channel-card-show">

    <div class="card-header banner show-channel-banner-${s.channel._id}">

      <div class="float-right">
        <a class="button button-fill button-raised color-blue text-color-white border-white"
          href="/admin/publish/${s.channel._id}">Publish</a>
      </div>


      ${s?.coverImage?t`
      <img src="${s.coverImage.url}" class="avatar" />
      `:t`
      <i class="material-icons avatar">image</i>
      `}

    </div>

    <div class="card-content">

      <div class="card-content card-content-padding">
        
        <div class="float-right">

          <div class="segmented">

            ${t`
              <a class="button button-active" href="/admin/channel/edit/${s.channel._id}">Edit</a>
            `}

            <a class="button" @click="${A}">Delete</a>
          </div>

        </div>
                        
        <div class="title">${s?.channel?.title}</div>

        ${s?.authorDisplayName?t`
        <div class="name">
          By <a
            href="/admin/author/show/${s?.author._id}">${s?.authorDisplayName}</a>
        </div>
        `:""}

        <div class="collection-info">
            <label>Items:</label><strong>${s?.itemCount}</strong>
            
            <span class="dot">·</span>
            <label>Created:</label><strong>${s.dateCreated}</strong>
  
            <span class="dot">·</span>
            <label>Forkable:</label><strong>${s.channel.disableForks?"No":"Yes"}</strong>

            ${s.channel.mintPrice?t`
              <span class="dot">·</span>
              <label>Mint Price:</label><strong>${s.channel.mintPrice} ETH</strong>
            `:t``}
  
            ${s.channel.royaltyPercent?t`
              <span class="dot">·</span>
              <label>Marketplace Creator Fee:</label><strong>${s.channel.royaltyPercent}%</strong>
            `:t``}
        </div>



        ${s.channel.descriptionHTML?t`
          <div class="description" id="channel-show-description-${s.channel._id}"
            innerHTML="${s.channel.descriptionHTML}">
          </div>
        `:t`<span />`}

            

        ${s.channel.contractAddress?t`
          <div class="contract-address">
            <strong>Contract Address:</strong> ${e=s?.channel.contractAddress,l.truncateEthAddress(e)}
          </div>
        `:t``}

        ${s.channel.localCid?t`
          <div class="contract-address">
            <strong>Last Published IPFS CID:</strong> ${s?.channel.localCid}
          </div>
        `:t``}

        ${s.channel.forkedFromCid?t`
          <div class="contract-address">
            <strong>Forked from IPFS:</strong> ${s?.channel.forkedFromCid}
          </div>
        `:t``}

        ${s.channel.forkedFromId?t`
          <div class="contract-address">
            <strong>Forked from:</strong> ${s?.channel.forkedFromId}
          </div>
        `:t``}

      </div>

    </div>

  </div>

`}}Ia.id="7ea8b9969b",Ia.style="    \n";const Sa=Ia;var Fa=t(27725),ja=t(68468),Wa=t(90831),$a=t(53210),Ya=t(36879),Ra=t(74346),Ua=t(89542),Pa=t(77140),Ta=t(31910),Ga=t(59746),Oa=t(88235),_a=t(79859),Xa=t(36567),Ma=t(82391),Za=t(19121),Na=t(90263),La=t(74496),Qa=t(75740),Ha=t(6697),Va=t(15751),Ja=t(860),Ka=t(55298),ni=t(59771),ei=t(47728);let ti;function ai(n){return ti||(ti=new se.W,ti.bind("version").toConstantValue(n),ti.bind("provider").toConstantValue((()=>{if("undefined"!=typeof window&&window.ethereum)return window.web3Provider=window.ethereum,new fn.Q(window.ethereum)})),ti.bind("contracts").toConstantValue(t(26015)),ti.bind("name").toConstantValue("Large"),ti.bind("framework7").toConstantValue(new Fa.ZP({el:"#app",id:"large",name:"Large",theme:"auto",init:!1,component:cn,navbar:{hideOnPageScroll:!0},colors:{},darkMode:"auto"})),ti.bind("PouchDB").toConstantValue(ni.Z),ti.bind("pouch-prefix").toConstantValue("./pouch/"),ti.bind("footer-text").toConstantValue(globalThis.footerText),ti.bind($t).toSelf().inSingletonScope(),ti.bind(Zt).toSelf().inSingletonScope(),ti.bind(Kt).toSelf().inSingletonScope(),ti.bind(ia).toSelf().inSingletonScope(),ti.bind(Aa).toSelf().inSingletonScope(),ti.bind(ya).toSelf().inSingletonScope(),ti.bind(l).toSelf().inSingletonScope(),ti.bind(pn).toSelf().inSingletonScope(),ti.bind(Cn).toSelf().inSingletonScope(),ti.bind(Pn).toSelf().inSingletonScope(),ti.bind(Ca).toSelf().inSingletonScope(),ti.bind(_n).toSelf().inSingletonScope(),ti.bind(ie).toSelf().inSingletonScope(),ti.bind(g).toSelf().inSingletonScope(),ti.bind(ln).toSelf().inSingletonScope(),ti.bind(re).toSelf().inSingletonScope(),ti.bind(Se).toSelf().inSingletonScope(),ti.bind(Da).toSelf().inSingletonScope(),ti.bind(Ct).toSelf().inSingletonScope(),ti.bind(ge).toSelf().inSingletonScope(),ti.bind(oe).toSelf().inSingletonScope(),ti.bind(qe).toSelf().inSingletonScope(),ti.bind(ze).toSelf().inSingletonScope(),ti.bind(Ie).toSelf().inSingletonScope(),ti.bind(a.WalletService).to(Zn).inSingletonScope(),ti.bind(be).toSelf().inSingletonScope(),ti.bind(Nn).toSelf().inSingletonScope(),ti.bind(le).toSelf().inSingletonScope(),ti.bind(Rn).toSelf().inSingletonScope(),ti.bind(Qn).toSelf().inSingletonScope(),ti.bind(Dn).toSelf().inSingletonScope(),ti.bind(wt).toSelf().inSingletonScope(),ti.bind(Sn).toSelf().inSingletonScope(),ti.bind(me).toSelf().inSingletonScope(),ti.bind(Ln).toSelf().inSingletonScope(),ti.bind(ee).toSelf().inSingletonScope(),ti.bind(ke).toSelf().inSingletonScope(),ti.bind(ve).toSelf().inSingletonScope(),ti.bind(xe).toSelf().inSingletonScope(),ti.bind(C).toSelf().inSingletonScope(),ti.bind(y).toSelf().inSingletonScope(),ti.bind(P).toSelf().inSingletonScope(),ti.bind(W).toSelf().inSingletonScope(),ti.bind(E).toSelf().inSingletonScope(),ti.bind(Kn).toSelf().inSingletonScope(),ti.bind(I).toSelf().inSingletonScope(),ti.bind(N).toSelf().inSingletonScope(),ti.bind(_).toSelf().inSingletonScope(),ti.bind(V).toSelf().inSingletonScope(),ti.bind(en).toSelf().inSingletonScope(),ti.bind(on).toSelf().inSingletonScope(),ti.bind("ipfsRemoteInit").toConstantValue((async n=>{if(n)return(0,qa.Ue)({url:n})})),globalThis.container=ti,ti)}ni.Z.plugin(ei.Z),Fa.ZP.use([ja.Z,Wa.Z,$a.Z,Ya.Z,Ra.Z,Ua.Z,Pa.Z,_a.Z,Xa.Z,Ma.Z,Za.Z,Na.Z,La.Z,Qa.Z,Ha.Z,Va.Z,Ja.Z,Ta.Z,Ga.Z,Oa.Z,Ka.Z]),Fa.ZP.registerComponent("channel-card",Sa);var ii=t(93379),ri=t.n(ii),oi=t(7795),li=t.n(oi),si=t(90569),Ai=t.n(si),di=t(3565),ci=t.n(di),fi=t(19216),pi=t.n(fi),bi=t(44589),mi=t.n(bi),gi=t(60799),Ci={};Ci.styleTagTransform=mi(),Ci.setAttributes=ci(),Ci.insert=Ai().bind(null,"head"),Ci.domAPI=li(),Ci.insertStyleElement=pi(),ri()(gi.Z,Ci),gi.Z&&gi.Z.locals&&gi.Z.locals;var hi=t(55829),ui={};ui.styleTagTransform=mi(),ui.setAttributes=ci(),ui.insert=Ai().bind(null,"head"),ui.domAPI=li(),ui.insertStyleElement=pi(),ri()(hi.Z,ui),hi.Z&&hi.Z.locals&&hi.Z.locals;var vi=t(16635),Ei={};Ei.styleTagTransform=mi(),Ei.setAttributes=ci(),Ei.insert=Ai().bind(null,"head"),Ei.domAPI=li(),Ei.insertStyleElement=pi(),ri()(vi.Z,Ei),vi.Z&&vi.Z.locals&&vi.Z.locals,t(3394),t(68021);var wi=t(7823),xi={};xi.styleTagTransform=mi(),xi.setAttributes=ci(),xi.insert=Ai().bind(null,"head"),xi.domAPI=li(),xi.insertStyleElement=pi(),ri()(wi.Z,xi),wi.Z&&wi.Z.locals&&wi.Z.locals;const Bi=async n=>{let e=ai(n),t=e.get("framework7"),a=e.get(Se);t.routes.push(...a.buildRoutesForContainer(e)),t.init()}},54026:n=>{"use strict";n.exports="data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAA0sABAAAAAAGLwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABbAAAABoAAAAcmrEdT0dERUYAAAGIAAAAIwAAACQAewBXR1BPUwAAAawAAAAuAAAANuAY7+xHU1VCAAAB3AAAAZ4AAAP6ALYH7k9TLzIAAAN8AAAASgAAAGBRKF+WY21hcAAAA8gAAACJAAABYt6F0cBjdnQgAAAEVAAAAAQAAAAEABEBRGdhc3AAAARYAAAACAAAAAj//wADZ2x5ZgAABGAAAATOAAAKDJkUuoRoZWFkAAAJMAAAADAAAAA2IlX292hoZWEAAAlgAAAAIAAAACQHgQM7aG10eAAACYAAAABgAAABHCxp//lsb2NhAAAJ4AAAAJAAAACQQrpFRm1heHAAAApwAAAAHwAAACAAjQBPbmFtZQAACpAAAAFVAAAC3EU7ispwb3N0AAAL6AAAAUIAAAJaVPgZiHicY2BgYGQAgts30q6A6Ps50bYwGgBRFwa1AAB4nGNgZGBg4AFiGSBmAkJmBk0GRgYtBjcgmwUsxgAADWAA0wB4nGNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB4nHVTW07CQBQ9Q2vAJwhVGwW0UJEgvt+Kb+XDT3dAYjQmxA9DXIDLMC7CLz9dg3EJfrkLPDMF+pg0TTPTe84998ydWwgAIyiiDtFudZ6QgskIul1IRLQfH1qMwfsiZqo1BWF8IAkLL4lO4scwDddowGC8iia2kYbDp4gKd5Ncy3yKyPMrjxyuMBHAHdiYxgwZHrqK8QA6xxpTAyyNBdzgGW/4wq8wRUU0xb14Fe/iU3yLP9a2qGRhUeUXIuoZuCrucHdGtTDTrxTk7Wq8nHJWiPCOeM4wz8V8hLOscYLubMZKWCcvzpfHuNAY0Q6ucI3TkPh+D89iVt3OUsTnBm8grsI5xrRcz9dmD9GrNjSk38M1jGpq0uEBZ1LvppyvGu//kh4tpV7mm1Ycl6zcwMsxd3EMqX+C4RAuY3K6t3hKOa02fdt0lVF7z0GWfKltDarIjFP2qkx92UF/an18h5UyVJeRfnyI/ajSwy3ucMh8S+VmeeLwPdTYhSDmZdeVdz8qvV+zMzLHn5I9/p39iHe6JHOy3BXYSQelf3GmQG8AAHicY2Bh/MI4gYGVgYHRhzGNgYHBHUp/ZZBkaGFgYGJgZWaAAUYGJBCQ5prC0MCgwFDFeOD/AQY9ps+MxTA1jAfAShQYxABDtQxkAAB4nGNgYGBmgGAZBkYGEIgB8hjBfBYGByDNw8DBwARkKzDoMlgyxDNU/f8PFAXxDIC8xP///z/+f/3/1f8b/q+HmgAHjGwMcCFGJiDBxICmAGI1HLAwMLCysXNwcnHz8PIxEAP4GQQEhYRFRMXEJSSlpGVk5eQVFJWUVVTV1DU0iTKA1gAAxH4T6AAAAAARAUQAAAAB//8AAnic7VXPTxtHFJ63xh6DY++uf+yq0FJs1l6ktk7x2l4aDEaFEMkCUlXQUi5A6nAprYoqu1IVbG6gKNRVBUJBuUVqpeYSfGirHID2QhrVrWQ1UlXlRA+VWnri0EYK677ZtRMg/0EVaWZn3puZN2++9723hCMiIeQ6TBAboSS6BeRsqkybyN+xLYf9Qaps43BKtmxMbWfqMnXAo1QZmF4TNVHVxE5x5eO5OZgwbomgoTXAtmt2nIndbP5M90z3v9dxx3Q21L7GmWrShL0Z3oApzDCe+EiAEG/I4ZdiyXgkJvkdoUgcdJXK6lfjqdR46sZ8JjOfgUTbQltxAQZS4319429lmNJ4+PyHbe8uEOv+2neg4QVeQsIhnmNW0qBG4snYiyCBCgC/uzok186OSwq69vkyx+27pA7X9g7T7vOWv7U/YBe+wBrwHFqRqZpQHZ0hZkMK+KkcYh6ipzCwFFmi0fT52dmrl7ro1zNDQzODq0uRYoB2zV6dnT3fH6WDM4ODM6ZfJEK28a12QnwUTerb+byyuQlJc2j4fgibsEqceGsgyDbJFDaNuyWlUlFKv8Wtsb6XuOF7yDJ7Osig6iXgFaNSUibqI4HaQ8TiJcQCa5meTAO67+dBZtCehYgd8OX45u1t9v59/mew7TNMULaQYHf4yZ7ls47OqPreTaVYVL7BbyF8cj2Brsq0vhwuFBUTR2O1aY47JC4i44swlFTWZTSjch0KJ3iVjiavwHEDe8m9Rus1fjKONjbABjGwbWz8uac3lvRHDx6rjSO27WnMGGBYe3XYZDhpn+2yAXoQwAZmGeiBJBFQsMAwkTC5AW7qF5zfOv3OUeqRaC9EnYIfZRQlD+2tn5+H1yHCzpOTp/UkxD10hUrYPZIzl3NCxMMEpvPQXI6aeJApqOB59k8hfRAM2BPBAFQMDSqHmnZd0zBm/5J3yC/wCvEQghGTJR48gLfoSTkz0yIILe/bfY5zbg9/5trnfIuL/9IJdIA/4/ZY/k3DMNpnHEP2UPWmGRCImAOxuE0kGMKYuVm+YdCOMdtR5/XBpG9SeVUfG/tgbGuyv3+yf+lt32Q7SmN697k005zEgjELk8ukFWUJdwIIybPRgCGfR91JP5ENyAnLz+mbSqGgsBpR+wtuwTqiJJIXsCrUq4GP+dfJSkQaGNtUk5NXyouL5Sv3L2SzF4az2eHR9lFsI+0jI+2wvnh7cfG2cXT52uXsp9kfrCWzPcmhOfgI+UngsT1Zh7lSSWk0uHhMwPjUjB3ugNslrYTYRRM3Ue9nSUXBoYZUiCIXYjL0KPHwj964z+s17gVaW33GPS/4vAnve9xBazjceuSvMDnOVjkfJL0a7qz71E7uwCWGa9Li15PEvXOSUlHBuYJ8XXEKksUwYvKnB5yQYud9SB6MrskeiXH0H9G17HC10Itu3iHa05+4oNsl3G+m07zbzjlGdsVTdYpVIBWrk5LLwRQO+XydQ7UprsJFSDPjUFxIajFJwIt8xzK8urZera6vrRWSBWxF9n0ZuqpV49cq3CjqhYJeNL+nc9i8M5gIqhWWu8Zd6CnBKpvGzRy2Mf84Df1jOYRxExNWFrHOaUcVqyNq8SWzncZUsKjKctf6MSBJlylddlr0hDefwvQ/M6nleQAAeJxjYGRgYADis2XfmeP5bb4ycDMxgMD9nGhbGP3/x79eljSmz0AuBwNYGgBQ5wydeJxjYGRgYPr8r5dBjyXt/w8GBpY0BqAICnAHAJFTBcN4nGPYzSDIAAKrGAY1YAwAYh0gPgDk7APSs4D4EEjs/0+G40AxIGZJg4pbALETEJ8Fip/9/4PRDch2gYqB2KuBGKiW6c3//wy7gWyG/z9AZjKdhehnMgbqA4oDAJFZGHgAAAAqACoAKgA0AD4ASABSAFwAZgBwAHoAhACOAJgAogCsALYAwADKANQA3gDoAPIA/AEGARABGgEkAS4BOAFCAUwBVgFgAWoBdAF+AYgBkgGcAaYBsgHcAf4CKAI6AlACYgKCApICogLUAuoDCgMqAzwDWgNsA5ADrgO+A/IEDAQ8BFwEfASOBLYEzATmBQZ4nGNgZGBgcGeQY2BhAAEmIGZkAIk5MOiBBAAN5gDdAHicrZC9asMwFIWP8gftUDo00FFjEmIjawlkTcmSpXTwbhw3EYmtoARC6ON06Na9Q5+iY6FP0IfosaJChwwdYri6n6/Olc4VgCu8QuD49fAQWKCLl8ANXOIjcBNa3AVuoSueA7dxLT4Dd9Bt3FIpWhf8u/ddNQsM8BS4gRu8B25ijq/ALQzEPnAbUrwF7rD+jQksNjjAwWCBJXaQ9Jyjz6yhGBpDcoo1Mp5qUDIcKzOqM1JdL3mG8buY2M3BmcVyJ3t5X2ql9VCm62xuSuPkbJm5dVZuzJzKRzbXrQX2NOGwwggRr665IBnPFbaUuqws9tatRlFuXRGZ3FYsn9T+FUx9ceez43yFnyrmXBJjxv8tHPUJuyOuiuvv62Bqq93UukUhdazkWJ40y3qio0RF9YucY/aUOsd943WSZhSNxT7X4yEt3NbYSiqVxEopeYZLfwCb64ZqAAAAeJxtUIlOwkAUnAGVW4rch36M8b7v2zSlLdIIXbJdxL/HhbaBJm6yyb6ZebPzHlJYnvkcxH/nWF8ihTQMVFFDHQ000UIbHXTRwz4OcIgjrTvBKc5wjgtc4grXuMEt7nCPBzziCc94wSve8I4PfDLFNDe4yS1mmGWOeRZYZInbLNNghTusssY6G2yyxTY77LLHXe7lA9eS9tD0RFCxh+6PFL4pva+hWiC5iBw75ZgbuQOl65IlpZjFVUGz9ndf/Oq3kVBqk1LCtrhON3yhvIFnW8rTiD0SgbvoKIfmfaGUGGvLnLQcTyyYatztiJlvWlMppJUJhFRRxDBEiOdj7XRSiuYIicqKiJDium3ZcUeuck0ppr6z+D2q9dATJc0w23qW5aArozCDFhjJferVJJy1Yjs0i/nschKN15Kdofcf+xC0ZgAA"},49954:n=>{"use strict";n.exports="data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA"},57578:n=>{"use strict";n.exports="data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAYAAA0AAAAAESgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABMAAAABoAAAAclcTxx09TLzIAAAFMAAAASwAAAGBRtV1jY21hcAAAAZgAAAC9AAABamglddJjdnQgAAACWAAAAAQAAAAEABEBRGdhc3AAAAJcAAAACAAAAAj//wADZ2x5ZgAAAmQAAACTAAAJdL6KsfZoZWFkAAAC+AAAAC4AAAA2GgvLb2hoZWEAAAMoAAAAGgAAACQC8ADFaG10eAAAA0QAAAATAAAAtAMAABFsb2NhAAADWAAAAK4AAACuaF5mEm1heHAAAAQIAAAAHwAAACAAmgA5bmFtZQAABCgAAAE5AAACNKbyxURwb3N0AAAFZAAAAJkAAADOCL0Ic3icY2BgYGQAgts30q6A6DvfXCthNABZwwgPAAB4nGNgYWRgnMDAysDA6MOYxsDA4A6lvzJIMrQwMDAxsHIywAAjAxIISHNNYWhgUGCoZTzw/wCDHuMBBgeYGsYDQB4DUI4RAOnYC70AeJxjYGBgZoBgGQZGBhBIAfIYwXwWBg8gzcfAwcDEwMagxKDFYM0QyxDPUPv/P1BcgUGNQYfBEchP/P///+P/D/7f/3/r/83/N6DmIAFGNga4ICMTkGBCVwB0AgsrkMHGzsHJxcDNw8vHLyAoJCwiKiYuISkFViMtIysnr6CopKyiqqauoamlraOrp29gaGRsYmpmzmDBYGllbWNrZ+/g6OTs4urm7uHp5e3j6+cfEBgUHBKK7iL6AwBJLiG7AAAAABEBRAAAAAH//wACeJztzrENwjAUBNA7O4nrXzBAREEHEm5dsERWyApZIStkBip7ggzCCmyAEmxCQYNESfG7r3un04eBAJjYwcLhGIlTSK7C/Ryb+haSNflEtCWuS5xcw0dILLkXLwcvexmHvme3XIU+rxFYZ4Jz3sROWiEuBgug9tXMh7lN21djxbu1Nf/pZzU1NTU1NbWf7QnZ5mwOAHicY2BkYGAAYrZdrHLx/DZfGbiZGEDgzjfXSgT9/wAjA+MBIJeDASwNAA4cCj0AAHicY2BkYGA88P8Agx6QAQSMYIQCWABQZgK3AAB4nGNkYBBkAAJGKB4KAAAOfQAVAAAAACoAKgAqADgARgBUAGIAcAB+AIwAmgCoALYAxADYAOYA9AECARABHgEsAToBSAFWAWQBcgGAAY4BnAGqAbgBxgHUAeIB8AH+AgwCGgIoAjYCRAJSAmACbgJ8AooCmAKmArQCwgLQAt4C7AL6AwgDFgMkAzIDQANOA1wDagN4A4YDlAOiA7ADvgPMA9oD6AP2BAQEEgQgBC4EPARKBFgEZgR0BIIEkASeBKwEugAAeJxjYGRgYAhj4GBgYgABEMnIABJzYNADCQAADScA1AB4nH2PvW7CMBSFj/krXSpeoJKHDiAR6mRAFStSVIkFMWToFhErWCQkMmFAVR+hax+hY5+vY0+MWTqQ6Mqfj4/vPQbwgB8IXL4xNp4Fhvj03MEdvj138YRfzz0MxbPnPkbizfOA+gedonfP3drdallghHfPHc798tzFKzNcuMc+j577kOLF84D6HktUqHGGhUGOHRpIZt5iwjWCYoWYkhMUSJHRVbIslRXdKanVS/Yw7hTLqj5bk+8aOd5OZKSicCqTIs1Maaxc7VJbpGVtMjqP2EPzuubQCgcKe13opiJtKOY4ud6WW52fipQQO2PjVkuHdilnzCmxYP1veVHbNwSYs64vQlwdmriyuZbRTMmFvI4mRmEwD9rcNxMmFC0Nxs9R/EOXRLk0SLQ9GjZUKpwppeStbn/Mg1tYAAAAeJxdzlkzggEARuGn1EXUWEJFubJU1iyRJcbQJoRC9t/dn8k3XXZu3plz8c4RNmI4kAkmZJzXkQ2bEBEVM2lKXMK0GbPmJM1bsCglHTwsWZaVs2LVmnUb8gqKNm3ZtmPXnpJ9Bw4dKTt2ouLUmXMXqi5duXbjVk1dQ1PLnbZ7Dx51PHn2oqsXdL151/fh05dvP379/QOXKRMwAAAA"},6595:n=>{"use strict";n.exports="data:image/svg+xml;charset=UTF-8, %3csvg xmlns=%27http://www.w3.org/2000/svg%27 xmlns:xlink=%27http://www.w3.org/1999/xlink%27 viewBox=%270 0 256 417%27 version=%271.1%27 preserveAspectRatio=%27xMidYMid%27%3e%3cg%3e%3cpolygon fill=%27%23343434%27 points=%27127.9611 0 125.1661 9.5 125.1661 285.168 127.9611 287.958 255.9231 212.32%27/%3e%3cpolygon fill=%27%238C8C8C%27 points=%27127.962 0 0 212.32 127.962 287.959 127.962 154.158%27/%3e%3cpolygon fill=%27%233C3C3B%27 points=%27127.9611 312.1866 126.3861 314.1066 126.3861 412.3056 127.9611 416.9066 255.9991 236.5866%27/%3e%3cpolygon fill=%27%238C8C8C%27 points=%27127.962 416.9052 127.962 312.1852 0 236.5852%27/%3e%3cpolygon fill=%27%23141414%27 points=%27127.9611 287.9577 255.9211 212.3207 127.9611 154.1587%27/%3e%3cpolygon fill=%27%23393939%27 points=%270.0009 212.3208 127.9609 287.9578 127.9609 154.1588%27/%3e%3c/g%3e%3c/svg%3e"},40086:n=>{"use strict";n.exports="data:image/svg+xml;charset=utf-8,<svg height=%2735%27 viewBox=%270 0 96 70%27 width=%2748%27 xmlns=%27http://www.w3.org/2000/svg%27><path d=%27m84 35c1 7-5 37-42 35-37 2-43-28-42-35-1-7 5-37 42-35 37-2 43 28 42 35z%27/></svg>"},18540:n=>{"use strict";n.exports="data:image/svg+xml;charset=utf-8,<svg height=%2735%27 viewBox=%270 0 96 70%27 width=%2748%27 xmlns=%27http://www.w3.org/2000/svg%27><path d=%27m84 35c1 7-5 37-42 35-37 2-43-28-42-35-1-7 5-37 42-35 37-2 43 28 42 35z%27/><path d=%27m96 70c-6-2-12-10-12-19v-16l-14 27s8 8 26 8z%27/></svg>"},14167:n=>{"use strict";n.exports="data:image/svg+xml;charset=utf-8,<svg height=%2735%27 viewBox=%270 0 96 70%27 width=%2748%27 xmlns=%27http://www.w3.org/2000/svg%27><path d=%27m96 35c1 7-5 37-42 35-37 2-43-28-42-35-1-7 5-37 42-35 37-2 43 28 42 35z%27/></svg>"},71154:n=>{"use strict";n.exports="data:image/svg+xml;charset=utf-8,<svg height=%2735%27 viewBox=%270 0 96 70%27 width=%2748%27 xmlns=%27http://www.w3.org/2000/svg%27><path d=%27m96 35c1 7-5 37-42 35-37 2-43-28-42-35-1-7 5-37 42-35 37-2 43 28 42 35z%27/><path d=%27m0 70c6-2 12-10 12-19v-16l14 27s-8 8-26 8z%27/></svg>"},94763:(n,e,t)=>{"use strict";n.exports=t.p+"4b8a7d10ca32f3125696.ttf"},54585:(n,e,t)=>{"use strict";n.exports=t.p+"286bd8fcebb566a45853.woff"},5054:(n,e,t)=>{"use strict";n.exports=t.p+"852655880420bcb785bd.woff2"},46601:()=>{},74897:()=>{},15525:()=>{},63897:()=>{},26015:n=>{"use strict";n.exports=JSON.parse('{"Channel":{"abi":[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"ipfsCid","type":"string"},{"internalType":"uint256","name":"mintFee","type":"uint256"},{"internalType":"uint256","name":"maxTokenId","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"InvalidQueryRange","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"MintEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_MINT_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"explicitOwnershipOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"}],"internalType":"struct IERC721A.TokenOwnership","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"explicitOwnershipsOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"}],"internalType":"struct IERC721A.TokenOwnership[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"stop","type":"uint256"}],"name":"tokensOfOwnerIn","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"}],"name":"mintFromStartOrFail","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_i","type":"uint256"}],"name":"uint2str","outputs":[{"internalType":"string","name":"_uintAsString","type":"string"}],"stateMutability":"pure","type":"function"}],"name":"Channel","bytecode":"0x6080604052600a600d553480156200001657600080fd5b50604051620030e5380380620030e58339810160408190526200003991620002a6565b8451859085906200005290600290602085019062000133565b5080516200006890600390602084019062000133565b50506001600055506200007b33620000e1565b600b829055600c81905582516200009a90600a90602086019062000133565b50600a604051602001620000af919062000386565b60405160208183030381529060405260099080519060200190620000d592919062000133565b50505050505062000470565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b82805462000141906200034a565b90600052602060002090601f016020900481019282620001655760008555620001b0565b82601f106200018057805160ff1916838001178555620001b0565b82800160010185558215620001b0579182015b82811115620001b057825182559160200191906001019062000193565b50620001be929150620001c2565b5090565b5b80821115620001be5760008155600101620001c3565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200020157600080fd5b81516001600160401b03808211156200021e576200021e620001d9565b604051601f8301601f19908116603f01168101908282118183101715620002495762000249620001d9565b816040528381526020925086838588010111156200026657600080fd5b600091505b838210156200028a57858201830151818301840152908201906200026b565b838211156200029c5760008385830101525b9695505050505050565b600080600080600060a08688031215620002bf57600080fd5b85516001600160401b0380821115620002d757600080fd5b620002e589838a01620001ef565b96506020880151915080821115620002fc57600080fd5b6200030a89838a01620001ef565b955060408801519150808211156200032157600080fd5b506200033088828901620001ef565b606088015160809098015196999598509695949350505050565b600181811c908216806200035f57607f821691505b6020821081036200038057634e487b7160e01b600052602260045260246000fd5b50919050565b66697066733a2f2f60c81b8152600060076000845481600182811c915080831680620003b357607f831692505b60208084108203620003d357634e487b7160e01b86526022600452602486fd5b818015620003ea5760018114620004005762000433565b60ff1986168a890152848a018801965062000433565b60008b81526020902060005b86811015620004295781548c82018b01529085019083016200040c565b505087858b010196505b50505050505062000467817f2f636f6e74726163744d657461646174612e6a736f6e00000000000000000000815260160190565b95945050505050565b612c6580620004806000396000f3fe6080604052600436106101b75760003560e01c80638da5cb5b116100ec578063c23dc68f1161008a578063e985e9c511610064578063e985e9c514610515578063f2fde38b1461056b578063f76f950e1461058b578063fa9b7018146105ab57600080fd5b8063c23dc68f146104b3578063c87b56dd146104e0578063e8a3d4851461050057600080fd5b8063a0712d68116100c6578063a0712d6814610429578063a22cb4651461043c578063a2309ff81461045c578063b88d4fde1461049357600080fd5b80638da5cb5b146103c957806395d89b41146103f457806399a2557a1461040957600080fd5b806342842e0e1161015957806370a082311161013357806370a0823114610354578063715018a6146103745780637a4d892a146103895780638462151c1461039c57600080fd5b806342842e0e146102e75780635bbb2177146103075780636352211e1461033457600080fd5b8063095ea7b311610195578063095ea7b31461025857806318160ddd1461027a57806323b872dd146102bf5780633ccfd60b146102df57600080fd5b806301ffc9a7146101bc57806306fdde03146101f1578063081812fc14610213575b600080fd5b3480156101c857600080fd5b506101dc6101d736600461237c565b6105c1565b60405190151581526020015b60405180910390f35b3480156101fd57600080fd5b506102066106a6565b6040516101e8919061240f565b34801561021f57600080fd5b5061023361022e366004612422565b610738565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101e8565b34801561026457600080fd5b50610278610273366004612464565b6107a2565b005b34801561028657600080fd5b50600154600054037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff015b6040519081526020016101e8565b3480156102cb57600080fd5b506102786102da36600461248e565b6108ab565b6102786108b6565b3480156102f357600080fd5b5061027861030236600461248e565b610994565b34801561031357600080fd5b50610327610322366004612548565b6109af565b6040516101e891906125ee565b34801561034057600080fd5b5061023361034f366004612422565b610a94565b34801561036057600080fd5b506102b161036f366004612666565b610aa6565b34801561038057600080fd5b50610278610b28565b610278610397366004612681565b610bb5565b3480156103a857600080fd5b506103bc6103b7366004612666565b610cbd565b6040516101e891906126a3565b3480156103d557600080fd5b5060085473ffffffffffffffffffffffffffffffffffffffff16610233565b34801561040057600080fd5b50610206610e5d565b34801561041557600080fd5b506103bc6104243660046126db565b610e6c565b610278610437366004612422565b6110a6565b34801561044857600080fd5b5061027861045736600461270e565b6112f1565b34801561046857600080fd5b506000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016102b1565b34801561049f57600080fd5b506102786104ae36600461274a565b6113d7565b3480156104bf57600080fd5b506104d36104ce366004612422565b611447565b6040516101e89190612828565b3480156104ec57600080fd5b506102066104fb366004612422565b611539565b34801561050c57600080fd5b50610206611602565b34801561052157600080fd5b506101dc61053036600461286b565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561057757600080fd5b50610278610586366004612666565b611611565b34801561059757600080fd5b506102066105a6366004612422565b61173e565b3480156105b757600080fd5b506102b1600d5481565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd00000000000000000000000000000000000000000000000000000000148061065457507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806106a057507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6060600280546106b59061289e565b80601f01602080910402602001604051908101604052809291908181526020018280546106e19061289e565b801561072e5780601f106107035761010080835404028352916020019161072e565b820191906000526020600020905b81548152906001019060200180831161071157829003601f168201915b5050505050905090565b60006107438261189e565b610779576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081526006602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60006107ad82610a94565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610814576040517f943f7b8c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff82161461089b5773ffffffffffffffffffffffffffffffffffffffff8116600090815260076020908152604080832033845290915290205460ff1661089b576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6108a68383836118f0565b505050565b6108a6838383611971565b60085473ffffffffffffffffffffffffffffffffffffffff16331461093c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b604051600090339047908381818185875af1925050503d806000811461097e576040519150601f19603f3d011682016040523d82523d6000602084013e610983565b606091505b505090508061099157600080fd5b50565b6108a6838383604051806020016040528060008152506113d7565b805160609060008167ffffffffffffffff8111156109cf576109cf6124ca565b604051908082528060200260200182016040528015610a3857816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816109ed5790505b50905060005b828114610a8c57610a67858281518110610a5a57610a5a6128f1565b6020026020010151611447565b828281518110610a7957610a796128f1565b6020908102919091010152600101610a3e565b509392505050565b6000610a9f82611cd3565b5192915050565b600073ffffffffffffffffffffffffffffffffffffffff8216610af5576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205467ffffffffffffffff1690565b60085473ffffffffffffffffffffffffffffffffffffffff163314610ba9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610933565b610bb36000611ea9565b565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181610c41576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f2073746172742070617373656400000000000000000000000000000000006044820152606401610933565b610c4c81600161294f565b8214610cb4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f546f6b656e2069732070617374207374617274000000000000000000000000006044820152606401610933565b6108a6836110a6565b60606000806000610ccd85610aa6565b905060008167ffffffffffffffff811115610cea57610cea6124ca565b604051908082528060200260200182016040528015610d13578160200160208202803683370190505b50604080516060810182526000808252602082018190529181019190915290915060015b838614610e51576000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff1615159181018290529250610e4957815173ffffffffffffffffffffffffffffffffffffffff1615610df057815194505b8773ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610e495780838780600101985081518110610e3c57610e3c6128f1565b6020026020010181815250505b600101610d37565b50909695505050505050565b6060600380546106b59061289e565b6060818310610ea7576040517f32c1995a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080546001851015610eb957600194505b80841115610ec5578093505b6000610ed087610aa6565b905084861015610eef5785850381811015610ee9578091505b50610ef3565b5060005b60008167ffffffffffffffff811115610f0e57610f0e6124ca565b604051908082528060200260200182016040528015610f37578160200160208202803683370190505b50905081600003610f4d57935061109f92505050565b6000610f5888611447565b905060008160400151610f69575080515b885b888114158015610f7b5750848714155b15611093576000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff161515918101829052935061108b57825173ffffffffffffffffffffffffffffffffffffffff161561103257825191505b8a73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361108b578084888060010199508151811061107e5761107e6128f1565b6020026020010181815250505b600101610f6b565b50505092835250909150505b9392505050565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181611132576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f546f6f20666577000000000000000000000000000000000000000000000000006044820152606401610933565b600d5482111561119e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f546f6f206d616e790000000000000000000000000000000000000000000000006044820152606401610933565b600c546111ab838361294f565b1115611213576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4d696e74696e6720636c6f7365640000000000000000000000000000000000006044820152606401610933565b60085473ffffffffffffffffffffffffffffffffffffffff1633146112a757600b5461123f9083612967565b34146112a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f53656e64206578616374204554480000000000000000000000000000000000006044820152606401610933565b6112b13383611f20565b7f94242c431036b9ba6723a138d4b275a5b38e13a95ef66227a45df427c0f843f36112dc838361294f565b60405190815260200160405180910390a15050565b3373ffffffffffffffffffffffffffffffffffffffff831603611340576040517fb06307db00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b33600081815260076020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6113e2848484611971565b73ffffffffffffffffffffffffffffffffffffffff83163b156114415761140b84848484611f3e565b611441576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b6040805160608082018352600080835260208084018290528385018290528451928301855281835282018190529281019290925290600183108061148d57506000548310155b156114985792915050565b506000828152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff1615801592820192909252906115305792915050565b61109f83611cd3565b60606115448261189e565b6115d0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610933565b600a6115db8361173e565b6040516020016115ec9291906129c0565b6040516020818303038152906040529050919050565b6060600980546106b59061289e565b60085473ffffffffffffffffffffffffffffffffffffffff163314611692576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610933565b73ffffffffffffffffffffffffffffffffffffffff8116611735576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610933565b61099181611ea9565b60608160000361178157505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156117ab578061179581612b24565b91506117a49050600a83612b5c565b9150611785565b60008167ffffffffffffffff8111156117c6576117c66124ca565b6040519080825280601f01601f1916602001820160405280156117f0576020820181803683370190505b509050815b851561189557611806600182612b97565b90506000611815600a88612b5c565b61182090600a612967565b61182a9088612b97565b611835906030612bae565b905060008160f81b905080848481518110611852576118526128f1565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535061188c600a89612b5c565b975050506117f5565b50949350505050565b6000816001111580156118b2575060005482105b80156106a05750506000908152600460205260409020547c0100000000000000000000000000000000000000000000000000000000900460ff161590565b60008281526006602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff87811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600061197c82611cd3565b90508373ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16146119e7576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60003373ffffffffffffffffffffffffffffffffffffffff86161480611a3d575073ffffffffffffffffffffffffffffffffffffffff8516600090815260076020908152604080832033845290915290205460ff165b80611a65575033611a4d84610738565b73ffffffffffffffffffffffffffffffffffffffff16145b905080611a9e576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8416611aeb576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611af7600084876118f0565b73ffffffffffffffffffffffffffffffffffffffff858116600090815260056020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000080821667ffffffffffffffff9283167fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01831617909255898616808652838620805493841693831660019081018416949094179055898652600490945282852080547fffffffff00000000000000000000000000000000000000000000000000000000169094177401000000000000000000000000000000000000000042909216919091021783558701808452922080549193909116611c6e576000548214611c6e578054602086015167ffffffffffffffff1674010000000000000000000000000000000000000000027fffffffff0000000000000000000000000000000000000000000000000000000090911673ffffffffffffffffffffffffffffffffffffffff8a16171781555b505050828473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050505050565b60408051606081018252600080825260208201819052918101919091528180600111611e7757600054811015611e77576000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff16151591810182905290611e7557805173ffffffffffffffffffffffffffffffffffffffff1615611db6579392505050565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff811680835274010000000000000000000000000000000000000000820467ffffffffffffffff16938301939093527c0100000000000000000000000000000000000000000000000000000000900460ff1615159281019290925215611e70579392505050565b611db6565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6008805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b611f3a8282604051806020016040528060008152506120b7565b5050565b6040517f150b7a0200000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290611f99903390899088908890600401612bd3565b6020604051808303816000875af1925050508015611ff2575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611fef91810190612c12565b60015b612069573d808015612020576040519150601f19603f3d011682016040523d82523d6000602084013e612025565b606091505b508051600003612061576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050949350505050565b60005473ffffffffffffffffffffffffffffffffffffffff8416612107576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b82600003612141576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8416600081815260056020908152604080832080547fffffffffffffffffffffffffffffffff00000000000000000000000000000000811667ffffffffffffffff8083168b018116918217680100000000000000007fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000090941690921783900481168b01811690920217909155858452600490925290912080547fffffffff000000000000000000000000000000000000000000000000000000001683177401000000000000000000000000000000000000000042909316929092029190911790558190818501903b156122ec575b604051829073ffffffffffffffffffffffffffffffffffffffff8816906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a461229c6000878480600101955087611f3e565b6122d2576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8082106122445782600054146122e757600080fd5b61233e565b5b60405160018301929073ffffffffffffffffffffffffffffffffffffffff8816906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a48082106122ed575b5060009081556114419085838684565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461099157600080fd5b60006020828403121561238e57600080fd5b813561109f8161234e565b60005b838110156123b457818101518382015260200161239c565b838111156114415750506000910152565b600081518084526123dd816020860160208601612399565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061109f60208301846123c5565b60006020828403121561243457600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461245f57600080fd5b919050565b6000806040838503121561247757600080fd5b6124808361243b565b946020939093013593505050565b6000806000606084860312156124a357600080fd5b6124ac8461243b565b92506124ba6020850161243b565b9150604084013590509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715612540576125406124ca565b604052919050565b6000602080838503121561255b57600080fd5b823567ffffffffffffffff8082111561257357600080fd5b818501915085601f83011261258757600080fd5b813581811115612599576125996124ca565b8060051b91506125aa8483016124f9565b81815291830184019184810190888411156125c457600080fd5b938501935b838510156125e2578435825293850193908501906125c9565b98975050505050505050565b6020808252825182820181905260009190848201906040850190845b81811015610e5157612653838551805173ffffffffffffffffffffffffffffffffffffffff16825260208082015167ffffffffffffffff16908301526040908101511515910152565b928401926060929092019160010161260a565b60006020828403121561267857600080fd5b61109f8261243b565b6000806040838503121561269457600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610e51578351835292840192918401916001016126bf565b6000806000606084860312156126f057600080fd5b6126f98461243b565b95602085013595506040909401359392505050565b6000806040838503121561272157600080fd5b61272a8361243b565b91506020830135801515811461273f57600080fd5b809150509250929050565b6000806000806080858703121561276057600080fd5b6127698561243b565b9350602061277881870161243b565b935060408601359250606086013567ffffffffffffffff8082111561279c57600080fd5b818801915088601f8301126127b057600080fd5b8135818111156127c2576127c26124ca565b6127f2847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016124f9565b9150808252898482850101111561280857600080fd5b808484018584013760008482840101525080935050505092959194509250565b815173ffffffffffffffffffffffffffffffffffffffff16815260208083015167ffffffffffffffff1690820152604080830151151590820152606081016106a0565b6000806040838503121561287e57600080fd5b6128878361243b565b91506128956020840161243b565b90509250929050565b600181811c908216806128b257607f821691505b6020821081036128eb577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000821982111561296257612962612920565b500190565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561299f5761299f612920565b500290565b600081516129b6818560208601612399565b9290920192915050565b7f697066733a2f2f000000000000000000000000000000000000000000000000008152600060076000855481600182811c915080831680612a0257607f831692505b60208084108203612a3a577f4e487b710000000000000000000000000000000000000000000000000000000086526022600452602486fd5b818015612a4e5760018114612a8157612ab2565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008616888b015287858b01019650612ab2565b60008c81526020902060005b86811015612aa85781548c82018b0152908501908301612a8d565b505087858b010196505b505050505050612b1a612af1612aeb837f2f6d657461646174612f000000000000000000000000000000000000000000008152600a0190565b876129a4565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000815260050190565b9695505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612b5557612b55612920565b5060010190565b600082612b92577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b600082821015612ba957612ba9612920565b500390565b600060ff821660ff84168060ff03821115612bcb57612bcb612920565b019392505050565b600073ffffffffffffffffffffffffffffffffffffffff808716835280861660208401525083604083015260806060830152612b1a60808301846123c5565b600060208284031215612c2457600080fd5b815161109f8161234e56fea264697066735822122077a8110e0c07e1e91db6a0afcd253eb4afaa674c06061f496eabc29f0ca8f56a64736f6c634300080d0033","deployedBytecode":"0x6080604052600436106101b75760003560e01c80638da5cb5b116100ec578063c23dc68f1161008a578063e985e9c511610064578063e985e9c514610515578063f2fde38b1461056b578063f76f950e1461058b578063fa9b7018146105ab57600080fd5b8063c23dc68f146104b3578063c87b56dd146104e0578063e8a3d4851461050057600080fd5b8063a0712d68116100c6578063a0712d6814610429578063a22cb4651461043c578063a2309ff81461045c578063b88d4fde1461049357600080fd5b80638da5cb5b146103c957806395d89b41146103f457806399a2557a1461040957600080fd5b806342842e0e1161015957806370a082311161013357806370a0823114610354578063715018a6146103745780637a4d892a146103895780638462151c1461039c57600080fd5b806342842e0e146102e75780635bbb2177146103075780636352211e1461033457600080fd5b8063095ea7b311610195578063095ea7b31461025857806318160ddd1461027a57806323b872dd146102bf5780633ccfd60b146102df57600080fd5b806301ffc9a7146101bc57806306fdde03146101f1578063081812fc14610213575b600080fd5b3480156101c857600080fd5b506101dc6101d736600461237c565b6105c1565b60405190151581526020015b60405180910390f35b3480156101fd57600080fd5b506102066106a6565b6040516101e8919061240f565b34801561021f57600080fd5b5061023361022e366004612422565b610738565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101e8565b34801561026457600080fd5b50610278610273366004612464565b6107a2565b005b34801561028657600080fd5b50600154600054037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff015b6040519081526020016101e8565b3480156102cb57600080fd5b506102786102da36600461248e565b6108ab565b6102786108b6565b3480156102f357600080fd5b5061027861030236600461248e565b610994565b34801561031357600080fd5b50610327610322366004612548565b6109af565b6040516101e891906125ee565b34801561034057600080fd5b5061023361034f366004612422565b610a94565b34801561036057600080fd5b506102b161036f366004612666565b610aa6565b34801561038057600080fd5b50610278610b28565b610278610397366004612681565b610bb5565b3480156103a857600080fd5b506103bc6103b7366004612666565b610cbd565b6040516101e891906126a3565b3480156103d557600080fd5b5060085473ffffffffffffffffffffffffffffffffffffffff16610233565b34801561040057600080fd5b50610206610e5d565b34801561041557600080fd5b506103bc6104243660046126db565b610e6c565b610278610437366004612422565b6110a6565b34801561044857600080fd5b5061027861045736600461270e565b6112f1565b34801561046857600080fd5b506000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016102b1565b34801561049f57600080fd5b506102786104ae36600461274a565b6113d7565b3480156104bf57600080fd5b506104d36104ce366004612422565b611447565b6040516101e89190612828565b3480156104ec57600080fd5b506102066104fb366004612422565b611539565b34801561050c57600080fd5b50610206611602565b34801561052157600080fd5b506101dc61053036600461286b565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561057757600080fd5b50610278610586366004612666565b611611565b34801561059757600080fd5b506102066105a6366004612422565b61173e565b3480156105b757600080fd5b506102b1600d5481565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd00000000000000000000000000000000000000000000000000000000148061065457507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806106a057507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6060600280546106b59061289e565b80601f01602080910402602001604051908101604052809291908181526020018280546106e19061289e565b801561072e5780601f106107035761010080835404028352916020019161072e565b820191906000526020600020905b81548152906001019060200180831161071157829003601f168201915b5050505050905090565b60006107438261189e565b610779576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081526006602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60006107ad82610a94565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610814576040517f943f7b8c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff82161461089b5773ffffffffffffffffffffffffffffffffffffffff8116600090815260076020908152604080832033845290915290205460ff1661089b576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6108a68383836118f0565b505050565b6108a6838383611971565b60085473ffffffffffffffffffffffffffffffffffffffff16331461093c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b604051600090339047908381818185875af1925050503d806000811461097e576040519150601f19603f3d011682016040523d82523d6000602084013e610983565b606091505b505090508061099157600080fd5b50565b6108a6838383604051806020016040528060008152506113d7565b805160609060008167ffffffffffffffff8111156109cf576109cf6124ca565b604051908082528060200260200182016040528015610a3857816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816109ed5790505b50905060005b828114610a8c57610a67858281518110610a5a57610a5a6128f1565b6020026020010151611447565b828281518110610a7957610a796128f1565b6020908102919091010152600101610a3e565b509392505050565b6000610a9f82611cd3565b5192915050565b600073ffffffffffffffffffffffffffffffffffffffff8216610af5576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205467ffffffffffffffff1690565b60085473ffffffffffffffffffffffffffffffffffffffff163314610ba9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610933565b610bb36000611ea9565b565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181610c41576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f2073746172742070617373656400000000000000000000000000000000006044820152606401610933565b610c4c81600161294f565b8214610cb4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f546f6b656e2069732070617374207374617274000000000000000000000000006044820152606401610933565b6108a6836110a6565b60606000806000610ccd85610aa6565b905060008167ffffffffffffffff811115610cea57610cea6124ca565b604051908082528060200260200182016040528015610d13578160200160208202803683370190505b50604080516060810182526000808252602082018190529181019190915290915060015b838614610e51576000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff1615159181018290529250610e4957815173ffffffffffffffffffffffffffffffffffffffff1615610df057815194505b8773ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610e495780838780600101985081518110610e3c57610e3c6128f1565b6020026020010181815250505b600101610d37565b50909695505050505050565b6060600380546106b59061289e565b6060818310610ea7576040517f32c1995a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080546001851015610eb957600194505b80841115610ec5578093505b6000610ed087610aa6565b905084861015610eef5785850381811015610ee9578091505b50610ef3565b5060005b60008167ffffffffffffffff811115610f0e57610f0e6124ca565b604051908082528060200260200182016040528015610f37578160200160208202803683370190505b50905081600003610f4d57935061109f92505050565b6000610f5888611447565b905060008160400151610f69575080515b885b888114158015610f7b5750848714155b15611093576000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff161515918101829052935061108b57825173ffffffffffffffffffffffffffffffffffffffff161561103257825191505b8a73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361108b578084888060010199508151811061107e5761107e6128f1565b6020026020010181815250505b600101610f6b565b50505092835250909150505b9392505050565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181611132576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f546f6f20666577000000000000000000000000000000000000000000000000006044820152606401610933565b600d5482111561119e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f546f6f206d616e790000000000000000000000000000000000000000000000006044820152606401610933565b600c546111ab838361294f565b1115611213576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4d696e74696e6720636c6f7365640000000000000000000000000000000000006044820152606401610933565b60085473ffffffffffffffffffffffffffffffffffffffff1633146112a757600b5461123f9083612967565b34146112a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f53656e64206578616374204554480000000000000000000000000000000000006044820152606401610933565b6112b13383611f20565b7f94242c431036b9ba6723a138d4b275a5b38e13a95ef66227a45df427c0f843f36112dc838361294f565b60405190815260200160405180910390a15050565b3373ffffffffffffffffffffffffffffffffffffffff831603611340576040517fb06307db00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b33600081815260076020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6113e2848484611971565b73ffffffffffffffffffffffffffffffffffffffff83163b156114415761140b84848484611f3e565b611441576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b6040805160608082018352600080835260208084018290528385018290528451928301855281835282018190529281019290925290600183108061148d57506000548310155b156114985792915050565b506000828152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff1615801592820192909252906115305792915050565b61109f83611cd3565b60606115448261189e565b6115d0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610933565b600a6115db8361173e565b6040516020016115ec9291906129c0565b6040516020818303038152906040529050919050565b6060600980546106b59061289e565b60085473ffffffffffffffffffffffffffffffffffffffff163314611692576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610933565b73ffffffffffffffffffffffffffffffffffffffff8116611735576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610933565b61099181611ea9565b60608160000361178157505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156117ab578061179581612b24565b91506117a49050600a83612b5c565b9150611785565b60008167ffffffffffffffff8111156117c6576117c66124ca565b6040519080825280601f01601f1916602001820160405280156117f0576020820181803683370190505b509050815b851561189557611806600182612b97565b90506000611815600a88612b5c565b61182090600a612967565b61182a9088612b97565b611835906030612bae565b905060008160f81b905080848481518110611852576118526128f1565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535061188c600a89612b5c565b975050506117f5565b50949350505050565b6000816001111580156118b2575060005482105b80156106a05750506000908152600460205260409020547c0100000000000000000000000000000000000000000000000000000000900460ff161590565b60008281526006602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff87811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600061197c82611cd3565b90508373ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16146119e7576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60003373ffffffffffffffffffffffffffffffffffffffff86161480611a3d575073ffffffffffffffffffffffffffffffffffffffff8516600090815260076020908152604080832033845290915290205460ff165b80611a65575033611a4d84610738565b73ffffffffffffffffffffffffffffffffffffffff16145b905080611a9e576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8416611aeb576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611af7600084876118f0565b73ffffffffffffffffffffffffffffffffffffffff858116600090815260056020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000080821667ffffffffffffffff9283167fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01831617909255898616808652838620805493841693831660019081018416949094179055898652600490945282852080547fffffffff00000000000000000000000000000000000000000000000000000000169094177401000000000000000000000000000000000000000042909216919091021783558701808452922080549193909116611c6e576000548214611c6e578054602086015167ffffffffffffffff1674010000000000000000000000000000000000000000027fffffffff0000000000000000000000000000000000000000000000000000000090911673ffffffffffffffffffffffffffffffffffffffff8a16171781555b505050828473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050505050565b60408051606081018252600080825260208201819052918101919091528180600111611e7757600054811015611e77576000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff16151591810182905290611e7557805173ffffffffffffffffffffffffffffffffffffffff1615611db6579392505050565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff811680835274010000000000000000000000000000000000000000820467ffffffffffffffff16938301939093527c0100000000000000000000000000000000000000000000000000000000900460ff1615159281019290925215611e70579392505050565b611db6565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6008805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b611f3a8282604051806020016040528060008152506120b7565b5050565b6040517f150b7a0200000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290611f99903390899088908890600401612bd3565b6020604051808303816000875af1925050508015611ff2575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611fef91810190612c12565b60015b612069573d808015612020576040519150601f19603f3d011682016040523d82523d6000602084013e612025565b606091505b508051600003612061576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050949350505050565b60005473ffffffffffffffffffffffffffffffffffffffff8416612107576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b82600003612141576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8416600081815260056020908152604080832080547fffffffffffffffffffffffffffffffff00000000000000000000000000000000811667ffffffffffffffff8083168b018116918217680100000000000000007fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000090941690921783900481168b01811690920217909155858452600490925290912080547fffffffff000000000000000000000000000000000000000000000000000000001683177401000000000000000000000000000000000000000042909316929092029190911790558190818501903b156122ec575b604051829073ffffffffffffffffffffffffffffffffffffffff8816906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a461229c6000878480600101955087611f3e565b6122d2576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8082106122445782600054146122e757600080fd5b61233e565b5b60405160018301929073ffffffffffffffffffffffffffffffffffffffff8816906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a48082106122ed575b5060009081556114419085838684565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461099157600080fd5b60006020828403121561238e57600080fd5b813561109f8161234e565b60005b838110156123b457818101518382015260200161239c565b838111156114415750506000910152565b600081518084526123dd816020860160208601612399565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061109f60208301846123c5565b60006020828403121561243457600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461245f57600080fd5b919050565b6000806040838503121561247757600080fd5b6124808361243b565b946020939093013593505050565b6000806000606084860312156124a357600080fd5b6124ac8461243b565b92506124ba6020850161243b565b9150604084013590509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715612540576125406124ca565b604052919050565b6000602080838503121561255b57600080fd5b823567ffffffffffffffff8082111561257357600080fd5b818501915085601f83011261258757600080fd5b813581811115612599576125996124ca565b8060051b91506125aa8483016124f9565b81815291830184019184810190888411156125c457600080fd5b938501935b838510156125e2578435825293850193908501906125c9565b98975050505050505050565b6020808252825182820181905260009190848201906040850190845b81811015610e5157612653838551805173ffffffffffffffffffffffffffffffffffffffff16825260208082015167ffffffffffffffff16908301526040908101511515910152565b928401926060929092019160010161260a565b60006020828403121561267857600080fd5b61109f8261243b565b6000806040838503121561269457600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610e51578351835292840192918401916001016126bf565b6000806000606084860312156126f057600080fd5b6126f98461243b565b95602085013595506040909401359392505050565b6000806040838503121561272157600080fd5b61272a8361243b565b91506020830135801515811461273f57600080fd5b809150509250929050565b6000806000806080858703121561276057600080fd5b6127698561243b565b9350602061277881870161243b565b935060408601359250606086013567ffffffffffffffff8082111561279c57600080fd5b818801915088601f8301126127b057600080fd5b8135818111156127c2576127c26124ca565b6127f2847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016124f9565b9150808252898482850101111561280857600080fd5b808484018584013760008482840101525080935050505092959194509250565b815173ffffffffffffffffffffffffffffffffffffffff16815260208083015167ffffffffffffffff1690820152604080830151151590820152606081016106a0565b6000806040838503121561287e57600080fd5b6128878361243b565b91506128956020840161243b565b90509250929050565b600181811c908216806128b257607f821691505b6020821081036128eb577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000821982111561296257612962612920565b500190565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561299f5761299f612920565b500290565b600081516129b6818560208601612399565b9290920192915050565b7f697066733a2f2f000000000000000000000000000000000000000000000000008152600060076000855481600182811c915080831680612a0257607f831692505b60208084108203612a3a577f4e487b710000000000000000000000000000000000000000000000000000000086526022600452602486fd5b818015612a4e5760018114612a8157612ab2565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008616888b015287858b01019650612ab2565b60008c81526020902060005b86811015612aa85781548c82018b0152908501908301612a8d565b505087858b010196505b505050505050612b1a612af1612aeb837f2f6d657461646174612f000000000000000000000000000000000000000000008152600a0190565b876129a4565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000815260050190565b9695505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612b5557612b55612920565b5060010190565b600082612b92577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b600082821015612ba957612ba9612920565b500390565b600060ff821660ff84168060ff03821115612bcb57612bcb612920565b019392505050565b600073ffffffffffffffffffffffffffffffffffffffff808716835280861660208401525083604083015260806060830152612b1a60808301846123c5565b600060208284031215612c2457600080fd5b815161109f8161234e56fea264697066735822122077a8110e0c07e1e91db6a0afcd253eb4afaa674c06061f496eabc29f0ca8f56a64736f6c634300080d0033"}}')}},n=>{n.O(0,[216],(()=>(16129,n(n.s=16129))));var e=n.O();admin=e}]);
//# sourceMappingURL=main.admin.js.map