import { Profile } from "./profile";

interface Post {
  _id?: string
  
  owner?: string
  title?: string
  subtitle?: string
  coverPhoto?: string
  dateCreated?: string
  authorId?: Number
  author?: Profile
  content: any
  contentTranslated?: string
}

export { Post }
