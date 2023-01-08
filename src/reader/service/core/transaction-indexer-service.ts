import { Contract, ethers } from "ethers";
import { inject, injectable } from "inversify";
import { Block } from "../../dto/block.js";
import { ContractState } from "../../dto/contract-state.js";
import { ERCEvent } from "../../dto/erc-event.js";
import { ProcessedEvent, ProcessedTransaction } from "../../dto/processed-transaction.js";
import { TokenOwner } from "../../dto/token-owner.js";
import { Token } from "../../dto/token.js";
import { Transaction } from "../../dto/transaction.js";
import { BlockService } from "../block-service.js";

import { ContractStateService } from "../contract-state-service.js";
import { ERCEventService } from "../erc-event-service.js";
import { ProcessedTransactionService } from "../processed-transaction-service.js";
import { TokenOwnerPageService } from "../token-owner-page-service.js";
import { TokenOwnerService } from "../token-owner-service.js";
import { TokenService } from "../token-service.js";
import { TransactionService } from "../transaction-service.js";
import { ItemWebService } from "../web/item-web-service.js";
import { WalletService } from "./wallet-service.js";



import looksRareABI from './abi/looksRareABI.json';
import nftxABI from './abi/nftxABI.json';
import openseaSeaportABI from './abi/seaportABI.json';


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
    
                        //Grab block data
                        let block: Block = await this.blockService.getOrDownload(event.blockNumber)
        
                        let transaction:Transaction

                        //Look for it locally
                        if (result.processedTransactionsToUpdate[event.transactionHash]) {
                            currentTransaction = result.processedTransactionsToUpdate[event.transactionHash]
                        } else {
    
                            transaction = await this.transactionService.getOrDownload(event.transactionHash)
    
                            currentTransaction = new ProcessedTransaction()
                            currentTransaction._id = transaction.hash    
                            currentTransaction.from = transaction.from
                            currentTransaction.blockNumber = transaction.blockNumber
                            currentTransaction.transactionIndex = transaction.transactionIndex
                            currentTransaction.dateCreated = new Date().toJSON()
                            currentTransaction.ercEvents = []
                            currentTransaction.nextByTokenIds = {}
                            currentTransaction.nextByTokenOwnerId = {}
                            currentTransaction.nextByTransactionInitiatorId = {}
                            currentTransaction.previousByTokenIds = {}
                            currentTransaction.previousByTokenOwnerId = {}
                            currentTransaction.previousByTransactionInitiatorId = {}
                            currentTransaction.tokenIds = []
        
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
        
                        //Detect events from on-chain exchanges
                        // await this.detectExchangeTransactions(transaction)
                        
                        //Set previous/next if we already have a previous transaction
                        if (previousTransaction && previousTransaction._id != currentTransaction._id) {
                            currentTransaction.previousId = previousTransaction._id
                            previousTransaction.nextId = currentTransaction._id
                        }
        
        
                        console.timeEnd(`Processesing ${event.blockNumber} / ${event.transactionHash} / ${event.logIndex} (${processedCount + 1} of ${events.length})`)
        
                        previousTransaction = currentTransaction
        
                        //Increment the count
                        processedCount++ 



                    } catch(ex) {
                        console.log(ex)
                    }
    
    
                }


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
    
                await this.processedTransactionService.putAll(transactionsToSave)


   
                //Save token owners
                let tokenOwners = []
                for (let owner of Object.keys(result.ownersToUpdate)) {

                    //Update count before saving.
                    result.ownersToUpdate[owner].count = result.ownersToUpdate[owner].tokenIds?.length
                    result.ownersToUpdate[owner].tokenIds.sort()

                    tokenOwners.push(result.ownersToUpdate[owner])
                }
    
                await this.tokenOwnerService.putAll(tokenOwners)
    
    
    
                //Save tokens
                let tokens = []
                for (let tokenId of Object.keys(result.tokensToUpdate)) {
                    tokens.push(result.tokensToUpdate[tokenId])
                }
    
                await this.tokenService.putAll(tokens)
    
    
    

    
    
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
    
    async detectExchangeTransactions(transaction: Transaction) {

        if (!transaction) return

        //Log details from:
        //https://github.com/Crypto-Phunks/nft-sales-twitter-bot/blob/main/src/erc721sales.service.ts


        const looksInterface = new ethers.utils.Interface(looksRareABI)
        const nftxInterface = new ethers.utils.Interface(nftxABI)
        const seaportInterface = new ethers.utils.Interface(openseaSeaportABI)


        const LR = transaction.receipt.logs.map((log: any) => {

            if (log.address.toLowerCase() === '0x59728544b08ab483533076417fbbb2fd0b17ce3a'.toLowerCase()) {
                return looksInterface.parseLog(log)
            }

        }).filter((log: any) => (log?.name === 'TakerAsk' || log?.name === 'TakerBid'))

        const NFTX = transaction.receipt.logs.map((log: any) => {

            // direct buy from vault
            if (log.topics[0].toLowerCase() === '0x1cdb5ee3c47e1a706ac452b89698e5e3f2ff4f835ca72dde8936d0f4fcf37d81') {

                const relevantData = log.data.substring(2)
                const relevantDataSlice = relevantData.match(/.{1,64}/g)
                return BigInt(`0x${relevantDataSlice[1]}`) / BigInt('1000000000000000')

            } else if (log.topics[0].toLowerCase() === '0x63b13f6307f284441e029836b0c22eb91eb62a7ad555670061157930ce884f4e') {

                const parsedLog = nftxInterface.parseLog(log)

                // check that the current transfer is NFTX related
                if (!parsedLog.args.nftIds.length) {
                    return
                }

                // redeem, find corresponding token bought
                const buys = transaction.receipt.logs.filter((log2: any) => log2.topics[0].toLowerCase() === '0xf7735c8cb2a65788ca663fc8415b7c6a66cd6847d58346d8334e8d52a599d3df')
                    .map((b: any) => {
                        const relevantData = b.data.substring(2)
                        const relevantDataSlice = relevantData.match(/.{1,64}/g)
                        return BigInt(`0x${relevantDataSlice[1]}`)
                    })
                if (buys.length) {
                    return buys.reduce((previous, current) => previous + current, BigInt(0)) / BigInt('1000000000000000')
                } else {
                    // we're still missing the funds, check swap of weth
                    const swaps = transaction.receipt.logs.filter((log2: any) => log2.topics[0].toLowerCase() === '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822')
                        .map((b: any) => {
                            const relevantData = b.data.substring(2)
                            const relevantDataSlice = relevantData.match(/.{1,64}/g)
                            const moneyIn = BigInt(`0x${relevantDataSlice[1]}`)
                            if (moneyIn > BigInt(0))
                                return moneyIn / BigInt('1000000000000000')
                        })
                    if (swaps.length) return swaps[0]
                }
            }

        }).filter(n => n !== undefined)
    
        const NLL = transaction.receipt.logs.map((log: any) => {

            if (log.topics[0].toLowerCase() === '0x975c7be5322a86cddffed1e3e0e55471a764ac2764d25176ceb8e17feef9392c') {
                const relevantData = log.data.substring(2)

                return BigInt(`0x${relevantData}`) / BigInt('1000000000000000')
            }

        }).filter(n => n !== undefined)

        const X2Y2 = transaction.receipt.logs.map((log: any, index: number) => {

            if (log.topics[0].toLowerCase() === '0x3cbb63f144840e5b1b0a38a7c19211d2e89de4d7c5faf8b2d3c1776c302d1d33') {

                const data = log.data.substring(2)
                const dataSlices = data.match(/.{1,64}/g)

                // find the right token
                let amount = BigInt(`0x${dataSlices[12]}`) / BigInt('1000000000000000')

                if (amount === BigInt(0)) {
                    amount = BigInt(`0x${dataSlices[26]}`) / BigInt('1000000000000000')
                }

                return amount

            }

        }).filter(n => n !== undefined)  



        const OPENSEA_SEAPORT = transaction.receipt.logs.map((log: any) => {

            if (log.topics[0].toLowerCase() === '0x9d9af8e38d66c62e2c12f0225249fd9d721c54b83f48d9352c97c6cacdcb6f31') {
                const logDescription = seaportInterface.parseLog(log)
                const matchingOffers = logDescription.args.offer.filter(
                    o => o.identifier.toString() === '0')
                const tokenCount = logDescription.args.offer.length;
                if (matchingOffers.length === 0) {
                    return
                }
                let amounts = logDescription.args.consideration.map(c => BigInt(c.amount))
                // add weth
                const wethOffers = matchingOffers.map(o => o.token === '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' && o.amount > 0 ? BigInt(o.amount) : BigInt(0))

                if (wethOffers.length > 0 && wethOffers[0] != BigInt(0)) {
                    console.log('found weth offer, using it as amount')
                    amounts = wethOffers
                }

                // console.log(amounts)

                const amount = amounts.reduce((previous, current) => previous + current, BigInt(0))
                return amount / BigInt('1000000000000000') / BigInt(tokenCount)
            }
        }).filter(n => n !== undefined)   

        let alternateValue

        if (LR.length) {

            const weiValue = (LR[0]?.args?.price)?.toString()
            const value = ethers.utils.formatEther(weiValue)
            alternateValue = parseFloat(value)

        } else if (NFTX.length) {

            // find the number of token transferred to adjust amount per token
            const redeemLog = transaction.receipt.logs.filter((log: any) => log.topics[0].toLowerCase() === '0x63b13f6307f284441e029836b0c22eb91eb62a7ad555670061157930ce884f4e')[0]
            const parsedLog = nftxInterface.parseLog(redeemLog)
            const tokenCount = Math.max(parsedLog.args.nftIds.length, 1)
            alternateValue = parseFloat(NFTX[0].toString()) / tokenCount / 1000

        } else if (NLL.length) {

            alternateValue = parseFloat(NLL[0].toString()) / 1000

        } else if (X2Y2.length) {

            alternateValue = parseFloat(X2Y2[0].toString()) / 1000

        } else if (OPENSEA_SEAPORT.length) {

            alternateValue = parseFloat(OPENSEA_SEAPORT[0].toString()) / 1000

        }

        console.log(LR)
        console.log(NFTX)
        console.log(NLL)
        console.log(X2Y2)
        console.log(OPENSEA_SEAPORT)




    }


    private createProcessedEvents(currentTransaction: ProcessedTransaction) {

        //If it's an "Approve" event then we check the next event and if it's a transfer
        //then just skip this. Seems like exchanges set approval to 0x000 before transferring
        //So that the new owner has revoked all token approvals. 
    
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

            //If the same from/to as the last one just add it to the same processed event
            if (
                e.event == "Transfer" && 
                previousProcessedTransfer && 
                e.namedArgs.fromAddress == previousProcessedTransfer.namedArgs.fromAddress && 
                e.namedArgs.toAddress == previousProcessedTransfer.namedArgs.toAddress
            ) {

                previousProcessedTransfer.tokenIds.push(parseInt(e.namedArgs.tokenId))

            } else {

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

            }

        }


        // let marketContracts = {
        //     "0x00000000006c3852cbef3e08e8df289169ede581": {
        //         name: "OpenSea Seaport 1.1",
                
        //     }
        // }


        //Identify OpenSea



        //Identify LooksRare




        //Identify top 10 markets

        //Get sale price in ETH

        //Get sale price in $





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