
interface TokenOwnerPage {
    tokenOwners?:LeaderboardRowViewModel[]
}


interface LeaderboardRowViewModel {
    address?:string
    ensName?:string
    count?:number
    lastActive?:string
}

interface TokenOwnerPageTotals {
    totalPages: number
    totalRecords: number
}

export {
    TokenOwnerPage, LeaderboardRowViewModel, TokenOwnerPageTotals
}