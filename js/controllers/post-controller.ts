import { ModelView } from '../model-view'


// import { Quill } from 'quill';
import Quill = require('quill/dist/quill.js')

import {PostService} from "../services/post-service";
import {ProfileService} from "../services/profile-service";
import {QuillService} from "../services/quill-service";
import {UploadService} from "../services/upload-service";

import {Dom7, Template7} from "framework7";
import {Global} from "../global";
import {Post} from "../dto/post";
import {PromiseView} from "../promise-view";
import { QueueService } from '../services/queue_service';
var $$ = Dom7

class PostController {

    quill: any

    constructor(
      private queueService: QueueService,
      private postService:PostService,
      private profileService:ProfileService,
      private quillService:QuillService,
      private uploadService:UploadService) {
        const self = this;

        $$(document).on('submit', '#edit-post-form', function(e) {
          e.preventDefault()
          self.postEditSave(e)
        });

        $$(document).on('submit', '#create-post-form', function(e) {
          e.preventDefault()
          self.postCreateSave(e)
        });

        $$(document).on('click', '.bold-button', function(e) {
          e.preventDefault()
          self.boldClick(e)
        })

        $$(document).on('click', '.italic-button', function(e) {
          e.preventDefault()
          self.italicClick(e)
        })

        $$(document).on('click', '.link-button', function(e) {
          e.preventDefault()
          self.linkClick(e)
        })

        $$(document).on('click', '.blockquote-button', function(e) {
          e.preventDefault()
          self.blockquoteClick(e)
        })

        $$(document).on('click', '.header-1-button', function(e) {
          e.preventDefault()
          self.header1Click(e)
        })

        $$(document).on('click', '.header-2-button', function(e) {
          e.preventDefault()
          self.header2Click(e)
        })

        $$(document).on('click', '.divider-button', function(e) {
          e.preventDefault()
          self.dividerClick(e)
        })

        $$(document).on('click', '.image-button', function(e) {
          e.preventDefault()
          self.imageClick(e)
        })

        $$(document).on('change', '.image-button-input', async function(e) {
          e.preventDefault()
          await self.imageSelected(this)
        })

        $$(document).on('click', '.video-button', function(e) {
          e.preventDefault()
          self.videoClick(e)
        })

        $$(document).on('change', '.video-button-input', async function(e) {
          e.preventDefault()
          await self.videoSelected(this)
        })

        $$(document).on('click', '.cover-photo-img', function(e) {
          e.preventDefault()
          self.selectCoverPhoto(e)
        })
    }

    initializeQuill(selector) {
      this.quill = this.quillService.buildQuillPostEditor(selector)
    }

    async showCreatePost() : Promise<ModelView> {
      return new ModelView({},  'pages/post/create.html')
    }

    async showPost(id:Number) : Promise<ModelView> {

        let post = await this.postService.getPostById(id)

        //Show the edit button to the owner
        let currentUser;

        try {
          currentUser = await this.profileService.getCurrentUser()
        } catch(ex) {
          console.log("Profile doesn't exist");
        }

        let model = {
          post: post,
          showEditLink: (currentUser && currentUser.id == post.authorId)
        }

        return new ModelView(model, 'pages/post/show.html')

    }

    async showPostList() : Promise<ModelView> {

        let posts = await this.postService.getPostsDescending(10, 0)

        let model = {
          posts: posts
        }

        return new ModelView(model, 'pages/post/list.html')

    }

    async showPostEdit(id) : Promise<ModelView> {

        let post = await this.postService.getPostById(id)

        let model = {
          post: post
        }

        return new ModelView(model, 'pages/post/edit.html')

    }

    async postEditSave(e): Promise<void> {

      try {
        //Get data
        const postData: Post = await this._getPostData('#edit-post-form')
        
        //Redirect to home page
        Global.navigate('/')

        await this.queueService.queuePromiseView(
          new PromiseView(
            this.postService.updatePost(postData),
            "Saving changes to story '{{title}}'",
            "document_text",
            postData,
            "/post/show/{{id}}"
          )
        )

      } catch (ex) {
        Global.showExceptionPopup(ex)
      }

    }

    async postCreateSave(e): Promise<void> {

      try {

        //Get data
        const postData: Post = await this._getPostData('#create-post-form')

        //Redirect to home page
        Global.navigate('/')


        await this.queueService.queuePromiseView(
          new PromiseView(
            this.postService.createPost(postData),
            "Saving new story titled '{{title}}'",
            "document_text",
            postData,
            "/post/show/{{id}}"
          )
        )

      } catch (ex) {
        Global.showExceptionPopup(ex)
      }

    }

    async _getPostData(formId: string) : Promise<Post> {

      //Get data
      let postData: Post = <Post> Global.app.form.convertToData(formId);

      //Get date
      postData.dateCreated = new Date().toJSON().toString()

      //Get author info
      let author: Profile = await this.profileService.getCurrentUser()
      postData.authorId = author.id

      //Add main photo

      //Get story contents. Quill delta
      postData.content = this.quill.getContents()


      return postData
    }


    /***EDITOR ACTIONS**/
    boldClick(e) {
      const currentFormat = this.quill.getFormat()
      this.quill.format('bold', !currentFormat.bold)
    }

    italicClick(e) {
      const currentFormat = this.quill.getFormat()
      this.quill.format('italic', !currentFormat.italic)
    }

    linkClick(e) {
      let value = prompt('Enter link URL');
      this.quill.format('link', value)
    }

    blockquoteClick(e) {
      const currentFormat = this.quill.getFormat()
      this.quill.format('blockquote', !currentFormat.blockquote);
    }

    header1Click(e) {
      const currentFormat = this.quill.getFormat()
      this.quill.format('header', currentFormat.header ? undefined : 1);
    }

    header2Click(e) {
      const currentFormat = this.quill.getFormat()
      this.quill.format('header', currentFormat.header ? undefined : 2);
    }

    dividerClick(e) {

      let range = this.quill.getSelection(true)

      this.quill.insertText(range.index, '\n', Quill.sources.USER)

      this.quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER)

      this.quill.setSelection(range.index + 2, Quill.sources.SILENT)

    }

    imageClick(e) {

      const imageButtonInput = $$(".image-button-input");
      imageButtonInput.click()

    }

    //TODO: move to service
    async imageSelected(fileElement: Element): Promise<void> {

      let imageCid = await this.uploadService.uploadFile(fileElement)


      let range = this.quill.getSelection(true)

      this.quill.insertText(range.index, '\n', Quill.sources.USER)

      this.quill.insertEmbed(range.index, 'ipfsimage', {ipfsCid: imageCid} , Quill.sources.USER)

      this.quill.setSelection(range.index + 2, Quill.sources.SILENT)

      //Make it the cover photo
      $$('input[name="coverPhoto"]').val(imageCid)

      this.loadCoverPhotos()

    }


    //TODO: load this from a template7 template somehow instead
    loadCoverPhotos() : void {

      const images = this.postService.getImagesFromPostContentOps(this.quill.getContents().ops)

      $$('.cover-photo-img-wrapper').empty()
      $$('.cover-photo-preview').hide()


      if (images.length > 0) {
        $$('.cover-photo-preview').show()
      }


      for (let imageCid of images) {

        const imgElement = $$('<img>')
        imgElement.attr("src", Template7.global.ipfsGateway + '/' + imageCid)
        imgElement.data("image-cid", imageCid)
        imgElement.addClass("cover-photo-img")

        $$('.cover-photo-img-wrapper').append(imgElement)

      }

      this.setCoverPhoto($$('input[name="coverPhoto"]').val())

    }

    selectCoverPhoto(e) : void {
      this.setCoverPhoto($$(e.target).data("image-cid"))
    }

    //TODO: can definitely be nicer.
    setCoverPhoto(imageCid: string) : void {

      $$('input[name="coverPhoto"]').val(imageCid)

      $$('.cover-photo-img-wrapper img').removeClass('selected')

      $$('.cover-photo-img-wrapper img').each(function(index, item) {
        if ($$(item).data("image-cid") == imageCid) {
          $$(item).addClass('selected')
        }
      })

    }


    videoClick(e: Event) : void {
      const videoButtonInput = $$(".video-button-input");
      videoButtonInput.click()
    }


    //TODO: move to service
    async videoSelected(fileElement: Element) {

      let videoCid = await this.uploadService.uploadFile(fileElement)

      let range = this.quill.getSelection(true)


      this.quill.insertText(range.index, '\n', Quill.sources.USER)


      this.quill.insertEmbed(range.index, 'ipfsvideo', {ipfsCid: videoCid} , Quill.sources.USER)


      this.quill.setSelection(range.index + 2, Quill.sources.SILENT)

    }




}


export {  PostController }
