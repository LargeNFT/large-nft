import { validate, ValidationError } from "class-validator";
import { injectable } from "inversify";
import { ValidationException } from "../../util/validation-exception";
import axios from 'axios'
import { GitlabRepository } from "../../repository/gitlab-repository";
import { Gitlab } from "../../dto/gitlab";

@injectable()
class GitlabService {

    constructor(
        private gitlabRepository:GitlabRepository
    ) {}

    async get(): Promise<Gitlab> {
        return this.gitlabRepository.get()
    }

    async put(gitlab: Gitlab) {

        if (!gitlab._id) {
            gitlab._id = "single"
            gitlab.dateCreated = new Date().toJSON()
        } else {
            gitlab.lastUpdated = new Date().toJSON()
        }

        //Validate
        let errors: ValidationError[] = await validate(gitlab, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        await this.gitlabRepository.put(gitlab)    
    }

}

export {
    GitlabService
}