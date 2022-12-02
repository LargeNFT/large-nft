import { IsNotEmpty, Allow } from 'class-validator'


class PinningApi {

    @Allow()
    _id?: string

    @Allow()
    _rev?:string

    @IsNotEmpty()
    name?:string

    @IsNotEmpty()
    url?:string

    @Allow()
    apiKey?:string

    @Allow()
    secretApiKey?:string

    @Allow()
    jwt?:string
    @Allow()
    dateCreated?:string

    @Allow()
    lastUpdated?:string


}

export {
    PinningApi
}