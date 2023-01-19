import { BigNumber, Contract, ethers, providers } from "ethers";
import { inject, injectable } from "inversify";
import { Block } from "../dto/block.js";

import { BlockService } from "./block-service.js";

import { ERCEventService } from "../../reader/service/erc-event-service.js";
import { TokenOwnerPageService } from "../../reader/service/token-owner-page-service.js";
import { ItemWebService } from "../../reader/service/web/item-web-service.js";
import { WalletService } from "../../reader/service/core/wallet-service.js";



import { ENSService } from "../../sync/service/ens-service.js";
import { ContractState } from "../dto/contract-state.js";
import { ProcessedEvent, ProcessedTransaction } from "../dto/processed-transaction.js";
import { TokenOwner } from "../dto/token-owner.js";
import { Transaction } from "../dto/transaction.js";
import { ERCEvent } from "../dto/erc-event.js";
import { Token } from "../dto/token.js";
import { ContractStateService } from "./contract-state-service.js";
import { TokenOwnerService } from "./token-owner-service.js";
import { TokenService } from "./token-service.js";
import { TransactionService } from "./transaction-service.js";
import { ProcessedTransactionService } from "./processed-transaction-service.js";


@injectable()
class TransactionIndexerService {

    @inject("ContractStateService")
    private contractStateService: ContractStateService

    @inject("ERCEventService")
    private ercEventService: ERCEventService

    @inject("TokenOwnerService")
    private tokenOwnerService: TokenOwnerService

    @inject("TokenService")
    private tokenService: TokenService

    @inject("WalletService")
    private walletService: WalletService

    @inject("ENSService")
    private ensService: ENSService

    @inject("TransactionService")
    private transactionService: TransactionService

    @inject("ProcessedTransactionService")
    private processedTransactionService: ProcessedTransactionService

    @inject("BlockService")
    private blockService: BlockService

    @inject("sequelize")
    private sequelize: Function


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

        let s = await this.sequelize()

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

        result.startBlock = this.getStartBlock(this.contractState)
        result.endBlock = this.getEndBlock()
        result.blockNumber = this.blockNumber

        console.log(`Indexing blocks: ${result.startBlock} to ${result.endBlock}`)

        try {

            const eventsResult:EventsResult = await this.getEvents(result.startBlock, result.endBlock)

            const events = eventsResult.events
            result.endBlock = eventsResult.endBlock

            result.isCurrent = this.blockNumber - this.BLOCK_GAP == result.endBlock


    
            console.log(`Found ${events.length} events up to block ${result.endBlock}`)
    
    
            if (events.length > 0) {
    
                let previousTransaction: ProcessedTransaction = await this.processedTransactionService.getLatest()
                let currentTransaction:ProcessedTransaction
    
                let transactionUser: TokenOwner
                let fromOwner: TokenOwner
                let toOwner: TokenOwner

                if (previousTransaction) {
                    result.processedTransactionsToUpdate[previousTransaction._id] = previousTransaction
                }
    
                let processedCount = 0

                for (let event of events) {
                    
                    try {

                        console.time(`Processesing ${event.blockNumber} / ${event.transactionHash} / ${event.logIndex} (${processedCount + 1} of ${events.length})`)
    
                        const t1 = await s.transaction()

                        let block: Block
                        let transaction:Transaction


                        //Grab block data
                        block = await this.blockService.getOrDownload(event.blockNumber, { transaction: t1 })
                        transaction = await this.transactionService.getOrDownload(event.transactionHash, { transaction: t1 })

                        //Look for it locally
                        if (result.processedTransactionsToUpdate[event.transactionHash]) {
                            currentTransaction = result.processedTransactionsToUpdate[event.transactionHash]
                        } else {
        
                            currentTransaction = new ProcessedTransaction()
                            currentTransaction._id = transaction.hash    
                            currentTransaction.from = transaction.from
                            currentTransaction.blockNumber = transaction.blockNumber
                            currentTransaction.transactionIndex = transaction.transactionIndex
                            currentTransaction.ercEvents = []
                            currentTransaction.nextByTokenIds = {}
                            currentTransaction.nextByTokenOwnerId = {}
                            currentTransaction.nextByTransactionInitiatorId = {}
                            currentTransaction.previousByTokenIds = {}
                            currentTransaction.previousByTokenOwnerId = {}
                            currentTransaction.previousByTransactionInitiatorId = {}
                            currentTransaction.transactionValue = await this.transactionService.getTransactionValue(transaction, ethers.utils.getAddress(this.contract.address), block.ethUSDPrice)
                            result.processedTransactionsToUpdate[currentTransaction._id] = currentTransaction
                        }
        

                        if (!block || !currentTransaction) throw new Error("Block and/or transaction not found.")
                        if (event.transactionHash != currentTransaction._id) throw new Error("Wrong transaction found.")
        
                        //Translate
                        let ercEvent: ERCEvent = await this.ercEventService.translateEventToERCEvent(event)
    
                        currentTransaction.timestamp = block.timestamp
        
                        const getTokenOwner = async (ownerAddress) => {
       
                            if (!ownerAddress) return
    
                            if (!result.ownersToUpdate[ownerAddress]) {
                                let tokenOwner: TokenOwner = await this.tokenOwnerService.getOrCreate(ownerAddress)
                                result.ownersToUpdate[ownerAddress] = tokenOwner
                            } 
    
                            return result.ownersToUpdate[ownerAddress]
                        }
    
                        const getToken = async (tokenId) => {
        
                            if (!result.tokensToUpdate[ercEvent.namedArgs.tokenId]) {
                                result.tokensToUpdate[ercEvent.namedArgs.tokenId] = await this.tokenService.getOrCreate(ercEvent.namedArgs.tokenId.toString())
                            } 
        
                            return result.tokensToUpdate[ercEvent.namedArgs.tokenId]
    
                        }
    
                        const getPreviousTransaction = async (previousTransactionId:string, currentTransactionId:string) => {
    
                            if (!previousTransactionId || previousTransactionId == currentTransactionId) return
    
                            if (result.processedTransactionsToUpdate[previousTransactionId]) {
                                return result.processedTransactionsToUpdate[previousTransactionId]
                            }
    
                            return this.processedTransactionService.get(previousTransactionId)
    
                        }
    
                        const updatePreviousNextByToken = (tokenId:number, previousT:ProcessedTransaction, currentT:ProcessedTransaction) => {
    
                            //Make sure we update it.
                            result.processedTransactionsToUpdate[previousT._id] = previousT
    
                            currentT.previousByTokenIds[tokenId] = previousT._id
                            previousT.nextByTokenIds[tokenId] = currentT._id
    
                        }
    
                        const updatePreviousNextByTransactionInitiator = (transactionUserId:string, previousT:ProcessedTransaction, currentT:ProcessedTransaction) => {
    
                            //Make sure we update it.
                            result.processedTransactionsToUpdate[previousT._id] = previousT
    
                            currentT.previousByTransactionInitiatorId[transactionUserId] = previousT._id
                            previousT.nextByTransactionInitiatorId[transactionUserId] = currentT._id
    
                        }
    
                        const updatePreviousNextByTokenOwner = (tokenOwnerId:string, previousT:ProcessedTransaction, currentT:ProcessedTransaction) => {
    
                            //Make sure we update it.
                            result.processedTransactionsToUpdate[previousT._id] = previousT
    
                            currentT.previousByTokenOwnerId[tokenOwnerId] = previousT._id
                            previousT.nextByTokenOwnerId[tokenOwnerId] = currentT._id
    
                        }
    
                        //Look up/create the from address
                        transactionUser = await getTokenOwner(currentTransaction.from)

                        transactionUser.lastActive = new Date(currentTransaction.timestamp * 1000).toJSON()
    
                        if (ercEvent.namedArgs.tokenId) {
        
                            //Grab token info
                            let token:Token = await getToken(ercEvent.namedArgs.tokenId.toString())
        
        
                            //Look up/create the from address
                            fromOwner = await getTokenOwner(ercEvent.namedArgs.fromAddress)
                            toOwner = await getTokenOwner(ercEvent.namedArgs.toAddress)


                            if (ercEvent.isTransfer) {
        
                                //Update previous owner
                                if (fromOwner.tokenIds.includes(ercEvent.namedArgs.tokenId)) {
                                    fromOwner.tokenIds = Array.from(fromOwner.tokenIds)?.filter(id => id != ercEvent.namedArgs.tokenId)
                                }
        
                                //Update new owner
                                toOwner.tokenIds.push(ercEvent.namedArgs.tokenId)
        
                            }
    
    
                            //Look for previousByTokenId
                            let previousTransactionByToken:ProcessedTransaction = await getPreviousTransaction(token.latestTransactionId, currentTransaction._id)
                            
                            if (previousTransactionByToken) {
                                updatePreviousNextByToken(ercEvent.namedArgs.tokenId, previousTransactionByToken, currentTransaction)
                            }
    
                            token.latestTransactionId = currentTransaction._id
    
    
    
                            //Update previous/next for transaction initiator
                            let previousTransactionByTransactionInitiator = await getPreviousTransaction(transactionUser.latestTransactionInitiatorId, currentTransaction._id)
    
                            if (previousTransactionByTransactionInitiator) {
                                updatePreviousNextByTransactionInitiator(transactionUser._id, previousTransactionByTransactionInitiator, currentTransaction)
                            }
    
                            transactionUser.latestTransactionInitiatorId = currentTransaction._id
    
    
                            //Update previous/next for from/to users
                            if (fromOwner) {
                                let previousTransactionByFromOwner = await getPreviousTransaction(fromOwner.latestTransactionId, currentTransaction._id)
    
                                if (previousTransactionByFromOwner) {
                                    updatePreviousNextByTokenOwner(fromOwner._id, previousTransactionByFromOwner, currentTransaction)
                                }
    
                                fromOwner.latestTransactionId = currentTransaction._id
    
    
                            }
    
                            if (toOwner && toOwner._id != fromOwner._id) {
                                let previousTransactionByToOwner = await getPreviousTransaction(toOwner.latestTransactionId, currentTransaction._id)
    
                                if (previousTransactionByToOwner) {
                                    updatePreviousNextByTokenOwner(toOwner._id, previousTransactionByToOwner, currentTransaction)
                                }
    
                                toOwner.latestTransactionId = currentTransaction._id
    
                            }

    
                        }
        
                        //Add event to transaction before saving
                        currentTransaction.ercEvents.push(ercEvent)
                        
                        //Set previous/next if we already have a previous transaction
                        if (previousTransaction && previousTransaction._id != currentTransaction._id) {
                            currentTransaction.previousId = previousTransaction._id
                            previousTransaction.nextId = currentTransaction._id
                        }
        
                        console.timeEnd(`Processesing ${event.blockNumber} / ${event.transactionHash} / ${event.logIndex} (${processedCount + 1} of ${events.length})`)
                        
                        if (currentTransaction.transactionValue?.tokenPrice[ercEvent.namedArgs.tokenId] > 0) {
                            console.log(`Sale of #${ercEvent.namedArgs.tokenId} for ${currentTransaction.transactionValue?.tokenPrice[ercEvent.namedArgs.tokenId]} ${currentTransaction.transactionValue?.currency} on ${currentTransaction.transactionValue?.market }`)
                        }


                        previousTransaction = currentTransaction
        
                        //Increment the count
                        processedCount++ 
        
                        await t1.commit()

                    } catch(ex) {
                        console.log(ex)
                    }
                }

                const t1 = await s.transaction()


                //Save token owners
                console.log(`Saving ${Object.keys(result.ownersToUpdate).length} updated token owners`)

                let tokenOwnersToUpdate = []
                for (let owner of Object.keys(result.ownersToUpdate)) {

                    let tokenOwner = result.ownersToUpdate[owner]

                    //Update count before saving.
                    tokenOwner.count = tokenOwner.tokenIds?.length

                    //Sort token IDs
                    tokenOwner.tokenIds.sort()

                    tokenOwner.ensName = await this.ensService.getOrDownloadByAddress(tokenOwner._id)

                    tokenOwnersToUpdate.push(tokenOwner)
                }

                await this.tokenOwnerService.putAll(tokenOwnersToUpdate, { transaction: t1 })


                //Update rankings for all owners. Only save if it's changed.
                let tokenOwners:TokenOwner[] = await this.tokenOwnerService.list(100000, 0)

                let rank = 0
                let lastRankCount

                let ownersToUpdate = []

                for (let i=0; i < tokenOwners.length; i++) {

                    let owner = tokenOwners[i]

                    if (!lastRankCount || owner.tokenIds?.length < lastRankCount) {
                        rank++
                    }

                    //Add any with new rankings to our changeset to save.
                    if (owner.rank != rank || owner.overallRank != i+1) {
                        owner.rank = rank
                        owner.overallRank = i+1
                        ownersToUpdate.push(owner)

                        result.ownersToUpdate[owner._id] = owner

                    }

                    lastRankCount = owner.tokenIds?.length

                }

                console.log(`Saving ${ownersToUpdate.length} re-ranked token owners`)
                await this.tokenOwnerService.putAll(ownersToUpdate, { transaction: t1 })




                //Save processed transactions
                console.log(`Saving ${Object.keys(result.processedTransactionsToUpdate).length} processed transactions`)
                let transactionsToSave = []

                for (let _id of Object.keys(result.processedTransactionsToUpdate)) {

                    //Create processed events
                    this.createProcessedEvents(result.processedTransactionsToUpdate[_id])

                    if (result.processedTransactionsToUpdate[_id].processedEvents?.length == 0) {
                        throw new Error(`No processed events found for transaction ${_id}`)
                    }

                    transactionsToSave.push(result.processedTransactionsToUpdate[_id])
                }

                await this.processedTransactionService.putAll(transactionsToSave, { transaction: t1 })



                //Save tokens
                let tokens = []
                for (let tokenId of Object.keys(result.tokensToUpdate)) {
                    tokens.push(result.tokensToUpdate[tokenId])
                }

                await this.tokenService.putAll(tokens, { transaction: t1 })


                await t1.commit()

            }
    
            this.contractState.lastIndexedBlock = result.endBlock
    



        } catch(ex) {
            console.log(ex)
        }




        return result


    }
    

    private createProcessedEvents(currentTransaction: ProcessedTransaction) {


        //If it's an "Approve" event then we check the next event and if it's a transfer
        //then just skip this. Seems like approval gets set to 0x000 before transferring
        //so that the new owner has revoked all token approvals. 
    
        //Filter those out
        currentTransaction.ercEvents = currentTransaction.ercEvents?.filter( (e, index) => {

            let nextEvent

            if (currentTransaction.ercEvents.length >= index + 2) {
                nextEvent = currentTransaction.ercEvents[index+1]
            }

            let isApprovalToZeroFollowedByTransfer =    e.event == "Approval" && 
                                                        nextEvent?.event == "Transfer" && 
                                                        nextEvent.namedArgs.tokenId == e.namedArgs.tokenId && 
                                                        e.namedArgs.approved == "0x0000000000000000000000000000000000000000"


            return !isApprovalToZeroFollowedByTransfer

        })



        currentTransaction.processedEvents = []


        //Combine transfers to the same address as a single event with multiple tokens
        let previousProcessedTransfer:ProcessedEvent

        for (let i = 0; i < currentTransaction.ercEvents?.length; i++) {

            let e = currentTransaction.ercEvents[i]

            // //If the same from/to as the last one just add it to the same processed event
            // if (
            //     e.event == "Transfer" && 
            //     previousProcessedTransfer && 
            //     e.namedArgs.fromAddress == previousProcessedTransfer.namedArgs.fromAddress && 
            //     e.namedArgs.toAddress == previousProcessedTransfer.namedArgs.toAddress
            // ) {

            //     previousProcessedTransfer.tokenIds.push(parseInt(e.namedArgs.tokenId))

            // } else {

                let processedEvent:ProcessedEvent = {
                    isMint: e.isMint,
                    isBurn: e.isBurn,
                    event: e.event,
                    namedArgs: e.namedArgs,
                    tokenIds: [parseInt(e.namedArgs.tokenId)]
                }

                currentTransaction.processedEvents.push(processedEvent)

                if (e.event == "Transfer") {
                    previousProcessedTransfer = processedEvent
                }

            // }

        }

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
    startBlock?:number
    endBlock?:number
    blockNumber?:number
    isCurrent?:boolean
}

interface EventsResult {
    events:any[]
    endBlock:number
}



export {
    TransactionIndexerService, ERCIndexResult
}