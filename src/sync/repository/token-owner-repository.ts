import { TokenOwner } from "../dto/token-owner.js"


interface TokenOwnerRepository {
    get(_id:string, options?:any): Promise<TokenOwner>
    put(tokenOwner:TokenOwner, options?:any) : Promise<TokenOwner>
    putAll(tokenOwners:TokenOwner[], options?:any) : Promise<void>
    getENS(_id:string) : Promise<string>
    list(limit: number, skip: number, options?:any): Promise<TokenOwner[]> 

}

export {
    TokenOwnerRepository
}
