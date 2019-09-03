import { Global } from "../../global";

class ImageService {

    constructor() {

    }


    async cidToUrl(cid:string) : Promise<string> {
        
        let result = await Global.ipfs.get(cid)
        var blob = new Blob([result[0].content], {type:"image/jpg"})

        return window.URL.createObjectURL(blob)

    }


}

export {
    ImageService
}