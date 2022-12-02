interface JSONFeed {

    version:string
    title:string
    home_page_url?:string
    feed_url?:string
    description?:string
    icon?:string //url
    author?: {
        name?:string
        url?:string 
        avatar?:string 
    }
    expired:boolean

    items:[{
        id:string
        url?:string
        title?:string
        content_html:string
        image?:string 
        banner_image?:string
        date_published?:string
        tags?:string[]
        attachments?:[{
            url:string
            mime_type:string 
            title?:string 
            size_in_bytes?:number
            duration_in_seconds?:number
        }]
    }]

}

export {
    JSONFeed
}