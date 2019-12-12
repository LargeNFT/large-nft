import { ModelView } from "large-web"

class HomeController {

    async showIndex(): Promise<ModelView> {

        return new ModelView(async () => {

        }, 'pages/reader/index.html')
    }

}

export {
    HomeController
}