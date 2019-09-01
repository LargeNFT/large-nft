import { Profile } from "./profile";

interface Post {
  cid?: string
  feedCid?: string
  parentCid?:string

  owner?: string
  ownerDisplayName?: string 
  ownerProfilePic?: string 

  dateCreated?: string
  content: any
  contentTranslated?: string

  replies?: any //Store TODO://Figure out how make it a real type reference

}

export { Post }
