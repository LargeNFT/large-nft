import { validate, ValidationError } from "class-validator";
import { injectable } from "inversify";
import { PinningApi } from "../../dto/pinning-api";
import { PinningApiRepository } from "../../repository/pinning-api-repository";
import { ValidationException } from "../../util/validation-exception";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

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

    async pinByHash(pinningApi:PinningApi, cid:string, name:string) {

        let url = `${pinningApi.url}/pinning/pinByHash`

        // let response = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         pinata_api_key: pinningApi.apiKey,
        //         pinata_secret_api_key: pinningApi.secretApiKey
        //     },
        //     body: JSON.stringify({
        //         hashToPin: cid,
        //         pinataMetadata: {
        //             name: name
        //         }
        //     })
        // })

        let body = {
            hashToPin: cid,
            pinataMetadata: {
                name: name
            }
        }


        let response = await axios.post(url, body, {
            headers: {
                pinata_api_key: pinningApi.apiKey,
                pinata_secret_api_key: pinningApi.secretApiKey
            }
        })

        return response.data

    }


}

export {
    PinningService
}