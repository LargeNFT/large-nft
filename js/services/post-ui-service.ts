import { PostService, ProfileService, SchemaService, ImageService, Post, Profile } from "large-core";
import { Dom7, Template7 } from "framework7";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html"

const moment = require('moment')

var $$ = Dom7

class PostUIService {

    setFeed(feed) {
        this.postService.setFeed(feed)
    }


    constructor(
        public postService: PostService,
        public profileService: ProfileService,
        public schemaService: SchemaService,
        public imageService: ImageService
    ) { }

    async postMessage(content: any, walletAddress: string) {
        return this.postService.postMessage(content, walletAddress)
    }

    async postReply(parent: Post, content: any, walletAddress: string) {
        return this.postReply(parent, content, walletAddress)
    }

    async getRecentPosts(offset: number, limit: number, olderThan: string = undefined, newerThan: string = undefined): Promise<Post[]> {

        let posts: Post[] = await this.postService.getRecentPosts(offset, limit, olderThan, newerThan)

        let translatedPosts: Post[] = []

        for (let post of posts) {
            translatedPosts.push(await this.postService.translatePost(post))
        }

        return translatedPosts

    }

    async loadPostImages() {

        const self = this

        $$(".blob-image").each(async function (index, element) {

            let src = $$(element).prop('src')
            if (src) return

            let cid = $$(element).data('cid')

            let imgUrl = await self.imageService.cidToUrl(cid)

            $$(element).prop('src', imgUrl)
        })

    }

    async translatePost(post: Post): Promise<Post> {
        return this.postService.translatePost(post)
    }

    async loadPostFeedForWallet(walletAddress: string) {
        return this.postService.loadPostFeedForWallet(walletAddress)
    }

    async loadMainFeedForWallet(walletAddress: string) {
        return this.postService.loadMainFeedForWallet(walletAddress)
    }

    async loadRepliesFeed(feedAddress: string) {
        return this.postService.loadRepliesFeed(feedAddress)
    }



    async delete(post: Post): Promise<void> {
        this.postService.delete(post)
    }


}

export {
    PostUIService
}