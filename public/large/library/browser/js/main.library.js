var library;(self.webpackChunklibrary=self.webpackChunklibrary||[]).push([[179],{5328:(e,t,a)=>{"use strict";a.r(t),a.d(t,{initLibrary:()=>En});a(5666),a(8660);var n=a(5717),i=a(7725),r=a(2861),o=a(6492),s=a.n(o),c=a(1376),l=a(6491),d=a(9771),p=a(8614),u=a(7484),f=a.n(u),h=a(4110),g=a.n(h),y=a(6176),v=a.n(y),m=a(8468),b=a(831),w=a(3210),R=a(6879),$=a(4346),S=a(4496),I=a(9746),j=a(860),k=a(9542),O=a(7140),T=a(9859),P=a(5751),x=a(1910),C=a(4892),M=a(8235),D=a(5740);function A(e,{$on:t,$f7:a,$update:n}){let i,r=globalThis.container.get("WalletService"),o=(globalThis.container.get("UiService"),globalThis.container.get("baseURI")),s=globalThis.container.get("hostname"),c=(e.symbol,e.logo,e.title),l=e.active,d=e.library_url,p=e.large_url,u="true"==e.show_mint_page,f="true"==e.show_activity_page,h="true"==e.hide_menu,g=e.breadcrumbs,y=!0;const v=()=>p?.length>0?`${p}/index.html#!/admin/channel/fork-reader?path=${encodeURIComponent(`${s()}${o()}`)}`:`${o()}large/index.html#!/admin/channel/fork-reader?path=${encodeURIComponent(`${s()}${o()}`)}`,m=e=>r.truncateEthAddress(e),b=async e=>{i=void 0,r.provider||await r.initProvider(),i=await r.getAddress(),r.provider||(y=!1),i&&(r.address=i,r.wallet||await r.connect()),n()},w=async e=>{await r.initWallet(),await r.connect(),b()};b();return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="navbar">
        <div class="navbar-bg"></div>

        <div class="navbar-inner sliding">
                
          <div class="left">
            <a href="${d?.length>0?d:o()}">
              <i class="f7-icons">house</i>
            </a>
          </div>


          <div class="title">${c}</div>
          
          <div class="right">
            
            ${h?t` `:t`
              
              <div class="small-only">

                <a href="#" class="link popover-open" data-popover=".popover-menu">
                  <i class="f7-icons">menu</i>
                </a> 
  
                <div class="popover popover-menu">
                  <div class="popover-angle"></div>
                  <div class="popover-inner">                    
                    <div class="list">
                      <ul>
  
                        ${y?t`
          
                            <li>
                              <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title">
                                        ${null!=i?t`
                                          <a href="#" class="button button-fill">${m(i)}</a>
                                      `:t`
                                          <button class="button button-outline button-fill" @click=${w}>
                                            Connect Wallet
                                          </button>
                                      `} 
                                    </div>
                                </div>
                              </div>
                            </li>
  
                            ${u?t`
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
                          <a href="${v()}" class="item-link external popover-close">
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
    
                <a href="${v()}" class="external link">
                  Fork
                </a>
  
                <a class="link ${"Explore"==l?t`link-active`:t` `}" href="${o()}explore.html">
                  Explore
                </a>      
  
                ${f?t`
                  <a class="link ${"Activity"==l?t`link-active`:t` `}" href="${o()}activity">
                    Activity
                  </a> 
  
                  <a class="link ${"Leaderboard"==l?t`link-active`:t` `}" href="${o()}leaderboard" >
                    Leaderboard
                  </a> 
  
                `:t`<span />`}
  
                ${y?t`
  
                  ${u?t`
                    <a class="link ${"Mint"==l?t`link-active`:t` `}" href="${o()}mint.html" >
                      Mint
                    </a> 
                  `:t`<span />`}
  
                  ${null!=i?t`
                      <a href="${o()}u/?address=${i}" class="link" >${m(i)}</a>
                  `:t`
                      <a class="link" @click="${w}">Connect Wallet</a>
                  `} 
       
                `:t`<span style="display: none;" />`}
  
              </div>
              
            `}
            
          </div>



          ${g?t`
                  
            <div class="subnavbar">
              <div class="subnavbar-inner">
        
                <div class="breadcrumbs ">
  
                  ${g.map((e=>t`
                    <div class="breadcrumbs-item">

                      ${e.path?t`
                        <a href="${e.path}" class="link">
                          ${e.text}
                        </a>
                      `:t`${e.text}`}


                    </div>  

                    ${e.path?t`
                      <div class="breadcrumbs-separator"></div>
                    `:t`<span />`}

                    
                  `))}

                </div>
        
              </div>
            </div>


            `:t`<span />`}



          
        </div>
        
    </div>

`}}A.id="c67c990ba3";const U=A;function _(e,{$on:t,$:a,$f7:n,$update:i}){let r=globalThis.container.get("baseURI"),o=globalThis.container.get("ReaderSettingsService"),s=e.token_id,c=e.item_count,l=e.current_page;const d=e=>r()+e,p=async e=>{e.preventDefault();let t=a(e.currentTarget).val();n.preloader.show(),t>0?(await o.updateCurrentPage(parseInt(t)),n.views.main.router.navigate(d("t/"+t),{transition:"f7-flip"})):n.views.main.router.navigate(d("index.html")),n.preloader.hide()},u=e=>{e.preventDefault();const t=n.range.get(e.target);s=t.value,i()};return app.on("current-page-updated",(function(e){l=e,i()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="toolbar toolbar-bottom">
    <div class="toolbar-inner">

        <div style="width: 100%; margin-bottom: -20px;">

            <div style="display: flex;">
            
                ${l&&0==s?t`
                    <a href="${d(`t/${l}`)}" class="button button-outline back-to-page">
                        Back to page ${l}
                    </a>
                `:t`<span />`}
    
    
                <div class="range-slider range-slider-init" 
                    @range:change=${u}
                    data-label="true"
                    >
                
                    <!-- range input -->
                    <input type="range" 
                        min="0" 
                        max="${c}"
                        step="1" 
                        value="${s}" 
                        @change="${p}"
                />
                </div>


            </div>

            <div class="page-number" style="width: 100%;">
                Page <strong>${s}</strong> of ${c}
            </div>


        </div>





    </div>
  </div>

`}}_.id="4cbdc2555d",_.style="\n.page-number {\n    width: 100%;\n    text-align: center;\n    font-size: 13px;\n    margin-bottom: 15px;\n}\n\n.range-slider {\n    width: 100%;\n    margin-left: 20px; \n    margin-right: 20px;\n    flex: 1;\n}\n\n.toolbar a.back-to-page {\n    height: 45px;\n    width: 70px;\n    margin-left: 10px;\n    flex: 0 0 70px;\n    font-size: 10px;\n    text-transform: none;\n    white-space: normal;\n    line-height: 13px;\n}\n";const V=_;function N(e,{$on:t,$f7:a,$update:n}){return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`




`}}N.id="2c4c4b6961",N.style="\n\n\n\n\n";const L=N;function W(e,{$:t,$on:a,$f7:n,$update:i}){let r,o,s=globalThis.container.get("MintWebService"),c=globalThis.container.get("WalletService"),l=globalThis.container.get("QueueService"),d=globalThis.container.get("baseURI")(),p=0,u=1,f=!1;e.baseurl;const h=async()=>{p=s.updateTotal(o,u),await i()};a("stepper:change",(async e=>{u=parseInt(e.detail),await h(),g(u)}));const g=e=>{let a=0;t(".flex-card").each((n=>{t(n).removeClass("selected"),a<e&&(t(n).addClass("selected"),a++)}))},y=async e=>{let t;if(e.preventDefault(),await c.connect(),f){let e=parseInt(r.totalMinted+1);t=s.mintFromStartOrFail(u,e)}else t=s.mint(u);let a={title:"Minting token(s). Approve transaction and wait for it to be mined.",promise:t};await l.queuePromiseView(a)},v=async e=>{f=e.currentTarget.checked,await i()};n.preloader.show();const m=async()=>{await c.connect();try{r=await s.getMintingViewModel(),o=s.parseUnits(r.mintPrice,"ether"),await h();let e=new CustomEvent("mint-view-model-loaded");e.mintingViewModel=r,document.dispatchEvent(e),n.preloader.hide()}catch(e){n.dialog.confirm("Problem connecting to contract on Ethereum Mainnet. Is your wallet connected to the right network?","Problem connecting to network",m,(()=>{n.views.main.router.navigate(d)})),n.preloader.hide()}};m();let b=async e=>{if(e.tokenId>r?.totalMinted){r=await s.getMintingViewModel(),await i();let e=new CustomEvent("mint-view-model-refreshed");e.mintingViewModel=r,e.quantity=u,document.dispatchEvent(e)}};return document.removeEventListener("mint-event",b),document.addEventListener("mint-event",b),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div>
    
    ${r?t`

      ${r.minting?t`

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
              <strong>Total Minted:</strong> ${r.totalMinted} of ${r.totalSupply}
            </p>              
          </div>

          
          <div class="card">
            <div class="card-header card-header-divider">Select between 1-10 NFTs and click the mint button.</div>
            <div class="card-content card-content-padding">
              <form class="list no-hairlines inset" @submit="${y}">
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
                                <strong>Mint Fee:</strong> ${r.mintPrice} ETH
                              </p>
                              <p>
                                <strong>Quantity:</strong> ${u} 
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
    
                        <input type="checkbox" checked="${f}" @change=${v}/>
                        
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
                          <button class="button button-fill ${u<1?"disabled":""}" id="mint-button">Mint</button>
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
        <div class="card">
          <div class="card-header">Minting Complete</div>
          <div class="card-content card-content-padding">
            Minting is complete. Thank you!
          </div>
        </div>
      
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



`}}W.id="432d88c309",W.style="\n\n\n\n.mint-list-card .card-header {\n  font-size: 27px;\n  font-weight: bold;\n}\n\n.mint-list-card .block {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.mint-list-info li {\n  white-space: unset;\n  line-height: unset;\n  height: unset;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\n";const E=W;let Z,F,B=null,H={},q=async e=>F(e);function G(e,{$:t,$on:a,$f7:n,$update:i}){B=[],H={},F=async e=>{Z=e.attributeOptions,e.attributeParams&&(H=e.attributeParams,t("#attribute-accordian-item").addClass("accordion-item-opened")),await i()},document.removeEventListener("attribute-options-loaded",q),document.addEventListener("attribute-options-loaded",q);const r=e=>{H[e.currentTarget.name]=e.currentTarget.value,e.currentTarget.value?H[e.currentTarget.name]=e.currentTarget.value:delete H[e.currentTarget.name];let t=new CustomEvent("explore-attribute-filter-changed");t.attributeParams=H,document.dispatchEvent(t)},o=async e=>{let a=t(e.currentTarget).data("id");delete H[a],await i();let n=new CustomEvent("explore-attribute-filter-changed");n.attributeParams=H,document.dispatchEvent(n)};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div>

    <div class="block block-strong row">
      
      <div class="col-50">

        ${Object.keys(H).map((e=>t`
          <div class="chip">
            <div class="chip-label">${e}: ${H[e]}</div>
            <a href="#" class="chip-delete" @click="${o}" data-id="${e}"></a>
          </div>
        `))}

      </div>
      <div class="col-50 filter-button">
        
        <a href="#" data-popup=".filter-popup" class="popup-open">Filters (${Object.keys(H).length})</a>

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
                    ${Z?.map((e=>t`
                      <li class="item-content item-input">
                        <div class="item-inner">
                          <div class="item-title item-label">${e.traitType}</div>
                          <div class="item-input-wrap input-dropdown-wrap">
                            <select name="${e.traitType}" @change="${r}">
                              <option selected ></option>
                              ${e.values?.map((a=>t`
                                ${a.value==H[e.traitType]?t`
                                  <option value="${a.value}" selected>${a.value} (${a.count})</option>
                                `:t`
                                  <option value="${a.value}">${a.value} (${a.count})</option>
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






`}}G.id="a885824066",G.style="\n\n.item-content.attribute-select {\n  width: 175px;\n  display: inline-block;\n}\n\n\n";const J=G;function z(e,{$:t,$on:a,$f7:n,$update:i}){let r,o;return document.addEventListener("explore-total-info-changed",(async e=>{r=e.totalItems,o=e.totalMatches,await i()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="block-title block-title-small">

    ${o?t`

      ${o!=r?t`
        Showing ${o} results (${r} total)
      `:t`
        Showing 1 - ${r} results  
      `}

    `:t`<span/>`}

  </div>

`}}z.id="e08319241b",z.style="\n\n\n";const Q=z;function K(e,{$:t,$on:a,$f7:n,$update:i}){let r,o=e.baseurl;return app.on("minting-view-model-updated",(function(e){r=e,i()})),function(e){e.$;var t,a=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return a`

  <div class="card card-header-divider">
    <div class="card-header">Mint NFTs</div>
    <div class="card-content card-content-padding">

      ${r?a`
        <p>
          <strong>Total Minted:</strong> ${r.totalMinted} of ${r.totalSupply}
        </p>

        <a href="${t="mint.html",`${o+t}`}" class="link">Mint NFTs</a>

      `:a`
        Minting information unavailable. 
        <p>Note: Use a web browser with wallet support to see NFT information.</p>
      `}


    </div>
  </div>

`}}K.id="fa69d6cb7f",K.style="\n";const X=K;function Y(e,{$:t,$on:a,$f7:n,$update:i}){globalThis.container.get("WalletService"),globalThis.container.get("MintWebService");let r=globalThis.container.get("TransactionWebService"),o=globalThis.container.get("baseURI")();const s=e=>o+e;let c=e.largest_sales;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="block block-strong inset largest-sales">
                    
      ${c?.sales?.map(((e,a)=>t`
        <div class="margin-bottom">

          <div class="rank">#${a+1}</div>

          <div class="square">
            <a href="${s(`t/${e.tokenId}`)}" class="item-link">
              <img src="${s(`backup/export/images/${c.rowItemViewModels[e.tokenId].coverImageId}.${c.rowItemViewModels[e.tokenId].coverImageGenerated?"svg":"jpg"}`)}" alt="${e.tokenId}" height="125" width="125"/>
            </a>
          </div>

          <div class="sale-info margin-top">
            <a href="${s(`t/${e.tokenId}`)}" class="item-link">${c.rowItemViewModels[e.tokenId].title}</a><br />
            ${new Intl.NumberFormat("en-US").format(e.ethValue)} ETH (${r.abbreviateDollars(e.usdValue,2)})
            <div class="date">${dayjs(e.date).format("LL")}</div>
          </div>

        </div>
      `))}
      </div>

  
`}}Y.id="ee4f3535fe";const ee=Y,te=(e,{$h:t})=>{globalThis.container.get("WalletService");let a=globalThis.container.get("TransactionWebService");const n=e=>`${o+e}`;let i=e.transaction,r=e.event,o=e.base_uri,s=e.row_item_view_models,c=e.index;return()=>t`
    
        <tr ${c%2==0?'class="alt-row"':""}>

          <td class="image">
            <a href="${o}t/${r.tokenId}">
              <img src="${(e=>{if(e)return n(e?.coverImageGenerated?"backup/export/images/"+e.coverImageId+".svg":"backup/generated/images/50x50/"+e.coverImageId+".webp")})(s[r.tokenId])}" class="latest-img" alt="${s[r.tokenId]?.title}" height="50" width="50" /> 
            </a>
          </td>

          <td class="label-cell medium-only">

            <a href="${o}t/${r.tokenId}" class="title">
              ${s[r.tokenId]?.title}            
            </a>

          </td>
          <td>
            ${r.isMint?t`
              <a href="https://etherscan.io/tx/${i._id}" class="external" target="_blank">Mint</a>
            `:t`

              ${i?.transactionValue?.markets&&Object.keys(i?.transactionValue?.markets).length>0?t`
                <a href="https://etherscan.io/tx/${i._id}" class="external" target="_blank">Sold</a> on ${Array.from(Object.keys(i.transactionValue?.markets).map((e=>e))).join(", ")} ${i.transactionValue?.aggregator?" / "+i.transactionValue.aggregator:""}

              `:t`
                <a href="https://etherscan.io/tx/${i._id}" class="external" target="_blank">${r.event}</a>
              `}
              
            `}

            <p class="date">${dayjs(1e3*i.timestamp).fromNow()}</p>
          </td>

          <td class="numeric-cell">
            
            <span class="eth-value">${i.transactionValue?.tokenPrice[r.tokenId]?.price.toFixed(5)} ${i.transactionValue?.tokenPrice[r.tokenId]?.currency}</span>
            ${i.transactionValue?.tokenPrice[r.tokenId]?.usdValue?t`
              <br />
              <span class="dollar-value">${a.abbreviateDollars(i.transactionValue?.tokenPrice[r.tokenId]?.usdValue,2)}</span>
            `:t` `}

           </td>
          <td class="numeric-cell medium-only">
            <a href="${o}u/?address=${r.fromAddress}" class="${r.fromAddress==i.from?"is-from":""}">
                  ${ie(r.fromAddress)}
            </a> <span class="f7-icons">arrow_right</span>

            <a href="${o}u/?address=${r.toAddress}" class="${r.toAddress==i.from?"is-from":""}">
              ${ie(r.toAddress)}
            </a>

          </td>
        </tr>
    `},ae=(e,{$h:t})=>{globalThis.container.get("WalletService"),globalThis.container.get("TransactionWebService");const a=e=>`${r+e}`;let n=e.transaction,i=e.event,r=e.base_uri,o=e.row_item_view_models,s=e.index,c=(i?.namedArgs?.owner,i?.namedArgs?.approved);n?.from;return()=>{return t`
      <tr class="${s%2==0?"alt-row":""}">

          <td class="image">
            <a href="${r}t/${i.tokenId}">
              <img src="${e=o[i.tokenId],e.coverImageGenerated?a("backup/export/images/"+e.coverImageId+".svg"):a("backup/generated/images/50x50/"+e.coverImageId+".webp")}" class="latest-img" alt="${o[i.tokenId].title}" height="40" width="40" /> 
            </a>
          </td>

          <td class="label-cell medium-only">

            <a href="${r}t/${i.tokenId}" class="title">
              ${o[i.tokenId].title}            
            </a>

            
          </td>
          <td>
            <a href="https://etherscan.io/tx/${n._id}" class="external" target="_blank">${i.event}</a> <br />
            
            <p class="date">${dayjs(1e3*n.timestamp).fromNow()}</p>
          </td>

          <td class="numeric-cell"></td>
          <td class="medium-only numeric-cell">
            <a href="#">${c}</a>
          </td>
        </tr>
    `;var e}},ne=(e,{$h:t})=>{globalThis.container.get("WalletService"),globalThis.container.get("TransactionWebService");let a=e.transaction,n=e.event,i=e.base_uri,r=e.index;return()=>t`
        <tr class="${r%2==0?"alt-row":""}">

          <td class="image">
            ${n.namedArgs.approved?t`🟢`:t`🔴`}
          </td>

          <td class="label-cell medium-only">
            
          </td>
          <td>
             <a href="https://etherscan.io/tx/${a._id}" class="external" target="_blank">${n.event}</a>  <br />

             <p class="date">${dayjs(1e3*a.timestamp).fromNow()}</p>
          </td>

          <td class="numeric-cell"></td>
          <td class="medium-only numeric-cell">
            <a href="${i}u/?address=${n.namedArgs.owner}" class="${n.namedArgs.owner==a.from?"is-from":""}">${ie(n.namedArgs.owner)}</a> 
            <span class="f7-icons">arrow_right</span>
            <a href="${i}u/?address=${n.namedArgs.operator}" class="${n.namedArgs?.operator==a.from?"is-from":""}">${ie(n.namedArgs.operator)}</a>
          </td>

        </tr>
    `},ie=e=>{let t=globalThis.container.get("WalletService");return re?.ens&&re.ens[e]?re.ens[e]:t.truncateEthAddress(e)};let re,oe,se=async e=>oe(e);function ce(e,{$:t,$on:a,$f7:n,$update:i}){globalThis.container.get("WalletService");let r=globalThis.container.get("baseURI")();globalThis.moment;re=e.transactions;let o=e.items,s=e.token;return oe=async e=>{re=e.transactionsViewModel,await i()},document.removeEventListener("transactions-updated",se),document.addEventListener("transactions-updated",se),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`
  
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
          ${re?.transactions.map(((e,a)=>t`
  
            ${e.events?.map((n=>t`
  
              ${"Approval"!=n.event||s&&n?.tokenId!=s?t` `:t`
                <${ae} transaction=${e.transaction} event=${n} base_uri=${r} row_item_view_models=${o} index="${a}" />
              `}
          
              ${"Transfer"!=n.event||s&&n?.tokenId!=s?t` `:t`
                <${te} transaction=${e.transaction} event=${n} base_uri=${r} row_item_view_models=${o} index="${a}"/>
              `}
          
              ${"ApprovalForAll"!=n.event||s&&n?.tokenId!=s?t` `:t`
                <${ne} transaction=${e.transaction} event=${n} base_uri=${r} index="${a}"/>
              `}
          
            `))}
  
  
          `))}
        </tbody>
      </table>
    </div>

  </div>

`}}ce.id="8f32c94bf0",ce.style="\n\n";const le=ce;function de(e,{$:t,$on:a,$f7:n,$update:i}){let r=globalThis.container.get("TransactionWebService"),o=globalThis.container.get("WalletService"),s=globalThis.container.get("baseURI")(),c=e.token_owners;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`
  
  <tbody>
                                    
    ${c?.map((e=>t`
        <tr>
            <td class="label-cell">
                ${e.rank}
            </td>

            <td class="address-cell">

                ${e.ensName?t`
                    <a href="${s}u/?address=${e._id}">${e.ensName}</a>
                `:t`
                    <a href="${s}u/?address=${e._id}">${e._id?o.truncateEthAddress(e._id):" "}</a>
                `} 

            </td>


            <td class="numeric-cell">
                ${e.count}
            </td>

            <td class="numeric-cell">
                <span class="eth-value">${new Intl.NumberFormat("en-US").format(e.salesReport?.buys?.ethValue?e.salesReport?.buys?.ethValue:0)} ETH</span> <br />
                <span class="dollar-value">${r.abbreviateDollars(e.salesReport?.buys?.usdValue?e.salesReport?.buys?.usdValue:0,2)}</span>
            </td>

            <td class="numeric-cell">
                <span class="eth-value">${new Intl.NumberFormat("en-US").format(e.salesReport?.sales?.ethValue?e.salesReport?.sales?.ethValue:0)} ETH</span> <br />
                <span class="dollar-value">${r.abbreviateDollars(e.salesReport?.sales?.usdValue?e.salesReport?.sales?.usdValue:0,2)}</span>
            </td>

            <td class="text-cell">
                ${e.lastActive?dayjs(e.lastActive).fromNow():""}
            </td>


        </tr>
    
    `))}
    </tbody>

`}}de.id="a752ac4c2b";const pe=de;function ue(e,{$:t,$on:a,$f7:n,$update:i}){let r=globalThis.container.get("ItemWebService"),o=globalThis.container.get("baseURI")();const s=e=>o+e;let c,l=!1;const d=async e=>{e.preventDefault(),t(".searchbar input").blur(),n.preloader.showIn(".cards-list"),l=!0,i(),c=await r.query(t(".searchbar input").val()),l=!1,i(),n.preloader.hideIn(".cards-list")};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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

        ${c?t`
          
          ${c?.length>0?t`
          
            ${c?.map((e=>t`
              <li class="card item-card">
                <div class="card-content card-content-padding">
                  ${e.item.excerpt?t`
                  
                    <div class="item-preview">
    
                      <div class="left">
                        
                          <a class="title" href="${s(`token-${e.item.tokenId}.html`)}">
                              ${e.item.title}
                              <span class="channel-show-token-id">#${e.item.tokenId}</span>
                          </a>
    
                          <p innerHTML="${e.item.excerpt}">
                              
                          </p>
    
                      </div>
    
                      ${e.coverImage?t`
                        <div class="right">
                          <a class="title" href="${s(`token-${e.item.tokenId}.html`)}">
                            <img src="backup/export/images/${e.coverImage._id}.${e.coverImage.generated?"svg":"jpg"}" />
                          </a>
                        </div>
                      `:t`<span />`}
    
                    </div>
    
    
                  `:t`
                  
                    <div class="item-preview">
                      <div class="left">
    
                          <a class="title" href="${s(`t/${e.item.tokenId}`)}">
                            ${e.item.title} <span class="channel-show-token-id">#${e.item.tokenId}</span>
                          </a>
    
                          <div class="content" innerHTML="${e.item.contentHTML}"></div>
    
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

`}}ue.id="f7d9b13979",ue.style="\n\n.block-search {\n  background: #f1f1f1;\n  font-size: 14px;\n}\n\n";const fe=ue;function he(e,{$:t,$on:a,$f7:n,$update:i}){let r=e.baseurl,o=e.items;const s=e=>`${r+e}`;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="row" id="item-list">
                            
        ${o?.length>0?t`
                                    
            ${o.map((e=>t`
                <div class="card col-100 large-25">
                    <div class="card-content">
                        <div class="card-content card-content-padding">
                            <div class="square">
                                <a href="${s(`token-${e.item.tokenId}.html`)}">
                                    <img src="${s(`backup/export/images/${e.coverImage._id}`)}.${e.coverImage.generated?"svg":"jpg"}" />
                                </a>
                            </div>

                            <div class="preview-info">
                                <a href="">${e.item.title?e.item.title+" ":""} #${e.item.tokenId}</a>
                            </div>
                        </div>
                    </div>
                </div>
            `))}


        `:t`<span />`}             
                                            
    </div>  
  
`}}he.id="397c8a744b",he.style="\n";const ge=he;var ye=a(5466),ve=a(1906),me=a(5556),be=a(3571),we=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Re=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},$e=function(e,t){return function(a,n){t(a,n,e)}};let Se=class{contracts;getProvider;$f7;wallet;address;ethersContracts={};provider;constructor(e,t,a){this.contracts=e,this.getProvider=t,this.$f7=a}async initProvider(){this.provider=await this.getProvider(),globalThis.ethereum?.on("accountsChanged",(async e=>{delete this.address,e?.length>0&&await this.initWallet(),this.$f7.views.main.router.refreshPage()})),globalThis.ethereum?.on("networkChanged",(async e=>{this.ethersContracts={},this.provider=await this.getProvider(),await this.initWallet()}))}async initWallet(){console.log("Init wallet"),delete this.address,this.provider||await this.initProvider();let e=await this.provider.send("eth_accounts",[]);if(e?.length>0)return this.connect();console.log("Init wallet complete")}async connect(){console.log("Connect wallet"),await this.provider.send("eth_requestAccounts",[]),this.wallet=await this.provider.getSigner(),this.address=await this.getAddress(),console.log(`Wallet ${this.address} connected`)}async getAddress(){if(!this.provider)return;let e=await this.provider.send("eth_accounts",[]);return e?.length>0?me.K(e[0]):void 0}async getWallet(){return this.provider.getSigner()}async getContract(e){let t=(await this.contracts())[e];return this.ethersContracts[e]=new be.CH(t.address,t.abi,this.wallet?this.wallet:this.provider),this.ethersContracts[e]}truncateEthAddress(e){if(!e)return;const t=e.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);return t?`${t[1]}…${t[2]}`:e}};Se=we([(0,ye.b)(),$e(0,(0,ve.f)("contracts")),$e(1,(0,ve.f)("provider")),$e(2,(0,ve.f)("framework7")),Re("design:paramtypes",[Function,Function,Object])],Se);var Ie=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},je=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},ke=function(e,t){return function(a,n){t(a,n,e)}};let Oe=class{baseURI;hostname;PouchDB;channelId;dbCache={};constructor(e,t,a,n){this.baseURI=e,this.hostname=t,this.PouchDB=a,this.channelId=n}async getDatabase(e){let t=await this.PouchDB();const a=`./pouch/${this.channelId()}/${e.name}`;if(this.dbCache[a])return this.dbCache[a];this.dbCache[a]=new t(a);const n=await this.dbCache[a].info();if(0==n.doc_count&&0==n.update_seq){if(e.changesets){console.log(`Creating indexes for ${a}`);let t={_id:"_local/changesets",ids:[]};for(let n of e.changesets)await n.changeset(this.dbCache[a]),t.ids.push(n.id),console.log(`New changeset detected...${n.id}`);await this.dbCache[a].put(t)}e.initialRecords&&await this.loadInitialRecords(e,a)}else if(e.changesets){let t;try{t=await this.dbCache[a].get("_local/changesets")}catch(e){}t||(t={_id:"_local/changesets",ids:[]});let n=!1;for(let i of e.changesets)if(!t.ids.includes(i.id)){try{await i.changeset(this.dbCache[a])}catch(e){}t.ids.push(i.id),n=!0,console.log(`New changeset detected...${i.id}`)}n&&(console.log("Saving changeset log...",t),await this.dbCache[a].put(t))}return this.dbCache[a]}async loadInitialRecords(e,t){let a;a=e.initialRecordsPath?await fetch(`${this.hostname()}${this.baseURI()}${e.initialRecordsPath}`):await fetch(`${this.hostname()}${this.baseURI()}backup/export/backup/${e.name}.json`);let n=await a.json();n?.length>0&&(console.log(`Loading ${n?.length} initial records for ${t}`),await this.dbCache[t].bulkDocs(n))}};Oe=Ie([(0,ye.b)(),ke(0,(0,ve.f)("baseURI")),ke(1,(0,ve.f)("hostname")),ke(2,(0,ve.f)("PouchDB")),ke(3,(0,ve.f)("channelId")),je("design:paramtypes",[Function,Function,Object,Function])],Oe);var Te=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Pe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},xe=function(e,t){return function(a,n){t(a,n,e)}};let Ce=class{baseURI;hostname;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}}),await e.createIndex({index:{fields:["lastUpdated"]}})}}];db;dbName="channels";databaseService;constructor(e,t){this.baseURI=e,this.hostname=t}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(){let e,t=await this.db.allDocs({include_docs:!0});for(let a of t.rows)a.doc.dateCreated&&(e=a.doc);const a=await r.Z.get(`${this.hostname()}${this.baseURI()}backup/contract/contract.json`);return a?.data&&(e.contractAddress=a.data.contractAddress),e}};Te([(0,ve.f)("DatabaseService"),Pe("design:type",Oe)],Ce.prototype,"databaseService",void 0),Ce=Te([(0,ye.b)(),xe(0,(0,ve.f)("baseURI")),xe(1,(0,ve.f)("hostname")),Pe("design:paramtypes",[Function,Function])],Ce);class Me{_id;_rev;channelId;tokenId;title;link;description;content;contentHTML;excerpt;authorId;category;attributeSelections;coverImageId;coverImageAsAnimation;originalJSONMetadata;animationId;datePublished;dateCreated;lastUpdated}var De=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ae=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Ue=function(e,t){return function(a,n){t(a,n,e)}};let _e=class{baseURI;hostname;static CHUNK_SIZE=10;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["tokenId"]}})}}];db;dbName="items";databaseService;constructor(e,t){this.baseURI=e,this.hostname=t}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(e){return Object.assign(new Me,await this.db.get(e))}async put(e){await this.db.put(e)}async list(e,t=10){return(await this.db.find({selector:{tokenId:{$exists:!0}},sort:[{tokenId:"asc"}],limit:t,skip:e})).docs}async getByTokenId(e){let t=await this.db.find({selector:{tokenId:{$eq:e}},limit:1});if(t.docs?.length>0)return t.docs[0]}async getByTokenIds(e){let t=await this.db.find({selector:{tokenId:{$in:e}}});return t.docs?.length>0?t.docs:[]}async getRowItemViewModelsByAttribute(e,t,a){const n=e=>e.replace(/[^a-z0-9]/gi,"_").toLowerCase();let i;return i=(await r.Z.get(`${this.hostname()}${this.baseURI()}attributes/items/${n(e)}/${n(t)}/${a}.json`)).data,i}async getRowItemViewModelsByOwner(e,t){let a;return a=(await r.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/${e}/tokens/${t}.json`)).data,a}async getRowItemViewModelsByTokenIds(e){let t=[];for(let a of e){const e=await r.Z.get(`${this.hostname()}${this.baseURI()}t/${a}/rowItemViewModel.json`);t.push(e.data)}return t}async getRowItemViewModelsByTokenId(e){return(await r.Z.get(`${this.hostname()}${this.baseURI()}t/${e}/rowItemViewModel.json`)).data}async listByTokenId(e,t){return(await this.db.find({selector:{tokenId:{$eq:e}},sort:[{tokenId:"desc"}],limit:t})).docs}async query(e){return(await this.db.search({query:e,fields:["contentHTML","title","tokenId"],include_docs:!0,highlighting:!0,limit:10})).rows.map((e=>(e.highlighting.contentHTML&&(e.doc.contentHTML=e.highlighting.contentHTML),e.doc.contentHTML=e.doc.contentHTML.replace(/<img .*?>/g,""),e.doc)))}async all(){return(await this.db.find({selector:{tokenId:{$exists:!0}},sort:[{tokenId:"asc"}],limit:1e5,skip:0})).docs}};De([(0,ve.f)("DatabaseService"),Ae("design:type",Oe)],_e.prototype,"databaseService",void 0),_e=De([(0,ye.b)(),Ue(0,(0,ve.f)("baseURI")),Ue(1,(0,ve.f)("hostname")),Ae("design:paramtypes",[Function,Function])],_e);class Ve{_id;_rev;walletAddress;name;description;url;coverPhotoId;dateCreated;lastUpdated}var Ne=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Le=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let We=class{db;dbName="authors";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(e){return Object.assign(new Ve,await this.db.get(e))}};Ne([(0,ve.f)("DatabaseService"),Le("design:type",Oe)],We.prototype,"databaseService",void 0),We=Ne([(0,ye.b)(),Le("design:paramtypes",[])],We);class Ee{tokenId;name;description;image;image_data;external_url;attributes;background_color;animation_url}var Ze=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Fe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Be=function(e,t){return function(a,n){t(a,n,e)}};let He=class{baseURI;hostname;static CHUNK_SIZE=10;constructor(e,t){this.baseURI=e,this.hostname=t}async get(e){const t=await r.Z.get(`${this.hostname()}${this.baseURI()}backup/metadata/${e}.json`);return Object.assign(new Ee,t.data)}};He=Ze([(0,ye.b)(),Be(0,(0,ve.f)("baseURI")),Be(1,(0,ve.f)("hostname")),Fe("design:paramtypes",[Function,Function])],He);class qe{_id;data;cid;buffer;svg;generated}var Ge=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Je=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ze=class{db;dbName="images";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(e){return Object.assign(new qe,await this.db.get(e))}async list(){}};Ge([(0,ve.f)("DatabaseService"),Je("design:type",Oe)],ze.prototype,"databaseService",void 0),ze=Ge([(0,ye.b)(),Je("design:paramtypes",[])],ze);class Qe{_id;_rev;content;cid;dateCreated}var Ke=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Xe=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ye=class{db;dbName="animations";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(e){return Object.assign(new Qe,await this.db.get(e))}};Ke([(0,ve.f)("DatabaseService"),Xe("design:type",Oe)],Ye.prototype,"databaseService",void 0),Ye=Ke([(0,ye.b)(),Xe("design:paramtypes",[])],Ye);class et{_id;_rev;channelId;name;slug;content;contentHTML;contentMarkdown;locations;dateCreated;lastUpdated}var tt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},at=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let nt=class{changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["channelId"]}}),await e.createIndex({index:{fields:["dateCreated"]}})}}];db;dbName="static-pages";databaseService;constructor(){}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(e){return Object.assign(new et,await this.db.get(e))}async listByLocation(e,t){return(await this.db.find({selector:{locations:{$all:[e]},dateCreated:{$exists:!0}},sort:[{dateCreated:"asc"}],skip:t})).docs}};tt([(0,ve.f)("DatabaseService"),at("design:type",Oe)],nt.prototype,"databaseService",void 0),nt=tt([(0,ye.b)(),at("design:paramtypes",[])],nt);var it=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},rt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},ot=function(e,t){return function(a,n){t(a,n,e)}};let st=class{baseURI;hostname;constructor(e,t){this.baseURI=e,this.hostname=t}async get(e){return(await r.Z.get(`${this.hostname()}${this.baseURI()}itemPages/${e}.json`)).data}};st=it([(0,ye.b)(),ot(0,(0,ve.f)("baseURI")),ot(1,(0,ve.f)("hostname")),rt("design:paramtypes",[Function,Function])],st);class ct{_id;traitType;value;count;categoryPercent;tokenIds}var lt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},dt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let pt=class{db;dbName="attribute-totals";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0,initialRecordsPath:"attributeTotals.json"})}constructor(){}async get(e){return Object.assign(new ct,await this.db.get(e))}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}async put(e){await this.db.put(e)}async list(e,t){return(await this.db.find({selector:{count:{$exists:!0}},limit:e,skip:t})).docs}};lt([(0,ve.f)("DatabaseService"),dt("design:type",Oe)],pt.prototype,"databaseService",void 0),pt=lt([(0,ye.b)(),dt("design:paramtypes",[])],pt);var ut=a(5494),ft=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ht=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class gt{_id;_rev;currentPage;lastPageJump;dateCreated;lastUpdated}ft([(0,ut.a)(),ht("design:type",String)],gt.prototype,"_id",void 0),ft([(0,ut.a)(),ht("design:type",String)],gt.prototype,"_rev",void 0),ft([(0,ut.a)(),ht("design:type",Number)],gt.prototype,"currentPage",void 0),ft([(0,ut.a)(),ht("design:type",Number)],gt.prototype,"lastPageJump",void 0),ft([(0,ut.a)(),ht("design:type",String)],gt.prototype,"dateCreated",void 0),ft([(0,ut.a)(),ht("design:type",String)],gt.prototype,"lastUpdated",void 0);var yt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},vt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let mt=class{db;dbName="reader-settings";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1})}constructor(){}async put(e){e._id="reader-settings",await this.db.put(e)}async get(){let e;try{e=await this.db.get("reader-settings")}catch(e){}return e||(e=new gt,e._id="reader-settings"),Object.assign(new gt,e)}};yt([(0,ve.f)("DatabaseService"),vt("design:type",Oe)],mt.prototype,"databaseService",void 0),mt=yt([(0,ye.b)(),vt("design:paramtypes",[])],mt);class bt{}var wt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Rt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let $t=class{baseURI;constructor(){}async get(e){try{let t=await r.Z.get(`${this.baseURI()}sync/tokens/${e}/token.json`);return Object.assign(new bt,t.data)}catch(e){}}};wt([(0,ve.f)("baseURI"),Rt("design:type",Function)],$t.prototype,"baseURI",void 0),$t=wt([(0,ye.b)(),Rt("design:paramtypes",[])],$t);var St=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},It=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let jt=class{authorRepository;walletService;constructor(){}async get(e){return this.authorRepository.get(e)}getDisplayName(e){if(e)return e.name?e.name:this.walletService.truncateEthAddress(e._id)}};St([(0,ve.f)("AuthorRepository"),It("design:type",Object)],jt.prototype,"authorRepository",void 0),St([(0,ve.f)("WalletService"),It("design:type",Object)],jt.prototype,"walletService",void 0),jt=St([(0,ye.b)(),It("design:paramtypes",[])],jt);var kt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ot=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Tt=class{channelRepository;constructor(){}async get(){return this.channelRepository.get()}};kt([(0,ve.f)("ChannelRepository"),Ot("design:type",Object)],Tt.prototype,"channelRepository",void 0),Tt=kt([(0,ye.b)(),Ot("design:paramtypes",[])],Tt);var Pt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},xt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ct=class{constructor(){}buildPagingViewModel(e,t,a,n){let i=new Mt;return i.offset=e||0,i.limit=t,i.count=a,i.start=i.offset+1,i.end=Math.min(i.offset+t,a),i.previousOffset=Math.max(i.offset-t,0),i.offset+t<a&&(i.nextOffset=i.offset+t),i.page=i.offset/i.limit+1,i.page>i.endPage&&(i.page=i.endPage),i.endPage=Math.ceil(i.count/i.limit),i.lastOffset=i.endPage*i.limit-i.limit,i.showNext=i.endPage>i.page,i.showPrevious=0!=i.offset,i.showFirst=i.page>2,i.showLast=i.page<i.endPage-1,i}calculateEndIndex(e,t,a){let n=t+e-1;return Math.min(a-1,n)}calculateDescendingEndIndex(e,t){let a=t-(e-1);return Math.max(0,a)}calculateDescendingOffset(e,t){let a=t-1-e;return Math.max(0,a)}};Ct=Pt([(0,ye.b)(),xt("design:paramtypes",[])],Ct);class Mt{page;pageNumbers;endPage;offset;limit;count;start;end;previousOffset;nextOffset;lastOffset;showPrevious;showNext;showFirst;showLast}var Dt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},At=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ut=class{itemRepository;channelRepository;authorRepository;imageRepository;animationRepository;staticPageRepository;readerSettingsRepository;rowItemViewModelRepository;attributeTotalRepository;componentStateRepository;constructor(){}async load(e){const t=this.getRepositories();for(let a of e){let e=t.filter((e=>e.dbName==a))[0];await(e?.load())}}async reloadAll(){const e=this.getRepositories();for(let t of e)await t.load()}getRepositories(){const e=[];return e.push(this.itemRepository),e.push(this.channelRepository),e.push(this.authorRepository),e.push(this.imageRepository),e.push(this.animationRepository),e.push(this.staticPageRepository),e.push(this.readerSettingsRepository),e.push(this.staticPageRepository),e.push(this.readerSettingsRepository),e.push(this.attributeTotalRepository),e.push(this.componentStateRepository),e.push(this.rowItemViewModelRepository),e}async loadWallet(e){console.log(`Loading wallet: ${e}`)}};Dt([(0,ve.f)("ItemRepository"),At("design:type",Object)],Ut.prototype,"itemRepository",void 0),Dt([(0,ve.f)("ChannelRepository"),At("design:type",Object)],Ut.prototype,"channelRepository",void 0),Dt([(0,ve.f)("AuthorRepository"),At("design:type",Object)],Ut.prototype,"authorRepository",void 0),Dt([(0,ve.f)("ImageRepository"),At("design:type",Object)],Ut.prototype,"imageRepository",void 0),Dt([(0,ve.f)("AnimationRepository"),At("design:type",Object)],Ut.prototype,"animationRepository",void 0),Dt([(0,ve.f)("StaticPageRepository"),At("design:type",Object)],Ut.prototype,"staticPageRepository",void 0),Dt([(0,ve.f)("ReaderSettingsRepository"),At("design:type",Object)],Ut.prototype,"readerSettingsRepository",void 0),Dt([(0,ve.f)("RowItemViewModelRepository"),At("design:type",Object)],Ut.prototype,"rowItemViewModelRepository",void 0),Dt([(0,ve.f)("AttributeTotalRepository"),At("design:type",Object)],Ut.prototype,"attributeTotalRepository",void 0),Dt([(0,ve.f)("ComponentStateRepository"),At("design:type",Object)],Ut.prototype,"componentStateRepository",void 0),Ut=Dt([(0,ye.b)(),At("design:paramtypes",[])],Ut);var _t=a(2555),Vt=a.n(_t),Nt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Lt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Wt=class{imageRepository;constructor(){}async get(e){return this.imageRepository.get(e)}async list(){return this.imageRepository.list()}async getUrl(e){return e.buffer||e.svg?e.buffer?this.bufferToDataURL("image/jpg",e.buffer):e.svg?this.getSVGURL(e):void 0:""}async getSVGURL(e){return e.svg?this.svgToDataURL(e.svg):""}svgToDataURL(e){return Vt()(e)}bufferToDataURL(e,t){return`data:${e};base64,${t.toString("base64")}`}};Nt([(0,ve.f)("ImageRepository"),Lt("design:type",Object)],Wt.prototype,"imageRepository",void 0),Wt=Nt([(0,ye.b)(),Lt("design:paramtypes",[])],Wt);var Et=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Zt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ft=class{staticPageRepository;constructor(){}async get(e){return this.staticPageRepository.get(e)}async listByLocation(e,t){return this.staticPageRepository.listByLocation(e,t)}async listRoutablePages(e){let t=[];if(e?.length>0&&t.push(...e),t=t.concat(await this.staticPageRepository.listByLocation("navbar",0)),t=t.concat(await this.staticPageRepository.listByLocation("links",0)),t=JSON.parse(JSON.stringify(t)),t?.length>0)for(let e of t)delete e?.content,delete e?.contentHTML,delete e?.contentMarkdown;return t}};Et([(0,ve.f)("StaticPageRepository"),Zt("design:type",Object)],Ft.prototype,"staticPageRepository",void 0),Ft=Et([(0,ye.b)(),Zt("design:paramtypes",[])],Ft);var Bt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ht=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let qt=class{channelService;authorService;imageService;pagingService;schemaService;walletService;staticPageService;loadedChannelData;constructor(){}async get(e,t){return this.getViewModel(await this.channelService.get(),e,t)}async getViewModel(e,t,a){let n,i;e.authorId&&(n=await this.authorService.get(e.authorId));let r=e.itemCount,o=this.pagingService.buildPagingViewModel(t,10,r,5),s=["navbar","links","index","none"],c={};for(let e of s)c[e]=await this.staticPageService.listByLocation(e,0);if(a?.length>0)for(let e of a)for(let t of e?.locations)c[t].push(e);return e.coverImageId&&(i=await this.imageService.get(e.coverImageId)),{channelContractAbbrev:e.contractAddress?this.walletService.truncateEthAddress(e.contractAddress):void 0,channel:e,staticPagesViewModel:c,author:n,authorDisplayName:this.authorService.getDisplayName(n),itemCount:r,pagingViewModel:o,coverImage:i}}async loadChannel(e,t,a){globalThis.channelId=e,globalThis.baseURI=t,globalThis.hostname=a}async loadChannelData(e){e&&this.loadedChannelData!=e&&(await this.schemaService.reloadAll(),await this.schemaService.load(["component-state"])),this.loadedChannelData=e}};Bt([(0,ve.f)("ChannelService"),Ht("design:type",Tt)],qt.prototype,"channelService",void 0),Bt([(0,ve.f)("AuthorService"),Ht("design:type",jt)],qt.prototype,"authorService",void 0),Bt([(0,ve.f)("ImageService"),Ht("design:type",Wt)],qt.prototype,"imageService",void 0),Bt([(0,ve.f)("PagingService"),Ht("design:type",Ct)],qt.prototype,"pagingService",void 0),Bt([(0,ve.f)("SchemaService"),Ht("design:type",Ut)],qt.prototype,"schemaService",void 0),Bt([(0,ve.f)("WalletService"),Ht("design:type",Object)],qt.prototype,"walletService",void 0),Bt([(0,ve.f)("StaticPageService"),Ht("design:type",Ft)],qt.prototype,"staticPageService",void 0),qt=Bt([(0,ye.b)(),Ht("design:paramtypes",[])],qt);var Gt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Jt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let zt=class{animationRepository;constructor(){}async get(e){return this.animationRepository.get(e)}};Gt([(0,ve.f)("AnimationRepository"),Jt("design:type",Object)],zt.prototype,"animationRepository",void 0),zt=Gt([(0,ye.b)(),Jt("design:paramtypes",[])],zt);var Qt=a(8554),Kt=a(9810),Xt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Yt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ea=class{constructor(){}async translateContent(e){if(!e?.ops)return"";const t=new Qt.bc(e.ops,{});return t.renderCustomWith((function(e,t){if("divider"===e.insert.type)return"<hr />";if("ipfsimage"===e.insert.type){let t=`<img src="${e.insert.value.src}" `;return e.insert.value.width&&(t+=`width="${e.insert.value.width}" `),e.insert.value.height&&(t+=`height="${e.insert.value.height}" `),e.insert.value.style&&(t+=`style="${e.insert.value.style}"`),t+="/>",t}})),t.convert()}async generateMarkdown(e){return(0,Kt.deltaToMarkdown)(e)}};ea=Xt([(0,ye.b)(),Yt("design:paramtypes",[])],ea);var ta=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},aa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let na=class{attributeTotalRepository;constructor(){}async get(e){return this.attributeTotalRepository.get(e)}async put(e){return this.attributeTotalRepository.put(e)}async getByIds(e){return this.attributeTotalRepository.getByIds(e)}async list(){return this.attributeTotalRepository.list()}async buildAttributeTotals(e,t){let a=[],n=new Set(t.map((e=>e.attributeSelections.map((e=>`${e.traitType}:::${e.value}`)))).flat());for(let e of n){let t={_id:e,traitType:e.substring(0,e.indexOf(":::")),value:e.substring(e.indexOf(":::")+3,e.length),count:0,tokenIds:[]};a.push(t)}for(let e of t)for(let t of e.attributeSelections){let n=a.filter((e=>e.traitType==t.traitType&&e.value==t.value))[0];n.tokenIds.push(e.tokenId),n.count++}for(let t of a)t.categoryPercent=new Intl.NumberFormat("default",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(t.count/e.itemCount);return a.sort(((e,t)=>t.count-e.count)),a}};ta([(0,ve.f)("AttributeTotalRepository"),aa("design:type",Object)],na.prototype,"attributeTotalRepository",void 0),na=ta([(0,ye.b)(),aa("design:paramtypes",[])],na);var ia=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ra=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let oa=class{itemRepository;rowItemViewModelRepository;attributeTotalService;constructor(){}async get(e){return this.itemRepository.get(e)}async list(e,t){return this.itemRepository.list(e,t)}async query(e){return this.itemRepository.query(e)}async all(){return this.itemRepository.all()}async getByTokenId(e){return this.itemRepository.getByTokenId(e)}async getByTokenIds(e){return this.itemRepository.getByTokenIds(e)}async getRowItemViewModelsByAttribute(e,t,a){return this.itemRepository.getRowItemViewModelsByAttribute(e,t,a)}async getRowItemViewModelsByOwner(e,t){return this.itemRepository.getRowItemViewModelsByOwner(e,t)}async getRowItemViewModelsByTokenIds(e){return this.itemRepository.getRowItemViewModelsByTokenIds(e)}async getRowItemViewModelsByTokenId(e){return this.itemRepository.getRowItemViewModelsByTokenId(e)}async listByTokenId(e,t=10){return this.itemRepository.listByTokenId(e,t)}async buildAttributeTotals(e){let t=await this.all();return this.attributeTotalService.buildAttributeTotals(e,t)}async searchTokenIds(e){return this.rowItemViewModelRepository.getByTokenIds(e)}};ia([(0,ve.f)("ItemRepository"),ra("design:type",Object)],oa.prototype,"itemRepository",void 0),ia([(0,ve.f)("RowItemViewModelRepository"),ra("design:type",Object)],oa.prototype,"rowItemViewModelRepository",void 0),ia([(0,ve.f)("AttributeTotalService"),ra("design:type",na)],oa.prototype,"attributeTotalService",void 0),oa=ia([(0,ye.b)(),ra("design:paramtypes",[])],oa);var sa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ca=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let la=class{itemPageRepository;constructor(){}async get(e){return this.itemPageRepository.get(e)}};sa([(0,ve.f)("ItemPageRepository"),ca("design:type",Object)],la.prototype,"itemPageRepository",void 0),la=sa([(0,ye.b)(),ca("design:paramtypes",[])],la);var da=a(3969),pa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ua=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const fa=new da.DOMParser;let ha=class{itemService;channelService;authorService;imageService;schemaService;quillService;animationService;itemPageService;attributeTotalService;allTokensCache;constructor(){}async get(e){let t=await this.itemService.get(e);const a=await this.channelService.get(),n=await this.attributeTotalService.list();return this.getViewModel(t,a,n)}async getByTokenId(e){return this.itemService.getByTokenId(e)}async getViewModel(e,t,a){let n,i,r,o,c=[];if(t.authorId&&(n=await this.authorService.get(t.authorId)),t.attributeOptions.length>0)for(let n of t.attributeOptions){let t=e?.attributeSelections?.filter((e=>n?.traitType==e?.traitType)),i=t?.length>0?t[0].value:void 0,r=a.filter((e=>e.traitType==n.traitType)),o=r?.filter((e=>e.value==i));c.push({id:n.id,traitType:n.traitType,values:n.values,value:i,attributeTotal:o?.length>0?o[0]:void 0})}if(e.coverImageId&&(i=await this.imageService.get(e.coverImageId)),e.animationId&&!e.coverImageAsAnimation){r=await this.animationService.get(e.animationId);let t=fa.parseFromString(r.content,"text/html").getElementsByTagName("body")[0];o=s().unescape((new da.B).serializeToString(t)),o="<div"+o.slice(5),o=o.substring(0,o.length-7)+"</div>"}if(e.content?.ops?.length>0){let t=[];for(let a of e.content.ops){if(a.insert&&a.insert.ipfsimage){let e=await this.imageService.get(a.insert.ipfsimage.cid);a.insert.ipfsimage.src=await this.imageService.getUrl(e)}t.push(a)}e.content.ops=t}return{item:e,animation:r,animationContentHTML:o,contentHTML:await this.quillService.translateContent(e.content),channel:t,author:n,authorDisplayName:this.authorService.getDisplayName(n),attributeSelections:c,coverImage:i}}async getMintViewModel(e,t){let a;return e.coverImageId&&(a=await this.imageService.get(e.coverImageId)),{item:e,animation:undefined,channel:t,author:undefined,attributeSelections:[],coverImage:a}}async getSearchViewModel(e,t){return{item:e,animation:undefined,channel:t,author:undefined,attributeSelections:[]}}async getExploreAttributeOptions(e){await this.schemaService.load(["channels","authors","attribute-totals"]);const t=await this.channelService.get();let a=await this.attributeTotalService.list(),n=t.attributeOptions,i=[];for(let t of n){let n=[];for(let i of t.values.sort()){let r=JSON.parse(JSON.stringify(e));delete r[t.traitType];let o=await this._paramsToFilteredIds(r,a),s=a.filter((e=>e.traitType==t.traitType&&e.value==i))[0];s&&n.push({value:i,count:s.tokenIds.filter((e=>o.includes(e))).length})}n.sort(((e,t)=>t.count-e.count));let r={id:t.id,traitType:t.traitType,values:n};i.push(r)}return i}async exploreList(e,t,a){if(await this.schemaService.load(["channels","authors","attribute-totals","row-item-view-models"]),e&&Object.keys(e)?.length>0)return this.exploreQuery(e,t,a);{let e=t/a,n=await this.itemPageService.get(e),i=await this.channelService.get();return{items:n.items,totalMatches:i.itemCount,limit:a,skip:t}}}async exploreQuery(e,t,a){await this.schemaService.load(["channels","authors","attribute-totals","row-item-view-models"]);let n=await this.attributeTotalService.list(),i=await this._paramsToFilteredIds(e,n),r=i.length;return i=i.slice(t,t+a),{items:await this.itemService.searchTokenIds(i),totalMatches:r,limit:a,skip:t}}async _paramsToFilteredIds(e,t){let a=[];for(let t of Object.keys(e))a.push(`${t}:::${e[t]}`);let n=t?.filter((e=>a?.includes(e._id)));return n?.length>0?n.map((e=>e.tokenIds)).reduce(((e,t)=>e.filter((e=>t.includes(e))))):(this.allTokensCache||(this.allTokensCache=Array.from(new Set(t.map((e=>e.tokenIds)).flat()))),this.allTokensCache)}async list(e,t){let a=[];const n=await this.channelService.get(),i=await this.itemService.buildAttributeTotals(n);let r=await this.itemService.list(e,t);for(let e of r)a.push(await this.getViewModel(e,n,i));return a}async mintList(e,t){let a=[];const n=await this.channelService.get();let i=await this.itemService.list(e,t);for(let e of i)a.push(await this.getMintViewModel(e,n));return a}async itemPage(e){return this.itemPageService.get(e)}async attributeItemPage(e,t,a){return this.itemService.getRowItemViewModelsByAttribute(e,t,a)}async ownerItemPage(e,t){return this.itemService.getRowItemViewModelsByOwner(e,t)}async query(e){await this.schemaService.load(["items","channels"]);let t=await this.itemService.query(e);const a=await this.channelService.get();let n=[];for(let e of t)n.push(await this.getSearchViewModel(e,a));return n}async buildItemPages(e,t){let a=[],n=[];for(let t of e){let e=t.item;n.push({_id:e._id,coverImageGenerated:!!t.coverImage.generated,coverImageId:t.coverImage._id,title:`${e.title?e.title:`#${e.tokenId}`}`,tokenId:e.tokenId})}for(let e=0;e<n.length;e+=t)a.push({items:n.slice(e,e+t)});return a}async buildAttributeTotals(e){return this.itemService.buildAttributeTotals(e)}async getRowItemViewModelsByTokenIds(e){return this.itemService.getRowItemViewModelsByTokenIds(e)}translateRowItemViewModel(e,t){return{_id:e._id,coverImageGenerated:!!t.generated,coverImageId:t._id,title:`${e.title?e.title:`#${e.tokenId}`}`,tokenId:e.tokenId}}};pa([(0,ve.f)("ItemService"),ua("design:type",oa)],ha.prototype,"itemService",void 0),pa([(0,ve.f)("ChannelService"),ua("design:type",Tt)],ha.prototype,"channelService",void 0),pa([(0,ve.f)("AuthorService"),ua("design:type",jt)],ha.prototype,"authorService",void 0),pa([(0,ve.f)("ImageService"),ua("design:type",Wt)],ha.prototype,"imageService",void 0),pa([(0,ve.f)("SchemaService"),ua("design:type",Ut)],ha.prototype,"schemaService",void 0),pa([(0,ve.f)("QuillService"),ua("design:type",ea)],ha.prototype,"quillService",void 0),pa([(0,ve.f)("AnimationService"),ua("design:type",zt)],ha.prototype,"animationService",void 0),pa([(0,ve.f)("ItemPageService"),ua("design:type",la)],ha.prototype,"itemPageService",void 0),pa([(0,ve.f)("AttributeTotalService"),ua("design:type",na)],ha.prototype,"attributeTotalService",void 0),ha=pa([(0,ye.b)(),ua("design:paramtypes",[])],ha);var ga=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ya=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let va=class{authorService;constructor(){}async get(e){return this.getViewModel(await this.authorService.get(e))}async getViewModel(e){return{author:e,authorDisplayName:this.authorService.getDisplayName(e)}}};ga([(0,ve.f)("AuthorService"),ya("design:type",jt)],va.prototype,"authorService",void 0),va=ga([(0,ye.b)(),ya("design:paramtypes",[])],va);var ma=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ba=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let wa=class{metadataRepository;walletService;getEthers;constructor(){}lastMintedTokenId=0;async getBalance(e){if(!e)return 0;let t=await this.getChannelContract();return parseInt(await t.balanceOf(e))}async getMetadata(e){return this.metadataRepository.get(e)}async mint(e,t){let a=await this.getChannelContract();await a.mint(e,{value:t})}async mintFromStartOrFail(e,t,a){let n=await this.getChannelContract();await n.mintFromStartOrFail(e,t,{value:a})}async mintAsOwner(e){let t=await this.getChannelContract();await t.mint(e,{})}async ownerOf(e){return(await this.getChannelContract()).ownerOf(e)}async getTotalMinted(){return(await this.getChannelContract()).totalMinted()}async getTotalSupply(){return(await this.getChannelContract()).totalSupply()}async owner(){return(await this.getChannelContract()).owner()}async getChannelContract(){let e=await this.getEthers(),t=await this.walletService.getContract("Channel");if(this.walletService.provider&&0==this.walletService.provider.listeners()?.length){let a={address:t.address,topics:[e.id("MintEvent(uint256)")]};this.walletService.provider.on(a,(async e=>{let t=parseInt(e.data);if(t>this.lastMintedTokenId){this.lastMintedTokenId=t;let e=new CustomEvent("mint-event");e.tokenId=t,document.dispatchEvent(e)}}))}return t}};ma([(0,ve.f)("MetadataRepository"),ba("design:type",Object)],wa.prototype,"metadataRepository",void 0),ma([(0,ve.f)("WalletService"),ba("design:type",Object)],wa.prototype,"walletService",void 0),ma([(0,ve.f)("ethers"),ba("design:type",Function)],wa.prototype,"getEthers",void 0),wa=ma([(0,ye.b)(),ba("design:paramtypes",[])],wa);var Ra=a(4905),$a=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Sa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ia=class{tokenContractService;channelService;itemService;schemaService;walletService;constructor(){}async getMintingViewModel(){await this.schemaService.load(["channels","items"]);let e=await this.channelService.get();if(e.contractAddress){let t=await this.tokenContractService.getTotalMinted(),a=[];if(Number(t)>0){let e=await this.itemService.listByTokenId(Number(t));for(let t of e)try{let e=await this.tokenContractService.ownerOf(t.tokenId);a.push({owner:await this.walletService.truncateEthAddress(e),item:t})}catch(e){}}return{totalMinted:Number(t),totalSupply:e.itemCount,mintPrice:e.mintPrice,lastMinted:a,minting:Number(t)<e.itemCount}}}async getHomeMintingViewModel(){await this.schemaService.load(["channels"]);let e=await this.channelService.get();if(e.contractAddress){let t=await this.tokenContractService.getTotalMinted();return{totalMinted:Number(t),totalSupply:e.itemCount,mintPrice:e.mintPrice}}}async mint(e){await this.schemaService.load(["channels"]);let t=await this.channelService.get(),a=await this.calculateTotalMint(t,e),n=await this.tokenContractService.owner();this.walletService.address.toLowerCase()==n.toLowerCase()?(console.log("Minting as owner"),await this.tokenContractService.mintAsOwner(e)):await this.tokenContractService.mint(e,a)}async mintFromStartOrFail(e,t){await this.schemaService.load(["channels"]);let a=await this.channelService.get(),n=await this.calculateTotalMint(a,e);await this.tokenContractService.mintFromStartOrFail(e,t,n)}async calculateTotalMint(e,t){let a=Ra.vz(e.mintPrice,"ether");return(Number(a)*t).toString()}async updateTotal(e,t){return Ra.bM(Number(e)*t)}async parseUnits(e){return Ra.vz(e,"ether")}};$a([(0,ve.f)("TokenContractService"),Sa("design:type",wa)],Ia.prototype,"tokenContractService",void 0),$a([(0,ve.f)("ChannelService"),Sa("design:type",Tt)],Ia.prototype,"channelService",void 0),$a([(0,ve.f)("ItemService"),Sa("design:type",oa)],Ia.prototype,"itemService",void 0),$a([(0,ve.f)("SchemaService"),Sa("design:type",Ut)],Ia.prototype,"schemaService",void 0),$a([(0,ve.f)("WalletService"),Sa("design:type",Object)],Ia.prototype,"walletService",void 0),Ia=$a([(0,ye.b)(),Sa("design:paramtypes",[])],Ia);var ja=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ka=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Oa=function(e,t){return function(a,n){t(a,n,e)}};let Ta=class{app;constructor(e){this.app=e}async queuePromiseView(e){const t=this;let a={id:Pa.newGuid(),icon:e.icon,title:e.title};return async function(){return new Promise(((e,n)=>{t._beforeSaveAction(a),e()}))}().then((async function(){let n=await e.promise;try{console.log("Transaction hash is ",n),t._showSuccess(n,a)}catch(e){t._showError(e,a)}return n}))}_beforeSaveAction(e){e.toast=this.app.toast.create({text:e.title,closeButton:!0}),e.toast.open()}_showError(e,t){t.toast.close(),console.log(e);let a={text:e.message,closeButton:!0,closeButtonText:"Close",closeTimeout:5e3};this.app.toast.create(a).open()}_showSuccess(e,t){t.toast.close();this.app.toast.create({text:"Transaction Submitted",closeButton:!0,closeTimeout:5e3}).open()}};Ta=ja([(0,ye.b)(),Oa(0,(0,ve.f)("framework7")),ka("design:paramtypes",[Object])],Ta);class Pa{static newGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}}var xa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ca=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Ma=function(e,t){return function(a,n){t(a,n,e)}};let Da=class{app;constructor(e){this.app=e}showExceptionPopup(e){console.log(e),this.app.dialog.alert(e.message,"There was an error")}showPopup(e){this.app.dialog.alert(e)}showAlert(e){this.app.dialog.alert(e)}spinnerDialog;showSpinner(e){this.spinnerDialog&&this.hideSpinner(),this.spinnerDialog=this.app.dialog.preloader(e||"Loading")}hideSpinner(){this.spinnerDialog&&(this.spinnerDialog.close(),this.spinnerDialog=null)}progressDialog;showProgress(e){this.progressDialog&&this.hideProgress();this.progressDialog=this.app.dialog.progress(e||"Loading",0)}setProgress(e,t){this.progressDialog&&(this.progressDialog.setProgress(e),this.progressDialog.setText(t))}hideProgress(){this.progressDialog&&(this.progressDialog.close(),this.progressDialog=null)}};Da=xa([(0,ye.b)(),Ma(0,(0,ve.f)("framework7")),Ca("design:paramtypes",[Object])],Da);class Aa extends Error{errors;constructor(e){super(),this.errors=e}}var Ua=a(7743),_a=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Va=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Na=class{readerSettingsRepository;schemaService;constructor(){}async get(){return await this.schemaService.load(["reader-settings"]),this.readerSettingsRepository.get()}async put(e){e.lastUpdated=(new Date).toJSON();let t=await(0,Ua.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new Aa(t);await this.readerSettingsRepository.put(e)}async updateCurrentPage(e){let t=await this.get();t.currentPage=e,await this.put(t)}};_a([(0,ve.f)("ReaderSettingsRepository"),Va("design:type",Object)],Na.prototype,"readerSettingsRepository",void 0),_a([(0,ve.f)("SchemaService"),Va("design:type",Ut)],Na.prototype,"schemaService",void 0),Na=_a([(0,ye.b)(),Va("design:paramtypes",[])],Na);class La{_id;_rev;removed;address;data;topics;logIndex;args;event;eventSignature;isTransfer;isMint;isBurn;namedArgs;lastUpdated;dateCreated}var Wa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ea=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Za=class{constructor(){}async translateEventToERCEvent(e){let t=new La;switch(t.removed=e.removed,t.address=e.address,t.data=e.data,t.topics=e.topics,t.logIndex=e.index,t.event=e.fragment.name,t.eventSignature=e.eventSignature,t.dateCreated=(new Date).toJSON(),t.args=e.args.map((e=>e.toString())),t.namedArgs={},t.event){case"Transfer":t.isTransfer=!0,t.namedArgs.fromAddress=t.args[0],t.namedArgs.toAddress=t.args[1],t.namedArgs.tokenId=t.args[2];break;case"Approval":t.namedArgs.owner=t.args[0],t.namedArgs.approved=t.args[1],t.namedArgs.tokenId=t.args[2];break;case"ApprovalForAll":t.namedArgs.owner=t.args[0],t.namedArgs.operator=t.args[1],t.namedArgs.approved=t.args[2]}return t.isTransfer&&"0x0000000000000000000000000000000000000000"==t.namedArgs.fromAddress&&(t.isMint=!0),t.isTransfer&&"0x0000000000000000000000000000000000000000"==t.namedArgs.toAddress&&(t.isBurn=!0),t}};Za=Wa([(0,ye.b)(),Ea("design:paramtypes",[])],Za);var Fa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ba=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ha=class{componentStateRepository;constructor(){}async get(e){return this.componentStateRepository.get(e)}async put(e){e.dateCreated||(e.dateCreated=(new Date).toJSON()),e.lastUpdated=(new Date).toJSON();let t=await(0,Ua.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new Aa(t);return this.componentStateRepository.put(e)}};Fa([(0,ve.f)("ComponentStateRepository"),Ba("design:type",Object)],Ha.prototype,"componentStateRepository",void 0),Ha=Fa([(0,ye.b)(),Ba("design:paramtypes",[])],Ha);var qa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ga=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Ja{_id;_rev;data;dateCreated;lastUpdated}qa([(0,ut.a)(),Ga("design:type",String)],Ja.prototype,"_id",void 0),qa([(0,ut.a)(),Ga("design:type",String)],Ja.prototype,"_rev",void 0),qa([(0,ut.a)(),Ga("design:type",Object)],Ja.prototype,"data",void 0),qa([(0,ut.a)(),Ga("design:type",String)],Ja.prototype,"dateCreated",void 0),qa([(0,ut.a)(),Ga("design:type",String)],Ja.prototype,"lastUpdated",void 0);var za=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Qa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ka=class{db;dbName="component-state";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1})}constructor(){}async get(e){return Object.assign(new Ja,await this.db.get(e))}async put(e){await this.db.put(e)}};za([(0,ve.f)("DatabaseService"),Qa("design:type",Oe)],Ka.prototype,"databaseService",void 0),Ka=za([(0,ye.b)(),Qa("design:paramtypes",[])],Ka);var Xa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ya=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let en=class{tokenOwnerPageRepository;constructor(){}async getHome(){return this.tokenOwnerPageRepository.getHome()}async get(e){return this.tokenOwnerPageRepository.get(e)}async getTotals(){return this.tokenOwnerPageRepository.getTotals()}};Xa([(0,ve.f)("TokenOwnerPageRepository"),Ya("design:type",Object)],en.prototype,"tokenOwnerPageRepository",void 0),en=Xa([(0,ye.b)(),Ya("design:paramtypes",[])],en);var tn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},an=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},nn=function(e,t){return function(a,n){t(a,n,e)}};let rn=class{baseURI;hostname;constructor(e,t){this.baseURI=e,this.hostname=t}async getHome(){return(await r.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/home.json`)).data}async getTotals(){return(await r.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/total.json`)).data}async get(e){return(await r.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/${e}.json`)).data}};rn=tn([(0,ye.b)(),nn(0,(0,ve.f)("baseURI")),nn(1,(0,ve.f)("hostname")),an("design:paramtypes",[Function,Function])],rn);var on=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},sn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let cn=class{processedTransactionRepository;itemService;constructor(){}async get(e){return this.processedTransactionRepository.get(e)}async getRowItemViewModels(e){let t={},a=new Set;for(let t of e)t.tokenId&&a.add(t.tokenId);let n=await this.itemService.getRowItemViewModelsByTokenIds(Array.from(a));for(let e of n)t[e.tokenId]=e;return t}async translateSalesToViewModels(e){let t=[];for(let a of e)t.push({sale:a,item:await this.itemService.getRowItemViewModelsByTokenId(a.tokenId)});return t}async getSalesReport(){return this.processedTransactionRepository.getSalesReport()}async getAttributeSalesReport(e,t){return this.processedTransactionRepository.getAttributeSalesReport(e,t)}async getAttributesOverall(){return this.processedTransactionRepository.getAttributesOverall()}async getLargestSales(e){return this.processedTransactionRepository.getLargestSales(e)}};on([(0,ve.f)("ProcessedTransactionRepository"),sn("design:type",Object)],cn.prototype,"processedTransactionRepository",void 0),on([(0,ve.f)("ItemService"),sn("design:type",oa)],cn.prototype,"itemService",void 0),cn=on([(0,ye.b)(),sn("design:paramtypes",[])],cn);var ln=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},dn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},pn=function(e,t){return function(a,n){t(a,n,e)}};let un=class{baseURI;processedTransactionService;constructor(e){this.baseURI=e}async getHomeViewModel(){return(await r.Z.get(`${this.baseURI()}sync/home.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async list(e){let t=await this.getLatest(),a=(await r.Z.get(`${this.baseURI()}sync/transactions/activity/${e}.json`)).data;return a.lastUpdated=t.lastUpdated,a}async listByAddress(e,t){let a=(await r.Z.get(`${this.baseURI()}sync/tokenOwner/${e}/activity/${t}.json`)).data,n=await this.getLatest();return a.lastUpdated=n.lastUpdated,a}async getLatest(){return(await r.Z.get(`${this.baseURI()}sync/transactions/latest.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async getRecentActivity(){return(await r.Z.get(`${this.baseURI()}sync/transactions/recentActivity.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async getSalesReport(){return this.processedTransactionService.getSalesReport()}async getAttributeSalesReport(e,t){return this.processedTransactionService.getAttributeSalesReport(e,t)}async getAttributesOverall(){return this.processedTransactionService.getAttributesOverall()}async getLargestSales(e){return await this.processedTransactionService.getLargestSales(e)}abbreviateDollars(e,t){if(!e)return"$0";var a=Math.log10(Math.abs(e))/3|0;if(0==a||1==a){return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(e)}var n=["","","M","G","T","P","E"][a],i=e/Math.pow(10,3*a);return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(i)+n}};ln([(0,ve.f)("ProcessedTransactionService"),dn("design:type",cn)],un.prototype,"processedTransactionService",void 0),un=ln([(0,ye.b)(),pn(0,(0,ve.f)("baseURI")),dn("design:paramtypes",[Function])],un);var fn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},hn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let gn=class{baseURI;async get(e){let t;try{t=(await r.Z.get(`${this.baseURI()}sync/transactions/${e}.json`)).data}catch(e){console.log(e)}return t}async getSalesReport(){let e;try{e=(await r.Z.get(`${this.baseURI()}sync/sales/overall.json`)).data}catch(e){console.log(e)}return e}async getAttributeSalesReport(e,t){let a;try{a=(await r.Z.get(`${this.baseURI()}sync/attributes/${this.attributeKeyToInteger(`${e}::::${t}`)}/attribute.json`)).data}catch(e){console.log(e)}return a}async getAttributesOverall(){let e;try{e=(await r.Z.get(`${this.baseURI()}sync/attributes/totals.json`)).data}catch(e){console.log(e)}return e}attributeKeyToInteger(e){let t,a,n=0;if(0===e.length)return n;for(t=0;t<e.length;t++)a=e.charCodeAt(t),n=(n<<5)-n+a,n|=0;return n}async getLargestSales(e){let t;try{t=(await r.Z.get(`${this.baseURI()}sync/sales/largest-${e}.json`)).data}catch(e){console.log(e)}return t}};fn([(0,ve.f)("baseURI"),hn("design:type",Function)],gn.prototype,"baseURI",void 0),gn=fn([(0,ye.b)()],gn);class yn{}var vn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},mn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let bn=class{walletService;tokenOwnerRepository;constructor(){}async get(e){return this.tokenOwnerRepository.get(e)}async getDisplayName(e){if(!e)return;let t=await this.tokenOwnerRepository.getENS(e);return t||this.walletService.truncateEthAddress(e)}async getOrCreate(e){let t;if(!t)try{t=await this.get(e)}catch(e){}return t||(t=new yn,t._id=e,t.tokenIds=[],t.count=0),t}async put(e){return this.tokenOwnerRepository.put(e)}async putAll(e){return e.forEach((e=>{e._id||(e.dateCreated=(new Date).toJSON()),e.lastUpdated=(new Date).toJSON()})),this.tokenOwnerRepository.putAll(e)}async list(e,t){return this.tokenOwnerRepository.list(e,t)}};vn([(0,ve.f)("WalletService"),mn("design:type",Object)],bn.prototype,"walletService",void 0),vn([(0,ve.f)("TokenOwnerRepository"),mn("design:type",Object)],bn.prototype,"tokenOwnerRepository",void 0),bn=vn([(0,ye.b)(),mn("design:paramtypes",[])],bn);let wn=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["count"]}}),await e.put({_id:"_design/by_token_id",views:{by_token_id:{map:function(e){for(let t of e.tokenIds)emit(t)}.toString()}}})}}];var Rn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},$n=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Sn=class{db;dbName="token-owners";databaseService;baseURI;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1,changesets:wn})}constructor(){}async getENS(e){let t;try{let a=await r.Z.get(`${this.baseURI()}sync/tokenOwner/${e}/ens.json`);t=a.data?.name}catch(e){}return t}async get(e){try{let t=await r.Z.get(`${this.baseURI()}sync/tokenOwner/${e}/tokenOwner.json`);return Object.assign(new yn,t.data)}catch(e){console.log(e)}}async put(e){}async putAll(e){}async list(e,t){}};Rn([(0,ve.f)("DatabaseService"),$n("design:type",Oe)],Sn.prototype,"databaseService",void 0),Rn([(0,ve.f)("baseURI"),$n("design:type",Function)],Sn.prototype,"baseURI",void 0),Sn=Rn([(0,ye.b)(),$n("design:paramtypes",[])],Sn);var In=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},jn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let kn=class{tokenRepository;constructor(){}async get(e){return this.tokenRepository.get(e)}};In([(0,ve.f)("TokenRepository"),jn("design:type",Object)],kn.prototype,"tokenRepository",void 0),kn=In([(0,ye.b)(),jn("design:paramtypes",[])],kn);var On=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Tn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Pn,xn=class{changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["tokenId"]}})}}];db;dbName="row-item-view-models";databaseService;constructor(){}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0,initialRecordsPath:"t/all.json",changesets:this.changesets})}async get(e){return this.db.get(e)}async put(e){await this.db.put(e)}async getByTokenIds(e){let t=await this.db.find({selector:{tokenId:{$in:e}}});return t.docs?.length>0?t.docs:[]}};async function Cn(e,t,a,n,o,p){if(Pn)return Pn;return Pn=e,globalThis.baseURI=t,globalThis.hostname=a,globalThis.channelId=p,Pn.bind("framework7").toConstantValue((i.ZP.registerComponent("nav-bar",U),i.ZP.registerComponent("token-toolbar",V),i.ZP.registerComponent("mint-list",E),i.ZP.registerComponent("attribute-filter",J),i.ZP.registerComponent("explore-total-info",Q),i.ZP.registerComponent("mint-info",X),i.ZP.registerComponent("largest-sales",ee),i.ZP.registerComponent("transaction-viewer",L),i.ZP.registerComponent("transaction-row",le),i.ZP.registerComponent("leaderboard-rows",pe),i.ZP.registerComponent("search-list",fe),i.ZP.registerComponent("infinite-scroll-content",ge),globalThis.app=new i.ZP({el:"#app",id:"large-reader",name:"Large Reader",theme:"auto",init:!1,view:{browserHistory:!0,browserHistorySeparator:"",browserHistoryOnLoad:!1,browserHistoryInitialMatch:!1},navbar:{hideOnPageScroll:!0},toolbar:{hideOnPageScroll:!0},routes:o}),globalThis.app)),Pn.bind("version").toConstantValue(n),Pn.bind("PouchDB").toConstantValue((async()=>d.Z)),Pn.bind("provider").toConstantValue((async()=>{if("undefined"!=typeof window&&window.ethereum)return window.web3Provider=window.ethereum,new c.Q(window.ethereum)})),Pn.bind("ethers").toConstantValue((async()=>l)),Pn.bind("contracts").toConstantValue((async()=>{let e,t,a=await r.Z.get(`${globalThis.hostname}${globalThis.baseURI}backup/contract/contract.json`,{responseType:"json"}),n=await r.Z.get(`${globalThis.hostname}${globalThis.baseURI}backup/contract/contract-abi.json`,{responseType:"json"});return 200===a.status&&(e=a.data),200===a.status&&(t=n.data),e.contractAddress?(t.Channel.address=e.contractAddress,t):[]})),Pn.bind("baseURI").toConstantValue((()=>globalThis.baseURI)),Pn.bind("hostname").toConstantValue((()=>globalThis.hostname)),Pn.bind("channelId").toConstantValue((()=>globalThis.channelId)),Pn.bind("WalletService").to(Se).inSingletonScope(),Pn.bind("ChannelRepository").to(Ce).inSingletonScope(),Pn.bind("ItemRepository").to(_e).inSingletonScope(),Pn.bind("AuthorRepository").to(We).inSingletonScope(),Pn.bind("MetadataRepository").to(He).inSingletonScope(),Pn.bind("ImageRepository").to(ze).inSingletonScope(),Pn.bind("AnimationRepository").to(Ye).inSingletonScope(),Pn.bind("StaticPageRepository").to(nt).inSingletonScope(),Pn.bind("ItemPageRepository").to(st).inSingletonScope(),Pn.bind("TokenOwnerPageRepository").to(rn).inSingletonScope(),Pn.bind("AttributeTotalRepository").to(pt).inSingletonScope(),Pn.bind("ReaderSettingsRepository").to(mt).inSingletonScope(),Pn.bind("ContractStateRepository").to({}).inSingletonScope(),Pn.bind("ComponentStateRepository").to(Ka).inSingletonScope(),Pn.bind("TokenOwnerRepository").to(Sn).inSingletonScope(),Pn.bind("TokenRepository").to($t).inSingletonScope(),Pn.bind("ProcessedTransactionRepository").to(gn).inSingletonScope(),Pn.bind("RowItemViewModelRepository").to(xn).inSingletonScope(),Pn.bind("ChannelWebService").to(qt).inSingletonScope(),Pn.bind("ItemWebService").to(ha).inSingletonScope(),Pn.bind("AuthorWebService").to(va).inSingletonScope(),Pn.bind("MintWebService").to(Ia).inSingletonScope(),Pn.bind("StaticPageService").to(Ft).inSingletonScope(),Pn.bind("ItemPageService").to(la).inSingletonScope(),Pn.bind("QueueService").to(Ta).inSingletonScope(),Pn.bind("TransactionWebService").to(un).inSingletonScope(),Pn.bind("PagingService").to(Ct).inSingletonScope(),Pn.bind("DatabaseService").to(Oe).inSingletonScope(),Pn.bind("AnimationService").to(zt).inSingletonScope(),Pn.bind("UiService").to(Da).inSingletonScope(),Pn.bind("ItemService").to(oa).inSingletonScope(),Pn.bind("ImageService").to(Wt).inSingletonScope(),Pn.bind("ChannelService").to(Tt).inSingletonScope(),Pn.bind("AuthorService").to(jt).inSingletonScope(),Pn.bind("TokenContractService").to(wa).inSingletonScope(),Pn.bind("SchemaService").to(Ut).inSingletonScope(),Pn.bind("QuillService").to(ea).inSingletonScope(),Pn.bind("AttributeTotalService").to(na).inSingletonScope(),Pn.bind("ComponentStateService").to(Ha).inSingletonScope(),Pn.bind("ReaderSettingsService").to(Na).inSingletonScope(),Pn.bind("ERCEventService").to(Za).inSingletonScope(),Pn.bind("GenerateService").to({}).inSingletonScope(),Pn.bind("TokenOwnerService").to(bn).inSingletonScope(),Pn.bind("TokenService").to(kn).inSingletonScope(),Pn.bind("TokenOwnerPageService").to(en).inSingletonScope(),Pn.bind("ProcessedTransactionService").to(cn).inSingletonScope(),globalThis.container=Pn,globalThis.he=s(),globalThis.dayjs=f(),globalThis.ComponentState=Ja,Pn}On([(0,ve.f)("DatabaseService"),Tn("design:type",Oe)],xn.prototype,"databaseService",void 0),xn=On([(0,ye.b)(),Tn("design:paramtypes",[])],xn),d.Z.plugin(p.Z),f().extend(g()),f().extend(v()),i.ZP.use([m.Z,b.Z,w.Z,R.Z,$.Z,k.Z,O.Z,T.Z,P.Z,S.Z,I.Z,x.Z,j.Z,C.Z,M.Z,D.Z]);var Mn=a(5131),Dn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},An=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Un=class{constructor(){}homeRepository;async get(){return this.homeRepository.get(0)}abbreviateDollars(e,t){if(!e)return"$0";var a=Math.log10(Math.abs(e))/3|0;if(0==a||1==a){return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(e)}var n=["","","M","G","T","P","E"][a],i=e/Math.pow(10,3*a);return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(i)+n}};Dn([(0,ve.f)("HomeRepository"),An("design:type",Object)],Un.prototype,"homeRepository",void 0),Un=Dn([(0,ye.b)(),An("design:paramtypes",[])],Un);var _n=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Vn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Nn=function(e,t){return function(a,n){t(a,n,e)}};let Ln=class{libraryURL;constructor(e){this.libraryURL=e}async get(e){return(await r.Z.get(`${this.libraryURL}/home.json`)).data}};Ln=_n([(0,ye.b)(),Nn(0,(0,ve.f)("libraryURL")),Vn("design:paramtypes",[Object])],Ln);class Wn{static resolveWithSpinner(e,t,a){globalThis.app&&(globalThis.app.preloader.show(),e({componentUrl:t,options:a}),globalThis.app.preloader.hide())}static getReaderRoutes(e){const t=[];return"/"!=e&&e.endsWith("/")&&t.push({path:`${e.substring(0,e.length-1)}`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,"index.html")}}),Wn.addSharedRoutes(t,e),t.push({path:"(.*)",async async({resolve:e,reject:t,to:a}){console.log(`404 error: ${a.path}`),await Wn.resolveWithSpinner(e,"404.html")}}),t}static getLibraryRoutes(e){const t=[{path:`${e}`,async async({resolve:t,reject:a}){await Wn.resolveWithSpinner(t,`${e}/index.html`)}},{path:`${e}/`,async async({resolve:t,reject:a}){await Wn.resolveWithSpinner(t,`${e}/index.html`)}},{path:`${e}/index.html`,async async({resolve:t,reject:a}){await Wn.resolveWithSpinner(t,`${e}/index.html`)}}];return Wn.addSharedRoutes(t,"/r/:reader_slug/"),t.push({path:"(.*)",async async({resolve:e,reject:t,to:a}){console.log(`404 error: ${a.path}`),await Wn.resolveWithSpinner(e,"l/404.html")}}),t}static addSharedRoutes(e,t){let a;a=t.indexOf(":reader_slug")>0?t.replace(":reader_slug","{{reader_slug}}"):t,e.push({path:`${t}`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}index.html`)}},{path:`${t}index.html`,async async({resolve:e,reject:t}){console.log(),await Wn.resolveWithSpinner(e,`${a}index.html`)}},{path:`${t}mint.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}mint.html`)}},{path:`${t}search.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}search.html`)}},{path:`${t}explore.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}explore.html`)}},{path:`${t}activity`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}activity/index.html`)}},{path:`${t}activity/index.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}activity/index.html`)}},{path:`${t}leaderboard`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}leaderboard/index.html`)}},{path:`${t}leaderboard/index.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}leaderboard/index.html`)}},{path:`${t}sales`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}sales/index.html`)}},{path:`${t}sales/index.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}sales/index.html`)}},{path:`${t}attributes`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}attributes/index.html`)}},{path:`${t}attributes/index.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}attributes/index.html`)}},{path:`${t}attribute`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}attribute/index.html`)}},{path:`${t}attribute/index.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}attribute/index.html`)}},{path:`${t}u`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}u/index.html`)}},{path:`${t}u/index.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}u/index.html`)}},{path:`${t}u/activity`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}u/activity/index.html`)}},{path:`${t}u/activity/index.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}u/activity/index.html`)}},{path:`${t}list-:page.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}list-{{page}}.html`)}},{path:`${t}t/:tokenId`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}t/{{tokenId}}/index.html`,{force:!0})}},{path:`${t}t/:tokenId/index.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}t/{{tokenId}}/index.html`,{force:!0})}},{path:`${t}s/:slug.html`,async async({resolve:e,reject:t}){await Wn.resolveWithSpinner(e,`${a}s/{{slug}}.html`)}})}}let En=async(e,t,a,i,r)=>{if(console.log("Initializing Library"),"serviceWorker"in navigator){const o=new Mn.ZW(`${a}/sw-library-${i}.js`,{scope:"/"});let s=new n.W;s.bind("libraryURL").toConstantValue(e),s.bind("HomeWebService").to(Un).inSingletonScope(),s.bind("HomeRepository").to(Ln).inSingletonScope();let c=Wn.getLibraryRoutes(e);s=await Cn(s,t,a,i,c,r),navigator.serviceWorker.controller?Zn(s,a):o.addEventListener("controlling",(e=>{Zn(s,a)})),o.register()}},Zn=async(e,t)=>{let a=e.get("framework7"),n=window.location.toString().replace(`${t}`,"");a.views.create(".view-main",{url:n}).on("init",(async e=>{console.log(`Navigating to ${n}`),e.router.navigate(n,{reloadCurrent:!0,animate:!1})})),a.init()}},5856:()=>{},5525:()=>{}},e=>{e.O(0,[216],(()=>{return t=5328,e(e.s=t);var t}));var t=e.O();library=t}]);
//# sourceMappingURL=main.library.js.map