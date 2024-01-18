var admin;(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[179],{69670:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>Fo});a(35666),a(28660);const i={WalletService:Symbol("WalletService")};class n{static getInstance(e){return Ao.get(e)}static getContainer(){return Ao}static getWalletService(){return Ao.get(i.WalletService)}}var s=a(45466),o=a(61906),r=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},c=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},l=function(e,t){return function(a,i){t(a,i,e)}};let f=class{app;constructor(e){this.app=e}showExceptionPopup(e){console.log(e),this.app.dialog.alert(e.message,"There was an error")}showPopup(e){this.app.dialog.alert(e)}showAlert(e){this.app.dialog.alert(e)}spinnerDialog;showSpinner(e){this.spinnerDialog&&this.hideSpinner(),this.spinnerDialog=this.app.dialog.preloader(e||"Loading")}hideSpinner(){this.spinnerDialog&&(this.spinnerDialog.close(),this.spinnerDialog=null)}progressDialog;showProgress(e){this.progressDialog&&this.hideProgress();this.progressDialog=this.app.dialog.progress(e||"Loading",0)}setProgress(e,t){this.progressDialog&&(this.progressDialog.setProgress(e),this.progressDialog.setText(t))}hideProgress(){this.progressDialog&&(this.progressDialog.close(),this.progressDialog=null)}};f=r([(0,s.b)(),l(0,(0,o.f)("framework7")),c("design:paramtypes",[Object])],f);var d=a(25494),p=a(99025),u=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},h=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class m{_id;_rev;content;cid;dateCreated}u([(0,d.a)(),h("design:type",String)],m.prototype,"_id",void 0),u([(0,d.a)(),h("design:type",String)],m.prototype,"_rev",void 0),u([(0,d.a)(),h("design:type",String)],m.prototype,"content",void 0),u([(0,p.rl)(),h("design:type",String)],m.prototype,"cid",void 0),u([(0,d.a)(),h("design:type",String)],m.prototype,"dateCreated",void 0);var g=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},v=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},b=function(e,t){return function(a,i){t(a,i,e)}};let y=class{pouchPrefix;PouchDB;dbCache={};constructor(e,t){this.pouchPrefix=e,this.PouchDB=t}async getDatabase(e,t){let a=this.PouchDB();const i=`${this.pouchPrefix}-large-${e}`;if(this.dbCache[i])return this.dbCache[i];this.dbCache[i]=new a(i,{auto_compaction:!0});const n=await this.dbCache[i].info();if(0==n.doc_count&&0==n.update_seq){if(t){console.log(`Creating indexes for ${i}`);let e={_id:"_local/changesets",ids:[]};for(let a of t)await a.changeset(this.dbCache[i]),e.ids.push(a.id),console.log(`New changeset detected...${a.id}`);await this.dbCache[i].put(e)}}else if(t){let e;try{e=await this.dbCache[i].get("_local/changesets")}catch(e){}e||(e={_id:"_local/changesets",ids:[]});let a=!1;for(let n of t)if(!e.ids.includes(n.id)){try{await n.changeset(this.dbCache[i])}catch(e){}e.ids.push(n.id),a=!0,console.log(`New changeset detected...${n.id}`)}a&&(console.log("Saving changeset log...",e),await this.dbCache[i].put(e))}return this.dbCache[i]}async getEmptyDatabase(e){let t=this.PouchDB();const a=`${this.pouchPrefix}-large-${e}`;return this.dbCache[a]=new t(a,{auto_compaction:!0}),this.dbCache[a]}async getLatestRevision(e,t){let a;try{a=await e.get(t)}catch(e){}if(a)return a;let i=await e.allDocs({key:t,include_docs:!0,deleted:"ok"});if(i.rows?.length>0){return{_id:t,_rev:i.rows[0].value.rev,_deleted:!0}}}};y=g([(0,s.b)(),b(0,(0,o.f)("pouch-prefix")),b(1,(0,o.f)("PouchDB")),v("design:paramtypes",[String,Object])],y);var w=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},S=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let $=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-animation`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-animation`)}async get(e){return Object.assign(new m,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}};$=w([(0,s.b)(),S("design:paramtypes",[y])],$);var k=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},I=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class R{_id;_rev;walletAddress;name;description;url;coverPhotoId;dateCreated;lastUpdated}k([(0,d.a)(),I("design:type",String)],R.prototype,"_id",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"_rev",void 0),k([(0,p.rl)(),I("design:type",String)],R.prototype,"walletAddress",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"name",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"description",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"url",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"coverPhotoId",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"dateCreated",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"lastUpdated",void 0);var x=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},_=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let P=class{databaseService;db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-author`)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-author`)}async getLatestRevision(e){return Object.assign(new R,await this.databaseService.getLatestRevision(this.db,e))}async get(e){return Object.assign(new R,await this.db.get(e))}async put(e){return this.db.put(e)}};P=x([(0,s.b)(),_("design:paramtypes",[y])],P);var C=a(57253),T=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},A=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class O{_id;_rev;forkedFromCid;forkedFromId;forkedFromFeeRecipient;forkType;disableForks;authorId;title;symbol;link;description;descriptionHTML;descriptionMarkdown;license;licenseHTML;licenseMarkdown;category;language;coverImageId;coverBannerId;mintPrice;attributeOptions;contractAddress;pinJobId;pinJobStatus;gitProvider;httpUrlToRepo;publishReaderRepoId;publishReaderRepoPath;publishReaderRepoBranch;publishReaderRepoStatus;publishReaderIPFSStatus;pubDate;productionHostname;productionBaseURI;productionBaseLibraryURI;showMintPage;showActivityPage;marketplaces;externalLinks;importSuccess;dateCreated;lastUpdated}T([(0,d.a)(),A("design:type",String)],O.prototype,"_id",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"_rev",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"forkedFromCid",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"forkedFromId",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"forkedFromFeeRecipient",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"forkType",void 0),T([(0,d.a)(),A("design:type",Boolean)],O.prototype,"disableForks",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"authorId",void 0),T([(0,C.Bl)(3,{message:"Title must be more than 3 characters."}),A("design:type",String)],O.prototype,"title",void 0),T([(0,p.rl)(),A("design:type",String)],O.prototype,"symbol",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"link",void 0),T([(0,d.a)(),A("design:type",Object)],O.prototype,"description",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"descriptionHTML",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"descriptionMarkdown",void 0),T([(0,d.a)(),A("design:type",Object)],O.prototype,"license",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"licenseHTML",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"licenseMarkdown",void 0),T([(0,d.a)(),A("design:type",Array)],O.prototype,"category",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"language",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"coverImageId",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"coverBannerId",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"mintPrice",void 0),T([(0,d.a)(),A("design:type",Array)],O.prototype,"attributeOptions",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"contractAddress",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"pinJobId",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"pinJobStatus",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"gitProvider",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"httpUrlToRepo",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"publishReaderRepoId",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"publishReaderRepoPath",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"publishReaderRepoBranch",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"publishReaderRepoStatus",void 0),T([(0,d.a)(),A("design:type",Object)],O.prototype,"publishReaderIPFSStatus",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"pubDate",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"productionHostname",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"productionBaseURI",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"productionBaseLibraryURI",void 0),T([(0,d.a)(),A("design:type",Boolean)],O.prototype,"showMintPage",void 0),T([(0,d.a)(),A("design:type",Boolean)],O.prototype,"showActivityPage",void 0),T([(0,d.a)(),A("design:type",Object)],O.prototype,"marketplaces",void 0),T([(0,d.a)(),A("design:type",Object)],O.prototype,"externalLinks",void 0),T([(0,d.a)(),A("design:type",Boolean)],O.prototype,"importSuccess",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"dateCreated",void 0),T([(0,d.a)(),A("design:type",String)],O.prototype,"lastUpdated",void 0);var j=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},F=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let E=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}}),await e.createIndex({index:{fields:["lastUpdated"]}})}}];db;constructor(e){this.databaseService=e}async load(){this.db=await this.databaseService.getDatabase("channel",this.changesets)}async get(e){return Object.assign(new O,await this.db.get(e))}async getLatestRevision(e){return Object.assign(new O,await this.databaseService.getLatestRevision(this.db,e))}async put(e){return this.db.put(e)}async list(e,t){return(await this.db.find({selector:{dateCreated:{$exists:!0}},sort:[{dateCreated:"desc"}],limit:e,skip:t})).docs}async delete(e){await this.db.remove(e)}};E=j([(0,s.b)(),F("design:paramtypes",[y])],E);var D=a(28246),B=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},M=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class L{_id;_rev;ipfsHost;defaultGitProvider;gitProviders;gitCorsProxy;username;personalAccessToken;alchemyKey;huggingFace;welcomeHide;dateCreated;lastUpdated}B([(0,d.a)(),M("design:type",String)],L.prototype,"_id",void 0),B([(0,d.a)(),M("design:type",String)],L.prototype,"_rev",void 0),B([(0,d.a)(),M("design:type",String)],L.prototype,"ipfsHost",void 0),B([(0,d.a)(),M("design:type",String)],L.prototype,"defaultGitProvider",void 0),B([(0,d.a)(),M("design:type",Object)],L.prototype,"gitProviders",void 0),B([(0,d.a)(),M("design:type",String)],L.prototype,"gitCorsProxy",void 0),B([(0,d.a)(),M("design:type",String)],L.prototype,"username",void 0),B([(0,d.a)(),M("design:type",String)],L.prototype,"personalAccessToken",void 0),B([(0,d.a)(),M("design:type",String)],L.prototype,"alchemyKey",void 0),B([(0,d.a)(),M("design:type",String)],L.prototype,"huggingFace",void 0),B([(0,d.a)(),(0,D.si)(),M("design:type",Boolean)],L.prototype,"welcomeHide",void 0),B([(0,d.a)(),M("design:type",String)],L.prototype,"dateCreated",void 0),B([(0,d.a)(),M("design:type",String)],L.prototype,"lastUpdated",void 0);var N=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},U=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let H=class{databaseService;db;constructor(e){this.databaseService=e}async load(){this.db=await this.databaseService.getDatabase("settings")}async get(){return Object.assign(new L,await this.db.get("single"))}async put(e){e._id="single",await this.db.put(e)}};H=N([(0,s.b)(),U("design:paramtypes",[y])],H);var q=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},G=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class z{_id;_rev;buffer;svg;title;cid;generated;dateCreated}q([(0,d.a)(),G("design:type",String)],z.prototype,"_id",void 0),q([(0,d.a)(),G("design:type",String)],z.prototype,"_rev",void 0),q([(0,d.a)(),G("design:type",Object)],z.prototype,"buffer",void 0),q([(0,d.a)(),G("design:type",String)],z.prototype,"svg",void 0),q([(0,d.a)(),G("design:type",String)],z.prototype,"title",void 0),q([(0,p.rl)(),G("design:type",String)],z.prototype,"cid",void 0),q([(0,d.a)(),G("design:type",Boolean)],z.prototype,"generated",void 0),q([(0,d.a)(),G("design:type",String)],z.prototype,"dateCreated",void 0);var W=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},V=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Z=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-image`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-image`)}async get(e){return Object.assign(new z,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}};Z=W([(0,s.b)(),V("design:paramtypes",[y])],Z);var J=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},K=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Y{_id;_rev;forkedFromId;channelId;tokenId;title;link;description;content;contentHTML;excerpt;authorId;category;attributeSelections;coverImageId;coverImageGenerated;animationId;themes;coverImageCSS;animationCSS;coverImageAsAnimation;originalJSONMetadataId;imageIds;datePublished;dateCreated;lastUpdated}J([(0,d.a)(),K("design:type",String)],Y.prototype,"_id",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"_rev",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"forkedFromId",void 0),J([(0,p.rl)(),K("design:type",String)],Y.prototype,"channelId",void 0),J([(0,p.rl)(),K("design:type",Number)],Y.prototype,"tokenId",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"title",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"link",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"description",void 0),J([(0,d.a)(),K("design:type",Object)],Y.prototype,"content",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"contentHTML",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"excerpt",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"authorId",void 0),J([(0,d.a)(),K("design:type",Array)],Y.prototype,"category",void 0),J([(0,d.a)(),K("design:type",Array)],Y.prototype,"attributeSelections",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"coverImageId",void 0),J([(0,d.a)(),K("design:type",Boolean)],Y.prototype,"coverImageGenerated",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"animationId",void 0),J([(0,d.a)(),K("design:type",Array)],Y.prototype,"themes",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"coverImageCSS",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"animationCSS",void 0),J([(0,d.a)(),K("design:type",Boolean)],Y.prototype,"coverImageAsAnimation",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"originalJSONMetadataId",void 0),J([(0,d.a)(),K("design:type",Array)],Y.prototype,"imageIds",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"datePublished",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"dateCreated",void 0),J([(0,d.a)(),K("design:type",String)],Y.prototype,"lastUpdated",void 0);let Q=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}})}},{id:"1",changeset:async e=>{await e.put({_id:"_design/attribute_counts",views:{attribute_counts:{map:function(e){if(e.attributeSelections?.length>0)for(let t of e.attributeSelections)emit([e.channelId,t.traitType,t.value])}.toString(),reduce:"_count"}}})}},{id:"5",changeset:async e=>{await e.put({_id:"_design/by_channel_token",views:{by_channel_token:{map:function(e){emit([e.channelId,e.tokenId])}.toString()}}}),await e.put({_id:"_design/by_channel_token_stats",views:{by_channel_token_stats:{map:function(e){emit(e.channelId,e.tokenId)}.toString(),reduce:"_stats"}}})}},{id:"6",changeset:async e=>{await e.createIndex({index:{fields:["animationId"]}}),await e.put({_id:"_design/by_image_id",views:{by_image_id:{map:function(e){if(e.imageIds&&e.imageIds?.length>0)for(let t of e.imageIds)emit(t)}.toString()}}})}}];var X=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},ee=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let te=class{databaseService;static CHUNK_SIZE=35;changesets=Q;db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-item`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-item`)}async get(e){return Object.assign(new Y,await this.db.get(e))}async getIds(){return(await this.db.allDocs({include_docs:!0})).rows.filter((e=>!e.id.startsWith("_design")&&!e.id.startsWith("_local"))).sort(((e,t)=>parseInt(e.value.tokenId)-parseInt(t.value.tokenId))).map((e=>e.id))}async getLatestRevision(e){return Object.assign(new Y,await this.databaseService.getLatestRevision(this.db,e))}async getByTokenId(e,t){let a=await this.db.query("by_channel_token",{reduce:!1,include_docs:!0,key:[e,t],limit:1});if(a.rows?.length>0)return Object.assign(new Y,a.rows[0].doc)}async put(e){await this.db.put(e)}async listByChannel(e,t,a){let i=[],n=await this.db.query("by_channel_token",{reduce:!1,include_docs:!0,startkey:[e,0],endkey:[e,{}],limit:t,skip:a});if(n.rows?.length>0)for(let e of n.rows)i.push(Object.assign(new Y,e.doc));return i}async delete(e){await this.db.remove(e)}async getAttributeCountByChannel(e){return(await this.db.query("attribute_counts",{reduce:!0,startKey:[e,"",""],endKey:[e,{},{}],include_docs:!1,group_level:3})).rows.map((t=>({traitType:t.key[1],value:t.key[2],count:t.value,channelId:e})))}async getAttributeInfoBySelections(e,t){return(await this.db.query("attribute_counts",{reduce:!0,keys:t.map((t=>[e,t.traitType,t.value])),include_docs:!1,group_level:3})).rows.map((t=>({traitType:t.key[1],value:t.key[2],count:t.value,channelId:e})))}async getByImageId(e){let t=await this.db.query("by_image_id",{reduce:!1,include_docs:!0,key:e});return t.rows?.map((e=>e.doc))}async getByAnimationId(e){return(await this.db.find({selector:{animationId:{$eq:e}}})).docs}};te=X([(0,s.b)(),ee("design:paramtypes",[y])],te);var ae=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},ie=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class ne{_id;_rev;forkedFromId;channelId;name;slug;content;contentHTML;contentMarkdown;locations;dateCreated;lastUpdated}ae([(0,d.a)(),ie("design:type",String)],ne.prototype,"_id",void 0),ae([(0,d.a)(),ie("design:type",String)],ne.prototype,"_rev",void 0),ae([(0,d.a)(),ie("design:type",String)],ne.prototype,"forkedFromId",void 0),ae([(0,p.rl)(),ie("design:type",String)],ne.prototype,"channelId",void 0),ae([(0,p.rl)(),ie("design:type",String)],ne.prototype,"name",void 0),ae([(0,p.rl)(),ie("design:type",String)],ne.prototype,"slug",void 0),ae([(0,d.a)(),ie("design:type",Object)],ne.prototype,"content",void 0),ae([(0,d.a)(),ie("design:type",String)],ne.prototype,"contentHTML",void 0),ae([(0,d.a)(),ie("design:type",String)],ne.prototype,"contentMarkdown",void 0),ae([(0,d.a)(),ie("design:type",Array)],ne.prototype,"locations",void 0),ae([(0,d.a)(),ie("design:type",String)],ne.prototype,"dateCreated",void 0),ae([(0,d.a)(),ie("design:type",String)],ne.prototype,"lastUpdated",void 0);var se=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},oe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let re=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["channelId"]}}),await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-static-page`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-static-page`)}async get(e){return Object.assign(new ne,await this.db.get(e))}async getIds(){return(await this.db.allDocs({include_docs:!1})).rows.filter((e=>!e.id.startsWith("_design")&&!e.id.startsWith("_local"))).map((e=>e.id))}async getLatestRevision(e){return Object.assign(new ne,await this.databaseService.getLatestRevision(this.db,e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async listByChannel(e,t,a){return(await this.db.find({selector:{channelId:{$eq:e},dateCreated:{$exists:!0}},sort:[{dateCreated:"asc"}],limit:t,skip:a})).docs}};re=se([(0,s.b)(),oe("design:paramtypes",[y])],re);var ce=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},le=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class fe{_id;_rev;forkedFromId;channelId;name;coverImageCSS;animationCSS;dateCreated;lastUpdated}ce([(0,d.a)(),le("design:type",String)],fe.prototype,"_id",void 0),ce([(0,d.a)(),le("design:type",String)],fe.prototype,"_rev",void 0),ce([(0,d.a)(),le("design:type",String)],fe.prototype,"forkedFromId",void 0),ce([(0,p.rl)(),le("design:type",String)],fe.prototype,"channelId",void 0),ce([(0,p.rl)(),le("design:type",String)],fe.prototype,"name",void 0),ce([(0,d.a)(),le("design:type",String)],fe.prototype,"coverImageCSS",void 0),ce([(0,d.a)(),le("design:type",String)],fe.prototype,"animationCSS",void 0),ce([(0,d.a)(),le("design:type",String)],fe.prototype,"dateCreated",void 0),ce([(0,d.a)(),le("design:type",String)],fe.prototype,"lastUpdated",void 0);var de=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},pe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ue=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["channelId"]}}),await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-theme`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-theme`)}async get(e){return Object.assign(new fe,await this.db.get(e))}async getIds(){return(await this.db.allDocs({include_docs:!1})).rows.filter((e=>!e.id.startsWith("_design")&&!e.id.startsWith("_local"))).map((e=>e.id))}async getLatestRevision(e){return Object.assign(new fe,await this.databaseService.getLatestRevision(this.db,e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async listByChannel(e,t,a){return(await this.db.find({selector:{channelId:{$eq:e},dateCreated:{$exists:!0}},sort:[{dateCreated:"asc"}],limit:t,skip:a})).docs}};ue=de([(0,s.b)(),pe("design:paramtypes",[y])],ue);var he=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},me=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class ge{_id;_rev;tokenMetadata;dateCreated}he([(0,d.a)(),me("design:type",String)],ge.prototype,"_id",void 0),he([(0,d.a)(),me("design:type",String)],ge.prototype,"_rev",void 0),he([(0,d.a)(),me("design:type",Object)],ge.prototype,"tokenMetadata",void 0),he([(0,d.a)(),me("design:type",String)],ge.prototype,"dateCreated",void 0);var ve=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},be=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ye=class{databaseService;db;constructor(e){this.databaseService=e}async load(){this.db=await this.databaseService.getDatabase("token-metadata-cache")}async get(e){return Object.assign(new ge,await this.db.get(e))}async put(e){await this.db.put(e)}};ye=ve([(0,s.b)(),be("design:paramtypes",[y])],ye);var we=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Se=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class $e{_id;_rev;result;stale;lastUpdated;dateCreated}we([(0,d.a)(),Se("design:type",String)],$e.prototype,"_id",void 0),we([(0,d.a)(),Se("design:type",String)],$e.prototype,"_rev",void 0),we([(0,d.a)(),Se("design:type",Object)],$e.prototype,"result",void 0),we([(0,d.a)(),Se("design:type",Boolean)],$e.prototype,"stale",void 0),we([(0,d.a)(),Se("design:type",String)],$e.prototype,"lastUpdated",void 0),we([(0,d.a)(),Se("design:type",String)],$e.prototype,"dateCreated",void 0);var ke=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Ie=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Re=class{databaseService;db;constructor(e){this.databaseService=e}async load(){this.db=await this.databaseService.getDatabase("query-cache")}async get(e){return Object.assign(new $e,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}};Re=ke([(0,s.b)(),Ie("design:paramtypes",[y])],Re);var xe=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},_e=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Pe{_id;_rev;channelId;traitType;value;count;lastUpdated;dateCreated}xe([(0,d.a)(),_e("design:type",String)],Pe.prototype,"_id",void 0),xe([(0,d.a)(),_e("design:type",String)],Pe.prototype,"_rev",void 0),xe([(0,d.a)(),_e("design:type",String)],Pe.prototype,"channelId",void 0),xe([(0,d.a)(),_e("design:type",String)],Pe.prototype,"traitType",void 0),xe([(0,d.a)(),_e("design:type",String)],Pe.prototype,"value",void 0),xe([(0,d.a)(),_e("design:type",Number)],Pe.prototype,"count",void 0),xe([(0,d.a)(),_e("design:type",String)],Pe.prototype,"lastUpdated",void 0),xe([(0,d.a)(),_e("design:type",String)],Pe.prototype,"dateCreated",void 0);var Ce=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Te=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ae=class{databaseService;db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-attribute-counts`)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-attribute-counts`)}async get(e){return Object.assign(new Pe,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}};Ae=Ce([(0,s.b)(),Te("design:paramtypes",[y])],Ae);var Oe=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},je=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Fe{_id;_rev;content;cid;dateCreated}Oe([(0,d.a)(),je("design:type",String)],Fe.prototype,"_id",void 0),Oe([(0,d.a)(),je("design:type",String)],Fe.prototype,"_rev",void 0),Oe([(0,d.a)(),je("design:type",String)],Fe.prototype,"content",void 0),Oe([(0,p.rl)(),je("design:type",String)],Fe.prototype,"cid",void 0),Oe([(0,d.a)(),je("design:type",String)],Fe.prototype,"dateCreated",void 0);var Ee=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},De=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Be=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-original-metadata`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-original-metadata`)}async get(e){return Object.assign(new Fe,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}};Be=Ee([(0,s.b)(),De("design:paramtypes",[y])],Be);var Me=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Le=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Ne{_id;_rev;cid;content;dateCreated}Me([(0,d.a)(),Le("design:type",String)],Ne.prototype,"_id",void 0),Me([(0,d.a)(),Le("design:type",String)],Ne.prototype,"_rev",void 0),Me([(0,p.rl)(),Le("design:type",String)],Ne.prototype,"cid",void 0),Me([(0,d.a)(),Le("design:type",Uint8Array)],Ne.prototype,"content",void 0),Me([(0,d.a)(),Le("design:type",String)],Ne.prototype,"dateCreated",void 0);var Ue=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},He=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let qe=class{databaseService;db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-car`)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-car`)}async get(e){return Object.assign(new Ne,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}};qe=Ue([(0,s.b)(),He("design:paramtypes",[y])],qe);var Ge=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},ze=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let We=class{authorRepository;channelRepository;imageRepository;itemRepository;settingsRepository;animationRepository;themeRepository;staticPageRepository;tokenMetadataCacheRepository;queryCacheRepository;attributeCountRepository;originalMetadataRepository;carRepository;databaseService;loadedChannelId;constructor(e,t,a,i,n,s,o,r,c,l,f,d,p,u){this.authorRepository=e,this.channelRepository=t,this.imageRepository=a,this.itemRepository=i,this.settingsRepository=n,this.animationRepository=s,this.themeRepository=o,this.staticPageRepository=r,this.tokenMetadataCacheRepository=c,this.queryCacheRepository=l,this.attributeCountRepository=f,this.originalMetadataRepository=d,this.carRepository=p,this.databaseService=u}async load(){console.log("Loading databases"),await this.channelRepository.load(),await this.settingsRepository.load(),await this.tokenMetadataCacheRepository.load(),await this.queryCacheRepository.load()}async loadChannel(e){this.loadedChannelId!=e&&(console.time(`Loading channel: ${e}`),await this.authorRepository.load(e),await this.itemRepository.load(e),await this.animationRepository.load(e),await this.originalMetadataRepository.load(e),await this.imageRepository.load(e),await this.themeRepository.load(e),await this.staticPageRepository.load(e),await this.attributeCountRepository.load(e),await this.carRepository.load(e),this.loadedChannelId=e,console.timeEnd(`Loading channel: ${e}`))}async loadEmptyChannel(e){this.loadedChannelId!=e&&(console.time(`Loading empty channel: ${e}`),await this.authorRepository.loadEmpty(e),await this.itemRepository.loadEmpty(e),await this.animationRepository.loadEmpty(e),await this.originalMetadataRepository.loadEmpty(e),await this.imageRepository.loadEmpty(e),await this.themeRepository.loadEmpty(e),await this.staticPageRepository.loadEmpty(e),await this.attributeCountRepository.loadEmpty(e),await this.carRepository.loadEmpty(e),this.loadedChannelId=e,console.timeEnd(`Loading empty channel: ${e}`))}async loadChannelBackup(e){console.time("Loading channel from backup"),await this.loadEmptyChannel(e.channel._id),console.log(`Loading:\n            Items: ${e.items?e.items.length:0}\n            Themes: ${e.themes?e.themes.length:0}\n            Static Pages: ${e.staticPages?e.staticPages.length:0}\n            Attribute Counts: ${e.attributeCounts?e.attributeCounts.length:0}\n            Authors: ${e.authors?e.authors.length:0}\n            Original Metadata: ${e.originalMetadata?e.originalMetadata.length:0}\n\n        `);const t=e=>{e.map((e=>{delete e._rev,delete e._rev_tree}))};t(e.items),t(e.themes),t(e.staticPages),t(e.attributeCounts),t(e.authors),t(e.originalMetadata),await this.itemRepository.db.bulkDocs(e.items),await this.themeRepository.db.bulkDocs(e.themes),await this.staticPageRepository.db.bulkDocs(e.staticPages),await this.attributeCountRepository.db.bulkDocs(e.attributeCounts),await this.authorRepository.db.bulkDocs(e.authors),await this.channelRepository.db.bulkDocs([e.channel]),await this.originalMetadataRepository.db.bulkDocs(e.originalMetadata),console.timeEnd("Loading channel from backup")}async backupChannel(){let e=await this.channelRepository.get(this.loadedChannelId),t=await this.itemRepository.db.allDocs({include_docs:!0}),a=await this.animationRepository.db.allDocs({include_docs:!0}),i=await this.imageRepository.db.allDocs({include_docs:!0}),n=await this.themeRepository.db.allDocs({include_docs:!0}),s=await this.staticPageRepository.db.allDocs({include_docs:!0}),o=await this.attributeCountRepository.db.allDocs({include_docs:!0}),r=await this.authorRepository.db.allDocs({include_docs:!0}),c=await this.originalMetadataRepository.db.allDocs({include_docs:!0});return{channel:e,items:t.rows.map((e=>e.doc)),animations:a.rows.map((e=>e.doc)),images:i.rows.map((e=>e.doc)),themes:n.rows.map((e=>e.doc)),staticPages:s.rows.map((e=>e.doc)),attributeCounts:o.rows.map((e=>e.doc)),authors:r.rows.map((e=>e.doc)),originalMetadata:c.rows.map((e=>e.doc))}}async dropChannel(e){console.log(`Dropping channel: ${e}`);let t=async e=>{let t=[],a=await e.allDocs();for(let e of a.rows)e.id.startsWith("_design")||e.id.startsWith("_local")||t.push({_id:e.id,_rev:e.value.rev,_deleted:!0});const i=await e.info();await e.bulkDocs(t),await e.compact(),delete this.databaseService.dbCache[i.db_name]};await t(this.authorRepository.db),await t(this.itemRepository.db),await t(this.animationRepository.db),await t(this.originalMetadataRepository.db),await t(this.imageRepository.db),await t(this.themeRepository.db),await t(this.staticPageRepository.db),await t(this.attributeCountRepository.db),await t(this.carRepository.db)}};function Ve(e,{$on:t,$f7:a,$update:i}){let s=n.getInstance("version");const o=document.getElementById("footer-template")?.content?.cloneNode(!0);let r;if(o){const e=new XMLSerializer;r=e.serializeToString(o)}return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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


`}}We=Ge([(0,s.b)(),ze("design:paramtypes",[P,E,Z,te,H,$,ue,re,ye,Re,Ae,Be,qe,y])],We),Ve.id="d2c3a54d06",Ve.style="\n\n\n";const Ze=Ve;function Je(e,{$on:t,$f7ready:a,$f7:i,$f7router:s,$update:o}){return a((async()=>{let e,t,a=window.location.pathname,s=window.location.hash?.length>2?window.location.hash.substring(2):void 0,r=n.getInstance(f),c=n.getWalletService(),l=n.getInstance(We);const d=async e=>{t=void 0,c.provider||await c.initProvider(),t=await c.getAddress(),t&&(c.address=t,c.wallet||await c.connect()),await o()};document.addEventListener("connect-wallet",(async e=>{await(async e=>{await c.initWallet(),await c.connect(),await d()})()})),await async function(){r.showSpinner("Loading..."),await l.load(),await d(),e=i.views.create(".view-main",{url:s||"/",browserHistory:!0,browserHistoryRoot:a,reloadCurrent:!0}),r.hideSpinner()}()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`
  <div id="app">


    <!-- Status bar overlay for fullscreen mode-->
    <div class="statusbar"></div>

    <div class="view view-main" >

      <${Ze} />

    </div>



  </div>

`}}Je.id="40aea7772a";const Ke=Je;var Ye=a(74929),Qe=a(81216),Xe=a(70225),et=a(27083),tt=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},at=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},it=function(e,t){return function(a,i){t(a,i,e)}};let nt=class{app;constructor(e){this.app=e}async queuePromiseView(e){const t=this;let a={id:st.newGuid(),icon:e.icon,title:e.title};return async function(){return new Promise(((e,i)=>{t._beforeSaveAction(a),e()}))}().then((async function(){let i=await e.promise;try{t._showSuccess(i,a)}catch(e){t._showError(e,a)}return i}))}_beforeSaveAction(e){e.toast=this.app.toast.create({text:e.title,closeButton:!1}),e.toast.open()}_showError(e,t){t.toast.close(),console.log(e);let a={text:e.message,closeButton:!0,closeButtonText:"Close",closeTimeout:5e3};this.app.toast.create(a).open()}_showSuccess(e,t){t.toast.close();this.app.toast.create({text:"Transaction Submitted",closeButton:!0,closeTimeout:5e3}).open()}};nt=tt([(0,s.b)(),it(0,(0,o.f)("framework7")),at("design:paramtypes",[Object])],nt);class st{static newGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}}var ot=a(88554),rt=a(99810),ct=a(52777),lt=a.n(ct),ft=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},dt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const{toDelta:pt}=lt();let ut=class{constructor(){}async translateContent(e,t=!1){if(!e?.ops)return"";const a=new ot.bc(e.ops,{encodeHtml:!1});return a.renderCustomWith(ht(t)),a.convert()}async translateContentEncodeHtml(e,t=!1){if(!e?.ops)return"";const a=new ot.bc(e.ops,{});return a.renderCustomWith(ht(t)),a.convert()}async generateMarkdown(e){return(0,rt.deltaToMarkdown)(e.ops)}async deltaFromMarkdown(e){return pt(e)}};ut=ft([(0,s.b)(),dt("design:paramtypes",[])],ut);const ht=e=>function(t,a){if("divider"===t.insert.type)return"<hr />";if("ipfsimage"===t.insert.type){let a="<img ";return e||(a+=`src="${t.insert.value.src}" `),t.insert.value.width&&(a+=`width="${t.insert.value.width}" `),t.insert.value.height&&(a+=`height="${t.insert.value.height}" `),t.insert.value.style&&(a+=`style="${t.insert.value.style}"`),a+="/>",a}};var mt=a(76095),gt=a.n(mt),vt=a(57883),bt=a(3721),yt=(a(92194),a(30496)),wt=a.n(yt),St=a(42555),$t=a.n(St),kt=a(86492),It=a.n(kt),Rt=a(60725);class xt extends Error{errors;constructor(e){super(),this.errors=e}}var _t=a(57393),Pt=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Ct=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Tt=class{constructor(){}async fromText(e,t,a,i){let n="140px",s="160px";return e&&(t=`<span class='svg-title'>${e}</span><br /><br /><span class='svg-text'>${t}</span>`),t.length>50&&t.length<=100&&(n="110px",s="130px"),t.length>100&&t.length<=175&&(n="90px",s="110px"),t.length>175&&(n="75px",s="95px"),`<svg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg' version='1.1'>\n            <style>\n                * {\n                    --lh: ${s};\n                    height:100%;\n                    margin: 0;\n                    padding: 0;\n                    box-sizing: border-box;\n                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n                }\n\n\n                @keyframes gradient {\n                    0% {\n                        background-position: 0% 50%;\n                    }\n                    25% {\n                        background-position: 50%% 50%;\n                    }\n                    50% {\n                        background-position: 100% 50%;\n                    }\n                    75% {\n                        background-position: 50% 50%;\n                    }\n                    100% {\n                        background-position: 0% 50%;\n                    }\n                }\n\n\n                .svg-h1 {\n\n                    border: 25px solid rgb(78,130,177);\n                    \n                    background: rgb(241,241,241);\n                    background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);\n                    background-size: 400% 400%;\n                    animation: gradient 15s ease infinite;\n\n                    text-align: center;\n                    font-size: ${n};\n                    padding: 70px;            \n                    line-height: var(--lh);\n                    height: 1200px;\n                    width: 1200px;  \n                    -webkit-mask-image: linear-gradient(180deg, rgb(0,0,0) 60%, transparent);        \n                }\n\n                .svg-title {\n                    font-weight: 700;\n                    font-size: 1.25em;\n                }\n\n                .svg-text {\n                    width: 100%;\n                    font-weight: 500;\n                }\n\n                ${i||""}\n\n                ${a||""}\n\n            </style>\n            <g>\n                <foreignObject x='0' y='0' width='1200' height='1200'>\n                    <h1 class="svg-h1" xmlns='http://www.w3.org/1999/xhtml'>${t}</h1>\n                </foreignObject>\n            </g>\n        </svg>`}};Tt=Pt([(0,s.b)(),Ct("design:paramtypes",[])],Tt);var At=a(28721),Ot=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},jt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Ft=function(e,t){return function(a,i){t(a,i,e)}};let Et=class{themeRepository;walletService;db;constructor(e,t){this.themeRepository=e,this.walletService=t}async get(e){return this.themeRepository.get(e)}async getIds(){return this.themeRepository.getIds()}async getLatestRevision(e){return this.themeRepository.getLatestRevision(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=(0,At.Z)(),e.dateCreated=(new Date).toJSON());let t=await(0,_t.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new xt(t);await this.themeRepository.put(e)}async delete(e){return this.themeRepository.delete(e)}async listByChannel(e,t,a){return this.themeRepository.listByChannel(e,t,a)}};Et=Ot([(0,s.b)(),Ft(1,(0,o.f)(i.WalletService)),jt("design:paramtypes",[ue,Object])],Et);var Dt=a(48764).Buffer,Bt=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Mt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Lt=class{imageRepository;svgService;quillService;themeService;db;constructor(e,t,a,i){this.imageRepository=e,this.svgService=t,this.quillService=a,this.themeService=i}async load(e){this.db=await this.imageRepository.load(e)}async get(e){return this.imageRepository.get(e)}async put(e){e._id||(e._id=e.cid,e.dateCreated=(new Date).toJSON());let t=await(0,_t.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new xt(t);await this.imageRepository.put(e)}async delete(e){await this.imageRepository.delete(e)}async newFromBuffer(e){const t=new z;return t.buffer=e,t.cid=await Rt.of(e),t.generated=!1,t}async newFromSvg(e){const t=new z;return t.svg=e,t.cid=await Rt.of(t.svg),t.generated=!0,t}async getUrl(e){if(!e.buffer&&!e.svg)return"";if(e.buffer){let t=this.bufferToBlob(e.buffer);return this.blobToDataURL(t)}return e.svg?this.getSVGURL(e):void 0}async getSVGURL(e){return e.svg?this.svgToDataURL(e.svg):""}bufferToBlob(e){if(null!=Blob)return new Blob([e],{type:"image/jpg"})}blobToDataURL(e){let t;return new Promise(((a,i)=>{const n=new FileReader;n.onload=async function(){t=n.result,a(t)},n.readAsDataURL(e)}))}svgToDataURL(e){return $t()(e)}async newFromItem(e){let t=await this.quillService.translateContentEncodeHtml(e.content),a=[];if(e.themes)for(let t of e.themes)a.push(await this.themeService.get(t));let i="";if(a?.length>0)for(let e of a?.map((e=>e?.coverImageCSS)))e?.length>0&&(i+=e);let n=this.getExcerptByFirstParagraph(t,{pruneLength:500});if(!n||0==n.length)throw new Error("No text");const s=new z;return s.svg=await this.svgService.fromText(e.title,n,e.coverImageCSS,i),s.cid=await Rt.of(s.svg),s.generated=!0,s}getExcerptByFirstParagraph(e,t){e=It().unescape(e);const a="number"==typeof t.pruneLength?t.pruneLength:140;return a>0&&(e=wt()(e,a,{ellipsis:""})),e=It().encode(e,{allowUnsafeSymbols:!0})}async getByIds(e){return this.imageRepository.getByIds(e)}async getImageContent(e){let t;return e.buffer?t=t instanceof Uint8Array?e.buffer:e.buffer.data?.length>0?new Uint8Array(e.buffer.data):Dt.from(Object.values(e.buffer)):e.svg&&(t=(new TextEncoder).encode(e.svg)),t}async loadImage(e,t){return new Promise((function(a,i){e.onload=function(){a()},e.src=URL.createObjectURL(new Blob([t],{type:"image/jpg"}))}))}async phlipImage(e){const t=document.createElement("canvas");t.width=e.naturalWidth,t.height=e.naturalHeight;const a=t.getContext("2d");a.scale(-1,1),a.drawImage(e,-t.width,0);const i=a.getImageData(0,0,t.width,t.height),n=new Uint8Array(i.data.length);for(let e=0;e<i.data.length;e++)n[e]=i.data[e];return n}};Lt=Bt([(0,s.b)(),Mt("design:paramtypes",[Z,Tt,ut,Et])],Lt);var Nt=a(37086),Ut=a(53440),Ht=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},qt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Gt=class{settingsRepository;constructor(e){this.settingsRepository=e}async get(){let e;try{e=await this.settingsRepository.get()}catch(e){}return e||Object.assign(new L,{_id:"single",defaultGitProvider:"github",gitProviders:{gitlab:{name:"gitlab"},github:{name:"github"}},welcomeHide:!1})}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id="single",e.dateCreated=(new Date).toJSON());let t=await(0,_t.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new xt(t);await this.settingsRepository.put(e)}};Gt=Ht([(0,s.b)(),qt("design:paramtypes",[H])],Gt);var zt=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Wt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Vt=class{settingsService;inference;constructor(e){this.settingsService=e}async init(){let e=await this.settingsService.get();e.huggingFace&&(this.inference=new Ut.LF(e.huggingFace))}async generateImage(e,t,a){let i={inputs:t,parameters:{width:1200,height:1200},model:e};return a&&(i.parameters.negative_prompt=a),this.inference.textToImage(i)}};Vt=zt([(0,s.b)(),Wt("design:paramtypes",[Gt])],Vt);var Zt=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Jt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Kt=class{imageService;huggingFaceService;uiService;activeEditor;initialized=!1;constructor(e,t,a){this.imageService=e,this.huggingFaceService=t,this.uiService=a}init(){if(this.initialized)return;gt().register("modules/imageDropAndPaste",vt.Z),gt().register("modules/blotFormatter",bt.ZP),gt().debug(!1);let e=gt().import("blots/inline");class t extends e{static blotName;static tagName}t.blotName="bold",t.tagName="strong";class a extends e{static blotName;static tagName}a.blotName="italic",a.tagName="em";let i=gt().import("blots/block");class n extends i{static blotName;static tagName}n.blotName="blockquote",n.tagName="blockquote";class s extends i{static blotName;static tagName;static formats(e){return s.tagName.indexOf(e.tagName)+1}}s.blotName="header",s.tagName=["H1","H2"];let o=gt().import("blots/block/embed");class r extends o{static blotName;static tagName}r.blotName="divider",r.tagName="hr";class c extends o{static blotName;static tagName;static create(e){let t=super.create();return t.setAttribute("src",e.src),t.setAttribute("data-cid",e.cid),e.width&&t.setAttribute("width",e.width),e.height&&t.setAttribute("height",e.height),e.style&&t.setAttribute("style",e.style),t}static value(e){return{src:e.getAttribute("src"),cid:e.getAttribute("data-cid"),width:e.getAttribute("width"),height:e.getAttribute("height"),style:e.getAttribute("style")}}}c.blotName="ipfsimage",c.tagName="img",gt().register(c),gt().register(n),gt().register(t),gt().register(a),this.initialized=!0}buildQuillPostEditor(e,t){return this.init(),this.activeEditor=new(gt())(e,{bounds:".page-content",modules:{imageDropAndPaste:{handler:(e,t,a)=>{this.imageDropAndPasteHandler(e,t,a)}},toolbar:t,blotFormatter:{specs:[Qt],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}},handlers:{link:e=>{if(e){var t=prompt("Enter the URL");this.quill.format("link",t)}else this.quill.format("link",!1)}},theme:"snow"}),this.activeEditor}async generateAIImage(e,t){this.uiService.showSpinner("Generating AI image. This may take a few minutes...");let a=await this.huggingFaceService.generateImage(e,t);await this.insertBlobInEditor(a,this.activeEditor),this.uiService.hideSpinner()}imageClick(){}async imageSelected(e){this.uiService.showSpinner("Processing image..."),this.insertImage(e.files[0]),this.uiService.hideSpinner()}async insertImage(e){let t=await this.insertImageInEditor(e,this.activeEditor);const a=new CustomEvent("image-selected",{detail:{_id:t._id}});document.dispatchEvent(a)}async insertImageInEditor(e,t){let a=await(0,Nt.readAndCompressImage)(e,{maxWidth:1024});return this.insertBlobInEditor(a,t)}async insertBlobInEditor(e,t){let a=await e.arrayBuffer(),i=await this.imageService.newFromBuffer(new Uint8Array(a));try{await this.imageService.put(i)}catch(e){console.log(e)}let n=await this.imageService.getUrl(i),s=await this.getHeightAndWidthFromDataUrl(n),o=t.getSelection(!0);t.insertText(o.index,"\n",gt().sources.USER);let r=(c=s.width,l=s.height,f=500/c,d=500/l,p=Math.min(f,d),{width:Math.floor(c*p),height:Math.floor(l*p)});var c,l,f,d,p;return t.insertEmbed(o.index,"ipfsimage",{cid:i.cid,src:n,height:r.height,width:r.width},gt().sources.USER),t.setSelection(o.index+2,gt().sources.SILENT),i}async imageDropAndPasteHandler(e,t,a){const i=a.toFile();await this.insertImage(i)}async getHeightAndWidthFromDataUrl(e){return new Promise((t=>{const a=new Image;a.onload=()=>{t({height:a.height,width:a.width})},a.src=e}))}};Kt=Zt([(0,s.b)(),Jt("design:paramtypes",[Lt,Vt,f])],Kt);class Yt extends bt.sL{keyUpListener;onCreate(){const e=this;this.keyUpListener=function(t){e.onKeyUp(t)},document.addEventListener("keyup",e.keyUpListener,!0),this.formatter.quill.root.addEventListener("input",e.keyUpListener,!0)}onDestroy(){document.removeEventListener("keyup",this.keyUpListener),this.formatter.quill.root.removeEventListener("input",this.keyUpListener)}onKeyUp(e){if(this.formatter.currentSpec&&(46===e.keyCode||8===e.keyCode)){const e=gt().find(this.formatter.currentSpec.getTargetElement());e&&e.deleteAt(0),this.formatter.hide()}}}class Qt extends bt.N6{getActions(){return[bt.oi,bt.Ce,Yt]}}var Xt=a(48764),ea=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},ta=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let aa=class{constructor(){}async uploadFile(e){let t;return new Promise(((a,i)=>{const n=new FileReader;n.onload=async function(){t=new Xt.Buffer(n.result),t&&a(t)},e.files.length>0?n.readAsArrayBuffer(e.files[0]):a(t)}))}};aa=ea([(0,s.b)(),ta("design:paramtypes",[])],aa);var ia=a(48737),na=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},sa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},oa=function(e,t){return function(a,i){t(a,i,e)}};let ra=class{contracts;getProvider;$f7;wallet;address;ethersContracts={};provider;constructor(e,t,a){this.contracts=e,this.getProvider=t,this.$f7=a}async initProvider(){this.provider=this.getProvider(),globalThis.ethereum?.on("accountsChanged",(async e=>{delete this.address,e?.length>0&&await this.initWallet(),this.$f7.views.main.router.refreshPage()}))}async initWallet(){console.log("Init wallet"),delete this.address,this.provider||await this.initProvider();let e=await this.provider.send("eth_accounts",[]);if(e?.length>0)return this.connect();console.log("Init wallet complete")}async connect(){console.log("Connect wallet"),await this.provider.send("eth_requestAccounts",[]),this.wallet=await this.provider.getSigner(),this.address=await this.getAddress(),console.log(`Wallet ${this.address} connected`)}async getAddress(){if(!this.provider)return;let e=await this.provider.send("eth_accounts",[]);return e?.length>0?e[0]:void 0}async getWallet(){return this.provider.getSigner()}getContract(e){if(this.ethersContracts[e]&&this.ethersContracts[e].signer==this.wallet)return this.ethersContracts[e];let t=this.contracts.Channel;return this.ethersContracts[e]=new ia.CH(e,t.abi,this.wallet?this.wallet:this.provider),this.ethersContracts[e]}truncateEthAddress(e){const t=e.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);return t?`${t[1]}…${t[2]}`:e}};ra=na([(0,s.b)(),oa(0,(0,o.f)("contracts")),oa(1,(0,o.f)("provider")),oa(2,(0,o.f)("framework7")),sa("design:paramtypes",[Array,Function,Object])],ra);var ca=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},la=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},fa=function(e,t){return function(a,i){t(a,i,e)}};let da=class{authorRepository;walletService;db;constructor(e,t){this.authorRepository=e,this.walletService=t}async load(e){this.db=await this.authorRepository.load(e)}async get(e){return this.authorRepository.get(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=e.walletAddress,e.dateCreated=(new Date).toJSON());let t=await(0,_t.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new xt(t);return this.authorRepository.put(e)}async insertIfNew(e){let t;try{t=await this.get(e)}catch(e){}t||await this.put(Object.assign(new R,{_id:e,walletAddress:e}))}getDisplayName(e){if(e)return e.name?e.name:this.walletService.truncateEthAddress(e._id)}async getLatestRevision(e){return this.authorRepository.getLatestRevision(e)}};da=ca([(0,s.b)(),fa(1,(0,o.f)(i.WalletService)),la("design:paramtypes",[P,Object])],da);var pa=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},ua=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ha=class{queryCacheRepository;constructor(e){this.queryCacheRepository=e}async put(e){e||((e=new $e).dateCreated=(new Date).toJSON()),e.lastUpdated=(new Date).toJSON(),await this.queryCacheRepository.put(e)}async get(e){return this.queryCacheRepository.get(e)}async delete(e){console.log(e),await this.queryCacheRepository.delete(e)}};ha=pa([(0,s.b)(),ua("design:paramtypes",[Re])],ha);var ma=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},ga=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let va=class{originalMetadataRepository;db;constructor(e){this.originalMetadataRepository=e}async get(e){return this.originalMetadataRepository.get(e)}async put(e){e._id||(e._id=e.cid,e.dateCreated=(new Date).toJSON());let t=await(0,_t.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new xt(t);await this.originalMetadataRepository.put(e)}async delete(e){await this.originalMetadataRepository.delete(e)}async getByIds(e){return this.originalMetadataRepository.getByIds(e)}async newFromText(e){const t=new Fe;return t.content=e,t.cid=await Rt.of(t.content),t}};va=ma([(0,s.b)(),ga("design:paramtypes",[Be])],va);var ba=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},ya=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let wa=class{itemRepository;imageService;queryCacheService;originalMetadataService;constructor(e,t,a,i){this.itemRepository=e,this.imageService=t,this.queryCacheService=a,this.originalMetadataService=i}async get(e){return this.itemRepository.get(e)}async getIds(){return this.itemRepository.getIds()}async getLatestRevision(e){return this.itemRepository.getLatestRevision(e)}async getByTokenId(e,t){return this.itemRepository.getByTokenId(e,t)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=(0,At.Z)(),e.dateCreated=(new Date).toJSON(),null==e.tokenId&&(e.tokenId=await this.getNextTokenId(e.channelId)));let t=await(0,_t.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new xt(t);await this.itemRepository.put(e)}async delete(e){await this.itemRepository.delete(e)}async getByImageId(e){return this.itemRepository.getByImageId(e)}async getByAnimationId(e){return this.itemRepository.getByAnimationId(e)}async listByChannel(e,t,a){return this.itemRepository.listByChannel(e,t,a)}async exportNFTMetadata(e,t,a){if("existing"==e.forkType){console.log(`Exporting original metadata for token #${t.tokenId}`);let e=await this.originalMetadataService.get(t.originalJSONMetadataId);return JSON.parse(e.content)}let i={tokenId:t.tokenId,name:t.title,description:t.description};return t.animationId&&!t.coverImageAsAnimation&&(i.animation_url=`ipfs://${t.animationId}`),t.coverImageId&&(i.image=`ipfs://${a.cid}`),e.attributeOptions.length>0&&(i.attributes=e.attributeOptions.map((e=>{let a=t?.attributeSelections?.filter((t=>e.traitType==t.traitType));return{trait_type:e.traitType,value:a?.length>0?a[0].value:""}}))),i}async setDefaultCoverImage(e){let t=await this.imageService.newFromItem(e),a=await this.get(t.cid);a?e.coverImageId=a._id:(await this.imageService.put(t),e.coverImageId=t._id)}async getNextTokenId(e){let t;try{t=await this.queryCacheService.get(`token_id_stats_by_channel_${e}`);let a=t?.result;return a?.max?a.max+1:1}catch(e){}return 1}async getAttributeCountByChannel(e){return this.itemRepository.getAttributeCountByChannel(e)}async getAttributeInfoBySelections(e,t){return this.itemRepository.getAttributeInfoBySelections(e,t)}};wa=ba([(0,s.b)(),ya("design:paramtypes",[te,Lt,ha,va])],wa);var Sa=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},$a=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ka=class{attributeCountRepository;db;constructor(e){this.attributeCountRepository=e}async get(e){return this.attributeCountRepository.get(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=`${e.channelId}-${e.traitType}-${e.value}`,e.dateCreated=(new Date).toJSON());let t=await(0,_t.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new xt(t);await this.attributeCountRepository.put(e)}};ka=Sa([(0,s.b)(),$a("design:paramtypes",[Ae])],ka);var Ia=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Ra=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},xa=function(e,t){return function(a,i){t(a,i,e)}};let _a=class{channelRepository;imageService;itemService;quillService;schemaService;queryCacheService;attributeCountService;walletService;constructor(e,t,a,i,n,s,o,r){this.channelRepository=e,this.imageService=t,this.itemService=a,this.quillService=i,this.schemaService=n,this.queryCacheService=s,this.attributeCountService=o,this.walletService=r}async get(e){return this.channelRepository.get(e)}async getLatestRevision(e){return this.channelRepository.getLatestRevision(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=(0,At.Z)(),e.dateCreated=(new Date).toJSON()),e.description&&(e.descriptionHTML=await this.quillService.translateContent(e.description),e.descriptionMarkdown=await this.quillService.generateMarkdown(e.description)),e.license&&(e.licenseHTML=await this.quillService.translateContent(e.license),e.licenseMarkdown=await this.quillService.generateMarkdown(e.license));let t=await(0,_t.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new xt(t);return this.channelRepository.put(e)}async list(e,t){return this.channelRepository.list(e,t)}async delete(e){await this.schemaService.dropChannel(e._id),await this.channelRepository.delete(e)}async countItemsByChannel(e){let t;try{t=await this.queryCacheService.get(`token_id_stats_by_channel_${e}`)}catch(e){}let a=t?.result;return a?.count?a.count:0}async exportContractMetadata(e,t){let a={name:e.title,description:e.descriptionMarkdown,external_link:e.link,seller_fee_basis_points:0,fee_recipient:t,license:e.license};if(e.coverImageId){let t=await this.imageService.get(e.coverImageId);a.image=`ipfs://${t.cid}`}return a}async buildAttributeCounts(e){let t=await this.itemService.getAttributeCountByChannel(e);for(let a of t){let t,i=`${e}-${a.traitType}-${a.value}`;try{t=await this.attributeCountService.get(i)}catch(e){}t||(t=new Pe),await this.attributeCountService.put(Object.assign(t,a))}}async getGitProviderCredentials(e,t){if(!e.gitProvider||"default"==e.gitProvider){if(t.defaultGitProvider)return t.gitProviders[t.defaultGitProvider];if(t.gitProviders&&t.gitProviders.github)return t.gitProviders.github}if(e.gitProvider)return t.gitProviders[e.gitProvider]}async getChannelContract(e){if(!e.contractAddress)return;return await this.walletService.getContract(e.contractAddress)}};_a=Ia([(0,s.b)(),xa(7,(0,o.f)(i.WalletService)),Ra("design:paramtypes",[E,Lt,wa,ut,We,ha,ka,Object])],_a);var Pa=a(24926),Ca=a(20747),Ta=a(96324),Aa=a(61207),Oa=a(98523),ja=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Fa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Ea=function(e,t){return function(a,i){t(a,i,e)}};let Da=class{ipfsRemoteInit;helia;settingsService;peerCount=0;addresses;ipfs;_helia;_mfs;_car;initializing=!1;mfsOptions={cidVersion:0,rawLeaves:!1,layout:(0,Ca.M)({maxChildrenPerNode:174}),chunker:(0,Pa.u)({chunkSize:262144})};constructor(e,t){this.ipfsRemoteInit=e,this.helia=t}async init(){if(this.ipfs||this.initializing)return;let e;this.initializing=!0;try{e=await this.settingsService.get()}catch(e){}console.time("Init IPFS"),this.ipfs=await this.ipfsRemoteInit(e?.ipfsHost?e.ipfsHost:"/ip4/127.0.0.1/tcp/5001"),console.timeEnd("Init IPFS"),this.initializing=!1}async initLocal(){this._helia||(this.initializing=!0,console.time("Init IPFS"),this._helia=await this.helia(),this._mfs=(0,Aa.I)(this._helia),this._car=(0,Oa.Z)(this._helia),this.initializing=!1,console.timeEnd("Init IPFS"))}async destroyLocal(){console.time("Destroy IPFS"),await this._helia.stop(),console.timeEnd("Destroy IPFS")}async clearInit(){delete this.ipfs,this.initializing=!1}async updateInfo(){let e=await this.ipfs.id(),t=await this.ipfs.swarm.peers();this.peerCount=t.length,this.addresses=e?.addresses?.map((e=>e.toString()));const a=new CustomEvent("update-peers",{detail:{addresses:this.addresses,peers:t.map((e=>e.addr.toString())),count:this.peerCount}});document.dispatchEvent(a),console.log(`IPFS has ${this.peerCount} peers.`)}async filesRm(e,t){return this.ipfs.files.rm(e,t)}async filesCp(e,t,a){return this.ipfs.files.cp(e,t,a)}async filesRead(e){return this.ipfs.files.read(e)}async filesWrite(e,t,a){return this.ipfs.files.write(e,t,a)}async filesFlush(e){return this.ipfs.files.flush(e)}async add(e){return this.ipfs.add(e)}async stat(e,t){return this.ipfs.files.stat(e,t)}async heliaRm(e,t){return this._mfs.rm(e,t)}async heliaCp(e,t,a){return this.ipfs.files.cp(e,t,Object.assign(this.mfsOptions,a))}async heliaRead(e){return this.ipfs.files.read(e)}async heliaWrite(e,t,a){return this.ipfs.files.write(e,t,Object.assign(this.mfsOptions,a))}async heliaFlush(e){return this.ipfs.files.flush(e)}async heliaAdd(e,t,a){return await this._mfs.writeBytes(e,t,Object.assign(this.mfsOptions,a)),(await this._mfs.stat(t)).cid}async heliaMkDir(e,t){return this._mfs.mkdir(e,Object.assign(this.mfsOptions,t))}async heliaStat(e,t){return this._mfs.stat(e,Object.assign(this.mfsOptions,t))}async createCAR(e){return console.log("Creating CAR file export..."),Ta.Gp.create(e)}async exportCAR(e,t){return this._car.export(e,t)}async carWriterOutToBlob(e){const t=[];for await(const a of e)t.push(a);return new Blob(t,{type:"application/car"})}};ja([(0,o.f)(Gt),Fa("design:type",Gt)],Da.prototype,"settingsService",void 0),Da=ja([(0,s.b)(),Ea(0,(0,o.f)("ipfsRemoteInit")),Ea(1,(0,o.f)("helia")),Fa("design:paramtypes",[Object,Function])],Da);var Ba=a(35717),Ma=a(86094),La=a.n(Ma),Na=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Ua=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const{forEach:Ha}=Array.prototype;let qa=class{animationRepository;quillService;imageService;themeService;db;constructor(e,t,a,i){this.animationRepository=e,this.quillService=t,this.imageService=a,this.themeService=i}async get(e){return this.animationRepository.get(e)}async put(e){e._id||(e._id=e.cid,e.dateCreated=(new Date).toJSON());let t=await(0,_t.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new xt(t);await this.animationRepository.put(e)}async delete(e){await this.animationRepository.delete(e)}async newFromText(e){const t=new m;return t.content=e,t.cid=await Rt.of(t.content),t}async buildAnimationPage(e){let t,a=await this.quillService.translateContent(e.content),i=[];if(e.themes)for(let t of e.themes)i.push(await this.themeService.get(t));let n="";if(i?.length>0)for(let e of i)e.animationCSS?.length>0&&(n+=e.animationCSS);if(e.coverImageAsAnimation){let a=await this.imageService.get(e.coverImageId),i=await this.imageService.getUrl(a);t=this.getFullImageTemplate(i,e.animationCSS,n)}else t=this.getAnimationTemplate(e,a,e.animationCSS,n);return La()(t)}getFullImageTemplate(e,t,a){return`<!DOCTYPE html>\n    <html>\n      <head>\n        <style>\n        \n          body { \n            height: 100%; \n            width: 100%;\n            margin: 0;\n            padding: 0;\n\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            overflow: hidden\n          }\n\n          img {\n            flex-shrink: 0;\n            min-width: 100%;\n            width: 100%;\n            height: 100%;\n            min-height: 100%\n            object-fit: cover;\n          }\n\n          ${a||""}\n          ${t||""}\n\n        </style>\n      </head>\n\n      <body>\n        <img src="${e}" />\n      </body>\n    </html>`}getAnimationTemplate(e,t,a,i){return`<!DOCTYPE html>\n        <html>\n        \n          <head>\n              <meta charset="utf-8">\n              <title>${e.title}</title>\n\n              <style>\n\n                html {\n                    height:100%;\n                } \n\n                body {\n                      padding: 0;\n                      margin: 0;\n                      box-sizing: border-box;\n                      height: 100%;\n                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n                }\n\n                .animation-container {\n                  box-sizing: border-box;\n                  padding: 20px;\n                  width:100%;\n                  min-height: 100%;\n                  \n                  background: rgb(241,241,241);\n                  background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);\n\n                  font-size: 20px;\n                  border: 5px solid #4e82b1;\n                  float: left;\n                }\n\n                img { \n                  max-width: 100%;\n                  border: 1px solid #cccccc;\n                  object-fit: cover;\n                }\n\n                .token-id {\n                  color: rgb(79, 79, 79);\n                  font-weight: bold;\n                }\n\n                h4 { \n                  margin-top: 0px; \n                  font-size: 25px;\n                  margin-bottom: 0px;\n                }\n\n                ${i||""}\n                ${a||""}\n\n\n              </style>\n\n          </head>\n\n          <body>\n\n            <div class="animation-container">\n              <h4><b>${e.title?e.title:""} <span class="token-id">#${e.tokenId}</span></b></h4>\n              ${t}\n            </div>\n\n          </body>\n        </html>`}async getByIds(e){return this.animationRepository.getByIds(e)}};qa=Na([(0,s.b)(),Ua("design:paramtypes",[$,ut,Lt,Et])],qa);var Ga=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},za=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Wa=class{staticPageRepository;quillService;db;constructor(e,t){this.staticPageRepository=e,this.quillService=t}async get(e){return this.staticPageRepository.get(e)}async getIds(){return this.staticPageRepository.getIds()}async getLatestRevision(e){return this.staticPageRepository.getLatestRevision(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=(0,At.Z)(),e.dateCreated=(new Date).toJSON()),e.content&&(e.contentHTML=await this.quillService.translateContent(e.content),e.contentMarkdown=await this.quillService.generateMarkdown(e.content)),e.name&&(e.slug=this.slugify(e.name));let t=await(0,_t.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new xt(t);await this.staticPageRepository.put(e)}async delete(e){return this.staticPageRepository.delete(e)}async listByChannel(e,t,a){return this.staticPageRepository.listByChannel(e,t,a)}slugify(e){return e.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-")}};Wa=Ga([(0,s.b)(),za("design:paramtypes",[re,ut])],Wa);var Va=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Za=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ja=class{itemService;authorService;themeService;imageService;animationService;originalMetadataService;staticPageService;constructor(e,t,a,i,n,s,o){this.itemService=e,this.authorService=t,this.themeService=a,this.imageService=i,this.animationService=n,this.originalMetadataService=s,this.staticPageService=o}async prepareExport(e,t){let a=await this.getExportChannel(e),i=await this.getExportAuthor(e.authorId),n=await this.itemService.listByChannel(e._id,1e5,0),s=[],o=[];a.coverImageId?.length>0&&s.push(a.coverImageId),a.coverBannerId?.length>0&&s.push(a.coverBannerId),i?.coverPhotoId?.length>0&&s.push(i.coverPhotoId);for(let e of n)e.animationId&&!e.coverImageAsAnimation&&o.push(e.animationId),s.push(...this.getImageCidsByItem(e));return s=[...new Set(s)],o=[...new Set(o)],{animationCids:o,imageCids:s,channel:a,author:i,items:n,themeIds:await this.themeService.getIds(),staticPageIds:await this.staticPageService.getIds(),ownerAddress:t}}async createBackup(e){let t=e.author,a=this.getBackupChannel(e.channel,e.items.length),i=[];return t&&i.push(t),{channels:[a],authors:i,items:await this.getBackupItems(e.items),themes:await this.getBackupThemes(e.themeIds),staticPages:await this.getBackupStaticPages(e.staticPageIds),images:await this.getBackupImages(e.imageCids),animations:await this.getBackupAnimations(e.animationCids),originalMetadata:await this.getBackupOriginalMetadata(e.items.filter((e=>null!=e.originalJSONMetadataId)).map((e=>e.originalJSONMetadataId))),itemCount:e.items.length,themeCount:e.themeIds.length,staticPageCount:e.staticPageIds.length,imageCount:e.imageCids.length,animationCount:e.animationCids.length}}getImageCidsByItem(e){let t=[];if(e.coverImageId?.length>0&&t.push(e.coverImageId),e.content?.ops)for(let a of e.content.ops)a.insert&&a.insert.ipfsimage&&a.insert.ipfsimage?.cid?.length>0&&t.push(a.insert.ipfsimage.cid);return t}getImageCidsByStaticPage(e){let t=[];if(e.content?.ops)for(let a of e.content.ops)a.insert&&a.insert.ipfsimage&&a.insert.ipfsimage?.cid?.length>0&&t.push(a.insert.ipfsimage.cid);return t}async getExportChannel(e){let t=JSON.parse(JSON.stringify(e));return delete t.contractAddress,delete t.pinJobId,delete t.pinJobStatus,delete t.pubDate,delete t.publishReaderRepoId,delete t.publishReaderRepoPath,delete t.publishReaderRepoBranch,delete t.publishReaderRepoStatus,delete t.publishReaderIPFSStatus,delete t.productionHostname,delete t.productionBaseLibraryURI,delete t.productionBaseURI,delete t.showMintPage,delete t.showActivityPage,delete t.marketplaces,delete t.externalLinks,delete t.importSuccess,delete t.lastUpdated,delete t._rev,delete t._rev_tree,t}async getExportAuthor(e){let t;try{t=await this.authorService.get(e)}catch(e){}return t&&(t=JSON.parse(JSON.stringify(t)),delete t._rev,delete t.lastUpdated,delete t._rev_tree),t}prepareTheme(e){return delete e._rev,delete e._rev_tree,JSON.parse(JSON.stringify(e))}prepareStaticPage(e){return delete e._rev,delete e._rev_tree,JSON.parse(JSON.stringify(e))}prepareItem(e){return delete e._rev,delete e.lastUpdated,delete e._rev_tree,JSON.parse(JSON.stringify(e))}getBackupChannel(e,t){let a=JSON.parse(JSON.stringify(e));return"existing"==a.forkType&&(delete a.forkType,delete a.forkedFromCid,delete a.forkedFromFeeRecipient,delete a.forkedFromId),a.itemCount=t,a}async getBackupThemes(e){let t=[];for(let a of e)t.push(this.prepareTheme(await this.themeService.get(a)));return t}async getBackupStaticPages(e){let t=[];for(let a of e)t.push(this.prepareStaticPage(await this.staticPageService.get(a)));return t}async getBackupItems(e){let t=[],a=0;for(let i of e){let n=this.prepareItem(i);if(n.content?.ops?.length>0){let e=[];for(let t of n.content.ops)t.insert&&t.insert.ipfsimage&&delete t.insert.ipfsimage.src,e.push(t);n.content.ops=e}t.push(n),a++,console.log(`Processing token #${n.tokenId} ${a}/${e.length}`)}return console.log("Tokens processed"),t}async getBackupImages(e){let t=[],a=0;for(let i of e){let n=await this.imageService.get(i),s=JSON.parse(JSON.stringify(n));delete s._rev,delete s._rev_tree,delete s.buffer,delete s.svg,t.push(s),a++,console.log(`Processing image #${s._id} ${a}/${e.length}`)}return console.log("Images processed"),t}async getBackupAnimations(e){let t=[],a=0;for(let i of e){let n=await this.animationService.get(i),s=JSON.parse(JSON.stringify(n));delete s._rev,delete s._rev_tree,delete s.content,t.push(s),a++,console.log(`Processing animation #${s._id} ${a}/${e.length}`)}return console.log("Animations processed"),t}async getBackupOriginalMetadata(e){let t=[],a=0;for(let i of e){let n=await this.originalMetadataService.get(i),s=JSON.parse(JSON.stringify(n));delete s._rev,delete s._rev_tree,t.push(s),a++,console.log(`Processing original metadata #${s._id} ${a}/${e.length}`)}return console.log("Original metadata processed"),t}};Ja=Va([(0,s.b)(),Za("design:paramtypes",[wa,da,Et,Lt,qa,va,Wa])],Ja);var Ka=a(3969),Ya=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Qa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Xa=function(e,t){return function(a,i){t(a,i,e)}};const ei=new Ka.DOMParser;let ti=class{itemService;channelService;imageService;authorService;animationService;quillService;themeService;queryCacheService;exportService;ipfsService;attributeCountService;dayjs;constructor(e,t,a,i,n,s,o,r,c,l,f,d){this.itemService=e,this.channelService=t,this.imageService=a,this.authorService=i,this.animationService=n,this.quillService=s,this.themeService=o,this.queryCacheService=r,this.exportService=c,this.ipfsService=l,this.attributeCountService=f,this.dayjs=d}async get(e){let t=await this.itemService.get(e);const a=await this.channelService.get(t.channelId);let i=(await this.queryCacheService.get(`token_id_stats_by_channel_${t.channelId}`)).result;return this.getViewModel(t,a,i)}async getNavigation(e,t){let a=await this.itemService.getByTokenId(e,t);const i=await this.channelService.get(a.channelId);return this.getNavigationViewModel(a,i)}async getViewModel(e,t,a){let i,n,s,o,r,c=[],l=!t.contractAddress;if(e.coverImageId)try{let t=await this.imageService.get(e.coverImageId);n={cid:t.cid,url:await this.imageService.getUrl(t)}}catch(e){}if(e.animationId)try{let t=await this.animationService.get(e.animationId);i={cid:t.cid,content:It().unescape(t.content)};let a=ei.parseFromString(t.content,"text/html").getElementsByTagName("body")[0];o=It().unescape((new Ka.B).serializeToString(a)),o="<div"+o.slice(5),o=o.substring(0,o.length-7)+"</div>"}catch(e){}if(t.authorId&&(r=await this.authorService.get(t.authorId),r.coverPhotoId)){let e=await this.imageService.get(r.coverPhotoId);s={cid:e.cid,url:await this.imageService.getUrl(e)}}if(t.attributeOptions.length>0){for(let a of t.attributeOptions){let t=e?.attributeSelections?.filter((e=>a?.traitType==e?.traitType));c.push({id:a.id,traitType:a.traitType,values:a.values,value:t?.length>0?t[0].value:""})}for(let e of c)try{let i=await this.attributeCountService.get(`${t._id}-${e.traitType}-${e.value}`);e.categoryPercent=i?new Intl.NumberFormat("default",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(i.count/a.count):""}catch(e){}}let f=a.max==e.tokenId,d=[];if(e.themes?.length>0)try{for(let t of e.themes)d.push(await this.themeService.get(t))}catch(e){}let p=await this.getImagesFromContent(e);return 0==p.filter((e=>e.cid==n?.cid)).length&&p.push(n),{item:e,themes:d,contentHTML:await this.quillService.translateContent(e.content),animationContentHTML:o,dateDisplay:this.dayjs(e.dateCreated).format("MMM DD YYYY"),channel:t,coverImage:n,animation:i,author:r,authorPhoto:s,authorDisplayName:this.authorService.getDisplayName(r),images:p,attributeSelections:c,editable:l,canDelete:f}}async getNavigationViewModel(e,t){let a=(await this.queryCacheService.get(`token_id_stats_by_channel_${t._id}`)).result,i=await this.getViewModel(e,t,a);return i.item.tokenId<a.max&&(i.next=i.item.tokenId+1),i.item.tokenId>a.min&&(i.previous=i.item.tokenId-1),i}async getListViewModel(e,t){let a;if(e.coverImageId)try{let t=await this.imageService.get(e.coverImageId);a={cid:t.cid,url:await this.imageService.getUrl(t)}}catch(e){}return{item:e,channel:t,coverImage:a}}async listByChannel(e,t,a){let i=[],n=await this.itemService.listByChannel(e,t,a);const s=await this.channelService.get(e);for(let e of n)i.push(await this.getListViewModel(e,s));return i}async getImagesFromContent(e){if(!e.content)return[];let t=e.content.ops;const a=[];if(t?.length>0){for(let e of t)e.insert&&e.insert.ipfsimage&&a.push({cid:e.insert.ipfsimage.cid,url:e.insert.ipfsimage.src});try{let t=await this.imageService.newFromItem(e);a.push({cid:t.cid,url:await this.imageService.getSVGURL(t),svg:t.svg,generated:!0})}catch(e){}}return a}async getNewViewModel(e){let t=await this.channelService.get(e),a=[];for(let e of t.attributeOptions)a.push({id:e.id,traitType:e.traitType,values:e.values,value:"",categoryPercent:""});return{item:{attributeSelections:[]},channel:t,attributeSelections:a,editable:!0,canDelete:!0}}async saveGeneratedCoverImage(e){let t=await this.getImagesFromContent(e),a=t?.filter((t=>e.coverImageId?t.cid==e.coverImageId:1==t.generated)),i=Object.assign(new z,a[0]);if(1==i.generated){delete i.url;try{await this.imageService.put(i)}catch(e){}e.coverImageId=i._id}return i}async saveAnimation(e){let t=await this.animationService.buildAnimationPage(e),a=await this.animationService.newFromText(t);try{await this.animationService.put(a)}catch(e){}return e.animationId=a._id,a}async updateGeneratedCoverImage(e){if(!(await this.imageService.get(e.coverImageId)).generated)return;let t=await this.imageService.newFromItem(e);try{await this.imageService.put(t)}catch(e){}e.coverImageId=t._id}async put(e){if(e.item.imageIds=this.exportService.getImageCidsByItem(e.item),e.item._rev){let t=await this.itemService.get(e.item._id),a=this.exportService.getImageCidsByItem(t).filter((t=>!e.item.imageIds?.includes(t)));for(let t of a)await this.deletePublishedImageByChannel(e.channel,e.item,t);e.item.animationId!=t.animationId&&(console.log(`Removing ${t.animationId} from animations.`),await this.deletePublishedAnimationByChannel(e.channel,e.item,t.animationId))}if(await this.itemService.put(e.item),e.publish){for(let t of e.item.imageIds)try{await this.publishImage(e.channel,await this.imageService.get(t),!1)}catch(e){}try{await this.publishAnimation(e.channel,await this.animationService.get(e.item.animationId),!1)}catch(e){}}if(e.updateQueryCache){let t=await this.queryCacheService.get(`token_id_stats_by_channel_${e.item.channelId}`),a=t.result;e.item.tokenId<a.min&&(a.min=e.item.tokenId),e.item.tokenId>a.max&&(a.max=e.item.tokenId,a.count++),t.result=a,await this.queryCacheService.put(t);let i=await this.itemService.getAttributeInfoBySelections(e.item.channelId,e.item.attributeSelections);for(let t of i){let a,i=`${e.item.channelId}-${t.traitType}-${t.value}`;try{a=await this.attributeCountService.get(i)}catch(e){}a||(a=new Pe,a.channelId=e.item.channelId,a.traitType=t.traitType,a.value=t.value),a.count=t.count,await this.attributeCountService.put(a)}}}async delete(e){let t=await this.channelService.get(e.channelId);await this.itemService.delete(e);let a=this.exportService.getImageCidsByItem(e);for(let i of a)await this.deletePublishedImageByChannel(t,e,i);await this.deletePublishedAnimationByChannel(t,e,e.animationId),await this.deleteJSONForItem(t,e);let i=await this.queryCacheService.get(`token_id_stats_by_channel_${e.channelId}`),n=i.result;e.tokenId==n.min?(n.min=0,n.max=0,n.count=0):(n.max=e.tokenId-1,n.count--),i.result=n,await this.queryCacheService.put(i)}async clone(e){let t=JSON.parse(JSON.stringify(e));delete t._id,delete t._rev,delete t._rev_tree,delete t.tokenId,t=Object.assign(new Y,t);let a=await this.channelService.get(e.channelId);await this.put({channel:a,item:t}),t.contentHTML=await this.quillService.translateContent(t.content,!0);let i=await this.saveGeneratedCoverImage(t);return e.coverImageGenerated=i.generated,await this.saveAnimation(t),await this.put({channel:a,item:t}),t}async publishImage(e,t,a=!0){if(!t)return;let i,n=`${`/export/${e._id}`}/images/${t.cid}.${t.buffer?"jpg":"svg"}`;try{i=await this.ipfsService.stat(n,{hash:!0})}catch(e){}if(!i?.cid?.toString()){let e=await this.imageService.getImageContent(t);const i=await this.ipfsService.add({content:e});await this.ipfsService.filesCp(`/ipfs/${i.cid.toString()}`,n,{create:!0,parents:!0,flush:a})}}async deletePublishedImageByChannel(e,t,a){try{let i=await this.imageService.get(a),n=(await this.itemService.getByImageId(a)).filter((e=>e._id!=t._id));if(n?.length>0)return;await this.imageService.delete(i);let s=`${`/export/${e._id}`}/images/${i.cid}.${i.buffer?"jpg":"svg"}`;await this._safeDelete(s)}catch(e){}}async publishAnimation(e,t,a=!0){if(!t)return;let i,n=`${`/export/${e._id}`}/animations/${t.cid}.html`;try{i=await this.ipfsService.stat(n,{hash:!0})}catch(e){}if(!i?.cid?.toString()){const e=await this.ipfsService.add({content:t.content});await this.ipfsService.filesCp(`/ipfs/${e.cid.toString()}`,n,{create:!0,parents:!0,flush:a})}}async deletePublishedAnimationByChannel(e,t,a){try{let i=await this.animationService.get(a),n=(await this.itemService.getByAnimationId(i._id)).filter((e=>e._id!=t._id));if(n?.length>0)return;await this.animationService.delete(i);let s=`${`/export/${e._id}`}/animations/${i.cid}.html`;await this._safeDelete(s)}catch(e){}}async deleteJSONForItem(e,t){let a=`${`/export/${e._id}`}/metadata/${t.tokenId}.json`;await this._safeDelete(a)}async _safeDelete(e){let t;try{t=await this.ipfsService.stat(e,{hash:!0})}catch(e){}t?.cid?.toString()&&await this.ipfsService.filesRm(e,{recursive:!0,flush:!0})}};ti=Ya([(0,s.b)(),Xa(11,(0,o.f)("dayjs")),Qa("design:paramtypes",[wa,_a,Lt,da,qa,ut,Et,ha,Ja,Da,ka,Object])],ti);var ai=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},ii=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},ni=function(e,t){return function(a,i){t(a,i,e)}};let si=class{channelService;imageService;authorService;itemService;itemWebService;queryCacheService;schemaService;settingsService;dayjs;constructor(e,t,a,i,n,s,o,r,c){this.channelService=e,this.imageService=t,this.authorService=a,this.itemService=i,this.itemWebService=n,this.queryCacheService=s,this.schemaService=o,this.settingsService=r,this.dayjs=c}async get(e){return this.getViewModel(await this.channelService.get(e))}async getViewModel(e){let t,a,i,n;if(await this.imageService.load(e._id),await this.authorService.load(e._id),e.coverImageId)try{let a=await this.imageService.get(e.coverImageId);t={cid:a.cid,url:await this.imageService.getUrl(a)}}catch(e){}if(e.coverBannerId)try{let t=await this.imageService.get(e.coverBannerId);a={cid:t.cid,url:await this.imageService.getUrl(t)}}catch(e){}if(e.authorId&&(n=await this.authorService.get(e.authorId),n.coverPhotoId))try{let e=await this.imageService.get(n.coverPhotoId);i={cid:e.cid,url:await this.imageService.getUrl(e)}}catch(e){}let s,o,r=await this.channelService.countItemsByChannel(e._id);try{s=await this.settingsService.get()}catch(e){}try{o=await this.channelService.getGitProviderCredentials(e,s)}catch(e){}return{channel:e,coverImage:t,coverBanner:a,author:n,authorDisplayName:this.authorService.getDisplayName(n),authorPhoto:i,itemCount:r,editable:!0,dateCreated:this.dayjs(e.dateCreated).format("MMM DD YYYY"),gitProvider:o}}async list(e,t){let a=[],i=await this.channelService.list(e,t);for(let e of i.filter((e=>!e.forkType||e.importSuccess)))a.push(await this.getViewModel(e));return a}async upgrade(e){let t=await this.itemService.listByChannel(e._id,1e5,0);for(let e of t){let t=await this.imageService.get(e.coverImageId);e.coverImageGenerated=t.generated;let a=Object.assign(new Y,e);await this.itemService.put(a),console.log(a)}}async regenerateItemMedia(e){let t=await this.itemService.listByChannel(e._id,1e5,0);for(let e of t){await this.itemWebService.updateGeneratedCoverImage(e),await this.itemWebService.saveAnimation(e);let t=Object.assign(new Y,e);await this.itemService.put(t)}}async put(e,t,a){let i,n=await this.channelService.put(e);if(e._rev=n.rev,await this.schemaService.loadChannel(e._id),t)try{await this.imageService.put(Object.assign(new z,t))}catch(e){}if(a)try{await this.imageService.put(Object.assign(new z,a))}catch(e){}try{i=await this.queryCacheService.get(`token_id_stats_by_channel_${e._id}`)}catch(e){}i||(i=new $e,i._id=`token_id_stats_by_channel_${e._id}`,i.result={min:0,max:0,count:0}),await this.queryCacheService.put(i)}async getChannelContract(e){return this.channelService.getChannelContract(e)}};si=ai([(0,s.b)(),ni(8,(0,o.f)("dayjs")),ii("design:paramtypes",[_a,Lt,da,wa,ti,ha,We,Gt,Object])],si);var oi=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},ri=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ci=class{imageService;authorService;constructor(e,t){this.imageService=e,this.authorService=t}async get(e){return this.getViewModel(await this.authorService.get(e))}async getViewModel(e){let t;if(e.coverPhotoId){let a=await this.imageService.get(e.coverPhotoId);t={cid:a.cid,url:await this.imageService.getUrl(a)}}return{author:e,authorPhoto:t,authorDisplayName:this.authorService.getDisplayName(e)}}};ci=oi([(0,s.b)(),ri("design:paramtypes",[Lt,da])],ci);var li,fi=a(52861),di=a(28490),pi=a.n(di),ui=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},hi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let mi=class{static{li=this}settingsService;static BASE_URL="https://gitlab.com/api/v4";static READER_REPO_ID=15461980;constructor(e){this.settingsService=e}async createFork(e){console.log("Creating reader fork...");let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let a=`${li.BASE_URL}/projects/${li.READER_REPO_ID}/fork`,i=`${e.title}`.replace(/[^a-z0-9]/gi,"-").toLowerCase(),n=await this.getExistingFork(e);return n?{id:n.id,path:n.path,branch:"master"}:{id:(await fi.Z.post(a,{name:i,path:i},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data.id,path:i,branch:"master"}}async createVariables(e){let t=await this.settingsService.get(),a=t.gitProviders.gitlab;if(a.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");t.alchemyKey&&await this._createVariable(e,a,"ALCHEMY_API_KEY",t.alchemyKey)}async _createVariable(e,t,a,i){let n=await this._getVariables(e,t,a),s=`${li.BASE_URL}/projects/${e.publishReaderRepoId}/variables`;return n?fi.Z.put(`${s}/${a}`,{key:a,value:i,masked:!0},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}}):fi.Z.post(s,{key:a,value:i,masked:!0},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}async _getVariables(e,t,a){let i=`${li.BASE_URL}/projects/${e.publishReaderRepoId}/variables/${a}`;try{let e=await fi.Z.get(i,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}});return e?.data}catch(e){}}async getExistingFork(e){let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let a=`${li.BASE_URL}/projects/${li.READER_REPO_ID}/forks`,i=(await fi.Z.get(a,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data,n=`${e.title}`.replace(/[^a-z0-9]/gi,"-").toLowerCase(),s=i.filter((e=>e.path==n&&e.owner.username==t.username));if(1==s?.length)return{id:s[0].id,httpUrlToRepo:s[0].http_url_to_repo,path:s[0].path,branch:s[0].default_branch}}async getForkRepoStatus(e){let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");if(!e.publishReaderRepoId)return;let a=`${li.BASE_URL}/projects/${e.publishReaderRepoId}`;return(await fi.Z.get(a,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data.import_status}async getJobForCommit(e,t){let a=`${li.BASE_URL}/projects/${e.publishReaderRepoId}/jobs`;const i=await fi.Z.get(a,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}});return i.data?.filter((t=>t.commit?.id==e.publishReaderIPFSStatus.headSha))}async commit(e,t,a){for(let e of t)e.encoding="base64",e.content=e.content.toString("base64");let i=0,n=this.chunkIt(t,500);for(const[s,o]of n.entries()){i+=o.length,this.logPublishProgress(`Commiting reader data for ${e.title} to GitLab: committing ${o.length} actions. ${i} / ${t.length}`);let r,c=`${li.BASE_URL}/projects/${e.publishReaderRepoId}/repository/commits`;r=s===n.length-1?"Commiting reader data complete":`Commiting reader data for ${e.title}`;await fi.Z.post(c,{branch:"master",commit_message:r,actions:o},{headers:{Authorization:`Bearer ${a.personalAccessToken}`}})}let s=await this.getMostRecentCommit(e,a);return this.logPublishProgress(`Commit successful: ${s}`),s}async deleteReaderBackup(e,t){if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing files from repo...");let a,i=`${li.BASE_URL}/projects/${e.publishReaderRepoId}/repository/tree?recursive=true&path=.upload&pagination=keyset`,n=[];do{try{let e=await fi.Z.get(i,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}}),s=e?.data?.reverse()?.filter((e=>e.name.indexOf(".")>0)).map((e=>({action:"delete",file_path:e.path})));n.push(...s),a=pi()(e.headers.link),i=a?.next?.url}catch(e){"404 invalid revision or path Not Found"==e.response.data?.message&&(i=void 0)}}while(i);if(n?.length>0){this.logPublishProgress(`Deleting ${n.length} files from repo...`);let a=`${li.BASE_URL}/projects/${e.publishReaderRepoId}/repository/commits`;await fi.Z.post(a,{branch:"master",commit_message:"Deleting .upload",actions:n},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}}async deleteContractBackup(e,t){if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing contract files from repo...");let a=[{action:"delete",file_path:"/backup/contract/contract.json"},{action:"delete",file_path:"/backup/contract/contract-abi.json"}];if(a?.length>0){this.logPublishProgress(`Deleting ${a.length} files from repo...`);let i=`${li.BASE_URL}/projects/${e.publishReaderRepoId}/repository/commits`;await fi.Z.post(i,{branch:"master",commit_message:`Deleting existing contract files for ${e.title}`,actions:a},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}}async getMostRecentCommit(e,t){let a=`${li.BASE_URL}/projects/${e.publishReaderRepoId}/repository/commits`;let i=(await fi.Z.get(a,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;if(i?.length>0)return i[0].id}logPublishProgress(e){if(console.log(e),"undefined"!=typeof window&&void 0!==window.document){const t=new CustomEvent("publish-progress",{detail:{message:e}});document.dispatchEvent(t)}}getBranchName(e){return e.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}chunkIt(e,t){let a=[];for(let i=0;i<e.length;i+=t){let n=e.slice(i,i+t);a.push(n)}return a}};mi=li=ui([(0,s.b)(),hi("design:paramtypes",[Gt])],mi);var gi=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},vi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},bi=function(e,t){return function(a,i){t(a,i,e)}};let yi=class{uiService;app;constructor(e,t){this.uiService=e,this.app=t}navigate(e,t,a="main"){console.log(`${a}: navigating to ${e.path}`),t||(t={reloadCurrent:!0,ignoreCache:!1,browserHistory:!0});let i=this.app.view[a];i?i.router.navigate(e,t):console.log(`Could not find view ${a}`)}navigateUrl(e,t,a="main"){console.log(`${a}: navigating to ${e}`);let i=this.app.view[a];i?i.router.navigate(e,t):console.log(`Could not find view ${a}`)}buildRoutesForContainer(e){let t=[];for(let a of globalThis.mappedRoutes){let i=e.get(a.controllerClass);t.push({path:a.path,async:async e=>{try{await this.resolveRoute(e.to,e.resolve,i[a.action](),a.showSpinner)}catch(e){this.uiService.showExceptionPopup(e)}}})}return t.push({path:"(.*)",async async(e){console.log(`404 error: ${e.to.path}`)}}),t}async resolveRoute(e,t,a,i=!0){i&&this.uiService.showSpinner("Loading...");let n=await a;if(!n)return;let s=await n.model,o=await s(e),r=Object.assign({},o);r.container=Ao,n.view&&t({component:n.view},{props:r,history:!0,browserHistory:!0}),i&&this.uiService.hideSpinner()}};yi=gi([(0,s.b)(),bi(1,(0,o.f)("framework7")),vi("design:paramtypes",[f,Object])],yi);class wi{model;view;constructor(e,t){this.model=e,this.view=t}}function Si(e,t){return function(a,i,n){globalThis.mappedRoutes||(globalThis.mappedRoutes=[]),globalThis.mappedRoutes.push({path:e,controllerClass:a.constructor,action:i,showSpinner:t})}}function $i(e,{$on:t,$f7:a,$update:i}){let s=n.getWalletService(),o=s.address,r=null!=s.provider,c=e.active,l=e.reader_config,f=e.breadcrumbs;const d=/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/,p=e=>{const t=e.match(d);return t?`${t[1]}…${t[2]}`:e},u=async e=>{document.dispatchEvent(new CustomEvent("connect-wallet"))};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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
  
                  ${f.map(((e,a)=>t`
                    <div class="breadcrumbs-item ${a==f.length-1?"breadcrumbs-item-active":""}">

                      ${e.path?t`
                        <a href="${e.path}" class="link" >
                          ${e.text}
                        </a>
                      `:t`${e.text}`}


                    </div>  

                    ${e.path&&a!=f.length-1?t`
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

`}}$i.id="da99ea11eb",$i.style="\n\n\n";const ki=$i;function Ii(e,{$:t,$h:a,$on:i,$f7:s,$update:o}){let r=n.getInstance(si),c=(n.getInstance(Lt),n.getInstance(f)),l=n.getInstance(Gt);e.footerText;let d,p,u,h,m,g=[],v=[{text:"Home"}];function b(){console.log("Unload infinite scroll"),s.infiniteScroll.destroy("#channel-index-infinite-scroll"),t(".infinite-scroll-preloader").hide()}async function y(){if(!h&&u){c.showSpinner("Loading..."),h=!0;try{g=await r.list(20,d),g&&20==g.length?d+=g.length:u=!1,0==p&&m.deleteAllItems(),m.appendItems(g)}catch(e){console.log(e)}u||b(),p++,h=!1,c.hideSpinner()}}i("pageAfterOut",((e,t)=>{b()})),i("pageInit",(async(e,a)=>{d=0,p=0,u=!0,h=!1,m=s.virtualList.create({el:"#channel-index-list",renderItem:e=>w(e),items:[],setListHeight:!1,emptyTemplate:'\n              <li class="item-content">\n                <div class="item-inner">\n                    There are no collections yet. <br /><br />Click the \'Create & Import\' button to create your first collection.\n                </div>\n              </li>\n            '}),t("#channel-index-infinite-scroll").trigger("infinite"),m.on("itemsAfterInsert",((e,a)=>{t(".empty").each((e=>{const a=t(e).data("id"),i=g.filter((e=>e.channel._id==a))[0];i.channel.descriptionHTML&&(e.innerHTML=i.channel.descriptionHTML);let n=e.getElementsByTagName("a");for(let e of n)e.classList.add("external");t(e).removeClass("empty")})),t("#channel-index-list ul").css("height","")}));let i=await l.get();if(!i.welcomeHide){s.popup.create({el:".welcome-popup",on:{close:async e=>{i.welcomeHide=!0,await l.put(i)}}}).open()}}));const w=e=>`\n              <li>\n                <a href="/admin/channel/show/${e.channel._id}" class="item-link">\n                  <div class="item-content">\n                    <div class="item-media">\n                      ${e.coverImage?`\n                        <img src="${e.coverImage.url}" class="avatar" alt="Channel cover image" />\n                      `:'\n                        <i class="material-icons avatar">image</i>\n                      '}\n                    </div>\n                    <div class="item-inner">\n                      <div class="item-title-row">\n                        <div class="item-title">\n                          ${e.channel.title}                          \n                        </div>\n                        <div class="item-after"><span class="badge">${e.itemCount}</span></div>\n                      </div>\n\n                      ${e.authorDisplayName?`\n                        <div class="item-subtitle">\n                          By ${e?.authorDisplayName}\n                        </div>\n                      `:""}\n\n                      <div class="description item-text empty" data-id="${e.channel._id}"></div>\n                    \n                    </div>\n                  </div>\n                </a>\n              </li>\n          `;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-posts">

    <${ki} breadcrumbs=${v} />

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

`}}Ii.id="b7e757f171",Ii.style="\n\n\n";const Ri=Ii,xi=["English","Abkhazian","Afar","Afrikaans","Akan","Albanian","Amharic","Arabic","Aragonese","Armenian","Assamese","Avaric","Avestan","Aymara","Azerbaijani","Bambara","Bashkir","Basque","Belarusian","Bengali","Bihari languages","Bislama","Bosnian","Breton","Bulgarian","Burmese","Catalan, Valencian","Central Khmer","Chamorro","Chechen","Chichewa, Chewa, Nyanja","Chinese","Church Slavonic, Old Bulgarian, Old Church Slavonic","Chuvash","Cornish","Corsican","Cree","Croatian","Czech","Danish","Divehi, Dhivehi, Maldivian","Dutch, Flemish","Dzongkha","Esperanto","Estonian","Ewe","Faroese","Fijian","Finnish","French","Fulah","Gaelic, Scottish Gaelic","Galician","Ganda","Georgian","German","Gikuyu, Kikuyu","Greek (Modern)","Greenlandic, Kalaallisut","Guarani","Gujarati","Haitian, Haitian Creole","Hausa","Hebrew","Herero","Hindi","Hiri Motu","Hungarian","Icelandic","Ido","Igbo","Indonesian","Interlingua (International Auxiliary Language Association)","Interlingue","Inuktitut","Inupiaq","Irish","Italian","Japanese","Javanese","Kannada","Kanuri","Kashmiri","Kazakh","Kinyarwanda","Komi","Kongo","Korean","Kwanyama, Kuanyama","Kurdish","Kyrgyz","Lao","Latin","Latvian","Letzeburgesch, Luxembourgish","Limburgish, Limburgan, Limburger","Lingala","Lithuanian","Luba-Katanga","Macedonian","Malagasy","Malay","Malayalam","Maltese","Manx","Maori","Marathi","Marshallese","Moldovan, Moldavian, Romanian","Mongolian","Nauru","Navajo, Navaho","Northern Ndebele","Ndonga","Nepali","Northern Sami","Norwegian","Norwegian Bokmål","Norwegian Nynorsk","Nuosu, Sichuan Yi","Occitan (post 1500)","Ojibwa","Oriya","Oromo","Ossetian, Ossetic","Pali","Panjabi, Punjabi","Pashto, Pushto","Persian","Polish","Portuguese","Quechua","Romansh","Rundi","Russian","Samoan","Sango","Sanskrit","Sardinian","Serbian","Shona","Sindhi","Sinhala, Sinhalese","Slovak","Slovenian","Somali","Sotho, Southern","South Ndebele","Spanish, Castilian","Sundanese","Swahili","Swati","Swedish","Tagalog","Tahitian","Tajik","Tamil","Tatar","Telugu","Thai","Tibetan","Tigrinya","Tonga (Tonga Islands)","Tsonga","Tswana","Turkish","Turkmen","Twi","Uighur, Uyghur","Ukrainian","Urdu","Uzbek","Venda","Vietnamese","Volap_k","Walloon","Welsh","Western Frisian","Wolof","Xhosa","Yiddish","Yoruba","Zhuang, Chuang","Zulu"];var _i=a(18634),Pi=a.n(_i),Ci=a(69380);function Ti(e,{$:t,$on:a,$f7:i,$update:s}){n.getWalletService(),n.getInstance(f),n.getInstance(_a);let o=n.getInstance(aa),r=n.getInstance(Lt);const c=e=>{if(O=void 0,j=void 0,!e)return;let t=Ci.vz(e,"ether");try{O=Ci.bM(t),j=t.toString()}catch(e){console.log(e)}},l=async e=>{c(e.currentTarget.value),await s()},d=async e=>{F.channel.contractAddress=e.currentTarget.value,await s()},p=async e=>{t("#cover-image-browse").click()},u=async e=>{let t=await o.uploadFile(document.getElementById("cover-image-browse")),a=await r.newFromBuffer(t);const i=new CustomEvent("cover-image-updated",{detail:{coverImage:a}});document.dispatchEvent(i),F.coverImage={cid:a.cid,url:await r.getUrl(a)},await s()},h=async e=>{t("#banner-browse").click()},m=async e=>{let t=await o.uploadFile(document.getElementById("banner-browse")),a=await r.newFromBuffer(t);const i=new CustomEvent("cover-banner-updated",{detail:{coverBanner:a}});document.dispatchEvent(i),F.coverBanner={cid:a.cid,url:await r.getUrl(a)},await s()},g=async e=>{F.channel.disableForks="true"==t(e.currentTarget).val(),L=!F.channel.disableForks,await s()},v=async e=>{F.channel.showMintPage="true"==t(e.currentTarget).val(),await s()},b=async e=>{F.channel.showActivityPage="true"==t(e.currentTarget).val(),await s()},y=async e=>{F.channel.gitProvider=t(e.currentTarget).val(),await s()},w=async function(e){e.preventDefault();let a=t(e.target).data("id"),n=N.find((e=>e.id==a));i.form.fillFromData("#save-attribute-form",n),await s(),i.popup.open(".edit-category-popup")},S=async e=>{e.preventDefault();let a=t(e.currentTarget).data("id");N=N.filter((e=>e.id!=a)),await s()},$=async e=>{let t={id:(0,At.Z)(),traitType:"",values:[]};i.form.fillFromData("#save-attribute-form",t),await s(),i.popup.open(".edit-category-popup")},k=async e=>{e.preventDefault(),i.popup.close(".edit-category-popup")},I=async function(e){e.preventDefault();let a=t(e.target).data("id"),n=U.find((e=>e.id==a));i.form.fillFromData("#save-external-links-form",n),await s(),i.popup.open(".edit-external-links-popup")},R=async e=>{e.preventDefault();let a=t(e.currentTarget).data("id");console.log(a),U=U.filter((e=>e.id!=a)),await s()},x=async e=>{let t={id:(0,At.Z)(),name:"",link:""};i.form.fillFromData("#save-external-links-form",t),await s(),i.popup.open(".edit-external-links-popup")},_=async e=>{e.preventDefault(),i.popup.close(".edit-external-links-popup")},P=async function(e){e.preventDefault();let a=t(e.target).data("id"),n=H.find((e=>e.id==a));i.form.fillFromData("#save-marketplaces-form",n),await s(),i.popup.open(".edit-marketplaces-popup")},C=async e=>{e.preventDefault();let a=t(e.currentTarget).data("id");H=H.filter((e=>e.id!=a)),await s()},T=async e=>{let t={id:(0,At.Z)(),name:"",link:""};i.form.fillFromData("#save-marketplaces-form",t),await s(),i.popup.open(".edit-marketplaces-popup")},A=async e=>{e.preventDefault(),i.popup.close(".edit-marketplaces-popup")};t(document).on("popup:closed",".edit-category-popup",(async e=>{let t=i.form.convertToData("#save-attribute-form"),a={id:t.id,traitType:t.traitType,values:t.values?JSON.parse(t.values).map((e=>e.value)):[]};if(!a.traitType)return;let n=N.find((e=>e.id==a.id));n?Object.assign(n,a):N.push(a),await s()})),t(document).on("popup:open",".edit-category-popup",(async e=>{new(Pi())(document.getElementById("options-input")),t('input[name="traitType"]').focus()})),t(document).on("popup:closed",".edit-external-links-popup",(async e=>{let t=i.form.convertToData("#save-external-links-form");if(t.name){let e={id:t.id,name:t.name,link:t.link},a=U.find((t=>t.id==e.id));a?Object.assign(a,e):U.push(e)}await s()})),t(document).on("popup:closed",".edit-marketplaces-popup",(async e=>{let t=i.form.convertToData("#save-marketplaces-form");if(t.name){let e={id:t.id,name:t.name,link:t.link},a=H.find((t=>t.id==e.id));a?Object.assign(a,e):H.push(e)}await s()}));let O,j,F=e.channel,E=e.description_toolbar,D=e.description_editor,B=e.license_toolbar,M=e.license_editor,L=!F.channel.disableForks,N=[],U=[],H=[];return F&&(c(F.channel.mintPrice),F?.channel?.attributeOptions?.length>0&&(N=F.channel.attributeOptions),F.channel.externalLinks?.length>0&&(U=F.channel.externalLinks),F.channel.marketplaces?.length>0&&(H=F.channel.marketplaces)),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div>
        <input type="hidden" name="_id" value="${F?.channel?._id}" />
        <input type="hidden" name="_rev" value="${F?.channel?._rev}" />
        <input type="hidden" name="dateCreated" value="${F?.channel?.dateCreated}" />
        <input type="hidden" name="authorId" value="${F?.channel?.authorId}" />
        <input type="hidden" name="contractAddress" value="${F?.channel?.contractAddress}" />

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
                                            ${F.editable?t`
                                            <input type="text" name="title" placeholder="Collection title"
                                                value="${F?.channel?.title}" required minlength="3"
                                                tabindex="1" id="collection-title" />
                                            `:t`
                                            <input type="text" name="title" placeholder="Collection title"
                                                value="${F?.channel?.title}" required minlength="3"
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
    
                                            ${F.editable?t`
                                            <input type="text" name="symbol" placeholder="Symbol (eg BAYC)"
                                                value="${F?.channel?.symbol}" tabindex="2"
                                                required id="collection-symbol" />
                                            `:t`
                                            <input type="text" name="symbol" placeholder="Symbol (eg BAYC)"
                                                value="${F?.channel?.symbol}" tabindex="2" required
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
                                            ${xi.map((e=>t`
                                            ${F?.channel?.language==e?t`
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

                        <form @submit="${_}" id="save-external-links-form">

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

                                                ${F.coverImage?t`
                                                <img class="avatar-preview" src="${F?.coverImage.url}" alt="Collection avatar" />

                                                `:t`
                                                <i class="material-icons avatar-preview">image</i>
                                                `}

                                                <input type="button" class="button button-fill browse-file"
                                                    value="Browse" @click="${p}"
                                                    tabindex="4" />
                                                <input type="hidden" name="coverImageId"
                                                    value="${F?.coverImage?.cid}" />
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

                                                ${F?.coverBanner?t`
                                                <img class="cover-banner-preview"
                                                    src="${F?.coverBanner.url}" />
                                                `:t`
                                                <i class="material-icons cover-banner-preview">image</i>
                                                `}

                                                <input type="button" class="button button-fill browse-file"
                                                    value="Browse" @click="${h}" tabindex="5" />
                                                <input type="hidden" name="coverBannerId"
                                                    value="${F?.coverBanner?.cid}" />

                                                <input type="file" id="banner-browse" style="display: none"
                                                    @change="${m}" />

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

                            ${N?.length>0?t`

                                <ul>
        
                                    ${N?.map((e=>t`
                                    <li>
                                        <span style="width: 100px; margin-right: 10px;">${e.traitType}</span>
        
                                        ${F.editable?t`
                                        <a class="link" href="#" data-id="${e.id}" @click="${w}">Edit</a> | <a
                                            class="link" href="#" data-id="${e.id}" @click="${S}">Delete</a>
                                        `:t` `}
        
                                        <p>
                                            ${e.values?.map(((e,a)=>t`
        
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
        
                            ${F.editable?t`
                                <a class="button button-outline add-category-button" @click="${$}" tabindex="10">Add Attribute Type</a>
                            `:t` `}

                            
    
                            <input type="hidden" name="attributeOptions" value="${JSON.stringify(N)}" />
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

                                                ${F.editable?t`
                                                <input type="number" placeholder="Enter price for one piece (eg 0.08)"
                                                    @change="${l}" step="any" tabindex="11"
                                                    value="${F?.channel?.mintPrice}" />
                                                `:t`
                                                <input type="number" placeholder="Enter price for one piece (eg 0.08)"
                                                    @change="${l}" step="any" tabindex="11"
                                                    value="${F?.channel?.mintPrice}" disabled />
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
                                                (${j} wei) for
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
                                                    value="${F?.channel?.contractAddress}" />

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
                                            <select name="disableForks" @change="${g}">

                                                ${F.channel.disableForks?t`
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

                                ${F.channel.disableForks?t`<span />`:t`

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

                                                ${F.channel.gitProvider&&"default"!=F.channel.gitProvider?t`
                                                <option value="default">Default</option>
                                                `:t`
                                                <option value="default" selected>Default</option>
                                                `}

                                                ${"github"==F.channel.gitProvider?t`
                                                <option value="github" selected>GitHub</option>
                                                `:t`
                                                <option value="github">GitHub</option>
                                                `}


                                                ${"gitlab"==F.channel.gitProvider?t`
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
                                                <input type="text" name="productionHostname" placeholder="http://localhost" value="${F?.channel?.productionHostname}" tabindex="40" />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Production Base URI</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="productionBaseURI" placeholder="/" value="${F?.channel?.productionBaseURI}" tabindex="41" />
                                            </div>
                                        </div>
                                    </div>
                                </li>


                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Production Base Library URI</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="productionBaseLibraryURI" placeholder="/" value="${F?.channel?.productionBaseLibraryURI}" tabindex="42" />
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

                                                    ${1==F.channel.showMintPage?t`
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

                                                    ${1==F.channel.showActivityPage?t`
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
                            
                                                <a class="button button-outline " @click="${x}" tabindex="10">Add External Link</a>
                                                         
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


`}}Ti.id="11009f8163",Ti.style="\n\n\n\n\n\n";const Ai=Ti;var Oi=a(20637);function ji(e,{$:t,$on:a,$f7:i,$update:s}){n.getInstance(_a);let o,r=n.getInstance(si),c=n.getInstance(da),l=n.getInstance(Kt),d=(n.getInstance(f),n.getWalletService()),p=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Create Collection"}];Oi.Z.configure({languages:["css"]});let u,h,m={channel:{mintPrice:"0.00",authorId:d.address},themes:[],staticPages:[],editable:!0,disableForks:!1};const g=async e=>{if(e.preventDefault(),!document.getElementById("create-channel-form").reportValidity())return void document.getElementById("collection-title").scrollIntoView();let t=Object.assign(new O,i.form.convertToData("#create-channel-form"));t.description=l.activeEditor.getContents(),t.license=o.getContents(),t.sellerFeeBasisPoints=parseInt(t.sellerFeeBasisPoints),t.attributeOptions?t.attributeOptions=JSON.parse(t.attributeOptions):t.attributeOptions=[],t.externalLinks?t.externalLinks=JSON.parse(t.externalLinks):t.externalLinks=[],t.marketplaces?t.marketplaces=JSON.parse(t.marketplaces):t.marketplaces=[],t.disableForks="true"==t.disableForks,t.showMintPage="true"==t.showMintPage,t.showActivityPage="true"==t.showActivityPage;try{await r.put(t,u,h),t.authorId&&await c.insertIfNew(t.authorId);i.toast.show({text:"Collection saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});i.views.main.router.navigate(`/admin/channel/show/${t._id}`)}catch(e){console.log(e),i.dialog.alert(e.errors,"There was an error")}};a("pageInit",(async(e,a)=>{t("#create-channel-form").attr("novalidate","novalidate"),await l.init(),l.buildQuillPostEditor("#create-channel-description-editor","#create-channel-description-toolbar"),o=new(gt())("#create-channel-license-editor",{bounds:".page-content",modules:{toolbar:"#create-channel-license-toolbar"},theme:"snow"})}));return t(document).on("cover-image-updated",(async e=>{u=e.detail.coverImage})),t(document).on("cover-banner-updated",(async e=>{h=e.detail.coverBanner})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-create-channel">

    <${ki} breadcrumbs=${p} />

    <div class="page-content hide-toolbar-on-scroll">

        <!-- Slider container -->
        <form id="create-channel-form" @submit="${g}" class="fixed-width-content center">
      
          <div class="block-title block-title-medium">Create Collection</div>


          <${Ai} 
            channel=${m} 
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

`}}ji.id="85ca780a6f",ji.style="\n\n\n\n";const Fi=ji;function Ei(e,{$:t,$on:a,$f7:i,$update:s}){let o=n.getInstance(wa),r=e.channel,c=e.item,l=e.token_id?e.token_id:c.item.tokenId;const f=async e=>{e.preventDefault();const a=t(e.currentTarget).children(".goto-input").val();await o.getByTokenId(r,parseInt(a.toString()))?i.views.main.router.navigate(`/admin/channel/show/${r}/${parseInt(a.toString())}`):i.dialog.alert("Invalid Page")};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="card" >
      <form class="card-content card-content-padding" @submit="${f}">
        <input type="number" class="goto-input" style="width: 60px; border: 1px solid #cccccc; display: inline-block;" value="${l}" min="0"  />
        <span class="paging-label">Enter Token ID</span>
        <button class="goto-button button button-small button-fill">Go</button>
      </form>
    </div>

`}}Ei.id="807d4f82e5",Ei.style="    \n";const Di=Ei;a(18515);function Bi(e,{$:t,$on:a,$f7:i,$update:s}){n.getInstance(_a),n.getWalletService();let o,r=globalThis.container.get(ti),c=e.channelViewModel,l=e.firstPageItems,f=[],d=0,p=!0,u=!1,h=c.itemCount;let m=c.editable,g=[{text:"Home",path:"/"},{text:c.channel.title}];const v=e=>{const t=b();o.params.cols=t>=1024?5:2,o.params.height=t>=1024?290:250,o?.update(),console.log("Resized...")},b=()=>Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),y={el:"#item-list",createUl:!1,renderItem(e){return`<li class="flex-card">\n                  <a href="/admin/channel/show/${(t=e).channel._id}/${t.item.tokenId}" class="item-link">\n                      <div class="card" >\n                          <div class="card-content">\n                              <div class="square">\n                                  <img src="${t.coverImage?.url}" alt="Channel cover image"/>\n                              </div>\n                          </div>\n\n\n                          <div class="card-footer">\n                              ${t.item.title?t.item.title:`#${t.item.tokenId}`} \n                          </div>\n                      </div>\n                  </a>\n              </li>\n      `;var t},height:b()>=1024?290:250,items:f,cols:b()>=1024?5:2,emptyTemplate:'\n          <li class="item-content">\n              <div class="item-inner">\n                  No items in collection.\n              </div>\n          </li>\n          '};a("pageInit",(async(e,a)=>{if(f.push(...l),d=l.length,c?.coverBanner?.url?t(`.show-channel-banner-${c.channel._id}`).css("background-image",`url(${c.coverBanner.url})`):t(`.show-channel-banner-${c.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${c.channel._id}`)){let e=document.getElementById(`channel-show-description-${c.channel._id}`).getElementsByTagName("a");for(let t of e)t.classList.add("external")}t(".animation-container a").addClass("external"),window.addEventListener("resize",v),w()})),a("pageBeforeOut",(async()=>{window.removeEventListener("resize",v)}));const w=()=>{o=i.virtualList.create(y),o.items?.length<h?document.getElementById("item-list-infinite-scroll").addEventListener("infinite",S):t(".infinite-scroll-preloader").hide()};async function S(e){if(!u&&p){console.log("Infinite scrolling..."),u=!0;try{let e=await r.listByChannel(c.channel._id,te.CHUNK_SIZE,d);d+=e.length,d>=h&&(p=!1),o.appendItems(e)}catch(e){console.log(e)}i.preloader.hide(),p||(console.log("Unload infinite scroll item list"),i.infiniteScroll.destroy("#item-list-infinite-scroll"),i.virtualList.destroy("#item-list"),o=void 0,t(".infinite-scroll-preloader").hide()),u=!1}}return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-show-collection">

    <${ki} breadcrumbs=${g} />


    ${m?t`
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
  
        <${Di} channel=${c.channel._id} token_id="1" />
  
  
      
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

`}}Bi.id="33f8b8490f",Bi.style="\n  \n\n";const Mi=Bi;function Li(e,{$:t,$on:a,$f7:i,$update:n}){let s=e.theme,o=e.cover_image_css_editor_id,r=e.animation_css_editor_id;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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


`}}Li.id="9e51d87780",Li.style="\n    \n";const Ni=Li;function Ui(e,{$:t,$on:a,$f7:i,$update:s}){let o,r,c,l=n.getInstance(Et),d=(n.getInstance(f),e.channelViewModel),p=e.themes,u=d.editable,h=[{text:"Home",path:"/"},{text:d.channel.title,path:`/admin/channel/show/${d.channel._id}`},{text:"Themes"}];const m=async()=>{p=await l.listByChannel(d.channel._id,1e3,0)},g=function(e){r=new(gt())("#add-theme-cover-image-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>hljs.highlightAuto(e).value},toolbar:!1}}),c=new(gt())("#add-theme-animation-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>hljs.highlightAuto(e).value},toolbar:!1}})},v=async function(e){e.preventDefault();let t=Object.assign(new fe,i.form.convertToData("#add-theme-form"));t.coverImageCSS="\n"!=r.getText()?r.getText():void 0,t.animationCSS="\n"!=c.getText()?c.getText():void 0,t.channelId=d.channel._id,t._id=(0,At.Z)(),t.dateCreated=(new Date).toJSON();try{await l.put(t),await m(),i.form.fillFromData("#add-theme-form",{name:""}),r.setText(""),c.setText(""),await s(),i.popup.close(".add-theme-popup")}catch(e){i.dialog.alert(e,"There was an error")}},b=async function(e){e.preventDefault();let t=Object.assign(new fe,i.form.convertToData("#edit-theme-form"));t.coverImageCSS="\n"!=r.getText()?r.getText():void 0,t.animationCSS="\n"!=c.getText()?c.getText():void 0,t.channelId=d.channel._id;try{await l.put(t),await m(),await s(),i.popup.close(".edit-theme-popup")}catch(e){console.log(e),i.dialog.alert(e.errors,"There was an error")}},y=async function(e){let a=t(e.target).data("id");i.dialog.confirm("Are you sure you want to delete this theme?",(async()=>{let e=await l.get(a);await l.delete(e),await m(),await s();i.toast.show({text:"Theme deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))},w=async function(e){let a=t(e.target).data("id");o=p.filter((e=>e._id==a))[0],r=new(gt())("#edit-theme-cover-image-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>hljs.highlightAuto(e).value},toolbar:!1}}),c=new(gt())("#edit-theme-animation-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>hljs.highlightAuto(e).value},toolbar:!1}}),i.form.fillFromData("#edit-theme-form",o),r.setText(o.coverImageCSS?o.coverImageCSS:""),c.setText(o.animationCSS?o.animationCSS:""),await s(),i.popup.open(".edit-theme-popup")};return a("pageInit",(async(e,a)=>{if(d?.coverBanner?.url?t(`.show-channel-banner-${d.channel._id}`).css("background-image",`url(${d.coverBanner.url})`):t(`.show-channel-banner-${d.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${d.channel._id}`)){let e=document.getElementById(`channel-show-description-${d.channel._id}`).getElementsByTagName("a");for(let t of e)t.classList.add("external")}await s(),t(".add-theme-popup").on("popup:open",g)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="channel-show-themes">

    <${ki} breadcrumbs=${h} />


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
                  <${Ni} cover_image_css_editor_id="add-theme-cover-image-editor"
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
  
                  <${Ni} cover_image_css_editor_id="edit-theme-cover-image-editor"
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

`}}Ui.id="4b217ba44d",Ui.style="\n\n\n";const Hi=Ui;function qi(e,{$:t,$on:a,$f7:i,$update:n}){let s=e.static_page,o=[{name:"navbar",description:"Show link on navigation bar"},{name:"links",description:"Show in list of links on home page"},{name:"index",description:"Show content on home page"}];let r=e.static_page_content_editor_id,c=e.static_page_content_toolbar_id,l=e.image_button_input_id,f=e.image_button_id;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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


`}}qi.id="fb63d851fa",qi.style="\n    \n";const Gi=qi;function zi(e,{$:t,$on:a,$f7:i,$update:s}){let o,r,c=n.getInstance(Kt),l=n.getInstance(f),d=n.getInstance(Wa),p=e.channelViewModel,u=e.staticPages,h=p.editable,m=[{text:"Home",path:"/"},{text:p.channel.title,path:`/admin/channel/show/${p.channel._id}`},{text:"Static Pages"}];const g=async()=>{u=await d.listByChannel(p.channel._id,1e3,0)};let v=e=>{r=new(gt())("#add-static-page-content-editor",{bounds:".page-content",theme:"snow",modules:{imageDropAndPaste:{handler:(e,t,a)=>{const i=a.toFile();c.insertImageInEditor(i,r)}},toolbar:"#add-static-page-content-toolbar",blotFormatter:{specs:[Qt],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}}})},b=async e=>{e.preventDefault();let t=Object.assign(new ne,i.form.convertToData("#add-static-page-form"));t.content=r.getContents(),t.channelId=p.channel._id,t._id=(0,At.Z)(),t.dateCreated=(new Date).toJSON();try{await d.put(t),await g(),i.form.fillFromData("#add-static-page-form",{name:"",slug:"",locations:[]}),r.setText(""),await s(),i.popup.close(".add-static-page-popup")}catch(e){i.dialog.alert(e,"There was an error")}},y=async e=>{e.preventDefault();let t=Object.assign(new ne,i.form.convertToData("#edit-static-page-form"));t.content=r.getContents(),t.channelId=p.channel._id;try{await d.put(t),await g(),await s(),i.popup.close(".edit-static-page-popup")}catch(e){console.log(e),i.dialog.alert(e.errors,"There was an error")}},w=async e=>{let a=t(e.target).data("id");i.dialog.confirm("Are you sure you want to delete this static page?",(async()=>{let e=await d.get(a);await d.delete(e),await g(),await s();i.toast.show({text:"Static Page deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))},S=async function(e){let a=t(e.target).data("id");o=u.filter((e=>e._id==a))[0],r=new(gt())("#edit-static-page-content-editor",{bounds:".page-content",theme:"snow",modules:{imageDropAndPaste:{handler:(e,t,a)=>{const i=a.toFile();c.insertImageInEditor(i,r)}},toolbar:"#edit-static-page-content-toolbar",blotFormatter:{specs:[Qt],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}}}),i.form.fillFromData("#edit-static-page-form",o),r.setContents(o.content),await s(),i.popup.open(".edit-static-page-popup")},$=function(e){e.preventDefault();t("#add-static-page-image-button-input").click()},k=async function(e){e.preventDefault(),l.showSpinner("Processing image..."),await c.insertImageInEditor(this.files[0],r),l.hideSpinner()},I=function(e){e.preventDefault();t("#edit-static-page-image-button-input").click()},R=async function(e){e.preventDefault(),l.showSpinner("Processing image..."),await c.insertImageInEditor(this.files[0],r),l.hideSpinner()};return a("pageInit",(async(e,a)=>{if(t(document).off("click","#add-static-page-image-button"),t(document).off("change","#add-static-page-image-button-input"),t(document).off("click","#edit-static-page-image-button"),t(document).off("change","#edit-static-page-image-button-input"),await c.init(),p?.coverBanner?.url?t(`.show-channel-banner-${p.channel._id}`).css("background-image",`url(${p.coverBanner.url})`):t(`.show-channel-banner-${p.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${p.channel._id}`)){let e=document.getElementById(`channel-show-description-${p.channel._id}`).getElementsByTagName("a");for(let t of e)t.classList.add("external")}await s(),t(".add-static-page-popup").on("popup:open",v),t(document).on("click","#add-static-page-image-button",$),t(document).on("change","#add-static-page-image-button-input",k),t(document).on("click","#edit-static-page-image-button",I),t(document).on("change","#edit-static-page-image-button-input",R)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="channel-show-themes">

    <${ki} breadcrumbs=${m} />


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
                  <${Gi} static_page_content_editor_id="add-static-page-content-editor"
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
  
                  <${Gi} static_page_content_editor_id="edit-static-page-content-editor"
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

`}}zi.id="654e7d3439",zi.style="\n\n\n";const Wi=zi;function Vi(e,{$:t,$on:a,$f7:i,$update:s}){n.getInstance(_a);let o,r,c,l=n.getInstance(si),d=(n.getInstance(Lt),n.getInstance(Et),n.getInstance(Wa),n.getInstance(f),n.getInstance(Kt)),p=e.channelViewModel;Oi.Z.configure({languages:["css"]});let u=[{text:"Home",path:"/"},{text:p.channel.title,path:`/admin/channel/show/${p.channel._id}`},{text:"Edit Collection"}];const h=async e=>{if(e.preventDefault(),!document.getElementById("edit-channel-form").reportValidity())return void document.getElementById("collection-title").scrollIntoView();let t=Object.assign(new O,p.channel),a=Object.assign(t,i.form.convertToData("#edit-channel-form"));a.description=d.activeEditor.getContents(),a.license=o.getContents(),a.sellerFeeBasisPoints=parseInt(a.sellerFeeBasisPoints),a.attributeOptions?a.attributeOptions=JSON.parse(a.attributeOptions):a.attributeOptions=[],a.externalLinks?a.externalLinks=JSON.parse(a.externalLinks):a.externalLinks=[],a.marketplaces?a.marketplaces=JSON.parse(a.marketplaces):a.marketplaces=[],a.disableForks="true"==a.disableForks,a.showMintPage="true"==a.showMintPage,a.showActivityPage="true"==a.showActivityPage;try{await l.put(a,r,c);i.toast.show({text:"Collection saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});i.views.main.router.navigate(`/admin/channel/show/${a._id}`)}catch(e){i.dialog.alert(e.errors,"There was an error")}};return a("pageInit",(async(e,a)=>{t("#edit-channel-form").attr("novalidate","novalidate");new(Pi())(document.getElementById("category"));if(d.buildQuillPostEditor("#edit-channel-description-editor","#edit-channel-description-toolbar"),p.channel.description&&d.activeEditor.setContents(p.channel.description),o=new(gt())("#edit-channel-license-editor",{bounds:".page-content",modules:{toolbar:"#edit-channel-license-toolbar"},theme:"snow"}),p.channel.license&&o.setContents(p.channel.license),p.channel?.attributeOptions?.length>0)for(let e of p.channel?.attributeOptions)new(Pi())(document.getElementById(`options-input-${e.id}`))})),t(document).on("cover-image-updated",(async e=>{r=e.detail.coverImage})),t(document).on("cover-banner-updated",(async e=>{c=e.detail.coverBanner})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-edit-channel">

    <${ki} breadcrumbs=${u} />

    <div class="page-content hide-toolbar-on-scroll">

      <form id="edit-channel-form" @submit="${h}" class="fixed-width-content center">

        <div class="block-title block-title-medium">Edit Collection</div>


        <${Ai} 
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

`}}Vi.id="81ec9145be",Vi.style="\n";const Zi=Vi;function Ji(e,{$:t,$on:a,$f7:i,$update:s}){let o,r=[{text:"Home",path:"/"},{text:"Create & Import"}];return a("pageInit",(async()=>{o=n.getWalletService(),await s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-create-menu">

    <${ki} breadcrumbs=${r} />

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

`}}Ji.id="6e7a96b0f5",Ji.style="\n\n\n";const Ki=Ji;var Yi=a(17833),Qi=a(33686),Xi=a(34805),en=a.n(Xi),tn=a(41690),an=a(32186),nn=a(455),sn=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},on=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},rn=function(e,t){return function(a,i){t(a,i,e)}};let cn=class{walletService;constructor(e){this.walletService=e}async getMintEventsForContract(e){let t=0,a=await this.walletService.provider.getBlockNumber();console.log("Fetching mint transfers...");let i=[],n={endBlock:a,events:[]};do{n=await this.getEvents(e,t,a),i.push(...n.events),console.log(`...fetched batch of ${n.events?.length} from ${t} to ${n.endBlock} of ${a}`),t=n.endBlock}while(n.endBlock<a);return console.log(`Found ${i.length} events`),i}async getEvents(e,t,a){let i=[],n=!0;for(;n;)try{i=await e.queryFilter([an.id("Transfer(address,address,uint256)"),nn.U3("0x0000000000000000000000000000000000000000",32)],t,a),n=!1}catch(e){let i=e?.error?.message,s=i.substring(i.indexOf("[")+1,i.indexOf("]"))?.split(",");s?.length>1?a=parseInt(s[1]):(a=t,n=!1)}return{events:i,endBlock:a}}async getTokensForContract(e){let t=(await this.getMintEventsForContract(e)).map((e=>Number(BigInt(e.topics[3])))).sort(((e,t)=>e-t));return new Set(t)}};cn=sn([(0,s.b)(),rn(0,(0,o.f)(i.WalletService)),on("design:paramtypes",[Object])],cn);var ln=a(14222),fn=a(48764).Buffer,dn=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},pn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},un=function(e,t){return function(a,i){t(a,i,e)}};const hn=new(en());let mn=class{channelService;channelWebService;queryCacheService;schemaService;itemService;itemWebService;authorService;ipfsService;imageService;animationService;themeRepository;themeService;staticPageRepository;staticPageService;ercEventService;originalMetadataService;tokenMetadataCacheRepository;walletService;contracts;constructor(e,t,a,i,n,s,o,r,c,l,f,d,p,u,h,m,g,v,b){this.channelService=e,this.channelWebService=t,this.queryCacheService=a,this.schemaService=i,this.itemService=n,this.itemWebService=s,this.authorService=o,this.ipfsService=r,this.imageService=c,this.animationService=l,this.themeRepository=f,this.themeService=d,this.staticPageRepository=p,this.staticPageService=u,this.ercEventService=h,this.originalMetadataService=m,this.tokenMetadataCacheRepository=g,this.walletService=v,this.contracts=b}async importFromIPFS(e,t,a){let i={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}};this.logForkProgress(i,`Starting fork of ${e}. Fetching data...`);try{await this.ipfsService.filesRm("/fork",{recursive:!0,flush:!0})}catch(e){}await this.ipfsService.filesCp(`/ipfs/${e}`,"/fork",{create:!0,parents:!0,flush:!0}),this.logForkProgress(i,"Processing...");let n,s=await this._readFile("/fork/backup/authors.json"),o=await this._readFile("/fork/backup/channels.json"),r=await this._readFile("/fork/backup/images.json"),c=await this._readFile("/fork/backup/items.json"),l=await this._readFile("/fork/backup/animations.json"),f=await this._readFile("/fork/backup/themes.json"),d=await this._readFile("/fork/backup/static-pages.json"),p=await this._readFile("/fork/contractMetadata.json");try{n=await this._readFile("/fork/backup/originalMetadata.json")}catch(e){}let u={},h=new gn(this.ipfsService);if("existing"==t){for(let e of c)u[e.tokenId]=await this._readFile(`/fork/metadata/${e.tokenId}.json`);return this._importExisting(s,o,r,c,n,l,f,d,i,h,p,u,e)}if(a){let e=new R;e.walletAddress=a,s=[e]}return this._importAsFork(s,o,r,c,n,l,f,d,i,h,p,e)}async importExistingFromContract(e){return this._importFromContract(e,"existing")}async importAsForkFromContract(e){return this._importFromContract(e,"fork")}async importExistingFromReader(e,t,a){let i=await this._buildImportBundle(e);return i.channels[0].contractAddress=t,i.channels[0].publishReaderIPFSStatus={},i.channels[0].publishReaderIPFSStatus.cid=a,this._importExisting(i.authors,i.channels,i.images,i.items,i.originalMetadata,i.animations,i.themes,i.staticPages,i.forkStatus,i.mediaDownloader,i.contractMetadata,i.tokenMetadata,a)}async importAsForkFromReader(e,t,a){let i=await this._buildImportBundle(e);return delete i.channels[0].contractAddress,delete i.channels[0].publishReaderIPFSStatus,i.channels[0].title=t,this._importAsFork(i.authors,i.channels,i.images,i.items,i.originalMetadata,i.animations,i.themes,i.staticPages,i.forkStatus,i.mediaDownloader,i.contractMetadata,a)}async _buildImportBundle(e){let t={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}};this.logForkProgress(t,"Processing...");let a,i=await this._fetchFile(`${e}backup/export/backup/authors.json`),n=await this._fetchFile(`${e}backup/export/backup/channels.json`),s=await this._fetchFile(`${e}backup/export/backup/images.json`),o=await this._fetchFile(`${e}backup/export/backup/items.json`),r=await this._fetchFile(`${e}backup/export/backup/animations.json`),c=await this._fetchFile(`${e}backup/export/backup/themes.json`),l=await this._fetchFile(`${e}backup/export/backup/static-pages.json`),f=await this._fetchFile(`${e}backup/export/contractMetadata.json`);try{a=await this._fetchFile(`${e}backup/export/backup/originalMetadata.json`)}catch(e){}let d=new vn(e),p={};for(let t of o)p[t.tokenId]=await this._fetchFile(`${e}backup/export/metadata/${t.tokenId}.json`);return{authors:i,channels:n,images:s,items:o,originalMetadata:a,animations:r,themes:c,staticPages:l,mediaDownloader:d,forkStatus:t,contractMetadata:f,tokenMetadata:p}}async _importFromContract(e,t){let a={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}},i=this.walletService.wallet,n=new ia.CH(e,this._getERC721ABI(),i||this.walletService.provider);this.logForkProgress(a,`Fetching tokens for contract ${e}`);let s=await this.ercEventService.getTokensForContract(n);a.channels.total=1,a.items.total=s.size;let o=new O;o.importSuccess=!1,"existing"==t&&(o.contractAddress=e),o.forkType=t,o.title=await n.name(),o.symbol=await n.symbol(),o.attributeOptions=[],await this.channelWebService.put(o);let r=new $e;r._id=`token_id_stats_by_channel_${o._id}`,r.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(o._id);let c,l=[];for(let e of s){this.logForkProgress(a,`Fetching metadata for #${e}`);try{let t=await this._getTokenMetadata(n,e);if(!t.tokenId){l.push(e),this.logForkProgress(a,`Metadata for #${e} not found. Skipping import.`);continue}this.logForkProgress(a,`Importing token #${t.tokenId}`),console.time(`Importing token #${t.tokenId}`);let i,s,c=new Y;if(!t.image&&!t.image_url)throw new Error("No image in metadata");{let e=t.image?t.image:t.image_url,n=await this._fetchURI(e);i=(0,ln.Z)((new TextDecoder).decode(n))?await this.imageService.newFromSvg((new TextDecoder).decode(n)):await this.imageService.newFromBuffer(n);try{await this.imageService.put(i)}catch(e){}c.coverImageId=i._id,a.images.saved++,this.logForkProgress(a,`Importing image ${i._id}`)}if(t.animation_url){c.coverImageAsAnimation=!1,s=await this.animationService.newFromText((new TextDecoder).decode(await this._fetchURI(t.animation_url)));try{await this.animationService.put(s)}catch(e){}a.animations.saved++,this.logForkProgress(a,`Importing animation ${s._id}`),c.animationId=s._id}else c.coverImageAsAnimation=!0;c.tokenId=t.tokenId,c.title=t.name,c.channelId=o._id,c.attributeSelections=[];for(let e of t.attributes)c.attributeSelections.push({traitType:e.trait_type,value:e.value}),this._addAttributeToChannel(e,o);let f=await this.originalMetadataService.newFromText(JSON.stringify(t));await this.originalMetadataService.put(f),c.originalJSONMetadataId=f._id,await this.itemWebService.put({channel:o,item:c,updateQueryCache:!1,publish:!1}),r.result.count++,(!r.result.min||c.tokenId<r.result.min)&&(r.result.min=c.tokenId),(!r.result.max||c.tokenId>r.result.max)&&(r.result.max=c.tokenId),a.items.saved++,(t.image||t.image_url)&&a.images.total++,t.animation_url&&a.animations.total++,console.timeEnd(`Importing token #${t.tokenId}`)}catch(t){console.log(`Error importing token ${e}: ${t.message}`)}}this.logForkProgress(a,`Skipped tokens: ${l}`),this.logForkProgress(a,`Building query cache for channel ${o._id}`),await this.channelService.buildAttributeCounts(o._id);try{c=await this.queryCacheService.get(r._id)}catch(e){}return c&&(r._rev=c._rev),await this.queryCacheService.put(r),o.importSuccess=!0,await this.channelWebService.put(o),a.channels.saved++,this.logForkProgress(a,`Importing channel ${o._id}`),o._id}async _importAsFork(e,t,a,i,n,s,o,r,c,l,f,d){let p,u,h=new Map;if(!(e&&t&&a&&i))throw new Error("Invalid collection hash");c.authors.total=e.length,c.channels.total=t.length,c.images.total=a.length,c.items.total=i.length,c.animations.total=s.length,c.themes.total=o.length,c.staticPages.total=r.length,this.logForkProgress(c,"Updating totals..."),u=new O,Object.assign(u,t[0]),u.forkType="fork",u.forkedFromFeeRecipient=f.fee_recipient;let g=`${u._id}`;delete u._id,delete u._rev,delete u._rev_tree,d&&(u.forkedFromCid=d),u.forkedFromId=g,await this.channelWebService.put(u),h.set(g,u._id),p=u._id,c.channels.saved++,this.logForkProgress(c,`Inserted channel ${u._id}`);let v,b=new $e;b._id=`token_id_stats_by_channel_${u._id}`,b.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(u._id),u.authorId=this.walletService.address?.toString(),u.authorId&&await this.authorService.insertIfNew(u.authorId);for(let t of e)delete t._rev,delete t._rev_tree,await this.authorService.put(Object.assign(new R,t)),c.authors.saved++,this.logForkProgress(c,`Inserted author ${t._id}`);for(let e of s){e.content=await l.getAsString(`animations/${e.cid}.html`);let t=Object.assign(new m,e);try{await this.animationService.put(t)}catch(e){}c.animations.saved++,this.logForkProgress(c,`Inserted animation ${t._id}`)}for(let e of a){let t;e.generated?(e.svg=await l.getAsString(`images/${e.cid}.${e.generated?"svg":"jpg"}`),t=e.svg):(e.buffer=await l.getAsBuffer(`images/${e.cid}.${e.generated?"svg":"jpg"}`),t=new Uint8Array(e.buffer));let a=Object.assign(new z,e);try{await this.imageService.put(a)}catch(e){}c.images.saved++,this.logForkProgress(c,`Inserted image ${a._id}`)}for(let e of o){let t=e._id;delete e._id,delete e._rev,delete e._rev_tree,e.channelId=h.get(e.channelId);let a=Object.assign(new fe,e);e.forkedFromId=t,await this.themeService.put(a),h.set(t,a._id),c.themes.saved++,this.logForkProgress(c,`Inserted theme ${a._id}`)}for(let e of r){let t=e._id;delete e._id,delete e._rev,delete e._rev_tree,e.channelId=h.get(e.channelId),e.forkedFromId=t;let a=Object.assign(new ne,e);try{await this.staticPageService.put(a)}catch(e){}c.staticPages.saved++,this.logForkProgress(c,`Inserted static page ${a._id}`)}for(let e of i){let t=e._id;if(delete e._id,delete e._rev,delete e._rev_tree,e.channelId=h.get(e.channelId),e.content?.ops?.length>0){let t=[];for(let a of e.content.ops){if(a.insert&&a.insert.ipfsimage){let e=await this.imageService.get(a.insert.ipfsimage.cid);a.insert.ipfsimage.src=await this.imageService.getUrl(e)}t.push(a)}e.content.ops=t}if(e.themes?.length>0){let t=[];for(let a of e.themes)t.push(h.get(a));e.themes=t}e.forkedFromId=t;let a=Object.assign(new Y,e);await this.itemWebService.put({channel:u,item:a,updateQueryCache:!1,publish:!1}),b.result.count++,(!b.result.min||e.tokenId<b.result.min)&&(b.result.min=e.tokenId),(!b.result.max||e.tokenId>b.result.max)&&(b.result.max=e.tokenId),c.items.saved++,this.logForkProgress(c,`Inserted item ${a._id}`)}this.logForkProgress(c,"\n        ******************************\n\n        ******************************\n\n        ******************************\n\n                Import complete\n\n        ******************************\n\n        ******************************\n\n        ******************************\n        "),this.logForkProgress(c,`Building query cache for channel ${p}`),await this.channelService.buildAttributeCounts(u._id);try{v=await this.queryCacheService.get(b._id)}catch(e){}return v&&(b._rev=v._rev),await this.queryCacheService.put(b),u.importSuccess=!0,await this.channelWebService.put(u),p}async _importExisting(e,t,a,i,n,s,o,r,c,l,f,d,p){if(!(e&&t&&a&&i))throw new Error("Invalid collection hash");let u,h;c.authors.total=e.length,c.channels.total=t.length,c.images.total=a.length,c.items.total=i.length,c.animations.total=s.length,c.themes.total=o.length,c.staticPages.total=r.length,this.logForkProgress(c,"Updating totals..."),h=Object.assign(new O,t[0]),h.forkType="existing",h.forkedFromFeeRecipient=f.fee_recipient,delete h._rev,delete h._rev_tree;let g=await this.channelService.getLatestRevision(h._id);g&&(h._deleted=!1,h._rev=g._rev),await this.channelWebService.put(h),u=h._id,c.channels.saved++,this.logForkProgress(c,`Inserted channel ${h._id}`);let v,b=new $e;b._id=`token_id_stats_by_channel_${h._id}`,b.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(u);for(let t of e){delete t._rev,delete t._rev_tree;let e=await this.authorService.getLatestRevision(t._id);e._deleted=!1,await this.authorService.put(Object.assign(e,t)),c.authors.saved++,this.logForkProgress(c,`Inserted author ${t._id}`)}for(let e of s){e.content=await l.getAsString(`animations/${e.cid}.html`);let t=Object.assign(new m,e);try{await this.animationService.put(t)}catch(e){}c.animations.saved++,this.logForkProgress(c)}for(let e of a){let t;e.generated?(e.svg=await l.getAsString(`images/${e.cid}.${e.generated?"svg":"jpg"}`),t=e.svg):(e.buffer=await l.getAsBuffer(`images/${e.cid}.${e.generated?"svg":"jpg"}`),t=new Uint8Array(e.buffer));let a=Object.assign(new z,e);try{await this.imageService.put(a)}catch(e){}c.images.saved++,this.logForkProgress(c)}for(let e of o){delete e._rev,delete e._rev_tree;let t=await this.themeRepository.getLatestRevision(e._id);t._deleted=!1,await this.themeRepository.put(Object.assign(t,e)),c.themes.saved++,this.logForkProgress(c,`Inserted theme ${t._id}`)}for(let e of r){delete e._rev,delete e._rev_tree;let t=await this.staticPageRepository.getLatestRevision(e._id);t._deleted=!1,await this.staticPageRepository.put(Object.assign(t,e)),c.staticPages.saved++,this.logForkProgress(c,`Inserted static page ${t._id}`)}for(let e of i){if(e.content?.ops?.length>0){let t=[];for(let a of e.content.ops){if(a.insert&&a.insert.ipfsimage){let e=await this.imageService.get(a.insert.ipfsimage.cid);a.insert.ipfsimage.src=await this.imageService.getUrl(e)}t.push(a)}e.content.ops=t}delete e._rev,delete e._rev_tree;let t=await this.itemService.getLatestRevision(e._id);t&&(e._deleted=!1,e._rev=t._rev);let a=await this.originalMetadataService.newFromText(JSON.stringify(d[e.tokenId]));await this.originalMetadataService.put(a),e.originalJSONMetadataId=a._id,await this.itemWebService.put({channel:h,item:Object.assign(new Y,e),updateQueryCache:!1,publish:!1}),b.result.count++,(!b.result.min||e.tokenId<b.result.min)&&(b.result.min=e.tokenId),(!b.result.max||e.tokenId>b.result.max)&&(b.result.max=e.tokenId),c.items.saved++,this.logForkProgress(c)}this.logForkProgress(c,"\n        ******************************\n\n        ******************************\n\n        ******************************\n\n                Import complete\n\n        ******************************\n\n        ******************************\n\n        ******************************\n        "),this.logForkProgress(c,`Building query cache for channel ${h._id}`),await this.channelService.buildAttributeCounts(h._id);try{v=await this.queryCacheService.get(b._id)}catch(e){}return v&&(b._rev=v._rev),await this.queryCacheService.put(b),h.importSuccess=!0,await this.channelWebService.put(h),this.logForkProgress(c,`Forking channel ${h._id} complete`),t[0]._id}_addAttributeToChannel(e,t){let a,i=t.attributeOptions.filter((t=>t.traitType==e.trait_type));i?.length>0?a=i[0]:(t.attributeOptions.push({id:(0,At.Z)(),traitType:e.trait_type,values:[e.value]}),a=t.attributeOptions[t.attributeOptions.length-1]),a.values.includes(e.value)||a.values.push(e.value)}async _getTokenMetadata(e,t){let a,i=`${await e.getAddress()}-${t}`;try{a=await this.tokenMetadataCacheRepository.get(i)}catch(e){}if(a)return console.log(`Returning cached token metadata #${t}`),a.tokenMetadata;let n=await e.tokenURI(t),s=await this._fetchURI(n),o=JSON.parse((new TextDecoder).decode(s));return o.tokenId=t,await this.tokenMetadataCacheRepository.put({_id:i,tokenMetadata:o,dateCreated:(new Date).toJSON()}),o}async _fetchURI(e){if(e.startsWith("data:application/json;utf-8,"))return fn.from(e.substring(28,e.length));if(e.startsWith("data:image/bmp;base64,"))return fn.from(e.substring(22,e.length),"base64");if(e.startsWith("http")){let t=await fi.Z.get(e,{responseType:"arraybuffer"});return fn.from(t.data,"binary")}{let t=hn.containsCID(e);if(t?.containsCid){e=hn.convertToDesiredGateway(e,"");return(0,tn.z)(await(0,Qi.Z)(this.ipfsService.ipfs.cat(e)))}}}async _readFile(e){let t=await(0,Yi.Z)(this.ipfsService.ipfs.files.read(e));return JSON.parse(new TextDecoder("utf-8").decode(t))}async _fetchFile(e){return(await fi.Z.get(e)).data}logForkProgress(e,t){if(t&&console.log(t),"undefined"!=typeof window&&void 0!==window.document){const a=new CustomEvent("fork-progress",{detail:{forkStatus:e,message:t}});document.dispatchEvent(a)}}_getERC721ABI(){return'[\n            {\n                "inputs":[\n                   {\n                      "internalType":"string",\n                      "name":"name",\n                      "type":"string"\n                   },\n                   {\n                      "internalType":"string",\n                      "name":"symbol",\n                      "type":"string"\n                   }\n                ],\n                "stateMutability":"nonpayable",\n                "type":"constructor"\n            },\n\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "name",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "string"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_spender",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "approve",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "totalSupply",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_from",\n                  "type": "address"\n                },\n                {\n                  "name": "_to",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "transferFrom",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "decimals",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint8"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [\n                {\n                  "name": "_owner",\n                  "type": "address"\n                }\n              ],\n              "name": "balanceOf",\n              "outputs": [\n                {\n                  "name": "balance",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "symbol",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "string"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_to",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "transfer",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [\n                {\n                  "name": "_owner",\n                  "type": "address"\n                },\n                {\n                  "name": "_spender",\n                  "type": "address"\n                }\n              ],\n              "name": "allowance",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "payable": true,\n              "stateMutability": "payable",\n              "type": "fallback"\n            },\n            {\n              "anonymous": false,\n              "inputs": [\n                {\n                  "indexed": true,\n                  "name": "owner",\n                  "type": "address"\n                },\n                {\n                  "indexed": true,\n                  "name": "spender",\n                  "type": "address"\n                },\n                {\n                  "indexed": false,\n                  "name": "value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "Approval",\n              "type": "event"\n            },\n            {\n              "anonymous": false,\n              "inputs": [\n                {\n                  "indexed": true,\n                  "name": "from",\n                  "type": "address"\n                },\n                {\n                  "indexed": true,\n                  "name": "to",\n                  "type": "address"\n                },\n                {\n                  "indexed": false,\n                  "name": "value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "Transfer",\n              "type": "event"\n            },\n            {\n                "inputs":[\n                   {\n                      "internalType":"uint256",\n                      "name":"tokenId",\n                      "type":"uint256"\n                   }\n                ],\n                "name":"tokenURI",\n                "outputs":[\n                   {\n                      "internalType":"string",\n                      "name":"",\n                      "type":"string"\n                   }\n                ],\n                "stateMutability":"view",\n                "type":"function"\n             }\n             \n          ]'}};mn=dn([(0,s.b)(),un(17,(0,o.f)(i.WalletService)),un(18,(0,o.f)("contracts")),pn("design:paramtypes",[_a,si,ha,We,wa,ti,da,Da,Lt,qa,ue,Et,re,Wa,cn,va,ye,Object,Object])],mn);class gn{ipfsService;basePath="/fork/";constructor(e){this.ipfsService=e}async getAsString(e){let t=await(0,Yi.Z)(this.ipfsService.ipfs.files.read(`${this.basePath}${e}`));return new TextDecoder("utf-8").decode(t)}async getAsBuffer(e){return(0,Yi.Z)(this.ipfsService.ipfs.files.read(`${this.basePath}${e}`))}}class vn{basePath;constructor(e){this.basePath=e}async getAsString(e){let t=await fi.Z.get(`${this.basePath}backup/export/${e}`);return t.data?.toString()}async getAsBuffer(e){return(await fi.Z.get(`${this.basePath}backup/export/${e}`,{responseType:"arraybuffer"})).data}}function bn(e,{$:t,$on:a,$f7:i,$update:s}){let o,r,c=n.getInstance(mn),l=n.getInstance(Da),d=n.getWalletService(),p=n.getInstance(f),u=null!=l.ipfs,h=l.peerCount,m=e.cid,g=!1,v="",b="existing",y=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Fork Collection From IPFS Hash"}];a("pageInit",(async()=>{await l.init(),u=null!=l.ipfs,await s()}));const w=async e=>{e.preventDefault();let t=i.form.convertToData("#import-ipfs-hash");g=!0,s(),p.showSpinner("Forking...");try{r=await c.importFromIPFS(t.hash,b,t.authorId)}catch(e){console.log(e),p.hideSpinner(),i.dialog.alert(e.message,"There was an error")}p.hideSpinner(),g=!1,s()};t(document).on("fork-progress",(async e=>{e.detail.message&&(v=`<p>${e.detail.message}</p>`),o=e.detail.forkStatus,g=!0,s();let a=document.getElementById("ipfs-fork-process");a&&t(a).scrollTop(a.scrollHeight)}));const S=async e=>{e.preventDefault(),b=t(e.currentTarget).val(),await s()};return t(document).on("update-peers",(async e=>{h=e.detail.count,s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-fork">

    <${ki} breadcrumbs=${y} />

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
  
          ${!g&!r?t`
            
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
  
            ${g?t`
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
  
  
                  ${u&!g&!r?t`
  
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
                                  <input type="text" name="hash" placeholder="Enter IPFS Hash" value="${m||""}" required />
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

`}}bn.id="6a915db3d4",bn.style="\n  .ipfs-label,\n  .fork-label {\n      margin-top: 10px;\n      margin-bottom: 10px;\n      font-weight: bold;\n      font-size: 18px;\n  }\n\n  .fork-output {\n      border: 1px solid #cccccc;\n      font-size: 13px;\n      width: 100%;\n      max-width: 100%;\n      padding: 5px;\n      height: 300px;\n      overflow-y: scroll;\n  }\n\n  .fork-status {\n      font-size: 14px;\n      padding: 10px;\n      border: 1px solid #f1f1f1;\n  }\n\n  .fork-status .item label {\n      font-weight: bold;\n      display: inline-block;\n      width: 180px;\n  }\n\n\n\n";const yn=bn;function wn(e,{$:t,$on:a,$f7:i,$update:s}){let o,r,c,l,d=n.getInstance(mn),p=n.getInstance(Da),u=n.getInstance(f),h=e.contractAddress,m=!1,g="",v="existing",b=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Fork Collection From Contract"}],y=!1;a("pageInit",(async()=>{o=n.getWalletService(),r=await o.getAddress(),await p.init(),y=null!=p.ipfs,await s()}));const w=async e=>{e.preventDefault(),v=t(e.currentTarget).val(),await s()},S=async e=>{e.preventDefault();let t=i.form.convertToData("#import-fork-contract");m=!0,s(),u.showSpinner("Forking...");try{c="existing"==v?await d.importExistingFromContract(t.contractAddress):await d.importAsForkFromContract(t.contractAddress),u.hideSpinner()}catch(e){console.log(e),u.hideSpinner(),i.dialog.alert(e.message,"There was an error")}m=!1,s()};return t(document).on("fork-progress",(async e=>{e.detail.message&&(g=`<p>${e.detail.message}</p>`),l=e.detail.forkStatus,m=!0,s();let a=document.getElementById("ipfs-fork-process");a&&t(a).scrollTop(a.scrollHeight)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-fork-contract">

    <${ki} breadcrumbs=${b} />
    <${Ze} />

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
  
            ${y&!m&!c?t`
  
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
  
  
  
            ${m||g?t`
  
              <div class="card">
  
                ${m?t`
                  <div class="card-header">
                      Forking...
                  </div>  
    
                `:t`<span />`}
    
  
                <div class="card-content">
                    <div class="card-content card-content-padding">
    
                      ${g?t`
  
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
                          <div class="fork-output-simple" innerHTML="${g}" id="ipfs-fork-process" ></div>
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

`}}wn.id="7a34ad522f",wn.style="\n\n";const Sn=wn;function $n(e,{$:t,$on:a,$f7:i,$update:s}){let o,r,c,l,d,p,u,h=n.getInstance(mn),m=n.getInstance(Da),g=n.getWalletService(),v=n.getInstance(f),b=(m.ipfs,m.peerCount,!1),y="",w="existing",S=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Fork Collection From Reader"}],$=window.location.hash?window.location.hash.substring(window.location.hash?.indexOf("?"),window.location.hash.length):void 0;const k=new URLSearchParams($);let I={};k.get("path")&&(I.path=decodeURIComponent(k.get("path")));const R=async e=>{try{d=await g.getAddress(),c=await P(),l=await C(),o=await T(),I.title=c.title,p=c.title}catch(e){i.dialog.alert(e,"Error loading collection. Not found.")}},x=async e=>{e.preventDefault(),I.path=t("#libraryURL").val(),await R(),await s()},_=e=>g.truncateEthAddress(e),P=async()=>(await fi.Z.get(`${I.path}backup/export/backup/channels.json`)).data[0],C=async()=>(await fi.Z.get(`${I.path}backup/export/backup/authors.json`)).data[0],T=async()=>{try{return(await fi.Z.get(`${I.path}backup/contract/contract.json`)).data}catch(e){console.log(e)}};a("pageInit",(async()=>{I.path&&await R(),await s()}));const A=async e=>{e.preventDefault(),w=t(e.currentTarget).val(),await s()},O=async e=>{e.preventDefault(),p=t(e.currentTarget).val(),await s()},j=async e=>{e.preventDefault(),b=!0,await s(),v.showSpinner("Forking...");try{u="existing"==w?await h.importExistingFromReader(I.path,o.contractAddress,o.ipfsCid):await h.importAsForkFromReader(I.path,p),v.hideSpinner()}catch(e){console.log(e),v.hideSpinner(),i.dialog.alert(e.message,"Error loading collection")}b=!1,await s()};return t(document).on("fork-progress",(async e=>{e.detail.message&&(y=`<p>${e.detail.message}</p>`),r=e.detail.forkStatus,b=!0,s();let a=document.getElementById("ipfs-fork-process");a&&t(a).scrollTop(a.scrollHeight)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-fork-contract">

    <${ki} reader_config=${I} breadcrumbs=${S}  />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        <div class="block-title">Fork Collection From Reader</div>

        ${!b&!u?t`
  
          ${c?t`
          
            <form @submit="${j}" id="import-from-reader">
  
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
                                    <option value="${l._id}">${_(l._id)} (Original Author)</option>
                                  `:t`
    
                                    ${d?t`
                                      <option value="${d}">${_(d)}</option>
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
            
            <form @submit="${x}">
  
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

`}}$n.id="41461107c7",$n.style="\n\n\n\n\n\n";const kn=$n;function In(e,{$:t,$on:a,$f7:i,$update:s}){let o=n.getInstance(si),r=e.channelViewModel;const c=async e=>{e.preventDefault();try{await o.upgrade(r.channel)}catch(e){console.log(e),i.dialog.alert(e,"There was an error")}},l=async e=>{e.preventDefault(),i.preloader.show();try{await o.regenerateItemMedia(r.channel)}catch(e){console.log(e),i.dialog.alert(e,"There was an error")}i.preloader.hide()};return a("pageInit",(async(e,t)=>{})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-edit-channel">

    <${ki} />

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

`}}In.id="13d6cb4001",In.style="\n\n";const Rn=In;var xn=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},_n=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Pn=function(e,t){return function(a,i){t(a,i,e)}};let Cn=class{channelWebService;itemWebService;schemaService;themeService;staticPageService;footerText;constructor(e,t,a,i,n,s){this.channelWebService=e,this.itemWebService=t,this.schemaService=a,this.themeService=i,this.staticPageService=n,this.footerText=s}async app(){return new wi((async e=>({footerText:this.footerText})),Ri)}async create(){return new wi((async e=>{}),Fi)}async createMenu(){return new wi((async e=>{}),Ki)}async fork(){return new wi((async e=>({cid:e.query.cid})),yn)}async forkContract(){return new wi((async e=>({footerText:this.footerText,contractAddress:e.query.contractAddress})),Sn)}async forkReader(){return new wi((async e=>({footerText:this.footerText})),kn)}async show(){return new wi((async e=>{await this.schemaService.loadChannel(e.params.id);let t=await this.channelWebService.get(e.params.id);return{channelViewModel:t,firstPageItems:await this.itemWebService.listByChannel(t.channel._id,te.CHUNK_SIZE,0)}}),Mi)}async themes(){return new wi((async e=>{await this.schemaService.loadChannel(e.params.id);let t=await this.channelWebService.get(e.params.id);return{channelViewModel:t,themes:await this.themeService.listByChannel(t.channel._id,1e3,0)}}),Hi)}async staticPages(){return new wi((async e=>{await this.schemaService.loadChannel(e.params.id);let t=await this.channelWebService.get(e.params.id);return{channelViewModel:t,staticPages:await this.staticPageService.listByChannel(t.channel._id,1e3,0)}}),Wi)}async edit(){return new wi((async e=>(await this.schemaService.loadChannel(e.params.id),{channelViewModel:await this.channelWebService.get(e.params.id)})),Zi)}async upgrade(){return new wi((async e=>(await this.schemaService.loadChannel(e.params.id),{channelViewModel:await this.channelWebService.get(e.params.id)})),Rn)}};xn([Si("/"),_n("design:type",Function),_n("design:paramtypes",[]),_n("design:returntype",Promise)],Cn.prototype,"app",null),xn([Si("/admin/channel/create"),_n("design:type",Function),_n("design:paramtypes",[]),_n("design:returntype",Promise)],Cn.prototype,"create",null),xn([Si("/admin/channel/create-menu"),_n("design:type",Function),_n("design:paramtypes",[]),_n("design:returntype",Promise)],Cn.prototype,"createMenu",null),xn([Si("/admin/channel/fork"),_n("design:type",Function),_n("design:paramtypes",[]),_n("design:returntype",Promise)],Cn.prototype,"fork",null),xn([Si("/admin/channel/fork-contract"),_n("design:type",Function),_n("design:paramtypes",[]),_n("design:returntype",Promise)],Cn.prototype,"forkContract",null),xn([Si("/admin/channel/fork-reader"),_n("design:type",Function),_n("design:paramtypes",[]),_n("design:returntype",Promise)],Cn.prototype,"forkReader",null),xn([Si("/admin/channel/show/:id"),_n("design:type",Function),_n("design:paramtypes",[]),_n("design:returntype",Promise)],Cn.prototype,"show",null),xn([Si("/admin/channel/themes/:id"),_n("design:type",Function),_n("design:paramtypes",[]),_n("design:returntype",Promise)],Cn.prototype,"themes",null),xn([Si("/admin/channel/static-pages/:id"),_n("design:type",Function),_n("design:paramtypes",[]),_n("design:returntype",Promise)],Cn.prototype,"staticPages",null),xn([Si("/admin/channel/edit/:id"),_n("design:type",Function),_n("design:paramtypes",[]),_n("design:returntype",Promise)],Cn.prototype,"edit",null),xn([Si("/admin/channel/upgrade/:id"),_n("design:type",Function),_n("design:paramtypes",[]),_n("design:returntype",Promise)],Cn.prototype,"upgrade",null),Cn=xn([(0,s.b)(),Pn(5,(0,o.f)("footer-text")),_n("design:paramtypes",[si,ti,We,Et,Wa,String])],Cn);var Tn,An=a(6869),On=a.n(An),jn=a(48764).Buffer,Fn=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},En=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Dn=function(e,t){return function(a,i){t(a,i,e)}};let Bn=class{static{Tn=this}settingsService;dayjs;static BASE_URL="https://api.github.com";static GRAPHQL_URL="https://api.github.com/graphql";static READER_REPO_OWNER="LargeNFT";static READER_REPO="large-reader";constructor(e,t){this.settingsService=e,this.dayjs=t}async createFork(e){console.log("Creating reader fork...");let t=(await this.settingsService.get()).gitProviders.github;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let a=await this.getExistingFork(e);if(a)return a;let i=`${Tn.BASE_URL}/repos/${Tn.READER_REPO_OWNER}/${Tn.READER_REPO}/generate`,n=(await fi.Z.post(i,{owner:t.username,name:this.getBranchName(e),include_all_branches:!1,private:!0},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;return{id:n.id,httpUrlToRepo:n.html_url,path:n.name,branch:"master"}}async createVariables(e){let t=await this.settingsService.get(),a=t.gitProviders.github;if(a.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");t.alchemyKey&&await this._createVariable(e,a,"ALCHEMY_API_KEY",t.alchemyKey)}async _createVariable(e,t,a,i){let n=`${Tn.BASE_URL}/repos/${t.username}/${this.getBranchName(e)}/actions/secrets/public-key`;const s=i;let o=(await fi.Z.get(n,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;await On().ready;let r=On().from_base64(o.key,On().base64_variants.ORIGINAL),c=On().from_string(s),l=On().crypto_box_seal(c,r),f=On().to_base64(l,On().base64_variants.ORIGINAL),d=`${Tn.BASE_URL}/repos/${t.username}/${this.getBranchName(e)}/actions/secrets/${a}`;return fi.Z.put(d,{key_id:o.key_id,encrypted_value:f},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}async getExistingFork(e){let t=(await this.settingsService.get()).gitProviders.github;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");try{let a=`${Tn.BASE_URL}/repos/${t.username}/${this.getBranchName(e)}`,i=(await fi.Z.get(a,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;if(i.id)return{id:i.id,httpUrlToRepo:i.html_url,path:i.name,branch:"master"}}catch(e){}}async getForkRepoStatus(e){if((await this.settingsService.get()).gitProviders.github.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");return await this.getExistingFork(e)?"finished":"pending"}async commit(e,t,a){let i,n=0,s=this.chunkIt(t,100);for(const[o,r]of s.entries()){n+=r.length,this.logPublishProgress(`Commiting reader data for ${e.title} to GitHub: committing ${r.length} actions. ${n} / ${t.length}`);let c=await this.getMostRecentCommitOid(e,a);const l=r.map((e=>({path:e.file_path.slice(1),contents:jn.from(e.content).toString("base64")})));let f="";f=o===s.length-1?"Commiting reader data complete":`Commiting reader data for ${e.title}`;const d=`\n                mutation createCommit($additions: [FileAddition!]!, $oid: GitObjectID!) {\n                    createCommitOnBranch (input: {\n                        branch : {\n                            repositoryNameWithOwner: "${a.username}/${this.getBranchName(e)}"\n                            branchName: "master"\n                        }\n                        message: {\n                            headline: "${f}"\n                        }\n                        fileChanges: {\n                            additions: $additions\n                        }\n                        expectedHeadOid: $oid\n                        }) {\n                        commit {\n                            commitUrl\n                        }\n                    }\n                }\n            `,p={oid:c,additions:l};i=(await fi.Z.post(Tn.GRAPHQL_URL,{query:d,variables:p},{headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.personalAccessToken}`}})).data.data.createCommitOnBranch.commit.commitUrl.split("/").pop(),this.logPublishProgress(`Commit successful: ${i}`)}return i}async getMostRecentActionRun(e,t){if(!e.publishReaderIPFSStatus?.headSha)return;const a=await fi.Z.get(`${Tn.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/actions/workflows/main.yml/runs?per_page=1&page=1&head_sha=${e.publishReaderIPFSStatus.headSha}`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}});return a.data.workflow_runs?.length>0?a.data.workflow_runs[0]:void 0}async createCommit(e,t,a,i,n){const s=await fi.Z.post(`${Tn.BASE_URL}/repos/${n.username}/${a.publishReaderRepoPath}/git/commits`,{message:i,parents:[e],tree:t},{headers:{Authorization:`Bearer ${n.personalAccessToken}`}});await fi.Z.patch(`${Tn.BASE_URL}/repos/${n.username}/${a.publishReaderRepoPath}/git/refs/heads/master`,{sha:s.data.sha},{headers:{Authorization:`Bearer ${n.personalAccessToken}`}})}async createTree(e,t,a,i){let n={tree:t,base_tree:e};return(await fi.Z.post(`${Tn.BASE_URL}/repos/${i.username}/${a.publishReaderRepoPath}/git/trees`,n,{headers:{Authorization:`Bearer ${i.personalAccessToken}`,Accept:"application/vnd.github+json"}})).data.sha}async deleteReaderBackup(e,t){if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing files from repo..."),await this.deleteDirectory(e,t,".upload"),this.logPublishProgress("Successfully deleted existing backup...")}async deleteContractBackup(e,t){if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing contract files from repo..."),await this.deleteDirectory(e,t,"backup/contract")}async getMostRecentCommit(e,t){return(await fi.Z.get(`${Tn.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/commits/master`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data}async getMostRecentCommitOid(e,t){const a=`\n            query GetBranch{\n                repository (name: "${this.getBranchName(e)}", owner: "${t.username}") {\n                    ref (qualifiedName: "master") {\n                        target {\n                            ... on Commit {\n                                history(first: 1) {\n                                    nodes {\n                                        oid\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        `;return(await fi.Z.post(Tn.GRAPHQL_URL,JSON.stringify({query:a}),{headers:{"Content-Type":"application/json",Authorization:`Bearer ${t.personalAccessToken}`}})).data.data.repository.ref.target.history.nodes[0].oid}async deleteDirectory(e,t,a){const i=await this.getMostRecentCommit(e,t),n=i.commit.tree.sha;let s=(await fi.Z.get(`${Tn.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/git/trees/${n}`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data.tree,o=s.find((e=>e.path==a))?.sha;if(o){let s=(await fi.Z.get(`${Tn.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/git/trees/${o}`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`},params:{recursive:!0}})).data.tree.filter((({type:e})=>"blob"===e)).map((e=>({path:`${a}/${e.path}`,mode:e.mode,type:e.type,sha:null})));const r=await this.createTree(n,s,e,t);await this.createCommit(i.sha,r,e,`Deleting ${a}`,t)}}logPublishProgress(e){if(console.log(e),"undefined"!=typeof window&&void 0!==window.document){const t=new CustomEvent("publish-progress",{detail:{message:e}});document.dispatchEvent(t)}}chunkIt(e,t){let a=[];for(let i=0;i<e.length;i+=t){let n=e.slice(i,i+t);a.push(n)}return a}getBranchName(e){return e.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}};Bn=Tn=Fn([(0,s.b)(),Dn(1,(0,o.f)("dayjs")),En("design:paramtypes",[Gt,Object])],Bn);var Mn=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Ln=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Nn=class{carRepository;db;constructor(e){this.carRepository=e}async get(e){return this.carRepository.get(e)}async put(e){e.dateCreated||(e.dateCreated=(new Date).toJSON());let t=await(0,_t.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new xt(t);await this.carRepository.put(e)}async delete(e){await this.carRepository.delete(e)}async getByIds(e){return this.carRepository.getByIds(e)}};Nn=Mn([(0,s.b)(),Ln("design:paramtypes",[qe])],Nn);var Un=a(48764).Buffer,Hn=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},qn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Gn=class{settingsService;channelService;gitlabService;githubService;carService;fs;repoURI;defaultBranch;constructor(e,t,a,i,n){this.settingsService=e,this.channelService=t,this.gitlabService=a,this.githubService=i,this.carService=n}async deployReader(e){this.logPublishProgress("Deploying reader...");let t=await this.settingsService.get(),a=await this.channelService.getGitProviderCredentials(e,t);if(a.personalAccessToken.length<1)throw new Error(`${a.name} personal access token not set`);let i=[],n=await this.carService.get("export"),s=await this.carService.get("contract");if(!n)throw new Error("Generate an IPFS .car bundle before deploying to git provider.");switch(i.push({action:"create",file_path:"/backup/export.car",content:n.content}),s&&e.contractAddress&&i.push({action:"create",file_path:"/backup/contract.car",content:s.content}),a.name){case"gitlab":return await this.gitlabService.createVariables(e),await this.gitlabService.deleteReaderBackup(e,a),this.gitlabService.commit(e,i,a);case"github":return await this.githubService.createVariables(e),await this.githubService.deleteReaderBackup(e,a),this.githubService.commit(e,i,a)}this.logPublishProgress("Export to git complete")}async deployReaderContract(e,t){let a=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,a);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return await this.gitlabService.deleteContractBackup(e,i),this.gitlabService.commit(e,t,i);case"github":return this.githubService.commit(e,t,i)}this.logPublishProgress("Export to git complete")}async getExistingFork(e){let t=await this.settingsService.get(),a=await this.channelService.getGitProviderCredentials(e,t);if(a.personalAccessToken.length<1)throw new Error(`${a.name} personal access token not set`);switch(a.name){case"gitlab":return this.gitlabService.getExistingFork(e);case"github":return this.githubService.getExistingFork(e)}}async createFork(e){let t=await this.settingsService.get(),a=await this.channelService.getGitProviderCredentials(e,t);if(a.personalAccessToken.length<1)throw new Error(`${a.name} personal access token not set`);switch(a.name){case"gitlab":return this.gitlabService.createFork(e);case"github":return this.githubService.createFork(e)}}async createVariables(e){let t=await this.settingsService.get(),a=await this.channelService.getGitProviderCredentials(e,t);if(a.personalAccessToken.length<1)throw new Error(`${a.name} personal access token not set`);switch(a.name){case"gitlab":return this.gitlabService.createVariables(e);case"github":return this.githubService.createVariables(e)}}async getForkRepoStatus(e){let t=await this.settingsService.get(),a=await this.channelService.getGitProviderCredentials(e,t);if(a.personalAccessToken.length<1)throw new Error(`${a.name} personal access token not set`);switch(a.name){case"gitlab":return this.gitlabService.getForkRepoStatus(e);case"github":return this.githubService.getForkRepoStatus(e)}}logPublishProgress(e){if(console.log(e),"undefined"!=typeof window&&void 0!==window.document){const t=new CustomEvent("publish-progress",{detail:{message:e}});document.dispatchEvent(t)}}chunkArrayByBytes(e,t){let a=[],i={};e.forEach((e=>{if(i[e._id]=Un.byteLength(JSON.stringify(e),"utf8"),console.log(e),i[e._id]>t)throw new Error("Image larger than 15MB found. Upload can not proceed.")}));let n=[],s=0;for(let o of e)s+i[o._id]>=t&&(a.push(n),n=[],s=0),n.push(o),s+=i[o._id];return n.length>0&&a.push(n),a}};function zn(e,{$:t,$on:a,$f7:i,$update:s}){let o=n.getInstance(Kt),r=(n.getInstance(ut),n.getInstance(ti)),c=n.getInstance(Lt),l=n.getInstance(f);const d=async()=>{$.images=await r.getImagesFromContent({title:$.item.title,content:{ops:o.activeEditor.getContents().ops},coverImageCSS:$.item.coverImageCSS,themes:$.item.themes}),1==$.images?.length&&($.coverImage=$.images[0]),o.activeEditor.update(),await s()},p=async e=>{let a=t(e.currentTarget).data("id"),i=$?.images.filter((e=>e.cid==a));i?.length>0&&($.coverImage=i[0]),await s()},u=async e=>{e.preventDefault(),$.coverImage=void 0,await s()},h=async e=>{let a=t(e.currentTarget).data("id");w.filter((e=>e.id==a))[0].value=t(e.currentTarget).val(),await s()},m=async e=>{let a=t(e.currentTarget).val();$.item.themes=a,await s(),await d()},g=e=>{let a=t(e.currentTarget).val();$.item.title=a,document.dispatchEvent(new CustomEvent("load-cover-images"))},v=e=>{T=t(e.currentTarget).prop("checked"),s()},b=async e=>{e.preventDefault();let t=i.form.convertToData("#generate-form");try{await o.generateAIImage(t.model,t.prompt,t.negativePrompt),i.popup.close(".ai-popup")}catch(e){l.hideSpinner(),i.dialog.alert(e.message,"There was an error")}};let y,w,S,$=e.item,k=e.editor,I=e.toolbar,R=e.themes,x=e.cancel_link,_=($.coverImage,e.cover_image_css_editor_id),P=e.animation_css_editor_id,C=e.show_hugging_face,T=!$.item.coverImageAsAnimation;return $&&(e=>{w=e;for(let e of w)!e.value&&e.values?.length>0&&(e.value=e.values[0])})($.attributeSelections),t(document).on("image-selected",(async e=>{$.coverImage=await c.get(e.detail._id),await d()})),t(document).on("update-cover-image-css",(async e=>{$.item.coverImageCSS=e?.detail?.coverImageCSS,await d()})),t(document).on("load-cover-images",(async e=>{await d()})),t(document).on("ipfs-ready",(async e=>{y=!0,await s()})),t(document).on("hugging-face-ready",(async e=>{C=!0,await s()})),t(document).on("set-ai-prompt",(async e=>{let t=o.activeEditor.getSelection();t&&(t.length>0?(S=o.activeEditor.getText(t.index,t.length),console.log("User has highlighted: ",S)):S=""),await s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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
                                                @input="${g}" />
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
                                    <select name="themes" @change="${m}" tabindex="2" multiple>
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
                                    <div class="editor bg-color-white text-color-black css-editor" id="${_}" tabindex="3"></div>
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
       
                            <a href="${x}" class="button button-outline color-gray" tabindex="12">Cancel</a>
                
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
                                            ${e?.values?.map((a=>t`

                                                ${e?.value?.toString()==a.toString()?t`
                                                <option value="${a}" selected>${a}</option>
                                                `:t`
                                                <option value="${a}">${a}</option>
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

`}}Gn=Hn([(0,s.b)(),qn("design:paramtypes",[Gt,_a,mi,Bn,Nn])],Gn),zn.id="8311f28a10",zn.style="\n    .cover-image-thumbnail {\n        width: 250px;\n        height: 250px;\n    }\n\n    .cover-image-thumbnail.selected {\n        border: 3px solid #ff0000;\n    }\n\n    #title-header-input {\n        line-height: 30px;\n        font-size: 30px;\n        font-weight: 700;\n        height: 50px;\n    }\n\n    .clear-button {\n        width: 100px;\n    }\n";const Wn=zn;a(69942);function Vn(e,{$:t,$on:a,$f7:i,$update:s}){let o,r,c=n.getInstance(Kt),l=n.getInstance(ut),d=n.getInstance(f),p=n.getInstance(wa),u=(n.getInstance(Lt),n.getInstance(ti)),h=n.getInstance(Da),m=(n.getInstance(Gn),n.getInstance(Gt)),g=n.getInstance(Vt),v=(n.getWalletService(),e.itemViewModel),b=e.themes,y=!1,w=`/admin/channel/show/${v.channel._id}`,S=!1,$=[{text:"Home",path:"/"},{text:v.channel.title,path:`/admin/channel/show/${v.channel._id}`},{text:"Create Item"}];Oi.Z.configure({languages:["css"]});const k=async e=>{e.preventDefault(),await h.init();let t=i.form.convertToData("#create-item-form"),a=Object.assign(new Y,t);a.coverImageAsAnimation="on"!=t.coverImageAsAnimation[0],a.content=c.activeEditor.getContents(),a.coverImageCSS="\n"!=o.getText()?o.getText():void 0,a.animationCSS="\n"!=r.getText()?r.getText():void 0,a.attributeSelections=JSON.parse(a.attributeSelections).map((e=>({id:e.id,traitType:e.traitType,value:e.value}))),a.contentHTML=await l.translateContent(a.content,!0);let n=await u.saveGeneratedCoverImage(a);a.coverImageGenerated=n.generated,a.tokenId=await p.getNextTokenId(a.channelId),a.coverImageAsAnimation||await u.saveAnimation(a);try{d.showSpinner(),await u.put({channel:v.channel,item:a,updateQueryCache:!0,publish:!1});i.toast.show({text:"Item created",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});i.views.main.router.navigate(`/admin/channel/show/${a.channelId}/${a.tokenId}`)}catch(e){console.log(e),i.dialog.alert(e.errors,"There was an error")}};return a("pageInit",(async(e,a)=>{c.buildQuillPostEditor("#create-item-editor","#create-item-toolbar"),c.activeEditor.root.addEventListener("blur",(function(){document.dispatchEvent(new CustomEvent("load-cover-images"))})),c.activeEditor.on("text-change",((e,t,a)=>{if(document.dispatchEvent(new CustomEvent("load-cover-images")),"user"!==a)return;const i=function(e){return e.ops.filter((e=>e.insert&&e.insert.ipfsimage)).map((e=>e.insert.ipfsimage))}(c.activeEditor.getContents().diff(t));i.forEach((e=>{v.images=v.images.filter((t=>t.cid!=e.cid)),e.cid==v.coverImage?.cid&&(v.coverImage=void 0)}))})),t(".image-button").off("click"),t(".image-button-input").off("click"),t(".ai-button").off("click"),t(".image-button").on("click",(function(e){e.preventDefault();t(".image-button-input").click()})),t(".image-button-input").on("change",(async function(e){e.preventDefault(),await c.imageSelected(this)})),t(".ai-button").on("click",(async function(e){e.preventDefault();const t=new CustomEvent("set-ai-prompt");document.dispatchEvent(t),i.popup.open(".ai-popup")})),o=new(gt())("#cover-image-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>Oi.Z.highlightAuto(e).value},toolbar:!1}}),o.on("text-change",((e,t,a)=>{document.dispatchEvent(new CustomEvent("update-cover-image-css",{detail:{coverImageCSS:"\n"!=o.getText()?o.getText():void 0}}))})),r=new(gt())("#animation-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>Oi.Z.highlightAuto(e).value},toolbar:!1}}),o.setText(".svg-h1 {}"),r.setText(".animation-container {}"),await s(),d.showSpinner(),await h.init(),y=null!=h.ipfs;const n=new CustomEvent("ipfs-ready");document.dispatchEvent(n);const l=await m.get();if(S=null!=l?.huggingFace,l?.huggingFace?.length>0){await g.init();const e=new CustomEvent("hugging-face-ready");document.dispatchEvent(e)}d.hideSpinner(),await s()})),a("pageBeforeRemove",(()=>{})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-create-item">

    <${ki} breadcrumbs=${$} />

    <div class="page-content hide-toolbar-on-scroll">

      <form class="list media-list" id="create-item-form" @submit="${k}">

        <${Wn} item=${v} 
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

`}}Vn.id="c0feb08ff5",Vn.style="\n  #create-item-editor {\n    min-height: 175px;\n    height: 100%;\n    /* added these styles */\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n  }\n";const Zn=Vn;function Jn(e,{$:t,$on:a,$f7:i,$update:s}){n.getInstance(wa);let o=n.getInstance(f),r=n.getInstance(ti),c=e.itemViewModel,l=(c.editable,[{text:"Home",path:"/"},{text:c.channel.title,path:`/admin/channel/show/${c.channel._id}`},{text:c.item.title?c.item.title:`#${c.item.tokenId}`}]);a("pageInit",(async(e,a)=>{t(`#item-content-${c.item._id} a`).addClass("external"),await s()}));const d=async e=>{try{i.dialog.confirm("Do you want to delete this item? Note: This only deletes from your device.",(async function(){await r.delete(c.item);i.toast.show({text:"Item deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});i.views.main.router.navigate(`/admin/channel/show/${c.channel._id}`)}))}catch(e){o.showExceptionPopup(e)}},p=async e=>{let t=await r.clone(c.item);i.views.main.router.navigate(`/admin/channel/${c.channel._id}/item/edit/${t._id}`)};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-show-item">

    <${ki} breadcrumbs=${l} />

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

          <${Di} channel=${c.channel._id} item=${c} />
  
  
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

`}}Jn.id="6c9ca056a3",Jn.style="\n\n\n\n\n  /* .item-card-show a {\n    color: var(--f7-text-color);\n  } */\n\n\n  .menu-dropdown-link.menu-close {\n    color: #ffffff;\n  }\n\n\n  .attribute-row {\n    font-size: 16px;\n    vertical-align: top;\n  }\n\n  .attribute-row strong {\n    width: 175px;\n    display: inline-block;\n    vertical-align: top;\n  }\n\n\n  .attribute-row .material-icons {\n    line-height: 16px;\n    display: inline-block;\n    vertical-align: middle;\n  }\n\n  .item-show-footer {\n    font-size: 14px;\n  }\n\n  .card-header {\n    line-height: 21px;\n  }\n\n  .card-header label {\n    padding-bottom: 3px;\n    margin-left: 5px;\n    float: left;\n  }\n\n  .card-header .material-icons {\n    float: left;\n  }\n\n  .item-show-token-id {\n    color: rgb(79, 79, 79);\n  }\n\n  .cover-image-preview {\n    max-width: 100%;\n  }\n\n  .animation-preview {\n    margin-left: 5px;\n    height: 500px; \n    width: 500px;\n    max-width: 100%;\n    border: 1px solid #cccccc;\n  }\n\n\n  .nft-header-row {\n    display: flex;  \n  }\n\n  .nft-header-row .left {\n    flex: 0 0 500px;\n  }\n\n  .nft-header-row .right {\n    flex: 1;\n  }\n\n  .nft-header-row .right h1 {\n    font-size: 25px;\n  }\n\n  .nft-header-row .right h4 {\n    margin-bottom: 0px;\n  }\n\n\n\n\n\n@media only screen and (max-width: 1024px) {\n\n  .nft-header-row {\n    display: block;  \n  }\n  \n  .nft-header-row .left {\n    width: 100%;\n  }\n  \n  .nft-header-row .right {\n    width: 100%;\n  }\n  \n}\n\n\n.theme-name {\n  display: block;\n}\n\n.main-header {\n\n}\n\n\n";const Kn=Jn;function Yn(e,{$:t,$on:a,$f7:i,$update:s}){let o,r,c=n.getInstance(Kt),l=n.getInstance(ut),d=n.getInstance(f),p=(n.getInstance(wa),n.getInstance(ti)),u=n.getInstance(Da),h=(n.getInstance(Gn),n.getInstance(Gt)),m=n.getInstance(Vt),g=(n.getInstance(Lt),n.getWalletService(),e.itemViewModel),v=e.themes,b=!1,y=`/admin/channel/show/${g.item.channelId}/${g.item.tokenId}`,w=!1;Oi.Z.configure({languages:["css"]});let S=[{text:"Home",path:"/"},{text:g.channel.title,path:`/admin/channel/show/${g.channel._id}`},{text:g.item.title?g.item.title:`#${g.item.tokenId}`,path:`/admin/channel/show/${g.channel._id}/${g.item.tokenId}`},{text:"Edit Item"}];const $=async e=>{e.preventDefault();let t=i.form.convertToData("#edit-item-form"),a=Object.assign(new Y,t);a.coverImageAsAnimation="on"!=t.coverImageAsAnimation[0],a.tokenId=parseInt(t.tokenId),a.content=c.activeEditor.getContents(),a.coverImageCSS="\n"!=o.getText()?o.getText():void 0,a.animationCSS="\n"!=r.getText()?r.getText():void 0,a.attributeSelections?a.attributeSelections=JSON.parse(a.attributeSelections).map((e=>({id:e.id,traitType:e.traitType,value:e.value}))):a.attributeSelections=[],a.contentHTML=await l.translateContent(a.content,!0);let n=await p.saveGeneratedCoverImage(a);a.coverImageGenerated=n.generated,a.coverImageAsAnimation||await p.saveAnimation(a);try{d.showSpinner(),await p.put({channel:g.channel,item:a,updateQueryCache:!0,publish:!1});i.toast.show({text:"Item saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});i.views.main.router.navigate(`/admin/channel/show/${a.channelId}/${a.tokenId}`)}catch(e){console.log(e),i.dialog.alert(e.errors,"There was an error")}};return a("pageInit",(async(e,a)=>{c.buildQuillPostEditor("#edit-item-editor","#edit-item-toolbar"),c.activeEditor.setContents(g.item.content),c.activeEditor.on("selection-change",(e=>{document.dispatchEvent(new CustomEvent("load-cover-images"))})),c.activeEditor.on("text-change",((e,t,a)=>{if(document.dispatchEvent(new CustomEvent("load-cover-images")),"user"!==a)return;let i=c.activeEditor.getContents();const n=function(e){return e.ops.filter((e=>e.insert&&e.insert.ipfsimage)).map((e=>e.insert.ipfsimage))}(c.activeEditor.getContents().diff(t)),o=[];for(let e of n){let a=t.ops.filter((t=>t.insert&&t.insert.ipfsimage&&t.insert.ipfsimage.cid==e.cid)),n=i.ops.filter((t=>t.insert&&t.insert.ipfsimage&&t.insert.ipfsimage.cid==e.cid));a.length>0&&0==n.length&&o.push(e)}o.forEach((e=>{g.images=g.images.filter((t=>t.cid!=e.cid)),e.cid==g.coverImage?.cid&&(g.coverImage=void 0)})),s()})),t(".image-button").off("click"),t(".image-button-input").off("click"),t(".ai-button").off("click"),t(".image-button").on("click",(function(e){e.preventDefault();t(".image-button-input").click()})),t(".image-button-input").on("change",(async function(e){e.preventDefault(),await c.imageSelected(this)})),t(".ai-button").on("click",(async function(e){e.preventDefault();const t=new CustomEvent("set-ai-prompt");document.dispatchEvent(t),i.popup.open(".ai-popup")})),o=new(gt())("#cover-image-edit-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>Oi.Z.highlightAuto(e).value},toolbar:!1}}),o.on("text-change",((e,t,a)=>{document.dispatchEvent(new CustomEvent("update-cover-image-css",{detail:{coverImageCSS:"\n"!=o.getText()?o.getText():void 0}}))})),r=new(gt())("#animation-edit-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>Oi.Z.highlightAuto(e).value},toolbar:!1}}),g.item.coverImageCSS&&o.setText(g.item.coverImageCSS),g.item.animationCSS&&r.setText(g.item.animationCSS),await s(),d.showSpinner(),await u.init(),b=null!=u.ipfs;const n=new CustomEvent("ipfs-ready");document.dispatchEvent(n);const l=await h.get();if(w=null!=l?.huggingFace,l?.huggingFace?.length>0){await m.init();const e=new CustomEvent("hugging-face-ready");document.dispatchEvent(e)}d.hideSpinner(),await s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-edit-post">

    <${ki} breadcrumbs=${S} />

    <div class="page-content hide-toolbar-on-scroll">

      <form class="list media-list" id="edit-item-form" @submit="${$}">

        <${Wn} item=${g} 
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

`}}Yn.id="d2bf948616",Yn.style="\n  #edit-item-editor {\n    min-height: 175px;\n    height: 100%;\n    /* added these styles */\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n  }\n";const Qn=Yn;var Xn=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},es=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ts=class{itemWebService;themeService;schemaService;constructor(e,t,a){this.itemWebService=e,this.themeService=t,this.schemaService=a}async create(){return new wi((async e=>{await this.schemaService.loadChannel(e.params.channelId);let t=await this.itemWebService.getNewViewModel(e.params.channelId);return{itemViewModel:t,themes:await this.themeService.listByChannel(t.channel._id,1e3,0)}}),Zn)}async show(){return new wi((async e=>(await this.schemaService.loadChannel(e.params.channelId),{itemViewModel:await this.itemWebService.getNavigation(e.params.channelId,parseInt(e.params.tokenId))})),Kn)}async edit(){return new wi((async e=>{await this.schemaService.loadChannel(e.params.channelId);let t=await this.itemWebService.get(e.params.id);return{itemViewModel:t,themes:await this.themeService.listByChannel(t.channel._id,1e3,0)}}),Qn)}};function as(e,{$:t,$on:a,$f7:i,$update:n}){let s=e.authorViewModel,o=[{text:"Home",path:"/"},{text:"Author Profile"}];return function(t){t.$;var a=t.$h;t.$root,t.$f7,t.$f7route,t.$f7router,t.$theme,t.$update,t.$store;return a`
    <div class="page" data-name="profile-show">

        <${ki} breadcrumbs=${o} active="profile" />

        <div class="page-content hide-toolbar-on-scroll">

            ${s.author._id?a`

                <div class="block row">
                    <div class="col-20">

                        ${s.authorPhoto?a`
                            <img src="${s.authorPhoto.url}" class="profile-pic-main" alt="Author photo" />
                        `:a`
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

                `:a`
                    <div class="block">
                        Create your Large <a href="/admin/${e.channelId}/author/edit/${s.author.walletAddress}">author profile</a>. 
                    </div>
                `}


        </div>

    </div>
`}}Xn([Si("/admin/item/create/:channelId"),es("design:type",Function),es("design:paramtypes",[]),es("design:returntype",Promise)],ts.prototype,"create",null),Xn([Si("/admin/channel/show/:channelId/:tokenId"),es("design:type",Function),es("design:paramtypes",[]),es("design:returntype",Promise)],ts.prototype,"show",null),Xn([Si("/admin/channel/:channelId/item/edit/:id"),es("design:type",Function),es("design:paramtypes",[]),es("design:returntype",Promise)],ts.prototype,"edit",null),ts=Xn([(0,s.b)(),es("design:paramtypes",[ti,Et,We])],ts),as.id="58b68038e6",as.style="\n    \n  .profile-pic-edit, #profile-pic--edit-not-found {\n    max-width: 300px;\n    border-radius: 50%;\n    font-size: 100px;\n    float: left;\n  }\n  \n  \n  .profile-pic-main, #profile-pic-not-found {\n    max-width: 100%;\n    border-radius: 50%;\n    font-size: 100px;\n    float: left;\n  }\n  \n  .profile-name {\n    color: var(--f7-block-title-medium-text-color);\n    font-weight: bold;\n  }\n  \n  .profile-address {\n    color: var(--f7-list-item-text-text-color);\n    font-size: 13px;\n  }\n  \n  \n  .profile-pic-wrapper {\n    width: 115px;\n    float: left;\n    padding-right: 20px;\n  }\n\n";const is=as;function ns(e,{$:t,$on:a,$f7:i,$update:s}){let o=n.getInstance(aa),r=n.getInstance(Lt),c=n.getInstance(da),l=n.getWalletService(),f=e.authorViewModel,d=[{text:"Home",path:"/"},{text:l.truncateEthAddress(f.author.walletAddress),path:`/admin/author/show/${f.author.walletAddress}`},{text:"Edit Profile"}];const p=async t=>{t.preventDefault();let a=Object.assign(new R,i.form.convertToData("#edit-author-form"));try{await c.put(a);i.toast.show({text:"Profile Saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});i.views.main.router.navigate(`/admin/${e.channelId}/author/show/${a._id}`)}catch(e){console.log(e),i.dialog.alert(e.errors,"There was an error")}},u=async e=>{t("#author-photo-browse").click()},h=async e=>{let t=await o.uploadFile(document.getElementById("author-photo-browse")),a=await r.newFromBuffer(t);try{await r.put(a)}catch(e){}f.authorPhoto={cid:a.cid,url:await r.getUrl(a)},s()};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`
    <div class="page" data-name="profile-edit">

        <${ki} breadcrumbs=${d} active="profile" />


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
`}}ns.id="87d914756a",ns.style="\n    .author-photo-preview {\n        max-width: 100%;\n        max-height: 200px;\n        border: 1px solid #cccccc;\n        padding: 5px;\n        margin-bottom: 10px;\n    }\n";const ss=ns;var os=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},rs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let cs=class{authorWebService;schemaService;constructor(e,t){this.authorWebService=e,this.schemaService=t}async show(){return new wi((async e=>{let t;await this.schemaService.loadChannel(e.params.channelId);try{t=await this.authorWebService.get(e.params.id)}catch(e){console.log(e)}return t||(t=Object.assign(new R,{author:{walletAddress:e.params.id}})),{authorViewModel:t}}),is)}async edit(){return new wi((async e=>{let t;await this.schemaService.loadChannel(e.params.channelId);try{t=await this.authorWebService.get(e.params.id)}catch(e){}return t||(t=Object.assign(new R,{author:{walletAddress:e.params.id}})),{authorViewModel:t}}),ss)}};function ls(e,{$:t,$on:a,$f7:i,$update:s}){let o,r=n.getInstance(Gt),c=n.getInstance(Da),l=[{text:"Home",path:"/"},{text:"Settings"}];const f=async e=>{e.preventDefault();let t=i.form.convertToData("#edit-settings-form"),a={_id:t._id,_rev:t._rev,ipfsHost:t.ipfsHost,defaultGitProvider:t.gitProvider,gitCorsProxy:t.gitCorsProxy,gitProviders:{gitlab:{name:"gitlab",username:t.gitLabUsername,personalAccessToken:t.gitLabPersonalAccessToken},github:{name:"github",username:t.gitHubUsername,personalAccessToken:t.gitHubPersonalAccessToken}},alchemyKey:t.alchemyKey,huggingFace:t.huggingFace,welcomeHide:"true"==t.welcomeHide};try{let e=Object.assign(new L,a);await r.put(e),o?.ipfsHost!=e?.ipfsHost&&await c.clearInit();i.toast.show({text:"Settings Saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});i.views.main.router.navigate("/")}catch(e){console.log(e.errors),i.dialog.alert(e,"Saving settings failed")}},d=async e=>{o.gitProvider=t(e.currentTarget).val(),await s()};return a("pageInit",(async e=>{o=await r.get(),s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="admin-settings">

        <${ki} breadcrumbs=${l} />

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

`}}os([Si("/admin/:channelId/author/show/:id"),rs("design:type",Function),rs("design:paramtypes",[]),rs("design:returntype",Promise)],cs.prototype,"show",null),os([Si("/admin/:channelId/author/edit/:id"),rs("design:type",Function),rs("design:paramtypes",[]),rs("design:returntype",Promise)],cs.prototype,"edit",null),cs=os([(0,s.b)(),rs("design:paramtypes",[ci,We])],cs),ls.id="8b9c8099ad",ls.style="\n\n\n";const fs=ls;var ds=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},ps=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let us=class{settingsService;constructor(e){this.settingsService=e}async show(){return new wi((async e=>{}),fs)}};function hs(e,{$:t,$on:a,$f7:i,$update:s}){let o=n.getInstance(f),r=n.getInstance(Da),c=e.peers,l=e.peerCount,d=e.addresses,p=[{text:"Home",path:"/"},{text:"IPFS"}];const u=async e=>{console.log("Add peer submit"),document.getElementById("peerAddressInput").setCustomValidity("");let t=document.getElementById("peerAddressInput").value;if(t)try{await r.ipfs.swarm.connect(t),o.showPopup(`Successfully connected to peer ${t}`),console.log("Connected to peer")}catch(e){o.showExceptionPopup(e)}};return t(document).on("update-peers",(async e=>{c=e.detail.peers,l=e.detail.count,d=e.detail.addresses,s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="connect">

        <${ki} breadcrumbs=${p}  />


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

`}}ds([Si("/admin/settings"),ps("design:type",Function),ps("design:paramtypes",[]),ps("design:returntype",Promise)],us.prototype,"show",null),us=ds([(0,s.b)(),ps("design:paramtypes",[Gt])],us),hs.id="9a68930cab";const ms=hs;var gs=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},vs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let bs=class{ipfsService;constructor(e){this.ipfsService=e}async show(){return new wi((async e=>{if(!this.ipfsService.ipfs)return{};let t=await this.ipfsService.ipfs.swarm.peers(),a=await this.ipfsService.ipfs.id();return{peers:t.map((e=>e.addr.toString())),peerCount:t.length,addresses:a?.addresses?.map((e=>e.toString()))}}),ms)}};function ys(e,{$:t,$h:a,$on:i,$f7:s,$update:o}){let r,c=e.channelViewModel,l=[{text:"Home",path:"/"},{text:c.channel.title,path:`/admin/channel/show/${c.channel._id}`},{text:"Publish"}];return i("pageInit",(async(e,t)=>{r=n.getWalletService(),await o()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">
  
      <${ki} breadcrumbs=${l}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        <div class="fixed-width-content center">

          ${c.itemCount>0?t`
          
            <div class="block-title block-title-medium">IPFS</div>
  
            <div class="block list media-list">
              <ul>
                <li>
                  <a href="/admin/publish/ipfs/${c.channel._id}" class="item-link">
                    <div class="item-content">
                      <div class="item-media">
                        <span class="material-icons">import_export</span>
                      </div>
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-title">Create IPFS bundle</div>
                        </div>
                        <div class="item-text">
                          Generate an IPFS archive (.car) for download. This archive can be imported into an IPFS node and represents all of the content in the collection. 
                          Later it can be uploaded to your git provider for display in Large Reader.
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
  
              </ul>
            </div>

            
            <div class="block-title block-title-medium">Git Repo</div>
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
                          <div class="item-title">Create/Connect Git Repo</div>
                        </div>
                        <div class="item-subtitle">Create or connect to a remote git repository.</div>
  
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

                <li>
                  <a href="/admin/publish/export/${c.channel._id}" class="item-link">
                    <div class="item-content">
                      <div class="item-media">
                        <span class="material-icons">import_export</span>
                      </div>
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-title">Push to Git Repo</div>
                        </div>
                        <div class="item-text">
                          Export collection data to the configured git repo. The git provider will deploy an updated Large Reader.
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
                            Deploy contract to connected network. This will deploy a new contract or update the existing one to point to the latest IPFS bundle. 
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
  
  `}}gs([Si("/admin/connect"),vs("design:type",Function),vs("design:paramtypes",[]),vs("design:returntype",Promise)],bs.prototype,"show",null),bs=gs([(0,s.b)(),vs("design:paramtypes",[Da])],bs),ys.id="277a832588";const ws=ys;var Ss=a(27484),$s=a.n(Ss);function ks(e,{$:t,$h:a,$on:i,$f7:s,$update:o}){n.getInstance(_a),n.getInstance(Da),n.getInstance(nt),n.getInstance(mi);let r,c=n.getInstance(Gn),l=e.channelViewModel,f=(e.settings,!1),d="",p=!1,u="pending"==l?.channel.publishReaderIPFSStatus?.status,h=l.itemCount>0,m=l?.gitProvider?.personalAccessToken?.length>0,g=l?.channel?.httpUrlToRepo?.length>0,v=h&&m&&g,b=[{text:"Home",path:"/"},{text:l.channel.title,path:`/admin/channel/show/${l.channel._id}`},{text:"Publish",path:`/admin/publish/${l.channel._id}`},{text:"Push to Git Repo"}];i("pageInit",(async()=>{p=!1,await o()})),i("pageAfterOut",((e,t)=>{console.log("Unloading page"),p=!0}));const y=async e=>{e.preventDefault();s.form.convertToData("#export-form");f=!0,await o();let t=document.getElementsByClassName("publish-label")[0];s.preloader.showIn(t);try{await c.deployReader(l.channel);s.dialog.alert("Files exported to git provider.","Success")}catch(e){console.log(e),s.dialog.alert(e.message,"There was an error")}s.preloader.hideIn(t),f=!1,u=!0,await o()};return t(document).on("publish-progress",(async e=>{e.detail.message&&(d=`<p>${e.detail.message}</p>`),r=e.detail.publishStatus,o();let a=document.getElementById("ipfs-publish-process");a&&t(a).scrollTop(a.scrollHeight)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">

        <${ki} breadcrumbs=${b}  />

        <div class="page-content hide-toolbar-on-scroll">

            <div class="fixed-width-content center">
                ${v?t`

                    <form @submit="${y}" id="export-form">
    
    
                        <div class="card card-header-divider">
                            <div class="card-header">Push to Git Repo</div>
                            <div class="card-content card-content-padding">
    
                                <p>
                                    Export collection data to the configured git repo. The git provider will deploy an updated Large Reader.
                                </p>

                                <p>
                                    <strong>Provider:</strong>  ${l?.gitProvider.name} <br />
                                    <strong>Repository:</strong>   <a href="${l.channel.httpUrlToRepo}" class="link external" target="_blank">${l.channel.httpUrlToRepo}</a><br />
                                    <strong>Branch:</strong>   ${l.channel.publishReaderRepoBranch}
                                </p>

                                <p>
                                    ${l.channel.publishReaderIPFSStatus?.cid?t`
                                        <button type="submit" class="button button-fill button-small deploy-button">Push to Git Repo</button>
                                    `:t`
                                        No files available for export. Generate IPFS bundle first.
                                    `}
                                </p>
                            </div>
                        </div>
                        
  
    
                    </form>
    
                `:t`
    
                    ${h?t` `:t`
                
                        <div class="card">
                        <div class="card-content card-content-padding">
                            <p>Add NFTs to the collection before publishing.</p>
                        </div>
                        </div>
        
                    `}
        
                    ${m?t` 
                    
                        ${g?t` `:t`
                            
                            <div class="card">
                            <div class="card-content card-content-padding">
                                <p>Create/connect a <a href="/admin/publish/fork-reader/${l.channel._id}">git repo</a> to begin export.</p>
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

`}}ks.id="69f0ea78d0",ks.style="\n    .deploy-button {\n        margin-top: 10px;\n        width: 200px;\n    }\n\n    .publish-label,\n    .ipfs-label,\n    .forking-label {\n        margin-top: 10px;\n        margin-bottom: 10px;\n        font-weight: bold;\n        font-size: 18px;\n    }\n\n    .publish-output {\n        border: 1px solid #cccccc;\n        font-size: 13px;\n        width: 100%;\n        max-width: 100%;\n        padding: 5px;\n        height: 100px;\n        overflow-y: scroll;\n    }\n\n    .publish-status {\n        font-size: 14px;\n        padding: 10px;\n        border: 1px solid #f1f1f1;\n    }\n\n    .publish-status .item label {\n        font-weight: bold;\n        display: inline-block;\n        width: 180px;\n    }\n\n    /* #export-refresh-button {\n        width: 45px;\n        height: 30px;\n        display: inline-block;\n        margin-left: 5px;\n        padding-top: 2.5px;\n    } */\n\n    #export-next-button {\n        width: 200px;\n        float: right;\n    }\n\n";const Is=ks;var Rs=a(26015),xs=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},_s=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ps=class{channelService;itemService;ipfsService;imageService;animationService;exportService;carService;constructor(e,t,a,i,n,s,o){this.channelService=e,this.itemService=t,this.ipfsService=a,this.imageService=i,this.animationService=n,this.exportService=s,this.carService=o}async exportToIPFS(e,t,a){let i=this.getIPFSDirectory(e.channel);try{await this.ipfsService.heliaStat(i);await this.ipfsService.heliaRm(i)}catch(e){}await this.ipfsService.heliaMkDir(`${i}`,{force:!0});let n={contractMetadata:{saved:0,total:1},nftMetadata:{saved:0,total:e.items.length},images:{saved:0,total:e.imageCids.length},animations:{saved:0,total:e.animationCids.length},backups:{channels:{saved:0,total:1},authors:{saved:0,total:1},items:{saved:0,total:t.itemCount},images:{saved:0,total:e.imageCids.length},animations:{saved:0,total:e.animationCids.length},themes:{saved:0,total:t.themeCount},staticPages:{saved:0,total:t.staticPageCount}}};await this._publishImages(n,i,e.imageCids),await this._publishAnimations(n,i,e.animationCids),await this._publishNFTMetadata(n,i,e.channel,e.items);let s=`${i}/contractMetadata.json`,o=await this.channelService.exportContractMetadata(e.channel,a),r=await this.ipfsService.heliaAdd((new TextEncoder).encode(JSON.stringify(o)),s);n.contractMetadata.saved=1,this.logPublishProgress(n,`Saving contract metadata to ${s} (${r.toString()})`),await this.ipfsService.heliaMkDir(`${i}/backup`),await this.ipfsService.heliaAdd((new TextEncoder).encode(JSON.stringify(t.channels)),`${i}/backup/channels.json`),n.backups.channels.saved=1,this.logPublishProgress(n),await this.ipfsService.heliaAdd((new TextEncoder).encode(JSON.stringify(t.authors)),`${i}/backup/authors.json`),n.backups.authors.saved=1,this.logPublishProgress(n),await this.ipfsService.heliaAdd((new TextEncoder).encode(JSON.stringify(t.items)),`${i}/backup/items.json`),n.backups.items.saved=t.itemCount,this.logPublishProgress(n),await this.ipfsService.heliaAdd((new TextEncoder).encode(JSON.stringify(t.originalMetadata)),`${i}/backup/originalMetadata.json`),await this.ipfsService.heliaAdd((new TextEncoder).encode(JSON.stringify(t.images)),`${i}/backup/images.json`),n.backups.images.saved=t.imageCount,this.logPublishProgress(n),await this.ipfsService.heliaAdd((new TextEncoder).encode(JSON.stringify(t.animations)),`${i}/backup/animations.json`),n.backups.animations.saved=t.animationCount,this.logPublishProgress(n),await this.ipfsService.heliaAdd((new TextEncoder).encode(JSON.stringify(t.themes)),`${i}/backup/themes.json`),n.backups.themes.saved=t.themeCount,this.logPublishProgress(n),await this.ipfsService.heliaAdd((new TextEncoder).encode(JSON.stringify(t.staticPages)),`${i}/backup/static-pages.json`),n.backups.staticPages.saved=t.staticPageCount,this.logPublishProgress(n);let c=await this.ipfsService.heliaStat(i);return this.logPublishProgress(n,`Published to local IPFS at ${c.cid.toString()}`),c.cid}async exportContractToIPFS(e,t,a,i){let n=`/contract/${this.getIPFSDirectory(e)}`;try{await this.ipfsService.heliaStat(n);await this.ipfsService.heliaRm(n)}catch(e){}await this.ipfsService.heliaMkDir(`${n}`,{force:!0}),await this.ipfsService.heliaAdd(t,`${n}/contract.json`),await this.ipfsService.heliaAdd(a,`${n}/contract-abi.json`),await this.ipfsService.heliaAdd(i,`${n}/large-config.json`);let s=await this.ipfsService.heliaStat(n),o={contractMetadata:void 0,nftMetadata:void 0,images:void 0,animations:void 0,backups:{channels:void 0,authors:void 0,items:void 0,images:void 0,animations:void 0,themes:void 0,staticPages:void 0}};return this.logPublishProgress(o,`Published to local IPFS at ${s.cid.toString()}`),s.cid}getIPFSDirectory(e){return`/export/${e._id}`}async _publishAnimations(e,t,a){this.logPublishProgress(e,`Exporting ${a.length} animations`),await this.ipfsService.heliaMkDir(`${t}/animations`);for(let i of a){let a=await this.animationService.get(i),n=`${t}/animations/${a.cid}.html`;const s=await this.ipfsService.heliaAdd((new TextEncoder).encode(a.content),n);if(s.toString()!==a.cid.toString())throw new Error(`Incorrect cid when saving animation. Expected: ${a.cid}, Result: ${s.toString()}`);this.logPublishProgress(e,`Saving animation #${e.animations.saved} to /animations/${a.cid}.html (${a.cid})`),e.animations.saved++}}async _publishImages(e,t,a){await this.ipfsService.heliaMkDir(`${t}/images`);for(let i of a){let a=await this.imageService.get(i),n=`${t}/images/${a.cid}.${a.buffer?"jpg":"svg"}`;const s=await this.ipfsService.heliaAdd(await this.imageService.getImageContent(a),n);if(s.toString()!=a.cid)throw new Error(`Incorrect cid when saving image. Expected: ${a.cid}, Result: ${s.toString()}`);this.logPublishProgress(e,`Saving image to ${n} (${s.toString()})`),e.images.saved++}}async _publishNFTMetadata(e,t,a,i){this.logPublishProgress(e,`Exporting ${i.length} metadata files`),await this.ipfsService.heliaMkDir(`${t}/metadata`);let n={};for(let s of i){let i=this.exportService.prepareItem(s),o=`${t}/metadata/${i.tokenId}.json`,r=await this.imageService.get(i.coverImageId),c=await this.itemService.exportNFTMetadata(a,i,r),l=(new TextEncoder).encode(JSON.stringify(c));n[await Rt.of(l)]=c;await this.ipfsService.heliaAdd(l,o);e.nftMetadata.saved++,this.logPublishProgress(e,`Saving #${i.tokenId} to ${o}`)}}async createCarFromCID(e,t){const{writer:a,out:i}=await this.ipfsService.createCAR(t),n=this.ipfsService.carWriterOutToBlob(i);let s;await this.ipfsService.exportCAR(t,a);try{s=await this.carService.get(e)}catch(e){}return s||(s=new Ne,s._id=e),s.cid=t.toString(),s.content=new Uint8Array(await(await n).arrayBuffer()),await this.carService.put(s),s}logPublishProgress(e,t){if(t&&console.log(t),"undefined"!=typeof window&&void 0!==window.document){const a=new CustomEvent("publish-progress",{detail:{publishStatus:e,message:t}});document.dispatchEvent(a)}}};Ps=xs([(0,s.b)(),_s("design:paramtypes",[_a,wa,Da,Lt,qa,Ja,Nn])],Ps);var Cs=a(48764).Buffer,Ts=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},As=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Os=function(e,t){return function(a,i){t(a,i,e)}};let js=class{channelService;exportService;settingsService;publishIPFSService;walletService;constructor(e,t,a,i,n){this.channelService=e,this.exportService=t,this.settingsService=a,this.publishIPFSService=i,this.walletService=n}async publish(e,t){delete e.publishReaderIPFSStatus,await this.channelService.put(e),this.logPublishProgress(void 0,"Preparing export...");let a=await this.exportService.prepareExport(e,this.walletService.address),i=await this.getFeeReceipient(a.channel,a.ownerAddress);i&&this.logPublishProgress(void 0,`Fee Recipient: ${i}`),this.logPublishProgress(void 0,"Preparing backup...");let n=await this.exportService.createBackup(a);this.logPublishProgress(void 0,"Exporting to IPFS...");let s=await this.publishIPFSService.exportToIPFS(a,n,i);return{cid:s,car:await this.publishIPFSService.createCarFromCID("export",s)}}async publishContract(e){let t,a,i;e.contractAddress?(t=Cs.from(JSON.stringify({contractAddress:e.contractAddress,ipfsCid:e.publishReaderIPFSStatus?.cid})),a=Cs.from(JSON.stringify(Rs))):(t=Cs.from(JSON.stringify({})),a=Cs.from(JSON.stringify({})));let n=await this.getProductionURIInfo(e);i=Cs.from(JSON.stringify({showMintPage:e.showMintPage,showActivityPage:e.showActivityPage,hostname:e.productionHostname?e.productionHostname:n?.hostname,libraryURL:e.productionBaseLibraryURI,baseURL:e.productionBaseURI?e.productionBaseURI:n?.baseURI,externalLinks:e.externalLinks,marketplaces:e.marketplaces}));let s=await this.publishIPFSService.exportContractToIPFS(e,t,a,i);return this.publishIPFSService.createCarFromCID("contract",s)}async getFeeReceipient(e,t){let a;return"existing"==e.forkType?e.forkedFromFeeRecipient&&(a=e.forkedFromFeeRecipient):a=t,a}async getProductionURIInfo(e){let t,a=await this.settingsService.get();switch(t=e.gitProvider&&"default"!=e.gitProvider?e.gitProvider:a.defaultGitProvider?a.defaultGitProvider:"github",t){case"gitlab":if(!e.httpUrlToRepo)return;return{hostname:`https://${i=e.httpUrlToRepo,i.replace("https://gitlab.com/","").split("/")[0]}.gitlab.io`,baseURI:`/${e.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}/`};case"github":function n(e){return e.replace("https://github.com/","").split("/")[0]}if(!e.httpUrlToRepo)return;return{hostname:`https://${n(e.httpUrlToRepo)}.github.io`,baseURI:`/${e.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}/`}}var i}logPublishProgress(e,t){if(t&&console.log(t),"undefined"!=typeof window&&void 0!==window.document){const a=new CustomEvent("publish-progress",{detail:{publishStatus:e,message:t}});document.dispatchEvent(a)}}};function Fs(e,{$:t,$h:a,$on:i,$f7:s,$update:o}){let r,c,l=n.getInstance(_a),f=n.getInstance(Da),d=n.getInstance(js),p=(n.getInstance(nt),n.getInstance(Nn)),u=e.channelViewModel,h=(e.settings,!1),m="",g=!1,v="pending"==u?.channel.publishReaderIPFSStatus?.status,b=u.itemCount>0,y=b&&u?.gitProvider?.personalAccessToken?.length>0&&u?.channel?.httpUrlToRepo?.length>0,w=[{text:"Home",path:"/"},{text:u.channel.title,path:`/admin/channel/show/${u.channel._id}`},{text:"Publish",path:`/admin/publish/${u.channel._id}`},{text:"IPFS"}];i("pageInit",(async()=>{g=!1,await f.initLocal(),await o()})),i("pageAfterOut",(async(e,t)=>{console.log("Unloading page"),g=!0}));const S=async e=>{e.preventDefault();s.form.convertToData("#create-car-form");h=!0,await o();let t=document.getElementsByClassName("publish-label")[0];s.preloader.showIn(t);try{let e=await d.publish(u.channel);await o(),u.channel.publishReaderIPFSStatus={status:"complete",cid:e.cid.toString(),date:(new Date).toJSON()},await l.put(u.channel),await o()}catch(e){console.log(e),s.dialog.alert(e.message,"There was an error")}s.preloader.hideIn(t),h=!1,v=!0,await o()};t(document).on("publish-progress",(async e=>{e.detail.message&&(m=`<p>${e.detail.message}</p>`),r=e.detail.publishStatus,o();let a=document.getElementById("ipfs-publish-process");a&&t(a).scrollTop(a.scrollHeight)}));const $=async e=>{e.preventDefault();const a=await p.get("export");c=URL.createObjectURL(new Blob([a.content],{type:"application/car"})),t("#hidden-download").attr("href",c),t("#hidden-download").attr("download","export.car"),t("#hidden-download").click()};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">

        <${ki} breadcrumbs=${w}  />

        <div class="page-content hide-toolbar-on-scroll">

            <div class="fixed-width-content center">
                ${y?t`

                    <form @submit="${S}" id="create-car-form">
    
    
                        <div class="card card-header-divider">
                            <div class="card-header">IPFS</div>
                            <div class="card-content card-content-padding">
    
                                <p>
                                    Generate an IPFS archive (.car) for download. This archive can be imported into an IPFS node and represents all of the content in the collection. 
                          Later it can be uploaded to your git provider for display in Large Reader.
                                </p>
    
                            </div>
                        </div>

    
                        <div class="card card-header-divider">
                            <div class="card-header">Status</div>
                            <div class="card-content card-content-padding">      

                                ${h?t`
                                    <div class="publish-label">
                                        Bundling...
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
    
                                ${m?t`
                                    <div class="publish-output" innerHTML="${m}" id="ipfs-publish-process" ></div>
                                `:t`
                                    <div class="publish-output" style="display:none;"></div>
                                `}
    
    
                                ${u.channel.publishReaderIPFSStatus?.cid?t`
    
                                    <div class="pin-status"> 

                                            <strong>IPFS CID:</strong> ${u.channel.publishReaderIPFSStatus?.cid}<br />
                                            <strong>Download Archive:</strong> <a href="#" @click="${$}" class="link">export.car</a><br />
                                            <strong>Date:</strong> ${$s()(u.channel.publishReaderIPFSStatus?.date).format("MMMM DD YYYY, h:mm:ss a")}

                                            <a href="#" class="link external" style="display:none;" id="hidden-download"></a>


                                    </div>
    
                                `:t`<span />`}
    
    
                                ${h?t`
                                    <p></p>
                                `:t`
    
                                    
                                    ${v?t`
        
                                        <button type="submit" class="button button-fill button-small color-gray text-color-white deploy-button">
                                            <i class="material-icons">refresh</i> Generate Again
                                        </button>
    
    
                                    `:t`
    
                                        ${h||f.initializing?t`<span />`:t`
                                            <button type="submit" class="button button-fill button-small deploy-button" >Generate .CAR bundle</button>
                                        `}  
    
                                    `}
                                    
                                `}
                            </div>
                        </div>
    
                    </form>
    
                `:t`
    
                    ${b?t` `:t`
                
                        <div class="card">
                        <div class="card-content card-content-padding">
                            <p>Add NFTs to the collection before publishing.</p>
                        </div>
                        </div>
        
                    `}
        

    
                `}

            </div>

            

        </div>

    </div>

`}}js=Ts([(0,s.b)(),Os(4,(0,o.f)(i.WalletService)),As("design:paramtypes",[_a,Ja,Gt,Ps,Object])],js),Fs.id="3b2f214839",Fs.style="\n    .deploy-button {\n        margin-top: 10px;\n        width: 200px;\n    }\n\n    .publish-label,\n    .ipfs-label,\n    .forking-label {\n        margin-top: 10px;\n        margin-bottom: 10px;\n        font-weight: bold;\n        font-size: 18px;\n    }\n\n    .publish-output {\n        border: 1px solid #cccccc;\n        font-size: 13px;\n        width: 100%;\n        max-width: 100%;\n        padding: 5px;\n        height: 100px;\n        overflow-y: scroll;\n    }\n\n    .publish-status {\n        font-size: 14px;\n        padding: 10px;\n        border: 1px solid #f1f1f1;\n    }\n\n    .publish-status .item label {\n        font-weight: bold;\n        display: inline-block;\n        width: 180px;\n    }\n\n    /* #export-refresh-button {\n        width: 45px;\n        height: 30px;\n        display: inline-block;\n        margin-left: 5px;\n        padding-top: 2.5px;\n    } */\n\n    #export-next-button {\n        width: 200px;\n        float: right;\n    }\n\n";const Es=Fs;function Ds(e,{$:t,$h:a,$on:i,$f7:s,$update:o}){let r=n.getInstance(_a),c=(n.getInstance(Da),n.getInstance(nt),n.getInstance(Gn)),l=e.channelViewModel,f=e.settings,d=!1,p=!1,u=l.itemCount>0,h=l?.gitProvider?.personalAccessToken?.length>0,m=u&&h,g=[{text:"Home",path:"/"},{text:l.channel.title,path:`/admin/channel/show/${l.channel._id}`},{text:"Publish",path:`/admin/publish/${l.channel._id}`},{text:"Create Git Repository"}];i("pageInit",(async()=>{d=!1,await o(),await b()})),i("pageAfterOut",((e,t)=>{console.log("Unloading page"),d=!0}));const v=async e=>{e.preventDefault(),p=!0,await o();let t,a=document.getElementsByClassName("content-card-padding")[0];s.preloader.showIn(a);try{t=await c.createFork(l.channel),l.channel.publishReaderRepoId=t.id,l.channel.publishReaderRepoPath=t.path,l.channel.publishReaderRepoBranch=t.branch,l.channel.publishReaderRepoStatus="pending",await r.put(l.channel)}catch(e){s.preloader.hideIn(a),console.log(e),"Error: Request failed with status code 409"==e.toString()?s.dialog.alert("Git repo already exists with that name.","There was an error"):s.dialog.alert(e,"There was an error")}p=!1,await o(),await b()},b=async e=>{if(d)return;if(!f)return;if("complete"==l.channel.publishReaderRepoStatus&&l.channel.publishReaderRepoId>0)return;if(p)return;let t=await r.getGitProviderCredentials(l.channel,f);if(t&&t.personalAccessToken&&!(t.personalAccessToken.length<1)){console.log("Checking repo fork status...");try{if(l.channel=await r.get(l.channel._id),"finished"==await c.getForkRepoStatus(l.channel)){let e=await c.getExistingFork(l.channel);l.channel.publishReaderRepoStatus="complete",l.channel.httpUrlToRepo=e.httpUrlToRepo,await r.put(l.channel);let t=document.getElementsByClassName("content-card-padding")[0];s.preloader.hideIn(t)}}catch(e){console.log(e)}await o(),"complete"!=l.channel.publishReaderRepoStatus&&setTimeout(b,5e3)}};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="publish">

    <${ki} breadcrumbs=${g}  />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        ${m?t`

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

`}}Ds.id="10da57c409",Ds.style="\n  .publish-label,\n  .ipfs-label,\n  .forking-label {\n    margin-top: 10px;\n    margin-bottom: 10px;\n    font-weight: bold;\n    font-size: 18px;\n  }\n\n  .publish-output {\n    border: 1px solid #cccccc;\n    font-size: 13px;\n    width: 100%;\n    max-width: 100%;\n    padding: 5px;\n    height: 300px;\n    overflow-y: scroll;\n  }\n\n  #fork-next-button {\n    width: 200px;\n  }\n";const Bs=Ds;function Ms(e,{$:t,$h:a,$on:i,$f7:s,$update:o}){let r,c=n.getInstance(_a),l=n.getInstance(Da),f=(n.getInstance(nt),n.getInstance(mi),n.getInstance(Gn)),d=(n.getInstance(js),null!=l.ipfs),p=l.peerCount,u=e.channelViewModel,h=e.settings,m=!1,g="",v=u.channel.publishReaderRepoId>0&&"complete"==u.channel.publishReaderRepoStatus,b=null!=u.channel.localCid,y=u.itemCount>0,w=u?.gitProvider?.personalAccessToken?.length>0,S=h?.gitCorsProxy?.length>0,$=y&&w&&S,k=u.channel.httpUrlToRepo,I=[{text:"Home",path:"/"},{text:u.channel.title,path:`/admin/channel/show/${u.channel._id}`},{text:"Publish",path:`/admin/publish/${u.channel._id}`},{text:"Publish Collection To Reader"}];i("pageInit",(async()=>{await l.init(),d=null!=l.ipfs,r=await c.getGitProviderCredentials(u.channel,h),await o()}));const R=async e=>{e.preventDefault(),m=!0,await o();let t=document.getElementsByClassName("ipfs-label")[0];s.preloader.showIn(t);try{let e=`/export/${u.channel._id}`,t=await(0,Yi.Z)(l.ipfs.files.read(`${e}/contractMetadata.json`));await f.deployReaderGit(u.channel,t)}catch(e){console.log(e),s.dialog.alert(e,"There was an error")}s.preloader.hideIn(t),m=!1,await o()},x=async e=>{e.preventDefault();let t=document.getElementsByClassName("ipfs-label")[0];s.preloader.showIn(t);try{await f.clearGitRepos()}catch(e){s.dialog.alert(e,"There was an error")}s.preloader.hideIn(t),await o()};return t(document).on("publish-reader-progress",(async e=>{g=`<p>${e.detail.message}</p>`,o()})),t(document).on("update-peers",(async e=>{p=e.detail.count,o()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">
  
      <${ki} breadcrumbs=${I}  />
  
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
                        <p><strong>Remote Repository:</strong> ${k}</p> <a href="#" class="link" @click="${x}">Clear local cache</a>
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

                        ${g?t`
                          <div class="publish-output" innerHTML="${g}"></div>
                        `:t`
                          <div class="publish-output" style="display:none;"></div>
                        `}


                        
                        <div class="block cancel-save-row">
      
                          <div class="large-only"></div>
            
                          <a href="/admin/publish/${u.channel._id}" class="button button-outline color-gray" tabindex="30">
                            Back to menu
                          </a>
        
                          ${m?t`

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
  
  `}}Ms.id="859e0006e4",Ms.style="\n\n    .publish-label, .ipfs-label, .forking-label {\n      margin-top: 10px;\n      margin-bottom: 10px;\n      font-weight: bold;\n      font-size: 18px;\n    }\n\n    .publish-output {\n      border: 1px solid #cccccc;\n      font-size: 13px;\n      width: 100%;\n      max-width: 100%;\n      padding: 5px;\n      height: 300px;\n      overflow-y : scroll;\n    }\n  ";const Ls=Ms;var Ns=a(41972),Us=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Hs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},qs=function(e,t){return function(a,i){t(a,i,e)}};let Gs=class{channelService;walletService;contracts;constructor(e,t,a){this.channelService=e,this.walletService=t,this.contracts=a}async deployContract(e){if(!e.publishReaderIPFSStatus?.cid)throw new Error("Not published to IPFS");let t=await this.channelService.countItemsByChannel(e._id);if(t<=0)throw new Error("No NFTs");let a=Ci.vz(e.mintPrice,"ether"),i=await this.deploy(e.title,e.symbol,e.publishReaderIPFSStatus?.cid,a.toString(),t);e.contractAddress=i.contractAddress,e.showActivityPage=!0,e.showMintPage=!0,await this.channelService.put(e)}async updateContract(e){if(!e.publishReaderIPFSStatus?.cid)throw new Error("Not published to IPFS");let t=await this.channelService.countItemsByChannel(e._id);if(t<=0)throw new Error("No NFTs");let a=Ci.vz(e.mintPrice,"ether");await this.update(e,e.publishReaderIPFSStatus?.cid,a.toString(),t);e.showActivityPage=!0,e.showMintPage=!0,await this.channelService.put(e)}async deploy(e,t,a,i,n){if(!(e&&t&&i&&n&&a))throw new Error("Missing inputs to deploy");let s=this.walletService.wallet;if(!s)throw new Error("No wallet!");const o=this.contracts.Channel,r=new Ns.l(o.abi,o.bytecode,s);return(await r.deploy(e,t,a,BigInt(i.toString()),BigInt(n.toString()))).deploymentTransaction().wait()}async update(e,t,a,i){if(!a||!i||!t)throw new Error("Missing inputs to deploy");if(!this.walletService.wallet)throw new Error("No wallet!");let n=await this.channelService.getChannelContract(e),s=await n.update(t,BigInt(a.toString()),BigInt(i.toString()));console.log(s)}};function zs(e,{$:t,$h:a,$on:i,$f7:s,$update:o}){let r,c=n.getInstance(_a),l=n.getInstance(Da),f=n.getInstance(nt),d=(n.getInstance(mi),n.getInstance(Gs)),p=(n.getInstance(Nn),n.getInstance(js)),u=e.channelViewModel,h=(e.channelContract,!1),m=null!=u.channel.publishReaderIPFSStatus?.cid||u.channel.contractAddress,g=[{text:"Home",path:"/"},{text:u.channel.title,path:`/admin/channel/show/${u.channel._id}`},{text:"Publish",path:`/admin/publish/${u.channel._id}`},{text:"Deploy Contract"}];i("pageInit",(async(e,t)=>{r=n.getWalletService(),await l.initLocal(),await o()}));const v=async e=>{h=!0,await o();let t={title:`Deploying contract ${name}. Approve transaction and wait for it to be mined.`,promise:d.deployContract(u.channel)};await f.queuePromiseView(t),h=!1,await o()},b=async e=>{h=!0,await o();let t={title:`Updating contract ${name}. Approve transaction and wait for it to be mined.`,promise:d.updateContract(u.channel)};await f.queuePromiseView(t),h=!1,await o()},y=async e=>{s.dialog.confirm("Are you sure you want to clear the contract address? This will not remove the actual contract from the network it will just allow you to redploy a new copy.","Reset Contract",(async()=>{u.channel.contractAddress=void 0,await c.put(u.channel),u.channel=await c.get(u.channel._id);s.toast.show({text:"Contract address cleared.",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});await o()}))},w=async e=>{e.preventDefault();let a=await p.publishContract(u.channel);t("#hidden-download").attr("href",URL.createObjectURL(new Blob([a.content],{type:"application/car"}))),t("#hidden-download").click()};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">
  
      <${ki} breadcrumbs=${g}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        <div class="fixed-width-content center">

          ${u.itemCount>0?t`
              
            ${r?.address?t`


              <div class="card card-header-divider">
                <div class="card-header">Verify Mint Info</div>
                <div class="card-content card-content-padding">

                  <p>
                    <strong>Total Items:</strong> ${u.itemCount} 
                  </p>

                  ${u.channel.mintPrice?t`

                    <p>
                      <strong>Mint Price:</strong> ${u.channel.mintPrice} ETH each
                    </p>
                    
                  `:t`<span />`}

                </div>
              </div>


              <div class="card card-header-divider">
                <div class="card-header">Deploy Contract</div>
                <div class="card-content card-content-padding">

                  ${m?t`
  
                    <div class="pin-status">
                      <p><strong>IPFS Hash:</strong> ${u.channel.publishReaderIPFSStatus?.cid}</p>
                      <p><strong>Date Exported:</strong> ${$s()(u.channel.publishReaderIPFSStatus?.date).format("MMMM DD YYYY, h:mm:ss a")}</p>
                    </div>
  
                    ${u.channel.contractAddress?t`

                      <p>
                        <strong>Current Contract Address:</strong> ${u.channel.contractAddress} 
                      </p> 

                      <br />

                      <div class="block cancel-save-row">
                        

                        ${u.channel?.publishReaderIPFSStatus?.cid&&u.channel?.mintPrice?t`
                          <a @click="${b}" class="button button-fill" tabindex="30">
                            Update
                          </a>
                        `:t` `}
    
                        <button @click="${y}" type="submit" class="button button-outline color-gray" tabindex="31">
                          Reset
                        </button>
          
                      </div>


                    `:t`<span/>`}


                    ${h?t`

                      <p>Deploying...</p>

                    `:t`
                    
                      ${u.channel.contractAddress?t`<span />`:t`
                        <button class="button button-fill button-small deploy-button" @click="${v}">Deploy Contract</button>
                      `}                        
                    `}
                    
                  `:t`
                    <p>Collection must be deployed to IPFS</p>
                  `}
                </div>
              </div>


              <div class="card card-header-divider">
                <div class="card-header">Reader Contract Bundle</div>
                <div class="card-content card-content-padding">      

                  <p>Download contract information to export to your deployed collection. Must be exported AFTER deploying or updating a contract. Contract information does NOT change when collection changes are published.</p>

                  ${t`
                      <div class="publish-label" style="display:none;"></div>
                  `}

                  ${t`
                      <div class="publish-output" style="display:none;"></div>
                  `}


                  ${u.channel.contractAddress?t`

                      <div class="pin-status"> 

                              <strong>Download Archive:</strong> <a href="#" @click="${w}" class="link">contract.car</a><br />

                              <a href="#" download="contract.car" class="link external" style="display:none;" id="hidden-download"></a>

                      </div>

                  `:t`<span />`}
                    
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
  
  `}}Gs=Us([(0,s.b)(),qs(1,(0,o.f)(i.WalletService)),qs(2,(0,o.f)("contracts")),Hs("design:paramtypes",[_a,Object,Object])],Gs),zs.id="3940fbf3ae",zs.style="\n\n  ";const Ws=zs;var Vs=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Zs=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Js=class{channelWebService;settingsService;schemaService;gitlabService;constructor(e,t,a,i){this.channelWebService=e,this.settingsService=t,this.schemaService=a,this.gitlabService=i}async publish(){return new wi((async e=>(await this.schemaService.loadChannel(e.params.id),{channelViewModel:await this.channelWebService.get(e.params.id)})),ws)}async export(){return new wi((async e=>{await this.schemaService.loadChannel(e.params.id);let t,a=await this.channelWebService.get(e.params.id);try{t=await this.settingsService.get()}catch(e){}return{channelViewModel:a,settings:t}}),Is)}async ipfs(){return new wi((async e=>{await this.schemaService.loadChannel(e.params.id);let t,a=await this.channelWebService.get(e.params.id);try{t=await this.settingsService.get()}catch(e){}return{channelViewModel:a,settings:t}}),Es)}async forkReader(){return new wi((async e=>{await this.schemaService.loadChannel(e.params.id);let t,a=await this.channelWebService.get(e.params.id);try{t=await this.settingsService.get()}catch(e){}return{channelViewModel:a,settings:t}}),Bs)}async publishReader(){return new wi((async e=>{await this.schemaService.loadChannel(e.params.id);let t,a=await this.channelWebService.get(e.params.id);try{t=await this.settingsService.get()}catch(e){}return{channelViewModel:a,settings:t}}),Ls)}async contract(){return new wi((async e=>{await this.schemaService.loadChannel(e.params.id);let t=await this.channelWebService.get(e.params.id);return{channelViewModel:t,channelContract:await this.channelWebService.getChannelContract(t.channel)}}),Ws)}};Vs([Si("/admin/publish/:id"),Zs("design:type",Function),Zs("design:paramtypes",[]),Zs("design:returntype",Promise)],Js.prototype,"publish",null),Vs([Si("/admin/publish/export/:id"),Zs("design:type",Function),Zs("design:paramtypes",[]),Zs("design:returntype",Promise)],Js.prototype,"export",null),Vs([Si("/admin/publish/ipfs/:id"),Zs("design:type",Function),Zs("design:paramtypes",[]),Zs("design:returntype",Promise)],Js.prototype,"ipfs",null),Vs([Si("/admin/publish/fork-reader/:id"),Zs("design:type",Function),Zs("design:paramtypes",[]),Zs("design:returntype",Promise)],Js.prototype,"forkReader",null),Vs([Si("/admin/publish/publish-reader/:id"),Zs("design:type",Function),Zs("design:paramtypes",[]),Zs("design:returntype",Promise)],Js.prototype,"publishReader",null),Vs([Si("/admin/publish/contract/:id"),Zs("design:type",Function),Zs("design:paramtypes",[]),Zs("design:returntype",Promise)],Js.prototype,"contract",null),Js=Vs([(0,s.b)(),Zs("design:paramtypes",[si,Gt,We,mi])],Js);var Ks=function(e,t,a,i){var n,s=arguments.length,o=s<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,i);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(s<3?n(o):s>3?n(t,a,o):n(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},Ys=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Qs=class{constructor(){}buildPagingViewModel(e,t,a,i){let n=new Xs;return n.offset=e||0,n.limit=t,n.count=a,n.start=n.offset+1,n.end=Math.min(n.offset+t,a),n.previousOffset=Math.max(n.offset-t,0),n.offset+t<a&&(n.nextOffset=n.offset+t),n.page=n.offset/n.limit+1,n.page>n.endPage&&(n.page=n.endPage),n.endPage=Math.ceil(n.count/n.limit),n.lastOffset=n.endPage*n.limit-n.limit,n.showNext=n.endPage>n.page,n.showPrevious=0!=n.offset,n.showFirst=n.page>2,n.showLast=n.page<n.endPage-1,n}calculateEndIndex(e,t,a){let i=t+e-1;return Math.min(a-1,i)}calculateDescendingEndIndex(e,t){let a=t-(e-1);return Math.max(0,a)}calculateDescendingOffset(e,t){let a=t-1-e;return Math.max(0,a)}};Qs=Ks([(0,s.b)(),Ys("design:paramtypes",[])],Qs);class Xs{page;pageNumbers;endPage;offset;limit;count;start;end;previousOffset;nextOffset;lastOffset;showPrevious;showNext;showFirst;showLast}var eo=a(56354);function to(e,{$:t,$on:a,$f7:i,$update:s}){n.getInstance(wa);let o=n.getInstance(_a),r=n.getWalletService(),c=e.channel_view_model;const l=async e=>{i.dialog.confirm("Are you sure you want to delete this collection? This will only remove your local copy of the files.",(async()=>{i.preloader.show(),await o.delete(c.channel),i.preloader.hide(),i.views.main.router.navigate("/");i.toast.show({text:"Collection deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))};return function(e){e.$;var t,a=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return a`

  <div class="card card-outline channel-card-show">

    <div class="card-header banner show-channel-banner-${c.channel._id}">

      <div class="float-right">
        <a class="button button-fill button-raised color-blue text-color-white border-white"
          href="/admin/publish/${c.channel._id}">Publish</a>
      </div>


      ${c?.coverImage?a`
      <img src="${c.coverImage.url}" class="avatar" alt="Channel cover image" />
      `:a`
      <i class="material-icons avatar">image</i>
      `}

    </div>

    <div class="card-content">

      <div class="card-content card-content-padding">
        
        <div class="float-right">

          <div class="segmented">

            ${a`
              <a class="button button-active" href="/admin/channel/edit/${c.channel._id}">Edit</a>
            `}

            <a class="button" @click="${l}">Delete</a>
          </div>

        </div>
                        
        <div class="title">${c?.channel?.title}</div>

        ${c?.authorDisplayName?a`
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

            ${c.channel.mintPrice?a`
              <span class="dot">·</span>
              <label>Mint Price:</label><strong>${c.channel.mintPrice} ETH</strong>
            `:a``}
  
            ${c.channel.royaltyPercent?a`
              <span class="dot">·</span>
              <label>Marketplace Creator Fee:</label><strong>${c.channel.royaltyPercent}%</strong>
            `:a``}
        </div>



        ${c.channel.descriptionHTML?a`
          <div class="description" id="channel-show-description-${c.channel._id}"
            innerHTML="${c.channel.descriptionHTML}">
          </div>
        `:a`<span />`}

            

        ${c.channel.contractAddress?a`
          <div class="contract-address">
            <strong>Contract Address:</strong> ${t=c?.channel.contractAddress,r.truncateEthAddress(t)}
          </div>
        `:a``}

        ${c.channel.localCid?a`
          <div class="contract-address">
            <strong>Last Published IPFS CID:</strong> ${c?.channel.localCid}
          </div>
        `:a``}

        ${c.channel.forkedFromCid?a`
          <div class="contract-address">
            <strong>Forked from IPFS:</strong> ${c?.channel.forkedFromCid}
          </div>
        `:a``}

        ${c.channel.forkedFromId?a`
          <div class="contract-address">
            <strong>Forked from:</strong> ${c?.channel.forkedFromId}
          </div>
        `:a``}

      </div>

    </div>

  </div>

`}}to.id="8389965116",to.style="    \n";const ao=to;var io=a(27725),no=a(68468),so=a(90831),oo=a(53210),ro=a(36879),co=a(74346),lo=a(89542),fo=a(77140),po=a(31910),uo=a(59746),ho=a(88235),mo=a(79859),go=a(36567),vo=a(82391),bo=a(19121),yo=a(90263),wo=a(74496),So=a(75740),$o=a(6697),ko=a(15751),Io=a(860),Ro=a(59771),xo=a(98614),_o=a(84110),Po=a.n(_o),Co=a(56176),To=a.n(Co);let Ao;function Oo(e){if(Ao)return Ao;return Ao=new Ba.W,Ao.bind("version").toConstantValue(e),Ao.bind("provider").toConstantValue((()=>{if("undefined"!=typeof window&&window.ethereum)return window.web3Provider=window.ethereum,new Ye.Q(window.ethereum)})),Ao.bind("contracts").toConstantValue(a(26015)),Ao.bind("name").toConstantValue("Large"),Ao.bind("framework7").toConstantValue(new io.ZP({el:"#app",id:"large-nft",name:"Large NFT",theme:"auto",init:!1,component:Ke,navbar:{hideOnPageScroll:!0},darkMode:"auto"})),Ao.bind("dayjs").toConstantValue($s()),Ao.bind("PouchDB").toConstantValue((()=>Ro.Z)),Ao.bind("pouch-prefix").toConstantValue("./pouch/"),Ao.bind("footer-text").toConstantValue(globalThis.footerText),Ao.bind("helia").toConstantValue((async()=>{const e=new Xe.Y("./blockstore"),t=new et.s("./datastore");await t.open(),await e.open();const a=await(0,Qe.F)({blockstore:e,datastore:t,libp2p:{start:!1,connectionManager:{minConnections:0},services:{},peerDiscovery:[]}});return await a.libp2p.stop(),a})),Ao.bind(Cn).toSelf().inSingletonScope(),Ao.bind(ts).toSelf().inSingletonScope(),Ao.bind(cs).toSelf().inSingletonScope(),Ao.bind(us).toSelf().inSingletonScope(),Ao.bind(bs).toSelf().inSingletonScope(),Ao.bind(Js).toSelf().inSingletonScope(),Ao.bind(f).toSelf().inSingletonScope(),Ao.bind(nt).toSelf().inSingletonScope(),Ao.bind(ut).toSelf().inSingletonScope(),Ao.bind(Kt).toSelf().inSingletonScope(),Ao.bind(Gs).toSelf().inSingletonScope(),Ao.bind(aa).toSelf().inSingletonScope(),Ao.bind(Da).toSelf().inSingletonScope(),Ao.bind(y).toSelf().inSingletonScope(),Ao.bind(We).toSelf().inSingletonScope(),Ao.bind(yi).toSelf().inSingletonScope(),Ao.bind(Qs).toSelf().inSingletonScope(),Ao.bind(cn).toSelf().inSingletonScope(),Ao.bind(Ja).toSelf().inSingletonScope(),Ao.bind(ka).toSelf().inSingletonScope(),Ao.bind(js).toSelf().inSingletonScope(),Ao.bind(Ps).toSelf().inSingletonScope(),Ao.bind(Nn).toSelf().inSingletonScope(),Ao.bind(si).toSelf().inSingletonScope(),Ao.bind(ti).toSelf().inSingletonScope(),Ao.bind(ci).toSelf().inSingletonScope(),Ao.bind(i.WalletService).to(ra).inSingletonScope(),Ao.bind(qa).toSelf().inSingletonScope(),Ao.bind(da).toSelf().inSingletonScope(),Ao.bind(_a).toSelf().inSingletonScope(),Ao.bind(Lt).toSelf().inSingletonScope(),Ao.bind(wa).toSelf().inSingletonScope(),Ao.bind(Tt).toSelf().inSingletonScope(),Ao.bind(mn).toSelf().inSingletonScope(),Ao.bind(Et).toSelf().inSingletonScope(),Ao.bind(Wa).toSelf().inSingletonScope(),Ao.bind(ha).toSelf().inSingletonScope(),Ao.bind(Gt).toSelf().inSingletonScope(),Ao.bind(Gn).toSelf().inSingletonScope(),Ao.bind(mi).toSelf().inSingletonScope(),Ao.bind(Bn).toSelf().inSingletonScope(),Ao.bind(Vt).toSelf().inSingletonScope(),Ao.bind(va).toSelf().inSingletonScope(),Ao.bind($).toSelf().inSingletonScope(),Ao.bind(E).toSelf().inSingletonScope(),Ao.bind(te).toSelf().inSingletonScope(),Ao.bind(Z).toSelf().inSingletonScope(),Ao.bind(P).toSelf().inSingletonScope(),Ao.bind(H).toSelf().inSingletonScope(),Ao.bind(ue).toSelf().inSingletonScope(),Ao.bind(re).toSelf().inSingletonScope(),Ao.bind(ye).toSelf().inSingletonScope(),Ao.bind(Re).toSelf().inSingletonScope(),Ao.bind(Ae).toSelf().inSingletonScope(),Ao.bind(Be).toSelf().inSingletonScope(),Ao.bind(qe).toSelf().inSingletonScope(),Ao.bind("ipfsRemoteInit").toConstantValue((async e=>{if(e)return(0,eo.Ue)({url:e})})),globalThis.container=Ao,Ao}$s().extend(Po()),$s().extend(To()),Ro.Z.plugin(xo.Z),io.ZP.use([no.Z,so.Z,oo.Z,ro.Z,co.Z,lo.Z,fo.Z,mo.Z,go.Z,vo.Z,bo.Z,yo.Z,wo.Z,So.Z,$o.Z,ko.Z,Io.Z,po.Z,uo.Z,ho.Z]),io.ZP.registerComponent("channel-card",ao);var jo=a(75131);a(44445);const Fo=async e=>{let t="/large";if("serviceWorker"in navigator){const a=new jo.ZW(`${t}/sw-admin-${e}.js`,{scope:`${t}/`});Eo(e),a.register()}},Eo=e=>{let t=Oo(e),a=t.get("framework7"),i=t.get(yi);a.routes.push(...i.buildRoutesForContainer(t)),a.init()}},67064:()=>{},80950:()=>{},46601:()=>{},89214:()=>{},96419:()=>{},56353:()=>{},8623:()=>{},7748:()=>{},85568:()=>{},74897:()=>{},69386:()=>{},31616:()=>{},15525:()=>{},63897:()=>{},78110:()=>{},56619:()=>{},62678:()=>{},25819:()=>{},77108:()=>{},81265:()=>{},35539:()=>{},69862:()=>{},40964:()=>{},26015:e=>{"use strict";e.exports=JSON.parse('{"Channel":{"abi":[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"ipfsCid","type":"string"},{"internalType":"uint256","name":"mintFee","type":"uint256"},{"internalType":"uint256","name":"maxTokenId","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"InvalidQueryRange","type":"error"},{"inputs":[],"name":"MintERC2309QuantityExceedsLimit","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"OwnershipNotInitializedForExtraData","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toTokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"ConsecutiveTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"MintEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_MINT_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"explicitOwnershipOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"},{"internalType":"uint24","name":"extraData","type":"uint24"}],"internalType":"struct IERC721A.TokenOwnership","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"explicitOwnershipsOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"},{"internalType":"uint24","name":"extraData","type":"uint24"}],"internalType":"struct IERC721A.TokenOwnership[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"}],"name":"mintFromStartOrFail","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"stop","type":"uint256"}],"name":"tokensOfOwnerIn","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_i","type":"uint256"}],"name":"uint2str","outputs":[{"internalType":"string","name":"_uintAsString","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"string","name":"ipfsCid","type":"string"},{"internalType":"uint256","name":"mintFee","type":"uint256"},{"internalType":"uint256","name":"maxTokenId","type":"uint256"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}],"name":"Channel","bytecode":"0x6080604052600a600d553480156200001657600080fd5b5060405162002ec638038062002ec68339810160408190526200003991620001da565b848460026200004983826200030d565b5060036200005882826200030d565b50506001600055506200006b33620000c3565b600b829055600c819055600a6200008384826200030d565b50600a604051602001620000989190620003d9565b60405160208183030381529060405260099081620000b791906200030d565b50505050505062000495565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013d57600080fd5b81516001600160401b03808211156200015a576200015a62000115565b604051601f8301601f19908116603f0116810190828211818310171562000185576200018562000115565b81604052838152602092508683858801011115620001a257600080fd5b600091505b83821015620001c65785820183015181830184015290820190620001a7565b600093810190920192909252949350505050565b600080600080600060a08688031215620001f357600080fd5b85516001600160401b03808211156200020b57600080fd5b6200021989838a016200012b565b965060208801519150808211156200023057600080fd5b6200023e89838a016200012b565b955060408801519150808211156200025557600080fd5b5062000264888289016200012b565b606088015160809098015196999598509695949350505050565b600181811c908216806200029357607f821691505b602082108103620002b457634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200030857600081815260208120601f850160051c81016020861015620002e35750805b601f850160051c820191505b818110156200030457828155600101620002ef565b5050505b505050565b81516001600160401b0381111562000329576200032962000115565b62000341816200033a84546200027e565b84620002ba565b602080601f831160018114620003795760008415620003605750858301515b600019600386901b1c1916600185901b17855562000304565b600085815260208120601f198616915b82811015620003aa5788860151825594840194600190910190840162000389565b5085821015620003c95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b66697066733a2f2f60c81b81526000600760008454620003f9816200027e565b600182811680156200041457600181146200042e5762000463565b60ff19841688870152821515830288018601945062000463565b8860005260208060002060005b85811015620004585781548b82018a01529084019082016200043b565b505050858389010194505b50507f2f636f6e74726163744d657461646174612e6a736f6e0000000000000000000083525050601601949350505050565b612a2180620004a56000396000f3fe6080604052600436106101c25760003560e01c80638da5cb5b116100f7578063c23dc68f11610095578063e985e9c511610064578063e985e9c51461050c578063f2fde38b14610562578063f76f950e14610582578063fa9b7018146105a257600080fd5b8063c23dc68f1461048a578063c87b56dd146104b7578063d8bb9bb3146104d7578063e8a3d485146104f757600080fd5b8063a0712d68116100d1578063a0712d681461040d578063a22cb46514610420578063a2309ff814610440578063b88d4fde1461047757600080fd5b80638da5cb5b146103ad57806395d89b41146103d857806399a2557a146103ed57600080fd5b806342842e0e1161016457806370a082311161013e57806370a0823114610338578063715018a6146103585780637a4d892a1461036d5780638462151c1461038057600080fd5b806342842e0e146102d85780635bbb2177146102eb5780636352211e1461031857600080fd5b8063095ea7b3116101a0578063095ea7b31461026357806318160ddd1461027857806323b872dd146102bd5780633ccfd60b146102d057600080fd5b806301ffc9a7146101c757806306fdde03146101fc578063081812fc1461021e575b600080fd5b3480156101d357600080fd5b506101e76101e2366004611fce565b6105b8565b60405190151581526020015b60405180910390f35b34801561020857600080fd5b50610211610614565b6040516101f39190612059565b34801561022a57600080fd5b5061023e61023936600461206c565b6106a6565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101f3565b6102766102713660046120ae565b610710565b005b34801561028457600080fd5b50600154600054037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff015b6040519081526020016101f3565b6102766102cb3660046120d8565b6107fb565b610276610a8b565b6102766102e63660046120d8565b610aeb565b3480156102f757600080fd5b5061030b610306366004612114565b610b0b565b6040516101f39190612189565b34801561032457600080fd5b5061023e61033336600461206c565b610bf5565b34801561034457600080fd5b506102af610353366004612213565b610c00565b34801561036457600080fd5b50610276610c82565b61027661037b36600461222e565b610c96565b34801561038c57600080fd5b506103a061039b366004612213565b610da3565b6040516101f39190612250565b3480156103b957600080fd5b5060085473ffffffffffffffffffffffffffffffffffffffff1661023e565b3480156103e457600080fd5b50610211610ece565b3480156103f957600080fd5b506103a0610408366004612288565b610edd565b61027661041b36600461206c565b6110a5565b34801561042c57600080fd5b5061027661043b3660046122bb565b6112f0565b34801561044c57600080fd5b506000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016102af565b6102766104853660046123ba565b611387565b34801561049657600080fd5b506104aa6104a536600461206c565b6113f7565b6040516101f39190612436565b3480156104c357600080fd5b506102116104d236600461206c565b61147f565b3480156104e357600080fd5b506102766104f2366004612488565b611548565b34801561050357600080fd5b506102116115f5565b34801561051857600080fd5b506101e76105273660046124ea565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561056e57600080fd5b5061027661057d366004612213565b611604565b34801561058e57600080fd5b5061021161059d36600461206c565b6116b8565b3480156105ae57600080fd5b506102af600d5481565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f4906490600000000000000000000000000000000000000000000000000000000148061060e575061060e8261180f565b92915050565b6060600280546106239061251d565b80601f016020809104026020016040519081016040528092919081815260200182805461064f9061251d565b801561069c5780601f106106715761010080835404028352916020019161069c565b820191906000526020600020905b81548152906001019060200180831161067f57829003601f168201915b5050505050905090565b60006106b1826118f0565b6106e7576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081526006602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b600061071b82610bf5565b90503373ffffffffffffffffffffffffffffffffffffffff82161461077a576107448133610527565b61077a576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526006602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff87811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b60006108068261193e565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461086d576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260066020526040902080543380821473ffffffffffffffffffffffffffffffffffffffff8816909114176108e0576108aa8633610527565b6108e0576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff851661092d576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b801561093857600082555b73ffffffffffffffffffffffffffffffffffffffff86811660009081526005602052604080822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff019055918716808252919020805460010190554260a01b177c0200000000000000000000000000000000000000000000000000000000176000858152600460205260408120919091557c020000000000000000000000000000000000000000000000000000000084169003610a2757600184016000818152600460205260408120549003610a25576000548114610a255760008181526004602052604090208490555b505b838573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45b505050505050565b610a936119fd565b604051600090339047908381818185875af1925050503d8060008114610ad5576040519150601f19603f3d011682016040523d82523d6000602084013e610ada565b606091505b5050905080610ae857600080fd5b50565b610b0683838360405180602001604052806000815250611387565b505050565b60608160008167ffffffffffffffff811115610b2957610b296122f7565b604051908082528060200260200182016040528015610b9957816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181610b475790505b50905060005b828114610bec57610bc7868683818110610bbb57610bbb612570565b905060200201356113f7565b828281518110610bd957610bd9612570565b6020908102919091010152600101610b9f565b50949350505050565b600061060e8261193e565b600073ffffffffffffffffffffffffffffffffffffffff8216610c4f576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205467ffffffffffffffff1690565b610c8a6119fd565b610c946000611a7e565b565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181610d27576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f20737461727420706173736564000000000000000000000000000000000060448201526064015b60405180910390fd5b610d328160016125ce565b8214610d9a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f546f6b656e2069732070617374207374617274000000000000000000000000006044820152606401610d1e565b610b06836110a5565b60606000806000610db385610c00565b905060008167ffffffffffffffff811115610dd057610dd06122f7565b604051908082528060200260200182016040528015610df9578160200160208202803683370190505b5060408051608081018252600080825260208201819052918101829052606081019190915290915060015b838614610ec257610e3481611af5565b91508160400151610eba57815173ffffffffffffffffffffffffffffffffffffffff1615610e6157815194505b8773ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610eba5780838780600101985081518110610ead57610ead612570565b6020026020010181815250505b600101610e24565b50909695505050505050565b6060600380546106239061251d565b6060818310610f18576040517f32c1995a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080610f2460005490565b90506001851015610f3457600194505b80841115610f40578093505b6000610f4b87610c00565b905084861015610f6a5785850381811015610f64578091505b50610f6e565b5060005b60008167ffffffffffffffff811115610f8957610f896122f7565b604051908082528060200260200182016040528015610fb2578160200160208202803683370190505b50905081600003610fc857935061109e92505050565b6000610fd3886113f7565b905060008160400151610fe4575080515b885b888114158015610ff65750848714155b156110925761100481611af5565b9250826040015161108a57825173ffffffffffffffffffffffffffffffffffffffff161561103157825191505b8a73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361108a578084888060010199508151811061107d5761107d612570565b6020026020010181815250505b600101610fe6565b50505092835250909150505b9392505050565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181611131576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f546f6f20666577000000000000000000000000000000000000000000000000006044820152606401610d1e565b600d5482111561119d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f546f6f206d616e790000000000000000000000000000000000000000000000006044820152606401610d1e565b600c546111aa83836125ce565b1115611212576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4d696e74696e6720636c6f7365640000000000000000000000000000000000006044820152606401610d1e565b60085473ffffffffffffffffffffffffffffffffffffffff1633146112a657600b5461123e90836125e1565b34146112a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f53656e64206578616374204554480000000000000000000000000000000000006044820152606401610d1e565b6112b03383611b9a565b7f94242c431036b9ba6723a138d4b275a5b38e13a95ef66227a45df427c0f843f36112db83836125ce565b60405190815260200160405180910390a15050565b33600081815260076020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6113928484846107fb565b73ffffffffffffffffffffffffffffffffffffffff83163b156113f1576113bb84848484611bb8565b6113f1576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b604080516080810182526000808252602082018190529181018290526060810191909152604080516080810182526000808252602082018190529181018290526060810191909152600183108061145057506000548310155b1561145b5792915050565b61146483611af5565b90508060400151156114765792915050565b61109e83611d31565b606061148a826118f0565b611516576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610d1e565b600a611521836116b8565b604051602001611532929190612689565b6040516020818303038152906040529050919050565b6115506119fd565b600b829055600c819055600a611566848261276d565b50600a6040516020016115799190612887565b60405160208183030381529060405260099081611596919061276d565b5060408051600181527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60208201527f6bd5c950a8d8df17f772f5af37cb3655737899cbf903264b9795592da439661c910160405180910390a1505050565b6060600980546106239061251d565b61160c6119fd565b73ffffffffffffffffffffffffffffffffffffffff81166116af576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610d1e565b610ae881611a7e565b6060816000036116fb57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115611725578061170f816128e6565b915061171e9050600a8361291e565b91506116ff565b60008167ffffffffffffffff811115611740576117406122f7565b6040519080825280601f01601f19166020018201604052801561176a576020820181803683370190505b509050815b8515610bec57611780600182612959565b9050600061178f600a8861291e565b61179a90600a6125e1565b6117a49088612959565b6117af90603061296c565b905060008160f81b9050808484815181106117cc576117cc612570565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350611806600a8961291e565b9750505061176f565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831614806118a257507f80ac58cd000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b8061060e5750507fffffffff00000000000000000000000000000000000000000000000000000000167f5b5e139f000000000000000000000000000000000000000000000000000000001490565b600081600111158015611904575060005482105b801561060e5750506000908152600460205260409020547c0100000000000000000000000000000000000000000000000000000000161590565b600081806001116119cb576000548110156119cb57600081815260046020526040812054907c0100000000000000000000000000000000000000000000000000000000821690036119c9575b8060000361109e57507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0160008181526004602052604090205461198a565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60085473ffffffffffffffffffffffffffffffffffffffff163314610c94576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610d1e565b6008805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60408051608081018252600080825260208201819052918101829052606081019190915260008281526004602052604090205461060e906040805160808101825273ffffffffffffffffffffffffffffffffffffffff8316815260a083901c67ffffffffffffffff1660208201527c0100000000000000000000000000000000000000000000000000000000831615159181019190915260e89190911c606082015290565b611bb4828260405180602001604052806000815250611dcf565b5050565b6040517f150b7a0200000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290611c13903390899088908890600401612985565b6020604051808303816000875af1925050508015611c6c575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611c69918101906129ce565b60015b611ce3573d808015611c9a576040519150601f19603f3d011682016040523d82523d6000602084013e611c9f565b606091505b508051600003611cdb576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050949350505050565b60408051608081018252600080825260208201819052918101829052606081019190915261060e611d618361193e565b6040805160808101825273ffffffffffffffffffffffffffffffffffffffff8316815260a083901c67ffffffffffffffff1660208201527c0100000000000000000000000000000000000000000000000000000000831615159181019190915260e89190911c606082015290565b611dd98383611e62565b73ffffffffffffffffffffffffffffffffffffffff83163b15610b06576000548281035b611e106000868380600101945086611bb8565b611e46576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b818110611dfd578160005414611e5b57600080fd5b5050505050565b6000805490829003611ea0576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff831660008181526005602090815260408083208054680100000000000000018802019055848352600490915281206001851460e11b4260a01b178317905582840190839083907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4600183015b818114611f5c57808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a4600101611f24565b5081600003611f97576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005550505050565b7fffffffff0000000000000000000000000000000000000000000000000000000081168114610ae857600080fd5b600060208284031215611fe057600080fd5b813561109e81611fa0565b60005b83811015612006578181015183820152602001611fee565b50506000910152565b60008151808452612027816020860160208601611feb565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061109e602083018461200f565b60006020828403121561207e57600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff811681146120a957600080fd5b919050565b600080604083850312156120c157600080fd5b6120ca83612085565b946020939093013593505050565b6000806000606084860312156120ed57600080fd5b6120f684612085565b925061210460208501612085565b9150604084013590509250925092565b6000806020838503121561212757600080fd5b823567ffffffffffffffff8082111561213f57600080fd5b818501915085601f83011261215357600080fd5b81358181111561216257600080fd5b8660208260051b850101111561217757600080fd5b60209290920196919550909350505050565b6020808252825182820181905260009190848201906040850190845b81811015610ec25761220083855173ffffffffffffffffffffffffffffffffffffffff815116825267ffffffffffffffff602082015116602083015260408101511515604083015262ffffff60608201511660608301525050565b92840192608092909201916001016121a5565b60006020828403121561222557600080fd5b61109e82612085565b6000806040838503121561224157600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610ec25783518352928401929184019160010161226c565b60008060006060848603121561229d57600080fd5b6122a684612085565b95602085013595506040909401359392505050565b600080604083850312156122ce57600080fd5b6122d783612085565b9150602083013580151581146122ec57600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600067ffffffffffffffff80841115612341576123416122f7565b604051601f85017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715612387576123876122f7565b816040528093508581528686860111156123a057600080fd5b858560208301376000602087830101525050509392505050565b600080600080608085870312156123d057600080fd5b6123d985612085565b93506123e760208601612085565b925060408501359150606085013567ffffffffffffffff81111561240a57600080fd5b8501601f8101871361241b57600080fd5b61242a87823560208401612326565b91505092959194509250565b815173ffffffffffffffffffffffffffffffffffffffff16815260208083015167ffffffffffffffff169082015260408083015115159082015260608083015162ffffff16908201526080810161060e565b60008060006060848603121561249d57600080fd5b833567ffffffffffffffff8111156124b457600080fd5b8401601f810186136124c557600080fd5b6124d486823560208401612326565b9660208601359650604090950135949350505050565b600080604083850312156124fd57600080fd5b61250683612085565b915061251460208401612085565b90509250929050565b600181811c9082168061253157607f821691505b60208210810361256a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561060e5761060e61259f565b808202811582820484141761060e5761060e61259f565b600081546126058161251d565b6001828116801561261d57600181146126505761267f565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008416875282151583028701945061267f565b8560005260208060002060005b858110156126765781548a82015290840190820161265d565b50505082870194505b5050505092915050565b7f697066733a2f2f00000000000000000000000000000000000000000000000000815260006126bb60078301856125f8565b7f2f6d657461646174612f00000000000000000000000000000000000000000000815283516126f181600a840160208801611feb565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000600a9290910191820152600f01949350505050565b601f821115610b0657600081815260208120601f850160051c8101602086101561274e5750805b601f850160051c820191505b81811015610a835782815560010161275a565b815167ffffffffffffffff811115612787576127876122f7565b61279b81612795845461251d565b84612727565b602080601f8311600181146127ee57600084156127b85750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555610a83565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b8281101561283b5788860151825594840194600190910190840161281c565b508582101561287757878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b7f697066733a2f2f00000000000000000000000000000000000000000000000000815260006128b960078301846125f8565b7f2f636f6e74726163744d657461646174612e6a736f6e0000000000000000000081526016019392505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036129175761291761259f565b5060010190565b600082612954577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b8181038181111561060e5761060e61259f565b60ff818116838216019081111561060e5761060e61259f565b600073ffffffffffffffffffffffffffffffffffffffff8087168352808616602084015250836040830152608060608301526129c4608083018461200f565b9695505050505050565b6000602082840312156129e057600080fd5b815161109e81611fa056fea2646970667358221220c61f2c13e5b7042c1c512f1c3d4c014c886a9ecc969b7adee7611d1ee734a12964736f6c63430008150033","deployedBytecode":"0x6080604052600436106101c25760003560e01c80638da5cb5b116100f7578063c23dc68f11610095578063e985e9c511610064578063e985e9c51461050c578063f2fde38b14610562578063f76f950e14610582578063fa9b7018146105a257600080fd5b8063c23dc68f1461048a578063c87b56dd146104b7578063d8bb9bb3146104d7578063e8a3d485146104f757600080fd5b8063a0712d68116100d1578063a0712d681461040d578063a22cb46514610420578063a2309ff814610440578063b88d4fde1461047757600080fd5b80638da5cb5b146103ad57806395d89b41146103d857806399a2557a146103ed57600080fd5b806342842e0e1161016457806370a082311161013e57806370a0823114610338578063715018a6146103585780637a4d892a1461036d5780638462151c1461038057600080fd5b806342842e0e146102d85780635bbb2177146102eb5780636352211e1461031857600080fd5b8063095ea7b3116101a0578063095ea7b31461026357806318160ddd1461027857806323b872dd146102bd5780633ccfd60b146102d057600080fd5b806301ffc9a7146101c757806306fdde03146101fc578063081812fc1461021e575b600080fd5b3480156101d357600080fd5b506101e76101e2366004611fce565b6105b8565b60405190151581526020015b60405180910390f35b34801561020857600080fd5b50610211610614565b6040516101f39190612059565b34801561022a57600080fd5b5061023e61023936600461206c565b6106a6565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101f3565b6102766102713660046120ae565b610710565b005b34801561028457600080fd5b50600154600054037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff015b6040519081526020016101f3565b6102766102cb3660046120d8565b6107fb565b610276610a8b565b6102766102e63660046120d8565b610aeb565b3480156102f757600080fd5b5061030b610306366004612114565b610b0b565b6040516101f39190612189565b34801561032457600080fd5b5061023e61033336600461206c565b610bf5565b34801561034457600080fd5b506102af610353366004612213565b610c00565b34801561036457600080fd5b50610276610c82565b61027661037b36600461222e565b610c96565b34801561038c57600080fd5b506103a061039b366004612213565b610da3565b6040516101f39190612250565b3480156103b957600080fd5b5060085473ffffffffffffffffffffffffffffffffffffffff1661023e565b3480156103e457600080fd5b50610211610ece565b3480156103f957600080fd5b506103a0610408366004612288565b610edd565b61027661041b36600461206c565b6110a5565b34801561042c57600080fd5b5061027661043b3660046122bb565b6112f0565b34801561044c57600080fd5b506000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016102af565b6102766104853660046123ba565b611387565b34801561049657600080fd5b506104aa6104a536600461206c565b6113f7565b6040516101f39190612436565b3480156104c357600080fd5b506102116104d236600461206c565b61147f565b3480156104e357600080fd5b506102766104f2366004612488565b611548565b34801561050357600080fd5b506102116115f5565b34801561051857600080fd5b506101e76105273660046124ea565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561056e57600080fd5b5061027661057d366004612213565b611604565b34801561058e57600080fd5b5061021161059d36600461206c565b6116b8565b3480156105ae57600080fd5b506102af600d5481565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f4906490600000000000000000000000000000000000000000000000000000000148061060e575061060e8261180f565b92915050565b6060600280546106239061251d565b80601f016020809104026020016040519081016040528092919081815260200182805461064f9061251d565b801561069c5780601f106106715761010080835404028352916020019161069c565b820191906000526020600020905b81548152906001019060200180831161067f57829003601f168201915b5050505050905090565b60006106b1826118f0565b6106e7576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081526006602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b600061071b82610bf5565b90503373ffffffffffffffffffffffffffffffffffffffff82161461077a576107448133610527565b61077a576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526006602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff87811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b60006108068261193e565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461086d576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260066020526040902080543380821473ffffffffffffffffffffffffffffffffffffffff8816909114176108e0576108aa8633610527565b6108e0576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff851661092d576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b801561093857600082555b73ffffffffffffffffffffffffffffffffffffffff86811660009081526005602052604080822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff019055918716808252919020805460010190554260a01b177c0200000000000000000000000000000000000000000000000000000000176000858152600460205260408120919091557c020000000000000000000000000000000000000000000000000000000084169003610a2757600184016000818152600460205260408120549003610a25576000548114610a255760008181526004602052604090208490555b505b838573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45b505050505050565b610a936119fd565b604051600090339047908381818185875af1925050503d8060008114610ad5576040519150601f19603f3d011682016040523d82523d6000602084013e610ada565b606091505b5050905080610ae857600080fd5b50565b610b0683838360405180602001604052806000815250611387565b505050565b60608160008167ffffffffffffffff811115610b2957610b296122f7565b604051908082528060200260200182016040528015610b9957816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181610b475790505b50905060005b828114610bec57610bc7868683818110610bbb57610bbb612570565b905060200201356113f7565b828281518110610bd957610bd9612570565b6020908102919091010152600101610b9f565b50949350505050565b600061060e8261193e565b600073ffffffffffffffffffffffffffffffffffffffff8216610c4f576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205467ffffffffffffffff1690565b610c8a6119fd565b610c946000611a7e565b565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181610d27576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f20737461727420706173736564000000000000000000000000000000000060448201526064015b60405180910390fd5b610d328160016125ce565b8214610d9a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f546f6b656e2069732070617374207374617274000000000000000000000000006044820152606401610d1e565b610b06836110a5565b60606000806000610db385610c00565b905060008167ffffffffffffffff811115610dd057610dd06122f7565b604051908082528060200260200182016040528015610df9578160200160208202803683370190505b5060408051608081018252600080825260208201819052918101829052606081019190915290915060015b838614610ec257610e3481611af5565b91508160400151610eba57815173ffffffffffffffffffffffffffffffffffffffff1615610e6157815194505b8773ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610eba5780838780600101985081518110610ead57610ead612570565b6020026020010181815250505b600101610e24565b50909695505050505050565b6060600380546106239061251d565b6060818310610f18576040517f32c1995a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080610f2460005490565b90506001851015610f3457600194505b80841115610f40578093505b6000610f4b87610c00565b905084861015610f6a5785850381811015610f64578091505b50610f6e565b5060005b60008167ffffffffffffffff811115610f8957610f896122f7565b604051908082528060200260200182016040528015610fb2578160200160208202803683370190505b50905081600003610fc857935061109e92505050565b6000610fd3886113f7565b905060008160400151610fe4575080515b885b888114158015610ff65750848714155b156110925761100481611af5565b9250826040015161108a57825173ffffffffffffffffffffffffffffffffffffffff161561103157825191505b8a73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361108a578084888060010199508151811061107d5761107d612570565b6020026020010181815250505b600101610fe6565b50505092835250909150505b9392505050565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181611131576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f546f6f20666577000000000000000000000000000000000000000000000000006044820152606401610d1e565b600d5482111561119d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f546f6f206d616e790000000000000000000000000000000000000000000000006044820152606401610d1e565b600c546111aa83836125ce565b1115611212576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4d696e74696e6720636c6f7365640000000000000000000000000000000000006044820152606401610d1e565b60085473ffffffffffffffffffffffffffffffffffffffff1633146112a657600b5461123e90836125e1565b34146112a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f53656e64206578616374204554480000000000000000000000000000000000006044820152606401610d1e565b6112b03383611b9a565b7f94242c431036b9ba6723a138d4b275a5b38e13a95ef66227a45df427c0f843f36112db83836125ce565b60405190815260200160405180910390a15050565b33600081815260076020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6113928484846107fb565b73ffffffffffffffffffffffffffffffffffffffff83163b156113f1576113bb84848484611bb8565b6113f1576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b604080516080810182526000808252602082018190529181018290526060810191909152604080516080810182526000808252602082018190529181018290526060810191909152600183108061145057506000548310155b1561145b5792915050565b61146483611af5565b90508060400151156114765792915050565b61109e83611d31565b606061148a826118f0565b611516576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610d1e565b600a611521836116b8565b604051602001611532929190612689565b6040516020818303038152906040529050919050565b6115506119fd565b600b829055600c819055600a611566848261276d565b50600a6040516020016115799190612887565b60405160208183030381529060405260099081611596919061276d565b5060408051600181527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60208201527f6bd5c950a8d8df17f772f5af37cb3655737899cbf903264b9795592da439661c910160405180910390a1505050565b6060600980546106239061251d565b61160c6119fd565b73ffffffffffffffffffffffffffffffffffffffff81166116af576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610d1e565b610ae881611a7e565b6060816000036116fb57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115611725578061170f816128e6565b915061171e9050600a8361291e565b91506116ff565b60008167ffffffffffffffff811115611740576117406122f7565b6040519080825280601f01601f19166020018201604052801561176a576020820181803683370190505b509050815b8515610bec57611780600182612959565b9050600061178f600a8861291e565b61179a90600a6125e1565b6117a49088612959565b6117af90603061296c565b905060008160f81b9050808484815181106117cc576117cc612570565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350611806600a8961291e565b9750505061176f565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831614806118a257507f80ac58cd000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b8061060e5750507fffffffff00000000000000000000000000000000000000000000000000000000167f5b5e139f000000000000000000000000000000000000000000000000000000001490565b600081600111158015611904575060005482105b801561060e5750506000908152600460205260409020547c0100000000000000000000000000000000000000000000000000000000161590565b600081806001116119cb576000548110156119cb57600081815260046020526040812054907c0100000000000000000000000000000000000000000000000000000000821690036119c9575b8060000361109e57507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0160008181526004602052604090205461198a565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60085473ffffffffffffffffffffffffffffffffffffffff163314610c94576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610d1e565b6008805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60408051608081018252600080825260208201819052918101829052606081019190915260008281526004602052604090205461060e906040805160808101825273ffffffffffffffffffffffffffffffffffffffff8316815260a083901c67ffffffffffffffff1660208201527c0100000000000000000000000000000000000000000000000000000000831615159181019190915260e89190911c606082015290565b611bb4828260405180602001604052806000815250611dcf565b5050565b6040517f150b7a0200000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290611c13903390899088908890600401612985565b6020604051808303816000875af1925050508015611c6c575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611c69918101906129ce565b60015b611ce3573d808015611c9a576040519150601f19603f3d011682016040523d82523d6000602084013e611c9f565b606091505b508051600003611cdb576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050949350505050565b60408051608081018252600080825260208201819052918101829052606081019190915261060e611d618361193e565b6040805160808101825273ffffffffffffffffffffffffffffffffffffffff8316815260a083901c67ffffffffffffffff1660208201527c0100000000000000000000000000000000000000000000000000000000831615159181019190915260e89190911c606082015290565b611dd98383611e62565b73ffffffffffffffffffffffffffffffffffffffff83163b15610b06576000548281035b611e106000868380600101945086611bb8565b611e46576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b818110611dfd578160005414611e5b57600080fd5b5050505050565b6000805490829003611ea0576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff831660008181526005602090815260408083208054680100000000000000018802019055848352600490915281206001851460e11b4260a01b178317905582840190839083907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4600183015b818114611f5c57808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a4600101611f24565b5081600003611f97576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005550505050565b7fffffffff0000000000000000000000000000000000000000000000000000000081168114610ae857600080fd5b600060208284031215611fe057600080fd5b813561109e81611fa0565b60005b83811015612006578181015183820152602001611fee565b50506000910152565b60008151808452612027816020860160208601611feb565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061109e602083018461200f565b60006020828403121561207e57600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff811681146120a957600080fd5b919050565b600080604083850312156120c157600080fd5b6120ca83612085565b946020939093013593505050565b6000806000606084860312156120ed57600080fd5b6120f684612085565b925061210460208501612085565b9150604084013590509250925092565b6000806020838503121561212757600080fd5b823567ffffffffffffffff8082111561213f57600080fd5b818501915085601f83011261215357600080fd5b81358181111561216257600080fd5b8660208260051b850101111561217757600080fd5b60209290920196919550909350505050565b6020808252825182820181905260009190848201906040850190845b81811015610ec25761220083855173ffffffffffffffffffffffffffffffffffffffff815116825267ffffffffffffffff602082015116602083015260408101511515604083015262ffffff60608201511660608301525050565b92840192608092909201916001016121a5565b60006020828403121561222557600080fd5b61109e82612085565b6000806040838503121561224157600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610ec25783518352928401929184019160010161226c565b60008060006060848603121561229d57600080fd5b6122a684612085565b95602085013595506040909401359392505050565b600080604083850312156122ce57600080fd5b6122d783612085565b9150602083013580151581146122ec57600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600067ffffffffffffffff80841115612341576123416122f7565b604051601f85017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715612387576123876122f7565b816040528093508581528686860111156123a057600080fd5b858560208301376000602087830101525050509392505050565b600080600080608085870312156123d057600080fd5b6123d985612085565b93506123e760208601612085565b925060408501359150606085013567ffffffffffffffff81111561240a57600080fd5b8501601f8101871361241b57600080fd5b61242a87823560208401612326565b91505092959194509250565b815173ffffffffffffffffffffffffffffffffffffffff16815260208083015167ffffffffffffffff169082015260408083015115159082015260608083015162ffffff16908201526080810161060e565b60008060006060848603121561249d57600080fd5b833567ffffffffffffffff8111156124b457600080fd5b8401601f810186136124c557600080fd5b6124d486823560208401612326565b9660208601359650604090950135949350505050565b600080604083850312156124fd57600080fd5b61250683612085565b915061251460208401612085565b90509250929050565b600181811c9082168061253157607f821691505b60208210810361256a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561060e5761060e61259f565b808202811582820484141761060e5761060e61259f565b600081546126058161251d565b6001828116801561261d57600181146126505761267f565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008416875282151583028701945061267f565b8560005260208060002060005b858110156126765781548a82015290840190820161265d565b50505082870194505b5050505092915050565b7f697066733a2f2f00000000000000000000000000000000000000000000000000815260006126bb60078301856125f8565b7f2f6d657461646174612f00000000000000000000000000000000000000000000815283516126f181600a840160208801611feb565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000600a9290910191820152600f01949350505050565b601f821115610b0657600081815260208120601f850160051c8101602086101561274e5750805b601f850160051c820191505b81811015610a835782815560010161275a565b815167ffffffffffffffff811115612787576127876122f7565b61279b81612795845461251d565b84612727565b602080601f8311600181146127ee57600084156127b85750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555610a83565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b8281101561283b5788860151825594840194600190910190840161281c565b508582101561287757878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b7f697066733a2f2f00000000000000000000000000000000000000000000000000815260006128b960078301846125f8565b7f2f636f6e74726163744d657461646174612e6a736f6e0000000000000000000081526016019392505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036129175761291761259f565b5060010190565b600082612954577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b8181038181111561060e5761060e61259f565b60ff818116838216019081111561060e5761060e61259f565b600073ffffffffffffffffffffffffffffffffffffffff8087168352808616602084015250836040830152608060608301526129c4608083018461200f565b9695505050505050565b6000602082840312156129e057600080fd5b815161109e81611fa056fea2646970667358221220c61f2c13e5b7042c1c512f1c3d4c014c886a9ecc969b7adee7611d1ee734a12964736f6c63430008150033"}}')}},e=>{e.O(0,[216],(()=>{return t=69670,e(e.s=t);var t}));var t=e.O();admin=t}]);
//# sourceMappingURL=main.admin.js.map