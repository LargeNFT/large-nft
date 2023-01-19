import axios from "axios"
import { inject, injectable } from "inversify"
import { TokenOwnerPageRepository } from "../../../reader/repository/token-owner-page-repository.js"
import { TokenOwnerPage, TokenOwnerPageTotals } from "../../dto/token-owner-page.js"

@injectable()
class TokenOwnerPageRepositoryBrowserImpl implements TokenOwnerPageRepository {

    constructor(
        @inject("baseURI") private baseURI,
        @inject("hostname") private hostname
    ) {}

    async getTotals(): Promise<TokenOwnerPageTotals> {
        const response = await axios.get(`${this.hostname}${this.baseURI}sync/tokenOwner/pages/total.json`)    
        return response.data
    }

    async get(pageNumber: number): Promise<TokenOwnerPage> {   

        const response = await axios.get(`${this.hostname}${this.baseURI}sync/tokenOwner/pages/${pageNumber}.json`)
            
        return response.data
    }

}

export {
    TokenOwnerPageRepositoryBrowserImpl
}


