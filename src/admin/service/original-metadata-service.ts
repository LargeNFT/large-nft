import { injectable } from "inversify"
import Hash from 'ipfs-only-hash'


import { ValidationException } from "../util/validation-exception.js"
import { validate, ValidationError } from 'class-validator'

import { OriginalMetadataRepository } from "../repository/original-metadata-repository.js"
import { OriginalMetadata } from "../dto/original-metadata.js"




@injectable()
class OriginalMetadataService {

  db: any

  constructor(
    private originalMetadataRepository: OriginalMetadataRepository
  ) { }

  async get(_id: string): Promise<OriginalMetadata> {
    return this.originalMetadataRepository.get(_id)
  }

  async put(originalMetadata:OriginalMetadata) {

    if (!originalMetadata._id) {
      originalMetadata._id = originalMetadata.cid
      originalMetadata.dateCreated = new Date().toJSON()
    } 

    //Validate
    let errors: ValidationError[] = await validate(originalMetadata, {
      forbidUnknownValues: true,
      whitelist: true
    })

    if (errors.length > 0) {
      throw new ValidationException(errors)
    }

    await this.originalMetadataRepository.put(originalMetadata)
  }

  async delete(originalMetadata:OriginalMetadata): Promise<void> {
    await this.originalMetadataRepository.delete(originalMetadata)
  }

  async getByIds(ids:string[]) {
    return this.originalMetadataRepository.getByIds(ids)
  }


  public async newFromText(content) {
  
    const originalMetadata: OriginalMetadata = new OriginalMetadata()
    originalMetadata.content = content

    originalMetadata.cid = await Hash.of(originalMetadata.content)
    
    return originalMetadata

  }


}

export {
  OriginalMetadataService
}