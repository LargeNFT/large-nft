import { Settings } from "../../dto/settings.js";
import { injectable } from "inversify";
import { SettingsRepository } from "../../repository/settings-repository.js";
import { validate, ValidationError } from "class-validator";
import { ValidationException } from "../../util/validation-exception.js";

@injectable()
class SettingsService {

    constructor(
        private settingsRepository:SettingsRepository
    ) {}

    async get(): Promise<Settings> {
        return this.settingsRepository.get()
    }

    async put(settings: Settings) {

        if (!settings._id) {
            settings._id = "single"
            settings.dateCreated = new Date().toJSON()
        } else {
            settings.lastUpdated = new Date().toJSON()
        }

        //Validate
        let errors: ValidationError[] = await validate(settings, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        await this.settingsRepository.put(settings)    
    }


}

export {
    SettingsService
}