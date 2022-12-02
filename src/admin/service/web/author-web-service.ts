import { injectable } from "inversify";
import { Author } from "../../dto/author.js";
import { AuthorViewModel } from "../../dto/viewmodel/author-view-model.js";
import { ImageViewModel } from "../../dto/viewmodel/image-view-model.js";
import { AuthorService } from "../author-service.js";
import { ImageService } from "../image-service.js";

@injectable()
class AuthorWebService {

    constructor(
        private imageService: ImageService,
        private authorService: AuthorService
    ) { }

    async get(_id: string): Promise<AuthorViewModel> {
        return this.getViewModel(await this.authorService.get(_id))
    }

    async getViewModel(author: Author): Promise<AuthorViewModel> {

        let authorPhoto:ImageViewModel

        //Load cover photo if there is one.
        if (author.coverPhotoId) {

            let aImage = await this.imageService.get(author.coverPhotoId)

            authorPhoto = {
                cid: aImage.cid,
                url: await this.imageService.getUrl(aImage)
            }
        }

        return {
            author: author,
            authorPhoto: authorPhoto,
            authorDisplayName: this.authorService.getDisplayName(author)
        }

    }



}

export {
    AuthorWebService
}