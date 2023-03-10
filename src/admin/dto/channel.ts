import { MinLength, ArrayNotEmpty, ArrayMinSize, ValidateNested, IsNotEmpty, Allow } from 'class-validator'

import { AttributeOptions } from "./attribute.js";

class Channel {

    @Allow()
    _id?:string

    @Allow()
    _rev?:string 

    @Allow()
    forkedFromCid?:string

    @Allow()
    forkedFromId?:string

    @Allow()
    forkedFromFeeRecipient?:string

    @Allow()
    forkType?:string

    @Allow()
    disableForks?:boolean

    @Allow()
    authorId?:string

    @MinLength(3, { message: "Title must be more than 3 characters." })
    title?:string

    @IsNotEmpty()
    symbol?:string

    @Allow()
    link?:string

    @Allow()
    description?:any

    @Allow()
    descriptionHTML?:string

    @Allow()
    descriptionMarkdown?:string

    @Allow()
    license?:any

    @Allow()
    licenseHTML?:string

    @Allow()
    licenseMarkdown?:string

    @Allow()
    category?:string[]

    @Allow()
    language?:string

    @Allow()
    coverImageId?:string

    @Allow()
    coverBannerId?:string

    @Allow()
    mintPrice?:string

    @Allow()
    attributeOptions?:AttributeOptions[]

    @Allow()
    sellerFeeBasisPoints?:number

    @Allow()
    royaltyPercent?:string

    @Allow()
    contractAddress?:string

    @Allow()
    pinJobId?:string

    @Allow()
    pinJobStatus?:string

    @Allow()
    localCid?:string

    @Allow()
    localPubDate?:string

    @Allow()
    publishedCid?:string

    @Allow()
    gitProvider?:string

    @Allow()
    httpUrlToRepo?:string

    @Allow()
    publishReaderRepoId?:string

    @Allow()
    publishReaderRepoPath?:string

    @Allow()
    publishReaderRepoStatus?:string

    @Allow()
    pubDate?:string

    @Allow()
    importSuccess?:boolean

    @Allow()
    dateCreated?:string

    @Allow()
    lastUpdated?:string

}

export {
    Channel
}
