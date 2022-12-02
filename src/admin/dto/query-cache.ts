import { A } from '@svgdotjs/svg.js'
import { IsNotEmpty, Allow } from 'class-validator'


class QueryCache {
    
    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    result:any

    @Allow()
    stale?:boolean

    @Allow()
    lastUpdated?:string

    @Allow()
    dateCreated?:string
    
    
}

export {
    QueryCache
}