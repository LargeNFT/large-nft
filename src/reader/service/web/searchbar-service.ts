import { inject, injectable } from "inversify";
import { ItemWebService } from "./item-web-service.js";

@injectable()
class SearchbarService {

    @inject("ItemWebService")
    private itemWebService:ItemWebService

    constructor(
    ) {}

    async init($f7) {

        const self = this

        $f7.searchbar.create({
            el: '.searchbar',
            customSearch: true,
            on: {
                enable: function () {
                    console.log('Searchbar enabled')
                },

                search: (searchbar, query, previousQuery) => {
                }
            }
        })

    }

    async destroy($f7) {
        $f7.searchbar.destroy('.searchbar')
    }


}

export {
    SearchbarService
}