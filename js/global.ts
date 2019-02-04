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
}
