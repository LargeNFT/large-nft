import { inject, injectable } from "inversify"

import { ParamType } from "ethers/lib/utils.js"
import { ethers } from "ethers"
import { TransactionRepository } from "../../sync/repository/transaction-repository.js"
import { Transaction } from "../../sync/dto/transaction.js"
import { TransactionValue } from "../../sync/dto/processed-transaction.js"
import { WalletService } from "../../reader/service/core/wallet-service.js"


@injectable()
class TransactionService {

    @inject("TransactionRepository")
    private transactionRepository:TransactionRepository

    @inject("WalletService")
    private walletService:WalletService

    constructor() {}

    async get(_id:string) {
        return this.transactionRepository.get(_id)
    }

    async getOrDownload(_id:string, options?:any): Promise<Transaction> {        
        
        let transaction

        try {
            transaction = await this.transactionRepository.get(_id)
        } catch(ex) {}

        if (!transaction) {

            try {

                console.log(`Downloading transaction #${_id}`)


                transaction = new Transaction()
                
                //Download it.
                let transactionData = await this.walletService.provider.getTransaction(_id)
                let transactionReceiptData = await this.walletService.provider.getTransactionReceipt(_id)

                transaction._id = transactionData.hash
                transaction.data = transactionData.data
                transaction.hash = transactionData.hash 
                transaction.blockHash = transactionData.blockHash
                transaction.blockNumber = transactionData.blockNumber
                transaction.transactionIndex = transactionData.transactionIndex
                transaction.from = transactionData.from
                transaction.gasLimit = transactionData.gasLimit
                transaction.gasPrice = transactionData.gasPrice
                transaction.nonce = transactionData.nonce
                transaction.value = transactionData.value
                transaction.networkId = transactionData.networkId
                transaction.r = transactionData.r
                transaction.s = transactionData.s
                transaction.v = transactionData.v
                transaction.raw = transactionData.raw

                transaction.receipt = {
                    to: transactionReceiptData.to,
                    contractAddress: transactionReceiptData.contractAddress,
                    cumulativeGasUsed: transactionReceiptData.cumulativeGasUsed,
                    effectiveGasPrice: transactionReceiptData.effectiveGasPrice,
                    gasUsed: transactionReceiptData.gasUsed,
                    logs: transactionReceiptData.logs
                }


                await this.transactionRepository.put(transaction, options)

            } catch(ex) {
                console.log(ex)
            }
        }

        return transaction
    }

    async put(transaction:Transaction, options?:any) {
        return this.transactionRepository.put(transaction, options)
    }

    async remove(transaction:Transaction, options?:any) : Promise<void> {
        return this.transactionRepository.remove(transaction, options)
    }

    /**
     * No validation for speeeeeeeeed
     * @param ercEvents 
     * @returns 
     */
     async putAll(transactions:Transaction[], options?:any) {
        return this.transactionRepository.putAll(transactions,options)
    }

    async findBetweenBlocks(startBlock: number, endBlock: number, options?: any): Promise<Transaction[]> {
        return this.transactionRepository.findBetweenBlocks(startBlock, endBlock, options)
    }


    async getLatest() : Promise<Transaction> {
        let l = await this.transactionRepository.list(1, 0)

        if (l?.length >0) {
            return Object.assign(new Transaction(), l[0])
        }

    }


    /**
     * Basic logic modified from:
     * https://github.com/Silika-Studio/nft-twitter-sales-bot/blob/main/src/handler.ts
     * @param transaction 
     * @returns 
     */
    async getTransactionValue(transaction:Transaction, contractAddress:string, ethUSDPrice:number) : Promise<TransactionValue> {

        if (!transaction.receipt.to) return
        const recipient = ethers.utils.getAddress(transaction.receipt.to)

        if ((recipient in markets)) {
            const market = markets[recipient]
            return this.processMarketplaceTransaction(market, transaction, recipient, contractAddress, ethUSDPrice)
        }
        
        if ((recipient in aggregators)) {
            return this.processAggregatorTransaction(markets, transaction, recipient, contractAddress, ethUSDPrice)
        }


    }


    processAggregatorTransaction(markets:Markets, transaction: Transaction, recipient: string, contractAddress: string, ethUSDPrice:number) : TransactionValue {

        let result:TransactionValue = {
            tokenIds: [],
            totalPrice:0,
            tokenPrice:{},
            markets: {}
        }


        // default to eth, see `constants.ts` for other supported currencies
        let currencyAddress = '0x0000000000000000000000000000000000000000'

        // Look for whether a non-ETH token was used
        transaction.receipt.logs.forEach((log: any) => {
            const logAddress = ethers.utils.getAddress(log.address)
            if (logAddress in currencies) {
                currencyAddress = logAddress
            }
        })
        
        const currency = currencies[currencyAddress]

        let previousTransferTokenIds = []
        let afterTransferCursorIndex

        transaction.receipt.logs.forEach((log: any, index) => {

            // First topic for events is the event signature, 4th is the ID
            // Always true for all standard ERC-721 Transfer events.
            // The Transfer event has 3 args, all indexed,
            // so we know `data` is empty
            if (log.data === '0x' && log.topics[0] === transferEventSignature) {
                const tokenId = ethers.BigNumber.from(log.topics[3]).toString()
                result.tokenIds.push(parseInt(tokenId))
                previousTransferTokenIds.push(tokenId) 

            } else {

                // const logAddress = ethers.utils.getAddress(log.address)

                let salesEventSignature = saleEventSignatures.find(sig => sig.signature == log.topics[0])

                if (salesEventSignature) {

                    let marketEntry = Object.entries(markets).find( m => m[1].id == salesEventSignature.market)
                    let market = marketEntry[1]
    
                    let saleResult = this.decodeSale(market, currency, log, contractAddress)

                    result.totalPrice += saleResult.price 

                    //If we're looking forward for OpenSea Seaport we need to track which is the last 
                    //transfer we did.
                    index = afterTransferCursorIndex ? Math.max(afterTransferCursorIndex, index) : index

                    let tokenIds

                    if (previousTransferTokenIds?.length > 0) {
                        tokenIds = JSON.parse(JSON.stringify(previousTransferTokenIds))
                        previousTransferTokenIds.length = 0
                    } else {
                        //Look forward to the next Transfer event
                        for (let i=index+1; i < transaction.receipt.logs.length; i++ ) {
        
                            let theLog:any = transaction.receipt.logs[i]
        
                            if (theLog.data === '0x' && theLog.topics[0] === transferEventSignature) {
                                tokenIds = [ethers.BigNumber.from(theLog.topics[3]).toString()]
                                afterTransferCursorIndex = i
                                previousTransferTokenIds.length = 0
                                break
                            }
                        }
                    }

                    //Grab price info for each token.
                    tokenIds?.forEach( tokenId => {

                        let tokenPrice = tokenIds.length == 1 ? saleResult.price : saleResult.price / tokenIds.length

                        result.tokenPrice[tokenId] = {
                            price: tokenPrice,
                            currency: currency.name,
                            usdValue: this.getUSDValue(currency, tokenPrice, ethUSDPrice)
                        } 
                    })

                    //Grab/add info for market.
                    if (!result.markets[market.name]) {
                        result.markets[market.name] = {
                            currencies: {}
                        }
                    }

                    let existingMarketPrice = result.markets[market.name].currencies[currency.name]?.price ? result.markets[market.name].currencies[currency.name].price : 0
                    let existingMarketUsdValue = result.markets[market.name].currencies[currency.name]?.usdValue ? result.markets[market.name].currencies[currency.name].usdValue : 0

                    result.markets[market.name].currencies[currency.name] = {
                        price: existingMarketPrice + saleResult.price,
                        usdValue: existingMarketUsdValue + this.getUSDValue(currency, saleResult.price, ethUSDPrice)
                    }

                }

            }
        })

        result.totalPrice = parseFloat(result.totalPrice.toFixed(10))
        result.currency = currency.name
        result.aggregator = aggregators[recipient].name
        result.usdValue = this.getUSDValue(currency, result.totalPrice, ethUSDPrice)

        return result



    }

    processMarketplaceTransaction(market:Market, transaction:Transaction, recipient:string, contractAddress:string, ethUSDPrice:number) : TransactionValue {

        let result:TransactionValue = {
            tokenIds: [],
            totalPrice:0,
            tokenPrice:{},
            markets: {}
        }

        // default to eth, see `constants.ts` for other supported currencies
        let currencyAddress = '0x0000000000000000000000000000000000000000'

        // Look for whether a non-ETH token was used
        transaction.receipt.logs.forEach((log: any) => {
            const logAddress = ethers.utils.getAddress(log.address)
            if (logAddress in currencies) {
                currencyAddress = logAddress
            }
        })
        
        const currency = currencies[currencyAddress]

        // Calculate price paid
        let previousTransferTokenIds = []
        let afterTransferCursorIndex
        
        transaction.receipt.logs.forEach((log: any, index:number) => {

            // First topic for events is the event signature, 4th is the ID
            // Always true for all standard ERC-721 Transfer events.
            // The Transfer event has 3 args, all indexed,
            // so we know `data` is empty
            if (log.data === '0x' && log.topics[0] === transferEventSignature) {
                const tokenId = ethers.BigNumber.from(log.topics[3]).toString()
                result.tokenIds.push(parseInt(tokenId))
                previousTransferTokenIds.push(tokenId) 
            } else {

                const logAddress = ethers.utils.getAddress(log.address)

                let salesEventSignature = saleEventSignatures.find(sig => sig.signature == log.topics[0])
 
                if (logAddress == recipient && salesEventSignature) {

                    let saleResult = this.decodeSale(market, currency, log, contractAddress)

                    result.totalPrice += saleResult.price 

                    //If we're looking forward for OpenSea Seaport we need to track which is the last 
                    //transfer we did.
                    index = afterTransferCursorIndex ? Math.max(afterTransferCursorIndex, index) : index

                    let tokenIds

                    if (previousTransferTokenIds?.length > 0) {
                        tokenIds = JSON.parse(JSON.stringify(previousTransferTokenIds))
                        previousTransferTokenIds.length = 0
                    } else {
                        //Look forward to the next Transfer event
                        for (let i=index+1; i < transaction.receipt.logs.length; i++ ) {
        
                            let theLog:any = transaction.receipt.logs[i]
        
                            if (theLog.data === '0x' && theLog.topics[0] === transferEventSignature) {
                                tokenIds = [ethers.BigNumber.from(theLog.topics[3]).toString()]
                                afterTransferCursorIndex = i
                                previousTransferTokenIds.length = 0
                                break
                            }
                        }
                    }

                    tokenIds?.forEach( tokenId => {

                        let tokenPrice = tokenIds.length == 1 ? saleResult.price : saleResult.price / tokenIds.length

                        result.tokenPrice[tokenId] = {
                            price: tokenPrice,
                            currency: currency.name,
                            usdValue: this.getUSDValue(currency, tokenPrice, ethUSDPrice)
                        } 
                    })
                }

            }

        })

        result.totalPrice = parseFloat(result.totalPrice.toFixed(10))
        result.currency = currency.name
        result.usdValue = this.getUSDValue(currency, result.totalPrice, ethUSDPrice)
        
        result.markets[market.name] = {
            currencies: {}
        }

        result.markets[market.name].currencies[currency.name] = {
            price: parseFloat(result.totalPrice.toFixed(10)),
            usdValue: this.getUSDValue(currency, result.totalPrice, ethUSDPrice)
        }

        return result


    }

    decodeSale(market:Market, currency:Currency, log, contractAddress) {

        const decodedLogData:any = ethers.utils.defaultAbiCoder.decode(market.logDecoder as ParamType[], log.data) as unknown as DecodedOSLogData


        let price = 0


        switch (market.id) {

            case 'Blur':

                price = parseFloat(ethers.utils.formatUnits(
                    decodedLogData.sell.price,
                    currency.decimals,
                ))

                break;

            case 'OpenSea (Seaport)':
                price =
                    getSeaportSalePrice(
                        decodedLogData,
                        contractAddress,
                    )
                break;
            case 'X2Y2':
                price = parseFloat(ethers.utils.formatUnits(
                    decodedLogData.amount,
                    currency.decimals,
                ))
                break
            default:
                price = parseFloat(ethers.utils.formatUnits(
                    decodedLogData.price,
                    currency.decimals,
                ))
        }

        return {
            price: price
        }
    
    }

    getTokenForLog(transaction:Transaction, index:number, transfer:string, previousTransferTokenId:number) {
        
        switch(transfer) {

            case "before":

                if (previousTransferTokenId) {
                    return previousTransferTokenId
                }

            case "after":

                //Look forward to the next Transfer event
                for (let i=index+1; i < transaction.receipt.logs.length; i++ ) {

                    let theLog:any = transaction.receipt.logs[i]

                    if (theLog.data === '0x' && theLog.topics[0] === transferEventSignature) {
                        return ethers.BigNumber.from(theLog.topics[3]).toString()
                    }
                }

        }


    }

    getUSDValue(currency:Currency, amount:number, ethUSDPrice:number) {

        let usdValue

        switch(currency.name) {

            case "ETH":
            case "WETH":
                usdValue =  amount * ethUSDPrice
                break
            case "DAI":
            case "USDC":
                usdValue =  amount
                break

        }


        return usdValue


    }






}





/**
 * Basic data structures from 
 */
//https://github.com/Silika-Studio/nft-twitter-sales-bot/blob/main/src/constants.ts


interface Currency {
    /**
     * Currency name, eg "ETH"
     */
    name: string;
    /**
     * Number of decimals for this currency
     */
    decimals: number;
}

type Currencies = Record<string, Currency>

/**
 * ethers' `ParamType` type is quite bad.
 * In essence, it has multiple mandatory attributes that are in fact optional
 * (they even call them out as nullable in the comments above the attribute)
 * Our decode type is a `Pick` of their `ParamType` with proper optional-ability
 */
type BaseDecodeParamType = Pick<ParamType, 'type' | 'name'>;
type DecodeParamType =
    BaseDecodeParamType & { components?: BaseDecodeParamType[] }



/**
 * Human-readable name for supported marketplace contracts
 */
type MarketId =
    'OpenSea (Wyvern)' |
    'OpenSea (Seaport)' |
    'X2Y2' |
    'Blur' |
    'LooksRare';

type MarketName = 'OpenSea' | 'X2Y2' | 'LooksRare' | 'Blur'

interface Market {
    /**
     * ID of the market
     */
    id: MarketId
    /**
     * String used when tweeting
     * eg: Seaport and Wyvern are different,
     * but we tweet "OpenSea" for both
     */
    name: MarketName
    /**
     * URL to marketplace
     */
    marketplaceUrl: string
    /**
     * Known schema used to decode this marketplace's logs
     */
    logDecoder: any[] //removing the type for now. dealing with Blur
}
export type Markets = Record<string, Market>



/**
 * Human-readable name for supported aggregator contracts
 */
 type AggregatorId =
 'Genie' |
 'Gem';

type AggregatorName = 'Genie' | 'Gem'

interface Aggregator {
 /**
  * ID of the market
  */
 id: AggregatorId
 /**
  * String used when tweeting
  * eg: Seaport and Wyvern are different,
  * but we tweet "OpenSea" for both
  */
 name: AggregatorName

}
export type Aggregators = Record<string, Aggregator>




const currencies: Currencies = {

    '0x0000000000000000000000000000000000000000': {
        name: 'ETH',
        decimals: 18,
    },

    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': {
        name: 'WETH',
        decimals: 18,
    },

    '0x6B175474E89094C44Da98b954EedeAC495271d0F': {
        name: 'DAI',
        decimals: 18,
    },

    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': {
        name: 'USDC',
        decimals: 6,
    },
}

/**
 * Manual information for each supported marketplace.
 *
 * Each marketplace has a different log schema, hence the need
 * to store the information here to decode the log.data.
 */
const markets: Markets = {

    '0x74312363e45DCaBA76c59ec49a7Aa8A65a67EeD3': {
        id: 'X2Y2',
        name: 'X2Y2',
        marketplaceUrl: 'https://x2y2.io/eth/',
        logDecoder: [
            {
                type: 'bytes32',
                name: 'itemHash',
            },
            {
                type: 'address',
                name: 'currency',
            },
            {
                type: 'address',
                name: 'to',
            },
            {
                type: 'uint256',
                name: 'amount',
            },
        ],
    },
    '0x7f268357A8c2552623316e2562D90e642bB538E5': {
        id: 'OpenSea (Wyvern)',
        name: 'OpenSea',
        marketplaceUrl: 'https://opensea.io/assets/',
        logDecoder: [
            {
                type: 'bytes32',
                name: 'buyHash',
            },
            {
                type: 'bytes32',
                name: 'sellHash',
            },
            {
                type: 'uint256',
                name: 'price',
            },
        ],
    },
    '0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b': {
        id: 'OpenSea (Wyvern)',
        name: 'OpenSea',
        marketplaceUrl: 'https://opensea.io/assets/',
        logDecoder: [
            {
                type: 'bytes32',
                name: 'buyHash',
            },
            {
                type: 'bytes32',
                name: 'sellHash',
            },
            {
                type: 'uint256',
                name: 'price',
            },
        ],
    },
    '0x59728544B08AB483533076417FbBB2fD0B17CE3a': {
        id: 'LooksRare',
        name: 'LooksRare',
        marketplaceUrl: 'https://looksrare.org/collections/',
        logDecoder: [
            {
                type: 'bytes32',
                name: 'orderHash',
            },
            {
                type: 'uint256',
                name: 'orderNonce',
            },
            {
                type: 'address',
                name: 'currency',
            },
            {
                type: 'address',
                name: 'collection',
            },
            {
                type: 'uint256',
                name: 'tokenId',
            },
            {
                type: 'uint256',
                name: 'amount',
            },
            {
                type: 'uint256',
                name: 'price',
            },
        ],
    },
    '0x00000000006c3852cbEf3e08E8dF289169EdE581': {
        id: 'OpenSea (Seaport)',
        name: 'OpenSea',
        marketplaceUrl: 'https://opensea.io/assets/',
        logDecoder: [
            {
                type: 'bytes32',
                name: 'orderHash',
            },
            {
                type: 'address',
                name: 'recipient',
            },
            {
                type: 'tuple[]',
                name: 'offer',
                components: [
                    {
                        type: 'uint8',
                        name: 'itemType',
                    },
                    {
                        type: 'address',
                        name: 'token',
                    },
                    {
                        type: 'uint256',
                        name: 'identifier',
                    },
                    {
                        type: 'uint256',
                        name: 'amount',
                    },
                ],
            },
            {
                type: 'tuple[]',
                name: 'consideration',
                components: [
                    {
                        type: 'uint8',
                        name: 'itemType',
                    },
                    {
                        type: 'address',
                        name: 'token',
                    },
                    {
                        type: 'uint256',
                        name: 'identifier',
                    },
                    {
                        type: 'uint256',
                        name: 'amount',
                    },
                    {
                        type: 'address',
                        name: 'recipient',
                    },
                ],
            },
        ],
    },
    
    '0x000000000000Ad05Ccc4F10045630fb830B95127': {
        id: 'Blur',
        name: 'Blur',
        marketplaceUrl: 'https://blur.io',
        logDecoder: [
            {
              components: [
                {
                  name: "trader",
                  type: "address"
                },
                {
                  name: "side",
                  type: "uint8"
                },
                {
                  name: "matchingPolicy",
                  type: "address"
                },
                {
                  name: "collection",
                  type: "address"
                },
                {
                  name: "tokenId",
                  type: "uint256"
                },
                {
                  name: "amount",
                  type: "uint256"
                },
                {
                  name: "paymentToken",
                  type: "address"
                },
                {
                  name: "price",
                  type: "uint256"
                },
                {
                  name: "listingTime",
                  type: "uint256"
                },
                {
                  name: "expirationTime",
                  type: "uint256"
                },
                {
                  components: [
                    {
                      name: "rate",
                      type: "uint16"
                    },
                    {
                      name: "recipient",
                      type: "address"
                    }
                  ],
                  name: "fees",
                  type: "tuple[]"
                },
                {
                  name: "salt",
                  type: "uint256"
                },
                {
                  name: "extraParams",
                  type: "bytes"
                }
              ],
              name: "sell",
              type: "tuple"
            },
            {
              name: "sellHash",
              type: "bytes32"
            },
            {
              components: [
                {
                  name: "trader",
                  type: "address"
                },
                {
                  name: "side",
                  type: "uint8"
                },
                {
                  name: "matchingPolicy",
                  type: "address"
                },
                {
                  name: "collection",
                  type: "address"
                },
                {
                  name: "tokenId",
                  type: "uint256"
                },
                {
                  name: "amount",
                  type: "uint256"
                },
                {
                  name: "paymentToken",
                  type: "address"
                },
                {
                  name: "price",
                  type: "uint256"
                },
                {
                  name: "listingTime",
                  type: "uint256"
                },
                {
                  name: "expirationTime",
                  type: "uint256"
                },
                {
                  components: [
                    {
                      name: "rate",
                      type: "uint16"
                    },
                    {
                      name: "recipient",
                      type: "address"
                    }
                  ],
                  name: "fees",
                  type: "tuple[]"
                },
                {
                  name: "salt",
                  type: "uint256"
                },
                {
                  name: "extraParams",
                  type: "bytes"
                }
              ],

              name: "buy",
              type: "tuple"
            },
            {

              name: "buyHash",
              type: "bytes32"
            }
          ],
    }


    
}

const aggregators: Aggregators = { 

    '0x0a267cF51EF038fC00E71801F5a524aec06e4f07': {
        id: 'Genie',
        name: 'Genie'
    },


}

export const transferEventSignature =
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'

export const saleEventSignatures = [
    // OrdersMatched (Opensea Wyvern)
    { 
        signature: '0xc4109843e0b7d514e4c093114b863f8e7d8d9a458c372cd51bfe526b588006c9', 
        market: 'OpenSea (Wyvern)'
    },
    // EvProfit (X2Y2)
    { 
        signature: '0xe2c49856b032c255ae7e325d18109bc4e22a2804e2e49a017ec0f59f19cd447b', 
        market: 'X2Y2'
    },
    // TakerBid (LooksRare)
    { signature: '0x95fb6205e23ff6bda16a2d1dba56b9ad7c783f67c96fa149785052f47696f2be', 
        market: 'LooksRare'
    },
    // TakerAsk (LooksRare)
    { 
        signature: '0x68cd251d4d267c6e2034ff0088b990352b97b2002c0476587d0c4da889c11330', 
        market: 'LooksRare'
    },
    // OrderFulfilled (Opensea Seaport)
    { 
        signature: '0x9d9af8e38d66c62e2c12f0225249fd9d721c54b83f48d9352c97c6cacdcb6f31', 
        market: 'OpenSea (Seaport)'
    },
    // (Blur)
    { 
        signature: '0x61cbb2a3dee0b6064c2e681aadd61677fb4ef319f0b547508d495626f5a62f64', 
        market: 'Blur'
    }

]

// ------------ OS log types ------------
/**
 * Base decoded log data for both Offers and Considerations.
 *
 * For more information on this type, look at the non-indexed args
 * of Seaport's `OrderFulfilled` event, as those are what is included
 * as data
 * @link https://etherscan.io/address/0x00000000006c3852cbef3e08e8df289169ede581#code
 */
 export type OfferAndConsiderationBase =
 [string, string, string, string, string] & {
     itemType: string;
     token: string;
     identifier: string;
     amount: string;
 };

export type IndividualOffer = OfferAndConsiderationBase;
/**
* Decoded log type for the buyer of the NFT
*/
export type Offer = IndividualOffer[]
export type IndividualConsideration = [...OfferAndConsiderationBase,
] & { recipient: string; }

/**
 * Decoded log type for the seller of the NFT
 */
export type Consideration = IndividualConsideration[]


/**
 * If the buyer is the one who executes the final tx (aka pressing "Buy Now")
 * then the consideration log data will contain the token info, and the offer
 * the price paid.
 *
 * If accepting an offer, it's reversed
 */
 export type DecodedOSLogData = Record<string, string> & { consideration: Consideration; offer: Offer; }


/**
 * Gets a value from the `offerOrConsideration`. The type we
 * get from the decoded logs is hard to work with,
 * being a mix of an array and a key:value object.
 * This just abstracts away casting as any
 *
 * eg:
 [
  '0',
  '0x0000000000000000000000000000000000000000',
  '0',
  '46500000000000000',
  '0x459fE44490075a2eC231794F9548238E99bf25C0',
  itemType: '0',
  token: '0x0000000000000000000000000000000000000000',
  identifier: '0',
  amount: '46500000000000000',
  recipient: '0x459fE44490075a2eC231794F9548238E99bf25C0'
]
 * @param offerOrConsideration
 * @param key
 * @returns
 */
const getValueFromOfferOrConsideration =
    (offerOrConsideration: IndividualOffer | IndividualConsideration,
        key: 'token' | 'amount',
    ) => {
        return (offerOrConsideration as any)[key];
    };

function calcPriceReducer(
    previous: number,
    current: IndividualConsideration | IndividualOffer,
) {
    
    const currency = currencies[ethers.utils.getAddress(getValueFromOfferOrConsideration(current,'token'))]

    if (currency !== undefined) {
        const result =
            previous +
            Number(ethers.utils.formatUnits(
                getValueFromOfferOrConsideration(current, 'amount'),
                currency.decimals,
            ));

        return result;
    } else {
        return previous;
    }
}




/**
 * Seaport has a more complex log schema. Whereas other marketplaces
 * have it easily visible in the log data, Seaport's log data is a tuple of each
 * component of the total price paid
 * ie: if 1 eth is paid, OS takes 2.5% and the collection takes 5%, there are
 * 3 tuples in the offer/consideration representing:
 * - 0.925 to the seller
 * - 0.025 to OS
 * - 0.05 to the collection
 * @param decodedLogData
 * @param contractAddress
 * @returns
 */
 const getSeaportSalePrice = (
    decodedLogData: DecodedOSLogData,
    contractAddress: string,
) => {
    const offer = decodedLogData.offer
    const consideration = decodedLogData.consideration

    // console.log(offer)

    // if nfts are on the offer side, then consideration is the total price,
    // otherwise the offer is the total price
    const offerSideNfts =
        offer.some(o =>
            getValueFromOfferOrConsideration(o, 'token')
                .toLowerCase() === contractAddress.toLowerCase(),
        );

    if (offerSideNfts) {
        const totalConsiderationAmount =
            consideration.reduce(calcPriceReducer, 0)

        return parseFloat(totalConsiderationAmount.toFixed(10))
    } else {
        const totalOfferAmount = offer.reduce(calcPriceReducer, 0)
        return parseFloat(totalOfferAmount.toFixed(10))
    }
}


export {
    TransactionService
}

