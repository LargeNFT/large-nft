import {HomeController} from "./controllers/home-controller";
import {PostController} from "./controllers/post-controller";
import {SettingsController} from "./controllers/settings-controller";
import {ProfileController} from "./controllers/profile-controller";
import Framework7 from "framework7";


export namespace Global {
  export var freedom: any
  export var homeController: HomeController
  export var postController: PostController
  export var profileController: ProfileController
  export var settingsController: SettingsController
  export var app: any



  export function navigate(url: string) {
    Global.app.view.main.router.navigate(url);
  }

  export function showExceptionPopup(ex) {

    if (ex.name == "IpfsException") {
      Global.app.dialog.alert(ex.message, "Problem connecting to IPFS")
    } else {
      Global.app.dialog.alert(ex.message, "There was an error")
    }
  }

}
