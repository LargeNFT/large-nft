import { inject, injectable } from "inversify";

import { validate, ValidationError } from "class-validator";
import { ValidationException } from "../util/validation-exception.js";
import { ContractStateRepository } from "../../sync/repository/contract-state-repository.js";
import { ContractState } from "../../sync/dto/contract-state.js";

@injectable()
class ContractStateService {

    @inject("ContractStateRepository")
    private contractStateRepository:ContractStateRepository

    constructor() {}


    async get(_id:string): Promise<ContractState> {        
        return this.contractStateRepository.get(_id)
    }

    async put(contractState:ContractState) {

        contractState.lastUpdated = new Date().toJSON()

        //Validate
        let errors: ValidationError[] = await validate(contractState, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        return this.contractStateRepository.put(contractState)
    }

}

export {
    ContractStateService
}