interface ForkStatus {
    channels: Status 
    authors: Status 
    items: Status 
    images: Status
    animations: Status
}

interface Status {
    saved: number
    total: number
}

export {
    ForkStatus
}