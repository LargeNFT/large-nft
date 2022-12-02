import { Author } from "../author.js";
import { ImageViewModel } from "./image-view-model.js";

interface AuthorViewModel {

    author?:Author
    authorDisplayName?:string 
    authorPhoto?:ImageViewModel

}

export {
    AuthorViewModel
}