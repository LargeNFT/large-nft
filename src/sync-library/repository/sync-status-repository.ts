import { SyncStatus } from "../dto/sync-status.js"


interface SyncStatusRepository {
    get(_id:string, options?:any): Promise<SyncStatus>
    put(syncStatus:SyncStatus, options?:any) : Promise<SyncStatus>
    remove(syncStatus:SyncStatus, options?:any) : Promise<void> 
}



export {
    SyncStatusRepository
}
