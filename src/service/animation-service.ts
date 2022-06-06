import { injectable } from "inversify"
import { Animation } from "../dto/animation"

import { ValidationException } from "../util/validation-exception"
import { validate, ValidationError } from 'class-validator'
import Hash from 'ipfs-only-hash'
import { AnimationRepository } from "../repository/animation-repository"
import { Item } from "../dto/item"

import he from 'he'
import { ImageService } from "./image-service"

@injectable()
class AnimationService {

  db: any

  constructor(
    private animationRepository: AnimationRepository,
    private imageService: ImageService

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

    return `<!DOCTYPE html>
        <html>
        
          <head>
              <meta charset="utf-8">
              <title>${item.title}></title>

              <style>

                .card {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                  box-sizing: border-box;
                  width:100%;
                  max-width: 100%;
                  padding: 5px;
                  font-size: 20px;
                }

                img { 
                  max-width: 100%;
                  border: 1px solid #cccccc;
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

              </style>

          </head>

          <body>

            <div class="card">
              <div class="card-content">
                <h4><b>${item.title ? item.title : ''} <span class="token-id">#${item.tokenId}</span></b></h4>
                ${item.contentHTML}
              </div>
            </div>

          </body>
        </html>`
  }

}

export {
  AnimationService
}