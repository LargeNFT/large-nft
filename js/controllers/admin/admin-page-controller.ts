import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import { ModelView } from 'large-web'


class AdminPageController {

  constructor(

  ) {}

  async showIndex(): Promise<ModelView> {

    return new ModelView( async () => {
    }, 'pages/admin/page/index.html')

  }


}

export { AdminPageController }
