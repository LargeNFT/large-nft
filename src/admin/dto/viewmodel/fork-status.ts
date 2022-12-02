interface ForkStatus {
    channels: Status 
    authors: Status 
    items: Status 
    images: Status
    animations: Status
    themes:Status
    staticPages:Status
}

interface Status {
    saved: number
    total: number
}

export {
    ForkStatus
}