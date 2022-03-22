import { validate, ValidationError } from "class-validator";
import { injectable } from "inversify";
import { PinningApi } from "../../dto/pinning-api";
import { PinningApiRepository } from "../../repository/pinning-api-repository";
import { ValidationException } from "../../util/validation-exception";
import { v4 as uuidv4 } from 'uuid';

const pinataSDK = require('@pinata/sdk');


@injectable()
class PinningService {

    constructor(
        private pinningApiRepository:PinningApiRepository
    ) {}

    async get(_id: string): Promise<PinningApi> {
        return this.pinningApiRepository.get(_id)
    }

    async put(pinningApi: PinningApi) {

        if (!pinningApi._id) {
            pinningApi._id = uuidv4()
            pinningApi.dateCreated = new Date().toJSON()
        } else {
            pinningApi.lastUpdated = new Date().toJSON()
        }

        //Validate
        let errors: ValidationError[] = await validate(pinningApi, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        await this.pinningApiRepository.put(pinningApi)    
    }

    async pinByHash(pinningApi:PinningApi, cid:string) {
        const pinata = pinataSDK(pinningApi.apiKey, pinningApi.secretApiKey);
        return pinata.pinByHash(cid)
    }


}

export {
    PinningService
}