import "core-js/stable"
import "regenerator-runtime/runtime"
import "reflect-metadata"

import { Container } from "inversify";
import { providers } from "ethers"


import { HardhatWalletServiceImpl } from "../test/util/hardhat-wallet-service";

import { AuthorService } from "../src/service/author-service";
import { ChannelService } from "../src/service/channel-service";
import { ImageService } from "../src/service/image-service";
import { ItemService } from "../src/service/item-service";
import { QuillService } from "../src/service/quill-service";


import { IpfsService } from "../src/service/core/ipfs-service";

import fs from 'fs';
import git from "isomorphic-git"


import { DatabaseService } from "../src/service/core/database-service";
import { SettingsService } from "../src/service/core/settings-service";

import { ChannelRepository } from "../src/repository/channel-repository";
import { PinningApiRepository } from "../src/repository/pinning-api-repository";

import { StaticPageRepository } from "../src/repository/static-page-repository";

import { ItemRepository } from "../src/repository/item-repository";
import { ImageRepository } from "../src/repository/image-repository";
import { AuthorRepository } from "../src/repository/author-repository";

import { SchemaService } from "../src/service/core/schema-service";
import { WalletService } from "../src/service/core/wallet-service";
import { PinningService } from "../src/service/core/pinning-service";
import { ExportService } from "../src/service/core/export-service";

import { StaticPageService } from "../src/service/static-page-service";



import TYPES from "../src/service/core/types";
import { SettingsRepository } from "../src/repository/settings-repository";
import { QueryCacheService } from '../src/service/core/query-cache-service';

import { PublishService } from "../src/service/core/publish-service";
import { AnimationService } from "../src/service/animation-service";
import { AnimationRepository } from "../src/repository/animation-repository";
import { SvgService } from "../src/service/svg-service";
import { ImportService } from "../src/service/core/import-service";
import { ThemeRepository } from "../src/repository/theme-repository";
import { ThemeService } from "../src/service/theme-service";
import { PDFService } from "../src/service/core/pdf-service";
import { UploadService } from "../src/service/core/upload-service";
import { ERCEventService } from "../src/service/core/erc-event-service";
import { TokenMetadataCacheRepository } from "../src/repository/token-metadata-cache-repository";




let container:Container

async function getContainer() {

    if (container) return container

    container = new Container()

    function provider() {

        //@ts-ignore
        return new providers.Web3Provider(web3.currentProvider)  
    }

    function ipfsOptions() {
        return {
            repo: '../test/test-repo'
        }
    }


    function contracts() {

        const c = require('../contracts.json')
    
        return c
      }

    container.bind("contracts").toConstantValue(contracts())

    container.bind("provider").toConstantValue(provider())
    container.bind("pouch-prefix").toConstantValue("./test/pouch/")
    container.bind("fs").toConstantValue(() => {
        return fs
    })
    
    container.bind("git").toConstantValue(git)


    container.bind(DatabaseService).toSelf().inSingletonScope()
    container.bind(SchemaService).toSelf().inSingletonScope()

    container.bind<WalletService>(TYPES.WalletService).to(HardhatWalletServiceImpl).inSingletonScope();



    container.bind(ImageService).toSelf().inSingletonScope()
    container.bind(AuthorService).toSelf().inSingletonScope()
    container.bind(ChannelService).toSelf().inSingletonScope()
    container.bind(IpfsService).toSelf().inSingletonScope()
    container.bind(ItemService).toSelf().inSingletonScope()
    container.bind(QuillService).toSelf().inSingletonScope()
    container.bind(PinningService).toSelf().inSingletonScope()
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


    container.bind(ChannelRepository).toSelf().inSingletonScope()
    container.bind(ItemRepository).toSelf().inSingletonScope()
    container.bind(ImageRepository).toSelf().inSingletonScope()
    container.bind(AuthorRepository).toSelf().inSingletonScope()
    container.bind(PinningApiRepository).toSelf().inSingletonScope()
    container.bind(SettingsRepository).toSelf().inSingletonScope()
    container.bind(AnimationRepository).toSelf().inSingletonScope()
    container.bind(ThemeRepository).toSelf().inSingletonScope()
    container.bind(StaticPageRepository).toSelf().inSingletonScope()
    container.bind(TokenMetadataCacheRepository).toSelf().inSingletonScope()


    //Spin up local IPFS
    // container.bind("ipfsInit").toConstantValue( async () => {

    //     const IPFS = await Function('return import("ipfs")')() as Promise<typeof import('ipfs')>

    //     //@ts-ignore
    //     return IPFS.create(ipfsOptions())
    // })


    //Use external IPFS
    container.bind("ipfsInit").toConstantValue( async () => {

        let url = "http://localhost:5001/api/v0"

        const IPFS = await Function('return import("ipfs-http-client")')() as Promise<typeof import('ipfs-http-client')>

        //@ts-ignore
        return IPFS.create({ url: url })
    })



    container.bind("ipfsRemoteInit").toConstantValue( async (url) => {
    })

    await cleanup()

    let ipfsService:IpfsService = container.get(IpfsService)
    let walletService:WalletService = container.get<WalletService>(TYPES.WalletService);   

    
    // await ipfsService.init()
    await walletService.initWallet()


    return container
}

const cleanup = async () => {
    fs.rmSync('./test/pouch', { recursive: true, force: true })
    fs.rmSync('./test/test-repo', { recursive: true, force: true })
}


export {
    getContainer, cleanup
}