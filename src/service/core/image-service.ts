import { injectable } from "inversify"
import toBuffer from "it-to-buffer"
import { OrbitService } from "./orbit-service"

@injectable()
class ImageService {

    constructor(
        private orbitService:OrbitService
    ) {}


    async cidToUrl(cid:string) : Promise<string> {
        
        const bufferedContents = await toBuffer(await this.orbitService.ipfs.cat(cid))

        // const bufferedContents = await toBuffer(ipfs.cat('QmWCscor6qWPdx53zEQmZvQvuWQYxx1ARRCXwYVE4s9wzJ')) // returns a Buffer
        var blob = new Blob([bufferedContents], {type:"image/jpg"})

        return window.URL.createObjectURL(blob)

    }

}

export {
    ImageService
}