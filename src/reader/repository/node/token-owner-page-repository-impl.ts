import { inject, injectable } from "inversify"
import fs from "fs"
import { TokenOwnerPageRepository } from "../token-owner-page-repository.js"
import { TokenOwnerPage, TokenOwnerPageTotals } from "../../dto/token-owner-page.js"

@injectable()
class TokenOwnerPageRepositoryNodeImpl implements TokenOwnerPageRepository {

    constructor(
        @inject('baseDir') private baseDir
    ) {}

    async getTotals(): Promise<TokenOwnerPageTotals> {
        return JSON.parse(fs.readFileSync(`${this.baseDir}/public/sync/tokenOwner/pages/total.json`, 'utf8'))

    }

    async get(pageNumber:number): Promise<TokenOwnerPage> {                
        return JSON.parse(fs.readFileSync(`${this.baseDir}/public/sync/tokenOwner/pages/${pageNumber}.json`, 'utf8'))
    }

}

export {
    TokenOwnerPageRepositoryNodeImpl
}


