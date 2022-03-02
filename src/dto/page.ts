import { Post } from "./post";

interface Page {

    _id?:string
    _rev?:string

    owner?: string

    dateCreatedMilli:number

    title?: string

    content?: any
    contentTranslated?: string

    homePage:string 

    replies?: string

}

export { Page }