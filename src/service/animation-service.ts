import { injectable } from "inversify"
import { Animation } from "../dto/animation"

import { ValidationException } from "../util/validation-exception"
import { validate, ValidationError } from 'class-validator'
import Hash from 'ipfs-only-hash'
import { AnimationRepository } from "../repository/animation-repository"
import { Item } from "../dto/item"

import he from 'he'
import { ImageService } from "./image-service"
import { QuillService } from "./quill-service"
import { ThemeService } from "./theme-service"
import { Theme } from "../dto/theme"

const { forEach: each } = Array.prototype;


import juice from "juice/client"


@injectable()
class AnimationService {

  db: any

  constructor(
    private animationRepository: AnimationRepository,
    private quillService: QuillService,
    private imageService:ImageService,
    private themeService:ThemeService

  ) { }

  async get(_id: string): Promise<Animation> {
    return this.animationRepository.get(_id)
  }

  async put(animation: Animation) {

    if (!animation._id) {
      animation._id = animation.cid
      animation.dateCreated = new Date().toJSON()
    } 

    //Validate
    let errors: ValidationError[] = await validate(animation, {
      forbidUnknownValues: true,
      whitelist: true
    })

    if (errors.length > 0) {
      throw new ValidationException(errors)
    }

    await this.animationRepository.put(animation)
  }



  public async newFromText(content) {
  
    const animation: Animation = new Animation()
    animation.content = content

    animation.cid = await Hash.of(animation.content)
    
    return animation

  }

  public async buildAnimationPage(item:Item) :Promise<string> {

    let result

    let content = await this.quillService.translateContent(item.content)

    let themes:Theme[] = []

    if (item.themes) {

      for (let theme of item.themes) {
        themes.push(await this.themeService.get(theme))
      } //might not exist because it got deleted.

    }

    let allThemeCss = ""

    if (themes?.length > 0) {
      for (let theme of themes) {
        if (theme.animationCSS?.length > 0) allThemeCss += theme.animationCSS
      }
    }

    // console.log(`Theme CSS: ${allThemeCss}`)
    // console.log(`Individual CSS: ${item.animationCSS}`)


  
    if (item.coverImageAsAnimation) {

      let image = await this.imageService.get(item.coverImageId)

      let imageSrc = await this.imageService.getUrl(image)

      result = this.getFullImageTemplate(imageSrc, item.animationCSS, allThemeCss)

    } else {

      result = this.getAnimationTemplate(item, content, item.animationCSS, allThemeCss)
    }

    return juice(result)

  }


  getFullImageTemplate(imageSrc:string, individualCss?:string, themeCss?:string) {
    return `<!DOCTYPE html>
    <html>
      <head>
        <style>
        
          body { 
            height: 100%; 
            width: 100%;
            margin: 0;
            padding: 0;

            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden
          }

          img {
            flex-shrink: 0;
            min-width: 100%;
            width: 100%;
            height: 100%;
            min-height: 100%
            object-fit: cover;
          }

          ${themeCss ? themeCss : ''}
          ${individualCss ? individualCss : ''}

        </style>
      </head>

      <body>
        <img src="${imageSrc}" />
      </body>
    </html>`
  }


  getAnimationTemplate(item:Item, content:string, individualCss?:string, themeCss?:string) {
    return `<!DOCTYPE html>
        <html>
        
          <head>
              <meta charset="utf-8">
              <title>${item.title}</title>

              <style>

                html {
                    height:100%;
                } 

                body {
                      padding: 0;
                      margin: 0;
                      box-sizing: border-box;
                      height: 100%;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                }

                .animation-container {
                  box-sizing: border-box;
                  padding: 20px;
                  width:100%;
                  min-height: 100%;
                  
                  background: rgb(241,241,241);
                  background: linear-gradient(-45deg, rgba(241,241,241,1) 13%, rgba(239,243,248,1) 37%, rgba(176,209,220,0.927608543417367) 69%, rgba(255,255,255,1) 100%);

                  font-size: 20px;
                  border: 5px solid #4e82b1;
                  float: left;
                }

                img { 
                  max-width: 100%;
                  border: 1px solid #cccccc;
                  object-fit: cover;
                }

                .token-id {
                  color: rgb(79, 79, 79);
                  font-weight: bold;
                }

                h4 { 
                  margin-top: 0px; 
                  font-size: 25px;
                  margin-bottom: 0px;
                }

                ${themeCss ? themeCss : ''}
                ${individualCss ? individualCss : ''}


              </style>

          </head>

          <body>

            <div class="animation-container">
              <h4><b>${item.title ? item.title : ''} <span class="token-id">#${item.tokenId}</span></b></h4>
              ${content}
            </div>

          </body>
        </html>`
  }




}

export {
  AnimationService
}