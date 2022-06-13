import { inject, injectable } from "inversify";
import { AnimationService } from "../animation-service";
import { AuthorService } from "../author-service";
import { ChannelService } from "../channel-service";
import { ImageService } from "../image-service";
import { ItemService } from "../item-service";
import { IpfsService } from "./ipfs-service";
import TYPES from "./types";
import { WalletService } from "./wallet-service";

@injectable()
class ImportService {

    constructor(
        private channelService: ChannelService,
        private itemService: ItemService,
        private authorService: AuthorService,
        private ipfsService: IpfsService,
        private imageService: ImageService,
        private animationService:AnimationService,
        @inject(TYPES.WalletService) private walletService: WalletService,
        @inject("contracts") private contracts,
    ) {}

    async import(cid:string) {

    }

}

export {
    ImportService
}