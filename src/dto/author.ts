import { MinLength } from 'class-validator'

import { Image } from "./image"

class Author {

  _id?: string
  _rev?:string

  walletAddress?: string

  @MinLength(3, { message: "Name must be more than 3 characters." })
  name?: string

  description?: string

  url?:string 

  coverPhotoId?: string

}

export {
  Author
}