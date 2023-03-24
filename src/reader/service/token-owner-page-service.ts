import { inject, injectable } from "inversify";
import { LeaderboardRowViewModel, TokenOwnerPage, TokenOwnerPageTotals } from "../dto/token-owner-page.js";
import { TokenOwnerPageRepository } from "../repository/token-owner-page-repository.js";



@injectable()
class TokenOwnerPageService {

    @inject("TokenOwnerPageRepository")
    private tokenOwnerPageRepository:TokenOwnerPageRepository

    constructor(
    ) { }

    async getHome(): Promise<TokenOwnerPage> {
        return this.tokenOwnerPageRepository.getHome()
    }

    async get(pageNumber: number): Promise<TokenOwnerPage> {
        return this.tokenOwnerPageRepository.get(pageNumber)
    }

    async getTotals(): Promise<TokenOwnerPageTotals> {
        return this.tokenOwnerPageRepository.getTotals()
    }

}

export {
    TokenOwnerPageService
}