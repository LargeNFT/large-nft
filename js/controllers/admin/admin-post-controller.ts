import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import { ModelView } from 'large-web'


class AdminPostController {

  constructor(

  ) {}

  async showIndex(): Promise<ModelView> {

    return new ModelView( async () => {
    }, 'pages/admin/post/index.html')

  }


}

export { AdminPostController }
