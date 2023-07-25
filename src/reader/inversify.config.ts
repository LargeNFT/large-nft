import { Container } from "inversify";
import { ethers } from "ethers"
import Framework7 from 'framework7';

import axios from "axios"


import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime.js'
dayjs.extend(relativeTime)


import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find'
import PouchQuickSearch from 'pouchdb-quick-search'

//Enable find plugin
PouchDB.plugin(PouchFind)

//Enable quicksearch
PouchDB.plugin(PouchQuickSearch)


// Import additional components
import Dialog from 'framework7/components/dialog';
import Toast from 'framework7/components/toast';
import Preloader from 'framework7/components/preloader';
import VirtualList from 'framework7/components/virtual-list'
import ListIndex from 'framework7/components/list-index'
import Range from 'framework7/components/range'
import Accordion from 'framework7/components/accordion'
// import Autocomplete from 'framework7/components/autocomplete'
// import PhotoBrowser from 'framework7/components/photo-browser'
// import Swiper from 'framework7/components/swiper'
import InfiniteScroll from 'framework7/components/infinite-scroll'
import Card from 'framework7/components/card'
import Chip from 'framework7/components/chip'
import Form from 'framework7/components/form'
import Grid from 'framework7/components/grid'
// import Searchbar from 'framework7/components/searchbar'
import Popup from 'framework7/components/popup'
import Panel from 'framework7/components/panel'
import Popover from 'framework7/components/popover'
import Stepper from 'framework7/components/stepper'




// Install F7 Components using .use() method on Framework7 class:
Framework7.use([Dialog, Toast, Preloader, VirtualList, ListIndex, Card, Chip, Form, Grid, 
  Range, Accordion, Popup, InfiniteScroll, Panel, Popover, Stepper])




import Navbar from './components/reader/navbar.f7.html'

import TokenToolbar from './components/reader/token-toolbar.f7.html'
import Transaction from './components/reader/transaction.f7.html'

// import NftInfo from './components/reader/item/nft-info.f7.html'
import MintList from './components/reader/item/mint-list.f7.html'

import AttributeFilter from './components/reader/channel/attribute-filter.f7.html'
import ExploreTotalInfo from './components/reader/channel/explore-total-info.f7.html'

import MintInfo from './components/reader/channel/mint-info.f7.html'
import LargestSales from './components/reader/channel/largest-sales.f7.html'

import TransactionRow from './components/reader/channel/transaction-row.f7.html'
import LeaderboardRows from './components/reader/channel/leaderboard-rows.f7.html'



import SearchList from './components/reader/item/search-list.f7.html'
import InfiniteScrollContent from './components/reader/item/infinite-scroll-content.f7.html'

import he from 'he'

import { WalletService } from "./service/core/wallet-service.js";
import { WalletServiceImpl } from "./service/core/wallet-service-impl.js";
import { ChannelRepository } from "./repository/channel-repository.js";
import { TokenRepository } from "./repository/token-repository.js";

import { ItemRepository } from "./repository/item-repository.js";
import { AuthorRepository } from "./repository/author-repository.js";
import { MetadataRepository } from "./repository/metadata-repository.js";
import { ImageRepository } from "./repository/image-repository.js";
import { AnimationRepository } from "./repository/animation-repository.js";
import { StaticPageRepository } from "./repository/static-page-repository.js";
import { ItemPageRepository } from "./repository/item-page-repository.js";
import { AttributeTotalRepository } from "./repository/attribute-total-repository.js";
import { ReaderSettingsRepository } from "./repository/reader-settings-repository.js";
import { ChannelRepositoryBrowserImpl } from "./repository/browser/channel-repository-impl.js";
import { ItemRepositoryBrowserImpl } from "./repository/browser/item-repository-impl.js";
import { AuthorRepositoryBrowserImpl } from "./repository/browser/author-repository-impl.js";
import { MetadataRepositoryBrowserImpl } from "./repository/browser/metadata-repository-impl.js";
import { ImageRepositoryBrowserImpl } from "./repository/browser/image-repository-impl.js";
import { AnimationRepositoryBrowserImpl } from "./repository/browser/animation-repository-impl.js";
import { StaticPageRepositoryBrowserImpl } from "./repository/browser/static-page-repository-impl.js";
import { ItemPageRepositoryBrowserImpl } from "./repository/browser/item-page-repository-impl.js";
import { AttributeTotalRepositoryBrowserImpl } from "./repository/browser/attribute-total-repository-impl.js";
import { ReaderSettingsRepositoryBrowserImpl } from "./repository/browser/reader-settings-repository-impl.js";
import { TokenRepositoryBrowserImpl } from "./repository/browser/token-repository-impl.js";

import { ChannelWebService } from "./service/web/channel-web-service.js";
import { ItemWebService } from "./service/web/item-web-service.js";
import { AuthorWebService } from "./service/web/author-web-service.js";
import { MintWebService } from "./service/web/mint-web-service.js";
import { SearchbarService } from "./service/web/searchbar-service.js";
import { StaticPageService } from "./service/static-page-service.js";
import { ItemPageService } from "./service/item-page-service.js";
import { QueueService } from "./service/core/queue-service.js";
import { PagingService } from "./service/core/paging-service.js";
import { DatabaseService } from "./service/core/database-service.js";
import { AnimationService } from "./service/animation-service.js";
import { UiService } from "./service/core/ui-service.js";
import { ItemService } from "./service/item-service.js";
import { ImageService } from "./service/image-service.js";
import { ChannelService } from "./service/channel-service.js";
import { AuthorService } from "./service/author-service.js";
import { TokenContractService } from "./service/token-contract-service.js";
import { SchemaService } from "./service/core/schema-service.js";
import { QuillService } from "./service/core/quill-service.js";
import { ReaderSettingsService } from "./service/reader-settings-service.js";


import { ERCEventService } from "./service/erc-event-service.js";
import { AttributeTotalService } from "./service/attribute-total-service.js"; 
import { ComponentStateService } from "./service/core/component-state-service.js";
import { ComponentStateRepository } from "./repository/component-state-repository.js";
import { ComponentStateRepositoryBrowserImpl } from "./repository/browser/component-state-repository-impl.js";
import { ComponentState } from "./dto/component-state.js";


import { TokenOwnerPageService } from "./service/token-owner-page-service.js";
import { TokenOwnerPageRepository } from "./repository/token-owner-page-repository.js";
import { TokenOwnerPageRepositoryBrowserImpl } from "./repository/browser/token-owner-page-repository-impl.js";


import { TransactionWebService } from "./service/web/transaction-web-service.js";
import { ProcessedTransactionService } from "./service/processed-transaction-service.js";
import { ProcessedTransactionRepository } from "./repository/processed-transaction-repository.js";
import { ProcessedTransactionRepositoryBrowserImpl } from "./repository/browser/processed-transaction-repository-impl.js";
import { TokenOwnerService } from "./service/token-owner-service.js";
import { TokenOwnerRepositoryBrowserImpl } from "./repository/browser/token-owner-repository-impl.js";
import { TokenOwnerRepository } from "./repository/token-owner-repository.js";
import { ContractStateRepository } from "../sync/repository/contract-state-repository.js";
import { TokenService } from "./service/token-service.js";
import { RowItemViewModelRepositoryBrowserImpl } from "./repository/browser/row-item-view-model-repository-impl.js";
import { RowItemViewModelRepository } from "./repository/row-item-view-model-repository.js";



let container: Container


async function getMainContainer(customContainer:Container, theBaseURI:string, theHostname:string, version:string, routes:any[], channelId:string) {

  if (container) return container

  container = customContainer
  
  globalThis.baseURI = theBaseURI
  globalThis.hostname = theHostname
  globalThis.channelId = channelId

  function framework7() {

    Framework7.registerComponent("nav-bar", Navbar)

    Framework7.registerComponent("token-toolbar", TokenToolbar)

    // Framework7.registerComponent("nft-info", NftInfo)
    Framework7.registerComponent("mint-list", MintList)
    Framework7.registerComponent("attribute-filter", AttributeFilter)
    Framework7.registerComponent("explore-total-info", ExploreTotalInfo)

    Framework7.registerComponent("mint-info", MintInfo)
    Framework7.registerComponent("largest-sales", LargestSales)


    Framework7.registerComponent("transaction-viewer", Transaction)
    Framework7.registerComponent("transaction-row", TransactionRow)

    Framework7.registerComponent("leaderboard-rows", LeaderboardRows)


    Framework7.registerComponent("search-list", SearchList)
    Framework7.registerComponent("infinite-scroll-content", InfiniteScrollContent)



    

    globalThis.app = new Framework7({
      el: '#app', // App root element
      id: 'large-reader', // App bundle ID
      name: 'Large Reader', // App name
      theme: 'auto', // Automatic theme detection
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
    })

    return globalThis.app
  }

  container.bind("framework7").toConstantValue(framework7())

  container.bind("version").toConstantValue(version)

  container.bind("PouchDB").toConstantValue(() => {
    return PouchDB
  })

  container.bind("PouchFind").toConstantValue(PouchFind)
  container.bind("PouchQuickSearch").toConstantValue(PouchQuickSearch)

  container.bind("provider").toConstantValue(() => {

    if (typeof window !== "undefined" && window['ethereum']) {

      //@ts-ignore
      window.web3Provider = window.ethereum

      //@ts-ignore
      return new ethers.BrowserProvider(window.ethereum)

    }

  })

  container.bind("contracts").toConstantValue(async () => {

    let contract
    let contractABI


    let contractResponse = await axios.get(`${globalThis.hostname}${globalThis.baseURI}backup/contract/contract.json`, { responseType: 'json'})
    let contractABIResponse = await axios.get(`${globalThis.hostname}${globalThis.baseURI}backup/contract/contract-abi.json`, { responseType: 'json'})


    if (contractResponse.status === 200) {
        contract = contractResponse.data
    }

    if (contractResponse.status === 200) {
        contractABI = contractABIResponse.data
    }

    if (!contract.contractAddress) return []

    //Override address
    contractABI['Channel'].address = contract.contractAddress

    return contractABI

  })

  container.bind("baseURI").toConstantValue(() => {
    return globalThis.baseURI
  })

  container.bind("hostname").toConstantValue(() => {
    return globalThis.hostname
  })

  container.bind("channelId").toConstantValue(() => {
    return globalThis.channelId
  })


  container.bind<WalletService>("WalletService").to(WalletServiceImpl).inSingletonScope()

  container.bind<ChannelRepository>("ChannelRepository").to(ChannelRepositoryBrowserImpl).inSingletonScope()
  container.bind<ItemRepository>("ItemRepository").to(ItemRepositoryBrowserImpl).inSingletonScope()
  container.bind<AuthorRepository>("AuthorRepository").to(AuthorRepositoryBrowserImpl).inSingletonScope()
  container.bind<MetadataRepository>("MetadataRepository").to(MetadataRepositoryBrowserImpl).inSingletonScope()
  
  container.bind<ImageRepository>("ImageRepository").to(ImageRepositoryBrowserImpl).inSingletonScope()
  container.bind<AnimationRepository>("AnimationRepository").to(AnimationRepositoryBrowserImpl).inSingletonScope()
  container.bind<StaticPageRepository>("StaticPageRepository").to(StaticPageRepositoryBrowserImpl).inSingletonScope()
  container.bind<ItemPageRepository>("ItemPageRepository").to(ItemPageRepositoryBrowserImpl).inSingletonScope()
  container.bind<TokenOwnerPageRepository>("TokenOwnerPageRepository").to(TokenOwnerPageRepositoryBrowserImpl).inSingletonScope()

  container.bind<AttributeTotalRepository>("AttributeTotalRepository").to(AttributeTotalRepositoryBrowserImpl).inSingletonScope()
  container.bind<ReaderSettingsRepository>("ReaderSettingsRepository").to(ReaderSettingsRepositoryBrowserImpl).inSingletonScope()

  //@ts-ignore
  container.bind<ContractStateRepository>("ContractStateRepository").to({}).inSingletonScope()
  container.bind<ComponentStateRepository>("ComponentStateRepository").to(ComponentStateRepositoryBrowserImpl).inSingletonScope()
  container.bind<TokenOwnerRepository>("TokenOwnerRepository").to(TokenOwnerRepositoryBrowserImpl).inSingletonScope()
  container.bind<TokenRepository>("TokenRepository").to(TokenRepositoryBrowserImpl).inSingletonScope()

  container.bind<ProcessedTransactionRepository>("ProcessedTransactionRepository").to(ProcessedTransactionRepositoryBrowserImpl).inSingletonScope()
  container.bind<RowItemViewModelRepository>("RowItemViewModelRepository").to(RowItemViewModelRepositoryBrowserImpl).inSingletonScope()


  container.bind<ChannelWebService>("ChannelWebService").to(ChannelWebService).inSingletonScope()
  container.bind<ItemWebService>("ItemWebService").to(ItemWebService).inSingletonScope()
  container.bind<AuthorWebService>("AuthorWebService").to(AuthorWebService).inSingletonScope()
  container.bind<MintWebService>("MintWebService").to(MintWebService).inSingletonScope()
  container.bind<SearchbarService>("SearchbarService").to(SearchbarService).inSingletonScope()
  container.bind<StaticPageService>("StaticPageService").to(StaticPageService).inSingletonScope()
  container.bind<ItemPageService>("ItemPageService").to(ItemPageService).inSingletonScope()
  container.bind<QueueService>("QueueService").to(QueueService).inSingletonScope()
  container.bind<TransactionWebService>("TransactionWebService").to(TransactionWebService).inSingletonScope()


  container.bind<PagingService>("PagingService").to(PagingService).inSingletonScope()
  container.bind<DatabaseService>("DatabaseService").to(DatabaseService).inSingletonScope()
  container.bind<AnimationService>("AnimationService").to(AnimationService).inSingletonScope()

  container.bind<UiService>("UiService").to(UiService).inSingletonScope()
  container.bind<ItemService>("ItemService").to(ItemService).inSingletonScope()
  container.bind<ImageService>("ImageService").to(ImageService).inSingletonScope()
  container.bind<ChannelService>("ChannelService").to(ChannelService).inSingletonScope()
  container.bind<AuthorService>("AuthorService").to(AuthorService).inSingletonScope()
  container.bind<TokenContractService>("TokenContractService").to(TokenContractService).inSingletonScope()
  container.bind<SchemaService>("SchemaService").to(SchemaService).inSingletonScope()
  container.bind<QuillService>("QuillService").to(QuillService).inSingletonScope()
  container.bind<AttributeTotalService>("AttributeTotalService").to(AttributeTotalService).inSingletonScope()
  container.bind<ComponentStateService>("ComponentStateService").to(ComponentStateService).inSingletonScope()

  container.bind<ReaderSettingsService>("ReaderSettingsService").to(ReaderSettingsService).inSingletonScope()
  container.bind<ERCEventService>("ERCEventService").to(ERCEventService).inSingletonScope()

  //@ts-ignore
  container.bind<GenerateService>("GenerateService").to({}).inSingletonScope()
  container.bind<TokenOwnerService>("TokenOwnerService").to(TokenOwnerService).inSingletonScope()
  container.bind<TokenService>("TokenService").to(TokenService).inSingletonScope()

  container.bind<TokenOwnerPageService>("TokenOwnerPageService").to(TokenOwnerPageService).inSingletonScope()

  container.bind<ProcessedTransactionService>("ProcessedTransactionService").to(ProcessedTransactionService).inSingletonScope()


  //Attach container to window so we can easily access it from the browser console
  globalThis.container = container
  globalThis.ethers = ethers
  globalThis.he = he
  globalThis.dayjs = dayjs
  globalThis.ComponentState = ComponentState 


  return container
}



export {
  getMainContainer, container
}




