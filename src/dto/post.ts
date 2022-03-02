
interface Post {

  _id?:string
  _rev?:string

  parentId?:string

  owner?: string
  ownerDisplayName?: string 
  ownerProfilePic?: string 
  ownerProfilePicSrc?: string

  coverPhotoCid?:string
  coverPhotoSrc?:string
  
  dateCreatedMilli:number

  content: any
  contentTranslated?: string

  replies?: string

}

export { Post }
