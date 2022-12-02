import { injectable } from 'inversify'

import { UploadService } from './upload-service'

const pdf = require('pdf-parse');


@injectable()
class PDFService {

    constructor(
        private uploadService:UploadService
    ) {}

    async readPDF(file) {

        let buffer:Buffer = await this.uploadService.uploadFile(file)
        return this.getDocument(buffer)
    }

    async getDocument(existingBytes:Uint8Array) {
        return pdf(existingBytes)
    }

}


export {
    PDFService
}