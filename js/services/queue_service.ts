import {PromiseView} from "../promise-view";
import { Global } from "../global";
import { TemplateService } from "./template-service";



class QueueService {

    //Actual items
    public currentQueue: QueueItem[] = []
    
    //The list element we're populating
    private virtualList: any

    constructor(
      private templateService: TemplateService
    ) {}

    setVirtualList(virtualList: any) {
      this.virtualList = virtualList
    }

    populateList() {
      if (!this.virtualList) return
      this.virtualList.replaceAllItems(this.currentQueue)
    }

    async queuePromiseView(promiseView: PromiseView) : Promise<any> {

      const self = this

      let queueItem: QueueItem = new QueueItem(
        Guid.newGuid(),
        promiseView.title
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
      console.log('before')
      this.currentQueue.push(queueItem)

      console.log(this.currentQueue)
      
      this.populateList()
      
    }

    afterSaveAction(queueItem: QueueItem): void {
      console.log('after')
      this.currentQueue = this.currentQueue.filter(obj => obj !== queueItem);

      console.log(this.currentQueue)

      this.populateList()

    }

}

class QueueItem {

  // public web3TransactionId: string

  constructor(
    public id: string,
    public title: string
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
