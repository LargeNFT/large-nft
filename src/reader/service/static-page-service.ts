import { inject, injectable } from "inversify";
import { StaticPageRepository } from "../repository/static-page-repository.js";
import { StaticPage } from "../dto/static-page.js";


@injectable()
class StaticPageService {

  @inject("StaticPageRepository")
  private staticPageRepository:StaticPageRepository


  constructor() { }

  async get(_id: string): Promise<StaticPage> {
    return this.staticPageRepository.get(_id)
  }

  async listByLocation(location:string, skip:number): Promise<StaticPage[]> {
    return this.staticPageRepository.listByLocation(location, skip)
  }

  async listRoutablePages(additionalStaticPages?:StaticPage[]): Promise<StaticPage[]> {

    let results = []

    results = results.concat(additionalStaticPages)
    results = results.concat(await this.staticPageRepository.listByLocation("navbar", 0))
    results = results.concat(await this.staticPageRepository.listByLocation("links", 0))

    //Clone these so we don't change the underlying objects
    results = JSON.parse(JSON.stringify(results))

    //Strip the content.
    if (results?.length > 0) {
      for (let staticPage of results) {
        delete staticPage?.content
        delete staticPage?.contentHTML
        delete staticPage?.contentMarkdown
      }
    }

    
    return results 
  }
}


export { StaticPageService }

