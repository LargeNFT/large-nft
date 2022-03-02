import { SchemaService } from "./schema-service"
import { Page } from "../../dto/page"
import { PostService } from "./post-service"
import { inject, injectable } from "inversify"
import moment from 'moment'


@injectable()
class PageService {

    public loadedWalletAddress: string
    public pageStore: any

    constructor(
        private schemaService: SchemaService,
        private postService: PostService,
    ) { }

    async loadStoreForWallet(walletAddress: string) {

        if (walletAddress == this.loadedWalletAddress) return

        this.pageStore = await this.schemaService.getPageStoreByWalletAddress(walletAddress)
        await this.pageStore.load()
    
        this.loadedWalletAddress = walletAddress

    }

    async getPages(): Promise<Page[]> {
        let response = await this.pageStore.db.allDocs( {
            include_docs: true
        })

        let promises = response.rows.map( async v => {
            return await this.translatePage(v.doc)
          })

    
        let pages:Page[] = []
    
        for (let promise of promises) {
          pages.push(await promise)
        }

        return pages

    }


    async resetHomePage() {

        //Unset it from all pages
        let pages = await this.getPages()

        for (let page of pages) {
            if (page.homePage) {
                delete page.homePage
                await this.put(page)
            }
        }

        console.log("Reset home page")
    }


    async put(page: Page): Promise<Page> {

        let key:string

        if (page._id) {
          key = page._id
        } else {
          key = new Date().toJSON()
        }
    
        await this.pageStore.put(key, page)
    

        return this.get(key)
    

    }


    async get(key: string): Promise<Page> {
        let page = await this.pageStore.get(key)
        return this.translatePage(page)
    }

    async delete(key: string): Promise<void> {
        await this.pageStore.del(key)
    }

    async translatePage(page:Page) : Promise<Page> {

        //@ts-ignore
        let translated: Page = {}

        Object.assign(translated, page)

        translated.contentTranslated = await this.postService.translateContent(page)

        //@ts-ignore //TODO: fix this somehow later. view model
        translated.dateCreatedDisplay = moment(page.dateCreatedMilli).fromNow()
        
        return translated
    }

    async close() {
        await this.pageStore.close()
    }



}

export {
    PageService
}