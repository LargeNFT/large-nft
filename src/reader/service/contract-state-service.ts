import { inject, injectable } from "inversify";
import { ContractState } from "../dto/contract-state.js";
import { ContractStateRepository } from "../repository/contract-state-repository.js";
import { validate, ValidationError } from "class-validator";
import { ValidationException } from "../util/validation-exception.js";

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