interface PublishStatus {
    
    contractMetadata:Status
    
    nftMetadata: Status
    images: Status
    animations: Status

    backups: {
        channels: Status 
        authors: Status 
        items: Status 
        images: Status
        animations: Status
        themes:Status
        staticPages:Status
    }


}

interface Status {
    saved: number
    total: number
}

export {
    PublishStatus
}