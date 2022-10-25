import AppComponent from './components/admin/app.f7.html'

import { UiService } from './service/core/ui-service';

import { providers } from "ethers"
import { QueueService } from './service/core/queue-service';

import { QuillService } from "./service/quill-service";
import { QuillEditorService } from "./service/quill-editor-service";
import { ReaderConfig } from 'dto/reader-config';

import { UploadService } from "./service/core/upload-service";

import { WalletService } from "./service/core/wallet-service"
import { ImageService } from "./service/image-service"
import { AuthorService } from "./service/author-service"
import { ChannelService } from "./service/channel-service"
import { IpfsService } from "./service/core/ipfs-service"
import { Container } from "inversify";
import { DatabaseService } from './service/core/database-service'
import { ChannelRepository } from './repository/channel-repository'
import { ItemRepository } from './repository/item-repository'
import { ImageRepository } from './repository/image-repository'
import { AuthorRepository } from './repository/author-repository'
import { SchemaService } from './service/core/schema-service'
import { WalletServiceImpl } from './service/core/wallet-service-impl'

import TYPES from './service/core/types'

import { PinningService } from './service/core/pinning-service'
import { PinningApiRepository } from './repository/pinning-api-repository'
import { ItemService } from './service/item-service'
import { ChannelWebService } from './service/web/channel-web-service'
import { ItemWebService } from './service/web/item-web-service'
import { AuthorWebService } from './service/web/author-web-service'
import { GitlabService } from './service/core/gitlab-service'
import { GitlabRepository } from './repository/gitlab-repository'
import { RoutingService } from './service/core/routing-service'
import { ChannelController } from './controller/channel-controller'
import { ItemController } from './controller/item-controller'
import { AuthorController } from './controller/author-controller';
import { SettingsController } from './controller/settings-controller';
import { PublishService } from './service/core/publish-service';
import { ConnectController } from './controller/connect-controller';
import { PublishController } from './controller/publish-controller';
import { PagingService } from './service/core/paging-service';


import { SvgService } from './service/svg-service';
import { AnimationService } from './service/animation-service';
import { AnimationRepository } from './repository/animation-repository';
import { ImportService } from './service/core/import-service';

import { ERCEventService } from './service/core/erc-event-service';
import { QueryCacheService } from './service/core/query-cache-service';

import * as IPFS from 'ipfs-core'
import { create } from 'ipfs-http-client'

import { ThemeService } from './service/theme-service';
import { ThemeRepository } from './repository/theme-repository';
import { StaticPageRepository } from './repository/static-page-repository';
import { StaticPageService } from './service/static-page-service';
import { IpfsHostService } from './service/core/ipfs-host-service';
import { IpfsHostRepository } from './repository/ipfs-host-repository';

import { TokenMetadataCacheRepository } from './repository/token-metadata-cache-repository';

//Init framework7
//@ts-ignore
import Framework7 from 'framework7';

// Import additional components
//@ts-ignore
import Dialog from 'framework7/components/dialog';
//@ts-ignore
import Toast from 'framework7/components/toast';
//@ts-ignore
import Preloader from 'framework7/components/preloader';
//@ts-ignore
import VirtualList from 'framework7/components/virtual-list'
//@ts-ignore
import ListIndex from 'framework7/components/list-index'
//@ts-ignore
import Card from 'framework7/components/card'
//@ts-ignore
import Chip from 'framework7/components/chip'
//@ts-ignore
import Popup from 'framework7/components/popup'
//@ts-ignore
import Accordion from 'framework7/components/accordion'
//@ts-ignore
import Popover from 'framework7/components/popover'

//@ts-ignore
import Form from 'framework7/components/form'
//@ts-ignore
import Input from 'framework7/components/input'
//@ts-ignore
import Checkbox from 'framework7/components/checkbox'
//@ts-ignore
import Radio from 'framework7/components/radio'
//@ts-ignore
import Toggle from 'framework7/components/toggle'
//@ts-ignore
import Range from 'framework7/components/range'
//@ts-ignore
import Stepper from 'framework7/components/stepper'
//@ts-ignore
import SmartSelect from 'framework7/components/smart-select'
//@ts-ignore
import Grid from 'framework7/components/grid'
//@ts-ignore
import InfiniteScroll from 'framework7/components/infinite-scroll'
//@ts-ignore
import Menu from 'framework7/components/menu'


// Install F7 Components using .use() method on Framework7 class:
Framework7.use([Dialog, Toast, Preloader, VirtualList, ListIndex, Card, Chip,
  Form, Input, Checkbox, Radio, Toggle, Range, Stepper, SmartSelect, Grid, InfiniteScroll, Menu, Popup,Accordion,
  Popover
])


let container: Container


function getMainContainer(readerConfig:ReaderConfig) {

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
    const c = require('../contracts.json')
    return c
  }

  function provider() {

    if (typeof window !== "undefined" && window['ethereum']) {

      //@ts-ignore
      window.web3Provider = window.ethereum

      //@ts-ignore
      return new providers.Web3Provider(window.ethereum)


    }
  }

  // container.bind('sketch').toConstantValue(sketch())
  container.bind("contracts").toConstantValue(contracts())
  container.bind("provider").toConstantValue(provider())
  container.bind("name").toConstantValue("Large")
  container.bind("framework7").toConstantValue(framework7())
  container.bind("readerConfig").toConstantValue(readerConfig)
  container.bind("pouch-prefix").toConstantValue("./pouch/")

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
  container.bind(GitlabService).toSelf().inSingletonScope()
  container.bind(RoutingService).toSelf().inSingletonScope()
  container.bind(PagingService).toSelf().inSingletonScope()
  container.bind(IpfsHostService).toSelf().inSingletonScope()

  container.bind(ERCEventService).toSelf().inSingletonScope()


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


  container.bind(AnimationRepository).toSelf().inSingletonScope()
  container.bind(ChannelRepository).toSelf().inSingletonScope()
  container.bind(ItemRepository).toSelf().inSingletonScope()
  container.bind(ImageRepository).toSelf().inSingletonScope()
  container.bind(AuthorRepository).toSelf().inSingletonScope()
  container.bind(PinningApiRepository).toSelf().inSingletonScope()
  container.bind(GitlabRepository).toSelf().inSingletonScope()
  container.bind(ThemeRepository).toSelf().inSingletonScope()
  container.bind(StaticPageRepository).toSelf().inSingletonScope()
  container.bind(IpfsHostRepository).toSelf().inSingletonScope()
  container.bind(TokenMetadataCacheRepository).toSelf().inSingletonScope()


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
            '/dns4/quiet-eyrie-88477.herokuapp.com/tcp/443/wss/p2p-webrtc-star',
            // '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
            // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
            // '/ip4/127.0.0.1/tcp/4003/ws/p2p/12D3KooWSDvhHLC79A3V2jZXzeHFv4vBDirQWJuHZLza8grvo3Cm'
            '/ip4/127.0.0.1/tcp/9092/wss/p2p-webrtc-star'

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