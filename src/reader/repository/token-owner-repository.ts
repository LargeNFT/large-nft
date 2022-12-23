import { TokenOwner } from "../dto/token-owner.js"
import { Changeset } from "../service/core/database-service.js"


interface TokenOwnerRepository {
    get(_id:string): Promise<TokenOwner>
    put(tokenOwner:TokenOwner) : Promise<void>
    putAll(tokenOwners:TokenOwner[]) : Promise<void>
    getByTokenId(tokenId:number, limit:number, skip:number): Promise<TokenOwner> 
    list(limit: number, skip: number): Promise<TokenOwner[]> 

}


let changesets:Changeset[] = [
    {
        id: '0',
        changeset: async (db) => {

            await db.createIndex({
                index: {
                    fields: ['count']
                }
            })

            await db.put({
                _id: '_design/by_token_id',
                views: {
                    by_token_id: {
                            map: function (doc) { 
                          
                                for (let tokenId of doc.tokenIds) {
                                    //@ts-ignore
                                    emit(tokenId)
                                }

                            }.toString(),
                    }
                }
            })

        }
    }
]


export {
    TokenOwnerRepository, changesets
}
