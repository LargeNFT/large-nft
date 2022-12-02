import { validate, ValidationError } from "class-validator";
import { inject, injectable } from "inversify";
import { ComponentState } from "../../dto/component-state.js";
import { ComponentStateRepository } from "../../repository/component-state-repository.js";
import { ValidationException } from "../../util/validation-exception.js";

@injectable()
class ComponentStateService {

    @inject("ComponentStateRepository")
    private componentStateRepository:ComponentStateRepository

    constructor(
    ) {}

    async get(_id:string) {
        return this.componentStateRepository.get(_id)
    }


    async put(componentState:ComponentState) {

        if (!componentState.dateCreated) {
            componentState.dateCreated = new Date().toJSON()
        }

        componentState.lastUpdated = new Date().toJSON()

        //Validate
        let errors: ValidationError[] = await validate(componentState, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        return this.componentStateRepository.put(componentState)


    }



}


export {
    ComponentStateService
}