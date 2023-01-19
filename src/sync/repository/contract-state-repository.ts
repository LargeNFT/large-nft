import { ContractState } from "../dto/contract-state.js"


interface ContractStateRepository {
    get(_id:string): Promise<ContractState>
    put(contractState:ContractState, options?:any) : Promise<ContractState>
}

export {
    ContractStateRepository
}
