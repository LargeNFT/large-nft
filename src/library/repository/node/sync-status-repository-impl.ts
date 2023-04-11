import {  injectable } from "inversify"

import { SyncStatusRepository } from "../sync-status-repository.js"
import { SyncStatus } from "../../dto/sync-status.js"


@injectable()
class SyncStatusRepositoryNodeImpl implements SyncStatusRepository {

    async get(_id:string, options?:any): Promise<SyncStatus> {
        return SyncStatus.findByPk(_id, options)
    }

    async put(syncStatus: SyncStatus, options?:any): Promise<SyncStatus> {

        await syncStatus.save(options)
        return syncStatus

    }

    async remove(syncStatus: SyncStatus, options?:any) : Promise<void> {
        await syncStatus.destroy(options)
    }

}



export {
    SyncStatusRepositoryNodeImpl
}