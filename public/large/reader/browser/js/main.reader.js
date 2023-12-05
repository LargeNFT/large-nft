var reader;(self.webpackChunkreader=self.webpackChunkreader||[]).push([[179],{185:(e,t,a)=>{"use strict";a.r(t),a.d(t,{initReader:()=>xn});a(5666),a(8660);var n=a(5131),i=a(5717),r=a(7725),o=a(2861),s=a(6492),c=a.n(s),l=a(4581),d=a(9771),p=a(8614),f=a(7484),u=a.n(f),h=a(4110),g=a.n(h),y=a(6176),v=a.n(y),m=(a(4445),a(8468)),b=a(831),w=a(3210),R=a(6879),$=a(4346),S=a(4496),I=a(9746),j=a(860),k=a(9542),O=a(7140),T=a(9859),P=a(5751),x=a(1910),C=a(8235),A=a(5740);function D(e,{$on:t,$f7:a,$update:n}){let i,r=globalThis.container.get("WalletService"),o=(globalThis.container.get("UiService"),globalThis.container.get("baseURI")),s=globalThis.container.get("hostname"),c=(e.symbol,e.logo,e.title),l=e.active,d=e.library_url,p=e.large_url,f="true"==e.show_mint_page,u="true"==e.show_activity_page,h="true"==e.hide_menu,g=e.breadcrumbs,y=!0;const v=()=>p?.length>0?`${p}/index.html#!/admin/channel/fork-reader?path=${encodeURIComponent(`${s()}${o()}`)}`:`${o()}large/index.html#!/admin/channel/fork-reader?path=${encodeURIComponent(`${s()}${o()}`)}`,m=e=>r.truncateEthAddress(e),b=async e=>{i=void 0,r.provider||await r.initProvider(),i=await r.getAddress(),r.provider||(y=!1),i&&(r.address=i,r.wallet||await r.connect()),n()},w=async e=>{await r.initWallet(),await r.connect(),b()};b();return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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
  
                            ${f?t`
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
  
  
                        ${u?t`
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
  
                ${u?t`
                  <a class="link ${"Activity"==l?t`link-active`:t` `}" href="${o()}activity">
                    Activity
                  </a> 
  
                  <a class="link ${"Leaderboard"==l?t`link-active`:t` `}" href="${o()}leaderboard" >
                    Leaderboard
                  </a> 
  
                `:t`<span />`}
  
                ${y?t`
  
                  ${f?t`
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

`}}D.id="df04d5c99a";const M=D;function _(e,{$on:t,$:a,$f7:n,$update:i}){let r=globalThis.container.get("baseURI"),o=globalThis.container.get("ReaderSettingsService"),s=e.token_id,c=e.item_count,l=e.current_page;const d=e=>r()+e,p=async e=>{e.preventDefault();let t=a(e.currentTarget).val();n.preloader.show(),t>0?(await o.updateCurrentPage(parseInt(t)),n.views.main.router.navigate(d("t/"+t),{transition:"f7-flip"})):n.views.main.router.navigate(d("index.html")),n.preloader.hide()},f=e=>{e.preventDefault();const t=n.range.get(e.target);s=t.value,i()};return app.on("current-page-updated",(function(e){l=e,i()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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
                    @range:change=${f}
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

`}}_.id="70e5cce23f",_.style="\n.page-number {\n    width: 100%;\n    text-align: center;\n    font-size: 13px;\n    margin-bottom: 15px;\n}\n\n.range-slider {\n    width: 100%;\n    margin-left: 20px; \n    margin-right: 20px;\n    flex: 1;\n}\n\n.toolbar a.back-to-page {\n    height: 45px;\n    width: 70px;\n    margin-left: 10px;\n    flex: 0 0 70px;\n    font-size: 10px;\n    text-transform: none;\n    white-space: normal;\n    line-height: 13px;\n}\n";const U=_;function V(e,{$on:t,$f7:a,$update:n}){return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`




`}}V.id="5552a0984b",V.style="\n\n\n\n\n";const N=V;let W,Z,L=null,B={},F=async e=>Z(e);function E(e,{$:t,$on:a,$f7:n,$update:i}){L=[],B={},Z=async e=>{W=e.attributeOptions,e.attributeParams&&(B=e.attributeParams,t("#attribute-accordian-item").addClass("accordion-item-opened")),await i()},document.removeEventListener("attribute-options-loaded",F),document.addEventListener("attribute-options-loaded",F);const r=e=>{B[e.currentTarget.name]=e.currentTarget.value,e.currentTarget.value?B[e.currentTarget.name]=e.currentTarget.value:delete B[e.currentTarget.name];let t=new CustomEvent("explore-attribute-filter-changed");t.attributeParams=B,document.dispatchEvent(t)},o=async e=>{let a=t(e.currentTarget).data("id");delete B[a],await i();let n=new CustomEvent("explore-attribute-filter-changed");n.attributeParams=B,document.dispatchEvent(n)};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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
                    ${W?.map((e=>t`
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






`}}E.id="b38f401ad2",E.style="\n\n.item-content.attribute-select {\n  width: 175px;\n  display: inline-block;\n}\n\n\n";const H=E;function q(e,{$:t,$on:a,$f7:n,$update:i}){let r,o;return document.addEventListener("explore-total-info-changed",(async e=>{r=e.totalItems,o=e.totalMatches,await i()})),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

  <div class="block-title block-title-small">

    ${o?t`

      ${o!=r?t`
        Showing ${o} results (${r} total)
      `:t`
        Showing 1 - ${r} results  
      `}

    `:t`<span/>`}

  </div>

`}}q.id="6a11acb1a7",q.style="\n\n\n";const G=q;function J(e,{$:t,$on:a,$f7:n,$update:i}){let r,o=e.baseurl;return app.on("minting-view-model-updated",(function(e){r=e,i()})),function(e){e.$;var t,a=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return a`

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

`}}J.id="e5e0db85ca",J.style="\n";const z=J;function Q(e,{$:t,$on:a,$f7:n,$update:i}){globalThis.container.get("WalletService"),globalThis.container.get("MintWebService");let r=globalThis.container.get("TransactionWebService"),o=globalThis.container.get("baseURI")();const s=e=>o+e;let c=e.largest_sales;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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

  
`}}Q.id="09d9063db8";const K=Q,X=(e,{$h:t})=>{globalThis.container.get("WalletService");let a=globalThis.container.get("TransactionWebService");const n=e=>`${o+e}`;let i=e.transaction,r=e.event,o=e.base_uri,s=e.row_item_view_models,c=e.index;return()=>t`
    
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
                  ${te(r.fromAddress)}
            </a> <span class="f7-icons">arrow_right</span>

            <a href="${o}u/?address=${r.toAddress}" class="${r.toAddress==i.from?"is-from":""}">
              ${te(r.toAddress)}
            </a>

          </td>
        </tr>
    `},Y=(e,{$h:t})=>{globalThis.container.get("WalletService"),globalThis.container.get("TransactionWebService");const a=e=>`${r+e}`;let n=e.transaction,i=e.event,r=e.base_uri,o=e.row_item_view_models,s=e.index,c=(i?.namedArgs?.owner,i?.namedArgs?.approved);n?.from;return()=>{return t`
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
    `;var e}},ee=(e,{$h:t})=>{globalThis.container.get("WalletService"),globalThis.container.get("TransactionWebService");let a=e.transaction,n=e.event,i=e.base_uri,r=e.index;return()=>t`
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
            <a href="${i}u/?address=${n.namedArgs.owner}" class="${n.namedArgs.owner==a.from?"is-from":""}">${te(n.namedArgs.owner)}</a> 
            <span class="f7-icons">arrow_right</span>
            <a href="${i}u/?address=${n.namedArgs.operator}" class="${n.namedArgs?.operator==a.from?"is-from":""}">${te(n.namedArgs.operator)}</a>
          </td>

        </tr>
    `},te=e=>{let t=globalThis.container.get("WalletService");return ae?.ens&&ae.ens[e]?ae.ens[e]:t.truncateEthAddress(e)};let ae,ne,ie=async e=>ne(e);function re(e,{$:t,$on:a,$f7:n,$update:i}){globalThis.container.get("WalletService");let r=globalThis.container.get("baseURI")();ae=e.transactions;let o=e.items,s=e.token;return ne=async e=>{ae=e.transactionsViewModel,await i()},document.removeEventListener("transactions-updated",ie),document.addEventListener("transactions-updated",ie),function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`
  
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
          ${ae?.transactions.map(((e,a)=>t`
  
            ${e.events?.map((n=>t`
  
              ${"Approval"!=n.event||s&&n?.tokenId!=s?t` `:t`
                <${Y} transaction=${e.transaction} event=${n} base_uri=${r} row_item_view_models=${o} index="${a}" />
              `}
          
              ${"Transfer"!=n.event||s&&n?.tokenId!=s?t` `:t`
                <${X} transaction=${e.transaction} event=${n} base_uri=${r} row_item_view_models=${o} index="${a}"/>
              `}
          
              ${"ApprovalForAll"!=n.event||s&&n?.tokenId!=s?t` `:t`
                <${ee} transaction=${e.transaction} event=${n} base_uri=${r} index="${a}"/>
              `}
          
            `))}
  
  
          `))}
        </tbody>
      </table>
    </div>

  </div>

`}}re.id="f362c2c314",re.style="\n\n";const oe=re;function se(e,{$:t,$on:a,$f7:n,$update:i}){let r=globalThis.container.get("TransactionWebService"),o=globalThis.container.get("WalletService"),s=globalThis.container.get("baseURI")(),c=e.token_owners;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`
  
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

`}}se.id="1131282e23";const ce=se;function le(e,{$:t,$on:a,$f7:n,$update:i}){let r=globalThis.container.get("ItemWebService"),o=globalThis.container.get("baseURI")();const s=e=>o+e;let c,l=!1;const d=async e=>{e.preventDefault(),t(".searchbar input").blur(),n.preloader.showIn(".cards-list"),l=!0,i(),c=await r.query(t(".searchbar input").val()),l=!1,i(),n.preloader.hideIn(".cards-list")};return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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

`}}le.id="612e382ca6",le.style="\n\n.block-search {\n  background: #f1f1f1;\n  font-size: 14px;\n}\n\n";const de=le;function pe(e,{$:t,$on:a,$f7:n,$update:i}){let r=e.baseurl,o=e.items;const s=e=>`${r+e}`;return function(e){e.$;var t=e.$h;e.$root,e.$f7,e.$f7route,e.$f7router,e.$theme,e.$update,e.$store;return t`

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
  
`}}pe.id="5b8be42df7",pe.style="\n";const fe=pe;var ue=a(5466),he=a(1906),ge=a(5556),ye=a(7955),ve=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},me=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},be=function(e,t){return function(a,n){t(a,n,e)}};let we=class{contracts;getProvider;$f7;wallet;address;ethersContracts={};provider;constructor(e,t,a){this.contracts=e,this.getProvider=t,this.$f7=a}async initProvider(){this.provider=await this.getProvider(),globalThis.ethereum?.on("accountsChanged",(async e=>{delete this.address,e?.length>0&&await this.initWallet(),this.$f7.views.main.router.refreshPage()})),globalThis.ethereum?.on("networkChanged",(async e=>{this.ethersContracts={},this.provider=await this.getProvider(),await this.initWallet()}))}async initWallet(){console.log("Init wallet"),delete this.address,this.provider||await this.initProvider();let e=await this.provider.send("eth_accounts",[]);if(e?.length>0)return this.connect();console.log("Init wallet complete")}async connect(){console.log("Connect wallet"),await this.provider.send("eth_requestAccounts",[]),this.wallet=await this.provider.getSigner(),this.address=await this.getAddress(),console.log(`Wallet ${this.address} connected`)}async getAddress(){if(!this.provider)return;let e=await this.provider.send("eth_accounts",[]);return e?.length>0?(0,ge.K)(e[0]):void 0}async getWallet(){return this.provider.getSigner()}async getContract(e){let t=(await this.contracts())[e];return this.ethersContracts[e]=new ye.CH(t.address,t.abi,this.wallet?this.wallet:this.provider),this.ethersContracts[e]}truncateEthAddress(e){if(!e)return;const t=e.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);return t?`${t[1]}…${t[2]}`:e}};we=ve([(0,ue.b)(),be(0,(0,he.f)("contracts")),be(1,(0,he.f)("provider")),be(2,(0,he.f)("framework7")),me("design:paramtypes",[Function,Function,Object])],we);var Re=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},$e=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Se=function(e,t){return function(a,n){t(a,n,e)}};let Ie=class{baseURI;hostname;PouchDB;channelId;dbCache={};constructor(e,t,a,n){this.baseURI=e,this.hostname=t,this.PouchDB=a,this.channelId=n}async getDatabase(e){let t=await this.PouchDB();const a=`./pouch/${this.channelId()}/${e.name}`;if(this.dbCache[a])return this.dbCache[a];this.dbCache[a]=new t(a);const n=await this.dbCache[a].info();if(0==n.doc_count&&0==n.update_seq){if(e.changesets){console.log(`Creating indexes for ${a}`);let t={_id:"_local/changesets",ids:[]};for(let n of e.changesets)await n.changeset(this.dbCache[a]),t.ids.push(n.id),console.log(`New changeset detected...${n.id}`);await this.dbCache[a].put(t)}e.initialRecords&&await this.loadInitialRecords(e,a)}else if(e.changesets){let t;try{t=await this.dbCache[a].get("_local/changesets")}catch(e){}t||(t={_id:"_local/changesets",ids:[]});let n=!1;for(let i of e.changesets)if(!t.ids.includes(i.id)){try{await i.changeset(this.dbCache[a])}catch(e){}t.ids.push(i.id),n=!0,console.log(`New changeset detected...${i.id}`)}n&&(console.log("Saving changeset log...",t),await this.dbCache[a].put(t))}return this.dbCache[a]}async loadInitialRecords(e,t){let a;a=e.initialRecordsPath?await fetch(`${this.hostname()}${this.baseURI()}${e.initialRecordsPath}`):await fetch(`${this.hostname()}${this.baseURI()}backup/export/backup/${e.name}.json`);let n=await a.json();n?.length>0&&(console.log(`Loading ${n?.length} initial records for ${t}`),await this.dbCache[t].bulkDocs(n))}};Ie=Re([(0,ue.b)(),Se(0,(0,he.f)("baseURI")),Se(1,(0,he.f)("hostname")),Se(2,(0,he.f)("PouchDB")),Se(3,(0,he.f)("channelId")),$e("design:paramtypes",[Function,Function,Object,Function])],Ie);var je=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ke=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Oe=function(e,t){return function(a,n){t(a,n,e)}};let Te=class{baseURI;hostname;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["dateCreated"]}}),await e.createIndex({index:{fields:["lastUpdated"]}})}}];db;dbName="channels";databaseService;constructor(e,t){this.baseURI=e,this.hostname=t}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(){let e,t=await this.db.allDocs({include_docs:!0});for(let a of t.rows)a.doc.dateCreated&&(e=a.doc);const a=await o.Z.get(`${this.hostname()}${this.baseURI()}backup/contract/contract.json`);return a?.data&&(e.contractAddress=a.data.contractAddress),e}};je([(0,he.f)("DatabaseService"),ke("design:type",Ie)],Te.prototype,"databaseService",void 0),Te=je([(0,ue.b)(),Oe(0,(0,he.f)("baseURI")),Oe(1,(0,he.f)("hostname")),ke("design:paramtypes",[Function,Function])],Te);class Pe{_id;_rev;channelId;tokenId;title;link;description;content;contentHTML;excerpt;authorId;category;attributeSelections;coverImageId;coverImageAsAnimation;originalJSONMetadataId;animationId;datePublished;dateCreated;lastUpdated}var xe=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ce=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Ae=function(e,t){return function(a,n){t(a,n,e)}};let De=class{baseURI;hostname;static CHUNK_SIZE=10;changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["tokenId"]}})}}];db;dbName="items";databaseService;constructor(e,t){this.baseURI=e,this.hostname=t}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(e){return Object.assign(new Pe,await this.db.get(e))}async put(e){await this.db.put(e)}async list(e,t=10){return(await this.db.find({selector:{tokenId:{$exists:!0}},sort:[{tokenId:"asc"}],limit:t,skip:e})).docs}async getByTokenId(e){let t=await this.db.find({selector:{tokenId:{$eq:e}},limit:1});if(t.docs?.length>0)return t.docs[0]}async getByTokenIds(e){let t=await this.db.find({selector:{tokenId:{$in:e}}});return t.docs?.length>0?t.docs:[]}async getRowItemViewModelsByAttribute(e,t,a){const n=e=>e.replace(/[^a-z0-9]/gi,"_").toLowerCase();let i;return i=(await o.Z.get(`${this.hostname()}${this.baseURI()}attributes/items/${n(e)}/${n(t)}/${a}.json`)).data,i}async getRowItemViewModelsByOwner(e,t){let a;return a=(await o.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/${e}/tokens/${t}.json`)).data,a}async getRowItemViewModelsByTokenIds(e){let t=[];for(let a of e){const e=await o.Z.get(`${this.hostname()}${this.baseURI()}t/${a}/rowItemViewModel.json`);t.push(e.data)}return t}async getRowItemViewModelsByTokenId(e){return(await o.Z.get(`${this.hostname()}${this.baseURI()}t/${e}/rowItemViewModel.json`)).data}async listByTokenId(e,t){return(await this.db.find({selector:{tokenId:{$eq:e}},sort:[{tokenId:"desc"}],limit:t})).docs}async query(e){return(await this.db.search({query:e,fields:["contentHTML","title","tokenId"],include_docs:!0,highlighting:!0,limit:10})).rows.map((e=>(e.highlighting.contentHTML&&(e.doc.contentHTML=e.highlighting.contentHTML),e.doc.contentHTML=e.doc.contentHTML.replace(/<img .*?>/g,""),e.doc)))}async all(){return(await this.db.find({selector:{tokenId:{$exists:!0}},sort:[{tokenId:"asc"}],limit:1e5,skip:0})).docs}};xe([(0,he.f)("DatabaseService"),Ce("design:type",Ie)],De.prototype,"databaseService",void 0),De=xe([(0,ue.b)(),Ae(0,(0,he.f)("baseURI")),Ae(1,(0,he.f)("hostname")),Ce("design:paramtypes",[Function,Function])],De);class Me{_id;_rev;walletAddress;name;description;url;coverPhotoId;dateCreated;lastUpdated}var _e=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ue=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ve=class{db;dbName="authors";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(e){return Object.assign(new Me,await this.db.get(e))}};_e([(0,he.f)("DatabaseService"),Ue("design:type",Ie)],Ve.prototype,"databaseService",void 0),Ve=_e([(0,ue.b)(),Ue("design:paramtypes",[])],Ve);class Ne{tokenId;name;description;image;image_data;external_url;attributes;background_color;animation_url}var We=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ze=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Le=function(e,t){return function(a,n){t(a,n,e)}};let Be=class{baseURI;hostname;static CHUNK_SIZE=10;constructor(e,t){this.baseURI=e,this.hostname=t}async get(e){const t=await o.Z.get(`${this.hostname()}${this.baseURI()}backup/metadata/${e}.json`);return Object.assign(new Ne,t.data)}};Be=We([(0,ue.b)(),Le(0,(0,he.f)("baseURI")),Le(1,(0,he.f)("hostname")),Ze("design:paramtypes",[Function,Function])],Be);class Fe{_id;data;cid;buffer;svg;generated}var Ee=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},He=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let qe=class{db;dbName="images";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(e){return Object.assign(new Fe,await this.db.get(e))}async list(){}};Ee([(0,he.f)("DatabaseService"),He("design:type",Ie)],qe.prototype,"databaseService",void 0),qe=Ee([(0,ue.b)(),He("design:paramtypes",[])],qe);class Ge{_id;_rev;content;cid;dateCreated}var Je=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ze=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Qe=class{db;dbName="animations";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0})}constructor(){}async get(e){return Object.assign(new Ge,await this.db.get(e))}};Je([(0,he.f)("DatabaseService"),ze("design:type",Ie)],Qe.prototype,"databaseService",void 0),Qe=Je([(0,ue.b)(),ze("design:paramtypes",[])],Qe);class Ke{_id;_rev;channelId;name;slug;content;contentHTML;contentMarkdown;locations;dateCreated;lastUpdated}var Xe=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ye=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let et=class{changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["channelId"]}}),await e.createIndex({index:{fields:["dateCreated"]}})}}];db;dbName="static-pages";databaseService;constructor(){}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,changesets:this.changesets,initialRecords:!0})}async get(e){return Object.assign(new Ke,await this.db.get(e))}async listByLocation(e,t){return(await this.db.find({selector:{locations:{$all:[e]},dateCreated:{$exists:!0}},sort:[{dateCreated:"asc"}],skip:t})).docs}};Xe([(0,he.f)("DatabaseService"),Ye("design:type",Ie)],et.prototype,"databaseService",void 0),et=Xe([(0,ue.b)(),Ye("design:paramtypes",[])],et);var tt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},at=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},nt=function(e,t){return function(a,n){t(a,n,e)}};let it=class{baseURI;hostname;constructor(e,t){this.baseURI=e,this.hostname=t}async get(e){return(await o.Z.get(`${this.hostname()}${this.baseURI()}itemPages/${e}.json`)).data}};it=tt([(0,ue.b)(),nt(0,(0,he.f)("baseURI")),nt(1,(0,he.f)("hostname")),at("design:paramtypes",[Function,Function])],it);class rt{_id;traitType;value;count;categoryPercent;tokenIds}var ot=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},st=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ct=class{db;dbName="attribute-totals";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0,initialRecordsPath:"attributeTotals.json"})}constructor(){}async get(e){return Object.assign(new rt,await this.db.get(e))}async getByIds(e){let t=await this.db.allDocs({keys:e,include_docs:!0});return t.rows?.map((e=>e.doc))}async put(e){await this.db.put(e)}async list(e,t){return(await this.db.find({selector:{count:{$exists:!0}},limit:e,skip:t})).docs}};ot([(0,he.f)("DatabaseService"),st("design:type",Ie)],ct.prototype,"databaseService",void 0),ct=ot([(0,ue.b)(),st("design:paramtypes",[])],ct);var lt=a(5494),dt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},pt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class ft{_id;_rev;currentPage;lastPageJump;dateCreated;lastUpdated}dt([(0,lt.a)(),pt("design:type",String)],ft.prototype,"_id",void 0),dt([(0,lt.a)(),pt("design:type",String)],ft.prototype,"_rev",void 0),dt([(0,lt.a)(),pt("design:type",Number)],ft.prototype,"currentPage",void 0),dt([(0,lt.a)(),pt("design:type",Number)],ft.prototype,"lastPageJump",void 0),dt([(0,lt.a)(),pt("design:type",String)],ft.prototype,"dateCreated",void 0),dt([(0,lt.a)(),pt("design:type",String)],ft.prototype,"lastUpdated",void 0);var ut=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ht=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let gt=class{db;dbName="reader-settings";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1})}constructor(){}async put(e){e._id="reader-settings",await this.db.put(e)}async get(){let e;try{e=await this.db.get("reader-settings")}catch(e){}return e||(e=new ft,e._id="reader-settings"),Object.assign(new ft,e)}};ut([(0,he.f)("DatabaseService"),ht("design:type",Ie)],gt.prototype,"databaseService",void 0),gt=ut([(0,ue.b)(),ht("design:paramtypes",[])],gt);class yt{}var vt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},mt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let bt=class{baseURI;constructor(){}async get(e){try{let t=await o.Z.get(`${this.baseURI()}sync/tokens/${e}/token.json`);return Object.assign(new yt,t.data)}catch(e){}}};vt([(0,he.f)("baseURI"),mt("design:type",Function)],bt.prototype,"baseURI",void 0),bt=vt([(0,ue.b)(),mt("design:paramtypes",[])],bt);var wt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Rt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let $t=class{authorRepository;walletService;constructor(){}async get(e){return this.authorRepository.get(e)}getDisplayName(e){if(e)return e.name?e.name:this.walletService.truncateEthAddress(e._id)}};wt([(0,he.f)("AuthorRepository"),Rt("design:type",Object)],$t.prototype,"authorRepository",void 0),wt([(0,he.f)("WalletService"),Rt("design:type",Object)],$t.prototype,"walletService",void 0),$t=wt([(0,ue.b)(),Rt("design:paramtypes",[])],$t);var St=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},It=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let jt=class{channelRepository;constructor(){}async get(){return this.channelRepository.get()}};St([(0,he.f)("ChannelRepository"),It("design:type",Object)],jt.prototype,"channelRepository",void 0),jt=St([(0,ue.b)(),It("design:paramtypes",[])],jt);var kt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ot=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Tt=class{constructor(){}buildPagingViewModel(e,t,a,n){let i=new Pt;return i.offset=e||0,i.limit=t,i.count=a,i.start=i.offset+1,i.end=Math.min(i.offset+t,a),i.previousOffset=Math.max(i.offset-t,0),i.offset+t<a&&(i.nextOffset=i.offset+t),i.page=i.offset/i.limit+1,i.page>i.endPage&&(i.page=i.endPage),i.endPage=Math.ceil(i.count/i.limit),i.lastOffset=i.endPage*i.limit-i.limit,i.showNext=i.endPage>i.page,i.showPrevious=0!=i.offset,i.showFirst=i.page>2,i.showLast=i.page<i.endPage-1,i}calculateEndIndex(e,t,a){let n=t+e-1;return Math.min(a-1,n)}calculateDescendingEndIndex(e,t){let a=t-(e-1);return Math.max(0,a)}calculateDescendingOffset(e,t){let a=t-1-e;return Math.max(0,a)}};Tt=kt([(0,ue.b)(),Ot("design:paramtypes",[])],Tt);class Pt{page;pageNumbers;endPage;offset;limit;count;start;end;previousOffset;nextOffset;lastOffset;showPrevious;showNext;showFirst;showLast}var xt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ct=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let At=class{itemRepository;channelRepository;authorRepository;imageRepository;animationRepository;staticPageRepository;readerSettingsRepository;rowItemViewModelRepository;attributeTotalRepository;componentStateRepository;constructor(){}async load(e){const t=this.getRepositories();for(let a of e){let e=t.filter((e=>e.dbName==a))[0];await(e?.load())}}async reloadAll(){const e=this.getRepositories();for(let t of e)await t.load()}getRepositories(){const e=[];return e.push(this.itemRepository),e.push(this.channelRepository),e.push(this.authorRepository),e.push(this.imageRepository),e.push(this.animationRepository),e.push(this.staticPageRepository),e.push(this.readerSettingsRepository),e.push(this.staticPageRepository),e.push(this.readerSettingsRepository),e.push(this.attributeTotalRepository),e.push(this.componentStateRepository),e.push(this.rowItemViewModelRepository),e}async loadWallet(e){console.log(`Loading wallet: ${e}`)}};xt([(0,he.f)("ItemRepository"),Ct("design:type",Object)],At.prototype,"itemRepository",void 0),xt([(0,he.f)("ChannelRepository"),Ct("design:type",Object)],At.prototype,"channelRepository",void 0),xt([(0,he.f)("AuthorRepository"),Ct("design:type",Object)],At.prototype,"authorRepository",void 0),xt([(0,he.f)("ImageRepository"),Ct("design:type",Object)],At.prototype,"imageRepository",void 0),xt([(0,he.f)("AnimationRepository"),Ct("design:type",Object)],At.prototype,"animationRepository",void 0),xt([(0,he.f)("StaticPageRepository"),Ct("design:type",Object)],At.prototype,"staticPageRepository",void 0),xt([(0,he.f)("ReaderSettingsRepository"),Ct("design:type",Object)],At.prototype,"readerSettingsRepository",void 0),xt([(0,he.f)("RowItemViewModelRepository"),Ct("design:type",Object)],At.prototype,"rowItemViewModelRepository",void 0),xt([(0,he.f)("AttributeTotalRepository"),Ct("design:type",Object)],At.prototype,"attributeTotalRepository",void 0),xt([(0,he.f)("ComponentStateRepository"),Ct("design:type",Object)],At.prototype,"componentStateRepository",void 0),At=xt([(0,ue.b)(),Ct("design:paramtypes",[])],At);var Dt=a(2555),Mt=a.n(Dt),_t=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ut=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Vt=class{imageRepository;constructor(){}async get(e){return this.imageRepository.get(e)}async list(){return this.imageRepository.list()}async getUrl(e){return e.buffer||e.svg?e.buffer?this.bufferToDataURL("image/jpg",e.buffer):e.svg?this.getSVGURL(e):void 0:""}async getSVGURL(e){return e.svg?this.svgToDataURL(e.svg):""}svgToDataURL(e){return Mt()(e)}bufferToDataURL(e,t){return`data:${e};base64,${t.toString("base64")}`}};_t([(0,he.f)("ImageRepository"),Ut("design:type",Object)],Vt.prototype,"imageRepository",void 0),Vt=_t([(0,ue.b)(),Ut("design:paramtypes",[])],Vt);var Nt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Wt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Zt=class{staticPageRepository;constructor(){}async get(e){return this.staticPageRepository.get(e)}async listByLocation(e,t){return this.staticPageRepository.listByLocation(e,t)}async listRoutablePages(){let e=[];if(e=e.concat(await this.staticPageRepository.listByLocation("navbar",0)),e=e.concat(await this.staticPageRepository.listByLocation("links",0)),e=JSON.parse(JSON.stringify(e)),e?.length>0)for(let t of e)delete t?.content,delete t?.contentHTML,delete t?.contentMarkdown;return e}};Nt([(0,he.f)("StaticPageRepository"),Wt("design:type",Object)],Zt.prototype,"staticPageRepository",void 0),Zt=Nt([(0,ue.b)(),Wt("design:paramtypes",[])],Zt);var Lt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Bt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ft=class{channelService;authorService;imageService;pagingService;schemaService;walletService;staticPageService;loadedChannelData;constructor(){}async get(e){return this.getViewModel(await this.channelService.get(),e)}async getViewModel(e,t){let a,n;e.authorId&&(a=await this.authorService.get(e.authorId));let i=e.itemCount,r=this.pagingService.buildPagingViewModel(t,10,i,5),o=["navbar","links","index","none"],s={};for(let e of o)s[e]=await this.staticPageService.listByLocation(e,0);return e.coverImageId&&(n=await this.imageService.get(e.coverImageId)),{channelContractAbbrev:e.contractAddress?this.walletService.truncateEthAddress(e.contractAddress):void 0,channel:e,staticPagesViewModel:s,author:a,authorDisplayName:this.authorService.getDisplayName(a),itemCount:i,pagingViewModel:r,coverImage:n}}async loadChannel(e,t,a){globalThis.channelId=e,globalThis.baseURI=t,globalThis.hostname=a}async loadChannelData(e){e&&this.loadedChannelData!=e&&(await this.schemaService.reloadAll(),await this.schemaService.load(["component-state"])),this.loadedChannelData=e}};Lt([(0,he.f)("ChannelService"),Bt("design:type",jt)],Ft.prototype,"channelService",void 0),Lt([(0,he.f)("AuthorService"),Bt("design:type",$t)],Ft.prototype,"authorService",void 0),Lt([(0,he.f)("ImageService"),Bt("design:type",Vt)],Ft.prototype,"imageService",void 0),Lt([(0,he.f)("PagingService"),Bt("design:type",Tt)],Ft.prototype,"pagingService",void 0),Lt([(0,he.f)("SchemaService"),Bt("design:type",At)],Ft.prototype,"schemaService",void 0),Lt([(0,he.f)("WalletService"),Bt("design:type",Object)],Ft.prototype,"walletService",void 0),Lt([(0,he.f)("StaticPageService"),Bt("design:type",Zt)],Ft.prototype,"staticPageService",void 0),Ft=Lt([(0,ue.b)(),Bt("design:paramtypes",[])],Ft);var Et=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ht=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let qt=class{animationRepository;constructor(){}async get(e){return this.animationRepository.get(e)}};Et([(0,he.f)("AnimationRepository"),Ht("design:type",Object)],qt.prototype,"animationRepository",void 0),qt=Et([(0,ue.b)(),Ht("design:paramtypes",[])],qt);var Gt=a(8554),Jt=a(9810),zt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Qt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Kt=class{constructor(){}async translateContent(e){if(!e?.ops)return"";const t=new Gt.bc(e.ops,{});return t.renderCustomWith((function(e,t){if("divider"===e.insert.type)return"<hr />";if("ipfsimage"===e.insert.type){let t=`<img src="${e.insert.value.src}" `;return e.insert.value.width&&(t+=`width="${e.insert.value.width}" `),e.insert.value.height&&(t+=`height="${e.insert.value.height}" `),e.insert.value.style&&(t+=`style="${e.insert.value.style}"`),t+="/>",t}})),t.convert()}async generateMarkdown(e){return(0,Jt.deltaToMarkdown)(e)}};Kt=zt([(0,ue.b)(),Qt("design:paramtypes",[])],Kt);var Xt=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Yt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ea=class{attributeTotalRepository;constructor(){}async get(e){return this.attributeTotalRepository.get(e)}async put(e){return this.attributeTotalRepository.put(e)}async getByIds(e){return this.attributeTotalRepository.getByIds(e)}async list(){return this.attributeTotalRepository.list()}async buildAttributeTotals(e,t){let a=[],n=new Set(t.map((e=>e.attributeSelections.map((e=>`${e.traitType}:::${e.value}`)))).flat());for(let e of n){let t={_id:e,traitType:e.substring(0,e.indexOf(":::")),value:e.substring(e.indexOf(":::")+3,e.length),count:0,tokenIds:[]};a.push(t)}for(let e of t)for(let t of e.attributeSelections){let n=a.filter((e=>e.traitType==t.traitType&&e.value==t.value))[0];n.tokenIds.push(e.tokenId),n.count++}for(let t of a)t.categoryPercent=new Intl.NumberFormat("default",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(t.count/e.itemCount);return a.sort(((e,t)=>t.count-e.count)),a}};Xt([(0,he.f)("AttributeTotalRepository"),Yt("design:type",Object)],ea.prototype,"attributeTotalRepository",void 0),ea=Xt([(0,ue.b)(),Yt("design:paramtypes",[])],ea);var ta=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},aa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let na=class{itemRepository;rowItemViewModelRepository;attributeTotalService;constructor(){}async get(e){return this.itemRepository.get(e)}async list(e,t){return this.itemRepository.list(e,t)}async query(e){return this.itemRepository.query(e)}async all(){return this.itemRepository.all()}async getByTokenId(e){return this.itemRepository.getByTokenId(e)}async getByTokenIds(e){return this.itemRepository.getByTokenIds(e)}async getRowItemViewModelsByAttribute(e,t,a){return this.itemRepository.getRowItemViewModelsByAttribute(e,t,a)}async getRowItemViewModelsByOwner(e,t){return this.itemRepository.getRowItemViewModelsByOwner(e,t)}async getRowItemViewModelsByTokenIds(e){return this.itemRepository.getRowItemViewModelsByTokenIds(e)}async getRowItemViewModelsByTokenId(e){return this.itemRepository.getRowItemViewModelsByTokenId(e)}async listByTokenId(e,t=10){return this.itemRepository.listByTokenId(e,t)}async buildAttributeTotals(e){let t=await this.all();return this.attributeTotalService.buildAttributeTotals(e,t)}async searchTokenIds(e){return this.rowItemViewModelRepository.getByTokenIds(e)}};ta([(0,he.f)("ItemRepository"),aa("design:type",Object)],na.prototype,"itemRepository",void 0),ta([(0,he.f)("RowItemViewModelRepository"),aa("design:type",Object)],na.prototype,"rowItemViewModelRepository",void 0),ta([(0,he.f)("AttributeTotalService"),aa("design:type",ea)],na.prototype,"attributeTotalService",void 0),na=ta([(0,ue.b)(),aa("design:paramtypes",[])],na);var ia=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ra=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let oa=class{itemPageRepository;constructor(){}async get(e){return this.itemPageRepository.get(e)}};ia([(0,he.f)("ItemPageRepository"),ra("design:type",Object)],oa.prototype,"itemPageRepository",void 0),oa=ia([(0,ue.b)(),ra("design:paramtypes",[])],oa);var sa=a(3969),ca=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},la=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};const da=new sa.DOMParser;let pa=class{itemService;channelService;authorService;imageService;schemaService;quillService;animationService;itemPageService;attributeTotalService;allTokensCache;constructor(){}async get(e){let t=await this.itemService.get(e);const a=await this.channelService.get(),n=await this.attributeTotalService.list();return this.getViewModel(t,a,n)}async getByTokenId(e){return this.itemService.getByTokenId(e)}async getViewModel(e,t,a){let n,i,r,o,s=[];if(t.authorId&&(n=await this.authorService.get(t.authorId)),t.attributeOptions.length>0)for(let n of t.attributeOptions){let t=e?.attributeSelections?.filter((e=>n?.traitType==e?.traitType)),i=t?.length>0?t[0].value:void 0,r=a.filter((e=>e.traitType==n.traitType)),o=r?.filter((e=>e.value==i));s.push({id:n.id,traitType:n.traitType,values:n.values,value:i,attributeTotal:o?.length>0?o[0]:void 0})}if(e.coverImageId&&(i=await this.imageService.get(e.coverImageId)),e.animationId&&!e.coverImageAsAnimation){r=await this.animationService.get(e.animationId);let t=da.parseFromString(r.content,"text/html").getElementsByTagName("body")[0];o=c().unescape((new sa.B).serializeToString(t)),o="<div"+o.slice(5),o=o.substring(0,o.length-7)+"</div>"}if(e.content?.ops?.length>0){let t=[];for(let a of e.content.ops){if(a.insert&&a.insert.ipfsimage){let e=await this.imageService.get(a.insert.ipfsimage.cid);a.insert.ipfsimage.src=await this.imageService.getUrl(e)}t.push(a)}e.content.ops=t}return{item:e,animation:r,animationContentHTML:o,contentHTML:await this.quillService.translateContent(e.content),channel:t,author:n,authorDisplayName:this.authorService.getDisplayName(n),attributeSelections:s,coverImage:i}}async getMintViewModel(e,t){let a;return e.coverImageId&&(a=await this.imageService.get(e.coverImageId)),{item:e,animation:undefined,channel:t,author:undefined,attributeSelections:[],coverImage:a}}async getSearchViewModel(e,t){return{item:e,animation:undefined,channel:t,author:undefined,attributeSelections:[]}}async getExploreAttributeOptions(e){await this.schemaService.load(["channels","authors","attribute-totals"]);const t=await this.channelService.get();let a=await this.attributeTotalService.list(),n=t.attributeOptions,i=[];for(let t of n){let n=[];for(let i of t.values.sort()){let r=JSON.parse(JSON.stringify(e));delete r[t.traitType];let o=await this._paramsToFilteredIds(r,a),s=a.filter((e=>e.traitType==t.traitType&&e.value==i))[0];s&&n.push({value:i,count:s.tokenIds.filter((e=>o.includes(e))).length})}n.sort(((e,t)=>t.count-e.count));let r={id:t.id,traitType:t.traitType,values:n};i.push(r)}return i}async exploreList(e,t,a){if(await this.schemaService.load(["channels","authors","attribute-totals","row-item-view-models"]),e&&Object.keys(e)?.length>0)return this.exploreQuery(e,t,a);{let e=t/a,n=await this.itemPageService.get(e),i=await this.channelService.get();return{items:n.items,totalMatches:i.itemCount,limit:a,skip:t}}}async exploreQuery(e,t,a){await this.schemaService.load(["channels","authors","attribute-totals","row-item-view-models"]);let n=await this.attributeTotalService.list(),i=await this._paramsToFilteredIds(e,n),r=i.length;return i=i.slice(t,t+a),{items:await this.itemService.searchTokenIds(i),totalMatches:r,limit:a,skip:t}}async _paramsToFilteredIds(e,t){let a=[];for(let t of Object.keys(e))a.push(`${t}:::${e[t]}`);let n=t?.filter((e=>a?.includes(e._id)));return n?.length>0?n.map((e=>e.tokenIds)).reduce(((e,t)=>e.filter((e=>t.includes(e))))):(this.allTokensCache||(this.allTokensCache=Array.from(new Set(t.map((e=>e.tokenIds)).flat()))),this.allTokensCache)}async list(e,t){let a=[];const n=await this.channelService.get(),i=await this.itemService.buildAttributeTotals(n);let r=await this.itemService.list(e,t);for(let e of r)a.push(await this.getViewModel(e,n,i));return a}async mintList(e,t){let a=[];const n=await this.channelService.get();let i=await this.itemService.list(e,t);for(let e of i)a.push(await this.getMintViewModel(e,n));return a}async itemPage(e){return this.itemPageService.get(e)}async attributeItemPage(e,t,a){return this.itemService.getRowItemViewModelsByAttribute(e,t,a)}async ownerItemPage(e,t){return this.itemService.getRowItemViewModelsByOwner(e,t)}async query(e){await this.schemaService.load(["items","channels"]);let t=await this.itemService.query(e);const a=await this.channelService.get();let n=[];for(let e of t)n.push(await this.getSearchViewModel(e,a));return n}async buildItemPages(e,t){let a=[],n=[];for(let t of e){let e=t.item;n.push({_id:e._id,coverImageGenerated:!!t.coverImage.generated,coverImageId:t.coverImage._id,title:`${e.title?e.title:`#${e.tokenId}`}`,tokenId:e.tokenId})}for(let e=0;e<n.length;e+=t)a.push({items:n.slice(e,e+t)});return a}async buildAttributeTotals(e){return this.itemService.buildAttributeTotals(e)}async getRowItemViewModelsByTokenIds(e){return this.itemService.getRowItemViewModelsByTokenIds(e)}translateRowItemViewModel(e,t){return{_id:e._id,coverImageGenerated:!!t.generated,coverImageId:t._id,title:`${e.title?e.title:`#${e.tokenId}`}`,tokenId:e.tokenId}}};ca([(0,he.f)("ItemService"),la("design:type",na)],pa.prototype,"itemService",void 0),ca([(0,he.f)("ChannelService"),la("design:type",jt)],pa.prototype,"channelService",void 0),ca([(0,he.f)("AuthorService"),la("design:type",$t)],pa.prototype,"authorService",void 0),ca([(0,he.f)("ImageService"),la("design:type",Vt)],pa.prototype,"imageService",void 0),ca([(0,he.f)("SchemaService"),la("design:type",At)],pa.prototype,"schemaService",void 0),ca([(0,he.f)("QuillService"),la("design:type",Kt)],pa.prototype,"quillService",void 0),ca([(0,he.f)("AnimationService"),la("design:type",qt)],pa.prototype,"animationService",void 0),ca([(0,he.f)("ItemPageService"),la("design:type",oa)],pa.prototype,"itemPageService",void 0),ca([(0,he.f)("AttributeTotalService"),la("design:type",ea)],pa.prototype,"attributeTotalService",void 0),pa=ca([(0,ue.b)(),la("design:paramtypes",[])],pa);var fa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ua=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ha=class{authorService;constructor(){}async get(e){return this.getViewModel(await this.authorService.get(e))}async getViewModel(e){return{author:e,authorDisplayName:this.authorService.getDisplayName(e)}}};fa([(0,he.f)("AuthorService"),ua("design:type",$t)],ha.prototype,"authorService",void 0),ha=fa([(0,ue.b)(),ua("design:paramtypes",[])],ha);var ga=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},ya=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let va=class{metadataRepository;walletService;mintEventListenerAdded=!1;constructor(){}lastMintedTokenId=0;async getBalance(e){if(!e)return 0;let t=await this.getChannelContract();return parseInt(await t.balanceOf(e))}async getMetadata(e){return this.metadataRepository.get(e)}async mint(e,t){let a=await this.getChannelContract();return(await a.mint(e,{value:t})).wait()}async mintFromStartOrFail(e,t,a){let n=await this.getChannelContract();return(await n.mintFromStartOrFail(e,t,{value:a})).wait()}async mintAsOwner(e){let t=await this.getChannelContract();return(await t.mint(e,{})).wait()}async ownerOf(e){return(await this.getChannelContract()).ownerOf(e)}async getTotalMinted(){return(await this.getChannelContract()).totalMinted()}async getTotalSupply(){return(await this.getChannelContract()).totalSupply()}async owner(){return(await this.getChannelContract()).owner()}async getChannelContract(){return await this.walletService.getContract("Channel")}};ga([(0,he.f)("MetadataRepository"),ya("design:type",Object)],va.prototype,"metadataRepository",void 0),ga([(0,he.f)("WalletService"),ya("design:type",Object)],va.prototype,"walletService",void 0),va=ga([(0,ue.b)(),ya("design:paramtypes",[])],va);var ma=a(9380),ba=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},wa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ra=class{tokenContractService;channelService;itemService;schemaService;walletService;constructor(){}async getMintingViewModel(){await this.schemaService.load(["channels","items"]);let e=await this.channelService.get();if(e.contractAddress){let t=await this.tokenContractService.getTotalMinted(),a=[];if(Number(t)>0){let e=await this.itemService.listByTokenId(Number(t));for(let t of e)try{let e=await this.tokenContractService.ownerOf(t.tokenId);a.push({owner:await this.walletService.truncateEthAddress(e),item:t})}catch(e){}}return{totalMinted:Number(t),totalSupply:e.itemCount,mintPrice:e.mintPrice,lastMinted:a,minting:Number(t)<e.itemCount}}}async getHomeMintingViewModel(){await this.schemaService.load(["channels"]);let e=await this.channelService.get();if(e.contractAddress){let t=await this.tokenContractService.getTotalMinted();return{totalMinted:Number(t),totalSupply:e.itemCount,mintPrice:e.mintPrice}}}async mint(e){await this.schemaService.load(["channels"]);let t=await this.channelService.get(),a=await this.calculateTotalMint(t,e),n=await this.tokenContractService.owner();return this.walletService.address.toLowerCase()==n.toLowerCase()?(console.log("Minting as owner"),this.tokenContractService.mintAsOwner(e)):this.tokenContractService.mint(e,a)}async mintFromStartOrFail(e,t){await this.schemaService.load(["channels"]);let a=await this.channelService.get(),n=await this.calculateTotalMint(a,e);return this.tokenContractService.mintFromStartOrFail(e,t,n)}async calculateTotalMint(e,t){let a=(0,ma.vz)(e.mintPrice,"ether");return(Number(a)*t).toString()}async updateTotal(e,t){return(0,ma.bM)(Number(e)*t)}async parseUnits(e){return(0,ma.vz)(e,"ether")}};ba([(0,he.f)("TokenContractService"),wa("design:type",va)],Ra.prototype,"tokenContractService",void 0),ba([(0,he.f)("ChannelService"),wa("design:type",jt)],Ra.prototype,"channelService",void 0),ba([(0,he.f)("ItemService"),wa("design:type",na)],Ra.prototype,"itemService",void 0),ba([(0,he.f)("SchemaService"),wa("design:type",At)],Ra.prototype,"schemaService",void 0),ba([(0,he.f)("WalletService"),wa("design:type",Object)],Ra.prototype,"walletService",void 0),Ra=ba([(0,ue.b)(),wa("design:paramtypes",[])],Ra);var $a=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Sa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Ia=function(e,t){return function(a,n){t(a,n,e)}};let ja=class{app;constructor(e){this.app=e}async queuePromiseView(e){const t=this;let a={id:ka.newGuid(),icon:e.icon,title:e.title};return async function(){return new Promise(((e,n)=>{t._beforeSaveAction(a),e()}))}().then((async function(){let n=await e.promise;try{t._showSuccess(n,a)}catch(e){t._showError(e,a)}return n}))}_beforeSaveAction(e){e.toast=this.app.toast.create({text:e.title,closeButton:!0}),e.toast.open()}_showError(e,t){t.toast.close(),console.log(e);let a={text:e.message,closeButton:!0,closeButtonText:"Close",closeTimeout:5e3};this.app.toast.create(a).open()}_showSuccess(e,t){t.toast.close();this.app.toast.create({text:"Transaction Submitted",closeButton:!0,closeTimeout:5e3}).open()}};ja=$a([(0,ue.b)(),Ia(0,(0,he.f)("framework7")),Sa("design:paramtypes",[Object])],ja);class ka{static newGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}}var Oa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ta=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},Pa=function(e,t){return function(a,n){t(a,n,e)}};let xa=class{app;constructor(e){this.app=e}showExceptionPopup(e){console.log(e),this.app.dialog.alert(e.message,"There was an error")}showPopup(e){this.app.dialog.alert(e)}showAlert(e){this.app.dialog.alert(e)}spinnerDialog;showSpinner(e){this.spinnerDialog&&this.hideSpinner(),this.spinnerDialog=this.app.dialog.preloader(e||"Loading")}hideSpinner(){this.spinnerDialog&&(this.spinnerDialog.close(),this.spinnerDialog=null)}progressDialog;showProgress(e){this.progressDialog&&this.hideProgress();this.progressDialog=this.app.dialog.progress(e||"Loading",0)}setProgress(e,t){this.progressDialog&&(this.progressDialog.setProgress(e),this.progressDialog.setText(t))}hideProgress(){this.progressDialog&&(this.progressDialog.close(),this.progressDialog=null)}};xa=Oa([(0,ue.b)(),Pa(0,(0,he.f)("framework7")),Ta("design:paramtypes",[Object])],xa);class Ca extends Error{errors;constructor(e){super(),this.errors=e}}var Aa=a(7743),Da=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ma=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let _a=class{readerSettingsRepository;schemaService;constructor(){}async get(){return await this.schemaService.load(["reader-settings"]),this.readerSettingsRepository.get()}async put(e){e.lastUpdated=(new Date).toJSON();let t=await(0,Aa.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new Ca(t);await this.readerSettingsRepository.put(e)}async updateCurrentPage(e){let t=await this.get();t.currentPage=e,await this.put(t)}};Da([(0,he.f)("ReaderSettingsRepository"),Ma("design:type",Object)],_a.prototype,"readerSettingsRepository",void 0),Da([(0,he.f)("SchemaService"),Ma("design:type",At)],_a.prototype,"schemaService",void 0),_a=Da([(0,ue.b)(),Ma("design:paramtypes",[])],_a);class Ua{_id;_rev;removed;address;data;topics;logIndex;args;event;eventSignature;isTransfer;isMint;isBurn;namedArgs;lastUpdated;dateCreated}var Va=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Na=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Wa=class{constructor(){}async translateEventToERCEvent(e){let t=new Ua;switch(t.removed=e.removed,t.address=e.address,t.data=e.data,t.topics=e.topics,t.logIndex=e.index,t.event=e.fragment?.name,t.eventSignature=e.eventSignature,t.dateCreated=(new Date).toJSON(),t.args=e.args?.map((e=>e.toString())),t.namedArgs={},t.event){case"Transfer":t.isTransfer=!0,t.namedArgs.fromAddress=t.args[0],t.namedArgs.toAddress=t.args[1],t.namedArgs.tokenId=t.args[2];break;case"Approval":t.namedArgs.owner=t.args[0],t.namedArgs.approved=t.args[1],t.namedArgs.tokenId=t.args[2];break;case"ApprovalForAll":t.namedArgs.owner=t.args[0],t.namedArgs.operator=t.args[1],t.namedArgs.approved=t.args[2]}return t.isTransfer&&"0x0000000000000000000000000000000000000000"==t.namedArgs?.fromAddress&&(t.isMint=!0),t.isTransfer&&"0x0000000000000000000000000000000000000000"==t.namedArgs?.toAddress&&(t.isBurn=!0),t}};Wa=Va([(0,ue.b)(),Na("design:paramtypes",[])],Wa);var Za=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},La=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ba=class{componentStateRepository;constructor(){}async get(e){return this.componentStateRepository.get(e)}async put(e){e.dateCreated||(e.dateCreated=(new Date).toJSON()),e.lastUpdated=(new Date).toJSON();let t=await(0,Aa.GuS)(e,{forbidUnknownValues:!0,whitelist:!0});if(t.length>0)throw new Ca(t);return this.componentStateRepository.put(e)}};Za([(0,he.f)("ComponentStateRepository"),La("design:type",Object)],Ba.prototype,"componentStateRepository",void 0),Ba=Za([(0,ue.b)(),La("design:paramtypes",[])],Ba);var Fa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ea=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};class Ha{_id;_rev;data;dateCreated;lastUpdated}Fa([(0,lt.a)(),Ea("design:type",String)],Ha.prototype,"_id",void 0),Fa([(0,lt.a)(),Ea("design:type",String)],Ha.prototype,"_rev",void 0),Fa([(0,lt.a)(),Ea("design:type",Object)],Ha.prototype,"data",void 0),Fa([(0,lt.a)(),Ea("design:type",String)],Ha.prototype,"dateCreated",void 0),Fa([(0,lt.a)(),Ea("design:type",String)],Ha.prototype,"lastUpdated",void 0);var qa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ga=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ja=class{db;dbName="component-state";databaseService;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1})}constructor(){}async get(e){return Object.assign(new Ha,await this.db.get(e))}async put(e){await this.db.put(e)}};qa([(0,he.f)("DatabaseService"),Ga("design:type",Ie)],Ja.prototype,"databaseService",void 0),Ja=qa([(0,ue.b)(),Ga("design:paramtypes",[])],Ja);var za=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Qa=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ka=class{tokenOwnerPageRepository;constructor(){}async getHome(){return this.tokenOwnerPageRepository.getHome()}async get(e){return this.tokenOwnerPageRepository.get(e)}async getTotals(){return this.tokenOwnerPageRepository.getTotals()}};za([(0,he.f)("TokenOwnerPageRepository"),Qa("design:type",Object)],Ka.prototype,"tokenOwnerPageRepository",void 0),Ka=za([(0,ue.b)(),Qa("design:paramtypes",[])],Ka);var Xa=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},Ya=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},en=function(e,t){return function(a,n){t(a,n,e)}};let tn=class{baseURI;hostname;constructor(e,t){this.baseURI=e,this.hostname=t}async getHome(){return(await o.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/home.json`)).data}async getTotals(){return(await o.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/total.json`)).data}async get(e){return(await o.Z.get(`${this.hostname()}${this.baseURI()}sync/tokenOwner/pages/${e}.json`)).data}};tn=Xa([(0,ue.b)(),en(0,(0,he.f)("baseURI")),en(1,(0,he.f)("hostname")),Ya("design:paramtypes",[Function,Function])],tn);var an=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},nn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let rn=class{processedTransactionRepository;itemService;constructor(){}async get(e){return this.processedTransactionRepository.get(e)}async getRowItemViewModels(e){let t={},a=new Set;for(let t of e)t.tokenId&&a.add(t.tokenId);let n=await this.itemService.getRowItemViewModelsByTokenIds(Array.from(a));for(let e of n)t[e.tokenId]=e;return t}async translateSalesToViewModels(e){let t=[];for(let a of e)t.push({sale:a,item:await this.itemService.getRowItemViewModelsByTokenId(a.tokenId)});return t}async getSalesReport(){return this.processedTransactionRepository.getSalesReport()}async getAttributeSalesReport(e,t){return this.processedTransactionRepository.getAttributeSalesReport(e,t)}async getAttributesOverall(){return this.processedTransactionRepository.getAttributesOverall()}async getLargestSales(e){return this.processedTransactionRepository.getLargestSales(e)}};an([(0,he.f)("ProcessedTransactionRepository"),nn("design:type",Object)],rn.prototype,"processedTransactionRepository",void 0),an([(0,he.f)("ItemService"),nn("design:type",na)],rn.prototype,"itemService",void 0),rn=an([(0,ue.b)(),nn("design:paramtypes",[])],rn);var on=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},sn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},cn=function(e,t){return function(a,n){t(a,n,e)}};let ln=class{baseURI;processedTransactionService;constructor(e){this.baseURI=e}async getHomeViewModel(){return(await o.Z.get(`${this.baseURI()}sync/home.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async list(e){let t=await this.getLatest(),a=(await o.Z.get(`${this.baseURI()}sync/transactions/activity/${e}.json`)).data;return a.lastUpdated=t.lastUpdated,a}async listByAddress(e,t){let a=(await o.Z.get(`${this.baseURI()}sync/tokenOwner/${e}/activity/${t}.json`)).data,n=await this.getLatest();return a.lastUpdated=n.lastUpdated,a}async getLatest(){return(await o.Z.get(`${this.baseURI()}sync/transactions/latest.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async getRecentActivity(){return(await o.Z.get(`${this.baseURI()}sync/transactions/recentActivity.json`,{headers:{"Cache-Control":"no-cache",Pragma:"no-cache",Expires:"0"}})).data}async getSalesReport(){return this.processedTransactionService.getSalesReport()}async getAttributeSalesReport(e,t){return this.processedTransactionService.getAttributeSalesReport(e,t)}async getAttributesOverall(){return this.processedTransactionService.getAttributesOverall()}async getLargestSales(e){return await this.processedTransactionService.getLargestSales(e)}abbreviateDollars(e,t){if(!e)return"$0";var a=Math.log10(Math.abs(e))/3|0;if(0==a||1==a){return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(e)}var n=["","","M","G","T","P","E"][a],i=e/Math.pow(10,3*a);return new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}).format(i)+n}};on([(0,he.f)("ProcessedTransactionService"),sn("design:type",rn)],ln.prototype,"processedTransactionService",void 0),ln=on([(0,ue.b)(),cn(0,(0,he.f)("baseURI")),sn("design:paramtypes",[Function])],ln);var dn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},pn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let fn=class{baseURI;async get(e){let t;try{t=(await o.Z.get(`${this.baseURI()}sync/transactions/${e}.json`)).data}catch(e){console.log(e)}return t}async getSalesReport(){let e;try{e=(await o.Z.get(`${this.baseURI()}sync/sales/overall.json`)).data}catch(e){console.log(e)}return e}async getAttributeSalesReport(e,t){let a;try{a=(await o.Z.get(`${this.baseURI()}sync/attributes/${this.attributeKeyToInteger(`${e}::::${t}`)}/attribute.json`)).data}catch(e){console.log(e)}return a}async getAttributesOverall(){let e;try{e=(await o.Z.get(`${this.baseURI()}sync/attributes/totals.json`)).data}catch(e){console.log(e)}return e}attributeKeyToInteger(e){let t,a,n=0;if(0===e.length)return n;for(t=0;t<e.length;t++)a=e.charCodeAt(t),n=(n<<5)-n+a,n|=0;return n}async getLargestSales(e){let t;try{t=(await o.Z.get(`${this.baseURI()}sync/sales/largest-${e}.json`)).data}catch(e){console.log(e)}return t}};dn([(0,he.f)("baseURI"),pn("design:type",Function)],fn.prototype,"baseURI",void 0),fn=dn([(0,ue.b)()],fn);class un{}var hn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},gn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let yn=class{walletService;tokenOwnerRepository;constructor(){}async get(e){return this.tokenOwnerRepository.get(e)}async getDisplayName(e){if(!e)return;let t=await this.tokenOwnerRepository.getENS(e);return t||this.walletService.truncateEthAddress(e)}async getOrCreate(e){let t;if(!t)try{t=await this.get(e)}catch(e){}return t||(t=new un,t._id=e,t.tokenIds=[],t.count=0),t}async put(e){return this.tokenOwnerRepository.put(e)}async putAll(e){return e.forEach((e=>{e._id||(e.dateCreated=(new Date).toJSON()),e.lastUpdated=(new Date).toJSON()})),this.tokenOwnerRepository.putAll(e)}async list(e,t){return this.tokenOwnerRepository.list(e,t)}};hn([(0,he.f)("WalletService"),gn("design:type",Object)],yn.prototype,"walletService",void 0),hn([(0,he.f)("TokenOwnerRepository"),gn("design:type",Object)],yn.prototype,"tokenOwnerRepository",void 0),yn=hn([(0,ue.b)(),gn("design:paramtypes",[])],yn);let vn=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["count"]}}),await e.put({_id:"_design/by_token_id",views:{by_token_id:{map:function(e){for(let t of e.tokenIds)emit(t)}.toString()}}})}}];var mn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},bn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let wn=class{db;dbName="token-owners";databaseService;baseURI;async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!1,changesets:vn})}constructor(){}async getENS(e){let t;try{let a=await o.Z.get(`${this.baseURI()}sync/tokenOwner/${e}/ens.json`);t=a.data?.name}catch(e){}return t}async get(e){try{let t=await o.Z.get(`${this.baseURI()}sync/tokenOwner/${e}/tokenOwner.json`);return Object.assign(new un,t.data)}catch(e){console.log(e)}}async put(e){}async putAll(e){}async list(e,t){}};mn([(0,he.f)("DatabaseService"),bn("design:type",Ie)],wn.prototype,"databaseService",void 0),mn([(0,he.f)("baseURI"),bn("design:type",Function)],wn.prototype,"baseURI",void 0),wn=mn([(0,ue.b)(),bn("design:paramtypes",[])],wn);var Rn=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},$n=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Sn=class{tokenRepository;constructor(){}async get(e){return this.tokenRepository.get(e)}};Rn([(0,he.f)("TokenRepository"),$n("design:type",Object)],Sn.prototype,"tokenRepository",void 0),Sn=Rn([(0,ue.b)(),$n("design:paramtypes",[])],Sn);var In=function(e,t,a,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(t,a,o):i(t,a))||o);return r>3&&o&&Object.defineProperty(t,a,o),o},jn=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let kn,On=class{changesets=[{id:"0",changeset:async e=>{await e.createIndex({index:{fields:["tokenId"]}})}}];db;dbName="row-item-view-models";databaseService;constructor(){}async load(){this.db=await this.databaseService.getDatabase({name:this.dbName,initialRecords:!0,initialRecordsPath:"t/all.json",changesets:this.changesets})}async get(e){return this.db.get(e)}async put(e){await this.db.put(e)}async getByTokenIds(e){let t=await this.db.find({selector:{tokenId:{$in:e}}});return t.docs?.length>0?t.docs:[]}};async function Tn(e,t,a,n,i,s){if(kn)return kn;return kn=e,globalThis.baseURI=t,globalThis.hostname=a,globalThis.channelId=s,kn.bind("framework7").toConstantValue((r.ZP.registerComponent("nav-bar",M),r.ZP.registerComponent("token-toolbar",U),r.ZP.registerComponent("attribute-filter",H),r.ZP.registerComponent("explore-total-info",G),r.ZP.registerComponent("mint-info",z),r.ZP.registerComponent("largest-sales",K),r.ZP.registerComponent("transaction-viewer",N),r.ZP.registerComponent("transaction-row",oe),r.ZP.registerComponent("leaderboard-rows",ce),r.ZP.registerComponent("search-list",de),r.ZP.registerComponent("infinite-scroll-content",fe),globalThis.app=new r.ZP({el:"#app",id:"large-reader",name:"Large Reader",theme:"auto",init:!1,view:{browserHistory:!0,browserHistorySeparator:"",browserHistoryOnLoad:!1,browserHistoryInitialMatch:!1},navbar:{hideOnPageScroll:!0},toolbar:{hideOnPageScroll:!0},routes:i}),globalThis.app)),kn.bind("version").toConstantValue(n),kn.bind("PouchDB").toConstantValue((async()=>d.Z)),kn.bind("provider").toConstantValue((async()=>{if("undefined"!=typeof window&&window.ethereum)return window.web3Provider=window.ethereum,new l.Q(window.ethereum)})),kn.bind("contracts").toConstantValue((async()=>{let e,t,a=await o.Z.get(`${globalThis.hostname}${globalThis.baseURI}backup/contract/contract.json`,{responseType:"json"}),n=await o.Z.get(`${globalThis.hostname}${globalThis.baseURI}backup/contract/contract-abi.json`,{responseType:"json"});return 200===a.status&&(e=a.data),200===a.status&&(t=n.data),e.contractAddress?(t.Channel.address=e.contractAddress,t):[]})),kn.bind("baseURI").toConstantValue((()=>globalThis.baseURI)),kn.bind("hostname").toConstantValue((()=>globalThis.hostname)),kn.bind("channelId").toConstantValue((()=>globalThis.channelId)),kn.bind("WalletService").to(we).inSingletonScope(),kn.bind("ChannelRepository").to(Te).inSingletonScope(),kn.bind("ItemRepository").to(De).inSingletonScope(),kn.bind("AuthorRepository").to(Ve).inSingletonScope(),kn.bind("MetadataRepository").to(Be).inSingletonScope(),kn.bind("ImageRepository").to(qe).inSingletonScope(),kn.bind("AnimationRepository").to(Qe).inSingletonScope(),kn.bind("StaticPageRepository").to(et).inSingletonScope(),kn.bind("ItemPageRepository").to(it).inSingletonScope(),kn.bind("TokenOwnerPageRepository").to(tn).inSingletonScope(),kn.bind("AttributeTotalRepository").to(ct).inSingletonScope(),kn.bind("ReaderSettingsRepository").to(gt).inSingletonScope(),kn.bind("ContractStateRepository").to({}).inSingletonScope(),kn.bind("ComponentStateRepository").to(Ja).inSingletonScope(),kn.bind("TokenOwnerRepository").to(wn).inSingletonScope(),kn.bind("TokenRepository").to(bt).inSingletonScope(),kn.bind("ProcessedTransactionRepository").to(fn).inSingletonScope(),kn.bind("RowItemViewModelRepository").to(On).inSingletonScope(),kn.bind("ChannelWebService").to(Ft).inSingletonScope(),kn.bind("ItemWebService").to(pa).inSingletonScope(),kn.bind("AuthorWebService").to(ha).inSingletonScope(),kn.bind("MintWebService").to(Ra).inSingletonScope(),kn.bind("StaticPageService").to(Zt).inSingletonScope(),kn.bind("ItemPageService").to(oa).inSingletonScope(),kn.bind("QueueService").to(ja).inSingletonScope(),kn.bind("TransactionWebService").to(ln).inSingletonScope(),kn.bind("PagingService").to(Tt).inSingletonScope(),kn.bind("DatabaseService").to(Ie).inSingletonScope(),kn.bind("AnimationService").to(qt).inSingletonScope(),kn.bind("UiService").to(xa).inSingletonScope(),kn.bind("ItemService").to(na).inSingletonScope(),kn.bind("ImageService").to(Vt).inSingletonScope(),kn.bind("ChannelService").to(jt).inSingletonScope(),kn.bind("AuthorService").to($t).inSingletonScope(),kn.bind("TokenContractService").to(va).inSingletonScope(),kn.bind("SchemaService").to(At).inSingletonScope(),kn.bind("QuillService").to(Kt).inSingletonScope(),kn.bind("AttributeTotalService").to(ea).inSingletonScope(),kn.bind("ComponentStateService").to(Ba).inSingletonScope(),kn.bind("ReaderSettingsService").to(_a).inSingletonScope(),kn.bind("ERCEventService").to(Wa).inSingletonScope(),kn.bind("GenerateService").to({}).inSingletonScope(),kn.bind("TokenOwnerService").to(yn).inSingletonScope(),kn.bind("TokenService").to(Sn).inSingletonScope(),kn.bind("TokenOwnerPageService").to(Ka).inSingletonScope(),kn.bind("ProcessedTransactionService").to(rn).inSingletonScope(),globalThis.container=kn,globalThis.he=c(),globalThis.dayjs=u(),globalThis.ComponentState=Ha,kn}In([(0,he.f)("DatabaseService"),jn("design:type",Ie)],On.prototype,"databaseService",void 0),On=In([(0,ue.b)(),jn("design:paramtypes",[])],On),d.Z.plugin(p.Z),u().extend(g()),u().extend(v()),r.ZP.use([m.Z,b.Z,w.Z,R.Z,$.Z,k.Z,O.Z,T.Z,P.Z,S.Z,I.Z,x.Z,j.Z,C.Z,A.Z]);class Pn{static async resolveWithSpinner(e,t,a){globalThis.app&&(globalThis.app.preloader.show(),e({componentUrl:t,options:a}),globalThis.app.preloader.hide())}static getReaderRoutes(e){const t=[];let a=`${e}partial/`;return"/"!=e&&e.endsWith("/")&&t.push({path:`${e.substring(0,e.length-1)}`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}index.html`)}}),Pn.addSharedRoutes(t,e),t.push({path:"(.*)",async async({resolve:e,reject:t,to:n}){console.log(`404 error: ${n.path}`),await Pn.resolveWithSpinner(e,`${a}404.html`)}}),t}static getLibraryRoutes(e){let t=`${e}/partial`;const a=[{path:`${e}`,async async({resolve:e,reject:a,to:n}){await Pn.resolveWithSpinner(e,`${t}/index.html`)}},{path:`${e}/`,async async({resolve:e,reject:a,to:n}){await Pn.resolveWithSpinner(e,`${t}/index.html`)}},{path:`${e}/index.html`,async async({resolve:e,reject:a,to:n}){await Pn.resolveWithSpinner(e,`${t}/index.html`)}}];return Pn.addSharedRoutes(a,"/r/:reader_slug/"),a.push({path:"(.*)",async async({resolve:e,reject:a,to:n}){console.log(`404 error: ${n.path}`),await Pn.resolveWithSpinner(e,`${t}/404.html`)}}),a}static addSharedRoutes(e,t){let a;a=t.indexOf(":reader_slug")>0?t.replace(":reader_slug","{{reader_slug}}"):t,a+="partial/",e.push({path:`${t}`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}index.html`)}},{path:`${t}index.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}index.html`)}},{path:`${t}mint.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}mint.html`)}},{path:`${t}search.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}search.html`)}},{path:`${t}explore.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}explore.html`)}},{path:`${t}activity`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}activity/index.html`)}},{path:`${t}activity/index.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}activity/index.html`)}},{path:`${t}leaderboard`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}leaderboard/index.html`)}},{path:`${t}leaderboard/index.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}leaderboard/index.html`)}},{path:`${t}sales`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}sales/index.html`)}},{path:`${t}sales/index.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}sales/index.html`)}},{path:`${t}attributes`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}attributes/index.html`)}},{path:`${t}attributes/index.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}attributes/index.html`)}},{path:`${t}attribute`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}attribute/index.html`)}},{path:`${t}attribute/index.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}attribute/index.html`)}},{path:`${t}u`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}u/index.html`)}},{path:`${t}u/index.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}u/index.html`)}},{path:`${t}u/activity`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}u/activity/index.html`)}},{path:`${t}u/activity/index.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}u/activity/index.html`)}},{path:`${t}list-:page.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}list-{{page}}.html`)}},{path:`${t}t/:tokenId`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}t/{{tokenId}}/index.html`,{force:!0})}},{path:`${t}t/:tokenId/index.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}t/{{tokenId}}/index.html`,{force:!0})}},{path:`${t}s/:slug.html`,async async({resolve:e,reject:t,to:n}){await Pn.resolveWithSpinner(e,`${a}s/{{slug}}.html`)}})}}let xn=async(e,t,a,r)=>{if(console.log("Initializing Reader"),"serviceWorker"in navigator){const o=new n.ZW(`${t}${e}sw-${a}.js?baseURI=${e}`,{scope:`${t}${e}`});let s=new i.W,c=Pn.getReaderRoutes(e);s=await Tn(s,e,t,a,c,r),navigator.serviceWorker.controller?Cn(s,t):o.addEventListener("controlling",(e=>{Cn(s,t)})),o.register()}},Cn=async(e,t)=>{let a=e.get("framework7"),n=window.location.toString().replace(`${t}`,"");a.views.create(".view-main",{url:n}).on("init",(async e=>{console.log(`Navigating to ${n}`),e.router.navigate(n,{reloadCurrent:!0,animate:!1})})),a.init()}},5525:()=>{}},e=>{e.O(0,[216],(()=>{return t=185,e(e.s=t);var t}));var t=e.O();reader=t}]);
//# sourceMappingURL=main.reader.js.map