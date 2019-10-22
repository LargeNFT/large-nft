import { Dom7, Template7 } from "framework7/js/framework7.bundle"
import { ModelView } from 'large-web'


class DashboardController {

  constructor(

  ) {}

  async showIndex(): Promise<ModelView> {

    return new ModelView( async () => {
    }, 'pages/admin/dashboard/index.html')

  }


}

export { DashboardController }
