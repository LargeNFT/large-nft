import { Post } from "./post";

interface BlogPost extends Post {
    
    feedCid?: string
    permalinkKey?: string

    title?:string 
    subtitle?:string


    _id?:string
    _rev?:string
}

export {BlogPost}