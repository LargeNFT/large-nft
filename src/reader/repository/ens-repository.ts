import { ENS } from "../dto/ens.js"



interface ENSRepository {
    get(_id:string): Promise<ENS>
    put(ens:ENS) : Promise<void>
}


export {
    ENSRepository
}
