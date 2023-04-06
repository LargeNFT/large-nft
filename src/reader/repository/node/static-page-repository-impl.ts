import {  inject, injectable } from "inversify"
import fs from "fs"
import { StaticPageRepository } from "../static-page-repository.js"
import { StaticPage } from "../../dto/static-page.js"

@injectable()
class StaticPageRepositoryNodeImpl implements StaticPageRepository {

    staticPages:StaticPage[] = []

    constructor(
        @inject('channelDir') private channelDir
    ) {}

    async load() {
        this.staticPages = JSON.parse(fs.readFileSync(`${this.channelDir}/backup/export/backup/static-pages.json`, 'utf8'))
    }


    async get(_id: string): Promise<StaticPage> {        
        
        let matches = this.staticPages.filter( staticPage => staticPage._id == _id)

        if (matches?.length > 0) {
            return matches[0]
        }

        return matches[0]

    }

    async listByLocation(location:string, skip:number): Promise<StaticPage[]> {
        return this.staticPages.filter( (s) => s.locations.includes(location) ).slice(skip, skip + 1000)
    }

}

export {
    StaticPageRepositoryNodeImpl
}