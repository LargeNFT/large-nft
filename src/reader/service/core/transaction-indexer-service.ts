import { Contract, ethers } from "ethers";
import { inject, injectable } from "inversify";
import { Block } from "../../dto/block.js";
import { ContractState } from "../../dto/contract-state.js";
import { ERCEvent } from "../../dto/erc-event.js";
import { Image } from "../../dto/image.js";
import { Item } from "../../dto/item.js";
import { ProcessedTransaction } from "../../dto/processed-transaction.js";
import { TokenOwnerPage } from "../../dto/token-owner-page.js";
import { TokenOwner } from "../../dto/token-owner.js";
import { Token } from "../../dto/token.js";
import { Transaction } from "../../dto/transaction.js";
import { BlockService } from "../block-service.js";

import { ContractStateService } from "../contract-state-service.js";
import { ERCEventService } from "../erc-event-service.js";
import { ImageService } from "../image-service.js";
import { ProcessedTransactionService } from "../processed-transaction-service.js";
import { TokenOwnerPageService } from "../token-owner-page-service.js";
import { TokenOwnerService } from "../token-owner-service.js";
import { TokenService } from "../token-service.js";
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

    @inject("TokenService")
    private tokenService: TokenService

    @inject("WalletService")
    private walletService: WalletService

    @inject("TransactionService")
    private transactionService: TransactionService

    @inject("ProcessedTransactionService")
    private processedTransactionService: ProcessedTransactionService

    @inject("BlockService")
    private blockService: BlockService

    @inject("TokenOwnerPageService")
    private tokenOwnerPageService: TokenOwnerPageService

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

        let result: ERCIndexResult = {
            processedTransactionsToUpdate: {},
            ownersToUpdate: {},
            tokensToUpdate: {}
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

        try {

            const eventsResult:EventsResult = await this.getEvents(startBlock, endBlock)

            const events = eventsResult.events
            endBlock = eventsResult.endBlock
    
            console.log(`Found ${events.length} events up to block ${endBlock}`)
    
    
            if (events.length > 0) {
    
                let previousTransaction: ProcessedTransaction = await this.processedTransactionService.getLatest()
                let currentTransaction:ProcessedTransaction
    
                if (previousTransaction) {
                    result.processedTransactionsToUpdate[previousTransaction._id] = previousTransaction
                }
    
                let processedCount = 0
                
    
                for (let event of events) {
                   
                    console.time(`Processesing ${event.blockNumber} / ${event.transactionHash} / ${event.logIndex} (${processedCount + 1} of ${events.length})`)
    
                    //Grab block data
                    let block: Block = await this.blockService.getOrDownload(event.blockNumber)
    
                    //Look for it locally
                    if (result.processedTransactionsToUpdate[event.transactionHash]) {
                        currentTransaction = result.processedTransactionsToUpdate[event.transactionHash]
                    } else {
                        currentTransaction = new ProcessedTransaction()
                        currentTransaction.transaction = await this.transactionService.getOrDownload(event.transactionHash)
                        currentTransaction._id = currentTransaction.transaction.hash    
                        currentTransaction.dateCreated = new Date().toJSON()
                        currentTransaction.ercEvents = []
                        currentTransaction.nextByTokenIds = {}
                        currentTransaction.previousByTokenIds = {}
                        currentTransaction.tokenIds = []
    
                        result.processedTransactionsToUpdate[currentTransaction._id] = currentTransaction
                    }
    
                    
                    if (!block || !currentTransaction) throw new Error("Block and/or transaction not found.")
                    if (event.transactionHash != currentTransaction._id) throw new Error("Wrong transaction found.")
    
    
                    //Translate
                    let ercEvent: ERCEvent = await this.ercEventService.translateEventToERCEvent(event, block)
    
                    if (ercEvent.tokenId) {
    
                        //Grab token info
                        let token:Token
    
                        if (result.tokensToUpdate[ercEvent.tokenId]) {
                            token = result.tokensToUpdate[ercEvent.tokenId]
                        } else {
                            
                            try {
                                token = await this.tokenService.get(ercEvent.tokenId.toString())
                            } catch(ex) {}
                            
                            if (!token) {
                                token = new Token()
                                token.tokenId = ercEvent.tokenId
                            }
    
                        }
    
                        result.tokensToUpdate[ercEvent.tokenId] = token
    
                        const getTokenOwner = async (ownerAddress) => {
    
                            let tokenOwner: TokenOwner = result.ownersToUpdate[ownerAddress]
    
                            if (!tokenOwner) {
                                try {
                                    tokenOwner = await this.tokenOwnerService.get(ercEvent.fromAddress)
                                } catch (ex) { }
                            }
    
                            if (!tokenOwner) {
                                tokenOwner = new TokenOwner()
                                tokenOwner.address = ownerAddress
                                tokenOwner.tokenIds = []
                                tokenOwner.transactionIds = []
                                tokenOwner.transactionIdsInitiated = []
                                tokenOwner.count = 0
                            }
    
    
                            result.ownersToUpdate[ownerAddress] = tokenOwner
    
                            return tokenOwner
    
                        }
    
                        let transactionUser: TokenOwner
                        let fromOwner: TokenOwner
                        let toOwner: TokenOwner
    
                        //Look up/create the from address
                        if (currentTransaction.transaction.from) {
    
                            transactionUser = await getTokenOwner(currentTransaction.transaction.from)
    
                            if (!transactionUser.transactionIdsInitiated.includes(currentTransaction.transaction._id)) {
                                transactionUser.transactionIdsInitiated.push(currentTransaction.transaction._id)
                            }
    
                        }
    
                        //Look up/create the from address
                        if (ercEvent.fromAddress) {
    
                            fromOwner = await getTokenOwner(ercEvent.fromAddress)
    
                            if (!fromOwner.transactionIds.includes(currentTransaction.transaction._id)) {
                                fromOwner.transactionIds.push(currentTransaction.transaction._id)
                            }
                        }
    
                        //Look up/create the to address
                        if (ercEvent.toAddress) {
    
                            toOwner = await getTokenOwner(ercEvent.toAddress)
    
                            if (!toOwner.transactionIds.includes(currentTransaction.transaction._id)) {
                                toOwner.transactionIds.push(currentTransaction.transaction._id)
                            }
                        }
    
                        if (ercEvent.isTransfer) {
    
                            //Update previous owner
                            if (fromOwner.tokenIds.includes(ercEvent.tokenId)) {
                                fromOwner.tokenIds = Array.from(fromOwner.tokenIds)?.filter(id => id != ercEvent.tokenId)
                                fromOwner.count = fromOwner.tokenIds.length
                            }
    
                            //Update new owner
                            toOwner.tokenIds.push(ercEvent.tokenId)
                            toOwner.count = toOwner.tokenIds.length
    
                        }
    
                        //Look for previousByTokenId
                        let previousTransactionByToken:ProcessedTransaction
    
    
                        //Look up previous transaction for this token
                        if (token.latestTransactionId && token.latestTransactionId != currentTransaction._id) {
    
                            //Grab from memory if exists
                            previousTransactionByToken = result.processedTransactionsToUpdate[token.latestTransactionId]
    
                            //Look it up
                            if (!previousTransactionByToken) {
                                previousTransactionByToken = await this.processedTransactionService.get(token.latestTransactionId)
                            }
    
                        }
    
                        //Point the previous one here
                        if (previousTransactionByToken) {
    
                            //Make sure we update it.
                            result.processedTransactionsToUpdate[previousTransactionByToken._id] = previousTransactionByToken
    
                            currentTransaction.previousByTokenIds[ercEvent.tokenId] = previousTransactionByToken._id
                            previousTransactionByToken.nextByTokenIds[ercEvent.tokenId] = currentTransaction._id
                        }
    
                        token.latestErcEventId = ercEvent._id
                        token.latestTransactionId = currentTransaction._id
    
    
                    }
    
    
                    //See if it already exists. If so we need the _rev
                    // ercEvent._rev = await this.ercEventService.getExistingRev(ercEvent._id)
    
                    //Add event to transaction before saving
                    if (currentTransaction.ercEvents.filter(e => e._id == ercEvent._id)?.length == 0) {
                        currentTransaction.ercEvents.push(ercEvent)
                    }
    
    
                    //Set previous/next if we already have a previous transaction
                    if (previousTransaction && previousTransaction._id != currentTransaction._id) {
                        currentTransaction.previousId = previousTransaction._id
                        previousTransaction.nextId = currentTransaction._id
                    }
    
    
    
    
                    console.timeEnd(`Processesing ${event.blockNumber} / ${event.transactionHash} / ${event.logIndex} (${processedCount + 1} of ${events.length})`)
    
                    previousTransaction = currentTransaction
    
                    //Increment the count
                    processedCount++ 
    
    
    
                }
    
           
   
                //Save token owners
                let tokenOwners = []
                for (let owner of Object.keys(result.ownersToUpdate)) {
                    tokenOwners.push(result.ownersToUpdate[owner])
                }
    
                await this.tokenOwnerService.putAll(tokenOwners)
    
    
    
                //Save tokens
                let tokens = []
                for (let tokenId of Object.keys(result.tokensToUpdate)) {
                    tokens.push(result.tokensToUpdate[tokenId])
                }
    
                await this.tokenService.putAll(tokens)
    
    
    
                //Save processed transactions
                console.log(`Saving ${Object.keys(result.processedTransactionsToUpdate).length} processed transactions`)
                let transactionsToSave = []
    
                for (let _id of Object.keys(result.processedTransactionsToUpdate)) {
                    transactionsToSave.push(result.processedTransactionsToUpdate[_id])
                }
    
                await this.processedTransactionService.putAll(transactionsToSave)
    
    
            }
    
            this.contractState.lastIndexedBlock = endBlock
    
            //Save contract state
            console.log(`Saving contract state`)
            await this.contractStateService.put(this.contractState)



        } catch(ex) {
            console.log(ex)
        }




        return result


    }


    async getEvents(startBlock:number, endBlock:number) : Promise<EventsResult> {

        let events = []

        let tryAgain = true

        while (tryAgain) {

            try {
            
                events = await this.contract.queryFilter({
                    address: this.contractAddress,
                    topics: this.topics
                },
                    startBlock,
                    endBlock
                )
    
                tryAgain = false
    
            } catch(ex) {
                
                //Catch the error with their suggested range and try it again.
                let message = JSON.parse(ex.body)?.error?.message
    
                let startEnd = message.substring(message.indexOf('[') + 1, message.indexOf(']'))?.split(',')
    
                if (startEnd?.length > 1) {
    
                    endBlock = parseInt(startEnd[1])
    
                } else {
                    endBlock = startBlock //Make sure to say we didn't do anything.
                    tryAgain = false
                }
    
            }
        }

        

        return {
            events: events,
            endBlock: endBlock
        }

    }


    // async getBlockChunks(startBlock:number, endBlock:number, chunkLimit = 2000) {

    //     const totalBlocks = endBlock - startBlock
    //     const chunks = []

    //     if (chunkLimit > 0 && totalBlocks > chunkLimit) {
    //         const count = Math.ceil(totalBlocks / chunkLimit)
    //         let startingBlock = startBlock

    //         for (let index = 0; index < count; index++) {
    //             const startChunkBlock = startingBlock
    //             const endChunkBlock =
    //                 index === count - 1 ? endBlock : startingBlock + chunkLimit
    //             startingBlock = endChunkBlock + 1

    //             chunks.push({ startBlock: startChunkBlock, endBlock: endChunkBlock })
    //         }
    //     } else {
    //         chunks.push({ startBlock: startBlock, endBlock: endBlock })
    //     }

    //     return chunks
    // }



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
    // eventsToUpdate: {}
    ownersToUpdate: {}
    processedTransactionsToUpdate: {}
    tokensToUpdate: {}
}

interface EventsResult {
    events:any[]
    endBlock:number
}


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export {
    TransactionIndexerService, ERCIndexResult
}