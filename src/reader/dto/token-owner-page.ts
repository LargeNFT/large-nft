import { TokenOwnerSalesReport } from "../../sync/dto/processed-transaction.js"

interface TokenOwnerPage {
    tokenOwners?:LeaderboardRowViewModel[]
}


interface LeaderboardRowViewModel {
    _id?:string
    ensName?:string
    count?:number
    lastActive?:string
    rank?:number
    salesReport:TokenOwnerSalesReport
}

interface TokenOwnerPageTotals {
    totalPages: number
    totalRecords: number
}

export {
    TokenOwnerPage, LeaderboardRowViewModel, TokenOwnerPageTotals
}