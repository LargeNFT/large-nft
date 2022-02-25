import {PromiseView} from "../util/promise-view";

import { inject, injectable } from "inversify";
import { RoutingService } from "./routing-service";

@injectable()
class QueueService {

    constructor(
      @inject("framework7") private app,
    ) {}

    async queuePromiseView(promiseView: PromiseView) : Promise<any> {

      const self = this

      let queueItem: QueueItem = {
        id: Guid.newGuid(),
        icon: promiseView.icon,
        title: promiseView.title,
      }

      let before = async function () {
        return new Promise<void>((resolve, reject) => {
          self._beforeSaveAction(queueItem)
          resolve()
        })
      }

      let after = async function() {

        let result = await promiseView.promise

        try {
          self._showSuccess(result, queueItem)
        } catch(ex) {
          self._showError(ex, queueItem)
        }

        return result

      }

      return before()
              .then(after)
    }


    
    private _beforeSaveAction(queueItem: QueueItem) : void {     

      // Create toast with close button
      queueItem.toast = this.app.toast.create({
        text: queueItem.title,
        closeButton: false
      })

      queueItem.toast.open()

    }

    private _showError(error, queueItem:QueueItem) {

      queueItem.toast.close()

      console.log(error)

      let toast = {
        text: error.message,
        closeButton: true,
        closeButtonText: "Close",
        closeTimeout: 5000
      }

      this.app.toast.create(toast).open()

    }


    private _showSuccess(result, queueItem:QueueItem): void {

      const self = this

      queueItem.toast.close()

      let toast = {
        text: "Transaction Submitted",
        closeButton: true,
        closeTimeout: 5000
      }

      this.app.toast.create(toast).open()
    }



}

interface QueueItem {
  toast?: any

  id: string,
  icon: string,
  title: string,
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
