
import { ModelView, Dom7, Template7 } from "large-web"
import { SchemaService } from "large-core";
import { Global } from "../global";



var $$ = Dom7;

class ConnectController {

    constructor(
        private ipfs,
        private schemaService:SchemaService
    ) {}

    async showHome() : Promise<ModelView> {

        const self = this

        return new ModelView( async () => {

            let mainStore = await this.schemaService.getMainStoreByWalletAddress(window['currentAccount'])
            let schema = await this.schemaService.getSchema(mainStore, window['currentAccount'])
            let mainStoreAddress = mainStore.address.toString()

            let stores = []

            //Add main store
            stores.push({
                name: "Main Store",
                address: mainStoreAddress,
                type: "drop-store"
            })

            //Collect info about the stores. Should probably move to a service.
            for (let field in schema) {

                let store = {
                    name: field,
                    address: schema[field],
                    type: (field == "mainFeed" || field == "postFeed" ) ? "drop-post-store" : "drop-store"
                }

                stores.push(store)
            }

            
            let peers = await self.ipfs.swarm.peers()
            
            peers = peers.map(e => e.addr.toString())

            let subscribed = await self.ipfs.pubsub.ls()

            return {
                peers: peers,
                subscribed: subscribed,
                currentAccount: window['currentAccount'],
                schema: schema,
                stores: stores
            }
            
        }, 'pages/connect/home.html')

    }

    async dropStoreClicked(e:Event) {

        let id = $$(e.target).data('id')

        await this.schemaService.dropStore(id)

        // Create bottom toast
        var toastBottom = Global.app.toast.create({
            text: 'Store dropped'
        })

        toastBottom.open()

    }

    async dropPostStoreClicked(e:Event) {

        let id = $$(e.target).data('id')

        await this.schemaService.dropPostStore(id)

        // Create bottom toast
        var toastBottom = Global.app.toast.create({
            text: 'Post store dropped'
        })

        toastBottom.open()

    }


}


export {
    ConnectController
}