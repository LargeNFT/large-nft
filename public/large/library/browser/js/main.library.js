
    <div class="navbar">
        <div class="navbar-bg"></div>

        <div class="navbar-inner sliding">
                
          <div class="left">
            <a href="${d?.length>0?d:o()}">
              <i class="f7-icons">house</i>
            </a>
          </div>


          <div class="title">${l}</div>
          
          <div class="right">
            
            ${m?t` `:t`
              
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
                                          <a href="#" class="button button-fill">${h(a)}</a>
                                      `:t`
                                          <button class="button button-outline button-fill" @click=${E}>
                                            Connect Wallet
                                          </button>
                                      `} 
                                    </div>
                                </div>
                              </div>
                            </li>
  
                            ${p?t`
                              <li>
                                <a href="${o()}mint.html" class="item-link popover-close">
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
                          <a href="${C()}" class="item-link external popover-close">
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
                          <a href="${o()}explore.html" class="item-link popover-close">
                            <div class="item-content">
                              <div class="item-inner">
                                  <div class="item-title">
                                      Explore
                                  </div>
                              </div>
                            </div>
                          </a>
                        </li>
  
  
                        ${f?t`
                          <li>
                            <a href="${o()}activity" class="item-link popover-close">
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
                            <a href="${o()}leaderboard" class="item-link popover-close">
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
    
                <a href="${C()}" class="external link">
                  Fork
                </a>
  
                <a class="link ${"Explore"==s?t`link-active`:t` `}" href="${o()}explore.html">
                  Explore
                </a>      
  
                ${f?t`
                  <a class="link ${"Activity"==s?t`link-active`:t` `}" href="${o()}activity">
                    Activity
                  </a> 
  
                  <a class="link ${"Leaderboard"==s?t`link-active`:t` `}" href="${o()}leaderboard" >
                    Leaderboard
                  </a> 
  
                `:t`<span />`}
  
                ${g?t`
  
                  ${p?t`
                    <a class="link ${"Mint"==s?t`link-active`:t` `}" href="${o()}mint.html" >
                      Mint
                    </a> 
                  `:t`<span />`}
  
                  ${null!=a?t`
                      <a href="${o()}u/?address=${a}" class="link" >${h(a)}</a>
                  `:t`
                      <a class="link" @click="${E}">Connect Wallet</a>
                  `} 
       
                `:t`<span style="display: none;" />`}
  
              </div>
              
            `}
            
          </div>



          ${b?t`
                  
            <div class="subnavbar">
              <div class="subnavbar-inner">
        
                <div class="breadcrumbs ">
  
                  ${b.map((n=>t`
                    <div class="breadcrumbs-item">

                      ${n.path?t`
                        <a href="${n.path}" class="link">
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

`}}Y.id="9d3f7cb745";const S=Y;function U(n,{$on:t,$:e,$f7:r,$update:a}){let i=globalThis.container.get("baseURI"),o=globalThis.container.get("ReaderSettingsService"),A=n.token_id,l=n.item_count,s=n.current_page;const d=n=>i()+n,c=async n=>{n.preventDefault();let t=e(n.currentTarget).val();r.preloader.show(),t>0?(await o.updateCurrentPage(parseInt(t)),r.views.main.router.navigate(d("t/"+t),{transition:"f7-flip"})):r.views.main.router.navigate(d("index.html")),r.preloader.hide()},p=n=>{n.preventDefault();const t=r.range.get(n.target);A=t.value,a()};return app.on("current-page-updated",(function(n){s=n,a()})),function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div class="toolbar toolbar-bottom">
    <div class="toolbar-inner">

        <div style="width: 100%; margin-bottom: -20px;">

            <div style="display: flex;">
            
                ${s&&0==A?t`
                    <a href="${d(`t/${s}`)}" class="button button-outline back-to-page">
                        Back to page ${s}
                    </a>
                `:t`<span />`}
    
    
                <div class="range-slider range-slider-init" 
                    @range:change=${p}
                    data-label="true"
                    >
                
                    <!-- range input -->
                    <input type="range" 
                        min="0" 
                        max="${l}"
                        step="1" 
                        value="${A}" 
                        @change="${c}"
                />
                </div>


            </div>

            <div class="page-number" style="width: 100%;">
                Page <strong>${A}</strong> of ${l}
            </div>


        </div>





    </div>
  </div>

`}}U.id="99eb5f188b",U.style="\n.page-number {\n    width: 100%;\n    text-align: center;\n    font-size: 13px;\n    margin-bottom: 15px;\n}\n\n.range-slider {\n    width: 100%;\n    margin-left: 20px; \n    margin-right: 20px;\n    flex: 1;\n}\n\n.toolbar a.back-to-page {\n    height: 45px;\n    width: 70px;\n    margin-left: 10px;\n    flex: 0 0 70px;\n    font-size: 10px;\n    text-transform: none;\n    white-space: normal;\n    line-height: 13px;\n}\n";const R=U;function q(n,{$on:t,$f7:e,$update:r}){return function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`




`}}q.id="1da8a264e6",q.style="\n\n\n\n\n";const G=q;function X(n,{$:t,$on:e,$f7:r,$update:a}){let i,o,A=globalThis.container.get("MintWebService"),l=globalThis.container.get("WalletService"),s=globalThis.container.get("QueueService"),d=globalThis.container.get("baseURI")(),c=0,p=1,f=!1;n.baseurl;const m=async()=>{c=globalThis.ethers.utils.formatUnits(o.mul(p)),await a()};e("stepper:change",(async n=>{p=parseInt(n.detail),await m(),b(p)}));const b=n=>{let e=0;t(".flex-card").each((r=>{t(r).removeClass("selected"),e<n&&(t(r).addClass("selected"),e++)}))},g=async n=>{let t;if(n.preventDefault(),await l.connect(),f){let n=parseInt(i.totalMinted+1);t=A.mintFromStartOrFail(p,n)}else t=A.mint(p);let e={title:"Minting token(s). Approve transaction and wait for it to be mined.",promise:t};await s.queuePromiseView(e)},C=async n=>{f=n.currentTarget.checked,await a()};r.preloader.show();const h=async()=>{await l.connect();try{i=await A.getMintingViewModel(),o=globalThis.ethers.utils.parseUnits(i.mintPrice,"ether"),await m();let n=new CustomEvent("mint-view-model-loaded");n.mintingViewModel=i,document.dispatchEvent(n),r.preloader.hide()}catch(n){r.dialog.confirm("Problem connecting to contract on Ethereum Mainnet. Is your wallet connected to the right network?","Problem connecting to network",h,(()=>{r.views.main.router.navigate(d)})),r.preloader.hide()}};h();let u=async n=>{if(n.tokenId>i?.totalMinted){i=await A.getMintingViewModel(),await a();let n=new CustomEvent("mint-view-model-refreshed");n.mintingViewModel=i,n.quantity=p,document.dispatchEvent(n)}};return document.removeEventListener("mint-event",u),document.addEventListener("mint-event",u),function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div>
    
    ${i?t`

      ${i.minting?t`

          <div class="card">
            <div class="card-header card-header-divider">Create a digital collectible!</div>
            <div class="card-content card-content-padding">

              <div class="list simple-list inset mint-list-info">
                <ul>
                  <li>NFTs are minted in sequential order.</li>
                  <li>From the beginning of the story to the end.</li>
                  <li>Limited supply!</li>
                </ul>
              </div>

            </div>
          </div>

          <div class="block block-strong inset">
            <p>
              <strong>Total Minted:</strong> ${i.totalMinted} of ${i.totalSupply}
            </p>              
          </div>

          
          <div class="card">
            <div class="card-header card-header-divider">Select between 1-10 NFTs and click the mint button.</div>
            <div class="card-content card-content-padding">
              <form class="list no-hairlines inset" @submit="${g}">
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
                                <strong>Mint Fee:</strong> ${i.mintPrice} ETH
                              </p>
                              <p>
                                <strong>Quantity:</strong> ${p} 
                              </p>
                              <p>
                                <strong>Total:</strong> ${c} ETH
                              </p>
                            </div>
                        </div>
                    </div>
                  </li>
    
                  <li style="display:none;">
                    <label class="item-checkbox item-content">
    
                        <input type="checkbox" checked="${f}" @change=${C}/>
                        
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
                          <button class="button button-fill ${p<1?"disabled":""}" id="mint-button">Mint</button>
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



`}}X.id="d92086e0ac",X.style="\n\n\n\n.mint-list-card .card-header {\n  font-size: 27px;\n  font-weight: bold;\n}\n\n.mint-list-card .block {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.mint-list-info li {\n  white-space: unset;\n  line-height: unset;\n  height: unset;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\n";const Z=X;let O,T,M=null,P={},$=async n=>T(n);function Q(n,{$:t,$on:e,$f7:r,$update:a}){M=[],P={},T=async n=>{O=n.attributeOptions,n.attributeParams&&(P=n.attributeParams,t("#attribute-accordian-item").addClass("accordion-item-opened")),await a()},document.removeEventListener("attribute-options-loaded",$),document.addEventListener("attribute-options-loaded",$);const i=n=>{P[n.currentTarget.name]=n.currentTarget.value,n.currentTarget.value?P[n.currentTarget.name]=n.currentTarget.value:delete P[n.currentTarget.name];let t=new CustomEvent("explore-attribute-filter-changed");t.attributeParams=P,document.dispatchEvent(t)},o=async n=>{let e=t(n.currentTarget).data("id");delete P[e],await a();let r=new CustomEvent("explore-attribute-filter-changed");r.attributeParams=P,document.dispatchEvent(r)};return function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div>

    <div class="block block-strong row">
      
      <div class="col-50">

        ${Object.keys(P).map((n=>t`
          <div class="chip">
            <div class="chip-label">${n}: ${P[n]}</div>
            <a href="#" class="chip-delete" @click="${o}" data-id="${n}"></a>
          </div>
        `))}

      </div>
      <div class="col-50 filter-button">
        
        <a href="#" data-popup=".filter-popup" class="popup-open">Filters (${Object.keys(P).length})</a>

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
                    ${O?.map((n=>t`
                      <li class="item-content item-input">
                        <div class="item-inner">
                          <div class="item-title item-label">${n.traitType}</div>
                          <div class="item-input-wrap input-dropdown-wrap">
                            <select name="${n.traitType}" @change="${i}">
                              <option selected ></option>
                              ${n.values?.map((e=>t`
                                ${e.value==P[n.traitType]?t`
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






`}}Q.id="32a2c03cd1",Q.style="\n\n.item-content.attribute-select {\n  width: 175px;\n  display: inline-block;\n}\n\n\n";const V=Q;function N(n,{$:t,$on:e,$f7:r,$update:a}){let i,o;return document.addEventListener("explore-total-info-changed",(async n=>{i=n.totalItems,o=n.totalMatches,await a()})),function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div class="block-title block-title-small">

    ${o?t`

      ${o!=i?t`
        Showing ${o} results (${i} total)
      `:t`
        Showing 1 - ${i} results  
      `}

    `:t`<span/>`}

  </div>

`}}N.id="9d7f3d65b2",N.style="\n\n\n";const H=N;function L(n,{$:t,$on:e,$f7:r,$update:a}){let i,o=n.baseurl;return app.on("minting-view-model-updated",(function(n){i=n,a()})),function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div class="card card-header-divider">
    <div class="card-header">Mint NFTs</div>
    <div class="card-content card-content-padding">

      ${i?t`
        <p>
          <strong>Total Minted:</strong> ${i.totalMinted} of ${i.totalSupply}
        </p>

        <a href="${"mint.html",""+(o+"mint.html")}" class="link">Mint NFTs</a>

      `:t`
        Minting information unavailable. 
        <p>Note: Use a web browser with wallet support to see NFT information.</p>
      `}


    </div>
  </div>

`}}L.id="3159b7ce7a",L.style="\n";const J=L;function K(n,{$:t,$on:e,$f7:r,$update:a}){globalThis.container.get("WalletService"),globalThis.container.get("MintWebService");let i=globalThis.container.get("TransactionWebService"),o=globalThis.container.get("baseURI")();const A=n=>o+n;let l=n.largest_sales;return function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

    <div class="block block-strong inset largest-sales">
                    
      ${l?.sales?.map(((n,e)=>t`
        <div class="margin-bottom">

          <div class="rank">#${e+1}</div>

          <div class="square">
            <a href="${A(`t/${n.tokenId}`)}" class="item-link">
              <img src="${A(`backup/export/images/${l.rowItemViewModels[n.tokenId].coverImageId}.${l.rowItemViewModels[n.tokenId].coverImageGenerated?"svg":"jpg"}`)}" alt="${n.tokenId}" height="125" width="125"/>
            </a>
          </div>

          <div class="sale-info margin-top">
            <a href="${A(`t/${n.tokenId}`)}" class="item-link">${l.rowItemViewModels[n.tokenId].title}</a><br />
            ${new Intl.NumberFormat("en-US").format(n.ethValue)} ETH (${i.abbreviateDollars(n.usdValue,2)})
            <div class="date">${moment(n.date).format("LL")}</div>
          </div>

        </div>
      `))}
      </div>

  
`}}K.id="634842538c";const _=K,nn=(n,{$h:t})=>{globalThis.container.get("WalletService");let e=globalThis.container.get("TransactionWebService");let r=n.transaction,a=n.event,i=n.base_uri,o=n.row_item_view_models,A=n.index;return()=>t`
    
        <tr class="${A%2==0?"alt-row":""}">

          <td class="image">
            <a href="${i}t/${a.tokenId}">
              <img src="${(n=>{if(n)return t=n?.coverImageGenerated?"backup/export/images/"+n.coverImageId+".svg":"backup/generated/images/50x50/"+n.coverImageId+".webp",`${i+t}`;var t})(o[a.tokenId])}" class="latest-img" alt="${o[a.tokenId]?.title}" height="50" width="50" /> 
            </a>
          </td>

          <td class="label-cell medium-only">

            <a href="${i}t/${a.tokenId}" class="title">
              ${o[a.tokenId]?.title}            
            </a>

          </td>
          <td>
            ${a.isMint?t`
              <a href="https://etherscan.io/tx/${r._id}" class="external" target="_blank">Mint</a>
            `:t`

              ${r?.transactionValue?.markets&&Object.keys(r?.transactionValue?.markets).length>0?t`
                <a href="https://etherscan.io/tx/${r._id}" class="external" target="_blank">Sold</a> on ${Array.from(Object.keys(r.transactionValue?.markets).map((n=>n))).join(", ")} ${r.transactionValue?.aggregator?" / "+r.transactionValue.aggregator:""}

              `:t`
                <a href="https://etherscan.io/tx/${r._id}" class="external" target="_blank">${a.event}</a>
              `}
              
            `}

            <p class="date">${moment(1e3*r.timestamp).fromNow()}</p>
          </td>

          <td class="numeric-cell">
            
            <span class="eth-value">${r.transactionValue?.tokenPrice[a.tokenId]?.price.toFixed(5)} ${r.transactionValue?.tokenPrice[a.tokenId]?.currency}</span>
            ${r.transactionValue?.tokenPrice[a.tokenId]?.usdValue?t`
              <br />
              <span class="dollar-value">${e.abbreviateDollars(r.transactionValue?.tokenPrice[a.tokenId]?.usdValue,2)}</span>
            `:t` `}

           </td>
          <td class="numeric-cell medium-only">
            <a href="${i}u/?address=${a.fromAddress}" class="${a.fromAddress==r.from?"is-from":""}">
                  ${rn(a.fromAddress)}
            </a> <span class="f7-icons">arrow_right</span>

            <a href="${i}u/?address=${a.toAddress}" class="${a.toAddress==r.from?"is-from":""}">
              ${rn(a.toAddress)}
            </a>

          </td>
        </tr>
    `},tn=(n,{$h:t})=>{globalThis.container.get("WalletService"),globalThis.container.get("TransactionWebService");const e=n=>`${i+n}`;let r=n.transaction,a=n.event,i=n.base_uri,o=n.row_item_view_models,A=n.index,l=(a?.namedArgs?.owner,a?.namedArgs?.approved);return r?.from,()=>{return t`
      <tr class="${A%2==0?"alt-row":""}">

          <td class="image">
            <a href="${i}t/${a.tokenId}">
              <img src="${n=o[a.tokenId],n.coverImageGenerated?e("backup/export/images/"+n.coverImageId+".svg"):e("backup/generated/images/50x50/"+n.coverImageId+".webp")}" class="latest-img" alt="${o[a.tokenId].title}" height="40" width="40" /> 
            </a>
          </td>

          <td class="label-cell medium-only">

            <a href="${i}t/${a.tokenId}" class="title">
              ${o[a.tokenId].title}            
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
    `;var n}},en=(n,{$h:t})=>{globalThis.container.get("WalletService"),globalThis.container.get("TransactionWebService");let e=n.transaction,r=n.event,a=n.base_uri,i=n.index;return()=>t`
        <tr class="${i%2==0?"alt-row":""}">

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
            <a href="${a}u/?address=${r.namedArgs.owner}" class="${r.namedArgs.owner==e.from?"is-from":""}">${rn(r.namedArgs.owner)}</a> 
            <span class="f7-icons">arrow_right</span>
            <a href="${a}u/?address=${r.namedArgs.operator}" class="${r.namedArgs?.operator==e.from?"is-from":""}">${rn(r.namedArgs.operator)}</a>
          </td>

        </tr>
    `},rn=n=>{let t=globalThis.container.get("WalletService");return an?.ens&&an.ens[n]?an.ens[n]:t.truncateEthAddress(n)};let an,on,An=async n=>on(n);function ln(n,{$:t,$on:e,$f7:r,$update:a}){globalThis.container.get("WalletService");let i=globalThis.container.get("baseURI")();globalThis.moment,an=n.transactions;let o=n.items,A=n.token;return on=async n=>{an=n.transactionsViewModel,await a()},document.removeEventListener("transactions-updated",An),document.addEventListener("transactions-updated",An),function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`
  
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
          ${an?.transactions.map(((n,e)=>t`
  
            ${n.events?.map((r=>t`
  
              ${"Approval"!=r.event||A&&r?.tokenId!=A?t` `:t`
                <${tn} transaction=${n.transaction} event=${r} base_uri=${i} row_item_view_models=${o} index="${e}" />
              `}
          
              ${"Transfer"!=r.event||A&&r?.tokenId!=A?t` `:t`
                <${nn} transaction=${n.transaction} event=${r} base_uri=${i} row_item_view_models=${o} index="${e}"/>
              `}
          
              ${"ApprovalForAll"!=r.event||A&&r?.tokenId!=A?t` `:t`
                <${en} transaction=${n.transaction} event=${r} base_uri=${i} index="${e}"/>
              `}
          
            `))}
  
  
          `))}
        </tbody>
      </table>
    </div>

  </div>

`}}ln.id="a3528ef83f",ln.style="\n\n";const sn=ln;function dn(n,{$:t,$on:e,$f7:r,$update:a}){let i=globalThis.container.get("TransactionWebService"),o=globalThis.container.get("WalletService"),A=globalThis.container.get("baseURI")(),l=n.token_owners;return function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`
  
  <tbody>
                                    
    ${l?.map((n=>t`
        <tr>
            <td class="label-cell">
                ${n.rank}
            </td>

            <td class="address-cell">

                ${n.ensName?t`
                    <a href="${A}u/?address=${n._id}">${n.ensName}</a>
                `:t`
                    <a href="${A}u/?address=${n._id}">${n._id?o.truncateEthAddress(n._id):" "}</a>
                `} 

            </td>


            <td class="numeric-cell">
                ${n.count}
            </td>

            <td class="numeric-cell">
                <span class="eth-value">${new Intl.NumberFormat("en-US").format(n.salesReport?.buys?.ethValue?n.salesReport?.buys?.ethValue:0)} ETH</span> <br />
                <span class="dollar-value">${i.abbreviateDollars(n.salesReport?.buys?.usdValue?n.salesReport?.buys?.usdValue:0,2)}</span>
            </td>

            <td class="numeric-cell">
                <span class="eth-value">${new Intl.NumberFormat("en-US").format(n.salesReport?.sales?.ethValue?n.salesReport?.sales?.ethValue:0)} ETH</span> <br />
                <span class="dollar-value">${i.abbreviateDollars(n.salesReport?.sales?.usdValue?n.salesReport?.sales?.usdValue:0,2)}</span>
            </td>

            <td class="text-cell">
                ${n.lastActive?moment(n.lastActive).fromNow():""}
            </td>


        </tr>
    
    `))}
    </tbody>

`}}dn.id="52d12f0493";const cn=dn;function pn(n,{$:t,$on:e,$f7:r,$update:a}){let i=globalThis.container.get("ItemWebService"),o=globalThis.container.get("baseURI")();const A=n=>o+n;let l,s=!1;const d=async n=>{n.preventDefault(),t(".searchbar input").blur(),r.preloader.showIn(".cards-list"),s=!0,a(),l=await i.query(t(".searchbar input").val()),s=!1,a(),r.preloader.hideIn(".cards-list")};return function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

  <div class="margin-top">



    <div class="block block-strong block-search">

      <form class="searchbar" @submit="${d}">
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

`}}pn.id="6718f9a9fd",pn.style="\n\n.block-search {\n  background: #f1f1f1;\n  font-size: 14px;\n}\n\n";const fn=pn;function mn(n,{$:t,$on:e,$f7:r,$update:a}){let i=n.baseurl,o=n.items;const A=n=>`${i+n}`;return function(n){n.$;var t=n.$h;return n.$root,n.$f7,n.$f7route,n.$f7router,n.$theme,n.$update,n.$store,t`

    <div class="row" id="item-list">
                            
        ${o?.length>0?t`
                                    
            ${o.map((n=>t`
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
  
`}}mn.id="c71054822d",mn.style="\n";const bn=mn;var gn=e(86492),Cn=e.n(gn),hn=e(64594),un=e(96519),En=e(45466),vn=e(61906),xn=function(n,t){return function(e,r){t(e,r,n)}};let wn=class{contracts;getProvider;$f7;wallet;address;ethersContracts={};provider;constructor(n,t,e){this.contracts=n,this.getProvider=t,this.$f7=e}async initProvider(){this.provider=this.getProvider(),globalThis.ethereum?.on("accountsChanged",(async n=>{delete this.address,n?.length>0&&await this.initWallet(),this.$f7.views.main.router.refreshPage()})),globalThis.ethereum?.on("networkChanged",(async n=>{this.ethersContracts={},this.provider=this.getProvider(),await this.initWallet()}))}async initWallet(){console.log("Init wallet"),delete this.address,this.provider||await this.initProvider();let n=await this.provider.send("eth_accounts",[]);if(n?.length>0)return this.connect();console.log("Init wallet complete")}async connect(){console.log("Connect wallet"),await this.provider.send("eth_requestAccounts",[]),this.wallet=await this.provider.getSigner(),this.address=await this.getAddress(),console.log(`Wallet ${this.address} connected`)}async getAddress(){if(!this.provider)return;let n=await this.provider.send("eth_accounts",[]);return n?.length>0?hn.Kn(n[0]):void 0}async getWallet(){return this.provider.getSigner()}async getContract(n){let t=(await this.contracts())[n];return this.ethersContracts[n]=new un.CH(t.address,t.abi,this.wallet?this.wallet:this.provider),this.ethersContracts[n]}truncateEthAddress(n){if(!n)return;const t=n.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);return t?`${t[1]}…${t[2]}`:n}};wn=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}([(0,En.b)(),xn(0,(0,vn.f)("contracts")),xn(1,(0,vn.f)("provider")),xn(2,(0,vn.f)("framework7")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Function,Function,Object])],wn);var Bn=e(52861),kn=function(n,t){return function(e,r){t(e,r,n)}};let yn=class{baseURI;hostname;PouchDB;channelId;dbCache={};constructor(n,t,e,r){this.baseURI=n,this.hostname=t,this.PouchDB=e,this.channelId=r}async getDatabase(n){const t=`./pouch/${this.channelId()}/${n.name}`;if(this.dbCache[t])return this.dbCache[t];this.dbCache[t]=new this.PouchDB(t);const e=await this.dbCache[t].info();if(0==e.doc_count&&0==e.update_seq){if(n.changesets){console.log(`Creating indexes for ${t}`);let e={_id:"_local/changesets",ids:[]};for(let r of n.changesets)await r.changeset(this.dbCache[t]),e.ids.push(r.id),console.log(`New changeset detected...${r.id}`);await this.dbCache[t].put(e)}n.initialRecords&&await this.loadInitialRecords(n,t)}else if(n.changesets){let e;try{e=await this.dbCache[t].get("_local/changesets")}catch(n){}e||(e={_id:"_local/changesets",ids:[]});let r=!1;for(let a of n.changesets)if(!e.ids.includes(a.id)){try{await a.changeset(this.dbCache[t])}catch(n){}e.ids.push(a.id),r=!0,console.log(`New changeset detected...${a.id}`)}r&&(console.log("Saving changeset log...",e),await this.dbCache[t].put(e))}return this.dbCache[t]}async loadInitialRecords(n,t){let e;e=n.initialRecordsPath?await fetch(`${this.hostname()}${this.baseURI()}${n.initialRecordsPath}`):await fetch(`${this.hostname()}${this.baseURI()}backup/export/backup/${n.name}.json`);let r=await e.json();r?.length>0&&(console.log(`Loading ${r?.length} initial records for ${t}`),await this.dbCache[t].bulkDocs(r))}};yn=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}([(0,En.b)(),kn(0,(0,vn.f)("baseURI")),kn(1,(0,vn.f)("hostname")),kn(2,(0,vn.f)("PouchDB")),kn(3,(0,vn.f)("channelId")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Function,Function,Object,Function])],yn);var Dn=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},zn=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},In=function(n,t){return function(e,r){t(e,r,n)}};let jn=class{baseURI;hostname;changesets=[{id:"0",changeset:async n=>{await n.createIndex({index:{fields:["dateCreated"]}}),await n.createIndex({index:{fields:["lastUpdated"]}})}}];db;dbName="channels";databaseService;constructor(n,t){this.baseURI=n,this.hostname=t}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(){let n,t=await this.db.allDocs({include_docs:!0});for(let e of t.rows)e.doc.dateCreated&&(n=e.doc);const e=await Bn.Z.get(`${this.hostname()}${this.baseURI()}backup/contract/contract.json`);return e?.data&&(n.contractAddress=e.data.contractAddress),n}};Dn([(0,vn.f)("DatabaseService"),zn("design:type",yn)],jn.prototype,"databaseService",void 0),jn=Dn([(0,En.b)(),In(0,(0,vn.f)("baseURI")),In(1,(0,vn.f)("hostname")),zn("design:paramtypes",[Function,Function])],jn);class Wn{_id;_rev;channelId;tokenId;title;link;description;content;contentHTML;excerpt;authorId;category;attributeSelections;coverImageId;coverImageAsAnimation;originalJSONMetadata;animationId;datePublished;dateCreated;lastUpdated}var Fn=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Yn=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)},Sn=function(n,t){return function(e,r){t(e,r,n)}};let Un=class{baseURI;hostname;static CHUNK_SIZE=10;changesets=[{id:"0",changeset:async n=>{await n.createIndex({index:{fields:["tokenId"]}}),await n.search({build:!0,fields:["contentHTML","title","tokenId"]})}}];db;dbName="items";databaseService;constructor(n,t){this.baseURI=n,this.hostname=t}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(n){return Object.assign(new Wn,await this.db.get(n))}async put(n){await this.db.put(n)}async list(n,t=10){return(await this.db.find({selector:{tokenId:{$exists:!0}},sort:[{tokenId:"asc"}],limit:t,skip:n})).docs}async getByTokenId(n){let t=await this.db.find({selector:{tokenId:{$eq:n}},limit:1});if(t.docs?.length>0)return t.docs[0]}async getByTokenIds(n){let t=await this.db.find({selector:{tokenId:{$in:n}}});return t.docs?.length>0?t.docs:[]}async getRowItemViewModelsByAttribute(n,t,e){const r=n=>n.replace(/[^a-z0-9]/gi,"_").toLowerCase();let a;return a=(await Bn.Z.get(`${this.hostname()}${this.baseURI()}attributes/items/${r(n)}/${r(t)}/${e}.json`)).data,a}async getRowItemViewModelsByOwner(n,t){let e;return e=(await Bn.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/${n}/tokens/${t}.json`)).data,e}async getRowItemViewModelsByTokenIds(n){let t=[];for(let e of n){const n=await Bn.Z.get(`${this.hostname()}${this.baseURI()}t/${e}/rowItemViewModel.json`);t.push(n.data)}return t}async getRowItemViewModelsByTokenId(n){return(await Bn.Z.get(`${this.hostname()}${this.baseURI()}t/${n}/rowItemViewModel.json`)).data}async listByTokenId(n,t){return(await this.db.find({selector:{tokenId:{$eq:n}},sort:[{tokenId:"desc"}],limit:t})).docs}async query(n){return(await this.db.search({query:n,fields:["contentHTML","title","tokenId"],include_docs:!0,highlighting:!0,limit:10})).rows.map((n=>(n.highlighting.contentHTML&&(n.doc.contentHTML=n.highlighting.contentHTML),n.doc.contentHTML=n.doc.contentHTML.replace(/<img .*?>/g,""),n.doc)))}async all(){return(await this.db.find({selector:{tokenId:{$exists:!0}},sort:[{tokenId:"asc"}],limit:1e5,skip:0})).docs}};Fn([(0,vn.f)("DatabaseService"),Yn("design:type",yn)],Un.prototype,"databaseService",void 0),Un=Fn([(0,En.b)(),Sn(0,(0,vn.f)("baseURI")),Sn(1,(0,vn.f)("hostname")),Yn("design:paramtypes",[Function,Function])],Un);class Rn{_id;_rev;walletAddress;name;description;url;coverPhotoId;dateCreated;lastUpdated}var qn=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Gn=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Xn=class{db;dbName="authors";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(n){return Object.assign(new Rn,await this.db.get(n))}};qn([(0,vn.f)("DatabaseService"),Gn("design:type",yn)],Xn.prototype,"databaseService",void 0),Xn=qn([(0,En.b)(),Gn("design:paramtypes",[])],Xn);class Zn{tokenId;name;description;image;image_data;external_url;attributes;background_color;animation_url}var On=function(n,t){return function(e,r){t(e,r,n)}};let Tn=class{baseURI;hostname;static CHUNK_SIZE=10;constructor(n,t){this.baseURI=n,this.hostname=t}async get(n){const t=await Bn.Z.get(`${this.hostname()}${this.baseURI()}backup/metadata/${n}.json`);return Object.assign(new Zn,t.data)}};Tn=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}([(0,En.b)(),On(0,(0,vn.f)("baseURI")),On(1,(0,vn.f)("hostname")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Function,Function])],Tn);class Mn{_id;data;cid;buffer;svg;generated}var Pn=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},$n=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Qn=class{db;dbName="images";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(n){return Object.assign(new Mn,await this.db.get(n))}async list(){}};Pn([(0,vn.f)("DatabaseService"),$n("design:type",yn)],Qn.prototype,"databaseService",void 0),Qn=Pn([(0,En.b)(),$n("design:paramtypes",[])],Qn);class Vn{_id;_rev;content;cid;dateCreated}var Nn=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Hn=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Ln=class{db;dbName="animations";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(n){return Object.assign(new Vn,await this.db.get(n))}};Nn([(0,vn.f)("DatabaseService"),Hn("design:type",yn)],Ln.prototype,"databaseService",void 0),Ln=Nn([(0,En.b)(),Hn("design:paramtypes",[])],Ln);class Jn{_id;_rev;channelId;name;slug;content;contentHTML;contentMarkdown;locations;dateCreated;lastUpdated}var Kn=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},_n=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let nt=class{changesets=[{id:"0",changeset:async n=>{await n.createIndex({index:{fields:["channelId"]}}),await n.createIndex({index:{fields:["dateCreated"]}})}}];db;dbName="static-pages";databaseService;constructor(){}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(n){return Object.assign(new Jn,await this.db.get(n))}async listByLocation(n,t){return(await this.db.find({selector:{locations:{$all:[n]},dateCreated:{$exists:!0}},sort:[{dateCreated:"asc"}],skip:t})).docs}};Kn([(0,vn.f)("DatabaseService"),_n("design:type",yn)],nt.prototype,"databaseService",void 0),nt=Kn([(0,En.b)(),_n("design:paramtypes",[])],nt);var tt=function(n,t){return function(e,r){t(e,r,n)}};let et=class{baseURI;hostname;constructor(n,t){this.baseURI=n,this.hostname=t}async get(n){return(await Bn.Z.get(`${this.hostname()}${this.baseURI()}itemPages/${n}.json`)).data}};et=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}([(0,En.b)(),tt(0,(0,vn.f)("baseURI")),tt(1,(0,vn.f)("hostname")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Function,Function])],et);class rt{_id;traitType;value;count;categoryPercent;tokenIds}var at=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},it=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let ot=class{db;dbName="attribute-totals";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0,initialRecordsPath:"attributeTotals.json"})}constructor(){}async get(n){return Object.assign(new rt,await this.db.get(n))}async getByIds(n){let t=await this.db.allDocs({keys:n,include_docs:!0});return t.rows?.map((n=>n.doc))}async put(n){await this.db.put(n)}async list(n,t){return(await this.db.find({selector:{count:{$exists:!0}},limit:n,skip:t})).docs}};at([(0,vn.f)("DatabaseService"),it("design:type",yn)],ot.prototype,"databaseService",void 0),ot=at([(0,En.b)(),it("design:paramtypes",[])],ot);var At=e(25494),lt=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},st=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};class dt{_id;_rev;currentPage;lastPageJump;dateCreated;lastUpdated}lt([(0,At.a)(),st("design:type",String)],dt.prototype,"_id",void 0),lt([(0,At.a)(),st("design:type",String)],dt.prototype,"_rev",void 0),lt([(0,At.a)(),st("design:type",Number)],dt.prototype,"currentPage",void 0),lt([(0,At.a)(),st("design:type",Number)],dt.prototype,"lastPageJump",void 0),lt([(0,At.a)(),st("design:type",String)],dt.prototype,"dateCreated",void 0),lt([(0,At.a)(),st("design:type",String)],dt.prototype,"lastUpdated",void 0);var ct=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},pt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let ft=class{db;dbName="reader-settings";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1})}constructor(){}async put(n){n._id="reader-settings",await this.db.put(n)}async get(){let n;try{n=await this.db.get("reader-settings")}catch(n){}return n||(n=new dt,n._id="reader-settings"),Object.assign(new dt,n)}};ct([(0,vn.f)("DatabaseService"),pt("design:type",yn)],ft.prototype,"databaseService",void 0),ft=ct([(0,En.b)(),pt("design:paramtypes",[])],ft);class mt{}var bt=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},gt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Ct=class{baseURI;constructor(){}async get(n){try{let t=await Bn.Z.get(`${this.baseURI()}sync/tokens/${n}/token.json`);return Object.assign(new mt,t.data)}catch(n){}}};bt([(0,vn.f)("baseURI"),gt("design:type",Function)],Ct.prototype,"baseURI",void 0),Ct=bt([(0,En.b)(),gt("design:paramtypes",[])],Ct);var ht=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},ut=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Et=class{authorRepository;walletService;constructor(){}async get(n){return this.authorRepository.get(n)}getDisplayName(n){if(n)return n.name?n.name:this.walletService.truncateEthAddress(n._id)}};ht([(0,vn.f)("AuthorRepository"),ut("design:type",Object)],Et.prototype,"authorRepository",void 0),ht([(0,vn.f)("WalletService"),ut("design:type",Object)],Et.prototype,"walletService",void 0),Et=ht([(0,En.b)(),ut("design:paramtypes",[])],Et);var vt=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},xt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let wt=class{channelRepository;constructor(){}async get(){return this.channelRepository.get()}};vt([(0,vn.f)("ChannelRepository"),xt("design:type",Object)],wt.prototype,"channelRepository",void 0),wt=vt([(0,En.b)(),xt("design:paramtypes",[])],wt);let Bt=class{constructor(){}buildPagingViewModel(n,t,e,r){let a=new kt;return a.offset=n||0,a.limit=t,a.count=e,a.start=a.offset+1,a.end=Math.min(a.offset+t,e),a.previousOffset=Math.max(a.offset-t,0),a.offset+t<e&&(a.nextOffset=a.offset+t),a.page=a.offset/a.limit+1,a.page>a.endPage&&(a.page=a.endPage),a.endPage=Math.ceil(a.count/a.limit),a.lastOffset=a.endPage*a.limit-a.limit,a.showNext=a.endPage>a.page,a.showPrevious=0!=a.offset,a.showFirst=a.page>2,a.showLast=a.page<a.endPage-1,a}calculateEndIndex(n,t,e){let r=t+n-1;return Math.min(e-1,r)}calculateDescendingEndIndex(n,t){let e=t-(n-1);return Math.max(0,e)}calculateDescendingOffset(n,t){let e=t-1-n;return Math.max(0,e)}};Bt=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}([(0,En.b)(),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[])],Bt);class kt{page;pageNumbers;endPage;offset;limit;count;start;end;previousOffset;nextOffset;lastOffset;showPrevious;showNext;showFirst;showLast}var yt=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Dt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let zt=class{itemRepository;channelRepository;authorRepository;imageRepository;animationRepository;staticPageRepository;readerSettingsRepository;rowItemViewModelRepository;attributeTotalRepository;componentStateRepository;constructor(){}async load(n){const t=this.getRepositories();for(let e of n){let n=t.filter((n=>n.dbName==e))[0];await(n?.load())}}async reloadAll(){const n=this.getRepositories();for(let t of n)await t.load()}getRepositories(){const n=[];return n.push(this.itemRepository),n.push(this.channelRepository),n.push(this.authorRepository),n.push(this.imageRepository),n.push(this.animationRepository),n.push(this.staticPageRepository),n.push(this.readerSettingsRepository),n.push(this.staticPageRepository),n.push(this.readerSettingsRepository),n.push(this.attributeTotalRepository),n.push(this.componentStateRepository),n.push(this.rowItemViewModelRepository),n}async loadWallet(n){console.log(`Loading wallet: ${n}`)}};yt([(0,vn.f)("ItemRepository"),Dt("design:type",Object)],zt.prototype,"itemRepository",void 0),yt([(0,vn.f)("ChannelRepository"),Dt("design:type",Object)],zt.prototype,"channelRepository",void 0),yt([(0,vn.f)("AuthorRepository"),Dt("design:type",Object)],zt.prototype,"authorRepository",void 0),yt([(0,vn.f)("ImageRepository"),Dt("design:type",Object)],zt.prototype,"imageRepository",void 0),yt([(0,vn.f)("AnimationRepository"),Dt("design:type",Object)],zt.prototype,"animationRepository",void 0),yt([(0,vn.f)("StaticPageRepository"),Dt("design:type",Object)],zt.prototype,"staticPageRepository",void 0),yt([(0,vn.f)("ReaderSettingsRepository"),Dt("design:type",Object)],zt.prototype,"readerSettingsRepository",void 0),yt([(0,vn.f)("RowItemViewModelRepository"),Dt("design:type",Object)],zt.prototype,"rowItemViewModelRepository",void 0),yt([(0,vn.f)("AttributeTotalRepository"),Dt("design:type",Object)],zt.prototype,"attributeTotalRepository",void 0),yt([(0,vn.f)("ComponentStateRepository"),Dt("design:type",Object)],zt.prototype,"componentStateRepository",void 0),zt=yt([(0,En.b)(),Dt("design:paramtypes",[])],zt);var It=e(42555),jt=e.n(It),Wt=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Ft=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Yt=class{imageRepository;constructor(){}async get(n){return this.imageRepository.get(n)}async list(){return this.imageRepository.list()}async getUrl(n){return n.buffer||n.svg?n.buffer?this.bufferToDataURL("image/jpg",n.buffer):n.svg?this.getSVGURL(n):void 0:""}async getSVGURL(n){return n.svg?this.svgToDataURL(n.svg):""}svgToDataURL(n){return jt()(n)}bufferToDataURL(n,t){return`data:${n};base64,${t.toString("base64")}`}};Wt([(0,vn.f)("ImageRepository"),Ft("design:type",Object)],Yt.prototype,"imageRepository",void 0),Yt=Wt([(0,En.b)(),Ft("design:paramtypes",[])],Yt);var St=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Ut=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Rt=class{staticPageRepository;constructor(){}async get(n){return this.staticPageRepository.get(n)}async listByLocation(n,t){return this.staticPageRepository.listByLocation(n,t)}async listRoutablePages(n){let t=[];if(n?.length>0&&t.push(...n),t=t.concat(await this.staticPageRepository.listByLocation("navbar",0)),t=t.concat(await this.staticPageRepository.listByLocation("links",0)),t=JSON.parse(JSON.stringify(t)),t?.length>0)for(let n of t)delete n?.content,delete n?.contentHTML,delete n?.contentMarkdown;return t}};St([(0,vn.f)("StaticPageRepository"),Ut("design:type",Object)],Rt.prototype,"staticPageRepository",void 0),Rt=St([(0,En.b)(),Ut("design:paramtypes",[])],Rt);var qt=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Gt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Xt=class{channelService;authorService;imageService;pagingService;schemaService;walletService;staticPageService;loadedChannelData;constructor(){}async get(n,t){return this.getViewModel(await this.channelService.get(),n,t)}async getViewModel(n,t,e){let r,a;n.authorId&&(r=await this.authorService.get(n.authorId));let i=n.itemCount,o=this.pagingService.buildPagingViewModel(t,10,i,5),A=["navbar","links","index","none"],l={};for(let n of A)l[n]=await this.staticPageService.listByLocation(n,0);if(e?.length>0)for(let n of e)for(let t of n?.locations)l[t].push(n);return n.coverImageId&&(a=await this.imageService.get(n.coverImageId)),{channelContractAbbrev:n.contractAddress?this.walletService.truncateEthAddress(n.contractAddress):void 0,channel:n,staticPagesViewModel:l,author:r,authorDisplayName:this.authorService.getDisplayName(r),itemCount:i,pagingViewModel:o,coverImage:a}}async loadChannel(n,t,e){globalThis.channelId=n,globalThis.baseURI=t,globalThis.hostname=e}async loadChannelData(n){n&&this.loadedChannelData!=n&&(await this.schemaService.reloadAll(),await this.schemaService.load(["component-state"])),this.loadedChannelData=n}};qt([(0,vn.f)("ChannelService"),Gt("design:type",wt)],Xt.prototype,"channelService",void 0),qt([(0,vn.f)("AuthorService"),Gt("design:type",Et)],Xt.prototype,"authorService",void 0),qt([(0,vn.f)("ImageService"),Gt("design:type",Yt)],Xt.prototype,"imageService",void 0),qt([(0,vn.f)("PagingService"),Gt("design:type",Bt)],Xt.prototype,"pagingService",void 0),qt([(0,vn.f)("SchemaService"),Gt("design:type",zt)],Xt.prototype,"schemaService",void 0),qt([(0,vn.f)("WalletService"),Gt("design:type",Object)],Xt.prototype,"walletService",void 0),qt([(0,vn.f)("StaticPageService"),Gt("design:type",Rt)],Xt.prototype,"staticPageService",void 0),Xt=qt([(0,En.b)(),Gt("design:paramtypes",[])],Xt);var Zt=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Ot=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Tt=class{animationRepository;constructor(){}async get(n){return this.animationRepository.get(n)}};Zt([(0,vn.f)("AnimationRepository"),Ot("design:type",Object)],Tt.prototype,"animationRepository",void 0),Tt=Zt([(0,En.b)(),Ot("design:paramtypes",[])],Tt);var Mt=e(88554),Pt=e(99810);let $t=class{constructor(){}async translateContent(n){if(!n?.ops)return"";const t=new Mt.bc(n.ops,{});return t.renderCustomWith((function(n,t){if("divider"===n.insert.type)return"<hr />";if("ipfsimage"===n.insert.type){let t=`<img src="${n.insert.value.src}" `;return n.insert.value.width&&(t+=`width="${n.insert.value.width}" `),n.insert.value.height&&(t+=`height="${n.insert.value.height}" `),n.insert.value.style&&(t+=`style="${n.insert.value.style}"`),t+="/>",t}})),t.convert()}async generateMarkdown(n){return(0,Pt.deltaToMarkdown)(n)}};$t=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}([(0,En.b)(),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[])],$t);var Qt=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Vt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Nt=class{attributeTotalRepository;constructor(){}async get(n){return this.attributeTotalRepository.get(n)}async put(n){return this.attributeTotalRepository.put(n)}async getByIds(n){return this.attributeTotalRepository.getByIds(n)}async list(){return this.attributeTotalRepository.list()}async buildAttributeTotals(n,t){let e=[],r=new Set(t.map((n=>n.attributeSelections.map((n=>`${n.traitType}:::${n.value}`)))).flat());for(let n of r){let t={_id:n,traitType:n.substring(0,n.indexOf(":::")),value:n.substring(n.indexOf(":::")+3,n.length),count:0,tokenIds:[]};e.push(t)}for(let n of t)for(let t of n.attributeSelections){let r=e.filter((n=>n.traitType==t.traitType&&n.value==t.value))[0];r.tokenIds.push(n.tokenId),r.count++}for(let t of e)t.categoryPercent=new Intl.NumberFormat("default",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(t.count/n.itemCount);return e.sort(((n,t)=>t.count-n.count)),e}};Qt([(0,vn.f)("AttributeTotalRepository"),Vt("design:type",Object)],Nt.prototype,"attributeTotalRepository",void 0),Nt=Qt([(0,En.b)(),Vt("design:paramtypes",[])],Nt);var Ht=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Lt=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Jt=class{itemRepository;rowItemViewModelRepository;attributeTotalService;constructor(){}async get(n){return this.itemRepository.get(n)}async list(n,t){return this.itemRepository.list(n,t)}async query(n){return this.itemRepository.query(n)}async all(){return this.itemRepository.all()}async getByTokenId(n){return this.itemRepository.getByTokenId(n)}async getByTokenIds(n){return this.itemRepository.getByTokenIds(n)}async getRowItemViewModelsByAttribute(n,t,e){return this.itemRepository.getRowItemViewModelsByAttribute(n,t,e)}async getRowItemViewModelsByOwner(n,t){return this.itemRepository.getRowItemViewModelsByOwner(n,t)}async getRowItemViewModelsByTokenIds(n){return this.itemRepository.getRowItemViewModelsByTokenIds(n)}async getRowItemViewModelsByTokenId(n){return this.itemRepository.getRowItemViewModelsByTokenId(n)}async listByTokenId(n,t=10){return this.itemRepository.listByTokenId(n,t)}async buildAttributeTotals(n){let t=await this.all();return this.attributeTotalService.buildAttributeTotals(n,t)}async searchTokenIds(n){return this.rowItemViewModelRepository.getByTokenIds(n)}};Ht([(0,vn.f)("ItemRepository"),Lt("design:type",Object)],Jt.prototype,"itemRepository",void 0),Ht([(0,vn.f)("RowItemViewModelRepository"),Lt("design:type",Object)],Jt.prototype,"rowItemViewModelRepository",void 0),Ht([(0,vn.f)("AttributeTotalService"),Lt("design:type",Nt)],Jt.prototype,"attributeTotalService",void 0),Jt=Ht([(0,En.b)(),Lt("design:paramtypes",[])],Jt);var Kt=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},_t=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let ne=class{itemPageRepository;constructor(){}async get(n){return this.itemPageRepository.get(n)}};Kt([(0,vn.f)("ItemPageRepository"),_t("design:type",Object)],ne.prototype,"itemPageRepository",void 0),ne=Kt([(0,En.b)(),_t("design:paramtypes",[])],ne);var te=e(3969),ee=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},re=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};const ae=new te.DOMParser;let ie=class{itemService;channelService;authorService;imageService;schemaService;quillService;animationService;itemPageService;attributeTotalService;allTokensCache;constructor(){}async get(n){let t=await this.itemService.get(n);const e=await this.channelService.get(),r=await this.attributeTotalService.list();return this.getViewModel(t,e,r)}async getByTokenId(n){return this.itemService.getByTokenId(n)}async getViewModel(n,t,e){let r,a,i,o,A=[];if(t.authorId&&(r=await this.authorService.get(t.authorId)),t.attributeOptions.length>0)for(let r of t.attributeOptions){let t=n?.attributeSelections?.filter((n=>r?.traitType==n?.traitType)),a=t?.length>0?t[0].value:void 0,i=e.filter((n=>n.traitType==r.traitType)),o=i?.filter((n=>n.value==a));A.push({id:r.id,traitType:r.traitType,values:r.values,value:a,attributeTotal:o?.length>0?o[0]:void 0})}if(n.coverImageId&&(a=await this.imageService.get(n.coverImageId)),n.animationId&&!n.coverImageAsAnimation){i=await this.animationService.get(n.animationId);let t=ae.parseFromString(i.content,"text/html").getElementsByTagName("body")[0];o=Cn().unescape((new te.B).serializeToString(t)),o="<div"+o.slice(5),o=o.substring(0,o.length-7)+"</div>"}if(n.content?.ops?.length>0){let t=[];for(let e of n.content.ops){if(e.insert&&e.insert.ipfsimage){let n=await this.imageService.get(e.insert.ipfsimage.cid);e.insert.ipfsimage.src=await this.imageService.getUrl(n)}t.push(e)}n.content.ops=t}return{item:n,animation:i,animationContentHTML:o,contentHTML:await this.quillService.translateContent(n.content),channel:t,author:r,authorDisplayName:this.authorService.getDisplayName(r),attributeSelections:A,coverImage:a}}async getMintViewModel(n,t){let e;return n.coverImageId&&(e=await this.imageService.get(n.coverImageId)),{item:n,animation:void 0,channel:t,author:void 0,attributeSelections:[],coverImage:e}}async getSearchViewModel(n,t){return{item:n,animation:void 0,channel:t,author:void 0,attributeSelections:[]}}async getExploreAttributeOptions(n){await this.schemaService.load(["channels","authors","attribute-totals"]);const t=await this.channelService.get();let e=await this.attributeTotalService.list(),r=t.attributeOptions,a=[];for(let t of r){let r=[];for(let a of t.values.sort()){let i=JSON.parse(JSON.stringify(n));delete i[t.traitType];let o=await this._paramsToFilteredIds(i,e),A=e.filter((n=>n.traitType==t.traitType&&n.value==a))[0];A?r.push({value:a,count:A.tokenIds.filter((n=>o.includes(n))).length}):console.log(`${t.traitType} / ${a} totals not found.`)}r.sort(((n,t)=>t.count-n.count));let i={id:t.id,traitType:t.traitType,values:r};a.push(i)}return a}async exploreList(n,t,e){if(await this.schemaService.load(["channels","authors","attribute-totals","row-item-view-models"]),n&&Object.keys(n)?.length>0)return this.exploreQuery(n,t,e);{let n=t/e,r=await this.itemPageService.get(n),a=await this.channelService.get();return{items:r.items,totalMatches:a.itemCount,limit:e,skip:t}}}async exploreQuery(n,t,e){await this.schemaService.load(["channels","authors","attribute-totals","row-item-view-models"]);let r=await this.attributeTotalService.list(),a=await this._paramsToFilteredIds(n,r),i=a.length;return a=a.slice(t,t+e),{items:await this.itemService.searchTokenIds(a),totalMatches:i,limit:e,skip:t}}async _paramsToFilteredIds(n,t){let e=[];for(let t of Object.keys(n))e.push(`${t}:::${n[t]}`);let r=t?.filter((n=>e?.includes(n._id)));return r?.length>0?r.map((n=>n.tokenIds)).reduce(((n,t)=>n.filter((n=>t.includes(n))))):(this.allTokensCache||(this.allTokensCache=Array.from(new Set(t.map((n=>n.tokenIds)).flat()))),this.allTokensCache)}async list(n,t){let e=[];const r=await this.channelService.get(),a=await this.itemService.buildAttributeTotals(r);let i=await this.itemService.list(n,t);for(let n of i)e.push(await this.getViewModel(n,r,a));return e}async mintList(n,t){let e=[];const r=await this.channelService.get();let a=await this.itemService.list(n,t);for(let n of a)e.push(await this.getMintViewModel(n,r));return e}async itemPage(n){return this.itemPageService.get(n)}async attributeItemPage(n,t,e){return this.itemService.getRowItemViewModelsByAttribute(n,t,e)}async ownerItemPage(n,t){return this.itemService.getRowItemViewModelsByOwner(n,t)}async query(n){await this.schemaService.load(["items","channels"]);let t=await this.itemService.query(n);const e=await this.channelService.get();let r=[];for(let n of t)r.push(await this.getSearchViewModel(n,e));return r}async buildItemPages(n,t){let e=[],r=[];for(let t of n){let n=t.item;r.push({_id:n._id,coverImageGenerated:!!t.coverImage.generated,coverImageId:t.coverImage._id,title:`${n.title?n.title:`#${n.tokenId}`}`,tokenId:n.tokenId})}for(let n=0;n<r.length;n+=t)e.push({items:r.slice(n,n+t)});return e}async buildAttributeTotals(n){return this.itemService.buildAttributeTotals(n)}async getRowItemViewModelsByTokenIds(n){return this.itemService.getRowItemViewModelsByTokenIds(n)}translateRowItemViewModel(n,t){return{_id:n._id,coverImageGenerated:!!t.generated,coverImageId:t._id,title:`${n.title?n.title:`#${n.tokenId}`}`,tokenId:n.tokenId}}};ee([(0,vn.f)("ItemService"),re("design:type",Jt)],ie.prototype,"itemService",void 0),ee([(0,vn.f)("ChannelService"),re("design:type",wt)],ie.prototype,"channelService",void 0),ee([(0,vn.f)("AuthorService"),re("design:type",Et)],ie.prototype,"authorService",void 0),ee([(0,vn.f)("ImageService"),re("design:type",Yt)],ie.prototype,"imageService",void 0),ee([(0,vn.f)("SchemaService"),re("design:type",zt)],ie.prototype,"schemaService",void 0),ee([(0,vn.f)("QuillService"),re("design:type",$t)],ie.prototype,"quillService",void 0),ee([(0,vn.f)("AnimationService"),re("design:type",Tt)],ie.prototype,"animationService",void 0),ee([(0,vn.f)("ItemPageService"),re("design:type",ne)],ie.prototype,"itemPageService",void 0),ee([(0,vn.f)("AttributeTotalService"),re("design:type",Nt)],ie.prototype,"attributeTotalService",void 0),ie=ee([(0,En.b)(),re("design:paramtypes",[])],ie);var oe=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Ae=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let le=class{authorService;constructor(){}async get(n){return this.getViewModel(await this.authorService.get(n))}async getViewModel(n){return{author:n,authorDisplayName:this.authorService.getDisplayName(n)}}};oe([(0,vn.f)("AuthorService"),Ae("design:type",Et)],le.prototype,"authorService",void 0),le=oe([(0,En.b)(),Ae("design:paramtypes",[])],le);var se=e(32046),de=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},ce=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let pe=class{metadataRepository;walletService;constructor(){}lastMintedTokenId=0;async getBalance(n){if(!n)return 0;let t=await this.getChannelContract();return parseInt(await t.balanceOf(n))}async getMetadata(n){return this.metadataRepository.get(n)}async mint(n,t){let e=await this.getChannelContract();await e.mint(n,{value:t})}async mintFromStartOrFail(n,t,e){let r=await this.getChannelContract();await r.mintFromStartOrFail(n,t,{value:e})}async mintAsOwner(n){let t=await this.getChannelContract();await t.mint(n,{})}async ownerOf(n){return(await this.getChannelContract()).ownerOf(n)}async getTotalMinted(){return(await this.getChannelContract()).totalMinted()}async getTotalSupply(){return(await this.getChannelContract()).totalSupply()}async owner(){return(await this.getChannelContract()).owner()}async getChannelContract(){let n=await this.walletService.getContract("Channel");if(this.walletService.provider&&0==this.walletService.provider.listeners()?.length){let t={address:n.address,topics:[se.id("MintEvent(uint256)")]};this.walletService.provider.on(t,(async n=>{let t=parseInt(n.data);if(t>this.lastMintedTokenId){this.lastMintedTokenId=t;let n=new CustomEvent("mint-event");n.tokenId=t,document.dispatchEvent(n)}}))}return n}};de([(0,vn.f)("MetadataRepository"),ce("design:type",Object)],pe.prototype,"metadataRepository",void 0),de([(0,vn.f)("WalletService"),ce("design:type",Object)],pe.prototype,"walletService",void 0),pe=de([(0,En.b)(),ce("design:paramtypes",[])],pe);var fe=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},me=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let be=class{tokenContractService;channelService;itemWebService;itemService;schemaService;walletService;constructor(){}async getMintingViewModel(){await this.schemaService.load(["channels","items"]);let n=await this.channelService.get();if(n.contractAddress){let t=await this.tokenContractService.getTotalMinted(),e=[];if(t?.gt(0)){let n=await this.itemService.listByTokenId(t.toNumber());for(let t of n)try{let n=await this.tokenContractService.ownerOf(t.tokenId);e.push({owner:await this.walletService.truncateEthAddress(n),item:t})}catch(n){}}return{totalMinted:t.toNumber(),totalSupply:n.itemCount,mintPrice:n.mintPrice,lastMinted:e,minting:t.toNumber()<n.itemCount}}}async getHomeMintingViewModel(){await this.schemaService.load(["channels"]);let n=await this.channelService.get();if(n.contractAddress)return{totalMinted:(await this.tokenContractService.getTotalMinted()).toNumber(),totalSupply:n.itemCount,mintPrice:n.mintPrice}}async mint(n){await this.schemaService.load(["channels"]);let t=await this.channelService.get(),e=this.calculateTotalMint(t,n),r=await this.tokenContractService.owner();this.walletService.address.toLowerCase()==r.toLowerCase()?(console.log("Minting as owner"),await this.tokenContractService.mintAsOwner(n)):await this.tokenContractService.mint(n,e)}async mintFromStartOrFail(n,t){await this.schemaService.load(["channels"]);let e=await this.channelService.get(),r=this.calculateTotalMint(e,n);await this.tokenContractService.mintFromStartOrFail(n,t,r)}calculateTotalMint(n,t){return globalThis.ethers.utils.parseUnits(n.mintPrice,"ether").mul(t).toString()}};fe([(0,vn.f)("TokenContractService"),me("design:type",pe)],be.prototype,"tokenContractService",void 0),fe([(0,vn.f)("ChannelService"),me("design:type",wt)],be.prototype,"channelService",void 0),fe([(0,vn.f)("ItemWebService"),me("design:type",ie)],be.prototype,"itemWebService",void 0),fe([(0,vn.f)("ItemService"),me("design:type",Jt)],be.prototype,"itemService",void 0),fe([(0,vn.f)("SchemaService"),me("design:type",zt)],be.prototype,"schemaService",void 0),fe([(0,vn.f)("WalletService"),me("design:type",Object)],be.prototype,"walletService",void 0),be=fe([(0,En.b)(),me("design:paramtypes",[])],be);var ge=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Ce=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let he=class{itemWebService;constructor(){}async init(n){n.searchbar.create({el:".searchbar",customSearch:!0,on:{enable:function(){console.log("Searchbar enabled")},search:(n,t,e)=>{}}})}async destroy(n){n.searchbar.destroy(".searchbar")}};ge([(0,vn.f)("ItemWebService"),Ce("design:type",ie)],he.prototype,"itemWebService",void 0),he=ge([(0,En.b)(),Ce("design:paramtypes",[])],he);let ue=class{app;constructor(n){this.app=n}async queuePromiseView(n){const t=this;let e={id:xe.newGuid(),icon:n.icon,title:n.title};return async function(){return new Promise(((n,r)=>{t._beforeSaveAction(e),n()}))}().then((async function(){let r=await n.promise;try{console.log("Transaction hash is ",r),t._showSuccess(r,e)}catch(n){t._showError(n,e)}return r}))}_beforeSaveAction(n){n.toast=this.app.toast.create({text:n.title,closeButton:!0}),n.toast.open()}_showError(n,t){t.toast.close(),console.log(n);let e={text:n.message,closeButton:!0,closeButtonText:"Close",closeTimeout:5e3};this.app.toast.create(e).open()}_showSuccess(n,t){t.toast.close(),this.app.toast.create({text:"Transaction Submitted",closeButton:!0,closeTimeout:5e3}).open()}};var Ee,ve;ue=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}([(0,En.b)(),(Ee=0,ve=(0,vn.f)("framework7"),function(n,t){ve(n,t,Ee)}),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Object])],ue);class xe{static newGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(n){var t=16*Math.random()|0;return("x"==n?t:3&t|8).toString(16)}))}}let we=class{app;constructor(n){this.app=n}showExceptionPopup(n){console.log(n),this.app.dialog.alert(n.message,"There was an error")}showPopup(n){this.app.dialog.alert(n)}showAlert(n){this.app.dialog.alert(n)}spinnerDialog;showSpinner(n){this.spinnerDialog&&this.hideSpinner(),this.spinnerDialog=this.app.dialog.preloader(n||"Loading")}hideSpinner(){this.spinnerDialog&&(this.spinnerDialog.close(),this.spinnerDialog=null)}progressDialog;showProgress(n){this.progressDialog&&this.hideProgress(),this.progressDialog=this.app.dialog.progress(n||"Loading",0)}setProgress(n,t){this.progressDialog&&(this.progressDialog.setProgress(n),this.progressDialog.setText(t))}hideProgress(){this.progressDialog&&(this.progressDialog.close(),this.progressDialog=null)}};we=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}([(0,En.b)(),function(n,t){return function(e,r){t(e,r,n)}}(0,(0,vn.f)("framework7")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Object])],we);class Be extends Error{errors;constructor(n){super(),this.errors=n}}var ke=e(77743),ye=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},De=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let ze=class{readerSettingsRepository;schemaService;constructor(){}async get(){return await this.schemaService.load(["reader-settings"]),this.readerSettingsRepository.get()}async put(n){n.lastUpdated=(new Date).toJSON();let t=await(0,ke.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new Be(t);await this.readerSettingsRepository.put(n)}async updateCurrentPage(n){let t=await this.get();t.currentPage=n,await this.put(t)}};ye([(0,vn.f)("ReaderSettingsRepository"),De("design:type",Object)],ze.prototype,"readerSettingsRepository",void 0),ye([(0,vn.f)("SchemaService"),De("design:type",zt)],ze.prototype,"schemaService",void 0),ze=ye([(0,En.b)(),De("design:paramtypes",[])],ze);var Ie=e(2593);class je{_id;_rev;removed;address;data;topics;logIndex;args;event;eventSignature;isTransfer;isMint;isBurn;namedArgs;lastUpdated;dateCreated}let We=class{constructor(){}async translateEventToERCEvent(n){let t=new je;switch(t.removed=n.removed,t.address=n.address,t.data=n.data,t.topics=n.topics,t.logIndex=n.logIndex,t.event=n.event,t.eventSignature=n.eventSignature,t.dateCreated=(new Date).toJSON(),t.args=n.args.map((n=>Ie.O$.isBigNumber(n)?n.toString():n)),t.namedArgs={},t.event){case"Transfer":t.isTransfer=!0,t.namedArgs.fromAddress=t.args[0],t.namedArgs.toAddress=t.args[1],t.namedArgs.tokenId=t.args[2];break;case"Approval":t.namedArgs.owner=t.args[0],t.namedArgs.approved=t.args[1],t.namedArgs.tokenId=t.args[2];break;case"ApprovalForAll":t.namedArgs.owner=t.args[0],t.namedArgs.operator=t.args[1],t.namedArgs.approved=t.args[2]}return t.isTransfer&&"0x0000000000000000000000000000000000000000"==t.namedArgs.fromAddress&&(t.isMint=!0),t.isTransfer&&"0x0000000000000000000000000000000000000000"==t.namedArgs.toAddress&&(t.isBurn=!0),t}};We=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}([(0,En.b)(),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[])],We);var Fe=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Ye=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Se=class{componentStateRepository;constructor(){}async get(n){return this.componentStateRepository.get(n)}async put(n){n.dateCreated||(n.dateCreated=(new Date).toJSON()),n.lastUpdated=(new Date).toJSON();let t=await(0,ke.GuS)(n,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new Be(t);return this.componentStateRepository.put(n)}};Fe([(0,vn.f)("ComponentStateRepository"),Ye("design:type",Object)],Se.prototype,"componentStateRepository",void 0),Se=Fe([(0,En.b)(),Ye("design:paramtypes",[])],Se);var Ue=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Re=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};class qe{_id;_rev;data;dateCreated;lastUpdated}Ue([(0,At.a)(),Re("design:type",String)],qe.prototype,"_id",void 0),Ue([(0,At.a)(),Re("design:type",String)],qe.prototype,"_rev",void 0),Ue([(0,At.a)(),Re("design:type",Object)],qe.prototype,"data",void 0),Ue([(0,At.a)(),Re("design:type",String)],qe.prototype,"dateCreated",void 0),Ue([(0,At.a)(),Re("design:type",String)],qe.prototype,"lastUpdated",void 0);var Ge=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Xe=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Ze=class{db;dbName="component-state";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1})}constructor(){}async get(n){return Object.assign(new qe,await this.db.get(n))}async put(n){await this.db.put(n)}};Ge([(0,vn.f)("DatabaseService"),Xe("design:type",yn)],Ze.prototype,"databaseService",void 0),Ze=Ge([(0,En.b)(),Xe("design:paramtypes",[])],Ze);var Oe=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Te=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Me=class{tokenOwnerPageRepository;constructor(){}async getHome(){return this.tokenOwnerPageRepository.getHome()}async get(n){return this.tokenOwnerPageRepository.get(n)}async getTotals(){return this.tokenOwnerPageRepository.getTotals()}};Oe([(0,vn.f)("TokenOwnerPageRepository"),Te("design:type",Object)],Me.prototype,"tokenOwnerPageRepository",void 0),Me=Oe([(0,En.b)(),Te("design:paramtypes",[])],Me);var Pe=function(n,t){return function(e,r){t(e,r,n)}};let $e=class{baseURI;hostname;constructor(n,t){this.baseURI=n,this.hostname=t}async getHome(){return(await Bn.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/home.json`)).data}async getTotals(){return(await Bn.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/total.json`)).data}async get(n){return(await Bn.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/${n}.json`)).data}};$e=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}([(0,En.b)(),Pe(0,(0,vn.f)("baseURI")),Pe(1,(0,vn.f)("hostname")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Function,Function])],$e);var Qe=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Ve=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Ne=class{processedTransactionRepository;itemService;constructor(){}async get(n){return this.processedTransactionRepository.get(n)}async getRowItemViewModels(n){let t={},e=new Set;for(let t of n)t.tokenId&&e.add(t.tokenId);let r=await this.itemService.getRowItemViewModelsByTokenIds(Array.from(e));for(let n of r)t[n.tokenId]=n;return t}async translateSalesToViewModels(n){let t=[];for(let e of n)t.push({sale:e,item:await this.itemService.getRowItemViewModelsByTokenId(e.tokenId)});return t}async getSalesReport(){return this.processedTransactionRepository.getSalesReport()}async getAttributeSalesReport(n,t){return this.processedTransactionRepository.getAttributeSalesReport(n,t)}async getAttributesOverall(){return this.processedTransactionRepository.getAttributesOverall()}async getLargestSales(n){return this.processedTransactionRepository.getLargestSales(n)}};Qe([(0,vn.f)("ProcessedTransactionRepository"),Ve("design:type",Object)],Ne.prototype,"processedTransactionRepository",void 0),Qe([(0,vn.f)("ItemService"),Ve("design:type",Jt)],Ne.prototype,"itemService",void 0),Ne=Qe([(0,En.b)(),Ve("design:paramtypes",[])],Ne);var He=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Le=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Je=class{baseURI;processedTransactionService;constructor(n){this.baseURI=n}async getHomeViewModel(){return(await Bn.Z.get(`${this.baseURI()}sync/home.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async list(n){let t=await this.getLatest(),e=(await Bn.Z.get(`${this.baseURI()}sync/transactions/activity/${n}.json`)).data;return e.lastUpdated=t.lastUpdated,e}async listByAddress(n,t){let e=(await Bn.Z.get(`${this.baseURI()}sync/tokenOwner/${n}/activity/${t}.json`)).data,r=await this.getLatest();return e.lastUpdated=r.lastUpdated,e}async getLatest(){return(await Bn.Z.get(`${this.baseURI()}sync/transactions/latest.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async getRecentActivity(){return(await Bn.Z.get(`${this.baseURI()}sync/transactions/recentActivity.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async getSalesReport(){return this.processedTransactionService.getSalesReport()}async getAttributeSalesReport(n,t){return this.processedTransactionService.getAttributeSalesReport(n,t)}async getAttributesOverall(){return this.processedTransactionService.getAttributesOverall()}async getLargestSales(n){return await this.processedTransactionService.getLargestSales(n)}abbreviateDollars(n,t){if(!n)return"$0";var e=Math.log10(Math.abs(n))/3|0;if(0==e||1==e)return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(n);var r=["","","M","G","T","P","E"][e],a=n/Math.pow(10,3*e);return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(a)+r}};He([(0,vn.f)("ProcessedTransactionService"),Le("design:type",Ne)],Je.prototype,"processedTransactionService",void 0),Je=He([(0,En.b)(),function(n,t){return function(e,r){t(e,r,n)}}(0,(0,vn.f)("baseURI")),Le("design:paramtypes",[Function])],Je);var Ke=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o};let _e=class{baseURI;async get(n){let t;try{t=(await Bn.Z.get(`${this.baseURI()}sync/transactions/${n}.json`)).data}catch(n){console.log(n)}return t}async getSalesReport(){let n;try{n=(await Bn.Z.get(`${this.baseURI()}sync/sales/overall.json`)).data}catch(n){console.log(n)}return n}async getAttributeSalesReport(n,t){let e;try{e=(await Bn.Z.get(`${this.baseURI()}sync/attributes/${this.attributeKeyToInteger(`${n}::::${t}`)}/attribute.json`)).data}catch(n){console.log(n)}return e}async getAttributesOverall(){let n;try{n=(await Bn.Z.get(`${this.baseURI()}sync/attributes/totals.json`)).data}catch(n){console.log(n)}return n}attributeKeyToInteger(n){let t,e,r=0;if(0===n.length)return r;for(t=0;t<n.length;t++)e=n.charCodeAt(t),r=(r<<5)-r+e,r|=0;return r}async getLargestSales(n){let t;try{t=(await Bn.Z.get(`${this.baseURI()}sync/sales/largest-${n}.json`)).data}catch(n){console.log(n)}return t}};Ke([(0,vn.f)("baseURI"),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:type",Function)],_e.prototype,"baseURI",void 0),_e=Ke([(0,En.b)()],_e);class nr{}var tr=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},er=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let rr=class{walletService;tokenOwnerRepository;constructor(){}async get(n){return this.tokenOwnerRepository.get(n)}async getDisplayName(n){if(!n)return;return await this.tokenOwnerRepository.getENS(n)||this.walletService.truncateEthAddress(n)}async getOrCreate(n){let t;if(!t)try{t=await this.get(n)}catch(n){}return t||(t=new nr,t._id=n,t.tokenIds=[],t.count=0),t}async put(n){return this.tokenOwnerRepository.put(n)}async putAll(n){return n.forEach((n=>{n._id||(n.dateCreated=(new Date).toJSON()),n.lastUpdated=(new Date).toJSON()})),this.tokenOwnerRepository.putAll(n)}async list(n,t){return this.tokenOwnerRepository.list(n,t)}};tr([(0,vn.f)("WalletService"),er("design:type",Object)],rr.prototype,"walletService",void 0),tr([(0,vn.f)("TokenOwnerRepository"),er("design:type",Object)],rr.prototype,"tokenOwnerRepository",void 0),rr=tr([(0,En.b)(),er("design:paramtypes",[])],rr);let ar=[{id:"0",changeset:async n=>{await n.createIndex({index:{fields:["count"]}}),await n.put({_id:"_design/by_token_id",views:{by_token_id:{map:function(n){for(let t of n.tokenIds)emit(t)}.toString()}}})}}];var ir=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},or=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Ar=class{db;dbName="token-owners";databaseService;baseURI;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1,changesets:ar})}constructor(){}async getENS(n){let t;try{let e=await Bn.Z.get(`${this.baseURI()}sync/tokenOwner/${n}/ens.json`);t=e.data?.name}catch(n){}return t}async get(n){try{let t=await Bn.Z.get(`${this.baseURI()}sync/tokenOwner/${n}/tokenOwner.json`);return Object.assign(new nr,t.data)}catch(n){console.log(n)}}async put(n){}async putAll(n){}async list(n,t){}};ir([(0,vn.f)("DatabaseService"),or("design:type",yn)],Ar.prototype,"databaseService",void 0),ir([(0,vn.f)("baseURI"),or("design:type",Function)],Ar.prototype,"baseURI",void 0),Ar=ir([(0,En.b)(),or("design:paramtypes",[])],Ar);var lr=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},sr=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let dr=class{tokenRepository;constructor(){}async get(n){return this.tokenRepository.get(n)}};lr([(0,vn.f)("TokenRepository"),sr("design:type",Object)],dr.prototype,"tokenRepository",void 0),dr=lr([(0,En.b)(),sr("design:paramtypes",[])],dr);var cr=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},pr=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let fr,mr=class{changesets=[{id:"0",changeset:async n=>{await n.createIndex({index:{fields:["tokenId"]}})}}];db;dbName="row-item-view-models";databaseService;constructor(){}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0,initialRecordsPath:"t/all.json",changesets:this.changesets})}async get(n){return this.db.get(n)}async put(n){await this.db.put(n)}async getByTokenIds(n){let t=await this.db.find({selector:{tokenId:{$in:n}}});return t.docs?.length>0?t.docs:[]}};async function br(n,t,e,r,A,c){return fr||(fr=n,globalThis.baseURI=t,globalThis.hostname=e,globalThis.channelId=c,fr.bind("framework7").toConstantValue((o.ZP.registerComponent("nav-bar",S),o.ZP.registerComponent("token-toolbar",R),o.ZP.registerComponent("mint-list",Z),o.ZP.registerComponent("attribute-filter",V),o.ZP.registerComponent("explore-total-info",H),o.ZP.registerComponent("mint-info",J),o.ZP.registerComponent("largest-sales",_),o.ZP.registerComponent("transaction-viewer",G),o.ZP.registerComponent("transaction-row",sn),o.ZP.registerComponent("leaderboard-rows",cn),o.ZP.registerComponent("search-list",fn),o.ZP.registerComponent("infinite-scroll-content",bn),globalThis.app=new o.ZP({el:"#app",id:"large-reader",name:"Large Reader",theme:"auto",init:!1,view:{browserHistory:!0,browserHistorySeparator:"",browserHistoryOnLoad:!1,browserHistoryInitialMatch:!1},navbar:{hideOnPageScroll:!0},toolbar:{hideOnPageScroll:!0},routes:A}),globalThis.app)),fr.bind("version").toConstantValue(r),fr.bind("PouchDB").toConstantValue(s.Z),fr.bind("PouchFind").toConstantValue(d.Z),fr.bind("PouchQuickSearch").toConstantValue(p()),fr.bind("provider").toConstantValue((()=>{if("undefined"!=typeof window&&window.ethereum)return window.web3Provider=window.ethereum,new a.Q(window.ethereum)})),fr.bind("contracts").toConstantValue((async()=>{let n,t,e=await Bn.Z.get(`${globalThis.hostname}${globalThis.baseURI}backup/contract/contract.json`,{responseType:"json"}),r=await Bn.Z.get(`${globalThis.hostname}${globalThis.baseURI}backup/contract/contract-abi.json`,{responseType:"json"});return 200===e.status&&(n=e.data),200===e.status&&(t=r.data),n.contractAddress?(t.Channel.address=n.contractAddress,t):[]})),fr.bind("baseURI").toConstantValue((()=>globalThis.baseURI)),fr.bind("hostname").toConstantValue((()=>globalThis.hostname)),fr.bind("channelId").toConstantValue((()=>globalThis.channelId)),fr.bind("WalletService").to(wn).inSingletonScope(),fr.bind("ChannelRepository").to(jn).inSingletonScope(),fr.bind("ItemRepository").to(Un).inSingletonScope(),fr.bind("AuthorRepository").to(Xn).inSingletonScope(),fr.bind("MetadataRepository").to(Tn).inSingletonScope(),fr.bind("ImageRepository").to(Qn).inSingletonScope(),fr.bind("AnimationRepository").to(Ln).inSingletonScope(),fr.bind("StaticPageRepository").to(nt).inSingletonScope(),fr.bind("ItemPageRepository").to(et).inSingletonScope(),fr.bind("TokenOwnerPageRepository").to($e).inSingletonScope(),fr.bind("AttributeTotalRepository").to(ot).inSingletonScope(),fr.bind("ReaderSettingsRepository").to(ft).inSingletonScope(),fr.bind("ContractStateRepository").to({}).inSingletonScope(),fr.bind("ComponentStateRepository").to(Ze).inSingletonScope(),fr.bind("TokenOwnerRepository").to(Ar).inSingletonScope(),fr.bind("TokenRepository").to(Ct).inSingletonScope(),fr.bind("ProcessedTransactionRepository").to(_e).inSingletonScope(),fr.bind("RowItemViewModelRepository").to(mr).inSingletonScope(),fr.bind("ChannelWebService").to(Xt).inSingletonScope(),fr.bind("ItemWebService").to(ie).inSingletonScope(),fr.bind("AuthorWebService").to(le).inSingletonScope(),fr.bind("MintWebService").to(be).inSingletonScope(),fr.bind("SearchbarService").to(he).inSingletonScope(),fr.bind("StaticPageService").to(Rt).inSingletonScope(),fr.bind("ItemPageService").to(ne).inSingletonScope(),fr.bind("QueueService").to(ue).inSingletonScope(),fr.bind("TransactionWebService").to(Je).inSingletonScope(),fr.bind("PagingService").to(Bt).inSingletonScope(),fr.bind("DatabaseService").to(yn).inSingletonScope(),fr.bind("AnimationService").to(Tt).inSingletonScope(),fr.bind("UiService").to(we).inSingletonScope(),fr.bind("ItemService").to(Jt).inSingletonScope(),fr.bind("ImageService").to(Yt).inSingletonScope(),fr.bind("ChannelService").to(wt).inSingletonScope(),fr.bind("AuthorService").to(Et).inSingletonScope(),fr.bind("TokenContractService").to(pe).inSingletonScope(),fr.bind("SchemaService").to(zt).inSingletonScope(),fr.bind("QuillService").to($t).inSingletonScope(),fr.bind("AttributeTotalService").to(Nt).inSingletonScope(),fr.bind("ComponentStateService").to(Se).inSingletonScope(),fr.bind("ReaderSettingsService").to(ze).inSingletonScope(),fr.bind("ERCEventService").to(We).inSingletonScope(),fr.bind("GenerateService").to({}).inSingletonScope(),fr.bind("TokenOwnerService").to(rr).inSingletonScope(),fr.bind("TokenService").to(dr).inSingletonScope(),fr.bind("TokenOwnerPageService").to(Me).inSingletonScope(),fr.bind("ProcessedTransactionService").to(Ne).inSingletonScope(),globalThis.container=fr,globalThis.ethers=i,globalThis.he=Cn(),globalThis.moment=l(),globalThis.ComponentState=qe,fr)}cr([(0,vn.f)("DatabaseService"),pr("design:type",yn)],mr.prototype,"databaseService",void 0),mr=cr([(0,En.b)(),pr("design:paramtypes",[])],mr),s.Z.plugin(d.Z),s.Z.plugin(p()),o.ZP.use([f.Z,m.Z,b.Z,g.Z,C.Z,B.Z,k.Z,y.Z,D.Z,h.Z,u.Z,z.Z,E.Z,I.Z,v.Z,x.Z,w.Z,j.Z,W.Z,F.Z]);var gr=e(75131),Cr=e(93379),hr=e.n(Cr),ur=e(7795),Er=e.n(ur),vr=e(90569),xr=e.n(vr),wr=e(3565),Br=e.n(wr),kr=e(19216),yr=e.n(kr),Dr=e(44589),zr=e.n(Dr),Ir=e(56154),jr={};jr.styleTagTransform=zr(),jr.setAttributes=Br(),jr.insert=xr().bind(null,"head"),jr.domAPI=Er(),jr.insertStyleElement=yr(),hr()(Ir.Z,jr),Ir.Z&&Ir.Z.locals&&Ir.Z.locals;var Wr=e(58885),Fr={};Fr.styleTagTransform=zr(),Fr.setAttributes=Br(),Fr.insert=xr().bind(null,"head"),Fr.domAPI=Er(),Fr.insertStyleElement=yr(),hr()(Wr.Z,Fr),Wr.Z&&Wr.Z.locals&&Wr.Z.locals;var Yr=e(29937),Sr={};Sr.styleTagTransform=zr(),Sr.setAttributes=Br(),Sr.insert=xr().bind(null,"head"),Sr.domAPI=Er(),Sr.insertStyleElement=yr(),hr()(Yr.Z,Sr),Yr.Z&&Yr.Z.locals&&Yr.Z.locals;var Ur=e(30796),Rr={};Rr.styleTagTransform=zr(),Rr.setAttributes=Br(),Rr.insert=xr().bind(null,"head"),Rr.domAPI=Er(),Rr.insertStyleElement=yr(),hr()(Ur.Z,Rr),Ur.Z&&Ur.Z.locals&&Ur.Z.locals;var qr=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o},Gr=function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)};let Xr=class{constructor(){}homeRepository;async get(){return this.homeRepository.get(0)}abbreviateDollars(n,t){if(!n)return"$0";var e=Math.log10(Math.abs(n))/3|0;if(0==e||1==e)return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(n);var r=["","","M","G","T","P","E"][e],a=n/Math.pow(10,3*e);return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(a)+r}};qr([(0,vn.f)("HomeRepository"),Gr("design:type",Object)],Xr.prototype,"homeRepository",void 0),Xr=qr([(0,En.b)(),Gr("design:paramtypes",[])],Xr);let Zr=class{libraryURL;constructor(n){this.libraryURL=n}async get(n){return(await Bn.Z.get(`${this.libraryURL}/home.json`)).data}};Zr=function(n,t,e,r){var a,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(n,t,e,r);else for(var A=n.length-1;A>=0;A--)(a=n[A])&&(o=(i<3?a(o):i>3?a(t,e,o):a(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o}([(0,En.b)(),function(n,t){return function(e,r){t(e,r,n)}}(0,(0,vn.f)("libraryURL")),function(n,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,t)}("design:paramtypes",[Object])],Zr);class Or{static resolveWithSpinner(n,t,e){globalThis.app&&(globalThis.app.preloader.show(),n({componentUrl:t,options:e}),globalThis.app.preloader.hide())}static getReaderRoutes(n){const t=[];return"/"!=n&&n.endsWith("/")&&t.push({path:`${n.substring(0,n.length-1)}`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,"index.html")}}),Or.addSharedRoutes(t,n),t.push({path:"(.*)",async async({resolve:n,reject:t,to:e}){console.log(`404 error: ${e.path}`),await Or.resolveWithSpinner(n,"404.html")}}),t}static getLibraryRoutes(n){const t=[{path:`${n}`,async async({resolve:t,reject:e}){await Or.resolveWithSpinner(t,`${n}/index.html`)}},{path:`${n}/`,async async({resolve:t,reject:e}){await Or.resolveWithSpinner(t,`${n}/index.html`)}},{path:`${n}/index.html`,async async({resolve:t,reject:e}){await Or.resolveWithSpinner(t,`${n}/index.html`)}}];return Or.addSharedRoutes(t,"/r/:reader_slug/"),t.push({path:"(.*)",async async({resolve:n,reject:t,to:e}){console.log(`404 error: ${e.path}`),await Or.resolveWithSpinner(n,"l/404.html")}}),t}static addSharedRoutes(n,t){let e;e=t.indexOf(":reader_slug")>0?t.replace(":reader_slug","{{reader_slug}}"):t,n.push({path:`${t}`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}index.html`)}},{path:`${t}index.html`,async async({resolve:n,reject:t}){console.log(),await Or.resolveWithSpinner(n,`${e}index.html`)}},{path:`${t}mint.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}mint.html`)}},{path:`${t}search.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}search.html`)}},{path:`${t}explore.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}explore.html`)}},{path:`${t}activity`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}activity/index.html`)}},{path:`${t}activity/index.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}activity/index.html`)}},{path:`${t}leaderboard`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}leaderboard/index.html`)}},{path:`${t}leaderboard/index.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}leaderboard/index.html`)}},{path:`${t}sales`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}sales/index.html`)}},{path:`${t}sales/index.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}sales/index.html`)}},{path:`${t}attributes`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}attributes/index.html`)}},{path:`${t}attributes/index.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}attributes/index.html`)}},{path:`${t}attribute`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}attribute/index.html`)}},{path:`${t}attribute/index.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}attribute/index.html`)}},{path:`${t}u`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}u/index.html`)}},{path:`${t}u/index.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}u/index.html`)}},{path:`${t}u/activity`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}u/activity/index.html`)}},{path:`${t}u/activity/index.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}u/activity/index.html`)}},{path:`${t}list-:page.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}list-{{page}}.html`)}},{path:`${t}t/:tokenId`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}t/{{tokenId}}/index.html`,{force:!0})}},{path:`${t}t/:tokenId/index.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}t/{{tokenId}}/index.html`,{force:!0})}},{path:`${t}s/:slug.html`,async async({resolve:n,reject:t}){await Or.resolveWithSpinner(n,`${e}s/{{slug}}.html`)}})}}let Tr=async(n,t,e,a,i)=>{if(console.log("Initializing Library"),"serviceWorker"in navigator){const o=new gr.ZW(`${e}/sw-library-${a}.js`,{scope:"/"});let A=new r.W;A.bind("libraryURL").toConstantValue(n),A.bind("HomeWebService").to(Xr).inSingletonScope(),A.bind("HomeRepository").to(Zr).inSingletonScope();let l=Or.getLibraryRoutes(n);A=await br(A,t,e,a,l,i),navigator.serviceWorker.controller?Mr(A,e):o.addEventListener("controlling",(n=>{Mr(A,e)})),o.register()}},Mr=async(n,t)=>{let e=n.get("framework7"),r=window.location.toString().replace(`${t}`,"");e.views.create(".view-main",{url:r}).on("init",(async n=>{console.log(`Navigating to ${r}`),n.router.navigate(r,{reloadCurrent:!0})})),e.init()}},54026:n=>{"use strict";n.exports="data:application/font-woff;charset=utf-8;base64, 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"},49954:n=>{"use strict";n.exports="data:application/font-woff;charset=utf-8;base64, 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"},57578:n=>{"use strict";n.exports="data:application/font-woff;charset=utf-8;base64,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"},6595:n=>{"use strict";n.exports="data:image/svg+xml;charset=UTF-8, %3csvg xmlns=%27http://www.w3.org/2000/svg%27 xmlns:xlink=%27http://www.w3.org/1999/xlink%27 viewBox=%270 0 256 417%27 version=%271.1%27 preserveAspectRatio=%27xMidYMid%27%3e%3cg%3e%3cpolygon fill=%27%23343434%27 points=%27127.9611 0 125.1661 9.5 125.1661 285.168 127.9611 287.958 255.9231 212.32%27/%3e%3cpolygon fill=%27%238C8C8C%27 points=%27127.962 0 0 212.32 127.962 287.959 127.962 154.158%27/%3e%3cpolygon fill=%27%233C3C3B%27 points=%27127.9611 312.1866 126.3861 314.1066 126.3861 412.3056 127.9611 416.9066 255.9991 236.5866%27/%3e%3cpolygon fill=%27%238C8C8C%27 points=%27127.962 416.9052 127.962 312.1852 0 236.5852%27/%3e%3cpolygon fill=%27%23141414%27 points=%27127.9611 287.9577 255.9211 212.3207 127.9611 154.1587%27/%3e%3cpolygon fill=%27%23393939%27 points=%270.0009 212.3208 127.9609 287.9578 127.9609 154.1588%27/%3e%3c/g%3e%3c/svg%3e"},40086:n=>{"use strict";n.exports="data:image/svg+xml;charset=utf-8,<svg height=%2735%27 viewBox=%270 0 96 70%27 width=%2748%27 xmlns=%27http://www.w3.org/2000/svg%27><path d=%27m84 35c1 7-5 37-42 35-37 2-43-28-42-35-1-7 5-37 42-35 37-2 43 28 42 35z%27/></svg>"},18540:n=>{"use strict";n.exports="data:image/svg+xml;charset=utf-8,<svg height=%2735%27 viewBox=%270 0 96 70%27 width=%2748%27 xmlns=%27http://www.w3.org/2000/svg%27><path d=%27m84 35c1 7-5 37-42 35-37 2-43-28-42-35-1-7 5-37 42-35 37-2 43 28 42 35z%27/><path d=%27m96 70c-6-2-12-10-12-19v-16l-14 27s8 8 26 8z%27/></svg>"},14167:n=>{"use strict";n.exports="data:image/svg+xml;charset=utf-8,<svg height=%2735%27 viewBox=%270 0 96 70%27 width=%2748%27 xmlns=%27http://www.w3.org/2000/svg%27><path d=%27m96 35c1 7-5 37-42 35-37 2-43-28-42-35-1-7 5-37 42-35 37-2 43 28 42 35z%27/></svg>"},71154:n=>{"use strict";n.exports="data:image/svg+xml;charset=utf-8,<svg height=%2735%27 viewBox=%270 0 96 70%27 width=%2748%27 xmlns=%27http://www.w3.org/2000/svg%27><path d=%27m96 35c1 7-5 37-42 35-37 2-43-28-42-35-1-7 5-37 42-35 37-2 43 28 42 35z%27/><path d=%27m0 70c6-2 12-10 12-19v-16l14 27s-8 8-26 8z%27/></svg>"},14511:(n,t,e)=>{"use strict";n.exports=e.p+"4b8a7d10ca32f3125696.ttf"},35163:(n,t,e)=>{"use strict";n.exports=e.p+"286bd8fcebb566a45853.woff"},76616:(n,t,e)=>{"use strict";n.exports=e.p+"852655880420bcb785bd.woff2"},80950:()=>{},46601:()=>{},89214:()=>{},96419:()=>{},56353:()=>{},8623:()=>{},7748:()=>{},85568:()=>{},69386:()=>{},31616:()=>{},15525:()=>{},56619:()=>{},77108:()=>{},69862:()=>{},40964:()=>{}},n=>{n.O(0,[216],(()=>(4458,n(n.s=4458))));var t=n.O();library=t}]);
//# sourceMappingURL=main.library.js.map