import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import Web, { ModelView, ModelViewService } from 'large-web'
import { QuillService } from "../../services/quill-service"
import { Global } from "../../global"
import { ProfileService, ImageService, Profile, PageService, Page } from "large-core"
import { UiService } from "large-web"
const moment = require('moment')
var $$ = Dom7


class AdminPageController {

  virtualList: any 

  constructor(
    private quillService: QuillService,
    private uiService: UiService,
    private imageService: ImageService,
    private profileService:ProfileService,
    private pageService:PageService
  ) {}


  async showIndex(): Promise<ModelView> {

    return new ModelView( async () => {

      // await this.pageService.loadStoresForWallet(window['currentAccount'])

      let pages:Page[] = await this.pageService.getPages()

      return {
        pages: pages
      }
      
    }, 'pages/admin/page/index.html')

  }

  async showCreate(): Promise<ModelView> {

    return new ModelView( async () => {
    }, 'pages/admin/page/create.html')

  }

  async showPage(permalinkKey:string) : Promise<ModelView> {
    
    return new ModelView( async () => {

      // await this.pageService.loadStoresForWallet(window['currentAccount'])

      let page:Page = await this.pageService.readPermalink(permalinkKey)

      await this.pageService.translatePage(page)

      return {
        page: page
      }

    }, 'pages/admin/page/show.html')

  }



  async showEdit(permalinkKey:string) : Promise<ModelView> {
    
    return new ModelView( async () => {

      // await this.pageService.loadStoresForWallet(window['currentAccount'])

      //Get page
      let page:Page = await this.pageService.readPermalink(permalinkKey)

      return {
        page: page
      }

    }, 'pages/admin/page/edit.html')

  }



  async pageCreateSave(e) {
    try {

      //Get data
      let pageData = await this._getPageData('#create-page-form')

      //Save
      // await this.pageService.loadStoresForWallet(window['currentAccount'])
      await this.pageService.create(pageData)
      
      //Redirect
      this.uiService.navigate("/admin/page/", false, false)

    } catch (ex) {
      this.uiService.showExceptionPopup(ex)
    }

  }


  async pageEditSave(e) {


    try {

      //Get data
      let postData = await this._getPageData('#edit-page-form')


      //Save
      // await this.pageService.loadStoresForWallet(window['currentAccount'])
      await this.pageService.update(postData)
      
      //Redirect
      this.uiService.navigate(`/admin/page/show/${postData.permalinkKey}`, false, false)

    } catch (ex) {
      this.uiService.showExceptionPopup(ex)
    }

  }


  async pageDeleteClick(e:Event) {

    try {

      let self = this

      let pageId = $$(e.target).data('id')
      if (!pageId) return 
  
      Global.app.dialog.confirm(
        "Do you want to delete this page? Note: This does not guarantee deletion from other peers. This data may still exist on the internet somewhere.",
        async function() {

          let page:Page = await self.pageService.readPermalink(pageId)
  
          await self.pageService.delete(page)
      
          //Redirect
          self.uiService.navigate(`/admin/page`, false, false)

        }
      
      )

    } catch(ex) {
      this.uiService.showExceptionPopup(ex)
    }

  }


  async _getPageData(formId) {

    //Get data
    var pageData = Global.app.form.convertToData(formId)

    //Get date
    pageData.dateCreatedMilli = moment().utc().valueOf()

    //Get author info
    pageData.owner = window['currentAccount']

    //Get story contents. Quill delta
    pageData.content = this.quillService.activeEditor.getContents()


    return pageData
  }

  initializeQuill(selector) {
    this.quillService.buildQuillPostEditor(selector)
  }





}






export { AdminPageController }
