import { ModelView } from "large-web"

class AdminSettingsController {


    async showIndex(): Promise<ModelView> {

        return new ModelView( async () => {
        }, 'pages/admin/settings/index.html')
    
      }


}

export {
    AdminSettingsController
}