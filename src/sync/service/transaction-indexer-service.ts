import { BigNumber, Contract, ethers, providers } from "ethers";
import { inject, injectable } from "inversify";
import { Block } from "../dto/block.js";

import { BlockService } from "./block-service.js";

import { ERCEventService } from "../../reader/service/erc-event-service.js";

import { WalletService } from "../../reader/service/core/wallet-service.js";



import { ENSService } from "../../sync/service/ens-service.js";
import { ContractState } from "../dto/contract-state.js";
import { ProcessedEvent, ProcessedTransaction, TokenPrice } from "../dto/processed-transaction.js";
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

    BLOCK_CONFIRMATIONS = 12


    async init(contract: Contract, options?:any) {

        let s = await this.sequelize()


        console.log(`Starting transaction indexer for ${contract.address}`)

        this.contractAddress = ethers.utils.getAddress(contract.address)

        //Look up contract state
        this.contractState = await this._getContractState(this.contractAddress, options)

        //Init provider
        if (!this.walletService.provider) {
            await this.walletService.initProvider()
        }

        //Get the event topics for the filter. 
        this.topics = this._getFilterTopics(contract)

        this.contract = contract


    }

    async index(options?:any): Promise<ERCIndexResult> {

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

        //Remove transactions/events between start/end block numbers then re-insert
        await this.processedTransactionService.deleteBetweenBlocks(result, options)



        let previousTransaction: ProcessedTransaction = await this.processedTransactionService.getLatest(result.startBlock, options)

        result.mostRecentTransaction = previousTransaction

        const eventsResult:EventsResult = await this.getEvents(result.startBlock, result.endBlock)

        const events = eventsResult.events
        result.endBlock = eventsResult.endBlock

        result.isCurrent = this.blockNumber == result.endBlock

        console.log(`Found ${events.length} events up to block ${result.endBlock}`)


        //Group events by transaction hash
        let groupedEvents:Map<string,any[]> = this.groupBy(events, event => event.transactionHash)


        if (previousTransaction) {
            console.log(`Previous transaction: ${previousTransaction?._id}`)
            result.processedTransactionsToUpdate[previousTransaction._id] = previousTransaction
        }

        let processedCount =0


        if (groupedEvents.size > 0) {

            for (let key of groupedEvents.keys()) {

                let currentTransaction:ProcessedTransaction
                let transactionUser: TokenOwner

                let e = groupedEvents.get(key)


                let block: Block
                let transaction:Transaction


                console.time(`Processesing / ${key} / (${processedCount + 1} of ${groupedEvents.size})`)


                //Grab block data
                transaction = await this.transactionService.getOrDownload(key, options)
                block = await this.blockService.getOrDownload(transaction.blockNumber,options)


                currentTransaction = new ProcessedTransaction()
                currentTransaction._id = transaction.hash    
                currentTransaction.transactionFrom = transaction.from
                currentTransaction.blockNumber = transaction.blockNumber
                currentTransaction.transactionIndex = transaction.transactionIndex
                currentTransaction.ercEvents = []
                currentTransaction.tokenTraders = []
                currentTransaction.tokenIds = []
                currentTransaction.nextByTokenIds = {}
                currentTransaction.nextByTokenOwnerId = {}
                currentTransaction.nextByTransactionInitiatorId = {}
                currentTransaction.previousByTokenIds = {}
                currentTransaction.previousByTokenOwnerId = {}
                currentTransaction.previousByTransactionInitiatorId = {}
                currentTransaction.transactionValue = await this.transactionService.getTransactionValue(transaction, ethers.utils.getAddress(this.contract.address), block.ethUSDPrice)

                result.processedTransactionsToUpdate[currentTransaction._id] = currentTransaction


                for (let event of e) {

                    let fromOwner: TokenOwner
                    let toOwner: TokenOwner


                    if (!block || !currentTransaction) throw new Error("Block and/or transaction not found.")
                    if (event.transactionHash != currentTransaction._id) throw new Error("Wrong transaction found.")

                    //Translate
                    let ercEvent: ERCEvent = await this.ercEventService.translateEventToERCEvent(event)

                    currentTransaction.timestamp = block.timestamp



                    //Look up/create the from address
                    transactionUser = await this._getTokenOwner(currentTransaction.transactionFrom, result, options)

                    transactionUser.lastActive = new Date(currentTransaction.timestamp * 1000).toJSON()

                    if (ercEvent.namedArgs.tokenId) {

                        //Grab token info
                        let token:Token = await this._getToken(ercEvent.namedArgs.tokenId.toString(), result)

                        //Look up/create the from address
                        fromOwner = await this._getTokenOwner(ercEvent.namedArgs.fromAddress, result, options)
                        toOwner = await this._getTokenOwner(ercEvent.namedArgs.toAddress, result, options)

                        if (ercEvent.isTransfer) {

                            //Update previous owner
                            if (fromOwner.tokenIds.includes(ercEvent.namedArgs.tokenId)) {
                                fromOwner.tokenIds = Array.from(fromOwner.tokenIds)?.filter(id => id != ercEvent.namedArgs.tokenId)
                            }

                            //Update new owner
                            toOwner.tokenIds.push(ercEvent.namedArgs.tokenId)

                        }


                        //Look for previousByTokenId
                        let previousTransactionByToken:ProcessedTransaction = await this._getPreviousTransaction(token.latestTransactionId, currentTransaction._id, result)
                        
                        // if (currentTransaction._id == "0x7b322d0e46016632bad174ac089a267c73392c1216d1d5fa4f515f3d5d8661cb") {
                        //     console.log('22222222')
                        //     // console.log(currentTransaction)
                        //     console.log(`Last transaction id is ${token.latestTransactionId}`)
                        //     // console.log(previousTransactionByToken)
                        // }

                        if (previousTransactionByToken) {
                            this._updatePreviousNextByToken(ercEvent.namedArgs.tokenId, previousTransactionByToken, currentTransaction, result)
                        }

                        token.latestTransactionId = currentTransaction._id



                        //Update previous/next for transaction initiator
                        let previousTransactionByTransactionInitiator = await this._getPreviousTransaction(transactionUser.latestTransactionInitiatorId, currentTransaction._id, result)

                        if (previousTransactionByTransactionInitiator) {
                            this._updatePreviousNextByTransactionInitiator(transactionUser._id, previousTransactionByTransactionInitiator, currentTransaction, result)
                        }

                        transactionUser.latestTransactionInitiatorId = currentTransaction._id


                        //Update previous/next for from/to users
                        if (fromOwner) {
                            let previousTransactionByFromOwner = await this._getPreviousTransaction(fromOwner.latestTransactionId, currentTransaction._id, result)

                            if (previousTransactionByFromOwner) {
                                this._updatePreviousNextByTokenOwner(fromOwner._id, previousTransactionByFromOwner, currentTransaction, result)
                            }

                            fromOwner.latestTransactionId = currentTransaction._id


                        }

                        if (toOwner && toOwner._id != fromOwner._id) {
                            let previousTransactionByToOwner = await this._getPreviousTransaction(toOwner.latestTransactionId, currentTransaction._id, result)

                            if (previousTransactionByToOwner) {
                                this._updatePreviousNextByTokenOwner(toOwner._id, previousTransactionByToOwner, currentTransaction, result)
                            }

                            toOwner.latestTransactionId = currentTransaction._id

                        }




                    }

                    //Add raw event to transaction before saving
                    currentTransaction.ercEvents.push(ercEvent)
    
                    if (currentTransaction.transactionValue?.tokenPrice[ercEvent.namedArgs.tokenId] > 0) {
                        console.log(`Sale of #${ercEvent.namedArgs.tokenId} for ${currentTransaction.transactionValue?.tokenPrice[ercEvent.namedArgs.tokenId]} ${currentTransaction.transactionValue?.currency} on ${ Array.from(Object.keys(currentTransaction.transactionValue?.markets).map( k => k)).join(", ") }`)
                    }

    

                }

                //Set previous/next if we already have a previous transaction
                if (previousTransaction && previousTransaction._id != currentTransaction._id) {
                    currentTransaction.previousId = previousTransaction._id
                    previousTransaction.nextId = currentTransaction._id
                }

                
                //Create processed events
                result.processedTransactionsToUpdate[currentTransaction._id].processedEvents = this.createProcessedEvents(result.processedTransactionsToUpdate[currentTransaction._id])

                //Grab token ids from transactions and save on transaction
                let tokenIds = result.processedTransactionsToUpdate[currentTransaction._id].processedEvents?.map(pe => pe.tokenId)

                if (tokenIds?.length > 0) {
                    result.processedTransactionsToUpdate[currentTransaction._id].tokenIds = result.processedTransactionsToUpdate[currentTransaction._id].processedEvents?.map(pe => parseInt(pe.tokenId))?.filter(n => n)
                }

                //Grab token senders
                let from = new Set(result.processedTransactionsToUpdate[currentTransaction._id].processedEvents?.map(pe => pe.fromAddress))
                let to = new Set(result.processedTransactionsToUpdate[currentTransaction._id].processedEvents?.map(pe => pe.toAddress))

                let tokenTraders = Array.from(new Set([...from, ...to])).filter(n => n)
                
                if (tokenTraders?.length > 0) {
                    result.processedTransactionsToUpdate[currentTransaction._id].tokenTraders.push(...tokenTraders)
                }



                //Set previous to current before looping
                previousTransaction = currentTransaction

                result.mostRecentTransaction = currentTransaction

                console.timeEnd(`Processesing / ${key} / (${processedCount + 1} of ${groupedEvents.size})`)

                processedCount++

            }

            //Save transactions
            await this.saveProcessedTransactions(result, options)

            //Save tokens
            await this.saveTokens(result, options)

            //Save token owners
            await this.saveTokenOwners(result,options)

            //Rerank token owners
            await this.rerankTokenOwners(result, options)

        }

        this.contractState.lastIndexedBlock = result.endBlock

        //Save contract state
        console.log(`Saving contract state`)
        await this.contractStateService.put(this.contractState, options)
        

        return result


    }

    private async saveTokens(result: ERCIndexResult, options?:any) {
        
        let tokens = []
        
        for (let tokenId of Object.keys(result.tokensToUpdate)) {
            tokens.push(result.tokensToUpdate[tokenId])
        }

        await this.tokenService.putAll(tokens, options)

    }

    private async saveProcessedTransactions(result: ERCIndexResult, options?:any) {

        console.log(`Saving ${Object.keys(result.processedTransactionsToUpdate).length} processed transactions`)

        let transactionsToSave = []

        for (let _id of Object.keys(result.processedTransactionsToUpdate)) {
            transactionsToSave.push(result.processedTransactionsToUpdate[_id])

        }

        await this.processedTransactionService.putAll(transactionsToSave, options)
        
    }

    private async saveTokenOwners(result: ERCIndexResult, options?:any) {


        console.log(`Saving ${Object.keys(result.ownersToUpdate).length} updated token owners`);

        let tokenOwnersToUpdate = []
        for (let owner of Object.keys(result.ownersToUpdate)) {

            let tokenOwner = result.ownersToUpdate[owner]

            //Update count before saving.
            tokenOwner.count = tokenOwner.tokenIds?.length

            //Sort token IDs
            tokenOwner.tokenIds.sort()

            tokenOwner.ensName = await this.ensService.getOrDownloadByAddress(tokenOwner._id, options)

            tokenOwnersToUpdate.push(tokenOwner)
        }


        await this.tokenOwnerService.putAll(tokenOwnersToUpdate, options)

        
    }

    private async rerankTokenOwners(result:ERCIndexResult, options?:any) {
        
        //Update rankings for all owners. Only save if it's changed.
        let tokenOwners:TokenOwner[] = await this.tokenOwnerService.list(100000, 0, options)

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


        await this.tokenOwnerService.putAll(ownersToUpdate, options)

    }


    private createProcessedEvents(currentTransaction: ProcessedTransaction) : ProcessedEvent[] {


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

        let processedEvents:ProcessedEvent[] = []

        for (let i = 0; i < currentTransaction.ercEvents?.length; i++) {

            let e = currentTransaction.ercEvents[i]

            let processedEvent:ProcessedEvent = {}

            processedEvent.processedTransactionId = currentTransaction._id
            processedEvent.blockNumber = currentTransaction.blockNumber
            processedEvent.isMint = e.isMint
            processedEvent.isBurn = e.isBurn
            processedEvent.event = e.event
            processedEvent.namedArgs = e.namedArgs

            if (e.namedArgs.fromAddress) {
                processedEvent.fromAddress = e.namedArgs.fromAddress
            }

            if (e.namedArgs.toAddress) {
                processedEvent.toAddress = e.namedArgs.toAddress
            }

            if (e.namedArgs.tokenId) {

                processedEvent.tokenId = e.namedArgs.tokenId

                let tokenPrice:TokenPrice = currentTransaction.transactionValue?.tokenPrice[e.namedArgs.tokenId]

                if (tokenPrice) {
                    processedEvent.price = tokenPrice.price
                    processedEvent.currency = tokenPrice.currency
                    processedEvent.usdValue = tokenPrice.usdValue
                }

            }

            processedEvents.push(processedEvent)

        }

        return processedEvents

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
    private async _getContractState(contractAddress: string, options?:any) {

        let contractState

        try {
            contractState = await this.contractStateService.get(contractAddress)
        } catch (ex) { }

        if (!contractState) {

            contractState = new ContractState()

            contractState._id = contractAddress
            contractState.lastIndexedBlock = 0

            try {
                await this.contractStateService.put(contractState, options)

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
        return contractState.lastIndexedBlock < this.blockNumber
    }

    private getStartBlock(contractState: ContractState) {

        if (!contractState.lastIndexedBlock) return 0

        let block = contractState.lastIndexedBlock - 15

        return block >= 0 ? block : 0

    }

    private getEndBlock() {
        return this.blockNumber
    }


    private async _getTokenOwner(ownerAddress, result:ERCIndexResult, options?:any) {
       
        if (!ownerAddress) return

        if (!result.ownersToUpdate[ownerAddress]) {
            let tokenOwner: TokenOwner = await this.tokenOwnerService.getOrCreate(ownerAddress, options)
            result.ownersToUpdate[ownerAddress] = tokenOwner
        } 

        return result.ownersToUpdate[ownerAddress]
    }

    private async _getToken(tokenId, result:ERCIndexResult) {

        if (!result.tokensToUpdate[tokenId]) {
            result.tokensToUpdate[tokenId] = await this.tokenService.getOrCreate(tokenId)
        } 

        return result.tokensToUpdate[tokenId]

    }


    private async _updatePreviousNextByToken(tokenId:number, previousT:ProcessedTransaction, currentT:ProcessedTransaction, result:ERCIndexResult) {

        //Make sure we update it.
        result.processedTransactionsToUpdate[previousT._id] = previousT

        currentT.previousByTokenIds[tokenId] = previousT._id
        previousT.nextByTokenIds[tokenId] = currentT._id

    }

    private async _updatePreviousNextByTransactionInitiator(transactionUserId:string, previousT:ProcessedTransaction, currentT:ProcessedTransaction, result:ERCIndexResult) {

        //Make sure we update it.
        result.processedTransactionsToUpdate[previousT._id] = previousT

        currentT.previousByTransactionInitiatorId[transactionUserId] = previousT._id
        previousT.nextByTransactionInitiatorId[transactionUserId] = currentT._id

    }

    private async _updatePreviousNextByTokenOwner(tokenOwnerId:string, previousT:ProcessedTransaction, currentT:ProcessedTransaction, result:ERCIndexResult) {

        //Make sure we update it.
        result.processedTransactionsToUpdate[previousT._id] = previousT

        currentT.previousByTokenOwnerId[tokenOwnerId] = previousT._id
        previousT.nextByTokenOwnerId[tokenOwnerId] = currentT._id

    }

    private async _getPreviousTransaction(previousTransactionId:string, currentTransactionId:string, result:ERCIndexResult) {
    
        if (!previousTransactionId || previousTransactionId == currentTransactionId) return

        if (!result.processedTransactionsToUpdate[previousTransactionId]) {
            result.processedTransactionsToUpdate[previousTransactionId] = await this.processedTransactionService.get(previousTransactionId)
        }

        return result.processedTransactionsToUpdate[previousTransactionId]

    }


    /**
     * @description
     * Takes an Array<V>, and a grouping function,
     * and returns a Map of the array grouped by the grouping function.
     *
     * @param list An array of type V.
     * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
     *                  K is generally intended to be a property key of V.
     *
     * @returns Map of the array grouped by the grouping function.
     */
    groupBy(list, keyGetter) {

        const map = new Map()

        list.forEach((item) => {

            const key = keyGetter(item)
            const collection = map.get(key)
            if (!collection) {
                map.set(key, [item])
            } else {
                collection.push(item)
            }
        })
        return map
    }




}






























interface ERCIndexResult {
    ownersToUpdate: {}
    processedTransactionsToUpdate: {}
    tokensToUpdate: {}
    mostRecentTransaction?:ProcessedTransaction
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