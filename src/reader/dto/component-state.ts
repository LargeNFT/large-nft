import { Allow } from "class-validator"

class ComponentState {

    @Allow()
    _id?:string

    @Allow()
    _rev?:string 
    
    @Allow()
    data:any

    @Allow()
    dateCreated?:string

    @Allow()
    lastUpdated?:string
}

export {
    ComponentState
}
