import { IsNotEmpty, Allow } from 'class-validator'


class Gitlab {

    @Allow()
    _id?: string

    @Allow()
    _rev?:string

    @Allow()
    personalAccessToken?:string

    @Allow()
    dateCreated?:string

    @Allow()
    lastUpdated?:string


}

export {
    Gitlab
}