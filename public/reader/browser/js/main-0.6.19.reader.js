
    <div class="navbar">
        <div class="navbar-bg"></div>

        <div class="navbar-inner sliding">
                
          ${s?.src?.length>0?t`

            <div class="left">
              <a href="${s?.link}" class="logo external">
                <img src="${A}logo.${s?.src.split(".").pop()}" />
              </a>
            </div>

          `:t`<span />`}

          <div class="title">
            ${p}
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

                      ${g?t`
        
                          <li>
                            <div class="item-content">
                              <div class="item-inner">
                                  <div class="item-title">
                                      ${null!=a?t`
                                        <a href="#" class="button button-fill">${m(a)}</a>
                                    `:t`
                                        <button class="button button-outline button-fill" @click=${u}>
                                          Connect Wallet
                                        </button>
                                    `} 
                                  </div>
                              </div>
                            </div>
                          </li>

                          ${f?t`
                            <li>
                              <a href="${A}mint.html" class="item-link popover-close">
                                <div class="item-content">
                                  <div class="item-inner">
                                      <div class="item-title">
                                          Mint
                                      </div>
                                  </div>
                                </div>
                              </a>
                            </li>
                          `:t`<span />`}

                              
                        `:t`<span />`}




                      <li>
                        <a href="${o}" class="item-link external popover-close">
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
                        <a href="${A}explore.html" class="item-link popover-close">
                          <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title">
                                    Explore
                                </div>
                            </div>
                          </div>
                        </a>
                      </li>


                      ${b?t`
                        <li>
                          <a href="${A}activity" class="item-link popover-close">
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
                          <a href="${A}leaderboard" class="item-link popover-close">
                            <div class="item-content">
                              <div class="item-inner">
                                  <div class="item-title">
                                      Leaderboard
                                  </div>
                              </div>
                            </div>
                          </a>
                        </li>


                      `:t`<span />`}

                    </ul>
              
                  </div>
      
                </div>
              </div>

            </div>

            <div class="large-only">
  
              <a href="${o}" class="external link">
                Fork
              </a>

              <a class="link ${"Explore"==d?t`link-active`:t` `}" href="${A}explore.html">
                Explore
              </a>      

              ${b?t`
                <a class="link ${"Activity"==d?t`link-active`:t` `}" href="${A}activity">
                  Activity
                </a> 

                <a class="link ${"Leaderboard"==d?t`link-active`:t` `}" href="${A}leaderboard" >
                  Leaderboard
                </a> 

              `:t`<span />`}

              ${g?t`

                ${f?t`
                  <a class="link ${"Mint"==d?t`link-active`:t` `}" href="${A}mint.html" >
                    Mint
                  </a> 
                `:t`<span />`}

                ${null!=a?t`
                    <a href="${A}u/?address=${a}" class="link" >${m(a)}</a>
                `:t`
                    <a class="link" @click="${u}">Connect Wallet</a>
                `} 
     
              `:t`<span style="display: none;" />`}

            </div>
            
          </div>



          ${C?t`
                  
            <div class="subnavbar">
              <div class="subnavbar-inner">
        
                <div class="breadcrumbs ">
  
                  ${C.map((n=>t`
                    <div class="breadcrumbs-item">

                      ${n.path?t`
                        <a href="${A}${n.path}" class="link">
                          ${n.text}
                        </a>
                      `:t`${n.text}`}


                    </div>  

                    ${n.path?t`
                      <div class="breadcrumbs-separator"></div>
                    `:t`<span />`}

                    
                  `))}

                </div>
        
              </div>
            </div>


            `:t`<span />`}



          
        </div>
        
    </div>

`}}Y.id="452f3f66da";const F=Y;function q(n,{$on:t,$:e,$f7:r,$update:a}){let o,i=globalThis.container.get("baseURI"),A=globalThis.container.get("ReaderSettingsService"),l=n.token_id,s=n.item_count;const p=n=>i+n,d=async n=>{n.preventDefault();let t=e(n.currentTarget).val();r.preloader.show(),t>0?(await A.updateCurrentPage(parseInt(t)),r.views.main.router.navigate(p("t/"+t),{transition:"f7-flip"})):r.views.main.router.navigate(p("index.html")),r.preloader.hide()},c=n=>{n.preventDefault();const t=r.range.get(n.target);l=t.value,a()};return(async()=>{let n=await A.get();o=n.currentPage,await a()})(),function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div class="toolbar toolbar-bottom">
    <div class="toolbar-inner">

        <div class="row" style="width: 100%; margin-bottom: -20px;">

            ${o&&0==l?t`
                <a href="${p(`t/${o}`)}" class="button button-outline back-to-page">
                    Back to page ${o}
                </a>
            `:t`<span />`}


            <div class="range-slider range-slider-init" 
                @range:change=${c}
                data-label="true"
                >
            
                <!-- range input -->
                <input type="range" 
                    min="0" 
                    max="${s}"
                    step="1" 
                    value="${l}" 
                    @change="${d}"
            />
            </div>

            <div class="page-number col-100">
                Page <strong>${l}</strong> of ${s}
            </div>


        </div>





    </div>
  </div>

`}}q.id="0c1bc88970",q.style="\n.page-number {\n    width: 100%;\n    text-align: center;\n    font-size: 13px;\n    margin-bottom: 15px;\n}\n\n.range-slider {\n    width: 100%;\n    margin-left: 20px; \n    margin-right: 20px;\n    flex: 1;\n}\n\n.toolbar a.back-to-page {\n    height: 45px;\n    width: 70px;\n    margin-left: 10px;\n    flex: 0 0 70px;\n    font-size: 10px;\n    text-transform: none;\n    white-space: normal;\n    line-height: 13px;\n}\n";const S=q;function U(n,{$on:t,$f7:e,$update:r}){return function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`




`}}U.id="a8d5bef100",U.style="\n\n\n\n\n";const X=U;function R(n,{$:t,$on:e,$f7:r,$update:a}){let o,i,A=globalThis.container.get("MintWebService"),l=globalThis.container.get("WalletService"),s=globalThis.container.get("QueueService"),p=0,d=1,c=!1;n.baseurl;const f=async()=>{p=globalThis.ethers.utils.formatUnits(i.mul(d)),await a()};e("stepper:change",(async n=>{d=parseInt(n.detail),await f(),b(d)}));const b=n=>{let e=0;t(".flex-card").each((r=>{t(r).removeClass("selected"),e<n&&(t(r).addClass("selected"),e++)}))},C=async n=>{let t;if(n.preventDefault(),await l.connect(),c){let n=parseInt(o.totalMinted+1);t=A.mintFromStartOrFail(d,n)}else t=A.mint(d);let e={title:"Minting token(s). Approve transaction and wait for it to be mined.",promise:t};await s.queuePromiseView(e)},g=async n=>{c=n.currentTarget.checked,await a()};return r.preloader.show(),A.getMintingViewModel().then((n=>(o=n,i=globalThis.ethers.utils.parseUnits(o.mintPrice,"ether"),f()))).then((()=>{let n=new CustomEvent("mint-view-model-loaded");n.mintingViewModel=o,document.dispatchEvent(n),r.preloader.hide()})),document.addEventListener("mint-event",(async n=>{if(n.tokenId>o?.totalMinted){o=await A.getMintingViewModel(),await a();let n=new CustomEvent("mint-view-model-refreshed");n.mintingViewModel=o,n.quantity=d,document.dispatchEvent(n)}})),function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div>
    
    ${o?t`

      ${o.minting?t`

          <div class="block-title block-title-medium">Create a digital collectible!</div>

          <div class="list simple-list inset mint-list-info">
            <ul>
              <li>NFTs are minted in sequential order.</li>
              <li>From the beginning of the story to the end.</li>
              <li>Limited supply!</li>
            </ul>
          </div>

          <div class="block block-strong inset">
              <p>
                <strong>Total Minted:</strong> ${o.totalMinted} of ${o.totalSupply}
              </p>              
          </div>


          <div class="block-title block-title-medium">
            Select between 1-10 NFTs and click the mint button. 
          </div>
          <form class="list no-hairlines inset" @submit="${C}">
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
                            <strong>Mint Fee:</strong> ${o.mintPrice} ETH
                          </p>
                          <p>
                            <strong>Quantity:</strong> ${d} 
                          </p>
                          <p>
                            <strong>Total:</strong> ${p} ETH
                          </p>
                        </div>
                    </div>
                </div>
              </li>

              <li style="display:none;">
                <label class="item-checkbox item-content">

                    <input type="checkbox" checked="${c}" @change=${g}/>
                    
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
                      <button class="button button-fill ${d<1?"disabled":""}" id="mint-button">Mint</button>
                    </div>
                </div>
              </li>
              
            </ul>

          </form>

          <div class="card mint-list-card"  style="display:none">
            <div class="card-header">Next Up</div>
            <div class="card-content">

              <div class="list cards-list virtual-list" id="mint-list">
                <ul class="item-flex"></ul>
              </div>
        
              <div class="preloader infinite-scroll-preloader"></div>

            </div>
          </div>
          
      `:t`
        <li class="card">
          <div class="card-header">Minting Complete</div>
          <div class="card-content card-content-padding">
            Minting is complete. Thank you!
          </div>
        </li>
      
      `}
    
    `:t`
      <li class="card skeleton-text skeleton-effect-wave">
        <div class="card-header">Loading Loading Loading</div>
        <div class="card-content card-content-padding">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac
            interdum. Cras consequat felis at consequat hendrerit. Aliquam vestibulum vitae lorem ac iaculis.
            Praesent nec pharetra massa, at blandit lectus. Sed tincidunt, lectus eu convallis elementum, nibh nisi
            aliquet urna, nec imperdiet felis sapien at enim.</div>
      </li>
    `}
    
  </div>



`}}R.id="93255f1db9",R.style="\n\n\n\n.mint-list-card .card-header {\n  font-size: 27px;\n  font-weight: bold;\n}\n\n.mint-list-card .block {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.mint-list-info li {\n  white-space: unset;\n  line-height: unset;\n  height: unset;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\n";const Z=R;function G(n,{$:t,$on:e,$f7:r,$update:a}){let o,i={};document.addEventListener("attribute-options-loaded",(async n=>{o=n.attributeOptions,n.attributeParams&&(i=n.attributeParams,t("#attribute-accordian-item").addClass("accordion-item-opened")),await a()}));const A=n=>{i[n.currentTarget.name]=n.currentTarget.value,n.currentTarget.value?i[n.currentTarget.name]=n.currentTarget.value:delete i[n.currentTarget.name];let t=new CustomEvent("explore-attribute-filter-changed");t.attributeParams=i,document.dispatchEvent(t)},l=async n=>{let e=t(n.currentTarget).data("id");delete i[e],await a();let r=new CustomEvent("explore-attribute-filter-changed");r.attributeParams=i,document.dispatchEvent(r)};return function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div>

    <div class="block block-strong row">
      
      <div class="col-50">

        ${Object.keys(i).map((n=>t`
          <div class="chip">
            <div class="chip-label">${n}: ${i[n]}</div>
            <a href="#" class="chip-delete" @click="${l}" data-id="${n}"></a>
          </div>
        `))}

      </div>
      <div class="col-50 filter-button">
        
        <a href="#" data-popup=".filter-popup" class="popup-open">Filters (${Object.keys(i).length})</a>

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
                    ${o?.map((n=>t`
                      <li class="item-content item-input">
                        <div class="item-inner">
                          <div class="item-title item-label">${n.traitType}</div>
                          <div class="item-input-wrap input-dropdown-wrap">
                            <select name="${n.traitType}" @change="${A}">
                              <option selected ></option>
                              ${n.values?.map((e=>t`
                                ${e.value==i[n.traitType]?t`
                                  <option value="${e.value}" selected>${e.value} (${e.count})</option>
                                `:t`
                                  <option value="${e.value}">${e.value} (${e.count})</option>
                                `} 
                              `))}
                            </select>
                          </div>
                        </div>
                      </li>
                    `))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

    </div>




  </div>






`}}G.id="9039432fa8",G.style="\n\n.item-content.attribute-select {\n  width: 175px;\n  display: inline-block;\n}\n\n\n";const O=G;function M(n,{$:t,$on:e,$f7:r,$update:a}){let o,i;return document.addEventListener("explore-total-info-changed",(async n=>{o=n.totalItems,i=n.totalMatches,await a()})),function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div class="block-title block-title-small">

    ${i?t`

      ${i!=o?t`
        Showing ${i} results (${o} total)
      `:t`
        Showing 1 - ${o} results  
      `}

    `:t`<span/>`}

  </div>

`}}M.id="51243d0a82",M.style="\n\n\n";const T=M;function P(n,{$:t,$on:e,$f7:r,$update:a}){let o,i=globalThis.container.get("WalletService"),A=globalThis.container.get("MintWebService"),l=!1,s=n.baseurl;return(async()=>{try{i.provider||await i.initProvider(),i.provider&&(l=!0,o=await A.getHomeMintingViewModel())}catch(n){console.log(n)}a()})(),function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div>
    <div class="block-title block-title-medium">Mint NFTs</div>

    <div class="card">
      <div class="card-content card-content-padding">

        ${o?t`
          <p>
            <strong>Total Minted:</strong> ${o.totalMinted} of ${o.totalSupply}
          </p>

          <a href="${"mint.html",""+(s+"mint.html")}" class="link">Mint NFTs</a>

        `:t`
          Minting information unavailable. 
          <p>Note: Use a web browser with wallet support to see NFT information.</p>
        `}

  
      </div>
    </div>
  </div>

`}}P.id="469ffdfc44",P.style="\n";const Q=P,V=(n,{$h:t})=>{globalThis.container.get("WalletService");let e=globalThis.container.get("TransactionWebService");const r=n=>`${i+n}`;let a=n.transaction,o=n.event,i=n.base_uri,A=n.row_item_view_models,l=n.index;return()=>{return t`
    
        <tr class="${l%2==0?"alt-row":""}">

          <td class="image">
            <a href="${i}t/${o.tokenId}">
              <img src="${n=A[o.tokenId],n.coverImageGenerated?r("backup/export/images/"+n.coverImageId+".svg"):r("backup/generated/images/50x50/"+n.coverImageId+".webp")}" class="latest-img" alt="${A[o.tokenId].title}" height="50" width="50" /> 
            </a>
          </td>

          <td class="label-cell medium-only">

            <a href="${i}t/${o.tokenId}" class="title">
              ${A[o.tokenId].title}            
            </a>

          </td>
          <td>
            ${o.isMint?t`
              <a href="https://etherscan.io/tx/${a._id}" class="external" target="_blank">Mint</a>
            `:t`

              ${a?.transactionValue?.markets&&Object.keys(a?.transactionValue?.markets).length>0?t`
                <a href="https://etherscan.io/tx/${a._id}" class="external" target="_blank">Sold</a> on ${Array.from(Object.keys(a.transactionValue?.markets).map((n=>n))).join(", ")} ${a.transactionValue?.aggregator?" / "+a.transactionValue.aggregator:""}

              `:t`
                <a href="https://etherscan.io/tx/${a._id}" class="external" target="_blank">${o.event}</a>
              `}
              
            `}

            <p class="date">${moment(1e3*a.timestamp).fromNow()}</p>
          </td>

          <td class="numeric-cell">
            
            <strong>${a.transactionValue?.tokenPrice[o.tokenId]?.price.toFixed(5)}</strong> ${a.transactionValue?.tokenPrice[o.tokenId]?.currency} 
            ${a.transactionValue?.tokenPrice[o.tokenId]?.usdValue?t`
              <br />
              <span class="dollar-value">${e.abbreviateDollars(a.transactionValue?.tokenPrice[o.tokenId]?.usdValue,2)}</span>
            `:t` `}

           </td>
          <td class="numeric-cell medium-only">
            <a href="${i}u/?address=${o.fromAddress}" class="${o.fromAddress==a.from?"is-from":""}">
                  ${N(o.fromAddress)}
            </a> <span class="f7-icons">arrow_right</span>

            <a href="${i}u/?address=${o.toAddress}" class="${o.toAddress==a.from?"is-from":""}">
              ${N(o.toAddress)}
            </a>

          </td>
        </tr>
    `;var n}},$=(n,{$h:t})=>{globalThis.container.get("WalletService"),globalThis.container.get("TransactionWebService");const e=n=>`${o+n}`;let r=n.transaction,a=n.event,o=n.base_uri,i=n.row_item_view_models,A=n.index,l=(a?.namedArgs?.owner,a?.namedArgs?.approved);return r?.from,()=>{return t`
      <tr class="${A%2==0?"alt-row":""}">

          <td class="image">
            <a href="${o}t/${a.tokenId}">
              <img src="${n=i[a.tokenId],n.coverImageGenerated?e("backup/export/images/"+n.coverImageId+".svg"):e("backup/generated/images/50x50/"+n.coverImageId+".webp")}" class="latest-img" alt="${i[a.tokenId].title}" height="40" width="40" /> 
            </a>
          </td>

          <td class="label-cell medium-only">

            <a href="${o}t/${a.tokenId}" class="title">
              ${i[a.tokenId].title}            
            </a>

            
          </td>
          <td>
            <a href="https://etherscan.io/tx/${r._id}" class="external" target="_blank">${a.event}</a> <br />
            
            <p class="date">${moment(1e3*r.timestamp).fromNow()}</p>
          </td>

          <td class="numeric-cell"></td>
          <td class="medium-only numeric-cell">
            <a href="#">${l}</a>
          </td>
        </tr>
    `;var n}},H=(n,{$h:t})=>{globalThis.container.get("WalletService"),globalThis.container.get("TransactionWebService");let e=n.transaction,r=n.event,a=n.base_uri,o=n.index;return()=>t`
        <tr class="${o%2==0?"alt-row":""}">

          <td class="image">
            ${r.namedArgs.approved?t`🟢`:t`🔴`}
          </td>

          <td class="label-cell medium-only">
            
          </td>
          <td>
             <a href="https://etherscan.io/tx/${e._id}" class="external" target="_blank">${r.event}</a>  <br />

             <p class="date">${moment(1e3*e.timestamp).fromNow()}</p>
          </td>

          <td class="numeric-cell"></td>
          <td class="medium-only numeric-cell">
            <a href="${a}u/?address=${r.namedArgs.owner}" class="${r.namedArgs.owner==e.from?"is-from":""}">${N(r.namedArgs.owner)}</a> 
            <span class="f7-icons">arrow_right</span>
            <a href="${a}u/?address=${r.namedArgs.operator}" class="${r.namedArgs?.operator==e.from?"is-from":""}">${N(r.namedArgs.operator)}</a>
          </td>

        </tr>
    `},N=n=>{let t=globalThis.container.get("WalletService");return L?.ens&&L.ens[n]?L.ens[n]:t.truncateEthAddress(n)};let L;function K(n,{$:t,$on:e,$f7:r,$update:a}){globalThis.container.get("WalletService");let o=globalThis.container.get("baseURI");globalThis.moment,L=n.transactions;let i=n.items,A=n.token;return function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`
  
  <div class="card data-table">

    <div class="card-content">
      <table>
        <thead>
          <tr>
            <th class="image"></th>
            <th class="label-cell medium-only">Item</th>
            <th>Event</th>
            <th class="numeric-cell">Price</th>
            <th class="numeric-cell medium-only">From/To</th>
          </tr>
        </thead>
        <tbody>
          ${L?.transactions.map(((n,e)=>t`
  
            ${n.events?.map((r=>t`
  
              ${"Approval"!=r.event||A&&r?.tokenId!=A?t` `:t`
                <${$} transaction=${n.transaction} event=${r} base_uri=${o} row_item_view_models=${i} index="${e}" />
              `}
          
              ${"Transfer"!=r.event||A&&r?.tokenId!=A?t` `:t`
                <${V} transaction=${n.transaction} event=${r} base_uri=${o} row_item_view_models=${i} index="${e}"/>
              `}
          
              ${"ApprovalForAll"!=r.event||A&&r?.tokenId!=A?t` `:t`
                <${H} transaction=${n.transaction} event=${r} base_uri=${o} index="${e}"/>
              `}
          
            `))}
  
  
          `))}
        </tbody>
      </table>
    </div>

  </div>

`}}K.id="e3e5331355",K.style="\n\n";const J=K;function _(n,{$:t,$on:e,$f7:r,$update:a}){let o=globalThis.container.get("ItemWebService"),i=globalThis.container.get("baseURI");const A=n=>i+n;let l,s=!1;const p=async n=>{n.preventDefault(),t(".searchbar input").blur(),r.preloader.showIn(".cards-list"),s=!0,a(),l=await o.query(t(".searchbar input").val()),s=!1,a(),r.preloader.hideIn(".cards-list")};return function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div class="margin-top">



    <div class="block block-strong block-search">

      <form class="searchbar" @submit="${p}">
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

        ${l?t`
          
          ${l?.length>0?t`
          
            ${l?.map((n=>t`
              <li class="card item-card">
                <div class="card-content card-content-padding">
                  ${n.item.excerpt?t`
                  
                    <div class="item-preview">
    
                      <div class="left">
                        
                          <a class="title" href="${A(`token-${n.item.tokenId}.html`)}">
                              ${n.item.title}
                              <span class="channel-show-token-id">#${n.item.tokenId}</span>
                          </a>
    
                          <p innerHTML="${n.item.excerpt}">
                              
                          </p>
    
                      </div>
    
                      ${n.coverImage?t`
                        <div class="right">
                          <a class="title" href="${A(`token-${n.item.tokenId}.html`)}">
                            <img src="backup/export/images/${n.coverImage._id}.${n.coverImage.generated?"svg":"jpg"}" />
                          </a>
                        </div>
                      `:t`<span />`}
    
                    </div>
    
    
                  `:t`
                  
                    <div class="item-preview">
                      <div class="left">
    
                          <a class="title" href="${A(`t/${n.item.tokenId}`)}">
                            ${n.item.title} <span class="channel-show-token-id">#${n.item.tokenId}</span>
                          </a>
    
                          <div class="content" innerHTML="${n.item.contentHTML}"></div>
    
                      </div>
                    </div>
                  
                  `}
    
                </div>
              </li>                        
            `))}
    
          `:t`
              <li class="card item-card">
                <div class="card-content card-content-padding">
                  No results found
                </div>
              </li>
          `}
          
          
        `:t`<span />`}
  

  
      </ul>
  
    </div>

  </div>

`}}_.id="81de2dd0b2",_.style="\n\n.block-search {\n  background: #f1f1f1;\n  font-size: 14px;\n}\n\n";const nn=_;function tn(n,{$:t,$on:e,$f7:r,$update:a}){let o=n.baseurl,i=n.items;const A=n=>`${o+n}`;return function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

    <div class="row" id="item-list">
                            
        ${i?.length>0?t`
                                    
            ${i.map((n=>t`
                <div class="card col-100 large-25">
                    <div class="card-content">
                        <div class="card-content card-content-padding">
                            <div class="square">
                                <a href="${A(`token-${n.item.tokenId}.html`)}">
                                    <img src="${A(`backup/export/images/${n.coverImage._id}`)}.${n.coverImage.generated?"svg":"jpg"}" />
                                </a>
                            </div>

                            <div class="preview-info">
                                <a href="">${n.item.title?n.item.title+" ":""} #${n.item.tokenId}</a>
                            </div>
                        </div>
                    </div>
                </div>
            `))}


        `:t`<span />`}             
                                            
    </div>  
  
`}}tn.id="ab7cd89413",tn.style="\n";const en=tn;var rn=e(86492),an=e.n(rn),on=e(64594),An=e(96519),ln=e(45466),sn=e(61906),pn=function(n,t){return function(e,r){t(e,r,n)}};let dn=class{contracts;getProvider;$f7;wallet;address;ethersContracts={};provider;constructor(n,t,e){this.contracts=n,this.getProvider=t,this.$f7=e}async initProvider(){this.provider=this.getProvider(),globalThis.ethereum?.on("accountsChanged",(async n=>{delete this.address,n?.length>0&&await this.initWallet(),this.$f7.views.main.router.refreshPage()}))}async initWallet(){if(console.log("Init wallet"),delete this.address,this.provider||await this.initProvider(),(await this.provider.send("eth_accounts",[]))?.length>0)return this.connect();console.log("Init wallet complete")}async connect(){console.log("Connect wallet"),await this.provider.send("eth_requestAccounts",[]),this.wallet=await this.provider.getSigner(),this.address=await this.getAddress(),console.log(`Wallet ${this.address} connected`)}async getAddress(){if(!this.provider)return;let n=await this.provider.send("eth_accounts",[]);return n?.length>0?on.Kn(n[0]):void 0}async getWallet(){return this.provider.getSigner()}getContract(n){if(this.ethersContracts[n]&&this.ethersContracts[n].signer==this.wallet)return this.ethersContracts[n];let t=this.contracts[n];return this.ethersContracts[n]=new An.CH(t.address,t.abi,this.wallet?this.wallet:this.provider),this.ethersContracts[n]}truncateEthAddress(n){if(!n)return;const t=n.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);return t?`${t[1]}…${t[2]}`:n}};dn=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i}([(0,ln.b)(),pn(0,(0,sn.f)("contracts")),pn(1,(0,sn.f)("provider")),pn(2,(0,sn.f)("framework7")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Array,Function,Object])],dn);var cn=e(78648),fn=function(n,t){return function(e,r){t(e,r,n)}};let bn=class{baseURI;hostname;PouchDB;channelId;dbCache={};constructor(n,t,e,r){this.baseURI=n,this.hostname=t,this.PouchDB=e,this.channelId=r}async getDatabase(n){const t=`./pouch/${this.channelId()}/${n.name}`;if(this.dbCache[t])return this.dbCache[t];this.dbCache[t]=new this.PouchDB(t);const e=await this.dbCache[t].info();if(0==e.doc_count&&0==e.update_seq){if(n.changesets){console.log(`Creating indexes for ${t}`);let e={_id:"_local/changesets",ids:[]};for(let r of n.changesets)await r.changeset(this.dbCache[t]),e.ids.push(r.id),console.log(`New changeset detected...${r.id}`);await this.dbCache[t].put(e)}n.initialRecords&&await this.loadInitialRecords(n,t)}else if(n.changesets){let e;try{e=await this.dbCache[t].get("_local/changesets")}catch(n){}e||(e={_id:"_local/changesets",ids:[]});let r=!1;for(let a of n.changesets)if(!e.ids.includes(a.id)){try{await a.changeset(this.dbCache[t])}catch(n){}e.ids.push(a.id),r=!0,console.log(`New changeset detected...${a.id}`)}r&&(console.log("Saving changeset log...",e),await this.dbCache[t].put(e))}return this.dbCache[t]}async loadInitialRecords(n,t){let e;e=n.initialRecordsPath?await fetch(`${this.hostname}${this.baseURI}${n.initialRecordsPath}`):await fetch(`${this.hostname}${this.baseURI}backup/export/backup/${n.name}.json`);let r=await e.json();r?.length>0&&(console.log(`Loading ${r?.length} initial records for ${t}`),await this.dbCache[t].bulkDocs(r))}};bn=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i}([(0,ln.b)(),fn(0,(0,sn.f)("baseURI")),fn(1,(0,sn.f)("hostname")),fn(2,(0,sn.f)("PouchDB")),fn(3,(0,sn.f)("channelId")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[String,String,Object,Function])],bn);var Cn=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},gn=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},mn=function(n,t){return function(e,r){t(e,r,n)}};let hn=class{baseURI;hostname;changesets=[{id:"0",changeset:async n=>{await n.createIndex({index:{fields:["dateCreated"]}}),await n.createIndex({index:{fields:["lastUpdated"]}})}}];db;dbName="channels";databaseService;constructor(n,t){this.baseURI=n,this.hostname=t}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(){let n,t=await this.db.allDocs({include_docs:!0});for(let e of t.rows)e.doc.dateCreated&&(n=e.doc);const e=await cn.Z.get(`${this.hostname}${this.baseURI}backup/contract/contract.json`);return e?.data&&(n.contractAddress=e.data.contractAddress),n}};Cn([(0,sn.f)("DatabaseService"),gn("design:type",bn)],hn.prototype,"databaseService",void 0),hn=Cn([(0,ln.b)(),mn(0,(0,sn.f)("baseURI")),mn(1,(0,sn.f)("hostname")),gn("design:paramtypes",[Object,Object])],hn);class un{_id;_rev;channelId;tokenId;title;link;description;content;contentHTML;excerpt;authorId;category;attributeSelections;coverImageId;coverImageAsAnimation;originalJSONMetadata;animationId;datePublished;dateCreated;lastUpdated}var En=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},vn=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},Bn=function(n,t){return function(e,r){t(e,r,n)}};let xn=class{baseURI;hostname;static CHUNK_SIZE=10;changesets=[{id:"0",changeset:async n=>{await n.createIndex({index:{fields:["tokenId"]}}),await n.search({build:!0,fields:["contentHTML","title","tokenId"]})}}];db;dbName="items";databaseService;constructor(n,t){this.baseURI=n,this.hostname=t}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(n){return Object.assign(new un,await this.db.get(n))}async put(n){await this.db.put(n)}async list(n,t=10){return(await this.db.find({selector:{tokenId:{$exists:!0}},sort:[{tokenId:"asc"}],limit:t,skip:n})).docs}async getByTokenId(n){let t=await this.db.find({selector:{tokenId:{$eq:n}},limit:1});if(t.docs?.length>0)return t.docs[0]}async getByTokenIds(n){let t=await this.db.find({selector:{tokenId:{$in:n}}});return t.docs?.length>0?t.docs:[]}async getRowItemViewModelsByAttribute(n,t,e){const r=n=>n.replace(/[^a-z0-9]/gi,"_").toLowerCase();let a;return a=(await cn.Z.get(`${this.hostname}${this.baseURI}attributes/items/${r(n)}/${r(t)}/${e}.json`)).data,a}async getRowItemViewModelsByOwner(n,t){let e;return e=(await cn.Z.get(`${this.hostname}${this.baseURI}sync/tokenOwner/${n}/tokens/${t}.json`)).data,e}async getRowItemViewModelsByTokenIds(n){let t=[];for(let e of n){const n=await cn.Z.get(`${this.hostname}${this.baseURI}t/${e}/rowItemViewModel.json`);t.push(n.data)}return t}async getRowItemViewModelsByTokenId(n){return(await cn.Z.get(`${this.hostname}${this.baseURI}t/${n}/rowItemViewModel.json`)).data}async listByTokenId(n,t){return(await this.db.find({selector:{tokenId:{$eq:n}},sort:[{tokenId:"desc"}],limit:t})).docs}async query(n){return(await this.db.search({query:n,fields:["contentHTML","title","tokenId"],include_docs:!0,highlighting:!0,limit:10})).rows.map((n=>(n.highlighting.contentHTML&&(n.doc.contentHTML=n.highlighting.contentHTML),n.doc.contentHTML=n.doc.contentHTML.replace(/<img .*?>/g,""),n.doc)))}async all(){return(await this.db.find({selector:{tokenId:{$exists:!0}},sort:[{tokenId:"asc"}],limit:1e5,skip:0})).docs}};En([(0,sn.f)("DatabaseService"),vn("design:type",bn)],xn.prototype,"databaseService",void 0),xn=En([(0,ln.b)(),Bn(0,(0,sn.f)("baseURI")),Bn(1,(0,sn.f)("hostname")),vn("design:paramtypes",[Object,Object])],xn);class wn{_id;_rev;walletAddress;name;description;url;coverPhotoId;dateCreated;lastUpdated}var kn=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},yn=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Dn=class{db;dbName="authors";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(n){return Object.assign(new wn,await this.db.get(n))}};kn([(0,sn.f)("DatabaseService"),yn("design:type",bn)],Dn.prototype,"databaseService",void 0),Dn=kn([(0,ln.b)(),yn("design:paramtypes",[])],Dn);class zn{tokenId;name;description;image;image_data;external_url;attributes;background_color;animation_url}var In=function(n,t){return function(e,r){t(e,r,n)}};let Wn=class{baseURI;hostname;static CHUNK_SIZE=10;constructor(n,t){this.baseURI=n,this.hostname=t}async get(n){const t=await cn.Z.get(`${this.hostname}${this.baseURI}backup/metadata/${n}.json`);return Object.assign(new zn,t.data)}};Wn=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i}([(0,ln.b)(),In(0,(0,sn.f)("baseURI")),In(1,(0,sn.f)("hostname")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[String,String])],Wn);class jn{_id;data;cid;buffer;svg;generated}var Yn=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Fn=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let qn=class{db;dbName="images";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(n){return Object.assign(new jn,await this.db.get(n))}async list(){}};Yn([(0,sn.f)("DatabaseService"),Fn("design:type",bn)],qn.prototype,"databaseService",void 0),qn=Yn([(0,ln.b)(),Fn("design:paramtypes",[])],qn);class Sn{_id;_rev;content;cid;dateCreated}var Un=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Xn=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Rn=class{db;dbName="animations";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(n){return Object.assign(new Sn,await this.db.get(n))}};Un([(0,sn.f)("DatabaseService"),Xn("design:type",bn)],Rn.prototype,"databaseService",void 0),Rn=Un([(0,ln.b)(),Xn("design:paramtypes",[])],Rn);class Zn{_id;_rev;channelId;name;slug;content;contentHTML;contentMarkdown;locations;dateCreated;lastUpdated}var Gn=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},On=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Mn=class{changesets=[{id:"0",changeset:async n=>{await n.createIndex({index:{fields:["channelId"]}}),await n.createIndex({index:{fields:["dateCreated"]}})}}];db;dbName="static-pages";databaseService;constructor(){}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(n){return Object.assign(new Zn,await this.db.get(n))}async listByLocation(n,t){return(await this.db.find({selector:{locations:{$all:[n]},dateCreated:{$exists:!0}},sort:[{dateCreated:"asc"}],skip:t})).docs}};Gn([(0,sn.f)("DatabaseService"),On("design:type",bn)],Mn.prototype,"databaseService",void 0),Mn=Gn([(0,ln.b)(),On("design:paramtypes",[])],Mn);var Tn=function(n,t){return function(e,r){t(e,r,n)}};let Pn=class{baseURI;hostname;constructor(n,t){this.baseURI=n,this.hostname=t}async get(n){return(await cn.Z.get(`${this.hostname}${this.baseURI}itemPages/${n}.json`)).data}};Pn=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i}([(0,ln.b)(),Tn(0,(0,sn.f)("baseURI")),Tn(1,(0,sn.f)("hostname")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Object,Object])],Pn);class Qn{_id;traitType;value;count;categoryPercent;tokenIds}var Vn=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},$n=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Hn=class{db;dbName="attribute-totals";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0,initialRecordsPath:"attributeTotals.json"})}constructor(){}async get(n){return Object.assign(new Qn,await this.db.get(n))}async getByIds(n){return(await this.db.allDocs({keys:n,include_docs:!0})).rows?.map((n=>n.doc))}async put(n){await this.db.put(n)}async list(n,t){return(await this.db.find({selector:{count:{$exists:!0}},limit:n,skip:t})).docs}};Vn([(0,sn.f)("DatabaseService"),$n("design:type",bn)],Hn.prototype,"databaseService",void 0),Hn=Vn([(0,ln.b)(),$n("design:paramtypes",[])],Hn);var Nn=e(25494),Ln=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Kn=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};class Jn{_id;_rev;currentPage;lastPageJump;dateCreated;lastUpdated}Ln([(0,Nn.a)(),Kn("design:type",String)],Jn.prototype,"_id",void 0),Ln([(0,Nn.a)(),Kn("design:type",String)],Jn.prototype,"_rev",void 0),Ln([(0,Nn.a)(),Kn("design:type",Number)],Jn.prototype,"currentPage",void 0),Ln([(0,Nn.a)(),Kn("design:type",Number)],Jn.prototype,"lastPageJump",void 0),Ln([(0,Nn.a)(),Kn("design:type",String)],Jn.prototype,"dateCreated",void 0),Ln([(0,Nn.a)(),Kn("design:type",String)],Jn.prototype,"lastUpdated",void 0);var _n=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},nt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let tt=class{db;dbName="reader-settings";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1})}constructor(){}async put(n){n._id="reader-settings",await this.db.put(n)}async get(){let n;try{n=await this.db.get("reader-settings")}catch(n){}return n||(n=new Jn,n._id="reader-settings"),Object.assign(new Jn,n)}};_n([(0,sn.f)("DatabaseService"),nt("design:type",bn)],tt.prototype,"databaseService",void 0),tt=_n([(0,ln.b)(),nt("design:paramtypes",[])],tt);class et{}var rt=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},at=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let ot=class{baseURI;constructor(){}async get(n){try{let t=await cn.Z.get(`${this.baseURI}sync/tokens/${n}/token.json`);return Object.assign(new et,t.data)}catch(n){console.log(n)}}};rt([(0,sn.f)("baseURI"),at("design:type",Object)],ot.prototype,"baseURI",void 0),ot=rt([(0,ln.b)(),at("design:paramtypes",[])],ot);var it=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},At=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let lt=class{authorRepository;walletService;constructor(){}async get(n){return this.authorRepository.get(n)}getDisplayName(n){if(n)return n.name?n.name:this.walletService.truncateEthAddress(n._id)}};it([(0,sn.f)("AuthorRepository"),At("design:type",Object)],lt.prototype,"authorRepository",void 0),it([(0,sn.f)("WalletService"),At("design:type",Object)],lt.prototype,"walletService",void 0),lt=it([(0,ln.b)(),At("design:paramtypes",[])],lt);var st=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},pt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let dt=class{channelRepository;constructor(){}async get(){return this.channelRepository.get()}};st([(0,sn.f)("ChannelRepository"),pt("design:type",Object)],dt.prototype,"channelRepository",void 0),dt=st([(0,ln.b)(),pt("design:paramtypes",[])],dt);let ct=class{constructor(){}buildPagingViewModel(n,t,e,r){let a=new ft;return a.offset=n||0,a.limit=t,a.count=e,a.start=a.offset+1,a.end=Math.min(a.offset+t,e),a.previousOffset=Math.max(a.offset-t,0),a.offset+t<e&&(a.nextOffset=a.offset+t),a.page=a.offset/a.limit+1,a.page>a.endPage&&(a.page=a.endPage),a.endPage=Math.ceil(a.count/a.limit),a.lastOffset=a.endPage*a.limit-a.limit,a.showNext=a.endPage>a.page,a.showPrevious=0!=a.offset,a.showFirst=a.page>2,a.showLast=a.page<a.endPage-1,a}calculateEndIndex(n,t,e){let r=t+n-1;return Math.min(e-1,r)}calculateDescendingEndIndex(n,t){let e=t-(n-1);return Math.max(0,e)}calculateDescendingOffset(n,t){let e=t-1-n;return Math.max(0,e)}};ct=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i}([(0,ln.b)(),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[])],ct);class ft{page;pageNumbers;endPage;offset;limit;count;start;end;previousOffset;nextOffset;lastOffset;showPrevious;showNext;showFirst;showLast}var bt=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Ct=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let gt=class{attributeTotalRepository;constructor(){}async get(n){return this.attributeTotalRepository.get(n)}async put(n){return this.attributeTotalRepository.put(n)}async getByIds(n){return this.attributeTotalRepository.getByIds(n)}async list(){return this.attributeTotalRepository.list()}async buildAttributeTotals(n,t){let e=[],r=new Set(t.map((n=>n.attributeSelections.map((n=>`${n.traitType}:::${n.value}`)))).flat());for(let n of r){let t={_id:n,traitType:n.substring(0,n.indexOf(":::")),value:n.substring(n.indexOf(":::")+3,n.length),count:0,tokenIds:[]};e.push(t)}for(let n of t)for(let t of n.attributeSelections){let r=e.filter((n=>n.traitType==t.traitType&&n.value==t.value))[0];r.tokenIds.push(n.tokenId),r.count++}for(let t of e)t.categoryPercent=new Intl.NumberFormat("default",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(t.count/n.itemCount);return e.sort(((n,t)=>t.count-n.count)),e}};bt([(0,sn.f)("AttributeTotalRepository"),Ct("design:type",Object)],gt.prototype,"attributeTotalRepository",void 0),gt=bt([(0,ln.b)(),Ct("design:paramtypes",[])],gt);var mt=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},ht=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let ut=class{itemRepository;attributeTotalService;constructor(){}async get(n){return this.itemRepository.get(n)}async list(n,t){return this.itemRepository.list(n,t)}async query(n){return this.itemRepository.query(n)}async all(){return this.itemRepository.all()}async getByTokenId(n){return this.itemRepository.getByTokenId(n)}async getByTokenIds(n){return this.itemRepository.getByTokenIds(n)}async getRowItemViewModelsByAttribute(n,t,e){return this.itemRepository.getRowItemViewModelsByAttribute(n,t,e)}async getRowItemViewModelsByOwner(n,t){return this.itemRepository.getRowItemViewModelsByOwner(n,t)}async getRowItemViewModelsByTokenIds(n){return this.itemRepository.getRowItemViewModelsByTokenIds(n)}async getRowItemViewModelsByTokenId(n){return this.itemRepository.getRowItemViewModelsByTokenId(n)}async listByTokenId(n,t=10){return this.itemRepository.listByTokenId(n,t)}async buildAttributeTotals(n){let t=await this.all();return this.attributeTotalService.buildAttributeTotals(n,t)}};mt([(0,sn.f)("ItemRepository"),ht("design:type",Object)],ut.prototype,"itemRepository",void 0),mt([(0,sn.f)("AttributeTotalService"),ht("design:type",gt)],ut.prototype,"attributeTotalService",void 0),ut=mt([(0,ln.b)(),ht("design:paramtypes",[])],ut);var Et=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},vt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Bt=class{staticPageRepository;constructor(){}async get(n){return this.staticPageRepository.get(n)}async listByLocation(n,t){return this.staticPageRepository.listByLocation(n,t)}async listRoutablePages(n){let t=[];if(n?.length>0&&t.push(...n),t=t.concat(await this.staticPageRepository.listByLocation("navbar",0)),t=t.concat(await this.staticPageRepository.listByLocation("links",0)),t=JSON.parse(JSON.stringify(t)),t?.length>0)for(let n of t)delete n?.content,delete n?.contentHTML,delete n?.contentMarkdown;return t}};Et([(0,sn.f)("StaticPageRepository"),vt("design:type",Object)],Bt.prototype,"staticPageRepository",void 0),Bt=Et([(0,ln.b)(),vt("design:paramtypes",[])],Bt);var xt=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},wt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let kt=class{channelService;authorService;pagingService;itemService;walletService;staticPageService;constructor(){}async get(n,t){return this.getViewModel(await this.channelService.get(),n,t)}async getViewModel(n,t,e){let r;n.authorId&&(r=await this.authorService.get(n.authorId));let a=n.itemCount,o=this.pagingService.buildPagingViewModel(t,10,a,5),i=["navbar","links","index","none"],A={};for(let n of i)A[n]=await this.staticPageService.listByLocation(n,0);if(e?.length>0)for(let n of e)for(let t of n?.locations)A[t].push(n);return{channelContractAbbrev:n.contractAddress?this.walletService.truncateEthAddress(n.contractAddress):void 0,channel:n,staticPagesViewModel:A,author:r,authorDisplayName:this.authorService.getDisplayName(r),itemCount:a,pagingViewModel:o}}};xt([(0,sn.f)("ChannelService"),wt("design:type",dt)],kt.prototype,"channelService",void 0),xt([(0,sn.f)("AuthorService"),wt("design:type",lt)],kt.prototype,"authorService",void 0),xt([(0,sn.f)("PagingService"),wt("design:type",ct)],kt.prototype,"pagingService",void 0),xt([(0,sn.f)("ItemService"),wt("design:type",ut)],kt.prototype,"itemService",void 0),xt([(0,sn.f)("WalletService"),wt("design:type",Object)],kt.prototype,"walletService",void 0),xt([(0,sn.f)("StaticPageService"),wt("design:type",Bt)],kt.prototype,"staticPageService",void 0),kt=xt([(0,ln.b)(),wt("design:paramtypes",[])],kt);var yt=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Dt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let zt=class{animationRepository;constructor(){}async get(n){return this.animationRepository.get(n)}};yt([(0,sn.f)("AnimationRepository"),Dt("design:type",Object)],zt.prototype,"animationRepository",void 0),zt=yt([(0,ln.b)(),Dt("design:paramtypes",[])],zt);var It=e(88554),Wt=e(99810);let jt=class{constructor(){}async translateContent(n){if(!n?.ops)return"";const t=new It.bc(n.ops,{});return t.renderCustomWith((function(n,t){if("divider"===n.insert.type)return"<hr />";if("ipfsimage"===n.insert.type){let t=`<img src="${n.insert.value.src}" `;return n.insert.value.width&&(t+=`width="${n.insert.value.width}" `),n.insert.value.height&&(t+=`height="${n.insert.value.height}" `),n.insert.value.style&&(t+=`style="${n.insert.value.style}"`),t+="/>",t}})),t.convert()}async generateMarkdown(n){return(0,Wt.deltaToMarkdown)(n)}};jt=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i}([(0,ln.b)(),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[])],jt);var Yt=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Ft=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let qt=class{itemRepository;channelRepository;authorRepository;imageRepository;animationRepository;staticPageRepository;readerSettingsRepository;attributeTotalRepository;componentStateRepository;constructor(){}async load(n){const t=[];t.push(this.itemRepository),t.push(this.channelRepository),t.push(this.authorRepository),t.push(this.imageRepository),t.push(this.animationRepository),t.push(this.staticPageRepository),t.push(this.readerSettingsRepository),t.push(this.staticPageRepository),t.push(this.readerSettingsRepository),t.push(this.attributeTotalRepository),t.push(this.componentStateRepository);for(let e of n){let n=t.filter((n=>n.dbName==e))[0];n&&(n.db||await n.load())}}async loadWallet(n){console.log(`Loading wallet: ${n}`)}};Yt([(0,sn.f)("ItemRepository"),Ft("design:type",Object)],qt.prototype,"itemRepository",void 0),Yt([(0,sn.f)("ChannelRepository"),Ft("design:type",Object)],qt.prototype,"channelRepository",void 0),Yt([(0,sn.f)("AuthorRepository"),Ft("design:type",Object)],qt.prototype,"authorRepository",void 0),Yt([(0,sn.f)("ImageRepository"),Ft("design:type",Object)],qt.prototype,"imageRepository",void 0),Yt([(0,sn.f)("AnimationRepository"),Ft("design:type",Object)],qt.prototype,"animationRepository",void 0),Yt([(0,sn.f)("StaticPageRepository"),Ft("design:type",Object)],qt.prototype,"staticPageRepository",void 0),Yt([(0,sn.f)("ReaderSettingsRepository"),Ft("design:type",Object)],qt.prototype,"readerSettingsRepository",void 0),Yt([(0,sn.f)("AttributeTotalRepository"),Ft("design:type",Object)],qt.prototype,"attributeTotalRepository",void 0),Yt([(0,sn.f)("ComponentStateRepository"),Ft("design:type",Object)],qt.prototype,"componentStateRepository",void 0),qt=Yt([(0,ln.b)(),Ft("design:paramtypes",[])],qt);var St=e(42555),Ut=e.n(St),Xt=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Rt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Zt=class{imageRepository;constructor(){}async get(n){return this.imageRepository.get(n)}async list(){return this.imageRepository.list()}async getUrl(n){return n.buffer||n.svg?n.buffer?this.bufferToDataURL("image/jpg",n.buffer):n.svg?this.getSVGURL(n):void 0:""}async getSVGURL(n){return n.svg?this.svgToDataURL(n.svg):""}svgToDataURL(n){return Ut()(n)}bufferToDataURL(n,t){return`data:${n};base64,${t.toString("base64")}`}};Xt([(0,sn.f)("ImageRepository"),Rt("design:type",Object)],Zt.prototype,"imageRepository",void 0),Zt=Xt([(0,ln.b)(),Rt("design:paramtypes",[])],Zt);var Gt=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Ot=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Mt=class{itemPageRepository;constructor(){}async get(n){return this.itemPageRepository.get(n)}};Gt([(0,sn.f)("ItemPageRepository"),Ot("design:type",Object)],Mt.prototype,"itemPageRepository",void 0),Mt=Gt([(0,ln.b)(),Ot("design:paramtypes",[])],Mt);var Tt=e(3969),Pt=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Qt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};const Vt=new Tt.DOMParser;let $t=class{itemService;channelService;authorService;imageService;schemaService;quillService;animationService;itemPageService;attributeTotalService;baseURI;allTokensCache;constructor(){}async get(n){let t=await this.itemService.get(n);const e=await this.channelService.get(),r=await this.attributeTotalService.list();return this.getViewModel(t,e,r)}async getByTokenId(n){return this.itemService.getByTokenId(n)}async getViewModel(n,t,e){let r,a,o,i,A=[];if(t.authorId&&(r=await this.authorService.get(t.authorId)),t.attributeOptions.length>0)for(let r of t.attributeOptions){let t=n?.attributeSelections?.filter((n=>r?.traitType==n?.traitType)),a=t?.length>0?t[0].value:void 0,o=e.filter((n=>n.traitType==r.traitType))?.filter((n=>n.value==a));A.push({id:r.id,traitType:r.traitType,values:r.values,value:a,attributeTotal:o?.length>0?o[0]:void 0})}if(n.coverImageId&&(a=await this.imageService.get(n.coverImageId)),n.animationId&&!n.coverImageAsAnimation){o=await this.animationService.get(n.animationId);let t=Vt.parseFromString(o.content,"text/html").getElementsByTagName("body")[0];i=an().unescape((new Tt.B).serializeToString(t)),i="<div"+i.slice(5),i=i.substring(0,i.length-7)+"</div>"}if(n.content?.ops?.length>0){let t=[];for(let e of n.content.ops){if(e.insert&&e.insert.ipfsimage){let n=await this.imageService.get(e.insert.ipfsimage.cid);e.insert.ipfsimage.src=await this.imageService.getUrl(n)}t.push(e)}n.content.ops=t}return{item:n,animation:o,animationContentHTML:i,contentHTML:await this.quillService.translateContent(n.content),channel:t,author:r,authorDisplayName:this.authorService.getDisplayName(r),attributeSelections:A,coverImage:a}}async getMintViewModel(n,t){let e;return n.coverImageId&&(e=await this.imageService.get(n.coverImageId)),{item:n,animation:void 0,channel:t,author:void 0,attributeSelections:[],coverImage:e}}async getSearchViewModel(n,t){return{item:n,animation:void 0,channel:t,author:void 0,attributeSelections:[]}}async getExploreAttributeOptions(n){await this.schemaService.load(["channels","authors","attribute-totals"]);const t=await this.channelService.get();let e=await this.attributeTotalService.list(),r=t.attributeOptions,a=[];for(let t of r){let r=[];for(let a of t.values.sort()){let o=JSON.parse(JSON.stringify(n));delete o[t.traitType];let i=await this._paramsToFilteredIds(o,e),A=e.filter((n=>n.traitType==t.traitType&&n.value==a))[0];A?r.push({value:a,count:A.tokenIds.filter((n=>i.includes(n))).length}):console.log(`${t.traitType} / ${a} totals not found.`)}r.sort(((n,t)=>t.count-n.count));let o={id:t.id,traitType:t.traitType,values:r};a.push(o)}return a}async exploreList(n,t,e){if(await this.schemaService.load(["channels","authors","attribute-totals"]),n&&Object.keys(n)?.length>0)return this.exploreQuery(n,t,e);{let n=t/e,r=await this.itemPageService.get(n),a=await this.channelService.get();return{items:r.items,totalMatches:a.itemCount,limit:e,skip:t}}}async exploreQuery(n,t,e){await this.schemaService.load(["channels","authors","attribute-totals"]);let r=await this.attributeTotalService.list(),a=await this._paramsToFilteredIds(n,r),o=a.length;return a=a.slice(t,t+e),{items:await this.itemService.getRowItemViewModelsByTokenIds(a),totalMatches:o,limit:e,skip:t}}async _paramsToFilteredIds(n,t){let e=[];for(let t of Object.keys(n))e.push(`${t}:::${n[t]}`);let r=t?.filter((n=>e?.includes(n._id)));return r?.length>0?r.map((n=>n.tokenIds)).reduce(((n,t)=>n.filter((n=>t.includes(n))))):(this.allTokensCache||(this.allTokensCache=Array.from(new Set(t.map((n=>n.tokenIds)).flat()))),this.allTokensCache)}async list(n,t){let e=[];const r=await this.channelService.get(),a=await this.itemService.buildAttributeTotals(r);let o=await this.itemService.list(n,t);for(let n of o)e.push(await this.getViewModel(n,r,a));return e}async mintList(n,t){let e=[];const r=await this.channelService.get();let a=await this.itemService.list(n,t);for(let n of a)e.push(await this.getMintViewModel(n,r));return e}async itemPage(n){return this.itemPageService.get(n)}async attributeItemPage(n,t,e){return this.itemService.getRowItemViewModelsByAttribute(n,t,e)}async ownerItemPage(n,t){return this.itemService.getRowItemViewModelsByOwner(n,t)}async query(n){await this.schemaService.load(["items","channels"]);let t=await this.itemService.query(n);const e=await this.channelService.get();let r=[];for(let n of t)r.push(await this.getSearchViewModel(n,e));return r}async buildItemPages(n,t){let e=[],r=[];for(let t of n){let n=t.item;r.push({_id:n._id,coverImageGenerated:!!t.coverImage.generated,coverImageId:t.coverImage._id,title:`${n.title?n.title:`#${n.tokenId}`}`,tokenId:n.tokenId})}for(let n=0;n<r.length;n+=t)e.push({items:r.slice(n,n+t)});return e}async buildAttributeTotals(n){return this.itemService.buildAttributeTotals(n)}async getRowItemViewModelsByTokenIds(n){return this.itemService.getRowItemViewModelsByTokenIds(n)}translateRowItemViewModel(n,t){return{_id:n._id,coverImageGenerated:!!t.generated,coverImageId:t._id,title:`${n.title?n.title:`#${n.tokenId}`}`,tokenId:n.tokenId}}};Pt([(0,sn.f)("ItemService"),Qt("design:type",ut)],$t.prototype,"itemService",void 0),Pt([(0,sn.f)("ChannelService"),Qt("design:type",dt)],$t.prototype,"channelService",void 0),Pt([(0,sn.f)("AuthorService"),Qt("design:type",lt)],$t.prototype,"authorService",void 0),Pt([(0,sn.f)("ImageService"),Qt("design:type",Zt)],$t.prototype,"imageService",void 0),Pt([(0,sn.f)("SchemaService"),Qt("design:type",qt)],$t.prototype,"schemaService",void 0),Pt([(0,sn.f)("QuillService"),Qt("design:type",jt)],$t.prototype,"quillService",void 0),Pt([(0,sn.f)("AnimationService"),Qt("design:type",zt)],$t.prototype,"animationService",void 0),Pt([(0,sn.f)("ItemPageService"),Qt("design:type",Mt)],$t.prototype,"itemPageService",void 0),Pt([(0,sn.f)("AttributeTotalService"),Qt("design:type",gt)],$t.prototype,"attributeTotalService",void 0),Pt([(0,sn.f)("baseURI"),Qt("design:type",String)],$t.prototype,"baseURI",void 0),$t=Pt([(0,ln.b)(),Qt("design:paramtypes",[])],$t);var Ht=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Nt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Lt=class{authorService;constructor(){}async get(n){return this.getViewModel(await this.authorService.get(n))}async getViewModel(n){return{author:n,authorDisplayName:this.authorService.getDisplayName(n)}}};Ht([(0,sn.f)("AuthorService"),Nt("design:type",lt)],Lt.prototype,"authorService",void 0),Lt=Ht([(0,ln.b)(),Nt("design:paramtypes",[])],Lt);var Kt=e(32046),Jt=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},_t=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let ne=class{metadataRepository;walletService;constructor(){}lastMintedTokenId=0;get channelContract(){let n=this.walletService.getContract("Channel");if(this.walletService.provider&&0==this.walletService.provider.listeners()?.length){let t={address:n.address,topics:[Kt.id("MintEvent(uint256)")]};this.walletService.provider.on(t,(async n=>{let t=parseInt(n.data);if(t>this.lastMintedTokenId){this.lastMintedTokenId=t;let n=new CustomEvent("mint-event");n.tokenId=t,document.dispatchEvent(n)}}))}return this.walletService.getContract("Channel")}async getBalance(n){return n?parseInt(await this.channelContract.balanceOf(n)):0}async getMetadata(n){return this.metadataRepository.get(n)}async mint(n,t){await this.channelContract.mint(n,{value:t})}async mintFromStartOrFail(n,t,e){await this.channelContract.mintFromStartOrFail(n,t,{value:e})}async mintAsOwner(n){await this.channelContract.mint(n,{})}async ownerOf(n){return this.channelContract.ownerOf(n)}async getTotalMinted(){return this.channelContract.totalMinted()}async getTotalSupply(){return this.channelContract.totalSupply()}async owner(){return this.channelContract.owner()}};Jt([(0,sn.f)("MetadataRepository"),_t("design:type",Object)],ne.prototype,"metadataRepository",void 0),Jt([(0,sn.f)("WalletService"),_t("design:type",Object)],ne.prototype,"walletService",void 0),ne=Jt([(0,ln.b)(),_t("design:paramtypes",[])],ne);var te=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},ee=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let re=class{tokenContractService;channelService;itemWebService;itemService;schemaService;walletService;constructor(){}async getMintingViewModel(){await this.schemaService.load(["channels","items"]);let n=await this.channelService.get();if(n.contractAddress){let t=await this.tokenContractService.getTotalMinted(),e=[];if(t?.gt(0)){let n=await this.itemService.listByTokenId(t.toNumber());for(let t of n)try{let n=await this.tokenContractService.ownerOf(t.tokenId);e.push({owner:await this.walletService.truncateEthAddress(n),item:t})}catch(n){}}return{totalMinted:t.toNumber(),totalSupply:n.itemCount,mintPrice:n.mintPrice,lastMinted:e,minting:t.toNumber()<n.itemCount}}}async getHomeMintingViewModel(){await this.schemaService.load(["channels"]);let n=await this.channelService.get();if(n.contractAddress)return{totalMinted:(await this.tokenContractService.getTotalMinted()).toNumber(),totalSupply:n.itemCount,mintPrice:n.mintPrice}}async mint(n){await this.schemaService.load(["channels"]);let t=await this.channelService.get(),e=this.calculateTotalMint(t,n),r=await this.tokenContractService.owner();this.walletService.address.toLowerCase()==r.toLowerCase()?(console.log("Minting as owner"),await this.tokenContractService.mintAsOwner(n)):await this.tokenContractService.mint(n,e)}async mintFromStartOrFail(n,t){await this.schemaService.load(["channels"]);let e=await this.channelService.get(),r=this.calculateTotalMint(e,n);await this.tokenContractService.mintFromStartOrFail(n,t,r)}calculateTotalMint(n,t){return globalThis.ethers.utils.parseUnits(n.mintPrice,"ether").mul(t).toString()}};te([(0,sn.f)("TokenContractService"),ee("design:type",ne)],re.prototype,"tokenContractService",void 0),te([(0,sn.f)("ChannelService"),ee("design:type",dt)],re.prototype,"channelService",void 0),te([(0,sn.f)("ItemWebService"),ee("design:type",$t)],re.prototype,"itemWebService",void 0),te([(0,sn.f)("ItemService"),ee("design:type",ut)],re.prototype,"itemService",void 0),te([(0,sn.f)("SchemaService"),ee("design:type",qt)],re.prototype,"schemaService",void 0),te([(0,sn.f)("WalletService"),ee("design:type",Object)],re.prototype,"walletService",void 0),re=te([(0,ln.b)(),ee("design:paramtypes",[])],re);var ae=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},oe=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let ie=class{itemWebService;constructor(){}async init(n){n.searchbar.create({el:".searchbar",customSearch:!0,on:{enable:function(){console.log("Searchbar enabled")},search:(n,t,e)=>{}}})}async destroy(n){n.searchbar.destroy(".searchbar")}};ae([(0,sn.f)("ItemWebService"),oe("design:type",$t)],ie.prototype,"itemWebService",void 0),ie=ae([(0,ln.b)(),oe("design:paramtypes",[])],ie);let Ae=class{app;constructor(n){this.app=n}async queuePromiseView(n){const t=this;let e={id:pe.newGuid(),icon:n.icon,title:n.title};return async function(){return new Promise(((n,r)=>{t._beforeSaveAction(e),n()}))}().then((async function(){let r=await n.promise;try{console.log("Transaction hash is ",r),t._showSuccess(r,e)}catch(n){t._showError(n,e)}return r}))}_beforeSaveAction(n){n.toast=this.app.toast.create({text:n.title,closeButton:!0}),n.toast.open()}_showError(n,t){t.toast.close(),console.log(n);let e={text:n.message,closeButton:!0,closeButtonText:"Close",closeTimeout:5e3};this.app.toast.create(e).open()}_showSuccess(n,t){t.toast.close(),this.app.toast.create({text:"Transaction Submitted",closeButton:!0,closeTimeout:5e3}).open()}};var le,se;Ae=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i}([(0,ln.b)(),(le=0,se=(0,sn.f)("framework7"),function(n,t){se(n,t,le)}),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Object])],Ae);class pe{static newGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(n){var t=16*Math.random()|0;return("x"==n?t:3&t|8).toString(16)}))}}let de=class{app;constructor(n){this.app=n}showExceptionPopup(n){console.log(n),this.app.dialog.alert(n.message,"There was an error")}showPopup(n){this.app.dialog.alert(n)}showAlert(n){this.app.dialog.alert(n)}spinnerDialog;showSpinner(n){this.spinnerDialog&&this.hideSpinner(),this.spinnerDialog=this.app.dialog.preloader(n||"Loading")}hideSpinner(){this.spinnerDialog&&(this.spinnerDialog.close(),this.spinnerDialog=null)}progressDialog;showProgress(n){this.progressDialog&&this.hideProgress(),this.progressDialog=this.app.dialog.progress(n||"Loading",0)}setProgress(n,t){this.progressDialog&&(this.progressDialog.setProgress(n),this.progressDialog.setText(t))}hideProgress(){this.progressDialog&&(this.progressDialog.close(),this.progressDialog=null)}};de=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i}([(0,ln.b)(),function(n,t){return function(e,r){t(e,r,n)}}(0,(0,sn.f)("framework7")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Object])],de);class ce extends Error{errors;constructor(n){super(),this.errors=n}}var fe=e(77743),be=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Ce=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let ge=class{readerSettingsRepository;schemaService;constructor(){}async get(){return await this.schemaService.load(["reader-settings"]),this.readerSettingsRepository.get()}async put(n){n.lastUpdated=(new Date).toJSON();let t=await(0,fe.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new ce(t);await this.readerSettingsRepository.put(n)}async updateCurrentPage(n){let t=await this.get();t.currentPage=n,await this.put(t)}};be([(0,sn.f)("ReaderSettingsRepository"),Ce("design:type",Object)],ge.prototype,"readerSettingsRepository",void 0),be([(0,sn.f)("SchemaService"),Ce("design:type",qt)],ge.prototype,"schemaService",void 0),ge=be([(0,ln.b)(),Ce("design:paramtypes",[])],ge);var me=e(2593);class he{_id;_rev;removed;address;data;topics;logIndex;args;event;eventSignature;isTransfer;isMint;isBurn;namedArgs;lastUpdated;dateCreated}let ue=class{constructor(){}async translateEventToERCEvent(n){let t=new he;switch(t.removed=n.removed,t.address=n.address,t.data=n.data,t.topics=n.topics,t.logIndex=n.logIndex,t.event=n.event,t.eventSignature=n.eventSignature,t.dateCreated=(new Date).toJSON(),t.args=n.args.map((n=>me.O$.isBigNumber(n)?n.toString():n)),t.namedArgs={},t.event){case"Transfer":t.isTransfer=!0,t.namedArgs.fromAddress=t.args[0],t.namedArgs.toAddress=t.args[1],t.namedArgs.tokenId=t.args[2];break;case"Approval":t.namedArgs.owner=t.args[0],t.namedArgs.approved=t.args[1],t.namedArgs.tokenId=t.args[2];break;case"ApprovalForAll":t.namedArgs.owner=t.args[0],t.namedArgs.operator=t.args[1],t.namedArgs.approved=t.args[2]}return t.isTransfer&&"0x0000000000000000000000000000000000000000"==t.namedArgs.fromAddress&&(t.isMint=!0),t.isTransfer&&"0x0000000000000000000000000000000000000000"==t.namedArgs.toAddress&&(t.isBurn=!0),t}};ue=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i}([(0,ln.b)(),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[])],ue);var Ee=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},ve=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Be=class{componentStateRepository;constructor(){}async get(n){return this.componentStateRepository.get(n)}async put(n){n.dateCreated||(n.dateCreated=(new Date).toJSON()),n.lastUpdated=(new Date).toJSON();let t=await(0,fe.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new ce(t);return this.componentStateRepository.put(n)}};Ee([(0,sn.f)("ComponentStateRepository"),ve("design:type",Object)],Be.prototype,"componentStateRepository",void 0),Be=Ee([(0,ln.b)(),ve("design:paramtypes",[])],Be);var xe=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},we=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};class ke{_id;_rev;data;dateCreated;lastUpdated}xe([(0,Nn.a)(),we("design:type",String)],ke.prototype,"_id",void 0),xe([(0,Nn.a)(),we("design:type",String)],ke.prototype,"_rev",void 0),xe([(0,Nn.a)(),we("design:type",Object)],ke.prototype,"data",void 0),xe([(0,Nn.a)(),we("design:type",String)],ke.prototype,"dateCreated",void 0),xe([(0,Nn.a)(),we("design:type",String)],ke.prototype,"lastUpdated",void 0);var ye=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},De=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let ze=class{db;dbName="component-state";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1})}constructor(){}async get(n){return Object.assign(new ke,await this.db.get(n))}async put(n){await this.db.put(n)}};ye([(0,sn.f)("DatabaseService"),De("design:type",bn)],ze.prototype,"databaseService",void 0),ze=ye([(0,ln.b)(),De("design:paramtypes",[])],ze);var Ie=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},We=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let je=class{tokenOwnerPageRepository;constructor(){}async get(n){return this.tokenOwnerPageRepository.get(n)}async getTotals(){return this.tokenOwnerPageRepository.getTotals()}};Ie([(0,sn.f)("TokenOwnerPageRepository"),We("design:type",Object)],je.prototype,"tokenOwnerPageRepository",void 0),je=Ie([(0,ln.b)(),We("design:paramtypes",[])],je);var Ye=function(n,t){return function(e,r){t(e,r,n)}};let Fe=class{baseURI;hostname;constructor(n,t){this.baseURI=n,this.hostname=t}async getTotals(){return(await cn.Z.get(`${this.hostname}${this.baseURI}sync/tokenOwner/pages/total.json`)).data}async get(n){return(await cn.Z.get(`${this.hostname}${this.baseURI}sync/tokenOwner/pages/${n}.json`)).data}};Fe=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i}([(0,ln.b)(),Ye(0,(0,sn.f)("baseURI")),Ye(1,(0,sn.f)("hostname")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Object,Object])],Fe);var qe=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Se=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Ue=class{processedTransactionRepository;itemService;constructor(){}async get(n){return this.processedTransactionRepository.get(n)}async getRowItemViewModels(n){let t={},e=new Set;for(let t of n)t.tokenId&&e.add(t.tokenId);let r=await this.itemService.getRowItemViewModelsByTokenIds(Array.from(e));for(let n of r)t[n.tokenId]=n;return t}async translateSalesToViewModels(n){let t=[];for(let e of n)t.push({sale:e,item:await this.itemService.getRowItemViewModelsByTokenId(e.tokenId)});return t}async getSalesReport(){return this.processedTransactionRepository.getSalesReport()}async getAttributeSalesReport(n,t){return this.processedTransactionRepository.getAttributeSalesReport(n,t)}async getAttributesOverall(){return this.processedTransactionRepository.getAttributesOverall()}async getLargestSales(n){return this.processedTransactionRepository.getLargestSales(n)}};qe([(0,sn.f)("ProcessedTransactionRepository"),Se("design:type",Object)],Ue.prototype,"processedTransactionRepository",void 0),qe([(0,sn.f)("ItemService"),Se("design:type",ut)],Ue.prototype,"itemService",void 0),Ue=qe([(0,ln.b)(),Se("design:paramtypes",[])],Ue);class Xe{}var Re=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Ze=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Ge=class{walletService;tokenOwnerRepository;constructor(){}async get(n){return this.tokenOwnerRepository.get(n)}async getDisplayName(n){if(!n)return;return await this.tokenOwnerRepository.getENS(n)||this.walletService.truncateEthAddress(n)}async getOrCreate(n){let t;if(!t)try{t=await this.get(n)}catch(n){}return t||(t=new Xe,t._id=n,t.tokenIds=[],t.count=0),t}async put(n){return this.tokenOwnerRepository.put(n)}async putAll(n){return n.forEach((n=>{n._id||(n.dateCreated=(new Date).toJSON()),n.lastUpdated=(new Date).toJSON()})),this.tokenOwnerRepository.putAll(n)}async list(n,t){return this.tokenOwnerRepository.list(n,t)}};Re([(0,sn.f)("WalletService"),Ze("design:type",Object)],Ge.prototype,"walletService",void 0),Re([(0,sn.f)("TokenOwnerRepository"),Ze("design:type",Object)],Ge.prototype,"tokenOwnerRepository",void 0),Ge=Re([(0,ln.b)(),Ze("design:paramtypes",[])],Ge);var Oe=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Me=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Te=class{baseURI;schemaService;processedTransactionService;tokenOwnerService;itemService;_ENSCache={};constructor(n){this.baseURI=n}async list(n){let t=await this.getLatest(),e=(await cn.Z.get(`${this.baseURI}sync/transactions/activity/${n}.json`)).data;return e.lastUpdated=t.lastUpdated,e}async listByAddress(n,t){let e=(await cn.Z.get(`${this.baseURI}sync/tokenOwner/${n}/activity/${t}.json`)).data,r=await this.getLatest();return e.lastUpdated=r.lastUpdated,await this.cacheENSNames(e),e}async getLatest(){return(await cn.Z.get(`${this.baseURI}sync/transactions/latest.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async getRecentActivity(){return(await cn.Z.get(`${this.baseURI}sync/transactions/recentActivity.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}getDisplayName(n){return this._ENSCache[n]}async getSalesReport(){return this.processedTransactionService.getSalesReport()}async getAttributeSalesReport(n,t){return this.processedTransactionService.getAttributeSalesReport(n,t)}async getAttributesOverall(){return this.processedTransactionService.getAttributesOverall()}async getLargestSales(n){return await this.processedTransactionService.getLargestSales(n)}abbreviateDollars(n,t){if(!n)return"$0";var e=Math.log10(Math.abs(n))/3|0;if(0==e||1==e)return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(n);var r=["","","M","G","T","P","E"][e],a=n/Math.pow(10,3*e);return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(a)+r}async _cacheDisplayName(n){this._ENSCache[n]||(this._ENSCache[n]=await this.tokenOwnerService.getDisplayName(n))}async cacheENSNames(n){for(let t of n.transactions){for(let n of t.events)n.fromAddress?.length>0&&await this._cacheDisplayName(n.fromAddress),n.toAddress?.length>0&&await this._cacheDisplayName(n.toAddress),n.namedArgs.owner?.length>0&&await this._cacheDisplayName(n.namedArgs.owner),n.namedArgs.operator?.length>0&&await this._cacheDisplayName(n.namedArgs.operator),n.namedArgs.approved?.length>0&&await this._cacheDisplayName(n.namedArgs.approved);await this._cacheDisplayName(t.transaction.transactionFrom)}}};Oe([(0,sn.f)("SchemaService"),Me("design:type",qt)],Te.prototype,"schemaService",void 0),Oe([(0,sn.f)("ProcessedTransactionService"),Me("design:type",Ue)],Te.prototype,"processedTransactionService",void 0),Oe([(0,sn.f)("TokenOwnerService"),Me("design:type",Ge)],Te.prototype,"tokenOwnerService",void 0),Oe([(0,sn.f)("ItemService"),Me("design:type",ut)],Te.prototype,"itemService",void 0),Te=Oe([(0,ln.b)(),function(n,t){return function(e,r){t(e,r,n)}}(0,(0,sn.f)("baseURI")),Me("design:paramtypes",[Object])],Te);var Pe=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i};let Qe=class{baseURI;async get(n){let t;try{t=(await cn.Z.get(`${this.baseURI}sync/transactions/${n}.json`)).data}catch(n){console.log(n)}return t}async getSalesReport(){let n;try{n=(await cn.Z.get(`${this.baseURI}sync/sales/overall.json`)).data}catch(n){console.log(n)}return n}async getAttributeSalesReport(n,t){let e;try{e=(await cn.Z.get(`${this.baseURI}sync/attributes/${this.attributeKeyToInteger(`${n}::::${t}`)}/attribute.json`)).data}catch(n){console.log(n)}return e}async getAttributesOverall(){let n;try{n=(await cn.Z.get(`${this.baseURI}sync/attributes/totals.json`)).data}catch(n){console.log(n)}return n}attributeKeyToInteger(n){let t,e,r=0;if(0===n.length)return r;for(t=0;t<n.length;t++)e=n.charCodeAt(t),r=(r<<5)-r+e,r|=0;return r}async getLargestSales(n){let t;try{t=(await cn.Z.get(`${this.baseURI}sync/sales/largest-${n}.json`)).data}catch(n){console.log(n)}return t}};Pe([(0,sn.f)("baseURI"),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:type",Object)],Qe.prototype,"baseURI",void 0),Qe=Pe([(0,ln.b)()],Qe);let Ve=[{id:"0",changeset:async n=>{await n.createIndex({index:{fields:["count"]}}),await n.put({_id:"_design/by_token_id",views:{by_token_id:{map:function(n){for(let t of n.tokenIds)emit(t)}.toString()}}})}}];var $e=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},He=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Ne=class{db;dbName="token-owners";databaseService;baseURI;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1,changesets:Ve})}constructor(){}async getENS(n){let t;try{t=(await cn.Z.get(`${this.baseURI}sync/tokenOwner/${n}/ens.json`)).data?.name}catch(n){}return t}async get(n){try{let t=await cn.Z.get(`${this.baseURI}sync/tokenOwner/${n}/tokenOwner.json`);return Object.assign(new Xe,t.data)}catch(n){console.log(n)}}async put(n){}async putAll(n){}async list(n,t){}};$e([(0,sn.f)("DatabaseService"),He("design:type",bn)],Ne.prototype,"databaseService",void 0),$e([(0,sn.f)("baseURI"),He("design:type",Object)],Ne.prototype,"baseURI",void 0),Ne=$e([(0,ln.b)(),He("design:paramtypes",[])],Ne);var Le=function(n,t,e,r){var a,o=arguments.length,i=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(i=(o<3?a(i):o>3?a(t,e,i):a(t,e))||i);return o>3&&i&&Object.defineProperty(t,e,i),i},Ke=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Je,_e=class{tokenRepository;constructor(){}async get(n){return this.tokenRepository.get(n)}};async function nr(n,t,e,i,p){return Je||(Je=n,Je.bind("framework7").toConstantValue(function(){o.ZP.registerComponent("nav-bar",F),o.ZP.registerComponent("token-toolbar",S),o.ZP.registerComponent("mint-list",Z),o.ZP.registerComponent("attribute-filter",O),o.ZP.registerComponent("explore-total-info",T),o.ZP.registerComponent("mint-info",Q),o.ZP.registerComponent("transaction-viewer",X),o.ZP.registerComponent("transaction-row",J),o.ZP.registerComponent("search-list",nn),o.ZP.registerComponent("infinite-scroll-content",en);const n=(n,e,a)=>{r.preloader.show(),n({componentUrl:`${t}${e}`,options:a}),r.preloader.hide()},e=[];if("/"!=t&&t.endsWith("/")&&e.push({path:`${t.substring(0,t.length-1)}`,async async({resolve:t,reject:e}){await n(t,"index.html")}}),e.push({path:`${t}`,async async({resolve:t,reject:e}){await n(t,"index.html")}},{path:`${t}index.html`,async async({resolve:t,reject:e}){await n(t,"index.html")}},{path:`${t}mint.html`,async async({resolve:t,reject:e}){await n(t,"mint.html")}},{path:`${t}search.html`,async async({resolve:t,reject:e}){await n(t,"search.html")}},{path:`${t}explore.html`,async async({resolve:t,reject:e}){await n(t,"explore.html")}},{path:`${t}activity`,async async({resolve:t,reject:e}){await n(t,"activity/index.html")}},{path:`${t}activity/index.html`,async async({resolve:t,reject:e}){await n(t,"activity/index.html")}},{path:`${t}leaderboard`,async async({resolve:t,reject:e}){await n(t,"leaderboard/index.html")}},{path:`${t}leaderboard/index.html`,async async({resolve:t,reject:e}){await n(t,"leaderboard/index.html")}},{path:`${t}sales`,async async({resolve:t,reject:e}){await n(t,"sales/index.html")}},{path:`${t}sales/index.html`,async async({resolve:t,reject:e}){await n(t,"sales/index.html")}},{path:`${t}attributes`,async async({resolve:t,reject:e}){await n(t,"attributes/index.html")}},{path:`${t}attributes/index.html`,async async({resolve:t,reject:e}){await n(t,"attributes/index.html")}},{path:`${t}attribute`,async async({resolve:t,reject:e}){await n(t,"attribute/index.html")}},{path:`${t}attribute/index.html`,async async({resolve:t,reject:e}){await n(t,"attribute/index.html")}},{path:`${t}u`,async async({resolve:t,reject:e}){await n(t,"u/index.html")}},{path:`${t}u/index.html`,async async({resolve:t,reject:e}){await n(t,"u/index.html")}},{path:`${t}u/activity`,async async({resolve:t,reject:e}){await n(t,"u/activity/index.html")}},{path:`${t}u/activity/index.html`,async async({resolve:t,reject:e}){await n(t,"u/activity/index.html")}},{path:`${t}list-:page.html`,async async({resolve:t,reject:e}){await n(t,"list-{{page}}.html")}},{path:`${t}t/:tokenId`,async async({resolve:t,reject:e}){await n(t,"t/{{tokenId}}/index.html",{force:!0})}},{path:`${t}t/:tokenId/index.html`,async async({resolve:t,reject:e}){await n(t,"t/{{tokenId}}/index.html",{force:!0})}}),p?.length>0)for(let r of p)e.push({path:`${t}${r.slug}.html`,async async({resolve:t,reject:e}){await n(t,`${r.slug}.html`)}});e.push({path:"(.*)",async async({resolve:t,reject:e,to:r}){console.log(`404 error: ${r.path}`),await n(t,"404.html")}});let r=new o.ZP({el:"#app",id:"large-reader",name:"Large Reader",theme:"auto",init:!1,view:{browserHistory:!0,browserHistorySeparator:"",browserHistoryOnLoad:!1,browserHistoryInitialMatch:!1},navbar:{hideOnPageScroll:!0},toolbar:{hideOnPageScroll:!0},routes:e});return r}()),Je.bind("baseURI").toConstantValue(t),Je.bind("hostname").toConstantValue(e),Je.bind("version").toConstantValue(i),Je.bind("PouchDB").toConstantValue(l.Z),Je.bind("PouchFind").toConstantValue(s.Z),Je.bind("PouchQuickSearch").toConstantValue(d()),Je.bind("provider").toConstantValue((()=>{if("undefined"!=typeof window&&window.ethereum)return window.web3Provider=window.ethereum,new r.Q(window.ethereum)})),Je.bind("WalletService").to(dn).inSingletonScope(),Je.bind("ChannelRepository").to(hn).inSingletonScope(),Je.bind("ItemRepository").to(xn).inSingletonScope(),Je.bind("AuthorRepository").to(Dn).inSingletonScope(),Je.bind("MetadataRepository").to(Wn).inSingletonScope(),Je.bind("ImageRepository").to(qn).inSingletonScope(),Je.bind("AnimationRepository").to(Rn).inSingletonScope(),Je.bind("StaticPageRepository").to(Mn).inSingletonScope(),Je.bind("ItemPageRepository").to(Pn).inSingletonScope(),Je.bind("TokenOwnerPageRepository").to(Fe).inSingletonScope(),Je.bind("AttributeTotalRepository").to(Hn).inSingletonScope(),Je.bind("ReaderSettingsRepository").to(tt).inSingletonScope(),Je.bind("ContractStateRepository").to({}).inSingletonScope(),Je.bind("ComponentStateRepository").to(ze).inSingletonScope(),Je.bind("TokenOwnerRepository").to(Ne).inSingletonScope(),Je.bind("TokenRepository").to(ot).inSingletonScope(),Je.bind("ProcessedTransactionRepository").to(Qe).inSingletonScope(),Je.bind("ChannelWebService").to(kt).inSingletonScope(),Je.bind("ItemWebService").to($t).inSingletonScope(),Je.bind("AuthorWebService").to(Lt).inSingletonScope(),Je.bind("MintWebService").to(re).inSingletonScope(),Je.bind("SearchbarService").to(ie).inSingletonScope(),Je.bind("StaticPageService").to(Bt).inSingletonScope(),Je.bind("ItemPageService").to(Mt).inSingletonScope(),Je.bind("QueueService").to(Ae).inSingletonScope(),Je.bind("TransactionWebService").to(Te).inSingletonScope(),Je.bind("PagingService").to(ct).inSingletonScope(),Je.bind("DatabaseService").to(bn).inSingletonScope(),Je.bind("AnimationService").to(zt).inSingletonScope(),Je.bind("UiService").to(de).inSingletonScope(),Je.bind("ItemService").to(ut).inSingletonScope(),Je.bind("ImageService").to(Zt).inSingletonScope(),Je.bind("ChannelService").to(dt).inSingletonScope(),Je.bind("AuthorService").to(lt).inSingletonScope(),Je.bind("TokenContractService").to(ne).inSingletonScope(),Je.bind("SchemaService").to(qt).inSingletonScope(),Je.bind("QuillService").to(jt).inSingletonScope(),Je.bind("AttributeTotalService").to(gt).inSingletonScope(),Je.bind("ComponentStateService").to(Be).inSingletonScope(),Je.bind("ReaderSettingsService").to(ge).inSingletonScope(),Je.bind("ERCEventService").to(ue).inSingletonScope(),Je.bind("GenerateService").to({}).inSingletonScope(),Je.bind("TokenOwnerService").to(Ge).inSingletonScope(),Je.bind("TokenService").to(_e).inSingletonScope(),Je.bind("TokenOwnerPageService").to(je).inSingletonScope(),Je.bind("ProcessedTransactionService").to(Ue).inSingletonScope(),globalThis.container=Je,globalThis.ethers=a,globalThis.he=an(),globalThis.moment=A(),globalThis.ComponentState=ke,Je)}Le([(0,sn.f)("TokenRepository"),Ke("design:type",Object)],_e.prototype,"tokenRepository",void 0),_e=Le([(0,ln.b)(),Ke("design:paramtypes",[])],_e),l.Z.plugin(s.Z),l.Z.plugin(d()),o.ZP.use([c.Z,f.Z,b.Z,C.Z,g.Z,x.Z,w.Z,k.Z,y.Z,m.Z,h.Z,D.Z,u.Z,z.Z,E.Z,v.Z,B.Z,I.Z,W.Z,j.Z]);var tr=e(93379),er=e.n(tr),rr=e(7795),ar=e.n(rr),or=e(90569),ir=e.n(or),Ar=e(3565),lr=e.n(Ar),sr=e(19216),pr=e.n(sr),dr=e(44589),cr=e.n(dr),fr=e(56154),br={};br.styleTagTransform=cr(),br.setAttributes=lr(),br.insert=ir().bind(null,"head"),br.domAPI=ar(),br.insertStyleElement=pr(),er()(fr.Z,br),fr.Z&&fr.Z.locals&&fr.Z.locals;var Cr=e(58885),gr={};gr.styleTagTransform=cr(),gr.setAttributes=lr(),gr.insert=ir().bind(null,"head"),gr.domAPI=ar(),gr.insertStyleElement=pr(),er()(Cr.Z,gr),Cr.Z&&Cr.Z.locals&&Cr.Z.locals;var mr=e(75131),hr=e(35717),ur=e(29937),Er={};Er.styleTagTransform=cr(),Er.setAttributes=lr(),Er.insert=ir().bind(null,"head"),Er.domAPI=ar(),Er.insertStyleElement=pr(),er()(ur.Z,Er),ur.Z&&ur.Z.locals&&ur.Z.locals;let vr=async(n,t,e,r,a,o,i)=>{if("serviceWorker"in navigator){const A=new mr.ZW(`${t}${n}sw-${e}.js?baseURI=${n}`,{scope:`${t}${n}`});let l,s,p=await cn.Z.get(`${t}${n}backup/contract/contract.json`,{responseType:"json"}),d=await cn.Z.get(`${t}${n}backup/contract/contract-abi.json`,{responseType:"json"});200===p.status&&(l=p.data),200===p.status&&(s=d.data);let c=new hr.W;function f(){return l.contractAddress?(s.Channel.address=l.contractAddress,s):[]}c.bind("contracts").toConstantValue(f()),c.bind("channelId").toConstantValue((()=>a)),c=await nr(c,n,t,e,r),navigator.serviceWorker.controller?Br(c,n,e,t,r):A.addEventListener("controlling",(a=>{Br(c,n,e,t,r)})),A.register()}},Br=async(n,t,e,r,a)=>{let o=n.get("framework7"),i=window.location.toString().replace(`${r}`,"");console.log(`internal URL ${i}`),o.views.create(".view-main",{url:i}).on("init",(async t=>{let e=await n.get("SchemaService");await e.load(["component-state"]),console.log(`Navigating to ${i}`),t.router.navigate(i,{reloadCurrent:!0})})),o.init()}},80950:()=>{},46601:()=>{},89214:()=>{},8623:()=>{},7748:()=>{},85568:()=>{},15525:()=>{},56619:()=>{},77108:()=>{},52361:()=>{},94616:()=>{}},n=>{n.O(0,[216],(()=>(14169,n(n.s=14169))));var t=n.O();reader=t}]);
//# sourceMappingURL=main-0.6.19.reader.js.map