import { Author } from "../author";
import { ImageViewModel } from "./image-view-model";

interface AuthorViewModel {

    author?:Author
    authorDisplayName?:string 
    authorPhoto?:ImageViewModel

}

export {
    AuthorViewModel
}