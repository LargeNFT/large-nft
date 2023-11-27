var library;(self.webpackChunklibrary=self.webpackChunklibrary||[]).push([[179],{3392:(e,t,a)=>{"use strict";a.r(t),a.d(t,{initLibrary:()=>Wn});a(5666),a(8660);var n=a(5131),i=a(5717),r=a(7725),o=a(2861),s=a(6492),c=a.n(s),l=a(4581),d=a(9771),p=a(8614),u=a(7484),f=a.n(u),h=a(4110),g=a.n(h),y=a(6176),v=a.n(y),m=(a(4445),a(8468)),b=a(831),w=a(3210),R=a(6879),$=a(4346),S=a(4496),I=a(9746),j=a(860),k=a(9542),O=a(7140),T=a(9859),P=a(5751),x=a(1910),C=a(8235),M=a(5740);function D(e,{$on:t,$f7:a,$update:n}){let i,r=globalThis.container.get("WalletService"),o=(globalThis.container.get("UiService"),globalThis.container.get("baseURI")),s=globalThis.container.get("hostname"),c=(e.symbol,e.logo,e.title),l=e.active,d=e.library_url,p=e.large_url,u="true"==e.show_mint_page,f="true"==e.show_activity_page,h="true"==e.hide_menu,g=e.breadcrumbs,y=!0;const v=()=>p?.length>0?`${p}/index.html#!/admin/channel/fork-reader?path=${encodeURIComponent(`${s()}${o()}`)}`:`${o()}large/index.html#!/admin/channel/fork-reader?path=${encodeURIComponent(`${s()}${o()}`)}`,m=e=>r.truncateEthAddress(e),b=async e=>{i=void 0,r.provider||await r.initProvider(),i=await r.getAddress(),r.provider||(y=!1),i&&(r.address=i,r.wallet||await r.connect()),n()},w=async e=>{await r.initWallet(),await r.connect(),b()};b();return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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
                                          <a href="#">${m(i)}</a>
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

`}}D.id="7142f455a5";const A=D;function U(e,{$on:t,$:a,$f7:n,$update:i}){let r=globalThis.container.get("baseURI"),o=globalThis.container.get("ReaderSettingsService"),s=e.token_id,c=e.item_count,l=e.current_page;const d=e=>r()+e,p=async e=>{e.preventDefault();let t=a(e.currentTarget).val();n.preloader.show(),t>0?(await o.updateCurrentPage(parseInt(t)),n.views.main.router.navigate(d("t/"+t),{transition:"f7-flip"})):n.views.main.router.navigate(d("index.html")),n.preloader.hide()},u=e=>{e.preventDefault();const t=n.range.get(e.target);s=t.value,i()};return app.on("current-page-updated",(function(e){l=e,i()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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

`}}U.id="c59fc5fc87",U.style="\n.page-number {\n    width: 100%;\n    text-align: center;\n    font-size: 13px;\n    margin-bottom: 15px;\n}\n\n.range-slider {\n    width: 100%;\n    margin-left: 20px; \n    margin-right: 20px;\n    flex: 1;\n}\n\n.toolbar a.back-to-page {\n    height: 45px;\n    width: 70px;\n    margin-left: 10px;\n    flex: 0 0 70px;\n    font-size: 10px;\n    text-transform: none;\n    white-space: normal;\n    line-height: 13px;\n}\n";const _=U;function V(e,{$on:t,$f7:a,$update:n}){return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`




`}}V.id="811c652532",V.style="\n\n\n\n\n";const N=V;function L(e,{$:t,$on:a,$f7:n,$update:i}){let r,o,s=globalThis.container.get("MintWebService"),c=globalThis.container.get("WalletService"),l=globalThis.container.get("QueueService"),d=globalThis.container.get("baseURI")(),p=0,u=1,f=!1;e.baseurl;const h=async()=>{p=await s.updateTotal(o,u),await i()};a("stepper:change",(async e=>{u=parseInt(e.detail),await h(),g(u)}));const g=e=>{let a=0;t(".flex-card").each((n=>{t(n).removeClass("selected"),a<e&&(t(n).addClass("selected"),a++)}))},y=async e=>{let t;if(e.preventDefault(),await c.connect(),f){let e=parseInt(r.totalMinted+1);t=s.mintFromStartOrFail(u,e)}else t=s.mint(u);let a={title:"Minting token(s). Approve transaction and wait for it to be mined.",promise:t};await l.queuePromiseView(a)},v=async e=>{f=e.currentTarget.checked,await i()};n.preloader.show();const m=async()=>{await c.connect();try{r=await s.getMintingViewModel(),o=await s.parseUnits(r.mintPrice,"ether"),await h();let e=new CustomEvent("mint-view-model-loaded");e.mintingViewModel=r,document.dispatchEvent(e),n.preloader.hide()}catch(e){n.dialog.confirm("Problem connecting to contract on Ethereum Mainnet. Is your wallet connected to the right network?","Problem connecting to network",m,(()=>{n.views.main.router.navigate(d)})),n.preloader.hide()}};m();let b=async e=>{if(e.tokenId>r?.totalMinted){r=await s.getMintingViewModel(),await i();let e=new CustomEvent("mint-view-model-refreshed");e.mintingViewModel=r,e.quantity=u,document.dispatchEvent(e)}};return document.removeEventListener("mint-event",b),document.addEventListener("mint-event",b),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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



`}}L.id="b9c432977a",L.style="\n\n\n\n.mint-list-card .card-header {\n  font-size: 27px;\n  font-weight: bold;\n}\n\n.mint-list-card .block {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.mint-list-info li {\n  white-space: unset;\n  line-height: unset;\n  height: unset;\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\n";const W=L;let Z,E,F=null,B={},H=async e=>E(e);function q(e,{$:t,$on:a,$f7:n,$update:i}){F=[],B={},E=async e=>{Z=e.attributeOptions,e.attributeParams&&(B=e.attributeParams,t("#attribute-accordian-item").addClass("accordion-item-opened")),await i()},document.removeEventListener("attribute-options-loaded",H),document.addEventListener("attribute-options-loaded",H);const r=e=>{B[e.currentTarget.name]=e.currentTarget.value,e.currentTarget.value?B[e.currentTarget.name]=e.currentTarget.value:delete B[e.currentTarget.name];let t=new CustomEvent("explore-attribute-filter-changed");t.attributeParams=B,document.dispatchEvent(t)},o=async e=>{let a=t(e.currentTarget).data("id");delete B[a],await i();let n=new CustomEvent("explore-attribute-filter-changed");n.attributeParams=B,document.dispatchEvent(n)};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div>

    <div class="block block-strong row">
      
      <div class="col-50">

        ${Object.keys(B).map((e=>t`
          <div class="chip">
            <div class="chip-label">${e}: ${B[e]}</div>
            <a href="#" class="chip-delete" @click="${o}" data-id="${e}"></a>
          </div>
        `))}

      </div>
      <div class="col-50 filter-button">
        
        <a href="#" data-popup=".filter-popup" class="popup-open">Filters (${Object.keys(B).length})</a>

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
                                ${a.value==B[e.traitType]?t`
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






`}}q.id="d7d485031b",q.style="\n\n.item-content.attribute-select {\n  width: 175px;\n  display: inline-block;\n}\n\n\n";const G=q;function J(e,{$:t,$on:a,$f7:n,$update:i}){let r,o;return document.addEventListener("explore-total-info-changed",(async e=>{r=e.totalItems,o=e.totalMatches,await i()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="block-title block-title-small">

    ${o?t`

      ${o!=r?t`
        Showing ${o} results (${r} total)
      `:t`
        Showing 1 - ${r} results  
      `}

    `:t`<span/>`}

  </div>

`}}J.id="f36f095ced",J.style="\n\n\n";const z=J;function Q(e,{$:t,$on:a,$f7:n,$update:i}){let r,o=e.baseurl;return app.on("minting-view-model-updated",(function(e){r=e,i()})),function(e){e.$;var t,a=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return a`

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

`}}Q.id="66dd209e59",Q.style="\n";const K=Q;function X(e,{$:t,$on:a,$f7:n,$update:i}){globalThis.container.get("WalletService"),globalThis.container.get("MintWebService");let r=globalThis.container.get("TransactionWebService"),o=globalThis.container.get("baseURI")();const s=e=>o+e;let c=e.largest_sales;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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

  
`}}X.id="9b4a0c921a";const Y=X,ee=(e,{$h:t})=>{globalThis.container.get("WalletService");let a=globalThis.container.get("TransactionWebService");const n=e=>`${o+e}`;let i=e.transaction,r=e.event,o=e.base_uri,s=e.row_item_view_models,c=e.index;return()=>t`
    
        <tr ${c%2==0?'class="alt-row"':""}>

          <td class="image">
            <a href="${o}t/${r.tokenId}">
              <img src="${(e=>{if(e)return n(e?.coverImageGenerated?"backup/export/images/"+e.coverImageId+".svg":"backup/generated/images/50x50/"+e.coverImageId+".webp")})(s[r.tokenId])}" class="latest-img" alt="${s[r.tokenId]?.title}" height="50" width="50" alt="Item cover image"/> 
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
                  ${ne(r.fromAddress)}
            </a> <span class="f7-icons">arrow_right</span>

            <a href="${o}u/?address=${r.toAddress}" class="${r.toAddress==i.from?"is-from":""}">
              ${ne(r.toAddress)}
            </a>

          </td>
        </tr>
    `},te=(e,{$h:t})=>{globalThis.container.get("WalletService"),globalThis.container.get("TransactionWebService");const a=e=>`${r+e}`;let n=e.transaction,i=e.event,r=e.base_uri,o=e.row_item_view_models,s=e.index,c=(i?.namedArgs?.owner,i?.namedArgs?.approved);n?.from;return()=>{return t`
      <tr class="${s%2==0?"alt-row":""}">

          <td class="image">
            <a href="${r}t/${i.tokenId}">
              <img src="${e=o[i.tokenId],e.coverImageGenerated?a("backup/export/images/"+e.coverImageId+".svg"):a("backup/generated/images/50x50/"+e.coverImageId+".webp")}" class="latest-img" alt="${o[i.tokenId].title}" height="40" width="40" alt="Item cover image" /> 
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
    `;var e}},ae=(e,{$h:t})=>{globalThis.container.get("WalletService"),globalThis.container.get("TransactionWebService");let a=e.transaction,n=e.event,i=e.base_uri,r=e.index;return()=>t`
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
            <a href="${i}u/?address=${n.namedArgs.owner}" class="${n.namedArgs.owner==a.from?"is-from":""}">${ne(n.namedArgs.owner)}</a> 
            <span class="f7-icons">arrow_right</span>
            <a href="${i}u/?address=${n.namedArgs.operator}" class="${n.namedArgs?.operator==a.from?"is-from":""}">${ne(n.namedArgs.operator)}</a>
          </td>

        </tr>
    `},ne=e=>{let t=globalThis.container.get("WalletService");return ie?.ens&&ie.ens[e]?ie.ens[e]:t.truncateEthAddress(e)};let ie,re,oe=async e=>re(e);function se(e,{$:t,$on:a,$f7:n,$update:i}){globalThis.container.get("WalletService");let r=globalThis.container.get("baseURI")();ie=e.transactions;let o=e.items,s=e.token;return re=async e=>{ie=e.transactionsViewModel,await i()},document.removeEventListener("transactions-updated",oe),document.addEventListener("transactions-updated",oe),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`
  
  <div class="card data-table">

    <slot></slot>

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
          ${ie?.transactions.map(((e,a)=>t`
  
            ${e.events?.map((n=>t`
  
              ${"Approval"!=n.event||s&&n?.tokenId!=s?t` `:t`
                <${te} transaction=${e.transaction} event=${n} base_uri=${r} row_item_view_models=${o} index="${a}" />
              `}
          
              ${"Transfer"!=n.event||s&&n?.tokenId!=s?t` `:t`
                <${ee} transaction=${e.transaction} event=${n} base_uri=${r} row_item_view_models=${o} index="${a}"/>
              `}
          
              ${"ApprovalForAll"!=n.event||s&&n?.tokenId!=s?t` `:t`
                <${ae} transaction=${e.transaction} event=${n} base_uri=${r} index="${a}"/>
              `}
          
            `))}
  
  
          `))}
        </tbody>
      </table>
    </div>

  </div>

`}}se.id="e869340059",se.style="\n\n";const ce=se;function le(e,{$:t,$on:a,$f7:n,$update:i}){let r=globalThis.container.get("TransactionWebService"),o=globalThis.container.get("WalletService"),s=globalThis.container.get("baseURI")(),c=e.token_owners;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`
  
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

`}}le.id="e767ae333b";const de=le;function pe(e,{$:t,$on:a,$f7:n,$update:i}){let r=globalThis.container.get("ItemWebService"),o=globalThis.container.get("baseURI")();const s=e=>o+e;let c,l=!1;const d=async e=>{e.preventDefault(),t(".searchbar input").blur(),n.preloader.showIn(".cards-list"),l=!0,i(),c=await r.query(t(".searchbar input").val()),l=!1,i(),n.preloader.hideIn(".cards-list")};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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
                            <img src="backup/export/images/${e.coverImage._id}.${e.coverImage.generated?"svg":"jpg"}" alt="Item cover image" />
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

`}}pe.id="c1a1287315",pe.style="\n\n.block-search {\n  background: #f1f1f1;\n  font-size: 14px;\n}\n\n";const ue=pe;function fe(e,{$:t,$on:a,$f7:n,$update:i}){let r=e.baseurl,o=e.items;const s=e=>`${r+e}`;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

    <div class="row" id="item-list">
                            
        ${o?.length>0?t`
                                    
            ${o.map((e=>t`
                <div class="card col-100 large-25">
                    <div class="card-content">
                        <div class="card-content card-content-padding">
                            <div class="square">
                                <a href="${s(`token-${e.item.tokenId}.html`)}">
                                    <img src="${s(`backup/export/images/${e.coverImage._id}`)}.${e.coverImage.generated?"svg":"jpg"}" alt="Item cover image" />
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
  
`}}fe.id="ebc4b0ed6e",fe.style="\n";const he=fe;var ge=a(5466),ye=a(1906),ve=a(5556),me=a(7955),be=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},we=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Re=function(e,t){return function(a,n){t(a,n,e)}};let $e=class{contracts;getProvider;$f7;wallet;address;ethersContracts={};provider;constructor(e,t,a){this.contracts=e,this.getProvider=t,this.$f7=a}async initProvider(){this.provider=await this.getProvider(),globalThis.ethereum?.on("accountsChanged",(async e=>{delete this.address,e?.length>0&&await this.initWallet(),this.$f7.views.main.router.refreshPage()})),globalThis.ethereum?.on("networkChanged",(async e=>{this.ethersContracts={},this.provider=await this.getProvider(),await this.initWallet()}))}async initWallet(){console.log("Init wallet"),delete this.address,this.provider||await this.initProvider();let e=await this.provider.send("eth_accounts",[]);if(e?.length>0)return this.connect();console.log("Init wallet complete")}async connect(){console.log("Connect wallet"),await this.provider.send("eth_requestAccounts",[]),this.wallet=await this.provider.getSigner(),this.address=await this.getAddress(),console.log(`Wallet ${this.address} connected`)}async getAddress(){if(!this.provider)return;let e=await this.provider.send("eth_accounts",[]);return e?.length>0?(0,ve.K)(e[0]):void 0}async getWallet(){return this.provider.getSigner()}async getContract(e){let t=(await this.contracts())[e];return this.ethersContracts[e]=new me.CH(t.address,t.abi,this.wallet?this.wallet:this.provider),this.ethersContracts[e]}truncateEthAddress(e){if(!e)return;const t=e.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);return t?`${t[1]}…${t[2]}`:e}};$e=be([(0,ge.b)(),Re(0,(0,ye.f)("contracts")),Re(1,(0,ye.f)("provider")),Re(2,(0,ye.f)("framework7")),we("design:paramtypes",[Function,Function,Object])],$e);var Se=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ie=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},je=function(e,t){return function(a,n){t(a,n,e)}};let ke=class{baseURI;hostname;PouchDB;channelId;dbCache={};constructor(e,t,a,n){this.baseURI=e,this.hostname=t,this.PouchDB=a,this.channelId=n}async getDatabase(e){let t=await this.PouchDB();const a=`./pouch/${this.channelId()}/${e.name}`;if(this.dbCache[a])return this.dbCache[a];this.dbCache[a]=new t(a);const n=await this.dbCache[a].info();if(0==n.doc_count&&0==n.update_seq){if(e.changesets){console.log(`Creating indexes for ${a}`);let t={_id:"_local/changesets",ids:[]};for(let n of e.changesets)await n.changeset(this.dbCache[a]),t.ids.push(n.id),console.log(`New changeset detected...${n.id}`);await this.dbCache[a].put(t)}e.initialRecords&&await this.loadInitialRecords(e,a)}else if(e.changesets){let t;try{t=await this.dbCache[a].get("_local/changesets")}catch(e){}t||(t={_id:"_local/changesets",ids:[]});let n=!1;for(let i of e.changesets)if(!t.ids.includes(i.id)){try{await i.changeset(this.dbCache[a])}catch(e){}t.ids.push(i.id),n=!0,console.log(`New changeset detected...${i.id}`)}n&&(console.log("Saving changeset log...",t),await this.dbCache[a].put(t))}return this.dbCache[a]}async loadInitialRecords(e,t){let a;a=e.initialRecordsPath?await fetch(`${this.hostname()}${this.baseURI()}${e.initialRecordsPath}`):await fetch(`${this.hostname()}${this.baseURI()}backup/export/backup/${e.name}.json`);let n=await a.json();n?.length>0&&(console.log(`Loading ${n?.length} initial records for ${t}`),await this.dbCache[t].bulkDocs(n))}};ke=Se([(0,ge.b)(),je(0,(0,ye.f)("baseURI")),je(1,(0,ye.f)("hostname")),je(2,(0,ye.f)("PouchDB")),je(3,(0,ye.f)("channelId")),Ie("design:paramtypes",[Function,Function,Object,Function])],ke);var Oe=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Te=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Pe=function(e,t){return function(a,n){t(a,n,e)}};let xe=class{baseURI;hostname;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}}),await e.createIndex({index:{fields:["lastUpdated"]}})}}];db;dbName="channels";databaseService;constructor(e,t){this.baseURI=e,this.hostname=t}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(){let e,t=await this.db.allDocs({include_docs:!0});for(let a of t.rows)a.doc.dateCreated&&(e=a.doc);const a=await o.Z.get(`${this.hostname()}${this.baseURI()}backup/contract/contract.json`);return a?.data&&(e.contractAddress=a.data.contractAddress),e}};Oe([(0,ye.f)("DatabaseService"),Te("design:type",ke)],xe.prototype,"databaseService",void 0),xe=Oe([(0,ge.b)(),Pe(0,(0,ye.f)("baseURI")),Pe(1,(0,ye.f)("hostname")),Te("design:paramtypes",[Function,Function])],xe);class Ce{_id;_rev;channelId;tokenId;title;link;description;content;contentHTML;excerpt;authorId;category;attributeSelections;coverImageId;coverImageAsAnimation;originalJSONMetadataId;animationId;datePublished;dateCreated;lastUpdated}var Me=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},De=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Ae=function(e,t){return function(a,n){t(a,n,e)}};let Ue=class{baseURI;hostname;static CHUNK_SIZE=10;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["tokenId"]}})}}];db;dbName="items";databaseService;constructor(e,t){this.baseURI=e,this.hostname=t}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(e){return Object.assign(new Ce,await this.db.get(e))}async put(e){await this.db.put(e)}async list(e,t=10){return(await this.db.find({selector:{tokenId:{$exists:!0}},sort:[{tokenId:"asc"}],limit:t,skip:e})).docs}async getByTokenId(e){let t=await this.db.find({selector:{tokenId:{$eq:e}},limit:1});if(t.docs?.length>0)return t.docs[0]}async getByTokenIds(e){let t=await this.db.find({selector:{tokenId:{$in:e}}});return t.docs?.length>0?t.docs:[]}async getRowItemViewModelsByAttribute(e,t,a){const n=e=>e.replace(/[^a-z0-9]/gi,"_").toLowerCase();let i;return i=(await o.Z.get(`${this.hostname()}${this.baseURI()}attributes/items/${n(e)}/${n(t)}/${a}.json`)).data,i}async getRowItemViewModelsByOwner(e,t){let a;return a=(await o.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/${e}/tokens/${t}.json`)).data,a}async getRowItemViewModelsByTokenIds(e){let t=[];for(let a of e){const e=await o.Z.get(`${this.hostname()}${this.baseURI()}t/${a}/rowItemViewModel.json`);t.push(e.data)}return t}async getRowItemViewModelsByTokenId(e){return(await o.Z.get(`${this.hostname()}${this.baseURI()}t/${e}/rowItemViewModel.json`)).data}async listByTokenId(e,t){return(await this.db.find({selector:{tokenId:{$eq:e}},sort:[{tokenId:"desc"}],limit:t})).docs}async query(e){return(await this.db.search({query:e,fields:["contentHTML","title","tokenId"],include_docs:!0,highlighting:!0,limit:10})).rows.map((e=>(e.highlighting.contentHTML&&(e.doc.contentHTML=e.highlighting.contentHTML),e.doc.contentHTML=e.doc.contentHTML.replace(/<img .*?>/g,""),e.doc)))}async all(){return(await this.db.find({selector:{tokenId:{$exists:!0}},sort:[{tokenId:"asc"}],limit:1e5,skip:0})).docs}};Me([(0,ye.f)("DatabaseService"),De("design:type",ke)],Ue.prototype,"databaseService",void 0),Ue=Me([(0,ge.b)(),Ae(0,(0,ye.f)("baseURI")),Ae(1,(0,ye.f)("hostname")),De("design:paramtypes",[Function,Function])],Ue);class _e{_id;_rev;walletAddress;name;description;url;coverPhotoId;dateCreated;lastUpdated}var Ve=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ne=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Le=class{db;dbName="authors";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(e){return Object.assign(new _e,await this.db.get(e))}};Ve([(0,ye.f)("DatabaseService"),Ne("design:type",ke)],Le.prototype,"databaseService",void 0),Le=Ve([(0,ge.b)(),Ne("design:paramtypes",[])],Le);class We{tokenId;name;description;image;image_data;external_url;attributes;background_color;animation_url}var Ze=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ee=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Fe=function(e,t){return function(a,n){t(a,n,e)}};let Be=class{baseURI;hostname;static CHUNK_SIZE=10;constructor(e,t){this.baseURI=e,this.hostname=t}async get(e){const t=await o.Z.get(`${this.hostname()}${this.baseURI()}backup/metadata/${e}.json`);return Object.assign(new We,t.data)}};Be=Ze([(0,ge.b)(),Fe(0,(0,ye.f)("baseURI")),Fe(1,(0,ye.f)("hostname")),Ee("design:paramtypes",[Function,Function])],Be);class He{_id;data;cid;buffer;svg;generated}var qe=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ge=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Je=class{db;dbName="images";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(e){return Object.assign(new He,await this.db.get(e))}async list(){}};qe([(0,ye.f)("DatabaseService"),Ge("design:type",ke)],Je.prototype,"databaseService",void 0),Je=qe([(0,ge.b)(),Ge("design:paramtypes",[])],Je);class ze{_id;_rev;content;cid;dateCreated}var Qe=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ke=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Xe=class{db;dbName="animations";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(e){return Object.assign(new ze,await this.db.get(e))}};Qe([(0,ye.f)("DatabaseService"),Ke("design:type",ke)],Xe.prototype,"databaseService",void 0),Xe=Qe([(0,ge.b)(),Ke("design:paramtypes",[])],Xe);class Ye{_id;_rev;channelId;name;slug;content;contentHTML;contentMarkdown;locations;dateCreated;lastUpdated}var et=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},tt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let at=class{changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["channelId"]}}),await e.createIndex({index:{fields:["dateCreated"]}})}}];db;dbName="static-pages";databaseService;constructor(){}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(e){return Object.assign(new Ye,await this.db.get(e))}async listByLocation(e,t){return(await this.db.find({selector:{locations:{$all:[e]},dateCreated:{$exists:!0}},sort:[{dateCreated:"asc"}],skip:t})).docs}};et([(0,ye.f)("DatabaseService"),tt("design:type",ke)],at.prototype,"databaseService",void 0),at=et([(0,ge.b)(),tt("design:paramtypes",[])],at);var nt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},it=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},rt=function(e,t){return function(a,n){t(a,n,e)}};let ot=class{baseURI;hostname;constructor(e,t){this.baseURI=e,this.hostname=t}async get(e){return(await o.Z.get(`${this.hostname()}${this.baseURI()}itemPages/${e}.json`)).data}};ot=nt([(0,ge.b)(),rt(0,(0,ye.f)("baseURI")),rt(1,(0,ye.f)("hostname")),it("design:paramtypes",[Function,Function])],ot);class st{_id;traitType;value;count;categoryPercent;tokenIds}var ct=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},lt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let dt=class{db;dbName="attribute-totals";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0,initialRecordsPath:"attributeTotals.json"})}constructor(){}async get(e){return Object.assign(new st,await this.db.get(e))}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}async put(e){await this.db.put(e)}async list(e,t){return(await this.db.find({selector:{count:{$exists:!0}},limit:e,skip:t})).docs}};ct([(0,ye.f)("DatabaseService"),lt("design:type",ke)],dt.prototype,"databaseService",void 0),dt=ct([(0,ge.b)(),lt("design:paramtypes",[])],dt);var pt=a(5494),ut=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ft=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class ht{_id;_rev;currentPage;lastPageJump;dateCreated;lastUpdated}ut([(0,pt.a)(),ft("design:type",String)],ht.prototype,"_id",void 0),ut([(0,pt.a)(),ft("design:type",String)],ht.prototype,"_rev",void 0),ut([(0,pt.a)(),ft("design:type",Number)],ht.prototype,"currentPage",void 0),ut([(0,pt.a)(),ft("design:type",Number)],ht.prototype,"lastPageJump",void 0),ut([(0,pt.a)(),ft("design:type",String)],ht.prototype,"dateCreated",void 0),ut([(0,pt.a)(),ft("design:type",String)],ht.prototype,"lastUpdated",void 0);var gt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},yt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let vt=class{db;dbName="reader-settings";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1})}constructor(){}async put(e){e._id="reader-settings",await this.db.put(e)}async get(){let e;try{e=await this.db.get("reader-settings")}catch(e){}return e||(e=new ht,e._id="reader-settings"),Object.assign(new ht,e)}};gt([(0,ye.f)("DatabaseService"),yt("design:type",ke)],vt.prototype,"databaseService",void 0),vt=gt([(0,ge.b)(),yt("design:paramtypes",[])],vt);class mt{}var bt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},wt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Rt=class{baseURI;constructor(){}async get(e){try{let t=await o.Z.get(`${this.baseURI()}sync/tokens/${e}/token.json`);return Object.assign(new mt,t.data)}catch(e){}}};bt([(0,ye.f)("baseURI"),wt("design:type",Function)],Rt.prototype,"baseURI",void 0),Rt=bt([(0,ge.b)(),wt("design:paramtypes",[])],Rt);var $t=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},St=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let It=class{authorRepository;walletService;constructor(){}async get(e){return this.authorRepository.get(e)}getDisplayName(e){if(e)return e.name?e.name:this.walletService.truncateEthAddress(e._id)}};$t([(0,ye.f)("AuthorRepository"),St("design:type",Object)],It.prototype,"authorRepository",void 0),$t([(0,ye.f)("WalletService"),St("design:type",Object)],It.prototype,"walletService",void 0),It=$t([(0,ge.b)(),St("design:paramtypes",[])],It);var jt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},kt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ot=class{channelRepository;constructor(){}async get(){return this.channelRepository.get()}};jt([(0,ye.f)("ChannelRepository"),kt("design:type",Object)],Ot.prototype,"channelRepository",void 0),Ot=jt([(0,ge.b)(),kt("design:paramtypes",[])],Ot);var Tt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Pt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let xt=class{constructor(){}buildPagingViewModel(e,t,a,n){let i=new Ct;return i.offset=e||0,i.limit=t,i.count=a,i.start=i.offset+1,i.end=Math.min(i.offset+t,a),i.previousOffset=Math.max(i.offset-t,0),i.offset+t<a&&(i.nextOffset=i.offset+t),i.page=i.offset/i.limit+1,i.page>i.endPage&&(i.page=i.endPage),i.endPage=Math.ceil(i.count/i.limit),i.lastOffset=i.endPage*i.limit-i.limit,i.showNext=i.endPage>i.page,i.showPrevious=0!=i.offset,i.showFirst=i.page>2,i.showLast=i.page<i.endPage-1,i}calculateEndIndex(e,t,a){let n=t+e-1;return Math.min(a-1,n)}calculateDescendingEndIndex(e,t){let a=t-(e-1);return Math.max(0,a)}calculateDescendingOffset(e,t){let a=t-1-e;return Math.max(0,a)}};xt=Tt([(0,ge.b)(),Pt("design:paramtypes",[])],xt);class Ct{page;pageNumbers;endPage;offset;limit;count;start;end;previousOffset;nextOffset;lastOffset;showPrevious;showNext;showFirst;showLast}var Mt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Dt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let At=class{itemRepository;channelRepository;authorRepository;imageRepository;animationRepository;staticPageRepository;readerSettingsRepository;rowItemViewModelRepository;attributeTotalRepository;componentStateRepository;constructor(){}async load(e){const t=this.getRepositories();for(let a of e){let e=t.filter((e=>e.dbName==a))[0];await(e?.load())}}async reloadAll(){const e=this.getRepositories();for(let t of e)await t.load()}getRepositories(){const e=[];return e.push(this.itemRepository),e.push(this.channelRepository),e.push(this.authorRepository),e.push(this.imageRepository),e.push(this.animationRepository),e.push(this.staticPageRepository),e.push(this.readerSettingsRepository),e.push(this.staticPageRepository),e.push(this.readerSettingsRepository),e.push(this.attributeTotalRepository),e.push(this.componentStateRepository),e.push(this.rowItemViewModelRepository),e}async loadWallet(e){console.log(`Loading wallet: ${e}`)}};Mt([(0,ye.f)("ItemRepository"),Dt("design:type",Object)],At.prototype,"itemRepository",void 0),Mt([(0,ye.f)("ChannelRepository"),Dt("design:type",Object)],At.prototype,"channelRepository",void 0),Mt([(0,ye.f)("AuthorRepository"),Dt("design:type",Object)],At.prototype,"authorRepository",void 0),Mt([(0,ye.f)("ImageRepository"),Dt("design:type",Object)],At.prototype,"imageRepository",void 0),Mt([(0,ye.f)("AnimationRepository"),Dt("design:type",Object)],At.prototype,"animationRepository",void 0),Mt([(0,ye.f)("StaticPageRepository"),Dt("design:type",Object)],At.prototype,"staticPageRepository",void 0),Mt([(0,ye.f)("ReaderSettingsRepository"),Dt("design:type",Object)],At.prototype,"readerSettingsRepository",void 0),Mt([(0,ye.f)("RowItemViewModelRepository"),Dt("design:type",Object)],At.prototype,"rowItemViewModelRepository",void 0),Mt([(0,ye.f)("AttributeTotalRepository"),Dt("design:type",Object)],At.prototype,"attributeTotalRepository",void 0),Mt([(0,ye.f)("ComponentStateRepository"),Dt("design:type",Object)],At.prototype,"componentStateRepository",void 0),At=Mt([(0,ge.b)(),Dt("design:paramtypes",[])],At);var Ut=a(2555),_t=a.n(Ut),Vt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Nt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Lt=class{imageRepository;constructor(){}async get(e){return this.imageRepository.get(e)}async list(){return this.imageRepository.list()}async getUrl(e){return e.buffer||e.svg?e.buffer?this.bufferToDataURL("image/jpg",e.buffer):e.svg?this.getSVGURL(e):void 0:""}async getSVGURL(e){return e.svg?this.svgToDataURL(e.svg):""}svgToDataURL(e){return _t()(e)}bufferToDataURL(e,t){return`data:${e};base64,${t.toString("base64")}`}};Vt([(0,ye.f)("ImageRepository"),Nt("design:type",Object)],Lt.prototype,"imageRepository",void 0),Lt=Vt([(0,ge.b)(),Nt("design:paramtypes",[])],Lt);var Wt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Zt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Et=class{staticPageRepository;constructor(){}async get(e){return this.staticPageRepository.get(e)}async listByLocation(e,t){return this.staticPageRepository.listByLocation(e,t)}async listRoutablePages(){let e=[];if(e=e.concat(await this.staticPageRepository.listByLocation("navbar",0)),e=e.concat(await this.staticPageRepository.listByLocation("links",0)),e=JSON.parse(JSON.stringify(e)),e?.length>0)for(let t of e)delete t?.content,delete t?.contentHTML,delete t?.contentMarkdown;return e}};Wt([(0,ye.f)("StaticPageRepository"),Zt("design:type",Object)],Et.prototype,"staticPageRepository",void 0),Et=Wt([(0,ge.b)(),Zt("design:paramtypes",[])],Et);var Ft=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Bt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ht=class{channelService;authorService;imageService;pagingService;schemaService;walletService;staticPageService;loadedChannelData;constructor(){}async get(e){return this.getViewModel(await this.channelService.get(),e)}async getViewModel(e,t){let a,n;e.authorId&&(a=await this.authorService.get(e.authorId));let i=e.itemCount,r=this.pagingService.buildPagingViewModel(t,10,i,5),o=["navbar","links","index","none"],s={};for(let e of o)s[e]=await this.staticPageService.listByLocation(e,0);return e.coverImageId&&(n=await this.imageService.get(e.coverImageId)),{channelContractAbbrev:e.contractAddress?this.walletService.truncateEthAddress(e.contractAddress):void 0,channel:e,staticPagesViewModel:s,author:a,authorDisplayName:this.authorService.getDisplayName(a),itemCount:i,pagingViewModel:r,coverImage:n}}async loadChannel(e,t,a){globalThis.channelId=e,globalThis.baseURI=t,globalThis.hostname=a}async loadChannelData(e){e&&this.loadedChannelData!=e&&(await this.schemaService.reloadAll(),await this.schemaService.load(["component-state"])),this.loadedChannelData=e}};Ft([(0,ye.f)("ChannelService"),Bt("design:type",Ot)],Ht.prototype,"channelService",void 0),Ft([(0,ye.f)("AuthorService"),Bt("design:type",It)],Ht.prototype,"authorService",void 0),Ft([(0,ye.f)("ImageService"),Bt("design:type",Lt)],Ht.prototype,"imageService",void 0),Ft([(0,ye.f)("PagingService"),Bt("design:type",xt)],Ht.prototype,"pagingService",void 0),Ft([(0,ye.f)("SchemaService"),Bt("design:type",At)],Ht.prototype,"schemaService",void 0),Ft([(0,ye.f)("WalletService"),Bt("design:type",Object)],Ht.prototype,"walletService",void 0),Ft([(0,ye.f)("StaticPageService"),Bt("design:type",Et)],Ht.prototype,"staticPageService",void 0),Ht=Ft([(0,ge.b)(),Bt("design:paramtypes",[])],Ht);var qt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Gt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Jt=class{animationRepository;constructor(){}async get(e){return this.animationRepository.get(e)}};qt([(0,ye.f)("AnimationRepository"),Gt("design:type",Object)],Jt.prototype,"animationRepository",void 0),Jt=qt([(0,ge.b)(),Gt("design:paramtypes",[])],Jt);var zt=a(8554),Qt=a(9810),Kt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Xt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Yt=class{constructor(){}async translateContent(e){if(!e?.ops)return"";const t=new zt.bc(e.ops,{});return t.renderCustomWith((function(e,t){if("divider"===e.insert.type)return"<hr />";if("ipfsimage"===e.insert.type){let t=`<img src="${e.insert.value.src}" `;return e.insert.value.width&&(t+=`width="${e.insert.value.width}" `),e.insert.value.height&&(t+=`height="${e.insert.value.height}" `),e.insert.value.style&&(t+=`style="${e.insert.value.style}"`),t+="/>",t}})),t.convert()}async generateMarkdown(e){return(0,Qt.deltaToMarkdown)(e)}};Yt=Kt([(0,ge.b)(),Xt("design:paramtypes",[])],Yt);var ea=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ta=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let aa=class{attributeTotalRepository;constructor(){}async get(e){return this.attributeTotalRepository.get(e)}async put(e){return this.attributeTotalRepository.put(e)}async getByIds(e){return this.attributeTotalRepository.getByIds(e)}async list(){return this.attributeTotalRepository.list()}async buildAttributeTotals(e,t){let a=[],n=new Set(t.map((e=>e.attributeSelections.map((e=>`${e.traitType}:::${e.value}`)))).flat());for(let e of n){let t={_id:e,traitType:e.substring(0,e.indexOf(":::")),value:e.substring(e.indexOf(":::")+3,e.length),count:0,tokenIds:[]};a.push(t)}for(let e of t)for(let t of e.attributeSelections){let n=a.filter((e=>e.traitType==t.traitType&&e.value==t.value))[0];n.tokenIds.push(e.tokenId),n.count++}for(let t of a)t.categoryPercent=new Intl.NumberFormat("default",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(t.count/e.itemCount);return a.sort(((e,t)=>t.count-e.count)),a}};ea([(0,ye.f)("AttributeTotalRepository"),ta("design:type",Object)],aa.prototype,"attributeTotalRepository",void 0),aa=ea([(0,ge.b)(),ta("design:paramtypes",[])],aa);var na=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ia=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ra=class{itemRepository;rowItemViewModelRepository;attributeTotalService;constructor(){}async get(e){return this.itemRepository.get(e)}async list(e,t){return this.itemRepository.list(e,t)}async query(e){return this.itemRepository.query(e)}async all(){return this.itemRepository.all()}async getByTokenId(e){return this.itemRepository.getByTokenId(e)}async getByTokenIds(e){return this.itemRepository.getByTokenIds(e)}async getRowItemViewModelsByAttribute(e,t,a){return this.itemRepository.getRowItemViewModelsByAttribute(e,t,a)}async getRowItemViewModelsByOwner(e,t){return this.itemRepository.getRowItemViewModelsByOwner(e,t)}async getRowItemViewModelsByTokenIds(e){return this.itemRepository.getRowItemViewModelsByTokenIds(e)}async getRowItemViewModelsByTokenId(e){return this.itemRepository.getRowItemViewModelsByTokenId(e)}async listByTokenId(e,t=10){return this.itemRepository.listByTokenId(e,t)}async buildAttributeTotals(e){let t=await this.all();return this.attributeTotalService.buildAttributeTotals(e,t)}async searchTokenIds(e){return this.rowItemViewModelRepository.getByTokenIds(e)}};na([(0,ye.f)("ItemRepository"),ia("design:type",Object)],ra.prototype,"itemRepository",void 0),na([(0,ye.f)("RowItemViewModelRepository"),ia("design:type",Object)],ra.prototype,"rowItemViewModelRepository",void 0),na([(0,ye.f)("AttributeTotalService"),ia("design:type",aa)],ra.prototype,"attributeTotalService",void 0),ra=na([(0,ge.b)(),ia("design:paramtypes",[])],ra);var oa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},sa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ca=class{itemPageRepository;constructor(){}async get(e){return this.itemPageRepository.get(e)}};oa([(0,ye.f)("ItemPageRepository"),sa("design:type",Object)],ca.prototype,"itemPageRepository",void 0),ca=oa([(0,ge.b)(),sa("design:paramtypes",[])],ca);var la=a(3969),da=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},pa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const ua=new la.DOMParser;let fa=class{itemService;channelService;authorService;imageService;schemaService;quillService;animationService;itemPageService;attributeTotalService;allTokensCache;constructor(){}async get(e){let t=await this.itemService.get(e);const a=await this.channelService.get(),n=await this.attributeTotalService.list();return this.getViewModel(t,a,n)}async getByTokenId(e){return this.itemService.getByTokenId(e)}async getViewModel(e,t,a){let n,i,r,o,s=[];if(t.authorId&&(n=await this.authorService.get(t.authorId)),t.attributeOptions.length>0)for(let n of t.attributeOptions){let t=e?.attributeSelections?.filter((e=>n?.traitType==e?.traitType)),i=t?.length>0?t[0].value:void 0,r=a.filter((e=>e.traitType==n.traitType)),o=r?.filter((e=>e.value==i));s.push({id:n.id,traitType:n.traitType,values:n.values,value:i,attributeTotal:o?.length>0?o[0]:void 0})}if(e.coverImageId&&(i=await this.imageService.get(e.coverImageId)),e.animationId&&!e.coverImageAsAnimation){r=await this.animationService.get(e.animationId);let t=ua.parseFromString(r.content,"text/html").getElementsByTagName("body")[0];o=c().unescape((new la.B).serializeToString(t)),o="<div"+o.slice(5),o=o.substring(0,o.length-7)+"</div>"}if(e.content?.ops?.length>0){let t=[];for(let a of e.content.ops){if(a.insert&&a.insert.ipfsimage){let e=await this.imageService.get(a.insert.ipfsimage.cid);a.insert.ipfsimage.src=await this.imageService.getUrl(e)}t.push(a)}e.content.ops=t}return{item:e,animation:r,animationContentHTML:o,contentHTML:await this.quillService.translateContent(e.content),channel:t,author:n,authorDisplayName:this.authorService.getDisplayName(n),attributeSelections:s,coverImage:i}}async getMintViewModel(e,t){let a;return e.coverImageId&&(a=await this.imageService.get(e.coverImageId)),{item:e,animation:undefined,channel:t,author:undefined,attributeSelections:[],coverImage:a}}async getSearchViewModel(e,t){return{item:e,animation:undefined,channel:t,author:undefined,attributeSelections:[]}}async getExploreAttributeOptions(e){await this.schemaService.load(["channels","authors","attribute-totals"]);const t=await this.channelService.get();let a=await this.attributeTotalService.list(),n=t.attributeOptions,i=[];for(let t of n){let n=[];for(let i of t.values.sort()){let r=JSON.parse(JSON.stringify(e));delete r[t.traitType];let o=await this._paramsToFilteredIds(r,a),s=a.filter((e=>e.traitType==t.traitType&&e.value==i))[0];s&&n.push({value:i,count:s.tokenIds.filter((e=>o.includes(e))).length})}n.sort(((e,t)=>t.count-e.count));let r={id:t.id,traitType:t.traitType,values:n};i.push(r)}return i}async exploreList(e,t,a){if(await this.schemaService.load(["channels","authors","attribute-totals","row-item-view-models"]),e&&Object.keys(e)?.length>0)return this.exploreQuery(e,t,a);{let e=t/a,n=await this.itemPageService.get(e),i=await this.channelService.get();return{items:n.items,totalMatches:i.itemCount,limit:a,skip:t}}}async exploreQuery(e,t,a){await this.schemaService.load(["channels","authors","attribute-totals","row-item-view-models"]);let n=await this.attributeTotalService.list(),i=await this._paramsToFilteredIds(e,n),r=i.length;return i=i.slice(t,t+a),{items:await this.itemService.searchTokenIds(i),totalMatches:r,limit:a,skip:t}}async _paramsToFilteredIds(e,t){let a=[];for(let t of Object.keys(e))a.push(`${t}:::${e[t]}`);let n=t?.filter((e=>a?.includes(e._id)));return n?.length>0?n.map((e=>e.tokenIds)).reduce(((e,t)=>e.filter((e=>t.includes(e))))):(this.allTokensCache||(this.allTokensCache=Array.from(new Set(t.map((e=>e.tokenIds)).flat()))),this.allTokensCache)}async list(e,t){let a=[];const n=await this.channelService.get(),i=await this.itemService.buildAttributeTotals(n);let r=await this.itemService.list(e,t);for(let e of r)a.push(await this.getViewModel(e,n,i));return a}async mintList(e,t){let a=[];const n=await this.channelService.get();let i=await this.itemService.list(e,t);for(let e of i)a.push(await this.getMintViewModel(e,n));return a}async itemPage(e){return this.itemPageService.get(e)}async attributeItemPage(e,t,a){return this.itemService.getRowItemViewModelsByAttribute(e,t,a)}async ownerItemPage(e,t){return this.itemService.getRowItemViewModelsByOwner(e,t)}async query(e){await this.schemaService.load(["items","channels"]);let t=await this.itemService.query(e);const a=await this.channelService.get();let n=[];for(let e of t)n.push(await this.getSearchViewModel(e,a));return n}async buildItemPages(e,t){let a=[],n=[];for(let t of e){let e=t.item;n.push({_id:e._id,coverImageGenerated:!!t.coverImage.generated,coverImageId:t.coverImage._id,title:`${e.title?e.title:`#${e.tokenId}`}`,tokenId:e.tokenId})}for(let e=0;e<n.length;e+=t)a.push({items:n.slice(e,e+t)});return a}async buildAttributeTotals(e){return this.itemService.buildAttributeTotals(e)}async getRowItemViewModelsByTokenIds(e){return this.itemService.getRowItemViewModelsByTokenIds(e)}translateRowItemViewModel(e,t){return{_id:e._id,coverImageGenerated:!!t.generated,coverImageId:t._id,title:`${e.title?e.title:`#${e.tokenId}`}`,tokenId:e.tokenId}}};da([(0,ye.f)("ItemService"),pa("design:type",ra)],fa.prototype,"itemService",void 0),da([(0,ye.f)("ChannelService"),pa("design:type",Ot)],fa.prototype,"channelService",void 0),da([(0,ye.f)("AuthorService"),pa("design:type",It)],fa.prototype,"authorService",void 0),da([(0,ye.f)("ImageService"),pa("design:type",Lt)],fa.prototype,"imageService",void 0),da([(0,ye.f)("SchemaService"),pa("design:type",At)],fa.prototype,"schemaService",void 0),da([(0,ye.f)("QuillService"),pa("design:type",Yt)],fa.prototype,"quillService",void 0),da([(0,ye.f)("AnimationService"),pa("design:type",Jt)],fa.prototype,"animationService",void 0),da([(0,ye.f)("ItemPageService"),pa("design:type",ca)],fa.prototype,"itemPageService",void 0),da([(0,ye.f)("AttributeTotalService"),pa("design:type",aa)],fa.prototype,"attributeTotalService",void 0),fa=da([(0,ge.b)(),pa("design:paramtypes",[])],fa);var ha=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ga=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ya=class{authorService;constructor(){}async get(e){return this.getViewModel(await this.authorService.get(e))}async getViewModel(e){return{author:e,authorDisplayName:this.authorService.getDisplayName(e)}}};ha([(0,ye.f)("AuthorService"),ga("design:type",It)],ya.prototype,"authorService",void 0),ya=ha([(0,ge.b)(),ga("design:paramtypes",[])],ya);var va=a(2186),ma=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ba=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let wa=class{metadataRepository;walletService;constructor(){}lastMintedTokenId=0;async getBalance(e){if(!e)return 0;let t=await this.getChannelContract();return parseInt(await t.balanceOf(e))}async getMetadata(e){return this.metadataRepository.get(e)}async mint(e,t){let a=await this.getChannelContract();await a.mint(e,{value:t})}async mintFromStartOrFail(e,t,a){let n=await this.getChannelContract();await n.mintFromStartOrFail(e,t,{value:a})}async mintAsOwner(e){let t=await this.getChannelContract();await t.mint(e,{})}async ownerOf(e){return(await this.getChannelContract()).ownerOf(e)}async getTotalMinted(){return(await this.getChannelContract()).totalMinted()}async getTotalSupply(){return(await this.getChannelContract()).totalSupply()}async owner(){return(await this.getChannelContract()).owner()}async getChannelContract(){let e=await this.walletService.getContract("Channel");if(this.walletService.provider&&0==this.walletService.provider.listeners()?.length){let t={address:e.address,topics:[(0,va.id)("MintEvent(uint256)")]};this.walletService.provider.on(t,(async e=>{let t=parseInt(e.data);if(t>this.lastMintedTokenId){this.lastMintedTokenId=t;let e=new CustomEvent("mint-event");e.tokenId=t,document.dispatchEvent(e)}}))}return e}};ma([(0,ye.f)("MetadataRepository"),ba("design:type",Object)],wa.prototype,"metadataRepository",void 0),ma([(0,ye.f)("WalletService"),ba("design:type",Object)],wa.prototype,"walletService",void 0),wa=ma([(0,ge.b)(),ba("design:paramtypes",[])],wa);var Ra=a(9380),$a=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Sa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ia=class{tokenContractService;channelService;itemService;schemaService;walletService;constructor(){}async getMintingViewModel(){await this.schemaService.load(["channels","items"]);let e=await this.channelService.get();if(e.contractAddress){let t=await this.tokenContractService.getTotalMinted(),a=[];if(Number(t)>0){let e=await this.itemService.listByTokenId(Number(t));for(let t of e)try{let e=await this.tokenContractService.ownerOf(t.tokenId);a.push({owner:await this.walletService.truncateEthAddress(e),item:t})}catch(e){}}return{totalMinted:Number(t),totalSupply:e.itemCount,mintPrice:e.mintPrice,lastMinted:a,minting:Number(t)<e.itemCount}}}async getHomeMintingViewModel(){await this.schemaService.load(["channels"]);let e=await this.channelService.get();if(e.contractAddress){let t=await this.tokenContractService.getTotalMinted();return{totalMinted:Number(t),totalSupply:e.itemCount,mintPrice:e.mintPrice}}}async mint(e){await this.schemaService.load(["channels"]);let t=await this.channelService.get(),a=await this.calculateTotalMint(t,e),n=await this.tokenContractService.owner();this.walletService.address.toLowerCase()==n.toLowerCase()?(console.log("Minting as owner"),await this.tokenContractService.mintAsOwner(e)):await this.tokenContractService.mint(e,a)}async mintFromStartOrFail(e,t){await this.schemaService.load(["channels"]);let a=await this.channelService.get(),n=await this.calculateTotalMint(a,e);await this.tokenContractService.mintFromStartOrFail(e,t,n)}async calculateTotalMint(e,t){let a=(0,Ra.vz)(e.mintPrice,"ether");return(Number(a)*t).toString()}async updateTotal(e,t){return(0,Ra.bM)(Number(e)*t)}async parseUnits(e){return(0,Ra.vz)(e,"ether")}};$a([(0,ye.f)("TokenContractService"),Sa("design:type",wa)],Ia.prototype,"tokenContractService",void 0),$a([(0,ye.f)("ChannelService"),Sa("design:type",Ot)],Ia.prototype,"channelService",void 0),$a([(0,ye.f)("ItemService"),Sa("design:type",ra)],Ia.prototype,"itemService",void 0),$a([(0,ye.f)("SchemaService"),Sa("design:type",At)],Ia.prototype,"schemaService",void 0),$a([(0,ye.f)("WalletService"),Sa("design:type",Object)],Ia.prototype,"walletService",void 0),Ia=$a([(0,ge.b)(),Sa("design:paramtypes",[])],Ia);var ja=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ka=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Oa=function(e,t){return function(a,n){t(a,n,e)}};let Ta=class{app;constructor(e){this.app=e}async queuePromiseView(e){const t=this;let a={id:Pa.newGuid(),icon:e.icon,title:e.title};return async function(){return new Promise(((e,n)=>{t._beforeSaveAction(a),e()}))}().then((async function(){let n=await e.promise;try{console.log("Transaction hash is ",n),t._showSuccess(n,a)}catch(e){t._showError(e,a)}return n}))}_beforeSaveAction(e){e.toast=this.app.toast.create({text:e.title,closeButton:!0}),e.toast.open()}_showError(e,t){t.toast.close(),console.log(e);let a={text:e.message,closeButton:!0,closeButtonText:"Close",closeTimeout:5e3};this.app.toast.create(a).open()}_showSuccess(e,t){t.toast.close();this.app.toast.create({text:"Transaction Submitted",closeButton:!0,closeTimeout:5e3}).open()}};Ta=ja([(0,ge.b)(),Oa(0,(0,ye.f)("framework7")),ka("design:paramtypes",[Object])],Ta);class Pa{static newGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}}var xa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ca=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Ma=function(e,t){return function(a,n){t(a,n,e)}};let Da=class{app;constructor(e){this.app=e}showExceptionPopup(e){console.log(e),this.app.dialog.alert(e.message,"There was an error")}showPopup(e){this.app.dialog.alert(e)}showAlert(e){this.app.dialog.alert(e)}spinnerDialog;showSpinner(e){this.spinnerDialog&&this.hideSpinner(),this.spinnerDialog=this.app.dialog.preloader(e||"Loading")}hideSpinner(){this.spinnerDialog&&(this.spinnerDialog.close(),this.spinnerDialog=null)}progressDialog;showProgress(e){this.progressDialog&&this.hideProgress();this.progressDialog=this.app.dialog.progress(e||"Loading",0)}setProgress(e,t){this.progressDialog&&(this.progressDialog.setProgress(e),this.progressDialog.setText(t))}hideProgress(){this.progressDialog&&(this.progressDialog.close(),this.progressDialog=null)}};Da=xa([(0,ge.b)(),Ma(0,(0,ye.f)("framework7")),Ca("design:paramtypes",[Object])],Da);class Aa extends Error{errors;constructor(e){super(),this.errors=e}}var Ua=a(7743),_a=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Va=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Na=class{readerSettingsRepository;schemaService;constructor(){}async get(){return await this.schemaService.load(["reader-settings"]),this.readerSettingsRepository.get()}async put(e){e.lastUpdated=(new Date).toJSON();let t=await(0,Ua.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new Aa(t);await this.readerSettingsRepository.put(e)}async updateCurrentPage(e){let t=await this.get();t.currentPage=e,await this.put(t)}};_a([(0,ye.f)("ReaderSettingsRepository"),Va("design:type",Object)],Na.prototype,"readerSettingsRepository",void 0),_a([(0,ye.f)("SchemaService"),Va("design:type",At)],Na.prototype,"schemaService",void 0),Na=_a([(0,ge.b)(),Va("design:paramtypes",[])],Na);class La{_id;_rev;removed;address;data;topics;logIndex;args;event;eventSignature;isTransfer;isMint;isBurn;namedArgs;lastUpdated;dateCreated}var Wa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Za=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ea=class{constructor(){}async translateEventToERCEvent(e){let t=new La;switch(t.removed=e.removed,t.address=e.address,t.data=e.data,t.topics=e.topics,t.logIndex=e.index,t.event=e.fragment?.name,t.eventSignature=e.eventSignature,t.dateCreated=(new Date).toJSON(),t.args=e.args?.map((e=>e.toString())),t.namedArgs={},t.event){case"Transfer":t.isTransfer=!0,t.namedArgs.fromAddress=t.args[0],t.namedArgs.toAddress=t.args[1],t.namedArgs.tokenId=t.args[2];break;case"Approval":t.namedArgs.owner=t.args[0],t.namedArgs.approved=t.args[1],t.namedArgs.tokenId=t.args[2];break;case"ApprovalForAll":t.namedArgs.owner=t.args[0],t.namedArgs.operator=t.args[1],t.namedArgs.approved=t.args[2]}return t.isTransfer&&"0x0000000000000000000000000000000000000000"==t.namedArgs?.fromAddress&&(t.isMint=!0),t.isTransfer&&"0x0000000000000000000000000000000000000000"==t.namedArgs?.toAddress&&(t.isBurn=!0),t}};Ea=Wa([(0,ge.b)(),Za("design:paramtypes",[])],Ea);var Fa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ba=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ha=class{componentStateRepository;constructor(){}async get(e){return this.componentStateRepository.get(e)}async put(e){e.dateCreated||(e.dateCreated=(new Date).toJSON()),e.lastUpdated=(new Date).toJSON();let t=await(0,Ua.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new Aa(t);return this.componentStateRepository.put(e)}};Fa([(0,ye.f)("ComponentStateRepository"),Ba("design:type",Object)],Ha.prototype,"componentStateRepository",void 0),Ha=Fa([(0,ge.b)(),Ba("design:paramtypes",[])],Ha);var qa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ga=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Ja{_id;_rev;data;dateCreated;lastUpdated}qa([(0,pt.a)(),Ga("design:type",String)],Ja.prototype,"_id",void 0),qa([(0,pt.a)(),Ga("design:type",String)],Ja.prototype,"_rev",void 0),qa([(0,pt.a)(),Ga("design:type",Object)],Ja.prototype,"data",void 0),qa([(0,pt.a)(),Ga("design:type",String)],Ja.prototype,"dateCreated",void 0),qa([(0,pt.a)(),Ga("design:type",String)],Ja.prototype,"lastUpdated",void 0);var za=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Qa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ka=class{db;dbName="component-state";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1})}constructor(){}async get(e){return Object.assign(new Ja,await this.db.get(e))}async put(e){await this.db.put(e)}};za([(0,ye.f)("DatabaseService"),Qa("design:type",ke)],Ka.prototype,"databaseService",void 0),Ka=za([(0,ge.b)(),Qa("design:paramtypes",[])],Ka);var Xa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ya=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let en=class{tokenOwnerPageRepository;constructor(){}async getHome(){return this.tokenOwnerPageRepository.getHome()}async get(e){return this.tokenOwnerPageRepository.get(e)}async getTotals(){return this.tokenOwnerPageRepository.getTotals()}};Xa([(0,ye.f)("TokenOwnerPageRepository"),Ya("design:type",Object)],en.prototype,"tokenOwnerPageRepository",void 0),en=Xa([(0,ge.b)(),Ya("design:paramtypes",[])],en);var tn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},an=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},nn=function(e,t){return function(a,n){t(a,n,e)}};let rn=class{baseURI;hostname;constructor(e,t){this.baseURI=e,this.hostname=t}async getHome(){return(await o.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/home.json`)).data}async getTotals(){return(await o.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/total.json`)).data}async get(e){return(await o.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/${e}.json`)).data}};rn=tn([(0,ge.b)(),nn(0,(0,ye.f)("baseURI")),nn(1,(0,ye.f)("hostname")),an("design:paramtypes",[Function,Function])],rn);var on=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},sn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let cn=class{processedTransactionRepository;itemService;constructor(){}async get(e){return this.processedTransactionRepository.get(e)}async getRowItemViewModels(e){let t={},a=new Set;for(let t of e)t.tokenId&&a.add(t.tokenId);let n=await this.itemService.getRowItemViewModelsByTokenIds(Array.from(a));for(let e of n)t[e.tokenId]=e;return t}async translateSalesToViewModels(e){let t=[];for(let a of e)t.push({sale:a,item:await this.itemService.getRowItemViewModelsByTokenId(a.tokenId)});return t}async getSalesReport(){return this.processedTransactionRepository.getSalesReport()}async getAttributeSalesReport(e,t){return this.processedTransactionRepository.getAttributeSalesReport(e,t)}async getAttributesOverall(){return this.processedTransactionRepository.getAttributesOverall()}async getLargestSales(e){return this.processedTransactionRepository.getLargestSales(e)}};on([(0,ye.f)("ProcessedTransactionRepository"),sn("design:type",Object)],cn.prototype,"processedTransactionRepository",void 0),on([(0,ye.f)("ItemService"),sn("design:type",ra)],cn.prototype,"itemService",void 0),cn=on([(0,ge.b)(),sn("design:paramtypes",[])],cn);var ln=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},dn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},pn=function(e,t){return function(a,n){t(a,n,e)}};let un=class{baseURI;processedTransactionService;constructor(e){this.baseURI=e}async getHomeViewModel(){return(await o.Z.get(`${this.baseURI()}sync/home.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async list(e){let t=await this.getLatest(),a=(await o.Z.get(`${this.baseURI()}sync/transactions/activity/${e}.json`)).data;return a.lastUpdated=t.lastUpdated,a}async listByAddress(e,t){let a=(await o.Z.get(`${this.baseURI()}sync/tokenOwner/${e}/activity/${t}.json`)).data,n=await this.getLatest();return a.lastUpdated=n.lastUpdated,a}async getLatest(){return(await o.Z.get(`${this.baseURI()}sync/transactions/latest.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async getRecentActivity(){return(await o.Z.get(`${this.baseURI()}sync/transactions/recentActivity.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async getSalesReport(){return this.processedTransactionService.getSalesReport()}async getAttributeSalesReport(e,t){return this.processedTransactionService.getAttributeSalesReport(e,t)}async getAttributesOverall(){return this.processedTransactionService.getAttributesOverall()}async getLargestSales(e){return await this.processedTransactionService.getLargestSales(e)}abbreviateDollars(e,t){if(!e)return"$0";var a=Math.log10(Math.abs(e))/3|0;if(0==a||1==a){return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(e)}var n=["","","M","G","T","P","E"][a],i=e/Math.pow(10,3*a);return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(i)+n}};ln([(0,ye.f)("ProcessedTransactionService"),dn("design:type",cn)],un.prototype,"processedTransactionService",void 0),un=ln([(0,ge.b)(),pn(0,(0,ye.f)("baseURI")),dn("design:paramtypes",[Function])],un);var fn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},hn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let gn=class{baseURI;async get(e){let t;try{t=(await o.Z.get(`${this.baseURI()}sync/transactions/${e}.json`)).data}catch(e){console.log(e)}return t}async getSalesReport(){let e;try{e=(await o.Z.get(`${this.baseURI()}sync/sales/overall.json`)).data}catch(e){console.log(e)}return e}async getAttributeSalesReport(e,t){let a;try{a=(await o.Z.get(`${this.baseURI()}sync/attributes/${this.attributeKeyToInteger(`${e}::::${t}`)}/attribute.json`)).data}catch(e){console.log(e)}return a}async getAttributesOverall(){let e;try{e=(await o.Z.get(`${this.baseURI()}sync/attributes/totals.json`)).data}catch(e){console.log(e)}return e}attributeKeyToInteger(e){let t,a,n=0;if(0===e.length)return n;for(t=0;t<e.length;t++)a=e.charCodeAt(t),n=(n<<5)-n+a,n|=0;return n}async getLargestSales(e){let t;try{t=(await o.Z.get(`${this.baseURI()}sync/sales/largest-${e}.json`)).data}catch(e){console.log(e)}return t}};fn([(0,ye.f)("baseURI"),hn("design:type",Function)],gn.prototype,"baseURI",void 0),gn=fn([(0,ge.b)()],gn);class yn{}var vn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},mn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let bn=class{walletService;tokenOwnerRepository;constructor(){}async get(e){return this.tokenOwnerRepository.get(e)}async getDisplayName(e){if(!e)return;let t=await this.tokenOwnerRepository.getENS(e);return t||this.walletService.truncateEthAddress(e)}async getOrCreate(e){let t;if(!t)try{t=await this.get(e)}catch(e){}return t||(t=new yn,t._id=e,t.tokenIds=[],t.count=0),t}async put(e){return this.tokenOwnerRepository.put(e)}async putAll(e){return e.forEach((e=>{e._id||(e.dateCreated=(new Date).toJSON()),e.lastUpdated=(new Date).toJSON()})),this.tokenOwnerRepository.putAll(e)}async list(e,t){return this.tokenOwnerRepository.list(e,t)}};vn([(0,ye.f)("WalletService"),mn("design:type",Object)],bn.prototype,"walletService",void 0),vn([(0,ye.f)("TokenOwnerRepository"),mn("design:type",Object)],bn.prototype,"tokenOwnerRepository",void 0),bn=vn([(0,ge.b)(),mn("design:paramtypes",[])],bn);let wn=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["count"]}}),await e.put({_id:"_design/by_token_id",views:{by_token_id:{map:function(e){for(let t of e.tokenIds)emit(t)}.toString()}}})}}];var Rn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},$n=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Sn=class{db;dbName="token-owners";databaseService;baseURI;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1,changesets:wn})}constructor(){}async getENS(e){let t;try{let a=await o.Z.get(`${this.baseURI()}sync/tokenOwner/${e}/ens.json`);t=a.data?.name}catch(e){}return t}async get(e){try{let t=await o.Z.get(`${this.baseURI()}sync/tokenOwner/${e}/tokenOwner.json`);return Object.assign(new yn,t.data)}catch(e){console.log(e)}}async put(e){}async putAll(e){}async list(e,t){}};Rn([(0,ye.f)("DatabaseService"),$n("design:type",ke)],Sn.prototype,"databaseService",void 0),Rn([(0,ye.f)("baseURI"),$n("design:type",Function)],Sn.prototype,"baseURI",void 0),Sn=Rn([(0,ge.b)(),$n("design:paramtypes",[])],Sn);var In=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},jn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let kn=class{tokenRepository;constructor(){}async get(e){return this.tokenRepository.get(e)}};In([(0,ye.f)("TokenRepository"),jn("design:type",Object)],kn.prototype,"tokenRepository",void 0),kn=In([(0,ge.b)(),jn("design:paramtypes",[])],kn);var On=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Tn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Pn,xn=class{changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["tokenId"]}})}}];db;dbName="row-item-view-models";databaseService;constructor(){}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0,initialRecordsPath:"t/all.json",changesets:this.changesets})}async get(e){return this.db.get(e)}async put(e){await this.db.put(e)}async getByTokenIds(e){let t=await this.db.find({selector:{tokenId:{$in:e}}});return t.docs?.length>0?t.docs:[]}};async function Cn(e,t,a,n,i,s){if(Pn)return Pn;return Pn=e,globalThis.baseURI=t,globalThis.hostname=a,globalThis.channelId=s,Pn.bind("framework7").toConstantValue((r.ZP.registerComponent("nav-bar",A),r.ZP.registerComponent("token-toolbar",_),r.ZP.registerComponent("mint-list",W),r.ZP.registerComponent("attribute-filter",G),r.ZP.registerComponent("explore-total-info",z),r.ZP.registerComponent("mint-info",K),r.ZP.registerComponent("largest-sales",Y),r.ZP.registerComponent("transaction-viewer",N),r.ZP.registerComponent("transaction-row",ce),r.ZP.registerComponent("leaderboard-rows",de),r.ZP.registerComponent("search-list",ue),r.ZP.registerComponent("infinite-scroll-content",he),globalThis.app=new r.ZP({el:"#app",id:"large-reader",name:"Large Reader",theme:"auto",init:!1,view:{browserHistory:!0,browserHistorySeparator:"",browserHistoryOnLoad:!1,browserHistoryInitialMatch:!1},navbar:{hideOnPageScroll:!0},toolbar:{hideOnPageScroll:!0},routes:i}),globalThis.app)),Pn.bind("version").toConstantValue(n),Pn.bind("PouchDB").toConstantValue((async()=>d.Z)),Pn.bind("provider").toConstantValue((async()=>{if("undefined"!=typeof window&&window.ethereum)return window.web3Provider=window.ethereum,new l.Q(window.ethereum)})),Pn.bind("contracts").toConstantValue((async()=>{let e,t,a=await o.Z.get(`${globalThis.hostname}${globalThis.baseURI}backup/contract/contract.json`,{responseType:"json"}),n=await o.Z.get(`${globalThis.hostname}${globalThis.baseURI}backup/contract/contract-abi.json`,{responseType:"json"});return 200===a.status&&(e=a.data),200===a.status&&(t=n.data),e.contractAddress?(t.Channel.address=e.contractAddress,t):[]})),Pn.bind("baseURI").toConstantValue((()=>globalThis.baseURI)),Pn.bind("hostname").toConstantValue((()=>globalThis.hostname)),Pn.bind("channelId").toConstantValue((()=>globalThis.channelId)),Pn.bind("WalletService").to($e).inSingletonScope(),Pn.bind("ChannelRepository").to(xe).inSingletonScope(),Pn.bind("ItemRepository").to(Ue).inSingletonScope(),Pn.bind("AuthorRepository").to(Le).inSingletonScope(),Pn.bind("MetadataRepository").to(Be).inSingletonScope(),Pn.bind("ImageRepository").to(Je).inSingletonScope(),Pn.bind("AnimationRepository").to(Xe).inSingletonScope(),Pn.bind("StaticPageRepository").to(at).inSingletonScope(),Pn.bind("ItemPageRepository").to(ot).inSingletonScope(),Pn.bind("TokenOwnerPageRepository").to(rn).inSingletonScope(),Pn.bind("AttributeTotalRepository").to(dt).inSingletonScope(),Pn.bind("ReaderSettingsRepository").to(vt).inSingletonScope(),Pn.bind("ContractStateRepository").to({}).inSingletonScope(),Pn.bind("ComponentStateRepository").to(Ka).inSingletonScope(),Pn.bind("TokenOwnerRepository").to(Sn).inSingletonScope(),Pn.bind("TokenRepository").to(Rt).inSingletonScope(),Pn.bind("ProcessedTransactionRepository").to(gn).inSingletonScope(),Pn.bind("RowItemViewModelRepository").to(xn).inSingletonScope(),Pn.bind("ChannelWebService").to(Ht).inSingletonScope(),Pn.bind("ItemWebService").to(fa).inSingletonScope(),Pn.bind("AuthorWebService").to(ya).inSingletonScope(),Pn.bind("MintWebService").to(Ia).inSingletonScope(),Pn.bind("StaticPageService").to(Et).inSingletonScope(),Pn.bind("ItemPageService").to(ca).inSingletonScope(),Pn.bind("QueueService").to(Ta).inSingletonScope(),Pn.bind("TransactionWebService").to(un).inSingletonScope(),Pn.bind("PagingService").to(xt).inSingletonScope(),Pn.bind("DatabaseService").to(ke).inSingletonScope(),Pn.bind("AnimationService").to(Jt).inSingletonScope(),Pn.bind("UiService").to(Da).inSingletonScope(),Pn.bind("ItemService").to(ra).inSingletonScope(),Pn.bind("ImageService").to(Lt).inSingletonScope(),Pn.bind("ChannelService").to(Ot).inSingletonScope(),Pn.bind("AuthorService").to(It).inSingletonScope(),Pn.bind("TokenContractService").to(wa).inSingletonScope(),Pn.bind("SchemaService").to(At).inSingletonScope(),Pn.bind("QuillService").to(Yt).inSingletonScope(),Pn.bind("AttributeTotalService").to(aa).inSingletonScope(),Pn.bind("ComponentStateService").to(Ha).inSingletonScope(),Pn.bind("ReaderSettingsService").to(Na).inSingletonScope(),Pn.bind("ERCEventService").to(Ea).inSingletonScope(),Pn.bind("GenerateService").to({}).inSingletonScope(),Pn.bind("TokenOwnerService").to(bn).inSingletonScope(),Pn.bind("TokenService").to(kn).inSingletonScope(),Pn.bind("TokenOwnerPageService").to(en).inSingletonScope(),Pn.bind("ProcessedTransactionService").to(cn).inSingletonScope(),globalThis.container=Pn,globalThis.he=c(),globalThis.dayjs=f(),globalThis.ComponentState=Ja,Pn}On([(0,ye.f)("DatabaseService"),Tn("design:type",ke)],xn.prototype,"databaseService",void 0),xn=On([(0,ge.b)(),Tn("design:paramtypes",[])],xn),d.Z.plugin(p.Z),f().extend(g()),f().extend(v()),r.ZP.use([m.Z,b.Z,w.Z,R.Z,$.Z,k.Z,O.Z,T.Z,P.Z,S.Z,I.Z,x.Z,j.Z,C.Z,M.Z]);var Mn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Dn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let An=class{constructor(){}homeRepository;async get(){return this.homeRepository.get(0)}abbreviateDollars(e,t){if(!e)return"$0";var a=Math.log10(Math.abs(e))/3|0;if(0==a||1==a){return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(e)}var n=["","","M","G","T","P","E"][a],i=e/Math.pow(10,3*a);return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(i)+n}};Mn([(0,ye.f)("HomeRepository"),Dn("design:type",Object)],An.prototype,"homeRepository",void 0),An=Mn([(0,ge.b)(),Dn("design:paramtypes",[])],An);var Un=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},_n=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Vn=function(e,t){return function(a,n){t(a,n,e)}};let Nn=class{libraryURL;constructor(e){this.libraryURL=e}async get(e){return(await o.Z.get(`${this.libraryURL}/home.json`)).data}};Nn=Un([(0,ge.b)(),Vn(0,(0,ye.f)("libraryURL")),_n("design:paramtypes",[Object])],Nn);class Ln{static async resolveWithSpinner(e,t,a){globalThis.app&&(globalThis.app.preloader.show(),e({componentUrl:t,options:a}),globalThis.app.preloader.hide())}static getReaderRoutes(e){const t=[];let a=`${e}partial/`;return"/"!=e&&e.endsWith("/")&&t.push({path:`${e.substring(0,e.length-1)}`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}index.html`)}}),Ln.addSharedRoutes(t,e),t.push({path:"(.*)",async async({resolve:e,reject:t,to:n}){console.log(`404 error: ${n.path}`),await Ln.resolveWithSpinner(e,`${a}404.html`)}}),t}static getLibraryRoutes(e){let t=`${e}/partial`;const a=[{path:`${e}`,async async({resolve:e,reject:a,to:n}){await Ln.resolveWithSpinner(e,`${t}/index.html`)}},{path:`${e}/`,async async({resolve:e,reject:a,to:n}){await Ln.resolveWithSpinner(e,`${t}/index.html`)}},{path:`${e}/index.html`,async async({resolve:e,reject:a,to:n}){await Ln.resolveWithSpinner(e,`${t}/index.html`)}}];return Ln.addSharedRoutes(a,"/r/:reader_slug/"),a.push({path:"(.*)",async async({resolve:e,reject:a,to:n}){console.log(`404 error: ${n.path}`),await Ln.resolveWithSpinner(e,`${t}/404.html`)}}),a}static addSharedRoutes(e,t){let a;a=t.indexOf(":reader_slug")>0?t.replace(":reader_slug","{{reader_slug}}"):t,a+="partial/",e.push({path:`${t}`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}index.html`)}},{path:`${t}index.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}index.html`)}},{path:`${t}mint.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}mint.html`)}},{path:`${t}search.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}search.html`)}},{path:`${t}explore.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}explore.html`)}},{path:`${t}activity`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}activity/index.html`)}},{path:`${t}activity/index.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}activity/index.html`)}},{path:`${t}leaderboard`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}leaderboard/index.html`)}},{path:`${t}leaderboard/index.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}leaderboard/index.html`)}},{path:`${t}sales`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}sales/index.html`)}},{path:`${t}sales/index.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}sales/index.html`)}},{path:`${t}attributes`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}attributes/index.html`)}},{path:`${t}attributes/index.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}attributes/index.html`)}},{path:`${t}attribute`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}attribute/index.html`)}},{path:`${t}attribute/index.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}attribute/index.html`)}},{path:`${t}u`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}u/index.html`)}},{path:`${t}u/index.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}u/index.html`)}},{path:`${t}u/activity`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}u/activity/index.html`)}},{path:`${t}u/activity/index.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}u/activity/index.html`)}},{path:`${t}list-:page.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}list-{{page}}.html`)}},{path:`${t}t/:tokenId`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}t/{{tokenId}}/index.html`,{force:!0})}},{path:`${t}t/:tokenId/index.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}t/{{tokenId}}/index.html`,{force:!0})}},{path:`${t}s/:slug.html`,async async({resolve:e,reject:t,to:n}){await Ln.resolveWithSpinner(e,`${a}s/{{slug}}.html`)}})}}let Wn=async(e,t,a,r,o)=>{if(console.log("Initializing Library"),"serviceWorker"in navigator){const s=new n.ZW(`${a}/sw-library-${r}.js`,{scope:"/"});let c=new i.W;c.bind("libraryURL").toConstantValue(e),c.bind("HomeWebService").to(An).inSingletonScope(),c.bind("HomeRepository").to(Nn).inSingletonScope();let l=Ln.getLibraryRoutes(e);c=await Cn(c,t,a,r,l,o),navigator.serviceWorker.controller?Zn(c,a):s.addEventListener("controlling",(e=>{Zn(c,a)})),s.register()}},Zn=async(e,t)=>{let a=e.get("framework7"),n=window.location.toString().replace(`${t}`,"");a.views.create(".view-main",{url:n}).on("init",(async e=>{console.log(`Navigating to ${n}`),e.router.navigate(n,{reloadCurrent:!0,animate:!1})})),a.init()}},5525:()=>{}},e=>{e.O(0,[216],(()=>{return t=3392,e(e.s=t);var t}));var t=e.O();library=t}]);
//# sourceMappingURL=main.library.js.map