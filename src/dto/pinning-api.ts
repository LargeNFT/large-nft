import { IsNotEmpty, Allow } from 'class-validator'


class PinningApi {

    @Allow()
    _id?: string

    @Allow()
    _rev?:string

    @IsNotEmpty()
    apiKey?:string

    @IsNotEmpty()
    secretApiKey?:string
    
    @IsNotEmpty()
    url?:string

    @Allow()
    dateCreated?:string

    @Allow()
    lastUpdated?:string


}

export {
    PinningApi
}