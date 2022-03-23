import AppComponent from './components/app.f7.html'

import AdminChannelIndexComponent from './components/admin/channel/index.f7.html'
import AdminChannelCreateComponent from './components/admin/channel/create.f7.html'

import AdminPostIndexComponent from './components/admin/post/index.f7.html'
import AdminPostCreateComponent from './components/admin/post/create.f7.html'
import AdminPostShowComponent from './components/admin/post/show.f7.html'
import AdminPostEditComponent from './components/admin/post/edit.f7.html'

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


let container:Container

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

        /**
         * Posts
         */
        {
          path: "/admin/post/index",
          component: AdminPostIndexComponent
        },
        {
          path: "/admin/post/create",
          component: AdminPostCreateComponent
        },
        {
          path: "/admin/post/show/:id",
          component: AdminPostShowComponent
        },
        {
          path: "/admin/post/edit/:id",
          component: AdminPostEditComponent
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
      repo: "large",
      relay: {
        enabled: true,
        hop: {
          enabled: true // enable circuit relay HOP (make this node a relay)
        }
      },
      config: {
        Addresses: {
          //@ts-ignore
          Swarm: []
        }
      }

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



  return container
}



export {
  getMainContainer, container
}