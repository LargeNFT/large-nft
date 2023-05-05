import { inject, injectable } from "inversify";
import { HomeRepository } from "../../repository/home-repository.js";
import { HomeViewModel } from "../../repository/web/home-repository-impl.js";


@injectable()
class HomeWebService {

    constructor() {}

    @inject("HomeRepository")
    private homeRepository:HomeRepository

    async get() : Promise<HomeViewModel> {
        return this.homeRepository.get(0)
    }

    abbreviateDollars(number, digits) {

        if (!number) return "$0"

        var SI_SYMBOL = ["", "", "M", "G", "T", "P", "E"]


        // what tier? (determines SI symbol)
        var tier = Math.log10(Math.abs(number)) / 3 | 0

        // if zero or thousands, we don't need a suffix
        if(tier == 0 || tier == 1) {
          let result = new Intl.NumberFormat('en-US', { currency: "USD", style:"currency" }).format(number)
          return result
        }

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier]
        var scale = Math.pow(10, tier * 3)

        // scale the number
        var scaled = number / scale

        // format number and add suffix
        return new Intl.NumberFormat('en-US', { currency: "USD", style:"currency" }).format(scaled) + suffix
    }

}


export {
    HomeWebService
}