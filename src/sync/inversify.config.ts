import { Container } from "inversify";

import { AnimationRepository } from "../reader/repository/animation-repository.js";
import { AttributeTotalRepository } from "../reader/repository/attribute-total-repository.js";
import { AuthorRepository } from "../reader/repository/author-repository.js";
import { ChannelRepository } from "../reader/repository/channel-repository.js";
import { ComponentStateRepository } from "../reader/repository/component-state-repository.js";
import { ContractStateRepository } from "./repository/contract-state-repository.js";
// import { ERCEventRepository } from "./repository/erc-event-repository.js";
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
import { ContractStateService } from "../sync/service/contract-state-service.js";
import { ComponentStateService } from "../reader/service/core/component-state-service.js";
import { DatabaseService } from "../reader/service/core/database-service.js";
import { ImageGeneratorService } from "../reader/service/core/image-generator-service.js";
import { PagingService } from "../reader/service/core/paging-service.js";
import { QueueService } from "../reader/service/core/queue-service.js";
import { QuillService } from "../reader/service/core/quill-service.js";
import { SchemaService } from "../reader/service/core/schema-service.js";
import { TransactionIndexerService } from "./service/transaction-indexer-service.js";
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
import { SearchbarService } from "../reader/service/web/searchbar-service.js";
import { ReaderSettings } from "../reader/dto/reader-settings.js";
import { ComponentState } from "../reader/dto/component-state.js";
import { ethers, providers } from "ethers"
import { GenerateService } from "../reader/service/core/generate-service.js";
// import { ERCEventRepositoryNodeImpl } from "./repository/node/erc-event-repository-impl.js";
import { ContractStateRepositoryNodeImpl } from "./repository/node/contract-state-repository-impl.js";
import { TokenOwnerRepository } from "./repository/token-owner-repository.js";
import { TokenOwnerRepositoryNodeImpl } from "./repository/node/token-owner-repository-impl.js";
import { TokenOwnerService } from "../sync/service/token-owner-service.js";
import { TransactionRepositoryNodeImpl } from "./repository/node/transaction-repository-impl.js";
import { TransactionRepository } from "./repository/transaction-repository.js";
import { TransactionService } from "../sync/service/transaction-service.js";
import { BlockRepository } from "./repository/block-repository.js";
import { BlockService } from "./service/block-service.js";
// import { TokenOwnerPageRepositoryNodeImpl } from "../reader/repository/node/token-owner-page-repository-impl.js";
// import { TokenOwnerPageRepository } from "../reader/repository/token-owner-page-repository.js";
import { TokenOwnerPageService } from "../sync/service/token-owner-page-service.js";
import { TokenService } from "../sync/service/token-service.js";
import { TokenRepository } from "./repository/token-repository.js";
import { TokenRepositoryNodeImpl } from "./repository/node/token-repository-impl.js";
import { ProcessedTransactionRepositoryNodeImpl } from "./repository/node/processed-transaction-repository-impl.js";
import { ProcessedTransactionService } from "../sync/service/processed-transaction-service.js";
import { ENSService } from "../sync/service/ens-service.js";
import { ENSRepository } from "./repository/ens-repository.js";
import { ENSRepositoryNodeImpl } from "./repository/node/ens-repository-impl.js";
import { BlockRepositoryNodeImpl } from "./repository/node/block-repository-impl.js";
import { ProcessedTransactionRepository } from "./repository/processed-transaction-repository.js";

import { Block } from "./dto/block.js";
import { ContractState } from "./dto/contract-state.js";
import { ProcessedEvent, ProcessedTransaction, ProcessedTransactionToken } from "./dto/processed-transaction.js";
import { TokenOwner } from "./dto/token-owner.js";
import { Token } from "./dto/token.js";
import { Transaction } from "./dto/transaction.js";

import { createRequire } from 'module'
import { ENS } from "./dto/ens.js";
import { TokenOwnerPageRepository } from "../reader/repository/token-owner-page-repository.js";
import { TokenOwnerPageRepositoryNodeImpl } from "../reader/repository/node/token-owner-page-repository-impl.js";


const require = createRequire(import.meta.url)
const { Sequelize } = require('sequelize-typescript')


let container:Container

function getMainContainer(command:GetMainContainerCommand) {

  if (container) return container


  
  container = command.customContainer
  
  container.bind("PouchDB").toConstantValue({})
  container.bind("framework7").toConstantValue({})
  container.bind("baseURI").toConstantValue(command.baseURI)
  container.bind("hostname").toConstantValue(command.hostname)

  container.bind("baseDir").toConstantValue(command.baseDir)






  container.bind("provider").toConstantValue(() => {


    if (command.alchemy) {

      return new ethers.providers.StaticJsonRpcProvider({
        url: `https://eth-mainnet.alchemyapi.io/v2/${command.alchemy}`,
        skipFetchSetup: true
       });
    
    }

  })


  let sequelize

  container.bind('sequelize').toConstantValue(async (baseDir, channelId) => {

    if (sequelize) {
      return sequelize
    }

    //@ts-ignore
    sequelize = new Sequelize({
      logging: false,
      database: channelId,
      dialect: 'sqlite',
      storage: `${baseDir}/sync/data.sqlite`,
      transactionType: "IMMEDIATE",
      models: [Block, ContractState, ProcessedTransaction, ProcessedEvent, ProcessedTransactionToken, TokenOwner, Token, Transaction, ENS]
    })


    await sequelize.sync()

    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    return sequelize

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
  container.bind<TokenOwnerRepository>("TokenOwnerRepository").to(TokenOwnerRepositoryNodeImpl).inSingletonScope()
  container.bind<TransactionRepository>("TransactionRepository").to(TransactionRepositoryNodeImpl).inSingletonScope()
  container.bind<ProcessedTransactionRepository>("ProcessedTransactionRepository").to(ProcessedTransactionRepositoryNodeImpl).inSingletonScope()

  container.bind<BlockRepository>("BlockRepository").to(BlockRepositoryNodeImpl).inSingletonScope()
  container.bind<TokenOwnerPageRepository>("TokenOwnerPageRepository").to(TokenOwnerPageRepositoryNodeImpl).inSingletonScope()
  container.bind<TokenRepository>("TokenRepository").to(TokenRepositoryNodeImpl).inSingletonScope()

  container.bind<ENSRepository>("ENSRepository").to(ENSRepositoryNodeImpl).inSingletonScope()


  container.bind<ReaderSettingsRepository>("ReaderSettingsRepository").toConstantValue({
    get: function (): Promise<ReaderSettings> {
      throw new Error("Function not implemented.");
    },
    put: function (readerSettings: ReaderSettings): Promise<void> {
      throw new Error("Function not implemented.");
    }
  })

  // container.bind<ERCEventRepository>("ERCEventRepository").to(ERCEventRepositoryNodeImpl).inSingletonScope()
  container.bind<ContractStateRepository>("ContractStateRepository").to(ContractStateRepositoryNodeImpl).inSingletonScope()

  container.bind<ComponentStateRepository>("ComponentStateRepository").toConstantValue({
    get: function (_id: string): Promise<ComponentState> {
      throw new Error("Function not implemented.");
    },
    put: function (componentState: ComponentState): Promise<void> {
      throw new Error("Function not implemented.");
    }
  })

  container.bind<SchemaService>("SchemaService").to(SchemaService).inSingletonScope()
  container.bind<DatabaseService>("DatabaseService").to(DatabaseService).inSingletonScope()


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
  container.bind<TokenOwnerService>("TokenOwnerService").to(TokenOwnerService).inSingletonScope()

  container.bind<TransactionService>("TransactionService").to(TransactionService).inSingletonScope()
  container.bind<ProcessedTransactionService>("ProcessedTransactionService").to(ProcessedTransactionService).inSingletonScope()

  container.bind<BlockService>("BlockService").to(BlockService).inSingletonScope()
  container.bind<TokenOwnerPageService>("TokenOwnerPageService").to(TokenOwnerPageService).inSingletonScope()
  container.bind<TokenService>("TokenService").to(TokenService).inSingletonScope()
  container.bind<ENSService>("ENSService").to(ENSService).inSingletonScope()

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
