import { Contract, ethers } from "ethers";
import { inject, injectable } from "inversify";
import { Block } from "../../dto/block.js";
import { ContractState } from "../../dto/contract-state.js";
import { ERCEvent } from "../../dto/erc-event.js";
import { Image } from "../../dto/image.js";
import { Item } from "../../dto/item.js";
import { TokenOwner } from "../../dto/token-owner.js";
import { Transaction } from "../../dto/transaction.js";
import { BlockService } from "../block-service.js";

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
    private contractStateService: ContractStateService

    @inject("ERCEventService")
    private ercEventService: ERCEventService

    @inject("TokenOwnerService")
    private tokenOwnerService: TokenOwnerService

    @inject("ItemWebService")
    private itemWebService: ItemWebService

    @inject("ImageService")
    private imageService: ImageService

    @inject("WalletService")
    private walletService: WalletService

    @inject("TransactionService")
    private transactionService: TransactionService

    @inject("BlockService")
    private blockService: BlockService


    blockNumber: number

    topics: string[]

    contractState: ContractState
    contract: Contract
    contractAddress: string


    constructor() { }

    BLOCK_GAP = 12


    async init(contract: Contract) {

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



    async index(): Promise<ERCIndexResult> {

        let result:ERCIndexResult = {
            eventsToUpdate: [],
            ownersToUpdate: {},
            tokensToUpdate: new Set<number>()
        }

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

        let previousByTokenMap = {}


        if (events.length > 0) {

            let previous:ERCEvent = await this.ercEventService.getLatest()

            //Have to update the previous with "nextId"
            if (previous) {
                result.eventsToUpdate.push(previous)
            }

            for (let event of events) {
    
                //Grab block data
                let block:Block = await this.blockService.get(event.blockNumber)

                //Grab transaction data
                let transaction: Transaction = await this.transactionService.get(event.transactionHash)
    
                //Translate
                let ercEvent: ERCEvent = await this.ercEventService.translateEventToERCEvent(event, transaction, block)
    

                if (ercEvent.tokenId) {

                    //Get item view model
                    let item:Item = await this.itemWebService.getByTokenId(ercEvent.tokenId)
                    let coverImage:Image

                    if (item.coverImageId) {
                        coverImage = await this.imageService.get(item.coverImageId)
                    }


                    ercEvent.rowItemViewModel = this.itemWebService.translateRowItemViewModel(item, coverImage)



                    const getTokenOwner = async (ownerAddress) => {
    
                        let tokenOwner:TokenOwner = result.ownersToUpdate[ownerAddress]
 
                        if (!tokenOwner) {
                            try {
                                tokenOwner = await this.tokenOwnerService.get(ercEvent.fromAddress)
                                result.ownersToUpdate[ownerAddress] = tokenOwner
                            } catch(ex) {}
                        } 

                        if (!tokenOwner) {
                            tokenOwner = new TokenOwner()
                            tokenOwner.address = ownerAddress
                            tokenOwner.tokenIds = []
                            tokenOwner.ercEventIds = []
                            tokenOwner.count = 0
                        }
                        

                        result.ownersToUpdate[ownerAddress] = tokenOwner

                        return tokenOwner
        
                    }
                
                    let fromOwner:TokenOwner 
                    let toOwner:TokenOwner 
        
                    //Look up/create the from address
                    if (ercEvent.fromAddress) {
                        fromOwner = await getTokenOwner(ercEvent.fromAddress)
                        fromOwner.ercEventIds.push(ercEvent._id)
                    }
        
                    //Look up/create the to address
                    if (ercEvent.toAddress) {
                        toOwner = await getTokenOwner(ercEvent.toAddress)
                        toOwner.ercEventIds.push(ercEvent._id)
                    }
        
        
                    if (ercEvent.isTransfer) {
        
                        console.log(`Updating owner of token #${ercEvent.tokenId} from ${ercEvent.fromAddress} to ${ercEvent.toAddress}`)
        
                        //Update previous owner
                        if (fromOwner.tokenIds.includes(ercEvent.tokenId)) {
                            fromOwner.tokenIds = Array.from(fromOwner.tokenIds)?.filter(id => id != ercEvent.tokenId)
                            fromOwner.count = fromOwner.tokenIds.length
                        }
        
                        //Update new owner
                        toOwner.tokenIds.push(ercEvent.tokenId)
                        toOwner.count = toOwner.tokenIds.length
        
                    }


                    //Look for previousByTokenId in the eventsToUpdate
                    let previousByToken:ERCEvent

                    if (previousByTokenMap[ercEvent.tokenId]) {

                        previousByToken = previousByTokenMap[ercEvent.tokenId]
                        ercEvent.previousByTokenId = previousByToken._id

                    } else {

                        let previousByToken:ERCEvent

                        //Might be in local events
                        let matches = result.eventsToUpdate.filter(e => e.tokenId == ercEvent.tokenId)

                        if (matches?.length > 0) {
                            //Find the most recent
                            matches.sort((a, b) => {

                                if (a.blockNumber == b.blockNumber) {
                                    return a.logIndex - b.logIndex
                                }

                                return a.blockNumber - b.blockNumber
                            })

                            console.log(JSON.stringify(matches))

                            previousByToken = matches[0]
                        }

                        //Look it up
                        if (!previousByToken) {

                            previousByToken = await this.ercEventService.getLatestByTokenId(ercEvent.tokenId)

                            if (previousByToken) {
                                ercEvent.previousByTokenId = previousByToken._id
                                result.eventsToUpdate.push(previousByToken)
                            }
                        }

                    }


                    if (previousByToken) {
                        previousByToken.nextByTokenId = ercEvent._id
                    }


                    previousByTokenMap[ercEvent.tokenId] = ercEvent
                    
                }
     
                //Set previous/next
                if (previous) {
                    ercEvent.previousId = previous._id
                    previous.nextId = ercEvent._id
                }
    
                //See if it already exists. If so we need the _rev
                ercEvent._rev = await this.ercEventService.getExistingRev(ercEvent._id)
    
                result.eventsToUpdate.push(ercEvent)
    
                previous = ercEvent
    
            }
    
            console.log(`Saving contract state`)


            //Save events
            console.log(`Saving ${Object.keys(result.eventsToUpdate).length} events`)
            for (let event of result.eventsToUpdate) {
                // console.log(`Processed ${event.event} event in transaction ${event.transactionHash} (block #${event.blockNumber})`)
                await this.ercEventService.put(event)
            }

    
            //Save token owners
            for (let owner of Object.keys(result.ownersToUpdate)) {
                console.log(`Saving token owner ${owner}`)
                await this.tokenOwnerService.put(result.ownersToUpdate[owner])
            }

        }


        this.contractState.lastIndexedBlock = endBlock

        //Save contract state
        await this.contractStateService.put(this.contractState)
    

        return result


    }


    private _getFilterTopics(contract: Contract) {


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
    private async _getContractState(contractAddress: string) {

        let contractState

        try {
            contractState = await this.contractStateService.get(contractAddress)

        } catch (ex) { }

        if (!contractState) {

            contractState = Object.assign(new ContractState(), {
                _id: contractAddress,
                lastIndexedBlock: 0,
                dateCreated: new Date().toJSON()
            })

            try {
                await this.contractStateService.put(contractState)

            } catch (ex) {
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

        } catch (ex) { console.log(ex) }
        
    }

    private shouldIndex(contractState: ContractState) {
        return contractState.lastIndexedBlock + this.BLOCK_GAP < this.blockNumber
    }

    private getStartBlock(contractState: ContractState) {
        if (!contractState.lastIndexedBlock) return 0
        return contractState.lastIndexedBlock + 1
    }

    private getEndBlock() {
        return this.blockNumber - this.BLOCK_GAP
    }



}



interface ERCIndexResult {
    eventsToUpdate:ERCEvent[]
    ownersToUpdate:{}
    tokensToUpdate:Set<number>
}


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export {
    TransactionIndexerService, ERCIndexResult
}