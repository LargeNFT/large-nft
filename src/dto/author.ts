import { Allow, MinLength } from 'class-validator'

import { Image } from "./image"

class Author {

  _id?: string
  _rev?:string

  walletAddress?: string

  @Allow()
  name?: string

  description?: string

  url?:string 

  coverPhotoId?: string

}

export {
  Author
}