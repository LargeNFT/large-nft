import { Profile } from "./profile";

interface Post {
  _id?: string
  
  owner?: string
  ownerDisplayName?: string 
  ownerProfilePic?: string 

  dateCreated?: string
  content: any
  contentTranslated?: string
}

export { Post }
