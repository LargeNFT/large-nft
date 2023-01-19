import { Token } from "../dto/token.js"


interface TokenRepository {
    get(_id:string): Promise<Token>
    put(token:Token, options?:any) : Promise<Token>
    putAll(tokens:Token[], options?:any) : Promise<void>
}

// let changesets:Changeset[] = [
//     {
//         id: '0',
//         changeset: async (db) => {

           
//         }
//     }
// ]


export {
    TokenRepository//, changesets
}
