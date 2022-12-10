import { Container } from "inversify";

// import PouchDB from 'pouchdb-node';
import { AnimationRepository } from "./repository/animation-repository.js";
import { AttributeTotalRepository } from "./repository/attribute-total-repository.js";
import { AuthorRepository } from "./repository/author-repository.js";
import { ChannelRepository } from "./repository/channel-repository.js";
import { ComponentStateRepository } from "./repository/component-state-repository.js";
import { ContractStateRepository } from "./repository/contract-state-repository.js";
import { ERCEventRepository } from "./repository/erc-event-repository.js";
import { ImageRepository } from "./repository/image-repository.js";
import { ItemPageRepository } from "./repository/item-page-repository.js";
import { ItemRepository } from "./repository/item-repository.js";
import { AnimationRepositoryNodeImpl } from "./repository/node/animation-repository-impl.js";
import { AttributeTotalRepositoryNodeImpl } from "./repository/node/attribute-total-repository-impl.js";
import { AuthorRepositoryNodeImpl } from "./repository/node/author-repository-impl.js";
import { ChannelRepositoryNodeImpl } from "./repository/node/channel-repository-impl.js";
import { ImageRepositoryNodeImpl } from "./repository/node/image-repository-impl.js";
import { ItemPageRepositoryNodeImpl } from "./repository/node/item-page-repository-impl.js";
import { ItemRepositoryNodeImpl } from "./repository/node/item-repository-impl.js";
import { StaticPageRepositoryNodeImpl } from "./repository/node/static-page-repository-impl.js";
import { ReaderSettingsRepository } from "./repository/reader-settings-repository.js";
import { StaticPageRepository } from "./repository/static-page-repository.js";
import { AnimationService } from "./service/animation-service.js";
import { AttributeTotalService } from "./service/attribute-total-service.js";
import { AuthorService } from "./service/author-service.js";
import { ChannelService } from "./service/channel-service.js";
import { ContractStateService } from "./service/contract-state-service.js";
import { ComponentStateService } from "./service/core/component-state-service.js";
import { DatabaseService } from "./service/core/database-service.js";
import { ImageGeneratorService } from "./service/core/image-generator-service.js";
import { PagingService } from "./service/core/paging-service.js";
import { QueueService } from "./service/core/queue-service.js";
import { QuillService } from "./service/core/quill-service.js";
import { SchemaService } from "./service/core/schema-service.js";
import { TransactionIndexerService } from "./service/core/transaction-indexer-service.js";
import { UiService } from "./service/core/ui-service.js";
import { WalletService } from "./service/core/wallet-service.js";
import { WalletServiceImpl } from "./service/core/wallet-service-impl.js";
import { ERCEventService } from "./service/erc-event-service.js";
import { ImageService } from "./service/image-service.js";
import { ItemPageService } from "./service/item-page-service.js";
import { ItemService } from "./service/item-service.js";
import { ReaderSettingsService } from "./service/reader-settings-service.js";
import { StaticPageService } from "./service/static-page-service.js";
import { AuthorWebService } from "./service/web/author-web-service.js";
import { ChannelWebService } from "./service/web/channel-web-service.js";
import { ItemWebService } from "./service/web/item-web-service.js";
import { SearchbarService } from "./service/web/searchbar-service.js";
import { ReaderSettings } from "./dto/reader-settings.js";
import { ERCEvent } from "./dto/erc-event.js";
import { ContractState } from "./dto/contract-state.js";
import { ComponentState } from "./dto/component-state.js";
import { ethers, providers } from "ethers"
import { GenerateService } from "./service/core/generate-service.js";


let container:Container

function getMainContainer(command:GetMainContainerCommand) {

  if (container) return container

  container = command.customContainer
  
  container.bind("framework7").toConstantValue({})
  container.bind("baseURI").toConstantValue(command.baseURI)
  container.bind("hostname").toConstantValue(command.hostname)

  container.bind("baseDir").toConstantValue(command.baseDir)

  container.bind("provider").toConstantValue(() => {

    if (command.alchemy) {
      return new ethers.providers.AlchemyProvider("mainnet", command.alchemy)
    }

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



  container.bind<ReaderSettingsRepository>("ReaderSettingsRepository").toConstantValue({
    get: function (): Promise<ReaderSettings> {
      throw new Error("Function not implemented.");
    },
    put: function (readerSettings: ReaderSettings): Promise<void> {
      throw new Error("Function not implemented.");
    }
  })

  container.bind<ERCEventRepository>("ERCEventRepository").toConstantValue({
    get: function (_id: string): Promise<ERCEvent> {
      throw new Error("Function not implemented.");
    },
    put: function (ercEvent: ERCEvent): Promise<void> {
      throw new Error("Function not implemented.");
    },
    getByTokenId: function (tokenId: number, limit: number, skip: number): Promise<ERCEvent[]> {
      throw new Error("Function not implemented.");
    },
    list: function (limit: number, skip: number): Promise<ERCEvent[]> {
      throw new Error("Function not implemented.");
    }
  })


  container.bind<ContractStateRepository>("ContractStateRepository").toConstantValue({
    get: function (_id: string): Promise<ContractState> {
      throw new Error("Function not implemented.");
    },
    put: function (contractState: ContractState): Promise<void> {
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

  container.bind<SchemaService>("SchemaService").to(SchemaService).inSingletonScope()
  // container.bind<DatabaseService>("DatabaseService").to(DatabaseService).inSingletonScope()


  container.bind<ChannelWebService>("ChannelWebService").to(ChannelWebService).inSingletonScope()
  container.bind<ItemWebService>("ItemWebService").to(ItemWebService).inSingletonScope()
  container.bind<AuthorWebService>("AuthorWebService").to(AuthorWebService).inSingletonScope()
  container.bind<SearchbarService>("SearchbarService").to(SearchbarService).inSingletonScope()

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
  container.bind<TransactionIndexerService>("TransactionIndexerService").to(TransactionIndexerService).inSingletonScope()

  container.bind<ContractStateService>("ContractStateService").to(ContractStateService).inSingletonScope()
  container.bind<ERCEventService>("ERCEventService").to(ERCEventService).inSingletonScope()
  container.bind<AttributeTotalService>("AttributeTotalService").to(AttributeTotalService).inSingletonScope()
  container.bind<ComponentStateService>("ComponentStateService").to(ComponentStateService).inSingletonScope()
  container.bind<ReaderSettingsService>("ReaderSettingsService").to(ReaderSettingsService).inSingletonScope()

  container.bind<QuillService>("QuillService").to(QuillService).inSingletonScope()
  container.bind<GenerateService>("GenerateService").to(GenerateService).inSingletonScope()

  //@ts-ignore
  container.bind<DatabaseService>("DatabaseService").toConstantValue({})
  
  return container
}

interface GetMainContainerCommand {
  customContainer:Container
  baseURI:string
  hostname:string
  baseDir:string
  alchemy:string
}

export {
  getMainContainer, container, GetMainContainerCommand
}
