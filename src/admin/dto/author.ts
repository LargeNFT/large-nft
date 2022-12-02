import { Allow, IsNotEmpty } from 'class-validator'

class Author {

  @Allow()
  _id?: string

  @Allow()
  _rev?:string

  @IsNotEmpty()
  walletAddress?: string

  @Allow()
  name?: string

  @Allow()
  description?: string

  @Allow()
  url?:string 

  @Allow()
  coverPhotoId?: string

  @Allow()
  dateCreated?:string
  
  @Allow()
  lastUpdated?:string

}

export {
  Author
}