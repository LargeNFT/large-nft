import { HfInference } from "@huggingface/inference";
import { inject, injectable } from "inversify";
import { SettingsService } from "./settings-service.js";

@injectable()
class HuggingFaceService {

    inference:HfInference

    constructor(
        private settingsService:SettingsService
    ) {}

    async init() {

        let settings = await this.settingsService.get()

        if (!settings.huggingFace) return

        this.inference = new HfInference(settings.huggingFace)

    }

    async generateImage(model:string, prompt:string, negativePrompt?:string) : Promise<Blob> {

        let options:any = {
            inputs: prompt,
            parameters: {
                width: 1200,
                height: 1200
            },
            model: model
        }

        if (negativePrompt) {
            options.parameters.negative_prompt = negativePrompt
        }

        return this.inference.textToImage(options)

    }


}

export {
    HuggingFaceService
}

