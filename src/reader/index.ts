import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import { getMainContainer } from "./inversify.config.js"


//Import CSS
import './html/css/framework7-bundle.css'
import './html/css/framework7-icons.css'
// import 'material-icons/iconfont/material-icons.css'


import Framework7 from "framework7"
import {Workbox} from 'workbox-window'
import { StaticPage } from "./dto/static-page.js"
import { Container } from "inversify"
// import { TransactionIndexerService } from "./service/core/transaction-indexer-service"
import { SchemaService } from "./service/core/schema-service.js"

import axios from "axios"

import './html/css/app.css'


let initReader = async (baseURI:string, hostname:string, version:string, routablePages:StaticPage[],  channelId:string) => {



    if ('serviceWorker' in navigator) {

        const wb = new Workbox(`${hostname}${baseURI}sw-${version}.js?baseURI=${baseURI}`, {
            scope: `${hostname}${baseURI}`
        })

        let contract
        let contractABI
    
        let contractResponse = await axios.get(`${hostname}${baseURI}backup/contract/contract.json`, { responseType: 'json'})
        let contractABIResponse = await axios.get(`${hostname}${baseURI}backup/contract/contract-abi.json`, { responseType: 'json'})
    
    
        if (contractResponse.status === 200) {
            contract = contractResponse.data
        }
    
        if (contractResponse.status === 200) {
            contractABI = contractABIResponse.data
        }
    
    
        let container:Container = new Container()
    
        function contracts() {
                
            if (!contract.contractAddress) return []
        
            //Override address
            contractABI['Channel'].address = contract.contractAddress
      
            return contractABI
        }
      
        container.bind("contracts").toConstantValue(contracts())
        container.bind("channelId").toConstantValue(() => {
            return channelId
        })





        container = await getMainContainer(container, baseURI, hostname, version, routablePages)


        if (navigator.serviceWorker.controller) {
            startApp(container, baseURI, version, hostname, routablePages)
        } else {
            wb.addEventListener('controlling', e => {
                startApp(container, baseURI, version, hostname, routablePages)
            })
        }

        wb.register()

    }


} 

let startApp = async (container:Container, baseURI:string, version:string, hostname:string, routablePages:StaticPage[]) => {

    // let container = getMainContainer(baseURI, version, routablePages)            
    let app:Framework7 = container.get("framework7")
    
    //Create the main view

    //Get URL
    let internalUrl = window.location.toString().replace(`${hostname}`, '')

    const mainView = app.views.create('.view-main', {
        url: internalUrl
    })


    mainView.on("init", async (view) => {

        let schemaService:SchemaService = await container.get("SchemaService")
        await schemaService.load(['component-state'])

        console.log(`Navigating to ${internalUrl}`)
        //When the view loads lets reload the initial page so that we fire the component logic. 
        view.router.navigate(internalUrl, { reloadCurrent: true })
    })
    
    app.init()


    // let transactionIndexerService:TransactionIndexerService = await container.get("TransactionIndexerService")
    // let walletService:WalletService = await container.get("WalletService")



    // const INDEX_RATE = 30*1000 //Every 30 seconds


    // //Start the transaction indexer
    // async function runTransactionIndexer(){

    //     if (!walletService.provider) {
    //         await walletService.initProvider()
    //     }

    //     if (walletService.provider) {
            
    //         

    //         let contract = await walletService.getContract("Channel")

    //         if (!transactionIndexerService.contract) {
    //             await transactionIndexerService.init(contract)
    //         }

    //         await transactionIndexerService.index()
    //     }



    //     setTimeout(runTransactionIndexer, INDEX_RATE) 
    // }
    
    // runTransactionIndexer()


}


export { initReader }

