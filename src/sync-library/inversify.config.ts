import { Container } from "inversify";
import { Eta } from "eta"
import { ethers } from "ethers";


import { SyncStatus } from "./dto/sync-status.js";
import { SyncStatusRepositoryNodeImpl } from "./repository/node/sync-status-repository-impl.js";
import { SyncStatusRepository } from "./repository/sync-status-repository.js";
import { SyncStatusService } from "./service/sync-status-service.js";

import { SpawnService } from "../sync/service/spawn-service.js";
import { GenerateService } from "../reader/service/core/generate-service.js";
import { ItemService } from "../reader/service/item-service.js";
import { ItemWebService } from "../reader/service/web/item-web-service.js";
import { StaticPageService } from "../reader/service/static-page-service.js";
import { ItemRepository } from "../reader/repository/item-repository.js";
import { ItemRepositoryNodeImpl } from "../reader/repository/node/item-repository-impl.js";
import { StaticPageRepository } from "../reader/repository/static-page-repository.js";
import { StaticPageRepositoryNodeImpl } from "../reader/repository/node/static-page-repository-impl.js";
import { RowItemViewModelRepository } from "../reader/repository/row-item-view-model-repository.js";
import { RowItemViewModel } from "../reader/dto/item-page.js";
import { AttributeTotalService } from "../reader/service/attribute-total-service.js";
import { AttributeTotalRepository } from "../reader/repository/attribute-total-repository.js";
import { AttributeTotalRepositoryNodeImpl } from "../reader/repository/node/attribute-total-repository-impl.js";
import { ChannelService } from "../reader/service/channel-service.js";
import { ChannelRepository } from "../reader/repository/channel-repository.js";
import { ChannelRepositoryNodeImpl } from "../reader/repository/node/channel-repository-impl.js";
import { AuthorService } from "../reader/service/author-service.js";
import { AuthorRepository } from "../reader/repository/author-repository.js";
import { AuthorRepositoryNodeImpl } from "../reader/repository/node/author-repository-impl.js";
import { WalletService } from "../reader/service/core/wallet-service.js";
import { WalletServiceImpl } from "../reader/service/core/wallet-service-impl.js";
import { ImageService } from "../reader/service/image-service.js";
import { ImageRepository } from "../reader/repository/image-repository.js";
import { ImageRepositoryNodeImpl } from "../reader/repository/node/image-repository-impl.js";
import { SchemaService } from "../reader/service/core/schema-service.js";
import { AnimationRepository } from "../reader/repository/animation-repository.js";
import { AnimationRepositoryNodeImpl } from "../reader/repository/node/animation-repository-impl.js";
import { ReaderSettingsRepository } from "../reader/repository/reader-settings-repository.js";
import { ReaderSettings } from "../reader/dto/reader-settings.js";
import { ComponentStateRepository } from "../reader/repository/component-state-repository.js";
import { ComponentState } from "../reader/dto/component-state.js";
import { QuillService } from "../reader/service/core/quill-service.js";
import { AnimationService } from "../reader/service/animation-service.js";
import { ItemPageService } from "../reader/service/item-page-service.js";
import { ItemPageRepository } from "../reader/repository/item-page-repository.js";
import { ItemPageRepositoryNodeImpl } from "../reader/repository/node/item-page-repository-impl.js";
import { Channel } from "./dto/channel.js";
import { LibraryChannelRepository } from "./repository/library-channel-repository.js";
import { LibraryChannelRepositoryNodeImpl } from "./repository/node/library-channel-repository-impl.js";
import { LibraryChannelService } from "./service/library-channel-service.js";
import { SyncLibraryService } from "./service/sync-library-service.js";

import {Headers} from 'node-fetch'

//@ts-ignore
globalThis.Headers = Headers


import configure from "@jimp/custom";
import types from "@jimp/types";
import resize from "@jimp/plugin-resize";


//@ts-ignore
const Jimp = configure({
  types: [types],
  plugins: [resize],
});




const { Sequelize } = require('sequelize-typescript')

let container:Container

async function getMainContainer(config, command:GetMainContainerCommand) {

  if (container) return container
  
  container = new Container()

  let sequelize

  //Load plugins
  let pluginModules = []
  for (let plugin of config.plugins) {
    let module = await import(/*webpackIgnore: true*/`${config.baseDir}/plugins/${plugin}`)
    module.default()

    pluginModules.push(module)
  }


  let eta

  
  if (!eta) {
    eta = new Eta()
  }

  container.bind("pluginModules").toConstantValue(pluginModules)
  container.bind("baseURI").toConstantValue(command.baseURI)
  container.bind("hostname").toConstantValue(command.hostname)
  container.bind("channelDir").toConstantValue(command.channelDir)
  container.bind("framework7").toConstantValue({})

  container.bind("provider").toConstantValue(() => {

    if (command.alchemy) {
      return new ethers.AlchemyProvider('homestead', config.alchemy)
    }

  })

  container.bind('sequelize').toConstantValue(async (baseDir) => {

    if (sequelize) {
      return sequelize
    }
  
    //@ts-ignore
    sequelize = new Sequelize({
      logging: false,
      database: "library",
      dialect: 'sqlite',
      storage: `${baseDir}/data/library.sqlite`,
      models: [SyncStatus, Channel]
    })
  
    await sequelize.sync()
  
    await sequelize.authenticate()
    // console.log('Connection has been established successfully.')
  
    return sequelize
  
  })
  
  container.bind("eta").toConstantValue(eta)

  container.bind("jimp").toConstantValue(Jimp)

  
  container.bind<AuthorService>("AuthorService").to(AuthorService).inSingletonScope()

  container.bind<SyncStatusRepository>("SyncStatusRepository").to(SyncStatusRepositoryNodeImpl).inSingletonScope()
  container.bind<LibraryChannelRepository>("LibraryChannelRepository").to(LibraryChannelRepositoryNodeImpl).inSingletonScope()

  container.bind<ChannelRepository>("ChannelRepository").to(ChannelRepositoryNodeImpl).inSingletonScope()
  container.bind<AuthorRepository>("AuthorRepository").to(AuthorRepositoryNodeImpl).inSingletonScope()
  container.bind<ImageRepository>("ImageRepository").to(ImageRepositoryNodeImpl).inSingletonScope()


  container.bind<SpawnService>("SpawnService").to(SpawnService).inSingletonScope()
  container.bind<GenerateService>("GenerateService").to(GenerateService).inSingletonScope()

  container.bind<ItemService>("ItemService").to(ItemService).inSingletonScope()
  container.bind<ItemWebService>("ItemWebService").to(ItemWebService).inSingletonScope()
  container.bind<StaticPageService>("StaticPageService").to(StaticPageService).inSingletonScope()
  
  container.bind<SyncStatusService>("SyncStatusService").to(SyncStatusService).inSingletonScope()
  container.bind<LibraryChannelService>("LibraryChannelService").to(LibraryChannelService).inSingletonScope()
  container.bind<SyncLibraryService>("SyncLibraryService").to(SyncLibraryService).inSingletonScope()

  
  container.bind<ChannelService>("ChannelService").to(ChannelService).inSingletonScope()
  container.bind<ImageService>("ImageService").to(ImageService).inSingletonScope()
  container.bind<SchemaService>("SchemaService").to(SchemaService).inSingletonScope()
  container.bind<QuillService>("QuillService").to(QuillService).inSingletonScope()
  container.bind<AnimationService>("AnimationService").to(AnimationService).inSingletonScope()
  container.bind<ItemPageService>("ItemPageService").to(ItemPageService).inSingletonScope()


  container.bind<WalletService>("WalletService").to(WalletServiceImpl).inSingletonScope()

  container.bind<ItemRepository>("ItemRepository").to(ItemRepositoryNodeImpl).inSingletonScope()
  container.bind<StaticPageRepository>("StaticPageRepository").to(StaticPageRepositoryNodeImpl).inSingletonScope()
  container.bind<AnimationRepository>("AnimationRepository").to(AnimationRepositoryNodeImpl).inSingletonScope()
  container.bind<ItemPageRepository>("ItemPageRepository").to(ItemPageRepositoryNodeImpl).inSingletonScope()

  
  container.bind('convert-svg-to-png').toConstantValue({})
  container.bind('sharp').toConstantValue({})
  container.bind('contracts').toConstantValue({})

  container.bind<RowItemViewModelRepository>("RowItemViewModelRepository").toConstantValue({
    load: function () {
      throw new Error("Function not implemented.");
    },
    get: function (_id: string): Promise<RowItemViewModel> {
      throw new Error("Function not implemented.");
    },
    put: function (item: RowItemViewModel) {
      throw new Error("Function not implemented.");
    },
    getByTokenIds: function (ids: number[]): Promise<RowItemViewModel[]> {
      throw new Error("Function not implemented.");
    }
  })

  container.bind<ReaderSettingsRepository>("ReaderSettingsRepository").toConstantValue({
    get: function (): Promise<ReaderSettings> {
      throw new Error("Function not implemented.");
    },
    put: function (readerSettings: ReaderSettings): Promise<void> {
      throw new Error("Function not implemented.");
    }
  })

  container.bind<ComponentStateRepository>("ComponentStateRepository").toConstantValue({
    get: function (_id: string): Promise<ComponentState> {
      throw new Error("Function not implemented.");
    },
    put: function (componentState: ComponentState): Promise<void> {
      throw new Error("Function not implemented.");
    }
  })

  container.bind<AttributeTotalService>("AttributeTotalService").to(AttributeTotalService).inSingletonScope()
  container.bind<AttributeTotalRepository>("AttributeTotalRepository").to(AttributeTotalRepositoryNodeImpl).inSingletonScope()


  return container
}

interface GetMainContainerCommand {
  baseURI:string
  hostname:string
  channelDir:string
  runDir:string
  alchemy:string
}

export {
  getMainContainer, container, GetMainContainerCommand
}
