import AppComponent from './components/app.f7.html'

import AdminChannelIndexComponent from './components/admin/channel/index.f7.html'
import AdminChannelCreateComponent from './components/admin/channel/create.f7.html'
import AdminChannelShowComponent from './components/admin/channel/show.f7.html'
import AdminChannelEditComponent from './components/admin/channel/edit.f7.html'

import AdminItemIndexComponent from './components/admin/item/index.f7.html'
import AdminItemCreateComponent from './components/admin/item/create.f7.html'
import AdminItemShowComponent from './components/admin/item/show.f7.html'
import AdminItemEditComponent from './components/admin/item/edit.f7.html'

import AdminSettingsComponent from './components/admin/settings/index.f7.html'
import AdminConnectComponent from './components/admin/connect/index.f7.html'


import { UiService } from './service/core/ui-service';

import { providers } from "ethers"
import { QueueService } from './service/core/queue_service';
import { DeployService } from './service/core/deploy-service';

import { QuillService } from "./service/quill-service";
import { QuillEditorService } from "./service/quill-editor-service";

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


let container:Container
let channelWebService:ChannelWebService
let itemWebService:ItemWebService

function getMainContainer() {

  if (container) return container

  container = new Container()



  function framework7() {

    //Init framework7
    const Framework7 = require('framework7/bundle').default

    let app = new Framework7({
      el: '#app', // App root element
      id: 'large', // App bundle ID
      name: 'Large', // App name
      theme: 'aurora', // Automatic theme detection
      component: AppComponent,
      routes: [

        {
          path: "/",
          component: AdminChannelIndexComponent
        },

        {
          path: "/admin/channel/create",
          component: AdminChannelCreateComponent
        },

        {
          path: "/admin/channel/show/:id",
          async async({ resolve, reject, to}) {

            let channelViewModel = await channelWebService.get(to.params.id)

            resolve({ 
              component: AdminChannelShowComponent
            }, {
              props: {
                channelViewModel: channelViewModel
              } 
            })
          }
        },
        {
          path: "/admin/channel/edit/:id",
          async async({ resolve, reject, to }) {

              let channelViewModel = await channelWebService.get(to.params.id)

              resolve({ 
                component: AdminChannelEditComponent
              }, {
                props: {
                  channelViewModel: channelViewModel
                } 
              })
          }
          
        },

        /**
         * Items
         */
        {
          path: "/admin/item/index",
          component: AdminItemIndexComponent
        },
        {
          path: "/admin/item/create/:channelId",
          component: AdminItemCreateComponent
        },
        {
          path: "/admin/item/show/:id",
          async async({ resolve, reject, to }) {

            let itemViewModel = await itemWebService.get(to.params.id)

            resolve({ 
              component: AdminItemShowComponent
            }, {
              props: {
                itemViewModel: itemViewModel
              } 
            })
          }
          
        },
        {
          path: "/admin/item/edit/:id",
          async async({ resolve, reject, to }) {

            let itemViewModel = await itemWebService.get(to.params.id)

            resolve({ 
              component: AdminItemEditComponent
            }, {
              props: {
                itemViewModel: itemViewModel
              } 
            })
          }
        },



        /**
         * Site Settings
         */

        {
          path: "/admin/settings",
          component: AdminSettingsComponent
        },

        /**Connect */
        {
          path: "/admin/connect",
          component: AdminConnectComponent
        },
      ]
    })


    return app

  }

  function contracts() {

    const c = require('../contracts.json')

    const overrides = require('../contracts-override.json')


    //Override addresses
    //   c['MLBC'].address = overrides['MLBC']
    //   c['Words'].address = overrides['Words']
    //   c['Baseballs'].address = overrides['Baseballs']
    //   c['BaseballWords'].address = overrides['BaseballWords']


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



  function ipfsOptions() {
    return {
      repo: "large-repo",

    }

  }

  function orbitOptions() {
    return {
    }
  }



  // container.bind('sketch').toConstantValue(sketch())
  container.bind("contracts").toConstantValue(contracts())
  container.bind("provider").toConstantValue(provider())
  container.bind("name").toConstantValue("Large")
  container.bind("framework7").toConstantValue(framework7())

  container.bind("ipfsOptions").toConstantValue(ipfsOptions())
  container.bind("orbitOptions").toConstantValue(orbitOptions())



  container.bind(UiService).toSelf().inSingletonScope()
  container.bind(QueueService).toSelf().inSingletonScope()
  container.bind(DeployService).toSelf().inSingletonScope()
  container.bind(QuillService).toSelf().inSingletonScope()
  container.bind(QuillEditorService).toSelf().inSingletonScope()

  container.bind(UploadService).toSelf().inSingletonScope()
  container.bind(IpfsService).toSelf().inSingletonScope()
  container.bind(DatabaseService).toSelf().inSingletonScope()
  container.bind(SchemaService).toSelf().inSingletonScope()
  container.bind(PinningService).toSelf().inSingletonScope()
  
  container.bind(ChannelWebService).toSelf().inSingletonScope()
  container.bind(ItemWebService).toSelf().inSingletonScope()

  container.bind<WalletService>(TYPES.WalletService).to(WalletServiceImpl).inSingletonScope()


  container.bind(AuthorService).toSelf().inSingletonScope()
  container.bind(ChannelService).toSelf().inSingletonScope()
  container.bind(ImageService).toSelf().inSingletonScope()
  container.bind(ItemService).toSelf().inSingletonScope()

  container.bind(ChannelRepository).toSelf().inSingletonScope()
  container.bind(ItemRepository).toSelf().inSingletonScope()
  container.bind(ImageRepository).toSelf().inSingletonScope()
  container.bind(AuthorRepository).toSelf().inSingletonScope()
  container.bind(PinningApiRepository).toSelf().inSingletonScope()

  channelWebService = container.get(ChannelWebService)
  itemWebService = container.get(ItemWebService)

  return container
}



export {
  getMainContainer, container
}