import { inject, injectable } from "inversify";
import { LeaderboardRowViewModel, TokenOwnerPage, TokenOwnerPageTotals } from "../dto/token-owner-page.js";
import { TokenOwner } from "../dto/token-owner.js";
import { TokenOwnerPageRepository } from "../repository/token-owner-page-repository.js";


@injectable()
class TokenOwnerPageService {

    @inject("TokenOwnerPageRepository")
    private tokenOwnerPageRepository:TokenOwnerPageRepository
  
    constructor(
    ) { }

    async get(pageNumber: number): Promise<TokenOwnerPage> {
        return this.tokenOwnerPageRepository.get(pageNumber)
    }

    async getTotals(): Promise<TokenOwnerPageTotals> {
        return this.tokenOwnerPageRepository.getTotals()
    }

    async buildTokenOwnerPages(tokenOwners:TokenOwner[], perPage:number) : Promise<TokenOwnerPage[]> {

        // await this.schemaService.load(["images"])

        let result: TokenOwnerPage[] = []


        let viewModels:LeaderboardRowViewModel[] = [] 

        //Create view models
        for (let tokenOwner of tokenOwners) {

            viewModels.push({
                _id: tokenOwner._id,
                ensName: tokenOwner.ensName,
                lastActive: tokenOwner.lastActive,
                count: tokenOwner.count
            })

        }

        //Break into rows
        for (let i = 0; i < viewModels.length; i += perPage) {
            result.push({
                tokenOwners: viewModels.slice(i, i + perPage)
            })
        }


        return result

    }

    
}

export {
    TokenOwnerPageService
}