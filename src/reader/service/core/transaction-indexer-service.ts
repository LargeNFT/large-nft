import { Contract, ethers } from "ethers";
import { inject, injectable } from "inversify";
import { ContractState } from "../../dto/contract-state.js";
import { ERCEvent } from "../../dto/erc-event.js";

import { ContractStateService } from "../contract-state-service.js";
import { ERCEventService } from "../erc-event-service.js";
import { WalletService } from "./wallet-service.js";



@injectable()
class TransactionIndexerService {

    @inject("ContractStateService")
    private contractStateService:ContractStateService

    @inject("ERCEventService")
    private ercEventService:ERCEventService

    @inject("WalletService")
    private walletService:WalletService


    blockNumber:number 

    topics:string[]

    contractState:ContractState
    contract:Contract
    contractAddress:string


    constructor() {}

    BLOCK_GAP = 50
    MAX_BLOCKS_QUERY_SIZE = 1500


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



    async index() {

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

        for (let event of events) {

            let e = await this.ercEventService.process(event)

            //See if it already exists. If so we need the _rev
            let existing:ERCEvent
            try {
                existing = await this.ercEventService.get(e._id)
            } catch(ex) {}
            

            if (existing) {
                e = Object.assign(existing, e)
            }


            try {
                await this.ercEventService.put(e)
                // console.log(`Event: ${JSON.stringify(e)}`)
            } catch(ex) {
                console.log(ex)
            }

        }

        this.contractState.lastIndexedBlock = endBlock

        await this.contractStateService.put(this.contractState)


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