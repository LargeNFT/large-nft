import { inject, injectable } from "inversify";
import { AnimationRepository } from "../repository/animation-repository.js";
import { Animation } from "../dto/animation.js";
import { ItemService } from "./item-service.js";


@injectable()
class AnimationService {

  @inject("AnimationRepository")
  private animationRepository:AnimationRepository

  @inject("ItemService")
  private itemService:ItemService

  constructor() { }

  async get(_id: string): Promise<Animation> {
    return this.animationRepository.get(_id)
  }

}


export { AnimationService }

