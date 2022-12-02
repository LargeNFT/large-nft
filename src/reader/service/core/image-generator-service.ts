import { injectable } from "inversify";
import { Image } from "../../dto/image.js";
// import { convert } from "convert-svg-to-png"

@injectable()
class ImageGeneratorService {

    constructor() {}

    async toPNG(image:Image, outputPath:string) {

        if (!image.generated) return


        // const png = await convert(image.svg, {
        //     height: 1200,
        //     width: 1200
        // })

        return

        // return png

    }

}

export {
    ImageGeneratorService
}