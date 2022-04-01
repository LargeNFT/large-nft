import { Allow, MinLength } from 'class-validator'

import { Image } from "./image"

class Author {

  @Allow()
  _id?: string

  @Allow()
  _rev?:string

  @Allow()
  walletAddress?: string

  @Allow()
  name?: string

  @Allow()
  description?: string

  @Allow()
  url?:string 

  @Allow()
  coverPhotoId?: string

}

export {
  Author
}