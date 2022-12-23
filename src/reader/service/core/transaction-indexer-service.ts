import { Contract, ethers } from "ethers";
import { inject, injectable } from "inversify";
import { Block } from "../../dto/block.js";
import { ContractState } from "../../dto/contract-state.js";
import { ERCEvent } from "../../dto/erc-event.js";
import { Image } from "../../dto/image.js";
import { Item } from "../../dto/item.js";
import { TokenOwnerPage } from "../../dto/token-owner-page.js";
import { TokenOwner } from "../../dto/token-owner.js";
import { Token } from "../../dto/token.js";
import { Transaction } from "../../dto/transaction.js";
import { BlockService } from "../block-service.js";

import { ContractStateService } from "../contract-state-service.js";
import { ERCEventService } from "../erc-event-service.js";
import { ImageService } from "../image-service.js";
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
            blocksToUpdate: {},
            transactionsToUpdate: {},
            // eventsToUpdate: {},
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

        //Update the tokenToLatestEventId map
        // let latestByToken:ERCEvent[] = await this.ercEventService.getLatestForAllTokens()
        // latestByToken.forEach(e => tokenToLatestEventId[e.tokenId] = e._id)



        console.log(`Indexing blocks: ${startBlock} to ${endBlock}`)


        const eventsResult:EventsResult = await this.getEvents(startBlock, endBlock)

        const events = eventsResult.events
        endBlock = eventsResult.endBlock

        console.log(`Found ${events.length} events up to block ${endBlock}`)


        if (events.length > 0) {
            // let previous: ERCEvent = await this.ercEventService.getLatest()

            let previousTransaction: Transaction = await this.transactionService.getLatest()

            // if (previous) {
            //     previousTransaction = await this.transactionService.get(previous.transactionHash)
            //     result.eventsToUpdate[previous._id] = previous

            // }

            if (previousTransaction) {
                result.transactionsToUpdate[previousTransaction._id] = previousTransaction
            }

            let processedCount = 0

            for (let event of events) {
               
                console.time(`Processesing ${event.blockNumber} / ${event.logIndex} (${processedCount + 1} of ${events.length})`)

                //Grab block data
                let block: Block 

                // console.time(`Getting block #${event.blockNumber}`)
                if (result.blocksToUpdate[event.blockNumber]) {
                    block = result.blocksToUpdate[event.blockNumber]
                } else {
                    block = await this.blockService.get(event.blockNumber)
                }
                // console.timeEnd(`Getting block #${event.blockNumber}`)



                //Grab transaction data
                let transaction: Transaction 

                // console.time(`Getting transaction #${event.transactionHash}`)

                //If we already have it then use it
                if (result.transactionsToUpdate[event.transactionHash]) {
                    transaction = result.transactionsToUpdate[event.transactionHash]
                } else {
                    //Look it up
                    transaction = await this.transactionService.get(event.transactionHash)
                }
                // console.timeEnd(`Getting transaction #${event.transactionHash}`)

                if (!block || !transaction) throw new Error("Block and/or transaction not found.")


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
                    if (transaction.from) {

                        transactionUser = await getTokenOwner(transaction.from)

                        if (!transactionUser.transactionIdsInitiated.includes(transaction._id)) {
                            transactionUser.transactionIdsInitiated.push(transaction._id)
                        }

                    }

                    //Look up/create the from address
                    if (ercEvent.fromAddress) {

                        fromOwner = await getTokenOwner(ercEvent.fromAddress)

                        if (!fromOwner.transactionIds.includes(transaction._id)) {
                            fromOwner.transactionIds.push(transaction._id)
                        }
                    }

                    //Look up/create the to address
                    if (ercEvent.toAddress) {

                        toOwner = await getTokenOwner(ercEvent.toAddress)

                        if (!toOwner.transactionIds.includes(transaction._id)) {
                            toOwner.transactionIds.push(transaction._id)
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

                    //Look for previousByTokenId in the eventsToUpdate
                    // let previousEventByToken: ERCEvent
                    let previousTransactionByToken:Transaction

                    //Look up previous event for this token
                    // if (token.latestErcEventId) {

                    //     //Grab from memory if exists
                    //     previousEventByToken = result.eventsToUpdate[token.latestErcEventId]

                    //     //Look it up
                    //     if (!previousEventByToken) {

                    //         previousEventByToken = await this.ercEventService.get(token.latestErcEventId)
                    //         result.eventsToUpdate[previousEventByToken._id] = previousEventByToken
                    //     }


                    // } 

                    //Point the previous one here
                    // if (previousEventByToken) {
                    //     ercEvent.previousByTokenId = previousEventByToken._id
                    //     previousEventByToken.nextByTokenId = ercEvent._id
                    // }


                    //Look up previous transaction for this token
                    if (token.latestTransactionId) {

                        //Grab from memory if exists
                        previousTransactionByToken = result.transactionsToUpdate[token.latestTransactionId]

                        //Look it up
                        if (!previousTransactionByToken) {
                            previousTransactionByToken = await this.transactionService.get(token.latestTransactionId)
                            result.transactionsToUpdate[previousTransactionByToken._id] = previousTransactionByToken
                        }

                    }

                    //Point the previous one here
                    if (previousTransactionByToken) {
                        transaction.previousByTokenIds[ercEvent.tokenId] = previousTransactionByToken._id
                        previousTransactionByToken.nextByTokenIds[ercEvent.tokenId] = transaction._id
                    }

                    token.latestErcEventId = ercEvent._id
                    token.latestTransactionId = transaction._id



                }

                //Set previous/next
                // if (previous) {
                //     ercEvent.previousId = previous._id
                //     previous.nextId = ercEvent._id
                // }

                if (previousTransaction && previousTransaction._id != transaction._id) {
                    transaction.previousId = previousTransaction._id
                    previousTransaction.nextId = transaction._id
                }


                //See if it already exists. If so we need the _rev
                // ercEvent._rev = await this.ercEventService.getExistingRev(ercEvent._id)
                console.timeEnd(`Processesing ${event.blockNumber} / ${event.logIndex} (${processedCount + 1} of ${events.length})`)

                //Save this as an event to update
                // result.eventsToUpdate[ercEvent._id] = ercEvent

                //Add event to transaction before saving
                if (!transaction.ercEvents[ercEvent._id]) {
                    transaction.ercEvents[ercEvent._id] = ercEvent
                }

                result.transactionsToUpdate[transaction._id] = transaction
                result.blocksToUpdate[block._id] = block

                //Set previous to this event so the next iteration has it.
                // previous = ercEvent

                //Increment the count
                processedCount++ 



            }



            //Save events
            // console.log(`Saving ${Object.keys(result.eventsToUpdate).length} events`)
            // let eventsToSave = []

            // for (let _id of Object.keys(result.eventsToUpdate)) {
            //     eventsToSave.push(result.eventsToUpdate[_id])
            // }

            // await this.ercEventService.putAll(eventsToSave)


            //Save token owners
            let tokenOwners = []
            for (let owner of Object.keys(result.ownersToUpdate)) {
                // console.log(`Saving token owner ${owner}`)
                // tokenOwner.ensName = await this.walletService.provider.lookupAddress(owner)
                tokenOwners.push(result.ownersToUpdate[owner])
            }

            await this.tokenOwnerService.putAll(tokenOwners)



            //Save tokens
            let tokens = []
            for (let tokenId of Object.keys(result.tokensToUpdate)) {
                tokens.push(result.tokensToUpdate[tokenId])
            }

            await this.tokenService.putAll(tokens)



            //Save transactions
            console.log(`Saving ${Object.keys(result.transactionsToUpdate).length} transactions`)
            let transactionsToSave = []

            for (let _id of Object.keys(result.transactionsToUpdate)) {
                transactionsToSave.push(result.transactionsToUpdate[_id])
            }

            await this.transactionService.putAll(transactionsToSave)



            //Save blocks
            console.log(`Saving ${Object.keys(result.blocksToUpdate).length} blocks`)
            let blocksToSave = []

            for (let _id of Object.keys(result.blocksToUpdate)) {
                blocksToSave.push(result.blocksToUpdate[_id])
            }

            await this.transactionService.putAll(blocksToSave)



        }



        this.contractState.lastIndexedBlock = endBlock

        //Save contract state
        console.log(`Saving contract state`)
        await this.contractStateService.put(this.contractState)


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
    transactionsToUpdate: {}
    blocksToUpdate: {}
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