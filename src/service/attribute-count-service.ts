import {  injectable } from "inversify";
import { validate, ValidationError } from "class-validator";
import { ValidationException } from "../util/validation-exception";

import { AttributeCountRepository } from "../repository/attribute-count-repository";
import { AttributeCount } from "../dto/attribute";

@injectable()
class AttributeCountService {

  db: any

  constructor(
    private attributeCountRepository: AttributeCountRepository,
  ) { }

  async get(_id: string): Promise<AttributeCount> {
    return this.attributeCountRepository.get(_id)
  }

  async put(attributeCount: AttributeCount) {

    if (!attributeCount._id) {
      attributeCount._id = `${attributeCount.channelId}-${attributeCount.traitType}-${attributeCount.value}`
      attributeCount.dateCreated = new Date().toJSON()
    } else {
      attributeCount.lastUpdated = new Date().toJSON()
    }

    //Validate
    let errors: ValidationError[] = await validate(attributeCount, {
      forbidUnknownValues: true,
      whitelist: true
    })

    if (errors.length > 0) {
      throw new ValidationException(errors)
    }

    await this.attributeCountRepository.put(attributeCount)
  }




}


export { AttributeCountService }

