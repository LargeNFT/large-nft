import { StaticPage } from "../dto/static-page.js";
import { inject, injectable } from "inversify";
import { validate, ValidationError } from "class-validator";
import { ValidationException } from "../util/validation-exception.js";
import { v4 as uuidv4 } from 'uuid';
import { StaticPageRepository } from "../repository/static-page-repository.js";
import { QuillService } from "./quill-service.js";

@injectable()
class StaticPageService {

  db: any

  constructor(
    private staticPageRepository: StaticPageRepository,
    private quillService:QuillService
  ) { }

  async get(_id: string): Promise<StaticPage> {
    return this.staticPageRepository.get(_id)
  }

  async getIds() : Promise<string[]> {
    return this.staticPageRepository.getIds()
  }

  async getLatestRevision(_id:string) : Promise<StaticPage> {
    return this.staticPageRepository.getLatestRevision(_id)
  }


  async put(staticPage: StaticPage) {

    if (!staticPage._id) {
      staticPage._id = uuidv4()
      staticPage.dateCreated = new Date().toJSON()
    } else {
      staticPage.lastUpdated = new Date().toJSON()
    }

    if (staticPage.content) {

      //Translate description content
      staticPage.contentHTML = await this.quillService.translateContent(staticPage.content)

      //Generate markdown
      staticPage.contentMarkdown = await this.quillService.generateMarkdown(staticPage.content)

    }

    //Generate slug
    if (staticPage.name) {
      staticPage.slug = this.slugify(staticPage.name)
    }


    //Validate
    let errors: ValidationError[] = await validate(staticPage, {
      forbidUnknownValues: true,
      whitelist: true
    })

    if (errors.length > 0) {
      throw new ValidationException(errors)
    }

    await this.staticPageRepository.put(staticPage)
  }

  async delete(staticPage: StaticPage) {
    return this.staticPageRepository.delete(staticPage)
  }


  async listByChannel(channelId: string, limit: number, skip: number): Promise<StaticPage[]> {
    return this.staticPageRepository.listByChannel(channelId, limit, skip)
  }

  slugify( text ) {
    return text
    .toString()
    .normalize( 'NFD' )                   // split an accented letter in the base letter and the acent
    .replace( /[\u0300-\u036f]/g, '' )   // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
  }

}


export { StaticPageService }

