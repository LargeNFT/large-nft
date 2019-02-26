import {PromiseView} from "../promise-view";
import { Global } from "../global";
import { TemplateService } from "./template-service";
import { Template7 } from "framework7/js/framework7.bundle";



class QueueService {

    //Actual items
    // public currentQueue: QueueItem[] = []
    
    //The list element we're populating
    // private virtualList: any

    constructor(
      private templateService: TemplateService
    ) {}

    // setVirtualList(virtualList: any) {
    //   this.virtualList = virtualList
    // }

    // populateList() {
    //   if (!this.virtualList) return
    //   this.virtualList.replaceAllItems(this.currentQueue)
    // }

    async queuePromiseView(promiseView: PromiseView) : Promise<any> {

      const self = this

      let queueItem: QueueItem = new QueueItem(
        Guid.newGuid(),
        promiseView.icon,
        promiseView.title,
        promiseView.view,
        promiseView.context
      )

      let before = async function () {
        return new Promise((resolve, reject) => {
          self.beforeSaveAction(queueItem)
          resolve();
        })
      }

      let during = async function() {
        return promiseView.promise
      }

      let after = async function () {
        return new Promise((resolve, reject) => {
          self.afterSaveAction(queueItem)
          resolve();
        })
      }

      return before().then(during).then(after)

    }


    
    beforeSaveAction(queueItem: QueueItem) : void {     

      queueItem.title = this._parseTitle(queueItem.titleTemplate, queueItem.context)
      queueItem.link = this._parseLink(queueItem.linkTemplate, queueItem.context)
      

      // Create notification with close button
      queueItem.notification = Global.app.toast.create({
        icon: '<i class="f7-icons">' + queueItem.icon + '</i>',
        text: queueItem.title,
        closeButton: true,
        closeButtonText: 'Ok',
        closeButtonColor: 'white'
      })

      queueItem.notification.open()

    }

    afterSaveAction(queueItem: QueueItem): void {
      queueItem.notification.close()
    }


    _parseTitle(titleTemplate: string, context: any) {
        const compiledTemplate = Template7.compile(titleTemplate)
        return compiledTemplate(context)
    }

    _parseLink(linkTemplate: string, context: any) {
      const compiledTemplate = Template7.compile(linkTemplate)
      return compiledTemplate(context)
    }
    

}

class QueueItem {

  // public web3TransactionId: string

  public title: string
  public link: string
  public notification: any

  constructor(
    public id: string,
    public icon: string,
    public titleTemplate: string,
    public linkTemplate: string,
    public context: any
  ) {}

}

//from https://stackoverflow.com/questions/26501688/a-typescript-guid-class
class Guid {
  static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  }
}

export { QueueService, QueueItem }
