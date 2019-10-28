import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import { ModelView } from 'large-web'


class AdminUserController {

  constructor(
  ) {}

  async showIndex(): Promise<ModelView> {

    return new ModelView( async () => {
    }, 'pages/admin/user/index.html')

  }


}

export { AdminUserController }
