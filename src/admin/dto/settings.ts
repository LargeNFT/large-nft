import { IsNotEmpty, Allow } from 'class-validator'


class Settings {

    @Allow()
    _id?: string

    @Allow()
    _rev?:string

    @Allow()
    ipfsHost?:string

    @Allow()
    defaultGitProvider?:string

    @Allow()
    gitProviders?:{} 

    @Allow()
    gitCorsProxy?:string

    @Allow()
    username?:string 

    @Allow()
    personalAccessToken?:string

    @Allow()
    alchemyKey?:string

    @Allow()
    dateCreated?:string

    @Allow()
    lastUpdated?:string


}

export {
    Settings
}