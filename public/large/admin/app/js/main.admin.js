var admin;(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[179],{73243:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>go});i(35666),i(28660);const a={WalletService:Symbol("WalletService")};class n{static getInstance(e){return po.get(e)}static getContainer(){return po}static getWalletService(){return po.get(a.WalletService)}}var s=i(45466),o=i(61906),r=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},c=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},l=function(e,t){return function(i,a){t(i,a,e)}};let f=class{app;constructor(e){this.app=e}showExceptionPopup(e){console.log(e),this.app.dialog.alert(e.message,"There was an error")}showPopup(e){this.app.dialog.alert(e)}showAlert(e){this.app.dialog.alert(e)}spinnerDialog;showSpinner(e){this.spinnerDialog&&this.hideSpinner(),this.spinnerDialog=this.app.dialog.preloader(e||"Loading")}hideSpinner(){this.spinnerDialog&&(this.spinnerDialog.close(),this.spinnerDialog=null)}progressDialog;showProgress(e){this.progressDialog&&this.hideProgress();this.progressDialog=this.app.dialog.progress(e||"Loading",0)}setProgress(e,t){this.progressDialog&&(this.progressDialog.setProgress(e),this.progressDialog.setText(t))}hideProgress(){this.progressDialog&&(this.progressDialog.close(),this.progressDialog=null)}};f=r([(0,s.b)(),l(0,(0,o.f)("framework7")),c("design:paramtypes",[Object])],f);var d=i(25494),p=i(99025),u=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},h=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class g{_id;_rev;content;cid;dateCreated}u([(0,d.a)(),h("design:type",String)],g.prototype,"_id",void 0),u([(0,d.a)(),h("design:type",String)],g.prototype,"_rev",void 0),u([(0,d.a)(),h("design:type",String)],g.prototype,"content",void 0),u([(0,p.rl)(),h("design:type",String)],g.prototype,"cid",void 0),u([(0,d.a)(),h("design:type",String)],g.prototype,"dateCreated",void 0);var m=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},v=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},b=function(e,t){return function(i,a){t(i,a,e)}};let y=class{pouchPrefix;PouchDB;dbCache={};constructor(e,t){this.pouchPrefix=e,this.PouchDB=t}async getDatabase(e,t){let i=this.PouchDB();const a=`${this.pouchPrefix}-large-${e}`;if(this.dbCache[a])return this.dbCache[a];this.dbCache[a]=new i(a,{auto_compaction:!0});const n=await this.dbCache[a].info();if(0==n.doc_count&&0==n.update_seq){if(t){console.log(`Creating indexes for ${a}`);let e={_id:"_local/changesets",ids:[]};for(let i of t)await i.changeset(this.dbCache[a]),e.ids.push(i.id),console.log(`New changeset detected...${i.id}`);await this.dbCache[a].put(e)}}else if(t){let e;try{e=await this.dbCache[a].get("_local/changesets")}catch(e){}e||(e={_id:"_local/changesets",ids:[]});let i=!1;for(let n of t)if(!e.ids.includes(n.id)){try{await n.changeset(this.dbCache[a])}catch(e){}e.ids.push(n.id),i=!0,console.log(`New changeset detected...${n.id}`)}i&&(console.log("Saving changeset log...",e),await this.dbCache[a].put(e))}return this.dbCache[a]}async getEmptyDatabase(e){let t=this.PouchDB();const i=`${this.pouchPrefix}-large-${e}`;return this.dbCache[i]=new t(i,{auto_compaction:!0}),this.dbCache[i]}async getLatestRevision(e,t){let i;try{i=await e.get(t)}catch(e){}if(i)return i;let a=await e.allDocs({key:t,include_docs:!0,deleted:"ok"});if(a.rows?.length>0){return{_id:t,_rev:a.rows[0].value.rev,_deleted:!0}}}};y=m([(0,s.b)(),b(0,(0,o.f)("pouch-prefix")),b(1,(0,o.f)("PouchDB")),v("design:paramtypes",[String,Object])],y);var w=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},S=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let $=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-animation`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-animation`)}async get(e){return Object.assign(new g,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}};$=w([(0,s.b)(),S("design:paramtypes",[y])],$);var k=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},I=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class R{_id;_rev;walletAddress;name;description;url;coverPhotoId;dateCreated;lastUpdated}k([(0,d.a)(),I("design:type",String)],R.prototype,"_id",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"_rev",void 0),k([(0,p.rl)(),I("design:type",String)],R.prototype,"walletAddress",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"name",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"description",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"url",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"coverPhotoId",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"dateCreated",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"lastUpdated",void 0);var _=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},x=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let P=class{databaseService;db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-author`)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-author`)}async getLatestRevision(e){return Object.assign(new R,await this.databaseService.getLatestRevision(this.db,e))}async get(e){return Object.assign(new R,await this.db.get(e))}async put(e){return this.db.put(e)}};P=_([(0,s.b)(),x("design:paramtypes",[y])],P);var C=i(57253),T=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},A=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class O{_id;_rev;forkedFromCid;forkedFromId;forkedFromFeeRecipient;forkType;disableForks;authorId;title;symbol;link;description;descriptionHTML;descriptionMarkdown;license;licenseHTML;licenseMarkdown;category;language;coverImageId;coverBannerId;mintPrice;attributeOptions;contractAddress;pinJobId;pinJobStatus;gitProvider;httpUrlToRepo;publishReaderRepoId;publishReaderRepoPath;publishReaderRepoBranch;publishReaderRepoStatus;publishReaderIPFSStatus;pubDate;productionHostname;productionBaseURI;productionBaseLibraryURI;showMintPage;showActivityPage;marketplaces;externalLinks;importSuccess;dateCreated;lastUpdated}T([(0,d.a)(),A("design:type",String)],O.prototype,"_id",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"_rev",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"forkedFromCid",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"forkedFromId",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"forkedFromFeeRecipient",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"forkType",void 0),T([(0,d.a)(),A("design:type",Boolean)],O.prototype,"disableForks",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"authorId",void 0),T([(0,C.Bl)(3,{message:"Title must be more than 3 characters."}),A("design:type",String)],O.prototype,"title",void 0),T([(0,p.rl)(),A("design:type",String)],O.prototype,"symbol",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"link",void 0),T([(0,d.a)(),A("design:type",Object)],O.prototype,"description",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"descriptionHTML",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"descriptionMarkdown",void 0),T([(0,d.a)(),A("design:type",Object)],O.prototype,"license",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"licenseHTML",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"licenseMarkdown",void 0),T([(0,d.a)(),A("design:type",Array)],O.prototype,"category",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"language",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"coverImageId",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"coverBannerId",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"mintPrice",void 0),T([(0,d.a)(),A("design:type",Array)],O.prototype,"attributeOptions",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"contractAddress",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"pinJobId",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"pinJobStatus",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"gitProvider",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"httpUrlToRepo",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"publishReaderRepoId",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"publishReaderRepoPath",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"publishReaderRepoBranch",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"publishReaderRepoStatus",void 0),T([(0,d.a)(),A("design:type",Object)],O.prototype,"publishReaderIPFSStatus",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"pubDate",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"productionHostname",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"productionBaseURI",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"productionBaseLibraryURI",void 0),T([(0,d.a)(),A("design:type",Boolean)],O.prototype,"showMintPage",void 0),T([(0,d.a)(),A("design:type",Boolean)],O.prototype,"showActivityPage",void 0),T([(0,d.a)(),A("design:type",Object)],O.prototype,"marketplaces",void 0),T([(0,d.a)(),A("design:type",Object)],O.prototype,"externalLinks",void 0),T([(0,d.a)(),A("design:type",Boolean)],O.prototype,"importSuccess",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"dateCreated",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"lastUpdated",void 0);var F=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},j=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let E=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}}),await e.createIndex({index:{fields:["lastUpdated"]}})}}];db;constructor(e){this.databaseService=e}async load(){this.db=await this.databaseService.getDatabase("channel",this.changesets)}async get(e){return Object.assign(new O,await this.db.get(e))}async getLatestRevision(e){return Object.assign(new O,await this.databaseService.getLatestRevision(this.db,e))}async put(e){return this.db.put(e)}async list(e,t){return(await this.db.find({selector:{dateCreated:{$exists:!0}},sort:[{dateCreated:"desc"}],limit:e,skip:t})).docs}async delete(e){await this.db.remove(e)}};E=F([(0,s.b)(),j("design:paramtypes",[y])],E);var D=i(28246),B=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},M=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class N{_id;_rev;ipfsHost;defaultGitProvider;gitProviders;gitCorsProxy;username;personalAccessToken;alchemyKey;huggingFace;welcomeHide;dateCreated;lastUpdated}B([(0,d.a)(),M("design:type",String)],N.prototype,"_id",void 0),B([(0,d.a)(),M("design:type",String)],N.prototype,"_rev",void 0),B([(0,d.a)(),M("design:type",String)],N.prototype,"ipfsHost",void 0),B([(0,d.a)(),M("design:type",String)],N.prototype,"defaultGitProvider",void 0),B([(0,d.a)(),M("design:type",Object)],N.prototype,"gitProviders",void 0),B([(0,d.a)(),M("design:type",String)],N.prototype,"gitCorsProxy",void 0),B([(0,d.a)(),M("design:type",String)],N.prototype,"username",void 0),B([(0,d.a)(),M("design:type",String)],N.prototype,"personalAccessToken",void 0),B([(0,d.a)(),M("design:type",String)],N.prototype,"alchemyKey",void 0),B([(0,d.a)(),M("design:type",String)],N.prototype,"huggingFace",void 0),B([(0,d.a)(),(0,D.si)(),M("design:type",Boolean)],N.prototype,"welcomeHide",void 0),B([(0,d.a)(),M("design:type",String)],N.prototype,"dateCreated",void 0),B([(0,d.a)(),M("design:type",String)],N.prototype,"lastUpdated",void 0);var L=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},U=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let H=class{databaseService;db;constructor(e){this.databaseService=e}async load(){this.db=await this.databaseService.getDatabase("settings")}async get(){return Object.assign(new N,await this.db.get("single"))}async put(e){e._id="single",await this.db.put(e)}};H=L([(0,s.b)(),U("design:paramtypes",[y])],H);var q=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},G=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class z{_id;_rev;buffer;svg;title;cid;generated;dateCreated}q([(0,d.a)(),G("design:type",String)],z.prototype,"_id",void 0),q([(0,d.a)(),G("design:type",String)],z.prototype,"_rev",void 0),q([(0,d.a)(),G("design:type",Object)],z.prototype,"buffer",void 0),q([(0,d.a)(),G("design:type",String)],z.prototype,"svg",void 0),q([(0,d.a)(),G("design:type",String)],z.prototype,"title",void 0),q([(0,p.rl)(),G("design:type",String)],z.prototype,"cid",void 0),q([(0,d.a)(),G("design:type",Boolean)],z.prototype,"generated",void 0),q([(0,d.a)(),G("design:type",String)],z.prototype,"dateCreated",void 0);var J=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},W=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Z=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-image`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-image`)}async get(e){return Object.assign(new z,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}};Z=J([(0,s.b)(),W("design:paramtypes",[y])],Z);var V=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},K=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Y{_id;_rev;forkedFromId;channelId;tokenId;title;link;description;content;contentHTML;excerpt;authorId;category;attributeSelections;coverImageId;coverImageGenerated;animationId;themes;coverImageCSS;animationCSS;coverImageAsAnimation;originalJSONMetadataId;imageIds;datePublished;dateCreated;lastUpdated}V([(0,d.a)(),K("design:type",String)],Y.prototype,"_id",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"_rev",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"forkedFromId",void 0),V([(0,p.rl)(),K("design:type",String)],Y.prototype,"channelId",void 0),V([(0,p.rl)(),K("design:type",Number)],Y.prototype,"tokenId",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"title",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"link",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"description",void 0),V([(0,d.a)(),K("design:type",Object)],Y.prototype,"content",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"contentHTML",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"excerpt",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"authorId",void 0),V([(0,d.a)(),K("design:type",Array)],Y.prototype,"category",void 0),V([(0,d.a)(),K("design:type",Array)],Y.prototype,"attributeSelections",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"coverImageId",void 0),V([(0,d.a)(),K("design:type",Boolean)],Y.prototype,"coverImageGenerated",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"animationId",void 0),V([(0,d.a)(),K("design:type",Array)],Y.prototype,"themes",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"coverImageCSS",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"animationCSS",void 0),V([(0,d.a)(),K("design:type",Boolean)],Y.prototype,"coverImageAsAnimation",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"originalJSONMetadataId",void 0),V([(0,d.a)(),K("design:type",Array)],Y.prototype,"imageIds",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"datePublished",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"dateCreated",void 0),V([(0,d.a)(),K("design:type",String)],Y.prototype,"lastUpdated",void 0);let Q=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}})}},{id:"1",changeset:async e=>{await e.put({_id:"_design/attribute_counts",views:{attribute_counts:{map:function(e){if(e.attributeSelections?.length>0)for(let t of e.attributeSelections)emit([e.channelId,t.traitType,t.value])}.toString(),reduce:"_count"}}})}},{id:"5",changeset:async e=>{await e.put({_id:"_design/by_channel_token",views:{by_channel_token:{map:function(e){emit([e.channelId,e.tokenId])}.toString()}}}),await e.put({_id:"_design/by_channel_token_stats",views:{by_channel_token_stats:{map:function(e){emit(e.channelId,e.tokenId)}.toString(),reduce:"_stats"}}})}},{id:"6",changeset:async e=>{await e.createIndex({index:{fields:["animationId"]}}),await e.put({_id:"_design/by_image_id",views:{by_image_id:{map:function(e){if(e.imageIds&&e.imageIds?.length>0)for(let t of e.imageIds)emit(t)}.toString()}}})}}];var X=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ee=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let te=class{databaseService;static CHUNK_SIZE=35;changesets=Q;db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-item`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-item`)}async get(e){return Object.assign(new Y,await this.db.get(e))}async getIds(){return(await this.db.allDocs({include_docs:!0})).rows.filter((e=>!e.id.startsWith("_design")&&!e.id.startsWith("_local"))).sort(((e,t)=>parseInt(e.value.tokenId)-parseInt(t.value.tokenId))).map((e=>e.id))}async getLatestRevision(e){return Object.assign(new Y,await this.databaseService.getLatestRevision(this.db,e))}async getByTokenId(e,t){let i=await this.db.query("by_channel_token",{reduce:!1,include_docs:!0,key:[e,t],limit:1});if(i.rows?.length>0)return Object.assign(new Y,i.rows[0].doc)}async put(e){await this.db.put(e)}async listByChannel(e,t,i){let a=[],n=await this.db.query("by_channel_token",{reduce:!1,include_docs:!0,startkey:[e,0],endkey:[e,{}],limit:t,skip:i});if(n.rows?.length>0)for(let e of n.rows)a.push(Object.assign(new Y,e.doc));return a}async delete(e){await this.db.remove(e)}async getAttributeCountByChannel(e){return(await this.db.query("attribute_counts",{reduce:!0,startKey:[e,"",""],endKey:[e,{},{}],include_docs:!1,group_level:3})).rows.map((t=>({traitType:t.key[1],value:t.key[2],count:t.value,channelId:e})))}async getAttributeInfoBySelections(e,t){return(await this.db.query("attribute_counts",{reduce:!0,keys:t.map((t=>[e,t.traitType,t.value])),include_docs:!1,group_level:3})).rows.map((t=>({traitType:t.key[1],value:t.key[2],count:t.value,channelId:e})))}async getByImageId(e){let t=await this.db.query("by_image_id",{reduce:!1,include_docs:!0,key:e});return t.rows?.map((e=>e.doc))}async getByAnimationId(e){return(await this.db.find({selector:{animationId:{$eq:e}}})).docs}};te=X([(0,s.b)(),ee("design:paramtypes",[y])],te);var ie=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ae=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class ne{_id;_rev;forkedFromId;channelId;name;slug;content;contentHTML;contentMarkdown;locations;dateCreated;lastUpdated}ie([(0,d.a)(),ae("design:type",String)],ne.prototype,"_id",void 0),ie([(0,d.a)(),ae("design:type",String)],ne.prototype,"_rev",void 0),ie([(0,d.a)(),ae("design:type",String)],ne.prototype,"forkedFromId",void 0),ie([(0,p.rl)(),ae("design:type",String)],ne.prototype,"channelId",void 0),ie([(0,p.rl)(),ae("design:type",String)],ne.prototype,"name",void 0),ie([(0,p.rl)(),ae("design:type",String)],ne.prototype,"slug",void 0),ie([(0,d.a)(),ae("design:type",Object)],ne.prototype,"content",void 0),ie([(0,d.a)(),ae("design:type",String)],ne.prototype,"contentHTML",void 0),ie([(0,d.a)(),ae("design:type",String)],ne.prototype,"contentMarkdown",void 0),ie([(0,d.a)(),ae("design:type",Array)],ne.prototype,"locations",void 0),ie([(0,d.a)(),ae("design:type",String)],ne.prototype,"dateCreated",void 0),ie([(0,d.a)(),ae("design:type",String)],ne.prototype,"lastUpdated",void 0);var se=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},oe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let re=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["channelId"]}}),await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-static-page`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-static-page`)}async get(e){return Object.assign(new ne,await this.db.get(e))}async getIds(){return(await this.db.allDocs({include_docs:!1})).rows.filter((e=>!e.id.startsWith("_design")&&!e.id.startsWith("_local"))).map((e=>e.id))}async getLatestRevision(e){return Object.assign(new ne,await this.databaseService.getLatestRevision(this.db,e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async listByChannel(e,t,i){return(await this.db.find({selector:{channelId:{$eq:e},dateCreated:{$exists:!0}},sort:[{dateCreated:"asc"}],limit:t,skip:i})).docs}};re=se([(0,s.b)(),oe("design:paramtypes",[y])],re);var ce=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},le=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class fe{_id;_rev;forkedFromId;channelId;name;coverImageCSS;animationCSS;dateCreated;lastUpdated}ce([(0,d.a)(),le("design:type",String)],fe.prototype,"_id",void 0),ce([(0,d.a)(),le("design:type",String)],fe.prototype,"_rev",void 0),ce([(0,d.a)(),le("design:type",String)],fe.prototype,"forkedFromId",void 0),ce([(0,p.rl)(),le("design:type",String)],fe.prototype,"channelId",void 0),ce([(0,p.rl)(),le("design:type",String)],fe.prototype,"name",void 0),ce([(0,d.a)(),le("design:type",String)],fe.prototype,"coverImageCSS",void 0),ce([(0,d.a)(),le("design:type",String)],fe.prototype,"animationCSS",void 0),ce([(0,d.a)(),le("design:type",String)],fe.prototype,"dateCreated",void 0),ce([(0,d.a)(),le("design:type",String)],fe.prototype,"lastUpdated",void 0);var de=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},pe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ue=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["channelId"]}}),await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-theme`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-theme`)}async get(e){return Object.assign(new fe,await this.db.get(e))}async getIds(){return(await this.db.allDocs({include_docs:!1})).rows.filter((e=>!e.id.startsWith("_design")&&!e.id.startsWith("_local"))).map((e=>e.id))}async getLatestRevision(e){return Object.assign(new fe,await this.databaseService.getLatestRevision(this.db,e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async listByChannel(e,t,i){return(await this.db.find({selector:{channelId:{$eq:e},dateCreated:{$exists:!0}},sort:[{dateCreated:"asc"}],limit:t,skip:i})).docs}};ue=de([(0,s.b)(),pe("design:paramtypes",[y])],ue);var he=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ge=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class me{_id;_rev;tokenMetadata;dateCreated}he([(0,d.a)(),ge("design:type",String)],me.prototype,"_id",void 0),he([(0,d.a)(),ge("design:type",String)],me.prototype,"_rev",void 0),he([(0,d.a)(),ge("design:type",Object)],me.prototype,"tokenMetadata",void 0),he([(0,d.a)(),ge("design:type",String)],me.prototype,"dateCreated",void 0);var ve=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},be=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ye=class{databaseService;db;constructor(e){this.databaseService=e}async load(){this.db=await this.databaseService.getDatabase("token-metadata-cache")}async get(e){return Object.assign(new me,await this.db.get(e))}async put(e){await this.db.put(e)}};ye=ve([(0,s.b)(),be("design:paramtypes",[y])],ye);var we=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Se=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class $e{_id;_rev;result;stale;lastUpdated;dateCreated}we([(0,d.a)(),Se("design:type",String)],$e.prototype,"_id",void 0),we([(0,d.a)(),Se("design:type",String)],$e.prototype,"_rev",void 0),we([(0,d.a)(),Se("design:type",Object)],$e.prototype,"result",void 0),we([(0,d.a)(),Se("design:type",Boolean)],$e.prototype,"stale",void 0),we([(0,d.a)(),Se("design:type",String)],$e.prototype,"lastUpdated",void 0),we([(0,d.a)(),Se("design:type",String)],$e.prototype,"dateCreated",void 0);var ke=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ie=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Re=class{databaseService;db;constructor(e){this.databaseService=e}async load(){this.db=await this.databaseService.getDatabase("query-cache")}async get(e){return Object.assign(new $e,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}};Re=ke([(0,s.b)(),Ie("design:paramtypes",[y])],Re);var _e=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},xe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Pe{_id;_rev;channelId;traitType;value;count;lastUpdated;dateCreated}_e([(0,d.a)(),xe("design:type",String)],Pe.prototype,"_id",void 0),_e([(0,d.a)(),xe("design:type",String)],Pe.prototype,"_rev",void 0),_e([(0,d.a)(),xe("design:type",String)],Pe.prototype,"channelId",void 0),_e([(0,d.a)(),xe("design:type",String)],Pe.prototype,"traitType",void 0),_e([(0,d.a)(),xe("design:type",String)],Pe.prototype,"value",void 0),_e([(0,d.a)(),xe("design:type",Number)],Pe.prototype,"count",void 0),_e([(0,d.a)(),xe("design:type",String)],Pe.prototype,"lastUpdated",void 0),_e([(0,d.a)(),xe("design:type",String)],Pe.prototype,"dateCreated",void 0);var Ce=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Te=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ae=class{databaseService;db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-attribute-counts`)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-attribute-counts`)}async get(e){return Object.assign(new Pe,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}};Ae=Ce([(0,s.b)(),Te("design:paramtypes",[y])],Ae);var Oe=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Fe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class je{_id;_rev;content;cid;dateCreated}Oe([(0,d.a)(),Fe("design:type",String)],je.prototype,"_id",void 0),Oe([(0,d.a)(),Fe("design:type",String)],je.prototype,"_rev",void 0),Oe([(0,d.a)(),Fe("design:type",String)],je.prototype,"content",void 0),Oe([(0,p.rl)(),Fe("design:type",String)],je.prototype,"cid",void 0),Oe([(0,d.a)(),Fe("design:type",String)],je.prototype,"dateCreated",void 0);var Ee=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},De=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Be=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-original-metadata`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-original-metadata`)}async get(e){return Object.assign(new je,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}};Be=Ee([(0,s.b)(),De("design:paramtypes",[y])],Be);var Me=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ne=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Le=class{authorRepository;channelRepository;imageRepository;itemRepository;settingsRepository;animationRepository;themeRepository;staticPageRepository;tokenMetadataCacheRepository;queryCacheRepository;attributeCountRepository;originalMetadataRepository;databaseService;loadedChannelId;constructor(e,t,i,a,n,s,o,r,c,l,f,d,p){this.authorRepository=e,this.channelRepository=t,this.imageRepository=i,this.itemRepository=a,this.settingsRepository=n,this.animationRepository=s,this.themeRepository=o,this.staticPageRepository=r,this.tokenMetadataCacheRepository=c,this.queryCacheRepository=l,this.attributeCountRepository=f,this.originalMetadataRepository=d,this.databaseService=p}async load(){console.log("Loading databases"),await this.channelRepository.load(),await this.settingsRepository.load(),await this.tokenMetadataCacheRepository.load(),await this.queryCacheRepository.load()}async loadChannel(e){this.loadedChannelId!=e&&(console.time(`Loading channel: ${e}`),await this.authorRepository.load(e),await this.itemRepository.load(e),await this.animationRepository.load(e),await this.originalMetadataRepository.load(e),await this.imageRepository.load(e),await this.themeRepository.load(e),await this.staticPageRepository.load(e),await this.attributeCountRepository.load(e),this.loadedChannelId=e,console.timeEnd(`Loading channel: ${e}`))}async loadEmptyChannel(e){this.loadedChannelId!=e&&(console.time(`Loading empty channel: ${e}`),await this.authorRepository.loadEmpty(e),await this.itemRepository.loadEmpty(e),await this.animationRepository.loadEmpty(e),await this.originalMetadataRepository.loadEmpty(e),await this.imageRepository.loadEmpty(e),await this.themeRepository.loadEmpty(e),await this.staticPageRepository.loadEmpty(e),await this.attributeCountRepository.loadEmpty(e),this.loadedChannelId=e,console.timeEnd(`Loading empty channel: ${e}`))}async loadChannelBackup(e){console.time("Loading channel from backup"),await this.loadEmptyChannel(e.channel._id),console.log(`Loading:\n            Items: ${e.items?e.items.length:0}\n            Themes: ${e.themes?e.themes.length:0}\n            Static Pages: ${e.staticPages?e.staticPages.length:0}\n            Attribute Counts: ${e.attributeCounts?e.attributeCounts.length:0}\n            Authors: ${e.authors?e.authors.length:0}\n            Original Metadata: ${e.originalMetadata?e.originalMetadata.length:0}\n\n        `);const t=e=>{e.map((e=>{delete e._rev,delete e._rev_tree}))};t(e.items),t(e.themes),t(e.staticPages),t(e.attributeCounts),t(e.authors),t(e.originalMetadata),await this.itemRepository.db.bulkDocs(e.items),await this.themeRepository.db.bulkDocs(e.themes),await this.staticPageRepository.db.bulkDocs(e.staticPages),await this.attributeCountRepository.db.bulkDocs(e.attributeCounts),await this.authorRepository.db.bulkDocs(e.authors),await this.channelRepository.db.bulkDocs([e.channel]),await this.originalMetadataRepository.db.bulkDocs(e.originalMetadata),console.timeEnd("Loading channel from backup")}async backupChannel(){let e=await this.channelRepository.get(this.loadedChannelId),t=await this.itemRepository.db.allDocs({include_docs:!0}),i=await this.animationRepository.db.allDocs({include_docs:!0}),a=await this.imageRepository.db.allDocs({include_docs:!0}),n=await this.themeRepository.db.allDocs({include_docs:!0}),s=await this.staticPageRepository.db.allDocs({include_docs:!0}),o=await this.attributeCountRepository.db.allDocs({include_docs:!0}),r=await this.authorRepository.db.allDocs({include_docs:!0}),c=await this.originalMetadataRepository.db.allDocs({include_docs:!0});return{channel:e,items:t.rows.map((e=>e.doc)),animations:i.rows.map((e=>e.doc)),images:a.rows.map((e=>e.doc)),themes:n.rows.map((e=>e.doc)),staticPages:s.rows.map((e=>e.doc)),attributeCounts:o.rows.map((e=>e.doc)),authors:r.rows.map((e=>e.doc)),originalMetadata:c.rows.map((e=>e.doc))}}async dropChannel(e){console.log(`Dropping channel: ${e}`);let t=async e=>{let t=[],i=await e.allDocs();for(let e of i.rows)e.id.startsWith("_design")||e.id.startsWith("_local")||t.push({_id:e.id,_rev:e.value.rev,_deleted:!0});const a=await e.info();await e.bulkDocs(t),await e.compact(),delete this.databaseService.dbCache[a.db_name]};await t(this.authorRepository.db),await t(this.itemRepository.db),await t(this.animationRepository.db),await t(this.originalMetadataRepository.db),await t(this.imageRepository.db),await t(this.themeRepository.db),await t(this.staticPageRepository.db),await t(this.attributeCountRepository.db)}};function Ue(e,{$on:t,$f7:i,$update:a}){let s=n.getInstance("version");const o=document.getElementById("footer-template")?.content?.cloneNode(!0);let r;if(o){const e=new XMLSerializer;r=e.serializeToString(o)}return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="toolbar toolbar-bottom">

    <div class="toolbar-inner" style="display: block; padding: 10px;">

      
      ${r?t`
        
        <div innerHTML='${r}'></div>
      
      `:t`
        <span class="footer-link">
          Code licensed under <a href="https://github.com/LargeNFT/large-nft/blob/master/LICENSE.md" class="external">MIT</a>
        </span>

        <span class="footer-link">
          <a href="https://github.com/LargeNFT/large-nft" class="external">GitHub</a>
        </span>

        <span class="footer-link"><a href="https://www.npmjs.com/package/large-nft/v/${s}" class="external">${s}</a></span>
      
      `}


      
    </div>
  </div>


`}}Le=Me([(0,s.b)(),Ne("design:paramtypes",[P,E,Z,te,H,$,ue,re,ye,Re,Ae,Be,y])],Le),Ue.id="75ba6801ff",Ue.style="\n\n\n";const He=Ue;function qe(e,{$on:t,$f7ready:i,$f7:a,$f7router:s,$update:o}){return i((async()=>{let e,t,i=window.location.pathname,s=window.location.hash?.length>2?window.location.hash.substring(2):void 0,r=n.getInstance(f),c=n.getWalletService(),l=n.getInstance(Le);const d=async e=>{t=void 0,c.provider||await c.initProvider(),t=await c.getAddress(),t&&(c.address=t,c.wallet||await c.connect()),await o()};document.addEventListener("connect-wallet",(async e=>{await(async e=>{await c.initWallet(),await c.connect(),await d()})()})),await async function(){r.showSpinner("Loading..."),await l.load(),await d(),e=a.views.create(".view-main",{url:s||"/",browserHistory:!0,browserHistoryRoot:i,reloadCurrent:!0}),r.hideSpinner()}()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`
  <div id="app">


    <!-- Status bar overlay for fullscreen mode-->
    <div class="statusbar"></div>

    <div class="view view-main" >

      <${He} />

    </div>



  </div>

`}}qe.id="761fd2242e";const Ge=qe;var ze=i(51436),Je=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},We=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Ze=function(e,t){return function(i,a){t(i,a,e)}};let Ve=class{app;constructor(e){this.app=e}async queuePromiseView(e){const t=this;let i={id:Ke.newGuid(),icon:e.icon,title:e.title};return async function(){return new Promise(((e,a)=>{t._beforeSaveAction(i),e()}))}().then((async function(){let a=await e.promise;try{t._showSuccess(a,i)}catch(e){t._showError(e,i)}return a}))}_beforeSaveAction(e){e.toast=this.app.toast.create({text:e.title,closeButton:!1}),e.toast.open()}_showError(e,t){t.toast.close(),console.log(e);let i={text:e.message,closeButton:!0,closeButtonText:"Close",closeTimeout:5e3};this.app.toast.create(i).open()}_showSuccess(e,t){t.toast.close();this.app.toast.create({text:"Transaction Submitted",closeButton:!0,closeTimeout:5e3}).open()}};Ve=Je([(0,s.b)(),Ze(0,(0,o.f)("framework7")),We("design:paramtypes",[Object])],Ve);class Ke{static newGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}}var Ye=i(88554),Qe=i(99810),Xe=i(52777),et=i.n(Xe),tt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},it=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const{toDelta:at}=et();let nt=class{constructor(){}async translateContent(e,t=!1){if(!e?.ops)return"";const i=new Ye.bc(e.ops,{encodeHtml:!1});return i.renderCustomWith(st(t)),i.convert()}async translateContentEncodeHtml(e,t=!1){if(!e?.ops)return"";const i=new Ye.bc(e.ops,{});return i.renderCustomWith(st(t)),i.convert()}async generateMarkdown(e){return(0,Qe.deltaToMarkdown)(e.ops)}async deltaFromMarkdown(e){return at(e)}};nt=tt([(0,s.b)(),it("design:paramtypes",[])],nt);const st=e=>function(t,i){if("divider"===t.insert.type)return"<hr />";if("ipfsimage"===t.insert.type){let i="<img ";return e||(i+=`src="${t.insert.value.src}" `),t.insert.value.width&&(i+=`width="${t.insert.value.width}" `),t.insert.value.height&&(i+=`height="${t.insert.value.height}" `),t.insert.value.style&&(i+=`style="${t.insert.value.style}"`),i+="/>",i}};var ot=i(76095),rt=i.n(ot),ct=i(57883),lt=i(3721),ft=(i(92194),i(30496)),dt=i.n(ft),pt=i(42555),ut=i.n(pt),ht=i(86492),gt=i.n(ht);class mt extends Error{errors;constructor(e){super(),this.errors=e}}var vt=i(57393),bt=i(60725),yt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},wt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let St=class{constructor(){}async fromText(e,t,i,a){let n="140px",s="160px";return e&&(t=`<span class='svg-title'>${e}</span><br /><br /><span class='svg-text'>${t}</span>`),t.length>50&&t.length<=100&&(n="110px",s="130px"),t.length>100&&t.length<=175&&(n="90px",s="110px"),t.length>175&&(n="75px",s="95px"),`<svg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg' version='1.1'>\n            <style>\n                * {\n                    --lh: ${s};\n                    height:100%;\n                    margin: 0;\n                    padding: 0;\n                    box-sizing: border-box;\n                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n                }\n\n\n                @keyframes gradient {\n                    0% {\n                        background-position: 0% 50%;\n                    }\n                    25% {\n                        background-position: 50%% 50%;\n                    }\n                    50% {\n                        background-position: 100% 50%;\n                    }\n                    75% {\n                        background-position: 50% 50%;\n                    }\n                    100% {\n                        background-position: 0% 50%;\n                    }\n                }\n\n\n                .svg-h1 {\n\n                    border: 25px solid rgb(78,130,177);\n                    \n                    background: rgb(241,241,241);\n                    background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);\n                    background-size: 400% 400%;\n                    animation: gradient 15s ease infinite;\n\n                    text-align: center;\n                    font-size: ${n};\n                    padding: 70px;            \n                    line-height: var(--lh);\n                    height: 1200px;\n                    width: 1200px;  \n                    -webkit-mask-image: linear-gradient(180deg, rgb(0,0,0) 60%, transparent);        \n                }\n\n                .svg-title {\n                    font-weight: 700;\n                    font-size: 1.25em;\n                }\n\n                .svg-text {\n                    width: 100%;\n                    font-weight: 500;\n                }\n\n                ${a||""}\n\n                ${i||""}\n\n            </style>\n            <g>\n                <foreignObject x='0' y='0' width='1200' height='1200'>\n                    <h1 class="svg-h1" xmlns='http://www.w3.org/1999/xhtml'>${t}</h1>\n                </foreignObject>\n            </g>\n        </svg>`}};St=yt([(0,s.b)(),wt("design:paramtypes",[])],St);var $t=i(28721),kt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},It=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Rt=function(e,t){return function(i,a){t(i,a,e)}};let _t=class{themeRepository;walletService;db;constructor(e,t){this.themeRepository=e,this.walletService=t}async get(e){return this.themeRepository.get(e)}async getIds(){return this.themeRepository.getIds()}async getLatestRevision(e){return this.themeRepository.getLatestRevision(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=(0,$t.Z)(),e.dateCreated=(new Date).toJSON());let t=await(0,vt.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new mt(t);await this.themeRepository.put(e)}async delete(e){return this.themeRepository.delete(e)}async listByChannel(e,t,i){return this.themeRepository.listByChannel(e,t,i)}};_t=kt([(0,s.b)(),Rt(1,(0,o.f)(a.WalletService)),It("design:paramtypes",[ue,Object])],_t);var xt=i(48764).Buffer,Pt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ct=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Tt=class{imageRepository;svgService;quillService;themeService;db;constructor(e,t,i,a){this.imageRepository=e,this.svgService=t,this.quillService=i,this.themeService=a}async load(e){this.db=await this.imageRepository.load(e)}async get(e){return this.imageRepository.get(e)}async put(e){e._id||(e._id=e.cid,e.dateCreated=(new Date).toJSON());let t=await(0,vt.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new mt(t);await this.imageRepository.put(e)}async delete(e){await this.imageRepository.delete(e)}async newFromBuffer(e){const t=new z;return t.buffer=e,t.cid=await bt.of(e),t.generated=!1,t}async newFromSvg(e){const t=new z;return t.svg=e,t.cid=await bt.of(t.svg),t.generated=!0,t}async getUrl(e){if(!e.buffer&&!e.svg)return"";if(e.buffer){let t=this.bufferToBlob(e.buffer);return this.blobToDataURL(t)}return e.svg?this.getSVGURL(e):void 0}async getSVGURL(e){return e.svg?this.svgToDataURL(e.svg):""}bufferToBlob(e){if(null!=Blob)return new Blob([e],{type:"image/jpg"})}blobToDataURL(e){let t;return new Promise(((i,a)=>{const n=new FileReader;n.onload=async function(){t=n.result,i(t)},n.readAsDataURL(e)}))}svgToDataURL(e){return ut()(e)}async newFromItem(e){let t=await this.quillService.translateContentEncodeHtml(e.content),i=[];if(e.themes)for(let t of e.themes)i.push(await this.themeService.get(t));let a="";if(i?.length>0)for(let e of i?.map((e=>e?.coverImageCSS)))e?.length>0&&(a+=e);let n=this.getExcerptByFirstParagraph(t,{pruneLength:500});if(!n||0==n.length)throw new Error("No text");const s=new z;return s.svg=await this.svgService.fromText(e.title,n,e.coverImageCSS,a),s.cid=await bt.of(s.svg),s.generated=!0,s}getExcerptByFirstParagraph(e,t){e=gt().unescape(e);const i="number"==typeof t.pruneLength?t.pruneLength:140;return i>0&&(e=dt()(e,i,{ellipsis:""})),e=gt().encode(e,{allowUnsafeSymbols:!0})}async getByIds(e){return this.imageRepository.getByIds(e)}async getImageContent(e){let t;return e.buffer?t=t instanceof Uint8Array?e.buffer:e.buffer.data?.length>0?new Uint8Array(e.buffer.data):xt.from(Object.values(e.buffer)):e.svg&&(t=e.svg),t}async loadImage(e,t){return new Promise((function(i,a){e.onload=function(){i()},e.src=URL.createObjectURL(new Blob([t],{type:"image/jpg"}))}))}async phlipImage(e){const t=document.createElement("canvas");t.width=e.naturalWidth,t.height=e.naturalHeight;const i=t.getContext("2d");i.scale(-1,1),i.drawImage(e,-t.width,0);const a=i.getImageData(0,0,t.width,t.height),n=new Uint8Array(a.data.length);for(let e=0;e<a.data.length;e++)n[e]=a.data[e];return n}};Tt=Pt([(0,s.b)(),Ct("design:paramtypes",[Z,St,nt,_t])],Tt);var At=i(37086),Ot=i(53440),Ft=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},jt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Et=class{settingsRepository;constructor(e){this.settingsRepository=e}async get(){let e;try{e=await this.settingsRepository.get()}catch(e){}return e||Object.assign(new N,{_id:"single",defaultGitProvider:"github",gitProviders:{gitlab:{name:"gitlab"},github:{name:"github"}},welcomeHide:!1})}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id="single",e.dateCreated=(new Date).toJSON());let t=await(0,vt.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new mt(t);await this.settingsRepository.put(e)}};Et=Ft([(0,s.b)(),jt("design:paramtypes",[H])],Et);var Dt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Bt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Mt=class{settingsService;inference;constructor(e){this.settingsService=e}async init(){let e=await this.settingsService.get();e.huggingFace&&(this.inference=new Ot.LF(e.huggingFace))}async generateImage(e,t,i){let a={inputs:t,parameters:{width:1200,height:1200},model:e};return i&&(a.parameters.negative_prompt=i),this.inference.textToImage(a)}};Mt=Dt([(0,s.b)(),Bt("design:paramtypes",[Et])],Mt);var Nt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Lt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ut=class{imageService;huggingFaceService;uiService;activeEditor;initialized=!1;constructor(e,t,i){this.imageService=e,this.huggingFaceService=t,this.uiService=i}init(){if(this.initialized)return;rt().register("modules/imageDropAndPaste",ct.Z),rt().register("modules/blotFormatter",lt.ZP),rt().debug(!1);let e=rt().import("blots/inline");class t extends e{static blotName;static tagName}t.blotName="bold",t.tagName="strong";class i extends e{static blotName;static tagName}i.blotName="italic",i.tagName="em";let a=rt().import("blots/block");class n extends a{static blotName;static tagName}n.blotName="blockquote",n.tagName="blockquote";class s extends a{static blotName;static tagName;static formats(e){return s.tagName.indexOf(e.tagName)+1}}s.blotName="header",s.tagName=["H1","H2"];let o=rt().import("blots/block/embed");class r extends o{static blotName;static tagName}r.blotName="divider",r.tagName="hr";class c extends o{static blotName;static tagName;static create(e){let t=super.create();return t.setAttribute("src",e.src),t.setAttribute("data-cid",e.cid),e.width&&t.setAttribute("width",e.width),e.height&&t.setAttribute("height",e.height),e.style&&t.setAttribute("style",e.style),t}static value(e){return{src:e.getAttribute("src"),cid:e.getAttribute("data-cid"),width:e.getAttribute("width"),height:e.getAttribute("height"),style:e.getAttribute("style")}}}c.blotName="ipfsimage",c.tagName="img",rt().register(c),rt().register(n),rt().register(t),rt().register(i),this.initialized=!0}buildQuillPostEditor(e,t){return this.init(),this.activeEditor=new(rt())(e,{bounds:".page-content",modules:{imageDropAndPaste:{handler:(e,t,i)=>{this.imageDropAndPasteHandler(e,t,i)}},toolbar:t,blotFormatter:{specs:[qt],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}},handlers:{link:e=>{if(e){var t=prompt("Enter the URL");this.quill.format("link",t)}else this.quill.format("link",!1)}},theme:"snow"}),this.activeEditor}async generateAIImage(e,t){this.uiService.showSpinner("Generating AI image. This may take a few minutes...");let i=await this.huggingFaceService.generateImage(e,t);await this.insertBlobInEditor(i,this.activeEditor),this.uiService.hideSpinner()}imageClick(){}async imageSelected(e){this.uiService.showSpinner("Processing image..."),this.insertImage(e.files[0]),this.uiService.hideSpinner()}async insertImage(e){let t=await this.insertImageInEditor(e,this.activeEditor);const i=new CustomEvent("image-selected",{detail:{_id:t._id}});document.dispatchEvent(i)}async insertImageInEditor(e,t){let i=await(0,At.readAndCompressImage)(e,{maxWidth:1024});return this.insertBlobInEditor(i,t)}async insertBlobInEditor(e,t){let i=await e.arrayBuffer(),a=await this.imageService.newFromBuffer(new Uint8Array(i));try{await this.imageService.put(a)}catch(e){console.log(e)}let n=await this.imageService.getUrl(a),s=await this.getHeightAndWidthFromDataUrl(n),o=t.getSelection(!0);t.insertText(o.index,"\n",rt().sources.USER);let r=(c=s.width,l=s.height,f=500/c,d=500/l,p=Math.min(f,d),{width:Math.floor(c*p),height:Math.floor(l*p)});var c,l,f,d,p;return t.insertEmbed(o.index,"ipfsimage",{cid:a.cid,src:n,height:r.height,width:r.width},rt().sources.USER),t.setSelection(o.index+2,rt().sources.SILENT),a}async imageDropAndPasteHandler(e,t,i){const a=i.toFile();await this.insertImage(a)}async getHeightAndWidthFromDataUrl(e){return new Promise((t=>{const i=new Image;i.onload=()=>{t({height:i.height,width:i.width})},i.src=e}))}};Ut=Nt([(0,s.b)(),Lt("design:paramtypes",[Tt,Mt,f])],Ut);class Ht extends lt.sL{keyUpListener;onCreate(){const e=this;this.keyUpListener=function(t){e.onKeyUp(t)},document.addEventListener("keyup",e.keyUpListener,!0),this.formatter.quill.root.addEventListener("input",e.keyUpListener,!0)}onDestroy(){document.removeEventListener("keyup",this.keyUpListener),this.formatter.quill.root.removeEventListener("input",this.keyUpListener)}onKeyUp(e){if(this.formatter.currentSpec&&(46===e.keyCode||8===e.keyCode)){const e=rt().find(this.formatter.currentSpec.getTargetElement());e&&e.deleteAt(0),this.formatter.hide()}}}class qt extends lt.N6{getActions(){return[lt.oi,lt.Ce,Ht]}}var Gt=i(48764),zt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Jt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Wt=class{constructor(){}async uploadFile(e){let t;return new Promise(((i,a)=>{const n=new FileReader;n.onload=async function(){t=new Gt.Buffer(n.result),t&&i(t)},e.files.length>0?n.readAsArrayBuffer(e.files[0]):i(t)}))}};Wt=zt([(0,s.b)(),Jt("design:paramtypes",[])],Wt);var Zt=i(48737),Vt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Kt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Yt=function(e,t){return function(i,a){t(i,a,e)}};let Qt=class{contracts;getProvider;$f7;wallet;address;ethersContracts={};provider;constructor(e,t,i){this.contracts=e,this.getProvider=t,this.$f7=i}async initProvider(){this.provider=this.getProvider(),globalThis.ethereum?.on("accountsChanged",(async e=>{delete this.address,e?.length>0&&await this.initWallet(),this.$f7.views.main.router.refreshPage()}))}async initWallet(){console.log("Init wallet"),delete this.address,this.provider||await this.initProvider();let e=await this.provider.send("eth_accounts",[]);if(e?.length>0)return this.connect();console.log("Init wallet complete")}async connect(){console.log("Connect wallet"),await this.provider.send("eth_requestAccounts",[]),this.wallet=await this.provider.getSigner(),this.address=await this.getAddress(),console.log(`Wallet ${this.address} connected`)}async getAddress(){if(!this.provider)return;let e=await this.provider.send("eth_accounts",[]);return e?.length>0?e[0]:void 0}async getWallet(){return this.provider.getSigner()}getContract(e){if(this.ethersContracts[e]&&this.ethersContracts[e].signer==this.wallet)return this.ethersContracts[e];let t=this.contracts[e];return this.ethersContracts[e]=new Zt.CH(t.address,t.abi,this.wallet?this.wallet:this.provider),this.ethersContracts[e]}truncateEthAddress(e){const t=e.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);return t?`${t[1]}…${t[2]}`:e}};Qt=Vt([(0,s.b)(),Yt(0,(0,o.f)("contracts")),Yt(1,(0,o.f)("provider")),Yt(2,(0,o.f)("framework7")),Kt("design:paramtypes",[Array,Function,Object])],Qt);var Xt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ei=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},ti=function(e,t){return function(i,a){t(i,a,e)}};let ii=class{authorRepository;walletService;db;constructor(e,t){this.authorRepository=e,this.walletService=t}async load(e){this.db=await this.authorRepository.load(e)}async get(e){return this.authorRepository.get(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=e.walletAddress,e.dateCreated=(new Date).toJSON());let t=await(0,vt.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new mt(t);return this.authorRepository.put(e)}async insertIfNew(e){let t;try{t=await this.get(e)}catch(e){}t||await this.put(Object.assign(new R,{_id:e,walletAddress:e}))}getDisplayName(e){if(e)return e.name?e.name:this.walletService.truncateEthAddress(e._id)}async getLatestRevision(e){return this.authorRepository.getLatestRevision(e)}};ii=Xt([(0,s.b)(),ti(1,(0,o.f)(a.WalletService)),ei("design:paramtypes",[P,Object])],ii);var ai=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ni=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let si=class{queryCacheRepository;constructor(e){this.queryCacheRepository=e}async put(e){e||((e=new $e).dateCreated=(new Date).toJSON()),e.lastUpdated=(new Date).toJSON(),await this.queryCacheRepository.put(e)}async get(e){return this.queryCacheRepository.get(e)}async delete(e){console.log(e),await this.queryCacheRepository.delete(e)}};si=ai([(0,s.b)(),ni("design:paramtypes",[Re])],si);var oi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ri=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ci=class{originalMetadataRepository;db;constructor(e){this.originalMetadataRepository=e}async get(e){return this.originalMetadataRepository.get(e)}async put(e){e._id||(e._id=e.cid,e.dateCreated=(new Date).toJSON());let t=await(0,vt.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new mt(t);await this.originalMetadataRepository.put(e)}async delete(e){await this.originalMetadataRepository.delete(e)}async getByIds(e){return this.originalMetadataRepository.getByIds(e)}async newFromText(e){const t=new je;return t.content=e,t.cid=await bt.of(t.content),t}};ci=oi([(0,s.b)(),ri("design:paramtypes",[Be])],ci);var li=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},fi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let di=class{itemRepository;imageService;queryCacheService;originalMetadataService;constructor(e,t,i,a){this.itemRepository=e,this.imageService=t,this.queryCacheService=i,this.originalMetadataService=a}async get(e){return this.itemRepository.get(e)}async getIds(){return this.itemRepository.getIds()}async getLatestRevision(e){return this.itemRepository.getLatestRevision(e)}async getByTokenId(e,t){return this.itemRepository.getByTokenId(e,t)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=(0,$t.Z)(),e.dateCreated=(new Date).toJSON(),null==e.tokenId&&(e.tokenId=await this.getNextTokenId(e.channelId)));let t=await(0,vt.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new mt(t);await this.itemRepository.put(e)}async delete(e){await this.itemRepository.delete(e)}async getByImageId(e){return this.itemRepository.getByImageId(e)}async getByAnimationId(e){return this.itemRepository.getByAnimationId(e)}async listByChannel(e,t,i){return this.itemRepository.listByChannel(e,t,i)}async exportNFTMetadata(e,t,i){if("existing"==e.forkType){console.log(`Exporting original metadata for token #${t.tokenId}`);let e=await this.originalMetadataService.get(t.originalJSONMetadataId);return JSON.parse(e.content)}let a={tokenId:t.tokenId,name:t.title,description:t.description};return t.animationId&&!t.coverImageAsAnimation&&(a.animation_url=`ipfs://${t.animationId}`),t.coverImageId&&(a.image=`ipfs://${i.cid}`),e.attributeOptions.length>0&&(a.attributes=e.attributeOptions.map((e=>{let i=t?.attributeSelections?.filter((t=>e.traitType==t.traitType));return{trait_type:e.traitType,value:i?.length>0?i[0].value:""}}))),a}async setDefaultCoverImage(e){let t=await this.imageService.newFromItem(e),i=await this.get(t.cid);i?e.coverImageId=i._id:(await this.imageService.put(t),e.coverImageId=t._id)}async getNextTokenId(e){let t;try{t=await this.queryCacheService.get(`token_id_stats_by_channel_${e}`);let i=t?.result;return i?.max?i.max+1:1}catch(e){}return 1}async getAttributeCountByChannel(e){return this.itemRepository.getAttributeCountByChannel(e)}async getAttributeInfoBySelections(e,t){return this.itemRepository.getAttributeInfoBySelections(e,t)}};di=li([(0,s.b)(),fi("design:paramtypes",[te,Tt,si,ci])],di);var pi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ui=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let hi=class{attributeCountRepository;db;constructor(e){this.attributeCountRepository=e}async get(e){return this.attributeCountRepository.get(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=`${e.channelId}-${e.traitType}-${e.value}`,e.dateCreated=(new Date).toJSON());let t=await(0,vt.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new mt(t);await this.attributeCountRepository.put(e)}};hi=pi([(0,s.b)(),ui("design:paramtypes",[Ae])],hi);var gi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},mi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let vi=class{channelRepository;imageService;itemService;quillService;schemaService;queryCacheService;attributeCountService;constructor(e,t,i,a,n,s,o){this.channelRepository=e,this.imageService=t,this.itemService=i,this.quillService=a,this.schemaService=n,this.queryCacheService=s,this.attributeCountService=o}async get(e){return this.channelRepository.get(e)}async getLatestRevision(e){return this.channelRepository.getLatestRevision(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=(0,$t.Z)(),e.dateCreated=(new Date).toJSON()),e.description&&(e.descriptionHTML=await this.quillService.translateContent(e.description),e.descriptionMarkdown=await this.quillService.generateMarkdown(e.description)),e.license&&(e.licenseHTML=await this.quillService.translateContent(e.license),e.licenseMarkdown=await this.quillService.generateMarkdown(e.license));let t=await(0,vt.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new mt(t);return this.channelRepository.put(e)}async list(e,t){return this.channelRepository.list(e,t)}async delete(e){await this.schemaService.dropChannel(e._id),await this.channelRepository.delete(e)}async countItemsByChannel(e){let t;try{t=await this.queryCacheService.get(`token_id_stats_by_channel_${e}`)}catch(e){}let i=t?.result;return i?.count?i.count:0}async exportContractMetadata(e,t){let i={name:e.title,description:e.descriptionMarkdown,external_link:e.link,seller_fee_basis_points:0,fee_recipient:t,license:e.license};if(e.coverImageId){let t=await this.imageService.get(e.coverImageId);i.image=`ipfs://${t.cid}`}return i}async buildAttributeCounts(e){let t=await this.itemService.getAttributeCountByChannel(e);for(let i of t){let t,a=`${e}-${i.traitType}-${i.value}`;try{t=await this.attributeCountService.get(a)}catch(e){}t||(t=new Pe),await this.attributeCountService.put(Object.assign(t,i))}}async getGitProviderCredentials(e,t){if(!e.gitProvider||"default"==e.gitProvider){if(t.defaultGitProvider)return t.gitProviders[t.defaultGitProvider];if(t.gitProviders&&t.gitProviders.github)return t.gitProviders.github}if(e.gitProvider)return t.gitProviders[e.gitProvider]}};vi=gi([(0,s.b)(),mi("design:paramtypes",[E,Tt,di,nt,Le,si,hi])],vi);var bi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},yi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},wi=function(e,t){return function(i,a){t(i,a,e)}};let Si=class{ipfsRemoteInit;settingsService;peerCount=0;addresses;ipfs;initializing=!1;constructor(e){this.ipfsRemoteInit=e}async init(){if(this.ipfs||this.initializing)return;let e;this.initializing=!0;try{e=await this.settingsService.get()}catch(e){}console.log("Init IPFS"),this.ipfs=await this.ipfsRemoteInit(e?.ipfsHost?e.ipfsHost:"/ip4/127.0.0.1/tcp/5001"),console.log("Init IPFS complete"),this.initializing=!1}async clearInit(){delete this.ipfs,this.initializing=!1}async updateInfo(){let e=await this.ipfs.id(),t=await this.ipfs.swarm.peers();this.peerCount=t.length,this.addresses=e?.addresses?.map((e=>e.toString()));const i=new CustomEvent("update-peers",{detail:{addresses:this.addresses,peers:t.map((e=>e.addr.toString())),count:this.peerCount}});document.dispatchEvent(i),console.log(`IPFS has ${this.peerCount} peers.`)}};bi([(0,o.f)(Et),yi("design:type",Et)],Si.prototype,"settingsService",void 0),Si=bi([(0,s.b)(),wi(0,(0,o.f)("ipfsRemoteInit")),yi("design:paramtypes",[Object])],Si);var $i=i(35717),ki=i(86094),Ii=i.n(ki),Ri=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},_i=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const{forEach:xi}=Array.prototype;let Pi=class{animationRepository;quillService;imageService;themeService;db;constructor(e,t,i,a){this.animationRepository=e,this.quillService=t,this.imageService=i,this.themeService=a}async get(e){return this.animationRepository.get(e)}async put(e){e._id||(e._id=e.cid,e.dateCreated=(new Date).toJSON());let t=await(0,vt.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new mt(t);await this.animationRepository.put(e)}async delete(e){await this.animationRepository.delete(e)}async newFromText(e){const t=new g;return t.content=e,t.cid=await bt.of(t.content),t}async buildAnimationPage(e){let t,i=await this.quillService.translateContent(e.content),a=[];if(e.themes)for(let t of e.themes)a.push(await this.themeService.get(t));let n="";if(a?.length>0)for(let e of a)e.animationCSS?.length>0&&(n+=e.animationCSS);if(e.coverImageAsAnimation){let i=await this.imageService.get(e.coverImageId),a=await this.imageService.getUrl(i);t=this.getFullImageTemplate(a,e.animationCSS,n)}else t=this.getAnimationTemplate(e,i,e.animationCSS,n);return Ii()(t)}getFullImageTemplate(e,t,i){return`<!DOCTYPE html>\n    <html>\n      <head>\n        <style>\n        \n          body { \n            height: 100%; \n            width: 100%;\n            margin: 0;\n            padding: 0;\n\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            overflow: hidden\n          }\n\n          img {\n            flex-shrink: 0;\n            min-width: 100%;\n            width: 100%;\n            height: 100%;\n            min-height: 100%\n            object-fit: cover;\n          }\n\n          ${i||""}\n          ${t||""}\n\n        </style>\n      </head>\n\n      <body>\n        <img src="${e}" />\n      </body>\n    </html>`}getAnimationTemplate(e,t,i,a){return`<!DOCTYPE html>\n        <html>\n        \n          <head>\n              <meta charset="utf-8">\n              <title>${e.title}</title>\n\n              <style>\n\n                html {\n                    height:100%;\n                } \n\n                body {\n                      padding: 0;\n                      margin: 0;\n                      box-sizing: border-box;\n                      height: 100%;\n                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n                }\n\n                .animation-container {\n                  box-sizing: border-box;\n                  padding: 20px;\n                  width:100%;\n                  min-height: 100%;\n                  \n                  background: rgb(241,241,241);\n                  background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);\n\n                  font-size: 20px;\n                  border: 5px solid #4e82b1;\n                  float: left;\n                }\n\n                img { \n                  max-width: 100%;\n                  border: 1px solid #cccccc;\n                  object-fit: cover;\n                }\n\n                .token-id {\n                  color: rgb(79, 79, 79);\n                  font-weight: bold;\n                }\n\n                h4 { \n                  margin-top: 0px; \n                  font-size: 25px;\n                  margin-bottom: 0px;\n                }\n\n                ${a||""}\n                ${i||""}\n\n\n              </style>\n\n          </head>\n\n          <body>\n\n            <div class="animation-container">\n              <h4><b>${e.title?e.title:""} <span class="token-id">#${e.tokenId}</span></b></h4>\n              ${t}\n            </div>\n\n          </body>\n        </html>`}async getByIds(e){return this.animationRepository.getByIds(e)}};Pi=Ri([(0,s.b)(),_i("design:paramtypes",[$,nt,Tt,_t])],Pi);var Ci=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ti=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ai=class{staticPageRepository;quillService;db;constructor(e,t){this.staticPageRepository=e,this.quillService=t}async get(e){return this.staticPageRepository.get(e)}async getIds(){return this.staticPageRepository.getIds()}async getLatestRevision(e){return this.staticPageRepository.getLatestRevision(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=(0,$t.Z)(),e.dateCreated=(new Date).toJSON()),e.content&&(e.contentHTML=await this.quillService.translateContent(e.content),e.contentMarkdown=await this.quillService.generateMarkdown(e.content)),e.name&&(e.slug=this.slugify(e.name));let t=await(0,vt.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new mt(t);await this.staticPageRepository.put(e)}async delete(e){return this.staticPageRepository.delete(e)}async listByChannel(e,t,i){return this.staticPageRepository.listByChannel(e,t,i)}slugify(e){return e.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-")}};Ai=Ci([(0,s.b)(),Ti("design:paramtypes",[re,nt])],Ai);var Oi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Fi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ji=class{itemService;authorService;themeService;imageService;animationService;originalMetadataService;staticPageService;constructor(e,t,i,a,n,s,o){this.itemService=e,this.authorService=t,this.themeService=i,this.imageService=a,this.animationService=n,this.originalMetadataService=s,this.staticPageService=o}async prepareExport(e,t){let i=await this.getExportChannel(e),a=await this.getExportAuthor(e.authorId),n=await this.itemService.listByChannel(e._id,1e5,0),s=[],o=[];i.coverImageId?.length>0&&s.push(i.coverImageId),i.coverBannerId?.length>0&&s.push(i.coverBannerId),a?.coverPhotoId?.length>0&&s.push(a.coverPhotoId);for(let e of n)e.animationId&&!e.coverImageAsAnimation&&o.push(e.animationId),s.push(...this.getImageCidsByItem(e));return s=[...new Set(s)],o=[...new Set(o)],{animationCids:o,imageCids:s,channel:i,author:a,items:n,themeIds:await this.themeService.getIds(),staticPageIds:await this.staticPageService.getIds(),ownerAddress:t}}async createBackup(e){let t=e.author,i=this.getBackupChannel(e.channel,e.items.length),a=[];return t&&a.push(t),{channels:[i],authors:a,items:await this.getBackupItems(e.items),themes:await this.getBackupThemes(e.themeIds),staticPages:await this.getBackupStaticPages(e.staticPageIds),images:await this.getBackupImages(e.imageCids),animations:await this.getBackupAnimations(e.animationCids),originalMetadata:await this.getBackupOriginalMetadata(e.items.filter((e=>null!=e.originalJSONMetadataId)).map((e=>e.originalJSONMetadataId))),itemCount:e.items.length,themeCount:e.themeIds.length,staticPageCount:e.staticPageIds.length,imageCount:e.imageCids.length,animationCount:e.animationCids.length}}getImageCidsByItem(e){let t=[];if(e.coverImageId?.length>0&&t.push(e.coverImageId),e.content?.ops)for(let i of e.content.ops)i.insert&&i.insert.ipfsimage&&i.insert.ipfsimage?.cid?.length>0&&t.push(i.insert.ipfsimage.cid);return t}getImageCidsByStaticPage(e){let t=[];if(e.content?.ops)for(let i of e.content.ops)i.insert&&i.insert.ipfsimage&&i.insert.ipfsimage?.cid?.length>0&&t.push(i.insert.ipfsimage.cid);return t}async getExportChannel(e){let t=JSON.parse(JSON.stringify(e));return delete t.contractAddress,delete t.pinJobId,delete t.pinJobStatus,delete t.pubDate,delete t.publishReaderRepoId,delete t.publishReaderRepoPath,delete t.publishReaderRepoBranch,delete t.publishReaderRepoStatus,delete t.publishReaderIPFSStatus,delete t.productionHostname,delete t.productionBaseLibraryURI,delete t.productionBaseURI,delete t.showMintPage,delete t.showActivityPage,delete t.marketplaces,delete t.externalLinks,delete t.importSuccess,delete t.lastUpdated,delete t._rev,delete t._rev_tree,t}async getExportAuthor(e){let t;try{t=await this.authorService.get(e)}catch(e){}return t&&(t=JSON.parse(JSON.stringify(t)),delete t._rev,delete t.lastUpdated,delete t._rev_tree),t}prepareTheme(e){return delete e._rev,delete e._rev_tree,JSON.parse(JSON.stringify(e))}prepareStaticPage(e){return delete e._rev,delete e._rev_tree,JSON.parse(JSON.stringify(e))}prepareItem(e){return delete e._rev,delete e.lastUpdated,delete e._rev_tree,JSON.parse(JSON.stringify(e))}getBackupChannel(e,t){let i=JSON.parse(JSON.stringify(e));return"existing"==i.forkType&&(delete i.forkType,delete i.forkedFromCid,delete i.forkedFromFeeRecipient,delete i.forkedFromId),i.itemCount=t,i}async getBackupThemes(e){let t=[];for(let i of e)t.push(this.prepareTheme(await this.themeService.get(i)));return t}async getBackupStaticPages(e){let t=[];for(let i of e)t.push(this.prepareStaticPage(await this.staticPageService.get(i)));return t}async getBackupItems(e){let t=[],i=0;for(let a of e){let n=this.prepareItem(a);if(n.content?.ops?.length>0){let e=[];for(let t of n.content.ops)t.insert&&t.insert.ipfsimage&&delete t.insert.ipfsimage.src,e.push(t);n.content.ops=e}t.push(n),i++,console.log(`Processing token #${n.tokenId} ${i}/${e.length}`)}return console.log("Tokens processed"),t}async getBackupImages(e){let t=[],i=0;for(let a of e){let n=await this.imageService.get(a),s=JSON.parse(JSON.stringify(n));delete s._rev,delete s._rev_tree,delete s.buffer,delete s.svg,t.push(s),i++,console.log(`Processing image #${s._id} ${i}/${e.length}`)}return console.log("Images processed"),t}async getBackupAnimations(e){let t=[],i=0;for(let a of e){let n=await this.animationService.get(a),s=JSON.parse(JSON.stringify(n));delete s._rev,delete s._rev_tree,delete s.content,t.push(s),i++,console.log(`Processing animation #${s._id} ${i}/${e.length}`)}return console.log("Animations processed"),t}async getBackupOriginalMetadata(e){let t=[],i=0;for(let a of e){let n=await this.originalMetadataService.get(a),s=JSON.parse(JSON.stringify(n));delete s._rev,delete s._rev_tree,t.push(s),i++,console.log(`Processing original metadata #${s._id} ${i}/${e.length}`)}return console.log("Original metadata processed"),t}};ji=Oi([(0,s.b)(),Fi("design:paramtypes",[di,ii,_t,Tt,Pi,ci,Ai])],ji);var Ei=i(3969),Di=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Bi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Mi=function(e,t){return function(i,a){t(i,a,e)}};const Ni=new Ei.DOMParser;let Li=class{itemService;channelService;imageService;authorService;animationService;quillService;themeService;queryCacheService;exportService;ipfsService;attributeCountService;dayjs;constructor(e,t,i,a,n,s,o,r,c,l,f,d){this.itemService=e,this.channelService=t,this.imageService=i,this.authorService=a,this.animationService=n,this.quillService=s,this.themeService=o,this.queryCacheService=r,this.exportService=c,this.ipfsService=l,this.attributeCountService=f,this.dayjs=d}async get(e){let t=await this.itemService.get(e);const i=await this.channelService.get(t.channelId);let a=(await this.queryCacheService.get(`token_id_stats_by_channel_${t.channelId}`)).result;return this.getViewModel(t,i,a)}async getNavigation(e,t){let i=await this.itemService.getByTokenId(e,t);const a=await this.channelService.get(i.channelId);return this.getNavigationViewModel(i,a)}async getViewModel(e,t,i){let a,n,s,o,r,c=[],l=!t.contractAddress;if(e.coverImageId)try{let t=await this.imageService.get(e.coverImageId);n={cid:t.cid,url:await this.imageService.getUrl(t)}}catch(e){}if(e.animationId)try{let t=await this.animationService.get(e.animationId);a={cid:t.cid,content:gt().unescape(t.content)};let i=Ni.parseFromString(t.content,"text/html").getElementsByTagName("body")[0];o=gt().unescape((new Ei.B).serializeToString(i)),o="<div"+o.slice(5),o=o.substring(0,o.length-7)+"</div>"}catch(e){}if(t.authorId&&(r=await this.authorService.get(t.authorId),r.coverPhotoId)){let e=await this.imageService.get(r.coverPhotoId);s={cid:e.cid,url:await this.imageService.getUrl(e)}}if(t.attributeOptions.length>0){for(let i of t.attributeOptions){let t=e?.attributeSelections?.filter((e=>i?.traitType==e?.traitType));c.push({id:i.id,traitType:i.traitType,values:i.values,value:t?.length>0?t[0].value:""})}for(let e of c)try{let a=await this.attributeCountService.get(`${t._id}-${e.traitType}-${e.value}`);e.categoryPercent=a?new Intl.NumberFormat("default",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(a.count/i.count):""}catch(e){}}let f=i.max==e.tokenId,d=[];if(e.themes?.length>0)try{for(let t of e.themes)d.push(await this.themeService.get(t))}catch(e){}let p=await this.getImagesFromContent(e);return 0==p.filter((e=>e.cid==n?.cid)).length&&p.push(n),{item:e,themes:d,contentHTML:await this.quillService.translateContent(e.content),animationContentHTML:o,dateDisplay:this.dayjs(e.dateCreated).format("MMM DD YYYY"),channel:t,coverImage:n,animation:a,author:r,authorPhoto:s,authorDisplayName:this.authorService.getDisplayName(r),images:p,attributeSelections:c,editable:l,canDelete:f}}async getNavigationViewModel(e,t){let i=(await this.queryCacheService.get(`token_id_stats_by_channel_${t._id}`)).result,a=await this.getViewModel(e,t,i);return a.item.tokenId<i.max&&(a.next=a.item.tokenId+1),a.item.tokenId>i.min&&(a.previous=a.item.tokenId-1),a}async getListViewModel(e,t){let i;if(e.coverImageId)try{let t=await this.imageService.get(e.coverImageId);i={cid:t.cid,url:await this.imageService.getUrl(t)}}catch(e){}return{item:e,channel:t,coverImage:i}}async listByChannel(e,t,i){let a=[],n=await this.itemService.listByChannel(e,t,i);const s=await this.channelService.get(e);for(let e of n)a.push(await this.getListViewModel(e,s));return a}async getImagesFromContent(e){if(!e.content)return[];let t=e.content.ops;const i=[];if(t?.length>0){for(let e of t)e.insert&&e.insert.ipfsimage&&i.push({cid:e.insert.ipfsimage.cid,url:e.insert.ipfsimage.src});try{let t=await this.imageService.newFromItem(e);i.push({cid:t.cid,url:await this.imageService.getSVGURL(t),svg:t.svg,generated:!0})}catch(e){}}return i}async getNewViewModel(e){let t=await this.channelService.get(e),i=[];for(let e of t.attributeOptions)i.push({id:e.id,traitType:e.traitType,values:e.values,value:"",categoryPercent:""});return{item:{attributeSelections:[]},channel:t,attributeSelections:i,editable:!0,canDelete:!0}}async saveGeneratedCoverImage(e){let t=await this.getImagesFromContent(e),i=t?.filter((t=>e.coverImageId?t.cid==e.coverImageId:1==t.generated)),a=Object.assign(new z,i[0]);if(1==a.generated){delete a.url;try{await this.imageService.put(a)}catch(e){}e.coverImageId=a._id}return a}async saveAnimation(e){let t=await this.animationService.buildAnimationPage(e),i=await this.animationService.newFromText(t);try{await this.animationService.put(i)}catch(e){}return e.animationId=i._id,i}async updateGeneratedCoverImage(e){if(!(await this.imageService.get(e.coverImageId)).generated)return;let t=await this.imageService.newFromItem(e);try{await this.imageService.put(t)}catch(e){}e.coverImageId=t._id}async put(e){if(e.item.imageIds=this.exportService.getImageCidsByItem(e.item),e.item._rev){let t=await this.itemService.get(e.item._id),i=this.exportService.getImageCidsByItem(t).filter((t=>!e.item.imageIds?.includes(t)));for(let t of i)await this.deletePublishedImageByChannel(e.channel,e.item,t);e.item.animationId!=t.animationId&&(console.log(`Removing ${t.animationId} from animations.`),await this.deletePublishedAnimationByChannel(e.channel,e.item,t.animationId))}if(await this.itemService.put(e.item),e.publish){for(let t of e.item.imageIds)try{await this.publishImage(e.channel,await this.imageService.get(t),!1)}catch(e){}try{await this.publishAnimation(e.channel,await this.animationService.get(e.item.animationId),!1)}catch(e){}}if(e.updateQueryCache){let t=await this.queryCacheService.get(`token_id_stats_by_channel_${e.item.channelId}`),i=t.result;e.item.tokenId<i.min&&(i.min=e.item.tokenId),e.item.tokenId>i.max&&(i.max=e.item.tokenId,i.count++),t.result=i,await this.queryCacheService.put(t);let a=await this.itemService.getAttributeInfoBySelections(e.item.channelId,e.item.attributeSelections);for(let t of a){let i,a=`${e.item.channelId}-${t.traitType}-${t.value}`;try{i=await this.attributeCountService.get(a)}catch(e){}i||(i=new Pe,i.channelId=e.item.channelId,i.traitType=t.traitType,i.value=t.value),i.count=t.count,await this.attributeCountService.put(i)}}}async delete(e){let t=await this.channelService.get(e.channelId);await this.itemService.delete(e);let i=this.exportService.getImageCidsByItem(e);for(let a of i)await this.deletePublishedImageByChannel(t,e,a);await this.deletePublishedAnimationByChannel(t,e,e.animationId),await this.deleteJSONForItem(t,e);let a=await this.queryCacheService.get(`token_id_stats_by_channel_${e.channelId}`),n=a.result;e.tokenId==n.min?(n.min=0,n.max=0,n.count=0):(n.max=e.tokenId-1,n.count--),a.result=n,await this.queryCacheService.put(a)}async clone(e){let t=JSON.parse(JSON.stringify(e));delete t._id,delete t._rev,delete t._rev_tree,delete t.tokenId,t=Object.assign(new Y,t);let i=await this.channelService.get(e.channelId);await this.put({channel:i,item:t}),t.contentHTML=await this.quillService.translateContent(t.content,!0);let a=await this.saveGeneratedCoverImage(t);return e.coverImageGenerated=a.generated,await this.saveAnimation(t),await this.put({channel:i,item:t}),t}async publishImage(e,t,i=!0){if(!t)return;let a,n=`${`/export/${e._id}`}/images/${t.cid}.${t.buffer?"jpg":"svg"}`;try{a=await this.ipfsService.ipfs.files.stat(n,{hash:!0})}catch(e){}if(!a?.cid?.toString()){let e=await this.imageService.getImageContent(t);const a=await this.ipfsService.ipfs.add({content:e});await this.ipfsService.ipfs.files.cp(`/ipfs/${a.cid.toString()}`,n,{create:!0,parents:!0,flush:i})}}async deletePublishedImageByChannel(e,t,i){try{let a=await this.imageService.get(i),n=(await this.itemService.getByImageId(i)).filter((e=>e._id!=t._id));if(n?.length>0)return;await this.imageService.delete(a);let s=`${`/export/${e._id}`}/images/${a.cid}.${a.buffer?"jpg":"svg"}`;await this._safeDelete(s)}catch(e){}}async publishAnimation(e,t,i=!0){if(!t)return;let a,n=`${`/export/${e._id}`}/animations/${t.cid}.html`;try{a=await this.ipfsService.ipfs.files.stat(n,{hash:!0})}catch(e){}if(!a?.cid?.toString()){const e=await this.ipfsService.ipfs.add({content:t.content});await this.ipfsService.ipfs.files.cp(`/ipfs/${e.cid.toString()}`,n,{create:!0,parents:!0,flush:i})}}async deletePublishedAnimationByChannel(e,t,i){try{let a=await this.animationService.get(i),n=(await this.itemService.getByAnimationId(a._id)).filter((e=>e._id!=t._id));if(n?.length>0)return;await this.animationService.delete(a);let s=`${`/export/${e._id}`}/animations/${a.cid}.html`;await this._safeDelete(s)}catch(e){}}async deleteJSONForItem(e,t){let i=`${`/export/${e._id}`}/metadata/${t.tokenId}.json`;await this._safeDelete(i)}async _safeDelete(e){let t;try{t=await this.ipfsService.ipfs.files.stat(e,{hash:!0})}catch(e){}t?.cid?.toString()&&await this.ipfsService.ipfs.files.rm(e,{recursive:!0,flush:!0})}};Li=Di([(0,s.b)(),Mi(11,(0,o.f)("dayjs")),Bi("design:paramtypes",[di,vi,Tt,ii,Pi,nt,_t,si,ji,Si,hi,Object])],Li);var Ui=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Hi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},qi=function(e,t){return function(i,a){t(i,a,e)}};let Gi=class{channelService;imageService;authorService;itemService;itemWebService;queryCacheService;schemaService;settingsService;dayjs;constructor(e,t,i,a,n,s,o,r,c){this.channelService=e,this.imageService=t,this.authorService=i,this.itemService=a,this.itemWebService=n,this.queryCacheService=s,this.schemaService=o,this.settingsService=r,this.dayjs=c}async get(e){return this.getViewModel(await this.channelService.get(e))}async getViewModel(e){let t,i,a,n,s=!e.contractAddress;if(await this.imageService.load(e._id),await this.authorService.load(e._id),e.coverImageId)try{let i=await this.imageService.get(e.coverImageId);t={cid:i.cid,url:await this.imageService.getUrl(i)}}catch(e){}if(e.coverBannerId)try{let t=await this.imageService.get(e.coverBannerId);i={cid:t.cid,url:await this.imageService.getUrl(t)}}catch(e){}if(e.authorId&&(n=await this.authorService.get(e.authorId),n.coverPhotoId))try{let e=await this.imageService.get(n.coverPhotoId);a={cid:e.cid,url:await this.imageService.getUrl(e)}}catch(e){}let o,r,c=await this.channelService.countItemsByChannel(e._id);try{o=await this.settingsService.get()}catch(e){}try{r=await this.channelService.getGitProviderCredentials(e,o)}catch(e){}return{channel:e,coverImage:t,coverBanner:i,author:n,authorDisplayName:this.authorService.getDisplayName(n),authorPhoto:a,itemCount:c,editable:s,dateCreated:this.dayjs(e.dateCreated).format("MMM DD YYYY"),gitProvider:r}}async list(e,t){let i=[],a=await this.channelService.list(e,t);for(let e of a.filter((e=>!e.forkType||e.importSuccess)))i.push(await this.getViewModel(e));return i}async upgrade(e){let t=await this.itemService.listByChannel(e._id,1e5,0);for(let e of t){let t=await this.imageService.get(e.coverImageId);e.coverImageGenerated=t.generated;let i=Object.assign(new Y,e);await this.itemService.put(i),console.log(i)}}async regenerateItemMedia(e){let t=await this.itemService.listByChannel(e._id,1e5,0);for(let e of t){await this.itemWebService.updateGeneratedCoverImage(e),await this.itemWebService.saveAnimation(e);let t=Object.assign(new Y,e);await this.itemService.put(t)}}async put(e,t,i){let a,n=await this.channelService.put(e);if(e._rev=n.rev,await this.schemaService.loadChannel(e._id),t)try{await this.imageService.put(Object.assign(new z,t))}catch(e){}if(i)try{await this.imageService.put(Object.assign(new z,i))}catch(e){}try{a=await this.queryCacheService.get(`token_id_stats_by_channel_${e._id}`)}catch(e){}a||(a=new $e,a._id=`token_id_stats_by_channel_${e._id}`,a.result={min:0,max:0,count:0}),await this.queryCacheService.put(a)}};Gi=Ui([(0,s.b)(),qi(8,(0,o.f)("dayjs")),Hi("design:paramtypes",[vi,Tt,ii,di,Li,si,Le,Et,Object])],Gi);var zi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ji=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Wi=class{imageService;authorService;constructor(e,t){this.imageService=e,this.authorService=t}async get(e){return this.getViewModel(await this.authorService.get(e))}async getViewModel(e){let t;if(e.coverPhotoId){let i=await this.imageService.get(e.coverPhotoId);t={cid:i.cid,url:await this.imageService.getUrl(i)}}return{author:e,authorPhoto:t,authorDisplayName:this.authorService.getDisplayName(e)}}};Wi=zi([(0,s.b)(),Ji("design:paramtypes",[Tt,ii])],Wi);var Zi,Vi=i(52861),Ki=i(28490),Yi=i.n(Ki),Qi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Xi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ea=class{static{Zi=this}settingsService;static BASE_URL="https://gitlab.com/api/v4";static READER_REPO_ID=15461980;constructor(e){this.settingsService=e}async createFork(e){console.log("Creating reader fork...");let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let i=`${Zi.BASE_URL}/projects/${Zi.READER_REPO_ID}/fork`,a=`${e.title}`.replace(/[^a-z0-9]/gi,"-").toLowerCase(),n=await this.getExistingFork(e);return n?{id:n.id,path:n.path,branch:"master"}:{id:(await Vi.Z.post(i,{name:a,path:a},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data.id,path:a,branch:"master"}}async createVariables(e){let t=await this.settingsService.get(),i=t.gitProviders.gitlab;if(i.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");t.alchemyKey&&await this._createVariable(e,i,"ALCHEMY_API_KEY",t.alchemyKey)}async _createVariable(e,t,i,a){let n=await this._getVariables(e,t,i),s=`${Zi.BASE_URL}/projects/${e.publishReaderRepoId}/variables`;return n?Vi.Z.put(`${s}/${i}`,{key:i,value:a,masked:!0},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}}):Vi.Z.post(s,{key:i,value:a,masked:!0},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}async _getVariables(e,t,i){let a=`${Zi.BASE_URL}/projects/${e.publishReaderRepoId}/variables/${i}`;try{let e=await Vi.Z.get(a,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}});return e?.data}catch(e){}}async getExistingFork(e){let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let i=`${Zi.BASE_URL}/projects/${Zi.READER_REPO_ID}/forks`,a=(await Vi.Z.get(i,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data,n=`${e.title}`.replace(/[^a-z0-9]/gi,"-").toLowerCase(),s=a.filter((e=>e.path==n&&e.owner.username==t.username));if(1==s?.length)return{id:s[0].id,httpUrlToRepo:s[0].http_url_to_repo,path:s[0].path,branch:s[0].default_branch}}async getForkRepoStatus(e){let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");if(!e.publishReaderRepoId)return;let i=`${Zi.BASE_URL}/projects/${e.publishReaderRepoId}`;return(await Vi.Z.get(i,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data.import_status}async getIPFSActionStatus(e){let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");if(!e.publishReaderRepoId)return;let i=await this.getJobForCommit(e,t);return i?.length>0&&"success"==i[0].status?"finished":void 0}async getJobForCommit(e,t){let i=`${Zi.BASE_URL}/projects/${e.publishReaderRepoId}/jobs`;const a=await Vi.Z.get(i,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}});return a.data?.filter((t=>t.commit?.id==e.publishReaderIPFSStatus.headSha))}async getIPFSActionResult(e){let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");try{let i=await this.getJobForCommit(e,t),a=`${Zi.BASE_URL}/projects/${e.publishReaderRepoId}/jobs/${i[0].id}/artifacts/ipfs/ipfs.json`;let n=(await Vi.Z.get(a,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;return n.archive=`https://gitlab.com/${t.username}/${e.publishReaderRepoPath}/-/jobs/${i[0].id}/artifacts/file/ipfs/${n.cid}.car`,n}catch(e){console.log(e)}}async commit(e,t,i){for(let e of t)e.encoding="base64",e.content=e.content.toString("base64");let a=0,n=this.chunkIt(t,500);for(const[s,o]of n.entries()){a+=o.length,this.logPublishProgress(`Commiting reader data for ${e.title} to GitLab: committing ${o.length} actions. ${a} / ${t.length}`);let r,c=`${Zi.BASE_URL}/projects/${e.publishReaderRepoId}/repository/commits`;r=s===n.length-1?"Commiting reader data complete":`Commiting reader data for ${e.title}`;await Vi.Z.post(c,{branch:"master",commit_message:r,actions:o},{headers:{Authorization:`Bearer ${i.personalAccessToken}`}})}let s=await this.getMostRecentCommit(e,i);return this.logPublishProgress(`Commit successful: ${s}`),s}async deleteReaderBackup(e,t){if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing files from repo...");let i,a=`${Zi.BASE_URL}/projects/${e.publishReaderRepoId}/repository/tree?recursive=true&path=.upload&pagination=keyset`,n=[];do{try{let e=await Vi.Z.get(a,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}}),s=e?.data?.reverse()?.filter((e=>e.name.indexOf(".")>0)).map((e=>({action:"delete",file_path:e.path})));n.push(...s),i=Yi()(e.headers.link),a=i?.next?.url}catch(e){"404 invalid revision or path Not Found"==e.response.data?.message&&(a=void 0)}}while(a);if(n?.length>0){this.logPublishProgress(`Deleting ${n.length} files from repo...`);let i=`${Zi.BASE_URL}/projects/${e.publishReaderRepoId}/repository/commits`;await Vi.Z.post(i,{branch:"master",commit_message:"Deleting .upload",actions:n},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}}async deleteContractBackup(e,t){if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing contract files from repo...");let i=[{action:"delete",file_path:"/backup/contract/contract.json"},{action:"delete",file_path:"/backup/contract/contract-abi.json"}];if(i?.length>0){this.logPublishProgress(`Deleting ${i.length} files from repo...`);let a=`${Zi.BASE_URL}/projects/${e.publishReaderRepoId}/repository/commits`;await Vi.Z.post(a,{branch:"master",commit_message:`Deleting existing contract files for ${e.title}`,actions:i},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}}async getMostRecentCommit(e,t){let i=`${Zi.BASE_URL}/projects/${e.publishReaderRepoId}/repository/commits`;let a=(await Vi.Z.get(i,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;if(a?.length>0)return a[0].id}logPublishProgress(e){if(console.log(e),"undefined"!=typeof window&&void 0!==window.document){const t=new CustomEvent("publish-progress",{detail:{message:e}});document.dispatchEvent(t)}}getBranchName(e){return e.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}chunkIt(e,t){let i=[];for(let a=0;a<e.length;a+=t){let n=e.slice(a,a+t);i.push(n)}return i}};ea=Zi=Qi([(0,s.b)(),Xi("design:paramtypes",[Et])],ea);var ta=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ia=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},aa=function(e,t){return function(i,a){t(i,a,e)}};let na=class{uiService;app;constructor(e,t){this.uiService=e,this.app=t}navigate(e,t,i="main"){console.log(`${i}: navigating to ${e.path}`),t||(t={reloadCurrent:!0,ignoreCache:!1,browserHistory:!0});let a=this.app.view[i];a?a.router.navigate(e,t):console.log(`Could not find view ${i}`)}navigateUrl(e,t,i="main"){console.log(`${i}: navigating to ${e}`);let a=this.app.view[i];a?a.router.navigate(e,t):console.log(`Could not find view ${i}`)}buildRoutesForContainer(e){let t=[];for(let i of globalThis.mappedRoutes){let a=e.get(i.controllerClass);t.push({path:i.path,async:async e=>{try{await this.resolveRoute(e.to,e.resolve,a[i.action](),i.showSpinner)}catch(e){this.uiService.showExceptionPopup(e)}}})}return t.push({path:"(.*)",async async(e){console.log(`404 error: ${e.to.path}`)}}),t}async resolveRoute(e,t,i,a=!0){a&&this.uiService.showSpinner("Loading...");let n=await i;if(!n)return;let s=await n.model,o=await s(e),r=Object.assign({},o);r.container=po,n.view&&t({component:n.view},{props:r,history:!0,browserHistory:!0}),a&&this.uiService.hideSpinner()}};na=ta([(0,s.b)(),aa(1,(0,o.f)("framework7")),ia("design:paramtypes",[f,Object])],na);class sa{model;view;constructor(e,t){this.model=e,this.view=t}}function oa(e,t){return function(i,a,n){globalThis.mappedRoutes||(globalThis.mappedRoutes=[]),globalThis.mappedRoutes.push({path:e,controllerClass:i.constructor,action:a,showSpinner:t})}}function ra(e,{$on:t,$f7:i,$update:a}){let s=n.getWalletService(),o=s.address,r=null!=s.provider,c=e.active,l=e.reader_config,f=e.breadcrumbs;const d=/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/,p=e=>{const t=e.match(d);return t?`${t[1]}…${t[2]}`:e},u=async e=>{document.dispatchEvent(new CustomEvent("connect-wallet"))};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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
                                  ${null!=o?t`
                                    <a href="#" class="link popover-close">${p(o)}</a>
                                `:t`
                                    <a class="popover-close" href="#" @click=${u}>Connect Wallet</a>
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
              
              ${r?t`
                ${null!=o?t`
                      <a href="/admin/author/show/${o}" class="link ${"profile"==c?t`link-active`:t` `}">${p(o)}</a>
                    `:t`
                      <a class="link" href="#" @click=${u}>Connect Wallet</button>
                    `}
              `:t`<span />`}

              <a class="link ${"settings"==c?t`link-active`:t` `}" href="/admin/settings" >
                Settings
              </a> 

            </div>
    
          </div>


          ${f?t`
                  
            <div class="subnavbar">
              <div class="subnavbar-inner">
                
                <div class="breadcrumbs ">
  
                  ${f.map(((e,i)=>t`
                    <div class="breadcrumbs-item ${i==f.length-1?"breadcrumbs-item-active":""}">

                      ${e.path?t`
                        <a href="${e.path}" class="link" >
                          ${e.text}
                        </a>
                      `:t`${e.text}`}


                    </div>  

                    ${e.path&&i!=f.length-1?t`
                      <div class="breadcrumbs-separator"></div>
                    `:t` `}

                    
                  `))}

                </div>
        
              </div>
            </div>


            `:t`<span />`}

          <!-- ${l?.path?t`
              <a href="${l.path}" class="link external">
                <i class="icon icon-back"></i> ${l.title}
              </a>
          `:""} -->

        </div>
      </div>

`}}ra.id="4210cf7d97",ra.style="\n\n\n";const ca=ra;function la(e,{$:t,$h:i,$on:a,$f7:s,$update:o}){let r=n.getInstance(Gi),c=(n.getInstance(Tt),n.getInstance(f)),l=n.getInstance(Et);e.footerText;let d,p,u,h,g,m=[],v=[{text:"Home"}];function b(){console.log("Unload infinite scroll"),s.infiniteScroll.destroy("#channel-index-infinite-scroll"),t(".infinite-scroll-preloader").hide()}async function y(){if(!h&&u){c.showSpinner("Loading..."),h=!0;try{m=await r.list(20,d),m&&20==m.length?d+=m.length:u=!1,0==p&&g.deleteAllItems(),g.appendItems(m)}catch(e){console.log(e)}u||b(),p++,h=!1,c.hideSpinner()}}a("pageAfterOut",((e,t)=>{b()})),a("pageInit",(async(e,i)=>{d=0,p=0,u=!0,h=!1,g=s.virtualList.create({el:"#channel-index-list",renderItem:e=>w(e),items:[],setListHeight:!1,emptyTemplate:'\n              <li class="item-content">\n                <div class="item-inner">\n                    There are no collections yet. <br /><br />Click the \'Create & Import\' button to create your first collection.\n                </div>\n              </li>\n            '}),t("#channel-index-infinite-scroll").trigger("infinite"),g.on("itemsAfterInsert",((e,i)=>{t(".empty").each((e=>{const i=t(e).data("id"),a=m.filter((e=>e.channel._id==i))[0];a.channel.descriptionHTML&&(e.innerHTML=a.channel.descriptionHTML);let n=e.getElementsByTagName("a");for(let e of n)e.classList.add("external");t(e).removeClass("empty")})),t("#channel-index-list ul").css("height","")}));let a=await l.get();if(!a.welcomeHide){s.popup.create({el:".welcome-popup",on:{close:async e=>{a.welcomeHide=!0,await l.put(a)}}}).open()}}));const w=e=>`\n              <li>\n                <a href="/admin/channel/show/${e.channel._id}" class="item-link">\n                  <div class="item-content">\n                    <div class="item-media">\n                      ${e.coverImage?`\n                        <img src="${e.coverImage.url}" class="avatar" alt="Channel cover image" />\n                      `:'\n                        <i class="material-icons avatar">image</i>\n                      '}\n                    </div>\n                    <div class="item-inner">\n                      <div class="item-title-row">\n                        <div class="item-title">\n                          ${e.channel.title}                          \n                        </div>\n                        <div class="item-after"><span class="badge">${e.itemCount}</span></div>\n                      </div>\n\n                      ${e.authorDisplayName?`\n                        <div class="item-subtitle">\n                          By ${e?.authorDisplayName}\n                        </div>\n                      `:""}\n\n                      <div class="description item-text empty" data-id="${e.channel._id}"></div>\n                    \n                    </div>\n                  </div>\n                </a>\n              </li>\n          `;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-posts">

    <${ca} breadcrumbs=${v} />

    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/channel/create-menu">
        <i class="material-icons">create</i>
        <div class="fab-text">Create & Import</div>
      </a>
    </div>


    <div class="page-content infinite-scroll-content hide-toolbar-on-scroll" @infinite=${y} id="channel-index-infinite-scroll">

      <div class="fixed-width-content center">

        <div class="popup welcome-popup">
          <div class="view">
            <div class="page">
              <div class="navbar">
                <div class="navbar-bg"></div>
                <div class="navbar-inner">
                  <div class="title">Welcome and thank you for using Large!</div>
                  <div class="right">
                    <!-- Link to close popup -->
                    <a class="link popup-close">Close</a>
                  </div>
                </div>
              </div>
              <div class="page-content">

                <div class="block">
                  <strong>All data</strong> is in local storage (IndexedDB) in your browser and we can NEVER retreive it for you if it is lost. We do not have it and this is by design. 
              
                  <p>
                    Some browsers <a href="https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria">impose limitations</a> on how long data is stored before it is wiped due to inactivity. 
                    Installing Large NFT to your home screeen as a PWA makes it <a href="https://stackoverflow.com/questions/50795409/is-indexeddb-on-safari-guaranteed-to-be-persistent">less likely</a> for data to be lost but ultimately it's up to the browser. Publish critical data to GitHub/GitLab.
                  </p>
        
                  <p>Help make Large better by submitting bugs and feedback on <a href="https://github.com/LargeNFT/large-nft" class="external">GitHub</a>.</p>
          
                </div>

                
              </div>
            </div>
          </div>
        </div>
  

        <div class="card">
          <div class="card-content card-content-padding">
            Visit the <a href="/admin/settings">settings</a> to configure an AI provider, Git provider, and more.
          </div>
        </div>

  
        <div class="list list-strong list-dividers media-list virtual-list inset" id="channel-index-list">
        </div>
  
        <div class="preloader infinite-scroll-preloader"></div>

      </div>


    </div>


  </div>

`}}la.id="812f750299",la.style="\n\n\n";const fa=la,da=["English","Abkhazian","Afar","Afrikaans","Akan","Albanian","Amharic","Arabic","Aragonese","Armenian","Assamese","Avaric","Avestan","Aymara","Azerbaijani","Bambara","Bashkir","Basque","Belarusian","Bengali","Bihari languages","Bislama","Bosnian","Breton","Bulgarian","Burmese","Catalan, Valencian","Central Khmer","Chamorro","Chechen","Chichewa, Chewa, Nyanja","Chinese","Church Slavonic, Old Bulgarian, Old Church Slavonic","Chuvash","Cornish","Corsican","Cree","Croatian","Czech","Danish","Divehi, Dhivehi, Maldivian","Dutch, Flemish","Dzongkha","Esperanto","Estonian","Ewe","Faroese","Fijian","Finnish","French","Fulah","Gaelic, Scottish Gaelic","Galician","Ganda","Georgian","German","Gikuyu, Kikuyu","Greek (Modern)","Greenlandic, Kalaallisut","Guarani","Gujarati","Haitian, Haitian Creole","Hausa","Hebrew","Herero","Hindi","Hiri Motu","Hungarian","Icelandic","Ido","Igbo","Indonesian","Interlingua (International Auxiliary Language Association)","Interlingue","Inuktitut","Inupiaq","Irish","Italian","Japanese","Javanese","Kannada","Kanuri","Kashmiri","Kazakh","Kinyarwanda","Komi","Kongo","Korean","Kwanyama, Kuanyama","Kurdish","Kyrgyz","Lao","Latin","Latvian","Letzeburgesch, Luxembourgish","Limburgish, Limburgan, Limburger","Lingala","Lithuanian","Luba-Katanga","Macedonian","Malagasy","Malay","Malayalam","Maltese","Manx","Maori","Marathi","Marshallese","Moldovan, Moldavian, Romanian","Mongolian","Nauru","Navajo, Navaho","Northern Ndebele","Ndonga","Nepali","Northern Sami","Norwegian","Norwegian Bokmål","Norwegian Nynorsk","Nuosu, Sichuan Yi","Occitan (post 1500)","Ojibwa","Oriya","Oromo","Ossetian, Ossetic","Pali","Panjabi, Punjabi","Pashto, Pushto","Persian","Polish","Portuguese","Quechua","Romansh","Rundi","Russian","Samoan","Sango","Sanskrit","Sardinian","Serbian","Shona","Sindhi","Sinhala, Sinhalese","Slovak","Slovenian","Somali","Sotho, Southern","South Ndebele","Spanish, Castilian","Sundanese","Swahili","Swati","Swedish","Tagalog","Tahitian","Tajik","Tamil","Tatar","Telugu","Thai","Tibetan","Tigrinya","Tonga (Tonga Islands)","Tsonga","Tswana","Turkish","Turkmen","Twi","Uighur, Uyghur","Ukrainian","Urdu","Uzbek","Venda","Vietnamese","Volap_k","Walloon","Welsh","Western Frisian","Wolof","Xhosa","Yiddish","Yoruba","Zhuang, Chuang","Zulu"];var pa=i(18634),ua=i.n(pa),ha=i(69380);function ga(e,{$:t,$on:i,$f7:a,$update:s}){n.getWalletService(),n.getInstance(f),n.getInstance(vi);let o=n.getInstance(Wt),r=n.getInstance(Tt);const c=e=>{if(O=void 0,F=void 0,!e)return;let t=ha.vz(e,"ether");try{O=ha.bM(t),F=t.toString()}catch(e){console.log(e)}},l=async e=>{c(e.currentTarget.value),await s()},d=async e=>{j.channel.contractAddress=e.currentTarget.value,await s()},p=async e=>{t("#cover-image-browse").click()},u=async e=>{let t=await o.uploadFile(document.getElementById("cover-image-browse")),i=await r.newFromBuffer(t);const a=new CustomEvent("cover-image-updated",{detail:{coverImage:i}});document.dispatchEvent(a),j.coverImage={cid:i.cid,url:await r.getUrl(i)},await s()},h=async e=>{t("#banner-browse").click()},g=async e=>{let t=await o.uploadFile(document.getElementById("banner-browse")),i=await r.newFromBuffer(t);const a=new CustomEvent("cover-banner-updated",{detail:{coverBanner:i}});document.dispatchEvent(a),j.coverBanner={cid:i.cid,url:await r.getUrl(i)},await s()},m=async e=>{j.channel.disableForks="true"==t(e.currentTarget).val(),N=!j.channel.disableForks,await s()},v=async e=>{j.channel.showMintPage="true"==t(e.currentTarget).val(),await s()},b=async e=>{j.channel.showActivityPage="true"==t(e.currentTarget).val(),await s()},y=async e=>{j.channel.gitProvider=t(e.currentTarget).val(),await s()},w=async function(e){e.preventDefault();let i=t(e.target).data("id"),n=L.find((e=>e.id==i));a.form.fillFromData("#save-attribute-form",n),await s(),a.popup.open(".edit-category-popup")},S=async e=>{e.preventDefault();let i=t(e.currentTarget).data("id");L=L.filter((e=>e.id!=i)),await s()},$=async e=>{let t={id:(0,$t.Z)(),traitType:"",values:[]};a.form.fillFromData("#save-attribute-form",t),await s(),a.popup.open(".edit-category-popup")},k=async e=>{e.preventDefault(),a.popup.close(".edit-category-popup")},I=async function(e){e.preventDefault();let i=t(e.target).data("id"),n=U.find((e=>e.id==i));a.form.fillFromData("#save-external-links-form",n),await s(),a.popup.open(".edit-external-links-popup")},R=async e=>{e.preventDefault();let i=t(e.currentTarget).data("id");console.log(i),U=U.filter((e=>e.id!=i)),await s()},_=async e=>{let t={id:(0,$t.Z)(),name:"",link:""};a.form.fillFromData("#save-external-links-form",t),await s(),a.popup.open(".edit-external-links-popup")},x=async e=>{e.preventDefault(),a.popup.close(".edit-external-links-popup")},P=async function(e){e.preventDefault();let i=t(e.target).data("id"),n=H.find((e=>e.id==i));a.form.fillFromData("#save-marketplaces-form",n),await s(),a.popup.open(".edit-marketplaces-popup")},C=async e=>{e.preventDefault();let i=t(e.currentTarget).data("id");H=H.filter((e=>e.id!=i)),await s()},T=async e=>{let t={id:(0,$t.Z)(),name:"",link:""};a.form.fillFromData("#save-marketplaces-form",t),await s(),a.popup.open(".edit-marketplaces-popup")},A=async e=>{e.preventDefault(),a.popup.close(".edit-marketplaces-popup")};t(document).on("popup:closed",".edit-category-popup",(async e=>{let t=a.form.convertToData("#save-attribute-form"),i={id:t.id,traitType:t.traitType,values:t.values?JSON.parse(t.values).map((e=>e.value)):[]};if(!i.traitType)return;let n=L.find((e=>e.id==i.id));n?Object.assign(n,i):L.push(i),await s()})),t(document).on("popup:open",".edit-category-popup",(async e=>{new(ua())(document.getElementById("options-input")),t('input[name="traitType"]').focus()})),t(document).on("popup:closed",".edit-external-links-popup",(async e=>{let t=a.form.convertToData("#save-external-links-form");if(t.name){let e={id:t.id,name:t.name,link:t.link},i=U.find((t=>t.id==e.id));i?Object.assign(i,e):U.push(e)}await s()})),t(document).on("popup:closed",".edit-marketplaces-popup",(async e=>{let t=a.form.convertToData("#save-marketplaces-form");if(t.name){let e={id:t.id,name:t.name,link:t.link},i=H.find((t=>t.id==e.id));i?Object.assign(i,e):H.push(e)}await s()}));let O,F,j=e.channel,E=e.description_toolbar,D=e.description_editor,B=e.license_toolbar,M=e.license_editor,N=!j.channel.disableForks,L=[],U=[],H=[];return j&&(c(j.channel.mintPrice),j?.channel?.attributeOptions?.length>0&&(L=j.channel.attributeOptions),j.channel.externalLinks?.length>0&&(U=j.channel.externalLinks),j.channel.marketplaces?.length>0&&(H=j.channel.marketplaces)),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div>
        <input type="hidden" name="_id" value="${j?.channel?._id}" />
        <input type="hidden" name="_rev" value="${j?.channel?._rev}" />
        <input type="hidden" name="dateCreated" value="${j?.channel?.dateCreated}" />
        <input type="hidden" name="authorId" value="${j?.channel?.authorId}" />
        <input type="hidden" name="contractAddress" value="${j?.channel?.contractAddress}" />

        <div class="card">
            <div class="card-content">
                <div class="card-content card-content-padding">
                    <div class="list media-list">
                        <ul>
                            <li>
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">Title</div>
                                        <div class="item-input-wrap">
                                            ${j.editable?t`
                                            <input type="text" name="title" placeholder="Collection title"
                                                value="${j?.channel?.title}" required minlength="3"
                                                tabindex="1" id="collection-title" />
                                            `:t`
                                            <input type="text" name="title" placeholder="Collection title"
                                                value="${j?.channel?.title}" required minlength="3"
                                                tabindex="1" id="collection-title" disabled />
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
    
                                            ${j.editable?t`
                                            <input type="text" name="symbol" placeholder="Symbol (eg BAYC)"
                                                value="${j?.channel?.symbol}" tabindex="2"
                                                required id="collection-symbol" />
                                            `:t`
                                            <input type="text" name="symbol" placeholder="Symbol (eg BAYC)"
                                                value="${j?.channel?.symbol}" tabindex="2" required
                                                disabled id="collection-symbol" />
                                            `}
    
    
    
                                        </div>
                                    </div>
                                </div>
                            </li>
    
                            <li>
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">Description</div>
    
                                        <div id="${E}">
    
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
                                            id="${D}" tabindex="3"></div>
    
                                    </div>
                                </div>
                            </li>
    
                            <li class="item-content item-input">
                                <div class="item-inner">
                                    <div class="item-title item-label">Language</div>
                                    <!-- additional "input-dropdown-wrap" class -->
                                    <div class="item-input-wrap input-dropdown-wrap">
                                        <select name="language" tabindex="9">
                                            ${da.map((e=>t`
                                            ${j?.channel?.language==e?t`
                                            <option value="${e}" selected>${e}</option>
                                            `:t`
                                            <option value="${e}">${e}</option>
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

        <div class="card">
            <div class="card-content">
                <div class="list media-list">
                    <ul>

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
                                    <div class="item-title">Mint & Contract Info</div>
                                  </div>
                                  <div class="item-subtitle">
                                    Set mint price and contract info.
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

                        <form @submit="${k}" id="save-attribute-form">
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

                        <form @submit="${x}" id="save-external-links-form">

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

                        <form @submit="${A}" id="save-marketplaces-form">

                            <input type="hidden" name="id" />

                            <div class="list list-strong">

                                <ul>
                                    <li>
                                        <div class="item-content item-input">
                                            <div class="item-inner">
                                                <div class="item-title item-label">Name</div>
                                                <div class="item-input-wrap">

                                                    <!-- <select name="name">
                                                        <option value="OpenSea">OpenSea</option>
                                                        <option value="LooksRare">LooksRare</option>
                                                        <option value="Blur">Blur</option>
                                                    </select> -->

                                                    <input type="text" name="name" placeholder="Enter marketplace name" required minlength="3" tabindex="60" />
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

                                                ${j.coverImage?t`
                                                <img class="avatar-preview" src="${j?.coverImage.url}" alt="Collection avatar" />

                                                `:t`
                                                <i class="material-icons avatar-preview">image</i>
                                                `}

                                                <input type="button" class="button button-fill browse-file"
                                                    value="Browse" @click="${p}"
                                                    tabindex="4" />
                                                <input type="hidden" name="coverImageId"
                                                    value="${j?.coverImage?.cid}" />
                                                <input type="file" id="cover-image-browse" style="display: none"
                                                    @change="${u}" />

                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Collection Banner</div>
                                            <div class="item-input-wrap">

                                                ${j?.coverBanner?t`
                                                <img class="cover-banner-preview"
                                                    src="${j?.coverBanner.url}" />
                                                `:t`
                                                <i class="material-icons cover-banner-preview">image</i>
                                                `}

                                                <input type="button" class="button button-fill browse-file"
                                                    value="Browse" @click="${h}" tabindex="5" />
                                                <input type="hidden" name="coverBannerId"
                                                    value="${j?.coverBanner?.cid}" />

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

                            ${L?.length>0?t`

                                <ul>
        
                                    ${L?.map((e=>t`
                                    <li>
                                        <span style="width: 100px; margin-right: 10px;">${e.traitType}</span>
        
                                        ${j.editable?t`
                                        <a class="link" href="#" data-id="${e.id}" @click="${w}">Edit</a> | <a
                                            class="link" href="#" data-id="${e.id}" @click="${S}">Delete</a>
                                        `:t` `}
        
                                        <p>
                                            ${e.values?.map(((e,i)=>t`
        
                                        <div class="chip chip-outline">
                                            <div class="chip-label">${e}</div>
                                        </div>
        
                                        `))}
                                        </p>
                                    </li>
                                    `))}
        
                                </ul>
    
                            `:t`
                                No attributes exist.
                            `}
        
                            ${j.editable?t`
                                <a class="button button-outline add-category-button" @click="${$}" tabindex="10">Add Attribute Type</a>
                            `:t` `}

                            
    
                            <input type="hidden" name="attributeOptions" value="${JSON.stringify(L)}" />
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

                                                ${j.editable?t`
                                                <input type="number" placeholder="Enter price for one piece (eg 0.08)"
                                                    @change="${l}" step="any" tabindex="11"
                                                    value="${j?.channel?.mintPrice}" />
                                                `:t`
                                                <input type="number" placeholder="Enter price for one piece (eg 0.08)"
                                                    @change="${l}" step="any" tabindex="11"
                                                    value="${j?.channel?.mintPrice}" disabled />
                                                `}

                                                <input type="hidden" name="mintPrice" value="${O}" />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                ${O?t`
                                <li tabindex="-1">
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-text"> You will receive <strong>${O}</strong> ETH
                                                (${F} wei) for
                                                each mint.</div>
                                        </div>
                                    </div>
                                </li>
                                `:t``}

                                

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Contract Address</div>
                                            <div class="item-input-wrap">

                                                <input type="text" name="contractAddress" placeholder="Leave blank to deploy a new contract during export."
                                                    @change="${d}" tabindex="13"
                                                    value="${j?.channel?.contractAddress}" />

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
                                            <select name="disableForks" @change="${m}">

                                                ${j.channel.disableForks?t`
                                                <option value="false">Copyleft / CC0</option>
                                                <option value="true" selected>Copyright</option>
                                                `:t`
                                                <option value="false" selected>Copyleft / CC0</option>
                                                <option value="true">Copyright</option>
                                                `}


                                            </select>
                                        </div>
                                    </div>
                                </li>

                                ${j.channel.disableForks?t`<span />`:t`

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

                                            <div id="${B}">

                                                <!-- Add a bold button -->
                                                <button class="ql-bold"></button>
                                                <button class="ql-italic"></button>
                                                <button class="ql-strike"></button>
                                                <button class="ql-underline"></button>

                                            </div>

                                            <div class="editor bg-color-white text-color-black channel-editor"
                                                id="${M}" tabindex="13"></div>

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
                                            <select name="gitProvider" @change="${y}" tabindex="14">

                                                ${j.channel.gitProvider&&"default"!=j.channel.gitProvider?t`
                                                <option value="default">Default</option>
                                                `:t`
                                                <option value="default" selected>Default</option>
                                                `}

                                                ${"github"==j.channel.gitProvider?t`
                                                <option value="github" selected>GitHub</option>
                                                `:t`
                                                <option value="github">GitHub</option>
                                                `}


                                                ${"gitlab"==j.channel.gitProvider?t`
                                                <option value="gitlab" selected>GitLab</option>
                                                `:t`
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
                                                <input type="text" name="productionHostname" placeholder="http://localhost" value="${j?.channel?.productionHostname}" tabindex="40" />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Production Base URI</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="productionBaseURI" placeholder="/" value="${j?.channel?.productionBaseURI}" tabindex="41" />
                                            </div>
                                        </div>
                                    </div>
                                </li>


                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Production Base Library URI</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="productionBaseLibraryURI" placeholder="/" value="${j?.channel?.productionBaseLibraryURI}" tabindex="42" />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Show Mint Page?</div>
                                            <div class="item-input-wrap">

                                                <select name="showMintPage" @change="${v}">

                                                    ${1==j.channel.showMintPage?t`
                                                        <option value="false">No</option>
                                                        <option value="true" selected>Yes</option>
                                                    `:t`
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

                                                <select name="showActivityPage" @change="${b}">

                                                    ${1==j.channel.showActivityPage?t`
                                                        <option value="false">No</option>
                                                        <option value="true" selected>Yes</option>
                                                    `:t`
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

                                                ${U?.length>0?t`

                                                    <ul style="padding-left: 0px;">
                            
                                                        ${U?.map((e=>t`
                                                        <li>
                                                            <span style="width: 100px; margin-right: 10px;">${e.name}</span>
                            
                                                            <a class="link" href="#" data-id="${e.id}" @click="${I}">Edit</a> | 
                                                            <a class="link" href="#" data-id="${e.id}" @click="${R}">Delete</a>
                                                        </li>
                                                        `))}
                            
                                                    </ul>

                        
                                                `:t`
                                                    No external links exist.
                                                `}
                            
                                                <a class="button button-outline " @click="${_}" tabindex="10">Add External Link</a>
                                                         
                                                <input type="hidden" name="externalLinks" value="${JSON.stringify(U)}" />
               
                                            </div>
                                        </div>
                                    </div>
                                </li>


                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Marketplaces</div>
                                            <div class="block">

                                                ${H?.length>0?t`

                                                    <ul style="padding-left: 0px;">
                            
                                                        ${H?.map((e=>t`
                                                        <li>
                                                            <span style="width: 100px; margin-right: 10px;">${e.name}</span>
                            
                                                            <a class="link" href="#" data-id="${e.id}" @click="${P}">Edit</a> | 
                                                            <a class="link" href="#" data-id="${e.id}" @click="${C}">Delete</a>
                                                        </li>
                                                        `))}
                            
                                                    </ul>

                        
                                                `:t`
                                                    No marketplaces exist.
                                                `}
                            
                                                <a class="button button-outline " @click="${T}" tabindex="10">Add Marketplace</a>

                    
                                                
                        
                                                <input type="hidden" name="marketplaces" value="${JSON.stringify(H)}" />
               


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


`}}ga.id="4a06b7cd66",ga.style="\n\n\n\n\n\n";const ma=ga;var va=i(20637);function ba(e,{$:t,$on:i,$f7:a,$update:s}){n.getInstance(vi);let o,r=n.getInstance(Gi),c=n.getInstance(ii),l=n.getInstance(Ut),d=(n.getInstance(f),n.getWalletService()),p=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Create Collection"}];va.Z.configure({languages:["css"]});let u,h,g={channel:{mintPrice:"0.00",authorId:d.address},themes:[],staticPages:[],editable:!0,disableForks:!1};const m=async e=>{if(e.preventDefault(),!document.getElementById("create-channel-form").reportValidity())return void document.getElementById("collection-title").scrollIntoView();let t=Object.assign(new O,a.form.convertToData("#create-channel-form"));t.description=l.activeEditor.getContents(),t.license=o.getContents(),t.sellerFeeBasisPoints=parseInt(t.sellerFeeBasisPoints),t.attributeOptions?t.attributeOptions=JSON.parse(t.attributeOptions):t.attributeOptions=[],t.externalLinks?t.externalLinks=JSON.parse(t.externalLinks):t.externalLinks=[],t.marketplaces?t.marketplaces=JSON.parse(t.marketplaces):t.marketplaces=[],t.disableForks="true"==t.disableForks,t.showMintPage="true"==t.showMintPage,t.showActivityPage="true"==t.showActivityPage;try{await r.put(t,u,h),t.authorId&&await c.insertIfNew(t.authorId);a.toast.show({text:"Collection saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate(`/admin/channel/show/${t._id}`)}catch(e){console.log(e),a.dialog.alert(e.errors,"There was an error")}};i("pageInit",(async(e,i)=>{t("#create-channel-form").attr("novalidate","novalidate"),await l.init(),l.buildQuillPostEditor("#create-channel-description-editor","#create-channel-description-toolbar"),o=new(rt())("#create-channel-license-editor",{bounds:".page-content",modules:{toolbar:"#create-channel-license-toolbar"},theme:"snow"})}));return t(document).on("cover-image-updated",(async e=>{u=e.detail.coverImage})),t(document).on("cover-banner-updated",(async e=>{h=e.detail.coverBanner})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-create-channel">

    <${ca} breadcrumbs=${p} />

    <div class="page-content hide-toolbar-on-scroll">

        <!-- Slider container -->
        <form id="create-channel-form" @submit="${m}" class="fixed-width-content center">
      
          <div class="block-title block-title-medium">Create Collection</div>


          <${ma} 
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
  </div>

`}}ba.id="1c11c1406f",ba.style="\n\n\n\n";const ya=ba;function wa(e,{$:t,$on:i,$f7:a,$update:s}){let o=n.getInstance(di),r=e.channel,c=e.item,l=e.token_id?e.token_id:c.item.tokenId;const f=async e=>{e.preventDefault();const i=t(e.currentTarget).children(".goto-input").val();await o.getByTokenId(r,parseInt(i.toString()))?a.views.main.router.navigate(`/admin/channel/show/${r}/${parseInt(i.toString())}`):a.dialog.alert("Invalid Page")};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="card" >
      <form class="card-content card-content-padding" @submit="${f}">
        <input type="number" class="goto-input" style="width: 60px; border: 1px solid #cccccc; display: inline-block;" value="${l}" min="0"  />
        <span class="paging-label">Enter Token ID</span>
        <button class="goto-button button button-small button-fill">Go</button>
      </form>
    </div>

`}}wa.id="9383c322f1",wa.style="    \n";const Sa=wa;i(18515);function $a(e,{$:t,$on:i,$f7:a,$update:s}){n.getInstance(vi),n.getWalletService();let o,r=globalThis.container.get(Li),c=e.channelViewModel,l=e.firstPageItems,f=[],d=0,p=!0,u=!1,h=c.itemCount;let g=c.editable,m=[{text:"Home",path:"/"},{text:c.channel.title}];const v=e=>{const t=b();o.params.cols=t>=1024?5:2,o.params.height=t>=1024?290:250,o?.update(),console.log("Resized...")},b=()=>Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),y={el:"#item-list",createUl:!1,renderItem(e){return`<li class="flex-card">\n                  <a href="/admin/channel/show/${(t=e).channel._id}/${t.item.tokenId}" class="item-link">\n                      <div class="card" >\n                          <div class="card-content">\n                              <div class="square">\n                                  <img src="${t.coverImage?.url}" alt="Channel cover image"/>\n                              </div>\n                          </div>\n\n\n                          <div class="card-footer">\n                              ${t.item.title?t.item.title:`#${t.item.tokenId}`} \n                          </div>\n                      </div>\n                  </a>\n              </li>\n      `;var t},height:b()>=1024?290:250,items:f,cols:b()>=1024?5:2,emptyTemplate:'\n          <li class="item-content">\n              <div class="item-inner">\n                  No items in collection.\n              </div>\n          </li>\n          '};i("pageInit",(async(e,i)=>{if(f.push(...l),d=l.length,c?.coverBanner?.url?t(`.show-channel-banner-${c.channel._id}`).css("background-image",`url(${c.coverBanner.url})`):t(`.show-channel-banner-${c.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${c.channel._id}`)){let e=document.getElementById(`channel-show-description-${c.channel._id}`).getElementsByTagName("a");for(let t of e)t.classList.add("external")}t(".animation-container a").addClass("external"),window.addEventListener("resize",v),w()})),i("pageBeforeOut",(async()=>{window.removeEventListener("resize",v)}));const w=()=>{o=a.virtualList.create(y),o.items?.length<h?document.getElementById("item-list-infinite-scroll").addEventListener("infinite",S):t(".infinite-scroll-preloader").hide()};async function S(e){if(!u&&p){console.log("Infinite scrolling..."),u=!0;try{let e=await r.listByChannel(c.channel._id,te.CHUNK_SIZE,d);d+=e.length,d>=h&&(p=!1),o.appendItems(e)}catch(e){console.log(e)}a.preloader.hide(),p||(console.log("Unload infinite scroll item list"),a.infiniteScroll.destroy("#item-list-infinite-scroll"),a.virtualList.destroy("#item-list"),o=void 0,t(".infinite-scroll-preloader").hide()),u=!1}}return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-show-collection">

    <${ca} breadcrumbs=${m} />


    ${g?t`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${c.channel._id}">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    `:t``}


    <div class="page-content infinite-scroll-content hide-toolbar-on-scroll" id="item-list-infinite-scroll">

      <div class="fixed-width-content center">

        <channel-card channel_view_model=${c}></channel-card>

        <div class="block">
          <p class="segmented">
            <a class="button button-outline button-active" href="#">Items</a>
            <a class="button button-outline" href="/admin/channel/themes/${c.channel._id}">Themes</a>
            <a class="button button-outline" href="/admin/channel/static-pages/${c.channel._id}">Static Pages</a>
          </p>
        </div>
  
        <${Sa} channel=${c.channel._id} token_id="1" />
  
  
      
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

`}}$a.id="38e0de805c",$a.style="\n  \n\n";const ka=$a;function Ia(e,{$:t,$on:i,$f7:a,$update:n}){let s=e.theme,o=e.cover_image_css_editor_id,r=e.animation_css_editor_id;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="list">

        <input type="hidden" name="_id"  value="${s?._id}" />
        <input type="hidden" name="_rev" value="${s?._rev}" />
        <input type="hidden" name="dateCreated" value="${s?.dateCreated}" />

        <ul>
            <li>
                <div class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Title</div>
                        <div class="item-input-wrap">
                            <input type="text" name="name" placeholder="Name"
                                value="${s?.name}" required  minlength="3" tabindex="1" />
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
                        <div class="editor bg-color-white text-color-black css-editor" id="${r}" tabindex="3" style="min-height: 100px;">.animation-container {}</div>
                    </div>
                </div>
            </li>

        </ul>
    </div>


`}}Ia.id="3f884f398f",Ia.style="\n    \n";const Ra=Ia;function _a(e,{$:t,$on:i,$f7:a,$update:s}){let o,r,c,l=n.getInstance(_t),d=(n.getInstance(f),e.channelViewModel),p=e.themes,u=d.editable,h=[{text:"Home",path:"/"},{text:d.channel.title,path:`/admin/channel/show/${d.channel._id}`},{text:"Themes"}];const g=async()=>{p=await l.listByChannel(d.channel._id,1e3,0)},m=function(e){r=new(rt())("#add-theme-cover-image-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>hljs.highlightAuto(e).value},toolbar:!1}}),c=new(rt())("#add-theme-animation-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>hljs.highlightAuto(e).value},toolbar:!1}})},v=async function(e){e.preventDefault();let t=Object.assign(new fe,a.form.convertToData("#add-theme-form"));t.coverImageCSS="\n"!=r.getText()?r.getText():void 0,t.animationCSS="\n"!=c.getText()?c.getText():void 0,t.channelId=d.channel._id,t._id=(0,$t.Z)(),t.dateCreated=(new Date).toJSON();try{await l.put(t),await g(),a.form.fillFromData("#add-theme-form",{name:""}),r.setText(""),c.setText(""),await s(),a.popup.close(".add-theme-popup")}catch(e){a.dialog.alert(e,"There was an error")}},b=async function(e){e.preventDefault();let t=Object.assign(new fe,a.form.convertToData("#edit-theme-form"));t.coverImageCSS="\n"!=r.getText()?r.getText():void 0,t.animationCSS="\n"!=c.getText()?c.getText():void 0,t.channelId=d.channel._id;try{await l.put(t),await g(),await s(),a.popup.close(".edit-theme-popup")}catch(e){console.log(e),a.dialog.alert(e.errors,"There was an error")}},y=async function(e){let i=t(e.target).data("id");a.dialog.confirm("Are you sure you want to delete this theme?",(async()=>{let e=await l.get(i);await l.delete(e),await g(),await s();a.toast.show({text:"Theme deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))},w=async function(e){let i=t(e.target).data("id");o=p.filter((e=>e._id==i))[0],r=new(rt())("#edit-theme-cover-image-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>hljs.highlightAuto(e).value},toolbar:!1}}),c=new(rt())("#edit-theme-animation-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>hljs.highlightAuto(e).value},toolbar:!1}}),a.form.fillFromData("#edit-theme-form",o),r.setText(o.coverImageCSS?o.coverImageCSS:""),c.setText(o.animationCSS?o.animationCSS:""),await s(),a.popup.open(".edit-theme-popup")};return i("pageInit",(async(e,i)=>{if(d?.coverBanner?.url?t(`.show-channel-banner-${d.channel._id}`).css("background-image",`url(${d.coverBanner.url})`):t(`.show-channel-banner-${d.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${d.channel._id}`)){let e=document.getElementById(`channel-show-description-${d.channel._id}`).getElementsByTagName("a");for(let t of e)t.classList.add("external")}await s(),t(".add-theme-popup").on("popup:open",m)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="channel-show-themes">

    <${ca} breadcrumbs=${h} />


    ${u?t`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${d.channel._id}">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    `:t``}


    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

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
                          ${p?.map((e=>t`
                          <li>
                            <span class="theme-name">${e.name}</span>
                            <a class="link theme-link" href="#" data-id="${e._id}" @click="${w}">Edit</a>
                            <a class="link theme-link" href="#" data-id="${e._id}" @click="${y}">Delete</a>
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
                <form id="add-theme-form" @submit="${v}">
                  <${Ra} cover_image_css_editor_id="add-theme-cover-image-editor"
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
                <form id="edit-theme-form" @submit="${b}">
  
                  <${Ra} cover_image_css_editor_id="edit-theme-cover-image-editor"
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

`}}_a.id="38ab03eb94",_a.style="\n\n\n";const xa=_a;function Pa(e,{$:t,$on:i,$f7:a,$update:n}){let s=e.static_page,o=[{name:"navbar",description:"Show link on navigation bar"},{name:"links",description:"Show in list of links on home page"},{name:"index",description:"Show content on home page"}];let r=e.static_page_content_editor_id,c=e.static_page_content_toolbar_id,l=e.image_button_input_id,f=e.image_button_id;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="list">

        <input type="hidden" name="_id"  value="${s?._id}" />
        <input type="hidden" name="_rev" value="${s?._rev}" />
        <input type="hidden" name="dateCreated" value="${s?.dateCreated}" />

        <ul>
            <li>
                <div class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Name</div>
                        <div class="item-input-wrap">
                            <input type="text" name="name" placeholder="Name"
                                value="${s?.name}" required  minlength="3" tabindex="1" />
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <a href="#" class="item-link smart-select smart-select-init" data-open-in="popup">
                  <!-- "multiple" attribute for multiple select-->
                    <select name="locations" tabindex="2"  multiple>
                        <optgroup>
                            ${o.map((e=>t`
                                ${(e=>{if(s?.locations?.length>0)for(let t of s.locations)if(e.name==t.name)return!0;return!1})(e)?t`
                                    <option value="${e.name}" selected >${e.description}</option>
                                `:t`
                                    <option value="${e.name}">${e.description}</option>
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

                        <div id="${c}">
                
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
    
                            <button class="text-editor-button" id="${f}"><i class="material-icons">image</i></button>
                            <label><input type="file" id="${l}" /></label>
                        </div>

                        <div class="editor bg-color-white text-color-black static-page-editor" id="${r}" tabindex="3"></div>
                    </div>
                </div>
            </li>

        </ul>
    </div>


`}}Pa.id="955f836478",Pa.style="\n    \n";const Ca=Pa;function Ta(e,{$:t,$on:i,$f7:a,$update:s}){let o,r,c=n.getInstance(Ut),l=n.getInstance(f),d=n.getInstance(Ai),p=e.channelViewModel,u=e.staticPages,h=p.editable,g=[{text:"Home",path:"/"},{text:p.channel.title,path:`/admin/channel/show/${p.channel._id}`},{text:"Static Pages"}];const m=async()=>{u=await d.listByChannel(p.channel._id,1e3,0)};let v=e=>{r=new(rt())("#add-static-page-content-editor",{bounds:".page-content",theme:"snow",modules:{imageDropAndPaste:{handler:(e,t,i)=>{const a=i.toFile();c.insertImageInEditor(a,r)}},toolbar:"#add-static-page-content-toolbar",blotFormatter:{specs:[qt],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}}})},b=async e=>{e.preventDefault();let t=Object.assign(new ne,a.form.convertToData("#add-static-page-form"));t.content=r.getContents(),t.channelId=p.channel._id,t._id=(0,$t.Z)(),t.dateCreated=(new Date).toJSON();try{await d.put(t),await m(),a.form.fillFromData("#add-static-page-form",{name:"",slug:"",locations:[]}),r.setText(""),await s(),a.popup.close(".add-static-page-popup")}catch(e){a.dialog.alert(e,"There was an error")}},y=async e=>{e.preventDefault();let t=Object.assign(new ne,a.form.convertToData("#edit-static-page-form"));t.content=r.getContents(),t.channelId=p.channel._id;try{await d.put(t),await m(),await s(),a.popup.close(".edit-static-page-popup")}catch(e){console.log(e),a.dialog.alert(e.errors,"There was an error")}},w=async e=>{let i=t(e.target).data("id");a.dialog.confirm("Are you sure you want to delete this static page?",(async()=>{let e=await d.get(i);await d.delete(e),await m(),await s();a.toast.show({text:"Static Page deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))},S=async function(e){let i=t(e.target).data("id");o=u.filter((e=>e._id==i))[0],r=new(rt())("#edit-static-page-content-editor",{bounds:".page-content",theme:"snow",modules:{imageDropAndPaste:{handler:(e,t,i)=>{const a=i.toFile();c.insertImageInEditor(a,r)}},toolbar:"#edit-static-page-content-toolbar",blotFormatter:{specs:[qt],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}}}),a.form.fillFromData("#edit-static-page-form",o),r.setContents(o.content),await s(),a.popup.open(".edit-static-page-popup")},$=function(e){e.preventDefault();t("#add-static-page-image-button-input").click()},k=async function(e){e.preventDefault(),l.showSpinner("Processing image..."),await c.insertImageInEditor(this.files[0],r),l.hideSpinner()},I=function(e){e.preventDefault();t("#edit-static-page-image-button-input").click()},R=async function(e){e.preventDefault(),l.showSpinner("Processing image..."),await c.insertImageInEditor(this.files[0],r),l.hideSpinner()};return i("pageInit",(async(e,i)=>{if(t(document).off("click","#add-static-page-image-button"),t(document).off("change","#add-static-page-image-button-input"),t(document).off("click","#edit-static-page-image-button"),t(document).off("change","#edit-static-page-image-button-input"),await c.init(),p?.coverBanner?.url?t(`.show-channel-banner-${p.channel._id}`).css("background-image",`url(${p.coverBanner.url})`):t(`.show-channel-banner-${p.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${p.channel._id}`)){let e=document.getElementById(`channel-show-description-${p.channel._id}`).getElementsByTagName("a");for(let t of e)t.classList.add("external")}await s(),t(".add-static-page-popup").on("popup:open",v),t(document).on("click","#add-static-page-image-button",$),t(document).on("change","#add-static-page-image-button-input",k),t(document).on("click","#edit-static-page-image-button",I),t(document).on("change","#edit-static-page-image-button-input",R)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="channel-show-themes">

    <${ca} breadcrumbs=${g} />


    ${h?t`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${p.channel._id}">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    `:t``}


    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        <channel-card channel_view_model=${p}></channel-card>

        <div class="block">
          <p class="segmented">
            <a class="button button-outline" href="/admin/channel/show/${p.channel._id}">Items</a>
            <a class="button button-outline" href="/admin/channel/themes/${p.channel._id}">Themes</a>
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
                          ${u?.map((e=>t`
                            <li>
                              <span class="static-page-name">${e.name}</span>
                              <a class="link static-page-link" href="#" data-id="${e._id}" @click="${S}">Edit</a>
                              <a class="link static-page-link" href="#" data-id="${e._id}" @click="${w}">Delete</a>
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
                  <${Ca} static_page_content_editor_id="add-static-page-content-editor"
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
                <form id="edit-static-page-form" @submit="${y}">
  
                  <${Ca} static_page_content_editor_id="edit-static-page-content-editor"
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

`}}Ta.id="8a9e35f811",Ta.style="\n\n\n";const Aa=Ta;function Oa(e,{$:t,$on:i,$f7:a,$update:s}){n.getInstance(vi);let o,r,c,l=n.getInstance(Gi),d=(n.getInstance(Tt),n.getInstance(_t),n.getInstance(Ai),n.getInstance(f),n.getInstance(Ut)),p=e.channelViewModel;va.Z.configure({languages:["css"]});let u=[{text:"Home",path:"/"},{text:p.channel.title,path:`/admin/channel/show/${p.channel._id}`},{text:"Edit Collection"}];const h=async e=>{if(e.preventDefault(),!document.getElementById("edit-channel-form").reportValidity())return void document.getElementById("collection-title").scrollIntoView();let t=Object.assign(new O,p.channel),i=Object.assign(t,a.form.convertToData("#edit-channel-form"));i.description=d.activeEditor.getContents(),i.license=o.getContents(),i.sellerFeeBasisPoints=parseInt(i.sellerFeeBasisPoints),i.attributeOptions?i.attributeOptions=JSON.parse(i.attributeOptions):i.attributeOptions=[],i.externalLinks?i.externalLinks=JSON.parse(i.externalLinks):i.externalLinks=[],i.marketplaces?i.marketplaces=JSON.parse(i.marketplaces):i.marketplaces=[],i.disableForks="true"==i.disableForks,i.showMintPage="true"==i.showMintPage,i.showActivityPage="true"==i.showActivityPage;try{await l.put(i,r,c);a.toast.show({text:"Collection saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate(`/admin/channel/show/${i._id}`)}catch(e){a.dialog.alert(e.errors,"There was an error")}};return i("pageInit",(async(e,i)=>{t("#edit-channel-form").attr("novalidate","novalidate");new(ua())(document.getElementById("category"));if(d.buildQuillPostEditor("#edit-channel-description-editor","#edit-channel-description-toolbar"),p.channel.description&&d.activeEditor.setContents(p.channel.description),o=new(rt())("#edit-channel-license-editor",{bounds:".page-content",modules:{toolbar:"#edit-channel-license-toolbar"},theme:"snow"}),p.channel.license&&o.setContents(p.channel.license),p.channel?.attributeOptions?.length>0)for(let e of p.channel?.attributeOptions)new(ua())(document.getElementById(`options-input-${e.id}`))})),t(document).on("cover-image-updated",(async e=>{r=e.detail.coverImage})),t(document).on("cover-banner-updated",(async e=>{c=e.detail.coverBanner})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-edit-channel">

    <${ca} breadcrumbs=${u} />

    <div class="page-content hide-toolbar-on-scroll">

      <form id="edit-channel-form" @submit="${h}" class="fixed-width-content center">

        <div class="block-title block-title-medium">Edit Collection</div>


        <${ma} 
          channel=${p} 
          description_editor="edit-channel-description-editor"
          description_toolbar="edit-channel-description-toolbar" 
          license_editor="edit-channel-license-editor"
          license_toolbar="edit-channel-license-toolbar"  
        />



        <div class="block cancel-save-row">
      
          <div class="large-only"></div>

          <a href="/admin/channel/show/${p.channel._id}" class="button button-outline color-gray" tabindex="30">
            Cancel
          </a>

          <button type="submit" class="button button-fill" tabindex="31" id="saveButton">
            Save
          </button>

        </div>

      </form>

    </div>
  </div>

`}}Oa.id="1dc94d50e4",Oa.style="\n";const Fa=Oa;function ja(e,{$:t,$on:i,$f7:a,$update:s}){let o,r=[{text:"Home",path:"/"},{text:"Create & Import"}];return i("pageInit",(async()=>{o=n.getWalletService(),await s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-create-menu">

    <${ca} breadcrumbs=${r} />

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
  
  
              ${o?.address?t`
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
              `:t`
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

`}}ja.id="f53d6b01d5",ja.style="\n\n\n";const Ea=ja;var Da=i(17833),Ba=i(33686),Ma=i(34805),Na=i.n(Ma),La=i(41690),Ua=i(32186),Ha=i(455),qa=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ga=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},za=function(e,t){return function(i,a){t(i,a,e)}};let Ja=class{walletService;constructor(e){this.walletService=e}async getMintEventsForContract(e){let t=0,i=await this.walletService.provider.getBlockNumber();console.log("Fetching mint transfers...");let a=[],n={endBlock:i,events:[]};do{n=await this.getEvents(e,t,i),a.push(...n.events),console.log(`...fetched batch of ${n.events?.length} from ${t} to ${n.endBlock} of ${i}`),t=n.endBlock}while(n.endBlock<i);return console.log(`Found ${a.length} events`),a}async getEvents(e,t,i){let a=[],n=!0;for(;n;)try{a=await e.queryFilter([Ua.id("Transfer(address,address,uint256)"),Ha.U3("0x0000000000000000000000000000000000000000",32)],t,i),n=!1}catch(e){let a=e?.error?.message,s=a.substring(a.indexOf("[")+1,a.indexOf("]"))?.split(",");s?.length>1?i=parseInt(s[1]):(i=t,n=!1)}return{events:a,endBlock:i}}async getTokensForContract(e){let t=(await this.getMintEventsForContract(e)).map((e=>Number(BigInt(e.topics[3])))).sort(((e,t)=>e-t));return new Set(t)}};Ja=qa([(0,s.b)(),za(0,(0,o.f)(a.WalletService)),Ga("design:paramtypes",[Object])],Ja);var Wa=i(14222),Za=i(48764).Buffer,Va=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ka=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Ya=function(e,t){return function(i,a){t(i,a,e)}};const Qa=new(Na());let Xa=class{channelService;channelWebService;queryCacheService;schemaService;itemService;itemWebService;authorService;ipfsService;imageService;animationService;themeRepository;themeService;staticPageRepository;staticPageService;ercEventService;originalMetadataService;tokenMetadataCacheRepository;walletService;contracts;constructor(e,t,i,a,n,s,o,r,c,l,f,d,p,u,h,g,m,v,b){this.channelService=e,this.channelWebService=t,this.queryCacheService=i,this.schemaService=a,this.itemService=n,this.itemWebService=s,this.authorService=o,this.ipfsService=r,this.imageService=c,this.animationService=l,this.themeRepository=f,this.themeService=d,this.staticPageRepository=p,this.staticPageService=u,this.ercEventService=h,this.originalMetadataService=g,this.tokenMetadataCacheRepository=m,this.walletService=v,this.contracts=b}async importFromIPFS(e,t,i){let a={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}};this.logForkProgress(a,`Starting fork of ${e}. Fetching data...`);try{await this.ipfsService.ipfs.files.rm("/fork",{recursive:!0,flush:!0})}catch(e){}await this.ipfsService.ipfs.files.cp(`/ipfs/${e}`,"/fork",{create:!0,parents:!0,flush:!0}),this.logForkProgress(a,"Processing...");let n,s=await this._readFile("/fork/backup/authors.json"),o=await this._readFile("/fork/backup/channels.json"),r=await this._readFile("/fork/backup/images.json"),c=await this._readFile("/fork/backup/items.json"),l=await this._readFile("/fork/backup/animations.json"),f=await this._readFile("/fork/backup/themes.json"),d=await this._readFile("/fork/backup/static-pages.json"),p=await this._readFile("/fork/contractMetadata.json");try{n=await this._readFile("/fork/backup/originalMetadata.json")}catch(e){}let u={},h=new en(this.ipfsService);if("existing"==t){for(let e of c)u[e.tokenId]=await this._readFile(`/fork/metadata/${e.tokenId}.json`);return this._importExisting(s,o,r,c,n,l,f,d,a,h,p,u,e)}if(i){let e=new R;e.walletAddress=i,s=[e]}return this._importAsFork(s,o,r,c,n,l,f,d,a,h,p,e)}async importExistingFromContract(e){return this._importFromContract(e,"existing")}async importAsForkFromContract(e){return this._importFromContract(e,"fork")}async importExistingFromReader(e,t,i){let a=await this._buildImportBundle(e);return a.channels[0].contractAddress=t,a.channels[0].publishReaderIPFSStatus={},a.channels[0].publishReaderIPFSStatus.cid=i,this._importExisting(a.authors,a.channels,a.images,a.items,a.originalMetadata,a.animations,a.themes,a.staticPages,a.forkStatus,a.mediaDownloader,a.contractMetadata,a.tokenMetadata,i)}async importAsForkFromReader(e,t,i){let a=await this._buildImportBundle(e);return delete a.channels[0].contractAddress,delete a.channels[0].publishReaderIPFSStatus,a.channels[0].title=t,this._importAsFork(a.authors,a.channels,a.images,a.items,a.originalMetadata,a.animations,a.themes,a.staticPages,a.forkStatus,a.mediaDownloader,a.contractMetadata,i)}async _buildImportBundle(e){let t={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}};this.logForkProgress(t,"Processing...");let i,a=await this._fetchFile(`${e}backup/export/backup/authors.json`),n=await this._fetchFile(`${e}backup/export/backup/channels.json`),s=await this._fetchFile(`${e}backup/export/backup/images.json`),o=await this._fetchFile(`${e}backup/export/backup/items.json`),r=await this._fetchFile(`${e}backup/export/backup/animations.json`),c=await this._fetchFile(`${e}backup/export/backup/themes.json`),l=await this._fetchFile(`${e}backup/export/backup/static-pages.json`),f=await this._fetchFile(`${e}backup/export/contractMetadata.json`);try{i=await this._fetchFile(`${e}backup/export/backup/originalMetadata.json`)}catch(e){}let d=new tn(e),p={};for(let t of o)p[t.tokenId]=await this._fetchFile(`${e}backup/export/metadata/${t.tokenId}.json`);return{authors:a,channels:n,images:s,items:o,originalMetadata:i,animations:r,themes:c,staticPages:l,mediaDownloader:d,forkStatus:t,contractMetadata:f,tokenMetadata:p}}async _importFromContract(e,t){let i={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}},a=this.walletService.wallet,n=new Zt.CH(e,this._getERC721ABI(),a||this.walletService.provider);this.logForkProgress(i,`Fetching tokens for contract ${e}`);let s=await this.ercEventService.getTokensForContract(n);i.channels.total=1,i.items.total=s.size;let o=new O;o.importSuccess=!1,"existing"==t&&(o.contractAddress=e),o.forkType=t,o.title=await n.name(),o.symbol=await n.symbol(),o.attributeOptions=[],await this.channelWebService.put(o);let r=new $e;r._id=`token_id_stats_by_channel_${o._id}`,r.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(o._id);let c,l=[];for(let e of s){this.logForkProgress(i,`Fetching metadata for #${e}`);try{let t=await this._getTokenMetadata(n,e);if(!t.tokenId){l.push(e),this.logForkProgress(i,`Metadata for #${e} not found. Skipping import.`);continue}this.logForkProgress(i,`Importing token #${t.tokenId}`),console.time(`Importing token #${t.tokenId}`);let a,s,c=new Y;if(!t.image&&!t.image_url)throw new Error("No image in metadata");{let e=t.image?t.image:t.image_url,n=await this._fetchURI(e);a=(0,Wa.Z)((new TextDecoder).decode(n))?await this.imageService.newFromSvg((new TextDecoder).decode(n)):await this.imageService.newFromBuffer(n);try{await this.imageService.put(a)}catch(e){}c.coverImageId=a._id,i.images.saved++,this.logForkProgress(i,`Importing image ${a._id}`)}if(t.animation_url){c.coverImageAsAnimation=!1,s=await this.animationService.newFromText((new TextDecoder).decode(await this._fetchURI(t.animation_url)));try{await this.animationService.put(s)}catch(e){}i.animations.saved++,this.logForkProgress(i,`Importing animation ${s._id}`),c.animationId=s._id}else c.coverImageAsAnimation=!0;c.tokenId=t.tokenId,c.title=t.name,c.channelId=o._id,c.attributeSelections=[];for(let e of t.attributes)c.attributeSelections.push({traitType:e.trait_type,value:e.value}),this._addAttributeToChannel(e,o);let f=await this.originalMetadataService.newFromText(JSON.stringify(t));await this.originalMetadataService.put(f),c.originalJSONMetadataId=f._id,await this.itemWebService.put({channel:o,item:c,updateQueryCache:!1,publish:!1}),r.result.count++,(!r.result.min||c.tokenId<r.result.min)&&(r.result.min=c.tokenId),(!r.result.max||c.tokenId>r.result.max)&&(r.result.max=c.tokenId),i.items.saved++,(t.image||t.image_url)&&i.images.total++,t.animation_url&&i.animations.total++,console.timeEnd(`Importing token #${t.tokenId}`)}catch(t){console.log(`Error importing token ${e}: ${t.message}`)}}this.logForkProgress(i,`Skipped tokens: ${l}`),this.logForkProgress(i,`Building query cache for channel ${o._id}`),await this.channelService.buildAttributeCounts(o._id);try{c=await this.queryCacheService.get(r._id)}catch(e){}return c&&(r._rev=c._rev),await this.queryCacheService.put(r),o.importSuccess=!0,await this.channelWebService.put(o),i.channels.saved++,this.logForkProgress(i,`Importing channel ${o._id}`),o._id}async _importAsFork(e,t,i,a,n,s,o,r,c,l,f,d){let p,u,h=new Map;if(!(e&&t&&i&&a))throw new Error("Invalid collection hash");c.authors.total=e.length,c.channels.total=t.length,c.images.total=i.length,c.items.total=a.length,c.animations.total=s.length,c.themes.total=o.length,c.staticPages.total=r.length,this.logForkProgress(c,"Updating totals..."),u=new O,Object.assign(u,t[0]),u.forkType="fork",u.forkedFromFeeRecipient=f.fee_recipient;let m=`${u._id}`;delete u._id,delete u._rev,delete u._rev_tree,d&&(u.forkedFromCid=d),u.forkedFromId=m,await this.channelWebService.put(u),h.set(m,u._id),p=u._id,c.channels.saved++,this.logForkProgress(c,`Inserted channel ${u._id}`);let v,b=new $e;b._id=`token_id_stats_by_channel_${u._id}`,b.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(u._id),u.authorId=this.walletService.address?.toString(),u.authorId&&await this.authorService.insertIfNew(u.authorId);for(let t of e)delete t._rev,delete t._rev_tree,await this.authorService.put(Object.assign(new R,t)),c.authors.saved++,this.logForkProgress(c,`Inserted author ${t._id}`);for(let e of s){e.content=await l.getAsString(`animations/${e.cid}.html`);let t=await bt.of(e.content);if(t.toString()!=e.cid)throw new Error(`Incorrect cid when importing animation. Expected: ${e.cid}, Result: ${t.toString()}`);let i=Object.assign(new g,e);try{await this.animationService.put(i)}catch(e){}c.animations.saved++,this.logForkProgress(c,`Inserted animation ${i._id}`)}for(let e of i){let t;e.generated?(e.svg=await l.getAsString(`images/${e.cid}.${e.generated?"svg":"jpg"}`),t=e.svg):(e.buffer=await l.getAsBuffer(`images/${e.cid}.${e.generated?"svg":"jpg"}`),t=new Uint8Array(e.buffer));let i=Object.assign(new z,e),a=await bt.of(t);if(a.toString()!=e.cid)throw new Error(`Incorrect cid when importing image. Expected: ${e.cid}, Result: ${a.toString()}`);try{await this.imageService.put(i)}catch(e){}c.images.saved++,this.logForkProgress(c,`Inserted image ${i._id}`)}for(let e of o){let t=e._id;delete e._id,delete e._rev,delete e._rev_tree,e.channelId=h.get(e.channelId);let i=Object.assign(new fe,e);e.forkedFromId=t,await this.themeService.put(i),h.set(t,i._id),c.themes.saved++,this.logForkProgress(c,`Inserted theme ${i._id}`)}for(let e of r){let t=e._id;delete e._id,delete e._rev,delete e._rev_tree,e.channelId=h.get(e.channelId),e.forkedFromId=t;let i=Object.assign(new ne,e);try{await this.staticPageService.put(i)}catch(e){}c.staticPages.saved++,this.logForkProgress(c,`Inserted static page ${i._id}`)}for(let e of a){let t=e._id;if(delete e._id,delete e._rev,delete e._rev_tree,e.channelId=h.get(e.channelId),e.content?.ops?.length>0){let t=[];for(let i of e.content.ops){if(i.insert&&i.insert.ipfsimage){let e=await this.imageService.get(i.insert.ipfsimage.cid);i.insert.ipfsimage.src=await this.imageService.getUrl(e)}t.push(i)}e.content.ops=t}if(e.themes?.length>0){let t=[];for(let i of e.themes)t.push(h.get(i));e.themes=t}e.forkedFromId=t;let i=Object.assign(new Y,e);await this.itemWebService.put({channel:u,item:i,updateQueryCache:!1,publish:!1}),b.result.count++,(!b.result.min||e.tokenId<b.result.min)&&(b.result.min=e.tokenId),(!b.result.max||e.tokenId>b.result.max)&&(b.result.max=e.tokenId),c.items.saved++,this.logForkProgress(c,`Inserted item ${i._id}`)}this.logForkProgress(c,"\n        ******************************\n\n        ******************************\n\n        ******************************\n\n                Import complete\n\n        ******************************\n\n        ******************************\n\n        ******************************\n        "),this.logForkProgress(c,`Building query cache for channel ${p}`),await this.channelService.buildAttributeCounts(u._id);try{v=await this.queryCacheService.get(b._id)}catch(e){}return v&&(b._rev=v._rev),await this.queryCacheService.put(b),u.importSuccess=!0,await this.channelWebService.put(u),p}async _importExisting(e,t,i,a,n,s,o,r,c,l,f,d,p){if(!(e&&t&&i&&a))throw new Error("Invalid collection hash");let u,h;c.authors.total=e.length,c.channels.total=t.length,c.images.total=i.length,c.items.total=a.length,c.animations.total=s.length,c.themes.total=o.length,c.staticPages.total=r.length,this.logForkProgress(c,"Updating totals..."),h=Object.assign(new O,t[0]),h.forkType="existing",h.forkedFromFeeRecipient=f.fee_recipient,delete h._rev,delete h._rev_tree;let m=await this.channelService.getLatestRevision(h._id);m&&(h._deleted=!1,h._rev=m._rev),await this.channelWebService.put(h),u=h._id,c.channels.saved++,this.logForkProgress(c,`Inserted channel ${h._id}`);let v,b=new $e;b._id=`token_id_stats_by_channel_${h._id}`,b.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(u);for(let t of e){delete t._rev,delete t._rev_tree;let e=await this.authorService.getLatestRevision(t._id);e._deleted=!1,await this.authorService.put(Object.assign(e,t)),c.authors.saved++,this.logForkProgress(c,`Inserted author ${t._id}`)}for(let e of s){e.content=await l.getAsString(`animations/${e.cid}.html`);let t=await bt.of(e.content);if(t.toString()!=e.cid)throw new Error(`Incorrect cid when importing animation. Expected: ${e.cid}, Result: ${t.toString()}`);let i=Object.assign(new g,e);try{await this.animationService.put(i)}catch(e){}c.animations.saved++,this.logForkProgress(c)}for(let e of i){let t;e.generated?(e.svg=await l.getAsString(`images/${e.cid}.${e.generated?"svg":"jpg"}`),t=e.svg):(e.buffer=await l.getAsBuffer(`images/${e.cid}.${e.generated?"svg":"jpg"}`),t=new Uint8Array(e.buffer));let i=Object.assign(new z,e),a=await bt.of(t);if(a.toString()!=e.cid)throw new Error(`Incorrect cid when importing image. Expected: ${e.cid}, Result: ${a.toString()}`);try{await this.imageService.put(i)}catch(e){}c.images.saved++,this.logForkProgress(c)}for(let e of o){delete e._rev,delete e._rev_tree;let t=await this.themeRepository.getLatestRevision(e._id);t._deleted=!1,await this.themeRepository.put(Object.assign(t,e)),c.themes.saved++,this.logForkProgress(c,`Inserted theme ${t._id}`)}for(let e of r){delete e._rev,delete e._rev_tree;let t=await this.staticPageRepository.getLatestRevision(e._id);t._deleted=!1,await this.staticPageRepository.put(Object.assign(t,e)),c.staticPages.saved++,this.logForkProgress(c,`Inserted static page ${t._id}`)}for(let e of a){if(e.content?.ops?.length>0){let t=[];for(let i of e.content.ops){if(i.insert&&i.insert.ipfsimage){let e=await this.imageService.get(i.insert.ipfsimage.cid);i.insert.ipfsimage.src=await this.imageService.getUrl(e)}t.push(i)}e.content.ops=t}delete e._rev,delete e._rev_tree;let t=await this.itemService.getLatestRevision(e._id);t&&(e._deleted=!1,e._rev=t._rev);let i=await this.originalMetadataService.newFromText(JSON.stringify(d[e.tokenId]));await this.originalMetadataService.put(i),e.originalJSONMetadataId=i._id,await this.itemWebService.put({channel:h,item:Object.assign(new Y,e),updateQueryCache:!1,publish:!1}),b.result.count++,(!b.result.min||e.tokenId<b.result.min)&&(b.result.min=e.tokenId),(!b.result.max||e.tokenId>b.result.max)&&(b.result.max=e.tokenId),c.items.saved++,this.logForkProgress(c)}this.logForkProgress(c,"\n        ******************************\n\n        ******************************\n\n        ******************************\n\n                Import complete\n\n        ******************************\n\n        ******************************\n\n        ******************************\n        "),this.logForkProgress(c,`Building query cache for channel ${h._id}`),await this.channelService.buildAttributeCounts(h._id);try{v=await this.queryCacheService.get(b._id)}catch(e){}return v&&(b._rev=v._rev),await this.queryCacheService.put(b),h.importSuccess=!0,await this.channelWebService.put(h),this.logForkProgress(c,`Forking channel ${h._id} complete`),t[0]._id}_addAttributeToChannel(e,t){let i,a=t.attributeOptions.filter((t=>t.traitType==e.trait_type));a?.length>0?i=a[0]:(t.attributeOptions.push({id:(0,$t.Z)(),traitType:e.trait_type,values:[e.value]}),i=t.attributeOptions[t.attributeOptions.length-1]),i.values.includes(e.value)||i.values.push(e.value)}async _getTokenMetadata(e,t){let i,a=`${await e.getAddress()}-${t}`;try{i=await this.tokenMetadataCacheRepository.get(a)}catch(e){}if(i)return console.log(`Returning cached token metadata #${t}`),i.tokenMetadata;let n=await e.tokenURI(t),s=await this._fetchURI(n),o=JSON.parse((new TextDecoder).decode(s));return o.tokenId=t,await this.tokenMetadataCacheRepository.put({_id:a,tokenMetadata:o,dateCreated:(new Date).toJSON()}),o}async _fetchURI(e){if(e.startsWith("data:application/json;utf-8,"))return Za.from(e.substring(28,e.length));if(e.startsWith("data:image/bmp;base64,"))return Za.from(e.substring(22,e.length),"base64");if(e.startsWith("http")){let t=await Vi.Z.get(e,{responseType:"arraybuffer"});return Za.from(t.data,"binary")}{let t=Qa.containsCID(e);if(t?.containsCid){e=Qa.convertToDesiredGateway(e,"");return(0,La.z)(await(0,Ba.Z)(this.ipfsService.ipfs.cat(e)))}}}async _readFile(e){let t=await(0,Da.Z)(this.ipfsService.ipfs.files.read(e));return JSON.parse(new TextDecoder("utf-8").decode(t))}async _fetchFile(e){return(await Vi.Z.get(e)).data}logForkProgress(e,t){if(t&&console.log(t),"undefined"!=typeof window&&void 0!==window.document){const i=new CustomEvent("fork-progress",{detail:{forkStatus:e,message:t}});document.dispatchEvent(i)}}_getERC721ABI(){return'[\n            {\n                "inputs":[\n                   {\n                      "internalType":"string",\n                      "name":"name",\n                      "type":"string"\n                   },\n                   {\n                      "internalType":"string",\n                      "name":"symbol",\n                      "type":"string"\n                   }\n                ],\n                "stateMutability":"nonpayable",\n                "type":"constructor"\n            },\n\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "name",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "string"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_spender",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "approve",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "totalSupply",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_from",\n                  "type": "address"\n                },\n                {\n                  "name": "_to",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "transferFrom",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "decimals",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint8"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [\n                {\n                  "name": "_owner",\n                  "type": "address"\n                }\n              ],\n              "name": "balanceOf",\n              "outputs": [\n                {\n                  "name": "balance",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "symbol",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "string"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_to",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "transfer",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [\n                {\n                  "name": "_owner",\n                  "type": "address"\n                },\n                {\n                  "name": "_spender",\n                  "type": "address"\n                }\n              ],\n              "name": "allowance",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "payable": true,\n              "stateMutability": "payable",\n              "type": "fallback"\n            },\n            {\n              "anonymous": false,\n              "inputs": [\n                {\n                  "indexed": true,\n                  "name": "owner",\n                  "type": "address"\n                },\n                {\n                  "indexed": true,\n                  "name": "spender",\n                  "type": "address"\n                },\n                {\n                  "indexed": false,\n                  "name": "value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "Approval",\n              "type": "event"\n            },\n            {\n              "anonymous": false,\n              "inputs": [\n                {\n                  "indexed": true,\n                  "name": "from",\n                  "type": "address"\n                },\n                {\n                  "indexed": true,\n                  "name": "to",\n                  "type": "address"\n                },\n                {\n                  "indexed": false,\n                  "name": "value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "Transfer",\n              "type": "event"\n            },\n            {\n                "inputs":[\n                   {\n                      "internalType":"uint256",\n                      "name":"tokenId",\n                      "type":"uint256"\n                   }\n                ],\n                "name":"tokenURI",\n                "outputs":[\n                   {\n                      "internalType":"string",\n                      "name":"",\n                      "type":"string"\n                   }\n                ],\n                "stateMutability":"view",\n                "type":"function"\n             }\n             \n          ]'}};Xa=Va([(0,s.b)(),Ya(17,(0,o.f)(a.WalletService)),Ya(18,(0,o.f)("contracts")),Ka("design:paramtypes",[vi,Gi,si,Le,di,Li,ii,Si,Tt,Pi,ue,_t,re,Ai,Ja,ci,ye,Object,Object])],Xa);class en{ipfsService;basePath="/fork/";constructor(e){this.ipfsService=e}async getAsString(e){let t=await(0,Da.Z)(this.ipfsService.ipfs.files.read(`${this.basePath}${e}`));return new TextDecoder("utf-8").decode(t)}async getAsBuffer(e){return(0,Da.Z)(this.ipfsService.ipfs.files.read(`${this.basePath}${e}`))}}class tn{basePath;constructor(e){this.basePath=e}async getAsString(e){let t=await Vi.Z.get(`${this.basePath}backup/export/${e}`);return t.data?.toString()}async getAsBuffer(e){return(await Vi.Z.get(`${this.basePath}backup/export/${e}`,{responseType:"arraybuffer"})).data}}function an(e,{$:t,$on:i,$f7:a,$update:s}){let o,r,c=n.getInstance(Xa),l=n.getInstance(Si),d=n.getWalletService(),p=n.getInstance(f),u=null!=l.ipfs,h=l.peerCount,g=e.cid,m=!1,v="",b="existing",y=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Fork Collection From IPFS Hash"}];i("pageInit",(async()=>{await l.init(),u=null!=l.ipfs,await s()}));const w=async e=>{e.preventDefault();let t=a.form.convertToData("#import-ipfs-hash");m=!0,s(),p.showSpinner("Forking...");try{r=await c.importFromIPFS(t.hash,b,t.authorId)}catch(e){console.log(e),p.hideSpinner(),a.dialog.alert(e.message,"There was an error")}p.hideSpinner(),m=!1,s()};t(document).on("fork-progress",(async e=>{e.detail.message&&(v=`<p>${e.detail.message}</p>`),o=e.detail.forkStatus,m=!0,s();let i=document.getElementById("ipfs-fork-process");i&&t(i).scrollTop(i.scrollHeight)}));const S=async e=>{e.preventDefault(),b=t(e.currentTarget).val(),await s()};return t(document).on("update-peers",(async e=>{h=e.detail.count,s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-fork">

    <${ca} breadcrumbs=${y} />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        <form @submit="${w}" id="import-ipfs-hash">

          <div class="block-title">Fork Collection From IPFS Hash</div>
  
          <div class="card">
            <div class="card-content card-content-padding">
              ${u?t`
                <div class="ipfs-label">
                    Status: <a href="/admin/connect">IPFS Ready</a>
                </div>
            `:t`
                <div class="ipfs-label">IPFS Initializing...</div>
            `}
            </div>
          </div>
  
          ${!m&!r?t`
            
            <div class="block-header">
              A <em>fork</em> is a copy of an NFT collection. Forking a project allows you to freely experiment with changes without affecting the original project.
            </div>
  
            <div class="list media-list inset">
              <ul>
                <li>
                  <label class="item-radio item-radio-icon-start item-content">
                    <input type="radio" name="demo-media-radio" checked @change="${S}" value="existing" />
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
                    <input type="radio" name="demo-media-radio" @change="${S}" value="fork" />
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
  
  
            ${"fork"==b&&d.address?t`
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
            `:t`<span />`}
          
            
          `:t`<span />`}
  
  
          <div class="card">
  
            ${m?t`
              <div class="card-header">
                  Forking...
              </div>  
  
            `:t`<span />`}
  
  
            <div class="card-content">
  
              <div class="card-content card-content-padding">
   
                  
                  ${v?t`
  
                    ${o?t`
  
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
  
                    `:t`<span />`}
         
  
                    ${r?t`
                    
                      <div class="block save-row">
  
                        <div class="large-only"></div>
  
                        <a href="/admin/channel/show/${r}" class="button button-fill color-green" class="button button-fill" tabindex="12">
                          View Collection
                        </a>  
                      </div>
                    `:t`
                      <div class="fork-output-simple" innerHTML="${v}" id="ipfs-fork-process" ></div>
                    `}
                    
                  
                  `:t`<span />`}
  
  
                  ${u&!m&!r?t`
  
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
  
                      
                  `:t`
                      <p></p>
                  `}
  
  
  
                </div>
            </div>
          </div>
  
  
        </form>

      </div>

    </div>
  </div>

`}}an.id="3b7287679b",an.style="\n  .ipfs-label,\n  .fork-label {\n      margin-top: 10px;\n      margin-bottom: 10px;\n      font-weight: bold;\n      font-size: 18px;\n  }\n\n  .fork-output {\n      border: 1px solid #cccccc;\n      font-size: 13px;\n      width: 100%;\n      max-width: 100%;\n      padding: 5px;\n      height: 300px;\n      overflow-y: scroll;\n  }\n\n  .fork-status {\n      font-size: 14px;\n      padding: 10px;\n      border: 1px solid #f1f1f1;\n  }\n\n  .fork-status .item label {\n      font-weight: bold;\n      display: inline-block;\n      width: 180px;\n  }\n\n\n\n";const nn=an;function sn(e,{$:t,$on:i,$f7:a,$update:s}){let o,r,c,l,d=n.getInstance(Xa),p=n.getInstance(Si),u=n.getInstance(f),h=e.contractAddress,g=!1,m="",v="existing",b=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Fork Collection From Contract"}],y=!1;i("pageInit",(async()=>{o=n.getWalletService(),r=await o.getAddress(),await p.init(),y=null!=p.ipfs,await s()}));const w=async e=>{e.preventDefault(),v=t(e.currentTarget).val(),await s()},S=async e=>{e.preventDefault();let t=a.form.convertToData("#import-fork-contract");g=!0,s(),u.showSpinner("Forking...");try{c="existing"==v?await d.importExistingFromContract(t.contractAddress):await d.importAsForkFromContract(t.contractAddress),u.hideSpinner()}catch(e){console.log(e),u.hideSpinner(),a.dialog.alert(e.message,"There was an error")}g=!1,s()};return t(document).on("fork-progress",(async e=>{e.detail.message&&(m=`<p>${e.detail.message}</p>`),l=e.detail.forkStatus,g=!0,s();let i=document.getElementById("ipfs-fork-process");i&&t(i).scrollTop(i.scrollHeight)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-fork-contract">

    <${ca} breadcrumbs=${b} />
    <${He} />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">
        <form  @submit="${S}" id="import-fork-contract">

          <div class="block-title">Fork Collection From Contract</div>
  
           ${o?.address?t`
          
  
            <div class="card">
              <div class="card-content card-content-padding">
                ${y?t`
                  <div class="ipfs-label">
                      Status: <a href="/admin/connect">IPFS Ready</a>
                  </div>
              `:t`
                  <div class="ipfs-label">IPFS Initializing...</div>
              `}
              </div>
            </div>
  
            ${y&!g&!c?t`
  
              <div class="block-header">
                A <em>fork</em> is a copy of an NFT collection. Forking a project allows you to freely experiment with changes without affecting the original project.
              </div>
    
              <div class="list media-list inset">
                <ul>
                  <li>
                    <label class="item-radio item-radio-icon-start item-content">
                      <input type="radio" name="demo-media-radio" checked @change="${w}" value="existing" />
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
                      <input type="radio" name="demo-media-radio" @change="${w}" value="fork" />
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
                            <input type="text" name="contractAddress" placeholder="Enter Contract Address" value="${h||""}" required />
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
  
                
            `:t`
                <p></p>
            `}
  
  
  
            ${g||m?t`
  
              <div class="card">
  
                ${g?t`
                  <div class="card-header">
                      Forking...
                  </div>  
    
                `:t`<span />`}
    
  
                <div class="card-content">
                    <div class="card-content card-content-padding">
    
                      ${m?t`
  
                        ${l?t`
  
                          <div class="data-table ">
                            <table>
                              <thead>
                                <th class="label-cell">Type</th>
                                <th class="numeric-cell">Saved</th>
                                <th class="numeric-cell">Total</th>
                              </thead>
                              <tbody>
                                <tr class="${l.animations.saved==l.animations.total&&l.animations.total>0?"complete":""}">
                                  <td class="label-cell">Animations</td>
                                  <td class="numeric-cell">${l.animations.saved}</td>
                                  <td class="numeric-cell">${l.animations.total?l.animations.total:"?"} </td>
                                </tr>
                                <tr class="${l.images.saved==l.images.total&&l.images.total>0?"complete":""}">
                                  <td class="label-cell">Images</td>
                                  <td class="numeric-cell">${l.images.saved}</td>
                                  <td class="numeric-cell">${l.images.total?l.images.total:"?"}</td>
                                </tr>
                                <tr class="${l.items.saved==l.items.total&&l.items.total>0?"complete":""}">
                                  <td class="label-cell">Items</td>
                                  <td class="numeric-cell">${l.items.saved}</td>
                                  <td class="numeric-cell">${l.items.total}</td>
                                </tr>
                                <tr class="${l.channels.saved==l.channels.total&&l.channels.total>0?"complete":""}">
                                  <td class="label-cell">Channels</td>
                                  <td class="numeric-cell">${l.channels.saved}</td>
                                  <td class="numeric-cell">${l.channels.total}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
  
  
  
                        `:t`<span />`}
  
  
                        ${c?t`
                        
                          <div class="block save-row">
  
                            <div class="large-only"></div>
      
                            <a href="/admin/channel/show/${c}" class="button button-fill color-green" class="button button-fill" tabindex="12">
                              View Collection
                            </a>  
                          </div>
  
                        `:t`
                          <div class="fork-output-simple" innerHTML="${m}" id="ipfs-fork-process" ></div>
                        `}
  
  
                      `:t`<span />`}
  
  
    
                    </div>
                </div>
    
              </div>
  
            `:t`
              <span />
            `}
  
          `:t`
            <div class="block-header">
              Use a web browser with wallet support to import an existing ERC-721 collection.
            </div>
          `}
  
  
  
        </form>
      </div>

    </div>
  </div>

`}}sn.id="ab20cbca8e",sn.style="\n\n";const on=sn;function rn(e,{$:t,$on:i,$f7:a,$update:s}){let o,r,c,l,d,p,u,h=n.getInstance(Xa),g=n.getInstance(Si),m=n.getWalletService(),v=n.getInstance(f),b=(g.ipfs,g.peerCount,!1),y="",w="existing",S=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Fork Collection From Reader"}],$=window.location.hash?window.location.hash.substring(window.location.hash?.indexOf("?"),window.location.hash.length):void 0;const k=new URLSearchParams($);let I={};k.get("path")&&(I.path=decodeURIComponent(k.get("path")));const R=async e=>{try{d=await m.getAddress(),c=await P(),l=await C(),o=await T(),I.title=c.title,p=c.title}catch(e){a.dialog.alert(e,"Error loading collection. Not found.")}},_=async e=>{e.preventDefault(),I.path=t("#libraryURL").val(),await R(),await s()},x=e=>m.truncateEthAddress(e),P=async()=>(await Vi.Z.get(`${I.path}backup/export/backup/channels.json`)).data[0],C=async()=>(await Vi.Z.get(`${I.path}backup/export/backup/authors.json`)).data[0],T=async()=>{try{return(await Vi.Z.get(`${I.path}backup/contract/contract.json`)).data}catch(e){console.log(e)}};i("pageInit",(async()=>{I.path&&await R(),await s()}));const A=async e=>{e.preventDefault(),w=t(e.currentTarget).val(),await s()},O=async e=>{e.preventDefault(),p=t(e.currentTarget).val(),await s()},F=async e=>{e.preventDefault(),b=!0,await s(),v.showSpinner("Forking...");try{u="existing"==w?await h.importExistingFromReader(I.path,o.contractAddress,o.ipfsCid):await h.importAsForkFromReader(I.path,p),v.hideSpinner()}catch(e){console.log(e),v.hideSpinner(),a.dialog.alert(e.message,"Error loading collection")}b=!1,await s()};return t(document).on("fork-progress",(async e=>{e.detail.message&&(y=`<p>${e.detail.message}</p>`),r=e.detail.forkStatus,b=!0,s();let i=document.getElementById("ipfs-fork-process");i&&t(i).scrollTop(i.scrollHeight)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-fork-contract">

    <${ca} reader_config=${I} breadcrumbs=${S}  />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        <div class="block-title">Fork Collection From Reader</div>

        ${!b&!u?t`
  
          ${c?t`
          
            <form @submit="${F}" id="import-from-reader">
  
              <div class="block-header">
                A <em>fork</em> is a copy of an NFT collection. Forking a project allows you to freely experiment with changes without affecting the original project. 
              </div>
  
              <div class="list media-list inset">
                <ul>
                  <li>
                    <label class="item-radio item-radio-icon-start item-content">
                      <input type="radio" name="demo-media-radio" checked @change="${A}" value="existing" />
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
                      <input type="radio" name="demo-media-radio" @change="${A}" value="fork" />
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
  
              ${u?t`<span />`:t`
                <div class="block block-strong inset fork-block">
  
                  <p>Forking <a href="${I.path}" class="external">${c.title}</a></p>
    
                  <div class="repo-name">
    
                    <div class="left">
                      <strong>Author</strong>
    
                      <div class="list no-hairlines" style="margin: 0; padding-left: 0px;">
                        <ul>
                          <li class="item-content item-input" style="padding-left: 0px;">
                            <div class="item-inner">
                              <div class="item-input-wrap">
                                <select id="collection-author">
                                  ${"existing"==w&&null!=l?t`
                                    <option value="${l._id}">${x(l._id)} (Original Author)</option>
                                  `:t`
    
                                    ${d?t`
                                      <option value="${d}">${x(d)}</option>
                                    `:t`
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
    
                                ${"existing"==w?t`
                                  <div class="item-input-wrap ">
                                    ${c.title}
                                  </div>
                                `:t`
                                  <div class="item-input-wrap ">
                                    <input type="text" value="${I.title}" @change="${O}" />
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
    
                  ${b?t`
                      <span />
                  `:t`
                    <button type="submit" class="button button-fill col-30" tabindex="12" style="margin-bottom: 10px; width: 200px;">
                      <i class="material-icons">fork_left</i> Create Fork
                    </button>
                  `}
    
                </div>
              `}
  
            </form>
  
  
          `:t`
            
            <form @submit="${_}">
  
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
          
        `:t`<span />`}
  
  
        ${b||y?t`
  
          <div class="card">
  
            ${b?t`
              <div class="card-header">
                  Forking...
              </div>  
  
            `:t`<span />`}
  
  
            <div class="card-content">
                <div class="card-content card-content-padding">
  
  
                  ${y?t`
  
                    ${r?t`
                      <div class="data-table">
                        <table>
                          <thead>
                            <th class="label-cell">Type</th>
                            <th class="numeric-cell">Saved</th>
                            <th class="numeric-cell">Total</th>
                          </thead>
                          <tbody>
                            <tr class="${r.channels.saved==r.channels.total&&r.channels.total>0?"complete":""}">
                              <td class="label-cell">Channels</td>
                              <td class="numeric-cell">${r.channels.saved}</td>
                              <td class="numeric-cell">${r.channels.total}</td>
                            </tr>
                            <tr class="${r.authors.saved==r.authors.total&&r.authors.total>0?"complete":""}">
                              <td class="label-cell">Authors</td>
                              <td class="numeric-cell">${r.authors.saved}</td>
                              <td class="numeric-cell">${r.authors.total}</td>
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
                    `:t`<span />`}
  
  
                    ${u?t`
  
                      <br />
  
                      <div class="block save-row">
  
                        <div class="large-only"></div>
  
                        <a href="/admin/channel/show/${u}" class="button button-fill color-green" class="button button-fill" tabindex="12">
                          View Collection
                        </a>  
                      </div>
  
  
                    
                    `:t`
                      <div class="fork-output" innerHTML="${y}" id="ipfs-fork-process" ></div>
                    `}
  
  
                  `:t`<span />`}
  
  
  
                </div>
            </div>
  
          </div>
  
        `:t`
          <span />
        `}

      </div>

    </div>

  </div>

`}}rn.id="5b877c9978",rn.style="\n\n\n\n\n\n";const cn=rn;function ln(e,{$:t,$on:i,$f7:a,$update:s}){let o=n.getInstance(Gi),r=e.channelViewModel;const c=async e=>{e.preventDefault();try{await o.upgrade(r.channel)}catch(e){console.log(e),a.dialog.alert(e,"There was an error")}},l=async e=>{e.preventDefault(),a.preloader.show();try{await o.regenerateItemMedia(r.channel)}catch(e){console.log(e),a.dialog.alert(e,"There was an error")}a.preloader.hide()};return i("pageInit",(async(e,t)=>{})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-edit-channel">

    <${ca} />

    <div class="page-content">

      <div class="row">
        <div class="col-100 large-66 center">

          <ul class="breadcrumb">
            <li><a href="/admin/channel/show/${r.channel._id}">${r.channel.title}</a></li>
            <li>Upgrade Collection</li>
          </ul>

          <div class="block list">

            <p>This screen is used to update a collection to the latest database structure. Currently this is a 
            diagnostic level tool and should only be used if you have backed up the data.</p>

            <p>The effect is like opening each item individually and resaving it.</p>


            <button class="button button-fill" @click="${l}">
              Regenerate Animations
            </button>

            <br />

            <button class="button button-fill" @click="${c}">
              Upgrade
            </button>

          </div>

        </div>
      </div>



    </div>
  </div>

`}}ln.id="d7a5505985",ln.style="\n\n";const fn=ln;var dn=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},pn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},un=function(e,t){return function(i,a){t(i,a,e)}};let hn=class{channelWebService;itemWebService;schemaService;themeService;staticPageService;footerText;constructor(e,t,i,a,n,s){this.channelWebService=e,this.itemWebService=t,this.schemaService=i,this.themeService=a,this.staticPageService=n,this.footerText=s}async app(){return new sa((async e=>({footerText:this.footerText})),fa)}async create(){return new sa((async e=>{}),ya)}async createMenu(){return new sa((async e=>{}),Ea)}async fork(){return new sa((async e=>({cid:e.query.cid})),nn)}async forkContract(){return new sa((async e=>({footerText:this.footerText,contractAddress:e.query.contractAddress})),on)}async forkReader(){return new sa((async e=>({footerText:this.footerText})),cn)}async show(){return new sa((async e=>{await this.schemaService.loadChannel(e.params.id);let t=await this.channelWebService.get(e.params.id);return{channelViewModel:t,firstPageItems:await this.itemWebService.listByChannel(t.channel._id,te.CHUNK_SIZE,0)}}),ka)}async themes(){return new sa((async e=>{await this.schemaService.loadChannel(e.params.id);let t=await this.channelWebService.get(e.params.id);return{channelViewModel:t,themes:await this.themeService.listByChannel(t.channel._id,1e3,0)}}),xa)}async staticPages(){return new sa((async e=>{await this.schemaService.loadChannel(e.params.id);let t=await this.channelWebService.get(e.params.id);return{channelViewModel:t,staticPages:await this.staticPageService.listByChannel(t.channel._id,1e3,0)}}),Aa)}async edit(){return new sa((async e=>(await this.schemaService.loadChannel(e.params.id),{channelViewModel:await this.channelWebService.get(e.params.id)})),Fa)}async upgrade(){return new sa((async e=>(await this.schemaService.loadChannel(e.params.id),{channelViewModel:await this.channelWebService.get(e.params.id)})),fn)}};dn([oa("/"),pn("design:type",Function),pn("design:paramtypes",[]),pn("design:returntype",Promise)],hn.prototype,"app",null),dn([oa("/admin/channel/create"),pn("design:type",Function),pn("design:paramtypes",[]),pn("design:returntype",Promise)],hn.prototype,"create",null),dn([oa("/admin/channel/create-menu"),pn("design:type",Function),pn("design:paramtypes",[]),pn("design:returntype",Promise)],hn.prototype,"createMenu",null),dn([oa("/admin/channel/fork"),pn("design:type",Function),pn("design:paramtypes",[]),pn("design:returntype",Promise)],hn.prototype,"fork",null),dn([oa("/admin/channel/fork-contract"),pn("design:type",Function),pn("design:paramtypes",[]),pn("design:returntype",Promise)],hn.prototype,"forkContract",null),dn([oa("/admin/channel/fork-reader"),pn("design:type",Function),pn("design:paramtypes",[]),pn("design:returntype",Promise)],hn.prototype,"forkReader",null),dn([oa("/admin/channel/show/:id"),pn("design:type",Function),pn("design:paramtypes",[]),pn("design:returntype",Promise)],hn.prototype,"show",null),dn([oa("/admin/channel/themes/:id"),pn("design:type",Function),pn("design:paramtypes",[]),pn("design:returntype",Promise)],hn.prototype,"themes",null),dn([oa("/admin/channel/static-pages/:id"),pn("design:type",Function),pn("design:paramtypes",[]),pn("design:returntype",Promise)],hn.prototype,"staticPages",null),dn([oa("/admin/channel/edit/:id"),pn("design:type",Function),pn("design:paramtypes",[]),pn("design:returntype",Promise)],hn.prototype,"edit",null),dn([oa("/admin/channel/upgrade/:id"),pn("design:type",Function),pn("design:paramtypes",[]),pn("design:returntype",Promise)],hn.prototype,"upgrade",null),hn=dn([(0,s.b)(),un(5,(0,o.f)("footer-text")),pn("design:paramtypes",[Gi,Li,Le,_t,Ai,String])],hn);var gn,mn=i(6869),vn=i.n(mn),bn=i(48764).Buffer,yn=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},wn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Sn=function(e,t){return function(i,a){t(i,a,e)}};let $n=class{static{gn=this}settingsService;dayjs;static BASE_URL="https://api.github.com";static GRAPHQL_URL="https://api.github.com/graphql";static READER_REPO_OWNER="LargeNFT";static READER_REPO="large-reader";constructor(e,t){this.settingsService=e,this.dayjs=t}async createFork(e){console.log("Creating reader fork...");let t=(await this.settingsService.get()).gitProviders.github;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let i=await this.getExistingFork(e);if(i)return i;let a=`${gn.BASE_URL}/repos/${gn.READER_REPO_OWNER}/${gn.READER_REPO}/generate`,n=(await Vi.Z.post(a,{owner:t.username,name:this.getBranchName(e),include_all_branches:!1,private:!0},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;return{id:n.id,httpUrlToRepo:n.html_url,path:n.name,branch:"master"}}async createVariables(e){let t=await this.settingsService.get(),i=t.gitProviders.github;if(i.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");t.alchemyKey&&await this._createVariable(e,i,"ALCHEMY_API_KEY",t.alchemyKey)}async _createVariable(e,t,i,a){let n=`${gn.BASE_URL}/repos/${t.username}/${this.getBranchName(e)}/actions/secrets/public-key`;const s=a;let o=(await Vi.Z.get(n,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;await vn().ready;let r=vn().from_base64(o.key,vn().base64_variants.ORIGINAL),c=vn().from_string(s),l=vn().crypto_box_seal(c,r),f=vn().to_base64(l,vn().base64_variants.ORIGINAL),d=`${gn.BASE_URL}/repos/${t.username}/${this.getBranchName(e)}/actions/secrets/${i}`;return Vi.Z.put(d,{key_id:o.key_id,encrypted_value:f},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}async getExistingFork(e){let t=(await this.settingsService.get()).gitProviders.github;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");try{let i=`${gn.BASE_URL}/repos/${t.username}/${this.getBranchName(e)}`,a=(await Vi.Z.get(i,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;if(a.id)return{id:a.id,httpUrlToRepo:a.html_url,path:a.name,branch:"master"}}catch(e){}}async getForkRepoStatus(e){if((await this.settingsService.get()).gitProviders.github.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");return await this.getExistingFork(e)?"finished":"pending"}async commit(e,t,i){let a,n=0,s=this.chunkIt(t,100);for(const[o,r]of s.entries()){n+=r.length,this.logPublishProgress(`Commiting reader data for ${e.title} to GitHub: committing ${r.length} actions. ${n} / ${t.length}`);let c=await this.getMostRecentCommitOid(e,i);const l=r.map((e=>({path:e.file_path.slice(1),contents:bn.from(e.content).toString("base64")})));let f="";f=o===s.length-1?"Commiting reader data complete":`Commiting reader data for ${e.title}`;const d=`\n                mutation createCommit($additions: [FileAddition!]!, $oid: GitObjectID!) {\n                    createCommitOnBranch (input: {\n                        branch : {\n                            repositoryNameWithOwner: "${i.username}/${this.getBranchName(e)}"\n                            branchName: "master"\n                        }\n                        message: {\n                            headline: "${f}"\n                        }\n                        fileChanges: {\n                            additions: $additions\n                        }\n                        expectedHeadOid: $oid\n                        }) {\n                        commit {\n                            commitUrl\n                        }\n                    }\n                }\n            `,p={oid:c,additions:l};a=(await Vi.Z.post(gn.GRAPHQL_URL,{query:d,variables:p},{headers:{"Content-Type":"application/json",Authorization:`Bearer ${i.personalAccessToken}`}})).data.data.createCommitOnBranch.commit.commitUrl.split("/").pop(),this.logPublishProgress(`Commit successful: ${a}`)}return a}async getIPFSActionStatus(e){let t=(await this.settingsService.get()).gitProviders.github;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");try{let i=await this.getMostRecentActionRun(e,t);if(("success"==i?.conclusion||"skipped"==i?.conclusion)&&(!e.publishReaderIPFSStatus?.date||this.dayjs(i.created_at).isAfter(this.dayjs(e.publishReaderIPFSStatus?.date))))return"finished"}catch(e){console.log(e)}}async getIPFSActionResult(e){let t=(await this.settingsService.get()).gitProviders.github;if(t.personalAccessToken.length<1)throw new Error(`${t.name} personal access token not set`);try{const i=await Vi.Z.get(`${gn.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/contents/ipfs/ipfs.json`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}});let a=JSON.parse(bn.from(i.data.content,"base64").toString());return a.archive=`${e.httpUrlToRepo}/blob/master/ipfs/${a.cid}.car`,a}catch(e){console.log(e)}}async getMostRecentActionRun(e,t){if(!e.publishReaderIPFSStatus?.headSha)return;const i=await Vi.Z.get(`${gn.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/actions/workflows/main.yml/runs?per_page=1&page=1&head_sha=${e.publishReaderIPFSStatus.headSha}`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}});return i.data.workflow_runs?.length>0?i.data.workflow_runs[0]:void 0}async createCommit(e,t,i,a,n){const s=await Vi.Z.post(`${gn.BASE_URL}/repos/${n.username}/${i.publishReaderRepoPath}/git/commits`,{message:a,parents:[e],tree:t},{headers:{Authorization:`Bearer ${n.personalAccessToken}`}});await Vi.Z.patch(`${gn.BASE_URL}/repos/${n.username}/${i.publishReaderRepoPath}/git/refs/heads/master`,{sha:s.data.sha},{headers:{Authorization:`Bearer ${n.personalAccessToken}`}})}async createTree(e,t,i,a){let n={tree:t,base_tree:e};return(await Vi.Z.post(`${gn.BASE_URL}/repos/${a.username}/${i.publishReaderRepoPath}/git/trees`,n,{headers:{Authorization:`Bearer ${a.personalAccessToken}`,Accept:"application/vnd.github+json"}})).data.sha}async deleteReaderBackup(e,t){if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing files from repo..."),await this.deleteDirectory(e,t,".upload"),this.logPublishProgress("Successfully deleted existing backup...")}async deleteContractBackup(e,t){if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing contract files from repo..."),await this.deleteDirectory(e,t,"backup/contract")}async getMostRecentCommit(e,t){return(await Vi.Z.get(`${gn.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/commits/master`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data}async getMostRecentCommitOid(e,t){const i=`\n            query GetBranch{\n                repository (name: "${this.getBranchName(e)}", owner: "${t.username}") {\n                    ref (qualifiedName: "master") {\n                        target {\n                            ... on Commit {\n                                history(first: 1) {\n                                    nodes {\n                                        oid\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        `;return(await Vi.Z.post(gn.GRAPHQL_URL,JSON.stringify({query:i}),{headers:{"Content-Type":"application/json",Authorization:`Bearer ${t.personalAccessToken}`}})).data.data.repository.ref.target.history.nodes[0].oid}async deleteDirectory(e,t,i){const a=await this.getMostRecentCommit(e,t),n=a.commit.tree.sha;let s=(await Vi.Z.get(`${gn.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/git/trees/${n}`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data.tree,o=s.find((e=>e.path==i))?.sha;if(o){let s=(await Vi.Z.get(`${gn.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/git/trees/${o}`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`},params:{recursive:!0}})).data.tree.filter((({type:e})=>"blob"===e)).map((e=>({path:`${i}/${e.path}`,mode:e.mode,type:e.type,sha:null})));const r=await this.createTree(n,s,e,t);await this.createCommit(a.sha,r,e,`Deleting ${i}`,t)}}logPublishProgress(e){if(console.log(e),"undefined"!=typeof window&&void 0!==window.document){const t=new CustomEvent("publish-progress",{detail:{message:e}});document.dispatchEvent(t)}}chunkIt(e,t){let i=[];for(let a=0;a<e.length;a+=t){let n=e.slice(a,a+t);i.push(n)}return i}getBranchName(e){return e.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}};$n=gn=yn([(0,s.b)(),Sn(1,(0,o.f)("dayjs")),wn("design:paramtypes",[Et,Object])],$n);var kn=i(48764).Buffer,In=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Rn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let _n=class{settingsService;channelService;gitlabService;githubService;schemaService;fs;repoURI;defaultBranch;constructor(e,t,i,a,n){this.settingsService=e,this.channelService=t,this.gitlabService=i,this.githubService=a,this.schemaService=n}async deployReader(e){this.logPublishProgress("Deploying reader...");let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);let a=[];this.logPublishProgress("Creating channel backup...");let n=await this.schemaService.backupChannel();a.push({action:"create",file_path:"/.upload/channel.json",content:kn.from(JSON.stringify(n.channel))}),a.push({action:"create",file_path:"/.upload/items.json",content:kn.from(JSON.stringify(n.items))}),a.push({action:"create",file_path:"/.upload/originalMetadata.json",content:kn.from(JSON.stringify(n.originalMetadata))}),a.push({action:"create",file_path:"/.upload/authors.json",content:kn.from(JSON.stringify(n.authors))}),a.push({action:"create",file_path:"/.upload/themes.json",content:kn.from(JSON.stringify(n.themes))}),a.push({action:"create",file_path:"/.upload/staticPages.json",content:kn.from(JSON.stringify(n.staticPages))}),a.push({action:"create",file_path:"/.upload/attributeCounts.json",content:kn.from(JSON.stringify(n.attributeCounts))}),this.logPublishProgress(`Packaging ${n.images?.length} images...`);let s=0;for(let e of n.images)e.buffer instanceof ArrayBuffer&&(e.buffer=new Uint8Array(e.buffer)),a.push({action:"create",file_path:`/.upload/images/${s}.json`,content:kn.from(JSON.stringify(e))}),s++;this.logPublishProgress(`Packaging ${n.animations?.length} animations...`),s=0;for(let e of n.animations)a.push({action:"create",file_path:`/.upload/animations/${s}.json`,content:kn.from(JSON.stringify(e))}),s++;switch(i.name){case"gitlab":return await this.gitlabService.createVariables(e),await this.gitlabService.deleteReaderBackup(e,i),this.gitlabService.commit(e,a,i);case"github":return await this.githubService.createVariables(e),await this.githubService.deleteReaderBackup(e,i),this.githubService.commit(e,a,i)}this.logPublishProgress("Export to git complete")}async deployReaderContract(e,t){let i=await this.settingsService.get(),a=await this.channelService.getGitProviderCredentials(e,i);if(a.personalAccessToken.length<1)throw new Error(`${a.name} personal access token not set`);switch(a.name){case"gitlab":return await this.gitlabService.deleteContractBackup(e,a),this.gitlabService.commit(e,t,a);case"github":return this.githubService.commit(e,t,a)}this.logPublishProgress("Export to git complete")}async getExistingFork(e){let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return this.gitlabService.getExistingFork(e);case"github":return this.githubService.getExistingFork(e)}}async createFork(e){let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return this.gitlabService.createFork(e);case"github":return this.githubService.createFork(e)}}async createVariables(e){let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return this.gitlabService.createVariables(e);case"github":return this.githubService.createVariables(e)}}async getForkRepoStatus(e){let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return this.gitlabService.getForkRepoStatus(e);case"github":return this.githubService.getForkRepoStatus(e)}}async getIPFSActionStatus(e){let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return this.gitlabService.getIPFSActionStatus(e);case"github":return this.githubService.getIPFSActionStatus(e)}}async getIPFSActionResult(e){let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return this.gitlabService.getIPFSActionResult(e);case"github":return this.githubService.getIPFSActionResult(e)}}logPublishProgress(e){if(console.log(e),"undefined"!=typeof window&&void 0!==window.document){const t=new CustomEvent("publish-progress",{detail:{message:e}});document.dispatchEvent(t)}}chunkArrayByBytes(e,t){let i=[],a={};e.forEach((e=>{if(a[e._id]=kn.byteLength(JSON.stringify(e),"utf8"),console.log(e),a[e._id]>t)throw new Error("Image larger than 15MB found. Upload can not proceed.")}));let n=[],s=0;for(let o of e)s+a[o._id]>=t&&(i.push(n),n=[],s=0),n.push(o),s+=a[o._id];return n.length>0&&i.push(n),i}};function xn(e,{$:t,$on:i,$f7:a,$update:s}){let o=n.getInstance(Ut),r=(n.getInstance(nt),n.getInstance(Li)),c=n.getInstance(Tt),l=n.getInstance(f);const d=async()=>{$.images=await r.getImagesFromContent({title:$.item.title,content:{ops:o.activeEditor.getContents().ops},coverImageCSS:$.item.coverImageCSS,themes:$.item.themes}),1==$.images?.length&&($.coverImage=$.images[0]),o.activeEditor.update(),await s()},p=async e=>{let i=t(e.currentTarget).data("id"),a=$?.images.filter((e=>e.cid==i));a?.length>0&&($.coverImage=a[0]),await s()},u=async e=>{e.preventDefault(),$.coverImage=void 0,await s()},h=async e=>{let i=t(e.currentTarget).data("id");w.filter((e=>e.id==i))[0].value=t(e.currentTarget).val(),await s()},g=async e=>{let i=t(e.currentTarget).val();$.item.themes=i,await s(),await d()},m=e=>{let i=t(e.currentTarget).val();$.item.title=i,document.dispatchEvent(new CustomEvent("load-cover-images"))},v=e=>{T=t(e.currentTarget).prop("checked"),s()},b=async e=>{e.preventDefault();let t=a.form.convertToData("#generate-form");try{await o.generateAIImage(t.model,t.prompt,t.negativePrompt),a.popup.close(".ai-popup")}catch(e){l.hideSpinner(),a.dialog.alert(e.message,"There was an error")}};let y,w,S,$=e.item,k=e.editor,I=e.toolbar,R=e.themes,_=e.cancel_link,x=($.coverImage,e.cover_image_css_editor_id),P=e.animation_css_editor_id,C=e.show_hugging_face,T=!$.item.coverImageAsAnimation;return $&&(e=>{w=e;for(let e of w)!e.value&&e.values?.length>0&&(e.value=e.values[0])})($.attributeSelections),t(document).on("image-selected",(async e=>{$.coverImage=await c.get(e.detail._id),await d()})),t(document).on("update-cover-image-css",(async e=>{$.item.coverImageCSS=e?.detail?.coverImageCSS,await d()})),t(document).on("load-cover-images",(async e=>{await d()})),t(document).on("ipfs-ready",(async e=>{y=!0,await s()})),t(document).on("hugging-face-ready",(async e=>{C=!0,await s()})),t(document).on("set-ai-prompt",(async e=>{let t=o.activeEditor.getSelection();t&&(t.length>0?(S=o.activeEditor.getText(t.index,t.length),console.log("User has highlighted: ",S)):S=""),await s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="item-show">

        <input type="hidden" name="_id" value="${$?.item?._id}" />
        <input type="hidden" name="_rev" value="${$?.item?._rev}" />
        <input type="hidden" name="dateCreated" value="${$?.item?.dateCreated}" />
        <input type="hidden" name="tokenId" value="${$?.item?.tokenId}" />
        <input type="hidden" name="channelId" value="${$?.channel?._id}" />

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
                                                value="${$?.item?.title}" id="title-header-input"
                                                @input="${m}" />
                                        </div>
                                    </div>
                                </div>
                            </li>
    
                            <li>
                                <div class="item-content item-input">
                                    <div class="item-inner post-area">
                                        <div class="item-title item-label">Content</div>
    
                                        <div id="${I}">
    
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
    
                                            <button class="text-editor-button image-button"><i class="material-icons">image</i></button>
                                            <label><input type="file" class="image-button-input" /></label>

                                            <button class="text-editor-button ai-button" ${C?t`style='display: visible;'`:t``}>AI</button>                                                


                                        </div>
    
                                        <div class="editor bg-color-white text-color-black" id="${k}"></div>
                                    </div>
                                </div>
                            </li>
    
    
    
                            <li class="cover-photo-preview">
    
                                ${$?.coverImage?t`
                                <input type="hidden" name="coverImageId" value="${$?.coverImage?.cid}" />
                                `:t`
                                <input type="hidden" name="coverImageId" value="" />
                                `}
    
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">
                                            Cover Image
                                            <div class="item-footer">If there is no image in the content then an SVG cover image will be generated.</div>
                                        </div>
                                        <div class="item-input-wrap">
    
                                            ${$?.images?.length>0?t`
    
                                                ${$?.images?.map((e=>t`
                                                    <img class="cover-image-thumbnail ${e?.cid==$.coverImage?.cid||null==$.coverImage&&1==e.generated?"selected":""}  "
                                                        src="${e?.url}" data-id="${e?.cid}" @click=${p} />
                                                `))}
    
                                            `:t`
    
                                                <p>No images</p>
    
                                            `}
    
                                            <button class="button button-outline clear-button margin-bottom"
                                                @click="${u}">Clear</button>
    
                                        </div>
                                    </div>
                                </div>
    
                            </li>    
                            <li>
                                <label class="item-checkbox item-content">
    
                                    <input type="checkbox" checked="${!$.item.coverImageAsAnimation}" name="coverImageAsAnimation" @change="${v}" />
                                    
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
                                    <select name="themes" @change="${g}" tabindex="2" multiple>
                                        <optgroup>
                                            ${R?.map((e=>t`
    
                                                ${$.item?.themes?.includes(e._id)?t`
                                                    <option value="${e._id}" selected>${e.name}</option>
                                                    `:t`
                                                    <option value="${e._id}">${e.name}</option>
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
    
                            ${T?t`
                                <li class="accordion-item">
                                    <a href="" class="item-link item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Edit Animation CSS (HTML)</div>
                                        </div>
                                    </a>
                                    <div class="accordion-item-content">
                                        <div class="editor bg-color-white text-color-black css-editor" id="${P}" tabindex="4"></div>
                                    </div>
                                </li>
                            `:t`
                                <li class="accordion-item" style="display:none;">
                                    <a href="" class="item-link item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Edit Animation CSS (HTML)</div>
                                        </div>
                                    </a>
                                    <div class="accordion-item-content">
                                        <div class="editor bg-color-white text-color-black css-editor" id="${P}" tabindex="4"></div>
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
       
                            <a href="${_}" class="button button-outline color-gray" tabindex="12">Cancel</a>
                
                            ${y?t`
                              <button type="submit" class="button button-fill" tabindex="12">Save</button>
                            `:t`
                              <button class="button button-outline color-lightblue" tabindex="12" disabled>IPFS initializing...</button>
                            `}
                
                        </div>
                    </div>
                </div>
            </div>

            ${$.attributeSelections?.length>0?t`
                <div class="card">
                    <div class="card-header">Attributes</div>
                    <div class="card-content">
                        <div class="list">
                            <ul>
                                ${$.attributeSelections?.map((e=>t`
                                <li>
                                    <a href="#" class="item-link smart-select smart-select-init" data-open-in="popover">
                                        <!-- "multiple" attribute for multiple select-->
                                        <select @change="${h}" tabindex="2" data-id="${e?.id}">
                                            ${e?.values?.map((i=>t`

                                                ${e?.value?.toString()==i.toString()?t`
                                                <option value="${i}" selected>${i}</option>
                                                `:t`
                                                <option value="${i}">${i}</option>
                                                `}

                                            `))}
                                        </select>
                                        <div class="item-content">
                                            <div class="item-inner">
                                                <div class="item-title">${e?.traitType}</div>
                                            </div>
                                        </div>
                                    </a>
                                </li>


                                `))}
                            </ul>
                        </div>
                    </div>
                </div>
            `:t``}




        </div>

        <input type="hidden" name="attributeSelections" value="${JSON.stringify(w)}" />

        <div class="popup ai-popup">
            <div class="view">
                <div class="page">
                    <div class="navbar">
                        <div class="navbar-bg"></div>
                        <div class="navbar-inner">
                            <div class="title">Generate AI Image</div>
                            <div class="right">
                                <!-- Link to close popup -->
                                <a class="link popup-close">Close</a>
                            </div>
                        </div>
                    </div>
                    <div class="page-content">

                        <form id="generate-form" @submit="${b}">
                        
                            <div class="list">
                                <ul>
    
                                    <li>
                                        <div class="item-content item-input">
                                            <div class="item-inner">

                                                <div class="item-title item-label">Model</div>
                                                <div class="item-input-wrap input-dropdown-wrap">
                                                    <select name="model" tabindex="40">
                                                        <option value="stabilityai/stable-diffusion-2" selected>Image: stabilityai/stable-diffusion-2</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </li>


                                    <li>
                                        <div class="item-content item-input">
                                            <div class="item-inner">
                                                <div class="item-title item-label">Prompt</div>
                                                <div class="item-input-wrap">
                                                    <textarea name="prompt" tabindex="41">${S}</textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
    
                                    <li>
                                        <div class="item-content item-input">
                                            <div class="item-inner">
                                                <div class="item-title item-label">Negative Prompt</div>
                                                <div class="item-input-wrap">
                                                    <textarea name="negativePrompt" tabindex="42"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
    
    
    
                                </ul>
                            </div>
    
                            <div class="block save-row">
              
                                <div class="large-only"></div>
                  
                                <button type="submit" class="button button-fill" tabindex="43">
                                  Generate
                                </button>
                  
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    </div>

`}}_n=In([(0,s.b)(),Rn("design:paramtypes",[Et,vi,ea,$n,Le])],_n),xn.id="17a8edd7c9",xn.style="\n    .cover-image-thumbnail {\n        width: 250px;\n        height: 250px;\n    }\n\n    .cover-image-thumbnail.selected {\n        border: 3px solid #ff0000;\n    }\n\n    #title-header-input {\n        line-height: 30px;\n        font-size: 30px;\n        font-weight: 700;\n        height: 50px;\n    }\n\n    .clear-button {\n        width: 100px;\n    }\n";const Pn=xn;i(69942);function Cn(e,{$:t,$on:i,$f7:a,$update:s}){let o,r,c=n.getInstance(Ut),l=n.getInstance(nt),d=n.getInstance(f),p=n.getInstance(di),u=(n.getInstance(Tt),n.getInstance(Li)),h=n.getInstance(Si),g=(n.getInstance(_n),n.getInstance(Et)),m=n.getInstance(Mt),v=(n.getWalletService(),e.itemViewModel),b=e.themes,y=!1,w=`/admin/channel/show/${v.channel._id}`,S=!1,$=[{text:"Home",path:"/"},{text:v.channel.title,path:`/admin/channel/show/${v.channel._id}`},{text:"Create Item"}];va.Z.configure({languages:["css"]});const k=async e=>{e.preventDefault(),await h.init();let t=a.form.convertToData("#create-item-form"),i=Object.assign(new Y,t);i.coverImageAsAnimation="on"!=t.coverImageAsAnimation[0],i.content=c.activeEditor.getContents(),i.coverImageCSS="\n"!=o.getText()?o.getText():void 0,i.animationCSS="\n"!=r.getText()?r.getText():void 0,i.attributeSelections=JSON.parse(i.attributeSelections).map((e=>({id:e.id,traitType:e.traitType,value:e.value}))),i.contentHTML=await l.translateContent(i.content,!0);let n=await u.saveGeneratedCoverImage(i);i.coverImageGenerated=n.generated,i.tokenId=await p.getNextTokenId(i.channelId),i.coverImageAsAnimation||await u.saveAnimation(i);try{d.showSpinner(),await u.put({channel:v.channel,item:i,updateQueryCache:!0,publish:!1});a.toast.show({text:"Item created",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate(`/admin/channel/show/${i.channelId}/${i.tokenId}`)}catch(e){console.log(e),a.dialog.alert(e.errors,"There was an error")}};return i("pageInit",(async(e,i)=>{c.buildQuillPostEditor("#create-item-editor","#create-item-toolbar"),c.activeEditor.root.addEventListener("blur",(function(){document.dispatchEvent(new CustomEvent("load-cover-images"))})),c.activeEditor.on("text-change",((e,t,i)=>{if(document.dispatchEvent(new CustomEvent("load-cover-images")),"user"!==i)return;const a=function(e){return e.ops.filter((e=>e.insert&&e.insert.ipfsimage)).map((e=>e.insert.ipfsimage))}(c.activeEditor.getContents().diff(t));a.forEach((e=>{v.images=v.images.filter((t=>t.cid!=e.cid)),e.cid==v.coverImage?.cid&&(v.coverImage=void 0)}))})),t(".image-button").off("click"),t(".image-button-input").off("click"),t(".ai-button").off("click"),t(".image-button").on("click",(function(e){e.preventDefault();t(".image-button-input").click()})),t(".image-button-input").on("change",(async function(e){e.preventDefault(),await c.imageSelected(this)})),t(".ai-button").on("click",(async function(e){e.preventDefault();const t=new CustomEvent("set-ai-prompt");document.dispatchEvent(t),a.popup.open(".ai-popup")})),o=new(rt())("#cover-image-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>va.Z.highlightAuto(e).value},toolbar:!1}}),o.on("text-change",((e,t,i)=>{document.dispatchEvent(new CustomEvent("update-cover-image-css",{detail:{coverImageCSS:"\n"!=o.getText()?o.getText():void 0}}))})),r=new(rt())("#animation-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>va.Z.highlightAuto(e).value},toolbar:!1}}),o.setText(".svg-h1 {}"),r.setText(".animation-container {}"),await s(),d.showSpinner(),await h.init(),y=null!=h.ipfs;const n=new CustomEvent("ipfs-ready");document.dispatchEvent(n);const l=await g.get();if(S=null!=l?.huggingFace,l?.huggingFace?.length>0){await m.init();const e=new CustomEvent("hugging-face-ready");document.dispatchEvent(e)}d.hideSpinner(),await s()})),i("pageBeforeRemove",(()=>{})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-create-item">

    <${ca} breadcrumbs=${$} />

    <div class="page-content hide-toolbar-on-scroll">

      <form class="list media-list" id="create-item-form" @submit="${k}">

        <${Pn} item=${v} 
          themes=${b}
          editor="create-item-editor" 
          toolbar="create-item-toolbar" 
          cover_image_css_editor_id="cover-image-css-editor"
          animation_css_editor_id="animation-css-editor"
          themes=${b}
          cancel_link=${w}
          show_hugging_face=${S}
        />

      </form>


    </div>
  </div>

`}}Cn.id="e2ff892432",Cn.style="\n  #create-item-editor {\n    min-height: 175px;\n    height: 100%;\n    /* added these styles */\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n  }\n";const Tn=Cn;function An(e,{$:t,$on:i,$f7:a,$update:s}){n.getInstance(di);let o=n.getInstance(f),r=n.getInstance(Li),c=e.itemViewModel,l=(c.editable,[{text:"Home",path:"/"},{text:c.channel.title,path:`/admin/channel/show/${c.channel._id}`},{text:c.item.title?c.item.title:`#${c.item.tokenId}`}]);i("pageInit",(async(e,i)=>{t(`#item-content-${c.item._id} a`).addClass("external"),await s()}));const d=async e=>{try{a.dialog.confirm("Do you want to delete this item? Note: This only deletes from your device.",(async function(){await r.delete(c.item);a.toast.show({text:"Item deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate(`/admin/channel/show/${c.channel._id}`)}))}catch(e){o.showExceptionPopup(e)}},p=async e=>{let t=await r.clone(c.item);a.views.main.router.navigate(`/admin/channel/${c.channel._id}/item/edit/${t._id}`)};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-show-item">

    <${ca} breadcrumbs=${l} />

    ${c.editable?t`
      <div class="fab fab-extended fab-right-bottom">
        <a href="/admin/item/create/${c.channel._id}">
          <i class="material-icons">create</i>
          <div class="fab-text">Create Item</div>
        </a>
      </div>
    `:t``} 


    <div class="page-content hide-toolbar-on-scroll">

      <div class="item-show">

        <div class="left">
          <div class="card animation-card">
            <div class="card-content ${c.item.coverImageAsAnimation?t`card-content-padding`:t` `}">
  
              ${c.item.coverImageAsAnimation?t`
                <div class="animation-content animation-image">
                  <img src="${c.coverImage?.url}" alt="Item cover image" />
                </div>
               
              `:t`
                <div class="animation-content" innerHTML="${c.animationContentHTML}"></div>
  
              `}
  
            </div>
  
  
          </div> 
  
          <div class="block split-row-both">
  
            ${c.previous?t`
              <a class="button button-outline back-token-button margin-bottom color-gray" href="/admin/channel/show/${c.channel._id}/${c.previous}">
                <i class="icon f7-icons color-blue">arrow_left</i>
              </a>
            `:t`<span />`}
  
    
            ${c.next?t`
              <a class="button button-fill continue-button margin-bottom" href="/admin/channel/show/${c.channel._id}/${c.next}" data-transition="f7-cover">
                Continue <i class="f7-icons">arrow_right</i>
              </a>
            `:t`<span />`}
  
          </div>
        </div>

        <div class="right">

          <${Sa} channel=${c.channel._id} item=${c} />
  
  
          ${c.previous||c.next?t`
            
            <div class="card large-only">
              <div class="card-content card-content-padding">
                <div class="segmented">
  
                  ${c.previous?t`
                    <a class="button button-outline" href="/admin/channel/show/${c.channel._id}/${c.previous}">
                      <i class="icon f7-icons">arrow_left</i>
                    </a>
                  `:t`
                    <a class="button button-outline" href="#"></a>
                  `}
        
                  ${c.next?t`
                    <a class="button button-outline" href="/admin/channel/show/${c.channel._id}/${c.next}" data-transition="f7-cover">
                      <i class="f7-icons">arrow_right</i>
                    </a>
                  `:t`
                    <a class="button button-outline" href="#"></a>
                  `}
  
                </div>
              </div>
            </div>
  
          `:t`<span />`}
  
  
          ${c.editable?t`
            <div class="card">
              <div class="card-header">Modify</div>
              <div class="card-content card-content-padding">
  
                <div class="segmented col-100">
  
                  <a class="button button-outline " href="/admin/channel/${c.channel._id}/item/edit/${c.item._id}" id="edit-${c.item._id}">Edit</a>
                  <a class="button button-outline " href="#" data-id="${c.item._id}" @click="${p}">Clone</a>
  
                  ${c.canDelete?t`
                    <a class="button button-outline" @click="${d}">
                      <i class="material-icons">delete</i>
                    </a>
                  `:t`<span/>`}
  
                </div>
  
                ${c.canDelete?t`<span />`:t`
                  <p>Note: Only the last NFT can be deleted.</p>
                `}
  
  
              </div>
  
  
  
            </div>          
          `:t`<span />`}
          
  
  
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
  
                  ${c?.authorDisplayName?t`
                    <tr>
                      <td class="label-cell">Creator:</td> 
                      <td><a href="/admin/author/show/${c?.author?._id}">${c?.authorDisplayName}</a></td>
                    </tr>  
                  `:t`<span />`}
  
                  <tr>
                    <td class="label-cell">Date:</td> 
                    <td><span class="date">${c.dateDisplay}</span></td>
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
                <div class="value">#${c.item.tokenId}</div>
              </div>
  
              ${c.attributeSelections?.map((e=>t`
  
                ${e.value?t`
                  <div class="button-outline attribute-value">
                    <div class="trait-type">${e.traitType}</div>
                    <div class="value">${e.value}</div>
                    <div class="category-percent">${e.categoryPercent} have this trait</div>
                  </div>
                `:t`<span />`}
  
              `))}
  
            </div>
          </div>
  
          ${c.themes?.length>0?t`
  
            <div class="card">
              <div class="card-header">Theme(s)</div>
              <div class="card-content">
                
                ${c.themes?.map((e=>t`
  
                  <div class="button-outline attribute-value">
                    <div class="value">${e.name}</div> <span class="theme-id">${e._id}</span>
                  </div>
  
                `))}
              </div>
            </div>
  
          `:t`<span/>`}
  
  
  
  
          ${c.item.coverImageAsAnimation?t`<span />`:t`
            <div class="card">
              <div class="card-header">Cover Image</div>
              <div class="card-content">
                <div class="square">
                  <img src="${c.coverImage?.url}" class="cover-image-preview" alt="Item cover image" />
                </div>
              </div>
            </div>
           
          `}
  
  
  
  
        </div>
  
      </div>

    </div>

  </div>

`}}An.id="1ad0c8baf1",An.style="\n\n\n\n\n  /* .item-card-show a {\n    color: var(--f7-text-color);\n  } */\n\n\n  .menu-dropdown-link.menu-close {\n    color: #ffffff;\n  }\n\n\n  .attribute-row {\n    font-size: 16px;\n    vertical-align: top;\n  }\n\n  .attribute-row strong {\n    width: 175px;\n    display: inline-block;\n    vertical-align: top;\n  }\n\n\n  .attribute-row .material-icons {\n    line-height: 16px;\n    display: inline-block;\n    vertical-align: middle;\n  }\n\n  .item-show-footer {\n    font-size: 14px;\n  }\n\n  .card-header {\n    line-height: 21px;\n  }\n\n  .card-header label {\n    padding-bottom: 3px;\n    margin-left: 5px;\n    float: left;\n  }\n\n  .card-header .material-icons {\n    float: left;\n  }\n\n  .item-show-token-id {\n    color: rgb(79, 79, 79);\n  }\n\n  .cover-image-preview {\n    max-width: 100%;\n  }\n\n  .animation-preview {\n    margin-left: 5px;\n    height: 500px; \n    width: 500px;\n    max-width: 100%;\n    border: 1px solid #cccccc;\n  }\n\n\n  .nft-header-row {\n    display: flex;  \n  }\n\n  .nft-header-row .left {\n    flex: 0 0 500px;\n  }\n\n  .nft-header-row .right {\n    flex: 1;\n  }\n\n  .nft-header-row .right h1 {\n    font-size: 25px;\n  }\n\n  .nft-header-row .right h4 {\n    margin-bottom: 0px;\n  }\n\n\n\n\n\n@media only screen and (max-width: 1024px) {\n\n  .nft-header-row {\n    display: block;  \n  }\n  \n  .nft-header-row .left {\n    width: 100%;\n  }\n  \n  .nft-header-row .right {\n    width: 100%;\n  }\n  \n}\n\n\n.theme-name {\n  display: block;\n}\n\n.main-header {\n\n}\n\n\n";const On=An;function Fn(e,{$:t,$on:i,$f7:a,$update:s}){let o,r,c=n.getInstance(Ut),l=n.getInstance(nt),d=n.getInstance(f),p=(n.getInstance(di),n.getInstance(Li)),u=n.getInstance(Si),h=(n.getInstance(_n),n.getInstance(Et)),g=n.getInstance(Mt),m=(n.getInstance(Tt),n.getWalletService(),e.itemViewModel),v=e.themes,b=!1,y=`/admin/channel/show/${m.item.channelId}/${m.item.tokenId}`,w=!1;va.Z.configure({languages:["css"]});let S=[{text:"Home",path:"/"},{text:m.channel.title,path:`/admin/channel/show/${m.channel._id}`},{text:m.item.title?m.item.title:`#${m.item.tokenId}`,path:`/admin/channel/show/${m.channel._id}/${m.item.tokenId}`},{text:"Edit Item"}];const $=async e=>{e.preventDefault();let t=a.form.convertToData("#edit-item-form"),i=Object.assign(new Y,t);i.coverImageAsAnimation="on"!=t.coverImageAsAnimation[0],i.tokenId=parseInt(t.tokenId),i.content=c.activeEditor.getContents(),i.coverImageCSS="\n"!=o.getText()?o.getText():void 0,i.animationCSS="\n"!=r.getText()?r.getText():void 0,i.attributeSelections?i.attributeSelections=JSON.parse(i.attributeSelections).map((e=>({id:e.id,traitType:e.traitType,value:e.value}))):i.attributeSelections=[],i.contentHTML=await l.translateContent(i.content,!0);let n=await p.saveGeneratedCoverImage(i);i.coverImageGenerated=n.generated,i.coverImageAsAnimation||await p.saveAnimation(i);try{d.showSpinner(),await p.put({channel:m.channel,item:i,updateQueryCache:!0,publish:!1});a.toast.show({text:"Item saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate(`/admin/channel/show/${i.channelId}/${i.tokenId}`)}catch(e){console.log(e),a.dialog.alert(e.errors,"There was an error")}};return i("pageInit",(async(e,i)=>{c.buildQuillPostEditor("#edit-item-editor","#edit-item-toolbar"),c.activeEditor.setContents(m.item.content),c.activeEditor.on("selection-change",(e=>{document.dispatchEvent(new CustomEvent("load-cover-images"))})),c.activeEditor.on("text-change",((e,t,i)=>{if(document.dispatchEvent(new CustomEvent("load-cover-images")),"user"!==i)return;let a=c.activeEditor.getContents();const n=function(e){return e.ops.filter((e=>e.insert&&e.insert.ipfsimage)).map((e=>e.insert.ipfsimage))}(c.activeEditor.getContents().diff(t)),o=[];for(let e of n){let i=t.ops.filter((t=>t.insert&&t.insert.ipfsimage&&t.insert.ipfsimage.cid==e.cid)),n=a.ops.filter((t=>t.insert&&t.insert.ipfsimage&&t.insert.ipfsimage.cid==e.cid));i.length>0&&0==n.length&&o.push(e)}o.forEach((e=>{m.images=m.images.filter((t=>t.cid!=e.cid)),e.cid==m.coverImage?.cid&&(m.coverImage=void 0)})),s()})),t(".image-button").off("click"),t(".image-button-input").off("click"),t(".ai-button").off("click"),t(".image-button").on("click",(function(e){e.preventDefault();t(".image-button-input").click()})),t(".image-button-input").on("change",(async function(e){e.preventDefault(),await c.imageSelected(this)})),t(".ai-button").on("click",(async function(e){e.preventDefault();const t=new CustomEvent("set-ai-prompt");document.dispatchEvent(t),a.popup.open(".ai-popup")})),o=new(rt())("#cover-image-edit-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>va.Z.highlightAuto(e).value},toolbar:!1}}),o.on("text-change",((e,t,i)=>{document.dispatchEvent(new CustomEvent("update-cover-image-css",{detail:{coverImageCSS:"\n"!=o.getText()?o.getText():void 0}}))})),r=new(rt())("#animation-edit-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>va.Z.highlightAuto(e).value},toolbar:!1}}),m.item.coverImageCSS&&o.setText(m.item.coverImageCSS),m.item.animationCSS&&r.setText(m.item.animationCSS),await s(),d.showSpinner(),await u.init(),b=null!=u.ipfs;const n=new CustomEvent("ipfs-ready");document.dispatchEvent(n);const l=await h.get();if(w=null!=l?.huggingFace,l?.huggingFace?.length>0){await g.init();const e=new CustomEvent("hugging-face-ready");document.dispatchEvent(e)}d.hideSpinner(),await s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-edit-post">

    <${ca} breadcrumbs=${S} />

    <div class="page-content hide-toolbar-on-scroll">

      <form class="list media-list" id="edit-item-form" @submit="${$}">

        <${Pn} item=${m} 
          editor="edit-item-editor" 
          toolbar="edit-item-toolbar" 
          cover_image_css_editor_id="cover-image-edit-css-editor"
          animation_css_editor_id="animation-edit-css-editor"
          themes=${v}
          cancel_link=${y}
          show_hugging_face=${w}
        />


      </form>

    </div>

  </div>

`}}Fn.id="84f86351c5",Fn.style="\n  #edit-item-editor {\n    min-height: 175px;\n    height: 100%;\n    /* added these styles */\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n  }\n";const jn=Fn;var En=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Dn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Bn=class{itemWebService;themeService;schemaService;constructor(e,t,i){this.itemWebService=e,this.themeService=t,this.schemaService=i}async create(){return new sa((async e=>{await this.schemaService.loadChannel(e.params.channelId);let t=await this.itemWebService.getNewViewModel(e.params.channelId);return{itemViewModel:t,themes:await this.themeService.listByChannel(t.channel._id,1e3,0)}}),Tn)}async show(){return new sa((async e=>(await this.schemaService.loadChannel(e.params.channelId),{itemViewModel:await this.itemWebService.getNavigation(e.params.channelId,parseInt(e.params.tokenId))})),On)}async edit(){return new sa((async e=>{await this.schemaService.loadChannel(e.params.channelId);let t=await this.itemWebService.get(e.params.id);return{itemViewModel:t,themes:await this.themeService.listByChannel(t.channel._id,1e3,0)}}),jn)}};function Mn(e,{$:t,$on:i,$f7:a,$update:n}){let s=e.authorViewModel,o=[{text:"Home",path:"/"},{text:"Author Profile"}];return function(t){t.$;var i=t.$h;t.$root,t.$f7,t.$f7route,t.$f7router,t.$theme,t.$update,t.$store;return i`
    <div class="page" data-name="profile-show">

        <${ca} breadcrumbs=${o} active="profile" />

        <div class="page-content hide-toolbar-on-scroll">

            ${s.author._id?i`

                <div class="block row">
                    <div class="col-20">

                        ${s.authorPhoto?i`
                            <img src="${s.authorPhoto.url}" class="profile-pic-main" alt="Author photo" />
                        `:i`
                            <i class="material-icons" id="profile-pic-not-found">person</i>
                        `}

                    </div>

                    <div class="col-80">

                        <div class="profile-name">
                            ${s.authorDisplayName}
                        </div>

                        <div class="profile-address">
                            ${s.author._id}
                        </div>

                        <p>${s.author.description}</p>

                        <div class="row">
                            <a href="/admin/${e.channelId}/author/edit/${s.author.walletAddress}"
                                class="button button-outline button-small button-round col-20">Edit</a>
                        </div>

                    </div>
                </div>

                `:i`
                    <div class="block">
                        Create your Large <a href="/admin/${e.channelId}/author/edit/${s.author.walletAddress}">author profile</a>. 
                    </div>
                `}


        </div>

    </div>
`}}En([oa("/admin/item/create/:channelId"),Dn("design:type",Function),Dn("design:paramtypes",[]),Dn("design:returntype",Promise)],Bn.prototype,"create",null),En([oa("/admin/channel/show/:channelId/:tokenId"),Dn("design:type",Function),Dn("design:paramtypes",[]),Dn("design:returntype",Promise)],Bn.prototype,"show",null),En([oa("/admin/channel/:channelId/item/edit/:id"),Dn("design:type",Function),Dn("design:paramtypes",[]),Dn("design:returntype",Promise)],Bn.prototype,"edit",null),Bn=En([(0,s.b)(),Dn("design:paramtypes",[Li,_t,Le])],Bn),Mn.id="fbe7dcf796",Mn.style="\n    \n  .profile-pic-edit, #profile-pic--edit-not-found {\n    max-width: 300px;\n    border-radius: 50%;\n    font-size: 100px;\n    float: left;\n  }\n  \n  \n  .profile-pic-main, #profile-pic-not-found {\n    max-width: 100%;\n    border-radius: 50%;\n    font-size: 100px;\n    float: left;\n  }\n  \n  .profile-name {\n    color: var(--f7-block-title-medium-text-color);\n    font-weight: bold;\n  }\n  \n  .profile-address {\n    color: var(--f7-list-item-text-text-color);\n    font-size: 13px;\n  }\n  \n  \n  .profile-pic-wrapper {\n    width: 115px;\n    float: left;\n    padding-right: 20px;\n  }\n\n";const Nn=Mn;function Ln(e,{$:t,$on:i,$f7:a,$update:s}){let o=n.getInstance(Wt),r=n.getInstance(Tt),c=n.getInstance(ii),l=n.getWalletService(),f=e.authorViewModel,d=[{text:"Home",path:"/"},{text:l.truncateEthAddress(f.author.walletAddress),path:`/admin/author/show/${f.author.walletAddress}`},{text:"Edit Profile"}];const p=async t=>{t.preventDefault();let i=Object.assign(new R,a.form.convertToData("#edit-author-form"));try{await c.put(i);a.toast.show({text:"Profile Saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate(`/admin/${e.channelId}/author/show/${i._id}`)}catch(e){console.log(e),a.dialog.alert(e.errors,"There was an error")}},u=async e=>{t("#author-photo-browse").click()},h=async e=>{let t=await o.uploadFile(document.getElementById("author-photo-browse")),i=await r.newFromBuffer(t);try{await r.put(i)}catch(e){}f.authorPhoto={cid:i.cid,url:await r.getUrl(i)},s()};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`
    <div class="page" data-name="profile-edit">

        <${ca} breadcrumbs=${d} active="profile" />


        <div class="page-content hide-toolbar-on-scroll">

            <div class="block-title block-title-medium">Edit Profile</div>
            <form id="edit-author-form" @submit="${p}">

                <input type="hidden" name="_id" value="${f.author._id}" />
                <input type="hidden" name="_rev" value="${f.author._rev}" />

                <input type="hidden" name="walletAddress" value="${f.author.walletAddress}" />

                <div class="card">
                    <div class="card-content">
                        <div class="list">
                            <ul>
        
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Avatar</div>
                                            <div class="item-input-wrap">
            
                                                ${f.authorPhoto?t`
                                                <img class="author-photo-preview"
                                                    src="${f.authorPhoto.url}" alt="Author photo" />
                                                `:t`
                                                <i class="material-icons author-photo-preview">image</i>
                                                `}
            
                                                <input type="button" class="button button-fill browse-file" value="Browse"
                                                    @click="${u}" tabindex="1" />
                                                <input type="hidden" name="coverPhotoId"
                                                    value="${f?.authorPhoto?.cid}" />
                                                <input type="file" id="author-photo-browse" style="display: none"
                                                    @change="${h}" />
            
                                            </div>
                                        </div>
                                    </div>
                                </li>
            
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Name</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="name" value="${f.author.name}" placeholder="Enter your name" tabindex="2" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Description</div>
                                            <div class="item-input-wrap">
                                                <textarea name="description" placeholder="Enter a short bio" tabindex="3">${f.author.description}</textarea>
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

                    <a href="/admin/author/show/${f.author.walletAddress}" class="button button-outline color-gray" tabindex="4">Cancel</a>
      
                    <button type="submit" class="button button-fill" tabindex="5">
                      Save
                    </button>
      
                </div>


            </form>

        </div>

    </div>
`}}Ln.id="f1e2753056",Ln.style="\n    .author-photo-preview {\n        max-width: 100%;\n        max-height: 200px;\n        border: 1px solid #cccccc;\n        padding: 5px;\n        margin-bottom: 10px;\n    }\n";const Un=Ln;var Hn=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},qn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Gn=class{authorWebService;schemaService;constructor(e,t){this.authorWebService=e,this.schemaService=t}async show(){return new sa((async e=>{let t;await this.schemaService.loadChannel(e.params.channelId);try{t=await this.authorWebService.get(e.params.id)}catch(e){console.log(e)}return t||(t=Object.assign(new R,{author:{walletAddress:e.params.id}})),{authorViewModel:t}}),Nn)}async edit(){return new sa((async e=>{let t;await this.schemaService.loadChannel(e.params.channelId);try{t=await this.authorWebService.get(e.params.id)}catch(e){}return t||(t=Object.assign(new R,{author:{walletAddress:e.params.id}})),{authorViewModel:t}}),Un)}};function zn(e,{$:t,$on:i,$f7:a,$update:s}){let o,r=n.getInstance(Et),c=n.getInstance(Si),l=[{text:"Home",path:"/"},{text:"Settings"}];const f=async e=>{e.preventDefault();let t=a.form.convertToData("#edit-settings-form"),i={_id:t._id,_rev:t._rev,ipfsHost:t.ipfsHost,defaultGitProvider:t.gitProvider,gitCorsProxy:t.gitCorsProxy,gitProviders:{gitlab:{name:"gitlab",username:t.gitLabUsername,personalAccessToken:t.gitLabPersonalAccessToken},github:{name:"github",username:t.gitHubUsername,personalAccessToken:t.gitHubPersonalAccessToken}},alchemyKey:t.alchemyKey,huggingFace:t.huggingFace,welcomeHide:"true"==t.welcomeHide};try{let e=Object.assign(new N,i);await r.put(e),o?.ipfsHost!=e?.ipfsHost&&await c.clearInit();a.toast.show({text:"Settings Saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate("/")}catch(e){console.log(e.errors),a.dialog.alert(e,"Saving settings failed")}},d=async e=>{o.gitProvider=t(e.currentTarget).val(),await s()};return i("pageInit",(async e=>{o=await r.get(),s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="admin-settings">

        <${ca} breadcrumbs=${l} />

        <div class="page-content hide-toolbar-on-scroll">

            <div class="fixed-width-content center">

                ${o?t`
                    <form id="edit-settings-form" @submit="${f}">
            
                        <input type="hidden" name="_id" value="${o?._id}" />
                        <input type="hidden" name="_rev" value="${o?._rev}" />
                        <input type="hidden" name="welcomeHide" value="${o?.welcomeHide}" />
    

                        <div class="list accordion-list">
                            <ul>
                                <li class="accordion-item">
                                    <a href="" class="item-link item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Configure an AI provider</div>
                                        </div>
                                    </a>
                                    <div class="accordion-item-content">
                                        <div class="block">
                                            To enable AI generation features configure your Hugging Face token.
                                        </div>
                    
                                        <div class="card">
                                            <div class="card-content">
                    
                                                <div class="block block-strong">
                    
                                                    <strong>Hugging Face</strong> Instructions
                    
                                                    <ol>
                                                        <li>Create a <a href="http://huggingface.co" class="external" target="_blank">Hugging Face</a> account.</li>
                                                        <li>Create a <a href="https://huggingface.co/settings/tokens" class="external" target="_blank">new token</a> and 
                                                            save it below.</li>
                            
                                                    </ol>
                            
                                                    <p>Give the token a name and choose "Read" in the role dropdown.</p>        
                      
                                                </div>
                    
                    
                                                <div class="list">
                                                    <ul>
                                                        <li class="item-content item-input">
                    
                                                            <div class="item-inner">
                                                                <div class="item-title item-label">Enter your <a href="https://huggingface.co/settings/tokens" class="external" target="_blank">Hugging Face</a> API key</div>
                                                                <div class="item-input-wrap">
                                                                    <input type="text" name="huggingFace" value="${o?.huggingFace}" placeholder="API token..." />
                                                                    <span class="input-clear-button"></span>
                                                                </div>
                                                            </div>
                    
                    
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </li>
                                <li class="accordion-item">
                                    <a href="" class="item-link item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Configure Git Provider(s)</div>
                                        </div>
                                    </a>
                                    <div class="accordion-item-content">

                                        <div class="card">
                                            <div class="card-content card-content-padding">
                        
                                                <div class="list">
                        
                                                    <ul>
                                                        <li>
                                                            <div class="item-content item-input">
                                                                <div class="item-inner">
                                                                    <div class="item-title item-label">Default Git Provider</div>
                                                                    <div class="item-input-wrap">
                                                                        <select @change="${d}" class="value-input" name="gitProvider">     
                                                                            
                                                                            ${o?.defaultGitProvider&&"github"!=o?.defaultGitProvider?t`
                                                                                <option value="github">GitHub</option>
                                                                            `:t`
                                                                                <option value="github" selected>GitHub</option>
                                                                            `}
                        
                        
                                                                            ${"gitlab"==o?.defaultGitProvider?t`
                                                                                <option value="gitlab" selected>GitLab</option>
                                                                            `:t`
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
                                            <div class="card-content">
                                                <div class="list accordion-list">
                                                    <ul>
                                                        <li class="accordion-item">
                                                            <a href="" class="item-link item-content">
                                                                <div class="item-inner">
                                                                    <div class="item-title">Configure GitHub</div>
                                                                </div>
                                                            </a>
                                                            <div class="accordion-item-content">
                    
                                                                <div class="block block-strong block-outline">
                    
                                                                    <strong>GitHub Instructions</strong>
                        
                                                                    <ol>
                                                                        <li>Create a <a href="http://github.com" class="external" target="_blank">GitHub</a> account.</li>
                                                                        <li>Create a <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic" class="external" target="_blank">"Personal access token (classic)"</a> and 
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
                                                                                                value="${o.gitProviders?.github?.username}"  />
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
                                                                                                value="${o.gitProviders?.github?.personalAccessToken}"  />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            
                                                                        </ul>
                                                                    </div>
                                                                </div>
                    
                                                            </div>
                                                        </li>
                                                        <li class="accordion-item">
                                                            <a href="" class="item-link item-content">
                                                                <div class="item-inner">
                                                                    <div class="item-title">Configure GitLab</div>
                                                                </div>
                                                            </a>
                                                            <div class="accordion-item-content">
                    
                                                                <div class="block block-strong block-outline">
                    
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
                                                                                                value="${o.gitProviders?.gitlab?.username}"  />
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
                                                                                                value="${o.gitProviders?.gitlab?.personalAccessToken}"  />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            
                                                                        </ul>
                                                                    </div>
                                                                </div>
                    
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </li>
                                <li class="accordion-item">
                                    <a href="" class="item-link item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Configure IPFS</div>
                                        </div>
                                    </a>
                                    <div class="accordion-item-content">

                                        <div class="card">
                                            <div class="card-header">Remote IPFS API</div>
                                            <div class="card-content">
                                                <div class="list">
                                                    <ul>
                                                        <li class="item-content item-input item-input-with-info">
                    
                                                            <div class="item-inner">
                                                                <div class="item-title item-label">URL</div>
                                                                <div class="item-input-wrap">
                                                                    <input type="text" name="ipfsHost" value="${o?.ipfsHost}" placeholder="Example: https://localhost:5001/api/v0" />
                                                                    <span class="input-clear-button"></span>
                                                                    <!-- element with additional information -->
                                                                    <div class="item-input-info">Note: Must be https:// unless you are running Large locally.</div>
                                                                </div>
                                                            </div>
                    
                    
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </li>
                                <li class="accordion-item">
                                    <a href="" class="item-link item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Configure Ethereum connection.</div>
                                        </div>
                                    </a>
                                    <div class="accordion-item-content">

                                        <div class="block">
                                            Large can create a masked/secret variable on the collection's git provider that allows the sync job to run and collection live transaction data. (alpha)
                                        </div>
                    
                                        <div class="card">
                                            <div class="card-header">Alchemy (Ethereum Provider)</div>
                                            <div class="card-content">
                    
                                                <div class="list">
                                                    <ul>
                                                        <li class="item-content item-input">
                    
                                                            <div class="item-inner">
                                                                <div class="item-title item-label">Enter your <a href="https://www.alchemy.com/" class="external" target="_blank">Alchemy</a> API key</div>
                                                                <div class="item-input-wrap">
                                                                    <input type="text" name="alchemyKey" value="${o?.alchemyKey}" placeholder="API key..." />
                                                                    <span class="input-clear-button"></span>
                                                                </div>
                                                            </div>
                    
                    
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </li>
                            </ul>
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
                `:t` `}

            </div>

        </div>

    </div>

`}}Hn([oa("/admin/:channelId/author/show/:id"),qn("design:type",Function),qn("design:paramtypes",[]),qn("design:returntype",Promise)],Gn.prototype,"show",null),Hn([oa("/admin/:channelId/author/edit/:id"),qn("design:type",Function),qn("design:paramtypes",[]),qn("design:returntype",Promise)],Gn.prototype,"edit",null),Gn=Hn([(0,s.b)(),qn("design:paramtypes",[Wi,Le])],Gn),zn.id="2570e0a982",zn.style="\n\n\n";const Jn=zn;var Wn=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Zn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Vn=class{settingsService;constructor(e){this.settingsService=e}async show(){return new sa((async e=>{}),Jn)}};function Kn(e,{$:t,$on:i,$f7:a,$update:s}){let o=n.getInstance(f),r=n.getInstance(Si),c=e.peers,l=e.peerCount,d=e.addresses,p=[{text:"Home",path:"/"},{text:"IPFS"}];const u=async e=>{console.log("Add peer submit"),document.getElementById("peerAddressInput").setCustomValidity("");let t=document.getElementById("peerAddressInput").value;if(t)try{await r.ipfs.swarm.connect(t),o.showPopup(`Successfully connected to peer ${t}`),console.log("Connected to peer")}catch(e){o.showExceptionPopup(e)}};return t(document).on("update-peers",(async e=>{c=e.detail.peers,l=e.detail.count,d=e.detail.addresses,s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="connect">

        <${ca} breadcrumbs=${p}  />


        <div class="page-content hide-toolbar-on-scroll">

            <div class="row">
                <div class="col-100 tablet-50 center">

                    <div class="block-title">IPFS Addresses
                    </div>
                    <div class="block list media-list peer-list">
                        <ul>
                            ${d?.map((e=>t`
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-subtitle no-wrap">
                                            ${e}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            `))}
                        </ul>
                    </div>

                    <div class="block-title">IPFS Peers <span class="badge peers-badge color-blue">${l}</span>
                    </div>
                    <div class="block list media-list peer-list">
                        <ul>
                            ${c?.map((e=>t`
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-subtitle no-wrap">
                                            ${e}
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
                                            <button class="button button-fill text-color-black" value="Add Peer" @click=${u}>Add Peer</button>
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

`}}Wn([oa("/admin/settings"),Zn("design:type",Function),Zn("design:paramtypes",[]),Zn("design:returntype",Promise)],Vn.prototype,"show",null),Vn=Wn([(0,s.b)(),Zn("design:paramtypes",[Et])],Vn),Kn.id="bde214f66e";const Yn=Kn;var Qn=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Xn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let es=class{ipfsService;constructor(e){this.ipfsService=e}async show(){return new sa((async e=>{if(!this.ipfsService.ipfs)return{};let t=await this.ipfsService.ipfs.swarm.peers(),i=await this.ipfsService.ipfs.id();return{peers:t.map((e=>e.addr.toString())),peerCount:t.length,addresses:i?.addresses?.map((e=>e.toString()))}}),Yn)}};function ts(e,{$:t,$h:i,$on:a,$f7:s,$update:o}){let r,c=e.channelViewModel,l=[{text:"Home",path:"/"},{text:c.channel.title,path:`/admin/channel/show/${c.channel._id}`},{text:"Publish"}];return a("pageInit",(async(e,t)=>{r=n.getWalletService(),await o()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">
  
      <${ca} breadcrumbs=${l}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        <div class="fixed-width-content center">

          ${c.itemCount>0?t`
          
            <div class="block-title block-title-medium">Configure Git</div>
            <div class="block list media-list">
              <ul>
                <li>
                  <a href="/admin/publish/fork-reader/${c.channel._id}" class="item-link">
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
                          
                            ${c?.gitProvider?t`
                              <strong>Provider:</strong>  ${c?.gitProvider.name} <br />
                            `:t` `}
  
                            ${c.channel.httpUrlToRepo?t`
                              <strong>Repository:</strong>  ${c.channel.httpUrlToRepo}
                            `:t` `}
  
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
                  <a href="/admin/publish/export/${c.channel._id}" class="item-link">
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
  
            ${r?.address?t`
              
              <div class="block list media-list">
                <ul>
                  <li>
                    <a href="/admin/publish/contract/${c.channel._id}" class="item-link">
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
  
            `:t`
              <div class="block-header">
                Note: Use a web browser with wallet support to deploy an ERC-721 smart contract.
              </div>
            `}

  
  
          `:t`
            <div class="card">
              <div class="card-content card-content-padding">
                <p>Add NFTs to the collection before publishing.</p>
              </div>
            </div>
            
          `}


        </div>


        


      </div>
  
    </div>
  
  `}}Qn([oa("/admin/connect"),Xn("design:type",Function),Xn("design:paramtypes",[]),Xn("design:returntype",Promise)],es.prototype,"show",null),es=Qn([(0,s.b)(),Xn("design:paramtypes",[Si])],es),ts.id="7db8c6dfb3";const is=ts;var as=i(27484),ns=i.n(as);function ss(e,{$:t,$h:i,$on:a,$f7:s,$update:o}){let r,c=n.getInstance(vi),l=(n.getInstance(Si),n.getInstance(Ve),n.getInstance(ea),n.getInstance(_n)),f=e.channelViewModel,d=e.settings,p=!1,u=!1,h="",g=!1,m="pending"==f?.channel.publishReaderIPFSStatus?.status,v=f.itemCount>0,b=f?.gitProvider?.personalAccessToken?.length>0,y=f?.channel?.httpUrlToRepo?.length>0,w=v&&b&&y,S=[{text:"Home",path:"/"},{text:f.channel.title,path:`/admin/channel/show/${f.channel._id}`},{text:"Publish",path:`/admin/publish/${f.channel._id}`},{text:"Export"}];a("pageInit",(async()=>{g=!1,await o(),await k()})),a("pageAfterOut",((e,t)=>{console.log("Unloading page"),g=!0}));const $=async e=>{e.preventDefault();s.form.convertToData("#export-form");p=!0,await o();let t=document.getElementsByClassName("publish-label")[0];s.preloader.showIn(t);try{let e=await l.deployReader(f.channel);f.channel.publishReaderIPFSStatus={status:"pending",headSha:e},console.log(f.channel.publishReaderIPFSStatus),await c.put(f.channel)}catch(e){console.log(e),s.dialog.alert(e.message,"There was an error")}s.preloader.hideIn(t),p=!1,m=!0,await k(),await o()};t(document).on("publish-progress",(async e=>{e.detail.message&&(h=`<p>${e.detail.message}</p>`),r=e.detail.publishStatus,o();let i=document.getElementById("ipfs-publish-process");i&&t(i).scrollTop(i.scrollHeight)}));const k=async e=>{if(g)return;if(!d)return;if("complete"==f.channel.publishReaderIPFSStatus?.status)return;if(p)return;if(u)return;let t=await c.getGitProviderCredentials(f.channel,d);if(t&&t.personalAccessToken&&!(t.personalAccessToken.length<1)){console.log("Checking IPFS action workflow status..."),u=!0;try{if(f.channel=await c.get(f.channel._id),"finished"==await l.getIPFSActionStatus(f.channel)){f.channel.contractAddress||(f.channel.publishReaderIPFSStatus=await l.getIPFSActionResult(f.channel)),f.channel.publishReaderIPFSStatus.status="complete",await c.put(f.channel),await o();let e=document.getElementsByClassName("content-card-padding")[0];s.preloader.hideIn(e)}}catch(e){console.log(e)}await o(),u=!1,"complete"!=f.channel.publishReaderIPFSStatus?.status&&setTimeout(k,5e3)}};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">

        <${ca} breadcrumbs=${S}  />

        <div class="page-content hide-toolbar-on-scroll">

            <div class="fixed-width-content center">
                ${w?t`

                    <form @submit="${$}" id="export-form">
    
    
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
                                <strong>Provider:</strong>  ${f?.gitProvider.name} <br />
                                <strong>Repository:</strong>   <a href="${f.channel.httpUrlToRepo}" class="link external" target="_blank">${f.channel.httpUrlToRepo}</a><br />
                                <strong>Branch:</strong>   ${f.channel.publishReaderRepoBranch}
                            </div>
                        </div>
        
    
                        <div class="card card-header-divider">
                            <div class="card-header">Export Status</div>
                            <div class="card-content card-content-padding">      

                                ${p?t`
                                    <div class="publish-label">
                                        Exporting...
                                    </div>
    
                                    ${r?t`
    
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
                                                    <tr class="${r.images.saved==r.images.total&&r.images.total>0?"complete":""}">
                                                        <td class="label-cell">Images</td>
                                                        <td class="numeric-cell">${r.images.saved}</td>
                                                        <td class="numeric-cell">${r.images.total}</td>
                                                    </tr>
                                                    <tr class="${r.animations.saved==r.animations.total&&r.animations.total>0?"complete":""}">
                                                        <td class="label-cell">Animations</td>
                                                        <td class="numeric-cell">${r.animations.saved}</td>
                                                        <td class="numeric-cell">${r.animations.total}</td>
                                                    </tr>
                                                    <tr class="${r.nftMetadata.saved==r.nftMetadata.total&&r.nftMetadata.total>0?"complete":""}">
                                                        <td class="label-cell">NFT Metadata</td>
                                                        <td class="numeric-cell">${r.nftMetadata.saved}</td>
                                                        <td class="numeric-cell">${r.nftMetadata.total}</td>
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
                                                    <tr class="${r.contractMetadata.saved==r.contractMetadata.total&&r.contractMetadata.total>0?"complete":""}">
                                                        <td class="label-cell">Contract Metadata</td>
                                                        <td class="numeric-cell">${r.contractMetadata.total}</td>
                                                    </tr>
                                                    <tr class="${r.backups.items.saved==r.backups.items.total&&r.backups.items.total>0?"complete":""}">
                                                        <td class="label-cell">Items</td>
                                                        <td class="numeric-cell">${r.backups.items.total}</td>
                                                    </tr>
                                                    <tr class="${r.backups.images.saved==r.backups.images.total&&r.backups.images.total>0?"complete":""}">
                                                        <td class="label-cell">Image Metadata</td>
                                                        <td class="numeric-cell">${r.backups.images.total}</td>
                                                    </tr>
                                                    <tr class="${r.backups.animations.saved==r.backups.animations.total&&r.backups.animations.total>0?"complete":""}">
                                                        <td class="label-cell">Animations Metadata</td>
                                                        <td class="numeric-cell">${r.backups.animations.total}</td>
                                                    </tr>
                                                    <tr class="${r.backups.themes.saved==r.backups.themes.total&&r.backups.themes.total>0?"complete":""}">
                                                        <td class="label-cell">Themes</td>
                                                        <td class="numeric-cell">${r.backups.themes.total}</td>
                                                    </tr>
                                                    <tr class="${r.backups.staticPages.saved==r.backups.staticPages.total&&r.backups.staticPages.total>0?"complete":""}">
                                                        <td class="label-cell">Static Pages</td>
                                                        <td class="numeric-cell">${r.backups.staticPages.total}</td>
                                                    </tr>
                                                    <tr class="${r.backups.channels.saved==r.backups.channels.total&&r.backups.channels.total>0?"complete":""}">
                                                        <td class="label-cell">Channels</td>
                                                        <td class="numeric-cell">${r.backups.channels.total}</td>
                                                    </tr>
    
                                                    ${r.backups.authors.total?t`
    
                                                        <tr class="${r.backups.authors.saved==r.backups.authors.total&&r.backups.authors.total>0?"complete":""}">
                                                            <td class="label-cell">Authors</td>
                                                            <td class="numeric-cell">${r.backups.authors.total}</td>
                                                        </tr>
                                                    `:t`<span/>`}
    
    
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
    
                                        <div class="publish-status"></div>
    
                                    `:t`<span />`}
    
                                `:t`
                                    <div class="publish-label" style="display:none;"></div>
                                `}
    
                                ${h?t`
                                    <div class="publish-output" innerHTML="${h}" id="ipfs-publish-process" ></div>
                                `:t`
                                    <div class="publish-output" style="display:none;"></div>
                                `}
    
    
                                ${f.channel.publishReaderIPFSStatus?.status?t`
    
                                    <div class="pin-status"> 
                                        <strong>Build Status:</strong> ${f.channel.publishReaderIPFSStatus?.status}<br />

                                        ${"complete"==f.channel.publishReaderIPFSStatus?.status&&f.channel.publishReaderIPFSStatus?.cid?t`
                                            <strong>IPFS cid:</strong> ${f.channel.publishReaderIPFSStatus?.cid}<br />
                                            <strong>Archive:</strong> <a href="${f.channel.publishReaderIPFSStatus?.archive}" class="link external">${f.channel.publishReaderIPFSStatus?.archive}</a><br />
                                            <strong>Date:</strong> ${ns()(f.channel.publishReaderIPFSStatus?.date).format("MMMM DD YYYY, h:mm:ss a")}
                                        `:t` `}

                                    </div>
    
                                `:t`<span />`}
    
    
                                ${p?t`
                                    <p></p>
                                `:t`
    
                                    
                                    ${m?t`
        
                                        <button type="submit" class="button button-fill button-small color-gray text-color-white deploy-button">
                                            <i class="material-icons">refresh</i> Export Again
                                        </button>
    
    
                                    `:t`
    
                                        ${p?t`<span />`:t`
                                            <button type="submit" class="button button-fill button-small deploy-button" >Export</button>
                                        `}  
    
                                    `}
                                    
                                `}
                            </div>
                        </div>
    
                    </form>
    
                `:t`
    
                    ${v?t` `:t`
                
                        <div class="card">
                        <div class="card-content card-content-padding">
                            <p>Add NFTs to the collection before publishing.</p>
                        </div>
                        </div>
        
                    `}
        
                    ${b?t` 
                    
                        ${y?t` `:t`
                            
                            <div class="card">
                            <div class="card-content card-content-padding">
                                <p>Create/connect a <a href="/admin/publish/fork-reader/${f.channel._id}">git repo</a> to begin export.</p>
                            </div>
                            </div>
            
                        `}
                    
                    `:t`
                        
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

`}}ss.id="d188495294",ss.style="\n    .deploy-button {\n        margin-top: 10px;\n        width: 200px;\n    }\n\n    .publish-label,\n    .ipfs-label,\n    .forking-label {\n        margin-top: 10px;\n        margin-bottom: 10px;\n        font-weight: bold;\n        font-size: 18px;\n    }\n\n    .publish-output {\n        border: 1px solid #cccccc;\n        font-size: 13px;\n        width: 100%;\n        max-width: 100%;\n        padding: 5px;\n        height: 100px;\n        overflow-y: scroll;\n    }\n\n    .publish-status {\n        font-size: 14px;\n        padding: 10px;\n        border: 1px solid #f1f1f1;\n    }\n\n    .publish-status .item label {\n        font-weight: bold;\n        display: inline-block;\n        width: 180px;\n    }\n\n    /* #export-refresh-button {\n        width: 45px;\n        height: 30px;\n        display: inline-block;\n        margin-left: 5px;\n        padding-top: 2.5px;\n    } */\n\n    #export-next-button {\n        width: 200px;\n        float: right;\n    }\n\n";const os=ss;function rs(e,{$:t,$h:i,$on:a,$f7:s,$update:o}){let r=n.getInstance(vi),c=(n.getInstance(Si),n.getInstance(Ve),n.getInstance(_n)),l=e.channelViewModel,f=e.settings,d=!1,p=!1,u=l.itemCount>0,h=l?.gitProvider?.personalAccessToken?.length>0,g=u&&h,m=[{text:"Home",path:"/"},{text:l.channel.title,path:`/admin/channel/show/${l.channel._id}`},{text:"Publish",path:`/admin/publish/${l.channel._id}`},{text:"Create Git Repository"}];a("pageInit",(async()=>{d=!1,await o(),await b()})),a("pageAfterOut",((e,t)=>{console.log("Unloading page"),d=!0}));const v=async e=>{e.preventDefault(),p=!0,await o();let t,i=document.getElementsByClassName("content-card-padding")[0];s.preloader.showIn(i);try{t=await c.createFork(l.channel),l.channel.publishReaderRepoId=t.id,l.channel.publishReaderRepoPath=t.path,l.channel.publishReaderRepoBranch=t.branch,l.channel.publishReaderRepoStatus="pending",await r.put(l.channel)}catch(e){s.preloader.hideIn(i),console.log(e),"Error: Request failed with status code 409"==e.toString()?s.dialog.alert("Git repo already exists with that name.","There was an error"):s.dialog.alert(e,"There was an error")}p=!1,await o(),await b()},b=async e=>{if(d)return;if(!f)return;if("complete"==l.channel.publishReaderRepoStatus&&l.channel.publishReaderRepoId>0)return;if(p)return;let t=await r.getGitProviderCredentials(l.channel,f);if(t&&t.personalAccessToken&&!(t.personalAccessToken.length<1)){console.log("Checking repo fork status...");try{if(l.channel=await r.get(l.channel._id),"finished"==await c.getForkRepoStatus(l.channel)){let e=await c.getExistingFork(l.channel);l.channel.publishReaderRepoStatus="complete",l.channel.httpUrlToRepo=e.httpUrlToRepo,await r.put(l.channel);let t=document.getElementsByClassName("content-card-padding")[0];s.preloader.hideIn(t)}}catch(e){console.log(e)}await o(),"complete"!=l.channel.publishReaderRepoStatus&&setTimeout(b,5e3)}};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="publish">

    <${ca} breadcrumbs=${m}  />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        ${g?t`

          <div class="block-title">Create/Connect Git Repository</div>
          <div class="card">
  
            <div class="card-content card-content-padding">
              <form id="fork-reader" @submit="${v}">
  
                ${p?t`
                  <div class="forking-label">
                    Forking...
                  </div>
  
                  <div class="preloader"></div>
  
                `:t`
  
  
                  <div class="forking-label" style="display:none;"></div>
  
  
                  ${l.channel.publishReaderRepoId?t`
                    <div class="repo-status">
  
                      <p><strong>Current Repo:</strong> ${l.channel.httpUrlToRepo?t`
                        <a href="${l.channel.httpUrlToRepo}" class="link external" target="_blank">${l.channel.httpUrlToRepo}</a>
                        `:t` `}</p>
  
                      <p><strong>Configured Provider:</strong> ${l?.gitProvider?.name}</p>
  
                      <p><strong>Repo ID:</strong> ${l.channel.publishReaderRepoId}</p>
                      <p><strong>Branch:</strong>   ${l.channel.publishReaderRepoBranch}</p>
                      <p><strong>Repo Path:</strong> ${l.channel.publishReaderRepoPath}</p>
                      <p><strong>Job Status:</strong> ${l.channel.publishReaderRepoStatus}</p>
                    </div>
                  `:t`<span />`}
  
  
  
                  <div class="block cancel-save-row">
        
                    <div class="large-only"></div>
      
                    <a href="/admin/publish/${l.channel._id}" class="button button-outline color-gray" tabindex="30">
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
  
        `:t`
  
            ${u?t` `:t`
                
              <div class="card">
                <div class="card-content card-content-padding">
                  <p>Add NFTs to the collection before publishing.</p>
                </div>
              </div>
  
            `}
  
            ${h?t` `:t`
              
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

`}}rs.id="4502b567ea",rs.style="\n  .publish-label,\n  .ipfs-label,\n  .forking-label {\n    margin-top: 10px;\n    margin-bottom: 10px;\n    font-weight: bold;\n    font-size: 18px;\n  }\n\n  .publish-output {\n    border: 1px solid #cccccc;\n    font-size: 13px;\n    width: 100%;\n    max-width: 100%;\n    padding: 5px;\n    height: 300px;\n    overflow-y: scroll;\n  }\n\n  #fork-next-button {\n    width: 200px;\n  }\n";const cs=rs;var ls=i(76551),fs=i.n(ls),ds=i(26470),ps=i.n(ds),us=i(26015),hs=i(48764).Buffer,gs=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ms=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},vs=function(e,t){return function(i,a){t(i,a,e)}};let bs=class{channelService;itemService;ipfsService;imageService;animationService;exportService;settingsService;walletService;constructor(e,t,i,a,n,s,o,r){this.channelService=e,this.itemService=t,this.ipfsService=i,this.imageService=a,this.animationService=n,this.exportService=s,this.settingsService=o,this.walletService=r}async publish(e,t){this.logPublishProgress(void 0,"Preparing export...");let i=await this.exportService.prepareExport(e,this.walletService.address),a=await this.getFeeReceipient(i.channel,i.ownerAddress);a&&this.logPublishProgress(void 0,`Fee Recipient: ${a}`),this.logPublishProgress(void 0,"Preparing backup...");let n,s=await this.exportService.createBackup(i);return e.contractAddress?e.publishReaderIPFSStatus?.cid&&(n={cid:e.publishReaderIPFSStatus.cid}):(this.logPublishProgress(void 0,"Exporting to IPFS..."),n=await this.exportToIPFS(i,s,a)),this.logPublishProgress(void 0,"Exporting to file system..."),await this.exportToFS(t,e,i,s,a),{cids:n}}async exportToIPFS(e,t,i){let a=!0,n=this.getIPFSDirectory(e.channel);try{await this.ipfsService.ipfs.files.read(n),await this.ipfsService.ipfs.files.rm(n,{recursive:!0,flush:!0})}catch(e){}let s={contractMetadata:{saved:0,total:1},nftMetadata:{saved:0,total:e.items.length},images:{saved:0,total:e.imageCids.length},animations:{saved:0,total:e.animationCids.length},backups:{channels:{saved:0,total:1},authors:{saved:0,total:1},items:{saved:0,total:t.itemCount},images:{saved:0,total:e.imageCids.length},animations:{saved:0,total:e.animationCids.length},themes:{saved:0,total:t.themeCount},staticPages:{saved:0,total:t.staticPageCount}}};this.logPublishProgress(s),await this._publishImagesIPFS(s,n,e.imageCids,!0),await this._publishAnimationsIPFS(s,n,e.animationCids,!0),await this._publishNFTMetadataIPFS(s,n,e.channel,e.items,!0);let o=`${n}/contractMetadata.json`,r=await this.channelService.exportContractMetadata(e.channel,i);await this.ipfsService.ipfs.files.write(o,(new TextEncoder).encode(JSON.stringify(r)),{create:!0,parents:!0,flush:a});let c=await this.ipfsService.ipfs.files.stat(o);s.contractMetadata.saved=1,this.logPublishProgress(s,`Saving contract metadata to ${o} (${c.cid})`),await this.ipfsService.ipfs.files.write(`${n}/backup/channels.json`,(new TextEncoder).encode(JSON.stringify(t.channels)),{create:!0,parents:!0,flush:a}),s.backups.channels.saved=1,this.logPublishProgress(s),await this.ipfsService.ipfs.files.write(`${n}/backup/authors.json`,(new TextEncoder).encode(JSON.stringify(t.authors)),{create:!0,parents:!0,flush:a}),s.backups.authors.saved=1,this.logPublishProgress(s),await this.ipfsService.ipfs.files.write(`${n}/backup/items.json`,(new TextEncoder).encode(JSON.stringify(t.items)),{create:!0,parents:!0,flush:a}),s.backups.items.saved=t.itemCount,this.logPublishProgress(s),await this.ipfsService.ipfs.files.write(`${n}/backup/originalMetadata.json`,(new TextEncoder).encode(JSON.stringify(t.originalMetadata)),{create:!0,parents:!0,flush:a}),await this.ipfsService.ipfs.files.write(`${n}/backup/images.json`,(new TextEncoder).encode(JSON.stringify(t.images)),{create:!0,parents:!0,flush:a}),s.backups.images.saved=t.imageCount,this.logPublishProgress(s),await this.ipfsService.ipfs.files.write(`${n}/backup/animations.json`,(new TextEncoder).encode(JSON.stringify(t.animations)),{create:!0,parents:!0,flush:a}),s.backups.animations.saved=t.animationCount,this.logPublishProgress(s),await this.ipfsService.ipfs.files.write(`${n}/backup/themes.json`,(new TextEncoder).encode(JSON.stringify(t.themes)),{create:!0,parents:!0,flush:a}),s.backups.themes.saved=t.themeCount,this.logPublishProgress(s),await this.ipfsService.ipfs.files.write(`${n}/backup/static-pages.json`,(new TextEncoder).encode(JSON.stringify(t.staticPages)),{create:!0,parents:!0,flush:a}),s.backups.staticPages.saved=t.staticPageCount,this.logPublishProgress(s),this.logPublishProgress(s,"Flushing to IPFS..."),await this.ipfsService.ipfs.files.flush(`/export/${e.channel._id}/`);let l=await this.ipfsService.ipfs.files.stat(`/export/${e.channel._id}/`,{hash:!0});return this.logPublishProgress(s,`Published to local IPFS at ${l.cid.toString()}`),{cid:l.cid.toString()}}async exportToFS(e,t,i,a,n){await this._publishImagesFS(e,i.imageCids),await this._publishAnimationsFS(e,i.animationCids),await this._publishNFTMetadataFS(e,i.channel,i.items);let s=await this.channelService.exportContractMetadata(i.channel,n);await this._writeFSAction({file_path:`${e}/backup/export/contractMetadata.json`,content:hs.from(JSON.stringify(s))}),t.contractAddress?(await this._writeFSAction({file_path:`${e}/backup/contract/contract.json`,content:hs.from(JSON.stringify({contractAddress:t.contractAddress,ipfsCid:t.publishReaderIPFSStatus?.cid}))}),await this._writeFSAction({file_path:`${e}/backup/contract/contract-abi.json`,content:hs.from(JSON.stringify(us))})):(await this._writeFSAction({file_path:`${e}/backup/contract/contract.json`,content:hs.from(JSON.stringify({}))}),await this._writeFSAction({file_path:`${e}/backup/contract/contract-abi.json`,content:hs.from(JSON.stringify({}))}));let o=await this.getProductionURIInfo(t),r={showMintPage:t.showMintPage,showActivityPage:t.showActivityPage,hostname:t.productionHostname?t.productionHostname:o?.hostname,libraryURL:t.productionBaseLibraryURI,baseURL:t.productionBaseURI?t.productionBaseURI:o?.baseURI,externalLinks:t.externalLinks,marketplaces:t.marketplaces};await this._writeFSAction({file_path:`${e}/large-config.json`,content:hs.from(JSON.stringify(r))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/channels.json`,content:hs.from(JSON.stringify(a.channels))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/authors.json`,content:hs.from(JSON.stringify(a.authors))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/items.json`,content:hs.from(JSON.stringify(a.items))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/originalMetadata.json`,content:hs.from(JSON.stringify(a.originalMetadata))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/images.json`,content:hs.from(JSON.stringify(a.images))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/animations.json`,content:hs.from(JSON.stringify(a.animations))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/themes.json`,content:hs.from(JSON.stringify(a.themes))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/static-pages.json`,content:hs.from(JSON.stringify(a.staticPages))})}getIPFSDirectory(e){return`/export/${e._id}`}async getAnimationDirectoryCid(e){let t;try{t=(await this.ipfsService.ipfs.files.stat(`${e}/animations/`,{hash:!0})).cid.toString()}catch(e){}return t}async getImageDirectoryCid(e){let t;try{t=(await this.ipfsService.ipfs.files.stat(`${e}/images/`,{hash:!0})).cid.toString()}catch(e){}return t}async getFeeReceipient(e,t){let i;return"existing"==e.forkType?e.forkedFromFeeRecipient&&(i=e.forkedFromFeeRecipient):i=t,i}async _publishAnimationsIPFS(e,t,i,a){this.logPublishProgress(e,`Exporting ${i.length} animations`);for(let n of i){let i,s=await this.animationService.get(n),o=`${t}/animations/${s.cid}.html`,r={content:s.content};try{i=await this.ipfsService.ipfs.files.stat(o,{hash:!0})}catch(e){}if(i?.cid.toString())this.logPublishProgress(e,`${o} already exists. Skipping...`);else{const i=await this.ipfsService.ipfs.add(r);if(await this.ipfsService.ipfs.files.cp(`/ipfs/${i.cid.toString()}`,o,{parents:!0,flush:a}),i.cid.toString()!==s.cid.toString())throw new Error(`Incorrect cid when saving animation. Expected: ${s.cid}, Result: ${i.cid.toString()}`);this.logPublishProgress(e,`Saving animation #${e.animations.saved} to ${t}/animations/${s.cid}.html (${s.cid})`)}e.animations.saved++}}async _publishAnimationsFS(e,t){for(let i of t){let t=await this.animationService.get(i),a={content:t.content};await this._writeFSAction({file_path:`${e}/backup/export/animations/${t.cid}.html`,content:hs.from(a.content)})}}async _publishImagesIPFS(e,t,i,a){for(let n of i){let i,s=await this.imageService.get(n),o=`${t}/images/${s.cid}.${s.buffer?"jpg":"svg"}`;try{i=await this.ipfsService.ipfs.files.stat(o,{hash:!0})}catch(e){}if(i?.cid.toString())this.logPublishProgress(e,`${o} already exists. Skipping...`);else{const t=await this.ipfsService.ipfs.add({content:await this.imageService.getImageContent(s)});if(t.cid.toString()!=s.cid)throw new Error(`Incorrect cid when saving image. Expected: ${s.cid}, Result: ${t.cid.toString()}`);await this.ipfsService.ipfs.files.cp(`/ipfs/${t.cid.toString()}`,o,{create:!0,parents:!0,flush:a}),this.logPublishProgress(e,`Saving image to ${o} (${s.cid})`)}e.images.saved++}}async _publishImagesFS(e,t){for(let i of t){let t=await this.imageService.get(i),a=await this.imageService.getImageContent(t);await this._writeFSAction({file_path:`${e}/backup/export/images/${t.cid}.${t.buffer?"jpg":"svg"}`,content:a})}}async _publishNFTMetadataIPFS(e,t,i,a,n){this.logPublishProgress(e,`Exporting ${a.length} metadata files`);let s={};for(let o of a){let a,r=this.exportService.prepareItem(o),c=`${t}/metadata/${r.tokenId}.json`,l=await this.imageService.get(r.coverImageId),f=await this.itemService.exportNFTMetadata(i,r,l),d=(new TextEncoder).encode(JSON.stringify(f)),p=await bt.of(d);s[p]=f;try{a=await this.ipfsService.ipfs.files.stat(c,{hash:!0})}catch(e){}if(a?.cid.toString()!=p){const e=await this.ipfsService.ipfs.add({content:d});await this.ipfsService.ipfs.files.cp(`/ipfs/${e.cid.toString()}`,c,{create:!0,parents:!0,flush:n})}else this.logPublishProgress(e,`${c} already exists. Skipping...`);e.nftMetadata.saved++,this.logPublishProgress(e,`Saving #${r.tokenId} to ${c}`)}return[]}async _publishNFTMetadataFS(e,t,i){for(let a of i){let i=this.exportService.prepareItem(a),n=await this.imageService.get(i.coverImageId),s=await this.itemService.exportNFTMetadata(t,i,n);await this._writeFSAction({file_path:`${e}/backup/export/metadata/${i.tokenId}.json`,content:hs.from(JSON.stringify(s))})}}async getProductionURIInfo(e){let t,i=await this.settingsService.get();switch(t=e.gitProvider&&"default"!=e.gitProvider?e.gitProvider:i.defaultGitProvider?i.defaultGitProvider:"github",t){case"gitlab":if(!e.httpUrlToRepo)return;return{hostname:`https://${a=e.httpUrlToRepo,a.replace("https://gitlab.com/","").split("/")[0]}.gitlab.io`,baseURI:`/${e.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}/`};case"github":function n(e){return e.replace("https://github.com/","").split("/")[0]}if(!e.httpUrlToRepo)return;return{hostname:`https://${n(e.httpUrlToRepo)}.github.io`,baseURI:`/${e.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}/`}}var a}_writeFSAction(e){fs().existsSync(ps().dirname(e.file_path))||fs().mkdirSync(ps().dirname(e.file_path),{recursive:!0}),e.keepExisting&&fs().existsSync(e.file_path)||(console.log(`Writing file: ${e.file_path}`),fs().writeFileSync(e.file_path,e.content))}logPublishProgress(e,t){if(t&&console.log(t),"undefined"!=typeof window&&void 0!==window.document){const i=new CustomEvent("publish-progress",{detail:{publishStatus:e,message:t}});document.dispatchEvent(i)}}};function ys(e,{$:t,$h:i,$on:a,$f7:s,$update:o}){let r,c=n.getInstance(vi),l=n.getInstance(Si),f=(n.getInstance(Ve),n.getInstance(ea),n.getInstance(_n)),d=(n.getInstance(bs),null!=l.ipfs),p=l.peerCount,u=e.channelViewModel,h=e.settings,g=!1,m="",v=u.channel.publishReaderRepoId>0&&"complete"==u.channel.publishReaderRepoStatus,b=null!=u.channel.localCid,y=u.itemCount>0,w=u?.gitProvider?.personalAccessToken?.length>0,S=h?.gitCorsProxy?.length>0,$=y&&w&&S,k=u.channel.httpUrlToRepo,I=[{text:"Home",path:"/"},{text:u.channel.title,path:`/admin/channel/show/${u.channel._id}`},{text:"Publish",path:`/admin/publish/${u.channel._id}`},{text:"Publish Collection To Reader"}];a("pageInit",(async()=>{await l.init(),d=null!=l.ipfs,r=await c.getGitProviderCredentials(u.channel,h),await o()}));const R=async e=>{e.preventDefault(),g=!0,await o();let t=document.getElementsByClassName("ipfs-label")[0];s.preloader.showIn(t);try{let e=`/export/${u.channel._id}`,t=await(0,Da.Z)(l.ipfs.files.read(`${e}/contractMetadata.json`));await f.deployReaderGit(u.channel,t)}catch(e){console.log(e),s.dialog.alert(e,"There was an error")}s.preloader.hideIn(t),g=!1,await o()},_=async e=>{e.preventDefault();let t=document.getElementsByClassName("ipfs-label")[0];s.preloader.showIn(t);try{await f.clearGitRepos()}catch(e){s.dialog.alert(e,"There was an error")}s.preloader.hideIn(t),await o()};return t(document).on("publish-reader-progress",(async e=>{m=`<p>${e.detail.message}</p>`,o()})),t(document).on("update-peers",(async e=>{p=e.detail.count,o()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">
  
      <${ca} breadcrumbs=${I}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        ${$?t`
              
          <div class="block-title">Publish Reader</div>
          <div class="card">

            <div class="card-content card-content-padding">

              ${r?.personalAccessToken?.length>0?t`

                ${b?t`
                  
                  <form @submit="${R}">

                    ${d?t`
                        <div class="ipfs-label">
                            Status: <a href="/admin/connect">IPFS Ready</a>
                        </div>
                    `:t`
                      <div class="ipfs-label">IPFS Initializing...</div>
                    `}


                    ${u.channel.publishReaderRepoId>0?t`
                      <div class="repo-status">
                        <p><strong>Remote Repository:</strong> ${k}</p> <a href="#" class="link" @click="${_}">Clear local cache</a>
                        <!-- <p><strong>Gitlab Repo ID:</strong> ${u.channel.publishReaderRepoId}</p>
                        <p><strong>Gitlab Repo Path:</strong> ${u.channel.publishReaderRepoPath}</p>  
                        <p><strong>Fork Status:</strong> ${u.channel.publishReaderRepoStatus}</p>                                                                                                                                                               -->
                      </div>

                      ${v&&d?t`

                        ${u.channel.contractAddress?t`
                          <p>Reader will be configured to connect to: ${u.channel.contractAddress}</p>  
                        `:t`
                          <p>Note: Contract is not deployed. The reader will not attempt to connect to Ethereum.</p>  
                        `}

                        ${m?t`
                          <div class="publish-output" innerHTML="${m}"></div>
                        `:t`
                          <div class="publish-output" style="display:none;"></div>
                        `}


                        
                        <div class="block cancel-save-row">
      
                          <div class="large-only"></div>
            
                          <a href="/admin/publish/${u.channel._id}" class="button button-outline color-gray" tabindex="30">
                            Back to menu
                          </a>
        
                          ${g?t`

                            <a href="#" class="button button-outline">
                              Publishing...
                            </a>
                          `:t`
                            <button class="button button-fill" type="submit">Publish Reader</button>
                          `}

                        </div>


                    


                      `:t`
                        <p style="display:none;"></p>
                      `}

                    `:t``}



                  </form>                    
                `:t`
                  <p>Collection must be deployed to IPFS and you must fork the Large Reader before publishing.</p>  
                `}
                
              `:t`
                <p>Configure a <a href="/admin/settings">git provider</a> to deploy the collection reader.</p>
              `}


            </div>

          </div>

        `:t`

            ${y?t` `:t`
                    
              <div class="card">
                <div class="card-content card-content-padding">
                    <p>Add NFTs to the collection before publishing.</p>
                </div>
              </div>

          `}

          ${w?t` `:t`
              
              <div class="card">
                <div class="card-content card-content-padding">
                    <p>Configure a <a href="/admin/settings">git provider</a> to deploy the reader.</p>
                </div>
              </div>

          `}

          ${S?t` `:t`
              
              <div class="card">
                <div class="card-content card-content-padding">
                    <p>Configure a <a href="/admin/settings">git CORS proxy</a> to deploy the reader.</p>
                </div>
              </div>

          `}


          
        `}

      </div>
  
    </div>
  
  `}}bs=gs([(0,s.b)(),vs(7,(0,o.f)(a.WalletService)),ms("design:paramtypes",[vi,di,Si,Tt,Pi,ji,Et,Object])],bs),ys.id="065219d419",ys.style="\n\n    .publish-label, .ipfs-label, .forking-label {\n      margin-top: 10px;\n      margin-bottom: 10px;\n      font-weight: bold;\n      font-size: 18px;\n    }\n\n    .publish-output {\n      border: 1px solid #cccccc;\n      font-size: 13px;\n      width: 100%;\n      max-width: 100%;\n      padding: 5px;\n      height: 300px;\n      overflow-y : scroll;\n    }\n  ";const ws=ys;var Ss=i(41972),$s=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ks=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Is=function(e,t){return function(i,a){t(i,a,e)}};let Rs=class{channelService;walletService;contracts;constructor(e,t,i){this.channelService=e,this.walletService=t,this.contracts=i}async deployContract(e){if(!e.publishReaderIPFSStatus?.cid)throw new Error("Not published to IPFS");let t=await this.channelService.countItemsByChannel(e._id);if(t<=0)throw new Error("No NFTs");let i=ha.vz(e.mintPrice,"ether"),a=await this.deploy(e.title,e.symbol,e.publishReaderIPFSStatus?.cid,i.toString(),t);e.contractAddress=a.contractAddress,e.showActivityPage=!0,e.showMintPage=!0,await this.channelService.put(e)}async deploy(e,t,i,a,n){if(!(e&&t&&a&&n&&i))throw new Error("Missing inputs to deploy");let s=this.walletService.wallet;if(!s)throw new Error("No wallet!");const o=this.contracts.Channel,r=new Ss.l(o.abi,o.bytecode,s);return(await r.deploy(e,t,i,BigInt(a.toString()),BigInt(n.toString()))).deploymentTransaction().wait()}};function _s(e,{$:t,$h:i,$on:a,$f7:s,$update:o}){let r,c=n.getInstance(vi),l=(n.getInstance(Si),n.getInstance(Ve)),f=(n.getInstance(ea),n.getInstance(Rs)),d=e.channelViewModel,p=!1,u=null!=d.channel.publishReaderIPFSStatus?.cid||d.channel.contractAddress,h=[{text:"Home",path:"/"},{text:d.channel.title,path:`/admin/channel/show/${d.channel._id}`},{text:"Publish",path:`/admin/publish/${d.channel._id}`},{text:"Deploy Contract"}];a("pageInit",(async(e,t)=>{r=n.getWalletService(),await o()}));const g=async e=>{p=!0,await o();let t={title:`Deploying contract ${name}. Approve transaction and wait for it to be mined.`,promise:f.deployContract(d.channel)};await l.queuePromiseView(t),p=!1,await o()},m=async e=>{d.channel.contractAddress=void 0,await c.put(d.channel),d.channel=await c.get(d.channel._id),o()};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">
  
      <${ca} breadcrumbs=${h}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        <div class="fixed-width-content center">

          ${d.itemCount>0?t`
              
            ${r?.address?t`
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
  
                    ${u?t`
  
                      <div class="pin-status">
                        <p><strong>IPFS Hash:</strong> ${d.channel.publishReaderIPFSStatus?.cid}</p>
                        <p><strong>Date Exported:</strong> ${ns()(d.channel.publishReaderIPFSStatus?.date).format("MMMM DD YYYY, h:mm:ss a")}</p>
                      </div>
  
  
                      ${d.channel.contractAddress?t`
                        <p>
                          <strong>Current Contract Address:</strong> ${d.channel.contractAddress} 
                          <a @click="${m}" class="button button-fill button-small deploy-button">Reset</a>
                        </p> 
                      `:t`<span/>`}
  
  
                      ${p?t`
                        <p>Deploying...</p>
                      `:t`
                      
                        ${d.channel.contractAddress?t`
                          
                          <h1>Success!</h1>
                          
                          <p>
                            After deploying the contract re-export to the configured Git provider. The app will rebuild and it will become aware of Ethereum and show users the 
                            controls to begin minting NFTs if appropriate.
                          </p>
                          <a class="button button-outline button-small deploy-button" href="/admin/publish/export/${d.channel._id}">Go to export</a>
  
  
                        `:t`
                          <button class="button button-fill button-small deploy-button" @click="${g}">Deploy Contract</button>
                        `}                        
                      `}
                      
                    `:t`
                      <p>Collection must be deployed to IPFS</p>
                    `}
                  </div>
                </div>
              </div>
              
            `:t`
              <div class="card">
                <div class="card-content card-content-padding">
                  <p>Use a web browser with wallet support to deploy an ERC-721 smart contract.</p>
                </div>
              </div>
            
            `}
  
  
          `:t`
            <div class="card">
              <div class="card-content card-content-padding">
                <p>Add NFTs to the collection before publishing.</p>
              </div>
            </div>
            
          `}


        </div>

        

      </div>
  
    </div>
  
  `}}Rs=$s([(0,s.b)(),Is(1,(0,o.f)(a.WalletService)),Is(2,(0,o.f)("contracts")),ks("design:paramtypes",[vi,Object,Object])],Rs),_s.id="458314dfff",_s.style="\n\n  ";const xs=_s;var Ps=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Cs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ts=class{channelWebService;settingsService;schemaService;gitlabService;constructor(e,t,i,a){this.channelWebService=e,this.settingsService=t,this.schemaService=i,this.gitlabService=a}async publish(){return new sa((async e=>(await this.schemaService.loadChannel(e.params.id),{channelViewModel:await this.channelWebService.get(e.params.id)})),is)}async export(){return new sa((async e=>{await this.schemaService.loadChannel(e.params.id);let t,i=await this.channelWebService.get(e.params.id);try{t=await this.settingsService.get()}catch(e){}return{channelViewModel:i,settings:t}}),os)}async forkReader(){return new sa((async e=>{await this.schemaService.loadChannel(e.params.id);let t,i=await this.channelWebService.get(e.params.id);try{t=await this.settingsService.get()}catch(e){}return{channelViewModel:i,settings:t}}),cs)}async publishReader(){return new sa((async e=>{await this.schemaService.loadChannel(e.params.id);let t,i=await this.channelWebService.get(e.params.id);try{t=await this.settingsService.get()}catch(e){}return{channelViewModel:i,settings:t}}),ws)}async contract(){return new sa((async e=>(await this.schemaService.loadChannel(e.params.id),{channelViewModel:await this.channelWebService.get(e.params.id)})),xs)}};Ps([oa("/admin/publish/:id"),Cs("design:type",Function),Cs("design:paramtypes",[]),Cs("design:returntype",Promise)],Ts.prototype,"publish",null),Ps([oa("/admin/publish/export/:id"),Cs("design:type",Function),Cs("design:paramtypes",[]),Cs("design:returntype",Promise)],Ts.prototype,"export",null),Ps([oa("/admin/publish/fork-reader/:id"),Cs("design:type",Function),Cs("design:paramtypes",[]),Cs("design:returntype",Promise)],Ts.prototype,"forkReader",null),Ps([oa("/admin/publish/publish-reader/:id"),Cs("design:type",Function),Cs("design:paramtypes",[]),Cs("design:returntype",Promise)],Ts.prototype,"publishReader",null),Ps([oa("/admin/publish/contract/:id"),Cs("design:type",Function),Cs("design:paramtypes",[]),Cs("design:returntype",Promise)],Ts.prototype,"contract",null),Ts=Ps([(0,s.b)(),Cs("design:paramtypes",[Gi,Et,Le,ea])],Ts);var As=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Os=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Fs=class{constructor(){}buildPagingViewModel(e,t,i,a){let n=new js;return n.offset=e||0,n.limit=t,n.count=i,n.start=n.offset+1,n.end=Math.min(n.offset+t,i),n.previousOffset=Math.max(n.offset-t,0),n.offset+t<i&&(n.nextOffset=n.offset+t),n.page=n.offset/n.limit+1,n.page>n.endPage&&(n.page=n.endPage),n.endPage=Math.ceil(n.count/n.limit),n.lastOffset=n.endPage*n.limit-n.limit,n.showNext=n.endPage>n.page,n.showPrevious=0!=n.offset,n.showFirst=n.page>2,n.showLast=n.page<n.endPage-1,n}calculateEndIndex(e,t,i){let a=t+e-1;return Math.min(i-1,a)}calculateDescendingEndIndex(e,t){let i=t-(e-1);return Math.max(0,i)}calculateDescendingOffset(e,t){let i=t-1-e;return Math.max(0,i)}};Fs=As([(0,s.b)(),Os("design:paramtypes",[])],Fs);class js{page;pageNumbers;endPage;offset;limit;count;start;end;previousOffset;nextOffset;lastOffset;showPrevious;showNext;showFirst;showLast}var Es=i(87470);function Ds(e,{$:t,$on:i,$f7:a,$update:s}){n.getInstance(di);let o=n.getInstance(vi),r=n.getWalletService(),c=e.channel_view_model;const l=async e=>{a.dialog.confirm("Are you sure you want to delete this collection? This will only remove your local copy of the files.",(async()=>{a.preloader.show(),await o.delete(c.channel),a.preloader.hide(),a.views.main.router.navigate("/");a.toast.show({text:"Collection deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))};return function(e){e.$;var t,i=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return i`

  <div class="card card-outline channel-card-show">

    <div class="card-header banner show-channel-banner-${c.channel._id}">

      <div class="float-right">
        <a class="button button-fill button-raised color-blue text-color-white border-white"
          href="/admin/publish/${c.channel._id}">Publish</a>
      </div>


      ${c?.coverImage?i`
      <img src="${c.coverImage.url}" class="avatar" alt="Channel cover image" />
      `:i`
      <i class="material-icons avatar">image</i>
      `}

    </div>

    <div class="card-content">

      <div class="card-content card-content-padding">
        
        <div class="float-right">

          <div class="segmented">

            ${i`
              <a class="button button-active" href="/admin/channel/edit/${c.channel._id}">Edit</a>
            `}

            <a class="button" @click="${l}">Delete</a>
          </div>

        </div>
                        
        <div class="title">${c?.channel?.title}</div>

        ${c?.authorDisplayName?i`
        <div class="name">
          By <a
            href="/admin/${c.channel._id}/author/show/${c?.author._id}">${c?.authorDisplayName}</a>
        </div>
        `:""}

        <div class="collection-info">
            <label>Items:</label><strong>${c?.itemCount}</strong>
            
            <span class="dot">·</span>
            <label>Created:</label><strong>${c.dateCreated}</strong>
  
            <span class="dot">·</span>
            <label>Forkable:</label><strong>${c.channel.disableForks?"No":"Yes"}</strong>

            ${c.channel.mintPrice?i`
              <span class="dot">·</span>
              <label>Mint Price:</label><strong>${c.channel.mintPrice} ETH</strong>
            `:i``}
  
            ${c.channel.royaltyPercent?i`
              <span class="dot">·</span>
              <label>Marketplace Creator Fee:</label><strong>${c.channel.royaltyPercent}%</strong>
            `:i``}
        </div>



        ${c.channel.descriptionHTML?i`
          <div class="description" id="channel-show-description-${c.channel._id}"
            innerHTML="${c.channel.descriptionHTML}">
          </div>
        `:i`<span />`}

            

        ${c.channel.contractAddress?i`
          <div class="contract-address">
            <strong>Contract Address:</strong> ${t=c?.channel.contractAddress,r.truncateEthAddress(t)}
          </div>
        `:i``}

        ${c.channel.localCid?i`
          <div class="contract-address">
            <strong>Last Published IPFS CID:</strong> ${c?.channel.localCid}
          </div>
        `:i``}

        ${c.channel.forkedFromCid?i`
          <div class="contract-address">
            <strong>Forked from IPFS:</strong> ${c?.channel.forkedFromCid}
          </div>
        `:i``}

        ${c.channel.forkedFromId?i`
          <div class="contract-address">
            <strong>Forked from:</strong> ${c?.channel.forkedFromId}
          </div>
        `:i``}

      </div>

    </div>

  </div>

`}}Ds.id="a1bbb3ef3d",Ds.style="    \n";const Bs=Ds;var Ms=i(27725),Ns=i(68468),Ls=i(90831),Us=i(53210),Hs=i(36879),qs=i(74346),Gs=i(89542),zs=i(77140),Js=i(31910),Ws=i(59746),Zs=i(88235),Vs=i(79859),Ks=i(36567),Ys=i(82391),Qs=i(19121),Xs=i(90263),eo=i(74496),to=i(75740),io=i(6697),ao=i(15751),no=i(860),so=i(59771),oo=i(98614),ro=i(84110),co=i.n(ro),lo=i(56176),fo=i.n(lo);let po;function uo(e){if(po)return po;return po=new $i.W,po.bind("version").toConstantValue(e),po.bind("provider").toConstantValue((()=>{if("undefined"!=typeof window&&window.ethereum)return window.web3Provider=window.ethereum,new ze.Q(window.ethereum)})),po.bind("contracts").toConstantValue(i(26015)),po.bind("name").toConstantValue("Large"),po.bind("framework7").toConstantValue(new Ms.ZP({el:"#app",id:"large-nft",name:"Large NFT",theme:"auto",init:!1,component:Ge,navbar:{hideOnPageScroll:!0},darkMode:"auto"})),po.bind("dayjs").toConstantValue(ns()),po.bind("PouchDB").toConstantValue((()=>so.Z)),po.bind("pouch-prefix").toConstantValue("./pouch/"),po.bind("footer-text").toConstantValue(globalThis.footerText),po.bind(hn).toSelf().inSingletonScope(),po.bind(Bn).toSelf().inSingletonScope(),po.bind(Gn).toSelf().inSingletonScope(),po.bind(Vn).toSelf().inSingletonScope(),po.bind(es).toSelf().inSingletonScope(),po.bind(Ts).toSelf().inSingletonScope(),po.bind(f).toSelf().inSingletonScope(),po.bind(Ve).toSelf().inSingletonScope(),po.bind(nt).toSelf().inSingletonScope(),po.bind(Ut).toSelf().inSingletonScope(),po.bind(Rs).toSelf().inSingletonScope(),po.bind(Wt).toSelf().inSingletonScope(),po.bind(Si).toSelf().inSingletonScope(),po.bind(y).toSelf().inSingletonScope(),po.bind(Le).toSelf().inSingletonScope(),po.bind(na).toSelf().inSingletonScope(),po.bind(Fs).toSelf().inSingletonScope(),po.bind(Ja).toSelf().inSingletonScope(),po.bind(ji).toSelf().inSingletonScope(),po.bind(hi).toSelf().inSingletonScope(),po.bind(Gi).toSelf().inSingletonScope(),po.bind(Li).toSelf().inSingletonScope(),po.bind(Wi).toSelf().inSingletonScope(),po.bind(a.WalletService).to(Qt).inSingletonScope(),po.bind(Pi).toSelf().inSingletonScope(),po.bind(ii).toSelf().inSingletonScope(),po.bind(vi).toSelf().inSingletonScope(),po.bind(Tt).toSelf().inSingletonScope(),po.bind(di).toSelf().inSingletonScope(),po.bind(St).toSelf().inSingletonScope(),po.bind(Xa).toSelf().inSingletonScope(),po.bind(_t).toSelf().inSingletonScope(),po.bind(Ai).toSelf().inSingletonScope(),po.bind(si).toSelf().inSingletonScope(),po.bind(Et).toSelf().inSingletonScope(),po.bind(_n).toSelf().inSingletonScope(),po.bind(ea).toSelf().inSingletonScope(),po.bind($n).toSelf().inSingletonScope(),po.bind(Mt).toSelf().inSingletonScope(),po.bind(ci).toSelf().inSingletonScope(),po.bind($).toSelf().inSingletonScope(),po.bind(E).toSelf().inSingletonScope(),po.bind(te).toSelf().inSingletonScope(),po.bind(Z).toSelf().inSingletonScope(),po.bind(P).toSelf().inSingletonScope(),po.bind(H).toSelf().inSingletonScope(),po.bind(ue).toSelf().inSingletonScope(),po.bind(re).toSelf().inSingletonScope(),po.bind(ye).toSelf().inSingletonScope(),po.bind(Re).toSelf().inSingletonScope(),po.bind(Ae).toSelf().inSingletonScope(),po.bind(Be).toSelf().inSingletonScope(),po.bind("ipfsRemoteInit").toConstantValue((async e=>{if(e)return(0,Es.Ue)({url:e})})),globalThis.container=po,po}ns().extend(co()),ns().extend(fo()),so.Z.plugin(oo.Z),Ms.ZP.use([Ns.Z,Ls.Z,Us.Z,Hs.Z,qs.Z,Gs.Z,zs.Z,Vs.Z,Ks.Z,Ys.Z,Qs.Z,Xs.Z,eo.Z,to.Z,io.Z,ao.Z,no.Z,Js.Z,Ws.Z,Zs.Z]),Ms.ZP.registerComponent("channel-card",Bs);var ho=i(75131);i(44445);const go=async e=>{let t="/large";if("serviceWorker"in navigator){const i=new ho.ZW(`${t}/sw-admin-${e}.js`,{scope:`${t}/`});mo(e),i.register()}},mo=e=>{let t=uo(e),i=t.get("framework7"),a=t.get(na);i.routes.push(...a.buildRoutesForContainer(t)),i.init()}},80950:()=>{},46601:()=>{},89214:()=>{},96419:()=>{},56353:()=>{},8623:()=>{},7748:()=>{},85568:()=>{},74897:()=>{},69386:()=>{},31616:()=>{},15525:()=>{},63897:()=>{},78110:()=>{},56619:()=>{},77108:()=>{},69862:()=>{},40964:()=>{},26015:e=>{"use strict";e.exports=JSON.parse('{"Channel":{"abi":[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"ipfsCid","type":"string"},{"internalType":"uint256","name":"mintFee","type":"uint256"},{"internalType":"uint256","name":"maxTokenId","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"InvalidQueryRange","type":"error"},{"inputs":[],"name":"MintERC2309QuantityExceedsLimit","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"OwnershipNotInitializedForExtraData","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toTokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"ConsecutiveTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"MintEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_MINT_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"explicitOwnershipOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"},{"internalType":"uint24","name":"extraData","type":"uint24"}],"internalType":"struct IERC721A.TokenOwnership","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"explicitOwnershipsOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"},{"internalType":"uint24","name":"extraData","type":"uint24"}],"internalType":"struct IERC721A.TokenOwnership[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"}],"name":"mintFromStartOrFail","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"stop","type":"uint256"}],"name":"tokensOfOwnerIn","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_i","type":"uint256"}],"name":"uint2str","outputs":[{"internalType":"string","name":"_uintAsString","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}],"name":"Channel","bytecode":"0x6080604052600a600d553480156200001657600080fd5b5060405162002ba938038062002ba98339810160408190526200003991620001da565b848460026200004983826200030d565b5060036200005882826200030d565b50506001600055506200006b33620000c3565b600b829055600c819055600a6200008384826200030d565b50600a604051602001620000989190620003d9565b60405160208183030381529060405260099081620000b791906200030d565b50505050505062000495565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013d57600080fd5b81516001600160401b03808211156200015a576200015a62000115565b604051601f8301601f19908116603f0116810190828211818310171562000185576200018562000115565b81604052838152602092508683858801011115620001a257600080fd5b600091505b83821015620001c65785820183015181830184015290820190620001a7565b600093810190920192909252949350505050565b600080600080600060a08688031215620001f357600080fd5b85516001600160401b03808211156200020b57600080fd5b6200021989838a016200012b565b965060208801519150808211156200023057600080fd5b6200023e89838a016200012b565b955060408801519150808211156200025557600080fd5b5062000264888289016200012b565b606088015160809098015196999598509695949350505050565b600181811c908216806200029357607f821691505b602082108103620002b457634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200030857600081815260208120601f850160051c81016020861015620002e35750805b601f850160051c820191505b818110156200030457828155600101620002ef565b5050505b505050565b81516001600160401b0381111562000329576200032962000115565b62000341816200033a84546200027e565b84620002ba565b602080601f831160018114620003795760008415620003605750858301515b600019600386901b1c1916600185901b17855562000304565b600085815260208120601f198616915b82811015620003aa5788860151825594840194600190910190840162000389565b5085821015620003c95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b66697066733a2f2f60c81b81526000600760008454620003f9816200027e565b600182811680156200041457600181146200042e5762000463565b60ff19841688870152821515830288018601945062000463565b8860005260208060002060005b85811015620004585781548b82018a01529084019082016200043b565b505050858389010194505b50507f2f636f6e74726163744d657461646174612e6a736f6e0000000000000000000083525050601601949350505050565b61270480620004a56000396000f3fe6080604052600436106101b75760003560e01c80638da5cb5b116100ec578063c23dc68f1161008a578063e985e9c511610064578063e985e9c5146104e1578063f2fde38b14610537578063f76f950e14610557578063fa9b70181461057757600080fd5b8063c23dc68f1461047f578063c87b56dd146104ac578063e8a3d485146104cc57600080fd5b8063a0712d68116100c6578063a0712d6814610402578063a22cb46514610415578063a2309ff814610435578063b88d4fde1461046c57600080fd5b80638da5cb5b146103a257806395d89b41146103cd57806399a2557a146103e257600080fd5b806342842e0e1161015957806370a082311161013357806370a082311461032d578063715018a61461034d5780637a4d892a146103625780638462151c1461037557600080fd5b806342842e0e146102cd5780635bbb2177146102e05780636352211e1461030d57600080fd5b8063095ea7b311610195578063095ea7b31461025857806318160ddd1461026d57806323b872dd146102b25780633ccfd60b146102c557600080fd5b806301ffc9a7146101bc57806306fdde03146101f1578063081812fc14610213575b600080fd5b3480156101c857600080fd5b506101dc6101d7366004611e9d565b61058d565b60405190151581526020015b60405180910390f35b3480156101fd57600080fd5b50610206610672565b6040516101e89190611f28565b34801561021f57600080fd5b5061023361022e366004611f3b565b610704565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101e8565b61026b610266366004611f7d565b61076e565b005b34801561027957600080fd5b50600154600054037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff015b6040519081526020016101e8565b61026b6102c0366004611fa7565b610859565b61026b610ae8565b61026b6102db366004611fa7565b610b48565b3480156102ec57600080fd5b506103006102fb366004611fe3565b610b68565b6040516101e89190612058565b34801561031957600080fd5b50610233610328366004611f3b565b610c52565b34801561033957600080fd5b506102a46103483660046120e2565b610c5d565b34801561035957600080fd5b5061026b610cdf565b61026b6103703660046120fd565b610cf3565b34801561038157600080fd5b506103956103903660046120e2565b610e00565b6040516101e8919061211f565b3480156103ae57600080fd5b5060085473ffffffffffffffffffffffffffffffffffffffff16610233565b3480156103d957600080fd5b50610206610f2b565b3480156103ee57600080fd5b506103956103fd366004612157565b610f3a565b61026b610410366004611f3b565b611102565b34801561042157600080fd5b5061026b61043036600461218a565b61134d565b34801561044157600080fd5b506000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016102a4565b61026b61047a3660046121f5565b6113e4565b34801561048b57600080fd5b5061049f61049a366004611f3b565b611454565b6040516101e891906122ef565b3480156104b857600080fd5b506102066104c7366004611f3b565b6114dc565b3480156104d857600080fd5b506102066115a5565b3480156104ed57600080fd5b506101dc6104fc366004612341565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561054357600080fd5b5061026b6105523660046120e2565b6115b4565b34801561056357600080fd5b50610206610572366004611f3b565b611668565b34801561058357600080fd5b506102a4600d5481565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316148061062057507f80ac58cd000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b8061066c57507f5b5e139f000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60606002805461068190612374565b80601f01602080910402602001604051908101604052809291908181526020018280546106ad90612374565b80156106fa5780601f106106cf576101008083540402835291602001916106fa565b820191906000526020600020905b8154815290600101906020018083116106dd57829003601f168201915b5050505050905090565b600061070f826117bf565b610745576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081526006602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b600061077982610c52565b90503373ffffffffffffffffffffffffffffffffffffffff8216146107d8576107a281336104fc565b6107d8576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526006602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff87811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b60006108648261180d565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146108cb576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260066020526040902080543380821473ffffffffffffffffffffffffffffffffffffffff88169091141761093e5761090886336104fc565b61093e576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff851661098b576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b801561099657600082555b73ffffffffffffffffffffffffffffffffffffffff86811660009081526005602052604080822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff019055918716808252919020805460010190554260a01b177c0200000000000000000000000000000000000000000000000000000000176000858152600460205260408120919091557c020000000000000000000000000000000000000000000000000000000084169003610a8557600184016000818152600460205260408120549003610a83576000548114610a835760008181526004602052604090208490555b505b838573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050505050565b610af06118cc565b604051600090339047908381818185875af1925050503d8060008114610b32576040519150601f19603f3d011682016040523d82523d6000602084013e610b37565b606091505b5050905080610b4557600080fd5b50565b610b63838383604051806020016040528060008152506113e4565b505050565b60608160008167ffffffffffffffff811115610b8657610b866121c6565b604051908082528060200260200182016040528015610bf657816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181610ba45790505b50905060005b828114610c4957610c24868683818110610c1857610c186123c7565b90506020020135611454565b828281518110610c3657610c366123c7565b6020908102919091010152600101610bfc565b50949350505050565b600061066c8261180d565b600073ffffffffffffffffffffffffffffffffffffffff8216610cac576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205467ffffffffffffffff1690565b610ce76118cc565b610cf1600061194d565b565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181610d84576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f20737461727420706173736564000000000000000000000000000000000060448201526064015b60405180910390fd5b610d8f816001612425565b8214610df7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f546f6b656e2069732070617374207374617274000000000000000000000000006044820152606401610d7b565b610b6383611102565b60606000806000610e1085610c5d565b905060008167ffffffffffffffff811115610e2d57610e2d6121c6565b604051908082528060200260200182016040528015610e56578160200160208202803683370190505b5060408051608081018252600080825260208201819052918101829052606081019190915290915060015b838614610f1f57610e91816119c4565b91508160400151610f1757815173ffffffffffffffffffffffffffffffffffffffff1615610ebe57815194505b8773ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610f175780838780600101985081518110610f0a57610f0a6123c7565b6020026020010181815250505b600101610e81565b50909695505050505050565b60606003805461068190612374565b6060818310610f75576040517f32c1995a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080610f8160005490565b90506001851015610f9157600194505b80841115610f9d578093505b6000610fa887610c5d565b905084861015610fc75785850381811015610fc1578091505b50610fcb565b5060005b60008167ffffffffffffffff811115610fe657610fe66121c6565b60405190808252806020026020018201604052801561100f578160200160208202803683370190505b509050816000036110255793506110fb92505050565b600061103088611454565b905060008160400151611041575080515b885b8881141580156110535750848714155b156110ef57611061816119c4565b925082604001516110e757825173ffffffffffffffffffffffffffffffffffffffff161561108e57825191505b8a73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036110e757808488806001019950815181106110da576110da6123c7565b6020026020010181815250505b600101611043565b50505092835250909150505b9392505050565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff018161118e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f546f6f20666577000000000000000000000000000000000000000000000000006044820152606401610d7b565b600d548211156111fa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f546f6f206d616e790000000000000000000000000000000000000000000000006044820152606401610d7b565b600c546112078383612425565b111561126f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4d696e74696e6720636c6f7365640000000000000000000000000000000000006044820152606401610d7b565b60085473ffffffffffffffffffffffffffffffffffffffff16331461130357600b5461129b9083612438565b3414611303576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f53656e64206578616374204554480000000000000000000000000000000000006044820152606401610d7b565b61130d3383611a69565b7f94242c431036b9ba6723a138d4b275a5b38e13a95ef66227a45df427c0f843f36113388383612425565b60405190815260200160405180910390a15050565b33600081815260076020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6113ef848484610859565b73ffffffffffffffffffffffffffffffffffffffff83163b1561144e5761141884848484611a87565b61144e576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b60408051608081018252600080825260208201819052918101829052606081019190915260408051608081018252600080825260208201819052918101829052606081019190915260018310806114ad57506000548310155b156114b85792915050565b6114c1836119c4565b90508060400151156114d35792915050565b6110fb83611c00565b60606114e7826117bf565b611573576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610d7b565b600a61157e83611668565b60405160200161158f92919061246b565b6040516020818303038152906040529050919050565b60606009805461068190612374565b6115bc6118cc565b73ffffffffffffffffffffffffffffffffffffffff811661165f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610d7b565b610b458161194d565b6060816000036116ab57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156116d557806116bf816125d3565b91506116ce9050600a8361260b565b91506116af565b60008167ffffffffffffffff8111156116f0576116f06121c6565b6040519080825280601f01601f19166020018201604052801561171a576020820181803683370190505b509050815b8515610c4957611730600182612646565b9050600061173f600a8861260b565b61174a90600a612438565b6117549088612646565b61175f906030612659565b905060008160f81b90508084848151811061177c5761177c6123c7565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506117b6600a8961260b565b9750505061171f565b6000816001111580156117d3575060005482105b801561066c5750506000908152600460205260409020547c0100000000000000000000000000000000000000000000000000000000161590565b6000818060011161189a5760005481101561189a57600081815260046020526040812054907c010000000000000000000000000000000000000000000000000000000082169003611898575b806000036110fb57507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01600081815260046020526040902054611859565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60085473ffffffffffffffffffffffffffffffffffffffff163314610cf1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610d7b565b6008805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60408051608081018252600080825260208201819052918101829052606081019190915260008281526004602052604090205461066c906040805160808101825273ffffffffffffffffffffffffffffffffffffffff8316815260a083901c67ffffffffffffffff1660208201527c0100000000000000000000000000000000000000000000000000000000831615159181019190915260e89190911c606082015290565b611a83828260405180602001604052806000815250611c9e565b5050565b6040517f150b7a0200000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290611ae2903390899088908890600401612672565b6020604051808303816000875af1925050508015611b3b575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611b38918101906126b1565b60015b611bb2573d808015611b69576040519150601f19603f3d011682016040523d82523d6000602084013e611b6e565b606091505b508051600003611baa576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050949350505050565b60408051608081018252600080825260208201819052918101829052606081019190915261066c611c308361180d565b6040805160808101825273ffffffffffffffffffffffffffffffffffffffff8316815260a083901c67ffffffffffffffff1660208201527c0100000000000000000000000000000000000000000000000000000000831615159181019190915260e89190911c606082015290565b611ca88383611d31565b73ffffffffffffffffffffffffffffffffffffffff83163b15610b63576000548281035b611cdf6000868380600101945086611a87565b611d15576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b818110611ccc578160005414611d2a57600080fd5b5050505050565b6000805490829003611d6f576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff831660008181526005602090815260408083208054680100000000000000018802019055848352600490915281206001851460e11b4260a01b178317905582840190839083907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4600183015b818114611e2b57808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a4600101611df3565b5081600003611e66576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005550505050565b7fffffffff0000000000000000000000000000000000000000000000000000000081168114610b4557600080fd5b600060208284031215611eaf57600080fd5b81356110fb81611e6f565b60005b83811015611ed5578181015183820152602001611ebd565b50506000910152565b60008151808452611ef6816020860160208601611eba565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006110fb6020830184611ede565b600060208284031215611f4d57600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff81168114611f7857600080fd5b919050565b60008060408385031215611f9057600080fd5b611f9983611f54565b946020939093013593505050565b600080600060608486031215611fbc57600080fd5b611fc584611f54565b9250611fd360208501611f54565b9150604084013590509250925092565b60008060208385031215611ff657600080fd5b823567ffffffffffffffff8082111561200e57600080fd5b818501915085601f83011261202257600080fd5b81358181111561203157600080fd5b8660208260051b850101111561204657600080fd5b60209290920196919550909350505050565b6020808252825182820181905260009190848201906040850190845b81811015610f1f576120cf83855173ffffffffffffffffffffffffffffffffffffffff815116825267ffffffffffffffff602082015116602083015260408101511515604083015262ffffff60608201511660608301525050565b9284019260809290920191600101612074565b6000602082840312156120f457600080fd5b6110fb82611f54565b6000806040838503121561211057600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610f1f5783518352928401929184019160010161213b565b60008060006060848603121561216c57600080fd5b61217584611f54565b95602085013595506040909401359392505050565b6000806040838503121561219d57600080fd5b6121a683611f54565b9150602083013580151581146121bb57600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806000806080858703121561220b57600080fd5b61221485611f54565b935061222260208601611f54565b925060408501359150606085013567ffffffffffffffff8082111561224657600080fd5b818701915087601f83011261225a57600080fd5b81358181111561226c5761226c6121c6565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156122b2576122b26121c6565b816040528281528a60208487010111156122cb57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b815173ffffffffffffffffffffffffffffffffffffffff16815260208083015167ffffffffffffffff169082015260408083015115159082015260608083015162ffffff16908201526080810161066c565b6000806040838503121561235457600080fd5b61235d83611f54565b915061236b60208401611f54565b90509250929050565b600181811c9082168061238857607f821691505b6020821081036123c1577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561066c5761066c6123f6565b808202811582820484141761066c5761066c6123f6565b60008151612461818560208601611eba565b9290920192915050565b7f697066733a2f2f000000000000000000000000000000000000000000000000008152600060076000855481600182811c9150808316806124ad57607f831692505b602080841082036124e5577f4e487b710000000000000000000000000000000000000000000000000000000086526022600452602486fd5b8180156124f9576001811461253057612561565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008616888b01528785151586028b01019650612561565b60008c81526020902060005b868110156125575781548c82018b015290850190830161253c565b505087858b010196505b5050505050506125c96125a061259a837f2f6d657461646174612f000000000000000000000000000000000000000000008152600a0190565b8761244f565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000815260050190565b9695505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612604576126046123f6565b5060010190565b600082612641577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b8181038181111561066c5761066c6123f6565b60ff818116838216019081111561066c5761066c6123f6565b600073ffffffffffffffffffffffffffffffffffffffff8087168352808616602084015250836040830152608060608301526125c96080830184611ede565b6000602082840312156126c357600080fd5b81516110fb81611e6f56fea2646970667358221220e0b44cbd7105a97ddc99fbd4a60e2d6dcc8833adafd3abb9f3108d0d1d880dd464736f6c63430008150033","deployedBytecode":"0x6080604052600436106101b75760003560e01c80638da5cb5b116100ec578063c23dc68f1161008a578063e985e9c511610064578063e985e9c5146104e1578063f2fde38b14610537578063f76f950e14610557578063fa9b70181461057757600080fd5b8063c23dc68f1461047f578063c87b56dd146104ac578063e8a3d485146104cc57600080fd5b8063a0712d68116100c6578063a0712d6814610402578063a22cb46514610415578063a2309ff814610435578063b88d4fde1461046c57600080fd5b80638da5cb5b146103a257806395d89b41146103cd57806399a2557a146103e257600080fd5b806342842e0e1161015957806370a082311161013357806370a082311461032d578063715018a61461034d5780637a4d892a146103625780638462151c1461037557600080fd5b806342842e0e146102cd5780635bbb2177146102e05780636352211e1461030d57600080fd5b8063095ea7b311610195578063095ea7b31461025857806318160ddd1461026d57806323b872dd146102b25780633ccfd60b146102c557600080fd5b806301ffc9a7146101bc57806306fdde03146101f1578063081812fc14610213575b600080fd5b3480156101c857600080fd5b506101dc6101d7366004611e9d565b61058d565b60405190151581526020015b60405180910390f35b3480156101fd57600080fd5b50610206610672565b6040516101e89190611f28565b34801561021f57600080fd5b5061023361022e366004611f3b565b610704565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101e8565b61026b610266366004611f7d565b61076e565b005b34801561027957600080fd5b50600154600054037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff015b6040519081526020016101e8565b61026b6102c0366004611fa7565b610859565b61026b610ae8565b61026b6102db366004611fa7565b610b48565b3480156102ec57600080fd5b506103006102fb366004611fe3565b610b68565b6040516101e89190612058565b34801561031957600080fd5b50610233610328366004611f3b565b610c52565b34801561033957600080fd5b506102a46103483660046120e2565b610c5d565b34801561035957600080fd5b5061026b610cdf565b61026b6103703660046120fd565b610cf3565b34801561038157600080fd5b506103956103903660046120e2565b610e00565b6040516101e8919061211f565b3480156103ae57600080fd5b5060085473ffffffffffffffffffffffffffffffffffffffff16610233565b3480156103d957600080fd5b50610206610f2b565b3480156103ee57600080fd5b506103956103fd366004612157565b610f3a565b61026b610410366004611f3b565b611102565b34801561042157600080fd5b5061026b61043036600461218a565b61134d565b34801561044157600080fd5b506000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016102a4565b61026b61047a3660046121f5565b6113e4565b34801561048b57600080fd5b5061049f61049a366004611f3b565b611454565b6040516101e891906122ef565b3480156104b857600080fd5b506102066104c7366004611f3b565b6114dc565b3480156104d857600080fd5b506102066115a5565b3480156104ed57600080fd5b506101dc6104fc366004612341565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561054357600080fd5b5061026b6105523660046120e2565b6115b4565b34801561056357600080fd5b50610206610572366004611f3b565b611668565b34801561058357600080fd5b506102a4600d5481565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316148061062057507f80ac58cd000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b8061066c57507f5b5e139f000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60606002805461068190612374565b80601f01602080910402602001604051908101604052809291908181526020018280546106ad90612374565b80156106fa5780601f106106cf576101008083540402835291602001916106fa565b820191906000526020600020905b8154815290600101906020018083116106dd57829003601f168201915b5050505050905090565b600061070f826117bf565b610745576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081526006602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b600061077982610c52565b90503373ffffffffffffffffffffffffffffffffffffffff8216146107d8576107a281336104fc565b6107d8576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526006602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff87811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b60006108648261180d565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146108cb576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260066020526040902080543380821473ffffffffffffffffffffffffffffffffffffffff88169091141761093e5761090886336104fc565b61093e576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff851661098b576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b801561099657600082555b73ffffffffffffffffffffffffffffffffffffffff86811660009081526005602052604080822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff019055918716808252919020805460010190554260a01b177c0200000000000000000000000000000000000000000000000000000000176000858152600460205260408120919091557c020000000000000000000000000000000000000000000000000000000084169003610a8557600184016000818152600460205260408120549003610a83576000548114610a835760008181526004602052604090208490555b505b838573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050505050565b610af06118cc565b604051600090339047908381818185875af1925050503d8060008114610b32576040519150601f19603f3d011682016040523d82523d6000602084013e610b37565b606091505b5050905080610b4557600080fd5b50565b610b63838383604051806020016040528060008152506113e4565b505050565b60608160008167ffffffffffffffff811115610b8657610b866121c6565b604051908082528060200260200182016040528015610bf657816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181610ba45790505b50905060005b828114610c4957610c24868683818110610c1857610c186123c7565b90506020020135611454565b828281518110610c3657610c366123c7565b6020908102919091010152600101610bfc565b50949350505050565b600061066c8261180d565b600073ffffffffffffffffffffffffffffffffffffffff8216610cac576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205467ffffffffffffffff1690565b610ce76118cc565b610cf1600061194d565b565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181610d84576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f20737461727420706173736564000000000000000000000000000000000060448201526064015b60405180910390fd5b610d8f816001612425565b8214610df7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f546f6b656e2069732070617374207374617274000000000000000000000000006044820152606401610d7b565b610b6383611102565b60606000806000610e1085610c5d565b905060008167ffffffffffffffff811115610e2d57610e2d6121c6565b604051908082528060200260200182016040528015610e56578160200160208202803683370190505b5060408051608081018252600080825260208201819052918101829052606081019190915290915060015b838614610f1f57610e91816119c4565b91508160400151610f1757815173ffffffffffffffffffffffffffffffffffffffff1615610ebe57815194505b8773ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610f175780838780600101985081518110610f0a57610f0a6123c7565b6020026020010181815250505b600101610e81565b50909695505050505050565b60606003805461068190612374565b6060818310610f75576040517f32c1995a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080610f8160005490565b90506001851015610f9157600194505b80841115610f9d578093505b6000610fa887610c5d565b905084861015610fc75785850381811015610fc1578091505b50610fcb565b5060005b60008167ffffffffffffffff811115610fe657610fe66121c6565b60405190808252806020026020018201604052801561100f578160200160208202803683370190505b509050816000036110255793506110fb92505050565b600061103088611454565b905060008160400151611041575080515b885b8881141580156110535750848714155b156110ef57611061816119c4565b925082604001516110e757825173ffffffffffffffffffffffffffffffffffffffff161561108e57825191505b8a73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036110e757808488806001019950815181106110da576110da6123c7565b6020026020010181815250505b600101611043565b50505092835250909150505b9392505050565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff018161118e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f546f6f20666577000000000000000000000000000000000000000000000000006044820152606401610d7b565b600d548211156111fa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f546f6f206d616e790000000000000000000000000000000000000000000000006044820152606401610d7b565b600c546112078383612425565b111561126f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4d696e74696e6720636c6f7365640000000000000000000000000000000000006044820152606401610d7b565b60085473ffffffffffffffffffffffffffffffffffffffff16331461130357600b5461129b9083612438565b3414611303576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f53656e64206578616374204554480000000000000000000000000000000000006044820152606401610d7b565b61130d3383611a69565b7f94242c431036b9ba6723a138d4b275a5b38e13a95ef66227a45df427c0f843f36113388383612425565b60405190815260200160405180910390a15050565b33600081815260076020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6113ef848484610859565b73ffffffffffffffffffffffffffffffffffffffff83163b1561144e5761141884848484611a87565b61144e576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b60408051608081018252600080825260208201819052918101829052606081019190915260408051608081018252600080825260208201819052918101829052606081019190915260018310806114ad57506000548310155b156114b85792915050565b6114c1836119c4565b90508060400151156114d35792915050565b6110fb83611c00565b60606114e7826117bf565b611573576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610d7b565b600a61157e83611668565b60405160200161158f92919061246b565b6040516020818303038152906040529050919050565b60606009805461068190612374565b6115bc6118cc565b73ffffffffffffffffffffffffffffffffffffffff811661165f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610d7b565b610b458161194d565b6060816000036116ab57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156116d557806116bf816125d3565b91506116ce9050600a8361260b565b91506116af565b60008167ffffffffffffffff8111156116f0576116f06121c6565b6040519080825280601f01601f19166020018201604052801561171a576020820181803683370190505b509050815b8515610c4957611730600182612646565b9050600061173f600a8861260b565b61174a90600a612438565b6117549088612646565b61175f906030612659565b905060008160f81b90508084848151811061177c5761177c6123c7565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506117b6600a8961260b565b9750505061171f565b6000816001111580156117d3575060005482105b801561066c5750506000908152600460205260409020547c0100000000000000000000000000000000000000000000000000000000161590565b6000818060011161189a5760005481101561189a57600081815260046020526040812054907c010000000000000000000000000000000000000000000000000000000082169003611898575b806000036110fb57507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01600081815260046020526040902054611859565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60085473ffffffffffffffffffffffffffffffffffffffff163314610cf1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610d7b565b6008805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60408051608081018252600080825260208201819052918101829052606081019190915260008281526004602052604090205461066c906040805160808101825273ffffffffffffffffffffffffffffffffffffffff8316815260a083901c67ffffffffffffffff1660208201527c0100000000000000000000000000000000000000000000000000000000831615159181019190915260e89190911c606082015290565b611a83828260405180602001604052806000815250611c9e565b5050565b6040517f150b7a0200000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290611ae2903390899088908890600401612672565b6020604051808303816000875af1925050508015611b3b575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611b38918101906126b1565b60015b611bb2573d808015611b69576040519150601f19603f3d011682016040523d82523d6000602084013e611b6e565b606091505b508051600003611baa576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050949350505050565b60408051608081018252600080825260208201819052918101829052606081019190915261066c611c308361180d565b6040805160808101825273ffffffffffffffffffffffffffffffffffffffff8316815260a083901c67ffffffffffffffff1660208201527c0100000000000000000000000000000000000000000000000000000000831615159181019190915260e89190911c606082015290565b611ca88383611d31565b73ffffffffffffffffffffffffffffffffffffffff83163b15610b63576000548281035b611cdf6000868380600101945086611a87565b611d15576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b818110611ccc578160005414611d2a57600080fd5b5050505050565b6000805490829003611d6f576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff831660008181526005602090815260408083208054680100000000000000018802019055848352600490915281206001851460e11b4260a01b178317905582840190839083907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4600183015b818114611e2b57808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a4600101611df3565b5081600003611e66576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005550505050565b7fffffffff0000000000000000000000000000000000000000000000000000000081168114610b4557600080fd5b600060208284031215611eaf57600080fd5b81356110fb81611e6f565b60005b83811015611ed5578181015183820152602001611ebd565b50506000910152565b60008151808452611ef6816020860160208601611eba565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006110fb6020830184611ede565b600060208284031215611f4d57600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff81168114611f7857600080fd5b919050565b60008060408385031215611f9057600080fd5b611f9983611f54565b946020939093013593505050565b600080600060608486031215611fbc57600080fd5b611fc584611f54565b9250611fd360208501611f54565b9150604084013590509250925092565b60008060208385031215611ff657600080fd5b823567ffffffffffffffff8082111561200e57600080fd5b818501915085601f83011261202257600080fd5b81358181111561203157600080fd5b8660208260051b850101111561204657600080fd5b60209290920196919550909350505050565b6020808252825182820181905260009190848201906040850190845b81811015610f1f576120cf83855173ffffffffffffffffffffffffffffffffffffffff815116825267ffffffffffffffff602082015116602083015260408101511515604083015262ffffff60608201511660608301525050565b9284019260809290920191600101612074565b6000602082840312156120f457600080fd5b6110fb82611f54565b6000806040838503121561211057600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610f1f5783518352928401929184019160010161213b565b60008060006060848603121561216c57600080fd5b61217584611f54565b95602085013595506040909401359392505050565b6000806040838503121561219d57600080fd5b6121a683611f54565b9150602083013580151581146121bb57600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806000806080858703121561220b57600080fd5b61221485611f54565b935061222260208601611f54565b925060408501359150606085013567ffffffffffffffff8082111561224657600080fd5b818701915087601f83011261225a57600080fd5b81358181111561226c5761226c6121c6565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156122b2576122b26121c6565b816040528281528a60208487010111156122cb57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b815173ffffffffffffffffffffffffffffffffffffffff16815260208083015167ffffffffffffffff169082015260408083015115159082015260608083015162ffffff16908201526080810161066c565b6000806040838503121561235457600080fd5b61235d83611f54565b915061236b60208401611f54565b90509250929050565b600181811c9082168061238857607f821691505b6020821081036123c1577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561066c5761066c6123f6565b808202811582820484141761066c5761066c6123f6565b60008151612461818560208601611eba565b9290920192915050565b7f697066733a2f2f000000000000000000000000000000000000000000000000008152600060076000855481600182811c9150808316806124ad57607f831692505b602080841082036124e5577f4e487b710000000000000000000000000000000000000000000000000000000086526022600452602486fd5b8180156124f9576001811461253057612561565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008616888b01528785151586028b01019650612561565b60008c81526020902060005b868110156125575781548c82018b015290850190830161253c565b505087858b010196505b5050505050506125c96125a061259a837f2f6d657461646174612f000000000000000000000000000000000000000000008152600a0190565b8761244f565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000815260050190565b9695505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612604576126046123f6565b5060010190565b600082612641577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b8181038181111561066c5761066c6123f6565b60ff818116838216019081111561066c5761066c6123f6565b600073ffffffffffffffffffffffffffffffffffffffff8087168352808616602084015250836040830152608060608301526125c96080830184611ede565b6000602082840312156126c357600080fd5b81516110fb81611e6f56fea2646970667358221220e0b44cbd7105a97ddc99fbd4a60e2d6dcc8833adafd3abb9f3108d0d1d880dd464736f6c63430008150033"}}')}},e=>{e.O(0,[216],(()=>{return t=73243,e(e.s=t);var t}));var t=e.O();admin=t}]);
//# sourceMappingURL=main.admin.js.map