import { Container } from "inversify";
import { ChannelRepository } from "./repository/channel-repository.js";
import { ChannelService } from "./service/channel-service.js";
import { DatabaseService } from "./service/core/database-service.js";
import { PublishService } from "./service/core/publish-service.js";

import PouchDB from 'pouchdb-node';
import PouchFind from 'pouchdb-find'

import { ImageService } from "./service/image-service.js";
import { ThemeService } from "./service/theme-service.js";
import { SvgService } from "./service/svg-service.js";
import { QuillService } from "./service/quill-service.js";
import { ThemeRepository } from "./repository/theme-repository.js";
import { AnimationRepository } from "./repository/animation-repository.js";
import { ItemRepository } from "./repository/item-repository.js";
import { ImageRepository } from "./repository/image-repository.js";
import { AuthorRepository } from "./repository/author-repository.js";
import { StaticPageRepository } from "./repository/static-page-repository.js";
import { TokenMetadataCacheRepository } from "./repository/token-metadata-cache-repository.js";
import { StaticPageService } from "./service/static-page-service.js";
import { ItemService } from "./service/item-service.js";
import { AnimationService } from "./service/animation-service.js";
import { AuthorService } from "./service/author-service.js";
import { WalletServiceImpl } from "./service/core/wallet-service-impl.js";
import TYPES from "./service/core/types.js";
import { WalletService } from "./service/core/wallet-service.js";

//@ts-ignore
import c from '../../contracts.json' assert { type: "json" }
import { QueryCacheService } from "./service/core/query-cache-service.js";
// import { GitService } from "./service/core/git-service.js";
// import { GitlabService } from "./service/core/gitlab-service.js";
// import { GithubService } from "./service/core/github-service.js";
import { QueryCacheRepository } from "./repository/query-cache-repository.js";
import { IpfsService } from "./service/core/ipfs-service.js";
import { SettingsService } from "./service/core/settings-service.js";
import { SettingsRepository } from "./repository/settings-repository.js";
import { SchemaService } from "./service/core/schema-service.js";
import { AttributeCountService } from "./service/attribute-count-service.js";
import { AttributeCountRepository } from "./repository/attribute-count-repository.js";
import { ExportService } from "./service/core/export-service.js";

import { create } from 'ipfs-http-client'
import { OriginalMetadataService } from "./service/original-metadata-service.js";
import { OriginalMetadataRepository } from "./repository/original-metadata-repository.js";

// Enable find plugin
PouchDB.plugin(PouchFind)


let container: Container


function getMainContainer() {

  if (container) return container

  container = new Container()


  function contracts() {
    return c
  }
  container.bind("framework7").toConstantValue({})

  container.bind("version").toConstantValue("")

  container.bind("provider").toConstantValue(() => {


  })

  container.bind("contracts").toConstantValue(contracts())
  // container.bind("name").toConstantValue("Large")
  
  container.bind("PouchDB").toConstantValue(() => {
    return PouchDB
  })
  
  container.bind("pouch-prefix").toConstantValue("./data/pouch/importer")

  // container.bind("footer-text").toConstantValue(globalThis.footerText)


  container.bind(IpfsService).toSelf().inSingletonScope()
  container.bind(DatabaseService).toSelf().inSingletonScope()
  container.bind(SchemaService).toSelf().inSingletonScope()

  container.bind(ExportService).toSelf().inSingletonScope()
  container.bind(PublishService).toSelf().inSingletonScope()

  container.bind(AttributeCountService).toSelf().inSingletonScope()

  container.bind<WalletService>(TYPES.WalletService).to(WalletServiceImpl).inSingletonScope()

  container.bind(AnimationService).toSelf().inSingletonScope()
  container.bind(AuthorService).toSelf().inSingletonScope()
  container.bind(ChannelService).toSelf().inSingletonScope()
  container.bind(ImageService).toSelf().inSingletonScope()
  container.bind(ItemService).toSelf().inSingletonScope()
  container.bind(SvgService).toSelf().inSingletonScope()
  // container.bind(ImportService).toSelf().inSingletonScope()
  container.bind(ThemeService).toSelf().inSingletonScope()
  container.bind(StaticPageService).toSelf().inSingletonScope()
  container.bind(QueryCacheService).toSelf().inSingletonScope()
  container.bind(QuillService).toSelf().inSingletonScope()
  container.bind(SettingsService).toSelf().inSingletonScope()
  container.bind(OriginalMetadataService).toSelf().inSingletonScope()

  // container.bind(GitService).toSelf().inSingletonScope()
  // container.bind(GitlabService).toSelf().inSingletonScope()
  // container.bind(GithubService).toSelf().inSingletonScope()
  // container.bind(ERCEventService).toSelf().inSingletonScope()

  // container.bind(ChannelWebService).toSelf().inSingletonScope()
  // container.bind(ItemWebService).toSelf().inSingletonScope()

  container.bind(AnimationRepository).toSelf().inSingletonScope()
  container.bind(ChannelRepository).toSelf().inSingletonScope()
  container.bind(ItemRepository).toSelf().inSingletonScope()
  container.bind(ImageRepository).toSelf().inSingletonScope()
  container.bind(AuthorRepository).toSelf().inSingletonScope()
  container.bind(SettingsRepository).toSelf().inSingletonScope()
  container.bind(ThemeRepository).toSelf().inSingletonScope()
  container.bind(StaticPageRepository).toSelf().inSingletonScope()
  container.bind(TokenMetadataCacheRepository).toSelf().inSingletonScope()
  container.bind(QueryCacheRepository).toSelf().inSingletonScope()
  container.bind(AttributeCountRepository).toSelf().inSingletonScope()
  container.bind(OriginalMetadataRepository).toSelf().inSingletonScope()


  container.bind("ipfsRemoteInit").toConstantValue( async (url) => {
    if (!url) return
    return create('/ip4/127.0.0.1/tcp/5001')
  })


  //Attach container to window so we can easily access it from the browser console
  globalThis.container = container

  return container
}



export {
  getMainContainer, container
}