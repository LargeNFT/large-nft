import { MinLength, ArrayNotEmpty, ArrayMinSize ,IsNotEmpty, Allow } from 'class-validator'


class ReaderSettings {

    @Allow()
    _id?:string
    
    @Allow()
    _rev?:string

    @Allow()
    currentPage?:number
    
    @Allow()
    lastPageJump?:number
    
    @Allow()
    dateCreated?:string
    
    @Allow()
    lastUpdated?:string
  
  }
  
  export {
    ReaderSettings
  }