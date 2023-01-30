import { ERCEvent } from "../../sync/dto/erc-event.js"
import { SaleViewModel } from "../service/processed-transaction-service.js"
import { LeaderboardRowViewModel } from "./token-owner-page.js"


class ProcessedTransaction {
    
    declare _id?:string
    declare _rev?:string 
    declare blockNumber?:number
    declare transactionIndex?:number
    declare from?:string
    declare timestamp?:number

    ercEvents?:ERCEvent[]
    transactionFrom?:string

    declare processedEvents?:ProcessedEvent[]

    declare transactionValue?:TransactionValue

    declare previousId?:string

    declare previousByTokenIds?:{}

    declare previousByTransactionInitiatorId?:{}

    declare previousByTokenOwnerId?:{}

    declare nextId?:string

    declare nextByTokenIds?:{}

    declare nextByTokenOwnerId?:{}

    declare nextByTransactionInitiatorId?:{}

    declare lastUpdated?:string 
    
    declare dateCreated?:string

}


interface TokenPrice {
    [tokenId: string]: {
        price?:number
        currency?:string
        usdValue?:number
    }
}

interface TransactionValue {
    totalPrice?: number
    usdValue?:number
    currency?: string
    tokenPrice?: TokenPrice,
    market?: string
    tokenIds?: number[]
}


interface ProcessedEvent {
    isMint?:boolean
    isBurn?:boolean
    tokenId?:number[]
    event?:string 
    namedArgs?:any
    salePrice?:string
    fromAddress?:string
    toAddress?:string
    transactionFrom?:string
}


interface SalesReport {

    totals?:SalesRow

    yearTotals?:SalesRow
    monthTotals?:SalesRow
    weekTotals?:SalesRow
    dayTotals?:SalesRow

}

interface SalesRow {
    
    events?:number

    ethValue?:number
    usdValue?:number

    averageEthValue?:number
    averageUsdValue?:number

}

interface Sale {
    tokenId?:number
    transactionId?:string
    ethValue?:number
    usdValue:number
    date:string 
}

interface OwnersByAttribute {
    owner: string 
    count: number
}

interface AttributeSaleReport {

    totals?:AttributeSalesRow[]

    owners: [{
        owner: string
        count: number
    }]

    ownersViewModels: LeaderboardRowViewModel[]

    largestSales: {
        [key: string]: Sale[]
    }

    largestSalesViewModels: SaleViewModel[]
}

interface AttributeSalesRow extends SalesRow {
    traitType?:string
    value?:string 
}


interface AttributeOverallSales {
    events?:number

    ethValue?:number
    usdValue?:number

    averageEthValue?:number
    averageUsdValue?:number
}


export {
    ProcessedTransaction, ProcessedEvent, TransactionValue, SalesReport, SalesRow, Sale, AttributeSaleReport, AttributeOverallSales
}