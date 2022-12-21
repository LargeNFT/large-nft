import { TokenOwnerPage, TokenOwnerPageTotals } from "../dto/token-owner-page.js"

interface TokenOwnerPageRepository {
    get(pageNumber:number): Promise<TokenOwnerPage>
    getTotals(): Promise<TokenOwnerPageTotals>
}

export {
    TokenOwnerPageRepository
}
