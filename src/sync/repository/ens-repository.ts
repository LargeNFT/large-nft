import { ENS } from "../dto/ens.js"



interface ENSRepository {
    get(_id:string, options?:any): Promise<ENS>
    put(ens:ENS, options?:any) : Promise<ENS>
}


export {
    ENSRepository
}
