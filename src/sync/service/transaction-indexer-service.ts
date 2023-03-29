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
import { ProcessedTransactionService, TransactionViewModel } from "./processed-transaction-service.js";
import { ItemService } from "../../reader/service/item-service.js";


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

    @inject("ItemService")
    private itemService: ItemService

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

    async index(result: ERCIndexResult, options?:any): Promise<ERCIndexResult> {

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
        await this.processedTransactionService.deleteBetweenBlocks(result, this.BLOCK_CONFIRMATIONS, options)

        //Set most recent.
        result.mostRecentTransaction = await this.processedTransactionService.getLatestViewModel(result.startBlock, options)

        const eventsResult:EventsResult = await this.getEvents(result.startBlock, result.endBlock)

        const events = eventsResult.events
        result.endBlock = eventsResult.endBlock

        result.isCurrent = this.blockNumber == result.endBlock

        //Group events by transaction hash
        let groupedEvents:Map<string,any[]> = this.groupBy(events, event => event.transactionHash)

        let processedCount =0


        if (groupedEvents.size > 0) {

            console.log(`Found ${events.length} events up to block ${result.endBlock}`)


            for (let key of groupedEvents.keys()) {

                // let currentTransaction:TransactionViewModel = {}
                let transactionUser: TokenOwner

                let e = groupedEvents.get(key)


                let block: Block
                let transaction:Transaction


                console.time(`Processesing / ${key} / (${processedCount + 1} of ${groupedEvents.size})`)


                //Grab block data
                while (transaction == undefined || block == undefined) {

                    try {

                        transaction = await this.transactionService.getOrDownload(key, options)
                        block = await this.blockService.getOrDownload(transaction.blockNumber,options)

                    } catch(ex){
                        //Wait 30 seconds and try again
                        console.log(`Problem fetching transaction and block data. Queueing for retry.`)
                        await new Promise(r => setTimeout(r, 30000))
                    }

                }



                let processedTransaction = new ProcessedTransaction()

                processedTransaction._id = transaction.hash    
                processedTransaction.transactionFrom = transaction.from
                processedTransaction.blockNumber = transaction.blockNumber
                processedTransaction.transactionIndex = transaction.transactionIndex
                processedTransaction.ercEvents = []
                processedTransaction.tokenTraders = []
                processedTransaction.tokenIds = []
                processedTransaction.tokenTraderIds = []
                processedTransaction.transactionValue = await this.transactionService.getTransactionValue(transaction, ethers.utils.getAddress(this.contract.address), block.ethUSDPrice)


                for (let event of e) {

                    let fromOwner: TokenOwner
                    let toOwner: TokenOwner

                    if (!block || !processedTransaction) throw new Error("Block and/or transaction not found.")
                    if (event.transactionHash != processedTransaction._id) throw new Error("Wrong transaction found.")

                    //Translate
                    let ercEvent: ERCEvent = await this.ercEventService.translateEventToERCEvent(event)

                    processedTransaction.timestamp = block.timestamp

                    //Look up/create the from address
                    transactionUser = await this._getTokenOwner(processedTransaction.transactionFrom, result, options)

                    transactionUser.lastActive = new Date(processedTransaction.timestamp * 1000).toJSON()

                    if (ercEvent.namedArgs.tokenId) {

                        let tokenId = parseInt(ercEvent.namedArgs.tokenId)

                        //Grab token info
                        let token:Token = await this._getToken(tokenId.toString(), result)

                        //Look up/create the from address
                        fromOwner = await this._getTokenOwner(ercEvent.namedArgs.fromAddress, result, options)
                        toOwner = await this._getTokenOwner(ercEvent.namedArgs.toAddress, result, options)

                        if (ercEvent.isTransfer) {
                            token.currentOwnerId = toOwner._id
                        }

                    }

                    //Add raw event to transaction before saving
                    processedTransaction.ercEvents.push(ercEvent)

                }

                
                //Create processed events
                let processedEvents:ProcessedEvent[] = this.createProcessedEvents(processedTransaction)


                let transactionViewModel:TransactionViewModel = this.processedTransactionService.translateTransactionViewModel(processedTransaction, processedEvents)


                //Grab token ids from transactions and save on transaction
                let tokenIds = processedEvents?.map(pe => pe.tokenId).filter(x => x !== undefined)

                if (tokenIds?.length > 0) {
                    processedTransaction.tokenIds = Array.from(new Set(processedEvents?.map(pe => pe.tokenId)?.filter(n => n)))
                    processedTransaction.tokens = processedTransaction.tokenIds?.map( t => result.tokensToUpdate[t] )
                }

                //Add transaction to affected tokens
                for (let tokenId of tokenIds) {

                    //Remove events unrelated to token. Add to start of transaction array.
                    result.tokensToUpdate[tokenId].transactionsViewModel.transactions.unshift({
                        transaction: transactionViewModel.transaction,
                        events: transactionViewModel.events.filter( e => e.tokenId == tokenId)
                    })

                    result.tokensToUpdate[tokenId].transactionsViewModel.rowItemViewModels[tokenId] = await this.itemService.getRowItemViewModelsByTokenId(tokenId)

                }


                //Grab token senders
                let from = new Set(processedEvents?.map(pe => pe.fromAddress))
                let to = new Set(processedEvents?.map(pe => pe.toAddress))

                let tokenTraders = Array.from(new Set([...from, ...to])).filter(n => n !== undefined)
                
                if (tokenTraders?.length > 0) {
                    processedTransaction.tokenTraderIds.push(...tokenTraders)
                    processedTransaction.tokenTraders = processedTransaction.tokenTraderIds?.map( t => result.ownersToUpdate[t] )
                }

                //Add transaction to affected token owners
                for (let owner of tokenTraders) {

                    //Only include events related to user's transfers
                    result.ownersToUpdate[owner].transactionsViewModel.transactions.push({
                        transaction: transactionViewModel.transaction,
                        events: transactionViewModel.events
                    })

                    result.ownersToUpdate[owner].transactionsViewModel.rowItemViewModels = await this.processedTransactionService.getRowItemViewModels(transactionViewModel.events)

                    //Set token ids
                    this.tokenOwnerService.setTokenIds(result.ownersToUpdate[owner])

                }


                result.processedTransactionViewModels[processedTransaction._id] = {
                    events: processedEvents,
                    transaction: processedTransaction
                }


                result.mostRecentTransaction = result.processedTransactionViewModels[processedTransaction._id]

                console.timeEnd(`Processesing / ${key} / (${processedCount + 1} of ${groupedEvents.size})`)

                processedCount++

            }

            //Save token owners
            await this.saveTokenOwners(result,options)

            //Save tokens
            await this.saveTokens(result, options)

            //Save transactions
            await this.saveProcessedTransactions(result, options)

            //Rerank token owners
            await this.tokenOwnerService.rerank(options)

        }

        this.contractState.lastIndexedBlock = result.endBlock
        

        return result


    }

    private async saveTokens(result: ERCIndexResult, options?:any) {
        
        console.log(`Saving ${Object.keys(result.tokensToUpdate).length} tokens `)

        let tokens = []
        
        for (let tokenId of Object.keys(result.tokensToUpdate)) {
            tokens.push(result.tokensToUpdate[tokenId])
        }

        await this.tokenService.putAll(tokens, options)

    }

    private async saveProcessedTransactions(result: ERCIndexResult, options?:any) {

        console.log(`Saving ${Object.keys(result.processedTransactionViewModels).length} processed transactions`)

        let transactionsToSave = []
        let eventsToSave = []

        for (let _id of Object.keys(result.processedTransactionViewModels)) {
            transactionsToSave.push(result.processedTransactionViewModels[_id].transaction)

            eventsToSave.push(...result.processedTransactionViewModels[_id].events)

        }


        //Save transactions
        await this.processedTransactionService.putAll(transactionsToSave, options)
        
        //Save events
        await this.processedTransactionService.putEvents(eventsToSave, options)


    }

    private async saveTokenOwners(result: ERCIndexResult, options?:any) {


        console.log(`Saving ${Object.keys(result.ownersToUpdate).length} updated token owners`);

        let tokenOwnersToUpdate = []
        for (let owner of Object.keys(result.ownersToUpdate)) {

            let tokenOwner = result.ownersToUpdate[owner]

            //Update count before saving.
            tokenOwner.count = tokenOwner.tokenIds?.length
            tokenOwner.transactionCount = tokenOwner.transactionsViewModel?.transactions?.length

            //Sort token IDs
            tokenOwner.tokenIds.sort()

            tokenOwner.ensName = await this.ensService.getOrDownloadByAddress(tokenOwner._id, options)

            tokenOwnersToUpdate.push(tokenOwner)

        }


        await this.tokenOwnerService.putAll(tokenOwnersToUpdate, options)

        
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

            let processedEvent:ProcessedEvent = new ProcessedEvent()

            processedEvent.processedTransactionId = currentTransaction._id
            processedEvent.blockNumber = currentTransaction.blockNumber
            processedEvent.transactionIndex = currentTransaction.transactionIndex
            processedEvent.logIndex = e.logIndex
            processedEvent._id = `${processedEvent.processedTransactionId}-${processedEvent.logIndex}`
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

                processedEvent.tokenId = parseInt(e.namedArgs.tokenId)

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
            // console.log(`Contract state exists`)
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

        let block = contractState.lastIndexedBlock - this.BLOCK_CONFIRMATIONS

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
    processedTransactionViewModels: {}
    tokensToUpdate: {}
    mostRecentTransaction?:TransactionViewModel
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