import { Animation } from "../dto/animation.js"


interface AnimationRepository {
    get(_id:string): Promise<Animation>

}

export {
    AnimationRepository
}
