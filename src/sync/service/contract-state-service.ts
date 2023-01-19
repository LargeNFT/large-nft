import { inject, injectable } from "inversify";

import { validate, ValidationError } from "class-validator";
import { ContractStateRepository } from "../../sync/repository/contract-state-repository.js";
import { ContractState } from "../../sync/dto/contract-state.js";
import { ValidationException } from "../../reader/util/validation-exception.js";

@injectable()
class ContractStateService {

    @inject("ContractStateRepository")
    private contractStateRepository:ContractStateRepository

    constructor() {}


    async get(_id:string): Promise<ContractState> {        
        return this.contractStateRepository.get(_id)
    }

    async put(contractState:ContractState, options?:any) {
        return this.contractStateRepository.put(contractState, options)
    }

}

export {
    ContractStateService
}