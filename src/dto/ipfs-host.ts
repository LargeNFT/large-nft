import { IsNotEmpty, Allow } from 'class-validator'


class IpfsHost {

    @Allow()
    _id?: string

    @Allow()
    _rev?:string

    @Allow()
    url?:string

    @Allow()
    dateCreated?:string

    @Allow()
    lastUpdated?:string


}

export {
    IpfsHost
}