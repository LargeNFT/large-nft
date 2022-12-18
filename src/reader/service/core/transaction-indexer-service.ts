import { Contract, ethers } from "ethers";
import { inject, injectable } from "inversify";
import { ContractState } from "../../dto/contract-state.js";
import { ERCEvent } from "../../dto/erc-event.js";
import { Image } from "../../dto/image.js";
import { Transaction } from "../../dto/transaction.js";

import { ContractStateService } from "../contract-state-service.js";
import { ERCEventService } from "../erc-event-service.js";
import { ImageService } from "../image-service.js";
import { TokenOwnerService } from "../token-owner-service.js";
import { TransactionService } from "../transaction-service.js";
import { ItemWebService } from "../web/item-web-service.js";
import { WalletService } from "./wallet-service.js";



@injectable()
class TransactionIndexerService {

    @inject("ContractStateService")
    private contractStateService:ContractStateService

    @inject("ERCEventService")
    private ercEventService:ERCEventService

    @inject("TokenOwnerService")
    private tokenOwnerService:TokenOwnerService

    @inject("ItemWebService")
    private itemWebService:ItemWebService
    
    @inject("ImageService")
    private imageService:ImageService

    @inject("WalletService")
    private walletService:WalletService

    @inject("TransactionService")
    private transactionService:TransactionService


    blockNumber:number 

    topics:string[]

    contractState:ContractState
    contract:Contract
    contractAddress:string


    constructor() {}

    BLOCK_GAP = 12


    async init(contract:Contract) {

        console.log(`Starting transaction indexer for ${contract.address}`)

        this.contractAddress = ethers.utils.getAddress(contract.address)

        //Look up contract state
        this.contractState = await this._getContractState(this.contractAddress)

        //Init provider
        if (!this.walletService.provider) {
            await this.walletService.initProvider()


        }

        //Get the event topics for the filter. 
        this.topics = this._getFilterTopics(contract)

        this.contract = contract


    }



    async index() : Promise<ERCEvent[]> {

        let results:ERCEvent[] = []


        //Update block number
        await this._updateBlockNumber()

        if (!this.shouldIndex(this.contractState)) return 

        console.log(`
            Block Number: ${this.blockNumber}
            Last Indexed: ${this.contractState.lastIndexedBlock}
        `)

        let startBlock = this.getStartBlock(this.contractState)
        let endBlock = this.getEndBlock()

        console.log(`Indexing blocks: ${startBlock} to ${endBlock}`)

        const events = await this.contract.queryFilter({
                address: this.contractAddress,
                topics: this.topics
            }, 
            startBlock, 
            endBlock
        )

        console.log(`Found ${events.length} events`)


        //Look up the most recent event.
        let previous:ERCEvent

        for (let event of events) {

            //Translate
            let ercEvent:ERCEvent = await this.ercEventService.translateEventToERCEvent(event)

            //Grab transaction data
            let transaction:Transaction = await this.transactionService.get(ercEvent.transactionHash)
            
            ercEvent.transaction = transaction

            //Check if it already exists. Merge details.
            try {
                let existing = await this.ercEventService.get(ercEvent._id)
                ercEvent = Object.assign(existing, ercEvent)

            } catch(ex) {}


            let previousEvent:ERCEvent
            let previousEventByToken:ERCEvent

            //Grab the most recent events if not set.
            if (ercEvent.tokenId && !ercEvent.previousByToken) {
                previousEventByToken = await this.ercEventService.getLatestByTokenId(ercEvent.tokenId)
                ercEvent.previousByToken = previousEventByToken?._id              
            }

            if (!ercEvent.previous) {

                //If we're inserting a bunch just use the actual previous one.
                if (previous) {
                    ercEvent.previous = previous._id
                } else {

                    //Otherwise grab the actual most recent
                    let latest = await this.ercEventService.getLatest()
                    ercEvent.previous = latest?._id
                }

                if (ercEvent.previous) {
                    previousEvent = await this.ercEventService.get(ercEvent.previous)
                }
            }

            if (ercEvent.tokenId) {

                //Look up itemViewModel if token.
                let item = await this.itemWebService.getByTokenId(ercEvent.tokenId)

                let coverImage:Image

                if (item.coverImageId) {
                    coverImage = await this.imageService.get(item.coverImageId)
                }

                ercEvent.rowItemViewModel = this.itemWebService.translateRowItemViewModel(item, coverImage)

            }



            let processResult = await this.ercEventService.process(ercEvent, previousEvent, previousEventByToken)
            ercEvent = processResult.ercEvent

            //See if it already exists. If so we need the _rev
            ercEvent._rev = await this.ercEventService.getExistingRev(ercEvent._id)

            //Save
            await this.ercEventService.put(ercEvent)
            console.log(`Found ${ercEvent.event} event in transaction ${ercEvent.transactionHash} (block #${ercEvent.blockNumber})`)

            //Save token owners
            if (processResult.fromTokenOwner) {
                await this.tokenOwnerService.put(processResult.fromTokenOwner)
                console.log(`Saving token owner ${processResult.fromTokenOwner.address}`)

            }

            if (processResult.toTokenOwner) {
                await this.tokenOwnerService.put(processResult.toTokenOwner)
                console.log(`Saving token owner ${processResult.toTokenOwner.address}`)
            }

            results.push(ercEvent)

            previous = ercEvent

        }

        this.contractState.lastIndexedBlock = endBlock

        await this.contractStateService.put(this.contractState)

        return results


    }


    private _getFilterTopics(contract:Contract) {


        //Grab the ones that have () in them. Because the list is duplicated. 
        let eventKeys = Object.keys(contract.filters).filter(v => v.includes("("))

        let topics = []

        for (let eventKey of eventKeys) {
            //@ts-ignore
            topics.concat(eventKey.topics)
        }

        return topics
    }



    /**
     * Gets contract state by address and creates a new record if it doesn't exist.
     * @param contractAddress 
     * @returns 
     */
    private async _getContractState(contractAddress:string) {

        let contractState 
        
        try {
            contractState = await this.contractStateService.get(contractAddress)
        
        } catch(ex) {}

        if (!contractState) {

            contractState = Object.assign(new ContractState(), {
                _id: contractAddress,
                lastIndexedBlock: 0,
                dateCreated: new Date().toJSON()
            })

            try {
                await this.contractStateService.put(contractState)

            } catch(ex) {
                console.log(JSON.stringify(ex))
            }
        } else {
            console.log(`Contract state exists`)
        }

        return contractState
    }


    private async _updateBlockNumber() {
        try {
            this.blockNumber = await this.walletService.provider.getBlockNumber()

        } catch(ex) {console.log(ex)}
    }

    private shouldIndex(contractState:ContractState) {
        return contractState.lastIndexedBlock + this.BLOCK_GAP < this.blockNumber
    }

    private getStartBlock(contractState:ContractState) {
        if (!contractState.lastIndexedBlock) return 0
        return contractState.lastIndexedBlock + 1
    }

    private getEndBlock() {
        return this.blockNumber - this.BLOCK_GAP         
    }



}






function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

export {
    TransactionIndexerService
}