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

@injectable()
class AnimationService {

  db: any

  constructor(
    private animationRepository: AnimationRepository,
    private quillService: QuillService

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

    let content = await this.quillService.translateContent(item.content)

    return `<!DOCTYPE html>
        <html>
        
          <head>
              <meta charset="utf-8">
              <title>${item.title}></title>

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

                  @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    25% {
                        background-position: 50%% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    75% {
                        background-position: 50% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .card {
                  
                  box-sizing: border-box;
                  padding: 20px;
                  width:100%;
                  min-height: 100%;

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

              </style>

          </head>

          <body>

            <div class="card">
              <div class="card-content">
                <h4><b>${item.title ? item.title : ''} <span class="token-id">#${item.tokenId}</span></b></h4>
                ${content}
              </div>
            </div>

          </body>
        </html>`
  }

}

export {
  AnimationService
}