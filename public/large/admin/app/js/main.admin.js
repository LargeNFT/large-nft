var admin;
(self["webpackChunkadmin"] = self["webpackChunkadmin"] || []).push([["main"],{

/***/ "./src/admin/components/admin/app.f7.html":
/*!************************************************!*\
  !*** ./src/admin/components/admin/app.f7.html ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _service_core_schema_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/core/schema-service */ "./src/admin/service/core/schema-service.ts");
/* harmony import */ var _components_admin_toolbar_f7_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/admin/toolbar.f7.html */ "./src/admin/components/admin/toolbar.f7.html");
/** @jsx $jsx */






function framework7Component(props, {
  $on,
  $f7ready,
  $f7,
  $f7router,
  $update
}) {
  $f7ready(async () => {
    let getHash = () => {
      return window.location.hash?.length > 2 ? window.location.hash.substring(2) : undefined;
    };
    let baseURI = window.location.pathname;
    let hash = getHash();
    let mainView;
    let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_1__.UiService);
    let walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getWalletService();
    let schemaService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_schema_service__WEBPACK_IMPORTED_MODULE_2__.SchemaService);
    let walletAddress;
    const displayAddress = async e => {
      walletAddress = undefined;
      if (!walletService.provider) {
        await walletService.initProvider();
      }
      walletAddress = await walletService.getAddress();
      if (walletAddress) {
        walletService.address = walletAddress;
        if (!walletService.wallet) {
          await walletService.connect();
        }
      }
      await $update();
    };
    const connectWallet = async e => {
      await walletService.initWallet();

      //Connect to metamask
      await walletService.connect();
      await displayAddress();
    };
    document.addEventListener('connect-wallet', async e => {
      await connectWallet();
    });
    async function init() {
      uiService.showSpinner("Loading...");
      await schemaService.load();
      await displayAddress();
      mainView = $f7.views.create('.view-main', {
        url: hash ? hash : '/',
        browserHistory: true,
        browserHistoryRoot: baseURI,
        reloadCurrent: true
      });

      // mainView.router.navigate("/", { reloadCurrent : true })

      uiService.hideSpinner();
    }
    await init();
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`
  <div id="app">


    <!-- Status bar overlay for fullscreen mode-->
    <div class="statusbar"></div>

    <div class="view view-main" >

      <${_components_admin_toolbar_f7_html__WEBPACK_IMPORTED_MODULE_3__["default"]} />

    </div>



  </div>

`
    }
    ;
}
framework7Component.id = '5e1432f0fd';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/author/edit.f7.html":
/*!********************************************************!*\
  !*** ./src/admin/components/admin/author/edit.f7.html ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_core_upload_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/upload-service */ "./src/admin/service/core/upload-service.ts");
/* harmony import */ var _service_author_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/author-service */ "./src/admin/service/author-service.ts");
/* harmony import */ var _service_image_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/image-service */ "./src/admin/service/image-service.ts");
/* harmony import */ var _dto_author__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../dto/author */ "./src/admin/dto/author.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/** @jsx $jsx */







function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let uploadService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_upload_service__WEBPACK_IMPORTED_MODULE_1__.UploadService);
  let imageService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_image_service__WEBPACK_IMPORTED_MODULE_2__.ImageService);
  let authorService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_author_service__WEBPACK_IMPORTED_MODULE_3__.AuthorService);
  let walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getWalletService();
  let authorViewModel = props.authorViewModel;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: walletService.truncateEthAddress(authorViewModel.author.walletAddress),
    path: `/admin/author/show/${authorViewModel.author.walletAddress}`
  }, {
    text: 'Edit Profile'
  }];
  const formSubmit = async e => {
    e.preventDefault();

    //Get data
    let author = Object.assign(new _dto_author__WEBPACK_IMPORTED_MODULE_4__.Author(), $f7.form.convertToData('#edit-author-form'));

    //Save
    try {
      await authorService.put(author);
      const toast = $f7.toast.show({
        text: 'Profile Saved',
        closeTimeout: 2000,
        closeButton: true,
        position: 'bottom',
        horizontalPosition: 'left'
      });

      //Redirect
      $f7.views.main.router.navigate(`/admin/${props.channelId}/author/show/${author._id}`);
    } catch (ex) {
      console.log(ex);
      $f7.dialog.alert(ex.errors, "There was an error");
    }
  };
  const handleAuthorPhotoBrowseClick = async e => {
    $("#author-photo-browse").click();
  };
  const handleAuthorPhotoChange = async e => {
    let imageBuffer = await uploadService.uploadFile(document.getElementById('author-photo-browse'));
    let image = await imageService.newFromBuffer(imageBuffer);
    try {
      //Could be a duplicate. Which means it's fine.
      await imageService.put(image);
    } catch (ex) {}
    authorViewModel.authorPhoto = {
      cid: image.cid,
      url: await imageService.getUrl(image)
    };
    $update();
  };
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`
    <div class="page" data-name="profile-edit">

        <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_5__["default"]} breadcrumbs=${breadcrumbs} active="profile" />


        <div class="page-content hide-toolbar-on-scroll">

            <div class="block-title block-title-medium">Edit Profile</div>
            <form id="edit-author-form" @submit="${formSubmit}">

                <input type="hidden" name="_id" value="${authorViewModel.author._id}" />
                <input type="hidden" name="_rev" value="${authorViewModel.author._rev}" />

                <input type="hidden" name="walletAddress" value="${authorViewModel.author.walletAddress}" />

                <div class="card">
                    <div class="card-content">
                        <div class="list">
                            <ul>
        
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Avatar</div>
                                            <div class="item-input-wrap">
            
                                                ${authorViewModel.authorPhoto ? $h`
                                                <img class="author-photo-preview"
                                                    src="${authorViewModel.authorPhoto.url}" alt="Author photo" />
                                                ` : $h`
                                                <i class="material-icons author-photo-preview">image</i>
                                                `}
            
                                                <input type="button" class="button button-fill browse-file" value="Browse"
                                                    @click="${handleAuthorPhotoBrowseClick}" tabindex="1" />
                                                <input type="hidden" name="coverPhotoId"
                                                    value="${authorViewModel?.authorPhoto?.cid}" />
                                                <input type="file" id="author-photo-browse" style="display: none"
                                                    @change="${handleAuthorPhotoChange}" />
            
                                            </div>
                                        </div>
                                    </div>
                                </li>
            
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Name</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="name" value="${authorViewModel.author.name}" placeholder="Enter your name" tabindex="2" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Description</div>
                                            <div class="item-input-wrap">
                                                <textarea name="description" placeholder="Enter a short bio" tabindex="3">${authorViewModel.author.description}</textarea>
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

                    <a href="/admin/author/show/${authorViewModel.author.walletAddress}" class="button button-outline color-gray" tabindex="4">Cancel</a>
      
                    <button type="submit" class="button button-fill" tabindex="5">
                      Save
                    </button>
      
                </div>


            </form>

        </div>

    </div>
`
    }
    ;
}
framework7Component.id = '2aa131d239';
framework7Component.style = `
    .author-photo-preview {
        max-width: 100%;
        max-height: 200px;
        border: 1px solid #cccccc;
        padding: 5px;
        margin-bottom: 10px;
    }
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/author/show.f7.html":
/*!********************************************************!*\
  !*** ./src/admin/components/admin/author/show.f7.html ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/** @jsx $jsx */





function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let authorViewModel = props.authorViewModel;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: 'Author Profile'
  }];
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`
    <div class="page" data-name="profile-show">

        <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_0__["default"]} breadcrumbs=${breadcrumbs} active="profile" />

        <div class="page-content hide-toolbar-on-scroll">

            ${authorViewModel.author._id ? $h`

                <div class="block row">
                    <div class="col-20">

                        ${authorViewModel.authorPhoto ? $h`
                            <img src="${authorViewModel.authorPhoto.url}" class="profile-pic-main" alt="Author photo" />
                        ` : $h`
                            <i class="material-icons" id="profile-pic-not-found">person</i>
                        `}

                    </div>

                    <div class="col-80">

                        <div class="profile-name">
                            ${authorViewModel.authorDisplayName}
                        </div>

                        <div class="profile-address">
                            ${authorViewModel.author._id}
                        </div>

                        <p>${authorViewModel.author.description}</p>

                        <div class="row">
                            <a href="/admin/${props.channelId}/author/edit/${authorViewModel.author.walletAddress}"
                                class="button button-outline button-small button-round col-20">Edit</a>
                        </div>

                    </div>
                </div>

                ` : $h`
                    <div class="block">
                        Create your Large <a href="/admin/${props.channelId}/author/edit/${authorViewModel.author.walletAddress}">author profile</a>. 
                    </div>
                `}


        </div>

    </div>
`
    }
    ;
}
framework7Component.id = '618a1809c6';
framework7Component.style = `
    
  .profile-pic-edit, #profile-pic--edit-not-found {
    max-width: 300px;
    border-radius: 50%;
    font-size: 100px;
    float: left;
  }
  
  
  .profile-pic-main, #profile-pic-not-found {
    max-width: 100%;
    border-radius: 50%;
    font-size: 100px;
    float: left;
  }
  
  .profile-name {
    color: var(--f7-block-title-medium-text-color);
    font-weight: bold;
  }
  
  .profile-address {
    color: var(--f7-list-item-text-text-color);
    font-size: 13px;
  }
  
  
  .profile-pic-wrapper {
    width: 115px;
    float: left;
    padding-right: 20px;
  }

`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/channel-card.f7.html":
/*!*****************************************************************!*\
  !*** ./src/admin/components/admin/channel/channel-card.f7.html ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_item_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/item-service */ "./src/admin/service/item-service.ts");
/* harmony import */ var _service_channel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/channel-service */ "./src/admin/service/channel-service.ts");
/** @jsx $jsx */




function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let itemService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_item_service__WEBPACK_IMPORTED_MODULE_1__.ItemService);
  let channelService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_channel_service__WEBPACK_IMPORTED_MODULE_2__.ChannelService);
  let walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getWalletService();
  let channelViewModel = props.channel_view_model;
  let showEdit = true;
  const truncateEthAddress = address => {
    return walletService.truncateEthAddress(address);
  };
  const deleteCollectionClick = async e => {
    $f7.dialog.confirm("Are you sure you want to delete this collection? This will only remove your local copy of the files.", async () => {
      $f7.preloader.show();
      await channelService.delete(channelViewModel.channel);
      $f7.preloader.hide();
      $f7.views.main.router.navigate(`/`);
      const toast = $f7.toast.show({
        text: 'Collection deleted',
        closeTimeout: 2000,
        closeButton: true,
        position: 'bottom',
        horizontalPosition: 'left'
      });
    });
  };
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="card card-outline channel-card-show">

    <div class="card-header banner show-channel-banner-${channelViewModel.channel._id}">

      <div class="float-right">
        <a class="button button-fill button-raised color-blue text-color-white border-white"
          href="/admin/publish/${channelViewModel.channel._id}">Publish</a>
      </div>


      ${channelViewModel?.coverImage ? $h`
      <img src="${channelViewModel.coverImage.url}" class="avatar" alt="Channel cover image" />
      ` : $h`
      <i class="material-icons avatar">image</i>
      `}

    </div>

    <div class="card-content">

      <div class="card-content card-content-padding">
        
        <div class="float-right">

          <div class="segmented">

            ${showEdit ? $h`
              <a class="button button-active" href="/admin/channel/edit/${channelViewModel.channel._id}">Edit</a>
            ` : $h`<span />`}

            <a class="button" @click="${deleteCollectionClick}">Delete</a>
          </div>

        </div>
                        
        <div class="title">${channelViewModel?.channel?.title}</div>

        ${channelViewModel?.authorDisplayName ? $h`
        <div class="name">
          By <a
            href="/admin/${channelViewModel.channel._id}/author/show/${channelViewModel?.author._id}">${channelViewModel?.authorDisplayName}</a>
        </div>
        ` : ``}

        <div class="collection-info">
            <label>Items:</label><strong>${channelViewModel?.itemCount}</strong>
            
            <span class="dot">·</span>
            <label>Created:</label><strong>${channelViewModel.dateCreated}</strong>
  
            <span class="dot">·</span>
            <label>Forkable:</label><strong>${!channelViewModel.channel.disableForks ? 'Yes' : 'No'}</strong>

            ${channelViewModel.channel.mintPrice ? $h`
              <span class="dot">·</span>
              <label>Mint Price:</label><strong>${channelViewModel.channel.mintPrice} ETH</strong>
            ` : $h``}
  
            ${channelViewModel.channel.royaltyPercent ? $h`
              <span class="dot">·</span>
              <label>Marketplace Creator Fee:</label><strong>${channelViewModel.channel.royaltyPercent}%</strong>
            ` : $h``}
        </div>



        ${channelViewModel.channel.descriptionHTML ? $h`
          <div class="description" id="channel-show-description-${channelViewModel.channel._id}"
            innerHTML="${channelViewModel.channel.descriptionHTML}">
          </div>
        ` : $h`<span />`}

            

        ${channelViewModel.channel.contractAddress ? $h`
          <div class="contract-address">
            <strong>Contract Address:</strong> ${truncateEthAddress(channelViewModel?.channel.contractAddress)}
          </div>
        ` : $h``}

        ${channelViewModel.channel.localCid ? $h`
          <div class="contract-address">
            <strong>Last Published IPFS CID:</strong> ${channelViewModel?.channel.localCid}
          </div>
        ` : $h``}

        ${channelViewModel.channel.forkedFromCid ? $h`
          <div class="contract-address">
            <strong>Forked from IPFS:</strong> ${channelViewModel?.channel.forkedFromCid}
          </div>
        ` : $h``}

        ${channelViewModel.channel.forkedFromId ? $h`
          <div class="contract-address">
            <strong>Forked from:</strong> ${channelViewModel?.channel.forkedFromId}
          </div>
        ` : $h``}

      </div>

    </div>

  </div>

`
    }
    ;
}
framework7Component.id = '709415171d';
framework7Component.style = `    
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/create-menu.f7.html":
/*!****************************************************************!*\
  !*** ./src/admin/components/admin/channel/create-menu.f7.html ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/** @jsx $jsx */



function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let walletService;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: 'Create & Import'
  }];
  $on('pageInit', async () => {
    walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getWalletService();
    await $update();
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="admin-create-menu">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_1__["default"]} breadcrumbs=${breadcrumbs} />

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
  
  
              ${walletService?.address ? $h`
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
              ` : $h`
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

`
    }
    ;
}
framework7Component.id = '655abdd9a2';
framework7Component.style = `


`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/create.f7.html":
/*!***********************************************************!*\
  !*** ./src/admin/components/admin/channel/create.f7.html ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _service_quill_editor_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/quill-editor-service */ "./src/admin/service/quill-editor-service.ts");
/* harmony import */ var _service_author_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/author-service */ "./src/admin/service/author-service.ts");
/* harmony import */ var _service_channel_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/channel-service */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _service_web_channel_web_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/web/channel-web-service */ "./src/admin/service/web/channel-web-service.ts");
/* harmony import */ var _dto_channel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../dto/channel */ "./src/admin/dto/channel.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/* harmony import */ var _admin_channel_form_f7_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../admin/channel/form.f7.html */ "./src/admin/components/admin/channel/form.f7.html");
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! highlight.js */ "./node_modules/highlight.js/es/index.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quill */ "./node_modules/quill/dist/quill.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _yaireo_tagify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @yaireo/tagify */ "./node_modules/@yaireo/tagify/dist/tagify.min.js");
/* harmony import */ var _yaireo_tagify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_yaireo_tagify__WEBPACK_IMPORTED_MODULE_2__);
/** @jsx $jsx */

















function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let channelService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_channel_service__WEBPACK_IMPORTED_MODULE_4__.ChannelService);
  let channelWebService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_web_channel_web_service__WEBPACK_IMPORTED_MODULE_5__.ChannelWebService);
  let authorService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_author_service__WEBPACK_IMPORTED_MODULE_6__.AuthorService);
  let quillEditorService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_quill_editor_service__WEBPACK_IMPORTED_MODULE_7__.QuillEditorService);
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_8__.UiService);
  let walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getWalletService();
  let licenseQuillEditor;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: 'Create & Import',
    path: '/admin/channel/create-menu'
  }, {
    text: 'Create Collection'
  }];
  let swiper;
  highlight_js__WEBPACK_IMPORTED_MODULE_0__["default"].configure({
    languages: ['css']
  });
  let channelViewModel = {
    channel: {
      mintPrice: "0.00",
      authorId: walletService.address
    },
    themes: [],
    staticPages: [],
    editable: true,
    disableForks: false
  };
  let coverImage;
  let coverBanner;
  const formSubmit = async e => {
    e.preventDefault();
    let form = document.getElementById('create-channel-form');
    if (!form.reportValidity()) {
      document.getElementById('collection-title').scrollIntoView();
      return;
    }

    //Get data
    let channel = Object.assign(new _dto_channel__WEBPACK_IMPORTED_MODULE_9__.Channel(), $f7.form.convertToData('#create-channel-form'));

    //Get content from quill
    channel.description = quillEditorService.activeEditor.getContents();
    channel.license = licenseQuillEditor.getContents();

    //Convert numbers
    channel.sellerFeeBasisPoints = parseInt(channel.sellerFeeBasisPoints);

    //Parse attributeOptions and category
    if (channel.attributeOptions) {
      channel.attributeOptions = JSON.parse(channel.attributeOptions);
    } else {
      channel.attributeOptions = [];
    }
    if (channel.externalLinks) {
      channel.externalLinks = JSON.parse(channel.externalLinks);
    } else {
      channel.externalLinks = [];
    }
    if (channel.marketplaces) {
      channel.marketplaces = JSON.parse(channel.marketplaces);
    } else {
      channel.marketplaces = [];
    }
    channel.disableForks = channel.disableForks == "true";
    channel.showMintPage = channel.showMintPage == "true";
    channel.showActivityPage = channel.showActivityPage == "true";

    //Save
    try {
      await channelWebService.put(channel, coverImage, coverBanner);
      if (channel.authorId) {
        await authorService.insertIfNew(channel.authorId);
      }
      const toast = $f7.toast.show({
        text: 'Collection saved',
        closeTimeout: 2000,
        closeButton: true,
        position: 'bottom',
        horizontalPosition: 'left'
      });

      //Redirect
      $f7.views.main.router.navigate(`/admin/channel/show/${channel._id}`);
    } catch (ex) {
      console.log(ex);
      $f7.dialog.alert(ex.errors, "There was an error");
    }
  };
  $on('pageInit', async (e, page) => {
    $('#create-channel-form').attr('novalidate', 'novalidate');

    //Make sure quill is configured
    await quillEditorService.init();

    // //Categories
    // let categoryTagify = new Tagify(document.getElementById('category'))

    //Description
    quillEditorService.buildQuillPostEditor("#create-channel-description-editor", "#create-channel-description-toolbar");

    //License
    licenseQuillEditor = new (quill__WEBPACK_IMPORTED_MODULE_1___default())('#create-channel-license-editor', {
      bounds: ".page-content",
      modules: {
        toolbar: '#create-channel-license-toolbar'
      },
      theme: "snow"
    });

    // //Init swiper
    // swiper = $f7.swiper.create('.swiper', {
    //   speed: 1000,
    //   allowTouchMove: false,
    //   createElements:true,
    //   longSwipes: false,
    //   preventInteractionOnTransition: true,
    //   shortSwipes: false,
    //   simulateTouch: false,
    //   on: {
    //     slideChange: function (s) {

    //       if (s.activeIndex == 0) {
    //         document.getElementById('create-new-swiper').style.height = "700px"
    //       } 

    //       if (s.activeIndex == 1) {
    //         document.getElementById('create-new-swiper').style.height = "2500px"
    //       }

    //     }
    //   }
    // })
  });

  // const copyrightClick = async (e) => {

  //   channelViewModel.channel.disableForks = true

  //   await $update()
  //   swiper.slideNext(1000)

  // }

  // const copyleftClick = async (e) => {

  //   channelViewModel.channel.disableForks = false

  //   await $update()
  //   swiper.slideNext(1000)
  // }

  const backClick = async e => {
    swiper.slidePrev(1000);
  };
  $(document).on('cover-image-updated', async e => {
    coverImage = e.detail.coverImage;
  });
  $(document).on('cover-banner-updated', async e => {
    coverBanner = e.detail.coverBanner;
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="admin-create-channel">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_10__["default"]} breadcrumbs=${breadcrumbs} />

    <div class="page-content hide-toolbar-on-scroll">

        <!-- Slider container -->
        <form id="create-channel-form" @submit="${formSubmit}" class="fixed-width-content center">
      
          <div class="block-title block-title-medium">Create Collection</div>


          <${_admin_channel_form_f7_html__WEBPACK_IMPORTED_MODULE_11__["default"]} 
            channel=${channelViewModel} 
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

`
    }
    ;
}
framework7Component.id = '34f37ac255';
framework7Component.style = `



`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/edit.f7.html":
/*!*********************************************************!*\
  !*** ./src/admin/components/admin/channel/edit.f7.html ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_channel_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/channel-service */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _service_web_channel_web_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/web/channel-web-service */ "./src/admin/service/web/channel-web-service.ts");
/* harmony import */ var _service_image_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/image-service */ "./src/admin/service/image-service.ts");
/* harmony import */ var _service_theme_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/theme-service */ "./src/admin/service/theme-service.ts");
/* harmony import */ var _service_static_page_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../service/static-page-service */ "./src/admin/service/static-page-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _service_quill_editor_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../service/quill-editor-service */ "./src/admin/service/quill-editor-service.ts");
/* harmony import */ var _dto_channel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../dto/channel */ "./src/admin/dto/channel.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/* harmony import */ var _admin_channel_form_f7_html__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../admin/channel/form.f7.html */ "./src/admin/components/admin/channel/form.f7.html");
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! highlight.js */ "./node_modules/highlight.js/es/index.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quill */ "./node_modules/quill/dist/quill.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _yaireo_tagify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @yaireo/tagify */ "./node_modules/@yaireo/tagify/dist/tagify.min.js");
/* harmony import */ var _yaireo_tagify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_yaireo_tagify__WEBPACK_IMPORTED_MODULE_2__);
/** @jsx $jsx */





















function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let channelService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_channel_service__WEBPACK_IMPORTED_MODULE_4__.ChannelService);
  let channelWebService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_web_channel_web_service__WEBPACK_IMPORTED_MODULE_5__.ChannelWebService);
  let imageService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_image_service__WEBPACK_IMPORTED_MODULE_6__.ImageService);
  let themeService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService);
  let staticPageService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_static_page_service__WEBPACK_IMPORTED_MODULE_8__.StaticPageService);
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_9__.UiService);
  let quillEditorService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_quill_editor_service__WEBPACK_IMPORTED_MODULE_10__.QuillEditorService);
  let licenseQuillEditor;
  let channelViewModel = props.channelViewModel;
  let coverImage;
  let coverBanner;
  highlight_js__WEBPACK_IMPORTED_MODULE_0__["default"].configure({
    languages: ['css']
  });
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: channelViewModel.channel.title,
    path: `/admin/channel/show/${channelViewModel.channel._id}`
  }, {
    text: 'Edit Collection'
  }];
  const formSubmit = async e => {
    e.preventDefault();
    let form = document.getElementById('edit-channel-form');
    if (!form.reportValidity()) {
      document.getElementById('collection-title').scrollIntoView();
      return;
    }
    let existingChannel = Object.assign(new _dto_channel__WEBPACK_IMPORTED_MODULE_11__.Channel(), channelViewModel.channel);

    //Get data
    let channel = Object.assign(existingChannel, $f7.form.convertToData('#edit-channel-form'));

    //Get content from quill
    channel.description = quillEditorService.activeEditor.getContents();
    channel.license = licenseQuillEditor.getContents();

    //Convert numbers
    channel.sellerFeeBasisPoints = parseInt(channel.sellerFeeBasisPoints);

    //Parse attributeOptions and category
    if (channel.attributeOptions) {
      channel.attributeOptions = JSON.parse(channel.attributeOptions);
    } else {
      channel.attributeOptions = [];
    }
    if (channel.externalLinks) {
      channel.externalLinks = JSON.parse(channel.externalLinks);
    } else {
      channel.externalLinks = [];
    }
    if (channel.marketplaces) {
      channel.marketplaces = JSON.parse(channel.marketplaces);
    } else {
      channel.marketplaces = [];
    }
    channel.disableForks = channel.disableForks == "true";
    channel.showMintPage = channel.showMintPage == "true";
    channel.showActivityPage = channel.showActivityPage == "true";

    //Save
    try {
      await channelWebService.put(channel, coverImage, coverBanner);
      const toast = $f7.toast.show({
        text: 'Collection saved',
        closeTimeout: 2000,
        closeButton: true,
        position: 'bottom',
        horizontalPosition: 'left'
      });

      //Redirect
      $f7.views.main.router.navigate(`/admin/channel/show/${channel._id}`);
    } catch (ex) {
      $f7.dialog.alert(ex.errors, "There was an error");
    }
  };
  $on('pageInit', async (e, page) => {
    $('#edit-channel-form').attr('novalidate', 'novalidate');

    //Categories
    let categoryTagify = new (_yaireo_tagify__WEBPACK_IMPORTED_MODULE_2___default())(document.getElementById('category'));

    //Description
    quillEditorService.buildQuillPostEditor("#edit-channel-description-editor", "#edit-channel-description-toolbar");
    if (channelViewModel.channel.description) {
      quillEditorService.activeEditor.setContents(channelViewModel.channel.description);
    }

    //License
    licenseQuillEditor = new (quill__WEBPACK_IMPORTED_MODULE_1___default())('#edit-channel-license-editor', {
      bounds: ".page-content",
      modules: {
        toolbar: '#edit-channel-license-toolbar'
      },
      theme: "snow"
    });
    if (channelViewModel.channel.license) {
      licenseQuillEditor.setContents(channelViewModel.channel.license);
    }

    //Open attribute options too
    if (channelViewModel.channel?.attributeOptions?.length > 0) {
      for (let ao of channelViewModel.channel?.attributeOptions) {
        new (_yaireo_tagify__WEBPACK_IMPORTED_MODULE_2___default())(document.getElementById(`options-input-${ao.id}`));
      }
    }
  });
  $(document).on('cover-image-updated', async e => {
    coverImage = e.detail.coverImage;
  });
  $(document).on('cover-banner-updated', async e => {
    coverBanner = e.detail.coverBanner;
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="admin-edit-channel">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_12__["default"]} breadcrumbs=${breadcrumbs} />

    <div class="page-content hide-toolbar-on-scroll">

      <form id="edit-channel-form" @submit="${formSubmit}" class="fixed-width-content center">

        <div class="block-title block-title-medium">Edit Collection</div>


        <${_admin_channel_form_f7_html__WEBPACK_IMPORTED_MODULE_13__["default"]} 
          channel=${channelViewModel} 
          description_editor="edit-channel-description-editor"
          description_toolbar="edit-channel-description-toolbar" 
          license_editor="edit-channel-license-editor"
          license_toolbar="edit-channel-license-toolbar"  
        />



        <div class="block cancel-save-row">
      
          <div class="large-only"></div>

          <a href="/admin/channel/show/${channelViewModel.channel._id}" class="button button-outline color-gray" tabindex="30">
            Cancel
          </a>

          <button type="submit" class="button button-fill" tabindex="31" id="saveButton">
            Save
          </button>

        </div>

      </form>

    </div>
  </div>

`
    }
    ;
}
framework7Component.id = '53434cb26b';
framework7Component.style = `
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/fork-contract.f7.html":
/*!******************************************************************!*\
  !*** ./src/admin/components/admin/channel/fork-contract.f7.html ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/core/ipfs-service */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _service_core_import_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/import-service */ "./src/admin/service/core/import-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/* harmony import */ var _admin_toolbar_f7_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../admin/toolbar.f7.html */ "./src/admin/components/admin/toolbar.f7.html");
/** @jsx $jsx */







function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let importService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_import_service__WEBPACK_IMPORTED_MODULE_1__.ImportService);
  let ipfsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_2__.IpfsService);
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_3__.UiService);
  let walletService;
  let contractAddress = props.contractAddress;
  let owner;
  let channelId;
  let forking = false;
  let forkStatus;
  let forkOutput = "";
  let forkType = "existing";
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: 'Create & Import',
    path: '/admin/channel/create-menu'
  }, {
    text: 'Fork Collection From Contract'
  }];
  let ipfsReady = false;
  $on('pageInit', async () => {
    walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getWalletService();
    owner = await walletService.getAddress();

    //Initialize IPFS
    await ipfsService.init();
    ipfsReady = ipfsService.ipfs != undefined;
    await $update();
  });
  const radioButtonChange = async e => {
    e.preventDefault();
    forkType = $(e.currentTarget).val();
    await $update();
  };
  const formSubmit = async e => {
    e.preventDefault();
    let formData = $f7.form.convertToData('#import-fork-contract');
    forking = true;
    $update();
    uiService.showSpinner('Forking...');
    try {
      if (forkType == "existing") {
        channelId = await importService.importExistingFromContract(formData.contractAddress);
      } else {
        channelId = await importService.importAsForkFromContract(formData.contractAddress);
      }
      uiService.hideSpinner();
    } catch (ex) {
      console.log(ex);
      uiService.hideSpinner();
      $f7.dialog.alert(ex.message, "There was an error");
    }
    forking = false;
    $update();
  };
  $(document).on('fork-progress', async e => {
    if (e.detail.message) {
      forkOutput = `<p>${e.detail.message}</p>`;
    }
    forkStatus = e.detail.forkStatus;
    forking = true;
    $update();
    let outputElement = document.getElementById('ipfs-fork-process');
    if (outputElement) {
      $(outputElement).scrollTop(outputElement.scrollHeight);
    }
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="admin-fork-contract">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_4__["default"]} breadcrumbs=${breadcrumbs} />
    <${_admin_toolbar_f7_html__WEBPACK_IMPORTED_MODULE_5__["default"]} />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">
        <form  @submit="${formSubmit}" id="import-fork-contract">

          <div class="block-title">Fork Collection From Contract</div>
  
           ${walletService?.address ? $h`
          
  
            <div class="card">
              <div class="card-content card-content-padding">
                ${!ipfsReady ? $h`
                  <div class="ipfs-label">IPFS Initializing...</div>
              ` : $h`
                  <div class="ipfs-label">
                      Status: <a href="/admin/connect">IPFS Ready</a>
                  </div>
              `}
              </div>
            </div>
  
            ${ipfsReady & !forking & !channelId ? $h`
  
              <div class="block-header">
                A <em>fork</em> is a copy of an NFT collection. Forking a project allows you to freely experiment with changes without affecting the original project.
              </div>
    
              <div class="list media-list inset">
                <ul>
                  <li>
                    <label class="item-radio item-radio-icon-start item-content">
                      <input type="radio" name="demo-media-radio" checked @change="${radioButtonChange}" value="existing" />
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
                      <input type="radio" name="demo-media-radio" @change="${radioButtonChange}" value="fork" />
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
                            <input type="text" name="contractAddress" placeholder="Enter Contract Address" value="${contractAddress ? contractAddress : ''}" required />
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
  
                
            ` : $h`
                <p></p>
            `}
  
  
  
            ${forking || forkOutput ? $h`
  
              <div class="card">
  
                ${forking ? $h`
                  <div class="card-header">
                      Forking...
                  </div>  
    
                ` : $h`<span />`}
    
  
                <div class="card-content">
                    <div class="card-content card-content-padding">
    
                      ${forkOutput ? $h`
  
                        ${forkStatus? $h`
  
                          <div class="data-table ">
                            <table>
                              <thead>
                                <th class="label-cell">Type</th>
                                <th class="numeric-cell">Saved</th>
                                <th class="numeric-cell">Total</th>
                              </thead>
                              <tbody>
                                <tr class="${forkStatus.animations.saved == forkStatus.animations.total && forkStatus.animations.total > 0 ? 'complete' : ''}">
                                  <td class="label-cell">Animations</td>
                                  <td class="numeric-cell">${forkStatus.animations.saved}</td>
                                  <td class="numeric-cell">${forkStatus.animations.total ? forkStatus.animations.total : "?"} </td>
                                </tr>
                                <tr class="${forkStatus.images.saved == forkStatus.images.total && forkStatus.images.total > 0 ? 'complete' : ''}">
                                  <td class="label-cell">Images</td>
                                  <td class="numeric-cell">${forkStatus.images.saved}</td>
                                  <td class="numeric-cell">${forkStatus.images.total ? forkStatus.images.total : "?"}</td>
                                </tr>
                                <tr class="${forkStatus.items.saved == forkStatus.items.total && forkStatus.items.total > 0 ? 'complete' : ''}">
                                  <td class="label-cell">Items</td>
                                  <td class="numeric-cell">${forkStatus.items.saved}</td>
                                  <td class="numeric-cell">${forkStatus.items.total}</td>
                                </tr>
                                <tr class="${forkStatus.channels.saved == forkStatus.channels.total && forkStatus.channels.total > 0 ? 'complete' : ''}">
                                  <td class="label-cell">Channels</td>
                                  <td class="numeric-cell">${forkStatus.channels.saved}</td>
                                  <td class="numeric-cell">${forkStatus.channels.total}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
  
  
  
                        ` : $h`<span />`}
  
  
                        ${!channelId ? $h`
                          <div class="fork-output-simple" innerHTML="${forkOutput}" id="ipfs-fork-process" ></div>
                        ` : $h`
                        
                          <div class="block save-row">
  
                            <div class="large-only"></div>
      
                            <a href="/admin/channel/show/${channelId}" class="button button-fill color-green" class="button button-fill" tabindex="12">
                              View Collection
                            </a>  
                          </div>
  
                        `}
  
  
                      ` : $h`<span />`}
  
  
    
                    </div>
                </div>
    
              </div>
  
            ` : $h`
              <span />
            `}
  
          ` : $h`
            <div class="block-header">
              Use a web browser with wallet support to import an existing ERC-721 collection.
            </div>
          `}
  
  
  
        </form>
      </div>

    </div>
  </div>

`
    }
    ;
}
framework7Component.id = 'b93b770e0f';
framework7Component.style = `

`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/fork-reader.f7.html":
/*!****************************************************************!*\
  !*** ./src/admin/components/admin/channel/fork-reader.f7.html ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/core/ipfs-service */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _service_core_import_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/import-service */ "./src/admin/service/core/import-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/** @jsx $jsx */








function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let importService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_import_service__WEBPACK_IMPORTED_MODULE_1__.ImportService);
  let ipfsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_2__.IpfsService);
  let walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getWalletService();
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_3__.UiService);
  let ipfsReady = ipfsService.ipfs != undefined;
  let peerCount = ipfsService.peerCount;
  let contractInfo;
  let forking = false;
  let forkStatus;
  let forkOutput = "";
  let channel;
  let author;
  let owner;
  let customName;
  let channelId;
  let forkType = "existing";
  let readerTitle;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: 'Create & Import',
    path: '/admin/channel/create-menu'
  }, {
    text: 'Fork Collection From Reader'
  }];

  //Check hash to see if we are linking to a Reader
  let search = window.location.hash ? window.location.hash.substring(window.location.hash?.indexOf("?"), window.location.hash.length) : undefined;
  const urlParams = new URLSearchParams(search);
  let readerConfig = {};
  if (urlParams.get('path')) {
    //Get the title
    readerConfig.path = decodeURIComponent(urlParams.get('path'));
  }
  const loadCollection = async e => {
    try {
      owner = await walletService.getAddress();
      channel = await getChannel();
      author = await getAuthor();
      contractInfo = await getContractInfo();
      readerConfig.title = channel.title;
      customName = channel.title;
    } catch (ex) {
      $f7.dialog.alert(ex, "Error loading collection. Not found.");
    }
  };
  const continueSubmit = async e => {
    e.preventDefault();
    readerConfig.path = $('#libraryURL').val();
    await loadCollection();
    await $update();
  };
  const truncateEthAddress = address => {
    return walletService.truncateEthAddress(address);
  };

  // const getBaseURI = () => {

  //   let baseURI = window.location.pathname

  //   //Get what's before admin
  //   return baseURI.substring(0, baseURI.indexOf('large/index.html'))

  // }

  const getChannel = async () => {
    let response = await axios__WEBPACK_IMPORTED_MODULE_4__["default"].get(`${readerConfig.path}backup/export/backup/channels.json`);
    let channels = response.data;
    return channels[0];
  };
  const getAuthor = async () => {
    let response = await axios__WEBPACK_IMPORTED_MODULE_4__["default"].get(`${readerConfig.path}backup/export/backup/authors.json`);
    let authors = response.data;
    return authors[0];
  };
  const getContractInfo = async () => {
    try {
      let response = await axios__WEBPACK_IMPORTED_MODULE_4__["default"].get(`${readerConfig.path}backup/contract/contract.json`);
      let contract = response.data;
      return contract;
    } catch (ex) {
      console.log(ex);
    }
  };
  $on('pageInit', async () => {
    if (readerConfig.path) {
      await loadCollection();
    }
    await $update();
  });
  const radioButtonChange = async e => {
    e.preventDefault();
    forkType = $(e.currentTarget).val();
    await $update();
  };
  const collectionTitleChange = async e => {
    e.preventDefault();
    customName = $(e.currentTarget).val();
    await $update();
  };
  const formSubmit = async e => {
    e.preventDefault();
    forking = true;
    await $update();
    uiService.showSpinner('Forking...');

    //Make sure it's a valid channel
    try {
      if (forkType == "existing") {
        channelId = await importService.importExistingFromReader(readerConfig.path, contractInfo.contractAddress, contractInfo.ipfsCid);
      } else {
        channelId = await importService.importAsForkFromReader(readerConfig.path, customName);
      }
      uiService.hideSpinner();
    } catch (ex) {
      uiService.hideSpinner();
      $f7.dialog.alert(ex.message, "Error loading collection");
    }
    forking = false;
    await $update();
  };
  $(document).on('fork-progress', async e => {
    if (e.detail.message) {
      forkOutput = `<p>${e.detail.message}</p>`;
    }
    forkStatus = e.detail.forkStatus;
    forking = true;
    $update();
    let outputElement = document.getElementById('ipfs-fork-process');
    if (outputElement) {
      $(outputElement).scrollTop(outputElement.scrollHeight);
    }
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="admin-fork-contract">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_5__["default"]} reader_config=${readerConfig} breadcrumbs=${breadcrumbs}  />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        <div class="block-title">Fork Collection From Reader</div>

        ${!forking & !channelId ? $h`
  
          ${channel ? $h`
          
            <form @submit="${formSubmit}" id="import-from-reader">
  
              <div class="block-header">
                A <em>fork</em> is a copy of an NFT collection. Forking a project allows you to freely experiment with changes without affecting the original project. 
              </div>
  
              <div class="list media-list inset">
                <ul>
                  <li>
                    <label class="item-radio item-radio-icon-start item-content">
                      <input type="radio" name="demo-media-radio" checked @change="${radioButtonChange}" value="existing" />
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
                      <input type="radio" name="demo-media-radio" @change="${radioButtonChange}" value="fork" />
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
  
              ${!channelId ? $h`
                <div class="block block-strong inset fork-block">
  
                  <p>Forking <a href="${readerConfig.path}" class="external">${channel.title}</a></p>
    
                  <div class="repo-name">
    
                    <div class="left">
                      <strong>Author</strong>
    
                      <div class="list no-hairlines" style="margin: 0; padding-left: 0px;">
                        <ul>
                          <li class="item-content item-input" style="padding-left: 0px;">
                            <div class="item-inner">
                              <div class="item-input-wrap">
                                <select id="collection-author">
                                  ${forkType == "existing" && author != undefined ? $h`
                                    <option value="${author._id}">${truncateEthAddress(author._id)} (Original Author)</option>
                                  ` : $h`
    
                                    ${owner ? $h`
                                      <option value="${owner}">${truncateEthAddress(owner)}</option>
                                    ` : $h`
                                      <option value="">None</option>
                                    `}
                                    
                                  ` }
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
    
                                ${forkType == "existing" ? $h`
                                  <div class="item-input-wrap ">
                                    ${channel.title}
                                  </div>
                                ` : $h`
                                  <div class="item-input-wrap ">
                                    <input type="text" value="${readerConfig.title}" @change="${collectionTitleChange}" />
                                    <span class="input-clear-button"></span>
                                  </div>
                                ` }
    
                            </div>
                          </li>
                        </ul>
                      </div>
    
                    </div>
                  </div>
                  
    
                  <p>
                    You are downloading all project data, including images and HTML, into a local web-based <a href="https://pouchdb.com" class="external">database</a> on your device.
                  </p>
    
                  ${!forking? $h`
                    <button type="submit" class="button button-fill col-30" tabindex="12" style="margin-bottom: 10px; width: 200px;">
                      <i class="material-icons">fork_left</i> Create Fork
                    </button>
                  ` : $h`
                      <span />
                  `}
    
                </div>
              ` : $h`<span />`}
  
            </form>
  
  
          ` : $h`
            
            <form @submit="${continueSubmit}">
  
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
          
        ` : $h`<span />`}
  
  
        ${forking || forkOutput ? $h`
  
          <div class="card">
  
            ${forking ? $h`
              <div class="card-header">
                  Forking...
              </div>  
  
            ` : $h`<span />`}
  
  
            <div class="card-content">
                <div class="card-content card-content-padding">
  
  
                  ${forkOutput ? $h`
  
                    ${forkStatus? $h`
                      <div class="data-table">
                        <table>
                          <thead>
                            <th class="label-cell">Type</th>
                            <th class="numeric-cell">Saved</th>
                            <th class="numeric-cell">Total</th>
                          </thead>
                          <tbody>
                            <tr class="${forkStatus.channels.saved == forkStatus.channels.total && forkStatus.channels.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Channels</td>
                              <td class="numeric-cell">${forkStatus.channels.saved}</td>
                              <td class="numeric-cell">${forkStatus.channels.total}</td>
                            </tr>
                            <tr class="${forkStatus.authors.saved == forkStatus.authors.total && forkStatus.authors.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Authors</td>
                              <td class="numeric-cell">${forkStatus.authors.saved}</td>
                              <td class="numeric-cell">${forkStatus.authors.total}</td>
                            </tr>
                            <tr class="${forkStatus.animations.saved == forkStatus.animations.total && forkStatus.animations.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Animations</td>
                              <td class="numeric-cell">${forkStatus.animations.saved}</td>
                              <td class="numeric-cell">${forkStatus.animations.total}</td>
                            </tr>
  
                            <tr class="${forkStatus.images.saved == forkStatus.images.total && forkStatus.images.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Images</td>
                              <td class="numeric-cell">${forkStatus.images.saved}</td>
                              <td class="numeric-cell">${forkStatus.images.total}</td>
                            </tr>
                            <tr class="${forkStatus.themes.saved == forkStatus.themes.total && forkStatus.themes.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Themes</td>
                              <td class="numeric-cell">${forkStatus.themes.saved}</td>
                              <td class="numeric-cell">${forkStatus.themes.total}</td>
                            </tr>
                            <tr class="${forkStatus.staticPages.saved == forkStatus.staticPages.total && forkStatus.staticPages.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Static Pages</td>
                              <td class="numeric-cell">${forkStatus.staticPages.saved}</td>
                              <td class="numeric-cell">${forkStatus.staticPages.total}</td>
                            </tr>
                            <tr class="${forkStatus.items.saved == forkStatus.items.total && forkStatus.items.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Items</td>
                              <td class="numeric-cell">${forkStatus.items.saved}</td>
                              <td class="numeric-cell">${forkStatus.items.total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ` : $h`<span />`}
  
  
                    ${!channelId ? $h`
                      <div class="fork-output" innerHTML="${forkOutput}" id="ipfs-fork-process" ></div>
                    ` : $h`
  
                      <br />
  
                      <div class="block save-row">
  
                        <div class="large-only"></div>
  
                        <a href="/admin/channel/show/${channelId}" class="button button-fill color-green" class="button button-fill" tabindex="12">
                          View Collection
                        </a>  
                      </div>
  
  
                    
                    `}
  
  
                  ` : $h`<span />`}
  
  
  
                </div>
            </div>
  
          </div>
  
        ` : $h`
          <span />
        `}

      </div>

    </div>

  </div>

`
    }
    ;
}
framework7Component.id = 'd070365598';
framework7Component.style = `





`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/fork.f7.html":
/*!*********************************************************!*\
  !*** ./src/admin/components/admin/channel/fork.f7.html ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/core/ipfs-service */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _service_core_import_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/import-service */ "./src/admin/service/core/import-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/** @jsx $jsx */






function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let importService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_import_service__WEBPACK_IMPORTED_MODULE_1__.ImportService);
  let ipfsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_2__.IpfsService);
  let walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getWalletService();
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_3__.UiService);
  let ipfsReady = ipfsService.ipfs != undefined;
  let peerCount = ipfsService.peerCount;
  let cid = props.cid;
  let forking = false;
  let forkStatus;
  let forkOutput = "";
  let forkType = "existing";
  let channel;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: 'Create & Import',
    path: '/admin/channel/create-menu'
  }, {
    text: 'Fork Collection From IPFS Hash'
  }];
  $on('pageInit', async () => {
    //Initialize IPFS
    await ipfsService.init();
    ipfsReady = ipfsService.ipfs != undefined;
    await $update();
  });
  const formSubmit = async e => {
    e.preventDefault();
    let formData = $f7.form.convertToData('#import-ipfs-hash');
    forking = true;
    $update();
    uiService.showSpinner('Forking...');
    try {
      channel = await importService.importFromIPFS(formData.hash, forkType, formData.authorId);
    } catch (ex) {
      console.log(ex);
      uiService.hideSpinner();
      $f7.dialog.alert(ex.message, "There was an error");
    }
    uiService.hideSpinner();
    forking = false;
    $update();
  };
  $(document).on('fork-progress', async e => {
    if (e.detail.message) {
      forkOutput = `<p>${e.detail.message}</p>`;
    }
    forkStatus = e.detail.forkStatus;
    forking = true;
    $update();
    let outputElement = document.getElementById('ipfs-fork-process');
    if (outputElement) {
      $(outputElement).scrollTop(outputElement.scrollHeight);
    }
  });
  const radioButtonChange = async e => {
    e.preventDefault();
    forkType = $(e.currentTarget).val();
    await $update();
  };
  $(document).on('update-peers', async e => {
    peerCount = e.detail.count;
    $update();
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="admin-fork">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_4__["default"]} breadcrumbs=${breadcrumbs} />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        <form @submit="${formSubmit}" id="import-ipfs-hash">

          <div class="block-title">Fork Collection From IPFS Hash</div>
  
          <div class="card">
            <div class="card-content card-content-padding">
              ${!ipfsReady ? $h`
                <div class="ipfs-label">IPFS Initializing...</div>
            ` : $h`
                <div class="ipfs-label">
                    Status: <a href="/admin/connect">IPFS Ready</a>
                </div>
            `}
            </div>
          </div>
  
          ${!forking & !channel ? $h`
            
            <div class="block-header">
              A <em>fork</em> is a copy of an NFT collection. Forking a project allows you to freely experiment with changes without affecting the original project.
            </div>
  
            <div class="list media-list inset">
              <ul>
                <li>
                  <label class="item-radio item-radio-icon-start item-content">
                    <input type="radio" name="demo-media-radio" checked @change="${radioButtonChange}" value="existing" />
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
                    <input type="radio" name="demo-media-radio" @change="${radioButtonChange}" value="fork" />
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
  
  
            ${forkType == "fork" && walletService.address ? $h`
              <div class="block-title block-title-small">Author</div>
  
              <div class="list no-hairlines inset">
                <ul>
                  <li class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-input-wrap">
                        <select id="collection-author" name="authorId">
                          <option value="">Original Author</option>
                          <option value="${walletService.address}">${walletService.address}</option>
                        </select>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ` : $h`<span />`}
          
            
          ` : $h`<span />`}
  
  
          <div class="card">
  
            ${forking ? $h`
              <div class="card-header">
                  Forking...
              </div>  
  
            ` : $h`<span />`}
  
  
            <div class="card-content">
  
              <div class="card-content card-content-padding">
   
                  
                  ${forkOutput ? $h`
  
                    ${forkStatus? $h`
  
                      <div class="data-table">
                        <table>
                          <thead>
                            <th class="label-cell">Type</th>
                            <th class="numeric-cell">Saved</th>
                            <th class="numeric-cell">Total</th>
                          </thead>
                          <tbody>
                            <tr class="${forkStatus.authors.saved == forkStatus.authors.total && forkStatus.authors.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Authors</td>
                              <td class="numeric-cell">${forkStatus.authors.saved}</td>
                              <td class="numeric-cell">${forkStatus.authors.total}</td>
                            </tr>
                            <tr class="${forkStatus.channels.saved == forkStatus.channels.total && forkStatus.channels.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Channels</td>
                              <td class="numeric-cell">${forkStatus.channels.saved}</td>
                              <td class="numeric-cell">${forkStatus.channels.total}</td>
                            </tr>
                            <tr class="${forkStatus.animations.saved == forkStatus.animations.total && forkStatus.animations.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Animations</td>
                              <td class="numeric-cell">${forkStatus.animations.saved}</td>
                              <td class="numeric-cell">${forkStatus.animations.total}</td>
                            </tr>
  
                            <tr class="${forkStatus.images.saved == forkStatus.images.total && forkStatus.images.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Images</td>
                              <td class="numeric-cell">${forkStatus.images.saved}</td>
                              <td class="numeric-cell">${forkStatus.images.total}</td>
                            </tr>
                            <tr class="${forkStatus.themes.saved == forkStatus.themes.total && forkStatus.themes.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Themes</td>
                              <td class="numeric-cell">${forkStatus.themes.saved}</td>
                              <td class="numeric-cell">${forkStatus.themes.total}</td>
                            </tr>
                            <tr class="${forkStatus.staticPages.saved == forkStatus.staticPages.total && forkStatus.staticPages.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Static Pages</td>
                              <td class="numeric-cell">${forkStatus.staticPages.saved}</td>
                              <td class="numeric-cell">${forkStatus.staticPages.total}</td>
                            </tr>
                            <tr class="${forkStatus.items.saved == forkStatus.items.total && forkStatus.items.total > 0 ? 'complete' : ''}">
                              <td class="label-cell">Items</td>
                              <td class="numeric-cell">${forkStatus.items.saved}</td>
                              <td class="numeric-cell">${forkStatus.items.total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
  
                    ` : $h`<span />`}
         
  
                    ${!channel ? $h`
                      <div class="fork-output-simple" innerHTML="${forkOutput}" id="ipfs-fork-process" ></div>
                    ` : $h`
                    
                      <div class="block save-row">
  
                        <div class="large-only"></div>
  
                        <a href="/admin/channel/show/${channel}" class="button button-fill color-green" class="button button-fill" tabindex="12">
                          View Collection
                        </a>  
                      </div>
                    `}
                    
                  
                  ` : $h`<span />`}
  
  
                  ${ipfsReady & !forking & !channel ? $h`
  
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
                                  <input type="text" name="hash" placeholder="Enter IPFS Hash" value="${cid ? cid : ''}" required />
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
  
                      
                  ` : $h`
                      <p></p>
                  `}
  
  
  
                </div>
            </div>
          </div>
  
  
        </form>

      </div>

    </div>
  </div>

`
    }
    ;
}
framework7Component.id = 'f86eaabfac';
framework7Component.style = `
  .ipfs-label,
  .fork-label {
      margin-top: 10px;
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 18px;
  }

  .fork-output {
      border: 1px solid #cccccc;
      font-size: 13px;
      width: 100%;
      max-width: 100%;
      padding: 5px;
      height: 300px;
      overflow-y: scroll;
  }

  .fork-status {
      font-size: 14px;
      padding: 10px;
      border: 1px solid #f1f1f1;
  }

  .fork-status .item label {
      font-weight: bold;
      display: inline-block;
      width: 180px;
  }



`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/form.f7.html":
/*!*********************************************************!*\
  !*** ./src/admin/components/admin/channel/form.f7.html ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _service_core_upload_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/core/upload-service */ "./src/admin/service/core/upload-service.ts");
/* harmony import */ var _service_image_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/image-service */ "./src/admin/service/image-service.ts");
/* harmony import */ var _service_channel_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/channel-service */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _util_languages__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../util/languages */ "./src/admin/util/languages.ts");
/* harmony import */ var _yaireo_tagify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @yaireo/tagify */ "./node_modules/@yaireo/tagify/dist/tagify.min.js");
/* harmony import */ var _yaireo_tagify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_yaireo_tagify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/utils/units.js");
/** @jsx $jsx */












function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getWalletService();
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_2__.UiService);
  let channelService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_channel_service__WEBPACK_IMPORTED_MODULE_3__.ChannelService);
  let uploadService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_upload_service__WEBPACK_IMPORTED_MODULE_4__.UploadService);
  let imageService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_image_service__WEBPACK_IMPORTED_MODULE_5__.ImageService);
  const setMintPrice = value => {
    //Reset
    mintPrice = undefined;
    mintPriceWei = undefined;
    if (!value) return;
    let wei = ethers__WEBPACK_IMPORTED_MODULE_6__.parseUnits(value, 'ether');
    try {
      mintPrice = ethers__WEBPACK_IMPORTED_MODULE_6__.formatUnits(wei);
      mintPriceWei = wei.toString();
    } catch (ex) {
      console.log(ex);
    }
  };

  // const setRoyalty = (value) => {

  //     channelViewModel.channel.sellerFeeBasisPoints = undefined
  //     channelViewModel.channel.royaltyPercent = undefined

  //     if (value) {
  //         channelViewModel.channel.royaltyPercent = value
  //         channelViewModel.channel.sellerFeeBasisPoints = parseInt(value * 100)
  //     }

  // }

  const mintPriceChange = async e => {
    setMintPrice(e.currentTarget.value);
    await $update();
  };

  // const royaltyChange = async (e) => {
  //     setRoyalty(e.currentTarget.value)
  //     await $update()
  // }

  const contractAddressChange = async e => {
    channelViewModel.channel.contractAddress = e.currentTarget.value;
    await $update();
  };
  const handleCoverImageBrowseClick = async e => {
    $("#cover-image-browse").click();
  };
  const handleCoverImageChange = async e => {
    let imageBuffer = await uploadService.uploadFile(document.getElementById('cover-image-browse'));
    let coverImage = await imageService.newFromBuffer(imageBuffer);
    const coverImageUpdatedEvent = new CustomEvent('cover-image-updated', {
      detail: {
        coverImage: coverImage
      }
    });
    document.dispatchEvent(coverImageUpdatedEvent);
    channelViewModel.coverImage = {
      cid: coverImage.cid,
      url: await imageService.getUrl(coverImage)
    };
    await $update();
  };
  const handleBannerBrowseClick = async e => {
    $("#banner-browse").click();
  };
  const handleBannerChange = async e => {
    let imageBuffer = await uploadService.uploadFile(document.getElementById('banner-browse'));
    let coverBanner = await imageService.newFromBuffer(imageBuffer);
    const coverBannerUpdatedEvent = new CustomEvent('cover-banner-updated', {
      detail: {
        coverBanner: coverBanner
      }
    });
    document.dispatchEvent(coverBannerUpdatedEvent);
    channelViewModel.coverBanner = {
      cid: coverBanner.cid,
      url: await imageService.getUrl(coverBanner)
    };
    await $update();
  };
  const safeCSSId = text => {
    return encodeURIComponent(text).toLowerCase().replace(/\.|%[0-9a-z]{2}/gi, '');
  };
  const disableForksChange = async e => {
    channelViewModel.channel.disableForks = $(e.currentTarget).val() == "true";
    showCC0Link = !channelViewModel.channel.disableForks;
    await $update();
  };
  const showMintChange = async e => {
    channelViewModel.channel.showMintPage = $(e.currentTarget).val() == "true";
    await $update();
  };
  const showActivityChange = async e => {
    channelViewModel.channel.showActivityPage = $(e.currentTarget).val() == "true";
    await $update();
  };
  const gitProviderChange = async e => {
    channelViewModel.channel.gitProvider = $(e.currentTarget).val();
    await $update();
  };
  const editCategory = async function (e) {
    e.preventDefault();
    let id = $(e.target).data('id');
    let category = attributeOptions.find(ao => ao.id == id);
    $f7.form.fillFromData('#save-attribute-form', category);
    await $update();
    $f7.popup.open('.edit-category-popup');
  };
  const deleteOptionClick = async e => {
    e.preventDefault();
    let id = $(e.currentTarget).data('id');
    attributeOptions = attributeOptions.filter(ao => ao.id != id);
    await $update();
  };
  const addCategoryClick = async e => {
    let category = {
      id: (0,uuid__WEBPACK_IMPORTED_MODULE_7__["default"])(),
      traitType: '',
      values: []
    };
    $f7.form.fillFromData('#save-attribute-form', category);
    await $update();
    $f7.popup.open('.edit-category-popup');
  };
  const addAttributeSubmit = async e => {
    e.preventDefault();
    $f7.popup.close('.edit-category-popup');
  };
  const editExternalLink = async function (e) {
    e.preventDefault();
    let id = $(e.target).data('id');
    let externalLink = externalLinks.find(el => el.id == id);
    $f7.form.fillFromData('#save-external-links-form', externalLink);
    await $update();
    $f7.popup.open('.edit-external-links-popup');
  };
  const deleteExternalLink = async e => {
    e.preventDefault();
    let id = $(e.currentTarget).data('id');
    console.log(id);
    externalLinks = externalLinks.filter(el => el.id != id);
    await $update();
  };
  const addExternalLinkClick = async e => {
    let externalLink = {
      id: (0,uuid__WEBPACK_IMPORTED_MODULE_7__["default"])(),
      name: '',
      link: ''
    };
    $f7.form.fillFromData('#save-external-links-form', externalLink);
    await $update();
    $f7.popup.open('.edit-external-links-popup');
  };
  const addExternalLinkSubmit = async e => {
    e.preventDefault();
    $f7.popup.close('.edit-external-links-popup');
  };
  const editMarketplace = async function (e) {
    e.preventDefault();
    let id = $(e.target).data('id');
    let marketplace = marketplaces.find(el => el.id == id);
    $f7.form.fillFromData('#save-marketplaces-form', marketplace);
    await $update();
    $f7.popup.open('.edit-marketplaces-popup');
  };
  const deleteMarketplace = async e => {
    e.preventDefault();
    let id = $(e.currentTarget).data('id');
    marketplaces = marketplaces.filter(m => m.id != id);
    await $update();
  };
  const addMarketplaceClick = async e => {
    let marketplace = {
      id: (0,uuid__WEBPACK_IMPORTED_MODULE_7__["default"])(),
      name: '',
      link: ''
    };
    $f7.form.fillFromData('#save-marketplaces-form', marketplace);
    await $update();
    $f7.popup.open('.edit-marketplaces-popup');
  };
  const addMarketplaceSubmit = async e => {
    e.preventDefault();
    $f7.popup.close('.edit-marketplaces-popup');
  };
  $(document).on('popup:closed', '.edit-category-popup', async e => {
    let data = $f7.form.convertToData('#save-attribute-form');
    let category = {
      id: data.id,
      traitType: data.traitType,
      values: data.values ? JSON.parse(data.values).map(v => v["value"]) : []
    };
    if (!category.traitType) return;
    let existing = attributeOptions.find(ao => ao.id == category.id);
    if (existing) {
      Object.assign(existing, category);
    } else {
      attributeOptions.push(category);
    }
    await $update();
  });
  $(document).on('popup:open', '.edit-category-popup', async e => {
    new (_yaireo_tagify__WEBPACK_IMPORTED_MODULE_0___default())(document.getElementById(`options-input`));
    $('input[name="traitType"]').focus();
  });
  $(document).on('popup:closed', '.edit-external-links-popup', async e => {
    let data = $f7.form.convertToData('#save-external-links-form');
    if (data.name) {
      let externalLink = {
        id: data.id,
        name: data.name,
        link: data.link
      };
      let existing = externalLinks.find(el => el.id == externalLink.id);
      if (existing) {
        Object.assign(existing, externalLink);
      } else {
        externalLinks.push(externalLink);
      }
    }
    await $update();
  });
  $(document).on('popup:closed', '.edit-marketplaces-popup', async e => {
    let data = $f7.form.convertToData('#save-marketplaces-form');
    if (data.name) {
      let marketplace = {
        id: data.id,
        name: data.name,
        link: data.link
      };
      let existing = marketplaces.find(el => el.id == marketplace.id);
      if (existing) {
        Object.assign(existing, marketplace);
      } else {
        marketplaces.push(marketplace);
      }
    }
    await $update();
  });
  let channelViewModel = props.channel;
  let descriptionToolbarId = props.description_toolbar;
  let descriptionEditorId = props.description_editor;
  let licenseToolbarId = props.license_toolbar;
  let licenseEditorId = props.license_editor;
  let showCC0Link = !channelViewModel.channel.disableForks;
  let attributeOptions = [];
  let externalLinks = [];
  let marketplaces = [];
  let mintPrice;
  let mintPriceWei;

  //Set values if passed in
  if (channelViewModel) {
    setMintPrice(channelViewModel.channel.mintPrice);
    // setRoyalty(channelViewModel.channel.royaltyPercent)

    if (channelViewModel?.channel?.attributeOptions?.length > 0) {
      attributeOptions = channelViewModel.channel.attributeOptions;
    }
    if (channelViewModel.channel.externalLinks?.length > 0) {
      externalLinks = channelViewModel.channel.externalLinks;
    }
    if (channelViewModel.channel.marketplaces?.length > 0) {
      marketplaces = channelViewModel.channel.marketplaces;
    }
  }
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

    <div>
        <input type="hidden" name="_id" value="${channelViewModel?.channel?._id}" />
        <input type="hidden" name="_rev" value="${channelViewModel?.channel?._rev}" />
        <input type="hidden" name="dateCreated" value="${channelViewModel?.channel?.dateCreated}" />
        <input type="hidden" name="authorId" value="${channelViewModel?.channel?.authorId}" />
        <input type="hidden" name="contractAddress" value="${channelViewModel?.channel?.contractAddress}" />

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
                                            ${channelViewModel.editable ? $h`
                                            <input type="text" name="title" placeholder="Collection title"
                                                value="${channelViewModel?.channel?.title}" required minlength="3"
                                                tabindex="1" id="collection-title" />
                                            ` : $h`
                                            <input type="text" name="title" placeholder="Collection title"
                                                value="${channelViewModel?.channel?.title}" required minlength="3"
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
    
                                            ${channelViewModel.editable ? $h`
                                            <input type="text" name="symbol" placeholder="Symbol (eg BAYC)"
                                                value="${channelViewModel?.channel?.symbol}" tabindex="2"
                                                required id="collection-symbol" />
                                            ` : $h`
                                            <input type="text" name="symbol" placeholder="Symbol (eg BAYC)"
                                                value="${channelViewModel?.channel?.symbol}" tabindex="2" required
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
    
                                        <div id="${descriptionToolbarId}">
    
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
                                            id="${descriptionEditorId}" tabindex="3"></div>
    
                                    </div>
                                </div>
                            </li>
    
                            <li class="item-content item-input">
                                <div class="item-inner">
                                    <div class="item-title item-label">Language</div>
                                    <!-- additional "input-dropdown-wrap" class -->
                                    <div class="item-input-wrap input-dropdown-wrap">
                                        <select name="language" tabindex="9">
                                            ${_util_languages__WEBPACK_IMPORTED_MODULE_8__["default"].map( language => $h`
                                            ${channelViewModel?.channel?.language == language ? $h`
                                            <option value="${language}" selected>${language}</option>
                                            ` : $h`
                                            <option value="${language}">${language}</option>
                                            `}
                                            `)}
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

                        <form @submit="${addAttributeSubmit}" id="save-attribute-form">
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

                        <form @submit="${addExternalLinkSubmit}" id="save-external-links-form">

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

                        <form @submit="${addMarketplaceSubmit}" id="save-marketplaces-form">

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

                                                ${channelViewModel.coverImage ? $h`
                                                <img class="avatar-preview" src="${channelViewModel?.coverImage.url}" alt="Collection avatar" />

                                                ` : $h`
                                                <i class="material-icons avatar-preview">image</i>
                                                `}

                                                <input type="button" class="button button-fill browse-file"
                                                    value="Browse" @click="${handleCoverImageBrowseClick}"
                                                    tabindex="4" />
                                                <input type="hidden" name="coverImageId"
                                                    value="${channelViewModel?.coverImage?.cid}" />
                                                <input type="file" id="cover-image-browse" style="display: none"
                                                    @change="${handleCoverImageChange}" />

                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Collection Banner</div>
                                            <div class="item-input-wrap">

                                                ${channelViewModel?.coverBanner ? $h`
                                                <img class="cover-banner-preview"
                                                    src="${channelViewModel?.coverBanner.url}" />
                                                ` : $h`
                                                <i class="material-icons cover-banner-preview">image</i>
                                                `}

                                                <input type="button" class="button button-fill browse-file"
                                                    value="Browse" @click="${handleBannerBrowseClick}" tabindex="5" />
                                                <input type="hidden" name="coverBannerId"
                                                    value="${channelViewModel?.coverBanner?.cid}" />

                                                <input type="file" id="banner-browse" style="display: none"
                                                    @change="${handleBannerChange}" />

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

                            ${attributeOptions?.length > 0 ? $h`

                                <ul>
        
                                    ${attributeOptions?.map( (ao) => $h`
                                    <li>
                                        <span style="width: 100px; margin-right: 10px;">${ao.traitType}</span>
        
                                        ${channelViewModel.editable ? $h`
                                        <a class="link" href="#" data-id="${ao.id}" @click="${editCategory}">Edit</a> | <a
                                            class="link" href="#" data-id="${ao.id}" @click="${deleteOptionClick}">Delete</a>
                                        ` : $h` `}
        
                                        <p>
                                            ${ao.values?.map( (v,index) => $h`
        
                                        <div class="chip chip-outline">
                                            <div class="chip-label">${v}</div>
                                        </div>
        
                                        `)}
                                        </p>
                                    </li>
                                    `)}
        
                                </ul>
    
                            ` : $h`
                                No attributes exist.
                            `}
        
                            ${channelViewModel.editable ? $h`
                                <a class="button button-outline add-category-button" @click="${addCategoryClick}" tabindex="10">Add Attribute Type</a>
                            ` : $h` `}

                            
    
                            <input type="hidden" name="attributeOptions" value="${JSON.stringify(attributeOptions)}" />
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

                                                ${channelViewModel.editable ? $h`
                                                <input type="number" placeholder="Enter price for one piece (eg 0.08)"
                                                    @change="${mintPriceChange}" step="any" tabindex="11"
                                                    value="${channelViewModel?.channel?.mintPrice}" />
                                                ` : $h`
                                                <input type="number" placeholder="Enter price for one piece (eg 0.08)"
                                                    @change="${mintPriceChange}" step="any" tabindex="11"
                                                    value="${channelViewModel?.channel?.mintPrice}" disabled />
                                                `}

                                                <input type="hidden" name="mintPrice" value="${mintPrice}" />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                ${mintPrice ? $h`
                                <li tabindex="-1">
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-text"> You will receive <strong>${mintPrice}</strong> ETH
                                                (${mintPriceWei} wei) for
                                                each mint.</div>
                                        </div>
                                    </div>
                                </li>
                                ` : $h``}

                                

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Contract Address</div>
                                            <div class="item-input-wrap">

                                                <input type="text" name="contractAddress" placeholder="Leave blank to deploy a new contract during export."
                                                    @change="${contractAddressChange}" tabindex="13"
                                                    value="${channelViewModel?.channel?.contractAddress}" />

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
                                            <select name="disableForks" @change="${disableForksChange}">

                                                ${!channelViewModel.channel.disableForks ? $h`
                                                <option value="false" selected>Copyleft / CC0</option>
                                                <option value="true">Copyright</option>
                                                ` : $h`
                                                <option value="false">Copyleft / CC0</option>
                                                <option value="true" selected>Copyright</option>
                                                `}


                                            </select>
                                        </div>
                                    </div>
                                </li>

                                ${!channelViewModel.channel.disableForks ? $h`

                                <li>
                                    <div class="item-content">
                                        <div class="item-inner">
                                            <div class="item-text">Use Creative Commons <a
                                                    href="https://creativecommons.org/choose/zero/" class="external"
                                                    target="_blank">CC0 tool</a> to generate licensing text.</div>
                                        </div>
                                    </div>
                                </li>

                                ` : $h`<span />`}



                                <li class="license-editor">
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">License</div>

                                            <div id="${licenseToolbarId}">

                                                <!-- Add a bold button -->
                                                <button class="ql-bold"></button>
                                                <button class="ql-italic"></button>
                                                <button class="ql-strike"></button>
                                                <button class="ql-underline"></button>

                                            </div>

                                            <div class="editor bg-color-white text-color-black channel-editor"
                                                id="${licenseEditorId}" tabindex="13"></div>

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
                                            <select name="gitProvider" @change="${gitProviderChange}" tabindex="14">

                                                ${!channelViewModel.channel.gitProvider ||
                                                channelViewModel.channel.gitProvider == "default" ? $h`
                                                <option value="default" selected>Default</option>
                                                ` : $h`
                                                <option value="default">Default</option>
                                                `}

                                                ${channelViewModel.channel.gitProvider == "github" ? $h`
                                                <option value="github" selected>GitHub</option>
                                                ` : $h`
                                                <option value="github">GitHub</option>
                                                `}


                                                ${channelViewModel.channel.gitProvider == "gitlab" ? $h`
                                                <option value="gitlab" selected>GitLab</option>
                                                ` : $h`
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
                                                <input type="text" name="productionHostname" placeholder="http://localhost" value="${channelViewModel?.channel?.productionHostname}" tabindex="40" />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Production Base URI</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="productionBaseURI" placeholder="/" value="${channelViewModel?.channel?.productionBaseURI}" tabindex="41" />
                                            </div>
                                        </div>
                                    </div>
                                </li>


                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Production Base Library URI</div>
                                            <div class="item-input-wrap">
                                                <input type="text" name="productionBaseLibraryURI" placeholder="/" value="${channelViewModel?.channel?.productionBaseLibraryURI}" tabindex="42" />
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Show Mint Page?</div>
                                            <div class="item-input-wrap">

                                                <select name="showMintPage" @change="${showMintChange}">

                                                    ${channelViewModel.channel.showMintPage == true ? $h`
                                                        <option value="false">No</option>
                                                        <option value="true" selected>Yes</option>
                                                    ` : $h`
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

                                                <select name="showActivityPage" @change="${showActivityChange}">

                                                    ${channelViewModel.channel.showActivityPage == true ? $h`
                                                        <option value="false">No</option>
                                                        <option value="true" selected>Yes</option>
                                                    ` : $h`
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

                                                ${externalLinks?.length > 0 ? $h`

                                                    <ul style="padding-left: 0px;">
                            
                                                        ${externalLinks?.map( (el) => $h`
                                                        <li>
                                                            <span style="width: 100px; margin-right: 10px;">${el.name}</span>
                            
                                                            <a class="link" href="#" data-id="${el.id}" @click="${editExternalLink}">Edit</a> | 
                                                            <a class="link" href="#" data-id="${el.id}" @click="${deleteExternalLink}">Delete</a>
                                                        </li>
                                                        `)}
                            
                                                    </ul>

                        
                                                ` : $h`
                                                    No external links exist.
                                                `}
                            
                                                <a class="button button-outline " @click="${addExternalLinkClick}" tabindex="10">Add External Link</a>
                                                         
                                                <input type="hidden" name="externalLinks" value="${JSON.stringify(externalLinks)}" />
               
                                            </div>
                                        </div>
                                    </div>
                                </li>


                                <li>
                                    <div class="item-content item-input">
                                        <div class="item-inner">
                                            <div class="item-title item-label">Marketplaces</div>
                                            <div class="block">

                                                ${marketplaces?.length > 0 ? $h`

                                                    <ul style="padding-left: 0px;">
                            
                                                        ${marketplaces?.map( (m) => $h`
                                                        <li>
                                                            <span style="width: 100px; margin-right: 10px;">${m.name}</span>
                            
                                                            <a class="link" href="#" data-id="${m.id}" @click="${editMarketplace}">Edit</a> | 
                                                            <a class="link" href="#" data-id="${m.id}" @click="${deleteMarketplace}">Delete</a>
                                                        </li>
                                                        `)}
                            
                                                    </ul>

                        
                                                ` : $h`
                                                    No marketplaces exist.
                                                `}
                            
                                                <a class="button button-outline " @click="${addMarketplaceClick}" tabindex="10">Add Marketplace</a>

                    
                                                
                        
                                                <input type="hidden" name="marketplaces" value="${JSON.stringify(marketplaces)}" />
               


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


`
    }
    ;
}
framework7Component.id = '49fcc8ed74';
framework7Component.style = `





`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/index.f7.html":
/*!**********************************************************!*\
  !*** ./src/admin/components/admin/channel/index.f7.html ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _service_image_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/image-service */ "./src/admin/service/image-service.ts");
/* harmony import */ var _service_core_settings_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/core/settings-service */ "./src/admin/service/core/settings-service.ts");
/* harmony import */ var _service_web_channel_web_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/web/channel-web-service */ "./src/admin/service/web/channel-web-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/** @jsx $jsx */







function framework7Component(props, {
  $,
  $h,
  $on,
  $f7,
  $update
}) {
  let channelWebService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_web_channel_web_service__WEBPACK_IMPORTED_MODULE_1__.ChannelWebService);
  let imageService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_image_service__WEBPACK_IMPORTED_MODULE_2__.ImageService);
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_3__.UiService);
  let settingsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_settings_service__WEBPACK_IMPORTED_MODULE_4__.SettingsService);
  let footerText = props.footerText;
  const LIMIT = 20;
  let channelsShown;
  let pageCounter;
  let hasMoreChannels;
  let loadingInProgress;
  let channels = [];
  let virtualList;
  let breadcrumbs = [{
    text: "Home"
  }];
  function unloadInfiniteScroll() {
    console.log("Unload infinite scroll");

    // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
    $f7.infiniteScroll.destroy('#channel-index-infinite-scroll');

    // Remove preloader
    $('.infinite-scroll-preloader').hide();
  }
  async function infiniteScroll() {
    // Exit, if loading in progress
    if (loadingInProgress || !hasMoreChannels) return;
    uiService.showSpinner("Loading...");

    // Set loading flag
    loadingInProgress = true;
    try {
      channels = await channelWebService.list(LIMIT, channelsShown);
      if (channels && channels.length == LIMIT) {
        channelsShown += channels.length;
      } else {
        hasMoreChannels = false;
      }
      if (pageCounter == 0) {
        //Remove the fake one
        virtualList.deleteAllItems();
      }
      virtualList.appendItems(channels);
    } catch (ex) {
      console.log(ex);
    }
    if (!hasMoreChannels) {
      unloadInfiniteScroll();
    }
    pageCounter++;
    loadingInProgress = false;
    uiService.hideSpinner();
  }
  $on('pageAfterOut', (e, page) => {
    unloadInfiniteScroll();
  });
  $on('pageInit', async (e, page) => {
    channelsShown = 0;
    pageCounter = 0;
    hasMoreChannels = true;
    loadingInProgress = false;

    //Get first page
    virtualList = $f7.virtualList.create({
      el: '#channel-index-list',
      renderItem(channelViewModel) {
        return getTemplate(channelViewModel);
      },
      items: [],
      setListHeight: false,
      emptyTemplate: `
              <li class="item-content">
                <div class="item-inner">
                    There are no collections yet. <br /><br />Click the 'Create Collection' button to create your first collection.
                </div>
              </li>
            `
    });

    //Get the page
    $('#channel-index-infinite-scroll').trigger('infinite');
    virtualList.on('itemsAfterInsert', (virtualList, fragment) => {
      //Find empty description divs and set their innerHTML
      $('.empty').each(element => {
        const id = $(element).data('id');
        const c = channels.filter(channelViewModel => channelViewModel.channel._id == id)[0];
        if (c.channel.descriptionHTML) {
          element.innerHTML = c.channel.descriptionHTML;
        }

        //Make links external
        let links = element.getElementsByTagName('a');
        for (let link of links) {
          link.classList.add('external');
        }
        $(element).removeClass('empty');
      });
      $('#channel-index-list ul').css("height", "");
    });
    let settings = await settingsService.get();
    if (!settings.welcomeHide) {
      const popup = $f7.popup.create({
        el: '.welcome-popup',
        on: {
          close: async popup => {
            settings.welcomeHide = true;
            await settingsService.put(settings);
          }
        }
      });
      popup.open();
    }
  });
  const getTemplate = channelViewModel => {
    return `
              <li>
                <a href="/admin/channel/show/${channelViewModel.channel._id}" class="item-link">
                  <div class="item-content">
                    <div class="item-media">
                      ${channelViewModel.coverImage ? `
                        <img src="${channelViewModel.coverImage.url}" class="avatar" alt="Channel cover image" />
                      ` : `
                        <i class="material-icons avatar">image</i>
                      `}
                    </div>
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">
                          ${channelViewModel.channel.title}                          
                        </div>
                        <div class="item-after"><span class="badge">${channelViewModel.itemCount}</span></div>
                      </div>

                      ${channelViewModel.authorDisplayName ? `
                        <div class="item-subtitle">
                          By ${channelViewModel?.authorDisplayName}
                        </div>
                      ` : ``}

                      <div class="description item-text empty" data-id="${channelViewModel.channel._id}"></div>
                    
                    </div>
                  </div>
                </a>
              </li>
          `;
  };
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="admin-posts">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_5__["default"]} breadcrumbs=${breadcrumbs} />

    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/channel/create-menu">
        <i class="material-icons">create</i>
        <div class="fab-text">Create & Import</div>
      </a>
    </div>


    <div class="page-content infinite-scroll-content hide-toolbar-on-scroll" @infinite=${infiniteScroll} id="channel-index-infinite-scroll">

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

`
    }
    ;
}
framework7Component.id = 'c3826e958e';
framework7Component.style = `


`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/show.f7.html":
/*!*********************************************************!*\
  !*** ./src/admin/components/admin/channel/show.f7.html ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_channel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/channel-service */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _service_web_item_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/web/item-web-service */ "./src/admin/service/web/item-web-service.ts");
/* harmony import */ var _repository_item_repository__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../repository/item-repository */ "./src/admin/repository/item-repository.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/* harmony import */ var _token_navigator_f7_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./token-navigator.f7.html */ "./src/admin/components/admin/channel/token-navigator.f7.html");
/* harmony import */ var hotkeys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hotkeys-js */ "./node_modules/hotkeys-js/dist/hotkeys.esm.js");
/** @jsx $jsx */










function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let channelService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_channel_service__WEBPACK_IMPORTED_MODULE_2__.ChannelService);
  let walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getWalletService();
  let itemWebService = globalThis.container.get(_service_web_item_web_service__WEBPACK_IMPORTED_MODULE_3__.ItemWebService);
  let channelViewModel = props.channelViewModel;
  let firstPageItems = props.firstPageItems;
  let items = [];
  let itemsShown = 0;
  let hasMoreItems = true;
  let loadingInProgress = false;
  let pageCounter = 1;
  let virtualList;
  let totalItemCount = channelViewModel.itemCount;
  const COLS_LARGE = 5;
  const HEIGHT_LARGE = 290;
  const COLS_SMALL = 2;
  const HEIGHT_SMALL = 250;
  let showEdit = channelViewModel.editable;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: channelViewModel.channel.title
  }];
  const truncateEthAddress = address => {
    return walletService.truncateEthAddress(address);
  };
  const resizeListener = e => {
    const viewPortWidth = getWidth();
    virtualList.params.cols = viewPortWidth >= 1024 ? COLS_LARGE : COLS_SMALL;
    virtualList.params.height = viewPortWidth >= 1024 ? HEIGHT_LARGE : HEIGHT_SMALL;
    virtualList?.update();
    console.log("Resized...");
  };
  const getWidth = () => {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  };
  const virtualListParams = {
    el: '#item-list',
    createUl: false,
    renderItem(item) {
      return getTemplate(item);
    },
    height: getWidth() >= 1024 ? HEIGHT_LARGE : HEIGHT_SMALL,
    items: items,
    cols: getWidth() >= 1024 ? COLS_LARGE : COLS_SMALL,
    emptyTemplate: `
          <li class="item-content">
              <div class="item-inner">
                  No items in collection.
              </div>
          </li>
          `
  };
  $on('pageInit', async (e, page) => {
    items.push(...firstPageItems);
    itemsShown = firstPageItems.length;

    //Load cover banner into CSS
    if (channelViewModel?.coverBanner?.url) {
      $(`.show-channel-banner-${channelViewModel.channel._id}`).css('background-image', `url(${channelViewModel.coverBanner.url})`);
    } else {
      $(`.show-channel-banner-${channelViewModel.channel._id}`).css('background', `linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)`);
    }

    //Make links external
    let description = document.getElementById(`channel-show-description-${channelViewModel.channel._id}`);
    if (description) {
      let links = document.getElementById(`channel-show-description-${channelViewModel.channel._id}`).getElementsByTagName('a');
      for (let link of links) {
        link.classList.add('external');
      }
    }
    $(`.animation-container a`).addClass('external');
    window.addEventListener('resize', resizeListener);
    createVirtualList();
  });
  $on('pageBeforeOut', async () => {
    // unloadInfiniteScroll()
    window.removeEventListener('resize', resizeListener);
    // document.getElementById("item-list-infinite-scroll").removeEventListener( 'infinite', infiniteScroll )
  });

  const createVirtualList = () => {
    virtualList = $f7.virtualList.create(virtualListParams);
    if (virtualList.items?.length < totalItemCount) {
      document.getElementById("item-list-infinite-scroll").addEventListener('infinite', infiniteScroll);
    } else {
      $('.infinite-scroll-preloader').hide();
    }
  };
  function unloadInfiniteScroll() {
    console.log("Unload infinite scroll item list");

    // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
    $f7.infiniteScroll.destroy('#item-list-infinite-scroll');
    $f7.virtualList.destroy('#item-list');
    virtualList = undefined;
    $('.infinite-scroll-preloader').hide();
  }
  async function infiniteScroll(e) {
    // Exit, if loading in progress
    if (loadingInProgress || !hasMoreItems) return;
    console.log(`Infinite scrolling...`);

    // Set loading flag
    loadingInProgress = true;
    try {
      let itemPage = await itemWebService.listByChannel(channelViewModel.channel._id, _repository_item_repository__WEBPACK_IMPORTED_MODULE_4__.ItemRepository.CHUNK_SIZE, itemsShown);

      //Count actual items                    
      itemsShown += itemPage.length;
      if (itemsShown >= totalItemCount) {
        hasMoreItems = false;
      }
      virtualList.appendItems(itemPage);
      pageCounter++;
    } catch (ex) {
      console.log(ex);
    }
    $f7.preloader.hide();
    if (!hasMoreItems) {
      unloadInfiniteScroll();
    }
    loadingInProgress = false;
  }
  function getTemplate(rowItemViewModel) {
    return `<li class="flex-card">
                  <a href="/admin/channel/show/${rowItemViewModel.channel._id}/${rowItemViewModel.item.tokenId}" class="item-link">
                      <div class="card" >
                          <div class="card-content">
                              <div class="square">
                                  <img src="${rowItemViewModel.coverImage?.url}" alt="Channel cover image"/>
                              </div>
                          </div>


                          <div class="card-footer">
                              ${rowItemViewModel.item.title ? rowItemViewModel.item.title : `#${rowItemViewModel.item.tokenId}`} 
                          </div>
                      </div>
                  </a>
              </li>
      `;
  }
  const countItems = itemRows => {
    //Count actual items
    let itemCount = 0;
    for (let itemRow of itemRows) {
      itemCount += itemRow.items?.length;
    }
    return itemCount;
  };
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="admin-show-collection">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_5__["default"]} breadcrumbs=${breadcrumbs} />


    ${showEdit ? $h`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${channelViewModel.channel._id}">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    ` : $h``}


    <div class="page-content infinite-scroll-content hide-toolbar-on-scroll" id="item-list-infinite-scroll">

      <div class="fixed-width-content center">

        <channel-card channel_view_model=${channelViewModel}></channel-card>

        <div class="block">
          <p class="segmented">
            <a class="button button-outline button-active" href="#">Items</a>
            <a class="button button-outline" href="/admin/channel/themes/${channelViewModel.channel._id}">Themes</a>
            <a class="button button-outline" href="/admin/channel/static-pages/${channelViewModel.channel._id}">Static Pages</a>
          </p>
        </div>
  
        <${_token_navigator_f7_html__WEBPACK_IMPORTED_MODULE_6__["default"]} channel=${channelViewModel.channel._id} token_id="1" />
  
  
      
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

`
    }
    ;
}
framework7Component.id = 'e70a0f79af';
framework7Component.style = `
  

`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/static-page-form.f7.html":
/*!*********************************************************************!*\
  !*** ./src/admin/components/admin/channel/static-page-form.f7.html ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** @jsx $jsx */


function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let staticPage = props.static_page;
  let locations = [{
    name: "navbar",
    description: "Show link on navigation bar"
  }, {
    name: "links",
    description: "Show in list of links on home page"
  }, {
    name: "index",
    description: "Show content on home page"
  }];
  const isLocationSelected = location => {
    //Is this location in the list of selected locations?
    if (staticPage?.locations?.length > 0) {
      for (let staticPageLocation of staticPage.locations) {
        if (location.name == staticPageLocation.name) return true;
      }
    }
    return false;
  };
  let editorId = props.static_page_content_editor_id;
  let toolbarId = props.static_page_content_toolbar_id;
  let imageButtonInputId = props.image_button_input_id;
  let imageButtonId = props.image_button_id;
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

    <div class="list">

        <input type="hidden" name="_id"  value="${staticPage?._id}" />
        <input type="hidden" name="_rev" value="${staticPage?._rev}" />
        <input type="hidden" name="dateCreated" value="${staticPage?.dateCreated}" />

        <ul>
            <li>
                <div class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Name</div>
                        <div class="item-input-wrap">
                            <input type="text" name="name" placeholder="Name"
                                value="${staticPage?.name}" required  minlength="3" tabindex="1" />
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <a href="#" class="item-link smart-select smart-select-init" data-open-in="popup">
                  <!-- "multiple" attribute for multiple select-->
                    <select name="locations" tabindex="2"  multiple>
                        <optgroup>
                            ${locations.map( location => $h`
                                ${isLocationSelected(location) ? $h`
                                    <option value="${location.name}" selected >${location.description}</option>
                                ` : $h`
                                    <option value="${location.name}">${location.description}</option>
                                `}
                            `)}
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

                        <div id="${toolbarId}">
                
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
    
                            <button class="text-editor-button" id="${imageButtonId}"><i class="material-icons">image</i></button>
                            <label><input type="file" id="${imageButtonInputId}" /></label>
                        </div>

                        <div class="editor bg-color-white text-color-black static-page-editor" id="${editorId}" tabindex="3"></div>
                    </div>
                </div>
            </li>

        </ul>
    </div>


`
    }
    ;
}
framework7Component.id = 'a52f9adc03';
framework7Component.style = `
    
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/static-pages.f7.html":
/*!*****************************************************************!*\
  !*** ./src/admin/components/admin/channel/static-pages.f7.html ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_quill_editor_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/quill-editor-service */ "./src/admin/service/quill-editor-service.ts");
/* harmony import */ var _dto_static_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../dto/static-page */ "./src/admin/dto/static-page.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _service_static_page_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/static-page-service */ "./src/admin/service/static-page-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/* harmony import */ var _admin_channel_static_page_form_f7_html__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../admin/channel/static-page-form.f7.html */ "./src/admin/components/admin/channel/static-page-form.f7.html");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill */ "./node_modules/quill/dist/quill.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hotkeys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hotkeys-js */ "./node_modules/hotkeys-js/dist/hotkeys.esm.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/** @jsx $jsx */
















function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let quillEditorService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_2__.ContainerService.getInstance(_service_quill_editor_service__WEBPACK_IMPORTED_MODULE_3__.QuillEditorService);
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_2__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_4__.UiService);
  let staticPageService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_2__.ContainerService.getInstance(_service_static_page_service__WEBPACK_IMPORTED_MODULE_5__.StaticPageService);
  let channelViewModel = props.channelViewModel;
  let staticPages = props.staticPages;
  let showEdit = channelViewModel.editable;
  let editingStaticPage;
  let staticPageContentEditor;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: channelViewModel.channel.title,
    path: `/admin/channel/show/${channelViewModel.channel._id}`
  }, {
    text: 'Static Pages'
  }];
  const updateStaticPagesList = async () => {
    //Refresh static pages list
    staticPages = await staticPageService.listByChannel(channelViewModel.channel._id, 1000, 0);
  };
  let popupOpenHandler = e => {
    staticPageContentEditor = new (quill__WEBPACK_IMPORTED_MODULE_0___default())('#add-static-page-content-editor', {
      bounds: ".page-content",
      theme: "snow",
      modules: {
        imageDropAndPaste: {
          // add an custom image handler
          handler: (imageDataUrl, type, imageData) => {
            const file = imageData.toFile();
            quillEditorService.insertImageInEditor(file, staticPageContentEditor);
          }
        },
        toolbar: '#add-static-page-content-toolbar',
        blotFormatter: {
          specs: [_service_quill_editor_service__WEBPACK_IMPORTED_MODULE_3__.CustomImageSpec],
          align: {
            icons: {
              left: "<i class='material-icons'>align_horizontal_left</i>",
              center: "<i class='material-icons'>align_horizontal_center</i>",
              right: "<i class='material-icons'>align_horizontal_right</i>"
            },
            toolbar: {
              svgStyle: {
                fontSize: '21px'
              }
            }
          }
        }
      }
    });
  };
  let addFormSubmit = async e => {
    e.preventDefault();

    //Get data
    let staticPage = Object.assign(new _dto_static_page__WEBPACK_IMPORTED_MODULE_6__.StaticPage(), $f7.form.convertToData('#add-static-page-form'));
    staticPage.content = staticPageContentEditor.getContents();
    staticPage.channelId = channelViewModel.channel._id;

    //Generate id
    staticPage._id = (0,uuid__WEBPACK_IMPORTED_MODULE_7__["default"])();
    staticPage.dateCreated = new Date().toJSON();
    try {
      await staticPageService.put(staticPage);
      await updateStaticPagesList();

      //Clear form
      $f7.form.fillFromData('#add-static-page-form', {
        name: "",
        slug: "",
        locations: []
      });
      staticPageContentEditor.setText("");

      //Refresh static page list
      await $update();
      $f7.popup.close('.add-static-page-popup');
    } catch (ex) {
      $f7.dialog.alert(ex, "There was an error");
    }
  };
  let editFormSubmit = async e => {
    e.preventDefault();

    //Get data
    let staticPage = Object.assign(new _dto_static_page__WEBPACK_IMPORTED_MODULE_6__.StaticPage(), $f7.form.convertToData('#edit-static-page-form'));
    staticPage.content = staticPageContentEditor.getContents();
    staticPage.channelId = channelViewModel.channel._id;
    try {
      await staticPageService.put(staticPage);
      await updateStaticPagesList();

      //Refresh theme list
      await $update();
      $f7.popup.close('.edit-static-page-popup');
    } catch (ex) {
      console.log(ex);
      $f7.dialog.alert(ex.errors, "There was an error");
    }
  };
  let deleteClick = async e => {
    let id = $(e.target).data('id');
    $f7.dialog.confirm("Are you sure you want to delete this static page?", async () => {
      let staticPage = await staticPageService.get(id);
      await staticPageService.delete(staticPage);
      await updateStaticPagesList();

      //Refresh theme list
      await $update();
      const toast = $f7.toast.show({
        text: 'Static Page deleted',
        closeTimeout: 2000,
        closeButton: true,
        position: 'bottom',
        horizontalPosition: 'left'
      });
    });
  };
  let editClick = async function (e) {
    let id = $(e.target).data('id');
    editingStaticPage = staticPages.filter(staticPage => staticPage._id == id)[0];
    staticPageContentEditor = new (quill__WEBPACK_IMPORTED_MODULE_0___default())('#edit-static-page-content-editor', {
      bounds: ".page-content",
      theme: "snow",
      modules: {
        imageDropAndPaste: {
          // add an custom image handler
          handler: (imageDataUrl, type, imageData) => {
            const file = imageData.toFile();
            quillEditorService.insertImageInEditor(file, staticPageContentEditor);
          }
        },
        toolbar: '#edit-static-page-content-toolbar',
        blotFormatter: {
          specs: [_service_quill_editor_service__WEBPACK_IMPORTED_MODULE_3__.CustomImageSpec],
          align: {
            icons: {
              left: "<i class='material-icons'>align_horizontal_left</i>",
              center: "<i class='material-icons'>align_horizontal_center</i>",
              right: "<i class='material-icons'>align_horizontal_right</i>"
            },
            toolbar: {
              svgStyle: {
                fontSize: '21px'
              }
            }
          }
        }
      }
    });

    //Populate form
    $f7.form.fillFromData('#edit-static-page-form', editingStaticPage);
    staticPageContentEditor.setContents(editingStaticPage.content);
    await $update();
    $f7.popup.open('.edit-static-page-popup');
  };
  let addImageButtonClick = function (e) {
    e.preventDefault();

    //Click actual input
    const imageButtonInput = $('#add-static-page-image-button-input');
    imageButtonInput.click();
  };
  let addImageButtonInputClick = async function (e) {
    e.preventDefault();
    uiService.showSpinner("Processing image...");
    await quillEditorService.insertImageInEditor(this.files[0], staticPageContentEditor);
    uiService.hideSpinner();
  };
  let editImageButtonClick = function (e) {
    e.preventDefault();

    //Click actual input
    const imageButtonInput = $('#edit-static-page-image-button-input');
    imageButtonInput.click();
  };
  let editImageButtonInputClick = async function (e) {
    e.preventDefault();
    uiService.showSpinner("Processing image...");
    await quillEditorService.insertImageInEditor(this.files[0], staticPageContentEditor);
    uiService.hideSpinner();
  };
  $on('pageInit', async (e, page) => {
    //Clear existing listeners
    // $(document).off('popup:open', '.add-static-page-popup')

    $(document).off('click', '#add-static-page-image-button');
    $(document).off('change', '#add-static-page-image-button-input');
    $(document).off('click', '#edit-static-page-image-button');
    $(document).off('change', '#edit-static-page-image-button-input');

    //Make sure quill is configured
    await quillEditorService.init();

    //Load cover banner into CSS
    if (channelViewModel?.coverBanner?.url) {
      $(`.show-channel-banner-${channelViewModel.channel._id}`).css('background-image', `url(${channelViewModel.coverBanner.url})`);
    } else {
      $(`.show-channel-banner-${channelViewModel.channel._id}`).css('background', `linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)`);
    }

    //Make links external
    let description = document.getElementById(`channel-show-description-${channelViewModel.channel._id}`);
    if (description) {
      let links = document.getElementById(`channel-show-description-${channelViewModel.channel._id}`).getElementsByTagName('a');
      for (let link of links) {
        link.classList.add('external');
      }
    }
    await $update();

    /**
     *  STATIC PAGES
     */
    $('.add-static-page-popup').on('popup:open', popupOpenHandler);

    /**
    * ADDING IMAGE BUTTONS
    */
    $(document).on('click', '#add-static-page-image-button', addImageButtonClick);
    $(document).on('change', '#add-static-page-image-button-input', addImageButtonInputClick);
    $(document).on('click', '#edit-static-page-image-button', editImageButtonClick);
    $(document).on('change', '#edit-static-page-image-button-input', editImageButtonInputClick);
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="channel-show-themes">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_8__["default"]} breadcrumbs=${breadcrumbs} />


    ${showEdit ? $h`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${channelViewModel.channel._id}">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    ` : $h``}


    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        <channel-card channel_view_model=${channelViewModel}></channel-card>

        <div class="block">
          <p class="segmented">
            <a class="button button-outline" href="/admin/channel/show/${channelViewModel.channel._id}">Items</a>
            <a class="button button-outline" href="/admin/channel/themes/${channelViewModel.channel._id}">Themes</a>
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
                          ${staticPages?.map( (staticPage) => $h`
                            <li>
                              <span class="static-page-name">${staticPage.name}</span>
                              <a class="link static-page-link" href="#" data-id="${staticPage._id}" @click="${editClick}">Edit</a>
                              <a class="link static-page-link" href="#" data-id="${staticPage._id}" @click="${deleteClick}">Delete</a>
                            </li>
                          `)}
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
                <form id="add-static-page-form" @submit="${addFormSubmit}">
                  <${_admin_channel_static_page_form_f7_html__WEBPACK_IMPORTED_MODULE_9__["default"]} static_page_content_editor_id="add-static-page-content-editor"
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
                <form id="edit-static-page-form" @submit="${editFormSubmit}">
  
                  <${_admin_channel_static_page_form_f7_html__WEBPACK_IMPORTED_MODULE_9__["default"]} static_page_content_editor_id="edit-static-page-content-editor"
                    static_page_content_toolbar_id="edit-static-page-content-toolbar"
                    image_button_input_id="edit-static-page-image-button-input"
                    image_button_id="edit-static-page-image-button" static_page="${editingStaticPage}" />
  
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

`
    }
    ;
}
framework7Component.id = 'e12a1e4c45';
framework7Component.style = `


`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/theme-form.f7.html":
/*!***************************************************************!*\
  !*** ./src/admin/components/admin/channel/theme-form.f7.html ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** @jsx $jsx */


function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let theme = props.theme;
  let coverImageCSSEditorId = props.cover_image_css_editor_id;
  let animationCSSEditorId = props.animation_css_editor_id;
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

    <div class="list">

        <input type="hidden" name="_id"  value="${theme?._id}" />
        <input type="hidden" name="_rev" value="${theme?._rev}" />
        <input type="hidden" name="dateCreated" value="${theme?.dateCreated}" />

        <ul>
            <li>
                <div class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Title</div>
                        <div class="item-input-wrap">
                            <input type="text" name="name" placeholder="Name"
                                value="${theme?.name}" required  minlength="3" tabindex="1" />
                        </div>
                    </div>
                </div>
            </li>

            <li>
                <div class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Cover Image CSS (SVG)</div>
                        <div class="editor bg-color-white text-color-black css-editor" id="${coverImageCSSEditorId}" tabindex="2" style="min-height: 100px;">.svg-h1 {}</div>
                    </div>
                </div>
            </li>
    
            <li>
                <div class="item-content item-input">
                    <div class="item-inner">
                        <div class="item-title item-label">Animation CSS (HTML)</div>
                        <div class="editor bg-color-white text-color-black css-editor" id="${animationCSSEditorId}" tabindex="3" style="min-height: 100px;">.animation-container {}</div>
                    </div>
                </div>
            </li>

        </ul>
    </div>


`
    }
    ;
}
framework7Component.id = '1f8ec7c4d5';
framework7Component.style = `
    
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/themes.f7.html":
/*!***********************************************************!*\
  !*** ./src/admin/components/admin/channel/themes.f7.html ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_theme_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/theme-service */ "./src/admin/service/theme-service.ts");
/* harmony import */ var _dto_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../dto/theme */ "./src/admin/dto/theme.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/* harmony import */ var _admin_channel_theme_form_f7_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../admin/channel/theme-form.f7.html */ "./src/admin/components/admin/channel/theme-form.f7.html");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill */ "./node_modules/quill/dist/quill.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hotkeys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hotkeys-js */ "./node_modules/hotkeys-js/dist/hotkeys.esm.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/** @jsx $jsx */















function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let themeService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_2__.ContainerService.getInstance(_service_theme_service__WEBPACK_IMPORTED_MODULE_3__.ThemeService);
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_2__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_4__.UiService);
  let channelViewModel = props.channelViewModel;
  let themes = props.themes;
  let showEdit = channelViewModel.editable;
  let editingTheme;
  let themeCoverCssEditor;
  let themeAnimationCssEditor;
  let staticPageContentEditor;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: channelViewModel.channel.title,
    path: `/admin/channel/show/${channelViewModel.channel._id}`
  }, {
    text: 'Themes'
  }];
  const updateThemeList = async () => {
    //Refresh theme list
    themes = await themeService.listByChannel(channelViewModel.channel._id, 1000, 0);
  };
  const addThemePopupOpen = function (e) {
    themeCoverCssEditor = new (quill__WEBPACK_IMPORTED_MODULE_0___default())('#add-theme-cover-image-editor', {
      bounds: ".page-content",
      theme: "snow",
      modules: {
        syntax: {
          highlight: text => hljs.highlightAuto(text).value
        },
        toolbar: false
      }
    });
    themeAnimationCssEditor = new (quill__WEBPACK_IMPORTED_MODULE_0___default())('#add-theme-animation-editor', {
      bounds: ".page-content",
      theme: "snow",
      modules: {
        syntax: {
          highlight: text => hljs.highlightAuto(text).value
        },
        toolbar: false
      }
    });
  };
  const addThemeFormSubmit = async function (e) {
    e.preventDefault();

    //Get data
    let theme = Object.assign(new _dto_theme__WEBPACK_IMPORTED_MODULE_5__.Theme(), $f7.form.convertToData('#add-theme-form'));
    theme.coverImageCSS = themeCoverCssEditor.getText() != "\n" ? themeCoverCssEditor.getText() : undefined;
    theme.animationCSS = themeAnimationCssEditor.getText() != "\n" ? themeAnimationCssEditor.getText() : undefined;
    theme.channelId = channelViewModel.channel._id;

    //Generate id
    theme._id = (0,uuid__WEBPACK_IMPORTED_MODULE_6__["default"])();
    theme.dateCreated = new Date().toJSON();
    try {
      //Save the theme
      await themeService.put(theme);
      await updateThemeList();

      //Clear form
      $f7.form.fillFromData('#add-theme-form', {
        name: ""
      });
      themeCoverCssEditor.setText("");
      themeAnimationCssEditor.setText("");

      //Refresh theme list
      await $update();
      $f7.popup.close('.add-theme-popup');
    } catch (ex) {
      $f7.dialog.alert(ex, "There was an error");
    }
  };
  const editThemeFormSubmit = async function (e) {
    e.preventDefault();

    //Get data
    let theme = Object.assign(new _dto_theme__WEBPACK_IMPORTED_MODULE_5__.Theme(), $f7.form.convertToData('#edit-theme-form'));
    theme.coverImageCSS = themeCoverCssEditor.getText() != "\n" ? themeCoverCssEditor.getText() : undefined;
    theme.animationCSS = themeAnimationCssEditor.getText() != "\n" ? themeAnimationCssEditor.getText() : undefined;
    theme.channelId = channelViewModel.channel._id;
    try {
      //Save the theme
      await themeService.put(theme);
      await updateThemeList();

      //Refresh theme list
      await $update();
      $f7.popup.close('.edit-theme-popup');
    } catch (ex) {
      console.log(ex);
      $f7.dialog.alert(ex.errors, "There was an error");
    }
  };
  const deleteTheme = async function (e) {
    let id = $(e.target).data('id');
    $f7.dialog.confirm("Are you sure you want to delete this theme?", async () => {
      let theme = await themeService.get(id);
      await themeService.delete(theme);
      await updateThemeList();

      //Refresh theme list
      await $update();
      const toast = $f7.toast.show({
        text: 'Theme deleted',
        closeTimeout: 2000,
        closeButton: true,
        position: 'bottom',
        horizontalPosition: 'left'
      });
    });
  };
  const editTheme = async function (e) {
    let id = $(e.target).data('id');
    editingTheme = themes.filter(theme => theme._id == id)[0];

    //Init editors
    themeCoverCssEditor = new (quill__WEBPACK_IMPORTED_MODULE_0___default())('#edit-theme-cover-image-editor', {
      bounds: ".page-content",
      theme: "snow",
      modules: {
        syntax: {
          highlight: text => hljs.highlightAuto(text).value
        },
        toolbar: false
      }
    });
    themeAnimationCssEditor = new (quill__WEBPACK_IMPORTED_MODULE_0___default())('#edit-theme-animation-editor', {
      bounds: ".page-content",
      theme: "snow",
      modules: {
        syntax: {
          highlight: text => hljs.highlightAuto(text).value
        },
        toolbar: false
      }
    });

    //Populate form
    $f7.form.fillFromData('#edit-theme-form', editingTheme);
    themeCoverCssEditor.setText(editingTheme.coverImageCSS ? editingTheme.coverImageCSS : "");
    themeAnimationCssEditor.setText(editingTheme.animationCSS ? editingTheme.animationCSS : "");
    await $update();
    $f7.popup.open('.edit-theme-popup');
  };
  $on('pageInit', async (e, page) => {
    //Clear existing listeners
    // $(document).off('popup:open', '.add-theme-popup')

    //Load cover banner into CSS
    if (channelViewModel?.coverBanner?.url) {
      $(`.show-channel-banner-${channelViewModel.channel._id}`).css('background-image', `url(${channelViewModel.coverBanner.url})`);
    } else {
      $(`.show-channel-banner-${channelViewModel.channel._id}`).css('background', `linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%)`);
    }

    //Make links external
    let description = document.getElementById(`channel-show-description-${channelViewModel.channel._id}`);
    if (description) {
      let links = document.getElementById(`channel-show-description-${channelViewModel.channel._id}`).getElementsByTagName('a');
      for (let link of links) {
        link.classList.add('external');
      }
    }
    await $update();

    /**
    *  THEMES
    */
    $('.add-theme-popup').on('popup:open', addThemePopupOpen);
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="channel-show-themes">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_7__["default"]} breadcrumbs=${breadcrumbs} />


    ${showEdit ? $h`
    <div class="fab fab-extended fab-right-bottom">
      <a href="/admin/item/create/${channelViewModel.channel._id}">
        <i class="material-icons">create</i>
        <div class="fab-text">Create Item</div>
      </a>
    </div>
    ` : $h``}


    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        <channel-card channel_view_model=${channelViewModel}></channel-card>

        <div class="block">
          <p class="segmented">
            <a class="button button-outline" href="/admin/channel/show/${channelViewModel.channel._id}">Items</a>
            <a class="button button-outline button-active" href="#">Themes</a>
            <a class="button button-outline" href="/admin/channel/static-pages/${channelViewModel.channel._id}">Static
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
                          ${themes?.map( (theme) => $h`
                          <li>
                            <span class="theme-name">${theme.name}</span>
                            <a class="link theme-link" href="#" data-id="${theme._id}" @click="${editTheme}">Edit</a>
                            <a class="link theme-link" href="#" data-id="${theme._id}" @click="${deleteTheme}">Delete</a>
                          </li>
                          `)}
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
                <form id="add-theme-form" @submit="${addThemeFormSubmit}">
                  <${_admin_channel_theme_form_f7_html__WEBPACK_IMPORTED_MODULE_8__["default"]} cover_image_css_editor_id="add-theme-cover-image-editor"
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
                <form id="edit-theme-form" @submit="${editThemeFormSubmit}">
  
                  <${_admin_channel_theme_form_f7_html__WEBPACK_IMPORTED_MODULE_8__["default"]} cover_image_css_editor_id="edit-theme-cover-image-editor"
                    animation_css_editor_id="edit-theme-animation-editor" theme="${editingTheme}" />
  
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

`
    }
    ;
}
framework7Component.id = 'c4aecec60a';
framework7Component.style = `


`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/token-navigator.f7.html":
/*!********************************************************************!*\
  !*** ./src/admin/components/admin/channel/token-navigator.f7.html ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_item_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/item-service */ "./src/admin/service/item-service.ts");
/** @jsx $jsx */




function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let itemService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_item_service__WEBPACK_IMPORTED_MODULE_1__.ItemService);
  let channelId = props.channel;
  let itemViewModel = props.item;
  let tokenId = props.token_id ? props.token_id : itemViewModel.item.tokenId;
  const goTokenFormSubmit = async e => {
    e.preventDefault();
    const val = $(e.currentTarget).children('.goto-input').val();

    //Look up item by tokenId
    let item = await itemService.getByTokenId(channelId, parseInt(val.toString()));
    if (item) {
      $f7.views.main.router.navigate(`/admin/channel/show/${channelId}/${parseInt(val.toString())}`);
    } else {
      $f7.dialog.alert("Invalid Page");
    }
  };
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

    <div class="card" >
      <form class="card-content card-content-padding" @submit="${goTokenFormSubmit}">
        <input type="number" class="goto-input" style="width: 60px; border: 1px solid #cccccc; display: inline-block;" value="${tokenId}" min="0"  />
        <span class="paging-label">Enter Token ID</span>
        <button class="goto-button button button-small button-fill">Go</button>
      </form>
    </div>

`
    }
    ;
}
framework7Component.id = 'd00dd5e42d';
framework7Component.style = `    
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/channel/upgrade.f7.html":
/*!************************************************************!*\
  !*** ./src/admin/components/admin/channel/upgrade.f7.html ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_web_channel_web_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/web/channel-web-service */ "./src/admin/service/web/channel-web-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/** @jsx $jsx */








function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let channelWebService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_web_channel_web_service__WEBPACK_IMPORTED_MODULE_1__.ChannelWebService);
  let channelViewModel = props.channelViewModel;
  const formSubmit = async e => {
    e.preventDefault();

    //Save
    try {
      await channelWebService.upgrade(channelViewModel.channel);
    } catch (ex) {
      $f7.dialog.alert(ex.errors, "There was an error");
    }
  };
  const upgradeClick = async e => {
    e.preventDefault();
    try {
      await channelWebService.upgrade(channelViewModel.channel);
    } catch (ex) {
      console.log(ex);
      $f7.dialog.alert(ex, "There was an error");
    }
  };
  const regenerateAnimationsClick = async e => {
    e.preventDefault();
    $f7.preloader.show();
    try {
      await channelWebService.regenerateItemMedia(channelViewModel.channel);
    } catch (ex) {
      console.log(ex);
      $f7.dialog.alert(ex, "There was an error");
    }
    $f7.preloader.hide();
  };
  $on('pageInit', async (e, page) => {});
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="admin-edit-channel">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_2__["default"]} />

    <div class="page-content">

      <div class="row">
        <div class="col-100 large-66 center">

          <ul class="breadcrumb">
            <li><a href="/admin/channel/show/${channelViewModel.channel._id}">${channelViewModel.channel.title}</a></li>
            <li>Upgrade Collection</li>
          </ul>

          <div class="block list">

            <p>This screen is used to update a collection to the latest database structure. Currently this is a 
            diagnostic level tool and should only be used if you have backed up the data.</p>

            <p>The effect is like opening each item individually and resaving it.</p>


            <button class="button button-fill" @click="${regenerateAnimationsClick}">
              Regenerate Animations
            </button>

            <br />

            <button class="button button-fill" @click="${upgradeClick}">
              Upgrade
            </button>

          </div>

        </div>
      </div>



    </div>
  </div>

`
    }
    ;
}
framework7Component.id = '56dd3a9db1';
framework7Component.style = `

`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/connect/index.f7.html":
/*!**********************************************************!*\
  !*** ./src/admin/components/admin/connect/index.f7.html ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/core/ipfs-service */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/** @jsx $jsx */





function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_1__.UiService);
  let ipfsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_2__.IpfsService);
  let peers = props.peers;
  let peerCount = props.peerCount;
  let addresses = props.addresses;
  let subscribed;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: 'IPFS'
  }];
  const addPeerClick = async e => {
    console.log('Add peer submit');

    //@ts-ignore
    document.getElementById('peerAddressInput').setCustomValidity("");
    let peerValue = document.getElementById('peerAddressInput').value;
    if (peerValue) {
      try {
        await ipfsService.ipfs.swarm.connect(peerValue);
        uiService.showPopup(`Successfully connected to peer ${peerValue}`);
        console.log('Connected to peer');
      } catch (ex) {
        uiService.showExceptionPopup(ex);
      }
    }
  };
  $(document).on('update-peers', async e => {
    peers = e.detail.peers;
    peerCount = e.detail.count;
    addresses = e.detail.addresses;
    $update();
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

    <div class="page" data-name="connect">

        <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_3__["default"]} breadcrumbs=${breadcrumbs}  />


        <div class="page-content hide-toolbar-on-scroll">

            <div class="row">
                <div class="col-100 tablet-50 center">

                    <div class="block-title">IPFS Addresses
                    </div>
                    <div class="block list media-list peer-list">
                        <ul>
                            ${addresses?.map( (address) => $h`
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-subtitle no-wrap">
                                            ${address}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            `)}
                        </ul>
                    </div>

                    <div class="block-title">IPFS Peers <span class="badge peers-badge color-blue">${peerCount}</span>
                    </div>
                    <div class="block list media-list peer-list">
                        <ul>
                            ${peers?.map( (peer) => $h`
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-subtitle no-wrap">
                                            ${peer}
                                        </div>
                                    </div>
                                </div>
                            </li>
                            `)}
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
                                            <button class="button button-fill text-color-black" value="Add Peer" @click=${addPeerClick}>Add Peer</button>
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

`
    }
    ;
}
framework7Component.id = 'c51a471b2e';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/item/create.f7.html":
/*!********************************************************!*\
  !*** ./src/admin/components/admin/item/create.f7.html ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../service/core/ipfs-service */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _service_core_git_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../service/core/git-service */ "./src/admin/service/core/git-service.ts");
/* harmony import */ var _service_quill_editor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/quill-editor-service */ "./src/admin/service/quill-editor-service.ts");
/* harmony import */ var _service_quill_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/quill-service */ "./src/admin/service/quill-service.ts");
/* harmony import */ var _service_item_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/item-service */ "./src/admin/service/item-service.ts");
/* harmony import */ var _service_image_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../service/image-service */ "./src/admin/service/image-service.ts");
/* harmony import */ var _service_core_hugging_face_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../service/core/hugging-face-service */ "./src/admin/service/core/hugging-face-service.ts");
/* harmony import */ var _service_web_item_web_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../service/web/item-web-service */ "./src/admin/service/web/item-web-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _service_core_settings_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../service/core/settings-service */ "./src/admin/service/core/settings-service.ts");
/* harmony import */ var _dto_item__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../dto/item */ "./src/admin/dto/item.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/* harmony import */ var _admin_item_form_f7_html__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../admin/item/form.f7.html */ "./src/admin/components/admin/item/form.f7.html");
/* harmony import */ var excerpt_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! excerpt-html */ "./node_modules/excerpt-html/index.js");
/* harmony import */ var excerpt_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(excerpt_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highlight.js */ "./node_modules/highlight.js/es/index.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! quill */ "./node_modules/quill/dist/quill.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_2__);
/** @jsx $jsx */



















function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let quillEditorService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_quill_editor_service__WEBPACK_IMPORTED_MODULE_4__.QuillEditorService);
  let quillService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_quill_service__WEBPACK_IMPORTED_MODULE_5__.QuillService);
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_6__.UiService);
  let itemService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_item_service__WEBPACK_IMPORTED_MODULE_7__.ItemService);
  let imageService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_image_service__WEBPACK_IMPORTED_MODULE_8__.ImageService);
  let itemWebService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_web_item_web_service__WEBPACK_IMPORTED_MODULE_9__.ItemWebService);
  let ipfsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_10__.IpfsService);
  let gitService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_core_git_service__WEBPACK_IMPORTED_MODULE_11__.GitService);
  let settingsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_core_settings_service__WEBPACK_IMPORTED_MODULE_12__.SettingsService);
  let huggingFaceService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_core_hugging_face_service__WEBPACK_IMPORTED_MODULE_13__.HuggingFaceService);
  let walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getWalletService();
  let itemViewModel = props.itemViewModel;
  let themes = props.themes;
  let ipfsReady = false;
  let cancelLink = `/admin/channel/show/${itemViewModel.channel._id}`;
  let showHuggingFace = false;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: itemViewModel.channel.title,
    path: `/admin/channel/show/${itemViewModel.channel._id}`
  }, {
    text: 'Create Item'
  }];
  let toast;
  let coverImageCSSQuillEditor;
  let animationCSSQuillEditor;
  highlight_js__WEBPACK_IMPORTED_MODULE_1__["default"].configure({
    // optionally configure hljs
    languages: ['css']
  });
  const formSubmit = async e => {
    e.preventDefault();

    //Initialize IPFS
    await ipfsService.init();

    //Initialize git's fs
    // await gitService.initFS(itemViewModel.channel)

    let formData = $f7.form.convertToData('#create-item-form');
    let showExcerpt = false;

    //Get data
    let item = Object.assign(new _dto_item__WEBPACK_IMPORTED_MODULE_14__.Item(), formData);
    item.coverImageAsAnimation = formData.coverImageAsAnimation[0] != "on";

    //Get content from quill
    item.content = quillEditorService.activeEditor.getContents();
    item.coverImageCSS = coverImageCSSQuillEditor.getText() != "\n" ? coverImageCSSQuillEditor.getText() : undefined;
    item.animationCSS = animationCSSQuillEditor.getText() != "\n" ? animationCSSQuillEditor.getText() : undefined;

    //Parse attributes
    item.attributeSelections = JSON.parse(item.attributeSelections).map(as => {
      return {
        id: as.id,
        traitType: as.traitType,
        value: as.value
      };
    });

    //Build contentHTML for searching
    item.contentHTML = await quillService.translateContent(item.content, true);

    //Save the cover image if necessary
    let coverImage = await itemWebService.saveGeneratedCoverImage(item);
    item.coverImageGenerated = coverImage.generated;

    //And the animation
    item.tokenId = await itemService.getNextTokenId(item.channelId); //Will get overwritten when saved but we need it for the animation

    if (!item.coverImageAsAnimation) {
      await itemWebService.saveAnimation(item);
    }

    //Save
    try {
      uiService.showSpinner();
      await itemWebService.put({
        channel: itemViewModel.channel,
        item: item,
        updateQueryCache: true,
        publish: false
      });
      const toast = $f7.toast.show({
        text: 'Item created',
        closeTimeout: 2000,
        closeButton: true,
        position: 'bottom',
        horizontalPosition: 'left'
      });

      //Redirect
      $f7.views.main.router.navigate(`/admin/channel/show/${item.channelId}/${item.tokenId}`);
    } catch (ex) {
      console.log(ex);
      $f7.dialog.alert(ex.errors, "There was an error");
    }
  };
  $on('pageInit', async (e, page) => {
    quillEditorService.buildQuillPostEditor("#create-item-editor", "#create-item-toolbar");
    quillEditorService.activeEditor.root.addEventListener('blur', function () {
      document.dispatchEvent(new CustomEvent('load-cover-images'));
    });
    quillEditorService.activeEditor.on('text-change', (delta, oldContents, source) => {
      document.dispatchEvent(new CustomEvent('load-cover-images'));
      if (source !== 'user') return;
      function getImgUrls(delta) {
        return delta.ops.filter(i => i.insert && i.insert.ipfsimage).map(i => i.insert.ipfsimage);
      }

      //Get images that have been removed. 
      const deleted = getImgUrls(quillEditorService.activeEditor.getContents().diff(oldContents));

      //Remove them from the images array
      deleted.forEach(img => {
        itemViewModel.images = itemViewModel.images.filter(i => i.cid != img.cid);
        if (img.cid == itemViewModel.coverImage?.cid) {
          itemViewModel.coverImage = undefined;
        }
      });
    });
    $('.image-button').off('click');
    $('.image-button-input').off('click');
    $('.ai-button').off('click');
    $('.image-button').on('click', function (e) {
      e.preventDefault();
      const imageButtonInput = $(".image-button-input");
      imageButtonInput.click();
    });
    $('.image-button-input').on('change', async function (e) {
      e.preventDefault();
      await quillEditorService.imageSelected(this);
    });
    $('.ai-button').on('click', async function (e) {
      e.preventDefault();
      const aiPromptEvent = new CustomEvent('set-ai-prompt');
      document.dispatchEvent(aiPromptEvent);
      $f7.popup.open('.ai-popup');
    });

    //Cover image
    coverImageCSSQuillEditor = new (quill__WEBPACK_IMPORTED_MODULE_2___default())('#cover-image-css-editor', {
      bounds: ".page-content",
      theme: "snow",
      modules: {
        syntax: {
          highlight: text => highlight_js__WEBPACK_IMPORTED_MODULE_1__["default"].highlightAuto(text).value
        },
        toolbar: false
      }
    });
    coverImageCSSQuillEditor.on('text-change', (delta, oldContents, source) => {
      document.dispatchEvent(new CustomEvent('update-cover-image-css', {
        detail: {
          coverImageCSS: coverImageCSSQuillEditor.getText() != "\n" ? coverImageCSSQuillEditor.getText() : undefined
        }
      }));
    });
    animationCSSQuillEditor = new (quill__WEBPACK_IMPORTED_MODULE_2___default())('#animation-css-editor', {
      bounds: ".page-content",
      theme: "snow",
      modules: {
        syntax: {
          highlight: text => highlight_js__WEBPACK_IMPORTED_MODULE_1__["default"].highlightAuto(text).value
        },
        toolbar: false
      }
    });
    coverImageCSSQuillEditor.setText(".svg-h1 {}");
    animationCSSQuillEditor.setText(".animation-container {}");
    await $update();
    uiService.showSpinner();

    //Initialize git's fs
    // await gitService.initFS(itemViewModel.channel)

    //Initialize IPFS
    await ipfsService.init();
    ipfsReady = ipfsService.ipfs != undefined;
    const ipfsReadyEvent = new CustomEvent('ipfs-ready');
    document.dispatchEvent(ipfsReadyEvent);
    const settings = await settingsService.get();
    showHuggingFace = settings?.huggingFace != undefined;
    if (settings?.huggingFace?.length > 0) {
      await huggingFaceService.init();
      const huggingFaceReady = new CustomEvent('hugging-face-ready');
      document.dispatchEvent(huggingFaceReady);
    }
    uiService.hideSpinner();
    await $update();
  });
  $on('pageBeforeRemove', () => {
    // Destroy toasts when page removed
    // if (toast) toast.destroy()
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="admin-create-item">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_15__["default"]} breadcrumbs=${breadcrumbs} />

    <div class="page-content hide-toolbar-on-scroll">

      <form class="list media-list" id="create-item-form" @submit="${formSubmit}">

        <${_admin_item_form_f7_html__WEBPACK_IMPORTED_MODULE_16__["default"]} item=${itemViewModel} 
          themes=${themes}
          editor="create-item-editor" 
          toolbar="create-item-toolbar" 
          cover_image_css_editor_id="cover-image-css-editor"
          animation_css_editor_id="animation-css-editor"
          themes=${themes}
          cancel_link=${cancelLink}
          show_hugging_face=${showHuggingFace}
        />

      </form>


    </div>
  </div>

`
    }
    ;
}
framework7Component.id = '6570d1b658';
framework7Component.style = `
  #create-item-editor {
    min-height: 175px;
    height: 100%;
    /* added these styles */
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/item/edit.f7.html":
/*!******************************************************!*\
  !*** ./src/admin/components/admin/item/edit.f7.html ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_quill_editor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/quill-editor-service */ "./src/admin/service/quill-editor-service.ts");
/* harmony import */ var _service_quill_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/quill-service */ "./src/admin/service/quill-service.ts");
/* harmony import */ var _service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../service/core/ipfs-service */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _service_core_git_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../service/core/git-service */ "./src/admin/service/core/git-service.ts");
/* harmony import */ var _service_core_hugging_face_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../service/core/hugging-face-service */ "./src/admin/service/core/hugging-face-service.ts");
/* harmony import */ var _service_item_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/item-service */ "./src/admin/service/item-service.ts");
/* harmony import */ var _service_image_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../service/image-service */ "./src/admin/service/image-service.ts");
/* harmony import */ var _service_web_item_web_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../service/web/item-web-service */ "./src/admin/service/web/item-web-service.ts");
/* harmony import */ var _service_core_settings_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../service/core/settings-service */ "./src/admin/service/core/settings-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _dto_item__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../dto/item */ "./src/admin/dto/item.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/* harmony import */ var _admin_item_form_f7_html__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../admin/item/form.f7.html */ "./src/admin/components/admin/item/form.f7.html");
/* harmony import */ var excerpt_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! excerpt-html */ "./node_modules/excerpt-html/index.js");
/* harmony import */ var excerpt_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(excerpt_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var highlight_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highlight.js */ "./node_modules/highlight.js/es/index.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! quill */ "./node_modules/quill/dist/quill.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_2__);
/** @jsx $jsx */



















function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let quillEditorService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_quill_editor_service__WEBPACK_IMPORTED_MODULE_4__.QuillEditorService);
  let quillService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_quill_service__WEBPACK_IMPORTED_MODULE_5__.QuillService);
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_6__.UiService);
  let itemService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_item_service__WEBPACK_IMPORTED_MODULE_7__.ItemService);
  let itemWebService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_web_item_web_service__WEBPACK_IMPORTED_MODULE_8__.ItemWebService);
  let ipfsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_9__.IpfsService);
  let gitService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_core_git_service__WEBPACK_IMPORTED_MODULE_10__.GitService);
  let settingsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_core_settings_service__WEBPACK_IMPORTED_MODULE_11__.SettingsService);
  let huggingFaceService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_core_hugging_face_service__WEBPACK_IMPORTED_MODULE_12__.HuggingFaceService);
  let imageService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getInstance(_service_image_service__WEBPACK_IMPORTED_MODULE_13__.ImageService);
  let walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_3__.ContainerService.getWalletService();
  let itemViewModel = props.itemViewModel;
  let themes = props.themes;
  let ipfsReady = false;
  let cancelLink = `/admin/channel/show/${itemViewModel.item.channelId}/${itemViewModel.item.tokenId}`;
  let showHuggingFace = false;
  let coverImageCSSQuillEditor;
  let animationCSSQuillEditor;
  highlight_js__WEBPACK_IMPORTED_MODULE_1__["default"].configure({
    // optionally configure hljs
    languages: ['css']
  });
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: itemViewModel.channel.title,
    path: `/admin/channel/show/${itemViewModel.channel._id}`
  }, {
    text: itemViewModel.item.title ? itemViewModel.item.title : `#${itemViewModel.item.tokenId}`,
    path: `/admin/channel/show/${itemViewModel.channel._id}/${itemViewModel.item.tokenId}`
  }, {
    text: "Edit Item"
  }];
  const formSubmit = async e => {
    e.preventDefault();
    let formData = $f7.form.convertToData('#edit-item-form');
    let showExcerpt = false;

    //Get data
    let item = Object.assign(new _dto_item__WEBPACK_IMPORTED_MODULE_14__.Item(), formData);
    item.coverImageAsAnimation = formData.coverImageAsAnimation[0] != "on";
    item.tokenId = parseInt(formData.tokenId);

    //Get content from quill
    item.content = quillEditorService.activeEditor.getContents();
    item.coverImageCSS = coverImageCSSQuillEditor.getText() != "\n" ? coverImageCSSQuillEditor.getText() : undefined;
    item.animationCSS = animationCSSQuillEditor.getText() != "\n" ? animationCSSQuillEditor.getText() : undefined;

    //Parse attributeOptions and category
    if (item.attributeSelections) {
      item.attributeSelections = JSON.parse(item.attributeSelections).map(as => {
        return {
          id: as.id,
          traitType: as.traitType,
          value: as.value
        };
      });
    } else {
      item.attributeSelections = [];
    }

    //Build contentHTML for searching
    item.contentHTML = await quillService.translateContent(item.content, true);

    //Save the cover image if necessary
    let coverImage = await itemWebService.saveGeneratedCoverImage(item);
    item.coverImageGenerated = coverImage.generated;

    //And the animation
    if (!item.coverImageAsAnimation) {
      await itemWebService.saveAnimation(item);
    }

    //Save
    try {
      uiService.showSpinner();
      await itemWebService.put({
        channel: itemViewModel.channel,
        item: item,
        updateQueryCache: true,
        publish: false
      });
      const toast = $f7.toast.show({
        text: 'Item saved',
        closeTimeout: 2000,
        closeButton: true,
        position: 'bottom',
        horizontalPosition: 'left'
      });

      //Redirect
      $f7.views.main.router.navigate(`/admin/channel/show/${item.channelId}/${item.tokenId}`);
    } catch (ex) {
      console.log(ex);
      $f7.dialog.alert(ex.errors, "There was an error");
    }
  };
  $on('pageInit', async (e, page) => {
    //Initialize quill and fill contents
    quillEditorService.buildQuillPostEditor('#edit-item-editor', '#edit-item-toolbar');
    quillEditorService.activeEditor.setContents(itemViewModel.item.content);
    quillEditorService.activeEditor.on('selection-change', range => {
      document.dispatchEvent(new CustomEvent('load-cover-images'));
    });
    quillEditorService.activeEditor.on('text-change', (delta, oldContents, source) => {
      document.dispatchEvent(new CustomEvent('load-cover-images'));
      if (source !== 'user') return;
      function getImgUrls(delta) {
        return delta.ops.filter(i => i.insert && i.insert.ipfsimage).map(i => i.insert.ipfsimage);
      }
      let current = quillEditorService.activeEditor.getContents();
      let diff = quillEditorService.activeEditor.getContents().diff(oldContents);

      //Get images that have been changed. 
      const changed = getImgUrls(diff);

      //Filter images that are different but just style updates
      const deleted = [];
      for (let d of changed) {
        //Look for it in original
        let old = oldContents.ops.filter(i => i.insert && i.insert.ipfsimage && i.insert.ipfsimage.cid == d.cid);

        //Look for it in current
        let cur = current.ops.filter(i => i.insert && i.insert.ipfsimage && i.insert.ipfsimage.cid == d.cid);
        if (old.length > 0 && cur.length == 0) {
          deleted.push(d);
        }
      }

      //Remove them from the images array
      deleted.forEach(img => {
        itemViewModel.images = itemViewModel.images.filter(i => i.cid != img.cid);
        if (img.cid == itemViewModel.coverImage?.cid) {
          itemViewModel.coverImage = undefined;
        }
      });
      $update();
    });
    $('.image-button').off('click');
    $('.image-button-input').off('click');
    $('.ai-button').off('click');
    $('.image-button').on('click', function (e) {
      e.preventDefault();
      const imageButtonInput = $(".image-button-input");
      imageButtonInput.click();
    });
    $('.image-button-input').on('change', async function (e) {
      e.preventDefault();
      await quillEditorService.imageSelected(this);
    });
    $('.ai-button').on('click', async function (e) {
      e.preventDefault();
      const aiPromptEvent = new CustomEvent('set-ai-prompt');
      document.dispatchEvent(aiPromptEvent);
      $f7.popup.open('.ai-popup');
    });

    //Cover image
    coverImageCSSQuillEditor = new (quill__WEBPACK_IMPORTED_MODULE_2___default())('#cover-image-edit-css-editor', {
      bounds: ".page-content",
      theme: "snow",
      modules: {
        syntax: {
          highlight: text => highlight_js__WEBPACK_IMPORTED_MODULE_1__["default"].highlightAuto(text).value
        },
        toolbar: false
      }
    });
    coverImageCSSQuillEditor.on('text-change', (delta, oldContents, source) => {
      document.dispatchEvent(new CustomEvent('update-cover-image-css', {
        detail: {
          coverImageCSS: coverImageCSSQuillEditor.getText() != "\n" ? coverImageCSSQuillEditor.getText() : undefined
        }
      }));
    });
    animationCSSQuillEditor = new (quill__WEBPACK_IMPORTED_MODULE_2___default())('#animation-edit-css-editor', {
      bounds: ".page-content",
      theme: "snow",
      modules: {
        syntax: {
          highlight: text => highlight_js__WEBPACK_IMPORTED_MODULE_1__["default"].highlightAuto(text).value
        },
        toolbar: false
      }
    });
    if (itemViewModel.item.coverImageCSS) {
      coverImageCSSQuillEditor.setText(itemViewModel.item.coverImageCSS);
    }
    if (itemViewModel.item.animationCSS) {
      animationCSSQuillEditor.setText(itemViewModel.item.animationCSS);
    }
    await $update();
    uiService.showSpinner();

    //Initialize git's fs
    // await gitService.initFS(itemViewModel.channel)

    //Initialize IPFS
    await ipfsService.init();
    ipfsReady = ipfsService.ipfs != undefined;
    const ipfsReadyEvent = new CustomEvent('ipfs-ready');
    document.dispatchEvent(ipfsReadyEvent);
    const settings = await settingsService.get();
    showHuggingFace = settings?.huggingFace != undefined;
    if (settings?.huggingFace?.length > 0) {
      await huggingFaceService.init();
      const huggingFaceReady = new CustomEvent('hugging-face-ready');
      document.dispatchEvent(huggingFaceReady);
    }
    uiService.hideSpinner();
    await $update();
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="admin-edit-post">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_15__["default"]} breadcrumbs=${breadcrumbs} />

    <div class="page-content hide-toolbar-on-scroll">

      <form class="list media-list" id="edit-item-form" @submit="${formSubmit}">

        <${_admin_item_form_f7_html__WEBPACK_IMPORTED_MODULE_16__["default"]} item=${itemViewModel} 
          editor="edit-item-editor" 
          toolbar="edit-item-toolbar" 
          cover_image_css_editor_id="cover-image-edit-css-editor"
          animation_css_editor_id="animation-edit-css-editor"
          themes=${themes}
          cancel_link=${cancelLink}
          show_hugging_face=${showHuggingFace}
        />


      </form>

    </div>

  </div>

`
    }
    ;
}
framework7Component.id = '0cb716fe8c';
framework7Component.style = `
  #edit-item-editor {
    min-height: 175px;
    height: 100%;
    /* added these styles */
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/item/form.f7.html":
/*!******************************************************!*\
  !*** ./src/admin/components/admin/item/form.f7.html ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_quill_editor_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/quill-editor-service */ "./src/admin/service/quill-editor-service.ts");
/* harmony import */ var _service_quill_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/quill-service */ "./src/admin/service/quill-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _service_image_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/image-service */ "./src/admin/service/image-service.ts");
/* harmony import */ var _service_web_item_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/web/item-web-service */ "./src/admin/service/web/item-web-service.ts");
/** @jsx $jsx */








function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let quillEditorService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_quill_editor_service__WEBPACK_IMPORTED_MODULE_1__.QuillEditorService);
  let quillService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_quill_service__WEBPACK_IMPORTED_MODULE_2__.QuillService);
  let itemWebService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_web_item_web_service__WEBPACK_IMPORTED_MODULE_3__.ItemWebService);
  let imageService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_image_service__WEBPACK_IMPORTED_MODULE_4__.ImageService);
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_5__.UiService);
  const loadCoverImages = async () => {
    itemViewModel.images = await itemWebService.getImagesFromContent({
      title: itemViewModel.item.title,
      content: {
        ops: quillEditorService.activeEditor.getContents().ops
      },
      coverImageCSS: itemViewModel.item.coverImageCSS,
      themes: itemViewModel.item.themes
    });

    //If we just have the text based one select it.
    if (itemViewModel.images?.length == 1) {
      itemViewModel.coverImage = itemViewModel.images[0];
    }
    quillEditorService.activeEditor.update();
    await $update();
  };
  const coverImageClick = async e => {
    let id = $(e.currentTarget).data('id');
    let matches = itemViewModel?.images.filter(i => i.cid == id);
    if (matches?.length > 0) {
      itemViewModel.coverImage = matches[0];
    }
    await $update();
  };
  const coverImageClearClick = async e => {
    e.preventDefault();
    itemViewModel.coverImage = undefined;
    await $update();
  };
  const valueNameChange = async e => {
    let id = $(e.currentTarget).data('id');
    attributeSelections.filter(as => as.id == id)[0].value = $(e.currentTarget).val();
    await $update();
  };
  const themeSelectionChange = async e => {
    let themes = $(e.currentTarget).val();
    itemViewModel.item.themes = themes;
    await $update();
    await loadCoverImages();
  };
  const setAttributeSelections = as => {
    attributeSelections = as;

    //Set defaults for any that are not set.
    for (let attributeSelection of attributeSelections) {
      if (!attributeSelection.value && attributeSelection.values?.length > 0) {
        attributeSelection.value = attributeSelection.values[0];
      }
    }
  };
  const titleOnInput = e => {
    let value = $(e.currentTarget).val();
    itemViewModel.item.title = value;
    document.dispatchEvent(new CustomEvent('load-cover-images'));
  };
  const coverImageAsAnimationOnClick = e => {
    showAnimationCss = $(e.currentTarget).prop('checked');
    $update();
  };
  const generateFormSubmit = async e => {
    e.preventDefault();
    let formData = $f7.form.convertToData('#generate-form');
    try {
      await quillEditorService.generateAIImage(formData.model, formData.prompt, formData.negativePrompt);
      $f7.popup.close('.ai-popup');
    } catch (ex) {
      uiService.hideSpinner();
      $f7.dialog.alert(ex.message, "There was an error");
    }
  };
  let itemViewModel = props.item;
  let editorId = props.editor;
  let toolbarId = props.toolbar;
  let themes = props.themes;
  let ipfsReady;
  let cancelLink = props.cancel_link;
  let attributeSelections;
  let originalCoverImage = itemViewModel.coverImage;
  let coverImageCSSEditorId = props.cover_image_css_editor_id;
  let animationCSSEditorId = props.animation_css_editor_id;
  let showHuggingFace = props.show_hugging_face;
  let aiPrompt;
  let showAnimationCss = !itemViewModel.item.coverImageAsAnimation;
  if (itemViewModel) {
    setAttributeSelections(itemViewModel.attributeSelections);
  }
  $(document).on('image-selected', async e => {
    itemViewModel.coverImage = await imageService.get(e.detail._id);
    await loadCoverImages();
  });
  $(document).on('update-cover-image-css', async e => {
    itemViewModel.item.coverImageCSS = e?.detail?.coverImageCSS;
    await loadCoverImages();
  });
  $(document).on('load-cover-images', async e => {
    await loadCoverImages();
  });
  $(document).on('ipfs-ready', async e => {
    ipfsReady = true;
    await $update();
  });
  $(document).on('hugging-face-ready', async e => {
    showHuggingFace = true;
    await $update();
  });
  $(document).on('set-ai-prompt', async e => {
    let range = quillEditorService.activeEditor.getSelection();
    if (range) {
      if (range.length > 0) {
        aiPrompt = quillEditorService.activeEditor.getText(range.index, range.length);
        console.log('User has highlighted: ', aiPrompt);
      } else {
        aiPrompt = '';
      }
    }
    await $update();
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

    <div class="item-show">

        <input type="hidden" name="_id" value="${itemViewModel?.item?._id}" />
        <input type="hidden" name="_rev" value="${itemViewModel?.item?._rev}" />
        <input type="hidden" name="dateCreated" value="${itemViewModel?.item?.dateCreated}" />
        <input type="hidden" name="tokenId" value="${itemViewModel?.item?.tokenId}" />
        <input type="hidden" name="channelId" value="${itemViewModel?.channel?._id}" />

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
                                                value="${itemViewModel?.item?.title}" id="title-header-input"
                                                @input="${titleOnInput}" />
                                        </div>
                                    </div>
                                </div>
                            </li>
    
                            <li>
                                <div class="item-content item-input">
                                    <div class="item-inner post-area">
                                        <div class="item-title item-label">Content</div>
    
                                        <div id="${toolbarId}">
    
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

                                            <button class="text-editor-button ai-button" ${showHuggingFace ? $h`style='display: visible;'` : $h``}>AI</button>                                                


                                        </div>
    
                                        <div class="editor bg-color-white text-color-black" id="${editorId}"></div>
                                    </div>
                                </div>
                            </li>
    
    
    
                            <li class="cover-photo-preview">
    
                                ${itemViewModel?.coverImage ? $h`
                                <input type="hidden" name="coverImageId" value="${itemViewModel?.coverImage?.cid}" />
                                ` : $h`
                                <input type="hidden" name="coverImageId" value="" />
                                `}
    
                                <div class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-title item-label">
                                            Cover Image
                                            <div class="item-footer">If there is no image in the content then an SVG cover image will be generated.</div>
                                        </div>
                                        <div class="item-input-wrap">
    
                                            ${itemViewModel?.images?.length > 0 ? $h`
    
                                                ${itemViewModel?.images?.map( (image) => $h`
                                                    <img class="cover-image-thumbnail ${ (  (image?.cid == itemViewModel.coverImage?.cid) || (itemViewModel.coverImage == undefined && image.generated == true) )  ? 'selected' : ''}  "
                                                        src="${image?.url}" data-id="${image?.cid}" @click=${coverImageClick} />
                                                `)}
    
                                            ` : $h`
    
                                                <p>No images</p>
    
                                            `}
    
                                            <button class="button button-outline clear-button margin-bottom"
                                                @click="${coverImageClearClick}">Clear</button>
    
                                        </div>
                                    </div>
                                </div>
    
                            </li>    
                            <li>
                                <label class="item-checkbox item-content">
    
                                    <input type="checkbox" checked="${!itemViewModel.item.coverImageAsAnimation}" name="coverImageAsAnimation" @change="${coverImageAsAnimationOnClick}" />
                                    
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
                                    <select name="themes" @change="${themeSelectionChange}" tabindex="2" multiple>
                                        <optgroup>
                                            ${themes?.map( (theme) => $h`
    
                                                ${itemViewModel.item?.themes?.includes(theme._id) ? $h`
                                                    <option value="${theme._id}" selected>${theme.name}</option>
                                                    ` : $h`
                                                    <option value="${theme._id}">${theme.name}</option>
                                                `}
    
                                            `)}
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
                                    <div class="editor bg-color-white text-color-black css-editor" id="${coverImageCSSEditorId}" tabindex="3"></div>
                                </div>
                            </li>
    
                            ${showAnimationCss ? $h`
                                <li class="accordion-item">
                                    <a href="" class="item-link item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Edit Animation CSS (HTML)</div>
                                        </div>
                                    </a>
                                    <div class="accordion-item-content">
                                        <div class="editor bg-color-white text-color-black css-editor" id="${animationCSSEditorId}" tabindex="4"></div>
                                    </div>
                                </li>
                            ` : $h`
                                <li class="accordion-item" style="display:none;">
                                    <a href="" class="item-link item-content">
                                        <div class="item-inner">
                                            <div class="item-title">Edit Animation CSS (HTML)</div>
                                        </div>
                                    </a>
                                    <div class="accordion-item-content">
                                        <div class="editor bg-color-white text-color-black css-editor" id="${animationCSSEditorId}" tabindex="4"></div>
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
       
                            <a href="${cancelLink}" class="button button-outline color-gray" tabindex="12">Cancel</a>
                
                            ${ipfsReady ? $h`
                              <button type="submit" class="button button-fill" tabindex="12">Save</button>
                            ` : $h`
                              <button class="button button-outline color-lightblue" tabindex="12" disabled>IPFS initializing...</button>
                            `}
                
                        </div>
                    </div>
                </div>
            </div>

            ${itemViewModel.attributeSelections?.length > 0 ? $h`
                <div class="card">
                    <div class="card-header">Attributes</div>
                    <div class="card-content">
                        <div class="list">
                            <ul>
                                ${itemViewModel.attributeSelections?.map( (attributeSelectionViewModel) => $h`
                                <li>
                                    <a href="#" class="item-link smart-select smart-select-init" data-open-in="popover">
                                        <!-- "multiple" attribute for multiple select-->
                                        <select @change="${valueNameChange}" tabindex="2" data-id="${attributeSelectionViewModel?.id}">
                                            ${attributeSelectionViewModel?.values?.map( v => $h`

                                                ${attributeSelectionViewModel?.value?.toString() == v.toString() ? $h`
                                                <option value="${v}" selected>${v}</option>
                                                ` : $h`
                                                <option value="${v}">${v}</option>
                                                `}

                                            `)}
                                        </select>
                                        <div class="item-content">
                                            <div class="item-inner">
                                                <div class="item-title">${attributeSelectionViewModel?.traitType}</div>
                                            </div>
                                        </div>
                                    </a>
                                </li>


                                `)}
                            </ul>
                        </div>
                    </div>
                </div>
            ` : $h``}




        </div>

        <input type="hidden" name="attributeSelections" value="${JSON.stringify(attributeSelections)}" />

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

                        <form id="generate-form" @submit="${generateFormSubmit}">
                        
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
                                                    <textarea name="prompt" tabindex="41">${aiPrompt}</textarea>
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

`
    }
    ;
}
framework7Component.id = '2fbe07a938';
framework7Component.style = `
    .cover-image-thumbnail {
        width: 250px;
        height: 250px;
    }

    .cover-image-thumbnail.selected {
        border: 3px solid #ff0000;
    }

    #title-header-input {
        line-height: 30px;
        font-size: 30px;
        font-weight: 700;
        height: 50px;
    }

    .clear-button {
        width: 100px;
    }
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/item/show.f7.html":
/*!******************************************************!*\
  !*** ./src/admin/components/admin/item/show.f7.html ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_core_ui_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/ui-service */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _service_item_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/item-service */ "./src/admin/service/item-service.ts");
/* harmony import */ var _channel_token_navigator_f7_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../channel/token-navigator.f7.html */ "./src/admin/components/admin/channel/token-navigator.f7.html");
/* harmony import */ var _service_web_item_web_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/web/item-web-service */ "./src/admin/service/web/item-web-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/* harmony import */ var hotkeys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hotkeys-js */ "./node_modules/hotkeys-js/dist/hotkeys.esm.js");
/** @jsx $jsx */








function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let itemService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_item_service__WEBPACK_IMPORTED_MODULE_2__.ItemService);
  let uiService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_ui_service__WEBPACK_IMPORTED_MODULE_3__.UiService);
  let itemWebService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_web_item_web_service__WEBPACK_IMPORTED_MODULE_4__.ItemWebService);
  let itemViewModel = props.itemViewModel;
  // console.log(itemViewModel)

  let showEdit = itemViewModel.editable;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: itemViewModel.channel.title,
    path: `/admin/channel/show/${itemViewModel.channel._id}`
  }, {
    text: itemViewModel.item.title ? itemViewModel.item.title : `#${itemViewModel.item.tokenId}`
  }];
  $on('pageInit', async (e, page) => {
    //Add external to any links in the doc
    $(`#item-content-${itemViewModel.item._id} a`).addClass('external');
    await $update();
  });
  const deleteClick = async e => {
    try {
      $f7.dialog.confirm("Do you want to delete this item? Note: This only deletes from your device.", async function () {
        await itemWebService.delete(itemViewModel.item);
        const toast = $f7.toast.show({
          text: 'Item deleted',
          closeTimeout: 2000,
          closeButton: true,
          position: 'bottom',
          horizontalPosition: 'left'
        });

        //Redirect
        $f7.views.main.router.navigate(`/admin/channel/show/${itemViewModel.channel._id}`);
      });
    } catch (ex) {
      uiService.showExceptionPopup(ex);
    }
  };
  const cloneClick = async e => {
    let clone = await itemWebService.clone(itemViewModel.item);

    // console.log(`/admin/channel/show/${itemViewModel.channel._id}/${clone.tokenId}`)

    $f7.views.main.router.navigate(`/admin/channel/${itemViewModel.channel._id}/item/edit/${clone._id}`);
  };
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="admin-show-item">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_5__["default"]} breadcrumbs=${breadcrumbs} />

    ${itemViewModel.editable ? $h`
      <div class="fab fab-extended fab-right-bottom">
        <a href="/admin/item/create/${itemViewModel.channel._id}">
          <i class="material-icons">create</i>
          <div class="fab-text">Create Item</div>
        </a>
      </div>
    ` : $h``} 


    <div class="page-content hide-toolbar-on-scroll">

      <div class="item-show">

        <div class="left">
          <div class="card animation-card">
            <div class="card-content ${itemViewModel.item.coverImageAsAnimation ? $h`card-content-padding` : $h` `}">
  
              ${itemViewModel.item.coverImageAsAnimation ? $h`
                <div class="animation-content animation-image">
                  <img src="${itemViewModel.coverImage?.url}" alt="Item cover image" />
                </div>
               
              ` : $h`
                <div class="animation-content" innerHTML="${itemViewModel.animationContentHTML}"></div>
  
              `}
  
            </div>
  
  
          </div> 
  
          <div class="block split-row-both">
  
            ${itemViewModel.previous ? $h`
              <a class="button button-outline back-token-button margin-bottom color-gray" href="/admin/channel/show/${itemViewModel.channel._id}/${itemViewModel.previous}">
                <i class="icon f7-icons color-blue">arrow_left</i>
              </a>
            ` : $h`<span />`}
  
    
            ${itemViewModel.next ? $h`
              <a class="button button-fill continue-button margin-bottom" href="/admin/channel/show/${itemViewModel.channel._id}/${itemViewModel.next}" data-transition="f7-cover">
                Continue <i class="f7-icons">arrow_right</i>
              </a>
            ` : $h`<span />`}
  
          </div>
        </div>

        <div class="right">

          <${_channel_token_navigator_f7_html__WEBPACK_IMPORTED_MODULE_6__["default"]} channel=${itemViewModel.channel._id} item=${itemViewModel} />
  
  
          ${itemViewModel.previous || itemViewModel.next ? $h`
            
            <div class="card large-only">
              <div class="card-content card-content-padding">
                <div class="segmented">
  
                  ${itemViewModel.previous ? $h`
                    <a class="button button-outline" href="/admin/channel/show/${itemViewModel.channel._id}/${itemViewModel.previous}">
                      <i class="icon f7-icons">arrow_left</i>
                    </a>
                  ` : $h`
                    <a class="button button-outline" href="#"></a>
                  `}
        
                  ${itemViewModel.next ? $h`
                    <a class="button button-outline" href="/admin/channel/show/${itemViewModel.channel._id}/${itemViewModel.next}" data-transition="f7-cover">
                      <i class="f7-icons">arrow_right</i>
                    </a>
                  ` : $h`
                    <a class="button button-outline" href="#"></a>
                  `}
  
                </div>
              </div>
            </div>
  
          ` : $h`<span />`}
  
  
          ${itemViewModel.editable ? $h`
            <div class="card">
              <div class="card-header">Modify</div>
              <div class="card-content card-content-padding">
  
                <div class="segmented col-100">
  
                  <a class="button button-outline " href="/admin/channel/${itemViewModel.channel._id}/item/edit/${itemViewModel.item._id}" id="edit-${itemViewModel.item._id}">Edit</a>
                  <a class="button button-outline " href="#" data-id="${itemViewModel.item._id}" @click="${cloneClick}">Clone</a>
  
                  ${itemViewModel.canDelete ? $h`
                    <a class="button button-outline" @click="${deleteClick}">
                      <i class="material-icons">delete</i>
                    </a>
                  ` : $h`<span/>`}
  
                </div>
  
                ${!itemViewModel.canDelete ? $h`
                  <p>Note: Only the last NFT can be deleted.</p>
                ` : $h`<span />`}
  
  
              </div>
  
  
  
            </div>          
          ` :$h`<span />`}
          
  
  
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
  
                  ${itemViewModel?.authorDisplayName ? $h`
                    <tr>
                      <td class="label-cell">Creator:</td> 
                      <td><a href="/admin/author/show/${itemViewModel?.author?._id}">${itemViewModel?.authorDisplayName}</a></td>
                    </tr>  
                  ` : $h`<span />`}
  
                  <tr>
                    <td class="label-cell">Date:</td> 
                    <td><span class="date">${itemViewModel.dateDisplay}</span></td>
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
                <div class="value">#${itemViewModel.item.tokenId}</div>
              </div>
  
              ${itemViewModel.attributeSelections?.map(as => $h`
  
                ${as.value ? $h`
                  <div class="button-outline attribute-value">
                    <div class="trait-type">${as.traitType}</div>
                    <div class="value">${as.value}</div>
                    <div class="category-percent">${as.categoryPercent} have this trait</div>
                  </div>
                ` : $h`<span />`}
  
              `)}
  
            </div>
          </div>
  
          ${itemViewModel.themes?.length > 0 ? $h`
  
            <div class="card">
              <div class="card-header">Theme(s)</div>
              <div class="card-content">
                
                ${itemViewModel.themes?.map( (theme) => $h`
  
                  <div class="button-outline attribute-value">
                    <div class="value">${theme.name}</div> <span class="theme-id">${theme._id}</span>
                  </div>
  
                `)}
              </div>
            </div>
  
          ` : $h`<span/>`}
  
  
  
  
          ${!itemViewModel.item.coverImageAsAnimation ? $h`
            <div class="card">
              <div class="card-header">Cover Image</div>
              <div class="card-content">
                <div class="square">
                  <img src="${itemViewModel.coverImage?.url}" class="cover-image-preview" alt="Item cover image" />
                </div>
              </div>
            </div>
           
          ` : $h`<span />`}
  
  
  
  
        </div>
  
      </div>

    </div>

  </div>

`
    }
    ;
}
framework7Component.id = '33cbc12a59';
framework7Component.style = `




  /* .item-card-show a {
    color: var(--f7-text-color);
  } */


  .menu-dropdown-link.menu-close {
    color: #ffffff;
  }


  .attribute-row {
    font-size: 16px;
    vertical-align: top;
  }

  .attribute-row strong {
    width: 175px;
    display: inline-block;
    vertical-align: top;
  }


  .attribute-row .material-icons {
    line-height: 16px;
    display: inline-block;
    vertical-align: middle;
  }

  .item-show-footer {
    font-size: 14px;
  }

  .card-header {
    line-height: 21px;
  }

  .card-header label {
    padding-bottom: 3px;
    margin-left: 5px;
    float: left;
  }

  .card-header .material-icons {
    float: left;
  }

  .item-show-token-id {
    color: rgb(79, 79, 79);
  }

  .cover-image-preview {
    max-width: 100%;
  }

  .animation-preview {
    margin-left: 5px;
    height: 500px; 
    width: 500px;
    max-width: 100%;
    border: 1px solid #cccccc;
  }


  .nft-header-row {
    display: flex;  
  }

  .nft-header-row .left {
    flex: 0 0 500px;
  }

  .nft-header-row .right {
    flex: 1;
  }

  .nft-header-row .right h1 {
    font-size: 25px;
  }

  .nft-header-row .right h4 {
    margin-bottom: 0px;
  }





@media only screen and (max-width: 1024px) {

  .nft-header-row {
    display: block;  
  }
  
  .nft-header-row .left {
    width: 100%;
  }
  
  .nft-header-row .right {
    width: 100%;
  }
  
}


.theme-name {
  display: block;
}

.main-header {

}


`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/navbar.f7.html":
/*!***************************************************!*\
  !*** ./src/admin/components/admin/navbar.f7.html ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/** @jsx $jsx */


function framework7Component(props, {
  $on,
  $f7,
  $update
}) {
  let walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getWalletService();
  let walletAddress = walletService.address;
  let showConnect = walletService.provider != undefined;
  let active = props.active;
  let readerConfig = props.reader_config;
  let breadcrumbs = props.breadcrumbs;

  // Captures 0x + 4 characters, then the last 4 characters.
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const truncateEthAddress = address => {
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };
  const connectWallet = async e => {
    document.dispatchEvent(new CustomEvent('connect-wallet'));
  };
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

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
                                  ${walletAddress != undefined ? $h`
                                    <a href="#" class="link popover-close">${truncateEthAddress(walletAddress)}</a>
                                ` : $h`
                                    <a class="popover-close" href="#" @click=${connectWallet}>Connect Wallet</a>
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
              
              ${showConnect ? $h`
                ${walletAddress != undefined ? $h`
                      <a href="/admin/author/show/${walletAddress}" class="link ${active == 'profile' ? $h`link-active` : $h` `}">${truncateEthAddress(walletAddress)}</a>
                    ` : $h`
                      <a class="link" href="#" @click=${connectWallet}>Connect Wallet</button>
                    `}
              ` : $h`<span />`}

              <a class="link ${active == 'settings' ? $h`link-active` : $h` `}" href="/admin/settings" >
                Settings
              </a> 

            </div>
    
          </div>


          ${breadcrumbs ? $h`
                  
            <div class="subnavbar">
              <div class="subnavbar-inner">
                
                <div class="breadcrumbs ">
  
                  ${breadcrumbs.map( (b, index) => $h`
                    <div class="breadcrumbs-item ${index == breadcrumbs.length - 1 ? 'breadcrumbs-item-active' : ''}">

                      ${b.path ? $h`
                        <a href="${b.path}" class="link" >
                          ${b.text}
                        </a>
                      ` : $h`${b.text}`}


                    </div>  

                    ${b.path && index != breadcrumbs.length - 1 ? $h`
                      <div class="breadcrumbs-separator"></div>
                    ` : $h` `}

                    
                  `)}

                </div>
        
              </div>
            </div>


            ` : $h`<span />`}

          <!-- ${readerConfig?.path ? $h`
              <a href="${readerConfig.path}" class="link external">
                <i class="icon icon-back"></i> ${readerConfig.title}
              </a>
          ` : ''} -->

        </div>
      </div>

`
    }
    ;
}
framework7Component.id = '7e74152f53';
framework7Component.style = `


`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/publish/contract.f7.html":
/*!*************************************************************!*\
  !*** ./src/admin/components/admin/publish/contract.f7.html ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_channel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/channel-service */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _service_core_deploy_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/core/deploy-service */ "./src/admin/service/core/deploy-service.ts");
/* harmony import */ var _service_core_gitlab_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/core/gitlab-service */ "./src/admin/service/core/gitlab-service.ts");
/* harmony import */ var _service_core_queue_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/core/queue-service */ "./src/admin/service/core/queue-service.ts");
/* harmony import */ var _service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/ipfs-service */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/** @jsx $jsx */









function framework7Component(props, {
  $,
  $h,
  $on,
  $f7,
  $update
}) {
  let channelService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_channel_service__WEBPACK_IMPORTED_MODULE_2__.ChannelService);
  let ipfsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_3__.IpfsService);
  let queueService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_queue_service__WEBPACK_IMPORTED_MODULE_4__.QueueService);
  let gitlabService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_gitlab_service__WEBPACK_IMPORTED_MODULE_5__.GitlabService);
  let deployService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_deploy_service__WEBPACK_IMPORTED_MODULE_6__.DeployService);
  let walletService;
  let channelViewModel = props.channelViewModel;
  let deploying = false;
  let showDeploy = channelViewModel.channel.publishReaderIPFSStatus?.cid != undefined || channelViewModel.channel.contractAddress;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: channelViewModel.channel.title,
    path: `/admin/channel/show/${channelViewModel.channel._id}`
  }, {
    text: 'Publish',
    path: `/admin/publish/${channelViewModel.channel._id}`
  }, {
    text: 'Deploy Contract'
  }];
  $on('pageInit', async (e, page) => {
    walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getWalletService();
    await $update();
  });
  const deployContractClick = async e => {
    deploying = true;
    await $update();
    let promiseView = {
      title: `Deploying contract ${name}. Approve transaction and wait for it to be mined.`,
      promise: deployService.deployContract(channelViewModel.channel)
    };

    //Wait for it to be mined
    await queueService.queuePromiseView(promiseView);
    deploying = false;
    await $update();
  };
  const resetContract = async e => {
    channelViewModel.channel.contractAddress = undefined;
    await channelService.put(channelViewModel.channel);
    channelViewModel.channel = await channelService.get(channelViewModel.channel._id);
    $update();
  };
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

    <div class="page" data-name="publish">
  
      <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_7__["default"]} breadcrumbs=${breadcrumbs}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        <div class="fixed-width-content center">

          ${channelViewModel.itemCount > 0 ? $h`
              
            ${walletService?.address ? $h`
              <div class="block-title">Verify Mint Info</div>
              <div class="card">
                <div class="card-content">
                  <div class="card-content card-content-padding">
  
                    <p>
                      <strong>Mint Price:</strong> ${channelViewModel.channel.mintPrice} ETH each
                    </p>
  
                    <p>
                      <strong>Royalty:</strong> ${channelViewModel.channel.royaltyPercent}% 
                    </p>
  
                  </div>
                </div>
              </div>
              
              <div class="block-title">Deploy Contract</div>
              <div class="card">
                <div class="card-content">
                  <div class="card-content card-content-padding">
  
                    ${showDeploy ? $h`
  
                      <div class="pin-status">
                        <p><strong>IPFS Hash:</strong> ${channelViewModel.channel.publishReaderIPFSStatus?.cid}</p>
                        <p><strong>Date Exported:</strong> ${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(channelViewModel.channel.publishReaderIPFSStatus?.date).format('MMMM DD YYYY, h:mm:ss a')}</p>
                      </div>
  
  
                      ${channelViewModel.channel.contractAddress ? $h`
                        <p>
                          <strong>Current Contract Address:</strong> ${channelViewModel.channel.contractAddress} 
                          <a @click="${resetContract}" class="button button-fill button-small deploy-button">Reset</a>
                        </p> 
                      ` : $h`<span/>`}
  
  
                      ${deploying ? $h`
                        <p>Deploying...</p>
                      ` : $h`
                      
                        ${!channelViewModel.channel.contractAddress ? $h`
                          <button class="button button-fill button-small deploy-button" @click="${deployContractClick}">Deploy Contract</button>
                        ` : $h`
                          
                          <h1>Success!</h1>
                          
                          <p>
                            After deploying the contract re-export to the configured Git provider. The app will rebuild and it will become aware of Ethereum and show users the 
                            controls to begin minting NFTs if appropriate.
                          </p>
                          <a class="button button-outline button-small deploy-button" href="/admin/publish/export/${channelViewModel.channel._id}">Go to export</a>
  
  
                        `}                        
                      `}
                      
                    ` : $h`
                      <p>Collection must be deployed to IPFS</p>
                    `}
                  </div>
                </div>
              </div>
              
            ` : $h`
              <div class="card">
                <div class="card-content card-content-padding">
                  <p>Use a web browser with wallet support to deploy an ERC-721 smart contract.</p>
                </div>
              </div>
            
            `}
  
  
          ` : $h`
            <div class="card">
              <div class="card-content card-content-padding">
                <p>Add NFTs to the collection before publishing.</p>
              </div>
            </div>
            
          `}


        </div>

        

      </div>
  
    </div>
  
  `
    }
    ;
}
framework7Component.id = '3e167974fe';
framework7Component.style = `

  `;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/publish/export.f7.html":
/*!***********************************************************!*\
  !*** ./src/admin/components/admin/publish/export.f7.html ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_channel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/channel-service */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _service_core_gitlab_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/core/gitlab-service */ "./src/admin/service/core/gitlab-service.ts");
/* harmony import */ var _service_core_git_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/core/git-service */ "./src/admin/service/core/git-service.ts");
/* harmony import */ var _service_core_queue_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/core/queue-service */ "./src/admin/service/core/queue-service.ts");
/* harmony import */ var _service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/ipfs-service */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/** @jsx $jsx */










function framework7Component(props, {
  $,
  $h,
  $on,
  $f7,
  $update
}) {
  let channelService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_channel_service__WEBPACK_IMPORTED_MODULE_2__.ChannelService);
  let ipfsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_3__.IpfsService);
  let queueService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_queue_service__WEBPACK_IMPORTED_MODULE_4__.QueueService);
  let gitlabService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_gitlab_service__WEBPACK_IMPORTED_MODULE_5__.GitlabService);
  let gitService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_git_service__WEBPACK_IMPORTED_MODULE_6__.GitService);
  let channelViewModel = props.channelViewModel;
  let settings = props.settings;
  let publishing = false;
  let checkingStatus = false;
  let publishStatus;
  let publishOutput = "";
  let pageUnloaded = false;
  let showRefresh = channelViewModel?.channel.publishReaderIPFSStatus?.status == "pending";
  let hasItems = channelViewModel.itemCount > 0;
  let gitConfigured = channelViewModel?.gitProvider?.personalAccessToken?.length > 0;
  let gitRepo = channelViewModel?.channel?.httpUrlToRepo?.length > 0;
  let showForm = hasItems && gitConfigured && gitRepo;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: channelViewModel.channel.title,
    path: `/admin/channel/show/${channelViewModel.channel._id}`
  }, {
    text: 'Publish',
    path: `/admin/publish/${channelViewModel.channel._id}`
  }, {
    text: 'Export'
  }];
  let gitProvider;
  $on('pageInit', async () => {
    pageUnloaded = false;
    await $update();
    await checkIPFSActionStatus();
  });
  $on('pageAfterOut', (e, page) => {
    console.log("Unloading page");
    pageUnloaded = true;
  });
  const formSubmit = async e => {
    e.preventDefault();
    let formData = $f7.form.convertToData('#export-form');
    publishing = true;
    await $update();
    let elem = document.getElementsByClassName('publish-label')[0];
    $f7.preloader.showIn(elem);

    //Now publish
    try {
      let headSha = await gitService.deployReader(channelViewModel.channel);
      channelViewModel.channel.publishReaderIPFSStatus = {
        status: "pending",
        headSha: headSha
      };
      console.log(channelViewModel.channel.publishReaderIPFSStatus);
      await channelService.put(channelViewModel.channel);
    } catch (ex) {
      console.log(ex);
      $f7.dialog.alert(ex.message, "There was an error");
    }
    $f7.preloader.hideIn(elem);
    publishing = false;
    showRefresh = true;
    await checkIPFSActionStatus();
    await $update();
  };
  $(document).on('publish-progress', async e => {
    if (e.detail.message) {
      publishOutput = `<p>${e.detail.message}</p>`;
    }
    publishStatus = e.detail.publishStatus;
    $update();
    let outputElement = document.getElementById('ipfs-publish-process');
    if (outputElement) {
      $(outputElement).scrollTop(outputElement.scrollHeight);
    }
  });
  const checkIPFSActionStatus = async e => {
    if (pageUnloaded) return;
    if (!settings) return;
    if (channelViewModel.channel.publishReaderIPFSStatus?.status == "complete") return;
    if (publishing) return;
    if (checkingStatus) return;
    let gitProvider = await channelService.getGitProviderCredentials(channelViewModel.channel, settings);
    if (!gitProvider || !gitProvider.personalAccessToken || gitProvider.personalAccessToken.length < 1) return;
    console.log('Checking IPFS action workflow status...');
    checkingStatus = true;
    try {
      channelViewModel.channel = await channelService.get(channelViewModel.channel._id);
      let ipfsActionStatus = await gitService.getIPFSActionStatus(channelViewModel.channel);
      if (ipfsActionStatus == "finished") {
        //TODO

        //Get the new IPFS hash
        if (!channelViewModel.channel.contractAddress) {
          channelViewModel.channel.publishReaderIPFSStatus = await gitService.getIPFSActionResult(channelViewModel.channel);
        }
        channelViewModel.channel.publishReaderIPFSStatus.status = "complete";
        await channelService.put(channelViewModel.channel);
        await $update();
        let elem = document.getElementsByClassName('content-card-padding')[0];
        $f7.preloader.hideIn(elem);
      }
    } catch (ex) {
      console.log(ex);
    }
    await $update();
    checkingStatus = false;
    if (channelViewModel.channel.publishReaderIPFSStatus?.status != "complete") {
      setTimeout(checkIPFSActionStatus, 5000);
    }
  };
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

    <div class="page" data-name="publish">

        <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_7__["default"]} breadcrumbs=${breadcrumbs}  />

        <div class="page-content hide-toolbar-on-scroll">

            <div class="fixed-width-content center">
                ${showForm ? $h`

                    <form @submit="${formSubmit}" id="export-form">
    
    
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
                                <strong>Provider:</strong>  ${channelViewModel?.gitProvider.name} <br />
                                <strong>Repository:</strong>   <a href="${channelViewModel.channel.httpUrlToRepo}" class="link external" target="_blank">${channelViewModel.channel.httpUrlToRepo}</a><br />
                                <strong>Branch:</strong>   ${channelViewModel.channel.publishReaderRepoBranch}
                            </div>
                        </div>
        
    
                        <div class="card card-header-divider">
                            <div class="card-header">Export Status</div>
                            <div class="card-content card-content-padding">      

                                ${publishing ? $h`
                                    <div class="publish-label">
                                        Exporting...
                                    </div>
    
                                    ${publishStatus? $h`
    
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
                                                    <tr class="${publishStatus.images.saved == publishStatus.images.total && publishStatus.images.total > 0 ? 'complete' : ''}">
                                                        <td class="label-cell">Images</td>
                                                        <td class="numeric-cell">${publishStatus.images.saved}</td>
                                                        <td class="numeric-cell">${publishStatus.images.total}</td>
                                                    </tr>
                                                    <tr class="${publishStatus.animations.saved == publishStatus.animations.total && publishStatus.animations.total > 0 ? 'complete' : ''}">
                                                        <td class="label-cell">Animations</td>
                                                        <td class="numeric-cell">${publishStatus.animations.saved}</td>
                                                        <td class="numeric-cell">${publishStatus.animations.total}</td>
                                                    </tr>
                                                    <tr class="${publishStatus.nftMetadata.saved == publishStatus.nftMetadata.total && publishStatus.nftMetadata.total > 0 ? 'complete' : ''}">
                                                        <td class="label-cell">NFT Metadata</td>
                                                        <td class="numeric-cell">${publishStatus.nftMetadata.saved}</td>
                                                        <td class="numeric-cell">${publishStatus.nftMetadata.total}</td>
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
                                                    <tr class="${publishStatus.contractMetadata.saved == publishStatus.contractMetadata.total && publishStatus.contractMetadata.total > 0 ? 'complete' : ''}">
                                                        <td class="label-cell">Contract Metadata</td>
                                                        <td class="numeric-cell">${publishStatus.contractMetadata.total}</td>
                                                    </tr>
                                                    <tr class="${publishStatus.backups.items.saved == publishStatus.backups.items.total && publishStatus.backups.items.total > 0 ? 'complete' : ''}">
                                                        <td class="label-cell">Items</td>
                                                        <td class="numeric-cell">${publishStatus.backups.items.total}</td>
                                                    </tr>
                                                    <tr class="${publishStatus.backups.images.saved == publishStatus.backups.images.total && publishStatus.backups.images.total > 0 ? 'complete' : ''}">
                                                        <td class="label-cell">Image Metadata</td>
                                                        <td class="numeric-cell">${publishStatus.backups.images.total}</td>
                                                    </tr>
                                                    <tr class="${publishStatus.backups.animations.saved == publishStatus.backups.animations.total && publishStatus.backups.animations.total > 0 ? 'complete' : ''}">
                                                        <td class="label-cell">Animations Metadata</td>
                                                        <td class="numeric-cell">${publishStatus.backups.animations.total}</td>
                                                    </tr>
                                                    <tr class="${publishStatus.backups.themes.saved == publishStatus.backups.themes.total && publishStatus.backups.themes.total > 0 ? 'complete' : ''}">
                                                        <td class="label-cell">Themes</td>
                                                        <td class="numeric-cell">${publishStatus.backups.themes.total}</td>
                                                    </tr>
                                                    <tr class="${publishStatus.backups.staticPages.saved == publishStatus.backups.staticPages.total && publishStatus.backups.staticPages.total > 0 ? 'complete' : ''}">
                                                        <td class="label-cell">Static Pages</td>
                                                        <td class="numeric-cell">${publishStatus.backups.staticPages.total}</td>
                                                    </tr>
                                                    <tr class="${publishStatus.backups.channels.saved == publishStatus.backups.channels.total && publishStatus.backups.channels.total > 0 ? 'complete' : ''}">
                                                        <td class="label-cell">Channels</td>
                                                        <td class="numeric-cell">${publishStatus.backups.channels.total}</td>
                                                    </tr>
    
                                                    ${publishStatus.backups.authors.total ? $h`
    
                                                        <tr class="${publishStatus.backups.authors.saved == publishStatus.backups.authors.total && publishStatus.backups.authors.total > 0 ? 'complete' : ''}">
                                                            <td class="label-cell">Authors</td>
                                                            <td class="numeric-cell">${publishStatus.backups.authors.total}</td>
                                                        </tr>
                                                    ` : $h`<span/>`}
    
    
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
    
                                        <div class="publish-status"></div>
    
                                    ` : $h`<span />`}
    
                                ` : $h`
                                    <div class="publish-label" style="display:none;"></div>
                                `}
    
                                ${publishOutput ? $h`
                                    <div class="publish-output" innerHTML="${publishOutput}" id="ipfs-publish-process" ></div>
                                ` : $h`
                                    <div class="publish-output" style="display:none;"></div>
                                `}
    
    
                                ${channelViewModel.channel.publishReaderIPFSStatus?.status ? $h`
    
                                    <div class="pin-status"> 
                                        <strong>Build Status:</strong> ${channelViewModel.channel.publishReaderIPFSStatus?.status}<br />

                                        ${channelViewModel.channel.publishReaderIPFSStatus?.status == "complete" && channelViewModel.channel.publishReaderIPFSStatus?.cid ? $h`
                                            <strong>IPFS cid:</strong> ${channelViewModel.channel.publishReaderIPFSStatus?.cid}<br />
                                            <strong>Archive:</strong> <a href="${channelViewModel.channel.publishReaderIPFSStatus?.archive}" class="link external">${channelViewModel.channel.publishReaderIPFSStatus?.archive}</a><br />
                                            <strong>Date:</strong> ${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(channelViewModel.channel.publishReaderIPFSStatus?.date).format('MMMM DD YYYY, h:mm:ss a')}
                                        ` : $h` `}

                                    </div>
    
                                ` : $h`<span />`}
    
    
                                ${!publishing ? $h`
    
                                    
                                    ${showRefresh ? $h`
        
                                        <button type="submit" class="button button-fill button-small color-gray text-color-white deploy-button">
                                            <i class="material-icons">refresh</i> Export Again
                                        </button>
    
    
                                    ` : $h`
    
                                        ${!publishing ? $h`
                                            <button type="submit" class="button button-fill button-small deploy-button" >Export</button>
                                        ` : $h`<span />`}  
    
                                    `}
                                    
                                ` : $h`
                                    <p></p>
                                `}
                            </div>
                        </div>
    
                    </form>
    
                ` : $h`
    
                    ${!hasItems ? $h`
                
                        <div class="card">
                        <div class="card-content card-content-padding">
                            <p>Add NFTs to the collection before publishing.</p>
                        </div>
                        </div>
        
                    ` : $h` `}
        
                    ${!gitConfigured ? $h`
                        
                        <div class="card">
                        <div class="card-content card-content-padding">
                            <p>Configure a <a href="/admin/settings">git provider</a> to deploy the reader.</p>
                        </div>
                        </div>
        
                    ` : $h` 
                    
                        ${!gitRepo ? $h`
                            
                            <div class="card">
                            <div class="card-content card-content-padding">
                                <p>Create/connect a <a href="/admin/publish/fork-reader/${channelViewModel.channel._id}">git repo</a> to begin export.</p>
                            </div>
                            </div>
            
                        ` : $h` `}
                    
                    `}
        
    
    
                `}

            </div>

            

        </div>

    </div>

`
    }
    ;
}
framework7Component.id = 'c337581ec2';
framework7Component.style = `
    .deploy-button {
        margin-top: 10px;
        width: 200px;
    }

    .publish-label,
    .ipfs-label,
    .forking-label {
        margin-top: 10px;
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 18px;
    }

    .publish-output {
        border: 1px solid #cccccc;
        font-size: 13px;
        width: 100%;
        max-width: 100%;
        padding: 5px;
        height: 100px;
        overflow-y: scroll;
    }

    .publish-status {
        font-size: 14px;
        padding: 10px;
        border: 1px solid #f1f1f1;
    }

    .publish-status .item label {
        font-weight: bold;
        display: inline-block;
        width: 180px;
    }

    /* #export-refresh-button {
        width: 45px;
        height: 30px;
        display: inline-block;
        margin-left: 5px;
        padding-top: 2.5px;
    } */

    #export-next-button {
        width: 200px;
        float: right;
    }

`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/publish/fork-reader.f7.html":
/*!****************************************************************!*\
  !*** ./src/admin/components/admin/publish/fork-reader.f7.html ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_channel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/channel-service */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _service_core_git_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/core/git-service */ "./src/admin/service/core/git-service.ts");
/* harmony import */ var _service_core_queue_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/core/queue-service */ "./src/admin/service/core/queue-service.ts");
/* harmony import */ var _service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/ipfs-service */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/** @jsx $jsx */








function framework7Component(props, {
  $,
  $h,
  $on,
  $f7,
  $update
}) {
  let channelService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_channel_service__WEBPACK_IMPORTED_MODULE_2__.ChannelService);
  let ipfsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_3__.IpfsService);
  let queueService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_queue_service__WEBPACK_IMPORTED_MODULE_4__.QueueService);
  let gitService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_git_service__WEBPACK_IMPORTED_MODULE_5__.GitService);
  let channelViewModel = props.channelViewModel;
  let settings = props.settings;
  let pageUnloaded = false;
  let forking = false;
  let hasItems = channelViewModel.itemCount > 0;
  let gitConfigured = channelViewModel?.gitProvider?.personalAccessToken?.length > 0;
  let showForm = hasItems && gitConfigured;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: channelViewModel.channel.title,
    path: `/admin/channel/show/${channelViewModel.channel._id}`
  }, {
    text: 'Publish',
    path: `/admin/publish/${channelViewModel.channel._id}`
  }, {
    text: 'Create Git Repository'
  }];
  $on('pageInit', async () => {
    pageUnloaded = false;
    await $update();
    await checkPublishRepoStatus();
  });
  $on('pageAfterOut', (e, page) => {
    console.log("Unloading page");
    pageUnloaded = true;
  });
  const createForkSubmit = async e => {
    e.preventDefault();
    forking = true;
    await $update();
    let elem = document.getElementsByClassName('content-card-padding')[0];
    $f7.preloader.showIn(elem);
    let response;
    try {
      response = await gitService.createFork(channelViewModel.channel);
      channelViewModel.channel.publishReaderRepoId = response.id;
      channelViewModel.channel.publishReaderRepoPath = response.path;
      channelViewModel.channel.publishReaderRepoBranch = response.branch;
      channelViewModel.channel.publishReaderRepoStatus = "pending";
      await channelService.put(channelViewModel.channel);
    } catch (ex) {
      $f7.preloader.hideIn(elem);
      console.log(ex);
      if (ex.toString() == "Error: Request failed with status code 409") {
        $f7.dialog.alert("Git repo already exists with that name.", "There was an error");
      } else {
        $f7.dialog.alert(ex, "There was an error");
      }
    }
    forking = false;
    await $update();
    await checkPublishRepoStatus();
  };
  const checkPublishRepoStatus = async e => {
    if (pageUnloaded) return;
    if (!settings) return;
    if (channelViewModel.channel.publishReaderRepoStatus == "complete" && channelViewModel.channel.publishReaderRepoId > 0) return;
    if (forking) return;
    let gitProvider = await channelService.getGitProviderCredentials(channelViewModel.channel, settings);
    if (!gitProvider || !gitProvider.personalAccessToken || gitProvider.personalAccessToken.length < 1) return;
    console.log('Checking repo fork status...');
    try {
      channelViewModel.channel = await channelService.get(channelViewModel.channel._id);
      let forkRepoStatus = await gitService.getForkRepoStatus(channelViewModel.channel);
      if (forkRepoStatus == "finished") {
        //TODO

        //Grab the URL
        let forkResult = await gitService.getExistingFork(channelViewModel.channel);
        channelViewModel.channel.publishReaderRepoStatus = "complete";
        channelViewModel.channel.httpUrlToRepo = forkResult.httpUrlToRepo;
        await channelService.put(channelViewModel.channel);
        let elem = document.getElementsByClassName('content-card-padding')[0];
        $f7.preloader.hideIn(elem);
      }
    } catch (ex) {
      console.log(ex);
    }
    await $update();
    if (channelViewModel.channel.publishReaderRepoStatus != "complete") {
      setTimeout(checkPublishRepoStatus, 5000);
    }
  };
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="page" data-name="publish">

    <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_6__["default"]} breadcrumbs=${breadcrumbs}  />

    <div class="page-content hide-toolbar-on-scroll">

      <div class="fixed-width-content center">

        ${showForm ? $h`

          <div class="block-title">Create/Connect Git Repository</div>
          <div class="card">
  
            <div class="card-content card-content-padding">
              <form id="fork-reader" @submit="${createForkSubmit}">
  
                ${forking ? $h`
                  <div class="forking-label">
                    Forking...
                  </div>
  
                  <div class="preloader"></div>
  
                ` : $h`
  
  
                  <div class="forking-label" style="display:none;"></div>
  
  
                  ${channelViewModel.channel.publishReaderRepoId ? $h`
                    <div class="repo-status">
  
                      <p><strong>Current Repo:</strong> ${channelViewModel.channel.httpUrlToRepo ? $h`
                        <a href="${channelViewModel.channel.httpUrlToRepo}" class="link external" target="_blank">${channelViewModel.channel.httpUrlToRepo}</a>
                        ` : $h` `}</p>
  
                      <p><strong>Configured Provider:</strong> ${channelViewModel?.gitProvider?.name}</p>
  
                      <p><strong>Repo ID:</strong> ${channelViewModel.channel.publishReaderRepoId}</p>
                      <p><strong>Branch:</strong>   ${channelViewModel.channel.publishReaderRepoBranch}</p>
                      <p><strong>Repo Path:</strong> ${channelViewModel.channel.publishReaderRepoPath}</p>
                      <p><strong>Job Status:</strong> ${channelViewModel.channel.publishReaderRepoStatus}</p>
                    </div>
                  ` : $h`<span />`}
  
  
  
                  <div class="block cancel-save-row">
        
                    <div class="large-only"></div>
      
                    <a href="/admin/publish/${channelViewModel.channel._id}" class="button button-outline color-gray" tabindex="30">
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
  
        ` : $h`
  
            ${!hasItems ? $h`
                
              <div class="card">
                <div class="card-content card-content-padding">
                  <p>Add NFTs to the collection before publishing.</p>
                </div>
              </div>
  
            ` : $h` `}
  
            ${!gitConfigured ? $h`
              
              <div class="card">
                <div class="card-content card-content-padding">
                  <p>Configure a <a href="/admin/settings">git provider</a> to deploy the reader.</p>
                </div>
              </div>
  
            ` : $h` `}

    
        `}

      </div>


      

    </div>

  </div>

`
    }
    ;
}
framework7Component.id = '2d9272b570';
framework7Component.style = `
  .publish-label,
  .ipfs-label,
  .forking-label {
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 18px;
  }

  .publish-output {
    border: 1px solid #cccccc;
    font-size: 13px;
    width: 100%;
    max-width: 100%;
    padding: 5px;
    height: 300px;
    overflow-y: scroll;
  }

  #fork-next-button {
    width: 200px;
  }
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/publish/index.f7.html":
/*!**********************************************************!*\
  !*** ./src/admin/components/admin/publish/index.f7.html ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/** @jsx $jsx */



function framework7Component(props, {
  $,
  $h,
  $on,
  $f7,
  $update
}) {
  let walletService;
  let channelViewModel = props.channelViewModel;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: channelViewModel.channel.title,
    path: `/admin/channel/show/${channelViewModel.channel._id}`
  }, {
    text: 'Publish'
  }];
  $on('pageInit', async (e, page) => {
    walletService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getWalletService();
    await $update();
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

    <div class="page" data-name="publish">
  
      <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_1__["default"]} breadcrumbs=${breadcrumbs}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        <div class="fixed-width-content center">

          ${channelViewModel.itemCount > 0 ? $h`
          
            <div class="block-title block-title-medium">Configure Git</div>
            <div class="block list media-list">
              <ul>
                <li>
                  <a href="/admin/publish/fork-reader/${channelViewModel.channel._id}" class="item-link">
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
                          
                            ${channelViewModel?.gitProvider ? $h`
                              <strong>Provider:</strong>  ${channelViewModel?.gitProvider.name} <br />
                            ` : $h` `}
  
                            ${channelViewModel.channel.httpUrlToRepo ? $h`
                              <strong>Repository:</strong>  ${channelViewModel.channel.httpUrlToRepo}
                            ` : $h` `}
  
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
                  <a href="/admin/publish/export/${channelViewModel.channel._id}" class="item-link">
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
  
            ${walletService?.address ? $h`
              
              <div class="block list media-list">
                <ul>
                  <li>
                    <a href="/admin/publish/contract/${channelViewModel.channel._id}" class="item-link">
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
  
            ` : $h`
              <div class="block-header">
                Note: Use a web browser with wallet support to deploy an ERC-721 smart contract.
              </div>
            `}

  
  
          ` : $h`
            <div class="card">
              <div class="card-content card-content-padding">
                <p>Add NFTs to the collection before publishing.</p>
              </div>
            </div>
            
          `}


        </div>


        


      </div>
  
    </div>
  
  `
    }
    ;
}
framework7Component.id = 'c6f9a4f49d';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/publish/publish-reader.f7.html":
/*!*******************************************************************!*\
  !*** ./src/admin/components/admin/publish/publish-reader.f7.html ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_channel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/channel-service */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _service_core_publish_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/core/publish-service */ "./src/admin/service/core/publish-service.ts");
/* harmony import */ var _service_core_gitlab_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/core/gitlab-service */ "./src/admin/service/core/gitlab-service.ts");
/* harmony import */ var _service_core_git_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/core/git-service */ "./src/admin/service/core/git-service.ts");
/* harmony import */ var _service_core_queue_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/core/queue-service */ "./src/admin/service/core/queue-service.ts");
/* harmony import */ var _service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/core/ipfs-service */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/* harmony import */ var it_to_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! it-to-buffer */ "./node_modules/it-to-buffer/dist/src/index.js");
/** @jsx $jsx */










function framework7Component(props, {
  $,
  $h,
  $on,
  $f7,
  $update
}) {
  let channelService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_channel_service__WEBPACK_IMPORTED_MODULE_2__.ChannelService);
  let ipfsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_3__.IpfsService);
  let queueService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_queue_service__WEBPACK_IMPORTED_MODULE_4__.QueueService);
  let gitlabService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_gitlab_service__WEBPACK_IMPORTED_MODULE_5__.GitlabService);
  let gitService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_git_service__WEBPACK_IMPORTED_MODULE_6__.GitService);
  let publishService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_1__.ContainerService.getInstance(_service_core_publish_service__WEBPACK_IMPORTED_MODULE_7__.PublishService);
  let ipfsReady = ipfsService.ipfs != undefined;
  let peerCount = ipfsService.peerCount;
  let channelViewModel = props.channelViewModel;
  let settings = props.settings;
  let publishing = false;
  let publishReaderOutput = "";
  let showPublishReaderStatus = channelViewModel.channel.publishReaderRepoId > 0 && channelViewModel.channel.publishReaderRepoStatus == "complete";
  let showPublishReader = channelViewModel.channel.localCid != undefined;
  let hasItems = channelViewModel.itemCount > 0;
  let gitConfigured = channelViewModel?.gitProvider?.personalAccessToken?.length > 0;
  let gitCorsProxy = settings?.gitCorsProxy?.length > 0;
  let showForm = hasItems && gitConfigured && gitCorsProxy;
  let repoURI = channelViewModel.channel.httpUrlToRepo;
  let gitProvider;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: channelViewModel.channel.title,
    path: `/admin/channel/show/${channelViewModel.channel._id}`
  }, {
    text: 'Publish',
    path: `/admin/publish/${channelViewModel.channel._id}`
  }, {
    text: 'Publish Collection To Reader'
  }];
  $on('pageInit', async () => {
    //Initialize IPFS
    await ipfsService.init();
    ipfsReady = ipfsService.ipfs != undefined;
    gitProvider = await channelService.getGitProviderCredentials(channelViewModel.channel, settings);
    await $update();
  });
  const publishReaderSubmit = async e => {
    e.preventDefault();
    publishing = true;
    await $update();
    let elem = document.getElementsByClassName('ipfs-label')[0];
    $f7.preloader.showIn(elem);
    try {
      let ipfsDir = `/export/${channelViewModel.channel._id}`;
      let contractMetadata = await (0,it_to_buffer__WEBPACK_IMPORTED_MODULE_0__["default"])(ipfsService.ipfs.files.read(`${ipfsDir}/contractMetadata.json`));
      await gitService.deployReaderGit(channelViewModel.channel, contractMetadata);
    } catch (ex) {
      console.log(ex);
      $f7.dialog.alert(ex, "There was an error");
    }

    // console.log('hide')
    $f7.preloader.hideIn(elem);
    publishing = false;
    await $update();
  };
  const clearGitClick = async e => {
    e.preventDefault();
    let elem = document.getElementsByClassName('ipfs-label')[0];
    $f7.preloader.showIn(elem);
    try {
      await gitService.clearGitRepos();
    } catch (ex) {
      $f7.dialog.alert(ex, "There was an error");
    }

    // console.log('hide')
    $f7.preloader.hideIn(elem);
    await $update();
  };
  $(document).on('publish-reader-progress', async e => {
    publishReaderOutput = `<p>${e.detail.message}</p>`;
    $update();
  });
  $(document).on('update-peers', async e => {
    peerCount = e.detail.count;
    $update();
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

    <div class="page" data-name="publish">
  
      <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_8__["default"]} breadcrumbs=${breadcrumbs}  />
  
      <div class="page-content hide-toolbar-on-scroll">

        ${showForm ? $h`
              
          <div class="block-title">Publish Reader</div>
          <div class="card">

            <div class="card-content card-content-padding">

              ${gitProvider?.personalAccessToken?.length > 0 ? $h`

                ${showPublishReader ? $h`
                  
                  <form @submit="${publishReaderSubmit}">

                    ${!ipfsReady ? $h`
                      <div class="ipfs-label">IPFS Initializing...</div>
                    ` : $h`
                        <div class="ipfs-label">
                            Status: <a href="/admin/connect">IPFS Ready</a>
                        </div>
                    `}


                    ${channelViewModel.channel.publishReaderRepoId > 0 ? $h`
                      <div class="repo-status">
                        <p><strong>Remote Repository:</strong> ${repoURI}</p> <a href="#" class="link" @click="${clearGitClick}">Clear local cache</a>
                        <!-- <p><strong>Gitlab Repo ID:</strong> ${channelViewModel.channel.publishReaderRepoId}</p>
                        <p><strong>Gitlab Repo Path:</strong> ${channelViewModel.channel.publishReaderRepoPath}</p>  
                        <p><strong>Fork Status:</strong> ${channelViewModel.channel.publishReaderRepoStatus}</p>                                                                                                                                                               -->
                      </div>

                      ${showPublishReaderStatus && ipfsReady ? $h`

                        ${channelViewModel.channel.contractAddress ? $h`
                          <p>Reader will be configured to connect to: ${channelViewModel.channel.contractAddress}</p>  
                        ` : $h`
                          <p>Note: Contract is not deployed. The reader will not attempt to connect to Ethereum.</p>  
                        `}

                        ${publishReaderOutput ? $h`
                          <div class="publish-output" innerHTML="${publishReaderOutput}"></div>
                        ` : $h`
                          <div class="publish-output" style="display:none;"></div>
                        `}


                        
                        <div class="block cancel-save-row">
      
                          <div class="large-only"></div>
            
                          <a href="/admin/publish/${channelViewModel.channel._id}" class="button button-outline color-gray" tabindex="30">
                            Back to menu
                          </a>
        
                          ${!publishing ? $h`
                            <button class="button button-fill" type="submit">Publish Reader</button>
                          ` : $h`

                            <a href="#" class="button button-outline">
                              Publishing...
                            </a>
                          `}

                        </div>


                    


                      ` : $h`
                        <p style="display:none;"></p>
                      `}

                    ` : $h``}



                  </form>                    
                ` : $h`
                  <p>Collection must be deployed to IPFS and you must fork the Large Reader before publishing.</p>  
                `}
                
              ` : $h`
                <p>Configure a <a href="/admin/settings">git provider</a> to deploy the collection reader.</p>
              `}


            </div>

          </div>

        ` : $h`

            ${!hasItems ? $h`
                    
              <div class="card">
                <div class="card-content card-content-padding">
                    <p>Add NFTs to the collection before publishing.</p>
                </div>
              </div>

          ` : $h` `}

          ${!gitConfigured ? $h`
              
              <div class="card">
                <div class="card-content card-content-padding">
                    <p>Configure a <a href="/admin/settings">git provider</a> to deploy the reader.</p>
                </div>
              </div>

          ` : $h` `}

          ${!gitCorsProxy ? $h`
              
              <div class="card">
                <div class="card-content card-content-padding">
                    <p>Configure a <a href="/admin/settings">git CORS proxy</a> to deploy the reader.</p>
                </div>
              </div>

          ` : $h` `}


          
        `}

      </div>
  
    </div>
  
  `
    }
    ;
}
framework7Component.id = 'd7f6c9124e';
framework7Component.style = `

    .publish-label, .ipfs-label, .forking-label {
      margin-top: 10px;
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 18px;
    }

    .publish-output {
      border: 1px solid #cccccc;
      font-size: 13px;
      width: 100%;
      max-width: 100%;
      padding: 5px;
      height: 300px;
      overflow-y : scroll;
    }
  `;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/settings/index.f7.html":
/*!***********************************************************!*\
  !*** ./src/admin/components/admin/settings/index.f7.html ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/* harmony import */ var _service_core_settings_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/core/settings-service */ "./src/admin/service/core/settings-service.ts");
/* harmony import */ var _service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../service/core/ipfs-service */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _dto_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../dto/settings */ "./src/admin/dto/settings.ts");
/* harmony import */ var _admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../admin/navbar.f7.html */ "./src/admin/components/admin/navbar.f7.html");
/** @jsx $jsx */







function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let settingsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_settings_service__WEBPACK_IMPORTED_MODULE_1__.SettingsService);
  let ipfsService = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance(_service_core_ipfs_service__WEBPACK_IMPORTED_MODULE_2__.IpfsService);
  let settings;
  let breadcrumbs = [{
    text: "Home",
    path: "/"
  }, {
    text: 'Settings'
  }];
  const formSubmit = async e => {
    e.preventDefault();
    let formData = $f7.form.convertToData('#edit-settings-form');
    let formSettings = {
      _id: formData._id,
      _rev: formData._rev,
      ipfsHost: formData.ipfsHost,
      defaultGitProvider: formData.gitProvider,
      gitCorsProxy: formData.gitCorsProxy,
      gitProviders: {
        gitlab: {
          name: "gitlab",
          username: formData.gitLabUsername,
          personalAccessToken: formData.gitLabPersonalAccessToken
        },
        github: {
          name: "github",
          username: formData.gitHubUsername,
          personalAccessToken: formData.gitHubPersonalAccessToken
        }
      },
      alchemyKey: formData.alchemyKey,
      huggingFace: formData.huggingFace,
      welcomeHide: formData.welcomeHide == "true"
    };

    //Save
    try {
      let updatedSettings = Object.assign(new _dto_settings__WEBPACK_IMPORTED_MODULE_3__.Settings(), formSettings);
      await settingsService.put(updatedSettings);
      if (settings?.ipfsHost != updatedSettings?.ipfsHost) {
        await ipfsService.clearInit();
      }
      const toast = $f7.toast.show({
        text: 'Settings Saved',
        closeTimeout: 2000,
        closeButton: true,
        position: 'bottom',
        horizontalPosition: 'left'
      });

      //Redirect
      $f7.views.main.router.navigate(`/`);
    } catch (ex) {
      console.log(ex.errors);
      $f7.dialog.alert(ex, "Saving settings failed");
    }
  };
  const providerChange = async e => {
    settings.gitProvider = $(e.currentTarget).val();
    await $update();
  };
  $on('pageInit', async e => {
    settings = await settingsService.get();
    $update();
  });
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

    <div class="page" data-name="admin-settings">

        <${_admin_navbar_f7_html__WEBPACK_IMPORTED_MODULE_4__["default"]} breadcrumbs=${breadcrumbs} />

        <div class="page-content hide-toolbar-on-scroll">

            <div class="fixed-width-content center">

                ${settings ? $h`
                    <form id="edit-settings-form" @submit="${formSubmit}">
            
                        <input type="hidden" name="_id" value="${settings?._id}" />
                        <input type="hidden" name="_rev" value="${settings?._rev}" />
                        <input type="hidden" name="welcomeHide" value="${settings?.welcomeHide}" />
    

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
                                                                    <input type="text" name="huggingFace" value="${settings?.huggingFace}" placeholder="API token..." />
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
                                                                        <select @change="${providerChange}" class="value-input" name="gitProvider">     
                                                                            
                                                                            ${!settings?.defaultGitProvider || settings?.defaultGitProvider == "github" ? $h`
                                                                                <option value="github" selected>GitHub</option>
                                                                            ` : $h`
                                                                                <option value="github">GitHub</option>
                                                                            `}
                        
                        
                                                                            ${settings?.defaultGitProvider == "gitlab" ? $h`
                                                                                <option value="gitlab" selected>GitLab</option>
                                                                            ` : $h`
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
                                                                                                value="${settings.gitProviders?.github?.username}"  />
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
                                                                                                value="${settings.gitProviders?.github?.personalAccessToken}"  />
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
                                                                                                value="${settings.gitProviders?.gitlab?.username}"  />
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
                                                                                                value="${settings.gitProviders?.gitlab?.personalAccessToken}"  />
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
                                                                    <input type="text" name="ipfsHost" value="${settings?.ipfsHost}" placeholder="Example: https://localhost:5001/api/v0" />
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
                                                                    <input type="text" name="alchemyKey" value="${settings?.alchemyKey}" placeholder="API key..." />
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
                ` : $h` `}

            </div>

        </div>

    </div>

`
    }
    ;
}
framework7Component.id = '7ad27e2fc4';
framework7Component.style = `


`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/components/admin/toolbar.f7.html":
/*!****************************************************!*\
  !*** ./src/admin/components/admin/toolbar.f7.html ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../service/core/container-service */ "./src/admin/service/core/container-service.ts");
/** @jsx $jsx */


function framework7Component(props, {
  $on,
  $f7,
  $update
}) {
  let version = _service_core_container_service__WEBPACK_IMPORTED_MODULE_0__.ContainerService.getInstance("version");
  const clone = document.getElementById("footer-template")?.content?.cloneNode(true);
  let footerTemplate;
  if (clone) {
    const serializer = new XMLSerializer();
    footerTemplate = serializer.serializeToString(clone);
  }
  return function ($ctx) {
      var $ = $ctx.$;
      var $h = $ctx.$h;
      var $root = $ctx.$root;
      var $f7 = $ctx.$f7;
      var $f7route = $ctx.$f7route;
      var $f7router = $ctx.$f7router;
      var $theme = $ctx.$theme;
      var $update = $ctx.$update;
      var $store = $ctx.$store;

      return $h`

  <div class="toolbar toolbar-bottom">

    <div class="toolbar-inner" style="display: block; padding: 10px;">

      
      ${footerTemplate ? $h`
        
        <div innerHTML='${footerTemplate}'></div>
      
      ` : $h`
        <span class="footer-link">
          Code licensed under <a href="https://github.com/LargeNFT/large-nft/blob/master/LICENSE.md" class="external">MIT</a>
        </span>

        <span class="footer-link">
          <a href="https://github.com/LargeNFT/large-nft" class="external">GitHub</a>
        </span>

        <span class="footer-link"><a href="https://www.npmjs.com/package/large-nft/v/${version}" class="external">${version}</a></span>
      
      `}


      
    </div>
  </div>


`
    }
    ;
}
framework7Component.id = '5c3deb3292';
framework7Component.style = `


`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/admin/html/css/app.css":
/*!************************************!*\
  !*** ./src/admin/html/css/app.css ***!
  \************************************/
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/admin/html/css/quill.snow.css":
/*!*******************************************!*\
  !*** ./src/admin/html/css/quill.snow.css ***!
  \*******************************************/
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/admin/controller/author-controller.ts":
/*!***************************************************!*\
  !*** ./src/admin/controller/author-controller.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorController: () => (/* binding */ AuthorController)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/model-view.js */ "./src/admin/util/model-view.ts");
/* harmony import */ var _util_route_map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/route-map.js */ "./src/admin/util/route-map.ts");
/* harmony import */ var _service_web_author_web_service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../service/web/author-web-service.js */ "./src/admin/service/web/author-web-service.ts");
/* harmony import */ var _components_admin_author_show_f7_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/admin/author/show.f7.html */ "./src/admin/components/admin/author/show.f7.html");
/* harmony import */ var _components_admin_author_edit_f7_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/admin/author/edit.f7.html */ "./src/admin/components/admin/author/edit.f7.html");
/* harmony import */ var _dto_author_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dto/author.js */ "./src/admin/dto/author.ts");
/* harmony import */ var _service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../service/core/schema-service.js */ "./src/admin/service/core/schema-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let AuthorController = class AuthorController {
    authorWebService;
    schemaService;
    constructor(authorWebService, schemaService) {
        this.authorWebService = authorWebService;
        this.schemaService = schemaService;
    }
    async show() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.channelId);
            let authorViewModel;
            try {
                authorViewModel = await this.authorWebService.get(routeTo.params.id);
            }
            catch (ex) {
                console.log(ex);
            } //might be missing
            //If it doesn't exist create an empty one
            if (!authorViewModel) {
                authorViewModel = Object.assign(new _dto_author_js__WEBPACK_IMPORTED_MODULE_1__.Author(), {
                    author: {
                        walletAddress: routeTo.params.id
                    }
                });
            }
            return {
                authorViewModel: authorViewModel
            };
        }, _components_admin_author_show_f7_html__WEBPACK_IMPORTED_MODULE_2__["default"]);
    }
    async edit() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.channelId);
            let authorViewModel;
            try {
                authorViewModel = await this.authorWebService.get(routeTo.params.id);
            }
            catch (ex) { }
            //If it doesn't exist create an empty one
            if (!authorViewModel) {
                authorViewModel = Object.assign(new _dto_author_js__WEBPACK_IMPORTED_MODULE_1__.Author(), {
                    author: {
                        walletAddress: routeTo.params.id
                    }
                });
            }
            return {
                authorViewModel: authorViewModel
            };
        }, _components_admin_author_edit_f7_html__WEBPACK_IMPORTED_MODULE_3__["default"]);
    }
};
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_4__.routeMap)("/admin/:channelId/author/show/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "show", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_4__.routeMap)("/admin/:channelId/author/edit/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorController.prototype, "edit", null);
AuthorController = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_5__.injectable)(),
    __metadata("design:paramtypes", [_service_web_author_web_service_js__WEBPACK_IMPORTED_MODULE_6__.AuthorWebService,
        _service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_7__.SchemaService])
], AuthorController);



/***/ }),

/***/ "./src/admin/controller/channel-controller.ts":
/*!****************************************************!*\
  !*** ./src/admin/controller/channel-controller.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChannelController: () => (/* binding */ ChannelController)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/model-view.js */ "./src/admin/util/model-view.ts");
/* harmony import */ var _util_route_map_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../util/route-map.js */ "./src/admin/util/route-map.ts");
/* harmony import */ var _components_admin_channel_index_f7_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/admin/channel/index.f7.html */ "./src/admin/components/admin/channel/index.f7.html");
/* harmony import */ var _components_admin_channel_create_f7_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/admin/channel/create.f7.html */ "./src/admin/components/admin/channel/create.f7.html");
/* harmony import */ var _components_admin_channel_show_f7_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/admin/channel/show.f7.html */ "./src/admin/components/admin/channel/show.f7.html");
/* harmony import */ var _components_admin_channel_themes_f7_html__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/admin/channel/themes.f7.html */ "./src/admin/components/admin/channel/themes.f7.html");
/* harmony import */ var _components_admin_channel_static_pages_f7_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/admin/channel/static-pages.f7.html */ "./src/admin/components/admin/channel/static-pages.f7.html");
/* harmony import */ var _components_admin_channel_edit_f7_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/admin/channel/edit.f7.html */ "./src/admin/components/admin/channel/edit.f7.html");
/* harmony import */ var _components_admin_channel_create_menu_f7_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/admin/channel/create-menu.f7.html */ "./src/admin/components/admin/channel/create-menu.f7.html");
/* harmony import */ var _components_admin_channel_fork_f7_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/admin/channel/fork.f7.html */ "./src/admin/components/admin/channel/fork.f7.html");
/* harmony import */ var _components_admin_channel_fork_contract_f7_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/admin/channel/fork-contract.f7.html */ "./src/admin/components/admin/channel/fork-contract.f7.html");
/* harmony import */ var _components_admin_channel_fork_reader_f7_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/admin/channel/fork-reader.f7.html */ "./src/admin/components/admin/channel/fork-reader.f7.html");
/* harmony import */ var _components_admin_channel_upgrade_f7_html__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/admin/channel/upgrade.f7.html */ "./src/admin/components/admin/channel/upgrade.f7.html");
/* harmony import */ var _service_web_channel_web_service_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../service/web/channel-web-service.js */ "./src/admin/service/web/channel-web-service.ts");
/* harmony import */ var _service_web_item_web_service_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../service/web/item-web-service.js */ "./src/admin/service/web/item-web-service.ts");
/* harmony import */ var _repository_item_repository_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../repository/item-repository.js */ "./src/admin/repository/item-repository.ts");
/* harmony import */ var _service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../service/core/schema-service.js */ "./src/admin/service/core/schema-service.ts");
/* harmony import */ var _service_theme_service_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../service/theme-service.js */ "./src/admin/service/theme-service.ts");
/* harmony import */ var _service_static_page_service_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../service/static-page-service.js */ "./src/admin/service/static-page-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




















let ChannelController = class ChannelController {
    channelWebService;
    itemWebService;
    schemaService;
    themeService;
    staticPageService;
    footerText;
    constructor(channelWebService, itemWebService, schemaService, themeService, staticPageService, footerText) {
        this.channelWebService = channelWebService;
        this.itemWebService = itemWebService;
        this.schemaService = schemaService;
        this.themeService = themeService;
        this.staticPageService = staticPageService;
        this.footerText = footerText;
    }
    async app() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            return {
                footerText: this.footerText
            };
        }, _components_admin_channel_index_f7_html__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
    async create() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
        }, _components_admin_channel_create_f7_html__WEBPACK_IMPORTED_MODULE_2__["default"]);
    }
    async createMenu() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
        }, _components_admin_channel_create_menu_f7_html__WEBPACK_IMPORTED_MODULE_3__["default"]);
    }
    async fork() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            return {
                cid: routeTo.query.cid
            };
        }, _components_admin_channel_fork_f7_html__WEBPACK_IMPORTED_MODULE_4__["default"]);
    }
    async forkContract() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            return {
                footerText: this.footerText,
                contractAddress: routeTo.query.contractAddress
            };
        }, _components_admin_channel_fork_contract_f7_html__WEBPACK_IMPORTED_MODULE_5__["default"]);
    }
    async forkReader() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            return {
                footerText: this.footerText
            };
        }, _components_admin_channel_fork_reader_f7_html__WEBPACK_IMPORTED_MODULE_6__["default"]);
    }
    async show() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id);
            let channelViewModel = await this.channelWebService.get(routeTo.params.id);
            let firstPageItems = await this.itemWebService.listByChannel(channelViewModel.channel._id, _repository_item_repository_js__WEBPACK_IMPORTED_MODULE_7__.ItemRepository.CHUNK_SIZE, 0);
            return {
                channelViewModel: channelViewModel,
                firstPageItems: firstPageItems
            };
        }, _components_admin_channel_show_f7_html__WEBPACK_IMPORTED_MODULE_8__["default"]);
    }
    async themes() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id);
            let channelViewModel = await this.channelWebService.get(routeTo.params.id);
            let themes = await this.themeService.listByChannel(channelViewModel.channel._id, 1000, 0);
            return {
                channelViewModel: channelViewModel,
                themes: themes
            };
        }, _components_admin_channel_themes_f7_html__WEBPACK_IMPORTED_MODULE_9__["default"]);
    }
    async staticPages() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id);
            let channelViewModel = await this.channelWebService.get(routeTo.params.id);
            let staticPages = await this.staticPageService.listByChannel(channelViewModel.channel._id, 1000, 0);
            return {
                channelViewModel: channelViewModel,
                staticPages: staticPages
            };
        }, _components_admin_channel_static_pages_f7_html__WEBPACK_IMPORTED_MODULE_10__["default"]);
    }
    async edit() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id);
            let channelViewModel = await this.channelWebService.get(routeTo.params.id);
            return {
                channelViewModel: channelViewModel
            };
        }, _components_admin_channel_edit_f7_html__WEBPACK_IMPORTED_MODULE_11__["default"]);
    }
    async upgrade() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id);
            let channelViewModel = await this.channelWebService.get(routeTo.params.id);
            return {
                channelViewModel: channelViewModel
            };
        }, _components_admin_channel_upgrade_f7_html__WEBPACK_IMPORTED_MODULE_12__["default"]);
    }
};
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_13__.routeMap)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "app", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_13__.routeMap)("/admin/channel/create"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "create", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_13__.routeMap)("/admin/channel/create-menu"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "createMenu", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_13__.routeMap)("/admin/channel/fork"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "fork", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_13__.routeMap)("/admin/channel/fork-contract"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "forkContract", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_13__.routeMap)("/admin/channel/fork-reader"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "forkReader", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_13__.routeMap)("/admin/channel/show/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "show", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_13__.routeMap)("/admin/channel/themes/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "themes", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_13__.routeMap)("/admin/channel/static-pages/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "staticPages", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_13__.routeMap)("/admin/channel/edit/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "edit", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_13__.routeMap)("/admin/channel/upgrade/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "upgrade", null);
ChannelController = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_14__.injectable)(),
    __param(5, (0,inversify__WEBPACK_IMPORTED_MODULE_15__.inject)('footer-text')),
    __metadata("design:paramtypes", [_service_web_channel_web_service_js__WEBPACK_IMPORTED_MODULE_16__.ChannelWebService,
        _service_web_item_web_service_js__WEBPACK_IMPORTED_MODULE_17__.ItemWebService,
        _service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_18__.SchemaService,
        _service_theme_service_js__WEBPACK_IMPORTED_MODULE_19__.ThemeService,
        _service_static_page_service_js__WEBPACK_IMPORTED_MODULE_20__.StaticPageService, String])
], ChannelController);



/***/ }),

/***/ "./src/admin/controller/connect-controller.ts":
/*!****************************************************!*\
  !*** ./src/admin/controller/connect-controller.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConnectController: () => (/* binding */ ConnectController)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/model-view.js */ "./src/admin/util/model-view.ts");
/* harmony import */ var _util_route_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/route-map.js */ "./src/admin/util/route-map.ts");
/* harmony import */ var _components_admin_connect_index_f7_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/admin/connect/index.f7.html */ "./src/admin/components/admin/connect/index.f7.html");
/* harmony import */ var _service_core_ipfs_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/core/ipfs-service.js */ "./src/admin/service/core/ipfs-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let ConnectController = class ConnectController {
    ipfsService;
    constructor(ipfsService) {
        this.ipfsService = ipfsService;
    }
    async show() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            if (!this.ipfsService.ipfs)
                return {};
            let peers = await this.ipfsService.ipfs.swarm.peers();
            let id = await this.ipfsService.ipfs.id();
            return {
                peers: peers.map(e => e.addr.toString()),
                peerCount: peers.length,
                addresses: id?.addresses?.map(a => a.toString())
            };
        }, _components_admin_connect_index_f7_html__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
};
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_2__.routeMap)("/admin/connect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConnectController.prototype, "show", null);
ConnectController = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [_service_core_ipfs_service_js__WEBPACK_IMPORTED_MODULE_4__.IpfsService])
], ConnectController);



/***/ }),

/***/ "./src/admin/controller/item-controller.ts":
/*!*************************************************!*\
  !*** ./src/admin/controller/item-controller.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemController: () => (/* binding */ ItemController)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/model-view.js */ "./src/admin/util/model-view.ts");
/* harmony import */ var _util_route_map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/route-map.js */ "./src/admin/util/route-map.ts");
/* harmony import */ var _components_admin_item_create_f7_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/admin/item/create.f7.html */ "./src/admin/components/admin/item/create.f7.html");
/* harmony import */ var _components_admin_item_show_f7_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/admin/item/show.f7.html */ "./src/admin/components/admin/item/show.f7.html");
/* harmony import */ var _components_admin_item_edit_f7_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/admin/item/edit.f7.html */ "./src/admin/components/admin/item/edit.f7.html");
/* harmony import */ var _service_web_item_web_service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../service/web/item-web-service.js */ "./src/admin/service/web/item-web-service.ts");
/* harmony import */ var _service_theme_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../service/theme-service.js */ "./src/admin/service/theme-service.ts");
/* harmony import */ var _service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../service/core/schema-service.js */ "./src/admin/service/core/schema-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









let ItemController = class ItemController {
    itemWebService;
    themeService;
    schemaService;
    constructor(itemWebService, themeService, schemaService) {
        this.itemWebService = itemWebService;
        this.themeService = themeService;
        this.schemaService = schemaService;
    }
    async create() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.channelId);
            let itemViewModel = await this.itemWebService.getNewViewModel(routeTo.params.channelId);
            return {
                itemViewModel: itemViewModel,
                themes: await this.themeService.listByChannel(itemViewModel.channel._id, 1000, 0)
            };
        }, _components_admin_item_create_f7_html__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
    async show() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.channelId);
            let itemViewModel = await this.itemWebService.getNavigation(routeTo.params.channelId, parseInt(routeTo.params.tokenId));
            return {
                itemViewModel: itemViewModel
            };
        }, _components_admin_item_show_f7_html__WEBPACK_IMPORTED_MODULE_2__["default"]);
    }
    async edit() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.channelId);
            let itemViewModel = await this.itemWebService.get(routeTo.params.id);
            return {
                itemViewModel: itemViewModel,
                themes: await this.themeService.listByChannel(itemViewModel.channel._id, 1000, 0)
            };
        }, _components_admin_item_edit_f7_html__WEBPACK_IMPORTED_MODULE_3__["default"]);
    }
};
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_4__.routeMap)("/admin/item/create/:channelId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "create", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_4__.routeMap)("/admin/channel/show/:channelId/:tokenId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "show", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_4__.routeMap)("/admin/channel/:channelId/item/edit/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemController.prototype, "edit", null);
ItemController = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_5__.injectable)(),
    __metadata("design:paramtypes", [_service_web_item_web_service_js__WEBPACK_IMPORTED_MODULE_6__.ItemWebService,
        _service_theme_service_js__WEBPACK_IMPORTED_MODULE_7__.ThemeService,
        _service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_8__.SchemaService])
], ItemController);



/***/ }),

/***/ "./src/admin/controller/publish-controller.ts":
/*!****************************************************!*\
  !*** ./src/admin/controller/publish-controller.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PublishController: () => (/* binding */ PublishController)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/model-view.js */ "./src/admin/util/model-view.ts");
/* harmony import */ var _util_route_map_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/route-map.js */ "./src/admin/util/route-map.ts");
/* harmony import */ var _components_admin_publish_index_f7_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/admin/publish/index.f7.html */ "./src/admin/components/admin/publish/index.f7.html");
/* harmony import */ var _components_admin_publish_export_f7_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/admin/publish/export.f7.html */ "./src/admin/components/admin/publish/export.f7.html");
/* harmony import */ var _components_admin_publish_fork_reader_f7_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/admin/publish/fork-reader.f7.html */ "./src/admin/components/admin/publish/fork-reader.f7.html");
/* harmony import */ var _components_admin_publish_publish_reader_f7_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/admin/publish/publish-reader.f7.html */ "./src/admin/components/admin/publish/publish-reader.f7.html");
/* harmony import */ var _components_admin_publish_contract_f7_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/admin/publish/contract.f7.html */ "./src/admin/components/admin/publish/contract.f7.html");
/* harmony import */ var _service_web_channel_web_service_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../service/web/channel-web-service.js */ "./src/admin/service/web/channel-web-service.ts");
/* harmony import */ var _service_core_settings_service_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../service/core/settings-service.js */ "./src/admin/service/core/settings-service.ts");
/* harmony import */ var _service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../service/core/schema-service.js */ "./src/admin/service/core/schema-service.ts");
/* harmony import */ var _service_core_gitlab_service_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../service/core/gitlab-service.js */ "./src/admin/service/core/gitlab-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












let PublishController = class PublishController {
    channelWebService;
    settingsService;
    schemaService;
    gitlabService;
    constructor(channelWebService, settingsService, schemaService, gitlabService) {
        this.channelWebService = channelWebService;
        this.settingsService = settingsService;
        this.schemaService = schemaService;
        this.gitlabService = gitlabService;
    }
    async publish() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id);
            let channelViewModel = await this.channelWebService.get(routeTo.params.id);
            return {
                channelViewModel: channelViewModel,
            };
        }, _components_admin_publish_index_f7_html__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
    async export() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id);
            let channelViewModel = await this.channelWebService.get(routeTo.params.id);
            let settings;
            try {
                settings = await this.settingsService.get();
            }
            catch (ex) { }
            return {
                channelViewModel: channelViewModel,
                settings: settings
            };
        }, _components_admin_publish_export_f7_html__WEBPACK_IMPORTED_MODULE_2__["default"]);
    }
    // @routeMap("/admin/publish/pinata/:id")
    // async pinata() : Promise<ModelView> {
    //     return new ModelView(async (routeTo:RouteTo) => {
    //         let channelViewModel = await this.channelWebService.get(routeTo.params.id)
    //         return {
    //             channelViewModel: channelViewModel,
    //             pinningApis: await this.pinningService.list(1000,0),
    //             peerCount: this.ipfsService.peerCount,
    //             ipfsReady: this.ipfsService.ipfs != undefined 
    //         }
    //     }, AdminPublishPinataComponent)
    // }
    // @routeMap("/admin/publish/ipfs/:id")
    // async ipfs() : Promise<ModelView> {
    //     return new ModelView(async (routeTo:RouteTo) => {
    //         let channelViewModel = await this.channelWebService.get(routeTo.params.id)
    //         let ipfsHost
    //         try {
    //             ipfsHost = await this.ipfsHostService.get()
    //         } catch(ex) {}
    //         return {
    //             channelViewModel: channelViewModel,
    //             ipfsHost: ipfsHost
    //         }
    //     }, AdminPublishIpfsHostComponent)
    // }
    async forkReader() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id);
            let channelViewModel = await this.channelWebService.get(routeTo.params.id);
            let settings;
            try {
                settings = await this.settingsService.get();
            }
            catch (ex) { }
            return {
                channelViewModel: channelViewModel,
                settings: settings
            };
        }, _components_admin_publish_fork_reader_f7_html__WEBPACK_IMPORTED_MODULE_3__["default"]);
    }
    async publishReader() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id);
            let channelViewModel = await this.channelWebService.get(routeTo.params.id);
            let settings;
            try {
                settings = await this.settingsService.get();
            }
            catch (ex) { }
            return {
                channelViewModel: channelViewModel,
                settings: settings
            };
        }, _components_admin_publish_publish_reader_f7_html__WEBPACK_IMPORTED_MODULE_4__["default"]);
    }
    async contract() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
            //Load the right channel dbs
            await this.schemaService.loadChannel(routeTo.params.id);
            let channelViewModel = await this.channelWebService.get(routeTo.params.id);
            return {
                channelViewModel: channelViewModel
            };
        }, _components_admin_publish_contract_f7_html__WEBPACK_IMPORTED_MODULE_5__["default"]);
    }
};
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_6__.routeMap)("/admin/publish/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublishController.prototype, "publish", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_6__.routeMap)("/admin/publish/export/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublishController.prototype, "export", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_6__.routeMap)("/admin/publish/fork-reader/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublishController.prototype, "forkReader", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_6__.routeMap)("/admin/publish/publish-reader/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublishController.prototype, "publishReader", null);
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_6__.routeMap)("/admin/publish/contract/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublishController.prototype, "contract", null);
PublishController = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_7__.injectable)(),
    __metadata("design:paramtypes", [_service_web_channel_web_service_js__WEBPACK_IMPORTED_MODULE_8__.ChannelWebService,
        _service_core_settings_service_js__WEBPACK_IMPORTED_MODULE_9__.SettingsService,
        _service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_10__.SchemaService,
        _service_core_gitlab_service_js__WEBPACK_IMPORTED_MODULE_11__.GitlabService])
], PublishController);



/***/ }),

/***/ "./src/admin/controller/settings-controller.ts":
/*!*****************************************************!*\
  !*** ./src/admin/controller/settings-controller.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsController: () => (/* binding */ SettingsController)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/model-view.js */ "./src/admin/util/model-view.ts");
/* harmony import */ var _util_route_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/route-map.js */ "./src/admin/util/route-map.ts");
/* harmony import */ var _components_admin_settings_index_f7_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/admin/settings/index.f7.html */ "./src/admin/components/admin/settings/index.f7.html");
/* harmony import */ var _service_core_settings_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/core/settings-service.js */ "./src/admin/service/core/settings-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let SettingsController = class SettingsController {
    settingsService;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async show() {
        return new _util_model_view_js__WEBPACK_IMPORTED_MODULE_0__.ModelView(async (routeTo) => {
        }, _components_admin_settings_index_f7_html__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
};
__decorate([
    (0,_util_route_map_js__WEBPACK_IMPORTED_MODULE_2__.routeMap)("/admin/settings"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "show", null);
SettingsController = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [_service_core_settings_service_js__WEBPACK_IMPORTED_MODULE_4__.SettingsService])
], SettingsController);



/***/ }),

/***/ "./src/admin/dto/animation.ts":
/*!************************************!*\
  !*** ./src/admin/dto/animation.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Animation: () => (/* binding */ Animation)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class Animation {
    _id;
    _rev;
    content;
    cid;
    dateCreated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Animation.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Animation.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Animation.prototype, "content", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsNotEmpty)(),
    __metadata("design:type", String)
], Animation.prototype, "cid", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Animation.prototype, "dateCreated", void 0);



/***/ }),

/***/ "./src/admin/dto/attribute.ts":
/*!************************************!*\
  !*** ./src/admin/dto/attribute.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttributeCount: () => (/* binding */ AttributeCount)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class AttributeCount {
    _id;
    _rev;
    channelId;
    traitType;
    value;
    count;
    lastUpdated;
    dateCreated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], AttributeCount.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], AttributeCount.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], AttributeCount.prototype, "channelId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], AttributeCount.prototype, "traitType", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], AttributeCount.prototype, "value", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Number)
], AttributeCount.prototype, "count", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], AttributeCount.prototype, "lastUpdated", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], AttributeCount.prototype, "dateCreated", void 0);



/***/ }),

/***/ "./src/admin/dto/author.ts":
/*!*********************************!*\
  !*** ./src/admin/dto/author.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Author: () => (/* binding */ Author)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class Author {
    _id;
    _rev;
    walletAddress;
    name;
    description;
    url;
    coverPhotoId;
    dateCreated;
    lastUpdated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Author.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Author.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsNotEmpty)(),
    __metadata("design:type", String)
], Author.prototype, "walletAddress", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Author.prototype, "name", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Author.prototype, "description", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Author.prototype, "url", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Author.prototype, "coverPhotoId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Author.prototype, "dateCreated", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Author.prototype, "lastUpdated", void 0);



/***/ }),

/***/ "./src/admin/dto/channel.ts":
/*!**********************************!*\
  !*** ./src/admin/dto/channel.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Channel: () => (/* binding */ Channel)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/string/MinLength.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class Channel {
    _id;
    _rev;
    forkedFromCid;
    forkedFromId;
    forkedFromFeeRecipient;
    forkType;
    disableForks;
    authorId;
    title;
    symbol;
    link;
    description;
    descriptionHTML;
    descriptionMarkdown;
    license;
    licenseHTML;
    licenseMarkdown;
    category;
    language;
    coverImageId;
    coverBannerId;
    mintPrice;
    attributeOptions;
    // @Allow()
    // sellerFeeBasisPoints?:number
    // @Allow()
    // royaltyPercent?:string
    contractAddress;
    pinJobId;
    pinJobStatus;
    gitProvider;
    httpUrlToRepo;
    publishReaderRepoId;
    publishReaderRepoPath;
    publishReaderRepoBranch;
    publishReaderRepoStatus;
    publishReaderIPFSStatus;
    pubDate;
    /** Production config */
    productionHostname;
    productionBaseURI;
    productionBaseLibraryURI;
    showMintPage;
    showActivityPage;
    marketplaces;
    externalLinks;
    /** End production config */
    importSuccess;
    dateCreated;
    lastUpdated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "forkedFromCid", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "forkedFromId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "forkedFromFeeRecipient", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "forkType", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Boolean)
], Channel.prototype, "disableForks", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "authorId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.MinLength)(3, { message: "Title must be more than 3 characters." }),
    __metadata("design:type", String)
], Channel.prototype, "title", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.IsNotEmpty)(),
    __metadata("design:type", String)
], Channel.prototype, "symbol", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "link", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Object)
], Channel.prototype, "description", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "descriptionHTML", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "descriptionMarkdown", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Object)
], Channel.prototype, "license", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "licenseHTML", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "licenseMarkdown", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Array)
], Channel.prototype, "category", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "language", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "coverImageId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "coverBannerId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "mintPrice", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Array)
], Channel.prototype, "attributeOptions", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "contractAddress", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "pinJobId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "pinJobStatus", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "gitProvider", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "httpUrlToRepo", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "publishReaderRepoId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "publishReaderRepoPath", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "publishReaderRepoBranch", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "publishReaderRepoStatus", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Object)
], Channel.prototype, "publishReaderIPFSStatus", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "pubDate", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "productionHostname", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "productionBaseURI", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "productionBaseLibraryURI", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Boolean)
], Channel.prototype, "showMintPage", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Boolean)
], Channel.prototype, "showActivityPage", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Object)
], Channel.prototype, "marketplaces", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Object)
], Channel.prototype, "externalLinks", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Boolean)
], Channel.prototype, "importSuccess", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "dateCreated", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Channel.prototype, "lastUpdated", void 0);



/***/ }),

/***/ "./src/admin/dto/image.ts":
/*!********************************!*\
  !*** ./src/admin/dto/image.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Image: () => (/* binding */ Image)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class Image {
    _id;
    _rev;
    buffer;
    svg;
    title;
    cid;
    generated;
    dateCreated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Image.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Image.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Object)
], Image.prototype, "buffer", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Image.prototype, "svg", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Image.prototype, "title", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsNotEmpty)(),
    __metadata("design:type", String)
], Image.prototype, "cid", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Boolean)
], Image.prototype, "generated", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Image.prototype, "dateCreated", void 0);



/***/ }),

/***/ "./src/admin/dto/item.ts":
/*!*******************************!*\
  !*** ./src/admin/dto/item.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Item: () => (/* binding */ Item)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class Item {
    _id;
    _rev;
    forkedFromId;
    channelId;
    tokenId;
    title;
    link;
    description;
    content;
    contentHTML;
    excerpt;
    authorId;
    category;
    attributeSelections;
    coverImageId;
    coverImageGenerated;
    animationId;
    themes;
    coverImageCSS;
    animationCSS;
    coverImageAsAnimation;
    originalJSONMetadataId;
    imageIds;
    datePublished;
    dateCreated;
    lastUpdated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "forkedFromId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsNotEmpty)(),
    __metadata("design:type", String)
], Item.prototype, "channelId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsNotEmpty)(),
    __metadata("design:type", Number)
], Item.prototype, "tokenId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "title", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "link", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Object)
], Item.prototype, "content", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "contentHTML", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "excerpt", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "authorId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Array)
], Item.prototype, "category", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Array)
], Item.prototype, "attributeSelections", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "coverImageId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Boolean)
], Item.prototype, "coverImageGenerated", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "animationId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Array)
], Item.prototype, "themes", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "coverImageCSS", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "animationCSS", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Boolean)
], Item.prototype, "coverImageAsAnimation", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "originalJSONMetadataId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Array)
], Item.prototype, "imageIds", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "datePublished", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "dateCreated", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Item.prototype, "lastUpdated", void 0);



/***/ }),

/***/ "./src/admin/dto/original-metadata.ts":
/*!********************************************!*\
  !*** ./src/admin/dto/original-metadata.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OriginalMetadata: () => (/* binding */ OriginalMetadata)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class OriginalMetadata {
    _id;
    _rev;
    content;
    cid;
    dateCreated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], OriginalMetadata.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], OriginalMetadata.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], OriginalMetadata.prototype, "content", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsNotEmpty)(),
    __metadata("design:type", String)
], OriginalMetadata.prototype, "cid", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], OriginalMetadata.prototype, "dateCreated", void 0);



/***/ }),

/***/ "./src/admin/dto/query-cache.ts":
/*!**************************************!*\
  !*** ./src/admin/dto/query-cache.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryCache: () => (/* binding */ QueryCache)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class QueryCache {
    _id;
    _rev;
    result;
    stale;
    lastUpdated;
    dateCreated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], QueryCache.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], QueryCache.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Object)
], QueryCache.prototype, "result", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Boolean)
], QueryCache.prototype, "stale", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], QueryCache.prototype, "lastUpdated", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], QueryCache.prototype, "dateCreated", void 0);



/***/ }),

/***/ "./src/admin/dto/settings.ts":
/*!***********************************!*\
  !*** ./src/admin/dto/settings.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Settings: () => (/* binding */ Settings)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/typechecker/IsBoolean.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class Settings {
    _id;
    _rev;
    ipfsHost;
    defaultGitProvider;
    gitProviders;
    gitCorsProxy;
    username;
    personalAccessToken;
    alchemyKey;
    huggingFace;
    welcomeHide;
    dateCreated;
    lastUpdated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Settings.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Settings.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Settings.prototype, "ipfsHost", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Settings.prototype, "defaultGitProvider", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Object)
], Settings.prototype, "gitProviders", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Settings.prototype, "gitCorsProxy", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Settings.prototype, "username", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Settings.prototype, "personalAccessToken", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Settings.prototype, "alchemyKey", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Settings.prototype, "huggingFace", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsBoolean)(),
    __metadata("design:type", Boolean)
], Settings.prototype, "welcomeHide", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Settings.prototype, "dateCreated", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Settings.prototype, "lastUpdated", void 0);



/***/ }),

/***/ "./src/admin/dto/static-page.ts":
/*!**************************************!*\
  !*** ./src/admin/dto/static-page.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StaticPage: () => (/* binding */ StaticPage)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class StaticPage {
    _id;
    _rev;
    forkedFromId;
    channelId;
    name;
    slug;
    content;
    contentHTML;
    contentMarkdown;
    locations;
    dateCreated;
    lastUpdated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], StaticPage.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], StaticPage.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], StaticPage.prototype, "forkedFromId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsNotEmpty)(),
    __metadata("design:type", String)
], StaticPage.prototype, "channelId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsNotEmpty)(),
    __metadata("design:type", String)
], StaticPage.prototype, "name", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsNotEmpty)(),
    __metadata("design:type", String)
], StaticPage.prototype, "slug", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Object)
], StaticPage.prototype, "content", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], StaticPage.prototype, "contentHTML", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], StaticPage.prototype, "contentMarkdown", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Array)
], StaticPage.prototype, "locations", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], StaticPage.prototype, "dateCreated", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], StaticPage.prototype, "lastUpdated", void 0);



/***/ }),

/***/ "./src/admin/dto/theme.ts":
/*!********************************!*\
  !*** ./src/admin/dto/theme.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Theme: () => (/* binding */ Theme)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/IsNotEmpty.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class Theme {
    _id;
    _rev;
    forkedFromId;
    channelId;
    name;
    coverImageCSS;
    animationCSS;
    dateCreated;
    lastUpdated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Theme.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Theme.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Theme.prototype, "forkedFromId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsNotEmpty)(),
    __metadata("design:type", String)
], Theme.prototype, "channelId", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.IsNotEmpty)(),
    __metadata("design:type", String)
], Theme.prototype, "name", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Theme.prototype, "coverImageCSS", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Theme.prototype, "animationCSS", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Theme.prototype, "dateCreated", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], Theme.prototype, "lastUpdated", void 0);



/***/ }),

/***/ "./src/admin/dto/token-metadata-cache.ts":
/*!***********************************************!*\
  !*** ./src/admin/dto/token-metadata-cache.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenMetadataCache: () => (/* binding */ TokenMetadataCache)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/decorator/common/Allow.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class TokenMetadataCache {
    _id;
    _rev;
    tokenMetadata;
    dateCreated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], TokenMetadataCache.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], TokenMetadataCache.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Object)
], TokenMetadataCache.prototype, "tokenMetadata", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], TokenMetadataCache.prototype, "dateCreated", void 0);



/***/ }),

/***/ "./src/admin/index.ts":
/*!****************************!*\
  !*** ./src/admin/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _inversify_config_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./inversify.config.js */ "./src/admin/inversify.config.ts");
/* harmony import */ var workbox_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-window */ "./node_modules/workbox-window/build/workbox-window.prod.es5.mjs");
/* harmony import */ var framework7_css_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! framework7/css/bundle */ "./node_modules/framework7/framework7-bundle.css");
/* harmony import */ var framework7_icons_css_framework7_icons_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! framework7-icons/css/framework7-icons.css */ "./node_modules/framework7-icons/css/framework7-icons.css");
/* harmony import */ var _html_css_quill_snow_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./html/css/quill.snow.css */ "./src/admin/html/css/quill.snow.css");
/* harmony import */ var material_icons_iconfont_material_icons_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! material-icons/iconfont/material-icons.css */ "./node_modules/material-icons/iconfont/material-icons.css");
/* harmony import */ var _yaireo_tagify_dist_tagify_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @yaireo/tagify/dist/tagify.css */ "./node_modules/@yaireo/tagify/dist/tagify.css");
/* harmony import */ var _html_css_app_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./html/css/app.css */ "./src/admin/html/css/app.css");
/* harmony import */ var _service_core_routing_service_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./service/core/routing-service.js */ "./src/admin/service/core/routing-service.ts");




//Import CSS







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (version) => {
    // let pathname = globalThis.location.pathname
    // let filename = pathname.replace(/^.*[\\/]/, '')
    let rootPath = "/large";
    if ('serviceWorker' in navigator) {
        const wb = new workbox_window__WEBPACK_IMPORTED_MODULE_2__.Workbox(`${rootPath}/sw-admin-${version}.js`, {
            scope: `${rootPath}/`
        });
        startApp(version);
        wb.register();
    }
});
const startApp = (version) => {
    let container = (0,_inversify_config_js__WEBPACK_IMPORTED_MODULE_9__.getMainContainer)(version);
    let app = container.get("framework7");
    let routingService = container.get(_service_core_routing_service_js__WEBPACK_IMPORTED_MODULE_10__.RoutingService);
    //Initialize routing
    app.routes.push(...routingService.buildRoutesForContainer(container));
    app.init();
};


/***/ }),

/***/ "./src/admin/inversify.config.ts":
/*!***************************************!*\
  !*** ./src/admin/inversify.config.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   container: () => (/* binding */ container),
/* harmony export */   getMainContainer: () => (/* binding */ getMainContainer)
/* harmony export */ });
/* harmony import */ var _components_admin_app_f7_html__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/admin/app.f7.html */ "./src/admin/components/admin/app.f7.html");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/providers/provider-browser.js");
/* harmony import */ var _service_core_ui_service_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./service/core/ui-service.js */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _service_core_queue_service_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./service/core/queue-service.js */ "./src/admin/service/core/queue-service.ts");
/* harmony import */ var _service_quill_service_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./service/quill-service.js */ "./src/admin/service/quill-service.ts");
/* harmony import */ var _service_quill_editor_service_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./service/quill-editor-service.js */ "./src/admin/service/quill-editor-service.ts");
/* harmony import */ var _service_core_upload_service_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./service/core/upload-service.js */ "./src/admin/service/core/upload-service.ts");
/* harmony import */ var _service_core_wallet_service_impl_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./service/core/wallet-service-impl.js */ "./src/admin/service/core/wallet-service-impl.ts");
/* harmony import */ var _service_image_service_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./service/image-service.js */ "./src/admin/service/image-service.ts");
/* harmony import */ var _service_author_service_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./service/author-service.js */ "./src/admin/service/author-service.ts");
/* harmony import */ var _service_channel_service_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./service/channel-service.js */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _service_core_ipfs_service_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./service/core/ipfs-service.js */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/container/container.js");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
/* harmony import */ var _repository_channel_repository_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./repository/channel-repository.js */ "./src/admin/repository/channel-repository.ts");
/* harmony import */ var _repository_item_repository_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./repository/item-repository.js */ "./src/admin/repository/item-repository.ts");
/* harmony import */ var _repository_image_repository_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./repository/image-repository.js */ "./src/admin/repository/image-repository.ts");
/* harmony import */ var _repository_author_repository_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./repository/author-repository.js */ "./src/admin/repository/author-repository.ts");
/* harmony import */ var _service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./service/core/schema-service.js */ "./src/admin/service/core/schema-service.ts");
/* harmony import */ var _service_core_types_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./service/core/types.js */ "./src/admin/service/core/types.ts");
/* harmony import */ var _repository_attribute_count_repository_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./repository/attribute-count-repository.js */ "./src/admin/repository/attribute-count-repository.ts");
/* harmony import */ var _service_item_service_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./service/item-service.js */ "./src/admin/service/item-service.ts");
/* harmony import */ var _service_attribute_count_service_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./service/attribute-count-service.js */ "./src/admin/service/attribute-count-service.ts");
/* harmony import */ var _service_web_channel_web_service_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./service/web/channel-web-service.js */ "./src/admin/service/web/channel-web-service.ts");
/* harmony import */ var _service_web_item_web_service_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./service/web/item-web-service.js */ "./src/admin/service/web/item-web-service.ts");
/* harmony import */ var _service_web_author_web_service_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./service/web/author-web-service.js */ "./src/admin/service/web/author-web-service.ts");
/* harmony import */ var _service_core_gitlab_service_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./service/core/gitlab-service.js */ "./src/admin/service/core/gitlab-service.ts");
/* harmony import */ var _repository_settings_repository_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./repository/settings-repository.js */ "./src/admin/repository/settings-repository.ts");
/* harmony import */ var _service_core_routing_service_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./service/core/routing-service.js */ "./src/admin/service/core/routing-service.ts");
/* harmony import */ var _service_core_settings_service_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./service/core/settings-service.js */ "./src/admin/service/core/settings-service.ts");
/* harmony import */ var _controller_channel_controller_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./controller/channel-controller.js */ "./src/admin/controller/channel-controller.ts");
/* harmony import */ var _controller_item_controller_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./controller/item-controller.js */ "./src/admin/controller/item-controller.ts");
/* harmony import */ var _controller_author_controller_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./controller/author-controller.js */ "./src/admin/controller/author-controller.ts");
/* harmony import */ var _controller_settings_controller_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./controller/settings-controller.js */ "./src/admin/controller/settings-controller.ts");
/* harmony import */ var _controller_connect_controller_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./controller/connect-controller.js */ "./src/admin/controller/connect-controller.ts");
/* harmony import */ var _controller_publish_controller_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./controller/publish-controller.js */ "./src/admin/controller/publish-controller.ts");
/* harmony import */ var _service_core_paging_service_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./service/core/paging-service.js */ "./src/admin/service/core/paging-service.ts");
/* harmony import */ var _service_svg_service_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./service/svg-service.js */ "./src/admin/service/svg-service.ts");
/* harmony import */ var _service_animation_service_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./service/animation-service.js */ "./src/admin/service/animation-service.ts");
/* harmony import */ var _repository_animation_repository_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./repository/animation-repository.js */ "./src/admin/repository/animation-repository.ts");
/* harmony import */ var _service_core_import_service_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./service/core/import-service.js */ "./src/admin/service/core/import-service.ts");
/* harmony import */ var _service_core_erc_event_service_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./service/core/erc-event-service.js */ "./src/admin/service/core/erc-event-service.ts");
/* harmony import */ var _service_core_query_cache_service_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./service/core/query-cache-service.js */ "./src/admin/service/core/query-cache-service.ts");
/* harmony import */ var ipfs_http_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ipfs-http-client */ "./node_modules/ipfs-http-client/src/index.js");
/* harmony import */ var _service_theme_service_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./service/theme-service.js */ "./src/admin/service/theme-service.ts");
/* harmony import */ var _repository_theme_repository_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./repository/theme-repository.js */ "./src/admin/repository/theme-repository.ts");
/* harmony import */ var _repository_static_page_repository_js__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./repository/static-page-repository.js */ "./src/admin/repository/static-page-repository.ts");
/* harmony import */ var _service_static_page_service_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./service/static-page-service.js */ "./src/admin/service/static-page-service.ts");
/* harmony import */ var _service_core_export_service_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./service/core/export-service.js */ "./src/admin/service/core/export-service.ts");
/* harmony import */ var _repository_token_metadata_cache_repository_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./repository/token-metadata-cache-repository.js */ "./src/admin/repository/token-metadata-cache-repository.ts");
/* harmony import */ var _repository_query_cache_repository_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./repository/query-cache-repository.js */ "./src/admin/repository/query-cache-repository.ts");
/* harmony import */ var _components_admin_channel_channel_card_f7_html__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/admin/channel/channel-card.f7.html */ "./src/admin/components/admin/channel/channel-card.f7.html");
/* harmony import */ var framework7__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! framework7 */ "./node_modules/framework7/framework7.esm.js");
/* harmony import */ var framework7_components_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! framework7/components/dialog */ "./node_modules/framework7/components/dialog/dialog.js");
/* harmony import */ var framework7_components_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! framework7/components/toast */ "./node_modules/framework7/components/toast/toast.js");
/* harmony import */ var framework7_components_preloader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! framework7/components/preloader */ "./node_modules/framework7/components/preloader/preloader.js");
/* harmony import */ var framework7_components_virtual_list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! framework7/components/virtual-list */ "./node_modules/framework7/components/virtual-list/virtual-list.js");
/* harmony import */ var framework7_components_list_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! framework7/components/list-index */ "./node_modules/framework7/components/list-index/list-index.js");
/* harmony import */ var framework7_components_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! framework7/components/card */ "./node_modules/framework7/components/card/card.js");
/* harmony import */ var framework7_components_chip__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! framework7/components/chip */ "./node_modules/framework7/components/chip/chip.js");
/* harmony import */ var framework7_components_popup__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! framework7/components/popup */ "./node_modules/framework7/components/popup/popup.js");
/* harmony import */ var framework7_components_accordion__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! framework7/components/accordion */ "./node_modules/framework7/components/accordion/accordion.js");
/* harmony import */ var framework7_components_popover__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! framework7/components/popover */ "./node_modules/framework7/components/popover/popover.js");
/* harmony import */ var framework7_components_form__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! framework7/components/form */ "./node_modules/framework7/components/form/form.js");
/* harmony import */ var framework7_components_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! framework7/components/input */ "./node_modules/framework7/components/input/input.js");
/* harmony import */ var framework7_components_checkbox__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! framework7/components/checkbox */ "./node_modules/framework7/components/checkbox/checkbox.js");
/* harmony import */ var framework7_components_radio__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! framework7/components/radio */ "./node_modules/framework7/components/radio/radio.js");
/* harmony import */ var framework7_components_toggle__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! framework7/components/toggle */ "./node_modules/framework7/components/toggle/toggle.js");
/* harmony import */ var framework7_components_range__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! framework7/components/range */ "./node_modules/framework7/components/range/range.js");
/* harmony import */ var framework7_components_stepper__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! framework7/components/stepper */ "./node_modules/framework7/components/stepper/stepper.js");
/* harmony import */ var framework7_components_smart_select__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! framework7/components/smart-select */ "./node_modules/framework7/components/smart-select/smart-select.js");
/* harmony import */ var framework7_components_grid__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! framework7/components/grid */ "./node_modules/framework7/components/grid/grid.js");
/* harmony import */ var framework7_components_infinite_scroll__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! framework7/components/infinite-scroll */ "./node_modules/framework7/components/infinite-scroll/infinite-scroll.js");
/* harmony import */ var _service_core_git_service_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./service/core/git-service.js */ "./src/admin/service/core/git-service.ts");
/* harmony import */ var _service_core_github_service_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./service/core/github-service.js */ "./src/admin/service/core/github-service.ts");
/* harmony import */ var _service_core_hugging_face_service_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./service/core/hugging-face-service.js */ "./src/admin/service/core/hugging-face-service.ts");
/* harmony import */ var _service_core_deploy_service_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./service/core/deploy-service.js */ "./src/admin/service/core/deploy-service.ts");
/* harmony import */ var pouchdb_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pouchdb-browser */ "./node_modules/pouchdb-browser/lib/index.es.js");
/* harmony import */ var pouchdb_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pouchdb-find */ "./node_modules/pouchdb-find/lib/index-browser.es.js");
/* harmony import */ var _service_original_metadata_service_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./service/original-metadata-service.js */ "./src/admin/service/original-metadata-service.ts");
/* harmony import */ var _repository_original_metadata_repository_js__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./repository/original-metadata-repository.js */ "./src/admin/repository/original-metadata-repository.ts");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dayjs_plugin_relativeTime_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dayjs/plugin/relativeTime.js */ "./node_modules/dayjs/plugin/relativeTime.js");
/* harmony import */ var dayjs_plugin_relativeTime_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_relativeTime_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var dayjs_plugin_localizedFormat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dayjs/plugin/localizedFormat.js */ "./node_modules/dayjs/plugin/localizedFormat.js");
/* harmony import */ var dayjs_plugin_localizedFormat_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_localizedFormat_js__WEBPACK_IMPORTED_MODULE_5__);











































// import * as IPFS from 'ipfs-core'









//Init framework7

// Import additional components




















// import Swiper from 'framework7/components/swiper'










dayjs__WEBPACK_IMPORTED_MODULE_3___default().extend((dayjs_plugin_relativeTime_js__WEBPACK_IMPORTED_MODULE_4___default()));

dayjs__WEBPACK_IMPORTED_MODULE_3___default().extend((dayjs_plugin_localizedFormat_js__WEBPACK_IMPORTED_MODULE_5___default()));
//Enable find plugin
pouchdb_browser__WEBPACK_IMPORTED_MODULE_1__["default"].plugin(pouchdb_find__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Install F7 Components using .use() method on Framework7 class:
framework7__WEBPACK_IMPORTED_MODULE_6__["default"].use([framework7_components_dialog__WEBPACK_IMPORTED_MODULE_7__["default"], framework7_components_toast__WEBPACK_IMPORTED_MODULE_8__["default"], framework7_components_preloader__WEBPACK_IMPORTED_MODULE_9__["default"], framework7_components_virtual_list__WEBPACK_IMPORTED_MODULE_10__["default"], framework7_components_list_index__WEBPACK_IMPORTED_MODULE_11__["default"], framework7_components_card__WEBPACK_IMPORTED_MODULE_12__["default"], framework7_components_chip__WEBPACK_IMPORTED_MODULE_13__["default"],
    framework7_components_form__WEBPACK_IMPORTED_MODULE_14__["default"], framework7_components_input__WEBPACK_IMPORTED_MODULE_15__["default"], framework7_components_checkbox__WEBPACK_IMPORTED_MODULE_16__["default"], framework7_components_radio__WEBPACK_IMPORTED_MODULE_17__["default"], framework7_components_toggle__WEBPACK_IMPORTED_MODULE_18__["default"], framework7_components_range__WEBPACK_IMPORTED_MODULE_19__["default"], framework7_components_stepper__WEBPACK_IMPORTED_MODULE_20__["default"], framework7_components_smart_select__WEBPACK_IMPORTED_MODULE_21__["default"], framework7_components_grid__WEBPACK_IMPORTED_MODULE_22__["default"], framework7_components_infinite_scroll__WEBPACK_IMPORTED_MODULE_23__["default"], framework7_components_popup__WEBPACK_IMPORTED_MODULE_24__["default"], framework7_components_accordion__WEBPACK_IMPORTED_MODULE_25__["default"],
    framework7_components_popover__WEBPACK_IMPORTED_MODULE_26__["default"]
]);
framework7__WEBPACK_IMPORTED_MODULE_6__["default"].registerComponent("channel-card", _components_admin_channel_channel_card_f7_html__WEBPACK_IMPORTED_MODULE_27__["default"]);
let container;
function getMainContainer(version) {
    if (container)
        return container;
    container = new inversify__WEBPACK_IMPORTED_MODULE_28__.Container();
    function framework7() {
        let app = new framework7__WEBPACK_IMPORTED_MODULE_6__["default"]({
            el: '#app',
            id: 'large-nft',
            name: 'Large NFT',
            theme: 'auto',
            init: false,
            //@ts-ignore
            component: _components_admin_app_f7_html__WEBPACK_IMPORTED_MODULE_29__["default"],
            navbar: {
                hideOnPageScroll: true
            },
            darkMode: 'auto'
        });
        return app;
    }
    function contracts() {
        const c = __webpack_require__(/*! ../../contracts.json */ "./contracts.json");
        return c;
    }
    container.bind("version").toConstantValue(version);
    container.bind("provider").toConstantValue(() => {
        if (typeof window !== "undefined" && window['ethereum']) {
            //@ts-ignore
            window.web3Provider = window.ethereum;
            //@ts-ignore
            return new ethers__WEBPACK_IMPORTED_MODULE_30__.BrowserProvider(window.ethereum);
        }
    });
    container.bind("contracts").toConstantValue(contracts());
    container.bind("name").toConstantValue("Large");
    container.bind("framework7").toConstantValue(framework7());
    container.bind("dayjs").toConstantValue((dayjs__WEBPACK_IMPORTED_MODULE_3___default()));
    container.bind("PouchDB").toConstantValue(() => {
        return pouchdb_browser__WEBPACK_IMPORTED_MODULE_1__["default"];
    });
    container.bind("pouch-prefix").toConstantValue("./pouch/");
    container.bind("footer-text").toConstantValue(globalThis.footerText);
    // let fs
    // //@ts-ignore
    // container.bind("fs").toConstantValue(async () => {
    //   if (fs) return fs
    //   fs = new FS()
    //   await fs.init("large-fs")
    //   return fs
    // })
    // container.bind("git").toConstantValue(git)
    container.bind(_controller_channel_controller_js__WEBPACK_IMPORTED_MODULE_31__.ChannelController).toSelf().inSingletonScope();
    container.bind(_controller_item_controller_js__WEBPACK_IMPORTED_MODULE_32__.ItemController).toSelf().inSingletonScope();
    container.bind(_controller_author_controller_js__WEBPACK_IMPORTED_MODULE_33__.AuthorController).toSelf().inSingletonScope();
    container.bind(_controller_settings_controller_js__WEBPACK_IMPORTED_MODULE_34__.SettingsController).toSelf().inSingletonScope();
    container.bind(_controller_connect_controller_js__WEBPACK_IMPORTED_MODULE_35__.ConnectController).toSelf().inSingletonScope();
    container.bind(_controller_publish_controller_js__WEBPACK_IMPORTED_MODULE_36__.PublishController).toSelf().inSingletonScope();
    container.bind(_service_core_ui_service_js__WEBPACK_IMPORTED_MODULE_37__.UiService).toSelf().inSingletonScope();
    container.bind(_service_core_queue_service_js__WEBPACK_IMPORTED_MODULE_38__.QueueService).toSelf().inSingletonScope();
    container.bind(_service_quill_service_js__WEBPACK_IMPORTED_MODULE_39__.QuillService).toSelf().inSingletonScope();
    container.bind(_service_quill_editor_service_js__WEBPACK_IMPORTED_MODULE_40__.QuillEditorService).toSelf().inSingletonScope();
    container.bind(_service_core_deploy_service_js__WEBPACK_IMPORTED_MODULE_41__.DeployService).toSelf().inSingletonScope();
    container.bind(_service_core_upload_service_js__WEBPACK_IMPORTED_MODULE_42__.UploadService).toSelf().inSingletonScope();
    container.bind(_service_core_ipfs_service_js__WEBPACK_IMPORTED_MODULE_43__.IpfsService).toSelf().inSingletonScope();
    container.bind(_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_44__.DatabaseService).toSelf().inSingletonScope();
    container.bind(_service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_45__.SchemaService).toSelf().inSingletonScope();
    // container.bind(PinningService).toSelf().inSingletonScope()
    container.bind(_service_core_routing_service_js__WEBPACK_IMPORTED_MODULE_46__.RoutingService).toSelf().inSingletonScope();
    container.bind(_service_core_paging_service_js__WEBPACK_IMPORTED_MODULE_47__.PagingService).toSelf().inSingletonScope();
    container.bind(_service_core_erc_event_service_js__WEBPACK_IMPORTED_MODULE_48__.ERCEventService).toSelf().inSingletonScope();
    container.bind(_service_core_export_service_js__WEBPACK_IMPORTED_MODULE_49__.ExportService).toSelf().inSingletonScope();
    container.bind(_service_attribute_count_service_js__WEBPACK_IMPORTED_MODULE_50__.AttributeCountService).toSelf().inSingletonScope();
    container.bind(_service_web_channel_web_service_js__WEBPACK_IMPORTED_MODULE_51__.ChannelWebService).toSelf().inSingletonScope();
    container.bind(_service_web_item_web_service_js__WEBPACK_IMPORTED_MODULE_52__.ItemWebService).toSelf().inSingletonScope();
    container.bind(_service_web_author_web_service_js__WEBPACK_IMPORTED_MODULE_53__.AuthorWebService).toSelf().inSingletonScope();
    container.bind(_service_core_types_js__WEBPACK_IMPORTED_MODULE_54__["default"].WalletService).to(_service_core_wallet_service_impl_js__WEBPACK_IMPORTED_MODULE_55__.WalletServiceImpl).inSingletonScope();
    container.bind(_service_animation_service_js__WEBPACK_IMPORTED_MODULE_56__.AnimationService).toSelf().inSingletonScope();
    container.bind(_service_author_service_js__WEBPACK_IMPORTED_MODULE_57__.AuthorService).toSelf().inSingletonScope();
    container.bind(_service_channel_service_js__WEBPACK_IMPORTED_MODULE_58__.ChannelService).toSelf().inSingletonScope();
    container.bind(_service_image_service_js__WEBPACK_IMPORTED_MODULE_59__.ImageService).toSelf().inSingletonScope();
    container.bind(_service_item_service_js__WEBPACK_IMPORTED_MODULE_60__.ItemService).toSelf().inSingletonScope();
    container.bind(_service_svg_service_js__WEBPACK_IMPORTED_MODULE_61__.SvgService).toSelf().inSingletonScope();
    container.bind(_service_core_import_service_js__WEBPACK_IMPORTED_MODULE_62__.ImportService).toSelf().inSingletonScope();
    container.bind(_service_theme_service_js__WEBPACK_IMPORTED_MODULE_63__.ThemeService).toSelf().inSingletonScope();
    container.bind(_service_static_page_service_js__WEBPACK_IMPORTED_MODULE_64__.StaticPageService).toSelf().inSingletonScope();
    container.bind(_service_core_query_cache_service_js__WEBPACK_IMPORTED_MODULE_65__.QueryCacheService).toSelf().inSingletonScope();
    container.bind(_service_core_settings_service_js__WEBPACK_IMPORTED_MODULE_66__.SettingsService).toSelf().inSingletonScope();
    container.bind(_service_core_git_service_js__WEBPACK_IMPORTED_MODULE_67__.GitService).toSelf().inSingletonScope();
    container.bind(_service_core_gitlab_service_js__WEBPACK_IMPORTED_MODULE_68__.GitlabService).toSelf().inSingletonScope();
    container.bind(_service_core_github_service_js__WEBPACK_IMPORTED_MODULE_69__.GithubService).toSelf().inSingletonScope();
    container.bind(_service_core_hugging_face_service_js__WEBPACK_IMPORTED_MODULE_70__.HuggingFaceService).toSelf().inSingletonScope();
    container.bind(_service_original_metadata_service_js__WEBPACK_IMPORTED_MODULE_71__.OriginalMetadataService).toSelf().inSingletonScope();
    container.bind(_repository_animation_repository_js__WEBPACK_IMPORTED_MODULE_72__.AnimationRepository).toSelf().inSingletonScope();
    container.bind(_repository_channel_repository_js__WEBPACK_IMPORTED_MODULE_73__.ChannelRepository).toSelf().inSingletonScope();
    container.bind(_repository_item_repository_js__WEBPACK_IMPORTED_MODULE_74__.ItemRepository).toSelf().inSingletonScope();
    container.bind(_repository_image_repository_js__WEBPACK_IMPORTED_MODULE_75__.ImageRepository).toSelf().inSingletonScope();
    container.bind(_repository_author_repository_js__WEBPACK_IMPORTED_MODULE_76__.AuthorRepository).toSelf().inSingletonScope();
    container.bind(_repository_settings_repository_js__WEBPACK_IMPORTED_MODULE_77__.SettingsRepository).toSelf().inSingletonScope();
    container.bind(_repository_theme_repository_js__WEBPACK_IMPORTED_MODULE_78__.ThemeRepository).toSelf().inSingletonScope();
    container.bind(_repository_static_page_repository_js__WEBPACK_IMPORTED_MODULE_79__.StaticPageRepository).toSelf().inSingletonScope();
    container.bind(_repository_token_metadata_cache_repository_js__WEBPACK_IMPORTED_MODULE_80__.TokenMetadataCacheRepository).toSelf().inSingletonScope();
    container.bind(_repository_query_cache_repository_js__WEBPACK_IMPORTED_MODULE_81__.QueryCacheRepository).toSelf().inSingletonScope();
    container.bind(_repository_attribute_count_repository_js__WEBPACK_IMPORTED_MODULE_82__.AttributeCountRepository).toSelf().inSingletonScope();
    container.bind(_repository_original_metadata_repository_js__WEBPACK_IMPORTED_MODULE_83__.OriginalMetadataRepository).toSelf().inSingletonScope();
    container.bind("ipfsRemoteInit").toConstantValue(async (url) => {
        if (!url)
            return;
        return (0,ipfs_http_client__WEBPACK_IMPORTED_MODULE_0__.create)({ url: url });
    });
    //Attach container to window so we can easily access it from the browser console
    globalThis.container = container;
    return container;
}



/***/ }),

/***/ "./src/admin/repository/animation-repository.ts":
/*!******************************************************!*\
  !*** ./src/admin/repository/animation-repository.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationRepository: () => (/* binding */ AnimationRepository)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dto/animation.js */ "./src/admin/dto/animation.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AnimationRepository = class AnimationRepository {
    databaseService;
    changesets = [{
            id: '0',
            changeset: async (db) => {
                await db.createIndex({
                    index: {
                        fields: ['dateCreated']
                    }
                });
            }
        }];
    db;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async load(channelId) {
        this.db = await this.databaseService.getDatabase(`${channelId}-animation`, this.changesets);
    }
    async loadEmpty(channelId) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-animation`);
    }
    async get(_id) {
        return Object.assign(new _dto_animation_js__WEBPACK_IMPORTED_MODULE_0__.Animation(), await this.db.get(_id));
    }
    async put(animation) {
        await this.db.put(animation);
    }
    async delete(animation) {
        await this.db.remove(animation);
    }
    async getByIds(ids) {
        let results = await this.db.allDocs({
            keys: ids,
            include_docs: true
        });
        return results.rows?.map(d => d.doc);
    }
};
AnimationRepository = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService])
], AnimationRepository);



/***/ }),

/***/ "./src/admin/repository/attribute-count-repository.ts":
/*!************************************************************!*\
  !*** ./src/admin/repository/attribute-count-repository.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttributeCountRepository: () => (/* binding */ AttributeCountRepository)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
/* harmony import */ var _dto_attribute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dto/attribute.js */ "./src/admin/dto/attribute.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AttributeCountRepository = class AttributeCountRepository {
    databaseService;
    db;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async load(channelId) {
        this.db = await this.databaseService.getDatabase(`${channelId}-attribute-counts`);
    }
    async loadEmpty(channelId) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-attribute-counts`);
    }
    async get(_id) {
        return Object.assign(new _dto_attribute_js__WEBPACK_IMPORTED_MODULE_0__.AttributeCount(), await this.db.get(_id));
    }
    async put(attributeCount) {
        await this.db.put(attributeCount);
    }
    async delete(_id) {
        await this.db.remove(_id);
    }
};
AttributeCountRepository = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService])
], AttributeCountRepository);



/***/ }),

/***/ "./src/admin/repository/author-repository.ts":
/*!***************************************************!*\
  !*** ./src/admin/repository/author-repository.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorRepository: () => (/* binding */ AuthorRepository)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_author_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dto/author.js */ "./src/admin/dto/author.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AuthorRepository = class AuthorRepository {
    databaseService;
    db;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async load(channelId) {
        this.db = await this.databaseService.getDatabase(`${channelId}-author`);
    }
    async loadEmpty(channelId) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-author`);
    }
    async getLatestRevision(_id) {
        return Object.assign(new _dto_author_js__WEBPACK_IMPORTED_MODULE_0__.Author(), await this.databaseService.getLatestRevision(this.db, _id));
    }
    async get(_id) {
        return Object.assign(new _dto_author_js__WEBPACK_IMPORTED_MODULE_0__.Author(), await this.db.get(_id));
    }
    async put(author) {
        return this.db.put(author);
    }
};
AuthorRepository = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService])
], AuthorRepository);



/***/ }),

/***/ "./src/admin/repository/changesets/item-changeset.ts":
/*!***********************************************************!*\
  !*** ./src/admin/repository/changesets/item-changeset.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changesets: () => (/* binding */ changesets)
/* harmony export */ });
//@ts-nocheck
let changesets = [
    {
        id: '0',
        changeset: async (db) => {
            await db.createIndex({
                index: {
                    fields: ['dateCreated']
                }
            });
        }
    },
    {
        id: '1',
        changeset: async (db) => {
            await db.put({
                _id: '_design/attribute_counts',
                views: {
                    attribute_counts: {
                        map: function (doc) {
                            if (doc.attributeSelections?.length > 0) {
                                for (let as of doc.attributeSelections) {
                                    emit([doc.channelId, as.traitType, as.value]);
                                }
                            }
                        }.toString(),
                        reduce: '_count'
                    }
                }
            });
        }
    },
    {
        id: '5',
        changeset: async (db) => {
            await db.put({
                _id: '_design/by_channel_token',
                views: {
                    by_channel_token: {
                        map: function (doc) {
                            emit([doc.channelId, doc.tokenId]);
                        }.toString(),
                    }
                }
            });
            await db.put({
                _id: '_design/by_channel_token_stats',
                views: {
                    by_channel_token_stats: {
                        map: function (doc) {
                            emit(doc.channelId, doc.tokenId);
                        }.toString(),
                        reduce: "_stats"
                    }
                }
            });
        }
    },
    {
        id: '6',
        changeset: async (db) => {
            await db.createIndex({
                index: {
                    fields: ['animationId']
                }
            });
            await db.put({
                _id: '_design/by_image_id',
                views: {
                    by_image_id: {
                        map: function (doc) {
                            if (doc.imageIds && doc.imageIds?.length > 0) {
                                for (let imageId of doc.imageIds) {
                                    emit(imageId);
                                }
                            }
                        }.toString(),
                    }
                }
            });
        }
    }
];



/***/ }),

/***/ "./src/admin/repository/channel-repository.ts":
/*!****************************************************!*\
  !*** ./src/admin/repository/channel-repository.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChannelRepository: () => (/* binding */ ChannelRepository)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_channel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dto/channel.js */ "./src/admin/dto/channel.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ChannelRepository = class ChannelRepository {
    databaseService;
    changesets = [{
            id: '0',
            changeset: async (db) => {
                //Create indexes
                await db.createIndex({ index: { fields: ['dateCreated'] } });
                await db.createIndex({ index: { fields: ['lastUpdated'] } });
            }
        }];
    db;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async load() {
        this.db = await this.databaseService.getDatabase("channel", this.changesets);
    }
    async get(_id) {
        return Object.assign(new _dto_channel_js__WEBPACK_IMPORTED_MODULE_0__.Channel(), await this.db.get(_id));
    }
    async getLatestRevision(_id) {
        return Object.assign(new _dto_channel_js__WEBPACK_IMPORTED_MODULE_0__.Channel(), await this.databaseService.getLatestRevision(this.db, _id));
    }
    async put(channel) {
        return this.db.put(channel);
    }
    async list(limit, skip) {
        // console.log(await this.db.allDocs({include_docs: true}))
        let response = await this.db.find({
            selector: { "dateCreated": { $exists: true } },
            sort: [{ 'dateCreated': 'desc' }],
            limit: limit,
            skip: skip
        });
        return response.docs;
    }
    async delete(channel) {
        await this.db.remove(channel);
    }
};
ChannelRepository = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService])
], ChannelRepository);



/***/ }),

/***/ "./src/admin/repository/image-repository.ts":
/*!**************************************************!*\
  !*** ./src/admin/repository/image-repository.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageRepository: () => (/* binding */ ImageRepository)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_image_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dto/image.js */ "./src/admin/dto/image.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ImageRepository = class ImageRepository {
    databaseService;
    changesets = [{
            id: '0',
            changeset: async (db) => {
                await db.createIndex({
                    index: {
                        fields: ['dateCreated']
                    }
                });
            }
        }];
    db;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async load(channelId) {
        this.db = await this.databaseService.getDatabase(`${channelId}-image`, this.changesets);
    }
    async loadEmpty(channelId) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-image`);
    }
    async get(_id) {
        return Object.assign(new _dto_image_js__WEBPACK_IMPORTED_MODULE_0__.Image(), await this.db.get(_id));
    }
    async put(image) {
        await this.db.put(image);
    }
    async delete(image) {
        await this.db.remove(image);
    }
    async getByIds(ids) {
        let results = await this.db.allDocs({
            keys: ids,
            include_docs: true
        });
        return results.rows?.map(d => d.doc);
    }
};
ImageRepository = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService])
], ImageRepository);



/***/ }),

/***/ "./src/admin/repository/item-repository.ts":
/*!*************************************************!*\
  !*** ./src/admin/repository/item-repository.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemRepository: () => (/* binding */ ItemRepository)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_item_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dto/item.js */ "./src/admin/dto/item.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
/* harmony import */ var _changesets_item_changeset_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./changesets/item-changeset.js */ "./src/admin/repository/changesets/item-changeset.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let ItemRepository = class ItemRepository {
    databaseService;
    static CHUNK_SIZE = 35;
    changesets = _changesets_item_changeset_js__WEBPACK_IMPORTED_MODULE_0__.changesets;
    db;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async load(channelId) {
        this.db = await this.databaseService.getDatabase(`${channelId}-item`, this.changesets);
    }
    async loadEmpty(channelId) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-item`);
    }
    async get(_id) {
        return Object.assign(new _dto_item_js__WEBPACK_IMPORTED_MODULE_1__.Item(), await this.db.get(_id));
    }
    async getIds() {
        let result = await this.db.allDocs({ include_docs: true });
        let rows = result.rows.filter(row => !row.id.startsWith("_design") && !row.id.startsWith("_local"));
        return rows.sort((a, b) => parseInt(a.value.tokenId) - parseInt(b.value.tokenId)).map(r => r.id);
    }
    async getLatestRevision(_id) {
        return Object.assign(new _dto_item_js__WEBPACK_IMPORTED_MODULE_1__.Item(), await this.databaseService.getLatestRevision(this.db, _id));
    }
    async getByTokenId(channelId, tokenId) {
        let result = await this.db.query('by_channel_token', {
            reduce: false,
            include_docs: true,
            key: [channelId, tokenId],
            limit: 1
        });
        if (result.rows?.length > 0) {
            return Object.assign(new _dto_item_js__WEBPACK_IMPORTED_MODULE_1__.Item(), result.rows[0].doc);
        }
    }
    async put(item) {
        await this.db.put(item);
    }
    async listByChannel(channelId, limit, skip) {
        let items = [];
        let result = await this.db.query('by_channel_token', {
            reduce: false,
            include_docs: true,
            startkey: [channelId, 0],
            endkey: [channelId, {}],
            limit: limit,
            skip: skip
        });
        if (result.rows?.length > 0) {
            for (let row of result.rows) {
                items.push(Object.assign(new _dto_item_js__WEBPACK_IMPORTED_MODULE_1__.Item(), row.doc));
            }
        }
        return items;
    }
    async delete(item) {
        await this.db.remove(item);
    }
    async getAttributeCountByChannel(channelId) {
        let result = await this.db.query('attribute_counts', {
            reduce: true,
            startKey: [channelId, "", ""],
            endKey: [channelId, {}, {}],
            include_docs: false,
            group_level: 3
        });
        return result.rows.map(row => {
            return {
                traitType: row.key[1],
                value: row.key[2],
                count: row.value,
                channelId: channelId
            };
        });
    }
    async getAttributeInfoBySelections(channelId, attributeSelections) {
        let result = await this.db.query('attribute_counts', {
            reduce: true,
            keys: attributeSelections.map(as => [channelId, as.traitType, as.value]),
            include_docs: false,
            group_level: 3
        });
        // console.log(result)
        return result.rows.map(row => {
            return {
                traitType: row.key[1],
                value: row.key[2],
                count: row.value,
                channelId: channelId
            };
        });
    }
    async getByImageId(imageId) {
        let result = await this.db.query('by_image_id', {
            reduce: false,
            include_docs: true,
            key: imageId
        });
        return result.rows?.map(r => r.doc);
    }
    async getByAnimationId(animationId) {
        let response = await this.db.find({
            selector: { "animationId": { $eq: animationId } }
        });
        return response.docs;
    }
};
ItemRepository = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __metadata("design:paramtypes", [_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_3__.DatabaseService])
], ItemRepository);



/***/ }),

/***/ "./src/admin/repository/original-metadata-repository.ts":
/*!**************************************************************!*\
  !*** ./src/admin/repository/original-metadata-repository.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OriginalMetadataRepository: () => (/* binding */ OriginalMetadataRepository)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
/* harmony import */ var _dto_original_metadata_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dto/original-metadata.js */ "./src/admin/dto/original-metadata.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let OriginalMetadataRepository = class OriginalMetadataRepository {
    databaseService;
    changesets = [{
            id: '0',
            changeset: async (db) => {
                await db.createIndex({
                    index: {
                        fields: ['dateCreated']
                    }
                });
            }
        }];
    db;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async load(channelId) {
        this.db = await this.databaseService.getDatabase(`${channelId}-original-metadata`, this.changesets);
    }
    async loadEmpty(channelId) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-original-metadata`);
    }
    async get(_id) {
        return Object.assign(new _dto_original_metadata_js__WEBPACK_IMPORTED_MODULE_0__.OriginalMetadata(), await this.db.get(_id));
    }
    async put(originalMetadata) {
        await this.db.put(originalMetadata);
    }
    async delete(originalMetadata) {
        await this.db.remove(originalMetadata);
    }
    async getByIds(ids) {
        let results = await this.db.allDocs({
            keys: ids,
            include_docs: true
        });
        return results.rows?.map(d => d.doc);
    }
};
OriginalMetadataRepository = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService])
], OriginalMetadataRepository);



/***/ }),

/***/ "./src/admin/repository/query-cache-repository.ts":
/*!********************************************************!*\
  !*** ./src/admin/repository/query-cache-repository.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryCacheRepository: () => (/* binding */ QueryCacheRepository)
/* harmony export */ });
/* harmony import */ var _dto_query_cache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dto/query-cache.js */ "./src/admin/dto/query-cache.ts");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let QueryCacheRepository = class QueryCacheRepository {
    databaseService;
    db;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async load() {
        this.db = await this.databaseService.getDatabase("query-cache");
    }
    async get(_id) {
        return Object.assign(new _dto_query_cache_js__WEBPACK_IMPORTED_MODULE_0__.QueryCache(), await this.db.get(_id));
    }
    async put(queryCache) {
        await this.db.put(queryCache);
    }
    async delete(_id) {
        await this.db.remove(_id);
    }
};
QueryCacheRepository = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService])
], QueryCacheRepository);



/***/ }),

/***/ "./src/admin/repository/settings-repository.ts":
/*!*****************************************************!*\
  !*** ./src/admin/repository/settings-repository.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsRepository: () => (/* binding */ SettingsRepository)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dto/settings.js */ "./src/admin/dto/settings.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let SettingsRepository = class SettingsRepository {
    databaseService;
    db;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async load() {
        this.db = await this.databaseService.getDatabase("settings");
    }
    async get() {
        return Object.assign(new _dto_settings_js__WEBPACK_IMPORTED_MODULE_0__.Settings(), await this.db.get("single"));
    }
    async put(settings) {
        //Force it to have the 'single' id
        settings._id = "single";
        await this.db.put(settings);
    }
};
SettingsRepository = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService])
], SettingsRepository);



/***/ }),

/***/ "./src/admin/repository/static-page-repository.ts":
/*!********************************************************!*\
  !*** ./src/admin/repository/static-page-repository.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StaticPageRepository: () => (/* binding */ StaticPageRepository)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_static_page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dto/static-page.js */ "./src/admin/dto/static-page.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let StaticPageRepository = class StaticPageRepository {
    databaseService;
    changesets = [{
            id: '0',
            changeset: async (db) => {
                await db.createIndex({
                    index: {
                        fields: ['channelId']
                    }
                });
                await db.createIndex({
                    index: {
                        fields: ['dateCreated']
                    }
                });
            }
        }];
    db;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async load(channelId) {
        this.db = await this.databaseService.getDatabase(`${channelId}-static-page`, this.changesets);
    }
    async loadEmpty(channelId) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-static-page`);
    }
    async get(_id) {
        return Object.assign(new _dto_static_page_js__WEBPACK_IMPORTED_MODULE_0__.StaticPage(), await this.db.get(_id));
    }
    async getIds() {
        let result = await this.db.allDocs({ include_docs: false });
        return result.rows.filter(row => !row.id.startsWith("_design") && !row.id.startsWith("_local")).map(r => r.id);
    }
    async getLatestRevision(_id) {
        return Object.assign(new _dto_static_page_js__WEBPACK_IMPORTED_MODULE_0__.StaticPage(), await this.databaseService.getLatestRevision(this.db, _id));
    }
    async put(staticPage) {
        await this.db.put(staticPage);
    }
    async delete(staticPage) {
        await this.db.remove(staticPage);
    }
    async listByChannel(channelId, limit, skip) {
        let response = await this.db.find({
            selector: {
                channelId: { $eq: channelId },
                dateCreated: { $exists: true }
            },
            sort: [{ 'dateCreated': 'asc' }],
            limit: limit,
            skip: skip
        });
        return response.docs;
    }
};
StaticPageRepository = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService])
], StaticPageRepository);



/***/ }),

/***/ "./src/admin/repository/theme-repository.ts":
/*!**************************************************!*\
  !*** ./src/admin/repository/theme-repository.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeRepository: () => (/* binding */ ThemeRepository)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_theme_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dto/theme.js */ "./src/admin/dto/theme.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ThemeRepository = class ThemeRepository {
    databaseService;
    changesets = [{
            id: '0',
            changeset: async (db) => {
                await db.createIndex({
                    index: {
                        fields: ['channelId']
                    }
                });
                await db.createIndex({
                    index: {
                        fields: ['dateCreated']
                    }
                });
            }
        }];
    db;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async load(channelId) {
        this.db = await this.databaseService.getDatabase(`${channelId}-theme`, this.changesets);
    }
    async loadEmpty(channelId) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-theme`);
    }
    async get(_id) {
        return Object.assign(new _dto_theme_js__WEBPACK_IMPORTED_MODULE_0__.Theme(), await this.db.get(_id));
    }
    async getIds() {
        let result = await this.db.allDocs({ include_docs: false });
        return result.rows.filter(row => !row.id.startsWith("_design") && !row.id.startsWith("_local")).map(r => r.id);
    }
    async getLatestRevision(_id) {
        return Object.assign(new _dto_theme_js__WEBPACK_IMPORTED_MODULE_0__.Theme(), await this.databaseService.getLatestRevision(this.db, _id));
    }
    async put(theme) {
        await this.db.put(theme);
    }
    async delete(theme) {
        await this.db.remove(theme);
    }
    async listByChannel(channelId, limit, skip) {
        let response = await this.db.find({
            selector: {
                channelId: { $eq: channelId },
                dateCreated: { $exists: true }
            },
            sort: [{ 'dateCreated': 'asc' }],
            limit: limit,
            skip: skip
        });
        return response.docs;
    }
};
ThemeRepository = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService])
], ThemeRepository);



/***/ }),

/***/ "./src/admin/repository/token-metadata-cache-repository.ts":
/*!*****************************************************************!*\
  !*** ./src/admin/repository/token-metadata-cache-repository.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenMetadataCacheRepository: () => (/* binding */ TokenMetadataCacheRepository)
/* harmony export */ });
/* harmony import */ var _dto_token_metadata_cache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dto/token-metadata-cache.js */ "./src/admin/dto/token-metadata-cache.ts");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/core/database-service.js */ "./src/admin/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let TokenMetadataCacheRepository = class TokenMetadataCacheRepository {
    databaseService;
    db;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async load() {
        this.db = await this.databaseService.getDatabase("token-metadata-cache");
    }
    async get(_id) {
        return Object.assign(new _dto_token_metadata_cache_js__WEBPACK_IMPORTED_MODULE_0__.TokenMetadataCache(), await this.db.get(_id));
    }
    async put(tokenMetadataCache) {
        await this.db.put(tokenMetadataCache);
    }
};
TokenMetadataCacheRepository = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService])
], TokenMetadataCacheRepository);



/***/ }),

/***/ "./src/admin/service/animation-service.ts":
/*!************************************************!*\
  !*** ./src/admin/service/animation-service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationService: () => (/* binding */ AnimationService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_animation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dto/animation.js */ "./src/admin/dto/animation.ts");
/* harmony import */ var _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/validation-exception.js */ "./src/admin/util/validation-exception.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/index.js");
/* harmony import */ var ipfs_only_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ipfs-only-hash */ "./node_modules/ipfs-only-hash/index.js");
/* harmony import */ var _repository_animation_repository_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../repository/animation-repository.js */ "./src/admin/repository/animation-repository.ts");
/* harmony import */ var _image_service_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./image-service.js */ "./src/admin/service/image-service.ts");
/* harmony import */ var _quill_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./quill-service.js */ "./src/admin/service/quill-service.ts");
/* harmony import */ var _theme_service_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./theme-service.js */ "./src/admin/service/theme-service.ts");
/* harmony import */ var juice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! juice */ "./node_modules/juice/client.js");
/* harmony import */ var juice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(juice__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









const { forEach: each } = Array.prototype;

let AnimationService = class AnimationService {
    animationRepository;
    quillService;
    imageService;
    themeService;
    db;
    constructor(animationRepository, quillService, imageService, themeService) {
        this.animationRepository = animationRepository;
        this.quillService = quillService;
        this.imageService = imageService;
        this.themeService = themeService;
    }
    async get(_id) {
        return this.animationRepository.get(_id);
    }
    async put(animation) {
        if (!animation._id) {
            animation._id = animation.cid;
            animation.dateCreated = new Date().toJSON();
        }
        //Validate
        let errors = await (0,class_validator__WEBPACK_IMPORTED_MODULE_2__.validate)(animation, {
            forbidUnknownValues: true,
            whitelist: true
        });
        if (errors.length > 0) {
            throw new _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_3__.ValidationException(errors);
        }
        await this.animationRepository.put(animation);
    }
    async delete(animation) {
        await this.animationRepository.delete(animation);
    }
    async newFromText(content) {
        const animation = new _dto_animation_js__WEBPACK_IMPORTED_MODULE_4__.Animation();
        animation.content = content;
        animation.cid = await ipfs_only_hash__WEBPACK_IMPORTED_MODULE_0__.of(animation.content);
        return animation;
    }
    async buildAnimationPage(item) {
        let result;
        let content = await this.quillService.translateContent(item.content);
        let themes = [];
        if (item.themes) {
            for (let theme of item.themes) {
                themes.push(await this.themeService.get(theme));
            } //might not exist because it got deleted.
        }
        let allThemeCss = "";
        if (themes?.length > 0) {
            for (let theme of themes) {
                if (theme.animationCSS?.length > 0)
                    allThemeCss += theme.animationCSS;
            }
        }
        // console.log(`Theme CSS: ${allThemeCss}`)
        // console.log(`Individual CSS: ${item.animationCSS}`)
        if (item.coverImageAsAnimation) {
            let image = await this.imageService.get(item.coverImageId);
            let imageSrc = await this.imageService.getUrl(image);
            result = this.getFullImageTemplate(imageSrc, item.animationCSS, allThemeCss);
        }
        else {
            result = this.getAnimationTemplate(item, content, item.animationCSS, allThemeCss);
        }
        return juice__WEBPACK_IMPORTED_MODULE_1___default()(result);
    }
    getFullImageTemplate(imageSrc, individualCss, themeCss) {
        return `<!DOCTYPE html>
    <html>
      <head>
        <style>
        
          body { 
            height: 100%; 
            width: 100%;
            margin: 0;
            padding: 0;

            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden
          }

          img {
            flex-shrink: 0;
            min-width: 100%;
            width: 100%;
            height: 100%;
            min-height: 100%
            object-fit: cover;
          }

          ${themeCss ? themeCss : ''}
          ${individualCss ? individualCss : ''}

        </style>
      </head>

      <body>
        <img src="${imageSrc}" />
      </body>
    </html>`;
    }
    getAnimationTemplate(item, content, individualCss, themeCss) {
        return `<!DOCTYPE html>
        <html>
        
          <head>
              <meta charset="utf-8">
              <title>${item.title}</title>

              <style>

                html {
                    height:100%;
                } 

                body {
                      padding: 0;
                      margin: 0;
                      box-sizing: border-box;
                      height: 100%;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                }

                .animation-container {
                  box-sizing: border-box;
                  padding: 20px;
                  width:100%;
                  min-height: 100%;
                  
                  background: rgb(241,241,241);
                  background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);

                  font-size: 20px;
                  border: 5px solid #4e82b1;
                  float: left;
                }

                img { 
                  max-width: 100%;
                  border: 1px solid #cccccc;
                  object-fit: cover;
                }

                .token-id {
                  color: rgb(79, 79, 79);
                  font-weight: bold;
                }

                h4 { 
                  margin-top: 0px; 
                  font-size: 25px;
                  margin-bottom: 0px;
                }

                ${themeCss ? themeCss : ''}
                ${individualCss ? individualCss : ''}


              </style>

          </head>

          <body>

            <div class="animation-container">
              <h4><b>${item.title ? item.title : ''} <span class="token-id">#${item.tokenId}</span></b></h4>
              ${content}
            </div>

          </body>
        </html>`;
    }
    async getByIds(ids) {
        return this.animationRepository.getByIds(ids);
    }
};
AnimationService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_5__.injectable)(),
    __metadata("design:paramtypes", [_repository_animation_repository_js__WEBPACK_IMPORTED_MODULE_6__.AnimationRepository,
        _quill_service_js__WEBPACK_IMPORTED_MODULE_7__.QuillService,
        _image_service_js__WEBPACK_IMPORTED_MODULE_8__.ImageService,
        _theme_service_js__WEBPACK_IMPORTED_MODULE_9__.ThemeService])
], AnimationService);



/***/ }),

/***/ "./src/admin/service/attribute-count-service.ts":
/*!******************************************************!*\
  !*** ./src/admin/service/attribute-count-service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttributeCountService: () => (/* binding */ AttributeCountService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/index.js");
/* harmony import */ var _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation-exception.js */ "./src/admin/util/validation-exception.ts");
/* harmony import */ var _repository_attribute_count_repository_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../repository/attribute-count-repository.js */ "./src/admin/repository/attribute-count-repository.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let AttributeCountService = class AttributeCountService {
    attributeCountRepository;
    db;
    constructor(attributeCountRepository) {
        this.attributeCountRepository = attributeCountRepository;
    }
    async get(_id) {
        return this.attributeCountRepository.get(_id);
    }
    async put(attributeCount) {
        if (!attributeCount._id) {
            attributeCount._id = `${attributeCount.channelId}-${attributeCount.traitType}-${attributeCount.value}`;
            attributeCount.dateCreated = new Date().toJSON();
        }
        else {
            attributeCount.lastUpdated = new Date().toJSON();
        }
        //Validate
        let errors = await (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.validate)(attributeCount, {
            forbidUnknownValues: true,
            whitelist: true
        });
        if (errors.length > 0) {
            throw new _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_1__.ValidationException(errors);
        }
        await this.attributeCountRepository.put(attributeCount);
    }
};
AttributeCountService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __metadata("design:paramtypes", [_repository_attribute_count_repository_js__WEBPACK_IMPORTED_MODULE_3__.AttributeCountRepository])
], AttributeCountService);



/***/ }),

/***/ "./src/admin/service/author-service.ts":
/*!*********************************************!*\
  !*** ./src/admin/service/author-service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorService: () => (/* binding */ AuthorService)
/* harmony export */ });
/* harmony import */ var _dto_author_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dto/author.js */ "./src/admin/dto/author.ts");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var _repository_author_repository_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../repository/author-repository.js */ "./src/admin/repository/author-repository.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/index.js");
/* harmony import */ var _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation-exception.js */ "./src/admin/util/validation-exception.ts");
/* harmony import */ var _core_types_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/types.js */ "./src/admin/service/core/types.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






let AuthorService = class AuthorService {
    authorRepository;
    walletService;
    db;
    constructor(authorRepository, walletService) {
        this.authorRepository = authorRepository;
        this.walletService = walletService;
    }
    async load(channelId) {
        this.db = await this.authorRepository.load(channelId);
    }
    async get(_id) {
        return this.authorRepository.get(_id);
    }
    async put(author) {
        if (!author._id) {
            author._id = author.walletAddress;
            author.dateCreated = new Date().toJSON();
        }
        else {
            author.lastUpdated = new Date().toJSON();
        }
        //Validate
        let errors = await (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.validate)(author, {
            forbidUnknownValues: true,
            whitelist: true
        });
        if (errors.length > 0) {
            throw new _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_1__.ValidationException(errors);
        }
        return this.authorRepository.put(author);
    }
    async insertIfNew(walletAddress) {
        let existing;
        try {
            existing = await this.get(walletAddress);
        }
        catch (ex) { }
        if (!existing) {
            await this.put(Object.assign(new _dto_author_js__WEBPACK_IMPORTED_MODULE_2__.Author(), {
                _id: walletAddress,
                walletAddress: walletAddress
            }));
        }
    }
    getDisplayName(author) {
        if (!author)
            return;
        if (author.name)
            return author.name;
        return this.walletService.truncateEthAddress(author._id);
    }
    async getLatestRevision(_id) {
        return this.authorRepository.getLatestRevision(_id);
    }
};
AuthorService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_4__.inject)(_core_types_js__WEBPACK_IMPORTED_MODULE_5__["default"].WalletService)),
    __metadata("design:paramtypes", [_repository_author_repository_js__WEBPACK_IMPORTED_MODULE_6__.AuthorRepository, Object])
], AuthorService);



/***/ }),

/***/ "./src/admin/service/channel-service.ts":
/*!**********************************************!*\
  !*** ./src/admin/service/channel-service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChannelService: () => (/* binding */ ChannelService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/index.js");
/* harmony import */ var _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/validation-exception.js */ "./src/admin/util/validation-exception.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _image_service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./image-service.js */ "./src/admin/service/image-service.ts");
/* harmony import */ var _item_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./item-service.js */ "./src/admin/service/item-service.ts");
/* harmony import */ var _repository_channel_repository_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../repository/channel-repository.js */ "./src/admin/repository/channel-repository.ts");
/* harmony import */ var _quill_service_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./quill-service.js */ "./src/admin/service/quill-service.ts");
/* harmony import */ var _core_query_cache_service_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/query-cache-service.js */ "./src/admin/service/core/query-cache-service.ts");
/* harmony import */ var _dto_attribute_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dto/attribute.js */ "./src/admin/dto/attribute.ts");
/* harmony import */ var _attribute_count_service_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./attribute-count-service.js */ "./src/admin/service/attribute-count-service.ts");
/* harmony import */ var _core_schema_service_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core/schema-service.js */ "./src/admin/service/core/schema-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












let ChannelService = class ChannelService {
    channelRepository;
    imageService;
    itemService;
    quillService;
    schemaService;
    queryCacheService;
    attributeCountService;
    constructor(channelRepository, imageService, itemService, quillService, schemaService, queryCacheService, attributeCountService) {
        this.channelRepository = channelRepository;
        this.imageService = imageService;
        this.itemService = itemService;
        this.quillService = quillService;
        this.schemaService = schemaService;
        this.queryCacheService = queryCacheService;
        this.attributeCountService = attributeCountService;
    }
    async get(_id) {
        return this.channelRepository.get(_id);
    }
    async getLatestRevision(_id) {
        return this.channelRepository.getLatestRevision(_id);
    }
    async put(channel) {
        if (!channel._id) {
            channel._id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
            channel.dateCreated = new Date().toJSON();
        }
        else {
            channel.lastUpdated = new Date().toJSON();
        }
        if (channel.description) {
            //Translate description content
            channel.descriptionHTML = await this.quillService.translateContent(channel.description);
            //Generate markdown
            channel.descriptionMarkdown = await this.quillService.generateMarkdown(channel.description);
        }
        if (channel.license) {
            //Translate description content
            channel.licenseHTML = await this.quillService.translateContent(channel.license);
            //Generate markdown
            channel.licenseMarkdown = await this.quillService.generateMarkdown(channel.license);
        }
        //Validate
        let errors = await (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.validate)(channel, {
            forbidUnknownValues: true,
            whitelist: true
        });
        if (errors.length > 0) {
            throw new _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_2__.ValidationException(errors);
        }
        return this.channelRepository.put(channel);
    }
    async list(limit, skip) {
        return this.channelRepository.list(limit, skip);
    }
    async delete(channel) {
        await this.schemaService.dropChannel(channel._id);
        await this.channelRepository.delete(channel);
    }
    async countItemsByChannel(channelId) {
        let queryCache;
        try {
            queryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${channelId}`);
        }
        catch (ex) { }
        let tokenIdStats = queryCache?.result;
        return tokenIdStats?.count ? tokenIdStats.count : 0;
    }
    async exportContractMetadata(channel, ownerAddress) {
        let result = {
            name: channel.title,
            description: channel.descriptionMarkdown,
            external_link: channel.link,
            seller_fee_basis_points: 0,
            fee_recipient: ownerAddress,
            license: channel.license
        };
        if (channel.coverImageId) {
            let coverImage = await this.imageService.get(channel.coverImageId);
            result.image = `ipfs://${coverImage.cid}`;
        }
        return result;
    }
    // async pin(pinningApi:PinningApi, channel:Channel) {
    //   let result = await this.pinningService.pinByHash(pinningApi, channel)
    //   if (!result.ipfsHash) throw new Error("Problem publishing")
    //   //Get the ID of the Pinata deploy job and update the channel
    //   channel = await this.get(channel._id)
    //   channel.pinJobId = result.id 
    //   channel.pinJobStatus = result.status 
    //   channel.publishedCid = result.ipfsHash
    //   await this.put(channel)
    // }
    async buildAttributeCounts(channelId) {
        let attributeCounts = await this.itemService.getAttributeCountByChannel(channelId);
        for (let attributeCount of attributeCounts) {
            let ac;
            let attributeCountId = `${channelId}-${attributeCount.traitType}-${attributeCount.value}`;
            try {
                ac = await this.attributeCountService.get(attributeCountId);
            }
            catch (ex) { }
            if (!ac) {
                ac = new _dto_attribute_js__WEBPACK_IMPORTED_MODULE_3__.AttributeCount();
            }
            // console.log(ac)
            await this.attributeCountService.put(Object.assign(ac, attributeCount));
        }
    }
    async getGitProviderCredentials(channel, settings) {
        //If it's "default" or blank then look at the global default
        if (!channel.gitProvider || channel.gitProvider == "default") {
            if (settings.defaultGitProvider) {
                return settings.gitProviders[settings.defaultGitProvider];
            }
            else {
                if (settings.gitProviders && settings.gitProviders['github']) {
                    return settings.gitProviders['github'];
                }
            }
        }
        //Check if the channel has a specific one set.
        if (channel.gitProvider) {
            return settings.gitProviders[channel.gitProvider];
        }
    }
};
ChannelService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_4__.injectable)(),
    __metadata("design:paramtypes", [_repository_channel_repository_js__WEBPACK_IMPORTED_MODULE_5__.ChannelRepository,
        _image_service_js__WEBPACK_IMPORTED_MODULE_6__.ImageService,
        _item_service_js__WEBPACK_IMPORTED_MODULE_7__.ItemService,
        _quill_service_js__WEBPACK_IMPORTED_MODULE_8__.QuillService,
        _core_schema_service_js__WEBPACK_IMPORTED_MODULE_9__.SchemaService,
        _core_query_cache_service_js__WEBPACK_IMPORTED_MODULE_10__.QueryCacheService,
        _attribute_count_service_js__WEBPACK_IMPORTED_MODULE_11__.AttributeCountService])
], ChannelService);



/***/ }),

/***/ "./src/admin/service/core/container-service.ts":
/*!*****************************************************!*\
  !*** ./src/admin/service/core/container-service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContainerService: () => (/* binding */ ContainerService)
/* harmony export */ });
/* harmony import */ var _inversify_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../inversify.config.js */ "./src/admin/inversify.config.ts");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types.js */ "./src/admin/service/core/types.ts");


class ContainerService {
    static getInstance(clazz) {
        return _inversify_config_js__WEBPACK_IMPORTED_MODULE_0__.container.get(clazz);
    }
    static getContainer() {
        return _inversify_config_js__WEBPACK_IMPORTED_MODULE_0__.container;
    }
    static getWalletService() {
        return _inversify_config_js__WEBPACK_IMPORTED_MODULE_0__.container.get(_types_js__WEBPACK_IMPORTED_MODULE_1__["default"].WalletService);
    }
}



/***/ }),

/***/ "./src/admin/service/core/database-service.ts":
/*!****************************************************!*\
  !*** ./src/admin/service/core/database-service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatabaseService: () => (/* binding */ DatabaseService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

let DatabaseService = class DatabaseService {
    pouchPrefix;
    PouchDB;
    dbCache = {};
    constructor(pouchPrefix, PouchDB) {
        this.pouchPrefix = pouchPrefix;
        this.PouchDB = PouchDB;
    }
    async getDatabase(name, changesets) {
        let PouchDB = this.PouchDB();
        const fullName = `${this.pouchPrefix}-large-${name}`;
        if (this.dbCache[fullName])
            return this.dbCache[fullName];
        //Create or open database
        this.dbCache[fullName] = new PouchDB(fullName, { auto_compaction: true });
        const details = await this.dbCache[fullName].info();
        //Check if it's a brand new database
        let isEmpty = details.doc_count == 0 && details.update_seq == 0;
        //If it's empty build the indexes
        if (isEmpty) {
            //Create indexes
            if (changesets) {
                console.log(`Creating indexes for ${fullName}`);
                let localChangesets = {
                    _id: "_local/changesets",
                    ids: []
                };
                for (let changeset of changesets) {
                    await changeset.changeset(this.dbCache[fullName]);
                    localChangesets.ids.push(changeset.id);
                    console.log(`New changeset detected...${changeset.id}`);
                }
                //Mark changesets as run
                await this.dbCache[fullName].put(localChangesets);
            }
        }
        else {
            //Otherwise check if each changeset has been applied and if not then apply it.
            if (changesets) {
                let localChangesets;
                try {
                    localChangesets = await this.dbCache[fullName].get("_local/changesets");
                }
                catch (ex) { }
                if (!localChangesets) {
                    localChangesets = {
                        _id: "_local/changesets",
                        ids: []
                    };
                }
                let updated = false;
                for (let changeset of changesets) {
                    //If it hasn't been run then run it.
                    if (!localChangesets.ids.includes(changeset.id)) {
                        try {
                            //Execute the changes. This could fail if the changes have actually been applied but it wasn't marked. 
                            //But in that scenario we just accept the failure and mark it applied. 
                            await changeset.changeset(this.dbCache[fullName]);
                        }
                        catch (ex) { }
                        localChangesets.ids.push(changeset.id);
                        updated = true;
                        console.log(`New changeset detected...${changeset.id}`);
                    }
                }
                if (updated) {
                    console.log(`Saving changeset log...`, localChangesets);
                    await this.dbCache[fullName].put(localChangesets);
                }
            }
        }
        return this.dbCache[fullName];
    }
    async getEmptyDatabase(name) {
        let PouchDB = this.PouchDB();
        const fullName = `${this.pouchPrefix}-large-${name}`;
        //Create or open database
        this.dbCache[fullName] = new PouchDB(fullName, { auto_compaction: true });
        return this.dbCache[fullName];
    }
    async getLatestRevision(db, _id) {
        let latest;
        try {
            latest = await db.get(_id);
        }
        catch (ex) { }
        if (latest)
            return latest;
        let results = await db.allDocs({ key: _id, include_docs: true, deleted: 'ok' });
        if (results.rows?.length > 0) {
            //Return a deleted representation
            let result = {
                _id: _id,
                _rev: results.rows[0].value.rev,
                _deleted: true
            };
            return result;
        }
    }
};
DatabaseService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("pouch-prefix")),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('PouchDB')),
    __metadata("design:paramtypes", [String, Object])
], DatabaseService);



/***/ }),

/***/ "./src/admin/service/core/deploy-service.ts":
/*!**************************************************!*\
  !*** ./src/admin/service/core/deploy-service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeployService: () => (/* binding */ DeployService)
/* harmony export */ });
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/utils/units.js");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/contract/factory.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var _channel_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../channel-service.js */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types.js */ "./src/admin/service/core/types.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




let DeployService = class DeployService {
    channelService;
    walletService;
    contracts;
    constructor(channelService, walletService, contracts) {
        this.channelService = channelService;
        this.walletService = walletService;
        this.contracts = contracts;
    }
    async deployContract(channel) {
        if (!channel.publishReaderIPFSStatus?.cid) {
            throw new Error("Not published to IPFS");
        }
        let count = await this.channelService.countItemsByChannel(channel._id);
        if (count <= 0) {
            throw new Error("No NFTs");
        }
        //Deploy contract
        let mintPriceWei = ethers__WEBPACK_IMPORTED_MODULE_0__.parseUnits(channel.mintPrice, 'ether');
        let receipt = await this.deploy(channel.title, channel.symbol, channel.publishReaderIPFSStatus?.cid, mintPriceWei.toString(), count);
        //Update address locally
        channel.contractAddress = receipt.contractAddress;
        channel.showActivityPage = true;
        channel.showMintPage = true;
        await this.channelService.put(channel);
    }
    async deploy(name, symbol, ipfsCid, mintFee, maxTokenId) {
        if (!name || !symbol || !mintFee || !maxTokenId || !ipfsCid)
            throw new Error("Missing inputs to deploy");
        let wallet = this.walletService.wallet;
        if (!wallet)
            throw new Error("No wallet!");
        const c = this.contracts['Channel'];
        const factory = new ethers__WEBPACK_IMPORTED_MODULE_1__.ContractFactory(c.abi, c.bytecode, wallet);
        let contract = await factory.deploy(name, symbol, ipfsCid, BigInt(mintFee.toString()), BigInt(maxTokenId.toString()));
        return contract.deploymentTransaction().wait();
    }
};
DeployService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)(_types_js__WEBPACK_IMPORTED_MODULE_4__["default"].WalletService)),
    __param(2, (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)("contracts")),
    __metadata("design:paramtypes", [_channel_service_js__WEBPACK_IMPORTED_MODULE_5__.ChannelService, Object, Object])
], DeployService);



/***/ }),

/***/ "./src/admin/service/core/erc-event-service.ts":
/*!*****************************************************!*\
  !*** ./src/admin/service/core/erc-event-service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERCEventService: () => (/* binding */ ERCEventService)
/* harmony export */ });
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/hash/id.js");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/utils/data.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types.js */ "./src/admin/service/core/types.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



let ERCEventService = class ERCEventService {
    walletService;
    constructor(walletService) {
        this.walletService = walletService;
    }
    async getMintEventsForContract(contract) {
        //@ts-ignore
        let startBlock = 0;
        //@ts-ignore
        let endBlock = await this.walletService.provider.getBlockNumber();
        console.log(`Fetching mint transfers...`);
        let events = [];
        let eventResult = {
            endBlock: endBlock,
            events: []
        };
        do {
            eventResult = await this.getEvents(contract, startBlock, endBlock);
            events.push(...eventResult.events);
            console.log(`...fetched batch of ${eventResult.events?.length} from ${startBlock} to ${eventResult.endBlock} of ${endBlock}`);
            startBlock = eventResult.endBlock;
        } while (eventResult.endBlock < endBlock);
        console.log(`Found ${events.length} events`);
        return events;
    }
    async getEvents(contract, startBlock, endBlock) {
        let events = [];
        let tryAgain = true;
        while (tryAgain) {
            try {
                events = await contract.queryFilter([
                    ethers__WEBPACK_IMPORTED_MODULE_0__.id("Transfer(address,address,uint256)"),
                    ethers__WEBPACK_IMPORTED_MODULE_1__.zeroPadValue("0x0000000000000000000000000000000000000000", 32)
                ], startBlock, endBlock);
                tryAgain = false;
            }
            catch (ex) {
                //Catch the error with their suggested range and try it again.
                let message = ex?.error?.message;
                let startEnd = message.substring(message.indexOf('[') + 1, message.indexOf(']'))?.split(',');
                if (startEnd?.length > 1) {
                    endBlock = parseInt(startEnd[1]);
                }
                else {
                    endBlock = startBlock; //Make sure to say we didn't do anything.
                    tryAgain = false;
                }
            }
        }
        return {
            events: events,
            endBlock: endBlock
        };
    }
    async getTokensForContract(contract) {
        let events = await this.getMintEventsForContract(contract);
        let tokens = events.map(e => Number(BigInt(e.topics[3]))).sort((a, b) => a - b);
        return new Set(tokens);
    }
};
ERCEventService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)(_types_js__WEBPACK_IMPORTED_MODULE_4__["default"].WalletService)),
    __metadata("design:paramtypes", [Object])
], ERCEventService);



/***/ }),

/***/ "./src/admin/service/core/export-service.ts":
/*!**************************************************!*\
  !*** ./src/admin/service/core/export-service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExportService: () => (/* binding */ ExportService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _service_item_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/item-service.js */ "./src/admin/service/item-service.ts");
/* harmony import */ var _service_author_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/author-service.js */ "./src/admin/service/author-service.ts");
/* harmony import */ var _service_theme_service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../service/theme-service.js */ "./src/admin/service/theme-service.ts");
/* harmony import */ var _service_static_page_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../service/static-page-service.js */ "./src/admin/service/static-page-service.ts");
/* harmony import */ var _service_image_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/image-service.js */ "./src/admin/service/image-service.ts");
/* harmony import */ var _service_animation_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../service/animation-service.js */ "./src/admin/service/animation-service.ts");
/* harmony import */ var _original_metadata_service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../original-metadata-service.js */ "./src/admin/service/original-metadata-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let ExportService = class ExportService {
    itemService;
    authorService;
    themeService;
    imageService;
    animationService;
    originalMetadataService;
    staticPageService;
    constructor(itemService, authorService, themeService, imageService, animationService, originalMetadataService, staticPageService) {
        this.itemService = itemService;
        this.authorService = authorService;
        this.themeService = themeService;
        this.imageService = imageService;
        this.animationService = animationService;
        this.originalMetadataService = originalMetadataService;
        this.staticPageService = staticPageService;
    }
    async prepareExport(originalChannel, ownerAddress) {
        //Clone
        let channel = await this.getExportChannel(originalChannel);
        //Get author
        let author = await this.getExportAuthor(originalChannel.authorId);
        let items = await this.itemService.listByChannel(originalChannel._id, 100000, 0);
        //Assign  
        let imageCids = [];
        let animationCids = [];
        //Add cover image
        if (channel.coverImageId?.length > 0) {
            imageCids.push(channel.coverImageId);
        }
        //Add banner image
        if (channel.coverBannerId?.length > 0) {
            imageCids.push(channel.coverBannerId);
        }
        //Add author image
        if (author?.coverPhotoId?.length > 0) {
            imageCids.push(author.coverPhotoId);
        }
        //Gather NFT data
        for (let item of items) {
            //Build animation URL if we have content
            if (item.animationId && !item.coverImageAsAnimation) {
                animationCids.push(item.animationId);
            }
            imageCids.push(...this.getImageCidsByItem(item));
        }
        //Look up all the images
        imageCids = [...new Set(imageCids)]; //deduplicate
        animationCids = [...new Set(animationCids)]; //deduplicate
        return {
            animationCids: animationCids,
            imageCids: imageCids,
            channel: channel,
            author: author,
            items: items,
            themeIds: await this.themeService.getIds(),
            staticPageIds: await this.staticPageService.getIds(),
            ownerAddress: ownerAddress
        };
    }
    async createBackup(exportBundle) {
        let author = exportBundle.author;
        let channel = this.getBackupChannel(exportBundle.channel, exportBundle.items.length);
        let authors = [];
        if (author) {
            authors.push(author);
        }
        let items = await this.getBackupItems(exportBundle.items);
        let themes = await this.getBackupThemes(exportBundle.themeIds);
        let staticPages = await this.getBackupStaticPages(exportBundle.staticPageIds);
        let images = await this.getBackupImages(exportBundle.imageCids);
        let animations = await this.getBackupAnimations(exportBundle.animationCids);
        let originalMetadata = await this.getBackupOriginalMetadata(exportBundle.items.filter(i => i.originalJSONMetadataId != undefined).map(i => i.originalJSONMetadataId));
        //Save pouch dbs
        return {
            channels: [channel],
            authors: authors,
            items: items,
            themes: themes,
            staticPages: staticPages,
            images: images,
            animations: animations,
            originalMetadata: originalMetadata,
            itemCount: exportBundle.items.length,
            themeCount: exportBundle.themeIds.length,
            staticPageCount: exportBundle.staticPageIds.length,
            imageCount: exportBundle.imageCids.length,
            animationCount: exportBundle.animationCids.length
        };
    }
    getImageCidsByItem(item) {
        let imageCids = [];
        //Add cover image
        if (item.coverImageId?.length > 0) {
            imageCids.push(item.coverImageId);
        }
        //Get images in post content
        if (item.content?.ops) {
            for (let op of item.content.ops) {
                if (op.insert && op.insert.ipfsimage && op.insert.ipfsimage?.cid?.length > 0) {
                    imageCids.push(op.insert.ipfsimage.cid);
                }
            }
        }
        return imageCids;
    }
    getImageCidsByStaticPage(staticPage) {
        let imageCids = [];
        //Get images in post content
        if (staticPage.content?.ops) {
            for (let op of staticPage.content.ops) {
                if (op.insert && op.insert.ipfsimage && op.insert.ipfsimage?.cid?.length > 0) {
                    imageCids.push(op.insert.ipfsimage.cid);
                }
            }
        }
        return imageCids;
    }
    async getExportChannel(originalChannel) {
        let channel = JSON.parse(JSON.stringify(originalChannel));
        //Remove publishing related field from channel
        delete channel.contractAddress;
        delete channel.pinJobId;
        delete channel.pinJobStatus;
        delete channel.pubDate;
        delete channel.publishReaderRepoId;
        delete channel.publishReaderRepoPath;
        delete channel.publishReaderRepoBranch;
        delete channel.publishReaderRepoStatus;
        delete channel.publishReaderIPFSStatus;
        delete channel.productionHostname;
        delete channel.productionBaseLibraryURI;
        delete channel.productionBaseURI;
        delete channel.showMintPage;
        delete channel.showActivityPage;
        delete channel.marketplaces;
        delete channel.externalLinks;
        delete channel.importSuccess;
        delete channel.lastUpdated;
        delete channel._rev;
        delete channel["_rev_tree"];
        return channel;
    }
    async getExportAuthor(authorId) {
        let author;
        try {
            author = await this.authorService.get(authorId);
        }
        catch (ex) { }
        if (author) {
            author = JSON.parse(JSON.stringify(author));
            delete author._rev;
            delete author.lastUpdated;
            delete author["_rev_tree"];
        }
        return author;
    }
    prepareTheme(theme) {
        delete theme._rev;
        delete theme["_rev_tree"];
        return JSON.parse(JSON.stringify(theme));
    }
    prepareStaticPage(staticPage) {
        delete staticPage._rev;
        delete staticPage["_rev_tree"];
        return JSON.parse(JSON.stringify(staticPage));
    }
    prepareItem(item) {
        //Delete publishing related fields
        delete item._rev;
        delete item.lastUpdated;
        delete item["_rev_tree"];
        return JSON.parse(JSON.stringify(item));
    }
    getBackupChannel(exportChannel, itemCount) {
        let channel = JSON.parse(JSON.stringify(exportChannel));
        //If we're exporting an existing collection delete the "forkedBy" fields
        if (channel.forkType == "existing") {
            delete channel.forkType;
            delete channel.forkedFromCid;
            delete channel.forkedFromFeeRecipient;
            delete channel.forkedFromId;
        }
        //Add itemCount to channel
        channel['itemCount'] = itemCount;
        return channel;
    }
    async getBackupThemes(themeIds) {
        let themes = [];
        for (let themeId of themeIds) {
            themes.push(this.prepareTheme(await this.themeService.get(themeId)));
        }
        return themes;
    }
    async getBackupStaticPages(staticPageIds) {
        let staticPages = [];
        for (let staticPageId of staticPageIds) {
            staticPages.push(this.prepareStaticPage(await this.staticPageService.get(staticPageId)));
        }
        return staticPages;
    }
    async getBackupItems(theItems) {
        let items = [];
        let counter = 0;
        for (let theItem of theItems) {
            let item = this.prepareItem(theItem);
            //Remove the image src data from the content. Will restore from local copy when importing.
            //Reduce backup filesize
            if (item.content?.ops?.length > 0) {
                let ops = [];
                for (let op of item.content.ops) {
                    if (op.insert && op.insert.ipfsimage) {
                        delete op.insert.ipfsimage.src;
                    }
                    ops.push(op);
                }
                item.content.ops = ops;
            }
            items.push(item);
            counter++;
            console.log(`Processing token #${item.tokenId} ${counter}/${theItems.length}`);
        }
        console.log(`Tokens processed`);
        return items;
    }
    async getBackupImages(imageIds) {
        let images = [];
        let counter = 0;
        for (let imageId of imageIds) {
            let image = await this.imageService.get(imageId);
            let clonedImage = JSON.parse(JSON.stringify(image));
            //Remove publishing related field from image
            delete clonedImage._rev;
            delete clonedImage["_rev_tree"];
            delete clonedImage.buffer;
            delete clonedImage.svg;
            images.push(clonedImage);
            counter++;
            console.log(`Processing image #${clonedImage._id} ${counter}/${imageIds.length}`);
        }
        console.log(`Images processed`);
        return images;
    }
    async getBackupAnimations(animationIds) {
        let animations = [];
        let counter = 0;
        for (let animationId of animationIds) {
            let animation = await this.animationService.get(animationId);
            let clonedAnimation = JSON.parse(JSON.stringify(animation));
            //Remove publishing related field from image
            delete clonedAnimation._rev;
            delete clonedAnimation["_rev_tree"];
            delete clonedAnimation.content;
            animations.push(clonedAnimation);
            counter++;
            console.log(`Processing animation #${clonedAnimation._id} ${counter}/${animationIds.length}`);
        }
        console.log(`Animations processed`);
        return animations;
    }
    async getBackupOriginalMetadata(originalMetadataIds) {
        let originalMetadatas = [];
        let counter = 0;
        for (let originalMetadataId of originalMetadataIds) {
            let originalMetadata = await this.originalMetadataService.get(originalMetadataId);
            let clonedMetadata = JSON.parse(JSON.stringify(originalMetadata));
            //Remove publishing related field from
            delete clonedMetadata._rev;
            delete clonedMetadata["_rev_tree"];
            originalMetadatas.push(clonedMetadata);
            counter++;
            console.log(`Processing original metadata #${clonedMetadata._id} ${counter}/${originalMetadataIds.length}`);
        }
        console.log(`Original metadata processed`);
        return originalMetadatas;
    }
};
ExportService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(),
    __metadata("design:paramtypes", [_service_item_service_js__WEBPACK_IMPORTED_MODULE_1__.ItemService,
        _service_author_service_js__WEBPACK_IMPORTED_MODULE_2__.AuthorService,
        _service_theme_service_js__WEBPACK_IMPORTED_MODULE_3__.ThemeService,
        _service_image_service_js__WEBPACK_IMPORTED_MODULE_4__.ImageService,
        _service_animation_service_js__WEBPACK_IMPORTED_MODULE_5__.AnimationService,
        _original_metadata_service_js__WEBPACK_IMPORTED_MODULE_6__.OriginalMetadataService,
        _service_static_page_service_js__WEBPACK_IMPORTED_MODULE_7__.StaticPageService])
], ExportService);



/***/ }),

/***/ "./src/admin/service/core/git-service.ts":
/*!***********************************************!*\
  !*** ./src/admin/service/core/git-service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GitService: () => (/* binding */ GitService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _settings_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings-service.js */ "./src/admin/service/core/settings-service.ts");
/* harmony import */ var _gitlab_service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gitlab-service.js */ "./src/admin/service/core/gitlab-service.ts");
/* harmony import */ var _channel_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../channel-service.js */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _github_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./github-service.js */ "./src/admin/service/core/github-service.ts");
/* harmony import */ var _schema_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./schema-service.js */ "./src/admin/service/core/schema-service.ts");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//@ts-ignore




//TODO: Refactor this so we're not specifically switching between github and gitlab 
//Inject the proper service and then call the method on it. This will make it easier to add more 
//providers later.
let GitService = class GitService {
    settingsService;
    channelService;
    gitlabService;
    githubService;
    schemaService;
    fs;
    repoURI;
    defaultBranch;
    constructor(settingsService, channelService, gitlabService, githubService, schemaService) {
        this.settingsService = settingsService;
        this.channelService = channelService;
        this.gitlabService = gitlabService;
        this.githubService = githubService;
        this.schemaService = schemaService;
    }
    async deployReader(channel) {
        //Delete all existing files from the repo
        this.logPublishProgress(`Deploying reader...`);
        let settings = await this.settingsService.get();
        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings);
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`);
        }
        let gitActions = [];
        this.logPublishProgress(`Creating channel backup...`);
        let backup = await this.schemaService.backupChannel();
        gitActions.push({
            action: "create",
            file_path: `/.upload/channel.json`,
            content: Buffer.from(JSON.stringify(backup.channel))
        });
        gitActions.push({
            action: "create",
            file_path: `/.upload/items.json`,
            content: Buffer.from(JSON.stringify(backup.items))
        });
        gitActions.push({
            action: "create",
            file_path: `/.upload/originalMetadata.json`,
            content: Buffer.from(JSON.stringify(backup.originalMetadata))
        });
        gitActions.push({
            action: "create",
            file_path: `/.upload/authors.json`,
            content: Buffer.from(JSON.stringify(backup.authors))
        });
        gitActions.push({
            action: "create",
            file_path: `/.upload/themes.json`,
            content: Buffer.from(JSON.stringify(backup.themes))
        });
        gitActions.push({
            action: "create",
            file_path: `/.upload/staticPages.json`,
            content: Buffer.from(JSON.stringify(backup.staticPages))
        });
        gitActions.push({
            action: "create",
            file_path: `/.upload/attributeCounts.json`,
            content: Buffer.from(JSON.stringify(backup.attributeCounts))
        });
        this.logPublishProgress(`Packaging ${backup.images?.length} images...`);
        let i = 0;
        for (let image of backup.images) {
            if (image.buffer instanceof ArrayBuffer) {
                image.buffer = new Uint8Array(image.buffer);
            }
            gitActions.push({
                action: "create",
                file_path: `/.upload/images/${i}.json`,
                content: Buffer.from(JSON.stringify(image))
            });
            i++;
        }
        this.logPublishProgress(`Packaging ${backup.animations?.length} animations...`);
        i = 0;
        for (let animation of backup.animations) {
            gitActions.push({
                action: "create",
                file_path: `/.upload/animations/${i}.json`,
                content: Buffer.from(JSON.stringify(animation))
            });
            i++;
        }
        switch (gitProvider.name) {
            case "gitlab":
                await this.gitlabService.createVariables(channel);
                await this.gitlabService.deleteReaderBackup(channel, gitProvider);
                return this.gitlabService.commit(channel, gitActions, gitProvider);
            case "github":
                await this.githubService.createVariables(channel);
                await this.githubService.deleteReaderBackup(channel, gitProvider);
                return this.githubService.commit(channel, gitActions, gitProvider);
        }
        //Commit 
        this.logPublishProgress(`Export to git complete`);
    }
    async deployReaderContract(channel, gitActions) {
        //Delete all existing files from the repo
        // this.logPublishProgress(`Deploying reader contract...`)
        let settings = await this.settingsService.get();
        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings);
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`);
        }
        switch (gitProvider.name) {
            case "gitlab":
                await this.gitlabService.deleteContractBackup(channel, gitProvider);
                return this.gitlabService.commit(channel, gitActions, gitProvider);
            case "github":
                // await this.githubService.deleteContractBackup(channel, gitProvider)
                return this.githubService.commit(channel, gitActions, gitProvider);
        }
        //Commit 
        this.logPublishProgress(`Export to git complete`);
    }
    async getExistingFork(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings);
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`);
        }
        switch (gitProvider.name) {
            case "gitlab":
                return this.gitlabService.getExistingFork(channel);
            case "github":
                return this.githubService.getExistingFork(channel);
        }
    }
    async createFork(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings);
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`);
        }
        switch (gitProvider.name) {
            case "gitlab":
                return this.gitlabService.createFork(channel);
            case "github":
                return this.githubService.createFork(channel);
        }
    }
    async createVariables(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings);
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`);
        }
        switch (gitProvider.name) {
            case "gitlab":
                return this.gitlabService.createVariables(channel);
            case "github":
                return this.githubService.createVariables(channel);
        }
    }
    async getForkRepoStatus(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings);
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`);
        }
        switch (gitProvider.name) {
            case "gitlab":
                return this.gitlabService.getForkRepoStatus(channel);
            case "github":
                return this.githubService.getForkRepoStatus(channel);
        }
    }
    async getIPFSActionStatus(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings);
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`);
        }
        switch (gitProvider.name) {
            case "gitlab":
                return this.gitlabService.getIPFSActionStatus(channel);
            case "github":
                return this.githubService.getIPFSActionStatus(channel);
        }
    }
    async getIPFSActionResult(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings);
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`);
        }
        switch (gitProvider.name) {
            case "gitlab":
                return this.gitlabService.getIPFSActionResult(channel);
            case "github":
                return this.githubService.getIPFSActionResult(channel);
        }
    }
    // async getProductionURIInfo(channel: Channel) : Promise<any> {
    //     let settings = await this.settingsService.get()
    //     let gitProvider
    //     //If it's "default" or blank then look at the global default
    //     if (!channel.gitProvider || channel.gitProvider == "default") {
    //         if (settings.defaultGitProvider) {
    //             gitProvider = settings.defaultGitProvider
    //         } else {
    //             gitProvider = "github"
    //         }
    //     } else {
    //         gitProvider = channel.gitProvider
    //     }
    //     switch(gitProvider) {
    //         case "gitlab":
    //             return this.gitlabService.getProductionURIInfo(channel)
    //         case "github":
    //             return this.githubService.getProductionURIInfo(channel)
    //     }
    // }
    logPublishProgress(message) {
        console.log(message);
        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
            // browser
            const imageSelectedEvent = new CustomEvent('publish-progress', {
                detail: { message: message }
            });
            document.dispatchEvent(imageSelectedEvent);
        }
    }
    chunkArrayByBytes(items, chunkSizeBytes) {
        let chunks = [];
        //First create a map with the size of each item
        let itemSizes = {};
        items.forEach(item => {
            itemSizes[item._id] = Buffer.byteLength(JSON.stringify(item), 'utf8');
            console.log(item);
            if (itemSizes[item._id] > chunkSizeBytes) {
                throw new Error(`Image larger than 15MB found. Upload can not proceed.`);
            }
        });
        let currentChunk = [];
        let currentChunkSize = 0;
        for (let item of items) {
            //If this one would put us over the limit, create a new chunk
            if (currentChunkSize + itemSizes[item._id] >= chunkSizeBytes) {
                chunks.push(currentChunk);
                currentChunk = [];
                currentChunkSize = 0;
            }
            currentChunk.push(item);
            currentChunkSize += itemSizes[item._id];
        }
        //If there's anything in the last chunk then add it
        if (currentChunk.length > 0) {
            chunks.push(currentChunk);
        }
        return chunks;
    }
};
GitService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(),
    __metadata("design:paramtypes", [_settings_service_js__WEBPACK_IMPORTED_MODULE_1__.SettingsService,
        _channel_service_js__WEBPACK_IMPORTED_MODULE_2__.ChannelService,
        _gitlab_service_js__WEBPACK_IMPORTED_MODULE_3__.GitlabService,
        _github_service_js__WEBPACK_IMPORTED_MODULE_4__.GithubService,
        _schema_service_js__WEBPACK_IMPORTED_MODULE_5__.SchemaService])
], GitService);



/***/ }),

/***/ "./src/admin/service/core/github-service.ts":
/*!**************************************************!*\
  !*** ./src/admin/service/core/github-service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GithubService: () => (/* binding */ GithubService)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libsodium-wrappers */ "./node_modules/libsodium-wrappers/dist/modules/libsodium-wrappers.js");
/* harmony import */ var libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _settings_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings-service.js */ "./src/admin/service/core/settings-service.ts");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GithubService_1;




let GithubService = class GithubService {
    static { GithubService_1 = this; }
    settingsService;
    dayjs;
    static BASE_URL = 'https://api.github.com';
    static GRAPHQL_URL = 'https://api.github.com/graphql';
    static READER_REPO_OWNER = "LargeNFT";
    static READER_REPO = "large-reader";
    constructor(settingsService, dayjs) {
        this.settingsService = settingsService;
        this.dayjs = dayjs;
    }
    async createFork(channel) {
        console.log(`Creating reader fork...`);
        let settings = await this.settingsService.get();
        let gitProvider = settings.gitProviders["github"];
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        //Look for an existing fork and just return it.
        let existingFork = await this.getExistingFork(channel);
        if (existingFork)
            return existingFork;
        let url = `${GithubService_1.BASE_URL}/repos/${GithubService_1.READER_REPO_OWNER}/${GithubService_1.READER_REPO}/generate`;
        //Create a new one
        let response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(url, {
            owner: gitProvider.username,
            name: this.getBranchName(channel),
            include_all_branches: false,
            'private': true
        }, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
        let repoInfo = response.data;
        return {
            id: repoInfo.id,
            httpUrlToRepo: repoInfo.html_url,
            path: repoInfo.name,
            branch: "master"
        };
    }
    async createVariables(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = settings.gitProviders["github"];
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        //Alchemy
        if (settings.alchemyKey) {
            //Create
            await this._createVariable(channel, gitProvider, "ALCHEMY_API_KEY", settings.alchemyKey);
        }
    }
    async _createVariable(channel, gitProvider, key, value) {
        let theUrl = `${GithubService_1.BASE_URL}/repos/${gitProvider.username}/${this.getBranchName(channel)}/actions/secrets/public-key`;
        //Update
        let publicKeyResponse = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(theUrl, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
        const secret = value; // replace with the secret you want to encrypt
        let publicKey = publicKeyResponse.data;
        await (libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default().ready);
        // Convert Secret & Base64 key to Uint8Array.
        let binkey = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default().from_base64(publicKey.key, (libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default().base64_variants).ORIGINAL);
        let binsec = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default().from_string(secret);
        //Encrypt the secret using LibSodium
        let encBytes = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default().crypto_box_seal(binsec, binkey);
        // Convert encrypted Uint8Array to Base64
        let encryptedValue = libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default().to_base64(encBytes, (libsodium_wrappers__WEBPACK_IMPORTED_MODULE_0___default().base64_variants).ORIGINAL);
        let url = `${GithubService_1.BASE_URL}/repos/${gitProvider.username}/${this.getBranchName(channel)}/actions/secrets/${key}`;
        //Update
        return axios__WEBPACK_IMPORTED_MODULE_1__["default"].put(url, {
            key_id: publicKey.key_id,
            encrypted_value: encryptedValue,
        }, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
    }
    async getExistingFork(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = settings.gitProviders["github"];
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        try {
            let url = `${GithubService_1.BASE_URL}/repos/${gitProvider.username}/${this.getBranchName(channel)}`;
            let response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(url, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            });
            let repoInfo = response.data;
            if (repoInfo.id) {
                return {
                    id: repoInfo.id,
                    httpUrlToRepo: repoInfo.html_url,
                    path: repoInfo.name,
                    branch: "master"
                };
            }
        }
        catch (ex) { }
    }
    async getForkRepoStatus(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = settings.gitProviders["github"];
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        let existingFork = await this.getExistingFork(channel);
        if (existingFork) {
            return "finished";
        }
        return "pending";
    }
    async commit(channel, actions, gitProvider) {
        let total = 0;
        let chunks = this.chunkIt(actions, 100);
        let latestCommit;
        for (const [i, chunk] of chunks.entries()) {
            total += chunk.length;
            this.logPublishProgress(`Commiting reader data for ${channel.title} to GitHub: committing ${chunk.length} actions. ${total} / ${actions.length}`);
            let oid = await this.getMostRecentCommitOid(channel, gitProvider);
            const additions = chunk.map((a) => {
                return {
                    path: a.file_path.slice(1),
                    contents: Buffer.from(a.content).toString('base64')
                };
            });
            let headline = "";
            if (i === chunks.length - 1) {
                headline = `Commiting reader data complete`;
            }
            else {
                headline = `Commiting reader data for ${channel.title}`;
            }
            const mutation = `
                mutation createCommit($additions: [FileAddition!]!, $oid: GitObjectID!) {
                    createCommitOnBranch (input: {
                        branch : {
                            repositoryNameWithOwner: "${gitProvider.username}/${this.getBranchName(channel)}"
                            branchName: "master"
                        }
                        message: {
                            headline: "${headline}"
                        }
                        fileChanges: {
                            additions: $additions
                        }
                        expectedHeadOid: $oid
                        }) {
                        commit {
                            commitUrl
                        }
                    }
                }
            `;
            const variables = {
                oid: oid,
                additions: additions
            };
            const createCommitResult = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(GithubService_1.GRAPHQL_URL, {
                query: mutation,
                variables: variables
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            });
            latestCommit = createCommitResult.data.data.createCommitOnBranch.commit.commitUrl.split("/").pop();
            this.logPublishProgress(`Commit successful: ${latestCommit}`);
        }
        return latestCommit;
    }
    async getIPFSActionStatus(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = settings.gitProviders["github"];
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        try {
            let result = await this.getMostRecentActionRun(channel, gitProvider);
            if ((result?.conclusion == "success" || result?.conclusion == "skipped") && (!channel.publishReaderIPFSStatus?.date || this.dayjs(result.created_at).isAfter(this.dayjs(channel.publishReaderIPFSStatus?.date)))) {
                return "finished";
            }
        }
        catch (ex) {
            console.log(ex);
        }
    }
    async getIPFSActionResult(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = settings.gitProviders["github"];
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`);
        }
        try {
            //Get ipfs.json from repo
            const ipfsJsonResults = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`${GithubService_1.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/contents/ipfs/ipfs.json`, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            });
            let result = JSON.parse(Buffer.from(ipfsJsonResults.data.content, 'base64').toString());
            result.archive = `${channel.httpUrlToRepo}/blob/master/ipfs/${result.cid}.car`;
            return result;
        }
        catch (ex) {
            console.log(ex);
        }
    }
    async getMostRecentActionRun(channel, gitProvider) {
        if (!channel.publishReaderIPFSStatus?.headSha)
            return;
        const workflowRunResults = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`${GithubService_1.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/actions/workflows/main.yml/runs?per_page=1&page=1&head_sha=${channel.publishReaderIPFSStatus.headSha}`, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
        if (workflowRunResults.data.workflow_runs?.length > 0) {
            return workflowRunResults.data.workflow_runs[0];
        }
    }
    async createCommit(currentCommitSha, newTreeSha, channel, message, gitProvider) {
        //Create a new commit with this tree
        const createCommitResult = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(`${GithubService_1.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/git/commits`, {
            message: message,
            parents: [currentCommitSha],
            tree: newTreeSha
        }, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
        //Update the branch reference to the new commit
        const updateRefResult = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].patch(`${GithubService_1.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/git/refs/heads/master`, {
            sha: createCommitResult.data.sha
        }, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
    }
    async createTree(baseTreeSha, newTree, channel, gitProvider) {
        let parameters = {
            tree: newTree,
            base_tree: baseTreeSha
        };
        const createTreeResult = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(`${GithubService_1.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/git/trees`, parameters, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`,
                "Accept": "application/vnd.github+json"
            }
        });
        return createTreeResult.data.sha;
    }
    async deleteReaderBackup(channel, gitProvider) {
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        this.logPublishProgress(`Deleting existing files from repo...`);
        await this.deleteDirectory(channel, gitProvider, ".upload");
        this.logPublishProgress(`Successfully deleted existing backup...`);
    }
    async deleteContractBackup(channel, gitProvider) {
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        this.logPublishProgress(`Deleting existing contract files from repo...`);
        await this.deleteDirectory(channel, gitProvider, "backup/contract");
    }
    async getMostRecentCommit(channel, gitProvider) {
        //Get the most recent commit
        let currentCommitResult = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`${GithubService_1.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/commits/master`, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
        return currentCommitResult.data;
    }
    async getMostRecentCommitOid(channel, gitProvider) {
        const query = `
            query GetBranch{
                repository (name: "${this.getBranchName(channel)}", owner: "${gitProvider.username}") {
                    ref (qualifiedName: "master") {
                        target {
                            ... on Commit {
                                history(first: 1) {
                                    nodes {
                                        oid
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;
        const getOidResult = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(GithubService_1.GRAPHQL_URL, JSON.stringify({ query: query }), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            },
        });
        return getOidResult.data.data.repository.ref.target.history.nodes[0].oid;
    }
    async deleteDirectory(channel, gitProvider, directoryPath) {
        const currentCommit = await this.getMostRecentCommit(channel, gitProvider);
        //Get the sha of the tree referenced by the latest commit
        const treeSha = currentCommit.commit.tree.sha;
        //Get that tree
        let treeResult = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`${GithubService_1.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/git/trees/${treeSha}`, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
        let tree = treeResult.data.tree;
        //Filter to the backup folder
        let theDirSha = tree.find(r => r.path == directoryPath)?.sha;
        //If it exists, remove it.
        if (theDirSha) {
            //Get the tree for the backup folder
            let theDirResult = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`${GithubService_1.BASE_URL}/repos/${gitProvider.username}/${channel.publishReaderRepoPath}/git/trees/${theDirSha}`, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                },
                params: { recursive: true }
            });
            let theDirTree = theDirResult.data.tree;
            let theTree = theDirTree
                .filter(({ type }) => type === "blob")
                .map((blob) => {
                return {
                    path: `${directoryPath}/${blob.path}`,
                    mode: blob.mode,
                    type: blob.type,
                    sha: null
                };
            });
            const newTreeSha = await this.createTree(treeSha, theTree, channel, gitProvider);
            await this.createCommit(currentCommit.sha, newTreeSha, channel, `Deleting ${directoryPath}`, gitProvider);
        }
    }
    logPublishProgress(message) {
        console.log(message);
        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
            // browser
            const imageSelectedEvent = new CustomEvent('publish-progress', {
                detail: { message: message }
            });
            document.dispatchEvent(imageSelectedEvent);
        }
    }
    chunkIt(gitActions, perChunk) {
        let chunks = [];
        //Break into rows
        for (let i = 0; i < gitActions.length; i += perChunk) {
            let chunk = gitActions.slice(i, i + perChunk);
            chunks.push(chunk);
        }
        return chunks;
    }
    getBranchName(channel) {
        return channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    }
};
GithubService = GithubService_1 = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)("dayjs")),
    __metadata("design:paramtypes", [_settings_service_js__WEBPACK_IMPORTED_MODULE_4__.SettingsService, Object])
], GithubService);

// private async createBranch(channel, gitProvider) {
//     console.log("Creating branch")
//     let oid = await this.getMostRecentCommitOid(channel, gitProvider)
//     const getRespositoryId = await axios.post(GithubService.GRAPHQL_URL, { 
//         query: `
//             query {
//                 repository(owner: "${gitProvider.username}", name: "large-reader") {
//                     id
//                 }
//             }
//         `
//     }, {
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${gitProvider.personalAccessToken}`
//         }
//     })
//     const mutation = `
//         mutation {
//             createRef(input: {
//                 repositoryId: "${getRespositoryId.data.data.repository.id}",
//                 name: "refs/heads/${this.getBranchName(channel)}",
//                 oid: "${oid}"
//             }) {
//                 ref {
//                     name
//                         target {
//                         oid
//                         }
//                 }
//             }
//         }
//     `
//     const createBranchResult = await axios.post(
//         GithubService.GRAPHQL_URL,
//         {
//             query: mutation,
//         },
//         {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${gitProvider.personalAccessToken}`
//             }
//         }
//     )
//     console.log("Created branch")
// }


/***/ }),

/***/ "./src/admin/service/core/gitlab-service.ts":
/*!**************************************************!*\
  !*** ./src/admin/service/core/gitlab-service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GitlabService: () => (/* binding */ GitlabService)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _settings_service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings-service.js */ "./src/admin/service/core/settings-service.ts");
/* harmony import */ var parse_link_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parse-link-header */ "./node_modules/parse-link-header/index.js");
/* harmony import */ var parse_link_header__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(parse_link_header__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GitlabService_1;




let GitlabService = class GitlabService {
    static { GitlabService_1 = this; }
    settingsService;
    static BASE_URL = 'https://gitlab.com/api/v4';
    static READER_REPO_ID = 15461980;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async createFork(channel) {
        console.log(`Creating reader fork...`);
        let settings = await this.settingsService.get();
        let gitProvider = settings.gitProviders["gitlab"];
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        let url = `${GitlabService_1.BASE_URL}/projects/${GitlabService_1.READER_REPO_ID}/fork`;
        let path = `${channel.title}`.replace(/[^a-z0-9]/gi, '-').toLowerCase();
        //Look for an existing fork and just return it.
        let existingFork = await this.getExistingFork(channel);
        if (existingFork) {
            return {
                id: existingFork.id,
                path: existingFork.path,
                branch: "master"
            };
        }
        //Create a new one
        let response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(url, {
            name: path,
            path: path
        }, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
        return {
            id: response.data.id,
            path: path,
            branch: "master"
        };
    }
    async createVariables(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = settings.gitProviders["gitlab"];
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        //Alchemy
        if (settings.alchemyKey) {
            //Create
            await this._createVariable(channel, gitProvider, "ALCHEMY_API_KEY", settings.alchemyKey);
        }
    }
    async _createVariable(channel, gitProvider, key, value) {
        //First see if it exists.
        let existing = await this._getVariables(channel, gitProvider, key);
        let url = `${GitlabService_1.BASE_URL}/projects/${channel.publishReaderRepoId}/variables`;
        if (existing) {
            //Update
            return axios__WEBPACK_IMPORTED_MODULE_1__["default"].put(`${url}/${key}`, {
                key: key,
                value: value,
                masked: true
            }, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            });
        }
        else {
            return axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(url, {
                key: key,
                value: value,
                masked: true
            }, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            });
        }
    }
    async _getVariables(channel, gitProvider, key) {
        let url = `${GitlabService_1.BASE_URL}/projects/${channel.publishReaderRepoId}/variables/${key}`;
        try {
            let response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(url, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            });
            return response?.data;
        }
        catch (ex) {
        }
    }
    async getExistingFork(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = settings.gitProviders["gitlab"];
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        let url = `${GitlabService_1.BASE_URL}/projects/${GitlabService_1.READER_REPO_ID}/forks`;
        let response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(url, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
        let forks = response.data;
        let path = `${channel.title}`.replace(/[^a-z0-9]/gi, '-').toLowerCase();
        //Search for one with the same path
        let results = forks.filter(f => f.path == path && f.owner.username == gitProvider.username);
        if (results?.length == 1) {
            return {
                id: results[0].id,
                httpUrlToRepo: results[0].http_url_to_repo,
                path: results[0].path,
                branch: results[0].default_branch
            };
        }
    }
    async getForkRepoStatus(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = settings.gitProviders["gitlab"];
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        if (!channel.publishReaderRepoId)
            return;
        let url = `${GitlabService_1.BASE_URL}/projects/${channel.publishReaderRepoId}`;
        let response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(url, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
        return response.data.import_status;
    }
    async getIPFSActionStatus(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = settings.gitProviders["gitlab"];
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        if (!channel.publishReaderRepoId)
            return;
        let jobs = await this.getJobForCommit(channel, gitProvider);
        if (jobs?.length > 0 && jobs[0].status == "success") {
            return "finished";
        }
    }
    async getJobForCommit(channel, gitProvider) {
        let url = `${GitlabService_1.BASE_URL}/projects/${channel.publishReaderRepoId}/jobs`;
        const res = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(url, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
        return res.data?.filter(job => job.commit?.id == channel.publishReaderIPFSStatus.headSha);
    }
    async getIPFSActionResult(channel) {
        let settings = await this.settingsService.get();
        let gitProvider = settings.gitProviders["gitlab"];
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        try {
            let jobs = await this.getJobForCommit(channel, gitProvider);
            let url = `${GitlabService_1.BASE_URL}/projects/${channel.publishReaderRepoId}/jobs/${jobs[0].id}/artifacts/ipfs/ipfs.json`;
            const res = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(url, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            });
            let result = res.data;
            result.archive = `https://gitlab.com/${gitProvider.username}/${channel.publishReaderRepoPath}/-/jobs/${jobs[0].id}/artifacts/file/ipfs/${result.cid}.car`;
            return result;
        }
        catch (ex) {
            console.log(ex);
        }
    }
    async commit(channel, actions, gitProvider) {
        for (let action of actions) {
            action.encoding = "base64";
            action.content = action.content.toString('base64');
        }
        let total = 0;
        let chunks = this.chunkIt(actions, 500);
        for (const [i, chunk] of chunks.entries()) {
            total += chunk.length;
            this.logPublishProgress(`Commiting reader data for ${channel.title} to GitLab: committing ${chunk.length} actions. ${total} / ${actions.length}`);
            let url = `${GitlabService_1.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`;
            let headline;
            if (i === chunks.length - 1) {
                headline = `Commiting reader data complete`;
            }
            else {
                headline = `Commiting reader data for ${channel.title}`;
            }
            const res = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(url, {
                branch: "master",
                commit_message: headline,
                actions: chunk,
            }, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            });
        }
        let latestCommit = await this.getMostRecentCommit(channel, gitProvider);
        this.logPublishProgress(`Commit successful: ${latestCommit}`);
        return latestCommit;
    }
    async deleteReaderBackup(channel, gitProvider) {
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        this.logPublishProgress(`Deleting existing files from repo...`);
        let treeLink = `${GitlabService_1.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/tree?recursive=true&path=.upload&pagination=keyset`;
        let linkHeaders;
        let actions = [];
        do {
            //Get list of current files in .upload folder
            try {
                let results = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(treeLink, {
                    headers: {
                        "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                    }
                });
                //Skip directories because gitlab chokes on them.
                let resultActions = results?.data?.reverse()?.filter(result => result.name.indexOf('.') > 0).map(result => {
                    return {
                        action: 'delete',
                        file_path: result.path
                    };
                });
                actions.push(...resultActions);
                linkHeaders = parse_link_header__WEBPACK_IMPORTED_MODULE_0___default()(results.headers["link"]);
                treeLink = linkHeaders?.next?.url;
            }
            catch (ex) {
                //If the .upload folder doesn't exist we will get a 404
                if (ex.response.data?.message == "404 invalid revision or path Not Found") {
                    treeLink = undefined;
                }
            }
        } while (treeLink);
        if (actions?.length > 0) {
            this.logPublishProgress(`Deleting ${actions.length} files from repo...`);
            let url = `${GitlabService_1.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`;
            await axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(url, {
                branch: "master",
                commit_message: `Deleting .upload`,
                actions: actions
            }, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            });
        }
    }
    async deleteContractBackup(channel, gitProvider) {
        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set");
        }
        this.logPublishProgress(`Deleting existing contract files from repo...`);
        let actions = [{
                action: 'delete',
                file_path: "/backup/contract/contract.json"
            }, {
                action: 'delete',
                file_path: "/backup/contract/contract-abi.json"
            }];
        if (actions?.length > 0) {
            this.logPublishProgress(`Deleting ${actions.length} files from repo...`);
            let url = `${GitlabService_1.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`;
            await axios__WEBPACK_IMPORTED_MODULE_1__["default"].post(url, {
                branch: "master",
                commit_message: `Deleting existing contract files for ${channel.title}`,
                actions: actions
            }, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            });
        }
    }
    async getMostRecentCommit(channel, gitProvider) {
        let url = `${GitlabService_1.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`;
        const res = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(url, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        });
        let commits = res.data;
        if (commits?.length > 0) {
            return commits[0].id;
        }
    }
    logPublishProgress(message) {
        console.log(message);
        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
            // browser
            const imageSelectedEvent = new CustomEvent('publish-progress', {
                detail: { message: message }
            });
            document.dispatchEvent(imageSelectedEvent);
        }
    }
    getBranchName(channel) {
        return channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    }
    chunkIt(gitActions, perChunk) {
        let chunks = [];
        //Break into rows
        for (let i = 0; i < gitActions.length; i += perChunk) {
            let chunk = gitActions.slice(i, i + perChunk);
            chunks.push(chunk);
        }
        return chunks;
    }
};
GitlabService = GitlabService_1 = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __metadata("design:paramtypes", [_settings_service_js__WEBPACK_IMPORTED_MODULE_3__.SettingsService])
], GitlabService);



/***/ }),

/***/ "./src/admin/service/core/hugging-face-service.ts":
/*!********************************************************!*\
  !*** ./src/admin/service/core/hugging-face-service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HuggingFaceService: () => (/* binding */ HuggingFaceService)
/* harmony export */ });
/* harmony import */ var _huggingface_inference__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @huggingface/inference */ "./node_modules/@huggingface/inference/dist/index.mjs");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _settings_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings-service.js */ "./src/admin/service/core/settings-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let HuggingFaceService = class HuggingFaceService {
    settingsService;
    inference;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async init() {
        let settings = await this.settingsService.get();
        if (!settings.huggingFace)
            return;
        this.inference = new _huggingface_inference__WEBPACK_IMPORTED_MODULE_0__.HfInference(settings.huggingFace);
    }
    async generateImage(model, prompt, negativePrompt) {
        let options = {
            inputs: prompt,
            parameters: {
                width: 1200,
                height: 1200
            },
            model: model
        };
        if (negativePrompt) {
            options.parameters.negative_prompt = negativePrompt;
        }
        return this.inference.textToImage(options);
    }
};
HuggingFaceService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_settings_service_js__WEBPACK_IMPORTED_MODULE_2__.SettingsService])
], HuggingFaceService);



/***/ }),

/***/ "./src/admin/service/core/import-service.ts":
/*!**************************************************!*\
  !*** ./src/admin/service/core/import-service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImportService: () => (/* binding */ ImportService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var it_to_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! it-to-buffer */ "./node_modules/it-to-buffer/dist/src/index.js");
/* harmony import */ var it_all__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! it-all */ "./node_modules/it-all/dist/src/index.js");
/* harmony import */ var ipfs_only_hash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ipfs-only-hash */ "./node_modules/ipfs-only-hash/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _pinata_ipfs_gateway_tools_dist_node_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pinata/ipfs-gateway-tools/dist/node.js */ "./node_modules/@pinata/ipfs-gateway-tools/dist/node.js");
/* harmony import */ var _pinata_ipfs_gateway_tools_dist_node_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_pinata_ipfs_gateway_tools_dist_node_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _dto_author_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../dto/author.js */ "./src/admin/dto/author.ts");
/* harmony import */ var _dto_channel_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../dto/channel.js */ "./src/admin/dto/channel.ts");
/* harmony import */ var _dto_item_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../dto/item.js */ "./src/admin/dto/item.ts");
/* harmony import */ var _dto_image_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../dto/image.js */ "./src/admin/dto/image.ts");
/* harmony import */ var _animation_service_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../animation-service.js */ "./src/admin/service/animation-service.ts");
/* harmony import */ var _author_service_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../author-service.js */ "./src/admin/service/author-service.ts");
/* harmony import */ var _channel_service_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../channel-service.js */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _image_service_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../image-service.js */ "./src/admin/service/image-service.ts");
/* harmony import */ var _item_service_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../item-service.js */ "./src/admin/service/item-service.ts");
/* harmony import */ var _ipfs_service_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./ipfs-service.js */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./types.js */ "./src/admin/service/core/types.ts");
/* harmony import */ var _dto_animation_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../dto/animation.js */ "./src/admin/dto/animation.ts");
/* harmony import */ var _dto_theme_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../dto/theme.js */ "./src/admin/dto/theme.ts");
/* harmony import */ var _dto_static_page_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../dto/static-page.js */ "./src/admin/dto/static-page.ts");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/contract/contract.js");
/* harmony import */ var uint8arrays_concat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uint8arrays/concat */ "./node_modules/uint8arrays/dist/src/concat.js");
/* harmony import */ var _repository_theme_repository_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../repository/theme-repository.js */ "./src/admin/repository/theme-repository.ts");
/* harmony import */ var _theme_service_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../theme-service.js */ "./src/admin/service/theme-service.ts");
/* harmony import */ var _repository_static_page_repository_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../repository/static-page-repository.js */ "./src/admin/repository/static-page-repository.ts");
/* harmony import */ var _repository_token_metadata_cache_repository_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../../repository/token-metadata-cache-repository.js */ "./src/admin/repository/token-metadata-cache-repository.ts");
/* harmony import */ var _static_page_service_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../static-page-service.js */ "./src/admin/service/static-page-service.ts");
/* harmony import */ var _erc_event_service_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./erc-event-service.js */ "./src/admin/service/core/erc-event-service.ts");
/* harmony import */ var is_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! is-svg */ "./node_modules/is-svg/index.js");
/* harmony import */ var _dto_query_cache_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../dto/query-cache.js */ "./src/admin/dto/query-cache.ts");
/* harmony import */ var _query_cache_service_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./query-cache-service.js */ "./src/admin/service/core/query-cache-service.ts");
/* harmony import */ var _schema_service_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./schema-service.js */ "./src/admin/service/core/schema-service.ts");
/* harmony import */ var _web_item_web_service_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../web/item-web-service.js */ "./src/admin/service/web/item-web-service.ts");
/* harmony import */ var _web_channel_web_service_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../web/channel-web-service.js */ "./src/admin/service/web/channel-web-service.ts");
/* harmony import */ var _original_metadata_service_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../original-metadata-service.js */ "./src/admin/service/original-metadata-service.ts");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




































const gatewayTools = new (_pinata_ipfs_gateway_tools_dist_node_js__WEBPACK_IMPORTED_MODULE_3___default())();
let ImportService = class ImportService {
    channelService;
    channelWebService;
    queryCacheService;
    schemaService;
    itemService;
    itemWebService;
    authorService;
    ipfsService;
    imageService;
    animationService;
    themeRepository;
    themeService;
    staticPageRepository;
    staticPageService;
    ercEventService;
    originalMetadataService;
    tokenMetadataCacheRepository;
    walletService;
    contracts;
    constructor(channelService, channelWebService, queryCacheService, schemaService, itemService, itemWebService, authorService, ipfsService, imageService, animationService, themeRepository, themeService, staticPageRepository, staticPageService, ercEventService, originalMetadataService, tokenMetadataCacheRepository, walletService, contracts) {
        this.channelService = channelService;
        this.channelWebService = channelWebService;
        this.queryCacheService = queryCacheService;
        this.schemaService = schemaService;
        this.itemService = itemService;
        this.itemWebService = itemWebService;
        this.authorService = authorService;
        this.ipfsService = ipfsService;
        this.imageService = imageService;
        this.animationService = animationService;
        this.themeRepository = themeRepository;
        this.themeService = themeService;
        this.staticPageRepository = staticPageRepository;
        this.staticPageService = staticPageService;
        this.ercEventService = ercEventService;
        this.originalMetadataService = originalMetadataService;
        this.tokenMetadataCacheRepository = tokenMetadataCacheRepository;
        this.walletService = walletService;
        this.contracts = contracts;
    }
    async importFromIPFS(cid, forkType, owner) {
        let forkStatus = {
            animations: { saved: 0, total: 0 },
            images: { saved: 0, total: 0 },
            channels: { saved: 0, total: 0 },
            items: { saved: 0, total: 0 },
            authors: { saved: 0, total: 0 },
            themes: { saved: 0, total: 0 },
            staticPages: { saved: 0, total: 0 }
        };
        this.logForkProgress(forkStatus, `Starting fork of ${cid}. Fetching data...`);
        try {
            await this.ipfsService.ipfs.files.rm('/fork', { recursive: true, flush: true });
        }
        catch (ex) { }
        await this.ipfsService.ipfs.files.cp(`/ipfs/${cid}`, '/fork', { create: true, parents: true, flush: true });
        this.logForkProgress(forkStatus, "Processing...");
        //Load the directory from IPFS
        let authors = await this._readFile(`/fork/backup/authors.json`);
        let channels = await this._readFile(`/fork/backup/channels.json`);
        let images = await this._readFile(`/fork/backup/images.json`);
        let items = await this._readFile(`/fork/backup/items.json`);
        let animations = await this._readFile(`/fork/backup/animations.json`);
        let themes = await this._readFile(`/fork/backup/themes.json`);
        let staticPages = await this._readFile(`/fork/backup/static-pages.json`);
        let contractMetadata = await this._readFile(`/fork/contractMetadata.json`);
        let originalMetadata;
        try {
            originalMetadata = await this._readFile(`/fork/backup/originalMetadata.json`);
        }
        catch (ex) { }
        let tokenMetadata = {};
        let mediaDownloader = new IPFSDownloader(this.ipfsService);
        if (forkType == "existing") {
            for (let item of items) {
                // this.logForkProgress(forkStatus, `Downloading metadata for token #${item.tokenId}`)
                tokenMetadata[item.tokenId] = await this._readFile(`/fork/metadata/${item.tokenId}.json`);
            }
            return this._importExisting(authors, channels, images, items, originalMetadata, animations, themes, staticPages, forkStatus, mediaDownloader, contractMetadata, tokenMetadata, cid);
        }
        else {
            //Create author
            if (owner) {
                let author = new _dto_author_js__WEBPACK_IMPORTED_MODULE_6__.Author();
                author.walletAddress = owner;
                authors = [author];
            }
            return this._importAsFork(authors, channels, images, items, originalMetadata, animations, themes, staticPages, forkStatus, mediaDownloader, contractMetadata, cid);
        }
    }
    async importExistingFromContract(contractAddress) {
        return this._importFromContract(contractAddress, "existing");
    }
    async importAsForkFromContract(contractAddress) {
        return this._importFromContract(contractAddress, "fork");
    }
    async importExistingFromReader(baseURI, contractAddress, ipfsCid) {
        let importBundle = await this._buildImportBundle(baseURI);
        importBundle.channels[0].contractAddress = contractAddress;
        importBundle.channels[0].publishReaderIPFSStatus = {};
        importBundle.channels[0].publishReaderIPFSStatus.cid = ipfsCid;
        return this._importExisting(importBundle.authors, importBundle.channels, importBundle.images, importBundle.items, importBundle.originalMetadata, importBundle.animations, importBundle.themes, importBundle.staticPages, importBundle.forkStatus, importBundle.mediaDownloader, importBundle.contractMetadata, importBundle.tokenMetadata, ipfsCid);
    }
    async importAsForkFromReader(baseURI, title, ipfsCid) {
        let importBundle = await this._buildImportBundle(baseURI);
        delete importBundle.channels[0].contractAddress;
        delete importBundle.channels[0].publishReaderIPFSStatus;
        //Set the new name
        importBundle.channels[0].title = title;
        return this._importAsFork(importBundle.authors, importBundle.channels, importBundle.images, importBundle.items, importBundle.originalMetadata, importBundle.animations, importBundle.themes, importBundle.staticPages, importBundle.forkStatus, importBundle.mediaDownloader, importBundle.contractMetadata, ipfsCid);
    }
    async _buildImportBundle(baseURI) {
        let forkStatus = {
            animations: { saved: 0, total: 0 },
            images: { saved: 0, total: 0 },
            channels: { saved: 0, total: 0 },
            items: { saved: 0, total: 0 },
            authors: { saved: 0, total: 0 },
            themes: { saved: 0, total: 0 },
            staticPages: { saved: 0, total: 0 }
        };
        this.logForkProgress(forkStatus, "Processing...");
        //Load the files from the server.
        let authors = await this._fetchFile(`${baseURI}backup/export/backup/authors.json`);
        let channels = await this._fetchFile(`${baseURI}backup/export/backup/channels.json`);
        let images = await this._fetchFile(`${baseURI}backup/export/backup/images.json`);
        let items = await this._fetchFile(`${baseURI}backup/export/backup/items.json`);
        let animations = await this._fetchFile(`${baseURI}backup/export/backup/animations.json`);
        let themes = await this._fetchFile(`${baseURI}backup/export/backup/themes.json`);
        let staticPages = await this._fetchFile(`${baseURI}backup/export/backup/static-pages.json`);
        let contractMetadata = await this._fetchFile(`${baseURI}backup/export/contractMetadata.json`);
        let originalMetadata;
        try {
            originalMetadata = await this._fetchFile(`${baseURI}backup/export/backup/originalMetadata.json`);
        }
        catch (ex) { }
        let mediaDownloader = new URLDownloader(baseURI);
        let tokenMetadata = {};
        for (let item of items) {
            tokenMetadata[item.tokenId] = await this._fetchFile(`${baseURI}backup/export/metadata/${item.tokenId}.json`);
        }
        return {
            authors: authors,
            channels: channels,
            images: images,
            items: items,
            originalMetadata: originalMetadata,
            animations: animations,
            themes: themes,
            staticPages: staticPages,
            mediaDownloader: mediaDownloader,
            forkStatus: forkStatus,
            contractMetadata: contractMetadata,
            tokenMetadata
        };
    }
    async _importFromContract(contractAddress, forkType) {
        let forkStatus = {
            animations: { saved: 0, total: 0 },
            images: { saved: 0, total: 0 },
            channels: { saved: 0, total: 0 },
            items: { saved: 0, total: 0 },
            authors: { saved: 0, total: 0 },
            themes: { saved: 0, total: 0 },
            staticPages: { saved: 0, total: 0 }
        };
        let wallet = this.walletService.wallet;
        //Look up channel since it has the basic ERC721 signature
        let contract = new ethers__WEBPACK_IMPORTED_MODULE_7__.Contract(contractAddress, this._getERC721ABI(), wallet ? wallet : this.walletService.provider);
        this.logForkProgress(forkStatus, `Fetching tokens for contract ${contractAddress}`);
        let tokenIds = await this.ercEventService.getTokensForContract(contract);
        forkStatus.channels.total = 1;
        forkStatus.items.total = tokenIds.size;
        //Create channel
        let channel = new _dto_channel_js__WEBPACK_IMPORTED_MODULE_8__.Channel();
        channel.importSuccess = false;
        if (forkType == "existing") {
            channel.contractAddress = contractAddress;
        }
        channel.forkType = forkType;
        channel.title = await contract.name();
        channel.symbol = await contract.symbol();
        // channel.sellerFeeBasisPoints = 0
        channel.attributeOptions = [];
        //Insert channel to get an _id
        await this.channelWebService.put(channel);
        let tokenIdStatsQueryCache = new _dto_query_cache_js__WEBPACK_IMPORTED_MODULE_9__.QueryCache();
        tokenIdStatsQueryCache._id = `token_id_stats_by_channel_${channel._id}`;
        tokenIdStatsQueryCache.result = {
            min: undefined,
            max: undefined,
            count: 0
        };
        await this.schemaService.loadChannel(channel._id);
        //Fetch token metadata for all tokens
        for (let tokenId of tokenIds) {
            this.logForkProgress(forkStatus, `Fetching metadata for #${tokenId}`);
            let metadata = await this._getTokenMetadata(contract, tokenId);
            this.logForkProgress(forkStatus, `Importing token #${metadata.tokenId}`);
            console.time(`Importing token #${metadata.tokenId}`);
            let item = new _dto_item_js__WEBPACK_IMPORTED_MODULE_10__.Item();
            let image;
            let animation;
            if (metadata.image || metadata.image_url) {
                //Fetch and create image
                let imageURI = metadata.image ? metadata.image : metadata.image_url;
                let imageData = await this._fetchURI(imageURI);
                //Figure out if it's an svg and save appropriately
                if ((0,is_svg__WEBPACK_IMPORTED_MODULE_5__["default"])(new TextDecoder().decode(imageData))) {
                    image = await this.imageService.newFromSvg(new TextDecoder().decode(imageData));
                }
                else {
                    image = await this.imageService.newFromBuffer(imageData);
                }
                try {
                    await this.imageService.put(image);
                }
                catch (ex) { } //ignore duplicates
                item.coverImageId = image._id;
                forkStatus.images.saved++;
                this.logForkProgress(forkStatus, `Importing image ${image._id}`);
            }
            else {
                throw new Error("No image in metadata");
            }
            //Create or save animation
            if (metadata.animation_url) {
                item.coverImageAsAnimation = false;
                //Fetch and create animation
                animation = await this.animationService.newFromText(new TextDecoder().decode(await this._fetchURI(metadata.animation_url)));
                //Save animation
                try {
                    await this.animationService.put(animation);
                }
                catch (ex) { } //ignore duplicates
                forkStatus.animations.saved++;
                this.logForkProgress(forkStatus, `Importing animation ${animation._id}`);
                item.animationId = animation._id;
            }
            else {
                item.coverImageAsAnimation = true;
            }
            item.tokenId = metadata.tokenId;
            item.title = metadata.name;
            item.channelId = channel._id;
            item.attributeSelections = [];
            //Build attributes for item
            for (let attribute of metadata.attributes) {
                item.attributeSelections.push({
                    traitType: attribute.trait_type,
                    value: attribute.value
                });
                this._addAttributeToChannel(attribute, channel);
            }
            //Save metadata
            let originalMetadata = await this.originalMetadataService.newFromText(JSON.stringify(metadata));
            await this.originalMetadataService.put(originalMetadata);
            item.originalJSONMetadataId = originalMetadata._id;
            //Save item
            await this.itemWebService.put({
                channel: channel,
                item: item,
                updateQueryCache: false,
                publish: false
            });
            //Update token stats
            tokenIdStatsQueryCache.result.count++;
            if (!tokenIdStatsQueryCache.result.min || item.tokenId < tokenIdStatsQueryCache.result.min) {
                tokenIdStatsQueryCache.result.min = item.tokenId;
            }
            if (!tokenIdStatsQueryCache.result.max || item.tokenId > tokenIdStatsQueryCache.result.max) {
                tokenIdStatsQueryCache.result.max = item.tokenId;
            }
            forkStatus.items.saved++;
            // this.logForkProgress(forkStatus, `Importing item ${item._id}`)
            // console.timeEnd(`Importing token #${metadata.tokenId}`)
            if (metadata.image || metadata.image_url) {
                forkStatus.images.total++;
            }
            if (metadata.animation_url) {
                forkStatus.animations.total++;
            }
            console.timeEnd(`Importing token #${metadata.tokenId}`);
        }
        this.logForkProgress(forkStatus, `Building query cache for channel ${channel._id}`);
        await this.channelService.buildAttributeCounts(channel._id);
        //Update existing token cache if it exists or create a new one.
        let existingTokenIdStatsCache;
        try {
            existingTokenIdStatsCache = await this.queryCacheService.get(tokenIdStatsQueryCache._id);
        }
        catch (ex) { }
        if (existingTokenIdStatsCache) {
            tokenIdStatsQueryCache._rev = existingTokenIdStatsCache._rev;
        }
        await this.queryCacheService.put(tokenIdStatsQueryCache);
        channel.importSuccess = true;
        await this.channelWebService.put(channel);
        forkStatus.channels.saved++;
        this.logForkProgress(forkStatus, `Importing channel ${channel._id}`);
        // await this.ipfsService.ipfs.files.flush(`/export/${channel._id}/`)
        return channel._id;
    }
    async _importAsFork(authors, channels, images, items, originalMetadatas, animations, themes, staticPages, forkStatus, mediaDownloader, contractMetadata, cid) {
        let channelId;
        let channel;
        let idMap = new Map();
        if (!authors || !channels || !images || !items) {
            throw new Error("Invalid collection hash");
        }
        forkStatus.authors.total = authors.length;
        forkStatus.channels.total = channels.length;
        forkStatus.images.total = images.length;
        forkStatus.items.total = items.length;
        forkStatus.animations.total = animations.length;
        forkStatus.themes.total = themes.length;
        forkStatus.staticPages.total = staticPages.length;
        this.logForkProgress(forkStatus, "Updating totals...");
        channel = new _dto_channel_js__WEBPACK_IMPORTED_MODULE_8__.Channel();
        Object.assign(channel, channels[0]);
        channel.forkType = "fork";
        channel.forkedFromFeeRecipient = contractMetadata.fee_recipient;
        //Insert channel
        let oldId = `${channel._id}`;
        delete channel._id;
        delete channel._rev;
        delete channel["_rev_tree"];
        //Get the new author ID
        channel.authorId = this.walletService.address?.toString();
        //Add it if doesn't exist 
        if (channel.authorId) {
            await this.authorService.insertIfNew(channel.authorId);
        }
        //Mark parent
        if (cid) {
            channel.forkedFromCid = cid;
        }
        channel.forkedFromId = oldId;
        await this.channelWebService.put(channel);
        idMap.set(oldId, channel._id);
        channelId = channel._id;
        forkStatus.channels.saved++;
        this.logForkProgress(forkStatus, `Inserted channel ${channel._id}`);
        let tokenIdStatsQueryCache = new _dto_query_cache_js__WEBPACK_IMPORTED_MODULE_9__.QueryCache();
        tokenIdStatsQueryCache._id = `token_id_stats_by_channel_${channel._id}`;
        tokenIdStatsQueryCache.result = {
            min: undefined,
            max: undefined,
            count: 0
        };
        await this.schemaService.loadChannel(channel._id);
        //Loop through the contents and insert each one like it's an unseen row
        for (let author of authors) {
            delete author._rev;
            delete author["_rev_tree"];
            await this.authorService.put(Object.assign(new _dto_author_js__WEBPACK_IMPORTED_MODULE_6__.Author(), author));
            forkStatus.authors.saved++;
            this.logForkProgress(forkStatus, `Inserted author ${author._id}`);
        }
        for (let animation of animations) {
            //Load content
            animation.content = await mediaDownloader.getAsString(`animations/${animation.cid}.html`);
            //Validate we match the IPFS cid 
            let expectedCid = await ipfs_only_hash__WEBPACK_IMPORTED_MODULE_2__.of(animation.content);
            if (expectedCid.toString() != animation.cid) {
                throw new Error(`Incorrect cid when importing animation. Expected: ${animation.cid}, Result: ${expectedCid.toString()}`);
            }
            let animationObj = Object.assign(new _dto_animation_js__WEBPACK_IMPORTED_MODULE_11__.Animation(), animation);
            try {
                await this.animationService.put(animationObj);
                // await this.itemWebService.publishAnimation(channels[0], animationObj.cid, false)
            }
            catch (ex) { } //ignore duplicates   
            forkStatus.animations.saved++;
            this.logForkProgress(forkStatus, `Inserted animation ${animationObj._id}`);
        }
        for (let image of images) {
            let content;
            //Load content
            if (image.generated) {
                image.svg = await mediaDownloader.getAsString(`images/${image.cid}.${image.generated ? 'svg' : 'jpg'}`);
                content = image.svg;
            }
            else {
                image.buffer = await mediaDownloader.getAsBuffer(`images/${image.cid}.${image.generated ? 'svg' : 'jpg'}`);
                content = new Uint8Array(image.buffer);
            }
            let imageObj = Object.assign(new _dto_image_js__WEBPACK_IMPORTED_MODULE_12__.Image(), image);
            //Validate we match the IPFS cid 
            let expectedCid = await ipfs_only_hash__WEBPACK_IMPORTED_MODULE_2__.of(content);
            if (expectedCid.toString() != image.cid) {
                throw new Error(`Incorrect cid when importing image. Expected: ${image.cid}, Result: ${expectedCid.toString()}`);
            }
            try {
                await this.imageService.put(imageObj);
                // await this.itemWebService.publishImage(channels[0], imageObj.cid, false)
            }
            catch (ex) { } //ignore duplicates   
            forkStatus.images.saved++;
            this.logForkProgress(forkStatus, `Inserted image ${imageObj._id}`);
        }
        for (let theme of themes) {
            let oldId = theme._id;
            delete theme._id;
            delete theme._rev;
            delete theme["_rev_tree"];
            theme.channelId = idMap.get(theme.channelId); //look up the new channel ID
            let themeObj = Object.assign(new _dto_theme_js__WEBPACK_IMPORTED_MODULE_13__.Theme(), theme);
            theme.forkedFromId = oldId;
            await this.themeService.put(themeObj);
            //map old id
            idMap.set(oldId, themeObj._id);
            forkStatus.themes.saved++;
            this.logForkProgress(forkStatus, `Inserted theme ${themeObj._id}`);
        }
        for (let staticPage of staticPages) {
            let oldId = staticPage._id;
            delete staticPage._id;
            delete staticPage._rev;
            delete staticPage["_rev_tree"];
            staticPage.channelId = idMap.get(staticPage.channelId); //look up the new channel ID
            staticPage.forkedFromId = oldId;
            let staticPageObj = Object.assign(new _dto_static_page_js__WEBPACK_IMPORTED_MODULE_14__.StaticPage(), staticPage);
            try {
                await this.staticPageService.put(staticPageObj);
            }
            catch (ex) { } //ignore duplicates            
            forkStatus.staticPages.saved++;
            this.logForkProgress(forkStatus, `Inserted static page ${staticPageObj._id}`);
        }
        for (let item of items) {
            let oldId = item._id;
            delete item._id;
            delete item._rev;
            delete item["_rev_tree"];
            item.channelId = idMap.get(item.channelId); //look up the new channel ID
            //Get image data and re-insert it into the content ops
            if (item.content?.ops?.length > 0) {
                let ops = [];
                for (let op of item.content.ops) {
                    if (op.insert && op.insert.ipfsimage) {
                        let image = await this.imageService.get(op.insert.ipfsimage.cid);
                        op.insert.ipfsimage.src = await this.imageService.getUrl(image);
                    }
                    ops.push(op);
                }
                item.content.ops = ops;
            }
            //Loop through themes and update IDs
            if (item.themes?.length > 0) {
                let updatedThemes = [];
                for (let theme of item.themes) {
                    updatedThemes.push(idMap.get(theme));
                }
                item.themes = updatedThemes;
            }
            item.forkedFromId = oldId;
            let itemObj = Object.assign(new _dto_item_js__WEBPACK_IMPORTED_MODULE_10__.Item(), item);
            await this.itemWebService.put({
                channel: channel,
                item: itemObj,
                updateQueryCache: false,
                publish: false
            });
            //Update token stats
            tokenIdStatsQueryCache.result.count++;
            if (!tokenIdStatsQueryCache.result.min || item.tokenId < tokenIdStatsQueryCache.result.min) {
                tokenIdStatsQueryCache.result.min = item.tokenId;
            }
            if (!tokenIdStatsQueryCache.result.max || item.tokenId > tokenIdStatsQueryCache.result.max) {
                tokenIdStatsQueryCache.result.max = item.tokenId;
            }
            forkStatus.items.saved++;
            this.logForkProgress(forkStatus, `Inserted item ${itemObj._id}`);
        }
        // console.log(channel)
        this.logForkProgress(forkStatus, `
        ******************************\n
        ******************************\n
        ******************************\n
                Import complete\n
        ******************************\n
        ******************************\n
        ******************************
        `);
        this.logForkProgress(forkStatus, `Building query cache for channel ${channelId}`);
        await this.channelService.buildAttributeCounts(channel._id);
        //Update existing token cache if it exists or create a new one.
        let existingTokenIdStatsCache;
        try {
            existingTokenIdStatsCache = await this.queryCacheService.get(tokenIdStatsQueryCache._id);
        }
        catch (ex) { }
        if (existingTokenIdStatsCache) {
            tokenIdStatsQueryCache._rev = existingTokenIdStatsCache._rev;
        }
        await this.queryCacheService.put(tokenIdStatsQueryCache);
        channel.importSuccess = true;
        await this.channelWebService.put(channel);
        // await this.ipfsService.ipfs.files.flush(`/export/${channel._id}/`)
        return channelId;
    }
    async _importExisting(authors, channels, images, items, originalMetadatas, animations, themes, staticPages, forkStatus, mediaDownloader, contractMetadata, tokenMetadata, cid) {
        if (!authors || !channels || !images || !items) {
            throw new Error("Invalid collection hash");
        }
        let channelId;
        let channel;
        forkStatus.authors.total = authors.length;
        forkStatus.channels.total = channels.length;
        forkStatus.images.total = images.length;
        forkStatus.items.total = items.length;
        forkStatus.animations.total = animations.length;
        forkStatus.themes.total = themes.length;
        forkStatus.staticPages.total = staticPages.length;
        this.logForkProgress(forkStatus, "Updating totals...");
        channel = Object.assign(new _dto_channel_js__WEBPACK_IMPORTED_MODULE_8__.Channel(), channels[0]);
        channel.forkType = "existing";
        channel.forkedFromFeeRecipient = contractMetadata.fee_recipient;
        //Remove any existing rev info
        delete channel._rev;
        delete channel["_rev_tree"];
        //Check if it exists
        let channelObj = await this.channelService.getLatestRevision(channel._id);
        if (channelObj) {
            channel["_deleted"] = false;
            channel._rev = channelObj._rev;
        }
        await this.channelWebService.put(channel);
        channelId = channel._id;
        forkStatus.channels.saved++;
        this.logForkProgress(forkStatus, `Inserted channel ${channel._id}`);
        let tokenIdStatsQueryCache = new _dto_query_cache_js__WEBPACK_IMPORTED_MODULE_9__.QueryCache();
        tokenIdStatsQueryCache._id = `token_id_stats_by_channel_${channel._id}`;
        tokenIdStatsQueryCache.result = {
            min: undefined,
            max: undefined,
            count: 0
        };
        await this.schemaService.loadChannel(channelId);
        //Loop through the contents and insert each one like it's an unseen row
        for (let author of authors) {
            delete author._rev;
            delete author["_rev_tree"];
            //Check if it exists
            let authorObj = await this.authorService.getLatestRevision(author._id);
            authorObj["_deleted"] = false;
            await this.authorService.put(Object.assign(authorObj, author));
            forkStatus.authors.saved++;
            this.logForkProgress(forkStatus, `Inserted author ${author._id}`);
        }
        for (let animation of animations) {
            //Load content
            animation.content = await mediaDownloader.getAsString(`animations/${animation.cid}.html`);
            //Validate we match the IPFS cid 
            let expectedCid = await ipfs_only_hash__WEBPACK_IMPORTED_MODULE_2__.of(animation.content);
            if (expectedCid.toString() != animation.cid) {
                throw new Error(`Incorrect cid when importing animation. Expected: ${animation.cid}, Result: ${expectedCid.toString()}`);
            }
            let animationObj = Object.assign(new _dto_animation_js__WEBPACK_IMPORTED_MODULE_11__.Animation(), animation);
            try {
                await this.animationService.put(animationObj);
            }
            catch (ex) { } //ignore duplicates   
            forkStatus.animations.saved++;
            this.logForkProgress(forkStatus);
        }
        for (let image of images) {
            let content;
            //Load content
            if (image.generated) {
                image.svg = await mediaDownloader.getAsString(`images/${image.cid}.${image.generated ? 'svg' : 'jpg'}`);
                content = image.svg;
            }
            else {
                image.buffer = await mediaDownloader.getAsBuffer(`images/${image.cid}.${image.generated ? 'svg' : 'jpg'}`);
                content = new Uint8Array(image.buffer);
            }
            let imageObj = Object.assign(new _dto_image_js__WEBPACK_IMPORTED_MODULE_12__.Image(), image);
            //Validate we match the IPFS cid 
            let expectedCid = await ipfs_only_hash__WEBPACK_IMPORTED_MODULE_2__.of(content);
            if (expectedCid.toString() != image.cid) {
                throw new Error(`Incorrect cid when importing image. Expected: ${image.cid}, Result: ${expectedCid.toString()}`);
            }
            try {
                await this.imageService.put(imageObj);
            }
            catch (ex) { } //ignore duplicates   
            forkStatus.images.saved++;
            this.logForkProgress(forkStatus);
        }
        for (let theme of themes) {
            //Remove any existing rev info
            delete theme._rev;
            delete theme["_rev_tree"];
            //Check if it exists
            let themeObj = await this.themeRepository.getLatestRevision(theme._id);
            themeObj["_deleted"] = false;
            await this.themeRepository.put(Object.assign(themeObj, theme));
            forkStatus.themes.saved++;
            this.logForkProgress(forkStatus, `Inserted theme ${themeObj._id}`);
        }
        for (let staticPage of staticPages) {
            //Remove any existing rev info
            delete staticPage._rev;
            delete staticPage["_rev_tree"];
            //Check if it exists
            let staticPageObj = await this.staticPageRepository.getLatestRevision(staticPage._id);
            staticPageObj["_deleted"] = false;
            await this.staticPageRepository.put(Object.assign(staticPageObj, staticPage));
            forkStatus.staticPages.saved++;
            this.logForkProgress(forkStatus, `Inserted static page ${staticPageObj._id}`);
        }
        for (let item of items) {
            //Get image data and re-insert it into the content ops
            if (item.content?.ops?.length > 0) {
                let ops = [];
                for (let op of item.content.ops) {
                    if (op.insert && op.insert.ipfsimage) {
                        let image = await this.imageService.get(op.insert.ipfsimage.cid);
                        op.insert.ipfsimage.src = await this.imageService.getUrl(image);
                    }
                    ops.push(op);
                }
                item.content.ops = ops;
            }
            //Remove any existing rev info
            delete item._rev;
            delete item["_rev_tree"];
            //Check if it exists
            let itemObj = await this.itemService.getLatestRevision(item._id);
            if (itemObj) {
                item["_deleted"] = false;
                item._rev = itemObj._rev;
            }
            //Save metadata
            let originalMetadata = await this.originalMetadataService.newFromText(JSON.stringify(tokenMetadata[item.tokenId]));
            await this.originalMetadataService.put(originalMetadata);
            item.originalJSONMetadataId = originalMetadata._id;
            //Save image
            await this.itemWebService.put({
                channel: channel,
                item: Object.assign(new _dto_item_js__WEBPACK_IMPORTED_MODULE_10__.Item(), item),
                updateQueryCache: false,
                publish: false
            });
            //Update token stats
            tokenIdStatsQueryCache.result.count++;
            if (!tokenIdStatsQueryCache.result.min || item.tokenId < tokenIdStatsQueryCache.result.min) {
                tokenIdStatsQueryCache.result.min = item.tokenId;
            }
            if (!tokenIdStatsQueryCache.result.max || item.tokenId > tokenIdStatsQueryCache.result.max) {
                tokenIdStatsQueryCache.result.max = item.tokenId;
            }
            forkStatus.items.saved++;
            this.logForkProgress(forkStatus);
        }
        this.logForkProgress(forkStatus, `
        ******************************\n
        ******************************\n
        ******************************\n
                Import complete\n
        ******************************\n
        ******************************\n
        ******************************
        `);
        this.logForkProgress(forkStatus, `Building query cache for channel ${channel._id}`);
        await this.channelService.buildAttributeCounts(channel._id);
        //Update existing token cache if it exists or create a new one.
        let existingTokenIdStatsCache;
        try {
            existingTokenIdStatsCache = await this.queryCacheService.get(tokenIdStatsQueryCache._id);
        }
        catch (ex) { }
        if (existingTokenIdStatsCache) {
            tokenIdStatsQueryCache._rev = existingTokenIdStatsCache._rev;
        }
        await this.queryCacheService.put(tokenIdStatsQueryCache);
        channel.importSuccess = true;
        await this.channelWebService.put(channel);
        // await this.ipfsService.ipfs.files.flush(`/export/${channel._id}/`)
        this.logForkProgress(forkStatus, `Forking channel ${channel._id} complete`);
        return channels[0]._id;
    }
    _addAttributeToChannel(attribute, channel) {
        let attributeOptions;
        //Check if the trait_type is already on the channel
        let matching = channel.attributeOptions.filter(ao => ao.traitType == attribute.trait_type);
        if (matching?.length > 0) {
            attributeOptions = matching[0];
        }
        else {
            channel.attributeOptions.push({
                id: (0,uuid__WEBPACK_IMPORTED_MODULE_15__["default"])(),
                traitType: attribute.trait_type,
                values: [attribute.value]
            });
            attributeOptions = channel.attributeOptions[channel.attributeOptions.length - 1];
        }
        //Add the value if it doesn't exist
        if (!attributeOptions.values.includes(attribute.value)) {
            attributeOptions.values.push(attribute.value);
        }
    }
    async _getTokenMetadata(contract, tokenId) {
        let cacheId = `${await contract.getAddress()}-${tokenId}`;
        //Check the cache
        let existing;
        try {
            existing = await this.tokenMetadataCacheRepository.get(cacheId);
        }
        catch (ex) { }
        if (existing) {
            console.log(`Returning cached token metadata #${tokenId}`);
            return existing.tokenMetadata;
        }
        let tokenURI = await contract.tokenURI(tokenId);
        let metadataData = await this._fetchURI(tokenURI);
        //Some collections 
        let metadata = JSON.parse(new TextDecoder().decode(metadataData));
        metadata.tokenId = tokenId;
        //Cache it
        await this.tokenMetadataCacheRepository.put({
            _id: cacheId,
            tokenMetadata: metadata,
            dateCreated: new Date().toJSON()
        });
        return metadata;
    }
    // private async _getTokenImage(url:string, tokenId:number) : Promise<TokenImageCache> {
    //     //Check the cache
    //     let existing
    //     try {
    //         existing = await this.tokenImageCacheRepository.get(url)
    //     } catch(ex) {}
    //     if (existing) {
    //         console.log(`Returning cached token image #${tokenId}`)
    //         return existing
    //     } 
    //     let imageData = await this._fetchURI(url)
    //     let tokenImageCache:TokenImageCache = {
    //         _id: url,
    //         dateCreated: new Date().toJSON()
    //     }
    //     //Figure out if it's an svg and save appropriately
    //     if (isSvg(new TextDecoder().decode(imageData))) {
    //         tokenImageCache.svg = new TextDecoder().decode(imageData)
    //     } else {
    //         tokenImageCache.buffer = imageData
    //     }
    //     //Cache it
    //     await this.tokenImageCacheRepository.put(tokenImageCache)
    //     return this.tokenImageCacheRepository.get(url)
    // }
    async _fetchURI(uri) {
        if (uri.startsWith("data:application/json;utf-8,")) {
            return Buffer.from(uri.substring(28, uri.length));
        }
        else if (uri.startsWith("data:image/bmp;base64,")) {
            return Buffer.from(uri.substring(22, uri.length), "base64");
        }
        else if (uri.startsWith("http")) {
            //Get from old interwebs
            let result = await axios__WEBPACK_IMPORTED_MODULE_16__["default"].get(uri, {
                responseType: "arraybuffer",
            });
            return Buffer.from(result.data, 'binary');
        }
        else {
            let containResults = gatewayTools.containsCID(uri);
            if (containResults?.containsCid) {
                uri = gatewayTools.convertToDesiredGateway(uri, '');
                //Get from IPFS
                const data = (0,uint8arrays_concat__WEBPACK_IMPORTED_MODULE_4__.concat)(await (0,it_all__WEBPACK_IMPORTED_MODULE_1__["default"])(this.ipfsService.ipfs.cat(uri)));
                return data;
            }
        }
    }
    async _readFile(filename) {
        let bufferedContents = await (0,it_to_buffer__WEBPACK_IMPORTED_MODULE_0__["default"])(this.ipfsService.ipfs.files.read(filename));
        return JSON.parse(new TextDecoder("utf-8").decode(bufferedContents));
    }
    async _fetchFile(filename) {
        let response = await axios__WEBPACK_IMPORTED_MODULE_16__["default"].get(filename);
        return response.data;
    }
    logForkProgress(forkStatus, message) {
        if (message) {
            console.log(message);
        }
        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
            // browser
            const e = new CustomEvent('fork-progress', {
                detail: {
                    forkStatus: forkStatus,
                    message: message
                }
            });
            document.dispatchEvent(e);
        }
    }
    _getERC721ABI() {
        return `[
            {
                "inputs":[
                   {
                      "internalType":"string",
                      "name":"name",
                      "type":"string"
                   },
                   {
                      "internalType":"string",
                      "name":"symbol",
                      "type":"string"
                   }
                ],
                "stateMutability":"nonpayable",
                "type":"constructor"
            },

            {
              "constant": true,
              "inputs": [],
              "name": "name",
              "outputs": [
                {
                  "name": "",
                  "type": "string"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "_spender",
                  "type": "address"
                },
                {
                  "name": "_value",
                  "type": "uint256"
                }
              ],
              "name": "approve",
              "outputs": [
                {
                  "name": "",
                  "type": "bool"
                }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "totalSupply",
              "outputs": [
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "_from",
                  "type": "address"
                },
                {
                  "name": "_to",
                  "type": "address"
                },
                {
                  "name": "_value",
                  "type": "uint256"
                }
              ],
              "name": "transferFrom",
              "outputs": [
                {
                  "name": "",
                  "type": "bool"
                }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "decimals",
              "outputs": [
                {
                  "name": "",
                  "type": "uint8"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "name": "_owner",
                  "type": "address"
                }
              ],
              "name": "balanceOf",
              "outputs": [
                {
                  "name": "balance",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "symbol",
              "outputs": [
                {
                  "name": "",
                  "type": "string"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "_to",
                  "type": "address"
                },
                {
                  "name": "_value",
                  "type": "uint256"
                }
              ],
              "name": "transfer",
              "outputs": [
                {
                  "name": "",
                  "type": "bool"
                }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "name": "_owner",
                  "type": "address"
                },
                {
                  "name": "_spender",
                  "type": "address"
                }
              ],
              "name": "allowance",
              "outputs": [
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "payable": true,
              "stateMutability": "payable",
              "type": "fallback"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "name": "owner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "name": "spender",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "Approval",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "name": "from",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "name": "to",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "Transfer",
              "type": "event"
            },
            {
                "inputs":[
                   {
                      "internalType":"uint256",
                      "name":"tokenId",
                      "type":"uint256"
                   }
                ],
                "name":"tokenURI",
                "outputs":[
                   {
                      "internalType":"string",
                      "name":"",
                      "type":"string"
                   }
                ],
                "stateMutability":"view",
                "type":"function"
             }
             
          ]`;
    }
};
ImportService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_17__.injectable)(),
    __param(17, (0,inversify__WEBPACK_IMPORTED_MODULE_18__.inject)(_types_js__WEBPACK_IMPORTED_MODULE_19__["default"].WalletService)),
    __param(18, (0,inversify__WEBPACK_IMPORTED_MODULE_18__.inject)("contracts")),
    __metadata("design:paramtypes", [_channel_service_js__WEBPACK_IMPORTED_MODULE_20__.ChannelService,
        _web_channel_web_service_js__WEBPACK_IMPORTED_MODULE_21__.ChannelWebService,
        _query_cache_service_js__WEBPACK_IMPORTED_MODULE_22__.QueryCacheService,
        _schema_service_js__WEBPACK_IMPORTED_MODULE_23__.SchemaService,
        _item_service_js__WEBPACK_IMPORTED_MODULE_24__.ItemService,
        _web_item_web_service_js__WEBPACK_IMPORTED_MODULE_25__.ItemWebService,
        _author_service_js__WEBPACK_IMPORTED_MODULE_26__.AuthorService,
        _ipfs_service_js__WEBPACK_IMPORTED_MODULE_27__.IpfsService,
        _image_service_js__WEBPACK_IMPORTED_MODULE_28__.ImageService,
        _animation_service_js__WEBPACK_IMPORTED_MODULE_29__.AnimationService,
        _repository_theme_repository_js__WEBPACK_IMPORTED_MODULE_30__.ThemeRepository,
        _theme_service_js__WEBPACK_IMPORTED_MODULE_31__.ThemeService,
        _repository_static_page_repository_js__WEBPACK_IMPORTED_MODULE_32__.StaticPageRepository,
        _static_page_service_js__WEBPACK_IMPORTED_MODULE_33__.StaticPageService,
        _erc_event_service_js__WEBPACK_IMPORTED_MODULE_34__.ERCEventService,
        _original_metadata_service_js__WEBPACK_IMPORTED_MODULE_35__.OriginalMetadataService,
        _repository_token_metadata_cache_repository_js__WEBPACK_IMPORTED_MODULE_36__.TokenMetadataCacheRepository, Object, Object])
], ImportService);
class IPFSDownloader {
    ipfsService;
    basePath = "/fork/";
    constructor(ipfsService) {
        this.ipfsService = ipfsService;
    }
    async getAsString(filename) {
        let bufferedContents = await (0,it_to_buffer__WEBPACK_IMPORTED_MODULE_0__["default"])(this.ipfsService.ipfs.files.read(`${this.basePath}${filename}`));
        return new TextDecoder("utf-8").decode(bufferedContents);
    }
    async getAsBuffer(filename) {
        return (0,it_to_buffer__WEBPACK_IMPORTED_MODULE_0__["default"])(this.ipfsService.ipfs.files.read(`${this.basePath}${filename}`));
    }
}
class URLDownloader {
    basePath;
    constructor(basePath) {
        this.basePath = basePath;
    }
    async getAsString(path) {
        let response = await axios__WEBPACK_IMPORTED_MODULE_16__["default"].get(`${this.basePath}backup/export/${path}`);
        return response.data?.toString();
    }
    async getAsBuffer(path) {
        let response = await axios__WEBPACK_IMPORTED_MODULE_16__["default"].get(`${this.basePath}backup/export/${path}`, {
            responseType: "arraybuffer"
        });
        return response.data;
    }
}



/***/ }),

/***/ "./src/admin/service/core/ipfs-service.ts":
/*!************************************************!*\
  !*** ./src/admin/service/core/ipfs-service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IpfsService: () => (/* binding */ IpfsService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _settings_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings-service.js */ "./src/admin/service/core/settings-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


let IpfsService = class IpfsService {
    ipfsRemoteInit;
    settingsService;
    peerCount = 0;
    addresses;
    ipfs;
    initializing = false;
    constructor(ipfsRemoteInit) {
        this.ipfsRemoteInit = ipfsRemoteInit;
    }
    async init() {
        if (this.ipfs || this.initializing)
            return;
        this.initializing = true;
        let settings;
        try {
            settings = await this.settingsService.get();
        }
        catch (ex) { }
        console.log('Init IPFS');
        this.ipfs = await this.ipfsRemoteInit(settings?.ipfsHost ? settings.ipfsHost : '/ip4/127.0.0.1/tcp/5001');
        console.log('Init IPFS complete');
        this.initializing = false;
        //TODO: 
        // this.ipfs.libp2p.connectionManager.on('peer:connect', (connection) => {
        //   // this.updateInfo()
        //   
        // })
        // this.ipfs.libp2p.connectionManager.on('peer:disconnect', (connection) => {
        //   // this.updateInfo()
        // })
    }
    async clearInit() {
        delete this.ipfs;
        this.initializing = false;
    }
    async updateInfo() {
        let id = await this.ipfs.id();
        let peers = await this.ipfs.swarm.peers();
        this.peerCount = peers.length;
        this.addresses = id?.addresses?.map(a => a.toString());
        const updatePeerCountEvent = new CustomEvent('update-peers', {
            detail: {
                addresses: this.addresses,
                peers: peers.map(p => p.addr.toString()),
                count: this.peerCount
            }
        });
        document.dispatchEvent(updatePeerCountEvent);
        console.log(`IPFS has ${this.peerCount} peers.`);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)(_settings_service_js__WEBPACK_IMPORTED_MODULE_1__.SettingsService),
    __metadata("design:type", _settings_service_js__WEBPACK_IMPORTED_MODULE_1__.SettingsService)
], IpfsService.prototype, "settingsService", void 0);
IpfsService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)('ipfsRemoteInit')),
    __metadata("design:paramtypes", [Object])
], IpfsService);



/***/ }),

/***/ "./src/admin/service/core/paging-service.ts":
/*!**************************************************!*\
  !*** ./src/admin/service/core/paging-service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PagingService: () => (/* binding */ PagingService)
/* harmony export */ });
/* unused harmony export PagingViewModel */
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let PagingService = class PagingService {
    constructor() { }
    /**
     * This function takes in a limit, offset, and count and generates a model
     *
     * @param offset
     * @param limit
     * @param count
     */
    buildPagingViewModel(offset, limit, count, numberOfPages) {
        let viewModel = new PagingViewModel();
        viewModel.offset = offset ? offset : 0;
        viewModel.limit = limit;
        viewModel.count = count;
        viewModel.start = viewModel.offset + 1;
        viewModel.end = Math.min(viewModel.offset + limit, count);
        viewModel.previousOffset = Math.max(viewModel.offset - limit, 0);
        if ((viewModel.offset + limit) < count) {
            viewModel.nextOffset = viewModel.offset + limit;
        }
        //Set current page
        viewModel.page = viewModel.offset / viewModel.limit + 1;
        if (viewModel.page > viewModel.endPage)
            viewModel.page = viewModel.endPage;
        viewModel.endPage = Math.ceil(viewModel.count / viewModel.limit);
        viewModel.lastOffset = viewModel.endPage * viewModel.limit - viewModel.limit;
        viewModel.showNext = viewModel.endPage > viewModel.page;
        viewModel.showPrevious = viewModel.offset != 0;
        viewModel.showFirst = viewModel.page > 2;
        viewModel.showLast = viewModel.page < (viewModel.endPage - 1);
        //Number of pages shouldn't be past the end
        // numberOfPages = Math.min(numberOfPages, viewModel.endPage - viewModel.page)
        // viewModel.pageNumbers = []
        // for (let i=viewModel.page; i < numberOfPages + viewModel.page; i++) {
        //     viewModel.pageNumbers.push({
        //         display: i + 1,
        //         offset: i * viewModel.limit
        //     })
        // }
        return viewModel;
    }
    calculateEndIndex(limit, offset, currentCount) {
        let endIndex = offset + limit - 1;
        //If it's the last page don't go past the final record
        return Math.min(currentCount - 1, endIndex);
    }
    calculateDescendingEndIndex(limit, offset) {
        let endIndex = offset - (limit - 1);
        //Don't go lower than 0
        return Math.max(0, endIndex);
    }
    calculateDescendingOffset(offset, currentCount) {
        let calculatedOffset = (currentCount - 1) - offset;
        // console.log(`offset: ${offset}, currentCount: ${currentCount}, calculatedOffset: ${calculatedOffset}`)
        return Math.max(0, calculatedOffset);
    }
};
PagingService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(),
    __metadata("design:paramtypes", [])
], PagingService);
class PagingViewModel {
    page;
    pageNumbers;
    endPage;
    offset;
    limit;
    count;
    start;
    end;
    previousOffset;
    nextOffset;
    lastOffset;
    showPrevious;
    showNext;
    showFirst;
    showLast;
}



/***/ }),

/***/ "./src/admin/service/core/publish-service.ts":
/*!***************************************************!*\
  !*** ./src/admin/service/core/publish-service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PublishService: () => (/* binding */ PublishService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "./node_modules/memfs/lib/index.js");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ipfs_only_hash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ipfs-only-hash */ "./node_modules/ipfs-only-hash/index.js");
/* harmony import */ var _channel_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../channel-service.js */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _image_service_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../image-service.js */ "./src/admin/service/image-service.ts");
/* harmony import */ var _item_service_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../item-service.js */ "./src/admin/service/item-service.ts");
/* harmony import */ var _ipfs_service_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ipfs-service.js */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types.js */ "./src/admin/service/core/types.ts");
/* harmony import */ var _export_service_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./export-service.js */ "./src/admin/service/core/export-service.ts");
/* harmony import */ var _contracts_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../contracts.json */ "./contracts.json");
/* harmony import */ var _settings_service_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./settings-service.js */ "./src/admin/service/core/settings-service.ts");
/* harmony import */ var _animation_service_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../animation-service.js */ "./src/admin/service/animation-service.ts");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










//@ts-ignore



let PublishService = class PublishService {
    channelService;
    itemService;
    ipfsService;
    imageService;
    animationService;
    exportService;
    settingsService;
    walletService;
    constructor(channelService, itemService, ipfsService, imageService, animationService, exportService, settingsService, walletService) {
        this.channelService = channelService;
        this.itemService = itemService;
        this.ipfsService = ipfsService;
        this.imageService = imageService;
        this.animationService = animationService;
        this.exportService = exportService;
        this.settingsService = settingsService;
        this.walletService = walletService;
    }
    async publish(channel, baseDir) {
        //Export metadata
        this.logPublishProgress(undefined, "Preparing export...");
        let exportBundle = await this.exportService.prepareExport(channel, this.walletService.address);
        let feeRecipient = await this.getFeeReceipient(exportBundle.channel, exportBundle.ownerAddress);
        if (feeRecipient) {
            this.logPublishProgress(undefined, `Fee Recipient: ${feeRecipient}`);
        }
        this.logPublishProgress(undefined, "Preparing backup...");
        let backup = await this.exportService.createBackup(exportBundle);
        //export to IPFS but only if we don't have a contractAddress
        let cids;
        if (!channel.contractAddress) {
            this.logPublishProgress(undefined, "Exporting to IPFS...");
            cids = await this.exportToIPFS(exportBundle, backup, feeRecipient);
        }
        else {
            if (channel.publishReaderIPFSStatus?.cid) {
                cids = {
                    cid: channel.publishReaderIPFSStatus.cid
                };
            }
        }
        this.logPublishProgress(undefined, "Exporting to file system...");
        await this.exportToFS(baseDir, channel, exportBundle, backup, feeRecipient);
        return {
            cids: cids
        };
    }
    async exportToIPFS(exportBundle, backup, feeRecipient) {
        let flush = true;
        let ipfsDirectory = this.getIPFSDirectory(exportBundle.channel);
        //Clear 
        try {
            await this.ipfsService.ipfs.files.read(ipfsDirectory);
            await this.ipfsService.ipfs.files.rm(ipfsDirectory, { recursive: true, flush: true });
        }
        catch (ex) { }
        let publishStatus = {
            contractMetadata: { saved: 0, total: 1 },
            nftMetadata: { saved: 0, total: exportBundle.items.length },
            images: { saved: 0, total: exportBundle.imageCids.length },
            animations: { saved: 0, total: exportBundle.animationCids.length },
            backups: {
                channels: { saved: 0, total: 1 },
                authors: { saved: 0, total: 1 },
                items: { saved: 0, total: backup.itemCount },
                images: { saved: 0, total: exportBundle.imageCids.length },
                animations: { saved: 0, total: exportBundle.animationCids.length },
                themes: { saved: 0, total: backup.themeCount },
                staticPages: { saved: 0, total: backup.staticPageCount }
            }
        };
        this.logPublishProgress(publishStatus);
        //Save images
        await this._publishImagesIPFS(publishStatus, ipfsDirectory, exportBundle.imageCids, true);
        //Save animations
        await this._publishAnimationsIPFS(publishStatus, ipfsDirectory, exportBundle.animationCids, true);
        await this._publishNFTMetadataIPFS(publishStatus, ipfsDirectory, exportBundle.channel, exportBundle.items, true);
        //Save contract metadata
        let contractMetadataPath = `${ipfsDirectory}/contractMetadata.json`;
        let contractMetadata = await this.channelService.exportContractMetadata(exportBundle.channel, feeRecipient);
        //IPFS
        await this.ipfsService.ipfs.files.write(contractMetadataPath, new TextEncoder().encode(JSON.stringify(contractMetadata)), { create: true, parents: true, flush: flush });
        let stat = await this.ipfsService.ipfs.files.stat(contractMetadataPath);
        publishStatus.contractMetadata.saved = 1;
        this.logPublishProgress(publishStatus, `Saving contract metadata to ${contractMetadataPath} (${stat.cid})`);
        //Write channels backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/channels.json`, new TextEncoder().encode(JSON.stringify(backup.channels)), { create: true, parents: true, flush: flush });
        publishStatus.backups.channels.saved = 1;
        this.logPublishProgress(publishStatus);
        //Write authors backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/authors.json`, new TextEncoder().encode(JSON.stringify(backup.authors)), { create: true, parents: true, flush: flush });
        publishStatus.backups.authors.saved = 1;
        this.logPublishProgress(publishStatus);
        //Write items backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/items.json`, new TextEncoder().encode(JSON.stringify(backup.items)), { create: true, parents: true, flush: flush });
        publishStatus.backups.items.saved = backup.itemCount;
        this.logPublishProgress(publishStatus);
        //Write original metadata backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/originalMetadata.json`, new TextEncoder().encode(JSON.stringify(backup.originalMetadata)), { create: true, parents: true, flush: flush });
        //Write images backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/images.json`, new TextEncoder().encode(JSON.stringify(backup.images)), { create: true, parents: true, flush: flush });
        publishStatus.backups.images.saved = backup.imageCount;
        this.logPublishProgress(publishStatus);
        //Write animations backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/animations.json`, new TextEncoder().encode(JSON.stringify(backup.animations)), { create: true, parents: true, flush: flush });
        publishStatus.backups.animations.saved = backup.animationCount;
        this.logPublishProgress(publishStatus);
        //Write themes backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/themes.json`, new TextEncoder().encode(JSON.stringify(backup.themes)), { create: true, parents: true, flush: flush });
        publishStatus.backups.themes.saved = backup.themeCount;
        this.logPublishProgress(publishStatus);
        //Write staticPages backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/static-pages.json`, new TextEncoder().encode(JSON.stringify(backup.staticPages)), { create: true, parents: true, flush: flush });
        publishStatus.backups.staticPages.saved = backup.staticPageCount;
        this.logPublishProgress(publishStatus);
        this.logPublishProgress(publishStatus, `Flushing to IPFS...`);
        await this.ipfsService.ipfs.files.flush(`/export/${exportBundle.channel._id}/`);
        let result = await this.ipfsService.ipfs.files.stat(`/export/${exportBundle.channel._id}/`, {
            hash: true
        });
        this.logPublishProgress(publishStatus, `Published to local IPFS at ${result.cid.toString()}`);
        return {
            cid: result.cid.toString()
        };
    }
    async exportToFS(baseDir, channel, exportBundle, backup, feeRecipient) {
        //Save images
        await this._publishImagesFS(baseDir, exportBundle.imageCids);
        //Save animations
        await this._publishAnimationsFS(baseDir, exportBundle.animationCids);
        //Save NFT metadata
        await this._publishNFTMetadataFS(baseDir, exportBundle.channel, exportBundle.items);
        //Save contract metadata
        let contractMetadata = await this.channelService.exportContractMetadata(exportBundle.channel, feeRecipient);
        //Write to Git
        await this._writeFSAction({
            file_path: `${baseDir}/backup/export/contractMetadata.json`,
            content: Buffer.from(JSON.stringify(contractMetadata))
        });
        //Only copy contract info to git. IPFS doesn't know about it.
        if (channel.contractAddress) {
            await this._writeFSAction({
                file_path: `${baseDir}/backup/contract/contract.json`,
                content: Buffer.from(JSON.stringify({
                    contractAddress: channel.contractAddress,
                    ipfsCid: channel.publishReaderIPFSStatus?.cid
                }))
            });
            //Also the ABI
            await this._writeFSAction({
                file_path: `${baseDir}/backup/contract/contract-abi.json`,
                content: Buffer.from(JSON.stringify(_contracts_json__WEBPACK_IMPORTED_MODULE_3__))
            });
        }
        else {
            await this._writeFSAction({
                file_path: `${baseDir}/backup/contract/contract.json`,
                content: Buffer.from(JSON.stringify({}))
            });
            await this._writeFSAction({
                file_path: `${baseDir}/backup/contract/contract-abi.json`,
                content: Buffer.from(JSON.stringify({}))
            });
        }
        let productionURIInfo = await this.getProductionURIInfo(channel);
        let largeConfig = {
            "showMintPage": channel.showMintPage,
            "showActivityPage": channel.showActivityPage,
            "hostname": channel.productionHostname ? channel.productionHostname : productionURIInfo?.hostname,
            "libraryURL": channel.productionBaseLibraryURI,
            "baseURL": channel.productionBaseURI ? channel.productionBaseURI : productionURIInfo?.baseURI,
            "externalLinks": channel.externalLinks,
            "marketplaces": channel.marketplaces
        };
        //Copy a large-config.json to GitHub
        await this._writeFSAction({
            file_path: `${baseDir}/large-config.json`,
            content: Buffer.from(JSON.stringify(largeConfig))
        });
        await this._writeFSAction({
            file_path: `${baseDir}/backup/export/backup/channels.json`,
            content: Buffer.from(JSON.stringify(backup.channels))
        });
        await this._writeFSAction({
            file_path: `${baseDir}/backup/export/backup/authors.json`,
            content: Buffer.from(JSON.stringify(backup.authors))
        });
        await this._writeFSAction({
            file_path: `${baseDir}/backup/export/backup/items.json`,
            content: Buffer.from(JSON.stringify(backup.items))
        });
        await this._writeFSAction({
            file_path: `${baseDir}/backup/export/backup/originalMetadata.json`,
            content: Buffer.from(JSON.stringify(backup.originalMetadata))
        });
        await this._writeFSAction({
            file_path: `${baseDir}/backup/export/backup/images.json`,
            content: Buffer.from(JSON.stringify(backup.images))
        });
        await this._writeFSAction({
            file_path: `${baseDir}/backup/export/backup/animations.json`,
            content: Buffer.from(JSON.stringify(backup.animations))
        });
        await this._writeFSAction({
            file_path: `${baseDir}/backup/export/backup/themes.json`,
            content: Buffer.from(JSON.stringify(backup.themes))
        });
        await this._writeFSAction({
            file_path: `${baseDir}/backup/export/backup/static-pages.json`,
            content: Buffer.from(JSON.stringify(backup.staticPages))
        });
    }
    getIPFSDirectory(channel) {
        return `/export/${channel._id}`;
    }
    async getAnimationDirectoryCid(directory) {
        let cid;
        try {
            let stat = await this.ipfsService.ipfs.files.stat(`${directory}/animations/`, {
                hash: true
            });
            cid = stat.cid.toString();
        }
        catch (ex) { }
        return cid;
    }
    async getImageDirectoryCid(directory) {
        let cid;
        try {
            let stat = await this.ipfsService.ipfs.files.stat(`${directory}/images/`, {
                hash: true
            });
            cid = stat.cid.toString();
        }
        catch (ex) { }
        return cid;
    }
    async getFeeReceipient(channel, ownerAddress) {
        let feeRecipient;
        if (channel.forkType == "existing") {
            if (channel.forkedFromFeeRecipient) {
                feeRecipient = channel.forkedFromFeeRecipient;
            }
        }
        else {
            feeRecipient = ownerAddress;
        }
        return feeRecipient;
    }
    async _publishAnimationsIPFS(publishStatus, ipfsDirectory, animationCids, flush) {
        this.logPublishProgress(publishStatus, `Exporting ${animationCids.length} animations`);
        for (let animationCid of animationCids) {
            let animation = await this.animationService.get(animationCid);
            let ipfsFilename = `${ipfsDirectory}/animations/${animation.cid}.html`;
            let animationContent = {
                content: animation.content
            };
            //Check if it's already in IPFS
            let stat;
            try {
                stat = await this.ipfsService.ipfs.files.stat(ipfsFilename, { hash: true });
            }
            catch (ex) { }
            if (!stat?.cid.toString()) {
                const result = await this.ipfsService.ipfs.add(animationContent);
                await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, ipfsFilename, { parents: true, flush: flush });
                if (result.cid.toString() !== animation.cid.toString()) {
                    throw new Error(`Incorrect cid when saving animation. Expected: ${animation.cid}, Result: ${result.cid.toString()}`);
                }
                this.logPublishProgress(publishStatus, `Saving animation #${publishStatus.animations.saved} to ${ipfsDirectory}/animations/${animation.cid}.html (${animation.cid})`);
            }
            else {
                this.logPublishProgress(publishStatus, `${ipfsFilename} already exists. Skipping...`);
            }
            publishStatus.animations.saved++;
        }
    }
    async _publishAnimationsFS(baseDir, animationCids) {
        for (let animationCid of animationCids) {
            let animation = await this.animationService.get(animationCid);
            let animationContent = {
                content: animation.content
            };
            await this._writeFSAction({
                file_path: `${baseDir}/backup/export/animations/${animation.cid}.html`,
                content: Buffer.from(animationContent.content)
            });
        }
    }
    async _publishImagesIPFS(publishStatus, ipfsDirectory, imageCids, flush) {
        for (let imageCid of imageCids) {
            let image = await this.imageService.get(imageCid);
            let ipfsFilename = `${ipfsDirectory}/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}`;
            //Check if it's already in IPFS
            let stat;
            try {
                stat = await this.ipfsService.ipfs.files.stat(ipfsFilename, { hash: true });
            }
            catch (ex) { }
            if (!stat?.cid.toString()) {
                //Add to IPFS
                const result = await this.ipfsService.ipfs.add({
                    content: await this.imageService.getImageContent(image)
                });
                //Validate cid
                if (result.cid.toString() != image.cid) {
                    throw new Error(`Incorrect cid when saving image. Expected: ${image.cid}, Result: ${result.cid.toString()}`);
                }
                //Move to MFS directory in IPFS
                await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, ipfsFilename, { create: true, parents: true, flush: flush });
                this.logPublishProgress(publishStatus, `Saving image to ${ipfsFilename} (${image.cid})`);
            }
            else {
                this.logPublishProgress(publishStatus, `${ipfsFilename} already exists. Skipping...`);
            }
            publishStatus.images.saved++;
        }
    }
    async _publishImagesFS(baseDir, imageCids) {
        for (let imageCid of imageCids) {
            let image = await this.imageService.get(imageCid);
            let content = await this.imageService.getImageContent(image);
            await this._writeFSAction({
                file_path: `${baseDir}/backup/export/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}`,
                content: content
            });
        }
    }
    async _publishNFTMetadataIPFS(publishStatus, ipfsDirectory, channel, items, flush) {
        let gitActions = [];
        this.logPublishProgress(publishStatus, `Exporting ${items.length} metadata files`);
        let metadataNFTMap = {};
        for (let theItem of items) {
            let item = this.exportService.prepareItem(theItem);
            let ipfsFilename = `${ipfsDirectory}/metadata/${item.tokenId}.json`;
            let coverImage = await this.imageService.get(item.coverImageId);
            let nftMetadata = await this.itemService.exportNFTMetadata(channel, item, coverImage);
            let content = new TextEncoder().encode(JSON.stringify(nftMetadata));
            let contentCid = await ipfs_only_hash__WEBPACK_IMPORTED_MODULE_2__.of(content);
            metadataNFTMap[contentCid] = nftMetadata;
            //Check if it's already in IPFS
            let stat;
            try {
                stat = await this.ipfsService.ipfs.files.stat(ipfsFilename, { hash: true });
            }
            catch (ex) { }
            if (stat?.cid.toString() != contentCid) {
                const result = await this.ipfsService.ipfs.add({
                    content: content
                });
                // let nft = metadataNFTMap[result.cid.toString()]
                await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, ipfsFilename, { create: true, parents: true, flush: flush });
            }
            else {
                this.logPublishProgress(publishStatus, `${ipfsFilename} already exists. Skipping...`);
            }
            // let nft = metadataNFTMap[contentCid]
            // //Save to git
            // gitActions.push({
            //     action: "create",
            //     file_path: `/backup/export/metadata/${nft.tokenId}.json`,
            //     content: Buffer.from(JSON.stringify(nftMetadata))
            // })
            publishStatus.nftMetadata.saved++;
            this.logPublishProgress(publishStatus, `Saving #${item.tokenId} to ${ipfsFilename}`);
        }
        return gitActions;
    }
    async _publishNFTMetadataFS(baseDir, channel, items) {
        for (let theItem of items) {
            let item = this.exportService.prepareItem(theItem);
            let coverImage = await this.imageService.get(item.coverImageId);
            let nftMetadata = await this.itemService.exportNFTMetadata(channel, item, coverImage);
            //Save to git
            await this._writeFSAction({
                file_path: `${baseDir}/backup/export/metadata/${item.tokenId}.json`,
                content: Buffer.from(JSON.stringify(nftMetadata))
            });
        }
    }
    //** TODO: Move to appropriate git services */
    async getProductionURIInfo(channel) {
        let settings = await this.settingsService.get();
        let gitProvider;
        //If it's "default" or blank then look at the global default
        if (!channel.gitProvider || channel.gitProvider == "default") {
            if (settings.defaultGitProvider) {
                gitProvider = settings.defaultGitProvider;
            }
            else {
                gitProvider = "github";
            }
        }
        else {
            gitProvider = channel.gitProvider;
        }
        switch (gitProvider) {
            case "gitlab":
                function getGitLabUsername(url) {
                    const path = url.replace("https://gitlab.com/", "");
                    // Split the remaining path into parts
                    const parts = path.split("/");
                    // Extract the username and repository name
                    const username = parts[0];
                    return username;
                }
                if (!channel.httpUrlToRepo)
                    return;
                return {
                    hostname: `https://${getGitLabUsername(channel.httpUrlToRepo)}.gitlab.io`,
                    baseURI: `/${channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}/`
                };
            case "github":
                function getGitHubUsername(url) {
                    const path = url.replace("https://github.com/", "");
                    // Split the remaining path into parts
                    const parts = path.split("/");
                    // Extract the username and repository name
                    const username = parts[0];
                    return username;
                }
                if (!channel.httpUrlToRepo)
                    return;
                return {
                    hostname: `https://${getGitHubUsername(channel.httpUrlToRepo)}.github.io`,
                    baseURI: `/${channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}/`
                };
        }
    }
    _writeFSAction(action) {
        if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(path__WEBPACK_IMPORTED_MODULE_1___default().dirname(action.file_path))) {
            fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(path__WEBPACK_IMPORTED_MODULE_1___default().dirname(action.file_path), { recursive: true });
        }
        if (action.keepExisting) {
            if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(action.file_path)) {
                console.log(`Writing file: ${action.file_path}`);
                fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(action.file_path, action.content);
            }
        }
        else {
            console.log(`Writing file: ${action.file_path}`);
            fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(action.file_path, action.content);
        }
    }
    logPublishProgress(publishStatus, message) {
        if (message) {
            console.log(message);
        }
        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
            // browser
            const imageSelectedEvent = new CustomEvent('publish-progress', {
                detail: {
                    publishStatus: publishStatus,
                    message: message
                }
            });
            document.dispatchEvent(imageSelectedEvent);
        }
    }
};
PublishService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_4__.injectable)(),
    __param(7, (0,inversify__WEBPACK_IMPORTED_MODULE_5__.inject)(_types_js__WEBPACK_IMPORTED_MODULE_6__["default"].WalletService)),
    __metadata("design:paramtypes", [_channel_service_js__WEBPACK_IMPORTED_MODULE_7__.ChannelService,
        _item_service_js__WEBPACK_IMPORTED_MODULE_8__.ItemService,
        _ipfs_service_js__WEBPACK_IMPORTED_MODULE_9__.IpfsService,
        _image_service_js__WEBPACK_IMPORTED_MODULE_10__.ImageService,
        _animation_service_js__WEBPACK_IMPORTED_MODULE_11__.AnimationService,
        _export_service_js__WEBPACK_IMPORTED_MODULE_12__.ExportService,
        _settings_service_js__WEBPACK_IMPORTED_MODULE_13__.SettingsService, Object])
], PublishService);



/***/ }),

/***/ "./src/admin/service/core/query-cache-service.ts":
/*!*******************************************************!*\
  !*** ./src/admin/service/core/query-cache-service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryCacheService: () => (/* binding */ QueryCacheService)
/* harmony export */ });
/* unused harmony export cacheQuery */
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _repository_query_cache_repository_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../repository/query-cache-repository.js */ "./src/admin/repository/query-cache-repository.ts");
/* harmony import */ var _dto_query_cache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dto/query-cache.js */ "./src/admin/dto/query-cache.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let QueryCacheService = class QueryCacheService {
    queryCacheRepository;
    constructor(queryCacheRepository) {
        this.queryCacheRepository = queryCacheRepository;
    }
    async put(queryCache) {
        if (!queryCache) {
            queryCache = new _dto_query_cache_js__WEBPACK_IMPORTED_MODULE_0__.QueryCache();
            queryCache.dateCreated = new Date().toJSON();
        }
        queryCache.lastUpdated = new Date().toJSON();
        await this.queryCacheRepository.put(queryCache);
    }
    async get(queryName) {
        return this.queryCacheRepository.get(queryName);
    }
    async delete(_id) {
        console.log(_id);
        await this.queryCacheRepository.delete(_id);
    }
};
QueryCacheService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [_repository_query_cache_repository_js__WEBPACK_IMPORTED_MODULE_2__.QueryCacheRepository])
], QueryCacheService);
function cacheQuery(queryName) {
    return function (target, propertyKey, descriptor) {
        const serializeArgs = (...args) => args
            .map((arg) => arg?.toString())
            .join(':');
        const originalValue = descriptor.value;
        descriptor.value = async function () {
            const serializedArguments = serializeArgs(...arguments);
            let queryCacheService = globalThis.container.get(QueryCacheService);
            let cacheQueryName = `${queryName}_${serializedArguments}`;
            let cachedResult = await queryCacheService.get(cacheQueryName);
            if (cachedResult && !cachedResult.stale)
                return cachedResult.result;
            // call the original function
            let result;
            if (Array.isArray(arguments)) {
                result = await originalValue.apply(this, ...arguments);
            }
            else {
                result = await originalValue.apply(this, arguments);
            }
            if (!cachedResult) {
                cachedResult = {
                    _id: cacheQueryName
                };
            }
            cachedResult.result = result;
            cachedResult.stale = false;
            await queryCacheService.put(cachedResult);
            return result;
        };
    };
}



/***/ }),

/***/ "./src/admin/service/core/queue-service.ts":
/*!*************************************************!*\
  !*** ./src/admin/service/core/queue-service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueueService: () => (/* binding */ QueueService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

let QueueService = class QueueService {
    app;
    constructor(app) {
        this.app = app;
    }
    async queuePromiseView(promiseView) {
        const self = this;
        let queueItem = {
            id: Guid.newGuid(),
            icon: promiseView.icon,
            title: promiseView.title,
        };
        let before = async function () {
            return new Promise((resolve, reject) => {
                self._beforeSaveAction(queueItem);
                resolve();
            });
        };
        let after = async function () {
            let result = await promiseView.promise;
            try {
                self._showSuccess(result, queueItem);
            }
            catch (ex) {
                self._showError(ex, queueItem);
            }
            return result;
        };
        return before()
            .then(after);
    }
    _beforeSaveAction(queueItem) {
        // Create toast with close button
        queueItem.toast = this.app.toast.create({
            text: queueItem.title,
            closeButton: false
        });
        queueItem.toast.open();
    }
    _showError(error, queueItem) {
        queueItem.toast.close();
        console.log(error);
        let toast = {
            text: error.message,
            closeButton: true,
            closeButtonText: "Close",
            closeTimeout: 5000
        };
        this.app.toast.create(toast).open();
    }
    _showSuccess(result, queueItem) {
        const self = this;
        queueItem.toast.close();
        let toast = {
            text: "Transaction Submitted",
            closeButton: true,
            closeTimeout: 5000
        };
        this.app.toast.create(toast).open();
    }
};
QueueService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("framework7")),
    __metadata("design:paramtypes", [Object])
], QueueService);
//from https://stackoverflow.com/questions/26501688/a-typescript-guid-class
class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}



/***/ }),

/***/ "./src/admin/service/core/routing-service.ts":
/*!***************************************************!*\
  !*** ./src/admin/service/core/routing-service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoutingService: () => (/* binding */ RoutingService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var _ui_service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui-service.js */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _inversify_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../inversify.config.js */ "./src/admin/inversify.config.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



let RoutingService = class RoutingService {
    uiService;
    app;
    constructor(uiService, app) {
        this.uiService = uiService;
        this.app = app;
    }
    navigate(navigateParams, routeOptions, viewName = 'main') {
        console.log(`${viewName}: navigating to ${navigateParams.path}`);
        if (!routeOptions)
            routeOptions = {
                reloadCurrent: true,
                ignoreCache: false,
                browserHistory: true
            };
        let view = this.app.view[viewName];
        if (view) {
            view.router.navigate(navigateParams, routeOptions);
        }
        else {
            console.log(`Could not find view ${viewName}`);
        }
    }
    navigateUrl(url, routeOptions, viewName = 'main') {
        console.log(`${viewName}: navigating to ${url}`);
        let view = this.app.view[viewName];
        if (view) {
            view.router.navigate(url, routeOptions);
        }
        else {
            console.log(`Could not find view ${viewName}`);
        }
    }
    buildRoutesForContainer(container) {
        let routes = [];
        //Look up requestMappings 
        for (let mappedRoute of globalThis.mappedRoutes) {
            //Look up matching bean
            let controllerBean = container.get(mappedRoute.controllerClass);
            routes.push({
                path: mappedRoute.path,
                async: async (ctx) => {
                    try {
                        await this.resolveRoute(ctx.to, ctx.resolve, controllerBean[mappedRoute.action](), mappedRoute.showSpinner);
                    }
                    catch (ex) {
                        this.uiService.showExceptionPopup(ex);
                    }
                }
            });
        }
        //Needs to be last
        routes.push({
            path: '(.*)',
            // url: 'pages/404.html',
            async async(ctx) {
                // this.uiService.showPopup("Page was not found")
                console.log(`404 error: ${ctx.to.path}`);
            }
        });
        return routes;
    }
    async resolveRoute(routeTo, resolve, controller_promise, showSpinner = true) {
        if (showSpinner) {
            this.uiService.showSpinner("Loading...");
        }
        let modelView = await controller_promise;
        if (!modelView)
            return;
        let model = await modelView.model;
        let modelResult = await model(routeTo);
        //Attach container to props.
        let props = Object.assign({}, modelResult);
        props.container = _inversify_config_js__WEBPACK_IMPORTED_MODULE_0__.container;
        if (modelView.view) {
            //Load the new component if it's given to us. 
            resolve({
                component: modelView.view
            }, {
                props: props,
                history: true,
                browserHistory: true
            });
        }
        if (showSpinner) {
            this.uiService.hideSpinner();
        }
    }
};
RoutingService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("framework7")),
    __metadata("design:paramtypes", [_ui_service_js__WEBPACK_IMPORTED_MODULE_3__.UiService, Object])
], RoutingService);



/***/ }),

/***/ "./src/admin/service/core/schema-service.ts":
/*!**************************************************!*\
  !*** ./src/admin/service/core/schema-service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SchemaService: () => (/* binding */ SchemaService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _repository_animation_repository_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../repository/animation-repository.js */ "./src/admin/repository/animation-repository.ts");
/* harmony import */ var _repository_author_repository_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../repository/author-repository.js */ "./src/admin/repository/author-repository.ts");
/* harmony import */ var _repository_channel_repository_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../repository/channel-repository.js */ "./src/admin/repository/channel-repository.ts");
/* harmony import */ var _repository_settings_repository_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../repository/settings-repository.js */ "./src/admin/repository/settings-repository.ts");
/* harmony import */ var _repository_image_repository_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../repository/image-repository.js */ "./src/admin/repository/image-repository.ts");
/* harmony import */ var _repository_item_repository_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../repository/item-repository.js */ "./src/admin/repository/item-repository.ts");
/* harmony import */ var _repository_static_page_repository_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../repository/static-page-repository.js */ "./src/admin/repository/static-page-repository.ts");
/* harmony import */ var _repository_theme_repository_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../repository/theme-repository.js */ "./src/admin/repository/theme-repository.ts");
/* harmony import */ var _repository_token_metadata_cache_repository_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../repository/token-metadata-cache-repository.js */ "./src/admin/repository/token-metadata-cache-repository.ts");
/* harmony import */ var _repository_query_cache_repository_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../repository/query-cache-repository.js */ "./src/admin/repository/query-cache-repository.ts");
/* harmony import */ var _repository_attribute_count_repository_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../repository/attribute-count-repository.js */ "./src/admin/repository/attribute-count-repository.ts");
/* harmony import */ var _database_service_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./database-service.js */ "./src/admin/service/core/database-service.ts");
/* harmony import */ var _repository_original_metadata_repository_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../repository/original-metadata-repository.js */ "./src/admin/repository/original-metadata-repository.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














let SchemaService = class SchemaService {
    authorRepository;
    channelRepository;
    imageRepository;
    itemRepository;
    settingsRepository;
    animationRepository;
    themeRepository;
    staticPageRepository;
    tokenMetadataCacheRepository;
    queryCacheRepository;
    attributeCountRepository;
    originalMetadataRepository;
    databaseService;
    loadedChannelId;
    constructor(authorRepository, channelRepository, imageRepository, itemRepository, settingsRepository, animationRepository, themeRepository, staticPageRepository, tokenMetadataCacheRepository, queryCacheRepository, attributeCountRepository, originalMetadataRepository, databaseService) {
        this.authorRepository = authorRepository;
        this.channelRepository = channelRepository;
        this.imageRepository = imageRepository;
        this.itemRepository = itemRepository;
        this.settingsRepository = settingsRepository;
        this.animationRepository = animationRepository;
        this.themeRepository = themeRepository;
        this.staticPageRepository = staticPageRepository;
        this.tokenMetadataCacheRepository = tokenMetadataCacheRepository;
        this.queryCacheRepository = queryCacheRepository;
        this.attributeCountRepository = attributeCountRepository;
        this.originalMetadataRepository = originalMetadataRepository;
        this.databaseService = databaseService;
    }
    async load() {
        console.log(`Loading databases`);
        //Open and cache databases
        await this.channelRepository.load();
        await this.settingsRepository.load();
        await this.tokenMetadataCacheRepository.load();
        await this.queryCacheRepository.load();
    }
    async loadChannel(channelId) {
        if (this.loadedChannelId == channelId)
            return;
        console.time(`Loading channel: ${channelId}`);
        await this.authorRepository.load(channelId);
        await this.itemRepository.load(channelId);
        await this.animationRepository.load(channelId);
        await this.originalMetadataRepository.load(channelId);
        await this.imageRepository.load(channelId);
        await this.themeRepository.load(channelId);
        await this.staticPageRepository.load(channelId);
        await this.attributeCountRepository.load(channelId);
        this.loadedChannelId = channelId;
        console.timeEnd(`Loading channel: ${channelId}`);
    }
    async loadEmptyChannel(channelId) {
        if (this.loadedChannelId == channelId)
            return;
        console.time(`Loading empty channel: ${channelId}`);
        await this.authorRepository.loadEmpty(channelId);
        await this.itemRepository.loadEmpty(channelId);
        await this.animationRepository.loadEmpty(channelId);
        await this.originalMetadataRepository.loadEmpty(channelId);
        await this.imageRepository.loadEmpty(channelId);
        await this.themeRepository.loadEmpty(channelId);
        await this.staticPageRepository.loadEmpty(channelId);
        await this.attributeCountRepository.loadEmpty(channelId);
        this.loadedChannelId = channelId;
        console.timeEnd(`Loading empty channel: ${channelId}`);
    }
    async loadChannelBackup(channelBackup) {
        console.time(`Loading channel from backup`);
        await this.loadEmptyChannel(channelBackup.channel._id);
        console.log(`Loading:
            Items: ${channelBackup.items ? channelBackup.items.length : 0}
            Themes: ${channelBackup.themes ? channelBackup.themes.length : 0}
            Static Pages: ${channelBackup.staticPages ? channelBackup.staticPages.length : 0}
            Attribute Counts: ${channelBackup.attributeCounts ? channelBackup.attributeCounts.length : 0}
            Authors: ${channelBackup.authors ? channelBackup.authors.length : 0}
            Original Metadata: ${channelBackup.originalMetadata ? channelBackup.originalMetadata.length : 0}

        `);
        const prepareRows = (rows) => {
            rows.map(row => {
                delete row._rev;
                delete row['_rev_tree'];
            });
        };
        prepareRows(channelBackup.items);
        prepareRows(channelBackup.themes);
        prepareRows(channelBackup.staticPages);
        prepareRows(channelBackup.attributeCounts);
        prepareRows(channelBackup.authors);
        prepareRows(channelBackup.originalMetadata);
        await this.itemRepository.db.bulkDocs(channelBackup.items);
        await this.themeRepository.db.bulkDocs(channelBackup.themes);
        await this.staticPageRepository.db.bulkDocs(channelBackup.staticPages);
        await this.attributeCountRepository.db.bulkDocs(channelBackup.attributeCounts);
        await this.authorRepository.db.bulkDocs(channelBackup.authors);
        await this.channelRepository.db.bulkDocs([channelBackup.channel]);
        await this.originalMetadataRepository.db.bulkDocs(channelBackup.originalMetadata);
        console.timeEnd(`Loading channel from backup`);
    }
    async backupChannel() {
        let channel = await this.channelRepository.get(this.loadedChannelId);
        let itemDocs = await this.itemRepository.db.allDocs({ include_docs: true });
        let animationsDocs = await this.animationRepository.db.allDocs({ include_docs: true });
        let imagesDocs = await this.imageRepository.db.allDocs({ include_docs: true });
        let themesDocs = await this.themeRepository.db.allDocs({ include_docs: true });
        let staticPagesDocs = await this.staticPageRepository.db.allDocs({ include_docs: true });
        let attributeCountsDocs = await this.attributeCountRepository.db.allDocs({ include_docs: true });
        let authorDocs = await this.authorRepository.db.allDocs({ include_docs: true });
        let originalMetadataDocs = await this.originalMetadataRepository.db.allDocs({ include_docs: true });
        return {
            channel: channel,
            items: itemDocs.rows.map(r => r.doc),
            animations: animationsDocs.rows.map(r => r.doc),
            images: imagesDocs.rows.map(r => r.doc),
            themes: themesDocs.rows.map(r => r.doc),
            staticPages: staticPagesDocs.rows.map(r => r.doc),
            attributeCounts: attributeCountsDocs.rows.map(r => r.doc),
            authors: authorDocs.rows.map(r => r.doc),
            originalMetadata: originalMetadataDocs.rows.map(r => r.doc)
        };
    }
    async dropChannel(channelId) {
        console.log(`Dropping channel: ${channelId}`);
        //Delete all files and then compact()
        let clearDatabase = async (db) => {
            let updatedRows = [];
            let result = await db.allDocs();
            for (let row of result.rows) {
                if (row.id.startsWith("_design") || row.id.startsWith("_local"))
                    continue;
                updatedRows.push({
                    _id: row.id,
                    _rev: row.value.rev,
                    _deleted: true
                });
            }
            const details = await db.info();
            //Remove
            await db.bulkDocs(updatedRows);
            //Compact
            await db.compact();
            //Clear cached copy
            delete this.databaseService.dbCache[details.db_name];
        };
        await clearDatabase(this.authorRepository.db);
        await clearDatabase(this.itemRepository.db);
        await clearDatabase(this.animationRepository.db);
        await clearDatabase(this.originalMetadataRepository.db);
        await clearDatabase(this.imageRepository.db);
        await clearDatabase(this.themeRepository.db);
        await clearDatabase(this.staticPageRepository.db);
        await clearDatabase(this.attributeCountRepository.db);
    }
};
SchemaService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(),
    __metadata("design:paramtypes", [_repository_author_repository_js__WEBPACK_IMPORTED_MODULE_1__.AuthorRepository,
        _repository_channel_repository_js__WEBPACK_IMPORTED_MODULE_2__.ChannelRepository,
        _repository_image_repository_js__WEBPACK_IMPORTED_MODULE_3__.ImageRepository,
        _repository_item_repository_js__WEBPACK_IMPORTED_MODULE_4__.ItemRepository,
        _repository_settings_repository_js__WEBPACK_IMPORTED_MODULE_5__.SettingsRepository,
        _repository_animation_repository_js__WEBPACK_IMPORTED_MODULE_6__.AnimationRepository,
        _repository_theme_repository_js__WEBPACK_IMPORTED_MODULE_7__.ThemeRepository,
        _repository_static_page_repository_js__WEBPACK_IMPORTED_MODULE_8__.StaticPageRepository,
        _repository_token_metadata_cache_repository_js__WEBPACK_IMPORTED_MODULE_9__.TokenMetadataCacheRepository,
        _repository_query_cache_repository_js__WEBPACK_IMPORTED_MODULE_10__.QueryCacheRepository,
        _repository_attribute_count_repository_js__WEBPACK_IMPORTED_MODULE_11__.AttributeCountRepository,
        _repository_original_metadata_repository_js__WEBPACK_IMPORTED_MODULE_12__.OriginalMetadataRepository,
        _database_service_js__WEBPACK_IMPORTED_MODULE_13__.DatabaseService])
], SchemaService);



/***/ }),

/***/ "./src/admin/service/core/settings-service.ts":
/*!****************************************************!*\
  !*** ./src/admin/service/core/settings-service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsService: () => (/* binding */ SettingsService)
/* harmony export */ });
/* harmony import */ var _dto_settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dto/settings.js */ "./src/admin/dto/settings.ts");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _repository_settings_repository_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../repository/settings-repository.js */ "./src/admin/repository/settings-repository.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/index.js");
/* harmony import */ var _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/validation-exception.js */ "./src/admin/util/validation-exception.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let SettingsService = class SettingsService {
    settingsRepository;
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async get() {
        let settings;
        try {
            settings = await this.settingsRepository.get();
        }
        catch (ex) { }
        if (settings)
            return settings;
        return Object.assign(new _dto_settings_js__WEBPACK_IMPORTED_MODULE_0__.Settings(), {
            _id: 'single',
            defaultGitProvider: 'github',
            gitProviders: {
                gitlab: {
                    name: "gitlab" //username and password added when saved
                },
                github: {
                    name: "github" //username and password added when saved
                }
            },
            welcomeHide: false
        });
    }
    async put(settings) {
        if (!settings._id) {
            settings._id = "single";
            settings.dateCreated = new Date().toJSON();
        }
        else {
            settings.lastUpdated = new Date().toJSON();
        }
        //Validate
        let errors = await (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.validate)(settings, {
            forbidUnknownValues: true,
            whitelist: true
        });
        if (errors.length > 0) {
            throw new _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_2__.ValidationException(errors);
        }
        await this.settingsRepository.put(settings);
    }
};
SettingsService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [_repository_settings_repository_js__WEBPACK_IMPORTED_MODULE_4__.SettingsRepository])
], SettingsService);



/***/ }),

/***/ "./src/admin/service/core/types.ts":
/*!*****************************************!*\
  !*** ./src/admin/service/core/types.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const TYPES = {
    WalletService: Symbol("WalletService"),
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TYPES);


/***/ }),

/***/ "./src/admin/service/core/ui-service.ts":
/*!**********************************************!*\
  !*** ./src/admin/service/core/ui-service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UiService: () => (/* binding */ UiService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

let UiService = class UiService {
    app;
    constructor(app) {
        this.app = app;
    }
    showExceptionPopup(ex) {
        console.log(ex);
        this.app.dialog.alert(ex.message, "There was an error");
    }
    showPopup(message) {
        this.app.dialog.alert(message);
    }
    showAlert(message) {
        this.app.dialog.alert(message);
    }
    /**
     * Spinner
     */
    spinnerDialog;
    showSpinner(message) {
        if (this.spinnerDialog)
            this.hideSpinner();
        this.spinnerDialog = this.app.dialog.preloader(message ? message : "Loading");
    }
    hideSpinner() {
        if (this.spinnerDialog) {
            this.spinnerDialog.close();
            this.spinnerDialog = null;
        }
    }
    progressDialog;
    showProgress(message) {
        if (this.progressDialog)
            this.hideProgress();
        var progress = 0;
        this.progressDialog = this.app.dialog.progress(message ? message : "Loading", progress);
    }
    setProgress(progress, message) {
        if (this.progressDialog) {
            this.progressDialog.setProgress(progress);
            this.progressDialog.setText(message);
        }
    }
    hideProgress() {
        if (this.progressDialog) {
            this.progressDialog.close();
            this.progressDialog = null;
        }
    }
};
UiService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("framework7")),
    __metadata("design:paramtypes", [Object])
], UiService);



/***/ }),

/***/ "./src/admin/service/core/upload-service.ts":
/*!**************************************************!*\
  !*** ./src/admin/service/core/upload-service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UploadService: () => (/* binding */ UploadService)
/* harmony export */ });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let UploadService = class UploadService {
    constructor() { }
    async uploadFile(fileElement) {
        const self = this;
        let buf;
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async function () {
                // @ts-ignore
                buf = new buffer__WEBPACK_IMPORTED_MODULE_0__.Buffer(reader.result);
                if (buf) {
                    resolve(buf);
                }
            };
            if (fileElement.files.length > 0) {
                reader.readAsArrayBuffer(fileElement.files[0]);
            }
            else {
                resolve(buf);
            }
        });
    }
};
UploadService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);



/***/ }),

/***/ "./src/admin/service/core/wallet-service-impl.ts":
/*!*******************************************************!*\
  !*** ./src/admin/service/core/wallet-service-impl.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletServiceImpl: () => (/* binding */ WalletServiceImpl)
/* harmony export */ });
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/contract/contract.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


let WalletServiceImpl = class WalletServiceImpl {
    contracts;
    getProvider;
    $f7;
    wallet;
    address;
    ethersContracts = {};
    provider;
    constructor(contracts, getProvider, $f7) {
        this.contracts = contracts;
        this.getProvider = getProvider;
        this.$f7 = $f7;
    }
    async initProvider() {
        this.provider = this.getProvider();
        globalThis.ethereum?.on('accountsChanged', async (accounts) => {
            delete this.address;
            if (accounts?.length > 0) {
                await this.initWallet();
            }
            this.$f7.views.main.router.refreshPage();
        });
    }
    async initWallet() {
        console.log('Init wallet');
        delete this.address;
        if (!this.provider) {
            await this.initProvider();
        }
        let accounts = await this.provider.send("eth_accounts", []);
        if (accounts?.length > 0) {
            // this.address = accounts[0]
            return this.connect();
        }
        console.log("Init wallet complete");
    }
    async connect() {
        console.log("Connect wallet");
        await this.provider.send("eth_requestAccounts", []);
        this.wallet = await this.provider.getSigner();
        this.address = await this.getAddress();
        console.log(`Wallet ${this.address} connected`);
    }
    async getAddress() {
        if (!this.provider)
            return;
        let accounts = await this.provider.send("eth_accounts", []);
        if (accounts?.length > 0) {
            return accounts[0];
        }
    }
    async getWallet() {
        return this.provider.getSigner();
    }
    getContract(name) {
        //If it's cached and the same wallet just return it.
        if (this.ethersContracts[name] && this.ethersContracts[name].signer == this.wallet)
            return this.ethersContracts[name];
        //Initialize and return
        let c = this.contracts[name];
        this.ethersContracts[name] = new ethers__WEBPACK_IMPORTED_MODULE_0__.Contract(c.address, c.abi, this.wallet ? this.wallet : this.provider);
        // console.log(`Getting contract ${name}`)
        return this.ethersContracts[name];
    }
    truncateEthAddress(address) {
        // Captures 0x + 4 characters, then the last 4 characters.
        const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
        const match = address.match(truncateRegex);
        if (!match)
            return address;
        return `${match[1]}…${match[2]}`;
    }
};
WalletServiceImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("contracts")),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("provider")),
    __param(2, (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("framework7")),
    __metadata("design:paramtypes", [Array, Function, Object])
], WalletServiceImpl);



/***/ }),

/***/ "./src/admin/service/image-service.ts":
/*!********************************************!*\
  !*** ./src/admin/service/image-service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageService: () => (/* binding */ ImageService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var html_truncate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-truncate */ "./node_modules/html-truncate/lib/truncate.js");
/* harmony import */ var html_truncate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(html_truncate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mini_svg_data_uri__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mini-svg-data-uri */ "./node_modules/mini-svg-data-uri/index.js");
/* harmony import */ var mini_svg_data_uri__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mini_svg_data_uri__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dto_image_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dto/image.js */ "./src/admin/dto/image.ts");
/* harmony import */ var _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/validation-exception.js */ "./src/admin/util/validation-exception.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/index.js");
/* harmony import */ var _repository_image_repository_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../repository/image-repository.js */ "./src/admin/repository/image-repository.ts");
/* harmony import */ var ipfs_only_hash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ipfs-only-hash */ "./node_modules/ipfs-only-hash/index.js");
/* harmony import */ var _svg_service_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./svg-service.js */ "./src/admin/service/svg-service.ts");
/* harmony import */ var _quill_service_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./quill-service.js */ "./src/admin/service/quill-service.ts");
/* harmony import */ var _theme_service_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./theme-service.js */ "./src/admin/service/theme-service.ts");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












let ImageService = class ImageService {
    imageRepository;
    svgService;
    quillService;
    themeService;
    db;
    constructor(imageRepository, svgService, quillService, themeService) {
        this.imageRepository = imageRepository;
        this.svgService = svgService;
        this.quillService = quillService;
        this.themeService = themeService;
    }
    async load(channelId) {
        this.db = await this.imageRepository.load(channelId);
    }
    async get(_id) {
        return this.imageRepository.get(_id);
    }
    async put(image) {
        if (!image._id) {
            image._id = image.cid;
            image.dateCreated = new Date().toJSON();
        }
        //Validate
        let errors = await (0,class_validator__WEBPACK_IMPORTED_MODULE_4__.validate)(image, {
            forbidUnknownValues: true,
            whitelist: true
        });
        if (errors.length > 0) {
            throw new _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_5__.ValidationException(errors);
        }
        await this.imageRepository.put(image);
    }
    async delete(image) {
        await this.imageRepository.delete(image);
    }
    async newFromBuffer(buffer) {
        const image = new _dto_image_js__WEBPACK_IMPORTED_MODULE_6__.Image();
        image.buffer = buffer;
        image.cid = await ipfs_only_hash__WEBPACK_IMPORTED_MODULE_3__.of(buffer);
        image.generated = false;
        return image;
    }
    async newFromSvg(svg) {
        const image = new _dto_image_js__WEBPACK_IMPORTED_MODULE_6__.Image();
        image.svg = svg;
        image.cid = await ipfs_only_hash__WEBPACK_IMPORTED_MODULE_3__.of(image.svg);
        image.generated = true;
        return image;
    }
    async getUrl(image) {
        if (!image.buffer && !image.svg)
            return "";
        //If we have a buffer return it as a URL
        if (image.buffer) {
            let blob = this.bufferToBlob(image.buffer);
            return this.blobToDataURL(blob);
        }
        if (image.svg) {
            return this.getSVGURL(image);
        }
    }
    async getSVGURL(image) {
        if (!image.svg)
            return "";
        return this.svgToDataURL(image.svg);
    }
    bufferToBlob(buffer) {
        if (Blob != undefined) {
            //@ts-ignore
            return new Blob([buffer], { type: "image/jpg" });
        }
    }
    blobToDataURL(blob) {
        let dataUrl;
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = async function () {
                dataUrl = fr.result;
                resolve(dataUrl);
            };
            fr.readAsDataURL(blob);
        });
    }
    svgToDataURL(svgStr) {
        return mini_svg_data_uri__WEBPACK_IMPORTED_MODULE_1___default()(svgStr);
        // return "data:image/svg+xml;base64," + Buffer.from(svgStr).toString("base64")
    }
    async newFromItem(item) {
        let content = await this.quillService.translateContentEncodeHtml(item.content);
        let themes = [];
        if (item.themes) {
            for (let theme of item.themes) {
                themes.push(await this.themeService.get(theme));
            } //might not exist because it got deleted.
        }
        let allThemeCss = "";
        if (themes?.length > 0) {
            for (let css of themes?.map(theme => theme?.coverImageCSS)) {
                if (css?.length > 0)
                    allThemeCss += css;
            }
        }
        let excerpt = this.getExcerptByFirstParagraph(content, {
            pruneLength: 500
        });
        if (!excerpt || excerpt.length == 0) {
            throw new Error("No text");
        }
        const image = new _dto_image_js__WEBPACK_IMPORTED_MODULE_6__.Image();
        image.svg = await this.svgService.fromText(item.title, excerpt, item.coverImageCSS, allThemeCss);
        image.cid = await ipfs_only_hash__WEBPACK_IMPORTED_MODULE_3__.of(image.svg);
        // console.log(new TextEncoder().encode(image.svg))
        // console.log(image.cid)
        image.generated = true;
        return image;
    }
    //Grabbing from the 
    getExcerptByFirstParagraph(excerpt, options) {
        //Strip tags except for <p>
        // excerpt = excerpt.replace(/<(?![p|br]\s*\/?)[^>]+>/g, '')
        excerpt = he__WEBPACK_IMPORTED_MODULE_2___default().unescape(excerpt);
        const pruneLength = typeof options.pruneLength === 'number' ? options.pruneLength : 140;
        if (pruneLength > 0) {
            excerpt = html_truncate__WEBPACK_IMPORTED_MODULE_0___default()(excerpt, pruneLength, {
                ellipsis: ""
            });
        }
        excerpt = he__WEBPACK_IMPORTED_MODULE_2___default().encode(excerpt, { allowUnsafeSymbols: true });
        return excerpt;
    }
    async getByIds(ids) {
        return this.imageRepository.getByIds(ids);
    }
    async getImageContent(image) {
        let content;
        if (image.buffer) {
            if (content instanceof Uint8Array) {
                content = image.buffer;
            }
            else {
                // @ts-ignore
                content = Buffer.from(Object.values(image.buffer)); //this is because pouchdb allDocs is returning a weird format of the data on node.
                // content = new Uint8Array(image.buffer.data) 
            }
        }
        else if (image.svg) {
            content = image.svg;
        }
        return content;
    }
    async loadImage(image, imageData) {
        return new Promise(function (resolved, rejected) {
            //@ts-ignore
            image.onload = function () {
                //@ts-ignore
                resolved();
            };
            image.src = URL.createObjectURL(new Blob([imageData], { 'type': 'image/jpg' }));
        });
    }
    async phlipImage(inputImage) {
        const outputImage = document.createElement("canvas");
        outputImage.width = inputImage.naturalWidth;
        outputImage.height = inputImage.naturalHeight;
        const ctx = outputImage.getContext("2d");
        // Phlip the image by scaling negatively to the left
        ctx.scale(-1, 1);
        // Draw the image on the canvas
        // Starts at [-width, 0] because the phlip scaled negatively
        ctx.drawImage(inputImage, -outputImage.width, 0);
        const imageData = ctx.getImageData(0, 0, outputImage.width, outputImage.height);
        const binary = new Uint8Array(imageData.data.length);
        for (let i = 0; i < imageData.data.length; i++) {
            binary[i] = imageData.data[i];
        }
        return binary;
    }
};
ImageService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_7__.injectable)(),
    __metadata("design:paramtypes", [_repository_image_repository_js__WEBPACK_IMPORTED_MODULE_8__.ImageRepository,
        _svg_service_js__WEBPACK_IMPORTED_MODULE_9__.SvgService,
        _quill_service_js__WEBPACK_IMPORTED_MODULE_10__.QuillService,
        _theme_service_js__WEBPACK_IMPORTED_MODULE_11__.ThemeService])
], ImageService);



/***/ }),

/***/ "./src/admin/service/item-service.ts":
/*!*******************************************!*\
  !*** ./src/admin/service/item-service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemService: () => (/* binding */ ItemService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/validation-exception.js */ "./src/admin/util/validation-exception.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _repository_item_repository_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../repository/item-repository.js */ "./src/admin/repository/item-repository.ts");
/* harmony import */ var _image_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./image-service.js */ "./src/admin/service/image-service.ts");
/* harmony import */ var _core_query_cache_service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/query-cache-service.js */ "./src/admin/service/core/query-cache-service.ts");
/* harmony import */ var _original_metadata_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./original-metadata-service.js */ "./src/admin/service/original-metadata-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let ItemService = class ItemService {
    itemRepository;
    imageService;
    queryCacheService;
    originalMetadataService;
    constructor(itemRepository, imageService, queryCacheService, originalMetadataService) {
        this.itemRepository = itemRepository;
        this.imageService = imageService;
        this.queryCacheService = queryCacheService;
        this.originalMetadataService = originalMetadataService;
    }
    async get(_id) {
        return this.itemRepository.get(_id);
    }
    async getIds() {
        return this.itemRepository.getIds();
    }
    async getLatestRevision(_id) {
        return this.itemRepository.getLatestRevision(_id);
    }
    async getByTokenId(channelId, tokenId) {
        return this.itemRepository.getByTokenId(channelId, tokenId);
    }
    async put(item) {
        if (!item._id) {
            item._id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
            item.dateCreated = new Date().toJSON();
            //Get next token ID
            if (item.tokenId == undefined) {
                item.tokenId = await this.getNextTokenId(item.channelId);
            }
        }
        else {
            item.lastUpdated = new Date().toJSON();
        }
        //Validate
        let errors = await (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.validate)(item, {
            forbidUnknownValues: true,
            whitelist: true
        });
        if (errors.length > 0) {
            throw new _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_2__.ValidationException(errors);
        }
        await this.itemRepository.put(item);
    }
    async delete(item) {
        await this.itemRepository.delete(item);
    }
    async getByImageId(imageId) {
        return this.itemRepository.getByImageId(imageId);
    }
    async getByAnimationId(animationId) {
        return this.itemRepository.getByAnimationId(animationId);
    }
    async listByChannel(channelId, limit, skip) {
        return this.itemRepository.listByChannel(channelId, limit, skip);
    }
    async exportNFTMetadata(channel, item, coverImage) {
        //We are publishing an existing collection that we are not editing then export the original metadata
        if (channel.forkType == "existing") {
            console.log(`Exporting original metadata for token #${item.tokenId}`);
            let originalMetadata = await this.originalMetadataService.get(item.originalJSONMetadataId);
            return JSON.parse(originalMetadata.content);
        }
        let result = {
            tokenId: item.tokenId,
            name: item.title,
            description: item.description,
        };
        if (item.animationId && !item.coverImageAsAnimation) {
            result.animation_url = `ipfs://${item.animationId}`;
        }
        if (item.coverImageId) {
            result.image = `ipfs://${coverImage.cid}`;
        }
        //Only show attributes that are valid at the category level. 
        if (channel.attributeOptions.length > 0) {
            result.attributes = channel.attributeOptions.map(ao => {
                //find the one selected by this item
                let selections = item?.attributeSelections?.filter(as => ao.traitType == as.traitType);
                return {
                    trait_type: ao.traitType,
                    value: selections?.length > 0 ? selections[0].value : ''
                };
            });
        }
        return result;
    }
    async setDefaultCoverImage(item) {
        let generated = await this.imageService.newFromItem(item);
        //Save it if it doesn't exist
        let existing = await this.get(generated.cid);
        if (existing) {
            item.coverImageId = existing._id;
        }
        else {
            await this.imageService.put(generated);
            item.coverImageId = generated._id;
        }
    }
    async getNextTokenId(channelId) {
        let queryCache;
        try {
            queryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${channelId}`);
            let tokenIdStats = queryCache?.result;
            return tokenIdStats?.max ? tokenIdStats.max + 1 : 1;
        }
        catch (ex) { }
        //If we had problems just return 1
        return 1;
    }
    async getAttributeCountByChannel(channelId) {
        return this.itemRepository.getAttributeCountByChannel(channelId);
    }
    async getAttributeInfoBySelections(channelId, attributeSelections) {
        return this.itemRepository.getAttributeInfoBySelections(channelId, attributeSelections);
    }
};
ItemService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [_repository_item_repository_js__WEBPACK_IMPORTED_MODULE_4__.ItemRepository,
        _image_service_js__WEBPACK_IMPORTED_MODULE_5__.ImageService,
        _core_query_cache_service_js__WEBPACK_IMPORTED_MODULE_6__.QueryCacheService,
        _original_metadata_service_js__WEBPACK_IMPORTED_MODULE_7__.OriginalMetadataService])
], ItemService);



/***/ }),

/***/ "./src/admin/service/original-metadata-service.ts":
/*!********************************************************!*\
  !*** ./src/admin/service/original-metadata-service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OriginalMetadataService: () => (/* binding */ OriginalMetadataService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var ipfs_only_hash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ipfs-only-hash */ "./node_modules/ipfs-only-hash/index.js");
/* harmony import */ var _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/validation-exception.js */ "./src/admin/util/validation-exception.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/index.js");
/* harmony import */ var _repository_original_metadata_repository_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../repository/original-metadata-repository.js */ "./src/admin/repository/original-metadata-repository.ts");
/* harmony import */ var _dto_original_metadata_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dto/original-metadata.js */ "./src/admin/dto/original-metadata.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let OriginalMetadataService = class OriginalMetadataService {
    originalMetadataRepository;
    db;
    constructor(originalMetadataRepository) {
        this.originalMetadataRepository = originalMetadataRepository;
    }
    async get(_id) {
        return this.originalMetadataRepository.get(_id);
    }
    async put(originalMetadata) {
        if (!originalMetadata._id) {
            originalMetadata._id = originalMetadata.cid;
            originalMetadata.dateCreated = new Date().toJSON();
        }
        //Validate
        let errors = await (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.validate)(originalMetadata, {
            forbidUnknownValues: true,
            whitelist: true
        });
        if (errors.length > 0) {
            throw new _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_2__.ValidationException(errors);
        }
        await this.originalMetadataRepository.put(originalMetadata);
    }
    async delete(originalMetadata) {
        await this.originalMetadataRepository.delete(originalMetadata);
    }
    async getByIds(ids) {
        return this.originalMetadataRepository.getByIds(ids);
    }
    async newFromText(content) {
        const originalMetadata = new _dto_original_metadata_js__WEBPACK_IMPORTED_MODULE_3__.OriginalMetadata();
        originalMetadata.content = content;
        originalMetadata.cid = await ipfs_only_hash__WEBPACK_IMPORTED_MODULE_0__.of(originalMetadata.content);
        return originalMetadata;
    }
};
OriginalMetadataService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_4__.injectable)(),
    __metadata("design:paramtypes", [_repository_original_metadata_repository_js__WEBPACK_IMPORTED_MODULE_5__.OriginalMetadataRepository])
], OriginalMetadataService);



/***/ }),

/***/ "./src/admin/service/quill-editor-service.ts":
/*!***************************************************!*\
  !*** ./src/admin/service/quill-editor-service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomImageSpec: () => (/* binding */ CustomImageSpec),
/* harmony export */   QuillEditorService: () => (/* binding */ QuillEditorService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill */ "./node_modules/quill/dist/quill.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var quill_image_drop_and_paste__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quill-image-drop-and-paste */ "./node_modules/quill-image-drop-and-paste/dist/quill-image-drop-and-paste.esm.js");
/* harmony import */ var quill_blot_formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! quill-blot-formatter */ "./node_modules/quill-blot-formatter/dist/index.js");
/* harmony import */ var quill_paste_smart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! quill-paste-smart */ "./node_modules/quill-paste-smart/dist/quill-paste-smart.js");
/* harmony import */ var quill_paste_smart__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(quill_paste_smart__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var framework7__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! framework7 */ "./node_modules/framework7/shared/dom7.js");
/* harmony import */ var _image_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./image-service.js */ "./src/admin/service/image-service.ts");
/* harmony import */ var browser_image_resizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! browser-image-resizer */ "./node_modules/browser-image-resizer/dist/index.js");
/* harmony import */ var browser_image_resizer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(browser_image_resizer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _core_ui_service_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core/ui-service.js */ "./src/admin/service/core/ui-service.ts");
/* harmony import */ var _core_hugging_face_service_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/hugging-face-service.js */ "./src/admin/service/core/hugging-face-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//@ts-nocheck










var $$ = framework7__WEBPACK_IMPORTED_MODULE_5__["default"];
/**
 * END UTIL
 */
let QuillEditorService = class QuillEditorService {
    imageService;
    huggingFaceService;
    uiService;
    activeEditor;
    initialized = false;
    constructor(imageService, huggingFaceService, uiService) {
        this.imageService = imageService;
        this.huggingFaceService = huggingFaceService;
        this.uiService = uiService;
        const self = this;
        // console.log("Quill service init")
    }
    init() {
        const self = this;
        if (this.initialized)
            return;
        quill__WEBPACK_IMPORTED_MODULE_0___default().register('modules/imageDropAndPaste', quill_image_drop_and_paste__WEBPACK_IMPORTED_MODULE_1__["default"]);
        quill__WEBPACK_IMPORTED_MODULE_0___default().register('modules/blotFormatter', quill_blot_formatter__WEBPACK_IMPORTED_MODULE_2__["default"]);
        quill__WEBPACK_IMPORTED_MODULE_0___default().debug(false);
        let Inline = quill__WEBPACK_IMPORTED_MODULE_0___default()["import"]('blots/inline');
        class BoldBlot extends Inline {
            static blotName;
            static tagName;
        }
        BoldBlot.blotName = 'bold';
        BoldBlot.tagName = 'strong';
        class ItalicBlot extends Inline {
            static blotName;
            static tagName;
        }
        ItalicBlot.blotName = 'italic';
        ItalicBlot.tagName = 'em';
        // class LinkBlot extends Inline {
        //   static blotName?: string
        //   static tagName?: string
        //   static create(value) {
        //     let node = super.create();
        //     // Sanitize url value if desired
        //     node.setAttribute('href', value);
        //     // Okay to set other non-format related attributes
        //     // These are invisible to Parchment so must be static
        //     node.setAttribute('target', '_blank')
        //     return node;
        //   }
        //   static formats(node) {
        //     // We will only be called with a node already
        //     // determined to be a Link blot, so we do
        //     // not need to check ourselves
        //     return node.getAttribute('href')
        //   }
        // }
        // LinkBlot.blotName = 'link'
        // LinkBlot.tagName = 'a'
        let Block = quill__WEBPACK_IMPORTED_MODULE_0___default()["import"]('blots/block');
        class BlockquoteBlot extends Block {
            static blotName;
            static tagName;
        }
        BlockquoteBlot.blotName = 'blockquote';
        BlockquoteBlot.tagName = 'blockquote';
        class HeaderBlot extends Block {
            static blotName;
            static tagName;
            static formats(node) {
                return HeaderBlot.tagName.indexOf(node.tagName) + 1;
            }
        }
        HeaderBlot.blotName = 'header';
        HeaderBlot.tagName = ['H1', 'H2'];
        let BlockEmbed = quill__WEBPACK_IMPORTED_MODULE_0___default()["import"]('blots/block/embed');
        class DividerBlot extends BlockEmbed {
            static blotName;
            static tagName;
        }
        DividerBlot.blotName = 'divider';
        DividerBlot.tagName = 'hr';
        class IpfsImageBlot extends BlockEmbed {
            static blotName;
            static tagName;
            static create(value) {
                let node = super.create();
                node.setAttribute('src', value.src);
                node.setAttribute('data-cid', value.cid);
                if (value.width)
                    node.setAttribute('width', value.width);
                if (value.height)
                    node.setAttribute('height', value.height);
                if (value.style)
                    node.setAttribute('style', value.style);
                return node;
            }
            static value(node) {
                let src = node.getAttribute('src');
                let cid = node.getAttribute('data-cid');
                let width = node.getAttribute('width');
                let height = node.getAttribute('height');
                let style = node.getAttribute('style');
                return {
                    src: src,
                    cid: cid,
                    width: width,
                    height: height,
                    style: style
                };
            }
        }
        IpfsImageBlot.blotName = 'ipfsimage';
        IpfsImageBlot.tagName = 'img';
        quill__WEBPACK_IMPORTED_MODULE_0___default().register(IpfsImageBlot);
        // Quill.register(DividerBlot)
        // Quill.register(HeaderBlot)
        quill__WEBPACK_IMPORTED_MODULE_0___default().register(BlockquoteBlot);
        // Quill.register(LinkBlot)
        quill__WEBPACK_IMPORTED_MODULE_0___default().register(BoldBlot);
        quill__WEBPACK_IMPORTED_MODULE_0___default().register(ItalicBlot);
        this.initialized = true;
    }
    buildQuillPostEditor(selector, toolbarSelector) {
        this.init();
        // this.activeEditor = undefined
        this.activeEditor = new (quill__WEBPACK_IMPORTED_MODULE_0___default())(selector, {
            bounds: ".page-content",
            modules: {
                imageDropAndPaste: {
                    // add an custom image handler
                    handler: (imageDataUrl, type, imageData) => {
                        this.imageDropAndPasteHandler(imageDataUrl, type, imageData);
                    }
                },
                toolbar: toolbarSelector,
                blotFormatter: {
                    specs: [
                        CustomImageSpec,
                    ],
                    align: {
                        icons: {
                            left: "<i class='material-icons'>align_horizontal_left</i>",
                            center: "<i class='material-icons'>align_horizontal_center</i>",
                            right: "<i class='material-icons'>align_horizontal_right</i>"
                        },
                        toolbar: {
                            svgStyle: {
                                fontSize: '21px',
                            },
                        }
                    }
                },
            },
            handlers: {
                'link': (value) => {
                    if (value) {
                        var href = prompt('Enter the URL');
                        this.quill.format('link', href);
                    }
                    else {
                        this.quill.format('link', false);
                    }
                }
            },
            theme: "snow"
        });
        return this.activeEditor;
    }
    async generateAIImage(prompt, negativePrompt) {
        this.uiService.showSpinner("Generating AI image. This may take a few minutes...");
        let result = await this.huggingFaceService.generateImage(prompt, negativePrompt);
        await this.insertBlobInEditor(result, this.activeEditor);
        this.uiService.hideSpinner();
    }
    imageClick() {
    }
    async imageSelected(fileElement) {
        this.uiService.showSpinner("Processing image...");
        this.insertImage(fileElement.files[0]);
        this.uiService.hideSpinner();
    }
    async insertImage(file) {
        let image = await this.insertImageInEditor(file, this.activeEditor);
        const imageSelectedEvent = new CustomEvent('image-selected', {
            detail: { _id: image._id }
        });
        document.dispatchEvent(imageSelectedEvent);
    }
    async insertImageInEditor(file, editor) {
        let resizedImageBlob = await (0,browser_image_resizer__WEBPACK_IMPORTED_MODULE_4__.readAndCompressImage)(file, {
            maxWidth: 1024
        });
        return this.insertBlobInEditor(resizedImageBlob, editor);
    }
    async insertBlobInEditor(blob, editor) {
        let imageArrayBuffer = await blob.arrayBuffer();
        let image = await this.imageService.newFromBuffer(new Uint8Array(imageArrayBuffer));
        try {
            await this.imageService.put(image);
        }
        catch (ex) {
            console.log(ex);
        } //Might already exist. That's fine.  
        let src = await this.imageService.getUrl(image);
        let dimensions = await this.getHeightAndWidthFromDataUrl(src);
        let range = editor.getSelection(true);
        editor.insertText(range.index, '\n', (quill__WEBPACK_IMPORTED_MODULE_0___default().sources).USER);
        const resizeImage = (originalWidth, originalHeight) => {
            var maxWidth = 500;
            var maxHeight = 500;
            var widthRatio = maxWidth / originalWidth;
            var heightRatio = maxHeight / originalHeight;
            var resizeRatio = Math.min(widthRatio, heightRatio);
            var newWidth = Math.floor(originalWidth * resizeRatio);
            var newHeight = Math.floor(originalHeight * resizeRatio);
            return {
                width: newWidth,
                height: newHeight
            };
        };
        let calculatedDimensions = resizeImage(dimensions.width, dimensions.height);
        editor.insertEmbed(range.index, 'ipfsimage', {
            cid: image.cid,
            src: src,
            height: calculatedDimensions.height,
            width: calculatedDimensions.width
        }, (quill__WEBPACK_IMPORTED_MODULE_0___default().sources).USER);
        editor.setSelection(range.index + 2, (quill__WEBPACK_IMPORTED_MODULE_0___default().sources).SILENT);
        return image;
    }
    async imageDropAndPasteHandler(imageDataUrl, type, imageData) {
        const file = imageData.toFile();
        await this.insertImage(file);
    }
    async getHeightAndWidthFromDataUrl(dataURL) {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => {
                resolve({
                    height: img.height,
                    width: img.width
                });
            };
            img.src = dataURL;
        });
    }
};
QuillEditorService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_6__.injectable)(),
    __metadata("design:paramtypes", [_image_service_js__WEBPACK_IMPORTED_MODULE_7__.ImageService,
        _core_hugging_face_service_js__WEBPACK_IMPORTED_MODULE_8__.HuggingFaceService,
        _core_ui_service_js__WEBPACK_IMPORTED_MODULE_9__.UiService])
], QuillEditorService);
/**
 * THESE CLASSES ARE HERE BECAUSE I NEEDED TO OVERRIDE THEM TO FIX A PROBLEM WITH DELETING
 * IMAGES BUT I DONT KNOW WHERE THEY SHOULD GO. SO THEY'RE HERE FOR NOW
 */
class CustomDeleteAction extends quill_blot_formatter__WEBPACK_IMPORTED_MODULE_2__.DeleteAction {
    keyUpListener;
    onCreate() {
        const self = this;
        this.keyUpListener = function (e) {
            self.onKeyUp(e);
        };
        document.addEventListener('keyup', self.keyUpListener, true);
        this.formatter.quill.root.addEventListener('input', self.keyUpListener, true);
    }
    onDestroy() {
        const self = this;
        document.removeEventListener('keyup', self.keyUpListener);
        this.formatter.quill.root.removeEventListener('input', self.keyUpListener);
    }
    //@ts-ignore
    onKeyUp(e) {
        if (!this.formatter.currentSpec) {
            return;
        }
        // delete or backspace
        if (e.keyCode === 46 || e.keyCode === 8) {
            const blot = quill__WEBPACK_IMPORTED_MODULE_0___default().find(this.formatter.currentSpec.getTargetElement());
            if (blot) {
                blot.deleteAt(0);
            }
            this.formatter.hide();
        }
    }
}
class CustomImageSpec extends quill_blot_formatter__WEBPACK_IMPORTED_MODULE_2__.ImageSpec {
    getActions() {
        return [quill_blot_formatter__WEBPACK_IMPORTED_MODULE_2__.AlignAction, quill_blot_formatter__WEBPACK_IMPORTED_MODULE_2__.ResizeAction, CustomDeleteAction];
    }
}



/***/ }),

/***/ "./src/admin/service/quill-service.ts":
/*!********************************************!*\
  !*** ./src/admin/service/quill-service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuillService: () => (/* binding */ QuillService)
/* harmony export */ });
/* harmony import */ var quill_delta_to_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill-delta-to-html */ "./node_modules/quill-delta-to-html/dist/commonjs/main.js");
/* harmony import */ var quill_delta_to_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quill-delta-to-markdown */ "./node_modules/quill-delta-to-markdown/index.js");
/* harmony import */ var quill_delta_to_markdown__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(quill_delta_to_markdown__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var delta_markdown_for_quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! delta-markdown-for-quill */ "./node_modules/delta-markdown-for-quill/index.js");
/* harmony import */ var delta_markdown_for_quill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(delta_markdown_for_quill__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { toDelta } from "delta-markdown-for-quill"

const { toDelta } = (delta_markdown_for_quill__WEBPACK_IMPORTED_MODULE_2___default());

let QuillService = class QuillService {
    constructor() { }
    async translateContent(content, suppressSrc = false) {
        if (!content?.ops)
            return "";
        const qdc = new quill_delta_to_html__WEBPACK_IMPORTED_MODULE_0__.QuillDeltaToHtmlConverter(content.ops, {
            encodeHtml: false
        });
        //Render dividers into HTML
        qdc.renderCustomWith(renderCustom(suppressSrc));
        return qdc.convert();
    }
    async translateContentEncodeHtml(content, suppressSrc = false) {
        if (!content?.ops)
            return "";
        const qdc = new quill_delta_to_html__WEBPACK_IMPORTED_MODULE_0__.QuillDeltaToHtmlConverter(content.ops, {});
        //Render dividers into HTML
        qdc.renderCustomWith(renderCustom(suppressSrc));
        return qdc.convert();
    }
    async generateMarkdown(content) {
        return (0,quill_delta_to_markdown__WEBPACK_IMPORTED_MODULE_1__.deltaToMarkdown)(content.ops);
    }
    async deltaFromMarkdown(ops) {
        return toDelta(ops);
    }
};
QuillService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [])
], QuillService);
const renderCustom = (suppressSrc) => {
    return function (customOp, contextOp) {
        if (customOp.insert.type === 'divider') {
            return "<hr />";
        }
        if (customOp.insert.type === 'ipfsimage') {
            let img = `<img `;
            if (!suppressSrc) {
                img += `src="${customOp.insert.value.src}" `;
            }
            if (customOp.insert.value.width) {
                img += `width="${customOp.insert.value.width}" `;
            }
            if (customOp.insert.value.height) {
                img += `height="${customOp.insert.value.height}" `;
            }
            if (customOp.insert.value.style) {
                img += `style="${customOp.insert.value.style}"`;
            }
            img += "/>";
            return img;
        }
    };
};



/***/ }),

/***/ "./src/admin/service/static-page-service.ts":
/*!**************************************************!*\
  !*** ./src/admin/service/static-page-service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StaticPageService: () => (/* binding */ StaticPageService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/index.js");
/* harmony import */ var _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/validation-exception.js */ "./src/admin/util/validation-exception.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _repository_static_page_repository_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../repository/static-page-repository.js */ "./src/admin/repository/static-page-repository.ts");
/* harmony import */ var _quill_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./quill-service.js */ "./src/admin/service/quill-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let StaticPageService = class StaticPageService {
    staticPageRepository;
    quillService;
    db;
    constructor(staticPageRepository, quillService) {
        this.staticPageRepository = staticPageRepository;
        this.quillService = quillService;
    }
    async get(_id) {
        return this.staticPageRepository.get(_id);
    }
    async getIds() {
        return this.staticPageRepository.getIds();
    }
    async getLatestRevision(_id) {
        return this.staticPageRepository.getLatestRevision(_id);
    }
    async put(staticPage) {
        if (!staticPage._id) {
            staticPage._id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
            staticPage.dateCreated = new Date().toJSON();
        }
        else {
            staticPage.lastUpdated = new Date().toJSON();
        }
        if (staticPage.content) {
            //Translate description content
            staticPage.contentHTML = await this.quillService.translateContent(staticPage.content);
            //Generate markdown
            staticPage.contentMarkdown = await this.quillService.generateMarkdown(staticPage.content);
        }
        //Generate slug
        if (staticPage.name) {
            staticPage.slug = this.slugify(staticPage.name);
        }
        //Validate
        let errors = await (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.validate)(staticPage, {
            forbidUnknownValues: true,
            whitelist: true
        });
        if (errors.length > 0) {
            throw new _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_2__.ValidationException(errors);
        }
        await this.staticPageRepository.put(staticPage);
    }
    async delete(staticPage) {
        return this.staticPageRepository.delete(staticPage);
    }
    async listByChannel(channelId, limit, skip) {
        return this.staticPageRepository.listByChannel(channelId, limit, skip);
    }
    slugify(text) {
        return text
            .toString()
            .normalize('NFD') // split an accented letter in the base letter and the acent
            .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');
    }
};
StaticPageService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [_repository_static_page_repository_js__WEBPACK_IMPORTED_MODULE_4__.StaticPageRepository,
        _quill_service_js__WEBPACK_IMPORTED_MODULE_5__.QuillService])
], StaticPageService);



/***/ }),

/***/ "./src/admin/service/svg-service.ts":
/*!******************************************!*\
  !*** ./src/admin/service/svg-service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgService: () => (/* binding */ SvgService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let SvgService = class SvgService {
    constructor() { }
    async fromText(title, text, individualCss, themeCss) {
        let fontSize = "140px";
        let lineHeight = "160px";
        if (title) {
            text = `<span class='svg-title'>${title}</span><br /><br /><span class='svg-text'>${text}</span>`;
        }
        if (text.length > 50 && text.length <= 100) {
            fontSize = "110px";
            lineHeight = "130px";
        }
        if (text.length > 100 && text.length <= 175) {
            fontSize = "90px";
            lineHeight = "110px";
        }
        if (text.length > 175) {
            fontSize = "75px";
            lineHeight = "95px";
        }
        let start = `<svg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg' version='1.1'>
            <style>
                * {
                    --lh: ${lineHeight};
                    height:100%;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                }


                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    25% {
                        background-position: 50%% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    75% {
                        background-position: 50% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }


                .svg-h1 {

                    border: 25px solid rgb(78,130,177);
                    
                    background: rgb(241,241,241);
                    background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);
                    background-size: 400% 400%;
                    animation: gradient 15s ease infinite;

                    text-align: center;
                    font-size: ${fontSize};
                    padding: 70px;            
                    line-height: var(--lh);
                    height: 1200px;
                    width: 1200px;  
                    -webkit-mask-image: linear-gradient(180deg, rgb(0,0,0) 60%, transparent);        
                }

                .svg-title {
                    font-weight: 700;
                    font-size: 1.25em;
                }

                .svg-text {
                    width: 100%;
                    font-weight: 500;
                }

                ${themeCss ? themeCss : ''}

                ${individualCss ? individualCss : ''}

            </style>
            <g>
                <foreignObject x='0' y='0' width='1200' height='1200'>
                    <h1 class="svg-h1" xmlns='http://www.w3.org/1999/xhtml'>${text}</h1>
                </foreignObject>
            </g>
        </svg>`;
        return start;
    }
};
SvgService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(),
    __metadata("design:paramtypes", [])
], SvgService);



/***/ }),

/***/ "./src/admin/service/theme-service.ts":
/*!********************************************!*\
  !*** ./src/admin/service/theme-service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeService: () => (/* binding */ ThemeService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var _repository_theme_repository_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../repository/theme-repository.js */ "./src/admin/repository/theme-repository.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/index.js");
/* harmony import */ var _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/validation-exception.js */ "./src/admin/util/validation-exception.ts");
/* harmony import */ var _core_types_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/types.js */ "./src/admin/service/core/types.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






let ThemeService = class ThemeService {
    themeRepository;
    walletService;
    db;
    constructor(themeRepository, walletService) {
        this.themeRepository = themeRepository;
        this.walletService = walletService;
    }
    async get(_id) {
        return this.themeRepository.get(_id);
    }
    async getIds() {
        return this.themeRepository.getIds();
    }
    async getLatestRevision(_id) {
        return this.themeRepository.getLatestRevision(_id);
    }
    async put(theme) {
        if (!theme._id) {
            theme._id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
            theme.dateCreated = new Date().toJSON();
        }
        else {
            theme.lastUpdated = new Date().toJSON();
        }
        //Validate
        let errors = await (0,class_validator__WEBPACK_IMPORTED_MODULE_1__.validate)(theme, {
            forbidUnknownValues: true,
            whitelist: true
        });
        if (errors.length > 0) {
            throw new _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_2__.ValidationException(errors);
        }
        await this.themeRepository.put(theme);
    }
    async delete(theme) {
        return this.themeRepository.delete(theme);
    }
    async listByChannel(channelId, limit, skip) {
        return this.themeRepository.listByChannel(channelId, limit, skip);
    }
};
ThemeService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_4__.inject)(_core_types_js__WEBPACK_IMPORTED_MODULE_5__["default"].WalletService)),
    __metadata("design:paramtypes", [_repository_theme_repository_js__WEBPACK_IMPORTED_MODULE_6__.ThemeRepository, Object])
], ThemeService);



/***/ }),

/***/ "./src/admin/service/web/author-web-service.ts":
/*!*****************************************************!*\
  !*** ./src/admin/service/web/author-web-service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorWebService: () => (/* binding */ AuthorWebService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _author_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../author-service.js */ "./src/admin/service/author-service.ts");
/* harmony import */ var _image_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../image-service.js */ "./src/admin/service/image-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AuthorWebService = class AuthorWebService {
    imageService;
    authorService;
    constructor(imageService, authorService) {
        this.imageService = imageService;
        this.authorService = authorService;
    }
    async get(_id) {
        return this.getViewModel(await this.authorService.get(_id));
    }
    async getViewModel(author) {
        let authorPhoto;
        //Load cover photo if there is one.
        if (author.coverPhotoId) {
            let aImage = await this.imageService.get(author.coverPhotoId);
            authorPhoto = {
                cid: aImage.cid,
                url: await this.imageService.getUrl(aImage)
            };
        }
        return {
            author: author,
            authorPhoto: authorPhoto,
            authorDisplayName: this.authorService.getDisplayName(author)
        };
    }
};
AuthorWebService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(),
    __metadata("design:paramtypes", [_image_service_js__WEBPACK_IMPORTED_MODULE_1__.ImageService,
        _author_service_js__WEBPACK_IMPORTED_MODULE_2__.AuthorService])
], AuthorWebService);



/***/ }),

/***/ "./src/admin/service/web/channel-web-service.ts":
/*!******************************************************!*\
  !*** ./src/admin/service/web/channel-web-service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChannelWebService: () => (/* binding */ ChannelWebService)
/* harmony export */ });
/* harmony import */ var _dto_query_cache_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dto/query-cache.js */ "./src/admin/dto/query-cache.ts");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var _dto_item_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dto/item.js */ "./src/admin/dto/item.ts");
/* harmony import */ var _dto_image_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dto/image.js */ "./src/admin/dto/image.ts");
/* harmony import */ var _author_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../author-service.js */ "./src/admin/service/author-service.ts");
/* harmony import */ var _channel_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../channel-service.js */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _image_service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../image-service.js */ "./src/admin/service/image-service.ts");
/* harmony import */ var _item_service_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../item-service.js */ "./src/admin/service/item-service.ts");
/* harmony import */ var _item_web_service_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./item-web-service.js */ "./src/admin/service/web/item-web-service.ts");
/* harmony import */ var _service_core_query_cache_service_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../service/core/query-cache-service.js */ "./src/admin/service/core/query-cache-service.ts");
/* harmony import */ var _service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../service/core/schema-service.js */ "./src/admin/service/core/schema-service.ts");
/* harmony import */ var _core_settings_service_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../core/settings-service.js */ "./src/admin/service/core/settings-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};












let ChannelWebService = class ChannelWebService {
    channelService;
    imageService;
    authorService;
    itemService;
    itemWebService;
    queryCacheService;
    schemaService;
    settingsService;
    dayjs;
    constructor(channelService, imageService, authorService, itemService, itemWebService, queryCacheService, schemaService, settingsService, dayjs) {
        this.channelService = channelService;
        this.imageService = imageService;
        this.authorService = authorService;
        this.itemService = itemService;
        this.itemWebService = itemWebService;
        this.queryCacheService = queryCacheService;
        this.schemaService = schemaService;
        this.settingsService = settingsService;
        this.dayjs = dayjs;
    }
    async get(_id) {
        return this.getViewModel(await this.channelService.get(_id));
    }
    async getViewModel(channel) {
        let coverImage;
        let coverBanner;
        let authorPhoto;
        let author;
        let editable = !channel.contractAddress;
        //Load the right image db so we can get the cover and banner
        await this.imageService.load(channel._id);
        await this.authorService.load(channel._id);
        if (channel.coverImageId) {
            try {
                let cImage = await this.imageService.get(channel.coverImageId);
                coverImage = {
                    cid: cImage.cid,
                    url: await this.imageService.getUrl(cImage)
                };
            }
            catch (ex) { }
        }
        if (channel.coverBannerId) {
            try {
                let cBanner = await this.imageService.get(channel.coverBannerId);
                coverBanner = {
                    cid: cBanner.cid,
                    url: await this.imageService.getUrl(cBanner)
                };
            }
            catch (ex) { }
        }
        if (channel.authorId) {
            author = await this.authorService.get(channel.authorId);
            //Load cover photo if there is one.
            if (author.coverPhotoId) {
                try {
                    let aImage = await this.imageService.get(author.coverPhotoId);
                    authorPhoto = {
                        cid: aImage.cid,
                        url: await this.imageService.getUrl(aImage)
                    };
                }
                catch (ex) { }
            }
        }
        let itemCount = await this.channelService.countItemsByChannel(channel._id);
        let settings;
        try {
            settings = await this.settingsService.get();
        }
        catch (ex) { }
        let gitProvider;
        try {
            gitProvider = await this.channelService.getGitProviderCredentials(channel, settings);
        }
        catch (ex) { }
        return {
            channel: channel,
            // themes: themes,
            // staticPages: staticPages,
            coverImage: coverImage,
            coverBanner: coverBanner,
            author: author,
            authorDisplayName: this.authorService.getDisplayName(author),
            authorPhoto: authorPhoto,
            itemCount: itemCount,
            editable: editable,
            dateCreated: this.dayjs(channel.dateCreated).format("MMM DD YYYY"),
            gitProvider: gitProvider
        };
    }
    async list(limit, skip) {
        let result = [];
        let channels = await this.channelService.list(limit, skip);
        for (let channel of channels.filter(c => !c.forkType || c.importSuccess)) {
            result.push(await this.getViewModel(channel));
        }
        return result;
    }
    async upgrade(channel) {
        //Loop through each item. 
        let items = await this.itemService.listByChannel(channel._id, 100000, 0);
        for (let item of items) {
            //@ts-ignore
            //Look up the cover image
            let coverImage = await this.imageService.get(item.coverImageId);
            item.coverImageGenerated = coverImage.generated;
            //Resave
            let updated = Object.assign(new _dto_item_js__WEBPACK_IMPORTED_MODULE_0__.Item(), item);
            await this.itemService.put(updated);
            console.log(updated);
        }
    }
    async regenerateItemMedia(channel) {
        //Loop through each item. 
        let items = await this.itemService.listByChannel(channel._id, 100000, 0);
        for (let item of items) {
            //Save the cover image 
            await this.itemWebService.updateGeneratedCoverImage(item);
            //And the animation
            await this.itemWebService.saveAnimation(item);
            //Resave
            let updated = Object.assign(new _dto_item_js__WEBPACK_IMPORTED_MODULE_0__.Item(), item);
            await this.itemService.put(updated);
            // console.log(updated)
        }
    }
    async put(channel, coverImage, coverBanner) {
        let response = await this.channelService.put(channel);
        channel._rev = response.rev;
        //Load the right channel dbs
        await this.schemaService.loadChannel(channel._id);
        //Save cover image
        if (coverImage) {
            try {
                //Could be a duplicate. Which means it's fine.
                await this.imageService.put(Object.assign(new _dto_image_js__WEBPACK_IMPORTED_MODULE_1__.Image(), coverImage));
            }
            catch (ex) { }
        }
        //Save cover banner
        if (coverBanner) {
            try {
                //Could be a duplicate. Which means it's fine.
                await this.imageService.put(Object.assign(new _dto_image_js__WEBPACK_IMPORTED_MODULE_1__.Image(), coverBanner));
            }
            catch (ex) { }
        }
        let queryCache;
        try {
            queryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${channel._id}`);
        }
        catch (ex) { }
        if (!queryCache) {
            queryCache = new _dto_query_cache_js__WEBPACK_IMPORTED_MODULE_2__.QueryCache();
            queryCache._id = `token_id_stats_by_channel_${channel._id}`;
            queryCache.result = {
                min: 0,
                max: 0,
                count: 0
            };
        }
        //Update cache
        await this.queryCacheService.put(queryCache);
    }
};
ChannelWebService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __param(8, (0,inversify__WEBPACK_IMPORTED_MODULE_4__.inject)("dayjs")),
    __metadata("design:paramtypes", [_channel_service_js__WEBPACK_IMPORTED_MODULE_5__.ChannelService,
        _image_service_js__WEBPACK_IMPORTED_MODULE_6__.ImageService,
        _author_service_js__WEBPACK_IMPORTED_MODULE_7__.AuthorService,
        _item_service_js__WEBPACK_IMPORTED_MODULE_8__.ItemService,
        _item_web_service_js__WEBPACK_IMPORTED_MODULE_9__.ItemWebService,
        _service_core_query_cache_service_js__WEBPACK_IMPORTED_MODULE_10__.QueryCacheService,
        _service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_11__.SchemaService,
        _core_settings_service_js__WEBPACK_IMPORTED_MODULE_12__.SettingsService, Object])
], ChannelWebService);



/***/ }),

/***/ "./src/admin/service/web/item-web-service.ts":
/*!***************************************************!*\
  !*** ./src/admin/service/web/item-web-service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemWebService: () => (/* binding */ ItemWebService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dto_image_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dto/image.js */ "./src/admin/dto/image.ts");
/* harmony import */ var _dto_item_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dto/item.js */ "./src/admin/dto/item.ts");
/* harmony import */ var _author_service_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../author-service.js */ "./src/admin/service/author-service.ts");
/* harmony import */ var _channel_service_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../channel-service.js */ "./src/admin/service/channel-service.ts");
/* harmony import */ var _image_service_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../image-service.js */ "./src/admin/service/image-service.ts");
/* harmony import */ var _item_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../item-service.js */ "./src/admin/service/item-service.ts");
/* harmony import */ var _animation_service_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../animation-service.js */ "./src/admin/service/animation-service.ts");
/* harmony import */ var _quill_service_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../quill-service.js */ "./src/admin/service/quill-service.ts");
/* harmony import */ var _theme_service_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../theme-service.js */ "./src/admin/service/theme-service.ts");
/* harmony import */ var _service_core_query_cache_service_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../service/core/query-cache-service.js */ "./src/admin/service/core/query-cache-service.ts");
/* harmony import */ var _service_attribute_count_service_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../service/attribute-count-service.js */ "./src/admin/service/attribute-count-service.ts");
/* harmony import */ var _dto_attribute_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../dto/attribute.js */ "./src/admin/dto/attribute.ts");
/* harmony import */ var _core_export_service_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../core/export-service.js */ "./src/admin/service/core/export-service.ts");
/* harmony import */ var _core_ipfs_service_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../core/ipfs-service.js */ "./src/admin/service/core/ipfs-service.ts");
/* harmony import */ var _xmldom_xmldom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @xmldom/xmldom */ "./node_modules/@xmldom/xmldom/lib/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

















// const { DOMParser, XMLSerializer } = require('@xmldom/xmldom')
const parser = new _xmldom_xmldom__WEBPACK_IMPORTED_MODULE_1__.DOMParser();
let ItemWebService = class ItemWebService {
    itemService;
    channelService;
    imageService;
    authorService;
    animationService;
    quillService;
    themeService;
    queryCacheService;
    exportService;
    ipfsService;
    attributeCountService;
    dayjs;
    constructor(itemService, channelService, imageService, authorService, animationService, quillService, themeService, queryCacheService, exportService, ipfsService, attributeCountService, dayjs) {
        this.itemService = itemService;
        this.channelService = channelService;
        this.imageService = imageService;
        this.authorService = authorService;
        this.animationService = animationService;
        this.quillService = quillService;
        this.themeService = themeService;
        this.queryCacheService = queryCacheService;
        this.exportService = exportService;
        this.ipfsService = ipfsService;
        this.attributeCountService = attributeCountService;
        this.dayjs = dayjs;
    }
    async get(_id) {
        let item = await this.itemService.get(_id);
        //Get channel
        const channel = await this.channelService.get(item.channelId);
        let queryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${item.channelId}`);
        let tokenIdStats = queryCache.result;
        return this.getViewModel(item, channel, tokenIdStats);
    }
    async getNavigation(channelId, tokenId) {
        let item = await this.itemService.getByTokenId(channelId, tokenId);
        //Get channel
        const channel = await this.channelService.get(item.channelId);
        return this.getNavigationViewModel(item, channel);
    }
    async getViewModel(item, channel, tokenIdStats) {
        // console.time('Get viewmodel')
        let animation;
        let coverImage;
        let authorPhoto;
        let animationContentHTML;
        let attributeSelections = [];
        let author;
        let editable = !channel.contractAddress;
        // console.time('Get image')
        if (item.coverImageId) {
            try {
                let image = await this.imageService.get(item.coverImageId);
                coverImage = {
                    cid: image.cid,
                    url: await this.imageService.getUrl(image)
                };
            }
            catch (ex) { }
        }
        if (item.animationId) {
            try {
                let a = await this.animationService.get(item.animationId);
                animation = {
                    cid: a.cid,
                    content: he__WEBPACK_IMPORTED_MODULE_0___default().unescape(a.content)
                };
                let page = parser.parseFromString(a.content, 'text/html');
                let body = page.getElementsByTagName('body')[0];
                animationContentHTML = he__WEBPACK_IMPORTED_MODULE_0___default().unescape(new _xmldom_xmldom__WEBPACK_IMPORTED_MODULE_1__.XMLSerializer().serializeToString(body));
                //Swap body tag to a div
                animationContentHTML = "<div" + animationContentHTML.slice(5);
                animationContentHTML = animationContentHTML.substring(0, animationContentHTML.length - 7) + "</div>";
            }
            catch (ex) { }
        }
        //Get author
        if (channel.authorId) {
            author = await this.authorService.get(channel.authorId);
            //Load cover photo if there is one.
            if (author.coverPhotoId) {
                let aImage = await this.imageService.get(author.coverPhotoId);
                authorPhoto = {
                    cid: aImage.cid,
                    url: await this.imageService.getUrl(aImage)
                };
            }
        }
        // console.time('Get attributes')
        //Only show attributes that are valid at the category level. 
        if (channel.attributeOptions.length > 0) {
            for (let ao of channel.attributeOptions) {
                //find the one selected by this item
                let selections = item?.attributeSelections?.filter(as => ao?.traitType == as?.traitType);
                attributeSelections.push({
                    id: ao.id,
                    traitType: ao.traitType,
                    values: ao.values,
                    value: selections?.length > 0 ? selections[0].value : '',
                });
            }
            for (let attributeSelection of attributeSelections) {
                try {
                    let attributeCount = await this.attributeCountService.get(`${channel._id}-${attributeSelection.traitType}-${attributeSelection.value}`);
                    attributeSelection.categoryPercent = attributeCount ? new Intl.NumberFormat('default', {
                        style: 'percent',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format((attributeCount.count / tokenIdStats.count)) : '';
                }
                catch (ex) { }
            }
        }
        // console.timeEnd('Get attributes')
        // console.time('Get last')
        let canDelete = (tokenIdStats.max == item.tokenId);
        let themes = [];
        if (item.themes?.length > 0) {
            try {
                for (let theme of item.themes) {
                    themes.push(await this.themeService.get(theme));
                }
            }
            catch (ex) { }
        }
        // console.timeEnd('Get viewmodel')
        let images = await this.getImagesFromContent(item);
        //If cover image not part of image list add it.
        if (images.filter(i => i.cid == coverImage?.cid).length == 0) {
            images.push(coverImage);
        }
        // console.log(item)
        return {
            item: item,
            themes: themes,
            contentHTML: await this.quillService.translateContent(item.content),
            animationContentHTML: animationContentHTML,
            dateDisplay: this.dayjs(item.dateCreated).format("MMM DD YYYY"),
            channel: channel,
            coverImage: coverImage,
            animation: animation,
            author: author,
            authorPhoto: authorPhoto,
            authorDisplayName: this.authorService.getDisplayName(author),
            images: images,
            attributeSelections: attributeSelections,
            editable: editable,
            canDelete: canDelete
        };
    }
    async getNavigationViewModel(item, channel) {
        let queryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${channel._id}`);
        let tokenIdStats = queryCache.result;
        let itemViewModel = await this.getViewModel(item, channel, tokenIdStats);
        if (itemViewModel.item.tokenId < tokenIdStats.max) {
            itemViewModel.next = itemViewModel.item.tokenId + 1;
        }
        if (itemViewModel.item.tokenId > tokenIdStats.min) {
            itemViewModel.previous = itemViewModel.item.tokenId - 1;
        }
        return itemViewModel;
    }
    async getListViewModel(item, channel) {
        let coverImage;
        if (item.coverImageId) {
            try {
                let image = await this.imageService.get(item.coverImageId);
                coverImage = {
                    cid: image.cid,
                    url: await this.imageService.getUrl(image)
                };
            }
            catch (ex) { }
        }
        return {
            item: item,
            channel: channel,
            coverImage: coverImage
        };
    }
    async listByChannel(channelId, limit, skip) {
        let result = [];
        let items = await this.itemService.listByChannel(channelId, limit, skip);
        //Get channel
        const channel = await this.channelService.get(channelId);
        for (let item of items) {
            result.push(await this.getListViewModel(item, channel));
        }
        return result;
    }
    async getImagesFromContent(item) {
        if (!item.content)
            return [];
        let ops = item.content.ops;
        const images = [];
        if (ops?.length > 0) {
            for (let op of ops) {
                if (op.insert && op.insert.ipfsimage) {
                    images.push({
                        cid: op.insert.ipfsimage.cid,
                        url: op.insert.ipfsimage.src
                    });
                }
            }
            //Now generate the text preview
            try {
                let image = await this.imageService.newFromItem(item);
                images.push({
                    cid: image.cid,
                    url: await this.imageService.getSVGURL(image),
                    svg: image.svg,
                    generated: true
                });
            }
            catch (ex) { }
        }
        return images;
    }
    async getNewViewModel(channelId) {
        let channel = await this.channelService.get(channelId);
        //Get default attribute options
        let attributeSelections = [];
        for (let ao of channel.attributeOptions) {
            attributeSelections.push({
                id: ao.id,
                traitType: ao.traitType,
                values: ao.values,
                value: '',
                categoryPercent: ''
            });
        }
        let itemViewModel = {
            item: {
                attributeSelections: []
            },
            channel: channel,
            attributeSelections: attributeSelections,
            editable: true,
            canDelete: true
        };
        return itemViewModel;
    }
    async saveGeneratedCoverImage(item) {
        let images = await this.getImagesFromContent(item);
        let matches = images?.filter(image => {
            if (item.coverImageId) {
                //If there's a cover then only return true if this is it.
                return image.cid == item.coverImageId;
            }
            else {
                //If it's not set then we want to filter to the generated one.
                return image.generated == true;
            }
        });
        let image = Object.assign(new _dto_image_js__WEBPACK_IMPORTED_MODULE_2__.Image(), matches[0]);
        if (image.generated == true) {
            //Remove URL before saving
            delete image['url'];
            try {
                await this.imageService.put(image);
            }
            catch (ex) {
                // console.log(ex)
            } //Might already exist. That's fine.  
            item.coverImageId = image._id;
        }
        return image;
    }
    async saveAnimation(item) {
        let content = await this.animationService.buildAnimationPage(item);
        let animation = await this.animationService.newFromText(content);
        try {
            await this.animationService.put(animation);
        }
        catch (ex) {
            // console.log(ex)
        } //Might already exist. That's fine.  
        item.animationId = animation._id;
        return animation;
    }
    async updateGeneratedCoverImage(item) {
        //Check if the current cover image is generated.
        let coverImage = await this.imageService.get(item.coverImageId);
        //If it's not generated then leave.
        if (!coverImage.generated)
            return;
        //If it is then generate a new one.
        let newCoverImage = await this.imageService.newFromItem(item);
        //Save it
        try {
            await this.imageService.put(newCoverImage);
        }
        catch (ex) { }
        item.coverImageId = newCoverImage._id;
    }
    async put(command) {
        //Get the image cids that we'll be left with.
        command.item.imageIds = this.exportService.getImageCidsByItem(command.item);
        //If the item exists we need to do some cleanup before saving.
        //Find any images and animations that are being removed and remove them.
        if (command.item._rev) {
            let existing = await this.itemService.get(command.item._id);
            //Loop through the existing images and find the ones we're removing.
            let removedImageCids = this.exportService.getImageCidsByItem(existing).filter(cid => !command.item.imageIds?.includes(cid));
            //Remove
            for (let removedCid of removedImageCids) {
                // console.log(`Removing ${removedCid} from images.`)
                await this.deletePublishedImageByChannel(command.channel, command.item, removedCid);
            }
            //Remove animation if changed
            if (command.item.animationId != existing.animationId) {
                console.log(`Removing ${existing.animationId} from animations.`);
                await this.deletePublishedAnimationByChannel(command.channel, command.item, existing.animationId);
            }
        }
        //Put item  
        await this.itemService.put(command.item);
        if (command.publish) {
            //Put images in IPFS and git
            for (let imageCid of command.item.imageIds) {
                try {
                    await this.publishImage(command.channel, await this.imageService.get(imageCid), false);
                }
                catch (ex) { }
            }
            //Put animation
            try {
                await this.publishAnimation(command.channel, await this.animationService.get(command.item.animationId), false);
            }
            catch (ex) { }
        }
        if (command.updateQueryCache) {
            let queryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${command.item.channelId}`);
            let tokenIdStats = queryCache.result;
            if (command.item.tokenId < tokenIdStats.min) {
                tokenIdStats.min = command.item.tokenId;
            }
            if (command.item.tokenId > tokenIdStats.max) {
                tokenIdStats.max = command.item.tokenId;
                tokenIdStats.count++;
            }
            queryCache.result = tokenIdStats;
            //Update cache
            await this.queryCacheService.put(queryCache);
            //Update attribute counts
            let attributeCounts = await this.itemService.getAttributeInfoBySelections(command.item.channelId, command.item.attributeSelections);
            for (let attributeCount of attributeCounts) {
                let ac;
                let attributeCountId = `${command.item.channelId}-${attributeCount.traitType}-${attributeCount.value}`;
                try {
                    ac = await this.attributeCountService.get(attributeCountId);
                }
                catch (ex) { }
                if (!ac) {
                    ac = new _dto_attribute_js__WEBPACK_IMPORTED_MODULE_3__.AttributeCount();
                    ac.channelId = command.item.channelId;
                    ac.traitType = attributeCount.traitType;
                    ac.value = attributeCount.value;
                }
                ac.count = attributeCount.count;
                await this.attributeCountService.put(ac);
            }
        }
    }
    async delete(item) {
        let channel = await this.channelService.get(item.channelId);
        //Delete item
        await this.itemService.delete(item);
        //Delete images
        let imageCids = this.exportService.getImageCidsByItem(item);
        for (let imageCid of imageCids) {
            await this.deletePublishedImageByChannel(channel, item, imageCid);
        }
        //Delete animation
        await this.deletePublishedAnimationByChannel(channel, item, item.animationId);
        //Delete JSON metadata
        await this.deleteJSONForItem(channel, item);
        let queryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${item.channelId}`);
        let tokenIdStats = queryCache.result;
        //If deleting the lowest token ID then reset. Only works because we can only delete the final item. Change this if that changes.
        if (item.tokenId == tokenIdStats.min) {
            //Reset
            tokenIdStats.min = 0;
            tokenIdStats.max = 0;
            tokenIdStats.count = 0;
        }
        else {
            tokenIdStats.max = item.tokenId - 1;
            tokenIdStats.count--;
        }
        queryCache.result = tokenIdStats;
        //Update cache
        await this.queryCacheService.put(queryCache);
    }
    async clone(item) {
        let itemCopy = JSON.parse(JSON.stringify(item));
        delete itemCopy._id;
        delete itemCopy._rev;
        delete itemCopy['_rev_tree'];
        delete itemCopy.tokenId;
        itemCopy = Object.assign(new _dto_item_js__WEBPACK_IMPORTED_MODULE_4__.Item(), itemCopy);
        //Save to get an ID, etc
        let channel = await this.channelService.get(item.channelId);
        await this.put({
            channel: channel,
            item: itemCopy
        });
        //Build contentHTML for searching
        itemCopy.contentHTML = await this.quillService.translateContent(itemCopy.content, true);
        //Save the cover image if necessary
        let coverImage = await this.saveGeneratedCoverImage(itemCopy);
        item.coverImageGenerated = coverImage.generated;
        //And the animation
        await this.saveAnimation(itemCopy);
        //Save the result
        await this.put({
            channel: channel,
            item: itemCopy
        });
        return itemCopy;
    }
    async publishImage(channel, image, flush = true) {
        if (!image)
            return;
        let ipfsDirectory = `/export/${channel._id}`;
        let ipfsFilename = `${ipfsDirectory}/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}`;
        //Check if it's already in IPFS
        let stat;
        try {
            stat = await this.ipfsService.ipfs.files.stat(ipfsFilename, { hash: true });
        }
        catch (ex) { }
        if (!stat?.cid?.toString()) {
            let content = await this.imageService.getImageContent(image);
            //Add to IPFS
            const result = await this.ipfsService.ipfs.add({
                content: content
            });
            //Move to MFS directory in IPFS
            await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, ipfsFilename, { create: true, parents: true, flush: flush });
            // //Add to git
            // let gitDirectory = this.gitService.getBaseDir(channel)
            // await this.gitService.writeFile(`${gitDirectory}/backup/export/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}`, content)
        }
    }
    async deletePublishedImageByChannel(channel, item, removedCid) {
        try {
            let image = await this.imageService.get(removedCid);
            //TODO: Make sure the image isn't still in use by another
            let existing = (await this.itemService.getByImageId(removedCid)).filter(i => i._id != item._id);
            if (existing?.length > 0)
                return;
            await this.imageService.delete(image);
            //Remove from IPFS
            let ipfsDirectory = `/export/${channel._id}`;
            let ipfsFilename = `${ipfsDirectory}/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}`;
            await this._safeDelete(ipfsFilename);
            //Remove from git
            // let gitDirectory = this.gitService.getBaseDir(channel)
            // await this.gitService.removeFile(`${gitDirectory}/backup/export/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}`)
        }
        catch (ex) { }
    }
    async publishAnimation(channel, animation, flush = true) {
        if (!animation)
            return;
        let ipfsDirectory = `/export/${channel._id}`;
        let ipfsFilename = `${ipfsDirectory}/animations/${animation.cid}.html`;
        //Check if it's already in IPFS
        let stat;
        try {
            stat = await this.ipfsService.ipfs.files.stat(ipfsFilename, { hash: true });
        }
        catch (ex) { }
        if (!stat?.cid?.toString()) {
            // console.log(`Publishing animation ${animation._id}`)
            const result = await this.ipfsService.ipfs.add({
                content: animation.content
            });
            //Move to MFS directory in IPFS
            await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, ipfsFilename, { create: true, parents: true, flush: flush });
            // //Add to git
            // let gitDirectory = this.gitService.getBaseDir(channel)
            // await this.gitService.writeFile(`${gitDirectory}/backup/export/animations/${animation.cid}.html`, animation.content)
        }
        // console.log(`Saved animation ${animationCid}`)
    }
    async deletePublishedAnimationByChannel(channel, item, animationId) {
        try {
            let animation = await this.animationService.get(animationId);
            //TODO: Make sure the animation isn't still in use by another
            let existing = (await this.itemService.getByAnimationId(animation._id)).filter(i => i._id != item._id);
            if (existing?.length > 0)
                return;
            await this.animationService.delete(animation);
            //Remove from IPFS
            let ipfsDirectory = `/export/${channel._id}`;
            let ipfsFilename = `${ipfsDirectory}/animations/${animation.cid}.html`;
            await this._safeDelete(ipfsFilename);
            // //Remove from git
            // let gitDirectory = this.gitService.getBaseDir(channel)
            // await this.gitService.removeFile(`${gitDirectory}/backup/export/animations/${animation.cid}.html`)
        }
        catch (ex) { }
    }
    async deleteJSONForItem(channel, item) {
        //Remove from IPFS
        let ipfsDirectory = `/export/${channel._id}`;
        let ipfsFilename = `${ipfsDirectory}/metadata/${item.tokenId}.json`;
        //Check if it's already in IPFS
        await this._safeDelete(ipfsFilename);
        // //Remove from git
        // let gitDirectory = this.gitService.getBaseDir(channel)
        // await this.gitService.removeFile(`${gitDirectory}/backup/export/metadata/${item.tokenId}.json`)
    }
    async _safeDelete(ipfsFilename) {
        //Check if it's already in IPFS
        let stat;
        try {
            stat = await this.ipfsService.ipfs.files.stat(ipfsFilename, { hash: true });
        }
        catch (ex) { }
        if (stat?.cid?.toString()) {
            await this.ipfsService.ipfs.files.rm(ipfsFilename, { recursive: true, flush: true });
        }
    }
};
ItemWebService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_5__.injectable)(),
    __param(11, (0,inversify__WEBPACK_IMPORTED_MODULE_6__.inject)("dayjs")),
    __metadata("design:paramtypes", [_item_service_js__WEBPACK_IMPORTED_MODULE_7__.ItemService,
        _channel_service_js__WEBPACK_IMPORTED_MODULE_8__.ChannelService,
        _image_service_js__WEBPACK_IMPORTED_MODULE_9__.ImageService,
        _author_service_js__WEBPACK_IMPORTED_MODULE_10__.AuthorService,
        _animation_service_js__WEBPACK_IMPORTED_MODULE_11__.AnimationService,
        _quill_service_js__WEBPACK_IMPORTED_MODULE_12__.QuillService,
        _theme_service_js__WEBPACK_IMPORTED_MODULE_13__.ThemeService,
        _service_core_query_cache_service_js__WEBPACK_IMPORTED_MODULE_14__.QueryCacheService,
        _core_export_service_js__WEBPACK_IMPORTED_MODULE_15__.ExportService,
        _core_ipfs_service_js__WEBPACK_IMPORTED_MODULE_16__.IpfsService,
        _service_attribute_count_service_js__WEBPACK_IMPORTED_MODULE_17__.AttributeCountService, Object])
], ItemWebService);



/***/ }),

/***/ "./src/admin/util/languages.ts":
/*!*************************************!*\
  !*** ./src/admin/util/languages.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
    'English',
    'Abkhazian',
    'Afar',
    'Afrikaans',
    'Akan',
    'Albanian',
    'Amharic',
    'Arabic',
    'Aragonese',
    'Armenian',
    'Assamese',
    'Avaric',
    'Avestan',
    'Aymara',
    'Azerbaijani',
    'Bambara',
    'Bashkir',
    'Basque',
    'Belarusian',
    'Bengali',
    'Bihari languages',
    'Bislama',
    'Bosnian',
    'Breton',
    'Bulgarian',
    'Burmese',
    'Catalan, Valencian',
    'Central Khmer',
    'Chamorro',
    'Chechen',
    'Chichewa, Chewa, Nyanja',
    'Chinese',
    'Church Slavonic, Old Bulgarian, Old Church Slavonic',
    'Chuvash',
    'Cornish',
    'Corsican',
    'Cree',
    'Croatian',
    'Czech',
    'Danish',
    'Divehi, Dhivehi, Maldivian',
    'Dutch, Flemish',
    'Dzongkha',
    'Esperanto',
    'Estonian',
    'Ewe',
    'Faroese',
    'Fijian',
    'Finnish',
    'French',
    'Fulah',
    'Gaelic, Scottish Gaelic',
    'Galician',
    'Ganda',
    'Georgian',
    'German',
    'Gikuyu, Kikuyu',
    'Greek (Modern)',
    'Greenlandic, Kalaallisut',
    'Guarani',
    'Gujarati',
    'Haitian, Haitian Creole',
    'Hausa',
    'Hebrew',
    'Herero',
    'Hindi',
    'Hiri Motu',
    'Hungarian',
    'Icelandic',
    'Ido',
    'Igbo',
    'Indonesian',
    'Interlingua (International Auxiliary Language Association)',
    'Interlingue',
    'Inuktitut',
    'Inupiaq',
    'Irish',
    'Italian',
    'Japanese',
    'Javanese',
    'Kannada',
    'Kanuri',
    'Kashmiri',
    'Kazakh',
    'Kinyarwanda',
    'Komi',
    'Kongo',
    'Korean',
    'Kwanyama, Kuanyama',
    'Kurdish',
    'Kyrgyz',
    'Lao',
    'Latin',
    'Latvian',
    'Letzeburgesch, Luxembourgish',
    'Limburgish, Limburgan, Limburger',
    'Lingala',
    'Lithuanian',
    'Luba-Katanga',
    'Macedonian',
    'Malagasy',
    'Malay',
    'Malayalam',
    'Maltese',
    'Manx',
    'Maori',
    'Marathi',
    'Marshallese',
    'Moldovan, Moldavian, Romanian',
    'Mongolian',
    'Nauru',
    'Navajo, Navaho',
    'Northern Ndebele',
    'Ndonga',
    'Nepali',
    'Northern Sami',
    'Norwegian',
    'Norwegian Bokmål',
    'Norwegian Nynorsk',
    'Nuosu, Sichuan Yi',
    'Occitan (post 1500)',
    'Ojibwa',
    'Oriya',
    'Oromo',
    'Ossetian, Ossetic',
    'Pali',
    'Panjabi, Punjabi',
    'Pashto, Pushto',
    'Persian',
    'Polish',
    'Portuguese',
    'Quechua',
    'Romansh',
    'Rundi',
    'Russian',
    'Samoan',
    'Sango',
    'Sanskrit',
    'Sardinian',
    'Serbian',
    'Shona',
    'Sindhi',
    'Sinhala, Sinhalese',
    'Slovak',
    'Slovenian',
    'Somali',
    'Sotho, Southern',
    'South Ndebele',
    'Spanish, Castilian',
    'Sundanese',
    'Swahili',
    'Swati',
    'Swedish',
    'Tagalog',
    'Tahitian',
    'Tajik',
    'Tamil',
    'Tatar',
    'Telugu',
    'Thai',
    'Tibetan',
    'Tigrinya',
    'Tonga (Tonga Islands)',
    'Tsonga',
    'Tswana',
    'Turkish',
    'Turkmen',
    'Twi',
    'Uighur, Uyghur',
    'Ukrainian',
    'Urdu',
    'Uzbek',
    'Venda',
    'Vietnamese',
    'Volap_k',
    'Walloon',
    'Welsh',
    'Western Frisian',
    'Wolof',
    'Xhosa',
    'Yiddish',
    'Yoruba',
    'Zhuang, Chuang',
    'Zulu'
]);


/***/ }),

/***/ "./src/admin/util/model-view.ts":
/*!**************************************!*\
  !*** ./src/admin/util/model-view.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModelView: () => (/* binding */ ModelView)
/* harmony export */ });
class ModelView {
    model;
    view;
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}



/***/ }),

/***/ "./src/admin/util/route-map.ts":
/*!*************************************!*\
  !*** ./src/admin/util/route-map.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routeMap: () => (/* binding */ routeMap)
/* harmony export */ });
function routeMap(value, showSpinner) {
    return function (target, propertyKey, descriptor) {
        if (!globalThis.mappedRoutes)
            globalThis.mappedRoutes = [];
        globalThis.mappedRoutes.push({
            path: value,
            controllerClass: target.constructor,
            action: propertyKey,
            showSpinner: showSpinner
        });
    };
}



/***/ }),

/***/ "./src/admin/util/validation-exception.ts":
/*!************************************************!*\
  !*** ./src/admin/util/validation-exception.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ValidationException: () => (/* binding */ ValidationException)
/* harmony export */ });
class ValidationException extends Error {
    errors;
    constructor(errors) {
        super();
        this.errors = errors;
    }
}



/***/ }),

/***/ "?d546":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?8131":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?3fc0":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?cad2":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?593c":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?4068":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?e7e4":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?7bec":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?47d3":
/*!*********************************!*\
  !*** readable-stream (ignored) ***!
  \*********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?802b":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?1e44":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?21f4":
/*!****************************!*\
  !*** ./nextTick (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?5beb":
/*!*****************************************************!*\
  !*** ipfs-utils/src/files/glob-source.js (ignored) ***!
  \*****************************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?ebe9":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?0aec":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?fbf1":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?3e83":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?19e6":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "./contracts.json":
/*!************************!*\
  !*** ./contracts.json ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"Channel":{"abi":[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"ipfsCid","type":"string"},{"internalType":"uint256","name":"mintFee","type":"uint256"},{"internalType":"uint256","name":"maxTokenId","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"InvalidQueryRange","type":"error"},{"inputs":[],"name":"MintERC2309QuantityExceedsLimit","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"OwnershipNotInitializedForExtraData","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toTokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"ConsecutiveTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"MintEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_MINT_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"explicitOwnershipOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"},{"internalType":"uint24","name":"extraData","type":"uint24"}],"internalType":"struct IERC721A.TokenOwnership","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"explicitOwnershipsOf","outputs":[{"components":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint64","name":"startTimestamp","type":"uint64"},{"internalType":"bool","name":"burned","type":"bool"},{"internalType":"uint24","name":"extraData","type":"uint24"}],"internalType":"struct IERC721A.TokenOwnership[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"}],"name":"mintFromStartOrFail","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"stop","type":"uint256"}],"name":"tokensOfOwnerIn","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_i","type":"uint256"}],"name":"uint2str","outputs":[{"internalType":"string","name":"_uintAsString","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}],"name":"Channel","bytecode":"0x6080604052600a600d553480156200001657600080fd5b5060405162002ba938038062002ba98339810160408190526200003991620001da565b848460026200004983826200030d565b5060036200005882826200030d565b50506001600055506200006b33620000c3565b600b829055600c819055600a6200008384826200030d565b50600a604051602001620000989190620003d9565b60405160208183030381529060405260099081620000b791906200030d565b50505050505062000495565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200013d57600080fd5b81516001600160401b03808211156200015a576200015a62000115565b604051601f8301601f19908116603f0116810190828211818310171562000185576200018562000115565b81604052838152602092508683858801011115620001a257600080fd5b600091505b83821015620001c65785820183015181830184015290820190620001a7565b600093810190920192909252949350505050565b600080600080600060a08688031215620001f357600080fd5b85516001600160401b03808211156200020b57600080fd5b6200021989838a016200012b565b965060208801519150808211156200023057600080fd5b6200023e89838a016200012b565b955060408801519150808211156200025557600080fd5b5062000264888289016200012b565b606088015160809098015196999598509695949350505050565b600181811c908216806200029357607f821691505b602082108103620002b457634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200030857600081815260208120601f850160051c81016020861015620002e35750805b601f850160051c820191505b818110156200030457828155600101620002ef565b5050505b505050565b81516001600160401b0381111562000329576200032962000115565b62000341816200033a84546200027e565b84620002ba565b602080601f831160018114620003795760008415620003605750858301515b600019600386901b1c1916600185901b17855562000304565b600085815260208120601f198616915b82811015620003aa5788860151825594840194600190910190840162000389565b5085821015620003c95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b66697066733a2f2f60c81b81526000600760008454620003f9816200027e565b600182811680156200041457600181146200042e5762000463565b60ff19841688870152821515830288018601945062000463565b8860005260208060002060005b85811015620004585781548b82018a01529084019082016200043b565b505050858389010194505b50507f2f636f6e74726163744d657461646174612e6a736f6e0000000000000000000083525050601601949350505050565b61270480620004a56000396000f3fe6080604052600436106101b75760003560e01c80638da5cb5b116100ec578063c23dc68f1161008a578063e985e9c511610064578063e985e9c5146104e1578063f2fde38b14610537578063f76f950e14610557578063fa9b70181461057757600080fd5b8063c23dc68f1461047f578063c87b56dd146104ac578063e8a3d485146104cc57600080fd5b8063a0712d68116100c6578063a0712d6814610402578063a22cb46514610415578063a2309ff814610435578063b88d4fde1461046c57600080fd5b80638da5cb5b146103a257806395d89b41146103cd57806399a2557a146103e257600080fd5b806342842e0e1161015957806370a082311161013357806370a082311461032d578063715018a61461034d5780637a4d892a146103625780638462151c1461037557600080fd5b806342842e0e146102cd5780635bbb2177146102e05780636352211e1461030d57600080fd5b8063095ea7b311610195578063095ea7b31461025857806318160ddd1461026d57806323b872dd146102b25780633ccfd60b146102c557600080fd5b806301ffc9a7146101bc57806306fdde03146101f1578063081812fc14610213575b600080fd5b3480156101c857600080fd5b506101dc6101d7366004611e9d565b61058d565b60405190151581526020015b60405180910390f35b3480156101fd57600080fd5b50610206610672565b6040516101e89190611f28565b34801561021f57600080fd5b5061023361022e366004611f3b565b610704565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101e8565b61026b610266366004611f7d565b61076e565b005b34801561027957600080fd5b50600154600054037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff015b6040519081526020016101e8565b61026b6102c0366004611fa7565b610859565b61026b610ae8565b61026b6102db366004611fa7565b610b48565b3480156102ec57600080fd5b506103006102fb366004611fe3565b610b68565b6040516101e89190612058565b34801561031957600080fd5b50610233610328366004611f3b565b610c52565b34801561033957600080fd5b506102a46103483660046120e2565b610c5d565b34801561035957600080fd5b5061026b610cdf565b61026b6103703660046120fd565b610cf3565b34801561038157600080fd5b506103956103903660046120e2565b610e00565b6040516101e8919061211f565b3480156103ae57600080fd5b5060085473ffffffffffffffffffffffffffffffffffffffff16610233565b3480156103d957600080fd5b50610206610f2b565b3480156103ee57600080fd5b506103956103fd366004612157565b610f3a565b61026b610410366004611f3b565b611102565b34801561042157600080fd5b5061026b61043036600461218a565b61134d565b34801561044157600080fd5b506000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016102a4565b61026b61047a3660046121f5565b6113e4565b34801561048b57600080fd5b5061049f61049a366004611f3b565b611454565b6040516101e891906122ef565b3480156104b857600080fd5b506102066104c7366004611f3b565b6114dc565b3480156104d857600080fd5b506102066115a5565b3480156104ed57600080fd5b506101dc6104fc366004612341565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561054357600080fd5b5061026b6105523660046120e2565b6115b4565b34801561056357600080fd5b50610206610572366004611f3b565b611668565b34801561058357600080fd5b506102a4600d5481565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316148061062057507f80ac58cd000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b8061066c57507f5b5e139f000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60606002805461068190612374565b80601f01602080910402602001604051908101604052809291908181526020018280546106ad90612374565b80156106fa5780601f106106cf576101008083540402835291602001916106fa565b820191906000526020600020905b8154815290600101906020018083116106dd57829003601f168201915b5050505050905090565b600061070f826117bf565b610745576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081526006602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b600061077982610c52565b90503373ffffffffffffffffffffffffffffffffffffffff8216146107d8576107a281336104fc565b6107d8576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526006602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff87811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b60006108648261180d565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146108cb576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260066020526040902080543380821473ffffffffffffffffffffffffffffffffffffffff88169091141761093e5761090886336104fc565b61093e576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff851661098b576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b801561099657600082555b73ffffffffffffffffffffffffffffffffffffffff86811660009081526005602052604080822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff019055918716808252919020805460010190554260a01b177c0200000000000000000000000000000000000000000000000000000000176000858152600460205260408120919091557c020000000000000000000000000000000000000000000000000000000084169003610a8557600184016000818152600460205260408120549003610a83576000548114610a835760008181526004602052604090208490555b505b838573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050505050565b610af06118cc565b604051600090339047908381818185875af1925050503d8060008114610b32576040519150601f19603f3d011682016040523d82523d6000602084013e610b37565b606091505b5050905080610b4557600080fd5b50565b610b63838383604051806020016040528060008152506113e4565b505050565b60608160008167ffffffffffffffff811115610b8657610b866121c6565b604051908082528060200260200182016040528015610bf657816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181610ba45790505b50905060005b828114610c4957610c24868683818110610c1857610c186123c7565b90506020020135611454565b828281518110610c3657610c366123c7565b6020908102919091010152600101610bfc565b50949350505050565b600061066c8261180d565b600073ffffffffffffffffffffffffffffffffffffffff8216610cac576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205467ffffffffffffffff1690565b610ce76118cc565b610cf1600061194d565b565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181610d84576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f20737461727420706173736564000000000000000000000000000000000060448201526064015b60405180910390fd5b610d8f816001612425565b8214610df7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f546f6b656e2069732070617374207374617274000000000000000000000000006044820152606401610d7b565b610b6383611102565b60606000806000610e1085610c5d565b905060008167ffffffffffffffff811115610e2d57610e2d6121c6565b604051908082528060200260200182016040528015610e56578160200160208202803683370190505b5060408051608081018252600080825260208201819052918101829052606081019190915290915060015b838614610f1f57610e91816119c4565b91508160400151610f1757815173ffffffffffffffffffffffffffffffffffffffff1615610ebe57815194505b8773ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610f175780838780600101985081518110610f0a57610f0a6123c7565b6020026020010181815250505b600101610e81565b50909695505050505050565b60606003805461068190612374565b6060818310610f75576040517f32c1995a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080610f8160005490565b90506001851015610f9157600194505b80841115610f9d578093505b6000610fa887610c5d565b905084861015610fc75785850381811015610fc1578091505b50610fcb565b5060005b60008167ffffffffffffffff811115610fe657610fe66121c6565b60405190808252806020026020018201604052801561100f578160200160208202803683370190505b509050816000036110255793506110fb92505050565b600061103088611454565b905060008160400151611041575080515b885b8881141580156110535750848714155b156110ef57611061816119c4565b925082604001516110e757825173ffffffffffffffffffffffffffffffffffffffff161561108e57825191505b8a73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036110e757808488806001019950815181106110da576110da6123c7565b6020026020010181815250505b600101611043565b50505092835250909150505b9392505050565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff018161118e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f546f6f20666577000000000000000000000000000000000000000000000000006044820152606401610d7b565b600d548211156111fa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f546f6f206d616e790000000000000000000000000000000000000000000000006044820152606401610d7b565b600c546112078383612425565b111561126f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4d696e74696e6720636c6f7365640000000000000000000000000000000000006044820152606401610d7b565b60085473ffffffffffffffffffffffffffffffffffffffff16331461130357600b5461129b9083612438565b3414611303576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f53656e64206578616374204554480000000000000000000000000000000000006044820152606401610d7b565b61130d3383611a69565b7f94242c431036b9ba6723a138d4b275a5b38e13a95ef66227a45df427c0f843f36113388383612425565b60405190815260200160405180910390a15050565b33600081815260076020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6113ef848484610859565b73ffffffffffffffffffffffffffffffffffffffff83163b1561144e5761141884848484611a87565b61144e576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b60408051608081018252600080825260208201819052918101829052606081019190915260408051608081018252600080825260208201819052918101829052606081019190915260018310806114ad57506000548310155b156114b85792915050565b6114c1836119c4565b90508060400151156114d35792915050565b6110fb83611c00565b60606114e7826117bf565b611573576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610d7b565b600a61157e83611668565b60405160200161158f92919061246b565b6040516020818303038152906040529050919050565b60606009805461068190612374565b6115bc6118cc565b73ffffffffffffffffffffffffffffffffffffffff811661165f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610d7b565b610b458161194d565b6060816000036116ab57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156116d557806116bf816125d3565b91506116ce9050600a8361260b565b91506116af565b60008167ffffffffffffffff8111156116f0576116f06121c6565b6040519080825280601f01601f19166020018201604052801561171a576020820181803683370190505b509050815b8515610c4957611730600182612646565b9050600061173f600a8861260b565b61174a90600a612438565b6117549088612646565b61175f906030612659565b905060008160f81b90508084848151811061177c5761177c6123c7565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506117b6600a8961260b565b9750505061171f565b6000816001111580156117d3575060005482105b801561066c5750506000908152600460205260409020547c0100000000000000000000000000000000000000000000000000000000161590565b6000818060011161189a5760005481101561189a57600081815260046020526040812054907c010000000000000000000000000000000000000000000000000000000082169003611898575b806000036110fb57507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01600081815260046020526040902054611859565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60085473ffffffffffffffffffffffffffffffffffffffff163314610cf1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610d7b565b6008805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60408051608081018252600080825260208201819052918101829052606081019190915260008281526004602052604090205461066c906040805160808101825273ffffffffffffffffffffffffffffffffffffffff8316815260a083901c67ffffffffffffffff1660208201527c0100000000000000000000000000000000000000000000000000000000831615159181019190915260e89190911c606082015290565b611a83828260405180602001604052806000815250611c9e565b5050565b6040517f150b7a0200000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290611ae2903390899088908890600401612672565b6020604051808303816000875af1925050508015611b3b575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611b38918101906126b1565b60015b611bb2573d808015611b69576040519150601f19603f3d011682016040523d82523d6000602084013e611b6e565b606091505b508051600003611baa576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050949350505050565b60408051608081018252600080825260208201819052918101829052606081019190915261066c611c308361180d565b6040805160808101825273ffffffffffffffffffffffffffffffffffffffff8316815260a083901c67ffffffffffffffff1660208201527c0100000000000000000000000000000000000000000000000000000000831615159181019190915260e89190911c606082015290565b611ca88383611d31565b73ffffffffffffffffffffffffffffffffffffffff83163b15610b63576000548281035b611cdf6000868380600101945086611a87565b611d15576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b818110611ccc578160005414611d2a57600080fd5b5050505050565b6000805490829003611d6f576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff831660008181526005602090815260408083208054680100000000000000018802019055848352600490915281206001851460e11b4260a01b178317905582840190839083907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4600183015b818114611e2b57808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a4600101611df3565b5081600003611e66576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005550505050565b7fffffffff0000000000000000000000000000000000000000000000000000000081168114610b4557600080fd5b600060208284031215611eaf57600080fd5b81356110fb81611e6f565b60005b83811015611ed5578181015183820152602001611ebd565b50506000910152565b60008151808452611ef6816020860160208601611eba565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006110fb6020830184611ede565b600060208284031215611f4d57600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff81168114611f7857600080fd5b919050565b60008060408385031215611f9057600080fd5b611f9983611f54565b946020939093013593505050565b600080600060608486031215611fbc57600080fd5b611fc584611f54565b9250611fd360208501611f54565b9150604084013590509250925092565b60008060208385031215611ff657600080fd5b823567ffffffffffffffff8082111561200e57600080fd5b818501915085601f83011261202257600080fd5b81358181111561203157600080fd5b8660208260051b850101111561204657600080fd5b60209290920196919550909350505050565b6020808252825182820181905260009190848201906040850190845b81811015610f1f576120cf83855173ffffffffffffffffffffffffffffffffffffffff815116825267ffffffffffffffff602082015116602083015260408101511515604083015262ffffff60608201511660608301525050565b9284019260809290920191600101612074565b6000602082840312156120f457600080fd5b6110fb82611f54565b6000806040838503121561211057600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610f1f5783518352928401929184019160010161213b565b60008060006060848603121561216c57600080fd5b61217584611f54565b95602085013595506040909401359392505050565b6000806040838503121561219d57600080fd5b6121a683611f54565b9150602083013580151581146121bb57600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806000806080858703121561220b57600080fd5b61221485611f54565b935061222260208601611f54565b925060408501359150606085013567ffffffffffffffff8082111561224657600080fd5b818701915087601f83011261225a57600080fd5b81358181111561226c5761226c6121c6565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156122b2576122b26121c6565b816040528281528a60208487010111156122cb57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b815173ffffffffffffffffffffffffffffffffffffffff16815260208083015167ffffffffffffffff169082015260408083015115159082015260608083015162ffffff16908201526080810161066c565b6000806040838503121561235457600080fd5b61235d83611f54565b915061236b60208401611f54565b90509250929050565b600181811c9082168061238857607f821691505b6020821081036123c1577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561066c5761066c6123f6565b808202811582820484141761066c5761066c6123f6565b60008151612461818560208601611eba565b9290920192915050565b7f697066733a2f2f000000000000000000000000000000000000000000000000008152600060076000855481600182811c9150808316806124ad57607f831692505b602080841082036124e5577f4e487b710000000000000000000000000000000000000000000000000000000086526022600452602486fd5b8180156124f9576001811461253057612561565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008616888b01528785151586028b01019650612561565b60008c81526020902060005b868110156125575781548c82018b015290850190830161253c565b505087858b010196505b5050505050506125c96125a061259a837f2f6d657461646174612f000000000000000000000000000000000000000000008152600a0190565b8761244f565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000815260050190565b9695505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612604576126046123f6565b5060010190565b600082612641577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b8181038181111561066c5761066c6123f6565b60ff818116838216019081111561066c5761066c6123f6565b600073ffffffffffffffffffffffffffffffffffffffff8087168352808616602084015250836040830152608060608301526125c96080830184611ede565b6000602082840312156126c357600080fd5b81516110fb81611e6f56fea2646970667358221220e0b44cbd7105a97ddc99fbd4a60e2d6dcc8833adafd3abb9f3108d0d1d880dd464736f6c63430008150033","deployedBytecode":"0x6080604052600436106101b75760003560e01c80638da5cb5b116100ec578063c23dc68f1161008a578063e985e9c511610064578063e985e9c5146104e1578063f2fde38b14610537578063f76f950e14610557578063fa9b70181461057757600080fd5b8063c23dc68f1461047f578063c87b56dd146104ac578063e8a3d485146104cc57600080fd5b8063a0712d68116100c6578063a0712d6814610402578063a22cb46514610415578063a2309ff814610435578063b88d4fde1461046c57600080fd5b80638da5cb5b146103a257806395d89b41146103cd57806399a2557a146103e257600080fd5b806342842e0e1161015957806370a082311161013357806370a082311461032d578063715018a61461034d5780637a4d892a146103625780638462151c1461037557600080fd5b806342842e0e146102cd5780635bbb2177146102e05780636352211e1461030d57600080fd5b8063095ea7b311610195578063095ea7b31461025857806318160ddd1461026d57806323b872dd146102b25780633ccfd60b146102c557600080fd5b806301ffc9a7146101bc57806306fdde03146101f1578063081812fc14610213575b600080fd5b3480156101c857600080fd5b506101dc6101d7366004611e9d565b61058d565b60405190151581526020015b60405180910390f35b3480156101fd57600080fd5b50610206610672565b6040516101e89190611f28565b34801561021f57600080fd5b5061023361022e366004611f3b565b610704565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101e8565b61026b610266366004611f7d565b61076e565b005b34801561027957600080fd5b50600154600054037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff015b6040519081526020016101e8565b61026b6102c0366004611fa7565b610859565b61026b610ae8565b61026b6102db366004611fa7565b610b48565b3480156102ec57600080fd5b506103006102fb366004611fe3565b610b68565b6040516101e89190612058565b34801561031957600080fd5b50610233610328366004611f3b565b610c52565b34801561033957600080fd5b506102a46103483660046120e2565b610c5d565b34801561035957600080fd5b5061026b610cdf565b61026b6103703660046120fd565b610cf3565b34801561038157600080fd5b506103956103903660046120e2565b610e00565b6040516101e8919061211f565b3480156103ae57600080fd5b5060085473ffffffffffffffffffffffffffffffffffffffff16610233565b3480156103d957600080fd5b50610206610f2b565b3480156103ee57600080fd5b506103956103fd366004612157565b610f3a565b61026b610410366004611f3b565b611102565b34801561042157600080fd5b5061026b61043036600461218a565b61134d565b34801561044157600080fd5b506000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff016102a4565b61026b61047a3660046121f5565b6113e4565b34801561048b57600080fd5b5061049f61049a366004611f3b565b611454565b6040516101e891906122ef565b3480156104b857600080fd5b506102066104c7366004611f3b565b6114dc565b3480156104d857600080fd5b506102066115a5565b3480156104ed57600080fd5b506101dc6104fc366004612341565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260076020908152604080832093909416825291909152205460ff1690565b34801561054357600080fd5b5061026b6105523660046120e2565b6115b4565b34801561056357600080fd5b50610206610572366004611f3b565b611668565b34801561058357600080fd5b506102a4600d5481565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316148061062057507f80ac58cd000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b8061066c57507f5b5e139f000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60606002805461068190612374565b80601f01602080910402602001604051908101604052809291908181526020018280546106ad90612374565b80156106fa5780601f106106cf576101008083540402835291602001916106fa565b820191906000526020600020905b8154815290600101906020018083116106dd57829003601f168201915b5050505050905090565b600061070f826117bf565b610745576040517fcf4700e400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5060009081526006602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b600061077982610c52565b90503373ffffffffffffffffffffffffffffffffffffffff8216146107d8576107a281336104fc565b6107d8576040517fcfb3b94200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008281526006602052604080822080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff87811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b60006108648261180d565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146108cb576040517fa114810000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600082815260066020526040902080543380821473ffffffffffffffffffffffffffffffffffffffff88169091141761093e5761090886336104fc565b61093e576040517f59c896be00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff851661098b576040517fea553b3400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b801561099657600082555b73ffffffffffffffffffffffffffffffffffffffff86811660009081526005602052604080822080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff019055918716808252919020805460010190554260a01b177c0200000000000000000000000000000000000000000000000000000000176000858152600460205260408120919091557c020000000000000000000000000000000000000000000000000000000084169003610a8557600184016000818152600460205260408120549003610a83576000548114610a835760008181526004602052604090208490555b505b838573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050505050565b610af06118cc565b604051600090339047908381818185875af1925050503d8060008114610b32576040519150601f19603f3d011682016040523d82523d6000602084013e610b37565b606091505b5050905080610b4557600080fd5b50565b610b63838383604051806020016040528060008152506113e4565b505050565b60608160008167ffffffffffffffff811115610b8657610b866121c6565b604051908082528060200260200182016040528015610bf657816020015b6040805160808101825260008082526020808301829052928201819052606082015282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff909201910181610ba45790505b50905060005b828114610c4957610c24868683818110610c1857610c186123c7565b90506020020135611454565b828281518110610c3657610c366123c7565b6020908102919091010152600101610bfc565b50949350505050565b600061066c8261180d565b600073ffffffffffffffffffffffffffffffffffffffff8216610cac576040517f8f4eb60400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205467ffffffffffffffff1690565b610ce76118cc565b610cf1600061194d565b565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0181610d84576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4e6f20737461727420706173736564000000000000000000000000000000000060448201526064015b60405180910390fd5b610d8f816001612425565b8214610df7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f546f6b656e2069732070617374207374617274000000000000000000000000006044820152606401610d7b565b610b6383611102565b60606000806000610e1085610c5d565b905060008167ffffffffffffffff811115610e2d57610e2d6121c6565b604051908082528060200260200182016040528015610e56578160200160208202803683370190505b5060408051608081018252600080825260208201819052918101829052606081019190915290915060015b838614610f1f57610e91816119c4565b91508160400151610f1757815173ffffffffffffffffffffffffffffffffffffffff1615610ebe57815194505b8773ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610f175780838780600101985081518110610f0a57610f0a6123c7565b6020026020010181815250505b600101610e81565b50909695505050505050565b60606003805461068190612374565b6060818310610f75576040517f32c1995a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080610f8160005490565b90506001851015610f9157600194505b80841115610f9d578093505b6000610fa887610c5d565b905084861015610fc75785850381811015610fc1578091505b50610fcb565b5060005b60008167ffffffffffffffff811115610fe657610fe66121c6565b60405190808252806020026020018201604052801561100f578160200160208202803683370190505b509050816000036110255793506110fb92505050565b600061103088611454565b905060008160400151611041575080515b885b8881141580156110535750848714155b156110ef57611061816119c4565b925082604001516110e757825173ffffffffffffffffffffffffffffffffffffffff161561108e57825191505b8a73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036110e757808488806001019950815181106110da576110da6123c7565b6020026020010181815250505b600101611043565b50505092835250909150505b9392505050565b6000547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff018161118e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f546f6f20666577000000000000000000000000000000000000000000000000006044820152606401610d7b565b600d548211156111fa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f546f6f206d616e790000000000000000000000000000000000000000000000006044820152606401610d7b565b600c546112078383612425565b111561126f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4d696e74696e6720636c6f7365640000000000000000000000000000000000006044820152606401610d7b565b60085473ffffffffffffffffffffffffffffffffffffffff16331461130357600b5461129b9083612438565b3414611303576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f53656e64206578616374204554480000000000000000000000000000000000006044820152606401610d7b565b61130d3383611a69565b7f94242c431036b9ba6723a138d4b275a5b38e13a95ef66227a45df427c0f843f36113388383612425565b60405190815260200160405180910390a15050565b33600081815260076020908152604080832073ffffffffffffffffffffffffffffffffffffffff87168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6113ef848484610859565b73ffffffffffffffffffffffffffffffffffffffff83163b1561144e5761141884848484611a87565b61144e576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50505050565b60408051608081018252600080825260208201819052918101829052606081019190915260408051608081018252600080825260208201819052918101829052606081019190915260018310806114ad57506000548310155b156114b85792915050565b6114c1836119c4565b90508060400151156114d35792915050565b6110fb83611c00565b60606114e7826117bf565b611573576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610d7b565b600a61157e83611668565b60405160200161158f92919061246b565b6040516020818303038152906040529050919050565b60606009805461068190612374565b6115bc6118cc565b73ffffffffffffffffffffffffffffffffffffffff811661165f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610d7b565b610b458161194d565b6060816000036116ab57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b81156116d557806116bf816125d3565b91506116ce9050600a8361260b565b91506116af565b60008167ffffffffffffffff8111156116f0576116f06121c6565b6040519080825280601f01601f19166020018201604052801561171a576020820181803683370190505b509050815b8515610c4957611730600182612646565b9050600061173f600a8861260b565b61174a90600a612438565b6117549088612646565b61175f906030612659565b905060008160f81b90508084848151811061177c5761177c6123c7565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506117b6600a8961260b565b9750505061171f565b6000816001111580156117d3575060005482105b801561066c5750506000908152600460205260409020547c0100000000000000000000000000000000000000000000000000000000161590565b6000818060011161189a5760005481101561189a57600081815260046020526040812054907c010000000000000000000000000000000000000000000000000000000082169003611898575b806000036110fb57507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01600081815260046020526040902054611859565b505b6040517fdf2d9b4200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60085473ffffffffffffffffffffffffffffffffffffffff163314610cf1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610d7b565b6008805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60408051608081018252600080825260208201819052918101829052606081019190915260008281526004602052604090205461066c906040805160808101825273ffffffffffffffffffffffffffffffffffffffff8316815260a083901c67ffffffffffffffff1660208201527c0100000000000000000000000000000000000000000000000000000000831615159181019190915260e89190911c606082015290565b611a83828260405180602001604052806000815250611c9e565b5050565b6040517f150b7a0200000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff85169063150b7a0290611ae2903390899088908890600401612672565b6020604051808303816000875af1925050508015611b3b575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611b38918101906126b1565b60015b611bb2573d808015611b69576040519150601f19603f3d011682016040523d82523d6000602084013e611b6e565b606091505b508051600003611baa576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050949350505050565b60408051608081018252600080825260208201819052918101829052606081019190915261066c611c308361180d565b6040805160808101825273ffffffffffffffffffffffffffffffffffffffff8316815260a083901c67ffffffffffffffff1660208201527c0100000000000000000000000000000000000000000000000000000000831615159181019190915260e89190911c606082015290565b611ca88383611d31565b73ffffffffffffffffffffffffffffffffffffffff83163b15610b63576000548281035b611cdf6000868380600101945086611a87565b611d15576040517fd1a57ed600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b818110611ccc578160005414611d2a57600080fd5b5050505050565b6000805490829003611d6f576040517fb562e8dd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff831660008181526005602090815260408083208054680100000000000000018802019055848352600490915281206001851460e11b4260a01b178317905582840190839083907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a4600183015b818114611e2b57808360007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600080a4600101611df3565b5081600003611e66576040517f2e07630000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005550505050565b7fffffffff0000000000000000000000000000000000000000000000000000000081168114610b4557600080fd5b600060208284031215611eaf57600080fd5b81356110fb81611e6f565b60005b83811015611ed5578181015183820152602001611ebd565b50506000910152565b60008151808452611ef6816020860160208601611eba565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006110fb6020830184611ede565b600060208284031215611f4d57600080fd5b5035919050565b803573ffffffffffffffffffffffffffffffffffffffff81168114611f7857600080fd5b919050565b60008060408385031215611f9057600080fd5b611f9983611f54565b946020939093013593505050565b600080600060608486031215611fbc57600080fd5b611fc584611f54565b9250611fd360208501611f54565b9150604084013590509250925092565b60008060208385031215611ff657600080fd5b823567ffffffffffffffff8082111561200e57600080fd5b818501915085601f83011261202257600080fd5b81358181111561203157600080fd5b8660208260051b850101111561204657600080fd5b60209290920196919550909350505050565b6020808252825182820181905260009190848201906040850190845b81811015610f1f576120cf83855173ffffffffffffffffffffffffffffffffffffffff815116825267ffffffffffffffff602082015116602083015260408101511515604083015262ffffff60608201511660608301525050565b9284019260809290920191600101612074565b6000602082840312156120f457600080fd5b6110fb82611f54565b6000806040838503121561211057600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610f1f5783518352928401929184019160010161213b565b60008060006060848603121561216c57600080fd5b61217584611f54565b95602085013595506040909401359392505050565b6000806040838503121561219d57600080fd5b6121a683611f54565b9150602083013580151581146121bb57600080fd5b809150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806000806080858703121561220b57600080fd5b61221485611f54565b935061222260208601611f54565b925060408501359150606085013567ffffffffffffffff8082111561224657600080fd5b818701915087601f83011261225a57600080fd5b81358181111561226c5761226c6121c6565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156122b2576122b26121c6565b816040528281528a60208487010111156122cb57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b815173ffffffffffffffffffffffffffffffffffffffff16815260208083015167ffffffffffffffff169082015260408083015115159082015260608083015162ffffff16908201526080810161066c565b6000806040838503121561235457600080fd5b61235d83611f54565b915061236b60208401611f54565b90509250929050565b600181811c9082168061238857607f821691505b6020821081036123c1577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561066c5761066c6123f6565b808202811582820484141761066c5761066c6123f6565b60008151612461818560208601611eba565b9290920192915050565b7f697066733a2f2f000000000000000000000000000000000000000000000000008152600060076000855481600182811c9150808316806124ad57607f831692505b602080841082036124e5577f4e487b710000000000000000000000000000000000000000000000000000000086526022600452602486fd5b8180156124f9576001811461253057612561565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008616888b01528785151586028b01019650612561565b60008c81526020902060005b868110156125575781548c82018b015290850190830161253c565b505087858b010196505b5050505050506125c96125a061259a837f2f6d657461646174612f000000000000000000000000000000000000000000008152600a0190565b8761244f565b7f2e6a736f6e000000000000000000000000000000000000000000000000000000815260050190565b9695505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612604576126046123f6565b5060010190565b600082612641577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b8181038181111561066c5761066c6123f6565b60ff818116838216019081111561066c5761066c6123f6565b600073ffffffffffffffffffffffffffffffffffffffff8087168352808616602084015250836040830152608060608301526125c96080830184611ede565b6000602082840312156126c357600080fd5b81516110fb81611e6f56fea2646970667358221220e0b44cbd7105a97ddc99fbd4a60e2d6dcc8833adafd3abb9f3108d0d1d880dd464736f6c63430008150033"}}');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/admin/index.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ admin = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=main.admin.js.map