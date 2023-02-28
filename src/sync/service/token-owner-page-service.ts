import { inject, injectable } from "inversify";
import { LeaderboardRowViewModel, TokenOwnerPage } from "../../reader/dto/token-owner-page.js";
import { TokenOwner } from "../../sync/dto/token-owner.js";
import { ProcessedTransactionService } from "./processed-transaction-service.js";



@injectable()
class TokenOwnerPageService {


    @inject("ProcessedTransactionService")
    private processedTransactionService:ProcessedTransactionService

    constructor(
    ) { }

    async buildTokenOwnerPages(tokenOwners:TokenOwner[], perPage:number) : Promise<TokenOwnerPage[]> {

        let result: TokenOwnerPage[] = []


        let viewModels:LeaderboardRowViewModel[] = [] 

        //Create view models
        for (let tokenOwner of tokenOwners) {

            viewModels.push({
                _id: tokenOwner._id,
                ensName: tokenOwner.ensName,
                lastActive: tokenOwner.lastActive,
                count: tokenOwner.count,
                rank: tokenOwner.rank,
                salesReport: tokenOwner.salesReport
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