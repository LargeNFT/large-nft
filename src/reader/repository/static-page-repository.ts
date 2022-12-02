import { StaticPage } from "../dto/static-page.js"

interface StaticPageRepository {
    get(_id:string): Promise<StaticPage>
    listByLocation(location:string, skip:number): Promise<StaticPage[]>
}

export {
    StaticPageRepository
}
