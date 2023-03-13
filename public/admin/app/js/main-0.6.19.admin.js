
  <div class="toolbar toolbar-bottom">

    <div class="toolbar-inner" style="display: block; padding: 10px;">

      
      ${i?n`
        
        <div innerHTML='${i}'></div>
      
      `:n`
        <span class="footer-link">
          Code licensed under <a href="https://github.com/LargeNFT/large-nft/blob/master/LICENSE.md" class="external">MIT</a>
        </span>

        <span class="footer-link">
          <a href="https://github.com/LargeNFT/large-nft" class="external">GitHub</a>
        </span>

        <span class="footer-link">
          <a href="https://twitter.com/large_nft" class="external">Twitter</a>
        </span>

        <span class="footer-link"><a href="https://www.npmjs.com/package/large-nft/v/${o}" class="external">${o}</a></span>
      
      `}


      
    </div>
  </div>


`}}dA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[u,k,z,H,X,Y,h,$,K,eA,rA,cA])],dA),fA.id="b0f3d87bed",fA.style="\n\n\n";const gA=fA;function CA(A,{$on:n,$f7ready:e,$f7:t,$f7router:o,$update:r}){return e((async()=>{let A,n,e=window.location.pathname,o=window.location.hash?.length>2?window.location.hash.substring(2):void 0,l=a.getInstance(i),s=a.getWalletService(),c=a.getInstance(dA);const d=async A=>{n=void 0,s.provider||await s.initProvider(),n=await s.getAddress(),n&&(s.address=n,s.wallet||await s.connect()),await r()};document.addEventListener("connect-wallet",(async A=>{await(async A=>{await s.initWallet(),await s.connect(),await d()})()})),await async function(){l.showSpinner("Loading..."),await c.load(),await d(),A=t.views.create(".view-main",{url:o||"/",browserHistory:!0,browserHistoryRoot:e,reloadCurrent:!0}),l.hideSpinner()}()})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`
  <div id="app">


    <!-- Status bar overlay for fullscreen mode-->
    <div class="statusbar"></div>

    <div class="view view-main" >

      <${gA} />

    </div>



  </div>

`}}CA.id="020d78d97c";const pA=CA;var BA=e(37842);let bA=class{app;constructor(A){this.app=A}async queuePromiseView(A){const n=this;let e={id:hA.newGuid(),icon:A.icon,title:A.title};return async function(){return new Promise(((A,t)=>{n._beforeSaveAction(e),A()}))}().then((async function(){let t=await A.promise;try{n._showSuccess(t,e)}catch(A){n._showError(A,e)}return t}))}_beforeSaveAction(A){A.toast=this.app.toast.create({text:A.title,closeButton:!1}),A.toast.open()}_showError(A,n){n.toast.close(),console.log(A);let e={text:A.message,closeButton:!0,closeButtonText:"Close",closeTimeout:5e3};this.app.toast.create(e).open()}_showSuccess(A,n){n.toast.close(),this.app.toast.create({text:"Transaction Submitted",closeButton:!0,closeTimeout:5e3}).open()}};bA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){return function(e,t){n(e,t,A)}}(0,(0,r.f)("framework7")),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[Object])],bA);class hA{static newGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(A){var n=16*Math.random()|0;return("x"==A?n:3&n|8).toString(16)}))}}var mA=e(88554),EA=e(99810);let wA=class{constructor(){}async translateContent(A,n=!1){if(!A?.ops)return"";const e=new mA.bc(A.ops,{encodeHtml:!1});return e.renderCustomWith(uA(n)),e.convert()}async translateContentEncodeHtml(A,n=!1){if(!A?.ops)return"";const e=new mA.bc(A.ops,{});return e.renderCustomWith(uA(n)),e.convert()}async generateMarkdown(A){return(0,EA.deltaToMarkdown)(A.ops)}};wA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[])],wA);const uA=A=>function(n,e){if("divider"===n.insert.type)return"<hr />";if("ipfsimage"===n.insert.type){let e="<img ";return A||(e+=`src="${n.insert.value.src}" `),n.insert.value.width&&(e+=`width="${n.insert.value.width}" `),n.insert.value.height&&(e+=`height="${n.insert.value.height}" `),n.insert.value.style&&(e+=`style="${n.insert.value.style}"`),e+="/>",e}};var vA=e(76095),QA=e.n(vA),xA=e(57883),IA=e(3721),kA=(e(92194),e(81292));class yA extends Error{errors;constructor(A){super(),this.errors=A}}var FA=e(57393),DA=e(60725);let YA=class{constructor(){}async fromText(A,n,e,t){let a="140px",o="160px";return A&&(n=`<span class='svg-title'>${A}</span><br /><br /><span class='svg-text'>${n}</span>`),n.length>50&&n.length<=100&&(a="110px",o="130px"),n.length>100&&n.length<=175&&(a="90px",o="110px"),n.length>175&&(a="75px",o="95px"),`<svg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg' version='1.1'>\n            <style>\n                * {\n                    --lh: ${o};\n                    height:100%;\n                    margin: 0;\n                    padding: 0;\n                    box-sizing: border-box;\n                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n                }\n\n\n                @keyframes gradient {\n                    0% {\n                        background-position: 0% 50%;\n                    }\n                    25% {\n                        background-position: 50%% 50%;\n                    }\n                    50% {\n                        background-position: 100% 50%;\n                    }\n                    75% {\n                        background-position: 50% 50%;\n                    }\n                    100% {\n                        background-position: 0% 50%;\n                    }\n                }\n\n\n                .svg-h1 {\n\n                    border: 25px solid rgb(78,130,177);\n                    \n                    background: rgb(241,241,241);\n                    background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);\n                    background-size: 400% 400%;\n                    animation: gradient 15s ease infinite;\n\n                    text-align: center;\n                    font-size: ${a};\n                    padding: 70px;            \n                    line-height: var(--lh);\n                    height: 1200px;\n                    width: 1200px;  \n                    -webkit-mask-image: linear-gradient(180deg, rgb(0,0,0) 60%, transparent);        \n                }\n\n                .svg-title {\n                    font-weight: 700;\n                    font-size: 1.25em;\n                }\n\n                .svg-text {\n                    width: 100%;\n                    font-weight: 500;\n                }\n\n                ${t||""}\n\n                ${e||""}\n\n            </style>\n            <g>\n                <foreignObject x='0' y='0' width='1200' height='1200'>\n                    <h1 class="svg-h1" xmlns='http://www.w3.org/1999/xhtml'>${n}</h1>\n                </foreignObject>\n            </g>\n        </svg>`}};YA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[])],YA);var MA=e(86492),UA=e.n(MA),GA=e(44586);let zA=class{themeRepository;walletService;db;constructor(A,n){this.themeRepository=A,this.walletService=n}async get(A){return this.themeRepository.get(A)}async getLatestRevision(A){return this.themeRepository.getLatestRevision(A)}async put(A){A._id?A.lastUpdated=(new Date).toJSON():(A._id=(0,GA.Z)(),A.dateCreated=(new Date).toJSON());let n=await(0,FA.GuS)(A,{forbidUnknownValues:!0,whitelist:!0});if(n.length>0)throw new yA(n);await this.themeRepository.put(A)}async delete(A){return this.themeRepository.delete(A)}async listByChannel(A,n,e){return this.themeRepository.listByChannel(A,n,e)}};zA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){return function(e,t){n(e,t,A)}}(1,(0,r.f)(t.WalletService)),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[$,Object])],zA);var jA=e(42555),NA=e.n(jA);const JA=e(30496);let RA=class{imageRepository;svgService;quillService;themeService;db;constructor(A,n,e,t){this.imageRepository=A,this.svgService=n,this.quillService=e,this.themeService=t}async load(A){this.db=await this.imageRepository.load(A)}async get(A){return this.imageRepository.get(A)}async put(A){A._id||(A._id=A.cid,A.dateCreated=(new Date).toJSON());let n=await(0,FA.GuS)(A,{forbidUnknownValues:!0,whitelist:!0});if(n.length>0)throw new yA(n);await this.imageRepository.put(A)}async delete(A){await this.imageRepository.delete(A)}async newFromBuffer(A){const n=new G;return n.buffer=A,n.cid=await DA.of(A),n.generated=!1,n}async newFromSvg(A){const n=new G;return n.svg=A,n.cid=await DA.of(n.svg),n.generated=!0,n}async getUrl(A){if(!A.buffer&&!A.svg)return"";if(A.buffer){let n=this.bufferToBlob(A.buffer);return this.blobToDataURL(n)}return A.svg?this.getSVGURL(A):void 0}async getSVGURL(A){return A.svg?this.svgToDataURL(A.svg):""}bufferToBlob(A){if(null!=Blob)return new Blob([A],{type:"image/jpg"})}blobToDataURL(A){let n;return new Promise(((e,t)=>{const a=new FileReader;a.onload=async function(){n=a.result,e(n)},a.readAsDataURL(A)}))}svgToDataURL(A){return NA()(A)}async newFromItem(A){let n=await this.quillService.translateContentEncodeHtml(A.content),e=[];if(A.themes)for(let n of A.themes)e.push(await this.themeService.get(n));let t="";if(e?.length>0)for(let A of e?.map((A=>A?.coverImageCSS)))A?.length>0&&(t+=A);let a=this.getExcerptByFirstParagraph(n,{pruneLength:500});if(!a||0==a.length)throw new Error("No text");const o=new G;return o.svg=await this.svgService.fromText(A.title,a,A.coverImageCSS,t),o.cid=await DA.of(o.svg),o.generated=!0,o}getExcerptByFirstParagraph(A,n){A=UA().unescape(A);const e="number"==typeof n.pruneLength?n.pruneLength:140;return e>0&&(A=JA(A,e,{ellipsis:""})),UA().encode(A,{allowUnsafeSymbols:!0})}async getByIds(A){return this.imageRepository.getByIds(A)}async getImageContent(A){let n;return A.buffer?n=A.buffer?.data?A.buffer?.data:A.buffer:A.svg&&(n=A.svg),n}async loadImage(A,n){return new Promise((function(e,t){A.onload=function(){e()},A.src=URL.createObjectURL(new Blob([n],{type:"image/jpg"}))}))}async phlipImage(A){const n=document.createElement("canvas");n.width=A.naturalWidth,n.height=A.naturalHeight;const e=n.getContext("2d");e.scale(-1,1),e.drawImage(A,-n.width,0);const t=e.getImageData(0,0,n.width,n.height),a=new Uint8Array(t.data.length);for(let A=0;A<t.data.length;A++)a[A]=t.data[A];return a}};RA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[z,YA,wA,zA])],RA);var HA=e(37086);kA.Z;let SA=class{imageService;uiService;activeEditor;initialized=!1;constructor(A,n){this.imageService=A,this.uiService=n}init(){if(this.initialized)return;QA().register("modules/imageDropAndPaste",xA.Z),QA().register("modules/blotFormatter",IA.ZP),QA().debug(!1);let A=QA().import("blots/inline");class n extends A{static blotName;static tagName}n.blotName="bold",n.tagName="strong";class e extends A{static blotName;static tagName}e.blotName="italic",e.tagName="em";let t=QA().import("blots/block");class a extends t{static blotName;static tagName}a.blotName="blockquote",a.tagName="blockquote";class o extends t{static blotName;static tagName;static formats(A){return o.tagName.indexOf(A.tagName)+1}}o.blotName="header",o.tagName=["H1","H2"];let r=QA().import("blots/block/embed");class i extends r{static blotName;static tagName}i.blotName="divider",i.tagName="hr";class l extends r{static blotName;static tagName;static create(A){let n=super.create();return n.setAttribute("src",A.src),n.setAttribute("data-cid",A.cid),A.width&&n.setAttribute("width",A.width),A.height&&n.setAttribute("height",A.height),A.style&&n.setAttribute("style",A.style),n}static value(A){return{src:A.getAttribute("src"),cid:A.getAttribute("data-cid"),width:A.getAttribute("width"),height:A.getAttribute("height"),style:A.getAttribute("style")}}}l.blotName="ipfsimage",l.tagName="img",QA().register(l),QA().register(a),QA().register(n),QA().register(e),this.initialized=!0}buildQuillPostEditor(A,n){return this.init(),this.activeEditor=new(QA())(A,{bounds:".page-content",modules:{imageDropAndPaste:{handler:(A,n,e)=>{this.imageDropAndPasteHandler(A,n,e)}},toolbar:n,blotFormatter:{specs:[TA],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}},handlers:{link:A=>{if(A){var n=prompt("Enter the URL");this.quill.format("link",n)}else this.quill.format("link",!1)}},theme:"snow"}),this.activeEditor}imageClick(){}async imageSelected(A){this.uiService.showSpinner("Processing image..."),this.insertImage(A.files[0]),this.uiService.hideSpinner()}async insertImage(A){let n=await this.insertImageInEditor(A,this.activeEditor);const e=new CustomEvent("image-selected",{detail:{_id:n._id}});document.dispatchEvent(e)}async insertImageInEditor(A,n){let e=await(0,HA.readAndCompressImage)(A,{maxWidth:1024}),t=await e.arrayBuffer(),a=await this.imageService.newFromBuffer(new Uint8Array(t));try{await this.imageService.put(a)}catch(A){console.log(A)}let o=await this.imageService.getUrl(a),r=await this.getHeightAndWidthFromDataUrl(o),i=n.getSelection(!0);return n.insertText(i.index,"\n",QA().sources.USER),n.insertEmbed(i.index,"ipfsimage",{cid:a.cid,src:o,height:r.height,width:r.width},QA().sources.USER),n.setSelection(i.index+2,QA().sources.SILENT),a}async imageDropAndPasteHandler(A,n,e){const t=e.toFile();await this.insertImage(t)}async getHeightAndWidthFromDataUrl(A){return new Promise((n=>{const e=new Image;e.onload=()=>{n({height:e.height,width:e.width})},e.src=A}))}};SA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[RA,i])],SA);class WA extends IA.sL{keyUpListener;onCreate(){const A=this;this.keyUpListener=function(n){A.onKeyUp(n)},document.addEventListener("keyup",A.keyUpListener,!0),this.formatter.quill.root.addEventListener("input",A.keyUpListener,!0)}onDestroy(){document.removeEventListener("keyup",this.keyUpListener),this.formatter.quill.root.removeEventListener("input",this.keyUpListener)}onKeyUp(A){if(this.formatter.currentSpec&&(46===A.keyCode||8===A.keyCode)){const A=QA().find(this.formatter.currentSpec.getTargetElement());A&&A.deleteAt(0),this.formatter.hide()}}}class TA extends IA.N6{getActions(){return[IA.oi,IA.Ce,WA]}}var XA=e(48764);let qA=class{constructor(){}async uploadFile(A){let n;return new Promise(((e,t)=>{const a=new FileReader;a.onload=async function(){n=new XA.Buffer(a.result),n&&e(n)},A.files.length>0?a.readAsArrayBuffer(A.files[0]):e(n)}))}};qA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[])],qA);let PA=class{authorRepository;walletService;db;constructor(A,n){this.authorRepository=A,this.walletService=n}async get(A){return this.authorRepository.get(A)}async put(A){A._id?A.lastUpdated=(new Date).toJSON():(A._id=A.walletAddress,A.dateCreated=(new Date).toJSON());let n=await(0,FA.GuS)(A,{forbidUnknownValues:!0,whitelist:!0});if(n.length>0)throw new yA(n);await this.authorRepository.put(A)}async insertIfNew(A){let n;try{n=await this.get(A)}catch(A){}n||await this.put(Object.assign(new w,{_id:A,walletAddress:A}))}getDisplayName(A){if(A)return A.name?A.name:this.walletService.truncateEthAddress(A._id)}};PA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){return function(e,t){n(e,t,A)}}(1,(0,r.f)(t.WalletService)),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[u,Object])],PA);let VA=class{queryCacheRepository;constructor(A){this.queryCacheRepository=A}async put(A){A||((A=new oA).dateCreated=(new Date).toJSON()),A.lastUpdated=(new Date).toJSON(),await this.queryCacheRepository.put(A)}async get(A){return this.queryCacheRepository.get(A)}async delete(A){console.log(A),await this.queryCacheRepository.delete(A)}};VA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[rA])],VA);let KA=class{itemRepository;imageService;queryCacheService;constructor(A,n,e){this.itemRepository=A,this.imageService=n,this.queryCacheService=e}async get(A){return this.itemRepository.get(A)}async getLatestRevision(A){return this.itemRepository.getLatestRevision(A)}async getByTokenId(A,n){return this.itemRepository.getByTokenId(A,n)}async put(A){A._id?A.lastUpdated=(new Date).toJSON():(A._id=(0,GA.Z)(),A.dateCreated=(new Date).toJSON(),null==A.tokenId&&(A.tokenId=await this.getNextTokenId(A.channelId)));let n=await(0,FA.GuS)(A,{forbidUnknownValues:!0,whitelist:!0});if(n.length>0)throw console.log(n),new yA(n);await this.itemRepository.put(A)}async delete(A){await this.itemRepository.delete(A)}async getByImageId(A){return this.itemRepository.getByImageId(A)}async getByAnimationId(A){return this.itemRepository.getByAnimationId(A)}async listByChannel(A,n,e){return this.itemRepository.listByChannel(A,n,e)}async exportNFTMetadata(A,n,e,t,a){if("existing"==A.forkType)return console.log(`Exporting original metadata for token #${n.tokenId}`),n.originalJSONMetadata;let o={tokenId:n.tokenId,name:n.title,description:n.description};if(n.animationId&&!n.coverImageAsAnimation){if(!t)throw new Error("Error exporting NFT metadata. Animation directory not found.");o.animation_url=`ipfs://${t}/${n.animationId}.html`}if(n.coverImageId){if(!a)throw new Error("Error exporting NFT metadata. Image directory not found.");o.image=`ipfs://${a}/${e.cid}.${e.buffer?"jpg":"svg"}`}return A.attributeOptions.length>0&&(o.attributes=A.attributeOptions.map((A=>{let e=n?.attributeSelections?.filter((n=>A.traitType==n.traitType));return{trait_type:A.traitType,value:e?.length>0?e[0].value:""}}))),o}async setDefaultCoverImage(A){let n=await this.imageService.newFromItem(A),e=await this.get(n.cid);e?A.coverImageId=e._id:(await this.imageService.put(n),A.coverImageId=n._id)}async getNextTokenId(A){let n=(await this.queryCacheService.get(`token_id_stats_by_channel_${A}`))?.result;return n?.max?n.max+1:1}async getAttributeCountByChannel(A){return this.itemRepository.getAttributeCountByChannel(A)}async getAttributeInfoBySelections(A,n){return this.itemRepository.getAttributeInfoBySelections(A,n)}};KA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[H,RA,VA])],KA);var ZA=e(78648);let LA=class{settingsRepository;constructor(A){this.settingsRepository=A}async get(){return await this.settingsRepository.get()||{_id:"single",defaultGitProvider:"github",gitProviders:{gitlab:{name:"gitlab"},github:{name:"github"}}}}async put(A){A._id?A.lastUpdated=(new Date).toJSON():(A._id="single",A.dateCreated=(new Date).toJSON());let n=await(0,FA.GuS)(A,{forbidUnknownValues:!0,whitelist:!0});if(n.length>0)throw new yA(n);await this.settingsRepository.put(A)}};LA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[Y])],LA);var OA=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r},$A=function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)},_A=function(A,n){return function(e,t){n(e,t,A)}};let An=class{ipfsInit;ipfsRemoteInit;settingsService;peerCount=0;addresses;ipfs;initializing=!1;constructor(A,n){this.ipfsInit=A,this.ipfsRemoteInit=n}async init(){if(this.ipfs||this.initializing)return;let A;this.initializing=!0,console.log("Init IPFS");try{A=await this.settingsService.get()}catch(A){}this.ipfs=A?.ipfsHost?await this.ipfsRemoteInit(A?.ipfsHost):await this.ipfsInit(),this.initializing=!1,console.log("Init IPFS complete")}async clearInit(){delete this.ipfs,this.initializing=!1}async updateInfo(){let A=await this.ipfs.id(),n=await this.ipfs.swarm.peers();this.peerCount=n.length,this.addresses=A?.addresses?.map((A=>A.toString()));const e=new CustomEvent("update-peers",{detail:{addresses:this.addresses,peers:n.map((A=>A.addr.toString())),count:this.peerCount}});document.dispatchEvent(e),console.log(`IPFS has ${this.peerCount} peers.`)}};OA([(0,r.f)(LA),$A("design:type",LA)],An.prototype,"settingsService",void 0),An=OA([(0,o.b)(),_A(0,(0,r.f)("ipfsInit")),_A(1,(0,r.f)("ipfsRemoteInit")),$A("design:paramtypes",[Object,Object])],An);let nn=class{pinningApiRepository;ipfsService;constructor(A,n){this.pinningApiRepository=A,this.ipfsService=n}async get(A){return this.pinningApiRepository.get(A)}async getPinata(){let A=await this.pinningApiRepository.list(1,0);if(A?.length>0)return Object.assign(new T,A[0])}async put(A){A._id?A.lastUpdated=(new Date).toJSON():(A._id=(0,GA.Z)(),A.dateCreated=(new Date).toJSON());let n=await(0,FA.GuS)(A,{forbidUnknownValues:!0,whitelist:!0});if(n.length>0)throw new yA(n);await this.pinningApiRepository.put(A)}async list(A,n){return this.pinningApiRepository.list(A,n)}async pinByHash(A,n){let e={cid:n.localCid,name:n.title};return(await ZA.Z.post(A.url,e,{headers:{Accept:"*/*",Authorization:`Bearer ${A.jwt}`,"Content-Type":"application/json"}})).data}async userPinnedDataTotal(A){let n=`${A.url}/data/userPinnedDataTotal`;return(await ZA.Z.get(n,{headers:{pinata_api_key:A.apiKey,pinata_secret_api_key:A.secretApiKey}})).data}async getJobStatus(A,n,e){let t=`${A.url}/pinning/pinJobs?ipfs_pin_hash=${n}`,a=(await ZA.Z.get(t,{headers:{pinata_api_key:A.apiKey,pinata_secret_api_key:A.secretApiKey}})).data.rows.filter((A=>A.id==e));return a?.length>0?a[0]:{status:"complete"}}async validateAccount(A){await this.userPinnedDataTotal(A)}async delete(A){await this.pinningApiRepository.delete(A)}};nn=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[X,An])],nn);let en=class{attributeCountRepository;db;constructor(A){this.attributeCountRepository=A}async get(A){return this.attributeCountRepository.get(A)}async put(A){A._id?A.lastUpdated=(new Date).toJSON():(A._id=`${A.channelId}-${A.traitType}-${A.value}`,A.dateCreated=(new Date).toJSON());let n=await(0,FA.GuS)(A,{forbidUnknownValues:!0,whitelist:!0});if(n.length>0)throw new yA(n);await this.attributeCountRepository.put(A)}};en=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[cA])],en);let tn=class{channelRepository;imageService;itemService;pinningService;quillService;schemaService;queryCacheService;attributeCountService;constructor(A,n,e,t,a,o,r,i){this.channelRepository=A,this.imageService=n,this.itemService=e,this.pinningService=t,this.quillService=a,this.schemaService=o,this.queryCacheService=r,this.attributeCountService=i}async get(A){return this.channelRepository.get(A)}async getLatestRevision(A){return this.channelRepository.getLatestRevision(A)}async put(A){A._id?A.lastUpdated=(new Date).toJSON():(A._id=(0,GA.Z)(),A.dateCreated=(new Date).toJSON()),A.description&&(A.descriptionHTML=await this.quillService.translateContent(A.description),A.descriptionMarkdown=await this.quillService.generateMarkdown(A.description)),A.license&&(A.licenseHTML=await this.quillService.translateContent(A.license),A.licenseMarkdown=await this.quillService.generateMarkdown(A.license));let n=await(0,FA.GuS)(A,{forbidUnknownValues:!0,whitelist:!0});if(n.length>0)throw new yA(n);await this.channelRepository.put(A)}async list(A,n){return this.channelRepository.list(A,n)}async delete(A){await this.schemaService.dropChannel(A._id),await this.channelRepository.delete(A)}async countItemsByChannel(A){let n;try{n=await this.queryCacheService.get(`token_id_stats_by_channel_${A}`)}catch(A){}let e=n?.result;return e?.count?e.count:0}async exportContractMetadata(A,n,e){let t={name:A.title,description:A.descriptionMarkdown,external_link:A.link,seller_fee_basis_points:0,fee_recipient:n,license:A.license};if(A.coverImageId){let n=await this.imageService.get(A.coverImageId);t.image=`ipfs://${e}/${n.cid}.${n.buffer?"jpg":"svg"}`}return t}async pin(A,n){let e=await this.pinningService.pinByHash(A,n);if(!e.ipfsHash)throw new Error("Problem publishing");(n=await this.get(n._id)).pinJobId=e.id,n.pinJobStatus=e.status,n.publishedCid=e.ipfsHash,await this.put(n)}async buildAttributeCounts(A){let n=await this.itemService.getAttributeCountByChannel(A);for(let e of n){let n,t=`${A}-${e.traitType}-${e.value}`;try{n=await this.attributeCountService.get(t)}catch(A){}n||(n=new sA),await this.attributeCountService.put(Object.assign(n,e))}}async getGitProviderCredentials(A,n){return A.gitProvider&&"default"!=A.gitProvider?n.gitProviders[A.gitProvider]:n.defaultGitProvider?n.gitProviders[n.defaultGitProvider]:n.gitProviders.github}};tn=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[k,RA,KA,nn,wA,dA,VA,en])],tn);var an=e(37098),on=e(50387),rn=function(A,n){return function(e,t){n(e,t,A)}};let ln=class{contracts;getProvider;$f7;wallet;address;ethersContracts={};provider;constructor(A,n,e){this.contracts=A,this.getProvider=n,this.$f7=e}async initProvider(){this.provider=this.getProvider(),globalThis.ethereum?.on("accountsChanged",(async A=>{delete this.address,A?.length>0&&await this.initWallet(),this.$f7.views.main.router.refreshPage()}))}async initWallet(){if(console.log("Init wallet"),delete this.address,this.provider||await this.initProvider(),(await this.provider.send("eth_accounts",[]))?.length>0)return this.connect();console.log("Init wallet complete")}async connect(){console.log("Connect wallet"),await this.provider.send("eth_requestAccounts",[]),this.wallet=await this.provider.getSigner(),this.address=await this.getAddress(),console.log(`Wallet ${this.address} connected`)}async getAddress(){if(!this.provider)return;let A=await this.provider.send("eth_accounts",[]);return A?.length>0?A[0]:void 0}async getWallet(){return this.provider.getSigner()}getContract(A){if(this.ethersContracts[A]&&this.ethersContracts[A].signer==this.wallet)return this.ethersContracts[A];let n=this.contracts[A];return this.ethersContracts[A]=new on.CH(n.address,n.abi,this.wallet?this.wallet:this.provider),this.ethersContracts[A]}truncateEthAddress(A){const n=A.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);return n?`${n[1]}…${n[2]}`:A}};ln=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),rn(0,(0,r.f)("contracts")),rn(1,(0,r.f)("provider")),rn(2,(0,r.f)("framework7")),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[Array,Function,Object])],ln);var sn=e(30381),cn=e.n(sn),dn=e(86094),fn=e.n(dn);const{forEach:gn}=Array.prototype;let Cn=class{animationRepository;quillService;imageService;themeService;db;constructor(A,n,e,t){this.animationRepository=A,this.quillService=n,this.imageService=e,this.themeService=t}async get(A){return this.animationRepository.get(A)}async put(A){A._id||(A._id=A.cid,A.dateCreated=(new Date).toJSON());let n=await(0,FA.GuS)(A,{forbidUnknownValues:!0,whitelist:!0});if(n.length>0)throw new yA(n);await this.animationRepository.put(A)}async delete(A){await this.animationRepository.delete(A)}async newFromText(A){const n=new C;return n.content=A,n.cid=await DA.of(n.content),n}async buildAnimationPage(A){let n,e=await this.quillService.translateContent(A.content),t=[];if(A.themes)for(let n of A.themes)t.push(await this.themeService.get(n));let a="";if(t?.length>0)for(let A of t)A.animationCSS?.length>0&&(a+=A.animationCSS);if(A.coverImageAsAnimation){let e=await this.imageService.get(A.coverImageId),t=await this.imageService.getUrl(e);n=this.getFullImageTemplate(t,A.animationCSS,a)}else n=this.getAnimationTemplate(A,e,A.animationCSS,a);return fn()(n)}getFullImageTemplate(A,n,e){return`<!DOCTYPE html>\n    <html>\n      <head>\n        <style>\n        \n          body { \n            height: 100%; \n            width: 100%;\n            margin: 0;\n            padding: 0;\n\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            overflow: hidden\n          }\n\n          img {\n            flex-shrink: 0;\n            min-width: 100%;\n            width: 100%;\n            height: 100%;\n            min-height: 100%\n            object-fit: cover;\n          }\n\n          ${e||""}\n          ${n||""}\n\n        </style>\n      </head>\n\n      <body>\n        <img src="${A}" />\n      </body>\n    </html>`}getAnimationTemplate(A,n,e,t){return`<!DOCTYPE html>\n        <html>\n        \n          <head>\n              <meta charset="utf-8">\n              <title>${A.title}</title>\n\n              <style>\n\n                html {\n                    height:100%;\n                } \n\n                body {\n                      padding: 0;\n                      margin: 0;\n                      box-sizing: border-box;\n                      height: 100%;\n                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n                }\n\n                .animation-container {\n                  box-sizing: border-box;\n                  padding: 20px;\n                  width:100%;\n                  min-height: 100%;\n                  \n                  background: rgb(241,241,241);\n                  background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);\n\n                  font-size: 20px;\n                  border: 5px solid #4e82b1;\n                  float: left;\n                }\n\n                img { \n                  max-width: 100%;\n                  border: 1px solid #cccccc;\n                  object-fit: cover;\n                }\n\n                .token-id {\n                  color: rgb(79, 79, 79);\n                  font-weight: bold;\n                }\n\n                h4 { \n                  margin-top: 0px; \n                  font-size: 25px;\n                  margin-bottom: 0px;\n                }\n\n                ${t||""}\n                ${e||""}\n\n\n              </style>\n\n          </head>\n\n          <body>\n\n            <div class="animation-container">\n              <h4><b>${A.title?A.title:""} <span class="token-id">#${A.tokenId}</span></b></h4>\n              ${n}\n            </div>\n\n          </body>\n        </html>`}async getByIds(A){return this.animationRepository.getByIds(A)}};Cn=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[h,wA,RA,zA])],Cn);let pn=class{staticPageRepository;quillService;db;constructor(A,n){this.staticPageRepository=A,this.quillService=n}async get(A){return this.staticPageRepository.get(A)}async getLatestRevision(A){return this.staticPageRepository.getLatestRevision(A)}async put(A){A._id?A.lastUpdated=(new Date).toJSON():(A._id=(0,GA.Z)(),A.dateCreated=(new Date).toJSON()),A.content&&(A.contentHTML=await this.quillService.translateContent(A.content),A.contentMarkdown=await this.quillService.generateMarkdown(A.content)),A.name&&(A.slug=this.slugify(A.name));let n=await(0,FA.GuS)(A,{forbidUnknownValues:!0,whitelist:!0});if(n.length>0)throw new yA(n);await this.staticPageRepository.put(A)}async delete(A){return this.staticPageRepository.delete(A)}async listByChannel(A,n,e){return this.staticPageRepository.listByChannel(A,n,e)}slugify(A){return A.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-")}};pn=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[K,wA])],pn);let Bn=class{itemService;authorService;themeService;imageService;animationService;staticPageService;constructor(A,n,e,t,a,o){this.itemService=A,this.authorService=n,this.themeService=e,this.imageService=t,this.animationService=a,this.staticPageService=o}async prepareExport(A,n){let e,t=JSON.parse(JSON.stringify(A)),a=JSON.parse(JSON.stringify(await this.itemService.listByChannel(A._id,1e5,0)));try{e=await this.authorService.get(A.authorId)}catch(A){}e&&(e=JSON.parse(JSON.stringify(e)));let o=JSON.parse(JSON.stringify(await this.themeService.listByChannel(A._id,1e3,0))),r=JSON.parse(JSON.stringify(await this.staticPageService.listByChannel(A._id,1e3,0)));delete t.contractAddress,delete t.localCid,delete t.localPubDate,delete t.pinJobId,delete t.pinJobStatus,delete t.publishedCid,delete t.pubDate,delete t.publishReaderRepoId,delete t.publishReaderRepoPath,delete t.publishReaderRepoStatus,delete t.importSuccess,delete t.lastUpdated,delete t._rev,delete t._rev_tree,e&&(delete e._rev,delete e.lastUpdated,delete e._rev_tree);let i=[],l=[];t.coverImageId?.length>0&&i.push(t.coverImageId),t.coverBannerId?.length>0&&i.push(t.coverBannerId),e?.coverPhotoId?.length>0&&i.push(e.coverPhotoId);for(let A of a)A.animationId&&!A.coverImageAsAnimation&&l.push(A.animationId),i.push(...this.getImageCidsByItem(A)),delete A._rev,delete A.lastUpdated,delete A._rev_tree;i=[...new Set(i)],l=[...new Set(l)];let s=await this.imageService.getByIds(i),c=await this.animationService.getByIds(l);for(let A of o)delete A._rev,delete A._rev_tree;for(let A of r)delete A._rev,delete A._rev_tree;return{animations:c,images:s,channel:t,items:a,author:e,themes:o,staticPages:r,ownerAddress:n}}async createBackup(A){let n=JSON.parse(JSON.stringify(A.channel)),e=A.items,t=A.author,a=A.themes,o=A.staticPages;"existing"==n.forkType&&(delete n.forkType,delete n.forkedFromCid,delete n.forkedFromFeeRecipient,delete n.forkedFromId);for(let A of e){let n=e.filter((n=>n.tokenId==parseInt(A.tokenId.toString())-1)),t=e.filter((n=>n.tokenId==parseInt(A.tokenId.toString())+1));if(A.previous=n?.length>0?{_id:n[0]._id,tokenId:n[0].tokenId}:void 0,A.next=t?.length>0?{_id:t[0]._id,tokenId:t[0].tokenId}:void 0,A.content?.ops?.length>0){let n=[];for(let e of A.content.ops)e.insert&&e.insert.ipfsimage&&delete e.insert.ipfsimage.src,n.push(e);A.content.ops=n}}let r=[],i=[];for(let n of A.images){let A=JSON.parse(JSON.stringify(n));delete A._rev,delete A._rev_tree,delete A.buffer,delete A.svg,r.push(A)}for(let n of A.animations){let A=JSON.parse(JSON.stringify(n));delete A._rev,delete A._rev_tree,delete A.content,i.push(A)}let l=[];return t&&l.push(t),n.itemCount=e?.length,{channels:[n],authors:l,items:e,themes:a,staticPages:o,images:r,animations:i}}getImageCidsByItem(A){let n=[];if(A.coverImageId?.length>0&&n.push(A.coverImageId),A.content?.ops)for(let e of A.content.ops)e.insert&&e.insert.ipfsimage&&e.insert.ipfsimage?.cid?.length>0&&n.push(e.insert.ipfsimage.cid);return n}};Bn=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[KA,PA,zA,RA,Cn,pn])],Bn);var bn,hn=e(80246),mn=e(26015);let En=bn=class{settingsService;static BASE_URL="https://gitlab.com/api/v4";static READER_REPO_ID=15461980;constructor(A){this.settingsService=A}async createFork(A){console.log("Creating reader fork...");let n=(await this.settingsService.get()).gitProviders.gitlab;if(n.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let e=`${bn.BASE_URL}/projects/${bn.READER_REPO_ID}/fork`,t=`${A.title} Reader`.replace(/[^a-z0-9]/gi,"-").toLowerCase(),a=await this.getExistingFork(A);return a?{id:a.id,path:a.path}:{id:(await ZA.Z.post(e,{name:t,path:t},{headers:{Authorization:`Bearer ${n.personalAccessToken}`}})).data.id,path:t}}async getExistingFork(A){let n=(await this.settingsService.get()).gitProviders.gitlab;if(n.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let e=`${bn.BASE_URL}/projects/${bn.READER_REPO_ID}/forks`,t=(await ZA.Z.get(e,{headers:{Authorization:`Bearer ${n.personalAccessToken}`}})).data,a=`${A.title} Reader`.replace(/[^a-z0-9]/gi,"-").toLowerCase(),o=t.filter((A=>A.path==a&&A.owner.username==n.username));if(1==o?.length)return{id:o[0].id,httpUrlToRepo:o[0].http_url_to_repo,path:o[0].path,defaultBranch:o[0].default_branch}}async getForkRepoStatus(A){let n=(await this.settingsService.get()).gitProviders.gitlab;if(n.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let e=`${bn.BASE_URL}/projects/${A.publishReaderRepoId}`;return(await ZA.Z.get(e,{headers:{Authorization:`Bearer ${n.personalAccessToken}`}})).data.import_status}};En=bn=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[LA])],En);var wn;let un=wn=class{settingsService;static BASE_URL="https://api.github.com";static READER_REPO_OWNER="LargeNFT";static READER_REPO="large-reader";constructor(A){this.settingsService=A}async createFork(A){let n=await this.getExistingFork(A);if(n)return{id:n.id,path:n.path};console.log("Creating reader fork...");let e=(await this.settingsService.get()).gitProviders.github;if(e.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let t=`${wn.BASE_URL}/repos/${wn.READER_REPO_OWNER}/${wn.READER_REPO}/forks`,a=`${A.title} Reader`.replace(/[^a-z0-9]/gi,"-").toLowerCase();return{id:(await ZA.Z.post(t,{name:a,default_branch_only:!0},{headers:{Authorization:`Bearer ${e.personalAccessToken}`}})).data.id,path:a}}async getExistingFork(A){let n=(await this.settingsService.get()).gitProviders.github;if(n.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let e=`${wn.BASE_URL}/repos/${wn.READER_REPO_OWNER}/${wn.READER_REPO}/forks`,t=(await ZA.Z.get(e,{headers:{Authorization:`Bearer ${n.personalAccessToken}`}})).data,a=`${A.title} Reader`.replace(/[^a-z0-9]/gi,"-").toLowerCase(),o=t.filter((A=>A.name==a&&A.owner.login==n.username));if(1==o?.length)return{id:o[0].id,httpUrlToRepo:`${o[0].html_url}.git`,path:o[0].name,defaultBranch:o[0].default_branch}}async getForkRepoStatus(A){if((await this.settingsService.get()).gitProviders.github.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");return await this.getExistingFork(A)?"finished":"pending"}};un=wn=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[LA])],un);var vn=e(48764).Buffer,Qn=function(A,n){return function(e,t){n(e,t,A)}};let xn=class{getFS;git;settingsService;channelService;authorService;gitlabService;githubService;fs;repoURI;defaultBranch;constructor(A,n,e,t,a,o,r){this.getFS=A,this.git=n,this.settingsService=e,this.channelService=t,this.authorService=a,this.gitlabService=o,this.githubService=r}async initFS(A){this.fs=await this.getFS();let n=this.getBaseDir(A);await this._dirExists(n)||await this._createDirectoryStructure(n)}async init(A){this.logPublishReaderProgress(`Initializing git for channel ${A._id}`);let n=await this.channelService.getGitProviderCredentials(A,await this.settingsService.get());this.fs||await this.initFS(A);let e,t=this.fs,a=await this.getExistingFork(A),o=this.getBaseDir(A);await this._dirExists(o)||await this._createDirectoryStructure(o);try{e=await this.git.currentBranch({fs:t,dir:o,fullname:!1})}catch(A){}let r=await this.settingsService.get();e?this.logPublishReaderProgress(await this.git.pull({fs:t,http:hn.Z,dir:o,ref:a.defaultBranch,singleBranch:!0,corsProxy:r.gitCorsProxy})):(this.logPublishReaderProgress(`Git clone: ${a.httpUrlToRepo} to ${o}`),this.logPublishReaderProgress(await this.git.clone({fs:t,http:hn.Z,dir:o,corsProxy:r.gitCorsProxy,url:a.httpUrlToRepo,ref:a.defaultBranch,singleBranch:!0})),this.logPublishReaderProgress(await this.git.setConfig({fs:t,dir:o,path:"user.name",value:n.username})))}getBaseDir(A){return`/repos-${A._id}`}async writeFile(A,n){console.log(`Saving file to git repo: ${A}`),await this.fs.promises.writeFile(A,n)}async removeFile(A){try{console.log(`Removing file from git repo: ${A}`);let n=this.fs,e=A.substring(0,A.lastIndexOf("/")),t=A.substring(0,A.indexOf("/",1)+1)+".git",a=A.substring(A.lastIndexOf("/")+1,A.length);await this.fs.promises.unlink(A),await this.git.remove({fs:n,dir:e,gitdir:t,filepath:a})}catch(A){}}async gitAddAll(A){this.logPublishReaderProgress("Git add...");let n=this.fs,e=this.getBaseDir(A);return this.git.add({fs:n,dir:e,filepath:"."})}async gitCommit(A){let n=this.fs,e=this.getBaseDir(A);return this.logPublishReaderProgress("Git commit"),this.git.commit({fs:n,dir:e,message:`Channel "${A.title}" published`})}async gitPush(A,n,e){let t=await this.settingsService.get();this.logPublishReaderProgress("Git push...");let a=this.fs,o=this.getBaseDir(A);return this.git.push({fs:a,http:hn.Z,dir:o,remote:"origin",ref:this.defaultBranch,corsProxy:t.gitCorsProxy,onAuth:()=>({username:n,password:e})})}async _dirExists(A){let n=!1;try{await this.fs.promises.readdir(A),n=!0}catch(A){}return n}async _createDirectoryStructure(A){this.fs.promises.mkdir(`${A}`),this.fs.promises.mkdir(`${A}/backup`),this.fs.promises.mkdir(`${A}/backup/contract`),this.fs.promises.mkdir(`${A}/backup/export`),this.fs.promises.mkdir(`${A}/backup/export/backup`),this.fs.promises.mkdir(`${A}/backup/export/images`),this.fs.promises.mkdir(`${A}/backup/export/metadata`),this.fs.promises.mkdir(`${A}/backup/export/animations`)}async clearGitRepos(){this.fs=await this.getFS(),await this.fs.init("large-fs",{wipe:!0})}logPublishReaderProgress(A){if(console.log(A),"undefined"!=typeof window&&void 0!==window.document){const n=new CustomEvent("publish-reader-progress",{detail:{message:A}});document.dispatchEvent(n)}}async deployReaderGit(A,n){let e=await this.channelService.getGitProviderCredentials(A,await this.settingsService.get());if(e.personalAccessToken.length<1)throw new Error(`${e.name} personal access token not set`);await this.init(A),this.logPublishReaderProgress("Copying files from IPFS to git repo...");let t=this.getBaseDir(A);A.contractAddress?(await this.writeFile(`${t}/backup/contract/contract.json`,vn.from(JSON.stringify({contractAddress:A.contractAddress,ipfsCid:A.localCid}))),await this.writeFile(`${t}/backup/contract/contract-abi.json`,vn.from(JSON.stringify(mn))),await this.writeFile(`${t}/backup/export/contractMetadata.json`,n)):(await this.writeFile(`${t}/backup/contract/contract.json`,vn.from(JSON.stringify({}))),await this.writeFile(`${t}/backup/contract/contract-abi.json`,vn.from(JSON.stringify({}))),await this.writeFile(`${t}/backup/export/contractMetadata.json`,vn.from(JSON.stringify({})))),await this.gitAddAll(A),await this.gitCommit(A),await this.gitPush(A,e.username,e.personalAccessToken),this.logPublishReaderProgress("Publish complete")}async getExistingFork(A){let n=await this.settingsService.get(),e=await this.channelService.getGitProviderCredentials(A,n);if(e.personalAccessToken.length<1)throw new Error(`${e.name} personal access token not set`);switch(e.name){case"gitlab":return this.gitlabService.getExistingFork(A);case"github":return this.githubService.getExistingFork(A)}}async createFork(A){let n=await this.settingsService.get(),e=await this.channelService.getGitProviderCredentials(A,n);if(e.personalAccessToken.length<1)throw new Error(`${e.name} personal access token not set`);switch(e.name){case"gitlab":return this.gitlabService.createFork(A);case"github":return this.githubService.createFork(A)}}async getForkRepoStatus(A){let n=await this.settingsService.get(),e=await this.channelService.getGitProviderCredentials(A,n);if(e.personalAccessToken.length<1)throw new Error(`${e.name} personal access token not set`);switch(e.name){case"gitlab":return this.gitlabService.getForkRepoStatus(A);case"github":return this.githubService.getForkRepoStatus(A)}}};xn=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),Qn(0,(0,r.f)("fs")),Qn(1,(0,r.f)("git")),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[Function,Object,LA,tn,PA,En,un])],xn);const{DOMParser:In,XMLSerializer:kn}=e(3969),yn=new In;let Fn=class{itemService;channelService;imageService;authorService;animationService;quillService;themeService;queryCacheService;exportService;gitService;ipfsService;attributeCountService;constructor(A,n,e,t,a,o,r,i,l,s,c,d){this.itemService=A,this.channelService=n,this.imageService=e,this.authorService=t,this.animationService=a,this.quillService=o,this.themeService=r,this.queryCacheService=i,this.exportService=l,this.gitService=s,this.ipfsService=c,this.attributeCountService=d}async get(A){let n=await this.itemService.get(A);const e=await this.channelService.get(n.channelId);let t=(await this.queryCacheService.get(`token_id_stats_by_channel_${n.channelId}`)).result;return this.getViewModel(n,e,t)}async getNavigation(A,n){let e=await this.itemService.getByTokenId(A,n);const t=await this.channelService.get(e.channelId);return this.getNavigationViewModel(e,t)}async getViewModel(A,n,e){let t,a,o,r,i,l=[],s=!n.contractAddress;if(A.coverImageId)try{let n=await this.imageService.get(A.coverImageId);a={cid:n.cid,url:await this.imageService.getUrl(n)}}catch(A){}if(A.animationId)try{let n=await this.animationService.get(A.animationId);t={cid:n.cid,content:UA().unescape(n.content)};let e=yn.parseFromString(n.content,"text/html").getElementsByTagName("body")[0];r=UA().unescape((new kn).serializeToString(e)),r="<div"+r.slice(5),r=r.substring(0,r.length-7)+"</div>"}catch(A){}if(n.authorId&&(i=await this.authorService.get(n.authorId),i.coverPhotoId)){let A=await this.imageService.get(i.coverPhotoId);o={cid:A.cid,url:await this.imageService.getUrl(A)}}if(n.attributeOptions.length>0){for(let e of n.attributeOptions){let n=A?.attributeSelections?.filter((A=>e?.traitType==A?.traitType));l.push({id:e.id,traitType:e.traitType,values:e.values,value:n?.length>0?n[0].value:""})}for(let A of l)try{let t=await this.attributeCountService.get(`${n._id}-${A.traitType}-${A.value}`);A.categoryPercent=t?new Intl.NumberFormat("default",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(t.count/e.count):""}catch(A){}}let c=e.max==A.tokenId,d=[];if(A.themes?.length>0)try{for(let n of A.themes)d.push(await this.themeService.get(n))}catch(A){}let f=await this.getImagesFromContent(A);return 0==f.filter((A=>A.cid==a?.cid)).length&&f.push(a),{item:A,themes:d,contentHTML:await this.quillService.translateContent(A.content),animationContentHTML:r,dateDisplay:cn()(A.dateCreated).format("MMM Do YYYY"),channel:n,coverImage:a,animation:t,author:i,authorPhoto:o,authorDisplayName:this.authorService.getDisplayName(i),images:f,attributeSelections:l,editable:s,canDelete:c}}async getNavigationViewModel(A,n){let e=(await this.queryCacheService.get(`token_id_stats_by_channel_${n._id}`)).result,t=await this.getViewModel(A,n,e);return t.item.tokenId<e.max&&(t.next=t.item.tokenId+1),t.item.tokenId>e.min&&(t.previous=t.item.tokenId-1),t}async getListViewModel(A,n){let e;if(A.coverImageId)try{let n=await this.imageService.get(A.coverImageId);e={cid:n.cid,url:await this.imageService.getUrl(n)}}catch(A){}return{item:A,channel:n,coverImage:e}}async listByChannel(A,n,e){let t=[],a=await this.itemService.listByChannel(A,n,e);const o=await this.channelService.get(A);for(let A of a)t.push(await this.getListViewModel(A,o));return t}async getImagesFromContent(A){if(!A.content)return[];let n=A.content.ops;const e=[];if(n?.length>0){for(let A of n)A.insert&&A.insert.ipfsimage&&e.push({cid:A.insert.ipfsimage.cid,url:A.insert.ipfsimage.src});try{let n=await this.imageService.newFromItem(A);e.push({cid:n.cid,url:await this.imageService.getSVGURL(n),svg:n.svg,generated:!0})}catch(A){}}return e}async getNewViewModel(A){let n=await this.channelService.get(A),e=[];for(let A of n.attributeOptions)e.push({id:A.id,traitType:A.traitType,values:A.values,value:"",categoryPercent:""});return{item:{attributeSelections:[]},channel:n,attributeSelections:e,editable:!0,canDelete:!0}}async saveGeneratedCoverImage(A){let n=(await this.getImagesFromContent(A))?.filter((n=>A.coverImageId?n.cid==A.coverImageId:1==n.generated)),e=Object.assign(new G,n[0]);if(1==e.generated){delete e.url;try{await this.imageService.put(e)}catch(A){}A.coverImageId=e._id}return e}async saveAnimation(A){let n=await this.animationService.buildAnimationPage(A),e=await this.animationService.newFromText(n);try{await this.animationService.put(e)}catch(A){}return A.animationId=e._id,e}async updateGeneratedCoverImage(A){if(!(await this.imageService.get(A.coverImageId)).generated)return;let n=await this.imageService.newFromItem(A);try{await this.imageService.put(n)}catch(A){}A.coverImageId=n._id}async put(A){if(A.item.imageIds=this.exportService.getImageCidsByItem(A.item),A.item._rev){let n=await this.itemService.get(A.item._id),e=this.exportService.getImageCidsByItem(n).filter((n=>!A.item.imageIds?.includes(n)));for(let n of e)await this.deletePublishedImageByChannel(A.channel,A.item,n);A.item.animationId!=n.animationId&&(console.log(`Removing ${n.animationId} from animations.`),await this.deletePublishedAnimationByChannel(A.channel,A.item,n.animationId))}if(await this.itemService.put(A.item),A.publish){for(let n of A.item.imageIds)try{await this.publishImage(A.channel,await this.imageService.get(n),!1)}catch(A){}try{await this.publishAnimation(A.channel,await this.animationService.get(A.item.animationId),!1)}catch(A){}}if(A.updateQueryCache){let n=await this.queryCacheService.get(`token_id_stats_by_channel_${A.item.channelId}`),e=n.result;A.item.tokenId<e.min&&(e.min=A.item.tokenId),A.item.tokenId>e.max&&(e.max=A.item.tokenId,e.count++),n.result=e,await this.queryCacheService.put(n);let t=await this.itemService.getAttributeInfoBySelections(A.item.channelId,A.item.attributeSelections);for(let n of t){let e,t=`${A.item.channelId}-${n.traitType}-${n.value}`;try{e=await this.attributeCountService.get(t)}catch(A){}e||(e=new sA,e.channelId=A.item.channelId,e.traitType=n.traitType,e.value=n.value),e.count=n.count,await this.attributeCountService.put(e)}}}async delete(A){let n=await this.channelService.get(A.channelId);await this.itemService.delete(A);let e=this.exportService.getImageCidsByItem(A);for(let t of e)await this.deletePublishedImageByChannel(n,A,t);await this.deletePublishedAnimationByChannel(n,A,A.animationId),await this.deleteJSONForItem(n,A);let t=await this.queryCacheService.get(`token_id_stats_by_channel_${A.channelId}`),a=t.result;A.tokenId==a.min?(a.min=0,a.max=0,a.count=0):(a.max=A.tokenId-1,a.count--),t.result=a,await this.queryCacheService.put(t)}async clone(A){let n=JSON.parse(JSON.stringify(A));delete n._id,delete n._rev,delete n._rev_tree,delete n.tokenId,n=Object.assign(new J,n);let e=await this.channelService.get(A.channelId);await this.put({channel:e,item:n}),n.contentHTML=await this.quillService.translateContent(n.content,!0);let t=await this.saveGeneratedCoverImage(n);return A.coverImageGenerated=t.generated,await this.saveAnimation(n),await this.put({channel:e,item:n}),n}async publishImage(A,n,e=!0){if(!n)return;let t,a=`/export/${A._id}/images/${n.cid}.${n.buffer?"jpg":"svg"}`;try{t=await this.ipfsService.ipfs.files.stat(a,{hash:!0})}catch(A){}if(!t?.cid?.toString()){let t=await this.imageService.getImageContent(n);const o=await this.ipfsService.ipfs.add({content:t});await this.ipfsService.ipfs.files.cp(`/ipfs/${o.cid.toString()}`,a,{create:!0,parents:!0,flush:e});let r=this.gitService.getBaseDir(A);await this.gitService.writeFile(`${r}/backup/export/images/${n.cid}.${n.buffer?"jpg":"svg"}`,t)}}async deletePublishedImageByChannel(A,n,e){try{let t=await this.imageService.get(e);if((await this.itemService.getByImageId(e)).filter((A=>A._id!=n._id))?.length>0)return;await this.imageService.delete(t);let a=`/export/${A._id}/images/${t.cid}.${t.buffer?"jpg":"svg"}`;await this._safeDelete(a);let o=this.gitService.getBaseDir(A);await this.gitService.removeFile(`${o}/backup/export/images/${t.cid}.${t.buffer?"jpg":"svg"}`)}catch(A){}}async publishAnimation(A,n,e=!0){if(!n)return;let t,a=`/export/${A._id}/animations/${n.cid}.html`;try{t=await this.ipfsService.ipfs.files.stat(a,{hash:!0})}catch(A){}if(!t?.cid?.toString()){const t=await this.ipfsService.ipfs.add({content:n.content});await this.ipfsService.ipfs.files.cp(`/ipfs/${t.cid.toString()}`,a,{create:!0,parents:!0,flush:e});let o=this.gitService.getBaseDir(A);await this.gitService.writeFile(`${o}/backup/export/animations/${n.cid}.html`,n.content)}}async deletePublishedAnimationByChannel(A,n,e){try{let t=await this.animationService.get(e);if((await this.itemService.getByAnimationId(t._id)).filter((A=>A._id!=n._id))?.length>0)return;await this.animationService.delete(t);let a=`/export/${A._id}/animations/${t.cid}.html`;await this._safeDelete(a);let o=this.gitService.getBaseDir(A);await this.gitService.removeFile(`${o}/backup/export/animations/${t.cid}.html`)}catch(A){}}async deleteJSONForItem(A,n){let e=`/export/${A._id}/metadata/${n.tokenId}.json`;await this._safeDelete(e);let t=this.gitService.getBaseDir(A);await this.gitService.removeFile(`${t}/backup/export/metadata/${n.tokenId}.json`)}async _safeDelete(A){let n;try{n=await this.ipfsService.ipfs.files.stat(A,{hash:!0})}catch(A){}n?.cid?.toString()&&await this.ipfsService.ipfs.files.rm(A,{recursive:!0,flush:!0})}};Fn=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[KA,tn,RA,PA,Cn,wA,zA,VA,Bn,xn,An,en])],Fn);let Dn=class{channelService;imageService;authorService;itemService;itemWebService;queryCacheService;gitService;schemaService;settingsService;constructor(A,n,e,t,a,o,r,i,l){this.channelService=A,this.imageService=n,this.authorService=e,this.itemService=t,this.itemWebService=a,this.queryCacheService=o,this.gitService=r,this.schemaService=i,this.settingsService=l}async get(A){return this.getViewModel(await this.channelService.get(A))}async getViewModel(A){let n,e,t,a,o=!A.contractAddress;if(await this.imageService.load(A._id),A.coverImageId)try{let e=await this.imageService.get(A.coverImageId);n={cid:e.cid,url:await this.imageService.getUrl(e)}}catch(A){}if(A.coverBannerId)try{let n=await this.imageService.get(A.coverBannerId);e={cid:n.cid,url:await this.imageService.getUrl(n)}}catch(A){}if(A.authorId&&(a=await this.authorService.get(A.authorId),a.coverPhotoId))try{let A=await this.imageService.get(a.coverPhotoId);t={cid:A.cid,url:await this.imageService.getUrl(A)}}catch(A){}let r,i,l=await this.channelService.countItemsByChannel(A._id);try{r=await this.settingsService.get()}catch(A){}try{i=await this.channelService.getGitProviderCredentials(A,r)}catch(A){}return{channel:A,coverImage:n,coverBanner:e,author:a,authorDisplayName:this.authorService.getDisplayName(a),authorPhoto:t,itemCount:l,editable:o,dateCreated:cn()(A.dateCreated).format("MMM Do YYYY"),gitProvider:i}}async list(A,n){let e=[],t=await this.channelService.list(A,n);for(let A of t.filter((A=>!A.forkType||A.importSuccess)))e.push(await this.getViewModel(A));return e}async upgrade(A){let n=await this.itemService.listByChannel(A._id,1e5,0);for(let A of n){let n=await this.imageService.get(A.coverImageId);A.coverImageGenerated=n.generated;let e=Object.assign(new J,A);await this.itemService.put(e),console.log(e)}}async regenerateItemMedia(A){let n=await this.itemService.listByChannel(A._id,1e5,0);for(let A of n){await this.itemWebService.updateGeneratedCoverImage(A),await this.itemWebService.saveAnimation(A);let n=Object.assign(new J,A);await this.itemService.put(n)}}async put(A,n,e){if(await this.channelService.put(A),await this.gitService.initFS(A),await this.schemaService.loadChannel(A._id),n)try{await this.imageService.put(Object.assign(new G,n))}catch(A){}if(e)try{await this.imageService.put(Object.assign(new G,e))}catch(A){}let t;try{t=await this.queryCacheService.get(`token_id_stats_by_channel_${A._id}`)}catch(A){}t||(t=new oA,t._id=`token_id_stats_by_channel_${A._id}`,t.result={min:0,max:0,count:0}),await this.queryCacheService.put(t)}};Dn=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[tn,RA,PA,KA,Fn,VA,xn,dA,LA])],Dn);let Yn=class{imageService;authorService;constructor(A,n){this.imageService=A,this.authorService=n}async get(A){return this.getViewModel(await this.authorService.get(A))}async getViewModel(A){let n;if(A.coverPhotoId){let e=await this.imageService.get(A.coverPhotoId);n={cid:e.cid,url:await this.imageService.getUrl(e)}}return{author:A,authorPhoto:n,authorDisplayName:this.authorService.getDisplayName(A)}}};Yn=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[RA,PA])],Yn);let Mn=class{uiService;app;constructor(A,n){this.uiService=A,this.app=n}navigate(A,n,e="main"){console.log(`${e}: navigating to ${A.path}`),n||(n={reloadCurrent:!0,ignoreCache:!1,browserHistory:!0});let t=this.app.view[e];t?t.router.navigate(A,n):console.log(`Could not find view ${e}`)}navigateUrl(A,n,e="main"){console.log(`${e}: navigating to ${A}`);let t=this.app.view[e];t?t.router.navigate(A,n):console.log(`Could not find view ${e}`)}buildRoutesForContainer(A){let n=[];for(let e of globalThis.mappedRoutes){let t=A.get(e.controllerClass);n.push({path:e.path,async:async A=>{try{await this.resolveRoute(A.to,A.resolve,t[e.action](),e.showSpinner)}catch(A){this.uiService.showExceptionPopup(A)}}})}return n.push({path:"(.*)",async async(A){console.log(`404 error: ${A.to.path}`)}}),n}async resolveRoute(A,n,e,t=!0){t&&this.uiService.showSpinner("Loading...");let a=await e;if(!a)return;let o=await a.model,r=await o(A),i=Object.assign({},r);i.container=ia,a.view&&n({component:a.view},{props:i,history:!0,browserHistory:!0}),t&&this.uiService.hideSpinner()}};Mn=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){return function(e,t){n(e,t,A)}}(1,(0,r.f)("framework7")),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[i,Object])],Mn);class Un{model;view;constructor(A,n){this.model=A,this.view=n}}function Gn(A,n){return function(e,t,a){globalThis.mappedRoutes||(globalThis.mappedRoutes=[]),globalThis.mappedRoutes.push({path:A,controllerClass:e.constructor,action:t,showSpinner:n})}}function zn(A,{$on:n,$f7:e,$update:t}){let a=A.wallet_address,o=A.show_connect;const r=/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/,i=async A=>{document.dispatchEvent(new CustomEvent("connect-wallet"))};return function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div class="right">

        ${o?n`
            ${null!=a?n`
                <a href="/admin/author/show/${a}" class="button button-fill">${(A=>{const n=A.match(r);return n?`${n[1]}…${n[2]}`:A})(a)}</a>
              `:n`
                <button class="button button-outline button-fill" @click=${i}>Connect Wallet</button>
              `}
        `:n`<span />`}

        <a href="/admin/settings" class="button button-fill" id="settings-button" >
            <i class="material-icons">settings</i>
        </a>

    </div>

`}}zn.id="82ce035b8c",zn.style="\n    #settings-button {\n        margin-left: 3px;\n    }\n";const jn=zn;function Nn(A,{$on:n,$f7:e,$update:t}){let o=a.getWalletService(),r=A.reader_config;return function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div class="navbar">
        <div class="navbar-bg"></div>

        <div class="navbar-inner sliding">
        
          <div class="left">
            <a href="/" class="logo">Large</a>
          </div>
        
          <div class="title"></div>

          <${jn} wallet_address="${o?.address}" show_connect="${o?.provider}" />

          ${r?.path?n`
            <div class="subnavbar">
              <div class="subnavbar-inner">
                <div class="subnavbar-title">
                  <a href="${r.path}" class="link external">
                    <i class="icon icon-back"></i> ${r.title}
                  </a>
                </div>
              </div>
            </div>
          `:""}




        </div>
      </div>

`}}Nn.id="e6f4b36249",Nn.style="\n\n .logo {\n   font-size: 32px;\n   font-weight: 700;\n   margin: 10px;\n }\n\n .searchbar {\n   max-width: 100%;\n }\n\n";const Jn=Nn;function Rn(A,{$:n,$h:e,$on:t,$f7:o,$update:r}){let l=a.getInstance(Dn),s=(a.getInstance(RA),a.getInstance(i));A.footerText;let c,d,f,g,C,p=[];function B(){console.log("Unload infinite scroll"),o.infiniteScroll.destroy("#channel-index-infinite-scroll"),n(".infinite-scroll-preloader").hide()}async function b(){if(!g&&f){s.showSpinner("Loading..."),g=!0;try{p=await l.list(20,c),p&&20==p.length?c+=p.length:f=!1,0==d&&C.deleteAllItems(),C.appendItems(p)}catch(A){console.log(A)}f||B(),d++,g=!1,s.hideSpinner()}}t("pageAfterOut",((A,n)=>{B()})),t("pageInit",((A,e)=>{c=0,d=0,f=!0,g=!1,C=o.virtualList.create({el:"#channel-index-list",renderItem:A=>h(A),items:[],setListHeight:!1,emptyTemplate:'\n              <li class="item-content">\n                <div class="item-inner">\n                    There are no collections yet. <br /><br />Click the \'Create Collection\' button to create your first collection.\n                </div>\n              </li>\n            '}),n("#channel-index-infinite-scroll").trigger("infinite"),C.on("itemsAfterInsert",((A,e)=>{n(".empty").each((A=>{const e=n(A).data("id"),t=p.filter((A=>A.channel._id==e))[0];t.channel.descriptionHTML&&(A.innerHTML=t.channel.descriptionHTML);let a=A.getElementsByTagName("a");for(let A of a)A.classList.add("external");n(A).removeClass("empty")})),n("#channel-index-list ul").css("height","")}))}));const h=A=>`\n              <li>\n                <a href="/admin/channel/show/${A.channel._id}" class="item-link">\n                  <div class="item-content">\n                    <div class="item-media">\n                      ${A.coverImage?`\n                        <img src="${A.coverImage.url}" class="avatar" />\n                      `:'\n                        <i class="material-icons avatar">image</i>\n                      '}\n                    </div>\n                    <div class="item-inner">\n                      <div class="item-title-row">\n                        <div class="item-title">\n                          ${A.channel.title}                          \n                        </div>\n                        <div class="item-after"><span class="badge color-yellow text-color-black">${A.itemCount}</span></div>\n                      </div>\n\n                      ${A.authorDisplayName?`\n                        <div class="item-subtitle">\n                          By ${A?.authorDisplayName}\n                        </div>\n                      `:""}\n\n                      <div class="description item-text empty" id="channel-description-${A.channel._id}" data-id="${A.channel._id}"></div>\n                    \n                      </div>\n                  </div>\n                </a>\n              </li>\n          `;return function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="admin-posts">

    <${Jn} />

    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/channel/create-menu" class="text-color-black">
        <i class="material-icons">create</i>
        <div class="fab-text">Create/Import Collection</div>
      </a>
    </div>


    <div class="page-content infinite-scroll-content" @infinite=${b} id="channel-index-infinite-scroll">

      <div class="row">

        <div class="col-100 large-66 center">

          <div class="block block-strong inset">
            <div class="breadcrumbs ">
              <div class="breadcrumbs-item breadcrumbs-item-active">
                <a href="#" class="link">
                  Home
                </a>
              </div>          
            </div>
          </div>


          <div class="list media-list virtual-list inset" id="channel-index-list">
          </div>

          <div class="preloader infinite-scroll-preloader"></div>

        </div>

        

      </div>


    </div>


  </div>

`}}Rn.id="55fa47645d",Rn.style="\n\n\n";const Hn=Rn,Sn=["English","Abkhazian","Afar","Afrikaans","Akan","Albanian","Amharic","Arabic","Aragonese","Armenian","Assamese","Avaric","Avestan","Aymara","Azerbaijani","Bambara","Bashkir","Basque","Belarusian","Bengali","Bihari languages","Bislama","Bosnian","Breton","Bulgarian","Burmese","Catalan, Valencian","Central Khmer","Chamorro","Chechen","Chichewa, Chewa, Nyanja","Chinese","Church Slavonic, Old Bulgarian, Old Church Slavonic","Chuvash","Cornish","Corsican","Cree","Croatian","Czech","Danish","Divehi, Dhivehi, Maldivian","Dutch, Flemish","Dzongkha","Esperanto","Estonian","Ewe","Faroese","Fijian","Finnish","French","Fulah","Gaelic, Scottish Gaelic","Galician","Ganda","Georgian","German","Gikuyu, Kikuyu","Greek (Modern)","Greenlandic, Kalaallisut","Guarani","Gujarati","Haitian, Haitian Creole","Hausa","Hebrew","Herero","Hindi","Hiri Motu","Hungarian","Icelandic","Ido","Igbo","Indonesian","Interlingua (International Auxiliary Language Association)","Interlingue","Inuktitut","Inupiaq","Irish","Italian","Japanese","Javanese","Kannada","Kanuri","Kashmiri","Kazakh","Kinyarwanda","Komi","Kongo","Korean","Kwanyama, Kuanyama","Kurdish","Kyrgyz","Lao","Latin","Latvian","Letzeburgesch, Luxembourgish","Limburgish, Limburgan, Limburger","Lingala","Lithuanian","Luba-Katanga","Macedonian","Malagasy","Malay","Malayalam","Maltese","Manx","Maori","Marathi","Marshallese","Moldovan, Moldavian, Romanian","Mongolian","Nauru","Navajo, Navaho","Northern Ndebele","Ndonga","Nepali","Northern Sami","Norwegian","Norwegian Bokmål","Norwegian Nynorsk","Nuosu, Sichuan Yi","Occitan (post 1500)","Ojibwa","Oriya","Oromo","Ossetian, Ossetic","Pali","Panjabi, Punjabi","Pashto, Pushto","Persian","Polish","Portuguese","Quechua","Romansh","Rundi","Russian","Samoan","Sango","Sanskrit","Sardinian","Serbian","Shona","Sindhi","Sinhala, Sinhalese","Slovak","Slovenian","Somali","Sotho, Southern","South Ndebele","Spanish, Castilian","Sundanese","Swahili","Swati","Swedish","Tagalog","Tahitian","Tajik","Tamil","Tatar","Telugu","Thai","Tibetan","Tigrinya","Tonga (Tonga Islands)","Tsonga","Tswana","Turkish","Turkmen","Twi","Uighur, Uyghur","Ukrainian","Urdu","Uzbek","Venda","Vietnamese","Volap_k","Walloon","Welsh","Western Frisian","Wolof","Xhosa","Yiddish","Yoruba","Zhuang, Chuang","Zulu"];var Wn=e(18634),Tn=e.n(Wn),Xn=e(77616);function qn(A,{$:n,$on:e,$f7:t,$update:o}){a.getWalletService(),a.getInstance(i),a.getInstance(tn);let r=a.getInstance(qA),l=a.getInstance(RA);const s=A=>{if(v=void 0,Q=void 0,!A)return;let n=Xn.vz(A,"ether");try{v=Xn.bM(n),Q=n.toString()}catch(A){console.log(A)}},c=A=>{x.channel.sellerFeeBasisPoints=void 0,x.channel.royaltyPercent=void 0,A&&(x.channel.royaltyPercent=A,x.channel.sellerFeeBasisPoints=parseInt(100*A))},d=async A=>{let n={id:(0,GA.Z)()};Y.push(n),await o();let e=document.getElementById(`options-input-${n.id}`);new(Tn())(e)},f=async A=>{let e=n(A.currentTarget).data("id");Y.filter((A=>A.id==e))[0].traitType=n(A.currentTarget).val(),await o()},g=async A=>{let e=n(A.currentTarget).data("id");Y.filter((A=>A.id==e))[0].values=JSON.parse(A.currentTarget.value).map((A=>A.value)),await o()},C=async A=>{s(A.currentTarget.value),await o()},p=async A=>{c(A.currentTarget.value),await o()},B=async A=>{let e=n(A.currentTarget).data("id");Y=Y.filter((A=>A.id!=e)),await o()},b=async A=>{n("#cover-image-browse").click()},h=async A=>{let n=await r.uploadFile(document.getElementById("cover-image-browse")),e=await l.newFromBuffer(n);const t=new CustomEvent("cover-image-updated",{detail:{coverImage:e}});document.dispatchEvent(t),x.coverImage={cid:e.cid,url:await l.getUrl(e)},await o()},m=async A=>{n("#banner-browse").click()},E=async A=>{let n=await r.uploadFile(document.getElementById("banner-browse")),e=await l.newFromBuffer(n);const t=new CustomEvent("cover-banner-updated",{detail:{coverBanner:e}});document.dispatchEvent(t),x.coverBanner={cid:e.cid,url:await l.getUrl(e)},await o()},w=async A=>{x.channel.disableForks="true"==n(A.currentTarget).val(),D=!x.channel.disableForks,await o()},u=async A=>{x.channel.gitProvider=n(A.currentTarget).val(),await o()};let v,Q,x=A.channel,I=A.description_toolbar,k=A.description_editor,y=A.license_toolbar,F=A.license_editor,D=!x.channel.disableForks,Y=[];return x&&(s(x.channel.mintPrice),c(x.channel.royaltyPercent),x?.channel?.attributeOptions?.length>0&&(Y=x.channel.attributeOptions)),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div>
        <input type="hidden" name="_id"  value="${x?.channel?._id}" />
        <input type="hidden" name="_rev" value="${x?.channel?._rev}" />
        <input type="hidden" name="dateCreated" value="${x?.channel?.dateCreated}" />
        <input type="hidden" name="authorId" value="${x?.channel?.authorId}" />
        <input type="hidden" name="contractAddress" value="${x?.channel?.contractAddress}" />


        <div class="card">
            <div class="card-content">
                <div class="list">
                    <ul>

                        <li>
                            <div class="item-content item-input item-input-outline">
                                <div class="item-inner">
                                    <div class="item-title item-label">Title</div>
                                    <div class="item-input-wrap">
                                        ${x.editable?n`
                                            <input type="text" name="title" placeholder="Collection title" value="${x?.channel?.title}" required  minlength="3" tabindex="1" />
                                        `:n`
                                            <input type="text" name="title" placeholder="Collection title" value="${x?.channel?.title}" required  minlength="3" tabindex="1" disabled />
                                        `}
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="item-content item-input item-input-outline">
                                <div class="item-inner">
                                    <div class="item-title item-label">Symbol</div>
                                    <div class="item-input-wrap">

                                        ${x.editable?n`
                                            <input type="text" name="symbol" placeholder="Symbol (eg BAYC)" value="${x?.channel?.symbol}" tabindex="2" required />
                                        `:n`
                                            <input type="text" name="symbol" placeholder="Symbol (eg BAYC)" value="${x?.channel?.symbol}" tabindex="2" required disabled />
                                        `}


                                        
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="item-content item-input item-input-outline">
                                <div class="item-inner">
                                    <div class="item-title item-label">Description</div>

                                    <div id="${I}">

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

                                    <div class="editor bg-color-white text-color-black channel-editor" id="${k}" tabindex="3"></div>

                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="item-content item-input">
                                <div class="item-inner">
                                    <div class="item-title item-label">Collection Avatar</div>
                                    <div class="item-input-wrap">

                                        ${x.coverImage?n`
                                        <img class="avatar-preview" src="${x?.coverImage.url}" />

                                        `:n`
                                        <i class="material-icons avatar-preview">image</i>
                                        `}

                                        <input type="button" class="button button-fill browse-file" value="Browse"
                                            @click="${b}" tabindex="4" />
                                        <input type="hidden" name="coverImageId" value="${x?.coverImage?.cid}" />
                                        <input type="file" id="cover-image-browse" style="display: none"
                                            @change="${h}" />

                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="item-content item-input">
                                <div class="item-inner">
                                    <div class="item-title item-label">Collection Banner</div>
                                    <div class="item-input-wrap">

                                        ${x?.coverBanner?n`
                                        <img class="cover-banner-preview" src="${x?.coverBanner.url}" />
                                        `:n`
                                        <i class="material-icons cover-banner-preview">image</i>
                                        `}

                                        <input type="button" class="button button-fill browse-file" value="Browse"
                                            @click="${m}" tabindex="5" />
                                        <input type="hidden" name="coverBannerId" value="${x?.coverBanner?.cid}" />

                                        <input type="file" id="banner-browse" style="display: none" @change="${E}" />

                                    </div>
                                </div>
                            </div>
                        </li>

                        <!-- <li>
                            <div class="item-content item-input item-input-outline">
                                <div class="item-inner">
                                    <div class="item-title item-label">Category</div>
                                    <div class="item-input-wrap">
                                        <input type="text" name="category" placeholder="Category" id="category" tabindex="6" value="${x?.channel?.category}" />
                                    </div>
                                </div>
                            </div>
                        </li> -->


                        <!-- <li>
                            <div class="item-content item-input item-input-outline">
                                <div class="item-inner">
                                    <div class="item-title item-label">External Link</div>
                                    <div class="item-input-wrap">
                                        <input type="text" name="link" placeholder="External Link" tabindex="8" value="${x?.channel?.link}" />
                                    </div>
                                </div>
                            </div>
                        </li> -->

                        <li class="item-content item-input item-input-outline">
                            <div class="item-inner">
                                <div class="item-title item-label">Language</div>
                                <!-- additional "input-dropdown-wrap" class -->
                                <div class="item-input-wrap input-dropdown-wrap">
                                    <select name="language" tabindex="9">
                                        ${Sn.map((A=>n`
                                            ${x?.channel?.language==A?n`
                                                <option value="${A}" selected >${A}</option>
                                            `:n`
                                                <option value="${A}">${A}</option>
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

        <div class="card">
            <div class="card-content">
                <div class="list">
                    <ul>
                        <li>
                            <div class="item-content item-input">
                                <div class="item-inner">
                                    <div class="item-title item-label">Attribute Categories (eg Shirt, Size, Hat)</div>
                                    <div>
                
                                        <p>Add attributes to give specific items special properties. Items can be sorted and filtered by
                                            attribute.</p>
                
                                        <div>
                                            <div class="category-name-label">Category Name</div>
                                            <div class="options-label">Option Values</div>
                                        </div>
                

                                        ${x.editable?n`

                                            ${Y?.map((A=>n`
                
                                                <div id="category-${A.id}">
                        
                                                    <div class="category-name-input">
                                                        <input type="text" placeholder="Category Name" @change="${f}" data-id="${A.id}" value="${A.traitType}" />
                                                    </div>
                        
                                                    <div class="options-input">
                                                        <input type="text" placeholder="Enter options" @change="${g}" data-id="${A.id}" id="options-input-${A.id}" value="${A.values}" />
                                                    </div>
                        
                                                    <a @click="${B}" data-id="${A.id}"><i class="material-icons">delete</i></a>
                        
                                                </div>
                                            `))}

                                            <div class="row">
                                                <div class="col-30">
                                                    <a class="button button-outline add-category-button" @click="${d}" tabindex="10">Add Category</a>
                                                </div>
                                                <div class="col-70"></div>
                                            </div>

                                        `:n`
                                            ${Y?.map((A=>n`
                    
                                                <div id="category-${A.id}">
                        
                                                    <div class="category-name-input">
                                                        <input type="text" placeholder="Category Name" @change="${f}" data-id="${A.id}" value="${A.traitType}" disabled />
                                                    </div>
                        
                                                    <div class="options-input">
                                                        <input type="text" placeholder="Enter options" @change="${g}" data-id="${A.id}" id="options-input-${A.id}" value="${A.values}" disabled />
                                                    </div>
                                                
                                                </div>
                                            `))}
                                        `}

                                        

                
                                        <input type="hidden" name="attributeOptions" value="${JSON.stringify(Y)}" />
                

                
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


        <div class="card">
            <div class="card-content">
                <div class="list">
                    <ul>
                        <li>
                            <div class="item-content item-input item-input-outline">
                                <div class="item-inner">
                                    <div class="item-title item-label">Mint Price in ETH</div>
                                    <div class="item-input-wrap">

                                        ${x.editable?n`
                                            <input type="number" placeholder="Enter price for one piece (eg 0.08)" @change="${C}" 
                                            step="any" tabindex="11" value="${x?.channel?.mintPrice}" />
                                        `:n`
                                            <input type="number" placeholder="Enter price for one piece (eg 0.08)" @change="${C}" 
                                            step="any" tabindex="11" value="${x?.channel?.mintPrice}" disabled />
                                        `}

                                        <input type="hidden" name="mintPrice" value="${v}" />
                                    </div>
                                </div>
                            </div>
                        </li>
                
                        ${v?n`
                        <li tabindex="-1">
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-text"> You will receive <strong>${v}</strong> ETH (${Q} wei) for
                                        each mint.</div>
                                </div>
                            </div>
                        </li>
                        `:n``}
                
                        <li>
                            <div class="item-content item-input item-input-outline">
                                <div class="item-inner">
                                    <div class="item-title item-label">Marketplace Creator Fee %</div>
                                    <div class="item-input-wrap">

                                        ${x.editable?n`
                                            <input type="number" name="royaltyPercent" placeholder="Royalty %" @change="${p}" step="any"  tabindex="12" value="${x?.channel?.royaltyPercent}" />
                                        `:n`
                                            <input type="number" name="royaltyPercent" placeholder="Royalty %" @change="${p}" step="any"  tabindex="12" value="${x?.channel?.royaltyPercent}" disabled />
                                        `}

                                        <input type="hidden" name="sellerFeeBasisPoints" value="${x?.channel?.sellerFeeBasisPoints}" />
                
                                    </div>
                                </div>
                            </div>
                        </li>
                
                
                        ${x?.channel?.royaltyPercent?n`
                        <li tabindex="-1">
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-text">
                                        You will receive a <strong>${x?.channel?.royaltyPercent}%</strong> for each sale on OpenSea, etc. Confirm this
                                        value when you set up your
                                        collection on the marketplace. This just presets it for you.
                                    </div>
                                </div>
                            </div>
                        </li>
                        `:n``}
                    </ul>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <div class="list">
                    <ul>
                        <li class="item-content item-input item-input-outline">
                            <div class="item-inner">
                                <div class="item-title item-label">Features and Licensing</div>
                                <div class="item-input-wrap input-dropdown-wrap">
                                    <select name="disableForks" @change="${w}">

                                        ${x.channel.disableForks?n`
                                            <option value="false">Copyleft / CC0</option>
                                            <option value="true" selected>Copyright</option>
                                        `:n`
                                            <option value="false" selected>Copyleft / CC0</option>
                                            <option value="true">Copyright</option>
                                        `}


                                    </select>
                                </div>
                            </div>
                        </li>

                        ${D?n`

                            <li>
                                <div class="item-content">
                                  <div class="item-inner">
                                    <div class="item-text">Use Creative Commons <a href="https://creativecommons.org/choose/zero/" class="external" target="_blank">CC0 tool</a> to generate licensing text.</div>
                                  </div>
                                </div>
                              </li>

                        `:n`<span />`}



                        <li class="license-editor">
                            <div class="item-content item-input item-input-outline">
                                <div class="item-inner">
                                    <div class="item-title item-label">License</div>

                                    <div id="${y}">

                                        <!-- Add a bold button -->
                                        <button class="ql-bold"></button>
                                        <button class="ql-italic"></button>
                                        <button class="ql-strike"></button>
                                        <button class="ql-underline"></button>

                                    </div>

                                    <div class="editor bg-color-white text-color-black channel-editor" id="${F}" tabindex="3"></div>

                                </div>
                            </div>
                        </li>

                        <li class="item-content item-input item-input-outline">
                            <div class="item-inner">
                                <div class="item-title item-label">Git Provider</div>
                                <div class="item-input-wrap input-dropdown-wrap">
                                    <select name="gitProvider" @change="${u}">

                                        ${x.channel.gitProvider&&"default"!=x.channel.gitProvider?n`
                                            <option value="default">Default</option>
                                        `:n`
                                            <option value="default" selected>Default</option>
                                        `}

                                        ${"github"==x.channel.gitProvider?n`
                                            <option value="github" selected>GitHub</option>
                                        `:n`
                                            <option value="github">GitHub</option>
                                        `}


                                        ${"gitlab"==x.channel.gitProvider?n`
                                            <option value="gitlab" selected>GitLab</option>
                                        `:n`
                                            <option value="gitlab">GitLab</option>
                                        `}


                                    </select>
                                </div>
                            </div>
                        </li>


                    </ul>
                </div>
            </div>
        </div>


    </div>


`}}qn.id="77718c13d2",qn.style="\n    \n\n\n\n\n";const Pn=qn;var Vn=e(20637);function Kn(A,{$:n,$on:e,$f7:t,$update:o}){a.getInstance(tn);let r,l,s=a.getInstance(Dn),c=a.getInstance(PA),d=a.getInstance(SA),f=(a.getInstance(i),a.getWalletService());Vn.Z.configure({languages:["css"]});let g,C,p={channel:{mintPrice:"0.00",royaltyPercent:"0",authorId:f.address},themes:[],staticPages:[],editable:!0,disableForks:!1};const B=async A=>{A.preventDefault();let n=Object.assign(new I,t.form.convertToData("#create-channel-form"));n.description=d.activeEditor.getContents(),n.license=r.getContents(),n.sellerFeeBasisPoints=parseInt(n.sellerFeeBasisPoints),n.attributeOptions?n.attributeOptions=JSON.parse(n.attributeOptions):n.attributeOptions=[],n.authorId&&await c.insertIfNew(n.authorId),n.disableForks="true"==n.disableForks;try{await s.put(n,g,C),t.toast.show({text:"Collection saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),console.log(n),t.views.main.router.navigate(`/admin/channel/show/${n._id}`)}catch(A){console.log(A),t.dialog.alert(A.errors,"There was an error")}};e("pageInit",(async(A,n)=>{await d.init(),new(Tn())(document.getElementById("category")),d.buildQuillPostEditor("#create-channel-description-editor","#create-channel-description-toolbar"),r=new(QA())("#create-channel-license-editor",{bounds:".page-content",modules:{toolbar:"#create-channel-license-toolbar"},theme:"snow"}),l=t.swiper.create(".swiper",{speed:1e3,allowTouchMove:!1,createElements:!0,longSwipes:!1,preventInteractionOnTransition:!0,shortSwipes:!1,simulateTouch:!1,on:{slideChange:function(A){0==A.activeIndex&&(document.getElementById("create-new-swiper").style.height="700px"),1==A.activeIndex&&(document.getElementById("create-new-swiper").style.height="2500px")}}})}));const b=async A=>{p.channel.disableForks=!0,await o(),l.slideNext(1e3)},h=async A=>{p.channel.disableForks=!1,await o(),l.slideNext(1e3)};return n(document).on("cover-image-updated",(async A=>{g=A.detail.coverImage})),n(document).on("cover-banner-updated",(async A=>{C=A.detail.coverBanner})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="admin-create-channel">

    <${Jn} />

    <div class="page-content">

      <div class="row">
        <div class="col-100 large-66 center">

          <div class="block block-strong inset">
            <div class="breadcrumbs ">
              <div class="breadcrumbs-item">
                <a href="/" class="link">
                  Home
                </a>
              </div>    
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item">
                <a class="link" href="/admin/channel/create-menu">Create & Import</a>
              </div> 
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item breadcrumbs-item-active">
                Create Collection
              </div> 
            </div>
          </div>

          <!-- Slider container -->
          <div class="swiper" id="create-new-swiper" style="padding-left: 0px; padding-right: 0px; background: rgb(238, 240, 243);">

            <!-- Slides wrapper -->
            <div class="swiper-wrapper">
                <!-- Slides -->
                <div class="swiper-slide">
                  
                  <div class="block-title no-margin-bottom no-margin-top">Choose your features and licensing</div>

                  <div class="row block">

                    <div class="col-100 large-50">

                      <div class="block copyright-block">

                        <strong>Copyright</strong>

                        <ul>
                          <li>Use your own licensing terms.</li>
                          <li>Restrict who can host the content (DMCA).</li>
                        </ul>

                        <button class="button color-red button-outline" @click="${b}">Disable forking</button>
                        
                      </div>

                    </div>

                    <div class="col-100 large-50">

                      <div class="block copyleft-block">

                        <strong>Copyleft</strong>

                        <ul>
                          <li>Free as in speech.</li>
                          <li>Allow sharing, remixes, and derivatives.</li>
                          <li>Anyone can host the content.</li>
                          <li><a href="https://creativecommons.org/share-your-work/public-domain/cc0/"></a>CC0 Content</li>
                        </ul>

                        <button class="button button-fill" @click="${h}">Enable all features</button>

                      </div>
                      
                    </div>

                  </div>

                </div>

                <div class="swiper-slide">

                  <form id="create-channel-form" @submit="${B}">
        
                    <${Pn} 
                      channel=${p} 
                      description_editor="create-channel-description-editor"
                      description_toolbar="create-channel-description-toolbar" 
                      license_editor="create-channel-license-editor"
                      license_toolbar="create-channel-license-toolbar" 
                    />
        
                    <div class="row block">
        
                      <div class="col-0 large-30"></div>
        
                      <a href="/admin/channel/create-menu" class="button button-outline color-gray col-50 large-30" tabindex="12">
                        Cancel
                      </a>

                      <button type="submit" class="button button-fill col-50 large-30" tabindex="13" id="saveButton">
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

    </div>
  </div>

`}}Kn.id="c2dba5b92c",Kn.style="\n\n\n\n";const Zn=Kn;function Ln(A,{$:n,$on:e,$f7:t,$update:o}){let r=a.getInstance(KA),i=A.channel,l=A.item;const s=async A=>{A.preventDefault();const e=n(A.currentTarget).children(".goto-input").val();console.log(e),await r.getByTokenId(i,parseInt(e.toString()))?t.views.main.router.navigate(`/admin/channel/show/${i}/${parseInt(e.toString())}`):t.dialog.alert("Invalid Page")};return function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div class="card" >
      <form class="card-content card-content-padding" @submit="${s}">
        <input type="number" class="goto-input" style="width: 60px; border: 1px solid #cccccc; display: inline-block;" value="${l?.item?.tokenId}" min="0"  />
        <span class="paging-label">Enter Token ID</span>
        <button class="goto-button button button-small button-fill">Go</button>
      </form>
    </div>

`}}Ln.id="f3e2acd946",Ln.style="    \n";const On=Ln;function $n(A,{$:n,$on:e,$f7:t,$update:o}){a.getInstance(tn),a.getWalletService();let r,i=globalThis.container.get(Fn),l=A.channelViewModel,s=A.firstPageItems,c=[],d=0,f=!0,g=!1,C=l.itemCount,p=l.editable;const B=A=>{const n=b();r.params.cols=n>=1024?5:2,r.params.height=n>=1024?290:250,r?.update(),console.log("Resized...")},b=()=>Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),h={el:"#item-list",createUl:!1,renderItem(A){return`<li class="flex-card">\n                  <a href="/admin/channel/show/${(n=A).channel._id}/${n.item.tokenId}" class="item-link">\n                      <div class="card" >\n                          <div class="card-content">\n                              <div class="square">\n                                  <img src="${n.coverImage?.url}"/>\n                              </div>\n                          </div>\n\n\n                          <div class="card-footer">\n                              ${n.item.title?n.item.title:`#${n.item.tokenId}`} \n                          </div>\n                      </div>\n                  </a>\n              </li>\n      `;var n},height:b()>=1024?290:250,items:c,cols:b()>=1024?5:2,emptyTemplate:'\n          <li class="item-content">\n              <div class="item-inner">\n                  No items in collection.\n              </div>\n          </li>\n          '};e("pageInit",(async(A,e)=>{if(c.push(...s),d=s.length,l?.coverBanner?.url?n(`.show-channel-banner-${l.channel._id}`).css("background-image",`url(${l.coverBanner.url})`):n(`.show-channel-banner-${l.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${l.channel._id}`)){let A=document.getElementById(`channel-show-description-${l.channel._id}`).getElementsByTagName("a");for(let n of A)n.classList.add("external")}n(".animation-container a").addClass("external"),window.addEventListener("resize",B),m()})),e("pageBeforeOut",(async()=>{window.removeEventListener("resize",B)}));const m=()=>{r=t.virtualList.create(h),r.items?.length<C?document.getElementById("item-list-infinite-scroll").addEventListener("infinite",E):n(".infinite-scroll-preloader").hide()};async function E(A){if(!g&&f){console.log("Infinite scrolling..."),g=!0;try{let A=await i.listByChannel(l.channel._id,H.CHUNK_SIZE,d);d+=A.length,d>=C&&(f=!1),r.appendItems(A)}catch(A){console.log(A)}t.preloader.hide(),f||(console.log("Unload infinite scroll item list"),t.infiniteScroll.destroy("#item-list-infinite-scroll"),t.virtualList.destroy("#item-list"),r=void 0,n(".infinite-scroll-preloader").hide()),g=!1}}return function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="admin-show-collection">

    <${Jn} />


    ${p?n`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${l.channel._id}" class="text-color-black">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    `:n``}


    <div class="page-content infinite-scroll-content" id="item-list-infinite-scroll">

      <div class="row">
        <div class="col-100 large-66 center">

          <div class="block block-strong inset">
            <div class="breadcrumbs ">
              <div class="breadcrumbs-item">
                <a href="/" class="link">
                  Home
                </a>
              </div>    
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item breadcrumbs-item-active">
                <a href="#" class="link">
                  ${l.channel.title}
                </a>
              </div>     
            </div>
          </div>

          <channel-card channel_view_model=${l}></channel-card>

          <div class="block">
            <p class="segmented">
              <a class="button button-outline button-active" href="#">Items</a>
              <a class="button button-outline" href="/admin/channel/themes/${l.channel._id}">Themes</a>
              <a class="button button-outline" href="/admin/channel/static-pages/${l.channel._id}">Static Pages</a>
            </p>
          </div>

          <${On} channel=${l.channel._id} token_id="1" />


        
          <div class="list cards-list virtual-list" id="item-list" >
            <ul class="item-flex"></ul>
          </div>
    
          <div class="preloader infinite-scroll-preloader"></div>
        </div>
      </div>




    </div>

  </div>

`}}e(18515),$n.id="d681b86d8a",$n.style="\n  \n\n";const _n=$n;function Ae(A,{$:n,$on:e,$f7:t,$update:a}){let o=A.theme,r=A.cover_image_css_editor_id,i=A.animation_css_editor_id;return function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div class="list">

        <input type="hidden" name="_id"  value="${o?._id}" />
        <input type="hidden" name="_rev" value="${o?._rev}" />
        <input type="hidden" name="dateCreated" value="${o?.dateCreated}" />

        <ul>
            <li>
                <div class="item-content item-input item-input-outline">
                    <div class="item-inner">
                        <div class="item-title item-label">Title</div>
                        <div class="item-input-wrap">
                            <input type="text" name="name" placeholder="Name"
                                value="${o?.name}" required  minlength="3" tabindex="1" />
                        </div>
                    </div>
                </div>
            </li>

            <li>
                <div class="item-content item-input item-input-outline">
                    <div class="item-inner">
                        <div class="item-title item-label">Cover Image CSS (SVG)</div>
                        <div class="editor bg-color-white text-color-black css-editor" id="${r}" tabindex="2" style="min-height: 100px;">.svg-h1 {}</div>
                    </div>
                </div>
            </li>
    
            <li>
                <div class="item-content item-input item-input-outline">
                    <div class="item-inner">
                        <div class="item-title item-label">Animation CSS (HTML)</div>
                        <div class="editor bg-color-white text-color-black css-editor" id="${i}" tabindex="3" style="min-height: 100px;">.animation-container {}</div>
                    </div>
                </div>
            </li>

        </ul>
    </div>


`}}Ae.id="cb44fc5789",Ae.style="\n    \n";const ne=Ae;function ee(A,{$:n,$on:e,$f7:t,$update:o}){let r,l,s,c=a.getInstance(zA),d=(a.getInstance(i),A.channelViewModel),f=A.themes,g=d.editable;const C=async()=>{f=await c.listByChannel(d.channel._id,1e3,0)},p=function(A){l=new(QA())("#add-theme-cover-image-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:A=>hljs.highlightAuto(A).value},toolbar:!1}}),s=new(QA())("#add-theme-animation-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:A=>hljs.highlightAuto(A).value},toolbar:!1}})},B=async function(A){A.preventDefault();let n=Object.assign(new O,t.form.convertToData("#add-theme-form"));n.coverImageCSS="\n"!=l.getText()?l.getText():void 0,n.animationCSS="\n"!=s.getText()?s.getText():void 0,n.channelId=d.channel._id,n._id=(0,GA.Z)(),n.dateCreated=(new Date).toJSON();try{await c.put(n),await C(),t.form.fillFromData("#add-theme-form",{name:""}),l.setText(""),s.setText(""),await o(),t.popup.close(".add-theme-popup")}catch(A){t.dialog.alert(A,"There was an error")}},b=async function(A){A.preventDefault();let n=Object.assign(new O,t.form.convertToData("#edit-theme-form"));n.coverImageCSS="\n"!=l.getText()?l.getText():void 0,n.animationCSS="\n"!=s.getText()?s.getText():void 0,n.channelId=d.channel._id;try{await c.put(n),await C(),await o(),t.popup.close(".edit-theme-popup")}catch(A){console.log(A),t.dialog.alert(A.errors,"There was an error")}},h=async function(A){let e=n(A.target).data("id");t.dialog.confirm("Are you sure you want to delete this theme?",(async()=>{let A=await c.get(e);await c.delete(A),await C(),await o(),t.toast.show({text:"Theme deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))},m=async function(A){let e=n(A.target).data("id");r=f.filter((A=>A._id==e))[0],l=new(QA())("#edit-theme-cover-image-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:A=>hljs.highlightAuto(A).value},toolbar:!1}}),s=new(QA())("#edit-theme-animation-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:A=>hljs.highlightAuto(A).value},toolbar:!1}}),t.form.fillFromData("#edit-theme-form",r),l.setText(r.coverImageCSS?r.coverImageCSS:""),s.setText(r.animationCSS?r.animationCSS:""),await o(),t.popup.open(".edit-theme-popup")};return e("pageInit",(async(A,e)=>{if(d?.coverBanner?.url?n(`.show-channel-banner-${d.channel._id}`).css("background-image",`url(${d.coverBanner.url})`):n(`.show-channel-banner-${d.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${d.channel._id}`)){let A=document.getElementById(`channel-show-description-${d.channel._id}`).getElementsByTagName("a");for(let n of A)n.classList.add("external")}await o(),n(".add-theme-popup").on("popup:open",p)})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="channel-show-themes">

    <${Jn} />


    ${g?n`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${d.channel._id}" class="text-color-black">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    `:n``}


    <div class="page-content">

      <div class="row">
        <div class="col-100 large-66 center">

          <div class="block block-strong inset">
            <div class="breadcrumbs ">
              <div class="breadcrumbs-item">
                <a href="/" class="link">
                  Home
                </a>
              </div>
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item breadcrumbs-item-active">
                <a href="#" class="link">
                  ${d.channel.title}
                </a>
              </div>
            </div>
          </div>


          <channel-card channel_view_model=${d}></channel-card>

          <div class="block">
            <p class="segmented">
              <a class="button button-outline" href="/admin/channel/show/${d.channel._id}">Items</a>
              <a class="button button-outline button-active" href="#">Themes</a>
              <a class="button button-outline" href="/admin/channel/static-pages/${d.channel._id}">Static
                Pages</a>
            </p>
          </div>

          

          <div class="card">
            <div class="card-content">
              <div class="list">
                <ul>
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">Themes</div>
                        <div>

                          <p>A theme allows you to apply CSS formatting to an item. Create themes and then apply them to
                            individual items.</p>

                          <ul class="theme-list"
                            style="padding-left: 0; padding-bottom: 10px; padding-top: 10px; margin-bottom: 15px;">
                            ${f?.map((A=>n`
                            <li>
                              <span class="theme-name">${A.name}</span>
                              <span class="theme-id">${A._id}</span>
                              <a class="link theme-link" href="#" data-id="${A._id}" @click="${m}">Edit</a>
                              <a class="link theme-link" href="#" data-id="${A._id}" @click="${h}">Delete</a>
                            </li>
                            `))}
                          </ul>

                          <div class="row">
                            <div class="col-30">
                              <a class="button button-outline add-theme-button popup-open" data-popup=".add-theme-popup"
                                tabindex="10">Add Theme</a>
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
                  <form id="add-theme-form" @submit="${B}">
                    <${ne} cover_image_css_editor_id="add-theme-cover-image-editor"
                      animation_css_editor_id="add-theme-animation-editor" />

                    <div class="row block">

                      <div class="col-70"></div>

                      <button type="submit" class="button button-fill col-30" tabindex="12">
                        Add
                      </button>

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
                  <form id="edit-theme-form" @submit="${b}">

                    <${ne} cover_image_css_editor_id="edit-theme-cover-image-editor"
                      animation_css_editor_id="edit-theme-animation-editor" theme="${r}" />

                    <div class="row block">

                      <div class="col-70"></div>

                      <button type="submit" class="button button-fill col-30" tabindex="12">
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

  </div>

`}}ee.id="44ae335694",ee.style="\n\n\n";const te=ee;function ae(A,{$:n,$on:e,$f7:t,$update:a}){let o=A.static_page,r=[{name:"navbar",description:"Show link on navigation bar"},{name:"links",description:"Show in list of links on home page"},{name:"index",description:"Show content on home page"}],i=A.static_page_content_editor_id,l=A.static_page_content_toolbar_id,s=A.image_button_input_id,c=A.image_button_id;return function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div class="list">

        <input type="hidden" name="_id"  value="${o?._id}" />
        <input type="hidden" name="_rev" value="${o?._rev}" />
        <input type="hidden" name="dateCreated" value="${o?.dateCreated}" />

        <ul>
            <li>
                <div class="item-content item-input item-input-outline">
                    <div class="item-inner">
                        <div class="item-title item-label">Name</div>
                        <div class="item-input-wrap">
                            <input type="text" name="name" placeholder="Name"
                                value="${o?.name}" required  minlength="3" tabindex="1" />
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <a href="#" class="item-link smart-select smart-select-init" data-open-in="popup">
                  <!-- "multiple" attribute for multiple select-->
                    <select name="locations" tabindex="2"  multiple>
                        <optgroup>
                            ${r.map((A=>n`
                                ${(A=>{if(o?.locations?.length>0)for(let n of o.locations)if(A.name==n.name)return!0;return!1})(A)?n`
                                    <option value="${A.name}" selected >${A.description}</option>
                                `:n`
                                    <option value="${A.name}">${A.description}</option>
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
                <div class="item-content item-input item-input-outline">
                    <div class="item-inner">
                        <div class="item-title item-label">Content</div>

                        <div id="${l}">
                
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
    
                            <button class="text-editor-button" id="${c}"><i class="material-icons">image</i></button>
                            <label><input type="file" id="${s}" /></label>
                        </div>

                        <div class="editor bg-color-white text-color-black static-page-editor" id="${i}" tabindex="3"></div>
                    </div>
                </div>
            </li>

        </ul>
    </div>


`}}ae.id="a5e867dba6",ae.style="\n    \n";const oe=ae;function re(A,{$:n,$on:e,$f7:t,$update:o}){let r,l,s=a.getInstance(SA),c=a.getInstance(i),d=a.getInstance(pn),f=A.channelViewModel,g=A.staticPages,C=f.editable;const p=async()=>{g=await d.listByChannel(f.channel._id,1e3,0)};let B=A=>{l=new(QA())("#add-static-page-content-editor",{bounds:".page-content",theme:"snow",modules:{imageDropAndPaste:{handler:(A,n,e)=>{const t=e.toFile();s.insertImageInEditor(t,l)}},toolbar:"#add-static-page-content-toolbar",blotFormatter:{specs:[TA],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}}})},b=async A=>{A.preventDefault();let n=Object.assign(new V,t.form.convertToData("#add-static-page-form"));n.content=l.getContents(),n.channelId=f.channel._id,n._id=(0,GA.Z)(),n.dateCreated=(new Date).toJSON();try{await d.put(n),await p(),t.form.fillFromData("#add-static-page-form",{name:"",slug:"",locations:[]}),l.setText(""),await o(),t.popup.close(".add-static-page-popup")}catch(A){t.dialog.alert(A,"There was an error")}},h=async A=>{A.preventDefault();let n=Object.assign(new V,t.form.convertToData("#edit-static-page-form"));n.content=l.getContents(),n.channelId=f.channel._id;try{await d.put(n),await p(),await o(),t.popup.close(".edit-static-page-popup")}catch(A){console.log(A),t.dialog.alert(A.errors,"There was an error")}},m=async A=>{let e=n(A.target).data("id");t.dialog.confirm("Are you sure you want to delete this static page?",(async()=>{let A=await d.get(e);await d.delete(A),await p(),await o(),t.toast.show({text:"Static Page deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))},E=async function(A){let e=n(A.target).data("id");r=g.filter((A=>A._id==e))[0],l=new(QA())("#edit-static-page-content-editor",{bounds:".page-content",theme:"snow",modules:{imageDropAndPaste:{handler:(A,n,e)=>{const t=e.toFile();s.insertImageInEditor(t,l)}},toolbar:"#edit-static-page-content-toolbar",blotFormatter:{specs:[TA],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}}}),t.form.fillFromData("#edit-static-page-form",r),l.setContents(r.content),await o(),t.popup.open(".edit-static-page-popup")},w=function(A){A.preventDefault(),n("#add-static-page-image-button-input").click()},u=async function(A){A.preventDefault(),c.showSpinner("Processing image..."),await s.insertImageInEditor(this.files[0],l),c.hideSpinner()},v=function(A){A.preventDefault(),n("#edit-static-page-image-button-input").click()},Q=async function(A){A.preventDefault(),c.showSpinner("Processing image..."),await s.insertImageInEditor(this.files[0],l),c.hideSpinner()};return e("pageInit",(async(A,e)=>{if(n(document).off("click","#add-static-page-image-button"),n(document).off("change","#add-static-page-image-button-input"),n(document).off("click","#edit-static-page-image-button"),n(document).off("change","#edit-static-page-image-button-input"),await s.init(),f?.coverBanner?.url?n(`.show-channel-banner-${f.channel._id}`).css("background-image",`url(${f.coverBanner.url})`):n(`.show-channel-banner-${f.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${f.channel._id}`)){let A=document.getElementById(`channel-show-description-${f.channel._id}`).getElementsByTagName("a");for(let n of A)n.classList.add("external")}await o(),n(".add-static-page-popup").on("popup:open",B),n(document).on("click","#add-static-page-image-button",w),n(document).on("change","#add-static-page-image-button-input",u),n(document).on("click","#edit-static-page-image-button",v),n(document).on("change","#edit-static-page-image-button-input",Q)})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="channel-show-themes">

    <${Jn} />


    ${C?n`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${f.channel._id}" class="text-color-black">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    `:n``}


    <div class="page-content">

      <div class="row">
        <div class="col-100 large-66 center">

          <div class="block block-strong inset">
            <div class="breadcrumbs ">
              <div class="breadcrumbs-item">
                <a href="/" class="link">
                  Home
                </a>
              </div>
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item breadcrumbs-item-active">
                <a href="#" class="link">
                  ${f.channel.title}
                </a>
              </div>
            </div>
          </div>


          <channel-card channel_view_model=${f}></channel-card>

          <div class="block">
            <p class="segmented">
              <a class="button button-outline" href="/admin/channel/show/${f.channel._id}">Items</a>
              <a class="button button-outline" href="/admin/channel/themes/${f.channel._id}">Themes</a>
              <a class="button button-outline button-active" href="#">Static Pages</a>
            </p>
          </div>


          <div class="card">
            <div class="card-content">
              <div class="list">
                <ul>
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">Static Pages</div>
                        <div>

                          <p>
                            Create content that is displayed in the Large Reader alongside your collection. These are not mintable as NFTs.
                          </p>

                          <p>
                            <strong>Example:</strong> About Us, Contact Us, etc.
                          </p>

                          <ul class="static-page-list"
                            style="padding-left: 0; padding-bottom: 10px; padding-top: 10px; margin-bottom: 15px;">
                            ${g?.map((A=>n`
                              <li>
                                <span class="static-page-name">${A.name}</span>
                                <a class="link static-page-link" href="#" data-id="${A._id}" @click="${E}">Edit</a>
                                <a class="link static-page-link" href="#" data-id="${A._id}" @click="${m}">Delete</a>
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
                  <form id="add-static-page-form" @submit="${b}">
                    <${oe} static_page_content_editor_id="add-static-page-content-editor"
                      static_page_content_toolbar_id="add-static-page-content-toolbar"
                      image_button_input_id="add-static-page-image-button-input"
                      image_button_id="add-static-page-image-button" />

                    <div class="row block">

                      <div class="col-70"></div>

                      <button type="submit" class="button button-fill col-30" tabindex="12">
                        Add
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
                  <form id="edit-static-page-form" @submit="${h}">

                    <${oe} static_page_content_editor_id="edit-static-page-content-editor"
                      static_page_content_toolbar_id="edit-static-page-content-toolbar"
                      image_button_input_id="edit-static-page-image-button-input"
                      image_button_id="edit-static-page-image-button" static_page="${r}" />

                    <div class="row block">

                      <div class="col-70"></div>

                      <button type="submit" class="button button-fill col-30" tabindex="12">
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

  </div>

`}}re.id="fd1c0fa2c3",re.style="\n\n\n";const ie=re;function le(A,{$:n,$on:e,$f7:t,$update:o}){a.getInstance(tn);let r,l,s,c=a.getInstance(Dn),d=(a.getInstance(RA),a.getInstance(zA),a.getInstance(pn),a.getInstance(i),a.getInstance(SA)),f=A.channelViewModel;Vn.Z.configure({languages:["css"]});const g=async A=>{A.preventDefault();let n=Object.assign(new I,f.channel);n=Object.assign(n,t.form.convertToData("#edit-channel-form")),n.description=d.activeEditor.getContents(),n.license=r.getContents(),n.sellerFeeBasisPoints=parseInt(n.sellerFeeBasisPoints),n.attributeOptions?n.attributeOptions=JSON.parse(n.attributeOptions):n.attributeOptions=[],n.disableForks="true"==n.disableForks;try{await c.put(n,l,s),t.toast.show({text:"Collection saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),t.views.main.router.navigate(`/admin/channel/show/${n._id}`)}catch(A){t.dialog.alert(A.errors,"There was an error")}};return e("pageInit",(async(A,n)=>{if(new(Tn())(document.getElementById("category")),d.buildQuillPostEditor("#edit-channel-description-editor","#edit-channel-description-toolbar"),f.channel.description&&d.activeEditor.setContents(f.channel.description),r=new(QA())("#edit-channel-license-editor",{bounds:".page-content",modules:{toolbar:"#edit-channel-license-toolbar"},theme:"snow"}),f.channel.license&&r.setContents(f.channel.license),f.channel?.attributeOptions?.length>0)for(let A of f.channel?.attributeOptions)new(Tn())(document.getElementById(`options-input-${A.id}`))})),n(document).on("cover-image-updated",(async A=>{l=A.detail.coverImage})),n(document).on("cover-banner-updated",(async A=>{s=A.detail.coverBanner})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="admin-edit-channel">

    <${Jn} />

    <div class="page-content">

      <div class="row">
        <div class="col-100 large-66 center">

          <div class="block block-strong inset col-100 no-margin-bottom">
            <div class="breadcrumbs ">
              <div class="breadcrumbs-item">
                <a href="/" class="link">
                  Home
                </a>
              </div>    
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item">
                <a href="/admin/channel/show/${f.channel._id}" class="link">
                  ${f.channel.title}
                </a>
              </div>     
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item breadcrumbs-item-active">
                Edit Collection
              </div> 
            </div>
          </div>



          <form id="edit-channel-form" @submit="${g}">

            <${Pn} 
              channel=${f} 
              description_editor="edit-channel-description-editor"
              description_toolbar="edit-channel-description-toolbar" 
              license_editor="edit-channel-license-editor"
              license_toolbar="edit-channel-license-toolbar"  
            />

            <div class="row block">
          
              <div class="col-0 large-30"></div>

              <a href="/admin/channel/show/${f.channel._id}" class="button button-outline color-gray col-50 large-30" tabindex="12">Cancel</a>

              <button type="submit" class="button button-fill col-50 large-30" tabindex="13" id="saveButton">
                Save
              </button>

            </div>

          </form>
        </div>
      </div>

    </div>
  </div>

`}}le.id="5c463a2efd",le.style="\n";const se=le;function ce(A,{$:n,$on:e,$f7:t,$update:o}){let r;return e("pageInit",(async()=>{r=a.getWalletService(),await o()})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="admin-create-menu">

    <${Jn} />

    <div class="page-content">

      <div class="row">
        <div class="col-100 large-66 center">


          <div class="block block-strong inset col-100 no-margin-bottom">
            <div class="breadcrumbs ">
              <div class="breadcrumbs-item">
                <a href="/" class="link">
                  Home
                </a>
              </div>    
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item breadcrumbs-item-active">
                Create & Import
              </div> 
            </div>
          </div>


          

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


                ${r?.address?n`
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
                `:n`
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
  </div>

`}}ce.id="4dd4007547",ce.style="\n\n\n";const de=ce;var fe=e(48438),ge=e(33686),Ce=e(34805),pe=e.n(Ce),Be=e(20605),be=e(32046),he=e(93286),me=e(2593);let Ee=class{walletService;constructor(A){this.walletService=A}async getMintEventsForContract(A){console.log("Fetching mint transfers...");const n=await A.queryFilter({address:A.address,topics:[be.id("Transfer(address,address,uint256)"),he.$m("0x0000000000000000000000000000000000000000",32)]},0,"latest");return console.log(`Found ${n.length} events`),n}async getTokensForContract(A){let n=(await this.getMintEventsForContract(A)).map((A=>me.O$.from(A.topics[3]).toNumber())).sort(((A,n)=>A-n));return new Set(n)}};Ee=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){return function(e,t){n(e,t,A)}}(0,(0,r.f)(t.WalletService)),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[Object])],Ee);var we=e(41487),ue=e.n(we),ve=e(48764).Buffer,Qe=function(A,n){return function(e,t){n(e,t,A)}};const xe=new(pe());let Ie=class{channelService;channelWebService;queryCacheService;schemaService;itemService;itemWebService;authorService;ipfsService;imageService;animationService;themeRepository;themeService;staticPageRepository;staticPageService;ercEventService;tokenMetadataCacheRepository;walletService;contracts;constructor(A,n,e,t,a,o,r,i,l,s,c,d,f,g,C,p,B,b){this.channelService=A,this.channelWebService=n,this.queryCacheService=e,this.schemaService=t,this.itemService=a,this.itemWebService=o,this.authorService=r,this.ipfsService=i,this.imageService=l,this.animationService=s,this.themeRepository=c,this.themeService=d,this.staticPageRepository=f,this.staticPageService=g,this.ercEventService=C,this.tokenMetadataCacheRepository=p,this.walletService=B,this.contracts=b}async importFromIPFS(A,n,e){let t={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}};this.logForkProgress(t,`Starting fork of ${A}. Fetching data...`);try{await this.ipfsService.ipfs.files.rm("/fork",{recursive:!0,flush:!0})}catch(A){}await this.ipfsService.ipfs.files.cp(`/ipfs/${A}`,"/fork",{create:!0,parents:!0,flush:!0}),this.logForkProgress(t,"Processing...");let a=await this._readFile("/fork/backup/authors.json"),o=await this._readFile("/fork/backup/channels.json"),r=await this._readFile("/fork/backup/images.json"),i=await this._readFile("/fork/backup/items.json"),l=await this._readFile("/fork/backup/animations.json"),s=await this._readFile("/fork/backup/themes.json"),c=await this._readFile("/fork/backup/static-pages.json"),d=await this._readFile("/fork/contractMetadata.json"),f=new ke(this.ipfsService);if("existing"==n)return this._importExisting(a,o,r,i,l,s,c,t,f,d,A);if(e){let A=new w;A.walletAddress=e,a=[A]}return this._importAsFork(a,o,r,i,l,s,c,t,f,d,A)}async importExistingFromContract(A){return this._importFromContract(A,"existing")}async importAsForkFromContract(A){return this._importFromContract(A,"fork")}async importExistingFromReader(A,n,e){let t=await this._buildImportBundle(A);return t.channels[0].contractAddress=n,t.channels[0].localCid=e,this._importExisting(t.authors,t.channels,t.images,t.items,t.animations,t.themes,t.staticPages,t.forkStatus,t.mediaDownloader,t.contractMetadata,e)}async importAsForkFromReader(A,n,e){let t=await this._buildImportBundle(A);return delete t.channels[0].contractAddress,delete t.channels[0].localCid,t.channels[0].title=n,this._importAsFork(t.authors,t.channels,t.images,t.items,t.animations,t.themes,t.staticPages,t.forkStatus,t.mediaDownloader,t.contractMetadata,e)}async _buildImportBundle(A){let n={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}};this.logForkProgress(n,"Processing...");let e=await this._fetchFile(`${A}backup/export/backup/authors.json`),t=await this._fetchFile(`${A}backup/export/backup/channels.json`),a=await this._fetchFile(`${A}backup/export/backup/images.json`),o=await this._fetchFile(`${A}backup/export/backup/items.json`),r=await this._fetchFile(`${A}backup/export/backup/animations.json`),i=await this._fetchFile(`${A}backup/export/backup/themes.json`),l=await this._fetchFile(`${A}backup/export/backup/static-pages.json`),s=await this._fetchFile(`${A}backup/export/contractMetadata.json`);return{authors:e,channels:t,images:a,items:o,animations:r,themes:i,staticPages:l,mediaDownloader:new ye(A),forkStatus:n,contractMetadata:s}}async _importFromContract(A,n){let e={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}},t=this.walletService.wallet,a=new on.CH(A,this._getERC721ABI(),t);this.logForkProgress(e,`Fetching tokens for contract ${a.address}`);let o=await this.ercEventService.getTokensForContract(a);e.channels.total=1,e.items.total=o.size;let r=new I;r.importSuccess=!1,"existing"==n&&(r.contractAddress=A),r.forkType=n,r.title=await a.name(),r.symbol=await a.symbol(),r.sellerFeeBasisPoints=0,r.attributeOptions=[],await this.channelWebService.put(r);let i=new oA;i._id=`token_id_stats_by_channel_${r._id}`,i.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(r._id);let l,s=[];for(let A of o){this.logForkProgress(e,`Fetching metadata for #${A}`);let n=await this._getTokenMetadata(a,A);s.push(n),(n.image||n.image_url)&&e.images.total++,n.animation_url&&e.animations.total++}for(let A of s){console.time(`Importing token #${A.tokenId}`),this.logForkProgress(e,`Importing token #${A.tokenId}`);let n,t,a,o=new J,l=document.createElement("img");if(!A.image&&!A.image_url)throw new Error("No image in metadata");{let t=A.image?A.image:A.image_url,r=await this._fetchURI(t);ue()((new TextDecoder).decode(r))?n=await this.imageService.newFromSvg((new TextDecoder).decode(r)):(n=await this.imageService.newFromBuffer(r),await this.imageService.loadImage(l,r),a={width:l.width,height:l.height});try{await this.imageService.put(n)}catch(A){}o.coverImageId=n._id,e.images.saved++,this.logForkProgress(e,`Importing image ${n._id}`)}if(A.animation_url){o.coverImageAsAnimation=!1,t=await this.animationService.newFromText((new TextDecoder).decode(await this._fetchURI(A.animation_url)));try{await this.animationService.put(t)}catch(A){}e.animations.saved++,this.logForkProgress(e,`Importing animation ${t._id}`),o.animationId=t._id}else o.coverImageAsAnimation=!0;o.tokenId=A.tokenId,o.title=A.name,o.channelId=r._id,o.attributeSelections=[];for(let n of A.attributes)o.attributeSelections.push({traitType:n.trait_type,value:n.value}),this._addAttributeToChannel(n,r);o.originalJSONMetadata=A,await this.itemWebService.put({channel:r,item:o,updateQueryCache:!1,publish:!1}),i.result.count++,(!i.result.min||o.tokenId<i.result.min)&&(i.result.min=o.tokenId),(!i.result.max||o.tokenId>i.result.max)&&(i.result.max=o.tokenId),e.items.saved++,console.timeEnd(`Importing token #${A.tokenId}`)}this.logForkProgress(e,`Building query cache for channel ${r._id}`),await this.channelService.buildAttributeCounts(r._id);try{l=await this.queryCacheService.get(i._id)}catch(A){}return l&&(i._rev=l._rev),await this.queryCacheService.put(i),r.importSuccess=!0,await this.channelWebService.put(r),e.channels.saved++,this.logForkProgress(e,`Importing channel ${r._id}`),r._id}async _importAsFork(A,n,e,t,a,o,r,i,l,s,c){let d,f,g=new Map;if(!(A&&n&&e&&t))throw new Error("Invalid collection hash");i.authors.total=A.length,i.channels.total=n.length,i.images.total=e.length,i.items.total=t.length,i.animations.total=a.length,i.themes.total=o.length,i.staticPages.total=r.length,this.logForkProgress(i,"Updating totals..."),f=new I,Object.assign(f,n[0]),f.forkType="fork",f.forkedFromFeeRecipient=s.fee_recipient;for(let n of A){let A;delete n._rev,delete n._rev_tree;try{A=await this.authorService.get(n.walletAddress)}catch(A){}await this.authorService.put(Object.assign(A||new w,n)),i.authors.saved++,this.logForkProgress(i,`Inserted author ${n._id}`)}let p=`${f._id}`;delete f._id,delete f._rev,delete f._rev_tree,f.authorId=this.walletService.address?.toString(),f.authorId&&await this.authorService.insertIfNew(f.authorId),c&&(f.forkedFromCid=c),f.forkedFromId=p,await this.channelWebService.put(f),g.set(p,f._id),d=f._id,i.channels.saved++,this.logForkProgress(i,`Inserted channel ${f._id}`);let B,b=new oA;b._id=`token_id_stats_by_channel_${f._id}`,b.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(f._id);for(let A of a){A.content=await l.getAsString(`animations/${A.cid}.html`);let n=await DA.of(A.content);if(n.toString()!=A.cid)throw new Error(`Incorrect cid when importing animation. Expected: ${A.cid}, Result: ${n.toString()}`);let e=Object.assign(new C,A);try{await this.animationService.put(e)}catch(A){}i.animations.saved++,this.logForkProgress(i,`Inserted animation ${e._id}`)}for(let A of e){let n;A.generated?(A.svg=await l.getAsString(`images/${A.cid}.${A.generated?"svg":"jpg"}`),n=A.svg):(A.buffer=await l.getAsBuffer(`images/${A.cid}.${A.generated?"svg":"jpg"}`),n=new Uint8Array(A.buffer));let e=Object.assign(new G,A),t=await DA.of(n);if(t.toString()!=A.cid)throw new Error(`Incorrect cid when importing image. Expected: ${A.cid}, Result: ${t.toString()}`);try{await this.imageService.put(e)}catch(A){}i.images.saved++,this.logForkProgress(i,`Inserted image ${e._id}`)}for(let A of o){let n=A._id;delete A._id,delete A._rev,delete A._rev_tree,A.channelId=g.get(A.channelId);let e=Object.assign(new O,A);A.forkedFromId=n,await this.themeService.put(e),g.set(n,e._id),i.themes.saved++,this.logForkProgress(i,`Inserted theme ${e._id}`)}for(let A of r){let n=A._id;delete A._id,delete A._rev,delete A._rev_tree,A.channelId=g.get(A.channelId),A.forkedFromId=n;let e=Object.assign(new V,A);try{await this.staticPageService.put(e)}catch(A){}i.staticPages.saved++,this.logForkProgress(i,`Inserted static page ${e._id}`)}for(let A of t){let n=A._id;if(delete A._id,delete A._rev,delete A._rev_tree,A.channelId=g.get(A.channelId),A.content?.ops?.length>0){let n=[];for(let e of A.content.ops){if(e.insert&&e.insert.ipfsimage){let A=await this.imageService.get(e.insert.ipfsimage.cid);e.insert.ipfsimage.src=await this.imageService.getUrl(A)}n.push(e)}A.content.ops=n}if(A.themes?.length>0){let n=[];for(let e of A.themes)n.push(g.get(e));A.themes=n}A.forkedFromId=n;let e=Object.assign(new J,A);await this.itemWebService.put({channel:f,item:e,updateQueryCache:!1,publish:!1}),b.result.count++,(!b.result.min||A.tokenId<b.result.min)&&(b.result.min=A.tokenId),(!b.result.max||A.tokenId>b.result.max)&&(b.result.max=A.tokenId),i.items.saved++,this.logForkProgress(i,`Inserted item ${e._id}`)}this.logForkProgress(i,"\n        ******************************\n\n        ******************************\n\n        ******************************\n\n                Import complete\n\n        ******************************\n\n        ******************************\n\n        ******************************\n        "),this.logForkProgress(i,`Building query cache for channel ${d}`),await this.channelService.buildAttributeCounts(f._id);try{B=await this.queryCacheService.get(b._id)}catch(A){}return B&&(b._rev=B._rev),await this.queryCacheService.put(b),f.importSuccess=!0,await this.channelWebService.put(f),d}async _importExisting(A,n,e,t,a,o,r,i,l,s,c){if(!(A&&n&&e&&t))throw new Error("Invalid collection hash");let d,f;i.authors.total=A.length,i.channels.total=n.length,i.images.total=e.length,i.items.total=t.length,i.animations.total=a.length,i.themes.total=o.length,i.staticPages.total=r.length,this.logForkProgress(i,"Updating totals..."),f=Object.assign(new I,n[0]),f.forkType="existing",f.forkedFromFeeRecipient=s.fee_recipient;for(let n of A){let A;delete n._rev,delete n._rev_tree;try{A=await this.authorService.get(n.walletAddress)}catch(A){}await this.authorService.put(Object.assign(A||new w,n)),i.authors.saved++,this.logForkProgress(i,`Inserted author ${n._id}`)}delete f._rev,delete f._rev_tree;let g=await this.channelService.getLatestRevision(f._id);g&&(f._deleted=!1,f._rev=g._rev),await this.channelWebService.put(f),d=f._id,i.channels.saved++,this.logForkProgress(i,`Inserted channel ${f._id}`);let p,B=new oA;B._id=`token_id_stats_by_channel_${f._id}`,B.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(d);for(let A of a){A.content=await l.getAsString(`animations/${A.cid}.html`);let n=await DA.of(A.content);if(n.toString()!=A.cid)throw new Error(`Incorrect cid when importing animation. Expected: ${A.cid}, Result: ${n.toString()}`);let e=Object.assign(new C,A);try{await this.animationService.put(e)}catch(A){}i.animations.saved++,this.logForkProgress(i,`Inserted animation ${e._id}`)}for(let A of e){let n;A.generated?(A.svg=await l.getAsString(`images/${A.cid}.${A.generated?"svg":"jpg"}`),n=A.svg):(A.buffer=await l.getAsBuffer(`images/${A.cid}.${A.generated?"svg":"jpg"}`),n=new Uint8Array(A.buffer));let e=Object.assign(new G,A),t=await DA.of(n);if(t.toString()!=A.cid)throw new Error(`Incorrect cid when importing image. Expected: ${A.cid}, Result: ${t.toString()}`);try{await this.imageService.put(e)}catch(A){}i.images.saved++,this.logForkProgress(i,`Inserted image ${e._id}`)}for(let A of o){delete A._rev,delete A._rev_tree;let n=await this.themeRepository.getLatestRevision(A._id);n._deleted=!1,await this.themeRepository.put(Object.assign(n,A)),i.themes.saved++,this.logForkProgress(i,`Inserted theme ${n._id}`)}for(let A of r){delete A._rev,delete A._rev_tree;let n=await this.staticPageRepository.getLatestRevision(A._id);n._deleted=!1,await this.staticPageRepository.put(Object.assign(n,A)),i.staticPages.saved++,this.logForkProgress(i,`Inserted static page ${n._id}`)}for(let A of t){if(A.content?.ops?.length>0){let n=[];for(let e of A.content.ops){if(e.insert&&e.insert.ipfsimage){let A=await this.imageService.get(e.insert.ipfsimage.cid);e.insert.ipfsimage.src=await this.imageService.getUrl(A)}n.push(e)}A.content.ops=n}delete A._rev,delete A._rev_tree;let n=await this.itemService.getLatestRevision(A._id);n&&(A._deleted=!1,A._rev=n._rev),await this.itemWebService.put({channel:f,item:Object.assign(new J,A),updateQueryCache:!1,publish:!1}),B.result.count++,(!B.result.min||A.tokenId<B.result.min)&&(B.result.min=A.tokenId),(!B.result.max||A.tokenId>B.result.max)&&(B.result.max=A.tokenId),i.items.saved++,this.logForkProgress(i,`Inserted item ${A._id}`)}this.logForkProgress(i,"\n        ******************************\n\n        ******************************\n\n        ******************************\n\n                Import complete\n\n        ******************************\n\n        ******************************\n\n        ******************************\n        "),this.logForkProgress(i,`Building query cache for channel ${f._id}`),await this.channelService.buildAttributeCounts(f._id);try{p=await this.queryCacheService.get(B._id)}catch(A){}return p&&(B._rev=p._rev),await this.queryCacheService.put(B),f.importSuccess=!0,await this.channelWebService.put(f),this.logForkProgress(i,`Forking channel ${f._id} complete`),n[0]._id}_addAttributeToChannel(A,n){let e,t=n.attributeOptions.filter((n=>n.traitType==A.trait_type));t?.length>0?e=t[0]:(n.attributeOptions.push({id:(0,GA.Z)(),traitType:A.trait_type,values:[A.value]}),e=n.attributeOptions[n.attributeOptions.length-1]),e.values.includes(A.value)||e.values.push(A.value)}async _getTokenMetadata(A,n){let e,t=`${A.address}-${n}`;try{e=await this.tokenMetadataCacheRepository.get(t)}catch(A){}if(e)return console.log(`Returning cached token metadata #${n}`),e.tokenMetadata;let a=await A.tokenURI(n),o=JSON.parse((new TextDecoder).decode(await this._fetchURI(a)));return o.tokenId=n,await this.tokenMetadataCacheRepository.put({_id:t,tokenMetadata:o,dateCreated:(new Date).toJSON()}),o}async _fetchURI(A){if(xe.containsCID(A))return A=xe.convertToDesiredGateway(A,""),(0,Be.concat)(await(0,ge.Z)(this.ipfsService.ipfs.cat(A)));{let n=await ZA.Z.get(A,{responseType:"arraybuffer"});return ve.from(n.data,"binary")}}async _readFile(A){let n=await(0,fe.Z)(this.ipfsService.ipfs.files.read(A));return JSON.parse(new TextDecoder("utf-8").decode(n))}async _fetchFile(A){return(await ZA.Z.get(A)).data}logForkProgress(A,n){if("undefined"!=typeof window&&void 0!==window.document){const e=new CustomEvent("fork-progress",{detail:{forkStatus:A,message:n}});document.dispatchEvent(e)}}_getERC721ABI(){return'[\n            {\n                "inputs":[\n                   {\n                      "internalType":"string",\n                      "name":"name",\n                      "type":"string"\n                   },\n                   {\n                      "internalType":"string",\n                      "name":"symbol",\n                      "type":"string"\n                   }\n                ],\n                "stateMutability":"nonpayable",\n                "type":"constructor"\n            },\n\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "name",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "string"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_spender",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "approve",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "totalSupply",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_from",\n                  "type": "address"\n                },\n                {\n                  "name": "_to",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "transferFrom",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "decimals",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint8"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [\n                {\n                  "name": "_owner",\n                  "type": "address"\n                }\n              ],\n              "name": "balanceOf",\n              "outputs": [\n                {\n                  "name": "balance",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "symbol",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "string"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_to",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "transfer",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [\n                {\n                  "name": "_owner",\n                  "type": "address"\n                },\n                {\n                  "name": "_spender",\n                  "type": "address"\n                }\n              ],\n              "name": "allowance",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "payable": true,\n              "stateMutability": "payable",\n              "type": "fallback"\n            },\n            {\n              "anonymous": false,\n              "inputs": [\n                {\n                  "indexed": true,\n                  "name": "owner",\n                  "type": "address"\n                },\n                {\n                  "indexed": true,\n                  "name": "spender",\n                  "type": "address"\n                },\n                {\n                  "indexed": false,\n                  "name": "value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "Approval",\n              "type": "event"\n            },\n            {\n              "anonymous": false,\n              "inputs": [\n                {\n                  "indexed": true,\n                  "name": "from",\n                  "type": "address"\n                },\n                {\n                  "indexed": true,\n                  "name": "to",\n                  "type": "address"\n                },\n                {\n                  "indexed": false,\n                  "name": "value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "Transfer",\n              "type": "event"\n            },\n            {\n                "inputs":[\n                   {\n                      "internalType":"uint256",\n                      "name":"tokenId",\n                      "type":"uint256"\n                   }\n                ],\n                "name":"tokenURI",\n                "outputs":[\n                   {\n                      "internalType":"string",\n                      "name":"",\n                      "type":"string"\n                   }\n                ],\n                "stateMutability":"view",\n                "type":"function"\n             }\n             \n          ]'}};Ie=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),Qe(16,(0,r.f)(t.WalletService)),Qe(17,(0,r.f)("contracts")),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[tn,Dn,VA,dA,KA,Fn,PA,An,RA,Cn,$,zA,K,pn,Ee,eA,Object,Object])],Ie);class ke{ipfsService;basePath="/fork/";constructor(A){this.ipfsService=A}async getAsString(A){let n=await(0,fe.Z)(this.ipfsService.ipfs.files.read(`${this.basePath}${A}`));return new TextDecoder("utf-8").decode(n)}async getAsBuffer(A){return(0,fe.Z)(this.ipfsService.ipfs.files.read(`${this.basePath}${A}`))}}class ye{basePath;constructor(A){this.basePath=A}async getAsString(A){return(await ZA.Z.get(`${this.basePath}backup/export/${A}`)).data?.toString()}async getAsBuffer(A){return(await ZA.Z.get(`${this.basePath}backup/export/${A}`,{responseType:"arraybuffer"})).data}}function Fe(A,{$:n,$on:e,$f7:t,$update:o}){let r,i,l=a.getInstance(Ie),s=a.getInstance(An),c=a.getWalletService(),d=null!=s.ipfs,f=s.peerCount,g=A.cid,C=!1,p="",B="existing";e("pageInit",(async()=>{await s.init(),d=null!=s.ipfs,await o()}));const b=async A=>{A.preventDefault();let n=t.form.convertToData("#import-ipfs-hash");C=!0,o(),i=await l.importFromIPFS(n.hash,B,n.authorId),C=!1,o()};n(document).on("fork-progress",(async A=>{A.detail.message&&(p=`<p>${A.detail.message}</p>`),r=A.detail.forkStatus,C=!0,o();let e=document.getElementById("ipfs-fork-process");e&&n(e).scrollTop(e.scrollHeight)}));const h=async A=>{A.preventDefault(),B=n(A.currentTarget).val(),await o()};return n(document).on("update-peers",(async A=>{f=A.detail.count,o()})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="admin-fork">

    <${Jn} />

    <div class="page-content">

      <div class="row">
        <form class="col-100 large-66 center" @submit="${b}" id="import-ipfs-hash">

          <div class="block block-strong inset col-100 no-margin-bottom">
            <div class="breadcrumbs ">
              <div class="breadcrumbs-item">
                <a href="/" class="link">
                  Home
                </a>
              </div>    
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item">
                <a class="link" href="/admin/channel/create-menu">Create & Import</a>
              </div> 
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item breadcrumbs-item-active">
                Fork Collection From IPFS Hash
              </div> 
            </div>
          </div>

          <div class="block-title">Fork Collection From IPFS Hash</div>

          <div class="card">
            <div class="card-content card-content-padding">
              ${d?n`
                <div class="ipfs-label">
                    Status: <a href="/admin/connect">IPFS Ready</a>
                </div>
            `:n`
                <div class="ipfs-label">IPFS Initializing...</div>
            `}
            </div>
          </div>

          ${!C&!i?n`
            
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
  
  
            ${"fork"==B&&c.address?n`
              <div class="block-title block-title-small">Author</div>
  
              <div class="list no-hairlines inset">
                <ul>
                  <li class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-input-wrap">
                        <select id="collection-author" name="authorId">
                          <option value="">Original Author</option>
                          <option value="${c.address}">${c.address}</option>
                        </select>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            `:n`<span />`}
          
            
          `:n`<span />`}


          <div class="card">

            ${C?n`
              <div class="card-header">
                  Forking...
              </div>  

            `:n`<span />`}


            <div class="card-content">

              <div class="card-content card-content-padding">
   
                  
                  ${p?n`

                    ${r?n`

                      <div class="row">
                        <div class="data-table col-100 large-30">
                          <table>
                            <thead>
                              <th class="label-cell">Type</th>
                              <th class="numeric-cell">Saved</th>
                              <th class="numeric-cell">Total</th>
                            </thead>
                            <tbody>
                              <tr class="${r.authors.saved==r.authors.total&&r.authors.total>0?"complete":""}">
                                <td class="label-cell">Authors</td>
                                <td class="numeric-cell">${r.authors.saved}</td>
                                <td class="numeric-cell">${r.authors.total}</td>
                              </tr>
                              <tr class="${r.channels.saved==r.channels.total&&r.channels.total>0?"complete":""}">
                                <td class="label-cell">Channels</td>
                                <td class="numeric-cell">${r.channels.saved}</td>
                                <td class="numeric-cell">${r.channels.total}</td>
                              </tr>
                              <tr class="${r.animations.saved==r.animations.total&&r.animations.total>0?"complete":""}">
                                <td class="label-cell">Animations</td>
                                <td class="numeric-cell">${r.animations.saved}</td>
                                <td class="numeric-cell">${r.animations.total}</td>
                              </tr>

                              <tr class="${r.images.saved==r.images.total&&r.images.total>0?"complete":""}">
                                <td class="label-cell">Images</td>
                                <td class="numeric-cell">${r.images.saved}</td>
                                <td class="numeric-cell">${r.images.total}</td>
                              </tr>
                              <tr class="${r.themes.saved==r.themes.total&&r.themes.total>0?"complete":""}">
                                <td class="label-cell">Themes</td>
                                <td class="numeric-cell">${r.themes.saved}</td>
                                <td class="numeric-cell">${r.themes.total}</td>
                              </tr>
                              <tr class="${r.staticPages.saved==r.staticPages.total&&r.staticPages.total>0?"complete":""}">
                                <td class="label-cell">Static Pages</td>
                                <td class="numeric-cell">${r.staticPages.saved}</td>
                                <td class="numeric-cell">${r.staticPages.total}</td>
                              </tr>
                              <tr class="${r.items.saved==r.items.total&&r.items.total>0?"complete":""}">
                                <td class="label-cell">Items</td>
                                <td class="numeric-cell">${r.items.saved}</td>
                                <td class="numeric-cell">${r.items.total}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                    `:n`<span />`}
         

                    ${i?n`
                    
                      <div class="block row">
                        <a href="/admin/channel/show/${i}" class="button button-fill color-green" class="button button-fill col-100 large-30" tabindex="12">
                          View Collection
                        </a>  
                      </div>
                    `:n`
                      <div class="fork-output-simple" innerHTML="${p}" id="ipfs-fork-process" ></div>
                    `}
                    
                  
                  `:n`<span />`}


                  ${d&!C&!i?n`

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
                                  <input type="text" name="hash" placeholder="Enter IPFS Hash" value="${g||""}" required />
                                  <span class="input-clear-button"></span>
                                </div>
                              </div>
                            </div>
                          </a>
                        </li>
                        <li>
                          <div class="row margin">
        
                            <div class="col-0 large-30"></div>
    
                            <a href="/admin/channel/create-menu" class="button button-outline color-gray col-50 large-30" tabindex="12">
                              Cancel
                            </a>
  
                            <button type="submit" class="button button-fill col-50 large-30" tabindex="12">
                              <i class="material-icons">fork_left</i> Create Fork
                            </button>
    
              
                          </div>
                        </li>
                      </ul>
                    </div>

                      
                  `:n`
                      <p></p>
                  `}



                </div>
            </div>
          </div>


        </form>
      </div>



    </div>
  </div>

`}}Fe.id="f6d42e9c5f",Fe.style="\n  .ipfs-label,\n  .fork-label {\n      margin-top: 10px;\n      margin-bottom: 10px;\n      font-weight: bold;\n      font-size: 18px;\n  }\n\n  .fork-output {\n      border: 1px solid #cccccc;\n      font-size: 13px;\n      width: 100%;\n      max-width: 100%;\n      padding: 5px;\n      height: 300px;\n      overflow-y: scroll;\n  }\n\n  .fork-status {\n      font-size: 14px;\n      padding: 10px;\n      border: 1px solid #f1f1f1;\n  }\n\n  .fork-status .item label {\n      font-weight: bold;\n      display: inline-block;\n      width: 180px;\n  }\n\n\n\n";const De=Fe;function Ye(A,{$:n,$on:e,$f7:t,$update:o}){let r,i,l,s,c=a.getInstance(Ie),d=a.getInstance(An),f=A.contractAddress,g=!1,C="",p="existing",B=!1;e("pageInit",(async()=>{r=a.getWalletService(),i=await r.getAddress(),await d.init(),B=null!=d.ipfs,await o()}));const b=async A=>{A.preventDefault(),p=n(A.currentTarget).val(),await o()},h=async A=>{A.preventDefault();let n=t.form.convertToData("#import-fork-contract");g=!0,o();try{l="existing"==p?await c.importExistingFromContract(n.contractAddress):await c.importAsForkFromContract(n.contractAddress)}catch(A){console.log(A),t.dialog.alert(A.message,"There was an error")}g=!1,o()};return n(document).on("fork-progress",(async A=>{A.detail.message&&(C=`<p>${A.detail.message}</p>`),s=A.detail.forkStatus,g=!0,o();let e=document.getElementById("ipfs-fork-process");e&&n(e).scrollTop(e.scrollHeight)})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="admin-fork-contract">


    <${Jn} />
    <${gA} />

    <div class="page-content">

      <div class="row">
        <form class="col-100 large-66 center" @submit="${h}" id="import-fork-contract">

          <div class="block block-strong inset col-100 no-margin-bottom">
            <div class="breadcrumbs ">
              <div class="breadcrumbs-item">
                <a href="/" class="link">
                  Home
                </a>
              </div>    
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item">
                <a class="link" href="/admin/channel/create-menu">Create & Import</a>
              </div> 
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item breadcrumbs-item-active">
                Fork Collection From Contract
              </div> 
            </div>
          </div>


          <div class="block-title">Fork Collection From Contract</div>

           ${r?.address?n`
          
 
            <div class="card">
              <div class="card-content card-content-padding">
                ${B?n`
                  <div class="ipfs-label">
                      Status: <a href="/admin/connect">IPFS Ready</a>
                  </div>
              `:n`
                  <div class="ipfs-label">IPFS Initializing...</div>
              `}
              </div>
            </div>
  
            ${B&!g&!l?n`
  
              <div class="block-header">
                A <em>fork</em> is a copy of an NFT collection. Forking a project allows you to freely experiment with changes without affecting the original project.
              </div>
    
              <div class="list media-list inset">
                <ul>
                  <li>
                    <label class="item-radio item-radio-icon-start item-content">
                      <input type="radio" name="demo-media-radio" checked @change="${b}" value="existing" />
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
                      <input type="radio" name="demo-media-radio" @change="${b}" value="fork" />
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
                    <div class="block">
                      <div class="row" style="padding-bottom: 15px;">
  
                        <div class="col-0 large-30"></div>
              
                        <a href="/admin/channel/create-menu" class="button button-outline color-gray col-50 large-30" tabindex="12">
                          Cancel
                        </a>
        
                        <button type="submit" class="button button-fill col-50 large-30" tabindex="12">
                          <i class="material-icons">fork_left</i> Create Fork
                        </button>
        
         
                      </div>
                    </div>

                  </li>

                </ul>
              </div>
  
                
            `:n`
                <p></p>
            `}
  
  
  
            ${g||C?n`
  
              <div class="card">

                ${g?n`
                  <div class="card-header">
                      Forking...
                  </div>  
    
                `:n`<span />`}
    

                <div class="card-content">
                    <div class="card-content card-content-padding">
    
                      ${C?n`

                        ${s?n`

                          <div class="row">
                            <div class="data-table col-100 large-30">
                              <table>
                                <thead>
                                  <th class="label-cell">Type</th>
                                  <th class="numeric-cell">Saved</th>
                                  <th class="numeric-cell">Total</th>
                                </thead>
                                <tbody>
                                  <tr class="${s.animations.saved==s.animations.total&&s.animations.total>0?"complete":""}">
                                    <td class="label-cell">Animations</td>
                                    <td class="numeric-cell">${s.animations.saved}</td>
                                    <td class="numeric-cell">${s.animations.total?s.animations.total:"?"} </td>
                                  </tr>
                                  <tr class="${s.images.saved==s.images.total&&s.images.total>0?"complete":""}">
                                    <td class="label-cell">Images</td>
                                    <td class="numeric-cell">${s.images.saved}</td>
                                    <td class="numeric-cell">${s.images.total?s.images.total:"?"}</td>
                                  </tr>
                                  <tr class="${s.items.saved==s.items.total&&s.items.total>0?"complete":""}">
                                    <td class="label-cell">Items</td>
                                    <td class="numeric-cell">${s.items.saved}</td>
                                    <td class="numeric-cell">${s.items.total}</td>
                                  </tr>
                                  <tr class="${s.channels.saved==s.channels.total&&s.channels.total>0?"complete":""}">
                                    <td class="label-cell">Channels</td>
                                    <td class="numeric-cell">${s.channels.saved}</td>
                                    <td class="numeric-cell">${s.channels.total}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>



                        `:n`<span />`}


                        ${l?n`
                        
                          <div class="block row margin-bottom">
                            <a href="/admin/channel/show/${l}" class="button button-fill color-green" class="button button-fill col-100 large-30" tabindex="12">
                              View Collection
                            </a>  
                          </div>
                        `:n`
                          <div class="fork-output-simple" innerHTML="${C}" id="ipfs-fork-process" ></div>
                        `}


                      `:n`<span />`}
  

    
                    </div>
                </div>
    
              </div>
  
            `:n`
              <span />
            `}

          `:n`
            <div class="block-header">
              Use a web browser with wallet support to import an existing ERC-721 collection.
            </div>
          `}



        </form>
      </div>



    </div>
  </div>

`}}Ye.id="b89b1fe1ab",Ye.style="\n\n";const Me=Ye;function Ue(A,{$:n,$on:e,$f7:t,$update:o}){let r,i,l,s,c,d,f,g=a.getInstance(Ie),C=a.getInstance(An),p=a.getWalletService(),B=(C.ipfs,C.peerCount,!1),b="",h="existing",m=window.location.hash?window.location.hash.substring(window.location.hash?.indexOf("?"),window.location.hash.length):void 0;const E=new URLSearchParams(m);let w={};E.get("path")&&(w.path=decodeURIComponent(E.get("path")));const u=async A=>{try{c=await p.getAddress(),l=await x(),s=await I(),r=await k(),w.title=l.title,d=l.title}catch(A){t.dialog.alert(A,"Error loading collection. Not found.")}},v=async A=>{A.preventDefault(),w.path=n("#largeURL").val(),await u(),await o()},Q=A=>p.truncateEthAddress(A),x=async()=>(await ZA.Z.get(`${w.path}backup/export/backup/channels.json`)).data[0],I=async()=>(await ZA.Z.get(`${w.path}backup/export/backup/authors.json`)).data[0],k=async()=>{try{return(await ZA.Z.get(`${w.path}backup/contract/contract.json`)).data}catch(A){console.log(A)}};e("pageInit",(async()=>{w.path&&await u(),await o()}));const y=async A=>{A.preventDefault(),h=n(A.currentTarget).val(),await o()},F=async A=>{A.preventDefault(),d=n(A.currentTarget).val(),await o()},D=async A=>{A.preventDefault(),B=!0,o(),f="existing"==h?await g.importExistingFromReader(w.path,r.contractAddress,r.ipfsCid):await g.importAsForkFromReader(w.path,d),B=!1,o()};return n(document).on("fork-progress",(async A=>{A.detail.message&&(b=`<p>${A.detail.message}</p>`),i=A.detail.forkStatus,B=!0,o();let e=document.getElementById("ipfs-fork-process");e&&n(e).scrollTop(e.scrollHeight)})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="admin-fork-contract">

    <${Jn} reader_config=${w} />

    <div class="page-content">

      <div class="row">
        <div class="col-100 large-66 center">

          <div class="block block-strong inset col-100 no-margin-bottom">
            <div class="breadcrumbs ">
              <div class="breadcrumbs-item">
                <a href="/" class="link">
                  Home
                </a>
              </div>    
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item">
                <a class="link" href="/admin/channel/create-menu">Create & Import</a>
              </div> 
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item breadcrumbs-item-active">
                Fork Collection From Reader
              </div> 
            </div>
          </div>


          <div class="block-title">Fork Collection From Reader</div>


          ${!B&!f?n`

            ${l?n`
            
              <form class="col-100" @submit="${D}" id="import-from-reader">

                <div class="block-header">
                  A <em>fork</em> is a copy of an NFT collection. Forking a project allows you to freely experiment with changes without affecting the original project. 
                </div>
    
                <div class="list media-list inset">
                  <ul>
                    <li>
                      <label class="item-radio item-radio-icon-start item-content">
                        <input type="radio" name="demo-media-radio" checked @change="${y}" value="existing" />
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
                        <input type="radio" name="demo-media-radio" @change="${y}" value="fork" />
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
    
                ${f?n`<span />`:n`
                  <div class="block block-strong inset fork-block">
    
                    <p>Forking <a href="${w.path}" class="external">${l.title}</a></p>
      
                    <div class="repo-name">
      
                      <div class="left">
                        <strong>Author</strong>
      
                        <div class="list no-hairlines" style="margin: 0; padding-left: 0px;">
                          <ul>
                            <li class="item-content item-input" style="padding-left: 0px;">
                              <div class="item-inner">
                                <div class="item-input-wrap">
                                  <select id="collection-author">
                                    ${"existing"==h&&null!=s?n`
                                      <option value="${s._id}">${Q(s._id)} (Original Author)</option>
                                    `:n`
      
                                      ${c?n`
                                        <option value="${c}">${Q(c)}</option>
                                      `:n`
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
      
                                  ${"existing"==h?n`
                                    <div class="item-input-wrap ">
                                      ${l.title}
                                    </div>
                                  `:n`
                                    <div class="item-input-wrap ">
                                      <input type="text" value="${w.title}" @change="${F}" />
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
      
                    ${B?n`
                        <span />
                    `:n`
                      <button type="submit" class="button button-fill col-30" tabindex="12" style="margin-bottom: 10px; width: 200px;">
                        <i class="material-icons">fork_left</i> Create Fork
                      </button>
                    `}
      
                  </div>
                `}

              </form>

  
            `:n`
              
              <form class="col-100" @submit="${v}">

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
                              <input type="text" id="largeURL" placeholder="Enter URL" value="" required />
                              <span class="input-clear-button"></span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>

                    <li>
                      <div class="block">
                        <div class="row" style="padding-bottom: 15px;">

                          <div class="col-0 large-30"></div>
                
                          <a href="/admin/channel/create-menu" class="button button-outline color-gray col-50 large-30" tabindex="12">
                            Cancel
                          </a>
          
                          <button type="submit" class="button button-fill col-50 large-30" @click="${v}" tabindex="13">
                            Continue
                          </button>
          
          
                        </div>
                      </div>

                    </li>

                  </ul>
                </div>
              </form>



            `}
            
          `:n`<span />`}


          ${B||b?n`

            <div class="card">

              ${B?n`
                <div class="card-header">
                    Forking...
                </div>  

              `:n`<span />`}


              <div class="card-content">
                  <div class="card-content card-content-padding">
  
   
                    ${b?n`

                      ${i?n`
                        <div class="row">
                          <div class="data-table col-100 large-30">
                            <table>
                              <thead>
                                <th class="label-cell">Type</th>
                                <th class="numeric-cell">Saved</th>
                                <th class="numeric-cell">Total</th>
                              </thead>
                              <tbody>
                                <tr class="${i.channels.saved==i.channels.total&&i.channels.total>0?"complete":""}">
                                  <td class="label-cell">Channels</td>
                                  <td class="numeric-cell">${i.channels.saved}</td>
                                  <td class="numeric-cell">${i.channels.total}</td>
                                </tr>
                                <tr class="${i.authors.saved==i.authors.total&&i.authors.total>0?"complete":""}">
                                  <td class="label-cell">Authors</td>
                                  <td class="numeric-cell">${i.authors.saved}</td>
                                  <td class="numeric-cell">${i.authors.total}</td>
                                </tr>
                                <tr class="${i.animations.saved==i.animations.total&&i.animations.total>0?"complete":""}">
                                  <td class="label-cell">Animations</td>
                                  <td class="numeric-cell">${i.animations.saved}</td>
                                  <td class="numeric-cell">${i.animations.total}</td>
                                </tr>
  
                                <tr class="${i.images.saved==i.images.total&&i.images.total>0?"complete":""}">
                                  <td class="label-cell">Images</td>
                                  <td class="numeric-cell">${i.images.saved}</td>
                                  <td class="numeric-cell">${i.images.total}</td>
                                </tr>
                                <tr class="${i.themes.saved==i.themes.total&&i.themes.total>0?"complete":""}">
                                  <td class="label-cell">Themes</td>
                                  <td class="numeric-cell">${i.themes.saved}</td>
                                  <td class="numeric-cell">${i.themes.total}</td>
                                </tr>
                                <tr class="${i.staticPages.saved==i.staticPages.total&&i.staticPages.total>0?"complete":""}">
                                  <td class="label-cell">Static Pages</td>
                                  <td class="numeric-cell">${i.staticPages.saved}</td>
                                  <td class="numeric-cell">${i.staticPages.total}</td>
                                </tr>
                                <tr class="${i.items.saved==i.items.total&&i.items.total>0?"complete":""}">
                                  <td class="label-cell">Items</td>
                                  <td class="numeric-cell">${i.items.saved}</td>
                                  <td class="numeric-cell">${i.items.total}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      `:n`<span />`}


                      ${f?n`

                        <div class="block row margin-bottom">
                          <a href="/admin/channel/show/${f}" class="button button-fill color-green" class="button button-fill col-100 large-30" tabindex="12">
                            View Collection
                          </a>  
                        </div>
                      
                      `:n`
                        <div class="fork-output" innerHTML="${b}" id="ipfs-fork-process" ></div>
                      `}


                    `:n`<span />`}


  
                  </div>
              </div>
  
            </div>

          `:n`
            <span />
          `}
          

          </div>
      </div>



    </div>
  </div>

`}}Ue.id="91d9240a8a",Ue.style="\n\n\n\n\n\n";const Ge=Ue;function ze(A,{$:n,$on:e,$f7:t,$update:o}){let r=a.getInstance(Dn),i=A.channelViewModel;const l=async A=>{A.preventDefault();try{await r.upgrade(i.channel)}catch(A){console.log(A),t.dialog.alert(A,"There was an error")}},s=async A=>{A.preventDefault(),t.preloader.show();try{await r.regenerateItemMedia(i.channel)}catch(A){console.log(A),t.dialog.alert(A,"There was an error")}t.preloader.hide()};return e("pageInit",(async(A,n)=>{})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="admin-edit-channel">

    <${Jn} />

    <div class="page-content">

      <div class="row">
        <div class="col-100 large-66 center">

          <ul class="breadcrumb">
            <li><a href="/admin/channel/show/${i.channel._id}">${i.channel.title}</a></li>
            <li>Upgrade Collection</li>
          </ul>

          <div class="block list">

            <p>This screen is used to update a collection to the latest database structure. Currently this is a 
            diagnostic level tool and should only be used if you have backed up the data.</p>

            <p>The effect is like opening each item individually and resaving it.</p>


            <button class="button button-fill" @click="${s}">
              Regenerate Animations
            </button>

            <br />

            <button class="button button-fill" @click="${l}">
              Upgrade
            </button>

          </div>

        </div>
      </div>



    </div>
  </div>

`}}ze.id="d0272def31",ze.style="\n\n";const je=ze;var Ne=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r},Je=function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)};let Re=class{channelWebService;itemWebService;schemaService;themeService;staticPageService;footerText;constructor(A,n,e,t,a,o){this.channelWebService=A,this.itemWebService=n,this.schemaService=e,this.themeService=t,this.staticPageService=a,this.footerText=o}async app(){return new Un((async A=>({footerText:this.footerText})),Hn)}async create(){return new Un((async A=>{}),Zn)}async createMenu(){return new Un((async A=>{}),de)}async fork(){return new Un((async A=>({cid:A.query.cid})),De)}async forkContract(){return new Un((async A=>({footerText:this.footerText,contractAddress:A.query.contractAddress})),Me)}async forkReader(){return new Un((async A=>({footerText:this.footerText})),Ge)}async show(){return new Un((async A=>{await this.schemaService.loadChannel(A.params.id);let n=await this.channelWebService.get(A.params.id);return{channelViewModel:n,firstPageItems:await this.itemWebService.listByChannel(n.channel._id,H.CHUNK_SIZE,0)}}),_n)}async themes(){return new Un((async A=>{await this.schemaService.loadChannel(A.params.id);let n=await this.channelWebService.get(A.params.id);return{channelViewModel:n,themes:await this.themeService.listByChannel(n.channel._id,1e3,0)}}),te)}async staticPages(){return new Un((async A=>{await this.schemaService.loadChannel(A.params.id);let n=await this.channelWebService.get(A.params.id);return{channelViewModel:n,staticPages:await this.staticPageService.listByChannel(n.channel._id,1e3,0)}}),ie)}async edit(){return new Un((async A=>(await this.schemaService.loadChannel(A.params.id),{channelViewModel:await this.channelWebService.get(A.params.id)})),se)}async upgrade(){return new Un((async A=>(await this.schemaService.loadChannel(A.params.id),{channelViewModel:await this.channelWebService.get(A.params.id)})),je)}};function He(A,{$:n,$on:e,$f7:t,$update:o}){let r=a.getInstance(SA),i=(a.getInstance(wA),a.getInstance(Fn)),l=a.getInstance(RA);const s=async()=>{h.images=await i.getImagesFromContent({title:h.item.title,content:{ops:r.activeEditor.getContents().ops},coverImageCSS:h.item.coverImageCSS,themes:h.item.themes}),1==h.images?.length&&(h.coverImage=h.images[0]),r.activeEditor.update(),await o()},c=async A=>{let e=n(A.currentTarget).data("id"),t=h?.images.filter((A=>A.cid==e));t?.length>0&&(h.coverImage=t[0]),await o()},d=async A=>{A.preventDefault(),h.coverImage=void 0,await o()},f=async A=>{let e=n(A.currentTarget).data("id");b.filter((A=>A.id==e))[0].value=n(A.currentTarget).val(),await o()},g=async A=>{let e=n(A.currentTarget).val();h.item.themes=e,await o(),await s()},C=A=>{let e=n(A.currentTarget).val();h.item.title=e,document.dispatchEvent(new CustomEvent("load-cover-images"))},p=A=>{x=n(A.currentTarget).prop("checked"),o()};let B,b,h=A.item,m=A.editor,E=A.toolbar,w=A.themes,u=A.cancel_link,v=(h.coverImage,A.cover_image_css_editor_id),Q=A.animation_css_editor_id,x=!h.item.coverImageAsAnimation;return h&&(A=>{b=A;for(let A of b)!A.value&&A.values?.length>0&&(A.value=A.values[0])})(h.attributeSelections),n(document).on("image-selected",(async A=>{h.coverImage=await l.get(A.detail._id),await s()})),n(document).on("update-cover-image-css",(async A=>{h.item.coverImageCSS=A?.detail?.coverImageCSS,await s()})),n(document).on("load-cover-images",(async A=>{await s()})),n(document).on("ipfs-ready",(async A=>{B=!0,await o()})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div class="row">

        <input type="hidden" name="_id" value="${h?.item?._id}" />
        <input type="hidden" name="_rev" value="${h?.item?._rev}" />
        <input type="hidden" name="dateCreated" value="${h?.item?.dateCreated}" />
        <input type="hidden" name="tokenId" value="${h?.item?.tokenId}" />
        <input type="hidden" name="channelId" value="${h?.channel?._id}" />


        <div class="col-100 large-75">
            <div class="card col-100">
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
                                                @input="${C}" />
                                        </div>
                                    </div>
                                </div>
                            </li>
    
                            <li>
                                <div class="item-content item-input">
                                    <div class="item-inner post-area">
                                        <div class="item-title item-label">Content</div>
    
                                        <div id="${E}">
    
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
    
                                        <div class="editor bg-color-white text-color-black" id="${m}"></div>
                                    </div>
                                </div>
                            </li>
    
    
    
                            <li class="cover-photo-preview">
    
                                ${h?.coverImage?n`
                                <input type="hidden" name="coverImageId" value="${h?.coverImage?.cid}" />
                                `:n`
                                <input type="hidden" name="coverImageId" value="" />
                                `}
    
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">
                                            Cover Image
                                            <div class="item-footer">If there is no image in the content then an SVG cover image will be generated.</div>
                                        </div>
                                        <div class="item-input-wrap">
    
                                            ${h?.images?.length>0?n`
    
                                                ${h?.images?.map((A=>n`
                                                    <img class="cover-image-thumbnail ${A?.cid==h.coverImage?.cid||null==h.coverImage&&1==A.generated?"selected":""}  "
                                                        src="${A?.url}" data-id="${A?.cid}" @click=${c} />
                                                `))}
    
                                            `:n`
    
                                                <p>No images</p>
    
                                            `}
    
                                            <button class="button button-outline clear-button margin-bottom"
                                                @click="${d}">Clear</button>
    
                                        </div>
                                    </div>
                                </div>
    
                            </li>    
                            <li>
                                <label class="item-checkbox item-content">

                                    <input type="checkbox" checked="${!h.item.coverImageAsAnimation}" name="coverImageAsAnimation" @change="${p}" />
                                    
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

        </div>


        <div class="col-100 large-25">

            <div class="col-100 sticky row">

                <div class="card col-100">
                    <div class="card-content card-content-padding" style="background: #f1f1f1;">
                        <div class="segmented">
       
                            <a href="${u}" class="button button-outline color-gray" tabindex="12">Cancel</a>
                
                            ${B?n`
                              <button type="submit" class="button button-fill" tabindex="12">Save</button>
                            `:n`
                              <button class="button button-outline color-lightblue" tabindex="12" disabled>IPFS initializing...</button>
                            `}
                
                        </div>
                    </div>
                </div>
            </div>



            ${h.attributeSelections?.length>0?n`
            <div class="card col-100">
                <div class="card-header">Attributes</div>
                <div class="card-content">
                    <div class="list">
                        <ul>
                            ${h.attributeSelections?.map((A=>n`
                            <li>
                                <a href="#" class="item-link smart-select smart-select-init" data-open-in="popover">
                                    <!-- "multiple" attribute for multiple select-->
                                    <select @change="${f}" tabindex="2" data-id="${A?.id}">
                                        ${A?.values?.map((e=>n`

                                            ${A?.value?.toString()==e.toString()?n`
                                            <option value="${e}" selected>${e}</option>
                                            `:n`
                                            <option value="${e}">${e}</option>
                                            `}

                                        `))}
                                    </select>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-title">${A?.traitType}</div>
                                        </div>
                                    </div>
                                </a>
                            </li>


                            `))}
                        </ul>
                    </div>
                </div>
            </div>
            `:n``}




        </div>

        <div class="col-100 large-75">
            <div class="card col-100">
                <div class="card-header">Customize</div>
                <div class="card-content">
                    <div class="list">
                        <ul>
                            <li>
                                <a href="#" class="item-link smart-select smart-select-init" data-open-in="popover">
                                    <!-- "multiple" attribute for multiple select-->
                                    <select name="themes" @change="${g}" tabindex="2" multiple>
                                        <optgroup>
                                            ${w?.map((A=>n`
    
                                                ${h.item?.themes?.includes(A._id)?n`
                                                    <option value="${A._id}" selected>${A.name}</option>
                                                    `:n`
                                                    <option value="${A._id}">${A.name}</option>
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
                                    <div class="editor bg-color-white text-color-black css-editor" id="${v}" tabindex="3"></div>
                                </div>
                            </li>
    
                            ${x?n`
                                <li class="accordion-item">
                                    <a href="" class="item-link item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Edit Animation CSS (HTML)</div>
                                        </div>
                                    </a>
                                    <div class="accordion-item-content">
                                        <div class="editor bg-color-white text-color-black css-editor" id="${Q}" tabindex="4"></div>
                                    </div>
                                </li>
                            `:n`
                                <li class="accordion-item" style="display:none;">
                                    <a href="" class="item-link item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Edit Animation CSS (HTML)</div>
                                        </div>
                                    </a>
                                    <div class="accordion-item-content">
                                        <div class="editor bg-color-white text-color-black css-editor" id="${Q}" tabindex="4"></div>
                                    </div>
                                </li>
    
    
                            `}
    
    
                        
                        </ul>
                    </div>
                </div>
            </div>
        </div>




        <input type="hidden" name="attributeSelections" value="${JSON.stringify(b)}" />

    </div>




`}}Ne([Gn("/"),Je("design:type",Function),Je("design:paramtypes",[]),Je("design:returntype",Promise)],Re.prototype,"app",null),Ne([Gn("/admin/channel/create"),Je("design:type",Function),Je("design:paramtypes",[]),Je("design:returntype",Promise)],Re.prototype,"create",null),Ne([Gn("/admin/channel/create-menu"),Je("design:type",Function),Je("design:paramtypes",[]),Je("design:returntype",Promise)],Re.prototype,"createMenu",null),Ne([Gn("/admin/channel/fork"),Je("design:type",Function),Je("design:paramtypes",[]),Je("design:returntype",Promise)],Re.prototype,"fork",null),Ne([Gn("/admin/channel/fork-contract"),Je("design:type",Function),Je("design:paramtypes",[]),Je("design:returntype",Promise)],Re.prototype,"forkContract",null),Ne([Gn("/admin/channel/fork-reader"),Je("design:type",Function),Je("design:paramtypes",[]),Je("design:returntype",Promise)],Re.prototype,"forkReader",null),Ne([Gn("/admin/channel/show/:id"),Je("design:type",Function),Je("design:paramtypes",[]),Je("design:returntype",Promise)],Re.prototype,"show",null),Ne([Gn("/admin/channel/themes/:id"),Je("design:type",Function),Je("design:paramtypes",[]),Je("design:returntype",Promise)],Re.prototype,"themes",null),Ne([Gn("/admin/channel/static-pages/:id"),Je("design:type",Function),Je("design:paramtypes",[]),Je("design:returntype",Promise)],Re.prototype,"staticPages",null),Ne([Gn("/admin/channel/edit/:id"),Je("design:type",Function),Je("design:paramtypes",[]),Je("design:returntype",Promise)],Re.prototype,"edit",null),Ne([Gn("/admin/channel/upgrade/:id"),Je("design:type",Function),Je("design:paramtypes",[]),Je("design:returntype",Promise)],Re.prototype,"upgrade",null),Re=Ne([(0,o.b)(),function(A,n){return function(e,t){n(e,t,A)}}(5,(0,r.f)("footer-text")),Je("design:paramtypes",[Dn,Fn,dA,zA,pn,String])],Re),He.id="3a84a4ca9a",He.style="\n    .cover-image-thumbnail {\n        width: 250px;\n        height: 250px;\n    }\n\n    .cover-image-thumbnail.selected {\n        border: 3px solid #ff0000;\n    }\n\n    #title-header-input {\n        line-height: 30px;\n        font-size: 30px;\n        font-weight: 700;\n        height: 50px;\n    }\n\n    .clear-button {\n        width: 100px;\n    }\n";const Se=He;function We(A,{$:n,$on:e,$f7:t,$update:o}){let r,l,s=a.getInstance(SA),c=a.getInstance(wA),d=a.getInstance(i),f=a.getInstance(KA),g=(a.getInstance(RA),a.getInstance(Fn)),C=a.getInstance(An),p=a.getInstance(xn),B=(a.getWalletService(),A.itemViewModel),b=A.themes,h=!1,m=`/admin/channel/show/${B.channel._id}`;Vn.Z.configure({languages:["css"]});const E=async A=>{A.preventDefault(),await C.init(),await p.initFS(B.channel);let n=t.form.convertToData("#create-item-form"),e=Object.assign(new J,n);e.coverImageAsAnimation="on"!=n.coverImageAsAnimation[0],e.content=s.activeEditor.getContents(),e.coverImageCSS="\n"!=r.getText()?r.getText():void 0,e.animationCSS="\n"!=l.getText()?l.getText():void 0,e.attributeSelections=JSON.parse(e.attributeSelections).map((A=>({id:A.id,traitType:A.traitType,value:A.value}))),e.contentHTML=await c.translateContent(e.content,!0);let a=await g.saveGeneratedCoverImage(e);e.coverImageGenerated=a.generated,e.tokenId=await f.getNextTokenId(e.channelId),e.coverImageAsAnimation||await g.saveAnimation(e);try{d.showSpinner(),await g.put({channel:B.channel,item:e,updateQueryCache:!0,publish:!1}),t.toast.show({text:"Item created",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),t.views.main.router.navigate(`/admin/channel/show/${e.channelId}/${e.tokenId}`)}catch(A){console.log(A),t.dialog.alert(A.errors,"There was an error")}};return e("pageInit",(async(A,e)=>{s.buildQuillPostEditor("#create-item-editor","#create-item-toolbar"),s.activeEditor.root.addEventListener("blur",(function(){document.dispatchEvent(new CustomEvent("load-cover-images"))})),s.activeEditor.on("text-change",((A,n,e)=>{if(document.dispatchEvent(new CustomEvent("load-cover-images")),"user"!==e)return;const t=function(A){return A.ops.filter((A=>A.insert&&A.insert.ipfsimage)).map((A=>A.insert.ipfsimage))}(s.activeEditor.getContents().diff(n));t.forEach((A=>{B.images=B.images.filter((n=>n.cid!=A.cid)),A.cid==B.coverImage?.cid&&(B.coverImage=void 0)}))})),n(".image-button").off("click"),n(".image-button-input").off("click"),n(".image-button").on("click",(function(A){A.preventDefault(),n(".image-button-input").click()})),n(".image-button-input").on("change",(async function(A){A.preventDefault(),await s.imageSelected(this)})),r=new(QA())("#cover-image-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:A=>Vn.Z.highlightAuto(A).value},toolbar:!1}}),r.on("text-change",((A,n,e)=>{document.dispatchEvent(new CustomEvent("update-cover-image-css",{detail:{coverImageCSS:"\n"!=r.getText()?r.getText():void 0}}))})),l=new(QA())("#animation-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:A=>Vn.Z.highlightAuto(A).value},toolbar:!1}}),r.setText(".svg-h1 {}"),l.setText(".animation-container {}"),await o(),d.showSpinner(),await p.initFS(B.channel),await C.init(),h=null!=C.ipfs;const t=new CustomEvent("ipfs-ready");document.dispatchEvent(t),d.hideSpinner(),await o()})),e("pageBeforeRemove",(()=>{})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="admin-create-item">

    <${Jn} />

    <div class="page-content">

      <div class="block block-strong inset col-100 no-margin-bottom">
        <div class="breadcrumbs ">
          <div class="breadcrumbs-item">
            <a href="/" class="link">
              Home
            </a>
          </div>    
          <div class="breadcrumbs-separator"></div>
          <div class="breadcrumbs-item">
            <a href="/admin/channel/show/${B.channel._id}" class="link">
              ${B.channel.title}
            </a>
          </div>     
          <div class="breadcrumbs-separator"></div>
          <div class="breadcrumbs-item breadcrumbs-item-active">
            Create Item
          </div> 
        </div>
      </div>


      <form class="list media-list" id="create-item-form" @submit="${E}">

        <${Se} item=${B} 
          themes=${b}
          editor="create-item-editor" 
          toolbar="create-item-toolbar" 
          cover_image_css_editor_id="cover-image-css-editor"
          animation_css_editor_id="animation-css-editor"
          themes=${b}
          cancel_link=${m}
        />

      </form>


    </div>
  </div>

`}}e(69942),We.id="8d95da7084",We.style="\n  #create-item-editor {\n    min-height: 175px;\n    height: 100%;\n    /* added these styles */\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n  }\n";const Te=We;function Xe(A,{$:n,$on:e,$f7:t,$update:o}){a.getInstance(KA);let r=a.getInstance(i),l=a.getInstance(Fn),s=A.itemViewModel;s.editable,e("pageInit",(async(A,e)=>{n(`#item-content-${s.item._id} a`).addClass("external"),await o()}));const c=async A=>{try{t.dialog.confirm("Do you want to delete this item? Note: This only deletes from your device.",(async function(){await l.delete(s.item),t.toast.show({text:"Item deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),t.views.main.router.navigate(`/admin/channel/show/${s.channel._id}`)}))}catch(A){r.showExceptionPopup(A)}},d=async A=>{let n=await l.clone(s.item);t.views.main.router.navigate(`/admin/channel/${s.channel._id}/item/edit/${n._id}`)};return function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="admin-show-post">

    <${Jn} />

    ${s.editable?n`
      <div class="fab fab-extended fab-right-bottom">
        <a href="/admin/item/create/${s.channel._id}" class="text-color-black">
          <i class="material-icons">create</i>
          <div class="fab-text">Create Item</div>
        </a>
      </div>
    `:n``} 








    <div class="page-content">

      <div class="row">

        <div class="block block-strong inset col-100 no-margin-bottom">
          <div class="breadcrumbs ">
            <div class="breadcrumbs-item">
              <a href="/" class="link">
                Home
              </a>
            </div>    
            <div class="breadcrumbs-separator"></div>
            <div class="breadcrumbs-item">
              <a href="/admin/channel/show/${s.channel._id}" class="link">
                ${s.channel.title}
              </a>
            </div>     
            <div class="breadcrumbs-separator"></div>
            <div class="breadcrumbs-item breadcrumbs-item-active">
              ${s.item.title?s.item.title:`#${s.item.tokenId}`}
            </div> 

          </div>
        </div>



        <div class="col-100 large-75">

          <div class="card col-100 animation-card">
            <div class="card-content ${s.item.coverImageAsAnimation?n`card-content-padding`:n``}">

              ${s.item.coverImageAsAnimation?n`
                <div class="animation-content animation-image">
                  <img src="${s.coverImage?.url}" />
                </div>
               
              `:n`
                <div class="animation-content" innerHTML="${s.animationContentHTML}"></div>

              `}

            </div>


          </div> 



          <div class="row block">

            ${s.previous?n`
              <a class="button button-outline back-token-button margin-bottom col-50 color-gray" href="/admin/channel/show/${s.channel._id}/${s.previous}">
                <i class="icon f7-icons color-blue">arrow_left</i>
              </a>
            `:n`<span />`}

    
            ${s.next?n`
              <a class="button button-fill continue-button margin-bottom col-50" href="/admin/channel/show/${s.channel._id}/${s.next}" data-transition="f7-cover">
                Continue <i class="f7-icons">arrow_right</i>
              </a>
            `:n`<span />`}

          </div>
    



        </div>

        <div class="col-100 large-25">

          <${On} channel=${s.channel._id} item=${s} />


          ${s.previous||s.next?n`
            
            <div class="card large-only">
              <div class="card-content card-content-padding">
                <div class="segmented">

                  ${s.previous?n`
                    <a class="button button-outline" href="/admin/channel/show/${s.channel._id}/${s.previous}">
                      <i class="icon f7-icons">arrow_left</i>
                    </a>
                  `:n`
                    <a class="button button-outline" href="#"></a>
                  `}
        
                  ${s.next?n`
                    <a class="button button-outline" href="/admin/channel/show/${s.channel._id}/${s.next}" data-transition="f7-cover">
                      <i class="f7-icons">arrow_right</i>
                    </a>
                  `:n`
                    <a class="button button-outline" href="#"></a>
                  `}

                </div>
              </div>
            </div>

          `:n`<span />`}


          ${s.editable?n`
            <div class="card">
              <div class="card-header">Modify</div>
              <div class="card-content card-content-padding">

                <div class="segmented col-100">

                  <a class="button button-outline " href="/admin/channel/${s.channel._id}/item/edit/${s.item._id}" id="edit-${s.item._id}">Edit</a>
                  <a class="button button-outline " href="#" data-id="${s.item._id}" @click="${d}">Clone</a>

                  ${s.canDelete?n`
                    <a class="button button-outline" @click="${c}">
                      <i class="material-icons">delete</i>
                    </a>
                  `:n`<span/>`}

                </div>

                ${s.canDelete?n`<span />`:n`
                  <p>Note: Only the last NFT can be deleted.</p>
                `}


              </div>



            </div>          
          `:n`<span />`}
          


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

                  ${s?.authorDisplayName?n`
                    <tr>
                      <td class="label-cell">Creator:</td> 
                      <td><a href="/admin/author/show/${s?.author?._id}">${s?.authorDisplayName}</a></td>
                    </tr>  
                  `:n`<span />`}

                  <tr>
                    <td class="label-cell">Date:</td> 
                    <td><span class="date">${s.dateDisplay}</span></td>
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
                <div class="value">#${s.item.tokenId}</div>
              </div>

              ${s.attributeSelections?.map((A=>n`

                ${A.value?n`
                  <div class="button-outline attribute-value">
                    <div class="trait-type">${A.traitType}</div>
                    <div class="value">${A.value}</div>
                    <div class="category-percent">${A.categoryPercent} have this trait</div>
                  </div>
                `:n`<span />`}

              `))}

            </div>
          </div>

          ${s.themes?.length>0?n`

            <div class="card">
              <div class="card-header">Theme(s)</div>
              <div class="card-content">
                
                ${s.themes?.map((A=>n`

                  <div class="button-outline attribute-value">
                    <div class="value">${A.name}</div> <span class="theme-id">${A._id}</span>
                  </div>

                `))}
              </div>
            </div>

          `:n`<span/>`}




          ${s.item.coverImageAsAnimation?n`<span />`:n`
            <div class="card">
              <div class="card-header">Cover Image</div>
              <div class="card-content">
                <div class="square">
                  <img src="${s.coverImage?.url}" class="cover-image-preview" />
                </div>
              </div>
            </div>
           
          `}




        </div>

      </div>

    </div>

  </div>

`}}Xe.id="8c6d533aed",Xe.style="\n\n\n\n\n  /* .item-card-show a {\n    color: var(--f7-text-color);\n  } */\n\n\n  .menu-dropdown-link.menu-close {\n    color: #ffffff;\n  }\n\n\n  .attribute-row {\n    font-size: 16px;\n    vertical-align: top;\n  }\n\n  .attribute-row strong {\n    width: 175px;\n    display: inline-block;\n    vertical-align: top;\n  }\n\n\n  .attribute-row .material-icons {\n    line-height: 16px;\n    display: inline-block;\n    vertical-align: middle;\n  }\n\n  .item-show-footer {\n    font-size: 14px;\n  }\n\n  .card-header {\n    line-height: 21px;\n  }\n\n  .card-header label {\n    padding-bottom: 3px;\n    margin-left: 5px;\n    float: left;\n  }\n\n  .card-header .material-icons {\n    float: left;\n  }\n\n  .item-show-token-id {\n    color: rgb(79, 79, 79);\n  }\n\n  .cover-image-preview {\n    max-width: 100%;\n  }\n\n  .animation-preview {\n    margin-left: 5px;\n    height: 500px; \n    width: 500px;\n    max-width: 100%;\n    border: 1px solid #cccccc;\n  }\n\n\n  .nft-header-row {\n    display: flex;  \n  }\n\n  .nft-header-row .left {\n    flex: 0 0 500px;\n  }\n\n  .nft-header-row .right {\n    flex: 1;\n  }\n\n  .nft-header-row .right h1 {\n    font-size: 25px;\n  }\n\n  .nft-header-row .right h4 {\n    margin-bottom: 0px;\n  }\n\n\n\n\n\n@media only screen and (max-width: 1024px) {\n\n  .nft-header-row {\n    display: block;  \n  }\n  \n  .nft-header-row .left {\n    width: 100%;\n  }\n  \n  .nft-header-row .right {\n    width: 100%;\n  }\n  \n}\n\n\n.theme-name {\n  display: block;\n}\n\n.main-header {\n\n}\n\n\n";const qe=Xe;function Pe(A,{$:n,$on:e,$f7:t,$update:o}){let r,l,s=a.getInstance(SA),c=a.getInstance(wA),d=a.getInstance(i),f=(a.getInstance(KA),a.getInstance(Fn)),g=a.getInstance(An),C=a.getInstance(xn),p=(a.getInstance(RA),a.getWalletService(),A.itemViewModel),B=A.themes,b=!1,h=`/admin/channel/show/${p.item.channelId}/${p.item.tokenId}`;Vn.Z.configure({languages:["css"]});const m=async A=>{A.preventDefault();let n=t.form.convertToData("#edit-item-form"),e=Object.assign(new J,n);e.coverImageAsAnimation="on"!=n.coverImageAsAnimation[0],e.tokenId=parseInt(n.tokenId),e.content=s.activeEditor.getContents(),e.coverImageCSS="\n"!=r.getText()?r.getText():void 0,e.animationCSS="\n"!=l.getText()?l.getText():void 0,e.attributeSelections?e.attributeSelections=JSON.parse(e.attributeSelections).map((A=>({id:A.id,traitType:A.traitType,value:A.value}))):e.attributeSelections=[],e.contentHTML=await c.translateContent(e.content,!0);let a=await f.saveGeneratedCoverImage(e);e.coverImageGenerated=a.generated,e.coverImageAsAnimation||await f.saveAnimation(e);try{d.showSpinner(),await f.put({channel:p.channel,item:e,updateQueryCache:!0,publish:!1}),t.toast.show({text:"Item saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),t.views.main.router.navigate(`/admin/channel/show/${e.channelId}/${e.tokenId}`)}catch(A){console.log(A),t.dialog.alert(A.errors,"There was an error")}};return e("pageInit",(async(A,e)=>{s.buildQuillPostEditor("#edit-item-editor","#edit-item-toolbar"),s.activeEditor.setContents(p.item.content),s.activeEditor.on("selection-change",(A=>{document.dispatchEvent(new CustomEvent("load-cover-images"))})),s.activeEditor.on("text-change",((A,n,e)=>{if(document.dispatchEvent(new CustomEvent("load-cover-images")),"user"!==e)return;let t=s.activeEditor.getContents();const a=function(A){return A.ops.filter((A=>A.insert&&A.insert.ipfsimage)).map((A=>A.insert.ipfsimage))}(s.activeEditor.getContents().diff(n)),r=[];for(let A of a){let e=n.ops.filter((n=>n.insert&&n.insert.ipfsimage&&n.insert.ipfsimage.cid==A.cid)),a=t.ops.filter((n=>n.insert&&n.insert.ipfsimage&&n.insert.ipfsimage.cid==A.cid));e.length>0&&0==a.length&&r.push(A)}r.forEach((A=>{p.images=p.images.filter((n=>n.cid!=A.cid)),A.cid==p.coverImage?.cid&&(p.coverImage=void 0)})),o()})),n(".image-button").off("click"),n(".image-button-input").off("click"),n(".image-button").on("click",(function(A){A.preventDefault(),n(".image-button-input").click()})),n(".image-button-input").on("change",(async function(A){A.preventDefault(),await s.imageSelected(this)})),r=new(QA())("#cover-image-edit-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:A=>Vn.Z.highlightAuto(A).value},toolbar:!1}}),r.on("text-change",((A,n,e)=>{document.dispatchEvent(new CustomEvent("update-cover-image-css",{detail:{coverImageCSS:"\n"!=r.getText()?r.getText():void 0}}))})),l=new(QA())("#animation-edit-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:A=>Vn.Z.highlightAuto(A).value},toolbar:!1}}),p.item.coverImageCSS&&r.setText(p.item.coverImageCSS),p.item.animationCSS&&l.setText(p.item.animationCSS),await o(),d.showSpinner(),await C.initFS(p.channel),await g.init(),b=null!=g.ipfs;const t=new CustomEvent("ipfs-ready");document.dispatchEvent(t),d.hideSpinner(),await o()})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="admin-edit-post">

    <${Jn} />

    <div class="page-content">

      <div class="block block-strong inset col-100 no-margin-bottom">
        <div class="breadcrumbs ">
          <div class="breadcrumbs-item">
            <a href="/" class="link">
              Home
            </a>
          </div>    
          <div class="breadcrumbs-separator"></div>
          <div class="breadcrumbs-item">
            <a href="/admin/channel/show/${p.channel._id}" class="link">
              ${p.channel.title}
            </a>
          </div>     
          <div class="breadcrumbs-separator"></div>
          <div class="breadcrumbs-item">
            <a href="/admin/channel/show/${p.channel._id}/${p.item.tokenId}" class="link">
              ${p.item.title?p.item.title:`#${p.item.tokenId}`}
            </a>
          </div> 
          <div class="breadcrumbs-separator"></div>
          <div class="breadcrumbs-item breadcrumbs-item-active">
            Edit Item
          </div> 
        </div>
      </div>

      <form class="list media-list" id="edit-item-form" @submit="${m}">

        <${Se} item=${p} 
          editor="edit-item-editor" 
          toolbar="edit-item-toolbar" 
          cover_image_css_editor_id="cover-image-edit-css-editor"
          animation_css_editor_id="animation-edit-css-editor"
          themes=${B}
          cancel_link=${h}
        />


      </form>

    </div>

  </div>

`}}Pe.id="6632bed36d",Pe.style="\n  #edit-item-editor {\n    min-height: 175px;\n    height: 100%;\n    /* added these styles */\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n  }\n";const Ve=Pe;var Ke=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r},Ze=function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)};let Le=class{itemWebService;themeService;schemaService;constructor(A,n,e){this.itemWebService=A,this.themeService=n,this.schemaService=e}async create(){return new Un((async A=>{await this.schemaService.loadChannel(A.params.channelId);let n=await this.itemWebService.getNewViewModel(A.params.channelId);return{itemViewModel:n,themes:await this.themeService.listByChannel(n.channel._id,1e3,0)}}),Te)}async show(){return new Un((async A=>(await this.schemaService.loadChannel(A.params.channelId),{itemViewModel:await this.itemWebService.getNavigation(A.params.channelId,parseInt(A.params.tokenId))})),qe)}async edit(){return new Un((async A=>{await this.schemaService.loadChannel(A.params.channelId);let n=await this.itemWebService.get(A.params.id);return{itemViewModel:n,themes:await this.themeService.listByChannel(n.channel._id,1e3,0)}}),Ve)}};function Oe(A,{$:n,$on:e,$f7:t,$update:a}){let o=A.authorViewModel;return function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`
    <div class="page" data-name="profile-show">

        <${Jn} />


        <div class="page-content">

            <div class="row">
                <div class="col-100 large-66 center">

                    ${o.author._id?n`

                    <div class="block row">
                        <div class="col-20">

                            ${o.authorPhoto?n`
                                <img src="${o.authorPhoto.url}" class="profile-pic-main" />
                            `:n`
                                <i class="material-icons" id="profile-pic-not-found">person</i>
                            `}

                        </div>

                        <div class="col-80">

                            <div class="profile-name">
                                ${o.authorDisplayName}
                            </div>

                            <div class="profile-address">
                                ${o.author._id}
                            </div>

                            <p>${o.author.description}</p>

                            <div class="row">
                                <a href="/admin/author/edit/${o.author.walletAddress}"
                                    class="button button-outline button-small button-round col-20">Edit</a>
                            </div>

                        </div>
                    </div>

                    `:n`
                        <div class="block">
                            Create your Large <a href="/admin/author/edit/${o.author.walletAddress}">author profile</a>. 
                        </div>
                    `}


                </div>
            </div>

        </div>

    </div>
`}}Ke([Gn("/admin/item/create/:channelId"),Ze("design:type",Function),Ze("design:paramtypes",[]),Ze("design:returntype",Promise)],Le.prototype,"create",null),Ke([Gn("/admin/channel/show/:channelId/:tokenId"),Ze("design:type",Function),Ze("design:paramtypes",[]),Ze("design:returntype",Promise)],Le.prototype,"show",null),Ke([Gn("/admin/channel/:channelId/item/edit/:id"),Ze("design:type",Function),Ze("design:paramtypes",[]),Ze("design:returntype",Promise)],Le.prototype,"edit",null),Le=Ke([(0,o.b)(),Ze("design:paramtypes",[Fn,zA,dA])],Le),Oe.id="d9628c9cdd",Oe.style="\n    \n  .profile-pic-edit, #profile-pic--edit-not-found {\n    max-width: 300px;\n    border-radius: 50%;\n    font-size: 100px;\n    float: left;\n  }\n  \n  \n  .profile-pic-main, #profile-pic-not-found {\n    max-width: 100%;\n    border-radius: 50%;\n    font-size: 100px;\n    float: left;\n  }\n  \n  .profile-name {\n    color: var(--f7-block-title-medium-text-color);\n    font-weight: bold;\n  }\n  \n  .profile-address {\n    color: var(--f7-list-item-text-text-color);\n    font-size: 13px;\n  }\n  \n  \n  .profile-pic-wrapper {\n    width: 115px;\n    float: left;\n    padding-right: 20px;\n  }\n\n";const $e=Oe;function _e(A,{$:n,$on:e,$f7:t,$update:o}){let r=a.getInstance(qA),i=a.getInstance(RA),l=a.getInstance(PA),s=A.authorViewModel;const c=async A=>{A.preventDefault();let n=Object.assign(new w,t.form.convertToData("#edit-author-form"));try{await l.put(n),t.toast.show({text:"Profile Saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),t.views.main.router.navigate(`/admin/author/show/${n._id}`)}catch(A){console.log(A),t.dialog.alert(A.errors,"There was an error")}},d=async A=>{n("#author-photo-browse").click()},f=async A=>{let n=await r.uploadFile(document.getElementById("author-photo-browse")),e=await i.newFromBuffer(n);try{await i.put(e)}catch(A){}s.authorPhoto={cid:e.cid,url:await i.getUrl(e)},o()};return function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`
    <div class="page" data-name="profile-edit">

        <${Jn} />


        <div class="page-content">

            <div class="row">

                <div class="col-100 large-66 center">

                    <div class="block-title">Edit Profile</div>
                    <form id="edit-author-form" class="block list " @submit="${c}">

                        <input type="hidden" name="_id" value="${s.author._id}" />
                        <input type="hidden" name="_rev" value="${s.author._rev}" />

                        <input type="hidden" name="walletAddress" value="${s.author.walletAddress}" />

                        <ul>

                            <li>
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">Avatar</div>
                                        <div class="item-input-wrap">

                                            ${s.authorPhoto?n`
                                            <img class="author-photo-preview"
                                                src="${s.authorPhoto.url}" />
                                            `:n`
                                            <i class="material-icons author-photo-preview">image</i>
                                            `}

                                            <input type="button" class="button button-fill browse-file" value="Browse"
                                                @click="${d}" tabindex="4" />
                                            <input type="hidden" name="coverPhotoId"
                                                value="${s?.authorPhoto?.cid}" />
                                            <input type="file" id="author-photo-browse" style="display: none"
                                                @change="${f}" />

                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">Name</div>
                                        <div class="item-input-wrap">
                                            <input type="text" name="name" value="${s.author.name}" placeholder="Enter your name" tabindex="1" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">Description</div>
                                        <div class="item-input-wrap">
                                            <textarea name="description" placeholder="Enter a short bio" tabindex="2">${s.author.description}</textarea>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </ul>


                        <div class="row block">
          
                            <div class="col-0 large-30"></div>
              
                            <a href="/" class="button button-outline color-gray col-50 large-30" tabindex="12">Cancel</a>
              
                            <button type="submit" class="button button-fill col-50 large-30" tabindex="13">
                              Save
                            </button>
              
                          </div>


                    </form>

                </div>
            </div>

        </div>

    </div>
`}}_e.id="d55767d8c1",_e.style="\n    .author-photo-preview {\n        max-width: 100%;\n        max-height: 200px;\n        border: 1px solid #cccccc;\n        padding: 5px;\n        margin-bottom: 10px;\n    }\n";const At=_e;var nt=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r},et=function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)};let tt=class{authorWebService;constructor(A){this.authorWebService=A}async show(){return new Un((async A=>{let n;try{n=await this.authorWebService.get(A.params.id)}catch(A){}return console.log(n),n||(n=Object.assign(new w,{author:{walletAddress:A.params.id}})),{authorViewModel:n}}),$e)}async edit(){return new Un((async A=>{let n;try{n=await this.authorWebService.get(A.params.id)}catch(A){}return n||(n=Object.assign(new w,{author:{walletAddress:A.params.id}})),{authorViewModel:n}}),At)}};function at(A,{$:n,$on:e,$f7:t,$update:o}){let r=a.getInstance(LA),i=a.getInstance(An),l=A.settings;const s=async A=>{A.preventDefault();let n=t.form.convertToData("#edit-settings-form"),e={_id:n._id,_rev:n._rev,ipfsHost:n.ipfsHost,defaultGitProvider:n.gitProvider,gitCorsProxy:n.gitCorsProxy,gitProviders:{gitlab:{name:"gitlab",username:n.gitLabUsername,personalAccessToken:n.gitLabPersonalAccessToken},github:{name:"github",username:n.gitHubUsername,personalAccessToken:n.gitHubPersonalAccessToken}}};try{let A=Object.assign(new D,e);await r.put(A),l?.ipfsHost!=A?.ipfsHost&&await i.clearInit(),t.toast.show({text:"Settings Saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"}),t.views.main.router.navigate("/")}catch(A){console.log(A.errors),t.dialog.alert(A,"Saving settings failed")}},c=async A=>{l.gitProvider=n(A.currentTarget).val(),await o()};return e("pageInit",(async A=>{})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div class="page" data-name="admin-settings">

        <${Jn} />

        <div class="page-content">
            <div class="row">
                
                <form id="edit-settings-form" @submit="${s}" class="col-100 large-66 center">
                
                    <div class="block block-strong inset col-100 no-margin-bottom">
                        <div class="breadcrumbs ">
                          <div class="breadcrumbs-item">
                            <a href="/" class="link">
                              Home
                            </a>
                          </div>    
                          <div class="breadcrumbs-separator"></div>
                          <div class="breadcrumbs-item breadcrumbs-item-active">
                            Settings
                          </div> 
                        </div>
                    </div>


                    <input type="hidden" name="_id" value="${l?._id}" />
                    <input type="hidden" name="_rev" value="${l?._rev}" />

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
                                                <input type="text" name="ipfsHost" value="${l?.ipfsHost}" placeholder="http://localhost:5001/api/v0" />
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
    
                    <div class="card">
                        <div class="card-header">Git CORS Proxy</div>
                        <div class="card-content card-content-padding">

                            <p>
                                Configure a <a href="https://github.com/isomorphic-git/cors-proxy" class="external">proxy</a> to solve CORS issues when pushing to GitHub and GitLab. 
                            </p>

                            <div class="list">
                                <ul>
                                    <li class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">URL</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="gitCorsProxy" value="${l?.gitCorsProxy}" placeholder="http://localhost:5000" />
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
                                                        
                                                        ${l?.defaultGitProvider&&"github"!=l?.defaultGitProvider?n`
                                                            <option value="github">GitHub</option>
                                                        `:n`
                                                            <option value="github" selected>GitHub</option>
                                                        `}


                                                        ${"gitlab"==l?.defaultGitProvider?n`
                                                            <option value="gitlab" selected>GitLab</option>
                                                        `:n`
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
                                <li>Create a <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" class="external" target="_blank">"Personal access token"</a> and 
                                    save it below.</li>
                                <li>If you are logged into GitHub <a href="https://github.com/settings/personal-access-tokens/new" class="external" target="_blank">this link</a> will
                                    take you directly to the create form. </li>
    
                            </ol>

                            <p>Give the token a name and select an expiration date.</p>

                            <ul>
                                <li>Select "All Repositories" under "Repository Access".</li>
                                <li>Under "Repository Permissions" chooose:</li>
                                <li>"Administration" - read and write access.</li>
                                <li>"Content" - read and write access.</li>
                            </ul>  

    
    
                            <div class="list">
    
                                <ul>
                                    <li>
                                        <div class="item-content item-input">
                                            <div class="item-inner">
                                                <div class="item-title item-label">Username (NOT email)</div>
                                                <div class="item-input-wrap">
                                                    <input type="text" name="gitHubUsername" placeholder="Username"
                                                        value="${l.gitProviders?.github?.username}"  />
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
                                                        value="${l.gitProviders?.github?.personalAccessToken}"  />
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
                                                        value="${l.gitProviders?.gitlab?.username}"  />
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
                                                        value="${l.gitProviders?.gitlab?.personalAccessToken}"  />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>

                        </div>
                    </div>



                    <div class="row block">
          
                        <div class="col-0 large-30"></div>
          
                        <a href="/" class="button button-outline color-gray col-50 large-30" tabindex="12">Cancel</a>
          
                        <button type="submit" class="button button-fill col-50 large-30" tabindex="13" id="saveButton">
                          Save
                        </button>
          
                      </div>


    
                </form>
            </div>

        </div>

    </div>

`}}nt([Gn("/admin/author/show/:id"),et("design:type",Function),et("design:paramtypes",[]),et("design:returntype",Promise)],tt.prototype,"show",null),nt([Gn("/admin/author/edit/:id"),et("design:type",Function),et("design:paramtypes",[]),et("design:returntype",Promise)],tt.prototype,"edit",null),tt=nt([(0,o.b)(),et("design:paramtypes",[Yn])],tt),at.id="6c3df802a1",at.style="\n\n\n";const ot=at;var rt=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r},it=function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)};let lt=class{settingsService;constructor(A){this.settingsService=A}async show(){return new Un((async A=>{let n;try{n=await this.settingsService.get()}catch(A){}return n||(n=Object.assign(new D,{personalAccessToken:""})),{settings:n}}),ot)}};rt([Gn("/admin/settings"),it("design:type",Function),it("design:paramtypes",[]),it("design:returntype",Promise)],lt.prototype,"show",null),lt=rt([(0,o.b)(),it("design:paramtypes",[LA])],lt);var st=function(A,n){return function(e,t){n(e,t,A)}};let ct=class{channelService;itemService;ipfsService;imageService;exportService;gitService;walletService;contracts;constructor(A,n,e,t,a,o,r,i){this.channelService=A,this.itemService=n,this.ipfsService=e,this.imageService=t,this.exportService=a,this.gitService=o,this.walletService=r,this.contracts=i}async publish(A,n,e){this.logPublishProgress(void 0,"Preparing export...");let t=await this.exportService.prepareExport(A,this.walletService.address),a=await this._getFeeReceipient(t);this.logPublishProgress(void 0,`Fee Recipient: ${a}`),this.logPublishProgress(void 0,"Preparing backup...");let o=await this.exportService.createBackup(t);this.logPublishProgress(void 0,"Backup created. Initializing git..."),await this.gitService.init(A),this.logPublishProgress(void 0,"Git initialized. Exporting...");let r=await this.export(t,o,a,n,e);Object.assign(A,await this.channelService.get(A._id)),A.localCid=r,A.localPubDate=(new Date).toJSON(),await this.channelService.put(A)}async export(A,n,e,t=!0,a=!0){let o=!0,r=this.getIPFSDirectory(A.channel),i=this.gitService.getBaseDir(A.channel),l={contractMetadata:{saved:0,total:1},nftMetadata:{saved:0,total:a?A.items.length:0},images:{saved:0,total:t?A.images.length:0},animations:{saved:0,total:t?A.animations.length:0},backups:{channels:{saved:0,total:1},authors:{saved:0,total:1},items:{saved:0,total:n.items.length},images:{saved:0,total:A.images.length},animations:{saved:0,total:A.animations.length},themes:{saved:0,total:n.themes.length},staticPages:{saved:0,total:n.staticPages.length}}};this.logPublishProgress(l),t&&(await this._publishImages(l,r,i,A.images,!0),await this._publishAnimations(l,r,i,A.animations,!0));let s=await this.getImageDirectoryCid(r),c=await this.getAnimationDirectoryCid(r);a&&await this._publishNFTMetadata(l,r,i,A.channel,A.items,c,s,!0);let d=`${r}/contractMetadata.json`,f=await this.channelService.exportContractMetadata(A.channel,e,s);await this.ipfsService.ipfs.files.write(d,(new TextEncoder).encode(JSON.stringify(f)),{create:!0,parents:!0,flush:o}),await this.gitService.writeFile(`${i}/backup/export/contractMetadata.json`,(new TextEncoder).encode(JSON.stringify(f)));let g=await this.ipfsService.ipfs.files.stat(d);l.contractMetadata.saved=1,this.logPublishProgress(l,`Saving contract metadata to ${d} (${g.cid})`),await this.ipfsService.ipfs.files.write(`${r}/backup/channels.json`,(new TextEncoder).encode(JSON.stringify(n.channels)),{create:!0,parents:!0,flush:o}),await this.gitService.writeFile(`${i}/backup/export/backup/channels.json`,(new TextEncoder).encode(JSON.stringify(n.channels))),l.backups.channels.saved=1,this.logPublishProgress(l),await this.ipfsService.ipfs.files.write(`${r}/backup/authors.json`,(new TextEncoder).encode(JSON.stringify(n.authors)),{create:!0,parents:!0,flush:o}),await this.gitService.writeFile(`${i}/backup/export/backup/authors.json`,(new TextEncoder).encode(JSON.stringify(n.authors))),l.backups.authors.saved=1,this.logPublishProgress(l),await this.ipfsService.ipfs.files.write(`${r}/backup/items.json`,(new TextEncoder).encode(JSON.stringify(n.items)),{create:!0,parents:!0,flush:o}),await this.gitService.writeFile(`${i}/backup/export/backup/items.json`,(new TextEncoder).encode(JSON.stringify(n.items))),l.backups.items.saved=n.items.length,this.logPublishProgress(l),await this.ipfsService.ipfs.files.write(`${r}/backup/images.json`,(new TextEncoder).encode(JSON.stringify(n.images)),{create:!0,parents:!0,flush:o}),await this.gitService.writeFile(`${i}/backup/export/backup/images.json`,(new TextEncoder).encode(JSON.stringify(n.images))),l.backups.images.saved=n.images.length,this.logPublishProgress(l),await this.ipfsService.ipfs.files.write(`${r}/backup/animations.json`,(new TextEncoder).encode(JSON.stringify(n.animations)),{create:!0,parents:!0,flush:o}),await this.gitService.writeFile(`${i}/backup/export/backup/animations.json`,(new TextEncoder).encode(JSON.stringify(n.animations))),l.backups.animations.saved=n.animations.length,this.logPublishProgress(l),await this.ipfsService.ipfs.files.write(`${r}/backup/themes.json`,(new TextEncoder).encode(JSON.stringify(n.themes)),{create:!0,parents:!0,flush:o}),await this.gitService.writeFile(`${i}/backup/export/backup/themes.json`,(new TextEncoder).encode(JSON.stringify(n.themes))),l.backups.themes.saved=n.themes.length,this.logPublishProgress(l),await this.ipfsService.ipfs.files.write(`${r}/backup/static-pages.json`,(new TextEncoder).encode(JSON.stringify(n.staticPages)),{create:!0,parents:!0,flush:o}),await this.gitService.writeFile(`${i}/backup/export/backup/static-pages.json`,(new TextEncoder).encode(JSON.stringify(n.staticPages))),l.backups.staticPages.saved=n.staticPages.length,this.logPublishProgress(l),this.logPublishProgress(l,"Flushing to IPFS..."),await this.ipfsService.ipfs.files.flush(`/export/${A.channel._id}/`);let C=await this.ipfsService.ipfs.files.stat(`/export/${A.channel._id}/`,{hash:!0});return this.logPublishProgress(l,`Published to local IPFS at ${C.cid.toString()}`),C.cid.toString()}getIPFSDirectory(A){return`/export/${A._id}`}async getAnimationDirectoryCid(A){let n;try{n=(await this.ipfsService.ipfs.files.stat(`${A}/animations/`,{hash:!0})).cid.toString()}catch(A){}return n}async getImageDirectoryCid(A){let n;try{n=(await this.ipfsService.ipfs.files.stat(`${A}/images/`,{hash:!0})).cid.toString()}catch(A){}return n}async _getFeeReceipient(A){let n;return"existing"==A.channel.forkType?A.channel.forkedFromFeeRecipient&&(n=A.channel.forkedFromFeeRecipient):n=A.ownerAddress,n}async _publishAnimations(A,n,e,t,a){this.logPublishProgress(A,`Exporting ${t.length} animations`);for(let o of t){let t,r=`${n}/animations/${o.cid}.html`,i={content:o.content};try{t=await this.ipfsService.ipfs.files.stat(r,{hash:!0})}catch(A){}if(t?.cid.toString())this.logPublishProgress(A,`${r} already exists. Skipping...`);else{const t=await this.ipfsService.ipfs.add(i);if(await this.ipfsService.ipfs.files.cp(`/ipfs/${t.cid.toString()}`,r,{parents:!0,flush:a}),await this.gitService.writeFile(`${e}/backup/export/animations/${o.cid}.html`,i.content),t.cid.toString()!==o.cid.toString())throw new Error(`Incorrect cid when saving animation. Expected: ${o.cid}, Result: ${t.cid.toString()}`);this.logPublishProgress(A,`Saving animation #${A.animations.saved} to ${n}/animations/${o.cid}.html (${o.cid})`)}A.animations.saved++}}async _publishImages(A,n,e,t,a){for(let o of t){let t,r=`${n}/images/${o.cid}.${o.buffer?"jpg":"svg"}`;try{t=await this.ipfsService.ipfs.files.stat(r,{hash:!0})}catch(A){}if(t?.cid.toString())this.logPublishProgress(A,`${r} already exists. Skipping...`);else{const n=await this.ipfsService.ipfs.add({content:await this.imageService.getImageContent(o)});if(await this.ipfsService.ipfs.files.cp(`/ipfs/${n.cid.toString()}`,r,{create:!0,parents:!0,flush:a}),n.cid.toString()!=o.cid)throw new Error(`Incorrect cid when saving image. Expected: ${o.cid}, Result: ${n.cid.toString()}`);await this.gitService.writeFile(`${e}/backup/export/images/${o.cid}.${o.buffer?"jpg":"svg"}`,await this.imageService.getImageContent(o)),this.logPublishProgress(A,`Saving image to ${r} (${o.cid})`)}A.images.saved++}}async _publishNFTMetadata(A,n,e,t,a,o,r,i){this.logPublishProgress(A,`Exporting ${a.length} metadata files`);let l={};for(let s of a){let a,c=`${n}/metadata/${s.tokenId}.json`,d=await this.imageService.get(s.coverImageId),f=await this.itemService.exportNFTMetadata(t,s,d,o,r),g=(new TextEncoder).encode(JSON.stringify(f)),C=await DA.of(g);l[C]=f;try{a=await this.ipfsService.ipfs.files.stat(c,{hash:!0})}catch(A){}if(a?.cid.toString()!=C){const A=await this.ipfsService.ipfs.add({content:g});let n=l[A.cid.toString()];await this.ipfsService.ipfs.files.cp(`/ipfs/${A.cid.toString()}`,c,{create:!0,parents:!0,flush:i}),await this.gitService.writeFile(`${e}/backup/export/metadata/${n.tokenId}.json`,g)}else this.logPublishProgress(A,`${c} already exists. Skipping...`);A.nftMetadata.saved++,this.logPublishProgress(A,`Saving #${s.tokenId} to ${c}`)}}async deployContract(A){if(!A.localCid)throw new Error("Not published to Pinata");let n=await this.channelService.countItemsByChannel(A._id);if(n<=0)throw new Error("No NFTs");let e=Xn.vz(A.mintPrice,"ether"),t=await this.deploy(A.title,A.symbol,A.localCid,e.toString(),n);A.contractAddress=t.contractAddress,await this.channelService.put(A)}async deploy(A,n,e,t,a){if(!(A&&n&&t&&a&&e))throw new Error("Missing inputs to deploy");let o=this.walletService.wallet;if(!o)throw new Error("No wallet!");const r=this.contracts.Channel,i=new on.lV(r.abi,r.bytecode,o);return(await i.deploy(A,n,e,me.O$.from(t.toString()),me.O$.from(a.toString()))).deployTransaction.wait()}logPublishProgress(A,n){if(n&&console.log(n),"undefined"!=typeof window&&void 0!==window.document){const e=new CustomEvent("publish-progress",{detail:{publishStatus:A,message:n}});document.dispatchEvent(e)}}};function dt(A,{$:n,$on:e,$f7:t,$update:o}){let r=a.getInstance(i),l=a.getInstance(An),s=A.peers,c=A.peerCount,d=A.addresses;const f=async A=>{console.log("Add peer submit"),document.getElementById("peerAddressInput").setCustomValidity("");let n=document.getElementById("peerAddressInput").value;if(n)try{await l.ipfs.swarm.connect(n),r.showPopup(`Successfully connected to peer ${n}`),console.log("Connected to peer")}catch(A){r.showExceptionPopup(A)}};return n(document).on("update-peers",(async A=>{s=A.detail.peers,c=A.detail.count,d=A.detail.addresses,o()})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div class="page" data-name="connect">

        <${Jn} />


        <div class="page-content">

            <div class="row">
                <div class="col-100 tablet-50 center">

                    <div class="block-title">IPFS Addresses
                    </div>
                    <div class="block list media-list peer-list">
                        <ul>
                            ${d?.map((A=>n`
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-subtitle no-wrap">
                                            ${A}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            `))}
                        </ul>
                    </div>

                    <div class="block-title">IPFS Peers <span class="badge peers-badge color-blue">${c}</span>
                    </div>
                    <div class="block list media-list peer-list">
                        <ul>
                            ${s?.map((A=>n`
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-subtitle no-wrap">
                                            ${A}
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
                                            <button class="button button-fill text-color-black" value="Add Peer" @click=${f}>Add Peer</button>
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

`}}ct=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),st(6,(0,r.f)(t.WalletService)),st(7,(0,r.f)("contracts")),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[tn,KA,An,RA,Bn,xn,Object,Object])],ct),dt.id="74cb23b328";const ft=dt;var gt=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r},Ct=function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)};let pt=class{ipfsService;constructor(A){this.ipfsService=A}async show(){return new Un((async A=>{if(!this.ipfsService.ipfs)return{};let n=await this.ipfsService.ipfs.swarm.peers(),e=await this.ipfsService.ipfs.id();return{peers:n.map((A=>A.addr.toString())),peerCount:n.length,addresses:e?.addresses?.map((A=>A.toString()))}}),ft)}};function Bt(A,{$:n,$h:e,$on:t,$f7:o,$update:r}){let i,l=A.channelViewModel;return t("pageInit",(async(A,n)=>{i=a.getWalletService(),await r()})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div class="page" data-name="publish">
  
      <${Jn} />
  
      <div class="page-content">
        <div class="row">
  
          <div class="col-100 large-50 center">

            <div class="block block-strong inset col-100 no-margin-bottom">
              <div class="breadcrumbs ">
                <div class="breadcrumbs-item">
                  <a href="/" class="link">
                    Home
                  </a>
                </div>    
                <div class="breadcrumbs-separator"></div>
                <div class="breadcrumbs-item">
                  <a href="/admin/channel/show/${l.channel._id}" class="link">
                    ${l.channel.title}
                  </a>
                </div>     
                <div class="breadcrumbs-separator"></div>
                <div class="breadcrumbs-item breadcrumbs-item-active">
                  Publish
                </div> 
              </div>
            </div>





            ${l.itemCount>0?n`
              
              <div class="block-title block-title-medium">Git</div>
              <div class="block list media-list">
                <ul>
                  <li>
                    <a href="/admin/publish/fork-reader/${l.channel._id}" class="item-link">
                      <div class="item-content">
                        <div class="item-media">
                          <span class="material-icons">fork_left</span>
                        </div>
                        <div class="item-inner">
                          <div class="item-title-row">
                            <div class="item-title">Create Git Repository</div>
                          </div>
                          <div class="item-text">
                            Create a remote git repository for the collection.
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              <div class="block-title block-title-medium">IPFS</div>

              <div class="block list media-list">
                <ul>
                  <li>
                    <a href="/admin/publish/export/${l.channel._id}" class="item-link">
                      <div class="item-content">
                        <div class="item-media">
                          <span class="material-icons">import_export</span>
                        </div>
                        <div class="item-inner">
                          <div class="item-title-row">
                            <div class="item-title">Export</div>
                          </div>
                          <div class="item-text">
                            Export collection data to IPFS and the local git repo.
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>

                  <!-- <li>
                    <a href="/admin/publish/pinata/${l.channel._id}" class="item-link">
                      <div class="item-content">
                        <div class="item-media">
                          <span class="material-icons">cloud_upload</span>
                        </div>
                        <div class="item-inner">
                          <div class="item-title-row">
                            <div class="item-title">Publish to Pinning Service</div>
                          </div>
                          <div class="item-text">
                            When you are ready to publish your collection and deploy your NFT contract, upload the NFT metadata to commercial hosting 
                            to help make it widely available. This will help make it discoverable by marketplaces like OpenSea and LooksRare.
                          </div>
                        </div>
                      </div>
                    </a>
                  </li> -->

                </ul>
              </div>


              <div class="block-title block-title-medium">Contract (optional)</div>

              ${i?.address?n`
                
                <div class="block list media-list">
                  <ul>
                    <li>
                      <a href="/admin/publish/contract/${l.channel._id}" class="item-link">
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

              `:n`
                <div class="block-header">
                  Note: Use a web browser with wallet support to deploy an ERC-721 smart contract.
                </div>
              `}

              



              <div class="block-title block-title-medium">Large Reader</div>
              <div class="block list media-list">
                <ul>

                  <li>
                    <a href="/admin/publish/publish-reader/${l.channel._id}" class="item-link">
                      <div class="item-content">
                        <div class="item-media">
                          <span class="material-icons">upload</span>
                        </div>
                        <div class="item-inner">
                          <div class="item-title-row">
                            <div class="item-title">Push exported collection to Git</div>
                          </div>
                          <div class="item-text">
                            Push data from local git repository to remote provider. This will also kickstart a GitLab CI build to generate
                            the Large Reader website for the collection.
                          </div>
                        </div>

                      </div>
                    </a>
                  </li>

                </ul>
              </div>







            `:n`
              <div class="card">
                <div class="card-content card-content-padding">
                  <p>Add NFTs to the collection before publishing.</p>
                </div>
              </div>
              
            `}

          </div>
  
        </div>
      </div>
  
    </div>
  
  `}}gt([Gn("/admin/connect"),Ct("design:type",Function),Ct("design:paramtypes",[]),Ct("design:returntype",Promise)],pt.prototype,"show",null),pt=gt([(0,o.b)(),Ct("design:paramtypes",[An])],pt),Bt.id="14af47104b";const bt=Bt;function ht(A,{$:n,$h:e,$on:t,$f7:o,$update:r}){let i,l=a.getInstance(tn),s=(a.getInstance(nn),a.getInstance(An)),c=(a.getInstance(bA),a.getInstance(En),a.getInstance(ct)),d=A.channelViewModel,f=A.settings,g=s.peerCount,C=!1,p="",B=null!=s.ipfs,b=d.channel.localCid?.length>0,h=!1,m=!1,E=d.itemCount>0,w=d?.gitProvider?.personalAccessToken?.length>0,u=f.gitCorsProxy?.length>0,v=E&&w&&u;t("pageInit",(async()=>{h=!1,await s.init(),B=null!=s.ipfs,await r()})),t("pageAfterOut",((A,n)=>{console.log("Unloading page"),h=!0}));const Q=async A=>{A.preventDefault();let n=o.form.convertToData("#export-form"),e="on"==n.exportMedia[0],t="on"==n.exportMetadata[0];b=!1,C=!0,await r();let a=document.getElementsByClassName("publish-label")[0];o.preloader.showIn(a);try{await c.publish(d.channel,e,t),d.channel=await l.get(d.channel._id)}catch(A){console.log(A),o.dialog.alert(A.errors,"There was an error")}o.preloader.hideIn(a),C=!1,b=!0,m=!0,await r()};return n(document).on("publish-progress",(async A=>{A.detail.message&&(p=`<p>${A.detail.message}</p>`),i=A.detail.publishStatus,r();let e=document.getElementById("ipfs-publish-process");e&&n(e).scrollTop(e.scrollHeight)})),n(document).on("update-peers",(async A=>{g=A.detail.count,r()})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div class="page" data-name="publish">

        <${Jn} />

        <div class="page-content">
            <div class="row">

                <div class="col-100 large-50 center">

                    <div class="block block-strong inset col-100 no-margin-bottom">
                        <div class="breadcrumbs ">
                          <div class="breadcrumbs-item">
                            <a href="/" class="link">
                              Home
                            </a>
                          </div>    
                          <div class="breadcrumbs-separator"></div>
                          <div class="breadcrumbs-item">
                            <a href="/admin/channel/show/${d.channel._id}" class="link">
                              ${d.channel.title}
                            </a>
                          </div>     
                          <div class="breadcrumbs-separator"></div>
                          <div class="breadcrumbs-item">
                            <a class="link" href="/admin/publish/${d.channel._id}">Publish</a>
                          </div> 
                          <div class="breadcrumbs-separator"></div>
                          <div class="breadcrumbs-item breadcrumbs-item-active">
                            Export To IPFS
                          </div> 
                        </div>
                    </div>


                    ${v?n`

                        <div class="block-title">Export</div>
                        <div class="card">

                            <div class="card-content">
                                <form class="card-content card-content-padding" @submit="${Q}" id="export-form">
                                    
                                    <p>
                                        Export the JSON metadata for the collection and a snapshot of the source database to the IPFS node and a local git repository.
                                    </p>


                                    
                                    ${d?.gitProvider?.personalAccessToken?.length>0?n`

                                        ${B?n`
                                            <div class="ipfs-label">
                                                Status: <a href="/admin/connect">IPFS Ready</a>
                                            </div>
                                        `:n`
                                            <div class="ipfs-label">IPFS Initializing...</div>
                                        `}


                                        ${C?n`
                                            <div class="publish-label">
                                                Exporting...
                                            </div>
        
                                            ${i?n`
        
                                                <div class="row">
                                                    <div class="col-100 margin-top"><strong>NFT Data</strong></div>
                                                    <div class="data-table col-100 large-50">
                                                    <table>
                                                        <thead>
                                                        <th class="label-cell">Type</th>
                                                        <th class="numeric-cell">Saved</th>
                                                        <th class="numeric-cell">Total</th>
                                                        </thead>
                                                        <tbody>
                                                        <tr class="${i.images.saved==i.images.total&&i.images.total>0?"complete":""}">
                                                            <td class="label-cell">Images</td>
                                                            <td class="numeric-cell">${i.images.saved}</td>
                                                            <td class="numeric-cell">${i.images.total}</td>
                                                        </tr>
                                                        <tr class="${i.animations.saved==i.animations.total&&i.animations.total>0?"complete":""}">
                                                            <td class="label-cell">Animations</td>
                                                            <td class="numeric-cell">${i.animations.saved}</td>
                                                            <td class="numeric-cell">${i.animations.total}</td>
                                                        </tr>
                                                        <tr class="${i.nftMetadata.saved==i.nftMetadata.total&&i.nftMetadata.total>0?"complete":""}">
                                                            <td class="label-cell">NFT Metadata</td>
                                                            <td class="numeric-cell">${i.nftMetadata.saved}</td>
                                                            <td class="numeric-cell">${i.nftMetadata.total}</td>
                                                        </tr>
                                                        
                                                        </tbody>
                                                    </table>

                                                    </div>
                                                </div>

                                                <div class="col-100" style="margin-top: 40px;"><strong>Database Backup</strong></div>
                                                <div class="row">
                                                    <div class="data-table col-100 large-50">
                                                        <table>
                                                            <thead>
                                                            <th class="label-cell">Type</th>
                                                            <th class="numeric-cell">Total</th>
                                                            </thead>
                                                            <tbody>
                                                            <tr class="${i.contractMetadata.saved==i.contractMetadata.total&&i.contractMetadata.total>0?"complete":""}">
                                                                <td class="label-cell">Contract Metadata</td>
                                                                <td class="numeric-cell">${i.contractMetadata.total}</td>
                                                            </tr>
                                                            <tr class="${i.backups.items.saved==i.backups.items.total&&i.backups.items.total>0?"complete":""}">
                                                                <td class="label-cell">Items</td>
                                                                <td class="numeric-cell">${i.backups.items.total}</td>
                                                            </tr>
                                                            <tr class="${i.backups.images.saved==i.backups.images.total&&i.backups.images.total>0?"complete":""}">
                                                                <td class="label-cell">Image Metadata</td>
                                                                <td class="numeric-cell">${i.backups.images.total}</td>
                                                            </tr>
                                                            <tr class="${i.backups.animations.saved==i.backups.animations.total&&i.backups.animations.total>0?"complete":""}">
                                                                <td class="label-cell">Animations Metadata</td>
                                                                <td class="numeric-cell">${i.backups.animations.total}</td>
                                                            </tr>
                                                            <tr class="${i.backups.themes.saved==i.backups.themes.total&&i.backups.themes.total>0?"complete":""}">
                                                                <td class="label-cell">Themes</td>
                                                                <td class="numeric-cell">${i.backups.themes.total}</td>
                                                            </tr>
                                                            <tr class="${i.backups.staticPages.saved==i.backups.staticPages.total&&i.backups.staticPages.total>0?"complete":""}">
                                                                <td class="label-cell">Static Pages</td>
                                                                <td class="numeric-cell">${i.backups.staticPages.total}</td>
                                                            </tr>
                                                            <tr class="${i.backups.channels.saved==i.backups.channels.total&&i.backups.channels.total>0?"complete":""}">
                                                                <td class="label-cell">Channels</td>
                                                                <td class="numeric-cell">${i.backups.channels.total}</td>
                                                            </tr>
        
                                                            ${i.backups.authors.total?n`
        
                                                                <tr class="${i.backups.authors.saved==i.backups.authors.total&&i.backups.authors.total>0?"complete":""}">
                                                                    <td class="label-cell">Authors</td>
                                                                    <td class="numeric-cell">${i.backups.authors.total}</td>
                                                                </tr>
                                                            `:n`<span/>`}
        
        
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
        
                                                <div class="publish-status"></div>

                                            `:n`<span />`}
        
                                        `:n`
                                            <div class="publish-label" style="display:none;"></div>
                                        `}
        
                                        ${p?n`
                                            <div class="publish-output" innerHTML="${p}" id="ipfs-publish-process" ></div>
                                        `:n`
                                            <div class="publish-output" style="display:none;"></div>
                                        `}
        
        
                                        ${b?n`
        
                                            <div class="pin-status">
                                                <p><strong>IPFS Hash:</strong> ${d.channel.localCid}</p>
                                                <p><strong>Date Exported:</strong> ${d.channel.localPubDate}</p>
                                            </div>
        
                                        `:n`<span />`}
        
        
                                        ${B&!C?n`
        
                                            <div class="list margin-top margin-bottom">
                                                <ul>
                                                    <li>
                                                        <label class="item-checkbox item-content">
                                                            <input type="checkbox" checked="true" name="exportMedia" />
                                                            
                                                            <i class="icon icon-checkbox"></i>
                                                            <div class="item-inner">
                                                                <div class="item-title">
                                                                <div class="item-header"></div>
                                                                Export Media
                                                                <div class="item-footer">
                                                                    Export all images and animations to IPFS and your local git repo.
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label class="item-checkbox item-content">
                                                            <input type="checkbox" checked="true" name="exportMetadata" />
                                                            
                                                            <i class="icon icon-checkbox"></i>
                                                            <div class="item-inner">
                                                                <div class="item-title">
                                                                <div class="item-header"></div>
                                                                Export JSON metadata
                                                                <div class="item-footer">
                                                                    Generate and export JSON metadata for all items.
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>



                                            ${m?n`
        
                                                <div class="chip chip-outline">
                                                    <div class="chip-label">Success!</div>
                                                </div>
        
                                                <button type="submit" class="button button-fill color-gray text-color-white" id="export-refresh-button">
                                                    <i class="material-icons">refresh</i> Export Again
                                                </button>
        
        
                                            `:n`
        
                                                ${C?n`<span />`:n`
                                                    <button type="submit" class="button button-fill button-small deploy-button" >Export</button>
                                                `}  
        
                                            `}
                                            
                                        `:n`
                                            <p></p>
                                        `}


                                    `:n`
                                        <p>Configure a <a href="/admin/settings">git provider</a> to begin export.</p>
                                    `}


                                </form>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-content card-content-padding">

                                <strong>Troubleshooting</strong>

                                <p>
                                    Large is still alpha software and connecting to external services in a browser application can be tricky. A web security feature named <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" class="external">Cross-Origin Resource Sharing (CORS)</a> can create a few
                                    challenges to overcome depending on your setup. 
                                </p>

                                <p>
                                    Tip: Open the javascript console to see further details about errors.
                                </p>

                                <ul>
                                    <li style="margin-top: 20px; margin-bottom: 20px">
                                        <strong>Problem: Git clone/pull fails.</strong>  
                                        <ul>
                                            <li>Large uses <a href="https://isomorphic-git.org/" class="external">isomorphic-git</a> to store and retreive git data directly from your browser.</li>
                                            <li><a href="https://gitlab.com/gitlab-org/gitlab/-/issues/20590" class="external">GitLab</a> and GitHub do not add CORS headers to their pull/clone requests.</li>
                                            <li>This means your browser blocks the request, so it fails.</li>
                                        </ul>

                                        <p><strong>Solution(s):</strong></p>
                                        <ul>
                                            <li>Search the web for "Disable CORS" for your browser. It's a complex issue and environment specific.</li>
                                            <li>
                                                <a class="external" href="https://github.com/ptoner/isomorphic-git-cors-extension">Install</a> this simple extension for Chrome/Brave. This adds
                                                the proper headers to GitLab specifically.
                                            </li>
                                        </ul>

                                    </li>

                                    <li style="margin-top: 20px; margin-bottom: 20px"> 
                                        <strong>Problem: IPFS fails.</strong> 
                                        <p>There could be many reasons for this to happen depending on your configuration.</p>
                                        <ul>
                                            <li>
                                                CORS problems connecting to external gateways.
                                                <ul>
                                                    <li>See <a href="https://github.com/ipfs/js-ipfs/blob/master/docs/CORS.md" class="external">IPFS documentation for this issue.</a></li>
                                                </ul>
                                            </li>
                                            <li>Connecting from a website using HTTPS to an HTTP IPFS gateway will fail.</li>

                                            <li>The in-browser node struggles to store large amounts of data or connect to external nodes.</li>
                                        </ul>

                                        <p><strong>Solution(s):</strong></p>
                                        <ul>
                                            <li>If you are using an IPFS node running on localhost you will have better luck also running Large on localhost. <a href="https://gitlab.com/american-space-software/large" class="external">See git README</a> for instructions to run a local copy.
                                            </li>
                                            <li>Use an IPFS gateway that supports HTTPS and is set up to add the correct CORS headers.</li>
                                            <li>This can be tricky. Later we will have better options. <a href="https://discord.gg/yJtjqHvqXm">Join discord</a> and ask questions.</li>

                                        </ul>

                                    </li>
                                </ul>

                            </div>
                        </div>

                    `:n`

                        ${E?n` `:n`
                    
                            <div class="card">
                            <div class="card-content card-content-padding">
                                <p>Add NFTs to the collection before publishing.</p>
                            </div>
                            </div>
            
                        `}
            
                        ${w?n` `:n`
                            
                            <div class="card">
                            <div class="card-content card-content-padding">
                                <p>Configure a <a href="/admin/settings">git provider</a> to deploy the reader.</p>
                            </div>
                            </div>
            
                        `}
            
                        ${u?n` `:n`
                            
                            <div class="card">
                            <div class="card-content card-content-padding">
                                <p>Configure a <a href="/admin/settings">git CORS proxy</a> to deploy the reader.</p>
                            </div>
                            </div>
            
                        `}

                    `}

                </div>

            </div>
        </div>

    </div>

`}}ht.id="f1b319687a",ht.style="\n    .deploy-button {\n        margin-top: 10px;\n        width: 200px;\n    }\n\n    .publish-label,\n    .ipfs-label,\n    .forking-label {\n        margin-top: 10px;\n        margin-bottom: 10px;\n        font-weight: bold;\n        font-size: 18px;\n    }\n\n    .publish-output {\n        border: 1px solid #cccccc;\n        font-size: 13px;\n        width: 100%;\n        max-width: 100%;\n        padding: 5px;\n        height: 100px;\n        overflow-y: scroll;\n    }\n\n    .publish-status {\n        font-size: 14px;\n        padding: 10px;\n        border: 1px solid #f1f1f1;\n    }\n\n    .publish-status .item label {\n        font-weight: bold;\n        display: inline-block;\n        width: 180px;\n    }\n\n    #export-refresh-button {\n        width: 45px;\n        height: 30px;\n        display: inline-block;\n        margin-left: 5px;\n        padding-top: 2.5px;\n    }\n\n    #export-next-button {\n        width: 200px;\n        float: right;\n    }\n\n";const mt=ht;function Et(A,{$:n,$h:e,$on:t,$f7:o,$update:r}){let i=a.getInstance(tn),l=(a.getInstance(nn),a.getInstance(An),a.getInstance(bA),a.getInstance(xn)),s=(a.getInstance(ct),A.channelViewModel),c=A.settings,d=!1,f=!1,g=s.itemCount>0,C=s?.gitProvider?.personalAccessToken?.length>0,p=c.gitCorsProxy?.length>0,B=g&&C&&p;t("pageInit",(async()=>{d=!1,await r(),await h()})),t("pageAfterOut",((A,n)=>{console.log("Unloading page"),d=!0}));const b=async A=>{let n;A.preventDefault(),f=!0,await r();try{n=await l.createFork(s.channel),s.channel.publishReaderRepoId=n.id,s.channel.publishReaderRepoPath=n.path,s.channel.publishReaderRepoStatus="pending",await i.put(s.channel)}catch(A){console.log(A),"Error: Request failed with status code 409"==A.toString()?o.dialog.alert("Git repo already exists with that name.","There was an error"):o.dialog.alert(A,"There was an error")}f=!1,await r(),await h()},h=async A=>{if(!d&&c&&!("complete"==s.channel.publishReaderRepoStatus&&s.channel.publishReaderRepoId>0||f)){if(console.log("Checking repo fork status..."),s.channel=await i.get(s.channel._id),"finished"==await l.getForkRepoStatus(s.channel)){let A=await l.getExistingFork(s.channel);s.channel.publishReaderRepoStatus="complete",s.channel.httpUrlToRepo=A.httpUrlToRepo,await i.put(s.channel)}await r(),"complete"!=s.channel.publishReaderRepoStatus&&setTimeout(h,5e3)}};return function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

  <div class="page" data-name="publish">

    <${Jn} />

    <div class="page-content">
      <div class="row">

        <div class="col-100 large-50 center">

          <div class="block block-strong inset col-100 no-margin-bottom">
            <div class="breadcrumbs ">
              <div class="breadcrumbs-item">
                <a href="/" class="link">
                  Home
                </a>
              </div>    
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item">
                <a href="/admin/channel/show/${s.channel._id}" class="link">
                  ${s.channel.title}
                </a>
              </div>     
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item">
                <a class="link" href="/admin/publish/${s.channel._id}">Publish</a>
              </div> 
              <div class="breadcrumbs-separator"></div>
              <div class="breadcrumbs-item breadcrumbs-item-active">
                Create Git Repository
              </div> 
            </div>
          </div>

          ${B?n`

            <div class="block-title">Create Git Repository</div>
            <div class="card">
  
              <div class="card-content card-content-padding">
                <form id="fork-reader" @submit="${b}">

                  ${f?n`
                    <div class="forking-label">
                      Forking...
                    </div>
    
                    <div class="preloader"></div>
    
                  `:n`
    
    
                    <div class="forking-label" style="display:none;"></div>
    
    
                    ${s.channel.publishReaderRepoId?n`
                      <div class="repo-status">
    
                        <p><strong>Current Repo:</strong> ${s.channel.httpUrlToRepo}</p>
    
                        <p><strong>Configured Provider:</strong> ${s?.gitProvider?.name}</p>
    
                        <p><strong>Repo ID:</strong> ${s.channel.publishReaderRepoId}</p>
                        <p><strong>Repo Path:</strong> ${s.channel.publishReaderRepoPath}</p>
                        <p><strong>Job Status:</strong> ${s.channel.publishReaderRepoStatus}</p>
                      </div>
                    `:n`<span />`}
    
    
                    <div class="row block">
    
                      <div class="col-0 large-30"></div>
        
                      <a href="/admin/publish/${s.channel._id}" class="button button-outline color-gray col-50 large-30">
                        Back to menu 
                      </a>
    
                      <button type="submit" class="button button-fill col-50 large-30">
                        Create/Connect Fork
                      </button>
        
                    </div>
    
                  `}
    
                </form>
              </div>
  
            </div>    

          `:n`

              ${g?n` `:n`
                  
                <div class="card">
                  <div class="card-content card-content-padding">
                    <p>Add NFTs to the collection before publishing.</p>
                  </div>
                </div>

              `}

              ${C?n` `:n`
                
                <div class="card">
                  <div class="card-content card-content-padding">
                    <p>Configure a <a href="/admin/settings">git provider</a> to deploy the reader.</p>
                  </div>
                </div>

              `}

              ${p?n` `:n`
                
                <div class="card">
                  <div class="card-content card-content-padding">
                    <p>Configure a <a href="/admin/settings">git CORS proxy</a> to deploy the reader.</p>
                  </div>
                </div>

              `}
          
          `}




        </div>

      </div>
    </div>

  </div>

`}}Et.id="d175b6d8c4",Et.style="\n  .publish-label,\n  .ipfs-label,\n  .forking-label {\n    margin-top: 10px;\n    margin-bottom: 10px;\n    font-weight: bold;\n    font-size: 18px;\n  }\n\n  .publish-output {\n    border: 1px solid #cccccc;\n    font-size: 13px;\n    width: 100%;\n    max-width: 100%;\n    padding: 5px;\n    height: 300px;\n    overflow-y: scroll;\n  }\n\n  #fork-next-button {\n    width: 200px;\n  }\n";const wt=Et;function ut(A,{$:n,$h:e,$on:t,$f7:o,$update:r}){let i,l=a.getInstance(tn),s=a.getInstance(An),c=(a.getInstance(bA),a.getInstance(En),a.getInstance(xn)),d=(a.getInstance(ct),null!=s.ipfs),f=s.peerCount,g=A.channelViewModel,C=A.settings,p=!1,B="",b=g.channel.publishReaderRepoId>0&&"complete"==g.channel.publishReaderRepoStatus,h=null!=g.channel.localCid,m=g.itemCount>0,E=g?.gitProvider?.personalAccessToken?.length>0,w=C.gitCorsProxy?.length>0,u=m&&E&&w,v=g.channel.httpUrlToRepo;t("pageInit",(async()=>{await s.init(),d=null!=s.ipfs,i=await l.getGitProviderCredentials(g.channel,C),await r()}));const Q=async A=>{A.preventDefault(),p=!0,await r();let n=document.getElementsByClassName("ipfs-label")[0];o.preloader.showIn(n);try{let A=`/export/${g.channel._id}`,n=await(0,fe.Z)(s.ipfs.files.read(`${A}/contractMetadata.json`));await c.deployReaderGit(g.channel,n)}catch(A){console.log(A),o.dialog.alert(A,"There was an error")}o.preloader.hideIn(n),p=!1,await r()},x=async A=>{A.preventDefault();let n=document.getElementsByClassName("ipfs-label")[0];o.preloader.showIn(n);try{await c.clearGitRepos()}catch(A){o.dialog.alert(A,"There was an error")}o.preloader.hideIn(n),await r()};return n(document).on("publish-reader-progress",(async A=>{B=`<p>${A.detail.message}</p>`,r()})),n(document).on("update-peers",(async A=>{f=A.detail.count,r()})),function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div class="page" data-name="publish">
  
      <${Jn} />
  
      <div class="page-content">
        <div class="row">
  
          <div class="col-100 large-50 center">


            <div class="block block-strong inset col-100 no-margin-bottom">
              <div class="breadcrumbs ">
                <div class="breadcrumbs-item">
                  <a href="/" class="link">
                    Home
                  </a>
                </div>    
                <div class="breadcrumbs-separator"></div>
                <div class="breadcrumbs-item">
                  <a href="/admin/channel/show/${g.channel._id}" class="link">
                    ${g.channel.title}
                  </a>
                </div>     
                <div class="breadcrumbs-separator"></div>
                <div class="breadcrumbs-item">
                  <a class="link" href="/admin/publish/${g.channel._id}">Publish</a>
                </div> 
                <div class="breadcrumbs-separator"></div>
                <div class="breadcrumbs-item breadcrumbs-item-active">
                  Publish Collection To Reader
                </div> 
              </div>
            </div>

            ${u?n`
              
              <div class="block-title">Publish Reader</div>
              <div class="card">

                <div class="card-content card-content-padding">

                  ${i?.personalAccessToken?.length>0?n`

                    ${h?n`
                      
                      <form @submit="${Q}">

                        ${d?n`
                            <div class="ipfs-label">
                                Status: <a href="/admin/connect">IPFS Ready</a>
                            </div>
                        `:n`
                          <div class="ipfs-label">IPFS Initializing...</div>
                        `}


                        ${g.channel.publishReaderRepoId>0?n`
                          <div class="repo-status">
                            <p><strong>Remote Repository:</strong> ${v}</p> <a href="#" class="link" @click="${x}">Clear local cache</a>
                            <!-- <p><strong>Gitlab Repo ID:</strong> ${g.channel.publishReaderRepoId}</p>
                            <p><strong>Gitlab Repo Path:</strong> ${g.channel.publishReaderRepoPath}</p>  
                            <p><strong>Fork Status:</strong> ${g.channel.publishReaderRepoStatus}</p>                                                                                                                                                               -->
                          </div>

                          ${b&&d?n`

                            ${g.channel.contractAddress?n`
                              <p>Reader will be configured to connect to: ${g.channel.contractAddress}</p>  
                            `:n`
                              <p>Note: Contract is not deployed. The reader will not attempt to connect to Ethereum.</p>  
                            `}

                            ${B?n`
                              <div class="publish-output" innerHTML="${B}"></div>
                            `:n`
                              <div class="publish-output" style="display:none;"></div>
                            `}


                            
                            
                            <div class="row block margin-top">

                              <div class="col-0 large-30"></div>
                
                              <a href="/admin/publish/${g.channel._id}" class="button button-outline color-gray col-50 large-30">
                                Back to menu 
                              </a>


                              ${p?n`

                                <a href="#" class="button button-outline color-blue col-50 large-30">
                                  Publishing...
                                </a>
                              `:n`
                                <button class="button button-fill col-50 large-30" type="submit">Publish Reader</button>
                              `}
        
                
                            </div>





                          `:n`
                            <p style="display:none;"></p>
                          `}

                        `:n``}



                      </form>                    
                    `:n`
                      <p>Collection must be deployed to IPFS and you must fork the Large Reader before publishing.</p>  
                    `}
                    
                  `:n`
                    <p>Configure a <a href="/admin/settings">git provider</a> to deploy the collection reader.</p>
                  `}


                </div>

              </div>

            `:n`

                ${m?n` `:n`
                        
                  <div class="card">
                    <div class="card-content card-content-padding">
                        <p>Add NFTs to the collection before publishing.</p>
                    </div>
                  </div>

              `}

              ${E?n` `:n`
                  
                  <div class="card">
                    <div class="card-content card-content-padding">
                        <p>Configure a <a href="/admin/settings">git provider</a> to deploy the reader.</p>
                    </div>
                  </div>

              `}

              ${w?n` `:n`
                  
                  <div class="card">
                    <div class="card-content card-content-padding">
                        <p>Configure a <a href="/admin/settings">git CORS proxy</a> to deploy the reader.</p>
                    </div>
                  </div>

              `}


              
            `}

          </div>
  
        </div>
      </div>
  
    </div>
  
  `}}ut.id="07f046284d",ut.style="\n\n    .publish-label, .ipfs-label, .forking-label {\n      margin-top: 10px;\n      margin-bottom: 10px;\n      font-weight: bold;\n      font-size: 18px;\n    }\n\n    .publish-output {\n      border: 1px solid #cccccc;\n      font-size: 13px;\n      width: 100%;\n      max-width: 100%;\n      padding: 5px;\n      height: 300px;\n      overflow-y : scroll;\n    }\n  ";const vt=ut;function Qt(A,{$:n,$h:e,$on:t,$f7:o,$update:r}){let i,l=a.getInstance(tn),s=(a.getInstance(nn),a.getInstance(An),a.getInstance(bA)),c=(a.getInstance(En),a.getInstance(ct)),d=A.channelViewModel,f=!1,g=null!=d.channel.localCid;t("pageInit",(async(A,n)=>{i=a.getWalletService(),await r()}));const C=async A=>{f=!0,await r();let n={title:`Deploying contract ${name}. Approve transaction and wait for it to be mined.`,promise:c.deployContract(d.channel)};await s.queuePromiseView(n),f=!1,await r()},p=async A=>{d.channel.contractAddress=void 0,await l.put(d.channel),d.channel=await l.get(d.channel._id),r()};return function(A){A.$;var n=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,n`

    <div class="page" data-name="publish">
  
      <${Jn} />
  
      <div class="page-content">
        <div class="row">
  
          <div class="col-100 large-50 center">

            <div class="block block-strong inset col-100 no-margin-bottom">
              <div class="breadcrumbs ">
                <div class="breadcrumbs-item">
                  <a href="/" class="link">
                    Home
                  </a>
                </div>    
                <div class="breadcrumbs-separator"></div>
                <div class="breadcrumbs-item">
                  <a href="/admin/channel/show/${d.channel._id}" class="link">
                    ${d.channel.title}
                  </a>
                </div>     
                <div class="breadcrumbs-separator"></div>
                <div class="breadcrumbs-item">
                  <a class="link" href="/admin/publish/${d.channel._id}">Publish</a>
                </div> 
                <div class="breadcrumbs-separator"></div>
                <div class="breadcrumbs-item breadcrumbs-item-active">
                  Deploy Contract
                </div> 
              </div>
            </div>

            ${d.itemCount>0?n`
              
              ${i?.address?n`
                <div class="block-title">Verify Mint Info</div>
                <div class="card">
                  <div class="card-content">
                    <div class="card-content card-content-padding">
  
                      <p>
                        <strong>Mint Price:</strong> ${d.channel.mintPrice} ETH each
                      </p>
  
                      <p>
                        <strong>Royalty:</strong> ${d.channel.royaltyPercent}% 
                      </p>
  
                    </div>
                  </div>
                </div>
                
                <div class="block-title">Deploy Contract</div>
                <div class="card">
                  <div class="card-content">
                    <div class="card-content card-content-padding">
  
                      ${g?n`
  
                        <div class="pin-status">
                          <p><strong>IPFS Hash:</strong> ${d.channel.localCid}</p>
                          <p><strong>Date Exported:</strong> ${d.channel.localPubDate}</p>
                        </div>
  
  
                        ${d.channel.contractAddress?n`
                          <p>
                            <strong>Current Contract Address:</strong> ${d.channel.contractAddress} 
                            <a @click="${p}" class="button button-fill button-small deploy-button">Reset</a>
                          </p> 
                        `:n`<span/>`}
  
  
                        ${f?n`
                          <p>Deploying...</p>
                        `:n`
                        
                          ${d.channel.contractAddress?n`
                            
                            <h1>Success!</h1>
                            
                            <p>
                              After deploying the contract the Reader can be re-published and it will become aware of Ethereum and show users the 
                              appropriate controls to begin minting NFTs.
                            </p>
                            <a href="/admin/publish/publish-reader/${d.channel._id}" class="button button-outline">Publish Collection to Reader</a>
  
  
                          `:n`
                            <button class="button button-fill button-small deploy-button" @click="${C}">Deploy Contract</button>
                          `}                        
                        `}
                        
                      `:n`
                        <p>Collection must be deployed to IPFS</p>
                      `}
                    </div>
                  </div>
                </div>
                
              `:n`
                <div class="card">
                  <div class="card-content card-content-padding">
                    <p>Use a web browser with wallet support to deploy an ERC-721 smart contract.</p>
                  </div>
                </div>
              
              `}





            `:n`
              <div class="card">
                <div class="card-content card-content-padding">
                  <p>Add NFTs to the collection before publishing.</p>
                </div>
              </div>
              
            `}

          </div>
  
        </div>
      </div>
  
    </div>
  
  `}}Qt.id="ab0cde4fc4",Qt.style="\n\n  ";const xt=Qt;var It=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r},kt=function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)};let yt=class{channelWebService;settingsService;schemaService;gitlabService;constructor(A,n,e,t){this.channelWebService=A,this.settingsService=n,this.schemaService=e,this.gitlabService=t}async publish(){return new Un((async A=>(await this.schemaService.loadChannel(A.params.id),{channelViewModel:await this.channelWebService.get(A.params.id)})),bt)}async export(){return new Un((async A=>{await this.schemaService.loadChannel(A.params.id);let n,e=await this.channelWebService.get(A.params.id);try{n=await this.settingsService.get()}catch(A){}return{channelViewModel:e,settings:n}}),mt)}async forkReader(){return new Un((async A=>{await this.schemaService.loadChannel(A.params.id);let n,e=await this.channelWebService.get(A.params.id);try{n=await this.settingsService.get()}catch(A){}return{channelViewModel:e,settings:n}}),wt)}async publishReader(){return new Un((async A=>{await this.schemaService.loadChannel(A.params.id);let n,e=await this.channelWebService.get(A.params.id);try{n=await this.settingsService.get()}catch(A){}return{channelViewModel:e,settings:n}}),vt)}async contract(){return new Un((async A=>(await this.schemaService.loadChannel(A.params.id),{channelViewModel:await this.channelWebService.get(A.params.id)})),xt)}};It([Gn("/admin/publish/:id"),kt("design:type",Function),kt("design:paramtypes",[]),kt("design:returntype",Promise)],yt.prototype,"publish",null),It([Gn("/admin/publish/export/:id"),kt("design:type",Function),kt("design:paramtypes",[]),kt("design:returntype",Promise)],yt.prototype,"export",null),It([Gn("/admin/publish/fork-reader/:id"),kt("design:type",Function),kt("design:paramtypes",[]),kt("design:returntype",Promise)],yt.prototype,"forkReader",null),It([Gn("/admin/publish/publish-reader/:id"),kt("design:type",Function),kt("design:paramtypes",[]),kt("design:returntype",Promise)],yt.prototype,"publishReader",null),It([Gn("/admin/publish/contract/:id"),kt("design:type",Function),kt("design:paramtypes",[]),kt("design:returntype",Promise)],yt.prototype,"contract",null),yt=It([(0,o.b)(),kt("design:paramtypes",[Dn,LA,dA,En])],yt);let Ft=class{constructor(){}buildPagingViewModel(A,n,e,t){let a=new Dt;return a.offset=A||0,a.limit=n,a.count=e,a.start=a.offset+1,a.end=Math.min(a.offset+n,e),a.previousOffset=Math.max(a.offset-n,0),a.offset+n<e&&(a.nextOffset=a.offset+n),a.page=a.offset/a.limit+1,a.page>a.endPage&&(a.page=a.endPage),a.endPage=Math.ceil(a.count/a.limit),a.lastOffset=a.endPage*a.limit-a.limit,a.showNext=a.endPage>a.page,a.showPrevious=0!=a.offset,a.showFirst=a.page>2,a.showLast=a.page<a.endPage-1,a}calculateEndIndex(A,n,e){let t=n+A-1;return Math.min(e-1,t)}calculateDescendingEndIndex(A,n){let e=n-(A-1);return Math.max(0,e)}calculateDescendingOffset(A,n){let e=n-1-A;return Math.max(0,e)}};Ft=function(A,n,e,t){var a,o=arguments.length,r=o<3?n:null===t?t=Object.getOwnPropertyDescriptor(n,e):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(A,n,e,t);else for(var i=A.length-1;i>=0;i--)(a=A[i])&&(r=(o<3?a(r):o>3?a(n,e,r):a(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r}([(0,o.b)(),function(A,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(A,n)}("design:paramtypes",[])],Ft);class Dt{page;pageNumbers;endPage;offset;limit;count;start;end;previousOffset;nextOffset;lastOffset;showPrevious;showNext;showFirst;showLast}var Yt=e(38006),Mt=e(4029),Ut=e(10764),Gt=e(79914),zt=e.n(Gt);function jt(A,{$:n,$on:e,$f7:t,$update:o}){a.getInstance(KA);let r=a.getInstance(tn),i=a.getWalletService(),l=A.channel_view_model;const s=async A=>{t.dialog.confirm("Are you sure you want to delete this collection? This will only remove your local copy of the files.",(async()=>{t.preloader.show(),await r.delete(l.channel),t.preloader.hide(),t.views.main.router.navigate("/"),t.toast.show({text:"Collection deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))};return function(A){A.$;var n,e=A.$h;return A.$root,A.$f7,A.$f7route,A.$f7router,A.$theme,A.$update,A.$store,e`

  <div class="card channel-card-show">

    <div class="card-header banner show-channel-banner-${l.channel._id}">

      <div class="float-right">
        <a class="button button-fill button-raised color-blue text-color-white" style="border:1px solid white;"
          href="/admin/publish/${l.channel._id}">Publish</a>
      </div>


      ${l?.coverImage?e`
      <img src="${l.coverImage.url}" class="avatar" />
      `:e`
      <i class="material-icons avatar">image</i>
      `}

    </div>

    <div class="card-content">

      <div class="card-content card-content-padding">
        
        <div class="float-right">

          <div class="menu-item menu-item-dropdown">
            <div class="menu-item-content icon-only">
              <div class="menu-item-content">
                <i class="material-icons">more_vert</i>
              </div>
            </div>
            <div class="menu-dropdown menu-dropdown-right">
              <div class="menu-dropdown-content">

                ${e`
                  <a class="menu-dropdown-link menu-close" href="/admin/channel/edit/${l.channel._id}">Edit</a>
                  <!-- <a class="menu-dropdown-link menu-close" href="/admin/channel/upgrade/${l.channel._id}">Upgrade</a> -->
                `}
                
                <a class="menu-dropdown-link menu-close" @click="${s}">Delete</a>
                
              </div>
            </div>
          </div>
        </div>
                        
        <div class="title">${l?.channel?.title}</div>

        ${l?.authorDisplayName?e`
        <div class="name">
          By <a
            href="/admin/author/show/${l?.author._id}">${l?.authorDisplayName}</a>
        </div>
        `:""}

        <div class="collection-info">
            <label>Items:</label><strong>${l?.itemCount}</strong>
            
            <span class="dot">·</span>
            <label>Created:</label><strong>${l.dateCreated}</strong>
  
            <span class="dot">·</span>
            <label>Forkable:</label><strong>${l.channel.disableForks?"No":"Yes"}</strong>

            ${l.channel.mintPrice?e`
              <span class="dot">·</span>
              <label>Mint Price:</label><strong>${l.channel.mintPrice} ETH</strong>
            `:e``}
  
            ${l.channel.royaltyPercent?e`
              <span class="dot">·</span>
              <label>Marketplace Creator Fee:</label><strong>${l.channel.royaltyPercent}%</strong>
            `:e``}
    


  
        </div>




        


        ${l.channel.descriptionHTML?e`
          <div class="description" id="channel-show-description-${l.channel._id}"
            innerHTML="${l.channel.descriptionHTML}">
          </div>
        `:e`<span />`}

            



        ${l.channel.contractAddress?e`
          <div class="contract-address">
            <strong>Contract Address:</strong> ${n=l?.channel.contractAddress,i.truncateEthAddress(n)}
          </div>
        `:e``}

        ${l.channel.localCid?e`
          <div class="contract-address">
            <strong>Last Published IPFS CID:</strong> ${l?.channel.localCid}
          </div>
        `:e``}

        ${l.channel.forkedFromCid?e`
          <div class="contract-address">
            <strong>Forked from IPFS:</strong> ${l?.channel.forkedFromCid}
          </div>
        `:e``}

        ${l.channel.forkedFromId?e`
          <div class="contract-address">
            <strong>Forked from:</strong> ${l?.channel.forkedFromId}
          </div>
        `:e``}

      </div>

    </div>

  </div>

//# sourceMappingURL=main-0.6.19.admin.js.map