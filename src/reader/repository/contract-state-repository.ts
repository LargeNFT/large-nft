import { ContractState } from "../dto/contract-state.js"


interface ContractStateRepository {
    get(_id:string): Promise<ContractState>
    put(contractState:ContractState) : Promise<void>
}

export {
    ContractStateRepository
}
