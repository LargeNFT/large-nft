import AppComponent from './components/admin/app.f7.html'

import { UiService } from './service/core/ui-service.js';

import { providers } from "ethers"
import { QueueService } from './service/core/queue-service.js';

import { QuillService } from "./service/quill-service.js";
import { QuillEditorService } from "./service/quill-editor-service.js";
import { ReaderConfig } from './dto/reader-config.js';

import { UploadService } from "./service/core/upload-service.js";

import { WalletService } from "./service/core/wallet-service.js"
import { ImageService } from "./service/image-service.js"
import { AuthorService } from "./service/author-service.js"
import { ChannelService } from "./service/channel-service.js"
import { IpfsService } from "./service/core/ipfs-service.js"
import { Container } from "inversify";
import { DatabaseService } from './service/core/database-service.js'
import { ChannelRepository } from './repository/channel-repository.js'
import { ItemRepository } from './repository/item-repository.js'
import { ImageRepository } from './repository/image-repository.js'
import { AuthorRepository } from './repository/author-repository.js'
import { SchemaService } from './service/core/schema-service.js'
import { WalletServiceImpl } from './service/core/wallet-service-impl.js'

import TYPES from './service/core/types.js'

import { PinningService } from './service/core/pinning-service.js'
import { PinningApiRepository } from './repository/pinning-api-repository.js'
import { AttributeCountRepository } from './repository/attribute-count-repository.js'

import { ItemService } from './service/item-service.js'
import { AttributeCountService } from './service/attribute-count-service.js'

import { ChannelWebService } from './service/web/channel-web-service.js'
import { ItemWebService } from './service/web/item-web-service.js'
import { AuthorWebService } from './service/web/author-web-service.js'
import { GitlabService } from './service/core/gitlab-service.js'
import { SettingsRepository } from './repository/settings-repository.js'
import { RoutingService } from './service/core/routing-service.js'
import { SettingsService } from './service/core/settings-service.js'

import { ChannelController } from './controller/channel-controller.js'
import { ItemController } from './controller/item-controller.js'
import { AuthorController } from './controller/author-controller.js';
import { SettingsController } from './controller/settings-controller.js';
import { PublishService } from './service/core/publish-service.js';
import { ConnectController } from './controller/connect-controller.js';
import { PublishController } from './controller/publish-controller.js';
import { PagingService } from './service/core/paging-service.js';


import { SvgService } from './service/svg-service.js';
import { AnimationService } from './service/animation-service.js';
import { AnimationRepository } from './repository/animation-repository.js';
import { ImportService } from './service/core/import-service.js';

import { ERCEventService } from './service/core/erc-event-service.js';
import { QueryCacheService } from './service/core/query-cache-service.js';

import * as IPFS from 'ipfs-core'
import { create } from 'ipfs-http-client'

import git from "isomorphic-git"
import FS from '@isomorphic-git/lightning-fs';


import { ThemeService } from './service/theme-service.js';
import { ThemeRepository } from './repository/theme-repository.js';
import { StaticPageRepository } from './repository/static-page-repository.js';
import { StaticPageService } from './service/static-page-service.js';
import { ExportService } from './service/core/export-service.js';


import { TokenMetadataCacheRepository } from './repository/token-metadata-cache-repository.js';
import { QueryCacheRepository } from './repository/query-cache-repository.js';

//Init framework7
import Framework7 from 'framework7';

// Import additional components
import Dialog from 'framework7/components/dialog';
import Toast from 'framework7/components/toast';
import Preloader from 'framework7/components/preloader';
import VirtualList from 'framework7/components/virtual-list'
import ListIndex from 'framework7/components/list-index'
import Card from 'framework7/components/card'
import Chip from 'framework7/components/chip'
import Popup from 'framework7/components/popup'
import Accordion from 'framework7/components/accordion'
import Popover from 'framework7/components/popover'

import Form from 'framework7/components/form'
import Input from 'framework7/components/input'
import Checkbox from 'framework7/components/checkbox'
import Radio from 'framework7/components/radio'
import Toggle from 'framework7/components/toggle'
import Range from 'framework7/components/range'
import Stepper from 'framework7/components/stepper'
import SmartSelect from 'framework7/components/smart-select'
import Grid from 'framework7/components/grid'
import InfiniteScroll from 'framework7/components/infinite-scroll'
import Menu from 'framework7/components/menu'
import Swiper from 'framework7/components/swiper'
import { GitService } from './service/core/git-service.js';
import { GithubService } from './service/core/github-service.js';

// Install F7 Components using .use() method on Framework7 class:
Framework7.use([Dialog, Toast, Preloader, VirtualList, ListIndex, Card, Chip,
  Form, Input, Checkbox, Radio, Toggle, Range, Stepper, SmartSelect, Grid, InfiniteScroll, Menu, Popup,Accordion,
  Popover, Swiper
])


let container: Container


function getMainContainer(version:string) {

  if (container) return container

  container = new Container()

  function framework7() {

    let app = new Framework7({
      el: '#app', // App root element
      id: 'large', // App bundle ID
      name: 'Large', // App name
      theme: 'auto', // Automatic theme detection

      init: false,

      //@ts-ignore
      component: AppComponent,
      navbar: {
        hideOnPageScroll: true
      }
    })
    

    return app

  }

  function contracts() {
    const c = require('../../contracts.json')
    return c
  }

  container.bind("version").toConstantValue(version)

  container.bind("provider").toConstantValue(() => {

    if (typeof window !== "undefined" && window['ethereum']) {

      //@ts-ignore
      window.web3Provider = window.ethereum

      //@ts-ignore
      return new providers.Web3Provider(window.ethereum)

    }

  })

  // container.bind('sketch').toConstantValue(sketch())
  container.bind("contracts").toConstantValue(contracts())
  container.bind("name").toConstantValue("Large")
  container.bind("framework7").toConstantValue(framework7())
  // container.bind("readerConfig").toConstantValue(readerConfig)
  container.bind("pouch-prefix").toConstantValue("./pouch/")
  container.bind("footer-text").toConstantValue(globalThis.footerText)


  let fs
    
  //@ts-ignore
  container.bind("fs").toConstantValue(async () => {
  
    if (fs) return fs
  
    fs = new FS()

    await fs.init("large-fs")

    return fs
  })
   


  container.bind("git").toConstantValue(git)



  container.bind(ChannelController).toSelf().inSingletonScope()
  container.bind(ItemController).toSelf().inSingletonScope()
  container.bind(AuthorController).toSelf().inSingletonScope()
  container.bind(SettingsController).toSelf().inSingletonScope()
  container.bind(ConnectController).toSelf().inSingletonScope()
  container.bind(PublishController).toSelf().inSingletonScope()

  container.bind(UiService).toSelf().inSingletonScope()
  container.bind(QueueService).toSelf().inSingletonScope()
  container.bind(QuillService).toSelf().inSingletonScope()
  container.bind(QuillEditorService).toSelf().inSingletonScope()
  container.bind(PublishService).toSelf().inSingletonScope()

  container.bind(UploadService).toSelf().inSingletonScope()
  container.bind(IpfsService).toSelf().inSingletonScope()
  container.bind(DatabaseService).toSelf().inSingletonScope()
  container.bind(SchemaService).toSelf().inSingletonScope()
  container.bind(PinningService).toSelf().inSingletonScope()
  container.bind(RoutingService).toSelf().inSingletonScope()
  container.bind(PagingService).toSelf().inSingletonScope()

  container.bind(ERCEventService).toSelf().inSingletonScope()
  container.bind(ExportService).toSelf().inSingletonScope()
  container.bind(AttributeCountService).toSelf().inSingletonScope()


  container.bind(ChannelWebService).toSelf().inSingletonScope()
  container.bind(ItemWebService).toSelf().inSingletonScope()
  container.bind(AuthorWebService).toSelf().inSingletonScope()

  container.bind<WalletService>(TYPES.WalletService).to(WalletServiceImpl).inSingletonScope()

  container.bind(AnimationService).toSelf().inSingletonScope()
  container.bind(AuthorService).toSelf().inSingletonScope()
  container.bind(ChannelService).toSelf().inSingletonScope()
  container.bind(ImageService).toSelf().inSingletonScope()
  container.bind(ItemService).toSelf().inSingletonScope()
  container.bind(SvgService).toSelf().inSingletonScope()
  container.bind(ImportService).toSelf().inSingletonScope()
  container.bind(ThemeService).toSelf().inSingletonScope()
  container.bind(StaticPageService).toSelf().inSingletonScope()
  container.bind(QueryCacheService).toSelf().inSingletonScope()
  container.bind(SettingsService).toSelf().inSingletonScope()
  container.bind(GitService).toSelf().inSingletonScope()
  container.bind(GitlabService).toSelf().inSingletonScope()
  container.bind(GithubService).toSelf().inSingletonScope()


  container.bind(AnimationRepository).toSelf().inSingletonScope()
  container.bind(ChannelRepository).toSelf().inSingletonScope()
  container.bind(ItemRepository).toSelf().inSingletonScope()
  container.bind(ImageRepository).toSelf().inSingletonScope()
  container.bind(AuthorRepository).toSelf().inSingletonScope()
  container.bind(PinningApiRepository).toSelf().inSingletonScope()
  container.bind(SettingsRepository).toSelf().inSingletonScope()
  container.bind(ThemeRepository).toSelf().inSingletonScope()
  container.bind(StaticPageRepository).toSelf().inSingletonScope()
  container.bind(TokenMetadataCacheRepository).toSelf().inSingletonScope()
  container.bind(QueryCacheRepository).toSelf().inSingletonScope()
  container.bind(AttributeCountRepository).toSelf().inSingletonScope()


  container.bind("ipfsInit").toConstantValue( async () => {

    return IPFS.create({
      // repo: Math.random().toString(36).substring(7),
      repo: 'large',
      preload: { enabled: false },
      relay: {
        enabled: true, // enable relay dialer/listener (STOP)
        hop: {
          enabled: true // make this node a relay (HOP)
        }
      },
      config: {
        Addresses: {
          Swarm: [
            // This is a public webrtc-star server
            // '/dns4/quiet-eyrie-88477.herokuapp.com/tcp/443/wss/p2p-webrtc-star',
            // '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
            // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
            // '/ip4/127.0.0.1/tcp/4003/ws/p2p/12D3KooWSDvhHLC79A3V2jZXzeHFv4vBDirQWJuHZLza8grvo3Cm'
            // '/ip4/127.0.0.1/tcp/9092/wss/p2p-webrtc-star'

          ]
        }
      }

    })

  })

  container.bind("ipfsRemoteInit").toConstantValue( async (url) => {
    if (!url) return
    return create({ url: url })
  })


  //Attach container to window so we can easily access it from the browser console
  globalThis.container = container

  return container
}



export {
  getMainContainer, container
}