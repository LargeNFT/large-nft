import {  inject, injectable } from "inversify"
import fs from "fs"
import { AnimationRepository } from "../animation-repository.js"
import { Animation } from "../../dto/animation.js"

@injectable()
class AnimationRepositoryNodeImpl implements AnimationRepository {
    
    constructor(
        @inject('baseDir') private baseDir
    ) {}

    animations:Animation[] = []




    async get(_id:string): Promise<Animation> {        
        
        if(this.animations?.length == 0) {
            this.animations = JSON.parse(fs.readFileSync(`${this.baseDir}/backup/export/backup/animations.json`, 'utf8'))
        }

        let matches = this.animations.filter( image => image._id == _id)

        let animation:Animation

        if (matches?.length > 0) {
            animation = matches[0]
        }

        if (animation) {
            //Load content
            animation.content = fs.readFileSync(`${this.baseDir}/backup/export/animations/${animation.cid}.html`, 'utf8')
        }


        return animation
    }


}

export {
    AnimationRepositoryNodeImpl
}