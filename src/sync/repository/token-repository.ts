import { Token } from "../dto/token.js"


interface TokenRepository {
    get(_id:string): Promise<Token>
    put(token:Token) : Promise<void>
    putAll(tokens:Token[]) : Promise<void>
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
