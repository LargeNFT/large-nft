import { Token } from "../dto/token.js"


interface TokenRepository {
    get(_id:string): Promise<Token>

}


export {
    TokenRepository
}
