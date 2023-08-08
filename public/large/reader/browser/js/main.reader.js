var reader;
(self["webpackChunkreader"] = self["webpackChunkreader"] || []).push([["main"],{

/***/ "./src/reader/components/reader/channel/attribute-filter.f7.html":
/*!***********************************************************************!*\
  !*** ./src/reader/components/reader/channel/attribute-filter.f7.html ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** @jsx $jsx */

let attributeOptions;
let filters = [];
let attributeParams = {};
let handlerBody;
let handler = async e => {
  return handlerBody(e);
};
function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  filters = [];
  attributeParams = {};
  handlerBody = async e => {
    attributeOptions = e.attributeOptions;
    if (e.attributeParams) {
      attributeParams = e.attributeParams;
      $('#attribute-accordian-item').addClass('accordion-item-opened');
    }
    await $update();
  };
  document.removeEventListener('attribute-options-loaded', handler);
  document.addEventListener('attribute-options-loaded', handler);
  const attributeChange = e => {
    attributeParams[e.currentTarget.name] = e.currentTarget.value;
    if (e.currentTarget.value) {
      attributeParams[e.currentTarget.name] = e.currentTarget.value;
    } else {
      delete attributeParams[e.currentTarget.name];
    }

    //Dispatch event so we can refresh list
    let ev = new CustomEvent('explore-attribute-filter-changed');
    ev.attributeParams = attributeParams;
    document.dispatchEvent(ev);
  };
  const deleteChipClick = async e => {
    let attributeId = $(e.currentTarget).data('id');
    delete attributeParams[attributeId];
    await $update();

    //Dispatch event so we can refresh list
    let ev = new CustomEvent('explore-attribute-filter-changed');
    ev.attributeParams = attributeParams;
    document.dispatchEvent(ev);
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

  <div>

    <div class="block block-strong row">
      
      <div class="col-50">

        ${Object.keys(attributeParams).map(key => $h`
          <div class="chip">
            <div class="chip-label">${key}: ${attributeParams[key]}</div>
            <a href="#" class="chip-delete" @click="${deleteChipClick}" data-id="${key}"></a>
          </div>
        `)}

      </div>
      <div class="col-50 filter-button">
        
        <a href="#" data-popup=".filter-popup" class="popup-open">Filters (${Object.keys(attributeParams).length})</a>

        <div class="popup filter-popup">
          <div class="view">
            <div class="page">
              <div class="navbar">
                <div class="navbar-bg"></div>
                <div class="navbar-inner">
                  <div class="title">Filters</div>
                  <div class="right">
                    <!-- Link to close popup -->
                    <a class="link popup-close">Close</a>
                  </div>
                </div>
              </div>
              <div class="page-content">

                <div class="list">
                  <ul>
                    ${attributeOptions?.map( ao => $h`
                      <li class="item-content item-input">
                        <div class="item-inner">
                          <div class="item-title item-label">${ao.traitType}</div>
                          <div class="item-input-wrap input-dropdown-wrap">
                            <select name="${ao.traitType}" @change="${attributeChange}">
                              <option selected ></option>
                              ${ao.values?.map( v => $h`
                                ${v.value == attributeParams[ao.traitType] ? $h`
                                  <option value="${v.value}" selected>${v.value} (${v.count})</option>
                                ` : $h`
                                  <option value="${v.value}">${v.value} (${v.count})</option>
                                `} 
                              `)}
                            </select>
                          </div>
                        </div>
                      </li>
                    `)}
                  </ul>
                </div>

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
framework7Component.id = '417b875568';
framework7Component.style = `

.item-content.attribute-select {
  width: 175px;
  display: inline-block;
}


`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/reader/components/reader/channel/explore-total-info.f7.html":
/*!*************************************************************************!*\
  !*** ./src/reader/components/reader/channel/explore-total-info.f7.html ***!
  \*************************************************************************/
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
  let totalItems;
  let totalMatches;
  document.addEventListener('explore-total-info-changed', async e => {
    totalItems = e.totalItems;
    totalMatches = e.totalMatches;
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

  <div class="block-title block-title-small">

    ${totalMatches ? $h`

      ${totalMatches != totalItems ? $h`
        Showing ${totalMatches} results (${totalItems} total)
      ` : $h`
        Showing 1 - ${totalItems} results  
      `}

    ` : $h`<span/>`}

  </div>

`
    }
    ;
}
framework7Component.id = 'f993ba137f';
framework7Component.style = `


`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/reader/components/reader/channel/largest-sales.f7.html":
/*!********************************************************************!*\
  !*** ./src/reader/components/reader/channel/largest-sales.f7.html ***!
  \********************************************************************/
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
  let walletService = globalThis.container.get("WalletService");
  let mintWebService = globalThis.container.get("MintWebService");
  let transactionWebService = globalThis.container.get("TransactionWebService");
  let baseURI = globalThis.container.get("baseURI")();
  const link = href => {
    return baseURI + href;
  };
  let largestSales = props.largest_sales;
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

    <div class="block block-strong inset largest-sales">
                    
      ${largestSales?.sales?.map( (sale, index) => $h`
        <div class="margin-bottom">

          <div class="rank">#${index+1}</div>

          <div class="square">
            <a href="${link(`t/${sale.tokenId}`)}" class="item-link">
              <img src="${link(`backup/export/images/${largestSales.rowItemViewModels[sale.tokenId].coverImageId}.${largestSales.rowItemViewModels[sale.tokenId].coverImageGenerated ? 'svg' : 'jpg'}`)}" alt="${sale.tokenId}" height="125" width="125"/>
            </a>
          </div>

          <div class="sale-info margin-top">
            <a href="${link(`t/${sale.tokenId}`)}" class="item-link">${largestSales.rowItemViewModels[sale.tokenId].title}</a><br />
            ${new Intl.NumberFormat('en-US').format(sale.ethValue)} ETH (${transactionWebService.abbreviateDollars(sale.usdValue, 2)})
            <div class="date">${dayjs(sale.date).format('LL')}</div>
          </div>

        </div>
      `)}
      </div>

  
`
    }
    ;
}
framework7Component.id = 'd709014be9';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/reader/components/reader/channel/leaderboard-rows.f7.html":
/*!***********************************************************************!*\
  !*** ./src/reader/components/reader/channel/leaderboard-rows.f7.html ***!
  \***********************************************************************/
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
  let transactionWebService = globalThis.container.get("TransactionWebService");
  let walletService = globalThis.container.get("WalletService");
  let baseURI = globalThis.container.get("baseURI")();
  let tokenOwners = props.token_owners;
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
  
  <tbody>
                                    
    ${tokenOwners?.map(u => $h`
        <tr>
            <td class="label-cell">
                ${u.rank}
            </td>

            <td class="address-cell">

                ${u.ensName ? $h`
                    <a href="${baseURI}u/?address=${u._id}">${u.ensName}</a>
                ` : $h`
                    <a href="${baseURI}u/?address=${u._id}">${u._id ? walletService.truncateEthAddress(u._id) : ' '}</a>
                `} 

            </td>


            <td class="numeric-cell">
                ${u.count}
            </td>

            <td class="numeric-cell">
                <span class="eth-value">${new Intl.NumberFormat('en-US').format(u.salesReport?.buys?.ethValue ? u.salesReport?.buys?.ethValue : 0)} ETH</span> <br />
                <span class="dollar-value">${transactionWebService.abbreviateDollars(u.salesReport?.buys?.usdValue ? u.salesReport?.buys?.usdValue : 0, 2)}</span>
            </td>

            <td class="numeric-cell">
                <span class="eth-value">${new Intl.NumberFormat('en-US').format(u.salesReport?.sales?.ethValue ? u.salesReport?.sales?.ethValue : 0)} ETH</span> <br />
                <span class="dollar-value">${transactionWebService.abbreviateDollars(u.salesReport?.sales?.usdValue ? u.salesReport?.sales?.usdValue : 0, 2)}</span>
            </td>

            <td class="text-cell">
                ${u.lastActive ? dayjs(u.lastActive).fromNow() : ""}
            </td>


        </tr>
    
    `)}
    </tbody>

`
    }
    ;
}
framework7Component.id = '8d01c34adf';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/reader/components/reader/channel/mint-info.f7.html":
/*!****************************************************************!*\
  !*** ./src/reader/components/reader/channel/mint-info.f7.html ***!
  \****************************************************************/
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
  let hasProvider = false;
  let mintingViewModel;
  let baseURL = props.baseurl;
  const link = href => {
    return `${baseURL + href}`;
  };
  app.on('minting-view-model-updated', function (m) {
    mintingViewModel = m;
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

  <div class="card card-header-divider">
    <div class="card-header">Mint NFTs</div>
    <div class="card-content card-content-padding">

      ${mintingViewModel ? $h`
        <p>
          <strong>Total Minted:</strong> ${mintingViewModel.totalMinted} of ${mintingViewModel.totalSupply}
        </p>

        <a href="${link('mint.html')}" class="link">Mint NFTs</a>

      ` : $h`
        Minting information unavailable. 
        <p>Note: Use a web browser with wallet support to see NFT information.</p>
      `}


    </div>
  </div>

`
    }
    ;
}
framework7Component.id = 'f7eb4bca6a';
framework7Component.style = `
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/reader/components/reader/channel/transaction-row.f7.html":
/*!**********************************************************************!*\
  !*** ./src/reader/components/reader/channel/transaction-row.f7.html ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** @jsx $jsx */

// create local component
const Transfer = (props, {
  $h
}) => {
  let walletService = globalThis.container.get("WalletService");
  let transactionWebService = globalThis.container.get("TransactionWebService");
  const link = href => {
    return `${baseURI + href}`;
  };
  const imageLink = rowItemViewModel => {
    if (!rowItemViewModel) return;
    if (rowItemViewModel?.coverImageGenerated) {
      return link('backup/export/images/' + rowItemViewModel.coverImageId + ".svg");
    }
    return link('backup/generated/images/50x50/' + rowItemViewModel.coverImageId + ".webp");
  };
  let transaction = props.transaction;
  let event = props.event;
  let baseURI = props.base_uri;
  let rowItemViewModels = props.row_item_view_models;
  let index = props.index;
  return () => $h`
    
        <tr ${index % 2 == 0 ? 'class="alt-row"' : ''}>

          <td class="image">
            <a href="${baseURI}t/${event.tokenId}">
              <img src="${imageLink(rowItemViewModels[event.tokenId])}" class="latest-img" alt="${rowItemViewModels[event.tokenId]?.title}" height="50" width="50" /> 
            </a>
          </td>

          <td class="label-cell medium-only">

            <a href="${baseURI}t/${event.tokenId}" class="title">
              ${rowItemViewModels[event.tokenId]?.title}            
            </a>

          </td>
          <td>
            ${event.isMint ? $h`
              <a href="https://etherscan.io/tx/${transaction._id}" class="external" target="_blank">Mint</a>
            ` : $h`

              ${transaction?.transactionValue?.markets && Object.keys(transaction?.transactionValue?.markets).length > 0 ? $h`
                <a href="https://etherscan.io/tx/${transaction._id}" class="external" target="_blank">Sold</a> on ${Array.from(Object.keys(transaction.transactionValue?.markets).map(k => k)).join(", ")} ${transaction.transactionValue?.aggregator ? ' / ' + transaction.transactionValue.aggregator : ''}

              ` : $h`
                <a href="https://etherscan.io/tx/${transaction._id}" class="external" target="_blank">${event.event}</a>
              `}
              
            `}

            <p class="date">${dayjs(transaction.timestamp * 1000).fromNow()}</p>
          </td>

          <td class="numeric-cell">
            
            <span class="eth-value">${transaction.transactionValue?.tokenPrice[event.tokenId]?.price.toFixed(5)} ${transaction.transactionValue?.tokenPrice[event.tokenId]?.currency}</span>
            ${transaction.transactionValue?.tokenPrice[event.tokenId]?.usdValue ? $h`
              <br />
              <span class="dollar-value">${transactionWebService.abbreviateDollars(transaction.transactionValue?.tokenPrice[event.tokenId]?.usdValue, 2)}</span>
            ` : $h` `}

           </td>
          <td class="numeric-cell medium-only">
            <a href="${baseURI}u/?address=${event.fromAddress}" class="${event.fromAddress == transaction.from ? 'is-from' : ''}">
                  ${getDisplayAddress(event.fromAddress)}
            </a> <span class="f7-icons">arrow_right</span>

            <a href="${baseURI}u/?address=${event.toAddress}" class="${event.toAddress == transaction.from ? 'is-from' : ''}">
              ${getDisplayAddress(event.toAddress)}
            </a>

          </td>
        </tr>
    `;
};
const Approval = (props, {
  $h
}) => {
  let walletService = globalThis.container.get("WalletService");
  let transactionWebService = globalThis.container.get("TransactionWebService");
  const link = href => {
    return `${baseURI + href}`;
  };
  const imageLink = rowItemViewModel => {
    if (rowItemViewModel.coverImageGenerated) {
      return link('backup/export/images/' + rowItemViewModel.coverImageId + ".svg");
    }
    return link('backup/generated/images/50x50/' + rowItemViewModel.coverImageId + ".webp");
  };
  let transaction = props.transaction;
  let event = props.event;
  let baseURI = props.base_uri;
  let rowItemViewModels = props.row_item_view_models;
  let index = props.index;
  let owner = event?.namedArgs?.owner;
  let approved = event?.namedArgs?.approved;
  let from = transaction?.from;
  return () => $h`
      <tr class="${index % 2 == 0 ? "alt-row" : ''}">

          <td class="image">
            <a href="${baseURI}t/${event.tokenId}">
              <img src="${imageLink(rowItemViewModels[event.tokenId])}" class="latest-img" alt="${rowItemViewModels[event.tokenId].title}" height="40" width="40" /> 
            </a>
          </td>

          <td class="label-cell medium-only">

            <a href="${baseURI}t/${event.tokenId}" class="title">
              ${rowItemViewModels[event.tokenId].title}            
            </a>

            
          </td>
          <td>
            <a href="https://etherscan.io/tx/${transaction._id}" class="external" target="_blank">${event.event}</a> <br />
            
            <p class="date">${dayjs(transaction.timestamp * 1000).fromNow()}</p>
          </td>

          <td class="numeric-cell"></td>
          <td class="medium-only numeric-cell">
            <a href="#">${approved}</a>
          </td>
        </tr>
    `;
};
const ApprovalForAll = (props, {
  $h
}) => {
  let walletService = globalThis.container.get("WalletService");
  let transactionWebService = globalThis.container.get("TransactionWebService");
  let transaction = props.transaction;
  let event = props.event;
  let baseURI = props.base_uri;
  let index = props.index;
  return () => $h`
        <tr class="${index % 2 == 0 ? "alt-row" : ''}">

          <td class="image">
            ${event.namedArgs.approved ? $h`🟢` : $h`🔴`}
          </td>

          <td class="label-cell medium-only">
            
          </td>
          <td>
             <a href="https://etherscan.io/tx/${transaction._id}" class="external" target="_blank">${event.event}</a>  <br />

             <p class="date">${dayjs(transaction.timestamp * 1000).fromNow()}</p>
          </td>

          <td class="numeric-cell"></td>
          <td class="medium-only numeric-cell">
            <a href="${baseURI}u/?address=${event.namedArgs.owner}" class="${event.namedArgs.owner == transaction.from ? 'is-from' : ''}">${getDisplayAddress(event.namedArgs.owner)}</a> 
            <span class="f7-icons">arrow_right</span>
            <a href="${baseURI}u/?address=${event.namedArgs.operator}" class="${event.namedArgs?.operator == transaction.from ? 'is-from' : ''}">${getDisplayAddress(event.namedArgs.operator)}</a>
          </td>

        </tr>
    `;
};
const getDisplayAddress = address => {
  let walletService = globalThis.container.get("WalletService");
  if (transactionsViewModel?.ens && transactionsViewModel.ens[address]) return transactionsViewModel.ens[address];
  return walletService.truncateEthAddress(address);
};
let transactionsViewModel;
let handlerBody;
let handler = async e => {
  return handlerBody(e);
};
function framework7Component(props, {
  $,
  $on,
  $f7,
  $update
}) {
  let walletService = globalThis.container.get("WalletService");
  let baseURI = globalThis.container.get("baseURI")();
  let moment = globalThis.moment;
  transactionsViewModel = props.transactions;
  let rowItemViewModels = props.items;
  let tokenId = props.token;
  handlerBody = async e => {
    transactionsViewModel = e.transactionsViewModel;
    await $update();
  };

  // handle event
  document.removeEventListener('transactions-updated', handler);
  document.addEventListener('transactions-updated', handler);
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
  
  <div class="card data-table">

    <div class="card-content">
      <table>
        <thead>
          <tr>
            <th class="label-cell medium-only" colspan="2">Item</th>
            <th>Event</th>
            <th class="numeric-cell">Price</th>
            <th class="numeric-cell medium-only">From/To</th>
          </tr>
        </thead>
        <tbody>
          ${transactionsViewModel?.transactions.map( (transaction, index) => $h`
  
            ${transaction.events?.map(processedEvent => $h`
  
              ${processedEvent.event == "Approval" && (!tokenId || processedEvent?.tokenId == tokenId) ? $h`
                <${Approval} transaction=${transaction.transaction} event=${processedEvent} base_uri=${baseURI} row_item_view_models=${rowItemViewModels} index="${index}" />
              ` : $h` `}
          
              ${processedEvent.event == "Transfer" && (!tokenId || processedEvent?.tokenId == tokenId) ? $h`
                <${Transfer} transaction=${transaction.transaction} event=${processedEvent} base_uri=${baseURI} row_item_view_models=${rowItemViewModels} index="${index}"/>
              ` : $h` `}
          
              ${processedEvent.event == "ApprovalForAll" && (!tokenId || processedEvent?.tokenId == tokenId) ? $h`
                <${ApprovalForAll} transaction=${transaction.transaction} event=${processedEvent} base_uri=${baseURI} index="${index}"/>
              ` : $h` `}
          
            `)}
  
  
          `)}
        </tbody>
      </table>
    </div>

  </div>

`
    }
    ;
}
framework7Component.id = 'c4200ed732';
framework7Component.style = `

`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/reader/components/reader/item/infinite-scroll-content.f7.html":
/*!***************************************************************************!*\
  !*** ./src/reader/components/reader/item/infinite-scroll-content.f7.html ***!
  \***************************************************************************/
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
  let baseURL = props.baseurl;
  let items = props.items;
  const link = href => {
    return `${baseURL + href}`;
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

    <div class="row" id="item-list">
                            
        ${items?.length > 0 ? $h`
                                    
            ${items.map(itemViewModel => $h`
                <div class="card col-100 large-25">
                    <div class="card-content">
                        <div class="card-content card-content-padding">
                            <div class="square">
                                <a href="${link(`token-${itemViewModel.item.tokenId}.html`)}">
                                    <img src="${link(`backup/export/images/${itemViewModel.coverImage._id}`)}.${itemViewModel.coverImage.generated ? 'svg' : 'jpg'}" />
                                </a>
                            </div>

                            <div class="preview-info">
                                <a href="">${itemViewModel.item.title ? itemViewModel.item.title + ' ' : ''} #${itemViewModel.item.tokenId}</a>
                            </div>
                        </div>
                    </div>
                </div>
            `)}


        ` : $h`<span />`}             
                                            
    </div>  
  
`
    }
    ;
}
framework7Component.id = '56ff185f86';
framework7Component.style = `
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/reader/components/reader/item/mint-list.f7.html":
/*!*************************************************************!*\
  !*** ./src/reader/components/reader/item/mint-list.f7.html ***!
  \*************************************************************/
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
  let mintWebService = globalThis.container.get("MintWebService");
  let walletService = globalThis.container.get("WalletService");
  let queueService = globalThis.container.get("QueueService");
  let baseURI = globalThis.container.get("baseURI")();
  let mintingViewModel;
  let total = 0;
  let quantity = 1;
  let mintPriceWei;
  let exactTokensOnly = false;
  let baseURL = props.baseurl;
  const link = href => {
    return `${baseURL + href}`;
  };
  const updateTotal = async () => {
    total = await mintWebService.updateTotal(mintPriceWei, quantity);
    await $update();
  };
  $on('stepper:change', async e => {
    quantity = parseInt(e.detail);
    await updateTotal();
    selectPreviews(quantity);
  });
  const selectPreviews = amount => {
    let selected = 0;
    $('.flex-card').each(ele => {
      //Remove selected from all
      $(ele).removeClass('selected');
      if (selected < amount) {
        $(ele).addClass('selected');
        selected++;
        // console.log(ele)
      }
    });
  };

  const mintOnSubmit = async e => {
    e.preventDefault();

    //Make sure we are connected
    await walletService.connect();
    let mintFunction;
    if (exactTokensOnly) {
      let start = parseInt(mintingViewModel.totalMinted + 1);
      mintFunction = mintWebService.mintFromStartOrFail(quantity, start);
    } else {
      mintFunction = mintWebService.mint(quantity);
    }
    let promiseView = {
      title: `Minting token(s). Approve transaction and wait for it to be mined.`,
      promise: mintFunction
    };

    //Wait for it to be mined
    await queueService.queuePromiseView(promiseView);
  };
  const exactTokensOnChange = async e => {
    exactTokensOnly = e.currentTarget.checked;
    await $update();
  };
  $f7.preloader.show();
  const populate = async () => {
    await walletService.connect();
    try {
      mintingViewModel = await mintWebService.getMintingViewModel();
      mintPriceWei = await mintWebService.parseUnits(mintingViewModel.mintPrice, 'ether');
      await updateTotal();
      let e = new CustomEvent('mint-view-model-loaded');
      e.mintingViewModel = mintingViewModel;
      document.dispatchEvent(e);
      $f7.preloader.hide();
    } catch (ex) {
      $f7.dialog.confirm("Problem connecting to contract on Ethereum Mainnet. Is your wallet connected to the right network?", "Problem connecting to network", populate, () => {
        $f7.views.main.router.navigate(baseURI);
      });
      $f7.preloader.hide();
    }
  };
  populate();
  let mintEventHandler = async e => {
    if (e.tokenId > mintingViewModel?.totalMinted) {
      mintingViewModel = await mintWebService.getMintingViewModel();
      await $update();
      let e = new CustomEvent('mint-view-model-refreshed');
      e.mintingViewModel = mintingViewModel;
      e.quantity = quantity;
      document.dispatchEvent(e);
    }
  };
  document.removeEventListener('mint-event', mintEventHandler);
  document.addEventListener('mint-event', mintEventHandler);
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
    
    ${mintingViewModel ? $h`

      ${mintingViewModel.minting ? $h`

          <div class="card">
            <div class="card-header card-header-divider">Create a digital collectible!</div>
            <div class="card-content card-content-padding">

              <div class="list simple-list inset mint-list-info">
                <ul>
                  <li>NFTs are minted in sequential order.</li>
                  <li>Limited supply!</li>
                </ul>
              </div>

            </div>
          </div>

          <div class="block block-strong inset">
            <p>
              <strong>Total Minted:</strong> ${mintingViewModel.totalMinted} of ${mintingViewModel.totalSupply}
            </p>              
          </div>

          
          <div class="card">
            <div class="card-header card-header-divider">Select between 1-10 NFTs and click the mint button.</div>
            <div class="card-content card-content-padding">
              <form class="list no-hairlines inset" @submit="${mintOnSubmit}">
                <ul>
    
                  <li class="item-content item-input">
                    <div class="item-inner">
                      <div class="item-title item-label">Select number of NFTs to mint.</div>
                      <div class="item-input-wrap">
    
                        <div class="stepper">
                          <!-- Stepper minus/decrement button -->
                          <div class="stepper-button-minus"></div>
                          <!-- Stepper input -->
                          <div class="stepper-input-wrap">
                            <!-- recommended to make input not editable (readonly) -->
                            <input type="text" readonly value="1" />
                          </div>
                          <!-- Stepper plus/increment button -->
                          <div class="stepper-button-plus"></div>
                        </div>
                        <!-- <div class="range-slider range-slider-init" data-label="true" data-scale="true" data-scale-steps="5" >
                          <input type="range" value="1" min="0" max="10" step="1" />
                        </div> -->
                      </div>
                    </div>
                  </li>
    
                  <li>
                    <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title mint-detail">
                              <p>
                                <strong>Mint Fee:</strong> ${mintingViewModel.mintPrice} ETH
                              </p>
                              <p>
                                <strong>Quantity:</strong> ${quantity} 
                              </p>
                              <p>
                                <strong>Total:</strong> ${total} ETH
                              </p>
                            </div>
                        </div>
                    </div>
                  </li>
    
                  <li style="display:none;">
                    <label class="item-checkbox item-content">
    
                        <input type="checkbox" checked="${exactTokensOnly}" @change=${exactTokensOnChange}/>
                        
                        <i class="icon icon-checkbox"></i>
                        <div class="item-inner">
    
                            <div class="item-title">
                              <!-- Item header, must be first child of item-title -->
                              <div class="item-header"></div>
                              Exact Tokens Only
                              <!-- Item footer, must be last child of item-title -->
                              <div class="item-footer">If this box is checked the transaction will immediately fail if another transaction mints *any* of the selected tokens.</div>
                            </div>
    
                        </div>
                    </label>
                  </li>
    
                  <li>
                    <div class="item-content">
                        <div class="item-inner">
                          <button class="button button-fill ${quantity < 1 ? 'disabled': ''}" id="mint-button">Mint</button>
                        </div>
                    </div>
                  </li>
                  
                </ul>
    
              </form>
            </div>
          </div>





          <div class="card mint-list-card"  style="display:none">
            <div class="card-header">Next Up</div>
            <div class="card-content">

              <div class="list cards-list virtual-list" id="mint-list">
                <ul class="item-flex"></ul>
              </div>
        
              <div class="preloader infinite-scroll-preloader"></div>

            </div>
          </div>
          
      ` : $h`
        <div class="card">
          <div class="card-header">Minting Complete</div>
          <div class="card-content card-content-padding">
            Minting is complete. Thank you!
          </div>
        </div>
      
      `}
    
    ` : $h`
      <li class="card skeleton-text skeleton-effect-wave">
        <div class="card-header">Loading Loading Loading</div>
        <div class="card-content card-content-padding">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac
            interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis.
            Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi
            aliquet urna, nec imperdiet felis sapien at enim.</div>
      </li>
    `}
    
  </div>



`
    }
    ;
}
framework7Component.id = '508a9fda42';
framework7Component.style = `



.mint-list-card .card-header {
  font-size: 27px;
  font-weight: bold;
}

.mint-list-card .block {
  margin-top: 10px;
  margin-bottom: 10px;
}

.mint-list-info li {
  white-space: unset;
  line-height: unset;
  height: unset;
  padding-top: 10px;
  padding-bottom: 10px;
}

`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/reader/components/reader/item/search-list.f7.html":
/*!***************************************************************!*\
  !*** ./src/reader/components/reader/item/search-list.f7.html ***!
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
  let itemWebService = globalThis.container.get("ItemWebService");
  let baseURI = globalThis.container.get("baseURI")();
  const link = href => {
    return baseURI + href;
  };
  let results;
  let searching = false;
  const searchbarSubmit = async e => {
    e.preventDefault();
    $('.searchbar input').blur();
    $f7.preloader.showIn('.cards-list');
    searching = true;
    $update();
    results = await itemWebService.query($('.searchbar input').val());
    searching = false;
    $update();
    $f7.preloader.hideIn('.cards-list');
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

  <div class="margin-top">



    <div class="block block-strong block-search">

      <form class="searchbar" @submit="${searchbarSubmit}">
        <div class="searchbar-inner">
          <div class="searchbar-input-wrap">
            <input type="search" placeholder="Enter a search term" />
            <i class="searchbar-icon"></i>
            <span class="input-clear-button"></span>
          </div>
          <span class="searchbar-disable-button">Cancel</span>
        </div>
      </form>

      Note: All searches are local. The first search will take longer because it has to build a local search index.
    </div>


    <div class="list cards-list">
  
      <ul>

        ${results ? $h`
          
          ${ results?.length > 0 ? $h`
          
            ${results?.map( (itemViewModel) => $h`
              <li class="card item-card">
                <div class="card-content card-content-padding">
                  ${itemViewModel.item.excerpt ? $h`
                  
                    <div class="item-preview">
    
                      <div class="left">
                        
                          <a class="title" href="${link(`token-${itemViewModel.item.tokenId}.html`)}">
                              ${itemViewModel.item.title}
                              <span class="channel-show-token-id">#${itemViewModel.item.tokenId}</span>
                          </a>
    
                          <p innerHTML="${itemViewModel.item.excerpt}">
                              
                          </p>
    
                      </div>
    
                      ${itemViewModel.coverImage ? $h`
                        <div class="right">
                          <a class="title" href="${link(`token-${itemViewModel.item.tokenId}.html`)}">
                            <img src="backup/export/images/${itemViewModel.coverImage._id}.${itemViewModel.coverImage.generated ? 'svg' : 'jpg'}" />
                          </a>
                        </div>
                      ` : $h`<span />`}
    
                    </div>
    
    
                  ` : $h`
                  
                    <div class="item-preview">
                      <div class="left">
    
                          <a class="title" href="${link(`t/${itemViewModel.item.tokenId}`)}">
                            ${itemViewModel.item.title} <span class="channel-show-token-id">#${itemViewModel.item.tokenId}</span>
                          </a>
    
                          <div class="content" innerHTML="${itemViewModel.item.contentHTML}"></div>
    
                      </div>
                    </div>
                  
                  `}
    
                </div>
              </li>                        
            `)}
    
          ` : $h`
              <li class="card item-card">
                <div class="card-content card-content-padding">
                  No results found
                </div>
              </li>
          `}
          
          
        ` :$h`<span />`}
  

  
      </ul>
  
    </div>

  </div>

`
    }
    ;
}
framework7Component.id = '34200fa41d';
framework7Component.style = `

.block-search {
  background: #f1f1f1;
  font-size: 14px;
}

`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/reader/components/reader/navbar.f7.html":
/*!*****************************************************!*\
  !*** ./src/reader/components/reader/navbar.f7.html ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** @jsx $jsx */

function framework7Component(props, {
  $on,
  $f7,
  $update
}) {
  let walletService = globalThis.container.get("WalletService");
  let uiService = globalThis.container.get("UiService");
  let baseURI = globalThis.container.get("baseURI");
  let hostname = globalThis.container.get("hostname");
  let symbol = props.symbol;
  let logo = props.logo;
  let title = props.title;
  let active = props.active;
  let libraryURL = props.library_url;
  let largeURL = props.large_url;
  let showMintPage = props.show_mint_page == "true";
  let showActivityPage = props.show_activity_page == "true";
  let hideMenu = props.hide_menu == "true";
  let breadcrumbs = props.breadcrumbs;
  let walletAddress;
  let showConnect = true;
  const getForkLink = () => {
    if (largeURL?.length > 0) {
      return `${largeURL}/index.html#!/admin/channel/fork-reader?path=${encodeURIComponent(`${hostname()}${baseURI()}`)}`;
    } else {
      return `${baseURI()}large/index.html#!/admin/channel/fork-reader?path=${encodeURIComponent(`${hostname()}${baseURI()}`)}`;
    }
  };
  const truncateEthAddress = address => {
    return walletService.truncateEthAddress(address);
  };
  const displayAddress = async e => {
    walletAddress = undefined;
    if (!walletService.provider) {
      await walletService.initProvider();
    }
    walletAddress = await walletService.getAddress();

    //If no provider still then clear the address so we don't show the button
    if (!walletService.provider) {
      showConnect = false;
    }
    if (walletAddress) {
      walletService.address = walletAddress;
      if (!walletService.wallet) {
        await walletService.connect();
      }
    }
    $update();
  };
  const connectWallet = async e => {
    await walletService.initWallet();

    //Connect to metamask
    await walletService.connect();
    displayAddress();
  };
  displayAddress();
  const showPopoverMenu = async e => {};
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
                
          <div class="left">
            <a href="${libraryURL?.length > 0 ? libraryURL : baseURI() }">
              <i class="f7-icons">house</i>
            </a>
          </div>


          <div class="title">${title}</div>
          
          <div class="right">
            
            ${!hideMenu ? $h`
              
              <div class="small-only">

                <a href="#" class="link popover-open" data-popover=".popover-menu">
                  <i class="f7-icons">menu</i>
                </a> 
  
                <div class="popover popover-menu">
                  <div class="popover-angle"></div>
                  <div class="popover-inner">                    
                    <div class="list">
                      <ul>
  
                        ${showConnect ? $h`
          
                            <li>
                              <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title">
                                        ${walletAddress != undefined ? $h`
                                          <a href="#" class="button button-fill">${truncateEthAddress(walletAddress)}</a>
                                      ` : $h`
                                          <button class="button button-outline button-fill" @click=${connectWallet}>
                                            Connect Wallet
                                          </button>
                                      `} 
                                    </div>
                                </div>
                              </div>
                            </li>
  
                            ${showMintPage ? $h`
                              <li>
                                <a href="${baseURI()}mint.html" class="item-link popover-close">
                                  <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">
                                            Mint
                                        </div>
                                    </div>
                                  </div>
                                </a>
                              </li>
                            ` : $h`<span />`}
  
                                
                          ` : $h`<span />`}
  
  
  
  
                        <li>
                          <a href="${getForkLink()}" class="item-link external popover-close">
                            <div class="item-content">
                              <div class="item-inner">
                                  <div class="item-title">
                                    Fork
                                  </div>
                              </div>
                            </div>
                          </a>
                        </li>
    
  
  
  
                        <li>
                          <a href="${baseURI()}explore.html" class="item-link popover-close">
                            <div class="item-content">
                              <div class="item-inner">
                                  <div class="item-title">
                                      Explore
                                  </div>
                              </div>
                            </div>
                          </a>
                        </li>
  
  
                        ${showActivityPage ? $h`
                          <li>
                            <a href="${baseURI()}activity" class="item-link popover-close">
                              <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title">
                                        Activity
                                    </div>
                                </div>
                              </div>
                            </a>
                          </li>
  
                          <li>
                            <a href="${baseURI()}leaderboard" class="item-link popover-close">
                              <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title">
                                        Leaderboard
                                    </div>
                                </div>
                              </div>
                            </a>
                          </li>
  
  
                        ` : $h`<span />`}
  
                      </ul>
                
                    </div>
        
                  </div>
                </div>
  
              </div>
  
              <div class="large-only">
    
                <a href="${getForkLink()}" class="external link">
                  Fork
                </a>
  
                <a class="link ${active == 'Explore' ? $h`link-active` : $h` `}" href="${baseURI()}explore.html">
                  Explore
                </a>      
  
                ${showActivityPage ? $h`
                  <a class="link ${active == 'Activity' ? $h`link-active` : $h` `}" href="${baseURI()}activity">
                    Activity
                  </a> 
  
                  <a class="link ${active == 'Leaderboard' ? $h`link-active` : $h` `}" href="${baseURI()}leaderboard" >
                    Leaderboard
                  </a> 
  
                ` : $h`<span />`}
  
                ${showConnect ? $h`
  
                  ${showMintPage ? $h`
                    <a class="link ${active == 'Mint' ? $h`link-active` : $h` `}" href="${baseURI()}mint.html" >
                      Mint
                    </a> 
                  ` : $h`<span />`}
  
                  ${walletAddress != undefined ? $h`
                      <a href="${baseURI()}u/?address=${walletAddress}" class="link" >${truncateEthAddress(walletAddress)}</a>
                  ` : $h`
                      <a class="link" @click="${connectWallet}">Connect Wallet</a>
                  `} 
       
                ` : $h`<span style="display: none;" />`}
  
              </div>
              
            ` : $h` `}
            
          </div>



          ${breadcrumbs ? $h`
                  
            <div class="subnavbar">
              <div class="subnavbar-inner">
        
                <div class="breadcrumbs ">
  
                  ${breadcrumbs.map( b => $h`
                    <div class="breadcrumbs-item">

                      ${b.path ? $h`
                        <a href="${b.path}" class="link">
                          ${b.text}
                        </a>
                      ` : $h`${b.text}`}


                    </div>  

                    ${b.path ? $h`
                      <div class="breadcrumbs-separator"></div>
                    ` : $h`<span />`}

                    
                  `)}

                </div>
        
              </div>
            </div>


            ` : $h`<span />`}



          
        </div>
        
    </div>

`
    }
    ;
}
framework7Component.id = 'bb94f9bccd';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/reader/components/reader/token-toolbar.f7.html":
/*!************************************************************!*\
  !*** ./src/reader/components/reader/token-toolbar.f7.html ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** @jsx $jsx */

function framework7Component(props, {
  $on,
  $,
  $f7,
  $update
}) {
  let baseURI = globalThis.container.get("baseURI");
  let readerSettingsService = globalThis.container.get("ReaderSettingsService");
  let tokenId = props.token_id;
  let itemCount = props.item_count;
  let currentPage = props.current_page;
  const link = href => {
    return baseURI() + href;
  };
  const rangeSliderChange = async e => {
    e.preventDefault();
    let tokenId = $(e.currentTarget).val();
    $f7.preloader.show();
    if (tokenId > 0) {
      await readerSettingsService.updateCurrentPage(parseInt(tokenId));
      $f7.views.main.router.navigate(link('t/' + tokenId), {
        transition: 'f7-flip'
      });
    } else {
      $f7.views.main.router.navigate(link(`index.html`));
    }
    $f7.preloader.hide();
  };
  const rangeChange = e => {
    e.preventDefault();
    const range = $f7.range.get(e.target);
    tokenId = range.value;
    $update();
  };
  app.on('current-page-updated', function (p) {
    currentPage = p;
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

  <div class="toolbar toolbar-bottom">
    <div class="toolbar-inner">

        <div style="width: 100%; margin-bottom: -20px;">

            <div style="display: flex;">
            
                ${currentPage && tokenId == 0 ? $h`
                    <a href="${link(`t/${currentPage}`)}" class="button button-outline back-to-page">
                        Back to page ${currentPage}
                    </a>
                ` : $h`<span />`}
    
    
                <div class="range-slider range-slider-init" 
                    @range:change=${rangeChange}
                    data-label="true"
                    >
                
                    <!-- range input -->
                    <input type="range" 
                        min="0" 
                        max="${itemCount}"
                        step="1" 
                        value="${tokenId}" 
                        @change="${rangeSliderChange}"
                />
                </div>


            </div>

            <div class="page-number" style="width: 100%;">
                Page <strong>${tokenId}</strong> of ${itemCount}
            </div>


        </div>





    </div>
  </div>

`
    }
    ;
}
framework7Component.id = '0a6bab5ddb';
framework7Component.style = `
.page-number {
    width: 100%;
    text-align: center;
    font-size: 13px;
    margin-bottom: 15px;
}

.range-slider {
    width: 100%;
    margin-left: 20px; 
    margin-right: 20px;
    flex: 1;
}

.toolbar a.back-to-page {
    height: 45px;
    width: 70px;
    margin-left: 10px;
    flex: 0 0 70px;
    font-size: 10px;
    text-transform: none;
    white-space: normal;
    line-height: 13px;
}
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/reader/components/reader/transaction.f7.html":
/*!**********************************************************!*\
  !*** ./src/reader/components/reader/transaction.f7.html ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/** @jsx $jsx */

function framework7Component(props, {
  $on,
  $f7,
  $update
}) {
  // let walletService = globalThis.container.get("WalletService")

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




`
    }
    ;
}
framework7Component.id = '12c0cf1bed';
framework7Component.style = `




`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (framework7Component);

/***/ }),

/***/ "./src/reader/html/css/app.css":
/*!*************************************!*\
  !*** ./src/reader/html/css/app.css ***!
  \*************************************/
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/reader/dto/animation.ts":
/*!*************************************!*\
  !*** ./src/reader/dto/animation.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Animation: () => (/* binding */ Animation)
/* harmony export */ });
class Animation {
    _id;
    _rev;
    content;
    cid;
    dateCreated;
}



/***/ }),

/***/ "./src/reader/dto/attribute-total.ts":
/*!*******************************************!*\
  !*** ./src/reader/dto/attribute-total.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttributeTotal: () => (/* binding */ AttributeTotal)
/* harmony export */ });
class AttributeTotal {
    _id;
    traitType;
    value;
    count;
    categoryPercent;
    tokenIds;
}



/***/ }),

/***/ "./src/reader/dto/author.ts":
/*!**********************************!*\
  !*** ./src/reader/dto/author.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Author: () => (/* binding */ Author)
/* harmony export */ });
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



/***/ }),

/***/ "./src/reader/dto/component-state.ts":
/*!*******************************************!*\
  !*** ./src/reader/dto/component-state.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentState: () => (/* binding */ ComponentState)
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

class ComponentState {
    _id;
    _rev;
    data;
    dateCreated;
    lastUpdated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], ComponentState.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], ComponentState.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Object)
], ComponentState.prototype, "data", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], ComponentState.prototype, "dateCreated", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], ComponentState.prototype, "lastUpdated", void 0);



/***/ }),

/***/ "./src/reader/dto/image.ts":
/*!*********************************!*\
  !*** ./src/reader/dto/image.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Image: () => (/* binding */ Image)
/* harmony export */ });
class Image {
    _id;
    data;
    cid;
    buffer;
    svg;
    generated;
}



/***/ }),

/***/ "./src/reader/dto/item.ts":
/*!********************************!*\
  !*** ./src/reader/dto/item.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Item: () => (/* binding */ Item)
/* harmony export */ });
class Item {
    _id;
    _rev;
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
    coverImageAsAnimation;
    originalJSONMetadataId;
    animationId;
    datePublished;
    dateCreated;
    lastUpdated;
}



/***/ }),

/***/ "./src/reader/dto/nft-metadata.ts":
/*!****************************************!*\
  !*** ./src/reader/dto/nft-metadata.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NFTMetadata: () => (/* binding */ NFTMetadata)
/* harmony export */ });
class NFTMetadata {
    tokenId;
    name;
    description;
    image;
    image_data;
    external_url;
    attributes;
    background_color;
    animation_url;
}



/***/ }),

/***/ "./src/reader/dto/reader-settings.ts":
/*!*******************************************!*\
  !*** ./src/reader/dto/reader-settings.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReaderSettings: () => (/* binding */ ReaderSettings)
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

class ReaderSettings {
    _id;
    _rev;
    currentPage;
    lastPageJump;
    dateCreated;
    lastUpdated;
}
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], ReaderSettings.prototype, "_id", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], ReaderSettings.prototype, "_rev", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Number)
], ReaderSettings.prototype, "currentPage", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", Number)
], ReaderSettings.prototype, "lastPageJump", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], ReaderSettings.prototype, "dateCreated", void 0);
__decorate([
    (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.Allow)(),
    __metadata("design:type", String)
], ReaderSettings.prototype, "lastUpdated", void 0);



/***/ }),

/***/ "./src/reader/dto/static-page.ts":
/*!***************************************!*\
  !*** ./src/reader/dto/static-page.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StaticPage: () => (/* binding */ StaticPage)
/* harmony export */ });
class StaticPage {
    _id;
    _rev;
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



/***/ }),

/***/ "./src/reader/dto/token-owner.ts":
/*!***************************************!*\
  !*** ./src/reader/dto/token-owner.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenOwner: () => (/* binding */ TokenOwner)
/* harmony export */ });
class TokenOwner {
}



/***/ }),

/***/ "./src/reader/dto/token.ts":
/*!*********************************!*\
  !*** ./src/reader/dto/token.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Token: () => (/* binding */ Token)
/* harmony export */ });
class Token {
}



/***/ }),

/***/ "./src/reader/index.ts":
/*!*****************************!*\
  !*** ./src/reader/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initReader: () => (/* binding */ initReader)
/* harmony export */ });
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var workbox_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-window */ "./node_modules/workbox-window/build/workbox-window.prod.es5.mjs");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/container/container.js");
/* harmony import */ var _inversify_config_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./inversify.config.js */ "./src/reader/inversify.config.ts");
/* harmony import */ var _service_core_routing_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./service/core/routing-service.js */ "./src/reader/service/core/routing-service.ts");






let initReader = async (baseURI, hostname, version, channelId) => {
    console.log("Initializing Reader");
    if ('serviceWorker' in navigator) {
        const wb = new workbox_window__WEBPACK_IMPORTED_MODULE_2__.Workbox(`${hostname}${baseURI}sw-${version}.js?baseURI=${baseURI}`, {
            scope: `${hostname}${baseURI}`
        });
        let container = new inversify__WEBPACK_IMPORTED_MODULE_3__.Container();
        let routes = _service_core_routing_service_js__WEBPACK_IMPORTED_MODULE_4__.RoutingService.getReaderRoutes(baseURI);
        container = await (0,_inversify_config_js__WEBPACK_IMPORTED_MODULE_5__.getMainContainer)(container, baseURI, hostname, version, routes, channelId);
        if (navigator.serviceWorker.controller) {
            startApp(container, hostname);
        }
        else {
            wb.addEventListener('controlling', e => {
                startApp(container, hostname);
            });
        }
        wb.register();
    }
};
let startApp = async (container, hostname) => {
    let app = container.get("framework7");
    //Create the main view
    //Get URL
    let internalUrl = window.location.toString().replace(`${hostname}`, '');
    const mainView = app.views.create('.view-main', {
        url: internalUrl
    });
    mainView.on("init", async (view) => {
        console.log(`Navigating to ${internalUrl}`);
        //When the view loads lets reload the initial page so that we fire the component logic. 
        view.router.navigate(internalUrl, { reloadCurrent: true, animate: false });
    });
    app.init();
};



/***/ }),

/***/ "./src/reader/inversify.config.ts":
/*!****************************************!*\
  !*** ./src/reader/inversify.config.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMainContainer: () => (/* binding */ getMainContainer)
/* harmony export */ });
/* unused harmony export container */
/* harmony import */ var framework7__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! framework7 */ "./node_modules/framework7/framework7.esm.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/providers/provider-browser.js");
/* harmony import */ var pouchdb_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pouchdb-browser */ "./node_modules/pouchdb-browser/lib/index.es.js");
/* harmony import */ var pouchdb_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pouchdb-find */ "./node_modules/pouchdb-find/lib/index-browser.es.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dayjs_plugin_relativeTime_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dayjs/plugin/relativeTime.js */ "./node_modules/dayjs/plugin/relativeTime.js");
/* harmony import */ var dayjs_plugin_relativeTime_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_relativeTime_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var dayjs_plugin_localizedFormat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dayjs/plugin/localizedFormat.js */ "./node_modules/dayjs/plugin/localizedFormat.js");
/* harmony import */ var dayjs_plugin_localizedFormat_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_localizedFormat_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var framework7_css_bundle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! framework7/css/bundle */ "./node_modules/framework7/framework7-bundle.css");
/* harmony import */ var framework7_icons_css_framework7_icons_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! framework7-icons/css/framework7-icons.css */ "./node_modules/framework7-icons/css/framework7-icons.css");
/* harmony import */ var _html_css_app_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./html/css/app.css */ "./src/reader/html/css/app.css");
/* harmony import */ var framework7_components_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! framework7/components/dialog */ "./node_modules/framework7/components/dialog/dialog.js");
/* harmony import */ var framework7_components_toast__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! framework7/components/toast */ "./node_modules/framework7/components/toast/toast.js");
/* harmony import */ var framework7_components_preloader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! framework7/components/preloader */ "./node_modules/framework7/components/preloader/preloader.js");
/* harmony import */ var framework7_components_virtual_list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! framework7/components/virtual-list */ "./node_modules/framework7/components/virtual-list/virtual-list.js");
/* harmony import */ var framework7_components_list_index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! framework7/components/list-index */ "./node_modules/framework7/components/list-index/list-index.js");
/* harmony import */ var framework7_components_range__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! framework7/components/range */ "./node_modules/framework7/components/range/range.js");
/* harmony import */ var framework7_components_accordion__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! framework7/components/accordion */ "./node_modules/framework7/components/accordion/accordion.js");
/* harmony import */ var framework7_components_infinite_scroll__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! framework7/components/infinite-scroll */ "./node_modules/framework7/components/infinite-scroll/infinite-scroll.js");
/* harmony import */ var framework7_components_card__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! framework7/components/card */ "./node_modules/framework7/components/card/card.js");
/* harmony import */ var framework7_components_chip__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! framework7/components/chip */ "./node_modules/framework7/components/chip/chip.js");
/* harmony import */ var framework7_components_form__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! framework7/components/form */ "./node_modules/framework7/components/form/form.js");
/* harmony import */ var framework7_components_grid__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! framework7/components/grid */ "./node_modules/framework7/components/grid/grid.js");
/* harmony import */ var framework7_components_popup__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! framework7/components/popup */ "./node_modules/framework7/components/popup/popup.js");
/* harmony import */ var framework7_components_popover__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! framework7/components/popover */ "./node_modules/framework7/components/popover/popover.js");
/* harmony import */ var framework7_components_stepper__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! framework7/components/stepper */ "./node_modules/framework7/components/stepper/stepper.js");
/* harmony import */ var _components_reader_navbar_f7_html__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/reader/navbar.f7.html */ "./src/reader/components/reader/navbar.f7.html");
/* harmony import */ var _components_reader_token_toolbar_f7_html__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/reader/token-toolbar.f7.html */ "./src/reader/components/reader/token-toolbar.f7.html");
/* harmony import */ var _components_reader_transaction_f7_html__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/reader/transaction.f7.html */ "./src/reader/components/reader/transaction.f7.html");
/* harmony import */ var _components_reader_item_mint_list_f7_html__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/reader/item/mint-list.f7.html */ "./src/reader/components/reader/item/mint-list.f7.html");
/* harmony import */ var _components_reader_channel_attribute_filter_f7_html__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/reader/channel/attribute-filter.f7.html */ "./src/reader/components/reader/channel/attribute-filter.f7.html");
/* harmony import */ var _components_reader_channel_explore_total_info_f7_html__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/reader/channel/explore-total-info.f7.html */ "./src/reader/components/reader/channel/explore-total-info.f7.html");
/* harmony import */ var _components_reader_channel_mint_info_f7_html__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/reader/channel/mint-info.f7.html */ "./src/reader/components/reader/channel/mint-info.f7.html");
/* harmony import */ var _components_reader_channel_largest_sales_f7_html__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/reader/channel/largest-sales.f7.html */ "./src/reader/components/reader/channel/largest-sales.f7.html");
/* harmony import */ var _components_reader_channel_transaction_row_f7_html__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/reader/channel/transaction-row.f7.html */ "./src/reader/components/reader/channel/transaction-row.f7.html");
/* harmony import */ var _components_reader_channel_leaderboard_rows_f7_html__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/reader/channel/leaderboard-rows.f7.html */ "./src/reader/components/reader/channel/leaderboard-rows.f7.html");
/* harmony import */ var _components_reader_item_search_list_f7_html__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./components/reader/item/search-list.f7.html */ "./src/reader/components/reader/item/search-list.f7.html");
/* harmony import */ var _components_reader_item_infinite_scroll_content_f7_html__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./components/reader/item/infinite-scroll-content.f7.html */ "./src/reader/components/reader/item/infinite-scroll-content.f7.html");
/* harmony import */ var _service_core_wallet_service_impl_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./service/core/wallet-service-impl.js */ "./src/reader/service/core/wallet-service-impl.ts");
/* harmony import */ var _repository_browser_channel_repository_impl_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./repository/browser/channel-repository-impl.js */ "./src/reader/repository/browser/channel-repository-impl.ts");
/* harmony import */ var _repository_browser_item_repository_impl_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./repository/browser/item-repository-impl.js */ "./src/reader/repository/browser/item-repository-impl.ts");
/* harmony import */ var _repository_browser_author_repository_impl_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./repository/browser/author-repository-impl.js */ "./src/reader/repository/browser/author-repository-impl.ts");
/* harmony import */ var _repository_browser_metadata_repository_impl_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./repository/browser/metadata-repository-impl.js */ "./src/reader/repository/browser/metadata-repository-impl.ts");
/* harmony import */ var _repository_browser_image_repository_impl_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./repository/browser/image-repository-impl.js */ "./src/reader/repository/browser/image-repository-impl.ts");
/* harmony import */ var _repository_browser_animation_repository_impl_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./repository/browser/animation-repository-impl.js */ "./src/reader/repository/browser/animation-repository-impl.ts");
/* harmony import */ var _repository_browser_static_page_repository_impl_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./repository/browser/static-page-repository-impl.js */ "./src/reader/repository/browser/static-page-repository-impl.ts");
/* harmony import */ var _repository_browser_item_page_repository_impl_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./repository/browser/item-page-repository-impl.js */ "./src/reader/repository/browser/item-page-repository-impl.ts");
/* harmony import */ var _repository_browser_attribute_total_repository_impl_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./repository/browser/attribute-total-repository-impl.js */ "./src/reader/repository/browser/attribute-total-repository-impl.ts");
/* harmony import */ var _repository_browser_reader_settings_repository_impl_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./repository/browser/reader-settings-repository-impl.js */ "./src/reader/repository/browser/reader-settings-repository-impl.ts");
/* harmony import */ var _repository_browser_token_repository_impl_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./repository/browser/token-repository-impl.js */ "./src/reader/repository/browser/token-repository-impl.ts");
/* harmony import */ var _service_web_channel_web_service_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./service/web/channel-web-service.js */ "./src/reader/service/web/channel-web-service.ts");
/* harmony import */ var _service_web_item_web_service_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./service/web/item-web-service.js */ "./src/reader/service/web/item-web-service.ts");
/* harmony import */ var _service_web_author_web_service_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./service/web/author-web-service.js */ "./src/reader/service/web/author-web-service.ts");
/* harmony import */ var _service_web_mint_web_service_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./service/web/mint-web-service.js */ "./src/reader/service/web/mint-web-service.ts");
/* harmony import */ var _service_static_page_service_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./service/static-page-service.js */ "./src/reader/service/static-page-service.ts");
/* harmony import */ var _service_item_page_service_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./service/item-page-service.js */ "./src/reader/service/item-page-service.ts");
/* harmony import */ var _service_core_queue_service_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./service/core/queue-service.js */ "./src/reader/service/core/queue-service.ts");
/* harmony import */ var _service_core_paging_service_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./service/core/paging-service.js */ "./src/reader/service/core/paging-service.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./service/core/database-service.js */ "./src/reader/service/core/database-service.ts");
/* harmony import */ var _service_animation_service_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./service/animation-service.js */ "./src/reader/service/animation-service.ts");
/* harmony import */ var _service_core_ui_service_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./service/core/ui-service.js */ "./src/reader/service/core/ui-service.ts");
/* harmony import */ var _service_item_service_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./service/item-service.js */ "./src/reader/service/item-service.ts");
/* harmony import */ var _service_image_service_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./service/image-service.js */ "./src/reader/service/image-service.ts");
/* harmony import */ var _service_channel_service_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./service/channel-service.js */ "./src/reader/service/channel-service.ts");
/* harmony import */ var _service_author_service_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./service/author-service.js */ "./src/reader/service/author-service.ts");
/* harmony import */ var _service_token_contract_service_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./service/token-contract-service.js */ "./src/reader/service/token-contract-service.ts");
/* harmony import */ var _service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./service/core/schema-service.js */ "./src/reader/service/core/schema-service.ts");
/* harmony import */ var _service_core_quill_service_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./service/core/quill-service.js */ "./src/reader/service/core/quill-service.ts");
/* harmony import */ var _service_reader_settings_service_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./service/reader-settings-service.js */ "./src/reader/service/reader-settings-service.ts");
/* harmony import */ var _service_erc_event_service_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./service/erc-event-service.js */ "./src/reader/service/erc-event-service.ts");
/* harmony import */ var _service_attribute_total_service_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./service/attribute-total-service.js */ "./src/reader/service/attribute-total-service.ts");
/* harmony import */ var _service_core_component_state_service_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./service/core/component-state-service.js */ "./src/reader/service/core/component-state-service.ts");
/* harmony import */ var _repository_browser_component_state_repository_impl_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./repository/browser/component-state-repository-impl.js */ "./src/reader/repository/browser/component-state-repository-impl.ts");
/* harmony import */ var _dto_component_state_js__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./dto/component-state.js */ "./src/reader/dto/component-state.ts");
/* harmony import */ var _service_token_owner_page_service_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./service/token-owner-page-service.js */ "./src/reader/service/token-owner-page-service.ts");
/* harmony import */ var _repository_browser_token_owner_page_repository_impl_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./repository/browser/token-owner-page-repository-impl.js */ "./src/reader/repository/browser/token-owner-page-repository-impl.ts");
/* harmony import */ var _service_web_transaction_web_service_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./service/web/transaction-web-service.js */ "./src/reader/service/web/transaction-web-service.ts");
/* harmony import */ var _service_processed_transaction_service_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./service/processed-transaction-service.js */ "./src/reader/service/processed-transaction-service.ts");
/* harmony import */ var _repository_browser_processed_transaction_repository_impl_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./repository/browser/processed-transaction-repository-impl.js */ "./src/reader/repository/browser/processed-transaction-repository-impl.ts");
/* harmony import */ var _service_token_owner_service_js__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./service/token-owner-service.js */ "./src/reader/service/token-owner-service.ts");
/* harmony import */ var _repository_browser_token_owner_repository_impl_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./repository/browser/token-owner-repository-impl.js */ "./src/reader/repository/browser/token-owner-repository-impl.ts");
/* harmony import */ var _service_token_service_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./service/token-service.js */ "./src/reader/service/token-service.ts");
/* harmony import */ var _repository_browser_row_item_view_model_repository_impl_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./repository/browser/row-item-view-model-repository-impl.js */ "./src/reader/repository/browser/row-item-view-model-repository-impl.ts");






// import PouchQuickSearch from 'pouchdb-quick-search'
//Enable find plugin
pouchdb_browser__WEBPACK_IMPORTED_MODULE_1__["default"].plugin(pouchdb_find__WEBPACK_IMPORTED_MODULE_2__["default"]);
//Enable quicksearch
// PouchDB.plugin(PouchQuickSearch)


dayjs__WEBPACK_IMPORTED_MODULE_3___default().extend((dayjs_plugin_relativeTime_js__WEBPACK_IMPORTED_MODULE_4___default()));

dayjs__WEBPACK_IMPORTED_MODULE_3___default().extend((dayjs_plugin_localizedFormat_js__WEBPACK_IMPORTED_MODULE_5___default()));
//Import CSS



// Import additional components















// import 'framework7/components/stepper/css'
// import 'framework7/components/popover/css'
// import 'framework7/components/popup/css'
// import 'framework7/components/grid/css'
// import 'framework7/components/form/css'
// import 'framework7/components/chip/css'
// import 'framework7/components/card/css'
// import 'framework7/components/infinite-scroll/css'
// import 'framework7/components/accordion/css'
// import 'framework7/components/range/css'
// import 'framework7/components/list-index/css'
// import 'framework7/components/virtual-list/css'
// import 'framework7/components/preloader/css'
// import 'framework7/components/dialog/css'
// import 'framework7/components/toast/css'
// Install F7 Components using .use() method on Framework7 class:
framework7__WEBPACK_IMPORTED_MODULE_9__["default"].use([framework7_components_dialog__WEBPACK_IMPORTED_MODULE_10__["default"], framework7_components_toast__WEBPACK_IMPORTED_MODULE_11__["default"], framework7_components_preloader__WEBPACK_IMPORTED_MODULE_12__["default"], framework7_components_virtual_list__WEBPACK_IMPORTED_MODULE_13__["default"], framework7_components_list_index__WEBPACK_IMPORTED_MODULE_14__["default"], framework7_components_card__WEBPACK_IMPORTED_MODULE_15__["default"], framework7_components_chip__WEBPACK_IMPORTED_MODULE_16__["default"], framework7_components_form__WEBPACK_IMPORTED_MODULE_17__["default"], framework7_components_grid__WEBPACK_IMPORTED_MODULE_18__["default"],
    framework7_components_range__WEBPACK_IMPORTED_MODULE_19__["default"], framework7_components_accordion__WEBPACK_IMPORTED_MODULE_20__["default"], framework7_components_popup__WEBPACK_IMPORTED_MODULE_21__["default"], framework7_components_infinite_scroll__WEBPACK_IMPORTED_MODULE_22__["default"], framework7_components_popover__WEBPACK_IMPORTED_MODULE_23__["default"], framework7_components_stepper__WEBPACK_IMPORTED_MODULE_24__["default"]]);



// import NftInfo from './components/reader/item/nft-info.f7.html'






















































let container;
async function getMainContainer(customContainer, theBaseURI, theHostname, version, routes, channelId) {
    if (container)
        return container;
    container = customContainer;
    globalThis.baseURI = theBaseURI;
    globalThis.hostname = theHostname;
    globalThis.channelId = channelId;
    function framework7() {
        framework7__WEBPACK_IMPORTED_MODULE_9__["default"].registerComponent("nav-bar", _components_reader_navbar_f7_html__WEBPACK_IMPORTED_MODULE_25__["default"]);
        framework7__WEBPACK_IMPORTED_MODULE_9__["default"].registerComponent("token-toolbar", _components_reader_token_toolbar_f7_html__WEBPACK_IMPORTED_MODULE_26__["default"]);
        // Framework7.registerComponent("nft-info", NftInfo)
        framework7__WEBPACK_IMPORTED_MODULE_9__["default"].registerComponent("mint-list", _components_reader_item_mint_list_f7_html__WEBPACK_IMPORTED_MODULE_27__["default"]);
        framework7__WEBPACK_IMPORTED_MODULE_9__["default"].registerComponent("attribute-filter", _components_reader_channel_attribute_filter_f7_html__WEBPACK_IMPORTED_MODULE_28__["default"]);
        framework7__WEBPACK_IMPORTED_MODULE_9__["default"].registerComponent("explore-total-info", _components_reader_channel_explore_total_info_f7_html__WEBPACK_IMPORTED_MODULE_29__["default"]);
        framework7__WEBPACK_IMPORTED_MODULE_9__["default"].registerComponent("mint-info", _components_reader_channel_mint_info_f7_html__WEBPACK_IMPORTED_MODULE_30__["default"]);
        framework7__WEBPACK_IMPORTED_MODULE_9__["default"].registerComponent("largest-sales", _components_reader_channel_largest_sales_f7_html__WEBPACK_IMPORTED_MODULE_31__["default"]);
        framework7__WEBPACK_IMPORTED_MODULE_9__["default"].registerComponent("transaction-viewer", _components_reader_transaction_f7_html__WEBPACK_IMPORTED_MODULE_32__["default"]);
        framework7__WEBPACK_IMPORTED_MODULE_9__["default"].registerComponent("transaction-row", _components_reader_channel_transaction_row_f7_html__WEBPACK_IMPORTED_MODULE_33__["default"]);
        framework7__WEBPACK_IMPORTED_MODULE_9__["default"].registerComponent("leaderboard-rows", _components_reader_channel_leaderboard_rows_f7_html__WEBPACK_IMPORTED_MODULE_34__["default"]);
        framework7__WEBPACK_IMPORTED_MODULE_9__["default"].registerComponent("search-list", _components_reader_item_search_list_f7_html__WEBPACK_IMPORTED_MODULE_35__["default"]);
        framework7__WEBPACK_IMPORTED_MODULE_9__["default"].registerComponent("infinite-scroll-content", _components_reader_item_infinite_scroll_content_f7_html__WEBPACK_IMPORTED_MODULE_36__["default"]);
        globalThis.app = new framework7__WEBPACK_IMPORTED_MODULE_9__["default"]({
            el: '#app',
            id: 'large-reader',
            name: 'Large Reader',
            theme: 'auto',
            init: false,
            view: {
                browserHistory: true,
                browserHistorySeparator: "",
                browserHistoryOnLoad: false,
                browserHistoryInitialMatch: false
            },
            navbar: {
                hideOnPageScroll: true
            },
            // subnavbar: {
            //   hideOnPageScroll: true
            // },
            toolbar: {
                hideOnPageScroll: true
            },
            routes: routes
        });
        return globalThis.app;
    }
    container.bind("framework7").toConstantValue(framework7());
    container.bind("version").toConstantValue(version);
    container.bind("PouchDB").toConstantValue(async () => {
        return pouchdb_browser__WEBPACK_IMPORTED_MODULE_1__["default"];
    });
    container.bind("provider").toConstantValue(async () => {
        if (typeof window !== "undefined" && window['ethereum']) {
            //@ts-ignore
            window.web3Provider = window.ethereum;
            return new ethers__WEBPACK_IMPORTED_MODULE_37__.BrowserProvider(window['ethereum']);
        }
    });
    container.bind("contracts").toConstantValue(async () => {
        let contract;
        let contractABI;
        let contractResponse = await axios__WEBPACK_IMPORTED_MODULE_38__["default"].get(`${globalThis.hostname}${globalThis.baseURI}backup/contract/contract.json`, { responseType: 'json' });
        let contractABIResponse = await axios__WEBPACK_IMPORTED_MODULE_38__["default"].get(`${globalThis.hostname}${globalThis.baseURI}backup/contract/contract-abi.json`, { responseType: 'json' });
        if (contractResponse.status === 200) {
            contract = contractResponse.data;
        }
        if (contractResponse.status === 200) {
            contractABI = contractABIResponse.data;
        }
        if (!contract.contractAddress)
            return [];
        //Override address
        contractABI['Channel'].address = contract.contractAddress;
        return contractABI;
    });
    container.bind("baseURI").toConstantValue(() => {
        return globalThis.baseURI;
    });
    container.bind("hostname").toConstantValue(() => {
        return globalThis.hostname;
    });
    container.bind("channelId").toConstantValue(() => {
        return globalThis.channelId;
    });
    container.bind("WalletService").to(_service_core_wallet_service_impl_js__WEBPACK_IMPORTED_MODULE_39__.WalletServiceImpl).inSingletonScope();
    container.bind("ChannelRepository").to(_repository_browser_channel_repository_impl_js__WEBPACK_IMPORTED_MODULE_40__.ChannelRepositoryBrowserImpl).inSingletonScope();
    container.bind("ItemRepository").to(_repository_browser_item_repository_impl_js__WEBPACK_IMPORTED_MODULE_41__.ItemRepositoryBrowserImpl).inSingletonScope();
    container.bind("AuthorRepository").to(_repository_browser_author_repository_impl_js__WEBPACK_IMPORTED_MODULE_42__.AuthorRepositoryBrowserImpl).inSingletonScope();
    container.bind("MetadataRepository").to(_repository_browser_metadata_repository_impl_js__WEBPACK_IMPORTED_MODULE_43__.MetadataRepositoryBrowserImpl).inSingletonScope();
    container.bind("ImageRepository").to(_repository_browser_image_repository_impl_js__WEBPACK_IMPORTED_MODULE_44__.ImageRepositoryBrowserImpl).inSingletonScope();
    container.bind("AnimationRepository").to(_repository_browser_animation_repository_impl_js__WEBPACK_IMPORTED_MODULE_45__.AnimationRepositoryBrowserImpl).inSingletonScope();
    container.bind("StaticPageRepository").to(_repository_browser_static_page_repository_impl_js__WEBPACK_IMPORTED_MODULE_46__.StaticPageRepositoryBrowserImpl).inSingletonScope();
    container.bind("ItemPageRepository").to(_repository_browser_item_page_repository_impl_js__WEBPACK_IMPORTED_MODULE_47__.ItemPageRepositoryBrowserImpl).inSingletonScope();
    container.bind("TokenOwnerPageRepository").to(_repository_browser_token_owner_page_repository_impl_js__WEBPACK_IMPORTED_MODULE_48__.TokenOwnerPageRepositoryBrowserImpl).inSingletonScope();
    container.bind("AttributeTotalRepository").to(_repository_browser_attribute_total_repository_impl_js__WEBPACK_IMPORTED_MODULE_49__.AttributeTotalRepositoryBrowserImpl).inSingletonScope();
    container.bind("ReaderSettingsRepository").to(_repository_browser_reader_settings_repository_impl_js__WEBPACK_IMPORTED_MODULE_50__.ReaderSettingsRepositoryBrowserImpl).inSingletonScope();
    //@ts-ignore
    container.bind("ContractStateRepository").to({}).inSingletonScope();
    container.bind("ComponentStateRepository").to(_repository_browser_component_state_repository_impl_js__WEBPACK_IMPORTED_MODULE_51__.ComponentStateRepositoryBrowserImpl).inSingletonScope();
    container.bind("TokenOwnerRepository").to(_repository_browser_token_owner_repository_impl_js__WEBPACK_IMPORTED_MODULE_52__.TokenOwnerRepositoryBrowserImpl).inSingletonScope();
    container.bind("TokenRepository").to(_repository_browser_token_repository_impl_js__WEBPACK_IMPORTED_MODULE_53__.TokenRepositoryBrowserImpl).inSingletonScope();
    container.bind("ProcessedTransactionRepository").to(_repository_browser_processed_transaction_repository_impl_js__WEBPACK_IMPORTED_MODULE_54__.ProcessedTransactionRepositoryBrowserImpl).inSingletonScope();
    container.bind("RowItemViewModelRepository").to(_repository_browser_row_item_view_model_repository_impl_js__WEBPACK_IMPORTED_MODULE_55__.RowItemViewModelRepositoryBrowserImpl).inSingletonScope();
    container.bind("ChannelWebService").to(_service_web_channel_web_service_js__WEBPACK_IMPORTED_MODULE_56__.ChannelWebService).inSingletonScope();
    container.bind("ItemWebService").to(_service_web_item_web_service_js__WEBPACK_IMPORTED_MODULE_57__.ItemWebService).inSingletonScope();
    container.bind("AuthorWebService").to(_service_web_author_web_service_js__WEBPACK_IMPORTED_MODULE_58__.AuthorWebService).inSingletonScope();
    container.bind("MintWebService").to(_service_web_mint_web_service_js__WEBPACK_IMPORTED_MODULE_59__.MintWebService).inSingletonScope();
    container.bind("StaticPageService").to(_service_static_page_service_js__WEBPACK_IMPORTED_MODULE_60__.StaticPageService).inSingletonScope();
    container.bind("ItemPageService").to(_service_item_page_service_js__WEBPACK_IMPORTED_MODULE_61__.ItemPageService).inSingletonScope();
    container.bind("QueueService").to(_service_core_queue_service_js__WEBPACK_IMPORTED_MODULE_62__.QueueService).inSingletonScope();
    container.bind("TransactionWebService").to(_service_web_transaction_web_service_js__WEBPACK_IMPORTED_MODULE_63__.TransactionWebService).inSingletonScope();
    container.bind("PagingService").to(_service_core_paging_service_js__WEBPACK_IMPORTED_MODULE_64__.PagingService).inSingletonScope();
    container.bind("DatabaseService").to(_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_65__.DatabaseService).inSingletonScope();
    container.bind("AnimationService").to(_service_animation_service_js__WEBPACK_IMPORTED_MODULE_66__.AnimationService).inSingletonScope();
    container.bind("UiService").to(_service_core_ui_service_js__WEBPACK_IMPORTED_MODULE_67__.UiService).inSingletonScope();
    container.bind("ItemService").to(_service_item_service_js__WEBPACK_IMPORTED_MODULE_68__.ItemService).inSingletonScope();
    container.bind("ImageService").to(_service_image_service_js__WEBPACK_IMPORTED_MODULE_69__.ImageService).inSingletonScope();
    container.bind("ChannelService").to(_service_channel_service_js__WEBPACK_IMPORTED_MODULE_70__.ChannelService).inSingletonScope();
    container.bind("AuthorService").to(_service_author_service_js__WEBPACK_IMPORTED_MODULE_71__.AuthorService).inSingletonScope();
    container.bind("TokenContractService").to(_service_token_contract_service_js__WEBPACK_IMPORTED_MODULE_72__.TokenContractService).inSingletonScope();
    container.bind("SchemaService").to(_service_core_schema_service_js__WEBPACK_IMPORTED_MODULE_73__.SchemaService).inSingletonScope();
    container.bind("QuillService").to(_service_core_quill_service_js__WEBPACK_IMPORTED_MODULE_74__.QuillService).inSingletonScope();
    container.bind("AttributeTotalService").to(_service_attribute_total_service_js__WEBPACK_IMPORTED_MODULE_75__.AttributeTotalService).inSingletonScope();
    container.bind("ComponentStateService").to(_service_core_component_state_service_js__WEBPACK_IMPORTED_MODULE_76__.ComponentStateService).inSingletonScope();
    container.bind("ReaderSettingsService").to(_service_reader_settings_service_js__WEBPACK_IMPORTED_MODULE_77__.ReaderSettingsService).inSingletonScope();
    container.bind("ERCEventService").to(_service_erc_event_service_js__WEBPACK_IMPORTED_MODULE_78__.ERCEventService).inSingletonScope();
    //@ts-ignore
    container.bind("GenerateService").to({}).inSingletonScope();
    container.bind("TokenOwnerService").to(_service_token_owner_service_js__WEBPACK_IMPORTED_MODULE_79__.TokenOwnerService).inSingletonScope();
    container.bind("TokenService").to(_service_token_service_js__WEBPACK_IMPORTED_MODULE_80__.TokenService).inSingletonScope();
    container.bind("TokenOwnerPageService").to(_service_token_owner_page_service_js__WEBPACK_IMPORTED_MODULE_81__.TokenOwnerPageService).inSingletonScope();
    container.bind("ProcessedTransactionService").to(_service_processed_transaction_service_js__WEBPACK_IMPORTED_MODULE_82__.ProcessedTransactionService).inSingletonScope();
    //Attach container to window so we can easily access it from the browser console
    globalThis.container = container;
    globalThis.he = (he__WEBPACK_IMPORTED_MODULE_0___default());
    globalThis.dayjs = (dayjs__WEBPACK_IMPORTED_MODULE_3___default());
    globalThis.ComponentState = _dto_component_state_js__WEBPACK_IMPORTED_MODULE_83__.ComponentState;
    return container;
}



/***/ }),

/***/ "./src/reader/repository/browser/animation-repository-impl.ts":
/*!********************************************************************!*\
  !*** ./src/reader/repository/browser/animation-repository-impl.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationRepositoryBrowserImpl: () => (/* binding */ AnimationRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_animation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dto/animation.js */ "./src/reader/dto/animation.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/core/database-service.js */ "./src/reader/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AnimationRepositoryBrowserImpl = class AnimationRepositoryBrowserImpl {
    db;
    dbName = "animations";
    databaseService;
    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: true
        });
    }
    constructor() { }
    async get(_id) {
        return Object.assign(new _dto_animation_js__WEBPACK_IMPORTED_MODULE_0__.Animation(), await this.db.get(_id));
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('DatabaseService'),
    __metadata("design:type", _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService)
], AnimationRepositoryBrowserImpl.prototype, "databaseService", void 0);
AnimationRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [])
], AnimationRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/attribute-total-repository-impl.ts":
/*!**************************************************************************!*\
  !*** ./src/reader/repository/browser/attribute-total-repository-impl.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttributeTotalRepositoryBrowserImpl: () => (/* binding */ AttributeTotalRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_attribute_total_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dto/attribute-total.js */ "./src/reader/dto/attribute-total.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/core/database-service.js */ "./src/reader/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AttributeTotalRepositoryBrowserImpl = class AttributeTotalRepositoryBrowserImpl {
    db;
    dbName = "attribute-totals";
    databaseService;
    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: true,
            initialRecordsPath: 'attributeTotals.json'
        });
    }
    constructor() { }
    async get(_id) {
        return Object.assign(new _dto_attribute_total_js__WEBPACK_IMPORTED_MODULE_0__.AttributeTotal(), await this.db.get(_id));
    }
    async getByIds(ids) {
        let results = await this.db.allDocs({
            keys: ids,
            include_docs: true
        });
        return results.rows?.map(d => d.doc);
    }
    async put(attributeTotal) {
        await this.db.put(attributeTotal);
    }
    async list(limit, skip) {
        let response = await this.db.find({
            selector: {
                count: { $exists: true }
            },
            limit: limit,
            skip: skip
        });
        return response.docs;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('DatabaseService'),
    __metadata("design:type", _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService)
], AttributeTotalRepositoryBrowserImpl.prototype, "databaseService", void 0);
AttributeTotalRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [])
], AttributeTotalRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/author-repository-impl.ts":
/*!*****************************************************************!*\
  !*** ./src/reader/repository/browser/author-repository-impl.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorRepositoryBrowserImpl: () => (/* binding */ AuthorRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_author_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dto/author.js */ "./src/reader/dto/author.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/core/database-service.js */ "./src/reader/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AuthorRepositoryBrowserImpl = class AuthorRepositoryBrowserImpl {
    db;
    dbName = "authors";
    databaseService;
    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: true
        });
    }
    constructor() { }
    async get(_id) {
        return Object.assign(new _dto_author_js__WEBPACK_IMPORTED_MODULE_0__.Author(), await this.db.get(_id));
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('DatabaseService'),
    __metadata("design:type", _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService)
], AuthorRepositoryBrowserImpl.prototype, "databaseService", void 0);
AuthorRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [])
], AuthorRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/channel-repository-impl.ts":
/*!******************************************************************!*\
  !*** ./src/reader/repository/browser/channel-repository-impl.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChannelRepositoryBrowserImpl: () => (/* binding */ ChannelRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/core/database-service.js */ "./src/reader/service/core/database-service.ts");
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



let ChannelRepositoryBrowserImpl = class ChannelRepositoryBrowserImpl {
    baseURI;
    hostname;
    changesets = [{
            id: '0',
            changeset: async (db) => {
                //Create indexes
                await db.createIndex({ index: { fields: ['dateCreated'] } });
                await db.createIndex({ index: { fields: ['lastUpdated'] } });
            }
        }];
    db;
    dbName = "channels";
    databaseService;
    constructor(baseURI, hostname) {
        this.baseURI = baseURI;
        this.hostname = hostname;
    }
    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            changesets: this.changesets,
            initialRecords: true
        });
    }
    async get() {
        let channels = await this.db.allDocs({
            include_docs: true
        });
        let channel;
        //Find the first actual channel (skip design)
        for (let c of channels.rows) {
            if (c.doc.dateCreated)
                channel = c.doc;
        }
        // console.log(channels)
        // let channel:Channel = channels.rows[0].doc
        // console.log(channel)
        const contractResponse = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.hostname()}${this.baseURI()}backup/contract/contract.json`);
        // console.log(contractResponse)
        if (contractResponse?.data) {
            channel.contractAddress = contractResponse.data.contractAddress;
        }
        return channel;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('DatabaseService'),
    __metadata("design:type", _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService)
], ChannelRepositoryBrowserImpl.prototype, "databaseService", void 0);
ChannelRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("baseURI")),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("hostname")),
    __metadata("design:paramtypes", [Function,
        Function])
], ChannelRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/component-state-repository-impl.ts":
/*!**************************************************************************!*\
  !*** ./src/reader/repository/browser/component-state-repository-impl.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentStateRepositoryBrowserImpl: () => (/* binding */ ComponentStateRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_component_state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dto/component-state.js */ "./src/reader/dto/component-state.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/core/database-service.js */ "./src/reader/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ComponentStateRepositoryBrowserImpl = class ComponentStateRepositoryBrowserImpl {
    db;
    dbName = "component-state";
    databaseService;
    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
        });
    }
    constructor() { }
    async get(_id) {
        return Object.assign(new _dto_component_state_js__WEBPACK_IMPORTED_MODULE_0__.ComponentState(), await this.db.get(_id));
    }
    async put(componentState) {
        await this.db.put(componentState);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('DatabaseService'),
    __metadata("design:type", _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService)
], ComponentStateRepositoryBrowserImpl.prototype, "databaseService", void 0);
ComponentStateRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [])
], ComponentStateRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/image-repository-impl.ts":
/*!****************************************************************!*\
  !*** ./src/reader/repository/browser/image-repository-impl.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageRepositoryBrowserImpl: () => (/* binding */ ImageRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_image_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dto/image.js */ "./src/reader/dto/image.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/core/database-service.js */ "./src/reader/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ImageRepositoryBrowserImpl = class ImageRepositoryBrowserImpl {
    db;
    dbName = "images";
    databaseService;
    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: true
        });
    }
    constructor() { }
    async get(_id) {
        return Object.assign(new _dto_image_js__WEBPACK_IMPORTED_MODULE_0__.Image(), await this.db.get(_id));
    }
    async list() {
        return; //unimplemented
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('DatabaseService'),
    __metadata("design:type", _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService)
], ImageRepositoryBrowserImpl.prototype, "databaseService", void 0);
ImageRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [])
], ImageRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/item-page-repository-impl.ts":
/*!********************************************************************!*\
  !*** ./src/reader/repository/browser/item-page-repository-impl.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemPageRepositoryBrowserImpl: () => (/* binding */ ItemPageRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
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


let ItemPageRepositoryBrowserImpl = class ItemPageRepositoryBrowserImpl {
    baseURI;
    hostname;
    constructor(baseURI, hostname) {
        this.baseURI = baseURI;
        this.hostname = hostname;
    }
    async get(pageNumber) {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.hostname()}${this.baseURI()}itemPages/${pageNumber}.json`);
        return response.data;
    }
};
ItemPageRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("baseURI")),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("hostname")),
    __metadata("design:paramtypes", [Function,
        Function])
], ItemPageRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/item-repository-impl.ts":
/*!***************************************************************!*\
  !*** ./src/reader/repository/browser/item-repository-impl.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemRepositoryBrowserImpl: () => (/* binding */ ItemRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_item_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dto/item.js */ "./src/reader/dto/item.ts");
/* harmony import */ var _item_repository_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../item-repository.js */ "./src/reader/repository/item-repository.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../service/core/database-service.js */ "./src/reader/service/core/database-service.ts");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
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





let ItemRepositoryBrowserImpl = class ItemRepositoryBrowserImpl {
    baseURI;
    hostname;
    static CHUNK_SIZE = _item_repository_js__WEBPACK_IMPORTED_MODULE_0__.CHUNK_SIZE;
    changesets = [
        {
            id: '0',
            changeset: async (db) => {
                await db.createIndex({
                    index: {
                        fields: ['tokenId']
                    }
                });
                // await db.search({
                //     build: true,
                //     fields: ['contentHTML', 'title', 'tokenId']
                // })
            }
        }
    ];
    db;
    dbName = "items";
    databaseService;
    constructor(baseURI, hostname) {
        this.baseURI = baseURI;
        this.hostname = hostname;
    }
    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            changesets: this.changesets,
            initialRecords: true
        });
    }
    async get(_id) {
        return Object.assign(new _dto_item_js__WEBPACK_IMPORTED_MODULE_1__.Item(), await this.db.get(_id));
    }
    async put(item) {
        await this.db.put(item);
    }
    async list(skip, limit = _item_repository_js__WEBPACK_IMPORTED_MODULE_0__.CHUNK_SIZE) {
        let response = await this.db.find({
            selector: {
                tokenId: { $exists: true }
            },
            sort: [{ 'tokenId': 'asc' }],
            limit: limit,
            skip: skip
        });
        return response.docs;
    }
    async getByTokenId(tokenId) {
        let response = await this.db.find({
            selector: {
                tokenId: { $eq: tokenId },
            },
            limit: 1
        });
        if (response.docs?.length > 0) {
            return response.docs[0];
        }
    }
    async getByTokenIds(ids) {
        let response = await this.db.find({
            selector: {
                tokenId: { $in: ids },
            }
        });
        if (response.docs?.length > 0) {
            return response.docs;
        }
        else {
            return [];
        }
    }
    async getRowItemViewModelsByAttribute(traitType, value, pageNumber) {
        const escape = (s) => {
            return s.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        };
        let itemPage;
        const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(`${this.hostname()}${this.baseURI()}attributes/items/${escape(traitType)}/${escape(value)}/${pageNumber}.json`);
        itemPage = response.data;
        return itemPage;
    }
    async getRowItemViewModelsByOwner(address, pageNumber) {
        let itemPage;
        const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/${address}/tokens/${pageNumber}.json`);
        itemPage = response.data;
        return itemPage;
    }
    async getRowItemViewModelsByTokenIds(tokenIds) {
        let items = [];
        for (let tokenId of tokenIds) {
            const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(`${this.hostname()}${this.baseURI()}t/${tokenId}/rowItemViewModel.json`);
            items.push(response.data);
        }
        return items;
    }
    async getRowItemViewModelsByTokenId(tokenId) {
        const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(`${this.hostname()}${this.baseURI()}t/${tokenId}/rowItemViewModel.json`);
        return response.data;
    }
    async listByTokenId(startTokenId, limit) {
        let response = await this.db.find({
            selector: {
                tokenId: { $eq: startTokenId },
            },
            sort: [{ 'tokenId': 'desc' }],
            limit: limit
        });
        return response.docs;
    }
    async query(query) {
        let response = await this.db.search({
            query: query,
            fields: ['contentHTML', 'title', 'tokenId'],
            include_docs: true,
            highlighting: true,
            limit: _item_repository_js__WEBPACK_IMPORTED_MODULE_0__.CHUNK_SIZE
        });
        let rows = response.rows.map(row => {
            if (row.highlighting.contentHTML) {
                row.doc.contentHTML = row.highlighting.contentHTML;
            }
            //Remove image tags
            row.doc.contentHTML = row.doc.contentHTML.replace(/<img .*?>/g, "");
            return row.doc;
        });
        return rows;
    }
    async all() {
        let response = await this.db.find({
            selector: {
                tokenId: { $exists: true }
            },
            sort: [{ 'tokenId': 'asc' }],
            limit: 100000,
            skip: 0
        });
        return response.docs;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)('DatabaseService'),
    __metadata("design:type", _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_4__.DatabaseService)
], ItemRepositoryBrowserImpl.prototype, "databaseService", void 0);
ItemRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_5__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)("baseURI")),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)("hostname")),
    __metadata("design:paramtypes", [Function,
        Function])
], ItemRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/metadata-repository-impl.ts":
/*!*******************************************************************!*\
  !*** ./src/reader/repository/browser/metadata-repository-impl.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MetadataRepositoryBrowserImpl: () => (/* binding */ MetadataRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var _dto_nft_metadata_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dto/nft-metadata.js */ "./src/reader/dto/nft-metadata.ts");
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



let MetadataRepositoryBrowserImpl = class MetadataRepositoryBrowserImpl {
    baseURI;
    hostname;
    static CHUNK_SIZE = 10;
    constructor(baseURI, hostname) {
        this.baseURI = baseURI;
        this.hostname = hostname;
    }
    async get(tokenId) {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.hostname()}${this.baseURI()}backup/metadata/${tokenId}.json`);
        return Object.assign(new _dto_nft_metadata_js__WEBPACK_IMPORTED_MODULE_1__.NFTMetadata(), response.data);
    }
};
MetadataRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)('baseURI')),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)('hostname')),
    __metadata("design:paramtypes", [Function,
        Function])
], MetadataRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/processed-transaction-repository-impl.ts":
/*!********************************************************************************!*\
  !*** ./src/reader/repository/browser/processed-transaction-repository-impl.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProcessedTransactionRepositoryBrowserImpl: () => (/* binding */ ProcessedTransactionRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ProcessedTransactionRepositoryBrowserImpl = class ProcessedTransactionRepositoryBrowserImpl {
    baseURI;
    async get(_id) {
        let processedTransaction;
        try {
            //Download it.
            let result = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseURI()}sync/transactions/${_id}.json`);
            processedTransaction = result.data;
        }
        catch (ex) {
            console.log(ex);
        }
        return processedTransaction;
    }
    async getSalesReport() {
        let salesReport;
        try {
            //Download it.
            let result = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseURI()}sync/sales/overall.json`);
            salesReport = result.data;
        }
        catch (ex) {
            console.log(ex);
        }
        return salesReport;
    }
    async getAttributeSalesReport(traitType, value) {
        let attributeSalesReport;
        try {
            //Download it.
            let result = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseURI()}sync/attributes/${this.attributeKeyToInteger(`${traitType}::::${value}`)}/attribute.json`);
            attributeSalesReport = result.data;
        }
        catch (ex) {
            console.log(ex);
        }
        return attributeSalesReport;
    }
    async getAttributesOverall() {
        let attributeOverallSales;
        try {
            //Download it.
            let result = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseURI()}sync/attributes/totals.json`);
            attributeOverallSales = result.data;
        }
        catch (ex) {
            console.log(ex);
        }
        return attributeOverallSales;
    }
    attributeKeyToInteger(key) {
        let hash = 0, i, chr;
        if (key.length === 0)
            return hash;
        for (i = 0; i < key.length; i++) {
            chr = key.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    async getLargestSales(limit) {
        let largestSales;
        try {
            //Download it.
            let result = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseURI()}sync/sales/largest-${limit}.json`);
            largestSales = result.data;
        }
        catch (ex) {
            console.log(ex);
        }
        return largestSales;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('baseURI'),
    __metadata("design:type", Function)
], ProcessedTransactionRepositoryBrowserImpl.prototype, "baseURI", void 0);
ProcessedTransactionRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)()
], ProcessedTransactionRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/reader-settings-repository-impl.ts":
/*!**************************************************************************!*\
  !*** ./src/reader/repository/browser/reader-settings-repository-impl.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReaderSettingsRepositoryBrowserImpl: () => (/* binding */ ReaderSettingsRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_reader_settings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dto/reader-settings.js */ "./src/reader/dto/reader-settings.ts");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/core/database-service.js */ "./src/reader/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ReaderSettingsRepositoryBrowserImpl = class ReaderSettingsRepositoryBrowserImpl {
    db;
    dbName = "reader-settings";
    databaseService;
    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false
        });
    }
    constructor() { }
    async put(readerSettings) {
        //Just gonna have one record
        readerSettings._id = "reader-settings";
        await this.db.put(readerSettings);
    }
    async get() {
        let result;
        try {
            result = await this.db.get("reader-settings");
        }
        catch (ex) { }
        if (!result) {
            result = new _dto_reader_settings_js__WEBPACK_IMPORTED_MODULE_0__.ReaderSettings();
            result._id = "reader-settings";
        }
        return Object.assign(new _dto_reader_settings_js__WEBPACK_IMPORTED_MODULE_0__.ReaderSettings(), result);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('DatabaseService'),
    __metadata("design:type", _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService)
], ReaderSettingsRepositoryBrowserImpl.prototype, "databaseService", void 0);
ReaderSettingsRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [])
], ReaderSettingsRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/row-item-view-model-repository-impl.ts":
/*!******************************************************************************!*\
  !*** ./src/reader/repository/browser/row-item-view-model-repository-impl.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RowItemViewModelRepositoryBrowserImpl: () => (/* binding */ RowItemViewModelRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/core/database-service.js */ "./src/reader/service/core/database-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let RowItemViewModelRepositoryBrowserImpl = class RowItemViewModelRepositoryBrowserImpl {
    changesets = [
        {
            id: '0',
            changeset: async (db) => {
                await db.createIndex({
                    index: {
                        fields: ['tokenId']
                    }
                });
            }
        }
    ];
    db;
    dbName = "row-item-view-models";
    databaseService;
    constructor() { }
    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: true,
            initialRecordsPath: "t/all.json",
            changesets: this.changesets
        });
    }
    async get(_id) {
        return this.db.get(_id);
    }
    async put(item) {
        await this.db.put(item);
    }
    async getByTokenIds(ids) {
        let response = await this.db.find({
            selector: {
                tokenId: { $in: ids },
            }
        });
        if (response.docs?.length > 0) {
            return response.docs;
        }
        else {
            return [];
        }
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)('DatabaseService'),
    __metadata("design:type", _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_1__.DatabaseService)
], RowItemViewModelRepositoryBrowserImpl.prototype, "databaseService", void 0);
RowItemViewModelRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __metadata("design:paramtypes", [])
], RowItemViewModelRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/static-page-repository-impl.ts":
/*!**********************************************************************!*\
  !*** ./src/reader/repository/browser/static-page-repository-impl.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StaticPageRepositoryBrowserImpl: () => (/* binding */ StaticPageRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../service/core/database-service.js */ "./src/reader/service/core/database-service.ts");
/* harmony import */ var _dto_static_page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dto/static-page.js */ "./src/reader/dto/static-page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let StaticPageRepositoryBrowserImpl = class StaticPageRepositoryBrowserImpl {
    changesets = [{
            id: '0',
            changeset: async (db) => {
                //Create indexes
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
    dbName = "static-pages";
    databaseService;
    constructor() { }
    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            changesets: this.changesets,
            initialRecords: true
        });
    }
    async get(_id) {
        return Object.assign(new _dto_static_page_js__WEBPACK_IMPORTED_MODULE_0__.StaticPage(), await this.db.get(_id));
    }
    async listByLocation(location, skip) {
        let response = await this.db.find({
            selector: {
                locations: { $all: [location] },
                dateCreated: { $exists: true }
            },
            sort: [{ 'dateCreated': 'asc' }],
            skip: skip
        });
        return response.docs;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('DatabaseService'),
    __metadata("design:type", _service_core_database_service_js__WEBPACK_IMPORTED_MODULE_2__.DatabaseService)
], StaticPageRepositoryBrowserImpl.prototype, "databaseService", void 0);
StaticPageRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [])
], StaticPageRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/token-owner-page-repository-impl.ts":
/*!***************************************************************************!*\
  !*** ./src/reader/repository/browser/token-owner-page-repository-impl.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenOwnerPageRepositoryBrowserImpl: () => (/* binding */ TokenOwnerPageRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
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


let TokenOwnerPageRepositoryBrowserImpl = class TokenOwnerPageRepositoryBrowserImpl {
    baseURI;
    hostname;
    constructor(baseURI, hostname) {
        this.baseURI = baseURI;
        this.hostname = hostname;
    }
    async getHome() {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/home.json`);
        return response.data;
    }
    async getTotals() {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/total.json`);
        return response.data;
    }
    async get(pageNumber) {
        const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/${pageNumber}.json`);
        return response.data;
    }
};
TokenOwnerPageRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("baseURI")),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("hostname")),
    __metadata("design:paramtypes", [Function,
        Function])
], TokenOwnerPageRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/token-owner-repository-impl.ts":
/*!**********************************************************************!*\
  !*** ./src/reader/repository/browser/token-owner-repository-impl.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenOwnerRepositoryBrowserImpl: () => (/* binding */ TokenOwnerRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_token_owner_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dto/token-owner.js */ "./src/reader/dto/token-owner.ts");
/* harmony import */ var _reader_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../reader/service/core/database-service.js */ "./src/reader/service/core/database-service.ts");
/* harmony import */ var _token_owner_repository_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../token-owner-repository.js */ "./src/reader/repository/token-owner-repository.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let TokenOwnerRepositoryBrowserImpl = class TokenOwnerRepositoryBrowserImpl {
    db;
    dbName = "token-owners";
    databaseService;
    baseURI;
    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
            changesets: _token_owner_repository_js__WEBPACK_IMPORTED_MODULE_0__.changesets
        });
    }
    constructor() { }
    async getENS(_id) {
        let name;
        try {
            //Download it.
            let result = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`${this.baseURI()}sync/tokenOwner/${_id}/ens.json`);
            name = result.data?.name;
        }
        catch (ex) { }
        return name;
    }
    async get(_id) {
        try {
            //Download it.
            let result = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`${this.baseURI()}sync/tokenOwner/${_id}/tokenOwner.json`);
            return Object.assign(new _dto_token_owner_js__WEBPACK_IMPORTED_MODULE_2__.TokenOwner(), result.data);
        }
        catch (ex) {
            console.log(ex);
        }
    }
    async put(tokenOwner) {
        return;
    }
    async putAll(tokenOwners) {
        return;
    }
    async list(limit, skip) {
        return;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)('DatabaseService'),
    __metadata("design:type", _reader_service_core_database_service_js__WEBPACK_IMPORTED_MODULE_4__.DatabaseService)
], TokenOwnerRepositoryBrowserImpl.prototype, "databaseService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)('baseURI'),
    __metadata("design:type", Function)
], TokenOwnerRepositoryBrowserImpl.prototype, "baseURI", void 0);
TokenOwnerRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_5__.injectable)(),
    __metadata("design:paramtypes", [])
], TokenOwnerRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/browser/token-repository-impl.ts":
/*!****************************************************************!*\
  !*** ./src/reader/repository/browser/token-repository-impl.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenRepositoryBrowserImpl: () => (/* binding */ TokenRepositoryBrowserImpl)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_token_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dto/token.js */ "./src/reader/dto/token.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let TokenRepositoryBrowserImpl = class TokenRepositoryBrowserImpl {
    baseURI;
    constructor() { }
    async get(_id) {
        try {
            //Download it.
            let result = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseURI()}sync/tokens/${_id}/token.json`);
            return Object.assign(new _dto_token_js__WEBPACK_IMPORTED_MODULE_1__.Token(), result.data);
        }
        catch (ex) {
            // console.log(ex)
        }
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)('baseURI'),
    __metadata("design:type", Function)
], TokenRepositoryBrowserImpl.prototype, "baseURI", void 0);
TokenRepositoryBrowserImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [])
], TokenRepositoryBrowserImpl);



/***/ }),

/***/ "./src/reader/repository/item-repository.ts":
/*!**************************************************!*\
  !*** ./src/reader/repository/item-repository.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHUNK_SIZE: () => (/* binding */ CHUNK_SIZE)
/* harmony export */ });
let CHUNK_SIZE = 10;



/***/ }),

/***/ "./src/reader/repository/token-owner-repository.ts":
/*!*********************************************************!*\
  !*** ./src/reader/repository/token-owner-repository.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changesets: () => (/* binding */ changesets)
/* harmony export */ });
let changesets = [
    {
        id: '0',
        changeset: async (db) => {
            await db.createIndex({
                index: {
                    fields: ['count']
                }
            });
            await db.put({
                _id: '_design/by_token_id',
                views: {
                    by_token_id: {
                        map: function (doc) {
                            for (let tokenId of doc.tokenIds) {
                                //@ts-ignore
                                emit(tokenId);
                            }
                        }.toString(),
                    }
                }
            });
        }
    }
];



/***/ }),

/***/ "./src/reader/service/animation-service.ts":
/*!*************************************************!*\
  !*** ./src/reader/service/animation-service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationService: () => (/* binding */ AnimationService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
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

let AnimationService = class AnimationService {
    animationRepository;
    constructor() { }
    async get(_id) {
        return this.animationRepository.get(_id);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("AnimationRepository"),
    __metadata("design:type", Object)
], AnimationService.prototype, "animationRepository", void 0);
AnimationService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [])
], AnimationService);



/***/ }),

/***/ "./src/reader/service/attribute-total-service.ts":
/*!*******************************************************!*\
  !*** ./src/reader/service/attribute-total-service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AttributeTotalService: () => (/* binding */ AttributeTotalService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
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

let AttributeTotalService = class AttributeTotalService {
    attributeTotalRepository;
    constructor() { }
    async get(_id) {
        return this.attributeTotalRepository.get(_id);
    }
    async put(attributeTotal) {
        return this.attributeTotalRepository.put(attributeTotal);
    }
    async getByIds(ids) {
        return this.attributeTotalRepository.getByIds(ids);
    }
    async list() {
        return this.attributeTotalRepository.list();
    }
    async buildAttributeTotals(channel, items) {
        let totals = [];
        //Build starting total objects.
        let totalKeys = new Set(items.map(item => item.attributeSelections.map(as => `${as.traitType}:::${as.value}`)).flat());
        for (let totalKey of totalKeys) {
            let attributeTotal = {
                _id: totalKey,
                traitType: totalKey.substring(0, totalKey.indexOf(":::")),
                value: totalKey.substring(totalKey.indexOf(":::") + 3, totalKey.length),
                count: 0,
                tokenIds: []
            };
            totals.push(attributeTotal);
        }
        //Loop through the items
        for (let item of items) {
            for (let as of item.attributeSelections) {
                //Find the matching AttributeTotal
                let total = totals.filter(at => at.traitType == as.traitType && at.value == as.value)[0];
                // console.log(as.traitType, as.value, totals.filter( at => at.traitType == as.traitType))
                //Add one to the report total
                total.tokenIds.push(item.tokenId);
                total.count++;
            }
        }
        //Loop through keys and calculate totals for each one.
        for (let total of totals) {
            total.categoryPercent = new Intl.NumberFormat('default', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format((total.count / channel.itemCount));
        }
        //Sort totals by count
        totals.sort((a, b) => b.count - a.count);
        return totals;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("AttributeTotalRepository"),
    __metadata("design:type", Object)
], AttributeTotalService.prototype, "attributeTotalRepository", void 0);
AttributeTotalService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [])
], AttributeTotalService);



/***/ }),

/***/ "./src/reader/service/author-service.ts":
/*!**********************************************!*\
  !*** ./src/reader/service/author-service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorService: () => (/* binding */ AuthorService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
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

let AuthorService = class AuthorService {
    authorRepository;
    walletService;
    constructor() { }
    async get(_id) {
        return this.authorRepository.get(_id);
    }
    getDisplayName(author) {
        if (!author)
            return;
        if (author.name)
            return author.name;
        return this.walletService.truncateEthAddress(author._id);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("AuthorRepository"),
    __metadata("design:type", Object)
], AuthorService.prototype, "authorRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("WalletService"),
    __metadata("design:type", Object)
], AuthorService.prototype, "walletService", void 0);
AuthorService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [])
], AuthorService);



/***/ }),

/***/ "./src/reader/service/channel-service.ts":
/*!***********************************************!*\
  !*** ./src/reader/service/channel-service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChannelService: () => (/* binding */ ChannelService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
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

let ChannelService = class ChannelService {
    channelRepository;
    constructor() { }
    async get() {
        return this.channelRepository.get();
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("ChannelRepository"),
    __metadata("design:type", Object)
], ChannelService.prototype, "channelRepository", void 0);
ChannelService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [])
], ChannelService);



/***/ }),

/***/ "./src/reader/service/core/component-state-service.ts":
/*!************************************************************!*\
  !*** ./src/reader/service/core/component-state-service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentStateService: () => (/* binding */ ComponentStateService)
/* harmony export */ });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/index.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/validation-exception.js */ "./src/reader/util/validation-exception.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ComponentStateService = class ComponentStateService {
    componentStateRepository;
    constructor() { }
    async get(_id) {
        return this.componentStateRepository.get(_id);
    }
    async put(componentState) {
        if (!componentState.dateCreated) {
            componentState.dateCreated = new Date().toJSON();
        }
        componentState.lastUpdated = new Date().toJSON();
        //Validate
        let errors = await (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.validate)(componentState, {
            forbidUnknownValues: true,
            whitelist: true
        });
        if (errors.length > 0) {
            throw new _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_1__.ValidationException(errors);
        }
        return this.componentStateRepository.put(componentState);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("ComponentStateRepository"),
    __metadata("design:type", Object)
], ComponentStateService.prototype, "componentStateRepository", void 0);
ComponentStateService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __metadata("design:paramtypes", [])
], ComponentStateService);



/***/ }),

/***/ "./src/reader/service/core/database-service.ts":
/*!*****************************************************!*\
  !*** ./src/reader/service/core/database-service.ts ***!
  \*****************************************************/
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
    baseURI;
    hostname;
    PouchDB;
    channelId;
    dbCache = {};
    constructor(baseURI, hostname, PouchDB, channelId) {
        this.baseURI = baseURI;
        this.hostname = hostname;
        this.PouchDB = PouchDB;
        this.channelId = channelId;
    }
    async getDatabase(config) {
        let PouchDB = await this.PouchDB();
        const fullName = `./pouch/${this.channelId()}/${config.name}`;
        if (this.dbCache[fullName])
            return this.dbCache[fullName];
        //Create or open database
        this.dbCache[fullName] = new PouchDB(fullName);
        const details = await this.dbCache[fullName].info();
        //If it's empty build the indexes
        if (details.doc_count == 0 && details.update_seq == 0) {
            //Create indexes
            if (config.changesets) {
                console.log(`Creating indexes for ${fullName}`);
                let localChangesets = {
                    _id: "_local/changesets",
                    ids: []
                };
                for (let changeset of config.changesets) {
                    await changeset.changeset(this.dbCache[fullName]);
                    localChangesets.ids.push(changeset.id);
                    console.log(`New changeset detected...${changeset.id}`);
                }
                //Mark changesets as run
                await this.dbCache[fullName].put(localChangesets);
            }
            //Load initial records
            if (config.initialRecords) {
                await this.loadInitialRecords(config, fullName);
            }
        }
        else {
            //Otherwise check if each changeset has been applied and if not then apply it.
            if (config.changesets) {
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
                for (let changeset of config.changesets) {
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
    async loadInitialRecords(config, fullName) {
        let response;
        if (config.initialRecordsPath) {
            response = await fetch(`${this.hostname()}${this.baseURI()}${config.initialRecordsPath}`);
        }
        else {
            response = await fetch(`${this.hostname()}${this.baseURI()}backup/export/backup/${config.name}.json`);
        }
        let initialRecords = await response.json();
        if (initialRecords?.length > 0) {
            console.log(`Loading ${initialRecords?.length} initial records for ${fullName}`);
            await this.dbCache[fullName].bulkDocs(initialRecords);
        }
    }
};
DatabaseService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('baseURI')),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('hostname')),
    __param(2, (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('PouchDB')),
    __param(3, (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)('channelId')),
    __metadata("design:paramtypes", [Function,
        Function, Object, Function])
], DatabaseService);



/***/ }),

/***/ "./src/reader/service/core/paging-service.ts":
/*!***************************************************!*\
  !*** ./src/reader/service/core/paging-service.ts ***!
  \***************************************************/
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

/***/ "./src/reader/service/core/queue-service.ts":
/*!**************************************************!*\
  !*** ./src/reader/service/core/queue-service.ts ***!
  \**************************************************/
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
                console.log("Transaction hash is ", result);
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
            closeButton: true
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

/***/ "./src/reader/service/core/quill-service.ts":
/*!**************************************************!*\
  !*** ./src/reader/service/core/quill-service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuillService: () => (/* binding */ QuillService)
/* harmony export */ });
/* harmony import */ var quill_delta_to_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill-delta-to-html */ "./node_modules/quill-delta-to-html/dist/commonjs/main.js");
/* harmony import */ var quill_delta_to_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quill-delta-to-markdown */ "./node_modules/quill-delta-to-markdown/index.js");
/* harmony import */ var quill_delta_to_markdown__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(quill_delta_to_markdown__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let QuillService = class QuillService {
    constructor() { }
    async translateContent(content) {
        if (!content?.ops)
            return "";
        // console.log(content.ops)
        const qdc = new quill_delta_to_html__WEBPACK_IMPORTED_MODULE_0__.QuillDeltaToHtmlConverter(content.ops, {});
        //Render dividers into HTML
        qdc.renderCustomWith(function (customOp, contextOp) {
            if (customOp.insert.type === 'divider') {
                return "<hr />";
            }
            if (customOp.insert.type === 'ipfsimage') {
                let img = `<img src="${customOp.insert.value.src}" `;
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
        });
        return qdc.convert();
    }
    async generateMarkdown(content) {
        return (0,quill_delta_to_markdown__WEBPACK_IMPORTED_MODULE_1__.deltaToMarkdown)(content);
    }
};
QuillService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __metadata("design:paramtypes", [])
], QuillService);



/***/ }),

/***/ "./src/reader/service/core/routing-service.ts":
/*!****************************************************!*\
  !*** ./src/reader/service/core/routing-service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoutingService: () => (/* binding */ RoutingService)
/* harmony export */ });
class RoutingService {
    static async resolveWithSpinner(resolve, url, options) {
        if (!globalThis.app)
            return;
        globalThis.app.preloader.show();
        resolve({
            componentUrl: url,
            options: options
        });
        globalThis.app.preloader.hide();
    }
    static getReaderRoutes(baseURI) {
        const routes = [];
        //Map the base route without a slash if it's longer than just a slash
        if (baseURI != "/" && baseURI.endsWith("/")) {
            routes.push({
                path: `${baseURI.substring(0, baseURI.length - 1)}`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, 'index.html');
                }
            });
        }
        RoutingService.addSharedRoutes(routes, baseURI);
        routes.push({
            path: '(.*)',
            //@ts-ignore
            async async({ resolve, reject, to }) {
                console.log(`404 error: ${to.path}`);
                await RoutingService.resolveWithSpinner(resolve, '404.html');
            }
        });
        return routes;
    }
    static getLibraryRoutes(libraryURL) {
        let resolvedLibraryURL = `${libraryURL}/partial`;
        const routes = [
            {
                path: `${libraryURL}`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedLibraryURL}/index.html`);
                }
            },
            {
                path: `${libraryURL}/`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedLibraryURL}/index.html`);
                }
            },
            {
                path: `${libraryURL}/index.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedLibraryURL}/index.html`);
                }
            }
        ];
        RoutingService.addSharedRoutes(routes, "/r/:reader_slug/");
        routes.push({
            path: '(.*)',
            //@ts-ignore
            async async({ resolve, reject, to }) {
                console.log(`404 error: ${to.path}`);
                await RoutingService.resolveWithSpinner(resolve, `${resolvedLibraryURL}/404.html`);
            }
        });
        return routes;
    }
    static addSharedRoutes(routes, baseURI) {
        let resolvedBaseURI;
        if (baseURI.indexOf(':reader_slug') > 0) {
            resolvedBaseURI = baseURI.replace(":reader_slug", "{{reader_slug}}");
        }
        else {
            resolvedBaseURI = baseURI;
        }
        resolvedBaseURI += "partial/";
        routes.push(...[
            {
                path: `${baseURI}`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}index.html`);
                }
            },
            {
                path: `${baseURI}index.html`,
                async async({ resolve, reject, to }) {
                    console.log();
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}index.html`);
                }
            },
            {
                path: `${baseURI}mint.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}mint.html`);
                }
            },
            {
                path: `${baseURI}search.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}search.html`);
                }
            },
            {
                path: `${baseURI}explore.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}explore.html`);
                }
            },
            {
                path: `${baseURI}activity`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}activity/index.html`);
                }
            },
            {
                path: `${baseURI}activity/index.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}activity/index.html`);
                }
            },
            {
                path: `${baseURI}leaderboard`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}leaderboard/index.html`);
                }
            },
            {
                path: `${baseURI}leaderboard/index.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}leaderboard/index.html`);
                }
            },
            {
                path: `${baseURI}sales`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}sales/index.html`);
                }
            },
            {
                path: `${baseURI}sales/index.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}sales/index.html`);
                }
            },
            {
                path: `${baseURI}attributes`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}attributes/index.html`);
                }
            },
            {
                path: `${baseURI}attributes/index.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}attributes/index.html`);
                }
            },
            {
                path: `${baseURI}attribute`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}attribute/index.html`);
                }
            },
            {
                path: `${baseURI}attribute/index.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}attribute/index.html`);
                }
            },
            {
                path: `${baseURI}u`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}u/index.html`);
                }
            },
            {
                path: `${baseURI}u/index.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}u/index.html`);
                }
            },
            {
                path: `${baseURI}u/activity`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}u/activity/index.html`);
                }
            },
            {
                path: `${baseURI}u/activity/index.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}u/activity/index.html`);
                }
            },
            {
                path: `${baseURI}list-:page.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}list-{{page}}.html`);
                }
            },
            {
                path: `${baseURI}t/:tokenId`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}t/{{tokenId}}/index.html`, { force: true });
                }
            },
            {
                path: `${baseURI}t/:tokenId/index.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}t/{{tokenId}}/index.html`, { force: true });
                }
            },
            {
                path: `${baseURI}s/:slug.html`,
                async async({ resolve, reject, to }) {
                    await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}s/{{slug}}.html`);
                }
            }
        ]);
    }
}



/***/ }),

/***/ "./src/reader/service/core/schema-service.ts":
/*!***************************************************!*\
  !*** ./src/reader/service/core/schema-service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SchemaService: () => (/* binding */ SchemaService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
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

let SchemaService = class SchemaService {
    itemRepository;
    channelRepository;
    authorRepository;
    imageRepository;
    animationRepository;
    staticPageRepository;
    readerSettingsRepository;
    rowItemViewModelRepository;
    attributeTotalRepository;
    componentStateRepository;
    constructor() {
    }
    async load(dbs) {
        const repositories = this.getRepositories();
        for (let db of dbs) {
            let repo = repositories.filter(r => r.dbName == db)[0];
            await repo?.load();
        }
    }
    async reloadAll() {
        const repositories = this.getRepositories();
        for (let repo of repositories) {
            await repo.load();
        }
    }
    getRepositories() {
        const repositories = [];
        repositories.push(this.itemRepository);
        repositories.push(this.channelRepository);
        repositories.push(this.authorRepository);
        repositories.push(this.imageRepository);
        repositories.push(this.animationRepository);
        repositories.push(this.staticPageRepository);
        repositories.push(this.readerSettingsRepository);
        repositories.push(this.staticPageRepository);
        repositories.push(this.readerSettingsRepository);
        repositories.push(this.attributeTotalRepository);
        repositories.push(this.componentStateRepository);
        repositories.push(this.rowItemViewModelRepository);
        return repositories;
    }
    async loadWallet(walletAddress) {
        console.log(`Loading wallet: ${walletAddress}`);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("ItemRepository"),
    __metadata("design:type", Object)
], SchemaService.prototype, "itemRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("ChannelRepository"),
    __metadata("design:type", Object)
], SchemaService.prototype, "channelRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("AuthorRepository"),
    __metadata("design:type", Object)
], SchemaService.prototype, "authorRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("ImageRepository"),
    __metadata("design:type", Object)
], SchemaService.prototype, "imageRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("AnimationRepository"),
    __metadata("design:type", Object)
], SchemaService.prototype, "animationRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("StaticPageRepository"),
    __metadata("design:type", Object)
], SchemaService.prototype, "staticPageRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("ReaderSettingsRepository"),
    __metadata("design:type", Object)
], SchemaService.prototype, "readerSettingsRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("RowItemViewModelRepository"),
    __metadata("design:type", Object)
], SchemaService.prototype, "rowItemViewModelRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("AttributeTotalRepository"),
    __metadata("design:type", Object)
], SchemaService.prototype, "attributeTotalRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("ComponentStateRepository"),
    __metadata("design:type", Object)
], SchemaService.prototype, "componentStateRepository", void 0);
SchemaService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [])
], SchemaService);



/***/ }),

/***/ "./src/reader/service/core/ui-service.ts":
/*!***********************************************!*\
  !*** ./src/reader/service/core/ui-service.ts ***!
  \***********************************************/
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

/***/ "./src/reader/service/core/wallet-service-impl.ts":
/*!********************************************************!*\
  !*** ./src/reader/service/core/wallet-service-impl.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WalletServiceImpl: () => (/* binding */ WalletServiceImpl)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/address/address.js");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/contract/contract.js");
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
        this.provider = await this.getProvider();
        globalThis.ethereum?.on('accountsChanged', async (accounts) => {
            delete this.address;
            if (accounts?.length > 0) {
                await this.initWallet();
            }
            this.$f7.views.main.router.refreshPage();
        });
        globalThis.ethereum?.on('networkChanged', async (networkId) => {
            this.ethersContracts = {};
            this.provider = await this.getProvider();
            await this.initWallet();
        });
    }
    async initWallet() {
        console.log('Init wallet');
        delete this.address;
        if (!this.provider) {
            await this.initProvider();
        }
        //@ts-ignore
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
            return (0,ethers__WEBPACK_IMPORTED_MODULE_0__.getAddress)(accounts[0]);
        }
    }
    async getWallet() {
        return this.provider.getSigner();
    }
    async getContract(name) {
        let contracts = await this.contracts();
        //Initialize and return
        let c = contracts[name];
        this.ethersContracts[name] = new ethers__WEBPACK_IMPORTED_MODULE_1__.Contract(c.address, c.abi, this.wallet ? this.wallet : this.provider);
        // console.log(`Getting contract ${name}`)
        return this.ethersContracts[name];
    }
    truncateEthAddress(address) {
        if (!address)
            return;
        // Captures 0x + 4 characters, then the last 4 characters.
        const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
        const match = address.match(truncateRegex);
        if (!match)
            return address;
        return `${match[1]}…${match[2]}`;
    }
};
WalletServiceImpl = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)("contracts")),
    __param(1, (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)("provider")),
    __param(2, (0,inversify__WEBPACK_IMPORTED_MODULE_3__.inject)("framework7")),
    __metadata("design:paramtypes", [Function,
        Function, Object])
], WalletServiceImpl);



/***/ }),

/***/ "./src/reader/service/erc-event-service.ts":
/*!*************************************************!*\
  !*** ./src/reader/service/erc-event-service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERCEventService: () => (/* binding */ ERCEventService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _sync_dto_erc_event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../sync/dto/erc-event.js */ "./src/sync/dto/erc-event.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ERCEventService = class ERCEventService {
    constructor() { }
    async translateEventToERCEvent(event) {
        let ercEvent = new _sync_dto_erc_event_js__WEBPACK_IMPORTED_MODULE_0__.ERCEvent();
        ercEvent.removed = event.removed;
        ercEvent.address = event.address;
        ercEvent.data = event.data;
        ercEvent.topics = event.topics;
        ercEvent.logIndex = event.index;
        ercEvent.event = event.fragment?.name;
        ercEvent.eventSignature = event.eventSignature;
        ercEvent.dateCreated = new Date().toJSON();
        //Convert BigInt args to strings    
        ercEvent.args = event.args?.map(a => a.toString());
        ercEvent.namedArgs = {};
        //Check wether it's a transfer and if it's newer than the most recently recorded transfer
        switch (ercEvent.event) {
            case "Transfer":
                ercEvent.isTransfer = true;
                ercEvent.namedArgs.fromAddress = ercEvent.args[0];
                ercEvent.namedArgs.toAddress = ercEvent.args[1];
                ercEvent.namedArgs.tokenId = ercEvent.args[2];
                break;
            case "Approval":
                ercEvent.namedArgs.owner = ercEvent.args[0];
                ercEvent.namedArgs.approved = ercEvent.args[1];
                ercEvent.namedArgs.tokenId = ercEvent.args[2];
                break;
            case "ApprovalForAll":
                ercEvent.namedArgs.owner = ercEvent.args[0];
                ercEvent.namedArgs.operator = ercEvent.args[1];
                ercEvent.namedArgs.approved = ercEvent.args[2];
                break;
        }
        if (ercEvent.isTransfer && ercEvent.namedArgs?.fromAddress == "0x0000000000000000000000000000000000000000") {
            ercEvent.isMint = true;
        }
        if (ercEvent.isTransfer && ercEvent.namedArgs?.toAddress == "0x0000000000000000000000000000000000000000") {
            ercEvent.isBurn = true;
        }
        // ercEvent._id = `${ercEvent.blockHash}-${ercEvent.transactionHash}-${ercEvent.logIndex}`
        return ercEvent;
    }
};
ERCEventService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [])
], ERCEventService);



/***/ }),

/***/ "./src/reader/service/image-service.ts":
/*!*********************************************!*\
  !*** ./src/reader/service/image-service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageService: () => (/* binding */ ImageService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var mini_svg_data_uri__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mini-svg-data-uri */ "./node_modules/mini-svg-data-uri/index.js");
/* harmony import */ var mini_svg_data_uri__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mini_svg_data_uri__WEBPACK_IMPORTED_MODULE_0__);
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
    constructor() { }
    async get(_id) {
        return this.imageRepository.get(_id);
    }
    async list() {
        return this.imageRepository.list();
    }
    async getUrl(image) {
        if (!image.buffer && !image.svg)
            return "";
        //If we have a buffer return it as a URL
        if (image.buffer) {
            return this.bufferToDataURL("image/jpg", image.buffer);
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
    svgToDataURL(svgStr) {
        return mini_svg_data_uri__WEBPACK_IMPORTED_MODULE_0___default()(svgStr);
        // return "data:image/svg+xml;base64," + Buffer.from(svgStr).toString("base64")
    }
    bufferToDataURL(mimeType, buffer) {
        return `data:${mimeType};base64,${buffer.toString("base64")}`;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("ImageRepository"),
    __metadata("design:type", Object)
], ImageService.prototype, "imageRepository", void 0);
ImageService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __metadata("design:paramtypes", [])
], ImageService);



/***/ }),

/***/ "./src/reader/service/item-page-service.ts":
/*!*************************************************!*\
  !*** ./src/reader/service/item-page-service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemPageService: () => (/* binding */ ItemPageService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
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

let ItemPageService = class ItemPageService {
    itemPageRepository;
    constructor() { }
    async get(pageNumber) {
        return this.itemPageRepository.get(pageNumber);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("ItemPageRepository"),
    __metadata("design:type", Object)
], ItemPageService.prototype, "itemPageRepository", void 0);
ItemPageService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [])
], ItemPageService);



/***/ }),

/***/ "./src/reader/service/item-service.ts":
/*!********************************************!*\
  !*** ./src/reader/service/item-service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemService: () => (/* binding */ ItemService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _attribute_total_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./attribute-total-service.js */ "./src/reader/service/attribute-total-service.ts");
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
    rowItemViewModelRepository;
    attributeTotalService;
    constructor() { }
    async get(_id) {
        return this.itemRepository.get(_id);
    }
    async list(skip, limit) {
        return this.itemRepository.list(skip, limit);
    }
    async query(query) {
        return this.itemRepository.query(query);
    }
    async all() {
        return this.itemRepository.all();
    }
    async getByTokenId(tokenId) {
        return this.itemRepository.getByTokenId(tokenId);
    }
    async getByTokenIds(tokenIds) {
        return this.itemRepository.getByTokenIds(tokenIds);
    }
    async getRowItemViewModelsByAttribute(traitType, value, pageNumber) {
        return this.itemRepository.getRowItemViewModelsByAttribute(traitType, value, pageNumber);
    }
    async getRowItemViewModelsByOwner(address, pageNumber) {
        return this.itemRepository.getRowItemViewModelsByOwner(address, pageNumber);
    }
    async getRowItemViewModelsByTokenIds(tokenIds) {
        return this.itemRepository.getRowItemViewModelsByTokenIds(tokenIds);
    }
    async getRowItemViewModelsByTokenId(tokenId) {
        return this.itemRepository.getRowItemViewModelsByTokenId(tokenId);
    }
    async listByTokenId(startTokenId, limit = 10) {
        return this.itemRepository.listByTokenId(startTokenId, limit);
    }
    async buildAttributeTotals(channel) {
        let items = await this.all();
        return this.attributeTotalService.buildAttributeTotals(channel, items);
    }
    async searchTokenIds(tokenIds) {
        return this.rowItemViewModelRepository.getByTokenIds(tokenIds);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("ItemRepository"),
    __metadata("design:type", Object)
], ItemService.prototype, "itemRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("RowItemViewModelRepository"),
    __metadata("design:type", Object)
], ItemService.prototype, "rowItemViewModelRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("AttributeTotalService"),
    __metadata("design:type", _attribute_total_service_js__WEBPACK_IMPORTED_MODULE_1__.AttributeTotalService)
], ItemService.prototype, "attributeTotalService", void 0);
ItemService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __metadata("design:paramtypes", [])
], ItemService);



/***/ }),

/***/ "./src/reader/service/processed-transaction-service.ts":
/*!*************************************************************!*\
  !*** ./src/reader/service/processed-transaction-service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProcessedTransactionService: () => (/* binding */ ProcessedTransactionService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _reader_service_item_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reader/service/item-service.js */ "./src/reader/service/item-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ProcessedTransactionService = class ProcessedTransactionService {
    processedTransactionRepository;
    itemService;
    constructor() { }
    async get(_id) {
        return this.processedTransactionRepository.get(_id);
    }
    async getRowItemViewModels(processedEvents) {
        let result = {};
        let tokenIds = new Set();
        for (let processedEvent of processedEvents) {
            if (!processedEvent.tokenId)
                continue;
            tokenIds.add(processedEvent.tokenId);
        }
        let rowItemViewModels = await this.itemService.getRowItemViewModelsByTokenIds(Array.from(tokenIds));
        for (let rivm of rowItemViewModels) {
            result[rivm.tokenId] = rivm;
        }
        return result;
    }
    async translateSalesToViewModels(sales) {
        let viewModels = [];
        for (let sale of sales) {
            viewModels.push({
                sale: sale,
                item: await this.itemService.getRowItemViewModelsByTokenId(sale.tokenId)
            });
        }
        return viewModels;
    }
    async getSalesReport() {
        return this.processedTransactionRepository.getSalesReport();
    }
    async getAttributeSalesReport(traitType, value) {
        return this.processedTransactionRepository.getAttributeSalesReport(traitType, value);
    }
    async getAttributesOverall() {
        return this.processedTransactionRepository.getAttributesOverall();
    }
    async getLargestSales(limit) {
        return this.processedTransactionRepository.getLargestSales(limit);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("ProcessedTransactionRepository"),
    __metadata("design:type", Object)
], ProcessedTransactionService.prototype, "processedTransactionRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("ItemService"),
    __metadata("design:type", _reader_service_item_service_js__WEBPACK_IMPORTED_MODULE_1__.ItemService)
], ProcessedTransactionService.prototype, "itemService", void 0);
ProcessedTransactionService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __metadata("design:paramtypes", [])
], ProcessedTransactionService);



/***/ }),

/***/ "./src/reader/service/reader-settings-service.ts":
/*!*******************************************************!*\
  !*** ./src/reader/service/reader-settings-service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReaderSettingsService: () => (/* binding */ ReaderSettingsService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation-exception.js */ "./src/reader/util/validation-exception.ts");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "./node_modules/class-validator/esm5/index.js");
/* harmony import */ var _core_schema_service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/schema-service.js */ "./src/reader/service/core/schema-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let ReaderSettingsService = class ReaderSettingsService {
    readerSettingsRepository;
    schemaService;
    constructor() {
    }
    async get() {
        await this.schemaService.load(["reader-settings"]);
        return this.readerSettingsRepository.get();
    }
    async put(readerSettings) {
        readerSettings.lastUpdated = new Date().toJSON();
        //Validate
        let errors = await (0,class_validator__WEBPACK_IMPORTED_MODULE_0__.validate)(readerSettings, {
            forbidUnknownValues: true,
            whitelist: true
        });
        if (errors.length > 0) {
            throw new _util_validation_exception_js__WEBPACK_IMPORTED_MODULE_1__.ValidationException(errors);
        }
        await this.readerSettingsRepository.put(readerSettings);
    }
    async updateCurrentPage(tokenId) {
        let readerSettings = await this.get();
        readerSettings.currentPage = tokenId;
        await this.put(readerSettings);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("ReaderSettingsRepository"),
    __metadata("design:type", Object)
], ReaderSettingsService.prototype, "readerSettingsRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("SchemaService"),
    __metadata("design:type", _core_schema_service_js__WEBPACK_IMPORTED_MODULE_3__.SchemaService)
], ReaderSettingsService.prototype, "schemaService", void 0);
ReaderSettingsService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_4__.injectable)(),
    __metadata("design:paramtypes", [])
], ReaderSettingsService);



/***/ }),

/***/ "./src/reader/service/static-page-service.ts":
/*!***************************************************!*\
  !*** ./src/reader/service/static-page-service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StaticPageService: () => (/* binding */ StaticPageService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
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

let StaticPageService = class StaticPageService {
    staticPageRepository;
    constructor() { }
    async get(_id) {
        return this.staticPageRepository.get(_id);
    }
    async listByLocation(location, skip) {
        return this.staticPageRepository.listByLocation(location, skip);
    }
    async listRoutablePages(additionalStaticPages) {
        let results = [];
        if (additionalStaticPages?.length > 0) {
            results.push(...additionalStaticPages);
        }
        results = results.concat(await this.staticPageRepository.listByLocation("navbar", 0));
        results = results.concat(await this.staticPageRepository.listByLocation("links", 0));
        //Clone these so we don't change the underlying objects
        results = JSON.parse(JSON.stringify(results));
        //Strip the content.
        if (results?.length > 0) {
            for (let staticPage of results) {
                delete staticPage?.content;
                delete staticPage?.contentHTML;
                delete staticPage?.contentMarkdown;
            }
        }
        return results;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("StaticPageRepository"),
    __metadata("design:type", Object)
], StaticPageService.prototype, "staticPageRepository", void 0);
StaticPageService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [])
], StaticPageService);



/***/ }),

/***/ "./src/reader/service/token-contract-service.ts":
/*!******************************************************!*\
  !*** ./src/reader/service/token-contract-service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenContractService: () => (/* binding */ TokenContractService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/hash/id.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let TokenContractService = class TokenContractService {
    metadataRepository;
    walletService;
    constructor() { }
    lastMintedTokenId = 0;
    async getBalance(address) {
        if (!address)
            return 0;
        let channelContract = await this.getChannelContract();
        return parseInt(await channelContract.balanceOf(address));
    }
    async getMetadata(tokenId) {
        return this.metadataRepository.get(tokenId);
    }
    async mint(quantity, totalMintCost) {
        let channelContract = await this.getChannelContract();
        await channelContract.mint(quantity, { value: totalMintCost });
    }
    async mintFromStartOrFail(quantity, start, totalMintCost) {
        let channelContract = await this.getChannelContract();
        await channelContract.mintFromStartOrFail(quantity, start, { value: totalMintCost });
    }
    async mintAsOwner(quantity) {
        let channelContract = await this.getChannelContract();
        await channelContract.mint(quantity, {});
    }
    async ownerOf(tokenId) {
        let channelContract = await this.getChannelContract();
        return channelContract.ownerOf(tokenId);
    }
    async getTotalMinted() {
        let channelContract = await this.getChannelContract();
        return channelContract.totalMinted();
    }
    async getTotalSupply() {
        let channelContract = await this.getChannelContract();
        return channelContract.totalSupply();
    }
    async owner() {
        let channelContract = await this.getChannelContract();
        return channelContract.owner();
    }
    async getChannelContract() {
        let contract = await this.walletService.getContract("Channel");
        //Add event listener for mints if it's not already added. Maybe won't work if we ever add a second listener anywhere
        if (this.walletService.provider && this.walletService.provider.listeners()?.length == 0) {
            let filter = {
                address: contract.address,
                topics: [
                    // the name of the event, parnetheses containing the data type of each event, no spaces
                    (0,ethers__WEBPACK_IMPORTED_MODULE_0__.id)("MintEvent(uint256)")
                ]
            };
            this.walletService.provider.on(filter, async (e) => {
                let tokenId = parseInt(e.data);
                if (tokenId > this.lastMintedTokenId) {
                    this.lastMintedTokenId = tokenId;
                    let mintEvent = new CustomEvent('mint-event');
                    //@ts-ignore
                    mintEvent.tokenId = tokenId;
                    document.dispatchEvent(mintEvent);
                }
            });
        }
        return contract;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("MetadataRepository"),
    __metadata("design:type", Object)
], TokenContractService.prototype, "metadataRepository", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("WalletService"),
    __metadata("design:type", Object)
], TokenContractService.prototype, "walletService", void 0);
TokenContractService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __metadata("design:paramtypes", [])
], TokenContractService);



/***/ }),

/***/ "./src/reader/service/token-owner-page-service.ts":
/*!********************************************************!*\
  !*** ./src/reader/service/token-owner-page-service.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenOwnerPageService: () => (/* binding */ TokenOwnerPageService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
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

let TokenOwnerPageService = class TokenOwnerPageService {
    tokenOwnerPageRepository;
    constructor() { }
    async getHome() {
        return this.tokenOwnerPageRepository.getHome();
    }
    async get(pageNumber) {
        return this.tokenOwnerPageRepository.get(pageNumber);
    }
    async getTotals() {
        return this.tokenOwnerPageRepository.getTotals();
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("TokenOwnerPageRepository"),
    __metadata("design:type", Object)
], TokenOwnerPageService.prototype, "tokenOwnerPageRepository", void 0);
TokenOwnerPageService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [])
], TokenOwnerPageService);



/***/ }),

/***/ "./src/reader/service/token-owner-service.ts":
/*!***************************************************!*\
  !*** ./src/reader/service/token-owner-service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenOwnerService: () => (/* binding */ TokenOwnerService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _dto_token_owner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dto/token-owner.js */ "./src/reader/dto/token-owner.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let TokenOwnerService = class TokenOwnerService {
    walletService;
    tokenOwnerRepository;
    constructor() { }
    async get(_id) {
        return this.tokenOwnerRepository.get(_id);
    }
    async getDisplayName(_id) {
        if (!_id)
            return;
        let ens = await this.tokenOwnerRepository.getENS(_id);
        if (ens)
            return ens;
        return this.walletService.truncateEthAddress(_id);
    }
    async getOrCreate(address) {
        let tokenOwner;
        if (!tokenOwner) {
            try {
                tokenOwner = await this.get(address);
            }
            catch (ex) { }
        }
        if (!tokenOwner) {
            tokenOwner = new _dto_token_owner_js__WEBPACK_IMPORTED_MODULE_0__.TokenOwner();
            tokenOwner._id = address;
            tokenOwner.tokenIds = [];
            tokenOwner.count = 0;
        }
        return tokenOwner;
    }
    async put(tokenOwner) {
        return this.tokenOwnerRepository.put(tokenOwner);
    }
    /**
     * No validation for speeeeeeeeed
     * @param tokenOwners
     * @returns
     */
    async putAll(tokenOwners) {
        //Update lastUpdated
        tokenOwners.forEach(tokenOwner => {
            if (!tokenOwner._id) {
                tokenOwner.dateCreated = new Date().toJSON();
            }
            tokenOwner.lastUpdated = new Date().toJSON();
        });
        return this.tokenOwnerRepository.putAll(tokenOwners);
    }
    async list(limit, skip) {
        return this.tokenOwnerRepository.list(limit, skip);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("WalletService"),
    __metadata("design:type", Object)
], TokenOwnerService.prototype, "walletService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("TokenOwnerRepository"),
    __metadata("design:type", Object)
], TokenOwnerService.prototype, "tokenOwnerRepository", void 0);
TokenOwnerService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __metadata("design:paramtypes", [])
], TokenOwnerService);



/***/ }),

/***/ "./src/reader/service/token-service.ts":
/*!*********************************************!*\
  !*** ./src/reader/service/token-service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TokenService: () => (/* binding */ TokenService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
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

let TokenService = class TokenService {
    tokenRepository;
    constructor() { }
    async get(_id) {
        return this.tokenRepository.get(_id);
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("TokenRepository"),
    __metadata("design:type", Object)
], TokenService.prototype, "tokenRepository", void 0);
TokenService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.injectable)(),
    __metadata("design:paramtypes", [])
], TokenService);



/***/ }),

/***/ "./src/reader/service/web/author-web-service.ts":
/*!******************************************************!*\
  !*** ./src/reader/service/web/author-web-service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorWebService: () => (/* binding */ AuthorWebService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _author_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../author-service.js */ "./src/reader/service/author-service.ts");
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
    authorService;
    constructor() { }
    async get(_id) {
        return this.getViewModel(await this.authorService.get(_id));
    }
    async getViewModel(author) {
        let authorPhoto;
        return {
            author: author,
            authorDisplayName: this.authorService.getDisplayName(author)
        };
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_0__.inject)("AuthorService"),
    __metadata("design:type", _author_service_js__WEBPACK_IMPORTED_MODULE_1__.AuthorService)
], AuthorWebService.prototype, "authorService", void 0);
AuthorWebService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.injectable)(),
    __metadata("design:paramtypes", [])
], AuthorWebService);



/***/ }),

/***/ "./src/reader/service/web/channel-web-service.ts":
/*!*******************************************************!*\
  !*** ./src/reader/service/web/channel-web-service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChannelWebService: () => (/* binding */ ChannelWebService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _repository_item_repository_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../repository/item-repository.js */ "./src/reader/repository/item-repository.ts");
/* harmony import */ var _author_service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../author-service.js */ "./src/reader/service/author-service.ts");
/* harmony import */ var _channel_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../channel-service.js */ "./src/reader/service/channel-service.ts");
/* harmony import */ var _core_paging_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/paging-service.js */ "./src/reader/service/core/paging-service.ts");
/* harmony import */ var _core_schema_service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/schema-service.js */ "./src/reader/service/core/schema-service.ts");
/* harmony import */ var _image_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../image-service.js */ "./src/reader/service/image-service.ts");
/* harmony import */ var _static_page_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../static-page-service.js */ "./src/reader/service/static-page-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let ChannelWebService = class ChannelWebService {
    channelService;
    authorService;
    imageService;
    pagingService;
    schemaService;
    walletService;
    staticPageService;
    loadedChannelData;
    constructor() { }
    async get(offset, additionalStaticPages) {
        return this.getViewModel(await this.channelService.get(), offset, additionalStaticPages);
    }
    async getViewModel(channel, offset, additionalStaticPages) {
        let author;
        let coverImage;
        if (channel.authorId) {
            author = await this.authorService.get(channel.authorId);
        }
        let itemCount = channel.itemCount;
        let pagingViewModel = this.pagingService.buildPagingViewModel(offset, _repository_item_repository_js__WEBPACK_IMPORTED_MODULE_0__.CHUNK_SIZE, itemCount, 5);
        // let items = await this.itemWebService.list(offset)
        let locations = ["navbar", "links", "index", "none"];
        let staticPagesViewModel = {};
        for (let location of locations) {
            staticPagesViewModel[location] = await this.staticPageService.listByLocation(location, 0);
        }
        if (additionalStaticPages?.length > 0) {
            for (let staticPage of additionalStaticPages) {
                for (let location of staticPage?.locations) {
                    staticPagesViewModel[location].push(staticPage);
                }
            }
        }
        if (channel.coverImageId) {
            coverImage = await this.imageService.get(channel.coverImageId);
        }
        return {
            channelContractAbbrev: channel.contractAddress ? this.walletService.truncateEthAddress(channel.contractAddress) : undefined,
            channel: channel,
            staticPagesViewModel: staticPagesViewModel,
            author: author,
            authorDisplayName: this.authorService.getDisplayName(author),
            itemCount: itemCount,
            pagingViewModel: pagingViewModel,
            coverImage: coverImage
        };
    }
    async loadChannel(channelId, baseURI, hostname) {
        globalThis.channelId = channelId;
        globalThis.baseURI = baseURI;
        globalThis.hostname = hostname;
    }
    async loadChannelData(channelId) {
        if (channelId && this.loadedChannelData != channelId) {
            await this.schemaService.reloadAll();
            await this.schemaService.load(['component-state']);
        }
        this.loadedChannelData = channelId;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("ChannelService"),
    __metadata("design:type", _channel_service_js__WEBPACK_IMPORTED_MODULE_2__.ChannelService)
], ChannelWebService.prototype, "channelService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("AuthorService"),
    __metadata("design:type", _author_service_js__WEBPACK_IMPORTED_MODULE_3__.AuthorService)
], ChannelWebService.prototype, "authorService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("ImageService"),
    __metadata("design:type", _image_service_js__WEBPACK_IMPORTED_MODULE_4__.ImageService)
], ChannelWebService.prototype, "imageService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("PagingService"),
    __metadata("design:type", _core_paging_service_js__WEBPACK_IMPORTED_MODULE_5__.PagingService)
], ChannelWebService.prototype, "pagingService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("SchemaService"),
    __metadata("design:type", _core_schema_service_js__WEBPACK_IMPORTED_MODULE_6__.SchemaService)
], ChannelWebService.prototype, "schemaService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("WalletService"),
    __metadata("design:type", Object)
], ChannelWebService.prototype, "walletService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("StaticPageService"),
    __metadata("design:type", _static_page_service_js__WEBPACK_IMPORTED_MODULE_7__.StaticPageService)
], ChannelWebService.prototype, "staticPageService", void 0);
ChannelWebService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_8__.injectable)(),
    __metadata("design:paramtypes", [])
], ChannelWebService);



/***/ }),

/***/ "./src/reader/service/web/item-web-service.ts":
/*!****************************************************!*\
  !*** ./src/reader/service/web/item-web-service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ItemWebService: () => (/* binding */ ItemWebService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _animation_service_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../animation-service.js */ "./src/reader/service/animation-service.ts");
/* harmony import */ var _author_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../author-service.js */ "./src/reader/service/author-service.ts");
/* harmony import */ var _channel_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../channel-service.js */ "./src/reader/service/channel-service.ts");
/* harmony import */ var _core_quill_service_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/quill-service.js */ "./src/reader/service/core/quill-service.ts");
/* harmony import */ var _core_schema_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/schema-service.js */ "./src/reader/service/core/schema-service.ts");
/* harmony import */ var _image_service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../image-service.js */ "./src/reader/service/image-service.ts");
/* harmony import */ var _item_service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../item-service.js */ "./src/reader/service/item-service.ts");
/* harmony import */ var _item_page_service_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../item-page-service.js */ "./src/reader/service/item-page-service.ts");
/* harmony import */ var _attribute_total_service_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../attribute-total-service.js */ "./src/reader/service/attribute-total-service.ts");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! he */ "./node_modules/he/he.js");
/* harmony import */ var he__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(he__WEBPACK_IMPORTED_MODULE_0__);
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












const parser = new _xmldom_xmldom__WEBPACK_IMPORTED_MODULE_1__.DOMParser();
let ItemWebService = class ItemWebService {
    itemService;
    channelService;
    authorService;
    imageService;
    schemaService;
    quillService;
    animationService;
    itemPageService;
    attributeTotalService;
    allTokensCache;
    constructor() { }
    async get(_id) {
        let item = await this.itemService.get(_id);
        //Get channel
        const channel = await this.channelService.get();
        //Get attribute report
        const attributeReport = await this.attributeTotalService.list();
        return this.getViewModel(item, channel, attributeReport);
    }
    async getByTokenId(tokenId) {
        return this.itemService.getByTokenId(tokenId);
    }
    async getViewModel(item, channel, attributeReport) {
        let attributeSelections = [];
        let author;
        let coverImage;
        let animation;
        let animationContentHTML;
        //Get author
        if (channel.authorId) {
            author = await this.authorService.get(channel.authorId);
        }
        //Only show attributes that are valid at the category level. 
        if (channel.attributeOptions.length > 0) {
            for (let ao of channel.attributeOptions) {
                //find the one selected by this item
                let selections = item?.attributeSelections?.filter(as => ao?.traitType == as?.traitType);
                let selection = selections?.length > 0 ? selections[0].value : undefined;
                let attributeTotals = attributeReport.filter(at => at.traitType == ao.traitType);
                let matches = attributeTotals?.filter(at => at.value == selection);
                attributeSelections.push({
                    id: ao.id,
                    traitType: ao.traitType,
                    values: ao.values,
                    value: selection,
                    attributeTotal: matches?.length > 0 ? matches[0] : undefined
                });
            }
        }
        //Get image
        if (item.coverImageId) {
            coverImage = await this.imageService.get(item.coverImageId);
        }
        //Get animation if we are displaying it.
        if (item.animationId && !item.coverImageAsAnimation) {
            animation = await this.animationService.get(item.animationId);
            let page = parser.parseFromString(animation.content, 'text/html');
            let body = page.getElementsByTagName('body')[0];
            animationContentHTML = he__WEBPACK_IMPORTED_MODULE_0___default().unescape(new _xmldom_xmldom__WEBPACK_IMPORTED_MODULE_1__.XMLSerializer().serializeToString(body));
            //Swap body tag to a div
            animationContentHTML = "<div" + animationContentHTML.slice(5);
            animationContentHTML = animationContentHTML.substring(0, animationContentHTML.length - 7) + "</div>";
        }
        //Get image data and re-insert it into the content ops
        if (item.content?.ops?.length > 0) {
            let ops = [];
            for (let op of item.content.ops) {
                if (op.insert && op.insert.ipfsimage) {
                    let image = await this.imageService.get(op.insert.ipfsimage.cid);
                    op.insert.ipfsimage.src = await this.imageService.getUrl(image);
                    // console.log(op.src)
                }
                ops.push(op);
            }
            item.content.ops = ops;
        }
        //Load previous and nex
        return {
            item: item,
            animation: animation,
            animationContentHTML: animationContentHTML,
            contentHTML: await this.quillService.translateContent(item.content),
            channel: channel,
            author: author,
            authorDisplayName: this.authorService.getDisplayName(author),
            attributeSelections: attributeSelections,
            coverImage: coverImage
        };
    }
    async getMintViewModel(item, channel) {
        let attributeSelections = [];
        let author;
        let coverImage;
        let animation;
        //Get image
        if (item.coverImageId) {
            coverImage = await this.imageService.get(item.coverImageId);
        }
        return {
            item: item,
            animation: animation,
            channel: channel,
            author: author,
            attributeSelections: attributeSelections,
            coverImage: coverImage
        };
    }
    async getSearchViewModel(item, channel) {
        let attributeSelections = [];
        let author;
        let coverImage;
        let animation;
        //Get image
        // if (item.coverImageId) {
        //     coverImage = await this.imageService.get(item.coverImageId)
        // }
        return {
            item: item,
            animation: animation,
            channel: channel,
            author: author,
            attributeSelections: attributeSelections,
            // coverImage: coverImage
        };
    }
    async getExploreAttributeOptions(params) {
        await this.schemaService.load(["channels", "authors", "attribute-totals"]);
        //Get channel
        const channel = await this.channelService.get();
        let attributeTotals = await this.attributeTotalService.list();
        //Get a list of the token IDs that we're already filtered to so we can adjust the counts.
        // let filteredIds = await this._paramsToFilteredIds(params, attributeTotals)
        let attributeOptions = channel.attributeOptions;
        let results = [];
        for (let ao of attributeOptions) {
            let values = [];
            for (let v of ao.values.sort()) {
                let clonedParams = JSON.parse(JSON.stringify(params));
                delete clonedParams[ao.traitType];
                //Unapply the selection for this filter so the counts are like this one isn't already applied. 
                let parentFilteredIds = await this._paramsToFilteredIds(clonedParams, attributeTotals);
                let at = attributeTotals.filter(at => at.traitType == ao.traitType && at.value == v)[0];
                if (at) {
                    values.push({
                        value: v,
                        count: at.tokenIds.filter(x => parentFilteredIds.includes(x)).length
                    });
                }
            }
            //Sort by count
            values.sort((a, b) => b.count - a.count);
            let aovm = {
                id: ao.id,
                traitType: ao.traitType,
                values: values
            };
            results.push(aovm);
        }
        return results;
    }
    async exploreList(params, skip, limit) {
        await this.schemaService.load(["channels", "authors", "attribute-totals", "row-item-view-models"]);
        if (params && Object.keys(params)?.length > 0) {
            return this.exploreQuery(params, skip, limit);
        }
        else {
            //Figure out which page this is and return it.
            let pageNumber = skip / limit;
            let itemPage = await this.itemPageService.get(pageNumber);
            let channel = await this.channelService.get();
            return {
                items: itemPage.items,
                totalMatches: channel.itemCount,
                limit: limit,
                skip: skip
            };
        }
    }
    async exploreQuery(params, skip, limit) {
        await this.schemaService.load(["channels", "authors", "attribute-totals", "row-item-view-models"]);
        let attributeTotals = await this.attributeTotalService.list();
        let filteredIds = await this._paramsToFilteredIds(params, attributeTotals);
        //Paging
        let totalMatches = filteredIds.length;
        filteredIds = filteredIds.slice(skip, skip + limit);
        let viewModels = await this.itemService.searchTokenIds(filteredIds);
        return {
            items: viewModels,
            totalMatches: totalMatches,
            limit: limit,
            skip: skip
        };
    }
    async _paramsToFilteredIds(params, allAttributeTotals) {
        let attributeTotalIds = [];
        for (let key of Object.keys(params)) {
            attributeTotalIds.push(`${key}:::${params[key]}`);
        }
        let attributeTotals = allAttributeTotals?.filter(at => attributeTotalIds?.includes(at._id));
        if (attributeTotals?.length > 0) {
            return attributeTotals.map(at => at.tokenIds).reduce((p, c) => p.filter(e => c.includes(e)));
        }
        else {
            //No filter selected so return every token ID
            if (!this.allTokensCache) {
                this.allTokensCache = Array.from(new Set(allAttributeTotals.map(at => at.tokenIds).flat()));
            }
            return this.allTokensCache;
        }
    }
    async list(skip, limit) {
        let result = [];
        //Get channel
        const channel = await this.channelService.get();
        //Get attribute report
        const attributeReport = await this.itemService.buildAttributeTotals(channel);
        let items = await this.itemService.list(skip, limit);
        for (let item of items) {
            result.push(await this.getViewModel(item, channel, attributeReport));
        }
        return result;
    }
    async mintList(skip, limit) {
        let result = [];
        //Get channel
        const channel = await this.channelService.get();
        let items = await this.itemService.list(skip, limit);
        for (let item of items) {
            result.push(await this.getMintViewModel(item, channel));
        }
        return result;
    }
    async itemPage(pageNumber) {
        return this.itemPageService.get(pageNumber);
    }
    async attributeItemPage(traitType, value, pageNumber) {
        return this.itemService.getRowItemViewModelsByAttribute(traitType, value, pageNumber);
    }
    async ownerItemPage(address, pageNumber) {
        return this.itemService.getRowItemViewModelsByOwner(address, pageNumber);
    }
    async query(query) {
        await this.schemaService.load(["items", "channels"]);
        let results = await this.itemService.query(query);
        //Get channel
        const channel = await this.channelService.get();
        let viewModels = [];
        for (let item of results) {
            viewModels.push(await this.getSearchViewModel(item, channel));
        }
        return viewModels;
    }
    async buildItemPages(itemViewModels, perPage) {
        // await this.schemaService.load(["images"])
        let result = [];
        let viewModels = [];
        //Create view models
        for (let itemViewModel of itemViewModels) {
            let item = itemViewModel.item;
            viewModels.push({
                _id: item._id,
                coverImageGenerated: itemViewModel.coverImage.generated ? true : false,
                coverImageId: itemViewModel.coverImage._id,
                title: `${item.title ? item.title : `#${item.tokenId}`}`,
                tokenId: item.tokenId
            });
        }
        //Break into rows
        for (let i = 0; i < viewModels.length; i += perPage) {
            result.push({
                items: viewModels.slice(i, i + perPage)
            });
        }
        return result;
    }
    async buildAttributeTotals(channel) {
        return this.itemService.buildAttributeTotals(channel);
    }
    async getRowItemViewModelsByTokenIds(filteredIds) {
        return this.itemService.getRowItemViewModelsByTokenIds(filteredIds);
    }
    translateRowItemViewModel(item, coverImage) {
        let viewModel = {
            _id: item._id,
            coverImageGenerated: coverImage.generated ? true : false,
            coverImageId: coverImage._id,
            title: `${item.title ? item.title : `#${item.tokenId}`}`,
            tokenId: item.tokenId
        };
        return viewModel;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("ItemService"),
    __metadata("design:type", _item_service_js__WEBPACK_IMPORTED_MODULE_3__.ItemService)
], ItemWebService.prototype, "itemService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("ChannelService"),
    __metadata("design:type", _channel_service_js__WEBPACK_IMPORTED_MODULE_4__.ChannelService)
], ItemWebService.prototype, "channelService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("AuthorService"),
    __metadata("design:type", _author_service_js__WEBPACK_IMPORTED_MODULE_5__.AuthorService)
], ItemWebService.prototype, "authorService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("ImageService"),
    __metadata("design:type", _image_service_js__WEBPACK_IMPORTED_MODULE_6__.ImageService)
], ItemWebService.prototype, "imageService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("SchemaService"),
    __metadata("design:type", _core_schema_service_js__WEBPACK_IMPORTED_MODULE_7__.SchemaService)
], ItemWebService.prototype, "schemaService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("QuillService"),
    __metadata("design:type", _core_quill_service_js__WEBPACK_IMPORTED_MODULE_8__.QuillService)
], ItemWebService.prototype, "quillService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("AnimationService"),
    __metadata("design:type", _animation_service_js__WEBPACK_IMPORTED_MODULE_9__.AnimationService)
], ItemWebService.prototype, "animationService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("ItemPageService"),
    __metadata("design:type", _item_page_service_js__WEBPACK_IMPORTED_MODULE_10__.ItemPageService)
], ItemWebService.prototype, "itemPageService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_2__.inject)("AttributeTotalService"),
    __metadata("design:type", _attribute_total_service_js__WEBPACK_IMPORTED_MODULE_11__.AttributeTotalService)
], ItemWebService.prototype, "attributeTotalService", void 0);
ItemWebService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_12__.injectable)(),
    __metadata("design:paramtypes", [])
], ItemWebService);



/***/ }),

/***/ "./src/reader/service/web/mint-web-service.ts":
/*!****************************************************!*\
  !*** ./src/reader/service/web/mint-web-service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MintWebService: () => (/* binding */ MintWebService)
/* harmony export */ });
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _channel_service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../channel-service.js */ "./src/reader/service/channel-service.ts");
/* harmony import */ var _core_schema_service_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/schema-service.js */ "./src/reader/service/core/schema-service.ts");
/* harmony import */ var _item_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../item-service.js */ "./src/reader/service/item-service.ts");
/* harmony import */ var _token_contract_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../token-contract-service.js */ "./src/reader/service/token-contract-service.ts");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/utils/units.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let MintWebService = class MintWebService {
    tokenContractService;
    channelService;
    itemService;
    schemaService;
    walletService;
    constructor() { }
    async getMintingViewModel() {
        await this.schemaService.load(["channels", "items"]);
        let channel = await this.channelService.get();
        if (channel.contractAddress) {
            let totalMinted = await this.tokenContractService.getTotalMinted();
            let lastMinted = [];
            if (Number(totalMinted) > 0) {
                let items = await this.itemService.listByTokenId(Number(totalMinted));
                for (let item of items) {
                    try {
                        //@ts-ignore
                        let owner = await this.tokenContractService.ownerOf(item.tokenId);
                        lastMinted.push({
                            owner: await this.walletService.truncateEthAddress(owner),
                            item: item
                        });
                    }
                    catch (ex) { }
                }
            }
            return {
                totalMinted: Number(totalMinted),
                totalSupply: channel.itemCount,
                mintPrice: channel.mintPrice,
                lastMinted: lastMinted,
                minting: Number(totalMinted) < channel.itemCount
            };
        }
    }
    async getHomeMintingViewModel() {
        await this.schemaService.load(["channels"]);
        let channel = await this.channelService.get();
        if (channel.contractAddress) {
            let totalMinted = await this.tokenContractService.getTotalMinted();
            return {
                totalMinted: Number(totalMinted),
                totalSupply: channel.itemCount,
                mintPrice: channel.mintPrice
            };
        }
    }
    async mint(quantity) {
        await this.schemaService.load(["channels"]);
        let channel = await this.channelService.get();
        let totalWei = await this.calculateTotalMint(channel, quantity);
        let owner = await this.tokenContractService.owner();
        // console.log(owner.toLowerCase(), this.walletService.address.toLowerCase())
        if (this.walletService.address.toLowerCase() == owner.toLowerCase()) {
            console.log('Minting as owner');
            await this.tokenContractService.mintAsOwner(quantity);
        }
        else {
            await this.tokenContractService.mint(quantity, totalWei);
        }
    }
    async mintFromStartOrFail(quantity, start) {
        await this.schemaService.load(["channels"]);
        let channel = await this.channelService.get();
        let totalWei = await this.calculateTotalMint(channel, quantity);
        await this.tokenContractService.mintFromStartOrFail(quantity, start, totalWei);
    }
    async calculateTotalMint(channel, quantity) {
        let mintPriceWei = (0,ethers__WEBPACK_IMPORTED_MODULE_0__.parseUnits)(channel.mintPrice, 'ether');
        let total = Number(mintPriceWei) * quantity;
        return total.toString();
    }
    async updateTotal(mintPriceWei, quantity) {
        return (0,ethers__WEBPACK_IMPORTED_MODULE_0__.formatUnits)(Number(mintPriceWei) * quantity);
    }
    async parseUnits(mintPrice) {
        return (0,ethers__WEBPACK_IMPORTED_MODULE_0__.parseUnits)(mintPrice, 'ether');
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("TokenContractService"),
    __metadata("design:type", _token_contract_service_js__WEBPACK_IMPORTED_MODULE_2__.TokenContractService)
], MintWebService.prototype, "tokenContractService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("ChannelService"),
    __metadata("design:type", _channel_service_js__WEBPACK_IMPORTED_MODULE_3__.ChannelService)
], MintWebService.prototype, "channelService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("ItemService"),
    __metadata("design:type", _item_service_js__WEBPACK_IMPORTED_MODULE_4__.ItemService)
], MintWebService.prototype, "itemService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("SchemaService"),
    __metadata("design:type", _core_schema_service_js__WEBPACK_IMPORTED_MODULE_5__.SchemaService)
], MintWebService.prototype, "schemaService", void 0);
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("WalletService"),
    __metadata("design:type", Object)
], MintWebService.prototype, "walletService", void 0);
MintWebService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_6__.injectable)(),
    __metadata("design:paramtypes", [])
], MintWebService);



/***/ }),

/***/ "./src/reader/service/web/transaction-web-service.ts":
/*!***********************************************************!*\
  !*** ./src/reader/service/web/transaction-web-service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionWebService: () => (/* binding */ TransactionWebService)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/inject.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/es/annotation/injectable.js");
/* harmony import */ var _processed_transaction_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../processed-transaction-service.js */ "./src/reader/service/processed-transaction-service.ts");
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



let TransactionWebService = class TransactionWebService {
    baseURI;
    processedTransactionService;
    constructor(baseURI) {
        this.baseURI = baseURI;
    }
    async getHomeViewModel() {
        let result = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseURI()}sync/home.json`, {
            // query URL without using browser cache
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
        return result.data;
    }
    async list(page) {
        let latest = await this.getLatest();
        let result = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseURI()}sync/transactions/activity/${page}.json`);
        let transactionsViewModel = result.data;
        transactionsViewModel.lastUpdated = latest.lastUpdated;
        return transactionsViewModel;
    }
    async listByAddress(address, page) {
        let result = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseURI()}sync/tokenOwner/${address}/activity/${page}.json`);
        let transactionsViewModel = result.data;
        let latest = await this.getLatest();
        transactionsViewModel.lastUpdated = latest.lastUpdated;
        return transactionsViewModel;
    }
    async getLatest() {
        let result = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseURI()}sync/transactions/latest.json`, {
            // query URL without using browser cache
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
        return result.data;
    }
    async getRecentActivity() {
        let result = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get(`${this.baseURI()}sync/transactions/recentActivity.json`, {
            // query URL without using browser cache
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
        let transactionsViewModel = result.data;
        return transactionsViewModel;
    }
    async getSalesReport() {
        return this.processedTransactionService.getSalesReport();
    }
    async getAttributeSalesReport(traitType, value) {
        return this.processedTransactionService.getAttributeSalesReport(traitType, value);
    }
    async getAttributesOverall() {
        return this.processedTransactionService.getAttributesOverall();
    }
    async getLargestSales(limit) {
        let sales = await this.processedTransactionService.getLargestSales(limit);
        return sales;
    }
    abbreviateDollars(number, digits) {
        if (!number)
            return "$0";
        var SI_SYMBOL = ["", "", "M", "G", "T", "P", "E"];
        // what tier? (determines SI symbol)
        var tier = Math.log10(Math.abs(number)) / 3 | 0;
        // if zero or thousands, we don't need a suffix
        if (tier == 0 || tier == 1) {
            let result = new Intl.NumberFormat('en-US', { currency: "USD", style: "currency" }).format(number);
            return result;
        }
        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);
        // scale the number
        var scaled = number / scale;
        // format number and add suffix
        return new Intl.NumberFormat('en-US', { currency: "USD", style: "currency" }).format(scaled) + suffix;
    }
};
__decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("ProcessedTransactionService"),
    __metadata("design:type", _processed_transaction_service_js__WEBPACK_IMPORTED_MODULE_2__.ProcessedTransactionService)
], TransactionWebService.prototype, "processedTransactionService", void 0);
TransactionWebService = __decorate([
    (0,inversify__WEBPACK_IMPORTED_MODULE_3__.injectable)(),
    __param(0, (0,inversify__WEBPACK_IMPORTED_MODULE_1__.inject)("baseURI")),
    __metadata("design:paramtypes", [Function])
], TransactionWebService);



/***/ }),

/***/ "./src/reader/util/validation-exception.ts":
/*!*************************************************!*\
  !*** ./src/reader/util/validation-exception.ts ***!
  \*************************************************/
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

/***/ "./src/sync/dto/erc-event.ts":
/*!***********************************!*\
  !*** ./src/sync/dto/erc-event.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERCEvent: () => (/* binding */ ERCEvent)
/* harmony export */ });
class ERCEvent {
    _id;
    _rev;
    removed;
    address;
    data;
    topics;
    logIndex;
    args;
    event;
    eventSignature;
    isTransfer;
    isMint;
    isBurn;
    namedArgs;
    lastUpdated;
    dateCreated;
}



/***/ }),

/***/ "?ce41":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?21f4":
/*!****************************!*\
  !*** ./nextTick (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/reader/index.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ reader = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=main.reader.js.map