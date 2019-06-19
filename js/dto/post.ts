import { Profile } from "./profile";

interface Post {
  
  id?: Number
  owner?: string
  ipfsCid?: string
  title?: string
  subtitle?: string
  coverPhoto?: string
  dateCreated?: string
  authorId?: Number
  author?: Profile
  content?: any
  contentTranslated?: string
}

export { Post }
