import { Container } from "inversify";

import sharp from "sharp"
import { ethers } from "ethers"

import { AnimationRepository } from "../reader/repository/animation-repository.js";
import { AttributeTotalRepository } from "../reader/repository/attribute-total-repository.js";
import { AuthorRepository } from "../reader/repository/author-repository.js";
import { ChannelRepository } from "../reader/repository/channel-repository.js";
import { ComponentStateRepository } from "../reader/repository/component-state-repository.js";
import { ImageRepository } from "../reader/repository/image-repository.js";
import { ItemPageRepository } from "../reader/repository/item-page-repository.js";
import { ItemRepository } from "../reader/repository/item-repository.js";
import { AnimationRepositoryNodeImpl } from "../reader/repository/node/animation-repository-impl.js";
import { AttributeTotalRepositoryNodeImpl } from "../reader/repository/node/attribute-total-repository-impl.js";
import { AuthorRepositoryNodeImpl } from "../reader/repository/node/author-repository-impl.js";
import { ChannelRepositoryNodeImpl } from "../reader/repository/node/channel-repository-impl.js";
import { ImageRepositoryNodeImpl } from "../reader/repository/node/image-repository-impl.js";
import { ItemPageRepositoryNodeImpl } from "../reader/repository/node/item-page-repository-impl.js";
import { ItemRepositoryNodeImpl } from "../reader/repository/node/item-repository-impl.js";
import { StaticPageRepositoryNodeImpl } from "../reader/repository/node/static-page-repository-impl.js";
import { ReaderSettingsRepository } from "../reader/repository/reader-settings-repository.js";
import { StaticPageRepository } from "../reader/repository/static-page-repository.js";
import { AnimationService } from "../reader/service/animation-service.js";
import { AttributeTotalService } from "../reader/service/attribute-total-service.js";
import { AuthorService } from "../reader/service/author-service.js";
import { ChannelService } from "../reader/service/channel-service.js";
import { ComponentStateService } from "../reader/service/core/component-state-service.js";
import { DatabaseService } from "../reader/service/core/database-service.js";
import { ImageGeneratorService } from "../reader/service/core/image-generator-service.js";
import { PagingService } from "../reader/service/core/paging-service.js";
import { QueueService } from "../reader/service/core/queue-service.js";
import { QuillService } from "../reader/service/core/quill-service.js";
import { SchemaService } from "../reader/service/core/schema-service.js";
import { UiService } from "../reader/service/core/ui-service.js";
import { WalletService } from "../reader/service/core/wallet-service.js";
import { WalletServiceImpl } from "../reader/service/core/wallet-service-impl.js";
import { ERCEventService } from "../reader/service/erc-event-service.js";
import { ImageService } from "../reader/service/image-service.js";
import { ItemPageService } from "../reader/service/item-page-service.js";
import { ItemService } from "../reader/service/item-service.js";
import { ReaderSettingsService } from "../reader/service/reader-settings-service.js";
import { StaticPageService } from "../reader/service/static-page-service.js";
import { AuthorWebService } from "../reader/service/web/author-web-service.js";
import { ChannelWebService } from "../reader/service/web/channel-web-service.js";
import { ItemWebService } from "../reader/service/web/item-web-service.js";
import { ReaderSettings } from "../reader/dto/reader-settings.js";
import { ComponentState } from "../reader/dto/component-state.js";
import { GenerateService } from "../reader/service/core/generate-service.js";



import { TokenOwnerPageRepository } from "../reader/repository/token-owner-page-repository.js"
import { TokenOwnerPageRepositoryNodeImpl } from "../reader/repository/node/token-owner-page-repository-impl.js"
import { SpawnService } from "../sync/service/spawn-service.js"

import { RowItemViewModelRepository } from "../reader/repository/row-item-view-model-repository.js"
import { RowItemViewModel } from "../reader/dto/item-page.js"



let container:Container

function getMainContainer(command:GetMainContainerCommand) {

  if (container) return container
  
  container = command.customContainer
  
  container.bind("pluginModules").toConstantValue([])
  container.bind("PouchDB").toConstantValue(() => {
    return {}
  })
  
  container.bind("framework7").toConstantValue({})
  container.bind("baseURI").toConstantValue(command.baseURI)
  container.bind("hostname").toConstantValue(command.hostname)

  container.bind("channelDir").toConstantValue(command.channelDir)
  container.bind("sharp").toConstantValue(sharp)

  container.bind("provider").toConstantValue(() => {
  })


  let sequelize

  container.bind('sequelize').toConstantValue(async (channelDir, channelId) => {
    return
  })

  container.bind("ethers").toConstantValue(async () => {
    return ethers
  })



  container.bind<WalletService>("WalletService").to(WalletServiceImpl).inSingletonScope()

  container.bind<ChannelRepository>("ChannelRepository").to(ChannelRepositoryNodeImpl).inSingletonScope()
  container.bind<ItemRepository>("ItemRepository").to(ItemRepositoryNodeImpl).inSingletonScope()
  container.bind<AuthorRepository>("AuthorRepository").to(AuthorRepositoryNodeImpl).inSingletonScope()
  container.bind<ImageRepository>("ImageRepository").to(ImageRepositoryNodeImpl).inSingletonScope()
  container.bind<AnimationRepository>("AnimationRepository").to(AnimationRepositoryNodeImpl).inSingletonScope()
  container.bind<StaticPageRepository>("StaticPageRepository").to(StaticPageRepositoryNodeImpl).inSingletonScope()
  container.bind<ItemPageRepository>("ItemPageRepository").to(ItemPageRepositoryNodeImpl).inSingletonScope()
  container.bind<AttributeTotalRepository>("AttributeTotalRepository").to(AttributeTotalRepositoryNodeImpl).inSingletonScope()


  container.bind<TokenOwnerPageRepository>("TokenOwnerPageRepository").to(TokenOwnerPageRepositoryNodeImpl).inSingletonScope()


  container.bind<ReaderSettingsRepository>("ReaderSettingsRepository").toConstantValue({
    get: function (): Promise<ReaderSettings> {
      throw new Error("Function not implemented.");
    },
    put: function (readerSettings: ReaderSettings): Promise<void> {
      throw new Error("Function not implemented.");
    }
  })

  // container.bind<ERCEventRepository>("ERCEventRepository").to(ERCEventRepositoryNodeImpl).inSingletonScope()
  // container.bind<ContractStateRepository>("ContractStateRepository").to(ContractStateRepositoryNodeImpl).inSingletonScope()

  container.bind<ComponentStateRepository>("ComponentStateRepository").toConstantValue({
    get: function (_id: string): Promise<ComponentState> {
      throw new Error("Function not implemented.");
    },
    put: function (componentState: ComponentState): Promise<void> {
      throw new Error("Function not implemented.");
    }
  })

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


  container.bind<SchemaService>("SchemaService").to(SchemaService).inSingletonScope()
  container.bind<DatabaseService>("DatabaseService").to(DatabaseService).inSingletonScope()


  container.bind<ChannelWebService>("ChannelWebService").to(ChannelWebService).inSingletonScope()
  container.bind<ItemWebService>("ItemWebService").to(ItemWebService).inSingletonScope()
  container.bind<AuthorWebService>("AuthorWebService").to(AuthorWebService).inSingletonScope()

  container.bind<StaticPageService>("StaticPageService").to(StaticPageService).inSingletonScope()
  container.bind<ItemPageService>("ItemPageService").to(ItemPageService).inSingletonScope()

  container.bind<PagingService>("PagingService").to(PagingService).inSingletonScope()
  container.bind<AnimationService>("AnimationService").to(AnimationService).inSingletonScope()

  container.bind<ImageService>("ImageService").to(ImageService).inSingletonScope()
  container.bind<ItemService>("ItemService").to(ItemService).inSingletonScope()
  container.bind<ChannelService>("ChannelService").to(ChannelService).inSingletonScope()
  container.bind<AuthorService>("AuthorService").to(AuthorService).inSingletonScope()
  container.bind<UiService>("UiService").to(UiService).inSingletonScope()
  container.bind<QueueService>("QueueService").to(QueueService).inSingletonScope()
  container.bind<ImageGeneratorService>("ImageGeneratorService").to(ImageGeneratorService).inSingletonScope()

  container.bind<ReaderSettingsService>("ReaderSettingsService").to(ReaderSettingsService).inSingletonScope()

  container.bind<ERCEventService>("ERCEventService").to(ERCEventService).inSingletonScope()
  container.bind<AttributeTotalService>("AttributeTotalService").to(AttributeTotalService).inSingletonScope()
  container.bind<ComponentStateService>("ComponentStateService").to(ComponentStateService).inSingletonScope()
  container.bind<ReaderSettingsService>("ReaderSettingsService").to(ReaderSettingsService).inSingletonScope()

  container.bind<QuillService>("QuillService").to(QuillService).inSingletonScope()
  container.bind<GenerateService>("GenerateService").to(GenerateService).inSingletonScope()

  container.bind<SpawnService>("SpawnService").to(SpawnService).inSingletonScope()



  return container
}

interface GetMainContainerCommand {
  customContainer:Container
  baseURI:string
  hostname:string
  channelDir:string
  runDir:string
  alchemy:string
}

export {
  getMainContainer, container, GetMainContainerCommand
}
