
import { ModelView} from "large-web"
import Core, { SchemaService } from "large-core";
import { Global } from "../../global";
import { Dom7, Template7 } from "framework7/js/framework7.bundle"



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
                    type: "drop-store"
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

        console.log('Drop store clicked!')

        let id = $$(e.target).data('id')

        await this.schemaService.dropStore(id)

        // Create bottom toast
        var toastBottom = Global.app.toast.create({
            text: 'Store dropped'
        })

        toastBottom.open()

    }


    async addPeerSubmit(e:Event) {

        console.log('Add peer submit')
        
        let pageData = Global.app.form.convertToData('#add-peer-form')

        //@ts-ignore
        document.getElementById('peerAddressInput').setCustomValidity("")

        if (pageData.peerAddress) {
            try {
                await Core.ipfs.swarm.connect(pageData.peerAddress)

                Global.uiService.showPopup(`Successfully connected to peer ${pageData.peerAddress}`)
                
                console.log('Connected to peer')
            } catch(ex) {
                Global.uiService.showExceptionPopup(ex)
            }
        }




    }

}


export {
    ConnectController
}