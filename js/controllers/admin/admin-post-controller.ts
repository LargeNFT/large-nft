import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import Web, { ModelView } from 'large-web'
import { QuillService } from "../../services/quill-service"
import { Global } from "../../global"
import { BlogPostService, ProfileService } from "large-core"
import { BlogPost } from "large-core/dist/dto/blog-post"
import { UiService } from "../../services/ui-service"
const moment = require('moment')


class AdminPostController {

  constructor(
    private quillService: QuillService,
    private postService: BlogPostService,
    private uiService: UiService
  ) {}

  async showIndex(): Promise<ModelView> {

    await this.postService.loadStoresForWallet(window['currentAccount'])

    return new ModelView( async () => {
    }, 'pages/admin/post/index.html')

  }

  async showCreate(): Promise<ModelView> {

    await this.postService.loadStoresForWallet(window['currentAccount'])

    return new ModelView( async () => {
    }, 'pages/admin/post/create.html')

  }


  async postCreateSave(e) {
    try {

      //Get data
      var postData = await this._getPostData('#create-post-form')

      //Save
      let result:BlogPost = await this.postService.create(postData)

      
      //Redirect
      this.uiService.navigate("/admin/post/")

    } catch (ex) {
      this.uiService.showExceptionPopup(ex)
    }

  }

  async _getPostData(formId) {

    //Get data
    var postData = Global.app.form.convertToData(formId);

    

    //Get date
    postData.dateCreatedMilli = moment().utc().valueOf()

    //Get author info
    postData.owner = window['currentAccount']


    //Add main photo

    //Get story contents. Quill delta
    postData.content = this.quillService.activeEditor.getContents()


    return postData
  }



  initializeQuill() {
    this.quillService.buildQuillPostEditor('#create-post-textarea')
  }

}

export { AdminPostController }
