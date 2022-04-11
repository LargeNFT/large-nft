import { validate, ValidationError } from "class-validator";
import { injectable } from "inversify";
import { PinningApi } from "../../dto/pinning-api";
import { PinningApiRepository } from "../../repository/pinning-api-repository";
import { ValidationException } from "../../util/validation-exception";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { IpfsService } from "./ipfs-service";

@injectable()
class PinningService {

    constructor(
        private pinningApiRepository:PinningApiRepository,
        private ipfsService:IpfsService
    ) {}

    async get(_id: string): Promise<PinningApi> {
        return this.pinningApiRepository.get(_id)
    }

    async getPinata() : Promise<PinningApi> {

        let result = await this.pinningApiRepository.list(1, 0)

        if (result?.length > 0) {
            return Object.assign(new PinningApi(), result[0]) 
        }
        
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

        let nodeId = await this.ipfsService.ipfs.id()
        
        let body = {
            hashToPin: cid,
            pinataMetadata: {
                name: name
            }
        }

        if (nodeId.addresses?.length > 0) {
            body["pinataOptions"] = {
                hostNodes: nodeId.addresses?.map( a => a.toString())
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

    async userPinnedDataTotal(pinningApi:PinningApi) {
     
        let url = `${pinningApi.url}/data/userPinnedDataTotal`

        let response = await axios.get(url, {
            headers: {
                pinata_api_key: pinningApi.apiKey,
                pinata_secret_api_key: pinningApi.secretApiKey
            }
        })

        return response.data

    }

    async getJobStatus(pinningApi:PinningApi, cid:string, jobId:string) {
     
        let url = `${pinningApi.url}/pinning/pinJobs?ipfs_pin_hash=${cid}`

        let response = await axios.get(url, {
            headers: {
                pinata_api_key: pinningApi.apiKey,
                pinata_secret_api_key: pinningApi.secretApiKey
            }
        })

        let pinJob = response.data.rows.filter( row => row.id == jobId)

        if (pinJob?.length > 0) {
            return pinJob[0]
        } else {
            return {
                status: "complete"
            }
        }



    }


    async validateAccount(pinningApi:PinningApi) {
        await this.userPinnedDataTotal(pinningApi)
    }


}

export {
    PinningService
}