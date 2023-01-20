import {  inject, injectable } from "inversify"
import { ContractState } from "../../dto/contract-state.js"
import { ContractStateRepository } from "../contract-state-repository.js"

@injectable()
class ContractStateRepositoryNodeImpl implements ContractStateRepository {

    async get(_id:string): Promise<ContractState> {        
        return ContractState.findByPk(_id)

    }

    async put(contractState:ContractState, options?:any) : Promise<ContractState> {

        await contractState.save(options)
        return contractState

    }



}

export {
    ContractStateRepositoryNodeImpl
}