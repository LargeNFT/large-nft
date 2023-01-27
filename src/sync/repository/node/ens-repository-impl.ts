import {  inject, injectable } from "inversify"
import { ENS } from "../../dto/ens.js"
import { ENSRepository } from "../ens-repository.js"

@injectable()
class ENSRepositoryNodeImpl implements ENSRepository {

    async get(_id: string, options?:any): Promise<ENS> {
        let ens = await ENS.findByPk(_id, options)
        return ens    
    }

    async put(ens: ENS, options?:any): Promise<ENS> {

        await ens.save(options)
        return ens
    }
  
}


export {
    ENSRepositoryNodeImpl
}