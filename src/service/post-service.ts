// import { ImageService } from "./core/image-service";
// import { QuillDeltaToHtmlConverter } from "quill-delta-to-html"
// // const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter
// import { Author } from "../dto/author";
// import { AuthorService } from "./author-service";
// import { injectable } from "inversify";
// import moment from 'moment';

// @injectable()
// class PostService {

//   constructor(
//     private imageService: ImageService,
//     private profileService: AuthorService
//   ) { }

//   async buildPost(walletAddress: string, content: any, parent: Post = undefined) {

//     //Get profile service of poster
//     let profile: Author

//     try {
//       profile = await this.profileService.get(walletAddress)
//     }
//     catch (ex) {
//       // console.log(ex)
//     }

//     let post: Post = {
//       owner: walletAddress,
//       ownerDisplayName: (profile && profile.name) ? profile.name : walletAddress,
//       dateCreatedMilli: moment().utc().valueOf(),
//       content: content
//     }

//     if (parent) {
//       post.parentId = parent._id
//     }

//     //Set user avatar
//     if (profile && profile.profilePic) {
//       post.ownerProfilePic = profile.profilePic
//     }

//     return post
//   }

//   async translatePost(post: Post): Promise<Post> {

//     //@ts-ignore
//     let translated: Post = {}

//     Object.assign(translated, post)

//     translated.contentTranslated = await this.translateContent(post)

//     //@ts-ignore //TODO: fix this somehow later. view model
//     translated.dateCreatedDisplay = moment(post.dateCreatedMilli).fromNow()

//     if (translated.ownerProfilePic) {
//       translated.ownerProfilePicSrc = await this.imageService.cidToUrl(post.ownerProfilePic)
//     }

//     if (translated.coverPhotoCid) {
//       translated.coverPhotoSrc = await this.imageService.cidToUrl(translated.coverPhotoCid)
//     }

  
//     return translated

//   }

//   async translateContent(post: any): Promise<string> {

//     if (!post.content) return

//     let imageUrls = {}

//     for (let op of post.content.ops) {
//       if (op.insert.ipfsimage) {

//         let cid = op.insert.ipfsimage.ipfsCid

//         imageUrls[cid] = await this.imageService.cidToUrl(cid)
//       }
//     }

//     const qdc = new QuillDeltaToHtmlConverter(post.content.ops, {})

//     //Render dividers into HTML
//     qdc.renderCustomWith(function (customOp, contextOp) {
//       if (customOp.insert.type === 'divider') {
//         return "<hr />"
//       }

//       if (customOp.insert.type === 'ipfsimage') {
//         return `<img class="blob-image" src="${imageUrls[customOp.insert.value.ipfsCid]}" width="${customOp.insert.value.width}" height="${customOp.insert.value.height}" style="${customOp.insert.value.style}"  />`
//       }


//     })

//     return qdc.convert()
//   }


// }

// export { PostService }