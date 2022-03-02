interface Schema {

    mainFeed?: string

    readOnlyPostFeed?: string 
    
    blogPostFeed?:string 
    blogPostKvStore?: string
    // blogPostCounter?:string

    pageStore?:string 

    friendStore?: string
    profileStore?: string 

    siteSettingsStore?:string 
}


export {
    Schema
}