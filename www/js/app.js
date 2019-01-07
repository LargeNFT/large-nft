
/** Shortcut methods for localStorage access */
Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
}
/*********************************************/

// Dom7
const $$ = Dom7;



let freedom;


//Page Controllers
let settingsController = new SettingsController();
let homeController = new HomeController();
let profileController = new ProfileController();


//REPO Ids
let PROFILE_REPO = 1;







// Framework7 App main instance
const app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'freedom-for-data Demo', // App name
  theme: 'auto', // Automatic theme detection

  on: {
    init: function () {}
  },

  methods: {
    navigate: function(url) {
      this.view.main.router.navigate(url);
    },

    appendFromTemplate: function(appendTo, templateSelector, viewModel) {
      var template = $$(templateSelector).html();
      var compiledTemplate = Template7.compile(template);
      
      var html = compiledTemplate(viewModel);
      
      $$(appendTo).append(html);
    }
  },

  // App routes
  routes: [
    {
      path: '/',
      async(routeTo, routeFrom, resolve, reject) {

        let settings = localStorage.getObject("settings");

        if (!settings) {
          resolve({url: 'pages/settings.html'})
        } else {
          resolve({url: 'pages/home.html'})
        }
      },
      on: {
        pageInit: function(e, page) {
          homeController.init();
        }
      }
    },
    {
      path: '/settings',
      url: 'pages/settings.html',
      on: {
        pageInit: function(e, page) {
          settingsController.showSettingsForm();
        }
      }
    },

    {
      path: '/profile/show',
      url: 'pages/profile/show.html',
      on: {
        pageInit: function(e, page) {
          profileController.showProfile(page);
        }
      }
    },

    {
      path: '/profile/edit',
      url: 'pages/profile/edit.html',
      on: {
        pageInit: function(e, page) {
          profileController.showProfileEdit();
        }
      }
    }
  ],

});



// Init/Create main view
const mainView = app.views.create('.view-main', {
  url: '/'
});



