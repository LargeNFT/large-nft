import {  inject, injectable } from "inversify"
import { ENS } from "../../dto/ens.js"
import { ENSRepository } from "../ens-repository.js"

@injectable()
class ENSRepositoryNodeImpl implements ENSRepository {

    async get(_id: string): Promise<ENS> {
        let ens = await ENS.findByPk(_id)
        return ens    
    }

    async put(ens: ENS, options?:any): Promise<ENS> {
        return ens.save(options)
    }
  
}


export {
    ENSRepositoryNodeImpl
}