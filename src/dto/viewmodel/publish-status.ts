interface PublishStatus {
    
    contractMetadata:boolean
    
    nftMetadata: Status
    images: Status
    animations: Status

    backups: {
        channels: boolean 
        authors: boolean 
        itemChunks: Status 
        items: Status 
        images: Status
    }


}

interface Status {
    saved: number
    total: number
}

export {
    PublishStatus
}