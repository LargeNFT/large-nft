import { Allow, IsNotEmpty } from 'class-validator'

class Theme {

  @Allow()
  _id?: string

  @Allow()
  _rev?:string

  @IsNotEmpty()
  name?: string

  @Allow()
  coverImageCSS?: string

  @Allow()
  animationCSS?:string 

  @Allow()
  dateCreated?:string
  
  @Allow()
  lastUpdated?:string

}

export {
  Theme
}