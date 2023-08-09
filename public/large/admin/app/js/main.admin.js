var admin;(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[179],{46700:(e,t,i)=>{var a={"./af":42786,"./af.js":42786,"./ar":30867,"./ar-dz":14130,"./ar-dz.js":14130,"./ar-kw":96135,"./ar-kw.js":96135,"./ar-ly":56440,"./ar-ly.js":56440,"./ar-ma":47702,"./ar-ma.js":47702,"./ar-sa":16040,"./ar-sa.js":16040,"./ar-tn":37100,"./ar-tn.js":37100,"./ar.js":30867,"./az":31083,"./az.js":31083,"./be":9808,"./be.js":9808,"./bg":68338,"./bg.js":68338,"./bm":67438,"./bm.js":67438,"./bn":8905,"./bn-bd":76225,"./bn-bd.js":76225,"./bn.js":8905,"./bo":11560,"./bo.js":11560,"./br":1278,"./br.js":1278,"./bs":80622,"./bs.js":80622,"./ca":2468,"./ca.js":2468,"./cs":5822,"./cs.js":5822,"./cv":50877,"./cv.js":50877,"./cy":47373,"./cy.js":47373,"./da":24780,"./da.js":24780,"./de":59740,"./de-at":60217,"./de-at.js":60217,"./de-ch":60894,"./de-ch.js":60894,"./de.js":59740,"./dv":5300,"./dv.js":5300,"./el":50837,"./el.js":50837,"./en-au":78348,"./en-au.js":78348,"./en-ca":77925,"./en-ca.js":77925,"./en-gb":22243,"./en-gb.js":22243,"./en-ie":46436,"./en-ie.js":46436,"./en-il":47207,"./en-il.js":47207,"./en-in":44175,"./en-in.js":44175,"./en-nz":76319,"./en-nz.js":76319,"./en-sg":31662,"./en-sg.js":31662,"./eo":92915,"./eo.js":92915,"./es":55655,"./es-do":55251,"./es-do.js":55251,"./es-mx":96112,"./es-mx.js":96112,"./es-us":71146,"./es-us.js":71146,"./es.js":55655,"./et":5603,"./et.js":5603,"./eu":77763,"./eu.js":77763,"./fa":76959,"./fa.js":76959,"./fi":11897,"./fi.js":11897,"./fil":42549,"./fil.js":42549,"./fo":94694,"./fo.js":94694,"./fr":94470,"./fr-ca":63049,"./fr-ca.js":63049,"./fr-ch":52330,"./fr-ch.js":52330,"./fr.js":94470,"./fy":5044,"./fy.js":5044,"./ga":29295,"./ga.js":29295,"./gd":2101,"./gd.js":2101,"./gl":38794,"./gl.js":38794,"./gom-deva":27884,"./gom-deva.js":27884,"./gom-latn":23168,"./gom-latn.js":23168,"./gu":95349,"./gu.js":95349,"./he":24206,"./he.js":24206,"./hi":30094,"./hi.js":30094,"./hr":30316,"./hr.js":30316,"./hu":22138,"./hu.js":22138,"./hy-am":11423,"./hy-am.js":11423,"./id":29218,"./id.js":29218,"./is":90135,"./is.js":90135,"./it":90626,"./it-ch":10150,"./it-ch.js":10150,"./it.js":90626,"./ja":39183,"./ja.js":39183,"./jv":24286,"./jv.js":24286,"./ka":12105,"./ka.js":12105,"./kk":47772,"./kk.js":47772,"./km":18758,"./km.js":18758,"./kn":79282,"./kn.js":79282,"./ko":33730,"./ko.js":33730,"./ku":1408,"./ku.js":1408,"./ky":33291,"./ky.js":33291,"./lb":36841,"./lb.js":36841,"./lo":55466,"./lo.js":55466,"./lt":57010,"./lt.js":57010,"./lv":37595,"./lv.js":37595,"./me":39861,"./me.js":39861,"./mi":35493,"./mi.js":35493,"./mk":95966,"./mk.js":95966,"./ml":87341,"./ml.js":87341,"./mn":5115,"./mn.js":5115,"./mr":10370,"./mr.js":10370,"./ms":9847,"./ms-my":41237,"./ms-my.js":41237,"./ms.js":9847,"./mt":72126,"./mt.js":72126,"./my":56165,"./my.js":56165,"./nb":64924,"./nb.js":64924,"./ne":16744,"./ne.js":16744,"./nl":93901,"./nl-be":59814,"./nl-be.js":59814,"./nl.js":93901,"./nn":83877,"./nn.js":83877,"./oc-lnc":92135,"./oc-lnc.js":92135,"./pa-in":15858,"./pa-in.js":15858,"./pl":64495,"./pl.js":64495,"./pt":89520,"./pt-br":57971,"./pt-br.js":57971,"./pt.js":89520,"./ro":96459,"./ro.js":96459,"./ru":21793,"./ru.js":21793,"./sd":40950,"./sd.js":40950,"./se":10490,"./se.js":10490,"./si":90124,"./si.js":90124,"./sk":81111,"./sk.js":81111,"./sl":14985,"./sl.js":14985,"./sq":51104,"./sq.js":51104,"./sr":49131,"./sr-cyrl":79915,"./sr-cyrl.js":79915,"./sr.js":49131,"./ss":85893,"./ss.js":85893,"./sv":98760,"./sv.js":98760,"./sw":91172,"./sw.js":91172,"./ta":27333,"./ta.js":27333,"./te":23110,"./te.js":23110,"./tet":52095,"./tet.js":52095,"./tg":27321,"./tg.js":27321,"./th":9041,"./th.js":9041,"./tk":19005,"./tk.js":19005,"./tl-ph":75768,"./tl-ph.js":75768,"./tlh":89444,"./tlh.js":89444,"./tr":72397,"./tr.js":72397,"./tzl":28254,"./tzl.js":28254,"./tzm":51106,"./tzm-latn":30699,"./tzm-latn.js":30699,"./tzm.js":51106,"./ug-cn":9288,"./ug-cn.js":9288,"./uk":67691,"./uk.js":67691,"./ur":13795,"./ur.js":13795,"./uz":6791,"./uz-latn":60588,"./uz-latn.js":60588,"./uz.js":6791,"./vi":65666,"./vi.js":65666,"./x-pseudo":14378,"./x-pseudo.js":14378,"./yo":75805,"./yo.js":75805,"./zh-cn":83839,"./zh-cn.js":83839,"./zh-hk":55726,"./zh-hk.js":55726,"./zh-mo":99807,"./zh-mo.js":99807,"./zh-tw":74152,"./zh-tw.js":74152};function n(e){var t=s(e);return i(t)}function s(e){if(!i.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}n.keys=function(){return Object.keys(a)},n.resolve=s,e.exports=n,n.id=46700},73243:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>io});i(35666),i(28660);const a={WalletService:Symbol("WalletService")};class n{static getInstance(e){return eo.get(e)}static getContainer(){return eo}static getWalletService(){return eo.get(a.WalletService)}}var s=i(45466),o=i(61906),f=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},r=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},c=function(e,t){return function(i,a){t(i,a,e)}};let l=class{app;constructor(e){this.app=e}showExceptionPopup(e){console.log(e),this.app.dialog.alert(e.message,"There was an error")}showPopup(e){this.app.dialog.alert(e)}showAlert(e){this.app.dialog.alert(e)}spinnerDialog;showSpinner(e){this.spinnerDialog&&this.hideSpinner(),this.spinnerDialog=this.app.dialog.preloader(e||"Loading")}hideSpinner(){this.spinnerDialog&&(this.spinnerDialog.close(),this.spinnerDialog=null)}progressDialog;showProgress(e){this.progressDialog&&this.hideProgress();this.progressDialog=this.app.dialog.progress(e||"Loading",0)}setProgress(e,t){this.progressDialog&&(this.progressDialog.setProgress(e),this.progressDialog.setText(t))}hideProgress(){this.progressDialog&&(this.progressDialog.close(),this.progressDialog=null)}};l=f([(0,s.b)(),c(0,(0,o.f)("framework7")),r("design:paramtypes",[Object])],l);var d=i(25494),p=i(99025),u=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},h=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class m{_id;_rev;content;cid;dateCreated}u([(0,d.a)(),h("design:type",String)],m.prototype,"_id",void 0),u([(0,d.a)(),h("design:type",String)],m.prototype,"_rev",void 0),u([(0,d.a)(),h("design:type",String)],m.prototype,"content",void 0),u([(0,p.rl)(),h("design:type",String)],m.prototype,"cid",void 0),u([(0,d.a)(),h("design:type",String)],m.prototype,"dateCreated",void 0);var g=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},v=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},b=function(e,t){return function(i,a){t(i,a,e)}};let y=class{pouchPrefix;PouchDB;dbCache={};constructor(e,t){this.pouchPrefix=e,this.PouchDB=t}async getDatabase(e,t){let i=this.PouchDB();const a=`${this.pouchPrefix}-large-${e}`;if(this.dbCache[a])return this.dbCache[a];this.dbCache[a]=new i(a,{auto_compaction:!0});const n=await this.dbCache[a].info();if(0==n.doc_count&&0==n.update_seq){if(t){console.log(`Creating indexes for ${a}`);let e={_id:"_local/changesets",ids:[]};for(let i of t)await i.changeset(this.dbCache[a]),e.ids.push(i.id),console.log(`New changeset detected...${i.id}`);await this.dbCache[a].put(e)}}else if(t){let e;try{e=await this.dbCache[a].get("_local/changesets")}catch(e){}e||(e={_id:"_local/changesets",ids:[]});let i=!1;for(let n of t)if(!e.ids.includes(n.id)){try{await n.changeset(this.dbCache[a])}catch(e){}e.ids.push(n.id),i=!0,console.log(`New changeset detected...${n.id}`)}i&&(console.log("Saving changeset log...",e),await this.dbCache[a].put(e))}return this.dbCache[a]}async getEmptyDatabase(e){let t=this.PouchDB();const i=`${this.pouchPrefix}-large-${e}`;return this.dbCache[i]=new t(i,{auto_compaction:!0}),this.dbCache[i]}async getLatestRevision(e,t){let i;try{i=await e.get(t)}catch(e){}if(i)return i;let a=await e.allDocs({key:t,include_docs:!0,deleted:"ok"});if(a.rows?.length>0){return{_id:t,_rev:a.rows[0].value.rev,_deleted:!0}}}};y=g([(0,s.b)(),b(0,(0,o.f)("pouch-prefix")),b(1,(0,o.f)("PouchDB")),v("design:paramtypes",[String,Object])],y);var w=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},S=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let $=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-animation`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-animation`)}async get(e){return Object.assign(new m,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}};$=w([(0,s.b)(),S("design:paramtypes",[y])],$);var k=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},I=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class R{_id;_rev;walletAddress;name;description;url;coverPhotoId;dateCreated;lastUpdated}k([(0,d.a)(),I("design:type",String)],R.prototype,"_id",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"_rev",void 0),k([(0,p.rl)(),I("design:type",String)],R.prototype,"walletAddress",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"name",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"description",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"url",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"coverPhotoId",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"dateCreated",void 0),k([(0,d.a)(),I("design:type",String)],R.prototype,"lastUpdated",void 0);var x=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},_=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let P=class{databaseService;db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-author`)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-author`)}async getLatestRevision(e){return Object.assign(new R,await this.databaseService.getLatestRevision(this.db,e))}async get(e){return Object.assign(new R,await this.db.get(e))}async put(e){return this.db.put(e)}};P=x([(0,s.b)(),_("design:paramtypes",[y])],P);var C=i(57253),j=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},T=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class A{_id;_rev;forkedFromCid;forkedFromId;forkedFromFeeRecipient;forkType;disableForks;authorId;title;symbol;link;description;descriptionHTML;descriptionMarkdown;license;licenseHTML;licenseMarkdown;category;language;coverImageId;coverBannerId;mintPrice;attributeOptions;sellerFeeBasisPoints;royaltyPercent;contractAddress;pinJobId;pinJobStatus;gitProvider;httpUrlToRepo;publishReaderRepoId;publishReaderRepoPath;publishReaderRepoBranch;publishReaderRepoStatus;publishReaderIPFSStatus;pubDate;productionHostname;productionBaseURI;productionBaseLibraryURI;showMintPage;showActivityPage;marketplaces;externalLinks;importSuccess;dateCreated;lastUpdated}j([(0,d.a)(),T("design:type",String)],A.prototype,"_id",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"_rev",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"forkedFromCid",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"forkedFromId",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"forkedFromFeeRecipient",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"forkType",void 0),j([(0,d.a)(),T("design:type",Boolean)],A.prototype,"disableForks",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"authorId",void 0),j([(0,C.Bl)(3,{message:"Title must be more than 3 characters."}),T("design:type",String)],A.prototype,"title",void 0),j([(0,p.rl)(),T("design:type",String)],A.prototype,"symbol",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"link",void 0),j([(0,d.a)(),T("design:type",Object)],A.prototype,"description",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"descriptionHTML",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"descriptionMarkdown",void 0),j([(0,d.a)(),T("design:type",Object)],A.prototype,"license",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"licenseHTML",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"licenseMarkdown",void 0),j([(0,d.a)(),T("design:type",Array)],A.prototype,"category",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"language",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"coverImageId",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"coverBannerId",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"mintPrice",void 0),j([(0,d.a)(),T("design:type",Array)],A.prototype,"attributeOptions",void 0),j([(0,d.a)(),T("design:type",Number)],A.prototype,"sellerFeeBasisPoints",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"royaltyPercent",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"contractAddress",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"pinJobId",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"pinJobStatus",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"gitProvider",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"httpUrlToRepo",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"publishReaderRepoId",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"publishReaderRepoPath",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"publishReaderRepoBranch",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"publishReaderRepoStatus",void 0),j([(0,d.a)(),T("design:type",Object)],A.prototype,"publishReaderIPFSStatus",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"pubDate",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"productionHostname",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"productionBaseURI",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"productionBaseLibraryURI",void 0),j([(0,d.a)(),T("design:type",Boolean)],A.prototype,"showMintPage",void 0),j([(0,d.a)(),T("design:type",Boolean)],A.prototype,"showActivityPage",void 0),j([(0,d.a)(),T("design:type",Object)],A.prototype,"marketplaces",void 0),j([(0,d.a)(),T("design:type",Object)],A.prototype,"externalLinks",void 0),j([(0,d.a)(),T("design:type",Boolean)],A.prototype,"importSuccess",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"dateCreated",void 0),j([(0,d.a)(),T("design:type",String)],A.prototype,"lastUpdated",void 0);var F=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},O=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let E=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}}),await e.createIndex({index:{fields:["lastUpdated"]}})}}];db;constructor(e){this.databaseService=e}async load(){this.db=await this.databaseService.getDatabase("channel",this.changesets)}async get(e){return Object.assign(new A,await this.db.get(e))}async getLatestRevision(e){return Object.assign(new A,await this.databaseService.getLatestRevision(this.db,e))}async put(e){return this.db.put(e)}async list(e,t){return(await this.db.find({selector:{dateCreated:{$exists:!0}},sort:[{dateCreated:"desc"}],limit:e,skip:t})).docs}async delete(e){await this.db.remove(e)}};E=F([(0,s.b)(),O("design:paramtypes",[y])],E);var D=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},B=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class M{_id;_rev;ipfsHost;defaultGitProvider;gitProviders;gitCorsProxy;username;personalAccessToken;alchemyKey;huggingFace;dateCreated;lastUpdated}D([(0,d.a)(),B("design:type",String)],M.prototype,"_id",void 0),D([(0,d.a)(),B("design:type",String)],M.prototype,"_rev",void 0),D([(0,d.a)(),B("design:type",String)],M.prototype,"ipfsHost",void 0),D([(0,d.a)(),B("design:type",String)],M.prototype,"defaultGitProvider",void 0),D([(0,d.a)(),B("design:type",Object)],M.prototype,"gitProviders",void 0),D([(0,d.a)(),B("design:type",String)],M.prototype,"gitCorsProxy",void 0),D([(0,d.a)(),B("design:type",String)],M.prototype,"username",void 0),D([(0,d.a)(),B("design:type",String)],M.prototype,"personalAccessToken",void 0),D([(0,d.a)(),B("design:type",String)],M.prototype,"alchemyKey",void 0),D([(0,d.a)(),B("design:type",String)],M.prototype,"huggingFace",void 0),D([(0,d.a)(),B("design:type",String)],M.prototype,"dateCreated",void 0),D([(0,d.a)(),B("design:type",String)],M.prototype,"lastUpdated",void 0);var N=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},L=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let U=class{databaseService;db;constructor(e){this.databaseService=e}async load(){this.db=await this.databaseService.getDatabase("settings")}async get(){return Object.assign(new M,await this.db.get("single"))}async put(e){e._id="single",await this.db.put(e)}};U=N([(0,s.b)(),L("design:paramtypes",[y])],U);var H=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},z=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class q{_id;_rev;buffer;svg;title;cid;generated;dateCreated}H([(0,d.a)(),z("design:type",String)],q.prototype,"_id",void 0),H([(0,d.a)(),z("design:type",String)],q.prototype,"_rev",void 0),H([(0,d.a)(),z("design:type",Object)],q.prototype,"buffer",void 0),H([(0,d.a)(),z("design:type",String)],q.prototype,"svg",void 0),H([(0,d.a)(),z("design:type",String)],q.prototype,"title",void 0),H([(0,p.rl)(),z("design:type",String)],q.prototype,"cid",void 0),H([(0,d.a)(),z("design:type",Boolean)],q.prototype,"generated",void 0),H([(0,d.a)(),z("design:type",String)],q.prototype,"dateCreated",void 0);var G=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},J=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let W=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-image`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-image`)}async get(e){return Object.assign(new q,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}};W=G([(0,s.b)(),J("design:paramtypes",[y])],W);var Z=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},V=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Y{_id;_rev;forkedFromId;channelId;tokenId;title;link;description;content;contentHTML;excerpt;authorId;category;attributeSelections;coverImageId;coverImageGenerated;animationId;themes;coverImageCSS;animationCSS;coverImageAsAnimation;originalJSONMetadataId;imageIds;datePublished;dateCreated;lastUpdated}Z([(0,d.a)(),V("design:type",String)],Y.prototype,"_id",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"_rev",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"forkedFromId",void 0),Z([(0,p.rl)(),V("design:type",String)],Y.prototype,"channelId",void 0),Z([(0,p.rl)(),V("design:type",Number)],Y.prototype,"tokenId",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"title",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"link",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"description",void 0),Z([(0,d.a)(),V("design:type",Object)],Y.prototype,"content",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"contentHTML",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"excerpt",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"authorId",void 0),Z([(0,d.a)(),V("design:type",Array)],Y.prototype,"category",void 0),Z([(0,d.a)(),V("design:type",Array)],Y.prototype,"attributeSelections",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"coverImageId",void 0),Z([(0,d.a)(),V("design:type",Boolean)],Y.prototype,"coverImageGenerated",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"animationId",void 0),Z([(0,d.a)(),V("design:type",Array)],Y.prototype,"themes",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"coverImageCSS",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"animationCSS",void 0),Z([(0,d.a)(),V("design:type",Boolean)],Y.prototype,"coverImageAsAnimation",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"originalJSONMetadataId",void 0),Z([(0,d.a)(),V("design:type",Array)],Y.prototype,"imageIds",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"datePublished",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"dateCreated",void 0),Z([(0,d.a)(),V("design:type",String)],Y.prototype,"lastUpdated",void 0);let K=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}})}},{id:"1",changeset:async e=>{await e.put({_id:"_design/attribute_counts",views:{attribute_counts:{map:function(e){if(e.attributeSelections?.length>0)for(let t of e.attributeSelections)emit([e.channelId,t.traitType,t.value])}.toString(),reduce:"_count"}}})}},{id:"5",changeset:async e=>{await e.put({_id:"_design/by_channel_token",views:{by_channel_token:{map:function(e){emit([e.channelId,e.tokenId])}.toString()}}}),await e.put({_id:"_design/by_channel_token_stats",views:{by_channel_token_stats:{map:function(e){emit(e.channelId,e.tokenId)}.toString(),reduce:"_stats"}}})}},{id:"6",changeset:async e=>{await e.createIndex({index:{fields:["animationId"]}}),await e.put({_id:"_design/by_image_id",views:{by_image_id:{map:function(e){if(e.imageIds&&e.imageIds?.length>0)for(let t of e.imageIds)emit(t)}.toString()}}})}}];var Q=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},X=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ee=class{databaseService;static CHUNK_SIZE=35;changesets=K;db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-item`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-item`)}async get(e){return Object.assign(new Y,await this.db.get(e))}async getIds(){return(await this.db.allDocs({include_docs:!1})).rows.filter((e=>!e.id.startsWith("_design")&&!e.id.startsWith("_local"))).map((e=>e.id))}async getLatestRevision(e){return Object.assign(new Y,await this.databaseService.getLatestRevision(this.db,e))}async getByTokenId(e,t){let i=await this.db.query("by_channel_token",{reduce:!1,include_docs:!0,key:[e,t],limit:1});if(i.rows?.length>0)return Object.assign(new Y,i.rows[0].doc)}async put(e){await this.db.put(e)}async listByChannel(e,t,i){let a=[],n=await this.db.query("by_channel_token",{reduce:!1,include_docs:!0,startkey:[e,0],endkey:[e,{}],limit:t,skip:i});if(n.rows?.length>0)for(let e of n.rows)a.push(Object.assign(new Y,e.doc));return a}async delete(e){await this.db.remove(e)}async getAttributeCountByChannel(e){return(await this.db.query("attribute_counts",{reduce:!0,startKey:[e,"",""],endKey:[e,{},{}],include_docs:!1,group_level:3})).rows.map((t=>({traitType:t.key[1],value:t.key[2],count:t.value,channelId:e})))}async getAttributeInfoBySelections(e,t){return(await this.db.query("attribute_counts",{reduce:!0,keys:t.map((t=>[e,t.traitType,t.value])),include_docs:!1,group_level:3})).rows.map((t=>({traitType:t.key[1],value:t.key[2],count:t.value,channelId:e})))}async getByImageId(e){let t=await this.db.query("by_image_id",{reduce:!1,include_docs:!0,key:e});return t.rows?.map((e=>e.doc))}async getByAnimationId(e){return(await this.db.find({selector:{animationId:{$eq:e}}})).docs}};ee=Q([(0,s.b)(),X("design:paramtypes",[y])],ee);var te=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ie=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class ae{_id;_rev;forkedFromId;channelId;name;slug;content;contentHTML;contentMarkdown;locations;dateCreated;lastUpdated}te([(0,d.a)(),ie("design:type",String)],ae.prototype,"_id",void 0),te([(0,d.a)(),ie("design:type",String)],ae.prototype,"_rev",void 0),te([(0,d.a)(),ie("design:type",String)],ae.prototype,"forkedFromId",void 0),te([(0,p.rl)(),ie("design:type",String)],ae.prototype,"channelId",void 0),te([(0,p.rl)(),ie("design:type",String)],ae.prototype,"name",void 0),te([(0,p.rl)(),ie("design:type",String)],ae.prototype,"slug",void 0),te([(0,d.a)(),ie("design:type",Object)],ae.prototype,"content",void 0),te([(0,d.a)(),ie("design:type",String)],ae.prototype,"contentHTML",void 0),te([(0,d.a)(),ie("design:type",String)],ae.prototype,"contentMarkdown",void 0),te([(0,d.a)(),ie("design:type",Array)],ae.prototype,"locations",void 0),te([(0,d.a)(),ie("design:type",String)],ae.prototype,"dateCreated",void 0),te([(0,d.a)(),ie("design:type",String)],ae.prototype,"lastUpdated",void 0);var ne=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},se=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let oe=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["channelId"]}}),await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-static-page`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-static-page`)}async get(e){return Object.assign(new ae,await this.db.get(e))}async getIds(){return(await this.db.allDocs({include_docs:!1})).rows.filter((e=>!e.id.startsWith("_design")&&!e.id.startsWith("_local"))).map((e=>e.id))}async getLatestRevision(e){return Object.assign(new ae,await this.databaseService.getLatestRevision(this.db,e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async listByChannel(e,t,i){return(await this.db.find({selector:{channelId:{$eq:e},dateCreated:{$exists:!0}},sort:[{dateCreated:"asc"}],limit:t,skip:i})).docs}};oe=ne([(0,s.b)(),se("design:paramtypes",[y])],oe);var fe=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},re=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class ce{_id;_rev;forkedFromId;channelId;name;coverImageCSS;animationCSS;dateCreated;lastUpdated}fe([(0,d.a)(),re("design:type",String)],ce.prototype,"_id",void 0),fe([(0,d.a)(),re("design:type",String)],ce.prototype,"_rev",void 0),fe([(0,d.a)(),re("design:type",String)],ce.prototype,"forkedFromId",void 0),fe([(0,p.rl)(),re("design:type",String)],ce.prototype,"channelId",void 0),fe([(0,p.rl)(),re("design:type",String)],ce.prototype,"name",void 0),fe([(0,d.a)(),re("design:type",String)],ce.prototype,"coverImageCSS",void 0),fe([(0,d.a)(),re("design:type",String)],ce.prototype,"animationCSS",void 0),fe([(0,d.a)(),re("design:type",String)],ce.prototype,"dateCreated",void 0),fe([(0,d.a)(),re("design:type",String)],ce.prototype,"lastUpdated",void 0);var le=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},de=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let pe=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["channelId"]}}),await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-theme`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-theme`)}async get(e){return Object.assign(new ce,await this.db.get(e))}async getIds(){return(await this.db.allDocs({include_docs:!1})).rows.filter((e=>!e.id.startsWith("_design")&&!e.id.startsWith("_local"))).map((e=>e.id))}async getLatestRevision(e){return Object.assign(new ce,await this.databaseService.getLatestRevision(this.db,e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async listByChannel(e,t,i){return(await this.db.find({selector:{channelId:{$eq:e},dateCreated:{$exists:!0}},sort:[{dateCreated:"asc"}],limit:t,skip:i})).docs}};pe=le([(0,s.b)(),de("design:paramtypes",[y])],pe);var ue=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},he=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class me{_id;_rev;tokenMetadata;dateCreated}ue([(0,d.a)(),he("design:type",String)],me.prototype,"_id",void 0),ue([(0,d.a)(),he("design:type",String)],me.prototype,"_rev",void 0),ue([(0,d.a)(),he("design:type",Object)],me.prototype,"tokenMetadata",void 0),ue([(0,d.a)(),he("design:type",String)],me.prototype,"dateCreated",void 0);var ge=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ve=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let be=class{databaseService;db;constructor(e){this.databaseService=e}async load(){this.db=await this.databaseService.getDatabase("token-metadata-cache")}async get(e){return Object.assign(new me,await this.db.get(e))}async put(e){await this.db.put(e)}};be=ge([(0,s.b)(),ve("design:paramtypes",[y])],be);var ye=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},we=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Se{_id;_rev;result;stale;lastUpdated;dateCreated}ye([(0,d.a)(),we("design:type",String)],Se.prototype,"_id",void 0),ye([(0,d.a)(),we("design:type",String)],Se.prototype,"_rev",void 0),ye([(0,d.a)(),we("design:type",Object)],Se.prototype,"result",void 0),ye([(0,d.a)(),we("design:type",Boolean)],Se.prototype,"stale",void 0),ye([(0,d.a)(),we("design:type",String)],Se.prototype,"lastUpdated",void 0),ye([(0,d.a)(),we("design:type",String)],Se.prototype,"dateCreated",void 0);var $e=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ke=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ie=class{databaseService;db;constructor(e){this.databaseService=e}async load(){this.db=await this.databaseService.getDatabase("query-cache")}async get(e){return Object.assign(new Se,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}};Ie=$e([(0,s.b)(),ke("design:paramtypes",[y])],Ie);var Re=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},xe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class _e{_id;_rev;channelId;traitType;value;count;lastUpdated;dateCreated}Re([(0,d.a)(),xe("design:type",String)],_e.prototype,"_id",void 0),Re([(0,d.a)(),xe("design:type",String)],_e.prototype,"_rev",void 0),Re([(0,d.a)(),xe("design:type",String)],_e.prototype,"channelId",void 0),Re([(0,d.a)(),xe("design:type",String)],_e.prototype,"traitType",void 0),Re([(0,d.a)(),xe("design:type",String)],_e.prototype,"value",void 0),Re([(0,d.a)(),xe("design:type",Number)],_e.prototype,"count",void 0),Re([(0,d.a)(),xe("design:type",String)],_e.prototype,"lastUpdated",void 0),Re([(0,d.a)(),xe("design:type",String)],_e.prototype,"dateCreated",void 0);var Pe=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ce=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let je=class{databaseService;db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-attribute-counts`)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-attribute-counts`)}async get(e){return Object.assign(new _e,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}};je=Pe([(0,s.b)(),Ce("design:paramtypes",[y])],je);var Te=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ae=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Fe{_id;_rev;content;cid;dateCreated}Te([(0,d.a)(),Ae("design:type",String)],Fe.prototype,"_id",void 0),Te([(0,d.a)(),Ae("design:type",String)],Fe.prototype,"_rev",void 0),Te([(0,d.a)(),Ae("design:type",String)],Fe.prototype,"content",void 0),Te([(0,p.rl)(),Ae("design:type",String)],Fe.prototype,"cid",void 0),Te([(0,d.a)(),Ae("design:type",String)],Fe.prototype,"dateCreated",void 0);var Oe=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ee=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let De=class{databaseService;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}})}}];db;constructor(e){this.databaseService=e}async load(e){this.db=await this.databaseService.getDatabase(`${e}-original-metadata`,this.changesets)}async loadEmpty(e){this.db=await this.databaseService.getEmptyDatabase(`${e}-original-metadata`)}async get(e){return Object.assign(new Fe,await this.db.get(e))}async put(e){await this.db.put(e)}async delete(e){await this.db.remove(e)}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}};De=Oe([(0,s.b)(),Ee("design:paramtypes",[y])],De);var Be=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Me=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ne=class{authorRepository;channelRepository;imageRepository;itemRepository;settingsRepository;animationRepository;themeRepository;staticPageRepository;tokenMetadataCacheRepository;queryCacheRepository;attributeCountRepository;originalMetadataRepository;databaseService;loadedChannelId;constructor(e,t,i,a,n,s,o,f,r,c,l,d,p){this.authorRepository=e,this.channelRepository=t,this.imageRepository=i,this.itemRepository=a,this.settingsRepository=n,this.animationRepository=s,this.themeRepository=o,this.staticPageRepository=f,this.tokenMetadataCacheRepository=r,this.queryCacheRepository=c,this.attributeCountRepository=l,this.originalMetadataRepository=d,this.databaseService=p}async load(){console.log("Loading databases"),await this.channelRepository.load(),await this.settingsRepository.load(),await this.tokenMetadataCacheRepository.load(),await this.queryCacheRepository.load()}async loadChannel(e){this.loadedChannelId!=e&&(console.time(`Loading channel: ${e}`),await this.authorRepository.load(e),await this.itemRepository.load(e),await this.animationRepository.load(e),await this.originalMetadataRepository.load(e),await this.imageRepository.load(e),await this.themeRepository.load(e),await this.staticPageRepository.load(e),await this.attributeCountRepository.load(e),this.loadedChannelId=e,console.timeEnd(`Loading channel: ${e}`))}async loadEmptyChannel(e){this.loadedChannelId!=e&&(console.time(`Loading empty channel: ${e}`),await this.authorRepository.loadEmpty(e),await this.itemRepository.loadEmpty(e),await this.animationRepository.loadEmpty(e),await this.originalMetadataRepository.loadEmpty(e),await this.imageRepository.loadEmpty(e),await this.themeRepository.loadEmpty(e),await this.staticPageRepository.loadEmpty(e),await this.attributeCountRepository.loadEmpty(e),this.loadedChannelId=e,console.timeEnd(`Loading empty channel: ${e}`))}async loadChannelBackup(e){console.time("Loading channel from backup"),await this.loadEmptyChannel(e.channel._id),console.log(`Loading:\n            Items: ${e.items?e.items.length:0}\n            Themes: ${e.themes?e.themes.length:0}\n            Static Pages: ${e.staticPages?e.staticPages.length:0}\n            Attribute Counts: ${e.attributeCounts?e.attributeCounts.length:0}\n            Authors: ${e.authors?e.authors.length:0}\n\n        `);const t=e=>{e.map((e=>{delete e._rev,delete e._rev_tree}))};t(e.items),t(e.themes),t(e.staticPages),t(e.attributeCounts),t(e.authors),await this.itemRepository.db.bulkDocs(e.items),await this.themeRepository.db.bulkDocs(e.themes),await this.staticPageRepository.db.bulkDocs(e.staticPages),await this.attributeCountRepository.db.bulkDocs(e.attributeCounts),await this.authorRepository.db.bulkDocs(e.authors),await this.channelRepository.db.bulkDocs([e.channel]),console.timeEnd("Loading channel from backup")}async backupChannel(){let e=await this.channelRepository.get(this.loadedChannelId),t=await this.itemRepository.db.allDocs({include_docs:!0}),i=await this.animationRepository.db.allDocs({include_docs:!0}),a=await this.imageRepository.db.allDocs({include_docs:!0}),n=await this.themeRepository.db.allDocs({include_docs:!0}),s=await this.staticPageRepository.db.allDocs({include_docs:!0}),o=await this.attributeCountRepository.db.allDocs({include_docs:!0}),f=await this.authorRepository.db.allDocs({include_docs:!0});return{channel:e,items:t.rows.map((e=>e.doc)),animations:i.rows.map((e=>e.doc)),images:a.rows.map((e=>e.doc)),themes:n.rows.map((e=>e.doc)),staticPages:s.rows.map((e=>e.doc)),attributeCounts:o.rows.map((e=>e.doc)),authors:f.rows.map((e=>e.doc))}}async dropChannel(e){console.log(`Dropping channel: ${e}`);let t=async e=>{let t=[],i=await e.allDocs();for(let e of i.rows)e.id.startsWith("_design")||e.id.startsWith("_local")||t.push({_id:e.id,_rev:e.value.rev,_deleted:!0});const a=await e.info();await e.bulkDocs(t),await e.compact(),delete this.databaseService.dbCache[a.db_name]};await t(this.authorRepository.db),await t(this.itemRepository.db),await t(this.animationRepository.db),await t(this.originalMetadataRepository.db),await t(this.imageRepository.db),await t(this.themeRepository.db),await t(this.staticPageRepository.db),await t(this.attributeCountRepository.db)}};function Le(e,{$on:t,$f7:i,$update:a}){let s=n.getInstance("version");const o=document.getElementById("footer-template")?.content?.cloneNode(!0);let f;if(o){const e=new XMLSerializer;f=e.serializeToString(o)}return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="toolbar toolbar-bottom">

    <div class="toolbar-inner" style="display: block; padding: 10px;">

      
      ${f?t`
        
        <div innerHTML='${f}'></div>
      
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


`}}Ne=Be([(0,s.b)(),Me("design:paramtypes",[P,E,W,ee,U,$,pe,oe,be,Ie,je,De,y])],Ne),Le.id="b9695ac145",Le.style="\n\n\n";const Ue=Le;function He(e,{$on:t,$f7ready:i,$f7:a,$f7router:s,$update:o}){return i((async()=>{let e,t,i=window.location.pathname,s=window.location.hash?.length>2?window.location.hash.substring(2):void 0,f=n.getInstance(l),r=n.getWalletService(),c=n.getInstance(Ne);const d=async e=>{t=void 0,r.provider||await r.initProvider(),t=await r.getAddress(),t&&(r.address=t,r.wallet||await r.connect()),await o()};document.addEventListener("connect-wallet",(async e=>{await(async e=>{await r.initWallet(),await r.connect(),await d()})()})),await async function(){f.showSpinner("Loading..."),await c.load(),await d(),e=a.views.create(".view-main",{url:s||"/",browserHistory:!0,browserHistoryRoot:i,reloadCurrent:!0}),f.hideSpinner()}()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`
  <div id="app">


    <!-- Status bar overlay for fullscreen mode-->
    <div class="statusbar"></div>

    <div class="view view-main" >

      <${Ue} />

    </div>



  </div>

`}}He.id="56c02e444b";const ze=He;var qe=i(98303),Ge=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Je=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},We=function(e,t){return function(i,a){t(i,a,e)}};let Ze=class{app;constructor(e){this.app=e}async queuePromiseView(e){const t=this;let i={id:Ve.newGuid(),icon:e.icon,title:e.title};return async function(){return new Promise(((e,a)=>{t._beforeSaveAction(i),e()}))}().then((async function(){let a=await e.promise;try{t._showSuccess(a,i)}catch(e){t._showError(e,i)}return a}))}_beforeSaveAction(e){e.toast=this.app.toast.create({text:e.title,closeButton:!1}),e.toast.open()}_showError(e,t){t.toast.close(),console.log(e);let i={text:e.message,closeButton:!0,closeButtonText:"Close",closeTimeout:5e3};this.app.toast.create(i).open()}_showSuccess(e,t){t.toast.close();this.app.toast.create({text:"Transaction Submitted",closeButton:!0,closeTimeout:5e3}).open()}};Ze=Ge([(0,s.b)(),We(0,(0,o.f)("framework7")),Je("design:paramtypes",[Object])],Ze);class Ve{static newGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}}var Ye=i(88554),Ke=i(99810),Qe=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Xe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let et=class{constructor(){}async translateContent(e,t=!1){if(!e?.ops)return"";const i=new Ye.bc(e.ops,{encodeHtml:!1});return i.renderCustomWith(tt(t)),i.convert()}async translateContentEncodeHtml(e,t=!1){if(!e?.ops)return"";const i=new Ye.bc(e.ops,{});return i.renderCustomWith(tt(t)),i.convert()}async generateMarkdown(e){return(0,Ke.deltaToMarkdown)(e.ops)}};et=Qe([(0,s.b)(),Xe("design:paramtypes",[])],et);const tt=e=>function(t,i){if("divider"===t.insert.type)return"<hr />";if("ipfsimage"===t.insert.type){let i="<img ";return e||(i+=`src="${t.insert.value.src}" `),t.insert.value.width&&(i+=`width="${t.insert.value.width}" `),t.insert.value.height&&(i+=`height="${t.insert.value.height}" `),t.insert.value.style&&(i+=`style="${t.insert.value.style}"`),i+="/>",i}};var it=i(76095),at=i.n(it),nt=i(57883),st=i(3721),ot=(i(92194),i(30496)),ft=i.n(ot),rt=i(42555),ct=i.n(rt),lt=i(86492),dt=i.n(lt);class pt extends Error{errors;constructor(e){super(),this.errors=e}}var ut=i(57393),ht=i(60725),mt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},gt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let vt=class{constructor(){}async fromText(e,t,i,a){let n="140px",s="160px";return e&&(t=`<span class='svg-title'>${e}</span><br /><br /><span class='svg-text'>${t}</span>`),t.length>50&&t.length<=100&&(n="110px",s="130px"),t.length>100&&t.length<=175&&(n="90px",s="110px"),t.length>175&&(n="75px",s="95px"),`<svg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg' version='1.1'>\n            <style>\n                * {\n                    --lh: ${s};\n                    height:100%;\n                    margin: 0;\n                    padding: 0;\n                    box-sizing: border-box;\n                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n                }\n\n\n                @keyframes gradient {\n                    0% {\n                        background-position: 0% 50%;\n                    }\n                    25% {\n                        background-position: 50%% 50%;\n                    }\n                    50% {\n                        background-position: 100% 50%;\n                    }\n                    75% {\n                        background-position: 50% 50%;\n                    }\n                    100% {\n                        background-position: 0% 50%;\n                    }\n                }\n\n\n                .svg-h1 {\n\n                    border: 25px solid rgb(78,130,177);\n                    \n                    background: rgb(241,241,241);\n                    background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);\n                    background-size: 400% 400%;\n                    animation: gradient 15s ease infinite;\n\n                    text-align: center;\n                    font-size: ${n};\n                    padding: 70px;            \n                    line-height: var(--lh);\n                    height: 1200px;\n                    width: 1200px;  \n                    -webkit-mask-image: linear-gradient(180deg, rgb(0,0,0) 60%, transparent);        \n                }\n\n                .svg-title {\n                    font-weight: 700;\n                    font-size: 1.25em;\n                }\n\n                .svg-text {\n                    width: 100%;\n                    font-weight: 500;\n                }\n\n                ${a||""}\n\n                ${i||""}\n\n            </style>\n            <g>\n                <foreignObject x='0' y='0' width='1200' height='1200'>\n                    <h1 class="svg-h1" xmlns='http://www.w3.org/1999/xhtml'>${t}</h1>\n                </foreignObject>\n            </g>\n        </svg>`}};vt=mt([(0,s.b)(),gt("design:paramtypes",[])],vt);var bt=i(28721),yt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},wt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},St=function(e,t){return function(i,a){t(i,a,e)}};let $t=class{themeRepository;walletService;db;constructor(e,t){this.themeRepository=e,this.walletService=t}async get(e){return this.themeRepository.get(e)}async getIds(){return this.themeRepository.getIds()}async getLatestRevision(e){return this.themeRepository.getLatestRevision(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=(0,bt.Z)(),e.dateCreated=(new Date).toJSON());let t=await(0,ut.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new pt(t);await this.themeRepository.put(e)}async delete(e){return this.themeRepository.delete(e)}async listByChannel(e,t,i){return this.themeRepository.listByChannel(e,t,i)}};$t=yt([(0,s.b)(),St(1,(0,o.f)(a.WalletService)),wt("design:paramtypes",[pe,Object])],$t);var kt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},It=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Rt=class{imageRepository;svgService;quillService;themeService;db;constructor(e,t,i,a){this.imageRepository=e,this.svgService=t,this.quillService=i,this.themeService=a}async load(e){this.db=await this.imageRepository.load(e)}async get(e){return this.imageRepository.get(e)}async put(e){e._id||(e._id=e.cid,e.dateCreated=(new Date).toJSON());let t=await(0,ut.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new pt(t);await this.imageRepository.put(e)}async delete(e){await this.imageRepository.delete(e)}async newFromBuffer(e){const t=new q;return t.buffer=e,t.cid=await ht.of(e),t.generated=!1,t}async newFromSvg(e){const t=new q;return t.svg=e,t.cid=await ht.of(t.svg),t.generated=!0,t}async getUrl(e){if(!e.buffer&&!e.svg)return"";if(e.buffer){let t=this.bufferToBlob(e.buffer);return this.blobToDataURL(t)}return e.svg?this.getSVGURL(e):void 0}async getSVGURL(e){return e.svg?this.svgToDataURL(e.svg):""}bufferToBlob(e){if(null!=Blob)return new Blob([e],{type:"image/jpg"})}blobToDataURL(e){let t;return new Promise(((i,a)=>{const n=new FileReader;n.onload=async function(){t=n.result,i(t)},n.readAsDataURL(e)}))}svgToDataURL(e){return ct()(e)}async newFromItem(e){let t=await this.quillService.translateContentEncodeHtml(e.content),i=[];if(e.themes)for(let t of e.themes)i.push(await this.themeService.get(t));let a="";if(i?.length>0)for(let e of i?.map((e=>e?.coverImageCSS)))e?.length>0&&(a+=e);let n=this.getExcerptByFirstParagraph(t,{pruneLength:500});if(!n||0==n.length)throw new Error("No text");const s=new q;return s.svg=await this.svgService.fromText(e.title,n,e.coverImageCSS,a),s.cid=await ht.of(s.svg),s.generated=!0,s}getExcerptByFirstParagraph(e,t){e=dt().unescape(e);const i="number"==typeof t.pruneLength?t.pruneLength:140;return i>0&&(e=ft()(e,i,{ellipsis:""})),e=dt().encode(e,{allowUnsafeSymbols:!0})}async getByIds(e){return this.imageRepository.getByIds(e)}async getImageContent(e){let t;return e.buffer?t=t instanceof Uint8Array?e.buffer:new Uint8Array(e.buffer.data):e.svg&&(t=e.svg),t}async loadImage(e,t){return new Promise((function(i,a){e.onload=function(){i()},e.src=URL.createObjectURL(new Blob([t],{type:"image/jpg"}))}))}async phlipImage(e){const t=document.createElement("canvas");t.width=e.naturalWidth,t.height=e.naturalHeight;const i=t.getContext("2d");i.scale(-1,1),i.drawImage(e,-t.width,0);const a=i.getImageData(0,0,t.width,t.height),n=new Uint8Array(a.data.length);for(let e=0;e<a.data.length;e++)n[e]=a.data[e];return n}};Rt=kt([(0,s.b)(),It("design:paramtypes",[W,vt,et,$t])],Rt);var xt=i(37086),_t=i(53440),Pt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ct=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let jt=class{settingsRepository;constructor(e){this.settingsRepository=e}async get(){let e;try{e=await this.settingsRepository.get()}catch(e){}return e||{_id:"single",defaultGitProvider:"github",gitProviders:{gitlab:{name:"gitlab"},github:{name:"github"}}}}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id="single",e.dateCreated=(new Date).toJSON());let t=await(0,ut.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new pt(t);await this.settingsRepository.put(e)}};jt=Pt([(0,s.b)(),Ct("design:paramtypes",[U])],jt);var Tt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},At=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ft=class{settingsService;inference;constructor(e){this.settingsService=e}async init(){let e=await this.settingsService.get();e.huggingFace&&(this.inference=new _t.LF(e.huggingFace))}async generateImage(e,t,i){let a={inputs:t,parameters:{width:1200,height:1200},model:e};return i&&(a.parameters.negative_prompt=i),this.inference.textToImage(a)}};Ft=Tt([(0,s.b)(),At("design:paramtypes",[jt])],Ft);var Ot=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Et=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Dt=class{imageService;huggingFaceService;uiService;activeEditor;initialized=!1;constructor(e,t,i){this.imageService=e,this.huggingFaceService=t,this.uiService=i}init(){if(this.initialized)return;at().register("modules/imageDropAndPaste",nt.Z),at().register("modules/blotFormatter",st.ZP),at().debug(!1);let e=at().import("blots/inline");class t extends e{static blotName;static tagName}t.blotName="bold",t.tagName="strong";class i extends e{static blotName;static tagName}i.blotName="italic",i.tagName="em";let a=at().import("blots/block");class n extends a{static blotName;static tagName}n.blotName="blockquote",n.tagName="blockquote";class s extends a{static blotName;static tagName;static formats(e){return s.tagName.indexOf(e.tagName)+1}}s.blotName="header",s.tagName=["H1","H2"];let o=at().import("blots/block/embed");class f extends o{static blotName;static tagName}f.blotName="divider",f.tagName="hr";class r extends o{static blotName;static tagName;static create(e){let t=super.create();return t.setAttribute("src",e.src),t.setAttribute("data-cid",e.cid),e.width&&t.setAttribute("width",e.width),e.height&&t.setAttribute("height",e.height),e.style&&t.setAttribute("style",e.style),t}static value(e){return{src:e.getAttribute("src"),cid:e.getAttribute("data-cid"),width:e.getAttribute("width"),height:e.getAttribute("height"),style:e.getAttribute("style")}}}r.blotName="ipfsimage",r.tagName="img",at().register(r),at().register(n),at().register(t),at().register(i),this.initialized=!0}buildQuillPostEditor(e,t){return this.init(),this.activeEditor=new(at())(e,{bounds:".page-content",modules:{imageDropAndPaste:{handler:(e,t,i)=>{this.imageDropAndPasteHandler(e,t,i)}},toolbar:t,blotFormatter:{specs:[Mt],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}},handlers:{link:e=>{if(e){var t=prompt("Enter the URL");this.quill.format("link",t)}else this.quill.format("link",!1)}},theme:"snow"}),this.activeEditor}async generateAIImage(e,t){this.uiService.showSpinner("Generating AI image. This may take a few minutes...");let i=await this.huggingFaceService.generateImage(e,t);await this.insertBlobInEditor(i,this.activeEditor),this.uiService.hideSpinner()}imageClick(){}async imageSelected(e){this.uiService.showSpinner("Processing image..."),this.insertImage(e.files[0]),this.uiService.hideSpinner()}async insertImage(e){let t=await this.insertImageInEditor(e,this.activeEditor);const i=new CustomEvent("image-selected",{detail:{_id:t._id}});document.dispatchEvent(i)}async insertImageInEditor(e,t){let i=await(0,xt.readAndCompressImage)(e,{maxWidth:1024});return this.insertBlobInEditor(i,t)}async insertBlobInEditor(e,t){let i=await e.arrayBuffer(),a=await this.imageService.newFromBuffer(new Uint8Array(i));try{await this.imageService.put(a)}catch(e){console.log(e)}let n=await this.imageService.getUrl(a),s=await this.getHeightAndWidthFromDataUrl(n),o=t.getSelection(!0);t.insertText(o.index,"\n",at().sources.USER);let f=(r=s.width,c=s.height,l=500/r,d=500/c,p=Math.min(l,d),{width:Math.floor(r*p),height:Math.floor(c*p)});var r,c,l,d,p;return t.insertEmbed(o.index,"ipfsimage",{cid:a.cid,src:n,height:f.height,width:f.width},at().sources.USER),t.setSelection(o.index+2,at().sources.SILENT),a}async imageDropAndPasteHandler(e,t,i){const a=i.toFile();await this.insertImage(a)}async getHeightAndWidthFromDataUrl(e){return new Promise((t=>{const i=new Image;i.onload=()=>{t({height:i.height,width:i.width})},i.src=e}))}};Dt=Ot([(0,s.b)(),Et("design:paramtypes",[Rt,Ft,l])],Dt);class Bt extends st.sL{keyUpListener;onCreate(){const e=this;this.keyUpListener=function(t){e.onKeyUp(t)},document.addEventListener("keyup",e.keyUpListener,!0),this.formatter.quill.root.addEventListener("input",e.keyUpListener,!0)}onDestroy(){document.removeEventListener("keyup",this.keyUpListener),this.formatter.quill.root.removeEventListener("input",this.keyUpListener)}onKeyUp(e){if(this.formatter.currentSpec&&(46===e.keyCode||8===e.keyCode)){const e=at().find(this.formatter.currentSpec.getTargetElement());e&&e.deleteAt(0),this.formatter.hide()}}}class Mt extends st.N6{getActions(){return[st.oi,st.Ce,Bt]}}var Nt=i(48764),Lt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ut=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ht=class{constructor(){}async uploadFile(e){let t;return new Promise(((i,a)=>{const n=new FileReader;n.onload=async function(){t=new Nt.Buffer(n.result),t&&i(t)},e.files.length>0?n.readAsArrayBuffer(e.files[0]):i(t)}))}};Ht=Lt([(0,s.b)(),Ut("design:paramtypes",[])],Ht);var zt=i(48737),qt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Gt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Jt=function(e,t){return function(i,a){t(i,a,e)}};let Wt=class{contracts;getProvider;$f7;wallet;address;ethersContracts={};provider;constructor(e,t,i){this.contracts=e,this.getProvider=t,this.$f7=i}async initProvider(){this.provider=this.getProvider(),globalThis.ethereum?.on("accountsChanged",(async e=>{delete this.address,e?.length>0&&await this.initWallet(),this.$f7.views.main.router.refreshPage()}))}async initWallet(){console.log("Init wallet"),delete this.address,this.provider||await this.initProvider();let e=await this.provider.send("eth_accounts",[]);if(e?.length>0)return this.connect();console.log("Init wallet complete")}async connect(){console.log("Connect wallet"),await this.provider.send("eth_requestAccounts",[]),this.wallet=await this.provider.getSigner(),this.address=await this.getAddress(),console.log(`Wallet ${this.address} connected`)}async getAddress(){if(!this.provider)return;let e=await this.provider.send("eth_accounts",[]);return e?.length>0?e[0]:void 0}async getWallet(){return this.provider.getSigner()}getContract(e){if(this.ethersContracts[e]&&this.ethersContracts[e].signer==this.wallet)return this.ethersContracts[e];let t=this.contracts[e];return this.ethersContracts[e]=new zt.CH(t.address,t.abi,this.wallet?this.wallet:this.provider),this.ethersContracts[e]}truncateEthAddress(e){const t=e.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);return t?`${t[1]}…${t[2]}`:e}};Wt=qt([(0,s.b)(),Jt(0,(0,o.f)("contracts")),Jt(1,(0,o.f)("provider")),Jt(2,(0,o.f)("framework7")),Gt("design:paramtypes",[Array,Function,Object])],Wt);var Zt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Vt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Yt=function(e,t){return function(i,a){t(i,a,e)}};let Kt=class{authorRepository;walletService;db;constructor(e,t){this.authorRepository=e,this.walletService=t}async load(e){this.db=await this.authorRepository.load(e)}async get(e){return this.authorRepository.get(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=e.walletAddress,e.dateCreated=(new Date).toJSON());let t=await(0,ut.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new pt(t);return this.authorRepository.put(e)}async insertIfNew(e){let t;try{t=await this.get(e)}catch(e){}t||await this.put(Object.assign(new R,{_id:e,walletAddress:e}))}getDisplayName(e){if(e)return e.name?e.name:this.walletService.truncateEthAddress(e._id)}async getLatestRevision(e){return this.authorRepository.getLatestRevision(e)}};Kt=Zt([(0,s.b)(),Yt(1,(0,o.f)(a.WalletService)),Vt("design:paramtypes",[P,Object])],Kt);var Qt=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Xt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ei=class{queryCacheRepository;constructor(e){this.queryCacheRepository=e}async put(e){e||((e=new Se).dateCreated=(new Date).toJSON()),e.lastUpdated=(new Date).toJSON(),await this.queryCacheRepository.put(e)}async get(e){return this.queryCacheRepository.get(e)}async delete(e){console.log(e),await this.queryCacheRepository.delete(e)}};ei=Qt([(0,s.b)(),Xt("design:paramtypes",[Ie])],ei);var ti=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ii=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ai=class{originalMetadataRepository;db;constructor(e){this.originalMetadataRepository=e}async get(e){return this.originalMetadataRepository.get(e)}async put(e){e._id||(e._id=e.cid,e.dateCreated=(new Date).toJSON());let t=await(0,ut.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new pt(t);await this.originalMetadataRepository.put(e)}async delete(e){await this.originalMetadataRepository.delete(e)}async getByIds(e){return this.originalMetadataRepository.getByIds(e)}async newFromText(e){const t=new Fe;return t.content=e,t.cid=await ht.of(t.content),t}};ai=ti([(0,s.b)(),ii("design:paramtypes",[De])],ai);var ni=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},si=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let oi=class{itemRepository;imageService;queryCacheService;originalMetadataService;constructor(e,t,i,a){this.itemRepository=e,this.imageService=t,this.queryCacheService=i,this.originalMetadataService=a}async get(e){return this.itemRepository.get(e)}async getIds(){return this.itemRepository.getIds()}async getLatestRevision(e){return this.itemRepository.getLatestRevision(e)}async getByTokenId(e,t){return this.itemRepository.getByTokenId(e,t)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=(0,bt.Z)(),e.dateCreated=(new Date).toJSON(),null==e.tokenId&&(e.tokenId=await this.getNextTokenId(e.channelId)));let t=await(0,ut.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new pt(t);await this.itemRepository.put(e)}async delete(e){await this.itemRepository.delete(e)}async getByImageId(e){return this.itemRepository.getByImageId(e)}async getByAnimationId(e){return this.itemRepository.getByAnimationId(e)}async listByChannel(e,t,i){return this.itemRepository.listByChannel(e,t,i)}async exportNFTMetadata(e,t,i,a,n){if("existing"==e.forkType){console.log(`Exporting original metadata for token #${t.tokenId}`);let e=await this.originalMetadataService.get(t.originalJSONMetadataId);return JSON.parse(e.content)}let s={tokenId:t.tokenId,name:t.title,description:t.description};if(t.animationId&&!t.coverImageAsAnimation){if(!a)throw new Error("Error exporting NFT metadata. Animation directory not found.");s.animation_url=`ipfs://${a}/${t.animationId}.html`}if(t.coverImageId){if(!n)throw new Error("Error exporting NFT metadata. Image directory not found.");s.image=`ipfs://${n}/${i.cid}.${i.buffer?"jpg":"svg"}`}return e.attributeOptions.length>0&&(s.attributes=e.attributeOptions.map((e=>{let i=t?.attributeSelections?.filter((t=>e.traitType==t.traitType));return{trait_type:e.traitType,value:i?.length>0?i[0].value:""}}))),s}async setDefaultCoverImage(e){let t=await this.imageService.newFromItem(e),i=await this.get(t.cid);i?e.coverImageId=i._id:(await this.imageService.put(t),e.coverImageId=t._id)}async getNextTokenId(e){let t;try{t=await this.queryCacheService.get(`token_id_stats_by_channel_${e}`);let i=t?.result;return i?.max?i.max+1:1}catch(e){}return 1}async getAttributeCountByChannel(e){return this.itemRepository.getAttributeCountByChannel(e)}async getAttributeInfoBySelections(e,t){return this.itemRepository.getAttributeInfoBySelections(e,t)}};oi=ni([(0,s.b)(),si("design:paramtypes",[ee,Rt,ei,ai])],oi);var fi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ri=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ci=class{attributeCountRepository;db;constructor(e){this.attributeCountRepository=e}async get(e){return this.attributeCountRepository.get(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=`${e.channelId}-${e.traitType}-${e.value}`,e.dateCreated=(new Date).toJSON());let t=await(0,ut.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new pt(t);await this.attributeCountRepository.put(e)}};ci=fi([(0,s.b)(),ri("design:paramtypes",[je])],ci);var li=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},di=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let pi=class{channelRepository;imageService;itemService;quillService;schemaService;queryCacheService;attributeCountService;constructor(e,t,i,a,n,s,o){this.channelRepository=e,this.imageService=t,this.itemService=i,this.quillService=a,this.schemaService=n,this.queryCacheService=s,this.attributeCountService=o}async get(e){return this.channelRepository.get(e)}async getLatestRevision(e){return this.channelRepository.getLatestRevision(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=(0,bt.Z)(),e.dateCreated=(new Date).toJSON()),e.description&&(e.descriptionHTML=await this.quillService.translateContent(e.description),e.descriptionMarkdown=await this.quillService.generateMarkdown(e.description)),e.license&&(e.licenseHTML=await this.quillService.translateContent(e.license),e.licenseMarkdown=await this.quillService.generateMarkdown(e.license));let t=await(0,ut.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new pt(t);return this.channelRepository.put(e)}async list(e,t){return this.channelRepository.list(e,t)}async delete(e){await this.schemaService.dropChannel(e._id),await this.channelRepository.delete(e)}async countItemsByChannel(e){let t;try{t=await this.queryCacheService.get(`token_id_stats_by_channel_${e}`)}catch(e){}let i=t?.result;return i?.count?i.count:0}async exportContractMetadata(e,t,i){let a={name:e.title,description:e.descriptionMarkdown,external_link:e.link,seller_fee_basis_points:0,fee_recipient:t,license:e.license};if(e.coverImageId){let t=await this.imageService.get(e.coverImageId);a.image=`ipfs://${i}/${t.cid}.${t.buffer?"jpg":"svg"}`}return a}async buildAttributeCounts(e){let t=await this.itemService.getAttributeCountByChannel(e);for(let i of t){let t,a=`${e}-${i.traitType}-${i.value}`;try{t=await this.attributeCountService.get(a)}catch(e){}t||(t=new _e),await this.attributeCountService.put(Object.assign(t,i))}}async getGitProviderCredentials(e,t){if(!e.gitProvider||"default"==e.gitProvider){if(t.defaultGitProvider)return t.gitProviders[t.defaultGitProvider];if(t.gitProviders&&t.gitProviders.github)return t.gitProviders.github}if(e.gitProvider)return t.gitProviders[e.gitProvider]}};pi=li([(0,s.b)(),di("design:paramtypes",[E,Rt,oi,et,Ne,ei,ci])],pi);var ui=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},hi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},mi=function(e,t){return function(i,a){t(i,a,e)}};let gi=class{ipfsRemoteInit;settingsService;peerCount=0;addresses;ipfs;initializing=!1;constructor(e){this.ipfsRemoteInit=e}async init(){if(this.ipfs||this.initializing)return;let e;this.initializing=!0;try{e=await this.settingsService.get()}catch(e){}e?.ipfsHost&&(console.log("Init IPFS"),this.ipfs=await this.ipfsRemoteInit(e?.ipfsHost),console.log("Init IPFS complete")),this.initializing=!1}async clearInit(){delete this.ipfs,this.initializing=!1}async updateInfo(){let e=await this.ipfs.id(),t=await this.ipfs.swarm.peers();this.peerCount=t.length,this.addresses=e?.addresses?.map((e=>e.toString()));const i=new CustomEvent("update-peers",{detail:{addresses:this.addresses,peers:t.map((e=>e.addr.toString())),count:this.peerCount}});document.dispatchEvent(i),console.log(`IPFS has ${this.peerCount} peers.`)}};ui([(0,o.f)(jt),hi("design:type",jt)],gi.prototype,"settingsService",void 0),gi=ui([(0,s.b)(),mi(0,(0,o.f)("ipfsRemoteInit")),hi("design:paramtypes",[Object])],gi);var vi=i(35717),bi=i(30381),yi=i.n(bi),wi=i(86094),Si=i.n(wi),$i=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ki=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const{forEach:Ii}=Array.prototype;let Ri=class{animationRepository;quillService;imageService;themeService;db;constructor(e,t,i,a){this.animationRepository=e,this.quillService=t,this.imageService=i,this.themeService=a}async get(e){return this.animationRepository.get(e)}async put(e){e._id||(e._id=e.cid,e.dateCreated=(new Date).toJSON());let t=await(0,ut.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new pt(t);await this.animationRepository.put(e)}async delete(e){await this.animationRepository.delete(e)}async newFromText(e){const t=new m;return t.content=e,t.cid=await ht.of(t.content),t}async buildAnimationPage(e){let t,i=await this.quillService.translateContent(e.content),a=[];if(e.themes)for(let t of e.themes)a.push(await this.themeService.get(t));let n="";if(a?.length>0)for(let e of a)e.animationCSS?.length>0&&(n+=e.animationCSS);if(e.coverImageAsAnimation){let i=await this.imageService.get(e.coverImageId),a=await this.imageService.getUrl(i);t=this.getFullImageTemplate(a,e.animationCSS,n)}else t=this.getAnimationTemplate(e,i,e.animationCSS,n);return Si()(t)}getFullImageTemplate(e,t,i){return`<!DOCTYPE html>\n    <html>\n      <head>\n        <style>\n        \n          body { \n            height: 100%; \n            width: 100%;\n            margin: 0;\n            padding: 0;\n\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            overflow: hidden\n          }\n\n          img {\n            flex-shrink: 0;\n            min-width: 100%;\n            width: 100%;\n            height: 100%;\n            min-height: 100%\n            object-fit: cover;\n          }\n\n          ${i||""}\n          ${t||""}\n\n        </style>\n      </head>\n\n      <body>\n        <img src="${e}" />\n      </body>\n    </html>`}getAnimationTemplate(e,t,i,a){return`<!DOCTYPE html>\n        <html>\n        \n          <head>\n              <meta charset="utf-8">\n              <title>${e.title}</title>\n\n              <style>\n\n                html {\n                    height:100%;\n                } \n\n                body {\n                      padding: 0;\n                      margin: 0;\n                      box-sizing: border-box;\n                      height: 100%;\n                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';\n                }\n\n                .animation-container {\n                  box-sizing: border-box;\n                  padding: 20px;\n                  width:100%;\n                  min-height: 100%;\n                  \n                  background: rgb(241,241,241);\n                  background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);\n\n                  font-size: 20px;\n                  border: 5px solid #4e82b1;\n                  float: left;\n                }\n\n                img { \n                  max-width: 100%;\n                  border: 1px solid #cccccc;\n                  object-fit: cover;\n                }\n\n                .token-id {\n                  color: rgb(79, 79, 79);\n                  font-weight: bold;\n                }\n\n                h4 { \n                  margin-top: 0px; \n                  font-size: 25px;\n                  margin-bottom: 0px;\n                }\n\n                ${a||""}\n                ${i||""}\n\n\n              </style>\n\n          </head>\n\n          <body>\n\n            <div class="animation-container">\n              <h4><b>${e.title?e.title:""} <span class="token-id">#${e.tokenId}</span></b></h4>\n              ${t}\n            </div>\n\n          </body>\n        </html>`}async getByIds(e){return this.animationRepository.getByIds(e)}};Ri=$i([(0,s.b)(),ki("design:paramtypes",[$,et,Rt,$t])],Ri);var xi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},_i=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Pi=class{staticPageRepository;quillService;db;constructor(e,t){this.staticPageRepository=e,this.quillService=t}async get(e){return this.staticPageRepository.get(e)}async getIds(){return this.staticPageRepository.getIds()}async getLatestRevision(e){return this.staticPageRepository.getLatestRevision(e)}async put(e){e._id?e.lastUpdated=(new Date).toJSON():(e._id=(0,bt.Z)(),e.dateCreated=(new Date).toJSON()),e.content&&(e.contentHTML=await this.quillService.translateContent(e.content),e.contentMarkdown=await this.quillService.generateMarkdown(e.content)),e.name&&(e.slug=this.slugify(e.name));let t=await(0,ut.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new pt(t);await this.staticPageRepository.put(e)}async delete(e){return this.staticPageRepository.delete(e)}async listByChannel(e,t,i){return this.staticPageRepository.listByChannel(e,t,i)}slugify(e){return e.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-")}};Pi=xi([(0,s.b)(),_i("design:paramtypes",[oe,et])],Pi);var Ci=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ji=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ti=class{itemService;authorService;themeService;imageService;animationService;staticPageService;constructor(e,t,i,a,n,s){this.itemService=e,this.authorService=t,this.themeService=i,this.imageService=a,this.animationService=n,this.staticPageService=s}async prepareExport(e,t){let i=await this.getExportChannel(e),a=await this.getExportAuthor(e.authorId),n=await this.itemService.getIds(),s=[],o=[];i.coverImageId?.length>0&&s.push(i.coverImageId),i.coverBannerId?.length>0&&s.push(i.coverBannerId),a?.coverPhotoId?.length>0&&s.push(a.coverPhotoId);for(let e of n){let t=await this.itemService.get(e);t.animationId&&!t.coverImageAsAnimation&&o.push(t.animationId),s.push(...this.getImageCidsByItem(t))}return s=[...new Set(s)],o=[...new Set(o)],{animationCids:o,imageCids:s,channel:i,author:a,itemIds:n,themeIds:await this.themeService.getIds(),staticPageIds:await this.staticPageService.getIds(),ownerAddress:t}}async createBackup(e){let t=e.author,i=this.getBackupChannel(e.channel,e.itemIds.length),a=[];return t&&a.push(t),{channels:[i],authors:a,items:await this.getBackupItems(e.itemIds),themes:await this.getBackupThemes(e.themeIds),staticPages:await this.getBackupStaticPages(e.staticPageIds),images:await this.getBackupImages(e.imageCids),animations:await this.getBackupAnimations(e.animationCids),itemCount:e.itemIds.length,themeCount:e.themeIds.length,staticPageCount:e.staticPageIds.length,imageCount:e.imageCids.length,animationCount:e.animationCids.length}}getImageCidsByItem(e){let t=[];if(e.coverImageId?.length>0&&t.push(e.coverImageId),e.content?.ops)for(let i of e.content.ops)i.insert&&i.insert.ipfsimage&&i.insert.ipfsimage?.cid?.length>0&&t.push(i.insert.ipfsimage.cid);return t}getImageCidsByStaticPage(e){let t=[];if(e.content?.ops)for(let i of e.content.ops)i.insert&&i.insert.ipfsimage&&i.insert.ipfsimage?.cid?.length>0&&t.push(i.insert.ipfsimage.cid);return t}async getExportChannel(e){let t=JSON.parse(JSON.stringify(e));return delete t.contractAddress,delete t.pinJobId,delete t.pinJobStatus,delete t.pubDate,delete t.publishReaderRepoId,delete t.publishReaderRepoPath,delete t.publishReaderRepoBranch,delete t.publishReaderRepoStatus,delete t.publishReaderIPFSStatus,delete t.productionHostname,delete t.productionBaseLibraryURI,delete t.productionBaseURI,delete t.showMintPage,delete t.showActivityPage,delete t.marketplaces,delete t.externalLinks,delete t.importSuccess,delete t.lastUpdated,delete t._rev,delete t._rev_tree,t}async getExportAuthor(e){let t;try{t=await this.authorService.get(e)}catch(e){}return t&&(t=JSON.parse(JSON.stringify(t)),delete t._rev,delete t.lastUpdated,delete t._rev_tree),t}prepareTheme(e){return delete e._rev,delete e._rev_tree,JSON.parse(JSON.stringify(e))}prepareStaticPage(e){return delete e._rev,delete e._rev_tree,JSON.parse(JSON.stringify(e))}prepareItem(e){return delete e._rev,delete e.lastUpdated,delete e._rev_tree,JSON.parse(JSON.stringify(e))}getBackupChannel(e,t){let i=JSON.parse(JSON.stringify(e));return"existing"==i.forkType&&(delete i.forkType,delete i.forkedFromCid,delete i.forkedFromFeeRecipient,delete i.forkedFromId),i.itemCount=t,i}async getBackupThemes(e){let t=[];for(let i of e)t.push(this.prepareTheme(await this.themeService.get(i)));return t}async getBackupStaticPages(e){let t=[];for(let i of e)t.push(this.prepareStaticPage(await this.staticPageService.get(i)));return t}async getBackupItems(e){let t=[],i=0;e=e.sort();for(let a of e){let n=this.prepareItem(await this.itemService.get(a));if(n.content?.ops?.length>0){let e=[];for(let t of n.content.ops)t.insert&&t.insert.ipfsimage&&delete t.insert.ipfsimage.src,e.push(t);n.content.ops=e}t.push(n),i++,console.log(`Processing token #${n.tokenId} ${i}/${e.length}`)}return console.log("Tokens processed"),t}async getBackupImages(e){let t=[],i=0;for(let a of e){let n=await this.imageService.get(a),s=JSON.parse(JSON.stringify(n));delete s._rev,delete s._rev_tree,delete s.buffer,delete s.svg,t.push(s),i++,console.log(`Processing image #${s._id} ${i}/${e.length}`)}return console.log("Images processed"),t}async getBackupAnimations(e){let t=[],i=0;for(let a of e){let n=await this.animationService.get(a),s=JSON.parse(JSON.stringify(n));delete s._rev,delete s._rev_tree,delete s.content,t.push(s),i++,console.log(`Processing image #${s._id} ${i}/${e.length}`)}return console.log("Animations processed"),t}};Ti=Ci([(0,s.b)(),ji("design:paramtypes",[oi,Kt,$t,Rt,Ri,Pi])],Ti);var Ai=i(3969),Fi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Oi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const Ei=new Ai.DOMParser;let Di=class{itemService;channelService;imageService;authorService;animationService;quillService;themeService;queryCacheService;exportService;ipfsService;attributeCountService;constructor(e,t,i,a,n,s,o,f,r,c,l){this.itemService=e,this.channelService=t,this.imageService=i,this.authorService=a,this.animationService=n,this.quillService=s,this.themeService=o,this.queryCacheService=f,this.exportService=r,this.ipfsService=c,this.attributeCountService=l}async get(e){let t=await this.itemService.get(e);const i=await this.channelService.get(t.channelId);let a=(await this.queryCacheService.get(`token_id_stats_by_channel_${t.channelId}`)).result;return this.getViewModel(t,i,a)}async getNavigation(e,t){let i=await this.itemService.getByTokenId(e,t);const a=await this.channelService.get(i.channelId);return this.getNavigationViewModel(i,a)}async getViewModel(e,t,i){let a,n,s,o,f,r=[],c=!t.contractAddress;if(e.coverImageId)try{let t=await this.imageService.get(e.coverImageId);n={cid:t.cid,url:await this.imageService.getUrl(t)}}catch(e){}if(e.animationId)try{let t=await this.animationService.get(e.animationId);a={cid:t.cid,content:dt().unescape(t.content)};let i=Ei.parseFromString(t.content,"text/html").getElementsByTagName("body")[0];o=dt().unescape((new Ai.B).serializeToString(i)),o="<div"+o.slice(5),o=o.substring(0,o.length-7)+"</div>"}catch(e){}if(t.authorId&&(f=await this.authorService.get(t.authorId),f.coverPhotoId)){let e=await this.imageService.get(f.coverPhotoId);s={cid:e.cid,url:await this.imageService.getUrl(e)}}if(t.attributeOptions.length>0){for(let i of t.attributeOptions){let t=e?.attributeSelections?.filter((e=>i?.traitType==e?.traitType));r.push({id:i.id,traitType:i.traitType,values:i.values,value:t?.length>0?t[0].value:""})}for(let e of r)try{let a=await this.attributeCountService.get(`${t._id}-${e.traitType}-${e.value}`);e.categoryPercent=a?new Intl.NumberFormat("default",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(a.count/i.count):""}catch(e){}}let l=i.max==e.tokenId,d=[];if(e.themes?.length>0)try{for(let t of e.themes)d.push(await this.themeService.get(t))}catch(e){}let p=await this.getImagesFromContent(e);return 0==p.filter((e=>e.cid==n?.cid)).length&&p.push(n),{item:e,themes:d,contentHTML:await this.quillService.translateContent(e.content),animationContentHTML:o,dateDisplay:yi()(e.dateCreated).format("MMM Do YYYY"),channel:t,coverImage:n,animation:a,author:f,authorPhoto:s,authorDisplayName:this.authorService.getDisplayName(f),images:p,attributeSelections:r,editable:c,canDelete:l}}async getNavigationViewModel(e,t){let i=(await this.queryCacheService.get(`token_id_stats_by_channel_${t._id}`)).result,a=await this.getViewModel(e,t,i);return a.item.tokenId<i.max&&(a.next=a.item.tokenId+1),a.item.tokenId>i.min&&(a.previous=a.item.tokenId-1),a}async getListViewModel(e,t){let i;if(e.coverImageId)try{let t=await this.imageService.get(e.coverImageId);i={cid:t.cid,url:await this.imageService.getUrl(t)}}catch(e){}return{item:e,channel:t,coverImage:i}}async listByChannel(e,t,i){let a=[],n=await this.itemService.listByChannel(e,t,i);const s=await this.channelService.get(e);for(let e of n)a.push(await this.getListViewModel(e,s));return a}async getImagesFromContent(e){if(!e.content)return[];let t=e.content.ops;const i=[];if(t?.length>0){for(let e of t)e.insert&&e.insert.ipfsimage&&i.push({cid:e.insert.ipfsimage.cid,url:e.insert.ipfsimage.src});try{let t=await this.imageService.newFromItem(e);i.push({cid:t.cid,url:await this.imageService.getSVGURL(t),svg:t.svg,generated:!0})}catch(e){}}return i}async getNewViewModel(e){let t=await this.channelService.get(e),i=[];for(let e of t.attributeOptions)i.push({id:e.id,traitType:e.traitType,values:e.values,value:"",categoryPercent:""});return{item:{attributeSelections:[]},channel:t,attributeSelections:i,editable:!0,canDelete:!0}}async saveGeneratedCoverImage(e){let t=await this.getImagesFromContent(e),i=t?.filter((t=>e.coverImageId?t.cid==e.coverImageId:1==t.generated)),a=Object.assign(new q,i[0]);if(1==a.generated){delete a.url;try{await this.imageService.put(a)}catch(e){}e.coverImageId=a._id}return a}async saveAnimation(e){let t=await this.animationService.buildAnimationPage(e),i=await this.animationService.newFromText(t);try{await this.animationService.put(i)}catch(e){}return e.animationId=i._id,i}async updateGeneratedCoverImage(e){if(!(await this.imageService.get(e.coverImageId)).generated)return;let t=await this.imageService.newFromItem(e);try{await this.imageService.put(t)}catch(e){}e.coverImageId=t._id}async put(e){if(e.item.imageIds=this.exportService.getImageCidsByItem(e.item),e.item._rev){let t=await this.itemService.get(e.item._id),i=this.exportService.getImageCidsByItem(t).filter((t=>!e.item.imageIds?.includes(t)));for(let t of i)await this.deletePublishedImageByChannel(e.channel,e.item,t);e.item.animationId!=t.animationId&&(console.log(`Removing ${t.animationId} from animations.`),await this.deletePublishedAnimationByChannel(e.channel,e.item,t.animationId))}if(await this.itemService.put(e.item),e.publish){for(let t of e.item.imageIds)try{await this.publishImage(e.channel,await this.imageService.get(t),!1)}catch(e){}try{await this.publishAnimation(e.channel,await this.animationService.get(e.item.animationId),!1)}catch(e){}}if(e.updateQueryCache){let t=await this.queryCacheService.get(`token_id_stats_by_channel_${e.item.channelId}`),i=t.result;e.item.tokenId<i.min&&(i.min=e.item.tokenId),e.item.tokenId>i.max&&(i.max=e.item.tokenId,i.count++),t.result=i,await this.queryCacheService.put(t);let a=await this.itemService.getAttributeInfoBySelections(e.item.channelId,e.item.attributeSelections);for(let t of a){let i,a=`${e.item.channelId}-${t.traitType}-${t.value}`;try{i=await this.attributeCountService.get(a)}catch(e){}i||(i=new _e,i.channelId=e.item.channelId,i.traitType=t.traitType,i.value=t.value),i.count=t.count,await this.attributeCountService.put(i)}}}async delete(e){let t=await this.channelService.get(e.channelId);await this.itemService.delete(e);let i=this.exportService.getImageCidsByItem(e);for(let a of i)await this.deletePublishedImageByChannel(t,e,a);await this.deletePublishedAnimationByChannel(t,e,e.animationId),await this.deleteJSONForItem(t,e);let a=await this.queryCacheService.get(`token_id_stats_by_channel_${e.channelId}`),n=a.result;e.tokenId==n.min?(n.min=0,n.max=0,n.count=0):(n.max=e.tokenId-1,n.count--),a.result=n,await this.queryCacheService.put(a)}async clone(e){let t=JSON.parse(JSON.stringify(e));delete t._id,delete t._rev,delete t._rev_tree,delete t.tokenId,t=Object.assign(new Y,t);let i=await this.channelService.get(e.channelId);await this.put({channel:i,item:t}),t.contentHTML=await this.quillService.translateContent(t.content,!0);let a=await this.saveGeneratedCoverImage(t);return e.coverImageGenerated=a.generated,await this.saveAnimation(t),await this.put({channel:i,item:t}),t}async publishImage(e,t,i=!0){if(!t)return;let a,n=`${`/export/${e._id}`}/images/${t.cid}.${t.buffer?"jpg":"svg"}`;try{a=await this.ipfsService.ipfs.files.stat(n,{hash:!0})}catch(e){}if(!a?.cid?.toString()){let e=await this.imageService.getImageContent(t);const a=await this.ipfsService.ipfs.add({content:e});await this.ipfsService.ipfs.files.cp(`/ipfs/${a.cid.toString()}`,n,{create:!0,parents:!0,flush:i})}}async deletePublishedImageByChannel(e,t,i){try{let a=await this.imageService.get(i),n=(await this.itemService.getByImageId(i)).filter((e=>e._id!=t._id));if(n?.length>0)return;await this.imageService.delete(a);let s=`${`/export/${e._id}`}/images/${a.cid}.${a.buffer?"jpg":"svg"}`;await this._safeDelete(s)}catch(e){}}async publishAnimation(e,t,i=!0){if(!t)return;let a,n=`${`/export/${e._id}`}/animations/${t.cid}.html`;try{a=await this.ipfsService.ipfs.files.stat(n,{hash:!0})}catch(e){}if(!a?.cid?.toString()){const e=await this.ipfsService.ipfs.add({content:t.content});await this.ipfsService.ipfs.files.cp(`/ipfs/${e.cid.toString()}`,n,{create:!0,parents:!0,flush:i})}}async deletePublishedAnimationByChannel(e,t,i){try{let a=await this.animationService.get(i),n=(await this.itemService.getByAnimationId(a._id)).filter((e=>e._id!=t._id));if(n?.length>0)return;await this.animationService.delete(a);let s=`${`/export/${e._id}`}/animations/${a.cid}.html`;await this._safeDelete(s)}catch(e){}}async deleteJSONForItem(e,t){let i=`${`/export/${e._id}`}/metadata/${t.tokenId}.json`;await this._safeDelete(i)}async _safeDelete(e){let t;try{t=await this.ipfsService.ipfs.files.stat(e,{hash:!0})}catch(e){}t?.cid?.toString()&&await this.ipfsService.ipfs.files.rm(e,{recursive:!0,flush:!0})}};Di=Fi([(0,s.b)(),Oi("design:paramtypes",[oi,pi,Rt,Kt,Ri,et,$t,ei,Ti,gi,ci])],Di);var Bi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Mi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ni=class{channelService;imageService;authorService;itemService;itemWebService;queryCacheService;schemaService;settingsService;constructor(e,t,i,a,n,s,o,f){this.channelService=e,this.imageService=t,this.authorService=i,this.itemService=a,this.itemWebService=n,this.queryCacheService=s,this.schemaService=o,this.settingsService=f}async get(e){return this.getViewModel(await this.channelService.get(e))}async getViewModel(e){let t,i,a,n,s=!e.contractAddress;if(await this.imageService.load(e._id),await this.authorService.load(e._id),e.coverImageId)try{let i=await this.imageService.get(e.coverImageId);t={cid:i.cid,url:await this.imageService.getUrl(i)}}catch(e){}if(e.coverBannerId)try{let t=await this.imageService.get(e.coverBannerId);i={cid:t.cid,url:await this.imageService.getUrl(t)}}catch(e){}if(e.authorId&&(n=await this.authorService.get(e.authorId),n.coverPhotoId))try{let e=await this.imageService.get(n.coverPhotoId);a={cid:e.cid,url:await this.imageService.getUrl(e)}}catch(e){}let o,f,r=await this.channelService.countItemsByChannel(e._id);try{o=await this.settingsService.get()}catch(e){}try{f=await this.channelService.getGitProviderCredentials(e,o)}catch(e){}return{channel:e,coverImage:t,coverBanner:i,author:n,authorDisplayName:this.authorService.getDisplayName(n),authorPhoto:a,itemCount:r,editable:s,dateCreated:yi()(e.dateCreated).format("MMM Do YYYY"),gitProvider:f}}async list(e,t){let i=[],a=await this.channelService.list(e,t);for(let e of a.filter((e=>!e.forkType||e.importSuccess)))i.push(await this.getViewModel(e));return i}async upgrade(e){let t=await this.itemService.listByChannel(e._id,1e5,0);for(let e of t){let t=await this.imageService.get(e.coverImageId);e.coverImageGenerated=t.generated;let i=Object.assign(new Y,e);await this.itemService.put(i),console.log(i)}}async regenerateItemMedia(e){let t=await this.itemService.listByChannel(e._id,1e5,0);for(let e of t){await this.itemWebService.updateGeneratedCoverImage(e),await this.itemWebService.saveAnimation(e);let t=Object.assign(new Y,e);await this.itemService.put(t)}}async put(e,t,i){let a,n=await this.channelService.put(e);if(e._rev=n.rev,await this.schemaService.loadChannel(e._id),t)try{await this.imageService.put(Object.assign(new q,t))}catch(e){}if(i)try{await this.imageService.put(Object.assign(new q,i))}catch(e){}try{a=await this.queryCacheService.get(`token_id_stats_by_channel_${e._id}`)}catch(e){}a||(a=new Se,a._id=`token_id_stats_by_channel_${e._id}`,a.result={min:0,max:0,count:0}),await this.queryCacheService.put(a)}};Ni=Bi([(0,s.b)(),Mi("design:paramtypes",[pi,Rt,Kt,oi,Di,ei,Ne,jt])],Ni);var Li=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ui=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Hi=class{imageService;authorService;constructor(e,t){this.imageService=e,this.authorService=t}async get(e){return this.getViewModel(await this.authorService.get(e))}async getViewModel(e){let t;if(e.coverPhotoId){let i=await this.imageService.get(e.coverPhotoId);t={cid:i.cid,url:await this.imageService.getUrl(i)}}return{author:e,authorPhoto:t,authorDisplayName:this.authorService.getDisplayName(e)}}};Hi=Li([(0,s.b)(),Ui("design:paramtypes",[Rt,Kt])],Hi);var zi,qi=i(52861),Gi=i(28490),Ji=i.n(Gi),Wi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Zi=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Vi=zi=class{settingsService;static BASE_URL="https://gitlab.com/api/v4";static READER_REPO_ID=15461980;constructor(e){this.settingsService=e}async createFork(e){console.log("Creating reader fork...");let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let i=`${zi.BASE_URL}/projects/${zi.READER_REPO_ID}/fork`,a=`${e.title}`.replace(/[^a-z0-9]/gi,"-").toLowerCase(),n=await this.getExistingFork(e);return n?{id:n.id,path:n.path,branch:"master"}:{id:(await qi.Z.post(i,{name:a,path:a},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data.id,path:a,branch:"master"}}async createVariables(e){let t=await this.settingsService.get(),i=t.gitProviders.gitlab;if(i.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");t.alchemyKey&&await this._createVariable(e,i,"ALCHEMY_API_KEY",t.alchemyKey)}async _createVariable(e,t,i,a){let n=await this._getVariables(e,t,i),s=`${zi.BASE_URL}/projects/${e.publishReaderRepoId}/variables`;return n?qi.Z.put(`${s}/${i}`,{key:i,value:a,masked:!0},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}}):qi.Z.post(s,{key:i,value:a,masked:!0},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}async _getVariables(e,t,i){let a=`${zi.BASE_URL}/projects/${e.publishReaderRepoId}/variables/${i}`;try{let e=await qi.Z.get(a,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}});return e?.data}catch(e){}}async getExistingFork(e){let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let i=`${zi.BASE_URL}/projects/${zi.READER_REPO_ID}/forks`,a=(await qi.Z.get(i,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data,n=`${e.title}`.replace(/[^a-z0-9]/gi,"-").toLowerCase(),s=a.filter((e=>e.path==n&&e.owner.username==t.username));if(1==s?.length)return{id:s[0].id,httpUrlToRepo:s[0].http_url_to_repo,path:s[0].path,branch:s[0].default_branch}}async getForkRepoStatus(e){let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");if(!e.publishReaderRepoId)return;let i=`${zi.BASE_URL}/projects/${e.publishReaderRepoId}`;return(await qi.Z.get(i,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data.import_status}async getIPFSActionStatus(e){let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");if(!e.publishReaderRepoId)return;let i=await this.getJobForCommit(e,t);return i?.length>0&&"success"==i[0].status?"finished":void 0}async getJobForCommit(e,t){let i=`${zi.BASE_URL}/projects/${e.publishReaderRepoId}/jobs`;const a=await qi.Z.get(i,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}});return a.data?.filter((t=>t.commit?.id==e.publishReaderIPFSStatus.headSha))}async getIPFSActionResult(e){let t=(await this.settingsService.get()).gitProviders.gitlab;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");try{let i=await this.getJobForCommit(e,t),a=`${zi.BASE_URL}/projects/${e.publishReaderRepoId}/jobs/${i[0].id}/artifacts/ipfs/ipfs.json`;let n=(await qi.Z.get(a,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;return n.archive=`https://gitlab.com/${t.username}/${e.publishReaderRepoPath}/-/jobs/${i[0].id}/artifacts/file/ipfs/${n.cid}.car`,n}catch(e){console.log(e)}}async commit(e,t,i){for(let e of t)e.encoding="base64",e.content=e.content.toString("base64");let a=0,n=this.chunkIt(t,500);for(const[s,o]of n.entries()){a+=o.length,this.logPublishProgress(`Commiting reader data for ${e.title} to GitLab: committing ${o.length} actions. ${a} / ${t.length}`);let f,r=`${zi.BASE_URL}/projects/${e.publishReaderRepoId}/repository/commits`;f=s===n.length-1?"Commiting reader data complete":`Commiting reader data for ${e.title}`;await qi.Z.post(r,{branch:"master",commit_message:f,actions:o},{headers:{Authorization:`Bearer ${i.personalAccessToken}`}})}let s=await this.getMostRecentCommit(e,i);return this.logPublishProgress(`Commit successful: ${s}`),s}async deleteReaderBackup(e,t){if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing files from repo...");let i,a=`${zi.BASE_URL}/projects/${e.publishReaderRepoId}/repository/tree?recursive=true&path=.upload&pagination=keyset`,n=[];do{let e=await qi.Z.get(a,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}}),s=e?.data?.reverse()?.filter((e=>e.name.indexOf(".")>0)).map((e=>({action:"delete",file_path:e.path})));n.push(...s),i=Ji()(e.headers.link),a=i?.next?.url}while(a);if(n?.length>0){this.logPublishProgress(`Deleting ${n.length} files from repo...`);let i=`${zi.BASE_URL}/projects/${e.publishReaderRepoId}/repository/commits`;await qi.Z.post(i,{branch:"master",commit_message:"Deleting .upload",actions:n},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}}async deleteContractBackup(e,t){if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing contract files from repo...");let i=[{action:"delete",file_path:"/backup/contract/contract.json"},{action:"delete",file_path:"/backup/contract/contract-abi.json"}];if(i?.length>0){this.logPublishProgress(`Deleting ${i.length} files from repo...`);let a=`${zi.BASE_URL}/projects/${e.publishReaderRepoId}/repository/commits`;await qi.Z.post(a,{branch:"master",commit_message:`Deleting existing contract files for ${e.title}`,actions:i},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}}async getMostRecentCommit(e,t){let i=`${zi.BASE_URL}/projects/${e.publishReaderRepoId}/repository/commits`;let a=(await qi.Z.get(i,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;if(a?.length>0)return a[0].id}logPublishProgress(e){if(console.log(e),"undefined"!=typeof window&&void 0!==window.document){const t=new CustomEvent("publish-progress",{detail:{message:e}});document.dispatchEvent(t)}}getBranchName(e){return e.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}chunkIt(e,t){let i=[];for(let a=0;a<e.length;a+=t){let n=e.slice(a,a+t);i.push(n)}return i}};Vi=zi=Wi([(0,s.b)(),Zi("design:paramtypes",[jt])],Vi);var Yi=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ki=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Qi=function(e,t){return function(i,a){t(i,a,e)}};let Xi=class{uiService;app;constructor(e,t){this.uiService=e,this.app=t}navigate(e,t,i="main"){console.log(`${i}: navigating to ${e.path}`),t||(t={reloadCurrent:!0,ignoreCache:!1,browserHistory:!0});let a=this.app.view[i];a?a.router.navigate(e,t):console.log(`Could not find view ${i}`)}navigateUrl(e,t,i="main"){console.log(`${i}: navigating to ${e}`);let a=this.app.view[i];a?a.router.navigate(e,t):console.log(`Could not find view ${i}`)}buildRoutesForContainer(e){let t=[];for(let i of globalThis.mappedRoutes){let a=e.get(i.controllerClass);t.push({path:i.path,async:async e=>{try{await this.resolveRoute(e.to,e.resolve,a[i.action](),i.showSpinner)}catch(e){this.uiService.showExceptionPopup(e)}}})}return t.push({path:"(.*)",async async(e){console.log(`404 error: ${e.to.path}`)}}),t}async resolveRoute(e,t,i,a=!0){a&&this.uiService.showSpinner("Loading...");let n=await i;if(!n)return;let s=await n.model,o=await s(e),f=Object.assign({},o);f.container=eo,n.view&&t({component:n.view},{props:f,history:!0,browserHistory:!0}),a&&this.uiService.hideSpinner()}};Xi=Yi([(0,s.b)(),Qi(1,(0,o.f)("framework7")),Ki("design:paramtypes",[l,Object])],Xi);class ea{model;view;constructor(e,t){this.model=e,this.view=t}}function ta(e,t){return function(i,a,n){globalThis.mappedRoutes||(globalThis.mappedRoutes=[]),globalThis.mappedRoutes.push({path:e,controllerClass:i.constructor,action:a,showSpinner:t})}}function ia(e,{$on:t,$f7:i,$update:a}){let s=n.getWalletService(),o=s.address,f=null!=s.provider,r=e.active,c=e.reader_config,l=e.breadcrumbs;const d=/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/,p=e=>{const t=e.match(d);return t?`${t[1]}…${t[2]}`:e},u=async e=>{document.dispatchEvent(new CustomEvent("connect-wallet"))};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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
              
              ${f?t`
                ${null!=o?t`
                      <a href="/admin/author/show/${o}" class="link ${"profile"==r?t`link-active`:t` `}">${p(o)}</a>
                    `:t`
                      <a class="link" href="#" @click=${u}>Connect Wallet</button>
                    `}
              `:t`<span />`}

              <a class="link ${"settings"==r?t`link-active`:t` `}" href="/admin/settings" >
                Settings
              </a> 

            </div>
    
          </div>


          ${l?t`
                  
            <div class="subnavbar">
              <div class="subnavbar-inner">
                
                <div class="breadcrumbs ">
  
                  ${l.map(((e,i)=>t`
                    <div class="breadcrumbs-item ${i==l.length-1?"breadcrumbs-item-active":""}">

                      ${e.path?t`
                        <a href="${e.path}" class="link" >
                          ${e.text}
                        </a>
                      `:t`${e.text}`}


                    </div>  

                    ${e.path&&i!=l.length-1?t`
                      <div class="breadcrumbs-separator"></div>
                    `:t` `}

                    
                  `))}

                </div>
        
              </div>
            </div>


            `:t`<span />`}

          <!-- ${c?.path?t`
              <a href="${c.path}" class="link external">
                <i class="icon icon-back"></i> ${c.title}
              </a>
          `:""} -->

        </div>
      </div>

`}}ia.id="a53321a352",ia.style="\n\n\n";const aa=ia;function na(e,{$:t,$h:i,$on:a,$f7:s,$update:o}){let f=n.getInstance(Ni),r=(n.getInstance(Rt),n.getInstance(l));e.footerText;let c,d,p,u,h,m=[],g=[{text:"Home"}];function v(){console.log("Unload infinite scroll"),s.infiniteScroll.destroy("#channel-index-infinite-scroll"),t(".infinite-scroll-preloader").hide()}async function b(){if(!u&&p){r.showSpinner("Loading..."),u=!0;try{m=await f.list(20,c),m&&20==m.length?c+=m.length:p=!1,0==d&&h.deleteAllItems(),h.appendItems(m)}catch(e){console.log(e)}p||v(),d++,u=!1,r.hideSpinner()}}a("pageAfterOut",((e,t)=>{v()})),a("pageInit",((e,i)=>{c=0,d=0,p=!0,u=!1,h=s.virtualList.create({el:"#channel-index-list",renderItem:e=>y(e),items:[],setListHeight:!1,emptyTemplate:'\n              <li class="item-content">\n                <div class="item-inner">\n                    There are no collections yet. <br /><br />Click the \'Create Collection\' button to create your first collection.\n                </div>\n              </li>\n            '}),t("#channel-index-infinite-scroll").trigger("infinite"),h.on("itemsAfterInsert",((e,i)=>{t(".empty").each((e=>{const i=t(e).data("id"),a=m.filter((e=>e.channel._id==i))[0];a.channel.descriptionHTML&&(e.innerHTML=a.channel.descriptionHTML);let n=e.getElementsByTagName("a");for(let e of n)e.classList.add("external");t(e).removeClass("empty")})),t("#channel-index-list ul").css("height","")}))}));const y=e=>`\n              <li>\n                <a href="/admin/channel/show/${e.channel._id}" class="item-link">\n                  <div class="item-content">\n                    <div class="item-media">\n                      ${e.coverImage?`\n                        <img src="${e.coverImage.url}" class="avatar" />\n                      `:'\n                        <i class="material-icons avatar">image</i>\n                      '}\n                    </div>\n                    <div class="item-inner">\n                      <div class="item-title-row">\n                        <div class="item-title">\n                          ${e.channel.title}                          \n                        </div>\n                        <div class="item-after"><span class="badge">${e.itemCount}</span></div>\n                      </div>\n\n                      ${e.authorDisplayName?`\n                        <div class="item-subtitle">\n                          By ${e?.authorDisplayName}\n                        </div>\n                      `:""}\n\n                      <div class="description item-text empty" data-id="${e.channel._id}"></div>\n                    \n                    </div>\n                  </div>\n                </a>\n              </li>\n          `;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-posts">

    <${aa} breadcrumbs=${g} />

    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/channel/create-menu">
        <i class="material-icons">create</i>
        <div class="fab-text">Create & Import</div>
      </a>
    </div>


    <div class="page-content infinite-scroll-content hide-toolbar-on-scroll" @infinite=${b} id="channel-index-infinite-scroll">

      <div class="fixed-width-content center">

        <div class="card card-outline card-header-divider welcome">
          <div class="card-header">Welcome and thank you for using Large!</div>
          <div class="card-content card-content-padding">
  
            <strong>All data</strong> is in local storage in your browser and we can NEVER retreive it for you if you lose it. We do not have it and this is by design.

  
            <p>Help make Large better by submitting bugs and feedback on <a href="https://github.com/LargeNFT/large-nft" class="external">GitHub</a>.</p>
  
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

`}}na.id="910e4cd790",na.style="\n\n\n";const sa=na,oa=["English","Abkhazian","Afar","Afrikaans","Akan","Albanian","Amharic","Arabic","Aragonese","Armenian","Assamese","Avaric","Avestan","Aymara","Azerbaijani","Bambara","Bashkir","Basque","Belarusian","Bengali","Bihari languages","Bislama","Bosnian","Breton","Bulgarian","Burmese","Catalan, Valencian","Central Khmer","Chamorro","Chechen","Chichewa, Chewa, Nyanja","Chinese","Church Slavonic, Old Bulgarian, Old Church Slavonic","Chuvash","Cornish","Corsican","Cree","Croatian","Czech","Danish","Divehi, Dhivehi, Maldivian","Dutch, Flemish","Dzongkha","Esperanto","Estonian","Ewe","Faroese","Fijian","Finnish","French","Fulah","Gaelic, Scottish Gaelic","Galician","Ganda","Georgian","German","Gikuyu, Kikuyu","Greek (Modern)","Greenlandic, Kalaallisut","Guarani","Gujarati","Haitian, Haitian Creole","Hausa","Hebrew","Herero","Hindi","Hiri Motu","Hungarian","Icelandic","Ido","Igbo","Indonesian","Interlingua (International Auxiliary Language Association)","Interlingue","Inuktitut","Inupiaq","Irish","Italian","Japanese","Javanese","Kannada","Kanuri","Kashmiri","Kazakh","Kinyarwanda","Komi","Kongo","Korean","Kwanyama, Kuanyama","Kurdish","Kyrgyz","Lao","Latin","Latvian","Letzeburgesch, Luxembourgish","Limburgish, Limburgan, Limburger","Lingala","Lithuanian","Luba-Katanga","Macedonian","Malagasy","Malay","Malayalam","Maltese","Manx","Maori","Marathi","Marshallese","Moldovan, Moldavian, Romanian","Mongolian","Nauru","Navajo, Navaho","Northern Ndebele","Ndonga","Nepali","Northern Sami","Norwegian","Norwegian Bokmål","Norwegian Nynorsk","Nuosu, Sichuan Yi","Occitan (post 1500)","Ojibwa","Oriya","Oromo","Ossetian, Ossetic","Pali","Panjabi, Punjabi","Pashto, Pushto","Persian","Polish","Portuguese","Quechua","Romansh","Rundi","Russian","Samoan","Sango","Sanskrit","Sardinian","Serbian","Shona","Sindhi","Sinhala, Sinhalese","Slovak","Slovenian","Somali","Sotho, Southern","South Ndebele","Spanish, Castilian","Sundanese","Swahili","Swati","Swedish","Tagalog","Tahitian","Tajik","Tamil","Tatar","Telugu","Thai","Tibetan","Tigrinya","Tonga (Tonga Islands)","Tsonga","Tswana","Turkish","Turkmen","Twi","Uighur, Uyghur","Ukrainian","Urdu","Uzbek","Venda","Vietnamese","Volap_k","Walloon","Welsh","Western Frisian","Wolof","Xhosa","Yiddish","Yoruba","Zhuang, Chuang","Zulu"];var fa=i(18634),ra=i.n(fa),ca=i(69380);function la(e,{$:t,$on:i,$f7:a,$update:s}){n.getWalletService(),n.getInstance(l),n.getInstance(pi);let o=n.getInstance(Ht),f=n.getInstance(Rt);const r=e=>{if(O=void 0,E=void 0,!e)return;let t=ca.vz(e,"ether");try{O=ca.bM(t),E=t.toString()}catch(e){console.log(e)}},c=e=>{D.channel.sellerFeeBasisPoints=void 0,D.channel.royaltyPercent=void 0,e&&(D.channel.royaltyPercent=e,D.channel.sellerFeeBasisPoints=parseInt(100*e))},d=async e=>{r(e.currentTarget.value),await s()},p=async e=>{c(e.currentTarget.value),await s()},u=async e=>{D.channel.contractAddress=e.currentTarget.value,await s()},h=async e=>{t("#cover-image-browse").click()},m=async e=>{let t=await o.uploadFile(document.getElementById("cover-image-browse")),i=await f.newFromBuffer(t);const a=new CustomEvent("cover-image-updated",{detail:{coverImage:i}});document.dispatchEvent(a),D.coverImage={cid:i.cid,url:await f.getUrl(i)},await s()},g=async e=>{t("#banner-browse").click()},v=async e=>{let t=await o.uploadFile(document.getElementById("banner-browse")),i=await f.newFromBuffer(t);const a=new CustomEvent("cover-banner-updated",{detail:{coverBanner:i}});document.dispatchEvent(a),D.coverBanner={cid:i.cid,url:await f.getUrl(i)},await s()},b=async e=>{D.channel.disableForks="true"==t(e.currentTarget).val(),U=!D.channel.disableForks,await s()},y=async e=>{D.channel.showMintPage="true"==t(e.currentTarget).val(),await s()},w=async e=>{D.channel.showActivityPage="true"==t(e.currentTarget).val(),await s()},S=async e=>{D.channel.gitProvider=t(e.currentTarget).val(),await s()},$=async function(e){e.preventDefault();let i=t(e.target).data("id"),n=H.find((e=>e.id==i));a.form.fillFromData("#save-attribute-form",n),await s(),a.popup.open(".edit-category-popup")},k=async e=>{e.preventDefault();let i=t(e.currentTarget).data("id");H=H.filter((e=>e.id!=i)),await s()},I=async e=>{let t={id:(0,bt.Z)(),traitType:"",values:[]};a.form.fillFromData("#save-attribute-form",t),await s(),a.popup.open(".edit-category-popup")},R=async e=>{e.preventDefault(),a.popup.close(".edit-category-popup")},x=async function(e){e.preventDefault();let i=t(e.target).data("id"),n=z.find((e=>e.id==i));a.form.fillFromData("#save-external-links-form",n),await s(),a.popup.open(".edit-external-links-popup")},_=async e=>{e.preventDefault();let i=t(e.currentTarget).data("id");console.log(i),z=z.filter((e=>e.id!=i)),await s()},P=async e=>{let t={id:(0,bt.Z)(),name:"",link:""};a.form.fillFromData("#save-external-links-form",t),await s(),a.popup.open(".edit-external-links-popup")},C=async e=>{e.preventDefault(),a.popup.close(".edit-external-links-popup")},j=async function(e){e.preventDefault();let i=t(e.target).data("id"),n=q.find((e=>e.id==i));a.form.fillFromData("#save-marketplaces-form",n),await s(),a.popup.open(".edit-marketplaces-popup")},T=async e=>{e.preventDefault();let i=t(e.currentTarget).data("id");q=q.filter((e=>e.id!=i)),await s()},A=async e=>{let t={id:(0,bt.Z)(),name:"",link:""};a.form.fillFromData("#save-marketplaces-form",t),await s(),a.popup.open(".edit-marketplaces-popup")},F=async e=>{e.preventDefault(),a.popup.close(".edit-marketplaces-popup")};t(document).on("popup:closed",".edit-category-popup",(async e=>{let t=a.form.convertToData("#save-attribute-form"),i={id:t.id,traitType:t.traitType,values:t.values?JSON.parse(t.values).map((e=>e.value)):[]};if(!i.traitType)return;let n=H.find((e=>e.id==i.id));n?Object.assign(n,i):H.push(i),await s()})),t(document).on("popup:open",".edit-category-popup",(async e=>{new(ra())(document.getElementById("options-input")),t('input[name="traitType"]').focus()})),t(document).on("popup:closed",".edit-external-links-popup",(async e=>{let t=a.form.convertToData("#save-external-links-form");if(t.name){let e={id:t.id,name:t.name,link:t.link},i=z.find((t=>t.id==e.id));i?Object.assign(i,e):z.push(e)}await s()})),t(document).on("popup:closed",".edit-marketplaces-popup",(async e=>{let t=a.form.convertToData("#save-marketplaces-form");if(t.name){let e={id:t.id,name:t.name,link:t.link},i=q.find((t=>t.id==e.id));i?Object.assign(i,e):q.push(e)}await s()}));let O,E,D=e.channel,B=e.description_toolbar,M=e.description_editor,N=e.license_toolbar,L=e.license_editor,U=!D.channel.disableForks,H=[],z=[],q=[];return D&&(r(D.channel.mintPrice),c(D.channel.royaltyPercent),D?.channel?.attributeOptions?.length>0&&(H=D.channel.attributeOptions),D.channel.externalLinks?.length>0&&(z=D.channel.externalLinks),D.channel.marketplaces?.length>0&&(q=D.channel.marketplaces)),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div>
        <input type="hidden" name="_id" value="${D?.channel?._id}" />
        <input type="hidden" name="_rev" value="${D?.channel?._rev}" />
        <input type="hidden" name="dateCreated" value="${D?.channel?.dateCreated}" />
        <input type="hidden" name="authorId" value="${D?.channel?.authorId}" />
        <input type="hidden" name="contractAddress" value="${D?.channel?.contractAddress}" />

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
                                            ${D.editable?t`
                                            <input type="text" name="title" placeholder="Collection title"
                                                value="${D?.channel?.title}" required minlength="3"
                                                tabindex="1" id="collection-title" />
                                            `:t`
                                            <input type="text" name="title" placeholder="Collection title"
                                                value="${D?.channel?.title}" required minlength="3"
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
    
                                            ${D.editable?t`
                                            <input type="text" name="symbol" placeholder="Symbol (eg BAYC)"
                                                value="${D?.channel?.symbol}" tabindex="2"
                                                required id="collection-symbol" />
                                            `:t`
                                            <input type="text" name="symbol" placeholder="Symbol (eg BAYC)"
                                                value="${D?.channel?.symbol}" tabindex="2" required
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
    
                                        <div id="${B}">
    
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
                                            id="${M}" tabindex="3"></div>
    
                                    </div>
                                </div>
                            </li>
    
                            <li class="item-content item-input">
                                <div class="item-inner">
                                    <div class="item-title item-label">Language</div>
                                    <!-- additional "input-dropdown-wrap" class -->
                                    <div class="item-input-wrap input-dropdown-wrap">
                                        <select name="language" tabindex="9">
                                            ${oa.map((e=>t`
                                            ${D?.channel?.language==e?t`
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

                        <form @submit="${R}" id="save-attribute-form">
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

                        <form @submit="${C}" id="save-external-links-form">

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

                                                ${D.coverImage?t`
                                                <img class="avatar-preview" src="${D?.coverImage.url}" />

                                                `:t`
                                                <i class="material-icons avatar-preview">image</i>
                                                `}

                                                <input type="button" class="button button-fill browse-file"
                                                    value="Browse" @click="${h}"
                                                    tabindex="4" />
                                                <input type="hidden" name="coverImageId"
                                                    value="${D?.coverImage?.cid}" />
                                                <input type="file" id="cover-image-browse" style="display: none"
                                                    @change="${m}" />

                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Collection Banner</div>
                                            <div class="item-input-wrap">

                                                ${D?.coverBanner?t`
                                                <img class="cover-banner-preview"
                                                    src="${D?.coverBanner.url}" />
                                                `:t`
                                                <i class="material-icons cover-banner-preview">image</i>
                                                `}

                                                <input type="button" class="button button-fill browse-file"
                                                    value="Browse" @click="${g}" tabindex="5" />
                                                <input type="hidden" name="coverBannerId"
                                                    value="${D?.coverBanner?.cid}" />

                                                <input type="file" id="banner-browse" style="display: none"
                                                    @change="${v}" />

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

                            ${H?.length>0?t`

                                <ul>
        
                                    ${H?.map((e=>t`
                                    <li>
                                        <span style="width: 100px; margin-right: 10px;">${e.traitType}</span>
        
                                        ${D.editable?t`
                                        <a class="link" href="#" data-id="${e.id}" @click="${$}">Edit</a> | <a
                                            class="link" href="#" data-id="${e.id}" @click="${k}">Delete</a>
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
        
                            ${D.editable?t`
                                <a class="button button-outline add-category-button" @click="${I}" tabindex="10">Add Attribute Type</a>
                            `:t` `}

                            
    
                            <input type="hidden" name="attributeOptions" value="${JSON.stringify(H)}" />
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

                                                ${D.editable?t`
                                                <input type="number" placeholder="Enter price for one piece (eg 0.08)"
                                                    @change="${d}" step="any" tabindex="11"
                                                    value="${D?.channel?.mintPrice}" />
                                                `:t`
                                                <input type="number" placeholder="Enter price for one piece (eg 0.08)"
                                                    @change="${d}" step="any" tabindex="11"
                                                    value="${D?.channel?.mintPrice}" disabled />
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
                                                (${E} wei) for
                                                each mint.</div>
                                        </div>
                                    </div>
                                </li>
                                `:t``}

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Marketplace Creator Fee %</div>
                                            <div class="item-input-wrap">

                                                ${D.editable?t`
                                                <input type="number" name="royaltyPercent" placeholder="Royalty %"
                                                    @change="${p}" step="any" tabindex="12"
                                                    value="${D?.channel?.royaltyPercent}" />
                                                `:t`
                                                <input type="number" name="royaltyPercent" placeholder="Royalty %"
                                                    @change="${p}" step="any" tabindex="12"
                                                    value="${D?.channel?.royaltyPercent}" disabled />
                                                `}

                                                <input type="hidden" name="sellerFeeBasisPoints"
                                                    value="${D?.channel?.sellerFeeBasisPoints}" />

                                            </div>
                                        </div>
                                    </div>
                                </li>


                                ${D?.channel?.royaltyPercent?t`
                                <li tabindex="-1">
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-text">
                                                You will receive a <strong>${D?.channel?.royaltyPercent}%</strong> for each sale on OpenSea, etc. Confirm this
                                                value when you set up your collection on the marketplace. This just presets it for you.
                                            </div>
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
                                                    @change="${u}" tabindex="13"
                                                    value="${D?.channel?.contractAddress}" />

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
                                            <select name="disableForks" @change="${b}">

                                                ${D.channel.disableForks?t`
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

                                ${D.channel.disableForks?t`<span />`:t`

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

                                            <div id="${N}">

                                                <!-- Add a bold button -->
                                                <button class="ql-bold"></button>
                                                <button class="ql-italic"></button>
                                                <button class="ql-strike"></button>
                                                <button class="ql-underline"></button>

                                            </div>

                                            <div class="editor bg-color-white text-color-black channel-editor"
                                                id="${L}" tabindex="13"></div>

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
                                            <select name="gitProvider" @change="${S}" tabindex="14">

                                                ${D.channel.gitProvider&&"default"!=D.channel.gitProvider?t`
                                                <option value="default">Default</option>
                                                `:t`
                                                <option value="default" selected>Default</option>
                                                `}

                                                ${"github"==D.channel.gitProvider?t`
                                                <option value="github" selected>GitHub</option>
                                                `:t`
                                                <option value="github">GitHub</option>
                                                `}


                                                ${"gitlab"==D.channel.gitProvider?t`
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
                                                <input type="text" name="productionHostname" placeholder="http://localhost" value="${D?.channel?.productionHostname}" tabindex="40" />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Production Base URI</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="productionBaseURI" placeholder="/" value="${D?.channel?.productionBaseURI}" tabindex="41" />
                                            </div>
                                        </div>
                                    </div>
                                </li>


                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Production Base Library URI</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="productionBaseLibraryURI" placeholder="/" value="${D?.channel?.productionBaseLibraryURI}" tabindex="42" />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Show Mint Page?</div>
                                            <div class="item-input-wrap">

                                                <select name="showMintPage" @change="${y}">

                                                    ${1==D.channel.showMintPage?t`
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

                                                <select name="showActivityPage" @change="${w}">

                                                    ${1==D.channel.showActivityPage?t`
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

                                                ${z?.length>0?t`

                                                    <ul style="padding-left: 0px;">
                            
                                                        ${z?.map((e=>t`
                                                        <li>
                                                            <span style="width: 100px; margin-right: 10px;">${e.name}</span>
                            
                                                            <a class="link" href="#" data-id="${e.id}" @click="${x}">Edit</a> | 
                                                            <a class="link" href="#" data-id="${e.id}" @click="${_}">Delete</a>
                                                        </li>
                                                        `))}
                            
                                                    </ul>

                        
                                                `:t`
                                                    No external links exist.
                                                `}
                            
                                                <a class="button button-outline " @click="${P}" tabindex="10">Add External Link</a>
                                                         
                                                <input type="hidden" name="externalLinks" value="${JSON.stringify(z)}" />
               
                                            </div>
                                        </div>
                                    </div>
                                </li>


                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Marketplaces</div>
                                            <div class="block">

                                                ${q?.length>0?t`

                                                    <ul style="padding-left: 0px;">
                            
                                                        ${q?.map((e=>t`
                                                        <li>
                                                            <span style="width: 100px; margin-right: 10px;">${e.name}</span>
                            
                                                            <a class="link" href="#" data-id="${e.id}" @click="${j}">Edit</a> | 
                                                            <a class="link" href="#" data-id="${e.id}" @click="${T}">Delete</a>
                                                        </li>
                                                        `))}
                            
                                                    </ul>

                        
                                                `:t`
                                                    No marketplaces exist.
                                                `}
                            
                                                <a class="button button-outline " @click="${A}" tabindex="10">Add Marketplace</a>

                    
                                                
                        
                                                <input type="hidden" name="marketplaces" value="${JSON.stringify(q)}" />
               


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


`}}la.id="45627c26ad",la.style="\n\n\n\n\n\n";const da=la;var pa=i(20637);function ua(e,{$:t,$on:i,$f7:a,$update:s}){n.getInstance(pi);let o,f,r=n.getInstance(Ni),c=n.getInstance(Kt),d=n.getInstance(Dt),p=(n.getInstance(l),n.getWalletService()),u=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Create Collection"}];pa.Z.configure({languages:["css"]});let h,m,g={channel:{mintPrice:"0.00",royaltyPercent:"0",authorId:p.address},themes:[],staticPages:[],editable:!0,disableForks:!1};const v=async e=>{if(e.preventDefault(),!document.getElementById("create-channel-form").reportValidity())return void document.getElementById("collection-title").scrollIntoView();let t=Object.assign(new A,a.form.convertToData("#create-channel-form"));t.description=d.activeEditor.getContents(),t.license=o.getContents(),t.sellerFeeBasisPoints=parseInt(t.sellerFeeBasisPoints),t.attributeOptions?t.attributeOptions=JSON.parse(t.attributeOptions):t.attributeOptions=[],t.externalLinks?t.externalLinks=JSON.parse(t.externalLinks):t.externalLinks=[],t.marketplaces?t.marketplaces=JSON.parse(t.marketplaces):t.marketplaces=[],t.disableForks="true"==t.disableForks,t.showMintPage="true"==t.showMintPage,t.showActivityPage="true"==t.showActivityPage;try{await r.put(t,h,m),t.authorId&&await c.insertIfNew(t.authorId);a.toast.show({text:"Collection saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate(`/admin/channel/show/${t._id}`)}catch(e){console.log(e),a.dialog.alert(e.errors,"There was an error")}};i("pageInit",(async(e,i)=>{t("#create-channel-form").attr("novalidate","novalidate"),await d.init(),d.buildQuillPostEditor("#create-channel-description-editor","#create-channel-description-toolbar"),o=new(at())("#create-channel-license-editor",{bounds:".page-content",modules:{toolbar:"#create-channel-license-toolbar"},theme:"snow"}),f=a.swiper.create(".swiper",{speed:1e3,allowTouchMove:!1,createElements:!0,longSwipes:!1,preventInteractionOnTransition:!0,shortSwipes:!1,simulateTouch:!1,on:{slideChange:function(e){0==e.activeIndex&&(document.getElementById("create-new-swiper").style.height="700px"),1==e.activeIndex&&(document.getElementById("create-new-swiper").style.height="2500px")}}})}));const b=async e=>{g.channel.disableForks=!0,await s(),f.slideNext(1e3)},y=async e=>{g.channel.disableForks=!1,await s(),f.slideNext(1e3)};return t(document).on("cover-image-updated",(async e=>{h=e.detail.coverImage})),t(document).on("cover-banner-updated",(async e=>{m=e.detail.coverBanner})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-create-channel">

    <${aa} breadcrumbs=${u} />

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
  
                      <button class="button color-red button-outline" @click="${b}">Disable forking</button>
                      
                    </div>
  
                    <div class="block copyleft-block">
  
                      <strong>Copyleft</strong>
  
                      <ul>
                        <li>Free as in speech.</li>
                        <li>Allow sharing, remixes, and derivatives.</li>
                        <li>Anyone can host the content.</li>
                        <li><a href="https://creativecommons.org/share-your-work/public-domain/cc0/"></a>CC0 Content</li>
                      </ul>
  
                      <button class="button button-fill" @click="${y}">Enable all features</button>
  
                    </div>
  
                  </div>
                  
                </div>

              </div>

              <div class="swiper-slide">

                <form id="create-channel-form" @submit="${v}" class="fixed-width-content center">
      
                  <div class="block-title block-title-medium">Create Collection</div>


                  <${da} 
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

`}}ua.id="6a240e52b7",ua.style="\n\n\n\n";const ha=ua;function ma(e,{$:t,$on:i,$f7:a,$update:s}){let o=n.getInstance(oi),f=e.channel,r=e.item,c=e.token_id?e.token_id:r.item.tokenId;const l=async e=>{e.preventDefault();const i=t(e.currentTarget).children(".goto-input").val();await o.getByTokenId(f,parseInt(i.toString()))?a.views.main.router.navigate(`/admin/channel/show/${f}/${parseInt(i.toString())}`):a.dialog.alert("Invalid Page")};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="card" >
      <form class="card-content card-content-padding" @submit="${l}">
        <input type="number" class="goto-input" style="width: 60px; border: 1px solid #cccccc; display: inline-block;" value="${c}" min="0"  />
        <span class="paging-label">Enter Token ID</span>
        <button class="goto-button button button-small button-fill">Go</button>
      </form>
    </div>

`}}ma.id="3b90214f2a",ma.style="    \n";const ga=ma;i(18515);function va(e,{$:t,$on:i,$f7:a,$update:s}){n.getInstance(pi),n.getWalletService();let o,f=globalThis.container.get(Di),r=e.channelViewModel,c=e.firstPageItems,l=[],d=0,p=!0,u=!1,h=r.itemCount;let m=r.editable,g=[{text:"Home",path:"/"},{text:r.channel.title}];const v=e=>{const t=b();o.params.cols=t>=1024?5:2,o.params.height=t>=1024?290:250,o?.update(),console.log("Resized...")},b=()=>Math.max(document.documentElement.clientWidth||0,window.innerWidth||0),y={el:"#item-list",createUl:!1,renderItem(e){return`<li class="flex-card">\n                  <a href="/admin/channel/show/${(t=e).channel._id}/${t.item.tokenId}" class="item-link">\n                      <div class="card" >\n                          <div class="card-content">\n                              <div class="square">\n                                  <img src="${t.coverImage?.url}"/>\n                              </div>\n                          </div>\n\n\n                          <div class="card-footer">\n                              ${t.item.title?t.item.title:`#${t.item.tokenId}`} \n                          </div>\n                      </div>\n                  </a>\n              </li>\n      `;var t},height:b()>=1024?290:250,items:l,cols:b()>=1024?5:2,emptyTemplate:'\n          <li class="item-content">\n              <div class="item-inner">\n                  No items in collection.\n              </div>\n          </li>\n          '};i("pageInit",(async(e,i)=>{if(l.push(...c),d=c.length,r?.coverBanner?.url?t(`.show-channel-banner-${r.channel._id}`).css("background-image",`url(${r.coverBanner.url})`):t(`.show-channel-banner-${r.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${r.channel._id}`)){let e=document.getElementById(`channel-show-description-${r.channel._id}`).getElementsByTagName("a");for(let t of e)t.classList.add("external")}t(".animation-container a").addClass("external"),window.addEventListener("resize",v),w()})),i("pageBeforeOut",(async()=>{window.removeEventListener("resize",v)}));const w=()=>{o=a.virtualList.create(y),o.items?.length<h?document.getElementById("item-list-infinite-scroll").addEventListener("infinite",S):t(".infinite-scroll-preloader").hide()};async function S(e){if(!u&&p){console.log("Infinite scrolling..."),u=!0;try{let e=await f.listByChannel(r.channel._id,ee.CHUNK_SIZE,d);d+=e.length,d>=h&&(p=!1),o.appendItems(e)}catch(e){console.log(e)}a.preloader.hide(),p||(console.log("Unload infinite scroll item list"),a.infiniteScroll.destroy("#item-list-infinite-scroll"),a.virtualList.destroy("#item-list"),o=void 0,t(".infinite-scroll-preloader").hide()),u=!1}}return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-show-collection">

    <${aa} breadcrumbs=${g} />


    ${m?t`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${r.channel._id}">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    `:t``}


    <div class="page-content infinite-scroll-content hide-toolbar-on-scroll" id="item-list-infinite-scroll">

      <div class="fixed-width-content center">

        <channel-card channel_view_model=${r}></channel-card>

        <div class="block">
          <p class="segmented">
            <a class="button button-outline button-active" href="#">Items</a>
            <a class="button button-outline" href="/admin/channel/themes/${r.channel._id}">Themes</a>
            <a class="button button-outline" href="/admin/channel/static-pages/${r.channel._id}">Static Pages</a>
          </p>
        </div>
  
        <${ga} channel=${r.channel._id} token_id="1" />
  
  
      
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

`}}va.id="dfc823c5aa",va.style="\n  \n\n";const ba=va;function ya(e,{$:t,$on:i,$f7:a,$update:n}){let s=e.theme,o=e.cover_image_css_editor_id,f=e.animation_css_editor_id;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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
                        <div class="editor bg-color-white text-color-black css-editor" id="${f}" tabindex="3" style="min-height: 100px;">.animation-container {}</div>
                    </div>
                </div>
            </li>

        </ul>
    </div>


`}}ya.id="71896c5de2",ya.style="\n    \n";const wa=ya;function Sa(e,{$:t,$on:i,$f7:a,$update:s}){let o,f,r,c=n.getInstance($t),d=(n.getInstance(l),e.channelViewModel),p=e.themes,u=d.editable,h=[{text:"Home",path:"/"},{text:d.channel.title,path:`/admin/channel/show/${d.channel._id}`},{text:"Themes"}];const m=async()=>{p=await c.listByChannel(d.channel._id,1e3,0)},g=function(e){f=new(at())("#add-theme-cover-image-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>hljs.highlightAuto(e).value},toolbar:!1}}),r=new(at())("#add-theme-animation-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>hljs.highlightAuto(e).value},toolbar:!1}})},v=async function(e){e.preventDefault();let t=Object.assign(new ce,a.form.convertToData("#add-theme-form"));t.coverImageCSS="\n"!=f.getText()?f.getText():void 0,t.animationCSS="\n"!=r.getText()?r.getText():void 0,t.channelId=d.channel._id,t._id=(0,bt.Z)(),t.dateCreated=(new Date).toJSON();try{await c.put(t),await m(),a.form.fillFromData("#add-theme-form",{name:""}),f.setText(""),r.setText(""),await s(),a.popup.close(".add-theme-popup")}catch(e){a.dialog.alert(e,"There was an error")}},b=async function(e){e.preventDefault();let t=Object.assign(new ce,a.form.convertToData("#edit-theme-form"));t.coverImageCSS="\n"!=f.getText()?f.getText():void 0,t.animationCSS="\n"!=r.getText()?r.getText():void 0,t.channelId=d.channel._id;try{await c.put(t),await m(),await s(),a.popup.close(".edit-theme-popup")}catch(e){console.log(e),a.dialog.alert(e.errors,"There was an error")}},y=async function(e){let i=t(e.target).data("id");a.dialog.confirm("Are you sure you want to delete this theme?",(async()=>{let e=await c.get(i);await c.delete(e),await m(),await s();a.toast.show({text:"Theme deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))},w=async function(e){let i=t(e.target).data("id");o=p.filter((e=>e._id==i))[0],f=new(at())("#edit-theme-cover-image-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>hljs.highlightAuto(e).value},toolbar:!1}}),r=new(at())("#edit-theme-animation-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>hljs.highlightAuto(e).value},toolbar:!1}}),a.form.fillFromData("#edit-theme-form",o),f.setText(o.coverImageCSS?o.coverImageCSS:""),r.setText(o.animationCSS?o.animationCSS:""),await s(),a.popup.open(".edit-theme-popup")};return i("pageInit",(async(e,i)=>{if(d?.coverBanner?.url?t(`.show-channel-banner-${d.channel._id}`).css("background-image",`url(${d.coverBanner.url})`):t(`.show-channel-banner-${d.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${d.channel._id}`)){let e=document.getElementById(`channel-show-description-${d.channel._id}`).getElementsByTagName("a");for(let t of e)t.classList.add("external")}await s(),t(".add-theme-popup").on("popup:open",g)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="channel-show-themes">

    <${aa} breadcrumbs=${h} />


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
                  <${wa} cover_image_css_editor_id="add-theme-cover-image-editor"
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
  
                  <${wa} cover_image_css_editor_id="edit-theme-cover-image-editor"
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

`}}Sa.id="f60ba2f5dd",Sa.style="\n\n\n";const $a=Sa;function ka(e,{$:t,$on:i,$f7:a,$update:n}){let s=e.static_page,o=[{name:"navbar",description:"Show link on navigation bar"},{name:"links",description:"Show in list of links on home page"},{name:"index",description:"Show content on home page"}];let f=e.static_page_content_editor_id,r=e.static_page_content_toolbar_id,c=e.image_button_input_id,l=e.image_button_id;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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

                        <div id="${r}">
                
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
    
                            <button class="text-editor-button" id="${l}"><i class="material-icons">image</i></button>
                            <label><input type="file" id="${c}" /></label>
                        </div>

                        <div class="editor bg-color-white text-color-black static-page-editor" id="${f}" tabindex="3"></div>
                    </div>
                </div>
            </li>

        </ul>
    </div>


`}}ka.id="0743308f23",ka.style="\n    \n";const Ia=ka;function Ra(e,{$:t,$on:i,$f7:a,$update:s}){let o,f,r=n.getInstance(Dt),c=n.getInstance(l),d=n.getInstance(Pi),p=e.channelViewModel,u=e.staticPages,h=p.editable,m=[{text:"Home",path:"/"},{text:p.channel.title,path:`/admin/channel/show/${p.channel._id}`},{text:"Static Pages"}];const g=async()=>{u=await d.listByChannel(p.channel._id,1e3,0)};let v=e=>{f=new(at())("#add-static-page-content-editor",{bounds:".page-content",theme:"snow",modules:{imageDropAndPaste:{handler:(e,t,i)=>{const a=i.toFile();r.insertImageInEditor(a,f)}},toolbar:"#add-static-page-content-toolbar",blotFormatter:{specs:[Mt],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}}})},b=async e=>{e.preventDefault();let t=Object.assign(new ae,a.form.convertToData("#add-static-page-form"));t.content=f.getContents(),t.channelId=p.channel._id,t._id=(0,bt.Z)(),t.dateCreated=(new Date).toJSON();try{await d.put(t),await g(),a.form.fillFromData("#add-static-page-form",{name:"",slug:"",locations:[]}),f.setText(""),await s(),a.popup.close(".add-static-page-popup")}catch(e){a.dialog.alert(e,"There was an error")}},y=async e=>{e.preventDefault();let t=Object.assign(new ae,a.form.convertToData("#edit-static-page-form"));t.content=f.getContents(),t.channelId=p.channel._id;try{await d.put(t),await g(),await s(),a.popup.close(".edit-static-page-popup")}catch(e){console.log(e),a.dialog.alert(e.errors,"There was an error")}},w=async e=>{let i=t(e.target).data("id");a.dialog.confirm("Are you sure you want to delete this static page?",(async()=>{let e=await d.get(i);await d.delete(e),await g(),await s();a.toast.show({text:"Static Page deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))},S=async function(e){let i=t(e.target).data("id");o=u.filter((e=>e._id==i))[0],f=new(at())("#edit-static-page-content-editor",{bounds:".page-content",theme:"snow",modules:{imageDropAndPaste:{handler:(e,t,i)=>{const a=i.toFile();r.insertImageInEditor(a,f)}},toolbar:"#edit-static-page-content-toolbar",blotFormatter:{specs:[Mt],align:{icons:{left:"<i class='material-icons'>align_horizontal_left</i>",center:"<i class='material-icons'>align_horizontal_center</i>",right:"<i class='material-icons'>align_horizontal_right</i>"},toolbar:{svgStyle:{fontSize:"21px"}}}}}}),a.form.fillFromData("#edit-static-page-form",o),f.setContents(o.content),await s(),a.popup.open(".edit-static-page-popup")},$=function(e){e.preventDefault();t("#add-static-page-image-button-input").click()},k=async function(e){e.preventDefault(),c.showSpinner("Processing image..."),await r.insertImageInEditor(this.files[0],f),c.hideSpinner()},I=function(e){e.preventDefault();t("#edit-static-page-image-button-input").click()},R=async function(e){e.preventDefault(),c.showSpinner("Processing image..."),await r.insertImageInEditor(this.files[0],f),c.hideSpinner()};return i("pageInit",(async(e,i)=>{if(t(document).off("click","#add-static-page-image-button"),t(document).off("change","#add-static-page-image-button-input"),t(document).off("click","#edit-static-page-image-button"),t(document).off("change","#edit-static-page-image-button-input"),await r.init(),p?.coverBanner?.url?t(`.show-channel-banner-${p.channel._id}`).css("background-image",`url(${p.coverBanner.url})`):t(`.show-channel-banner-${p.channel._id}`).css("background","linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)"),document.getElementById(`channel-show-description-${p.channel._id}`)){let e=document.getElementById(`channel-show-description-${p.channel._id}`).getElementsByTagName("a");for(let t of e)t.classList.add("external")}await s(),t(".add-static-page-popup").on("popup:open",v),t(document).on("click","#add-static-page-image-button",$),t(document).on("change","#add-static-page-image-button-input",k),t(document).on("click","#edit-static-page-image-button",I),t(document).on("change","#edit-static-page-image-button-input",R)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="channel-show-themes">

    <${aa} breadcrumbs=${m} />


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
                  <${Ia} static_page_content_editor_id="add-static-page-content-editor"
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
  
                  <${Ia} static_page_content_editor_id="edit-static-page-content-editor"
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

`}}Ra.id="dde86aead0",Ra.style="\n\n\n";const xa=Ra;function _a(e,{$:t,$on:i,$f7:a,$update:s}){n.getInstance(pi);let o,f,r,c=n.getInstance(Ni),d=(n.getInstance(Rt),n.getInstance($t),n.getInstance(Pi),n.getInstance(l),n.getInstance(Dt)),p=e.channelViewModel;pa.Z.configure({languages:["css"]});let u=[{text:"Home",path:"/"},{text:p.channel.title,path:`/admin/channel/show/${p.channel._id}`},{text:"Edit Collection"}];const h=async e=>{if(e.preventDefault(),!document.getElementById("edit-channel-form").reportValidity())return void document.getElementById("collection-title").scrollIntoView();let t=Object.assign(new A,p.channel),i=Object.assign(t,a.form.convertToData("#edit-channel-form"));i.description=d.activeEditor.getContents(),i.license=o.getContents(),i.sellerFeeBasisPoints=parseInt(i.sellerFeeBasisPoints),i.attributeOptions?i.attributeOptions=JSON.parse(i.attributeOptions):i.attributeOptions=[],i.externalLinks?i.externalLinks=JSON.parse(i.externalLinks):i.externalLinks=[],i.marketplaces?i.marketplaces=JSON.parse(i.marketplaces):i.marketplaces=[],i.disableForks="true"==i.disableForks,i.showMintPage="true"==i.showMintPage,i.showActivityPage="true"==i.showActivityPage;try{await c.put(i,f,r);a.toast.show({text:"Collection saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate(`/admin/channel/show/${i._id}`)}catch(e){a.dialog.alert(e.errors,"There was an error")}};return i("pageInit",(async(e,i)=>{t("#edit-channel-form").attr("novalidate","novalidate");new(ra())(document.getElementById("category"));if(d.buildQuillPostEditor("#edit-channel-description-editor","#edit-channel-description-toolbar"),p.channel.description&&d.activeEditor.setContents(p.channel.description),o=new(at())("#edit-channel-license-editor",{bounds:".page-content",modules:{toolbar:"#edit-channel-license-toolbar"},theme:"snow"}),p.channel.license&&o.setContents(p.channel.license),p.channel?.attributeOptions?.length>0)for(let e of p.channel?.attributeOptions)new(ra())(document.getElementById(`options-input-${e.id}`))})),t(document).on("cover-image-updated",(async e=>{f=e.detail.coverImage})),t(document).on("cover-banner-updated",(async e=>{r=e.detail.coverBanner})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-edit-channel">

    <${aa} breadcrumbs=${u} />

    <div class="page-content hide-toolbar-on-scroll">

      <form id="edit-channel-form" @submit="${h}" class="fixed-width-content center">

        <div class="block-title block-title-medium">Edit Collection</div>


        <${da} 
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

`}}_a.id="d3f62016d2",_a.style="\n";const Pa=_a;function Ca(e,{$:t,$on:i,$f7:a,$update:s}){let o,f=[{text:"Home",path:"/"},{text:"Create & Import"}];return i("pageInit",(async()=>{o=n.getWalletService(),await s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-create-menu">

    <${aa} breadcrumbs=${f} />

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

`}}Ca.id="1060245524",Ca.style="\n\n\n";const ja=Ca;var Ta=i(17833),Aa=i(33686),Fa=i(34805),Oa=i.n(Fa),Ea=i(41690),Da=i(32186),Ba=i(455),Ma=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Na=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},La=function(e,t){return function(i,a){t(i,a,e)}};let Ua=class{walletService;constructor(e){this.walletService=e}async getMintEventsForContract(e){let t=0,i=await this.walletService.provider.getBlockNumber();console.log("Fetching mint transfers...");let a=[],n={endBlock:i,events:[]};do{n=await this.getEvents(e,t,i),a.push(...n.events),console.log(`...fetched batch of ${n.events?.length} from ${t} to ${n.endBlock} of ${i}`),t=n.endBlock}while(n.endBlock<i);return console.log(`Found ${a.length} events`),a}async getEvents(e,t,i){let a=[],n=!0;for(;n;)try{a=await e.queryFilter([Da.id("Transfer(address,address,uint256)"),Ba.U3("0x0000000000000000000000000000000000000000",32)],t,i),n=!1}catch(e){let a=e?.error?.message,s=a.substring(a.indexOf("[")+1,a.indexOf("]"))?.split(",");s?.length>1?i=parseInt(s[1]):(i=t,n=!1)}return{events:a,endBlock:i}}async getTokensForContract(e){let t=(await this.getMintEventsForContract(e)).map((e=>Number(BigInt(e.topics[3])))).sort(((e,t)=>e-t));return new Set(t)}};Ua=Ma([(0,s.b)(),La(0,(0,o.f)(a.WalletService)),Na("design:paramtypes",[Object])],Ua);var Ha=i(14222),za=i(48764).Buffer,qa=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ga=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Ja=function(e,t){return function(i,a){t(i,a,e)}};const Wa=new(Oa());let Za=class{channelService;channelWebService;queryCacheService;schemaService;itemService;itemWebService;authorService;ipfsService;imageService;animationService;themeRepository;themeService;staticPageRepository;staticPageService;ercEventService;originalMetadataService;tokenMetadataCacheRepository;walletService;contracts;constructor(e,t,i,a,n,s,o,f,r,c,l,d,p,u,h,m,g,v,b){this.channelService=e,this.channelWebService=t,this.queryCacheService=i,this.schemaService=a,this.itemService=n,this.itemWebService=s,this.authorService=o,this.ipfsService=f,this.imageService=r,this.animationService=c,this.themeRepository=l,this.themeService=d,this.staticPageRepository=p,this.staticPageService=u,this.ercEventService=h,this.originalMetadataService=m,this.tokenMetadataCacheRepository=g,this.walletService=v,this.contracts=b}async importFromIPFS(e,t,i){let a={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}};this.logForkProgress(a,`Starting fork of ${e}. Fetching data...`);try{await this.ipfsService.ipfs.files.rm("/fork",{recursive:!0,flush:!0})}catch(e){}await this.ipfsService.ipfs.files.cp(`/ipfs/${e}`,"/fork",{create:!0,parents:!0,flush:!0}),this.logForkProgress(a,"Processing...");let n=await this._readFile("/fork/backup/authors.json"),s=await this._readFile("/fork/backup/channels.json"),o=await this._readFile("/fork/backup/images.json"),f=await this._readFile("/fork/backup/items.json"),r=await this._readFile("/fork/backup/animations.json"),c=await this._readFile("/fork/backup/themes.json"),l=await this._readFile("/fork/backup/static-pages.json"),d=await this._readFile("/fork/contractMetadata.json"),p={},u=new Va(this.ipfsService);if("existing"==t){for(let e of f)p[e.tokenId]=await this._readFile(`/fork/metadata/${e.tokenId}.json`);return this._importExisting(n,s,o,f,r,c,l,a,u,d,p,e)}if(i){let e=new R;e.walletAddress=i,n=[e]}return this._importAsFork(n,s,o,f,r,c,l,a,u,d,e)}async importExistingFromContract(e){return this._importFromContract(e,"existing")}async importAsForkFromContract(e){return this._importFromContract(e,"fork")}async importExistingFromReader(e,t,i){let a=await this._buildImportBundle(e);return a.channels[0].contractAddress=t,a.channels[0].publishReaderIPFSStatus={},a.channels[0].publishReaderIPFSStatus.cid=i,this._importExisting(a.authors,a.channels,a.images,a.items,a.animations,a.themes,a.staticPages,a.forkStatus,a.mediaDownloader,a.contractMetadata,a.tokenMetadata,i)}async importAsForkFromReader(e,t,i){let a=await this._buildImportBundle(e);return delete a.channels[0].contractAddress,delete a.channels[0].publishReaderIPFSStatus,a.channels[0].title=t,this._importAsFork(a.authors,a.channels,a.images,a.items,a.animations,a.themes,a.staticPages,a.forkStatus,a.mediaDownloader,a.contractMetadata,i)}async _buildImportBundle(e){let t={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}};this.logForkProgress(t,"Processing...");let i=await this._fetchFile(`${e}backup/export/backup/authors.json`),a=await this._fetchFile(`${e}backup/export/backup/channels.json`),n=await this._fetchFile(`${e}backup/export/backup/images.json`),s=await this._fetchFile(`${e}backup/export/backup/items.json`),o=await this._fetchFile(`${e}backup/export/backup/animations.json`),f=await this._fetchFile(`${e}backup/export/backup/themes.json`),r=await this._fetchFile(`${e}backup/export/backup/static-pages.json`),c=await this._fetchFile(`${e}backup/export/contractMetadata.json`),l=new Ya(e),d={};for(let t of s)d[t.tokenId]=await this._fetchFile(`${e}backup/export/metadata/${t.tokenId}.json`);return{authors:i,channels:a,images:n,items:s,animations:o,themes:f,staticPages:r,mediaDownloader:l,forkStatus:t,contractMetadata:c,tokenMetadata:d}}async _importFromContract(e,t){let i={animations:{saved:0,total:0},images:{saved:0,total:0},channels:{saved:0,total:0},items:{saved:0,total:0},authors:{saved:0,total:0},themes:{saved:0,total:0},staticPages:{saved:0,total:0}},a=this.walletService.wallet,n=new zt.CH(e,this._getERC721ABI(),a||this.walletService.provider);this.logForkProgress(i,`Fetching tokens for contract ${e}`);let s=await this.ercEventService.getTokensForContract(n);i.channels.total=1,i.items.total=s.size;let o=new A;o.importSuccess=!1,"existing"==t&&(o.contractAddress=e),o.forkType=t,o.title=await n.name(),o.symbol=await n.symbol(),o.sellerFeeBasisPoints=0,o.attributeOptions=[],await this.channelWebService.put(o);let f,r=new Se;r._id=`token_id_stats_by_channel_${o._id}`,r.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(o._id);for(let e of s){this.logForkProgress(i,`Fetching metadata for #${e}`);let t=await this._getTokenMetadata(n,e);this.logForkProgress(i,`Importing token #${t.tokenId}`),console.time(`Importing token #${t.tokenId}`);let a,s,f=new Y;if(!t.image&&!t.image_url)throw new Error("No image in metadata");{let e=t.image?t.image:t.image_url,n=await this._fetchURI(e);a=(0,Ha.Z)((new TextDecoder).decode(n))?await this.imageService.newFromSvg((new TextDecoder).decode(n)):await this.imageService.newFromBuffer(n);try{await this.imageService.put(a)}catch(e){}f.coverImageId=a._id,i.images.saved++,this.logForkProgress(i,`Importing image ${a._id}`)}if(t.animation_url){f.coverImageAsAnimation=!1,s=await this.animationService.newFromText((new TextDecoder).decode(await this._fetchURI(t.animation_url)));try{await this.animationService.put(s)}catch(e){}i.animations.saved++,this.logForkProgress(i,`Importing animation ${s._id}`),f.animationId=s._id}else f.coverImageAsAnimation=!0;f.tokenId=t.tokenId,f.title=t.name,f.channelId=o._id,f.attributeSelections=[];for(let e of t.attributes)f.attributeSelections.push({traitType:e.trait_type,value:e.value}),this._addAttributeToChannel(e,o);let c=await this.originalMetadataService.newFromText(JSON.stringify(t));await this.originalMetadataService.put(c),f.originalJSONMetadataId=c._id,await this.itemWebService.put({channel:o,item:f,updateQueryCache:!1,publish:!1}),r.result.count++,(!r.result.min||f.tokenId<r.result.min)&&(r.result.min=f.tokenId),(!r.result.max||f.tokenId>r.result.max)&&(r.result.max=f.tokenId),i.items.saved++,(t.image||t.image_url)&&i.images.total++,t.animation_url&&i.animations.total++,console.timeEnd(`Importing token #${t.tokenId}`)}this.logForkProgress(i,`Building query cache for channel ${o._id}`),await this.channelService.buildAttributeCounts(o._id);try{f=await this.queryCacheService.get(r._id)}catch(e){}return f&&(r._rev=f._rev),await this.queryCacheService.put(r),o.importSuccess=!0,await this.channelWebService.put(o),i.channels.saved++,this.logForkProgress(i,`Importing channel ${o._id}`),o._id}async _importAsFork(e,t,i,a,n,s,o,f,r,c,l){let d,p,u=new Map;if(!(e&&t&&i&&a))throw new Error("Invalid collection hash");f.authors.total=e.length,f.channels.total=t.length,f.images.total=i.length,f.items.total=a.length,f.animations.total=n.length,f.themes.total=s.length,f.staticPages.total=o.length,this.logForkProgress(f,"Updating totals..."),p=new A,Object.assign(p,t[0]),p.forkType="fork",p.forkedFromFeeRecipient=c.fee_recipient;let h=`${p._id}`;delete p._id,delete p._rev,delete p._rev_tree,p.authorId=this.walletService.address?.toString(),p.authorId&&await this.authorService.insertIfNew(p.authorId),l&&(p.forkedFromCid=l),p.forkedFromId=h,await this.channelWebService.put(p),u.set(h,p._id),d=p._id,f.channels.saved++,this.logForkProgress(f,`Inserted channel ${p._id}`);let g,v=new Se;v._id=`token_id_stats_by_channel_${p._id}`,v.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(p._id);for(let t of e)delete t._rev,delete t._rev_tree,await this.authorService.put(Object.assign(new R,t)),f.authors.saved++,this.logForkProgress(f,`Inserted author ${t._id}`);for(let e of n){e.content=await r.getAsString(`animations/${e.cid}.html`);let t=await ht.of(e.content);if(t.toString()!=e.cid)throw new Error(`Incorrect cid when importing animation. Expected: ${e.cid}, Result: ${t.toString()}`);let i=Object.assign(new m,e);try{await this.animationService.put(i)}catch(e){}f.animations.saved++,this.logForkProgress(f,`Inserted animation ${i._id}`)}for(let e of i){let t;e.generated?(e.svg=await r.getAsString(`images/${e.cid}.${e.generated?"svg":"jpg"}`),t=e.svg):(e.buffer=await r.getAsBuffer(`images/${e.cid}.${e.generated?"svg":"jpg"}`),t=new Uint8Array(e.buffer));let i=Object.assign(new q,e),a=await ht.of(t);if(a.toString()!=e.cid)throw new Error(`Incorrect cid when importing image. Expected: ${e.cid}, Result: ${a.toString()}`);try{await this.imageService.put(i)}catch(e){}f.images.saved++,this.logForkProgress(f,`Inserted image ${i._id}`)}for(let e of s){let t=e._id;delete e._id,delete e._rev,delete e._rev_tree,e.channelId=u.get(e.channelId);let i=Object.assign(new ce,e);e.forkedFromId=t,await this.themeService.put(i),u.set(t,i._id),f.themes.saved++,this.logForkProgress(f,`Inserted theme ${i._id}`)}for(let e of o){let t=e._id;delete e._id,delete e._rev,delete e._rev_tree,e.channelId=u.get(e.channelId),e.forkedFromId=t;let i=Object.assign(new ae,e);try{await this.staticPageService.put(i)}catch(e){}f.staticPages.saved++,this.logForkProgress(f,`Inserted static page ${i._id}`)}for(let e of a){let t=e._id;if(delete e._id,delete e._rev,delete e._rev_tree,e.channelId=u.get(e.channelId),e.content?.ops?.length>0){let t=[];for(let i of e.content.ops){if(i.insert&&i.insert.ipfsimage){let e=await this.imageService.get(i.insert.ipfsimage.cid);i.insert.ipfsimage.src=await this.imageService.getUrl(e)}t.push(i)}e.content.ops=t}if(e.themes?.length>0){let t=[];for(let i of e.themes)t.push(u.get(i));e.themes=t}e.forkedFromId=t;let i=Object.assign(new Y,e);await this.itemWebService.put({channel:p,item:i,updateQueryCache:!1,publish:!1}),v.result.count++,(!v.result.min||e.tokenId<v.result.min)&&(v.result.min=e.tokenId),(!v.result.max||e.tokenId>v.result.max)&&(v.result.max=e.tokenId),f.items.saved++,this.logForkProgress(f,`Inserted item ${i._id}`)}this.logForkProgress(f,"\n        ******************************\n\n        ******************************\n\n        ******************************\n\n                Import complete\n\n        ******************************\n\n        ******************************\n\n        ******************************\n        "),this.logForkProgress(f,`Building query cache for channel ${d}`),await this.channelService.buildAttributeCounts(p._id);try{g=await this.queryCacheService.get(v._id)}catch(e){}return g&&(v._rev=g._rev),await this.queryCacheService.put(v),p.importSuccess=!0,await this.channelWebService.put(p),d}async _importExisting(e,t,i,a,n,s,o,f,r,c,l,d){if(!(e&&t&&i&&a))throw new Error("Invalid collection hash");let p,u;f.authors.total=e.length,f.channels.total=t.length,f.images.total=i.length,f.items.total=a.length,f.animations.total=n.length,f.themes.total=s.length,f.staticPages.total=o.length,this.logForkProgress(f,"Updating totals..."),u=Object.assign(new A,t[0]),u.forkType="existing",u.forkedFromFeeRecipient=c.fee_recipient,delete u._rev,delete u._rev_tree;let h=await this.channelService.getLatestRevision(u._id);h&&(u._deleted=!1,u._rev=h._rev),await this.channelWebService.put(u),p=u._id,f.channels.saved++,this.logForkProgress(f,`Inserted channel ${u._id}`);let g,v=new Se;v._id=`token_id_stats_by_channel_${u._id}`,v.result={min:void 0,max:void 0,count:0},await this.schemaService.loadChannel(p);for(let t of e){delete t._rev,delete t._rev_tree;let e=await this.authorService.getLatestRevision(t._id);e._deleted=!1,await this.authorService.put(Object.assign(e,t)),f.authors.saved++,this.logForkProgress(f,`Inserted author ${t._id}`)}for(let e of n){e.content=await r.getAsString(`animations/${e.cid}.html`);let t=await ht.of(e.content);if(t.toString()!=e.cid)throw new Error(`Incorrect cid when importing animation. Expected: ${e.cid}, Result: ${t.toString()}`);let i=Object.assign(new m,e);try{await this.animationService.put(i)}catch(e){}f.animations.saved++,this.logForkProgress(f)}for(let e of i){let t;e.generated?(e.svg=await r.getAsString(`images/${e.cid}.${e.generated?"svg":"jpg"}`),t=e.svg):(e.buffer=await r.getAsBuffer(`images/${e.cid}.${e.generated?"svg":"jpg"}`),t=new Uint8Array(e.buffer));let i=Object.assign(new q,e),a=await ht.of(t);if(a.toString()!=e.cid)throw new Error(`Incorrect cid when importing image. Expected: ${e.cid}, Result: ${a.toString()}`);try{await this.imageService.put(i)}catch(e){}f.images.saved++,this.logForkProgress(f)}for(let e of s){delete e._rev,delete e._rev_tree;let t=await this.themeRepository.getLatestRevision(e._id);t._deleted=!1,await this.themeRepository.put(Object.assign(t,e)),f.themes.saved++,this.logForkProgress(f,`Inserted theme ${t._id}`)}for(let e of o){delete e._rev,delete e._rev_tree;let t=await this.staticPageRepository.getLatestRevision(e._id);t._deleted=!1,await this.staticPageRepository.put(Object.assign(t,e)),f.staticPages.saved++,this.logForkProgress(f,`Inserted static page ${t._id}`)}for(let e of a){if(e.content?.ops?.length>0){let t=[];for(let i of e.content.ops){if(i.insert&&i.insert.ipfsimage){let e=await this.imageService.get(i.insert.ipfsimage.cid);i.insert.ipfsimage.src=await this.imageService.getUrl(e)}t.push(i)}e.content.ops=t}delete e._rev,delete e._rev_tree;let t=await this.itemService.getLatestRevision(e._id);t&&(e._deleted=!1,e._rev=t._rev);let i=await this.originalMetadataService.newFromText(JSON.stringify(l[e.tokenId]));await this.originalMetadataService.put(i),e.originalJSONMetadataId=i._id,await this.itemWebService.put({channel:u,item:Object.assign(new Y,e),updateQueryCache:!1,publish:!1}),v.result.count++,(!v.result.min||e.tokenId<v.result.min)&&(v.result.min=e.tokenId),(!v.result.max||e.tokenId>v.result.max)&&(v.result.max=e.tokenId),f.items.saved++,this.logForkProgress(f)}this.logForkProgress(f,"\n        ******************************\n\n        ******************************\n\n        ******************************\n\n                Import complete\n\n        ******************************\n\n        ******************************\n\n        ******************************\n        "),this.logForkProgress(f,`Building query cache for channel ${u._id}`),await this.channelService.buildAttributeCounts(u._id);try{g=await this.queryCacheService.get(v._id)}catch(e){}return g&&(v._rev=g._rev),await this.queryCacheService.put(v),u.importSuccess=!0,await this.channelWebService.put(u),this.logForkProgress(f,`Forking channel ${u._id} complete`),t[0]._id}_addAttributeToChannel(e,t){let i,a=t.attributeOptions.filter((t=>t.traitType==e.trait_type));a?.length>0?i=a[0]:(t.attributeOptions.push({id:(0,bt.Z)(),traitType:e.trait_type,values:[e.value]}),i=t.attributeOptions[t.attributeOptions.length-1]),i.values.includes(e.value)||i.values.push(e.value)}async _getTokenMetadata(e,t){let i,a=`${await e.getAddress()}-${t}`;try{i=await this.tokenMetadataCacheRepository.get(a)}catch(e){}if(i)return console.log(`Returning cached token metadata #${t}`),i.tokenMetadata;let n=await e.tokenURI(t),s=await this._fetchURI(n),o=JSON.parse((new TextDecoder).decode(s));return o.tokenId=t,await this.tokenMetadataCacheRepository.put({_id:a,tokenMetadata:o,dateCreated:(new Date).toJSON()}),o}async _fetchURI(e){if(e.startsWith("data:application/json;utf-8,"))return za.from(e.substring(28,e.length));if(e.startsWith("data:image/bmp;base64,"))return za.from(e.substring(22,e.length),"base64");if(e.startsWith("http")){let t=await qi.Z.get(e,{responseType:"arraybuffer"});return za.from(t.data,"binary")}{let t=Wa.containsCID(e);if(t?.containsCid){e=Wa.convertToDesiredGateway(e,"");return(0,Ea.z)(await(0,Aa.Z)(this.ipfsService.ipfs.cat(e)))}}}async _readFile(e){let t=await(0,Ta.Z)(this.ipfsService.ipfs.files.read(e));return JSON.parse(new TextDecoder("utf-8").decode(t))}async _fetchFile(e){return(await qi.Z.get(e)).data}logForkProgress(e,t){if(t&&console.log(t),"undefined"!=typeof window&&void 0!==window.document){const i=new CustomEvent("fork-progress",{detail:{forkStatus:e,message:t}});document.dispatchEvent(i)}}_getERC721ABI(){return'[\n            {\n                "inputs":[\n                   {\n                      "internalType":"string",\n                      "name":"name",\n                      "type":"string"\n                   },\n                   {\n                      "internalType":"string",\n                      "name":"symbol",\n                      "type":"string"\n                   }\n                ],\n                "stateMutability":"nonpayable",\n                "type":"constructor"\n            },\n\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "name",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "string"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_spender",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "approve",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "totalSupply",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_from",\n                  "type": "address"\n                },\n                {\n                  "name": "_to",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "transferFrom",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "decimals",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint8"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [\n                {\n                  "name": "_owner",\n                  "type": "address"\n                }\n              ],\n              "name": "balanceOf",\n              "outputs": [\n                {\n                  "name": "balance",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [],\n              "name": "symbol",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "string"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "constant": false,\n              "inputs": [\n                {\n                  "name": "_to",\n                  "type": "address"\n                },\n                {\n                  "name": "_value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "transfer",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "bool"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "nonpayable",\n              "type": "function"\n            },\n            {\n              "constant": true,\n              "inputs": [\n                {\n                  "name": "_owner",\n                  "type": "address"\n                },\n                {\n                  "name": "_spender",\n                  "type": "address"\n                }\n              ],\n              "name": "allowance",\n              "outputs": [\n                {\n                  "name": "",\n                  "type": "uint256"\n                }\n              ],\n              "payable": false,\n              "stateMutability": "view",\n              "type": "function"\n            },\n            {\n              "payable": true,\n              "stateMutability": "payable",\n              "type": "fallback"\n            },\n            {\n              "anonymous": false,\n              "inputs": [\n                {\n                  "indexed": true,\n                  "name": "owner",\n                  "type": "address"\n                },\n                {\n                  "indexed": true,\n                  "name": "spender",\n                  "type": "address"\n                },\n                {\n                  "indexed": false,\n                  "name": "value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "Approval",\n              "type": "event"\n            },\n            {\n              "anonymous": false,\n              "inputs": [\n                {\n                  "indexed": true,\n                  "name": "from",\n                  "type": "address"\n                },\n                {\n                  "indexed": true,\n                  "name": "to",\n                  "type": "address"\n                },\n                {\n                  "indexed": false,\n                  "name": "value",\n                  "type": "uint256"\n                }\n              ],\n              "name": "Transfer",\n              "type": "event"\n            },\n            {\n                "inputs":[\n                   {\n                      "internalType":"uint256",\n                      "name":"tokenId",\n                      "type":"uint256"\n                   }\n                ],\n                "name":"tokenURI",\n                "outputs":[\n                   {\n                      "internalType":"string",\n                      "name":"",\n                      "type":"string"\n                   }\n                ],\n                "stateMutability":"view",\n                "type":"function"\n             }\n             \n          ]'}};Za=qa([(0,s.b)(),Ja(17,(0,o.f)(a.WalletService)),Ja(18,(0,o.f)("contracts")),Ga("design:paramtypes",[pi,Ni,ei,Ne,oi,Di,Kt,gi,Rt,Ri,pe,$t,oe,Pi,Ua,ai,be,Object,Object])],Za);class Va{ipfsService;basePath="/fork/";constructor(e){this.ipfsService=e}async getAsString(e){let t=await(0,Ta.Z)(this.ipfsService.ipfs.files.read(`${this.basePath}${e}`));return new TextDecoder("utf-8").decode(t)}async getAsBuffer(e){return(0,Ta.Z)(this.ipfsService.ipfs.files.read(`${this.basePath}${e}`))}}class Ya{basePath;constructor(e){this.basePath=e}async getAsString(e){let t=await qi.Z.get(`${this.basePath}backup/export/${e}`);return t.data?.toString()}async getAsBuffer(e){return(await qi.Z.get(`${this.basePath}backup/export/${e}`,{responseType:"arraybuffer"})).data}}function Ka(e,{$:t,$on:i,$f7:a,$update:s}){let o,f,r=n.getInstance(Za),c=n.getInstance(gi),d=n.getWalletService(),p=n.getInstance(l),u=null!=c.ipfs,h=c.peerCount,m=e.cid,g=!1,v="",b="existing",y=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Fork Collection From IPFS Hash"}];i("pageInit",(async()=>{await c.init(),u=null!=c.ipfs,await s()}));const w=async e=>{e.preventDefault();let t=a.form.convertToData("#import-ipfs-hash");g=!0,s(),p.showSpinner("Forking...");try{f=await r.importFromIPFS(t.hash,b,t.authorId)}catch(e){console.log(e),p.hideSpinner(),a.dialog.alert(e.message,"There was an error")}p.hideSpinner(),g=!1,s()};t(document).on("fork-progress",(async e=>{e.detail.message&&(v=`<p>${e.detail.message}</p>`),o=e.detail.forkStatus,g=!0,s();let i=document.getElementById("ipfs-fork-process");i&&t(i).scrollTop(i.scrollHeight)}));const S=async e=>{e.preventDefault(),b=t(e.currentTarget).val(),await s()};return t(document).on("update-peers",(async e=>{h=e.detail.count,s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-fork">

    <${aa} breadcrumbs=${y} />

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
  
          ${!g&!f?t`
            
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
         
  
                    ${f?t`
                    
                      <div class="block save-row">
  
                        <div class="large-only"></div>
  
                        <a href="/admin/channel/show/${f}" class="button button-fill color-green" class="button button-fill" tabindex="12">
                          View Collection
                        </a>  
                      </div>
                    `:t`
                      <div class="fork-output-simple" innerHTML="${v}" id="ipfs-fork-process" ></div>
                    `}
                    
                  
                  `:t`<span />`}
  
  
                  ${u&!g&!f?t`
  
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

`}}Ka.id="755b2553b3",Ka.style="\n  .ipfs-label,\n  .fork-label {\n      margin-top: 10px;\n      margin-bottom: 10px;\n      font-weight: bold;\n      font-size: 18px;\n  }\n\n  .fork-output {\n      border: 1px solid #cccccc;\n      font-size: 13px;\n      width: 100%;\n      max-width: 100%;\n      padding: 5px;\n      height: 300px;\n      overflow-y: scroll;\n  }\n\n  .fork-status {\n      font-size: 14px;\n      padding: 10px;\n      border: 1px solid #f1f1f1;\n  }\n\n  .fork-status .item label {\n      font-weight: bold;\n      display: inline-block;\n      width: 180px;\n  }\n\n\n\n";const Qa=Ka;function Xa(e,{$:t,$on:i,$f7:a,$update:s}){let o,f,r,c,d=n.getInstance(Za),p=n.getInstance(gi),u=n.getInstance(l),h=e.contractAddress,m=!1,g="",v="existing",b=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Fork Collection From Contract"}],y=!1;i("pageInit",(async()=>{o=n.getWalletService(),f=await o.getAddress(),await p.init(),y=null!=p.ipfs,await s()}));const w=async e=>{e.preventDefault(),v=t(e.currentTarget).val(),await s()},S=async e=>{e.preventDefault();let t=a.form.convertToData("#import-fork-contract");m=!0,s(),u.showSpinner("Forking...");try{r="existing"==v?await d.importExistingFromContract(t.contractAddress):await d.importAsForkFromContract(t.contractAddress),u.hideSpinner()}catch(e){console.log(e),u.hideSpinner(),a.dialog.alert(e.message,"There was an error")}m=!1,s()};return t(document).on("fork-progress",(async e=>{e.detail.message&&(g=`<p>${e.detail.message}</p>`),c=e.detail.forkStatus,m=!0,s();let i=document.getElementById("ipfs-fork-process");i&&t(i).scrollTop(i.scrollHeight)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-fork-contract">

    <${aa} breadcrumbs=${b} />
    <${Ue} />

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
  
            ${y&!m&!r?t`
  
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
  
                        ${c?t`
  
                          <div class="data-table ">
                            <table>
                              <thead>
                                <th class="label-cell">Type</th>
                                <th class="numeric-cell">Saved</th>
                                <th class="numeric-cell">Total</th>
                              </thead>
                              <tbody>
                                <tr class="${c.animations.saved==c.animations.total&&c.animations.total>0?"complete":""}">
                                  <td class="label-cell">Animations</td>
                                  <td class="numeric-cell">${c.animations.saved}</td>
                                  <td class="numeric-cell">${c.animations.total?c.animations.total:"?"} </td>
                                </tr>
                                <tr class="${c.images.saved==c.images.total&&c.images.total>0?"complete":""}">
                                  <td class="label-cell">Images</td>
                                  <td class="numeric-cell">${c.images.saved}</td>
                                  <td class="numeric-cell">${c.images.total?c.images.total:"?"}</td>
                                </tr>
                                <tr class="${c.items.saved==c.items.total&&c.items.total>0?"complete":""}">
                                  <td class="label-cell">Items</td>
                                  <td class="numeric-cell">${c.items.saved}</td>
                                  <td class="numeric-cell">${c.items.total}</td>
                                </tr>
                                <tr class="${c.channels.saved==c.channels.total&&c.channels.total>0?"complete":""}">
                                  <td class="label-cell">Channels</td>
                                  <td class="numeric-cell">${c.channels.saved}</td>
                                  <td class="numeric-cell">${c.channels.total}</td>
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

`}}Xa.id="bdc19bca5f",Xa.style="\n\n";const en=Xa;function tn(e,{$:t,$on:i,$f7:a,$update:s}){let o,f,r,c,d,p,u,h=n.getInstance(Za),m=n.getInstance(gi),g=n.getWalletService(),v=n.getInstance(l),b=(m.ipfs,m.peerCount,!1),y="",w="existing",S=[{text:"Home",path:"/"},{text:"Create & Import",path:"/admin/channel/create-menu"},{text:"Fork Collection From Reader"}],$=window.location.hash?window.location.hash.substring(window.location.hash?.indexOf("?"),window.location.hash.length):void 0;const k=new URLSearchParams($);let I={};k.get("path")&&(I.path=decodeURIComponent(k.get("path")));const R=async e=>{try{d=await g.getAddress(),r=await P(),c=await C(),o=await j(),I.title=r.title,p=r.title}catch(e){a.dialog.alert(e,"Error loading collection. Not found.")}},x=async e=>{e.preventDefault(),I.path=t("#libraryURL").val(),await R(),await s()},_=e=>g.truncateEthAddress(e),P=async()=>(await qi.Z.get(`${I.path}backup/export/backup/channels.json`)).data[0],C=async()=>(await qi.Z.get(`${I.path}backup/export/backup/authors.json`)).data[0],j=async()=>{try{return(await qi.Z.get(`${I.path}backup/contract/contract.json`)).data}catch(e){console.log(e)}};i("pageInit",(async()=>{I.path&&await R(),await s()}));const T=async e=>{e.preventDefault(),w=t(e.currentTarget).val(),await s()},A=async e=>{e.preventDefault(),p=t(e.currentTarget).val(),await s()},F=async e=>{e.preventDefault(),b=!0,await s(),v.showSpinner("Forking...");try{u="existing"==w?await h.importExistingFromReader(I.path,o.contractAddress,o.ipfsCid):await h.importAsForkFromReader(I.path,p),v.hideSpinner()}catch(e){v.hideSpinner(),a.dialog.alert(e.message,"Error loading collection")}b=!1,await s()};return t(document).on("fork-progress",(async e=>{e.detail.message&&(y=`<p>${e.detail.message}</p>`),f=e.detail.forkStatus,b=!0,s();let i=document.getElementById("ipfs-fork-process");i&&t(i).scrollTop(i.scrollHeight)})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-fork-contract">

    <${aa} reader_config=${I} breadcrumbs=${S}  />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        <div class="block-title">Fork Collection From Reader</div>

        ${!b&!u?t`
  
          ${r?t`
          
            <form @submit="${F}" id="import-from-reader">
  
              <div class="block-header">
                A <em>fork</em> is a copy of an NFT collection. Forking a project allows you to freely experiment with changes without affecting the original project. 
              </div>
  
              <div class="list media-list inset">
                <ul>
                  <li>
                    <label class="item-radio item-radio-icon-start item-content">
                      <input type="radio" name="demo-media-radio" checked @change="${T}" value="existing" />
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
                      <input type="radio" name="demo-media-radio" @change="${T}" value="fork" />
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
  
                  <p>Forking <a href="${I.path}" class="external">${r.title}</a></p>
    
                  <div class="repo-name">
    
                    <div class="left">
                      <strong>Author</strong>
    
                      <div class="list no-hairlines" style="margin: 0; padding-left: 0px;">
                        <ul>
                          <li class="item-content item-input" style="padding-left: 0px;">
                            <div class="item-inner">
                              <div class="item-input-wrap">
                                <select id="collection-author">
                                  ${"existing"==w&&null!=c?t`
                                    <option value="${c._id}">${_(c._id)} (Original Author)</option>
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
                                    ${r.title}
                                  </div>
                                `:t`
                                  <div class="item-input-wrap ">
                                    <input type="text" value="${I.title}" @change="${A}" />
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
  
                    ${f?t`
                      <div class="data-table">
                        <table>
                          <thead>
                            <th class="label-cell">Type</th>
                            <th class="numeric-cell">Saved</th>
                            <th class="numeric-cell">Total</th>
                          </thead>
                          <tbody>
                            <tr class="${f.channels.saved==f.channels.total&&f.channels.total>0?"complete":""}">
                              <td class="label-cell">Channels</td>
                              <td class="numeric-cell">${f.channels.saved}</td>
                              <td class="numeric-cell">${f.channels.total}</td>
                            </tr>
                            <tr class="${f.authors.saved==f.authors.total&&f.authors.total>0?"complete":""}">
                              <td class="label-cell">Authors</td>
                              <td class="numeric-cell">${f.authors.saved}</td>
                              <td class="numeric-cell">${f.authors.total}</td>
                            </tr>
                            <tr class="${f.animations.saved==f.animations.total&&f.animations.total>0?"complete":""}">
                              <td class="label-cell">Animations</td>
                              <td class="numeric-cell">${f.animations.saved}</td>
                              <td class="numeric-cell">${f.animations.total}</td>
                            </tr>
  
                            <tr class="${f.images.saved==f.images.total&&f.images.total>0?"complete":""}">
                              <td class="label-cell">Images</td>
                              <td class="numeric-cell">${f.images.saved}</td>
                              <td class="numeric-cell">${f.images.total}</td>
                            </tr>
                            <tr class="${f.themes.saved==f.themes.total&&f.themes.total>0?"complete":""}">
                              <td class="label-cell">Themes</td>
                              <td class="numeric-cell">${f.themes.saved}</td>
                              <td class="numeric-cell">${f.themes.total}</td>
                            </tr>
                            <tr class="${f.staticPages.saved==f.staticPages.total&&f.staticPages.total>0?"complete":""}">
                              <td class="label-cell">Static Pages</td>
                              <td class="numeric-cell">${f.staticPages.saved}</td>
                              <td class="numeric-cell">${f.staticPages.total}</td>
                            </tr>
                            <tr class="${f.items.saved==f.items.total&&f.items.total>0?"complete":""}">
                              <td class="label-cell">Items</td>
                              <td class="numeric-cell">${f.items.saved}</td>
                              <td class="numeric-cell">${f.items.total}</td>
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

`}}tn.id="52ef564055",tn.style="\n\n\n\n\n\n";const an=tn;function nn(e,{$:t,$on:i,$f7:a,$update:s}){let o=n.getInstance(Ni),f=e.channelViewModel;const r=async e=>{e.preventDefault();try{await o.upgrade(f.channel)}catch(e){console.log(e),a.dialog.alert(e,"There was an error")}},c=async e=>{e.preventDefault(),a.preloader.show();try{await o.regenerateItemMedia(f.channel)}catch(e){console.log(e),a.dialog.alert(e,"There was an error")}a.preloader.hide()};return i("pageInit",(async(e,t)=>{})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-edit-channel">

    <${aa} />

    <div class="page-content">

      <div class="row">
        <div class="col-100 large-66 center">

          <ul class="breadcrumb">
            <li><a href="/admin/channel/show/${f.channel._id}">${f.channel.title}</a></li>
            <li>Upgrade Collection</li>
          </ul>

          <div class="block list">

            <p>This screen is used to update a collection to the latest database structure. Currently this is a 
            diagnostic level tool and should only be used if you have backed up the data.</p>

            <p>The effect is like opening each item individually and resaving it.</p>


            <button class="button button-fill" @click="${c}">
              Regenerate Animations
            </button>

            <br />

            <button class="button button-fill" @click="${r}">
              Upgrade
            </button>

          </div>

        </div>
      </div>



    </div>
  </div>

`}}nn.id="985e21b3b9",nn.style="\n\n";const sn=nn;var on=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},fn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},rn=function(e,t){return function(i,a){t(i,a,e)}};let cn=class{channelWebService;itemWebService;schemaService;themeService;staticPageService;footerText;constructor(e,t,i,a,n,s){this.channelWebService=e,this.itemWebService=t,this.schemaService=i,this.themeService=a,this.staticPageService=n,this.footerText=s}async app(){return new ea((async e=>({footerText:this.footerText})),sa)}async create(){return new ea((async e=>{}),ha)}async createMenu(){return new ea((async e=>{}),ja)}async fork(){return new ea((async e=>({cid:e.query.cid})),Qa)}async forkContract(){return new ea((async e=>({footerText:this.footerText,contractAddress:e.query.contractAddress})),en)}async forkReader(){return new ea((async e=>({footerText:this.footerText})),an)}async show(){return new ea((async e=>{await this.schemaService.loadChannel(e.params.id);let t=await this.channelWebService.get(e.params.id);return{channelViewModel:t,firstPageItems:await this.itemWebService.listByChannel(t.channel._id,ee.CHUNK_SIZE,0)}}),ba)}async themes(){return new ea((async e=>{await this.schemaService.loadChannel(e.params.id);let t=await this.channelWebService.get(e.params.id);return{channelViewModel:t,themes:await this.themeService.listByChannel(t.channel._id,1e3,0)}}),$a)}async staticPages(){return new ea((async e=>{await this.schemaService.loadChannel(e.params.id);let t=await this.channelWebService.get(e.params.id);return{channelViewModel:t,staticPages:await this.staticPageService.listByChannel(t.channel._id,1e3,0)}}),xa)}async edit(){return new ea((async e=>(await this.schemaService.loadChannel(e.params.id),{channelViewModel:await this.channelWebService.get(e.params.id)})),Pa)}async upgrade(){return new ea((async e=>(await this.schemaService.loadChannel(e.params.id),{channelViewModel:await this.channelWebService.get(e.params.id)})),sn)}};on([ta("/"),fn("design:type",Function),fn("design:paramtypes",[]),fn("design:returntype",Promise)],cn.prototype,"app",null),on([ta("/admin/channel/create"),fn("design:type",Function),fn("design:paramtypes",[]),fn("design:returntype",Promise)],cn.prototype,"create",null),on([ta("/admin/channel/create-menu"),fn("design:type",Function),fn("design:paramtypes",[]),fn("design:returntype",Promise)],cn.prototype,"createMenu",null),on([ta("/admin/channel/fork"),fn("design:type",Function),fn("design:paramtypes",[]),fn("design:returntype",Promise)],cn.prototype,"fork",null),on([ta("/admin/channel/fork-contract"),fn("design:type",Function),fn("design:paramtypes",[]),fn("design:returntype",Promise)],cn.prototype,"forkContract",null),on([ta("/admin/channel/fork-reader"),fn("design:type",Function),fn("design:paramtypes",[]),fn("design:returntype",Promise)],cn.prototype,"forkReader",null),on([ta("/admin/channel/show/:id"),fn("design:type",Function),fn("design:paramtypes",[]),fn("design:returntype",Promise)],cn.prototype,"show",null),on([ta("/admin/channel/themes/:id"),fn("design:type",Function),fn("design:paramtypes",[]),fn("design:returntype",Promise)],cn.prototype,"themes",null),on([ta("/admin/channel/static-pages/:id"),fn("design:type",Function),fn("design:paramtypes",[]),fn("design:returntype",Promise)],cn.prototype,"staticPages",null),on([ta("/admin/channel/edit/:id"),fn("design:type",Function),fn("design:paramtypes",[]),fn("design:returntype",Promise)],cn.prototype,"edit",null),on([ta("/admin/channel/upgrade/:id"),fn("design:type",Function),fn("design:paramtypes",[]),fn("design:returntype",Promise)],cn.prototype,"upgrade",null),cn=on([(0,s.b)(),rn(5,(0,o.f)("footer-text")),fn("design:paramtypes",[Ni,Di,Ne,$t,Pi,String])],cn);var ln,dn=i(6869),pn=i.n(dn),un=i(48764).Buffer,hn=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},mn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let gn=ln=class{settingsService;static BASE_URL="https://api.github.com";static GRAPHQL_URL="https://api.github.com/graphql";static READER_REPO_OWNER="LargeNFT";static READER_REPO="large-reader";constructor(e){this.settingsService=e}async createFork(e){console.log("Creating reader fork...");let t=(await this.settingsService.get()).gitProviders.github;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");let i=await this.getExistingFork(e);if(i)return i;let a=`${ln.BASE_URL}/repos/${ln.READER_REPO_OWNER}/${ln.READER_REPO}/generate`,n=(await qi.Z.post(a,{owner:t.username,name:this.getBranchName(e),include_all_branches:!1,private:!0},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;return{id:n.id,httpUrlToRepo:n.html_url,path:n.name,branch:"master"}}async createVariables(e){let t=await this.settingsService.get(),i=t.gitProviders.github;if(i.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");t.alchemyKey&&await this._createVariable(e,i,"ALCHEMY_API_KEY",t.alchemyKey)}async _createVariable(e,t,i,a){let n=`${ln.BASE_URL}/repos/${t.username}/${this.getBranchName(e)}/actions/secrets/public-key`;const s=a;let o=(await qi.Z.get(n,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;await pn().ready;let f=pn().from_base64(o.key,pn().base64_variants.ORIGINAL),r=pn().from_string(s),c=pn().crypto_box_seal(r,f),l=pn().to_base64(c,pn().base64_variants.ORIGINAL),d=`${ln.BASE_URL}/repos/${t.username}/${this.getBranchName(e)}/actions/secrets/${i}`;return qi.Z.put(d,{key_id:o.key_id,encrypted_value:l},{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})}async getExistingFork(e){let t=(await this.settingsService.get()).gitProviders.github;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");try{let i=`${ln.BASE_URL}/repos/${t.username}/${this.getBranchName(e)}`,a=(await qi.Z.get(i,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data;if(a.id)return{id:a.id,httpUrlToRepo:a.html_url,path:a.name,branch:"master"}}catch(e){}}async getForkRepoStatus(e){if((await this.settingsService.get()).gitProviders.github.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");return await this.getExistingFork(e)?"finished":"pending"}async commit(e,t,i){let a,n=0,s=this.chunkIt(t,100);for(const[o,f]of s.entries()){n+=f.length,this.logPublishProgress(`Commiting reader data for ${e.title} to GitHub: committing ${f.length} actions. ${n} / ${t.length}`);let r=await this.getMostRecentCommitOid(e,i);const c=f.map((e=>({path:e.file_path.slice(1),contents:un.from(e.content).toString("base64")})));let l="";l=o===s.length-1?"Commiting reader data complete":`Commiting reader data for ${e.title}`;const d=`\n                mutation createCommit($additions: [FileAddition!]!, $oid: GitObjectID!) {\n                    createCommitOnBranch (input: {\n                        branch : {\n                            repositoryNameWithOwner: "${i.username}/${this.getBranchName(e)}"\n                            branchName: "master"\n                        }\n                        message: {\n                            headline: "${l}"\n                        }\n                        fileChanges: {\n                            additions: $additions\n                        }\n                        expectedHeadOid: $oid\n                        }) {\n                        commit {\n                            commitUrl\n                        }\n                    }\n                }\n            `,p={oid:r,additions:c};a=(await qi.Z.post(ln.GRAPHQL_URL,{query:d,variables:p},{headers:{"Content-Type":"application/json",Authorization:`Bearer ${i.personalAccessToken}`}})).data.data.createCommitOnBranch.commit.commitUrl.split("/").pop(),this.logPublishProgress(`Commit successful: ${a}`)}return a}async getIPFSActionStatus(e){let t=(await this.settingsService.get()).gitProviders.github;if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");try{let i=await this.getMostRecentActionRun(e,t);if(("success"==i?.conclusion||"skipped"==i?.conclusion)&&(!e.publishReaderIPFSStatus?.date||yi()(i.created_at).isAfter(yi()(e.publishReaderIPFSStatus?.date))))return"finished"}catch(e){console.log(e)}}async getIPFSActionResult(e){let t=(await this.settingsService.get()).gitProviders.github;if(t.personalAccessToken.length<1)throw new Error(`${t.name} personal access token not set`);try{const i=await qi.Z.get(`${ln.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/contents/ipfs/ipfs.json`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}});let a=JSON.parse(un.from(i.data.content,"base64").toString());return a.archive=`${e.httpUrlToRepo}/blob/master/ipfs/${a.cid}.car`,a}catch(e){console.log(e)}}async getMostRecentActionRun(e,t){if(!e.publishReaderIPFSStatus?.headSha)return;const i=await qi.Z.get(`${ln.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/actions/workflows/main.yml/runs?per_page=1&page=1&head_sha=${e.publishReaderIPFSStatus.headSha}`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}});return i.data.workflow_runs?.length>0?i.data.workflow_runs[0]:void 0}async createCommit(e,t,i,a,n){const s=await qi.Z.post(`${ln.BASE_URL}/repos/${n.username}/${i.publishReaderRepoPath}/git/commits`,{message:a,parents:[e],tree:t},{headers:{Authorization:`Bearer ${n.personalAccessToken}`}});await qi.Z.patch(`${ln.BASE_URL}/repos/${n.username}/${i.publishReaderRepoPath}/git/refs/heads/master`,{sha:s.data.sha},{headers:{Authorization:`Bearer ${n.personalAccessToken}`}})}async createTree(e,t,i,a){let n={tree:t,base_tree:e};return(await qi.Z.post(`${ln.BASE_URL}/repos/${a.username}/${i.publishReaderRepoPath}/git/trees`,n,{headers:{Authorization:`Bearer ${a.personalAccessToken}`,Accept:"application/vnd.github+json"}})).data.sha}async deleteReaderBackup(e,t){if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing files from repo..."),await this.deleteDirectory(e,t,".upload"),this.logPublishProgress("Successfully deleted existing backup...")}async deleteContractBackup(e,t){if(t.personalAccessToken.length<1)throw new Error("Gitlab personal access token not set");this.logPublishProgress("Deleting existing contract files from repo..."),await this.deleteDirectory(e,t,"backup/contract")}async getMostRecentCommit(e,t){return(await qi.Z.get(`${ln.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/commits/master`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data}async getMostRecentCommitOid(e,t){const i=`\n            query GetBranch{\n                repository (name: "${this.getBranchName(e)}", owner: "${t.username}") {\n                    ref (qualifiedName: "master") {\n                        target {\n                            ... on Commit {\n                                history(first: 1) {\n                                    nodes {\n                                        oid\n                                    }\n                                }\n                            }\n                        }\n                    }\n                }\n            }\n        `;return(await qi.Z.post(ln.GRAPHQL_URL,JSON.stringify({query:i}),{headers:{"Content-Type":"application/json",Authorization:`Bearer ${t.personalAccessToken}`}})).data.data.repository.ref.target.history.nodes[0].oid}async deleteDirectory(e,t,i){const a=await this.getMostRecentCommit(e,t),n=a.commit.tree.sha;let s=(await qi.Z.get(`${ln.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/git/trees/${n}`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`}})).data.tree,o=s.find((e=>e.path==i))?.sha;if(o){let s=(await qi.Z.get(`${ln.BASE_URL}/repos/${t.username}/${e.publishReaderRepoPath}/git/trees/${o}`,{headers:{Authorization:`Bearer ${t.personalAccessToken}`},params:{recursive:!0}})).data.tree.filter((({type:e})=>"blob"===e)).map((e=>({path:`${i}/${e.path}`,mode:e.mode,type:e.type,sha:null})));const f=await this.createTree(n,s,e,t);await this.createCommit(a.sha,f,e,`Deleting ${i}`,t)}}logPublishProgress(e){if(console.log(e),"undefined"!=typeof window&&void 0!==window.document){const t=new CustomEvent("publish-progress",{detail:{message:e}});document.dispatchEvent(t)}}chunkIt(e,t){let i=[];for(let a=0;a<e.length;a+=t){let n=e.slice(a,a+t);i.push(n)}return i}getBranchName(e){return e.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}};gn=ln=hn([(0,s.b)(),mn("design:paramtypes",[jt])],gn);var vn=i(48764).Buffer,bn=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},yn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let wn=class{settingsService;channelService;gitlabService;githubService;schemaService;fs;repoURI;defaultBranch;constructor(e,t,i,a,n){this.settingsService=e,this.channelService=t,this.gitlabService=i,this.githubService=a,this.schemaService=n}async deployReader(e){this.logPublishProgress("Deploying reader...");let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);let a=[];this.logPublishProgress("Creating channel backup...");let n=await this.schemaService.backupChannel();a.push({action:"create",file_path:"/.upload/channel.json",content:vn.from(JSON.stringify(n.channel))}),a.push({action:"create",file_path:"/.upload/items.json",content:vn.from(JSON.stringify(n.items))}),a.push({action:"create",file_path:"/.upload/authors.json",content:vn.from(JSON.stringify(n.authors))}),a.push({action:"create",file_path:"/.upload/themes.json",content:vn.from(JSON.stringify(n.themes))}),a.push({action:"create",file_path:"/.upload/staticPages.json",content:vn.from(JSON.stringify(n.staticPages))}),a.push({action:"create",file_path:"/.upload/attributeCounts.json",content:vn.from(JSON.stringify(n.attributeCounts))}),this.logPublishProgress(`Packaging ${n.images?.length} images...`);let s=0;for(let e of n.images)e.buffer instanceof ArrayBuffer&&(e.buffer=new Uint8Array(e.buffer)),a.push({action:"create",file_path:`/.upload/images/${s}.json`,content:vn.from(JSON.stringify(e))}),s++;this.logPublishProgress(`Packaging ${n.animations?.length} animations...`),s=0;for(let e of n.animations)a.push({action:"create",file_path:`/.upload/animations/${s}.json`,content:vn.from(JSON.stringify(e))}),s++;switch(i.name){case"gitlab":return await this.gitlabService.createVariables(e),await this.gitlabService.deleteReaderBackup(e,i),this.gitlabService.commit(e,a,i);case"github":return await this.githubService.createVariables(e),await this.githubService.deleteReaderBackup(e,i),this.githubService.commit(e,a,i)}this.logPublishProgress("Export to git complete")}async deployReaderContract(e,t){let i=await this.settingsService.get(),a=await this.channelService.getGitProviderCredentials(e,i);if(a.personalAccessToken.length<1)throw new Error(`${a.name} personal access token not set`);switch(a.name){case"gitlab":return await this.gitlabService.deleteContractBackup(e,a),this.gitlabService.commit(e,t,a);case"github":return this.githubService.commit(e,t,a)}this.logPublishProgress("Export to git complete")}async getExistingFork(e){let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return this.gitlabService.getExistingFork(e);case"github":return this.githubService.getExistingFork(e)}}async createFork(e){let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return this.gitlabService.createFork(e);case"github":return this.githubService.createFork(e)}}async createVariables(e){let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return this.gitlabService.createVariables(e);case"github":return this.githubService.createVariables(e)}}async getForkRepoStatus(e){let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return this.gitlabService.getForkRepoStatus(e);case"github":return this.githubService.getForkRepoStatus(e)}}async getIPFSActionStatus(e){let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return this.gitlabService.getIPFSActionStatus(e);case"github":return this.githubService.getIPFSActionStatus(e)}}async getIPFSActionResult(e){let t=await this.settingsService.get(),i=await this.channelService.getGitProviderCredentials(e,t);if(i.personalAccessToken.length<1)throw new Error(`${i.name} personal access token not set`);switch(i.name){case"gitlab":return this.gitlabService.getIPFSActionResult(e);case"github":return this.githubService.getIPFSActionResult(e)}}logPublishProgress(e){if(console.log(e),"undefined"!=typeof window&&void 0!==window.document){const t=new CustomEvent("publish-progress",{detail:{message:e}});document.dispatchEvent(t)}}chunkArrayByBytes(e,t){let i=[],a={};e.forEach((e=>{if(a[e._id]=vn.byteLength(JSON.stringify(e),"utf8"),console.log(e),a[e._id]>t)throw new Error("Image larger than 15MB found. Upload can not proceed.")}));let n=[],s=0;for(let o of e)s+a[o._id]>=t&&(i.push(n),n=[],s=0),n.push(o),s+=a[o._id];return n.length>0&&i.push(n),i}};function Sn(e,{$:t,$on:i,$f7:a,$update:s}){let o=n.getInstance(Dt),f=(n.getInstance(et),n.getInstance(Di)),r=n.getInstance(Rt),c=n.getInstance(l);const d=async()=>{$.images=await f.getImagesFromContent({title:$.item.title,content:{ops:o.activeEditor.getContents().ops},coverImageCSS:$.item.coverImageCSS,themes:$.item.themes}),1==$.images?.length&&($.coverImage=$.images[0]),o.activeEditor.update(),await s()},p=async e=>{let i=t(e.currentTarget).data("id"),a=$?.images.filter((e=>e.cid==i));a?.length>0&&($.coverImage=a[0]),await s()},u=async e=>{e.preventDefault(),$.coverImage=void 0,await s()},h=async e=>{let i=t(e.currentTarget).data("id");w.filter((e=>e.id==i))[0].value=t(e.currentTarget).val(),await s()},m=async e=>{let i=t(e.currentTarget).val();$.item.themes=i,await s(),await d()},g=e=>{let i=t(e.currentTarget).val();$.item.title=i,document.dispatchEvent(new CustomEvent("load-cover-images"))},v=e=>{j=t(e.currentTarget).prop("checked"),s()},b=async e=>{e.preventDefault();let t=a.form.convertToData("#generate-form");try{await o.generateAIImage(t.model,t.prompt,t.negativePrompt),a.popup.close(".ai-popup")}catch(e){c.hideSpinner(),a.dialog.alert(e.message,"There was an error")}};let y,w,S,$=e.item,k=e.editor,I=e.toolbar,R=e.themes,x=e.cancel_link,_=($.coverImage,e.cover_image_css_editor_id),P=e.animation_css_editor_id,C=e.show_hugging_face,j=!$.item.coverImageAsAnimation;return $&&(e=>{w=e;for(let e of w)!e.value&&e.values?.length>0&&(e.value=e.values[0])})($.attributeSelections),t(document).on("image-selected",(async e=>{$.coverImage=await r.get(e.detail._id),await d()})),t(document).on("update-cover-image-css",(async e=>{$.item.coverImageCSS=e?.detail?.coverImageCSS,await d()})),t(document).on("load-cover-images",(async e=>{await d()})),t(document).on("ipfs-ready",(async e=>{y=!0,await s()})),t(document).on("hugging-face-ready",(async e=>{C=!0,await s()})),t(document).on("set-ai-prompt",(async e=>{let t=o.activeEditor.getSelection();t&&(t.length>0?(S=o.activeEditor.getText(t.index,t.length),console.log("User has highlighted: ",S)):S=""),await s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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
    
                            ${j?t`
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

`}}wn=bn([(0,s.b)(),yn("design:paramtypes",[jt,pi,Vi,gn,Ne])],wn),Sn.id="d894f1d50f",Sn.style="\n    .cover-image-thumbnail {\n        width: 250px;\n        height: 250px;\n    }\n\n    .cover-image-thumbnail.selected {\n        border: 3px solid #ff0000;\n    }\n\n    #title-header-input {\n        line-height: 30px;\n        font-size: 30px;\n        font-weight: 700;\n        height: 50px;\n    }\n\n    .clear-button {\n        width: 100px;\n    }\n";const $n=Sn;i(69942);function kn(e,{$:t,$on:i,$f7:a,$update:s}){let o,f,r=n.getInstance(Dt),c=n.getInstance(et),d=n.getInstance(l),p=n.getInstance(oi),u=(n.getInstance(Rt),n.getInstance(Di)),h=n.getInstance(gi),m=(n.getInstance(wn),n.getInstance(jt)),g=n.getInstance(Ft),v=(n.getWalletService(),e.itemViewModel),b=e.themes,y=!1,w=`/admin/channel/show/${v.channel._id}`,S=!1,$=[{text:"Home",path:"/"},{text:v.channel.title,path:`/admin/channel/show/${v.channel._id}`},{text:"Create Item"}];pa.Z.configure({languages:["css"]});const k=async e=>{e.preventDefault(),await h.init();let t=a.form.convertToData("#create-item-form"),i=Object.assign(new Y,t);i.coverImageAsAnimation="on"!=t.coverImageAsAnimation[0],i.content=r.activeEditor.getContents(),i.coverImageCSS="\n"!=o.getText()?o.getText():void 0,i.animationCSS="\n"!=f.getText()?f.getText():void 0,i.attributeSelections=JSON.parse(i.attributeSelections).map((e=>({id:e.id,traitType:e.traitType,value:e.value}))),i.contentHTML=await c.translateContent(i.content,!0);let n=await u.saveGeneratedCoverImage(i);i.coverImageGenerated=n.generated,i.tokenId=await p.getNextTokenId(i.channelId),i.coverImageAsAnimation||await u.saveAnimation(i);try{d.showSpinner(),await u.put({channel:v.channel,item:i,updateQueryCache:!0,publish:!1});a.toast.show({text:"Item created",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate(`/admin/channel/show/${i.channelId}/${i.tokenId}`)}catch(e){console.log(e),a.dialog.alert(e.errors,"There was an error")}};return i("pageInit",(async(e,i)=>{r.buildQuillPostEditor("#create-item-editor","#create-item-toolbar"),r.activeEditor.root.addEventListener("blur",(function(){document.dispatchEvent(new CustomEvent("load-cover-images"))})),r.activeEditor.on("text-change",((e,t,i)=>{if(document.dispatchEvent(new CustomEvent("load-cover-images")),"user"!==i)return;const a=function(e){return e.ops.filter((e=>e.insert&&e.insert.ipfsimage)).map((e=>e.insert.ipfsimage))}(r.activeEditor.getContents().diff(t));a.forEach((e=>{v.images=v.images.filter((t=>t.cid!=e.cid)),e.cid==v.coverImage?.cid&&(v.coverImage=void 0)}))})),t(".image-button").off("click"),t(".image-button-input").off("click"),t(".ai-button").off("click"),t(".image-button").on("click",(function(e){e.preventDefault();t(".image-button-input").click()})),t(".image-button-input").on("change",(async function(e){e.preventDefault(),await r.imageSelected(this)})),t(".ai-button").on("click",(async function(e){e.preventDefault();const t=new CustomEvent("set-ai-prompt");document.dispatchEvent(t),a.popup.open(".ai-popup")})),o=new(at())("#cover-image-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>pa.Z.highlightAuto(e).value},toolbar:!1}}),o.on("text-change",((e,t,i)=>{document.dispatchEvent(new CustomEvent("update-cover-image-css",{detail:{coverImageCSS:"\n"!=o.getText()?o.getText():void 0}}))})),f=new(at())("#animation-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>pa.Z.highlightAuto(e).value},toolbar:!1}}),o.setText(".svg-h1 {}"),f.setText(".animation-container {}"),await s(),d.showSpinner(),await h.init(),y=null!=h.ipfs;const n=new CustomEvent("ipfs-ready");document.dispatchEvent(n);const c=await m.get();if(S=null!=c?.huggingFace,c?.huggingFace?.length>0){await g.init();const e=new CustomEvent("hugging-face-ready");document.dispatchEvent(e)}d.hideSpinner(),await s()})),i("pageBeforeRemove",(()=>{})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-create-item">

    <${aa} breadcrumbs=${$} />

    <div class="page-content hide-toolbar-on-scroll">

      <form class="list media-list" id="create-item-form" @submit="${k}">

        <${$n} item=${v} 
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

`}}kn.id="f5f8d24e72",kn.style="\n  #create-item-editor {\n    min-height: 175px;\n    height: 100%;\n    /* added these styles */\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n  }\n";const In=kn;function Rn(e,{$:t,$on:i,$f7:a,$update:s}){n.getInstance(oi);let o=n.getInstance(l),f=n.getInstance(Di),r=e.itemViewModel,c=(r.editable,[{text:"Home",path:"/"},{text:r.channel.title,path:`/admin/channel/show/${r.channel._id}`},{text:r.item.title?r.item.title:`#${r.item.tokenId}`}]);i("pageInit",(async(e,i)=>{t(`#item-content-${r.item._id} a`).addClass("external"),await s()}));const d=async e=>{try{a.dialog.confirm("Do you want to delete this item? Note: This only deletes from your device.",(async function(){await f.delete(r.item);a.toast.show({text:"Item deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate(`/admin/channel/show/${r.channel._id}`)}))}catch(e){o.showExceptionPopup(e)}},p=async e=>{let t=await f.clone(r.item);a.views.main.router.navigate(`/admin/channel/${r.channel._id}/item/edit/${t._id}`)};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-show-item">

    <${aa} breadcrumbs=${c} />

    ${r.editable?t`
      <div class="fab fab-extended fab-right-bottom">
        <a href="/admin/item/create/${r.channel._id}">
          <i class="material-icons">create</i>
          <div class="fab-text">Create Item</div>
        </a>
      </div>
    `:t``} 


    <div class="page-content hide-toolbar-on-scroll">

      <div class="item-show">

        <div class="left">
          <div class="card animation-card">
            <div class="card-content ${r.item.coverImageAsAnimation?t`card-content-padding`:t` `}">
  
              ${r.item.coverImageAsAnimation?t`
                <div class="animation-content animation-image">
                  <img src="${r.coverImage?.url}" />
                </div>
               
              `:t`
                <div class="animation-content" innerHTML="${r.animationContentHTML}"></div>
  
              `}
  
            </div>
  
  
          </div> 
  
          <div class="block split-row-both">
  
            ${r.previous?t`
              <a class="button button-outline back-token-button margin-bottom color-gray" href="/admin/channel/show/${r.channel._id}/${r.previous}">
                <i class="icon f7-icons color-blue">arrow_left</i>
              </a>
            `:t`<span />`}
  
    
            ${r.next?t`
              <a class="button button-fill continue-button margin-bottom" href="/admin/channel/show/${r.channel._id}/${r.next}" data-transition="f7-cover">
                Continue <i class="f7-icons">arrow_right</i>
              </a>
            `:t`<span />`}
  
          </div>
        </div>

        <div class="right">

          <${ga} channel=${r.channel._id} item=${r} />
  
  
          ${r.previous||r.next?t`
            
            <div class="card large-only">
              <div class="card-content card-content-padding">
                <div class="segmented">
  
                  ${r.previous?t`
                    <a class="button button-outline" href="/admin/channel/show/${r.channel._id}/${r.previous}">
                      <i class="icon f7-icons">arrow_left</i>
                    </a>
                  `:t`
                    <a class="button button-outline" href="#"></a>
                  `}
        
                  ${r.next?t`
                    <a class="button button-outline" href="/admin/channel/show/${r.channel._id}/${r.next}" data-transition="f7-cover">
                      <i class="f7-icons">arrow_right</i>
                    </a>
                  `:t`
                    <a class="button button-outline" href="#"></a>
                  `}
  
                </div>
              </div>
            </div>
  
          `:t`<span />`}
  
  
          ${r.editable?t`
            <div class="card">
              <div class="card-header">Modify</div>
              <div class="card-content card-content-padding">
  
                <div class="segmented col-100">
  
                  <a class="button button-outline " href="/admin/channel/${r.channel._id}/item/edit/${r.item._id}" id="edit-${r.item._id}">Edit</a>
                  <a class="button button-outline " href="#" data-id="${r.item._id}" @click="${p}">Clone</a>
  
                  ${r.canDelete?t`
                    <a class="button button-outline" @click="${d}">
                      <i class="material-icons">delete</i>
                    </a>
                  `:t`<span/>`}
  
                </div>
  
                ${r.canDelete?t`<span />`:t`
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
  
                  ${r?.authorDisplayName?t`
                    <tr>
                      <td class="label-cell">Creator:</td> 
                      <td><a href="/admin/author/show/${r?.author?._id}">${r?.authorDisplayName}</a></td>
                    </tr>  
                  `:t`<span />`}
  
                  <tr>
                    <td class="label-cell">Date:</td> 
                    <td><span class="date">${r.dateDisplay}</span></td>
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
                <div class="value">#${r.item.tokenId}</div>
              </div>
  
              ${r.attributeSelections?.map((e=>t`
  
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
  
          ${r.themes?.length>0?t`
  
            <div class="card">
              <div class="card-header">Theme(s)</div>
              <div class="card-content">
                
                ${r.themes?.map((e=>t`
  
                  <div class="button-outline attribute-value">
                    <div class="value">${e.name}</div> <span class="theme-id">${e._id}</span>
                  </div>
  
                `))}
              </div>
            </div>
  
          `:t`<span/>`}
  
  
  
  
          ${r.item.coverImageAsAnimation?t`<span />`:t`
            <div class="card">
              <div class="card-header">Cover Image</div>
              <div class="card-content">
                <div class="square">
                  <img src="${r.coverImage?.url}" class="cover-image-preview" />
                </div>
              </div>
            </div>
           
          `}
  
  
  
  
        </div>
  
      </div>

    </div>

  </div>

`}}Rn.id="ebb0a11586",Rn.style="\n\n\n\n\n  /* .item-card-show a {\n    color: var(--f7-text-color);\n  } */\n\n\n  .menu-dropdown-link.menu-close {\n    color: #ffffff;\n  }\n\n\n  .attribute-row {\n    font-size: 16px;\n    vertical-align: top;\n  }\n\n  .attribute-row strong {\n    width: 175px;\n    display: inline-block;\n    vertical-align: top;\n  }\n\n\n  .attribute-row .material-icons {\n    line-height: 16px;\n    display: inline-block;\n    vertical-align: middle;\n  }\n\n  .item-show-footer {\n    font-size: 14px;\n  }\n\n  .card-header {\n    line-height: 21px;\n  }\n\n  .card-header label {\n    padding-bottom: 3px;\n    margin-left: 5px;\n    float: left;\n  }\n\n  .card-header .material-icons {\n    float: left;\n  }\n\n  .item-show-token-id {\n    color: rgb(79, 79, 79);\n  }\n\n  .cover-image-preview {\n    max-width: 100%;\n  }\n\n  .animation-preview {\n    margin-left: 5px;\n    height: 500px; \n    width: 500px;\n    max-width: 100%;\n    border: 1px solid #cccccc;\n  }\n\n\n  .nft-header-row {\n    display: flex;  \n  }\n\n  .nft-header-row .left {\n    flex: 0 0 500px;\n  }\n\n  .nft-header-row .right {\n    flex: 1;\n  }\n\n  .nft-header-row .right h1 {\n    font-size: 25px;\n  }\n\n  .nft-header-row .right h4 {\n    margin-bottom: 0px;\n  }\n\n\n\n\n\n@media only screen and (max-width: 1024px) {\n\n  .nft-header-row {\n    display: block;  \n  }\n  \n  .nft-header-row .left {\n    width: 100%;\n  }\n  \n  .nft-header-row .right {\n    width: 100%;\n  }\n  \n}\n\n\n.theme-name {\n  display: block;\n}\n\n.main-header {\n\n}\n\n\n";const xn=Rn;function _n(e,{$:t,$on:i,$f7:a,$update:s}){let o,f,r=n.getInstance(Dt),c=n.getInstance(et),d=n.getInstance(l),p=(n.getInstance(oi),n.getInstance(Di)),u=n.getInstance(gi),h=(n.getInstance(wn),n.getInstance(jt)),m=n.getInstance(Ft),g=(n.getInstance(Rt),n.getWalletService(),e.itemViewModel),v=e.themes,b=!1,y=`/admin/channel/show/${g.item.channelId}/${g.item.tokenId}`,w=!1;pa.Z.configure({languages:["css"]});let S=[{text:"Home",path:"/"},{text:g.channel.title,path:`/admin/channel/show/${g.channel._id}`},{text:g.item.title?g.item.title:`#${g.item.tokenId}`,path:`/admin/channel/show/${g.channel._id}/${g.item.tokenId}`},{text:"Edit Item"}];const $=async e=>{e.preventDefault();let t=a.form.convertToData("#edit-item-form"),i=Object.assign(new Y,t);i.coverImageAsAnimation="on"!=t.coverImageAsAnimation[0],i.tokenId=parseInt(t.tokenId),i.content=r.activeEditor.getContents(),i.coverImageCSS="\n"!=o.getText()?o.getText():void 0,i.animationCSS="\n"!=f.getText()?f.getText():void 0,i.attributeSelections?i.attributeSelections=JSON.parse(i.attributeSelections).map((e=>({id:e.id,traitType:e.traitType,value:e.value}))):i.attributeSelections=[],i.contentHTML=await c.translateContent(i.content,!0);let n=await p.saveGeneratedCoverImage(i);i.coverImageGenerated=n.generated,i.coverImageAsAnimation||await p.saveAnimation(i);try{d.showSpinner(),await p.put({channel:g.channel,item:i,updateQueryCache:!0,publish:!1});a.toast.show({text:"Item saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate(`/admin/channel/show/${i.channelId}/${i.tokenId}`)}catch(e){console.log(e),a.dialog.alert(e.errors,"There was an error")}};return i("pageInit",(async(e,i)=>{r.buildQuillPostEditor("#edit-item-editor","#edit-item-toolbar"),r.activeEditor.setContents(g.item.content),r.activeEditor.on("selection-change",(e=>{document.dispatchEvent(new CustomEvent("load-cover-images"))})),r.activeEditor.on("text-change",((e,t,i)=>{if(document.dispatchEvent(new CustomEvent("load-cover-images")),"user"!==i)return;let a=r.activeEditor.getContents();const n=function(e){return e.ops.filter((e=>e.insert&&e.insert.ipfsimage)).map((e=>e.insert.ipfsimage))}(r.activeEditor.getContents().diff(t)),o=[];for(let e of n){let i=t.ops.filter((t=>t.insert&&t.insert.ipfsimage&&t.insert.ipfsimage.cid==e.cid)),n=a.ops.filter((t=>t.insert&&t.insert.ipfsimage&&t.insert.ipfsimage.cid==e.cid));i.length>0&&0==n.length&&o.push(e)}o.forEach((e=>{g.images=g.images.filter((t=>t.cid!=e.cid)),e.cid==g.coverImage?.cid&&(g.coverImage=void 0)})),s()})),t(".image-button").off("click"),t(".image-button-input").off("click"),t(".ai-button").off("click"),t(".image-button").on("click",(function(e){e.preventDefault();t(".image-button-input").click()})),t(".image-button-input").on("change",(async function(e){e.preventDefault(),await r.imageSelected(this)})),t(".ai-button").on("click",(async function(e){e.preventDefault();const t=new CustomEvent("set-ai-prompt");document.dispatchEvent(t),a.popup.open(".ai-popup")})),o=new(at())("#cover-image-edit-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>pa.Z.highlightAuto(e).value},toolbar:!1}}),o.on("text-change",((e,t,i)=>{document.dispatchEvent(new CustomEvent("update-cover-image-css",{detail:{coverImageCSS:"\n"!=o.getText()?o.getText():void 0}}))})),f=new(at())("#animation-edit-css-editor",{bounds:".page-content",theme:"snow",modules:{syntax:{highlight:e=>pa.Z.highlightAuto(e).value},toolbar:!1}}),g.item.coverImageCSS&&o.setText(g.item.coverImageCSS),g.item.animationCSS&&f.setText(g.item.animationCSS),await s(),d.showSpinner(),await u.init(),b=null!=u.ipfs;const n=new CustomEvent("ipfs-ready");document.dispatchEvent(n);const c=await h.get();if(w=null!=c?.huggingFace,c?.huggingFace?.length>0){await m.init();const e=new CustomEvent("hugging-face-ready");document.dispatchEvent(e)}d.hideSpinner(),await s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="admin-edit-post">

    <${aa} breadcrumbs=${S} />

    <div class="page-content hide-toolbar-on-scroll">

      <form class="list media-list" id="edit-item-form" @submit="${$}">

        <${$n} item=${g} 
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

`}}_n.id="87b6fd4fac",_n.style="\n  #edit-item-editor {\n    min-height: 175px;\n    height: 100%;\n    /* added these styles */\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n  }\n";const Pn=_n;var Cn=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},jn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Tn=class{itemWebService;themeService;schemaService;constructor(e,t,i){this.itemWebService=e,this.themeService=t,this.schemaService=i}async create(){return new ea((async e=>{await this.schemaService.loadChannel(e.params.channelId);let t=await this.itemWebService.getNewViewModel(e.params.channelId);return{itemViewModel:t,themes:await this.themeService.listByChannel(t.channel._id,1e3,0)}}),In)}async show(){return new ea((async e=>(await this.schemaService.loadChannel(e.params.channelId),{itemViewModel:await this.itemWebService.getNavigation(e.params.channelId,parseInt(e.params.tokenId))})),xn)}async edit(){return new ea((async e=>{await this.schemaService.loadChannel(e.params.channelId);let t=await this.itemWebService.get(e.params.id);return{itemViewModel:t,themes:await this.themeService.listByChannel(t.channel._id,1e3,0)}}),Pn)}};function An(e,{$:t,$on:i,$f7:a,$update:n}){let s=e.authorViewModel,o=[{text:"Home",path:"/"},{text:"Author Profile"}];return function(t){t.$;var i=t.$h;t.$root,t.$f7,t.$f7route,t.$f7router,t.$theme,t.$update,t.$store;return i`
    <div class="page" data-name="profile-show">

        <${aa} breadcrumbs=${o} active="profile" />

        <div class="page-content hide-toolbar-on-scroll">

            ${s.author._id?i`

                <div class="block row">
                    <div class="col-20">

                        ${s.authorPhoto?i`
                            <img src="${s.authorPhoto.url}" class="profile-pic-main" />
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
`}}Cn([ta("/admin/item/create/:channelId"),jn("design:type",Function),jn("design:paramtypes",[]),jn("design:returntype",Promise)],Tn.prototype,"create",null),Cn([ta("/admin/channel/show/:channelId/:tokenId"),jn("design:type",Function),jn("design:paramtypes",[]),jn("design:returntype",Promise)],Tn.prototype,"show",null),Cn([ta("/admin/channel/:channelId/item/edit/:id"),jn("design:type",Function),jn("design:paramtypes",[]),jn("design:returntype",Promise)],Tn.prototype,"edit",null),Tn=Cn([(0,s.b)(),jn("design:paramtypes",[Di,$t,Ne])],Tn),An.id="0e4c80007f",An.style="\n    \n  .profile-pic-edit, #profile-pic--edit-not-found {\n    max-width: 300px;\n    border-radius: 50%;\n    font-size: 100px;\n    float: left;\n  }\n  \n  \n  .profile-pic-main, #profile-pic-not-found {\n    max-width: 100%;\n    border-radius: 50%;\n    font-size: 100px;\n    float: left;\n  }\n  \n  .profile-name {\n    color: var(--f7-block-title-medium-text-color);\n    font-weight: bold;\n  }\n  \n  .profile-address {\n    color: var(--f7-list-item-text-text-color);\n    font-size: 13px;\n  }\n  \n  \n  .profile-pic-wrapper {\n    width: 115px;\n    float: left;\n    padding-right: 20px;\n  }\n\n";const Fn=An;function On(e,{$:t,$on:i,$f7:a,$update:s}){let o=n.getInstance(Ht),f=n.getInstance(Rt),r=n.getInstance(Kt),c=n.getWalletService(),l=e.authorViewModel,d=[{text:"Home",path:"/"},{text:c.truncateEthAddress(l.author.walletAddress),path:`/admin/author/show/${l.author.walletAddress}`},{text:"Edit Profile"}];const p=async t=>{t.preventDefault();let i=Object.assign(new R,a.form.convertToData("#edit-author-form"));try{await r.put(i);a.toast.show({text:"Profile Saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate(`/admin/${e.channelId}/author/show/${i._id}`)}catch(e){console.log(e),a.dialog.alert(e.errors,"There was an error")}},u=async e=>{t("#author-photo-browse").click()},h=async e=>{let t=await o.uploadFile(document.getElementById("author-photo-browse")),i=await f.newFromBuffer(t);try{await f.put(i)}catch(e){}l.authorPhoto={cid:i.cid,url:await f.getUrl(i)},s()};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`
    <div class="page" data-name="profile-edit">

        <${aa} breadcrumbs=${d} active="profile" />


        <div class="page-content hide-toolbar-on-scroll">

            <div class="block-title block-title-medium">Edit Profile</div>
            <form id="edit-author-form" @submit="${p}">

                <input type="hidden" name="_id" value="${l.author._id}" />
                <input type="hidden" name="_rev" value="${l.author._rev}" />

                <input type="hidden" name="walletAddress" value="${l.author.walletAddress}" />

                <div class="card">
                    <div class="card-content">
                        <div class="list">
                            <ul>
        
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Avatar</div>
                                            <div class="item-input-wrap">
            
                                                ${l.authorPhoto?t`
                                                <img class="author-photo-preview"
                                                    src="${l.authorPhoto.url}" />
                                                `:t`
                                                <i class="material-icons author-photo-preview">image</i>
                                                `}
            
                                                <input type="button" class="button button-fill browse-file" value="Browse"
                                                    @click="${u}" tabindex="1" />
                                                <input type="hidden" name="coverPhotoId"
                                                    value="${l?.authorPhoto?.cid}" />
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
                                                <input type="text" name="name" value="${l.author.name}" placeholder="Enter your name" tabindex="2" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Description</div>
                                            <div class="item-input-wrap">
                                                <textarea name="description" placeholder="Enter a short bio" tabindex="3">${l.author.description}</textarea>
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

                    <a href="/admin/author/show/${l.author.walletAddress}" class="button button-outline color-gray" tabindex="4">Cancel</a>
      
                    <button type="submit" class="button button-fill" tabindex="5">
                      Save
                    </button>
      
                </div>


            </form>

        </div>

    </div>
`}}On.id="b070c83a09",On.style="\n    .author-photo-preview {\n        max-width: 100%;\n        max-height: 200px;\n        border: 1px solid #cccccc;\n        padding: 5px;\n        margin-bottom: 10px;\n    }\n";const En=On;var Dn=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Bn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Mn=class{authorWebService;schemaService;constructor(e,t){this.authorWebService=e,this.schemaService=t}async show(){return new ea((async e=>{let t;await this.schemaService.loadChannel(e.params.channelId);try{t=await this.authorWebService.get(e.params.id)}catch(e){console.log(e)}return t||(t=Object.assign(new R,{author:{walletAddress:e.params.id}})),{authorViewModel:t}}),Fn)}async edit(){return new ea((async e=>{let t;await this.schemaService.loadChannel(e.params.channelId);try{t=await this.authorWebService.get(e.params.id)}catch(e){}return t||(t=Object.assign(new R,{author:{walletAddress:e.params.id}})),{authorViewModel:t}}),En)}};function Nn(e,{$:t,$on:i,$f7:a,$update:s}){let o=n.getInstance(jt),f=n.getInstance(gi),r=e.settings,c=[{text:"Home",path:"/"},{text:"Settings"}];const l=async e=>{e.preventDefault();let t=a.form.convertToData("#edit-settings-form"),i={_id:t._id,_rev:t._rev,ipfsHost:t.ipfsHost,defaultGitProvider:t.gitProvider,gitCorsProxy:t.gitCorsProxy,gitProviders:{gitlab:{name:"gitlab",username:t.gitLabUsername,personalAccessToken:t.gitLabPersonalAccessToken},github:{name:"github",username:t.gitHubUsername,personalAccessToken:t.gitHubPersonalAccessToken}},alchemyKey:t.alchemyKey,huggingFace:t.huggingFace};try{let e=Object.assign(new M,i);await o.put(e),r?.ipfsHost!=e?.ipfsHost&&await f.clearInit();a.toast.show({text:"Settings Saved",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"});a.views.main.router.navigate("/")}catch(e){console.log(e.errors),a.dialog.alert(e,"Saving settings failed")}},d=async e=>{r.gitProvider=t(e.currentTarget).val(),await s()};return i("pageInit",(async e=>{})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="admin-settings">

        <${aa} breadcrumbs=${c} />

        <div class="page-content hide-toolbar-on-scroll">

            <div class="fixed-width-content center">

                <form id="edit-settings-form" @submit="${l}">
            
                    <input type="hidden" name="_id" value="${r?._id}" />
                    <input type="hidden" name="_rev" value="${r?._rev}" />
    
                    <div class="block-title block-title-medium">1. Configure an AI provider.</div>

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
                                                <input type="text" name="huggingFace" value="${r?.huggingFace}" placeholder="API token..." />
                                                <span class="input-clear-button"></span>
                                            </div>
                                        </div>


                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="block-title block-title-medium">2. Configure Git when ready to export a collection for hosting.</div>

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
                                                        
                                                        ${r?.defaultGitProvider&&"github"!=r?.defaultGitProvider?t`
                                                            <option value="github">GitHub</option>
                                                        `:t`
                                                            <option value="github" selected>GitHub</option>
                                                        `}
    
    
                                                        ${"gitlab"==r?.defaultGitProvider?t`
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
                                                                            value="${r.gitProviders?.github?.username}"  />
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
                                                                            value="${r.gitProviders?.github?.personalAccessToken}"  />
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
                                                                            value="${r.gitProviders?.gitlab?.username}"  />
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
                                                                            value="${r.gitProviders?.gitlab?.personalAccessToken}"  />
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

                    <div class="block-title block-title-medium">3. Configure IPFS to import existing collections.</div>
                    <div class="card">
                        <div class="card-header">Remote IPFS API</div>
                        <div class="card-content">
                            <div class="list">
                                <ul>
                                    <li class="item-content item-input item-input-with-info">

                                        <div class="item-inner">
                                            <div class="item-title item-label">URL</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="ipfsHost" value="${r?.ipfsHost}" placeholder="Example: https://localhost:5001/api/v0" />
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

                    <div class="block-title block-title-medium">4. Configure Ethereum connection.</div>
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
                                                <input type="text" name="alchemyKey" value="${r?.alchemyKey}" placeholder="API key..." />
                                                <span class="input-clear-button"></span>
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

    </div>

`}}Dn([ta("/admin/:channelId/author/show/:id"),Bn("design:type",Function),Bn("design:paramtypes",[]),Bn("design:returntype",Promise)],Mn.prototype,"show",null),Dn([ta("/admin/:channelId/author/edit/:id"),Bn("design:type",Function),Bn("design:paramtypes",[]),Bn("design:returntype",Promise)],Mn.prototype,"edit",null),Mn=Dn([(0,s.b)(),Bn("design:paramtypes",[Hi,Ne])],Mn),Nn.id="e1e022b4bb",Nn.style="\n\n\n";const Ln=Nn;var Un=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Hn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let zn=class{settingsService;constructor(e){this.settingsService=e}async show(){return new ea((async e=>{let t;try{t=await this.settingsService.get()}catch(e){}return t||(t=Object.assign(new M,{personalAccessToken:""})),{settings:t}}),Ln)}};function qn(e,{$:t,$on:i,$f7:a,$update:s}){let o=n.getInstance(l),f=n.getInstance(gi),r=e.peers,c=e.peerCount,d=e.addresses,p=[{text:"Home",path:"/"},{text:"IPFS"}];const u=async e=>{console.log("Add peer submit"),document.getElementById("peerAddressInput").setCustomValidity("");let t=document.getElementById("peerAddressInput").value;if(t)try{await f.ipfs.swarm.connect(t),o.showPopup(`Successfully connected to peer ${t}`),console.log("Connected to peer")}catch(e){o.showExceptionPopup(e)}};return t(document).on("update-peers",(async e=>{r=e.detail.peers,c=e.detail.count,d=e.detail.addresses,s()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="connect">

        <${aa} breadcrumbs=${p}  />


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

                    <div class="block-title">IPFS Peers <span class="badge peers-badge color-blue">${c}</span>
                    </div>
                    <div class="block list media-list peer-list">
                        <ul>
                            ${r?.map((e=>t`
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

`}}Un([ta("/admin/settings"),Hn("design:type",Function),Hn("design:paramtypes",[]),Hn("design:returntype",Promise)],zn.prototype,"show",null),zn=Un([(0,s.b)(),Hn("design:paramtypes",[jt])],zn),qn.id="4715b2d838";const Gn=qn;var Jn=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Wn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Zn=class{ipfsService;constructor(e){this.ipfsService=e}async show(){return new ea((async e=>{if(!this.ipfsService.ipfs)return{};let t=await this.ipfsService.ipfs.swarm.peers(),i=await this.ipfsService.ipfs.id();return{peers:t.map((e=>e.addr.toString())),peerCount:t.length,addresses:i?.addresses?.map((e=>e.toString()))}}),Gn)}};function Vn(e,{$:t,$h:i,$on:a,$f7:s,$update:o}){let f,r=e.channelViewModel,c=[{text:"Home",path:"/"},{text:r.channel.title,path:`/admin/channel/show/${r.channel._id}`},{text:"Publish"}];return a("pageInit",(async(e,t)=>{f=n.getWalletService(),await o()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">
  
      <${aa} breadcrumbs=${c}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        <div class="fixed-width-content center">

          ${r.itemCount>0?t`
          
            <div class="block-title block-title-medium">Configure Git</div>
            <div class="block list media-list">
              <ul>
                <li>
                  <a href="/admin/publish/fork-reader/${r.channel._id}" class="item-link">
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
                          
                            ${r?.gitProvider?t`
                              <strong>Provider:</strong>  ${r?.gitProvider.name} <br />
                            `:t` `}
  
                            ${r.channel.httpUrlToRepo?t`
                              <strong>Repository:</strong>  ${r.channel.httpUrlToRepo}
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
                  <a href="/admin/publish/export/${r.channel._id}" class="item-link">
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
  
            ${f?.address?t`
              
              <div class="block list media-list">
                <ul>
                  <li>
                    <a href="/admin/publish/contract/${r.channel._id}" class="item-link">
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
  
  `}}Jn([ta("/admin/connect"),Wn("design:type",Function),Wn("design:paramtypes",[]),Wn("design:returntype",Promise)],Zn.prototype,"show",null),Zn=Jn([(0,s.b)(),Wn("design:paramtypes",[gi])],Zn),Vn.id="687b2c41ac";const Yn=Vn;function Kn(e,{$:t,$h:i,$on:a,$f7:s,$update:o}){let f,r=n.getInstance(pi),c=(n.getInstance(gi),n.getInstance(Ze),n.getInstance(Vi),n.getInstance(wn)),l=e.channelViewModel,d=e.settings,p=!1,u=!1,h="",m=!1,g="pending"==l?.channel.publishReaderIPFSStatus?.status,v=l.itemCount>0,b=l?.gitProvider?.personalAccessToken?.length>0,y=l?.channel?.httpUrlToRepo?.length>0,w=v&&b&&y,S=[{text:"Home",path:"/"},{text:l.channel.title,path:`/admin/channel/show/${l.channel._id}`},{text:"Publish",path:`/admin/publish/${l.channel._id}`},{text:"Export"}];a("pageInit",(async()=>{m=!1,await o(),await k()})),a("pageAfterOut",((e,t)=>{console.log("Unloading page"),m=!0}));const $=async e=>{e.preventDefault();s.form.convertToData("#export-form");p=!0,await o();let t=document.getElementsByClassName("publish-label")[0];s.preloader.showIn(t);try{let e=await c.deployReader(l.channel);l.channel.publishReaderIPFSStatus={status:"pending",headSha:e},console.log(l.channel.publishReaderIPFSStatus),await r.put(l.channel)}catch(e){console.log(e),s.dialog.alert(e.message,"There was an error")}s.preloader.hideIn(t),p=!1,g=!0,await k(),await o()};t(document).on("publish-progress",(async e=>{e.detail.message&&(h=`<p>${e.detail.message}</p>`),f=e.detail.publishStatus,o();let i=document.getElementById("ipfs-publish-process");i&&t(i).scrollTop(i.scrollHeight)}));const k=async e=>{if(m)return;if(!d)return;if("complete"==l.channel.publishReaderIPFSStatus?.status)return;if(p)return;if(u)return;let t=await r.getGitProviderCredentials(l.channel,d);if(t&&t.personalAccessToken&&!(t.personalAccessToken.length<1)){console.log("Checking IPFS action workflow status..."),u=!0;try{if(l.channel=await r.get(l.channel._id),"finished"==await c.getIPFSActionStatus(l.channel)){l.channel.contractAddress||(l.channel.publishReaderIPFSStatus=await c.getIPFSActionResult(l.channel)),l.channel.publishReaderIPFSStatus.status="complete",await r.put(l.channel),await o();let e=document.getElementsByClassName("content-card-padding")[0];s.preloader.hideIn(e)}}catch(e){console.log(e)}await o(),u=!1,"complete"!=l.channel.publishReaderIPFSStatus?.status&&setTimeout(k,5e3)}};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">

        <${aa} breadcrumbs=${S}  />

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
                                <strong>Provider:</strong>  ${l?.gitProvider.name} <br />
                                <strong>Repository:</strong>   <a href="${l.channel.httpUrlToRepo}" class="link external" target="_blank">${l.channel.httpUrlToRepo}</a><br />
                                <strong>Branch:</strong>   ${l.channel.publishReaderRepoBranch}
                            </div>
                        </div>
        
    
                        <div class="card card-header-divider">
                            <div class="card-header">Export Status</div>
                            <div class="card-content card-content-padding">      

                                ${p?t`
                                    <div class="publish-label">
                                        Exporting...
                                    </div>
    
                                    ${f?t`
    
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
                                                    <tr class="${f.images.saved==f.images.total&&f.images.total>0?"complete":""}">
                                                        <td class="label-cell">Images</td>
                                                        <td class="numeric-cell">${f.images.saved}</td>
                                                        <td class="numeric-cell">${f.images.total}</td>
                                                    </tr>
                                                    <tr class="${f.animations.saved==f.animations.total&&f.animations.total>0?"complete":""}">
                                                        <td class="label-cell">Animations</td>
                                                        <td class="numeric-cell">${f.animations.saved}</td>
                                                        <td class="numeric-cell">${f.animations.total}</td>
                                                    </tr>
                                                    <tr class="${f.nftMetadata.saved==f.nftMetadata.total&&f.nftMetadata.total>0?"complete":""}">
                                                        <td class="label-cell">NFT Metadata</td>
                                                        <td class="numeric-cell">${f.nftMetadata.saved}</td>
                                                        <td class="numeric-cell">${f.nftMetadata.total}</td>
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
                                                    <tr class="${f.contractMetadata.saved==f.contractMetadata.total&&f.contractMetadata.total>0?"complete":""}">
                                                        <td class="label-cell">Contract Metadata</td>
                                                        <td class="numeric-cell">${f.contractMetadata.total}</td>
                                                    </tr>
                                                    <tr class="${f.backups.items.saved==f.backups.items.total&&f.backups.items.total>0?"complete":""}">
                                                        <td class="label-cell">Items</td>
                                                        <td class="numeric-cell">${f.backups.items.total}</td>
                                                    </tr>
                                                    <tr class="${f.backups.images.saved==f.backups.images.total&&f.backups.images.total>0?"complete":""}">
                                                        <td class="label-cell">Image Metadata</td>
                                                        <td class="numeric-cell">${f.backups.images.total}</td>
                                                    </tr>
                                                    <tr class="${f.backups.animations.saved==f.backups.animations.total&&f.backups.animations.total>0?"complete":""}">
                                                        <td class="label-cell">Animations Metadata</td>
                                                        <td class="numeric-cell">${f.backups.animations.total}</td>
                                                    </tr>
                                                    <tr class="${f.backups.themes.saved==f.backups.themes.total&&f.backups.themes.total>0?"complete":""}">
                                                        <td class="label-cell">Themes</td>
                                                        <td class="numeric-cell">${f.backups.themes.total}</td>
                                                    </tr>
                                                    <tr class="${f.backups.staticPages.saved==f.backups.staticPages.total&&f.backups.staticPages.total>0?"complete":""}">
                                                        <td class="label-cell">Static Pages</td>
                                                        <td class="numeric-cell">${f.backups.staticPages.total}</td>
                                                    </tr>
                                                    <tr class="${f.backups.channels.saved==f.backups.channels.total&&f.backups.channels.total>0?"complete":""}">
                                                        <td class="label-cell">Channels</td>
                                                        <td class="numeric-cell">${f.backups.channels.total}</td>
                                                    </tr>
    
                                                    ${f.backups.authors.total?t`
    
                                                        <tr class="${f.backups.authors.saved==f.backups.authors.total&&f.backups.authors.total>0?"complete":""}">
                                                            <td class="label-cell">Authors</td>
                                                            <td class="numeric-cell">${f.backups.authors.total}</td>
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
    
    
                                ${l.channel.publishReaderIPFSStatus?.status?t`
    
                                    <div class="pin-status"> 
                                        <strong>Build Status:</strong> ${l.channel.publishReaderIPFSStatus?.status}<br />

                                        ${"complete"==l.channel.publishReaderIPFSStatus?.status&&l.channel.publishReaderIPFSStatus?.cid?t`
                                            <strong>IPFS cid:</strong> ${l.channel.publishReaderIPFSStatus?.cid}<br />
                                            <strong>Archive:</strong> <a href="${l.channel.publishReaderIPFSStatus?.archive}" class="link external">${l.channel.publishReaderIPFSStatus?.archive}</a><br />
                                            <strong>Date:</strong> ${yi()(l.channel.publishReaderIPFSStatus?.date).format("MMMM Do YYYY, h:mm:ss a")}
                                        `:t` `}

                                    </div>
    
                                `:t`<span />`}
    
    
                                ${p?t`
                                    <p></p>
                                `:t`
    
                                    
                                    ${g?t`
        
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

`}}Kn.id="b43fa1db88",Kn.style="\n    .deploy-button {\n        margin-top: 10px;\n        width: 200px;\n    }\n\n    .publish-label,\n    .ipfs-label,\n    .forking-label {\n        margin-top: 10px;\n        margin-bottom: 10px;\n        font-weight: bold;\n        font-size: 18px;\n    }\n\n    .publish-output {\n        border: 1px solid #cccccc;\n        font-size: 13px;\n        width: 100%;\n        max-width: 100%;\n        padding: 5px;\n        height: 100px;\n        overflow-y: scroll;\n    }\n\n    .publish-status {\n        font-size: 14px;\n        padding: 10px;\n        border: 1px solid #f1f1f1;\n    }\n\n    .publish-status .item label {\n        font-weight: bold;\n        display: inline-block;\n        width: 180px;\n    }\n\n    /* #export-refresh-button {\n        width: 45px;\n        height: 30px;\n        display: inline-block;\n        margin-left: 5px;\n        padding-top: 2.5px;\n    } */\n\n    #export-next-button {\n        width: 200px;\n        float: right;\n    }\n\n";const Qn=Kn;var Xn=i(76551),es=i.n(Xn),ts=i(26470),is=i.n(ts),as=i(26015),ns=i(48764).Buffer,ss=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},os=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},fs=function(e,t){return function(i,a){t(i,a,e)}};let rs=class{channelService;itemService;ipfsService;imageService;animationService;exportService;settingsService;walletService;constructor(e,t,i,a,n,s,o,f){this.channelService=e,this.itemService=t,this.ipfsService=i,this.imageService=a,this.animationService=n,this.exportService=s,this.settingsService=o,this.walletService=f}async publish(e,t){this.logPublishProgress(void 0,"Preparing export...");let i=await this.exportService.prepareExport(e,this.walletService.address),a=await this.getFeeReceipient(i.channel,i.ownerAddress);a&&this.logPublishProgress(void 0,`Fee Recipient: ${a}`),this.logPublishProgress(void 0,"Preparing backup...");let n,s=await this.exportService.createBackup(i);return e.contractAddress?e.publishReaderIPFSStatus?.cid&&(n={cid:e.publishReaderIPFSStatus.cid,imageDirectoryCid:e.publishReaderIPFSStatus.imageDirectoryCid,animationDirectoryCid:e.publishReaderIPFSStatus.animationDirectoryCid}):(this.logPublishProgress(void 0,"Exporting to IPFS..."),n=await this.exportToIPFS(i,s,a)),this.logPublishProgress(void 0,"Exporting to file system..."),await this.exportToFS(t,e,i,s,a,n),{cids:n}}async exportToIPFS(e,t,i){let a=!0,n=this.getIPFSDirectory(e.channel);try{await this.ipfsService.ipfs.files.read(n),await this.ipfsService.ipfs.files.rm(n,{recursive:!0,flush:!0})}catch(e){}let s={contractMetadata:{saved:0,total:1},nftMetadata:{saved:0,total:e.itemIds.length},images:{saved:0,total:e.imageCids.length},animations:{saved:0,total:e.animationCids.length},backups:{channels:{saved:0,total:1},authors:{saved:0,total:1},items:{saved:0,total:t.itemCount},images:{saved:0,total:e.imageCids.length},animations:{saved:0,total:e.animationCids.length},themes:{saved:0,total:t.themeCount},staticPages:{saved:0,total:t.staticPageCount}}};this.logPublishProgress(s),await this._publishImagesIPFS(s,n,e.imageCids,!0),await this._publishAnimationsIPFS(s,n,e.animationCids,!0);let o=await this.getImageDirectoryCid(n),f=await this.getAnimationDirectoryCid(n);await this._publishNFTMetadataIPFS(s,n,e.channel,e.itemIds,f,o,!0);let r=`${n}/contractMetadata.json`,c=await this.channelService.exportContractMetadata(e.channel,i,o);await this.ipfsService.ipfs.files.write(r,(new TextEncoder).encode(JSON.stringify(c)),{create:!0,parents:!0,flush:a});let l=await this.ipfsService.ipfs.files.stat(r);s.contractMetadata.saved=1,this.logPublishProgress(s,`Saving contract metadata to ${r} (${l.cid})`),await this.ipfsService.ipfs.files.write(`${n}/backup/channels.json`,(new TextEncoder).encode(JSON.stringify(t.channels)),{create:!0,parents:!0,flush:a}),s.backups.channels.saved=1,this.logPublishProgress(s),await this.ipfsService.ipfs.files.write(`${n}/backup/authors.json`,(new TextEncoder).encode(JSON.stringify(t.authors)),{create:!0,parents:!0,flush:a}),s.backups.authors.saved=1,this.logPublishProgress(s),await this.ipfsService.ipfs.files.write(`${n}/backup/items.json`,(new TextEncoder).encode(JSON.stringify(t.items)),{create:!0,parents:!0,flush:a}),s.backups.items.saved=t.itemCount,this.logPublishProgress(s),await this.ipfsService.ipfs.files.write(`${n}/backup/images.json`,(new TextEncoder).encode(JSON.stringify(t.images)),{create:!0,parents:!0,flush:a}),s.backups.images.saved=t.imageCount,this.logPublishProgress(s),await this.ipfsService.ipfs.files.write(`${n}/backup/animations.json`,(new TextEncoder).encode(JSON.stringify(t.animations)),{create:!0,parents:!0,flush:a}),s.backups.animations.saved=t.animationCount,this.logPublishProgress(s),await this.ipfsService.ipfs.files.write(`${n}/backup/themes.json`,(new TextEncoder).encode(JSON.stringify(t.themes)),{create:!0,parents:!0,flush:a}),s.backups.themes.saved=t.themeCount,this.logPublishProgress(s),await this.ipfsService.ipfs.files.write(`${n}/backup/static-pages.json`,(new TextEncoder).encode(JSON.stringify(t.staticPages)),{create:!0,parents:!0,flush:a}),s.backups.staticPages.saved=t.staticPageCount,this.logPublishProgress(s),this.logPublishProgress(s,"Flushing to IPFS..."),await this.ipfsService.ipfs.files.flush(`/export/${e.channel._id}/`);let d=await this.ipfsService.ipfs.files.stat(`/export/${e.channel._id}/`,{hash:!0});return this.logPublishProgress(s,`Published to local IPFS at ${d.cid.toString()}`),{cid:d.cid.toString(),imageDirectoryCid:o.cid.toString(),animationDirectoryCid:f.cid.toString()}}async exportToFS(e,t,i,a,n,s){await this._publishImagesFS(e,i.imageCids),await this._publishAnimationsFS(e,i.animationCids),await this._publishNFTMetadataFS(e,i.channel,i.itemIds,s?.animationDirectoryCid,s?.imageDirectoryCid);let o=await this.channelService.exportContractMetadata(i.channel,n,s?.imageDirectoryCid);await this._writeFSAction({file_path:`${e}/backup/export/contractMetadata.json`,content:ns.from(JSON.stringify(o))}),t.contractAddress?(await this._writeFSAction({file_path:`${e}/backup/contract/contract.json`,content:ns.from(JSON.stringify({contractAddress:t.contractAddress,ipfsCid:t.publishReaderIPFSStatus?.cid}))}),await this._writeFSAction({file_path:`${e}/backup/contract/contract-abi.json`,content:ns.from(JSON.stringify(as))})):(await this._writeFSAction({file_path:`${e}/backup/contract/contract.json`,content:ns.from(JSON.stringify({}))}),await this._writeFSAction({file_path:`${e}/backup/contract/contract-abi.json`,content:ns.from(JSON.stringify({}))}));let f=await(async e=>{let t,i=await this.settingsService.get();switch(t=e.gitProvider&&"default"!=e.gitProvider?e.gitProvider:i.defaultGitProvider?i.defaultGitProvider:"github",t){case"gitlab":if(!e.httpUrlToRepo)return;return{hostname:`https://${a=e.httpUrlToRepo,a.replace("https://gitlab.com/","").split("/")[0]}.gitlab.io`,baseURI:`/${e.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}/`};case"github":function n(e){return e.replace("https://github.com/","").split("/")[0]}if(!e.httpUrlToRepo)return;return{hostname:`https://${n(e.httpUrlToRepo)}.github.io`,baseURI:`/${e.title.replace(/[^a-z0-9]/gi,"-").toLowerCase()}/`}}var a})(t);await this._writeFSAction({file_path:`${e}/large-config.json`,content:ns.from(JSON.stringify({showMintPage:t.showMintPage,showActivityPage:t.showActivityPage,hostname:t.productionHostname?t.productionHostname:f?.hostname,libraryURL:t.productionBaseLibraryURI,baseURL:t.productionBaseURI?t.productionBaseURI:f?.baseURI,externalLinks:t.externalLinks,marketplaces:t.marketplaces}))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/channels.json`,content:ns.from(JSON.stringify(a.channels))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/authors.json`,content:ns.from(JSON.stringify(a.authors))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/items.json`,content:ns.from(JSON.stringify(a.items))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/images.json`,content:ns.from(JSON.stringify(a.images))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/animations.json`,content:ns.from(JSON.stringify(a.animations))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/themes.json`,content:ns.from(JSON.stringify(a.themes))}),await this._writeFSAction({file_path:`${e}/backup/export/backup/static-pages.json`,content:ns.from(JSON.stringify(a.staticPages))})}getIPFSDirectory(e){return`/export/${e._id}`}async getAnimationDirectoryCid(e){let t;try{t=(await this.ipfsService.ipfs.files.stat(`${e}/animations/`,{hash:!0})).cid.toString()}catch(e){}return t}async getImageDirectoryCid(e){let t;try{t=(await this.ipfsService.ipfs.files.stat(`${e}/images/`,{hash:!0})).cid.toString()}catch(e){}return t}async getFeeReceipient(e,t){let i;return"existing"==e.forkType?e.forkedFromFeeRecipient&&(i=e.forkedFromFeeRecipient):i=t,i}async _publishAnimationsIPFS(e,t,i,a){this.logPublishProgress(e,`Exporting ${i.length} animations`);for(let n of i){let i,s=await this.animationService.get(n),o=`${t}/animations/${s.cid}.html`,f={content:s.content};try{i=await this.ipfsService.ipfs.files.stat(o,{hash:!0})}catch(e){}if(i?.cid.toString())this.logPublishProgress(e,`${o} already exists. Skipping...`);else{const i=await this.ipfsService.ipfs.add(f);if(await this.ipfsService.ipfs.files.cp(`/ipfs/${i.cid.toString()}`,o,{parents:!0,flush:a}),i.cid.toString()!==s.cid.toString())throw new Error(`Incorrect cid when saving animation. Expected: ${s.cid}, Result: ${i.cid.toString()}`);this.logPublishProgress(e,`Saving animation #${e.animations.saved} to ${t}/animations/${s.cid}.html (${s.cid})`)}e.animations.saved++}}async _publishAnimationsFS(e,t){for(let i of t){let t=await this.animationService.get(i),a={content:t.content};await this._writeFSAction({file_path:`${e}/backup/export/animations/${t.cid}.html`,content:ns.from(a.content)})}}async _publishImagesIPFS(e,t,i,a){for(let n of i){let i,s=await this.imageService.get(n),o=`${t}/images/${s.cid}.${s.buffer?"jpg":"svg"}`;try{i=await this.ipfsService.ipfs.files.stat(o,{hash:!0})}catch(e){}if(i?.cid.toString())this.logPublishProgress(e,`${o} already exists. Skipping...`);else{const t=await this.ipfsService.ipfs.add({content:await this.imageService.getImageContent(s)});if(await this.ipfsService.ipfs.files.cp(`/ipfs/${t.cid.toString()}`,o,{create:!0,parents:!0,flush:a}),t.cid.toString()!=s.cid)throw new Error(`Incorrect cid when saving image. Expected: ${s.cid}, Result: ${t.cid.toString()}`);this.logPublishProgress(e,`Saving image to ${o} (${s.cid})`)}e.images.saved++}}async _publishImagesFS(e,t){for(let i of t){let t=await this.imageService.get(i),a=await this.imageService.getImageContent(t);await this._writeFSAction({file_path:`${e}/backup/export/images/${t.cid}.${t.buffer?"jpg":"svg"}`,content:a})}}async _publishNFTMetadataIPFS(e,t,i,a,n,s,o){this.logPublishProgress(e,`Exporting ${a.length} metadata files`);let f={};for(let r of a){let a,c=this.exportService.prepareItem(await this.itemService.get(r)),l=`${t}/metadata/${c.tokenId}.json`,d=await this.imageService.get(c.coverImageId),p=await this.itemService.exportNFTMetadata(i,c,d,n,s),u=(new TextEncoder).encode(JSON.stringify(p)),h=await ht.of(u);f[h]=p;try{a=await this.ipfsService.ipfs.files.stat(l,{hash:!0})}catch(e){}if(a?.cid.toString()!=h){const e=await this.ipfsService.ipfs.add({content:u});await this.ipfsService.ipfs.files.cp(`/ipfs/${e.cid.toString()}`,l,{create:!0,parents:!0,flush:o})}else this.logPublishProgress(e,`${l} already exists. Skipping...`);e.nftMetadata.saved++,this.logPublishProgress(e,`Saving #${c.tokenId} to ${l}`)}return[]}async _publishNFTMetadataFS(e,t,i,a,n){for(let s of i){let i=this.exportService.prepareItem(await this.itemService.get(s)),o=await this.imageService.get(i.coverImageId),f=await this.itemService.exportNFTMetadata(t,i,o,a,n);await this._writeFSAction({file_path:`${e}/backup/export/metadata/${i.tokenId}.json`,content:ns.from(JSON.stringify(f))})}}_writeFSAction(e){es().existsSync(is().dirname(e.file_path))||es().mkdirSync(is().dirname(e.file_path),{recursive:!0}),e.keepExisting&&es().existsSync(e.file_path)||(console.log(`Writing file: ${e.file_path}`),es().writeFileSync(e.file_path,e.content))}logPublishProgress(e,t){if(t&&console.log(t),"undefined"!=typeof window&&void 0!==window.document){const i=new CustomEvent("publish-progress",{detail:{publishStatus:e,message:t}});document.dispatchEvent(i)}}};function cs(e,{$:t,$h:i,$on:a,$f7:s,$update:o}){let f=n.getInstance(pi),r=(n.getInstance(gi),n.getInstance(Ze),n.getInstance(wn)),c=(n.getInstance(rs),e.channelViewModel),l=e.settings,d=!1,p=!1,u=c.itemCount>0,h=c?.gitProvider?.personalAccessToken?.length>0,m=u&&h,g=[{text:"Home",path:"/"},{text:c.channel.title,path:`/admin/channel/show/${c.channel._id}`},{text:"Publish",path:`/admin/publish/${c.channel._id}`},{text:"Create Git Repository"}];a("pageInit",(async()=>{d=!1,await o(),await b()})),a("pageAfterOut",((e,t)=>{console.log("Unloading page"),d=!0}));const v=async e=>{e.preventDefault(),p=!0,await o();let t,i=document.getElementsByClassName("content-card-padding")[0];s.preloader.showIn(i);try{t=await r.createFork(c.channel),c.channel.publishReaderRepoId=t.id,c.channel.publishReaderRepoPath=t.path,c.channel.publishReaderRepoBranch=t.branch,c.channel.publishReaderRepoStatus="pending",await f.put(c.channel)}catch(e){s.preloader.hideIn(i),console.log(e),"Error: Request failed with status code 409"==e.toString()?s.dialog.alert("Git repo already exists with that name.","There was an error"):s.dialog.alert(e,"There was an error")}p=!1,await o(),await b()},b=async e=>{if(d)return;if(!l)return;if("complete"==c.channel.publishReaderRepoStatus&&c.channel.publishReaderRepoId>0)return;if(p)return;let t=await f.getGitProviderCredentials(c.channel,l);if(t&&t.personalAccessToken&&!(t.personalAccessToken.length<1)){console.log("Checking repo fork status...");try{if(c.channel=await f.get(c.channel._id),"finished"==await r.getForkRepoStatus(c.channel)){let e=await r.getExistingFork(c.channel);c.channel.publishReaderRepoStatus="complete",c.channel.httpUrlToRepo=e.httpUrlToRepo,await f.put(c.channel);let t=document.getElementsByClassName("content-card-padding")[0];s.preloader.hideIn(t)}}catch(e){console.log(e)}await o(),"complete"!=c.channel.publishReaderRepoStatus&&setTimeout(b,5e3)}};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="page" data-name="publish">

    <${aa} breadcrumbs=${g}  />

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
  
  
                  ${c.channel.publishReaderRepoId?t`
                    <div class="repo-status">
  
                      <p><strong>Current Repo:</strong> ${c.channel.httpUrlToRepo?t`
                        <a href="${c.channel.httpUrlToRepo}" class="link external" target="_blank">${c.channel.httpUrlToRepo}</a>
                        `:t` `}</p>
  
                      <p><strong>Configured Provider:</strong> ${c?.gitProvider?.name}</p>
  
                      <p><strong>Repo ID:</strong> ${c.channel.publishReaderRepoId}</p>
                      <p><strong>Branch:</strong>   ${c.channel.publishReaderRepoBranch}</p>
                      <p><strong>Repo Path:</strong> ${c.channel.publishReaderRepoPath}</p>
                      <p><strong>Job Status:</strong> ${c.channel.publishReaderRepoStatus}</p>
                    </div>
                  `:t`<span />`}
  
  
  
                  <div class="block cancel-save-row">
        
                    <div class="large-only"></div>
      
                    <a href="/admin/publish/${c.channel._id}" class="button button-outline color-gray" tabindex="30">
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

`}}rs=ss([(0,s.b)(),fs(7,(0,o.f)(a.WalletService)),os("design:paramtypes",[pi,oi,gi,Rt,Ri,Ti,jt,Object])],rs),cs.id="f10c8310af",cs.style="\n  .publish-label,\n  .ipfs-label,\n  .forking-label {\n    margin-top: 10px;\n    margin-bottom: 10px;\n    font-weight: bold;\n    font-size: 18px;\n  }\n\n  .publish-output {\n    border: 1px solid #cccccc;\n    font-size: 13px;\n    width: 100%;\n    max-width: 100%;\n    padding: 5px;\n    height: 300px;\n    overflow-y: scroll;\n  }\n\n  #fork-next-button {\n    width: 200px;\n  }\n";const ls=cs;function ds(e,{$:t,$h:i,$on:a,$f7:s,$update:o}){let f,r=n.getInstance(pi),c=n.getInstance(gi),l=(n.getInstance(Ze),n.getInstance(Vi),n.getInstance(wn)),d=(n.getInstance(rs),null!=c.ipfs),p=c.peerCount,u=e.channelViewModel,h=e.settings,m=!1,g="",v=u.channel.publishReaderRepoId>0&&"complete"==u.channel.publishReaderRepoStatus,b=null!=u.channel.localCid,y=u.itemCount>0,w=u?.gitProvider?.personalAccessToken?.length>0,S=h?.gitCorsProxy?.length>0,$=y&&w&&S,k=u.channel.httpUrlToRepo,I=[{text:"Home",path:"/"},{text:u.channel.title,path:`/admin/channel/show/${u.channel._id}`},{text:"Publish",path:`/admin/publish/${u.channel._id}`},{text:"Publish Collection To Reader"}];a("pageInit",(async()=>{await c.init(),d=null!=c.ipfs,f=await r.getGitProviderCredentials(u.channel,h),await o()}));const R=async e=>{e.preventDefault(),m=!0,await o();let t=document.getElementsByClassName("ipfs-label")[0];s.preloader.showIn(t);try{let e=`/export/${u.channel._id}`,t=await(0,Ta.Z)(c.ipfs.files.read(`${e}/contractMetadata.json`));await l.deployReaderGit(u.channel,t)}catch(e){console.log(e),s.dialog.alert(e,"There was an error")}s.preloader.hideIn(t),m=!1,await o()},x=async e=>{e.preventDefault();let t=document.getElementsByClassName("ipfs-label")[0];s.preloader.showIn(t);try{await l.clearGitRepos()}catch(e){s.dialog.alert(e,"There was an error")}s.preloader.hideIn(t),await o()};return t(document).on("publish-reader-progress",(async e=>{g=`<p>${e.detail.message}</p>`,o()})),t(document).on("update-peers",(async e=>{p=e.detail.count,o()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">
  
      <${aa} breadcrumbs=${I}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        ${$?t`
              
          <div class="block-title">Publish Reader</div>
          <div class="card">

            <div class="card-content card-content-padding">

              ${f?.personalAccessToken?.length>0?t`

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
  
  `}}ds.id="5171195ece",ds.style="\n\n    .publish-label, .ipfs-label, .forking-label {\n      margin-top: 10px;\n      margin-bottom: 10px;\n      font-weight: bold;\n      font-size: 18px;\n    }\n\n    .publish-output {\n      border: 1px solid #cccccc;\n      font-size: 13px;\n      width: 100%;\n      max-width: 100%;\n      padding: 5px;\n      height: 300px;\n      overflow-y : scroll;\n    }\n  ";const ps=ds;var us=i(41972),hs=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},ms=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},gs=function(e,t){return function(i,a){t(i,a,e)}};let vs=class{channelService;walletService;contracts;constructor(e,t,i){this.channelService=e,this.walletService=t,this.contracts=i}async deployContract(e){if(!e.publishReaderIPFSStatus?.cid)throw new Error("Not published to IPFS");let t=await this.channelService.countItemsByChannel(e._id);if(t<=0)throw new Error("No NFTs");let i=ca.vz(e.mintPrice,"ether"),a=await this.deploy(e.title,e.symbol,e.publishReaderIPFSStatus?.cid,i.toString(),t);e.contractAddress=a.contractAddress,e.showActivityPage=!0,e.showMintPage=!0,await this.channelService.put(e)}async deploy(e,t,i,a,n){if(!(e&&t&&a&&n&&i))throw new Error("Missing inputs to deploy");let s=this.walletService.wallet;if(!s)throw new Error("No wallet!");const o=this.contracts.Channel,f=new us.l(o.abi,o.bytecode,s);return(await f.deploy(e,t,i,BigInt(a.toString()),BigInt(n.toString()))).deploymentTransaction().wait()}};function bs(e,{$:t,$h:i,$on:a,$f7:s,$update:o}){let f,r=n.getInstance(pi),c=(n.getInstance(gi),n.getInstance(Ze)),l=(n.getInstance(Vi),n.getInstance(vs)),d=e.channelViewModel,p=!1,u=null!=d.channel.publishReaderIPFSStatus?.cid||d.channel.contractAddress,h=[{text:"Home",path:"/"},{text:d.channel.title,path:`/admin/channel/show/${d.channel._id}`},{text:"Publish",path:`/admin/publish/${d.channel._id}`},{text:"Deploy Contract"}];a("pageInit",(async(e,t)=>{f=n.getWalletService(),await o()}));const m=async e=>{p=!0,await o();let t={title:`Deploying contract ${name}. Approve transaction and wait for it to be mined.`,promise:l.deployContract(d.channel)};await c.queuePromiseView(t),p=!1,await o()},g=async e=>{d.channel.contractAddress=void 0,await r.put(d.channel),d.channel=await r.get(d.channel._id),o()};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="page" data-name="publish">
  
      <${aa} breadcrumbs=${h}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        <div class="fixed-width-content center">

          ${d.itemCount>0?t`
              
            ${f?.address?t`
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
                        <p><strong>Date Exported:</strong> ${yi()(d.channel.publishReaderIPFSStatus?.date).format("MMMM Do YYYY, h:mm:ss a")}</p>
                      </div>
  
  
                      ${d.channel.contractAddress?t`
                        <p>
                          <strong>Current Contract Address:</strong> ${d.channel.contractAddress} 
                          <a @click="${g}" class="button button-fill button-small deploy-button">Reset</a>
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
                          <button class="button button-fill button-small deploy-button" @click="${m}">Deploy Contract</button>
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
  
  `}}vs=hs([(0,s.b)(),gs(1,(0,o.f)(a.WalletService)),gs(2,(0,o.f)("contracts")),ms("design:paramtypes",[pi,Object,Object])],vs),bs.id="f493091e6f",bs.style="\n\n  ";const ys=bs;var ws=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Ss=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let $s=class{channelWebService;settingsService;schemaService;gitlabService;constructor(e,t,i,a){this.channelWebService=e,this.settingsService=t,this.schemaService=i,this.gitlabService=a}async publish(){return new ea((async e=>(await this.schemaService.loadChannel(e.params.id),{channelViewModel:await this.channelWebService.get(e.params.id)})),Yn)}async export(){return new ea((async e=>{await this.schemaService.loadChannel(e.params.id);let t,i=await this.channelWebService.get(e.params.id);try{t=await this.settingsService.get()}catch(e){}return{channelViewModel:i,settings:t}}),Qn)}async forkReader(){return new ea((async e=>{await this.schemaService.loadChannel(e.params.id);let t,i=await this.channelWebService.get(e.params.id);try{t=await this.settingsService.get()}catch(e){}return{channelViewModel:i,settings:t}}),ls)}async publishReader(){return new ea((async e=>{await this.schemaService.loadChannel(e.params.id);let t,i=await this.channelWebService.get(e.params.id);try{t=await this.settingsService.get()}catch(e){}return{channelViewModel:i,settings:t}}),ps)}async contract(){return new ea((async e=>(await this.schemaService.loadChannel(e.params.id),{channelViewModel:await this.channelWebService.get(e.params.id)})),ys)}};ws([ta("/admin/publish/:id"),Ss("design:type",Function),Ss("design:paramtypes",[]),Ss("design:returntype",Promise)],$s.prototype,"publish",null),ws([ta("/admin/publish/export/:id"),Ss("design:type",Function),Ss("design:paramtypes",[]),Ss("design:returntype",Promise)],$s.prototype,"export",null),ws([ta("/admin/publish/fork-reader/:id"),Ss("design:type",Function),Ss("design:paramtypes",[]),Ss("design:returntype",Promise)],$s.prototype,"forkReader",null),ws([ta("/admin/publish/publish-reader/:id"),Ss("design:type",Function),Ss("design:paramtypes",[]),Ss("design:returntype",Promise)],$s.prototype,"publishReader",null),ws([ta("/admin/publish/contract/:id"),Ss("design:type",Function),Ss("design:paramtypes",[]),Ss("design:returntype",Promise)],$s.prototype,"contract",null),$s=ws([(0,s.b)(),Ss("design:paramtypes",[Ni,jt,Ne,Vi])],$s);var ks=function(e,t,i,a){var n,s=arguments.length,o=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var f=e.length-1;f>=0;f--)(n=e[f])&&(o=(s<3?n(o):s>3?n(t,i,o):n(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o},Is=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Rs=class{constructor(){}buildPagingViewModel(e,t,i,a){let n=new xs;return n.offset=e||0,n.limit=t,n.count=i,n.start=n.offset+1,n.end=Math.min(n.offset+t,i),n.previousOffset=Math.max(n.offset-t,0),n.offset+t<i&&(n.nextOffset=n.offset+t),n.page=n.offset/n.limit+1,n.page>n.endPage&&(n.page=n.endPage),n.endPage=Math.ceil(n.count/n.limit),n.lastOffset=n.endPage*n.limit-n.limit,n.showNext=n.endPage>n.page,n.showPrevious=0!=n.offset,n.showFirst=n.page>2,n.showLast=n.page<n.endPage-1,n}calculateEndIndex(e,t,i){let a=t+e-1;return Math.min(i-1,a)}calculateDescendingEndIndex(e,t){let i=t-(e-1);return Math.max(0,i)}calculateDescendingOffset(e,t){let i=t-1-e;return Math.max(0,i)}};Rs=ks([(0,s.b)(),Is("design:paramtypes",[])],Rs);class xs{page;pageNumbers;endPage;offset;limit;count;start;end;previousOffset;nextOffset;lastOffset;showPrevious;showNext;showFirst;showLast}var _s=i(4079);function Ps(e,{$:t,$on:i,$f7:a,$update:s}){n.getInstance(oi);let o=n.getInstance(pi),f=n.getWalletService(),r=e.channel_view_model;const c=async e=>{a.dialog.confirm("Are you sure you want to delete this collection? This will only remove your local copy of the files.",(async()=>{a.preloader.show(),await o.delete(r.channel),a.preloader.hide(),a.views.main.router.navigate("/");a.toast.show({text:"Collection deleted",closeTimeout:2e3,closeButton:!0,position:"bottom",horizontalPosition:"left"})}))};return function(e){e.$;var t,i=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return i`

  <div class="card card-outline channel-card-show">

    <div class="card-header banner show-channel-banner-${r.channel._id}">

      <div class="float-right">
        <a class="button button-fill button-raised color-blue text-color-white border-white"
          href="/admin/publish/${r.channel._id}">Publish</a>
      </div>


      ${r?.coverImage?i`
      <img src="${r.coverImage.url}" class="avatar" />
      `:i`
      <i class="material-icons avatar">image</i>
      `}

    </div>

    <div class="card-content">

      <div class="card-content card-content-padding">
        
        <div class="float-right">

          <div class="segmented">

            ${i`
              <a class="button button-active" href="/admin/channel/edit/${r.channel._id}">Edit</a>
            `}

            <a class="button" @click="${c}">Delete</a>
          </div>

        </div>
                        
        <div class="title">${r?.channel?.title}</div>

        ${r?.authorDisplayName?i`
        <div class="name">
          By <a
            href="/admin/${r.channel._id}/author/show/${r?.author._id}">${r?.authorDisplayName}</a>
        </div>
        `:""}

        <div class="collection-info">
            <label>Items:</label><strong>${r?.itemCount}</strong>
            
            <span class="dot">·</span>
            <label>Created:</label><strong>${r.dateCreated}</strong>
  
            <span class="dot">·</span>
            <label>Forkable:</label><strong>${r.channel.disableForks?"No":"Yes"}</strong>

            ${r.channel.mintPrice?i`
              <span class="dot">·</span>
              <label>Mint Price:</label><strong>${r.channel.mintPrice} ETH</strong>
            `:i``}
  
            ${r.channel.royaltyPercent?i`
              <span class="dot">·</span>
              <label>Marketplace Creator Fee:</label><strong>${r.channel.royaltyPercent}%</strong>
            `:i``}
        </div>



        ${r.channel.descriptionHTML?i`
          <div class="description" id="channel-show-description-${r.channel._id}"
            innerHTML="${r.channel.descriptionHTML}">
          </div>
        `:i`<span />`}

            

        ${r.channel.contractAddress?i`
          <div class="contract-address">
            <strong>Contract Address:</strong> ${t=r?.channel.contractAddress,f.truncateEthAddress(t)}
          </div>
        `:i``}

        ${r.channel.localCid?i`
          <div class="contract-address">
            <strong>Last Published IPFS CID:</strong> ${r?.channel.localCid}
          </div>
        `:i``}

        ${r.channel.forkedFromCid?i`
          <div class="contract-address">
            <strong>Forked from IPFS:</strong> ${r?.channel.forkedFromCid}
          </div>
        `:i``}

        ${r.channel.forkedFromId?i`
          <div class="contract-address">
            <strong>Forked from:</strong> ${r?.channel.forkedFromId}
          </div>
        `:i``}

      </div>

    </div>

  </div>

`}}Ps.id="75df4c65c1",Ps.style="    \n";const Cs=Ps;var js=i(27725),Ts=i(68468),As=i(90831),Fs=i(53210),Os=i(36879),Es=i(74346),Ds=i(89542),Bs=i(77140),Ms=i(31910),Ns=i(59746),Ls=i(88235),Us=i(79859),Hs=i(36567),zs=i(82391),qs=i(19121),Gs=i(90263),Js=i(74496),Ws=i(75740),Zs=i(6697),Vs=i(15751),Ys=i(860),Ks=i(663),Qs=i(59771),Xs=i(98614);let eo;function to(e){if(eo)return eo;return eo=new vi.W,eo.bind("version").toConstantValue(e),eo.bind("provider").toConstantValue((()=>{if("undefined"!=typeof window&&window.ethereum)return window.web3Provider=window.ethereum,new qe.Q(window.ethereum)})),eo.bind("contracts").toConstantValue(i(26015)),eo.bind("name").toConstantValue("Large"),eo.bind("framework7").toConstantValue(new js.ZP({el:"#app",id:"large",name:"Large",theme:"auto",init:!1,component:ze,navbar:{hideOnPageScroll:!0},colors:{},darkMode:"auto"})),eo.bind("PouchDB").toConstantValue((()=>Qs.Z)),eo.bind("pouch-prefix").toConstantValue("./pouch/"),eo.bind("footer-text").toConstantValue(globalThis.footerText),eo.bind(cn).toSelf().inSingletonScope(),eo.bind(Tn).toSelf().inSingletonScope(),eo.bind(Mn).toSelf().inSingletonScope(),eo.bind(zn).toSelf().inSingletonScope(),eo.bind(Zn).toSelf().inSingletonScope(),eo.bind($s).toSelf().inSingletonScope(),eo.bind(l).toSelf().inSingletonScope(),eo.bind(Ze).toSelf().inSingletonScope(),eo.bind(et).toSelf().inSingletonScope(),eo.bind(Dt).toSelf().inSingletonScope(),eo.bind(vs).toSelf().inSingletonScope(),eo.bind(Ht).toSelf().inSingletonScope(),eo.bind(gi).toSelf().inSingletonScope(),eo.bind(y).toSelf().inSingletonScope(),eo.bind(Ne).toSelf().inSingletonScope(),eo.bind(Xi).toSelf().inSingletonScope(),eo.bind(Rs).toSelf().inSingletonScope(),eo.bind(Ua).toSelf().inSingletonScope(),eo.bind(Ti).toSelf().inSingletonScope(),eo.bind(ci).toSelf().inSingletonScope(),eo.bind(Ni).toSelf().inSingletonScope(),eo.bind(Di).toSelf().inSingletonScope(),eo.bind(Hi).toSelf().inSingletonScope(),eo.bind(a.WalletService).to(Wt).inSingletonScope(),eo.bind(Ri).toSelf().inSingletonScope(),eo.bind(Kt).toSelf().inSingletonScope(),eo.bind(pi).toSelf().inSingletonScope(),eo.bind(Rt).toSelf().inSingletonScope(),eo.bind(oi).toSelf().inSingletonScope(),eo.bind(vt).toSelf().inSingletonScope(),eo.bind(Za).toSelf().inSingletonScope(),eo.bind($t).toSelf().inSingletonScope(),eo.bind(Pi).toSelf().inSingletonScope(),eo.bind(ei).toSelf().inSingletonScope(),eo.bind(jt).toSelf().inSingletonScope(),eo.bind(wn).toSelf().inSingletonScope(),eo.bind(Vi).toSelf().inSingletonScope(),eo.bind(gn).toSelf().inSingletonScope(),eo.bind(Ft).toSelf().inSingletonScope(),eo.bind(ai).toSelf().inSingletonScope(),eo.bind($).toSelf().inSingletonScope(),eo.bind(E).toSelf().inSingletonScope(),eo.bind(ee).toSelf().inSingletonScope(),eo.bind(W).toSelf().inSingletonScope(),eo.bind(P).toSelf().inSingletonScope(),eo.bind(U).toSelf().inSingletonScope(),eo.bind(pe).toSelf().inSingletonScope(),eo.bind(oe).toSelf().inSingletonScope(),eo.bind(be).toSelf().inSingletonScope(),eo.bind(Ie).toSelf().inSingletonScope(),eo.bind(je).toSelf().inSingletonScope(),eo.bind(De).toSelf().inSingletonScope(),eo.bind("ipfsRemoteInit").toConstantValue((async e=>{if(e)return(0,_s.Ue)({url:e})})),globalThis.container=eo,eo}Qs.Z.plugin(Xs.Z),js.ZP.use([Ts.Z,As.Z,Fs.Z,Os.Z,Es.Z,Ds.Z,Bs.Z,Us.Z,Hs.Z,zs.Z,qs.Z,Gs.Z,Js.Z,Ws.Z,Zs.Z,Vs.Z,Ys.Z,Ms.Z,Ns.Z,Ls.Z,Ks.Z]),js.ZP.registerComponent("channel-card",Cs);i(44445);const io=async e=>{let t=to(e),i=t.get("framework7"),a=t.get(Xi);i.routes.push(...a.buildRoutesForContainer(t)),i.init()}},95856:()=>{},80950:()=>{},46601:()=>{},89214:()=>{},96419:()=>{},56353:()=>{},8623:()=>{},7748:()=>{},85568:()=>{},74897:()=>{},69386:()=>{},31616:()=>{},15525:()=>{},63897:()=>{},78110:()=>{},56619:()=>{},77108:()=>{},69862:()=>{},40964:()=>{},26015:e=>{"use strict";e.exports=JSON.parse('{"Channel":{"abi":[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"ipfsCid","type":"string"},{"internalType":"uint256","name":"mintFee","type":"uint256"},{"internalType":"uint256","name":"maxTokenId","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"InvalidQueryRange","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"MintEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_MINT_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"explicitOwnershipOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"}],"internalType":"struct IERC721A.TokenOwnership","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"explicitOwnershipsOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"}],"internalType":"struct IERC721A.TokenOwnership[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"stop","type":"uint256"}],"name":"tokensOfOwnerIn","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"}],"name":"mintFromStartOrFail","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_i","type":"uint256"}],"name":"uint2str","outputs":[{"internalType":"string","name":"_uintAsString","type":"string"}],"stateMutability":"pure","type":"function"}],"name":"Channel","bytecode":"0x6080604052600a600d553480156200001657600080fd5b50604051620030e5380380620030e58339810160408190526200003991620002a6565b8451859085906200005290600290602085019062000133565b5080516200006890600390602084019062000133565b50506001600055506200007b33620000e1565b600b829055600c81905582516200009a90600a90602086019062000133565b50600a604051602001620000af919062000386565b60405160208183030381529060405260099080519060200190620000d592919062000133565b50505050505062000470565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b82805462000141906200034a565b90600052602060002090601f016020900481019282620001655760008555620001b0565b82601f106200018057805160ff1916838001178555620001b0565b82800160010185558215620001b0579182015b82811115620001b057825182559160200191906001019062000193565b50620001be929150620001c2565b5090565b5b80821115620001be5760008155600101620001c3565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200020157600080fd5b81516001600160401b03808211156200021e576200021e620001d9565b604051601f8301601f19908116603f01168101908282118183101715620002495762000249620001d9565b816040528381526020925086838588010111156200026657600080fd5b600091505b838210156200028a57858201830151818301840152908201906200026b565b838211156200029c5760008385830101525b9695505050505050565b600080600080600060a08688031215620002bf57600080fd5b85516001600160401b0380821115620002d757600080fd5b620002e589838a01620001ef565b96506020880151915080821115620002fc57600080fd5b6200030a89838a01620001ef565b955060408801519150808211156200032157600080fd5b506200033088828901620001ef565b606088015160809098015196999598509695949350505050565b600181811c908216806200035f57607f821691505b6020821081036200038057634e487b7160e01b600052602260045260246000fd5b50919050565b66697066733a2f2f60c81b8152600060076000845481600182811c915080831680620003b357607f831692505b60208084108203620003d357634e487b7160e01b86526022600452602486fd5b818015620003ea5760018114620004005762000433565b60ff1986168a890152848a018801965062000433565b60008b81526020902060005b86811015620004295781548c82018b01529085019083016200040c565b505087858b010196505b50505050505062000467817f2f636f6e74726163744d657461646174612e6a736f6e00000000000000000000815260160190565b95945050505050565b612c6580620004806000396000f3fe6080604052600436106101b75760003560e01c80638da5cb5b116100ec578063c23dc68f1161008a578063e985e9c511610064578063e985e9c514610515578063f2fde38b1461056b578063f76f950e1461058b578063fa9b7018146105ab57600080fd5b8063c23dc68f146104b3578063c87b56dd146104e0578063e8a3d4851461050057600080fd5b8063a0712d68116100c6578063a0712d6814610429578063a22cb4651461043c578063a2309ff81461045c578063b88d4fde1461049357600080fd5b80638da5cb5b146103c957806395d89b41146103f457806399a2557a1461040957600080fd5b806342842e0e1161015957806370a082311161013357806370a0823114610354578063715018a6146103745780637a4d892a146103895780638462151c1461039c57600080fd5b806342842e0e146102e75780635bbb2177146103075780636352211e1461033457600080fd5b8063095ea7b311610195578063095ea7b31461025857806318160ddd1461027a57806323b872dd146102bf5780633ccfd60b146102df57600080fd5b806301ffc9a7146101bc57806306fdde03146101f1578063081812fc14610213575b600080fd5b3480156101c857600080fd5b506101dc6101d736600461237c565b6105c1565b60405190151581526020015b60405180910390f35b3480156101fd57600080fd5b506102066106a6565b6040516101e8919061240f565b34801561021f57600080fd5b5061023361022e366004612422565b610738565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101e8565b34801561026457600080fd5b50610278610273366004612464565b6107a2565b005b34801561028657600080fd5b50600154600054037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff015b6040519081526020016101e8565b3480156102cb57600080fd5b506102786102da36600461248e565b6108ab565b6102786108b6565b3480156102f357600080fd5b5061027861030236600461248e565b610994565b34801561031357600080fd5b50610327610322366004612548565b6109af565b6040516101e891906125ee565b34801561034057600080fd5b5061023361034f366004612422565b610a94565b34801561036057600080fd5b506102b161036f366004612666565b610aa6565b34801561038057600080fd5b50610278610b28565b610278610397366004612681565b610bb5565b3480156103a857600080fd5b506103bc6103b7366004612666565b610cbd565b6040516101e891906126a3565b3480156103d557600080fd5b5060085473ffffffffffffffffffffffffffffffffffffffff16610233565b34801561040057600080fd5b50610206610e5d565b34801561041557600080fd5b506103bc6104243660046126db565b610e6c565b610278610437366004612422565b6110a6565b34801561044857600080fd5b5061027861045736600461270e565b6112f1565b34801561046857600080fd5b506000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016102b1565b34801561049f57600080fd5b506102786104ae36600461274a565b6113d7565b3480156104bf57600080fd5b506104d36104ce366004612422565b611447565b6040516101e89190612828565b3480156104ec57600080fd5b506102066104fb366004612422565b611539565b34801561050c57600080fd5b50610206611602565b34801561052157600080fd5b506101dc61053036600461286b565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561057757600080fd5b50610278610586366004612666565b611611565b34801561059757600080fd5b506102066105a6366004612422565b61173e565b3480156105b757600080fd5b506102b1600d5481565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd00000000000000000000000000000000000000000000000000000000148061065457507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806106a057507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6060600280546106b59061289e565b80601f01602080910402602001604051908101604052809291908181526020018280546106e19061289e565b801561072e5780601f106107035761010080835404028352916020019161072e565b820191906000526020600020905b81548152906001019060200180831161071157829003601f168201915b5050505050905090565b60006107438261189e565b610779576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081526006602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60006107ad82610a94565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610814576040517f943f7b8c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff82161461089b5773ffffffffffffffffffffffffffffffffffffffff8116600090815260076020908152604080832033845290915290205460ff1661089b576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6108a68383836118f0565b505050565b6108a6838383611971565b60085473ffffffffffffffffffffffffffffffffffffffff16331461093c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b604051600090339047908381818185875af1925050503d806000811461097e576040519150601f19603f3d011682016040523d82523d6000602084013e610983565b606091505b505090508061099157600080fd5b50565b6108a6838383604051806020016040528060008152506113d7565b805160609060008167ffffffffffffffff8111156109cf576109cf6124ca565b604051908082528060200260200182016040528015610a3857816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816109ed5790505b50905060005b828114610a8c57610a67858281518110610a5a57610a5a6128f1565b6020026020010151611447565b828281518110610a7957610a796128f1565b6020908102919091010152600101610a3e565b509392505050565b6000610a9f82611cd3565b5192915050565b600073ffffffffffffffffffffffffffffffffffffffff8216610af5576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205467ffffffffffffffff1690565b60085473ffffffffffffffffffffffffffffffffffffffff163314610ba9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610933565b610bb36000611ea9565b565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181610c41576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f2073746172742070617373656400000000000000000000000000000000006044820152606401610933565b610c4c81600161294f565b8214610cb4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f546f6b656e2069732070617374207374617274000000000000000000000000006044820152606401610933565b6108a6836110a6565b60606000806000610ccd85610aa6565b905060008167ffffffffffffffff811115610cea57610cea6124ca565b604051908082528060200260200182016040528015610d13578160200160208202803683370190505b50604080516060810182526000808252602082018190529181019190915290915060015b838614610e51576000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff1615159181018290529250610e4957815173ffffffffffffffffffffffffffffffffffffffff1615610df057815194505b8773ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610e495780838780600101985081518110610e3c57610e3c6128f1565b6020026020010181815250505b600101610d37565b50909695505050505050565b6060600380546106b59061289e565b6060818310610ea7576040517f32c1995a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080546001851015610eb957600194505b80841115610ec5578093505b6000610ed087610aa6565b905084861015610eef5785850381811015610ee9578091505b50610ef3565b5060005b60008167ffffffffffffffff811115610f0e57610f0e6124ca565b604051908082528060200260200182016040528015610f37578160200160208202803683370190505b50905081600003610f4d57935061109f92505050565b6000610f5888611447565b905060008160400151610f69575080515b885b888114158015610f7b5750848714155b15611093576000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff161515918101829052935061108b57825173ffffffffffffffffffffffffffffffffffffffff161561103257825191505b8a73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361108b578084888060010199508151811061107e5761107e6128f1565b6020026020010181815250505b600101610f6b565b50505092835250909150505b9392505050565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181611132576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f546f6f20666577000000000000000000000000000000000000000000000000006044820152606401610933565b600d5482111561119e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f546f6f206d616e790000000000000000000000000000000000000000000000006044820152606401610933565b600c546111ab838361294f565b1115611213576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4d696e74696e6720636c6f7365640000000000000000000000000000000000006044820152606401610933565b60085473ffffffffffffffffffffffffffffffffffffffff1633146112a757600b5461123f9083612967565b34146112a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f53656e64206578616374204554480000000000000000000000000000000000006044820152606401610933565b6112b13383611f20565b7f94242c431036b9ba6723a138d4b275a5b38e13a95ef66227a45df427c0f843f36112dc838361294f565b60405190815260200160405180910390a15050565b3373ffffffffffffffffffffffffffffffffffffffff831603611340576040517fb06307db00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b33600081815260076020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6113e2848484611971565b73ffffffffffffffffffffffffffffffffffffffff83163b156114415761140b84848484611f3e565b611441576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b6040805160608082018352600080835260208084018290528385018290528451928301855281835282018190529281019290925290600183108061148d57506000548310155b156114985792915050565b506000828152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff1615801592820192909252906115305792915050565b61109f83611cd3565b60606115448261189e565b6115d0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610933565b600a6115db8361173e565b6040516020016115ec9291906129c0565b6040516020818303038152906040529050919050565b6060600980546106b59061289e565b60085473ffffffffffffffffffffffffffffffffffffffff163314611692576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610933565b73ffffffffffffffffffffffffffffffffffffffff8116611735576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610933565b61099181611ea9565b60608160000361178157505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156117ab578061179581612b24565b91506117a49050600a83612b5c565b9150611785565b60008167ffffffffffffffff8111156117c6576117c66124ca565b6040519080825280601f01601f1916602001820160405280156117f0576020820181803683370190505b509050815b851561189557611806600182612b97565b90506000611815600a88612b5c565b61182090600a612967565b61182a9088612b97565b611835906030612bae565b905060008160f81b905080848481518110611852576118526128f1565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535061188c600a89612b5c565b975050506117f5565b50949350505050565b6000816001111580156118b2575060005482105b80156106a05750506000908152600460205260409020547c0100000000000000000000000000000000000000000000000000000000900460ff161590565b60008281526006602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff87811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600061197c82611cd3565b90508373ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16146119e7576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60003373ffffffffffffffffffffffffffffffffffffffff86161480611a3d575073ffffffffffffffffffffffffffffffffffffffff8516600090815260076020908152604080832033845290915290205460ff165b80611a65575033611a4d84610738565b73ffffffffffffffffffffffffffffffffffffffff16145b905080611a9e576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8416611aeb576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611af7600084876118f0565b73ffffffffffffffffffffffffffffffffffffffff858116600090815260056020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000080821667ffffffffffffffff9283167fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01831617909255898616808652838620805493841693831660019081018416949094179055898652600490945282852080547fffffffff00000000000000000000000000000000000000000000000000000000169094177401000000000000000000000000000000000000000042909216919091021783558701808452922080549193909116611c6e576000548214611c6e578054602086015167ffffffffffffffff1674010000000000000000000000000000000000000000027fffffffff0000000000000000000000000000000000000000000000000000000090911673ffffffffffffffffffffffffffffffffffffffff8a16171781555b505050828473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050505050565b60408051606081018252600080825260208201819052918101919091528180600111611e7757600054811015611e77576000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff16151591810182905290611e7557805173ffffffffffffffffffffffffffffffffffffffff1615611db6579392505050565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff811680835274010000000000000000000000000000000000000000820467ffffffffffffffff16938301939093527c0100000000000000000000000000000000000000000000000000000000900460ff1615159281019290925215611e70579392505050565b611db6565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6008805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b611f3a8282604051806020016040528060008152506120b7565b5050565b6040517f150b7a0200000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290611f99903390899088908890600401612bd3565b6020604051808303816000875af1925050508015611ff2575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611fef91810190612c12565b60015b612069573d808015612020576040519150601f19603f3d011682016040523d82523d6000602084013e612025565b606091505b508051600003612061576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050949350505050565b60005473ffffffffffffffffffffffffffffffffffffffff8416612107576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b82600003612141576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8416600081815260056020908152604080832080547fffffffffffffffffffffffffffffffff00000000000000000000000000000000811667ffffffffffffffff8083168b018116918217680100000000000000007fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000090941690921783900481168b01811690920217909155858452600490925290912080547fffffffff000000000000000000000000000000000000000000000000000000001683177401000000000000000000000000000000000000000042909316929092029190911790558190818501903b156122ec575b604051829073ffffffffffffffffffffffffffffffffffffffff8816906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a461229c6000878480600101955087611f3e565b6122d2576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8082106122445782600054146122e757600080fd5b61233e565b5b60405160018301929073ffffffffffffffffffffffffffffffffffffffff8816906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a48082106122ed575b5060009081556114419085838684565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461099157600080fd5b60006020828403121561238e57600080fd5b813561109f8161234e565b60005b838110156123b457818101518382015260200161239c565b838111156114415750506000910152565b600081518084526123dd816020860160208601612399565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061109f60208301846123c5565b60006020828403121561243457600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461245f57600080fd5b919050565b6000806040838503121561247757600080fd5b6124808361243b565b946020939093013593505050565b6000806000606084860312156124a357600080fd5b6124ac8461243b565b92506124ba6020850161243b565b9150604084013590509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715612540576125406124ca565b604052919050565b6000602080838503121561255b57600080fd5b823567ffffffffffffffff8082111561257357600080fd5b818501915085601f83011261258757600080fd5b813581811115612599576125996124ca565b8060051b91506125aa8483016124f9565b81815291830184019184810190888411156125c457600080fd5b938501935b838510156125e2578435825293850193908501906125c9565b98975050505050505050565b6020808252825182820181905260009190848201906040850190845b81811015610e5157612653838551805173ffffffffffffffffffffffffffffffffffffffff16825260208082015167ffffffffffffffff16908301526040908101511515910152565b928401926060929092019160010161260a565b60006020828403121561267857600080fd5b61109f8261243b565b6000806040838503121561269457600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610e51578351835292840192918401916001016126bf565b6000806000606084860312156126f057600080fd5b6126f98461243b565b95602085013595506040909401359392505050565b6000806040838503121561272157600080fd5b61272a8361243b565b91506020830135801515811461273f57600080fd5b809150509250929050565b6000806000806080858703121561276057600080fd5b6127698561243b565b9350602061277881870161243b565b935060408601359250606086013567ffffffffffffffff8082111561279c57600080fd5b818801915088601f8301126127b057600080fd5b8135818111156127c2576127c26124ca565b6127f2847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016124f9565b9150808252898482850101111561280857600080fd5b808484018584013760008482840101525080935050505092959194509250565b815173ffffffffffffffffffffffffffffffffffffffff16815260208083015167ffffffffffffffff1690820152604080830151151590820152606081016106a0565b6000806040838503121561287e57600080fd5b6128878361243b565b91506128956020840161243b565b90509250929050565b600181811c908216806128b257607f821691505b6020821081036128eb577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000821982111561296257612962612920565b500190565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561299f5761299f612920565b500290565b600081516129b6818560208601612399565b9290920192915050565b7f697066733a2f2f000000000000000000000000000000000000000000000000008152600060076000855481600182811c915080831680612a0257607f831692505b60208084108203612a3a577f4e487b710000000000000000000000000000000000000000000000000000000086526022600452602486fd5b818015612a4e5760018114612a8157612ab2565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008616888b015287858b01019650612ab2565b60008c81526020902060005b86811015612aa85781548c82018b0152908501908301612a8d565b505087858b010196505b505050505050612b1a612af1612aeb837f2f6d657461646174612f000000000000000000000000000000000000000000008152600a0190565b876129a4565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000815260050190565b9695505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612b5557612b55612920565b5060010190565b600082612b92577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b600082821015612ba957612ba9612920565b500390565b600060ff821660ff84168060ff03821115612bcb57612bcb612920565b019392505050565b600073ffffffffffffffffffffffffffffffffffffffff808716835280861660208401525083604083015260806060830152612b1a60808301846123c5565b600060208284031215612c2457600080fd5b815161109f8161234e56fea264697066735822122077a8110e0c07e1e91db6a0afcd253eb4afaa674c06061f496eabc29f0ca8f56a64736f6c634300080d0033","deployedBytecode":"0x6080604052600436106101b75760003560e01c80638da5cb5b116100ec578063c23dc68f1161008a578063e985e9c511610064578063e985e9c514610515578063f2fde38b1461056b578063f76f950e1461058b578063fa9b7018146105ab57600080fd5b8063c23dc68f146104b3578063c87b56dd146104e0578063e8a3d4851461050057600080fd5b8063a0712d68116100c6578063a0712d6814610429578063a22cb4651461043c578063a2309ff81461045c578063b88d4fde1461049357600080fd5b80638da5cb5b146103c957806395d89b41146103f457806399a2557a1461040957600080fd5b806342842e0e1161015957806370a082311161013357806370a0823114610354578063715018a6146103745780637a4d892a146103895780638462151c1461039c57600080fd5b806342842e0e146102e75780635bbb2177146103075780636352211e1461033457600080fd5b8063095ea7b311610195578063095ea7b31461025857806318160ddd1461027a57806323b872dd146102bf5780633ccfd60b146102df57600080fd5b806301ffc9a7146101bc57806306fdde03146101f1578063081812fc14610213575b600080fd5b3480156101c857600080fd5b506101dc6101d736600461237c565b6105c1565b60405190151581526020015b60405180910390f35b3480156101fd57600080fd5b506102066106a6565b6040516101e8919061240f565b34801561021f57600080fd5b5061023361022e366004612422565b610738565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101e8565b34801561026457600080fd5b50610278610273366004612464565b6107a2565b005b34801561028657600080fd5b50600154600054037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff015b6040519081526020016101e8565b3480156102cb57600080fd5b506102786102da36600461248e565b6108ab565b6102786108b6565b3480156102f357600080fd5b5061027861030236600461248e565b610994565b34801561031357600080fd5b50610327610322366004612548565b6109af565b6040516101e891906125ee565b34801561034057600080fd5b5061023361034f366004612422565b610a94565b34801561036057600080fd5b506102b161036f366004612666565b610aa6565b34801561038057600080fd5b50610278610b28565b610278610397366004612681565b610bb5565b3480156103a857600080fd5b506103bc6103b7366004612666565b610cbd565b6040516101e891906126a3565b3480156103d557600080fd5b5060085473ffffffffffffffffffffffffffffffffffffffff16610233565b34801561040057600080fd5b50610206610e5d565b34801561041557600080fd5b506103bc6104243660046126db565b610e6c565b610278610437366004612422565b6110a6565b34801561044857600080fd5b5061027861045736600461270e565b6112f1565b34801561046857600080fd5b506000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016102b1565b34801561049f57600080fd5b506102786104ae36600461274a565b6113d7565b3480156104bf57600080fd5b506104d36104ce366004612422565b611447565b6040516101e89190612828565b3480156104ec57600080fd5b506102066104fb366004612422565b611539565b34801561050c57600080fd5b50610206611602565b34801561052157600080fd5b506101dc61053036600461286b565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561057757600080fd5b50610278610586366004612666565b611611565b34801561059757600080fd5b506102066105a6366004612422565b61173e565b3480156105b757600080fd5b506102b1600d5481565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd00000000000000000000000000000000000000000000000000000000148061065457507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806106a057507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b6060600280546106b59061289e565b80601f01602080910402602001604051908101604052809291908181526020018280546106e19061289e565b801561072e5780601f106107035761010080835404028352916020019161072e565b820191906000526020600020905b81548152906001019060200180831161071157829003601f168201915b5050505050905090565b60006107438261189e565b610779576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081526006602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60006107ad82610a94565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610814576040517f943f7b8c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff82161461089b5773ffffffffffffffffffffffffffffffffffffffff8116600090815260076020908152604080832033845290915290205460ff1661089b576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6108a68383836118f0565b505050565b6108a6838383611971565b60085473ffffffffffffffffffffffffffffffffffffffff16331461093c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b604051600090339047908381818185875af1925050503d806000811461097e576040519150601f19603f3d011682016040523d82523d6000602084013e610983565b606091505b505090508061099157600080fd5b50565b6108a6838383604051806020016040528060008152506113d7565b805160609060008167ffffffffffffffff8111156109cf576109cf6124ca565b604051908082528060200260200182016040528015610a3857816020015b60408051606081018252600080825260208083018290529282015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9092019101816109ed5790505b50905060005b828114610a8c57610a67858281518110610a5a57610a5a6128f1565b6020026020010151611447565b828281518110610a7957610a796128f1565b6020908102919091010152600101610a3e565b509392505050565b6000610a9f82611cd3565b5192915050565b600073ffffffffffffffffffffffffffffffffffffffff8216610af5576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205467ffffffffffffffff1690565b60085473ffffffffffffffffffffffffffffffffffffffff163314610ba9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610933565b610bb36000611ea9565b565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181610c41576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f2073746172742070617373656400000000000000000000000000000000006044820152606401610933565b610c4c81600161294f565b8214610cb4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f546f6b656e2069732070617374207374617274000000000000000000000000006044820152606401610933565b6108a6836110a6565b60606000806000610ccd85610aa6565b905060008167ffffffffffffffff811115610cea57610cea6124ca565b604051908082528060200260200182016040528015610d13578160200160208202803683370190505b50604080516060810182526000808252602082018190529181019190915290915060015b838614610e51576000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff1615159181018290529250610e4957815173ffffffffffffffffffffffffffffffffffffffff1615610df057815194505b8773ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610e495780838780600101985081518110610e3c57610e3c6128f1565b6020026020010181815250505b600101610d37565b50909695505050505050565b6060600380546106b59061289e565b6060818310610ea7576040517f32c1995a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080546001851015610eb957600194505b80841115610ec5578093505b6000610ed087610aa6565b905084861015610eef5785850381811015610ee9578091505b50610ef3565b5060005b60008167ffffffffffffffff811115610f0e57610f0e6124ca565b604051908082528060200260200182016040528015610f37578160200160208202803683370190505b50905081600003610f4d57935061109f92505050565b6000610f5888611447565b905060008160400151610f69575080515b885b888114158015610f7b5750848714155b15611093576000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff161515918101829052935061108b57825173ffffffffffffffffffffffffffffffffffffffff161561103257825191505b8a73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361108b578084888060010199508151811061107e5761107e6128f1565b6020026020010181815250505b600101610f6b565b50505092835250909150505b9392505050565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181611132576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f546f6f20666577000000000000000000000000000000000000000000000000006044820152606401610933565b600d5482111561119e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f546f6f206d616e790000000000000000000000000000000000000000000000006044820152606401610933565b600c546111ab838361294f565b1115611213576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4d696e74696e6720636c6f7365640000000000000000000000000000000000006044820152606401610933565b60085473ffffffffffffffffffffffffffffffffffffffff1633146112a757600b5461123f9083612967565b34146112a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f53656e64206578616374204554480000000000000000000000000000000000006044820152606401610933565b6112b13383611f20565b7f94242c431036b9ba6723a138d4b275a5b38e13a95ef66227a45df427c0f843f36112dc838361294f565b60405190815260200160405180910390a15050565b3373ffffffffffffffffffffffffffffffffffffffff831603611340576040517fb06307db00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b33600081815260076020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6113e2848484611971565b73ffffffffffffffffffffffffffffffffffffffff83163b156114415761140b84848484611f3e565b611441576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b6040805160608082018352600080835260208084018290528385018290528451928301855281835282018190529281019290925290600183108061148d57506000548310155b156114985792915050565b506000828152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff1615801592820192909252906115305792915050565b61109f83611cd3565b60606115448261189e565b6115d0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610933565b600a6115db8361173e565b6040516020016115ec9291906129c0565b6040516020818303038152906040529050919050565b6060600980546106b59061289e565b60085473ffffffffffffffffffffffffffffffffffffffff163314611692576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610933565b73ffffffffffffffffffffffffffffffffffffffff8116611735576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610933565b61099181611ea9565b60608160000361178157505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156117ab578061179581612b24565b91506117a49050600a83612b5c565b9150611785565b60008167ffffffffffffffff8111156117c6576117c66124ca565b6040519080825280601f01601f1916602001820160405280156117f0576020820181803683370190505b509050815b851561189557611806600182612b97565b90506000611815600a88612b5c565b61182090600a612967565b61182a9088612b97565b611835906030612bae565b905060008160f81b905080848481518110611852576118526128f1565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535061188c600a89612b5c565b975050506117f5565b50949350505050565b6000816001111580156118b2575060005482105b80156106a05750506000908152600460205260409020547c0100000000000000000000000000000000000000000000000000000000900460ff161590565b60008281526006602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff87811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b600061197c82611cd3565b90508373ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16146119e7576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60003373ffffffffffffffffffffffffffffffffffffffff86161480611a3d575073ffffffffffffffffffffffffffffffffffffffff8516600090815260076020908152604080832033845290915290205460ff165b80611a65575033611a4d84610738565b73ffffffffffffffffffffffffffffffffffffffff16145b905080611a9e576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8416611aeb576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611af7600084876118f0565b73ffffffffffffffffffffffffffffffffffffffff858116600090815260056020908152604080832080547fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000080821667ffffffffffffffff9283167fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01831617909255898616808652838620805493841693831660019081018416949094179055898652600490945282852080547fffffffff00000000000000000000000000000000000000000000000000000000169094177401000000000000000000000000000000000000000042909216919091021783558701808452922080549193909116611c6e576000548214611c6e578054602086015167ffffffffffffffff1674010000000000000000000000000000000000000000027fffffffff0000000000000000000000000000000000000000000000000000000090911673ffffffffffffffffffffffffffffffffffffffff8a16171781555b505050828473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050505050565b60408051606081018252600080825260208201819052918101919091528180600111611e7757600054811015611e77576000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff8116825274010000000000000000000000000000000000000000810467ffffffffffffffff16928201929092527c010000000000000000000000000000000000000000000000000000000090910460ff16151591810182905290611e7557805173ffffffffffffffffffffffffffffffffffffffff1615611db6579392505050565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016000818152600460209081526040918290208251606081018452905473ffffffffffffffffffffffffffffffffffffffff811680835274010000000000000000000000000000000000000000820467ffffffffffffffff16938301939093527c0100000000000000000000000000000000000000000000000000000000900460ff1615159281019290925215611e70579392505050565b611db6565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6008805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b611f3a8282604051806020016040528060008152506120b7565b5050565b6040517f150b7a0200000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290611f99903390899088908890600401612bd3565b6020604051808303816000875af1925050508015611ff2575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611fef91810190612c12565b60015b612069573d808015612020576040519150601f19603f3d011682016040523d82523d6000602084013e612025565b606091505b508051600003612061576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050949350505050565b60005473ffffffffffffffffffffffffffffffffffffffff8416612107576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b82600003612141576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff8416600081815260056020908152604080832080547fffffffffffffffffffffffffffffffff00000000000000000000000000000000811667ffffffffffffffff8083168b018116918217680100000000000000007fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000090941690921783900481168b01811690920217909155858452600490925290912080547fffffffff000000000000000000000000000000000000000000000000000000001683177401000000000000000000000000000000000000000042909316929092029190911790558190818501903b156122ec575b604051829073ffffffffffffffffffffffffffffffffffffffff8816906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a461229c6000878480600101955087611f3e565b6122d2576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8082106122445782600054146122e757600080fd5b61233e565b5b60405160018301929073ffffffffffffffffffffffffffffffffffffffff8816906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a48082106122ed575b5060009081556114419085838684565b7fffffffff000000000000000000000000000000000000000000000000000000008116811461099157600080fd5b60006020828403121561238e57600080fd5b813561109f8161234e565b60005b838110156123b457818101518382015260200161239c565b838111156114415750506000910152565b600081518084526123dd816020860160208601612399565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60208152600061109f60208301846123c5565b60006020828403121561243457600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461245f57600080fd5b919050565b6000806040838503121561247757600080fd5b6124808361243b565b946020939093013593505050565b6000806000606084860312156124a357600080fd5b6124ac8461243b565b92506124ba6020850161243b565b9150604084013590509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715612540576125406124ca565b604052919050565b6000602080838503121561255b57600080fd5b823567ffffffffffffffff8082111561257357600080fd5b818501915085601f83011261258757600080fd5b813581811115612599576125996124ca565b8060051b91506125aa8483016124f9565b81815291830184019184810190888411156125c457600080fd5b938501935b838510156125e2578435825293850193908501906125c9565b98975050505050505050565b6020808252825182820181905260009190848201906040850190845b81811015610e5157612653838551805173ffffffffffffffffffffffffffffffffffffffff16825260208082015167ffffffffffffffff16908301526040908101511515910152565b928401926060929092019160010161260a565b60006020828403121561267857600080fd5b61109f8261243b565b6000806040838503121561269457600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610e51578351835292840192918401916001016126bf565b6000806000606084860312156126f057600080fd5b6126f98461243b565b95602085013595506040909401359392505050565b6000806040838503121561272157600080fd5b61272a8361243b565b91506020830135801515811461273f57600080fd5b809150509250929050565b6000806000806080858703121561276057600080fd5b6127698561243b565b9350602061277881870161243b565b935060408601359250606086013567ffffffffffffffff8082111561279c57600080fd5b818801915088601f8301126127b057600080fd5b8135818111156127c2576127c26124ca565b6127f2847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016124f9565b9150808252898482850101111561280857600080fd5b808484018584013760008482840101525080935050505092959194509250565b815173ffffffffffffffffffffffffffffffffffffffff16815260208083015167ffffffffffffffff1690820152604080830151151590820152606081016106a0565b6000806040838503121561287e57600080fd5b6128878361243b565b91506128956020840161243b565b90509250929050565b600181811c908216806128b257607f821691505b6020821081036128eb577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000821982111561296257612962612920565b500190565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561299f5761299f612920565b500290565b600081516129b6818560208601612399565b9290920192915050565b7f697066733a2f2f000000000000000000000000000000000000000000000000008152600060076000855481600182811c915080831680612a0257607f831692505b60208084108203612a3a577f4e487b710000000000000000000000000000000000000000000000000000000086526022600452602486fd5b818015612a4e5760018114612a8157612ab2565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008616888b015287858b01019650612ab2565b60008c81526020902060005b86811015612aa85781548c82018b0152908501908301612a8d565b505087858b010196505b505050505050612b1a612af1612aeb837f2f6d657461646174612f000000000000000000000000000000000000000000008152600a0190565b876129a4565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000815260050190565b9695505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612b5557612b55612920565b5060010190565b600082612b92577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b600082821015612ba957612ba9612920565b500390565b600060ff821660ff84168060ff03821115612bcb57612bcb612920565b019392505050565b600073ffffffffffffffffffffffffffffffffffffffff808716835280861660208401525083604083015260806060830152612b1a60808301846123c5565b600060208284031215612c2457600080fd5b815161109f8161234e56fea264697066735822122077a8110e0c07e1e91db6a0afcd253eb4afaa674c06061f496eabc29f0ca8f56a64736f6c634300080d0033"}}')}},e=>{e.O(0,[216],(()=>{return t=73243,e(e.s=t);var t}));var t=e.O();admin=t}]);
//# sourceMappingURL=main.admin.js.map