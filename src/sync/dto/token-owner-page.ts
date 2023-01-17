
interface TokenOwnerPage {
    tokenOwners?:LeaderboardRowViewModel[]
}


interface LeaderboardRowViewModel {
    _id?:string
    ensName?:string
    count?:number
    lastActive?:string
    rank?:number
}

interface TokenOwnerPageTotals {
    totalPages: number
    totalRecords: number
}

export {
    TokenOwnerPage, LeaderboardRowViewModel, TokenOwnerPageTotals
}