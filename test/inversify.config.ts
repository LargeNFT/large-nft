import "core-js/stable"
import "regenerator-runtime/runtime"
import "reflect-metadata"

import { Container } from "inversify";


import { HardhatWalletServiceImpl } from "./util/hardhat-wallet-service.js";
import { AuthorService } from "../src/admin/service/author-service.js";
import { ChannelService } from "../src/admin/service/channel-service.js";
import { ChannelWebService } from "../src/admin/service/web/channel-web-service.js";
import { ItemWebService } from "../src/admin/service/web/item-web-service.js";

import { ImageService } from "../src/admin/service/image-service.js";
import { ItemService } from "../src/admin/service/item-service.js";
import { QuillService } from "../src/admin/service/quill-service.js";


import { IpfsService } from "../src/admin/service/core/ipfs-service.js";

import fs from 'fs';
// import git from "isomorphic-git"


import { DatabaseService } from "../src/admin/service/core/database-service.js";
import { SettingsService } from "../src/admin/service/core/settings-service.js";
import { GitService } from "../src/admin/service/core/git-service.js";

import { ChannelRepository } from "../src/admin/repository/channel-repository.js";

import { StaticPageRepository } from "../src/admin/repository/static-page-repository.js";

import { ItemRepository } from "../src/admin/repository/item-repository.js";
import { ImageRepository } from "../src/admin/repository/image-repository.js";
import { AuthorRepository } from "../src/admin/repository/author-repository.js";

import { SchemaService } from "../src/admin/service/core/schema-service.js";
import { WalletService } from "../src/admin/service/core/wallet-service.js";
import { ExportService } from "../src/admin/service/core/export-service.js";

import { StaticPageService } from "../src/admin/service/static-page-service.js";



import TYPES from "../src/admin/service/core/types.js";
import { SettingsRepository } from "../src/admin/repository/settings-repository.js";
import { QueryCacheService } from '../src/admin/service/core/query-cache-service.js';

import { PublishService } from "../src/admin/service/core/publish-service.js";
import { AnimationService } from "../src/admin/service/animation-service.js";
import { AnimationRepository } from "../src/admin/repository/animation-repository.js";
import { SvgService } from "../src/admin/service/svg-service.js";
import { ImportService } from "../src/admin/service/core/import-service.js";
import { ThemeRepository } from "../src/admin/repository/theme-repository.js";
import { ThemeService } from "../src/admin/service/theme-service.js";
import { PDFService } from "../src/admin/service/core/pdf-service.js";
import { UploadService } from "../src/admin/service/core/upload-service.js";
import { ERCEventService } from "../src/admin/service/core/erc-event-service.js";
import { TokenMetadataCacheRepository } from "../src/admin/repository/token-metadata-cache-repository.js";
import { QueryCacheRepository } from "../src/admin/repository/query-cache-repository.js";


import { AttributeCountRepository } from '../src/admin/repository/attribute-count-repository.js'
import { AttributeCountService } from '../src/admin/service/attribute-count-service.js'


import hre from "hardhat"


import PouchDB from 'pouchdb-node';
import PouchFind from 'pouchdb-find'

// //Enable find plugin
PouchDB.plugin(PouchFind)

import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime.js'
dayjs.extend(relativeTime)

import localizedFormat from 'dayjs/plugin/localizedFormat.js'
dayjs.extend(localizedFormat)

let container:Container

//@ts-ignore
import c from '../contracts.json' assert { type: "json" }
import { GitlabService } from "../src/admin/service/core/gitlab-service.js";
import { GithubService } from "../src/admin/service/core/github-service.js";
import { Channel } from "../src/admin/dto/channel.js";
import { OriginalMetadataService } from "../src/admin/service/original-metadata-service.js";
import { OriginalMetadataRepository } from "../src/admin/repository/original-metadata-repository.js";


import { createHelia } from 'helia'

import { FsBlockstore } from 'blockstore-fs'
import { FsDatastore } from 'datastore-fs'
import { CarService } from "../src/admin/service/car-service.js";
import { CarRepository } from "../src/admin/repository/car-repository.js";

async function getContainer() {

    if (container) return container

    container = new Container()

    function contracts() {    
        return c
    }

    container.bind("contracts").toConstantValue(contracts())

    container.bind("provider").toConstantValue(() => {

        //@ts-ignore
        const ethers = hre.ethers

        return ethers.provider 
    
    })
    


    container.bind("pouch-prefix").toConstantValue("./test/pouch/")

    container.bind("PouchDB").toConstantValue(() => {
        return PouchDB
    })

    container.bind("fs").toConstantValue(() => {
        return fs
    })
    
    container.bind("git").toConstantValue({})


    //@ts-ignore
    container.bind(GitService).toConstantValue({

        //@ts-ignore
        init: function (channel: Channel): Promise<void> {
        },

        //@ts-ignore
        initFS: function(channel: Channel) : Promise<void> {

        },

        //@ts-ignore
        getBaseDir: function(channel:Channel) : Promise<void> {
            
        },

        //@ts-ignore
        writeFile: function(file) : Promise<void> {
            
        }
    })

    container.bind("dayjs").toConstantValue(dayjs)

    let helia 

    container.bind("helia").toConstantValue( async () => {
  
      if (helia) return helia
  
      const blockstore = new FsBlockstore('./test/ipfs/blockstore')
      const datastore = new FsDatastore('./test/ipfs/datastore')
      
      helia = await createHelia({
        blockstore: blockstore,
        datastore: datastore
      })
      
      return helia
  
    })


    container.bind(DatabaseService).toSelf().inSingletonScope()
    container.bind(SchemaService).toSelf().inSingletonScope()

    //@ts-ignore
    container.bind<WalletService>(TYPES.WalletService).to(HardhatWalletServiceImpl).inSingletonScope()

    container.bind(GitlabService).toSelf().inSingletonScope()
    container.bind(GithubService).toSelf().inSingletonScope()

    container.bind(ImageService).toSelf().inSingletonScope()
    container.bind(AuthorService).toSelf().inSingletonScope()
    container.bind(ChannelService).toSelf().inSingletonScope()
    container.bind(IpfsService).toSelf().inSingletonScope()
    container.bind(ItemService).toSelf().inSingletonScope()
    container.bind(QuillService).toSelf().inSingletonScope()
    container.bind(PublishService).toSelf().inSingletonScope()
    container.bind(AnimationService).toSelf().inSingletonScope()
    container.bind(SvgService).toSelf().inSingletonScope()
    container.bind(ImportService).toSelf().inSingletonScope()
    container.bind(ThemeService).toSelf().inSingletonScope()
    container.bind(StaticPageService).toSelf().inSingletonScope()
    container.bind(PDFService).toSelf().inSingletonScope()
    container.bind(UploadService).toSelf().inSingletonScope()
    container.bind(ERCEventService).toSelf().inSingletonScope()
    container.bind(QueryCacheService).toSelf().inSingletonScope()
    container.bind(ExportService).toSelf().inSingletonScope()
    container.bind(SettingsService).toSelf().inSingletonScope()
    container.bind(AttributeCountService).toSelf().inSingletonScope()
    container.bind(ChannelWebService).toSelf().inSingletonScope()
    container.bind(ItemWebService).toSelf().inSingletonScope()
    container.bind(OriginalMetadataService).toSelf().inSingletonScope()
    container.bind(CarService).toSelf().inSingletonScope()

    // container.bind(GitService).toSelf().inSingletonScope()


    container.bind(ChannelRepository).toSelf().inSingletonScope()
    container.bind(ItemRepository).toSelf().inSingletonScope()
    container.bind(ImageRepository).toSelf().inSingletonScope()
    container.bind(AuthorRepository).toSelf().inSingletonScope()
    container.bind(SettingsRepository).toSelf().inSingletonScope()
    container.bind(AnimationRepository).toSelf().inSingletonScope()
    container.bind(ThemeRepository).toSelf().inSingletonScope()
    container.bind(StaticPageRepository).toSelf().inSingletonScope()
    container.bind(TokenMetadataCacheRepository).toSelf().inSingletonScope()
    container.bind(QueryCacheRepository).toSelf().inSingletonScope()
    container.bind(AttributeCountRepository).toSelf().inSingletonScope()
    container.bind(OriginalMetadataRepository).toSelf().inSingletonScope()
    container.bind(CarRepository).toSelf().inSingletonScope()


    //Spin up local IPFS
    container.bind("ipfsInit").toConstantValue( async () => {

        // const IPFS = await Function('return import("ipfs")')() as Promise<typeof import('ipfs')>

        // //@ts-ignore
        // return IPFS.create({
        //     repo: '../test/test-repo'
        // })
    })


    //Use external IPFS
    // container.bind("ipfsInit").toConstantValue( async () => {

    //     let url = "http://localhost:5001/api/v0"

    //     const IPFS = await Function('return import("ipfs-http-client")')() as Promise<typeof import('ipfs-http-client')>

    //     //@ts-ignore
    //     return IPFS.create({ url: url })
    // })



    container.bind("ipfsRemoteInit").toConstantValue( async (url) => {
    })

    await cleanup()

    let ipfsService:IpfsService = container.get(IpfsService)
    let walletService:WalletService = container.get<WalletService>(TYPES.WalletService);   

    
    // await ipfsService.init()
    await walletService.initWallet()

    globalThis.container = container

    return container
}

const cleanup = async () => {
    
    fs.rmSync('./test/pouch', { recursive: true, force: true })
    fs.rmSync('./test/test-repo', { recursive: true, force: true })

    fs.mkdirSync('./test/pouch', { recursive: true })
    fs.mkdirSync('./test/test-repo', { recursive: true })

}


export {
    getContainer, cleanup
}