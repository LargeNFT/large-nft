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
import { DatabaseService } from "../src/service/core/database-service";
import { ChannelRepository } from "../src/repository/channel-repository";
import { ItemRepository } from "../src/repository/item-repository";
import { ImageRepository } from "../src/repository/image-repository";
import { AuthorRepository } from "../src/repository/author-repository";
import { SchemaService } from "../src/service/core/schema-service";
import { WalletService } from "../src/service/core/wallet-service";

import TYPES from "../src/service/core/types";


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

    container.bind("provider").toConstantValue(provider())
    container.bind("ipfsOptions").toConstantValue(ipfsOptions())
    container.bind("contracts").toConstantValue(contracts())

    container.bind(DatabaseService).toSelf().inSingletonScope()
    container.bind(SchemaService).toSelf().inSingletonScope()

    container.bind<WalletService>(TYPES.WalletService).to(HardhatWalletServiceImpl).inSingletonScope();



    container.bind(ImageService).toSelf().inSingletonScope()
    container.bind(AuthorService).toSelf().inSingletonScope()
    container.bind(ChannelService).toSelf().inSingletonScope()
    container.bind(IpfsService).toSelf().inSingletonScope()
    container.bind(ItemService).toSelf().inSingletonScope()
    container.bind(QuillService).toSelf().inSingletonScope()

    container.bind(ChannelRepository).toSelf().inSingletonScope()
    container.bind(ItemRepository).toSelf().inSingletonScope()
    container.bind(ImageRepository).toSelf().inSingletonScope()
    container.bind(AuthorRepository).toSelf().inSingletonScope()

    fs.rmSync('./pouch', { recursive: true, force: true })
    fs.rmSync('./test-repo', { recursive: true, force: true })



    let ipfsService:IpfsService = container.get(IpfsService)
    let walletService:WalletService = container.get<WalletService>(TYPES.WalletService);   

    await ipfsService.init()
    await walletService.initWallet()


    return container
}




export {
    getContainer
}