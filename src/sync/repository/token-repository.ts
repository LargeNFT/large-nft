import { Token } from "../dto/token.js"


interface TokenRepository {
    get(_id:number, options?:any): Promise<Token>
    put(token:Token, options?:any) : Promise<Token>
    putAll(tokens:Token[], options?:any) : Promise<void>
    getTokenIdsByAttribute(traitType: string, value: string, options?: any): Promise<number[]>}

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
