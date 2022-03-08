import "core-js/stable"
import "regenerator-runtime/runtime"
import "reflect-metadata"

import EventEmitter from "events";
import { Container } from "inversify";
import { providers } from "ethers"


import { WalletService } from "../src/service/core/wallet-service";
import { ImageService } from "../src/service/core/image-service";
import { ProfileService } from "../src/service/core/profile-service";
import { PostService } from "../src/service/core/post-service";
import { BlogPostService } from "../src/service/core/blog-post-service";
import { IpfsService } from "../src/service/core/ipfs-service";
import { SiteSettingsService } from "../src/service/core/site-settings-service";

import fs from 'fs';



let container

async function getContainer() {

    if (container) return container

    container = new Container()

    function provider() {

        if (typeof window !== "undefined" && window['ethereum']) {
    
            //@ts-ignore
            window.web3Provider = window.ethereum
      
            //@ts-ignore
            return new providers.Web3Provider(web3.currentProvider)  
      
        } else {
            return providers.getDefaultProvider()
        }   
    }


    function eventEmitter() {
        return new EventEmitter()
    }

    function ipfsOptions() {
        return {
            repo: '../test/test-repo'
        }
    }

    function orbitOptions() {
        return {
            directory: "../test/orbitdb/"
        }
    }

    container.bind("provider").toConstantValue(provider())
    container.bind("eventEmitter").toConstantValue(eventEmitter())
    container.bind("ipfsOptions").toConstantValue(ipfsOptions())
    container.bind("orbitOptions").toConstantValue(orbitOptions())

    container.bind(WalletService).toSelf().inSingletonScope()
    container.bind(ImageService).toSelf().inSingletonScope()
    container.bind(ProfileService).toSelf().inSingletonScope()
    container.bind(PostService).toSelf().inSingletonScope()
    container.bind(BlogPostService).toSelf().inSingletonScope()
    container.bind(IpfsService).toSelf().inSingletonScope()
    container.bind(SiteSettingsService).toSelf().inSingletonScope()


    fs.rmSync('./keystore', { recursive: true, force: true })
    fs.rmSync('./orbitdb', { recursive: true, force: true })
    fs.rmSync('./pouch', { recursive: true, force: true })
    fs.rmSync('./test-repo', { recursive: true, force: true })



    let orbitService = container.get(OrbitService) 
    await orbitService.init()


    return container
}




export {
    getContainer
}