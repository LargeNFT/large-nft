import { Allow, IsNotEmpty } from 'class-validator'

class StaticPage {

  @Allow()
  _id?: string

  @Allow()
  _rev?:string

  @Allow()
  forkedFromId?:string

  @IsNotEmpty()
  channelId?:string

  @IsNotEmpty()
  name?: string

  @IsNotEmpty()
  slug?:string

  @Allow()
  content?:any

  @Allow()
  contentHTML?:string

  @Allow()
  contentMarkdown?:string

  @Allow()
  locations?:string[] 

  @Allow()
  dateCreated?:string
  
  @Allow()
  lastUpdated?:string

}



export {
  StaticPage
}