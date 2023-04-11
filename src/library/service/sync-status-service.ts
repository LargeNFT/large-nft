import { inject, injectable } from "inversify"
import fs from "fs"
import path from "path";


import { SyncStatusRepository } from "../repository/sync-status-repository.js"
import { FileStatus, SyncStatus } from "../dto/sync-status.js"


@injectable()
class SyncStatusService {

    @inject("SyncStatusRepository")
    private syncStatusRepository: SyncStatusRepository

    constructor() { }

    async get(_id: string, options?: any): Promise<SyncStatus> {
        return this.syncStatusRepository.get(_id, options)
    }

    async put(syncChangelog: SyncStatus, options?: any) {
        return this.syncStatusRepository.put(syncChangelog, options)
    }

    async remove(syncChangelog: SyncStatus, options?: any): Promise<void> {
        return this.syncStatusRepository.remove(syncChangelog, options)
    }



    async getFilepaths(dir: string, filepaths?: string[]): Promise<string[]> {

        if (!filepaths) filepaths = []

        let files = fs.readdirSync(dir)

        for (let file of files) {

            if (fs.statSync(dir + "/" + file).isDirectory()) {
                filepaths = await this.getFilepaths(dir + "/" + file, filepaths)
            } else {
                let filePath = path.join(__dirname, dir, "/", file)
                filepaths.push(filePath)
            }

        }

        return filepaths


    }

    async getFileStatus(dir: string): Promise<FileStatus> {

        let filepaths: string[] = await this.getFilepaths(dir)

        let fileStatus: FileStatus = {}

        for (let filepath of filepaths) {

            let stats = fs.statSync(filepath)

            fileStatus[filepath] = {
                path: filepath,
                lastModified: stats.mtime
            }

        }

        return fileStatus

    }

    async getOrCreate(channelKey: string, options?: any) : Promise<SyncStatus> {

        //Make sure we snag the lastSynced date for each of the files.
        let syncStatus: SyncStatus = await this.syncStatusRepository.get(channelKey, options)

        if (!syncStatus) {

            syncStatus = Object.assign(new SyncStatus, {
                _id: channelKey,
                fileStatus: {}
            })

        }

        return syncStatus

    }

    async updateSyncStatus(syncStatus:SyncStatus, publicPath:string, options?: any): Promise<void> {

      syncStatus.fileStatus = await this.getFileStatus(publicPath)

      await this.put(syncStatus, options)

    }

    async getChangedFiles(dir, savedFileStatus: FileStatus, options?: any) {

        let currentFileStatus: FileStatus = await this.getFileStatus(dir)

        let changedFiles: string[] = []

        for (let filepath of Object.keys(currentFileStatus)) {

            let lastModifiedSaved = savedFileStatus[filepath]?.lastModified
            let lastModifiedCurrent = currentFileStatus[filepath].lastModified

            if (!lastModifiedSaved || lastModifiedCurrent > lastModifiedSaved) {
                changedFiles.push(filepath)
            }

        }

        return changedFiles

    }



}



export {
    SyncStatusService
}

